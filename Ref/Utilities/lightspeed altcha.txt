
// ==Packet Override==
const PACKET_MAP = {
  33: "9",
  7: "K",
  ch: "6",
  pp: "0",
  "13c": "c",
  f: "9",
  a: "9",
  d: "F",
  G: "z",
};

let originalSend = WebSocket.prototype.send;

WebSocket.prototype.send = new Proxy(originalSend, {
 apply: (target, websocket, argsList) => {
 let decoded = msgpack.decode(new Uint8Array(argsList[0]));
 if (PACKET_MAP.hasOwnProperty(decoded[0])) {
   decoded[0] = PACKET_MAP[decoded[0]];
 }
 return target.apply(websocket, [msgpack.encode(decoded)]);
 },
});
// ==End Packet Override==

(() => {
	const d = document,
		w = navigator.hardwareConcurrency || 8;
	d.head.appendChild(d.createElement("style")).innerHTML =
		"altcha-widget,#altcha{display:none!important;visibility:hidden!important}.altcha-toast{position:fixed;top:20px;right:20px;padding:10px 18px;border-radius:6px;font:600 14px/1.4 system-ui,sans-serif;color:#fff;z-index:999999;pointer-events:none;animation:altchaIn .2s ease,altchaOut .3s ease 2s forwards;box-shadow:0 4px 12px rgba(0,0,0,.3)}.altcha-toast--info{background:#3b82f6}.altcha-toast--success{background:#22c55e}.altcha-toast--error{background:#ef4444}@keyframes altchaIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes altchaOut{to{opacity:0;transform:translateY(-10px)}}";
	const toast = (level, msg, { duration = 2e3, title = "", time } = {}) => {
		const t = d.createElement("div");
		t.className = `altcha-toast altcha-toast--${level}`;
		t.textContent = `${title ? title + ": " : ""}${msg}${time != null ? " (" + (time / 1e3).toFixed(2) + "s)" : ""}`;
		d.body.appendChild(t);
		setTimeout(() => t.remove(), duration + 300);
	};
	const notify = {
		info: (m, o) => toast("info", m, o),
		success: (m, o) => toast("success", m, o),
		error: (m, o) => toast("error", m, o),
	};
	let solving = false,
		lastSig = null;
	const workerCode = `importScripts('https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/build/sha256.min.js');
onmessage=({data:{salt,challenge,start,end}})=>{
for(let i=start;i<=end;i++){
if(sha256(salt+i)===challenge)return postMessage({found:true,n:i});
}
postMessage({found:false});
};`;
	const blob = URL.createObjectURL(
		new Blob([workerCode], { type: "text/javascript" }),
	);
	const pool = Array.from({ length: w }, () => new Worker(blob));

	const solve = async (e) => {
		if (solving) return;
		let j = e.getAttribute("challengejson") || e.dataset?.challengejson;
		if (!j) {
			const u = e.getAttribute("challengeurl");
			if (!u || e.dataset?.f) return;
			try {
				new URL(u, location.href);
			} catch {
				return;
			}
			e.dataset.f = "1";
			try {
				const res = await fetch(u);
				if (!res.ok) {
					e.dataset.f = "0";
					return;
				}
				j = JSON.stringify(await res.json());
				e.setAttribute("challengejson", j);
			} catch {
				e.dataset.f = "0";
				return;
			}
			e.dataset.f = "0";
		}
		let p;
		try {
			p = JSON.parse(j);
		} catch {
			return;
		}
		if (!p.salt || !p.challenge || p.signature === lastSig) return;
		solving = true;
		const t0 = performance.now(),
			max = parseInt(p.maxnumber) || 1e6,
			chunk = Math.ceil(max / w);
		try {
			const result = await new Promise((resolve, reject) => {
				let done = false,
					pending = w;
				pool.forEach((worker, i) => {
					const start = i * chunk,
						end = Math.min(max - 1, (i + 1) * chunk - 1);
					worker.onmessage = ({ data }) => {
						if (done) return;
						if (data.found) {
							done = true;
							resolve({ n: data.n, t: performance.now() - t0 });
						} else if (--pending === 0) reject(new Error("Not found"));
					};
					worker.postMessage({
						salt: p.salt,
						challenge: p.challenge,
						start,
						end,
					});
				});
			});
			const payload = btoa(
				JSON.stringify({
					algorithm: p.algorithm || "SHA-256",
					challenge: p.challenge,
					salt: p.salt,
					number: result.n,
					signature: p.signature,
					took: Math.round(result.t),
				}),
			);
			lastSig = p.signature;
			e.dispatchEvent(
				new CustomEvent("statechange", {
					bubbles: true,
					detail: { state: "verified", payload },
				}),
			);
			const inp =
				e.querySelector('input[name="altcha"]') ||
				d.querySelector('input[name="altcha"]') ||
				e.querySelector('input[type="hidden"]') ||
				d.querySelector('input[type="hidden"]');

			if (inp) {
				inp.value = payload;
				inp.dispatchEvent(new Event("input", { bubbles: true }));
				setTimeout(() => {
					inp.dispatchEvent(new Event("change", { bubbles: true }));
				}, 100);
			} else {
				// Try to find any input in the altcha element or its parents
				let parent = e;
				for (let i = 0; i < 5 && parent; i++) {
					const anyInput = parent.querySelector('input');
					if (anyInput) {
						anyInput.value = payload;
						anyInput.dispatchEvent(new Event("input", { bubbles: true }));
						anyInput.dispatchEvent(new Event("change", { bubbles: true }));
						break;
					}
					parent = parent.parentElement;
				}

				// Last resort: create the input if it doesn't exist
				if (!parent) {
					const newInput = d.createElement('input');
					newInput.name = 'altcha';
					newInput.type = 'hidden';
					newInput.value = payload;
					e.appendChild(newInput);
				}
			}
		} catch {
			notify.error("Failed", { title: "Altcha" });
		} finally {
			solving = false;
		}
	};
	const check = (n) => {
		if (n.id === "altcha" || n.tagName === "ALTCHA-WIDGET") solve(n);
		const altchas = n.querySelectorAll?.("altcha-widget,#altcha");
		if (altchas && altchas.length > 0) {
			altchas.forEach(solve);
		}
	};
	new MutationObserver((m) =>
		m.forEach((x) => x.addedNodes.forEach(check)),
	).observe(d, { childList: true, subtree: true });
	new MutationObserver((m) =>
		m.forEach((x) => x.attributeName === "challengejson" && solve(x.target)),
	).observe(d, {
		attributes: true,
		subtree: true,
		attributeFilter: ["challengejson"],
	});
	d.querySelectorAll("altcha-widget,#altcha").forEach(solve);
})();

