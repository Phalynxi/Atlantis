// ==UserScript==
// @name         ! Abyss Client bundle
// @version      0.1
// @description  epik
// @author       Phalynx, Firaz and tinysweet
// @match        *://*.moomoo.io/*
// @match        http://localhost:1234/
// @icon         https://i.imgur.com/BmSVWPH.png
// @grant        none
// ==/UserScript==

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


var autoBreaking = false;
document.title = "Abyss Client";

const AbyssColors = {
  darkOutline: "#000000",
  background: "#000000",
  arrow: "#fff",
  PlayerBuildMark: "#8ecc51",
  TeamBuildMark: "#345eeb",
  EnemyBuildMark: "#cc5151",
};

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  const stripServerParam = () => {
    if (/(^|[?&])server=/.test(window.location.search || "")) {
      try {
        window.history.replaceState(
          null,
          "",
          window.location.origin + window.location.pathname,
        );
      } catch (_) { }
    }
  };
  stripServerParam();
  setInterval(stripServerParam, 500);
}

const instaReticle = new Image();
instaReticle.src = "https://i.imgur.com/msvee9i.png";

const PackTextures = {
  hats: {
    7: "https://i.imgur.com/vAOzlyY.png",
    12: "https://i.imgur.com/VSUId2s.png",
    13: "https://i.imgur.com/EwkbsHN.png",
    11: "https://i.imgur.com/yfqME8H.png",
    "11_p": "https://i.imgur.com/yfqME8H.png",
    "11_top": "https://i.imgur.com/s7Cxc9y.png",
    9: "https://i.imgur.com/1nY34aL.png",
    18: "https://i.imgur.com/in5H6vw.png",
    40: "https://i.imgur.com/AVOqAll.png",
    6: "https://i.imgur.com/vM9Ri8g.png",
    20: "https://i.imgur.com/f5uhWCk.png",
    23: "https://i.imgur.com/B9AcmcN.png",
    15: "https://i.imgur.com/YRQ8Ybq.png",
    8: "https://i.imgur.com/WHJch5H.png",
    14: "https://i.imgur.com/V8JrIwv.png",
    "14_p": "https://i.imgur.com/V8JrIwv.png",
    "14_top": "https://i.imgur.com/s7Cxc9y.png",
    31: "https://i.imgur.com/JPMqgSc.png",
  },
  accessories: {
    21: "https://i.imgur.com/4ddZert.png",
    18: "https://i.imgur.com/0rmN7L9.png",
    19: "https://i.imgur.com/Qyxy7IB.png",
  },
  weapons: {
    samurai_1_g: "https://i.imgur.com/h3nF00S.png",
    samurai_1_d: "https://i.imgur.com/xxvYtUT.png",
    samurai_1_r: "https://i.imgur.com/1G64fMe.png",

    sword_1_g: "https://i.imgur.com/urXBRpw.png",
    sword_1_d: "https://i.imgur.com/k4H1VyQ.png",
    sword_1_r: "https://i.imgur.com/V9dzAbF.png",

    spear_1_g: "https://i.imgur.com/WWfm7zT.png",
    spear_1_d: "https://i.imgur.com/5nPGXKb.png",
    spear_1_r: "https://i.imgur.com/UY7SV7j.png",

    great_axe_1_d: "https://i.imgur.com/vdTDWcn.png",
    great_axe_1_r: "https://i.imgur.com/UZ2HcQw.png",

    axe_1_d: "https://i.imgur.com/ufkQAa6.png",
    axe_1_r: "https://i.imgur.com/kr8H9g7.png",

    dagger_1_d: "https://i.imgur.com/KCufsmG.png",
    dagger_1_r: "https://i.imgur.com/CDAmjux.png",

    hammer_1_g: "https://i.imgur.com/WPWU8zC.png",
    hammer_1_d: "https://i.imgur.com/rlMQeG0.png",
    hammer_1_r: "https://i.imgur.com/oRXUfW8.png",

    great_hammer_1_g: "https://i.imgur.com/mleFosh.png",
    great_hammer_1_d: "https://i.imgur.com/yn7fqMO.png",
    great_hammer_1_r: "https://i.imgur.com/tmUzurk.png",

    bat_1_g: "https://i.imgur.com/ivLPh10.png",
    bat_1_d: "https://i.imgur.com/phXTNsa.png",
    bat_1_r: "https://i.imgur.com/6ayjbIz.png",

    stick_1_g: "https://i.imgur.com/NOaBBRd.png",
    stick_1_d: "https://i.imgur.com/H5wGqQR.png",
    stick_1_r: "https://i.imgur.com/uTDGDDy.png",

    bow_1_d: "https://i.imgur.com/qu7HHT5.png",
    bow_1_r: "https://i.imgur.com/Oneg3oF.png",

    crossbow_1_d: "https://i.imgur.com/TRqDlgX.png",
    crossbow_1_r: "https://i.imgur.com/EVesBtw.png",

    crossbow_2_d: "https://i.imgur.com/DVjCdwI.png",
    crossbow_2_r: "https://i.imgur.com/z4CyaXk.png",

    musket_1_g: "https://i.imgur.com/mAW9JAW.png",
    musket_1_d: "https://i.imgur.com/jwH99zm.png",
    musket_1_r: "https://i.imgur.com/jPE54IT.png",

    shield_1_g: "https://i.imgur.com/zYP8eVL.png",
    shield_1_d: "https://i.imgur.com/hSqLP3t.png",
    shield_1_r: "https://i.imgur.com/SNFV2dc.png",

    grab_1_g: "https://i.imgur.com/DRzBdFX.png",
    grab_1_d: "https://i.imgur.com/7kbtWfk.png",
    grab_1_r: "https://i.imgur.com/wV42LEE.png",
  },
};

const textureCache = new Map();

function getTexture(id, type) {
  let url = null;
  if (type === "hat") url = PackTextures.hats[id];
  else if (type === "acc") url = PackTextures.accessories[id];
  else if (type === "weapons") url = PackTextures.weapons[id];

  if (!url) return null;
  if (textureCache.has(url)) return textureCache.get(url);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  textureCache.set(url, img);
  return img;
}

const originalSrcDesc = Object.getOwnPropertyDescriptor(Image.prototype, "src");

Object.defineProperty(Image.prototype, "src", {
  get() {
    return originalSrcDesc.get.call(this);
  },
  set(value) {
    try {
      const paths = {
        "/hats/": { type: "hat", prefix: "hat_" },
        "/accessories/": { type: "acc", prefix: "access_" },
        "/weapons/": { type: "weapons", prefix: "/weapons/" },
      };

      for (const [path, { type, prefix }] of Object.entries(paths)) {
        if (value.includes(path)) {
          let id = value.split(prefix)[1]?.replace(".png", "");
          if (type === "hat" && id.includes("_"))
            id = id.split("_")[0] + "_" + id.split("_")[1];

          const replacement = getTexture(id, type);
          if (replacement) {
            value = replacement.src;
          }
          break;
        }
      }
    } catch (e) {
      console.warn("Texture pack error:", e);
    }

    return originalSrcDesc.set.call(this, value);
  },
  configurable: true,
});

function preloadTextures() {
  Object.keys(PackTextures.hats).forEach((id) => getTexture(id, "hat"));
  Object.keys(PackTextures.accessories).forEach((id) => getTexture(id, "acc"));
  Object.keys(PackTextures.weapons).forEach((id) => getTexture(id, "weapons"));
}

preloadTextures();

let clickedElements = {
  color: false,
};

const tryClickElements = () => {
  if (!clickedElements.color) {
    const colorElement = document.querySelector(
      "#skinColorHolder > div:nth-child(7)",
    );
    if (colorElement) {
      colorElement.click();
      clickedElements.color = true;
    }
  }

  if (!clickedElements.color) {
    setTimeout(tryClickElements, 500);
  }
};

setTimeout(tryClickElements, 1000);

function isChatActive() {
  const active = document.activeElement;
  if (!active) return false;
  const id = active.id;
  return (
    id === "ChatInPut" ||
    id === "ChatSearch" ||
    id === "chatBox" ||
    id === "allianceInput"
  );
}

document.addEventListener("keydown", function (event) {
  if (isChatActive()) return;
  if (event.keyCode === 192) {
    const chatHolder = document.getElementById("gameUI");
    if (chatHolder) {
      const currentDisplay = chatHolder.style.display;
      chatHolder.style.display = currentDisplay === "none" ? "block" : "none";
    }
  }
});

setInterval(() => window.follmoo && follmoo(), 10);
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
  const workerCode = `importScripts('https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/build/sha256.min.js');onmessage=({data:{salt,challenge,start,end}})=>{for(let i=start;i<=end;i++){if(sha256(salt+i)===challenge)return postMessage({found:true,n:i});}postMessage({found:false});};`;
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
    notify.info("Solving...", { duration: 1500, title: "Altcha" });
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
        d.querySelector('input[name="altcha"]');
      if (inp) {
        inp.value = payload;
        inp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      notify.success("Solved", {
        duration: 1500,
        title: "Altcha",
        time: result.t,
      });
    } catch {
      notify.error("Failed", { title: "Altcha" });
    } finally {
      solving = false;
    }
  };
  const check = (n) => {
    if (n.id === "altcha" || n.tagName === "ALTCHA-WIDGET") solve(n);
    n.querySelectorAll?.("altcha-widget,#altcha").forEach(solve);
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
function e(v, opt) {
  if (opt && opt.multiple && !Array.isArray(v))
    throw new Error(
      "Invalid argument type: Expected an Array to serialize multiple values.",
    );

  const D = 4294967296;
  const TE = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  let buf = new Uint8Array(256),
    p = 0;
  let fBuf, fView;

  const ensure = (n) => {
    const need = p + n;
    if (buf.length >= need) return;
    let cap = buf.length << 1;
    while (cap < need) cap <<= 1;
    const nb = new Uint8Array(cap);
    nb.set(buf);
    buf = nb;
  };

  const w1 = (a) => {
    ensure(1);
    buf[p++] = a;
  };
  const w2 = (a, b) => {
    ensure(2);
    buf[p++] = a;
    buf[p++] = b;
  };
  const w3 = (a, b, c) => {
    ensure(3);
    buf[p++] = a;
    buf[p++] = b;
    buf[p++] = c;
  };
  const w4 = (a, b, c, d) => {
    ensure(4);
    buf[p++] = a;
    buf[p++] = b;
    buf[p++] = c;
    buf[p++] = d;
  };
  const w5 = (a, b, c, d, e) => {
    ensure(5);
    buf[p++] = a;
    buf[p++] = b;
    buf[p++] = c;
    buf[p++] = d;
    buf[p++] = e;
  };
  const wU8a = (u8) => {
    ensure(u8.length);
    buf.set(u8, p);
    p += u8.length;
  };

  const writeU64 = (x) => {
    let hi = (x / D) | 0;
    let lo = (x % D) >>> 0;
    w4(hi >>> 24, hi >>> 16, hi >>> 8, hi);
    w4(lo >>> 24, lo >>> 16, lo >>> 8, lo);
  };

  const writeI64 = (x) => {
    let hi, lo;
    if (x >= 0) {
      hi = (x / D) | 0;
      lo = (x % D) >>> 0;
    } else {
      x += 1;
      hi = (Math.abs(x) / D) | 0;
      lo = (Math.abs(x) % D) >>> 0;
      hi = ~hi | 0;
      lo = ~lo >>> 0;
    }
    w4(hi >>> 24, hi >>> 16, hi >>> 8, hi);
    w4(lo >>> 24, lo >>> 16, lo >>> 8, lo);
  };

  const encUtf8Slow = (str) => {
    let ascii = true,
      n = str.length;
    for (let j = 0; j < n; j++)
      if (str.charCodeAt(j) > 127) {
        ascii = false;
        break;
      }
    let out = new Uint8Array(n * (ascii ? 1 : 4)),
      k = 0;
    for (let j = 0; j < n; j++) {
      let c = str.charCodeAt(j);
      if (c < 128) out[k++] = c;
      else {
        if (c < 2048) out[k++] = (c >> 6) | 192;
        else {
          if (c > 55295 && c < 56320) {
            if (++j >= n)
              throw new Error("UTF-8 encode: incomplete surrogate pair");
            const c2 = str.charCodeAt(j);
            if (c2 < 56320 || c2 > 57343)
              throw new Error("UTF-8 encode: second surrogate out of range");
            c = 65536 + ((c & 1023) << 10) + (c2 & 1023);
            out[k++] = (c >> 18) | 240;
            out[k++] = ((c >> 12) & 63) | 128;
          } else {
            out[k++] = (c >> 12) | 224;
          }
          out[k++] = ((c >> 6) & 63) | 128;
        }
        out[k++] = (c & 63) | 128;
      }
    }
    return ascii ? out : out.subarray(0, k);
  };

  const encStr = (str) => {
    const bytes = TE ? TE.encode(str) : encUtf8Slow(str);
    const n = bytes.length;
    if (n <= 31) w1(160 + n);
    else if (n <= 255) w2(217, n);
    else if (n <= 65535) w3(218, n >>> 8, n);
    else w5(219, n >>> 24, n >>> 16, n >>> 8, n);
    wU8a(bytes);
  };

  const encArr = (arr) => {
    const n = arr.length;
    if (n <= 15) w1(144 + n);
    else if (n <= 65535) w3(220, n >>> 8, n);
    else w5(221, n >>> 24, n >>> 16, n >>> 8, n);
    for (let j = 0; j < n; j++) enc(arr[j]);
  };

  const encMap = (obj) => {
    let count = 0;
    for (const k in obj) if (obj[k] !== undefined) count++;
    if (count <= 15) w1(128 + count);
    else if (count <= 65535) w3(222, count >>> 8, count);
    else w5(223, count >>> 24, count >>> 16, count >>> 8, count);

    for (const k in obj) {
      const val = obj[k];
      if (val === undefined) continue;
      encStr(k);
      enc(val);
    }
  };

  const enc = (x) => {
    switch (typeof x) {
      case "undefined":
        w1(192);
        return;
      case "boolean":
        w1(x ? 195 : 194);
        return;

      case "number": {
        let t = x;
        if (isFinite(t) && Number.isSafeInteger(t)) {
          if ((t >= 0 && t <= 127) || (t < 0 && t >= -32)) {
            w1(t & 255);
            return;
          }
          if (t > 0 && t <= 255) {
            w2(204, t);
            return;
          }
          if (t >= -128 && t <= 127) {
            w2(208, t & 255);
            return;
          }
          if (t > 0 && t <= 65535) {
            w3(205, t >>> 8, t);
            return;
          }
          if (t >= -32768 && t <= 32767) {
            w3(209, (t >>> 8) & 255, t & 255);
            return;
          }
          if (t > 0 && t <= 4294967295) {
            w5(206, t >>> 24, t >>> 16, t >>> 8, t);
            return;
          }
          if (t >= -2147483648 && t <= 2147483647) {
            w5(
              210,
              (t >>> 24) & 255,
              (t >>> 16) & 255,
              (t >>> 8) & 255,
              t & 255,
            );
            return;
          }

          if (t > 0 && t <= 0x10000000000000000) {
            w1(207);
            writeU64(t);
            return;
          }
          if (t >= -0x8000000000000000 && t <= 0x8000000000000000) {
            w1(211);
            writeI64(t);
            return;
          }

          if (t < 0) {
            w1(211);
            w4(128, 0, 0, 0);
            w4(0, 0, 0, 0);
            return;
          }
          w1(207);
          w4(255, 255, 255, 255);
          w4(255, 255, 255, 255);
          return;
        }

        if (!fView) {
          fBuf = new ArrayBuffer(8);
          fView = new DataView(fBuf);
        }
        fView.setFloat64(0, t, false);
        w1(203);
        wU8a(new Uint8Array(fBuf));
        return;
      }

      case "string":
        encStr(x);
        return;

      case "object": {
        if (x === null) {
          w1(192);
          return;
        }

        if (x instanceof Date) {
          const sec = x.getTime() / 1e3;
          if (x.getMilliseconds() === 0 && sec >= 0 && sec < 4294967296) {
            w3(214, 255, sec >>> 24);
            w3(sec >>> 16, sec >>> 8, sec);
          } else if (sec >= 0 && sec < 17179869184) {
            const a = (1e6 * x.getMilliseconds()) >>> 0;
            w2(215, 255);
            w4(a >>> 22, a >>> 14, a >>> 6, ((a << 2) >>> 0) | (sec / D));
            w4(sec >>> 24, sec >>> 16, sec >>> 8, sec);
          } else {
            const a = (1e6 * x.getMilliseconds()) >>> 0;
            w3(199, 12, 255);
            w4(a >>> 24, a >>> 16, a >>> 8, a);
            w1(211);
            writeI64(sec);
          }
          return;
        }

        if (Array.isArray(x)) {
          encArr(x);
          return;
        }

        if (x instanceof Uint8Array || x instanceof Uint8ClampedArray) {
          const L = x.length;
          if (L <= 255) w2(196, L);
          else if (L <= 65535) w3(197, L >>> 8, L);
          else w5(198, L >>> 24, L >>> 16, L >>> 8, L);
          wU8a(x);
          return;
        }

        if (
          x instanceof Int8Array ||
          x instanceof Int16Array ||
          x instanceof Uint16Array ||
          x instanceof Int32Array ||
          x instanceof Uint32Array ||
          x instanceof Float32Array ||
          x instanceof Float64Array
        ) {
          encArr(x);
          return;
        }

        encMap(x);
        return;
      }

      default:
        if (!opt || !opt.invalidTypeReplacement)
          throw new Error(
            "Invalid argument type: The type '" +
            typeof x +
            "' cannot be serialized.",
          );
        const rep =
          typeof opt.invalidTypeReplacement === "function"
            ? opt.invalidTypeReplacement(x)
            : opt.invalidTypeReplacement;
        enc(rep);
        return;
    }
  };

  if (opt && opt.multiple) for (let j = 0; j < v.length; j++) enc(v[j]);
  else enc(v);

  return buf.subarray(0, p);
}

function r(input, opt) {
  const D = 4294967296;
  const TD = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

  let o = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
  if (typeof o !== "object" || o == null || o.length === undefined)
    throw new Error(
      "Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.",
    );
  if (!o.length)
    throw new Error(
      "Invalid argument: The byte array to deserialize is empty.",
    );
  if (!(o instanceof Uint8Array)) o = new Uint8Array(o);

  let p = 0;

  const readU = (n) => {
    let v = 0;
    while (n-- > 0) v = v * 256 + o[p++];
    return v;
  };

  const readI = (n) => {
    let v = 0,
      first = true;
    while (n-- > 0) {
      const b = o[p++];
      if (first) {
        v += b & 127;
        if (b & 128) v -= 128;
        first = false;
      } else v = v * 256 + b;
    }
    return v;
  };

  const readF = (n) => {
    const dv = new DataView(o.buffer, p + o.byteOffset, n);
    p += n;
    return n === 4 ? dv.getFloat32(0, false) : dv.getFloat64(0, false);
  };

  const readBin = (lenBytes) => {
    let n = lenBytes < 0 ? readU(-lenBytes) : lenBytes;
    const out = o.subarray(p, p + n);
    p += n;
    return out;
  };

  const readStr = (lenBytes) => {
    let n = lenBytes < 0 ? readU(-lenBytes) : lenBytes;
    const start = p;
    p += n;
    const slice = o.subarray(start, start + n);
    if (TD) return TD.decode(slice);

    // slow fallback
    let s = "",
      i = 0;
    while (i < n) {
      let c = slice[i++];
      if (c < 128) s += String.fromCharCode(c);
      else if (c < 224)
        s += String.fromCharCode(((c & 31) << 6) | (slice[i++] & 63));
      else if (c < 240)
        s += String.fromCharCode(
          ((c & 15) << 12) | ((slice[i++] & 63) << 6) | (slice[i++] & 63),
        );
      else {
        const cp =
          ((c & 7) << 18) |
          ((slice[i++] & 63) << 12) |
          ((slice[i++] & 63) << 6) |
          (slice[i++] & 63);
        const u = cp - 65536;
        s += String.fromCharCode((u >> 10) | 55296, (u & 1023) | 56320);
      }
    }
    return s;
  };

  const readExt = (lenBytes) => {
    let n = lenBytes < 0 ? readU(-lenBytes) : lenBytes;
    const type = readU(1);
    const data = readBin(n);
    if (type !== 255) return { type, data };

    // timestamp ext (same logic you had)
    if (data.length === 4) {
      const t =
        ((data[0] << 24) >>> 0) +
        ((data[1] << 16) >>> 0) +
        ((data[2] << 8) >>> 0) +
        data[3];
      return new Date(1e3 * t);
    }
    if (data.length === 8) {
      const nsec =
        ((data[0] << 22) >>> 0) +
        ((data[1] << 14) >>> 0) +
        ((data[2] << 6) >>> 0) +
        (data[3] >>> 2);
      const sec =
        (3 & data[3]) * D +
        ((data[4] << 24) >>> 0) +
        ((data[5] << 16) >>> 0) +
        ((data[6] << 8) >>> 0) +
        data[7];
      return new Date(1e3 * sec + nsec / 1e6);
    }
    if (data.length !== 12)
      throw new Error("Invalid data length for a date value.");
    const nsec2 =
      ((data[0] << 24) >>> 0) +
      ((data[1] << 16) >>> 0) +
      ((data[2] << 8) >>> 0) +
      data[3];
    p -= 8;
    const sec2 = readI(8);
    return new Date(1e3 * sec2 + nsec2 / 1e6);
  };

  const decodeOne = () => {
    const b = o[p++];

    if (b <= 127) return b;
    if (b >= 224) return b - 256;

    if (b >= 160 && b <= 191) return readStr(b - 160);
    if (b >= 144 && b <= 159) {
      const n = b - 144,
        a = new Array(n);
      for (let i = 0; i < n; i++) a[i] = decodeOne();
      return a;
    }
    if (b >= 128 && b <= 143) {
      const n = b - 128,
        m = {};
      for (let i = 0; i < n; i++) {
        const k = decodeOne();
        if (k === "__proto__")
          throw new Error("The key __proto__ is not allowed");
        m[k] = decodeOne();
      }
      return m;
    }

    if (b === 192) return null;
    if (b === 194) return false;
    if (b === 195) return true;

    if (b === 196) return readBin(-1);
    if (b === 197) return readBin(-2);
    if (b === 198) return readBin(-4);

    if (b === 199) return readExt(-1);
    if (b === 200) return readExt(-2);
    if (b === 201) return readExt(-4);

    if (b === 202) return readF(4);
    if (b === 203) return readF(8);

    if (b === 204) return readU(1);
    if (b === 205) return readU(2);
    if (b === 206) return readU(4);
    if (b === 207) return readU(8);

    if (b === 208) return readI(1);
    if (b === 209) return readI(2);
    if (b === 210) return readI(4);
    if (b === 211) return readI(8);

    if (b === 212) return readExt(1);
    if (b === 213) return readExt(2);
    if (b === 214) return readExt(4);
    if (b === 215) return readExt(8);
    if (b === 216) return readExt(16);

    if (b === 217) return readStr(-1);
    if (b === 218) return readStr(-2);
    if (b === 219) return readStr(-4);

    if (b === 220) {
      const n = readU(2),
        a = new Array(n);
      for (let i = 0; i < n; i++) a[i] = decodeOne();
      return a;
    }
    if (b === 221) {
      const n = readU(4),
        a = new Array(n);
      for (let i = 0; i < n; i++) a[i] = decodeOne();
      return a;
    }
    if (b === 222) {
      const n = readU(2),
        m = {};
      for (let i = 0; i < n; i++) {
        const k = decodeOne();
        if (k === "__proto__")
          throw new Error("The key __proto__ is not allowed");
        m[k] = decodeOne();
      }
      return m;
    }
    if (b === 223) {
      const n = readU(4),
        m = {};
      for (let i = 0; i < n; i++) {
        const k = decodeOne();
        if (k === "__proto__")
          throw new Error("The key __proto__ is not allowed");
        m[k] = decodeOne();
      }
      return m;
    }

    if (b === 193) throw new Error("Invalid byte code 0xc1 found.");
    throw new Error(
      "Invalid byte value '" +
      b +
      "' at index " +
      (p - 1) +
      " (length " +
      o.length +
      ")",
    );
  };

  if (opt && opt.multiple) {
    const out = [];
    while (p < o.length) out.push(decodeOne());
    return out;
  }
  return decodeOne();
}
t;
var t = { serialize: e, deserialize: r, encode: e, decode: r };
var msgpack = t;
window.msgpack = msgpack;
if (typeof module == "object" && module && typeof module.exports == "object")
  module.exports = t;
else window[window.msgpackJsName || "msgpack"] = t;

function An(e) {
  if (e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default"))
    return e.default;
  return e;
}
var Fo = { exports: {} };
Fo.exports = { argv: [], env: {}, browser: true };
var Ul = Fo.exports;

const Ms = An(Ul);
const config = {
  maxScreenWidth: 1920,
  maxScreenHeight: 1080,
  inSandbox: Ms && {}.IS_SANDBOX,
  isSandbox: window.location.hostname == "sandbox.moomoo.io",
  serverUpdateRate: 9,
  clientSendRate: 5,
  maxPlayers: Ms && Ms.argv.indexOf("--largeserver") != -1 ? 80 : 40,
  maxPlayersHard: (Ms && Ms.argv.indexOf("--largeserver") != -1 ? 80 : 40) + 10,
  collisionDepth: 6,
  minimapRate: 3000,
  colGrid: 10,
  healthBarWidth: 50,
  healthBarPad: 4.5,
  iconPadding: 15,
  iconPad: 0.9,
  deathFadeout: 0,
  crownIconScale: 60,
  crownPad: 35,
  chatCountdown: 3000,
  chatCooldown: 500,
  nameY: 34,
  maxAge: 100,
  gatherAngle: Math.PI / 2.6,
  gatherWiggle: 10,
  hitReturnRatio: 0.25,
  hitAngle: Math.PI / 2,
  playerScale: 35,
  playerSpeed: 0.0016,
  playerDecel: 0.993,
  skinColors: [
    "#bf8f54",
    "#cbb091",
    "#896c4b",
    "#fadadc",
    "#ececec",
    "#c37373",
    "#4c4c4c",
    "#ecaff7",
    "#738cc3",
    "#8bc373",
    "#91b2db",
  ],
  animalCount: 7,
  aiTurnRandom: 0.06,
  cowNames: [
    "Sid",
    "Steph",
    "Bmoe",
    "Romn",
    "Jononthecool",
    "Fiona",
    "Vince",
    "Nathan",
    "Nick",
    "Flappy",
    "Ronald",
    "Otis",
    "Pepe",
    "Mc Donald",
    "Theo",
    "Fabz",
    "Oliver",
    "Jeff",
    "Jimmy",
    "Helena",
    "Reaper",
    "Ben",
    "Alan",
    "Naomi",
    "XYZ",
    "Clever",
    "Jeremy",
    "Mike",
    "Destined",
    "Stallion",
    "Allison",
    "Meaty",
    "Sophia",
    "Vaja",
    "Joey",
    "Pendy",
    "Murdoch",
    "Theo",
    "Jared",
    "July",
    "Sonia",
    "Mel",
    "Dexter",
    "Quinn",
    "Milky",
  ],
  shieldAngle: Math.PI / 3,
  weaponVariants: [
    { id: 0, src: "", xp: 0, val: 1 },
    { id: 1, src: "_g", xp: 3000, val: 1.1 },
    { id: 2, src: "_d", xp: 7000, val: 1.18 },
    { id: 3, src: "_r", xp: 12000, val: 1.18, poison: true },
  ],
  fetchVariant(e) {
    const t = e.weaponXP[e.weaponIndex] || 0;
    for (let i = this.weaponVariants.length - 1; i >= 0; --i) {
      if (t >= this.weaponVariants[i].xp) return this.weaponVariants[i];
    }
  },
  resourceTypes: ["wood", "food", "stone", "points"],
  areaCount: 7,
  treesPerArea: 9,
  bushesPerArea: 3,
  totalRocks: 32,
  goldOres: 7,
  riverWidth: 724,
  riverPadding: 114,
  waterCurrent: 0.0011,
  waveSpeed: 0.0001,
  waveMax: 1.3,
  treeScales: [150, 160, 165, 175],
  bushScales: [80, 85, 95],
  rockScales: [80, 85, 90],
  snowBiomeTop: 2400,
  snowSpeed: 0.75,
  maxNameLength: 15,
  mapScale: 14400,
  mapPingScale: 40,
  mapPingTime: 2200,
  volcanoScale: 320,
  innerVolcanoScale: 100,
  volcanoAnimalStrength: 2,
  volcanoAnimationDuration: 3200,
  volcanoAggressionRadius: 1440,
  volcanoAggressionPercentage: 0.2,
  volcanoDamagePerSecond: -1,
  volcanoLocationX: 14400 - 320 - 120,
  volcanoLocationY: 14400 - 320 - 120,
  MAX_ATTACK: 0.6,
  MAX_SPAWN_DELAY: 1,
  MAX_SPEED: 0.3,
  MAX_TURN_SPEED: 0.3,
  DAY_INTERVAL: 1440000,
};

const th = {
  encode(v) {
    return msgpack.serialize(v);
  },
};
const ih = {
  decode(u8) {
    return msgpack.deserialize(u8);
  },
};

const io = {
  socket: null,
  connected: false,
  socketId: -1,
  connect(url, cb, handlers) {
    if (this.socket) return;
    let hadError = false;
    const ws = (this.socket = new WebSocket(url));
    ws.binaryType = "arraybuffer";
    ws.onmessage = (ev) => {
      const [type, args] = ih.decode(new Uint8Array(ev.data));
      if (type === "io-init") this.socketId = args[0];
      else (handlers[type] || (() => { }))(...args);
    };
    ws.onopen = () => {
      this.connected = true;
      cb && cb();
    };
    ws.onclose = (ev) => {
      this.connected = false;
      if (ev.code === 4001) cb && cb("Invalid Connection");
      else if (!hadError) cb && cb("disconnected");
    };
    ws.onerror = () => {
      if (ws.readyState !== WebSocket.OPEN) {
        hadError = true;
        cb && cb("Socket error");
      }
    };
  },
  send(type, ...args) {
    if (this.socket) this.socket.send(th.encode([type, args]));
  },
  socketReady() {
    return !!(this.socket && this.connected);
  },
  close() {
    if (this.socket) this.socket.close();
    this.socket = null;
    this.connected = false;
  },
};

const UTILS = {
  Xo: Math.abs,
  nh: Math.sqrt,
  sh: Math.atan2,
  qn: Math.PI,

  randInt: function (e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  },
  randFloat: function (e, t) {
    return Math.random() * (t - e + 1) + e;
  },
  lerp: function (e, t, i) {
    return e + (t - e) * i;
  },
  decel: function (e, t) {
    if (e > 0) e = Math.max(0, e - t);
    else if (e < 0) e = Math.min(0, e + t);
    return e;
  },
  getDistance: function (e, t, i, n) {
    return UTILS.nh((i -= e) * i + (n -= t) * n);
  },
  getDirection: function (e, t, i, n) {
    return UTILS.sh(t - n, e - i);
  },
  getAngleDist: function (e, t) {
    const i = UTILS.Xo(t - e) % (UTILS.qn * 2);
    return i > UTILS.qn ? UTILS.qn * 2 - i : i;
  },
  isNumber: function (e) {
    return typeof e == "number" && !isNaN(e) && isFinite(e);
  },
  isString: function (e) {
    return e && typeof e == "string";
  },
  kFormat: (e) => {
    const SUFFIX = [
      "",
      "k",
      "m",
      "b",
      "t",
      "Qa",
      "Qi",
      "Sx",
      "Sp",
      "Oc",
      "No",
      "De",
      "Ud",
      "Dd",
      "Td",
      "Qad",
      "Qid",
      "Sxd",
      "Spd",
      "Ocd",
      "Nod",
      "Vig",
      "Uv",
      "Dv",
      "Tv",
      "Qav",
      "Qiv",
      "Sxv",
      "Spv",
      "Ocv",
      "Nov",
      "Trig",
      "Ut",
      "Dt",
      "Tt",
      "Qat",
      "Qit",
      "Sxt",
      "Spt",
      "Oct",
      "Not",
      "Qag",
      "Uq",
      "Dq",
      "Tq",
      "Qaq",
      "Qiq",
      "Sxq",
      "Spq",
      "Ocq",
      "Noq",
      "Quin",
      "Sex",
      "Sep",
      "Octo",
      "Nano",
      "Deca",
    ];
    if (!isFinite(e)) return "∞";
    if (e < 1000) return String(e);
    let i = Math.floor(Math.log10(e) / 3);
    if (i >= SUFFIX.length) return "∞";
    return (e / 10 ** (i * 3)).toFixed(1).replace(/\.0$/, "") + SUFFIX[i];
  },
  capitalizeFirst: function (e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  },
  fixTo: function (e, t) {
    return e ? parseFloat(e.toFixed(t)) : 0;
  },
  sortByPoints: function (e, t) {
    return parseFloat(t.points) - parseFloat(e.points);
  },
  lineInRect: function (e, t, i, n, s, r, o, l) {
    let c = s,
      a = o;
    if (s > o) {
      c = o;
      a = s;
    }
    if (a > i) a = i;
    if (c < e) c = e;
    if (c > a) return false;

    let f = r,
      d = l;
    const u = o - s;

    if (Math.abs(u) > 1e-7) {
      const p = (l - r) / u;
      const w = r - p * s;
      f = p * c + w;
      d = p * a + w;
    }
    if (f > d) {
      const p = d;
      d = f;
      f = p;
    }
    if (d > n) d = n;
    if (f < t) f = t;
    return !(f > d);
  },
  containsPoint: function (e, t, i) {
    const n = e.getBoundingClientRect();
    const s = n.left + window.scrollX;
    const r = n.top + window.scrollY;
    const o = n.width;
    const l = n.height;
    const c = t > s && t < s + o;
    const a = i > r && i < r + l;
    return c && a;
  },
  mousifyTouchEvent: function (e) {
    const t = e.changedTouches[0];
    e.screenX = t.screenX;
    e.screenY = t.screenY;
    e.clientX = t.clientX;
    e.clientY = t.clientY;
    e.pageX = t.pageX;
    e.pageY = t.pageY;
  },
  hookTouchEvents: function (e, t) {
    const block = !t;
    let n = false;
    if (block) e.style.touchAction = "none";
    const opts = { passive: true };

    e.addEventListener("touchstart", UTILS.checkTrusted(r), opts);
    e.addEventListener("touchmove", UTILS.checkTrusted(o), opts);
    e.addEventListener("touchend", UTILS.checkTrusted(l), opts);
    e.addEventListener("touchcancel", UTILS.checkTrusted(l), opts);
    e.addEventListener("touchleave", UTILS.checkTrusted(l), opts);

    function r(c) {
      UTILS.mousifyTouchEvent(c);
      window.setUsingTouch(true);
      if (e.onmouseover) e.onmouseover(c);
      n = true;
    }
    function o(c) {
      UTILS.mousifyTouchEvent(c);
      window.setUsingTouch(true);
      if (UTILS.containsPoint(e, c.pageX, c.pageY)) {
        if (!n) {
          e.onmouseover?.(c);
          n = true;
        }
      } else if (n) {
        e.onmouseout?.(c);
        n = false;
      }
    }
    function l(c) {
      UTILS.mousifyTouchEvent(c);
      window.setUsingTouch(true);
      if (n) {
        e.onclick?.(c);
        e.onmouseout?.(c);
        n = false;
      }
    }
  },
  removeAllChildren: function (e) {
    for (; e.hasChildNodes();) e.removeChild(e.lastChild);
  },
  generateElement: function (e) {
    const t = document.createElement(e.tag || "div");
    function i(n, s) {
      if (e[n]) t[s] = e[n];
    }

    i("text", "textContent");
    i("html", "innerHTML");
    i("class", "className");

    for (const n in e) {
      switch (n) {
        case "tag":
        case "text":
        case "html":
        case "class":
        case "style":
        case "hookTouch":
        case "parent":
        case "children":
          continue;
      }
      t[n] = e[n];
    }

    if (t.onclick) t.onclick = UTILS.checkTrusted(t.onclick);
    if (t.onmouseover) t.onmouseover = UTILS.checkTrusted(t.onmouseover);
    if (t.onmouseout) t.onmouseout = UTILS.checkTrusted(t.onmouseout);

    if (e.style) t.style.cssText = e.style;
    if (e.hookTouch) UTILS.hookTouchEvents(t);
    if (e.parent) e.parent.appendChild(t);
    if (e.children)
      for (let n = 0; n < e.children.length; n++) t.appendChild(e.children[n]);

    return t;
  },
  eventIsTrusted: function (e) {
    return e && typeof e.isTrusted == "boolean" ? e.isTrusted : true;
  },
  checkTrusted: function (e) {
    return function (t) {
      if (t && t instanceof Event && UTILS.eventIsTrusted(t)) e(t);
    };
  },
  randomString: function (e) {
    let t = "";
    const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let n = 0; n < e; n++)
      t += i.charAt(Math.floor(Math.random() * i.length));
    return t;
  },
  countInArray: function (e, t) {
    let i = 0;
    for (let n = 0; n < e.length; n++) if (e[n] === t) i++;
    return i;
  },

  getDirect: function (tmp1, tmp2, type1, type2) {
    const tmpXY1 = {
      x:
        type1 == 0
          ? tmp1.x
          : type1 == 1
            ? tmp1.x1
            : type1 == 2
              ? tmp1.x2
              : type1 == 3 && tmp1.x3,
      y:
        type1 == 0
          ? tmp1.y
          : type1 == 1
            ? tmp1.y1
            : type1 == 2
              ? tmp1.y2
              : type1 == 3 && tmp1.y3,
    };
    const tmpXY2 = {
      x:
        type2 == 0
          ? tmp2.x
          : type2 == 1
            ? tmp2.x1
            : type2 == 2
              ? tmp2.x2
              : type2 == 3 && tmp2.x3,
      y:
        type2 == 0
          ? tmp2.y
          : type2 == 1
            ? tmp2.y1
            : type2 == 2
              ? tmp2.y2
              : type2 == 3 && tmp2.y3,
    };
    return UTILS.sh(tmpXY1.y - tmpXY2.y, tmpXY1.x - tmpXY2.x);
  },
  getDist: function (tmp1, tmp2, type1, type2) {
    const tmpXY1 = {
      x:
        type1 == 0
          ? tmp1.x
          : type1 == 1
            ? tmp1.x1
            : type1 == 2
              ? tmp1.x2
              : type1 == 3 && tmp1.x3,
      y:
        type1 == 0
          ? tmp1.y
          : type1 == 1
            ? tmp1.y1
            : type1 == 2
              ? tmp1.y2
              : type1 == 3 && tmp1.y3,
    };
    const tmpXY2 = {
      x:
        type2 == 0
          ? tmp2.x
          : type2 == 1
            ? tmp2.x1
            : type2 == 2
              ? tmp2.x2
              : type2 == 3 && tmp2.x3,
      y:
        type2 == 0
          ? tmp2.y
          : type2 == 1
            ? tmp2.y1
            : type2 == 2
              ? tmp2.y2
              : type2 == 3 && tmp2.y3,
    };
    return UTILS.nh(
      (tmpXY2.x -= tmpXY1.x) * tmpXY2.x + (tmpXY2.y -= tmpXY1.y) * tmpXY2.y,
    );
  },
  safeDistance: function (a, b) {
    if (!a || !b) return Infinity;
    const ax = Array.isArray(a) ? a[1] : a.x;
    const ay = Array.isArray(a) ? a[2] : a.y;
    const bx = Array.isArray(b) ? b[1] : b.x;
    const by = Array.isArray(b) ? b[2] : b.y;
    if (ax == null || ay == null || bx == null || by == null) return Infinity;
    return Math.hypot(by - ay, bx - ax);
  },
};
const Animtext = function () {
  this.init = function (e, t, i, n, s, r, o) {
    this.x = e;
    this.y = t;
    this.color = o;
    this.scale = i;
    this.startScale = this.scale;
    this.maxScale = i * 1.5;
    this.scaleSpeed = 0.7;
    this.speed = n;
    this.life = s;
    this.text = r;
  };
  this.update = function (e) {
    if (this.life) {
      this.life -= e;
      this.y -= this.speed * e;
      this.scale += this.scaleSpeed * e;
      if (this.scale >= this.maxScale) {
        this.scale = this.maxScale;
        this.scaleSpeed *= -1;
      } else if (this.scale <= this.startScale) {
        this.scale = this.startScale;
        this.scaleSpeed = 0;
      }
      if (this.life <= 0) {
        this.life = 0;
      }
    }
  };
  this.render = function (e, t, i) {
    e.fillStyle = this.color;
    e.font = this.scale + "px Hammersmith One";
    e.fillText(this.text, this.x - t, this.y - i);
  };
};

const textmanager = function () {
  this.texts = [];
  this.update = function (dt, ctx, xOff, yOff) {
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let i = 0; i < this.texts.length; i++) {
      const t = this.texts[i];
      if (t.life) {
        t.update(dt);
        t.render(ctx, xOff, yOff);
      }
    }
  };
  this.showText = function (x, y, size, speed, life, text, color, stacked) {
    const num = +text;
    const isNum = Number.isFinite(num);
    if (isNum && num === 0) return;
    if (stacked && isNum) {
      for (let i = 0; i < this.texts.length; i++) {
        const t = this.texts[i];
        if (!t.life) continue;
        if (t.color !== color) continue;
        const dx = t.x - x,
          dy = t.y - y;
        if (dx * dx + dy * dy > 400) continue;
        const old = +t.text;
        if (!Number.isFinite(old)) continue;
        const sum = old + num;
        if (sum === 0) {
          t.life = 0;
          return;
        }
        t.text = sum + "";
        t.life = life;
        return;
      }
    }
    let obj = this.texts.find((t) => !t.life);
    if (!obj) {
      obj = new Animtext();
      this.texts.push(obj);
    }
    obj.init(x, y, size, speed, life, text, color);
  };
};
const twgithub =
  "https://raw.githubusercontent.com/DDatiOSCheat/MooMoo-TW-GG/main/sound/";
const SoundManager = function (e, t) {
  this.sounds = [];
  this.active = true;

  this.play = function (n, s = 1, r = false) {
    if (!this.active) return;

    let howl = this.sounds[n];
    if (!howl) {
      howl = new Howl({
        src: [twgithub + n + ".mp3"],
        html5: true,
      });
      this.sounds[n] = howl;
    }

    if (!r && howl.playing()) return;

    howl.volume((s || 1) * e.volumeMult);
    howl.loop(!!r);
    howl.play();
  };

  this.toggleMute = function (n, s) {
    const howl = this.sounds[n];
    if (howl) howl.mute(!!s);
  };

  this.stop = function (n) {
    const howl = this.sounds[n];
    if (howl) howl.stop();
  };
};
const br = Math.floor;
const Sr = Math.abs;
const Ti = Math.cos;
const Mi = Math.sin;
const Mh = Math.sqrt;
function Objectmanager(e, t, i, n, s, r, cfg, projectilePool, ProjectileCtor) {
  this.objects = t;
  this.grids = {};
  this.updateObjects = [];
  let o;
  let l;
  const c = n.mapScale / n.colGrid;
  this.setObjectGrids = function (u) {
    const p = Math.min(n.mapScale, Math.max(0, u.x));
    const w = Math.min(n.mapScale, Math.max(0, u.y));
    for (let x = 0; x < n.colGrid; ++x) {
      o = x * c;
      for (let b = 0; b < n.colGrid; ++b) {
        l = b * c;
        if (
          p + u.scale >= o &&
          p - u.scale <= o + c &&
          w + u.scale >= l &&
          w - u.scale <= l + c
        ) {
          if (!this.grids[x + "_" + b]) {
            this.grids[x + "_" + b] = [];
          }
          this.grids[x + "_" + b].push(u);
          u.gridLocations.push(x + "_" + b);
        }
      }
    }
  };
  this.removeObjGrid = function (u) {
    let p;
    for (let w = 0; w < u.gridLocations.length; ++w) {
      p = this.grids[u.gridLocations[w]].indexOf(u);
      if (p >= 0) {
        this.grids[u.gridLocations[w]].splice(p, 1);
      }
    }
  };
  this.disableObj = function (u) {
    u.active = false;
    if (r) {
      if (u.owner && u.pps) {
        u.owner.pps -= u.pps;
      }
      this.removeObjGrid(u);
      const p = this.updateObjects.indexOf(u);
      if (p >= 0) {
        this.updateObjects.splice(p, 1);
      }
    }
  };
  this.hitObj = function (u, p) {
    for (let w = 0; w < s.length; ++w) {
      if (s[w].active) {
        if (u.sentTo[s[w].id]) {
          if (u.active) {
            if (s[w].canSee(u)) {
              r.send(s[w].id, "L", i.fixTo(p, 1), u.sid);
            }
          } else {
            r.send(s[w].id, "Q", u.sid);
          }
        }
        if (!u.active && u.owner == s[w]) {
          s[w].changeItemCount(u.group.id, -1);
        }
      }
    }
  };
  const a = [];
  let f;
  this.getGridArrays = function (u, p, w) {
    o = br(u / c);
    l = br(p / c);
    a.length = 0;
    try {
      if (this.grids[o + "_" + l]) {
        a.push(this.grids[o + "_" + l]);
      }
      if (u + w >= (o + 1) * c) {
        f = this.grids[o + 1 + "_" + l];
        if (f) {
          a.push(f);
        }
        if (l && p - w <= l * c) {
          f = this.grids[o + 1 + "_" + (l - 1)];
          if (f) {
            a.push(f);
          }
        } else if (p + w >= (l + 1) * c) {
          f = this.grids[o + 1 + "_" + (l + 1)];
          if (f) {
            a.push(f);
          }
        }
      }
      if (o && u - w <= o * c) {
        f = this.grids[o - 1 + "_" + l];
        if (f) {
          a.push(f);
        }
        if (l && p - w <= l * c) {
          f = this.grids[o - 1 + "_" + (l - 1)];
          if (f) {
            a.push(f);
          }
        } else if (p + w >= (l + 1) * c) {
          f = this.grids[o - 1 + "_" + (l + 1)];
          if (f) {
            a.push(f);
          }
        }
      }
      if (p + w >= (l + 1) * c) {
        f = this.grids[o + "_" + (l + 1)];
        if (f) {
          a.push(f);
        }
      }
      if (l && p - w <= l * c) {
        f = this.grids[o + "_" + (l - 1)];
        if (f) {
          a.push(f);
        }
      }
    } catch { }
    return a;
  };
  let d;
  this.add = function (u, p, w, x, b, $, v, S, R) {
    d = null;
    for (var G = 0; G < t.length; ++G) {
      if (t[G].sid == u) {
        d = t[G];
        break;
      }
    }
    if (!d) {
      for (var G = 0; G < t.length; ++G) {
        if (!t[G].active) {
          d = t[G];
          break;
        }
      }
    }
    if (!d) {
      d = new e(u);
      t.push(d);
    }
    if (S) {
      d.sid = u;
    }
    d.init(p, w, x, b, $, v, R);
    if (r) {
      this.setObjectGrids(d);
      if (d.doUpdate) {
        this.updateObjects.push(d);
      }
    }
  };
  this.disableBySid = function (u) {
    for (let p = 0; p < t.length; ++p) {
      if (t[p].sid == u) {
        this.disableObj(t[p]);
        break;
      }
    }
  };
  this.removeAllItems = function (u, p) {
    for (let w = 0; w < t.length; ++w) {
      if (t[w].active && t[w].owner && t[w].owner.sid == u) {
        this.disableObj(t[w]);
      }
    }
    if (p) {
      p.broadcast("R", u);
    }
  };
  this.fetchSpawnObj = function (u) {
    let p = null;
    for (let w = 0; w < t.length; ++w) {
      d = t[w];
      if (d.active && d.owner && d.owner.sid == u && d.spawnPoint) {
        p = [d.x, d.y];
        this.disableObj(d);
        r.broadcast("Q", d.sid);
        if (d.owner) {
          d.owner.changeItemCount(d.group.id, -1);
        }
        break;
      }
    }
    return p;
  };
  this.checkItemLocation = function (u, p, w, x, b, $, v) {
    let cantPlace = false;
    for (let S = 0; S < t.length; ++S) {
      const obj = t[S];
      if (!obj.active) continue;
      const R = obj.blocker ? obj.blocker : obj.getScale(x, obj.isItem);
      if (i.getDistance(u, p, obj.x, obj.y) < w + R) {
        cantPlace = true;
        break;
      }
    }
    if (!cantPlace) {
      if (
        !$ &&
        b != 18 &&
        p >= n.mapScale / 2 - n.riverWidth / 2 &&
        p <= n.mapScale / 2 + n.riverWidth / 2
      ) {
        cantPlace = true;
      }
    }
    return !cantPlace;
  };
  this.addProjectile = function (u, p, w, x, b) {
    const meta = cfg.projectiles[b];
    let v;

    for (let k = 0; k < projectilePool.length; k++) {
      if (!projectilePool[k].active) {
        v = projectilePool[k];
        break;
      }
    }
    if (!v) {
      v = new ProjectileCtor(s, i);
      projectilePool.push(v);
    }
    v.init(b, u, p, w, meta.speed, x, meta.scale);
  };
  this.checkCollision = function (u, p, w) {
    w = w || 1;
    const x = u.x - p.x;
    const b = u.y - p.y;
    let $ = u.scale + p.scale;
    if (Sr(x) <= $ || Sr(b) <= $) {
      $ = u.scale + (p.getScale ? p.getScale() : p.scale);
      let v = Mh(x * x + b * b) - $;
      if (v <= 0) {
        if (p.ignoreCollision) {
          if (
            p.trap &&
            !u.noTrap &&
            p.owner != u &&
            !(p.owner && p.owner.team && p.owner.team == u.team)
          ) {
            u.lockMove = true;
            p.hideFromEnemy = false;
          } else if (p.boostSpeed) {
            u.xVel += w * p.boostSpeed * (p.weightM || 1) * Ti(p.dir);
            u.yVel += w * p.boostSpeed * (p.weightM || 1) * Mi(p.dir);
          } else if (p.healCol) {
            u.healCol = p.healCol;
          } else if (p.teleport) {
            u.x = i.randInt(0, n.mapScale);
            u.y = i.randInt(0, n.mapScale);
          }
        } else {
          const S = i.getDirection(u.x, u.y, p.x, p.y);
          i.getDistance(u.x, u.y, p.x, p.y);
          if (p.isPlayer) {
            v = (v * -1) / 2;
            u.x += v * Ti(S);
            u.y += v * Mi(S);
            p.x -= v * Ti(S);
            p.y -= v * Mi(S);
          } else {
            u.x = p.x + $ * Ti(S);
            u.y = p.y + $ * Mi(S);
            u.xVel *= 0.75;
            u.yVel *= 0.75;
          }
          if (
            p.dmg &&
            p.owner != u &&
            !(p.owner && p.owner.team && p.owner.team == u.team)
          ) {
            u.changeHealth(-p.dmg, p.owner, p);
            const R = (p.weightM || 1) * 1.5;
            u.xVel += R * Ti(S);
            u.yVel += R * Mi(S);
            if (p.pDmg && !(u.skin && u.skin.poisonRes)) {
              u.dmgOverTime.dmg = p.pDmg;
              u.dmgOverTime.time = 5;
              u.dmgOverTime.doer = p.owner;
            }
            if (u.colDmg && p.health) {
              if (p.changeHealth(-u.colDmg)) {
                this.disableObj(p);
              }
              this.hitObj(p, i.getDirection(u.x, u.y, p.x, p.y));
            }
          }
        }
        if (p.zIndex > u.zIndex) {
          u.zIndex = p.zIndex;
        }
        return true;
      }
    }
    return false;
  };
}
function ProjectileManager(e, t, i, n, s, r, o, l, c) {
  this.addProjectile = function (a, f, d, u, p, w, x, b, $) {
    const v = r.projectiles[w];
    let S;
    for (let R = 0; R < t.length; ++R) {
      if (!t[R].active) {
        S = t[R];
        break;
      }
    }
    if (!S) {
      S = new e(i, n, s, r, o, l, c);
      S.sid = t.length;
      t.push(S);
    }
    S.init(w, a, f, d, p, v.dmg, u, v.scale, x);
    S.ignoreObj = b;
    S.layer = $ || v.layer;
    S.src = v.src;
    return S;
  };
}
function AiManager(e, t, i, n, s, r, o, l, c) {
  this.aiTypes = [
    {
      id: 0,
      src: "cow_1",
      killScore: 150,
      health: 500,
      weightM: 0.8,
      speed: 0.00095,
      turnSpeed: 0.001,
      scale: 72,
      drop: ["food", 50],
    },
    {
      id: 1,
      src: "pig_1",
      killScore: 200,
      health: 800,
      weightM: 0.6,
      speed: 0.00085,
      turnSpeed: 0.001,
      scale: 72,
      drop: ["food", 80],
    },
    {
      id: 2,
      name: "Bull",
      src: "bull_2",
      hostile: true,
      dmg: 20,
      killScore: 1000,
      health: 1800,
      weightM: 0.5,
      speed: 0.00094,
      turnSpeed: 0.00074,
      scale: 78,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 100],
    },
    {
      id: 3,
      name: "Bully",
      src: "bull_1",
      hostile: true,
      dmg: 20,
      killScore: 2000,
      health: 2800,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 0.0008,
      scale: 90,
      viewRange: 900,
      chargePlayer: true,
      drop: ["food", 400],
    },
    {
      id: 4,
      name: "Wolf",
      src: "wolf_1",
      hostile: true,
      dmg: 8,
      killScore: 500,
      health: 300,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 0.002,
      scale: 84,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 200],
    },
    {
      id: 5,
      name: "Quack",
      src: "chicken_1",
      dmg: 8,
      killScore: 2000,
      noTrap: true,
      health: 300,
      weightM: 0.2,
      speed: 0.0018,
      turnSpeed: 0.006,
      scale: 70,
      drop: ["food", 100],
    },
    {
      id: 6,
      name: "MOOSTAFA",
      nameScale: 50,
      src: "enemy",
      hostile: true,
      dontRun: true,
      fixedSpawn: true,
      spawnDelay: 60000,
      noTrap: true,
      colDmg: 100,
      dmg: 40,
      killScore: 8000,
      health: 18000,
      weightM: 0.4,
      speed: 0.0007,
      turnSpeed: 0.01,
      scale: 80,
      spriteMlt: 1.8,
      leapForce: 0.9,
      viewRange: 1000,
      hitRange: 210,
      hitDelay: 1000,
      chargePlayer: true,
      drop: ["food", 100],
    },
    {
      id: 7,
      name: "Treasure",
      hostile: true,
      nameScale: 35,
      src: "crate_1",
      fixedSpawn: true,
      spawnDelay: 120000,
      colDmg: 200,
      killScore: 5000,
      health: 20000,
      weightM: 0.1,
      speed: 0,
      turnSpeed: 0,
      scale: 70,
      spriteMlt: 1,
    },
    {
      id: 8,
      name: "MOOFIE",
      src: "wolf_2",
      hostile: true,
      fixedSpawn: true,
      dontRun: true,
      hitScare: 4,
      spawnDelay: 30000,
      noTrap: true,
      nameScale: 35,
      dmg: 10,
      colDmg: 100,
      killScore: 3000,
      health: 7000,
      weightM: 0.45,
      speed: 0.0015,
      turnSpeed: 0.002,
      scale: 90,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 1000],
    },
    {
      id: 9,
      name: "MOOFIE :3",
      src: "wolf_2",
      hostile: true,
      fixedSpawn: true,
      dontRun: true,
      hitScare: 50,
      spawnDelay: 60000,
      noTrap: true,
      nameScale: 35,
      dmg: 12,
      colDmg: 100,
      killScore: 3000,
      health: 9000,
      weightM: 0.45,
      speed: 0.0015,
      turnSpeed: 0.0025,
      scale: 94,
      viewRange: 1440,
      chargePlayer: true,
      drop: ["food", 3000],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
    {
      id: 10,
      name: "Wolf :3",
      src: "wolf_1",
      hostile: true,
      fixedSpawn: true,
      dontRun: true,
      hitScare: 50,
      spawnDelay: 30000,
      dmg: 10,
      killScore: 700,
      health: 500,
      weightM: 0.45,
      speed: 0.00115,
      turnSpeed: 0.0025,
      scale: 88,
      viewRange: 1440,
      chargePlayer: true,
      drop: ["food", 400],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
    {
      id: 11,
      name: "Bully :3",
      src: "bull_1",
      hostile: true,
      fixedSpawn: true,
      dontRun: true,
      hitScare: 50,
      dmg: 20,
      killScore: 5000,
      health: 5000,
      spawnDelay: 100000,
      weightM: 0.45,
      speed: 0.00115,
      turnSpeed: 0.0025,
      scale: 94,
      viewRange: 1440,
      chargePlayer: true,
      drop: ["food", 800],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
  ];
  this.spawn = function (a, f, d, u) {
    if (!this.aiTypes[u]) {
      console.error("missing ai type", u);
      return this.spawn(a, f, d, 0);
    }
    let p;
    for (let w = 0; w < e.length; ++w) {
      if (!e[w].active) {
        p = e[w];
        break;
      }
    }
    if (!p) {
      p = new t(e.length, s, i, n, o, r, l, c);
      e.push(p);
    }
    p.init(a, f, d, u, this.aiTypes[u]);
    return p;
  };
}
const Nt = Math.PI * 2;
const Gn = 0;
function AI(e, t, i, n, s, r, o, l) {
  this.sid = e;
  this.isAI = true;
  this.nameIndex = s.randInt(0, r.cowNames.length - 1);
  this.init = function (d, u, p, w, x) {
    this.x = d;
    this.y = u;
    this.startX = x.fixedSpawn ? d : null;
    this.startY = x.fixedSpawn ? u : null;
    this.xVel = 0;
    this.yVel = 0;
    this.zIndex = 0;
    this.dir = p;
    this.dirPlus = 0;
    this.index = w;
    this.src = x.src;
    if (x.name) {
      this.name = x.name;
    }
    if ((this.name || "").startsWith(":3")) {
      this.isVolcanoAi = true;
    }
    this.weightM = x.weightM;
    this.speed = x.speed;
    this.killScore = x.killScore;
    this.turnSpeed = x.turnSpeed;
    this.scale = x.scale;
    this.maxHealth = x.health;
    this.leapForce = x.leapForce;
    this.health = this.maxHealth;
    this.chargePlayer = x.chargePlayer;
    this.viewRange = x.viewRange;
    this.drop = x.drop;
    this.dmg = x.dmg;
    this.hostile = x.hostile;
    this.dontRun = x.dontRun;
    this.hitRange = x.hitRange;
    this.hitDelay = x.hitDelay;
    this.hitScare = x.hitScare;
    this.spriteMlt = x.spriteMlt;
    this.nameScale = x.nameScale;
    this.colDmg = x.colDmg;
    this.noTrap = x.noTrap;
    this.spawnDelay = x.spawnDelay;
    this.minSpawnRange = x.minSpawnRange;
    this.maxSpawnRange = x.maxSpawnRange;
    this.hitWait = 0;
    this.waitCount = 1000;
    this.moveCount = 0;
    this.targetDir = 0;
    this.active = true;
    this.alive = true;
    this.runFrom = null;
    this.chargeTarget = null;
    this.dmgOverTime = {};
  };
  this.getVolcanoAggression = function () {
    const d = s.getDistance(
      this.x,
      this.y,
      r.volcanoLocationX,
      r.volcanoLocationY,
    );
    const u = d > r.volcanoAggressionRadius ? 0 : r.volcanoAggressionRadius - d;
    return (
      1 + r.volcanoAggressionPercentage * (1 - u / r.volcanoAggressionRadius)
    );
  };
  let c = 0;
  this.update = function (d) {
    if (this.active) {
      if (this.spawnCounter) {
        this.spawnCounter -= d * 1 * this.getVolcanoAggression();
        if (this.spawnCounter <= 0) {
          this.spawnCounter = 0;
          if (this.minSpawnRange || this.maxSpawnRange) {
            const V = r.mapScale * this.minSpawnRange;
            const F = r.mapScale * this.maxSpawnRange;
            this.x = s.randInt(V, F);
            this.y = s.randInt(V, F);
          } else {
            this.x = this.startX || s.randInt(0, r.mapScale);
            this.y = this.startY || s.randInt(0, r.mapScale);
          }
        }
        return;
      }
      c -= d;
      if (c <= 0) {
        if (this.dmgOverTime.dmg) {
          this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
          this.dmgOverTime.time -= 1;
          if (this.dmgOverTime.time <= 0) {
            this.dmgOverTime.dmg = 0;
          }
        }
        c = 1000;
      }
      let v = false;
      let S = 1;
      if (
        !this.zIndex &&
        !this.lockMove &&
        this.y >= r.mapScale / 2 - r.riverWidth / 2 &&
        this.y <= r.mapScale / 2 + r.riverWidth / 2
      ) {
        S = 0.33;
        this.xVel += r.waterCurrent * d;
      }
      if (this.lockMove) {
        this.xVel = 0;
        this.yVel = 0;
      } else if (this.waitCount > 0) {
        this.waitCount -= d;
        if (this.waitCount <= 0) {
          if (this.chargePlayer) {
            let V;
            let F;
            let _;
            for (var u = 0; u < i.length; ++u) {
              if (i[u].alive && !(i[u].skin && i[u].skin.bullRepel)) {
                _ = s.getDistance(this.x, this.y, i[u].x, i[u].y);
                if (_ <= this.viewRange && (!V || _ < F)) {
                  F = _;
                  V = i[u];
                }
              }
            }
            if (V) {
              this.chargeTarget = V;
              this.moveCount = s.randInt(8000, 12000);
            } else {
              this.moveCount = s.randInt(1000, 2000);
              this.targetDir = s.randFloat(-Math.PI, Math.PI);
            }
          } else {
            this.moveCount = s.randInt(4000, 10000);
            this.targetDir = s.randFloat(-Math.PI, Math.PI);
          }
        }
      } else if (this.moveCount > 0) {
        var p =
          this.speed * S * (1 + r.MAX_SPEED * Gn) * this.getVolcanoAggression();
        if (
          this.runFrom &&
          this.runFrom.active &&
          !(this.runFrom.isPlayer && !this.runFrom.alive)
        ) {
          this.targetDir = s.getDirection(
            this.x,
            this.y,
            this.runFrom.x,
            this.runFrom.y,
          );
          p *= 1.42;
        } else if (this.chargeTarget && this.chargeTarget.alive) {
          this.targetDir = s.getDirection(
            this.chargeTarget.x,
            this.chargeTarget.y,
            this.x,
            this.y,
          );
          p *= 1.75;
          v = true;
        }
        if (this.hitWait) {
          p *= 0.3;
        }
        if (this.dir != this.targetDir) {
          this.dir %= Nt;
          const V = (this.dir - this.targetDir + Nt) % Nt;
          const F = Math.min(Math.abs(V - Nt), V, this.turnSpeed * d);
          const _ = V - Math.PI >= 0 ? 1 : -1;
          this.dir += _ * F + Nt;
        }
        this.dir %= Nt;
        this.xVel += p * d * Math.cos(this.dir);
        this.yVel += p * d * Math.sin(this.dir);
        this.moveCount -= d;
        if (this.moveCount <= 0) {
          this.runFrom = null;
          this.chargeTarget = null;
          this.waitCount = this.hostile ? 1500 : s.randInt(1500, 6000);
        }
      }
      this.zIndex = 0;
      this.lockMove = false;
      var w;
      const R = s.getDistance(0, 0, this.xVel * d, this.yVel * d);
      const G = Math.min(4, Math.max(1, Math.round(R / 40)));
      const X = 1 / G;
      for (var u = 0; u < G; ++u) {
        if (this.xVel) {
          this.x += this.xVel * d * X;
        }
        if (this.yVel) {
          this.y += this.yVel * d * X;
        }
        w = t.getGridArrays(this.x, this.y, this.scale);
        for (var x = 0; x < w.length; ++x) {
          for (let F = 0; F < w[x].length; ++F) {
            if (w[x][F].active) {
              t.checkCollision(this, w[x][F], X);
            }
          }
        }
      }
      let W = false;
      if (this.hitWait > 0 && ((this.hitWait -= d), this.hitWait <= 0)) {
        W = true;
        this.hitWait = 0;
        if (this.leapForce && !s.randInt(0, 2)) {
          this.xVel += this.leapForce * Math.cos(this.dir);
          this.yVel += this.leapForce * Math.sin(this.dir);
        }
        var w = t.getGridArrays(this.x, this.y, this.hitRange);
        var b;
        var $;
        for (let F = 0; F < w.length; ++F) {
          for (var x = 0; x < w[F].length; ++x) {
            b = w[F][x];
            if (b.health) {
              $ = s.getDistance(this.x, this.y, b.x, b.y);
              if ($ < b.scale + this.hitRange) {
                if (b.changeHealth(-this.dmg * 5)) {
                  t.disableObj(b);
                }
                t.hitObj(b, s.getDirection(this.x, this.y, b.x, b.y));
              }
            }
          }
        }
        for (var x = 0; x < i.length; ++x) {
          if (i[x].canSee(this)) {
            l.send(i[x].id, "J", this.sid);
          }
        }
      }
      if (v || W) {
        var b;
        var $;
        let _;
        for (var u = 0; u < i.length; ++u) {
          b = i[u];
          if (b && b.alive) {
            $ = s.getDistance(this.x, this.y, b.x, b.y);
            if (this.hitRange) {
              if (!this.hitWait && $ <= this.hitRange + b.scale) {
                if (W) {
                  _ = s.getDirection(b.x, b.y, this.x, this.y);
                  b.changeHealth(
                    -this.dmg *
                    (1 + r.MAX_ATTACK * Gn) *
                    this.getVolcanoAggression(),
                  );
                  b.xVel += Math.cos(_) * 0.6;
                  b.yVel += Math.sin(_) * 0.6;
                  this.runFrom = null;
                  this.chargeTarget = null;
                  this.waitCount = 3000;
                  this.hitWait = s.randInt(0, 2) ? 0 : 600;
                } else {
                  this.hitWait = this.hitDelay;
                }
              }
            } else if ($ <= this.scale + b.scale) {
              _ = s.getDirection(b.x, b.y, this.x, this.y);
              b.changeHealth(
                -this.dmg *
                (1 + r.MAX_ATTACK * Gn) *
                this.getVolcanoAggression(),
              );
              b.xVel += Math.cos(_) * 0.55;
              b.yVel += Math.sin(_) * 0.55;
            }
          }
        }
      }
      if (this.xVel) {
        this.xVel *= Math.pow(r.playerDecel, d);
      }
      if (this.yVel) {
        this.yVel *= Math.pow(r.playerDecel, d);
      }
      const M = this.scale;
      if (this.x - M < 0) {
        this.x = M;
        this.xVel = 0;
      } else if (this.x + M > r.mapScale) {
        this.x = r.mapScale - M;
        this.xVel = 0;
      }
      if (this.y - M < 0) {
        this.y = M;
        this.yVel = 0;
      } else if (this.y + M > r.mapScale) {
        this.y = r.mapScale - M;
        this.yVel = 0;
      }
      if (this.isVolcanoAi) {
        if (
          this.chargeTarget &&
          (s.getDistance(
            this.chargeTarget.x,
            this.chargeTarget.y,
            r.volcanoLocationX,
            r.volcanoLocationY,
          ) || 0) > r.volcanoAggressionRadius
        ) {
          this.chargeTarget = null;
        }
        if (this.xVel) {
          if (this.x < r.volcanoLocationX - r.volcanoAggressionRadius) {
            this.x = r.volcanoLocationX - r.volcanoAggressionRadius;
            this.xVel = 0;
          } else if (this.x > r.volcanoLocationX + r.volcanoAggressionRadius) {
            this.x = r.volcanoLocationX + r.volcanoAggressionRadius;
            this.xVel = 0;
          }
        }
        if (this.yVel) {
          if (this.y < r.volcanoLocationY - r.volcanoAggressionRadius) {
            this.y = r.volcanoLocationY - r.volcanoAggressionRadius;
            this.yVel = 0;
          } else if (this.y > r.volcanoLocationY + r.volcanoAggressionRadius) {
            this.y = r.volcanoLocationY + r.volcanoAggressionRadius;
            this.yVel = 0;
          }
        }
      }
    }
  };
  this.canSee = function (d) {
    if (
      !d ||
      (d.skin && d.skin.invisTimer && d.noMovTimer >= d.skin.invisTimer)
    ) {
      return false;
    }
    const u = Math.abs(d.x - this.x) - d.scale;
    const p = Math.abs(d.y - this.y) - d.scale;
    return (
      u <= (r.maxScreenWidth / 2) * 1.3 && p <= (r.maxScreenHeight / 2) * 1.3
    );
  };
  let a = 0;
  let f = 0;
  this.animate = function (d) {
    if (this.animTime > 0) {
      this.animTime -= d;
      if (this.animTime <= 0) {
        this.animTime = 0;
        this.dirPlus = 0;
        a = 0;
        f = 0;
      } else if (f == 0) {
        a += d / (this.animSpeed * r.hitReturnRatio);
        this.dirPlus = s.lerp(0, this.targetAngle, Math.min(1, a));
        if (a >= 1) {
          a = 1;
          f = 1;
        }
      } else {
        a -= d / (this.animSpeed * (1 - r.hitReturnRatio));
        this.dirPlus = s.lerp(0, this.targetAngle, Math.max(0, a));
      }
    }
  };
  this.startAnim = function () {
    this.animTime = this.animSpeed = 600;
    this.targetAngle = Math.PI * 0.8;
    a = 0;
    f = 0;
  };
  this.changeHealth = function (d, u, p) {
    if (
      this.active &&
      ((this.health += d),
        p &&
        (this.hitScare && !s.randInt(0, this.hitScare)
          ? ((this.runFrom = p), (this.waitCount = 0), (this.moveCount = 2000))
          : this.hostile && this.chargePlayer && p.isPlayer
            ? ((this.chargeTarget = p),
              (this.waitCount = 0),
              (this.moveCount = 8000))
            : this.dontRun ||
            ((this.runFrom = p),
              (this.waitCount = 0),
              (this.moveCount = 2000))),
        d < 0 && this.hitRange && s.randInt(0, 1) && (this.hitWait = 500),
        u &&
        u.canSee(this) &&
        d < 0 &&
        l.send(
          u.id,
          "8",
          Math.round(this.x),
          Math.round(this.y),
          Math.round(-d),
          1,
        ),
        this.health <= 0)
    ) {
      if (this.spawnDelay) {
        this.spawnCounter = this.spawnDelay;
        this.x = -1000000;
        this.y = -1000000;
      } else if (this.minSpawnRange || this.maxSpawnRange) {
        const w = r.mapScale * this.minSpawnRange;
        const x = r.mapScale * this.maxSpawnRange;
        this.x = s.randInt(w, x);
        this.y = s.randInt(w, x);
      } else {
        this.x = this.startX || s.randInt(0, r.mapScale);
        this.y = this.startY || s.randInt(0, r.mapScale);
      }
      this.health = this.maxHealth;
      this.runFrom = null;
      if (u && (o(u, this.killScore), this.drop)) {
        for (let w = 0; w < this.drop.length;) {
          u.addResource(
            r.resourceTypes.indexOf(this.drop[w]),
            this.drop[w + 1],
          );
          w += 2;
        }
      }
    }
  };
}
function GameObject(e) {
  this.sid = e;
  this.init = function (t, i, n, s, r, o, l) {
    o = o || {};
    this.sentTo = {};
    this.gridLocations = [];
    this.active = true;
    this.doUpdate = o.doUpdate;
    this.x = t;
    this.y = i;
    this.dir = n;
    this.xWiggle = 0;
    this.yWiggle = 0;
    this.scale = s;
    this.type = r;
    this.id = o.id;
    this.owner = l;
    this.name = o.name;
    this.isItem = this.id != null;
    this.group = o.group;
    this.health = o.health;
    this.layer = 2;
    if (this.group != null) {
      this.layer = this.group.layer;
    } else if (this.type == 0) {
      this.layer = 3;
    } else if (this.type == 2) {
      this.layer = 0;
    } else if (this.type == 4) {
      this.layer = -1;
    }
    this.colDiv = o.colDiv || 1;
    this.blocker = o.blocker;
    this.ignoreCollision = o.ignoreCollision;
    this.dontGather = o.dontGather;
    this.hideFromEnemy = o.hideFromEnemy;
    this.friction = o.friction;
    this.projDmg = o.projDmg;
    this.dmg = o.dmg;
    this.pDmg = o.pDmg;
    this.pps = o.pps;
    this.zIndex = o.zIndex || 0;
    this.turnSpeed = o.turnSpeed;
    this.req = o.req;
    this.trap = o.trap;
    this.healCol = o.healCol;
    this.teleport = o.teleport;
    this.boostSpeed = o.boostSpeed;
    this.projectile = o.projectile;
    this.shootRange = o.shootRange;
    this.shootRate = o.shootRate;
    this.shootCount = this.shootRate;
    this.spawnPoint = o.spawnPoint;
  };
  this.changeHealth = function (t, i) {
    this.health += t;
    return this.health <= 0;
  };
  this.getScale = function (t, i) {
    t = t || 1;
    return (
      this.scale *
      (this.isItem || this.type == 2 || this.type == 3 || this.type == 4
        ? 1
        : t * 0.6) *
      (i ? 1 : this.colDiv)
    );
  };
  this.visibleToPlayer = function (t) {
    return (
      !this.hideFromEnemy ||
      (this.owner &&
        (this.owner == t || (this.owner.team && t.team == this.owner.team)))
    );
  };
  this.update = function (t) {
    if (this.active) {
      if (this.xWiggle) {
        this.xWiggle *= Math.pow(0.99, t);
      }
      if (this.yWiggle) {
        this.yWiggle *= Math.pow(0.99, t);
      }
      // this.dir += this.turnSpeed * t
    }
  };
  // CHECK TEAM:
  this.isTeamObject = function (tmpObj) {
    if (this.owner == null) {
      return true;
    } else {
      return (
        (this.owner && tmpObj.sid == this.owner.sid) ||
        tmpObj.findAllianceBySid(this.owner.sid)
      );
    }
  };
}
let DestroyedObjects = [];
class DestroyedObject {
  constructor(e) {
    this.x = e.x;
    this.y = e.y;
    this.dir = e.dir;
    this.name = e.name;
    this.globalAlpha = e.name === "pit trap" ? 0.6 : 1;
    this.scale = e.scale;
    this.sid = e.sid;
    this.id = e.id;
    this.owner = { sid: e?.owner?.sid };
  }

  static Add(e) {
    DestroyedObjects.push(new DestroyedObject(e));
  }

  static RenderAll(ctx, dt, camX, camY) {
    dt = Math.min(dt, 34);
    for (let i = DestroyedObjects.length; i--;) {
      const o = DestroyedObjects[i];
      const a = Math.exp(-dt * 0.01),
        g = 1 + dt * (o.name === "pit trap" ? 0.0009 : 0.00075);
      o.globalAlpha *= a;
      o.scale *= g;
      if (o.globalAlpha < 0.02) {
        DestroyedObjects.splice(i, 1);
        continue;
      }
      const sp = getItemSprite(o);
      ctx.save();
      ctx.globalAlpha = o.globalAlpha;
      ctx.translate(o.x - camX, o.y - camY);
      ctx.rotate(o.dir);
      ctx.drawImage(sp, -sp.width / 2, -sp.height / 2);
      ctx.restore();
    }
  }
}

const Items = [
  {
    id: 0,
    name: "food",
    layer: 0,
  },
  {
    id: 1,
    name: "walls",
    place: true,
    limit: 30,
    layer: 0,
  },
  {
    id: 2,
    name: "spikes",
    place: true,
    limit: 15,
    layer: 0,
  },
  {
    id: 3,
    name: "mill",
    place: true,
    limit: 7,
    sandboxLimit: 299,
    layer: 1,
  },
  {
    id: 4,
    name: "mine",
    place: true,
    limit: 1,
    layer: 0,
  },
  {
    id: 5,
    name: "trap",
    place: true,
    limit: 6,
    layer: -1,
  },
  {
    id: 6,
    name: "booster",
    place: true,
    limit: 12,
    sandboxLimit: 299,
    layer: -1,
  },
  {
    id: 7,
    name: "turret",
    place: true,
    limit: 2,
    layer: 1,
  },
  {
    id: 8,
    name: "watchtower",
    place: true,
    limit: 12,
    layer: 1,
  },
  {
    id: 9,
    name: "buff",
    place: true,
    limit: 4,
    layer: -1,
  },
  {
    id: 10,
    name: "spawn",
    place: true,
    limit: 1,
    layer: -1,
  },
  {
    id: 11,
    name: "sapling",
    place: true,
    limit: 2,
    layer: 0,
  },
  {
    id: 12,
    name: "blocker",
    place: true,
    limit: 3,
    layer: -1,
  },
  {
    id: 13,
    name: "teleporter",
    place: true,
    limit: 2,
    sandboxLimit: 299,
    layer: -1,
  },
];
const Projectiles = [
  {
    indx: 0,
    layer: 0,
    src: "arrow_1",
    dmg: 25,
    speed: 1.6,
    scale: 103,
    range: 1000,
  },
  {
    indx: 1,
    layer: 1,
    dmg: 25,
    scale: 20,
  },
  {
    indx: 0,
    layer: 0,
    src: "arrow_1",
    dmg: 35,
    speed: 2.5,
    scale: 103,
    range: 1200,
  },
  {
    indx: 0,
    layer: 0,
    src: "arrow_1",
    dmg: 30,
    speed: 2,
    scale: 103,
    range: 1200,
  },
  {
    indx: 1,
    layer: 1,
    dmg: 16,
    scale: 20,
  },
  {
    indx: 0,
    layer: 0,
    src: "bullet_1",
    dmg: 50,
    speed: 3.6,
    scale: 160,
    range: 1400,
  },
  {
    indx: 2,
    layer: 0,
    src: "bullet_1",
    dmg: 18,
    speed: 3.2,
    scale: 160,
    range: 700
  },
];
const Weapons = [
  {
    id: 0,
    type: 0,
    name: "tool hammer",
    desc: "tool for gathering all resources",
    src: "hammer_1",
    length: 140,
    width: 140,
    xOff: -3,
    yOff: 18,
    dmg: 25,
    range: 65,
    gather: 1,
    speed: 300,
  },
  {
    id: 1,
    type: 0,
    age: 2,
    name: "hand axe",
    desc: "gathers resources at a higher rate",
    src: "axe_1",
    length: 140,
    width: 140,
    xOff: 3,
    yOff: 24,
    dmg: 30,
    spdMult: 1,
    range: 70,
    gather: 2,
    speed: 400,
  },
  {
    id: 2,
    type: 0,
    age: 8,
    pre: 1,
    name: "great axe",
    desc: "deal more damage and gather more resources",
    src: "great_axe_1",
    length: 140,
    width: 140,
    xOff: -8,
    yOff: 25,
    dmg: 35,
    spdMult: 1,
    range: 75,
    gather: 4,
    speed: 400,
  },
  {
    id: 3,
    type: 0,
    age: 2,
    name: "short sword",
    desc: "increased attack power but slower move speed",
    src: "sword_1",
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 46,
    dmg: 35,
    spdMult: 0.85,
    range: 110,
    gather: 1,
    speed: 300,
  },
  {
    id: 4,
    type: 0,
    age: 8,
    pre: 3,
    name: "katana",
    desc: "greater range and damage",
    src: "samurai_1",
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 59,
    dmg: 40,
    spdMult: 0.8,
    range: 118,
    gather: 1,
    speed: 300,
  },
  {
    id: 5,
    type: 0,
    age: 2,
    name: "polearm",
    desc: "long range melee weapon",
    src: "spear_1",
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 53,
    dmg: 45,
    knock: 0.2,
    spdMult: 0.82,
    range: 142,
    gather: 1,
    speed: 700,
  },
  {
    id: 6,
    type: 0,
    age: 2,
    name: "bat",
    desc: "fast long range melee weapon",
    src: "bat_1",
    iPad: 1.3,
    length: 110,
    width: 180,
    xOff: -8,
    yOff: 53,
    dmg: 20,
    knock: 0.7,
    range: 110,
    gather: 1,
    speed: 300,
  },
  {
    id: 7,
    type: 0,
    age: 2,
    name: "daggers",
    desc: "really fast short range weapon",
    src: "dagger_1",
    iPad: 0.8,
    length: 110,
    width: 110,
    xOff: 18,
    yOff: 0,
    dmg: 20,
    knock: 0.1,
    range: 65,
    gather: 1,
    hitSlow: 0.1,
    spdMult: 1.13,
    speed: 100,
  },
  {
    id: 8,
    type: 0,
    age: 2,
    name: "stick",
    desc: "great for gathering but very weak",
    src: "stick_1",
    length: 140,
    width: 140,
    xOff: 3,
    yOff: 24,
    dmg: 1,
    spdMult: 1,
    range: 70,
    gather: 7,
    speed: 400,
  },
  {
    id: 9,
    type: 1,
    age: 6,
    name: "hunting bow",
    desc: "bow used for ranged combat and hunting",
    src: "bow_1",
    req: ["wood", 4],
    length: 120,
    width: 120,
    xOff: -6,
    yOff: 0,
    projectile: 0,
    spdMult: 0.75,
    speed: 600,
  },
  {
    id: 10,
    type: 1,
    age: 6,
    name: "great hammer",
    desc: "hammer used for destroying structures",
    src: "great_hammer_1",
    length: 140,
    width: 140,
    xOff: -9,
    yOff: 25,
    dmg: 10,
    spdMult: 0.88,
    range: 75,
    sDmg: 7.5,
    gather: 1,
    speed: 400,
  },
  {
    id: 11,
    type: 1,
    age: 6,
    name: "wooden shield",
    desc: "blocks projectiles and reduces melee damage",
    src: "shield_1",
    length: 120,
    width: 120,
    shield: 0.2,
    xOff: 6,
    yOff: 0,
    spdMult: 0.7,
  },
  {
    id: 12,
    type: 1,
    age: 8,
    pre: 9,
    name: "crossbow",
    desc: "deals more damage and has greater range",
    src: "crossbow_1",
    req: ["wood", 5],
    aboveHand: true,
    armS: 0.75,
    length: 120,
    width: 120,
    xOff: -4,
    yOff: 0,
    projectile: 2,
    spdMult: 0.7,
    speed: 700,
  },
  {
    id: 13,
    type: 1,
    age: 9,
    pre: 12,
    name: "repeater crossbow",
    desc: "high firerate crossbow with reduced damage",
    src: "crossbow_2",
    req: ["wood", 10],
    aboveHand: true,
    armS: 0.75,
    length: 120,
    width: 120,
    xOff: -4,
    yOff: 0,
    projectile: 3,
    spdMult: 0.7,
    speed: 230,
  },
  {
    id: 14,
    type: 1,
    age: 6,
    name: "mc grabby",
    desc: "steals resources from enemies",
    src: "grab_1",
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 53,
    dmg: 0,
    steal: 250,
    knock: 0.2,
    spdMult: 1.05,
    range: 125,
    gather: 0,
    speed: 700,
  },
  {
    id: 15,
    type: 1,
    age: 9,
    pre: 12,
    name: "musket",
    desc: "slow firerate but high damage and range",
    src: "musket_1",
    req: ["stone", 10],
    aboveHand: true,
    rec: 0.35,
    armS: 0.6,
    hndS: 0.3,
    hndD: 1.6,
    length: 205,
    width: 205,
    xOff: 25,
    yOff: 0,
    projectile: 5,
    hideProjectile: true,
    spdMult: 0.6,
    speed: 1500,
  },
  {
    id: 16,
    type: 1,
    age: 10,
    pre: 15,
    name: "Shotgun",
    desc: "fires multiple pellets with spread",
    src: "shotgun_1",
    req: ["stone", 40],
    aboveHand: true,
    length: 205,
    width: 205,
    xOff: 40,
    yOff: 0,
    armS: 0.65,
    hndS: 0.35,
    hndD: 1.8,
    rec: 0.55,
    projectile: 6,
    shotgun: true,
    pellets: 5,
    spread: 0.28,
    hideProjectile: true,
    spdMult: 0.6,
    speed: 1300,
  },
];
const List = [
  {
    group: Items[0],
    name: "apple",
    desc: "restores 20 health when consumed",
    req: ["food", 10],
    heal: 20,
    consume: function (e) {
      return e.changeHealth(20, e);
    },
    scale: 22,
    holdOffset: 15,
  },
  {
    age: 3,
    group: Items[0],
    name: "cookie",
    desc: "restores 40 health when consumed",
    req: ["food", 15],
    heal: 40,
    consume: function (e) {
      return e.changeHealth(40, e);
    },
    scale: 27,
    holdOffset: 15,
  },
  {
    age: 7,
    group: Items[0],
    name: "cheese",
    desc: "restores 30 health and another 50 over 5 seconds",
    req: ["food", 25],
    heal: 30,
    consume: function (e) {
      if (e.changeHealth(30, e) || e.health < 100) {
        e.dmgOverTime.dmg = -10;
        e.dmgOverTime.doer = e;
        e.dmgOverTime.time = 5;
        return true;
      } else {
        return false;
      }
    },
    scale: 27,
    holdOffset: 15,
  },
  {
    group: Items[1],
    name: "wood wall",
    desc: "provides protection for your village",
    req: ["wood", 10],
    projDmg: true,
    health: 380,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 3,
    group: Items[1],
    name: "stone wall",
    desc: "provides improved protection for your village",
    req: ["stone", 25],
    health: 900,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[1],
    name: "castle wall",
    desc: "provides powerful protection for your village",
    req: ["stone", 35],
    health: 1500,
    scale: 52,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    group: Items[2],
    name: "spikes",
    desc: "damages enemies when they touch them",
    req: ["wood", 20, "stone", 5],
    health: 400,
    dmg: 20,
    scale: 49,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5,
  },
  {
    age: 5,
    group: Items[2],
    name: "greater spikes",
    desc: "damages enemies when they touch them",
    req: ["wood", 30, "stone", 10],
    health: 500,
    dmg: 35,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5,
  },
  {
    age: 9,
    group: Items[2],
    name: "poison spikes",
    desc: "poisons enemies when they touch them",
    req: ["wood", 35, "stone", 15],
    health: 600,
    dmg: 30,
    pDmg: 5,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5,
  },
  {
    age: 9,
    group: Items[2],
    name: "spinning spikes",
    desc: "damages enemies when they touch them",
    req: ["wood", 30, "stone", 20],
    health: 500,
    dmg: 45,
    turnSpeed: 0.003,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5,
  },
  {
    group: Items[3],
    name: "windmill",
    desc: "generates gold over time",
    req: ["wood", 50, "stone", 10],
    health: 400,
    pps: 1,
    turnSpeed: 0.0016,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 45,
    holdOffset: 20,
    placeOffset: 5,
  },
  {
    age: 5,
    group: Items[3],
    name: "faster windmill",
    desc: "generates more gold over time",
    req: ["wood", 60, "stone", 20],
    health: 500,
    pps: 1.5,
    turnSpeed: 0.0025,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 47,
    holdOffset: 20,
    placeOffset: 5,
  },
  {
    age: 8,
    group: Items[3],
    name: "power mill",
    desc: "generates more gold over time",
    req: ["wood", 100, "stone", 50],
    health: 800,
    pps: 2,
    turnSpeed: 0.005,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 47,
    holdOffset: 20,
    placeOffset: 5,
  },
  {
    age: 5,
    group: Items[4],
    type: 2,
    name: "mine",
    desc: "allows you to mine stone",
    req: ["wood", 20, "stone", 100],
    iconLineMult: 12,
    scale: 65,
    holdOffset: 20,
    placeOffset: 0,
  },
  {
    age: 5,
    group: Items[11],
    type: 0,
    name: "sapling",
    desc: "allows you to farm wood",
    req: ["wood", 150],
    iconLineMult: 12,
    colDiv: 0.5,
    scale: 110,
    holdOffset: 50,
    placeOffset: -15,
  },
  {
    age: 4,
    group: Items[5],
    name: "pit trap",
    desc: "pit that traps enemies if they walk over it",
    req: ["wood", 30, "stone", 30],
    trap: true,
    ignoreCollision: true,
    hideFromEnemy: true,
    health: 500,
    colDiv: 0.2,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 4,
    group: Items[6],
    name: "boost pad",
    desc: "provides boost when stepped on",
    req: ["stone", 20, "wood", 5],
    ignoreCollision: true,
    boostSpeed: 1.5,
    health: 150,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[7],
    doUpdate: true,
    name: "turret",
    desc: "defensive structure that shoots at enemies",
    req: ["wood", 200, "stone", 150],
    health: 800,
    projectile: 1,
    shootRange: 700,
    shootRate: 2200,
    scale: 43,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[8],
    name: "platform",
    desc: "platform to shoot over walls and cross over water",
    req: ["wood", 20],
    ignoreCollision: true,
    zIndex: 1,
    health: 300,
    scale: 43,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[9],
    name: "healing pad",
    desc: "standing on it will slowly heal you",
    req: ["wood", 30, "food", 10],
    ignoreCollision: true,
    healCol: 15,
    health: 400,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 9,
    group: Items[10],
    name: "spawn pad",
    desc: "you will spawn here when you die but it will dissapear",
    req: ["wood", 100, "stone", 100],
    health: 400,
    ignoreCollision: true,
    spawnPoint: true,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[12],
    name: "blocker",
    desc: "blocks building in radius",
    req: ["wood", 30, "stone", 25],
    ignoreCollision: true,
    blocker: 300,
    health: 400,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5,
  },
  {
    age: 7,
    group: Items[13],
    name: "teleporter",
    desc: "teleports you to a random point on the map",
    req: ["wood", 60, "stone", 60],
    ignoreCollision: true,
    teleport: true,
    health: 200,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5,
  },
];
this.checkItem = {
  index: function (id, myItems) {
    if ([0, 1, 2].includes(id)) {
      return 0;
    } else if ([3, 4, 5].includes(id)) {
      return 1;
    } else if ([6, 7, 8, 9].includes(id)) {
      return 2;
    } else if ([10, 11, 12].includes(id)) {
      return 3;
    } else if ([13, 14].includes(id)) {
      return 5;
    } else if ([15, 16].includes(id)) {
      return 4;
    } else if ([17, 18, 19, 21, 22].includes(id)) {
      if ([13, 14].includes(myItems)) {
        return 6;
      } else {
        return 5;
      }
    } else if (id == 20) {
      if ([13, 14].includes(myItems)) {
        return 7;
      } else {
        return 6;
      }
    } else {
      return undefined;
    }
  },
};
for (let e = 0; e < List.length; ++e) {
  List[e].id = e;
  if (List[e].pre) {
    List[e].pre = e - List[e].pre;
  }
}
const items = {
  groups: Items,
  projectiles: Projectiles,
  weapons: Weapons,
  list: List,
};
const Oh = [];
const _h = {
  words: Oh,
};
var zh = {};
var Bh = [];
var Hh = "";
var Lh = {
  object: zh,
  array: Bh,
  regex: Hh,
};
const Fh = _h.words;
const Vh = []; //Lh.array;
class Nh {
  constructor(t = {}) {
    Object.assign(this, {
      list:
        (t.emptyList && []) ||
        Array.prototype.concat.apply(Fh, [Vh, t.list || []]),
      exclude: t.exclude || [],
      splitRegex: t.splitRegex || /\b/,
      placeHolder: t.placeHolder || "*",
      regex: t.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: t.replaceRegex || /\w/g,
    });
  }
  isProfane(t) {
    return (
      this.list.filter((i) => {
        const n = new RegExp(`\\b${i.replace(/(\W)/g, "\\$1")}\\b`, "gi");
        return !this.exclude.includes(i.toLowerCase()) && n.test(t);
      }).length > 0 || false
    );
  }
  replaceWord(t) {
    return t
      .replace(this.regex, "")
      .replace(this.replaceRegex, this.placeHolder);
  }
  clean(t) {
    return t
      .split(this.splitRegex)
      .map((i) => (this.isProfane(i) ? this.replaceWord(i) : i))
      .join(this.splitRegex.exec(t)[0]);
  }
  addWords() {
    let t = Array.from(arguments);
    this.list.push(...t);
    t.map((i) => i.toLowerCase()).forEach((i) => {
      if (this.exclude.includes(i)) {
        this.exclude.splice(this.exclude.indexOf(i), 1);
      }
    });
  }
  removeWords() {
    this.exclude.push(...Array.from(arguments).map((t) => t.toLowerCase()));
  }
}
var Uh = Nh;
const Wh = An(Uh);
const Ko = new Wh();
const Xh = [];
Ko.addWords(...Xh);
const Ir = Math.abs;
const Ut = Math.cos;
const Wt = Math.sin;
const Tr = Math.pow;
const qh = Math.sqrt;
function Player(e, t, i, n, s, r, o, l, c, hats, accessories, d, u, p) {
  this.id = e;
  this.sid = t;
  this.tmpScore = 0;
  this.team = null;
  this.skinIndex = 0;
  this.tailIndex = 0;
  this.hitTime = 0;
  this.tails = {};
  for (var w = 0; w < accessories.length; ++w) {
    if (accessories[w].price <= 0) {
      this.tails[accessories[w].id] = 1;
    }
  }
  this.skins = {};
  for (var w = 0; w < hats.length; ++w) {
    if (hats[w].price <= 0) {
      this.skins[hats[w].id] = 1;
    }
  }
  this.points = 0;
  this.dt = 0;
  this.hidden = false;
  this.itemCounts = {};
  this.isPlayer = true;
  this.pps = 0;
  this.moveDir = undefined;
  this.skinRot = 0;
  this.lastPing = 0;
  this.iconIndex = 0;
  this.skinColor = 0;
  this.chat = {
    message: null,
    count: 0,
  };
  this.lastHit = 0;
  this.spawn = function (v) {
    this.active = true;
    this.alive = true;
    this.lockMove = false;
    this.lockDir = false;
    this.minimapCounter = 0;
    this.chatCountdown = 0;
    this.shameCount = 0;
    this.shameTimer = 0;
    this.sentTo = {};
    this.autoGather = 0;
    this.animTime = 0;
    this.animSpeed = 0;
    this.mouseState = 0;
    this.buildIndex = -1;
    this.weaponIndex = 0;
    this.dmgOverTime = {};
    this.noMovTimer = 0;
    this.maxXP = 300;
    this.XP = 0;
    this.age = 1;
    this.kills = 0;
    this.upgrAge = 2;
    this.upgradePoints = 0;
    this.x = 0;
    this.y = 0;
    this.zIndex = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.slowMult = 1;
    this.dir = 0;
    this.dirPlus = 0;
    this.targetDir = 0;
    this.targetAngle = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.oldHealth = this.maxHealth;
    this.scale = i.playerScale;
    this.speed = i.playerSpeed;
    this.resetMoveDir();
    this.resetResources(v);
    this.items = [0, 3, 6, 10];
    this.weapons = [0];

    this.shootCount = 0;
    this.weaponXP = [];
    this.timeSpentNearVolcano = 0;
    this.gathering = 0;
    this.gatherIndex = 0;
    //
    this.attacked = false;
    this.lastshamecount = 0;
    this.death = false;
    this.bullTimer = 0;
    this.poisonTimer = 0;
    this.setPoisonTick = false;
    this.setBullTick = false;
    this.shooting = {};
    this.shootIndex = 9;
    this.reloads = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      53: 0,
      FatGay: 0,
    };
  };
  this.resetMoveDir = function () {
    this.moveDir = undefined;
  };
  this.resetResources = function (v) {
    for (let S = 0; S < i.resourceTypes.length; ++S) {
      this[i.resourceTypes[S]] = v ? 100 : 0;
    }
  };
  this.addItem = function (v) {
    const S = c.list[v];
    if (S) {
      for (let R = 0; R < this.items.length; ++R) {
        if (c.list[this.items[R]].group == S.group) {
          if (this.buildIndex == this.items[R]) {
            this.buildIndex = v;
          }
          this.items[R] = v;
          return true;
        }
      }
      this.items.push(v);
      return true;
    }
    return false;
  };
  this.setUserData = function (v) {
    if (v) {
      this.name = "unknown";
      let S = v.name + "";
      S = S.slice(0, i.maxNameLength);
      S = S.replace(/[^\w:\(\)\/? -]+/gim, " ");
      S = S.replace(/[^\x00-\x7F]/g, " ");
      S = S.trim();
      let R = false;
      const G = S.toLowerCase()
        .replace(/\s/g, "")
        .replace(/1/g, "i")
        .replace(/0/g, "o")
        .replace(/5/g, "s");
      for (const X of Ko.list) {
        if (G.indexOf(X) != -1) {
          R = true;
          break;
        }
      }
      if (S.length > 0 && !R) {
        this.name = S;
      }
      this.skinColor = 0;
      if (i.skinColors[v.skin]) {
        this.skinColor = v.skin;
      }
    }
  };
  this.getData = function () {
    return [
      this.id,
      this.sid,
      this.name,
      n.fixTo(this.x, 2),
      n.fixTo(this.y, 2),
      n.fixTo(this.dir, 3),
      this.health,
      this.maxHealth,
      this.scale,
      this.skinColor,
    ];
  };
  this.setData = function (v) {
    this.id = v[0];
    this.sid = v[1];
    this.name = v[2];
    this.x = v[3];
    this.y = v[4];
    this.dir = v[5];
    this.health = v[6];
    this.maxHealth = v[7];
    this.scale = v[8];
    this.skinColor = v[9];
  };
  let x = 0;
  this.update = function (v) {
    if (!this.alive) {
      return;
    }
    if (
      (n.getDistance(this.x, this.y, i.volcanoLocationX, i.volcanoLocationY) ||
        0) < i.volcanoAggressionRadius
    ) {
      this.timeSpentNearVolcano += v;
      if (this.timeSpentNearVolcano >= 1000) {
        this.changeHealth(i.volcanoDamagePerSecond, null);
        d.send(
          this.id,
          "8",
          Math.round(this.x),
          Math.round(this.y),
          i.volcanoDamagePerSecond,
          -1,
        );
        this.timeSpentNearVolcano %= 1000;
      }
    }
    if (this.shameTimer > 0) {
      this.shameTimer -= v;
      if (this.shameTimer <= 0) {
        this.shameTimer = 0;
        this.shameCount = 0;
      }
    }
    x -= v;
    if (x <= 0) {
      const _ =
        (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) +
        (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
      if (_) {
        this.changeHealth(_, this);
      }
      if (this.dmgOverTime.dmg) {
        this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
        this.dmgOverTime.time -= 1;
        if (this.dmgOverTime.time <= 0) {
          this.dmgOverTime.dmg = 0;
        }
      }
      if (this.healCol) {
        this.changeHealth(this.healCol, this);
      }
      x = 1000;
    }
    if (!this.alive) {
      return;
    }
    if (this.slowMult < 1) {
      this.slowMult += v * 0.0008;
      if (this.slowMult > 1) {
        this.slowMult = 1;
      }
    }
    this.noMovTimer += v;
    if (this.xVel || this.yVel) {
      this.noMovTimer = 0;
    }
    if (this.lockMove) {
      this.xVel = 0;
      this.yVel = 0;
    } else {
      let _ =
        (this.buildIndex >= 0 ? 0.5 : 1) *
        (c.weapons[this.weaponIndex].spdMult || 1) *
        ((this.skin && this.skin.spdMult) || 1) *
        ((this.tail && this.tail.spdMult) || 1) *
        (this.y <= i.snowBiomeTop
          ? this.skin && this.skin.coldM
            ? 1
            : i.snowSpeed
          : 1) *
        this.slowMult;
      if (
        !this.zIndex &&
        this.y >= i.mapScale / 2 - i.riverWidth / 2 &&
        this.y <= i.mapScale / 2 + i.riverWidth / 2
      ) {
        if (this.skin && this.skin.watrImm) {
          _ *= 0.75;
          this.xVel += i.waterCurrent * 0.4 * v;
        } else {
          _ *= 0.33;
          this.xVel += i.waterCurrent * v;
        }
      }
      let D = this.moveDir != null ? Ut(this.moveDir) : 0;
      let z = this.moveDir != null ? Wt(this.moveDir) : 0;
      const N = qh(D * D + z * z);
      if (N != 0) {
        D /= N;
        z /= N;
      }
      if (D) {
        this.xVel += D * this.speed * _ * v;
      }
      if (z) {
        this.yVel += z * this.speed * _ * v;
      }
    }
    this.zIndex = 0;
    this.lockMove = false;
    this.healCol = 0;
    let R;
    const G = n.getDistance(0, 0, this.xVel * v, this.yVel * v);
    const X = Math.min(4, Math.max(1, Math.round(G / 40)));
    const W = 1 / X;
    let M = {};
    for (var V = 0; V < X; ++V) {
      if (this.xVel) {
        this.x += this.xVel * v * W;
      }
      if (this.yVel) {
        this.y += this.yVel * v * W;
      }
      R = r.getGridArrays(this.x, this.y, this.scale);
      for (let _ = 0; _ < R.length; ++_) {
        for (
          let D = 0;
          D < R[_].length &&
          !(
            R[_][D].active &&
            !M[R[_][D].sid] &&
            r.checkCollision(this, R[_][D], W) &&
            ((M[R[_][D].sid] = true), !this.alive)
          );
          ++D
        );
        if (!this.alive) {
          break;
        }
      }
      if (!this.alive) {
        break;
      }
    }
    for (var F = o.indexOf(this), V = F + 1; V < o.length; ++V) {
      if (o[V] != this && o[V].alive) {
        r.checkCollision(this, o[V]);
      }
    }
    if (this.xVel) {
      this.xVel *= Tr(i.playerDecel, v);
      if (this.xVel <= 0.01 && this.xVel >= -0.01) {
        this.xVel = 0;
      }
    }
    if (this.yVel) {
      this.yVel *= Tr(i.playerDecel, v);
      if (this.yVel <= 0.01 && this.yVel >= -0.01) {
        this.yVel = 0;
      }
    }
    if (this.x - this.scale < 0) {
      this.x = this.scale;
    } else if (this.x + this.scale > i.mapScale) {
      this.x = i.mapScale - this.scale;
    }
    if (this.y - this.scale < 0) {
      this.y = this.scale;
    } else if (this.y + this.scale > i.mapScale) {
      this.y = i.mapScale - this.scale;
    }
    if (this.buildIndex < 0) {
      if (this.reloads[this.weaponIndex] > 0) {
        this.reloads[this.weaponIndex] -= v;
        this.gathering = this.mouseState;
      } else if (this.gathering || this.autoGather) {
        let _ = true;
        if (c.weapons[this.weaponIndex].gather != null) {
          this.gather(o);
        } else if (
          c.weapons[this.weaponIndex].projectile != null &&
          this.hasRes(
            c.weapons[this.weaponIndex],
            this.skin ? this.skin.projCost : 0,
          )
        ) {
          this.useRes(
            c.weapons[this.weaponIndex],
            this.skin ? this.skin.projCost : 0,
          );
          this.noMovTimer = 0;
          var F = c.weapons[this.weaponIndex].projectile;
          const z = this.scale * 2;
          const N = this.skin && this.skin.aMlt ? this.skin.aMlt : 1;
          if (c.weapons[this.weaponIndex].rec) {
            this.xVel -= c.weapons[this.weaponIndex].rec * Ut(this.dir);
            this.yVel -= c.weapons[this.weaponIndex].rec * Wt(this.dir);
          }
          s.addProjectile(
            this.x + z * Ut(this.dir),
            this.y + z * Wt(this.dir),
            this.dir,
            c.projectiles[F].range * N,
            c.projectiles[F].speed * N,
            F,
            this,
            null,
            this.zIndex,
          );
        } else {
          _ = false;
        }
        this.gathering = this.mouseState;
        if (_) {
          this.reloads[this.weaponIndex] =
            c.weapons[this.weaponIndex].speed *
            ((this.skin && this.skin.atkSpd) || 1);
        }
      }
    }
  };
  this.addWeaponXP = function (v) {
    if (!this.weaponXP[this.weaponIndex]) {
      this.weaponXP[this.weaponIndex] = 0;
    }
    this.weaponXP[this.weaponIndex] += v;
  };
  this.earnXP = function (v) {
    if (this.age < i.maxAge) {
      this.XP += v;
      if (this.XP >= this.maxXP) {
        if (this.age < i.maxAge) {
          this.age++;
          this.XP = 0;
          this.maxXP *= 1.2;
        } else {
          this.XP = this.maxXP;
        }
        this.upgradePoints++;
        d.send(this.id, "U", this.upgradePoints, this.upgrAge);
        d.send(this.id, "T", this.XP, n.fixTo(this.maxXP, 1), this.age);
      } else {
        d.send(this.id, "T", this.XP);
      }
    }
  };
  this.changeHealth = function (v, S) {
    if (v > 0 && this.health >= this.maxHealth) {
      return false;
    }
    if (v < 0 && this.skin) {
      v *= this.skin.dmgMult || 1;
    }
    if (v < 0 && this.tail) {
      v *= this.tail.dmgMult || 1;
    }
    if (v < 0) {
      this.hitTime = Date.now();
    }
    this.health += v;
    if (this.health > this.maxHealth) {
      v -= this.health - this.maxHealth;
      this.health = this.maxHealth;
    }
    if (this.health <= 0) {
      this.kill(S);
    }
    for (let R = 0; R < o.length; ++R) {
      if (this.sentTo[o[R].id]) {
        d.send(o[R].id, "O", this.sid, this.health);
      }
    }
    if (S && S.canSee(this) && !(S == this && v < 0)) {
      d.send(
        S.id,
        "8",
        Math.round(this.x),
        Math.round(this.y),
        Math.round(-v),
        1,
      );
    }
    return true;
  };
  this.kill = function (v) {
    if (v && v.alive) {
      v.kills++;
      if (v.skin && v.skin.goldSteal) {
        u(v, Math.round(this.points / 2));
      } else {
        u(
          v,
          Math.round(
            this.age * 100 * (v.skin && v.skin.kScrM ? v.skin.kScrM : 1),
          ),
        );
      }
      d.send(v.id, "N", "kills", v.kills, 1);
    }
    this.alive = false;
    d.send(this.id, "P");
    p();
  };
  this.addResource = function (v, S, R) {
    if (!R && S > 0) {
      this.addWeaponXP(S);
    }
    if (v == 3) {
      u(this, S, true);
    } else {
      this[i.resourceTypes[v]] += S;
      d.send(this.id, "N", i.resourceTypes[v], this[i.resourceTypes[v]], 1);
    }
  };
  this.changeItemCount = function (v, S) {
    this.itemCounts[v] = this.itemCounts[v] || 0;
    this.itemCounts[v] += S;
    d.send(this.id, "S", v, this.itemCounts[v]);
  };
  this.buildItem = function (v) {
    const S = this.scale + v.scale + (v.placeOffset || 0);
    const R = this.x + S * Ut(this.dir);
    const G = this.y + S * Wt(this.dir);
    if (
      this.canBuild(v) &&
      !(v.consume && this.skin && this.skin.noEat) &&
      (v.consume || r.checkItemLocation(R, G, v.scale, 0.6, v.id, false, this))
    ) {
      let X = false;
      if (v.consume) {
        if (this.hitTime) {
          const W = Date.now() - this.hitTime;
          this.hitTime = 0;
          if (W <= 120) {
            this.shameCount++;
            if (this.shameCount >= 8) {
              this.shameTimer = 30000;
              this.shameCount = 0;
            }
          } else {
            this.shameCount -= 2;
            if (this.shameCount <= 0) {
              this.shameCount = 0;
            }
          }
        }
        if (this.shameTimer <= 0) {
          X = v.consume(this);
        }
      } else {
        X = true;
        if (v.group.limit) {
          this.changeItemCount(v.group.id, 1);
        }
        if (v.pps) {
          this.pps += v.pps;
        }
        r.add(
          r.objects.length,
          R,
          G,
          this.dir,
          v.scale,
          v.type,
          v,
          false,
          this,
        );
      }
      if (X) {
        this.useRes(v);
        this.buildIndex = -1;
      }
    }
  };
  this.hasRes = function (v, S) {
    for (let R = 0; R < v.req.length;) {
      if (this[v.req[R]] < Math.round(v.req[R + 1] * (S || 1))) {
        return false;
      }
      R += 2;
    }
    return true;
  };
  this.useRes = function (v, S) {
    if (!i.inSandbox) {
      for (let R = 0; R < v.req.length;) {
        this.addResource(
          i.resourceTypes.indexOf(v.req[R]),
          -Math.round(v.req[R + 1] * (S || 1)),
        );
        R += 2;
      }
    }
  };
  this.canBuild = function (v) {
    const S = i.inSandbox
      ? v.group.sandboxLimit || Math.max(v.group.limit * 3, 99)
      : v.group.limit;
    if (S && this.itemCounts[v.group.id] >= S) {
      return false;
    } else if (i.inSandbox) {
      return true;
    } else {
      return this.hasRes(v);
    }
  };
  this.gather = function () {
    this.noMovTimer = 0;
    this.slowMult -= c.weapons[this.weaponIndex].hitSlow || 0.3;
    if (this.slowMult < 0) {
      this.slowMult = 0;
    }
    const v = i.fetchVariant(this);
    const S = v.poison;
    const R = v.val;
    const G = {};
    let X;
    let W;
    let M;
    let V;
    const F = r.getGridArrays(
      this.x,
      this.y,
      c.weapons[this.weaponIndex].range,
    );
    for (let D = 0; D < F.length; ++D) {
      for (var _ = 0; _ < F[D].length; ++_) {
        M = F[D][_];
        if (
          M.active &&
          !M.dontGather &&
          !G[M.sid] &&
          M.visibleToPlayer(this) &&
          ((X = n.getDistance(this.x, this.y, M.x, M.y) - M.scale),
            X <= c.weapons[this.weaponIndex].range &&
            ((W = n.getDirection(M.x, M.y, this.x, this.y)),
              n.getAngleDist(W, this.dir) <= i.gatherAngle))
        ) {
          G[M.sid] = 1;
          if (M.health) {
            if (
              M.changeHealth(
                -c.weapons[this.weaponIndex].dmg *
                R *
                (c.weapons[this.weaponIndex].sDmg || 1) *
                (this.skin && this.skin.bDmg ? this.skin.bDmg : 1),
                this,
              )
            ) {
              for (let z = 0; z < M.req.length;) {
                this.addResource(
                  i.resourceTypes.indexOf(M.req[z]),
                  M.req[z + 1],
                );
                z += 2;
              }
              r.disableObj(M);
            }
          } else {
            if (M.name === "volcano") {
              this.hitVolcano(c.weapons[this.weaponIndex].gather);
            } else {
              this.earnXP(c.weapons[this.weaponIndex].gather * 4);
              const z =
                c.weapons[this.weaponIndex].gather + (M.type == 3 ? 4 : 0);
              this.addResource(M.type, z);
            }
            if (this.skin && this.skin.extraGold) {
              this.addResource(3, 1);
            }
          }
          V = true;
          r.hitObj(M, W);
        }
      }
    }
    for (var _ = 0; _ < o.length + l.length; ++_) {
      M = o[_] || l[_ - o.length];
      if (
        M != this &&
        M.alive &&
        !(M.team && M.team == this.team) &&
        ((X = n.getDistance(this.x, this.y, M.x, M.y) - M.scale * 1.8),
          X <= c.weapons[this.weaponIndex].range &&
          ((W = n.getDirection(M.x, M.y, this.x, this.y)),
            n.getAngleDist(W, this.dir) <= i.gatherAngle))
      ) {
        let z = c.weapons[this.weaponIndex].steal;
        if (z && M.addResource) {
          z = Math.min(M.points || 0, z);
          this.addResource(3, z);
          M.addResource(3, -z);
        }
        let N = R;
        if (
          M.weaponIndex != null &&
          c.weapons[M.weaponIndex].shield &&
          n.getAngleDist(W + Math.PI, M.dir) <= i.shieldAngle
        ) {
          N = c.weapons[M.weaponIndex].shield;
        }
        const Y = c.weapons[this.weaponIndex].dmg;
        const K =
          Y *
          (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) *
          (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1);
        const ie =
          (M.weightM || 1) * 0.3 + (c.weapons[this.weaponIndex].knock || 0);
        M.xVel += ie * Ut(W);
        M.yVel += ie * Wt(W);
        if (this.skin && this.skin.healD) {
          this.changeHealth(K * N * this.skin.healD, this);
        }
        if (this.tail && this.tail.healD) {
          this.changeHealth(K * N * this.tail.healD, this);
        }
        if (M.skin && M.skin.dmg) {
          this.changeHealth(-Y * M.skin.dmg, M);
        }
        if (M.tail && M.tail.dmg) {
          this.changeHealth(-Y * M.tail.dmg, M);
        }
        if (
          M.dmgOverTime &&
          this.skin &&
          this.skin.poisonDmg &&
          !(M.skin && M.skin.poisonRes)
        ) {
          M.dmgOverTime.dmg = this.skin.poisonDmg;
          M.dmgOverTime.time = this.skin.poisonTime || 1;
          M.dmgOverTime.doer = this;
        }
        if (M.dmgOverTime && S && !(M.skin && M.skin.poisonRes)) {
          M.dmgOverTime.dmg = 5;
          M.dmgOverTime.time = 5;
          M.dmgOverTime.doer = this;
        }
        if (M.skin && M.skin.dmgK) {
          this.xVel -= M.skin.dmgK * Ut(W);
          this.yVel -= M.skin.dmgK * Wt(W);
        }
        M.changeHealth(-K * N, this, this);
      }
    }
    this.sendAnimation(V ? 1 : 0);
  };
  this.hitVolcano = function (v) {
    const S = 5 + Math.round(v / 3.5);
    this.addResource(2, S);
    this.addResource(3, S);
  };
  this.sendAnimation = function (v) {
    for (let S = 0; S < o.length; ++S) {
      if (this.sentTo[o[S].id] && this.canSee(o[S])) {
        d.send(o[S].id, "K", this.sid, v ? 1 : 0, this.weaponIndex);
      }
    }
  };
  let b = 0;
  let $ = 0;
  this.animate = function (v) {
    if (this.animTime > 0) {
      this.animTime -= v;
      if (this.animTime <= 0) {
        this.animTime = 0;
        this.dirPlus = 0;
        b = 0;
        $ = 0;
      } else if ($ == 0) {
        b += v / (this.animSpeed * i.hitReturnRatio);
        this.dirPlus = n.lerp(0, this.targetAngle, Math.min(1, b));
        if (b >= 1) {
          b = 1;
          $ = 1;
        }
      } else {
        b -= v / (this.animSpeed * (1 - i.hitReturnRatio));
        this.dirPlus = n.lerp(0, this.targetAngle, Math.max(0, b));
      }
    }
  };
  this.startAnim = function (v, S) {
    this.animTime = this.animSpeed = c.weapons[S].speed;
    this.targetAngle = v ? -i.hitAngle : -Math.PI;
    b = 0;
    $ = 0;
  };
  this.canSee = function (v) {
    if (
      !v ||
      (v.skin && v.skin.invisTimer && v.noMovTimer >= v.skin.invisTimer)
    ) {
      return false;
    }
    const S = Ir(v.x - this.x) - v.scale;
    const R = Ir(v.y - this.y) - v.scale;
    return (
      S <= (i.maxScreenWidth / 2) * 1.3 && R <= (i.maxScreenHeight / 2) * 1.3
    );
  };
  this.ShameSystem = function () {
    this.lastshamecount = this.shameCount;
    if (this.oldHealth < this.health && this.hitTime) {
      const dt = Mod.tick - this.hitTime;
      this.lastHit = Mod.tick;
      this.hitTime = 0;
      this.shameCount =
        dt < 2 ? (this.shameCount + 1) % 8 : Math.max(0, this.shameCount - 2);
    } else if (this.oldHealth > this.health) {
      this.hitTime = Mod.tick;
    }
  };

  this.addShameTimer = function () {
    this.shameCount = 0;
    this.shameTimer = 30;
    const i = setInterval(
      () => --this.shameTimer <= 0 && clearInterval(i),
      1000,
    );
  };

  this.updateTimer = function () {
    this.bullTimer -= 1;
    if (this.bullTimer <= 0) {
      this.setBullTick = false;
      this.bullTick = Mod.tick - 1;
      this.bullTimer = config.serverUpdateRate;
    }
    this.poisonTimer -= 1;
    if (this.poisonTimer <= 0) {
      this.setPoisonTick = false;
      this.poisonTick = Mod.tick - 1;
      this.poisonTimer = config.serverUpdateRate;
    }
  };
  this.checkCanInsta = function (nobull) {
    let totally = 0;
    if (this.alive && inGame) {
      let primary = {
        weapon: this.weapons[0],
        variant: this.primaryVariant,
        dmg:
          this.weapons[0] == undefined
            ? 0
            : items.weapons[this.weapons[0]].dmg,
      };
      let secondary = {
        weapon: this.weapons[1],
        variant: this.secondaryVariant,
        dmg:
          this.weapons[1] == undefined
            ? 0
            : items.weapons[this.weapons[1]].Pdmg,
      };
      let bull = this.skins[7] && !nobull ? 1.5 : 1;
      let pV =
        primary.variant != undefined
          ? config.weaponVariants[primary.variant].val
          : 1;
      if (primary.weapon != undefined && this.reloads[primary.weapon] == 0) {
        totally += primary.dmg * pV * bull;
      }
      if (
        secondary.weapon != undefined &&
        this.reloads[secondary.weapon] == 0
      ) {
        totally += secondary.dmg;
      }
      if (
        this.skins[53] &&
        this.reloads[53] <= (player.weapons[1] == 10 ? 0 : Mod.tickRate) &&
        Enemy &&
        Enemy.skinIndex !== undefined &&
        Enemy.skinIndex != 22
      ) {
        totally += 25;
      }
      totally *=
        Enemy && Enemy.skinIndex !== undefined && Enemy.skinIndex == 6
          ? 0.75
          : 1;
      return totally;
    }
    return 0;
  };
  this.manageReload = function () {
    if (this.shooting[53]) {
      this.shooting[53] = 0;
      this.reloads[53] = 2500 - Mod.tickRate;
    } else {
      if (this.reloads[53] > 0) {
        this.reloads[53] = Math.max(0, this.reloads[53] - Mod.tickRate);
      }
    }
    if (this.gathering || this.shooting[1]) {
      if (this.gathering) {
        this.gathering = 0;
        this.reloads[this.gatherIndex] =
          items.weapons[this.gatherIndex].speed *
          (this.skinIndex == 20 ? 0.78 : 1);
        this.attacked = true;
      }
      if (this.shooting[1]) {
        this.shooting[1] = 0;
        this.reloads[this.shootIndex] =
          items.weapons[this.shootIndex].speed *
          (this.skinIndex == 20 ? 0.78 : 1);
        this.attacked = true;
      }
    } else {
      this.attacked = false;
      if (this.buildIndex < 0) {
        if (this.reloads[this.weaponIndex] > 0) {
          this.reloads[this.weaponIndex] = Math.max(
            0,
            this.reloads[this.weaponIndex] - Mod.tickRate,
          );
        }
      }
    }
  };
  // CHECK TEAM:
  this.isTeam = function (tmpObj) {
    return this == tmpObj || (this.team && this.team == tmpObj.team);
  };
  // FOR THE PLAYER:
  this.findAllianceBySid = function (sid) {
    if (this.team) {
      return alliancePlayers.find((THIS) => THIS === sid);
    } else {
      return null;
    }
  };
}
let deadPlayers = [];
class DeadPlayer {
  static _snapC = document.createElement("canvas");
  static _snapX = DeadPlayer._snapC.getContext("2d", {
    willReadFrequently: true,
  });
  constructor(
    x,
    y,
    dir,
    buildIndex,
    weaponIndex,
    weaponVariant,
    skinColor,
    scale,
    name,
    skinIndex,
    tailIndex,
  ) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.buildIndex = buildIndex;
    this.weaponIndex = weaponIndex;
    this.weaponVariant = weaponVariant;
    this.skinColor = skinColor;
    this.scale = scale;
    this.name = name;
    this.skinIndex = skinIndex;
    this.tailIndex = tailIndex;
    this.active = true;
    this.alpha = 1;
    this.visScale = 0;
    this.px = x;
    this.py = y;
    this.sx = x;
    this.sy = y;
    this.vx = (Math.random() * 2.4 - 1.2) * 1.25;
    this.vy = (Math.random() * 2.4 - 1.2) * 0.65;
    this.vz = 0.8 + Math.random() * 0.8;
    this.z = -40 - Math.random() * 40;
    this.rot = Math.random() * Math.PI * 2;
    this.av = (Math.random() < 0.5 ? -1 : 1) * (0.022 + Math.random() * 0.035);
    this.b = 0;
    this.f = 0.965;
    this.seed = Math.random() * 1e3;
    this.lastBounce = 0;
    this.fr = null;
    this.t0 = null;
    this._lt = null;
    this._snap = null;
    this._bst = 0;
    this._dir = dir;
    this.fs = {
      dir: dir,
      wi: weaponIndex,
      wv: weaponVariant,
      bi: buildIndex,
      si: skinIndex,
      ti: tailIndex,
      sc: skinColor,
    };
  }
  static Add(e) {
    deadPlayers.push(
      new DeadPlayer(
        e.x,
        e.y,
        e.dir,
        e.buildIndex,
        e.weaponIndex,
        e.weaponVariant,
        e.skinColor,
        e.scale,
        e.name,
        e.skinIndex,
        e.tailIndex,
      ),
    );
  }
  ragCollide(o, k = 1.08, dt = 16.67) {
    const ox = o.x,
      oy = o.y;
    if (ox == null || oy == null) return 0;
    const os = (o.getScale ? o.getScale() : o.scale) || 0;
    const rs = (this.rad || this.scale || 1) + os;
    const dx = this.px - ox,
      dy = this.py - oy;
    const dist = Math.hypot(dx, dy) || 1;
    const pen = rs - dist;
    if (pen <= 0) return 0;
    const nx = dx / dist,
      ny = dy / dist;
    const cap = (5.5 + rs * 0.06) * (dt / 16.67);
    const push = Math.min(pen, cap);
    this.px += nx * push;
    this.py += ny * push;
    const vn = this.vx * nx + this.vy * ny;
    if (vn < 0) {
      this.vx -= k * vn * nx;
      this.vy -= k * vn * ny;
    }
    const tx = -ny,
      ty = nx;
    const vt = this.vx * tx + this.vy * ty;
    const fr = 0.12 + Math.min(0.22, (pen / (rs + 1)) * 0.35);
    this.vx -= vt * fr * tx;
    this.vy -= vt * fr * ty;
    if (pen > rs * 0.5) {
      this.vx *= 0.88;
      this.vy *= 0.88;
    }
    return pen;
  }
  ragSeparate(b, dt = 16.67) {
    const ra = this.rad || this.scale || 1,
      rb = b.rad || b.scale || 1;
    const dx = this.px - b.px,
      dy = this.py - b.py;
    const dist = Math.hypot(dx, dy) || 1;
    const pen = ra + rb - dist;
    if (pen <= 0) return 0;
    const nx = dx / dist,
      ny = dy / dist;
    const cap = (4.8 + (ra + rb) * 0.06) * (dt / 16.67);
    const push = Math.min(pen * 0.5, cap);
    this.px += nx * push;
    this.py += ny * push;
    b.px -= nx * push;
    b.py -= ny * push;
    const tx = -ny,
      ty = nx;
    const vt = (this.vx - b.vx) * tx + (this.vy - b.vy) * ty;
    const fr = 0.1;
    this.vx -= vt * fr * tx;
    this.vy -= vt * fr * ty;
    b.vx += vt * fr * tx;
    b.vy += vt * fr * ty;
    return pen;
  }
  ragBoost(p, now, dt, w = 1.5) {
    if (now - (this._bst || 0) < 70) return;
    this._bst = now;
    const s = w * (dt / 16.67);
    const m = (p.weightM || 1) * p.boostSpeed * s;
    this.vx += m * Ti(p.dir);
    this.vy += m * Mi(p.dir);
  }
  _snapInit() {
    const sc = this.scale || 1;
    const px = 2;
    const T = 1650;
    const s =
      (DeadPlayer._snapC.width =
        DeadPlayer._snapC.height =
        Math.max(180, (sc * 7.2 + 90) | 0));
    const X = DeadPlayer._snapX;
    const ang = this._dir ?? this.dir ?? 0;
    X.setTransform(1, 0, 0, 1, 0, 0);
    X.clearRect(0, 0, s, s);
    X.imageSmoothingEnabled = false;
    const ox = this.x,
      oy = this.y,
      od = this.dir;
    this.x = this.y = 0;
    this.dir = ang;
    X.save();
    X.translate(s / 2, s / 2);
    X.rotate(ang);
    X.translate(0, -(sc * 0.05));
    renderPlayer(this, X);
    X.restore();
    this.x = ox;
    this.y = oy;
    this.dir = od;
    const img = X.getImageData(0, 0, s, s).data;
    const out = [];
    const ca = Math.cos(-ang);
    const sa = Math.sin(-ang);
    for (let y = 0; y < s; y += px) {
      for (let x = 0; x < s; x += px) {
        const cx = x + (px >> 1);
        const cy = y + (px >> 1);
        const i = (cy * s + cx) << 2;
        if (img[i + 3] < 20) continue;
        const dx = x - s / 2;
        const dy = y - s / 2;
        out.push({
          x: dx * ca - dy * sa,
          y: dx * sa + dy * ca,
          px: px,
          r: (img[i] * 0.93) | 0,
          g: (img[i + 1] * 0.93) | 0,
          b: (img[i + 2] * 0.93) | 0,
          delay: Math.random() * T * 0.92,
          active: false,
          vx: 0,
          vy: 0,
          life: 1,
          sz: px * (0.65 + Math.random() * 0.9),
        });
      }
    }
    this._snap = { s, pixels: out, DISSOLVE_TIME: T, ang };
  }
  updateRagdoll(now, dt, gameObjects, players, ais, config, items, xO, yO) {
    if (!this.t0) {
      this.rad = (this.scale || 1) * 1.02;
      this.t0 = this._lt = now;
    }
    const t = now - this.t0;
    if (t >= 3800) {
      this.active = false;
      this.t0 = this.fs = null;
      return;
    }
    dt = Math.min(34, now - this._lt);
    this._lt = now;
    this.vz += 0.0042 * dt;
    this.z += this.vz * dt;
    this.px += this.vx * dt;
    this.py += this.vy * dt;
    this.rot += this.av * dt;
    const FS = 800,
      FD = 2400;
    const fp = t <= FS ? 0 : Math.min(1, (t - FS) / FD);
    if (!fp && Math.random() < 0.008) this.av *= -1.4 + Math.random() * 0.9;
    if (this.z > 0) {
      this.z = 0;
      this.lastBounce = now;
      if (this.b < 3) {
        this.vz = -this.vz * (0.55 - this.b * 0.1);
        this.vx *= 0.86;
        this.vy *= 0.86;
        this.av *= 0.86;
        this.b++;
      } else {
        this.vz *= 0.22;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.av *= 0.95;
      }
    }
    this.vx *= this.f;
    this.vy *= this.f;
    const mid = config.mapScale * 0.5,
      hw = config.riverWidth * 0.5;
    if (!this.zIndex && this.py >= mid - hw && this.py <= mid + hw) {
      const w = items.weapons[this.weaponIndex] || {},
        watrImm = (this.skinIndex | 0) === 31,
        cur = 0.0011;
      let sp =
        (this.buildIndex >= 0 ? 0.5 : 1) *
        (w.spdMult || 1) *
        ((this.tail && this.tail.spdMult) || 1) *
        (this.py <= config.snowBiomeTop
          ? watrImm
            ? 1
            : config.snowSpeed
          : 1) *
        (this.slowMult || 1);
      if (watrImm) {
        sp *= 0.75;
        this.vx += cur * 0.4 * sp * dt;
      } else {
        sp *= 0.33;
        this.vx += cur * sp * dt;
      }
    }
    let deep = 0;
    for (let it = 0; it < 7; it++) {
      for (const o of gameObjects) {
        if (!o || o.active === false) continue;
        if (o.ignoreCollision && !o.trap && !o.boostSpeed) continue;
        if (o.healCol || o.teleport) continue;
        if (o.boostSpeed) {
          const dx = this.px - o.x,
            dy = this.py - o.y;
          const rs = this.rad + ((o.getScale ? o.getScale() : o.scale) || 0);
          if (dx * dx + dy * dy <= rs * rs) this.ragBoost(o, now, dt, 1.5);
          continue;
        }
        deep = Math.max(deep, this.ragCollide(o, 1.08, dt) || 0);
      }
      for (const p of players)
        if (p?.active && p.alive)
          deep = Math.max(deep, this.ragCollide(p, 1.02, dt) || 0);
      for (const a of ais)
        if (a?.active) deep = Math.max(deep, this.ragCollide(a, 1.02, dt) || 0);
      for (let j = deadPlayers.length - 1; j >= 0; j--) {
        const other = deadPlayers[j];
        if (other !== this && other?.active && other.t0)
          deep = Math.max(deep, this.ragSeparate(other, dt) || 0);
      }
      const r = this.rad,
        m = config.mapScale,
        damp = 0.55;
      if (this.px < r) {
        this.px = r;
        if (this.vx < 0) this.vx = -this.vx * damp;
      } else if (this.px > m - r) {
        this.px = m - r;
        if (this.vx > 0) this.vx = -this.vx * damp;
      }
      if (this.py < r) {
        this.py = r;
        if (this.vy < 0) this.vy = -this.vy * damp;
      } else if (this.py > m - r) {
        this.py = m - r;
        if (this.vy > 0) this.vy = -this.vy * damp;
      }
    }
    const sm = 1 - Math.pow(0.001, dt / 16.67);
    let dxs = (this.px - this.sx) * sm,
      dys = (this.py - this.sy) * sm;
    const maxStep = (6 + this.rad * 0.25) * (dt / 16.67),
      mag = Math.hypot(dxs, dys) || 1;
    if (mag > maxStep) {
      dxs *= maxStep / mag;
      dys *= maxStep / mag;
    }
    this.sx += dxs;
    this.sy += dys;
    let a = t > FS ? Math.max(0, 1 - ((t - FS) / FD) ** 2) : 1;
    const bt = now - this.lastBounce;
    if (fp && this.fr == null) this.fr = this.rot;
    const rr = fp
      ? this.fr
      : this.rot +
      Math.sin(now * 0.012 + this.rot) * 0.06 +
      Math.sin(now * 0.16 + this.seed * 20) * 0.09;
    const squ =
      bt < 350
        ? 1 - 0.22 * Math.sin((bt / 350) * Math.PI) * Math.exp(-(bt / 350) * 6)
        : 1;
    C.save();
    C.translate(this.sx - xO, this.sy - yO + this.z);
    C.rotate(rr);
    C.scale(1, squ);
    C.globalAlpha = a;
    C.fillStyle = "#91b2db";
    C.strokeStyle = ko;
    const od = this.dir,
      wi = this.weaponIndex,
      wv = this.weaponVariant,
      bi = this.buildIndex,
      si = this.skinIndex,
      ti = this.tailIndex,
      sc0 = this.skinColor;
    this.dir = this.fs.dir;
    this.weaponIndex = this.fs.wi;
    this.weaponVariant = this.fs.wv;
    this.buildIndex = this.fs.bi;
    this.skinIndex = this.fs.si;
    this.tailIndex = this.fs.ti;
    this.skinColor = this.fs.sc;
    renderPlayer(this, C);
    this.dir = od;
    this.weaponIndex = wi;
    this.weaponVariant = wv;
    this.buildIndex = bi;
    this.skinIndex = si;
    this.tailIndex = ti;
    this.skinColor = sc0;
    C.restore();
  }
  updateSnap(now, dt, xO, yO) {
    if (!this.t0) this.t0 = this._lt = now;
    if (!this._snap) this._snapInit();
    const t = now - this.t0;
    dt = Math.min(34, now - this._lt);
    this._lt = now;
    const S = this._snap;
    const pxs = S.pixels;
    const T = S.DISSOLVE_TIME;
    const HOLD = 380;
    const FADE = 950;
    const ba = t > HOLD ? Math.max(0, 1 - (t - HOLD) / (T * 0.75)) : 1;
    const ga =
      t < HOLD + T + FADE ? Math.max(0, 1 - (t - (HOLD + T)) / FADE) : 0;
    const baseA = ba * ga;
    C.save();
    C.translate(this.x - xO, this.y - yO);
    C.rotate(S.ang);
    C.globalAlpha = baseA;
    for (const p of pxs) {
      if (p.active) continue;
      if (t >= p.delay) {
        p.active = true;
        const dist = Math.hypot(p.x, p.y) || 1;
        const nx = p.x / dist;
        const ny = p.y / dist;
        const cb = 1 - Math.min(1, dist / (S.s * 0.52));
        const sp = (0.018 + Math.random() * 0.058) * (0.75 + cb * 1.45);
        p.vx = nx * sp + (Math.random() * 2 - 1) * 0.024;
        p.vy = ny * sp - (0.022 + Math.random() * 0.068);
        p.life = 0.92 + Math.random() * 0.45;
        continue;
      }
      C.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
      C.fillRect(p.x, p.y, p.px, p.px);
    }
    for (const p of pxs) {
      if (!p.active) continue;
      p.x += p.vx * dt;
      p.y += p.vy * dt + 0.012 * dt;
      p.life -= dt / 1950;
      if (p.life <= 0) continue;
      C.globalAlpha = p.life * baseA * 0.95;
      C.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
      const sz = p.sz * (0.35 + p.life * 0.85);
      C.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
    }
    C.restore();
    C.globalAlpha = 1;
    if (t >= HOLD + T + FADE + 200)
      ((this.active = false), (this.t0 = this._snap = null));
  }
}
const Hats = [
  {
    id: 45,
    name: "Shame!",
    dontSell: true,
    price: 0,
    scale: 120,
    desc: "hacks are for losers",
  },
  {
    id: 51,
    name: "Moo Cap",
    price: 0,
    scale: 120,
    desc: "coolest mooer around",
  },
  {
    id: 50,
    name: "Apple Cap",
    price: 0,
    scale: 120,
    desc: "apple farms remembers",
  },
  {
    id: 28,
    name: "Moo Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 29,
    name: "Pig Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 30,
    name: "Fluff Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 36,
    name: "Pandou Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 37,
    name: "Bear Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 38,
    name: "Monkey Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 44,
    name: "Polar Head",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 35,
    name: "Fez Hat",
    price: 0,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 42,
    name: "Enigma Hat",
    price: 0,
    scale: 120,
    desc: "join the enigma army",
  },
  {
    id: 43,
    name: "Blitz Hat",
    price: 0,
    scale: 120,
    desc: "hey everybody i'm blitz",
  },
  {
    id: 49,
    name: "Bob XIII Hat",
    price: 0,
    scale: 120,
    desc: "like and subscribe",
  },
  {
    id: 57,
    name: "Pumpkin",
    price: 50,
    scale: 120,
    desc: "Spooooky",
  },
  {
    id: 8,
    name: "Bummle Hat",
    price: 100,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 2,
    name: "Straw Hat",
    price: 500,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 15,
    name: "Winter Cap",
    price: 600,
    scale: 120,
    desc: "allows you to move at normal speed in snow",
    coldM: 1,
  },
  {
    id: 5,
    name: "Cowboy Hat",
    price: 1000,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 4,
    name: "Ranger Hat",
    price: 2000,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 18,
    name: "Explorer Hat",
    price: 2000,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 31,
    name: "Flipper Hat",
    price: 2500,
    scale: 120,
    desc: "have more control while in water",
    watrImm: true,
  },
  {
    id: 1,
    name: "Marksman Cap",
    price: 3000,
    scale: 120,
    desc: "increases arrow speed and range",
    aMlt: 1.3,
  },
  {
    id: 10,
    name: "Bush Gear",
    price: 3000,
    scale: 160,
    desc: "allows you to disguise yourself as a bush",
  },
  {
    id: 48,
    name: "Halo",
    price: 3000,
    scale: 120,
    desc: "no effect",
  },
  {
    id: 6,
    name: "Soldier Helmet",
    price: 4000,
    scale: 120,
    desc: "reduces damage taken but slows movement",
    spdMult: 0.94,
    dmgMult: 0.75,
  },
  {
    id: 23,
    name: "Anti Venom Gear",
    price: 4000,
    scale: 120,
    desc: "makes you immune to poison",
    poisonRes: 1,
  },
  {
    id: 13,
    name: "Medic Gear",
    price: 5000,
    scale: 110,
    desc: "slowly regenerates health over time",
    healthRegen: 3,
  },
  {
    id: 9,
    name: "Miners Helmet",
    price: 5000,
    scale: 120,
    desc: "earn 1 extra gold per resource",
    extraGold: 1,
  },
  {
    id: 32,
    name: "Musketeer Hat",
    price: 5000,
    scale: 120,
    desc: "reduces cost of projectiles",
    projCost: 0.5,
  },
  {
    id: 7,
    name: "Bull Helmet",
    price: 6000,
    scale: 120,
    desc: "increases damage done but drains health",
    healthRegen: -5,
    dmgMultO: 1.5,
    spdMult: 0.96,
  },
  {
    id: 22,
    name: "Emp Helmet",
    price: 6000,
    scale: 120,
    desc: "turrets won't attack but you move slower",
    antiTurret: 1,
    spdMult: 0.7,
  },
  {
    id: 12,
    name: "Booster Hat",
    price: 6000,
    scale: 120,
    desc: "increases your movement speed",
    spdMult: 1.16,
  },
  {
    id: 26,
    name: "Barbarian Armor",
    price: 8000,
    scale: 120,
    desc: "knocks back enemies that attack you",
    dmgK: 0.6,
  },
  {
    id: 21,
    name: "Plague Mask",
    price: 10000,
    scale: 120,
    desc: "melee attacks deal poison damage",
    poisonDmg: 5,
    poisonTime: 6,
  },
  {
    id: 46,
    name: "Bull Mask",
    price: 10000,
    scale: 120,
    desc: "bulls won't target you unless you attack them",
    bullRepel: 1,
  },
  {
    id: 14,
    name: "Windmill Hat",
    topSprite: true,
    price: 10000,
    scale: 120,
    desc: "generates points while worn",
    pps: 1.5,
  },
  {
    id: 11,
    name: "Spike Gear",
    topSprite: true,
    price: 10000,
    scale: 120,
    desc: "deal damage to players that damage you",
    dmg: 0.45,
  },
  {
    id: 53,
    name: "Turret Gear",
    topSprite: true,
    price: 10000,
    scale: 120,
    desc: "you become a walking turret",
    turret: {
      proj: 1,
      range: 700,
      rate: 2500,
    },
    spdMult: 0.7,
  },
  {
    id: 20,
    name: "Samurai Armor",
    price: 12000,
    scale: 120,
    desc: "increased attack speed and fire rate",
    atkSpd: 0.78,
  },
  {
    id: 58,
    name: "Dark Knight",
    price: 12000,
    scale: 120,
    desc: "restores health when you deal damage",
    healD: 0.4,
  },
  {
    id: 27,
    name: "Scavenger Gear",
    price: 15000,
    scale: 120,
    desc: "earn double points for each kill",
    kScrM: 2,
  },
  {
    id: 40,
    name: "Tank Gear",
    price: 15000,
    scale: 120,
    desc: "increased damage to buildings but slower movement",
    spdMult: 0.3,
    bDmg: 3.3,
  },
  {
    id: 52,
    name: "Thief Gear",
    price: 15000,
    scale: 120,
    desc: "steal half of a players gold when you kill them",
    goldSteal: 0.5,
  },
  {
    id: 55,
    name: "Bloodthirster",
    price: 20000,
    scale: 120,
    desc: "Restore Health when dealing damage. And increased damage",
    healD: 0.25,
    dmgMultO: 1.2,
  },
  {
    id: 56,
    name: "Assassin Gear",
    price: 20000,
    scale: 120,
    desc: "Go invisible when not moving. Can't eat. Increased speed",
    noEat: true,
    spdMult: 1.1,
    invisTimer: 1000,
  },
];
const Accessories = [
  {
    id: 12,
    name: "Snowball",
    price: 1000,
    scale: 105,
    xOff: 18,
    desc: "no effect",
  },
  {
    id: 9,
    name: "Tree Cape",
    price: 1000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 10,
    name: "Stone Cape",
    price: 1000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 3,
    name: "Cookie Cape",
    price: 1500,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 8,
    name: "Cow Cape",
    price: 2000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 11,
    name: "Monkey Tail",
    price: 2000,
    scale: 97,
    xOff: 25,
    desc: "Super speed but reduced damage",
    spdMult: 1.35,
    dmgMultO: 0.2,
  },
  {
    id: 17,
    name: "Apple Basket",
    price: 3000,
    scale: 80,
    xOff: 12,
    desc: "slowly regenerates health over time",
    healthRegen: 1,
  },
  {
    id: 6,
    name: "Winter Cape",
    price: 3000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 4,
    name: "Skull Cape",
    price: 4000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 5,
    name: "Dash Cape",
    price: 5000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 2,
    name: "Dragon Cape",
    price: 6000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 1,
    name: "Super Cape",
    price: 8000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 7,
    name: "Troll Cape",
    price: 8000,
    scale: 90,
    desc: "no effect",
  },
  {
    id: 14,
    name: "Thorns",
    price: 10000,
    scale: 115,
    xOff: 20,
    desc: "no effect",
  },
  {
    id: 15,
    name: "Blockades",
    price: 10000,
    scale: 95,
    xOff: 15,
    desc: "no effect",
  },
  {
    id: 20,
    name: "Devils Tail",
    price: 10000,
    scale: 95,
    xOff: 20,
    desc: "no effect",
  },
  {
    id: 16,
    name: "Sawblade",
    price: 12000,
    scale: 90,
    spin: true,
    xOff: 0,
    desc: "deal damage to players that damage you",
    dmg: 0.15,
  },
  {
    id: 13,
    name: "Angel Wings",
    price: 15000,
    scale: 138,
    xOff: 22,
    desc: "slowly regenerates health over time",
    healthRegen: 3,
  },
  {
    id: 19,
    name: "Shadow Wings",
    price: 15000,
    scale: 138,
    xOff: 22,
    desc: "increased movement speed",
    spdMult: 1.1,
  },
  {
    id: 18,
    name: "Blood Wings",
    price: 20000,
    scale: 178,
    xOff: 26,
    desc: "restores health when you deal damage",
    healD: 0.2,
  },
  {
    id: 21,
    name: "Corrupt X Wings",
    price: 20000,
    scale: 178,
    xOff: 26,
    desc: "deal damage to players that damage you",
    dmg: 0.25,
  },
];
const Store = {
  hats: Hats,
  accessories: Accessories,
};
function Projectile(e, t, i, n, s, r, o) {
  this.init = function (a, f, d, u, p, w, x, b, $) {
    this.active = true;
    this.indx = a;
    this.x = f;
    this.y = d;
    this.dir = u;
    this.skipMov = true;
    this.speed = p;
    this.dmg = w;
    this.scale = b;
    this.range = x;
    this.owner = $;
    if (o) {
      this.sentTo = {};
    }
  };
  const l = [];
  let c;
  this.update = function (a) {
    if (this.active) {
      let d = this.speed * a;
      let u;
      if (this.skipMov) {
        this.skipMov = false;
      } else {
        this.x += d * Math.cos(this.dir);
        this.y += d * Math.sin(this.dir);
        this.range -= d;
        if (this.range <= 0) {
          this.x += this.range * Math.cos(this.dir);
          this.y += this.range * Math.sin(this.dir);
          d = 1;
          this.range = 0;
          this.active = false;
        }
      }
      if (o) {
        for (var f = 0; f < e.length; ++f) {
          if (!this.sentTo[e[f].id] && e[f].canSee(this)) {
            this.sentTo[e[f].id] = 1;
            o.send(
              e[f].id,
              "X",
              r.fixTo(this.x, 1),
              r.fixTo(this.y, 1),
              r.fixTo(this.dir, 2),
              r.fixTo(this.range, 1),
              this.speed,
              this.indx,
              this.layer,
              this.sid,
            );
          }
        }
        l.length = 0;
        for (var f = 0; f < e.length + t.length; ++f) {
          c = e[f] || t[f - e.length];
          if (
            c.alive &&
            c != this.owner &&
            !(this.owner.team && c.team == this.owner.team) &&
            r.lineInRect(
              c.x - c.scale,
              c.y - c.scale,
              c.x + c.scale,
              c.y + c.scale,
              this.x,
              this.y,
              this.x + d * Math.cos(this.dir),
              this.y + d * Math.sin(this.dir),
            )
          ) {
            l.push(c);
          }
        }
        const p = i.getGridArrays(this.x, this.y, this.scale);
        for (let w = 0; w < p.length; ++w) {
          for (let x = 0; x < p[w].length; ++x) {
            c = p[w][x];
            u = c.getScale();
            if (
              c.active &&
              this.ignoreObj != c.sid &&
              this.layer <= c.layer &&
              l.indexOf(c) < 0 &&
              !c.ignoreCollision &&
              r.lineInRect(
                c.x - u,
                c.y - u,
                c.x + u,
                c.y + u,
                this.x,
                this.y,
                this.x + d * Math.cos(this.dir),
                this.y + d * Math.sin(this.dir),
              )
            ) {
              l.push(c);
            }
          }
        }
        if (l.length > 0) {
          let w = null;
          let x = null;
          let b = null;
          for (var f = 0; f < l.length; ++f) {
            b = r.getDistance(this.x, this.y, l[f].x, l[f].y);
            if (x == null || b < x) {
              x = b;
              w = l[f];
            }
          }
          if (w.isPlayer || w.isAI) {
            const $ = (w.weightM || 1) * 0.3;
            w.xVel += $ * Math.cos(this.dir);
            w.yVel += $ * Math.sin(this.dir);
            if (
              w.weaponIndex == null ||
              !(
                n.weapons[w.weaponIndex].shield &&
                r.getAngleDist(this.dir + Math.PI, w.dir) <= s.shieldAngle
              )
            ) {
              w.changeHealth(-this.dmg, this.owner, this.owner);
            }
          } else {
            if (w.projDmg && w.health && w.changeHealth(-this.dmg)) {
              i.disableObj(w);
            }
            for (var f = 0; f < e.length; ++f) {
              if (e[f].active) {
                if (w.sentTo[e[f].id]) {
                  if (w.active) {
                    if (e[f].canSee(w)) {
                      o.send(e[f].id, "L", r.fixTo(this.dir, 2), w.sid);
                    }
                  } else {
                    o.send(e[f].id, "Q", w.sid);
                  }
                }
                if (!w.active && w.owner == e[f]) {
                  e[f].changeItemCount(w.group.id, -1);
                }
              }
            }
          }
          this.active = false;
          for (var f = 0; f < e.length; ++f) {
            if (this.sentTo[e[f].id]) {
              o.send(e[f].id, "Y", this.sid, r.fixTo(x, 1));
            }
          }
        }
      }
    }
  };
}
var Jo = {
  exports: {},
};
var Qo = {
  exports: {},
};
(function () {
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var t = {
    rotl: function (i, n) {
      return (i << n) | (i >>> (32 - n));
    },
    rotr: function (i, n) {
      return (i << (32 - n)) | (i >>> n);
    },
    endian: function (i) {
      if (i.constructor == Number) {
        return (t.rotl(i, 8) & 16711935) | (t.rotl(i, 24) & 4278255360);
      }
      for (var n = 0; n < i.length; n++) {
        i[n] = t.endian(i[n]);
      }
      return i;
    },
    randomBytes: function (i) {
      for (var n = []; i > 0; i--) {
        n.push(Math.floor(Math.random() * 256));
      }
      return n;
    },
    bytesToWords: function (i) {
      for (var n = [], s = 0, r = 0; s < i.length; s++, r += 8) {
        n[r >>> 5] |= i[s] << (24 - (r % 32));
      }
      return n;
    },
    wordsToBytes: function (i) {
      for (var n = [], s = 0; s < i.length * 32; s += 8) {
        n.push((i[s >>> 5] >>> (24 - (s % 32))) & 255);
      }
      return n;
    },
    bytesToHex: function (i) {
      for (var n = [], s = 0; s < i.length; s++) {
        n.push((i[s] >>> 4).toString(16));
        n.push((i[s] & 15).toString(16));
      }
      return n.join("");
    },
    hexToBytes: function (i) {
      for (var n = [], s = 0; s < i.length; s += 2) {
        n.push(parseInt(i.substr(s, 2), 16));
      }
      return n;
    },
    bytesToBase64: function (i) {
      for (var n = [], s = 0; s < i.length; s += 3) {
        for (
          var r = (i[s] << 16) | (i[s + 1] << 8) | i[s + 2], o = 0;
          o < 4;
          o++
        ) {
          if (s * 8 + o * 6 <= i.length * 8) {
            n.push(e.charAt((r >>> ((3 - o) * 6)) & 63));
          } else {
            n.push("=");
          }
        }
      }
      return n.join("");
    },
    base64ToBytes: function (i) {
      i = i.replace(/[^A-Z0-9+\/]/gi, "");
      for (var n = [], s = 0, r = 0; s < i.length; r = ++s % 4) {
        if (r != 0) {
          n.push(
            ((e.indexOf(i.charAt(s - 1)) & (Math.pow(2, r * -2 + 8) - 1)) <<
              (r * 2)) |
            (e.indexOf(i.charAt(s)) >>> (6 - r * 2)),
          );
        }
      }
      return n;
    },
  };
  Qo.exports = t;
})();
var Jh = Qo.exports;
var Es = {
  utf8: {
    stringToBytes: function (e) {
      return Es.bin.stringToBytes(unescape(encodeURIComponent(e)));
    },
    bytesToString: function (e) {
      return decodeURIComponent(escape(Es.bin.bytesToString(e)));
    },
  },
  bin: {
    stringToBytes: function (e) {
      for (var t = [], i = 0; i < e.length; i++) {
        t.push(e.charCodeAt(i) & 255);
      }
      return t;
    },
    bytesToString: function (e) {
      for (var t = [], i = 0; i < e.length; i++) {
        t.push(String.fromCharCode(e[i]));
      }
      return t.join("");
    },
  },
};
var Mr = Es;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
function Qh(e) {
  return e != null && (jo(e) || jh(e) || !!e._isBuffer);
}
function jo(e) {
  return (
    !!e.constructor &&
    typeof e.constructor.isBuffer == "function" &&
    e.constructor.isBuffer(e)
  );
}
function jh(e) {
  return (
    typeof e.readFloatLE == "function" &&
    typeof e.slice == "function" &&
    jo(e.slice(0, 0))
  );
}
(function () {
  var e = Jh;
  var t = Mr.utf8;
  var i = Qh;
  var n = Mr.bin;
  function s(r, o) {
    if (r.constructor == String) {
      if (o && o.encoding === "binary") {
        r = n.stringToBytes(r);
      } else {
        r = t.stringToBytes(r);
      }
    } else if (i(r)) {
      r = Array.prototype.slice.call(r, 0);
    } else if (!Array.isArray(r) && r.constructor !== Uint8Array) {
      r = r.toString();
    }
    for (
      var l = e.bytesToWords(r),
      c = r.length * 8,
      a = 1732584193,
      f = -271733879,
      d = -1732584194,
      u = 271733878,
      p = 0;
      p < l.length;
      p++
    ) {
      l[p] =
        (((l[p] << 8) | (l[p] >>> 24)) & 16711935) |
        (((l[p] << 24) | (l[p] >>> 8)) & 4278255360);
    }
    l[c >>> 5] |= 128 << (c % 32);
    l[(((c + 64) >>> 9) << 4) + 14] = c;
    for (
      var w = s._ff, x = s._gg, b = s._hh, $ = s._ii, p = 0;
      p < l.length;
      p += 16
    ) {
      var v = a;
      var S = f;
      var R = d;
      var G = u;
      a = w(a, f, d, u, l[p + 0], 7, -680876936);
      u = w(u, a, f, d, l[p + 1], 12, -389564586);
      d = w(d, u, a, f, l[p + 2], 17, 606105819);
      f = w(f, d, u, a, l[p + 3], 22, -1044525330);
      a = w(a, f, d, u, l[p + 4], 7, -176418897);
      u = w(u, a, f, d, l[p + 5], 12, 1200080426);
      d = w(d, u, a, f, l[p + 6], 17, -1473231341);
      f = w(f, d, u, a, l[p + 7], 22, -45705983);
      a = w(a, f, d, u, l[p + 8], 7, 1770035416);
      u = w(u, a, f, d, l[p + 9], 12, -1958414417);
      d = w(d, u, a, f, l[p + 10], 17, -42063);
      f = w(f, d, u, a, l[p + 11], 22, -1990404162);
      a = w(a, f, d, u, l[p + 12], 7, 1804603682);
      u = w(u, a, f, d, l[p + 13], 12, -40341101);
      d = w(d, u, a, f, l[p + 14], 17, -1502002290);
      f = w(f, d, u, a, l[p + 15], 22, 1236535329);
      a = x(a, f, d, u, l[p + 1], 5, -165796510);
      u = x(u, a, f, d, l[p + 6], 9, -1069501632);
      d = x(d, u, a, f, l[p + 11], 14, 643717713);
      f = x(f, d, u, a, l[p + 0], 20, -373897302);
      a = x(a, f, d, u, l[p + 5], 5, -701558691);
      u = x(u, a, f, d, l[p + 10], 9, 38016083);
      d = x(d, u, a, f, l[p + 15], 14, -660478335);
      f = x(f, d, u, a, l[p + 4], 20, -405537848);
      a = x(a, f, d, u, l[p + 9], 5, 568446438);
      u = x(u, a, f, d, l[p + 14], 9, -1019803690);
      d = x(d, u, a, f, l[p + 3], 14, -187363961);
      f = x(f, d, u, a, l[p + 8], 20, 1163531501);
      a = x(a, f, d, u, l[p + 13], 5, -1444681467);
      u = x(u, a, f, d, l[p + 2], 9, -51403784);
      d = x(d, u, a, f, l[p + 7], 14, 1735328473);
      f = x(f, d, u, a, l[p + 12], 20, -1926607734);
      a = b(a, f, d, u, l[p + 5], 4, -378558);
      u = b(u, a, f, d, l[p + 8], 11, -2022574463);
      d = b(d, u, a, f, l[p + 11], 16, 1839030562);
      f = b(f, d, u, a, l[p + 14], 23, -35309556);
      a = b(a, f, d, u, l[p + 1], 4, -1530992060);
      u = b(u, a, f, d, l[p + 4], 11, 1272893353);
      d = b(d, u, a, f, l[p + 7], 16, -155497632);
      f = b(f, d, u, a, l[p + 10], 23, -1094730640);
      a = b(a, f, d, u, l[p + 13], 4, 681279174);
      u = b(u, a, f, d, l[p + 0], 11, -358537222);
      d = b(d, u, a, f, l[p + 3], 16, -722521979);
      f = b(f, d, u, a, l[p + 6], 23, 76029189);
      a = b(a, f, d, u, l[p + 9], 4, -640364487);
      u = b(u, a, f, d, l[p + 12], 11, -421815835);
      d = b(d, u, a, f, l[p + 15], 16, 530742520);
      f = b(f, d, u, a, l[p + 2], 23, -995338651);
      a = $(a, f, d, u, l[p + 0], 6, -198630844);
      u = $(u, a, f, d, l[p + 7], 10, 1126891415);
      d = $(d, u, a, f, l[p + 14], 15, -1416354905);
      f = $(f, d, u, a, l[p + 5], 21, -57434055);
      a = $(a, f, d, u, l[p + 12], 6, 1700485571);
      u = $(u, a, f, d, l[p + 3], 10, -1894986606);
      d = $(d, u, a, f, l[p + 10], 15, -1051523);
      f = $(f, d, u, a, l[p + 1], 21, -2054922799);
      a = $(a, f, d, u, l[p + 8], 6, 1873313359);
      u = $(u, a, f, d, l[p + 15], 10, -30611744);
      d = $(d, u, a, f, l[p + 6], 15, -1560198380);
      f = $(f, d, u, a, l[p + 13], 21, 1309151649);
      a = $(a, f, d, u, l[p + 4], 6, -145523070);
      u = $(u, a, f, d, l[p + 11], 10, -1120210379);
      d = $(d, u, a, f, l[p + 2], 15, 718787259);
      f = $(f, d, u, a, l[p + 9], 21, -343485551);
      a = (a + v) >>> 0;
      f = (f + S) >>> 0;
      d = (d + R) >>> 0;
      u = (u + G) >>> 0;
    }
    return e.endian([a, f, d, u]);
  }
  s._ff = function (r, o, l, c, a, f, d) {
    var u = r + ((o & l) | (~o & c)) + (a >>> 0) + d;
    return ((u << f) | (u >>> (32 - f))) + o;
  };
  s._gg = function (r, o, l, c, a, f, d) {
    var u = r + ((o & c) | (l & ~c)) + (a >>> 0) + d;
    return ((u << f) | (u >>> (32 - f))) + o;
  };
  s._hh = function (r, o, l, c, a, f, d) {
    var u = r + (o ^ l ^ c) + (a >>> 0) + d;
    return ((u << f) | (u >>> (32 - f))) + o;
  };
  s._ii = function (r, o, l, c, a, f, d) {
    var u = r + (l ^ (o | ~c)) + (a >>> 0) + d;
    return ((u << f) | (u >>> (32 - f))) + o;
  };
  s._blocksize = 16;
  s._digestsize = 16;
  Jo.exports = function (r, o) {
    if (r == null) {
      throw new Error("Illegal argument " + r);
    }
    var l = e.wordsToBytes(s(r, o));
    if (o && o.asBytes) {
      return l;
    } else if (o && o.asString) {
      return n.bytesToString(l);
    } else {
      return e.bytesToHex(l);
    }
  };
})();
var eu = Jo.exports;
const tu = An(eu);
var Yn;
var Er;
function It() {
  if (Er) {
    return Yn;
  }
  Er = 1;
  function e(t, i, n, s, r, o) {
    return {
      tag: t,
      key: i,
      attrs: n,
      children: s,
      text: r,
      dom: o,
      domSize: undefined,
      state: undefined,
      events: undefined,
      instance: undefined,
    };
  }
  e.normalize = function (t) {
    if (Array.isArray(t)) {
      return e(
        "[",
        undefined,
        undefined,
        e.normalizeChildren(t),
        undefined,
        undefined,
      );
    } else if (t == null || typeof t == "boolean") {
      return null;
    } else if (typeof t == "object") {
      return t;
    } else {
      return e("#", undefined, undefined, String(t), undefined, undefined);
    }
  };
  e.normalizeChildren = function (t) {
    var i = [];
    if (t.length) {
      for (var n = t[0] != null && t[0].key != null, s = 1; s < t.length; s++) {
        if ((t[s] != null && t[s].key != null) !== n) {
          throw new TypeError(
            n && (t[s] != null || typeof t[s] == "boolean")
              ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
              : "In fragments, vnodes must either all have keys or none have keys.",
          );
        }
      }
      for (var s = 0; s < t.length; s++) {
        i[s] = e.normalize(t[s]);
      }
    }
    return i;
  };
  Yn = e;
  return Yn;
}
var iu = It();
function ea() {
  var e = arguments[this];
  var t = this + 1;
  var i;
  if (e == null) {
    e = {};
  } else if (typeof e != "object" || e.tag != null || Array.isArray(e)) {
    e = {};
    t = this;
  }
  if (arguments.length === t + 1) {
    i = arguments[t];
    if (!Array.isArray(i)) {
      i = [i];
    }
  } else {
    for (i = []; t < arguments.length;) {
      i.push(arguments[t++]);
    }
  }
  return iu("", e.key, e, i);
}
var Dn = {}.hasOwnProperty;
var nu = It();
var su = ea;
var Jt = Dn;
var ru =
  /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
var ta = {};
function Cr(e) {
  for (var t in e) {
    if (Jt.call(e, t)) {
      return false;
    }
  }
  return true;
}
function ou(e) {
  for (var t, i = "div", n = [], s = {}; (t = ru.exec(e));) {
    var r = t[1];
    var o = t[2];
    if (r === "" && o !== "") {
      i = o;
    } else if (r === "#") {
      s.id = o;
    } else if (r === ".") {
      n.push(o);
    } else if (t[3][0] === "[") {
      var l = t[6];
      if (l) {
        l = l.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
      }
      if (t[4] === "class") {
        n.push(l);
      } else {
        s[t[4]] = l === "" ? l : l || true;
      }
    }
  }
  if (n.length > 0) {
    s.className = n.join(" ");
  }
  return (ta[e] = {
    tag: i,
    attrs: s,
  });
}
function au(e, t) {
  var i = t.attrs;
  var n = Jt.call(i, "class");
  var s = n ? i.class : i.className;
  t.tag = e.tag;
  t.attrs = {};
  if (!Cr(e.attrs) && !Cr(i)) {
    var r = {};
    for (var o in i) {
      if (Jt.call(i, o)) {
        r[o] = i[o];
      }
    }
    i = r;
  }
  for (var o in e.attrs) {
    if (Jt.call(e.attrs, o) && o !== "className" && !Jt.call(i, o)) {
      i[o] = e.attrs[o];
    }
  }
  if (s != null || e.attrs.className != null) {
    i.className =
      s != null
        ? e.attrs.className != null
          ? String(e.attrs.className) + " " + String(s)
          : s
        : e.attrs.className != null
          ? e.attrs.className
          : null;
  }
  if (n) {
    i.class = null;
  }
  for (var o in i) {
    if (Jt.call(i, o) && o !== "key") {
      t.attrs = i;
      break;
    }
  }
  return t;
}
function lu(e) {
  if (
    e == null ||
    (typeof e != "string" &&
      typeof e != "function" &&
      typeof e.view != "function")
  ) {
    throw Error("The selector must be either a string or a component.");
  }
  var t = su.apply(1, arguments);
  if (
    typeof e == "string" &&
    ((t.children = nu.normalizeChildren(t.children)), e !== "[")
  ) {
    return au(ta[e] || ou(e), t);
  } else {
    t.tag = e;
    return t;
  }
}
var ia = lu;
var cu = It();
function hu(e) {
  if (e == null) {
    e = "";
  }
  return cu("<", undefined, undefined, e, undefined, undefined);
}
var uu = It();
var fu = ea;
function du() {
  var e = fu.apply(0, arguments);
  e.tag = "[";
  e.children = uu.normalizeChildren(e.children);
  return e;
}
var Js = ia;
Js.trust = hu;
Js.fragment = du;
var pu = Js;
var cn = {
  exports: {},
};
var Kn;
var Pr;
function na() {
  if (Pr) {
    return Kn;
  }
  Pr = 1;
  function e(t) {
    if (!(this instanceof e)) {
      throw new Error("Promise must be called with 'new'.");
    }
    if (typeof t != "function") {
      throw new TypeError("executor must be a function.");
    }
    var i = this;
    var n = [];
    var s = [];
    var r = a(n, true);
    var o = a(s, false);
    var l = (i._instance = {
      resolvers: n,
      rejectors: s,
    });
    var c = typeof setImmediate == "function" ? setImmediate : setTimeout;
    function a(d, u) {
      return function p(w) {
        var x;
        try {
          if (
            u &&
            w != null &&
            (typeof w == "object" || typeof w == "function") &&
            typeof (x = w.then) == "function"
          ) {
            if (w === i) {
              throw new TypeError("Promise can't be resolved with itself.");
            }
            f(x.bind(w));
          } else {
            c(function () {
              if (!u && d.length === 0) {
                console.error("Possible unhandled promise rejection:", w);
              }
              for (var b = 0; b < d.length; b++) {
                d[b](w);
              }
              n.length = 0;
              s.length = 0;
              l.state = u;
              l.retry = function () {
                p(w);
              };
            });
          }
        } catch (b) {
          o(b);
        }
      };
    }
    function f(d) {
      var u = 0;
      function p(x) {
        return function (b) {
          if (!(u++ > 0)) {
            x(b);
          }
        };
      }
      var w = p(o);
      try {
        d(p(r), w);
      } catch (x) {
        w(x);
      }
    }
    f(t);
  }
  e.prototype.then = function (t, i) {
    var n = this;
    var s = n._instance;
    function r(a, f, d, u) {
      f.push(function (p) {
        if (typeof a != "function") {
          d(p);
        } else {
          try {
            o(a(p));
          } catch (w) {
            if (l) {
              l(w);
            }
          }
        }
      });
      if (typeof s.retry == "function" && u === s.state) {
        s.retry();
      }
    }
    var o;
    var l;
    var c = new e(function (a, f) {
      o = a;
      l = f;
    });
    r(t, s.resolvers, o, true);
    r(i, s.rejectors, l, false);
    return c;
  };
  e.prototype.catch = function (t) {
    return this.then(null, t);
  };
  e.prototype.finally = function (t) {
    return this.then(
      function (i) {
        return e.resolve(t()).then(function () {
          return i;
        });
      },
      function (i) {
        return e.resolve(t()).then(function () {
          return e.reject(i);
        });
      },
    );
  };
  e.resolve = function (t) {
    if (t instanceof e) {
      return t;
    } else {
      return new e(function (i) {
        i(t);
      });
    }
  };
  e.reject = function (t) {
    return new e(function (i, n) {
      n(t);
    });
  };
  e.all = function (t) {
    return new e(function (i, n) {
      var s = t.length;
      var r = 0;
      var o = [];
      if (t.length === 0) {
        i([]);
      } else {
        for (var l = 0; l < t.length; l++) {
          (function (c) {
            function a(f) {
              r++;
              o[c] = f;
              if (r === s) {
                i(o);
              }
            }
            if (
              t[c] != null &&
              (typeof t[c] == "object" || typeof t[c] == "function") &&
              typeof t[c].then == "function"
            ) {
              t[c].then(a, n);
            } else {
              a(t[c]);
            }
          })(l);
        }
      }
    });
  };
  e.race = function (t) {
    return new e(function (i, n) {
      for (var s = 0; s < t.length; s++) {
        t[s].then(i, n);
      }
    });
  };
  Kn = e;
  return Kn;
}
var Ei = na();
if (typeof window !== "undefined") {
  if (typeof window.Promise === "undefined") {
    window.Promise = Ei;
  } else if (!window.Promise.prototype.finally) {
    window.Promise.prototype.finally = Ei.prototype.finally;
  }
  cn.exports = window.Promise;
} else if (typeof Vt !== "undefined") {
  if (typeof Vt.Promise === "undefined") {
    Vt.Promise = Ei;
  } else if (!Vt.Promise.prototype.finally) {
    Vt.Promise.prototype.finally = Ei.prototype.finally;
  }
  cn.exports = Vt.Promise;
} else {
  cn.exports = Ei;
}
var sa = cn.exports;
var Zn = It();
function mu(e) {
  var t = e && e.document;
  var i;
  var n = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML",
  };
  function s(m) {
    return (m.attrs && m.attrs.xmlns) || n[m.tag];
  }
  function r(m, h) {
    if (m.state !== h) {
      throw new Error("'vnode.state' must not be modified.");
    }
  }
  function o(m) {
    var h = m.state;
    try {
      return this.apply(h, arguments);
    } finally {
      r(m, h);
    }
  }
  function l() {
    try {
      return t.activeElement;
    } catch {
      return null;
    }
  }
  function c(m, h, g, I, E, O, q) {
    for (var Z = g; Z < I; Z++) {
      var U = h[Z];
      if (U != null) {
        a(m, U, E, q, O);
      }
    }
  }
  function a(m, h, g, I, E) {
    var O = h.tag;
    if (typeof O == "string") {
      h.state = {};
      if (h.attrs != null) {
        yi(h.attrs, h, g);
      }
      switch (O) {
        case "#":
          f(m, h, E);
          break;
        case "<":
          u(m, h, I, E);
          break;
        case "[":
          p(m, h, g, I, E);
          break;
        default:
          w(m, h, g, I, E);
      }
    } else {
      b(m, h, g, I, E);
    }
  }
  function f(m, h, g) {
    h.dom = t.createTextNode(h.children);
    N(m, h.dom, g);
  }
  var d = {
    caption: "table",
    thead: "table",
    tbody: "table",
    tfoot: "table",
    tr: "tbody",
    th: "tr",
    td: "tr",
    colgroup: "table",
    col: "colgroup",
  };
  function u(m, h, g, I) {
    var E = h.children.match(/^\s*?<(\w+)/im) || [];
    var O = t.createElement(d[E[1]] || "div");
    if (g === "http://www.w3.org/2000/svg") {
      O.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg">' + h.children + "</svg>";
      O = O.firstChild;
    } else {
      O.innerHTML = h.children;
    }
    h.dom = O.firstChild;
    h.domSize = O.childNodes.length;
    h.instance = [];
    for (var q = t.createDocumentFragment(), Z; (Z = O.firstChild);) {
      h.instance.push(Z);
      q.appendChild(Z);
    }
    N(m, q, I);
  }
  function p(m, h, g, I, E) {
    var O = t.createDocumentFragment();
    if (h.children != null) {
      var q = h.children;
      c(O, q, 0, q.length, g, null, I);
    }
    h.dom = O.firstChild;
    h.domSize = O.childNodes.length;
    N(m, O, E);
  }
  function w(m, h, g, I, E) {
    var O = h.tag;
    var q = h.attrs;
    var Z = q && q.is;
    I = s(h) || I;
    var U = I
      ? Z
        ? t.createElementNS(I, O, {
          is: Z,
        })
        : t.createElementNS(I, O)
      : Z
        ? t.createElement(O, {
          is: Z,
        })
        : t.createElement(O);
    h.dom = U;
    if (q != null) {
      zt(h, q, I);
    }
    N(m, U, E);
    if (!Y(h) && h.children != null) {
      var j = h.children;
      c(U, j, 0, j.length, g, null, I);
      if (h.tag === "select" && q != null) {
        Be(h, q);
      }
    }
  }
  function x(m, h) {
    var g;
    if (typeof m.tag.view == "function") {
      m.state = Object.create(m.tag);
      g = m.state.view;
      if (g.$$reentrantLock$$ != null) {
        return;
      }
      g.$$reentrantLock$$ = true;
    } else {
      m.state = undefined;
      g = m.tag;
      if (g.$$reentrantLock$$ != null) {
        return;
      }
      g.$$reentrantLock$$ = true;
      m.state =
        m.tag.prototype != null && typeof m.tag.prototype.view == "function"
          ? new m.tag(m)
          : m.tag(m);
    }
    yi(m.state, m, h);
    if (m.attrs != null) {
      yi(m.attrs, m, h);
    }
    m.instance = Zn.normalize(o.call(m.state.view, m));
    if (m.instance === m) {
      throw Error("A view cannot return the vnode it received as argument");
    }
    g.$$reentrantLock$$ = null;
  }
  function b(m, h, g, I, E) {
    x(h, g);
    if (h.instance != null) {
      a(m, h.instance, g, I, E);
      h.dom = h.instance.dom;
      h.domSize = h.dom != null ? h.instance.domSize : 0;
    } else {
      h.domSize = 0;
    }
  }
  function $(m, h, g, I, E, O) {
    if (!(h === g || (h == null && g == null))) {
      if (h == null || h.length === 0) {
        c(m, g, 0, g.length, I, E, O);
      } else if (g == null || g.length === 0) {
        K(m, h, 0, h.length);
      } else {
        var q = h[0] != null && h[0].key != null;
        var Z = g[0] != null && g[0].key != null;
        var U = 0;
        var j = 0;
        if (!q) {
          for (; j < h.length && h[j] == null;) {
            j++;
          }
        }
        if (!Z) {
          for (; U < g.length && g[U] == null;) {
            U++;
          }
        }
        if (q !== Z) {
          K(m, h, j, h.length);
          c(m, g, U, g.length, I, E, O);
        } else if (Z) {
          for (
            var Ce = h.length - 1, pe = g.length - 1, Bt, be, ue, Ie, re, ki;
            Ce >= j &&
            pe >= U &&
            ((Ie = h[Ce]), (re = g[pe]), Ie.key === re.key);
          ) {
            if (Ie !== re) {
              v(m, Ie, re, I, E, O);
            }
            if (re.dom != null) {
              E = re.dom;
            }
            Ce--;
            pe--;
          }
          for (
            ;
            Ce >= j && pe >= U && ((be = h[j]), (ue = g[U]), be.key === ue.key);
          ) {
            j++;
            U++;
            if (be !== ue) {
              v(m, be, ue, I, _(h, j, E), O);
            }
          }
          for (
            ;
            Ce >= j &&
            pe >= U &&
            !(U === pe || be.key !== re.key || Ie.key !== ue.key);
          ) {
            ki = _(h, j, E);
            D(m, Ie, ki);
            if (Ie !== ue) {
              v(m, Ie, ue, I, ki, O);
            }
            if (++U <= --pe) {
              D(m, be, E);
            }
            if (be !== re) {
              v(m, be, re, I, E, O);
            }
            if (re.dom != null) {
              E = re.dom;
            }
            j++;
            Ce--;
            Ie = h[Ce];
            re = g[pe];
            be = h[j];
            ue = g[U];
          }
          for (; Ce >= j && pe >= U && Ie.key === re.key;) {
            if (Ie !== re) {
              v(m, Ie, re, I, E, O);
            }
            if (re.dom != null) {
              E = re.dom;
            }
            Ce--;
            pe--;
            Ie = h[Ce];
            re = g[pe];
          }
          if (U > pe) {
            K(m, h, j, Ce + 1);
          } else if (j > Ce) {
            c(m, g, U, pe + 1, I, E, O);
          } else {
            var Mt = E;
            var xi = pe - U + 1;
            var gt = new Array(xi);
            var Ht = 0;
            var fe = 0;
            var Lt = 2147483647;
            var nt = 0;
            var Bt;
            var Ft;
            for (fe = 0; fe < xi; fe++) {
              gt[fe] = -1;
            }
            for (fe = pe; fe >= U; fe--) {
              if (Bt == null) {
                Bt = M(h, j, Ce + 1);
              }
              re = g[fe];
              var st = Bt[re.key];
              if (st != null) {
                Lt = st < Lt ? st : -1;
                gt[fe - U] = st;
                Ie = h[st];
                h[st] = null;
                if (Ie !== re) {
                  v(m, Ie, re, I, E, O);
                }
                if (re.dom != null) {
                  E = re.dom;
                }
                nt++;
              }
            }
            E = Mt;
            if (nt !== Ce - j + 1) {
              K(m, h, j, Ce + 1);
            }
            if (nt === 0) {
              c(m, g, U, pe + 1, I, E, O);
            } else if (Lt === -1) {
              Ft = F(gt);
              Ht = Ft.length - 1;
              fe = pe;
              Ft = F(gt);
              Ht = Ft.length - 1;
              fe = pe;
              for (; fe >= U; fe--) {
                ue = g[fe];
                if (gt[fe - U] === -1) {
                  a(m, ue, I, O, E);
                } else if (Ft[Ht] === fe - U) {
                  Ht--;
                } else {
                  D(m, ue, E);
                }
                if (ue.dom != null) {
                  E = g[fe].dom;
                }
              }
            } else {
              for (fe = pe; fe >= U; fe--) {
                ue = g[fe];
                if (gt[fe - U] === -1) {
                  a(m, ue, I, O, E);
                }
                if (ue.dom != null) {
                  E = g[fe].dom;
                }
              }
            }
          }
        } else {
          var vi = h.length < g.length ? h.length : g.length;
          for (U = U < j ? U : j; U < vi; U++) {
            be = h[U];
            ue = g[U];
            if (!(be === ue || (be == null && ue == null))) {
              if (be == null) {
                a(m, ue, I, O, _(h, U + 1, E));
              } else if (ue == null) {
                ie(m, be);
              } else {
                v(m, be, ue, I, _(h, U + 1, E), O);
              }
            }
          }
          if (h.length > vi) {
            K(m, h, U, h.length);
          }
          if (g.length > vi) {
            c(m, g, U, g.length, I, E, O);
          }
        }
      }
    }
  }
  function v(m, h, g, I, E, O) {
    var q = h.tag;
    var Z = g.tag;
    if (q === Z) {
      g.state = h.state;
      g.events = h.events;
      if (Ln(g, h)) {
        return;
      }
      if (typeof q == "string") {
        if (g.attrs != null) {
          wi(g.attrs, g, I);
        }
        switch (q) {
          case "#":
            S(h, g);
            break;
          case "<":
            R(m, h, g, O, E);
            break;
          case "[":
            G(m, h, g, I, E, O);
            break;
          default:
            X(h, g, I, O);
        }
      } else {
        W(m, h, g, I, E, O);
      }
    } else {
      ie(m, h);
      a(m, g, I, O, E);
    }
  }
  function S(m, h) {
    if (m.children.toString() !== h.children.toString()) {
      m.dom.nodeValue = h.children;
    }
    h.dom = m.dom;
  }
  function R(m, h, g, I, E) {
    if (h.children !== g.children) {
      ae(m, h);
      u(m, g, I, E);
    } else {
      g.dom = h.dom;
      g.domSize = h.domSize;
      g.instance = h.instance;
    }
  }
  function G(m, h, g, I, E, O) {
    $(m, h.children, g.children, I, E, O);
    var q = 0;
    var Z = g.children;
    g.dom = null;
    if (Z != null) {
      for (var U = 0; U < Z.length; U++) {
        var j = Z[U];
        if (j != null && j.dom != null) {
          if (g.dom == null) {
            g.dom = j.dom;
          }
          q += j.domSize || 1;
        }
      }
      if (q !== 1) {
        g.domSize = q;
      }
    }
  }
  function X(m, h, g, I) {
    var E = (h.dom = m.dom);
    I = s(h) || I;
    if (h.tag === "textarea" && h.attrs == null) {
      h.attrs = {};
    }
    pt(h, m.attrs, h.attrs, I);
    if (!Y(h)) {
      $(E, m.children, h.children, g, null, I);
    }
  }
  function W(m, h, g, I, E, O) {
    g.instance = Zn.normalize(o.call(g.state.view, g));
    if (g.instance === g) {
      throw Error("A view cannot return the vnode it received as argument");
    }
    wi(g.state, g, I);
    if (g.attrs != null) {
      wi(g.attrs, g, I);
    }
    if (g.instance != null) {
      if (h.instance == null) {
        a(m, g.instance, I, O, E);
      } else {
        v(m, h.instance, g.instance, I, E, O);
      }
      g.dom = g.instance.dom;
      g.domSize = g.instance.domSize;
    } else if (h.instance != null) {
      ie(m, h.instance);
      g.dom = undefined;
      g.domSize = 0;
    } else {
      g.dom = h.dom;
      g.domSize = h.domSize;
    }
  }
  function M(m, h, g) {
    for (var I = Object.create(null); h < g; h++) {
      var E = m[h];
      if (E != null) {
        var O = E.key;
        if (O != null) {
          I[O] = h;
        }
      }
    }
    return I;
  }
  var V = [];
  function F(m) {
    for (
      var h = [0], g = 0, I = 0, E = 0, O = (V.length = m.length), E = 0;
      E < O;
      E++
    ) {
      V[E] = m[E];
    }
    for (var E = 0; E < O; ++E) {
      if (m[E] !== -1) {
        var q = h[h.length - 1];
        if (m[q] < m[E]) {
          V[E] = q;
          h.push(E);
          continue;
        }
        g = 0;
        I = h.length - 1;
        for (; g < I;) {
          var Z = (g >>> 1) + (I >>> 1) + (g & I & 1);
          if (m[h[Z]] < m[E]) {
            g = Z + 1;
          } else {
            I = Z;
          }
        }
        if (m[E] < m[h[g]]) {
          if (g > 0) {
            V[E] = h[g - 1];
          }
          h[g] = E;
        }
      }
    }
    g = h.length;
    I = h[g - 1];
    for (; g-- > 0;) {
      h[g] = I;
      I = V[I];
    }
    V.length = 0;
    return h;
  }
  function _(m, h, g) {
    for (; h < m.length; h++) {
      if (m[h] != null && m[h].dom != null) {
        return m[h].dom;
      }
    }
    return g;
  }
  function D(m, h, g) {
    var I = t.createDocumentFragment();
    z(m, I, h);
    N(m, I, g);
  }
  function z(m, h, g) {
    for (; g.dom != null && g.dom.parentNode === m;) {
      if (typeof g.tag != "string") {
        g = g.instance;
        if (g != null) {
          continue;
        }
      } else if (g.tag === "<") {
        for (var I = 0; I < g.instance.length; I++) {
          h.appendChild(g.instance[I]);
        }
      } else if (g.tag !== "[") {
        h.appendChild(g.dom);
      } else if (g.children.length === 1) {
        g = g.children[0];
        if (g != null) {
          continue;
        }
      } else {
        for (var I = 0; I < g.children.length; I++) {
          var E = g.children[I];
          if (E != null) {
            z(m, h, E);
          }
        }
      }
      break;
    }
  }
  function N(m, h, g) {
    if (g != null) {
      m.insertBefore(h, g);
    } else {
      m.appendChild(h);
    }
  }
  function Y(m) {
    if (
      m.attrs == null ||
      (m.attrs.contenteditable == null && m.attrs.contentEditable == null)
    ) {
      return false;
    }
    var h = m.children;
    if (h != null && h.length === 1 && h[0].tag === "<") {
      var g = h[0].children;
      if (m.dom.innerHTML !== g) {
        m.dom.innerHTML = g;
      }
    } else if (h != null && h.length !== 0) {
      throw new Error("Child node of a contenteditable must be trusted.");
    }
    return true;
  }
  function K(m, h, g, I) {
    for (var E = g; E < I; E++) {
      var O = h[E];
      if (O != null) {
        ie(m, O);
      }
    }
  }
  function ie(m, h) {
    var g = 0;
    var I = h.state;
    var E;
    var O;
    if (
      typeof h.tag != "string" &&
      typeof h.state.onbeforeremove == "function"
    ) {
      var q = o.call(h.state.onbeforeremove, h);
      if (q != null && typeof q.then == "function") {
        g = 1;
        E = q;
      }
    }
    if (h.attrs && typeof h.attrs.onbeforeremove == "function") {
      var q = o.call(h.attrs.onbeforeremove, h);
      if (q != null && typeof q.then == "function") {
        g |= 2;
        O = q;
      }
    }
    r(h, I);
    if (!g) {
      Se(h);
      J(m, h);
    } else {
      if (E != null) {
        function Z() {
          if (g & 1) {
            g &= 2;
            if (!g) {
              U();
            }
          }
        }
        E.then(Z, Z);
      }
      if (O != null) {
        function Z() {
          if (g & 2) {
            g &= 1;
            if (!g) {
              U();
            }
          }
        }
        O.then(Z, Z);
      }
    }
    function U() {
      r(h, I);
      Se(h);
      J(m, h);
    }
  }
  function ae(m, h) {
    for (var g = 0; g < h.instance.length; g++) {
      m.removeChild(h.instance[g]);
    }
  }
  function J(m, h) {
    for (; h.dom != null && h.dom.parentNode === m;) {
      if (typeof h.tag != "string") {
        h = h.instance;
        if (h != null) {
          continue;
        }
      } else if (h.tag === "<") {
        ae(m, h);
      } else {
        if (
          h.tag !== "[" &&
          (m.removeChild(h.dom), !Array.isArray(h.children))
        ) {
          break;
        }
        if (h.children.length === 1) {
          h = h.children[0];
          if (h != null) {
            continue;
          }
        } else {
          for (var g = 0; g < h.children.length; g++) {
            var I = h.children[g];
            if (I != null) {
              J(m, I);
            }
          }
        }
      }
      break;
    }
  }
  function Se(m) {
    if (typeof m.tag != "string" && typeof m.state.onremove == "function") {
      o.call(m.state.onremove, m);
    }
    if (m.attrs && typeof m.attrs.onremove == "function") {
      o.call(m.attrs.onremove, m);
    }
    if (typeof m.tag != "string") {
      if (m.instance != null) {
        Se(m.instance);
      }
    } else {
      var h = m.children;
      if (Array.isArray(h)) {
        for (var g = 0; g < h.length; g++) {
          var I = h[g];
          if (I != null) {
            Se(I);
          }
        }
      }
    }
  }
  function zt(m, h, g) {
    if (m.tag === "input" && h.type != null) {
      m.dom.setAttribute("type", h.type);
    }
    var I = h != null && m.tag === "input" && h.type === "file";
    for (var E in h) {
      Ve(m, E, null, h[E], g, I);
    }
  }
  function Ve(m, h, g, I, E, O) {
    if (
      !(
        h === "key" ||
        h === "is" ||
        I == null ||
        mt(h) ||
        (g === I && !ne(m, h) && typeof I != "object") ||
        (h === "type" && m.tag === "input")
      )
    ) {
      if (h[0] === "o" && h[1] === "n") {
        return gi(m, h, I);
      }
      if (h.slice(0, 6) === "xlink:") {
        m.dom.setAttributeNS("http://www.w3.org/1999/xlink", h.slice(6), I);
      } else if (h === "style") {
        pi(m.dom, g, I);
      } else if (Ne(m, h, E)) {
        if (h === "value") {
          if (
            ((m.tag === "input" || m.tag === "textarea") &&
              m.dom.value === "" + I &&
              (O || m.dom === l())) ||
            (m.tag === "select" && g !== null && m.dom.value === "" + I) ||
            (m.tag === "option" && g !== null && m.dom.value === "" + I)
          ) {
            return;
          }
          if (O && "" + I != "") {
            console.error("`value` is read-only on file inputs!");
            return;
          }
        }
        m.dom[h] = I;
      } else if (typeof I == "boolean") {
        if (I) {
          m.dom.setAttribute(h, "");
        } else {
          m.dom.removeAttribute(h);
        }
      } else {
        m.dom.setAttribute(h === "className" ? "class" : h, I);
      }
    }
  }
  function te(m, h, g, I) {
    if (!(h === "key" || h === "is" || g == null || mt(h))) {
      if (h[0] === "o" && h[1] === "n") {
        gi(m, h, undefined);
      } else if (h === "style") {
        pi(m.dom, g, null);
      } else if (
        Ne(m, h, I) &&
        h !== "className" &&
        h !== "title" &&
        !(
          h === "value" &&
          (m.tag === "option" ||
            (m.tag === "select" && m.dom.selectedIndex === -1 && m.dom === l()))
        ) &&
        !(m.tag === "input" && h === "type")
      ) {
        m.dom[h] = null;
      } else {
        var E = h.indexOf(":");
        if (E !== -1) {
          h = h.slice(E + 1);
        }
        if (g !== false) {
          m.dom.removeAttribute(h === "className" ? "class" : h);
        }
      }
    }
  }
  function Be(m, h) {
    if ("value" in h) {
      if (h.value === null) {
        if (m.dom.selectedIndex !== -1) {
          m.dom.value = null;
        }
      } else {
        var g = "" + h.value;
        if (m.dom.value !== g || m.dom.selectedIndex === -1) {
          m.dom.value = g;
        }
      }
    }
    if ("selectedIndex" in h) {
      Ve(m, "selectedIndex", null, h.selectedIndex, undefined);
    }
  }
  function pt(m, h, g, I) {
    if (h && h === g) {
      console.warn(
        "Don't reuse attrs object, use new object for every redraw, this will throw in next major",
      );
    }
    if (g != null) {
      if (m.tag === "input" && g.type != null) {
        m.dom.setAttribute("type", g.type);
      }
      var E = m.tag === "input" && g.type === "file";
      for (var O in g) {
        Ve(m, O, h && h[O], g[O], I, E);
      }
    }
    var q;
    if (h != null) {
      for (var O in h) {
        if ((q = h[O]) != null && (g == null || g[O] == null)) {
          te(m, O, q, I);
        }
      }
    }
  }
  function ne(m, h) {
    return (
      h === "value" ||
      h === "checked" ||
      h === "selectedIndex" ||
      (h === "selected" && m.dom === l()) ||
      (m.tag === "option" && m.dom.parentNode === t.activeElement)
    );
  }
  function mt(m) {
    return (
      m === "oninit" ||
      m === "oncreate" ||
      m === "onupdate" ||
      m === "onremove" ||
      m === "onbeforeremove" ||
      m === "onbeforeupdate"
    );
  }
  function Ne(m, h, g) {
    return (
      g === undefined &&
      (m.tag.indexOf("-") > -1 ||
        (m.attrs != null && m.attrs.is) ||
        (h !== "href" &&
          h !== "list" &&
          h !== "form" &&
          h !== "width" &&
          h !== "height")) &&
      h in m.dom
    );
  }
  var it = /[A-Z]/g;
  function Ze(m) {
    return "-" + m.toLowerCase();
  }
  function se(m) {
    if (m[0] === "-" && m[1] === "-") {
      return m;
    } else if (m === "cssFloat") {
      return "float";
    } else {
      return m.replace(it, Ze);
    }
  }
  function pi(m, h, g) {
    if (h !== g) {
      if (g == null) {
        m.style.cssText = "";
      } else if (typeof g != "object") {
        m.style.cssText = g;
      } else if (h == null || typeof h != "object") {
        m.style.cssText = "";
        for (var I in g) {
          var E = g[I];
          if (E != null) {
            m.style.setProperty(se(I), String(E));
          }
        }
      } else {
        for (var I in g) {
          var E = g[I];
          if (E != null && (E = String(E)) !== String(h[I])) {
            m.style.setProperty(se(I), E);
          }
        }
        for (var I in h) {
          if (h[I] != null && g[I] == null) {
            m.style.removeProperty(se(I));
          }
        }
      }
    }
  }
  function mi() {
    this._ = i;
  }
  mi.prototype = Object.create(null);
  mi.prototype.handleEvent = function (m) {
    var h = this["on" + m.type];
    var g;
    if (typeof h == "function") {
      g = h.call(m.currentTarget, m);
    } else if (typeof h.handleEvent == "function") {
      h.handleEvent(m);
    }
    if (this._ && m.redraw !== false) {
      (0, this._)();
    }
    if (g === false) {
      m.preventDefault();
      m.stopPropagation();
    }
  };
  function gi(m, h, g) {
    if (m.events != null) {
      m.events._ = i;
      if (m.events[h] === g) {
        return;
      }
      if (g != null && (typeof g == "function" || typeof g == "object")) {
        if (m.events[h] == null) {
          m.dom.addEventListener(h.slice(2), m.events, false);
        }
        m.events[h] = g;
      } else {
        if (m.events[h] != null) {
          m.dom.removeEventListener(h.slice(2), m.events, false);
        }
        m.events[h] = undefined;
      }
    } else if (g != null && (typeof g == "function" || typeof g == "object")) {
      m.events = new mi();
      m.dom.addEventListener(h.slice(2), m.events, false);
      m.events[h] = g;
    }
  }
  function yi(m, h, g) {
    if (typeof m.oninit == "function") {
      o.call(m.oninit, h);
    }
    if (typeof m.oncreate == "function") {
      g.push(o.bind(m.oncreate, h));
    }
  }
  function wi(m, h, g) {
    if (typeof m.onupdate == "function") {
      g.push(o.bind(m.onupdate, h));
    }
  }
  function Ln(m, h) {
    do {
      if (m.attrs != null && typeof m.attrs.onbeforeupdate == "function") {
        var g = o.call(m.attrs.onbeforeupdate, m, h);
        if (g !== undefined && !g) {
          break;
        }
      }
      if (
        typeof m.tag != "string" &&
        typeof m.state.onbeforeupdate == "function"
      ) {
        var g = o.call(m.state.onbeforeupdate, m, h);
        if (g !== undefined && !g) {
          break;
        }
      }
      return false;
    } while (false);
    m.dom = h.dom;
    m.domSize = h.domSize;
    m.instance = h.instance;
    m.attrs = h.attrs;
    m.children = h.children;
    m.text = h.text;
    return true;
  }
  var Tt;
  return function (m, h, g) {
    if (!m) {
      throw new TypeError("DOM element being rendered to does not exist.");
    }
    if (Tt != null && m.contains(Tt)) {
      throw new TypeError(
        "Node is currently being rendered to and thus is locked.",
      );
    }
    var I = i;
    var E = Tt;
    var O = [];
    var q = l();
    var Z = m.namespaceURI;
    Tt = m;
    i = typeof g == "function" ? g : undefined;
    try {
      if (m.vnodes == null) {
        m.textContent = "";
      }
      h = Zn.normalizeChildren(Array.isArray(h) ? h : [h]);
      $(
        m,
        m.vnodes,
        h,
        O,
        null,
        Z === "http://www.w3.org/1999/xhtml" ? undefined : Z,
      );
      m.vnodes = h;
      if (q != null && l() !== q && typeof q.focus == "function") {
        q.focus();
      }
      for (var U = 0; U < O.length; U++) {
        O[U]();
      }
    } finally {
      i = I;
      Tt = E;
    }
  };
}
var ra = mu(typeof window !== "undefined" ? window : null);
var $r = It();
function gu(e, t, i) {
  var n = [];
  var s = false;
  var r = -1;
  function o() {
    for (r = 0; r < n.length; r += 2) {
      try {
        e(n[r], $r(n[r + 1]), l);
      } catch (a) {
        i.error(a);
      }
    }
    r = -1;
  }
  function l() {
    if (!s) {
      s = true;
      t(function () {
        s = false;
        o();
      });
    }
  }
  l.sync = o;
  function c(a, f) {
    if (f != null && f.view == null && typeof f != "function") {
      throw new TypeError("m.mount expects a component, not a vnode.");
    }
    var d = n.indexOf(a);
    if (d >= 0) {
      n.splice(d, 2);
      if (d <= r) {
        r -= 2;
      }
      e(a, []);
    }
    if (f != null) {
      n.push(a, f);
      e(a, $r(f), l);
    }
  }
  return {
    mount: c,
    redraw: l,
  };
}
var yu = ra;
var Qs = gu(
  yu,
  typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null,
  typeof console !== "undefined" ? console : null,
);
var Jn;
var Rr;
function oa() {
  if (!Rr) {
    Rr = 1;
    Jn = function (e) {
      if (Object.prototype.toString.call(e) !== "[object Object]") {
        return "";
      }
      var t = [];
      for (var i in e) {
        n(i, e[i]);
      }
      return t.join("&");
      function n(s, r) {
        if (Array.isArray(r)) {
          for (var o = 0; o < r.length; o++) {
            n(s + "[" + o + "]", r[o]);
          }
        } else if (Object.prototype.toString.call(r) === "[object Object]") {
          for (var o in r) {
            n(s + "[" + o + "]", r[o]);
          }
        } else {
          t.push(
            encodeURIComponent(s) +
            (r != null && r !== "" ? "=" + encodeURIComponent(r) : ""),
          );
        }
      }
    };
  }
  return Jn;
}
var Qn;
var Ar;
function aa() {
  if (Ar) {
    return Qn;
  }
  Ar = 1;
  var e = Dn;
  Qn =
    Object.assign ||
    function (t, i) {
      for (var n in i) {
        if (e.call(i, n)) {
          t[n] = i[n];
        }
      }
    };
  return Qn;
}
var jn;
var Dr;
function js() {
  if (Dr) {
    return jn;
  }
  Dr = 1;
  var e = oa();
  var t = aa();
  jn = function (i, n) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(i)) {
      throw new SyntaxError(
        "Template parameter names must be separated by either a '/', '-', or '.'.",
      );
    }
    if (n == null) {
      return i;
    }
    var s = i.indexOf("?");
    var r = i.indexOf("#");
    var o = r < 0 ? i.length : r;
    var l = s < 0 ? o : s;
    var c = i.slice(0, l);
    var a = {};
    t(a, n);
    var f = c.replace(/:([^\/\.-]+)(\.{3})?/g, function ($, v, S) {
      delete a[v];
      if (n[v] == null) {
        return $;
      } else if (S) {
        return n[v];
      } else {
        return encodeURIComponent(String(n[v]));
      }
    });
    var d = f.indexOf("?");
    var u = f.indexOf("#");
    var p = u < 0 ? f.length : u;
    var w = d < 0 ? p : d;
    var x = f.slice(0, w);
    if (s >= 0) {
      x += i.slice(s, o);
    }
    if (d >= 0) {
      x += (s < 0 ? "?" : "&") + f.slice(d, p);
    }
    var b = e(a);
    if (b) {
      x += (s < 0 && d < 0 ? "?" : "&") + b;
    }
    if (r >= 0) {
      x += i.slice(r);
    }
    if (u >= 0) {
      x += (r < 0 ? "" : "&") + f.slice(u);
    }
    return x;
  };
  return jn;
}
var wu = js();
var Or = Dn;
function vu(e, t, i) {
  var n = 0;
  function s(l) {
    return new t(l);
  }
  s.prototype = t.prototype;
  s.__proto__ = t;
  function r(l) {
    return function (c, a) {
      if (typeof c != "string") {
        a = c;
        c = c.url;
      } else if (a == null) {
        a = {};
      }
      var f = new t(function (w, x) {
        l(
          wu(c, a.params),
          a,
          function (b) {
            if (typeof a.type == "function") {
              if (Array.isArray(b)) {
                for (var $ = 0; $ < b.length; $++) {
                  b[$] = new a.type(b[$]);
                }
              } else {
                b = new a.type(b);
              }
            }
            w(b);
          },
          x,
        );
      });
      if (a.background === true) {
        return f;
      }
      var d = 0;
      function u() {
        if (--d === 0 && typeof i == "function") {
          i();
        }
      }
      return p(f);
      function p(w) {
        var x = w.then;
        w.constructor = s;
        w.then = function () {
          d++;
          var b = x.apply(w, arguments);
          b.then(u, function ($) {
            u();
            if (d === 0) {
              throw $;
            }
          });
          return p(b);
        };
        return w;
      }
    };
  }
  function o(l, c) {
    for (var a in l.headers) {
      if (Or.call(l.headers, a) && a.toLowerCase() === c) {
        return true;
      }
    }
    return false;
  }
  return {
    request: r(function (l, c, a, f) {
      var d = c.method != null ? c.method.toUpperCase() : "GET";
      var u = c.body;
      var p =
        (c.serialize == null || c.serialize === JSON.serialize) &&
        !(u instanceof e.FormData || u instanceof e.URLSearchParams);
      var w = c.responseType || (typeof c.extract == "function" ? "" : "json");
      var x = new e.XMLHttpRequest();
      var b = false;
      var $ = false;
      var v = x;
      var S;
      var R = x.abort;
      x.abort = function () {
        b = true;
        R.call(this);
      };
      x.open(
        d,
        l,
        c.async !== false,
        typeof c.user == "string" ? c.user : undefined,
        typeof c.password == "string" ? c.password : undefined,
      );
      if (p && u != null && !o(c, "content-type")) {
        x.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      }
      if (typeof c.deserialize != "function" && !o(c, "accept")) {
        x.setRequestHeader("Accept", "application/json, text/*");
      }
      if (c.withCredentials) {
        x.withCredentials = c.withCredentials;
      }
      if (c.timeout) {
        x.timeout = c.timeout;
      }
      x.responseType = w;
      for (var G in c.headers) {
        if (Or.call(c.headers, G)) {
          x.setRequestHeader(G, c.headers[G]);
        }
      }
      x.onreadystatechange = function (X) {
        if (!b && X.target.readyState === 4) {
          try {
            var W =
              (X.target.status >= 200 && X.target.status < 300) ||
              X.target.status === 304 ||
              /^file:\/\//i.test(l);
            var M = X.target.response;
            var V;
            if (w === "json") {
              if (!X.target.responseType && typeof c.extract != "function") {
                try {
                  M = JSON.parse(X.target.responseText);
                } catch {
                  M = null;
                }
              }
            } else if ((!w || w === "text") && M == null) {
              M = X.target.responseText;
            }
            if (typeof c.extract == "function") {
              M = c.extract(X.target, c);
              W = true;
            } else if (typeof c.deserialize == "function") {
              M = c.deserialize(M);
            }
            if (W) {
              a(M);
            } else {
              function F() {
                try {
                  V = X.target.responseText;
                } catch {
                  V = M;
                }
                var _ = new Error(V);
                _.code = X.target.status;
                _.response = M;
                f(_);
              }
              if (x.status === 0) {
                // TOLOOK
                setTimeout(function () {
                  if (!$) {
                    F();
                  }
                });
              } else {
                F();
              }
            }
          } catch (_) {
            f(_);
          }
        }
      };
      x.ontimeout = function (X) {
        $ = true;
        var W = new Error("Request timed out");
        W.code = X.target.status;
        f(W);
      };
      if (typeof c.config == "function") {
        x = c.config(x, c, l) || x;
        if (x !== v) {
          S = x.abort;
          x.abort = function () {
            b = true;
            S.call(this);
          };
        }
      }
      if (u == null) {
        x.send();
      } else if (typeof c.serialize == "function") {
        x.send(c.serialize(u));
      } else if (u instanceof e.FormData || u instanceof e.URLSearchParams) {
        x.send(u);
      } else {
        x.send(JSON.stringify(u));
      }
    }),
    jsonp: r(function (l, c, a, f) {
      var d =
        c.callbackName ||
        "_mithril_" + Math.round(Math.random() * 10000000000000000) + "_" + n++;
      var u = e.document.createElement("script");
      e[d] = function (p) {
        delete e[d];
        u.parentNode.removeChild(u);
        a(p);
      };
      u.onerror = function () {
        delete e[d];
        u.parentNode.removeChild(u);
        f(new Error("JSONP request failed"));
      };
      u.src =
        l +
        (l.indexOf("?") < 0 ? "?" : "&") +
        encodeURIComponent(c.callbackKey || "callback") +
        "=" +
        encodeURIComponent(d);
      e.document.documentElement.appendChild(u);
    }),
  };
}
var ku = sa;
var xu = Qs;
var bu = vu(typeof window !== "undefined" ? window : null, ku, xu.redraw);
var es;
var _r;
function la() {
  if (_r) {
    return es;
  }
  _r = 1;
  function e(t) {
    try {
      return decodeURIComponent(t);
    } catch {
      return t;
    }
  }
  es = function (t) {
    if (t === "" || t == null) {
      return {};
    }
    if (t.charAt(0) === "?") {
      t = t.slice(1);
    }
    for (var i = t.split("&"), n = {}, s = {}, r = 0; r < i.length; r++) {
      var o = i[r].split("=");
      var l = e(o[0]);
      var c = o.length === 2 ? e(o[1]) : "";
      if (c === "true") {
        c = true;
      } else if (c === "false") {
        c = false;
      }
      var a = l.split(/\]\[?|\[/);
      var f = s;
      if (l.indexOf("[") > -1) {
        a.pop();
      }
      for (var d = 0; d < a.length; d++) {
        var u = a[d];
        var p = a[d + 1];
        var w = p == "" || !isNaN(parseInt(p, 10));
        if (u === "") {
          var l = a.slice(0, d).join();
          if (n[l] == null) {
            n[l] = Array.isArray(f) ? f.length : 0;
          }
          u = n[l]++;
        } else if (u === "__proto__") {
          break;
        }
        if (d === a.length - 1) {
          f[u] = c;
        } else {
          var x = Object.getOwnPropertyDescriptor(f, u);
          if (x != null) {
            x = x.value;
          }
          if (x == null) {
            f[u] = x = w ? [] : {};
          }
          f = x;
        }
      }
    }
    return s;
  };
  return es;
}
var ts;
var zr;
function er() {
  if (zr) {
    return ts;
  }
  zr = 1;
  var e = la();
  ts = function (t) {
    var i = t.indexOf("?");
    var n = t.indexOf("#");
    var s = n < 0 ? t.length : n;
    var r = i < 0 ? s : i;
    var o = t.slice(0, r).replace(/\/{2,}/g, "/");
    if (o) {
      if (o[0] !== "/") {
        o = "/" + o;
      }
      if (o.length > 1 && o[o.length - 1] === "/") {
        o = o.slice(0, -1);
      }
    } else {
      o = "/";
    }
    return {
      path: o,
      params: i < 0 ? {} : e(t.slice(i + 1, s)),
    };
  };
  return ts;
}
var is;
var Br;
function Su() {
  if (Br) {
    return is;
  }
  Br = 1;
  var e = er();
  is = function (t) {
    var i = e(t);
    var n = Object.keys(i.params);
    var s = [];
    var r = new RegExp(
      "^" +
      i.path.replace(
        /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
        function (o, l, c) {
          if (l == null) {
            return "\\" + o;
          } else {
            s.push({
              k: l,
              r: c === "...",
            });
            if (c === "...") {
              return "(.*)";
            } else if (c === ".") {
              return "([^/]+)\\.";
            } else {
              return "([^/]+)" + (c || "");
            }
          }
        },
      ) +
      "$",
    );
    return function (o) {
      for (var l = 0; l < n.length; l++) {
        if (i.params[n[l]] !== o.params[n[l]]) {
          return false;
        }
      }
      if (!s.length) {
        return r.test(o.path);
      }
      var c = r.exec(o.path);
      if (c == null) {
        return false;
      }
      for (var l = 0; l < s.length; l++) {
        o.params[s[l].k] = s[l].r ? c[l + 1] : decodeURIComponent(c[l + 1]);
      }
      return true;
    };
  };
  return is;
}
var ns;
var Hr;
function ca() {
  if (Hr) {
    return ns;
  }
  Hr = 1;
  var e = Dn;
  var t = new RegExp(
    "^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$",
  );
  ns = function (i, n) {
    var s = {};
    if (n != null) {
      for (var r in i) {
        if (e.call(i, r) && !t.test(r) && n.indexOf(r) < 0) {
          s[r] = i[r];
        }
      }
    } else {
      for (var r in i) {
        if (e.call(i, r) && !t.test(r)) {
          s[r] = i[r];
        }
      }
    }
    return s;
  };
  return ns;
}
var ss;
var Lr;
function Iu() {
  if (Lr) {
    return ss;
  }
  Lr = 1;
  var e = It();
  var t = ia;
  var i = sa;
  var n = js();
  var s = er();
  var r = Su();
  var o = aa();
  var l = ca();
  var c = {};
  function a(f) {
    try {
      return decodeURIComponent(f);
    } catch {
      return f;
    }
  }
  ss = function (f, d) {
    var u =
      f == null
        ? null
        : typeof f.setImmediate == "function"
          ? f.setImmediate
          : f.setTimeout;
    var p = i.resolve();
    var w = false;
    var x = false;
    var b = 0;
    var $;
    var v;
    var S = c;
    var R;
    var G;
    var X;
    var W;
    var M = {
      onbeforeupdate: function () {
        b = b ? 2 : 1;
        return !(!b || c === S);
      },
      onremove: function () {
        f.removeEventListener("popstate", _, false);
        f.removeEventListener("hashchange", F, false);
      },
      view: function () {
        if (!(!b || c === S)) {
          var N = [e(R, G.key, G)];
          if (S) {
            N = S.render(N[0]);
          }
          return N;
        }
      },
    };
    var V = (z.SKIP = {});
    function F() {
      w = false;
      var N = f.location.hash;
      if (z.prefix[0] !== "#") {
        N = f.location.search + N;
        if (z.prefix[0] !== "?") {
          N = f.location.pathname + N;
          if (N[0] !== "/") {
            N = "/" + N;
          }
        }
      }
      var Y = N.concat()
        .replace(/(?:%[a-f89][a-f0-9])+/gim, a)
        .slice(z.prefix.length);
      var K = s(Y);
      o(K.params, f.history.state);
      function ie(J) {
        console.error(J);
        D(v, null, {
          replace: true,
        });
      }
      ae(0);
      function ae(J) {
        for (; J < $.length; J++) {
          if ($[J].check(K)) {
            var Se = $[J].component;
            var zt = $[J].route;
            var Ve = Se;
            var te = (W = function (Be) {
              if (te === W) {
                if (Be === V) {
                  return ae(J + 1);
                }
                R =
                  Be != null &&
                    (typeof Be.view == "function" || typeof Be == "function")
                    ? Be
                    : "div";
                G = K.params;
                X = Y;
                W = null;
                S = Se.render ? Se : null;
                if (b === 2) {
                  d.redraw();
                } else {
                  b = 2;
                  d.redraw.sync();
                }
              }
            });
            if (Se.view || typeof Se == "function") {
              Se = {};
              te(Ve);
            } else if (Se.onmatch) {
              p.then(function () {
                return Se.onmatch(K.params, Y, zt);
              }).then(te, Y === v ? null : ie);
            } else {
              te("div");
            }
            return;
          }
        }
        if (Y === v) {
          throw new Error("Could not resolve default route " + v + ".");
        }
        D(v, null, {
          replace: true,
        });
      }
    }
    function _() {
      if (!w) {
        w = true;
        u(F);
      }
    }
    function D(N, Y, K) {
      N = n(N, Y);
      if (x) {
        _();
        var ie = K ? K.state : null;
        var ae = K ? K.title : null;
        if (K && K.replace) {
          f.history.replaceState(ie, ae, z.prefix + N);
        } else {
          f.history.pushState(ie, ae, z.prefix + N);
        }
      } else {
        f.location.href = z.prefix + N;
      }
    }
    function z(N, Y, K) {
      if (!N) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      $ = Object.keys(K).map(function (ae) {
        if (ae[0] !== "/") {
          throw new SyntaxError("Routes must start with a '/'.");
        }
        if (/:([^\/\.-]+)(\.{3})?:/.test(ae)) {
          throw new SyntaxError(
            "Route parameter names must be separated with either '/', '.', or '-'.",
          );
        }
        return {
          route: ae,
          component: K[ae],
          check: r(ae),
        };
      });
      v = Y;
      if (Y != null) {
        var ie = s(Y);
        if (
          !$.some(function (ae) {
            return ae.check(ie);
          })
        ) {
          throw new ReferenceError(
            "Default route doesn't match any known routes.",
          );
        }
      }
      if (typeof f.history.pushState == "function") {
        f.addEventListener("popstate", _, false);
      } else if (z.prefix[0] === "#") {
        f.addEventListener("hashchange", F, false);
      }
      x = true;
      d.mount(N, M);
      F();
    }
    z.set = function (N, Y, K) {
      if (W != null) {
        K = K || {};
        K.replace = true;
      }
      W = null;
      D(N, Y, K);
    };
    z.get = function () {
      return X;
    };
    z.prefix = "#!";
    z.Link = {
      view: function (N) {
        var Y = t(
          N.attrs.selector || "a",
          l(N.attrs, ["options", "params", "selector", "onclick"]),
          N.children,
        );
        var K;
        var ie;
        var ae;
        if ((Y.attrs.disabled = !!Y.attrs.disabled)) {
          Y.attrs.href = null;
          Y.attrs["aria-disabled"] = "true";
        } else {
          K = N.attrs.options;
          ie = N.attrs.onclick;
          ae = n(Y.attrs.href, N.attrs.params);
          Y.attrs.href = z.prefix + ae;
          Y.attrs.onclick = function (J) {
            var Se;
            if (typeof ie == "function") {
              Se = ie.call(J.currentTarget, J);
            } else if (!(ie == null || typeof ie != "object")) {
              if (typeof ie.handleEvent == "function") {
                ie.handleEvent(J);
              }
            }
            if (
              Se !== false &&
              !J.defaultPrevented &&
              (J.button === 0 || J.which === 0 || J.which === 1) &&
              (!J.currentTarget.target || J.currentTarget.target === "_self") &&
              !J.ctrlKey &&
              !J.metaKey &&
              !J.shiftKey &&
              !J.altKey
            ) {
              J.preventDefault();
              J.redraw = false;
              z.set(ae, null, K);
            }
          };
        }
        return Y;
      },
    };
    z.param = function (N) {
      if (G && N != null) {
        return G[N];
      } else {
        return G;
      }
    };
    return z;
  };
  return ss;
}
var rs;
var Fr;
function Tu() {
  if (Fr) {
    return rs;
  }
  Fr = 1;
  var e = Qs;
  rs = Iu()(typeof window !== "undefined" ? window : null, e);
  return rs;
}
var On = pu;
var ha = bu;
var ua = Qs;
function Ae() {
  return On.apply(this, arguments);
}
Ae.m = On;
Ae.trust = On.trust;
Ae.fragment = On.fragment;
Ae.Fragment = "[";
Ae.mount = ua.mount;
Ae.route = Tu();
Ae.render = ra;
Ae.redraw = ua.redraw;
Ae.request = ha.request;
Ae.jsonp = ha.jsonp;
Ae.parseQueryString = la();
Ae.buildQueryString = oa();
Ae.parsePathname = er();
Ae.buildPathname = js();
Ae.vnode = It();
Ae.PromisePolyfill = na();
Ae.censor = ca();
var Mu = Ae;
const kt = An(Mu);
function VultrClient(e, t, i, n, s) {
  this.debugLog = false;
  this.baseUrl = e;
  this.lobbySize = i;
  this.devPort = t;
  this.lobbySpread = n;
  this.rawIPs = !!s;
  this.server = undefined;
  this.gameIndex = undefined;
  this.callback = undefined;
  this.errorCallback = undefined;
}
VultrClient.prototype.regionInfo = {
  0: {
    name: "Local",
    latitude: 0,
    longitude: 0,
  },
  "us-east": {
    name: "Miami",
    latitude: 40.1393329,
    longitude: -75.8521818,
  },
  miami: {
    name: "Miami",
    latitude: 40.1393329,
    longitude: -75.8521818,
  },
  "us-west": {
    name: "Silicon Valley",
    latitude: 47.6149942,
    longitude: -122.4759879,
  },
  siliconvalley: {
    name: "Silicon Valley",
    latitude: 47.6149942,
    longitude: -122.4759879,
  },
  gb: {
    name: "London",
    latitude: 51.5283063,
    longitude: -0.382486,
  },
  london: {
    name: "London",
    latitude: 51.5283063,
    longitude: -0.382486,
  },
  "eu-west": {
    name: "Frankfurt",
    latitude: 50.1211273,
    longitude: 8.496137,
  },
  frankfurt: {
    name: "Frankfurt",
    latitude: 50.1211273,
    longitude: 8.496137,
  },
  au: {
    name: "Sydney",
    latitude: -33.8479715,
    longitude: 150.651084,
  },
  sydney: {
    name: "Sydney",
    latitude: -33.8479715,
    longitude: 150.651084,
  },
  saopaulo: {
    name: "SÃ£o Paulo",
    latitude: 23.5558,
    longitude: 46.6396,
  },
  sg: {
    name: "Singapore",
    latitude: 1.3147268,
    longitude: 103.7065876,
  },
  singapore: {
    name: "Singapore",
    latitude: 1.3147268,
    longitude: 103.7065876,
  },
};
VultrClient.prototype.start = function (e, t, i, n) {
  this.callback = t;
  this.errorCallback = i;
  if (n) {
    return t();
  }
  const s = this.parseServerQuery(e);
  if (s && s.length > 0) {
    this.log("Found server in query.");
    this.password = s[3];
    this.connect(s[0], s[1], s[2]);
  } else {
    this.errorCallback("Unable to find server");
  }
};
VultrClient.prototype.parseServerQuery = function (e) {
  const t = new URLSearchParams(location.search, true);
  const i = e || t.get("server");
  if (typeof i != "string") {
    return [];
  }
  const [n, s] = i.split(":");
  return [n, s, t.get("password")];
};

VultrClient.prototype.findServer = function (e, t) {
  var i = this.servers[e];
  for (let n = 0; n < i.length; n++) {
    const s = i[n];
    if (s.name === t) {
      return s;
    }
  }
  console.warn(
    "Could not find server in region " + e + " with serverName " + t + ".",
  );
};
VultrClient.prototype.seekServer = function (e, t, i) {
  if (i == null) {
    i = "random";
  }
  if (t == null) {
    t = false;
  }
  const n = ["random"];
  const s = this.lobbySize;
  const r = this.lobbySpread;
  const o = this.servers[e]
    .flatMap(function (u) {
      let p = 0;
      return u.games.map(function (w) {
        const x = p++;
        return {
          region: u.region,
          index: u.index * u.games.length + x,
          gameIndex: x,
          gameCount: u.games.length,
          playerCount: w.playerCount,
          playerCapacity: w.playerCapacity,
          isPrivate: w.isPrivate,
        };
      });
    })
    .filter(function (u) {
      return !u.isPrivate;
    })
    .filter(function (u) {
      if (t) {
        return u.playerCount == 0 && u.gameIndex >= u.gameCount / 2;
      } else {
        return true;
      }
    })
    .filter(function (u) {
      if (i == "random") {
        return true;
      } else {
        return n[u.index % n.length].key == i;
      }
    })
    .sort(function (u, p) {
      return p.playerCount - u.playerCount;
    })
    .filter(function (u) {
      return u.playerCount < s;
    });
  if (t) {
    o.reverse();
  }
  if (o.length == 0) {
    this.errorCallback("No open servers.");
    return;
  }
  const l = Math.min(r, o.length);
  var f = Math.floor(Math.random() * l);
  f = Math.min(f, o.length - 1);
  const c = o[f];
  const a = c.region;
  var f = Math.floor(c.index / c.gameCount);
  const d = c.index % c.gameCount;
  this.log("Found server.");
  return [a, f, d];
};
VultrClient.prototype.connect = function (e, t, i) {
  //if (e !== "sg" && e !== "singapore") {
  //  this.errorCallback("Region not allowed");
  //  return;
  //}
  if (this.connected) {
    return;
  }
  const n = this.findServer(e, t);
  if (n == null) {
    this.errorCallback(
      "Failed to find server for region " + e + " and serverName " + t,
    );
    return;
  }
  this.log("Connecting to server", n, "with game index", i);
  if (n.playerCount >= n.playerCapacity) {
    this.errorCallback("Server is already full.");
    return;
  }
  window.history.replaceState(
    document.title,
    document.title,
    this.generateHref(e, t, this.password),
  );
  this.server = n;
  this.gameIndex = i;
  this.log(
    "Calling callback with address",
    this.serverAddress(n),
    "on port",
    this.serverPort(n),
  );
  this.callback(this.serverAddress(n), this.serverPort(n), i);
  if (_i) {
    clearInterval(_i);
  }
};
VultrClient.prototype.switchServer = function (e, t) {
  this.switchingServers = true;
  window.location = this.generateHref(e, t, null);
};
VultrClient.prototype.generateHref = function (e, t, i) {
  let n = window.location.href.split("?")[0];
  n += "?server=" + e + ":" + t;
  if (i) {
    n += "&password=" + encodeURIComponent(i);
  }
  return n;
};
VultrClient.prototype.serverAddress = function (e) {
  if (e.region == 0) {
    return "localhost";
  } else {
    return e.key + "." + e.region + "." + this.baseUrl;
  }
};
VultrClient.prototype.serverPort = function (e) {
  return e.port;
};
let _i;
function Eu(e) {
  e = e.filter((s) => s.playerCount !== s.playerCapacity);
  const t = Math.min(...e.map((s) => s.ping || Infinity));
  const i = e.filter((s) => s.ping === t);
  if (!i.length > 0) {
    return null;
  } else {
    return i.reduce((s, r) => (s.playerCount > r.playerCount ? s : r));
  }
}
VultrClient.prototype.processServers = function (e) {
  if (_i) {
    clearInterval(_i);
  }
  return new Promise((t) => {
    const i = {};
    const n = (c) => {
      const a = i[c];
      const f = a[0];
      let d = this.serverAddress(f);
      const u = this.serverPort(f);
      if (u) {
        d += `:${u}`;
      }
      const p = `https://${d}/ping`;
      const w = new Date().getTime();
      return Promise.race([
        fetch(p)
          .then(() => {
            const x = new Date().getTime() - w;
            a.forEach((b) => {
              b.pings = b.pings ?? [];
              b.pings.push(x);
              if (b.pings.length > 10) {
                b.pings.shift();
              }
              b.ping = Math.floor(
                b.pings.reduce(($, v) => $ + v, 0) / b.pings.length,
              );
            });
          })
          .catch(() => { }),
        new Promise(
          (
            x, // TOLOOK
          ) => setTimeout(() => x(), 100),
        ),
      ]);
    };
    const s = async () => {
      await Promise.all(Object.keys(i).map(n));
      if (!window.blockRedraw) {
        kt.redraw();
      }
    };
    e.forEach((c) => {
      i[c.region] = i[c.region] || [];
      i[c.region].push(c);
    });
    //e.forEach(c => {
    // only sg
    //if (c.region !== "sg" && c.region !== "singapore") return;
    //  i[c.region] = i[c.region] || [];
    //  i[c.region].push(c);
    //});
    for (const c in i) {
      i[c] = i[c].sort(function (a, f) {
        return f.playerCount - a.playerCount;
      });
    }
    this.servers = i;
    let r;
    const [o, l] = this.parseServerQuery();
    e.forEach((c) => {
      if (o === c.region && l === c.name) {
        c.selected = true;
        r = c;
      }
    });
    s()
      .then(s)
      .then(() => {
        if (r) {
          return;
        }
        let c = Eu(e);
        if (!c) {
          c = e[0];
        }
        if (c) {
          c.selected = true;
          window.history.replaceState(
            document.title,
            document.title,
            this.generateHref(c.region, c.name, this.password),
          );
        }
        if (!window.blockRedraw) {
          kt.redraw();
        }
      })
      .then(s)
      .catch((c) => { })
      .finally(t);
    _i = // TOLOOK
      setInterval(s, 5000);
  });
};
VultrClient.prototype.ipToHex = function (e) {
  return e
    .split(".")
    .map((i) => ("00" + parseInt(i).toString(16)).substr(-2))
    .join("")
    .toLowerCase();
};
VultrClient.prototype.hashIP = function (e) {
  return tu(this.ipToHex(e));
};
VultrClient.prototype.log = function () {
  if (this.debugLog) {
    return console.log.apply(undefined, arguments);
  }
  if (console.verbose) {
    return console.verbose.apply(undefined, arguments);
  }
};
VultrClient.prototype.stripRegion = function (e) {
  if (e.startsWith("vultr:")) {
    e = e.slice(6);
  } else if (e.startsWith("do:")) {
    e = e.slice(3);
  }
  return e;
};
const Cu = function (e, t) {
  return e.concat(t);
};
const Pu = function (e, t) {
  return t.map(e).reduce(Cu, []);
};
Array.prototype.flatMap = function (e) {
  return Pu(e, this);
};
const hn = (e, t) => {
  const i = t.x - e.x;
  const n = t.y - e.y;
  return Math.sqrt(i * i + n * n);
};
const $u = (e, t) => {
  const i = t.x - e.x;
  const n = t.y - e.y;
  return Au(Math.atan2(n, i));
};
const Ru = (e, t, i) => {
  const n = {
    x: 0,
    y: 0,
  };
  i = Cs(i);
  n.x = e.x - t * Math.cos(i);
  n.y = e.y - t * Math.sin(i);
  return n;
};
const Cs = (e) => e * (Math.PI / 180);
const Au = (e) => e * (180 / Math.PI);
const Du = (e) => (isNaN(e.buttons) ? e.pressure !== 0 : e.buttons !== 0);
const os = new Map();
const Vr = (e) => {
  if (os.has(e)) {
    clearTimeout(os.get(e));
  }
  os.set(
    e, // TOLOOK
    setTimeout(e, 100),
  );
};
const wn = (e, t, i) => {
  const n = t.split(/[ ,]+/g);
  let s;
  for (let r = 0; r < n.length; r += 1) {
    s = n[r];
    if (e.addEventListener) {
      e.addEventListener(s, i, false);
    } else if (e.attachEvent) {
      e.attachEvent(s, i);
    }
  }
};
const Nr = (e, t, i) => {
  const n = t.split(/[ ,]+/g);
  let s;
  for (let r = 0; r < n.length; r += 1) {
    s = n[r];
    if (e.removeEventListener) {
      e.removeEventListener(s, i);
    } else if (e.detachEvent) {
      e.detachEvent(s, i);
    }
  }
};
const fa = (e) => {
  e.preventDefault();
  if (e.type.match(/^touch/)) {
    return e.changedTouches;
  } else {
    return e;
  }
};
const Ur = () => {
  const e =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
        .scrollLeft;
  const t =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
  return {
    x: e,
    y: t,
  };
};
const Wr = (e, t) => {
  if (t.top || t.right || t.bottom || t.left) {
    e.style.top = t.top;
    e.style.right = t.right;
    e.style.bottom = t.bottom;
    e.style.left = t.left;
  } else {
    e.style.left = t.x + "px";
    e.style.top = t.y + "px";
  }
};
const tr = (e, t, i) => {
  const n = da(e);
  for (let s in n) {
    if (n.hasOwnProperty(s)) {
      if (typeof t == "string") {
        n[s] = t + " " + i;
      } else {
        let r = "";
        for (let o = 0, l = t.length; o < l; o += 1) {
          r += t[o] + " " + i + ", ";
        }
        n[s] = r.slice(0, -2);
      }
    }
  }
  return n;
};
const Ou = (e, t) => {
  const i = da(e);
  for (let n in i) {
    if (i.hasOwnProperty(n)) {
      i[n] = t;
    }
  }
  return i;
};
const da = (e) => {
  const t = {
    [e]: "",
  };
  ["webkit", "Moz", "o"].forEach(function (n) {
    t[n + e.charAt(0).toUpperCase() + e.slice(1)] = "";
  });
  return t;
};
const as = (e, t) => {
  for (let i in t) {
    if (t.hasOwnProperty(i)) {
      e[i] = t[i];
    }
  }
  return e;
};
const _u = (e, t) => {
  const i = {};
  for (let n in e) {
    if (e.hasOwnProperty(n) && t.hasOwnProperty(n)) {
      i[n] = t[n];
    } else if (e.hasOwnProperty(n)) {
      i[n] = e[n];
    }
  }
  return i;
};
const Ps = (e, t) => {
  if (e.length) {
    for (let i = 0, n = e.length; i < n; i += 1) {
      t(e[i]);
    }
  } else {
    t(e);
  }
};
const zu = (e, t, i) => ({
  x: Math.min(Math.max(e.x, t.x - i), t.x + i),
  y: Math.min(Math.max(e.y, t.y - i), t.y + i),
});
var Bu = "ontouchstart" in window;
var Hu = !!window.PointerEvent;
var Lu = !!window.MSPointerEvent;
var Ci = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    end: "touchend, touchcancel",
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup",
  },
  pointer: {
    start: "pointerdown",
    move: "pointermove",
    end: "pointerup, pointercancel",
  },
  MSPointer: {
    start: "MSPointerDown",
    move: "MSPointerMove",
    end: "MSPointerUp",
  },
};
var si;
var Wi = {};
if (Hu) {
  si = Ci.pointer;
} else if (Lu) {
  si = Ci.MSPointer;
} else if (Bu) {
  si = Ci.touch;
  Wi = Ci.mouse;
} else {
  si = Ci.mouse;
}
function dt() { }
dt.prototype.on = function (e, t) {
  var i = this;
  var n = e.split(/[ ,]+/g);
  var s;
  i._handlers_ = i._handlers_ || {};
  for (var r = 0; r < n.length; r += 1) {
    s = n[r];
    i._handlers_[s] = i._handlers_[s] || [];
    i._handlers_[s].push(t);
  }
  return i;
};
dt.prototype.off = function (e, t) {
  var i = this;
  i._handlers_ = i._handlers_ || {};
  if (e === undefined) {
    i._handlers_ = {};
  } else if (t === undefined) {
    i._handlers_[e] = null;
  } else if (i._handlers_[e] && i._handlers_[e].indexOf(t) >= 0) {
    i._handlers_[e].splice(i._handlers_[e].indexOf(t), 1);
  }
  return i;
};
dt.prototype.trigger = function (e, t) {
  var i = this;
  var n = e.split(/[ ,]+/g);
  var s;
  i._handlers_ = i._handlers_ || {};
  for (var r = 0; r < n.length; r += 1) {
    s = n[r];
    if (i._handlers_[s] && i._handlers_[s].length) {
      i._handlers_[s].forEach(function (o) {
        o.call(
          i,
          {
            type: s,
            target: i,
          },
          t,
        );
      });
    }
  }
};
dt.prototype.config = function (e) {
  var t = this;
  t.options = t.defaults || {};
  if (e) {
    t.options = _u(t.options, e);
  }
};
dt.prototype.bindEvt = function (e, t) {
  var i = this;
  i._domHandlers_ = i._domHandlers_ || {};
  i._domHandlers_[t] = function () {
    if (typeof i["on" + t] == "function") {
      i["on" + t].apply(i, arguments);
    } else {
      console.warn('[WARNING] : Missing "on' + t + '" handler.');
    }
  };
  wn(e, si[t], i._domHandlers_[t]);
  if (Wi[t]) {
    wn(e, Wi[t], i._domHandlers_[t]);
  }
  return i;
};
dt.prototype.unbindEvt = function (e, t) {
  var i = this;
  i._domHandlers_ = i._domHandlers_ || {};
  Nr(e, si[t], i._domHandlers_[t]);
  if (Wi[t]) {
    Nr(e, Wi[t], i._domHandlers_[t]);
  }
  delete i._domHandlers_[t];
  return this;
};
function Ee(e, t) {
  this.identifier = t.identifier;
  this.position = t.position;
  this.frontPosition = t.frontPosition;
  this.collection = e;
  this.defaults = {
    size: 100,
    threshold: 0.1,
    color: "white",
    fadeTime: 250,
    dataOnly: false,
    restJoystick: true,
    restOpacity: 0.5,
    mode: "dynamic",
    zone: document.body,
    lockX: false,
    lockY: false,
    shape: "circle",
  };
  this.config(t);
  if (this.options.mode === "dynamic") {
    this.options.restOpacity = 0;
  }
  this.id = Ee.id;
  Ee.id += 1;
  this.buildEl().stylize();
  this.instance = {
    el: this.ui.el,
    on: this.on.bind(this),
    off: this.off.bind(this),
    show: this.show.bind(this),
    hide: this.hide.bind(this),
    add: this.addToDom.bind(this),
    remove: this.removeFromDom.bind(this),
    destroy: this.destroy.bind(this),
    setPosition: this.setPosition.bind(this),
    resetDirection: this.resetDirection.bind(this),
    computeDirection: this.computeDirection.bind(this),
    trigger: this.trigger.bind(this),
    position: this.position,
    frontPosition: this.frontPosition,
    ui: this.ui,
    identifier: this.identifier,
    id: this.id,
    options: this.options,
  };
  return this.instance;
}
Ee.prototype = new dt();
Ee.constructor = Ee;
Ee.id = 0;
Ee.prototype.buildEl = function (e) {
  this.ui = {};
  if (this.options.dataOnly) {
    return this;
  } else {
    this.ui.el = document.createElement("div");
    this.ui.back = document.createElement("div");
    this.ui.front = document.createElement("div");
    this.ui.el.className = "nipple collection_" + this.collection.id;
    this.ui.back.className = "back";
    this.ui.front.className = "front";
    this.ui.el.setAttribute(
      "id",
      "nipple_" + this.collection.id + "_" + this.id,
    );
    this.ui.el.appendChild(this.ui.back);
    this.ui.el.appendChild(this.ui.front);
    return this;
  }
};
Ee.prototype.stylize = function () {
  if (this.options.dataOnly) {
    return this;
  }
  var e = this.options.fadeTime + "ms";
  var t = Ou("borderRadius", "50%");
  var i = tr("transition", "opacity", e);
  var n = {
    el: {
      position: "absolute",
      opacity: this.options.restOpacity,
      display: "block",
      zIndex: 999,
    },
    back: {
      position: "absolute",
      display: "block",
      width: this.options.size + "px",
      height: this.options.size + "px",
      marginLeft: -this.options.size / 2 + "px",
      marginTop: -this.options.size / 2 + "px",
      background: this.options.color,
      opacity: ".5",
    },
    front: {
      width: this.options.size / 2 + "px",
      height: this.options.size / 2 + "px",
      position: "absolute",
      display: "block",
      marginLeft: -this.options.size / 4 + "px",
      marginTop: -this.options.size / 4 + "px",
      background: this.options.color,
      opacity: ".5",
      transform: "translate(0px, 0px)",
    },
  };
  as(n.el, i);
  if (this.options.shape === "circle") {
    as(n.back, t);
  }
  as(n.front, t);
  this.applyStyles(n);
  return this;
};
Ee.prototype.applyStyles = function (e) {
  for (var t in this.ui) {
    if (this.ui.hasOwnProperty(t)) {
      for (var i in e[t]) {
        this.ui[t].style[i] = e[t][i];
      }
    }
  }
  return this;
};
Ee.prototype.addToDom = function () {
  if (this.options.dataOnly || document.body.contains(this.ui.el)) {
    return this;
  } else {
    this.options.zone.appendChild(this.ui.el);
    return this;
  }
};
Ee.prototype.removeFromDom = function () {
  if (this.options.dataOnly || !document.body.contains(this.ui.el)) {
    return this;
  } else {
    this.options.zone.removeChild(this.ui.el);
    return this;
  }
};
Ee.prototype.destroy = function () {
  clearTimeout(this.removeTimeout);
  clearTimeout(this.showTimeout);
  clearTimeout(this.restTimeout);
  this.trigger("destroyed", this.instance);
  this.removeFromDom();
  this.off();
};
Ee.prototype.show = function (e) {
  var t = this;
  if (!t.options.dataOnly) {
    clearTimeout(t.removeTimeout);
    clearTimeout(t.showTimeout);
    clearTimeout(t.restTimeout);
    t.addToDom();
    t.restCallback();
    // TOLOOK
    setTimeout(function () {
      t.ui.el.style.opacity = 1;
    }, 0);
    t.showTimeout = // TOLOOK
      setTimeout(function () {
        t.trigger("shown", t.instance);
        if (typeof e == "function") {
          e.call(this);
        }
      }, t.options.fadeTime);
  }
  return t;
};
Ee.prototype.hide = function (e) {
  var t = this;
  if (t.options.dataOnly) {
    return t;
  }
  t.ui.el.style.opacity = t.options.restOpacity;
  clearTimeout(t.removeTimeout);
  clearTimeout(t.showTimeout);
  clearTimeout(t.restTimeout);
  t.removeTimeout = // TOLOOK
    setTimeout(function () {
      var i = t.options.mode === "dynamic" ? "none" : "block";
      t.ui.el.style.display = i;
      if (typeof e == "function") {
        e.call(t);
      }
      t.trigger("hidden", t.instance);
    }, t.options.fadeTime);
  if (t.options.restJoystick) {
    const i = t.options.restJoystick;
    const n = {
      x: i === true || i.x !== false ? 0 : t.instance.frontPosition.x,
      y: i === true || i.y !== false ? 0 : t.instance.frontPosition.y,
    };
    t.setPosition(e, n);
  }
  return t;
};
Ee.prototype.setPosition = function (e, t) {
  var i = this;
  i.frontPosition = {
    x: t.x,
    y: t.y,
  };
  var n = i.options.fadeTime + "ms";
  var s = {};
  s.front = tr("transition", ["transform"], n);
  var r = {
    front: {},
  };
  r.front = {
    transform:
      "translate(" + i.frontPosition.x + "px," + i.frontPosition.y + "px)",
  };
  i.applyStyles(s);
  i.applyStyles(r);
  i.restTimeout = // TOLOOK
    setTimeout(function () {
      if (typeof e == "function") {
        e.call(i);
      }
      i.restCallback();
    }, i.options.fadeTime);
};
Ee.prototype.restCallback = function () {
  var e = this;
  var t = {};
  t.front = tr("transition", "none", "");
  e.applyStyles(t);
  e.trigger("rested", e.instance);
};
Ee.prototype.resetDirection = function () {
  this.direction = {
    x: false,
    y: false,
    angle: false,
  };
};
Ee.prototype.computeDirection = function (e) {
  var t = e.angle.radian;
  var i = Math.PI / 4;
  var n = Math.PI / 2;
  var s;
  var r;
  var o;
  if (t > i && t < i * 3 && !e.lockX) {
    s = "up";
  } else if (t > -i && t <= i && !e.lockY) {
    s = "left";
  } else if (t > -i * 3 && t <= -i && !e.lockX) {
    s = "down";
  } else if (!e.lockY) {
    s = "right";
  }
  if (!e.lockY) {
    if (t > -n && t < n) {
      r = "left";
    } else {
      r = "right";
    }
  }
  if (!e.lockX) {
    if (t > 0) {
      o = "up";
    } else {
      o = "down";
    }
  }
  if (e.force > this.options.threshold) {
    var l = {};
    var c;
    for (c in this.direction) {
      if (this.direction.hasOwnProperty(c)) {
        l[c] = this.direction[c];
      }
    }
    var a = {};
    this.direction = {
      x: r,
      y: o,
      angle: s,
    };
    e.direction = this.direction;
    for (c in l) {
      if (l[c] === this.direction[c]) {
        a[c] = true;
      }
    }
    if (a.x && a.y && a.angle) {
      return e;
    }
    if (!a.x || !a.y) {
      this.trigger("plain", e);
    }
    if (!a.x) {
      this.trigger("plain:" + r, e);
    }
    if (!a.y) {
      this.trigger("plain:" + o, e);
    }
    if (!a.angle) {
      this.trigger("dir dir:" + s, e);
    }
  } else {
    this.resetDirection();
  }
  return e;
};
function ke(e, t) {
  var i = this;
  i.nipples = [];
  i.idles = [];
  i.actives = [];
  i.ids = [];
  i.pressureIntervals = {};
  i.manager = e;
  i.id = ke.id;
  ke.id += 1;
  i.defaults = {
    zone: document.body,
    multitouch: false,
    maxNumberOfNipples: 10,
    mode: "dynamic",
    position: {
      top: 0,
      left: 0,
    },
    catchDistance: 200,
    size: 100,
    threshold: 0.1,
    color: "white",
    fadeTime: 250,
    dataOnly: false,
    restJoystick: true,
    restOpacity: 0.5,
    lockX: false,
    lockY: false,
    shape: "circle",
    dynamicPage: false,
    follow: false,
  };
  i.config(t);
  if (i.options.mode === "static" || i.options.mode === "semi") {
    i.options.multitouch = false;
  }
  if (!i.options.multitouch) {
    i.options.maxNumberOfNipples = 1;
  }
  const n = getComputedStyle(i.options.zone.parentElement);
  if (n && n.display === "flex") {
    i.parentIsFlex = true;
  }
  i.updateBox();
  i.prepareNipples();
  i.bindings();
  i.begin();
  return i.nipples;
}
ke.prototype = new dt();
ke.constructor = ke;
ke.id = 0;
ke.prototype.prepareNipples = function () {
  var e = this;
  var t = e.nipples;
  t.on = e.on.bind(e);
  t.off = e.off.bind(e);
  t.options = e.options;
  t.destroy = e.destroy.bind(e);
  t.ids = e.ids;
  t.id = e.id;
  t.processOnMove = e.processOnMove.bind(e);
  t.processOnEnd = e.processOnEnd.bind(e);
  t.get = function (i) {
    if (i === undefined) {
      return t[0];
    }
    for (var n = 0, s = t.length; n < s; n += 1) {
      if (t[n].identifier === i) {
        return t[n];
      }
    }
    return false;
  };
};
ke.prototype.bindings = function () {
  var e = this;
  e.bindEvt(e.options.zone, "start");
  e.options.zone.style.touchAction = "none";
  e.options.zone.style.msTouchAction = "none";
};
ke.prototype.begin = function () {
  var e = this;
  var t = e.options;
  if (t.mode === "static") {
    var i = e.createNipple(t.position, e.manager.getIdentifier());
    i.add();
    e.idles.push(i);
  }
};
ke.prototype.createNipple = function (e, t) {
  var i = this;
  var n = i.manager.scroll;
  var s = {};
  var r = i.options;
  var o = {
    x: i.parentIsFlex ? n.x : n.x + i.box.left,
    y: i.parentIsFlex ? n.y : n.y + i.box.top,
  };
  if (e.x && e.y) {
    s = {
      x: e.x - o.x,
      y: e.y - o.y,
    };
  } else if (e.top || e.right || e.bottom || e.left) {
    var l = document.createElement("DIV");
    l.style.display = "hidden";
    l.style.top = e.top;
    l.style.right = e.right;
    l.style.bottom = e.bottom;
    l.style.left = e.left;
    l.style.position = "absolute";
    r.zone.appendChild(l);
    var c = l.getBoundingClientRect();
    r.zone.removeChild(l);
    s = e;
    e = {
      x: c.left + n.x,
      y: c.top + n.y,
    };
  }
  var a = new Ee(i, {
    color: r.color,
    size: r.size,
    threshold: r.threshold,
    fadeTime: r.fadeTime,
    dataOnly: r.dataOnly,
    restJoystick: r.restJoystick,
    restOpacity: r.restOpacity,
    mode: r.mode,
    identifier: t,
    position: e,
    zone: r.zone,
    frontPosition: {
      x: 0,
      y: 0,
    },
    shape: r.shape,
  });
  if (!r.dataOnly) {
    Wr(a.ui.el, s);
    Wr(a.ui.front, a.frontPosition);
  }
  i.nipples.push(a);
  i.trigger("added " + a.identifier + ":added", a);
  i.manager.trigger("added " + a.identifier + ":added", a);
  i.bindNipple(a);
  return a;
};
ke.prototype.updateBox = function () {
  var e = this;
  e.box = e.options.zone.getBoundingClientRect();
};
ke.prototype.bindNipple = function (e) {
  var t = this;
  var i;
  function n(s, r) {
    i = s.type + " " + r.id + ":" + s.type;
    t.trigger(i, r);
  }
  e.on("destroyed", t.onDestroyed.bind(t));
  e.on("shown hidden rested dir plain", n);
  e.on("dir:up dir:right dir:down dir:left", n);
  e.on("plain:up plain:right plain:down plain:left", n);
};
ke.prototype.pressureFn = function (e, t, i) {
  var n = this;
  var s = 0;
  clearInterval(n.pressureIntervals[i]);
  n.pressureIntervals[i] = // TOLOOK
    setInterval(
      function () {
        var r = e.force || e.pressure || e.webkitForce || 0;
        if (r !== s) {
          t.trigger("pressure", r);
          n.trigger("pressure " + t.identifier + ":pressure", r);
          s = r;
        }
      }.bind(n),
      100,
    );
};
ke.prototype.onstart = function (e) {
  var t = this;
  var i = t.options;
  var n = e;
  e = fa(e);
  t.updateBox();
  function s(r) {
    if (t.actives.length < i.maxNumberOfNipples) {
      t.processOnStart(r);
    } else if (n.type.match(/^touch/)) {
      Object.keys(t.manager.ids).forEach(function (o) {
        if (
          Object.values(n.touches).findIndex(function (c) {
            return c.identifier === o;
          }) < 0
        ) {
          var l = [e[0]];
          l.identifier = o;
          t.processOnEnd(l);
        }
      });
      if (t.actives.length < i.maxNumberOfNipples) {
        t.processOnStart(r);
      }
    }
  }
  Ps(e, s);
  t.manager.bindDocument();
  return false;
};
ke.prototype.processOnStart = function (e) {
  var t = this;
  var i = t.options;
  var n;
  var s = t.manager.getIdentifier(e);
  var r = e.force || e.pressure || e.webkitForce || 0;
  var o = {
    x: e.pageX,
    y: e.pageY,
  };
  var l = t.getOrCreate(s, o);
  if (l.identifier !== s) {
    t.manager.removeIdentifier(l.identifier);
  }
  l.identifier = s;
  function c(f) {
    f.trigger("start", f);
    t.trigger("start " + f.id + ":start", f);
    f.show();
    if (r > 0) {
      t.pressureFn(e, f, f.identifier);
    }
    t.processOnMove(e);
  }
  if ((n = t.idles.indexOf(l)) >= 0) {
    t.idles.splice(n, 1);
  }
  t.actives.push(l);
  t.ids.push(l.identifier);
  if (i.mode !== "semi") {
    c(l);
  } else {
    var a = hn(o, l.position);
    if (a <= i.catchDistance) {
      c(l);
    } else {
      l.destroy();
      t.processOnStart(e);
      return;
    }
  }
  return l;
};
ke.prototype.getOrCreate = function (e, t) {
  var i = this;
  var n = i.options;
  var s;
  if (/(semi|static)/.test(n.mode)) {
    s = i.idles[0];
    if (s) {
      i.idles.splice(0, 1);
      return s;
    } else if (n.mode === "semi") {
      return i.createNipple(t, e);
    } else {
      console.warn("Coudln't find the needed nipple.");
      return false;
    }
  } else {
    s = i.createNipple(t, e);
    return s;
  }
};
ke.prototype.processOnMove = function (e) {
  var t = this;
  var i = t.options;
  var n = t.manager.getIdentifier(e);
  var s = t.nipples.get(n);
  var r = t.manager.scroll;
  if (!Du(e)) {
    this.processOnEnd(e);
    return;
  }
  if (!s) {
    console.error("Found zombie joystick with ID " + n);
    t.manager.removeIdentifier(n);
    return;
  }
  if (i.dynamicPage) {
    var o = s.el.getBoundingClientRect();
    s.position = {
      x: r.x + o.left,
      y: r.y + o.top,
    };
  }
  s.identifier = n;
  var l = s.options.size / 2;
  var c = {
    x: e.pageX,
    y: e.pageY,
  };
  if (i.lockX) {
    c.y = s.position.y;
  }
  if (i.lockY) {
    c.x = s.position.x;
  }
  var a = hn(c, s.position);
  var f = $u(c, s.position);
  var d = Cs(f);
  var u = a / l;
  var p = {
    distance: a,
    position: c,
  };
  var w;
  var x;
  if (s.options.shape === "circle") {
    w = Math.min(a, l);
    x = Ru(s.position, w, f);
  } else {
    x = zu(c, s.position, l);
    w = hn(x, s.position);
  }
  if (i.follow) {
    if (a > l) {
      let S = c.x - x.x;
      let R = c.y - x.y;
      s.position.x += S;
      s.position.y += R;
      s.el.style.top = s.position.y - (t.box.top + r.y) + "px";
      s.el.style.left = s.position.x - (t.box.left + r.x) + "px";
      a = hn(c, s.position);
    }
  } else {
    c = x;
    a = w;
  }
  var b = c.x - s.position.x;
  var $ = c.y - s.position.y;
  s.frontPosition = {
    x: b,
    y: $,
  };
  if (!i.dataOnly) {
    s.ui.front.style.transform = "translate(" + b + "px," + $ + "px)";
  }
  var v = {
    identifier: s.identifier,
    position: c,
    force: u,
    pressure: e.force || e.pressure || e.webkitForce || 0,
    distance: a,
    angle: {
      radian: d,
      degree: f,
    },
    vector: {
      x: b / l,
      y: -$ / l,
    },
    raw: p,
    instance: s,
    lockX: i.lockX,
    lockY: i.lockY,
  };
  v = s.computeDirection(v);
  v.angle = {
    radian: Cs(180 - f),
    degree: 180 - f,
  };
  s.trigger("move", v);
  t.trigger("move " + s.id + ":move", v);
};
ke.prototype.processOnEnd = function (e) {
  var t = this;
  var i = t.options;
  var n = t.manager.getIdentifier(e);
  var s = t.nipples.get(n);
  var r = t.manager.removeIdentifier(s.identifier);
  if (s) {
    if (!i.dataOnly) {
      s.hide(function () {
        if (i.mode === "dynamic") {
          s.trigger("removed", s);
          t.trigger("removed " + s.id + ":removed", s);
          t.manager.trigger("removed " + s.id + ":removed", s);
          s.destroy();
        }
      });
    }
    clearInterval(t.pressureIntervals[s.identifier]);
    s.resetDirection();
    s.trigger("end", s);
    t.trigger("end " + s.id + ":end", s);
    if (t.ids.indexOf(s.identifier) >= 0) {
      t.ids.splice(t.ids.indexOf(s.identifier), 1);
    }
    if (t.actives.indexOf(s) >= 0) {
      t.actives.splice(t.actives.indexOf(s), 1);
    }
    if (/(semi|static)/.test(i.mode)) {
      t.idles.push(s);
    } else if (t.nipples.indexOf(s) >= 0) {
      t.nipples.splice(t.nipples.indexOf(s), 1);
    }
    t.manager.unbindDocument();
    if (/(semi|static)/.test(i.mode)) {
      t.manager.ids[r.id] = r.identifier;
    }
  }
};
ke.prototype.onDestroyed = function (e, t) {
  var i = this;
  if (i.nipples.indexOf(t) >= 0) {
    i.nipples.splice(i.nipples.indexOf(t), 1);
  }
  if (i.actives.indexOf(t) >= 0) {
    i.actives.splice(i.actives.indexOf(t), 1);
  }
  if (i.idles.indexOf(t) >= 0) {
    i.idles.splice(i.idles.indexOf(t), 1);
  }
  if (i.ids.indexOf(t.identifier) >= 0) {
    i.ids.splice(i.ids.indexOf(t.identifier), 1);
  }
  i.manager.removeIdentifier(t.identifier);
  i.manager.unbindDocument();
};
ke.prototype.destroy = function () {
  var e = this;
  e.unbindEvt(e.options.zone, "start");
  e.nipples.forEach(function (i) {
    i.destroy();
  });
  for (var t in e.pressureIntervals) {
    if (e.pressureIntervals.hasOwnProperty(t)) {
      clearInterval(e.pressureIntervals[t]);
    }
  }
  e.trigger("destroyed", e.nipples);
  e.manager.unbindDocument();
  e.off();
};
function Re(e) {
  var t = this;
  t.ids = {};
  t.index = 0;
  t.collections = [];
  t.scroll = Ur();
  t.config(e);
  t.prepareCollections();
  function i() {
    var s;
    t.collections.forEach(function (r) {
      r.forEach(function (o) {
        s = o.el.getBoundingClientRect();
        o.position = {
          x: t.scroll.x + s.left,
          y: t.scroll.y + s.top,
        };
      });
    });
  }
  wn(window, "resize", function () {
    Vr(i);
  });
  function n() {
    t.scroll = Ur();
  }
  wn(window, "scroll", function () {
    Vr(n);
  });
  return t.collections;
}
Re.prototype = new dt();
Re.constructor = Re;
Re.prototype.prepareCollections = function () {
  var e = this;
  e.collections.create = e.create.bind(e);
  e.collections.on = e.on.bind(e);
  e.collections.off = e.off.bind(e);
  e.collections.destroy = e.destroy.bind(e);
  e.collections.get = function (t) {
    var i;
    e.collections.every(function (n) {
      i = n.get(t);
      return !i;
    });
    return i;
  };
};
Re.prototype.create = function (e) {
  return this.createCollection(e);
};
Re.prototype.createCollection = function (e) {
  var t = this;
  var i = new ke(t, e);
  t.bindCollection(i);
  t.collections.push(i);
  return i;
};
Re.prototype.bindCollection = function (e) {
  var t = this;
  var i;
  function n(s, r) {
    i = s.type + " " + r.id + ":" + s.type;
    t.trigger(i, r);
  }
  e.on("destroyed", t.onDestroyed.bind(t));
  e.on("shown hidden rested dir plain", n);
  e.on("dir:up dir:right dir:down dir:left", n);
  e.on("plain:up plain:right plain:down plain:left", n);
};
Re.prototype.bindDocument = function () {
  var e = this;
  if (!e.binded) {
    e.bindEvt(document, "move").bindEvt(document, "end");
    e.binded = true;
  }
};
Re.prototype.unbindDocument = function (e) {
  var t = this;
  if (!Object.keys(t.ids).length || e === true) {
    t.unbindEvt(document, "move").unbindEvt(document, "end");
    t.binded = false;
  }
};
Re.prototype.getIdentifier = function (e) {
  var t;
  if (e) {
    t = e.identifier === undefined ? e.pointerId : e.identifier;
    if (t === undefined) {
      t = this.latest || 0;
    }
  } else {
    t = this.index;
  }
  if (this.ids[t] === undefined) {
    this.ids[t] = this.index;
    this.index += 1;
  }
  this.latest = t;
  return this.ids[t];
};
Re.prototype.removeIdentifier = function (e) {
  var t = {};
  for (var i in this.ids) {
    if (this.ids[i] === e) {
      t.id = i;
      t.identifier = this.ids[i];
      delete this.ids[i];
      break;
    }
  }
  return t;
};
Re.prototype.onmove = function (e) {
  var t = this;
  t.onAny("move", e);
  return false;
};
Re.prototype.onend = function (e) {
  var t = this;
  t.onAny("end", e);
  return false;
};
Re.prototype.oncancel = function (e) {
  var t = this;
  t.onAny("end", e);
  return false;
};
Re.prototype.onAny = function (e, t) {
  var i = this;
  var n;
  var s = "processOn" + e.charAt(0).toUpperCase() + e.slice(1);
  t = fa(t);
  function r(l, c, a) {
    if (a.ids.indexOf(c) >= 0) {
      a[s](l);
      l._found_ = true;
    }
  }
  function o(l) {
    n = i.getIdentifier(l);
    Ps(i.collections, r.bind(null, l, n));
    if (!l._found_) {
      i.removeIdentifier(n);
    }
  }
  Ps(t, o);
  return false;
};
Re.prototype.destroy = function () {
  var e = this;
  e.unbindDocument(true);
  e.ids = {};
  e.index = 0;
  e.collections.forEach(function (t) {
    t.destroy();
  });
  e.off();
};
Re.prototype.onDestroyed = function (e, t) {
  var i = this;
  if (i.collections.indexOf(t) < 0) {
    return false;
  }
  i.collections.splice(i.collections.indexOf(t), 1);
};
const Xr = new Re();
const qr = {
  create: function (e) {
    return Xr.create(e);
  },
  factory: Xr,
};
let Gr = false;
const Fu = (e) => {
  if (Gr) {
    return;
  }
  Gr = true;
  const t = document.getElementById("touch-controls-left");
  const i = qr.create({
    zone: t,
  });
  i.on("start", e.onStartMoving);
  i.on("end", e.onStopMoving);
  i.on("move", e.onRotateMoving);
  const n = document.getElementById("touch-controls-right");
  const s = qr.create({
    zone: n,
  });
  s.on("start", e.onStartAttacking);
  s.on("end", e.onStopAttacking);
  s.on("move", e.onRotateAttacking);
  t.style.display = "block";
  n.style.display = "block";
};
const Vu = {
  enable: Fu,
};
var Nu = Object.defineProperty;
var Uu = (e, t, i) =>
  t in e
    ? Nu(e, t, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: i,
    })
    : (e[t] = i);
var Ge = (e, t, i) => Uu(e, typeof t != "symbol" ? t + "" : t, i);
const pa =
  "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGY9bmV3IFRleHRFbmNvZGVyO2Z1bmN0aW9uIHAoZSl7cmV0dXJuWy4uLm5ldyBVaW50OEFycmF5KGUpXS5tYXAodD0+dC50b1N0cmluZygxNikucGFkU3RhcnQoMiwiMCIpKS5qb2luKCIiKX1hc3luYyBmdW5jdGlvbiB3KGUsdCxyKXtyZXR1cm4gcChhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChyLnRvVXBwZXJDYXNlKCksZi5lbmNvZGUoZSt0KSkpfWZ1bmN0aW9uIGIoZSx0LHI9IlNIQS0yNTYiLG49MWU2LHM9MCl7Y29uc3Qgbz1uZXcgQWJvcnRDb250cm9sbGVyLGE9RGF0ZS5ub3coKTtyZXR1cm57cHJvbWlzZTooYXN5bmMoKT0+e2ZvcihsZXQgYz1zO2M8PW47Yys9MSl7aWYoby5zaWduYWwuYWJvcnRlZClyZXR1cm4gbnVsbDtpZihhd2FpdCB3KHQsYyxyKT09PWUpcmV0dXJue251bWJlcjpjLHRvb2s6RGF0ZS5ub3coKS1hfX1yZXR1cm4gbnVsbH0pKCksY29udHJvbGxlcjpvfX1mdW5jdGlvbiBoKGUpe2NvbnN0IHQ9YXRvYihlKSxyPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoKTtmb3IobGV0IG49MDtuPHQubGVuZ3RoO24rKylyW25dPXQuY2hhckNvZGVBdChuKTtyZXR1cm4gcn1mdW5jdGlvbiBnKGUsdD0xMil7Y29uc3Qgcj1uZXcgVWludDhBcnJheSh0KTtmb3IobGV0IG49MDtuPHQ7bisrKXJbbl09ZSUyNTYsZT1NYXRoLmZsb29yKGUvMjU2KTtyZXR1cm4gcn1hc3luYyBmdW5jdGlvbiBtKGUsdD0iIixyPTFlNixuPTApe2NvbnN0IHM9IkFFUy1HQ00iLG89bmV3IEFib3J0Q29udHJvbGxlcixhPURhdGUubm93KCksbD1hc3luYygpPT57Zm9yKGxldCB1PW47dTw9cjt1Kz0xKXtpZihvLnNpZ25hbC5hYm9ydGVkfHwhY3x8IXkpcmV0dXJuIG51bGw7dHJ5e2NvbnN0IGQ9YXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHtuYW1lOnMsaXY6Zyh1KX0sYyx5KTtpZihkKXJldHVybntjbGVhclRleHQ6bmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGQpLHRvb2s6RGF0ZS5ub3coKS1hfX1jYXRjaHt9fXJldHVybiBudWxsfTtsZXQgYz1udWxsLHk9bnVsbDt0cnl7eT1oKGUpO2NvbnN0IHU9YXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoIlNIQS0yNTYiLGYuZW5jb2RlKHQpKTtjPWF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCJyYXciLHUscywhMSxbImRlY3J5cHQiXSl9Y2F0Y2h7cmV0dXJue3Byb21pc2U6UHJvbWlzZS5yZWplY3QoKSxjb250cm9sbGVyOm99fXJldHVybntwcm9taXNlOmwoKSxjb250cm9sbGVyOm99fWxldCBpO29ubWVzc2FnZT1hc3luYyBlPT57Y29uc3R7dHlwZTp0LHBheWxvYWQ6cixzdGFydDpuLG1heDpzfT1lLmRhdGE7bGV0IG89bnVsbDtpZih0PT09ImFib3J0IilpPT1udWxsfHxpLmFib3J0KCksaT12b2lkIDA7ZWxzZSBpZih0PT09IndvcmsiKXtpZigib2JmdXNjYXRlZCJpbiByKXtjb25zdHtrZXk6YSxvYmZ1c2NhdGVkOmx9PXJ8fHt9O289YXdhaXQgbShsLGEscyxuKX1lbHNle2NvbnN0e2FsZ29yaXRobTphLGNoYWxsZW5nZTpsLHNhbHQ6Y309cnx8e307bz1iKGwsYyxhLHMsbil9aT1vLmNvbnRyb2xsZXIsby5wcm9taXNlLnRoZW4oYT0+e3NlbGYucG9zdE1lc3NhZ2UoYSYmey4uLmEsd29ya2VyOiEwfSl9KX19fSkoKTsK";
const Wu = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0));
const Yr =
  typeof self !== "undefined" &&
  self.Blob &&
  new Blob([Wu(pa)], {
    type: "text/javascript;charset=utf-8",
  });
function Xu(e) {
  let t;
  try {
    t = Yr && (self.URL || self.webkitURL).createObjectURL(Yr);
    if (!t) {
      throw "";
    }
    const i = new Worker(t, {
      name: e == null ? undefined : e.name,
    });
    i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    });
    return i;
  } catch {
    return new Worker("data:text/javascript;base64," + pa, {
      name: e == null ? undefined : e.name,
    });
  } finally {
    if (t) {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }
  }
}
window.loadedScript = true;
const local =
  location.hostname !== "localhost" &&
  location.hostname !== "127.0.0.1" &&
  !location.hostname.startsWith("192.168.");
const sandbox =
  location.hostname === "sandbox-dev.moomoo.io" ||
  location.hostname === "sandbox.moomoo.io";
const dev =
  location.hostname === "dev.moomoo.io" ||
  location.hostname === "dev2.moomoo.io";
const textManager = new textmanager();
let token;
let api;
let domain;
const testlocal =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";
const uhhhh = false;
const localtestorprivateserver = testlocal || uhhhh;
if (sandbox) {
  api = "https://api-sandbox.moomoo.io";
  domain = "moomoo.io";
} else if (dev) {
  api = "https://api-dev.moomoo.io";
  domain = "moomoo.io";
} else {
  api = "https://api.moomoo.io";
  domain = "moomoo.io";
}
const islocaltest = !localtestorprivateserver;
const vultrClient = new VultrClient(
  domain,
  443,
  config.maxPlayers,
  5,
  islocaltest,
);
vultrClient.debugLog = false;
const Ye = {
  animationTime: 0,
  land: null,
  lava: null,
  x: config.volcanoLocationX,
  y: config.volcanoLocationY,
};
function isMobile() {
  let e = false;
  (function (t) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        t,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        t.substr(0, 4),
      )
    ) {
      e = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return e;
}

const Ma = isMobile();
let connected = false;
let isConnected = false;

function connectSocket() {
  if (!didLoad || isConnected) return;
  isConnected = true;

  if (USE_PRIVATE_SERVER) {
    connectGame();
    return;
  }
  if (token) {
    connectGame("alt:" + token);
  } else {
    connectGame();
  }
}
let hmmm = false;
const USE_PRIVATE_SERVER = 1; // true = private | false = original
const PRIVATE_SERVER = "wss://tw-moo-privateserver.onrender.com/server"; // ⭐
function connectGame(e) {
  if (USE_PRIVATE_SERVER) {
    let r = PRIVATE_SERVER;

    window.gameSocketURL = r;
    io.connect(
      r,
      function (o) {
        if (hmmm) {
          hmmm = false;
          return;
        }
        pingSocket();
        if (o) {
          disconnect(o);
        } else {
          connected = true;
          enterGame();
        }
      },
      handlers,
    );

    return;
  }
  vultrClient.start(
    In,
    function (t) {
      let r = "wss://" + t;

      if (e) {
        r += "?token=" + encodeURIComponent(e);
      }

      window.gameSocketURL = r;
      io.connect(
        r,
        function (o) {
          if (hmmm) {
            hmmm = false;
            return;
          }
          pingSocket();
          if (o) {
            disconnect(o);
          } else {
            connected = true;
            enterGame();
          }
        },
        handlers,
      );
    },
    function (t) {
      console.error("Vultr error:", t);
      disconnect("disconnected");
    },
    testlocal,
  );
}
const handlers = {
  A: setInitData,
  B: disconnect,
  C: setupGame,
  D: addPlayer,
  E: removePlayer,
  a: updatePlayers,
  G: updateLeaderboard,
  H: loadGameObject,
  I: loadAI,
  J: animateAI,
  K: gatherAnimation,
  L: wiggleGameObject,
  M: shootTurret,
  N: updatePlayerValue,
  O: updateHealth,
  P: killPlayer,
  Q: killObject,
  R: killObjects,
  S: updateItemCounts,
  T: updateAge,
  U: updateUpgrades,
  V: updateItems,
  X: addProjectile,
  Y: remProjectile,
  Z: serverShutdownNotice,
  g: addAlliance,
  1: deleteAlliance,
  2: allianceNotification,
  3: setPlayerTeam,
  4: setAlliancePlayers,
  5: updateStoreItems,
  6: receiveChat,
  7: updateMinimap,
  8: showText,
  9: pingMap,
  0: pingSocketResponse,
};
window.connectSocket = connectSocket;
function socketReady() {
  return io.connected;
}
function joinParty() {
  const t = prompt("party key", In);
  if (t) {
    window.onbeforeunload = undefined;
    window.location.href = "/?server=" + t;
  }
}
const SoundinGame = new SoundManager(config);
const Ea = Math.PI;
const Rt = Ea * 2;
Math.lerpAngle = function (e, t, i) {
  if (Math.abs(t - e) > Ea) {
    if (e > t) {
      t += Rt;
    } else {
      e += Rt;
    }
  }
  const s = t + (e - t) * i;
  if (s >= 0 && s <= Rt) {
    return s;
  } else {
    return s % Rt;
  }
};
CanvasRenderingContext2D.prototype.roundRect = function (e, t, i, n, s) {
  if (i < s * 2) {
    s = i / 2;
  }
  if (n < s * 2) {
    s = n / 2;
  }
  if (s < 0) {
    s = 0;
  }
  this.beginPath();
  this.moveTo(e + s, t);
  this.arcTo(e + i, t, e + i, t + n, s);
  this.arcTo(e + i, t + n, e, t + n, s);
  this.arcTo(e, t + n, e, t, s);
  this.arcTo(e, t, e + i, t, s);
  this.closePath();
  return this;
};
let rr;
if (typeof Storage !== "undefined") {
  rr = true;
}
function saveVal(e, t) {
  if (rr) {
    localStorage.setItem(e, t);
  }
}
function getSavedVal(e) {
  if (rr) {
    return localStorage.getItem(e);
  } else {
    return null;
  }
}
var moofoll = getSavedVal("moofoll");
function moofollower() {
  // aka follmoo :)
  if (!moofoll) {
    moofoll = true;
    saveVal("moofoll", 1);
  }
}
//global VALUES :

let Ca;
let Et;
let jt = 1;
let delta; //delta
let hi;
let us;
let oo = Date.now();
//var ut; // keys
let Ke;
let ais = [];
let players = [];
let Enemy = [];
let NearestEnemy = null;
let NearestEnemyAngle = 0;
let Ally = [];
let NearestAlly = null;
let NearestAllyAngle = 0;
const weaponVariantCache = {};
let tt = [];
let gameObjects = []; //gameobjects
let ui = [];
let projectileManager = new ProjectileManager(
  Projectile,
  ui,
  players,
  ais,
  objectManager,
  items,
  config,
  UTILS,
);
let aiManager = new AiManager(ais, AI, players, items, null, config, UTILS);
let player; // player
let playerSID; // playerSID
let tmpObj; // tmpObj
let qt = 1;
let fs = 0;
let mouseX = 0;
let mouseY = 0;
let camX;
let camY;
let tmpDir;
let or = 0;
let maxScreenWidth = config.maxScreenWidth;
let maxScreenHeight = config.maxScreenHeight;
let ei;
let ti;
let inGame = false;
document.getElementById("ad-container");
const zn = document.getElementById("mainMenu");
const Hi = document.getElementById("enterGame");
const ds = document.getElementById("promoImg");
var promoImgHolder = document.getElementById("promoImgHolder");
var promoImageButton = document.getElementById("promoImg");
var adCard = document.getElementById("adCard");
var gameName = document.getElementById("gameName");
var partyButton = document.getElementById("partyButton");
var joinPartyButton = document.getElementById("joinPartyButton");
var wideAdCard = document.getElementById("wideAdCard");
var linksContainer2 = document.getElementById("linksContainer2");
[
  "promoImgHolder",
  "promoImg",
  "adCard",
  "gameName",
  "partyButton",
  "joinPartyButton",
  "wideAdCard",
  "linksContainer2",
].forEach((id) => document.getElementById(id)?.remove());
document.getElementById("partyButton");
document.getElementById("partyButton");
const ps = document.getElementById("joinPartyButton");
const _s = document.getElementById("settingsButton");
const co = _s.getElementsByTagName("span")[0];
const ho = document.getElementById("allianceButton");
const uo = document.getElementById("storeButton");
const fo = document.getElementById("chatButton");
const ri = document.getElementById("gameCanvas");
const C = ri.getContext("2d");
var qf = document.getElementById("serverBrowser");
const zs = document.getElementById("nativeResolution");
const ms = document.getElementById("showPing");
document.getElementById("playMusic");
const Gi = document.getElementById("pingDisplay");
const po = document.getElementById("shutdownDisplay");
const Yi = document.getElementById("menuCardHolder");
const Li = document.getElementById("guideCard");
const fi = document.getElementById("loadingText");
const ar = document.getElementById("gameUI");
const mo = document.getElementById("actionBar");
const Gf = document.getElementById("scoreDisplay");
const Yf = document.getElementById("foodDisplay");
const Kf = document.getElementById("woodDisplay");
const Zf = document.getElementById("stoneDisplay");
const Jf = document.getElementById("killCounter");
const go = document.getElementById("leaderboardData");
const Ki = document.getElementById("nameInput");
const vt = document.getElementById("itemInfoHolder");
const yo = document.getElementById("ageText");
const wo = document.getElementById("ageBarBody");
const Gt = document.getElementById("upgradeHolder");
const tn = document.getElementById("upgradeCounter");
const We = document.getElementById("allianceMenu");
const nn = document.getElementById("allianceHolder");
const sn = document.getElementById("allianceManager");
const De = document.getElementById("mapDisplay");
const Fi = document.getElementById("diedText");
const Qf = document.getElementById("skinColorHolder");
const Te = De.getContext("2d");
De.width = 300;
De.height = 300;
const storeMenu = document.getElementById("storeMenu");
const vo = document.getElementById("storeHolder");
const Yt = document.getElementById("noticationDisplay");
const Vi = Store.hats;
const Ni = Store.accessories;
var objectManager = new Objectmanager(GameObject, gameObjects, UTILS, config);
const Zi = "#525252";
const ko = "#3d3f42";
const St = 5.5;
// idont think developer will use this anymore
config.DAY_INTERVAL / 24;
config.DAY_INTERVAL / 2;
let runAtNextTick = [];
function E(id) {
  return document.getElementById(id);
}
const AB = {
  getDisplay: (id) => document.getElementById(id)?.style.display ?? "none",
  setStyle: (selectors, styles) => {
    const defaultTransition = "0.3s ease";
    selectors.forEach((selector, i) => {
      const elements = selector.startsWith(".")
        ? document.querySelectorAll(selector)
        : [document.getElementById(selector)];
      elements.forEach((el) => {
        if (!el) return;
        if (!el.style.transition || el.style.transition !== defaultTransition)
          el.style.transition = defaultTransition;
        for (const key in styles[i]) {
          if (el.style[key] !== styles[i][key]) el.style[key] = styles[i][key];
        }
      });
    });
  },
  styles: {
    animation: `#ageBarBody, #nameInput, #itemInfoHolder, #scoreDisplay, #mapDisplay, .menuButton, .skinColorItem, .menuHeader, .actionBarItem, .resourceDisplay, #topInfoHolder, .gameButton, #chatHolder, #chatBox, #allianceMenu, #allianceHolder, .allianceButtonM, #storeMenu, .storeTab, #storeHolder, .storeItem, #storeButton, #allianceButton, #leaderboard, #killCounter { transition: 0.3s; }`,
    Music: `.menuB { text-align: center; background: rgba(60, 30, 120, 0.5); color: #f0f0f0; border: 1px solid rgba(120,80,220,0.2); border-radius: 10px; padding: 12px 20px; cursor: pointer; transition: all 0.25s ease; font-weight: 600; margin: 6px 0; width: 100%; font-size: 15px; box-shadow: 0 4px 12px rgba(60,30,120,0.3); } .menuB:hover { background: rgba(100,50,200,0.5); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(80,40,180,0.5); } .menuB:active { transform: translateY(0); box-shadow: 0 3px 8px rgba(60,30,120,0.3); } .checkB { accent-color: #8a5fff; transform: scale(1.3); margin-right: 8px; cursor: pointer; } .Cselect { background: rgba(35,25,60,0.5); color: #f0f0f0; border: 1px solid rgba(120,100,255,0.2); border-radius: 10px; padding: 8px 12px; margin: 6px 0; font-weight: 500; } #musicMenu { border: 1px solid rgba(255,255,255,0.08); } #musicMenu .menuHeader { color: #e6e6e6; cursor: default; } #musicMenu .menuText { color: #bdbdbd; } #musicMenu .menuB { background: rgba(0,0,0,0.35); color: #e6e6e6; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 3px 10px rgba(0,0,0,0.35); } #musicMenu .menuB:hover { background: rgba(0,0,0,0.5); transform: translateY(-1px); box-shadow: 0 5px 14px rgba(0,0,0,0.45); } #musicMenu .menuB:active { transform: translateY(0); box-shadow: 0 3px 8px rgba(0,0,0,0.35); } #musicMenu .Cselect { background: rgba(0,0,0,0.35); color: #e6e6e6; border: 1px solid rgba(255,255,255,0.08); } #musicMenu .checkB { accent-color: #bdbdbd; } #musicMenu input[type="range"] { accent-color: #bdbdbd; }`,
    NotiDisplay: `.NotiDisplayHolder { background: linear-gradient(180deg, #181818, #242424); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 20px; font-size: 16px; font-weight: 700; font-family: Roboto, Arial, sans-serif; color: #E0E0E0; position: fixed; left: 50%; top: 20px; transform: translateX(-50%);z-index: 10000; opacity: 0; transition: opacity 0.4s ease, top 0.4s ease; box-shadow: 0 12px 30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04); max-width: 600px; box-sizing: border-box; } .NotiDisplayHolder2 { font-size: 20px; background-color: rgba(0, 0, 0, 0.3); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; color: #fff; padding: 12px 16px; position: fixed; top: 20px; left: 20px; opacity: 0; z-index: 50; transition: opacity 0.6s ease, top 0.4s ease; } .NotiDisplayHolder.show, .NotiDisplayHolder2.show { opacity: 1; } `,
    Custom: `#ageBar, .gameButton, #leaderboard, .resourceDisplay, #mapDisplay, #allianceHolder, #allianceInput, .allianceButtonM, #storeHolder, #ChatBodyBox, .storeTab, #chatBox, .actionBarItem, #PlayerLogBoard, .uiElement {  background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; } .actionBarItem { background-size: cover; background-position: center; border-radius: 10px; } #ageBar { margin-bottom: 5px; } #leaderboard { width: 230px } #foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay { line-height: 30px; background-size: 32px; background-position: center top 5px; padding: 30px 10px 0 10px; font-size: 20px; } #foodDisplay { bottom: 160px } #woodDisplay { bottom: 90px } `,
    Chat: `#chat { opacity: 0; visibility: hidden; transition: opacity .30s ease, visibility 0s linear .30s; } #chat.active { opacity: 1; visibility: visible; pointer-events: auto; transition: opacity .30s ease; } #chat, #chat * { scroll-behavior: auto !important; } #chat .ChatPane, #chat .ChatLine { overflow-anchor: none; } #ChatBodyBox { user-select: none; box-sizing: border-box; position: fixed; left: 20px; top: 20px; width: 460px; height: 320px; background: linear-gradient(180deg, rgba(18,18,18,.92), rgba(10,10,10,.86)); border: 1px solid rgba(255,255,255,.10); border-radius: 16px; z-index: 999; overflow: hidden; will-change: opacity; opacity: 0; transition: opacity .30s ease; } #chat.active #ChatBodyBox { opacity: 1; } #chat.active.idle #ChatBodyBox { opacity: 0; } #chat.active.wake #ChatBodyBox { opacity: 1; } #chat.wake #ChatInPut, #ChatBodyBox:hover #ChatInPut, #ChatInPut:focus { opacity: 1; } #ChatTabs { position: absolute; top: 0; left: 0; right: 0; height: 46px; padding: 4px 10px 0; display: flex; justify-content: flex-end; gap: 7px; z-index: 5; background: rgba(0,0,0,.18); border-bottom: 1px solid rgba(255,255,255,.06); box-sizing: border-box; } .ChatTab { position: relative; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.75); transition: .18s transform, .18s background, .18s border-color, .18s color, .18s box-shadow; box-shadow: 0 6px 14px rgba(0,0,0,.35); } .ChatTab i, .ChatTab .material-icons { font-size: 18px !important; line-height: 1; pointer-events: none; } .ChatTab:hover { transform: scale(1.06); background: rgba(255,255,255,.10); color: #fff; } .ChatTab.active { background: rgba(155,92,255,.16); border-color: rgba(155,92,255,.42); color: #EDE7FF; box-shadow: 0 0 0 3px rgba(155,92,255,.12), 0 10px 20px rgba(0,0,0,.40); } .ChatTab[data-tip] { position: relative; } .ChatTab[data-tip]::after { content: attr(data-tip); position: absolute; left: 50%; top: 42px; transform: translateX(-50%) translateY(-6px); font-size: 11px; font-weight: 900; letter-spacing: .10em; text-transform: uppercase; padding: 6px 10px; border-radius: 12px; background: rgba(0,0,0,.82); border: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.92); opacity: 0; pointer-events: none; white-space: nowrap; transition: opacity .16s ease, transform .16s ease; z-index: 10; } .ChatTab[data-tip]::before { content: ""; position: absolute; left: 50%; top: 36px; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid rgba(0,0,0,.82); opacity: 0; pointer-events: none; transition: opacity .16s ease; z-index: 10; } .ChatTab:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); } .ChatTab:hover::before { opacity: 1; }.ChatTab .badge { position: absolute; right: -10px; top: -6px; min-width: 22px; height: 18px; border-radius: 999px; display: none; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; line-height: 1; color: #fff; background: #9B5CFF; border: 1px solid rgba(0,0,0,.35); box-shadow: 0 6px 14px rgba(0,0,0,.45); } .ChatTab.hasNew .badge { display: flex; } .ChatTab.hasNew { box-shadow: 0 0 0 3px rgba(155,92,255,.10), 0 10px 20px rgba(0,0,0,.40); } #ChatMessagesWrap { position: absolute; left: 0; right: 0; top: 46px; bottom: 58px; padding: 8px 10px; box-sizing: border-box; } .ChatPane { position: absolute; inset: 0 0 0 10px; box-sizing: border-box; padding: 2px 2px 0; overflow-y: auto; overflow-x: hidden; } .ChatPane.isHidden { opacity: 0; visibility: hidden; pointer-events: none; } .ChatPane::-webkit-scrollbar { width: 6px; } .ChatPane::-webkit-scrollbar-thumb { background: rgba(185,135,255,.35); border-radius: 10px; border: 1px solid rgba(255,255,255,.06); } .ChatPane::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,.55); } #ChatInPut { position: absolute; left: 10px; right: 10px; bottom: 10px; height: 40px; padding: 8px 10px; font-size: 16px; color: #ddd; background: rgba(35,35,35,.88); border: 1px solid rgba(255,255,255,.10); border-radius: 12px; outline: none; opacity: 0; transition: opacity .25s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease; box-sizing: border-box; } #ChatInPut:focus { border-color: rgba(155,92,255,.60); background: rgba(45,45,45,.95); } .ChatLine { margin: 4px 0; padding: 4px 6px; border-radius: 6px; color: rgba(255,255,255,.95); font-size: 14px; line-height: 1.34; background: transparent; border-left: 2px solid rgba(155,92,255,.75); opacity: 1; transform: none; will-change: transform, opacity; transition: background .12s ease; } .ChatLine:hover { background: rgba(255,255,255,.03); } .ChatLine.isNew { opacity: 0; transform: translateY(8px) scale(0.995); animation: chatIn .22s cubic-bezier(.2,.9,.2,1) forwards; } @keyframes chatIn { to { opacity: 1; transform: translateY(0) scale(1); } } .ChatLine .ts { margin-right:6px; opacity:.55; font-weight:700; font-size:12px; letter-spacing:.02em; } .ChatLine .msg { opacity:.95; } .ChatLine .x{ margin-left:6px; opacity:.7; font-weight:900; font-size:12px; } #ChatSearch { height:34px; width:160px; padding:0 10px; border-radius:10px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.07); color:rgba(255,255,255,.88); outline:none; } #ChatSearch::placeholder { color:rgba(255,255,255,.35); } #ChatSearch:focus { border-color:rgba(155,92,255,.45); } .ChatLine.isFiltered { display:none; } .ChatLine mark { background:rgba(155,92,255,.20); color:inherit; padding:0 2px; border-radius:4px; }`,
    Logs: `#PlayerLog { position: relative; opacity: 1; pointer-events: none; transition: opacity 0.5s ease-out; } #PlayerLogBoard { position: fixed; right: 20px; top: 20px; color: #fff; font-size: 31px; text-align: left; padding: 10px; width: 220px; background-color: rgba(0, 0, 0, 0.25); border-radius: 4px; transform: translateX(100%); opacity: 0; transition: transform 0.5s ease-out, opacity 0.5s ease-out; } #PlayerLogBoard.active { transform: translateX(0%); opacity: 1; } .PlayerLogHolder { overflow: hidden; white-space: nowrap; } .PlayerLogitems { color: #fff; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 18px; }`,
    Menu: `#z-menu { position: fixed; top: 50%; left: 50%; width: 920px; max-width: 95%; height: 680px; max-height: 90%; transform: translate(-50%, -50%) scale(0.975); background: linear-gradient(180deg, #181818, #242424); border-radius: 24px; color: #E0E0E0; font-family: 'Roboto', Arial, sans-serif; font-size: 16px; opacity: 0; pointer-events: none; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease; z-index: 9999; overflow: hidden; will-change: transform, opacity; } #z-menu.open { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); } .z-menu-body { display: flex; height: calc(100% - 85px); } .z-content { flex: 1; padding: 20px; overflow-y: auto; font-size: 16px; line-height: 1.5; background: #0f0f0f; border-radius: 0 0 12px 0; } .z-page { display: none; } .z-page.active { display: block; } #z-menu .z-content { overflow-y: auto; padding-right: 8px; } #z-menu .z-content::-webkit-scrollbar { width: 6px; } #z-menu .z-content::-webkit-scrollbar-track { background: transparent; margin: 4px 0; } #z-menu .z-content::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.6); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 0 4px rgba(155,92,255,0.4); transition: all 0.3s; } #z-menu .z-content::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,0.8); box-shadow: 0 0 8px rgba(185,135,255,0.6); } #z-menu .z-content { scrollbar-width: thin; scrollbar-color: rgba(155,92,255,0.6) transparent; } .z-menu-header { height: 85px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(100,100,100,0.2); background: rgba(15,15,15,0.95); font-weight: 800; color: #9B5CFF; text-shadow: 0 0 6px rgba(155,92,255,0.8); box-shadow: 0 2px 6px rgba(0,0,0,0.5); } .z-title-container { display: flex; flex-direction: column; justify-content: center; } .z-title { font-size: 36px; font-weight: 900; letter-spacing: 0.005em;background: linear-gradient(90deg, #9B5CFF 0%, #B987FF 65%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; text-shadow: 0 1px 5px rgba(155,92,255,0.28); line-height: 1.04; } .z-sec-title { margin: 14px 4px 10px; font-size: 14px; font-weight: 900; letter-spacing: .10em; text-transform: uppercase; color: rgba(255,255,255,0.75);background: linear-gradient(90deg, rgba(155,92,255,.28) 0%, rgba(155,92,255,.08) 55%, transparent 85%);padding: 6px 10px;border-radius: 10px; border-left: 3px solid #9B5CFF;user-select: none; } .z-subtitle { font-size: 14px; color: rgba(255,255,255,0.55); letter-spacing: 0.04em; line-height: 1; } .z-header-right { display: flex; align-items: center; gap: 8px; } .z-iconbtn{ width:34px;height:34px;border-radius:10px; display:flex;align-items:center;justify-content:center; background:rgba(25,25,25,.9); border:1px solid rgba(155,92,255,.25); color:rgba(255,255,255,.85); cursor:pointer; transition:.2s transform,.2s border-color,.2s background; user-select:none; } .z-iconbtn:hover{ transform:scale(1.06); border-color:#9B5CFF; background:rgba(155,92,255,.10); } .z-iconbtn.active{ border-color:#B987FF; color:#B987FF; box-shadow:0 0 10px rgba(155,92,255,.20); } .z-search-input { padding: 6px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(30,30,30,0.9); color: #E0E0E0; font-size: 14px; outline: none; transition: all 0.25s; width: 180px; } .z-search-input:focus { background: rgba(155,92,255,0.1); border-color: #9B5CFF; box-shadow: 0 0 6px rgba(155,92,255,0.4); } .z-close { cursor: pointer; font-size: 28px; opacity: 0.75; transition: opacity 0.25s, transform 0.25s; } .z-close:hover { opacity: 1; transform: scale(1.2); } .z-sidebar { width: 200px; background: linear-gradient(180deg,#121212,#1c1c1c); border-right: 1px solid rgba(100,100,100,0.2); padding: 12px; display: flex; flex-direction: column; gap: 12px; } .z-tab { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; cursor: pointer; opacity: 0.85; font-weight: 600; font-size: 16px; transition: all 0.3s; position: relative; } .z-tab i { width: 34px; height: 34px; border-radius: 10px; background: #161616; border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.65); display: flex; align-items: center; justify-content: center; transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease; } .z-tab:hover i { background: #1c1c1c; color: #ffffff; transform: translateX(1px); } .z-tab.active i { background: #0f2530; border-color: #9B5CFF; color: #9B5CFF; } .z-tab::before { content: ""; position: absolute; left: -6px; top: 8px; bottom: 8px; width: 3px; border-radius: 2px; background: transparent; transition: background 0.2s; } .z-tab.active::before { background: #9B5CFF; } .z-tab.active { background: rgba(155,92,255,0.15); color: #fff; font-weight: 700; box-shadow: inset 0 0 12px rgba(155,92,255,0.35); } .z-tab.active i { color: #fff; background: rgba(155,92,255,0.25); box-shadow: 0 0 12px rgba(155,92,255,0.45); } .z-tab:hover { transform: translateX(3px); opacity: 1; } .z-tab-text { display: flex; flex-direction: column; line-height: 1.1; } .z-tab-title { font-size: 15px; font-weight: 600; } .z-tab-desc { font-size: 11px; opacity: 0.55; transition: opacity 0.3s; } .z-tab:hover .z-tab-desc, .z-tab.active .z-tab-desc { opacity: 0.85; } .z-option { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 12px; border-radius: 14px; background: rgba(30,30,30,0.85); border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s; box-shadow: 0 2px 6px rgba(0,0,0,0.3); } .z-option:hover { background: rgba(155,92,255,0.08); } .z-option i { font-size: 22px; margin-right: 12px; color: #9B5CFF; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 6px; background: linear-gradient(145deg, #1a1a1a, #111111); border: 2px solid rgba(155,92,255,0.3); transition: all 0.25s ease; } .z-option:hover i { border-color: #B987FF; background: linear-gradient(145deg, #222222, #0f0f0f); } .z-option-text { display: flex; flex-direction: column; justify-content: center; flex: 1; overflow: hidden; } .z-option-title { font-size: 15px; font-weight: 600; color: #E0E0E0; } .z-option-desc { font-size: 12px; color: rgba(255,255,255,0.6); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } .z-checkbox { width: 46px; height: 24px; border-radius: 20px; background: #222; position: relative; cursor: pointer; transition: background 0.25s; flex-shrink: 0; } .z-checkbox::after { content: ""; width: 20px; height: 20px; background: #888; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.25s, background 0.25s; } .z-checkbox.active { background: rgba(155,92,255,0.4); } .z-checkbox.active::after { transform: translateX(22px); background: #B987FF; } .z-select-wrapper { position: relative; width: 160px; font-size: 14px; user-select: none; } .z-select-display { padding: 8px 36px 8px 12px; background: linear-gradient(145deg,#1a1a1a,#111); border: 1px solid rgba(155,92,255,0.25); border-radius: 12px; color: #E6E6E6; cursor: pointer; position: relative; transition: all 0.25s ease, box-shadow 0.3s ease; box-shadow: inset 0 1px 2px rgba(255,255,255,0.05); } .z-select-display:hover { border-color: #9B5CFF; background: linear-gradient(145deg,#222,#0f0f0f); } .z-select-wrapper.open .z-select-display { border-color: #9B5CFF; box-shadow: 0 0 8px rgba(155,92,255,0.35), inset 0 1px 2px rgba(255,255,255,0.05); } .z-select-display::after { content: "<"; position: absolute; top: 50%; right: 12px; transform: translateY(-50%) rotate(0deg); color: #9B5CFF; font-size: 12px; transition: transform 0.3s ease, color 0.25s ease; } .z-select-wrapper.open .z-select-display::after { transform: translateY(-50%) rotate(-90deg); color: #B987FF; } .z-select-dropdown { position: absolute; top: calc(100% + 6px); left: 0; width: 100%; background: linear-gradient(145deg,#121212,#1a1a1a); border: 1px solid rgba(155,92,255,0.25); border-radius: 10px; overflow-y:auto; max-height: 0; opacity: 0; pointer-events: none; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, box-shadow 0.25s ease; z-index: 1000; box-shadow: 0 6px 16px rgba(0,0,0,0.6), inset 0 1px 4px rgba(255,255,255,0.05); } .z-select-wrapper.open .z-select-dropdown { max-height: 220px; opacity: 1; pointer-events: auto; } .z-select-option { padding: 10px 14px; color: #E0E0E0; cursor: pointer; transition: all 0.2s ease; border-left: 3px solid transparent; border-radius: 6px; } .z-select-option:hover { background: rgba(155,92,255,0.08); color: #B987FF; border-left: 3px solid #B987FF; padding-left: 11px; } .z-select-dropdown::-webkit-scrollbar { width: 6px; } .z-select-dropdown::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.35); border-radius: 3px; } .z-select-dropdown::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; } .z-select-option.is-on { background: rgba(142,204,81,0.08); color: #8ecc51; border-left-color: rgba(142,204,81,0.55); } .z-select-option.current { background: rgba(155,92,255,0.10); color: #EDE7FF; border-left-color: rgba(155,92,255,0.60); } .z-select-option.current:hover { background: rgba(155,92,255,0.18); } .z-select-option.is-on.current { background: rgba(155,92,255,0.18); color: #F2EDFF; border-left-color: rgba(142,204,81,0.95); box-shadow: inset 0 0 0 1px rgba(155,92,255,0.22), 0 0 0 1px rgba(142,204,81,0.10); } .z-select-option.is-on.current:hover { background: rgba(155,92,255,0.20); } .z-select-option.selected { background: rgba(155,92,255,0.14); color: #EDE3FF; border-left: 3px solid #9B5CFF; padding-left: 11px; box-shadow: inset 0 0 10px rgba(155,92,255,0.18); } .z-select-option.selected:hover { background: rgba(155,92,255,0.18); } .z-slider { -webkit-appearance: none; width: 160px; height: 8px; border-radius: 6px; background: linear-gradient(180deg,#1c1f22,#111315); border: 1px solid rgba(255,255,255,0.12); box-shadow: inset 0 1px 2px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.05); cursor: pointer; flex-shrink: 0; } .z-slider::-webkit-slider-runnable-track { height: 8px; border-radius: 6px; } .z-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6px; border-radius: 50%; background: linear-gradient(180deg,#B987FF,#5B1AE6); border: 1px solid rgba(255,255,255,0.35); box-shadow: 0 2px 6px rgba(155,92,255,0.45), inset 0 1px 0 rgba(255,255,255,0.5); transition: transform .15s ease; } .z-slider:active::-webkit-slider-thumb { transform: scale(1.1); } .z-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(180deg,#B987FF,#5B1AE6); border: 1px solid rgba(255,255,255,0.35); } .z-slider-value { min-width: 28px; text-align: right; font-size: 13px; color: rgba(255,255,255,0.85); } .z-color { position: relative; width: 52px; height: 30px; border-radius: 8px; background:#141414; border:1px solid rgba(255,255,255,0.12); cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.4); } .z-color-preview { width:100%; height:100%; border-radius:6px; background:#00BFFF; transition: background 0.2s; } .z-color-popup { position:absolute; right:0; top:36px; padding:10px; border-radius:12px; background:#0f0f0f; border:1px solid rgba(255,255,255,0.08); box-shadow:0 10px 24px rgba(0,0,0,0.7); display:none; z-index:10000; } .z-color.open .z-color-popup { display:block; } .z-sv-wrap { position: relative; width: 160px; height: 120px; border-radius: 6px; overflow: hidden; } .z-sv { display: block; width: 160px; height: 120px; margin: 0; padding: 0; border: 0; border-radius: 6px; cursor: crosshair; box-shadow: inset 0 0 3px rgba(0,0,0,.5); } .z-sv-cursor { position: absolute; width: 12px; height: 12px; left: 0; top: 0; border: 2px solid #fff; border-radius: 50%; pointer-events: none; transform: translate(-6px,-6px); box-shadow: 0 0 6px rgba(0,0,0,.8), 0 0 6px rgba(255,255,255,.4); background: radial-gradient(circle at center, rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 40%, rgba(255,255,255,0) 70%); z-index: 2; } .z-sv-cursor::after { content: ""; position: absolute; left: 50%; top: 50%; width: 20px; height: 20px; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; transform: translate(-50%,-50%); } .z-hue { width:160px; height:8px; border-radius:6px; background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red); cursor:pointer; -webkit-appearance:none; margin-bottom:6px; } .z-hue::-webkit-slider-thumb { -webkit-appearance:none; width:14px;height:14px;border-radius:50%;background:#00BFFF; border:2px solid #fff; cursor:pointer; margin-top:-2px; box-shadow:0 0 3px rgba(0,0,0,0.5); } .z-color-inputs { display:flex; gap:6px; align-items:center; } .z-input { flex:1; padding:2px 4px; font-size:11px; border-radius:6px; border:none; background:#1c1c1c; color:#e0e0e0; text-align:center; max-width:70px; } .z-mode-toggle { width:40px; text-align:center; font-size:11px; color:#00BFFF; cursor:pointer; user-select:none; padding:2px 4px; border-radius:6px; background: rgba(0,191,255,0.1); transition: background 0.2s; } .z-mode-toggle:hover { background: rgba(0,191,255,0.2); } .z-submenu-btn { width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; border: 0 !important; overflow: hidden; background: rgba(155,92,255,.10); color: #B987FF; box-shadow: inset 0 0 0 2px rgba(155,92,255,.35), 0 4px 10px rgba(0,0,0,.30); transition: background .22s ease, box-shadow .22s ease, transform .08s ease, filter .18s ease; transform: translateZ(0); } .z-submenu-btn:hover { background: rgba(155,92,255,.16); box-shadow: inset 0 0 0 2px rgba(155,92,255,.65), 0 8px 18px rgba(0,0,0,.45); filter: brightness(1.08); } .z-submenu-btn:active { box-shadow: inset 0 0 0 2px rgba(155,92,255,.75), 0 2px 6px rgba(0,0,0,.25); transform: translateY(1px); } .z-submenu-btn i { margin: 0 !important; width: auto !important; height: auto !important; border: 0 !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; color: inherit !important; font-size: 18px !important; line-height: 1 !important; display: block !important; } .z-submenu-container { display: flex; flex-direction: column; max-height: 0; overflow: hidden; margin: 0; padding: 0 14px; background: rgba(35,35,35,0.95); border-radius: 14px; border: 1px solid rgba(155,92,255,0.25); opacity: 0; transition: max-height 0.35s ease, padding 0.35s ease, margin 0.35s ease, opacity 0.3s ease; } .z-submenu-container.open { display: flex; max-height: 9999px; padding: 14px; margin: 10px 0 20px 0; opacity: 1; position: relative; z-index: 20; overflow: visible; } .z-submenu-container .z-option { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 12px; background: rgba(30,30,30,0.9); transition: background 0.25s, transform 0.2s; margin-bottom: 10px; } .z-submenu-container .z-option:last-child { margin-bottom: 0; } .z-submenu-container .z-option:hover { background: rgba(155,92,255,0.1); } .z-submenu-container .z-option i { font-size: 20px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: #9B5CFF; border-radius: 6px; background: linear-gradient(145deg,#1c1c1c,#0f0f0f); border: 2px solid rgba(155,92,255,0.3); flex-shrink: 0; } .z-submenu-container .z-option-text { display: flex; flex-direction: column; flex: 1; } .z-submenu-container .z-option-title { font-size: 14px; font-weight: 600; color: #E0E0E0; } .z-submenu-container .z-sec-title { font-size: 12px;} .z-submenu-container .z-option-desc { font-size: 11px; color: rgba(255,255,255,0.6); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } .z-submenu-btn:focus, .z-submenu-btn:focus-visible { outline: none !important; box-shadow: none !important; } .z-loadout-display { display:flex; align-items:center; gap:10px; padding:8px 10px; min-width:170px; border-radius:12px; background:linear-gradient(145deg,#1a1a1a,#111); border:1px solid rgba(155,92,255,.25); cursor:pointer; transition:background .25s,border-color .25s,box-shadow .25s; box-sizing:border-box; } .z-loadout-display:hover { background:linear-gradient(145deg,#222,#0f0f0f); border-color:#9B5CFF; box-shadow:0 0 8px rgba(155,92,255,.25); } .z-loadout-mini { width:26px; height:26px; image-rendering:pixelated; filter:drop-shadow(0 2px 3px rgba(0,0,0,.6)); flex-shrink:0; } .z-loadout-name { font-size:12px; font-weight:800; color:rgba(255,255,255,.85); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px; } .z-loadout-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.45); opacity:0; pointer-events:none; transition:opacity .35s; z-index:100000; padding:12px; box-sizing:border-box; } .z-loadout-modal.open { opacity:1; pointer-events:auto; } .z-loadout-panel { width:min(520px,92vw); max-height:74vh; display:flex; flex-direction:column; border-radius:16px; background:linear-gradient(180deg,#121212,#0c0c0c); border:1px solid rgba(255,255,255,.08); box-shadow:0 22px 50px rgba(0,0,0,.85); overflow:hidden; box-sizing:border-box; opacity:0; transform:translateY(16px); transition:opacity .35s,transform .45s cubic-bezier(.4,0,.2,1); } .z-loadout-modal.open .z-loadout-panel { opacity:1; transform:translateY(0); } .z-loadout-top { position:sticky; top:0; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid rgba(255,255,255,.08); background:rgba(15,15,15,.96); box-sizing:border-box; } .z-loadout-title { font-size:14px; font-weight:900; color:#9B5CFF; text-shadow:0 0 6px rgba(155,92,255,.55); letter-spacing:.2px; } .z-loadout-close { font-size:22px; line-height:1; cursor:pointer; opacity:.75; transition:opacity .2s,transform .2s; color:rgba(255,255,255,.85); padding:0 2px; } .z-loadout-close:hover { opacity:1; transform:scale(1.15); } .z-loadout-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(78px,1fr)); gap:8px; padding:10px; flex:1; min-height:0; overflow-y:auto; overflow-x:hidden; align-content:start; box-sizing:border-box; opacity:0; transform:translateY(6px); transition:opacity .45s ease .05s,transform .55s cubic-bezier(.4,0,.2,1) .05s; } .z-loadout-modal.open .z-loadout-grid { opacity:1; transform:translateY(0); } .z-loadout-card { position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px; border-radius:12px; background:rgba(30,30,30,.85); border:1px solid rgba(255,255,255,.08); cursor:pointer; transition:background .25s,border-color .25s,box-shadow .25s,transform .35s; box-sizing:border-box; } .z-loadout-card:hover { background:rgba(155,92,255,.08); border-color:rgba(155,92,255,.35); transform:translateY(-2px); } .z-loadout-card.active { background:rgba(155,92,255,.16); border-color:#9B5CFF; box-shadow:inset 0 0 12px rgba(155,92,255,.22); } .z-loadout-img { width:42px; height:42px; image-rendering:pixelated; filter:drop-shadow(0 2px 3px rgba(0,0,0,.7)); } .z-loadout-tag { margin-top:5px; font-size:10px; font-weight:800; color:rgba(255,255,255,.7); text-align:center; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } .z-loadout-grid::-webkit-scrollbar { width: 6px; } .z-loadout-grid::-webkit-scrollbar-track { background: transparent; } .z-loadout-grid::-webkit-scrollbar-thumb { background: rgba(155, 92, 255, 0.45); border-radius: 10px; } .z-loadout-grid::-webkit-scrollbar-thumb:hover { background: rgba(185, 135, 255, 0.75); } .z-loadout-grid { scrollbar-width: thin; scrollbar-color: rgba(155, 92, 255, 0.45) transparent; } .z-inputbox { width: 110px; height: 28px; padding: 0 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(18,18,18,0.9); color: rgba(255,255,255,0.9); font-weight: 800; font-size: 12px; outline: none; box-sizing: border-box; text-align: right; font-variant-numeric: tabular-nums; } .z-inputbox:focus { border-color: rgba(155,92,255,0.55); box-shadow: 0 0 0 3px rgba(155,92,255,0.10); } .z-inputbox.key-listen { border-color:#9B5CFF; box-shadow: 0 0 0 3px rgba(155,92,255,0.14); } .z-inputbox[type="number"]::-webkit-outer-spin-button, .z-inputbox[type="number"]::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; } .z-inputbox[type="number"]{ width: 62px; max-width: 62px; font-size: 13px; } .z-perf-card { position:relative; padding:14px; border-radius:16px; background:rgba(30,30,30,.85); border:1px solid rgba(255,255,255,.08); box-shadow:0 2px 8px rgba(0,0,0,.35); overflow:hidden; width:100%; box-sizing:border-box; margin-bottom:12px; } .z-perf-card::before { content:""; position:absolute; inset:0; background:radial-gradient(600px 180px at -10% -20%, rgba(155,92,255,.18), transparent 55%); pointer-events:none; } .z-perf-head { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; position:relative; z-index:1; } .z-perf-left { display:flex; align-items:center; gap:10px; } .z-perf-ico { width:38px; height:38px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:linear-gradient(145deg,#1a1a1a,#111); border:2px solid rgba(155,92,255,.28); color:#9B5CFF; box-shadow:inset 0 0 10px rgba(155,92,255,.12); } .z-perf-name { font-size:13px; font-weight:900; color:rgba(255,255,255,.86); } .z-perf-meta { display:flex; gap:10px; font-size:12px; color:rgba(255,255,255,.65); font-weight:800; white-space:nowrap; } .z-perf-meta b { color:rgba(255,255,255,.92); } .z-perf-canvas { width:100%; height:110px; display:block; border-radius:12px; background:rgba(12,12,12,.85); border:1px solid rgba(255,255,255,.06); box-shadow:inset 0 0 0 1px rgba(0,0,0,.35); position:relative; z-index:1; image-rendering:crisp-edges; } .z-perf-foot { margin-top:8px; font-size:11px; color:rgba(255,255,255,.55); position:relative; z-index:1; display:flex; justify-content:space-between; } .z-perf-foot span:last-child { font-weight:700; } .z-perf-break { clear:both; height:0; display:block; } .z-stat { position:relative; padding:14px 14px 12px; border-radius:16px; background: rgba(30,30,30,0.85); border:1px solid rgba(255,255,255,0.08); box-shadow: 0 2px 8px rgba(0,0,0,0.35); overflow:hidden; } .z-stat::before { content:""; position:absolute; inset:0; background: radial-gradient(600px 180px at -10% -20%, rgba(155,92,255,0.20), transparent 55%); pointer-events:none; } .z-stat-top { display:flex; align-items:center; gap:10px; margin-bottom:10px; } .z-stat-ico { width:38px; height:38px; border-radius:12px; display:flex; align-items:center; justify-content:center; background: linear-gradient(145deg,#1a1a1a,#111); border: 2px solid rgba(155,92,255,0.28); color:#9B5CFF; box-shadow: inset 0 0 10px rgba(155,92,255,0.12); } .z-stat-name { font-size:13px; font-weight:800; color: rgba(255,255,255,.82); } .z-stat-row { display:flex; align-items:baseline; justify-content:space-between; gap:10px; } .z-stat-big { font-size:22px; font-weight:900; color:#FFFFFF; line-height:1; } .z-stat-total { font-size:12px; color: rgba(255,255,255,.55); font-weight:700; } .z-stat-total b { color: rgba(255,255,255,.85); font-weight:900; } .z-stat-foot { margin-top:10px; height:6px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden; } .z-stat-bar { height:100%; width:0%; background: linear-gradient(90deg, rgba(155,92,255,0.25), rgba(155,92,255,0.75)); border-radius:999px; box-shadow: 0 0 10px rgba(155,92,255,0.35); } .z-stat-break { clear:both; height:0; display:block; } .z-stat.is-playtime #PlaytimeStat-totalWrap { display:flex; align-items:center; justify-content:flex-end; gap:6px; white-space:nowrap; } .z-stat.is-playtime #PlaytimeStat-total { display:inline; font-size:11px; font-weight:900; line-height:1; max-width: 76px; overflow:hidden; text-overflow:ellipsis; }`,
  },

  Menu: {
    visible: false,
    MenuKey: "`",
    menu: null,
    tabs: null,
    pages: null,
    closeBtn: null,
    searchInput: null,
    storeKey: "zmenu.settings.v1",
    autoKey: "zmenu.autosave",
    autoSave: true,
    _saveKeys: null,
    _defaults: null,
    _flatOpts: null,
    _subMem: new Set(),
    generateUI(options, pageId) {
      const iconMap = {
        checkbox: "check_box",
        slider: "tune",
        Input: "keyboard",
        Colors: "palette",
        selector: "list",
        Loadout: "checkroom",
        SelecBox: "toggle_on",
        Graph: "show_chart",
        Stat: "insights",
        text: "info",
        Header: "title",
      },
        getIcon = (type) => iconMap[type] || "settings";
      const createElement = ({
        type,
        id,
        title,
        onChange,
        description,
        suboptions,
        icon,
      }) => {
        const hasSub = suboptions && suboptions.length > 0;
        const subBtn = hasSub
          ? `<button class="z-submenu-btn" type="button"> <i class="material-icons">tune</i></button>`
          : "";
        const rightWrap = (inner) =>
          `<div style="display:flex;align-items:center;gap:8px">${subBtn}${inner || ""}</div>`;
        const elements = {
          Header: `<div class="z-sec-title">${title}</div>`,
          text: `<div class="z-option" data-type="text" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${hasSub ? rightWrap("") : ""}</div>`,
          checkbox: `<div class="z-option" data-type="checkbox" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<div class="z-checkbox ${(onChange?.[0]?.[1] ?? false) ? "active" : ""}" id="${id}" data-value="${onChange?.[0]?.[1] ?? false}"></div>`)}</div>`,
          slider: `<div class="z-option" data-type="slider" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<input type="range" class="z-slider" id="${id}"min="${onChange?.[0]?.[2]?.[0] ?? 0}"max="${onChange?.[0]?.[2]?.[1] ?? 100}"value="${onChange?.[0]?.[1] ?? 0}"step="${onChange?.[0]?.[3] ?? 1}"><div class="z-slider-value" id="${id}Value">${onChange?.[0]?.[1] ?? 0}</div>`)}</div>`,
          Input: `<div class="z-option" data-type="Input" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<input class="z-inputbox" id="${id}"type="${onChange?.[0]?.[2]?.kind === "number" ? "number" : "text"}"value="${onChange?.[0]?.[1] ?? ""}"placeholder="${onChange?.[0]?.[2]?.placeholder || ""}"${onChange?.[0]?.[2]?.maxLen ? `maxlength="${onChange[0][2].maxLen}"` : ""}${onChange?.[0]?.[2]?.kind === "number" ? `min="${onChange[0][2].min ?? ""}" max="${onChange[0][2].max ?? ""}" step="${onChange[0][2].step ?? 1}"` : ""}autocomplete="off" spellcheck="false"/>`)}</div>`,
          selector: `<div class="z-option" data-type="selector" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<div class="z-select-wrapper" id="${id}"><div class="z-select-display" id="${id}Value">${onChange?.[0]?.[1] ?? ""}</div><div class="z-select-dropdown" id="${id}Options">${(Array.isArray(onChange?.[0]?.[2]) ? onChange[0][2] : onChange?.[0]?.[2] != null ? [onChange[0][2]] : []).map((opt) => `<div class="z-select-option" data-value="${opt}">${opt}</div>`).join("")}</div></div>`)}</div>`,
          Colors: `<div class="z-option" data-type="Colors" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<div class="z-color" id="${id}" data-setting="${id}"><div class="z-color-preview" style="background:${onChange?.[0]?.[1] || "#ffffff"}"></div><div class="z-color-popup"><div class="z-sv-wrap"><canvas class="z-sv" width="160" height="120"></canvas></div><input class="z-hue" type="range" min="0" max="360" value="200"><div class="z-color-inputs"><input class="z-input" type="text" value="${onChange?.[0]?.[1] || "#ffffff"}"><div class="z-mode-toggle">HEX</div></div></div></div>`)}</div>`,
          Loadout: `<div class="z-option" data-type="Loadout" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(`<div class="z-loadout-display" id="${id}" data-setting="${id}"><img class="z-loadout-mini" src="${onChange?.[0]?.[1]?.img || onChange?.[0]?.[1]}"><span class="z-loadout-name" id="${id}Name">${onChange?.[0]?.[2]?.name || onChange?.[0]?.[2]}</span></div>`)}</div>`,
          SelecBox: `<div class="z-option" id="${id}" data-type="SelecBox" data-setting="${id}"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div>${rightWrap(
            `<div style="display:flex;align-items:center;gap:10px"><div class="z-checkbox" id="${id}-chk"></div><div class="z-select-wrapper" id="${id}-sel"><div class="z-select-display" id="${id}-selValue"></div><div class="z-select-dropdown" id="${id}-selOptions">${(Array.isArray(
              onChange?.[0],
            )
              ? onChange[0]
              : []
            )
              .filter((x) => Array.isArray(x))
              .map(
                ([name]) =>
                  `<div class="z-select-option" data-value="${name}">${name}</div>`,
              )
              .join("")}</div></div></div>`,
          )}</div>`,
          Graph: `<div class="z-perf-card" data-type="Graph" data-setting="${id}" id="${id}"><div class="z-perf-head"><div class="z-perf-left"><div class="z-perf-ico"><i class="material-icons">${icon || getIcon(type)}</i></div><div class="z-perf-name" id="${id}-name">${title || ""}</div></div><div class="z-perf-meta"><span>Avg <b id="${id}-avg">0</b></span><span>Low <b id="${id}-min">0</b></span><span>High <b id="${id}-max">0</b></span></div></div><canvas class="z-perf-canvas" id="${id}-canvas" width="560" height="120"></canvas><div class="z-perf-foot"><span id="${id}-range">Last ~60s</span><span><b id="${id}-now">0</b></span></div></div>`,
          Stat: `<div class="z-stat" id="${id}" data-stat="${id}"><div class="z-stat-top"><div class="z-stat-ico"><i class="material-icons">${icon || getIcon(type)}</i></div><div class="z-stat-name">${title || id}</div></div><div class="z-stat-row"><div class="z-stat-big" id="${id}-val">0</div><div class="z-stat-total" id="${id}-totalWrap">Total: <b id="${id}-total">0</b></div></div><div class="z-stat-foot"><div class="z-stat-bar" id="${id}-bar"></div></div></div>`,
          submenu: hasSub
            ? `<div class="z-submenu-container" id="${id}-sub">${suboptions.map(createElement).join("")}</div>`
            : "",
        };

        return (elements[type] || "") + (elements.submenu || "");
      };
      const optionsHTML = options.map(createElement).join("");
      return optionsHTML;
    },
    Notify(onChange, title, format) {
      if (!onChange?.[1]) return () => { };
      const [n, l] = Array.isArray(onChange[1])
        ? onChange[1]
        : [onChange[1], onChange[1]];
      return (value, label = title) => {
        if (this._silent) return;
        const lab = typeof label === "function" ? label(value) : label;
        const v = format ? format(value) : value;
        const isBool = typeof value === "boolean";
        const text = isBool ? (value ? "ON" : "OFF") : (v ?? "—");
        if (n)
          AB.NotiDisplay.add(
            `${lab}: ${text}`,
            isBool ? (value ? "#9B5CFF" : "#ff4d4d") : "#B987FF",
          );
        if (l) console.log(`${lab}: ${text}`);
      };
    },
    initOptionHandlers(options, pageId) {
      const container = document.getElementById(`page-${pageId}`);
      if (!container) return;
      const flatten = (opts) =>
        opts.reduce(
          (a, b) => [...a, b, ...(b.suboptions ? flatten(b.suboptions) : [])],
          [],
        ),
        allOpts = flatten(options);

      allOpts.forEach(({ type, id, onChange, title, suboptions }) => {
        if (type === "Header" || (type === "text" && !onChange)) return;
        const el = container.querySelector(`#${id}`),
          valDisp = container.querySelector(`#${id}Value`);

        if (!el || !onChange) return;

        const save = () => this.queueSave();
        this.keyCombo ||= (e) => {
          const k = e?.key || "";
          if (!k) return "";
          if (/^F\d{1,2}$/.test(k)) return "";
          const mods = [];
          if (e.ctrlKey) mods.push("Ctrl");
          if (e.altKey) mods.push("Alt");
          if (e.shiftKey) mods.push("Shift");
          if (e.metaKey) mods.push("Meta");
          return (mods.length ? mods.join("+") + "+" : "") + k;
        };
        const handlers = {
          checkbox: () => {
            el.onfocus = () => el.blur();
            const [idKey, defVal = false] = Array.isArray(onChange?.[0])
              ? [onChange[0][0], onChange[0][1] ?? false]
              : [onChange?.[0], false],
              k = `__${idKey}`;
            if (this[k] === undefined) this[k] = this[idKey] ?? defVal;
            const sync = (c) =>
              el &&
              (el.classList.toggle("active", c), (el.dataset.value = c)),
              notify = this.Notify(onChange, title, (c) => (c ? "ON" : "OFF"));
            Object.defineProperty(this, idKey, {
              get: () => this[k],
              set: (v) => ((this[k] = v), sync(v), notify(v)),
              configurable: true,
            });
            sync(this[idKey]);
            el.onclick = () => {
              const c = !el.classList.contains("active");
              this[idKey] !== c && (this[idKey] = c);
            };
          },
          Input: () => {
            const cfg = Array.isArray(onChange?.[0]) ? onChange[0] : [],
              [idKey, defVal = "", metaRaw] = cfg,
              meta = metaRaw && typeof metaRaw === "object" ? metaRaw : {};
            if (!idKey) return;
            const kind = meta.kind || "text",
              [n, l] = Array.isArray(onChange?.[1])
                ? onChange[1]
                : [onChange?.[1], onChange?.[1]],
              notify = this.Notify(onChange, title),
              log = (v) => notify(v),
              clamp = (v, a, b) => Math.min(b, Math.max(a, v)),
              same = (a, b) => String(a ?? "") === String(b ?? ""),
              rnd = (a) => a[(Math.random() * a.length) | 0];
            this[idKey] ??= defVal;
            const canonKey = (v) => {
              v = v == null ? "" : String(v);
              if (/^F\d{1,2}$/.test(v)) return v;
              if (/^Arrow(Up|Down|Left|Right)$/.test(v)) return v;
              const s = v.toLowerCase();
              if (s === "space") return " ";
              if (s === "esc" || s === "escape") return "Escape";
              if (s === "up") return "ArrowUp";
              if (s === "down") return "ArrowDown";
              if (s === "left") return "ArrowLeft";
              if (s === "right") return "ArrowRight";
              if (/^f\d{1,2}$/.test(s)) return "F" + s.slice(1);
              if (s === "shift") return "Shift";
              if (s === "ctrl" || s === "control") return "Control";
              if (s === "alt") return "Alt";
              if (s === "capslock") return "CapsLock";
              if (v.length === 1) return v;
              return v;
            };
            const KEYS = [
              ..."abcdefghijklmnopqrstuvwxyz0123456789",
              ..."-=[]\\;',./",
            ]
              .concat([
                " ",
                "Tab",
                "Enter",
                "Backspace",
                "Delete",
                "Insert",
                "Home",
                "End",
                "PageUp",
                "PageDown",
              ])
              .concat(["Up", "Down", "Left", "Right"])
              .concat(["Shift", "Control", "Alt", "CapsLock"]);
            const randKey = (_) => KEYS[(Math.random() * KEYS.length) | 0];
            const WORDS = {
              adj: "silent crimson frozen rapid ancient silver wicked golden lunar toxic brave feral dark bright swift cosmic rogue wild sharp hollow radiant stormy prime deep heavy nimble arcane solar electric velvet savage neon icy dusty molten astral phantom iron amber brutal fierce blazing cursed sacred divine royal shadowed grim vivid lucid chaotic orderly primal ethereal spectral voided glowing blessed raging steel drifting broken lethal noble mystic umbral chromatic twisted corrupted purified forgotten eternal fleeting apex".split(
                " ",
              ),
              noun: "shadow ember storm viper phantom nova glacier cipher echo raven atlas drift venom pulse halo blade frost titan mystic thorn specter orbit comet zephyr inferno delta cosmos relic onyx reaper warden havoc aurora prism vortex shard seeker falcon wolf serpent dragon phoenix leviathan sentinel guardian striker hunter stalker reaver knight assassin oracle prophet behemoth colossus wraith revenant shade crown throne spire sigil core nexus rift void abyss horizon catalyst spark flare engine forge anvil omen".split(
                " ",
              ),
              adv: "quickly silently boldly smoothly wildly brightly softly roughly secretly bravely calmly madly neatly rarely often always never slowly firmly eagerly loosely closely fiercely quietly gently loudly sharply coldly warmly violently patiently suddenly steadily endlessly briefly constantly repeatedly recklessly carefully precisely harshly eerily faintly proudly humbly blindly wisely cleverly foolishly lazily viciously brutally".split(
                " ",
              ),
            };
            const buildRandomText = (maxLen) => {
              maxLen = Math.max(1, maxLen | 0 || 15);
              const make = (pat) => pat.map((k) => rnd(WORDS[k])).join(" ");
              let out = make(["adv", "adj", "noun"]);
              if (out.length > maxLen) out = make(["adj", "noun"]);
              if (out.length > maxLen) out = make(["noun"]);
              return out.slice(0, maxLen);
            };
            const setVal = (v, notify = true) => {
              if (kind === "number") {
                let num = +v;
                if (Number.isNaN(num)) num = +defVal || 0;
                const min = meta.min != null ? +meta.min : -Infinity,
                  max = meta.max != null ? +meta.max : Infinity,
                  step = +meta.step || 1;
                num = clamp(num, min, max);
                num = Math.round(num / step) * step;
                num = clamp(num, min, max);
                this[idKey] = num;
                el.value = "" + num;
                notify && log(num);
                save();
                return;
              }
              if (kind === "key") {
                v = canonKey(v);
                this[idKey] = v;
                el.value = prettyKey(v);
                notify && log(prettyKey(v));
                save();
                return;
              }
              v = String(v ?? "");
              if (meta.maxLen) v = v.slice(0, meta.maxLen);
              this[idKey] = v;
              el.value = v;
              notify && log(v);
              save();
            };
            el.value = this[idKey] ?? defVal;
            el.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              if (kind === "key" && el._listening) return;
              if (!same(this[idKey], defVal)) setVal(defVal);
            });
            const prettyKey = (k) => {
              if (!k) return "";
              if (String(k).includes("+"))
                return String(k).split("+").map(prettyKey).join("+");
              if (k === " ") return "Space";
              if (k.startsWith("Arrow")) return k.slice(5);
              if (k.length === 1) return k;
              return k[0].toUpperCase() + k.slice(1).toLowerCase();
            };
            if (kind === "key") {
              el.readOnly = true;
              el.style.cursor = "pointer";
              const startListen = () => {
                if (el._listening) return;
                el._listening = 1;
                AB.Menu.__bindingKey = true;
                const prevRaw = this[idKey] ?? defVal ?? "";
                let timer = 0;
                el.classList.add("key-listen");
                el.value = "...";
                const stop = (restorePrev) => {
                  if (!el._listening) return;
                  el._listening = 0;
                  AB.Menu.__bindingKey = false;
                  clearTimeout(timer);
                  el.classList.remove("key-listen");
                  window.removeEventListener("keydown", onKey, true);
                  document.removeEventListener("keydown", onKey, true);
                  if (restorePrev) this[idKey] = prevRaw;
                  el.value = prettyKey(this[idKey] ?? defVal);
                  el._stopListen = null;
                };
                el._stopListen = stop;
                const onKey = (e) => {
                  try {
                    e.preventDefault();
                  } catch { }
                  try {
                    e.stopPropagation();
                  } catch { }
                  try {
                    e.stopImmediatePropagation();
                  } catch { }
                  const raw = e.key;
                  if (!raw) return;
                  if (raw === "Escape") return stop(true);
                  if (/^F\d{1,2}$/.test(raw)) return;
                  if (
                    raw === "Shift" ||
                    raw === "Control" ||
                    raw === "Alt" ||
                    raw === "Meta"
                  ) {
                    return;
                  }
                  const mods = [];
                  if (e.ctrlKey) mods.push("Ctrl");
                  if (e.altKey) mods.push("Alt");
                  if (e.shiftKey) mods.push("Shift");
                  if (e.metaKey) mods.push("Meta");
                  const combo = (mods.length ? mods.join("+") + "+" : "") + raw;
                  this[idKey] = combo;
                  el.value = prettyKey(combo);
                  log(prettyKey(combo));
                  save();
                  stop(false);
                };
                window.addEventListener("keydown", onKey, true);
                document.addEventListener("keydown", onKey, true);
                timer = setTimeout(() => stop(true), 3000);
              };
              el.addEventListener(
                "click",
                (e) => (e.preventDefault(), startListen()),
              );
              el.addEventListener("mousedown", (e) => {
                if (e.button !== 1) return;
                e.preventDefault();
                if (el._listening && el._stopListen) el._stopListen(false);
                setVal(randKey());
              });
              return;
            }
            if (kind === "number") {
              const getNum = () => {
                const x = +el.value;
                return Number.isNaN(x) ? +defVal || 0 : x;
              };
              const commit = () => setVal(el.value);
              el.addEventListener(
                "wheel",
                (e) => {
                  e.preventDefault();
                  const step = +meta.step || 1,
                    min = meta.min != null ? +meta.min : -Infinity,
                    max = meta.max != null ? +meta.max : Infinity,
                    cur = getNum(),
                    dir = Math.sign(e.deltaY) < 0 ? 1 : -1,
                    next = clamp(cur + dir * step, min, max);
                  if (next === cur) return;
                  setVal(next);
                },
                { passive: false },
              );
              el.addEventListener("mousedown", (e) => {
                if (e.button !== 1) return;
                e.preventDefault();
                const min = meta.min != null ? +meta.min : 0,
                  max = meta.max != null ? +meta.max : min + 100,
                  step = +meta.step || 1,
                  count = Math.floor((max - min) / step) + 1;
                if (count <= 0) return;
                const cur = getNum();
                let r = min + ((Math.random() * count) | 0) * step;
                if (r === cur && count > 1)
                  r =
                    min +
                    (((((r - min) / step) | 0) +
                      1 +
                      ((Math.random() * (count - 1)) | 0)) %
                      count) *
                    step;
                if (r === cur) return;
                setVal(r);
              });
              el.addEventListener("change", commit);
              el.addEventListener("blur", commit);
              return;
            }
            {
              const commit = () => setVal(el.value);
              if (meta.live)
                el.addEventListener("input", () => setVal(el.value, false));
              el.addEventListener("change", commit);
              el.addEventListener("blur", commit);
              el.addEventListener("mousedown", (e) => {
                if (e.button !== 1) return;
                e.preventDefault();
                setVal(buildRandomText(meta.maxLen || 15));
              });
            }
          },
          slider: () => {
            const cfg = Array.isArray(onChange?.[0])
              ? onChange[0]
              : [onChange?.[0], 0, [0, 0], 1],
              [idKey, defVal = 0, range = [0, 0], step = 1] = cfg;
            if (!idKey) return;
            const [min, max] = range,
              dp = (step + "").split(".")[1]?.length || 0;
            this[idKey] ??= defVal;
            const [n, l] = Array.isArray(onChange?.[1])
              ? onChange[1]
              : [onChange?.[1], onChange?.[1]],
              notify = this.Notify(onChange, title),
              log = (v) => notify(v),
              clamp = (v) => Math.min(max, Math.max(min, +v)),
              snap = (v) =>
                +(Math.round((clamp(v) - min) / step) * step + min).toFixed(dp),
              sync = (v) => (
                (v = snap(v)),
                this[idKey] === v ||
                ((this[idKey] = v),
                  (el.value = "" + v),
                  valDisp &&
                  !valDisp._editing &&
                  (valDisp.textContent = "" + v),
                  log(v),
                  save())
              );
            el.min = min;
            el.max = max;
            el.step = step;
            el.value = "" + snap(this[idKey]);
            valDisp &&
              ((valDisp.textContent = "" + el.value),
                (valDisp.style.cursor = "pointer"));
            el.addEventListener("input", () => {
              const v = snap(el.value);
              this[idKey] = v;
              valDisp && !valDisp._editing && (valDisp.textContent = "" + v);
              log(v);
            });
            el.addEventListener("change", () => sync(el.value));
            el.addEventListener(
              "wheel",
              (e) => (
                e.preventDefault(),
                sync(+el.value - Math.sign(e.deltaY) * step)
              ),
              { passive: false },
            );
            el.addEventListener("mousedown", (e) =>
              e.button === 1
                ? (e.preventDefault(),
                  sync(
                    min +
                    ((Math.random() * (Math.floor((max - min) / step) + 1)) |
                      0) *
                    step,
                  ))
                : e.button === 2 && (e.preventDefault(), sync(defVal)),
            );
            if (!valDisp) return;
            const startEdit = () => {
              if (valDisp._editing) return;
              valDisp._editing = 1;
              const prev = "" + snap(this[idKey]),
                input = document.createElement("input");
              input.type = "number";
              input.className = "z-inputbox";
              input.min = min;
              input.max = max;
              input.step = step;
              input.value = prev;
              input.autocomplete = "off";
              input.spellcheck = false;
              input.inputMode = "decimal";
              const stopEvt = (ev) => (
                ev.preventDefault(),
                ev.stopPropagation()
              );
              ["pointerdown", "mousedown", "click"].forEach((t) =>
                input.addEventListener(t, stopEvt, { passive: false }),
              );
              input.addEventListener(
                "wheel",
                (ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  const dir = Math.sign(ev.deltaY) < 0 ? 1 : -1;
                  input.value =
                    "" + snap((+input.value || snap(this[idKey])) + dir * step);
                  sync(input.value);
                },
                { passive: false },
              );
              const apply = () => {
                valDisp._editing = 0;
                try {
                  input.remove();
                } catch { }
                valDisp.textContent = "" + snap(input.value);
                sync(input.value);
              },
                cancel = () => {
                  valDisp._editing = 0;
                  try {
                    input.remove();
                  } catch { }
                  valDisp.textContent = prev;
                },
                outside = (ev) =>
                  ev.target === input ||
                  input.contains(ev.target) ||
                  (document.removeEventListener("pointerdown", outside, true),
                    cancel());
              document.addEventListener("pointerdown", outside, true);
              valDisp.textContent = "";
              valDisp.appendChild(input);
              input.focus();
              input.select();
              input.addEventListener(
                "keydown",
                (ev) => (
                  ev.stopPropagation(),
                  ev.key === "Enter"
                    ? (document.removeEventListener(
                      "pointerdown",
                      outside,
                      true,
                    ),
                      apply())
                    : ev.key === "Escape"
                      ? (document.removeEventListener(
                        "pointerdown",
                        outside,
                        true,
                      ),
                        cancel())
                      : ev.key === "Tab" && ev.preventDefault()
                ),
                true,
              );
              input.addEventListener(
                "blur",
                () => (
                  document.removeEventListener("pointerdown", outside, true),
                  apply()
                ),
                true,
              );
            };
            valDisp.addEventListener(
              "click",
              (e) => (e.preventDefault(), e.stopPropagation(), startEdit()),
            );
            valDisp.addEventListener(
              "wheel",
              (e) => (
                e.preventDefault(),
                e.stopPropagation(),
                sync(+el.value - Math.sign(e.deltaY) * step)
              ),
              { passive: false },
            );
          },
          selector: () => {
            const [idKey, defVal, list = []] = Array.isArray(onChange?.[0])
              ? onChange[0]
              : [onChange?.[0], undefined, []],
              [n, l] = Array.isArray(onChange?.[1])
                ? onChange[1]
                : [onChange[1], onChange[1]],
              wrap = container.querySelector(`#${id}`),
              valueEl = container.querySelector(`#${id}Value`),
              optsCont = container.querySelector(`#${id}Options`);
            if (!wrap || !valueEl || !optsCont) return;
            if (idKey && this[idKey] === undefined) this[idKey] = defVal;
            const opts = [...optsCont.querySelectorAll(".z-select-option")],
              open = (s) => wrap.classList.toggle("open", s),
              sync = (v) => (
                (valueEl.textContent = v),
                opts.forEach((o) =>
                  o.classList.toggle("selected", o.dataset.value === v),
                ),
                idKey && (this[idKey] = v)
              ),
              notify = this.Notify(onChange, title),
              pick = (v) => (sync(v), notify(v), save()),
              step = (d) => {
                if (!opts.length) return;
                let i = opts.findIndex(
                  (o) =>
                    o.dataset.value === (this[idKey] ?? valueEl.textContent),
                );
                if (i < 0)
                  i = opts.findIndex((o) => o.classList.contains("selected"));
                if (i < 0) i = 0;
                pick(opts[(i + d + opts.length) % opts.length].dataset.value);
              },
              rand = () => {
                if (!opts.length) return;
                let cur = opts.findIndex(
                  (o) =>
                    o.dataset.value === (this[idKey] ?? valueEl.textContent),
                );
                if (cur < 0) cur = 0;
                if (opts.length === 1) return pick(opts[0].dataset.value);
                pick(
                  opts[
                    (cur + 1 + ((Math.random() * (opts.length - 1)) | 0)) %
                    opts.length
                  ].dataset.value,
                );
              };
            sync(this[idKey] ?? defVal ?? opts[0]?.dataset.value ?? "");
            valueEl.onclick = (e) => (
              e.stopPropagation(),
              open(!wrap.classList.contains("open"))
            );
            opts.forEach(
              (o) =>
              (o.onclick = (e) => (
                e.stopPropagation(),
                pick(o.dataset.value),
                open(false)
              )),
            );
            document.addEventListener("click", () => open(false));
            valueEl.onwheel = (e) => (
              e.preventDefault(),
              step(Math.sign(e.deltaY) < 0 ? 1 : -1)
            );
            valueEl.onmousedown = (e) => {
              if (e.button === 1) (e.preventDefault(), rand());
            };
            valueEl.oncontextmenu = (e) => {
              e.preventDefault();
              const d = defVal ?? opts[0]?.dataset.value;
              if (this[idKey] === d) return;
              pick(d);
            };
          },
          Loadout: () => {
            const HATS = [
              { id: null, name: "None" },
              { id: 51, name: "Moo Cap" },
              { id: 50, name: "Apple Cap" },
              { id: 28, name: "Moo Head" },
              { id: 29, name: "Pig Head" },
              { id: 30, name: "Fluff Head" },
              { id: 36, name: "Pandou Head" },
              { id: 37, name: "Bear Head" },
              { id: 38, name: "Monkey Head" },
              { id: 44, name: "Polar Head" },
              { id: 35, name: "Fez Hat" },
              { id: 42, name: "Enigma Hat" },
              { id: 43, name: "Blitz Hat" },
              { id: 49, name: "Bob XIII Hat" },
              { id: 57, name: "Pumpkin" },
              { id: 8, name: "Bummle Hat" },
              { id: 2, name: "Straw Hat" },
              { id: 15, name: "Winter Cap" },
              { id: 5, name: "Cowboy Hat" },
              { id: 4, name: "Ranger Hat" },
              { id: 18, name: "Explorer Hat" },
              { id: 31, name: "Flipper Hat" },
              { id: 1, name: "Marksman Cap" },
              { id: 10, name: "Bush Gear" },
              { id: 48, name: "Halo" },
              { id: 6, name: "Soldier Helmet" },
              { id: 23, name: "Anti Venom Gear" },
              { id: 13, name: "Medic Gear" },
              { id: 9, name: "Miners Helmet" },
              { id: 32, name: "Musketeer Hat" },
              { id: 7, name: "Bull Helmet" },
              { id: 22, name: "Emp Helmet" },
              { id: 12, name: "Booster Hat" },
              { id: 26, name: "Barbarian Armor" },
              { id: 21, name: "Plague Mask" },
              { id: 46, name: "Bull Mask" },
              { id: 14, name: "Windmill Hat" },
              { id: 11, name: "Spike Gear" },
              { id: 53, name: "Turret Gear" },
              { id: 20, name: "Samurai Armor" },
              { id: 58, name: "Dark Knight" },
              { id: 27, name: "Scavenger Gear" },
              { id: 40, name: "Tank Gear" },
              { id: 52, name: "Thief Gear" },
              { id: 55, name: "Bloodthirster" },
              { id: 56, name: "Assassin Gear" },
              { id: 1001, name: "Police Hat" },
              { id: 1002, name: "Animal Hat" },
            ],
              ACCS = [
                { id: null, name: "None" },
                { id: 12, name: "Snowball" },
                { id: 9, name: "Tree Cape" },
                { id: 10, name: "Stone Cape" },
                { id: 3, name: "Cookie Cape" },
                { id: 8, name: "Cow Cape" },
                { id: 11, name: "Monkey Tail" },
                { id: 17, name: "Apple Basket" },
                { id: 6, name: "Winter Cape" },
                { id: 4, name: "Skull Cape" },
                { id: 5, name: "Dash Cape" },
                { id: 2, name: "Dragon Cape" },
                { id: 1, name: "Super Cape" },
                { id: 7, name: "Troll Cape" },
                { id: 14, name: "Thorns" },
                { id: 15, name: "Blockades" },
                { id: 20, name: "Devils Tail" },
                { id: 16, name: "Sawblade" },
                { id: 13, name: "Angel Wings" },
                { id: 19, name: "Shadow Wings" },
                { id: 18, name: "Blood Wings" },
                { id: 21, name: "Corrupt X Wings" },
              ],
              WEAPS = [
                { id: null, name: "None", src: null },
                { id: 0, name: "tool hammer", src: "hammer_1" },
                { id: 1, name: "hand axe", src: "axe_1" },
                { id: 2, name: "great axe", src: "great_axe_1" },
                { id: 3, name: "short sword", src: "sword_1" },
                { id: 4, name: "katana", src: "samurai_1" },
                { id: 5, name: "polearm", src: "spear_1" },
                { id: 6, name: "bat", src: "bat_1" },
                { id: 7, name: "daggers", src: "dagger_1" },
                { id: 8, name: "stick", src: "stick_1" },
                { id: 9, name: "hunting bow", src: "bow_1" },
                { id: 10, name: "great hammer", src: "great_hammer_1" },
                { id: 11, name: "wooden shield", src: "shield_1" },
                { id: 12, name: "crossbow", src: "crossbow_1" },
                { id: 13, name: "repeater crossbow", src: "crossbow_2" },
                { id: 14, name: "mc grabby", src: "grab_1" },
                { id: 15, name: "musket", src: "musket_1" },
                { id: 16, name: "shotgun", src: "shotgun_1" },
              ];
            const cfg = Array.isArray(onChange?.[0]) ? onChange[0] : [];
            const idKey = cfg?.[0];
            if (!idKey) return;
            let mode = cfg?.[2];
            if (
              !["hat", "acc", "pri", "sec", "weapPri", "weapSec"].includes(mode)
            ) {
              const s = `${id} ${title}`.toLowerCase();
              mode = s.includes("acc")
                ? "acc"
                : s.includes("weapsec") ||
                  s.includes("sec") ||
                  s.includes("secondary")
                  ? "sec"
                  : s.includes("weappri") ||
                    s.includes("pri") ||
                    s.includes("primary")
                    ? "pri"
                    : "hat";
            }
            mode =
              mode === "weapPri" ? "pri" : mode === "weapSec" ? "sec" : mode;
            const isPri = (w) => w.id == null || (w.id >= 0 && w.id <= 8),
              isSec = (w) => w.id == null || (w.id >= 9 && w.id <= 15),
              list =
                mode === "hat"
                  ? HATS
                  : mode === "acc"
                    ? ACCS
                    : mode === "pri"
                      ? WEAPS.filter(isPri)
                      : WEAPS.filter(isSec),
              hatUrl = (hid) =>
                `http://moomoo.io/img/hats/hat_${hid}${[11, 14, 53].includes(hid) ? "_p" : ""}.png`,
              accUrl = (aid) =>
                `http://moomoo.io/img/accessories/access_${aid}.png`,
              weapUrl = (src) =>
                `https://sandbox.moomoo.io/img/weapons/${src}.png`,
              animal = [28, 29, 30, 36, 37, 38, 44],
              base = (sid, f) =>
                sid === 1001
                  ? f % 2
                    ? 8
                    : 15
                  : sid === 1002
                    ? animal[f % animal.length]
                    : sid,
              getImg = (val, f = 0) =>
                val == null
                  ? ""
                  : mode === "acc"
                    ? accUrl(val)
                    : mode === "pri" || mode === "sec"
                      ? list.find((x) => x.id === val)?.src
                        ? weapUrl(list.find((x) => x.id === val).src)
                        : ""
                      : val === 1001 || val === 1002
                        ? hatUrl(base(val, f))
                        : hatUrl(val),
              fallback =
                cfg?.[1] !== undefined
                  ? cfg[1]
                  : mode === "hat"
                    ? 40
                    : mode === "acc"
                      ? 1
                      : null,
              disp = container.querySelector(`#${id}.z-loadout-display`),
              mini = disp?.querySelector(".z-loadout-mini"),
              nameEl = container.querySelector(`#${id}Name`);
            if (!disp || !mini || !nameEl) return;
            const defW = mode === "pri" ? 0 : mode === "sec" ? 9 : null;
            const initDef =
              fallback !== null && fallback !== undefined ? fallback : defW;
            const notify = this.Notify(onChange, title);
            const find = (v) =>
              list.find((o) => o.id === v) || { name: "Unknown" };
            const hatAnim = (v) => mode === "hat" && (v === 1001 || v === 1002);
            if (this[idKey] === undefined || this[idKey] === "")
              this[idKey] = initDef;
            if (
              (mode === "pri" || mode === "sec") &&
              !list.some((x) => x.id === this[idKey])
            )
              this[idKey] = initDef;
            let modal = null,
              grid = null,
              close = null;
            const stopAnim = () => {
              if (!modal) return;
              if (modal._animTimer) {
                clearInterval(modal._animTimer);
                modal._animTimer = null;
              }
            };
            const syncAnim = () => {
              if (mode !== "hat") return;
              const need =
                (modal && modal.classList.contains("open")) ||
                hatAnim(this[idKey]);
              if (need && !disp._animTimer) {
                disp._animFrame = disp._animFrame || 0;
                disp._animTimer = setInterval(() => {
                  const f = ++disp._animFrame,
                    cur = this[idKey];
                  if (hatAnim(cur)) mini.src = getImg(cur, f);
                }, 220);
              }
              if (!need && disp._animTimer) {
                clearInterval(disp._animTimer);
                disp._animTimer = null;
              }
              if (!modal || mode !== "hat") return;
              const mNeed =
                modal.classList.contains("open") || hatAnim(this[idKey]);
              if (mNeed && !modal._animTimer) {
                modal._animFrame = modal._animFrame || 0;
                modal._animTimer = setInterval(() => {
                  const f = ++modal._animFrame,
                    cur = this[idKey];
                  if (hatAnim(cur)) mini.src = getImg(cur, f);
                  const p =
                    grid &&
                    grid.querySelector(
                      '.z-loadout-card[data-id="1001"] .z-loadout-img',
                    );
                  if (p) p.src = getImg(1001, f);
                  const a =
                    grid &&
                    grid.querySelector(
                      '.z-loadout-card[data-id="1002"] .z-loadout-img',
                    );
                  if (a) a.src = getImg(1002, f);
                }, 220);
              }
              if (!mNeed && modal._animTimer) stopAnim();
            };
            const write = (val, doN = false) => {
              this[idKey] = val;
              const it = find(val);
              nameEl.textContent = it.name || "Unknown";
              const frame = (modal && modal._animFrame) || disp._animFrame || 0;
              const src = getImg(val, frame);
              if (!src) {
                mini.style.display = "none";
                mini.removeAttribute("src");
              } else {
                mini.style.display = "";
                mini.src = src;
              }
              doN && notify(it.name || String(val));
              save();
              syncAnim();
            };
            const buildModal = () => {
              if (modal) return;
              modal = document.createElement("div");
              modal.className = "z-loadout-modal";
              modal.id = `${id}-modal`;
              modal.innerHTML = `<div class="z-loadout-panel"><div class="z-loadout-top"><div class="z-loadout-title">${title || "Loadout"}</div><div class="z-loadout-close" data-close="${id}">&times;</div></div><div class="z-loadout-grid" id="${id}-grid"></div></div>`;
              document.body.appendChild(modal);
              grid = modal.querySelector(`#${id}-grid`);
              close = modal.querySelector(`[data-close="${id}"]`);
              close.onclick = closeModal;
              modal.addEventListener(
                "click",
                (e) => e.target === modal && closeModal(),
              );
            };
            const destroyModal = () => {
              if (!modal) return;
              stopAnim();
              modal.remove();
              modal = grid = close = null;
            };
            const render = () => {
              if (!grid) return;
              const sel = this[idKey];
              const frame = (modal && modal._animFrame) || 0;
              grid.innerHTML = list
                .map(
                  (o) =>
                    `<div class="z-loadout-card ${o.id === sel ? "active" : ""}" data-id="${o.id}">${o.id == null ? "" : `<img class="z-loadout-img" src="${getImg(o.id, frame)}">`}<div class="z-loadout-tag">${o.name}</div></div>`,
                )
                .join("");
              grid.querySelectorAll(".z-loadout-card").forEach(
                (c) =>
                (c.onclick = () => {
                  const raw = c.dataset.id;
                  const v = raw === "null" ? null : +raw;
                  write(v, true);
                  closeModal();
                }),
              );
              syncAnim();
            };
            const openModal = () => {
              buildModal();
              render();
              document.body.style.overflow = "hidden";
              modal.classList.remove("open");
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  modal.classList.add("open");
                  syncAnim();
                });
              });
            };
            const closeModal = () => {
              if (!modal) return;
              document.body.style.overflow = "";
              modal.classList.remove("open");
              const done = (e) => {
                if (e.target !== modal) return;
                modal.removeEventListener("transitionend", done, true);
                destroyModal();
                syncAnim();
              };
              modal.addEventListener("transitionend", done, true);
              setTimeout(() => {
                if (!modal) return;
                modal.removeEventListener("transitionend", done, true);
                destroyModal();
                syncAnim();
              }, 350);
            };
            if (!disp._loadoutBound) {
              disp._loadoutBound = 1;
              disp.onclick = (e) => (e.stopPropagation(), openModal());
              document.addEventListener(
                "keydown",
                (e) =>
                  e.key === "`" &&
                  modal &&
                  modal.classList.contains("open") &&
                  closeModal(),
                true,
              );
            }
            disp._setLoadout = (v) => write(v, false);
            write(this[idKey], false);
            disp.onmousedown = (e) => {
              if (e.button !== 1) return;
              e.preventDefault();
              const cur = this[idKey];
              const n = list.length;
              if (!n) return;
              let i = list.findIndex((x) => x.id === cur);
              if (i < 0) i = 0;
              write(
                list[(i + 1 + ((Math.random() * (n - 1)) | 0)) % n].id,
                true,
              );
            };
            disp.oncontextmenu = (e) => {
              e.preventDefault();
              const def = initDef;
              if (this[idKey] === def) return;
              write(def, true);
            };
            disp.onwheel = (e) => {
              e.preventDefault();
              const n = list.length;
              if (!n) return;
              let i = list.findIndex((x) => x.id === this[idKey]);
              if (i < 0) i = 0;
              i = (i + (e.deltaY < 0 ? 1 : -1) + n) % n;
              write(list[i].id, true);
            };
          },
          SelecBox: () => {
            const cfg0 = Array.isArray(onChange?.[0]) ? onChange[0] : [];
            const defSel = typeof cfg0[0] === "string" ? cfg0[0] : "";
            const pairs = cfg0.filter((x) => Array.isArray(x));
            const chkEl = container.querySelector(`#${id}-chk`);
            const wrap = container.querySelector(`#${id}-sel`);
            const valEl = container.querySelector(`#${id}-selValue`);
            const optEl = container.querySelector(`#${id}-selOptions`);
            const selKey = `__SB_${id}`;
            if (!chkEl || !wrap || !valEl || !optEl) return;
            pairs.forEach(([k, d]) => {
              if (this[k] === undefined) this[k] = !!d;
            });
            const names = pairs.map((p) => p[0]);
            const fallbackSel = defSel || names[0] || "";
            if (this[selKey] === undefined) this[selKey] = fallbackSel;
            if (!names.includes(this[selKey])) this[selKey] = fallbackSel;
            const notify = this.Notify(onChange, title);
            const open = (s) => wrap.classList.toggle("open", s);
            const isOpen = () => wrap.classList.contains("open");
            const opts = () => [...optEl.querySelectorAll(".z-select-option")];
            const getSel = () => String(this[selKey] || "");
            const setChkUI = (v) => {
              v = !!v;
              chkEl.classList.toggle("active", v);
              chkEl.dataset.value = v;
            };
            const syncUI = () => {
              const selected = getSel();
              valEl.textContent = selected;
              setChkUI(!!this[selected]);
              const list = opts();
              list.forEach((o) => {
                const name = o.dataset.value;
                const on = !!this[name];
                o.classList.toggle("is-on", on);
                o.classList.toggle("current", name === selected);
              });
            };
            const setSelected = (name) => {
              this[selKey] = String(name || "");
              if (!names.includes(this[selKey])) this[selKey] = fallbackSel;
              syncUI();
            };
            const pick = (name, doSave = true) => {
              setSelected(name);
              doSave && save();
            };
            const pickRandom = () => {
              const list = opts();
              if (!list.length) return;
              const cur = getSel();
              if (list.length === 1) return pick(list[0].dataset.value);
              let v;
              do v = list[(Math.random() * list.length) | 0].dataset.value;
              while (v === cur);
              pick(v);
            };
            const pickStep = (dir) => {
              const list = opts();
              if (!list.length) return;
              const cur = getSel();
              let idx = list.findIndex((o) => o.dataset.value === cur);
              if (idx < 0) idx = 0;
              idx = (idx + dir + list.length) % list.length;
              pick(list[idx].dataset.value);
            };
            syncUI();
            chkEl.onclick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              const selected = getSel();
              if (!selected) return;
              const next = !chkEl.classList.contains("active");
              this[selected] = next;
              setChkUI(next);
              syncUI();
              notify(!!next, selected);
              save();
            };
            valEl.onclick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              syncUI();
              open(!isOpen());
            };
            wrap.addEventListener(
              "wheel",
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                pickStep(e.deltaY > 0 ? 1 : -1);
              },
              { passive: false },
            );
            valEl.onmousedown = (e) => {
              if (e.button !== 1) return;
              e.preventDefault();
              e.stopPropagation();
              pickRandom();
            };
            valEl.oncontextmenu = (e) => {
              e.preventDefault();
              e.stopPropagation();
              const d = fallbackSel;
              if (d && d !== getSel()) pick(d);
            };
            opts().forEach((o) => {
              o.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                pick(o.dataset.value);
                open(false);
              };
            });
            document.addEventListener("click", (e) => {
              if (!wrap.contains(e.target)) open(false);
            });
          },
          Graph: () => {
            const card = container.querySelector(`#${id}`);
            if (!card) return;
            const self = this;
            const G =
              self.__graph ||
              (self.__graph = (() => {
                const MAX = 240,
                  STEP = 250,
                  graphs = new Map();
                let timer = 0,
                  active = false;
                const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
                const safe = (v) => (Number.isFinite(v) ? v : null);
                const statsOf = (arr) => {
                  let min = Infinity,
                    max = -Infinity,
                    sum = 0,
                    c = 0;
                  for (const v of arr) {
                    if (!Number.isFinite(v)) continue;
                    sum += v;
                    c++;
                    if (v < min) min = v;
                    if (v > max) max = v;
                  }
                  return c
                    ? { avg: sum / c, min, max }
                    : { avg: null, min: null, max: null };
                };
                const draw = (ctx, arr, minY, maxY) => {
                  if (!ctx) return;
                  const cvs = ctx.canvas,
                    w = cvs.width,
                    h = cvs.height;
                  ctx.clearRect(0, 0, w, h);
                  ctx.globalAlpha = 0.22;
                  ctx.fillStyle = "#fff";
                  for (let i = 1; i <= 3; i++) {
                    const y = (h * i) / 4;
                    ctx.fillRect(10, y, w - 20, 1);
                  }
                  ctx.globalAlpha = 1;
                  if (arr.length < 2) return;
                  const pad = 10;
                  const xStep = (w - pad * 2) / (MAX - 1);
                  const yOf = (v) => {
                    const t =
                      (clamp(v, minY, maxY) - minY) / (maxY - minY || 1);
                    return h - pad - t * (h - pad * 2);
                  };
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = "#B987FF";
                  ctx.lineJoin = "round";
                  ctx.lineCap = "round";
                  let x0 = pad,
                    y0 = yOf(arr[0]);
                  ctx.beginPath();
                  ctx.moveTo(x0, y0);
                  for (let i = 1; i < arr.length; i++) {
                    const x1 = pad + i * xStep,
                      y1 = yOf(arr[i]);
                    if (i < arr.length - 1) {
                      const x2 = pad + (i + 1) * xStep,
                        y2 = yOf(arr[i + 1]);
                      ctx.quadraticCurveTo(
                        x1,
                        y1,
                        (x1 + x2) / 2,
                        (y1 + y2) / 2,
                      );
                    } else {
                      ctx.lineTo(x1, y1);
                    }
                    x0 = x1;
                    y0 = y1;
                  }
                  ctx.stroke();
                  ctx.fillStyle = "#fff";
                  ctx.globalAlpha = 0.9;
                  ctx.beginPath();
                  ctx.arc(x0, y0, 3.5, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1;
                };
                const raf = {
                  fps: 0,
                  frames: 0,
                  lastT: performance.now(),
                  started: false,
                };
                const startRaf = () => {
                  if (raf.started) return;
                  raf.started = true;
                  const loop = (t) => {
                    if (active) {
                      raf.frames++;
                      if (t - raf.lastT >= 500) {
                        raf.fps = Math.round(
                          (raf.frames * 1000) / (t - raf.lastT),
                        );
                        raf.frames = 0;
                        raf.lastT = t;
                      }
                    } else {
                      raf.frames = 0;
                      raf.lastT = t;
                    }
                    requestAnimationFrame(loop);
                  };
                  requestAnimationFrame(loop);
                };
                const tick = () => {
                  if (!active || !graphs.size) return;
                  for (const g of graphs.values()) {
                    const nowRaw = safe(+(g.sample ? g.sample() : null));
                    if (nowRaw != null) {
                      const v = Math.max(0, nowRaw);
                      g.raw.push(v);
                      if (g.raw.length > MAX) g.raw.shift();
                      const a = g.alpha;
                      g.ema = g.ema == null ? v : a * v + (1 - a) * g.ema;
                      const sv = Math.max(0, g.ema);
                      g.smooth.push(sv);
                      if (g.smooth.length > MAX) g.smooth.shift();
                    }
                    const S = statsOf(g.raw);
                    if (g.now)
                      g.now.textContent = nowRaw == null ? "--" : g.fmt(nowRaw);
                    if (g.avg)
                      g.avg.textContent =
                        S.avg == null ? "--" : String(Math.round(S.avg));
                    if (g.min)
                      g.min.textContent =
                        S.min == null ? "--" : String(Math.round(S.min));
                    if (g.max)
                      g.max.textContent =
                        S.max == null ? "--" : String(Math.round(S.max));
                    let minY = 0,
                      maxY = 100;
                    if (g.range === "dynamic") {
                      const dyn = Math.max(80, (S.max || 0) + 40);
                      maxY = Math.min(400, dyn);
                    } else {
                      minY = +g.range.min || 0;
                      maxY = +g.range.max || 100;
                    }
                    draw(g.ctx, g.smooth, minY, maxY);
                  }
                };
                const start = () => {
                  if (timer || !active) return;
                  startRaf();
                  timer = setInterval(tick, STEP);
                };
                const stop = () => {
                  if (!timer) return;
                  clearInterval(timer);
                  timer = 0;
                };
                const setActive = (v) => {
                  active = !!v;
                  if (active) start();
                  else stop();
                };
                const sampler = (src) => {
                  if (typeof src === "function") return () => src();
                  if (typeof src === "string") return () => window[src];
                  if (typeof src === "number") return () => src;
                  return () => null;
                };
                const layout = (root) => {
                  if (!root) return;
                  root
                    .querySelectorAll(".z-perf-break")
                    .forEach((x) => x.remove());
                  const COLS = 2;
                  const GAP = 12;
                  const setCols = (el, cols, pos, clearBoth) => {
                    el.style.boxSizing = "border-box";
                    el.style.marginBottom = "12px";
                    el.style.float = "left";
                    el.style.width = `calc((100% - ${(cols - 1) * GAP}px) / ${cols})`;
                    el.style.marginRight = pos === cols - 1 ? "0" : GAP + "px";
                    el.style.clear = clearBoth ? "both" : "none";
                  };
                  const addBreak = (afterEl) => {
                    afterEl.insertAdjacentElement(
                      "afterend",
                      Object.assign(document.createElement("div"), {
                        className: "z-perf-break",
                      }),
                    );
                  };
                  const kids = Array.from(root.children);
                  let run = [];
                  const flush = () => {
                    if (!run.length) return;
                    let i = 0;
                    while (i < run.length) {
                      const left = run.length - i;
                      const colsThisRow = left === 1 ? 1 : Math.min(COLS, left);
                      const clearRow = i === 0;
                      if (colsThisRow === 1) {
                        run[i].style.boxSizing = "border-box";
                        run[i].style.marginBottom = "12px";
                        run[i].style.float = "none";
                        run[i].style.width = "100%";
                        run[i].style.marginRight = "0";
                        run[i].style.clear = clearRow ? "both" : "none";
                        addBreak(run[i]);
                        i += 1;
                        continue;
                      }
                      for (let pos = 0; pos < colsThisRow; pos++) {
                        setCols(
                          run[i + pos],
                          colsThisRow,
                          pos,
                          clearRow && pos === 0,
                        );
                      }
                      addBreak(run[i + colsThisRow - 1]);
                      i += colsThisRow;
                    }
                    run = [];
                  };
                  for (const el of kids) {
                    const isCard =
                      el.classList && el.classList.contains("z-perf-card");
                    if (isCard) run.push(el);
                    else flush();
                  }
                  flush();
                };
                const register = (gid, root, opt) => {
                  const cvs = root.querySelector(`#${gid}-canvas`);
                  const ctx = cvs?.getContext("2d") || null;
                  const prev = graphs.get(gid);
                  const raw = prev?.raw || [];
                  const smooth = prev?.smooth || [];
                  graphs.set(gid, {
                    id: gid,
                    ctx,
                    sample: opt.sample,
                    fmt: opt.fmt || ((v) => "" + v),
                    range: opt.range || { min: 0, max: 100 },
                    alpha: opt.alpha ?? 0.35,
                    raw,
                    smooth,
                    ema: prev?.ema ?? null,
                    avg: root.querySelector(`#${gid}-avg`),
                    min: root.querySelector(`#${gid}-min`),
                    max: root.querySelector(`#${gid}-max`),
                    now: root.querySelector(`#${gid}-now`),
                    rng: root.querySelector(`#${gid}-range`),
                  });
                  const g = graphs.get(gid);
                  if (g.rng) g.rng.textContent = "Last ~60s";
                  layout(root);
                  const firstStat = root.querySelector(".z-stat");
                  if (firstStat) firstStat.style.clear = "both";
                  if (active) start();
                };
                return {
                  register,
                  sampler,
                  raf,
                  safeNum: safe,
                  setActive,
                  layout,
                };
              })());
            const cfg = Array.isArray(onChange?.[0]) ? onChange[0] : [];
            const src = cfg?.[2];
            const isFps = `${id} ${title || ""}`.toLowerCase().includes("fps");
            const presetFps = {
              sample: () => {
                const f = G.safeNum(Number(window.fps));
                const val = f != null && f > 0 ? f : G.raf?.fps || 0;
                return Number.isFinite(val) ? Math.max(0, val) : null;
              },
              fmt: (v) => `${Math.round(v)} fps`,
              range: { min: 0, max: 120 },
              alpha: 0.4,
            };
            const custom = {
              sample: G.sampler(src),
              fmt: (v) => `${Math.round(v)}`,
              range: "dynamic",
              alpha: 0.3,
            };
            G.register(id, container, isFps ? presetFps : custom);
            if (!G._layoutBound) {
              G._layoutBound = 1;
              window.addEventListener("resize", () => G.layout(container));
            }
          },
          Stat: () => {
            const root = container;
            const card = root.querySelector(`#${id}.z-stat`);
            if (!card) return;
            const STAT_KEY = "abyss.stats.v3";
            const PLAY_KEY = "abyss.playtime.v1";
            const cfg0 = Array.isArray(onChange?.[0]) ? onChange[0] : [];
            const a0 = cfg0[0];
            const a1 = cfg0[1];
            const a2 = cfg0[2];
            const opt =
              a1 && typeof a1 === "object" && !Array.isArray(a1)
                ? a1
                : a2 && typeof a2 === "object" && !Array.isArray(a2)
                  ? a2
                  : {};
            const mode = String(opt.mode || "").toLowerCase();
            const elVal = root.querySelector(`#${id}-val`);
            const elTotal = root.querySelector(`#${id}-total`);
            const elWrap = root.querySelector(`#${id}-totalWrap`);
            const elBar = root.querySelector(`#${id}-bar`);
            const safeNum = (v) => (Number.isFinite(v) ? v : null);
            const readStore = () => {
              try {
                return JSON.parse(localStorage.getItem(STAT_KEY) || "{}");
              } catch {
                return {};
              }
            };
            const writeStore = (o) => {
              try {
                localStorage.setItem(STAT_KEY, JSON.stringify(o));
              } catch { }
            };
            const readPlay = () => {
              try {
                return JSON.parse(localStorage.getItem(PLAY_KEY) || "{}");
              } catch {
                return {};
              }
            };
            const writePlay = (o) => {
              try {
                localStorage.setItem(PLAY_KEY, JSON.stringify(o));
              } catch { }
            };
            const getFn =
              typeof opt.get === "function"
                ? opt.get
                : typeof a1 === "function"
                  ? a1
                  : typeof a0 === "function"
                    ? a0
                    : null;
            const labelKey = typeof a0 === "string" ? a0 : "";
            const totalKey = String(opt.totalKey || labelKey || id);
            const fmt =
              typeof opt.fmt === "function"
                ? opt.fmt
                : (v) => String((v ?? 0) | 0);
            const hideTotal = !!opt.hideTotal;
            const max =
              opt.max != null && Number.isFinite(+opt.max) && +opt.max > 0
                ? +opt.max
                : null;
            const barFn =
              typeof opt.bar === "function"
                ? opt.bar
                : max
                  ? (v) => Math.min(100, (Math.max(0, v) / max) * 100)
                  : null;
            if (hideTotal && elWrap) elWrap.style.display = "none";
            const initTotals = () => {
              const s = readStore();
              s.totals ||= {};
              s.prev ||= {};
              if (s.totals[totalKey] == null) s.totals[totalKey] = 0;
              if (s.prev[totalKey] == null) s.prev[totalKey] = 0;
              writeStore(s);
            };
            initTotals();
            AB.Menu.__ptStartMs ??= performance.now();
            const fmtTime = (ms) => {
              ms = Math.max(0, ms | 0);
              const sec = (ms / 1000) | 0;
              const h = (sec / 3600) | 0;
              const m = ((sec % 3600) / 60) | 0;
              const s = sec % 60;
              const p2 = (n) => String(n).padStart(2, "0");
              if (h > 0) return `${h}:${p2(m)}:${p2(s)}`;
              if (m > 0) return `${m}:${p2(s)}`;
              return `00:${p2(s)}`;
            };
            const ensurePlay = () => {
              const p = readPlay();
              if (p.totalMs == null) p.totalMs = 0;
              if (p.lastTs == null) p.lastTs = Date.now();
              writePlay(p);
              return p;
            };
            ensurePlay();
            const getPlaytime = () => {
              const sessionMs = Math.max(
                0,
                performance.now() - AB.Menu.__ptStartMs,
              );
              const p = ensurePlay();
              const now = Date.now();
              const last = Number.isFinite(+p.lastTs) ? +p.lastTs : now;
              if (document.visibilityState !== "visible") {
                p.lastTs = now;
                if (!p._saveAt || now >= p._saveAt) {
                  p._saveAt = now + 2000;
                  writePlay({ ...p });
                }
                return { sessionMs, totalMs: p.totalMs || 0 };
              }
              let dt = now - last;
              if (dt < 0) dt = 0;
              if (dt > 5000) dt = 0;
              p.lastTs = now;
              p.totalMs = (Number.isFinite(+p.totalMs) ? +p.totalMs : 0) + dt;
              if (!p._saveAt || now >= p._saveAt) {
                p._saveAt = now + 2000;
                writePlay({ ...p });
              }
              return { sessionMs, totalMs: p.totalMs };
            };
            const fixRows = () => {
              root.querySelectorAll(".z-stat-break").forEach((x) => x.remove());
              const stats = Array.from(root.querySelectorAll(".z-stat"));
              const COLS = 3;
              const GAP = 12;
              const setFull = (el) => {
                el.style.float = "none";
                el.style.width = "100%";
                el.style.marginRight = "0";
                el.style.clear = "both";
              };
              const setCols = (el, cols, pos) => {
                el.style.clear = "none";
                el.style.float = "left";
                el.style.width = ` calc((100% - ${(cols - 1) * GAP}px) / ${cols})`;
                el.style.marginRight = pos === cols - 1 ? "0" : GAP + "px";
              };
              const addBreak = (afterEl) => {
                afterEl.insertAdjacentElement(
                  "afterend",
                  Object.assign(document.createElement("div"), {
                    className: "z-stat-break",
                  }),
                );
              };
              stats.forEach((el) => {
                el.style.boxSizing = "border-box";
                el.style.marginBottom = "12px";
              });
              let i = 0;
              while (i < stats.length) {
                const left = stats.length - i;
                let colsThisRow = COLS;
                if (left < COLS) colsThisRow = left;
                if (colsThisRow === 1) {
                  setFull(stats[i]);
                  addBreak(stats[i]);
                  i += 1;
                  continue;
                }
                for (let pos = 0; pos < colsThisRow; pos++) {
                  setCols(stats[i + pos], colsThisRow, pos);
                }
                addBreak(stats[i + colsThisRow - 1]);
                i += colsThisRow;
              }
            };
            const renderOnce = () => {
              if (mode === "playtime" || a0 === "playtime") {
                card.classList.add("is-playtime");
                const pt = getPlaytime();
                if (elVal) elVal.textContent = fmtTime(pt.sessionMs);
                if (elWrap)
                  elWrap.innerHTML = `Total <b id="${id}-total">${fmtTime(pt.totalMs)}</b>`;
                if (elBar) {
                  const pct = Math.min(
                    100,
                    (pt.sessionMs / (60 * 60 * 1000)) * 100,
                  );
                  elBar.style.width = pct.toFixed(2) + "%";
                }
                fixRows();
                return;
              }
              const s = readStore();
              const curRaw = getFn ? safeNum(+getFn()) : null;
              const cur = curRaw == null ? 0 : Math.max(0, curRaw);
              const prev = safeNum(+s.prev[totalKey]) ?? 0;
              if (cur > prev)
                s.totals[totalKey] =
                  (safeNum(+s.totals[totalKey]) ?? 0) + (cur - prev);
              s.prev[totalKey] = cur;
              writeStore(s);
              if (elVal) elVal.textContent = fmt(cur);
              if (!hideTotal && elTotal)
                elTotal.textContent = String(
                  Math.round(s.totals[totalKey] || 0),
                );
              if (elBar) {
                let pct = 0;
                if (barFn) pct = safeNum(+barFn(cur)) ?? 0;
                pct = Math.min(100, Math.max(0, pct));
                elBar.style.width = pct + "%";
              }
              fixRows();
            };
            renderOnce();
            card._statTimer && clearInterval(card._statTimer);
            card._statTimer = setInterval(renderOnce, 100);
          },
          Colors: () => {
            const [
              idKey,
              defConf = "#ffffff",
              chromaConf = [false, false, 50],
            ] = Array.isArray(onChange?.[0])
                ? onChange[0]
                : [onChange?.[0], "#ffffff", [false, false, 50]];
            const [defVal, fixed] = Array.isArray(defConf)
              ? defConf
              : [defConf, false];
            const [allowChroma, startChroma, defaultSpeed] = chromaConf;
            const [n, l] = Array.isArray(onChange?.[1])
              ? onChange[1]
              : [onChange[1], onChange[1]];
            const notify = this.Notify(onChange, title);
            const p = el,
              preview = p?.querySelector(".z-color-preview"),
              popup = p?.querySelector(".z-color-popup"),
              wrap = p?.querySelector(".z-sv-wrap"),
              canvas = p?.querySelector(".z-sv"),
              ctx = canvas?.getContext("2d"),
              hue = p?.querySelector(".z-hue"),
              input = p?.querySelector(".z-input"),
              modeBtn = p?.querySelector(".z-mode-toggle");
            if (
              !p ||
              !preview ||
              !popup ||
              !wrap ||
              !canvas ||
              !ctx ||
              !hue ||
              !input ||
              !modeBtn
            )
              return;
            const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
            if (idKey && allowChroma) {
              this[idKey + "Chroma"] ??= !!startChroma;
              this[idKey + "ChromaSpeed"] = clamp(
                +this[idKey + "ChromaSpeed"] || defaultSpeed,
                0,
                250,
              );
              this[idKey + "ChromaForce"] ??= true;
              const sv = this[idKey + "ChromaSV"];
              if (!Array.isArray(sv) || sv.length !== 2)
                this[idKey + "ChromaSV"] = [1, 1];
            }
            const hsvToRgb = (h, s, v) => {
              const c = v * s,
                x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
                m = v - c;
              let r = 0,
                g = 0,
                b = 0;
              if (h < 60) [r, g, b] = [c, x, 0];
              else if (h < 120) [r, g, b] = [x, c, 0];
              else if (h < 180) [r, g, b] = [0, c, x];
              else if (h < 240) [r, g, b] = [0, x, c];
              else if (h < 300) [r, g, b] = [x, 0, c];
              else[r, g, b] = [c, 0, x];
              return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
            };
            const rgbToHex = ({ r, g, b }) =>
              "#" +
              [r, g, b]
                .map((v) => (v | 0).toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase();
            const parseRgb = (s) => {
              s = (s || "").trim();
              if (/^#([0-9a-f]{6})$/i.test(s)) {
                return {
                  r: parseInt(s.slice(1, 3), 16),
                  g: parseInt(s.slice(3, 5), 16),
                  b: parseInt(s.slice(5, 7), 16),
                };
              }
              const m =
                s.match(
                  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
                ) || s.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
              if (m)
                return {
                  r: clamp(+m[1], 0, 255),
                  g: clamp(+m[2], 0, 255),
                  b: clamp(+m[3], 0, 255),
                };
              return { r: 255, g: 255, b: 255 };
            };
            const rgbToHsv = (r, g, b, prevH = 0) => {
              r /= 255;
              g /= 255;
              b /= 255;
              const max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                d = max - min;
              const v = max,
                s = max === 0 ? 0 : d / max;
              if (d === 0) return { h: prevH, s, v };
              let h = 0;
              if (max === r) h = (60 * (((g - b) / d) % 6) + 360) % 360;
              else if (max === g) h = 60 * ((b - r) / d + 2);
              else h = 60 * ((r - g) / d + 4);
              return { h, s, v };
            };
            let cursor = wrap.querySelector(".z-sv-cursor");
            if (!cursor) {
              cursor = document.createElement("div");
              cursor.className = "z-sv-cursor";
              wrap.appendChild(cursor);
            }
            let mode = "HEX",
              H = 200,
              S = 1,
              V = 1,
              baseDirty = true,
              rect = null;
            const syncCanvas = () => {
              rect = canvas.getBoundingClientRect();
              if (rect.width < 2 || rect.height < 2) return null;
              const w = Math.max(1, rect.width | 0),
                h = Math.max(1, rect.height | 0);
              if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                baseDirty = true;
              }
              return rect;
            };
            const drawBase = () => {
              if (!syncCanvas()) return;
              const w = canvas.width,
                h = canvas.height;
              ctx.fillStyle = `hsl(${H},100%,50%)`;
              ctx.fillRect(0, 0, w, h);
              const gW = ctx.createLinearGradient(0, 0, w, 0);
              gW.addColorStop(0, "#fff");
              gW.addColorStop(1, "transparent");
              ctx.fillStyle = gW;
              ctx.fillRect(0, 0, w, h);
              const gB = ctx.createLinearGradient(0, 0, 0, h);
              gB.addColorStop(0, "transparent");
              gB.addColorStop(1, "#000");
              ctx.fillStyle = gB;
              ctx.fillRect(0, 0, w, h);
              baseDirty = false;
            };
            const drawCursor = () => {
              if (!rect) rect = canvas.getBoundingClientRect();
              cursor.style.left = S * rect.width + "px";
              cursor.style.top = (1 - V) * rect.height + "px";
            };
            const ensureDrawn = () => {
              if (baseDirty) drawBase();
              drawCursor();
            };
            const chromaOn = () => allowChroma && !!this[idKey + "Chroma"];
            const setVal = (hex, doNotify = false) => {
              if (!fixed && idKey) this[idKey] = hex;
              preview.style.background = hex;
              input.value =
                mode === "HEX"
                  ? hex
                  : (() => {
                    const { r, g, b } = parseRgb(hex);
                    return `${r},${g},${b}`;
                  })();
              hue.value = String(Math.round(H));
              doNotify && notify(hex);
            };
            const applyHex = (hex, doNotify = false) => {
              const { r, g, b } = parseRgb(hex),
                hsv = rgbToHsv(r, g, b, H);
              H = hsv.h === 0 && H === 360 ? 360 : hsv.h;
              S = hsv.s;
              V = hsv.v;
              baseDirty = true;
              ensureDrawn();
              setVal(rgbToHex({ r, g, b }), doNotify);
              doNotify && save();
            };
            applyHex(this[idKey] ?? defVal, false);
            if (fixed) {
              if (idKey) this[idKey] = rgbToHex(parseRgb(defVal));
              preview.style.background =
                this[idKey] || rgbToHex(parseRgb(defVal));
              input.value = preview.style.background;
              p.classList.remove("open");
              p.style.pointerEvents = "none";
              preview.style.cursor = "not-allowed";
              return;
            }
            const eqHex = (a, b) =>
              String(a || "").toUpperCase() === String(b || "").toUpperCase();
            const trueDefault =
              (Array.isArray(defConf) ? defConf[0] : defConf) ?? "#ffffff";
            let dragging = false,
              raf = 0,
              last = null;
            const fromXY = (x01, y01) => {
              if (baseDirty) drawBase();
              S = clamp(x01, 0, 1);
              V = clamp(1 - y01, 0, 1);
              if (allowChroma && chromaOn() && !this[idKey + "ChromaForce"]) {
                this[idKey + "ChromaSV"] = [S, V];
              }
              drawCursor();
              setVal(rgbToHex(hsvToRgb(H, S, V)), false);
            };
            const queue = (cx, cy) => {
              if (!last) return;
              const x = (cx - last.left) / last.width,
                y = (cy - last.top) / last.height;
              if (raf) return;
              raf = requestAnimationFrame(() => {
                raf = 0;
                fromXY(x, y);
              });
            };
            canvas.addEventListener("pointerdown", (e) => {
              dragging = true;
              canvas.setPointerCapture(e.pointerId);
              last = canvas.getBoundingClientRect();
              if (last.width < 2 || last.height < 2) return;
              queue(e.clientX, e.clientY);
            });
            canvas.addEventListener(
              "pointermove",
              (e) => dragging && queue(e.clientX, e.clientY),
            );
            canvas.addEventListener("pointerup", () => {
              dragging = false;
              applyHex(rgbToHex(hsvToRgb(H, S, V)), !chromaOn());
            });
            canvas.addEventListener("pointercancel", () => (dragging = false));
            hue.addEventListener("input", () => {
              H = clamp(+hue.value || 0, 0, 360);
              baseDirty = true;
              ensureDrawn();
              setVal(rgbToHex(hsvToRgb(H === 360 ? 0 : H, S, V)), false);
            });
            hue.addEventListener("change", () =>
              applyHex(rgbToHex(hsvToRgb(H, S, V)), !chromaOn()),
            );
            modeBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              mode = mode === "HEX" ? "RGB" : "HEX";
              modeBtn.textContent = mode;
              setVal(this[idKey] ?? defVal, false);
            });
            input.addEventListener("change", (e) => {
              e.stopPropagation();
              applyHex(rgbToHex(parseRgb(input.value)), true);
            });
            const openPopup = () => {
              p.classList.add("open");
              requestAnimationFrame(() => {
                rect = null;
                baseDirty = true;
                if (allowChroma && chromaOn()) {
                  if (this[idKey + "ChromaForce"]) {
                    S = 1;
                    V = 1;
                    this[idKey + "ChromaSV"] = [1, 1];
                  } else {
                    const sv = this[idKey + "ChromaSV"] || [1, 1];
                    S = clamp(+sv[0] || 0, 0, 1);
                    V = clamp(+sv[1] || 0, 0, 1);
                  }
                  ensureDrawn();
                  setVal(rgbToHex(hsvToRgb(H, S, V)), false);
                  return;
                }
                ensureDrawn();
                setVal(this[idKey] ?? defVal, false);
              });
            };
            const closePopup = () => p.classList.remove("open");
            preview.addEventListener("click", (e) => {
              e.stopPropagation();
              p.classList.toggle("open");
              p.classList.contains("open") ? openPopup() : closePopup();
            });
            popup.addEventListener("click", (e) => e.stopPropagation());
            document.addEventListener(
              "click",
              () => p.classList.contains("open") && closePopup(),
            );
            preview.addEventListener("mousedown", (e) => {
              if (e.button === 1) e.preventDefault();
            });
            preview.addEventListener("auxclick", (e) => {
              if (e.button !== 1) return;
              e.preventDefault();
              e.stopPropagation();
              if (chromaOn()) return;
              const cur = (this[idKey] ?? defVal).toUpperCase();
              let hex;
              do
                hex =
                  "#" +
                  ((Math.random() * 0xffffff) | 0)
                    .toString(16)
                    .padStart(6, "0")
                    .toUpperCase();
              while (hex === cur);
              applyHex(hex, true);
            });
            const stopChromaTimers = () => {
              if (p._chromaInterval) {
                clearInterval(p._chromaInterval);
                p._chromaInterval = 0;
              }
              if (p._chromaRaf) {
                cancelAnimationFrame(p._chromaRaf);
                p._chromaRaf = 0;
              }
            };
            const chromaTick = () => {
              if (!chromaOn()) return;
              H = (H + 1) % 360;
              if (this[idKey + "ChromaForce"]) {
                S = 1;
                V = 1;
                this[idKey + "ChromaSV"] = [1, 1];
              } else {
                const sv = this[idKey + "ChromaSV"] || [1, 1];
                S = clamp(+sv[0] || 0, 0, 1);
                V = clamp(+sv[1] || 0, 0, 1);
              }
              baseDirty = true;
              ensureDrawn();
              setVal(rgbToHex(hsvToRgb(H, S, V)), false);
            };
            const restartChroma = () => {
              stopChromaTimers();
              if (!allowChroma) return;
              const sp = +this[idKey + "ChromaSpeed"];
              const speed = Number.isFinite(sp) ? sp : defaultSpeed;
              if (speed <= 0) {
                const loop = () => {
                  if (!chromaOn()) {
                    p._chromaRaf = 0;
                    return;
                  }
                  chromaTick();
                  p._chromaRaf = requestAnimationFrame(loop);
                };
                p._chromaRaf = requestAnimationFrame(loop);
                return;
              }
              p._chromaInterval = setInterval(() => {
                if (!chromaOn()) return;
                chromaTick();
              }, speed);
            };
            preview.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.shiftKey && allowChroma) {
                const next = !this[idKey + "Chroma"];
                this[idKey + "Chroma"] = next;
                if (next) {
                  const [cs, cv] = this[idKey + "ChromaSV"] || [S, V];
                  S = cs;
                  V = cv;
                  baseDirty = true;
                  ensureDrawn();
                }
                restartChroma();
                save();
                notify(next, `${title} Chroma`);
                return;
              }
              if (allowChroma && this[idKey + "Chroma"]) return;
              const cur = this[idKey] ?? defVal;
              if (!eqHex(cur, trueDefault)) applyHex(trueDefault, true);
            });
            const notifySpeed = this.Notify(onChange, title, (v) => `${v}ms`);
            p.addEventListener(
              "wheel",
              (e) => {
                if (!allowChroma || !e.shiftKey) return;
                e.preventDefault();
                const cur = +this[idKey + "ChromaSpeed"];
                const curSpeed = Number.isFinite(cur) ? cur : defaultSpeed;
                const next = clamp(curSpeed + Math.sign(e.deltaY) * 10, 0, 250);
                if (next === curSpeed) return;
                this[idKey + "ChromaSpeed"] = next;
                restartChroma();
                save();
                notifySpeed(next);
              },
              { passive: false },
            );
            window.addEventListener("resize", () => {
              if (!p.classList.contains("open")) return;
              rect = null;
              baseDirty = true;
              ensureDrawn();
            });
          },
        };
        if (handlers[type]) handlers[type]();
      });
    },
    _silent: false,
    withSilent(fn) {
      this._silent = true;
      try {
        fn();
      } finally {
        this._silent = false;
      }
    },

    buildSaveKeys() {
      const flatten = (opts, out = []) => {
        (opts || []).forEach((o) => {
          out.push(o);
          if (o?.suboptions) flatten(o.suboptions, out);
        });
        return out;
      },
        all = flatten(
          [].concat(
            this.Main || [],
            this.Setting || [],
            this.Render || [],
            this.Gui || [],
            this.Bot || [],
          ),
        ),
        keys = new Set(),
        defaults = {};
      all.forEach((o) => {
        if (!o?.onChange) return;
        const cfg = Array.isArray(o.onChange?.[0])
          ? o.onChange[0]
          : [o.onChange?.[0]];
        const idKey = cfg?.[0];
        if (!idKey) return;
        let def = cfg?.[1];
        if (o.type === "checkbox") def = def ?? false;
        if (o.type === "slider") def = def ?? 0;
        if (o.type === "Input") def = def ?? "";
        if (o.type === "selector") {
          const list = cfg?.[2];
          if (def === undefined) def = Array.isArray(list) ? list[0] : list;
        }
        if (o.type === "SelecBox") {
          const cfg0 = Array.isArray(o.onChange?.[0]) ? o.onChange[0] : [];
          const defSel = typeof cfg0[0] === "string" ? cfg0[0] : "";
          const pairs = cfg0.filter((x) => Array.isArray(x));
          const selKey = `__SB_${o.id}`;
          defaults[selKey] = defSel;
          keys.add(selKey);
          pairs.forEach(([k, d]) => {
            defaults[k] = !!d;
            keys.add(k);
          });
          return;
        }
        if (o.type === "Colors") {
          if (Array.isArray(def)) def = def[0];
          def = def ?? "#ffffff";
          const chroma = cfg?.[2],
            allow = Array.isArray(chroma) ? chroma[0] : false;
          if (allow) {
            defaults[idKey + "Chroma"] = chroma[1] ?? false;
            defaults[idKey + "ChromaSpeed"] = chroma[2] ?? 50;
            defaults[idKey + "ChromaForce"] = true;
            defaults[idKey + "ChromaSV"] = [1, 1];
            keys.add(idKey + "Chroma");
            keys.add(idKey + "ChromaSpeed");
            keys.add(idKey + "ChromaForce");
            keys.add(idKey + "ChromaSV");
          }
        }
        defaults[idKey] = def;
        keys.add(idKey);
      });
      this._saveKeys = [...keys];
      this._defaults = defaults;
      this._flatOpts = all;
    },

    loadSettings() {
      try {
        const raw = localStorage.getItem(this.storeKey);
        if (raw) {
          const data = JSON.parse(raw);
          this._saveKeys?.forEach((k) => {
            if (k in data) this[k] = data[k];
          });
        }
      } catch { }
      const autoRaw = localStorage.getItem(this.autoKey);
      this.autoSave = autoRaw == null ? true : autoRaw === "1";
    },

    saveSettings() {
      const data = {};
      this._saveKeys?.forEach((k) => {
        if (this[k] !== undefined) data[k] = this[k];
      });
      try {
        localStorage.setItem(this.storeKey, JSON.stringify(data));
      } catch { }
    },

    resetDefaults() {
      const clone = (v) =>
        Array.isArray(v)
          ? v.slice()
          : v && typeof v === "object"
            ? JSON.parse(JSON.stringify(v))
            : v;
      this.withSilent(() => {
        Object.entries(this._defaults || {}).forEach(([k, v]) => {
          this[k] = clone(v);
        });
        this.syncUI(true);
        this.saveSettings(true);
      });
      AB.NotiDisplay.add("Defaults restored ✓", "#9B5CFF", 0);
    },

    syncUI(silent = false) {
      const root = this.menu;
      if (!root || !this._flatOpts) return;
      const run = () => {
        this._flatOpts.forEach((o) => {
          if (!o?.onChange || !o.id) return;
          const cfg = Array.isArray(o.onChange?.[0])
            ? o.onChange[0]
            : [o.onChange?.[0]];
          const idKey = cfg?.[0];
          if (!idKey) return;
          const val = this[idKey];
          if (o.type === "Input") {
            const el = root.querySelector(`#${o.id}`);
            if (el) el.value = val ?? "";
            return;
          }
          if (o.type === "slider") {
            const el = root.querySelector(`#${o.id}`);
            const vEl = root.querySelector(`#${o.id}Value`);
            if (el) el.value = val ?? 0;
            if (vEl) vEl.textContent = "" + (val ?? 0);
            return;
          }
          if (o.type === "selector") {
            const wrap = root.querySelector(`#${o.id}`);
            if (!wrap) return;
            const valueEl = wrap.querySelector(`#${o.id}Value`);
            const opts = [...wrap.querySelectorAll(".z-select-option")];
            const v = val ?? (valueEl ? valueEl.textContent : "");
            if (valueEl) valueEl.textContent = v;
            opts.forEach((x) =>
              x.classList.toggle("selected", x.dataset.value === v),
            );
            return;
          }
          if (o.type === "SelecBox") {
            const wrap = root.querySelector(`#${o.id}-sel`),
              chk = root.querySelector(`#${o.id}-chk`),
              val = root.querySelector(`#${o.id}-selValue`),
              opt = root.querySelector(`#${o.id}-selOptions`);
            if (!wrap || !chk || !val || !opt) return;
            const selKey = `__SB_${o.id}`,
              selected = String(this[selKey] ?? "");
            val.textContent = selected;
            const isOn = !!this[selected];
            chk.classList.toggle("active", isOn);
            chk.dataset.value = isOn;
            [...opt.querySelectorAll(".z-select-option")].forEach((x) => {
              const name = x.dataset.value;
              const on = !!this[name];
              x.classList.toggle("is-on", on);
              x.classList.toggle("current", name === selected);
            });
            return;
          }
          if (o.type === "Colors") {
            const wrap = root.querySelector(`#${o.id}`);
            if (!wrap) return;
            const prev = wrap.querySelector(".z-color-preview");
            const input = wrap.querySelector(".z-input");
            const def = this._defaults?.[idKey] ?? "#ffffff";
            const v = val ?? def;
            if (prev) prev.style.background = v;
            if (input) input.value = v;
            return;
          }
          if (o.type === "Loadout") {
            const disp = root.querySelector(`#${o.id}.z-loadout-display`);
            if (disp?._setLoadout) disp._setLoadout(val);
            return;
          }
          if (o.type === "checkbox") {
            if (idKey in this) this[idKey] = !!val;
          }
        });
      };
      if (silent) this.withSilent(run);
      else run();
    },

    queueSave() {
      if (!this.autoSave) return;
      this.saveSettings();
    },

    setupSaveControls() {
      this.saveBtn = this.menu.querySelector("#z-save");
      this.resetBtn = this.menu.querySelector("#z-reset");
      if (!this.saveBtn || !this.resetBtn) return;
      const setAuto = (v) => {
        this.autoSave = !!v;
        localStorage.setItem(this.autoKey, this.autoSave ? "1" : "0");
        this.saveBtn.classList.toggle("active", this.autoSave);
        AB.NotiDisplay.add(
          `AutoSave: ${this.autoSave ? "ON" : "OFF"}`,
          this.autoSave ? "#9B5CFF" : "#ff4d4d",
          0,
        );
      };
      this.saveBtn.classList.toggle("active", this.autoSave);
      this.saveBtn.onclick = (e) => {
        if (this.autoSave) return;
        e.preventDefault();
        this.saveSettings(true);
        AB.NotiDisplay.add("Saved ✓", "#9B5CFF", 0);
      };
      this.saveBtn.oncontextmenu = (e) => {
        e.preventDefault();
        setAuto(!this.autoSave);
      };
      this.resetBtn.onclick = () => this.resetDefaults();
    },
    //Header   - { type:"Header", title:"SECTION TITLE" },
    //text     - { type:"text", id:"ElementID", title:"Example", description:`Example`, icon:"info", onChange: [["ActualValue", DefaultValue], [Notification, console.log]] }, (note: if you omit onChange, it becomes just a static row)
    //Checkbox - { type:"checkbox", id:"ElementID", title:"Example", description:`Example`, icon:"check_box", onChange: [["ActualValue", Checked{true/false}], [Notification, console.log]] },
    //Slider   - { type:"slider", id:"ElementID", title:"Example", description:`Example`, icon:"tune", onChange: [["ActualValue", DefaultValue, [MinValue, MaxValue], Step], [Notification, console.log]] },
    //Input    - { type:"Input", id:"ElementID", title:"Example", description:`Example`, icon:"keyboard", onChange: [["ActualValue", DefaultValue, { kind:"text"|"number"|"key", placeholder?, maxLen?, live?, min?, max?, step? }], [Notification, console.log]] }, kind:"text"/"number"/"key"
    //Selector - { type:"selector", id:"ElementID", title:"Example", description:`Example`, icon:"list", onChange: [["ActualValue", DefaultValue, [Value1, Value2, ...]], [Notification, console.log]] },
    //Colors   - { type:"Colors", id:"ElementID", title:"Example", description:`Example`, icon:"palette", onChange: [["ActualValue", [DefaultHex, FixedMode{true/false}], [AllowChroma{true/false}, StartChroma{true/false}, ChromaSpeedMs]], [Notification, console.log]] },
    //Loadout  - { type:"Loadout", id:"ElementID", title:"Example", description:`Example`, icon:"checkroom", onChange: [["ActualValue", DefaultId, "hat"|"acc"|"pri"|"sec"], [Notification, console.log]] },
    //SelecBox - { type:"SelecBox", id:"ElementID", title:"Example", description:`Example`, icon:"toggle_on", onChange: [[DefaultSelectedName, ["Name1", DefaultBool], ["Name2", DefaultBool], ["Name3", DefaultBool], ...], [Notification, console.log]] },
    //Graph    - { type:"Graph", id:"ElementID", title:"Example", description:`Example`, icon:"show_chart", onChange: [["GraphKey", DefaultValueIgnored, SampleSource], [Notification, console.log]] }, (note: SampleSource can be: () => number, "globalVarName", or a number)
    //Stat     - { type:"Stat", id:"ElementID", title:"Example", description:`Example`, icon:"insights", onChange: [["TotalKeyOrLabel", getFn?, { mode?, fmt?, totalKey?, max?, hideTotal?, bar? }]] },
    //          getFn: () => number (current value)
    //          totalKey: string for total storage key (defaults to label/id)
    //          max: number enables default progress bar scaling
    //          bar: (v)=>percent custom bar function
    //          fmt: (v)=>string custom display for current value

    // suboptions: [ { ...same option objects... }, ... ]

    //to use it, u can Ab.Menu. (Check the ActualValue) (If it Selector, go with Ab.Menu.instatype == "Smart" or Ab.Menu.Instatype

    Main: [
      { type: "Header", title: "PLAYER STATS" },
      {
        type: "Graph",
        id: "PingGraph",
        title: "Ping (ms)",
        icon: "network_ping",
        onChange: [
          ["PingGraph", 0, () => window.pingTime],
          [true, false],
        ],
      },
      {
        type: "Graph",
        id: "FpsGraph",
        title: "FPS",
        icon: "speed",
        onChange: [
          ["FpsGraph", 1, "fps"],
          [true, false],
        ],
      },
      {
        type: "Stat",
        id: "PlaytimeStat",
        title: "Playtime",
        icon: "schedule",
        onChange: [["playtime", { mode: "playtime" }]],
      },
      {
        type: "Stat",
        id: "DeathsStat",
        title: "Deaths",
        icon: "warning",
        onChange: [["Deaths", () => window.deaths, { max: 1000 }]],
      },
      {
        type: "Stat",
        id: "KillsStat",
        title: "Kills",
        icon: "emoji_events",
        onChange: [["Kills", () => window.kills, { max: 1000 }]],
      },
      {
        type: "Graph",
        id: "PacketGraph",
        title: "Packet",
        description: "Frames per second",
        icon: "speed",
        onChange: [
          ["PacketGraph", 0, () => window.secPacket],
          [true, false],
        ],
      },
    ],

    Setting: [
      { type: "Header", title: "COMBAT" },

      {
        type: "text",
        id: "InstaMenu",
        title: "Insta",
        description: "Insta kill feature",
        icon: "flash_on",
        onChange: [
          ["InstaMenu", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "Input",
            id: "InstaKey",
            title: "Insta Key",
            description: "Key binding",
            icon: "keyboard",
            onChange: [
              ["InstaKey", "r", { kind: "key" }],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "InstaSpeed",
            title: "Insta Speed",
            description: "Speed of insta",
            icon: "speed",
            onChange: [
              ["InstaSpeed", 0, [0, 300], 1],
              [true, false],
            ],
          },
          {
            type: "selector",
            id: "instaType",
            title: "InstaKill Type",
            description: "Type of insta",
            icon: "bolt",
            onChange: [
              ["instaType", "oneShot", ["oneShot", "spammer", "oneframe"]],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "AutoInsta",
            title: "AutoInsta",
            description: "Auto insta enemy",
            icon: "auto_awesome",
            onChange: [
              ["AutoInsta", false],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "backupNobull",
            title: "Backup Nobull Insta",
            description: "Nobull insta fallback",
            icon: "backup",
            onChange: [
              ["backupNobull", true],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "text",
        id: "TickMenu",
        title: "Tick",
        description: "All tick features except SpikeTick",
        icon: "replay",
        onChange: [
          ["TickMenu", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "revTick",
            title: "Rev Tick",
            description: "Reverse tick timing",
            icon: "replay",
            onChange: [
              ["revTick", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "predictTick",
            title: "Predict Tick",
            description: "Tick prediction",
            icon: "psychology",
            onChange: [
              ["predictTick", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "VelTick",
            title: "Vel Tick",
            description: "Enable auto velocity tick",
            icon: "flash_on",
            onChange: [
              ["VelTick", false],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "AutoOneTick",
            title: "Auto OneTick",
            description: "Auto one-tick (disables Vel Tick)",
            icon: "flash_on",
            onChange: [
              ["AutoOneTick", false],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "SpikeTick",
        title: "Spike Tick",
        description: "Auto kill with spike tick",
        icon: "dangerous",
        onChange: [
          ["SpikeTick", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "safeAntiSpikeTick",
            title: "Safe AntiSpikeTick",
            description: "Safe spike tick counter",
            icon: "security",
            onChange: [
              ["safeAntiSpikeTick", true],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "autoPush",
        title: "Auto Push",
        description: "Push enemies automatically",
        icon: "open_with",
        onChange: [
          ["autoPush", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "antipush",
            title: "Anti-Push",
            description: "Prevent enemy push",
            icon: "block",
            onChange: [
              ["antipush", true],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "AutoPlay",
        title: "Auto Play",
        description: "Smart auto combat",
        icon: "smart_toy",
        onChange: [
          ["AutoPlay", false],
          [true, false],
        ],
      },

      {
        type: "checkbox",
        id: "AutoPlace",
        title: "Auto Place",
        description: "Place buildings automatically",
        icon: "add_box",
        onChange: [
          ["AutoPlace", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "Input",
            id: "autoPlaceTick",
            title: "AutoPlacer Tick",
            description: "Placement tick interval",
            icon: "timer",
            onChange: [
              [
                "autoPlaceTick",
                1,
                { kind: "number", min: 1, max: 99, step: 1 },
              ],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "AutoMill",
        title: "Auto Mill",
        description: "Place mills automatically",
        icon: "precision_manufacturing",
        onChange: [
          ["AutoMill", false],
          [true, false],
        ],
      },

      {
        type: "checkbox",
        id: "autoReplace",
        title: "Auto Replace",
        description: "Replace broken builds",
        icon: "autorenew",
        onChange: [
          ["autoReplace", true],
          [true, false],
        ],
      },

      {
        type: "checkbox",
        id: "safeWalk",
        title: "Safe Walk",
        description: "Avoid dangers while walking",
        icon: "directions_walk",
        onChange: [
          ["safeWalk", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "selector",
            id: "SafeWalkType",
            title: "Walk Type",
            description: "Type of Walk",
            icon: "upgrade",
            onChange: [
              ["SafeWalkType", "MoveAway", ["Stop", "MoveAway"]],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "selector",
        id: "antiBullType",
        title: "AntiBull Type",
        description: "Anti-bull behavior",
        icon: "shield",
        onChange: [
          ["antiBullType", "noab", ["noab", "abreload", "abalway"]],
          [true, false],
        ],
      },

      {
        type: "selector",
        id: "predictType",
        title: "Predict Movement",
        description: "Movement prediction render",
        icon: "timeline",
        onChange: [
          ["predictType", "disableRender", ["disableRender", "pre2", "pre3"]],
          [true, false],
        ],
      },

      { type: "Header", title: "MISC" },

      {
        type: "checkbox",
        id: "autoHeal",
        title: "Auto Heal",
        description: "Heal automatically",
        icon: "healing",
        onChange: [
          ["autoHeal", true],
          [true, false],
        ],
        suboptions: [
          {
            type: "checkbox",
            id: "antiInsta",
            title: "Anti Insta",
            description: "Counter insta kills",
            icon: "shield",
            onChange: [
              ["antiInsta", true],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "autoUpgrade",
        title: "Auto Upgrade",
        description: "Upgrade automatically",
        icon: "upgrade",
        onChange: [
          ["autoUpgrade", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "selector",
            id: "UpgType",
            title: "AutoUpgrade Type",
            description: "Upgrade path",
            icon: "upgrade",
            onChange: [
              [
                "UpgType",
                "KH",
                ["KH", "PH", "DH", "BH", "SH", "SM", "PM", "DM", "PB", "PBC"],
              ],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "AutoBreak",
        title: "Auto Break",
        description: "Break automatically",
        icon: "construction",
        onChange: [
          ["AutoBreak", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "BreakSpikeIntrap",
            title: "Break Spike Intrap",
            description:
              "Automactially Break Spike first if near weapon range.",
            onChange: [
              ["BreakSpikeIntrap", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "antiTrap",
            title: "Anti Trap",
            description: "Counter traps",
            icon: "warning",
            onChange: [
              ["antiTrap", true],
              [true, false],
            ],
          },
          {
            type: "SelecBox",
            id: "BreakObject",
            title: "Break Object",
            description: "",
            icon: "tune",
            onChange: [
              [
                "Spike",
                ["Trap", false],
                ["Windmill", false],
                ["Turret", false],
                ["Spike", true],
                ["Teleporter", false],
                ["Blocker", false],
                ["Wall", false],
              ],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "weaponGrind",
        title: "Auto-Grinder",
        description: "Weapon grinding mode",
        icon: "construction",
        onChange: [
          ["weaponGrind", false],
          [true, false],
        ],
        suboptions: [
          {
            type: "selector",
            id: "grindTo",
            title: "Grind To",
            description: "Weapon variant to grind for",
            icon: "upgrade",
            onChange: [
              [
                "grindTo",
                "Ruby",
                ["Gold", "Diamond", "Ruby"],
              ],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "autoBuy",
        title: "Auto Buy",
        description: "Auto purchase items",
        icon: "shopping_cart",
        onChange: [
          ["autoBuy", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "autoBuyEquip",
            title: "Auto Buy Equipment",
            description:
              "Automatically purchase hats and accessories when needed",
            icon: "storefront",
            onChange: [
              ["autoBuyEquip", true],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "autoRespawn",
        title: "Auto Respawn",
        description: "Respawn automatically",
        icon: "restart_alt",
        onChange: [
          ["autoRespawn", true],
          [true, false],
        ],
      },

      {
        type: "text",
        id: "ChatMenu",
        title: "Chat",
        description: "All chat related features",
        icon: "chat",
        onChange: [
          ["ChatMenu", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "AutoCrash",
            title: "Auto Crash",
            description: "Auto send crash messages",
            icon: "chat_bubble",
            onChange: [
              ["AutoCrash", false],
              [true, false],
            ],
          },
          {
            type: "selector",
            id: "autoGGType",
            title: "AutoGG Type",
            description: "Kill message style",
            icon: "chat",
            onChange: [
              [
                "autoGGType",
                "disabled",
                [
                  "disabled",
                  "abyss",
                  "robotics",
                  "frozen",
                  "chicken",
                  "redDragon",
                  "zakat",
                  "projectCube",
                  "happyMod",
                  "minus",
                  "revelation",
                ],
              ],
              [true, false],
            ],
          },
        ],
      },

      {
        type: "checkbox",
        id: "AutoHat",
        title: "AutoHat",
        description: "Manage hats automatically",
        icon: "sync",
        onChange: [
          ["AutoHat", true],
          [true, false],
        ],
        suboptions: [
          {
            type: "checkbox",
            id: "hatCycle",
            title: "Hat Cycle",
            description: "Cycle hats automatically",
            icon: "sync",
            onChange: [
              ["hatCycle", false],
              [true, false],
            ],
          },
          {
            type: "text",
            id: "LoadoutStuff",
            title: "Loadout",
            description: "Loadout Hat/Acc for combat",
            icon: "checkroom",
            onChange: [
              ["LoadoutStuff", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Hat" },
              {
                type: "Loadout",
                id: "LoadoutHatLeft",
                title: "LeftClick",
                description: "Pick hat for Left click",
                icon: "checkroom",
                onChange: [
                  ["LoadoutHatLeft", 7, "hat"],
                  [true, false],
                ],
              },
              {
                type: "Loadout",
                id: "LoadoutHatRight",
                title: "RightClick",
                description: "Pick hat for Right click",
                icon: "checkroom",
                onChange: [
                  ["LoadoutHatRight", 40, "hat"],
                  [true, false],
                ],
              },
              { type: "Header", title: "Acc" },
              {
                type: "Loadout",
                id: "LoadoutAccLeft",
                title: "LeftClick",
                description: "Pick acc for Left click",
                icon: "checkroom",
                onChange: [
                  ["LoadoutAccLeft", 21, "acc"],
                  [true, false],
                ],
              },
              {
                type: "Loadout",
                id: "LoadoutAccRight",
                title: "RightClick",
                description: "Pick acc for Right click",
                icon: "checkroom",
                onChange: [
                  ["LoadoutAccRight", 19, "acc"],
                  [true, false],
                ],
              },
              // { type: "Header", title: "Others" },
              // {
              //   type: "Loadout",
              //   id: "LoadoutWeapPri",
              //   title: "Primary",
              //   description: "Pick PRIMARY weapon",
              //   icon: "checkroom",
              //   onChange: [
              //     ["LoadoutWeapPri", 4, "pri"],
              //     [true, false],
              //   ],
              // },
              // {
              //   type: "Loadout",
              //   id: "LoadoutWeapSec",
              //   title: "Secondary",
              //   description: "Pick SECONDARY weapon",
              //   icon: "checkroom",
              //   onChange: [
              //     ["LoadoutWeapSec", 10, "sec"],
              //     [true, false],
              //   ],
              // },
            ],
          },
        ],
      },

      {
        type: "Input",
        id: "breakRange",
        title: "Break Range",
        description: "Break objects range",
        icon: "straighten",
        onChange: [
          ["breakRange", 700, { kind: "number", min: 0, max: 9999, step: 1 }],
          [true, false],
        ],
      },
    ],
    Render: [
      {
        type: "button",
        id: "partyModeToggle",
        title: "Party Mode",
        description: "Toggle chroma rainbow effect on all colors",
        icon: "celebration",
      },
      { type: "Header", title: "DAY/NIGHT" },
      {
        type: "checkbox",
        id: "DayNightCycle",
        title: "Day/Night Cycle",
        description: "Animate sun direction over time",
        icon: "light_mode",
        onChange: [
          ["DayNightCycle", true],
          [true, false],
        ],
      },
      {
        type: "slider",
        id: "DayNightScale",
        title: "Time Scale",
        description: "Speed of the day/night cycle",
        icon: "timelapse",
        onChange: [
          ["DayNightScale", 1, [0, 6], 0.1],
          [true, false],
        ],
      },
      { type: "Header", title: "PLAYER & ANIMAL" },
      {
        type: "checkbox",
        id: "HealthBar",
        title: "Health Bar",
        description: "Toggle health bars",
        icon: "favorite",
        onChange: [
          ["HealthBar", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "selector",
            id: "HealthBarStyle",
            title: "Health Bar Style",
            description: "Choose how health bars are displayed",
            icon: "bar_chart",
            onChange: [
              ["HealthBarStyle", "Bar", ["Bar", "Circle", "Actionbar", "Text"]],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "PlayerHealthBar",
            title: "Player HealthBar",
            description: "Show player health",
            icon: "person",
            onChange: [
              ["PlayerHealthBar", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "checkbox",
                id: "PlayerAnimatedHealthBar",
                title: "Animated HealthBar",
                description: "Animated health bars",
                icon: "animation",
                onChange: [
                  ["PlayerAnimatedHealthBar", true],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "PlayerHealthBarColor",
                title: "Player Color",
                description: "Player health bar color",
                icon: "palette",
                onChange: [
                  [
                    "PlayerHealthBarColor",
                    ["#8ecc51", false],
                    [true, false, 50],
                  ],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "TeamHealthBar",
            title: "Team HealthBar",
            description: "Show team health",
            icon: "group",
            onChange: [
              ["TeamHealthBar", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "checkbox",
                id: "TeamAnimatedHealthBar",
                title: "Animated HealthBar",
                description: "Animated health bars",
                icon: "animation",
                onChange: [
                  ["TeamAnimatedHealthBar", true],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "TeamHealthBarColor",
                title: "Team Color",
                description: "Team health bar color",
                icon: "palette",
                onChange: [
                  ["TeamHealthBarColor", ["#4fc3f7", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "EnemyHealthBar",
            title: "Enemy HealthBar",
            description: "Show enemy health",
            icon: "person_off",
            onChange: [
              ["EnemyHealthBar", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "checkbox",
                id: "EnemyAnimatedHealthBar",
                title: "Animated HealthBar",
                description: "Animated health bars",
                icon: "animation",
                onChange: [
                  ["EnemyAnimatedHealthBar", true],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "EnemyHealthBarColor",
                title: "Enemy Color",
                description: "Enemy health bar color",
                icon: "palette",
                onChange: [
                  [
                    "EnemyHealthBarColor",
                    ["#cc5151", false],
                    [true, false, 50],
                  ],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "AnimalHealthBar",
            title: "Animal HealthBar",
            description: "Show animal health",
            icon: "pets",
            onChange: [
              ["AnimalHealthBar", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "checkbox",
                id: "AnimalAnimatedHealthBar",
                title: "Animated HealthBar",
                description: "Animated health bars",
                icon: "animation",
                onChange: [
                  ["AnimalAnimatedHealthBar", true],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "AnimalHealthBarColor",
                title: "Animal Color",
                description: "Animal health bar color",
                icon: "palette",
                onChange: [
                  [
                    "AnimalHealthBarColor",
                    ["#ffca28", false],
                    [true, false, 50],
                  ],
                  [true, false],
                ],
              },
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "VelTickAssist",
        title: "VelTick Assist",
        description: "Show VelTick range circle on poisoned target",
        icon: "radio_button_unchecked",
        onChange: [
          ["VelTickAssist", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "showNames",
        title: "Names",
        description: "Show player and entity names",
        icon: "person_add",
        onChange: [
          ["showNames", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "showLeaderName",
            title: "Leader",
            description: "Show name with crown for leader",
            icon: "emoji_events",
            onChange: [
              ["showLeaderName", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "showSkullName",
            title: "Kill Skull",
            description: "Show skull next to name after kill",
            icon: "skull",
            onChange: [
              ["showSkullName", true],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "NameSize",
            title: "Name Size",
            description: "Size of the name text",
            icon: "format_size",
            onChange: [
              ["NameSize", 16, [8, 32], 1],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "NamePosX",
            title: "Position X",
            description: "Horizontal offset for names",
            icon: "arrow_left_right",
            onChange: [
              ["NamePosX", 0, [-20, 20], 1],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "NamePosY",
            title: "Position Y",
            description: "Vertical offset for names",
            icon: "arrow_up_down",
            onChange: [
              ["NamePosY", 2, [-40, 20], 1],
              [true, false],
            ],
          },

          {
            type: "checkbox",
            id: "PlayerNameToggle",
            title: "Player",
            description: "Show player names",
            icon: "person",
            onChange: [
              ["PlayerNameToggle", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "Colors",
                id: "PlayerNameColor",
                title: "Color",
                description: "Player name color",
                icon: "palette",
                onChange: [
                  ["PlayerNameColor", ["#8ecc51", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "EnemyNameToggle",
            title: "Enemy",
            description: "Show enemy names",
            icon: "person_off",
            onChange: [
              ["EnemyNameToggle", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "Colors",
                id: "EnemyNameColor",
                title: "Color",
                description: "Enemy name color",
                icon: "palette",
                onChange: [
                  ["EnemyNameColor", ["#cc5151", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "TeamNameToggle",
            title: "Team",
            description: "Show team names",
            icon: "group",
            onChange: [
              ["TeamNameToggle", true],
              [true, false],
            ],
            suboptions: [
              {
                type: "Colors",
                id: "TeamNameColor",
                title: "Color",
                description: "Team name color",
                icon: "palette",
                onChange: [
                  ["TeamNameColor", ["#345eeb", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "AnimalNameToggle",
            title: "Animals",
            description: "Show animal names",
            icon: "pets",
            onChange: [
              ["AnimalNameToggle", false],
              [true, false],
            ],
            suboptions: [
              {
                type: "Colors",
                id: "AnimalNameColor",
                title: "Color",
                description: "Animal name color",
                icon: "palette",
                onChange: [
                  ["AnimalNameColor", ["#ffca28", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "showTracers",
        title: "Tracers",
        description: "Show tracer lines/arrows to entities",
        icon: "track_changes",
        onChange: [
          ["showTracers", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Style" },
          {
            type: "selector",
            id: "TracerType",
            title: "Tracer Type",
            description: "Visual style of tracers",
            icon: "category",
            onChange: [
              [
                "TracerType",
                "Line",
                [
                  "Line",
                  "Arrow",
                  "Dashed",
                  "Glow",
                  "Pulse",
                  "Curved",
                  "Segmented",
                  "Gradient",
                  "Phantom",
                  "OffscreenArrow",
                ],
              ],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Type Settings" },
              {
                type: "slider",
                id: "TracerDashLength",
                title: "Dash Length",
                description: "Length of dashes (Dashed type)",
                icon: "space_bar",
                onChange: [
                  ["TracerDashLength", 10, [5, 30], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerDashGap",
                title: "Dash Gap",
                description: "Gap between dashes (Dashed type)",
                icon: "space_bar",
                onChange: [
                  ["TracerDashGap", 5, [2, 20], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerGlowBlur",
                title: "Glow Blur",
                description: "Blur amount (Glow type)",
                icon: "blur_on",
                onChange: [
                  ["TracerGlowBlur", 15, [5, 40], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerPulseSpeed",
                title: "Pulse Speed",
                description: "Pulse animation speed (Pulse type)",
                icon: "speed",
                onChange: [
                  ["TracerPulseSpeed", 200, [50, 500], 10],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerCurveAmount",
                title: "Curve Amount",
                description: "How much the line curves (Curved type)",
                icon: "trending_up",
                onChange: [
                  ["TracerCurveAmount", 20, [5, 50], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerSegmentCount",
                title: "Segment Count",
                description: "Number of segments (Segmented type)",
                icon: "view_week",
                onChange: [
                  ["TracerSegmentCount", 5, [3, 15], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerArrowDistance",
                title: "Arrow Distance",
                description: "Distance from player (OffscreenArrow type)",
                icon: "straighten",
                onChange: [
                  ["TracerArrowDistance", 150, [50, 300], 10],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerArrowSize",
                title: "Arrow Size",
                description: "Size of arrow (Arrow/OffscreenArrow type)",
                icon: "open_in_full",
                onChange: [
                  ["TracerArrowSize", 12, [6, 24], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerPhantomDistance",
                title: "Phantom Distance",
                description: "Base distance from player (Phantom type)",
                icon: "straighten",
                onChange: [
                  ["TracerPhantomDistance", 150, [80, 300], 10],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerPhantomSize",
                title: "Phantom Size",
                description: "Size of phantom player (Phantom type)",
                icon: "person",
                onChange: [
                  ["TracerPhantomSize", 25, [15, 50], 1],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TracerPhantomOpacity",
                title: "Phantom Opacity",
                description: "Transparency of phantom (Phantom type)",
                icon: "opacity",
                onChange: [
                  ["TracerPhantomOpacity", 50, [10, 100], 5],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "EnemyTracer",
            title: "Enemy",
            description: "Show tracers to enemies",
            icon: "person_off",
            onChange: [
              ["EnemyTracer", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Enemy Settings" },
              {
                type: "slider",
                id: "EnemyTracerThickness",
                title: "Thickness",
                description: "Line / arrow thickness",
                icon: "line_weight",
                onChange: [
                  ["EnemyTracerThickness", 3, [1, 10], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "EnemyTracerColor",
                title: "Color",
                description: "Enemy tracer color",
                icon: "palette",
                onChange: [
                  ["EnemyTracerColor", ["#ff0000", false], [true, false, 50]],
                  [true, false],
                ],
              },
              {
                type: "checkbox",
                id: "EnemyNearLines",
                title: "Show Near Lines",
                description: "Additional lines to nearby enemies",
                icon: "linear_scale",
                onChange: [
                  ["EnemyNearLines", false],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "TeamTracer",
            title: "Team",
            description: "Show tracers to teammates",
            icon: "group",
            onChange: [
              ["TeamTracer", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Team Settings" },
              {
                type: "slider",
                id: "TeamTracerThickness",
                title: "Thickness",
                description: "Line / arrow thickness",
                icon: "line_weight",
                onChange: [
                  ["TeamTracerThickness", 3, [1, 10], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "TeamTracerColor",
                title: "Color",
                description: "Team tracer color",
                icon: "palette",
                onChange: [
                  ["TeamTracerColor", ["#4fc3f7", false], [true, false, 50]],
                  [true, false],
                ],
              },
              {
                type: "checkbox",
                id: "TeamNearLines",
                title: "Show Near Lines",
                description: "Additional lines to nearby teammates",
                icon: "linear_scale",
                onChange: [
                  ["TeamNearLines", false],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "AnimalTracer",
            title: "Animal",
            description: "Show tracers to animals",
            icon: "pets",
            onChange: [
              ["AnimalTracer", false],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Animal Settings" },
              {
                type: "slider",
                id: "AnimalTracerThickness",
                title: "Thickness",
                description: "Line / arrow thickness",
                icon: "line_weight",
                onChange: [
                  ["AnimalTracerThickness", 3, [1, 10], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "AnimalTracerColor",
                title: "Color",
                description: "Animal tracer color",
                icon: "palette",
                onChange: [
                  ["AnimalTracerColor", ["#ffca28", false], [true, false, 50]],
                  [true, false],
                ],
              },
              {
                type: "checkbox",
                id: "AnimalNearLines",
                title: "Show Near Lines",
                description: "Additional lines to nearby animals",
                icon: "linear_scale",
                onChange: [
                  ["AnimalNearLines", false],
                  [true, false],
                ],
              },
            ],
          },
        ],
      },

      { type: "Header", title: "BUILD" },
      {
        type: "checkbox",
        id: "BuildMark",
        title: "Build Mark",
        description: "Mark builds on map",
        icon: "place",
        onChange: [
          ["BuildMark", true],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "slider",
            id: "BuildMarkRange",
            title: "Visibility Range",
            description: "How far away the marks are visible",
            icon: "straighten",
            onChange: [
              ["BuildMarkRange", 1500, [50, 2000], 10],
              [true, false],
            ],
          },
          {
            type: "selector",
            id: "BuildMarkType",
            title: "Mark Type",
            description: "Style of the build markers",
            icon: "category",
            onChange: [
              ["BuildMarkType", "Circle", ["Circle", "Outline", "Text"]],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "PlayerBuildMarkToggle",
            title: "Player Builds",
            description: "Show player builds on map",
            icon: "person",
            onChange: [
              ["PlayerBuildMarkToggle", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Player Settings" },
              {
                type: "checkbox",
                id: "PlayerBuildMarkAnimated",
                title: "Animated",
                description: "Animated player build marks",
                icon: "animation",
                onChange: [
                  ["PlayerBuildMarkAnimated", true],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "PlayerBuildMarkSize",
                title: "Size",
                description: "Size of player build marks",
                icon: "zoom_out_map",
                onChange: [
                  ["PlayerBuildMarkSize", 8, [4, 24], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "PlayerBuildMark",
                title: "Color",
                description: "Player BuildMark color",
                icon: "palette",
                onChange: [
                  ["PlayerBuildMark", ["#8ecc51", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "TeamBuildMarkToggle",
            title: "Team Builds",
            description: "Show team builds on map",
            icon: "group",
            onChange: [
              ["TeamBuildMarkToggle", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Team Settings" },
              {
                type: "checkbox",
                id: "TeamBuildMarkAnimated",
                title: "Animated",
                description: "Animated team build marks",
                icon: "animation",
                onChange: [
                  ["TeamBuildMarkAnimated", true],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "TeamBuildMarkSize",
                title: "Size",
                description: "Size of team build marks",
                icon: "zoom_out_map",
                onChange: [
                  ["TeamBuildMarkSize", 8, [4, 24], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "TeamBuildMark",
                title: "Color",
                description: "Team BuildMark color",
                icon: "palette",
                onChange: [
                  ["TeamBuildMark", ["#345eeb", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          {
            type: "checkbox",
            id: "EnemyBuildMarkToggle",
            title: "Enemy Builds",
            description: "Show enemy builds on map",
            icon: "person_off",
            onChange: [
              ["EnemyBuildMarkToggle", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Enemy Settings" },
              {
                type: "checkbox",
                id: "EnemyBuildMarkAnimated",
                title: "Animated",
                description: "Animated enemy build marks",
                icon: "animation",
                onChange: [
                  ["EnemyBuildMarkAnimated", true],
                  [true, false],
                ],
              },
              {
                type: "slider",
                id: "EnemyBuildMarkSize",
                title: "Size",
                description: "Size of enemy build marks",
                icon: "zoom_out_map",
                onChange: [
                  ["EnemyBuildMarkSize", 8, [4, 24], 1],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "EnemyBuildMark",
                title: "Color",
                description: "Enemy BuildMark color",
                icon: "palette",
                onChange: [
                  ["EnemyBuildMark", ["#cc5151", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "aimLine",
        title: "Aim Line",
        description: "Show a line towards (true) aim dir",
        icon: "report_problem",
        onChange: [
          ["aimLine", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Color" },
          {
            type: "Colors",
            id: "AimLineColor",
            title: "Aim Line Color",
            description: "Aim line color",
            icon: "palette",
            onChange: [
              ["AimLineColor", ["#32CD32", false], [true, false, 50]],
              [true, false],
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "placeVis",
        title: "Render Placers",
        description: "Show placement visuals",
        icon: "visibility",
        onChange: [
          ["placeVis", false],
          [true, false],
        ],
      },
      { type: "Header", title: "Map" },
      {
        type: "text",
        id: "Biome",
        title: "Biome",
        description: "Biome visual settings",
        icon: "landscape",
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "checkbox",
            id: "River",
            title: "River",
            description: "Display River",
            icon: "waves",
            onChange: [
              ["River", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "RiverWave",
            title: "River Wave",
            description: "Animation for River Wave",
            icon: "waves",
            onChange: [
              ["RiverWave", true],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "Grids",
            title: "Grids",
            description: "Toggle Grids",
            icon: "grid_on",
            onChange: [
              ["Grids", false],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "GridsSize",
            title: "Grids Size",
            description: "Change to any value of GridsSize",
            icon: "grid_on",
            onChange: [
              ["GridsSize", 4, [0, 50], 1],
              [true, false],
            ],
          },
          {
            type: "checkbox",
            id: "ShorePath",
            title: "Biome ShorePath",
            description: "Show biome shore/transition paths",
            icon: "waves",
            onChange: [
              ["ShorePath", true],
              [true, false],
            ],
          },
          { type: "Header", title: "Volcano" },
          {
            type: "checkbox",
            id: "Volcano",
            title: "Volcano",
            description: "Show volcano visuals",
            icon: "landscape",
            onChange: [
              ["Volcano", true],
              [true, false],
            ],
            suboptions: [
              { type: "Header", title: "Volcano Settings" },
              {
                type: "checkbox",
                id: "Lava",
                title: "Animated Lava",
                description: "Display Animated lava inside volcano",
                icon: "local_fire_department",
                onChange: [
                  ["Lava", true],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "VolcanoBodyColor",
                title: "Volcano Body",
                description: "Color of the volcano terrain",
                icon: "palette",
                onChange: [
                  ["VolcanoBodyColor", ["#4a2c0d", false], [true, false, 50]],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "LavaOutlineColor",
                title: "Lava Outline",
                description: "Outline color around lava",
                icon: "palette",
                onChange: [
                  ["LavaOutlineColor", ["#ff4500", false], [true, false, 50]],
                  [true, false],
                ],
              },
              {
                type: "Colors",
                id: "LavaColor",
                title: "Lava",
                description: "Color of the lava itself",
                icon: "palette",
                onChange: [
                  ["LavaColor", ["#ff8c00", false], [true, false, 50]],
                  [true, false],
                ],
              },
            ],
          },
          { type: "Header", title: "Colors" },
          {
            type: "Colors",
            id: "GreenBiomeColor",
            title: "Green Biome",
            description: "GreenBiome color.",
            icon: "landscape",
            onChange: [
              ["GreenBiomeColor", ["#b6db66", false], [true, false, 50]],
              [true, false],
            ],
          },
          {
            type: "Colors",
            id: "SnowBiomeColor",
            title: "Snow Biome",
            description: "SnowBiome color.",
            icon: "landscape",
            onChange: [
              ["SnowBiomeColor", ["#ffffff", false], [true, false, 50]],
              [true, false],
            ],
          },
          {
            type: "Colors",
            id: "DesertBiomeColor",
            title: "Desert Biome",
            description: "DesertBiome color.",
            icon: "landscape",
            onChange: [
              ["DesertBiomeColor", ["#dbc666", false], [true, false, 50]],
              [true, false],
            ],
          },
          {
            type: "Colors",
            id: "RiverColor",
            title: "River",
            description: "River color.",
            icon: "waves",
            onChange: [
              ["RiverColor", ["#91b2db", false], [true, false, 50]],
              [true, false],
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "nightMode",
        title: "Night Mode",
        description: "Enable night overlay effect",
        icon: "nights_stay",
        onChange: [
          ["nightMode", true],
          [true, false],
        ],
        suboptions: [
          {
            type: "checkbox",
            id: "dayNightCycle",
            title: "Day/Night Cycle",
            description: "Enable automatic day/night cycle",
            icon: "timelapse",
            onChange: [
              ["dayNightCycle", false],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "cycleDuration",
            title: "Cycle Duration",
            description: "Full day/night cycle duration (seconds)",
            icon: "timer",
            onChange: [
              ["cycleDuration", 720, [5, 1440], 5],
              [true, false],
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "showStars",
        title: "Show Stars",
        description: "Enable starry night effect",
        icon: "auto_awesome",
        onChange: [
          ["showStars", true],
          [true, false],
        ],
      },

      { type: "Header", title: "RESET" },
      {
        type: "button",
        id: "resetRenderDefaults",
        title: "Reset Render Settings",
        description: "Restore all render options to default values",
        icon: "restart_alt",
      },
    ],

    Gui: [
      { type: "Header", title: "MENU" },
      {
        type: "checkbox",
        id: "Notifdisplay",
        title: "Notification Display",
        description: "Show notifications",
        icon: "notifications",
        onChange: [
          ["Notifdisplay", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "AlertDisplay",
        title: "AlertDisplay",
        onChange: [
          ["AlertDisplay", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "ChatLog",
        title: "ChatLog Display",
        description: "Show ChatLog",
        icon: "chat",
        onChange: [
          ["ChatLog", true],
          [true, false],
        ],
      },
      {
        type: "Input",
        id: "MenuKey",
        title: "Menu-key",
        icon: "",
        onChange: [
          ["MenuKey", "Escape", { kind: "key" }],
          [true, false],
        ],
      },
    ],

    Bot: [
      { type: "Header", title: "BOT SETTINGS" },
      {
        type: "Input",
        id: "BotName",
        title: "Bot Name",
        description: "Name for spawned bots",
        icon: "badge",
        onChange: [
          [
            "BotName",
            "Abyssal",
            { kind: "text", placeholder: "Abyssal", maxLen: 15, live: true },
          ],
          [true, false],
        ],
      },
      {
        type: "Input",
        id: "BotCount",
        title: "Bot Count",
        description: "How many bots",
        icon: "groups",
        onChange: [
          ["BotCount", 1, { kind: "number", min: 1, max: 10, step: 1 }],
          [true, false],
        ],
      },
      { type: "Header", title: "AUTOMATION" },
      {
        type: "checkbox",
        id: "botAutoHeal",
        title: "Bot Auto Heal",
        description: "Bot automatically heals when low health",
        icon: "healing",
        onChange: [
          ["botAutoHeal", true],
          [true, false],
        ],
      },
      {
        type: "slider",
        id: "botAutoHealThreshold",
        title: "Bot Heal Threshold",
        description: "Health percentage to trigger bot auto heal",
        icon: "tune",
        onChange: [
          ["botAutoHealThreshold", 40, [10, 90]],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAutoUpgrade",
        title: "Bot Auto Upgrade",
        description: "Bot automatically upgrades when possible",
        icon: "upgrade",
        onChange: [
          ["botAutoUpgrade", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAutoAttack",
        title: "Bot Auto Attack",
        description: "Bot automatically attacks nearby enemies",
        icon: "gavel",
        onChange: [
          ["botAutoAttack", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botMills",
        title: "Bot Mills",
        description: "Bots place mills",
        icon: "precision_manufacturing",
        onChange: [
          ["botMills", false],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botPrivate",
        title: "Private Server",
        description: "Bots type commands",
        icon: "precision_manufacturing",
        onChange: [
          ["botPrivate", false],
          [true, false],
        ],
      },
      { type: "Header", title: "MOVEMENT" },
      {
        type: "checkbox",
        id: "botAutoMove",
        title: "Bot Auto Move",
        description: "Bot automatically moves to avoid damage",
        icon: "directions_run",
        onChange: [
          ["botAutoMove", true],
          [true, false],
        ],
      },
      {
        type: "selector",
        id: "botAutoMoveMode",
        title: "Bot Move Mode",
        description: "Bot movement behavior pattern",
        icon: "route",
        onChange: [
          [
            "botAutoMoveMode",
            "follow",
            ["follow", "circle", "mouse", "random", "away", "towards"],
          ],
          [true, false],
        ],
      },
    ],

    init() {
      this.buildSaveKeys();
      this.loadSettings();
      const TABS = [
        [
          "main",
          "home",
          "Main",
          "Core features",
          () => this.generateUI(this.Main, "main"),
        ],
        [
          "settings",
          "settings",
          "Settings",
          "Client options",
          () => this.generateUI(this.Setting, "settings"),
        ],
        [
          "render",
          "visibility",
          "Render",
          "Visual tweaks",
          () => this.generateUI(this.Render, "render"),
        ],
        [
          "gui",
          "dashboard",
          "GUI",
          "UI Interface style",
          () => this.generateUI(this.Gui, "gui"),
        ],
        [
          "bot",
          "person",
          "Bot",
          "Automation",
          () => this.generateUI(this.Bot, "bot"),
        ],
      ];
      const sidebarHTML = TABS.map(
        ([id, icon, title, desc], i) =>
          `<div class="z-tab ${i === 0 ? "active" : ""}" data-target="${id}"><i class="material-icons">${icon}</i><div class="z-tab-text"><div class="z-tab-title">${title}</div><div class="z-tab-desc">${desc}</div></div></div>`,
      ).join("");
      const pagesHTML = TABS.map(
        ([id, , , , render], i) =>
          `<div class="z-page ${i === 0 ? "active" : ""}" id="page-${id}"> ${render()}</div>`,
      ).join("");
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id="z-menu"><div class="z-menu-header"><div class="z-title-container"><div class="z-title">Abyss Client</div><div class="z-subtitle">v0.1</div></div><div class="z-header-right"><div class="z-iconbtn" id="z-save"><i class="material-icons" style="font-size:20px;">save</i></div><div class="z-iconbtn" id="z-reset"><i class="material-icons" style="font-size:20px;">restart_alt</i></div><input class="z-search-input" type="text" placeholder="Search..."><div class="z-close">&times;</div></div></div><div class="z-menu-body"><div class="z-sidebar">${sidebarHTML}</div><div class="z-content">${pagesHTML}</div></div></div>`,
      );
      this.menu = document.getElementById("z-menu");
      this.tabs = this.menu.querySelectorAll(".z-tab");
      this.pages = this.menu.querySelectorAll(".z-page");
      this.closeBtn = this.menu.querySelector(".z-close");
      this.searchInput = this.menu.querySelector(".z-search-input");
      this.setupEventHandlers();
      const pageMap = {
        main: this.Main,
        settings: this.Setting,
        render: this.Render,
        gui: this.Gui,
        bot: this.Bot,
      };
      Object.entries(pageMap).forEach(([pageId, options]) => {
        if (options) this.initOptionHandlers(options, pageId);
      });
      this.setupSaveControls();
      this.visible = false;
      this.menu.remove();
      const content = this.menu.querySelector(".z-content");
      content.addEventListener("scroll", () => {
        const page = this.menu.querySelector(".z-page.active");
        if (page) page._y = content.scrollTop;
        content._y = content.scrollTop;
      });
    },
    setupEventHandlers() {
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".z-submenu-btn");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        btn.blur();
        const opt = btn.closest(".z-option");
        const sub = opt?.nextElementSibling;
        if (!sub?.classList.contains("z-submenu-container")) return;
        sub.classList.toggle("open");
        const id = sub.id;
        if (id)
          sub.classList.contains("open")
            ? this._subMem.add(id)
            : this._subMem.delete(id);
      });
      this.tabs.forEach((tab) =>
        tab.addEventListener("click", () => this.switchTab(tab.dataset.target)),
      );
      this.closeBtn.addEventListener("click", () => this.toggle(false));
      this.setupSearch();
      ["input", "change", "click", "pointerup"].forEach((evt) =>
        this.menu.addEventListener(evt, () => this.queueSave()),
      );
      document.addEventListener("keydown", (e) => {
        const pressed = AB.Menu.keyCombo(e);
        if (!pressed) return;
        if (pressed === this.MenuKey) {
          this.toggle();
          this.searchInput.value = "";
          this.searchInput.blur();
          this.searchInput.dispatchEvent(new Event("input"));
        }
        if (e.key === "Tab" || e.key === "Alt") {
          e.preventDefault();
        }
      });
      document.addEventListener("contextmenu", (e) => e.preventDefault());
    },

    setupSearch() {
      const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();
      const rememberDisplay = (el) => {
        if (!el || el.dataset._disp) return;
        const d = getComputedStyle(el).display;
        el.dataset._disp = d && d !== "none" ? d : "block";
      };
      const show = (el, yes) => {
        if (!el) return;
        rememberDisplay(el);
        el.style.display = yes ? el.dataset._disp : "none";
      };
      const getSearchText = (el) => {
        if (el.classList.contains("z-perf-card")) {
          const name = el.querySelector(".z-perf-name")?.textContent || "";
          const meta = el.querySelector(".z-perf-meta")?.textContent || "";
          return norm(name + " " + meta + " graph");
        }
        if (el.classList.contains("z-stat")) {
          const name = el.querySelector(".z-stat-name")?.textContent || "";
          return norm(name + " stat");
        }
        return norm(el.innerText || "");
      };
      const syncHeaders = (scopeEl) => {
        if (!scopeEl) return;
        const kids = Array.from(scopeEl.children);
        kids.forEach((el) => {
          if (el.classList?.contains("z-sec-title")) el.style.display = "none";
        });
        let lastHeader = null;
        for (const el of kids) {
          const isHeader = el.classList?.contains("z-sec-title");
          const isOption = el.classList?.contains("z-option");
          if (isHeader) {
            lastHeader = el;
            continue;
          }
          if (!isOption) continue;
          const visible = getComputedStyle(el).display !== "none";
          if (visible && lastHeader)
            lastHeader.style.display = lastHeader.dataset._disp || "block";
        }
      };
      const search = () => {
        const q = norm(this.searchInput.value);
        const hasQ = !!q;
        let tab = null;
        const openSubs = [];
        this.pages.forEach((p) => {
          const topOptions = [...p.querySelectorAll(".z-option")].filter(
            (o) => !o.closest(".z-submenu-container"),
          );
          topOptions.forEach((o) => {
            const sub =
              o.nextElementSibling?.classList.contains("z-submenu-container") &&
              o.nextElementSibling;
            let hit = !hasQ || getSearchText(o).includes(q);
            let subHit = false;
            if (sub) {
              const subs = [...sub.querySelectorAll(".z-option")];
              subs.forEach((so) => {
                const m = !hasQ || getSearchText(so).includes(q);
                show(so, m);
                if (hasQ && m) subHit = true;
              });
              syncHeaders(sub);
              if (hasQ && subHit) openSubs.push(sub);
            }
            show(o, hit || subHit);
            if (hasQ && (hit || subHit) && !tab)
              tab = p.id.replace("page-", "");
          });
          const cards = [
            ...p.querySelectorAll(".z-perf-card"),
            ...p.querySelectorAll(".z-stat"),
          ];
          cards.forEach((c) => {
            const hit = !hasQ || getSearchText(c).includes(q);
            show(c, hit);
            if (hasQ && hit && !tab) tab = p.id.replace("page-", "");
          });
        });
        if (hasQ && tab) this.switchTab(tab);
        this.menu.querySelectorAll(".z-submenu-container").forEach((s) => {
          const keep = this._subMem.has(s.id);
          const temp = openSubs.includes(s);
          s.classList.toggle("open", hasQ ? temp : keep);
        });
      };
      this.searchInput.onfocus = () => {
        this.searchInput.value = "";
        search();
      };
      this.searchInput.oninput = search;
      document.addEventListener("click", (e) => {
        if (!this.menu.contains(e.target)) {
          this.searchInput.value = "";
          search();
        }
      });
      search();
    },

    toggle(force) {
      const open = force ?? !this.visible;
      this.visible = open;
      if (!open && this.menu) {
        this._subMem.clear();
        this.menu
          .querySelectorAll(".z-submenu-container.open")
          .forEach((s) => s.id && this._subMem.add(s.id));
      }
      this.__graph?.setActive(open);
      if (this._te) {
        this.menu.removeEventListener("transitionend", this._te, true);
        this._te = null;
      }
      if (open) {
        if (!this.menu.isConnected) document.body.appendChild(this.menu);
        void this.menu.offsetHeight;
        this.menu.querySelector(".z-content").scrollTop =
          this.menu.querySelector(".z-content")._y || 0;
        this.menu.classList.add("open");
        this.menu
          .querySelectorAll(".z-submenu-container")
          .forEach((s) =>
            s.classList.toggle("open", s.id && this._subMem.has(s.id)),
          );
        return;
      }
      const m = this.menu;
      this._te = (e) => {
        if (e.target !== m) return;
        m.removeEventListener("transitionend", this._te, true);
        this._te = null;
        if (!this.visible && m.isConnected) m.remove();
      };
      m.addEventListener("transitionend", this._te, true);
      m.classList.remove("open");
    },

    switchTab(target) {
      const content = this.menu.querySelector(".z-content");
      const cur = this.menu.querySelector(".z-page.active");
      if (cur) cur._y = content.scrollTop;
      this.tabs.forEach((tab) =>
        tab.classList.toggle("active", tab.dataset.target === target),
      );
      this.pages.forEach((page) =>
        page.classList.toggle("active", page.id === `page-${target}`),
      );
      const next = this.menu.querySelector(`#page-${target}`);
      content.scrollTop = next?._y || 0;
    },
  },

  NotiDisplay: {
    notifications: [],
    add(
      content,
      color = "#fff",
      v = 0,
      position = {},
      duration = 800,
      iC = false,
    ) {
      if (!iC && !AB.Menu.Notifdisplay) return;
      const n = document.createElement("div");
      n.className = v === 0 ? "NotiDisplayHolder" : "NotiDisplayHolder2";
      n.style.color = color;
      n.innerHTML = content;
      ["top", "right", "left", "bottom"].forEach((e) => {
        if (position[e]) n.style[e] = position[e];
      });
      n._basePosition = { ...position };
      document.body.appendChild(n);
      this.notifications.push(n);
      const calculateOffset = () => {
        const groups = {};
        this.notifications.forEach((el) => {
          const key =
            el._basePosition.top ?? el._basePosition.bottom ?? "default";
          if (!groups[key]) groups[key] = [];
          groups[key].push(el);
        });
        Object.values(groups).forEach((group) => {
          group.forEach((el, i) => {
            const basePos = el._basePosition;
            const offset = group
              .slice(0, i)
              .reduce((acc, el2) => acc + el2.offsetHeight + 10, 0);
            if (basePos.top)
              el.style.top = `calc(${basePos.top} + ${offset}px)`;
            else if (basePos.bottom)
              el.style.bottom = `calc(${basePos.bottom} + ${offset}px)`;
            else el.style.top = `calc(20px + ${offset}px)`;
          });
        });
      };
      calculateOffset();
      requestAnimationFrame(() => n.classList.add("show"));
      setTimeout(() => {
        n.classList.remove("show");
        n.classList.add("fade-out");
        this.notifications = this.notifications.filter((el) => el !== n);
        calculateOffset();
        const removeFn = () => n.parentNode && n.remove();
        n.addEventListener("transitionend", removeFn, { once: true });
        setTimeout(removeFn, 250);
      }, duration);
    },
    Alert({
      title = "",
      description = "",
      icons = [],
      duration = 2000,
      top = "20px",
      bottom = "",
      left = "20px",
      right = "",
      color = "#fff",
    } = {}) {
      if (!AB.Menu.AlertDisplay) return;
      const iconsHTML = icons
        .map((url, i) => {
          const rotate = i === 1 ? "transform: rotate(0deg);" : "";
          return `<img src="${url}" style="width:50px;height:50px;border-radius:6px;flex-shrink:0;${rotate};pointer-events: none;">`;
        })
        .join("");
      const html = `<div style="display:flex;align-items:center;gap:10px;">${iconsHTML}<div><h1 style="margin:0;font-size:18px;color:#00BFFF;font-weight:600;">${title}</h1>${description ? `<p style="margin:2px 0 0 0;font-size:14px;color:#E0E0E0;">${description}</p>` : ""}</div></div>`;
      this.add(html, color, 1, { top, bottom, left, right }, duration, true);
    },
  },
  playerLog: {
    playerLogs: null,
    init() {
      this.playerLogs = document.createElement("div");
      this.playerLogs.id = "PlayerLog";
      this.playerLogs.innerHTML = `<div id="PlayerLogBoard">PlayerLog<div class="PlayerLogHolder"><div id="PlayerLogitems" class="PlayerLogitems"></div></div></div>`;
      this.setupToggle();
    },
    addThis(messages, color) {
      const box = document.getElementById("PlayerLogitems");
      if (!box) return;
      box.innerHTML = messages
        .map(
          (msg) =>
            `<span style="color:${color}; font-size:13px;">${msg}</span>`,
        )
        .join("<br>");
    },
    setupToggle() {
      const board = this.playerLogs.querySelector("#PlayerLogBoard"),
        leaderboard = E("leaderboard"),
        storeb = E("storeButton"),
        allb = E("allianceButton");
      if (!board || !leaderboard || !storeb || !allb) return;
      const toggle = (show) => {
        if (show && !document.body.contains(this.playerLogs)) {
          document.body.appendChild(this.playerLogs);
          requestAnimationFrame(() => board.classList.add("active"));
        } else if (!show && this.playerLogs.parentElement) {
          board.classList.remove("active");
          [leaderboard, allb, storeb].forEach(
            (el) => (el.style.transform = "translateX(0)"),
          );
          this.playerLogs.addEventListener(
            "transitionend",
            () => this.playerLogs.remove(),
            { once: true },
          );
          return;
        }
        leaderboard.style.transition =
          allb.style.transition =
          storeb.style.transition =
          "transform 0.5s ease";
        leaderboard.style.transform = show
          ? "translateX(-260px)"
          : "translateX(0)";
        [allb, storeb].forEach(
          (el) => (el.style.transform = "translateX(0)"),
        ); /*(Z.Menu.GuiLayOut == "none" && show) ? 'translateX(-260px)' : 'translateX(0)');*/
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") toggle(true);
      });
      document.addEventListener("keyup", (e) => {
        if (e.key === "Tab") toggle(false);
      });
    },
  },
  Chats: {
    chatLog: null,
    input: null,
    panes: null,
    tab: "history",
    hover: false,
    focused: false,
    idleT: 0,
    leaveT: 0,
    _lastOn: null,
    unread: { history: 0, private: 0, log: 0 },
    atBottom: { history: true, private: true, log: true },
    _msgQ: { history: [], private: [], log: [] },
    scrollState: {
      history: { y: 0, atBottom: true },
      private: { y: 0, atBottom: true },
      log: { y: 0, atBottom: true },
    },
    _appendQ: { history: [], private: [], log: [] },
    _appendRAF: 0,
    _scrollRAF: 0,
    _lastSmoothScroll: 0,
    _smoothEveryMs: 180,
    _bottomPx: 18,
    _spam: { history: null, private: null, log: null },
    _searchEl: null,
    _searchQ: "",
    init() {
      this.chatLog = document.createElement("div");
      this.chatLog.id = "chat";
      this.chatLog.innerHTML = `<div id="ChatBodyBox"><div id="ChatTabs"><input id="ChatSearch" placeholder="Search" autocomplete="off"><div class="ChatTab active" data-tab="history" data-tip="History"><i class="material-icons">history</i><div class="badge"></div></div><div class="ChatTab" data-tab="private" data-tip="Private"><i class="material-icons">mail</i><div class="badge"></div></div><div class="ChatTab" data-tab="log" data-tip="Log"><i class="material-icons">terminal</i><div class="badge"></div></div></div><div id="ChatMessagesWrap"><div class="ChatPane" data-pane="history" id="ChatMessages"></div><div class="ChatPane isHidden" data-pane="private"></div><div class="ChatPane isHidden" data-pane="log"></div></div><input id="ChatInPut" maxlength="30" placeholder="Enter Message"></div>`;
      this.input = this.chatLog.querySelector("#ChatInPut");
      this.panes = {
        history: this.chatLog.querySelector('[data-pane="history"]'),
        private: this.chatLog.querySelector('[data-pane="private"]'),
        log: this.chatLog.querySelector('[data-pane="log"]'),
      };
      if (AB.Menu.ChatLog) {
        document.body.appendChild(this.chatLog);
        requestAnimationFrame(() => this.chatLog.classList.add("active"));
      } else {
        this.chatLog.classList.remove("active", "wake", "idle");
      }
      this.bind();
      this.setTab(this.tab);
      this.setIdle(1);
      this._lastOn = null;
      setInterval(() => {
        const on = !!AB.Menu.ChatLog;
        if (on === this._lastOn) return;
        this._lastOn = on;
        this.toggle();
      }, 150);
    },
    toggle() {
      const on = !!AB.Menu.ChatLog;
      const el = this.chatLog;
      const box = el.querySelector("#ChatBodyBox");
      if (on) {
        if (!el.isConnected) document.body.appendChild(el);
        el.classList.remove("active", "wake");
        el.classList.add("idle");
        void box.offsetHeight;
        requestAnimationFrame(() => {
          el.classList.add("active");
          requestAnimationFrame(() => this.wake());
        });
        return;
      }
      if (!on && el.isConnected) {
        el.classList.remove("wake");
        el.classList.add("idle");
        el.classList.remove("active");
        const done = () => {
          box.removeEventListener("transitionend", done, true);
          if (!AB.Menu.ChatLog && el.isConnected) el.remove();
        };
        box.addEventListener("transitionend", done, true);
        setTimeout(done, 400);
        this.focused = 0;
        this.hover = 0;
        this.setIdle(1);
      }
    },
    _tabEl(name) {
      return this.chatLog?.querySelector(`.ChatTab[data-tab="${name}"]`);
    },
    _isAtBottom(pane, px = this._bottomPx) {
      return pane.scrollHeight - (pane.scrollTop + pane.clientHeight) <= px;
    },
    _saveScroll(k) {
      const p = this.panes?.[k];
      if (!p) return;
      this.scrollState[k] = { y: p.scrollTop, atBottom: this._isAtBottom(p) };
    },
    _restoreScroll(k) {
      const p = this.panes?.[k];
      if (!p) return;
      const st = this.scrollState[k] || { y: 0, atBottom: true };
      requestAnimationFrame(() => {
        if (st.atBottom) {
          p.scrollTop = p.scrollHeight;
          this.atBottom[k] = true;
          this._msgQ[k].length = 0;
          this.unread[k] = 0;
        } else {
          const maxY = Math.max(0, p.scrollHeight - p.clientHeight);
          p.scrollTop = Math.min(st.y | 0, maxY);
          this.atBottom[k] = this._isAtBottom(p);
          if (this.tab === k) this._checkRead(k);
        }
        this._updateBadges();
      });
    },
    _fmtTime(ts = Date.now()) {
      const d = new Date(ts),
        h = d.getHours(),
        m = String(d.getMinutes()).padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM",
        hh = h % 12 || 12;
      return `[${hh}:${m} ${ap}]`;
    },
    _esc(s) {
      return String(s).replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
    },
    _updateBadges() {
      const open = this.chatLog?.classList.contains("active");
      if (!open) {
        this.chatLog?.querySelectorAll(".ChatTab").forEach((t) => {
          t.classList.remove("hasNew");
          const b = t.querySelector(".badge");
          if (b) b.textContent = "";
        });
        return;
      }
      this.chatLog.querySelectorAll(".ChatTab").forEach((tabEl) => {
        const k = tabEl.dataset.tab;
        const count = this.unread[k] | 0;
        const show = count > 0 && (this.tab !== k || !this.atBottom[k]);
        tabEl.classList.toggle("hasNew", show);
        const b = tabEl.querySelector(".badge");
        if (b) b.textContent = show ? (count > 99 ? "99+" : String(count)) : "";
      });
    },
    _checkRead(tabKey) {
      const pane = this.panes?.[tabKey];
      if (!pane) return;
      const list = this._msgQ[tabKey];
      if (!list.length) return;
      const top = pane.scrollTop;
      const bottom = top + pane.clientHeight;
      let i = 0;
      while (i < list.length) {
        const node = list[i];
        if (!node || !node.isConnected) {
          list.splice(i, 1);
          continue;
        }
        const y0 = node.offsetTop;
        const y1 = y0 + node.offsetHeight;
        const visible = y1 >= top + 8 && y0 <= bottom - 8;
        if (!visible) break;
        list.splice(i, 1);
        node.__unreadQueued = false;
        this.unread[tabKey] = Math.max(0, (this.unread[tabKey] | 0) - 1);
      }
    },
    setTab(name) {
      const prev = this.tab;
      if (prev && this.panes?.[prev]) this._saveScroll(prev);
      this.tab = name;
      this.chatLog
        .querySelectorAll(".ChatTab")
        .forEach((x) => x.classList.toggle("active", x.dataset.tab === name));
      Object.entries(this.panes).forEach(([k, el]) =>
        el.classList.toggle("isHidden", k !== name),
      );
      this._restoreScroll(name);
      if (this._searchEl) {
        this._searchEl.value = "";
        this._setSearch("");
      }
      this.wake();
    },
    wake() {
      clearTimeout(this.idleT);
      clearTimeout(this.leaveT);
      this.chatLog.classList.add("wake");
      this.chatLog.classList.remove("idle");
      this.idleT = setTimeout(() => {
        if (!this.hover && !this.focused) this.setIdle(1);
      }, 2200);
    },
    deferIdle() {
      clearTimeout(this.leaveT);
      this.leaveT = setTimeout(() => {
        if (!this.hover && !this.focused) this.setIdle(1);
      }, 220);
    },
    setIdle(on) {
      this.chatLog.classList.toggle("idle", !!on);
      this.chatLog.classList.toggle("wake", !on);
    },
    _normMsg(s) {
      return String(s ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    },
    _setSearch(q) {
      this._searchQ = (q || "").trim().toLowerCase();
      this._applySearch();
    },
    _applySearch() {
      const pane = this.panes?.[this.tab];
      if (!pane) return;
      const q = (this._searchQ || "").trim().toLowerCase();
      const nodes = pane.querySelectorAll(".ChatLine");
      nodes.forEach((n) => {
        const msgEl = n.querySelector(".msg");
        if (!msgEl) return;
        const base = (
          msgEl.__base ??
          msgEl.getAttribute("data-base") ??
          msgEl.textContent ??
          ""
        ).replace(/\x00/g, "");
        const count =
          msgEl.__count ?? +(msgEl.getAttribute("data-count") || 1) ?? 1;
        const hit = !q || String(base).toLowerCase().includes(q);
        n.classList.toggle("isFiltered", !hit);
        if (hit) {
          this._renderMsg(msgEl, base, count, q);
        }
      });
    },
    bind() {
      const box = this.chatLog.querySelector("#ChatBodyBox");
      this.chatLog.addEventListener("click", (e) => {
        const t = e.target.closest(".ChatTab");
        if (!t) return;
        this.setTab(t.dataset.tab);
      });
      box.addEventListener("mouseenter", () => {
        this.hover = 1;
        this.wake();
      });
      box.addEventListener("mouseleave", () => {
        this.hover = 0;
        this.deferIdle();
      });
      this._searchEl = this.chatLog.querySelector("#ChatSearch");
      this._searchEl?.addEventListener("input", () => {
        this._setSearch(this._searchEl.value);
        this.wake();
      });
      this._searchEl?.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.target.value = "";
          this._setSearch("");
          e.target.blur();
        }
      });
      this.input.addEventListener("focus", () => {
        this.focused = 1;
        this.wake();
      });
      this.input.addEventListener("blur", () => {
        this.focused = 0;
        this.deferIdle();
      });
      Object.entries(this.panes).forEach(([k, pane]) => {
        pane.addEventListener(
          "scroll",
          () => {
            this.atBottom[k] = this._isAtBottom(pane);
            if (this.tab === k) this._checkRead(k);
            if (this.atBottom[k]) {
              this._msgQ[k].length = 0;
              this.unread[k] = 0;
            }
            this._updateBadges();
          },
          { passive: true },
        );
      });
      this.chatLog.addEventListener("contextmenu", (e) => {
        const t = e.target.closest(".ChatTab");
        if (!t) return;
        e.preventDefault();
        const k = t.dataset.tab;
        if (!k || !this.panes?.[k]) return;
        this.unread[k] = 0;
        this._msgQ[k].length = 0;
        const p = this.panes[k];
        p.scrollTop = p.scrollHeight;
        this.atBottom[k] = true;
        this._updateBadges();
      });
      let blockEnterUp = false;
      const isInput = () => {
        const a = document.activeElement;
        return a === this.input || a === this._searchEl;
      };
      const stop = (e) => (e.preventDefault(), e.stopImmediatePropagation());
      const handleKeys = (e) => {
        if (!AB.Menu.ChatLog) return;
        const k = e.keyCode,
          inI = isInput();
        if (k === 27 && inI) {
          stop(e);
          const a = document.activeElement;
          if (a === this._searchEl) {
            a.value = "";
            this._setSearch("");
          }
          if (a === this.input) this.input.value = "";
          a?.blur?.();
          this.setIdle(1);
          return;
        }
        if (k === 13) {
          stop(e);
          blockEnterUp = true;
          if (document.activeElement === this.input) {
            const v = this.input.value;
            if (v) sendChat(v);
            this.input.value = "";
            setTimeout(() => this.input.blur(), 10);
          } else if (!this.focused) {
            this.wake();
            this.input.focus();
          }
          return;
        }
        if (inI) e.stopImmediatePropagation();
      };
      const blockKeys = (e) => {
        if (!AB.Menu.ChatLog) return;
        const k = e.keyCode;
        if (k === 13 && blockEnterUp) return (stop(e), (blockEnterUp = false));
        if (isInput()) e.stopImmediatePropagation();
      };
      document.addEventListener(
        "pointerdown",
        (e) => {
          if (!AB.Menu.ChatLog) return;
          const r = box.getBoundingClientRect();
          const x = e.clientX,
            y = e.clientY;
          if (x < r.left || x > r.right || y < r.top || y > r.bottom) {
            this.input.blur();
            if (this._searchEl) {
              this._searchEl.value = "";
              this._setSearch("");
              this._searchEl.blur();
            }
            this.focused = 0;
            this.deferIdle();
          }
        },
        true,
      );
      window.addEventListener("keydown", handleKeys, { capture: true });
      window.addEventListener("keyup", blockKeys, { capture: true });
    },
    _enqueue(tab, m, c) {
      const key = tab && this.panes?.[tab] ? tab : "history";
      this._appendQ[key].push({ m, c: c || "#fff", ts: Date.now() });
      if (!this._appendRAF)
        this._appendRAF = requestAnimationFrame(() => this._flushAppend());
    },

    _queueScrollToBottom(pane) {
      if (this._scrollRAF) return;
      this._scrollRAF = requestAnimationFrame(() => {
        this._scrollRAF = 0;
        pane.scrollTop = pane.scrollHeight;
      });
    },
    _renderMsg(msgEl, base, count, q) {
      base = String(base ?? "");
      count = count | 0;
      const safe = this._esc(base);
      let html;
      if (!q) {
        html = safe;
      } else {
        const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
        html = safe.replace(re, (m) => `<mark>${m}</mark>`);
      }
      if (count > 1) html += ` <span class="x">${count}x</span>`;
      msgEl.innerHTML = html;
    },

    _flushAppend() {
      this._appendRAF = 0;
      if (!this.panes) return;
      const chatOpen = this.chatLog.classList.contains("active");
      for (const k of ["history", "private", "log"]) {
        const pane = this.panes[k];
        const q = this._appendQ[k];
        if (!pane || !q.length) continue;
        const isCurrentTab = this.tab === k;
        const wasAtBottom = this._isAtBottom(pane);
        const frag = document.createDocumentFragment();
        const newNodes = [];
        for (let i = 0; i < q.length; i++) {
          const it = q[i];
          const norm = this._normMsg(it.m);
          const last = this._spam[k];
          const lastAlive =
            last &&
            last.node &&
            (last.node.isConnected || last.node.parentNode);
          if (lastAlive && last.norm === norm) {
            last.count++;
            const msgEl = last.node.querySelector(".msg");
            if (msgEl) {
              const base =
                msgEl.__base ??
                msgEl.getAttribute("data-base") ??
                msgEl.textContent ??
                "";
              msgEl.__base = base;
              msgEl.__count = last.count;
              msgEl.setAttribute("data-base", base);
              msgEl.setAttribute("data-count", String(last.count));
              this._renderMsg(msgEl, base, last.count, this._searchQ);
            }
            if (chatOpen && (!wasAtBottom || !isCurrentTab)) {
              this.unread[k] = (this.unread[k] | 0) + 1;
              if (!last.node.__unreadQueued) {
                last.node.__unreadQueued = true;
                this._msgQ[k].push(last.node);
              }
            }
            continue;
          }
          const line = document.createElement("div");
          line.className = "ChatLine isNew";
          const ts = document.createElement("span");
          ts.className = "ts";
          ts.textContent = this._fmtTime(it.ts);
          const msgEl = document.createElement("span");
          msgEl.className = "msg";
          msgEl.style.color = it.c;
          msgEl.__base = it.m;
          msgEl.__count = 1;
          msgEl.setAttribute("data-base", it.m);
          msgEl.setAttribute("data-count", "1");
          this._renderMsg(msgEl, msgEl.__base, msgEl.__count, this._searchQ);
          line.appendChild(ts);
          line.appendChild(msgEl);
          this._spam[k] = { norm, node: line, count: 1 };
          frag.appendChild(line);
          newNodes.push(line);
          if (chatOpen && (!wasAtBottom || !isCurrentTab)) {
            this.unread[k] = (this.unread[k] | 0) + 1;
            this._msgQ[k].push(line);
          }
        }
        q.length = 0;
        pane.appendChild(frag);
        setTimeout(() => {
          for (const n of newNodes) n.classList.remove("isNew");
        }, 220);
        if (wasAtBottom && isCurrentTab) {
          this._queueScrollToBottom(pane);
          this.atBottom[k] = true;
          this.unread[k] = 0;
          this._msgQ[k].length = 0;
        } else {
          this.atBottom[k] = this._isAtBottom(pane);
          if (isCurrentTab) this._checkRead(k);
        }
      }
      this._updateBadges();
      this.wake();
      if (this._searchQ) this._applySearch();
    },

    add(m, c = "#fff", tab = "history") {
      this._enqueue(tab, m, c);
    },
  },

  applyStyles() {
    const Ss = document.createElement("style");
    Ss.textContent = Object.values(this.styles).join(" ");
    document.head.appendChild(Ss);
  },
  Updates() { },
  init() {
    this.applyStyles();
    setInterval(() => this.Updates(), 100);
    [this.Menu, this.playerLog, this.Chats].forEach((W) => W.init());
    const h = new Date().getHours();
    setTimeout(
      () =>
        AB.NotiDisplay.add(
          h < 5
            ? "Good evening"
            : h <= 12
              ? "Good morning"
              : h <= 18
                ? "Good afternoon"
                : "Good evening",
          "#9B5CFF",
          0,
        ),
      10,
    );
    setTimeout(() => {
      [
        "#errorNotification",
        "#linksContainer2",
        "#promoImgHolder",
        "#youtuberOf",
        "#mobileInstructions",
        "#pre-content-container",
        "#cdm-zone-end",
        "#touch-controls-left",
        "#touch-controls-right",
        "#settingsButton",
        "#leaderboardButton",
        "#shutdownDisplay",
        "#diedText",
        "#downloadButtonContainer",
        "#mobileDownloadButtonContainer",
        "#joinPartyButton",
        "#partyButton",
        "#promoImg",
        "#videoad",
        'script[src*="adsbygoogle"]',
        'textarea[aria-hidden="true"]',
      ].forEach((sel) => document.querySelector(sel)?.remove());
      this.setStyle(
        [
          "guideCard",
          "adCard",
          "chatButton",
          "rightCardHolder",
          "desktopInstructions",
          "altServer",
          ".menuHeader",
          ".menuText",
        ],
        [
          { boxShadow: "none", textAlign: "unset" },
          { display: "none" },
          { display: "none" },
          { display: "block" },
          { display: "none" },
          { display: "none" },
          { display: "none" },
          { display: "none" },
        ],
      );
    }, 500);
  },
};
AB.init();
let configs = new Proxy(
  {},
  {
    get(_, k) {
      return AB.Menu[k];
    },
    set(_, k, v) {
      AB.Menu[k] = v;
      return true;
    },
  },
);
const Mod = {
  tick: 0,
  tickQueue: [],
  tickBase: function (set, tick) {
    if (this.tickQueue[this.tick + tick]) {
      this.tickQueue[this.tick + tick].push(set);
    } else {
      this.tickQueue[this.tick + tick] = [set];
    }
  },
  tickRate: 1000 / config.serverUpdateRate,
  tickSpeed: 0,
  lastTick: performance.now(),

  Place: {
    _lastObstaclePlace: 0,
    _lastMill: null,
    _failedPlacements: new Map(),
    _failedPlacementTtl: 900,
    _placementQuantize: 12,
    _replaceSpam: new Map(),

    _getPlacementKey(itemId, x, y) {
      return (
        itemId +
        ":" +
        Math.round(x / this._placementQuantize) +
        ":" +
        Math.round(y / this._placementQuantize)
      );
    },

    _isPlacementBlocked(itemId, x, y) {
      const key = this._getPlacementKey(itemId, x, y);
      const until = this._failedPlacements.get(key);
      if (!until) return false;
      if (until <= Date.now()) {
        this._failedPlacements.delete(key);
        return false;
      }
      return true;
    },

    _schedulePlacementCheck(itemSlot, x, y) {
      const itemId = player.items[itemSlot];
      if (itemId == null) return;
      const item = items.list[itemId];
      if (!item) return;
      const key = this._getPlacementKey(itemId, x, y);
      Mod.tickBase(() => {
        const exists = liztobj.find(
          (obj) =>
            obj.active &&
            UTILS.getDistance(x, y, obj.x, obj.y) < item.scale * 0.75,
        );
        if (!exists) {
          this._failedPlacements.set(key, Date.now() + this._failedPlacementTtl);
        }
      }, 1);
    },

    getPotentialDamage(build, user) {
      const weapIndex =
        user.weapons[1] === 10 && !player.reloads[user.weapons[1]] ? 1 : 0;
      const weap = user.weapons[weapIndex];
      if (player.reloads[weap]) return 0;
      const weapon = items.weapons[weap];
      if (!weapon) return 0;
      const buildScale = build.getScale ? build.getScale() : build.scale || 0;
      const inDist = cdf(build, user) <= buildScale + weapon.range;
      return user.visible && inDist ? weapon.dmg * (weapon.sDmg || 1) * 3.3 : 0;
    },

    place(id, dir, isTrue) {
      place(id, dir, isTrue);
    },

    selectToBuild(id, isTrue) {
      selectToBuild(id, isTrue);
    },

    checkPlace(id, isTrue) {
      checkPlace(id, isTrue);
    },

    AutoMill() {
      if (!mills.place) return;
      if (window.location.host !== "sandbox.moomoo.io" || checkLimit(3)) {
        mills.place = false;
        return;
      }
      if (
        !player ||
        lastMoveDir === undefined ||
        (player.y > 6838 && player.y < 7563)
      )
        return;

      if (!this._lastMill) this._lastMill = { x: player.x, y: player.y };
      const W2 =
        1.13 +
        (player.items[3] === 11 ? 0.02 : player.items[3] === 12 ? 0.06 : 0);
      const angles = [
        lastMoveDir + Math.PI,
        lastMoveDir + Math.PI - W2,
        lastMoveDir + Math.PI + W2,
      ];

      if (fsd(this._lastMill, player) >= 90) {
        angles.forEach((a) => checkPlace(3, a));
        this._lastMill.x = player.x;
        this._lastMill.y = player.y;
      }
    },

    canPlaceAt(x, y, itemScale, ignoreSid) {
      if (
        !objectManager.checkItemLocation(
          x,
          y,
          itemScale,
          0.6,
          0,
          false,
          player,
          ignoreSid,
        )
      ) {
        return false;
      }
      for (let i = 0; i < liztobj.length; i++) {
        const obj = liztobj[i];
        if (!obj.active || obj.sid === ignoreSid) continue;
        const objScale = this.getObjScale(obj);
        const dx = x - obj.x;
        const dy = y - obj.y;
        const minDist = itemScale + objScale;
        if (dx * dx + dy * dy < minDist * minDist) {
          return false;
        }
      }
      return true;
    },

    getObjScale(obj) {
      if (!obj) return 0;
      return (
        obj.blocker ||
        obj.scale *
        (obj.isItem || [2, 3, 4].includes(obj.type) ? 1 : 0.6) *
        obj.colDiv
      );
    },

    inRiver(y) {
      const river = {
        min: config.mapScale / 2 - config.riverWidth / 2,
        max: config.mapScale / 2 + config.riverWidth / 2,
      };
      return y >= river.min && y <= river.max;
    },

    closestPossibleAngles(obj, id) {
      let itemId = player.items[id];
      if (itemId == undefined) return;
      let item = items.list[itemId];
      let objScale = obj.getScale
        ? obj.getScale(0.6, obj.isItem) + 0.6
        : obj.scale + 0.6;
      let dx = obj.x - player.x2;
      let dy = obj.y - player.y2;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > player.scale + objScale + 2 * item.scale + item.placeOffset) {
        return [UTILS.getDirect(obj, player, 0, 2)];
      }
      let D = player.scale + item.scale + item.placeOffset;
      let E = objScale + item.scale;
      let a = (D * D - E * E + dist * dist) / (2 * dist);
      let h = Math.sqrt(Math.max(0, D * D - a * a));
      let px = player.x2 + (a / dist) * dx;
      let py = player.y2 + (a / dist) * dy;
      let c = {
        x1: px + (h / dist) * dy,
        x2: px - (h / dist) * dy,
        y1: py - (h / dist) * dx,
        y2: py + (h / dist) * dx,
      };
      return [
        Math.atan2(c.y1 - player.y2, c.x1 - player.x2),
        Math.atan2(c.y2 - player.y2, c.x2 - player.x2),
      ];
    },

    getAngles(id, amount) {
      let item = items.list[player.items[id]];
      if (!item) return [];
      let Result = [];
      let nearObjects = liztobj.filter(
        (e) => e.active && UTILS.getDistance(e, player, 0, 2) <= 400,
      );
      let angleNeeded = amount;
      for (let i = 0; i < angleNeeded; i++) {
        let base = i * ((Math.PI * 2) / angleNeeded);
        let angle = base;
        for (let j = 0; j < nearObjects.length; j++) {
          let obj = nearObjects[j];
          if (!obj) continue;
          let extraAnglesmh = this.closestPossibleAngles(obj, id);
          if (!extraAnglesmh) continue;
          let best = extraAnglesmh[0];
          if (extraAnglesmh.length > 1) {
            let d0 = Math.abs(UTILS.getAngleDist(base, extraAnglesmh[0]));
            let d1 = Math.abs(UTILS.getAngleDist(base, extraAnglesmh[1]));
            best = d1 < d0 ? extraAnglesmh[1] : extraAnglesmh[0];
          }
          if (
            Math.abs(UTILS.getAngleDist(base, best)) <
            ((Math.PI * 2) / angleNeeded) * 0.6
          ) {
            angle = best;
            break;
          }
        }
        let tmpScale =
          (player.scale || 35) + item.scale + (item.placeOffset || 0);
        let tmp = {
          x: player.x2 + Math.cos(angle) * tmpScale,
          y: player.y2 + Math.sin(angle) * tmpScale,
        };
        if (
          !objectManager.checkItemLocation(
            tmp.x,
            tmp.y,
            item.scale,
            0.6,
            angle,
            false,
          )
        ) {
          continue;
        }
        Result.push(angle);
      }
      return Result;
    },

    placeAround(id, amount = 16) {
      if (!id || !player.items[id]) return;
      const angles = this.getAngles(id, amount);
      if (!angles) return;
      for (let i = 0; i < angles.length; i++) {
        this.testCanPlace(id, 0, 0, 0, angles[i], false, false);
      }
    },

    testCanPlace(id, first, repeat, plus, radian, replacer, yaboi) {
      const PI = Math.PI;
      const PI2 = PI * 2;
      const cos = Math.cos;
      const sin = Math.sin;
      try {
        if (first === undefined) first = -PI / 2;
        if (repeat === undefined) repeat = PI / 2;
        if (plus === undefined) plus = PI / 18;
        let item = items.list[player.items[id]];
        if (!item) return;
        let tmpS = player.scale + item.scale + (item.placeOffset || 0);
        let counts = { attempts: 0, placed: 0 };
        let tmpObjects = [];

        liztobj.forEach((p) => {
          tmpObjects.push({
            x: p.x,
            y: p.y,
            active: p.active,
            blocker: p.blocker,
            scale: p.scale,
            isItem: p.isItem,
            type: p.type,
            colDiv: p.colDiv,
            getScale: function (sM = 1, ig) {
              return (
                this.scale *
                (this.isItem || [2, 3, 4].includes(this.type) ? 1 : 0.6 * sM) *
                (ig ? 1 : this.colDiv)
              );
            },
          });
        });

        for (let i = first; i < repeat; i += plus) {
          counts.attempts++;
          let relAim = radian + i;
          let tmpX = player.x2 + tmpS * cos(relAim);
          let tmpY = player.y2 + tmpS * sin(relAim);
          const tryPlaceSlot = (slotId) => {
            const itemId = player.items[slotId];
            if (itemId == null) return false;
            if (this._isPlacementBlocked(itemId, tmpX, tmpY)) return false;
            place(slotId, relAim, 1);
            this._schedulePlacementCheck(slotId, tmpX, tmpY);
            return true;
          };
          let cantPlace = tmpObjects.find(
            (tmp) =>
              tmp.active &&
              UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
              item.scale +
              (tmp.blocker ? tmp.blocker : tmp.getScale(0.6, tmp.isItem)),
          );
          if (cantPlace) continue;
          if (
            item.id !== 18 &&
            tmpY >= config.mapScale / 2 - config.riverWidth / 2 &&
            tmpY <= config.mapScale / 2 + config.riverWidth / 2
          )
            continue;

          let placed = false;
          if (!replacer && yaboi) {
            if (yaboi.inTrap) {
              if (UTILS.getAngleDist(Enemy.aim2 + PI, relAim + PI) <= PI * 1.3) {
                placed = tryPlaceSlot(2);
              } else {
                if (player.items[4] === 15) placed = tryPlaceSlot(4);
              }
            } else {
              if (
                UTILS.getAngleDist(Enemy.aim2, relAim) <=
                config.gatherAngle / 2.6
              ) {
                placed = tryPlaceSlot(2);
              } else {
                if (player.items[4] === 15) placed = tryPlaceSlot(4);
              }
            }
          } else {
            placed = tryPlaceSlot(id);
          }

          if (placed) {
            tmpObjects.push({
              x: tmpX,
              y: tmpY,
              active: true,
              blocker: item.blocker,
              scale: item.scale,
              isItem: true,
              type: null,
              colDiv: item.colDiv,
              getScale: function () {
                return this.scale;
              },
            });

            if (UTILS.getAngleDist(Enemy.aim2, relAim) <= 1) counts.placed++;
          }
        }

        if (counts.placed > 0 && replacer && item.dmg && configs.SpikeTick) {
          if (
            Enemy.dist2 <=
            items.weapons[player.weapons[0]].range + player.scale * 1.8
          ) {
            instaC.canSpikeTick = true;
          }
        }
      } catch (err) { }
    },

    checkSpikeTick() {
      try {
        if (!near || ![3, 4, 5].includes(Enemy.primaryIndex)) return false;
        if (
          my.autoPush
            ? false
            : Enemy.primaryIndex == null
              ? true
              : Enemy.reloads[Enemy.primaryIndex] > Mod.tickRate
        )
          return false;
        if (
          Enemy.dist2 <=
          items.weapons[Enemy.primaryIndex || 5].range + Enemy.scale * 1.8
        ) {
          let item = items.list[9];
          let tmpS = Enemy.scale + item.scale + (item.placeOffset || 0);
          let danger = 0;
          for (let i = -1; i <= 1; i += 0.1) {
            let relAim = UTILS.getDirect(player, Enemy, 2, 2) + i;
            let tmpX = Enemy.x2 + tmpS * Math.cos(relAim);
            let tmpY = Enemy.y2 + tmpS * Math.sin(relAim);
            let cantPlace = liztobj.find(
              (tmp) =>
                tmp.active &&
                UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                item.scale +
                (tmp.blocker ? tmp.blocker : tmp.getScale(0.6, tmp.isItem)),
            );
            if (cantPlace) continue;
            if (
              tmpY >= config.mapScale / 2 - config.riverWidth / 2 &&
              tmpY <= config.mapScale / 2 + config.riverWidth / 2
            )
              continue;
            danger++;
            break;
          }
          if (danger && Enemy.dist2 <= 300) {
            my.anti0Tick = 1;
            healer();
            return true;
          }
        }
      } catch (err) {
        return null;
      }
      return false;
    },

    autoPlace() {
      if (!Enemy.length || !configs.AutoPlace || instaC.ticking || !Enemy)
        return;
      if (traps.inTrap) return;

      const tickInterval = Math.max(1, AB.Menu.autoPlaceTick || 1);
      if (Mod.tick % tickInterval !== 0) return;

      const PI = Math.PI;
      const PI2 = PI * 2;

      if (gameObjects.length) {
        let near2 = { inTrap: false };
        let nearTrap = gameObjects
          .filter(
            (e) =>
              e.trap &&
              e.active &&
              e.isTeamObject(player) &&
              UTILS.getDist(e, Enemy, 0, 2) <= Enemy.scale + e.getScale() + 5,
          )
          .sort(
            (a, b) =>
              UTILS.getDist(a, Enemy, 0, 2) - UTILS.getDist(b, Enemy, 0, 2),
          )[0];
        if (nearTrap) near2.inTrap = true;

        if (Enemy.dist3 <= 450) {
          if (Enemy.dist3 <= 200) {
            this.testCanPlace(4, 0, PI2, PI / 24, Enemy.aim2, 0, {
              inTrap: near2.inTrap,
            });
          } else {
            player.items[4] === 15 &&
              this.testCanPlace(4, 0, PI2, PI / 24, Enemy.aim2);
          }
        }
      } else {
        if (Enemy.dist3 <= 450) {
          player.items[4] === 15 &&
            this.testCanPlace(4, 0, PI2, PI / 24, Enemy.aim2);
        }
      }
    },

    replacer(findObj) {
      if (!findObj || !configs.autoReplace || !inGame || traps.antiTrapped)
        return;

      const PI = Math.PI;
      const PI2 = PI * 2;

      const sid = findObj.sid ?? findObj.id ?? 0;
      const now = Date.now();
      const state = this._replaceSpam.get(sid) || { last: 0, retryDone: false };
      const afterBreak = !findObj.active || findObj.health <= 0;
      if (now - state.last < 120 && !afterBreak) return;
      state.last = now;
      this._replaceSpam.set(sid, state);

      let predictedDamage = 0;
      for (let i = 0; i < players.length; i++) {
        predictedDamage += this.getPotentialDamage(findObj, players[i]);
      }
      const baseDmg = items.weapons[player.weapons[0]]?.dmg || 0;
      const shouldSpam =
        predictedDamage > 0 &&
        findObj.health - predictedDamage <= baseDmg * 0.8 + 5;

      const attemptReplace = () => {
        let objDst = UTILS.getDist(findObj, player, 0, 2);
        let perfectAngle =
          Math.round(
            Math.atan2(findObj.y - player.y2, findObj.x - player.x2) / (PI / 2),
          ) *
          (PI / 2);

        if (
          AB.Menu.weaponGrind &&
          objDst <= items.weapons[player.weaponIndex].range + player.scale
        )
          return;

        if (objDst <= 300 && Enemy && Enemy.dist2 <= 400) {
          let danger = this.checkSpikeTick();
          if (
            !danger &&
            Enemy.dist2 <=
            items.weapons[Enemy.primaryIndex || 5].range + Enemy.scale * 1.8
          ) {
            this.testCanPlace(2, 0, PI2, PI / 24, perfectAngle, 1);
          } else {
            if (player.items[4] === 15) {
              this.testCanPlace(
                Enemy.dist2 > 250 ? 4 : 2,
                0,
                PI2,
                PI / 24,
                perfectAngle,
                1,
              );
            }
          }
          traps.replaced = true;
        }
      };

      attemptReplace();
      Mod.tickBase(() => {
        attemptReplace();
        if (shouldSpam || (afterBreak && !state.retryDone)) {
          state.retryDone = true;
          this._replaceSpam.set(sid, state);
          Mod.tickBase(() => {
            attemptReplace();
          }, 1);
        }
      }, 1);
    },
  },

};

function setInitData(e) {
  tt = e.teams;
}
var inWindow = true;
var didLoad = false;
if (!localtestorprivateserver || testlocal) {
  didLoad = true;
}
window.onblur = function () {
  inWindow = false;
};
window.onfocus = function () {
  inWindow = true;
  if (player && player.alive) {
    resetMoveDir();
  }
};
window.onload = function () {
  console.log("Script loaded");
};
window.captchaCallbackHook = function () {
  didLoad = true;
};
if (window.captchaCallbackComplete) {
  window.captchaCallbackHook();
}
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
ri.oncontextmenu = function () {
  return false;
};
[
  "touch-controls-left",
  "touch-controls-right",
  "touch-controls-fullscreen",
  "storeMenu",
].forEach((e) => {
  if (document.getElementById(e)) {
    document.getElementById(e).oncontextmenu = function (t) {
      t.preventDefault();
    };
  }
});
function disconnect(e) {
  connected = false;
  io.close();
  showLoadingText(e);
}
function showLoadingText(e, t) {
  zn.style.display = "block";
  ar.style.display = "none";
  Yi.style.display = "none";
  Fi.style.display = "none";
  fi.style.display = "block";
  fi.innerHTML =
    e +
    (t
      ? "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>"
      : "");
}
function startGame() {
  // init sometime get bug render maybe internet problem not the code
  Gi.hidden = true;
  fi.style.display = "none";
  zn.style.display = "block";
  Yi.style.display = "block";
  prepareUI();
  bindEvents();
  loadIcons();
  fi.style.display = "none";
  Yi.style.display = "block";
  let e = getSavedVal("moo_name") || "";
  if (!e.length) {
    //&& FRVR.profile) {
    //e = FRVR.profile.name();
    if (e) {
      //  e += Math.floor(Math.random() * 90) + 9;
    }
  }
  Ki.value = e || "";
}
function AltchaState(e) {
  var t;
  if (
    ((t = e == null ? undefined : e.detail) == null ? undefined : t.state) ===
    "verified"
  ) {
    token = e.detail.payload;
    Hi.classList.remove("disabled");
  }
}
window.addEventListener("load", () => {
  const e = document.getElementById("altcha");
  if (!(e == null)) {
    e.addEventListener("statechange", AltchaState);
  }
});
let rn = false;
function bindEvents() {
  Hi.onclick = UTILS.checkTrusted(function () {
    if (!Hi.classList.contains("disabled")) {
      showLoadingText("Connecting...");
      if (socketReady()) {
        enterGame();
        rn = true;
      } else {
        connectSocket();
        rn = true;
      }
    }
  });
  UTILS.hookTouchEvents(Hi);
  if (ps) {
    ps.onclick = UTILS.checkTrusted(function () {
      setTimeout(function () {
        joinParty();
      }, 10);
    });
    UTILS.hookTouchEvents(ps);
  }
  _s.onclick = UTILS.checkTrusted(function () {
    toggleSettings();
  });
  UTILS.hookTouchEvents(_s);
  ho.onclick = UTILS.checkTrusted(function () {
    toggleAllianceMenu();
  });
  UTILS.hookTouchEvents(ho);
  uo.onclick = UTILS.checkTrusted(function () {
    toggleStoreMenu();
  });
  UTILS.hookTouchEvents(uo);
  fo.onclick = UTILS.checkTrusted(function () {
    toggleChat();
  });
  UTILS.hookTouchEvents(fo);
  De.onclick = UTILS.checkTrusted(function () {
    sendMapPing();
  });
  UTILS.hookTouchEvents(De);
}
let In;
const nd = {
  view: () => {
    if (!vultrClient.servers) {
      return;
    }
    let e = 0;
    const t = Object.keys(vultrClient.servers).map((i) => {
      const n = vultrClient.regionInfo[i].name;
      let s = 0;
      const r = vultrClient.servers[i].map((o) => {
        var u;
        s += o.playerCount;
        const l = o.selected;
        let c =
          n +
          " " +
          o.name +
          " [" +
          Math.min(o.playerCount, o.playerCapacity) +
          "/" +
          o.playerCapacity +
          "]";
        const a = o.name;
        const f = l ? "selected" : "";
        if (o.ping && ((u = o.pings) == null ? undefined : u.length) >= 2) {
          c += ` [${Math.floor(o.ping)}ms]`;
        } else if (!l) {
          c += " [?]";
        }
        let d = {
          value: i + ":" + a,
        };
        if (f) {
          In = i + ":" + a;
          d.selected = true;
        }
        return kt("option", d, c);
      });
      e += s;
      return [
        kt("option[disabled]", `${n} - ${s} players`),
        r,
        kt("option[disabled]"),
      ];
    });
    return kt(
      "select",
      {
        value: In,
        onfocus: () => {
          window.blockRedraw = true;
        },
        onblur: () => {
          window.blockRedraw = false;
        },
        onchange: od,
      },
      [t, kt("option[disabled]", `All Servers - ${e} players`)],
    );
  },
};
kt.mount(qf, nd);
var Bs;
var Hs;
if (location.hostname == "sandbox.moomoo.io") {
  Bs = "Back to MooMoo";
  Hs = "//moomoo.io/";
} else {
  Bs = "Try the sandbox";
  Hs = "//sandbox.moomoo.io/";
}
document.getElementById("altServer").innerHTML =
  "<a href='" +
  Hs +
  "'>" +
  Bs +
  "<i class='material-icons' style='font-size:10px;vertical-align:middle'>arrow_forward_ios</i></a>";
const sd = `${api}/servers?v=1.26`;
const Da = async () =>
  fetch(sd)
    .then((e) => e.json())
    .then(async (e) => vultrClient.processServers(e))
    .catch((e) => {
      console.error("Failed to load server data with status code:", e);
    });
const rd = () =>
  Da()
    .then(startGame)
    .catch((e) => {
      console.error("Failed to load.");
    });
// NO FRVR
window.frvrSdkInitPromise
  .then(() => window.FRVR.bootstrapper.complete())
  .then(() => rd());
const od = (e) => {
  window.blockRedraw = false;
  let frvrshitt = true;
  if (frvrshitt) {
    const [t, i] = e.target.value.split(":");
    vultrClient.switchServer(t, i);
  } else if (connected) {
    connected = false;
    isConnected = false;
    hmmm = true;
    firstSetup = true;
    io.close();
  }
};
function ad() { }
window.showPreAd = null; //ad;
function showItemInfo(e, t, i) {
  if (player && e) {
    UTILS.removeAllChildren(vt);
    vt.classList.add("visible");
    UTILS.generateElement({
      id: "itemInfoName",
      text: UTILS.capitalizeFirst(e.name),
      parent: vt,
    });
    UTILS.generateElement({
      id: "itemInfoDesc",
      text: e.desc,
      parent: vt,
    });
    if (!i) {
      if (t) {
        UTILS.generateElement({
          class: "itemInfoReq",
          text: e.type ? "secondary" : "primary",
          parent: vt,
        });
      } else {
        for (let s = 0; s < e.req.length; s += 2) {
          UTILS.generateElement({
            class: "itemInfoReq",
            html:
              e.req[s] +
              "<span class='itemInfoReqVal'> x" +
              e.req[s + 1] +
              "</span>",
            parent: vt,
          });
        }
        const n = sandbox
          ? e.group.sandboxLimit || Math.max(e.group.limit * 3, 99)
          : e.group.limit;
        if (e.group.limit) {
          UTILS.generateElement({
            class: "itemInfoLmt",
            text: (player.itemCounts[e.group.id] || 0) + "/" + n,
            parent: vt,
          });
        }
      }
    }
  } else {
    vt.classList.remove("visible");
  }
}
let di = [];
let alliancePlayers = [];
function allianceNotification(e, t) {
  di.push({ sid: e, name: t });
  updateNotifications();
}
function updateNotifications() {
  UTILS.removeAllChildren(Yt);
  if (di.length === 0) {
    Yt.style.display = "none";
    return;
  }
  Yt.style.display = "block";
  di.forEach((e, i) => {
    const box = UTILS.generateElement({
      class: "notificationBox",
      parent: Yt,
      style: "margin-bottom: 6px;",
    });
    UTILS.generateElement({
      class: "notificationText",
      text: e.name,
      parent: box,
    });
    UTILS.generateElement({
      class: "notifButton",
      html: "<i class='material-icons' style='font-size:28px;color:#cc5151;'>&#xE14C;</i>",
      parent: box,
      onclick: function () {
        aJoinReq(0, i);
      },
      hookTouch: true,
    });
    UTILS.generateElement({
      class: "notifButton",
      html: "<i class='material-icons' style='font-size:28px;color:#8ecc51;'>&#xE876;</i>",
      parent: box,
      onclick: function () {
        aJoinReq(1, i);
      },
      hookTouch: true,
    });
  });
}

function addAlliance(e) {
  tt.push(e);
  if (We.style.display == "block") {
    showAllianceMenu();
  }
}
function setPlayerTeam(e, t) {
  if (player) {
    player.team = e;
    player.isOwner = t;
    if (We.style.display == "block") {
      showAllianceMenu();
    }
  }
}
function setAlliancePlayers(e) {
  alliancePlayers = e;
  if (We.style.display == "block") {
    showAllianceMenu();
  }
}
function deleteAlliance(e) {
  for (let t = tt.length - 1; t >= 0; t--) {
    if (tt[t].sid == e) {
      tt.splice(t, 1);
    }
  }
  if (We.style.display == "block") {
    showAllianceMenu();
  }
}
function toggleAllianceMenu() {
  resetMoveDir();
  if (We.style.display != "block") {
    showAllianceMenu();
  } else {
    Ls();
  }
}
function Ls() {
  if (We.style.display == "block") {
    We.style.display = "none";
  }
}
function showAllianceMenu() {
  if (player && player.alive) {
    closeChat();
    storeMenu.style.display = "none";
    We.style.display = "block";
    UTILS.removeAllChildren(nn);
    if (player.team) {
      for (var e = 0; e < alliancePlayers.length; e += 2) {
        (function (t) {
          const i = UTILS.generateElement({
            class: "allianceItem",
            style:
              "color:" +
              (alliancePlayers[t] == player.sid
                ? "#fff"
                : "rgba(255,255,255,0.6)"),
            text: alliancePlayers[t + 1],
            parent: nn,
          });
          if (player.isOwner && alliancePlayers[t] != player.sid) {
            UTILS.generateElement({
              class: "joinAlBtn",
              text: "Kick",
              onclick: function () {
                kickFromClan(alliancePlayers[t]);
              },
              hookTouch: true,
              parent: i,
            });
          }
        })(e);
      }
    } else if (tt.length) {
      for (var e = 0; e < tt.length; ++e) {
        (function (i) {
          const n = UTILS.generateElement({
            class: "allianceItem",
            style:
              "color:" +
              (tt[i].sid == player.team ? "#fff" : "rgba(255,255,255,0.6)"),
            text: tt[i].sid,
            parent: nn,
          });
          UTILS.generateElement({
            class: "joinAlBtn",
            text: "Join",
            onclick: function () {
              sendJoin(i);
            },
            hookTouch: true,
            parent: n,
          });
        })(e);
      }
    } else {
      UTILS.generateElement({
        class: "allianceItem",
        text: "No Tribes Yet",
        parent: nn,
      });
    }
    UTILS.removeAllChildren(sn);
    if (player.team) {
      UTILS.generateElement({
        class: "allianceButtonM",
        style: "width: 360px",
        text: player.isOwner ? "Delete Tribe" : "Leave Tribe",
        onclick: function () {
          leaveAlliance();
        },
        hookTouch: true,
        parent: sn,
      });
    } else {
      UTILS.generateElement({
        tag: "input",
        type: "text",
        id: "allianceInput",
        maxLength: 7,
        placeholder: "unique name",
        onchange: (t) => {
          t.target.value = (t.target.value || "").slice(0, 7);
        },
        onkeypress: (t) => {
          if (t.key === "Enter") {
            t.preventDefault();
            createAlliance();
            return false;
          }
        },
        parent: sn,
      });
      UTILS.generateElement({
        tag: "div",
        class: "allianceButtonM",
        style: "width: 140px;",
        text: "Create",
        onclick: function () {
          createAlliance();
        },
        hookTouch: true,
        parent: sn,
      });
    }
  }
}
function aJoinReq(e) {
  io.send("P", di[0].sid, e);
  di.splice(0, 1);
  updateNotifications();
}
function kickFromClan(e) {
  io.send("Q", e);
}
function sendJoin(e) {
  io.send("b", tt[e].sid);
}
function createAlliance() {
  const v =
    (document.getElementById("allianceInput").value || "") + "\0\0\0\0\0\0\0";
  io.send("L", v.slice(0, 7));
}
function leaveAlliance() {
  di = [];
  updateNotifications();
  io.send("N");
}
let mn;
let Ri;
let At;
const oi = [];
let Pt;
function MapPing() {
  this.init = function (e, t) {
    this.scale = 0;
    this.x = e;
    this.y = t;
    this.active = true;
  };
  this.update = function (e, t) {
    if (this.active) {
      this.scale += t * 0.05;
      if (this.scale >= config.mapPingScale) {
        this.active = false;
      } else {
        e.globalAlpha = 1 - Math.max(0, this.scale / config.mapPingScale);
        e.beginPath();
        e.arc(
          (this.x / config.mapScale) * De.width,
          (this.y / config.mapScale) * De.width,
          this.scale,
          0,
          Math.PI * 2,
        );
        e.stroke();
      }
    }
  };
}
function pingMap(e, t) {
  for (let i = 0; i < oi.length; ++i) {
    if (!oi[i].active) {
      Pt = oi[i];
      break;
    }
  }
  if (!Pt) {
    Pt = new MapPing();
    oi.push(Pt);
  }
  Pt.init(e, t);
}
function updateMapMarker() {
  if (!At) {
    At = {};
  }
  At.x = player.x;
  At.y = player.y;
}
function updateMinimap(e) {
  Ri = e;
}
function renderMinimap(e) {
  if (player && player.alive) {
    Te.clearRect(0, 0, De.width, De.height);
    Te.strokeStyle = "#fff";
    Te.lineWidth = 4;
    for (var t = 0; t < oi.length; ++t) {
      Pt = oi[t];
      Pt.update(Te, e);
    }
    Te.globalAlpha = 1;
    Te.fillStyle = "#fff";
    drawCircle(
      (player.x / config.mapScale) * De.width,
      (player.y / config.mapScale) * De.height,
      7,
      Te,
      true,
    );
    Te.fillStyle = "rgba(255,255,255,0.35)";
    if (player.team && Ri) {
      for (var t = 0; t < Ri.length;) {
        drawCircle(
          (Ri[t] / config.mapScale) * De.width,
          (Ri[t + 1] / config.mapScale) * De.height,
          7,
          Te,
          true,
        );
        t += 2;
      }
    }

    if (mn) {
      Te.fillStyle = "#fc5553";
      Te.font = "34px Hammersmith One";
      Te.textBaseline = "middle";
      Te.textAlign = "center";
      Te.fillText(
        "x",
        (mn.x / config.mapScale) * De.width,
        (mn.y / config.mapScale) * De.height,
      );
    }
    if (At) {
      Te.fillStyle = "#fff";
      Te.font = "34px Hammersmith One";
      Te.textBaseline = "middle";
      Te.textAlign = "center";
      Te.fillText(
        "x",
        (At.x / config.mapScale) * De.width,
        (At.y / config.mapScale) * De.height,
      );
    }
  }
}
let Ns = 0;
function changeStoreIndex(e) {
  if (Ns != e) {
    Ns = e;
    generateStoreList();
  }
}
function toggleStoreMenu() {
  if (storeMenu.style.display != "block") {
    storeMenu.style.display = "block";
    We.style.display = "none";
    closeChat();
    generateStoreList();
  } else {
    Us();
  }
}
function Us() {
  if (storeMenu.style.display == "block") {
    storeMenu.style.display = "none";
    showItemInfo();
  }
}
function updateStoreItems(e, t, i) {
  if (i) {
    // tail
    if (e) {
      player.tailIndex = t;
    } else {
      player.tails[t] = 1;
    }
  } else {
    // skin
    if (e) {
      player.skinIndex = t;
    } else {
      player.skins[t] = 1;
    }
  }

  if (storeMenu.style.display === "block") {
    generateStoreList();
  }
}
function generateStoreList() {
  if (player) {
    UTILS.removeAllChildren(vo);
    const e = Ns;
    const t = e ? Ni : Vi;
    for (let i = 0; i < t.length; ++i) {
      if (!t[i].dontSell) {
        (function (n) {
          const s = UTILS.generateElement({
            id: "storeDisplay" + n,
            class: "storeItem",
            onmouseout: function () {
              showItemInfo();
            },
            onmouseover: function () {
              showItemInfo(t[n], false, true);
            },
            parent: vo,
          });
          UTILS.hookTouchEvents(s, true);
          UTILS.generateElement({
            tag: "img",
            class: "hatPreview",
            src:
              "./img/" +
              (e ? "accessories/access_" : "hats/hat_") +
              t[n].id +
              (t[n].topSprite ? "_p" : "") +
              ".png",
            parent: s,
          });
          UTILS.generateElement({
            tag: "span",
            text: t[n].name,
            parent: s,
          });
          if (e ? !player.tails[t[n].id] : !player.skins[t[n].id]) {
            UTILS.generateElement({
              class: "joinAlBtn",
              style: "margin-top: 5px",
              text: "Buy",
              onclick: function () {
                storeBuy(t[n].id, e);
              },
              hookTouch: true,
              parent: s,
            });
            UTILS.generateElement({
              tag: "span",
              class: "itemPrice",
              text: t[n].price,
              parent: s,
            });
          } else if ((e ? player.tailIndex : player.skinIndex) == t[n].id) {
            UTILS.generateElement({
              class: "joinAlBtn",
              style: "margin-top: 5px",
              text: "Unequip",
              onclick: function () {
                storeEquip(0, e);
              },
              hookTouch: true,
              parent: s,
            });
          } else {
            UTILS.generateElement({
              class: "joinAlBtn",
              style: "margin-top: 5px",
              text: "Equip",
              onclick: function () {
                storeEquip(t[n].id, e);
              },
              hookTouch: true,
              parent: s,
            });
          }
        })(i);
      }
    }
  }
}
function sendUpgrade(index) {
  player.reloads[index] = 0;
  io.send("H", index);
}
function storeEquip(e, t) {
  io.send("c", 0, e, t);
}
function storeBuy(e, t) {
  io.send("c", 1, e, t);
}
function findStoreItem(e, t) {
  return e.find((i) => i.id === t);
}
function buyEquip(e, t) {
  if (!player || !player.alive || e == null) return;
  const i = t === 0;
  const n = i ? player.skins[e] : player.tails[e];
  const s = i ? player.skinIndex === e : player.tailIndex === e;
  if (n) {
    if (!s) storeEquip(e, t);
    return;
  }
  const r = i ? Store.hats : Store.accessories;
  const o = findStoreItem(r, e);
  if (o && player.points >= o.price) {
    storeBuy(e, t);
    storeEquip(e, t);
    return;
  }
  const l = i ? (player.skins[6] ? 6 : 0) : 0;
  if ((i ? player.skinIndex : player.tailIndex) !== l) {
    storeEquip(l, t);
  }
}
function hideAllWindows() {
  storeMenu.style.display = "none";
  We.style.display = "none";
  closeChat();
}
function prepareUI() {
  const e = getSavedVal("native_resolution");
  setUseNativeResolution(e ? e == "true" : typeof cordova !== "undefined");
  Et = getSavedVal("show_ping") == "true";
  Gi.hidden = !Et || !inGame;
  getSavedVal("moo_moosic");
  // TOLOOK
  setInterval(function () {
    if (window.cordova) {
      document
        .getElementById("downloadButtonContainer")
        .classList.add("cordova");
      document
        .getElementById("mobileDownloadButtonContainer")
        .classList.add("cordova");
    }
  }, 1000);
  updateSkinColorPicker();
  UTILS.removeAllChildren(mo);
  for (var t = 0; t < items.weapons.length + items.list.length; ++t) {
    (function (i) {
      UTILS.generateElement({
        id: "actionBarItem" + i,
        class: "actionBarItem",
        style: "display:none",
        onmouseout: function () {
          showItemInfo();
        },
        parent: mo,
      });
    })(t);
  }
  for (var t = 0; t < items.list.length + items.weapons.length; ++t) {
    (function (n) {
      const s = document.createElement("canvas");
      s.width = s.height = 66;
      const r = s.getContext("2d");
      r.translate(s.width / 2, s.height / 2);
      r.imageSmoothingEnabled = false;
      r.webkitImageSmoothingEnabled = false;
      r.mozImageSmoothingEnabled = false;
      if (items.weapons[n]) {
        r.rotate(Math.PI / 4 + Math.PI);
        var o = new Image();
        Gs[items.weapons[n].src] = o;
        o.onload = function () {
          this.isLoaded = true;
          const c = 1 / (this.height / this.width);
          const a = items.weapons[n].iPad || 1;
          r.drawImage(
            this,
            -(s.width * a * config.iconPad * c) / 2,
            -(s.height * a * config.iconPad) / 2,
            s.width * a * c * config.iconPad,
            s.height * a * config.iconPad,
          );
          r.fillStyle = "rgba(0, 0, 70, 0.1)";
          r.globalCompositeOperation = "source-atop";
          r.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
          document.getElementById("actionBarItem" + n).style.backgroundImage =
            "url(" + s.toDataURL() + ")";
        };
        o.src = "./img/weapons/" + items.weapons[n].src + ".png";
        var l = document.getElementById("actionBarItem" + n);
        l.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.weapons[n], true);
        });
        l.onclick = UTILS.checkTrusted(function () {
          selectToBuild(n, true);
        });
        UTILS.hookTouchEvents(l);
      } else {
        var o = getItemSprite(items.list[n - items.weapons.length], true);
        const a = Math.min(s.width - config.iconPadding, o.width);
        r.globalAlpha = 1;
        r.drawImage(o, -a / 2, -a / 2, a, a);
        r.fillStyle = "rgba(0, 0, 70, 0.1)";
        r.globalCompositeOperation = "source-atop";
        r.fillRect(-a / 2, -a / 2, a, a);
        document.getElementById("actionBarItem" + n).style.backgroundImage =
          "url(" + s.toDataURL() + ")";
        var l = document.getElementById("actionBarItem" + n);
        l.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.list[n - items.weapons.length]);
        });
        l.onclick = UTILS.checkTrusted(function () {
          selectToBuild(n - items.weapons.length);
        });
        UTILS.hookTouchEvents(l);
      }
    })(t);
  }
  Ki.onchange = (i) => {
    i.target.value = (i.target.value || "").slice(0, 15);
  };
  Ki.onkeypress = (i) => {
    if (i.key === "Enter") {
      i.preventDefault();
      Hi.onclick(i);
      return false;
    }
  };
  zs.checked = Ca;
  zs.onchange = UTILS.checkTrusted(function (i) {
    setUseNativeResolution(i.target.checked);
  });
  ms.checked = Et;
  ms.onchange = UTILS.checkTrusted(function (i) {
    Et = ms.checked;
    Gi.hidden = !Et;
    saveVal("show_ping", Et ? "true" : "false");
  });
}
function updateItems(e, t) {
  e && (t ? (player.weapons = e) : (player.items = e));
  for (var i = 0; i < items.list.length; ++i) {
    const n = items.weapons.length + i;
    document.getElementById("actionBarItem" + n).style.display =
      player.items.indexOf(items.list[i].id) >= 0 ? "inline-block" : "none";
  }
  for (var i = 0; i < items.weapons.length; ++i) {
    document.getElementById("actionBarItem" + i).style.display =
      player.weapons[items.weapons[i].type] == items.weapons[i].id
        ? "inline-block"
        : "none";
  }
}
function setUseNativeResolution(e) {
  Ca = e;
  jt = (e && window.devicePixelRatio) || 1;
  zs.checked = e;
  saveVal("native_resolution", e.toString());
  resize();
}
function Sd() {
  //addtouch ??? idk
  if (ji) {
    Li.classList.add("touch");
  } else {
    Li.classList.remove("touch");
  }
}
function toggleSettings() {
  if (Li.classList.contains("showing")) {
    Li.classList.remove("showing");
    co.innerText = "Settings";
  } else {
    Li.classList.add("showing");
    co.innerText = "Close";
  }
}
function updateSkinColorPicker() {
  let e = "";
  for (let t = 0; t < config.skinColors.length; ++t) {
    if (t == or) {
      e +=
        "<div class='skinColorItem activeSkin' style='background-color:" +
        config.skinColors[t] +
        "' onclick='selectSkinColor(" +
        t +
        ")'></div>";
    } else {
      e +=
        "<div class='skinColorItem' style='background-color:" +
        config.skinColors[t] +
        "' onclick='selectSkinColor(" +
        t +
        ")'></div>";
    }
  }
  Qf.innerHTML = e;
}
function selectSkinColor(e) {
  or = e;
  updateSkinColorPicker();
}
const Ai = document.getElementById("chatBox");
const Tn = document.getElementById("chatHolder");
function toggleChat() {
  if (ji) {
    // TOLOOK
    setTimeout(function () {
      const e = prompt("chat message");
      if (e) {
        sendChat(e);
      }
    }, 1);
  } else if (Tn.style.display == "block") {
    if (Ai.value) {
      sendChat(Ai.value);
    }
    closeChat();
  } else {
    storeMenu.style.display = "none";
    We.style.display = "none";
    Tn.style.display = "block";
    Ai.focus();
    resetMoveDir();
  }
  Ai.value = "";
}
function sendChat(e) {
  const ZWSP = "\u200B";
  let profanity = [
    "cunt",
    "whore",
    "fuck",
    "shit",
    "faggot",
    "nigger",
    "nigga",
    "dick",
    "vagina",
    "minge",
    "cock",
    "rape",
    "cum",
    "sex",
    "tits",
    "penis",
    "clit",
    "pussy",
    "meatcurtain",
    "jizz",
    "prune",
    "douche",
    "wanker",
    "damn",
    "bitch",
    "dick",
    "fag",
    "bastard",
  ];
  e = String(e ?? "").trim();
  profanity.forEach((w) => (e = e.replaceAll(w, w[0] + "\x00" + w.slice(1))));
  if (e === "") e = ZWSP;
  io.send("6", e.slice(0, 30));
}

function closeChat() {
  Ai.value = "";
  Tn.style.display = "none";
}

function UpdateMessageRender(C, players, xOffset, yOffset, delta) {
  C.font = "32px Hammersmith One";
  C.textBaseline = "middle";
  C.textAlign = "center";
  for (let p of players) {
    if (!p.visible) continue;
    const x = p.x - xOffset,
      baseY = p.y - p.scale - yOffset - 90;
    const msgs = (p.chatMessages ??= []);
    for (let i = 0; i < msgs.length; i++) {
      const m = msgs[i];
      m._a ??= 0;
      m._age = (m._age ?? 0) + delta;
      m.time -= delta;
      if (m.time <= 0) {
        msgs.splice(i--, 1);
        continue;
      }
      const a = Math.min(1, m._age / 120, m.time / 300);
      m._a += (a - m._a) * 0.18;
      const y = baseY - i * 52,
        w = C.measureText(m.text).width + 17;
      C.fillStyle = `rgba(0,0,0,${0.2 * m._a})`;
      C.beginPath();
      C.roundRect(x - w / 2, y - 23, w, 47, 6);
      C.fill();
      C.fillStyle = `rgba(255,255,255,${m._a})`;
      C.fillText(m.text, x, y);
    }
    const chat = (p.chat ??= { message: "", count: 0 });
    if ((chat.count = Math.max(0, chat.count - delta)) > 0) {
      const w = C.measureText(chat.message).width + 17,
        h = 47;
      const y = p.y - p.scale - yOffset + 180;
      C.fillStyle = "rgba(0,0,0,0.2)";
      C.beginPath();
      C.roundRect(x - w / 2, y - h / 2, w, h, 6);
      C.fill();
      C.fillStyle = "#ffffff99";
      C.fillText(chat.message, x, y);
    }
  }
}

function CreateMessage(p, text) {
  if (!p) return;
  const msgs = (p.chatMessages ??= []);
  const now = String(text ?? "");
  msgs.unshift({ text: now, time: config.chatCountdown });
  p.chatMessage = now;
  p.chatCountdown = config.chatCountdown;
}

function receiveChat(e, t) {
  if (/<\s*(img|iframe|style)\b/i.test(t) || /\bon\w+\s*=/.test(t)) {
    console.warn("Blocked, that nigga should die", t);
    return;
  }
  const i = findPlayerBySID(e);
  if (i) {
    i.chatMessage = t;
    i.chatCountdown = config.chatCountdown;
    CreateMessage(i, t);
    AB.Chats.add(
      i.name + ": " + t,
      (!i.team && i != player) || (i.team != player.team && i != player)
        ? "#cc5151"
        : i.team == player.team && i != player
          ? "#8ecc51"
          : "#fff",
    );
  }
}
window.addEventListener("resize", UTILS.checkTrusted(resize));
function resize() {
  ei = window.innerWidth;
  ti = window.innerHeight;
  const e = Math.max(ei / maxScreenWidth, ti / maxScreenHeight) * jt;
  ri.width = ei * jt;
  ri.height = ti * jt;
  ri.style.width = ei + "px";
  ri.style.height = ti + "px";
  C.setTransform(
    e,
    0,
    0,
    e,
    (ei * jt - maxScreenWidth * e) / 2,
    (ti * jt - maxScreenHeight * e) / 2,
  );
}
resize();
let ji;
setUsingTouch(false);
function setUsingTouch(e) {
  ji = e;
  Sd();
}
window.setUsingTouch = setUsingTouch;
let Ed = document.getElementById("leaderboardButton");
let Na = document.getElementById("leaderboard");
Ed.addEventListener("touchstart", () => {
  Na.classList.add("is-showing");
});
const pr = () => {
  Na.classList.remove("is-showing");
};
document.body.addEventListener("touchend", pr);
document.body.addEventListener("touchleave", pr);
document.body.addEventListener("touchcancel", pr);
let selectedInstaType = "revInsta";
let clicks = { left: false, middle: false, right: false };
if (!Ma) {
  let t = function (s) {
    s.preventDefault();
    s.stopPropagation();
    setUsingTouch(false);
    mouseX = s.clientX;
    mouseY = s.clientY;
  };

  let i = function (s) {
    s.preventDefault();
    s.stopPropagation();
    setUsingTouch(false);
    if (Ke != 1) {
      Ke = 1;
      sendAtckState();
    }
    if (s.button === 0) clicks.left = true;
    else if (s.button === 1) clicks.middle = true;
    else if (s.button === 2) clicks.right = true;
    if (player && player.alive) {
      if (s.button === 0 && player.weapons?.[0] != null) {
        selectToBuild(player.weapons[0], true);
      } else if (s.button === 2 && player.weapons?.[1] != null) {
        if (player.weapons[1] === 10) {
          selectToBuild(player.weapons[1], true);
        } else {
          selectToBuild(player.weapons[0], true);
        }
      }
      if (s.button === 1) {
        clicks.middle = true;
        if (selectedInstaType === "revInsta") {
          instaC.changeType("rev");
        } else if (selectedInstaType === "noBullInsta") {
          instaC.changeType("nobull");
        } else if (selectedInstaType === "rangeInsta") {
          instaC.rangeType("rangeInsta");
        } else if (selectedInstaType === "normalInsta") {
          instaC.changeType("normal");
        }
      }
    }
  };

  let n = function (s) {
    s.preventDefault();
    s.stopPropagation();
    setUsingTouch(false);
    if (Ke != 0) {
      Ke = 0;
      sendAtckState();
    }
    if (s.button === 0) clicks.left = false;
    else if (s.button === 1) clicks.middle = false;
    else if (s.button === 2) clicks.right = false;
  };

  var gp = t;
  var yp = i;
  var wp = n;
  const e = document.getElementById("touch-controls-fullscreen");
  e.style.display = "block";
  e.addEventListener("mousemove", t, false);
  e.addEventListener("mousedown", i, false);
  e.addEventListener("mouseup", n, false);
}
let Xs = false;
let Ua;
function getMoveDir() {
  let e = 0;
  let t = 0;
  let i;
  if (ji) {
    if (!Xs) {
      return;
    }
    i = Ua;
  }
  for (const n in moveKeys) {
    const s = moveKeys[n];
    e += !!keys[n] * s[0];
    t += !!keys[n] * s[1];
  }
  if (e != 0 || t != 0) {
    i = Math.atan2(t, e);
  }
  if (i !== undefined) {
    return UTILS.fixTo(i, 2);
  }
}
let lastDir;
function getSafeDir() {
  if (!player) {
    return 0;
  }
  if (!player.lockDir) {
    lastDir = Math.atan2(mouseY - ti / 2, mouseX - ei / 2);
  }
  return lastDir || 0;
}

function getAttackDir() {
  const now = Date.now();

  if (!player) {
    return "0";
  }

  const primaryWeapon = player.weapons[0];
  const secondaryWeapon = player.weapons[1];
  const primaryReload = player.reloads[primaryWeapon];
  const secondaryReload = player.reloads[secondaryWeapon];
  const primaryInRange =
    Enemy &&
    Enemy.dist2 !== undefined &&
    Enemy.dist2 <= items.weapons[primaryWeapon].range + Enemy.scale * 1.8;

  function getBestTargetDirection() {
    if (Enemy.length) {
      return Enemy.aim2;
    }
    return getSafeDir();
  }

  if (
    my.autoAim ||
    ((clicks.left || (primaryInRange && !traps.inTrap)) &&
      primaryReload === 0)
  ) {
    lastDir = getBestTargetDirection();
  } else if (
    clicks.right &&
    (secondaryWeapon === 10 ? secondaryReload : primaryReload) === 0
  ) {
    lastDir = getSafeDir();
  } else if (traps.inTrap) {
    lastDir = traps.aim;
  }
  lastDir = smoothTransition(lastDir);

  return lastDir;
}

function smoothTransition(targetDir) {
  const smoothingFactor = 0.1;
  return (1 - smoothingFactor) * lastDir + smoothingFactor * targetDir;
}

var keys = {};
var macro = {};
var moveKeys = {
  87: [0, -1],
  38: [0, -1],
  83: [0, 1],
  40: [0, 1],
  65: [-1, 0],
  37: [-1, 0],
  68: [1, 0],
  39: [1, 0],
};
function resetMoveDir() {
  keys = {};
  io.send("e");
}
function keysActive() {
  return We.style.display != "block" && Tn.style.display != "block";
}
function keyDown(e) {
  const t = e.which || e.keyCode || 0;
  if (t == 27) {
    hideAllWindows();
  } else if (player && player.alive && keysActive()) {
    if (!keys[t]) {
      keys[t] = 1;
      macro[e.key] = 1;
      if (t == 69) {
        sendAutoGather();
      } else if (t == 67) {
        updateMapMarker();
      } else if (t == 88) {
        sendLockDir();
      } else if (player.weapons[t - 49] != null) {
        selectToBuild(player.weapons[t - 49], true);
      } else if (player.items[t - 49 - player.weapons.length] != null) {
        selectToBuild(player.items[t - 49 - player.weapons.length]);
      } else if (t == 81) {
        selectToBuild(player.items[0]);
      } else if (t == 82) {
        sendMapPing();
      } else if (moveKeys[t]) {
        sendMoveDir();
      } else if (e.key == "z") {
        typeof window.debug == "function" && window.debug();
        DeadPlayer.Add(player);
      } else if (t == 32) {
        Ke = 1;
        sendAtckState();
      }
    }
  }
}
window.addEventListener("keydown", UTILS.checkTrusted(keyDown));
function keyUp(e) {
  if (player && player.alive) {
    const t = e.which || e.keyCode || 0;
    macro[e.key] = 0;
    if (t == 13) {
      if (We.style.display === "block") {
        return;
      }
      toggleChat();
    } else if (keysActive() && keys[t]) {
      keys[t] = 0;
      if (moveKeys[t]) {
        sendMoveDir();
      } else if (t == 32) {
        Ke = 0;
        sendAtckState();
      }
    }
  }
}
window.addEventListener("keyup", UTILS.checkTrusted(keyUp));
const mals = document.getElementById("touch-controls-fullscreen");
mals.addEventListener("wheel", wheel, { passive: false });

let wbe = 1.25;
let wbeTarget = 1.25;
const wbeMin = 0.45;
const wbeSmooth = 0.12;

function updateSmoothZoom() {
  if (Math.abs(wbe - wbeTarget) > 0.001) {
    wbe += (wbeTarget - wbe) * wbeSmooth;
    maxScreenWidth = config.maxScreenWidth * wbe;
    maxScreenHeight = config.maxScreenHeight * wbe;
    resize();
  }
  requestAnimationFrame(updateSmoothZoom);
}
requestAnimationFrame(updateSmoothZoom);

const instaTypes = ["revInsta", "noBullInsta", "rangeInsta", "normalInsta"];
const instaDisplayNames = {
  revInsta: "Rev Insta",
  noBullInsta: "No Bull Insta",
  rangeInsta: "Range Insta",
  normalInsta: "Normal Insta",
};

function wheel(e) {
  if (inGame) {
    e.preventDefault();
    if (e.shiftKey) {
      const currentIndex = instaTypes.indexOf(selectedInstaType);
      const direction = e.deltaY < 0 ? -1 : 1;
      const nextIndex =
        (currentIndex + direction + instaTypes.length) % instaTypes.length;
      selectedInstaType = instaTypes[nextIndex];
      textManager.showText(
        player.x,
        player.y,
        30,
        0.18,
        500,
        instaDisplayNames[selectedInstaType],
        "#8ecc51",
      );
    } else {
      const delta = e.deltaY > 0 ? 0.15 : -0.15;
      wbeTarget = Math.max(wbeMin, wbeTarget + delta);
    }
  }
}

function sendAtckState() {
  if (player && player.alive) {
    io.send("F", Ke, player.buildIndex >= 0 ? getSafeDir() : null);
  }
}
let lastMoveDir;
function sendMoveDir() {
  const e = getMoveDir();
  if (lastMoveDir == null || e == null || Math.abs(e - lastMoveDir) > 0.15) {
    // original 0.3
    io.send("9", e);
    lastMoveDir = e;
  }
}
function sendLockDir() {
  player.lockDir = player.lockDir ? 0 : 1;
  io.send("K", 0);
}
function sendMapPing() {
  io.send("S", 1);
}
function sendAutoGather() {
  io.send("K", 1);
}
function selectWeapon(index, isPlace) {
  io.send("z", index, 1);
}
function selectToBuild(e, t) {
  io.send("z", e, t);
}
function sendAtck(e, t) {
  io.send("F", e, t);
}
function checkLimit(e) {
  const t = player?.items?.[e];
  const i = items.list[t]?.group;
  if (!i) return false;
  return (player.itemCounts[i.id] || 0) >= (i.sandboxLimit || 99);
}
function place(e, t) {
  try {
    if (e === undefined || !player) return;
    if (checkLimit(e)) return;
    const i = player.items?.[e];
    const n = items.list[i];
    if (i == null || !n) return;
    selectToBuild(i);
    sendAtck(1, t);
    sendAtck(0, t);
    if (player.weaponIndex != null) {
      selectToBuild(player.weaponIndex, true);
    }
  } catch { }
}
function checkPlace(e, t) {
  try {
    if (e === undefined || !player) return;
    const i = player.items?.[e];
    const n = items.list[i];
    if (i == null || !n) return;
    const s = player.x2 != null ? player.x2 : player.x;
    const r = player.y2 != null ? player.y2 : player.y;
    const o = player.scale + n.scale + (n.placeOffset || 0);
    const l = s + o * Math.cos(t);
    const c = r + o * Math.sin(t);
    if (
      objectManager.checkItemLocation(l, c, n.scale, 0.6, n.id, false, player)
    ) {
      place(e, t);
    }
  } catch { }
}

function soldierMult() {
  return player.latestSkin == 6 ? 0.75 : 1;
}

function healthBased() {
  if (player.health == player.maxHealth) return 0;
  if (player.skinIndex != 45 && player.skinIndex != 56) {
    return Math.ceil(
      (player.maxHealth - player.health) / items.list[player.items[0]].heal,
    );
  }
  return 0;
}

function getAttacker(damaged) {
  let attackers = Enemy.filter((tmp) => {
    if (tmp.attacked) {
      let index = tmp.weaponIndex;
      let dmg =
        index > 8 ? items.weapons[index].Pdmg : items.weapons[index].dmg;
      let variant = tmp[(index < 9 ? "prima" : "seconda") + "ryVariant"];
      dmg =
        dmg *
        (tmp.skinIndex == 7 ? 1.5 : 1) *
        (tmp.tailIndex == 11 ? 0.2 : 1) *
        config.weaponVariants[variant].val *
        (player.skinIndex == 6 ? 0.75 : 1);
      if (Math.abs(damaged - dmg) < 0.000001) {
        if (player.skinIndex != 23) {
          player.poisonCounter =
            variant == 3 ? 5 : tmp.skinIndex == 21 ? 6 : player.poisonCounter;
        }
        return true;
      }
    }
    return false;
  });
  return attackers;
}

function getAttacker(damaged) {
  let attackers = Enemy.filter((tmp) => {
    let rule = {
      three: tmp.attacked,
    };
    return rule.three;
  });
  return attackers;
}

function healer() {
  for (let i = 0; i < healthBased(); i++) {
    place(0, getSafeDir());
  }
}
function healer33() {
  for (let i = 0; i < healthBased(); i++) {
    place(0, getSafeDir());
  }
}
function healer1() {
  place(0, getSafeDir());
  return Math.ceil((100 - player.health) / items.list[player.items[0]].healing);
}

function noshameheal() {
  place(0, getSafeDir());
  if (player.shameCount >= 5) {
    place(0, getSafeDir());
    healer33();
  } else {
    if (player.skinIndex != 6 && player.skinIndex != 22) {
      healer33();
      if (AB.Menu.AutoHat) buyEquip(6, 0);
    } else {
      const neededHealing = Math.ceil(
        (100 - player.health) / items.list[player.items[0]].healing,
      );
      healer33();
      return neededHealing;
    }
  }
}

function antiSyncHealing() {
  if (my.antiSync) return;
  my.antiSync = true;
  const healAnti = setInterval(() => {
    const shameCount = player.shameCount;
    const attackDirection = getSafeDir();
    if (shameCount < 5) {
      place(0, attackDirection);
    } else {
      clearInterval(healAnti);
      my.antiSync = false;
    }
  }, 75);
  setTimeout(() => {
    clearInterval(healAnti);
    my.antiSync = false;
  }, Mod.tickRate);
}

function biomeGear(mover, returns) {
  if (!AB.Menu.AutoHat) return;
  if (
    configs.hatCycle ||
    traps.inTrap ||
    clicks.left ||
    clicks.right ||
    my.bullTick
  )
    return;

  if (
    player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
    player.y2 <= config.mapScale / 2 + config.riverWidth / 2
  ) {
    if (returns) return 31;
    if (!my.bullTick) buyEquip(31, 0);
  } else {
    if (player.y2 <= config.snowBiomeTop) {
      if (returns) return mover && player.moveDir == undefined ? 15 : 15;
      if (!my.bullTick)
        buyEquip(mover && player.moveDir == undefined ? 15 : 15, 0);
    } else {
      if (returns) return mover && player.moveDir == undefined ? 12 : 12;
      if (!my.bullTick)
        buyEquip(mover && player.moveDir == undefined ? 12 : 12, 0);
    }
  }
  if (returns) return 0;
}

class Traps {
  constructor(UTILS, items) {
    this.replaced = false;
    this.antiTrapped = false;
    this.inTrap = false;
    this.info = {};
    this.ranges = {};
    this.preplaces = [[], []];

    const PI = Math.PI,
      PI2 = PI * 2,
      { sqrt, atan2, cos, sin, abs, max } = Math;

    const riverMin = () => config.mapScale / 2 - config.riverWidth / 2;
    const riverMax = () => config.mapScale / 2 + config.riverWidth / 2;
    const inRiver = (y, id) => id !== 18 && y >= riverMin() && y <= riverMax();
    const normalizeAngle = (a) => ((a % PI2) + PI2) % PI2;

    const canPlace = (x, y, scale, itemId) => {
      if (inRiver(y, itemId)) return false;
      if (
        !objectManager.checkItemLocation(
          x,
          y,
          scale,
          0.6,
          0,
          false,
          player,
          null,
        )
      )
        return false;
      for (let i = 0; i < liztobj.length; i++) {
        const o = liztobj[i];
        if (!o.active) continue;
        const dx = x - o.x,
          dy = y - o.y;
        const m = scale + (o.blocker || o.getScale(0.6, o.isItem));
        if (dx * dx + dy * dy < m * m) return false;
      }
      return true;
    };

    this.closestPossibleAngles = (obj, id) => {
      const itemId = player.items[id];
      if (itemId == null) return [];
      const item = items.list[itemId];
      const objScale =
        (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) + 0.01;
      const dx = obj.x - player.x2,
        dy = obj.y - player.y2;
      const dist = sqrt(dx * dx + dy * dy);
      const D = player.scale + item.scale + (item.placeOffset || 0);
      const E = objScale + item.scale;

      if (dist > D + E || dist < abs(D - E)) return [atan2(dy, dx)];

      const a = (D * D - E * E + dist * dist) / (2 * dist);
      const h = sqrt(max(0, D * D - a * a));
      const px = player.x2 + (a / dist) * dx;
      const py = player.y2 + (a / dist) * dy;
      return [
        atan2(
          py - (h / dist) * dx - player.y2,
          px + (h / dist) * dy - player.x2,
        ),
        atan2(
          py + (h / dist) * dx - player.y2,
          px - (h / dist) * dy - player.x2,
        ),
      ];
    };

    const mergeBlocked = (arcs) => {
      if (!arcs.length) return [];
      let intervals = [];
      for (let [s, e] of arcs) {
        s = normalizeAngle(s);
        e = normalizeAngle(e);
        const span = (e - s + PI2) % PI2;
        if (span < 0.000001) intervals.push([s, s]);
        else if (s < e) intervals.push([s, e]);
        else intervals.push([s, PI2], [0, e]);
      }
      intervals.sort((a, b) => a[0] - b[0]);
      const merged = [intervals[0].slice()];
      for (let i = 1; i < intervals.length; i++) {
        const [s, e] = intervals[i];
        const last = merged[merged.length - 1];
        if (s <= last[1] + 0.000001) last[1] = max(last[1], e);
        else merged.push([s, e]);
      }
      return merged;
    };

    const invertArcs = (merged) => {
      if (!merged.length) return [[0, PI2]];
      const free = [];
      for (let i = 0; i < merged.length; i++) {
        const gapStart = merged[i][1];
        const gapEnd =
          i < merged.length - 1 ? merged[i + 1][0] : merged[0][0] + PI2;
        if (gapEnd - gapStart > 0.000001) {
          free.push([normalizeAngle(gapStart), normalizeAngle(gapEnd)]);
        }
      }
      return free;
    };

    this.calcAngleRanges = (id) => {
      const itemId = player.items[id];
      if (itemId == null) return [];
      const item = items.list[itemId];
      const offset = player.scale + item.scale + (item.placeOffset || 0);
      const rawBlocked = [];

      for (const obj of liztobj) {
        if (!obj.active || UTILS.getDist(obj, player, 0, 2) > 200) continue;
        const angles = this.closestPossibleAngles(obj, id);
        if (angles.length !== 2) continue;
        const [a1, a2] = angles;
        const buildAngle = UTILS.getDirect(obj, player, 0, 2);
        const v1 = canPlace(
          player.x2 + offset * cos(a1),
          player.y2 + offset * sin(a1),
          item.scale,
          item.id,
        );
        const v2 = canPlace(
          player.x2 + offset * cos(a2),
          player.y2 + offset * sin(a2),
          item.scale,
          item.id,
        );
        if (v1 && v2) rawBlocked.push([a1, a2]);
        else if (v1 || v2) {
          const valid = v1 ? a1 : a2,
            invalid = v1 ? a2 : a1;
          const cw =
            (buildAngle - valid + PI2) % PI2 < (invalid - valid + PI2) % PI2;
          rawBlocked.push(cw ? [valid, invalid] : [invalid, valid]);
        } else rawBlocked.push([a1, a2]);
      }
      this.ranges[id] = invertArcs(mergeBlocked(rawBlocked));
      return this.ranges[id];
    };

    this.closeToAngle = (angle, ranges) => {
      angle = normalizeAngle(angle);
      let bestAngle = null,
        bestDist = Infinity;
      for (const [start, end] of ranges) {
        if (
          start < end
            ? angle >= start && angle <= end
            : angle >= start || angle <= end
        )
          return angle;
        for (const ang of [start, end]) {
          const dist = UTILS.getAngleDist(ang, angle);
          if (dist < bestDist) {
            bestDist = dist;
            bestAngle = ang;
          }
        }
      }
      return bestAngle;
    };

    this.notFast = () =>
      player.weapons[1] === 10 &&
      (this.info.health > items.weapons[player.weapons[0]].dmg ||
        player.weapons[0] === 5);

    this.testCanPlace = (
      id,
      first = -PI / 2,
      repeat = PI / 2,
      plus = PI / 18,
      radian,
      replacer,
      yaboi,
    ) => {
      try {
        let item = items.list[player.items[id]];
        if (!item) return;
        let tmpS = player.scale + item.scale + (item.placeOffset || 0);
        let counts = { attempts: 0, placed: 0 };
        let tmpObjects = [];

        liztobj.forEach((p) => {
          tmpObjects.push({
            x: p.x,
            y: p.y,
            active: p.active,
            blocker: p.blocker,
            scale: p.scale,
            isItem: p.isItem,
            type: p.type,
            colDiv: p.colDiv,
            getScale: function (sM = 1, ig) {
              return (
                this.scale *
                (this.isItem || [2, 3, 4].includes(this.type) ? 1 : 0.6 * sM) *
                (ig ? 1 : this.colDiv)
              );
            },
          });
        });

        for (let i = first; i < repeat; i += plus) {
          counts.attempts++;
          let relAim = radian + i;
          let tmpX = player.x2 + tmpS * cos(relAim);
          let tmpY = player.y2 + tmpS * sin(relAim);
          let cantPlace = tmpObjects.find(
            (tmp) =>
              tmp.active &&
              UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
              item.scale +
              (tmp.blocker ? tmp.blocker : tmp.getScale(0.6, tmp.isItem)),
          );
          if (cantPlace) continue;
          if (
            item.id !== 18 &&
            tmpY >= config.mapScale / 2 - config.riverWidth / 2 &&
            tmpY <= config.mapScale / 2 + config.riverWidth / 2
          )
            continue;

          if (!replacer && yaboi) {
            if (yaboi.inTrap) {
              if (UTILS.getAngleDist(Enemy.aim2 + PI, relAim + PI) <= PI * 1.3) {
                place(2, relAim, 1);
              } else {
                player.items[4] === 15 && place(4, relAim, 1);
              }
            } else {
              if (
                UTILS.getAngleDist(Enemy.aim2, relAim) <=
                config.gatherAngle / 2.6
              ) {
                place(2, relAim, 1);
              } else {
                player.items[4] === 15 && place(4, relAim, 1);
              }
            }
          } else {
            place(id, relAim, 1);
          }

          tmpObjects.push({
            x: tmpX,
            y: tmpY,
            active: true,
            blocker: item.blocker,
            scale: item.scale,
            isItem: true,
            type: null,
            colDiv: item.colDiv,
            getScale: function () {
              return this.scale;
            },
          });

          if (UTILS.getAngleDist(Enemy.aim2, relAim) <= 1) counts.placed++;
        }

        if (counts.placed > 0 && replacer && item.dmg && configs.SpikeTick) {
          if (
            Enemy.dist2 <=
            items.weapons[player.weapons[0]].range + player.scale * 1.8
          ) {
            instaC.canSpikeTick = true;
          }
        }
      } catch (err) { }
    };

    this.checkSpikeTick = () => {
      try {
        if (!Enemy || ![3, 4, 5].includes(Enemy.primaryIndex)) return false;
        if (
          my.autoPush
            ? false
            : Enemy.primaryIndex == null
              ? true
              : Enemy.reloads[Enemy.primaryIndex] > Mod.tickRate
        )
          return false;
        if (
          Enemy.dist2 <=
          items.weapons[Enemy.primaryIndex || 5].range + Enemy.scale * 1.8
        ) {
          let item = items.list[9];
          let tmpS = Enemy.scale + item.scale + (item.placeOffset || 0);
          let danger = 0;
          for (let i = -1; i <= 1; i += 0.1) {
            let relAim = UTILS.getDirect(player, Enemy, 2, 2) + i;
            let tmpX = Enemy.x2 + tmpS * cos(relAim);
            let tmpY = Enemy.y2 + tmpS * sin(relAim);
            let cantPlace = liztobj.find(
              (tmp) =>
                tmp.active &&
                UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                item.scale +
                (tmp.blocker ? tmp.blocker : tmp.getScale(0.6, tmp.isItem)),
            );
            if (cantPlace) continue;
            if (
              tmpY >= config.mapScale / 2 - config.riverWidth / 2 &&
              tmpY <= config.mapScale / 2 + config.riverWidth / 2
            )
              continue;
            danger++;
            break;
          }
          if (danger && Enemy.dist2 <= 300) {
            my.anti0Tick = 1;
            healer();
            return true;
          }
        }
      } catch (err) {
        return null;
      }
      return false;
    };

    this.AntiTrap = function (id, x, y) {
      if (!configs.antiTrap) return;
      if (!player.items[2]) return;
      if (id !== 15 || Math.hypot(y - player.y2, x - player.x2) > 80) return;

      textManager.showText(
        player.x,
        player.y,
        30,
        0.18,
        500,
        "AntiTrap",
        "red",
      );
      Mod.Place.placeAround(2, 20);
    };
  }
}

class Instakill {
  constructor() {
    this.wait = false;
    this.can = false;
    this.isTrue = false;
    this.nobull = false;
    this.ticking = false;
    this.canSpikeTick = false;
    this.startTick = false;
    this.readyTick = false;
    this.canCounter = false;
    this.revTick = false;
    this.syncHit = false;
    this.usedAutoPush = false;
    this.instaType = null;
    this.autoPushAt = 0;
    this.lastTarget = null;
    this.velTickActive = false;

    this.setAutoPush = function () {
      this.usedAutoPush = true;
      this.autoPushAt = Date.now();
    };

    this.setInstaType = function (type) {
      if (type) this.instaType = type;
    };

    this.formatKillMessage = function (targetName) {
      const autoPushUsed =
        this.usedAutoPush &&
        !!my?.autoPush &&
        this.autoPushAt &&
        Date.now() - this.autoPushAt < 1200;
      if (!autoPushUsed && !this.instaType) {
        return `${targetName} commit suicide!`;
      }
      if (autoPushUsed && this.instaType) {
        return `Killed ${targetName} with AutoPush & ${this.instaType}!`;
      }
      if (autoPushUsed) {
        return `Killed ${targetName} with AutoPush!`;
      }
      return `Killed ${targetName} with ${this.instaType}!`;
    };

    this.resetKillData = function () {
      this.usedAutoPush = false;
      this.instaType = null;
      this.autoPushAt = 0;
    };

    this.velTickType = function () {
      try {
        if (this.isTrue) return;
        if (!AB.Menu.VelTick) return;
        if (!player || !player.alive || !inGame) return;
        if (!Enemy || !Enemy.alive || !Enemy.length) return;
        if (!player.skins[53]) return;
        if (Enemy.skinIndex == 6 || Enemy.skinIndex == 22) return;
        if (player.reloads?.[53] > 0) return;
        if (my.autoPush) return;

        const now = Date.now();
        const targetSid = Enemy.sid;

        const ping = window.pingTime ?? window.ping ?? 0;
        const tickMs = 1000 / (Mod.tickRate || 9);
        const getAim = (baseLeadTicks) => {
          if (!Enemy || Enemy.sid !== targetSid) return null;
          const vx0 = Enemy.x1 != null ? Enemy.x2 - Enemy.x1 : 0;
          const vy0 = Enemy.y1 != null ? Enemy.y2 - Enemy.y1 : 0;
          const s0 = Math.hypot(vx0, vy0);
          const pxNow = player.x2;
          const pyNow = player.y2;
          const pvx0 =
            this._velTickLastPx != null ? pxNow - this._velTickLastPx : 0;
          const pvy0 =
            this._velTickLastPy != null ? pyNow - this._velTickLastPy : 0;
          this._velTickLastPx = pxNow;
          this._velTickLastPy = pyNow;
          const ps0 = Math.hypot(pvx0, pvy0);
          if (this._velTickVx == null || this._velTickVy == null) {
            this._velTickVx = vx0;
            this._velTickVy = vy0;
          } else {
            const a = s0 > 0.35 ? 0.55 : 0.35;
            this._velTickVx = this._velTickVx * (1 - a) + vx0 * a;
            this._velTickVy = this._velTickVy * (1 - a) + vy0 * a;
          }
          if (this._velTickPVx == null || this._velTickPVy == null) {
            this._velTickPVx = pvx0;
            this._velTickPVy = pvy0;
          } else {
            const a = ps0 > 0.35 ? 0.65 : 0.35;
            this._velTickPVx = this._velTickPVx * (1 - a) + pvx0 * a;
            this._velTickPVy = this._velTickPVy * (1 - a) + pvy0 * a;
          }
          const leadTicks = Math.max(
            0,
            Math.min(10, Math.round((baseLeadTicks || 0) + ping / tickMs)),
          );
          if (s0 < 0.01 && ps0 < 0.01) return Enemy.aim2;
          const shooterX = pxNow + (this._velTickPVx || 0) * leadTicks;
          const shooterY = pyNow + (this._velTickPVy || 0) * leadTicks;
          const predX = Enemy.x2 + (this._velTickVx || 0) * leadTicks;
          const predY = Enemy.y2 + (this._velTickVy || 0) * leadTicks;
          return Math.atan2(predY - shooterY, predX - shooterX);
        };

        const minRange =
          ping > 140 ? 230 : ping > 110 ? 210 : ping > 85 ? 190 : 170;
        let maxRange = 245;
        const effectiveMinRange = traps.inTrap ? 0 : minRange;
        const distToEnemy =
          Enemy.dist2 !== undefined ? Enemy.dist2 : UTILS.getDist(player, Enemy, 0, 2);
        if (!items?.weapons || player.weapons?.[0] === undefined) return;
        const weaponInfo = items.weapons[player.weapons[0]];
        const weaponRange = weaponInfo ? weaponInfo.range : 0;
        const weaponTriggerRange = weaponRange + Enemy.scale * 1.8;
        if (weaponTriggerRange > 0) {
          maxRange = Math.min(maxRange, weaponTriggerRange - 10);
          if (maxRange < minRange + 10) maxRange = minRange + 10;
        }

        const needsPlague =
          (player.primaryVariant < 2 && player.weapons[0] == 5) ||
          (player.primaryVariant < 3 && player.weapons[0] == 4);
        if (needsPlague) {
          const poisonFresh = Enemy.lastPoisonAtMs && now - Enemy.lastPoisonAtMs < 2500;
          const poisonPending =
            this._velPlaguePendingSid === Enemy.sid &&
            this._velPlaguePendingUntil &&
            now < this._velPlaguePendingUntil;
          if (!poisonFresh) {
            if (poisonPending) return;
            if (this._velPlagueTagCdUntil && now < this._velPlagueTagCdUntil) return;
            this._velPlagueTagCdUntil = now + 250;
            if (distToEnemy > weaponTriggerRange) return;
            const prevAutoAim = my.autoAim;
            const prevTail = player.tailIndex ?? 0;
            my.autoAim = true;
            buyEquip(21, 19);
            io.send("9", getAim(1) ?? Enemy.aim2, 1);
            sendAtck(1);
            sendAtck(0);
            this._velPlaguePendingSid = Enemy.sid;
            this._velPlaguePendingUntil = now + 1500;
            Mod.tickBase(() => {
              if (!this.isTrue && !prevAutoAim) my.autoAim = false;
              if (
                !this.isTrue &&
                wantsShadowWings &&
                prevTail !== 19 &&
                player.tailIndex === 19
              ) {
                buyEquip(prevTail, 1);
              }
            }, 1);
            return;
          }
        }

        if (this._velRetreatSid === Enemy.sid) {
          const playerMoving = player.moveDir !== undefined;
          if (playerMoving || traps.inTrap) {
            io.send("a", undefined, 1);
            this._velRetreatSid = null;
            this._velRetreatUntil = 0;
          } else if (
            distToEnemy < effectiveMinRange &&
            this._velRetreatUntil &&
            now < this._velRetreatUntil
          ) {
            io.send("a", UTILS.getDirect(player, Enemy, 2, 2), 1);
            return;
          } else {
            io.send("a", undefined, 1);
            this._velRetreatSid = null;
            this._velRetreatUntil = 0;
          }
        }

        if (distToEnemy < effectiveMinRange) {
          if (needsPlague) {
            const playerMoving = player.moveDir !== undefined;
            if (!playerMoving && !traps.inTrap) {
              io.send("a", UTILS.getDirect(player, Enemy, 2, 2), 1);
              this._velRetreatSid = Enemy.sid;
              this._velRetreatUntil = now + 800;
            }
          }
          return;
        }

        if (distToEnemy > maxRange) return;

        if (this._velTickCdUntil && now < this._velTickCdUntil && !traps.inTrap) return;

        if (needsPlague) {
          if (player.weapons[1] !== undefined && player.reloads?.[player.weapons[1]] > 0) {
            return;
          }
          if (Enemy.poisonTick === undefined || !config.serverUpdateRate) return;
          const poisonPhase =
            ((Mod.tick - Enemy.poisonTick) % config.serverUpdateRate + config.serverUpdateRate) %
            config.serverUpdateRate;
          if (poisonPhase !== 7 && poisonPhase !== 8 && poisonPhase !== 9) return;
        }

        this._velTickCdUntil = now + (traps.inTrap ? 1500 : 5000);
        this.setInstaType("VelTick");
        this.lastTarget = Enemy?.name || "Unknown";
        notif("Vel Tick");
        this.isTrue = true;
        my.autoAim = true;
        if (this._velRetreatSid) {
          io.send("a", undefined, 1);
          this._velRetreatSid = null;
          this._velRetreatUntil = 0;
        }
        if (distToEnemy <= weaponTriggerRange) io.send("9", undefined, 1);
        const isAlt = [10, 14].includes(player.weapons[1]);
        const tickWeapon = player.weapons[isAlt ? 1 : 0];
        selectWeapon(tickWeapon);
        biomeGear();
        buyEquip(11, 1);
        io.send("9", getAim(3) ?? Enemy.aim2, 1);
        Mod.tickBase(() => {
          selectWeapon(tickWeapon);
          buyEquip(53, 0);
          buyEquip(11, 1);
          io.send("9", getAim(2) ?? Enemy.aim2, 1);
          Mod.tickBase(() => {
            selectWeapon(player.weapons[0]);
            buyEquip(7, 0);
            buyEquip(19, 1);
            sendAutoGather();
            io.send("9", getAim(1) ?? Enemy.aim2, 1);
            Mod.tickBase(() => {
              sendAutoGather();
              this.isTrue = false;
              my.autoAim = false;
              io.send("9", undefined, 1);
              if (this._velRetreatSid) {
                io.send("a", undefined, 1);
                this._velRetreatSid = null;
                this._velRetreatUntil = 0;
              }
            }, 1);
          }, 1);
        }, 1);
      } catch (err) {
        this.isTrue = false;
        my.autoAim = false;
        io.send("9", undefined, 1);
        io.send("a", undefined, 1);
        this._velRetreatSid = null;
        this._velRetreatUntil = 0;
      }
    };

    this.autoOneTickType = function () {
      try {
        const canStart =
          !this.isTrue &&
          AB.Menu.AutoOneTick &&
          player &&
          player.alive &&
          inGame &&
          Enemy &&
          Enemy.alive &&
          Enemy.length &&
          !my.autoPush;
        if (!canStart) return;

        const now = Date.now();
        const distToEnemy =
          Enemy.dist2 !== undefined ? Enemy.dist2 : UTILS.getDist(player, Enemy, 0, 2);
        if (!items?.weapons || player.weapons?.[0] === undefined) return;
        const primaryWeapon = player.weapons[0];
        const secondaryWeapon = player.weapons[1];
        if (secondaryWeapon == null) return;
        const weaponInfo = items.weapons[primaryWeapon];
        const weaponRange = weaponInfo ? weaponInfo.range : 0;
        const weaponTriggerRange = weaponRange + Enemy.scale * 1.8;
        if (player.reloads?.[primaryWeapon] > 0) return;
        if (player.reloads?.[secondaryWeapon] > 0) return;
        if (weaponTriggerRange <= 0) return;
        if (distToEnemy > weaponTriggerRange) return;
        if (this.autoOneTickCdUntil && now < this.autoOneTickCdUntil) return;

        this.autoOneTickCdUntil = now + (traps.inTrap ? 1500 : 5000);
        notif("One Tick");
        this.setInstaType("One Tick");
        this.lastTarget = Enemy?.name || "Unknown";
        this.isTrue = true;
        this.ticking = true;
        my.autoAim = true;
        selectWeapon(secondaryWeapon);
        buyEquip(53, 0);
        buyEquip(19, 1);
        io.send("a", Enemy.aim2, 1);
        if (secondaryWeapon == 15) {
          my.revAim = true;
          sendAutoGather();
        }
        Mod.tickBase(() => {
          my.revAim = false;
          selectWeapon(primaryWeapon);
          buyEquip(53, 19);
          Mod.tickBase(() => {
            selectWeapon(primaryWeapon);
            buyEquip(7, 19);

            sendAutoGather();
            io.send("a", Enemy.aim2, 1);
            Mod.tickBase(() => {
              sendAutoGather();
              this.isTrue = false;
              this.ticking = false;
              my.autoAim = false;
              Hit.stop();
              Hit.reset();
              io.send("a", undefined, 1);
            }, 3);
          }, 1);
        }, 1);
      } catch (err) {
        this.isTrue = false;
        this.ticking = false;
        my.autoAim = false;
        io.send("a", undefined, 1);
      }
    };

    this.changeType = function (type) {
      this.wait = false;
      this.isTrue = true;
      my.autoAim = true;
      Enemy.backupNobull = AB.Menu.backupNobull !== false;

      this.syncBotsInsta(type);

      const actions = {
        rev: () => this.revInstakill(),
        nobull: () => this.noBullInstakill(),
        normal: () => this.normalInstakill(),
        default: () => {
          setTimeout(() => {
            this.isTrue = false;
            my.autoAim = false;
          }, 50);
        },
      };

      (actions[type] || actions.default)();
    };

    this.syncBotsInsta = function (type) {
      if (typeof botClients !== "undefined" && botClients.length > 0) {
        botClients.forEach((client) => {
          if (
            client &&
            client.instakill &&
            client.near &&
            client.Bot &&
            client.Bot.alive
          ) {
            const canInsta = client.instakill.checkCanInsta();
            if (canInsta >= 95) {
              client.instakill.can = true;
              client.instakill.performInsta(type);
            }
          }
        });
      }
    };

    function notif(title, description) {
      let mouseCoord = player;
      let m = textManager;
      textManager.showText(
        mouseCoord.x,
        mouseCoord.y,
        30,
        0.18,
        500,
        title,
        "white",
      );
    }

    this.revInstakill = function () {
      notif("Rev Insta");
      this.setInstaType("Rev Insta");
      this.lastTarget = Enemy?.name || "Unknown";
      healer1();
      selectWeapon(player.weapons[1]);
      buyEquip(53, 0);
      sendAutoGather();
      const instaSpeed = AB.Menu.InstaSpeed || 99;
      setTimeout(() => {
        selectWeapon(player.weapons[0]);
        buyEquip(7, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, instaSpeed + 126);
      }, instaSpeed + 1);
    };

    this.noBullInstakill = function () {
      notif("No Bull Insta");
      this.setInstaType("No Bull Insta");
      this.lastTarget = Enemy?.name || "Unknown";
      selectWeapon(player.weapons[0]);
      healer1();
      buyEquip(7, 21);
      sendAutoGather();
      const instaSpeed = AB.Menu.InstaSpeed || 99;
      setTimeout(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(player.reloads[53] == 0 ? 53 : 6, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, instaSpeed + 126);
      }, instaSpeed + 6);
    };

    this.normalInstakill = function () {
      notif("Insta");
      this.setInstaType("Insta");
      this.lastTarget = Enemy?.name || "Unknown";
      if (player.weapons[1] === 10) {
        this.revInstakill();
        return;
      }

      selectWeapon(player.weapons[0]);
      buyEquip(7, 21);
      sendAutoGather();
      const instaSpeed = AB.Menu.InstaSpeed || 99;
      setTimeout(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(player.reloads[53] == 0 ? 53 : 6, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, instaSpeed + 126);
      }, instaSpeed + 1);
    };

    this.spikeTickType = function () {
      this.setInstaType("Spike Tick");
      this.lastTarget = Enemy?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(player.weapons[0]);
      buyEquip(7, 0);
      sendAutoGather();
      Mod.tickBase(() => {
        buyEquip(53, 0);
        selectWeapon(player.weapons[0]);
        buyEquip(53, 0);
        Mod.tickBase(() => {
          sendAutoGather();
          if (player.weapons[1] === 10) {
            selectWeapon(player.weapons[1]);
          }
          this.isTrue = false;
          my.autoAim = false;
          buyEquip(6, 21);
        }, 3);
      }, 1);
    };

    this.counterType = function () {
      notif("Counter");
      this.setInstaType("Counter");
      this.lastTarget = Enemy?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      my.revAim = true;
      if (!recording) {
        Mod.sendChat("Abyss | Counter");
      }
      selectWeapon(player.weapons[1]);
      buyEquip(53, 19);
      sendAutoGather();
      io.send("a", Enemy.aim2, 1);
      Mod.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 19);
        io.send("a", Enemy.aim2, 1);
        Mod.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          io.send("a", undefined, 1);
        }, 1);
      }, 1);
    };

    this.antiCounterType = function () {
      notif("Anti Counter");
      this.setInstaType("Anti Counter");
      this.lastTarget = Enemy?.name || "Unknown";
      my.autoAim = true;
      this.isTrue = true;
      selectWeapon(player.weapons[0]);
      buyEquip(6, 21);
      io.send("D", Enemy.aim2);
      sendAutoGather();
      Mod.tickBase(() => {
        buyEquip(player.reloads[53] == 0 ? (player.skins[53] ? 53 : 6) : 6, 0);
        buyEquip(21, 1);
        Mod.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, 1);
      }, 1);
    };

    this.rangeType = function (type) {
      this.isTrue = true;
      my.autoAim = true;

      if (type === "ageInsta") {
        this.ageInstaKill();
      } else {
        this.rangeInstaKill();
      }
    };

    this.ageInstaKill = function () {
      notif("Age Insta");
      this.setInstaType("Age Insta");
      this.lastTarget = Enemy?.name || "Unknown";
      my.ageInsta = false;
      if (player.items[5] === 18) {
        Mod.place(5, Enemy.aim2);
      }
      io.send("a", undefined, 1);
      buyEquip(22, 21);
      Mod.tickBase(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(53, 21);
        sendAutoGather();
        Mod.tickBase(() => {
          sendUpgrade(12);
          selectWeapon(player.weapons[1]);
          buyEquip(53, 21);
          Mod.tickBase(() => {
            sendUpgrade(15);
            selectWeapon(player.weapons[1]);
            buyEquip(53, 21);
            Mod.tickBase(() => {
              sendAutoGather();
              this.isTrue = false;
              my.autoAim = false;
            }, 1);
          }, 1);
        }, 1);
      }, 1);
    };

    this.rangeInstaKill = function () {
      notif("Range Insta");
      this.setInstaType("Range Insta");
      this.lastTarget = Enemy?.name || "Unknown";
      selectWeapon(player.weapons[1]);
      if (
        player.reloads[53] == 0 &&
        Enemy &&
        Enemy.dist2 !== undefined &&
        Enemy.dist2 <= 700 &&
        Enemy.skinIndex != 22
      ) {
        buyEquip(53, 0);
      } else {
        buyEquip(20, 0);
      }
      buyEquip(11, 0);
      sendAutoGather();
      Mod.tickBase(() => {
        sendAutoGather();
        this.isTrue = false;
        my.autoAim = false;
      }, 1);
    };

    this.oneTickType = function () {
      notif("One Tick");
      this.setInstaType("One Tick");
      this.lastTarget = Enemy?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(player.weapons[1]);
      buyEquip(53, 19);
      io.send("a", Enemy.aim2, 1);
      if (player.weapons[1] == 15) {
        my.revAim = true;
        sendAutoGather();
      }
      Mod.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 19);
        io.send("a", Enemy.aim2, 1);
        if (player.weapons[1] != 15) {
          sendAutoGather();
        }
        Mod.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          io.send("a", undefined, 1);
        }, 1);
      }, 1);
    };

    this.threeOneTickType = function () {
      notif("One Tick 3");
      this.setInstaType("One Tick 3");
      this.lastTarget = Enemy?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(
        player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
      );
      Mod.biomeGear();
      buyEquip(19, 1);
      io.send("a", Enemy.aim2, 1);
      Mod.tickBase(() => {
        selectWeapon(
          player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
        );
        buyEquip(53, 19);
        io.send("a", Enemy.aim2, 1);
        Mod.tickBase(() => {
          selectWeapon(player.weapons[0]);
          buyEquip(7, 19);
          sendAutoGather();
          io.send("a", Enemy.aim2, 1);
          Mod.tickBase(() => {
            sendAutoGather();
            this.isTrue = false;
            my.autoAim = false;
            io.send("a", undefined, 1);
          }, 1);
        }, 1);
      }, 1);
    };

    this.oneFrameType = function () {
      notif("One Frame");
      this.isTrue = true;
      my.autoAim = true;
      const aimDir = Enemy.aim2;
      selectWeapon(player.weapons[1]);
      io.send("a", aimDir, 1);
      buyEquip(53, 19);
      setTimeout(() => {
        selectWeapon(player.weapons[0]);
        buyEquip(7, 21);
        io.send("d", 1, aimDir, 1);
      }, 200);
      setTimeout(() => {
        my.autoAim = false;
        selectWeapon(player.weapons[0]);
        Mod.biomeGear();
        io.send("d", 0, aimDir, 1);
        this.isTrue = false;
      }, 350);
      setTimeout(() => {
        io.send("a", undefined, 1);
      }, 510);
    };

    this.kmTickType = function () {
      notif("KM Tick");
      this.isTrue = true;
      my.autoAim = true;
      my.revAim = true;
      selectWeapon(player.weapons[1]);
      buyEquip(53, 19);
      sendAutoGather();
      io.send("a", Enemy.aim2, 1);
      Mod.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 19);
        io.send("a", Enemy.aim2, 1);
        Mod.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          io.send("a", undefined, 1);
        }, 1);
      }, 1);
    };

    this.boostTickActive = false;
    this.boostTickInterval = null;
    this.boostRange = 500;
    this.currentTarget = null;
    this.boostVelocity = 0.8;
    this.canExecute = true;

    this.boostTickType = function () {
      if (this.boostTickActive) {
        this.terminateBoostTick();
      } else {
        if (!WS || WS.readyState !== WebSocket.OPEN) return;
        if (!player || !player.alive) return;
        notif("Boost Tick");
        this.boostTickActive = true;
        this.canExecute = true;
        this.initiateBoostTick();
      }
    };

    this.initiateBoostTick = function () {
      if (!this.validateConnection()) return;
      this.scheduleCheck(0);
    };

    this.validateConnection = function () {
      if (!this.boostTickActive) return false;
      if (!WS || WS.readyState !== WebSocket.OPEN) {
        this.terminateBoostTick();
        return false;
      }
      if (!player || !player.alive) {
        this.terminateBoostTick();
        return false;
      }
      return true;
    };

    this.checkBoostConditions = function () {
      if (!this.validateConnection()) return;

      if (!this.validateTarget()) {
        this.scheduleCheck(200);
        return;
      }

      this.currentTarget = Enemy;

      const targetDistance = Enemy.dist2;

      if (targetDistance <= this.boostRange - 180 && this.canExecute) {
        this.canExecute = false;
        const targetAngle = Math.atan2(Enemy.y2 - player.y, Enemy.x2 - player.x);
        this.executeBoostStrike(targetAngle, targetDistance);
      } else {
        this.scheduleCheck(50);
      }
    };

    this.validateTarget = function () {
      return (
        Enemy && Enemy.x2 && Enemy.alive && Enemy.health > 0 && Enemy !== player
      );
    };

    this.scheduleCheck = function (delay) {
      if (this.boostTickInterval) clearTimeout(this.boostTickInterval);
      this.boostTickInterval = setTimeout(() => {
        if (this.validateConnection()) {
          this.checkBoostConditions();
        }
      }, delay);
    };

    this.executeBoostStrike = function (angle, distance) {
      if (!this.validateConnection()) return;

      const timingOffset = Math.max(
        1,
        Math.floor((this.boostRange - distance) / 300),
      );

      Mod.tickBase(() => {
        if (!this.validateConnection()) return;
        this.prepareBoostStrike(angle);
      }, 0);

      Mod.tickBase(() => {
        if (!this.validateConnection()) return;
        this.placeBoostAndInitiate(angle);
      }, timingOffset);

      Mod.tickBase(() => {
        if (!this.validateConnection()) return;
        this.executeNormalInsta(angle);
      }, timingOffset + 1);

      Mod.tickBase(() => {
        this.finalizeBoostStrike();
      }, timingOffset + 2);
    };

    this.prepareBoostStrike = function (_angle) {
      io.send("boostTickInsta");
      this.isTrue = true;
      my.autoAim = true;
    };

    this.placeBoostAndInitiate = function (angle) {
      if (player.items[4] === 16) {
        Mod.place(4, angle);
      }

      io.send("a", angle, 1);
      Mod.biomeGear();
      buyEquip(19, 1);
    };

    this.executeNormalInsta = function (angle) {
      if (instaC && instaC.normalInstakill) {
        instaC.normalInstakill();
      } else {
        io.send("d", 1, angle, 1);
      }

      io.send("a", angle, 1);
    };

    this.finalizeBoostStrike = function () {
      this.isTrue = false;
      my.autoAim = false;
      my.revAim = false;
      io.send("a", undefined, 0);
      this.terminateBoostTick();
    };

    this.terminateBoostTick = function () {
      if (this.boostTickInterval) {
        clearTimeout(this.boostTickInterval);
        this.boostTickInterval = null;
      }

      this.boostTickActive = false;
      this.isTrue = false;
      my.autoAim = false;
      my.revAim = false;
      this.currentTarget = null;
      this.canExecute = true;

      io.send("a", undefined, 0);
    };

    this.gotoGoal = function (goto, OT) {
      let slowDists = (weeeee) => weeeee * config.playerScale;
      let goal = {
        a: goto - OT,
        b: goto + OT,
        c: goto - slowDists(1),
        d: goto + slowDists(1),
        e: goto - slowDists(2),
        f: goto + slowDists(2),
        g: goto - slowDists(4),
        h: goto + slowDists(4),
      };
      let bQ = (wwww, awwww) => {
        if (
          player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
          player.y2 <= config.mapScale / 2 + config.riverWidth / 2 &&
          awwww == 0
        ) {
          buyEquip(31, 0);
        } else {
          buyEquip(wwww, awwww);
        }
      };

      if (Enemy.length) {
        let dst = Enemy.dist2;
        this.ticking = true;
        if (dst >= goal.a && dst <= goal.b) {
          bQ(22, 0);
          bQ(11, 1);
          if (
            player.weaponIndex !=
            player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0] ||
            player.buildIndex > -1
          ) {
            selectWeapon(
              player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
            );
          }
          return {
            dir: undefined,
            action: 1,
          };
        } else {
          if (dst < goal.a) {
            if (dst >= goal.g) {
              if (dst >= goal.e) {
                if (dst >= goal.c) {
                  bQ(40, 0);
                  bQ(10, 1);
                  if (
                    player.weaponIndex !=
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ] ||
                    player.buildIndex > -1
                  ) {
                    selectWeapon(
                      player.weapons[
                      [10, 14].includes(player.weapons[1]) ? 1 : 0
                      ],
                    );
                  }
                } else {
                  bQ(22, 0);
                  bQ(19, 1);
                  if (
                    player.weaponIndex !=
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ] ||
                    player.buildIndex > -1
                  ) {
                    selectWeapon(
                      player.weapons[
                      [10, 14].includes(player.weapons[1]) ? 1 : 0
                      ],
                    );
                  }
                }
              } else {
                bQ(6, 0);
                bQ(12, 1);
                if (
                  player.weaponIndex !=
                  player.weapons[
                  [10, 14].includes(player.weapons[1]) ? 1 : 0
                  ] ||
                  player.buildIndex > -1
                ) {
                  selectWeapon(
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ],
                  );
                }
              }
            } else {
              Mod.biomeGear();
              bQ(11, 1);
              if (
                player.weaponIndex !=
                player.weapons[
                [10, 14].includes(player.weapons[1]) ? 1 : 0
                ] ||
                player.buildIndex > -1
              ) {
                selectWeapon(
                  player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
                );
              }
            }
            return {
              dir: Enemy.aim2 + Math.PI,
              action: 0,
            };
          } else if (dst > goal.b) {
            if (dst <= goal.h) {
              if (dst <= goal.f) {
                if (dst <= goal.d) {
                  bQ(40, 0);
                  bQ(9, 1);
                  if (
                    player.weaponIndex !=
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ] ||
                    player.buildIndex > -1
                  ) {
                    selectWeapon(
                      player.weapons[
                      [10, 14].includes(player.weapons[1]) ? 1 : 0
                      ],
                    );
                  }
                } else {
                  bQ(22, 0);
                  bQ(19, 1);
                  if (
                    player.weaponIndex !=
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ] ||
                    player.buildIndex > -1
                  ) {
                    selectWeapon(
                      player.weapons[
                      [10, 14].includes(player.weapons[1]) ? 1 : 0
                      ],
                    );
                  }
                }
              } else {
                bQ(6, 0);
                bQ(12, 1);
                if (
                  player.weaponIndex !=
                  player.weapons[
                  [10, 14].includes(player.weapons[1]) ? 1 : 0
                  ] ||
                  player.buildIndex > -1
                ) {
                  selectWeapon(
                    player.weapons[
                    [10, 14].includes(player.weapons[1]) ? 1 : 0
                    ],
                  );
                }
              }
            } else {
              Mod.biomeGear();
              bQ(11, 1);
              if (
                player.weaponIndex !=
                player.weapons[
                [10, 14].includes(player.weapons[1]) ? 1 : 0
                ] ||
                player.buildIndex > -1
              ) {
                selectWeapon(
                  player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
                );
              }
            }
            return {
              dir: Enemy.aim2,
              action: 0,
            };
          }
          return {
            dir: undefined,
            action: 0,
          };
        }
      } else {
        this.ticking = false;
        return {
          dir: undefined,
          action: 0,
        };
      }
    };

    this.bowMovement = function () {
      let moveMent = this.gotoGoal(685, 10);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.rangeType("ageInsta");
        } else {
          io.send("a", moveMent.dir, 1);
        }
      } else {
        io.send("a", moveMent.dir, 1);
      }
    };

    this.oneFrameCooldown = 0;
    this.framing = false;

    this.oneFrameMovement = function () {
      if (!Enemy.length || !Enemy || this.isTrue) {
        this.framing = false;
        return;
      }
      if (Date.now() - this.oneFrameCooldown < 1000) {
        this.framing = false;
        return;
      }
      this.framing = true;

      const weapon0 = items.weapons[player.weapons[0]];
      const hitRange = weapon0.range;
      const tolerance = 25;
      const dist = Enemy.dist2;

      if (dist >= hitRange - tolerance && dist <= hitRange + tolerance) {
        this.oneFrameCooldown = Date.now();
        this.framing = false;
        this.oneFrameType();
      } else if (dist < hitRange - tolerance) {
        io.send("a", Enemy.aim2 + Math.PI, 1);
      } else {
        io.send("a", Enemy.aim2, 1);
      }
    };

    this.tickMovement = function () {
      let moveMent = this.gotoGoal(238, 3);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.boostTickType();
        } else {
          io.send("a", moveMent.dir, 1);
        }
      } else {
        io.send("a", moveMent.dir, 1);
      }
    };

    this.kmTickMovement = function () {
      let moveMent = this.gotoGoal(240, 3);
      if (moveMent.action) {
        if (
          Enemy.skinIndex != 22 &&
          player.reloads[53] == 0 &&
          !this.isTrue &&
          (Mod.tick - Enemy.poisonTick) % config.serverUpdateRate == 8
        ) {
          this.kmTickType();
        } else {
          io.send("a", moveMent.dir, 1);
        }
      } else {
        io.send("a", moveMent.dir, 1);
      }
    };

    this.boostTickMovement = function () {
      let dist =
        player.weapons[1] == 9
          ? 365
          : player.weapons[1] == 12
            ? 380
            : player.weapons[1] == 13
              ? 365
              : player.weapons[1] == 15
                ? 365
                : 370;
      let moveMent = this.gotoGoal(372, 3);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.boostTickType();
        } else {
          io.send("a", moveMent.dir, 1);
        }
      } else {
        io.send("a", moveMent.dir, 1);
      }
    };

    this.perfCheck = function (pl, nr) {
      if (
        nr.weaponIndex == 11 &&
        UTILS.getAngleDist(nr.aim2 + Math.PI, nr.d2) <= config.shieldAngle
      )
        return false;
      if (![9, 12, 13, 15].includes(player.weapons[1])) return true;
      let pjs = {
        x: nr.x2 + 65 * Math.cos(nr.aim2 + Math.PI),
        y: nr.y2 + 65 * Math.sin(nr.aim2 + Math.PI),
      };
      if (
        UTILS.lineInRect(
          pl.x2 - pl.scale,
          pl.y2 - pl.scale,
          pl.x2 + pl.scale,
          pl.y2 + pl.scale,
          pjs.x,
          pjs.y,
          pjs.x,
          pjs.y,
        )
      ) {
        return true;
      }
      let finds = ais
        .filter((tmp) => tmp.visible)
        .find((tmp) => {
          if (
            UTILS.lineInRect(
              tmp.x2 - tmp.scale,
              tmp.y2 - tmp.scale,
              tmp.x2 + tmp.scale,
              tmp.y2 + tmp.scale,
              pjs.x,
              pjs.y,
              pjs.x,
              pjs.y,
            )
          ) {
            return true;
          }
        });
      if (finds) return false;
      finds = liztobj
        .filter((tmp) => tmp.active)
        .find((tmp) => {
          let tmpScale = tmp.getScale();
          if (
            !tmp.ignoreCollision &&
            UTILS.lineInRect(
              tmp.x - tmpScale,
              tmp.y - tmpScale,
              tmp.x + tmpScale,
              tmp.y + tmpScale,
              pjs.x,
              pjs.y,
              pjs.x,
              pjs.y,
            )
          ) {
            return true;
          }
        });
      if (finds) return false;
      return true;
    };
  }
}

class Autobuy {
  constructor(buyHat, buyAcc) {
    this.hat = function () {
      buyHat.forEach((id) => {
        let find = findID(Store.hats, id);
        if (find && !player.skins[id] && player.points >= find.price)
          io.send("c", 1, id, 0);
      });
    };
    this.acc = function () {
      buyAcc.forEach((id) => {
        let find = findID(Store.accessories, id);
        if (find && !player.tails[id] && player.points >= find.price)
          io.send("c", 1, id, 1);
      });
    };
  }
}

const traps = new Traps(UTILS, items);
const instaC = new Instakill();
const autoBuy = new Autobuy([40, 6, 7, 22, 53, 15, 31], [11, 21, 18, 13]);
function macroReady(e, t) {
  return true;
}
function updateMacros() {
  if (!player || !player.alive) return;
  if (macro.q && macroReady("q", 30)) {
    place(0, getSafeDir());
  }
  if (macro.f && macroReady("f", 60)) {
    place(4, getSafeDir());
  }
  if (macro.v && macroReady("v", 60)) {
    place(2, getSafeDir());
  }
  if (macro.y && macroReady("y", 80)) {
    place(5, getSafeDir());
  }
  if (macro.h && macroReady("h", 80)) {
    const t = player.items.indexOf(22);
    if (t != null && t > -1) {
      place(t, getSafeDir());
    }
  }
  if (macro.n && macroReady("n", 80)) {
    place(3, getSafeDir());
  }
  if (macro.k && macroReady("k", 120)) {
    const t = getSafeDir();
    checkPlace(2, t + Math.PI / 4);
    checkPlace(2, t - Math.PI / 4);
    checkPlace(2, t + Math.PI + Math.PI / 4);
    checkPlace(2, t + Math.PI - Math.PI / 4);
  }
  if (macro.l && macroReady("l", 150)) {
    const t = getSafeDir();
    const i = player.items?.[2];
    const n = player.items?.[4];
    const s = items.list[i];
    const r = items.list[n];
    if (!s || !r) return;
    const o = player.x2 != null ? player.x2 : player.x;
    const l = player.y2 != null ? player.y2 : player.y;
    const c = s.scale;
    const a = r.scale;
    const f = player.scale + s.scale + (s.placeOffset || 0);
    const d = player.scale + r.scale + (r.placeOffset || 0);
    const p = (g, m) => ({
      x: o + Math.cos(m) * g,
      y: l + Math.sin(m) * g,
    });
    const u = (g, m, h) => {
      const y = p(g, m);
      return objectManager.checkItemLocation(
        y.x,
        y.y,
        h.scale,
        0.6,
        h.id,
        false,
        player,
      );
    };
    const g = (m, h, y, b) => {
      const E = m.x - h.x;
      const O = m.y - h.y;
      const A = y + b + 2;
      return E * E + O * O < A * A;
    };
    const m = Math.PI / 36;
    let h = null;
    let y = null;
    let b = null;
    for (let E = 0; E <= Math.PI / 3 && h === null; E += m) {
      for (const O of E === 0 ? [0] : [E, -E]) {
        if (u(d, t + O, r)) {
          h = t + O;
          break;
        }
      }
    }
    const E = t + Math.PI / 2;
    const O = t - Math.PI / 2;
    const A = h !== null ? p(d, h) : null;
    const P = (D, R) => {
      for (let G = 0; G <= Math.PI * 0.7; G += m) {
        for (const S of G === 0 ? [0] : [G, -G]) {
          const V = D + S;
          if (!u(f, V, s)) continue;
          const W = p(f, V);
          if (A && g(W, A, c, a)) continue;
          if (R && g(W, R, c, c)) continue;
          return V;
        }
      }
      return null;
    };
    const D = (R, G) => {
      for (let S = 0; S < Math.PI * 2; S += m) {
        if (!u(f, S, s)) continue;
        const V = p(f, S);
        if (A && g(V, A, c, a)) continue;
        if (G && g(V, G, c, c)) continue;
        if (Math.abs(UTILS.getAngleDist(S, R)) < Math.PI * 0.8) return S;
      }
      return null;
    };
    const R = (G, S) => {
      const V = P(G, null);
      if (V === null) return { first: null, second: null, count: 0 };
      const W = p(f, V);
      const X = P(S, W);
      return {
        first: V,
        second: X,
        count: (V !== null ? 1 : 0) + (X !== null ? 1 : 0),
      };
    };
    const G = R(E, O);
    const S = R(O, E);
    if (G.count >= S.count) {
      y = G.first;
      b = G.second;
    } else {
      b = S.first;
      y = S.second;
    }
    if (y === null) {
      const V = b !== null ? p(f, b) : null;
      y = D(E, V);
    }
    if (b === null) {
      const V = y !== null ? p(f, y) : null;
      b = D(O, V);
    }
    if (h !== null) place(4, h);
    if (y !== null) place(2, y);
    if (b !== null) place(2, b);
  }
}

function enterGame() {
  Gi.hidden = !Et;
  saveVal("moo_name", Ki.value);
  if (!inGame && socketReady()) {
    inGame = true;
    showLoadingText("Loading...");
    const ZWSP = "\u200B";
    let name = (Ki.value || "").trim();
    io.send("M", {
      name: name === "" ? ZWSP : name,
      moofoll: true,
      skin: or == 10 ? "__proto__" : or,
    });
  }
  Dd();
}
window.enterGame = enterGame;
function Dd() {
  var e = document.getElementById("ot-sdk-btn-floating");
  if (e) {
    e.style.display = "none";
  }
}
function Od() {
  var e = document.getElementById("ot-sdk-btn-floating");
  if (e) {
    e.style.display = "block";
  }
}
let firstSetup = true;
let vs = false;
function setupGame(e) {
  fi.style.display = "none";
  Yi.style.display = "block";
  zn.style.display = "none";
  //ut = {};
  keys = {};
  playerSID = e;
  Ke = 0;
  inGame = true;
  if (firstSetup) {
    firstSetup = false;
    gameObjects.length = 0;
  }
  if (player) {
    player.primaryVariant = 0;
    player.secondaryVariant = 0;
  }
  if (Ma) {
    Vu.enable({
      onStartMoving: () => {
        Us();
        Ls();
        setUsingTouch(true);
        Xs = true;
      },
      onStopMoving: () => {
        Xs = false;
        sendMoveDir();
      },
      onRotateMoving: (t, i) => {
        if (!(i.force < 0.25)) {
          Ua = -i.angle.radian;
          sendMoveDir();
          if (!vs) {
            lastDir = -i.angle.radian;
          }
        }
      },
      onStartAttacking: () => {
        Us();
        Ls();
        setUsingTouch(true);
        vs = true;
        if (player.buildIndex < 0) {
          Ke = 1;
          sendAtckState();
        }
      },
      onStopAttacking: () => {
        if (player.buildIndex >= 0) {
          Ke = 1;
          sendAtckState();
        }
        Ke = 0;
        sendAtckState();
        vs = false;
      },
      onRotateAttacking: (t, i) => {
        if (!(i.force < 0.25)) {
          lastDir = -i.angle.radian;
        }
      },
    });
  }
}
function showText(e, t, i, n) {
  if (n === -1) {
    textManager.showText(e, t, 50, 0.18, 500, i, "#ee5551", true);
  } else {
    textManager.showText(
      e,
      t,
      50,
      0.18,
      500,
      Math.abs(i),
      i >= 0 ? "#fff" : "#8ecc51",
      true,
    );
  }
}
let gn = 99999;
function killPlayer() {
  inGame = false;
  Od();
  player.primaryVariant = 0;
  player.secondaryVariant = 0;
  ar.style.display = "none";
  hideAllWindows();
  mn = { x: player.x, y: player.y };
  gn = 0;
  setTimeout(function () {
    Yi.style.display = "block";
    zn.style.display = "block";
  }, config.deathFadeout);
  Da();
}
function killObjects(e) {
  if (player) {
    objectManager.removeAllItems(e);
  }
}
function killObject(e) {
  let Object = findObjectBySid(e);
  objectManager.disableBySid(e);
  if (player && Object) DestroyedObject.Add(Object);
}
function getEl(id) {
  return document.getElementById(id);
}
function drawWeaponIcon(id, imgSrc, rot = Math.PI + Math.PI / 4) {
  const el = getEl(id);
  if (!el) return;
  const c = Object.assign(document.createElement("canvas"), {
    width: 66,
    height: 66,
  });
  const ctx = c.getContext("2d");
  ctx.translate(33, 33);
  ctx.rotate(rot);
  ctx.imageSmoothingEnabled = false;
  const img = new Image();
  img.onload = () => {
    const i = +id.match(/\d+$/);
    const pad = (items.weapons[i]?.iPad || 1) * config.iconPad;
    const scale = img.width / img.height || 1;
    ctx.drawImage(
      img,
      -33 * pad * scale,
      -33 * pad,
      66 * pad * scale,
      66 * pad,
    );
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(0,0,70,.1)";
    ctx.fillRect(-33, -33, 66, 66);
    el.style.backgroundImage = `url(${c.toDataURL()})`;
  };
  img.src = imgSrc;
}
function updateWeaponVariantIndicators() {
  if (!player) return;
  if (
    (player.primaryVariant | 0) === 0 &&
    (player.secondaryVariant | 0) === 0
  ) {
    if (Object.keys(weaponVariantCache).length) {
      for (let key in weaponVariantCache) delete weaponVariantCache[key];
      for (let i = 0; i < items.weapons.length; i++) {
        const weapon = items.weapons[i];
        if (!weapon) continue;
        drawWeaponIcon("actionBarItem" + i, `./img/weapons/${weapon.src}.png`);
      }
    }
  }
  const idxA = player.weaponIndex;
  const updateOne = (idx) => {
    if (idx == null || !Number.isFinite(idx)) return;
    const weapon = items.weapons[idx];
    if (!weapon) return;
    const variant =
      weapon.type === 0
        ? player.primaryVariant || 0
        : player.secondaryVariant || 0;
    const variantSrc = config.weaponVariants[variant]?.src || "";
    const cacheKey = weapon.src + variantSrc;
    if (weaponVariantCache[idx] === cacheKey) return;
    weaponVariantCache[idx] = cacheKey;
    const src =
      variant === 0
        ? `./img/weapons/${weapon.src}.png`
        : `./img/weapons/${weapon.src + variantSrc}.png`;
    drawWeaponIcon("actionBarItem" + idx, src);
  };
  updateOne(idxA);
}

let bloodParticles = [];

class BloodParticle {
  constructor(x, y, angle, speed, size, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = size;
    this.maxSize = size;
    this.color = color;
    this.life = 1;
    this.decay = 0.015 + Math.random() * 0.015;
    this.gravity = 0.15;
    this.bounce = 0.3;
    this.groundY = y + (Math.random() * 60 - 30);
  }

  update(_delta) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= this.decay;
    this.size = this.maxSize * this.life;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy *= -this.bounce;
      this.vx *= 0.8;
    }

    return this.life > 0;
  }
}

function createBloodSplatter(x, y, damageAmount = 20, _sid = null) {
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    !isFinite(x) ||
    !isFinite(y) ||
    damageAmount <= 0
  ) {
    return;
  }

  const isLowDamage = damageAmount < 15;
  const particleCount = isLowDamage ? 8 : 15;
  const baseSize = isLowDamage ? 3 : 6;
  const baseSpeed = isLowDamage ? 2 : 3.5;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = baseSpeed + Math.random() * 2;
    const size = baseSize + Math.random() * 3;
    const color = `hsl(${Math.random() * 20}, 75%, ${30 + Math.random() * 25}%)`;

    bloodParticles.push(new BloodParticle(x, y, angle, speed, size, color));
  }
}

let my = {
  reloaded: false,
  waitHit: 0,
  autoAim: false,
  revAim: false,
  ageInsta: true,
  reSync: false,
  bullTick: 0,
  anti0Tick: 0,
  antiSync: false,
  safePrimary: function (tmpObj) {
    return [0, 8].includes(tmpObj.primaryIndex);
  },
  safeSecondary: function (tmpObj) {
    return [10, 11, 14].includes(tmpObj.secondaryIndex);
  },
  lastDir: 0,
  autoPush: false,
  pushData: {},
};

function findID(tmpObj, tmp) {
  return tmpObj.find((THIS) => THIS.id == tmp);
}

function findSID(tmpObj, tmp) {
  return tmpObj.find((THIS) => THIS.sid == tmp);
}

function findPlayerByID(id) {
  return findID(players, id);
}

function findPlayerBySID(sid) {
  return findSID(players, sid);
}

function findAIBySID(sid) {
  return findSID(ais, sid);
}

function findObjectBySid(sid) {
  return findSID(gameObjects, sid);
}

function findProjectileBySid(sid) {
  return findSID(gameObjects, sid);
}

const musicTracks = [
  {
    name: "Scorpions - Still Loving You",
    url: "https://www.youtube.com/watch?v=7pOr3dBFAeY",
    lyrics: [
      [22088, `Time`],
      [24447, `It needs time`],
      [27005, `To win back your love again`],
      [30752, `I will be there`],
      [35583, `I will be there`],
      [41489, `Love`],
      [43425, `Only love`],
      [45825, `Can bring back your love`],
      [46825, `someday`],
      [49792, `I will be there`],
      [54396, `I will be there`],
      [82718, `Fight`],
      [84764, `Babe, I'll fight`],
      [87201, `To win back your love again`],
      [111170, `I will be there`],
      [115837, `I will be there`],
      [121718, `Love`],
      [123544, `Only love`],
      [126112, `Can bring down the wall`],
      [127112, `someday`],
      [130016, `I will be there`],
      [134598, `I will be there`],
      [141333, `If we'd go again`],
      [144890, `All the way from the start`],
      [150547, `I would try to change`],
      [154197, `The things that killed our`],
      [155197, `love`],
      [159590, `Pride has built a wall, so`],
      [160590, `strong`],
      [164032, `That I can't get through`],
      [166490, `Is there really no chance`],
      [171609, `To start once again?`],
      [174867, `I'm loving you`],
      [178687, `Try`],
      [180707, `Baby, try`],
      [183204, `To trust in my love again`],
      [187096, `I will be there`],
      [191668, `I will be there`],
      [196996, `Love`],
      [199212, `Our love`],
      [201623, `Just shouldn't be thrown`],
      [202623, `away`],
      [205401, `I will be there`],
      [209871, `I will be there`],
      [216658, `If we'd go again`],
      [220151, `All the way from the start`],
      [225644, `I would try to change`],
      [229000, `The things that killed our`],
      [230000, `love`],
      [234372, `Pride has built a wall, so`],
      [235372, `strong`],
      [238802, `That I can't get through`],
      [241281, `Is there really no chance`],
      [246215, `To start once again?`],
      [252074, `If we'd go again`],
      [255432, `All the way from the start`],
      [260895, `I would try to change`],
      [264210, `The things that killed our`],
      [265210, `love`],
      [269214, `Yes, I've hurt your pride`],
      [270214, `and I know`],
      [273703, `What you've been through`],
      [276164, `You should give me a chance`],
      [281189, `This can't be the end`],
      [284245, `I'm still loving you`],
      [292961, `I'm still loving you`],
      [301519, `I'm still loving you`],
      [308104, `I need your love`],
      [310199, `I'm still loving you`],
      [315936, `Still loving you, baby`],
      [318910, `Hoo!`],
      [335028, `I'm still loving you`],
      [341604, `I need your love`],
      [343695, `I'm still loving you`],
      [349940, `I need your love`],
      [352118, `Hoo!`],
      [358181, `I need your love`],
    ],
  },
  {
    name: "Vizzen & Protolizard - Heaven Knows",
    url: "https://ncs.io/track/download/a75d47db-0083-4548-8487-d72fc572dd73",
    lyrics: [
      [18326, "What does it mean to be"],
      [19226, "happy?"],
      [20996, "'Cause it looks like we all"],
      [21896, "don't know"],
      [23802, "Glass half full or empty"],
      [26635, "Man, we're just putting on"],
      [27535, "a show"],
      [29643, "Try to look to the heavens"],
      [32009, "To tell us things that we"],
      [32909, "beg to know"],
      [35134, "Like what did this all"],
      [36034, "mean, if there's no"],
      [36934, "tomorrow"],
      [40167, "Oh, you know I tried to"],
      [41067, "find a purpose in my life"],
      [46490, "To drive me, to guard me"],
      [48602, "Oh doctor, I feel dead"],
      [49402, "inside"],
      [71346, "To drive me, to guard me"],
      [73929, "Oh doctor, I feel dead"],
      [74729, "ins-"],
      [114292, "Try to look to the heavens"],
      [116913, "To tell us things that we"],
      [117813, "beg to know"],
      [120234, "Like what did this all"],
      [121134, "mean, if there's no"],
      [122034, "tomorrow"],
      [136160, "Oh, you know I tried to"],
      [137060, "find a purpose in my life"],
      [141950, "To drive me, to guard me"],
      [144217, "Oh doctor, I feel dead"],
      [145017, "inside"],
    ],
  },
  {
    name: "Guns N' Roses - November Rain",
    url: "https://www.youtube.com/watch?v=8x23ajWSHyo",
    lyrics: [
      [74160, `When I look into your eyes`],
      [77850, `I can see a love restrained`],
      [87300, `But darling, when I hold you`],
      [90190, `Don't you know I feel the same?`],
      [94860, `Yeah`],
      [99930, `Nothing lasts forever`],
      [102560, `And we both know hearts can`],
      [103560, `change`],
      [111790, `And it's hard to hold a`],
      [112790, `candle`],
      [114930, `In the cold November rain`],
      [124300, `We've been through this such`],
      [125300, `a long, long time`],
      [127330, `Just trying to kill the`],
      [128330, `pain, oh yeah`],
      [135340, `But lovers always come and`],
      [136340, `lovers always go`],
      [138350, `And no one's really sure who's`],
      [139350, `letting go today`],
      [144010, `Walking away`],
      [147770, `If we could take the time to`],
      [148770, `lay it on the line`],
      [150690, `I could rest my head just`],
      [151690, `knowing that you were mine`],
      [156290, `All mine`],
      [161400, `So if you want to love me`],
      [164450, `Then darling, don't refrain`],
      [173740, `Or I'll just end up walking`],
      [176650, `In the cold November rain`],
      [183930, `Do you need some time on`],
      [184930, `your own?`],
      [190080, `Do you need some time all`],
      [191080, `alone?`],
      [195740, `Ooh, everybody needs some`],
      [196740, `time on their own`],
      [201840, `Ooh, don't you know you need`],
      [202840, `some time all alone?`],
      [210030, `I know it's hard to keep an`],
      [211030, `open heart`],
      [215780, `When even friends seem out`],
      [216780, `to harm you`],
      [221990, `But if you could heal a`],
      [222990, `broken heart`],
      [227870, `Wouldn't time be out to`],
      [228870, `charm you?`],
      [231490, `Oh, oh, oh, oh, oh`],
      [283570, `Sometimes I need some time`],
      [284570, `on my own`],
      [289890, `Sometimes I need some time`],
      [290890, `all alone`],
      [295470, `Ooh, everybody needs some`],
      [296470, `time on their own`],
      [301720, `Ooh, don't you know you need`],
      [302720, `some time all alone?`],
      [337790, `And when your fears subside`],
      [340690, `And shadows still remain,`],
      [341690, `oh yeah`],
      [350060, `I know that you can love me`],
      [352850, `When there's no one left to`],
      [353850, `blame`],
      [362040, `So never mind the darkness`],
      [365160, `We still can find a way`],
      [374180, `Nothing lasts forever`],
      [376860, `Even cold November rain`],
      [451300, `You're not the only one`],
      [454100, `You're not the only one`],
      [456550, `Don't you think that you`],
      [457550, `need somebody?`],
      [459250, `Don't you think that you`],
      [460250, `need someone?`],
      [461950, `Everybody needs somebody`],
      [464480, `You're not the only one`],
      [467160, `You're not the only one`],
      [469840, `Don't you think that you`],
      [470840, `need somebody?`],
      [472610, `Don't you think that you`],
      [473610, `need someone?`],
      [475100, `Everybody needs somebody`],
      [477710, `You're not the only one`],
      [480320, `You're not the only one`],
      [482970, `Don't you think that you`],
      [483970, `need somebody?`],
      [485490, `Don't you think that you`],
      [486490, `need someone?`],
      [488210, `Everybody needs somebody`],
      [490810, `You're not the only one`],
      [493260, `You're not the only one`],
      [496030, `Don't you think that you`],
      [497030, `need somebody?`],
      [498780, `Don't you think that you`],
      [499780, `need someone?`],
      [501350, `Everybody needs somebody`],
    ],
  },
  {
    name: "Evanescence - Tourniquet",
    url: "https://www.youtube.com/watch?v=sONn94Bc694",
    lyrics: [
      [40040, `I tried to kill the pain`],
      [44480, `But only brought more`],
      [45480, `(So much more)`],
      [49440, `I lay dying`],
      [51520, `And I'm pouring crimson`],
      [52520, `regret and betrayal`],
      [58860, `I'm dying, praying,`],
      [59860, `bleeding and screaming`],
      [68320, `Am I too lost to be saved`],
      [72980, `Am I too lost?`],
      [77620, `My God my tourniquet`],
      [80940, `Return to me salvation`],
      [87020, `My God my tourniquet`],
      [90280, `Return to me salvation`],
      [96440, `Do You remember me?`],
      [101120, `Lost for so long`],
      [105870, `Will You be on the`],
      [106870, `other side?`],
      [110320, `Or will You forget me?`],
      [115260, `I'm dying, praying,`],
      [116260, `bleeding and screaming`],
      [124700, `Am I too lost to be saved`],
      [129360, `Am I too lost?`],
      [134060, `My God my tourniquet`],
      [137320, `Return to me salvation`],
      [143360, `My God my tourniquet`],
      [146740, `Return to me salvation`],
      [156280, `(Return to me salvation)`],
      [169040, `(I want to die)`],
      [171640, `My God my tourniquet`],
      [174940, `Return to me salvation`],
      [180940, `My God my tourniquet`],
      [184300, `Return to me salvation`],
      [190440, `My wounds cry for the grave`],
      [194870, `My soul cries for`],
      [195870, `deliverance`],
      [199570, `Will I be denied Christ`],
      [205070, `Tourniquet`],
      [206540, `My suicide`],
      [211920, `(Return to me salvation)`],
      [221000, `(Return to me salvation)`],
    ],
  },
  {
    name: "Judas Priest - Painkiller",
    url: "https://www.youtube.com/watch?v=kO_EdmtR5Ck",
    lyrics: [
      [26660, `Faster than a bullet`],
      [29100, `Terrifying scream`],
      [31250, `Enraged and full of anger`],
      [33190, `He's half man and half`],
      [34190, `machine`],
      [35940, `Rides the Metal Monster`],
      [38370, `Breathing smoke and fire`],
      [40670, `Closing in with vengeance`],
      [41670, `soaring high`],
      [45310, `He`],
      [46510, `Is`],
      [47640, `The Painkiller`],
      [49970, `This`],
      [51140, `Is`],
      [52250, `The Painkiller`],
      [54440, `Planets devastated`],
      [56910, `Mankind's on its knees`],
      [59040, `A saviour comes from out the`],
      [60040, `skies`],
      [61280, `In answer to their pleas`],
      [63630, `Through boiling clouds of`],
      [64630, `thunder`],
      [66200, `Blasting bolts of steel`],
      [68650, `Evils going under deadly`],
      [69650, `wheels`],
      [73210, `He`],
      [74380, `Is`],
      [75450, `The Painkiller`],
      [77870, `This`],
      [79040, `Is`],
      [80170, `The Painkiller`],
      [101120, `Faster than a laser bullet`],
      [105720, `Louder than an atom bomb`],
      [110570, `Chromium-plated boiling`],
      [111570, `metal`],
      [115140, `Brighter than a thousand`],
      [116140, `suns`],
      [216370, `Flying high on rapture`],
      [218640, `Stronger, free and brave`],
      [220950, `Nevermore encaptured`],
      [222700, `They've been brought back`],
      [223700, `from the grave`],
      [225430, `With mankind resurrected`],
      [227710, `Forever to survive`],
      [230090, `Returns from Armageddon to`],
      [231090, `the skies`],
      [234940, `He`],
      [236070, `Is`],
      [237150, `The Painkiller`],
      [239660, `This`],
      [240800, `Is`],
      [241890, `The Painkiller`],
      [244240, `Wings`],
      [245450, `Of`],
      [246560, `Steel`],
      [247160, `Painkiller`],
      [248860, `Deadly`],
      [251200, `Wheels`],
      [251850, `Painkiller`],
      [281520, `He`],
      [282570, `Is`],
      [283720, `The Painkiller`],
      [286140, `This`],
      [287270, `Is`],
      [288400, `The Painkiller`],
      [290750, `He`],
      [291910, `Is`],
      [293060, `The Painkiller`],
      [295390, `This`],
      [296520, `Is`],
      [297730, `The Painkiller`],
      [300130, `Pain`],
      [301210, `Pain`],
      [302430, `Killer`],
      [303530, `Killer`],
      [304750, `Pain`],
      [305850, `Pain`],
      [307050, `Killer`],
      [308170, `Killer`],
      [323390, `Pain`],
      [332810, `Can't`],
      [334190, `Stop`],
      [335540, `The Painkiller`],
      [358000, `Pain`],
    ],
  },
  {
    name: "Eminem: Mockingbird",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Eminem_-_Mockingbird_(Hydr0.org).mp3",
    lyrics: [
      [2500, `Yeah`],
      [4660, `I know sometimes`],
      [6069, `Things may not always make`],
      [7694, `sense to you right now`],
      [10280, `But hey`],
      [11950, `What Daddy always tell you?`],
      [13956, `Straighten up, little soldier`],
      [16466, `Stiffen up that upper lip`],
      [19223, `What you cryin' about?`],
      [21145, `You got me`],
      [22300, `Hailie, I know you`],
      [22990, `miss your mom,`],
      [23812, `and I know you miss your dad`],
      [25230, `When I'm gone, but I'm tryin'`],
      [26202, `to give you the life`],
      [26988, `that I never had`],
      [28300, `I can see you're sad,`],
      [28992, `even when you smile,`],
      [30016, `even when you laugh`],
      [31106, `I can see it in your eyes,`],
      [32590, `deep inside you wanna cry`],
      [33960, `'Cause you're scared,`],
      [34686, `I ain't there, Daddy's wit'`],
      [35379, `you in your prayers`],
      [36623, `No more cryin',`],
      [37405, `wipe them tears,`],
      [38246, `Daddys here no more nightmares`],
      [39615, `We gon' pull together`],
      [40569, `through it, we gon' do it`],
      [41752, `Lainie, Uncles crazy, aint he?`],
      [43044, `Yeah, but he loves you, girl,`],
      [44353, `and you better know it`],
      [45323, `We're all we got in this world`],
      [46579, `when it spins, when it swirls`],
      [48098, `When it whirls, when it twirls`],
      [49552, `two little beautiful girls`],
      [51028, `Lookin' puzzled, in a daze,`],
      [52361, `I know it's confusin' you`],
      [53903, `Daddy's always on the move,`],
      [55245, `Mama's always on the news`],
      [56575, `I try to keep you sheltered`],
      [57715, `from it, but somehow it seems`],
      [59082, `The harder that I try`],
      [59969, `to do that, the more`],
      [60864, `it backfires on me`],
      [61833, `All the things growin' up`],
      [63335, `as Daddy that he had to see`],
      [64708, `Daddy don't want you to see,`],
      [66154, `but you see just as`],
      [67046, `much as he did`],
      [67926, `We did not plan it to be`],
      [68888, `this way, your mother and me`],
      [70435, `But things have got`],
      [71106, `so bad between us, I don't`],
      [72044, `see us ever bein' together`],
      [73793, `ever again, like we used to`],
      [75468, `be when we was teenagers`],
      [76593, `But then, of course,`],
      [77523, `everything always happens`],
      [78831, `for a reason, I guess it was`],
      [80170, `never meant to be`],
      [81453, `But it's just somethin we have`],
      [82548, `no control over, and that's`],
      [83668, `what destiny is`],
      [84602, `But no more worries,`],
      [86073, `rest your head and go to sleep`],
      [87303, `Maybe one day we'll wake up`],
      [88708, `and thisll all just be a dream`],
      [90204, `Now hush, little baby,`],
      [92111, `don't you cry`],
      [93499, `Everything's gonna be alright`],
      [94800, `Stiffen that upper lip up,`],
      [96705, `little lady, I told ya`],
      [98402, `Daddy's here to hold ya`],
      [99801, `through the night`],
      [101108, `I know Mommy's not here`],
      [102407, `right now and we dont know why`],
      [104610, `We feel how we feel inside`],
      [106486, `It may seem a little`],
      [107675, `crazy, pretty baby`],
      [109571, `But I promise Mama's`],
      [111158, `gon' be alright`],
      [112282, `Heh, it's funny`],
      [113205, `I remember back one year when`],
      [114970, `Daddy had no money`],
      [116155, `Mommy wrapped the Christmas`],
      [116999, `presents up and stuck 'em`],
      [118014, `under the tree and said`],
      [119100, `some of 'em were from me cause`],
      [120211, `Daddy couldn't buy 'em`],
      [121540, `Ill never forget that Chrismas`],
      [122940, `I sat up the whole night`],
      [124229, `crying cause Daddy felt`],
      [125658, `like a bum see Daddy had a job`],
      [126494, `But his job was to keep the`],
      [128128, `food on the table for`],
      [129196, `you and Mom and at the time,`],
      [131111, `every house that we lived in`],
      [132514, `Either kept gettin`],
      [133400, `broken into and robbed or`],
      [134869, `shot up on the block`],
      [136000, `And your Mom was savin'`],
      [137162, `money for you in a jar`],
      [138696, `Tryin to start a piggy bank`],
      [139884, `for you so you could`],
      [140750, `go to college`],
      [141465, `Almost had a thousand dollars`],
      [142736, `til someone broke in`],
      [144261, `and stole it an I know it hurt`],
      [145577, `so bad it broke`],
      [146341, `your Mama's heart`],
      [147420, `And it seemed like everything`],
      [148366, `was just startin to fall apart`],
      [150200, `Mom and Dad was arguin' a lot`],
      [151856, `So Mama moved back on to`],
      [153313, `Chalmers in the flat,`],
      [154425, `one-bedroom apartment`],
      [155880, `And Dad moved back to the`],
      [157000, `other side of 8 Mile on Novara`],
      [158457, `And that's when Daddy went`],
      [159775, `to California with his CD`],
      [161518, `And met Dr. Dre, and flew`],
      [162489, `you and Mama out to see me`],
      [164118, `But Daddy had to work,`],
      [165668, `you and Mama had to leave me`],
      [167119, `Then you started seein`],
      [168026, `Daddy on the TV`],
      [169041, `And Mama didn't like it`],
      [170491, `And you and Lainie were`],
      [171657, `too young to understand it`],
      [172886, `Papa was a rolling stone,`],
      [174245, `Mama developed a habit`],
      [175658, `And it all happened too fast`],
      [177078, `for either one o us to grab it`],
      [178465, `I'm just sorry you were there`],
      [179870, `an had to witness it firsthand`],
      [181304, `'Cause all I ever wanted to do`],
      [182669, `was just make you proud`],
      [184025, `Now I'm sittin' in this`],
      [185275, `empty house just reminiscin'`],
      [187070, `Lookin' at your baby pictures,`],
      [188546, `it just trips me out`],
      [189473, `To see how much you both`],
      [190526, `have grown, it's almost like`],
      [191481, `you're sisters now`],
      [192969, `Wow, guess you pretty much are`],
      [194732, `and Daddy's still here`],
      [195851, `Lainie, I'm talkin' to you too`],
      [197500, `Daddy's still here`],
      [198829, `I like the sound of that, yeah`],
      [200125, `its got a ring to it, dont it?`],
      [201722, `Shh, Mama's only gone`],
      [203030, `for the moment`],
      [203962, `Now hush, little baby,`],
      [205482, `don't you cry`],
      [207053, `Everything's gonna be alright`],
      [208832, `Stiffen that upper lip up,`],
      [210235, `little lady, I told ya`],
      [211972, `Daddy's here to hold ya`],
      [213332, `through the night`],
      [214487, `I know Mommy's not here`],
      [215875, `right now and we dont know why`],
      [218281, `We feel how we feel inside`],
      [220129, `It may seem a little`],
      [221169, `crazy, pretty baby`],
      [223155, `But I promise Mama's`],
      [224627, `gon' be alright`],
      [225865, `And if you ask me to, Daddy's`],
      [227328, `gonna buy you a mockingbird`],
      [229718, `I'ma give you the world`],
      [231082, `I'ma buy a diamond ring`],
      [233000, `for you, I'ma sing for you`],
      [234532, `I'll do anything for you`],
      [236016, `to see you smile`],
      [237228, `And if that mockingbird don't`],
      [238843, `sing and that ring don't shine`],
      [240982, `I'ma break that birdie's neck`],
      [242699, `I'll go back to the`],
      [243868, `jeweler who sold it to ya`],
      [245633, `And make him eat every carat,`],
      [247342, `don't Fuck with Dad`],
      [248564, `(Haha)`],
    ],
  },
  {
    name: "The Neighborhood: Sweater Weather",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Neighboorhood_-_Sweater_Weather_(Hydr0.org).mp3",
    lyrics: [
      [20957, "And all I am is a man"],
      [24559, "I want the world in my hands"],
      [28200, "I hate the beach"],
      [30535, "But I stand in California"],
      [33901, "with my toes in the sand"],
      [36100, "Use the sleeves of my sweater"],
      [38119, "Let's have an adventure"],
      [40288, "Head in the clouds"],
      [41600, "but my gravity centered"],
      [44140, "Touch my neck"],
      [45844, "and I'll touch yours"],
      [47931, "You in those little"],
      [49358, "high waisted shorts, oh"],
      [52969, "She knows what I think about"],
      [55400, "And what I think about"],
      [56800, "One love, two mouths"],
      [58913, "One love, one house"],
      [60607, "No shirt, no blouse"],
      [62627, "Just us, you find out"],
      [64384, "Nothing that I wouldn't wanna"],
      [65400, "tell you about, no"],
      [67000, "'Cause it's too cold"],
      [71187, "For you here"],
      [73917, "And now, so let me hold"],
      [78878, "Both your hands in"],
      [81500, "the holes of my sweater"],
      [83666, "And if I may just take"],
      [84600, "your breath away"],
      [85633, "I don't mind if there's"],
      [86521, "not much to say"],
      [87546, "Sometimes the silence"],
      [88333, "guides a mind"],
      [89468, "To move to a place so far away"],
      [91969, "The goosebumps start to raise"],
      [93402, "The minute that my left hand"],
      [94222, "meets your waist"],
      [95900, "And then I watch your face"],
      [97300, "Put my finger on your tongue"],
      [98100, "'cause you love to taste, yeah"],
      [100053, "These hearts adore, everyone"],
      [101600, "the other beats hardest for"],
      [103200, "Inside this place is warm"],
      [105200, "Outside it starts to pour"],
      [107945, "Coming down"],
      [109001, "One love, two mouths"],
      [111128, "One love, one house"],
      [112974, "No shirt, no blouse"],
      [114827, "Just us, you find out"],
      [116573, "Nothing that I wouldn't wanna"],
      [117363, "tell you about, no, no, no"],
      [121456, "'Cause it's too cold"],
      [125367, "For you here"],
      [128136, "And now, so let me hold"],
      [133068, "Both your hands in"],
      [135730, "the holes of my sweater"],
      [137000, "'Cause it's too cold"],
      [141000, "For you here"],
      [143643, "And now, so let me hold"],
      [148544, "Both your hands in"],
      [151275, "the holes of my sweater"],
      [153503, "Whoa, whoa, whoa"],
      [166200, "Whoa, whoa, whoa"],
      [173900, "Whoa, whoa, whoa"],
      [181651, "Whoa, whoa, whoa"],
      [189360, "Whoa, whoa, whoa"],
      [197069, "Whoa, whoa, whoa"],
      [202500, "'Cause it's too cold"],
      [206658, "For you here"],
      [209372, "And now, so let me hold"],
      [214380, "Both your hands in"],
      [217034, "the holes of my sweater"],
      [218300, "It's too cold"],
      [222133, "For you here"],
      [224871, "And now, let me hold"],
      [229934, "Both your hands in"],
      [232466, "the holes of my sweater"],
      [235598, "And it's too cold,"],
      [237606, "it's too cold"],
      [240600, "The holes of my sweater"],
    ],
  },
  {
    name: "Eminem: Rap God",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Eminem%20-%20Rap%20God%20(Explicit)%20%5BXbGs_qK2PQA%5D.mp3",
    lyrics: [
      [869, `Look,`],
      [2000, `I was gonna go easy on`],
      [2700, `you not to hurt your feelings`],
      [4571, `But I'm only goin' to get`],
      [6729, `this one chance`],
      [9600, `Something's wrong,`],
      [10300, `I can feel it`],
      [11500, `Just a feelin' I've got, like`],
      [14400, `somethings about to happen`],
      [15885, `but I don't know what`],
      [17674, `If that means what`],
      [18369, `I think it means,`],
      [19215, `we're in trouble, big trouble`],
      [20924, `And if he is as bananas as you`],
      [21858, `say, I'm not takin any chances`],
      [24337, `ur just what the doc ordered`],
      [25692, `I'm beginnin' to feel`],
      [26904, `like a Rap God, Rap God`],
      [28870, `All my people from the front`],
      [30261, `to the back nod, back nod`],
      [32046, `Now, who thinks their arms are`],
      [33094, `long enough to slap box,`],
      [34805, `slap box?`],
      [35380, `They said I rap like a`],
      [36093, `robot, so call me Rap-bot`],
      [37624, `But for me to rap like a`],
      [38500, `computer it mus be in my genes`],
      [40059, `I got a laptop in`],
      [40805, `my back pocket`],
      [41681, `My pen'll go off when I`],
      [42496, `half-cock it, got a fat knot`],
      [43528, `from that rap profit`],
      [44915, `Made a livin' and a killin off`],
      [45748, `it, ever since Bill Clinton`],
      [46998, `was still in office`],
      [47873, `With Monica Lewinsky`],
      [48595, `feelin' on his nut sack`],
      [49858, `I'm an MC still as honest, but`],
      [51014, `as rude and as`],
      [51717, `indecent as all hell`],
      [52606, `Syllables, skill-a-holic`],
      [53804, `(kill 'em all with)`],
      [54442, `This flippity dippity-hippity`],
      [55162, `hip-hop, you dont really wanna`],
      [56254, `get into a pissin' match`],
      [57251, `With this rappity brat, packin`],
      [58105, `a MAC in the back of the Ac',`],
      [59491, `backpack rap crap,`],
      [60298, `yap-yap, yackety-yack`],
      [61261, `And at the exact same time, I`],
      [62058, `attempt these lyrical acrobat`],
      [63120, `stunts while im practicin that`],
      [64296, `I'll still be able to break a`],
      [65356, `Motherfucking table over the`],
      [66025, `back of a couple of Faggots and`],
      [66706, `crack it in half`],
      [67499, `Only realized it was ironic, I`],
      [68904, `was signed to aftermath`],
      [70283, `after the fact`],
      [71388, `How could I not blow?`],
      [72231, `All I do is drop F-bombs,`],
      [73299, `feel my wrath of attack`],
      [74203, `Rappers are havin' a rough`],
      [75074, `time period, here's a maxi pad`],
      [76666, `It's actually disastrously bad`],
      [78226, `for the wack while I'm`],
      [79000, `masterfully constructin' this`],
      [80222, `masterpiece`],
      [80944, `'Cause I'm beginnin' to feel`],
      [82017, `like a Rap God, Rap God`],
      [84032, `All my people from the front`],
      [85572, `to the back nod, back nod`],
      [87142, `Now, who thinks their arms are`],
      [88403, `long enough to slap box,`],
      [89586, `slap box?`],
      [90400, `Let me show u maintainin' this`],
      [91696, `shit aint that hard, that hard`],
      [93500, `Everybody want the key and the`],
      [94455, `secret to rap immortality`],
      [95700, `like I have got`],
      [96890, `Well, to be truthful the`],
      [97569, `blueprint's, simply rage and`],
      [98765, `youthful exuberance`],
      [99532, `Everybody loves to root for a`],
      [100600, `nuisance, hit the Earth`],
      [101500, `like an asteroid`],
      [102105, `Did nothin' but shoot for`],
      [103002, `the Moon since (pew)`],
      [104200, `MCs get taken to school with`],
      [105400, `this music 'cause I use it as`],
      [106600, `a vehicle to, "Bus the rhyme"`],
      [107898, `Now I lead a new school`],
      [108634, `full of students`],
      [109600, `Me? I'm a product of Rakim,`],
      [110984, `Lakim Shabazz, 2Pac, N.W.A,`],
      [113125, `Cube, hey Doc, Ren`],
      [114341, `Yella, Eazy, thank you,`],
      [115046, `they got Slim`],
      [115797, `Inspired enough to one day`],
      [117043, `grow up, blow up and`],
      [117859, `be in a position`],
      [119182, `To meet Run-D.M.C.,`],
      [120060, `and induct them into`],
      [120957, `the Motherfucking`],
      [121683, `Rock n Roll Hall of Fame even`],
      [123400, `though I'll walk in the church`],
      [124400, `and burst in a ball of flames`],
      [125700, `Only Hall of Fame I'll be`],
      [126600, `inducted in is the alcohol of`],
      [128108, `fame on the wall of (shame)`],
      [129769, `You fags think it's all a game`],
      [131300, `'til I walk a flock of flames`],
      [133169, `Off a plank and, tell me what`],
      [134400, `in the Fuck are you thinkin'?`],
      [135892, `Little gay lookin' boy,`],
      [136766, `so gay I can barely say it`],
      [138058, `with a straight face,`],
      [138700, `lookin' boy (haha)`],
      [139400, `You're witnessin' a mass-occur`],
      [140200, `like you're watchin' a church`],
      [140800, `gatherin' take place,`],
      [141826, `lookin' boy`],
      [142800, `"Oy vey, that boy's gay",`],
      [144300, `that's all they say,`],
      [145100, `lookin' boy`],
      [145750, `You get a thumbs up, pat on`],
      [146500, `the back and a way to go from`],
      [147600, `your label every day,`],
      [148400, `lookin' boy`],
      [149100, `Hey, lookin' boy,`],
      [149700, `what you say, lookin' boy?`],
      [150568, `I get a, hell yeah from Dre,`],
      [151600, `lookin' boy`],
      [152222, `I'ma work for everythin I have`],
      [153600, `never asked nobody for shit,`],
      [154569, `get outta my face, lookin' boy`],
      [155500, `Basically, boy, you're never`],
      [156217, `gonna be capable of keepin' up`],
      [157541, `with the same pace,`],
      [158120, `lookin' boy, 'cause`],
      [158926, `I'm beginnin' to feel`],
      [159869, `like a Rap God, Rap God`],
      [161833, `All my people from the front`],
      [163240, `to the back nod, back nod`],
      [164998, `The way I'm racin' around the`],
      [166100, `track, call me NASCAR, NASCAR`],
      [168353, `Dale Earnhardt of the trailer`],
      [169400, `park, the White Trash God`],
      [170735, `Kneel before General Zod,`],
      [172270, `this planet's Krypton,`],
      [173131, `no, Asgard, Asgard`],
      [174696, `So you'll be Thor,`],
      [175589, `and I'll be Odin, you rodent,`],
      [177098, `I'm omnipotent`],
      [178400, `Let off, then I'm reloadin',`],
      [179689, `immediately with these`],
      [180700, `bombs I'm totin'`],
      [181800, `And I should not be woken`],
      [183200, `I'm the walkin' dead,`],
      [183969, `but I'm just a talkin' head,`],
      [185300, `a zombie floatin', but I got`],
      [186900, `your mom deepthroating`],
      [188030, `I'm out my Ramen Noodle, we`],
      [189700, `have nothin' in common, poodle`],
      [191142, `I'm a Doberman,`],
      [191900, `pinch yourself in the arm`],
      [192947, `and pay homage, pupil`],
      [194603, `It's me, my honesty's brutal`],
      [196940, `But it's honestly futile if I`],
      [198600, `don't utilize what I do though`],
      [200054, `For good, at least`],
      [200844, `once in a while`],
      [201495, `So I wanna make sure somewhere`],
      [202500, `in this chicken scratch I`],
      [203200, `scribble and doodle`],
      [204052, `enough rhymes`],
      [204750, `To maybe try to help get some`],
      [205989, `people through tough times`],
      [207200, `But I gotta keep a few`],
      [207940, `punchlines just in case 'cause`],
      [209300, `even you unsigned`],
      [210200, `Rappers are hungry lookin'`],
      [211269, `at me like it's lunchtime`],
      [212800, `I know there was a time where`],
      [213727, `once I was king of`],
      [215000, `the underground`],
      [215569, `But I still rap like I'm`],
      [216269, `on my Pharoahe Monch grind`],
      [217600, `So I crunch rhymes, but`],
      [218652, `sometimes when you combine`],
      [220169, `Appeal with the`],
      [220700, `skin color of mine`],
      [221765, `You get too big and here they`],
      [222700, `come tryin' to censor`],
      [223700, `you like that one line`],
      [224800, `I said on, I'm back from`],
      [225959, `The Mathers LP 1 when`],
      [226969, `I tried to say I'll take seven`],
      [228500, `kids from Columbine`],
      [229996, `Put 'em all in a line, add an`],
      [230900, `AK-47, a revolver and a .9`],
      [233600, `See if I get away with it now`],
      [234729, `that I ain't as big as I was,`],
      [236100, `but I'm`],
      [236747, `Morphin' into an immortal,`],
      [238243, `comin' through the portal`],
      [239259, `You're stuck in a time`],
      [240150, `warp from 2004 though`],
      [241570, `And I don't know what the`],
      [242495, `Fuck that you rhyme for`],
      [243700, `You're pointless as Rapunzel`],
      [244801, `with Fuckin' cornrows`],
      [246500, `You write normal?`],
      [247159, `Fuck bein' normal`],
      [248300, `And I just bought a new`],
      [248822, `raygun from the future`],
      [250061, `Just to come and shoot u, like`],
      [251200, `when Fabolous made Ray J mad`],
      [252681, `'Cause Fab said he looked like`],
      [253570, `a fag at Mayweather's pad`],
      [254347, `singin' to a man while`],
      [255086, `he played piano`],
      [256200, `Man, oh man, that was a 24-7`],
      [257800, `special on the cable channel`],
      [259427, `So Ray J went straight to the`],
      [260300, `radio station, the very next`],
      [261500, `day, "Hey Fab, I'ma kill you"`],
      [263300, `Lyrics comin' at you at`],
      [263974, `supersonic speed`],
      [265269, `Uh, summa-lumma, dooma-lumma,`],
      [266400, `you assumin' I'm a human`],
      [267400, `What I gotta do to get it`],
      [268012, `through to you? I'm superhuman`],
      [268835, `Innovative and I'm made of`],
      [269800, `rubber so that anythin you say`],
      [270749, `is ricochetin' off of me, and`],
      [271540, `it'll glue to you and I'm`],
      [272192, `devastatin', more than ever`],
      [273013, `demonstratin', how to give a`],
      [273815, `Motherfuckin audience a feelin`],
      [274623, `like it's levitatin'`],
      [275527, `Never fadin' and I know the`],
      [276240, `haters are forever waitin' for`],
      [277200, `the day that they can say I`],
      [277880, `fell off, theyll be celebratin`],
      [278548, `Cause I know the way to get em`],
      [279345, `motivated, I make elevatin'`],
      [280300, `music, you make elevator music`],
      [282083, `"Oh, hes too mainstream", well`],
      [283404, `that's what they do when they`],
      [284300, `get jealous, they confuse it`],
      [285349, `"It's not hip-hop, it's pop"`],
      [286795, `'cause I found a`],
      [287479, `hella way to fuse it`],
      [288601, `With rock, shock rap with Doc,`],
      [290291, `throw on "Lose Yourself"`],
      [290983, `and make 'em lose it`],
      [291840, `I don't know how to make songs`],
      [292759, `like that, I don't know`],
      [293900, `what words to use`],
      [295000, `Let me know when it occurs to`],
      [295938, `you while I'm rippin' any one`],
      [296842, `of these verses that versus u`],
      [298032, `Its curtains, Im inadvertently`],
      [299001, `hurtin' you, how many`],
      [299832, `verses I gotta murder to`],
      [301169, `Prove that if you were half as`],
      [302346, `nice, your songs, you could`],
      [303364, `sacrifice virgins too?`],
      [304499, `Ugh, school flunky,`],
      [306139, `pill junkie, but look at the`],
      [307613, `accolades this skills brung me`],
      [309365, `Full of myself,`],
      [310078, `but still hungry`],
      [311300, `I bully myself 'cause I make`],
      [312340, `me do what I put my mind to`],
      [314000, `And I'm a million leagues`],
      [315700, `above you, ill when I`],
      [316963, `speak in tongues`],
      [317690, `But it's still`],
      [318405, `tongue-in-cheek, Fuck you`],
      [319299, `I'm drunk, so, Satan, take the`],
      [321000, `Fucking wheel, I'ma sleep`],
      [322100, `in the front seat`],
      [322800, `Bumpin' Heavy D and the Boyz,`],
      [324213, `still "Chunky but Funky"`],
      [326081, `But in my head`],
      [326818, `there's somethin' I can feel`],
      [327900, `tuggin' and strugglin'`],
      [329252, `Angels fight with devils and`],
      [330867, `here's what they want from me`],
      [332900, `They're askin' me to eliminate`],
      [333900, `some of the women hate`],
      [334700, `But if you take into`],
      [335400, `consideration the bitter`],
      [336213, `hatred I have, then you may be`],
      [337300, `a little patient, and more`],
      [338115, `sympathetic to the situation`],
      [339588, `And understand the`],
      [340207, `discrimination`],
      [341700, `But Fuck it, life's handin you`],
      [343240, `lemons? Make lemonade then`],
      [344500, `But if I cant batter the women`],
      [346000, `How the Fuck am I supposed`],
      [346834, `to bake 'em a cake, then?`],
      [348300, `Don't mistake him for Satan`],
      [349285, `It's a fatal mistake if you`],
      [350269, `think I need to be overseas`],
      [351533, `and take a vacation`],
      [352717, `To trip a broad, and make`],
      [353800, `her fall on her face and`],
      [355148, `Don't be a retard, be a king?`],
      [356976, `Think not, why be a king`],
      [359100, `when you can be a God?`],
    ],
  },
  {
    name: "The Kid Laroi: Stay",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The%20Kid%20LAROI,%20Justin%20Bieber%20-%20STAY%20(Official%20Video)%20%5BkTJczUoc26U%5D.mp3",
    lyrics: [
      [30600, "I do the same"],
      [31500, "thing I told you that"],
      [32399, "I never would"],
      [33325, "I told you I'd change,"],
      [34347, "even when I knew I never could"],
      [36018, "I know that I can't"],
      [37133, "find nobody else as good as u"],
      [38797, "I need you to stay,"],
      [39822, "need you to stay, hey (oh)"],
      [42100, "I get drunk,"],
      [42869, "wake up,"],
      [43755, "I'm wasted still"],
      [44922, "I realize the time"],
      [46235, "that I wasted here"],
      [47700, "I feel like"],
      [48511, "you can't feel the way I feel"],
      [50479, "Oh, I'll be Fucked up"],
      [51699, "if you can't be right here"],
      [53128, "Oh, ooh-woah"],
      [54500, "(oh, ooh-woah, ooh-woah)"],
      [55948, "Oh, ooh-woah"],
      [57416, "(oh, ooh-woah, ooh-woah)"],
      [58774, "Oh, ooh-woah"],
      [59900, "(oh, ooh-woah, ooh-woah)"],
      [61387, "Oh, I'll be Fucked up"],
      [62959, "if you can't be right here"],
      [64384, "I do the same"],
      [65500, "thing I told you that"],
      [66141, "I never would"],
      [67188, "I told you I'd change,"],
      [68218, "even when I knew I never could"],
      [69909, "I know that I can't"],
      [70925, "find nobody else as good as u"],
      [72730, "I need you to stay,"],
      [73869, "need you to stay, hey"],
      [75800, "I do the same"],
      [76800, "thing I told you that"],
      [77600, "I never would"],
      [78467, "I told you I'd change,"],
      [79539, "even when I knew I never could"],
      [81217, "I know that I can't"],
      [82353, "find nobody else as good as u"],
      [84004, "I need you to stay,"],
      [85260, "need you to stay, hey"],
      [87106, "When I'm away from you,"],
      [88438, "I miss your touch (ooh)"],
      [90057, "You're the reason"],
      [90762, "I believe in love"],
      [92876, "It's been difficult"],
      [93817, "for me to trust (ooh)"],
      [95653, "And I'm afraid that"],
      [96320, "I'ma Fuck it up"],
      [98560, "Ain't no way"],
      [99133, "that I can leave you stranded"],
      [101364, "'Cause you ain't ever"],
      [102100, "left me empty-handed"],
      [104129, "And you know that I know that"],
      [105810, "I can't live without you"],
      [107823, "So, baby, stay"],
      [109657, "Oh, ooh-woah"],
      [111013, "(oh, ooh-woah, ooh-woah)"],
      [112382, "Oh, ooh-woah"],
      [113799, "(oh, ooh-woah, ooh-woah)"],
      [115300, "Oh, ooh-woah"],
      [116585, "(oh, ooh-woah, ooh-woah)"],
      [117900, "I'll be Fucked up"],
      [119500, "if you can't be right here"],
      [120900, "I do the same"],
      [121900, "thing I told you that"],
      [122800, "I never would"],
      [123535, "I told you I'd change,"],
      [124625, "even when I knew I never could"],
      [126351, "I know that I can't"],
      [127624, "find nobody else as good as u"],
      [129142, "I need you to stay,"],
      [130318, "need you to stay, hey"],
      [132319, "I do the same"],
      [133150, "thing I told you that"],
      [134000, "I never would"],
      [134775, "I told you I'd change,"],
      [135978, "even when I knew I never could"],
      [137614, "I know that I can't"],
      [138753, "find nobody else as good as u"],
      [140407, "I need you to stay,"],
      [141500, "need you to stay, hey"],
      [148700, "Woah-oh"],
      [151991, "I need you to stay,"],
      [152856, "need you to stay, hey"],
    ],
  },
  {
    name: "The Weeknd: Blinding Lights",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Weekend_-_Blinding_lights_(Hydr0.org).mp3",
    lyrics: [
      [13769, "Yeah"],
      [27492, "I've been tryna call"],
      [30043, "I've been on my own"],
      [31269, "for long enough"],
      [32800, "Maybe you can show me"],
      [34169, "how to love, maybe"],
      [38547, "I'm goin' through withdrawals"],
      [41241, "You don't even have"],
      [42242, "to do too much"],
      [44119, "You can turn me on"],
      [45082, "with just a touch, baby"],
      [49691, "I look around and"],
      [50693, "Sin City's cold and empty"],
      [53121, "(oh)"],
      [53705, "No one's around to judge me"],
      [55880, "(oh)"],
      [56304, "I can't see clearly"],
      [57923, "when you're gone"],
      [60842, "I said, ooh,"],
      [63645, "I'm blinded by the lights"],
      [66841, "No, I can't sleep until"],
      [68631, "I feel your touch"],
      [72172, "I said, ooh,"],
      [75230, "I'm drowning in the night"],
      [78004, "Oh, when I'm like this,"],
      [79852, "you're the one I trust"],
      [82123, "(Hey, hey, hey)"],
      [94469, "I'm running out of time"],
      [97366, "'Cause I can see the"],
      [98220, "sun light up the sky"],
      [100225, "So I hit the road"],
      [101202, "in overdrive, baby, oh"],
      [107000, "The city's cold and empty"],
      [109269, "(oh)"],
      [109807, "No one's around to judge me"],
      [111900, "(oh)"],
      [112512, "I can't see clearly"],
      [114015, "when you're gone"],
      [117000, "I said, ooh,"],
      [120076, "I'm blinded by the lights"],
      [122981, "No, I can't sleep until"],
      [124924, "I feel your touch"],
      [128169, "I said, ooh,"],
      [131200, "I'm drowning in the night"],
      [134146, "Oh, when I'm like this,"],
      [136011, "you're the one I trust"],
      [139600, "I'm just walking by to"],
      [140696, "let you know"],
      [141769, "(by to let you know)"],
      [142300, "I could never say it"],
      [143354, "on the phone"],
      [144489, "(say it on the phone)"],
      [145500, "Will never let you"],
      [147000, "go this time"],
      [150014, "(ooh)"],
      [150696, "I said, ooh,"],
      [153888, "I'm blinded by the lights"],
      [156600, "No, I can't sleep until"],
      [158606, "I feel your touch"],
      [161000, "(Hey, hey, hey)"],
      [172000, "(Hey, hey, hey)"],
      [184369, "I said, ooh,"],
      [187500, "I'm blinded by the lights"],
      [190269, "No, I can't sleep until"],
      [192304, "I feel your touch"],
    ],
  },
  {
    name: "The Walters: I Love You So",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Walters_-_I_Love_You_So_(Hydr0.org).mp3",
    lyrics: [
      [1250, "I just need someone in my life"],
      [3969, "to give it structure"],
      [7200, "To handle all the selfish ways"],
      [9369, "I'd spend my time without her"],
      [13600, "You're everything I want,"],
      [14953, "but I can't deal"],
      [16533, "with all your lovers"],
      [20151, "You're saying I'm the one,"],
      [21507, "but it's your actions"],
      [23234, "that speak louder"],
      [26700, "Giving me love when you are"],
      [28854, "down and need another"],
      [32722, "I've gotta get away an"],
      [34300, "let you go, Ive gotta get over"],
      [38915, "But I love you so"],
      [42756, "(ooh-ooh-ooh)"],
      [45312, "I love you so (ooh-ooh-ooh)"],
      [51631, "I love you so (ooh-ooh-ooh)"],
      [57929, "I love you so"],
      [62500, "I'm gonna pack my things"],
      [65933, "and leave you behind"],
      [68850, "This feeling's old,"],
      [70642, "and I know that"],
      [72567, "I've made up my mind"],
      [75079, "I hope you feel what I felt"],
      [78529, "when you shattered my soul"],
      [81332, "'Cause you were cruel,"],
      [83000, "and I'm a fool,"],
      [85000, "so please, let me go"],
      [89569, "But I love you so"],
      [92745, "(please, let me go)"],
      [95978, "I love you so"],
      [99107, "(please, let me go)"],
      [102223, "I love you so"],
      [106295, "(please, let me go)"],
      [108659, "I love you so"],
      [118169, "Ooh-ooh-ooh"],
      [124500, "Ooh-ooh-ooh-ooh"],
      [130696, "Ooh-ooh-ooh"],
      [137195, "Ooh-ooh-ooh-ooh"],
    ],
  },
  {
    name: "Edward Maya, ft. Vika Jigulina: Stereo Hearts",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Edward_Maya_ft._Vika_Jigulina_-_Stereo_love_(Hydr0.org).mp3",
    lyrics: [
      [4200, "When you gonna stop"],
      [5770, "breaking my heart?"],
      [11700, "I don't wanna be another one"],
      [19300, "Paying for the"],
      [20400, "things I never done"],
      [25969, "Don't let go,"],
      [27573, "don't let go to my love"],
      [49300, "I think I found the one"],
      [51007, "that'll hold my heart"],
      [56869, "I wanna feel your heart,"],
      [58686, "we're in love tonight"],
      [60500, "I can fix all those lies"],
      [62860, "Oh baby, baby, I run,"],
      [64568, "but I'm running to you"],
      [66696, "You won't see me cry,"],
      [68569, "I'm hiding inside"],
      [70373, "My heart is in pain,"],
      [72111, "but I'm smiling for you"],
      [76000, "Can I get to your soul?"],
      [77777, "Can you get to my flow?"],
      [79696, "Can we promise we wont let go?"],
      [83500, "All the things that I need,"],
      [85469, "all the things that you need"],
      [87168, "You can make it feel so real"],
      [91022, "'Cause you can't deny,"],
      [92708, "you've blown my mind"],
      [94637, "When I touch your body,"],
      [96430, "I feel I'm losing control"],
      [98358, "'Cause you can't deny,"],
      [100096, "you've blown my mind"],
      [102162, "When I see you baby,"],
      [103906, "I just don't wanna let go"],
      [106752, "(Oohh)"],
      [109942, "When you gonna stop"],
      [111609, "breaking my heart?"],
      [117469, "I don't wanna be another one"],
      [139966, "I think I found the one"],
      [141800, "that'll hold my heart"],
      [147606, "I wanna feel your heart,"],
      [149379, "we're in love tonight"],
      [151169, "I can fix all those lies"],
      [153526, "Oh baby, baby, I run,"],
      [155288, "but I'm running to you"],
      [157479, "You won't see me cry,"],
      [159310, "I'm hiding inside"],
      [161190, "My heart is in pain,"],
      [162868, "but I'm smiling for you"],
      [165000, "Oh baby, I'll try"],
      [166755, "to make the things right"],
      [168688, "I need you more than air"],
      [170305, "when I'm not with you"],
      [172653, "Please don't ask me why,"],
      [174385, "just kiss me this time"],
      [176300, "My only dream"],
      [178000, "is about you and I"],
    ],
  },
  {
    name: "Yung Kai: Blue",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/yung_kai_-_yung_kai_-_blue_Official_Music_Video_(Hydr0.org).mp3",
    lyrics: [
      [19318, "Your morning eyes,"],
      [21690, "I could stare"],
      [22958, "like watching stars"],
      [26200, "I could walk you by,"],
      [29696, "and Ill tell without a thought"],
      [32416, "You'd be mine,"],
      [34571, "would you mind"],
      [36518, "if I took your hand tonight?"],
      [40574, "Know you're all"],
      [41864, "that I want this life"],
      [48134, "I'll imagine we fell in love"],
      [50879, "I'll nap under"],
      [51726, "moonlight skies with you"],
      [54768, "I think I'll picture us,"],
      [56408, "you with the waves"],
      [58250, "The ocean's colors"],
      [60042, "on your face"],
      [61898, "I'll leave my heart"],
      [63676, "with your air"],
      [66316, "So let me fly with you"],
      [69469, "Will you be forever with me?"],
      [107151, "My love will always"],
      [109128, "stay by you"],
      [112900, "I'll keep it safe,"],
      [115200, "so don't you worry a thing"],
      [117969, "I'll tell you I love you more"],
      [121831, "It's stuck with you forever,"],
      [125319, "so promise you won't let it go"],
      [128498, "I'll trust the universe"],
      [130962, "will always bring me to you"],
      [136721, "I'll imagine we fell in love"],
      [139397, "I'll nap under"],
      [140288, "moonlight skies with you"],
      [143052, "I think I'll picture us,"],
      [145012, "you with the waves"],
      [146847, "The ocean's colors"],
      [148625, "on your face"],
      [150609, "I'll leave my heart"],
      [152350, "with your air"],
      [154900, "So let me fly with you"],
      [158400, "Will you be forever with me?"],
    ],
  },
  {
    name: "Lil Nas X: Industry Baby",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Lil_Nas_X_Jack_Harlow_-_INDUSTRY_BABY_(Hydr0.org).mp3",
    lyrics: [
      [4596, `D-D-Daytrip took it to ten`],
      [5869, `(hey!)`],
      [6764, `Baby back, ayy,`],
      [8203, `couple racks, ayy`],
      [9792, `Couple Grammys on him`],
      [11426, `Couple plaques, ayy`],
      [13125, `That's a fact, ayy`],
      [14795, `Throw it back, ayy,`],
      [16246, `throw it back, ayy`],
      [17876, `And this one is`],
      [18712, `for the champions`],
      [21139, `I ain't lost since I began,`],
      [23400, `yeah`],
      [24000, `Funny how you said it`],
      [24880, `was the end, yeah`],
      [27360, `Then I went did it again, yeah`],
      [30624, `I told you long ago`],
      [32965, `on the road`],
      [34156, `I got what they waiting for`],
      [36994, `I don't run from nothing, dawg`],
      [39463, `Get your soldiers,`],
      [40686, `tell 'em I ain't laying low`],
      [43555, `You was never really`],
      [44553, `rooting for me anyway`],
      [46808, `When I'm back up at the top,`],
      [48011, `I wanna hear you say`],
      [49870, `He dont run from nothing, dawg`],
      [52281, `Get your soldiers,`],
      [53501, `tell em that the break is over`],
      [56079, `(uh)`],
      [56300, `Need to, uh,`],
      [57200, `need to get this album done`],
      [58537, `Need a couple number ones`],
      [60113, `Need a plaque on every song`],
      [61816, `Need me like one`],
      [62574, `with Nicki now`],
      [63406, `Tell a rap Nigga`],
      [64142, `I don't see ya (hah)`],
      [64968, `I'm a pop Nigga`],
      [65685, `like Bieber (hah)`],
      [66548, `I don't Fuck Bitches,`],
      [67286, `I'm queer (hah)`],
      [68160, `But these Niggas`],
      [68780, `Bitches like Madea,`],
      [69367, `yeah, yeah, yeah, ayy`],
      [71580, `Oh, let do it`],
      [73089, `I ain't fall off,`],
      [73765, `I jus aint release my new Shit`],
      [76252, `I blew up,`],
      [76887, `now everybody tryna sue me`],
      [79368, `You call me Nas,`],
      [80182, `but the hood call me Doobie`],
      [82062, `And this one is`],
      [82700, `for the champions`],
      [85085, `I ain't lost since I began,`],
      [87400, `yeah`],
      [88000, `Funny how you said`],
      [88767, `it was the end, yeah`],
      [91362, `Then I went did it again, yeah`],
      [94618, `I told you long ago`],
      [96972, `on the road`],
      [98241, `I got what they waiting for`],
      [101235, `I don't run from nothing, dawg`],
      [103400, `Get your soldiers,`],
      [104592, `tell 'em I ain't laying low`],
      [107666, `You was never really`],
      [108696, `rooting for me anyway`],
      [110213, `(ooh, ooh)`],
      [110783, `When I'm back up at the top,`],
      [111949, `I wanna hear you say`],
      [113300, `(ooh, ooh)`],
      [113916, `He dont run from nothing, dawg`],
      [116107, `Get your soldiers,`],
      [117319, `tell em that the break is over`],
      [121000, `(yeah)`],
      [121890, `My track record so clean,`],
      [123869, `they couldn't wait`],
      [124644, `to just bash me`],
      [125479, `I must be getting too flashy,`],
      [126896, `y'all shouldn't have`],
      [127525, `let the world gas me (woo)`],
      [128492, `It's too late 'cause`],
      [129446, `I'm here to stay and`],
      [130211, `these girls know that Im nasty`],
      [131300, `(mm)`],
      [131900, `I sent her back to`],
      [132696, `her boyfriend with`],
      [133284, `my handprint on her ass cheek`],
      [136308, `City talking, we taking notes`],
      [137966, `Tell 'em all to`],
      [138581, `keep making posts`],
      [139478, `Wish he could,`],
      [140033, `but he can't get close`],
      [141049, `OG so proud of me that he`],
      [142554, `choking up while`],
      [143487, `he making toasts`],
      [144463, `I'm the type that`],
      [145076, `you can't control,`],
      [145796, `said I would then I made it so`],
      [147969, `I don't clear up rumors (ayy),`],
      [149612, `where's y'all sense of humor?`],
      [150777, `(Ayy)`],
      [151169, `I'm done making jokes 'cause`],
      [152300, `they got old like baby boomers`],
      [153971, `Turned my haters to consumers,`],
      [155444, `I make vets feel`],
      [156100, `like they juniors (juniors)`],
      [156969, `Say your time is coming soon,`],
      [158497, `but just like Oklahoma (mm)`],
      [160800, `Mine is coming sooner (mm),`],
      [162400, `I'm just a late bloomer (mm)`],
      [164000, `I didn't peak in high school,`],
      [164985, `I'm still out here`],
      [165800, `getting cuter (woo)`],
      [167164, `All these social`],
      [167767, `networks and computers`],
      [168965, `Got these pussies walking`],
      [170169, `'round like they ain't losers`],
      [171505, `I told you long ago`],
      [173712, `on the road`],
      [174991, `I got what they waiting for`],
      [176700, `(I got what they waiting for)`],
      [178109, `I don't run from nothing, dawg`],
      [180227, `Get your soldiers,`],
      [181498, `tell 'em I ain't laying low`],
      [184098, `You was never really`],
      [185307, `rooting for me anyway`],
      [186666, `(ooh, ooh)`],
      [187458, `When I'm back up at the top,`],
      [188718, `I wanna hear you say`],
      [189696, `(ooh, ooh)`],
      [190326, `He dont run from nothing, dawg`],
      [193013, `Get your soldiers,`],
      [194304, `tell em that the break is over`],
      [198000, `(yeah)`],
      [202444, `I'm the industry baby, mmm`],
      [204555, `(yeah)`],
      [208888, `I'm the industry baby (yeah)`],
    ],
  },
  {
    name: "Powfu: Death Bed",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Powfu_beabadoobee_-_death_bed_coffee_for_your_head_(Hydr0.org).mp3",
    lyrics: [
      [100, "Don't stay awake for too long"],
      [3191, "Don't go to bed"],
      [5514, "I'll make a cup of coffee"],
      [7158, "for your head"],
      [8867, "I'll get you up and going"],
      [10537, "out of bed"],
      [12069, "Yeah, I dont wanna fall asleep"],
      [14395, "I don't wanna pass away"],
      [16132, "I've been thinking"],
      [16964, "of our future"],
      [17819, "Cause Ill never see those days"],
      [19581, "I don't know why"],
      [20300, "this has happened,"],
      [21169, "but I probably deserve it"],
      [22700, "I tried to do my best,"],
      [24216, "but you know that"],
      [25214, "I'm not perfect"],
      [26354, "I've been praying"],
      [27097, "for forgiveness,"],
      [27931, "you've been praying"],
      [28628, "for my health"],
      [29500, "When I leave this earth,"],
      [30829, "hoping youll find someone else"],
      [32706, "Cause, yeah, were still young,"],
      [34232, "theres so much we haven't done"],
      [36175, "Getting married,"],
      [36843, "start a family,"],
      [37767, "watch your husband"],
      [38491, "with his son"],
      [39544, "I wish it could be me,"],
      [41012, "but I wont make it of this bed"],
      [42648, "I hope I go to heaven,"],
      [44284, "so I see you once again"],
      [46446, "My life was kindda short,"],
      [47660, "but I got so many blessings"],
      [49825, "Happy you were mine,"],
      [50969, "it sucks that it's all ending"],
      [53399, "Don't stay awake for too long"],
      [56507, "Don't go to bed"],
      [58893, "I'll make a cup of coffee"],
      [60529, "for your head"],
      [62299, "I'll get you up and going"],
      [63875, "out of bed, yeah"],
    ],
  },
  {
    name: "Ed Sheeran: Shape Of You",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Ed_Sheeran_-_Shape_of_You_(Hydr0.org).mp3",
    lyrics: [
      [9932, "The club isn't the"],
      [10541, "best place to find a lover"],
      [11993, "So the bar is where I go"],
      [14804, "Me and my friends at"],
      [15739, "the table doing shots"],
      [16766, "Drinking fast and then"],
      [17807, "we talk slow"],
      [19811, "Come over and start up"],
      [20705, "a conversation with just me"],
      [22328, "And trust me I'll"],
      [23023, "give it a chance now"],
      [24491, "Take my hand, stop,"],
      [25571, "put Van the Man on the jukebox"],
      [27131, "And then we start to dance,"],
      [28640, "and now I'm singing like"],
      [29671, "Girl, you know"],
      [30587, "I want your love"],
      [32163, "Your love was handmade"],
      [33297, "for somebody like me"],
      [35444, "Come on now, follow my lead"],
      [37227, "I may be crazy, don't mind me"],
      [39364, "Say, boy, let's"],
      [40271, "not talk too much"],
      [42178, "Grab on my waist"],
      [43064, "and put that body on me"],
      [45319, "Come on now, follow my lead"],
      [46864, "Come, come on now,"],
      [47705, "follow my lead"],
      [50638, "I'm in love with"],
      [51332, "the shape of you"],
      [53147, "We push and pull"],
      [53804, "like a magnet do"],
      [55774, "Although my heart"],
      [56427, "is falling too"],
      [58193, "I'm in love with your body"],
      [60855, "And last night you"],
      [61509, "were in my room"],
      [63160, "And now my bedsheets"],
      [63980, "smell like you"],
      [65010, "Every day discovering"],
      [66300, "something brand new"],
      [68273, "I'm in love with your body"],
    ],
  },
  {
    name: "Blacklite District: Wishing Dead",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Blacklite%20District%20-%20Wishing%20Dead%20(Official%20Music%20Video).mp3",
    lyrics: [
      [12570, "Let it go"],
      [13620, "You should wait and see"],
      [15620, "'Cause you never know"],
      [16840, "Where you're gonna be"],
      [18660, "You should take it slow"],
      [20270, "Let's not jump ahead"],
      [21790, "You could watch it grow"],
      [23680, "Instead of wishing dead"],
      [25000, "Let-let, let it go"],
      [26000, "You should wait and see"],
      [28000, "'Cause you never know"],
      [30000, "Where you're gonna be"],
      [31000, "You should take it slow"],
      [33000, "Let's not jump ahead"],
      [34800, "You could watch it grow"],
      [35900, "Instead of wishing dead"],
    ],
  },
  {
    name: "Chris Grey: Let The World Burn",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Chris%20Grey%20-%20LET%20THE%20WORLD%20BURN%20(Official%20Lyric%20Video)%20(1).mp3",
    lyrics: [
      [5210, "Lost in the fog"],
      [8520, "I fear that there's still"],
      [8550, "Further to fall"],
      [13680, "It's dangerous 'cause"],
      [13710, "I want it all"],
      [19170, "And I don't think I care"],
      [19200, "What it costs"],
      [24270, "I shouldn't have fallen"],
      [24300, "In love"],
      [27170, "Look what it made me"],
      [27200, "Become"],
      [29500, "I let you get too close"],
      [31240, "Just to wake up alone"],
      [44960, "I'd let the world burn"],
      [47720, "Let the world burn for you"],
      [50640, "This is how it always had"],
      [50670, "To end"],
      [53260, "If I can't have you then"],
      [53290, "No one can"],
      [55910, "I'd let it burn"],
    ],
  },
  {
    name: "Blacklite District: Back Into Darkness",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Blacklite%20District%20-%20Back%20into%20Darkness%20(2).mp3",
    lyrics: [
      [13290, "You give and you give"],
      [14000, "Just to get there and fall"],
      [16420, "You take and you take"],
      [18000, "And for nothing at all"],
      [19440, "You run and you run"],
      [21000, "Straight into the wall"],
      [51380, "You fall"],
      [53000, "Back into darkness again"],
      [54850, "Realize you can only"],
      [56500, "Wish it's pretend"],
      [57820, "No lie"],
      [59000, "You're in it deep this time"],
      [60200, "My friend"],
    ],
  },
  {
    name: "2hollis: Poster Boy",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/2hollis%20-%20poster%20boy%20(official%20audio).mp3",
    lyrics: [
      [35640, "Trash the ploy"],
      [36200, "Turn myself into a poster boy"],
      [39630, "L-l-live by the sword"],
      [41100, "Make myself turn two to four"],
      [44080, "I-i-i know you want it"],
      [46100, "Oh you Fucking got it"],
      [47920, "Running away"],
      [51140, "i-i-i-i'm running 'round"],
      [52200, "Push it down"],
      [53420, "Fuck, you think we going out?"],
      [55530, "You so wrong, you so dumb"],
      [57710, "We take our time"],
      [58200, "We don't rush"],
      [60840, "Y-y-y-you drive me-"],
      [61300, "Drive me- drive me crazy"],
      [65080, "What would it take"],
      [66350, "To call you my baby"],
    ],
  },
  {
    name: "Atba' al namrood",
    url: "https://github.com/Phalynxi/moosic/raw/refs/heads/main/Al-Namrood%20-%20Atba'a%20Al-Namrood_%D8%A3%D8%AA%D8%A8%D8%A7%D8%B9%20%D8%A7%D9%84%D9%86%D9%85%D8%B1%D9%88%D8%AF%20%5BgtOYL4cqg2A%5D.mp3",
    lyrics: [
      [0, "Twisted minds do not believe in words"],
      [7250, "Shattered souls suffer from a limited view"],
      [14500, "Death is coming and bridge of failure faded"],
      [21750, "It has no end, the results of war and blood"],
      [29000, "He has sold his soul for power and governance"],
      [36250, "Where is the Exit?"],
      [43500, "But the fear of death does not hide your destiny"],
    ],
  },
  {
    name: "Metallica: Master of Puppets",
    url: "https://www.youtube.com/watch?v=uRyAIyq53FY",
    lyrics: [
      [60800, `End of passion play,`],
      [61600, `crumbling away`],
      [65000, `I’m your source of`],
      [66000, `self-destruction`],
      [69200, `Veins that pump with fear,`],
      [70000, `sucking darkest clear`],
      [73600, `Leading on your death’s`],
      [74600, `construction`],
      [77800, `Taste me you will see`],
      [80100, `More is all you need`],
      [82100, `You’re dedicated to`],
      [84300, `How I’m killing you`],
      [90400, `Come crawling faster`],
      [95200, `Obey your master`],
      [99800, `Your life burns faster`],
      [104300, `Obey your master`],
      [106900, `Master`],
      [108100, `Master of puppets`],
      [108900, `I’m pulling your strings`],
      [111100, `Twisting your mind`],
      [111900, `and smashing your dreams`],
      [115000, `Blinded by me,`],
      [115800, `you can’t see a thing`],
      [118700, `Just call my name,`],
      [119500, `’cause I’ll hear you scream`],
      [122000, `Master`],
      [123100, `Master`],
      [124200, `Just call my name,`],
      [125000, `’cause I’ll hear you scream`],
      [128100, `Master`],
      [129300, `Master`],
      [140700, `Needlework the way,`],
      [141500, `never you betray`],
      [144900, `Life of death becoming`],
      [145900, `clearer`],
      [149300, `Pain monopoly,`],
      [150100, `ritual misery`],
      [153400, `Chop your breakfast on a`],
      [154400, `mirror`],
      [157700, `Taste me you will see`],
      [160000, `More is all you need`],
      [161900, `You’re dedicated to`],
      [164200, `How I’m killing you`],
      [170400, `Come crawling faster`],
      [175100, `Obey your master`],
      [179800, `Your life burns faster`],
      [184500, `Obey your master`],
      [187000, `Master`],
      [188100, `Master of puppets`],
      [188900, `I’m pulling your strings`],
      [192100, `Twisting your mind`],
      [192900, `and smashing your dreams`],
      [196100, `Blinded by me,`],
      [196900, `you can’t see a thing`],
      [198900, `Just call my name,`],
      [199700, `’cause I’ll hear you scream`],
      [202400, `Master`],
      [203400, `Master`],
      [204600, `Just call my name,`],
      [205400, `’cause I’ll hear you scream`],
      [208500, `Master`],
      [209700, `Master`],
      [211100, `Master, master`],
      [320100, `Master`],
      [321200, `Master`],
      [322300, `Where’s the dreams`],
      [323100, `that I’ve been after?`],
      [324800, `Master, master`],
      [326900, `You promised only lies`],
      [329200, `Laughter, laughter`],
      [330000, `All I hear or see`],
      [330800, `is laughter`],
      [333900, `Laughter, laughter`],
      [336100, `Laughing at my cries`],
      [341800, `Fix me`],
      [409000, `Hell is worth all that,`],
      [409800, `natural habitat`],
      [413200, `Just a rhyme`],
      [414000, `without a reason`],
      [417400, `Never-ending maze,`],
      [418200, `drift on numbered days`],
      [421700, `Now your life`],
      [422500, `is out of season`],
      [425900, `I will occupy`],
      [428100, `I will help you die`],
      [430200, `I will run through you`],
      [432400, `Now I rule you too`],
      [438600, `Come crawling faster`],
      [443100, `Obey your master`],
      [447600, `Your life burns faster`],
      [452200, `Obey your master`],
      [454600, `Master`],
      [455700, `Master of puppets`],
      [456500, `I’m pulling your strings`],
      [459800, `Twisting your mind`],
      [460600, `and smashing your dreams`],
      [463700, `Blinded by me,`],
      [464500, `you can’t see a thing`],
      [466500, `Just call my name,`],
      [467300, `’cause I’ll hear you scream`],
      [469800, `Master`],
      [471000, `Master`],
      [472100, `Just call my name,`],
      [472900, `’cause I’ll hear you scream`],
      [475900, `Master`],
      [477100, `Master`],
    ],
  },
  {
    name: "Disturbed: Down with the Sickness",
    url: "https://www.youtube.com/watch?v=09LTT0xwdfw",
    lyrics: [
      [4500, `Can you feel that?`],
      [9800, `Ah, shit`],
      [20700, `Oh, ah, ah, ah, ah`],
      [31300, `Oh, ah, ah, ah, ah`],
      [34200, `oh, oh, oh, oh, oh, oh`],
      [42900, `Drowning deep in my sea`],
      [43900, `of loathing`],
      [48300, `Broken your servant I kneel`],
      [52600, `(Will you give in to me?)`],
      [53900, `It seems what's left of`],
      [54900, `my human side`],
      [58100, `Is slowly changing in me`],
      [63400, `(Will you give in to me?)`],
      [64700, `Looking at my own reflection`],
      [68100, `When suddenly it changes`],
      [71000, `Violently it changes (oh no)`],
      [75000, `There is no turning back now`],
      [78700, `You've woken up the`],
      [79700, `demon in me`],
      [85900, `Get up, come on get down`],
      [86900, `with the sickness`],
      [88600, `Get up, come on get down`],
      [89600, `with the sickness`],
      [91300, `Get up, come on get down`],
      [92300, `with the sickness`],
      [93700, `Open up your hate, and`],
      [94700, `let it flow into me`],
      [96600, `Get up, come on get down`],
      [97600, `with the sickness`],
      [99000, `You mother get up come on`],
      [100000, `get down with the sickness`],
      [101700, `You fucker get up come on`],
      [102700, `get down with the sickness`],
      [104500, `Madness is the gift, that`],
      [105500, `has been given to me`],
      [112400, `I can see inside you,`],
      [113400, `the sickness is rising`],
      [117400, `Don't try to deny what`],
      [118400, `you feel`],
      [122000, `(Will you give in to me?)`],
      [123300, `It seems that all that`],
      [124300, `was good has died`],
      [127500, `And is decaying in me`],
      [132800, `(Will you give in to me?)`],
      [134000, `It seems you're having`],
      [135000, `some trouble`],
      [137300, `In dealing with these`],
      [138300, `changes`],
      [140200, `Living with these`],
      [141200, `changes (oh no)`],
      [144200, `The world is a scary place`],
      [147400, `Now that you've woken up`],
      [148400, `the demon in me`],
      [155400, `Get up, come on get down`],
      [156400, `with the sickness`],
      [157900, `Get up, come on get down`],
      [158900, `with the sickness`],
      [160600, `Get up, come on get down`],
      [161600, `with the sickness`],
      [163100, `Open up your hate, and`],
      [164100, `let it flow into me`],
      [165900, `Get up, come on get down`],
      [166900, `with the sickness`],
      [168200, `You mother get up come on`],
      [169200, `get down with the sickness`],
      [171000, `You fucker get up come on`],
      [172000, `get down with the sickness`],
      [173700, `Madness is the gift, that`],
      [174700, `has been given to me`],
      [180600, `(And when I dream)`],
      [186000, `(And when I dream)`],
      [191500, `Oh, ah, ah, ah, ah`],
      [192700, `Get up, come on get down`],
      [193700, `with the sickness`],
      [195400, `Get up, come on get down`],
      [196400, `with the sickness`],
      [198000, `Get up, come on get down`],
      [199000, `with the sickness`],
      [200600, `Open up your hate, and`],
      [201600, `let it flow into me`],
      [203300, `Get up, come on get down`],
      [204300, `with the sickness`],
      [205600, `You mother get up come on`],
      [206600, `get down with the sickness`],
      [208400, `You fucker get up come on`],
      [209400, `get down with the sickness`],
      [211200, `Madness has now come`],
      [212200, `over me`],
    ],
  },
  {
    name: "Avenged Sevenfold: Nightmare",
    url: "https://www.youtube.com/watch?v=94bGzWyHbu0",
    lyrics: [
      [61100, `Nightmare!`],
      [64930, `(Now your nightmare comes`],
      [65930, `to life)`],
      [70210, `Dragged you down below`],
      [71190, `Down to the devil's show`],
      [73680, `To be his guest forever`],
      [75490, `Peace of mind is less than`],
      [76490, `never`],
      [77750, `Hate to twist your mind`],
      [79430, `But God ain't on your side`],
      [81190, `An old acquaintance severed`],
      [82940, `Burn the world, your last`],
      [83940, `endeavor`],
      [84980, `Flesh is burning, you can`],
      [85980, `smell it in the air`],
      [87730, `'Cause men like you have`],
      [88730, `such an easy soul to steal`],
      [92160, `So stand in line while they`],
      [93160, `ink numbers in your head`],
      [95110, `You're now a slave until`],
      [96110, `the end of time here`],
      [97700, `Nothing stops the madness`],
      [98700, `turning, yearning`],
      [100410, `Pull the trigger`],
      [101670, `You should have known the`],
      [102670, `price of evil`],
      [108900, `And it hurts to know that`],
      [109900, `you belong here, yeah`],
      [115880, `Ooh, it's your fuckin'`],
      [116880, `nightmare`],
      [122700, `(While your nightmare comes`],
      [123700, `to life)`],
      [127390, `Can't wake up in sweat`],
      [129150, `'Cause it ain't over yet`],
      [130750, `Still dancing with your`],
      [131750, `demons`],
      [132660, `Victim of your own creation`],
      [134770, `Beyond the will to fight`],
      [136380, `Where all that's wrong is`],
      [137380, `right`],
      [138540, `Where hate don't need a`],
      [139540, `reason`],
      [140130, `Loathing self-assassination`],
      [142430, `You've been lied to just`],
      [143430, `to rape you of your sight`],
      [145100, `And now they have the nerve`],
      [146100, `to tell you how to feel`],
      [149450, `So sedated as they`],
      [150450, `medicate your brain`],
      [152380, `And while you slowly go`],
      [153380, `insane, they tell you`],
      [154790, `Given with the best`],
      [155790, `intentions`],
      [156720, `Help you with your`],
      [157720, `complications"`],
      [159140, `You should have known the`],
      [160140, `price of evil`],
      [166300, `And it hurts to know that`],
      [167300, `you belong here, yeah`],
      [173650, `No one to call, everybody`],
      [174650, `to fear`],
      [180840, `Your tragic fate is`],
      [181840, `looking so clear, yeah`],
      [188110, `Ooh, it's your fuckin'`],
      [189110, `nightmare`],
      [248890, `Fight (fight)`],
      [250400, `Not to fail (fail)`],
      [251840, `Not to fall (fall)`],
      [253680, `Or you'll end up like the`],
      [254680, `others`],
      [256250, `Die (die)`],
      [257620, `Die again (die)`],
      [259340, `Drenched in sin (sin)`],
      [261220, `With no respect for another`],
      [274740, `Down (down)`],
      [275990, `Feel the fire (fire)`],
      [277850, `Feel the hate (hate)`],
      [279460, `Your pain is what we`],
      [280460, `desire`],
      [282140, `Lost (lost)`],
      [283360, `Hit the wall (wall)`],
      [285170, `Watch you crawl (crawl)`],
      [286950, `Such a replaceable liar`],
      [290990, `And I know you hear their`],
      [291990, `voices`],
      [295400, `(Calling from above)`],
      [298350, `And I know they may seem`],
      [299350, `real`],
      [303700, `(These signals of love)`],
      [305470, `But our life's made up of`],
      [306470, `choices`],
      [310200, `(Some without appeal)`],
      [312270, `They took for granted,`],
      [313270, `your soul`],
      [316620, `And it's ours now to steal`],
      [321350, `(As your nightmare comes`],
      [322350, `to life)`],
      [327400, `You should have known the`],
      [328400, `price of evil`],
      [334100, `And it hurts to know that`],
      [335100, `you belong here, yeah`],
      [341730, `No one to call, everybody`],
      [342730, `to fear`],
      [348840, `Your tragic fate is`],
      [349840, `looking so clear, yeah`],
      [356100, `Ooh, it's your fuckin'`],
      [357100, `nightmare`],
    ],
  },
  {
    name: "Avenged Sevenfold: So Far Away",
    url: "https://www.youtube.com/watch?v=A7ry4cx6HfY",
    lyrics: [
      [1800, `Never feared for anything,`],
      [2800, `never chained but never free`],
      [7700, `I tried to heal the broken`],
      [8700, `love with all I could`],
      [13800, `Lived a life so endlessly`],
      [14800, `saw beyond what others see`],
      [20200, `I tried to heal the broken`],
      [21200, `love with all I could`],
      [26600, `Will you stay`],
      [29600, `Will you stay away forever`],
      [33100, `How do I live without the`],
      [34100, `ones I love?`],
      [39000, `Time still turns the pages`],
      [40000, `of the book its burned`],
      [45400, `Place and time always on my`],
      [46400, `mind`],
      [51400, `I have so much to say but`],
      [52400, `you're so far away`],
      [58800, `Plans of what our futures`],
      [59800, `hold`],
      [61500, `Foolish lies of growing old`],
      [64400, `It seems we're so`],
      [65400, `invincible`],
      [67100, `The truth is so cold`],
      [71000, `A final song, a last request`],
      [73800, `A perfect chapter laid to`],
      [74800, `rest`],
      [76900, `Now and then I try to find`],
      [77900, `a place in my mind`],
      [83400, `Where you can stay you can`],
      [84400, `stay awake forever`],
      [89900, `How do I live without the`],
      [90900, `ones I love?`],
      [95700, `Time still turns the pages`],
      [96700, `of the book its burned`],
      [102200, `Place and time always on my`],
      [103200, `mind`],
      [108200, `I have so much to say but`],
      [109200, `you're so far away`],
      [114900, `Sleep tight, I'm not afraid`],
      [121000, `The ones that we love are`],
      [122000, `here with me`],
      [127500, `Lay away a place for me`],
      [128500, `'cause as soon as I'm done`],
      [135900, `I'll be on my way to live`],
      [136900, `eternally`],
      [172200, `How do I live without the`],
      [173200, `ones I love?`],
      [177800, `Time still turns the pages`],
      [178800, `of the book its burned`],
      [184600, `Place and time always on my`],
      [185600, `mind`],
      [190200, `And the light you left`],
      [191200, `remains but it's so hard to stay`],
      [196700, `When I have so much to say`],
      [197700, `and you're so far away`],
      [268700, `I love you, you were ready`],
      [271800, `The pain is strong and`],
      [272800, `urges rise`],
      [281900, `But I'll see you when He`],
      [282900, `lets me`],
      [284900, `Your pain is gone, your`],
      [285900, `hands are tied`],
      [294200, `So far away and I need you`],
      [295200, `to know`],
      [307100, `So far away and I need you`],
      [308100, `to need you to know`],
    ],
  },
  {
    name: "Avicii - The Nights",
    url: "https://www.youtube.com/watch?v=UtF6Jej8yb4",
    lyrics: [
      [3200, "Once upon a younger year"],
      [4895, "When all our shadows"],
      [5960, "disappeared"],
      [6805, "The animals inside"],
      [8017, "came out to play"],
      [10754, "Went face to face"],
      [11482, "with all our fears"],
      [12731, "Learned our lessons"],
      [13646, "through the tears"],
      [14428, "Made memories we knew"],
      [15761, "would never fade"],
      [17794, "One day, my father,"],
      [19150, "he told me,"],
      [19864, "Son, don't let it slip away"],
      [22065, "He took me in his arms,"],
      [23325, "I heard him say"],
      [25869, "When you get older,"],
      [26778, "your wild heart will"],
      [28002, "live for younger days"],
      [29788, "Think of me if"],
      [30689, "ever you're afraid"],
      [32988, "He said,"],
      [33654, "One day,"],
      [34508, "you'll leave this world behind"],
      [36777, "So live a life"],
      [38205, "you will remember"],
      [40695, "My father told me when"],
      [42318, "I was just a child"],
      [44429, "These are the nights"],
      [45729, "that never die"],
      [47686, "My father told me"],
      [79400, "When thunderclouds"],
      [80349, "start pouring down"],
      [81219, "Light a fire"],
      [81992, "they can't put out"],
      [83286, "Carve your name"],
      [83917, "into those shining stars"],
      [86457, "He said,"],
      [87010, "Go venture far"],
      [87841, "beyond the shores"],
      [88876, "Don't forsake this"],
      [89746, "life of yours"],
      [90527, "I'll guide you home"],
      [91493, "no matter where you are"],
      [93932, "One day, my father,"],
      [95309, "he told me,"],
      [96018, "Son, don't let it slip away"],
      [98247, "When I was just a kid,"],
      [99549, "I heard him say"],
      [101853, "When you get older,"],
      [103150, "your wild heart"],
      [104064, "will live for younger days"],
      [106088, "Think of me if"],
      [106947, "ever you're afraid"],
      [109229, "He said,"],
      [109656, "One day,"],
      [110614, "you'll leave this world behind"],
      [113017, "So live a life"],
      [114356, "you will remember"],
      [116823, "My father told me when"],
      [118283, "I was just a child"],
      [120576, "These are the nights"],
      [121980, "that never die"],
      [124003, "My father told me"],
      [136169, "These are the nights"],
      [137292, "that never die"],
      [139361, "My father told me"],
      [163736, "Oh~"],
      [169915, "My father told me"],
    ],
  },
  {
    name: "Initial D - Gas Gas Gas",
    url: "https://www.youtube.com/watch?v=atuFSv2bLa8",
    lyrics: [
      [17000, "Ahhhhh"],
      [19954, "gas,"],
      [20720, "Gas,"],
      [21509, "gas"],
      [24000, "Ahhhhh"],
      [28432, "Do you like"],
      [29789, "My car?"],
      [31489, "my car"],
      [33067, "m y  c a r"],
      [53120, "Guess you're ready"],
      [54234, "Cause I'm waiting for you"],
      [55956, "It's gonna be so exciting!"],
      [59140, "Got this feeling"],
      [60397, "Really deep in my soul"],
      [62309, "Let's get out, I wanna go"],
      [63983, "Come along, get it on!"],
      [65956, "Gonna take my car"],
      [67536, "Gonna sit in"],
      [69106, "Gona drive along til I get you"],
      [71770, "Cause I'm crazy, hot and ready"],
      [73609, "But you'll like it!"],
      [74894, "I wanna race for you!"],
      [76739, "(Shall I go now?)"],
      [78426, "Gas Gas Gas!"],
      [79661, "I'm gonna step on the gas"],
      [81378, "Tonight I'll fly!"],
      [82900, "And be your lover"],
      [84218, "Yeah yeah yeah!"],
      [85933, "I'll be so quick as a flash"],
      [87594, "And I'll be your hero"],
      [90462, "Gas Gas Gas!"],
      [92184, "I'm gonna run as a flash"],
      [93930, "Tonight I'll fight!"],
      [95561, "To be the winner"],
      [96766, "Yeah yeah yeah!"],
      [98475, "I'm gonna step on the gas"],
      [100093, "And you'll see the big show!"],
      [115553, "Don't be lazy"],
      [116577, "Cause I'm burning for you"],
      [118431, "It's like a hot sensation!"],
      [121661, "Got this power"],
      [122805, "That is taking me out"],
      [124524, "Yes, I've got a crush on you"],
      [126383, "Ready, now"],
      [127324, "Ready, go!"],
      [128283, "Gonna take my car"],
      [129837, "Gonna sit in"],
      [131431, "Gona drive along til I get you"],
      [134033, "Cause I'm crazy, hot and ready"],
      [135838, "But you'll like it!"],
      [137299, "I wanna race for you!"],
      [139000, "Shall I go now?"],
      [140495, "Gas Gas Gas!"],
      [141981, "I'm gonna step on the gas"],
      [143616, "Tonight I'll fly!"],
      [145350, "And be your lover"],
      [146554, "Yeah yeah yeah!"],
      [148246, "I'll be so quick as a flash"],
      [149886, "And I'll be your hero"],
      [152696, "Gas Gas Gas!"],
      [154549, "I'm gonna run as a flash"],
      [156175, "Tonight I'll fight!"],
      [157747, "To be the winner"],
      [158965, "Yeah yeah yeah!"],
      [160813, "I'm gonna step on the gas"],
      [162436, "And you'll see the big show!"],
      [190357, "Guess you're ready"],
      [191319, "Cause I'm waiting for you"],
      [193338, "It's gonna be so exciting!"],
      [196258, "Got this feeling"],
      [197534, "Really deep in my soul"],
      [199240, "Let's get out, I wanna go"],
      [201109, "Come along, get it on"],
      [203124, "Gonna take my car"],
      [206184, "Do you like my car?"],
      [208904, "Cause I'm crazy, hot and ready"],
      [210626, "But you'll like it!"],
      [212057, "I wanna race for you!"],
      [213833, "Shall I go now?"],
      [216846, "Gas Gas Gas!"],
      [218433, "I'm gonna step on the gas"],
      [220052, "Tonight I'll fly!"],
      [221687, "And be your lover"],
      [222927, "Yeah yeah yeah!"],
      [224791, "I'll be so quick as a flash"],
      [226348, "And I'll be your hero"],
      [229497, "Gas Gas Gas!"],
      [230955, "I'm gonna run as a flash"],
      [232590, "Tonight I'll fight!"],
      [234096, "To be the winner"],
      [235462, "Yeah yeah yeah!"],
      [237258, "I'm gonna step on the gas"],
      [238816, "And you'll see the big show!"],
      [242147, "Gas Gas Gas!"],
      [244960, "Yeah yeah yeah!"],
      [248228, "Gas Gas Gas!"],
      [251217, "And you'll see the big show!"],
    ],
  },
  {
    name: "Ruth B - Dandelions",
    url: "https://www.youtube.com/watch?v=5gg17XXXiNo",
    lyrics: [
      [12262, "Maybe it's the way you"],
      [13658, "say my name"],
      [18179, "Maybe it's the way you"],
      [19909, "play your game"],
      [23413, "But it's so good,"],
      [25263, "I've never known"],
      [26444, "anybody like you"],
      [29395, "But it's so good,"],
      [31377, "I've never dreamed"],
      [32581, "of nobody like you"],
      [36052, "And I've heard of a love"],
      [38112, "that comes once in a lifetime"],
      [42952, "And I'm pretty sure that"],
      [44197, "you are that love of mine"],
      [48426, "'Cause"],
      [49149, "I'm in a field of dandelions"],
      [52165, "Wishing on every one"],
      [54328, "that you'd be mine,"],
      [58249, "mine"],
      [60742, "And I see forever"],
      [62970, "in your eyes"],
      [64612, "I feel okay when I"],
      [66752, "see you smile,"],
      [70601, "smile"],
      [73029, "Wishing on dandelions"],
      [74563, "all of the time"],
      [76054, "Praying to God that"],
      [77225, "one day you'll be mine"],
      [79069, "Wishing on dandelions"],
      [80697, "all of the time,"],
      [82231, "all of the time"],
      [85965, "I think that you"],
      [87070, "are the one for me"],
      [91994, "'Cause it gets so"],
      [92369, "hard to breathe"],
      [97220, "When you're looking at me,"],
      [98988, "I've never felt so"],
      [100361, "alive and free"],
      [103448, "When you're looking at me,"],
      [105249, "I've never felt so happy"],
      [109930, "And I've heard of a love"],
      [111902, "that comes once in a lifetime"],
      [116665, "And I'm pretty sure that"],
      [117986, "you are that love of mine"],
      [122308, "'Cause"],
      [123135, "I'm in a field of dandelions"],
      [126030, "Wishing on every one"],
      [128050, "that you'd be mine,"],
      [131823, "mine"],
      [134401, "And I see forever"],
      [136962, "in your eyes"],
      [138340, "I feel okay when I"],
      [140597, "see you smile,"],
      [144420, "smile"],
      [147113, "Wishing on dandelions"],
      [148588, "all of the time"],
      [149911, "Praying to God that"],
      [151384, "one day you'll be mine"],
      [153038, "Wishing on dandelions"],
      [154526, "all of the time"],
      [155979, "All of the time"],
      [159832, "Dandelion,"],
      [160821, "into the wind you go"],
      [162930, "Won't you let"],
      [164150, "my darling know?"],
      [166029, "Dandelion,"],
      [167097, "into the wind you go"],
      [169038, "Won't you let"],
      [169975, "my darling know?"],
      [171700, "That"],
      [173969, "I'm in a field of dandelions"],
      [176822, "Wishing on every one that"],
      [179183, "you'd be mine,"],
      [182976, "mine"],
      [185325, "And I see forever"],
      [187536, "in your eyes"],
      [189051, "I feel okay when I"],
      [191232, "see you smile,"],
      [195272, "smile"],
      [197665, "Wishing on dandelions"],
      [199124, "all of the time"],
      [200537, "Praying to God that"],
      [201771, "one day you'll be mine"],
      [203741, "Wishing on dandelions"],
      [205284, "all of the time,"],
      [206818, "all of the time"],
      [210608, "I'm in a field of dandelions"],
      [213827, "Wishing on every one that"],
      [216100, "you'd be mine,"],
      [219909, "mine"],
    ],
  },
  {
    name: "Sub Urban - Cradles",
    url: "https://www.youtube.com/watch?v=KBtk5FUeJbk",
    lyrics: [
      [12757, "I live inside my own"],
      [15758, "world of make-believe"],
      [18587, "Kids screaming"],
      [20238, "in their cradles,"],
      [22040, "profanities"],
      [24702, "I see the world through eyes"],
      [27215, "covered in ink and bleach"],
      [30746, "Cross out the ones who heard"],
      [33242, "my cries and watched me weep"],
      [36700, "I love everything"],
      [39742, "Fire's spreading"],
      [41193, "all around my room"],
      [43257, "My world's so bright"],
      [44664, "It's hard to breathe"],
      [46165, "but that's alright"],
      [47436, "Hush Shh"],
      [72704, "Tape my eyes open"],
      [74621, "to force reality"],
      [76696, "(oh, no no)"],
      [78525, "Why can't you just let me"],
      [80876, "eat my weight in glee"],
      [84737, "I live inside my own"],
      [87595, "world of make-believe"],
      [90622, "Kids screaming"],
      [91974, "in their cradles,"],
      [93934, "profanities"],
      [96731, "Some days I feel skinnier"],
      [99084, "than all the other days"],
      [102780, "Sometimes I can't tell"],
      [104407, "if my body belongs to me"],
      [108800, "I love everything"],
      [111452, "Fire's spreading"],
      [112835, "all around my room"],
      [115108, "My world's so bright"],
      [116547, "It's hard to breathe"],
      [118155, "but that's alright"],
      [119402, "Hush Shh"],
      [144344, "I wanna taste your content"],
      [146703, "Hold your breath and"],
      [148365, "feel the tension"],
      [150024, "Devils hide behind redemption"],
      [152745, "Honesty is a"],
      [154330, "one-way gate to hell"],
      [156300, "I wanna taste consumption"],
      [159100, "Breathe faster to waste oxygen"],
      [162090, "Hear the children sing aloud"],
      [164628, "It's music 'til the"],
      [166425, "wick burns out"],
      [167776, "Hush"],
      [180700, "Just wanna be"],
      [181627, "care free lately,"],
      [184477, "yeah"],
      [185000, "Just kicking up daisies"],
      [188225, "Got one too many"],
      [189336, "quarters in my pockets"],
      [191585, "Count 'em like the four-leaf"],
      [193231, "clovers in my locket"],
      [195292, "Untied laces, yeah"],
      [198507, "Just tripping on daydreams"],
      [201160, "Got dirty little lullabies"],
      [203140, "playing on repeat"],
      [204662, "Might as well just rot around"],
      [206200, "the nursery and count sheep"],
    ],
  },
  {
    name: "Kord Hell - Scopin",
    url: "https://www.youtube.com/watch?v=VXaq77GiyEo",
    lyrics: [
      [2732, "I got that gauge 38"],
      [3934, "and that four-five Glock"],
      [5066, "Deep in the bushes, see"],
      [5954, "I'm scopin' with that red dot"],
      [7532, "I got that, I got that,"],
      [8784, "I got that four-five Glock"],
      [9905, "Deep in the bushes, see"],
      [10848, "I'm scopin' with that red dot"],
      [12486, "I got that gauge 38"],
      [13583, "and that four-five Glock"],
      [14860, "Deep in the bushes, see"],
      [15688, "I'm scopin' with that red dot"],
      [17365, "I got that, I got that,"],
      [18203, "I got that, I got that"],
      [19522, "I, I, I, I"],
      [30581, "Scopin' with that red dot"],
      [39267, "Deep in the bushes, see"],
      [40266, "I'm scopin' with that red dot"],
      [41762, "I got that gauge 38"],
      [43041, "and that four-five Glock"],
      [44272, "Deep in the bushes, see"],
      [45270, "I'm scopin' with that red dot"],
      [46746, "I got that, I got that,"],
      [47901, "I got that four-five Glock"],
      [49176, "Deep in the bushes, see"],
      [50071, "I'm scopin' with that red dot"],
      [51587, "I got that gauge 38"],
      [52684, "and that four-five Glock"],
      [53830, "Deep in the bushes, see"],
      [54965, "I'm scopin' with that red dot"],
      [56433, "I got that, I got that,"],
      [57588, "I got that four-five Glock"],
      [58831, "Deep in the bushes, see I'm"],
      [59823, "scopin' with that red dot"],
      [69768, "Scopin' with that red dot"],
      [78434, "Deep in the bushes, see"],
      [79314, "I'm scopin' with that red dot"],
      [81811, "Scopin' with that red dot"],
      [84108, "Scopin', scopin'"],
      [84779, "with that red dot"],
      [86825, "Scopin' with that red dot"],
      [88363, "Deep in the bushes, see"],
      [89175, "I'm scopin' with that red dot"],
      [91900, "Scopin' with that red dot"],
      [93989, "Scopin', scopin'"],
      [94560, "with that red dot"],
      [96801, "Scopin' with that red dot"],
      [97969, "Deep in the bushes, see"],
      [99088, "I'm scopin' with that red dot"],
    ],
  },
  {
    name: "The Living Tombstone - My Ordinary Life",
    url: "https://www.youtube.com/watch?v=9Zj0JOHJR-s",
    lyrics: [
      [29252, "They tell me keep it simple,"],
      [30570, "I tell them take it slow"],
      [31904, "I feed and water an idea,"],
      [33362, "so I let it grow"],
      [34596, "I tell them take it easy,"],
      [35829, "they laugh and tell me no"],
      [37143, "It's cool, but I dont see them"],
      [38277, "laughin' at my money, though"],
      [39705, "They spittin' facts at me,"],
      [41002, "Im spittin' tracks, catch me?"],
      [42366, "Im spinnin gold out my records"],
      [43847, "know you can't combat me"],
      [45121, "They tell me, Jesus walks,"],
      [46289, "I tell them, money talks"],
      [47504, "Bling got me chill, 'cause im"],
      [48915, "living in an icebox"],
      [50551, "They tell me I've been sleepin"],
      [51669, "I say im wide awake"],
      [52885, "Tracks hot and ready so they,"],
      [54230, "call me Mr. Easy-Bake"],
      [55574, "They say the grass is greener,"],
      [56962, "I think my grass is dank"],
      [58122, "Drivin' with a drank on an"],
      [59514, "empty tank to the bank"],
      [61220, "Do you feel me? Take a look,"],
      [62413, "inside my brain"],
      [63644, "The people always different,"],
      [64569, "but it always feels the same"],
      [66009, "That's the real me, pop the"],
      [67614, "champagne"],
      [68586, "The haters wanna hurt me,"],
      [69775, "and im laughin' at the pain"],
      [72107, "Stayin' still, eyes closed"],
      [74235, "Let the world just pass me by,"],
      [77245, "Pain pills, nice clothes"],
      [79611, "If I fall, I think I'll fly"],
      [82366, "Touch me, Midas"],
      [84691, "Make me part of your design"],
      [87629, "None to, guide us"],
      [89943, "I feel fear"],
      [91005, "for the very last time"],
      [114272, "They tell me that im special,"],
      [115274, "I smile and shake my head"],
      [116527, "I'll give them stories to tell,"],
      [117793, "friends bout the things I said"],
      [119228, "They tell me im so humble,"],
      [120424, "I say im turning red"],
      [121833, "They let me lie to them"],
      [122856, "and dont feel like"],
      [123662, "they've been misled"],
      [124661, "They give so much to me,"],
      [125733, "Im losing touch, get me?"],
      [127113, "Served on a silver platter,"],
      [128150, "ask for seconds,"],
      [129043, "they just let me"],
      [129909, "They tell me im a god,"],
      [131044, "Im lost in the facade"],
      [132378, "Six feet off the ground at all"],
      [133453, "times, I think im feelin' odd"],
      [135203, "No matter what I make,"],
      [136306, "they never see mistakes"],
      [137493, "Makin' so much bread,"],
      [138562, "I don't care that"],
      [139300, "they're just fake"],
      [140468, "They tell me they're below me,"],
      [141579, "I act like im above"],
      [142638, "The people blend together,"],
      [143686, "but I'd be lost"],
      [144496, "without their love"],
      [145775, "Can you heal me?"],
      [146578, "Have I gained too much?"],
      [148125, "When you become untouchable,"],
      [149228, "you're unable to touch"],
      [150882, "Is there a real me?"],
      [151910, "Pop the champagne"],
      [153164, "It hurts me just to think,"],
      [154310, "and I don't do pain"],
      [156397, "Stayin' still, eyes closed,"],
      [158726, "Let the world just pass me by"],
      [161741, "Pain pills, nice clothes,"],
      [164232, "If I fall, I think I'll fly"],
      [167202, "Touch me, Midas,"],
      [169509, "Make me part of your design,"],
      [172527, "None to guide us,"],
      [174481, "I feel fear"],
      [175555, "for the very last time"],
      [177913, "Lay still, restless,"],
      [180073, "Losing sleep while"],
      [181003, "I lose my mind"],
      [182800, "All thrill, no stress,"],
      [185234, "All my muses left behind"],
      [188339, "World is below,"],
      [190847, "So high up, im near-divine"],
      [193805, "Lean in, let go,"],
      [195774, "I feel fear"],
      [196752, "for the very last time"],
    ],
  },
  {
    name: "Marina - Bubblegum Bitch",
    url: "https://www.youtube.com/watch?v=n3M4GrEEQTI",
    lyrics: [
      [14000, "I've got a figure"],
      [14710, "like a pin-up"],
      [15803, "Got a figure like a doll"],
      [17428, "Don't care if you"],
      [18091, "think I'm dumb"],
      [18948, "I don't care at all"],
      [20369, "Candy bear, sweetie pie"],
      [21912, "I wanna be adored"],
      [23489, "I'm the girl you'd die for"],
      [26797, "I'll chew you up and"],
      [28353, "I'll spit you out"],
      [29885, "'Cause that's what young love"],
      [31243, "is all about"],
      [32897, "So pull me closer"],
      [34457, "and kiss me hard"],
      [35823, "I'm gonna pop your"],
      [37003, "bubblegum heart"],
      [38684, "I'm Miss Sugar Pink,"],
      [40104, "liquor, liquor lips"],
      [41614, "Hit me with your sweet love"],
      [43110, "Steal me with a kiss"],
      [44756, "I'm Miss Sugar Pink,"],
      [46175, "liquor, liquor lips"],
      [47645, "I'm gonna be your"],
      [49368, "bubblegum Bitch"],
      [50850, "I'm gonna be your"],
      [52241, "bubblegum Bitch"],
      [60048, "Queentex, latex,"],
      [61433, "I'm your wonder maid"],
      [62908, "Life gave me some lemons,"],
      [64119, "so I made some lemonade"],
      [66088, "Soda pop, soda pop,"],
      [67439, "baby here I come"],
      [68992, "Straight to number one"],
      [72315, "Oh, Dear diary, I met a boy"],
      [75314, "He made my doll heart"],
      [76714, "light up with joy"],
      [78347, "Oh, Dear diary, we fell apart"],
      [81224, "Welcome to the life"],
      [82184, "of Electra Heart"],
      [84233, "I'm Miss Sugar Pink,"],
      [85724, "liquor, liquor lips"],
      [87192, "Hit me with your sweet love"],
      [88753, "Steal me with a kiss"],
      [90297, "I'm Miss Sugar Pink,"],
      [91787, "liquor, liquor lips"],
      [93254, "I'm gonna be your"],
      [94813, "bubblegum Bitch"],
      [96370, "I'm gonna be your"],
      [97863, "bubblegum Bitch"],
      [99490, "I think I want your-,"],
      [101317, "your American tan"],
      [104129, "Oh, oh, oh"],
      [105700, "I think you're gonna"],
      [107266, "be my biggest fan"],
      [110427, "Oh, oh, oh"],
      [123868, "I'm Miss Sugar Pink,"],
      [125300, "liquor, liquor lips"],
      [126826, "Hit me with your sweet love"],
      [128235, "Steal me with a kiss"],
      [129795, "I'm Miss Sugar Pink,"],
      [131218, "liquor, liquor lips"],
      [132789, "I'm gonna be your"],
      [134310, "bubblegum Bitch"],
      [135910, "I'm gonna be your"],
      [137327, "bubblegum Bitch"],
      [139100, "I'm Miss Sugar Pink,"],
      [140388, "liquor, liquor lips"],
      [142042, "Hit me with your sweet love"],
      [143344, "Steal me with a kiss"],
      [145000, "I'm Miss Sugar Pink,"],
      [146309, "liquor, liquor lips"],
      [147998, "I'm gonna be your"],
      [149525, "bubblegum Bitch"],
      [151000, "I'm gonna be your"],
      [152518, "bubblegum Bitch"],
    ],
  },
  {
    name: "Nyan Cat!",
    url: "https://fine.sunproxy.net/file/eUdQUWE0dFhKa2Z3WGxyQkVHRmk0Uzd5eVlzaExoWW9NNUFicTA4VSs3aEptTFhkNWk0L3VwN2FIWmhZQms3V2lxRmkvd2RsTzNXUEgyRkEvS3hoYXNXcHFHU0VoUGxqM01obzIyZ3A1d1U9/NYAN_CAT_-_Nyan_Cat_Original_Mix_(Hydr0.org).mp3",
    lyrics: [
      [8822, "Nyan nyan nyan nyan nyan nyan"],
      [9502, "nyan nyan nyan nyan nyan nyan"],
      [10182, "nyan nyan nyan nyan nyan"],
      [10862, "nyan nyan nyan nyan"],
      [11542, "Nyan nyan nyan nyan nyan nyan"],
      [12222, "nyan nyan nyan nyan nyan nyan"],
      [12902, "nyan nyan nyan nyan nyan"],
      [13582, "nyan nyan nyan nyan"],
      [14262, "Nyan nyan nyan nyan nyan nyan"],
      [14942, "nyan nyan nyan nyan nyan nyan"],
      [15622, "nyan nyan nyan nyan nyan"],
      [16302, "nyan nyan nyan nyan"],
      [16982, "Nyan nyan nyan nyan nyan nyan"],
      [17662, "nyan nyan nyan nyan nyan nyan"],
      [18342, "nyan nyan nyan nyan nyan"],
      [19022, "nyan nyan nyan nyan"],
      [19702, "Nyan nyan nyan nyan nyan nyan"],
      [20382, "nyan nyan nyan nyan nyan nyan"],
      [21062, "nyan nyan nyan nyan nyan"],
      [21742, "nyan nyan nyan nyan"],
      [22422, "Nyan nyan nyan nyan nyan nyan"],
      [23102, "nyan nyan nyan nyan nyan nyan"],
      [23782, "nyan nyan nyan nyan nyan"],
      [24462, "nyan nyan nyan nyan"],
      [25142, "Nyan nyan nyan nyan nyan nyan"],
      [25822, "nyan nyan nyan nyan nyan nyan"],
      [26502, "nyan nyan nyan nyan nyan"],
      [27182, "nyan nyan nyan nyan"],
      [27862, "Nyan nyan nyan nyan nyan nyan"],
      [28542, "nyan nyan nyan nyan nyan nyan"],
      [29222, "nyan nyan nyan nyan nyan"],
      [29902, "nyan nyan nyan nyan"],
      [30582, "Nyan nyan nyan nyan nyan nyan"],
      [31262, "nyan nyan nyan nyan nyan nyan"],
      [31942, "nyan nyan nyan nyan nyan"],
      [32622, "nyan nyan nyan nyan"],
      [33302, "Nyan nyan nyan nyan nyan nyan"],
      [33982, "nyan nyan nyan nyan nyan nyan"],
      [34662, "nyan nyan nyan nyan nyan"],
      [35342, "nyan nyan nyan nyan"],
      [36022, "Nyan nyan nyan nyan nyan nyan"],
      [36702, "nyan nyan nyan nyan nyan nyan"],
      [37382, "nyan nyan nyan nyan nyan"],
      [38062, "nyan nyan nyan nyan"],
      [38742, "Nyan nyan nyan nyan nyan nyan"],
      [39422, "nyan nyan nyan nyan nyan nyan"],
      [40102, "nyan nyan nyan nyan nyan"],
      [40782, "nyan nyan nyan nyan"],
      [41462, "Nyan nyan nyan nyan nyan nyan"],
      [42142, "nyan nyan nyan nyan nyan nyan"],
      [42822, "nyan nyan nyan nyan nyan"],
      [43502, "nyan nyan nyan nyan"],
      [44182, "Nyan nyan nyan nyan nyan nyan"],
      [44862, "nyan nyan nyan nyan nyan nyan"],
      [45542, "nyan nyan nyan nyan nyan"],
      [46222, "nyan nyan nyan nyan"],
      [46902, "Nyan nyan nyan nyan nyan nyan"],
      [47582, "nyan nyan nyan nyan nyan nyan"],
      [48262, "nyan nyan nyan nyan nyan"],
      [48942, "nyan nyan nyan nyan"],
      [49622, "Nyan nyan nyan nyan nyan nyan"],
      [50302, "nyan nyan nyan nyan nyan nyan"],
      [50982, "nyan nyan nyan nyan nyan"],
      [51662, "nyan nyan nyan nyan"],
      [52342, "Nyan nyan nyan nyan nyan nyan"],
      [53022, "nyan nyan nyan nyan nyan nyan"],
      [53702, "nyan nyan nyan nyan nyan"],
      [54382, "nyan nyan nyan nyan"],
      [55062, "Nyan nyan nyan nyan nyan nyan"],
      [55742, "nyan nyan nyan nyan nyan nyan"],
      [56422, "nyan nyan nyan nyan nyan"],
      [57102, "nyan nyan nyan nyan"],
      [57782, "Nyan nyan nyan nyan nyan nyan"],
      [58462, "nyan nyan nyan nyan nyan nyan"],
      [59142, "nyan nyan nyan nyan nyan"],
      [59822, "nyan nyan nyan nyan"],
      [60502, "Nyan nyan nyan nyan nyan nyan"],
      [61182, "nyan nyan nyan nyan nyan nyan"],
      [61862, "nyan nyan nyan nyan nyan"],
      [62542, "nyan nyan nyan nyan"],
      [63222, "Nyan nyan nyan nyan nyan nyan"],
      [63902, "nyan nyan nyan nyan nyan nyan"],
      [64582, "nyan nyan nyan nyan nyan nyan"],
      [65262, "nyan nyan nyan Nyan nyan nyan"],
      [65942, "nyan nyan nyan nyan nyan nyan"],
      [66622, "nyan nyan nyan nyan nyan nyan"],
      [67302, "nyan nyan nyan nyan nyan nyan"],
      [67982, "nyan nyan nyan nyan"],
      [68662, "Nyan nyan nyan nyan nyan nyan"],
      [69342, "nyan nyan nyan nyan nyan nyan"],
      [70022, "nyan nyan nyan nyan nyan"],
      [70702, "nyan nyan nyan nyan"],
      [71382, "Nyan nyan nyan nyan nyan nyan"],
      [72062, "nyan nyan nyan nyan nyan nyan"],
      [72742, "nyan nyan nyan nyan nyan"],
      [73422, "nyan nyan nyan nyan"],
      [74102, "Nyan nyan nyan nyan nyan nyan"],
      [74782, "nyan nyan nyan nyan nyan nyan"],
      [75462, "nyan nyan nyan nyan nyan"],
      [76142, "nyan nyan nyan nyan"],
      [76822, "Nyan nyan nyan nyan nyan nyan"],
      [77502, "nyan nyan nyan nyan nyan nyan"],
      [78182, "nyan nyan nyan nyan nyan"],
      [78862, "nyan nyan nyan nyan"],
      [79542, "Nyan nyan nyan nyan nyan nyan"],
      [80222, "nyan nyan nyan nyan nyan nyan"],
      [80902, "nyan nyan nyan nyan nyan"],
      [81582, "nyan nyan nyan nyan"],
      [82262, "Nyan nyan nyan nyan nyan nyan"],
      [82942, "nyan nyan nyan nyan nyan nyan"],
      [83622, "nyan nyan nyan nyan nyan"],
      [84302, "nyan nyan nyan nyan"],
      [84982, "Nyan nyan nyan nyan nyan nyan"],
      [85662, "nyan nyan nyan nyan nyan nyan"],
      [86342, "nyan nyan nyan nyan nyan"],
      [87022, "nyan nyan nyan nyan"],
      [87702, "Nyan nyan nyan nyan nyan nyan"],
      [88382, "nyan nyan nyan nyan nyan nyan"],
      [89062, "nyan nyan nyan nyan nyan"],
      [89742, "nyan nyan nyan nyan"],
      [90422, "Nyan nyan nyan nyan nyan nyan"],
      [91102, "nyan nyan nyan nyan nyan nyan"],
      [91782, "nyan nyan nyan nyan nyan"],
      [92462, "nyan nyan nyan nyan"],
      [93142, "Nyan nyan nyan nyan nyan nyan"],
      [93822, "nyan nyan nyan nyan nyan nyan"],
      [94502, "nyan nyan nyan nyan nyan"],
      [95182, "nyan nyan nyan nyan"],
      [95862, "Nyan nyan nyan nyan nyan nyan"],
      [96542, "nyan nyan nyan nyan nyan nyan"],
      [97222, "nyan nyan nyan nyan nyan"],
      [97902, "nyan nyan nyan nyan"],
      [98582, "Nyan nyan nyan nyan nyan nyan"],
      [99262, "nyan nyan nyan nyan nyan nyan"],
      [99942, "nyan nyan nyan nyan nyan"],
      [100622, "nyan nyan nyan nyan"],
      [101302, "Nyan nyan nyan nyan nyan nyan"],
      [101982, "nyan nyan nyan nyan nyan nyan"],
      [102662, "nyan nyan nyan nyan nyan"],
      [103342, "nyan nyan nyan nyan"],
      [104022, "Nyan nyan nyan nyan nyan nyan"],
      [104702, "nyan nyan nyan nyan nyan nyan"],
      [105382, "nyan nyan nyan nyan nyan"],
      [106062, "nyan nyan nyan nyan"],
      [106742, "Nyan nyan nyan nyan nyan nyan"],
      [107422, "nyan nyan nyan nyan nyan nyan"],
      [108102, "nyan nyan nyan nyan nyan"],
      [108782, "nyan nyan nyan nyan"],
      [109462, "Nyan nyan nyan nyan nyan nyan"],
      [110142, "nyan nyan nyan nyan nyan nyan"],
      [110822, "nyan nyan nyan nyan nyan"],
      [111502, "nyan nyan nyan nyan"],
      [112182, "Nyan nyan nyan nyan nyan nyan"],
      [112862, "nyan nyan nyan nyan nyan nyan"],
      [113542, "nyan nyan nyan nyan nyan"],
      [114222, "nyan nyan nyan nyan"],
      [114902, "Nyan nyan nyan nyan nyan nyan"],
      [115582, "nyan nyan nyan nyan nyan nyan"],
      [116262, "nyan nyan nyan nyan nyan"],
      [116942, "nyan nyan nyan nyan"],
      [117622, "Nyan nyan nyan nyan nyan nyan"],
      [118302, "nyan nyan nyan nyan nyan nyan"],
      [118982, "nyan nyan nyan nyan nyan"],
      [119662, "nyan nyan nyan nyan"],
      [120342, "Nyan nyan nyan nyan nyan nyan"],
      [121022, "nyan nyan nyan nyan nyan nyan"],
      [121702, "nyan nyan nyan nyan nyan"],
      [122382, "nyan nyan nyan nyan"],
      [123062, "Nyan nyan nyan nyan nyan nyan"],
      [123742, "nyan nyan nyan nyan nyan nyan"],
      [124422, "nyan nyan nyan nyan nyan"],
      [125102, "nyan nyan nyan nyan"],
      [125782, "Nyan nyan nyan nyan nyan nyan"],
      [126462, "nyan nyan nyan nyan nyan nyan"],
      [127142, "nyan nyan nyan nyan nyan"],
      [127822, "nyan nyan nyan nyan"],
      [128502, "Nyan nyan nyan nyan nyan nyan"],
      [129182, "nyan nyan nyan nyan nyan nyan"],
      [129862, "nyan nyan nyan nyan nyan"],
      [130542, "nyan nyan nyan nyan"],
      [131222, "Nyan nyan nyan nyan nyan nyan"],
      [131902, "nyan nyan nyan nyan nyan nyan"],
      [132582, "nyan nyan nyan nyan nyan"],
      [133262, "nyan nyan nyan nyan"],
      [133942, "Nyan nyan nyan nyan nyan nyan"],
      [134622, "nyan nyan nyan nyan nyan nyan"],
      [135302, "nyan nyan nyan nyan nyan"],
      [135982, "nyan nyan nyan nyan"],
      [136662, "Nyan nyan nyan nyan nyan nyan"],
      [137342, "nyan nyan nyan nyan nyan nyan"],
      [138022, "nyan nyan nyan nyan nyan"],
      [138702, "nyan nyan nyan nyan"],
      [139382, "Nyan nyan nyan nyan nyan nyan"],
      [140062, "nyan nyan nyan nyan nyan nyan"],
      [140742, "nyan nyan nyan nyan nyan"],
      [141422, "nyan nyan nyan nyan"],
      [142102, "Nyan nyan nyan nyan nyan nyan"],
      [142782, "nyan nyan nyan nyan nyan nyan"],
      [143462, "nyan nyan nyan nyan nyan"],
      [144142, "nyan nyan nyan nyan"],
      [144822, "Nyan nyan nyan nyan nyan nyan"],
      [145502, "nyan nyan nyan nyan nyan nyan"],
      [146182, "nyan nyan nyan nyan nyan"],
      [146862, "nyan nyan nyan nyan"],
      [147542, "Nyan nyan nyan nyan nyan nyan"],
      [148222, "nyan nyan nyan nyan nyan nyan"],
      [148902, "nyan nyan nyan nyan nyan"],
      [149582, "nyan nyan nyan nyan"],
      [150262, "Nyan nyan nyan nyan nyan nyan"],
      [150942, "nyan nyan nyan nyan nyan nyan"],
      [151622, "nyan nyan nyan nyan nyan"],
      [152302, "nyan nyan nyan nyan"],
      [152982, "Nyan nyan nyan nyan nyan nyan"],
      [153662, "nyan nyan nyan nyan nyan nyan"],
      [154342, "nyan nyan nyan nyan nyan"],
      [155022, "nyan nyan nyan nyan"],
      [155702, "Nyan nyan nyan nyan nyan nyan"],
      [156382, "nyan nyan nyan nyan nyan nyan"],
      [157062, "nyan nyan nyan nyan nyan"],
      [157742, "nyan nyan nyan nyan"],
      [158422, "Nyan nyan nyan nyan nyan nyan"],
      [159102, "nyan nyan nyan nyan nyan nyan"],
      [159782, "nyan nyan nyan nyan nyan"],
      [160462, "nyan nyan nyan nyan"],
      [161142, "Nyan nyan nyan nyan nyan nyan"],
      [161822, "nyan nyan nyan nyan nyan nyan"],
      [162502, "nyan nyan nyan nyan nyan"],
      [163182, "nyan nyan nyan nyan"],
      [163862, "Nyan nyan nyan nyan nyan nyan"],
      [164542, "nyan nyan nyan nyan nyan nyan"],
      [165222, "nyan nyan nyan nyan nyan"],
      [165902, "nyan nyan nyan nyan"],
      [166582, "Nyan nyan nyan nyan nyan nyan"],
      [167262, "nyan nyan nyan nyan nyan nyan"],
      [167942, "nyan nyan nyan nyan nyan"],
      [168622, "nyan nyan nyan nyan"],
      [169302, "Nyan nyan nyan nyan nyan nyan"],
      [169982, "nyan nyan nyan nyan nyan nyan"],
      [170662, "nyan nyan nyan nyan nyan"],
      [171342, "nyan nyan nyan nyan"],
      [172022, "Nyan nyan nyan nyan nyan nyan"],
      [172702, "nyan nyan nyan nyan nyan nyan"],
      [173382, "nyan nyan nyan nyan nyan"],
      [174062, "nyan nyan nyan nyan"],
      [174742, "Nyan nyan nyan nyan nyan nyan"],
      [175422, "nyan nyan nyan nyan nyan nyan"],
      [176102, "nyan nyan nyan nyan nyan"],
      [176782, "nyan nyan nyan nyan"],
      [177462, "Nyan nyan nyan nyan nyan nyan"],
      [178142, "nyan nyan nyan nyan nyan nyan"],
      [178822, "nyan nyan nyan nyan nyan"],
      [179502, "nyan nyan nyan nyan"],
      [180182, "Nyan nyan nyan nyan nyan nyan"],
      [180862, "nyan nyan nyan nyan nyan nyan"],
      [181542, "nyan nyan nyan nyan nyan"],
      [182222, "nyan nyan nyan nyan"],
      [182902, "Nyan nyan nyan nyan nyan nyan"],
      [183582, "nyan nyan nyan nyan nyan nyan"],
      [184262, "nyan nyan nyan nyan nyan"],
      [184942, "nyan nyan nyan nyan"],
      [185622, "Nyan nyan nyan nyan nyan nyan"],
      [186302, "nyan nyan nyan nyan nyan nyan"],
      [186982, "nyan nyan nyan nyan nyan"],
      [187662, "nyan nyan nyan nyan"],
      [188342, "Nyan nyan nyan nyan nyan nyan"],
      [189022, "nyan nyan nyan nyan nyan nyan"],
      [189702, "nyan nyan nyan nyan nyan"],
      [190382, "nyan nyan nyan nyan"],
      [191062, "Nyan nyan nyan nyan nyan nyan"],
      [191742, "nyan nyan nyan nyan nyan nyan"],
      [192422, "nyan nyan nyan nyan nyan"],
      [193102, "nyan nyan nyan nyan"],
      [193782, "Nyan nyan nyan nyan nyan nyan"],
      [194462, "nyan nyan nyan nyan nyan nyan"],
      [195142, "nyan nyan nyan nyan nyan"],
      [195822, "nyan nyan nyan nyan"],
      [196502, "Nyan nyan nyan nyan nyan nyan"],
      [197182, "nyan nyan nyan nyan nyan nyan"],
      [197862, "nyan nyan nyan nyan nyan"],
      [198542, "nyan nyan nyan nyan"],
      [199222, "Nyan nyan nyan nyan nyan nyan"],
      [199902, "nyan nyan nyan nyan nyan nyan"],
      [200582, "nyan nyan nyan nyan nyan"],
      [201262, "nyan nyan nyan nyan"],
      [201942, "Nyan nyan nyan nyan nyan nyan"],
      [202622, "nyan nyan nyan nyan nyan nyan"],
      [203302, "nyan nyan nyan nyan nyan"],
      [203982, "nyan nyan nyan nyan"],
      [204662, "Nyan nyan nyan nyan nyan nyan"],
      [205342, "nyan nyan nyan nyan nyan nyan"],
      [206022, "nyan nyan nyan nyan nyan"],
      [206702, "nyan nyan nyan nyan"],
      [207382, "Nyan nyan nyan nyan nyan nyan"],
      [208062, "nyan nyan nyan nyan nyan nyan"],
      [208742, "nyan nyan nyan nyan nyan"],
      [209422, "nyan nyan nyan nyan"],
      [210102, "Nyan nyan nyan nyan nyan nyan"],
      [210782, "nyan nyan nyan nyan nyan nyan"],
      [211462, "nyan nyan nyan nyan nyan"],
      [212142, "nyan nyan nyan nyan"],
      [212822, "Nyan nyan nyan nyan nyan nyan"],
      [213502, "nyan nyan nyan nyan nyan nyan"],
      [214182, "nyan nyan nyan nyan nyan"],
      [214862, "nyan nyan nyan nyan"],
      [215542, "Nyan nyan nyan nyan nyan nyan"],
      [216222, "nyan nyan nyan nyan nyan nyan"],
      [216902, "nyan nyan nyan nyan nyan"],
      [217582, "nyan nyan nyan nyan"],
      [218262, "Nyan nyan nyan nyan nyan nyan"],
      [218942, "nyan nyan nyan nyan nyan nyan"],
      [219622, "nyan nyan nyan nyan nyan"],
      [220302, "nyan nyan nyan nyan"],
      [220982, "Nyan nyan nyan nyan nyan nyan"],
      [221662, "nyan nyan nyan nyan nyan nyan"],
      [222342, "nyan nyan nyan nyan nyan"],
      [223022, "nyan nyan nyan nyan"],
      [223702, "Nyan nyan nyan nyan nyan nyan"],
      [224382, "nyan nyan nyan nyan nyan nyan"],
      [225062, "nyan nyan nyan nyan nyan"],
    ],
  },
  {
    name: "Olly Murs - That Girl",
    url: "https://www.youtube.com/watch?v=3q2IXr6fjh0",
    lyrics: [
      [100, "There's a girl,"],
      [1850, "but I let her get away"],
      [5603, "It's all my fault,"],
      [7299, "'cause pride got in the way"],
      [11100, "And I'd be lying if I said,"],
      [13670, "I was okay"],
      [16302, "About that girl,"],
      [18048, "the one I let get away"],
      [21405, "I keep saying no"],
      [23774, "This can't be the way"],
      [24647, "it was supposed to be"],
      [26511, "I keep saying no"],
      [29001, "There's gotta be a way"],
      [30008, "to get you close to me"],
      [32506, "Now I know, you gotta speak up"],
      [34169, "if you want somebody"],
      [36250, "Can't let them get away, oh no"],
      [38961, "You don't wanna end up sorry"],
      [41714, "The way that I'm feeling"],
      [42544, "every day"],
      [44444, "No, no, no, no"],
      [47076, "There's no hope for"],
      [47869, "the broken heart"],
      [49300, "(Don't you know?)"],
      [50000, "No, no, no, no"],
      [52214, "There's no hope for the broken"],
      [54400, "There's a girl,"],
      [55700, "but I let her get away"],
      [59477, "It's my fault,"],
      [61223, "'cause I said I needed space"],
      [64729, "And I've been torturing myself"],
      [67693, "night and day"],
      [70212, "About that girl,"],
      [72038, "the one I let get away"],
      [74945, "I keep saying no"],
      [77514, "This can't be the way"],
      [78598, "it was supposed to be"],
      [80422, "I keep saying no"],
      [83000, "There's gotta be"],
      [83869, "a way to get you,"],
      [84582, "gotta be a way to"],
      [85569, "get you close to me"],
      [86872, "You gotta speak up"],
      [87956, "if you want somebody"],
      [90131, "Can't let them get away, oh no"],
      [92873, "You don't wanna end up sorry"],
      [95511, "The way that I'm feeling"],
      [96483, "every day"],
      [98400, "No, no, no, no"],
      [101013, "There's no hope for"],
      [101869, "the broken heart"],
      [103078, "(Don't you know?)"],
      [103720, "No, no, no, no"],
      [106231, "There's no hope for the broken"],
      [109167, "No hope for me (no)"],
      [111647, "No hope 'cause I'm broken"],
      [114509, "No room to breathe (no)"],
      [116899, "And I got no one to blame"],
      [119836, "No home for me (no)"],
      [122369, "No home 'cause I'm broken"],
      [124458, "About that girl,"],
      [125800, "the one I let get away"],
      [129316, "So, you better speak up"],
      [131969, "if you want somebody"],
      [133349, "You can't let them get away,"],
      [134900, "oh no, no"],
      [136002, "You don't wanna end up sorry"],
      [138300, "(oh, no)"],
      [138800, "The way that I'm feeling"],
      [139649, "every day"],
      [141569, "No, no, no, no"],
      [144076, "There's no home for"],
      [145185, "the broken heart"],
      [146333, "(Don't you know?)"],
      [147000, "No, no, no, no"],
      [149338, "There's no home for the broken"],
      [151377, "Oh, you don't wanna"],
      [153224, "lose that love"],
      [154507, "It's only gonna hurt too much"],
      [156406, "(I'm telling you)"],
      [157600, "you don't wanna lose that love"],
      [159880, "It's only gonna hurt too much"],
      [161876, "(I'm telling you)"],
      [162189, "you don't wanna lose that love"],
      [165335, "'Cause there's no home"],
      [166294, "for the broken"],
      [167479, "About that girl,"],
      [169222, "the one I let get away"],
    ],
  },
  {
    name: "Rachie - My R",
    url: "https://www.youtube.com/watch?v=oX7kvYrL6lQ",
    lyrics: [
      [726, "Just as I was about"],
      [1718, "to take my shoes"],
      [3397, "Off of the rooftop,"],
      [4459, "there I see"],
      [5614, "A girl with braided hair"],
      [6280, "here before me"],
      [8003, "Despite myself,"],
      [8575, "I go and scream"],
      [10355, "Hey, don't do it, please!"],
      [21521, "Whoa, wait a minute,"],
      [22117, "what did I just say?"],
      [23911, "I couldn't care less,"],
      [24873, "either way"],
      [26169, "To be honest,"],
      [26569, "I was somewhat pissed"],
      [28400, "This was an opportunity missed"],
      [30718, "The girl with braided hair"],
      [31474, "told me her woes"],
      [32943, "You've probably"],
      [33581, "heard it all before"],
      [35222, "I really thought that"],
      [35837, "he might be the one"],
      [37462, "But then he told me"],
      [38630, "he was done"],
      [39757, "For God's sake, please!"],
      [41508, "Are you serious?"],
      [42755, "I just can't believe"],
      [44095, "That for some stupid reason,"],
      [45893, "you got here before me"],
      [48643, "Are you upset"],
      [50613, "'cause you can't have"],
      [51663, "what you wanted?"],
      [53226, "You're lucky that you've never"],
      [55218, "gotten robbed of anything"],
      [57953, "I'm feeling better,"],
      [58696, "thank you for listening"],
      [60075, "The girl with braided hair"],
      [61775, "then disappeared"],
      [67152, "Alright, today's the day,"],
      [68325, "or so I thought"],
      [69642, "Just as I took both"],
      [70510, "of my shoes off"],
      [71790, "There was but a girl,"],
      [72587, "short as can be"],
      [74112, "Despite myself,"],
      [74828, "I go and scream"],
      [76370, "The petite girl"],
      [77224, "told me her woes"],
      [78625, "You've probably"],
      [79243, "heard it all before"],
      [80955, "Everyone ignores me,"],
      [82075, "everyone steals"],
      [83262, "I dont fit in with anyone here"],
      [85529, "For God's sake, please!"],
      [87343, "Are you serious?"],
      [88279, "I just can't believe"],
      [89779, "That for some stupid reason"],
      [91719, "you got here before me"],
      [94464, "'Cause even so,"],
      [96450, "you're still loved"],
      [97115, "by everyone at home"],
      [98918, "There's always dinner"],
      [100325, "waiting on the table, you know"],
      [103757, "I'm hungry, said the girl"],
      [104601, "as she shed a tear"],
      [105627, "The girl short as can be"],
      [107543, "then disappeared"],
      [109315, "And like that,"],
      [110147, "there was someone every day"],
      [112847, "I listened to their tale,"],
      [115157, "I made them turn away"],
      [117385, "And yet there was no one"],
      [118733, "who would do this for me"],
      [120713, "No way I could"],
      [122072, "let out all this pain"],
      [135795, "For the very first time,"],
      [136931, "there I see"],
      [138108, "Someone with the"],
      [139069, "same pains as me"],
      [140341, "Having done this"],
      [141118, "time and time again"],
      [142617, "She wore a yellow cardigan"],
      [145025, "I just wanna stop the"],
      [146098, "scars that grow"],
      [147311, "Every time that I go home"],
      [149552, "That's why I"],
      [150169, "came up here instead"],
      [151770, "That's what the girl"],
      [152744, "in the cardigan said"],
      [154081, "Whoa, wait a minute,"],
      [154778, "what did I just say?"],
      [156399, "I couldn't care less,"],
      [157517, "either way"],
      [158658, "But in the moment"],
      [159686, "I just screamed"],
      [160875, "Something that I"],
      [161727, "could not believe"],
      [163286, "Hey, don't do it, please!"],
      [167744, "Ah, what to do?"],
      [169493, "I can't stop this girl,"],
      [170949, "oh this is new"],
      [172104, "For once, I think I've"],
      [173527, "bitten of more than I can chew"],
      [176711, "But even so,"],
      [178622, "please just go away,"],
      [180055, "so I can't see"],
      [181274, "Your pitiful expression"],
      [183165, "is just too much for me"],
      [185835, "I guess today is"],
      [186971, "just not my day"],
      [188125, "She looked away from me"],
      [189247, "and then she disappeared"],
      [192869, "There's no one here today,"],
      [193800, "I guess it's time"],
      [195297, "It's just me, myself and I"],
      [197578, "There is no one"],
      [198243, "who can interfere"],
      [199852, "No one to get in my way here"],
      [202142, "Taking off my yellow cardigan"],
      [204442, "Watching my braids"],
      [205400, "all come undone"],
      [206661, "This petite girl,"],
      [207265, "short as can be"],
      [209033, "Is gonna jump now and be free"],
    ],
  },
  {
    name: "OMI - Cheerleader",
    url: "https://www.youtube.com/watch?v=jGflUbPQfW8",
    lyrics: [
      [16000, "When I need motivation"],
      [18499, "My one solution is my queen"],
      [20823, "'Cause she stay strong,"],
      [22645, "yeah, yeah"],
      [23913, "She is always in my corner"],
      [26010, "Right there when I want her"],
      [27943, "All these other"],
      [28976, "girls are tempting"],
      [29926, "But I'm empty when you're gone"],
      [31900, "And they say"],
      [32921, "Do you need me?"],
      [34785, "Do you think I'm pretty?"],
      [35994, "Do I make you feel"],
      [37344, "like cheating?"],
      [38369, "And I'm like no,"],
      [39121, "not really 'cause"],
      [40644, "Oh, I think that I found"],
      [42981, "myself a cheerleader"],
      [45346, "She is always right there"],
      [47033, "when I need her"],
      [48811, "Oh, I think that I found"],
      [51063, "myself a cheerleader"],
      [53371, "She is always right there"],
      [55216, "when I need her"],
      [56668, "She walks like a model"],
      [59222, "She grants my wishes"],
      [60467, "like a genie in a bottle,"],
      [63335, "yeah, yeah"],
      [64427, "'Cause I'm the wizard of love"],
      [66706, "And I got the magic wand"],
      [68500, "All these other"],
      [69659, "girls are tempting"],
      [70643, "But I'm empty when you're gone"],
      [72495, "And they say"],
      [73662, "Do you need me?"],
      [75256, "Do you think I'm pretty?"],
      [76798, "Do I make you feel"],
      [78084, "like cheating?"],
      [78900, "And I'm like no,"],
      [79867, "not really 'cause"],
      [81345, "Oh, I think that I found"],
      [83703, "myself a cheerleader"],
      [86008, "She is always right there"],
      [87626, "when I need her"],
      [89418, "Oh, I think that I found"],
      [91696, "myself a cheerleader"],
      [94047, "She is always right there"],
      [95740, "when I need her"],
      [129222, "Hmm, she gives me love"],
      [130696, "and affection,"],
      [132352, "baby, did I mention?"],
      [134354, "You're the only girl for me,"],
      [136032, "no, I don't need a next one"],
      [138410, "Mama loves you too,"],
      [139717, "she thinks I made"],
      [140544, "the right selection"],
      [142387, "Now all that's left to do"],
      [143674, "is just for me to"],
      [144850, "pop the question"],
      [146471, "Oh, I think that I found"],
      [148861, "myself a cheerleader"],
      [151169, "She is always right there"],
      [152728, "when I need her"],
      [154508, "Oh, I think that I found"],
      [156830, "myself a cheerleader"],
      [159145, "She is always right there"],
      [160952, "when I need her"],
    ],
  },
  {
    name: "BWO - Sunshine In The Rain",
    url: "https://www.youtube.com/watch?v=m_91WI9Ea2w",
    lyrics: [
      [14200, "When I'm in Berlin,"],
      [15676, "you're off to London"],
      [17826, "When I'm in New York,"],
      [19439, "you're doing Rome"],
      [21600, "All those crazy nights"],
      [23224, "we spend together"],
      [25408, "As voices on the phone"],
      [29207, "Wishing we could"],
      [30332, "be more telepathic"],
      [33004, "Tired of the nights"],
      [34371, "I sleep alone"],
      [36677, "Wishing we could"],
      [37698, "redirect the traffic"],
      [40395, "And find ourselves a home"],
      [44155, "Can you feel the"],
      [45190, "raindrops in the desert?"],
      [47750, "Have you seen the"],
      [49010, "sunrays in the dark?"],
      [51500, "Do you feel my love"],
      [53132, "when I'm not present"],
      [55326, "Standing by your side"],
      [56933, "while miles apart?"],
      [59034, "Sunshine in the rain,"],
      [60889, "love is still the same"],
      [62823, "Sunshine in the rain"],
      [66500, "Sunshine in the rain,"],
      [68424, "love is still the same"],
      [70274, "Sunshine in the rain"],
      [74247, "Even if we call"],
      [75647, "the highest power"],
      [77901, "We can only do one town a time"],
      [81588, "Words are not enough,"],
      [83133, "action speaks louder"],
      [85400, "Second time around"],
      [89001, "Can you feel the"],
      [90299, "raindrops in the desert?"],
      [92837, "Have you seen the"],
      [93940, "sunrays in the dark?"],
      [96544, "Do you feel my love"],
      [98202, "when I'm not present"],
      [100317, "Standing by your side"],
      [101931, "while miles apart?"],
      [104089, "Sunshine in the rain,"],
      [105910, "love is still the same"],
      [107816, "Sunshine in the rain"],
      [109713, "(Sunshine in the rain)"],
      [111589, "Sunshine in the rain,"],
      [113387, "love is still the same"],
      [115290, "Sunshine in the rain"],
      [117229, "(Sunshine in the rain)"],
      [133469, "When I'm in Berlin,"],
      [135747, "you're off to London"],
      [137695, "When I'm in New York,"],
      [139409, "you're doing Rome"],
      [141500, "All those crazy nights"],
      [143219, "we spend together"],
      [145319, "As voices on the phone"],
      [149323, "Can you feel the"],
      [150213, "raindrops in the desert?"],
      [152791, "Have you seen the"],
      [153964, "sunrays in the dark?"],
      [156576, "Do you feel my love"],
      [158165, "when I'm not present"],
      [160411, "Standing by your side"],
      [161935, "while miles apart?"],
      [163979, "Sunshine in the rain,"],
      [165850, "love is still the same"],
      [167768, "Sunshine in the rain"],
      [169605, "(Sunshine in the rain)"],
      [171529, "Sunshine in the rain,"],
      [173447, "love is still the same"],
      [175305, "Sunshine in the rain"],
      [177295, "(Sunshine in the rain)"],
      [179101, "Can you feel the"],
      [180251, "raindrops in the desert?"],
      [182749, "Have you seen the"],
      [183974, "sunrays in the dark?"],
      [186509, "Do you feel my love"],
      [188113, "when I'm not present"],
      [190251, "Standing by your side"],
      [191846, "while miles apart?"],
      [193926, "Sunshine in the rain,"],
      [195913, "love is still the same"],
      [197747, "Sunshine in the rain"],
      [199639, "(sunshine in the rain)"],
      [201565, "Sunshine in the rain,"],
      [203376, "love is still the same"],
      [205369, "Sunshine in the rain"],
    ],
  },
  {
    name: "Post Malone - Circles",
    url: "https://www.youtube.com/watch?v=wXhTHyIgQ_U",
    lyrics: [
      [32944, "We couldn't turn around"],
      [36655, "'Til we were upside down"],
      [40486, "I'll be the bad guy now"],
      [44400, "But know I ain't too proud"],
      [48222, "I couldn't be there"],
      [52400, "Even when I tried"],
      [56052, "You don't believe it"],
      [59850, "We do this every time"],
      [61700, "Seasons change and"],
      [63030, "our love went cold"],
      [65657, "Feed the flame 'cause"],
      [66815, "we can't let go"],
      [69480, "Run away,"],
      [70393, "but we're running in circles"],
      [73303, "Run away, run away"],
      [75707, "I dare you to do something"],
      [79469, "I'm waiting on you again"],
      [82869, "So I don't take the blame"],
      [84825, "Run away,"],
      [85774, "but we're running in circles"],
      [88717, "Run away, run away, run away"],
      [92500, "Let go"],
      [94369, "I got a feeling that"],
      [95726, "it's time to let go"],
      [99469, "I say so"],
      [102081, "I knew that this was doomed"],
      [103671, "from the get-go"],
      [106543, "You thought that it was"],
      [107463, "special, special"],
      [110069, "But it was just the Sex,"],
      [111805, "though, the Sex, though"],
      [113890, "And I still hear the echoes"],
      [116380, "(the echoes)"],
      [117500, "I got a feeling that it's time"],
      [119400, "to let it go, let it go"],
      [123420, "Seasons change and"],
      [124483, "our love went cold"],
      [127155, "Feed the flame"],
      [128056, "'cause we can't let go"],
      [131042, "Run away,"],
      [131953, "but we're running in circles"],
      [134844, "Run away, run away"],
      [137078, "I dare you to do something"],
      [140928, "I'm waiting on you again"],
      [144396, "So I don't take the blame"],
      [146380, "Run away,"],
      [147700, "but we're running in circles"],
      [150295, "Run away, run away, run away"],
      [154193, "Maybe you don't understand"],
      [155795, "what I'm going through"],
      [157969, "It's only me"],
      [159888, "What you got to lose?"],
      [161853, "Make up your mind, tell me"],
      [163240, "What are you gonna do?"],
      [165595, "It's only me"],
      [167420, "Let it go"],
      [169481, "Seasons change and"],
      [170628, "our love went cold"],
      [173296, "Feed the flame"],
      [174285, "'cause we can't let go"],
      [177132, "Run away,"],
      [178091, "but we're running in circles"],
      [180999, "Run away, run away"],
      [183200, "I dare you to do something"],
      [187000, "I'm waiting on you again"],
      [190420, "So I don't take the blame"],
      [192551, "Run away,"],
      [193479, "but we're running in circles"],
      [196456, "Run away, run away, run away"],
    ],
  },
  {
    name: "Lady Gaga - Poker Face",
    url: "https://www.youtube.com/watch?v=bESGLojNYSo",
    lyrics: [
      [7500, "Mum-mum-mum-mah"],
      [11666, "Mum-mum-mum-mah"],
      [15600, "Mum-mum-mum-mah"],
      [19696, "Mum-mum-mum-mah"],
      [23555, "Mum-mum-mum-mah"],
      [24654, "I wanna hold 'em like"],
      [25721, "they do in Texas, please (Woo)"],
      [28369, "Fold 'em, let 'em hit me,"],
      [29648, "raise it, baby, stay with me"],
      [31440, "(I love it)"],
      [32330, "LoveGame intuition,"],
      [33677, "play the cards with"],
      [34691, "spades to start"],
      [36000, "And after he's been hooked,"],
      [37399, "I'll play the one"],
      [38376, "that's on his heart"],
      [40569, "Oh, woah-oh, oh, oh"],
      [42973, "Oh-oh-oh-oh-oh-oh"],
      [44350, "I'll get him hot,"],
      [45600, "show him what I've got"],
      [48313, "Oh, woah-oh, oh, oh"],
      [51103, "Oh-oh-oh-oh-oh-oh"],
      [52335, "I'll get him hot,"],
      [54114, "show him what I've got"],
      [56715, "Can't read my, can't read my"],
      [58586, "No, he cant read my poker face"],
      [62427, "(She's got me like nobody)"],
      [64748, "Can't read my, can't read my"],
      [66620, "No, he cant read my poker face"],
      [70553, "(She's got me like nobody)"],
      [72792, "P-p-p-poker face,"],
      [74156, "f-f-fuck her face"],
      [76000, "(Mum-mum-mum-mah)"],
      [76878, "P-p-p-poker face,"],
      [78270, "f-f-fuck her face"],
      [79882, "(Mum-mum-mum-mah)"],
      [80951, "I wanna roll with him,"],
      [82369, "a hard pair we will be (Woo)"],
      [84700, "A little gamblin' is fun"],
      [86898, "when you're with me"],
      [88696, "(I love it, woo)"],
      [89345, "Russian roulette is"],
      [90169, "not the same without a gun"],
      [92655, "And baby, when it's love,"],
      [93849, "if its not rough, it isnt fun,"],
      [96153, "fun"],
      [96969, "Oh, woah-oh, oh, oh"],
      [98623, "Oh-oh-oh-oh-oh-oh"],
      [100808, "I'll get him hot,"],
      [102286, "show him what I've got"],
      [104800, "Oh, woah-oh, oh, oh"],
      [106841, "Oh-oh-oh-oh-oh-oh"],
      [109069, "I'll get him hot,"],
      [110444, "show him what I've got"],
      [113124, "Can't read my, can't read my"],
      [115048, "No, he cant read my poker face"],
      [118922, "(She's got me like nobody)"],
      [121193, "Can't read my, can't read my"],
      [123087, "No, he cant read my poker face"],
      [126995, "(She's got me like nobody)"],
      [129214, "P-p-p-poker face,"],
      [130687, "f-f-fuck her face"],
      [132394, "(Mum-mum-mum-mah)"],
      [133428, "P-p-p-poker face,"],
      [134758, "f-f-fuck her face"],
      [136258, "(Mum-mum-mum-mah)"],
      [140777, "(Mum-mum-mum-mah)"],
      [144900, "I won't tell you"],
      [145900, "that I love you"],
      [147000, "Kiss or hug you"],
      [147869, "'Cause I'm bluffin'"],
      [148584, "with my muffin"],
      [149637, "I'm not lyin',"],
      [150541, "I'm just stunnin' with"],
      [151899, "my love-glue-gunnin'"],
      [153500, "Just like a chick"],
      [154405, "in the casino"],
      [155661, "Take your bank"],
      [156475, "before I pay you out"],
      [157978, "I promise this, promise this"],
      [159982, "Check this hand"],
      [160596, "'cause I'm marvelous"],
      [161676, "Can't read my, can't read my"],
      [163451, "No, he cant read my poker face"],
      [167334, "(She's got me like nobody)"],
      [169544, "Can't read my, can't read my"],
      [171555, "No, he cant read my poker face"],
      [175397, "(She's got me like nobody)"],
      [177627, "Can't read my, can't read my"],
      [179652, "No, he cant read my poker face"],
      [183462, "(She's got me like nobody)"],
      [185724, "Can't read my, can't read my"],
      [187648, "No, he cant read my poker face"],
      [191486, "(She's got me like nobody)"],
      [193770, "Can't read my, can't read my"],
      [195740, "No, he cant read my poker face"],
      [199606, "(She's got me like nobody)"],
      [201869, "Can't read my, can't read my"],
      [203808, "No, he cant read my poker face"],
      [207635, "(She's got me like nobody)"],
      [209869, "P-p-p-poker face,"],
      [211395, "f-f-fuck her face"],
      [213869, "P-p-p-poker face,"],
      [215401, "f-f-fuck her face"],
      [216222, "(She's got me like nobody)"],
      [217868, "P-p-p-poker face,"],
      [219458, "f-f-fuck her face"],
      [220967, "(Mum-mum-mum-mah)"],
      [222124, "P-p-p-poker face,"],
      [223549, "f-f-fuck her face"],
    ],
  },
  {
    name: "Sam Gellaitry - Assumptions",
    url: "https://www.youtube.com/watch?v=T9Ybj8nrtQw",
    lyrics: [
      [60400, "If it's love that you want,"],
      [62769, "I'll give my everything"],
      [67800, "And have I made the"],
      [68886, "right assumption?"],
      [70819, "Do you feel the same?"],
      [75756, "If it's love that you want,"],
      [78300, "I'll give my everything"],
      [83100, "And have I made the"],
      [84030, "right assumption?"],
      [86063, "Do you feel the same?"],
      [121469, "If it's love that you want,"],
      [124024, "I'll give my everything"],
      [128900, "And have I made the"],
      [129850, "right assumption?"],
      [131661, "Do you feel the same?"],
      [136600, "If it's love that you want,"],
      [139287, "I'll give my everything"],
      [143969, "And have I made the"],
      [144889, "right assumption?"],
      [146972, "Do you feel the same?"],
      [167728, "Love that you want,"],
      [169667, "I'll give my everything"],
      [174469, "And have I made the"],
      [175474, "right assumption?"],
      [177398, "Do you feel the same?"],
      [182400, "If it's love that you want,"],
      [184800, "I'll give my everything"],
      [189696, "And have I made the"],
      [190600, "right assumption?"],
      [192745, "Do you feel the same?"],
    ],
  },
  {
    name: "Sia - Cheap Thrills",
    url: "https://www.youtube.com/watch?v=31crA53Dgu0",
    lyrics: [
      [10883, "Come on, come on,"],
      [11732, "turn the radio on"],
      [13421, "It's Friday night"],
      [14510, "and I won't be long"],
      [15944, "Gotta do my hair,"],
      [17139, "put my make up on"],
      [18888, "It's Friday night"],
      [19863, "and I won't be long"],
      [21292, "'Til I hit the dance floor,"],
      [23064, "hit the dance floor"],
      [24248, "I got all I need"],
      [26786, "No, I ain't got cash,"],
      [28124, "I ain't got cash"],
      [29483, "But I got you, baby"],
      [31969, "Baby, I don't need dollar"],
      [34169, "bills to have fun tonight"],
      [35923, "(I love cheap thrills)"],
      [37252, "Baby, I don't need dollar"],
      [39407, "bills to have fun tonight"],
      [41295, "(I love cheap thrills)"],
      [43000, "I don't need no money"],
      [48275, "As long as I can feel the beat"],
      [53758, "I don't need no money"],
      [59077, "As long as I keep dancing"],
      [64400, "Come on, come on,"],
      [65400, "turn the radio on"],
      [66926, "It's Saturday"],
      [68000, "and I won't be long"],
      [69500, "Gotta paint my nails,"],
      [70724, "put my high heels on"],
      [72339, "It's Saturday"],
      [73368, "and I won't be long"],
      [74727, "'Til I hit the dance floor,"],
      [76609, "hit the dance floor"],
      [77854, "I got all I need"],
      [80163, "No, I ain't got cash,"],
      [81645, "I ain't got cash"],
      [83017, "But I got you, baby"],
      [85524, "Baby, I don't need dollar"],
      [87653, "bills to have fun tonight"],
      [89498, "(I love cheap thrills)"],
      [91031, "Baby, I don't need dollar"],
      [92982, "bills to have fun tonight"],
      [94845, "(I love cheap thrills)"],
      [96494, "I don't need no money"],
      [102000, "As long as I can feel the beat"],
      [107400, "I don't need no money"],
      [112699, "As long as I keep dancing"],
      [121700, "(I love cheap thrills)"],
      [127200, "(I love cheap thrills)"],
      [128820, "I don't need no money"],
      [134086, "As long as I can feel the beat"],
      [139501, "I don't need no money"],
      [144800, "As long as I keep dancing"],
      [149069, "(Oh, oh, oh)"],
      [150300, "Baby, I don't need dollar"],
      [152138, "bills to have fun tonight"],
      [154025, "(I love cheap thrills)"],
      [155500, "Baby, I don't need dollar"],
      [157360, "bills to have fun tonight"],
      [159213, "(I love cheap thrills)"],
      [160736, "I don't need no money"],
      [166313, "As long as I can feel the beat"],
      [171761, "I don't need no money"],
      [177068, "As long as I keep dancing"],
      [182600, "La, la, la, la, la, la, la"],
      [186969, "(I love cheap thrills)"],
      [188169, "La, la, la, la, la, la, la"],
      [191869, "(I love cheap thrills)"],
      [193200, "La, la, la, la, la, la, la"],
      [196700, "(I love cheap thrills)"],
      [198708, "La, la, la, la, la, la, la"],
      [202137, "(I love cheap thrills)"],
    ],
  },
  {
    name: "ATC - Around The World",
    url: "https://www.youtube.com/watch?v=4O86JJHoiRg",
    lyrics: [
      [8000, "The kisses of the sun"],
      [10147, "were sweet, I didn't blink"],
      [11527, "I let it in my eyes"],
      [13736, "like an exotic dream"],
      [15121, "The radio playing songs"],
      [17420, "that I have never heard"],
      [18690, "I don't know what to say,"],
      [21036, "oh, not another word"],
      [22326, "Just la la la la la,"],
      [24696, "it goes around the world"],
      [26049, "Just la la la la la,"],
      [28404, "it's all around the world"],
      [29673, "Just la la la la la,"],
      [32012, "and everybody's singing"],
      [33520, "La la la la la,"],
      [35631, "and now the bells are ringing"],
      [37125, "La la la la la,"],
      [39296, "la la la la la la la,"],
      [40765, "la la la la la,"],
      [42868, "la la la la la la la"],
      [44444, "La la la la la,"],
      [46483, "la la la la la la la,"],
      [48049, "la la la la la,"],
      [50102, "la la la la la la la"],
      [66222, "Inside an empty room,"],
      [68365, "my inspiration flows"],
      [69703, "Now wait to hear the tune,"],
      [71970, "around my head it goes"],
      [73363, "The magic melody,"],
      [75643, "you want to sing with me"],
      [76953, "Just la la la la la,"],
      [79244, "the music is the key"],
      [80618, "And now the night is gone,"],
      [82896, "still it goes on and on"],
      [84569, "So deep inside of me,"],
      [86569, "I long to set it free"],
      [87798, "I don't know what to do,"],
      [90148, "just can't explain to you"],
      [91520, "I don't know what to say,"],
      [93719, "oh, not another word"],
      [95102, "Just la la la la la,"],
      [97370, "it goes around the world"],
      [98686, "Just la la la la la,"],
      [100998, "it's all around the world"],
      [102346, "Just la la la la la,"],
      [104654, "and everybody's singing"],
      [106265, "La la la la la,"],
      [108335, "and now the bells are ringing"],
      [109934, "La la la la la,"],
      [111990, "la la la la la la la,"],
      [113570, "la la la la la,"],
      [115638, "la la la la la la la"],
      [117158, "La la la la la,"],
      [119243, "la la la la la la la,"],
      [120760, "la la la la la,"],
      [122783, "la la la la la la la"],
      [140666, "The kisses of the sun"],
      [141800, "kisses of the sun,"],
      [143170, "of the sun, of the sun"],
      [146269, "Around, around, around,"],
      [148656, "around, around, around,"],
      [151500, "around the world"],
      [155651, "La la la la la,"],
      [157368, "it goes around the world"],
      [158756, "Just la la la la la,"],
      [160996, "it's all around the world"],
      [162378, "Just la la la la la,"],
      [164677, "and everybody's singing"],
      [166255, "La la la la la,"],
      [168325, "and now the bells are ringing"],
      [169839, "La la la la la,"],
      [171969, "la la la la la la la,"],
      [173548, "la la la la la,"],
      [175599, "la la la la la la la"],
      [176854, "La la la la la,"],
      [179229, "la la la la la la la,"],
      [180845, "la la la la la,"],
      [182973, "la la la la la la la"],
      [184457, "La la la la la,"],
      [186209, "la la la la la la la"],
      [188100, "La la la la la,"],
      [190191, "la la la la la la la,"],
      [191725, "La la la la la,"],
      [193897, "la la la la la la la"],
      [195401, "La la la la la,"],
      [197444, "la la la la la la la"],
    ],
  },
  {
    name: "Edward Sharpe - Home",
    url: "https://www.youtube.com/watch?v=DHEOF_rcND8",
    lyrics: [
      [18904, "Alabama, Arkansas"],
      [21420, "I do love my ma and pa"],
      [23135, "Not that way that"],
      [24222, "I do love you"],
      [27329, "Well, holy moly, me oh my"],
      [29568, "You're the apple of my eye"],
      [31750, "Girl, I've never"],
      [32802, "loved one like you"],
      [35957, "Man, oh man,"],
      [36756, "you're my best friend"],
      [38000, "I scream it to"],
      [38852, "the nothingness"],
      [40696, "There aint nothing that I need"],
      [44250, "Well, hot and heavy,"],
      [45575, "pumpkin pie"],
      [46620, "Chocolate candy,"],
      [47712, "Jesus Christ"],
      [48843, "Ain't nothing please"],
      [50100, "me more than you"],
      [52800, "Oh, home, let me come home"],
      [57269, "Home is wherever I'm with you"],
      [61250, "Oh, home, let me come home"],
      [65835, "Home is wherever I'm with you"],
      [84969, "La, la, la, la, take me home"],
      [90069, "(Daddy) Mother, Im coming home"],
      [114200, "I'll follow you into the park"],
      [116453, "Through the jungle,"],
      [117525, "through the dark"],
      [118687, "Girl, I never"],
      [119678, "loved one like you (hey)"],
      [122943, "Moats and boats and waterfalls"],
      [125210, "Alleyways and pay phone calls"],
      [127420, "I've been everywhere"],
      [129200, "(hey) with you"],
      [130569, "That's true,"],
      [131696, "laugh until we think we'll die"],
      [133869, "Barefoot on a summer night"],
      [135918, "Never could be sweeter"],
      [137469, "than with you (hey)"],
      [140200, "And in the streets"],
      [141174, "you run a-free"],
      [142452, "Like it's only you and me"],
      [144654, "Geez, you're something to see"],
      [148395, "Oh, home, let me come home"],
      [153334, "Home is wherever I'm with you"],
      [157269, "Oh, home, let me come home"],
      [161840, "Home is wherever I'm with you"],
      [181000, "La, la, la, la, take me home"],
      [186532, "(Daddy) Mother, Im coming home"],
      [193933, "Jade"],
      [194859, "Alexander"],
      [196300, "Do you remember that day"],
      [197379, "you fell out of my window?"],
      [198899, "I sure do, you came"],
      [199956, "jumping out after me"],
      [202000, "Well, you fell on the concrete"],
      [204123, "nearly broke your ass"],
      [205117, "And you were bleedin'"],
      [206015, "all over the place"],
      [206983, "And I rushed you out to the"],
      [208067, "hospital, you remember that?"],
      [209311, "Yes, I do"],
      [210300, "Well, theres something I never"],
      [211270, "told you about that night"],
      [212757, "What didn't you tell me?"],
      [214222, "While you were sitting in the"],
      [215200, "backseat smoking a cigarette"],
      [217038, "You thought was gonna"],
      [217847, "be your last"],
      [219500, "I was falling deep,"],
      [221192, "deeply in love with you"],
      [223400, "And I never told you"],
      [224800, "'til just now"],
      [225901, "Aww"],
      [227545, "Oh, home, let me come home"],
      [231988, "Home is wherever I'm with you"],
      [235866, "Oh, home, let me come home"],
      [240696, "Home is where I'm"],
      [242000, "alone with you"],
      [244780, "Home, let me come home"],
      [249397, "Home is wherever I'm with you"],
      [253686, "Oh, home, yes, I am home"],
      [258716, "Home is when I'm"],
      [260275, "alone with you"],
      [263289, "Alabama, Arkansas"],
      [267569, "I do love my ma and pa"],
      [271618, "Moats and boats and waterfalls"],
      [275960, "Alleyways and pay phone calls"],
      [284569, "Home is when"],
      [285600, "I'm alone with you"],
      [293000, "Home is when"],
      [294081, "I'm alone with you"],
    ],
  },
  {
    name: "NCS - MATAFAKA",
    url: "https://ncs.io/track/download/73f99b09-2aab-4e7f-b3d2-384093a92d7f",
    lyrics: [
      [27769, "Matafaka, matafaka"],
      [48000, "Matafaka, matafaka"],
      [90696, "Uh, thank God that"],
      [91960, "the brother's on the rise now"],
      [93777, "Endless celebrations"],
      [94772, "all at my house"],
      [96300, "Levitatin' now I'm"],
      [96935, "super duper fly now"],
      [98696, "Lemon boy but they"],
      [99560, "see why I reside now"],
      [100900, "Put the time in while you"],
      [102064, "always yellin' time out"],
      [103700, "Fa critic 'cause I"],
      [104218, "know I'm comin' wit it"],
      [105761, "You were sittin"],
      [106387, "you were wishin,"],
      [106939, "I was handlin' my business"],
      [108300, "Now I got the ball like"],
      [109300, "Harry Potter playin' Quidditch"],
      [110625, "And my nuts are so humongous"],
      [111722, "you would think that"],
      [112514, "Hagrid's in it"],
      [113200, "Ah man, I'm all bad,"],
      [114721, "yeah I'm all bad"],
      [115888, "Workin' for that whip, yeah"],
      [116989, "that what you call that"],
      [118202, "I'ma blow up in the summer"],
      [119437, "have 'em yellin', \"Fall back\""],
      [120643, "And I've always been ahead"],
      [121978, "like an effin ball cap"],
      [123304, "Man, I came in the"],
      [124329, 'game like, "Woah"'],
      [125331, "Gotta couple chains on"],
      [126412, "me 'cause I like gold"],
      [127747, "They told me I'm the best,"],
      [128733, 'and I told \'em, "I know"'],
      [130350, "'Cause when I'm in your"],
      [131188, "town every ticket I sold"],
      [133589, "Yeah, they sayin' I'm"],
      [134808, "the man, facts bro"],
      [136591, "A lot of haters, tell"],
      [137706, "me where they at though"],
      [138864, "I'm the new pop all"],
      [140018, "I do is rap dough"],
      [141365, '"Want me on your song?"'],
      [142492, "Throw a couple stacks yo"],
      [144500, "Everybody wanna"],
      [145336, "do the same thing"],
      [146754, "That's why we ain't"],
      [148081, "on the same page"],
      [149348, "Do my own thing,"],
      [150200, "and I maintain"],
      [151764, "Flow like water so"],
      [152842, "I'm goin' mainstream"],
      [155308, "I'm goin' mainstream"],
      [156888, "Flow like water so"],
      [157848, "I'm goin' mainstream"],
      [160095, "Yeah, I'm goin' mainstream"],
      [161840, "Flow like water so"],
      [163000, "I'm goin' mainstream"],
      [165600, "I'm going mainstream"],
      [168300, "Mainstream"],
      [172000, "Flow like water so"],
      [173064, "I'm goin' mainstream"],
      [177000, "Yup"],
      [183615, "I'm goin' mainstream"],
      [186930, "Damn"],
      [192115, "Flow like water so"],
      [193132, "I'm goin' mainstream"],
      [196813, "Wooh"],
      [203444, "I'm goin' mainstream"],
      [212400, "Flow like water so"],
      [213421, "I'm goin' mainstream"],
      [215000, "They sayin' I'm"],
      [215696, "the man, facts bro"],
      [217369, "A lot of haters, tell"],
      [218700, "me where they at though"],
      [220000, "I'm the new pop all"],
      [221080, "I do is rap dough"],
      [222233, '"Want me on your song?"'],
      [223270, "Throw a couple stacks yo"],
      [225138, "Everybody wanna"],
      [226185, "do the same thing"],
      [227662, "That's why we ain't"],
      [228949, "on the same page"],
      [230224, "Do my own thing,"],
      [231500, "and I maintain"],
      [232585, "Flow like water so"],
      [233700, "I'm goin' mainstream"],
      [236488, "I'm goin' mainstream"],
      [237842, "Flow like water so"],
      [238658, "I'm goin' mainstream"],
      [240700, "Yeah, I'm goin' mainstream"],
      [242696, "Flow like water so"],
      [243800, "I'm goin' mainstream"],
      [246489, "I'm goin' mainstream"],
      [249308, "Mainstream"],
      [252903, "Flow like water so"],
      [253917, "I'm goin' mainstream"],
    ],
  },
  {
    name: "Yungatina - 7 Weeks 3 Days",
    lyrics: [
      [15469, "When we met, I just knew"],
      [18004, "That I already loved you,"],
      [19907, "true, true"],
      [22551, "I didn't even get it why"],
      [26231, "Why you gotta stare"],
      [27544, "with those eyes?"],
      [30013, "I'm right across"],
      [30735, "the dance floor"],
      [32735, "Like it was just last night"],
      [37240, "I didn't even get it why"],
      [41076, "Why you gotta say goodbye?"],
      [44700, "I should have called"],
      [45400, "him by his last name"],
      [47333, "It's been seven weeks"],
      [48800, "and three days"],
      [52110, "I should have called"],
      [52836, "him by his last name"],
      [55555, "It's been seven weeks"],
      [56950, "and three days"],
      [59519, "I should have called"],
      [60300, "him by his last name"],
      [62100, "It's been seven weeks"],
      [63700, "and three days"],
      [66830, "I should have called"],
      [67542, "him by his last name"],
      [70615, "It's been seven weeks"],
      [71693, "and three days"],
      [74500, "Boy, I let you in"],
      [76969, "You didn't even have to knock"],
      [81629, "An extra key on the first day"],
      [85519, "I know the sheets"],
      [86166, "by the first date"],
      [89000, "We really made somethin'"],
      [91869, "A miracle that most won't see"],
      [96345, "But it meant a lot to me"],
      [100109, "I don't get why you"],
      [101018, "had to leave"],
      [103768, "I should have called"],
      [104521, "him by his last name"],
      [106400, "It's been seven weeks"],
      [107973, "and three days"],
      [111125, "I should have called"],
      [111856, "him by his last name"],
      [114923, "It's been seven weeks"],
      [116039, "and three days"],
      [118539, "I should have called"],
      [119300, "him by his last name"],
      [121400, "It's been seven weeks"],
      [122790, "and three days"],
      [125950, "I should have called"],
      [126769, "him by his last name"],
      [129588, "It's been seven weeks"],
      [130772, "and three days"],
      [133396, "All my friends say, fuck you!"],
      [136060, "But I can't even help"],
      [137459, "but love you"],
      [140736, "And even though you"],
      [141636, "run me out dry"],
      [144400, "I still think you're"],
      [145200, "a decent guy, why?"],
      [162979, "I should have called"],
      [163662, "him by his last name"],
      [165500, "It's been seven weeks"],
      [166881, "and three days"],
      [170180, "I should have called"],
      [170973, "him by his last name"],
      [173911, "It's been seven weeks"],
      [175137, "and three days"],
      [177631, "I should have called"],
      [178249, "him by his last name"],
      [181276, "It's been seven weeks"],
      [182558, "and three days"],
      [184969, "I should have called"],
      [185700, "him by his last name"],
      [187900, "It's been seven weeks"],
      [189150, "and three days, days"],
    ],
  },
  {
    name: "ABBA - Gimme Gimme Gimme",
    lyrics: [
      [36154, "Half past twelve"],
      [38000, "And I'm watchin' the late show"],
      [39927, "in my flat, all alone"],
      [41861, "How I hate to spend"],
      [42969, "the evening on my own"],
      [46500, "Autumn winds"],
      [47863, "Blowin' outside the window"],
      [49851, "as I look around the room"],
      [51900, "And it makes me so depressed"],
      [53607, "to see the gloom"],
      [57000, "There's not a soul out there"],
      [60844, "No one to hear my prayer"],
      [68506, "Gimme, gimme, gimme"],
      [69925, "a man after midnight"],
      [72489, "Won't somebody help me"],
      [74042, "chase these shadows away?"],
      [76630, "Gimme, gimme, gimme"],
      [78054, "a man after midnight"],
      [80310, "Take me through the darkness"],
      [81940, "to the break of the day"],
      [104666, "Movie stars"],
      [106200, "Find the end of the rainbow"],
      [108198, "with a fortune to win"],
      [109961, "It's so different from"],
      [111291, "the world I'm living in"],
      [114765, "Tired of TV"],
      [116600, "I open the window"],
      [118221, "and I gaze into the night"],
      [120176, "But there's nothing"],
      [121208, "there to see, no one in sight"],
      [125400, "There's not a soul out there"],
      [129180, "No one to hear my prayer"],
      [136897, "Gimme, gimme, gimme"],
      [138365, "a man after midnight"],
      [140688, "Won't somebody help me"],
      [142380, "chase these shadows away?"],
      [144997, "Gimme, gimme, gimme"],
      [146500, "a man after midnight"],
      [148517, "Take me through the darkness"],
      [150330, "to the break of the day"],
      [153273, "Gimme, gimme, gimme"],
      [154461, "a man after midnight"],
      [161278, "Gimme, gimme, gimme"],
      [162487, "a man after midnight"],
      [220555, "There's not a soul out there"],
      [224478, "No one to hear my prayer"],
      [232240, "Gimme, gimme, gimme"],
      [233628, "a man after midnight"],
      [236180, "Won't somebody help me"],
      [237630, "chase these shadows away?"],
      [240256, "Gimme, gimme, gimme"],
      [241650, "a man after midnight"],
      [243998, "Take me through the darkness"],
      [245584, "to the break of the day"],
      [248150, "Gimme, gimme, gimme"],
      [249645, "a man after midnight"],
      [251905, "Won't somebody help me"],
      [253531, "chase these shadows away?"],
      [256205, "Gimme, gimme, gimme"],
      [257617, "a man after midnight"],
      [259823, "Take me through the darkness"],
      [261543, "to the break of the day"],
    ],
  },
  {
    name: "One Direction - What Makes You Beautiful",
    lyrics: [
      [6755, "You're insecure,"],
      [8671, "don't know what for"],
      [10589, "You're turnin' heads"],
      [11748, "when you walk through the door"],
      [14387, "Don't need makeup"],
      [16391, "to cover up (Huh)"],
      [18249, "Bein' the way"],
      [19524, "that you are is enough"],
      [22869, "Everyone else in the"],
      [24627, "room can see it"],
      [26577, "Everyone else but you"],
      [29762, "Baby, you light up my world"],
      [31726, "like nobody else"],
      [33550, "The way that you flip your"],
      [35237, "hair gets me overwhelmed"],
      [37467, "But when you smile at the"],
      [39032, "ground, it ain't hard to tell"],
      [41259, "You don't know, oh-oh,"],
      [43862, "you dont know you're beautiful"],
      [45827, "If only you saw what I can see"],
      [48987, "You'll understand why"],
      [50300, "I want you so desperately"],
      [52731, "Right now I'm looking"],
      [54185, "at you and I can't believe"],
      [56701, "You don't know, oh-oh,"],
      [59238, "you dont know you're beautiful"],
      [61866, "oh-oh"],
      [63040, "Thats what makes you beautiful"],
      [68069, "So c-come on, you got it wrong"],
      [72002, "To prove I'm right,"],
      [73153, "I put it in a song"],
      [75794, "I don't know why"],
      [77767, "you're being shy"],
      [79744, "And turn away when"],
      [81014, "I look into your eyes"],
      [84196, "Everyone else in the"],
      [86069, "room can see it"],
      [88046, "Everyone else but you"],
      [91195, "Baby, you light up my"],
      [92809, "world like nobody else"],
      [95065, "The way that you flip your"],
      [96730, "hair gets me overwhelmed"],
      [98762, "But when you smile at the"],
      [100486, "ground, it ain't hard to tell"],
      [102677, "You don't know, oh-oh,"],
      [105315, "you dont know you're beautiful"],
      [107248, "If only you saw what I can see"],
      [110359, "You'll understand why"],
      [111673, "I want you so desperately"],
      [114054, "Right now I'm looking"],
      [115584, "at you and I can't believe"],
      [118040, "You don't know, oh-oh,"],
      [120610, "you dont know you're beautiful"],
      [123285, "oh-oh"],
      [124440, "Thats what makes you beautiful"],
      [127023, "Na, na-na-na, na-na-na, na, na"],
      [130275, "Na, na-na-na, na-na"],
      [134269, "Na, na-na-na, na-na-na, na, na"],
      [137947, "Na, na-na-na, na-na"],
      [141065, "Baby, you light up my world"],
      [143125, "like nobody else"],
      [144946, "The way that you flip your"],
      [146769, "hair gets me overwhelmed"],
      [148797, "But when you smile at the"],
      [150449, "ground, it ain't hard to tell"],
      [152684, "(You don't know, oh-oh)"],
      [155257, "You dont know you're beautiful"],
      [156666, "Baby, you light up my world"],
      [158415, "like nobody else"],
      [160242, "The way that you flip your"],
      [162099, "hair Cmon gets me overwhelmed"],
      [164116, "But when you smile at the"],
      [165735, "ground, it ain't hard to tell"],
      [167975, "You don't know, oh-oh,"],
      [170595, "you dont know you're beautiful"],
      [172614, "If only you saw what I can see"],
      [175609, "You'll understand why"],
      [177025, "I want you so desperately"],
      [179459, "Right now I'm looking"],
      [180956, "at you and I can't believe"],
      [183277, "You don't know oh-oh,"],
      [185983, "you dont know you're beautiful"],
      [188557, "oh-oh"],
      [189807, "You dont know you're beautiful"],
      [192498, "oh-oh"],
      [193665, "Thats what makes you beautiful"],
    ],
  },
  {
    name: "The Coconut Song",
    url: "https://www.youtube.com/watch?v=PKQPey6L42M",
    lyrics: [
      [300, "La la la, la la la la,"],
      [2238, "la la la la la la"],
      [3847, "La la la, la la la la,"],
      [5872, "la la la la la la"],
      [7549, "La la la, la la la la,"],
      [9376, "la la la la la la"],
      [11039, "La la la, la la la la,"],
      [13054, "la la la la la la"],
      [14624, "KO KO NUT"],
      [16210, "KO KO KO KO NUT"],
      [17620, "(kokonut)"],
      [18469, "KO KO NUT"],
      [19697, "KO KO KO KO KO NUT"],
      [20974, "(kokonut)"],
      [21913, "KO KO NUT"],
      [23181, "KO KO KO KO KO NUT"],
      [24576, "(kokonut)"],
      [25476, "KO KO NUT"],
      [26701, "KO KO KO KO KO NUT"],
      [28647, "The kokonut nut"],
      [30081, "Is a giant nut"],
      [31813, "If you eat too much..."],
      [33417, "You'll get VERY fat!!!"],
      [35291, "Now"],
      [35958, "The kokonut nut"],
      [37331, "Is a big big nut"],
      [38895, "But this delicious nut..."],
      [40908, "Is NOT a nut!!!"],
      [42719, "It's a koko fruit"],
      [44502, "(It's a koko fruit)"],
      [46268, "Of the koko tree"],
      [47969, "(Of the koko tree)"],
      [49835, "From the koko palm family"],
      [52607, "La la la la la"],
      [53940, "There are so many uses"],
      [55274, "Of the kokonut tree"],
      [57242, "You can build a bigger"],
      [58512, "House for the family"],
      [60656, "All you need is to"],
      [62333, "Find the kokonut man"],
      [64737, "If he cuts the tree..."],
      [66302, "I get the fruits free!!!"],
      [68421, "It's a koko fruit"],
      [69966, "(It's a koko fruit)"],
      [71725, "Of the koko tree"],
      [73555, "(Of the koko tree)"],
      [75320, "From the koko palm family"],
      [78193, "La la la la la"],
      [79695, "KO KO NUT"],
      [81110, "KO KO KO KO KO NUT"],
      [82697, "(kokonut)"],
      [83559, "KO KO NUT"],
      [84605, "KO KO KO KO KO NUT"],
      [86567, "The kokonut bark for"],
      [88286, "the kitchen floor"],
      [89676, "If you save some of it..."],
      [91561, "You can build a door"],
      [93401, "Now"],
      [94110, "The kokonut trunk"],
      [95293, "Do not throw this junk"],
      [97138, "If you save some of it..."],
      [98638, "You'll have a second floor!!!"],
      [101111, "The kokonut wood"],
      [102480, "Is very good"],
      [104428, "It can stand 20 years..."],
      [106121, "If you pray it wood!!! :D"],
      [107809, "Now"],
      [108400, "The kokonut root"],
      [109821, "To tell you the truth"],
      [111387, "You can throw it..."],
      [112719, "Or use it as firewood!!!"],
      [115338, "The kokonut leaves"],
      [117128, "Good shade it gives"],
      [119053, "For the roof..."],
      [119975, "For the walls up"],
      [120928, "against the theives!!!"],
      [122441, "Now"],
      [123073, "The kokonut fruit"],
      [124486, "Says my relatives"],
      [126029, "Makes good cannon balls..."],
      [128202, "Up against the thieves!!!"],
      [129928, "It's a kokofruit"],
      [131557, "(It's a koko fruit)"],
      [133410, "Of the koko tree"],
      [135216, "(Of the koko tree)"],
      [137017, "From the koko palm family"],
      [139702, "La la la la la"],
      [141221, "The kokonut nut"],
      [142560, "Is a giant nut"],
      [144156, "If you eat too much..."],
      [145809, "You'll get very fat!!!"],
      [147732, "Now"],
      [148402, "The kokonut nut"],
      [149549, "Is a big big nut"],
      [151303, "But this delicious nut..."],
      [153317, "Is not a nut!!!"],
      [154817, "The kokonut nut"],
      [156762, "Is a giant nut"],
      [158314, "If you eat too much..."],
      [160037, "You'll get very fat!!!"],
      [161888, "Now"],
      [162400, "The kokonut nut"],
      [163918, "Is a big big nut"],
      [165493, "But this delicious nut..."],
      [167340, "Is not a nut!!!"],
      [168950, "It's a koko fruit"],
      [170888, "(It's a koko fruit)"],
      [172653, "Of the koko tree"],
      [174400, "(Of the koko tree)"],
      [176200, "From the koko palm family"],
      [178924, "La la la la la"],
      [180196, "It's a koko fruit"],
      [181669, "(It's a koko fruit)"],
      [183408, "Of the koko tree"],
      [185268, "(Of the koko tree)"],
      [186990, "From the koko palm family"],
      [189803, "La la la la la la"],
      [191000, "It's a koko fruit"],
      [192319, "(It's a koko fruit)"],
      [194359, "Of the koko tree"],
      [196295, "(Of the koko tree)"],
      [197913, "From the cocopalm familyyyyyyy"],
      [202400, "La la la la la la la la la"],
      [205269, "la la la la la la"],
      [206900, "la la la la la"],
      [208630, "Hooray"],
    ],
  },
  {
    name: "The Neighbourhood - Sweater Weather",
    lyrics: [
      [20957, "And all I am is a man"],
      [24559, "I want the world in my hands"],
      [28200, "I hate the beach"],
      [30535, "But I stand in California"],
      [33901, "with my toes in the sand"],
      [36100, "Use the sleeves of my sweater"],
      [38119, "Let's have an adventure"],
      [40288, "Head in the clouds"],
      [41600, "but my gravity centered"],
      [44140, "Touch my neck"],
      [45844, "and I'll touch yours"],
      [47931, "You in those little"],
      [49358, "high waisted shorts, oh"],
      [52969, "She knows what I think about"],
      [55400, "And what I think about"],
      [56800, "One love, two mouths"],
      [58913, "One love, one house"],
      [60607, "No shirt, no blouse"],
      [62627, "Just us, you find out"],
      [64384, "Nothing that I wouldn't wanna"],
      [65400, "tell you about, no"],
      [67000, "'Cause it's too cold"],
      [71187, "For you here"],
      [73917, "And now, so let me hold"],
      [78878, "Both your hands in"],
      [81500, "the holes of my sweater"],
      [83666, "And if I may just take"],
      [84600, "your breath away"],
      [85633, "I don't mind if there's"],
      [86521, "not much to say"],
      [87546, "Sometimes the silence"],
      [88333, "guides a mind"],
      [89468, "To move to a place so far away"],
      [91969, "The goosebumps start to raise"],
      [93402, "The minute that my left hand"],
      [94222, "meets your waist"],
      [95900, "And then I watch your face"],
      [97300, "Put my finger on your tongue"],
      [98100, "'cause you love to taste, yeah"],
      [100053, "These hearts adore, everyone"],
      [101600, "the other beats hardest for"],
      [103200, "Inside this place is warm"],
      [105200, "Outside it starts to pour"],
      [107945, "Coming down"],
      [109001, "One love, two mouths"],
      [111128, "One love, one house"],
      [112974, "No shirt, no blouse"],
      [114827, "Just us, you find out"],
      [116573, "Nothing that I wouldn't wanna"],
      [117363, "tell you about, no, no, no"],
      [121456, "'Cause it's too cold"],
      [125367, "For you here"],
      [128136, "And now, so let me hold"],
      [133068, "Both your hands in"],
      [135730, "the holes of my sweater"],
      [137000, "'Cause it's too cold"],
      [141000, "For you here"],
      [143643, "And now, so let me hold"],
      [148544, "Both your hands in"],
      [151275, "the holes of my sweater"],
      [153503, "Whoa, whoa, whoa"],
      [166200, "Whoa, whoa, whoa"],
      [173900, "Whoa, whoa, whoa"],
      [181651, "Whoa, whoa, whoa"],
      [189360, "Whoa, whoa, whoa"],
      [197069, "Whoa, whoa, whoa"],
      [202500, "'Cause it's too cold"],
      [206658, "For you here"],
      [209372, "And now, so let me hold"],
      [214380, "Both your hands in"],
      [217034, "the holes of my sweater"],
      [218300, "It's too cold"],
      [222133, "For you here"],
      [224871, "And now, let me hold"],
      [229934, "Both your hands in"],
      [232466, "the holes of my sweater"],
      [235598, "And it's too cold,"],
      [237606, "it's too cold"],
      [240600, "The holes of my sweater"],
    ],
  },
  {
    name: "Tung Tung Tung Sahur - Ratatung",
    url: "https://www.youtube.com/watch?v=TZAdoZy6y34",
    lyrics: [
      [1, "Tung"],
      [748, "Ratata ta tung"],
      [2525, "Ratata ta tung"],
      [4461, "Ratata ta tung tung tung SAHUR"],
      [8293, "Ratata ta tung (hey)"],
      [10300, "Ratata ta tung (hey)"],
      [12090, "Ratata ta tung tung tung SAHUR"],
      [15995, "Ratata ta tung (hey)"],
      [17897, "Ratata ta tung (hey)"],
      [19800, "Ratata ta tung tung tung SAHUR"],
      [23200, "Crank it up,"],
      [23867, "here's my master plan,"],
      [25200, "Steal the crown like"],
      [25969, "a wanted man,"],
      [26993, "Pa pa pa pa da pa"],
      [29200, "Tralelero Tralala"],
      [30933, "Every hit is a battle won,"],
      [32841, "Drop that sound like"],
      [33700, "a smoking gun,"],
      [34939, "Pa pa pa pa da pa"],
      [36602, "Tralelero Tralala"],
      [39269, "Can you feel it now,"],
      [40947, "Rising through the crowd,"],
      [42826, "I'm the one they play"],
      [44444, "when the world gets loud!"],
      [46369, "Hey!"],
      [47000, "Ratata ta tung (hey)"],
      [48610, "Ratata ta tung (hey)"],
      [50422, "Ratata ta tung tung tung SAHUR"],
      [54406, "Ratata ta tung (hey)"],
      [56330, "Ratata ta tung (hey)"],
      [58206, "Ratata ta tung tung tung SAHUR"],
      [61600, "No..."],
      [62400, "I don't like boring verses..."],
      [64600, "So follow me!"],
      [66969, "Tralalero Tralala"],
      [69328, "Pa pa pa pa pa da pa pa"],
      [71238, "Tralalero Tralala"],
      [73088, "Pa pa pa pa pa da pa pa"],
      [75000, "Tralalero Tralala"],
      [76500, "Hey!"],
      [77666, "Can you feel it now,"],
      [79400, "Rising through the crowd,"],
      [81300, "I'm the one they play"],
      [82732, "when the world gets loud!"],
      [84817, "Hey!"],
      [85565, "Ratata ta tung (hey)"],
      [87013, "Ratata ta tung (hey)"],
      [89019, "Ratata ta tung tung tung SAHUR"],
      [92700, "Ratata ta tung (hey)"],
      [94640, "Ratata ta tung (hey)"],
      [96590, "Ratata ta tung tung tung SAHUR"],
      [100398, "Ratata ta tung (hey)"],
      [102367, "Ratata ta tung (hey)"],
      [104353, "Ratata ta tung tung tung SAHUR"],
      [108210, "Ratata ta tung (hey)"],
      [110035, "Ratata ta tung (hey)"],
      [112012, "Ratata ta tung tung tung SAHUR"],
    ],
  },
  {
    name: "Quadeca - Candles On Fire",
    lyrics: [
      [24800, "Woke up feeling mad today"],
      [26300, "Bitch, im ugly, but"],
      [26900, "I act like Timmy Chalamet, uh"],
      [28666, "I hate these motherfuckers"],
      [29400, "so, so much"],
      [30221, "Why I keep on tryna get em"],
      [31100, "all to validate me?"],
      [32600, "Its no help, im living like,"],
      [33500, "Oh well"],
      [34359, "Like my English teacher said,"],
      [35083, "had to show em, I dont tell"],
      [36170, "I show em I dont fail,"],
      [37100, "they knowin me so well"],
      [38114, "I been catchin all the shade"],
      [39007, "they've been throwin im, Odell"],
      [41000, "Turn the cameras on"],
      [42311, "Quick water break"],
      [43005, "in the marathon"],
      [44242, "Walk in your room"],
      [45000, "and I set the mood"],
      [45883, "They aint gotta light the"],
      [46569, "Motherfuckin candles on fire"],
      [48500, "Cant see without da cameras on"],
      [50049, "Without a platform"],
      [50800, "to be standin on, uh"],
      [52369, "All this baggage"],
      [52971, "going over they heads"],
      [53817, "So I keep it underneath"],
      [54725, "how I carry on, ooh"],
      [56647, "Im goin crazy"],
      [58024, "Too hot for Milan,"],
      [58852, "had to add the AC (Woo)"],
      [60035, "Guess whats gettin"],
      [60696, "to em lately?"],
      [61916, "They been takin shots at a boy"],
      [63100, "I just say Cheese!"],
      [64154, "I smell the green,"],
      [64669, "thats synesthesia"],
      [65332, "Growin up, im already"],
      [66100, "too old for Chris D'Elia"],
      [67245, "They tryna run they mouth,"],
      [68169, "checkin in on that big career"],
      [69242, "and look, its nada"],
      [70202, "Voila, it disappeared, ok, ayy"],
      [72006, "These sparks are fickle"],
      [72830, "and simple-minded"],
      [73590, "Flashlight in the dark"],
      [74501, "how people gon get behind em"],
      [75500, "I never killed my ego,"],
      [76447, "its trippin on psilocybin"],
      [77453, "That Shit'll kill me inside if"],
      [78367, "they hear it and never mind-it"],
      [79546, "Ive been gassed up, thats why"],
      [80750, "they dont hold a candle to me"],
      [81958, "Masked up way before"],
      [82747, "it was a standard duty"],
      [83811, "Back up, I came in this Shit"],
      [85295, "Put my sticks in the ground so"],
      [86367, "I sorry but you cant remove me"],
      [88241, "Turn the cameras on"],
      [89447, "Quick water break"],
      [90095, "in the marathon"],
      [91402, "Walk in your room"],
      [92122, "and I set the mood"],
      [93200, "They aint gotta light the"],
      [94000, "Motherfuckin candles on fire"],
      [95634, "Cant see without da cameras on"],
      [97305, "Without a platform"],
      [98000, "to be standin on, uh"],
      [99511, "All this baggage"],
      [100207, "going over they heads"],
      [100981, "So I keep it underneath"],
      [101830, "how I carry on, ooh"],
      [107300, "They put the red dot"],
      [107958, "right back on his head"],
      [109466, "In fact, it never left"],
      [110527, "Fuck a gold plaque,"],
      [111249, "I want platinum instead, uh"],
      [113200, "It wont matter no less"],
      [114573, "All my nights sleepless,"],
      [115363, "but my dreams still vivid"],
      [116629, "Hole getting deeper,"],
      [117342, "but the team still winnin"],
      [118586, "Let me look around,"],
      [119163, "like will you please love me?"],
      [120491, "End up in the ground,"],
      [121124, "will they still think of me"],
      [122411, "Where they stil feel something"],
      [123396, "Aint nobody laughing,"],
      [124186, "but it still feels funny to me"],
      [125621, "Its all a game, all these"],
      [126461, "people just a number to me"],
      [127550, "And what could it be?"],
      [128369, "No matter how I feel you could"],
      [129422, "bet I give em somethin to see"],
      [130681, "Whats the price of"],
      [131292, "living comfortably?"],
      [132098, "All these numbers mind numbing"],
      [132822, "to me, its nothin to me"],
      [134266, "Get my pants tailored"],
      [135111, "with the big pockets"],
      [136033, "I dont give em much room"],
      [136966, "when they Shit talkin, ayy"],
      [139300, "Turn the cameras on"],
      [140666, "Quick water break"],
      [141500, "in the marathon"],
      [142615, "Walk in your room"],
      [143306, "and I set the mood"],
      [144334, "They aint gotta light the"],
      [145121, "Motherfuckin candles on fire"],
      [146819, "Cant see without da cameras on"],
      [148460, "Without a platform"],
      [149221, "to be standin on, uh"],
      [150747, "All this baggage"],
      [151395, "going over they heads"],
      [152229, "So I keep it underneath"],
      [153003, "how I carry on, ooh"],
      [155313, "Turn the cameras on"],
      [158388, "Walk in your room"],
      [159059, "and I set the mood"],
      [160060, "They aint gotta light the"],
      [160644, "Motherfuckin candles on fire"],
      [163265, "Cameras on"],
      [164276, "Without a platform"],
      [164968, "to be standing on"],
      [166336, "All this baggage"],
      [167039, "going over they heads"],
      [167882, "So I keep it underneath"],
      [168792, "how I carry on, ooh"],
      [174644, "The route up the ice ridge"],
      [175560, "was hard but safe"],
      [177296, "Boyson could watch the"],
      [178419, "avalanches go by and"],
      [180230, "even enjoy the view"],
    ],
  },
  {
    name: "Justin Bieber - Stay",
    lyrics: [
      [30600, "I do the same"],
      [31500, "thing I told you that"],
      [32399, "I never would"],
      [33325, "I told you I'd change,"],
      [34347, "even when I knew I never could"],
      [36018, "I know that I can't"],
      [37133, "find nobody else as good as u"],
      [38797, "I need you to stay,"],
      [39822, "need you to stay, hey (oh)"],
      [42100, "I get drunk,"],
      [42869, "wake up,"],
      [43755, "I'm wasted still"],
      [44922, "I realize the time"],
      [46235, "that I wasted here"],
      [47700, "I feel like"],
      [48511, "you can't feel the way I feel"],
      [50479, "Oh, I'll be fucked up"],
      [51699, "if you can't be right here"],
      [53128, "Oh, ooh-woah"],
      [54500, "(oh, ooh-woah, ooh-woah)"],
      [55948, "Oh, ooh-woah"],
      [57416, "(oh, ooh-woah, ooh-woah)"],
      [58774, "Oh, ooh-woah"],
      [59900, "(oh, ooh-woah, ooh-woah)"],
      [61387, "Oh, I'll be fucked up"],
      [62959, "if you can't be right here"],
      [64384, "I do the same"],
      [65500, "thing I told you that"],
      [66141, "I never would"],
      [67188, "I told you I'd change,"],
      [68218, "even when I knew I never could"],
      [69909, "I know that I can't"],
      [70925, "find nobody else as good as u"],
      [72730, "I need you to stay,"],
      [73869, "need you to stay, hey"],
      [75800, "I do the same"],
      [76800, "thing I told you that"],
      [77600, "I never would"],
      [78467, "I told you I'd change,"],
      [79539, "even when I knew I never could"],
      [81217, "I know that I can't"],
      [82353, "find nobody else as good as u"],
      [84004, "I need you to stay,"],
      [85260, "need you to stay, hey"],
      [87106, "When I'm away from you,"],
      [88438, "I miss your touch (ooh)"],
      [90057, "You're the reason"],
      [90762, "I believe in love"],
      [92876, "It's been difficult"],
      [93817, "for me to trust (ooh)"],
      [95653, "And I'm afraid that"],
      [96320, "I'ma fuck it up"],
      [98560, "Ain't no way"],
      [99133, "that I can leave you stranded"],
      [101364, "'Cause you ain't ever"],
      [102100, "left me empty-handed"],
      [104129, "And you know that I know that"],
      [105810, "I can't live without you"],
      [107823, "So, baby, stay"],
      [109657, "Oh, ooh-woah"],
      [111013, "(oh, ooh-woah, ooh-woah)"],
      [112382, "Oh, ooh-woah"],
      [113799, "(oh, ooh-woah, ooh-woah)"],
      [115300, "Oh, ooh-woah"],
      [116585, "(oh, ooh-woah, ooh-woah)"],
      [117900, "I'll be fucked up"],
      [119500, "if you can't be right here"],
      [120900, "I do the same"],
      [121900, "thing I told you that"],
      [122800, "I never would"],
      [123535, "I told you I'd change,"],
      [124625, "even when I knew I never could"],
      [126351, "I know that I can't"],
      [127624, "find nobody else as good as u"],
      [129142, "I need you to stay,"],
      [130318, "need you to stay, hey"],
      [132319, "I do the same"],
      [133150, "thing I told you that"],
      [134000, "I never would"],
      [134775, "I told you I'd change,"],
      [135978, "even when I knew I never could"],
      [137614, "I know that I can't"],
      [138753, "find nobody else as good as u"],
      [140407, "I need you to stay,"],
      [141500, "need you to stay, hey"],
      [148700, "Woah-oh"],
      [151991, "I need you to stay,"],
      [152856, "need you to stay, hey"],
    ],
  },
  {
    name: "The Rare Occasions - Notion (Sped Up)",
    lyrics: [
      [9932, "Sure, it's a calming notion,"],
      [12416, "perpetual in motion"],
      [15056, "But I don't need the comfort"],
      [17680, "of any lies"],
      [20399, "For I have seen the ending,"],
      [22898, "and there is no ascending"],
      [25952, "Ri"],
      [26622, "Rii"],
      [27168, "Riii"],
      [27743, "Riii"],
      [28371, "Riiiise"],
      [30646, "Oh, back when I was younger,"],
      [33277, "was told by other youngsters"],
      [35861, "That my end will be torture"],
      [38422, "beneath the earth"],
      [41042, "'Cause I don't see what they see,"],
      [43707, "when death is staring at me"],
      [46361, "I see a window,"],
      [47150, "a limit,"],
      [47774, "to live it,"],
      [48337, "or not at all"],
      [75021, "If you could pull the lever"],
      [77533, "to carry on forever"],
      [80149, "Would your life even"],
      [81883, "matter anymore?"],
      [85414, "Sure, it's a calming notion,"],
      [87982, "perpetual in motion"],
      [90878, "But it's not"],
      [91625, "what"],
      [92168, "you"],
      [92746, "signed"],
      [93366, "up"],
      [94665, "for"],
      [107215, "I'm sure there won't"],
      [108481, "always be sunshine"],
      [112456, "But there's this momentary beam"],
      [115801, "of light"],
      [117407, "You don't have to wait"],
      [118400, "those salty decades"],
      [119935, "To get through the gate,"],
      [121020, "it's all in front of your face"],
      [122609, "I'm sure there won't"],
      [124303, "always be sunshine"],
      [128335, "I'm sure"],
      [129280, "there won't always be sunshine"],
      [133414, "But there's this momentary beam"],
      [136886, "of light"],
      [138210, "I could-could cross the ocean"],
      [140617, "in a fit of devotion"],
      [143351, "For every shining second,"],
      [145923, "this fragile body beckons"],
      [148660, "You think you're owed it better"],
      [151008, "believing ancient letters"],
      [153887, "Sure, it's a calming notion,"],
      [156736, "but it's a lie"],
      [157414, "but it's a liee"],
      [157958, "but it's a lieee"],
    ],
  },
  {
    name: "Civilian - Close Call",
    lyrics: [
      [4969, "I just gotta let you know"],
      [7100, "Ever since you called me"],
      [9100, "Im tearing up my schedule"],
      [11069, "Cause I've been thinking"],
      [11844, "about you all week"],
      [13516, "When I get you alone"],
      [15100, "I don't feel loved like"],
      [15915, "I say I do"],
      [17801, "Cause he's calling your phone"],
      [19460, "I'm dodging bullets"],
      [20305, "the shape of you"],
      [22322, "Close call"],
      [23488, "I hope you never call me again"],
      [26418, "And so far"],
      [27789, "We're farther gone than"],
      [29174, "where we began"],
      [30800, "I'll let these memories fade"],
      [32800, "But I don't wanna forget"],
      [35303, "I'll never be your best"],
      [37501, "I'm letting you go"],
      [43700, "I should've known"],
      [44238, "it would end up like this"],
      [45600, "Late night body"],
      [46421, "to somebody I'd miss"],
      [47821, "Don't say you need"],
      [48777, "time for yourself"],
      [49956, "You mean somebody else"],
      [51700, "I know these days"],
      [54081, "I feel like I'm better alone"],
      [56946, "Sweet escape to me babe"],
      [59598, "I'm letting you go"],
      [61226, "Ill let these memories fade"],
      [63500, "So you can leave"],
      [64362, "my mind in peace"],
      [65774, "We made it one week"],
      [66539, "Want a piece of my mind"],
      [67764, "Baby do this on me"],
      [68758, "cause darling"],
      [70100, "When I get you alone"],
      [71695, "I don't feel loved"],
      [72509, "like I say I do"],
      [74500, "Cause he's calling your phone"],
      [76125, "I'm dodging bullets"],
      [76920, "in the shape of you"],
      [78934, "Close call"],
      [80069, "I hope you never call me again"],
      [83038, "And so far"],
      [84443, "We're farther gone than"],
      [85899, "where we began"],
      [87469, "I'll let these memories fade"],
      [89705, "But I don't wanna forget"],
      [91984, "I'll never be your best"],
      [94169, "I'm letting you go"],
      [96356, "Slow down (slow down)"],
      [97400, "let go (let go)"],
      [98600, "I won't call back like an echo"],
      [100437, "I could change my mind"],
      [101425, "like presto (presto)"],
      [102608, "But my heads held high"],
      [103647, "and my stress low"],
      [105000, "Alright let's go"],
      [107300, "Imma sign off like XO"],
      [109569, "You had a shot at this"],
      [110800, "A close call I'm"],
      [111300, "the one you'll miss"],
      [112600, "So come on now"],
      [122369, "Girl I really thought"],
      [122900, "I met my match"],
      [124122, "But without you and I"],
      [125001, "stroke it off like that"],
      [126128, "Baby now Im cutting a lit fuse"],
      [128476, "I see you in hindsight"],
      [129366, "it's all in my rearview"],
      [130769, "Our better days bind us"],
      [131769, "let it fade behind us"],
      [132844, "Tore us apart quicker"],
      [133852, "than get away drivers"],
      [135200, "I've been running"],
      [136000, "from the day I knew"],
      [137195, "I'm dodging bullets"],
      [138007, "the shape of you"],
      [140005, "Close call"],
      [141256, "I hope you never call me again"],
      [144125, "And so far"],
      [145504, "We're farther gone than"],
      [147030, "where we began"],
      [148433, "I'll let these memories fade"],
      [150816, "But I don't wanna forget"],
      [153060, "I'll never be your best"],
      [155240, "I'm letting you go"],
    ],
  },
  {
    name: "Pharmacist - North Memphis",
    lyrics: [
      [11200, "Pharmacist motherfucker"],
      [12500, "Project Pat don't give a fu-"],
      [18400, "Project Pat don't give a fuck"],
      [25485, "North Memphis nigga,"],
      [26436, "North Memphis nigga"],
      [27505, "North Memphis,"],
      [28271, "North Memphis nigga"],
      [29729, "Project Pat don't give a fuck"],
      [31117, "North Memphis nigga,"],
      [32182, "North Memphis nigga"],
      [33275, "North Memphis-"],
      [33984, "North Memphis nigga"],
      [35500, "The definition of a player"],
      [37392, "A nigga that play hoes"],
      [38543, "to make the ends meet"],
      [39696, "You gotta know the game,"],
      [40700, "how it's played,"],
      [41446, "it's all about thinkin' deep"],
      [42521, "Sum' gonna cross you out,"],
      [44000, "sum' gonna smoke you out"],
      [45420, "But you can talk yo' ass"],
      [46475, "off my Glock,"],
      [47100, "I'm breakin' somethin' off"],
      [48262, "Proper, I kick it at"],
      [49514, "right up where the players at"],
      [51116, "Bumpin', pimpin', smokin' sess"],
      [52604, "with Dre and Ray-Ray"],
      [53599, "in that mask"],
      [54252, "We love to see these niggas"],
      [55460, "sweat up on our bitch you see"],
      [56901, "Drizzay hit them,"],
      [57608, "baby, then we vampin'"],
      [58579, "with them dead G's"],
      [59969, "North Memphis niggas,"],
      [60856, "North Memphis niggas"],
      [61917, "North Memphis,"],
      [62692, "North Memphis niggas"],
      [64094, "Project Pat don't give a fuck"],
      [65560, "North Memphis niggas,"],
      [66595, "North Memphis niggas"],
      [67687, "North Memphis,"],
      [68412, "North Memphis niggas"],
      [69838, "Project Pat don't give a fuck"],
      [72700, "Pharmacist motherfucker"],
    ],
  },
  {
    name: "Maroon 5 - Payphone",
    lyrics: [
      [179, "I'm at a payphone,"],
      [2091, "trying to call home"],
      [4345, "All of my change,"],
      [5709, "I spent on you"],
      [8651, "Where have the times gone?"],
      [10780, "Baby, it's all wrong"],
      [13016, "Where are the plans"],
      [14361, "we made for two?"],
      [17905, "Yeah, I,"],
      [18857, "I know it's hard to remember"],
      [21112, "the people we used to be"],
      [23271, "It's even harder to picture"],
      [25527, "that youre not here next to me"],
      [27705, "You say it's too late"],
      [28656, "to make it,"],
      [29949, "but is it too late to try?"],
      [32095, "And in our time that u wasted,"],
      [33719, "all of our bridges burned down"],
      [36374, "I've wasted my nights,"],
      [38617, "you turned out the lights"],
      [40828, "Now I'm paralyzed"],
      [42992, "Still stuck in that time"],
      [45198, "when we called it love"],
      [47360, "But even the sun"],
      [49492, "sets in paradise"],
      [52516, "I'm at a payphone,"],
      [54431, "trying to call home"],
      [56638, "All of my change,"],
      [58048, "I spent on you"],
      [61013, "Where have the times gone?"],
      [63149, "Baby, it's all wrong"],
      [65297, "Where are the plans"],
      [66710, "we made for two?"],
      [69731, "If happy-ever-afters did exist"],
      [74013, "I would still be"],
      [75175, "holding you like this"],
      [78365, "All those fairy tales"],
      [79794, "are full of shit"],
      [82735, "One more fucking love song,"],
      [84695, "I'll be sick,"],
      [87219, "oh, yeah"],
      [88809, "U turned your back on tomorrow"],
      [90918, "'cause you forgot yesterday"],
      [92930, "I gave you my love to borrow,"],
      [95180, "but you just gave it away"],
      [97559, "You can't expect me to be fine"],
      [99757, "I don't expect you to care"],
      [101831, "I know I said it before, but"],
      [103585, "all of our bridges burned down"],
      [106288, "I've wasted my nights,"],
      [108424, "you turned out the lights"],
      [110645, "Now I'm paralyzed (oh)"],
      [112876, "Still stuck in that time"],
      [115055, "when we called it love"],
      [117183, "But even the sun"],
      [119321, "sets in paradise"],
      [122100, "I'm at a payphone,"],
      [124275, "trying to call home"],
      [126435, "All of my change,"],
      [127888, "I spent on you"],
      [130200, "(oh-oh)"],
      [131000, "Where have the times gone?"],
      [132988, "Baby, it's all wrong"],
      [135184, "Where are the plans"],
      [136400, "we made for two?"],
      [138900, "(Yeah)"],
      [139590, "If happy-ever-afters did exist"],
      [143818, "I would still be"],
      [144927, "holding you like this"],
      [148219, "And all those fairy tales"],
      [149631, "are full of shit"],
      [152597, "One more fucking love song,"],
      [154488, "I'll be sick"],
      [156952, "Now I'm at a payphone"],
      [158984, "Man, fuck that shit"],
      [160307, "I be out spendin' all this"],
      [161280, "money while you sittin' 'round"],
      [162546, "Wondering why it wasn't"],
      [163519, "you who came up from nothin'"],
      [164602, "Made it from the bottom,"],
      [165388, "now when you see me im stuntin"],
      [166969, "And all of my cars start"],
      [167813, "with the push of a button"],
      [169057, "Telling me I changed since I"],
      [170000, "blew up or whatever u call it"],
      [171414, "Switched the number to my"],
      [172309, "phone so u never could call it"],
      [173612, "Don't need my name on my shirt"],
      [174775, "you can tell that I'm ballin'"],
      [175811, "Swish, what a shame,"],
      [176920, "coulda got picked"],
      [178085, "Had a really good game,"],
      [179208, "but you missed your last shot"],
      [180237, "So you talk about who"],
      [181177, "you see at the top"],
      [182055, "Or what you could've saw,"],
      [182951, "but sad to say, it's over for"],
      [184500, "Phantom pulled up,"],
      [185226, "valet opened doors"],
      [186771, "Wished I'd go away,"],
      [187383, "got what you was looking for"],
      [188867, "Now it's me who they want"],
      [190069, "So you can go and take that"],
      [191008, "little piece of shit with you"],
      [191889, "I'm at a payphone,"],
      [194064, "trying to call home"],
      [196260, "All of my change,"],
      [197507, "I spent on you"],
      [200700, "Where have the times gone?"],
      [202788, "Baby, it's all wrong"],
      [204942, "Where are the plans"],
      [206321, "we made for two?"],
      [209188, "If happy-ever-afters did exist"],
      [213603, "I would still be"],
      [214822, "holding you like this"],
      [217947, "And all these fairy tales"],
      [219502, "are full of shit"],
      [222418, "One more fucking love song,"],
      [224266, "I'll be sick"],
      [226662, "Now I'm at a payphone"],
    ],
  },
  {
    name: "Passenger - Let Her Go",
    url: "https://www.youtube.com/watch?v=8a1eG-Y0u6Y",
    lyrics: [
      [12510, `Well, you only need the light`],
      [13510, `when it's burning low`],
      [16310, `Only miss the sun when it`],
      [17310, `starts to snow`],
      [19690, `Only know you love her when`],
      [20690, `you let her go`],
      [25880, `Only know you've been high`],
      [26880, `when you're feeling low`],
      [29710, `Only hate the road when`],
      [30710, `you're missing home`],
      [33230, `Only know you love her when`],
      [34230, `you let her go`],
      [39390, `And you let her go`],
      [53420, `Staring at the bottom of`],
      [54420, `your glass`],
      [56170, `Hoping one day you'll make`],
      [57170, `a dream last`],
      [59380, `Dreams come slow and go`],
      [60380, `so fast`],
      [106620, `You see her when you close`],
      [107620, `your eyes`],
      [109360, `Maybe one day you'll`],
      [110360, `understand why`],
      [112680, `Everything you touch`],
      [113680, `surely dies`],
      [118830, `But you only need the light`],
      [119830, `when it's burning low`],
      [122630, `Only miss the sun when it`],
      [123630, `starts to snow`],
      [125900, `Only know you love her when`],
      [126900, `you let her go`],
      [132200, `Only know you've been high`],
      [133200, `when you're feeling low`],
      [135870, `Only hate the road when`],
      [136870, `you're missing home`],
      [139130, `Only know you love her when`],
      [140130, `you let her go`],
      [146520, `Staring at the ceiling in`],
      [147520, `the dark`],
      [149040, `Same old empty feeling in`],
      [150040, `your heart`],
      [152140, `'Cause love comes slow and`],
      [153140, `it goes so fast`],
      [199410, `Well, you see her when you`],
      [200410, `fall asleep`],
      [201780, `But never to touch and`],
      [202780, `never to keep`],
      [205050, `'Cause you loved her too much`],
      [206050, `and dived too deep`],
      [212060, `Well, you only need the light`],
      [213060, `when it's burning low`],
      [215800, `Only miss the sun when it`],
      [216800, `starts to snow`],
      [219120, `Only know you love her when`],
      [220120, `you let her go`],
      [225190, `Only know you've been high`],
      [226190, `when you're feeling low`],
      [229110, `Only hate the road when`],
      [230110, `you're missing home`],
      [232430, `Only know you love her when`],
      [233430, `you let her go`],
      [238660, `And you let her go`],
      [245320, `And you let her go`],
      [251940, `Well, you let her go`],
      [305120, `Well, you only need the light`],
      [306120, `when it's burning low`],
      [308840, `Only miss the sun when it`],
      [309840, `starts to snow`],
      [312230, `Only know you love her when`],
      [313230, `you let her go`],
      [318220, `Only know you've been high`],
      [319220, `when you're feeling low`],
      [322210, `Only hate the road when`],
      [323210, `you're missing home`],
      [325620, `Only know you love her when`],
      [326620, `you let her go`],
      [331900, `Well, you only need the light`],
      [332900, `when its burning low`],
      [336040, `Only miss the sun when it`],
      [337040, `starts to snow`],
      [339750, `Only know you love her when`],
      [340750, `you let her go`],
      [346550, `Only know you've been high`],
      [347550, `when you're feeling low`],
      [350690, `Only hate the road when`],
      [351690, `you're missing home`],
      [354290, `Only know you love her when`],
      [355290, `you let her go`],
      [401390, `And you let her go`],
    ],
  },
  {
    name: "Busta Rhymes - Taking Everything",
    lyrics: [
      [811, "Yeah! Yeah! Yeah! Yeah!"],
      [3062, "Let's go! Let's go!"],
      [4300, "Let's go! Let's go!"],
      [5969, "Yeah! Yeah! Yeah! Yeah!"],
      [8300, "Let's go! Let's go!"],
      [9583, "Let's go! Let's go!"],
      [11464, "Yeah! Yeah! Yeah!"],
      [14149, "You ain't courageous enough,"],
      [15300, "most of you probably fold"],
      [16728, "You ain't willin' to face"],
      [17727, "the challenge acquire the gold"],
      [19395, "We only here to just retrieve"],
      [20486, "what you probably stole"],
      [22091, "Yeah! Yeah! Yeah! Yeah!"],
      [23228, "Yeah! Yeah! Yeah! Yeah!"],
      [24784, "You see steel, sharpen steel"],
      [26068, "when it's time for the go"],
      [27407, "We here to create such"],
      [28300, "a ruckus we all on a roll"],
      [30099, "To every challenge in the eye,"],
      [31361, "we don't play with the soul"],
      [32700, "No matter what you was told,"],
      [33800, "every rat find a hole"],
      [35455, "See it don't matter"],
      [36100, "what you thought"],
      [37000, "(Yeah! Yeah! Yeah!)"],
      [38029, "We takin' everything we want"],
      [39467, "(Whoa! Whoa! Whoa!)"],
      [40600, "Now don't forget it,"],
      [41383, "better know we come to get it"],
      [42791, "And we wit' it and"],
      [43587, "there's nothing better,"],
      [44499, "hope you know to play a sport"],
      [46112, "See it don't matter"],
      [46826, "what you thought"],
      [47686, "(Yeah! Yeah! Yeah!)"],
      [48757, "We takin' everything we want"],
      [50152, "(Whoa! Whoa! Whoa!)"],
      [51384, "Now don't forget it,"],
      [52129, "better know we come to get it"],
      [53545, "And we wit' it and"],
      [54247, "there's nothing better,"],
      [55194, "hope you know to play a sport"],
      [56688, "See all the greatness when"],
      [57660, "we come when the story is told"],
      [59390, "Can't put a timeline"],
      [60123, "on greatness it never gets old"],
      [61962, "Come get the scope when"],
      [62948, "we hot and you not"],
      [64182, "And we pull up and we come in"],
      [65559, "takin' everything you got, ugh"],
      [77969, "See it don't matter"],
      [78600, "what you thought"],
      [79400, "(Yeah! Yeah! Yeah!)"],
      [80600, "We takin' everything we want"],
      [82128, "(Whoa! Whoa! Whoa!)"],
      [83306, "Now don't forget it,"],
      [84008, "better know we come to get it"],
      [85400, "And we wit' it"],
      [86168, "and there's nothing better,"],
      [87072, "hope you know to play a sport"],
      [90200, "(Yeah! Yeah! Yeah!)"],
      [92800, "(Whoa! Whoa! Whoa!)"],
      [95460, "(Yeah! Yeah! Yeah!)"],
      [99169, "No matter what you thought,"],
      [100200, "you better believe we comin'"],
      [101900, "And if you thought"],
      [102500, "that we was playin',"],
      [103300, "let me show you something"],
      [104723, "So then we jump"],
      [105500, "and we swoop"],
      [106157, "and we dodge every bullet"],
      [107465, "It dont matter where they pull"],
      [108500, "up when they try to pull it"],
      [111200, "(Yeah! Yeah! Yeah!)"],
      [113666, "(Whoa! Whoa! Whoa!)"],
      [116853, "(Yeah! Yeah! Yeah!)"],
      [120796, "Better know we on the clock"],
      [122000, "and it's time to go (Yeah!)"],
      [123500, "Everything is tactical,"],
      [124500, "now enjoy the show (Yeah!)"],
      [126237, "Then we skip"],
      [126800, "and we bounce"],
      [127587, "and we hop"],
      [128100, "out of every situation"],
      [129392, "Best believe that"],
      [130212, "it's time to blow"],
      [131300, "See it don't matter"],
      [131900, "what you thought"],
      [132800, "(Yeah! Yeah! Yeah!)"],
      [133986, "We takin' everything we want"],
      [135446, "(Whoa! Whoa! Whoa!)"],
      [136666, "Now don't forget it,"],
      [137300, "better know we come to get it"],
      [138855, "And we wit' it"],
      [139400, "and there's nothing better,"],
      [140485, "hope you know to play a sport"],
      [150000, "Hah! Hah! Hah! Hah!"],
      [152700, "You know the heat melt,"],
      [153300, "better wear your seat belt"],
      [154500, "and strap up"],
      [155369, "You know we get a little crazy"],
      [156300, "every single time we ack up"],
      [157800, "I know that the way you see"],
      [158700, "us doin' it to 'em"],
      [159300, "I think you really,"],
      [159869, "really need to shack up"],
      [160600, "Yeah! Yeah! Yeah! Yeah!"],
      [168100, "Let's go! Let's go!"],
      [169400, "Let's go! Let's go!"],
      [173900, "See it don't matter"],
      [174600, "what you thought"],
      [175400, "(Yeah! Yeah! Yeah!)"],
      [176574, "We takin' everything we want"],
      [178100, "(Whoa! Whoa! Whoa!)"],
      [179300, "Now don't forget it,"],
      [180000, "better know we come to get it"],
      [181300, "And we wit' it"],
      [182000, "and there's nothing better,"],
      [183102, "hope you know to play a sport"],
      [184600, "See it don't matter"],
      [185300, "what you thought"],
      [186258, "(Yeah! Yeah! Yeah!)"],
      [187369, "We takin' everything we want"],
      [188817, "(Whoa! Whoa! Whoa!)"],
      [189900, "Now don't forget it,"],
      [190781, "better know we come to get it"],
      [192000, "And we wit' it"],
      [192852, "and there's nothing better,"],
      [193800, "hope you know to play a sport"],
    ],
  },
  {
    name: "Italo Brothers - My Life is a Party",
    url: "https://www.youtube.com/watch?v=F7GeEAP4wcI",
    lyrics: [
      [1900, "I say, hey, you say, ho"],
      [5220, "Let's turn it up"],
      [5620, "and here we go"],
      [9830, "New York, LA, Berlin,"],
      [10230, "say, hey"],
      [16790, "To Tokyo, Rio de Janeiro,"],
      [17190, "here we go, go"],
      [24650, "Hello, hello"],
      [28050, "Can you just feel it,"],
      [28450, "are you ready to go?"],
      [31610, "Hello, hello"],
      [35590, "Do you receive my echo?"],
      [38730, "My life is a party,"],
      [39130, "my home is the club"],
      [42890, "I party like a rock star,"],
      [43290, "dance until I drop"],
      [46150, "My life is a party,"],
      [46550, "my home is the club"],
      [50520, "My stage is the dance floor,"],
      [50920, "party never stops"],
      [53810, "My life is a party,"],
      [54210, "my home is the club"],
      [57930, "I party like a rock star,"],
      [58330, "dance until I drop"],
      [61300, "My life is a party,"],
      [61700, "my home is the club"],
      [65380, "My stage is the dance floor,"],
      [65780, "party never stops"],
      [69160, "And I say, hey,"],
      [69560, "you say, ho"],
      [72750, "Let's turn it up"],
      [73150, "and here we go"],
      [76720, "I say, hey,"],
      [77120, "you say, ho"],
      [80360, "You spin me 'round"],
      [80760, "like a yo-yo"],
      [84710, "DC, Paris Bel-Air,"],
      [85110, "say, yeah"],
      [91880, "To Monaco, Santo Domingo,"],
      [92280, "here we go, go"],
      [99860, "Hello, hello"],
      [102980, "Can you just feel it,"],
      [103380, "are you ready to go?"],
      [106840, "Hello, hello"],
      [110580, "Do you receive my echo?"],
      [113720, "My life is a party,"],
      [114120, "my home is the club"],
      [117860, "I party like a rock star,"],
      [118260, "dance until I drop"],
      [121160, "My life is a party,"],
      [121560, "my home is the club"],
      [125320, "My stage is the dance floor,"],
      [125720, "party never stops"],
      [129060, "And I say, hey,"],
      [129460, "you say, ho"],
      [132860, "Let's turn it up"],
      [133260, "and here we go"],
      [136840, "I say, hey,"],
      [137240, "you say, ho"],
      [140180, "You spin me 'round"],
      [140580, "like a yo-yo"],
      [159740, "Hello, hello"],
      [162890, "Can you just feel it,"],
      [163290, "are you ready to go?"],
      [166730, "Hello, hello"],
      [170450, "Do you receive my echo?"],
      [173680, "My life is a party,"],
      [174080, "my home is the club"],
      [177850, "I party like a rock star,"],
      [178250, "dance until I drop"],
      [181240, "My life is a party,"],
      [181640, "my home is the club"],
      [185330, "My stage is the dance floor,"],
      [185730, "party never stops"],
      [189190, "And I say, hey,"],
      [189590, "you say, ho"],
      [192860, "Let's turn it up"],
      [193260, "and here we go"],
      [196860, "I say, hey,"],
      [197260, "you say, ho"],
      [200370, "You spin me 'round"],
      [200770, "like a yo-yo"],
    ],
  },
  {
    name: "Devil May Cry 5 - Devils Never Cry",
    url: "https://www.youtube.com/watch?v=JUaBL5lpPdI",
    lyrics: [
      [26000, `Bless me with your gift of`],
      [27000, `light`],
      [29990, `Righteous cause on judgement`],
      [30990, `night`],
      [32870, `Feel the sorrow the light`],
      [33870, `has swallowed`],
      [35240, `Feel the freedom like no`],
      [36240, `tomorrow`],
      [51970, `Stepping forth a cure for`],
      [52970, `our soul's demise`],
      [55780, `Reap the tears of victim's`],
      [56780, `cries`],
      [58000, `Yearning more to hear the`],
      [59000, `suffer of a`],
      [61670, `Of a demon as i put it`],
      [62670, `under`],
      [64340, `Killed before,a time to`],
      [65340, `kill them all`],
      [68360, `Passed down the righteous law`],
      [70670, `Serve a justice that dwells`],
      [71670, `in me`],
      [73870, `Lifeless corpse as far the`],
      [74870, `eye can see`],
      [79870, `The eye can see`],
      [82120, `The eye can see`],
      [87890, `The eye can see`],
      [89970, `Bless me with the leaf off`],
      [90970, `of the tree`],
      [96270, `On it, i see the freedom`],
      [97270, `reign`],
      [102080, `We are falling,the light is`],
      [103080, `calling`],
      [108990, `Tears inside me calm me down`],
      [114980, `Midnight calling mist of`],
      [115980, `resolving`],
      [122120, `Crown me with the pure green`],
      [123120, `leaf`],
      [127870, `Praise to my father,blessed`],
      [128870, `by the water`],
      [134920, `Black night,dark sky,the`],
      [135920, `Devil's cry`],
      [140980, `Bless me with the (life of`],
      [141980, `vengeance, a passive test)`],
      [144230, `Leaf off of the tree (until`],
      [145230, `the gravel I will rest)`],
      [147780, `On it, I see (engage the`],
      [148780, `pressure until it crumbles)`],
      [150200, `The freedom reign (the`],
      [151200, `existence of black souls)`],
      [154080, `We are falling (onward to a`],
      [155080, `sacred battlefield)`],
      [156970, `The light is calling (where`],
      [157970, `limits are revealed)`],
      [160780, `Tears inside me (tools of`],
      [161780, `steel,in rage they conquer)`],
      [163960, `Calm me down (weed out the`],
      [164960, `killing of victim's stalker)`],
      [166890, `Midnight calling (the powers`],
      [167890, `proven to end the madness)`],
      [169880, `Mist of resolving (upon I`],
      [170880, `take it to end the savage)`],
      [172730, `Crown me with the (the rays`],
      [173730, `of light a truth of meaning)`],
      [176050, `Pure green leaf (to my`],
      [177050, `father the blood is pleading)`],
      [179760, `Bless me with the (a justice`],
      [180760, `rage for all to feel)`],
      [182890, `Leaf off of the tree (with`],
      [183890, `innocent hatred squeals)`],
      [185890, `On it, I see (the gore of`],
      [186890, `evil seems to satisfy)`],
      [188890, `The freedom reign (when`],
      [189880, `slain a maimed and pacified)`],
      [192030, `Praise to my father, Bless`],
      [193030, `by the water`],
      [198760, `Black night,dark sky,the`],
      [199760, `Devil's cry`],
    ],
  },
];

const audios = musicTracks.map(() => null);

let musicMenuOpen = false;
let currentAudio = null;
let currentTrackIndex = -1;
let ytApiReady = false;
let ytApiLoading = false;
let ytPlayer = null;
let ytAudio = null;
let ytTick = 0;
let ytApiCallbacks = [];
let autoChatLyrics = true;
let musicDrag = { active: false, dx: 0, dy: 0 };
let musicStatusEl = null;
let musicTimeEl = null;
let musicDurEl = null;
let musicSeekEl = null;
let musicScrub = false;
let musicNowPlayingEl = null;
let musicLyricEl = null;

class SongPlayer {
  constructor() {
    this.songs = musicTracks.map((track, i) => ({
      name: track.name || `Track ${i + 1}`,
      url: track.url || null,
      lyrics: (track.lyrics || []).slice(),
      index: 0,
    }));
    this.playing = false;
    this.currentSong = -1;
    this.currentTime = 0;
    this.lastUpdate = 0;
    this.updateInterval = null;
    this.lastSentTime = -1000;
  }

  sendLyric(text) {
    if (!text || isChatActive()) return;
    const msg = String(text).trim().slice(0, 30);
    if (msg) io.send("6", msg);
  }

  playSong(id) {
    if (id < 0 || id >= this.songs.length) return;

    if (this.playing && this.currentSong === id) return;

    if (this.playing) {
      this.stopLyrics();
    }

    this.currentSong = id;
    this.currentTime = 0;
    this.songs[id].index = 0;
    this.lastSentTime = -1000;
    this.playing = true;
    this.lastUpdate = Date.now();

    if (this.updateInterval) clearInterval(this.updateInterval);

    this.updateInterval = setInterval(() => {
      if (!this.playing) return;

      // Check if audio is paused
      if (currentAudio) {
        if (currentAudio._type === "youtube") {
          if (
            ytPlayer &&
            ytPlayer.getPlayerState &&
            ytPlayer.getPlayerState() !== 1
          )
            return;
        } else if (currentAudio.paused) {
          return;
        }
      }

      const now = Date.now();
      const delta = now - this.lastUpdate;
      this.lastUpdate = now;
      this.currentTime += delta;

      if (!autoChatLyrics) return;

      const song = this.songs[this.currentSong];
      if (!song || !song.lyrics) return;

      const lyric = song.lyrics[song.index];
      if (lyric) {
        const time = lyric[0];
        const text = lyric[1];

        if (
          this.currentTime >= time - 150 &&
          this.currentTime - this.lastSentTime > 500
        ) {
          this.sendLyric(text);
          this.lastSentTime = this.currentTime;
          song.index++;

          if (musicLyricEl) {
            const lyricText = musicLyricEl.querySelector("#musicLyricText");
            if (lyricText) {
              lyricText.textContent = text;
            } else {
              musicLyricEl.textContent = text;
            }
            musicLyricEl.style.animation = "none";
            musicLyricEl.offsetHeight;
            musicLyricEl.style.animation = "lyricPulse 0.3s ease-out";
          }
          if (typeof window.updateActiveLyricInList === "function") {
            window.updateActiveLyricInList(this.currentTime);
          }
        }
      } else if (song.index >= song.lyrics.length) {
        // No more lyrics, but keep playing
      }
    }, 50);
  }

  stopLyrics() {
    this.playing = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.currentTime = 0;
    this.lastSentTime = -1000;
    if (this.currentSong >= 0 && this.songs[this.currentSong]) {
      this.songs[this.currentSong].index = 0;
    }
  }

  syncTime(audioTime) {
    this.currentTime = audioTime * 1000;
    this.lastUpdate = Date.now();

    if (this.currentSong >= 0 && this.songs[this.currentSong]) {
      const song = this.songs[this.currentSong];
      song.index = 0;
      while (
        song.index < song.lyrics.length &&
        song.lyrics[song.index][0] <= this.currentTime
      ) {
        song.index++;
      }
    }
  }

  reset() {
    this.stopLyrics();
    this.currentSong = -1;
    if (musicLyricEl) {
      const lyricText = musicLyricEl.querySelector("#musicLyricText");
      if (lyricText) {
        lyricText.textContent = "♪ No lyrics";
      } else {
        musicLyricEl.textContent = "♪ No lyrics";
      }
    }
  }
}

const songPlayer = new SongPlayer();

function isYouTubeUrl(url) {
  return /youtube\.com\/watch\?v=|youtu\.be\//i.test(String(url || ""));
}

function getYouTubeId(url) {
  try {
    const u = new URL(String(url));
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "").trim() || null;
    }
    if (u.searchParams.has("v")) return u.searchParams.get("v");
  } catch (_) { }
  const m = String(url || "").match(/(?:v=|\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function ensureYouTubeApi(cb) {
  if (ytApiReady) return cb();
  if (ytApiLoading) {
    ytApiCallbacks.push(cb);
    return;
  }
  ytApiLoading = true;
  ytApiCallbacks.push(cb);
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytApiLoading = false;
    if (typeof prev === "function") prev();
    const cbs = ytApiCallbacks.slice();
    ytApiCallbacks = [];
    cbs.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error("YT API callback error:", e);
      }
    });
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  s.onerror = () => {
    ytApiLoading = false;
    setMusicStatus("Failed to load YouTube API");
    ytApiCallbacks = [];
  };
  document.head.appendChild(s);
  setTimeout(() => {
    if (!ytApiReady && ytApiLoading) {
      ytApiLoading = false;
      setMusicStatus("YouTube API timeout");
      ytApiCallbacks = [];
    }
  }, 10000);
}

function ensureYouTubePlayer(videoId, onReady) {
  const holderId = "musicYoutubeHolder";
  let holder = document.getElementById(holderId);
  if (!holder) {
    holder = document.createElement("div");
    holder.id = holderId;
    holder.style.position = "fixed";
    holder.style.left = "-9999px";
    holder.style.top = "-9999px";
    holder.style.width = "200px";
    holder.style.height = "200px";
    holder.style.opacity = "0";
    holder.style.pointerEvents = "none";
    document.body.appendChild(holder);
  }
  if (!ytAudio) {
    ytAudio = {
      _type: "youtube",
      pause() {
        if (ytPlayer) ytPlayer.pauseVideo();
      },
      play() {
        if (ytPlayer) ytPlayer.playVideo();
      },
      load() { },
      get currentTime() {
        return ytPlayer ? ytPlayer.getCurrentTime() : 0;
      },
      set currentTime(v) {
        if (ytPlayer) ytPlayer.seekTo(Math.max(0, v || 0), true);
      },
      get duration() {
        return ytPlayer ? ytPlayer.getDuration() : 0;
      },
      get paused() {
        if (!ytPlayer || !window.YT || !window.YT.PlayerState) return true;
        return ytPlayer.getPlayerState() !== window.YT.PlayerState.PLAYING;
      },
    };
  }
  if (ytPlayer) {
    try {
      ytPlayer.loadVideoById(videoId);
    } catch (e) {
      console.error("YT loadVideoById error:", e);
      setMusicStatus("Failed to load video");
      return;
    }
    if (typeof onReady === "function") onReady();
    return;
  }
  ytPlayer = new YT.Player(holderId, {
    height: "200",
    width: "200",
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: () => {
        if (typeof onReady === "function") onReady();
      },
      onStateChange: (ev) => {
        if (currentAudio !== ytAudio) return;
        if (ev.data === YT.PlayerState.PLAYING) {
          setMusicStatus("");
          startLyrics(currentTrackIndex);
          syncLyrics();
        } else if (ev.data === YT.PlayerState.ENDED) {
          stopMusic();
        } else if (ev.data === YT.PlayerState.BUFFERING) {
          setMusicStatus("Buffering...");
        } else if (ev.data === YT.PlayerState.UNSTARTED) {
          setTimeout(() => {
            if (
              ytPlayer &&
              ytPlayer.getPlayerState &&
              ytPlayer.getPlayerState() === -1
            ) {
              setMusicStatus("Video unavailable");
            }
          }, 3000);
        }
      },
      onError: (ev) => {
        const errCodes = {
          2: "Invalid video ID",
          5: "HTML5 player error",
          100: "Video not found",
          101: "Embedding disabled",
          150: "Embedding disabled",
        };
        const msg = errCodes[ev.data] || `YouTube error ${ev.data}`;
        console.error("YouTube player error:", ev.data, msg);
        setMusicStatus(msg);
      },
    },
  });
}

function startYtTicker() {
  if (ytTick) clearInterval(ytTick);
  ytTick = setInterval(() => {
    if (currentAudio !== ytAudio) return;
    if (!musicTimeEl) return;
    const sec = ytAudio.currentTime || 0;
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(Math.floor(sec % 60)).padStart(2, "0");
    musicTimeEl.textContent = `${mm}:${ss}`;
    if (musicSeekEl && !musicScrub) musicSeekEl.value = String(sec);
    if (musicDurEl) {
      const dur = ytAudio.duration || 0;
      const dmm = String(Math.floor(dur / 60)).padStart(2, "0");
      const dss = String(Math.floor(dur % 60)).padStart(2, "0");
      musicDurEl.textContent = `${dmm}:${dss}`;
    }
    if (musicSeekEl) {
      const max = Math.max(0, ytAudio.duration || 0);
      if (musicSeekEl.max !== String(max)) musicSeekEl.max = String(max);
    }
  }, 250);
}

function stopYtTicker() {
  if (ytTick) clearInterval(ytTick);
  ytTick = 0;
}

function getStore(key) {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

function setStore(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_) { }
}

function getTrackLabel(track, index) {
  if (track && track.name && String(track.name).trim()) return track.name;
  const url = track && track.url ? String(track.url) : "";
  if (url) {
    let base = url.split("/").pop() || "";
    base = base.split("?")[0];
    base = base.replace(/\.[a-z0-9]+$/i, "");
    base = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
    if (base) return base;
  }
  return `Track ${index + 1}`;
}

function setMusicStatus(text) {
  if (musicStatusEl) musicStatusEl.textContent = text || "";
}

function parseLrc(text) {
  if (!text) return [];
  const lines = String(text).split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const matches = line.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g);
    if (!matches) continue;
    const lyric = line.replace(/\[[^\]]+\]/g, "").trim();
    if (!lyric) continue;
    const lower = lyric.toLowerCase();
    if (lower.startsWith("ti:")) continue;
    if (lower.startsWith("ar:")) continue;
    if (lower.startsWith("al:")) continue;
    if (lower.startsWith("by:")) continue;
    if (lower.startsWith("offset:")) continue;
    if (lower.includes(" - ") && matches.length === 1) continue;
    if (lower.includes("official") || lower.includes("lyrics")) continue;
    for (const tag of matches) {
      const m = tag.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/);
      if (!m) continue;
      const mm = parseInt(m[1], 10) || 0;
      const ss = parseInt(m[2], 10) || 0;
      const msRaw = m[3] ? m[3] : "0";
      const ms =
        msRaw.length === 3
          ? parseInt(msRaw, 10)
          : parseInt(msRaw.padEnd(3, "0"), 10);
      const delay = mm * 60000 + ss * 1000 + ms;
      if (lyric) out.push({ chat: lyric, delay });
    }
  }
  out.sort((a, b) => a.delay - b.delay);
  return out;
}

function stopMusic() {
  songPlayer.reset();
  setMusicStatus("");
  if (musicTimeEl) musicTimeEl.textContent = "00:00";
  if (musicSeekEl) musicSeekEl.value = "0";
  if (musicNowPlayingEl) musicNowPlayingEl.textContent = "";
  if (musicLyricEl) {
    const lyricText = musicLyricEl.querySelector("#musicLyricText");
    if (lyricText) {
      lyricText.textContent = "♪ No lyrics";
    } else {
      musicLyricEl.textContent = "♪ No lyrics";
    }
  }
  stopYtTicker();
  currentTrackIndex = -1;
  if (currentAudio) {
    if (currentAudio._type === "youtube") {
      if (ytPlayer) {
        ytPlayer.stopVideo();
      }
    } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = null;
  }
}

function startLyrics(index) {
  songPlayer.playSong(index);
}

function syncLyrics() {
  if (currentAudio && !currentAudio.paused) {
    songPlayer.syncTime(currentAudio.currentTime);
  }
}

function playMusic(index) {
  stopMusic();
  currentTrackIndex = index;
  if (typeof window.updateMusicDropdown === "function") {
    window.updateMusicDropdown(index);
  }
  let audio = audios[index];
  const track = musicTracks[index];
  if (!track || !track.url) {
    setMusicStatus("Missing track URL");
    return;
  }
  if (isYouTubeUrl(track.url)) {
    const videoId = getYouTubeId(track.url);
    if (!videoId) {
      setMusicStatus("Invalid YouTube URL");
      return;
    }
    setMusicStatus("Loading...");
    ensureYouTubeApi(() => {
      ensureYouTubePlayer(videoId, () => {
        currentAudio = ytAudio;
        startYtTicker();
        if (ytPlayer) ytPlayer.playVideo();
      });
    });
    return;
  }
  if (!audio) {
    audio = new Audio(track.url);
    audio.loop = false;
    audio.preload = "auto";
    audios[index] = audio;
  }
  currentAudio = audio;
  setMusicStatus("Loading...");
  audio.load();
  audio.volume = 0.6;
  audio.muted = false;
  audio.onwaiting = () => {
    if (currentAudio === audio) setMusicStatus("Buffering...");
  };
  audio.onstalled = () => {
    if (currentAudio === audio) setMusicStatus("Buffering...");
  };
  audio.onplaying = () => {
    if (currentAudio === audio) {
      setMusicStatus("");
      if (typeof window.updatePlayButton === "function")
        window.updatePlayButton();
    }
  };
  audio.onplay = () => {
    if (currentAudio === audio) {
      startLyrics(index);
      syncLyrics();
      if (typeof window.updatePlayButton === "function")
        window.updatePlayButton();
    }
  };
  audio.onpause = () => {
    if (currentAudio === audio) {
      if (typeof window.updatePlayButton === "function")
        window.updatePlayButton();
    }
  };
  audio.onseeked = () => {
    if (currentAudio === audio) syncLyrics();
  };
  audio.onloadedmetadata = () => {
    if (currentAudio !== audio) return;
    if (musicSeekEl) musicSeekEl.max = String(Math.max(0, audio.duration || 0));
    if (musicDurEl) {
      const sec = audio.duration || 0;
      const mm = String(Math.floor(sec / 60)).padStart(2, "0");
      const ss = String(Math.floor(sec % 60)).padStart(2, "0");
      musicDurEl.textContent = `${mm}:${ss}`;
    }
  };
  audio.oncanplay = () => {
    if (currentAudio === audio) setMusicStatus("");
  };
  audio.ontimeupdate = () => {
    if (currentAudio !== audio) return;
    if (!musicTimeEl) return;
    const sec = audio.currentTime || 0;
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(Math.floor(sec % 60)).padStart(2, "0");
    musicTimeEl.textContent = `${mm}:${ss}`;
    if (musicSeekEl && !musicScrub) musicSeekEl.value = String(sec);
  };
  audio.onerror = () => {
    if (currentAudio === audio) setMusicStatus("Failed to load audio");
  };
  audio.play().catch(() => {
    if (currentAudio === audio) setMusicStatus("Playback blocked");
  });
}

function buildMusicMenu() {
  let menu = document.getElementById("musicMenu");
  if (menu) return menu;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes lyricPulse {
      0% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 0.9; }
    }
    @keyframes musicMenuIn {
      0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes musicMenuOut {
      0% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
    }
    #musicMenu {
      background: linear-gradient(135deg, rgba(30, 25, 40, 0.95) 0%, rgba(20, 15, 30, 0.98) 100%);
      border: 1px solid rgba(160, 100, 255, 0.3);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(160, 100, 255, 0.1);
      backdrop-filter: blur(10px);
    }
    #musicMenu.show { animation: musicMenuIn 0.25s ease-out forwards; }
    #musicMenu.hide { animation: musicMenuOut 0.2s ease-in forwards; }
    #musicMenuHeader {
      background: linear-gradient(90deg, rgba(160, 100, 255, 0.2) 0%, transparent 100%);
      padding: 10px 12px;
      margin: -12px -12px 12px -12px;
      border-radius: 12px 12px 0 0;
      border-bottom: 1px solid rgba(160, 100, 255, 0.2);
      cursor: move;
      font-weight: bold;
      color: #a6f;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #musicMenuHeader::before {
      content: "♪";
      font-size: 18px;
    }
    #musicNowPlaying {
      color: #b8f;
      font-size: 11px;
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.8;
    }
    #musicLyric {
      color: #fff;
      font-size: 13px;
      min-height: 20px;
      padding: 8px 12px;
      margin: 8px 0;
      background: rgba(160, 100, 255, 0.1);
      border-radius: 6px;
      text-align: center;
      font-style: italic;
      cursor: pointer;
      transition: background 0.35s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    #musicLyric:hover {
      background: rgba(160, 100, 255, 0.2);
    }
    #musicLyricText {
      flex: 1;
      text-align: center;
    }
    #musicLyricExpand {
      font-size: 10px;
      color: #a6f;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    #musicLyric.expanded #musicLyricExpand {
      transform: rotate(180deg);
    }
    #musicLyricsPanel {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      margin: 0 -4px;
    }
    #musicLyricsPanel.expanded {
      max-height: 200px;
    }
    #musicLyricsList {
      max-height: 200px;
      overflow-y: auto;
      background: rgba(20, 20, 30, 0.6);
      border-radius: 6px;
      padding: 4px;
      margin-bottom: 8px;
    }
    #musicLyricsList::-webkit-scrollbar {
      width: 6px;
    }
    #musicLyricsList::-webkit-scrollbar-track {
      background: rgba(160, 100, 255, 0.1);
      border-radius: 3px;
    }
    #musicLyricsList::-webkit-scrollbar-thumb {
      background: rgba(160, 100, 255, 0.3);
      border-radius: 3px;
    }
    #musicLyricsList::-webkit-scrollbar-thumb:hover {
      background: rgba(160, 100, 255, 0.5);
    }
    .lyricLine {
      padding: 6px 10px;
      margin: 2px 0;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      color: #888;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .lyricLine:hover {
      background: rgba(160, 100, 255, 0.2);
      color: #fff;
    }
    .lyricLine.active {
      background: rgba(160, 100, 255, 0.3);
      color: #a6f;
      font-weight: 500;
    }
    .lyricLine .lyricTime {
      font-size: 10px;
      color: #666;
      min-width: 36px;
    }
    .lyricLine.active .lyricTime {
      color: #a6f;
    }
    .customDropdown {
      position: relative;
      width: 100%;
      margin-top: 8px;
    }
    .dropdownSelected {
      background: rgba(40, 35, 60, 0.8);
      border: 1px solid rgba(160, 100, 255, 0.3);
      border-radius: 6px;
      color: #fff;
      padding: 10px 12px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
    .dropdownSelected:hover {
      border-color: rgba(160, 100, 255, 0.5);
      background: rgba(50, 45, 70, 0.8);
    }
    .dropdownSelected.open {
      border-color: rgba(160, 100, 255, 0.7);
      border-radius: 6px 6px 0 0;
    }
    .dropdownArrow {
      transition: transform 0.2s;
      font-size: 10px;
      color: #a6f;
    }
    .dropdownSelected.open .dropdownArrow {
      transform: rotate(180deg);
    }
    .dropdownOptions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(30, 25, 45, 0.98);
      border: 1px solid rgba(160, 100, 255, 0.5);
      border-top: none;
      border-radius: 0 0 6px 6px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s ease-out;
      z-index: 100;
    }
    .dropdownOptions.open {
      max-height: 240px;
      overflow-y: auto;
    }
    .dropdownOptions::-webkit-scrollbar {
      width: 6px;
    }
    .dropdownOptions::-webkit-scrollbar-track {
      background: rgba(160, 100, 255, 0.1);
    }
    .dropdownOptions::-webkit-scrollbar-thumb {
      background: rgba(160, 100, 255, 0.3);
      border-radius: 3px;
    }
    .dropdownOption {
      padding: 10px 12px;
      cursor: pointer;
      transition: all 0.15s;
      color: #aaa;
      font-size: 13px;
      border-bottom: 1px solid rgba(160, 100, 255, 0.1);
    }
    .dropdownOption:last-child {
      border-bottom: none;
    }
    .dropdownOption:hover {
      background: rgba(160, 100, 255, 0.2);
      color: #fff;
    }
    .dropdownOption.selected {
      background: rgba(160, 100, 255, 0.15);
      color: #a6f;
    }
    .musicBtn {
      background: linear-gradient(135deg, rgba(160, 100, 255, 0.3) 0%, rgba(130, 80, 200, 0.3) 100%);
      border: 1px solid rgba(160, 100, 255, 0.4);
      border-radius: 6px;
      color: #fff;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      font-weight: 500;
    }
    .musicBtn:hover {
      background: linear-gradient(135deg, rgba(160, 100, 255, 0.5) 0%, rgba(130, 80, 200, 0.5) 100%);
      border-color: rgba(160, 100, 255, 0.6);
      transform: translateY(-1px);
    }
    .musicBtn:active {
      transform: translateY(0);
    }
    .musicBtn.stop {
      background: linear-gradient(135deg, rgba(255, 100, 100, 0.3) 0%, rgba(200, 80, 80, 0.3) 100%);
      border-color: rgba(255, 100, 100, 0.4);
    }
    .musicBtn.stop:hover {
      background: linear-gradient(135deg, rgba(255, 100, 100, 0.5) 0%, rgba(200, 80, 80, 0.5) 100%);
      border-color: rgba(255, 100, 100, 0.6);
    }
    #musicSeek {
      -webkit-appearance: none;
      appearance: none;
      height: 6px;
      background: rgba(160, 100, 255, 0.2);
      border-radius: 3px;
      cursor: pointer;
    }
    #musicSeek::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background: linear-gradient(135deg, #b8f 0%, #a6f 100%);
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.1s;
    }
    #musicSeek::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    #musicStatus {
      color: #fa8;
      font-size: 11px;
      min-height: 16px;
    }
    .musicCheckLabel {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #aaa;
      font-size: 12px;
      cursor: pointer;
      padding: 6px 0;
      transition: color 0.2s;
    }
    .musicCheckLabel:hover { color: #fff; }
    .musicCheckLabel input {
      accent-color: #a6f;
    }
  `;
  document.head.appendChild(style);

  menu = document.createElement("div");
  menu.id = "musicMenu";
  menu.style.position = "fixed";
  menu.style.left = "20px";
  menu.style.top = "90px";
  menu.style.zIndex = "10002";
  menu.style.display = "none";
  menu.style.width = "340px";
  menu.style.padding = "12px";
  menu.style.cursor = "default";

  menu.innerHTML = `
    <div id="musicMenuHeader">Music Player</div>
    <div id="musicNowPlaying"></div>
    <div class="customDropdown">
      <div class="dropdownSelected" id="musicDropdownBtn">
        <span id="musicDropdownText">Select a track...</span>
        <span class="dropdownArrow">▼</span>
      </div>
      <div class="dropdownOptions" id="musicDropdownOptions"></div>
    </div>
    <div id="musicLyric" title="Click to expand lyrics">
      <span id="musicLyricText">♪ No lyrics</span>
      <span id="musicLyricExpand">▼</span>
    </div>
    <div id="musicLyricsPanel">
      <div id="musicLyricsList"></div>
    </div>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <div id="musicPlay" class="musicBtn" style="flex:1;">▶ Play</div>
      <div id="musicStop" class="musicBtn stop" style="flex:1;">■ Stop</div>
    </div>
    <div id="musicStatus" style="margin-top:8px;"></div>
    <div style="display:flex; align-items:center; gap:10px; margin-top:8px;">
      <span id="musicTime" style="color:#a6f; font-size:12px; min-width:40px;">00:00</span>
      <input id="musicSeek" type="range" min="0" max="0" step="0.01" value="0" style="flex:1;">
      <span id="musicDur" style="color:#888; font-size:12px; min-width:40px;">00:00</span>
    </div>
    <label class="musicCheckLabel" style="margin-top:10px;">
      <input id="musicAutoChat" type="checkbox" checked />
      <span>Auto-chat lyrics</span>
    </label>
    <div style="color:#666; font-size:10px; margin-top:4px;">Press U to toggle menu</div>
  `;

  document.body.appendChild(menu);

  const savedPos = getStore("musicMenuPos");
  if (savedPos) {
    try {
      const pos = JSON.parse(savedPos);
      if (typeof pos.x === "number" && typeof pos.y === "number") {
        menu.style.left = `${pos.x}px`;
        menu.style.top = `${pos.y}px`;
      }
    } catch (_) { }
  }

  musicNowPlayingEl = menu.querySelector("#musicNowPlaying");
  musicLyricEl = menu.querySelector("#musicLyric");

  const header = menu.querySelector("#musicMenuHeader");
  header.addEventListener("mousedown", (e) => {
    musicDrag.active = true;
    const rect = menu.getBoundingClientRect();
    musicDrag.dx = e.clientX - rect.left;
    musicDrag.dy = e.clientY - rect.top;
  });
  document.addEventListener("mousemove", (e) => {
    if (!musicDrag.active) return;
    const x = Math.max(
      10,
      Math.min(window.innerWidth - 20, e.clientX - musicDrag.dx),
    );
    const y = Math.max(
      10,
      Math.min(window.innerHeight - 20, e.clientY - musicDrag.dy),
    );
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  });
  document.addEventListener("mouseup", () => {
    if (!musicDrag.active) return;
    musicDrag.active = false;
    setStore(
      "musicMenuPos",
      JSON.stringify({
        x: parseInt(menu.style.left, 10) || 20,
        y: parseInt(menu.style.top, 10) || 90,
      }),
    );
  });

  const dropdownBtn = menu.querySelector("#musicDropdownBtn");
  const dropdownText = menu.querySelector("#musicDropdownText");
  const dropdownOptions = menu.querySelector("#musicDropdownOptions");
  const lyricsPanel = menu.querySelector("#musicLyricsPanel");
  const lyricsList = menu.querySelector("#musicLyricsList");
  let dropdownOpen = false;
  let selectedTrackIndex = 0;

  // Build dropdown options
  // Sort tracks alphabetically while preserving original indices
  const sortedTracks = musicTracks
    .map((track, i) => ({ track, originalIndex: i }))
    .sort((a, b) => a.track.name.localeCompare(b.track.name));

  sortedTracks.forEach(({ track, originalIndex }) => {
    const opt = document.createElement("div");
    opt.className = "dropdownOption";
    opt.textContent = track.name;
    opt.dataset.index = originalIndex;
    opt.addEventListener("click", () => {
      selectedTrackIndex = originalIndex;
      dropdownText.textContent = track.name;
      document
        .querySelectorAll(".dropdownOption")
        .forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      closeDropdown();
      playMusic(originalIndex);
      const playBtn = document.querySelector("#musicPlay");
      if (playBtn) playBtn.textContent = "⏸ Pause";
    });
    dropdownOptions.appendChild(opt);
  });

  function closeDropdown() {
    dropdownOpen = false;
    dropdownBtn.classList.remove("open");
    dropdownOptions.classList.remove("open");
  }

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownOpen = !dropdownOpen;
    dropdownBtn.classList.toggle("open", dropdownOpen);
    dropdownOptions.classList.toggle("open", dropdownOpen);
  });

  document.addEventListener("click", (e) => {
    if (!dropdownOptions.contains(e.target) && e.target !== dropdownBtn) {
      closeDropdown();
    }
  });

  // Lyrics panel expand/collapse
  musicLyricEl.addEventListener("click", () => {
    lyricsPanel.classList.toggle("expanded");
    musicLyricEl.classList.toggle("expanded");
  });

  function updateLyricsList(trackIndex) {
    lyricsList.innerHTML = "";
    const track = musicTracks[trackIndex];
    if (!track || !track.lyrics || !track.lyrics.length) {
      lyricsList.innerHTML =
        '<div style="padding:12px;color:#666;text-align:center;font-size:12px;">No lyrics available</div>';
      return;
    }
    track.lyrics.forEach((line, i) => {
      const div = document.createElement("div");
      div.className = "lyricLine";
      div.dataset.index = i;
      div.dataset.time = line[0];
      const timeMs = line[0];
      const timeSec = Math.floor(timeMs / 1000);
      const mins = Math.floor(timeSec / 60);
      const secs = timeSec % 60;
      div.innerHTML = `<span class="lyricTime">${mins}:${secs.toString().padStart(2, "0")}</span><span>${line[1]}</span>`;
      div.addEventListener("click", () => {
        const seekTime = timeMs / 1000 - 0.5;
        if (currentAudio && typeof currentAudio.currentTime !== "undefined") {
          currentAudio.currentTime = seekTime;
        } else if (ytPlayer && typeof ytPlayer.seekTo === "function") {
          ytPlayer.seekTo(seekTime, true);
        }
      });
      lyricsList.appendChild(div);
    });
  }

  window.updateActiveLyricInList = function (timeMs) {
    const lines = lyricsList.querySelectorAll(".lyricLine");
    let activeIndex = -1;
    const track = musicTracks[currentTrackIndex];
    if (!track || !track.lyrics) return;
    for (let i = track.lyrics.length - 1; i >= 0; i--) {
      if (timeMs >= track.lyrics[i][0]) {
        activeIndex = i;
        break;
      }
    }
    lines.forEach((line, i) => {
      line.classList.toggle("active", i === activeIndex);
    });
    if (activeIndex >= 0 && lyricsPanel.classList.contains("expanded")) {
      const activeLine = lines[activeIndex];
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // Update dropdown text when track changes
  window.updateMusicDropdown = function (index) {
    if (musicTracks[index]) {
      dropdownText.textContent = musicTracks[index].name;
      selectedTrackIndex = index;
      document.querySelectorAll(".dropdownOption").forEach((o, i) => {
        o.classList.toggle("selected", i === index);
      });
      updateLyricsList(index);
    }
  };

  musicStatusEl = menu.querySelector("#musicStatus");
  musicTimeEl = menu.querySelector("#musicTime");
  musicDurEl = menu.querySelector("#musicDur");
  musicSeekEl = menu.querySelector("#musicSeek");

  if (musicTimeEl) musicTimeEl.textContent = "00:00";
  if (musicDurEl) musicDurEl.textContent = "00:00";
  if (musicSeekEl) {
    musicSeekEl.max = "0";
    musicSeekEl.value = "0";
    const onScrubStart = () => {
      musicScrub = true;
    };
    const onScrubEnd = () => {
      musicScrub = false;
    };
    musicSeekEl.addEventListener("pointerdown", onScrubStart);
    musicSeekEl.addEventListener("pointerup", onScrubEnd);
    musicSeekEl.addEventListener("pointercancel", onScrubEnd);
    musicSeekEl.addEventListener("input", () => {
      if (!currentAudio) return;
      const v = parseFloat(musicSeekEl.value);
      if (!Number.isFinite(v)) return;
      currentAudio.currentTime = Math.max(0, v);
      syncLyrics();
    });
  }

  const playBtn = menu.querySelector("#musicPlay");

  function updatePlayButton() {
    if (!currentAudio) {
      playBtn.textContent = "▶ Play";
      return;
    }
    if (currentAudio._type === "youtube") {
      if (
        ytPlayer &&
        ytPlayer.getPlayerState &&
        ytPlayer.getPlayerState() === 1
      ) {
        playBtn.textContent = "⏸ Pause";
      } else {
        playBtn.textContent = "▶ Play";
      }
    } else {
      if (currentAudio.paused) {
        playBtn.textContent = "▶ Play";
      } else {
        playBtn.textContent = "⏸ Pause";
      }
    }
  }

  window.updatePlayButton = updatePlayButton;

  playBtn.addEventListener("click", () => {
    if (currentAudio) {
      if (currentAudio._type === "youtube") {
        if (ytPlayer) {
          if (ytPlayer.getPlayerState && ytPlayer.getPlayerState() === 1) {
            ytPlayer.pauseVideo();
          } else {
            ytPlayer.playVideo();
          }
        }
      } else {
        if (currentAudio.paused) {
          currentAudio.play();
        } else {
          currentAudio.pause();
        }
      }
      updatePlayButton();
    } else {
      if (musicNowPlayingEl) {
        musicNowPlayingEl.textContent = `Now Playing: ${getTrackLabel(musicTracks[selectedTrackIndex], selectedTrackIndex)}`;
      }
      playMusic(selectedTrackIndex);
    }
  });
  menu.querySelector("#musicStop").addEventListener("click", () => {
    stopMusic();
    updatePlayButton();
  });
  menu.querySelector("#musicAutoChat").addEventListener("change", (e) => {
    autoChatLyrics = e.target.checked;
  });

  return menu;
}

document.addEventListener("keydown", (e) => {
  if (isChatActive()) return;
  if (e.key === "u" || e.key === "U") {
    const menu = buildMusicMenu();
    musicMenuOpen = !musicMenuOpen;
    if (musicMenuOpen) {
      menu.style.display = "block";
      menu.classList.remove("hide");
      menu.classList.add("show");
    } else {
      menu.classList.remove("show");
      menu.classList.add("hide");
      setTimeout(() => {
        if (!musicMenuOpen) menu.style.display = "none";
      }, 200);
    }
  }
});

const R = { wood: 0, stone: 0, food: 0, points: 0, kills: 0 };

const updateStatusDisplay = () => {
  if (!player?.alive) return;
  for (let k in R) R[k] += (player[k] - R[k]) / 30;
  Gf.textContent = UTILS.kFormat(Math.round(R.points));
  Yf.textContent = UTILS.kFormat(Math.round(R.food));
  Kf.textContent = UTILS.kFormat(Math.round(R.wood));
  Zf.textContent = UTILS.kFormat(Math.round(R.stone));
  Jf.textContent = UTILS.kFormat(Math.round(R.kills));

  requestAnimationFrame(updateStatusDisplay);
};
updateStatusDisplay();

const Di = {};
const ks = ["crown", "skull"];
function loadIcons() {
  for (let e = 0; e < ks.length; ++e) {
    const t = new Image();
    t.onload = function () {
      this.isLoaded = true;
    };
    t.src = "./img/icons/" + ks[e] + ".png";
    Di[ks[e]] = t;
  }
}
const Kt = [];
function updateUpgrades(e, t) {
  player.upgradePoints = e;
  player.upgrAge = t;
  if (e > 0) {
    Kt.length = 0;
    UTILS.removeAllChildren(Gt);
    for (var i = 0; i < items.weapons.length; ++i) {
      if (
        items.weapons[i].age == t &&
        (items.weapons[i].pre == null ||
          player.weapons.indexOf(items.weapons[i].pre) >= 0)
      ) {
        var n = UTILS.generateElement({
          id: "upgradeItem" + i,
          class: "actionBarItem",
          onmouseout: function () {
            showItemInfo();
          },
          parent: Gt,
        });
        n.style.backgroundImage = document.getElementById(
          "actionBarItem" + i,
        ).style.backgroundImage;
        Kt.push(i);
      }
    }
    for (var i = 0; i < items.list.length; ++i) {
      if (
        items.list[i].age == t &&
        (items.list[i].pre == null ||
          player.items.indexOf(items.list[i].pre) >= 0)
      ) {
        const r = items.weapons.length + i;
        var n = UTILS.generateElement({
          id: "upgradeItem" + r,
          class: "actionBarItem",
          onmouseout: function () {
            showItemInfo();
          },
          parent: Gt,
        });
        n.style.backgroundImage = document.getElementById(
          "actionBarItem" + r,
        ).style.backgroundImage;
        Kt.push(r);
      }
    }
    for (var i = 0; i < Kt.length; i++) {
      (function (r) {
        const o = document.getElementById("upgradeItem" + r);
        o.onmouseover = function () {
          if (items.weapons[r]) {
            showItemInfo(items.weapons[r], true);
          } else {
            showItemInfo(items.list[r - items.weapons.length]);
          }
        };
        o.onclick = UTILS.checkTrusted(function () {
          io.send("H", r);
        });
        UTILS.hookTouchEvents(o);
      })(Kt[i]);
    }
    if (Kt.length) {
      Gt.style.display = "block";
      tn.style.display = "block";
      tn.innerHTML = "SELECT ITEMS (" + e + ")";
    } else {
      Gt.style.display = "none";
      tn.style.display = "none";
      showItemInfo();
    }
  } else {
    Gt.style.display = "none";
    tn.style.display = "none";
    showItemInfo();
  }
}
function updateAge(e, t, i) {
  if (e != null) {
    player.XP = e;
  }
  if (t != null) {
    player.maxXP = t;
  }
  if (i != null) {
    player.age = i;
  }
  if (i == config.maxAge) {
    yo.innerHTML = "MAX AGE";
    wo.style.width = "100%";
  } else {
    yo.innerHTML = "AGE " + player.age;
    wo.style.width = (player.XP / player.maxXP) * 100 + "%";
  }
}
function updateLeaderboard(e) {
  UTILS.removeAllChildren(go);
  let t = 1;
  for (let i = 0; i < e.length; i += 3) {
    (function (n) {
      UTILS.generateElement({
        class: "leaderHolder",
        parent: go,
        children: [
          UTILS.generateElement({
            class: "leaderboardItem",
            style:
              "color:" + (e[n] == playerSID ? "#fff" : "rgba(255,255,255,0.6)"),
            text: t + ". " + (e[n + 1] != "" ? e[n + 1] : "unknown"),
          }),
          UTILS.generateElement({
            class: "leaderScore",
            text: UTILS.kFormat(e[n + 2]) || "0",
          }),
        ],
      });
    })(i);
    t++;
  }
}
let bo = null;
const seePoint = ({ x, y, scale }) =>
  Math.abs(x - player.x) - scale <= (maxScreenWidth / 2) * 1.3 &&
  Math.abs(y - player.y) - scale <= (maxScreenHeight / 2) * 1.3;
function ShorePath(startX, startY, endX, distance, float) {
  this.startX = startX;
  this.startY = startY;
  this.distance = distance;
  this.float = float;
  this.amountPaths = Math.ceil(endX / distance);
  this.path = new Map();
  this.generate = () => {
    for (let i = 1; i <= this.amountPaths; i++) {
      const offsetY = i % 2 ? 0 : distance;
      const rand = Math.floor(Math.random() * 35) + 10;
      const x = startX + distance * (i - 1);
      const y =
        startY +
        (float === "down" ? offsetY : -offsetY) +
        (i % 2 ? 0 : Math.random() < 0.55 ? rand : -rand);
      this.path.set(i, [x, y, offsetY, rand]);
    }
  };
  this.render = (color, xOffset, yOffset) => {
    if (!player?.active || !player?.alive) return;
    const pts = [...this.path.values()];
    const half = distance / 2;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      if (
        !seePoint({ x: a[0], y: a[1], scale: 10 }) ||
        !seePoint({ x: b[0], y: b[1], scale: 10 })
      )
        continue;
      const s1 = [a[0] - half / 2, a[1] + (a[2] ? -half : half)];
      const s2 = [b[0] + half * 1.15, b[1] + half * 1.2];
      const s3 = [b[0] + half * 1.35, b[1] - half * 1.15];
      C.save();
      C.fillStyle = color;
      C.lineCap = C.lineJoin = "round";
      C.beginPath();
      C.moveTo(a[0] - xOffset, a[1] - yOffset);
      C.lineTo(a[0] + distance * 2 - xOffset, startY - yOffset);
      C.lineTo(b[0] - xOffset, b[1] - yOffset);
      C.fill();
      C.beginPath();
      C.moveTo(a[0] - xOffset, a[1] - yOffset);
      C.bezierCurveTo(
        s1[0] - xOffset,
        s1[1] - yOffset,
        s2[0] - xOffset,
        s2[1] - yOffset,
        b[0] + (b[3] >= 10 ? 3.5 : 1) - xOffset,
        b[1] - yOffset,
      );
      C.fill();
      C.beginPath();
      C.moveTo(b[0] - xOffset, b[1] - yOffset);
      C.bezierCurveTo(
        s2[0] - xOffset,
        s2[1] - yOffset,
        s3[0] - xOffset,
        s3[1] - yOffset,
        b[0] + distance * 2 - xOffset,
        startY - yOffset,
      );
      C.fill();
      C.restore();
    }
  };
  this.generate();
}

const snowPath = new ShorePath(
  -maxScreenWidth,
  config.snowBiomeTop - 1,
  config.mapScale + maxScreenWidth * 2,
  20,
  "down",
);
const desertPath = new ShorePath(
  -maxScreenWidth,
  config.mapScale - config.snowBiomeTop + 1,
  config.mapScale + maxScreenWidth * 2,
  50,
  "up",
);

let nightModeState = {
  get isEnabled() {
    return AB.Menu.nightMode !== false;
  },
  overlay: { opacity: 0, r: 0, g: 0, b: 0 },
  starField: [],
};

let starSpawnTimer = 0;

const AbyssParticles = {
  createParticle(type, offsetX, offsetY) {
    const baseSize = (AB.Menu.particleSize || 1) * UTILS.randFloat(2, 6);
    const speed = AB.Menu.particleSpeed || 1;

    const base = {
      posX: offsetX + UTILS.randFloat(0, maxScreenWidth),
      posY: offsetY + UTILS.randFloat(0, maxScreenHeight),
      size: baseSize,
      transparency: 0,
      visible: true,
      brightening: true,
      type: type,
      age: 0,
      maxAge: UTILS.randFloat(3000, 8000),
    };

    switch (type) {
      case "stars":
        const scaleMultiplier = UTILS.randFloat(1, 3);
        return {
          ...base,
          scaleMultiplier: scaleMultiplier,
          posX: offsetX * scaleMultiplier + UTILS.randFloat(0, maxScreenWidth),
          posY: offsetY * scaleMultiplier + UTILS.randFloat(0, maxScreenHeight),
          color: `rgb(255, 255, ${UTILS.randInt(0, 255)})`,
          twinkleSpeed: UTILS.randFloat(0.01, 0.03),
        };

      case "voidParticles":
        return {
          ...base,
          scaleMultiplier: UTILS.randFloat(0.5, 2),
          velocityY: -UTILS.randFloat(0.3, 1) * speed,
          velocityX: UTILS.randFloat(-0.2, 0.2) * speed,
          color: "rgb(155, 92, 255)",
          glowSize: baseSize * 2,
          pulse: 0,
          pulseSpeed: UTILS.randFloat(0.02, 0.05),
        };

      case "wisps":
        return {
          ...base,
          scaleMultiplier: 1,
          angle: UTILS.randFloat(0, Math.PI * 2),
          angleSpeed: UTILS.randFloat(-0.02, 0.02) * speed,
          waveAmplitude: UTILS.randFloat(20, 50),
          waveFrequency: UTILS.randFloat(0.001, 0.003),
          waveOffset: UTILS.randFloat(0, Math.PI * 2),
          velocityY: UTILS.randFloat(-0.3, 0.3) * speed,
          color: { r: 0, g: 255, b: 255 },
          trail: [],
          maxTrail: 8,
        };

      case "embers":
        return {
          ...base,
          scaleMultiplier: UTILS.randFloat(0.5, 1.5),
          velocityY: UTILS.randFloat(0.5, 1.5) * speed,
          velocityX: UTILS.randFloat(-0.3, 0.3) * speed,
          rotation: UTILS.randFloat(0, Math.PI * 2),
          rotationSpeed: UTILS.randFloat(-0.05, 0.05),
          color: `rgb(255, ${UTILS.randInt(50, 150)}, 0)`,
          flicker: 0,
        };

      case "bioluminescent":
        return {
          ...base,
          scaleMultiplier: UTILS.randFloat(0.3, 1),
          velocityY: UTILS.randFloat(-0.2, 0.2) * speed,
          velocityX: UTILS.randFloat(-0.2, 0.2) * speed,
          color: { r: 50, g: 255, b: 100 },
          blinkState: "off",
          blinkTimer: UTILS.randFloat(0, 2000),
          blinkDuration: UTILS.randFloat(500, 1500),
          blinkInterval: UTILS.randFloat(2000, 5000),
          intensity: 0,
        };

      case "runes":
        const runeShapes = ["triangle", "circle", "diamond", "cross", "spiral"];
        return {
          ...base,
          scaleMultiplier: UTILS.randFloat(0.8, 1.5),
          shape: runeShapes[UTILS.randInt(0, runeShapes.length - 1)],
          rotation: UTILS.randFloat(0, Math.PI * 2),
          rotationSpeed: UTILS.randFloat(-0.01, 0.01) * speed,
          velocityY: UTILS.randFloat(-0.1, -0.3) * speed,
          velocityX: UTILS.randFloat(-0.1, 0.1) * speed,
          color: { r: 255, g: 215, b: 0 },
          glowIntensity: 0,
        };

      case "voidCracks":
        return {
          ...base,
          scaleMultiplier: 1,
          points: this.generateCrackPoints(),
          color: { r: 75, g: 0, b: 130 },
          spreadProgress: 0,
          spreadSpeed: UTILS.randFloat(0.01, 0.03) * speed,
          maxSpread: 1,
          glowSize: 3,
        };

      case "abyssEyes":
        return {
          ...base,
          scaleMultiplier: UTILS.randFloat(0.5, 1.2),
          eyeState: "closed",
          eyeTimer: UTILS.randFloat(3000, 8000),
          openDuration: UTILS.randFloat(2000, 4000),
          pupilX: 0,
          pupilY: 0,
          pupilTargetX: 0,
          pupilTargetY: 0,
          color: { r: 255, g: 0, b: 0 },
          maxAge: UTILS.randFloat(8000, 15000),
        };

      default:
        return base;
    }
  },

  generateCrackPoints() {
    const points = [{ x: 0, y: 0 }];
    let currentX = 0,
      currentY = 0;
    const segments = UTILS.randInt(3, 6);
    for (let i = 0; i < segments; i++) {
      const angle =
        UTILS.randFloat(-Math.PI / 3, Math.PI / 3) +
        (i === 0
          ? UTILS.randFloat(0, Math.PI * 2)
          : Math.atan2(
            currentY - points[points.length - 2]?.y || 0,
            currentX - points[points.length - 2]?.x || 0,
          ));
      const length = UTILS.randFloat(15, 40);
      currentX += Math.cos(angle) * length;
      currentY += Math.sin(angle) * length;
      points.push({ x: currentX, y: currentY });
      if (Math.random() < 0.3 && i > 0) {
        const branchAngle =
          angle +
          (Math.random() < 0.5 ? 1 : -1) *
          UTILS.randFloat(Math.PI / 4, Math.PI / 2);
        const branchLength = UTILS.randFloat(8, 20);
        points.push({
          x: currentX + Math.cos(branchAngle) * branchLength,
          y: currentY + Math.sin(branchAngle) * branchLength,
          branch: true,
        });
        points.push({ x: currentX, y: currentY, branchEnd: true });
      }
    }
    return points;
  },

  updateParticle(particle, delta) {
    particle.age += delta;
    const speed = AB.Menu.particleSpeed || 1;
    const maxOpacity = AB.Menu.particleOpacity || 0.8;

    if (particle.age > particle.maxAge * 0.8) {
      particle.brightening = false;
    }

    if (particle.brightening) {
      particle.transparency = Math.min(
        maxOpacity,
        particle.transparency + 0.015,
      );
      if (particle.transparency >= maxOpacity) particle.brightening = false;
    } else {
      particle.transparency = Math.max(0, particle.transparency - 0.01);
      if (particle.transparency <= 0) particle.visible = false;
    }

    switch (particle.type) {
      case "voidParticles":
        particle.posX += particle.velocityX * delta * 0.05;
        particle.posY += particle.velocityY * delta * 0.05;
        particle.pulse += particle.pulseSpeed;
        break;

      case "wisps":
        particle.angle += particle.angleSpeed * delta * 0.1;
        particle.waveOffset += particle.waveFrequency * delta;
        const waveX =
          Math.sin(particle.waveOffset) * particle.waveAmplitude * 0.1;
        particle.posX += waveX * delta * 0.01;
        particle.posY += particle.velocityY * delta * 0.05;
        if (particle.trail.length >= particle.maxTrail) particle.trail.shift();
        particle.trail.push({
          x: particle.posX,
          y: particle.posY,
          alpha: particle.transparency,
        });
        break;

      case "embers":
        particle.posX += particle.velocityX * delta * 0.05;
        particle.posY += particle.velocityY * delta * 0.05;
        particle.rotation += particle.rotationSpeed * delta * 0.1;
        particle.flicker = Math.sin(particle.age * 0.01) * 0.3;
        particle.velocityX += UTILS.randFloat(-0.01, 0.01);
        break;

      case "bioluminescent":
        particle.posX += particle.velocityX * delta * 0.03;
        particle.posY += particle.velocityY * delta * 0.03;
        particle.blinkTimer += delta;
        if (
          particle.blinkState === "off" &&
          particle.blinkTimer >= particle.blinkInterval
        ) {
          particle.blinkState = "brightening";
          particle.blinkTimer = 0;
        } else if (particle.blinkState === "brightening") {
          particle.intensity = Math.min(1, particle.intensity + 0.05);
          if (particle.intensity >= 1) particle.blinkState = "on";
        } else if (
          particle.blinkState === "on" &&
          particle.blinkTimer >= particle.blinkDuration
        ) {
          particle.blinkState = "dimming";
        } else if (particle.blinkState === "dimming") {
          particle.intensity = Math.max(0, particle.intensity - 0.03);
          if (particle.intensity <= 0) {
            particle.blinkState = "off";
            particle.blinkTimer = 0;
          }
        }
        break;

      case "runes":
        particle.posX += particle.velocityX * delta * 0.03;
        particle.posY += particle.velocityY * delta * 0.03;
        particle.rotation += particle.rotationSpeed * delta * 0.1;
        particle.glowIntensity = 0.5 + Math.sin(particle.age * 0.003) * 0.5;
        break;

      case "voidCracks":
        if (particle.spreadProgress < particle.maxSpread) {
          particle.spreadProgress = Math.min(
            particle.maxSpread,
            particle.spreadProgress + particle.spreadSpeed * delta * 0.05,
          );
        }
        break;

      case "abyssEyes":
        particle.eyeTimer -= delta;
        if (particle.eyeState === "closed" && particle.eyeTimer <= 0) {
          particle.eyeState = "opening";
          particle.eyeTimer = 500;
        } else if (particle.eyeState === "opening") {
          if (particle.eyeTimer <= 0) {
            particle.eyeState = "open";
            particle.eyeTimer = particle.openDuration;
            particle.pupilTargetX = UTILS.randFloat(-1, 1);
            particle.pupilTargetY = UTILS.randFloat(-1, 1);
          }
        } else if (particle.eyeState === "open") {
          particle.pupilX += (particle.pupilTargetX - particle.pupilX) * 0.05;
          particle.pupilY += (particle.pupilTargetY - particle.pupilY) * 0.05;
          if (Math.random() < 0.005) {
            particle.pupilTargetX = UTILS.randFloat(-1, 1);
            particle.pupilTargetY = UTILS.randFloat(-1, 1);
          }
          if (particle.eyeTimer <= 0) {
            particle.eyeState = "closing";
            particle.eyeTimer = 500;
          }
        } else if (particle.eyeState === "closing") {
          if (particle.eyeTimer <= 0) {
            particle.eyeState = "closed";
            particle.eyeTimer = UTILS.randFloat(3000, 8000);
          }
        }
        break;

      case "stars":
        const starSpeed = (particle.twinkleSpeed || 0.02) * delta * 0.06;
        particle.transparency = particle.brightening
          ? Math.min(1, particle.transparency + starSpeed)
          : Math.max(0, particle.transparency - starSpeed);
        if (particle.transparency >= 1) particle.brightening = false;
        if (particle.transparency <= 0) particle.visible = false;
        break;

      default:
        const defaultSpeed = (particle.twinkleSpeed || 0.015) * delta * 0.06;
        if (particle.brightening) {
          particle.transparency = Math.min(
            maxOpacity,
            particle.transparency + defaultSpeed,
          );
        } else {
          particle.transparency = Math.max(0, particle.transparency - defaultSpeed);
          if (particle.transparency <= 0) particle.visible = false;
        }
        break;
    }
  },

  renderParticle(ctx, particle, offsetX, offsetY) {
    const sizeMultiplier = AB.Menu.particleSize || 1;
    ctx.save();
    ctx.globalAlpha = particle.transparency;

    const screenX = particle.posX - offsetX * (particle.scaleMultiplier || 1);
    const screenY = particle.posY - offsetY * (particle.scaleMultiplier || 1);

    switch (particle.type) {
      case "stars":
        ctx.translate(screenX, screenY);
        ctx.scale(particle.size, particle.size);
        ctx.beginPath();
        ctx.moveTo(0, -3);
        for (let i = 1; i < 8; i++) {
          const angle = (Math.PI / 4) * i;
          const radius = i % 2 === 0 ? 3 : 1.5;
          ctx.lineTo(Math.sin(angle) * radius, -Math.cos(angle) * radius);
        }
        ctx.closePath();
        ctx.fillStyle = particle.color;
        ctx.fill();
        break;

      case "voidParticles":
        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2);
        const gradient = ctx.createRadialGradient(
          screenX,
          screenY,
          0,
          screenX,
          screenY,
          pulseSize * 3,
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(
          0.4,
          particle.color.replace("rgb", "rgba").replace(")", ", 0.5)"),
        );
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, pulseSize * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "wisps":
        ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency * 0.3})`;
        ctx.lineWidth = particle.size * 0.5;
        ctx.lineCap = "round";
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(
            particle.trail[0].x - offsetX,
            particle.trail[0].y - offsetY,
          );
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(
              particle.trail[i].x - offsetX,
              particle.trail[i].y - offsetY,
            );
          }
          ctx.stroke();
        }
        const wispGradient = ctx.createRadialGradient(
          screenX,
          screenY,
          0,
          screenX,
          screenY,
          particle.size * 2,
        );
        wispGradient.addColorStop(
          0,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency})`,
        );
        wispGradient.addColorStop(1, "transparent");
        ctx.fillStyle = wispGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "embers":
        ctx.translate(screenX, screenY);
        ctx.rotate(particle.rotation);
        const emberAlpha = Math.max(
          0,
          particle.transparency + particle.flicker,
        );
        ctx.globalAlpha = emberAlpha;
        const emberGradient = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          particle.size,
        );
        emberGradient.addColorStop(0, particle.color);
        emberGradient.addColorStop(
          0.6,
          particle.color.replace(")", ", 0.6)").replace("rgb", "rgba"),
        );
        emberGradient.addColorStop(1, "transparent");
        ctx.fillStyle = emberGradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "bioluminescent":
        const bioIntensity = particle.intensity * particle.transparency;
        if (bioIntensity > 0.05) {
          const bioGradient = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            particle.size * 4,
          );
          bioGradient.addColorStop(
            0,
            `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${bioIntensity})`,
          );
          bioGradient.addColorStop(
            0.3,
            `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${bioIntensity * 0.5})`,
          );
          bioGradient.addColorStop(1, "transparent");
          ctx.fillStyle = bioGradient;
          ctx.beginPath();
          ctx.arc(screenX, screenY, particle.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = particle.transparency * 0.3 + bioIntensity * 0.7;
        ctx.fillStyle = `rgb(${particle.color.r}, ${particle.color.g}, ${particle.color.b})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "runes":
        ctx.translate(screenX, screenY);
        ctx.rotate(particle.rotation);
        ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency})`;
        ctx.lineWidth = 1.5 * sizeMultiplier;
        ctx.shadowColor = `rgb(${particle.color.r}, ${particle.color.g}, ${particle.color.b})`;
        ctx.shadowBlur = 10 * particle.glowIntensity;
        const runeSize = particle.size * 2;
        ctx.beginPath();
        switch (particle.shape) {
          case "triangle":
            ctx.moveTo(0, -runeSize);
            ctx.lineTo(runeSize * 0.866, runeSize * 0.5);
            ctx.lineTo(-runeSize * 0.866, runeSize * 0.5);
            ctx.closePath();
            break;
          case "circle":
            ctx.arc(0, 0, runeSize, 0, Math.PI * 2);
            ctx.moveTo(runeSize * 0.5, 0);
            ctx.arc(0, 0, runeSize * 0.5, 0, Math.PI * 2);
            break;
          case "diamond":
            ctx.moveTo(0, -runeSize);
            ctx.lineTo(runeSize * 0.7, 0);
            ctx.lineTo(0, runeSize);
            ctx.lineTo(-runeSize * 0.7, 0);
            ctx.closePath();
            break;
          case "cross":
            ctx.moveTo(0, -runeSize);
            ctx.lineTo(0, runeSize);
            ctx.moveTo(-runeSize, 0);
            ctx.lineTo(runeSize, 0);
            break;
          case "spiral":
            for (let i = 0; i < 720; i += 10) {
              const rad = (i * Math.PI) / 180;
              const r = (runeSize * i) / 720;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            break;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;

      case "voidCracks":
        ctx.translate(screenX, screenY);
        ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency})`;
        ctx.lineWidth = 2 * sizeMultiplier;
        ctx.shadowColor = `rgb(${particle.color.r}, ${particle.color.g}, ${particle.color.b})`;
        ctx.shadowBlur = particle.glowSize * 3;
        ctx.lineCap = "round";
        const points = particle.points;
        const visiblePoints = Math.floor(
          points.length * particle.spreadProgress,
        );
        if (visiblePoints > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < visiblePoints; i++) {
            if (points[i].branchEnd) {
              ctx.moveTo(points[i].x, points[i].y);
            } else if (points[i].branch) {
              const prevPoint = points[i - 1];
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(points[i].x, points[i].y);
            } else {
              ctx.lineTo(points[i].x, points[i].y);
            }
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        break;

      case "abyssEyes":
        ctx.translate(screenX, screenY);
        const eyeSize = particle.size * 3;
        let openAmount = 0;
        if (particle.eyeState === "opening")
          openAmount = 1 - particle.eyeTimer / 500;
        else if (particle.eyeState === "open") openAmount = 1;
        else if (particle.eyeState === "closing")
          openAmount = particle.eyeTimer / 500;
        if (openAmount > 0.05) {
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.transparency * 0.8})`;
          ctx.beginPath();
          ctx.ellipse(
            0,
            0,
            eyeSize,
            eyeSize * openAmount * 0.6,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          const irisGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            eyeSize * 0.6,
          );
          irisGradient.addColorStop(
            0,
            `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency})`,
          );
          irisGradient.addColorStop(
            1,
            `rgba(${particle.color.r * 0.5}, ${particle.color.g * 0.5}, ${particle.color.b * 0.5}, ${particle.transparency})`,
          );
          ctx.fillStyle = irisGradient;
          ctx.beginPath();
          ctx.ellipse(
            0,
            0,
            eyeSize * 0.5,
            eyeSize * openAmount * 0.4,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          const pupilX = particle.pupilX * eyeSize * 0.15;
          const pupilY = particle.pupilY * eyeSize * openAmount * 0.1;
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.transparency})`;
          ctx.beginPath();
          ctx.ellipse(
            pupilX,
            pupilY,
            eyeSize * 0.2,
            eyeSize * openAmount * 0.25,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.transparency * 0.6})`;
          ctx.beginPath();
          ctx.arc(
            pupilX - eyeSize * 0.08,
            pupilY - eyeSize * openAmount * 0.08,
            eyeSize * 0.06,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.transparency * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-eyeSize, 0);
        ctx.quadraticCurveTo(0, -eyeSize * openAmount * 0.8, eyeSize, 0);
        ctx.quadraticCurveTo(0, eyeSize * openAmount * 0.8, -eyeSize, 0);
        ctx.stroke();
        break;

      default:
        ctx.fillStyle = particle.color || "#9B5CFF";
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
  },
};

function updateBloodParticles(delta, offsetX, offsetY) {
  for (let i = bloodParticles.length - 1; i >= 0; i--) {
    const particle = bloodParticles[i];
    const alive = particle.update(delta);
    if (alive) {
      mainContext.save();
      mainContext.globalAlpha = particle.life;
      mainContext.fillStyle = particle.color;
      mainContext.beginPath();
      mainContext.arc(
        particle.x - offsetX,
        particle.y - offsetY,
        particle.size,
        0,
        Math.PI * 2,
      );
      mainContext.fill();
      mainContext.restore();
    } else {
      bloodParticles.splice(i, 1);
    }
  }
}

let particleSpawnTimer = 0;

let renderShapes = (mainContext, delta, offsetX, offsetY) => {
  let targetOpacity = 0;
  if (AB.Menu.dayNightCycle) {
    const cycleDuration = (AB.Menu.cycleDuration || 720) * 1000;
    const time = (Date.now() % cycleDuration) / cycleDuration;
    targetOpacity = (-Math.cos(time * Math.PI * 2) + 1) / 4;
  } else if (nightModeState.isEnabled) {
    targetOpacity = 0.5;
  }

  nightModeState.overlay.opacity =
    nightModeState.overlay.opacity < targetOpacity
      ? Math.min(targetOpacity, nightModeState.overlay.opacity + 0.0005 * delta)
      : Math.max(targetOpacity, nightModeState.overlay.opacity - 0.0005 * delta);

  updateBloodParticles(delta, offsetX, offsetY);

  if (nightModeState.overlay.opacity > 0 && AB.Menu.showStars) {
    if (nightModeState.overlay.opacity > 0.3 && starSpawnTimer > 300) {
      starSpawnTimer = 0;
      let starCount = UTILS.randInt(3, 5);
      for (let i = 0; i < starCount; i++) {
        let scaleMultiplier = UTILS.randFloat(1, 3);
        nightModeState.starField.push({
          scaleMultiplier,
          posX: offsetX * scaleMultiplier + UTILS.randFloat(0, maxScreenWidth),
          posY: offsetY * scaleMultiplier + UTILS.randFloat(0, maxScreenHeight),
          size: UTILS.randFloat(2, 6),
          transparency: 0,
          visible: true,
          brightening: true,
          color: `rgb(255, 255, ${UTILS.randInt(0, 255)})`,
        });
      }
    } else {
      starSpawnTimer += delta;
    }
  }

  nightModeState.starField = nightModeState.starField.filter(
    (star) => star.visible,
  );

  for (let i = 0; i < nightModeState.starField.length; i++) {
    let star = nightModeState.starField[i];

    if (star.brightening) {
      star.transparency = Math.min(1, star.transparency + 0.02);
      if (star.transparency >= 1) star.brightening = false;
    } else {
      star.transparency = Math.max(0, star.transparency - 0.02);
      if (star.transparency <= 0) star.visible = false;
    }

    let renderStar = (mainContext, size) => {
      mainContext.beginPath();
      mainContext.moveTo(0, -size);
      for (let i = 1; i < 8; i++) {
        let angle = (Math.PI / 4) * i;
        let radius = i % 2 === 0 ? size : size / 2;
        mainContext.lineTo(Math.sin(angle) * radius, -Math.cos(angle) * radius);
      }
      mainContext.closePath();
    };

    mainContext.save();
    mainContext.globalAlpha = star.transparency;
    mainContext.translate(
      star.posX - offsetX * star.scaleMultiplier,
      star.posY - offsetY * star.scaleMultiplier,
    );
    mainContext.scale(star.size, star.size);
    renderStar(mainContext, 3);
    mainContext.fillStyle = star.color;
    mainContext.fill();
    mainContext.restore();
  }
};

function updateGame() {
  {
    if (player && (!us || hi - us >= 1000 / config.clientSendRate)) {
      us = hi;
      const a = getSafeDir();
      if (bo !== a) {
        bo = a;
        io.send("D", a);
      }
    }
    updateMacros();
    if (gn < 120) {
      gn += delta * 0.1;
      //Fi.style.fontSize = Math.min(Math.round(gn), 120) + "px";
    }
    if (player) {
      const a = UTILS.getDistance(camX, camY, player.x, player.y);
      const f = UTILS.getDirection(player.x, player.y, camX, camY);
      const d = Math.min(a * 0.01 * delta, a);
      if (a > 0.05) {
        camX += d * Math.cos(f);
        camY += d * Math.sin(f);
      } else {
        camX = player.x;
        camY = player.y;
      }
    } else {
      camX = config.mapScale / 2;
      camY = config.mapScale / 2;
    }
    const o = hi - 1000 / config.serverUpdateRate;
    for (var e, t = 0; t < players.length + ais.length; ++t) {
      tmpObj = players[t] || ais[t - players.length];
      if (tmpObj && tmpObj.visible) {
        if (tmpObj.forcePos) {
          tmpObj.x = tmpObj.x2;
          tmpObj.y = tmpObj.y2;
          tmpObj.dir = tmpObj.d2;
        } else {
          const a = tmpObj.t2 - tmpObj.t1;
          const d = (o - tmpObj.t1) / a;
          const u = 170;
          tmpObj.dt += delta;
          const p = Math.min(1.7, tmpObj.dt / u);
          var e = tmpObj.x2 - tmpObj.x1;
          tmpObj.x = tmpObj.x1 + e * p;
          e = tmpObj.y2 - tmpObj.y1;
          tmpObj.y = tmpObj.y1 + e * p;
          tmpObj.dir = Math.lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, d));
        }
      }
    }
    const xOffset = camX - maxScreenWidth / 2;
    const yOffset = camY - maxScreenHeight / 2;

    const {
      GreenBiomeColor: G = "#b6db66",
      SnowBiomeColor: S = "#ffffff",
      DesertBiomeColor: D = "#dbc666",
      RiverColor: R = "#91b2db",
    } = AB.Menu;
    const snowLine = config.snowBiomeTop - yOffset;
    const desertLine = config.mapScale - config.snowBiomeTop - yOffset;
    const fill = (color, y, h) => {
      if (h <= 0) return;
      C.fillStyle = color;
      C.fillRect(0, y, maxScreenWidth, h);
    };
    if (snowLine <= 0 && desertLine >= maxScreenHeight) {
      fill(G, 0, maxScreenHeight);
    } else if (desertLine <= 0) {
      fill(G, 0, maxScreenHeight);
      fill(
        D,
        Math.max(0, desertLine),
        maxScreenHeight - Math.max(0, desertLine),
      );
    } else if (snowLine >= maxScreenHeight) {
      fill(S, 0, maxScreenHeight);
    } else if (snowLine >= 0) {
      fill(S, 0, snowLine);
      fill(G, snowLine, maxScreenHeight - snowLine);
      AB.Menu.ShorePath && snowPath.render(S, xOffset, yOffset);
    } else {
      fill(G, 0, desertLine);
      fill(D, desertLine, maxScreenHeight - desertLine);
      AB.Menu.ShorePath && desertPath.render(G, xOffset, yOffset);
    }

    if (!firstSetup) {
      if (AB.Menu.RiverWave) {
        qt += fs * config.waveSpeed * delta;
        if (qt >= config.waveMax) {
          qt = config.waveMax;
          fs = -1;
        } else if (qt <= 1) {
          qt = fs = 1;
        }
      }
      C.globalAlpha = 1;
      C.fillStyle = D;
      renderWaterBodies(xOffset, yOffset, C, config.riverPadding);
      C.fillStyle = R;
      AB.Menu.River && renderWaterBodies(xOffset, yOffset, C, (qt - 1) * 250);
    }
    C.lineWidth = AB.Menu.GridsSize;
    C.strokeStyle = "#000";
    C.globalAlpha = 0.06;
    C.beginPath();
    //grid
    if (AB.Menu.Grids) {
      for (var i = -xOffset; i < maxScreenWidth; i += maxScreenHeight / 18) {
        if (i > 0) {
          C.moveTo(i, 0);
          C.lineTo(i, maxScreenHeight);
        }
      }
      for (let a = -yOffset; a < maxScreenHeight; a += maxScreenHeight / 18) {
        if (i > 0) {
          C.moveTo(0, a);
          C.lineTo(maxScreenWidth, a);
        }
      }
    }
    C.stroke();
    C.globalAlpha = 1;
    C.strokeStyle = Zi;
    renderGameObjects(-1, xOffset, yOffset);
    C.globalAlpha = 1;
    C.lineWidth = St;
    renderProjectiles(0, xOffset, yOffset);
    renderPlayers(xOffset, yOffset, 0);
    renderDeadPlayers(xOffset, yOffset);
    C.globalAlpha = 1;
    for (var t = 0; t < ais.length; ++t) {
      tmpObj = ais[t];
      if (tmpObj.active && tmpObj.visible) {
        tmpObj.animate(delta);
        C.save();
        C.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        C.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2);
        renderAI(tmpObj, C);
        C.restore();
      }
    }
    renderGameObjects(0, xOffset, yOffset);
    renderProjectiles(1, xOffset, yOffset);
    renderGameObjects(1, xOffset, yOffset);
    renderPlayers(xOffset, yOffset, 1);
    renderGameObjects(2, xOffset, yOffset);
    renderGameObjects(3, xOffset, yOffset);
    DestroyedObject.RenderAll(C, delta, xOffset, yOffset);
    C.fillStyle = "#000";
    C.globalAlpha = 0.09;
    if (xOffset <= 0) {
      C.fillRect(0, 0, -xOffset, maxScreenHeight);
    }
    if (config.mapScale - xOffset <= maxScreenWidth) {
      var n = Math.max(0, -yOffset);
      C.fillRect(
        config.mapScale - xOffset,
        n,
        maxScreenWidth - (config.mapScale - xOffset),
        maxScreenHeight - n,
      );
    }
    if (yOffset <= 0) {
      C.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset);
    }
    if (config.mapScale - yOffset <= maxScreenHeight) {
      var s = Math.max(0, -xOffset);
      let a = 0;
      if (config.mapScale - xOffset <= maxScreenWidth) {
        a = maxScreenWidth - (config.mapScale - xOffset);
      }
      C.fillRect(
        s,
        config.mapScale - yOffset,
        maxScreenWidth - s - a,
        maxScreenHeight - (config.mapScale - yOffset),
      );
    }
    C.globalAlpha = 1; // day time
    C.fillStyle = "rgba(0, 0, 70, 0.35)";
    C.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

    C.globalAlpha = 0.35; //night time
    C.fillStyle = "rgb(0, 0, 100)";
    C.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

    C.globalAlpha = 1;
    C.strokeStyle = ko;
    for (var t = 0; t < players.length + ais.length; ++t) {
      tmpObj = players[t] || ais[t - players.length];
      if (tmpObj.visible) {
        const f =
          (tmpObj.team ? "[" + tmpObj.team + "] " : "") +
          "[" +
          tmpObj.sid +
          "] " +
          (tmpObj.name || "") +
          (tmpObj.isPlayer
            ? ` [${tmpObj.skinIndex === 45 && tmpObj.shameTimer > 0 ? tmpObj.shameTimer : tmpObj.shameCount}]`
            : "");
        if (f != "") {
          const tx = tmpObj.x - xOffset,
            ty = tmpObj.y - yOffset - tmpObj.scale - config.nameY;
          C.font = (tmpObj.nameScale || 30) + "px Hammersmith One";
          C.fillStyle = "#fff";
          C.textBaseline = "middle";
          C.textAlign = "center";
          C.lineWidth = tmpObj.nameScale ? 11 : 8;
          C.lineJoin = "round";
          C.strokeText(f, tx, ty);
          C.fillText(f, tx, ty);
          const r = config.crownIconScale;
          const textW = C.measureText(f).width;
          const baseY =
            tmpObj.y - yOffset - tmpObj.scale - config.nameY - r / 2 - 5;
          if (tmpObj.isLeader && Di.crown.isLoaded)
            C.drawImage(
              Di.crown,
              tmpObj.x - xOffset - r / 2 - textW / 2 - config.crownPad,
              baseY,
              r,
              r,
            );
          if (tmpObj.iconIndex === 1 && Di.skull.isLoaded)
            C.drawImage(
              Di.skull,
              tmpObj.x - xOffset - r / 2 + textW / 2 + config.crownPad,
              baseY,
              r,
              r,
            );
        }
        if (tmpObj.health > 0) {
          tmpObj.displayHealth ??= tmpObj.health;
          tmpObj.displayHealth += (tmpObj.health - tmpObj.displayHealth) * 0.15;
          const baseX = tmpObj.x - xOffset;
          const baseY = tmpObj.y - yOffset + tmpObj.scale + config.nameY;
          const pad = config.healthBarPad;
          const fullW = config.healthBarWidth * 2 + pad * 2;
          const t = performance.now() * 0.001;
          const shift = 50 + Math.sin(t * 0.2) * 25;
          C.fillStyle = ko;
          C.roundRect(
            baseX - (config.healthBarWidth + pad),
            baseY,
            fullW,
            17,
            8,
          );
          C.fill();
          C.fillStyle =
            tmpObj === player || (tmpObj.team && tmpObj.team === player.team)
              ? "#8ecc51"
              : "#cc5151";
          const fillW =
            config.healthBarWidth *
            2 *
            (tmpObj.displayHealth / tmpObj.maxHealth);
          C.roundRect(
            baseX - config.healthBarWidth,
            baseY + pad,
            fillW,
            17 - pad * 2,
            7,
          );
          C.fill();
        }
        if (tmpObj.isPlayer) {
          const pad = config.healthBarPad;
          const y = tmpObj.y - yOffset + tmpObj.scale + config.nameY + 18;
          const outerH = 17,
            innerH = outerH - pad * 2,
            gap = 6;
          const clamp01 = (v) => Math.max(0, Math.min(1, v));
          const smoothReload = (idx, key) => {
            const r = tmpObj.reloads?.[idx] ?? 0;
            const t = items.weapons[idx]?.speed || 300;
            tmpObj[key] ??= r;
            tmpObj[key] += (r - tmpObj[key]) * 0.15;
            return clamp01(1 - tmpObj[key] / t);
          };
          const hasSecondary =
            (tmpObj === player &&
              tmpObj.weapons?.[1] !== undefined &&
              tmpObj.weapons[1] !== 11) ||
            (tmpObj !== player &&
              tmpObj.primaryIndex !== 0 &&
              tmpObj.secondaryIndex !== undefined &&
              tmpObj.secondaryIndex !== 11);
          const barsCount = hasSecondary ? 2 : 1;
          const innerW =
            (config.healthBarWidth * barsCount - (barsCount === 2 ? gap : 0)) /
            barsCount;
          const outerW = innerW + pad * 2;
          const leftOuterX = tmpObj.x - xOffset - config.healthBarWidth - pad;
          const bars = [
            { idx: tmpObj.primaryIndex, key: "displayReload0", x: leftOuterX },
            ...(hasSecondary
              ? [
                {
                  idx: tmpObj.secondaryIndex,
                  key: "displayReload1",
                  x: leftOuterX + outerW - 2,
                },
              ]
              : []),
          ];
          for (const b of bars) {
            const r = smoothReload(b.idx, b.key);
            C.fillStyle = ko;
            C.roundRect(b.x, y, outerW, outerH, 8);
            C.fill();
            C.fillStyle = "#4da6ff";
            C.roundRect(b.x + pad, y + pad, innerW * r, innerH, 7);
            C.fill();
          }
        }
      }
    }
    textManager.update(delta, C, xOffset, yOffset);
    UpdateMessageRender(C, players, xOffset, yOffset, delta);
  }
  renderMinimap(delta);
}
function renderProjectiles(e, t, i) {
  for (let n = 0; n < ui.length; ++n) {
    tmpObj = ui[n];
    if (tmpObj.active && tmpObj.layer == e) {
      tmpObj.update(delta);
      if (
        tmpObj.active &&
        isOnScreen(tmpObj.x - t, tmpObj.y - i, tmpObj.scale)
      ) {
        C.save();
        C.translate(tmpObj.x - t, tmpObj.y - i);
        C.rotate(tmpObj.dir);
        renderProjectile(0, 0, tmpObj, C);
        C.restore();
      }
    }
  }
}
const Io = {};
function renderProjectile(e, t, i, n, s) {
  if (i.src) {
    const r = items.projectiles[i.indx].src;
    let o = Io[r];
    if (!o) {
      o = new Image();
      o.onload = function () {
        this.isLoaded = true;
      };
      o.src = "./img/weapons/" + r + ".png";
      Io[r] = o;
    }
    if (o.isLoaded) {
      n.drawImage(o, e - i.scale / 2, t - i.scale / 2, i.scale, i.scale);
    }
  } else if (i.indx == 1) {
    n.fillStyle = "#939393";
    drawCircle(e, t, i.scale, n);
  }
}
function renderVolcano() {
  const e = camX - maxScreenWidth / 2;
  const t = camY - maxScreenHeight / 2;
  Ye.animationTime += delta;
  Ye.animationTime %= config.volcanoAnimationDuration;
  const i = config.volcanoAnimationDuration / 2;
  const n = 1.7 + (Math.abs(i - Ye.animationTime) / i) * 0.3;
  const s = config.innerVolcanoScale * n;
  C.drawImage(
    Ye.land,
    Ye.x - config.volcanoScale - e,
    Ye.y - config.volcanoScale - t,
    config.volcanoScale * 2,
    config.volcanoScale * 2,
  );
  C.drawImage(Ye.lava, Ye.x - s - e, Ye.y - s - t, s * 2, s * 2);
}
function renderWaterBodies(e, t, i, n) {
  const s = config.riverWidth + n;
  const r = config.mapScale / 2 - t - s / 2;
  if (r < maxScreenHeight && r + s > 0) {
    i.fillRect(0, r, maxScreenWidth, s);
  }
}
let treeAlphaState = [];
function TreeAlpha(k, n, r) {
  const s = getResSprite(k),
    easeScale = 0.06,
    lowestAlpha = 0.4;
  if (player && k.type === 0) {
    treeAlphaState[k.sid] ??= 1;
    const inRange =
      Math.hypot(k.y - player.y2, k.x - player.x2) <= k.scale + player.scale;
    treeAlphaState[k.sid] = Math[inRange ? "max" : "min"](
      inRange ? lowestAlpha : 1,
      treeAlphaState[k.sid] + (inRange ? -easeScale : easeScale),
    );
    C.globalAlpha = treeAlphaState[k.sid];
  }
  C.drawImage(s, n - s.width / 2, r - s.height / 2);
}
function renderGameObjects(e, t, i) {
  let n;
  let s;
  let r;
  for (let o = 0; o < gameObjects.length; ++o) {
    tmpObj = gameObjects[o];
    if (tmpObj.active) {
      s = tmpObj.x + tmpObj.xWiggle - t;
      r = tmpObj.y + tmpObj.yWiggle - i;
      if (e == 0) {
        tmpObj.update(delta);
      }
      if (
        tmpObj.layer == e &&
        isOnScreen(s, r, tmpObj.scale + (tmpObj.blocker || 0))
      ) {
        C.globalAlpha = tmpObj.hideFromEnemy ? 0.6 : 1;
        if (tmpObj.isItem) {
          n = getItemSprite(tmpObj);
          C.save();
          C.translate(s, r);
          C.rotate(tmpObj.dir);
          C.drawImage(n, -(n.width / 2), -(n.height / 2));
          if (tmpObj.blocker) {
            C.strokeStyle = "#db6e6e";
            C.globalAlpha = 0.3;
            C.lineWidth = 6;
            drawCircle(0, 0, tmpObj.blocker, C, false, true);
          }
          C.restore();
        } else if (tmpObj.type === 4) {
          renderVolcano();
        } else {
          n = getResSprite(tmpObj);
          TreeAlpha(tmpObj, n, r);
          C.drawImage(n, s - n.width / 2, r - n.height / 2);
        }
      }
    }
  }
}
function gatherAnimation(sid, didHit, index) {
  tmpObj = findPlayerBySID(sid);
  if (tmpObj) {
    tmpObj.startAnim(didHit, index);
    tmpObj.gatherIndex = index;
    tmpObj.gathering = 1;
  }
}
function renderPlayers(e, t, i) {
  C.globalAlpha = 1;
  for (let n = 0; n < players.length; ++n) {
    tmpObj = players[n];
    if (tmpObj.zIndex == i) {
      tmpObj.animate(delta);
      if (tmpObj.visible) {
        tmpObj.skinRot += delta * 0.002;
        tmpDir =
          (tmpObj == player ? getSafeDir() : tmpObj.dir) + tmpObj.dirPlus;
        C.save();
        C.translate(tmpObj.x - e, tmpObj.y - t);
        C.rotate(tmpDir);
        renderPlayer(tmpObj, C);
        C.restore();
      }
    }
  }
}

function renderDeadPlayers(xO, yO, type = "Ragdoll") {
  const now = performance.now();
  for (let i = deadPlayers.length - 1; i >= 0; i--) {
    const d = deadPlayers[i];
    if (!d.active) {
      deadPlayers.splice(i, 1);
      continue;
    }
    if (type === "Ragdoll")
      d.updateRagdoll(
        now,
        16.67,
        gameObjects,
        players,
        ais,
        config,
        items,
        xO,
        yO,
      );
    if (type === "Snap") d.updateSnap(now, 16.67, xO, yO);
  }
  C.globalAlpha = 1;
}

function renderPlayer(e, t) {
  t = t || C;
  t.lineWidth = St;
  t.lineJoin = "miter";
  const i = (Math.PI / 4) * (items.weapons[e.weaponIndex].armS || 1);
  const n = (e.buildIndex < 0 && items.weapons[e.weaponIndex].hndS) || 1;
  const s = (e.buildIndex < 0 && items.weapons[e.weaponIndex].hndD) || 1;
  if (e.tailIndex > 0) {
    renderTail(e.tailIndex, t, e);
  }
  if (e.buildIndex < 0 && !items.weapons[e.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[e.weaponIndex],
      config.weaponVariants[e.weaponVariant].src,
      e.scale,
      0,
      t,
    );
    if (
      items.weapons[e.weaponIndex].projectile != null &&
      !items.weapons[e.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        e.scale,
        0,
        items.projectiles[items.weapons[e.weaponIndex].projectile],
        C,
      );
    }
  }
  t.fillStyle = config.skinColors[e.skinColor];
  drawCircle(e.scale * Math.cos(i), e.scale * Math.sin(i), 14);
  drawCircle(
    e.scale * s * Math.cos(-i * n),
    e.scale * s * Math.sin(-i * n),
    14,
  );
  if (e.buildIndex < 0 && items.weapons[e.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[e.weaponIndex],
      config.weaponVariants[e.weaponVariant].src,
      e.scale,
      0,
      t,
    );
    if (
      items.weapons[e.weaponIndex].projectile != null &&
      !items.weapons[e.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        e.scale,
        0,
        items.projectiles[items.weapons[e.weaponIndex].projectile],
        C,
      );
    }
  }
  if (e.buildIndex >= 0) {
    const r = getItemSprite(items.list[e.buildIndex]);
    t.drawImage(r, e.scale - items.list[e.buildIndex].holdOffset, -r.width / 2);
  }
  drawCircle(0, 0, e.scale, t);
  if (e.skinIndex > 0) {
    t.rotate(Math.PI / 2);
    renderSkin(e.skinIndex, t, null, e);
  }
}
const Eo = {};
const Co = {};
let et;
function renderSkin(e, t, i, n) {
  et = Eo[e];
  if (!et) {
    const r = new Image();
    r.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    r.src = "./img/hats/hat_" + e + ".png";
    Eo[e] = r;
    et = r;
  }
  let s = i || Co[e];
  if (!s) {
    for (let r = 0; r < Vi.length; ++r) {
      if (Vi[r].id == e) {
        s = Vi[r];
        break;
      }
    }
    Co[e] = s;
  }
  if (et.isLoaded) {
    t.drawImage(et, -s.scale / 2, -s.scale / 2, s.scale, s.scale);
  }
  if (!i && s.topSprite) {
    t.save();
    t.rotate(n.skinRot);
    renderSkin(e + "_top", t, s, n);
    t.restore();
  }
}
const Po = {};
const $o = {};
function renderTail(e, t, i) {
  et = Po[e];
  if (!et) {
    const s = new Image();
    s.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    s.src = "./img/accessories/access_" + e + ".png";
    Po[e] = s;
    et = s;
  }
  let n = $o[e];
  if (!n) {
    for (let s = 0; s < Ni.length; ++s) {
      if (Ni[s].id == e) {
        n = Ni[s];
        break;
      }
    }
    $o[e] = n;
  }
  if (et.isLoaded) {
    t.save();
    t.translate(-20 - (n.xOff || 0), 0);
    if (n.spin) {
      t.rotate(i.skinRot);
    }
    t.drawImage(et, -(n.scale / 2), -(n.scale / 2), n.scale, n.scale);
    t.restore();
  }
}
var Gs = {};
function renderTool(e, t, i, n, s) {
  const r = e.src + (t || "");
  let o = Gs[r];
  if (!o) {
    o = new Image();
    o.onload = function () {
      this.isLoaded = true;
    };
    o.src = "./img/weapons/" + r + ".png";
    Gs[r] = o;
  }
  if (o.isLoaded) {
    s.drawImage(
      o,
      i + e.xOff - e.length / 2,
      n + e.yOff - e.width / 2,
      e.length,
      e.width,
    );
  }
}
const Ao = {};
let objSprites = {};
function getResSprite(e) {
  const t =
    e.y >= config.mapScale - config.snowBiomeTop
      ? 2
      : e.y <= config.snowBiomeTop
        ? 1
        : 0;
  const i = e.type + "_" + e.scale + "_" + t;
  let n = objSprites[i];
  if (!n) {
    const r = document.createElement("canvas");
    r.width = r.height = e.scale * 2.1 + St;
    const o = r.getContext("2d");
    o.translate(r.width / 2, r.height / 2);
    o.rotate(UTILS.randFloat(0, Math.PI));
    o.strokeStyle = Zi;
    o.lineWidth = St;
    if (e.type == 0) {
      let l;
      for (var s = 0; s < 2; ++s) {
        l = tmpObj.scale * (s ? 0.5 : 1);
        createStarPath(o, tmpObj.sid % 2 === 0 ? 5 : 7, l, l * 0.7);
        o.fillStyle = t ? (s ? "#fff" : "#e3f1f4") : s ? "#b4db62" : "#9ebf57";
        o.fill();
        if (!s) {
          o.stroke();
        }
      }
    } else if (e.type == 1) {
      if (t == 2) {
        o.fillStyle = "#606060";
        createStarPath(o, 6, e.scale * 0.3, e.scale * 0.71);
        o.fill();
        o.stroke();
        o.fillStyle = "#89a54c";
        drawCircle(0, 0, e.scale * 0.55, o);
        o.fillStyle = "#a5c65b";
        drawCircle(0, 0, e.scale * 0.3, o, true);
      } else {
        createBlobPath(o, 6, tmpObj.scale, tmpObj.scale * 0.7);
        o.fillStyle = t ? "#e3f1f4" : "#89a54c";
        o.fill();
        o.stroke();
        o.fillStyle = t ? "#6a64af" : "#c15555";
        let l;
        const c = 4;
        const a = Rt / c;
        for (var s = 0; s < c; ++s) {
          l = UTILS.randInt(tmpObj.scale / 3.5, tmpObj.scale / 2.3);
          drawCircle(
            l * Math.cos(a * s),
            l * Math.sin(a * s),
            UTILS.randInt(10, 12),
            o,
          );
        }
      }
    } else if (e.type == 2 || e.type == 3) {
      o.fillStyle = e.type == 2 ? (t == 2 ? "#938d77" : "#939393") : "#e0c655";
      createStarPath(o, 3, e.scale, e.scale);
      o.fill();
      o.stroke();
      o.fillStyle = e.type == 2 ? (t == 2 ? "#b2ab90" : "#bcbcbc") : "#ebdca3";
      createStarPath(o, 3, e.scale * 0.55, e.scale * 0.65);
      o.fill();
    }
    n = r;
    objSprites[i] = n;
  }
  return n;
}
function drawRegularPolygon(e, t, i) {
  const n = e.lineWidth || 0;
  i /= 2;
  e.beginPath();
  let s = (Math.PI * 2) / t;
  for (let r = 0; r < t; r++) {
    e.lineTo(
      i + (i - n / 2) * Math.cos(s * r),
      i + (i - n / 2) * Math.sin(s * r),
    );
  }
  e.closePath();
}
function createVolcanoTextures() {
  const t = config.volcanoScale * 2;
  const i = document.createElement("canvas");
  i.width = t;
  i.height = t;
  const n = i.getContext("2d");
  n.strokeStyle = "#3e3e3e";
  n.lineWidth = St * 2;
  n.fillStyle = "#7f7f7f";
  drawRegularPolygon(n, 10, t);
  n.fill();
  n.stroke();
  Ye.land = i;
  const s = document.createElement("canvas");
  const r = config.innerVolcanoScale * 2;
  s.width = r;
  s.height = r;
  const o = s.getContext("2d");
  o.strokeStyle = Zi;
  o.lineWidth = St * 1.6;
  o.fillStyle = "#f54e16";
  o.strokeStyle = "#f56f16";
  drawRegularPolygon(o, 10, r);
  o.fill();
  o.stroke();
  Ye.lava = s;
}
createVolcanoTextures();
const Oo = [];
let itemSprites = [];
function getItemSprite(e, t) {
  let i = itemSprites[e.id];
  if (!i || t) {
    const c = document.createElement("canvas");
    c.width = c.height =
      e.scale * 2.5 + St + (items.list[e.id].spritePadding || 0);
    const a = c.getContext("2d");
    a.translate(c.width / 2, c.height / 2);
    a.rotate(t ? 0 : Math.PI / 2);
    a.strokeStyle = Zi;
    a.lineWidth = St * (t ? c.width / 81 : 1);
    if (e.name == "apple") {
      a.fillStyle = "#c15555";
      drawCircle(0, 0, e.scale, a);
      a.fillStyle = "#89a54c";
      const f = -(Math.PI / 2);
      drawPetal(
        e.scale * Math.cos(f),
        e.scale * Math.sin(f),
        25,
        f + Math.PI / 2,
        a,
      );
    } else if (e.name == "cookie") {
      a.fillStyle = "#cca861";
      drawCircle(0, 0, e.scale, a);
      a.fillStyle = "#937c4b";
      for (var n = 4, s = Rt / n, r, o = 0; o < n; ++o) {
        r = UTILS.randInt(e.scale / 2.5, e.scale / 1.7);
        drawCircle(
          r * Math.cos(s * o),
          r * Math.sin(s * o),
          UTILS.randInt(4, 5),
          a,
          true,
        );
      }
    } else if (e.name == "cheese") {
      a.fillStyle = "#f4f3ac";
      drawCircle(0, 0, e.scale, a);
      a.fillStyle = "#c3c28b";
      for (var n = 4, s = Rt / n, r, o = 0; o < n; ++o) {
        r = UTILS.randInt(e.scale / 2.5, e.scale / 1.7);
        drawCircle(
          r * Math.cos(s * o),
          r * Math.sin(s * o),
          UTILS.randInt(4, 5),
          a,
          true,
        );
      }
    } else if (
      e.name == "wood wall" ||
      e.name == "stone wall" ||
      e.name == "castle wall"
    ) {
      a.fillStyle =
        e.name == "castle wall"
          ? "#83898e"
          : e.name == "wood wall"
            ? "#a5974c"
            : "#939393";
      const f = e.name == "castle wall" ? 4 : 3;
      createStarPath(a, f, e.scale * 1.1, e.scale * 1.1);
      a.fill();
      a.stroke();
      a.fillStyle =
        e.name == "castle wall"
          ? "#9da4aa"
          : e.name == "wood wall"
            ? "#c9b758"
            : "#bcbcbc";
      createStarPath(a, f, e.scale * 0.65, e.scale * 0.65);
      a.fill();
    } else if (
      e.name == "spikes" ||
      e.name == "greater spikes" ||
      e.name == "poison spikes" ||
      e.name == "spinning spikes"
    ) {
      a.fillStyle = e.name == "poison spikes" ? "#7b935d" : "#939393";
      var l = e.scale * 0.6;
      createStarPath(a, e.name == "spikes" ? 5 : 6, e.scale, l);
      a.fill();
      a.stroke();
      a.fillStyle = "#a5974c";
      drawCircle(0, 0, l, a);
      a.fillStyle = "#c9b758";
      drawCircle(0, 0, l / 2, a, true);
    } else if (
      e.name == "windmill" ||
      e.name == "faster windmill" ||
      e.name == "power mill"
    ) {
      a.fillStyle = "#a5974c";
      drawCircle(0, 0, e.scale, a);
      a.fillStyle = "#c9b758";
      drawRadialRects(0, 0, e.scale * 1.5, 29, 4, a);
      a.fillStyle = "#a5974c";
      drawCircle(0, 0, e.scale * 0.5, a);
    } else if (e.name == "mine") {
      a.fillStyle = "#939393";
      createStarPath(a, 3, e.scale, e.scale);
      a.fill();
      a.stroke();
      a.fillStyle = "#bcbcbc";
      createStarPath(a, 3, e.scale * 0.55, e.scale * 0.65);
      a.fill();
    } else if (e.name == "sapling") {
      for (var o = 0; o < 2; ++o) {
        var l = e.scale * (o ? 0.5 : 1);
        createStarPath(a, 7, l, l * 0.7);
        a.fillStyle = o ? "#b4db62" : "#9ebf57";
        a.fill();
        if (!o) {
          a.stroke();
        }
      }
    } else if (e.name == "pit trap") {
      a.fillStyle = "#a5974c";
      createStarPath(a, 3, e.scale * 1.1, e.scale * 1.1);
      a.fill();
      a.stroke();
      a.fillStyle = Zi;
      createStarPath(a, 3, e.scale * 0.65, e.scale * 0.65);
      a.fill();
    } else if (e.name == "boost pad") {
      a.fillStyle = "#7e7f82";
      drawCenteredRect(0, 0, e.scale * 2, e.scale * 2, a);
      a.fill();
      a.stroke();
      a.fillStyle = "#dbd97d";
      fillEquilateralTriangle(e.scale * 1, a);
    } else if (e.name == "turret") {
      a.fillStyle = "#a5974c";
      drawCircle(0, 0, e.scale, a);
      a.fill();
      a.stroke();
      a.fillStyle = "#939393";
      const f = 50;
      drawCenteredRect(0, -f / 2, e.scale * 0.9, f, a);
      drawCircle(0, 0, e.scale * 0.6, a);
      a.fill();
      a.stroke();
    } else if (e.name == "platform") {
      a.fillStyle = "#cebd5f";
      const f = 4;
      const d = e.scale * 2;
      const u = d / f;
      let p = -(e.scale / 2);
      for (var o = 0; o < f; ++o) {
        drawCenteredRect(p - u / 2, 0, u, e.scale * 2, a);
        a.fill();
        a.stroke();
        p += d / f;
      }
    } else if (e.name == "healing pad") {
      a.fillStyle = "#7e7f82";
      drawCenteredRect(0, 0, e.scale * 2, e.scale * 2, a);
      a.fill();
      a.stroke();
      a.fillStyle = "#db6e6e";
      drawRadialRects(0, 0, e.scale * 0.65, 20, 4, a, true);
    } else if (e.name == "spawn pad") {
      a.fillStyle = "#7e7f82";
      drawCenteredRect(0, 0, e.scale * 2, e.scale * 2, a);
      a.fill();
      a.stroke();
      a.fillStyle = "#71aad6";
      drawCircle(0, 0, e.scale * 0.6, a);
    } else if (e.name == "blocker") {
      a.fillStyle = "#7e7f82";
      drawCircle(0, 0, e.scale, a);
      a.fill();
      a.stroke();
      a.rotate(Math.PI / 4);
      a.fillStyle = "#db6e6e";
      drawRadialRects(0, 0, e.scale * 0.65, 20, 4, a, true);
    } else if (e.name == "teleporter") {
      a.fillStyle = "#7e7f82";
      drawCircle(0, 0, e.scale, a);
      a.fill();
      a.stroke();
      a.rotate(Math.PI / 4);
      a.fillStyle = "#d76edb";
      drawCircle(0, 0, e.scale * 0.5, a, true);
    }
    i = c;
    if (!t) {
      itemSprites[e.id] = i;
    }
  }
  return i;
}
function drawPetal(e, t, i, n, s) {
  const r = e + i * Math.cos(n);
  const o = t + i * Math.sin(n);
  const l = i * 0.4;
  s.moveTo(e, t);
  s.beginPath();
  s.quadraticCurveTo(
    (e + r) / 2 + l * Math.cos(n + Math.PI / 2),
    (t + o) / 2 + l * Math.sin(n + Math.PI / 2),
    r,
    o,
  );
  s.quadraticCurveTo(
    (e + r) / 2 - l * Math.cos(n + Math.PI / 2),
    (t + o) / 2 - l * Math.sin(n + Math.PI / 2),
    e,
    t,
  );
  s.closePath();
  s.fill();
  s.stroke();
}
function drawCircle(e, t, i, n, s, r) {
  n = n || C;
  n.beginPath();
  n.arc(e, t, i, 0, Math.PI * 2);
  if (!r) {
    n.fill();
  }
  if (!s) {
    n.stroke();
  }
}
function createStarPath(e, t, i, n) {
  let s = (Math.PI / 2) * 3;
  let r;
  let o;
  const l = Math.PI / t;
  e.beginPath();
  e.moveTo(0, -i);
  for (let c = 0; c < t; c++) {
    r = Math.cos(s) * i;
    o = Math.sin(s) * i;
    e.lineTo(r, o);
    s += l;
    r = Math.cos(s) * n;
    o = Math.sin(s) * n;
    e.lineTo(r, o);
    s += l;
  }
  e.lineTo(0, -i);
  e.closePath();
}
function drawCenteredRect(e, t, i, n, s, r) {
  s.fillRect(e - i / 2, t - n / 2, i, n);
  if (!r) {
    s.strokeRect(e - i / 2, t - n / 2, i, n);
  }
}
function drawRadialRects(e, t, i, n, s, r, o) {
  r.save();
  r.translate(e, t);
  s = Math.ceil(s / 2);
  for (let l = 0; l < s; l++) {
    drawCenteredRect(0, 0, i * 2, n, r, o);
    r.rotate(Math.PI / s);
  }
  r.restore();
}
function createBlobPath(e, t, i, n) {
  let s = (Math.PI / 2) * 3;
  const r = Math.PI / t;
  let o;
  e.beginPath();
  e.moveTo(0, -n);
  for (let l = 0; l < t; l++) {
    o = UTILS.randInt(i + 0.9, i * 1.2);
    e.quadraticCurveTo(
      Math.cos(s + r) * o,
      Math.sin(s + r) * o,
      Math.cos(s + r * 2) * n,
      Math.sin(s + r * 2) * n,
    );
    s += r * 2;
  }
  e.lineTo(0, -n);
  e.closePath();
}
function fillEquilateralTriangle(e, t) {
  t = t || C;
  const i = e * (Math.sqrt(3) / 2);
  t.beginPath();
  t.moveTo(0, -i / 2);
  t.lineTo(-e / 2, i / 2);
  t.lineTo(e / 2, i / 2);
  t.lineTo(0, -i / 2);
  t.fill();
  t.closePath();
}
function prepareMenuBackground() {
  const cx = config.mapScale / 2;
  const cy = cx;
  const vw =
    typeof maxScreenWidth !== "undefined" ? maxScreenWidth : innerWidth;
  const vh =
    typeof maxScreenHeight !== "undefined" ? maxScreenHeight : innerHeight;
  const PAD = 220,
    MIN = 260;
  const L = cx - vw / 2 + PAD,
    R = cx + vw / 2 - PAD;
  const T = cy - vh / 2 + PAD,
    B = cy + vh / 2 - PAD;
  const placed = [];
  const rand = (a, b) => Math.random() * (b - a) + a;
  const ok = (p) =>
    placed.every((o) => (o.x - p.x) ** 2 + (o.y - p.y) ** 2 > MIN * MIN);
  const add = (id, s, t, e) => {
    let p,
      i = 0;
    do p = { x: rand(L, R), y: rand(T, B) };
    while (!ok(p) && ++i < 40);
    placed.push(p);
    objectManager.add(id, p.x, p.y, 0, s, t, e);
  };
  add(0, config.treeScales[3], 0);
  add(1, config.treeScales[3], 0);
  add(2, config.treeScales[3], 0);
  add(3, config.treeScales[2], 0);
  add(4, config.treeScales[3], 0);
  add(5, config.treeScales[2], 0);
  add(6, config.treeScales[3], 0);
  add(7, config.bushScales[3], 1);
  add(8, config.bushScales[3], 1);
  add(9, config.bushScales[3], 1);
  add(10, items.list[4].scale, items.list[4].id, items.list[10]);
  add(11, items.list[4].scale, items.list[4].id, items.list[10]);
  add(12, config.rockScales[2], 2);
}
function loadGameObject(e) {
  for (let t = 0; t < e.length;) {
    objectManager.add(
      e[t],
      e[t + 1],
      e[t + 2],
      e[t + 3],
      e[t + 4],
      e[t + 5],
      items.list[e[t + 6]],
      true,
      e[t + 7] >= 0
        ? {
          sid: e[t + 7],
        }
        : null,
    );
    t += 8;
  }
}
function wiggleGameObject(e, t) {
  tmpObj = findObjectBySid(t);
  if (tmpObj) {
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(e);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(e);
  }
}
function shootTurret(e, t) {
  tmpObj = findObjectBySid(e);
  if (tmpObj) {
    tmpObj.dir = t;
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(t + Math.PI);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(t + Math.PI);
  }
}
function addProjectile(e, t, i, n, s, r, o, l) {
  if (inWindow) {
    projectileManager.addProjectile(e, t, i, n, s, r, null, null, o).sid = l;
    runAtNextTick.push([].slice.call(arguments));
  }
}
function checkProjectileHolder(x, y, dir, range, speed, indx, layer, sid) {
  let weaponIndx =
    indx == 0 ? 9 : indx == 2 ? 12 : indx == 3 ? 13 : indx == 5 && 15;
  let projOffset = config.playerScale * 2;
  let projXY = {
    x: indx == 1 ? x : x - projOffset * Math.cos(dir),
    y: indx == 1 ? y : y - projOffset * Math.sin(dir),
  };
  let nearPlayer = players
    .filter((e) => e.visible && UTILS.getDist(projXY, e, 0, 2) <= e.scale)
    .sort(function (a, b) {
      return UTILS.getDist(projXY, a, 0, 2) - UTILS.getDist(projXY, b, 0, 2);
    })[0];
  if (nearPlayer) {
    if (indx == 1) {
      nearPlayer.shooting[53] = 1;
    } else {
      nearPlayer.shootIndex = weaponIndx;
      nearPlayer.shooting[1] = 1;
    }
  }
}
function remProjectile(e, t) {
  for (let i = 0; i < ui.length; ++i) {
    if (ui[i].sid == e) {
      ui[i].range = t;
    }
  }
}
function animateAI(e) {
  tmpObj = findAIBySID(e);
  if (tmpObj) {
    tmpObj.startAnim();
  }
}
function loadAI(e) {
  for (var t = 0; t < ais.length; ++t) {
    ais[t].forcePos = !ais[t].visible;
    ais[t].visible = false;
  }
  if (e) {
    const i = Date.now();
    for (var t = 0; t < e.length;) {
      tmpObj = findAIBySID(e[t]);
      if (tmpObj) {
        tmpObj.index = e[t + 1];
        tmpObj.t1 = tmpObj.t2 === undefined ? i : tmpObj.t2;
        tmpObj.t2 = i;
        tmpObj.x1 = tmpObj.x;
        tmpObj.y1 = tmpObj.y;
        tmpObj.x2 = e[t + 2];
        tmpObj.y2 = e[t + 3];
        tmpObj.d1 = tmpObj.d2 === undefined ? e[t + 4] : tmpObj.d2;
        tmpObj.d2 = e[t + 4];
        tmpObj.health = e[t + 5];
        tmpObj.dt = 0;
        tmpObj.visible = true;
      } else {
        tmpObj = aiManager.spawn(e[t + 2], e[t + 3], e[t + 4], e[t + 1]);
        tmpObj.x2 = tmpObj.x;
        tmpObj.y2 = tmpObj.y;
        tmpObj.d2 = tmpObj.dir;
        tmpObj.health = e[t + 5];
        if (!aiManager.aiTypes[e[t + 1]].name) {
          tmpObj.name = config.cowNames[e[t + 6]];
        }
        tmpObj.forcePos = true;
        tmpObj.sid = e[t];
        tmpObj.visible = true;
      }
      t += 7;
    }
  }
}
const _o = {};
function renderAI(e, t) {
  const i = e.index;
  let n = _o[i];
  if (!n) {
    const s = new Image();
    s.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    s.src = "./img/animals/" + e.src + ".png";
    n = s;
    _o[i] = n;
  }
  if (n.isLoaded) {
    const s = e.scale * 1.2 * (e.spriteMlt || 1);
    t.drawImage(n, -s, -s, s * 2, s * 2);
  }
}
function isOnScreen(e, t, i) {
  return (
    e + i >= 0 &&
    e - i <= maxScreenWidth &&
    t + i >= 0 &&
    t - i <= maxScreenHeight
  );
}
function getMyPlayer() {
  return player || null;
}
function addPlayer(e, t) {
  let i = findPlayerByID(e[0]);
  if (!i) {
    i = new Player(
      e[0],
      e[1],
      config,
      UTILS,
      projectileManager,
      objectManager,
      players,
      ais,
      items,
      Vi,
      Ni,
    );
    players.push(i);
  }
  i.spawn(t ? moofoll : null);
  i.visible = false;
  i.oldPos = {
    x2: undefined,
    y2: undefined,
  };
  i.x3 = undefined;
  i.y3 = undefined;
  i.x2 = undefined;
  i.y2 = undefined;
  i.setData(e);
  if (t) {
    player = i;
    camX = player.x;
    camY = player.y;
    updateItems();
    updateStatusDisplay();
    updateAge();
    updateUpgrades(0);
    ar.style.display = "block";
  }
}
function removePlayer(e) {
  for (let t = 0; t < players.length; t++) {
    if (players[t].id == e) {
      players.splice(t, 1);
      break;
    }
  }
}
function updateItemCounts(e, t) {
  if (player) {
    player.itemCounts[e] = t;
  }
}
function updatePlayerValue(index, value, _updateView) {
  if (!player) return;

  const oldValue = player[index] || 0;
  player[index] = value;

  if (index === "points") {
    if (configs.autoBuy) {
      autoBuy.hat();
      autoBuy.acc();
    }
  }

  if (index === "kills" && value > oldValue) {
    const autoGGType = AB.Menu.autoGGType || "disabled";
    const targetName = instaC.lastTarget || "Enemy";
    const killMessage = instaC.formatKillMessage(targetName);

    AB.Chats.add(killMessage, "#00ff88", "history");

    instaC.resetKillData();
    instaC.lastTarget = null;

    switch (autoGGType) {
      case "abyss":
        sendChat("AutoGG | " + player.kills + " kills");
        break;
      case "robotics":
        sendChat("Robotis winn");
        break;
      case "frozen":
        sendChat("Frozen client v3");
        break;
      case "chicken":
        sendChat("I'm Super Pro");
        break;
      case "redDragon":
        sendChat("<[GG]>x-RedDragon Client<[GG]>");
        break;
      case "zakat":
        sendChat("BOOM! ZAKAT mod v2");
        break;
      case "projectCube":
        sendChat("Auto-GG Project Cube v2");
        setTimeout(() => {
          sendChat("Well Done XDD");
        }, 600);
        break;
      case "happyMod":
        sendChat("gg - AutoGG Happymod");
        setTimeout(() => {
          sendChat("Happy Mod v7");
        }, 400);
        setTimeout(() => {
          sendChat("Made by Happymod");
        }, 400);
        setTimeout(() => {
          sendChat("Subscribe to Happymod");
        }, 400);
        break;
      case "minus":
        sendChat("Minus Client | GG ");
        setTimeout(() => {
          sendChat("By Minus v2");
        }, 1500);
        break;
      case "revelation":
        sendChat("Revelation on top!");
        break;
      case "disabled":
      default:
        break;
    }
  }
}
function updateHealth(sid, value) {
  let tmpObj = findPlayerBySID(sid);
  if (tmpObj) {
    tmpObj.oldHealth = tmpObj.health;
    tmpObj.health = value;
    tmpObj.ShameSystem();

    if (tmpObj.oldHealth > tmpObj.health) {
      tmpObj.timeDamaged = Date.now();
      tmpObj.damaged = tmpObj.oldHealth - tmpObj.health;
      let damaged = tmpObj.damaged;

      if (
        tmpObj.visible &&
        tmpObj.alive &&
        (tmpObj.x2 || tmpObj.x) !== undefined &&
        (tmpObj.y2 || tmpObj.y) !== undefined
      ) {
        createBloodSplatter(
          tmpObj.x2 || tmpObj.x,
          tmpObj.y2 || tmpObj.y,
          damaged,
          tmpObj.sid,
        );
      }

      if (tmpObj.health <= 0 && !tmpObj.death) {
        tmpObj.death = true;
        DeadPlayer.Add(tmpObj);
      }

      if (tmpObj === player) {
        handlePlayerDamage(tmpObj, damaged);
      } else {
        handleNonPlayerDamage(tmpObj);
      }
    }
  }
}

function handlePlayerDamage(player, damaged) {
  let autoheal = false;
  let antiinsta = configs.antiInsta,
    antiinsta1 = configs.antiInsta,
    antiinsta4 = configs.antiInsta;

  if (AB.Menu.AutoHat && !(instaC && (instaC.isTrue || instaC.ticking))) {
    if (player.shameCount > 0 && !my.bullTick) {
      my.bullTick = Math.min(player.shameCount, 6) * 2 + 1;
      buyEquip(7, 0);
    } else if (
      player.shameCount === 0 &&
      player.lastshamecount > 0 &&
      !my.bullTick
    ) {
      buyEquip(6, 0);
    }
  }

  if (inGame) {
    let attackers = getAttacker(damaged);
    let gearDmgs = [0.25, 0.45].map(
      (val) => val * items.weapons[player.weapons[0]].dmg,
    );
    let includeSpikeDmgs = Enemy.length
      ? !my.bullTick &&
      gearDmgs.includes(damaged) &&
      near[0].skinIndex == 11 &&
      near[0].tailIndex == 21
      : false;
    let healTimeout = 140 - window.ping;

    if (
      damaged >= 0 &&
      damaged <= 66 &&
      player.shameCount === 4 &&
      player.primaryIndex !== "4"
    ) {
      autoheal = configs.autoHeal;
      antiinsta = false;
      antiinsta1 = false;
      antiinsta4 = false;
    } else {
      if (player.shameCount !== 4) {
        autoheal = false;
        antiinsta = configs.antiInsta;
        antiinsta4 = configs.antiInsta;
      }
    }

    if (
      damaged <= 66 &&
      player.shameCount === 3 &&
      player.primaryIndex !== "4"
    ) {
      antiinsta = false;
    } else {
      if (player.shameCount !== 3) {
        antiinsta = configs.antiInsta;
      }
    }

    if (
      damaged <= 66 &&
      player.shameCount === 4 &&
      player.primaryIndex !== "4"
    ) {
      antiinsta1 = true;
    } else {
      if (player.shameCount !== 4) {
        antiinsta1 = false;
      }
    }

    if (damaged >= 0 && damaged <= 90 && player.shameCount === 2) {
      antiinsta4 = false;
    } else {
      if (player.shameCount !== 3) {
        antiinsta4 = configs.antiInsta;
      }
    }

    if (damaged >= 0 && damaged <= 90 && !antiinsta) {
      if (player.shameCount === 3) {
        antiinsta1 = true;
      } else {
        antiinsta1 = false;
      }
    }

    if (
      configs.autoHeal &&
      damaged <= 66 &&
      player.skinIndex != 6 &&
      Enemy.weaponIndex === 4
    ) {
      Mod.tickBase(() => {
        healer1();
      }, 2);
    }

    if (
      damaged >= (includeSpikeDmgs ? 8 : 20) &&
      player.damageThreat >= 20 &&
      antiinsta4 &&
      Mod.tick - player.antiTimer > 1
    ) {
      if (player.reloads[53] == 0 && player.reloads[player.weapons[1]] == 0) {
        player.canEmpAnti = true;
      } else {
        player.soldierAnti = true;
      }
      player.antiTimer = Mod.tick;
      if (configs.autoHeal) {
        let shame = player.weapons[0] == 4 ? 2 : 5;
        if (player.shameCount < shame) {
          healer();
        } else {
          Mod.tickBase(() => {
            healer();
          }, 2);
        }
        if (
          damaged >= (includeSpikeDmgs ? 8 : 20) &&
          player.damageThreat >= 20 &&
          autoheal
        ) {
          setTimeout(() => {
            healer();
          }, 120);
        }
      }
    } else if (configs.autoHeal) {
      Mod.tickBase(() => {
        healer();
      }, 2);
    }

    if (damaged >= 20 && player.skinIndex == 11 && player.shameCount <= 3) {
      instaC.canCounter = true;
    }
  }
}

function handleNonPlayerDamage(tmpObj) {
  if (
    !tmpObj.setPoisonTick &&
    (tmpObj.damaged == 5 || (tmpObj.latestTail == 13 && tmpObj.damaged == 2))
  ) {
    tmpObj.setPoisonTick = true;
    tmpObj.lastPoisonAt = Mod.tick;
    tmpObj.lastPoisonAtMs = Date.now();
  }
}

function updatePlayers(data) {
  const now = performance.now();
  const v = Math.min(100, now - Mod.lastTick);
  Mod.tick++;
  Mod.tickSpeed = v;
  Mod.lastTick = now;
  Enemy.length = Ally.length = 0;
  NearestEnemy = NearestAlly = null;
  NearestEnemyAngle = NearestAllyAngle = 0;
  const t = Date.now();
  for (let p of players) {
    p.forcePos = !p.visible;
    p.visible = false;
  }
  if (Mod.tickQueue[Mod.tick]) {
    Mod.tickQueue[Mod.tick].forEach((a) => a());
    Mod.tickQueue[Mod.tick] = null;
  }
  for (let i = 0; i < data.length; i += 13) {
    const tmpObj = findPlayerBySID(data[i]);
    if (!tmpObj) continue;
    tmpObj.t1 = tmpObj.t2 === undefined ? t : tmpObj.t2;
    tmpObj.t2 = t;
    tmpObj.oldPos.x2 = tmpObj.x2;
    tmpObj.oldPos.y2 = tmpObj.y2;
    tmpObj.x1 = tmpObj.x;
    tmpObj.y1 = tmpObj.y;
    tmpObj.x2 = data[i + 1];
    tmpObj.y2 = data[i + 2];
    const lastX = Number.isFinite(tmpObj.oldPos.x2)
      ? tmpObj.oldPos.x2
      : tmpObj.x2;
    const lastY = Number.isFinite(tmpObj.oldPos.y2)
      ? tmpObj.oldPos.y2
      : tmpObj.y2;
    tmpObj.xVel =
      (tmpObj.x2 - lastX) * 0.7 + (tmpObj.x2 - tmpObj.x1 || 0) * 0.3;
    tmpObj.yVel =
      (tmpObj.y2 - lastY) * 0.7 + (tmpObj.y2 - tmpObj.y1 || 0) * 0.3;
    tmpObj.x3 = tmpObj.x2 + (tmpObj.x2 - lastX);
    tmpObj.y3 = tmpObj.y2 + (tmpObj.y2 - lastY);
    tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 3] : tmpObj.d2;
    tmpObj.d2 = data[i + 3];
    tmpObj.dt = 0;
    tmpObj.buildIndex = data[i + 4];
    tmpObj.weaponIndex = data[i + 5];
    tmpObj.weaponVariant = data[i + 6];
    tmpObj.team = data[i + 7];
    tmpObj.isLeader = data[i + 8];
    tmpObj.oldSkinIndex = tmpObj.skinIndex;
    tmpObj.oldTailIndex = tmpObj.tailIndex;
    tmpObj.skinIndex = data[i + 9];
    tmpObj.tailIndex = data[i + 10];
    tmpObj.iconIndex = data[i + 11];
    tmpObj.zIndex = data[i + 12];
    tmpObj.visible = true;
    tmpObj.lastshamecount = tmpObj.shameCount;
    (tmpObj === player || (tmpObj.team && tmpObj.team === player.team)
      ? Ally
      : Enemy
    ).push(tmpObj);
    if (tmpObj.skinIndex == 45 && tmpObj.shameTimer <= 0)
      tmpObj.addShameTimer();
    tmpObj.manageReload();
    if (tmpObj.weaponIndex < 9) {
      tmpObj.primaryIndex = tmpObj.weaponIndex;
      tmpObj.primaryVariant = tmpObj.weaponVariant;
    } else {
      tmpObj.secondaryIndex = tmpObj.weaponIndex;
      tmpObj.secondaryVariant = tmpObj.weaponVariant;
    }
  }
  if (Enemy.length) {
    Enemy.sort((a, b) => UTILS.getDist(a, player, 2, 2) - UTILS.getDist(b, player, 2, 2));
    NearestEnemy = Enemy[0];
    NearestEnemyAngle = UTILS.getDirect(NearestEnemy, player, 2, 2);
  }
  if (Ally.length) {
    Ally.sort((a, b) => UTILS.getDist(a, player, 2, 2) - UTILS.getDist(b, player, 2, 2));
    NearestAlly = Ally[0];
    NearestAllyAngle = UTILS.getDirect(NearestAlly, player, 2, 2);
  }

  for (let tmp of players) {
    if (!tmp.visible && player != tmp)
      tmp.reloads = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        53: 0,
        FatGay: 0,
      };
    if (tmp.setBullTick) tmp.bullTimer = 0;
    if (tmp.setPoisonTick) tmp.poisonTimer = 0;
    tmp.updateTimer();
  }
  if (runAtNextTick.length) {
    for (const tmp of runAtNextTick) checkProjectileHolder(...tmp);
    runAtNextTick.length = 0;
  }
  //updateWeaponVariantIndicators();
  if (
    player.weapons[1] &&
    !clicks.left &&
    !clicks.right &&
    !traps.inTrap &&
    !instaC.isTrue &&
    !(
      Enemy.dist2 <= items.weapons[player.weapons[0]].range + Enemy.scale * 1.8
    )
  ) {
    if (
      player.reloads[player.weapons[0]] == 0 &&
      player.reloads[player.weapons[1]] == 0
    ) {
      if (!my.reloaded) {
        my.reloaded = true;
        let fastSpeed =
          items.weapons[player.weapons[0]].spdMult <
            items.weapons[player.weapons[1]].spdMult
            ? 1
            : 0;
        if (
          player.weaponIndex != player.weapons[fastSpeed] ||
          player.buildIndex > -1
        ) {
          selectWeapon(player.weapons[fastSpeed]);
        }
      }
    } else {
      my.reloaded = false;
      if (player.reloads[player.weapons[0]] > 0) {
        if (
          player.weaponIndex != player.weapons[0] ||
          player.buildIndex > -1
        ) {
          selectWeapon(player.weapons[0]);
        }
      } else if (
        player.reloads[player.weapons[0]] == 0 &&
        player.reloads[player.weapons[1]] > 0
      ) {
        if (
          player.weaponIndex != player.weapons[1] ||
          player.buildIndex > -1
        ) {
          selectWeapon(player.weapons[1]);
        }
      }
    }
  }
  if (!instaC.isTrue && !traps.inTrap && !traps.replaced) {
    Mod.Place.autoPlace();
  }
  if (!macro.q && !macro.f && !macro.v && !macro.h && !macro.n) {
    io.send("D", getAttackDir());
  }
  let hatChanger = function () {
    if (!AB.Menu.AutoHat) return;
    const leftHat = AB.Menu.LoadoutHatLeft ?? 7;
    const rightHat = AB.Menu.LoadoutHatRight ?? 40;
    if ((performance.now() - (my.lastWASDTime || 0)) > 3000 && !my.idleHatActive) {
      buyEquip(12, 0);
      buyEquip(0, 1);
      my.idleHatActive = true;
      return;
    }
    if (clicks.left || clicks.right) {
      if (clicks.left) {
        buyEquip(
          player.reloads[player.weapons[0]] == 0
            ? AB.Menu.weaponGrind && player.items.includes(22)
              ? rightHat
              : leftHat
            : player.empAnti
              ? 22
              : 6,
          0,
        );
      } else if (clicks.right) {
        buyEquip(
          player.reloads[
            clicks.right && player.weapons[1] == 10
              ? player.weapons[1]
              : player.weapons[0]
          ] == 0
            ? rightHat
            : player.empAnti
              ? 22
              : 6,
          0,
        );
      }
    } else {
      if (clicks.left || clicks.right) {
        if (
          ((player.shameCount > 0 &&
            (Mod.tick - player.bullTick) % config.serverUpdateRate === 0 &&
            player.skinIndex != 45) ||
            my.reSync) &&
          ((Enemy && Enemy.dist2 > 120) || !Enemy)
        ) {
        } else {
          if (clicks.left) {
            buyEquip(
              player.reloads[player.weapons[0]] == 0
                ? AB.Menu.weaponGrind && player.items.includes(22)
                  ? rightHat
                  : leftHat
                : player.empAnti
                  ? 22
                  : player.soldierAnti
                    ? 6
                    : AB.Menu.antiBullType === "abreload" && Enemy.antiBull > 0
                      ? 11
                      : Enemy.dist2 <= 300
                        ? AB.Menu.antiBullType === "abalway" &&
                          Enemy.reloads[Enemy.primaryIndex] == 0
                          ? 11
                          : 6
                        : biomeGear(1, 1),
              0,
            );
          } else if (clicks.right) {
            buyEquip(
              player.reloads[
                clicks.right && player.weapons[1] == 10
                  ? player.weapons[1]
                  : player.weapons[0]
              ] == 0
                ? rightHat
                : player.empAnti
                  ? 22
                  : player.soldierAnti
                    ? 6
                    : AB.Menu.antiBullType === "abreload" && Enemy.antiBull > 0
                      ? 11
                      : Enemy.dist2 <= 300
                        ? AB.Menu.antiBullType === "abalway" &&
                          Enemy.reloads[Enemy.primaryIndex] == 0
                          ? 11
                          : 6
                        : biomeGear(1, 1),
              0,
            );
          }
        }
      } else if (AB.Menu.weaponGrind && player.items.includes(22)) {
        let gt = AB.Menu.grindTo;
        let targetTier = gt === "Gold" ? 1 : gt === "Diamond" ? 2 : gt === "Ruby" ? 3 : gt;
        let pTier = player.primaryVariant == undefined ? 0 : player.primaryVariant;
        let sTier = player.secondaryVariant == undefined ? 0 : player.secondaryVariant;
        let shouldSkip =
          (pTier >= targetTier && sTier >= targetTier) ||
          (pTier >= targetTier && player.weapons[1] != 10);
        if (!shouldSkip) {
          let reloadIndex =
            AB.Menu.weaponGrind && my.grindPreferred != undefined && performance.now() < (my.grindLock || 0)
              ? my.grindPreferred
              : player.weapons[1] == 10
                ? player.weapons[1]
                : player.weapons[0];
          buyEquip(
            player.reloads[reloadIndex] == 0 ? rightHat : player.empAnti ? 22 : 6,
            0,
          );
        }
      } else if (traps.inTrap) {
        if (
          traps.info.health <= items.weapons[player.weaponIndex].dmg
            ? false
            : player.reloads[
            player.weapons[1] == 10
              ? player.weapons[1]
              : player.weapons[0]
            ] == 0
        ) {
          buyEquip(40, 0);
          buyEquip(21, 1);
        } else {
          if (
            ((player.shameCount > 0 &&
              (Mod.tick - player.bullTick) % config.serverUpdateRate === 0 &&
              player.skinIndex != 45) ||
              my.reSync) &&
            ((Enemy && Enemy.dist2 > 140) || !Enemy)
          ) {
          }
        }
      } else {
        if (
          ((player.shameCount > 0 &&
            (Mod.tick - player.bullTick) % config.serverUpdateRate === 0 &&
            player.skinIndex != 45) ||
            my.reSync) &&
          ((Enemy && Enemy.dist2 > 140) || !Enemy)
        ) {
        } else {
          if (Enemy.dist2 <= 300) {
            buyEquip(
              AB.Menu.antiBullType === "abreload" && Enemy.antiBull > 0
                ? 11
                : AB.Menu.antiBullType === "abalway" &&
                  Enemy.reloads[Enemy.primaryIndex] == 0
                  ? 11
                  : 6,
              0,
            );
          } else {
            biomeGear(1);
          }
        }
      }
    }
  };

  let accChanger = function () {
    if (!AB.Menu.AutoHat) return;
    const leftAcc = AB.Menu.LoadoutAccLeft ?? 21;
    const rightAcc = AB.Menu.LoadoutAccRight ?? 19;
    if (instaC.can && player.checkCanInsta(true) >= 100) {
      buyEquip(18, 1);
    } else if (clicks.left) {
      setTimeout(() => {
        buyEquip(leftAcc, 1);
      }, 50);
    } else if (clicks.right) {
      setTimeout(() => {
        buyEquip(rightAcc, 1);
      }, 50);
    } else if (Enemy.dist2 <= 240) {
      buyEquip(leftAcc, 1);
    } else {
      traps.inTrap ? buyEquip(leftAcc, 1) : buyEquip(11, 1);
    }
  };
  if (
    storeMenu.style.display != "block"
  ) {
    hatChanger();
    accChanger();
  }
}
function findPlayerByID(e) {
  for (let t = 0; t < players.length; ++t) {
    if (players[t].id == e) {
      return players[t];
    }
  }
  return null;
}
function findPlayerBySID(e) {
  for (let t = 0; t < players.length; ++t) {
    if (players[t].sid == e) {
      return players[t];
    }
  }
  return null;
}
function findAIBySID(e) {
  for (let t = 0; t < ais.length; ++t) {
    if (ais[t].sid == e) {
      return ais[t];
    }
  }
  return null;
}
function findObjectBySid(e) {
  for (let t = 0; t < gameObjects.length; ++t) {
    if (gameObjects[t].sid == e) {
      return gameObjects[t];
    }
  }
  return null;
}
let lastPing = -1;
function pingSocketResponse() {
  const e = Date.now() - lastPing;
  window.pingTime = e;
  Gi.innerText = "Ping: " + e + " ms";
}
let bs;
function pingSocket() {
  if (bs) {
    clearTimeout(bs);
  }
  if (socketReady()) {
    lastPing = Date.now();
    io.send("0");
  }
  bs = // TOLOOK
    setTimeout(pingSocket, 2500);
}
function serverShutdownNotice(e) {
  if (e < 0) {
    return;
  }
  const t = Math.floor(e / 60);
  let i = e % 60;
  i = ("0" + i).slice(-2);
  po.innerText = "Server restarting in " + t + ":" + i;
  po.hidden = false;
}
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1000 / 60);
    }
  );
})();
window.debug = function () {
  itemSprites = [];
  objSprites = [];
};
const requestAnimFrame = window.requestAnimFrame;
function doUpdate() {
  hi = Date.now();
  delta = hi - oo;
  oo = hi;
  updateGame();
  requestAnimFrame(doUpdate);
}
prepareMenuBackground();
doUpdate();
function openLink(e) {
  window.open(e, "_blank");
}
window.openLink = openLink;
window.aJoinReq = aJoinReq;
window.follmoo = moofollower;
window.kickFromClan = kickFromClan;
window.sendJoin = sendJoin;
window.leaveAlliance = leaveAlliance;
window.createAlliance = createAlliance;
window.storeBuy = storeBuy;
window.storeEquip = storeEquip;
window.showItemInfo = showItemInfo;
window.selectSkinColor = selectSkinColor;
window.changeStoreIndex = changeStoreIndex;
window.config = config;