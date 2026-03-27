// ==UserScript==
// @name         ! Abyss Client
// @description  epik
// @version      V3.1
// @license      CC BY-SA 4.0
// @author       Phalynx and Firaz
// @match        *://*.moomoo.io/*
// @match        http://localhost:1234/
// @require      https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// @icon         https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtAUcQJqWlDJ3lKyFjyZDQ.jpeg
// @grant        none
// ==/UserScript==

var autoBreaking = false;
document.title = "Abyss Client";
let gameName = getEl("gameName");
gameName.innerHTML = "Abyss Client";
gameName.style.fontFamily = "HammerSmith One";
gameName.style.fontSize = "100px";
gameName.style.textAlign = "center";
gameName.style.marginTop = "10px";
gameName.style.marginBottom = "10px";

getEl("mainMenu").style.backgroundRepeat = "repeat";
getEl("mainMenu").style.backgroundSize = "contain";

window.reloadedColor = "#333333";
window.middleReloadedColor = "#333333";
window.notReloadedColor = "#333333";

let loadingText = getEl("loadingText");
loadingText.innerText = "Loading..";
loadingText.style.fontFamily = "HammerSmith One";
loadingText.style.fontSize = "50px";
loadingText.style.textAlign = "center";
loadingText.style.marginTop = "10px";
loadingText.style.marginBottom = "10px";

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

(function () {
  function removeSections() {
    const card = document.getElementById("guideCard");
    if (!card) return;

    const headers = Array.from(card.querySelectorAll(".menuHeader"));
    for (const h of headers) {
      const t = (h.textContent || "").trim().toLowerCase();

      if (t === "how to play") {
        const next = h.nextElementSibling;
        h.remove();
        if (next && next.classList?.contains("menuText")) next.remove();
      }

      if (t === "controls") {
        h.remove();
        const desk = card.querySelector("#desktopInstructions");
        const mob = card.querySelector("#mobileInstructions");
        if (desk) desk.remove();
        if (mob) mob.remove();
      }
    }

    const texts = Array.from(card.querySelectorAll(".menuText"));
    for (const el of texts) {
      if (el.textContent.toLowerCase().includes("created by")) {
        el.remove();
      }
    }
  }
  (function () {
    function createCustomDropdown() {
      const browser = document.getElementById("serverBrowser");
      const select = browser?.querySelector("select");
      if (!browser || !select) return;

      document.getElementById("customServerDropdown")?.remove();
      select.style.display = "none";

      select.selectedIndex = -1;

      const wrap = document.createElement("div");
      wrap.id = "customServerDropdown";

      const selected = document.createElement("div");
      selected.id = "customServerSelected";
      selected.textContent = "Select Server";

      const list = document.createElement("div");
      list.id = "customServerList";

      let currentRegion = "";

      [...select.options].forEach((opt, i) => {
        if (opt.disabled && opt.textContent.includes("players")) {
          currentRegion = opt.textContent.split(" - ")[0];

          const region = document.createElement("div");
          region.className = "customServerRegion";
          region.textContent = currentRegion;
          list.appendChild(region);
          return;
        }

        if (opt.disabled) return;

        const item = document.createElement("div");
        item.className = "customServerOption";
        item.textContent = opt.textContent;

        // Don't auto-select any server by default
        item.classList.remove("selected");

        item.onclick = () => {
          select.selectedIndex = i;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          selected.textContent = opt.textContent;

          list
            .querySelectorAll(".selected")
            .forEach((e) => e.classList.remove("selected"));
          item.classList.add("selected");
          list.classList.remove("open");
        };

        list.appendChild(item);
      });

      selected.onclick = () => {
        list.classList.toggle("open");
      };

      document.addEventListener("click", (e) => {
        if (!wrap.contains(e.target)) list.classList.remove("open");
      });

      wrap.appendChild(selected);
      wrap.appendChild(list);
      browser.appendChild(wrap);

      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        select.disabled = true;
        wrap.style.pointerEvents = "none";
        wrap.style.opacity = "0.5";
        selected.textContent = "Localhost (server select disabled)";
      }
    }

    const iv = setInterval(() => {
      const browser = document.getElementById("serverBrowser");
      const select = browser?.querySelector("select");
      if (browser && select && select.options.length) {
        createCustomDropdown();
        clearInterval(iv);
      }
    }, 300);

    // optional: rebuild if servers update later
    window.rebuildServerDropdown = createCustomDropdown;
  })();

  let tries = 0;
  const iv = setInterval(() => {
    removeSections();
    tries++;
    if (tries > 50) clearInterval(iv);
  }, 200);
})();

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

const instaReticle = new Image();
instaReticle.src = "https://i.imgur.com/msvee9i.png";

// =======================
// Texture Pack
// =======================
const resourcePack = { pack: "The Warrior Chronicles" };

// ===== Textures =====
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

// ===== Texture cache =====
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

// ===== Preload everything =====
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
      console.log("Clicked skin color");
      clickedElements.color = true;
    }
  }

  // If not everything clicked, try once more after delay
  if (!clickedElements.color) {
    setTimeout(tryClickElements, 500);
  }
};

setTimeout(tryClickElements, 1000);

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
  // Synchronous js-sha256 is faster than async Web Crypto for brute-force
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
(function () {
  const scriptSrc = "index-6b10514b.js";
  const scriptTags = document.querySelectorAll(`script[src*="${scriptSrc}"]`);
  if (scriptTags.length > 0) {
    scriptTags[0].remove();
  }
})();

document.addEventListener("keydown", function (event) {
  if (document.getElementById("chatBox") === document.activeElement) return;
  if (event.keyCode === 192) {
    const chatHolder = document.getElementById("gameUI");
    if (chatHolder) {
      const currentDisplay = chatHolder.style.display;
      chatHolder.style.display = currentDisplay === "none" ? "block" : "none";
    }
  }
});

function getEl(id) {
  return document.getElementById(id);
}

const msgpackUrl =
  "https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js";
const customScriptUrl = null;

window.oncontextmenu = function () {
  return false;
};

let config = window.config;
let recording;

config.clientSendRate = 9;
config.serverUpdateRate = 9;

config.deathFadeout = 0;

config.playerCapacity = 50;
window.config.maxPlayers = 50;

config.isSandbox =
  window.location.hostname == "sandbox.moomoo.io" ||
  "moomoo.io/?server=phalynx";

config.skinColors = [
  "#bf8f54",
  "#cbb091",
  "#896c4b",
  "#fadadc",
  "#ececec",
  "#c37373",
  "#000000",
  "#ecaff7",
  "#738cc3",
  "#8bc373",
  "#91b2db",
];

config.weaponVariants = [
  {
    id: 0,
    src: "",
    xp: 0,
    val: 1,
  },
  {
    id: 1,
    src: "_g",
    xp: 3000,
    val: 1.1,
  },
  {
    id: 2,
    src: "_d",
    xp: 7000,
    val: 1.18,
  },
  {
    id: 3,
    src: "_r",
    poison: true,
    xp: 12000,
    val: 1.18,
  },
  {
    id: 4,
    src: "_e",
    poison: true,
    heal: true,
    xp: 24000,
    val: 1.18,
  },
];

config.anotherVisual = true;
config.useWebGl = false;
config.resetRender = true;

function waitTime(timeout) {
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, timeout);
  });
}

let canStore;
if (typeof Storage !== "undefined") {
  canStore = true;
}

function saveVal(name, val) {
  if (canStore) localStorage.setItem(name, val);
}

function deleteVal(name) {
  if (canStore) localStorage.removeItem(name);
}

function getSavedVal(name) {
  if (canStore) return localStorage.getItem(name);
  return null;
}

let gC = function (a, b) {
  try {
    let res = JSON.parse(getSavedVal(a));
    if (typeof res === "object") {
      return b;
    } else {
      return res;
    }
  } catch (e) {
    return b;
  }
};

function setConfigs() {
  return {
    hatCycle: false,
    autoBuy: true,
    autoBuyEquip: true,
    autoPush: true,
    safeWalk: true,
    revTick: true,
    spikeTick: true,
    predictTick: true,
    autoPlace: true,
    autoReplace: true,
    antiTrap: true,
    antiInsta: true,
    autoHeal: true,
    autoUpgrade: true,
    slowOT: false,
    attackDir: false,
    showDir: false,
    autoChat: false,
    autoRespawn: true,
    mouseMove: false,
    botCircle: false,
    botMills: true,
  };
}

let configs = setConfigs();

window.removeConfigs = function () {
  for (let cF in configs) {
    deleteVal(cF, configs[cF]);
  }
};

for (let cF in configs) {
  configs[cF] = gC(cF, configs[cF]);
}

window.changeMenu = function () { };
window.debug = function () { };
window.wasdMode = function () { };

window.startGrind = function () { };

window.resBuild = function () { };
window.toggleVisual = function () { };

window.prepareUI = function () { };
window.leave = function () { };

class HtmlAction {
  constructor(element) {
    this.element = element;
  }
  add(code) {
    if (!this.element) return undefined;
    this.element.innerHTML += code;
  }
  newLine(amount) {
    let result = `<br>`;
    if (amount > 0) {
      result = ``;
      for (let i = 0; i < amount; i++) {
        result += `<br>`;
      }
    }
    this.add(result);
  }
  checkBox(setting) {
    let newCheck = `<input type = "checkbox"`;
    setting.id && (newCheck += ` id = ${setting.id}`);
    setting.style &&
      (newCheck += ` style = ${setting.style.replaceAll(" ", "")}`);
    setting.class && (newCheck += ` class = ${setting.class}`);
    setting.checked && (newCheck += ` checked`);
    setting.onclick && (newCheck += ` onclick = ${setting.onclick}`);
    newCheck += `>`;
    this.add(newCheck);
  }
  text(setting) {
    let newText = `<input type = "text"`;
    setting.id && (newText += ` id = ${setting.id}`);
    setting.style &&
      (newText += ` style = ${setting.style.replaceAll(" ", "")}`);
    setting.class && (newText += ` class = ${setting.class}`);
    setting.size && (newText += ` size = ${setting.size}`);
    setting.maxLength && (newText += ` maxLength = ${setting.maxLength}`);
    setting.value && (newText += ` value = ${setting.value}`);
    setting.placeHolder &&
      (newText += ` placeHolder = ${setting.placeHolder.replaceAll(" ", "&nbsp;")}`);
    newText += `>`;
    this.add(newText);
  }
  select(setting) {
    let newSelect = `<select`;
    setting.id && (newSelect += ` id = ${setting.id}`);
    setting.style &&
      (newSelect += ` style = ${setting.style.replaceAll(" ", "")}`);
    setting.class && (newSelect += ` class = ${setting.class}`);
    newSelect += `>`;
    for (let options in setting.option) {
      newSelect += `<option value = ${setting.option[options].id}`;
      setting.option[options].selected && (newSelect += ` selected`);
      newSelect += `>${options}</option>`;
    }
    newSelect += `</select>`;
    this.add(newSelect);
  }
  button(setting) {
    let newButton = `<button`;
    setting.id && (newButton += ` id = ${setting.id}`);
    setting.style &&
      (newButton += ` style = ${setting.style.replaceAll(" ", "")}`);
    setting.class && (newButton += ` class = ${setting.class}`);
    setting.onclick && (newButton += ` onclick = ${setting.onclick}`);
    newButton += `>`;
    setting.innerHTML && (newButton += setting.innerHTML);
    newButton += `</button>`;
    this.add(newButton);
  }
  selectMenu(setting) {
    let newSelect = `<select`;
    if (!setting.id) {
      alert("please put id skid");
      return;
    }
    window[setting.id + "Func"] = function () { };
    setting.id && (newSelect += ` id = ${setting.id}`);
    setting.style &&
      (newSelect += ` style = ${setting.style.replaceAll(" ", "")}`);
    setting.class && (newSelect += ` class = ${setting.class}`);
    newSelect += ` onchange = window.${setting.id + "Func"}()`;
    newSelect += `>`;
    let last;
    let i = 0;
    for (let options in setting.menu) {
      newSelect += `<option value = ${"option_" + options} id = ${"O_" + options}`;
      setting.menu[options] && (newSelect += ` checked`);
      newSelect += ` style = "color: ${setting.menu[options] ? "#000" : "#fff"}; background: ${setting.menu[options] ? "#8ecc51" : "#cc5151"};">${options}</option>`;
      i++;
    }
    newSelect += `</select>`;

    this.add(newSelect);

    i = 0;
    for (let options in setting.menu) {
      window[options + "Func"] = function () {
        setting.menu[options] = getEl("check_" + options).checked
          ? true
          : false;
        saveVal(options, setting.menu[options]);
        getEl("O_" + options).style.color = setting.menu[options]
          ? "#000"
          : "#fff";
        getEl("O_" + options).style.background = setting.menu[options]
          ? "#8ecc51"
          : "#cc5151";
      };
      this.checkBox({
        id: "check_" + options,
        style: `display: ${i == 0 ? "inline-block" : "none"};`,
        class: "checkB",
        onclick: `window.${options + "Func"}()`,
        checked: setting.menu[options],
      });
      i++;
    }

    last = "check_" + getEl(setting.id).value.split("_")[1];
    window[setting.id + "Func"] = function () {
      getEl(last).style.display = "none";
      last = "check_" + getEl(setting.id).value.split("_")[1];
      getEl(last).style.display = "inline-block";
    };
  }
}
class Html {
  constructor() {
    this.element = null;
    this.action = null;
    this.divElement = null;
    this.startDiv = function (setting, func) {
      let newDiv = document.createElement("div");
      setting.id && (newDiv.id = setting.id);
      setting.style && (newDiv.style = setting.style);
      setting.class && (newDiv.className = setting.class);
      this.element.appendChild(newDiv);
      this.divElement = newDiv;

      let addRes = new HtmlAction(newDiv);
      typeof func == "function" && func(addRes);
    };
    this.addDiv = function (setting, func) {
      let newDiv = document.createElement("div");
      setting.id && (newDiv.id = setting.id);
      setting.style && (newDiv.style = setting.style);
      setting.class && (newDiv.className = setting.class);
      setting.appendID && getEl(setting.appendID).appendChild(newDiv);
      this.divElement = newDiv;

      let addRes = new HtmlAction(newDiv);
      typeof func == "function" && func(addRes);
    };
  }
  set(id) {
    this.element = getEl(id);
    this.action = new HtmlAction(this.element);
  }
  resetHTML(text) {
    if (text) {
      this.element.innerHTML = ``;
    } else {
      this.element.innerHTML = ``;
    }
  }
  setStyle(style) {
    this.element.style = style;
  }
  setCSS(style) {
    this.action.add(`<style>` + style + `</style>`);
  }
}

let HTML = new Html();

let menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";
document.body.appendChild(menuDiv);
HTML.set("menuDiv");
HTML.setStyle(`
            position: absolute;
                display: none;
            left: 20px;
            top: 135px;
            `);
HTML.resetHTML();
HTML.setCSS(`

#gameName,
#loadingText {
  color: #000 !important;
  font-weight: 700 !important;
  letter-spacing: 2px !important;

  -webkit-text-stroke: 2px #b784ff !important;

  text-shadow:
    0 0 1px rgba(0,0,0,1),
    0 0 3px rgba(60,40,110,1),
    0 0 6px rgba(100,70,160,0.6),
    0 0 14px rgba(183,132,255,0.25) !important;

  filter: drop-shadow(0 6px 18px rgba(0,0,0,0.75)) !important;

}

    #customServerDropdown {
  position: relative;
  width: 100%;
}
#customServerList::-webkit-scrollbar {
  width: 8px;
}

#customServerList::-webkit-scrollbar-track {
  background: #0a0a0d;
  border-radius: 12px;
}

#customServerList::-webkit-scrollbar-thumb {
  background: rgba(183,132,255,0.45);
  border-radius: 12px;
  border: 2px solid #0a0a0d;
}

#customServerList::-webkit-scrollbar-thumb:hover {
  background: rgba(183,132,255,0.7);
}
#customServerDropdown {
  position: relative;
  z-index: 10001;
}

#customServerSelected {
  position: relative;
  background: #0b0b10;
  border: 2px solid #b784ff;
  border-radius: 12px;
  padding: 10px 40px 10px 12px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(183,132,255,0.45);
  user-select: none;
}

#customServerSelected::after {
  content: "▾";
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #b784ff;
  font-size: 14px;
  pointer-events: none;
}
#customServerList {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 260px;
  overflow-y: auto;

  background: #0a0a0d;
  border: 2px solid #b784ff;
  border-radius: 14px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.85);
  z-index: 9999;

  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transition: all 0.18s ease;
}

#customServerList.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.customServerRegion {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #8f89a8;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid rgba(180,120,255,0.15);
  margin-top: 6px;
}

.customServerOption {
  padding: 8px 12px 8px 20px;
  cursor: pointer;
  font-size: 13px;
  color: #eae6ff;
}

.customServerOption:hover {
  background: #151524;
}

.customServerOption.selected {
  color: #b784ff;
  background: rgba(183,132,255,0.12);
}

#guideCard {
  width: 360px !important;
  max-height: 85vh !important;
  overflow-y: auto !important;
  background: linear-gradient(180deg, #0e0e12, #0a0a0d) !important;
  border-radius: 14px !important;
  padding: 14px !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.7) !important;
  border: 1px solid rgba(180,120,255,0.18) !important;
  animation: fadeIn 0.3s ease-out !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

#guideCard::-webkit-scrollbar {
  width: 6px;
}

#guideCard::-webkit-scrollbar-thumb {
  background: rgba(180,120,255,0.25);
  border-radius: 10px;
}

#guideCard .menuHeader {
  font-size: 15px !important;
  font-weight: 600 !important;
  margin: 10px 0 6px !important;
  padding-bottom: 6px !important;
  border-bottom: 1px solid rgba(180,120,255,0.20) !important;
  color: #c9a7ff !important;
  letter-spacing: 0.4px !important;
}

#guideCard .menuText {
  font-size: 13px !important;
  line-height: 1.5 !important;
  color: #cfcfd6 !important;
  margin-bottom: 10px !important;
}

#serverBrowser {
  position: relative !important;
}

#serverBrowser select {
  width: 100% !important;
  height: 42px !important;
  background: #0b0b10 !important;
  color: #e6e0ff !important;
  border-radius: 8px !important;
  border: 1px solid rgba(180,120,255,0.25) !important;
  padding: 8px 32px 8px 12px !important;
  font-size: 13px !important;
  outline: none !important;
  cursor: pointer !important;
  appearance: none !important;
  transition: all 0.2s ease !important;
}

#serverBrowser select:focus {
  border-color: #b784ff !important;
  box-shadow: 0 0 0 3px rgba(183,132,255,0.3),
              0 0 18px rgba(183,132,255,0.6) !important;
}

#serverBrowser select::-webkit-scrollbar {
  width: 8px;
}

#serverBrowser select::-webkit-scrollbar-track {
  background: #0a0a0d;
  border-radius: 10px;
}

#serverBrowser select::-webkit-scrollbar-thumb {
  background: rgba(183,132,255,0.45);
  border-radius: 10px;
}

#serverBrowser select::-webkit-scrollbar-thumb:hover {
  background: rgba(183,132,255,0.65);
}

select option {
  background: #0b0b10 !important;
  color: #eae6ff !important;
  font-size: 13px !important;
  padding: 10px !important;
}

select option[disabled] {
  background: #0a0a0d !important;
  color: #8f89a8 !important;
  font-style: italic !important;
}

select option:hover,
select option:focus,
select option:checked {
  background: linear-gradient(135deg, #1a1525, #151020) !important;
  color: #b784ff !important;
}

#serverBrowser::after {
  content: "▾";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #b784ff;
  font-size: 14px;
  opacity: 0.85;
}

#altServer {
  margin-top: 8px !important;
  text-align: center !important;
}

#altServer a {
  color: #a98bff !important;
  font-size: 12px !important;
  text-decoration: none !important;
}

#skinColorHolder {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
  margin-top: 8px !important;
}

.skinColorItem {
  width: 22px !important;
  height: 22px !important;
  border-radius: 50% !important;
  margin: 0 !important;
  cursor: pointer !important;
  border: 2px solid transparent !important;
  transition: all 0.15s ease !important;
}

.skinColorItem:hover {
  transform: scale(1.08) !important;
}

.skinColorItem.activeSkin {
  border-color: #b784ff !important;
  box-shadow: 0 0 10px rgba(183,132,255,0.85) !important;
}

.settingRadio {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 13px !important;
  color: #d6d2e5 !important;
}

.settingRadio input {
  accent-color: #b784ff !important;
  cursor: pointer !important;
}

.menuLink {
  color: #a98bff !important;
  text-decoration: none !important;
}

#setupCard {
  background: linear-gradient(180deg, #0e0e12, #0a0a0d) !important;
  border-radius: 16px !important;
  padding: 18px !important;
  width: 300px !important;
  box-shadow: 0 25px 50px rgba(0,0,0,0.75) !important;
  border: 1px solid rgba(180,120,255,0.18) !important;
  animation: fadeIn 0.3s ease-out !important;
}

#setupCard input#nameInput {
  width: 100% !important;
  background: #0b0b10 !important;
  border-radius: 12px !important;
  padding: 12px !important;
  text-align: center !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #eae6ff !important;
  border: 2px solid #b784ff !important;
  box-shadow: 0 0 10px rgba(183,132,255,0.45) !important;
  transition: all 0.15s ease !important;
}

#setupCard input#nameInput::placeholder {
  color: #8f89a8 !important;
}

#setupCard input#nameInput:focus {
  border-color: #b784ff !important;
  box-shadow: 0 0 0 2px rgba(183,132,255,0.25) !important;
}

#setupCard .altcha {
  background: #0b0b10 !important;
  border-radius: 10px !important;
  border: 1px solid rgba(180,120,255,0.25) !important;
  padding: 8px 10px !important;
  margin-bottom: 14px !important;
  color: #e6e0ff !important;
}

#setupCard .altcha span {
  color: #c9a7ff !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}

#setupCard .altcha-logo {
  color: #b784ff !important;
  opacity: 0.8;
}

#setupCard .altcha-checkbox input {
  accent-color: #b784ff !important;
  cursor: pointer !important;
}

#setupCard #enterGame {
  width: 100% !important;
  background: #0b0b10 !important;
  border-radius: 12px !important;
  padding: 12px !important;
  text-align: center !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #eae6ff !important;
  cursor: pointer !important;
  user-select: none !important;
  border: 2px solid #b784ff !important;
  box-shadow: 0 0 10px rgba(183,132,255,0.45) !important;
  transition: all 0.15s ease !important;
}

#setupCard #enterGame:hover {
  background: #11111a !important;
  box-shadow: 0 0 16px rgba(183,132,255,0.65) !important;
  transform: translateY(-1px) !important;
}

#setupCard #enterGame:active {
  transform: translateY(0) !important;
  box-shadow: 0 0 8px rgba(183,132,255,0.35) !important;
}

#ageBar, .gameButton, #leaderboard, .resourceDisplay, #mapDisplay, #allianceHolder, #allianceInput, .allianceButtonM, #storeHolder, #ChatBodyBox, .storeTab, #chatBox, .actionBarItem, #PlayerLogBoard, .uiElement {
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

#storeHolder::-webkit-scrollbar,
#allianceHolder::-webkit-scrollbar,
#allianceMenu::-webkit-scrollbar {
    width: 6px;
}
#storeHolder::-webkit-scrollbar-track,
#allianceHolder::-webkit-scrollbar-track,
#allianceMenu::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
}
#storeHolder::-webkit-scrollbar-thumb,
#allianceHolder::-webkit-scrollbar-thumb,
#allianceMenu::-webkit-scrollbar-thumb {
    background: rgba(140, 90, 255, 0.45);
    border-radius: 6px;
}
#storeHolder::-webkit-scrollbar-thumb:hover,
#allianceHolder::-webkit-scrollbar-thumb:hover,
#allianceMenu::-webkit-scrollbar-thumb:hover {
    background: rgba(160, 110, 255, 0.6);
}

.actionBarItem {
    background-size: cover;
    background-position: center;
    border-radius: 10px;
}

#ageBar {
    margin-bottom: 5px;
}

#foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay {
    line-height: 30px;
    background-size: 32px;
    background-position: center top 5px;
    padding: 30px 10px 0 10px;
    font-size: 20px;
}

#foodDisplay {
    bottom: 160px;
}

#woodDisplay {
    bottom: 90px;
}

body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #120a20 100%);
    color: #dcdcdc;
}

/* Menu container */
.menuClass {
    font-size: 22px;
    padding: 20px;
    width: 360px;
    background: rgba(15, 15, 20, 0.9);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.05);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 12px 30px rgba(0,0,0,0.7);
    color: #f0f0f0;
    animation: menuFadeIn 0.4s ease-out;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

/* Section containers */
.menuC {
    display: none;
    font-size: 14px;
    max-height: 220px;
    overflow-y: auto;
    margin-top: 10px;
    padding: 14px;
    background: rgba(20, 15, 35, 0.5);
    border-radius: 12px;
    transition: all 0.3s ease;
}

/* Buttons */
.menuB {
    text-align: center;
    background: rgba(60, 30, 120, 0.5);
    color: #f0f0f0;
    border: 1px solid rgba(120,80,220,0.2);
    border-radius: 10px;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-weight: 600;
    margin: 6px 0;
    width: 100%;
    font-size: 15px;
    box-shadow: 0 4px 12px rgba(60,30,120,0.3);
}
.menuB:hover {
    background: rgba(100,50,200,0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(80,40,180,0.5);
}
.menuB:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(60,30,120,0.3);
}

/* Checkboxes as toggles */
.checkB {
    accent-color: #8a5fff;
    transform: scale(1.3);
    margin-right: 8px;
    cursor: pointer;
}

/* Select menus */
.Cselect {
    background: rgba(35,25,60,0.5);
    color: #f0f0f0;
    border: 1px solid rgba(120,100,255,0.2);
    border-radius: 10px;
    padding: 8px 12px;
    margin: 6px 0;
    font-weight: 500;
}

#musicMenu {
    border: 1px solid rgba(255,255,255,0.08);
}
#musicMenu .menuHeader {
    color: #e6e6e6;
    cursor: default;
}
#musicMenu .menuText {
    color: #bdbdbd;
}
#musicMenu .menuB {
    background: rgba(0,0,0,0.35);
    color: #e6e6e6;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 3px 10px rgba(0,0,0,0.35);
}
#musicMenu .menuB:hover {
    background: rgba(0,0,0,0.5);
    transform: translateY(-1px);
    box-shadow: 0 5px 14px rgba(0,0,0,0.45);
}
#musicMenu .menuB:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(0,0,0,0.35);
}
#musicMenu .Cselect {
    background: rgba(0,0,0,0.35);
    color: #e6e6e6;
    border: 1px solid rgba(255,255,255,0.08);
}
#musicMenu .checkB {
    accent-color: #bdbdbd;
}
#musicMenu input[type="range"] {
    accent-color: #bdbdbd;
}


/* Menu changer button */
#menuChanger {
    position: absolute;
    right: 20px;
    top: 20px;
    background: rgba(20,20,30,0.85);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    color: #8a5fff;
    border: 1px solid rgba(120,100,255,0.3);
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}
#menuChanger:hover {
    background: rgba(80,60,160,0.5);
    color: #fff;
    transform: rotate(90deg);
    box-shadow: 0 5px 18px rgba(50,0,100,0.5);
}

/* Scrollbars */
.menuC::-webkit-scrollbar { width: 6px; }
.menuC::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 3px; }
.menuC::-webkit-scrollbar-thumb { background: rgba(120,100,255,0.4); border-radius: 3px; }
.menuC::-webkit-scrollbar-thumb:hover { background: rgba(150,120,255,0.5); }

/* Animations */
@keyframes menuFadeIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

ins.adsbygoogle,
.adsbygoogle,
iframe[src*="googlesyndication"],
iframe[src*="googleads"],
iframe[id^="google_ads"],
div[id^="google_ads"],
div[id*="google_ads"],
iframe[data-ad-client],
div[data-ad-client] {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`);

HTML.startDiv(
  {
    id: "menuHeadLine",
    class: "menuClass",
  },
  (html) => {
    html.add(`Abyss`);
    html.button({
      id: "menuChanger",
      class: "material-icons",
      innerHTML: `sync`,
      onclick: "window.changeMenu()",
    });
    HTML.addDiv(
      {
        id: "menuButtons",
        style: "display: block; overflow-y: visible;",
        class: "menuC",
        appendID: "menuHeadLine",
      },
      (html) => {
        html.button({
          class: "menuB",
          innerHTML: "Debug",
          onclick: "window.debug()",
        });
      },
    );
    HTML.addDiv(
      {
        id: "menuMain",
        style: "display: block",
        class: "menuC",
        appendID: "menuHeadLine",
      },
      (html) => {
        html.button({
          class: "menuB",
          innerHTML: "Dagger Optimisation",
          onclick: "window.wasdMode()",
        });
        html.newLine();
        html.add(`Auto-Grinder: `);
        html.checkBox({
          id: "weaponGrind",
          class: "checkB",
          onclick: "window.startGrind()",
        });
        html.newLine(2);
        HTML.addDiv(
          {
            style: "font-size: 30px; color: #4f4f4f;",
            appendID: "menuMain",
          },
          (html) => {
            html.add(`_______________`);
          },
        );
        html.add(`Anti-Push:`);
        html.checkBox({
          id: "antipush",
          class: "checkB",
          checked: true,
        });
        html.newLine();
      },
    );
    HTML.addDiv(
      {
        id: "menuConfig",
        class: "menuC",
        appendID: "menuHeadLine",
      },
      (html) => {
        html.add(`AutoPlacer Placement Tick: `);
        html.text({
          id: "autoPlaceTick",
          class: "customText",
          value: "1",
          size: "2em",
          maxLength: "2",
        });
        html.newLine();
        html.add(`Configs: `);
        html.selectMenu({
          id: "configsChanger",
          class: "Cselect",
          menu: configs,
        });
        html.newLine();
        html.add(`InstaKill Type: `);
        html.select({
          id: "instaType",
          class: "Cselect",
          option: {
            OneShot: {
              id: "oneShot",
              selected: true,
            },
            Spammer: {
              id: "spammer",
            },
            OneFrame: {
              id: "oneframe",
            },
          },
        });
        html.newLine();
        html.add(`AutoUpgrade Type: `);
        html.select({
          id: "UpgType",
          class: "Cselect",
          option: {
            SB: { id: "sb" },
            KH: { id: "kh", selected: true },
            PB: { id: "pb" },
            PH: { id: "ph" },
            DB: { id: "db" },
            KM: { id: "km" },
          },
        });
        html.newLine();
        html.add(`AntiBull Type: `);
        html.select({
          id: "antiBullType",
          class: "Cselect",
          option: {
            "Disable AntiBull": {
              id: "noab",
              selected: true,
            },
            "When Reloaded": {
              id: "abreload",
            },
            "Primary Reloaded": {
              id: "abalway",
            },
          },
        });
        html.newLine();
        html.add(`Backup Nobull Insta: `);
        html.checkBox({
          id: "backupNobull",
          class: "checkB",
          checked: true,
        });
        html.newLine();
        html.add(`Turret Gear Combat Assistance: `);
        html.checkBox({
          id: "turretCombat",
          class: "checkB",
          checked: true,
        });
        html.newLine();
        html.add(`Safe AntiSpikeTick: `);
        html.checkBox({
          id: "safeAntiSpikeTick",
          class: "checkB",
          checked: true,
        });
        html.newLine();
      },
    );
    HTML.addDiv(
      {
        id: "menuOther",
        class: "menuC",
        appendID: "menuHeadLine",
      },
      (html) => {
        html.newLine();
        html.button({
          class: "menuB",
          innerHTML: "Reset Break Objects",
          onclick: "window.resBuild()",
        });
        html.newLine();
        html.add(`Break Objects Range: `);
        html.text({
          id: "breakRange",
          class: "customText",
          value: "700",
          size: "3em",
          maxLength: "4",
        });
        html.newLine();
        html.add(`Predict Movement Type: `);
        html.select({
          id: "predictType",
          class: "Cselect",
          option: {
            "Disable Render": {
              id: "disableRender",
              selected: true,
            },
            "X/Y and 2": {
              id: "pre2",
            },
            "X/Y and 3": {
              id: "pre3",
            },
          },
        });
        html.newLine();
        html.add(`Render Placers: `);
        html.checkBox({
          id: "placeVis",
          class: "checkB",
        });
        HTML.addDiv(
          {
            id: "menuChats",
            class: "menuC",
            appendID: "menuHeadLine",
          },
          (html) => {
            html.add(
              `<h3 style="color: #8a5fff; margin-bottom: 10px; font-size: 18px;">🤖 Auto-Chat System</h3>`,
            );

            // Mode Selection
            html.add(`<div style="margin-bottom: 10px;">
        <strong>Select Mode:</strong>
    </div>`);

            html.add(`<select id="chatModeSelect" class="Cselect" style="width: 100%; margin-bottom: 10px;" onchange="updateModeInfo()">
        <option value="0">-- Select a Mode --</option>
    </select>`);

            // Mode Info Display
            html.add(`<div id="modeInfo" style="font-size: 12px; padding: 8px; background: rgba(20,15,35,0.3); border-radius: 6px; margin-bottom: 10px; display: none;">
        <div><strong>Messages:</strong> <span id="messageCount">0</span></div>
        <div><strong>Interval:</strong> <span id="intervalTime">0</span>ms</div>
        <div id="modeDescription"></div>
    </div>`);

            // For Custom Mode Only
            html.add(`<div id="customMessagesDiv" style="display: none; margin-bottom: 10px;">
        <div><strong>Custom Messages (one per line):</strong></div>
        <textarea id="customMessages" style="width: 100%; height: 80px; background: rgba(35,25,60,0.5); color: #f0f0f0; border: 1px solid rgba(120,100,255,0.2); border-radius: 8px; padding: 6px; font-size: 12px; resize: vertical;"></textarea>
    </div>`);

            // Interval Control
            html.add(`<div style="margin-bottom: 10px;">
        <strong>Chat Interval (ms):</strong>
        <input type="number" id="chatInterval" value="3000" min="500" max="10000" step="500" style="width: 80px; margin-left: 10px; background: rgba(35,25,60,0.5); color: #f0f0f0; border: 1px solid rgba(120,100,255,0.2); border-radius: 6px; padding: 4px;">
    </div>`);

            // Control Buttons
            html.button({
              id: "startChatBtn",
              class: "menuB",
              innerHTML: "▶️ Start Auto-Chat",
              onclick: "startAutoChat()",
              style:
                "background: rgba(80,60,160,0.5); width: 48%; margin-right: 4%; margin-bottom: 5px;",
            });
            html.button({
              id: "stopChatBtn",
              class: "menuB",
              innerHTML: "⏹️ Stop Auto-Chat",
              onclick: "stopAutoChat()",
              style:
                "background: rgba(160,60,80,0.5); width: 48%; margin-bottom: 5px;",
            });

            // Single Message Test
            html.add(`<div style="margin-top: 10px; margin-bottom: 5px;">
        <strong>Test Single Message:</strong>
    </div>`);
            html.button({
              id: "testChatBtn",
              class: "menuB",
              innerHTML: "💬 Send Test Message",
              onclick: "sendTestMessage()",
              style:
                "background: rgba(60,160,100,0.5); width: 100%; margin-bottom: 5px;",
            });

            // Status Display
            html.add(`<div id="chatStatus" style="font-size: 11px; color: #a6aec4; margin-top: 15px; padding: 8px; background: rgba(20,15,35,0.3); border-radius: 8px; text-align: center;">
        <div>Status: <span id="statusText" style="color: #8ecc51;">Ready</span></div>
        <div>Messages Sent: <span id="messagesSent" style="color: #ff8a5f;">0</span></div>
        <div>Current Mode: <span id="currentModeText">None</span></div>
    </div>`);
          },
        );
      },
    );
  },
);

let menuIndex = 0;
let menus = ["menuMain", "menuConfig", "menuOther", "menuChats"];
window.changeMenu = function () {
  getEl(menus[menuIndex % menus.length]).style.display = "none";
  menuIndex++;
  getEl(menus[menuIndex % menus.length]).style.display = "block";
};

let mStatus = document.createElement("div");
mStatus.id = "status";
getEl("gameUI").appendChild(mStatus);
HTML.set("status");
HTML.setStyle(`
            display: block;
            position: absolute;
            color: #000000;
            font: 15px HammerSmith One;
            bottom: 215px;
            left: 20px;
            `);
HTML.resetHTML();
HTML.setCSS(`
  .sizing {
      font-size: 15px;
  }

  #uehmod {
      position: fixed;
      left: 165px;
      bottom: 20px;

      width: 140px;
      padding: 8px;

      background-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      gap: 6px;
  }

  .stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 13px;
  }

  .stats-label {
      color: #cfcfcf;
  }

  .stats-value {
      color: #ffffff;
      font-weight: 700;
  }
  .stats-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
  }

  .stats-divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 4px 0;
  }
            `);
HTML.startDiv(
  {
    id: "uehmod",
    class: "sizing",
  },
  (html) => {
    html.add(`
      <div class="stats-group">
        <div class="stats-row">
          <span class="stats-label">PING</span>
          <span id="pingFps" class="stats-value">None</span>
        </div>

        <div class="stats-row">
          <span class="stats-label">FPS</span>
          <span id="fpsCounter" class="stats-value">60</span>
        </div>
      </div>

      <div class="stats-divider"></div>

      <div class="stats-group">
        <div class="stats-row">
          <span class="stats-label">PACKET</span>
          <span id="packetStatus" class="stats-value">None</span>
        </div>
      </div>
    `);
  },
);
let openMenu = false;

let WS = undefined;
let socketID = undefined;

let useWasd = false;
let secPacket = 0;
let secMax = 120;
let secTime = 1000;
let firstSend = {
  sec: false,
};
let game = {
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
};
let modConsole = [];

let dontSend = false;
let fpsTimer = {
  last: 0,
  time: 0,
  ltime: 0,
};
let lastMoveDir = undefined;
let lastsp = ["cc", 1, "__proto__"];

WebSocket.prototype.nsend = WebSocket.prototype.send;
WebSocket.prototype.send = function (message) {
  if (!WS) {
    WS = this;
    WS.addEventListener("message", function (msg) {
      getMessage(msg);
    });
    WS.addEventListener("close", (event) => {
      if (event.code == 4001) {
        window.location.reload();
      }
    });
  }
  if (WS == this) {
    dontSend = false;

    let data = new Uint8Array(message);
    let parsed = window.msgpack.decode(data);
    let type = parsed[0];
    data = parsed[1];

    if (type == "6") {
      if (data[0]) {
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
        let tmpString;
        profanity.forEach((profany) => {
          if (data[0].indexOf(profany) > -1) {
            tmpString = "";
            for (let i = 0; i < profany.length; ++i) {
              if (i == 1) {
                tmpString += String.fromCharCode(0);
              }
              tmpString += profany[i];
            }
            let re = new RegExp(profany, "g");
            data[0] = data[0].replace(re, tmpString);
          }
        });

        data[0] = data[0].slice(0, 30);
      }
    } else if (type == "L") {
      data[0] = data[0] + String.fromCharCode(0).repeat(7);
      data[0] = data[0].slice(0, 7);
    } else if (type == "M") {
      data[0].name = data[0].name == "" ? "unknown" : "" + data[0].name;
      data[0].moofoll = true;
      data[0].skin = data[0].skin == 10 ? "__proto__" : data[0].skin;
      lastsp = [data[0].name, data[0].moofoll, data[0].skin];
    } else if (type == "D") {
      if (my.lastDir == data[0] || [null, undefined].includes(data[0])) {
        dontSend = true;
      } else {
        my.lastDir = data[0];
      }
    } else if (type == "d") {
      if (!data[2]) {
        dontSend = true;
      } else {
        if (![null, undefined].includes(data[1])) {
          my.lastDir = data[1];
        }
      }
    } else if (type == "K") {
      if (!data[1]) {
        dontSend = true;
      }
    } else if (type == "S") {
      instaC.wait = !instaC.wait;
      dontSend = true;
    } else if (type == "a") {
      if (data[1]) {
        if (player.moveDir == data[0]) {
          dontSend = true;
        }
        player.moveDir = data[0];
      } else {
        dontSend = true;
      }
    }
    if (!dontSend) {
      let binary = window.msgpack.encode([type, data]);
      this.nsend(binary);

      if (!firstSend.sec) {
        firstSend.sec = true;
        setTimeout(() => {
          firstSend.sec = false;
          secPacket = 0;
        }, secTime);
      }

      secPacket++;
    }
  } else {
    this.nsend(message);
  }
};

function packet(type) {
  let data = Array.prototype.slice.call(arguments, 1);
  let binary = window.msgpack.encode([type, data]);
  WS.send(binary);
}

function origPacket(type) {
  let data = Array.prototype.slice.call(arguments, 1);
  let binary = window.msgpack.encode([type, data]);
  WS.nsend(binary);
}

window.leave = function () {
  origPacket("kys", {
    "frvr is so bad": true,
    "sidney is too good": true,
    "dev are too weak": true,
  });
};

let io = {
  send: packet,
};

function getMessage(message) {
  let data = new Uint8Array(message.data);
  let parsed = window.msgpack.decode(data);
  let type = parsed[0];
  data = parsed[1];
  let events = {
    A: setInitData,
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
    3: setPlayerTeam,
    4: setAlliancePlayers,
    5: updateStoreItems,
    6: receiveChat,
    7: updateMinimap,
    8: showText,
    9: pingMap,
    0: pingSocketResponse,
  };
  if (type == "io-init") {
    socketID = data[0];
  } else {
    if (events[type]) {
      events[type].apply(undefined, data);
    }
  }
}

Math.lerpAngle = function (value1, value2, amount) {
  let difference = Math.abs(value2 - value1);
  if (difference > Math.PI) {
    if (value1 > value2) {
      value2 += Math.PI * 2;
    } else {
      value1 += Math.PI * 2;
    }
  }
  let value = value2 + (value1 - value2) * amount;
  if (value >= 0 && value <= Math.PI * 2) return value;
  return value % (Math.PI * 2);
};

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  if (r < 0) r = 0;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

function resetMoveDir() {
  keys = {};
  io.send("e");
}

let allChats = [];
let ticks = {
  tick: 0,
  delay: 0,
  time: [],
  manage: [],
};
let ais = [];
let players = [];
let alliances = [];
let alliancePlayers = [];
let gameObjects = [];
let liztobj = [];
let projectiles = [];
let deadPlayers = [];

let breakObjects = [];

let player;
let playerSID;
let tmpObj;

let enemy = [];
let nears = [];
let near = [];

// Blood particle system
let bloodParticles = [];
let damageAccumulator = {};

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

  update(delta) {
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

function createBloodSplatter(x, y, damageAmount = 20, sid = null) {
  if (!x || !y) return;

  // Fixed particle count and size, reduced only for very low damage
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

let adCard = getEl("adCard");
adCard.remove();
let wideAdCard = getEl("wideAdCard");
wideAdCard.remove();
let promoImgHolder = getEl("promoImgHolder");
promoImgHolder.remove();
let linksContainer = getEl("linksContainer2");
linksContainer.remove();
let joinPartyButton = getEl("joinPartyButton");
joinPartyButton.remove();
let partyButton = getEl("partyButton");
partyButton.remove();
let chatButton = getEl("chatButton");
chatButton.remove();
let altServer = getEl("altServer");
altServer.remove();

let gameCanvas = getEl("gameCanvas");
let mainContext = gameCanvas.getContext("2d");
let mapDisplay = getEl("mapDisplay");
let mapContext = mapDisplay.getContext("2d");
mapDisplay.width = 300;
mapDisplay.height = 300;
let storeMenu = getEl("storeMenu");
let storeHolder = getEl("storeHolder");
let upgradeHolder = getEl("upgradeHolder");
let upgradeCounter = getEl("upgradeCounter");
let chatBox = getEl("chatBox");
chatBox.autocomplete = "off";
chatBox.style.textAlign = "center";
chatBox.style.width = "18em";
let chatHolder = getEl("chatHolder");
let actionBar = getEl("actionBar");
let leaderboardData = getEl("leaderboardData");
let itemInfoHolder = getEl("itemInfoHolder");
let menuCardHolder = getEl("menuCardHolder");
let mainMenu = getEl("mainMenu");
let diedText = getEl("diedText");
let screenWidth;
let screenHeight;
let maxScreenWidth = config.maxScreenWidth;
let maxScreenHeight = config.maxScreenHeight;
let pixelDensity = 1;
let delta;
let now;
let lastUpdate = performance.now();
let camX;
let camY;
let tmpDir;
let mouseX = 0;
let mouseY = 0;
let allianceMenu = getEl("allianceMenu");
let waterMult = 1;
let waterPlus = 0;

const musicTracks = [
  {
    name: "Vizzen & Protolizard - Heaven Knows",
    url: "https://ncs.io/track/download/a75d47db-0083-4548-8487-d72fc572dd73",
  },
  {
    name: "Eminem: Mockingbird",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Eminem_-_Mockingbird_(Hydr0.org).mp3",
  },
  {
    name: "The Neighborhood: Sweater Weather",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Neighboorhood_-_Sweater_Weather_(Hydr0.org).mp3",
  },
  {
    name: "Eminem: Rap God",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Eminem%20-%20Rap%20God%20(Explicit)%20%5BXbGs_qK2PQA%5D.mp3",
  },
  {
    name: "The Kid Laroi: Stay",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The%20Kid%20LAROI,%20Justin%20Bieber%20-%20STAY%20(Official%20Video)%20%5BkTJczUoc26U%5D.mp3",
  },
  {
    name: "The Weeknd: Blinding Lights",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Weekend_-_Blinding_lights_(Hydr0.org).mp3",
  },
  {
    name: "The Walters: I Love You So",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/The_Walters_-_I_Love_You_So_(Hydr0.org).mp3",
  },
  {
    name: "Edward Maya, ft. Vika Jigulina: Stereo Hearts",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Edward_Maya_ft._Vika_Jigulina_-_Stereo_love_(Hydr0.org).mp3",
  },
  {
    name: "Yung Kai: Blue",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/yung_kai_-_yung_kai_-_blue_Official_Music_Video_(Hydr0.org).mp3",
  },
  {
    name: "Lil Nas X: Industry Baby",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Lil_Nas_X_Jack_Harlow_-_INDUSTRY_BABY_(Hydr0.org).mp3",
  },
  {
    name: "Powfu: Death Bed",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Powfu_beabadoobee_-_death_bed_coffee_for_your_head_(Hydr0.org).mp3",
  },
  {
    name: "Ed Sheeran: Shape Of You",
    url: "https://github.com/oe2735/music/raw/refs/heads/main/Ed_Sheeran_-_Shape_of_You_(Hydr0.org).mp3",
  },
  {
    name: "Blacklite District: Wishing Dead",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Blacklite%20District%20-%20Wishing%20Dead%20(Official%20Music%20Video).mp3",
  },
  {
    name: "Chris Grey: Let The World Burn",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Chris%20Grey%20-%20LET%20THE%20WORLD%20BURN%20(Official%20Lyric%20Video)%20(1).mp3",
  },
  {
    name: "Blacklite District: Back Into Darkness",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/Blacklite%20District%20-%20Back%20into%20Darkness%20(2).mp3",
  },
  {
    name: "Wiv: Try Harder (No lyrics)",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/try%20harder.mp3",
  },
  {
    name: "2hollis: Poster Boy",
    url: "https://github.com/cx0-peo/songs/raw/refs/heads/main/2hollis%20-%20poster%20boy%20(official%20audio).mp3",
  },
  {
    name: "Atba' al namrood",
    url: "https://github.com/Phalynxi/moosic/raw/refs/heads/main/Al-Namrood%20-%20Atba'a%20Al-Namrood_%D8%A3%D8%AA%D8%A8%D8%A7%D8%B9%20%D8%A7%D9%84%D9%86%D9%85%D8%B1%D9%88%D8%AF%20%5BgtOYL4cqg2A%5D.mp3",
  },
  {
    name: "Metallica: Master of Puppets",
    url: "https://www.youtube.com/watch?v=uRyAIyq53FY",
  },
  {
    name: "Disturbed: Down with the Sickness",
    url: "https://www.youtube.com/watch?v=09LTT0xwdfw",
  },
  {
    name: "Avenged Sevenfold: Nightmare",
    url: "https://www.youtube.com/watch?v=94bGzWyHbu0",
  },
  {
    name: "Avenged Sevenfold: So Far Away",
    url: "https://www.youtube.com/watch?v=A7ry4cx6HfY",
  },
];

const audios = musicTracks.map(() => null);

let musicMenuOpen = false;
let currentAudio = null;
let currentTrackIndex = 0;
let ytApiReady = false;
let ytApiLoading = false;
let ytPlayer = null;
let ytAudio = null;
let ytTick = 0;
let autoChatLyrics = false;
const musicLyrics = {};
let musicDrag = { active: false, dx: 0, dy: 0 };
let musicStatusEl = null;
let lyricRaf = 0;
let lyricState = null;
let musicTimeEl = null;
let musicDurEl = null;
let musicSeekEl = null;
let musicScrub = false;

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
  if (ytApiLoading) return;
  ytApiLoading = true;
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytApiLoading = false;
    if (typeof prev === "function") prev();
    cb();
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
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
    holder.style.width = "1px";
    holder.style.height = "1px";
    holder.style.opacity = "0";
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
    ytPlayer.loadVideoById(videoId);
    if (typeof onReady === "function") onReady();
    return;
  }
  ytPlayer = new YT.Player(holderId, {
    height: "1",
    width: "1",
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
    },
    events: {
      onReady: () => {
        if (typeof onReady === "function") onReady();
      },
      onStateChange: (ev) => {
        if (currentAudio !== ytAudio) return;
        if (ev.data === YT.PlayerState.PLAYING) {
          setMusicStatus("");
          queueLyrics(currentTrackIndex || 0);
        } else if (ev.data === YT.PlayerState.ENDED) {
          stopMusic();
        } else if (ev.data === YT.PlayerState.BUFFERING) {
          setMusicStatus("Buffering...");
        }
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

function addLyrics(index, lines) {
  if (!Array.isArray(lines)) return;
  musicLyrics[index] = lines.filter(
    (l) => l && typeof l.chat === "string" && typeof l.delay === "number",
  );
}

function addLyricsList(index, lines) {
  if (!Array.isArray(lines)) return;
  const mapped = lines
    .filter((l) => Array.isArray(l) && typeof l[0] === "number")
    .map((l) => ({ delay: l[0], chat: String(l[1] ?? "") }));
  mapped.sort((a, b) => a.delay - b.delay);
  if (mapped.length) addLyrics(index, mapped);
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

function setLyricsFromLrc(index, lrcText) {
  const lines = parseLrc(lrcText);
  if (!lines.length) return false;
  addLyrics(index, lines);
  setStore(`musicLrc:${index}`, lrcText);
  return true;
}

setLyricsFromLrc(
  0,
  `
  [00:18.326]What does it mean to be
  [00:19.226]  happy?

  [00:20.996]'Cause it looks like we all
  [00:21.896]  don't know

  [00:23.802]Glass half full or empty

  [00:26.635]Man, we're just putting on
  [00:27.535]  a show

  [00:29.643]Try to look to the heavens

  [00:32.009]To tell us things that we
  [00:32.909]  beg to know

  [00:35.134]Like "what did this all
  [00:36.034]  mean, if there's no
  [00:36.934]  tomorrow"

  [00:40.167]Oh, you know I tried to
  [00:41.067]  find a purpose in my life

  [00:46.490]To drive me, to guard me

  [00:48.602]Oh doctor, I feel dead
  [00:49.402]  inside

  [01:11.346]To drive me, to guard me

  [01:13.929]Oh doctor, I feel dead
  [01:14.729]  ins-

  [01:54.292]Try to look to the heavens

  [01:56.913]To tell us things that we
  [00:57.813]  beg to know

  [02:00.234]Like "what did this all
  [02:01.134]  mean, if there's no
  [02:02.034]  tomorrow"

  [02:16.160]Oh, you know I tried to
  [02:17.060]  find a purpose in my life

  [02:21.950]To drive me, to guard me

  [02:24.217]Oh doctor, I feel dead
  [02:25.017]  inside
`,
);

setLyricsFromLrc(
  17,
  `
[00:00.00] Twisted minds do not believe in words
[00:07.25] Shattered souls suffer from a limited view
[00:14.50] Death is coming and bridge of failure faded
[00:21.75] It has no end, the results of war and blood
[00:29.00] He has sold his soul for power and governance
[00:36.25] Where is the Exit?
[00:43.50] But the fear of death does not hide your destiny
`,
);

setLyricsFromLrc(
  18,
  `
[01:00.80]End of passion play,
[01:01.60]crumbling away
[01:05.00]I’m your source of
[01:06.00]self-destruction

[01:09.20]Veins that pump with fear,
[01:10.00]sucking darkest clear
[01:13.60]Leading on your death’s
[01:14.60]construction

[01:17.80]Taste me you will see

[01:20.10]More is all you need
[01:22.10]You’re dedicated to

[01:24.30]How I’m killing you

[01:30.40]Come crawling faster

[01:35.20]Obey your master

[01:39.80]Your life burns faster

[01:44.30]Obey your master
[01:46.90]Master

[01:48.10]Master of puppets
[01:48.90]I’m pulling your strings
[01:51.10]Twisting your mind
[01:51.90]and smashing your dreams
[01:55.00]Blinded by me,
[01:55.80]you can’t see a thing
[01:58.70]Just call my name,
[01:59.50]’cause I’ll hear you scream

[02:02.00]Master
[02:03.10]Master
[02:04.20]Just call my name,
[02:05.00]’cause I’ll hear you scream

[02:08.10]Master
[02:09.30]Master

[02:20.70]Needlework the way,
[02:21.50]never you betray
[02:24.90]Life of death becoming
[02:25.90]clearer

[02:29.30]Pain monopoly,
[02:30.10]ritual misery
[02:33.40]Chop your breakfast on a
[02:34.40]mirror

[02:37.70]Taste me you will see

[02:40.00]More is all you need
[02:41.90]You’re dedicated to
[02:44.20]How I’m killing you

[02:50.40]Come crawling faster

[02:55.10]Obey your master

[02:59.80]Your life burns faster

[03:04.50]Obey your master
[03:07.00]Master

[03:08.10]Master of puppets
[03:08.90]I’m pulling your strings
[03:12.10]Twisting your mind
[03:12.90]and smashing your dreams
[03:16.10]Blinded by me,
[03:16.90]you can’t see a thing
[03:18.90]Just call my name,
[03:19.70]’cause I’ll hear you scream

[03:22.40]Master
[03:23.40]Master
[03:24.60]Just call my name,
[03:25.40]’cause I’ll hear you scream

[03:28.50]Master
[03:29.70]Master
[03:31.10]Master, master

[05:20.10]Master
[05:21.20]Master
[05:22.30]Where’s the dreams
[05:23.10]that I’ve been after?
[05:24.80]Master, master
[05:26.90]You promised only lies
[05:29.20]Laughter, laughter
[05:30.00]All I hear or see
[05:30.80]is laughter
[05:33.90]Laughter, laughter
[05:36.10]Laughing at my cries

[05:41.80]Fix me

[06:49.00]Hell is worth all that,
[06:49.80]natural habitat
[06:53.20]Just a rhyme
[06:54.00]without a reason

[06:57.40]Never-ending maze,
[06:58.20]drift on numbered days
[07:01.70]Now your life
[07:02.50]is out of season

[07:05.90]I will occupy

[07:08.10]I will help you die
[07:10.20]I will run through you

[07:12.40]Now I rule you too

[07:18.60]Come crawling faster

[07:23.10]Obey your master

[07:27.60]Your life burns faster

[07:32.20]Obey your master
[07:34.60]Master

[07:35.70]Master of puppets
[07:36.50]I’m pulling your strings
[07:39.80]Twisting your mind
[07:40.60]and smashing your dreams
[07:43.70]Blinded by me,
[07:44.50]you can’t see a thing
[07:46.50]Just call my name,
[07:47.30]’cause I’ll hear you scream

[07:49.80]Master
[07:51.00]Master
[07:52.10]Just call my name,
[07:52.90]’cause I’ll hear you scream

[07:55.90]Master
[07:57.10]Master
`,
);

setLyricsFromLrc(
  19,
  `
[00:04.50]Can you feel that?
[00:09.80]Ah, shit
[00:20.70]Oh, ah, ah, ah, ah
[00:31.30]Oh, ah, ah, ah, ah
[00:34.20]oh, oh, oh, oh, oh, oh
[00:42.90]Drowning deep in my sea
[00:43.90]of loathing
[00:48.30]Broken your servant I kneel
[00:52.60](Will you give in to me?)
[00:53.90]It seems what's left of
[00:54.90]my human side
[00:58.10]Is slowly changing in me
[01:03.40](Will you give in to me?)
[01:04.70]Looking at my own reflection
[01:08.10]When suddenly it changes
[01:11.00]Violently it changes (oh no)
[01:15.00]There is no turning back now
[01:18.70]You've woken up the
[01:19.70]demon in me
[01:25.90]Get up, come on get down
[01:26.90]with the sickness
[01:28.60]Get up, come on get down
[01:29.60]with the sickness
[01:31.30]Get up, come on get down
[01:32.30]with the sickness
[01:33.70]Open up your hate, and
[01:34.70]let it flow into me
[01:36.60]Get up, come on get down
[01:37.60]with the sickness
[01:39.00]You mother get up come on
[01:40.00]get down with the sickness
[01:41.70]You fucker get up come on
[01:42.70]get down with the sickness
[01:44.50]Madness is the gift, that
[01:45.50]has been given to me
[01:52.40]I can see inside you,
[01:53.40]the sickness is rising
[01:57.40]Don't try to deny what
[01:58.40]you feel
[02:02.00](Will you give in to me?)
[02:03.30]It seems that all that
[02:04.30]was good has died
[02:07.50]And is decaying in me
[02:12.80](Will you give in to me?)
[02:14.00]It seems you're having
[02:15.00]some trouble
[02:17.30]In dealing with these
[02:18.30]changes
[02:20.20]Living with these
[02:21.20]changes (oh no)
[02:24.20]The world is a scary place
[02:27.40]Now that you've woken up
[02:28.40]the demon in me
[02:35.40]Get up, come on get down
[02:36.40]with the sickness
[02:37.90]Get up, come on get down
[02:38.90]with the sickness
[02:40.60]Get up, come on get down
[02:41.60]with the sickness
[02:43.10]Open up your hate, and
[02:44.10]let it flow into me
[02:45.90]Get up, come on get down
[02:46.90]with the sickness
[02:48.20]You mother get up come on
[02:49.20]get down with the sickness
[02:51.00]You fucker get up come on
[02:52.00]get down with the sickness
[02:53.70]Madness is the gift, that
[02:54.70]has been given to me
[03:00.60](And when I dream)
[03:06.00](And when I dream)
[03:11.50]Oh, ah, ah, ah, ah
[03:12.70]Get up, come on get down
[03:13.70]with the sickness
[03:15.40]Get up, come on get down
[03:16.40]with the sickness
[03:18.00]Get up, come on get down
[03:19.00]with the sickness
[03:20.60]Open up your hate, and
[03:21.60]let it flow into me
[03:23.30]Get up, come on get down
[03:24.30]with the sickness
[03:25.60]You mother get up come on
[03:26.60]get down with the sickness
[03:28.40]You fucker get up come on
[03:29.40]get down with the sickness
[03:31.20]Madness has now come
[03:32.20]over me
`,
);

setLyricsFromLrc(
  20,
  `
[1:01.10]Nightmare!
[1:04.93](Now your nightmare comes
[1:05.93]to life)

[1:10.21]Dragged you down below
[1:11.90]Down to the devil's show
[1:13.68]To be his guest forever
[1:15.49]Peace of mind is less than
[1:16.49]never
[1:17.75]Hate to twist your mind
[1:19.43]But God ain't on your side
[1:21.19]An old acquaintance severed
[1:22.94]Burn the world, your last
[1:23.94]endeavor
[1:24.98]Flesh is burning, you can
[1:25.98]smell it in the air
[1:27.73]'Cause men like you have
[1:28.73]such an easy soul to steal
[1:32.16]So stand in line while they
[1:33.16]ink numbers in your head
[1:35.11]You're now a slave until
[1:36.11]the end of time here
[1:37.70]Nothing stops the madness
[1:38.70]turning, yearning
[1:40.41]Pull the trigger

[1:41.67]You should have known the
[1:42.67]price of evil
[1:48.90]And it hurts to know that
[1:49.90]you belong here, yeah
[1:55.88]Ooh, it's your fuckin'
[1:56.88]nightmare
[2:02.70](While your nightmare comes
[2:03.70]to life)

[2:07.39]Can't wake up in sweat
[2:09.15]'Cause it ain't over yet
[2:10.75]Still dancing with your
[2:11.75]demons
[2:12.66]Victim of your own creation
[2:14.77]Beyond the will to fight
[2:16.38]Where all that's wrong is
[2:17.38]right
[2:18.54]Where hate don't need a
[2:19.54]reason
[2:20.13]Loathing self-assassination
[2:22.43]You've been lied to just
[2:23.43]to rape you of your sight
[2:25.10]And now they have the nerve
[2:26.10]to tell you how to feel
[2:29.45]So sedated as they
[2:30.45]medicate your brain
[2:32.38]And while you slowly go
[2:33.38]insane, they tell you
[2:34.79]Given with the best
[2:35.79]intentions
[2:36.72]Help you with your
[2:37.72]complications"

[2:39.14]You should have known the
[2:40.14]price of evil
[2:46.30]And it hurts to know that
[2:47.30]you belong here, yeah
[2:53.65]No one to call, everybody
[2:54.65]to fear
[3:00.84]Your tragic fate is
[3:01.84]looking so clear, yeah
[3:08.11]Ooh, it's your fuckin'
[3:09.11]nightmare

[4:08.89]Fight (fight)
[4:10.40]Not to fail (fail)
[4:11.84]Not to fall (fall)
[4:13.68]Or you'll end up like the
[4:14.68]others
[4:16.25]Die (die)
[4:17.62]Die again (die)
[4:19.34]Drenched in sin (sin)
[4:21.22]With no respect for another

[4:34.74]Down (down)
[4:35.99]Feel the fire (fire)
[4:37.85]Feel the hate (hate)
[4:39.46]Your pain is what we
[4:40.46]desire
[4:42.14]Lost (lost)
[4:43.36]Hit the wall (wall)
[4:45.17]Watch you crawl (crawl)
[4:46.95]Such a replaceable liar

[4:50.99]And I know you hear their
[4:51.99]voices
[4:55.40](Calling from above)
[4:58.35]And I know they may seem
[4:59.35]real
[5:03.70](These signals of love)
[5:05.47]But our life's made up of
[5:06.47]choices
[5:10.20](Some without appeal)
[5:12.27]They took for granted,
[5:13.27]your soul
[5:16.62]And it's ours now to steal
[5:21.35](As your nightmare comes
[5:22.35]to life)

[5:27.40]You should have known the
[5:28.40]price of evil
[5:34.10]And it hurts to know that
[5:35.10]you belong here, yeah
[5:41.73]No one to call, everybody
[5:42.73]to fear
[5:48.84]Your tragic fate is
[5:49.84]looking so clear, yeah
[5:56.10]Ooh, it's your fuckin'
[5:57.10]nightmare
`,
);

setLyricsFromLrc(
  21,
  `
[00:01.80]Never feared for anything,
[00:02.80]never chained but never free
[00:07.70]I tried to heal the broken
[00:08.70]love with all I could
[00:13.80]Lived a life so endlessly
[00:14.80]saw beyond what others see
[00:20.20]I tried to heal the broken
[00:21.20]love with all I could
[00:26.60]Will you stay
[00:29.60]Will you stay away forever
[00:33.10]How do I live without the
[00:34.10]ones I love?
[00:39.00]Time still turns the pages
[00:40.00]of the book its burned
[00:45.40]Place and time always on my
[00:46.40]mind
[00:51.40]I have so much to say but
[00:52.40]you're so far away
[00:58.80]Plans of what our futures
[00:59.80]hold
[01:01.50]Foolish lies of growing old
[01:04.40]It seems we're so
[01:05.40]invincible
[01:07.10]The truth is so cold
[01:11.00]A final song, a last request
[01:13.80]A perfect chapter laid to
[01:14.80]rest
[01:16.90]Now and then I try to find
[01:17.90]a place in my mind
[01:23.40]Where you can stay you can
[01:24.40]stay awake forever
[01:29.90]How do I live without the
[01:30.90]ones I love?
[01:35.70]Time still turns the pages
[01:36.70]of the book its burned
[01:42.20]Place and time always on my
[01:43.20]mind
[01:48.20]I have so much to say but
[01:49.20]you're so far away
[01:54.90]Sleep tight, I'm not afraid
[02:01.00]The ones that we love are
[02:02.00]here with me
[02:07.50]Lay away a place for me
[02:08.50]'cause as soon as I'm done
[02:15.90]I'll be on my way to live
[02:16.90]eternally
[02:52.20]How do I live without the
[02:53.20]ones I love?
[02:57.80]Time still turns the pages
[02:58.80]of the book its burned
[03:04.60]Place and time always on my
[03:05.60]mind
[03:10.20]And the light you left
[03:11.20]remains but it's so hard to stay
[03:16.70]When I have so much to say
[03:17.70]and you're so far away
[04:28.70]I love you, you were ready
[04:31.80]The pain is strong and
[04:32.80]urges rise
[04:41.90]But I'll see you when He
[04:42.90]lets me
[04:44.90]Your pain is gone, your
[04:45.90]hands are tied
[04:54.20]So far away and I need you
[04:55.20]to know
[05:07.10]So far away and I need you
[05:08.10]to need you to know
`,
);

addLyricsList(1, [
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
]);

addLyricsList(2, [
  [20957, `And all I am is a man`],
  [24559, `I want the world in my hands`],
  [28200, `I hate the beach`],
  [30535, `But I stand in California`],
  [33901, `with my toes in the sand`],
  [36100, `Use the sleeves of my sweater`],
  [38119, `Let's have an adventure`],
  [40288, `Head in the clouds`],
  [41600, `but my gravity centered`],
  [44140, `Touch my neck`],
  [45844, `and I'll touch yours`],
  [47931, `You in those little`],
  [49358, `high waisted shorts, oh`],
  [52969, `She knows what I think about`],
  [55400, `And what I think about`],
  [56800, `One love, two mouths`],
  [58913, `One love, one house`],
  [60607, `No shirt, no blouse`],
  [62627, `Just us, you find out`],
  [64384, `Nothing that I wouldn't wanna`],
  [65400, `tell you about, no`],
  [67000, `'Cause it's too cold`],
  [71187, `For you here`],
  [73917, `And now, so let me hold`],
  [78878, `Both your hands in`],
  [81500, `the holes of my sweater`],
  [83666, `And if I may just take`],
  [84600, `your breath away`],
  [85633, `I don't mind if there's`],
  [86521, `not much to say`],
  [87546, `Sometimes the silence`],
  [88333, `guides a mind`],
  [89468, `To move to a place so far away`],
  [91969, `The goosebumps start to raise`],
  [93402, `The minute that my left hand`],
  [94222, `meets your waist`],
  [95900, `And then I watch your face`],
  [97300, `Put my finger on your tongue`],
  [98100, `'cause you love to taste, yeah`],
  [100053, `These hearts adore, everyone`],
  [101600, `the other beats hardest for`],
  [103200, `Inside this place is warm`],
  [105200, `Outside it starts to pour`],
  [107945, `Coming down`],
  [109001, `One love, two mouths`],
  [111128, `One love, one house`],
  [112974, `No shirt, no blouse`],
  [114827, `Just us, you find out`],
  [116573, `Nothing that I wouldn't wanna`],
  [117363, `tell you about, no, no, no`],
  [121456, `'Cause it's too cold`],
  [125367, `For you here`],
  [128136, `And now, so let me hold`],
  [133068, `Both your hands in`],
  [135730, `the holes of my sweater`],
  [137000, `'Cause it's too cold`],
  [141000, `For you here`],
  [143643, `And now, so let me hold`],
  [148544, `Both your hands in`],
  [151275, `the holes of my sweater`],
  [153503, `Whoa, whoa, whoa`],
  [166200, `Whoa, whoa, whoa`],
  [173900, `Whoa, whoa, whoa`],
  [181651, `Whoa, whoa, whoa`],
  [189360, `Whoa, whoa, whoa`],
  [197069, `Whoa, whoa, whoa`],
  [202500, `'Cause it's too cold`],
  [206658, `For you here`],
  [209372, `And now, so let me hold`],
  [214380, `Both your hands in`],
  [217034, `the holes of my sweater`],
  [218300, `It's too cold`],
  [222133, `For you here`],
  [224871, `And now, let me hold`],
  [229934, `Both your hands in`],
  [232466, `the holes of my sweater`],
  [235598, `And it's too cold,`],
  [237606, `it's too cold`],
  [240600, `The holes of my sweater`],
]);

addLyricsList(3, [
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
]);

addLyricsList(4, [
  [30600, `I do the same`],
  [31500, `thing I told you that`],
  [32399, `I never would`],
  [33325, `I told you I'd change,`],
  [34347, `even when I knew I never could`],
  [36018, `I know that I can't`],
  [37133, `find nobody else as good as u`],
  [38797, `I need you to stay,`],
  [39822, `need you to stay, hey (oh)`],
  [42100, `I get drunk,`],
  [42869, `wake up,`],
  [43755, `I'm wasted still`],
  [44922, `I realize the time`],
  [46235, `that I wasted here`],
  [47700, `I feel like`],
  [48511, `you can't feel the way I feel`],
  [50479, `Oh, I'll be Fucked up`],
  [51699, `if you can't be right here`],
  [53128, `Oh, ooh-woah`],
  [54500, `(oh, ooh-woah, ooh-woah)`],
  [55948, `Oh, ooh-woah`],
  [57416, `(oh, ooh-woah, ooh-woah)`],
  [58774, `Oh, ooh-woah`],
  [59900, `(oh, ooh-woah, ooh-woah)`],
  [61387, `Oh, I'll be Fucked up`],
  [62959, `if you can't be right here`],
  [64384, `I do the same`],
  [65500, `thing I told you that`],
  [66141, `I never would`],
  [67188, `I told you I'd change,`],
  [68218, `even when I knew I never could`],
  [69909, `I know that I can't`],
  [70925, `find nobody else as good as u`],
  [72730, `I need you to stay,`],
  [73869, `need you to stay, hey`],
  [75800, `I do the same`],
  [76800, `thing I told you that`],
  [77600, `I never would`],
  [78467, `I told you I'd change,`],
  [79539, `even when I knew I never could`],
  [81217, `I know that I can't`],
  [82353, `find nobody else as good as u`],
  [84004, `I need you to stay,`],
  [85260, `need you to stay, hey`],
  [87106, `When I'm away from you,`],
  [88438, `I miss your touch (ooh)`],
  [90057, `You're the reason`],
  [90762, `I believe in love`],
  [92876, `It's been difficult`],
  [93817, `for me to trust (ooh)`],
  [95653, `And I'm afraid that`],
  [96320, `I'ma Fuck it up`],
  [98560, `Ain't no way`],
  [99133, `that I can leave you stranded`],
  [101364, `'Cause you ain't ever`],
  [102100, `left me empty-handed`],
  [104129, `And you know that I know that`],
  [105810, `I can't live without you`],
  [107823, `So, baby, stay`],
  [109657, `Oh, ooh-woah`],
  [111013, `(oh, ooh-woah, ooh-woah)`],
  [112382, `Oh, ooh-woah`],
  [113799, `(oh, ooh-woah, ooh-woah)`],
  [115300, `Oh, ooh-woah`],
  [116585, `(oh, ooh-woah, ooh-woah)`],
  [117900, `I'll be Fucked up`],
  [119500, `if you can't be right here`],
  [120900, `I do the same`],
  [121900, `thing I told you that`],
  [122800, `I never would`],
  [123535, `I told you I'd change,`],
  [124625, `even when I knew I never could`],
  [126351, `I know that I can't`],
  [127624, `find nobody else as good as u`],
  [129142, `I need you to stay,`],
  [130318, `need you to stay, hey`],
  [132319, `I do the same`],
  [133150, `thing I told you that`],
  [134000, `I never would`],
  [134775, `I told you I'd change,`],
  [135978, `even when I knew I never could`],
  [137614, `I know that I can't`],
  [138753, `find nobody else as good as u`],
  [140407, `I need you to stay,`],
  [141500, `need you to stay, hey`],
  [148700, `Woah-oh`],
  [151991, `I need you to stay,`],
  [152856, `need you to stay, hey`],
]);

addLyricsList(5, [
  [13769, `Yeah`],
  [27492, `I've been tryna call`],
  [30043, `I've been on my own`],
  [31269, `for long enough`],
  [32800, `Maybe you can show me`],
  [34169, `how to love, maybe`],
  [38547, `I'm goin' through withdrawals`],
  [41241, `You don't even have`],
  [42242, `to do too much`],
  [44119, `You can turn me on`],
  [45082, `with just a touch, baby`],
  [49691, `I look around and`],
  [50693, `Sin City's cold and empty`],
  [53121, `(oh)`],
  [53705, `No one's around to judge me`],
  [55880, `(oh)`],
  [56304, `I can't see clearly`],
  [57923, `when you're gone`],
  [60842, `I said, ooh,`],
  [63645, `I'm blinded by the lights`],
  [66841, `No, I can't sleep until`],
  [68631, `I feel your touch`],
  [72172, `I said, ooh,`],
  [75230, `I'm drowning in the night`],
  [78004, `Oh, when I'm like this,`],
  [79852, `you're the one I trust`],
  [82123, `(Hey, hey, hey)`],
  [94469, `I'm running out of time`],
  [97366, `'Cause I can see the`],
  [98220, `sun light up the sky`],
  [100225, `So I hit the road`],
  [101202, `in overdrive, baby, oh`],
  [107000, `The city's cold and empty`],
  [109269, `(oh)`],
  [109807, `No one's around to judge me`],
  [111900, `(oh)`],
  [112512, `I can't see clearly`],
  [114015, `when you're gone`],
  [117000, `I said, ooh,`],
  [120076, `I'm blinded by the lights`],
  [122981, `No, I can't sleep until`],
  [124924, `I feel your touch`],
  [128169, `I said, ooh,`],
  [131200, `I'm drowning in the night`],
  [134146, `Oh, when I'm like this,`],
  [136011, `you're the one I trust`],
  [139600, `I'm just walking by to`],
  [140696, `let you know`],
  [141769, `(by to let you know)`],
  [142300, `I could never say it`],
  [143354, `on the phone`],
  [144489, `(say it on the phone)`],
  [145500, `Will never let you`],
  [147000, `go this time`],
  [150014, `(ooh)`],
  [150696, `I said, ooh,`],
  [153888, `I'm blinded by the lights`],
  [156600, `No, I can't sleep until`],
  [158606, `I feel your touch`],
  [161000, `(Hey, hey, hey)`],
  [172000, `(Hey, hey, hey)`],
  [184369, `I said, ooh,`],
  [187500, `I'm blinded by the lights`],
  [190269, `No, I can't sleep until`],
  [192304, `I feel your touch`],
]);

addLyricsList(6, [
  [1250, `I just need someone in my life`],
  [3969, `to give it structure`],
  [7200, `To handle all the selfish ways`],
  [9369, `I'd spend my time without her`],
  [13600, `You're everything I want,`],
  [14953, `but I can't deal`],
  [16533, `with all your lovers`],
  [20151, `You're saying I'm the one,`],
  [21507, `but it's your actions`],
  [23234, `that speak louder`],
  [26700, `Giving me love when you are`],
  [28854, `down and need another`],
  [32722, `I've gotta get away an`],
  [34300, `let you go, Ive gotta get over`],
  [38915, `But I love you so`],
  [42756, `(ooh-ooh-ooh)`],
  [45312, `I love you so (ooh-ooh-ooh)`],
  [51631, `I love you so (ooh-ooh-ooh)`],
  [57929, `I love you so`],
  [62500, `I'm gonna pack my things`],
  [65933, `and leave you behind`],
  [68850, `This feeling's old,`],
  [70642, `and I know that`],
  [72567, `I've made up my mind`],
  [75079, `I hope you feel what I felt`],
  [78529, `when you shattered my soul`],
  [81332, `'Cause you were cruel,`],
  [83000, `and I'm a fool,`],
  [85000, `so please, let me go`],
  [89569, `But I love you so`],
  [92745, `(please, let me go)`],
  [95978, `I love you so`],
  [99107, `(please, let me go)`],
  [102223, `I love you so`],
  [106295, `(please, let me go)`],
  [108659, `I love you so`],
  [118169, `Ooh-ooh-ooh`],
  [124500, `Ooh-ooh-ooh-ooh`],
  [130696, `Ooh-ooh-ooh`],
  [137195, `Ooh-ooh-ooh-ooh`],
]);

addLyricsList(7, [
  [4200, `When you gonna stop`],
  [5770, `breaking my heart?`],
  [11700, `I don't wanna be another one`],
  [19300, `Paying for the`],
  [20400, `things I never done`],
  [25969, `Don't let go,`],
  [27573, `don't let go to my love`],
  [49300, `I think I found the one`],
  [51007, `that'll hold my heart`],
  [56869, `I wanna feel your heart,`],
  [58686, `we're in love tonight`],
  [60500, `I can fix all those lies`],
  [62860, `Oh baby, baby, I run,`],
  [64568, `but I'm running to you`],
  [66696, `You won't see me cry,`],
  [68569, `I'm hiding inside`],
  [70373, `My heart is in pain,`],
  [72111, `but I'm smiling for you`],
  [76000, `Can I get to your soul?`],
  [77777, `Can you get to my flow?`],
  [79696, `Can we promise we wont let go?`],
  [83500, `All the things that I need,`],
  [85469, `all the things that you need`],
  [87168, `You can make it feel so real`],
  [91022, `'Cause you can't deny,`],
  [92708, `you've blown my mind`],
  [94637, `When I touch your body,`],
  [96430, `I feel I'm losing control`],
  [98358, `'Cause you can't deny,`],
  [100096, `you've blown my mind`],
  [102162, `When I see you baby,`],
  [103906, `I just don't wanna let go`],
  [106752, `(Oohh)`],
  [109942, `When you gonna stop`],
  [111609, `breaking my heart?`],
  [117469, `I don't wanna be another one`],
  [139966, `I think I found the one`],
  [141800, `that'll hold my heart`],
  [147606, `I wanna feel your heart,`],
  [149379, `we're in love tonight`],
  [151169, `I can fix all those lies`],
  [153526, `Oh baby, baby, I run,`],
  [155288, `but I'm running to you`],
  [157479, `You won't see me cry,`],
  [159310, `I'm hiding inside`],
  [161190, `My heart is in pain,`],
  [162868, `but I'm smiling for you`],
  [165000, `Oh baby, I'll try`],
  [166755, `to make the things right`],
  [168688, `I need you more than air`],
  [170305, `when I'm not with you`],
  [172653, `Please don't ask me why,`],
  [174385, `just kiss me this time`],
  [176300, `My only dream`],
  [178000, `is about you and I`],
]);

addLyricsList(8, [
  [19318, `Your morning eyes,`],
  [21690, `I could stare`],
  [22958, `like watching stars`],
  [26200, `I could walk you by,`],
  [29696, `and Ill tell without a thought`],
  [32416, `You'd be mine,`],
  [34571, `would you mind`],
  [36518, `if I took your hand tonight?`],
  [40574, `Know you're all`],
  [41864, `that I want this life`],
  [48134, `I'll imagine we fell in love`],
  [50879, `I'll nap under`],
  [51726, `moonlight skies with you`],
  [54768, `I think I'll picture us,`],
  [56408, `you with the waves`],
  [58250, `The ocean's colors`],
  [60042, `on your face`],
  [61898, `I'll leave my heart`],
  [63676, `with your air`],
  [66316, `So let me fly with you`],
  [69469, `Will you be forever with me?`],
  [107151, `My love will always`],
  [109128, `stay by you`],
  [112900, `I'll keep it safe,`],
  [115200, `so don't you worry a thing`],
  [117969, `I'll tell you I love you more`],
  [121831, `It's stuck with you forever,`],
  [125319, `so promise you won't let it go`],
  [128498, `I'll trust the universe`],
  [130962, `will always bring me to you`],
  [136721, `I'll imagine we fell in love`],
  [139397, `I'll nap under`],
  [140288, `moonlight skies with you`],
  [143052, `I think I'll picture us,`],
  [145012, `you with the waves`],
  [146847, `The ocean's colors`],
  [148625, `on your face`],
  [150609, `I'll leave my heart`],
  [152350, `with your air`],
  [154900, `So let me fly with you`],
  [158400, `Will you be forever with me?`],
]);

addLyricsList(9, [
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
]);

addLyricsList(10, [
  [100, `Don't stay awake for too long`],
  [3191, `Don't go to bed`],
  [5514, `I'll make a cup of coffee`],
  [7158, `for your head`],
  [8867, `I'll get you up and going`],
  [10537, `out of bed`],
  [12069, `Yeah, I dont wanna fall asleep`],
  [14395, `I don't wanna pass away`],
  [16132, `I've been thinking`],
  [16964, `of our future`],
  [17819, `Cause Ill never see those days`],
  [19581, `I don't know why`],
  [20300, `this has happened,`],
  [21169, `but I probably deserve it`],
  [22700, `I tried to do my best,`],
  [24216, `but you know that`],
  [25214, `I'm not perfect`],
  [26354, `I've been praying`],
  [27097, `for forgiveness,`],
  [27931, `you've been praying`],
  [28628, `for my health`],
  [29500, `When I leave this earth,`],
  [30829, `hoping youll find someone else`],
  [32706, `Cause, yeah, were still young,`],
  [34232, `theres so much we haven't done`],
  [36175, `Getting married,`],
  [36843, `start a family,`],
  [37767, `watch your husband`],
  [38491, `with his son`],
  [39544, `I wish it could be me,`],
  [41012, `but I wont make it of this bed`],
  [42648, `I hope I go to heaven,`],
  [44284, `so I see you once again`],
  [46446, `My life was kindda short,`],
  [47660, `but I got so many blessings`],
  [49825, `Happy you were mine,`],
  [50969, `it sucks that it's all ending`],
  [53399, `Don't stay awake for too long`],
  [56507, `Don't go to bed`],
  [58893, `I'll make a cup of coffee`],
  [60529, `for your head`],
  [62299, `I'll get you up and going`],
  [63875, `out of bed, yeah`],
  [65864, `And I,`],
  [66474, `don't stay awake for too long`],
  [69795, `Don't go to bed`],
  [72103, `I'll make a cup of coffee`],
  [73890, `for your head`],
  [75499, `I'll get you up and going`],
  [77154, `out of bed`],
  [78552, `Yeah, I'm happy that`],
  [80279, `you're here with me`],
  [81416, `I'm sorry if I tear up`],
  [83000, `When me and you were younger,`],
  [84263, `you would always`],
  [85100, `make me cheer up`],
  [86359, `Taking goofy videos while`],
  [87889, `walking through the park`],
  [89320, `You would jump into my arms`],
  [90772, `every time you heard a bark`],
  [93127, `Cuddle in your sheets,`],
  [94430, `sang me sound asleep`],
  [96396, `And sneak out through`],
  [97304, `your kitchen at exactly 1:03`],
  [99767, `Sundays went to church,`],
  [101567, `on Mondays watched a movie`],
  [103081, `Soon you'll be alone,`],
  [104556, `sorry that you have to lose me`],
  [106457, `Don't stay awake for too long`],
  [109810, `Don't go to bed`],
  [112102, `I'll make a cup of coffee`],
  [113983, `for your head`],
  [115647, `I'll get you up and going`],
  [117188, `out of bed`],
  [118721, `And I,`],
  [119877, `don't stay awake for too long`],
  [123213, `Don't go to bed`],
  [125613, `I'll make a cup of coffee`],
  [127141, `for your head`],
  [128934, `I'll get you up and going`],
  [130436, `out of bed`],
  [133392, `Don't stay awake for too long`],
  [136507, `Don't go to bed`],
  [138850, `I'll make a cup of coffee`],
  [140560, `for your head`],
  [142240, `I'll get you up and going`],
  [143810, `out of bed`],
  [145553, `And I,`],
  [146501, `don't stay awake for too long`],
  [149780, `Don't go to bed`],
  [152281, `I'll make a cup of coffee`],
  [154200, `for your head`],
  [155540, `I'll get you up and going`],
  [157185, `out of bed`],
  [158938, `And I,`],
  [159877, `don't stay awake for too long`],
  [163084, `Don't go to bed`],
  [165483, `I'll make a cup of coffee`],
  [167378, `for your head`],
  [168826, `I'll get you up and going`],
  [170323, `out of bed`],
]);

addLyricsList(11, [
  [9932, `The club isn't the`],
  [10541, `best place to find a lover`],
  [11993, `So the bar is where I go`],
  [14804, `Me and my friends at`],
  [15739, `the table doing shots`],
  [16766, `Drinking fast and then`],
  [17807, `we talk slow`],
  [19811, `Come over and start up`],
  [20705, `a conversation with just me`],
  [22328, `And trust me I'll`],
  [23023, `give it a chance now`],
  [24491, `Take my hand, stop,`],
  [25571, `put Van the Man on the jukebox`],
  [27131, `And then we start to dance,`],
  [28640, `and now I'm singing like`],
  [29671, `Girl, you know`],
  [30587, `I want your love`],
  [32163, `Your love was handmade`],
  [33297, `for somebody like me`],
  [35444, `Come on now, follow my lead`],
  [37227, `I may be crazy, don't mind me`],
  [39364, `Say, boy, let's`],
  [40271, `not talk too much`],
  [42178, `Grab on my waist`],
  [43064, `and put that body on me`],
  [45319, `Come on now, follow my lead`],
  [46864, `Come, come on now,`],
  [47705, `follow my lead`],
  [50638, `I'm in love with`],
  [51332, `the shape of you`],
  [53147, `We push and pull`],
  [53804, `like a magnet do`],
  [55774, `Although my heart`],
  [56427, `is falling too`],
  [58193, `I'm in love with your body`],
  [60855, `And last night you`],
  [61509, `were in my room`],
  [63160, `And now my bedsheets`],
  [63980, `smell like you`],
  [65010, `Every day discovering`],
  [66300, `something brand new`],
  [68273, `I'm in love with your body`],
  [69772, `(Oh-I-oh-I-oh-I-oh-I)`],
  [73218, `I'm in love with your body`],
  [74974, `(Oh-I-oh-I-oh-I-oh-I)`],
  [78230, `I'm in love with your body`],
  [79674, `(Oh-I-oh-I-oh-I-oh-I)`],
  [83028, `I'm in love with your body`],
  [84677, `Every day discovering`],
  [86248, `something brand new`],
  [88183, `I'm in love with`],
  [88814, `the shape of you`],
  [89967, `One week in we`],
  [90565, `let the story begin`],
  [91774, `We're going out`],
  [92392, `on our first date`],
  [94690, `You and me are thrifty,`],
  [95593, `so go all you can eat`],
  [96776, `Fill up your bag`],
  [97458, `and I fill up a plate`],
  [99660, `We talk for hours and hours`],
  [100463, `about the sweet and the sour`],
  [101779, `And how your family`],
  [102662, `is doing okay`],
  [104709, `And leave and get in a taxi,`],
  [105975, `then kiss in the backseat`],
  [106839, `Tell the driver make the`],
  [107909, `radio play, and`],
  [109024, `I'm singing like`],
  [109725, `Girl, you know`],
  [110586, `I want your love`],
  [112019, `Your love was handmade`],
  [113299, `for somebody like me`],
  [115514, `Come on now, follow my lead`],
  [117395, `I may be crazy, don't mind me`],
  [119499, `Say, boy, let's`],
  [120864, `not talk too much`],
  [122263, `Grab on my waist`],
  [123225, `and put that body on me`],
  [125389, `Come on now, follow my lead`],
  [126886, `Come, come on now,`],
  [127821, `follow my lead`],
  [130575, `I'm in love with`],
  [131312, `the shape of you`],
  [133136, `We push and pull`],
  [133753, `like a magnet do`],
  [135717, `Although my heart`],
  [136380, `is falling too`],
  [138181, `I'm in love with your body`],
  [140628, `And last night you`],
  [141395, `were in my room`],
  [143346, `And now my bedsheets`],
  [144070, `smell like you`],
  [145073, `Every day discovering`],
  [146211, `something brand new`],
  [148114, `I'm in love with your body`],
  [149872, `(Oh-I-oh-I-oh-I-oh-I)`],
  [153305, `I'm in love with your body`],
  [154800, `(Oh-I-oh-I-oh-I-oh-I)`],
  [158180, `I'm in love with your body`],
  [159848, `(Oh-I-oh-I-oh-I-oh-I)`],
  [163093, `I'm in love with your body`],
  [165173, `Every day discovering`],
  [166183, `something brand new`],
  [168162, `I'm in love with`],
  [168991, `the shape of you`],
  [170090, `Come on, be my baby,`],
  [171685, `come on`],
  [172656, `Come on, be my baby,`],
  [174142, `come on`],
  [175123, `Come on, be my baby`],
  [176592, `come on`],
  [177579, `Come on, be my baby,`],
  [179150, `come on`],
  [180284, `Come on, be my baby,`],
  [181486, `come on`],
  [182483, `Come on, be my baby,`],
  [184108, `come on`],
  [185069, `Come on, be my baby,`],
  [186558, `come on`],
  [187570, `Come on, be my baby,`],
  [189135, `come on`],
  [190619, `I'm in love with`],
  [191341, `the shape of you`],
  [193197, `We push and pull`],
  [193858, `like a magnet do`],
  [195714, `Although my heart`],
  [196391, `is falling too`],
  [198208, `I'm in love with your body`],
  [200686, `And last night you`],
  [201398, `were in my room`],
  [203141, `And now my bedsheets`],
  [204049, `smell like you`],
  [205060, `Every day discovering`],
  [206256, `something brand new`],
  [208147, `I'm in love with your body`],
  [210279, `Come on, be my baby,`],
  [211970, `come on`],
  [212900, `Come on`],
  [213513, `(I'm in love with your body),`],
  [213514, `be my baby, come on`],
  [215542, `Come on, be my baby, come on`],
  [216636, `Come on`],
  [218500, `(I'm in love with your body),`],
  [218501, `be my baby, come on`],
  [220481, `Come on, be my baby,`],
  [221900, `come on`],
  [222624, `Come on, be my baby,`],
  [223420, `(I'm in love with your body),`],
  [223421, `come on`],
  [225305, `Every day discovering`],
  [226240, `something brand new`],
  [228190, `I'm in love with`],
  [228817, `the shape of you`],
]);

addLyricsList(12, [
  [12570, `Let it go`],
  [13620, `You should wait and see`],
  [15620, `'Cause you never know`],
  [16840, `Where you're gonna be`],
  [18660, `You should take it slow`],
  [20270, `Let's not jump ahead`],
  [21790, `You could watch it grow`],
  [23680, `Instead of wishing dead`],
  [25000, `Let-let, let it go`],
  [26000, `You should wait and see`],
  [28000, `'Cause you never know`],
  [30000, `Where you're gonna be`],
  [31000, `You should take it slow`],
  [33000, `Let's not jump ahead`],
  [34800, `You could watch it grow`],
  [35900, `Instead of wishing dead`],
  [38420, `(Wishing, wishing dead)`],
  [41620, `(Wishing, wishing dead)`],
  [44280, `(Wishing, wishing dead)`],
  [49980, `I'm all about the darkness`],
  [51900, `Look at me, I'm heartless`],
  [53400, `I can't find the right`],
  [53405, `state of mind, state of mind`],
  [56560, `The vibe is very scary`],
  [57930, `Everything is heavy`],
  [59960, `I can't find the right`],
  [59965, `state of mind, state of mind`],
  [62820, `I can't do it by myself,`],
  [67000, `I Know`],
  [69150, `It Fucks with everybody else`],
  [73000, `I know, I know`],
  [76850, `Let it go`],
  [77780, `You should wait and see`],
  [79280, `'Cause you never know`],
  [80760, `Where you're gonna be`],
  [82670, `You should take it slow`],
  [84660, `Let's not jump ahead`],
  [85820, `You could watch it grow`],
  [87410, `Instead of wishing dead`],
  [89250, `Let-let, let it go`],
  [90240, `You should wait and see`],
  [93280, `'Cause you never know`],
  [95350, `Where you're gonna be`],
  [95190, `You should take it slow`],
  [96920, `Let's not jump ahead`],
  [98380, `You could watch it grow`],
  [100130, `Instead of wishing dead`],
  [102380, `(Wishing, wishing dead)`],
  [105350, `(Wishing, wishing dead)`],
  [108430, `(Wishing, wishing dead)`],
  [114070, `I know I'm gon' be let down`],
  [115870, `Fuckin' with my head now`],
  [117850, `I can't find the right`],
  [117855, `state of mind, state of mind`],
  [120760, `Don't come back around here`],
  [122160, `It gets dangerous down here`],
  [124050, `I can't find the right`],
  [124055, `state of mind, state of mind`],
  [127060, `I can't do it by myself,`],
  [130000, `I Know`],
  [134430, `It Fucks with everybody else`],
  [137000, `I know, I know`],
  [140790, `Let it go`],
  [142230, `You should wait and see`],
  [143450, `'Cause you never know`],
  [145040, `Where you're gonna be`],
  [147190, `You should take it slow`],
  [148440, `Let's not jump ahead`],
  [149820, `You could watch it grow`],
  [151440, `Instead of wishing dead`],
  [153320, `Let-let, let it go`],
  [153438, `You should wait and see`],
  [156370, `'Cause you never know`],
  [158020, `Where you're gonna be`],
  [159440, `You should take it slow`],
  [161120, `Let's not jump ahead`],
  [162610, `You could watch it grow`],
  [164130, `Instead of wishing dead`],
  [164621, `(Wishing, wishing dead)`],
  [169730, `(Wishing, wishing dead)`],
  [172470, `(Wishing, wishing dead)`],
]);

addLyricsList(13, [
  [5210, `Lost in the fog`],
  [8520, `I fear that there's still`],
  [8550, `Further to fall`],
  [13680, `It's dangerous 'cause`],
  [13710, `I want it all`],
  [19170, `And I don't think I care`],
  [19200, `What it costs`],
  [24270, `I shouldn't have fallen`],
  [24300, `In love`],
  [27170, `Look what it made me`],
  [27200, `Become`],
  [29500, `I let you get too close`],
  [31240, `Just to wake up alone`],
  [34340, `And I know you think you can`],
  [34370, `Run`],
  [37150, `You're scared to believe`],
  [37180, `I'm the one`],
  [40110, `But I just can't let you go`],
  [44960, `I'd let the world burn`],
  [47720, `Let the world burn for you`],
  [50640, `This is how it always had`],
  [50670, `To end`],
  [53260, `If I can't have you then`],
  [53290, `No one can`],
  [55910, `I'd let it burn`],
  [58400, `I'd let the world burn`],
  [60970, `Just to hear you calling`],
  [61000, `Out my name`],
  [63910, `Watching it all go down in`],
  [63940, `Flames`],
  [66960, `Fear in their eyes`],
  [70290, `Ash raining from the blood`],
  [70320, `Orange sky`],
  [75480, `I let everybody know that`],
  [75510, `you're mine`],
  [81180, `Now it's just a matter of`],
  [81210, `Time`],
  [86050, `Before we're swept into the`],
  [86080, `Dust`],
  [88970, `Look what you made me become`],
  [91770, `I let you get too close`],
  [94030, `Just to wake up alone`],
  [96680, `And I know you think you can`],
  [96710, `Run`],
  [99290, `You're scared to believe`],
  [99320, `I'm the one`],
  [101540, `But I just can't let you go`],
  [107100, `I'd let the world burn`],
  [109870, `Let the world burn for you`],
  [112730, `This is how it always had`],
  [112760, `To end`],
  [115350, `If I can't have you then`],
  [115380, `no one can`],
  [117830, `I'd let it burn`],
  [120157, `I'd let the world burn`],
  [122419, `Just to hear you calling`],
  [122449, `Out my name`],
  [125709, `Watching it all go down in`],
  [125739, `Flames`],
  [128169, `Let it all burn`],
  [133453, `Oh I'd burn this world for`],
  [133483, `You`],
  [137860, `Oh baby I'd let it burn`],
  [144119, `For you`],
  [148935, `I'd let the world burn`],
  [151224, `Let the world burn for you`],
  [153511, `This is how it always had`],
  [153541, `To end`],
  [156799, `If I can't have you then`],
  [156829, `No one can`],
]);

addLyricsList(14, [
  [13290, `You give and you give`],
  [14000, `Just to get there and fall`],
  [16420, `You take and you take`],
  [18000, `And for nothing at all`],
  [19440, `You run and you run`],
  [21000, `Straight into the wall`],
  [25780, `You don't wanna go there`],
  [27500, `But your mind goes astray`],
  [28850, `You can handle the fear`],
  [30500, `But you can't take the pain`],
  [32340, `You can jump off the edge`],
  [33900, `'Cause the ending's the same`],
  [38400, `There's a lot in your head`],
  [40000, `You've got nothing but time`],
  [41990, `We could figure it out`],
  [42900, `'Cause you'll always be mine`],
  [44930, `You can turn this around`],
  [46500, `But you can't stand the drive`],
  [51380, `You fall`],
  [53000, `Back into darkness again`],
  [54850, `Realize you can only`],
  [56500, `Wish it's pretend`],
  [57820, `No lie`],
  [59000, `You're in it deep this time`],
  [60200, `My friend`],
  [61910, `My friend, oh`],
  [64120, `You fall back into`],
  [66000, `Darkness again`],
  [67690, `Realize you can only`],
  [69000, `Wish it's pretend`],
  [70870, `No lie`],
  [72000, `You're in it deep this time`],
  [73000, `My friend`],
  [75060, `Back into darkness again`],
  [89940, `You try and you try`],
  [91000, `But it never gets done`],
  [93210, `You won't hesitate`],
  [94700, `When the feelings are numb`],
  [95950, `There's a lot on your plate`],
  [98000, `But the damage is done`],
  [102600, `You can try to react`],
  [103250, `But you know it's the same`],
  [105780, `I would take what we had`],
  [107400, `And I'd throw it away`],
  [109360, `I'm missing your touch`],
  [110000, `And I'm going insane`],
  [115380, `You fall back into`],
  [117400, `Darkness again`],
  [118840, `Realize you can only wish it's`],
  [119140, `Pretend`],
  [122080, `No lie, you're in it deep this`],
  [122380, `Time, my friend`],
  [125720, `My friend, oh`],
  [128250, `You fall back into darkness`],
  [128550, `Again`],
  [131560, `Realize you can only wish it's`],
  [131860, `Pretend`],
  [134710, `No lie, you're in it deep this`],
  [135010, `Time, my friend`],
  [139050, `Back into darkness again`],
  [140950, `Trapped in a relapse`],
  [141250, `Trapped in a relapse`],
  [143940, `Trapped in a relapse`],
  [145000, `Again and again`],
  [147480, `Trapped in a relapse`],
  [147780, `Trapped in a relapse`],
  [150340, `Trapped in a relapse`],
  [150640, `Back into darkness, my friend`],
  [154000, `Trapped in a relapse`],
  [155500, `Trapped in a relapse`],
  [156500, `Trapped in a relapse`],
  [158000, `Again and again`],
  [160000, `Trapped in a relapse`],
  [163000, `Trapped in a relapse`],
  [164000, `Trapped in a relapse`],
  [165000, `Back into darkness, my friend`],
  [167000, `You can let it all go`],
  [168000, `But you can't say the words`],
  [170000, `You wanna back down`],
  [171000, `But you know it still hurts`],
  [172500, `I'm calling you out`],
  [174500, `But it's all just a blur`],
  [179000, `You fall`],
  [181000, `Back into darkness again`],
  [182500, `Realize you can only`],
  [184500, `Wish it's pretend`],
  [186500, `No lie, you're in it deep`],
  [188000, `This time, my friend`],
  [190000, `My friend, oh`],
  [192000, `You fall`],
  [194000, `Back into darkness again`],
  [195500, `Realize you can only`],
  [197500, `Wish it's pretend`],
  [199000, `No lie, you're in it deep`],
  [201000, `This time, my friend`],
  [202000, `Back into darkness again`],
]);

addLyricsList(16, [
  [35640, `Trash the ploy`],
  [36200, `Turn myself into a poster boy`],
  [39630, `L-l-live by the sword`],
  [41100, `Make myself turn two to four`],
  [44080, `I-i-i know you want it`],
  [46100, `Oh you Fucking got it`],
  [47920, `Running away`],
  [51140, `i-i-i-i'm running 'round`],
  [52200, `Push it down`],
  [53420, `Fuck, you think we going out?`],
  [55530, `You so wrong, you so dumb`],
  [57710, `We take our time`],
  [58200, `We don't rush`],
  [60840, `Y-y-y-you drive me-`],
  [61300, `Drive me- drive me crazy`],
  [65080, `What would it take`],
  [66350, `To call you my baby`],
  [87400, `T-t-t-trash the ploy`],
  [88060, `Turn myself into a poster boy`],
  [91480, `L-l-live by the sword`],
  [93200, `Make myself turn two to four`],
  [95790, `I-i-i-i know you want it`],
  [97300, `Oh you fucking got it`],
  [99660, `Running away`],
]);

function clearLyrics() {
  if (lyricRaf) cancelAnimationFrame(lyricRaf);
  lyricRaf = 0;
  lyricState = null;
}

function stopMusic() {
  clearLyrics();
  setMusicStatus("");
  if (musicTimeEl) musicTimeEl.textContent = "";
  if (musicSeekEl) musicSeekEl.value = "0";
  stopYtTicker();
  if (currentAudio) {
    if (currentAudio._type === "youtube") {
      if (ytPlayer) {
        ytPlayer.stopVideo();
      }
    } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  }
}

function queueLyrics(index) {
  clearLyrics();
  if (!autoChatLyrics) return;
  const lines = musicLyrics[index];
  if (!lines || !lines.length) return;
  const audio = currentAudio;
  if (!audio) return;
  const nowMs = audio.currentTime * 1000;
  let next = 0;
  while (next < lines.length && (lines[next].delay || 0) <= nowMs) next++;
  lyricState = { index, audio, lines, next };
  const tick = () => {
    const st = lyricState;
    if (!st || !autoChatLyrics) return;
    if (st.audio !== currentAudio) return;
    if (st.audio.paused) {
      lyricRaf = requestAnimationFrame(tick);
      return;
    }
    const t = st.audio.currentTime * 1000;
    while (
      st.next < st.lines.length &&
      t + 25 >= (st.lines[st.next].delay || 0)
    ) {
      const active = document.activeElement;
      if (!(active && active.id && active.id.toLowerCase() === "chatbox")) {
        const msg = String(st.lines[st.next].chat || "")
          .trim()
          .slice(0, 30);
        if (msg) packet("6", msg);
      }
      st.next++;
    }
    lyricRaf = requestAnimationFrame(tick);
  };
  lyricRaf = requestAnimationFrame(tick);
}

function playMusic(index) {
  stopMusic();
  currentTrackIndex = index;
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
    if (currentAudio === audio) setMusicStatus("");
  };
  audio.onplay = () => {
    if (currentAudio === audio) queueLyrics(index);
  };
  audio.onseeked = () => {
    if (currentAudio === audio) queueLyrics(index);
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

  menu = document.createElement("div");
  menu.id = "musicMenu";
  menu.className = "uiElement";
  menu.style.position = "fixed";
  menu.style.left = "20px";
  menu.style.top = "90px";
  menu.style.zIndex = "10002";
  menu.style.display = "none";
  menu.style.width = "320px";
  menu.style.padding = "12px";
  menu.style.cursor = "default";

  menu.innerHTML = `
    <div id="musicMenuHeader" class="menuHeader">Music</div>
    <div class="menuText">Press U to toggle</div>
    <select id="musicSelect" class="Cselect" style="width:100%;"></select>
    <div style="display:flex; gap:6px; margin-top:10px;">
      <div id="musicPlay" class="menuB" style="flex:1;">Play</div>
      <div id="musicStop" class="menuB" style="flex:1;">Stop</div>
    </div>
    <div id="musicStatus" class="menuText" style="font-size:12px; margin-top:8px;"></div>
    <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
      <input id="musicSeek" type="range" min="0" max="0" step="0.01" value="0" style="flex:1; min-width:0;">
      <div class="menuText" style="font-size:12px; margin:0;"><span id="musicTime"></span><span style="opacity:0.7;"> / </span><span id="musicDur"></span></div>
    </div>
    <label style="display:flex; gap:8px; align-items:center; margin-top:10px;">
      <input id="musicAutoChat" type="checkbox" class="checkB" />
      Auto-chat lyrics (needs custom lines)
    </label>
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

  const select = menu.querySelector("#musicSelect");
  musicStatusEl = menu.querySelector("#musicStatus");
  musicTimeEl = menu.querySelector("#musicTime");
  musicDurEl = menu.querySelector("#musicDur");
  musicSeekEl = menu.querySelector("#musicSeek");
  musicTracks.forEach((track, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = getTrackLabel(track, i);
    select.appendChild(opt);
  });
  for (let i = 0; i < musicTracks.length; i++) {
    const cached = getStore(`musicLrc:${i}`);
    if (cached) setLyricsFromLrc(i, cached);
  }

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
      if (currentAudio._type === "youtube") queueLyrics(currentTrackIndex);
    });
  }

  menu.querySelector("#musicPlay").addEventListener("click", () => {
    const idx = parseInt(select.value, 10) || 0;
    playMusic(idx);
  });
  menu.querySelector("#musicStop").addEventListener("click", () => {
    stopMusic();
  });
  menu.querySelector("#musicAutoChat").addEventListener("change", (e) => {
    autoChatLyrics = e.target.checked;
  });

  return menu;
}

document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  if (active && active.id && active.id.toLowerCase() === "chatbox") return;
  if (e.key === "u" || e.key === "U") {
    const menu = buildMusicMenu();
    musicMenuOpen = !musicMenuOpen;
    menu.style.display = musicMenuOpen ? "block" : "none";
  }
});
let outlineColor = "#525252";
let darkOutlineColor = "#3d3f42";
let outlineWidth = 5.5;

let firstSetup = true;
let keys = {};
let moveKeys = {
  87: [0, -1],
  38: [0, -1],
  83: [0, 1],
  40: [0, 1],
  65: [-1, 0],
  37: [-1, 0],
  68: [1, 0],
  39: [1, 0],
};

let attackState = 0;
let inGame = false;

let macro = {};
let mills = {
  place: 0,
  placeSpawnPads: 0,
};
let lastDir;

let lastLeaderboardData = [];

let inWindow = true;
window.onblur = function () {
  inWindow = false;
};
window.onfocus = function () {
  inWindow = true;
};
let ms = {
  avg: 0,
  max: 0,
  min: 0,
  delay: 0,
};
function pingSocketResponse() {
  let pingTime = window.pingTime;
  const pingDisplay = document.getElementById("pingDisplay");
  pingDisplay.innerText = "";
  if (pingTime > ms.max || isNaN(ms.max)) {
    ms.max = pingTime;
  }
  if (pingTime < ms.min || isNaN(ms.min)) {
    ms.min = pingTime;
  }
}

let placeVisible = [];

class Utils {
  constructor() {
    let mathABS = Math.abs,
      mathCOS = Math.cos,
      mathSIN = Math.sin,
      mathPOW = Math.pow,
      mathSQRT = Math.sqrt,
      mathATAN2 = Math.atan2,
      mathPI = Math.PI;

    let _this = this;

    this.round = function (n, v) {
      return Math.round(n * v) / v;
    };
    this.toRad = function (angle) {
      return angle * (mathPI / 180);
    };
    this.toAng = function (radian) {
      return radian / (mathPI / 180);
    };
    this.randInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.randFloat = function (min, max) {
      return Math.random() * (max - min + 1) + min;
    };
    this.lerp = function (value1, value2, amount) {
      return value1 + (value2 - value1) * amount;
    };
    this.decel = function (val, cel) {
      if (val > 0) val = Math.max(0, val - cel);
      else if (val < 0) val = Math.min(0, val + cel);
      return val;
    };
    this.getDistance = function (x1, y1, x2, y2) {
      return mathSQRT((x2 -= x1) * x2 + (y2 -= y1) * y2);
    };
    this.getDist = function (tmp1, tmp2, type1, type2) {
      let tmpXY1 = {
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
      let tmpXY2 = {
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
      return mathSQRT(
        (tmpXY2.x -= tmpXY1.x) * tmpXY2.x + (tmpXY2.y -= tmpXY1.y) * tmpXY2.y,
      );
    };
    this.getDirection = function (x1, y1, x2, y2) {
      return mathATAN2(y1 - y2, x1 - x2);
    };
    this.getDirect = function (tmp1, tmp2, type1, type2) {
      let tmpXY1 = {
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
      let tmpXY2 = {
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
      return mathATAN2(tmpXY1.y - tmpXY2.y, tmpXY1.x - tmpXY2.x);
    };
    this.getAngleDist = function (a, b) {
      let p = mathABS(b - a) % (mathPI * 2);
      return p > mathPI ? mathPI * 2 - p : p;
    };
    this.isNumber = function (n) {
      return typeof n == "number" && !isNaN(n) && isFinite(n);
    };
    this.isString = function (s) {
      return s && typeof s == "string";
    };
    this.kFormat = function (num) {
      return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
    };
    this.sFormat = function (num) {
      let fixs = [
        {
          num: 1e3,
          string: "k",
        },
        {
          num: 1e6,
          string: "m",
        },
        {
          num: 1e9,
          string: "b",
        },
        {
          num: 1e12,
          string: "q",
        },
      ].reverse();
      let sp = fixs.find((v) => num >= v.num);
      if (!sp) return num;
      return (num / sp.num).toFixed(1) + sp.string;
    };
    this.capitalizeFirst = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    this.fixTo = function (n, v) {
      return parseFloat(n.toFixed(v));
    };
    this.sortByPoints = function (a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    };
    this.lineInRect = function (recX, recY, recX2, recY2, x1, y1, x2, y2) {
      let minX = x1;
      let maxX = x2;
      if (x1 > x2) {
        minX = x2;
        maxX = x1;
      }
      if (maxX > recX2) maxX = recX2;
      if (minX < recX) minX = recX;
      if (minX > maxX) return false;
      let minY = y1;
      let maxY = y2;
      let dx = x2 - x1;
      if (Math.abs(dx) > 0.0000001) {
        let a = (y2 - y1) / dx;
        let b = y1 - a * x1;
        minY = a * minX + b;
        maxY = a * maxX + b;
      }
      if (minY > maxY) {
        let tmp = maxY;
        maxY = minY;
        minY = tmp;
      }
      if (maxY > recY2) maxY = recY2;
      if (minY < recY) minY = recY;
      if (minY > maxY) return false;
      return true;
    };
    this.containsPoint = function (element, x, y) {
      let bounds = element.getBoundingClientRect();
      let left = bounds.left + window.scrollX;
      let top = bounds.top + window.scrollY;
      let width = bounds.width;
      let height = bounds.height;

      let insideHorizontal = x > left && x < left + width;
      let insideVertical = y > top && y < top + height;
      return insideHorizontal && insideVertical;
    };
    this.mousifyTouchEvent = function (event) {
      let touch = event.changedTouches[0];
      event.screenX = touch.screenX;
      event.screenY = touch.screenY;
      event.clientX = touch.clientX;
      event.clientY = touch.clientY;
      event.pageX = touch.pageX;
      event.pageY = touch.pageY;
    };
    this.hookTouchEvents = function (element, skipPrevent) {
      let preventDefault = !skipPrevent;
      let isHovering = false;
      let passive = false;
      element.addEventListener(
        "touchstart",
        this.checkTrusted(touchStart),
        passive,
      );
      element.addEventListener(
        "touchmove",
        this.checkTrusted(touchMove),
        passive,
      );
      element.addEventListener(
        "touchend",
        this.checkTrusted(touchEnd),
        passive,
      );
      element.addEventListener(
        "touchcancel",
        this.checkTrusted(touchEnd),
        passive,
      );
      element.addEventListener(
        "touchleave",
        this.checkTrusted(touchEnd),
        passive,
      );

      function touchStart(e) {
        _this.mousifyTouchEvent(e);
        window.setUsingTouch(true);
        if (preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (element.onmouseover) {
          element.onmouseover(e);
          isHovering = true;
        }
      }

      function touchMove(e) {
        _this.mousifyTouchEvent(e);
        window.setUsingTouch(true);
        if (preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (_this.containsPoint(element, e.pageX, e.pageY)) {
          if (!isHovering) {
            if (element.onmouseover) {
              element.onmouseover(e);
              isHovering = true;
            }
          }
        } else {
          if (isHovering) {
            if (element.onmouseout) {
              element.onmouseout(e);
              isHovering = false;
            }
          }
        }
      }

      function touchEnd(e) {
        _this.mousifyTouchEvent(e);
        window.setUsingTouch(true);
        if (preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (isHovering) {
          if (element.onclick) element.onclick(e);
          if (element.onmouseout) element.onmouseout(e);
          isHovering = false;
        }
      }
    };
    this.removeAllChildren = function (element) {
      while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
      }
    };
    this.generateElement = function (config) {
      let element = document.createElement(config.tag || "div");

      function bind(configValue, elementValue) {
        if (config[configValue]) element[elementValue] = config[configValue];
      }
      bind("text", "textContent");
      bind("html", "innerHTML");
      bind("class", "className");
      for (let key in config) {
        switch (key) {
          case "tag":
          case "text":
          case "html":
          case "class":
          case "style":
          case "hookTouch":
          case "parent":
          case "children":
            continue;
          default:
            break;
        }
        element[key] = config[key];
      }
      if (element.onclick) element.onclick = this.checkTrusted(element.onclick);
      if (element.onmouseover)
        element.onmouseover = this.checkTrusted(element.onmouseover);
      if (element.onmouseout)
        element.onmouseout = this.checkTrusted(element.onmouseout);
      if (config.style) {
        element.style.cssText = config.style;
      }
      if (config.hookTouch) {
        this.hookTouchEvents(element);
      }
      if (config.parent) {
        config.parent.appendChild(element);
      }
      if (config.children) {
        for (let i = 0; i < config.children.length; i++) {
          element.appendChild(config.children[i]);
        }
      }
      return element;
    };
    this.checkTrusted = function (callback) {
      return function (ev) {
        if (
          ev &&
          ev instanceof Event &&
          (ev && typeof ev.isTrusted == "boolean" ? ev.isTrusted : true)
        ) {
          callback(ev);
        }
      };
    };
    this.randomString = function (length) {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
    this.countInArray = function (array, val) {
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === val) count++;
      }
      return count;
    };
    this.hexToRgb = function (hex) {
      return hex
        .slice(1)
        .match(/.{1,2}/g)
        .map((g) => parseInt(g, 16));
    };
    this.getRgb = function (r, g, b) {
      return [r / 255, g / 255, b / 255].join(", ");
    };
  }
}

class Animtext {
  constructor() {
    this.init = function (x, y, scale, speed, life, text, color, uid) {
      this.x = x;
      this.y = y;
      this.baseY = y;
      this.color = color;
      this.scale = scale;
      this.text = text;
      this.uid = uid;

      this.life = life || 1500;
      this.maxLife = this.life;
      this.value = this.tryParseNumber(text);

      this.alpha = 0;
      this.createdTime = Date.now();
    };

    this.tryParseNumber = function (text) {
      if (typeof text !== "string") return null;
      const num = parseInt(text, 10);
      return isNaN(num) ? null : num;
    };

    this.addValue = function (value, newLife = 1500) {
      if (typeof value !== "number") return;
      if (this.value === null) this.value = 0;

      this.value += value;
      this.text = String(this.value);
      this.life = newLife;
      this.maxLife = newLife;
      this.createdTime = Date.now();
    };

    this.update = function (delta) {
      if (this.life <= 0) return;

      this.life -= delta;

      if (this.life > this.maxLife - 300) {
        this.alpha = Math.min(1, (this.maxLife - this.life) / 300);
      } else if (this.life < 500) {
        this.alpha = Math.max(0, this.life / 500);
      } else {
        this.alpha = 1;
      }
    };

    this.render = function (ctxt, xOff, yOff) {
      if (this.life <= 0 || this.alpha <= 0) return;

      ctxt.save();
      ctxt.globalAlpha = this.alpha;

      ctxt.font = `${this.scale}px "Segoe UI", Arial, sans-serif`;
      ctxt.textAlign = "center";
      ctxt.textBaseline = "middle";
      ctxt.lineWidth = 4;
      ctxt.shadowColor = "rgba(0,0,0,0.5)";
      ctxt.shadowBlur = 4;
      ctxt.shadowOffsetX = 0;
      ctxt.shadowOffsetY = 2;

      ctxt.fillStyle = this.color;
      ctxt.strokeStyle = "black";
      ctxt.strokeText(this.text, this.x - xOff, this.baseY - yOff);
      ctxt.fillText(this.text, this.x - xOff, this.baseY - yOff);

      ctxt.shadowBlur = 0;
      ctxt.globalAlpha = 1;
      ctxt.restore();
    };
  }
}

class Textmanager {
  constructor() {
    this.texts = [];

    this.update = function (delta, ctxt, xOff, yOff) {
      for (let i = 0; i < this.texts.length; ++i) {
        if (this.texts[i].life > 0) {
          this.texts[i].update(delta);
          this.texts[i].render(ctxt, xOff, yOff);
        }
      }
    };

    this.showText = function (x, y, scale, speed, life, text, color) {
      // Convert text to string first
      const textStr = String(text);
      const value = this.tryParseNumber(textStr);

      // If it's not a number, create it normally (for chat messages)
      if (value === null) {
        this.createNewText(x, y, scale, speed, life, textStr, color);
        return;
      }

      // It's a number - try to add to existing number
      for (let i = 0; i < this.texts.length; ++i) {
        const txt = this.texts[i];
        if (
          txt.life > 0 &&
          Math.abs(txt.x - x) < 30 &&
          Math.abs(txt.y - y) < 30 &&
          txt.color === color &&
          txt.value !== null
        ) {
          // Found existing number at same position with same color - add to it
          txt.addValue(value, life || 1500);
          return;
        }
      }

      // No existing number found, create new one
      this.createNewText(x, y, scale, speed, life, textStr, color, value);
    };

    this.tryParseNumber = function (text) {
      if (typeof text !== "string") return null;
      // Only parse if it's purely a number (no letters or symbols)
      if (/^-?\d+$/.test(text.trim())) {
        const num = parseInt(text, 10);
        return isNaN(num) ? null : num;
      }
      return null;
    };

    this.createNewText = function (
      x,
      y,
      scale,
      speed,
      life,
      text,
      color,
      value = null,
    ) {
      let tmpText = null;
      for (let i = 0; i < this.texts.length; ++i) {
        if (this.texts[i].life <= 0) {
          tmpText = this.texts[i];
          break;
        }
      }

      if (!tmpText) {
        tmpText = new Animtext();
        this.texts.push(tmpText);
      }

      const uid = Date.now() + Math.random();
      tmpText.init(x, y, scale, speed, life, text, color, uid);
      if (value !== null) tmpText.value = value;
    };
  }
}

class GameObject {
  constructor(sid) {
    this.sid = sid;

    this.init = function (x, y, dir, scale, type, data, owner) {
      data = data || {};
      this.sentTo = {};
      this.gridLocations = [];
      this.active = true;
      this.render = true;
      this.doUpdate = data.doUpdate;
      this.x = x;
      this.y = y;
      this.dir = dir;
      this.lastDir = dir;
      this.xWiggle = 0;
      this.yWiggle = 0;
      this.visScale = scale;
      this.scale = scale;
      this.type = type;
      this.id = data.id;
      this.owner = owner;
      this.name = data.name;
      this.isItem = this.id != undefined;
      this.group = data.group;
      this.maxHealth = data.health;
      this.health = this.maxHealth;
      this.layer = 2;
      if (this.group != undefined) {
        this.layer = this.group.layer;
      } else if (this.type == 0) {
        this.layer = 3;
      } else if (this.type == 2) {
        this.layer = 0;
      } else if (this.type == 4) {
        this.layer = -1;
      }
      this.colDiv = data.colDiv || 1;
      this.blocker = data.blocker;
      this.ignoreCollision = data.ignoreCollision;
      this.dontGather = data.dontGather;
      this.hideFromEnemy = data.hideFromEnemy;
      this.friction = data.friction;
      this.projDmg = data.projDmg;
      this.dmg = data.dmg;
      this.pDmg = data.pDmg;
      this.pps = data.pps;
      this.zIndex = data.zIndex || 0;
      this.turnSpeed = data.turnSpeed;
      this.req = data.req;
      this.trap = data.trap;
      this.healCol = data.healCol;
      this.teleport = data.teleport;
      this.boostSpeed = data.boostSpeed;
      this.projectile = data.projectile;
      this.shootRange = data.shootRange;
      this.shootRate = data.shootRate;
      this.shootCount = this.shootRate;
      this.spawnPoint = data.spawnPoint;
      this.onNear = 0;
      this.breakObj = false;
      this.alpha = data.alpha || 1;
      this.maxAlpha = data.alpha || 1;
      this.damaged = 0;
    };

    this.changeHealth = function (amount, doer) {
      this.health += amount;
      return this.health <= 0;
    };

    this.getScale = function (sM, ig) {
      sM = sM || 1;
      return (
        this.scale *
        (this.isItem || this.type == 2 || this.type == 3 || this.type == 4
          ? 1
          : 0.6 * sM) *
        (ig ? 1 : this.colDiv)
      );
    };

    this.visibleToPlayer = function (player) {
      return (
        !this.hideFromEnemy ||
        (this.owner &&
          (this.owner == player ||
            (this.owner.team && player.team == this.owner.team)))
      );
    };

    this.update = function (delta) {
      if (this.active) {
        if (this.xWiggle) {
          this.xWiggle *= Math.pow(0.99, delta);
        }
        if (this.yWiggle) {
          this.yWiggle *= Math.pow(0.99, delta);
        }
        let d2 = UTILS.getAngleDist(this.lastDir, this.dir);
        if (d2 > 0.01) {
          this.dir += d2 / 5;
        } else {
          this.dir = this.lastDir;
        }
      } else {
        if (this.alive) {
          this.alpha -= delta / (200 / this.maxAlpha);
          this.visScale += delta / (this.scale / 2.5);
          if (this.alpha <= 0) {
            this.alpha = 0;
            this.alive = false;
          }
        }
      }
    };

    this.isTeamObject = function (tmpObj) {
      return this.owner == null
        ? true
        : (this.owner && tmpObj.sid == this.owner.sid) ||
        tmpObj.findAllianceBySid(this.owner.sid);
    };
  }
}
class Items {
  constructor() {
    this.groups = [
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
        sandboxLimit: 299,
        place: true,
        limit: 7,
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
        sandboxLimit: 299,
        place: true,
        limit: 12,
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
        sandboxLimit: 299,
        place: true,
        limit: 2,
        layer: -1,
      },
    ];

    this.projectiles = [
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
    ];

    this.weapons = [
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
        Pdmg: 25,
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
        Pdmg: 10,
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
        Pdmg: 0,
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
        Pdmg: 35,
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
        Pdmg: 30,
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
        Pdmg: 0,
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
        Pdmg: 50,
        projectile: 5,
        hideProjectile: true,
        spdMult: 0.6,
        speed: 1500,
      },
    ];

    this.list = [
      {
        group: this.groups[0],
        name: "apple",
        desc: "restores 20 health when consumed",
        req: ["food", 10],
        consume: function (doer) {
          return doer.changeHealth(20, doer);
        },
        scale: 22,
        holdOffset: 15,
        healing: 20,
        itemID: 0,
        itemAID: 16,
      },
      {
        age: 3,
        group: this.groups[0],
        name: "cookie",
        desc: "restores 40 health when consumed",
        req: ["food", 15],
        consume: function (doer) {
          return doer.changeHealth(40, doer);
        },
        scale: 27,
        holdOffset: 15,
        healing: 40,
        itemID: 1,
        itemAID: 17,
      },
      {
        age: 7,
        group: this.groups[0],
        name: "cheese",
        desc: "restores 30 health and another 50 over 5 seconds",
        req: ["food", 25],
        consume: function (doer) {
          if (doer.changeHealth(30, doer) || doer.health < 100) {
            doer.dmgOverTime.dmg = -10;
            doer.dmgOverTime.doer = doer;
            doer.dmgOverTime.time = 5;
            return true;
          }
          return false;
        },
        scale: 27,
        holdOffset: 15,
        healing: 30,
        itemID: 2,
        itemAID: 18,
      },
      {
        group: this.groups[1],
        name: "wood wall",
        desc: "provides protection for your village",
        req: ["wood", 10],
        projDmg: true,
        health: 380,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5,
        itemID: 3,
        itemAID: 19,
      },
      {
        age: 3,
        group: this.groups[1],
        name: "stone wall",
        desc: "provides improved protection for your village",
        req: ["stone", 25],
        health: 900,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5,
        itemID: 4,
        itemAID: 20,
      },
      {
        age: 7,
        group: this.groups[1],
        name: "castle wall",
        desc: "provides powerful protection for your village",
        req: ["stone", 35],
        health: 1500,
        scale: 52,
        holdOffset: 20,
        placeOffset: -5,
        itemID: 5,
        itemAID: 21,
      },
      {
        group: this.groups[2],
        name: "spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 20, "stone", 5],
        health: 400,
        dmg: 20,
        scale: 49,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
        itemID: 6,
        itemAID: 22,
        shadow: {
          offsetX: 5,
          offsetY: 5,
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      {
        age: 5,
        group: this.groups[2],
        name: "greater spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 30, "stone", 10],
        health: 500,
        dmg: 35,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
        itemID: 7,
        itemAID: 23,
      },
      {
        age: 9,
        group: this.groups[2],
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
        itemID: 8,
        itemAID: 24,
      },
      {
        age: 9,
        group: this.groups[2],
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
        itemID: 9,
        itemAID: 25,
      },
      {
        group: this.groups[3],
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
        itemID: 10,
        itemAID: 26,
      },
      {
        age: 5,
        group: this.groups[3],
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
        itemID: 11,
        itemAID: 27,
      },
      {
        age: 8,
        group: this.groups[3],
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
        itemID: 12,
        itemAID: 28,
      },
      {
        age: 5,
        group: this.groups[4],
        type: 2,
        name: "mine",
        desc: "allows you to mine stone",
        req: ["wood", 20, "stone", 100],
        iconLineMult: 12,
        scale: 65,
        holdOffset: 20,
        placeOffset: 0,
        itemID: 13,
        itemAID: 29,
      },
      {
        age: 5,
        group: this.groups[11],
        type: 0,
        name: "sapling",
        desc: "allows you to farm wood",
        req: ["wood", 150],
        iconLineMult: 12,
        colDiv: 0.5,
        scale: 110,
        holdOffset: 50,
        placeOffset: -15,
        itemID: 14,
        itemAID: 30,
      },
      {
        age: 4,
        group: this.groups[5],
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
        alpha: 0.6,
        itemID: 15,
        itemAID: 31,
      },
      {
        age: 4,
        group: this.groups[6],
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
        itemID: 16,
        itemAID: 32,
      },
      {
        age: 7,
        group: this.groups[7],
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
        itemID: 17,
        itemAID: 33,
      },
      {
        age: 7,
        group: this.groups[8],
        name: "platform",
        desc: "platform to shoot over walls and cross over water",
        req: ["wood", 20],
        ignoreCollision: true,
        zIndex: 1,
        health: 300,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5,
        itemID: 18,
        itemAID: 34,
      },
      {
        age: 7,
        group: this.groups[9],
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
        itemID: 19,
        itemAID: 35,
      },
      {
        age: 9,
        group: this.groups[10],
        name: "spawn pad",
        desc: "you will spawn here when you die but it will dissapear",
        req: ["wood", 100, "stone", 100],
        health: 400,
        ignoreCollision: true,
        spawnPoint: true,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
        itemID: 20,
        itemAID: 36,
      },
      {
        age: 7,
        group: this.groups[12],
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
        itemID: 21,
        itemAID: 37,
      },
      {
        age: 7,
        group: this.groups[13],
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
        itemID: 22,
        itemAID: 38,
      },
    ];

    this.checkItem = {
      index: function (id, myItems) {
        return [0, 1, 2].includes(id)
          ? 0
          : [3, 4, 5].includes(id)
            ? 1
            : [6, 7, 8, 9].includes(id)
              ? 2
              : [10, 11, 12].includes(id)
                ? 3
                : [13, 14].includes(id)
                  ? 5
                  : [15, 16].includes(id)
                    ? 4
                    : [17, 18, 19, 21, 22].includes(id)
                      ? [13, 14].includes(myItems)
                        ? 6
                        : 5
                      : id == 20
                        ? [13, 14].includes(myItems)
                          ? 7
                          : 6
                        : undefined;
      },
    };

    for (let i = 0; i < this.list.length; ++i) {
      this.list[i].id = i;
      if (this.list[i].pre) this.list[i].pre = i - this.list[i].pre;
    }

    if (typeof window !== "undefined") {
      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
    }
  }
}
class Objectmanager {
  constructor(GameObject, liztobj, UTILS, config, players, server) {
    let mathFloor = Math.floor,
      mathABS = Math.abs,
      mathCOS = Math.cos,
      mathSIN = Math.sin,
      mathPOW = Math.pow,
      mathSQRT = Math.sqrt;

    this.ignoreAdd = false;
    this.hitObj = [];

    this.disableObj = function (obj) {
      obj.active = false;
    };

    let tmpObj;
    this.add = function (sid, x, y, dir, s, type, data, setSID, owner) {
      tmpObj = findObjectBySid(sid);
      if (!tmpObj) {
        tmpObj = gameObjects.find((tmp) => !tmp.active);
        if (!tmpObj) {
          tmpObj = new GameObject(sid);
          gameObjects.push(tmpObj);
        }
      }
      if (setSID) {
        tmpObj.sid = sid;
      }
      tmpObj.init(x, y, dir, s, type, data, owner);
    };

    this.disableBySid = function (sid) {
      let find = findObjectBySid(sid);
      if (find) {
        this.disableObj(find);
      }
    };

    this.removeAllItems = function (sid, server) {
      gameObjects
        .filter((tmp) => tmp.active && tmp.owner && tmp.owner.sid == sid)
        .forEach((tmp) => this.disableObj(tmp));
    };

    this.checkItemLocation = function (x, y, s, sM, indx, ignoreWater, placer) {
      let cantPlace = liztobj.find(
        (tmp) =>
          tmp.active &&
          UTILS.getDistance(x, y, tmp.x, tmp.y) <
          s + (tmp.blocker ? tmp.blocker : tmp.getScale(sM, tmp.isItem)),
      );
      if (cantPlace) return false;
      if (
        !ignoreWater &&
        indx != 18 &&
        y >= config.mapScale / 2 - config.riverWidth / 2 &&
        y <= config.mapScale / 2 + config.riverWidth / 2
      )
        return false;
      return true;
    };
  }
}
class Projectile {
  constructor(players, ais, objectManager, items, config, UTILS, server) {
    this.init = function (indx, x, y, dir, spd, dmg, rng, scl, owner) {
      this.active = true;
      this.tickActive = true;
      this.indx = indx;
      this.x = x;
      this.y = y;
      this.x2 = x;
      this.y2 = y;
      this.dir = dir;
      this.skipMov = true;
      this.speed = spd;
      this.dmg = dmg;
      this.scale = scl;
      this.range = rng;
      this.r2 = rng;
      this.owner = owner;
    };

    this.update = function (delta) {
      if (this.active) {
        let tmpSpeed = this.speed * delta;
        if (!this.skipMov) {
          const nextX = this.x + tmpSpeed * Math.cos(this.dir);
          const nextY = this.y + tmpSpeed * Math.sin(this.dir);
          for (const obj of gameObjects) {
            if (!obj.active) continue;
            const objScale = obj.blocker
              ? obj.blocker
              : obj.getScale(0.6, obj.isItem);
            const dist = UTILS.getDistance(nextX, nextY, obj.x, obj.y);
            if (dist < objScale) {
              this.active = false;
              return;
            }
          }
          for (const obj of liztobj) {
            if (!obj.active) continue;
            const objScale = obj.blocker
              ? obj.blocker
              : obj.getScale(0.6, obj.isItem);
            const dist = UTILS.getDistance(nextX, nextY, obj.x, obj.y);
            if (dist < objScale) {
              this.active = false;
              return;
            }
          }
          this.x = nextX;
          this.y = nextY;
          this.range -= tmpSpeed;
          if (this.range <= 0) {
            this.x += this.range * Math.cos(this.dir);
            this.y += this.range * Math.sin(this.dir);
            tmpSpeed = 1;
            this.range = 0;
            this.active = false;
          }
        } else {
          this.skipMov = false;
        }
      }
    };
    this.tickUpdate = function (delta) {
      if (this.tickActive) {
        let tmpSpeed = this.speed * delta;
        if (!this.skipMov) {
          this.x2 += tmpSpeed * Math.cos(this.dir);
          this.y2 += tmpSpeed * Math.sin(this.dir);
          this.r2 -= tmpSpeed;
          if (this.r2 <= 0) {
            this.x2 += this.r2 * Math.cos(this.dir);
            this.y2 += this.r2 * Math.sin(this.dir);
            tmpSpeed = 1;
            this.r2 = 0;
            this.tickActive = false;
          }
        } else {
          this.skipMov = false;
        }
      }
    };
  }
}
class Store {
  constructor() {
    this.hats = [
      {
        id: 45,
        name: "Shame!",
        dontSell: true,
        price: 0,
        scale: 120,
        desc: "hacks are for winners",
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

    this.accessories = [
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
  }
}
class ProjectileManager {
  constructor(
    Projectile,
    projectiles,
    players,
    ais,
    objectManager,
    items,
    config,
    UTILS,
    server,
  ) {
    this.addProjectile = function (
      x,
      y,
      dir,
      range,
      speed,
      indx,
      owner,
      ignoreObj,
      layer,
      inWindow,
    ) {
      let tmpData = items.projectiles[indx];
      let tmpProj;
      for (let i = 0; i < projectiles.length; ++i) {
        if (!projectiles[i].active) {
          tmpProj = projectiles[i];
          break;
        }
      }
      if (!tmpProj) {
        tmpProj = new Projectile(
          players,
          ais,
          objectManager,
          items,
          config,
          UTILS,
          server,
        );
        tmpProj.sid = projectiles.length;
        projectiles.push(tmpProj);
      }
      tmpProj.init(
        indx,
        x,
        y,
        dir,
        speed,
        tmpData.dmg,
        range,
        tmpData.scale,
        owner,
      );
      tmpProj.ignoreObj = ignoreObj;
      tmpProj.layer = layer || tmpData.layer;
      tmpProj.inWindow = inWindow;
      tmpProj.src = tmpData.src;
      return tmpProj;
    };
  }
}
class AiManager {
  constructor(
    ais,
    AI,
    players,
    items,
    objectManager,
    config,
    UTILS,
    scoreCallback,
    server,
  ) {
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
        speed: 0.0,
        turnSpeed: 0.0,
        scale: 70,
        spriteMlt: 1.0,
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
        name: "💀MOOFIE",
        src: "wolf_2",
        hostile: !0,
        fixedSpawn: !0,
        dontRun: !0,
        hitScare: 50,
        spawnDelay: 6e4,
        noTrap: !0,
        nameScale: 35,
        dmg: 12,
        colDmg: 100,
        killScore: 3e3,
        health: 9e3,
        weightM: 0.45,
        speed: 0.0015,
        turnSpeed: 0.0025,
        scale: 94,
        viewRange: 1440,
        chargePlayer: !0,
        drop: ["food", 3e3],
        minSpawnRange: 0.85,
        maxSpawnRange: 0.9,
      },
      {
        id: 10,
        name: "💀Wolf",
        src: "wolf_1",
        hostile: !0,
        fixedSpawn: !0,
        dontRun: !0,
        hitScare: 50,
        spawnDelay: 3e4,
        dmg: 10,
        killScore: 700,
        health: 500,
        weightM: 0.45,
        speed: 0.00115,
        turnSpeed: 0.0025,
        scale: 88,
        viewRange: 1440,
        chargePlayer: !0,
        drop: ["food", 400],
        minSpawnRange: 0.85,
        maxSpawnRange: 0.9,
      },
      {
        id: 11,
        name: "💀Bully",
        src: "bull_1",
        hostile: !0,
        fixedSpawn: !0,
        dontRun: !0,
        hitScare: 50,
        dmg: 20,
        killScore: 5e3,
        health: 5e3,
        spawnDelay: 1e5,
        weightM: 0.45,
        speed: 0.00115,
        turnSpeed: 0.0025,
        scale: 94,
        viewRange: 1440,
        chargePlayer: !0,
        drop: ["food", 800],
        minSpawnRange: 0.85,
        maxSpawnRange: 0.9,
      },
    ];

    this.spawn = function (x, y, dir, index) {
      let tmpObj = ais.find((tmp) => !tmp.active);
      if (!tmpObj) {
        tmpObj = new AI(
          ais.length,
          objectManager,
          players,
          items,
          UTILS,
          config,
          scoreCallback,
          server,
        );
        ais.push(tmpObj);
      }
      tmpObj.init(x, y, dir, index, this.aiTypes[index]);
      return tmpObj;
    };
  }
}

class AI {
  constructor(
    sid,
    objectManager,
    players,
    items,
    UTILS,
    config,
    scoreCallback,
    server,
  ) {
    this.sid = sid;
    this.isAI = true;
    this.nameIndex = UTILS.randInt(0, config.cowNames.length - 1);

    this.init = function (x, y, dir, index, data) {
      this.x = x;
      this.y = y;
      this.startX = data.fixedSpawn ? x : null;
      this.startY = data.fixedSpawn ? y : null;
      this.xVel = 0;
      this.yVel = 0;
      this.zIndex = 0;
      this.dir = dir;
      this.dirPlus = 0;
      this.showName = "aaa";
      this.index = index;
      this.src = data.src;
      if (data.name) this.name = data.name;
      this.weightM = data.weightM;
      this.speed = data.speed;
      this.killScore = data.killScore;
      this.turnSpeed = data.turnSpeed;
      this.scale = data.scale;
      this.maxHealth = data.health;
      this.leapForce = data.leapForce;
      this.health = this.maxHealth;
      this.chargePlayer = data.chargePlayer;
      this.viewRange = data.viewRange;
      this.drop = data.drop;
      this.dmg = data.dmg;
      this.hostile = data.hostile;
      this.dontRun = data.dontRun;
      this.hitRange = data.hitRange;
      this.hitDelay = data.hitDelay;
      this.hitScare = data.hitScare;
      this.spriteMlt = data.spriteMlt;
      this.nameScale = data.nameScale;
      this.colDmg = data.colDmg;
      this.noTrap = data.noTrap;
      this.spawnDelay = data.spawnDelay;
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

    let tmpRatio = 0;
    let animIndex = 0;
    this.animate = function (delta) {
      if (this.animTime > 0) {
        this.animTime -= delta;
        if (this.animTime <= 0) {
          this.animTime = 0;
          this.dirPlus = 0;
          tmpRatio = 0;
          animIndex = 0;
        } else {
          if (animIndex == 0) {
            tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
            this.dirPlus = UTILS.lerp(
              0,
              this.targetAngle,
              Math.min(1, tmpRatio),
            );
            if (tmpRatio >= 1) {
              tmpRatio = 1;
              animIndex = 1;
            }
          } else {
            tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
            this.dirPlus = UTILS.lerp(
              0,
              this.targetAngle,
              Math.max(0, tmpRatio),
            );
          }
        }
      }
    };

    this.startAnim = function () {
      this.animTime = this.animSpeed = 600;
      this.targetAngle = Math.PI * 0.8;
      tmpRatio = 0;
      animIndex = 0;
    };
  }
}
class addCh {
  constructor(x, y, chat, tmpObj) {
    this.x = x;
    this.y = y;
    this.alpha = 0;
    this.active = true;
    this.alive = false;
    this.chat = chat;
    this.owner = tmpObj;
  }
}
class DeadPlayer {
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
  ) {
    this.x = x;
    this.y = y;
    this.lastDir = dir;
    this.dir = dir + Math.PI;
    this.buildIndex = buildIndex;
    this.weaponIndex = weaponIndex;
    this.weaponVariant = weaponVariant;
    this.skinColor = skinColor;
    this.scale = scale;
    this.visScale = 0;
    this.name = name;
    this.alpha = 1;
    this.active = true;
    this.animate = function (delta) {
      let d2 = UTILS.getAngleDist(this.lastDir, this.dir);
      if (d2 > 0.01) {
        this.dir += d2 / 20;
      } else {
        this.dir = this.lastDir;
      }
      if (this.visScale < this.scale) {
        this.visScale += delta / (this.scale / 2);
        if (this.visScale >= this.scale) {
          this.visScale = this.scale;
        }
      }
      this.alpha -= delta / 30000;
      if (this.alpha <= 0) {
        this.alpha = 0;
        this.active = false;
      }
    };
  }
}
class Player {
  constructor(
    id,
    sid,
    config,
    UTILS,
    projectileManager,
    objectManager,
    players,
    ais,
    items,
    hats,
    accessories,
    server,
    scoreCallback,
    iconCallback,
  ) {
    this.id = id;
    this.sid = sid;
    this.tmpScore = 0;
    this.team = null;
    this.latestSkin = 0;
    this.oldSkinIndex = 0;
    this.skinIndex = 0;
    this.latestTail = 0;
    this.oldTailIndex = 0;
    this.tailIndex = 0;
    this.hitTime = 0;
    this.lastHit = 0;
    this.showName = "NOOO";
    this.tails = {};

    for (let i = 0; i < accessories.length; ++i) {
      if (accessories[i].price <= 0) this.tails[accessories[i].id] = 1;
    }
    this.skins = {};
    for (let i = 0; i < hats.length; ++i) {
      if (hats[i].price <= 0) this.skins[hats[i].id] = 1;
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
    this.dist2 = 0;
    this.aim2 = 0;
    this.maxSpeed = 1;
    this.chat = {
      message: null,
      count: 0,
    };
    this.backupNobull = true;
    this.spawn = function (moofoll) {
      this.attacked = false;
      this.timeDamaged = 0;
      this.timeHealed = 0;
      this.pinge = 0;
      this.millPlace = "NOOO";
      this.lastshamecount = 0;
      this.death = false;
      this.spinDir = 0;
      this.sync = false;
      this.antiBull = 0;
      this.bullTimer = 0;
      this.poisonTimer = 0;
      this.active = true;
      this.alive = true;
      this.lockMove = false;
      this.lockDir = false;
      this.minimapCounter = 0;
      this.chatCountdown = 0;
      this.shameCount = 0;
      this.shameTimer = 0;
      this.sentTo = {};
      this.gathering = 0;
      this.gatherIndex = 0;
      this.shooting = {};
      this.shootIndex = 9;
      this.autoGather = 0;
      this.animTime = 0;
      this.animSpeed = 0;
      this.mouseState = 0;
      this.buildIndex = -1;
      this.weaponIndex = 0;
      this.weaponCode = 0;
      this.weaponVariant = 0;
      this.primaryIndex = undefined;
      this.secondaryIndex = undefined;
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
      this.oldXY = {
        x: 0,
        y: 0,
      };
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
      this.damaged = 0;
      this.scale = config.playerScale;
      this.speed = config.playerSpeed;
      this.resetMoveDir();
      this.resetResources(moofoll);
      this.items = [0, 3, 6, 10];
      this.weapons = [0];
      this.shootCount = 0;
      this.weaponXP = [];
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
      };
      this.bowThreat = {
        9: 0,
        12: 0,
        13: 0,
        15: 0,
      };
      this.damageThreat = 0;
      this.inTrap = false;
      this.canEmpAnti = false;
      this.empAnti = false;
      this.soldierAnti = false;
      this.poisonTick = 0;
      this.bullTick = 0;
      this.setPoisonTick = false;
      this.setBullTick = false;
      this.antiTimer = 2;
    };

    this.resetMoveDir = function () {
      this.moveDir = undefined;
    };

    this.resetResources = function (moofoll) {
      for (let i = 0; i < config.resourceTypes.length; ++i) {
        this[config.resourceTypes[i]] = moofoll ? 100 : 0;
      }
    };

    this.getItemType = function (id) {
      let findindx = this.items.findIndex((ids) => ids == id);
      if (findindx != -1) {
        return findindx;
      } else {
        return items.checkItem.index(id, this.items);
      }
    };

    this.setData = function (data) {
      this.id = data[0];
      this.sid = data[1];
      this.name = data[2];
      this.x = data[3];
      this.y = data[4];
      this.dir = data[5];
      this.health = data[6];
      this.maxHealth = data[7];
      this.scale = data[8];
      this.skinColor = data[9];
    };

    this.updateTimer = function () {
      this.bullTimer -= 1;
      if (this.bullTimer <= 0) {
        this.setBullTick = false;
        this.bullTick = game.tick - 1;
        this.bullTimer = config.serverUpdateRate;
      }
      this.poisonTimer -= 1;
      if (this.poisonTimer <= 0) {
        this.setPoisonTick = false;
        this.poisonTick = game.tick - 1;
        this.poisonTimer = config.serverUpdateRate;
      }
    };
    this.update = function (delta) {
      if (this.active) {
        let gear = {
          skin: findID(hats, this.skinIndex),
          tail: findID(accessories, this.tailIndex),
        };
        let spdMult =
          (this.buildIndex >= 0 ? 0.5 : 1) *
          (items.weapons[this.weaponIndex].spdMult || 1) *
          (gear.skin ? gear.skin.spdMult || 1 : 1) *
          (gear.tail ? gear.tail.spdMult || 1 : 1) *
          (this.y <= config.snowBiomeTop
            ? gear.skin && gear.skin.coldM
              ? 1
              : config.snowSpeed
            : 1) *
          this.slowMult;
        this.maxSpeed = spdMult;
      }
    };

    let tmpRatio = 0;
    let animIndex = 0;
    let crazyFactor = 3;
    let waveAmplitude = Math.PI / -16;
    this.animate = function (delta) {
      if (this.animTime > 0) {
        this.animTime -= delta;
        if (this.animTime <= 0) {
          this.animTime = 0;
          this.dirPlus = 0;
          tmpRatio = 0;
          animIndex = 0;
        } else {
          if (animIndex == 0) {
            tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
            let progress = Math.min(1, tmpRatio);
            this.dirPlus =
              UTILS.lerp(0, this.targetAngle, easeInOutSine(progress)) +
              waveAmplitude * Math.sin(progress * crazyFactor * Math.PI);
            if (progress >= 1) {
              tmpRatio = 1;
              animIndex = 1;
            }
          } else {
            tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
            let progress = Math.max(0, tmpRatio);
            this.dirPlus =
              UTILS.lerp(0, this.targetAngle, easeInOutSine(progress)) +
              waveAmplitude * Math.cos(progress * crazyFactor * Math.PI);
          }
        }
      }
    };

    this.startAnim = function (didHit, index) {
      this.animTime = this.animSpeed = items.weapons[index].speed * 1.8;
      this.targetAngle = didHit ? -config.hitAngle : -Math.PI;
      tmpRatio = 0;
      animIndex = 0;
    };

    this.canSee = function (other) {
      if (!other) return false;
      let dx = Math.abs(other.x - this.x) - other.scale;
      let dy = Math.abs(other.y - this.y) - other.scale;
      return (
        dx <= (config.maxScreenWidth / 2) * 1.3 &&
        dy <= (config.maxScreenHeight / 2) * 1.3
      );
    };

    this.judgeShame = function () {
      this.lastshamecount = this.shameCount;
      if (this.oldHealth < this.health) {
        if (this.hitTime) {
          let timeSinceHit = game.tick - this.hitTime;
          this.lastHit = game.tick;
          this.hitTime = 0;
          if (timeSinceHit < 2) {
            this.shameCount++;
          } else {
            this.shameCount = Math.max(0, this.shameCount - 2);
          }
        }
      } else if (this.oldHealth > this.health) {
        this.hitTime = game.tick;
      }
    };
    this.addShameTimer = function () {
      this.shameCount = 0;
      this.shameTimer = 30;
      let interval = setInterval(() => {
        this.shameTimer--;
        if (this.shameTimer <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    };

    this.isTeam = function (tmpObj) {
      return this == tmpObj || (this.team && this.team == tmpObj.team);
    };

    this.findAllianceBySid = function (sid) {
      return this.team ? alliancePlayers.find((THIS) => THIS === sid) : null;
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
          this.reloads[53] <= (player.weapons[1] == 10 ? 0 : game.tickRate) &&
          near.skinIndex != 22
        ) {
          totally += 25;
        }
        totally *= near.skinIndex == 6 ? 0.75 : 1;
        return totally;
      }
      return 0;
    };

    this.manageReload = function () {
      if (this.shooting[53]) {
        this.shooting[53] = 0;
        this.reloads[53] = 2500 - game.tickRate;
      } else {
        if (this.reloads[53] > 0) {
          this.reloads[53] = Math.max(0, this.reloads[53] - game.tickRate);
        }
      }

      if (this.reloads[this.weaponIndex] <= 1000 / 9) {
        let index = this.weaponIndex;
        let nearObja = liztobj.filter(
          (e) =>
            (e.active || e.alive) &&
            e.health < e.maxHealth &&
            e.group !== undefined &&
            UTILS.getDist(e, player, 0, 2) <=
            items.weapons[player.weaponIndex].range + e.scale,
        );
        for (let i = 0; i < nearObja.length; i++) {
          let aaa = nearObja[i];

          let val =
            items.weapons[index].dmg *
            config.weaponVariants[
              tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]
            ].val *
            (items.weapons[index].sDmg || 1) *
            3.3;
          let valaa =
            items.weapons[index].dmg *
            config.weaponVariants[
              tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]
            ].val *
            (items.weapons[index].sDmg || 1);
          if (aaa.health - valaa <= 0 && near.length) {
            place(
              near.dist2 < near.scale * 1.8 + 50 ? 4 : 2,
              caf(aaa, player) + Math.PI,
            );
          }
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
              this.reloads[this.weaponIndex] - 110,
            );
            if (this == player) {
              if (getEl("weaponGrind").checked) {
                for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
                  checkPlace(player.getItemType(22), i);
                }
              }
            }
            if (
              this.reloads[this.primaryIndex] == 0 &&
              this.reloads[this.weaponIndex] == 0
            ) {
              this.antiBull++;
              game.tickBase(() => {
                this.antiBull = 0;
              }, 1);
            }
          }
        }
      }
    };

    this.addDamageThreat = function (tmpObj) {
      let primary = {
        weapon: this.primaryIndex,
        variant: this.primaryVariant,
      };
      primary.dmg =
        primary.weapon == undefined ? 45 : items.weapons[primary.weapon].dmg;
      let secondary = {
        weapon: this.secondaryIndex,
        variant: this.secondaryVariant,
      };
      secondary.dmg =
        secondary.weapon == undefined
          ? 75
          : items.weapons[secondary.weapon].Pdmg;
      let bull = 1.5;
      let pV =
        primary.variant != undefined
          ? config.weaponVariants[primary.variant].val
          : 1.18;
      let sV =
        secondary.variant != undefined
          ? [9, 12, 13, 15].includes(secondary.weapon)
            ? 1
            : config.weaponVariants[secondary.variant].val
          : 1.18;
      if (
        primary.weapon == undefined ? true : this.reloads[primary.weapon] == 0
      ) {
        this.damageThreat += primary.dmg * pV * bull;
      }
      if (
        secondary.weapon == undefined
          ? true
          : this.reloads[secondary.weapon] == 0
      ) {
        this.damageThreat += secondary.dmg * sV;
      }
      if (this.reloads[53] <= game.tickRate) {
        this.damageThreat += 25;
      }
      this.damageThreat *= tmpObj.skinIndex == 6 ? 0.75 : 1;
      if (!this.isTeam(tmpObj)) {
        if (this.dist2 <= 300) {
          tmpObj.damageThreat += this.damageThreat;
        }
      }
    };
  }
}

// Sine easing functions for smooth transitions
function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function sendUpgrade(index) {
  player.reloads[index] = 0;
  packet("H", index);
}

function storeEquip(id, index) {
  packet("c", 0, id, index);
}

function storeBuy(id, index) {
  packet("c", 1, id, index);
}

function buyEquip(id, index) {
  let nID = player.skins[6] ? 6 : 0;
  if (player.alive && inGame) {
    if (index == 0) {
      if (player.skins[id]) {
        if (player.latestSkin != id) {
          packet("c", 0, id, 0);
        }
      } else {
        if (configs.autoBuyEquip) {
          let find = findID(hats, id);
          if (find) {
            if (player.points >= find.price) {
              packet("c", 1, id, 0);
              packet("c", 0, id, 0);
            } else {
              if (player.latestSkin != nID) {
                packet("c", 0, nID, 0);
              }
            }
          } else {
            if (player.latestSkin != nID) {
              packet("c", 0, nID, 0);
            }
          }
        } else {
          if (player.latestSkin != nID) {
            packet("c", 0, nID, 0);
          }
        }
      }
    } else if (index == 1) {
      if (useWasd && id != 11 && id != 0) {
        if (player.latestTail != 0) {
          packet("c", 0, 0, 1);
        }
        return;
      }
      if (player.tails[id]) {
        if (player.latestTail != id) {
          packet("c", 0, id, 1);
        }
      } else {
        if (configs.autoBuyEquip) {
          let find = findID(accessories, id);
          if (find) {
            if (player.points >= find.price) {
              packet("c", 1, id, 1);
              packet("c", 0, id, 1);
            } else {
              if (player.latestTail != 0) {
                packet("c", 0, 0, 1);
              }
            }
          } else {
            if (player.latestTail != 0) {
              packet("c", 0, 0, 1);
            }
          }
        } else {
          if (player.latestTail != 0) {
            packet("c", 0, 0, 1);
          }
        }
      }
    }
  }
}

function selectToBuild(index, wpn) {
  packet("G", index, wpn);
}

function selectWeapon(index, isPlace) {
  if (!isPlace) {
    player.weaponCode = index;
  }
  packet("G", index, 1);
}

function sendAutoGather() {
  packet("K", 1, 1);
}

function sendAtck(id, angle) {
  packet("d", id, angle, 1);
}

function checkLimit(id) {
  const g = (items.list[player.items[id]] || id).group;
  if (!g) return false;
  return (player.itemCounts[g.id] || 0) >= (g.sandboxLimit || 99);
}

// Fast multi-item placement - places multiple items at once
function placeMulti(placements) {
  // placements = [{id, angle}, {id, angle}, ...]
  if (!placements || !placements.length) return;
  for (let i = 0; i < placements.length; i++) {
    const p = placements[i];
    if (p.id === undefined || checkLimit(p.id)) continue;
    const item = items.list[player.items[p.id]];
    if (!item) continue;
    selectToBuild(player.items[p.id], null);
    sendAtck(1, p.angle);
  }
  sendAtck(0, getSafeDir());
  selectWeapon(player.weaponCode, 1);
}

function place(id, angle) {
  try {
    if (id === undefined || checkLimit(id)) return;
    const item = items.list[player.items[id]];
    if (!item) return;
    const scale = player.scale + item.scale + (item.placeOffset || 0),
      x = player.x2 + player.xVel * 0.85 + Math.cos(angle) * scale,
      y = player.y2 + player.yVel * 0.85 + Math.sin(angle) * scale;
    selectToBuild(player.items[id], null);
    sendAtck(1, id != player.items[0] ? angle : undefined);
    sendAtck(0, player.buildIndex >= 0 ? getSafeDir() : null);
    if (player.buildIndex >= 0) {
      selectWeapon(player.weaponCode, 1);
    } else {
      selectWeapon(player.weaponCode, 1);
    }
    if (getEl("placeVis").checked) {
      placeVisible.push({
        type: player.items[id],
        x,
        y,
        scale: item.scale,
        name: item.name,
        dir: angle,
      });
      setTimeout(() => placeVisible.shift(), 100);
    }
  } catch { }
}

function checkPlace(itemId, angle) {
  try {
    if (itemId === undefined) return;

    const item = items.list[player.items[itemId]];
    if (!item) return;

    const tmpScale = player.scale + item.scale + (item.placeOffset || 0);
    const tmpX = player.x2 + tmpScale * Math.cos(angle);
    const tmpY = player.y2 + tmpScale * Math.sin(angle);

    if (
      objectManager.checkItemLocation(
        tmpX,
        tmpY,
        item.scale,
        0.6,
        item.id,
        false,
        player,
      )
    ) {
      place(itemId, angle, true);
    }
  } catch (error) {
    console.error("Error while checking place:", error);
  }
}

function soldierMult() {
  return player.latestSkin == 6 ? 0.75 : 1;
}

function healthBased() {
  if (player.health === 100) {
    return 0;
  }

  if (player.skinIndex !== 45 && player.skinIndex !== 56) {
    const currentItem = items.list[player.items[0]];
    if (currentItem && currentItem.healing) {
      const remainingHealth = 100 - player.health;
      const itemsNeeded = Math.ceil(remainingHealth / currentItem.healing);
      return itemsNeeded;
    } else {
      console.error("Item data missing or invalid for player's current item.");
      return -1;
    }
  }
  return 0;
}

function getAttacker(damaged) {
  let attackers = enemy.filter((tmp) => {
    let rule = {
      three: tmp.attacked,
    };
    return rule.three;
  });
  return attackers;
}

function healer() {
  if (!configs.autoHeal) return;
  const needed = healthBased();
  const shame = player.shameCount || 0;
  const maxShame = 5;

  if (shame < maxShame - 1) {
    for (let i = 0; i < needed; i++) {
      place(0, getAttackDir());
    }
  } else {
    place(0, getAttackDir());
  }
}

function healerFast() {
  if (!configs.autoHeal) return;
  const needed = healthBased();
  const shame = player.shameCount || 0;
  const inRiver =
    player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
    player.y2 <= config.mapScale / 2 + config.riverWidth / 2;
  const inSnow = player.y2 <= config.snowBiomeTop;
  const speedHat = inRiver ? 31 : inSnow ? 15 : 12;

  if (shame >= 4) {
    buyEquip(speedHat, 0);
    place(0, getAttackDir());
  } else {
    for (let i = 0; i < Math.min(needed, 3); i++) {
      place(0, getAttackDir());
    }
  }
}

function healer33() {
  if (!configs.autoHeal) return;
  for (let i = 0; i < healthBased(); i++) {
    place(0, getAttackDir());
  }
}

function healer1() {
  if (!configs.autoHeal) return;
  place(0, getAttackDir());
  return Math.ceil((100 - player.health) / items.list[player.items[0]].healing);
}

function noshameheal() {
  if (!configs.autoHeal) return;
  const shame = player.shameCount || 0;
  const inRiver =
    player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
    player.y2 <= config.mapScale / 2 + config.riverWidth / 2;
  const inSnow = player.y2 <= config.snowBiomeTop;
  const speedHat = inRiver ? 31 : inSnow ? 15 : 12;

  if (shame >= 4) {
    buyEquip(speedHat, 0);
    place(0, getAttackDir());
    return 1;
  }

  const needed = healthBased();
  for (let i = 0; i < needed; i++) {
    place(0, getAttackDir());
  }
  return needed;
}

function antiSyncHealing() {
  if (configs.autoHeal) {
    if (my.antiSync) return;
    my.antiSync = true;
    const healAnti = setInterval(() => {
      const shameCount = player.shameCount;
      const attackDirection = getAttackDir();
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
    }, game.tickRate);
  }
}

function biomeGear(mover, returns) {
  if (configs.hatCycle) return;
  if (
    player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
    player.y2 <= config.mapScale / 2 + config.riverWidth / 2
  ) {
    if (returns) return 31;
    buyEquip(31, 0);
  } else {
    if (player.y2 <= config.snowBiomeTop) {
      if (returns) return mover && player.moveDir == undefined ? 15 : 15;
      buyEquip(mover && player.moveDir == undefined ? 15 : 15, 0);
    } else {
      if (returns) return mover && player.moveDir == undefined ? 12 : 12;
      buyEquip(mover && player.moveDir == undefined ? 12 : 12, 0);
    }
  }
  if (returns) return 0;
}

// Auto-reset hat timing tracker
let lastHatChange = 0;
let hatLockUntil = 0;

function autoHats() {
  if (!player || !player.alive || !inGame) return;
  if (configs.hatCycle) return;

  const now = Date.now();

  // Hard locks - never interrupt these
  if (instaC.isTrue || instaC.ticking) return;
  if (now < hatLockUntil) return;

  // Biome detection
  const inRiver =
    player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
    player.y2 <= config.mapScale / 2 + config.riverWidth / 2;
  const inSnow = player.y2 <= config.snowBiomeTop;
  const inDesert = player.y2 >= config.mapScale - config.snowBiomeTop;

  // Combat state
  const hasEnemy = enemy.length > 0 && near;
  const inCombat = hasEnemy && near.dist2 <= 300;
  const nearEnemy = hasEnemy && near.dist2 <= 500;
  const isBreaking = autoBreaking || (player.inTrap && configs.autoBreak);

  // Enemy turret threat
  const enemyTurret = enemy.find(
    (e) => e.skinIndex === 53 && UTILS.getDist(player, e, 2, 2) <= 350,
  );

  // Skip if clicking (let combat systems handle)
  if (clicks.left || clicks.right) return;

  // Skip if breaking trap (autobreak handles hats)
  if (isBreaking && player.inTrap) return;

  // Determine correct hat and tail
  let hat = null;
  let tail = null;

  // Priority 1: Counter enemy turret
  if (enemyTurret && player.skins[53]) {
    hat = 53;
    tail = 21;
  }
  // Priority 2: In trap (not breaking)
  else if (player.inTrap && !isBreaking) {
    hat = inDesert ? 22 : 6;
    tail = 21;
  }
  // Priority 3: Combat - soldier for defense
  else if (inCombat) {
    hat = player.weapons[0] === 5 ? 11 : 6;
    tail = 21;
  }
  // Priority 4: Near enemy - ready for combat
  else if (nearEnemy) {
    hat = player.weapons[0] === 5 ? 11 : 6;
    tail = 21;
  }
  // Priority 5: Idle - biome appropriate with speed
  else {
    if (inRiver) {
      hat = 31;
    } else if (inSnow) {
      hat = 15;
    } else {
      hat = 12;
    }
    tail = 11;
  }

  // Apply hat changes with rate limiting
  if (hat !== null && player.skinIndex !== hat) {
    if (now - lastHatChange > 50) {
      buyEquip(hat, 0);
      lastHatChange = now;
    }
  }
  if (tail !== null && player.tailIndex !== tail) {
    buyEquip(tail, 1);
  }
}

// Lock hats for duration (call from insta/combat code)
function lockHats(ms) {
  hatLockUntil = Date.now() + ms;
}

function Gen(length, type = "alphanumeric") {
  const sets = {
    alphanumeric:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    symbol: "!@#$%^&*()-_=+[]{}|;:,.<>?",
  };
  const charset = sets[type] || sets.alphanumeric;
  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join("");
}

class AltSolver {
  constructor() {
    this.cores = Math.min(16, navigator.hardwareConcurrency || 8);
    this.workers = [];
    this.url = null;
  }

  init() {
    if (this.workers.length) return;
    const code = `importScripts('https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/build/sha256.min.js'); let c,s; onmessage=e=>{ if(e.data.init){({challenge:c,salt:s}=e.data); postMessage(1); return;} for(let i=e.data.a;i<=e.data.b;i++) if(sha256(s+i)===c) return postMessage(i); postMessage(0); };`;
    this.url = URL.createObjectURL(new Blob([code]));
    for (let i = 0; i < this.cores; i++)
      this.workers.push(new Worker(this.url));
  }

  async getChallenge() {
    return fetch("https://api.moomoo.io/verify").then((r) => r.json());
  }

  solve({ challenge, salt, maxnumber }) {
    this.init();
    const size = Math.ceil(maxnumber / this.cores);
    let done = 0,
      solved = false,
      t0 = performance.now();

    return new Promise((res, rej) => {
      this.workers.forEach((w, i) => {
        w.onmessage = (e) => {
          if (e.data === 1)
            w.postMessage({
              a: i * size,
              b: Math.min(maxnumber, (i + 1) * size - 1),
            });
          else if (e.data && !solved) {
            solved = true;
            res({
              challenge,
              salt,
              maxnumber,
              number: e.data,
              took: ((performance.now() - t0) / 1e3).toFixed(2),
            });
            this.cleanup();
          } else if (++done === this.workers.length && !solved) {
            rej("not solved");
            this.cleanup();
          }
        };
        w.onerror = rej;
        w.postMessage({ init: 1, challenge, salt });
      });
    });
  }

  cleanup() {
    this.workers.forEach((w) => w.terminate());
    this.workers.length = 0;
    URL.revokeObjectURL(this.url);
    this.url = null;
  }

  static payload(d, s) {
    return btoa(
      JSON.stringify({
        algorithm: "SHA-256",
        challenge: d.challenge,
        salt: d.salt,
        number: s.number,
        signature: d.signature || null,
        took: s.took,
      }),
    );
  }

  async generate() {
    const d = await this.getChallenge();
    const s = await this.solve(d);
    return (this.code = `alt:${AltSolver.payload(d, s)}`);
  }
}
// Handle chat commands
function mouseCoord() {
  return Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2);
}
function mouseWorldPos() {
  return {
    x: player.x + (mouseX - screenWidth / 2),
    y: player.y + (mouseY - screenHeight / 2),
  };
}
function mouseAimAngle() {
  const cx = screenWidth / 2;
  const cy = screenHeight / 2;
  return Math.atan2(mouseY - cy, mouseX - cx);
}
let mainSocket;
class WebsocketBot extends WebSocket {
  constructor(...args) {
    super(...args);
    this.binaryType = "arraybuffer";

    if (!mainSocket) {
      mainSocket = this;
      document.ws = this;
      this.isBot = false;
      this.addEventListener("message", async (e) => {
        let data;
        try {
          const buf =
            e.data instanceof Blob
              ? new Uint8Array(await e.data.arrayBuffer())
              : new Uint8Array(e.data);
          data = window.msgpack.decode(buf);
          if (data.length > 1 && Array.isArray(data[1]))
            data = [data[0], ...data[1]];
        } catch {
          return;
        }
        if (!data) return;
      });
    }
  }

  send(m) {
    return super.send(m);
  }
}
window.WebSocket = WebsocketBot;
var bottics = [];
async function botConnect() {
  console.log(WS);

  let altSolver = new AltSolver();
  let token = await altSolver.generate();

  let region = mainSocket.url.split("/")[2];
  let actualHost = region;

  if (region.includes(":")) {
    const [regionName, code] = region.split(":");
    actualHost = `sgs-${code.toLowerCase()}.${regionName}.moomoo.io`;
  } else if (region === "sandbox.moomoo.io") {
    actualHost = "sandbox.moomoo.io";
  }

  let url = `wss://${actualHost}/?token=${encodeURIComponent(token)}`;
  console.log(`Bot connecting to: ${url}`);

  let BOTSID;
  let client = new WebSocket(url);

  let nearObjects;
  //
  let altMovement = {
    movements: [
      0,
      // Right (D)
      Math.PI / 4,
      // Down-Right (S + D)
      Math.PI / 2,
      // Down (S)
      (Math.PI * 3) / 4,
      // Down-Left (S + A)
      Math.PI,
      // Left (A)  (same as -Math.PI)
      (Math.PI * -3) / 4,
      // Up-Left (W + A)
      -Math.PI / 2,
      // Up (W)
      -Math.PI / 4, // Up-Right (W + D)
    ],
    aimToYaw: (num) => {
      const tol = (Math.PI * 23) / 180; // ≈ 0.401 rad
      if (Math.abs(num - 0) <= tol) {
        return 0;
      } else if (Math.abs(num - Math.PI / 4) <= tol) {
        return Math.PI / 4;
      } else if (Math.abs(num - Math.PI / 2) <= tol) {
        return Math.PI / 2;
      } else if (Math.abs(num - (Math.PI * 3) / 4) <= tol) {
        return (Math.PI * 3) / 4;
      } else if (Math.abs(Math.abs(num) - Math.PI) <= tol) {
        return Math.PI;
      } else if (Math.abs(num - (Math.PI * -3) / 4) <= tol) {
        return (Math.PI * -3) / 4;
      } else if (Math.abs(num - -Math.PI / 2) <= tol) {
        return -Math.PI / 2;
      } else if (Math.abs(num - -Math.PI / 4) <= tol) {
        return -Math.PI / 4;
      } else {
        return null;
      }
    },
  };

  client.game = {
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
  };
  // Config:
  client.lastPos = { x: 0, y: 0 };
  client.stuckTicks = 0;
  client.breaking = false;
  client.sweepDir = 1;
  client.sweepYTarget = null;
  client.healCooldown = 0;
  client.ping = 0;
  client.lastPing = -1;
  client.firstOpen = false;
  client.botCount; // the bot num
  client.inGame = false;
  client.mills = {
    active: true,
    x: null,
    y: null,
    count: 0,
  };
  client.autoBreakToggle = true;
  client.autoHealToggle = true;
  client.autoPlaceToggle = true;
  client.replacerToggle = true;
  client.autoHatToggle = true;
  client.reloaded = false;
  client.hitting = false;
  client.syncing = false;
  client.synchit = false;
  // All Players/AI:
  client.Bot = {};
  let Bot = null;
  client.players = [];
  client.ais = [];
  client.enemy = [];
  client.near = {};
  client.waitHit = 0;

  // Functions:
  // movement hysteresis state
  client._lastMoveDir = null;
  client._lastMoveTime = 0;

  // tuning values (adjust if needed)
  client._moveMinDelta = 0.18; // radians (~10°)
  client._moveMinInterval = 60; // ms

  client.disconnect = function () {
    console.log(
      `Bot ${this.botCount} (SID: ${this.Bot?.sid}) disconnecting...`,
    );

    // Clear all intervals and timeouts
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.otherIntervals) {
      this.otherIntervals.forEach((intervalId) => {
        clearInterval(intervalId);
      });
      this.otherIntervals = [];
    }

    if (this.timeouts) {
      this.timeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      this.timeouts = [];
    }

    // Clear game state
    if (this.game) {
      if (this.game.tickQueue) {
        this.game.tickQueue = [];
      }
      if (this.game.tickBase) {
        this.game.tickBase = () => { };
      }
    }

    // Clear bot data
    if (this.Bot) {
      this.Bot = null;
    }
    if (this.near) {
      this.near = null;
    }
    if (this.items) {
      this.items = [];
    }
    if (this.weapons) {
      this.weapons = [];
    }

    // Remove event listeners to prevent memory leaks
    this.onmessage = null;
    this.onopen = null;
    this.onerror = null;
    this.onclose = null;

    // Close WebSocket properly
    if (this.readyState === WebSocket.OPEN) {
      try {
        this.close(1000, "Manual disconnect");
      } catch (e) {
        console.log(`Error closing bot ${this.botCount} WebSocket:`, e);
      }
    }

    // Remove from bottics array
    const index = bottics.indexOf(this);
    if (index !== -1) {
      bottics.splice(index, 1);
    }

    // Update remaining bots' numbers
    bottics.forEach((bot, idx) => {
      bot.botCount = idx + 1;
    });

    console.log(`Bot ${this.botCount} disconnected`);
    return true;
  };

  client.move = function (dir) {
    const now = performance.now();

    if (dir == null) {
      if (client._lastMoveDir != null) {
        client._lastMoveDir = null;
        client._lastMoveTime = now;
        client.sendWS("9", undefined);
      }
      return;
    }

    // first move
    if (client._lastMoveDir == null) {
      client._lastMoveDir = dir;
      client._lastMoveTime = now;
      client.sendWS("9", dir);
      return;
    }

    // angle difference (wrap-safe)
    const delta = Math.abs(UTILS.getAngleDist(client._lastMoveDir, dir));

    // send only if meaningful change OR timeout
    if (
      delta > client._moveMinDelta ||
      now - client._lastMoveTime > client._moveMinInterval
    ) {
      client._lastMoveDir = dir;
      client._lastMoveTime = now;
      client.sendWS("9", dir);
    }
  };

  client.findID = function (tmpObj, tmp) {
    return tmpObj.find((THIS) => THIS.id == tmp);
  };
  client.findSID = function (tmpObj, tmp) {
    return tmpObj.find((THIS) => THIS.sid == tmp);
  };
  client.findPlayerByID = function (id) {
    return client.findID(client.players, id);
  };
  client.findPlayerBySID = function (sid) {
    return client.findSID(client.players, sid);
  };
  client.findAIBySID = function (sid) {
    return client.findSID(client.ais, sid);
  };
  // PACKETS STUFF;
  client.selectToBuild = function (index) {
    client.sendWS("z", index, 0);
  };
  client.selectWeapon = function (index, isPlace = false) {
    if (!isPlace) {
      Bot.weaponIndex = index;
    }
    client.sendWS("z", index, 1);
  };
  client.sendAttack = function (id, angle) {
    client.sendWS("F", id, angle);
  };
  client.sendAutoGather = function () {
    client.hitting = !client.hitting;
    client.sendWS("K", 1);
  };
  client.binaryType = "arraybuffer";
  client.sendWS = function (type) {
    if (client.readyState !== WebSocket.OPEN) return;
    const data = Array.prototype.slice.call(arguments, 1);
    const binary = window.msgpack.encode([type, data]);
    if (client.nsend) client.nsend(binary);
    else WebSocket.prototype.send.call(client, binary);
  };
  client.onopen = () => {
    bottics.push(client);
    client.botCount = bottics.length;
    client.spawn();
    setInterval(() => {
      client.lastPing = Date.now();
      client.sendWS("0");
    }, 1000);
  };
  client.spawn = function () {
    client.sendWS("M", {
      name: `AB-${client.botCount}`,
      moofoll: true,
      skin: "3",
    });
    client.inGame = true;
  };

  var instakill = new (function () {
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

    // Helper functions
    this.notif = function (title, bot) {
      textManager.showText(bot.x2, bot.y2, 30, 0.18, 500, title, "white");
    };

    this.selectWeapon = function (weaponId, bot, client) {
      if (bot.weaponIndex !== weaponId) {
        client.selectWeapon(weaponId);
      }
    };

    this.sendAttack = function (angle, client) {
      if (angle !== undefined) {
        client.sendWS("d", 1, angle, 1);
      } else {
        const dir = Math.atan2(
          mouseY - screenHeight / 2,
          mouseX - screenWidth / 2,
        );
        client.sendWS("d", 1, dir, 1);
      }
    };

    this.normalInstakill = function (bot, client) {
      this.notif("Range insta", bot);
      this.isTrue = true;

      this.selectWeapon(bot.weapons[1], bot, client);
      if (
        bot.reloads[53] == 0 &&
        client.enemy.length &&
        client.enemy[0].dist2 <= 700
      ) {
        client.buyEquip(53, 0);
      } else {
        client.buyEquip(20, 0);
      }
      client.buyEquip(11, 1);
      const angle = client.updateDir();
      client.sendWS("d", 1, angle, 1);

      client.game.tickBase(() => {
        client.sendWS("d", 0, 0, 1);
        this.isTrue = false;
      }, 1);
    };

    this.spikeTickType = function (bot, client) {
      if (!this.spikeTickNotified) {
        this.notif("Spike Tick", bot);
        this.spikeTickNotified = true;
      }

      this.isTrue = true;
      this.selectWeapon(bot.weapons[0], bot, client);
      client.buyEquip(7, 0);

      const realTimeAngle = Math.atan2(
        client.near.y2 - bot.y2,
        client.near.x2 - bot.x2,
      );

      client.sendWS("d", 1, realTimeAngle, 1);

      client.game.tickBase(() => {
        client.buyEquip(53, 0);
        this.selectWeapon(bot.weapons[0], bot, client);
        client.buyEquip(53, 0);
        client.sendWS("d", 0, 0, 1);
        this.isTrue = false;
        client.buyEquip(6, 0);
        client.buyEquip(21, 1);
        client.buyEquip(6, 0);
        client.buyEquip(21, 1);

        setTimeout(() => {
          this.spikeTickNotified = false;
        }, 1000);
      }, 3);
    };
  })();
  function healthBased() {
    if (!Bot || !Bot.maxHealth) return 1;
    return Math.max(1, Math.floor((Bot.maxHealth - Bot.health) / 15));
  }

  client.botHealer = function () {
    if (!Bot || !Bot.alive) return;
    for (let i = 0; i < healthBased(); i++) {
      client.place(0, client.updateDir());
    }
  };

  client.handleBotDamage = function (damaged) {
    if (!Bot || !Bot.alive) return;

    let autoheal = false;
    let antiinsta4 = true;

    if (Bot.shameCount > 1) {
      client.buyEquip(7, 0);
      client.buyEquip(13, 1);
    } else {
      if (![1, 2, 3, 4, 5, 6].includes(Bot.lastshamecount)) {
        client.buyEquip(6, 0);
      }
    }

    if (damaged <= 66 && Bot.shameCount === 4) {
      autoheal = true;
      antiinsta4 = false;
    }

    if (
      damaged >= 20 &&
      Bot.damageThreat >= 20 &&
      antiinsta4 &&
      (!Bot.antiTimer || client.game.tick - Bot.antiTimer > 1)
    ) {
      Bot.antiTimer = client.game.tick;
      client.botHealer();
      if (autoheal) {
        setTimeout(() => client.botHealer(), 120);
      }
    } else {
      client.game.tickBase(() => client.botHealer(), 2);
    }
  };
  client.closestPossibleAngles = function (obj, id) {
    let itemId = Bot.items[id];
    if (itemId == undefined) return;
    let item = items.list[itemId];
    if (!item) return;

    let objScale =
      (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) + 0.6;
    let dx = obj.x - Bot.x2;
    let dy = obj.y - Bot.y2;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // If too far, return just the direction
    if (
      dist >
      Bot.scale + objScale + 2 * item.scale + (item.placeOffset || 0)
    ) {
      return [UTILS.getDirection(obj.x, obj.y, Bot.x2, Bot.y2)];
    }

    let D = Bot.scale + item.scale + (item.placeOffset || 0);
    let E = objScale + item.scale;
    let a = (D * D - E * E + dist * dist) / (2 * dist);
    let h = Math.sqrt(Math.max(0, D * D - a * a));
    let px = Bot.x2 + (a / dist) * dx;
    let py = Bot.y2 + (a / dist) * dy;

    let c = {
      x1: px + (h / dist) * dy,
      x2: px - (h / dist) * dy,
      y1: py - (h / dist) * dx,
      y2: py + (h / dist) * dx,
    };

    return [
      UTILS.getDirection(c.x1, c.y1, Bot.x2, Bot.y2),
      UTILS.getDirection(c.x2, c.y2, Bot.x2, Bot.y2),
    ];
  };
  client.checkItemLocation = function (x, y, scale, padding, angle, checkTrap) {
    for (const obj of gameObjects) {
      if (!obj.active) continue;

      const objScale =
        obj.blocker ||
        (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) ||
        0;

      const dist = UTILS.getDistance(x, y, obj.x, obj.y);

      const effectivePadding = scale > 30 ? padding * 0.6 : padding;

      if (dist < (scale + objScale) * effectivePadding) {
        return false;
      }
    }

    const riverMin = config.mapScale / 2 - config.riverWidth / 2;
    const riverMax = config.mapScale / 2 + config.riverWidth / 2;

    if (scale <= 30 && y >= riverMin && y <= riverMax) {
      return false;
    }

    return true;
  };
  client.checkItemLocation = function (x, y, scale, padding, angle, checkTrap) {
    for (const obj of gameObjects) {
      if (!obj.active) continue;
      const objScale =
        obj.blocker ||
        (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) ||
        0;
      const dist = UTILS.getDistance(x, y, obj.x, obj.y);
      const effPad = scale > 30 ? padding * 0.6 : padding;
      if (dist < (scale + objScale) * effPad) return false;
    }
    const riverMin = config.mapScale / 2 - config.riverWidth / 2;
    const riverMax = config.mapScale / 2 + config.riverWidth / 2;
    if (scale <= 30 && y >= riverMin && y <= riverMax) return false;
    return true;
  };

  client.getAngles = function (id, amount) {
    let item = items.list[Bot.items[id]];
    if (!item) return [];
    let result = [];
    let angleNeeded = Math.min(amount, 36);
    let tmpScale = (Bot.scale || 35) + item.scale + (item.placeOffset || 0);
    let nearObjects = gameObjects.filter(
      (e) => e.active && UTILS.getDist(e, Bot, 0, 2) <= 400,
    );
    let angleStep = (Math.PI * 2) / angleNeeded;
    let tolerance = (item.dmg ? 0.35 : 0.6) * angleStep;

    for (let i = 0; i < angleNeeded; i++) {
      let base = i * angleStep;
      let angle = base;

      for (const obj of nearObjects) {
        let arr = client.closestPossibleAngles(obj, id);
        if (!arr) continue;
        let best = arr[0];
        if (arr.length > 1) {
          let d0 = Math.abs(UTILS.getAngleDist(base, arr[0]));
          let d1 = Math.abs(UTILS.getAngleDist(base, arr[1]));
          best = d1 < d0 ? arr[1] : arr[0];
        }
        if (Math.abs(UTILS.getAngleDist(base, best)) < tolerance) {
          angle = best;
          break;
        }
      }

      let x = Bot.x2 + Math.cos(angle) * tmpScale;
      let y = Bot.y2 + Math.sin(angle) * tmpScale;

      if (client.checkItemLocation(x, y, item.scale, 0.6, angle, false)) {
        result.push(angle);
      }
    }
    return result;
  };

  client.testCanPlace = function (id, radian, replacer, trapData) {
    try {
      let idx = Bot.items[id];
      if (idx == null) return;
      let item = items.list[idx];
      if (!item || item.scale == null) return;

      const aim = radian || (client.near ? client.near.aim2 : 0);
      const isSpike = !!item.dmg;
      let placed = 0;

      let angleCount;
      if (client.near && client.near.dist2 < 200)
        angleCount = isSpike ? 18 : 12;
      else if (client.near && client.near.dist2 < 350)
        angleCount = isSpike ? 15 : 10;
      else angleCount = 8;

      let angles = client.getAngles(id, angleCount);
      if (!angles.length) return;

      angles.sort(
        (a, b) =>
          Math.abs(UTILS.getAngleDist(aim, a)) -
          Math.abs(UTILS.getAngleDist(aim, b)),
      );

      if (isSpike && client.near && client.near.dist2 < 300) {
        const ea = UTILS.getDirect(Bot, client.near, 2, 2);
        angles.sort(
          (a, b) =>
            Math.abs(UTILS.getAngleDist(ea, a)) -
            Math.abs(UTILS.getAngleDist(ea, b)),
        );
      }

      const micro = isSpike ? 0.004 : 0.008;
      const max = isSpike ? 3 : 4;

      for (const base of angles) {
        if (placed >= max) break;

        if (placeAt(base)) placed++;

        for (let i = 1; i <= 3 && placed < max; i++) {
          if (placeAt(base + micro * i)) placed++;
          if (placed >= max) break;
          if (placeAt(base - micro * i)) placed++;
        }
      }

      function placeAt(a) {
        client.place(id, a);
        return true;
      }
    } catch (e) { }
  };

  client.autoPlace = function () {
    if (gameObjects.length) {
      let near2 = { inTrap: false };
      let nearTrap = gameObjects
        .filter(
          (e) =>
            e.trap &&
            e.active &&
            e.isTeamObject(Bot) &&
            UTILS.getDist(e, client.near, 0, 2) <=
            client.near.scale + e.getScale() + 5,
        )
        .sort(
          (a, b) =>
            UTILS.getDist(a, client.near, 0, 2) -
            UTILS.getDist(b, client.near, 0, 2),
        )[0];

      if (nearTrap) {
        near2.inTrap = true;
      }

      if (client.near.dist3 <= 450) {
        if (client.near.dist3 <= 250) {
          const forwardDir = Bot.moveDir ?? client.near.aim2;
          const aimDiff = Math.abs(
            UTILS.getAngleDist(client.near.aim2, forwardDir),
          );
          const placingForward = aimDiff < Math.PI / 2;

          if (near2.inTrap) {
            if (placingForward) {
              // Dynamic spike placement around player
              const item = items.list[2]; // Spike item
              const tmpS = Bot.scale + item.scale + (item.placeOffset || 0);
              const angleStep = Math.PI / 18; // 10-degree steps
              let placedCount = 0;
              const maxPlace = 2;

              for (let i = 0; i < 36 && placedCount < maxPlace; i++) {
                const testAngle = i * angleStep;
                const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
                const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

                if (
                  objectManager.checkItemLocation(
                    tmpX,
                    tmpY,
                    item.scale,
                    0.6,
                    item.id,
                    false,
                    Bot,
                  )
                ) {
                  let canPlace = true;
                  gameObjects.forEach((tmp) => {
                    if (
                      tmp.active &&
                      UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                      item.scale +
                      (tmp.blocker
                        ? tmp.blocker
                        : tmp.getScale(0.6, tmp.isItem))
                    ) {
                      canPlace = false;
                    }
                  });

                  if (canPlace) {
                    client.place(2, testAngle);
                    placedCount++;
                  }
                }
              }
              return;
            }

            // Dynamic back placement
            const backDir = forwardDir + Math.PI;
            const item = items.list[2];
            const tmpS = Bot.scale + item.scale + (item.placeOffset || 0);
            const angleStep = Math.PI / 24; // 7.5-degree steps for precision
            let placedCount = 0;
            const maxPlace = 3;

            for (let i = -4; i <= 4 && placedCount < maxPlace; i++) {
              const testAngle = backDir + i * angleStep;
              const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
              const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

              if (
                objectManager.checkItemLocation(
                  tmpX,
                  tmpY,
                  item.scale,
                  0.6,
                  item.id,
                  false,
                  Bot,
                )
              ) {
                let canPlace = true;
                gameObjects.forEach((tmp) => {
                  if (
                    tmp.active &&
                    UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                    item.scale +
                    (tmp.blocker
                      ? tmp.blocker
                      : tmp.getScale(0.6, tmp.isItem))
                  ) {
                    canPlace = false;
                  }
                });

                if (canPlace) {
                  client.place(2, testAngle);
                  placedCount++;
                }
              }
            }
          } else {
            // Dynamic push spike placement
            const enemyToTrapAngle = nearTrap
              ? Math.atan2(
                nearTrap.y - client.near.y2,
                nearTrap.x - client.near.x2,
              )
              : client.near.aim2;

            const item = items.list[2];
            const tmpS =
              client.near.scale + item.scale + (item.placeOffset || 0);
            const angleStep = Math.PI / 12; // 15-degree steps
            let placedCount = 0;
            const maxPlace = 2;

            for (let i = 0; i < 24 && placedCount < maxPlace; i++) {
              const testAngle = enemyToTrapAngle + i * angleStep - Math.PI;
              const tmpX = client.near.x2 + tmpS * Math.cos(testAngle);
              const tmpY = client.near.y2 + tmpS * Math.sin(testAngle);

              const angleToMovement = Math.abs(
                UTILS.getAngleDist(forwardDir, testAngle),
              );
              const notBlockingPath = angleToMovement > Math.PI / 3;

              if (
                notBlockingPath &&
                objectManager.checkItemLocation(
                  tmpX,
                  tmpY,
                  item.scale,
                  0.6,
                  item.id,
                  false,
                  Bot,
                )
              ) {
                let canPlace = true;
                gameObjects.forEach((tmp) => {
                  if (
                    tmp.active &&
                    UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                    item.scale +
                    (tmp.blocker
                      ? tmp.blocker
                      : tmp.getScale(0.6, tmp.isItem))
                  ) {
                    canPlace = false;
                  }
                });

                if (canPlace) {
                  client.place(2, testAngle);
                  placedCount++;
                }
              }
            }

            // Dynamic boost placement
            if (Bot.items[4]) {
              const boostItem = items.list[Bot.items[4]];
              const boostTmpS =
                Bot.scale + boostItem.scale + (boostItem.placeOffset || 0);
              let boostPlaced = 0;

              for (let i = 0; i < 8 && boostPlaced < 2; i++) {
                const testAngle = forwardDir + (i * Math.PI) / 4 - Math.PI / 2;
                const tmpX = Bot.x2 + boostTmpS * Math.cos(testAngle);
                const tmpY = Bot.y2 + boostTmpS * Math.sin(testAngle);

                if (
                  objectManager.checkItemLocation(
                    tmpX,
                    tmpY,
                    boostItem.scale,
                    0.6,
                    boostItem.id,
                    false,
                    Bot,
                  )
                ) {
                  let canPlace = true;
                  gameObjects.forEach((tmp) => {
                    if (
                      tmp.active &&
                      UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                      boostItem.scale +
                      (tmp.blocker
                        ? tmp.blocker
                        : tmp.getScale(0.6, tmp.isItem))
                    ) {
                      canPlace = false;
                    }
                  });

                  if (canPlace) {
                    client.place(4, testAngle);
                    boostPlaced++;
                  }
                }
              }
            }
          }
        } else {
          if (Bot.items[4] === 15) {
            // Dynamic mill placement
            const millItem = items.list[15];
            const millTmpS =
              Bot.scale + millItem.scale + (millItem.placeOffset || 0);
            const angleStep = Math.PI / 16; // 11.25-degree steps
            let placedCount = 0;
            const maxPlace = 2;

            for (let i = 0; i < 32 && placedCount < maxPlace; i++) {
              const testAngle = client.near.aim2 + i * angleStep - Math.PI;
              const tmpX = Bot.x2 + millTmpS * Math.cos(testAngle);
              const tmpY = Bot.y2 + millTmpS * Math.sin(testAngle);

              if (
                objectManager.checkItemLocation(
                  tmpX,
                  tmpY,
                  millItem.scale,
                  0.6,
                  millItem.id,
                  false,
                  Bot,
                )
              ) {
                let canPlace = true;
                gameObjects.forEach((tmp) => {
                  if (
                    tmp.active &&
                    UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                    millItem.scale +
                    (tmp.blocker
                      ? tmp.blocker
                      : tmp.getScale(0.6, tmp.isItem))
                  ) {
                    canPlace = false;
                  }
                });

                if (canPlace) {
                  client.place(4, testAngle);
                  placedCount++;
                }
              }
            }
          }
        }
      }
    }
  };

  client.botAutoPush = function () {
    if (!client.near) return;

    let nearTrap = gameObjects
      .filter(
        (tmp) =>
          tmp.trap &&
          tmp.active &&
          tmp.isTeamObject(Bot) &&
          UTILS.getDist(tmp, client.near, 0, 2) <=
          client.near.scale + tmp.getScale() + 5,
      )
      .sort(function (a, b) {
        return (
          UTILS.getDist(a, client.near, 0, 2) -
          UTILS.getDist(b, client.near, 0, 2)
        );
      })[0];

    if (nearTrap) {
      let spike = gameObjects
        .filter(
          (tmp) =>
            (tmp.dmg ||
              (tmp.type == 1 &&
                tmp.y >= config.mapScale - config.snowBiomeTop)) &&
            tmp.active &&
            !tmp.isTeamObject(client.near) &&
            UTILS.getDist(tmp, nearTrap, 0, 0) <=
            client.near.scale + nearTrap.scale + tmp.scale,
        )
        .sort(function (a, b) {
          return (
            UTILS.getDist(a, client.near, 0, 2) -
            UTILS.getDist(b, client.near, 0, 2)
          );
        })[0];

      if (spike) {
        let pushAngle = Math.atan2(
          client.near.y2 - spike.y,
          client.near.x2 - spike.x,
        );

        let point = {
          x: client.near.x2 + Math.cos(pushAngle) * 30,
          y: client.near.y2 + Math.sin(pushAngle) * 60,
        };

        let dir = Math.atan2(point.y - Bot.y2, point.x - Bot.x2);

        client.sendWS("9", dir, 1);
      }
    }
  };

  client.botAutoPlace = function () {
    if (!gameObjects.length) return;

    let near2 = { inTrap: false };
    let nearTrap = gameObjects
      .filter(
        (e) =>
          e.trap &&
          e.active &&
          e.isTeamObject(Bot) &&
          UTILS.getDist(e, client.near, 0, 2) <=
          client.near.scale + e.getScale() + 5,
      )
      .sort(
        (a, b) =>
          UTILS.getDist(a, client.near, 0, 2) -
          UTILS.getDist(b, client.near, 0, 2),
      )[0];

    if (nearTrap) {
      near2.inTrap = true;
    }

    if (client.near.dist3 <= 450) {
      if (client.near.dist3 <= 250) {
        const forwardDir = Bot.moveDir ?? client.near.aim2;
        const aimDiff = Math.abs(
          UTILS.getAngleDist(client.near.aim2, forwardDir),
        );
        const placingForward = aimDiff < Math.PI / 2;

        if (near2.inTrap) {
          if (placingForward) {
            const item = items.list[2];
            const tmpS = Bot.scale + item.scale + (item.placeOffset || 0);
            const angleStep = Math.PI / 18;
            let placedCount = 0;
            const maxPlace = 2;

            for (let i = 0; i < 36 && placedCount < maxPlace; i++) {
              const testAngle = i * angleStep;
              const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
              const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

              if (
                objectManager.checkItemLocation(
                  tmpX,
                  tmpY,
                  item.scale,
                  0.6,
                  item.id,
                  false,
                  Bot,
                )
              ) {
                let canPlace = true;
                gameObjects.forEach((tmp) => {
                  if (
                    tmp.active &&
                    UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                    item.scale +
                    (tmp.blocker
                      ? tmp.blocker
                      : tmp.getScale(0.6, tmp.isItem))
                  ) {
                    canPlace = false;
                  }
                });

                if (canPlace) {
                  client.place(2, testAngle);
                  placedCount++;
                }
              }
            }
            return;
          }

          // Dynamic back placement - relative to bot's movement
          const backDir = forwardDir + Math.PI;
          const item = items.list[2];
          const tmpS = Bot.scale + item.scale + (item.placeOffset || 0);
          const angleStep = Math.PI / 24; // 7.5-degree steps for precision
          let placedCount = 0;
          const maxPlace = 3;

          for (let i = -4; i <= 4 && placedCount < maxPlace; i++) {
            const testAngle = backDir + i * angleStep;
            const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
            const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

            if (
              objectManager.checkItemLocation(
                tmpX,
                tmpY,
                item.scale,
                0.6,
                item.id,
                false,
                Bot,
              )
            ) {
              let canPlace = true;
              gameObjects.forEach((tmp) => {
                if (
                  tmp.active &&
                  UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                  item.scale +
                  (tmp.blocker
                    ? tmp.blocker
                    : tmp.getScale(0.6, tmp.isItem))
                ) {
                  canPlace = false;
                }
              });

              if (canPlace) {
                client.place(2, testAngle);
                placedCount++;
              }
            }
          }
        } else {
          // Dynamic push spike placement - around bot's position
          const botToEnemyAngle = Math.atan2(
            client.near.y2 - Bot.y2,
            client.near.x2 - Bot.x2,
          );

          const item = items.list[2];
          const tmpS = Bot.scale + item.scale + (item.placeOffset || 0);
          const angleStep = Math.PI / 12; // 15-degree steps
          let placedCount = 0;
          const maxPlace = 2;

          for (let i = 0; i < 24 && placedCount < maxPlace; i++) {
            const testAngle = botToEnemyAngle + i * angleStep - Math.PI;
            const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
            const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

            const angleToMovement = Math.abs(
              UTILS.getAngleDist(forwardDir, testAngle),
            );
            const notBlockingPath = angleToMovement > Math.PI / 3;

            if (
              notBlockingPath &&
              objectManager.checkItemLocation(
                tmpX,
                tmpY,
                item.scale,
                0.6,
                item.id,
                false,
                Bot,
              )
            ) {
              let canPlace = true;
              gameObjects.forEach((tmp) => {
                if (
                  tmp.active &&
                  UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                  item.scale +
                  (tmp.blocker
                    ? tmp.blocker
                    : tmp.getScale(0.6, tmp.isItem))
                ) {
                  canPlace = false;
                }
              });

              if (canPlace) {
                client.place(2, testAngle);
                placedCount++;
              }
            }
          }

          // Dynamic boost placement - around bot
          if (Bot.items[4]) {
            const boostItem = items.list[Bot.items[4]];
            const boostTmpS =
              Bot.scale + boostItem.scale + (boostItem.placeOffset || 0);
            let boostPlaced = 0;

            for (let i = 0; i < 8 && boostPlaced < 2; i++) {
              const testAngle = forwardDir + (i * Math.PI) / 4 - Math.PI / 2;
              const tmpX = Bot.x2 + boostTmpS * Math.cos(testAngle);
              const tmpY = Bot.y2 + boostTmpS * Math.sin(testAngle);

              if (
                objectManager.checkItemLocation(
                  tmpX,
                  tmpY,
                  boostItem.scale,
                  0.6,
                  boostItem.id,
                  false,
                  Bot,
                )
              ) {
                let canPlace = true;
                gameObjects.forEach((tmp) => {
                  if (
                    tmp.active &&
                    UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                    boostItem.scale +
                    (tmp.blocker
                      ? tmp.blocker
                      : tmp.getScale(0.6, tmp.isItem))
                  ) {
                    canPlace = false;
                  }
                });

                if (canPlace) {
                  client.place(4, testAngle);
                  boostPlaced++;
                }
              }
            }
          }
        }
      } else {
        if (Bot.items[4] === 15) {
          // Dynamic mill placement - around bot's position
          const millItem = items.list[15];
          const millTmpS =
            Bot.scale + millItem.scale + (millItem.placeOffset || 0);
          const angleStep = Math.PI / 16; // 11.25-degree steps
          let placedCount = 0;
          const maxPlace = 2;

          for (let i = 0; i < 32 && placedCount < maxPlace; i++) {
            const testAngle = i * angleStep; // Full circle around bot
            const tmpX = Bot.x2 + millTmpS * Math.cos(testAngle);
            const tmpY = Bot.y2 + millTmpS * Math.sin(testAngle);

            if (
              objectManager.checkItemLocation(
                tmpX,
                tmpY,
                millItem.scale,
                0.6,
                millItem.id,
                false,
                Bot,
              )
            ) {
              let canPlace = true;
              gameObjects.forEach((tmp) => {
                if (
                  tmp.active &&
                  UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                  millItem.scale +
                  (tmp.blocker
                    ? tmp.blocker
                    : tmp.getScale(0.6, tmp.isItem))
                ) {
                  canPlace = false;
                }
              });

              if (canPlace) {
                client.place(4, testAngle);
                placedCount++;
              }
            }
          }
        }
      }
    }
  };

  client.botAutoHeal = function () {
    if (!Bot || !Bot.alive) return;

    const health = Bot.health;
    const maxHealth = 100;

    if (health < maxHealth * 0.8 && Bot.items[0]) {
      const foodItem = items.list[Bot.items[0]];
      if (foodItem && foodItem.heal) {
        client.place(Bot.items.indexOf(0), 0);
      }
    }
  };

  client.botAutoBuy = function () {
    if (!Bot || !Bot.alive) return;

    // Buy basic hats and accessories
    if (Bot.points >= 100 && !Bot.skins[40]) {
      client.sendWS("c", 1, 40, 0); // Soldier helmet
    }
    if (Bot.points >= 300 && !Bot.skins[6]) {
      client.sendWS("c", 1, 6, 0); // Bull helmet
    }
  };

  client.botAutoPush = function () {
    if (!client.near) return;

    let nearTrap = gameObjects
      .filter(
        (tmp) =>
          tmp.trap &&
          tmp.active &&
          tmp.isTeamObject(Bot) &&
          UTILS.getDist(tmp, client.near, 0, 2) <=
          client.near.scale + tmp.getScale() + 5,
      )
      .sort(function (a, b) {
        return (
          UTILS.getDist(a, client.near, 0, 2) -
          UTILS.getDist(b, client.near, 0, 2)
        );
      })[0];

    if (nearTrap) {
      let spike = gameObjects
        .filter(
          (tmp) =>
            (tmp.dmg ||
              (tmp.type == 1 &&
                tmp.y >= config.mapScale - config.snowBiomeTop)) &&
            tmp.active &&
            !tmp.isTeamObject(client.near) &&
            UTILS.getDist(tmp, nearTrap, 0, 0) <=
            client.near.scale + nearTrap.scale + tmp.scale,
        )
        .sort(function (a, b) {
          return (
            UTILS.getDist(a, client.near, 0, 2) -
            UTILS.getDist(b, client.near, 0, 2)
          );
        })[0];

      if (spike) {
        let pushAngle = Math.atan2(
          client.near.y2 - spike.y,
          client.near.x2 - spike.x,
        );

        let point = {
          x: client.near.x2 + Math.cos(pushAngle) * 30,
          y: client.near.y2 + Math.sin(pushAngle) * 60,
        };

        let dir = Math.atan2(point.y - Bot.y2, point.x - Bot.x2);

        client.sendWS("9", dir, 1);
      }
    }
  };

  client.replacer = function (findObj) {
    if (!client.enemy.length || !client.near) return;
    if (client.near.dist2 > 600) return;

    if (!findObj || !client.near) return;

    const objDist = UTILS.getDist(findObj, Bot, 0, 2);
    if (objDist > 350) return;

    const enemyToObjDist = UTILS.getDist(findObj, client.near, 0, 2);
    if (enemyToObjDist > 400) return;

    const enemyAngle = UTILS.getDirect(client.near, Bot, 2, 2);

    if (findObj && findObj.health < 280) {
      const spikePriorities = [9, 8, 7, 6];
      let spikeSlot = -1;

      for (const itemID of spikePriorities) {
        spikeSlot = Bot.items.findIndex((slotID) => slotID === itemID);
        if (spikeSlot !== -1) break;
      }

      if (spikeSlot !== -1 && client.near.dist2 <= 350) {
        // Dynamic spike placement around broken object
        const item = items.list[Bot.items[spikeSlot]];
        const tmpS = findObj.scale + item.scale + (item.placeOffset || 0);
        const angleStep = Math.PI / 16; // 11.25-degree steps
        let placedCount = 0;
        const maxPlace = 2;

        for (let i = 0; i < 32 && placedCount < maxPlace; i++) {
          const testAngle = i * angleStep;
          const tmpX = findObj.x + tmpS * Math.cos(testAngle);
          const tmpY = findObj.y + tmpS * Math.sin(testAngle);

          const angleToEnemy = Math.abs(
            UTILS.getAngleDist(enemyAngle, testAngle),
          );
          const goodForEnemy = angleToEnemy < Math.PI / 2;

          if (
            goodForEnemy &&
            objectManager.checkItemLocation(
              tmpX,
              tmpY,
              item.scale,
              0.6,
              item.id,
              false,
              Bot,
            )
          ) {
            let canPlace = true;
            gameObjects.forEach((tmp) => {
              if (
                tmp.active &&
                UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                item.scale +
                (tmp.blocker ? tmp.blocker : tmp.getScale(0.6, tmp.isItem))
              ) {
                canPlace = false;
              }
            });

            if (canPlace) {
              client.place(spikeSlot, testAngle);
              placedCount++;
            }
          }
        }

        if (client.near.dist2 <= 180 && instakill) {
          instakill.canSpikeTick = true;
          setTimeout(() => {
            if (instakill.canSpikeTick) {
              instakill.spikeTickType(Bot, client);
              instakill.canSpikeTick = false;
            }
          }, 0);
        }
        return;
      }
    }

    if (objDist <= 300 && client.near.dist2 <= 450) {
      const weaponRange =
        items.weapons[client.near.primaryIndex || 5]?.range || 0;
      const canEnemyHit =
        enemyToObjDist <= weaponRange + client.near.scale * 1.8;

      if (canEnemyHit) {
        const trapPriorities = [15, 12, 11, 10];
        let trapSlot = -1;

        for (const itemID of trapPriorities) {
          trapSlot = Bot.items.findIndex((slotID) => slotID === itemID);
          if (trapSlot !== -1) break;
        }

        if (trapSlot !== -1) {
          // Dynamic trap placement around object
          const item = items.list[Bot.items[trapSlot]];
          const tmpS = findObj.scale + item.scale + (item.placeOffset || 0);
          const angleStep = Math.PI / 12; // 15-degree steps
          let placedCount = 0;
          const maxPlace = 1;

          for (let i = 0; i < 24 && placedCount < maxPlace; i++) {
            const testAngle = enemyAngle + i * angleStep - Math.PI;
            const tmpX = findObj.x + tmpS * Math.cos(testAngle);
            const tmpY = findObj.y + tmpS * Math.sin(testAngle);

            if (
              objectManager.checkItemLocation(
                tmpX,
                tmpY,
                item.scale,
                0.6,
                item.id,
                false,
                Bot,
              )
            ) {
              let canPlace = true;
              gameObjects.forEach((tmp) => {
                if (
                  tmp.active &&
                  UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                  item.scale +
                  (tmp.blocker
                    ? tmp.blocker
                    : tmp.getScale(0.6, tmp.isItem))
                ) {
                  canPlace = false;
                }
              });

              if (canPlace) {
                client.place(trapSlot, testAngle);
                placedCount++;
              }
            }
          }
        }
      }
    }
  };

  // AutoBuy:
  client.AutoBuy = class {
    constructor(items) {
      this.items = items;
    }
    buyNext() {
      for (const [id, type] of this.items) {
        const find = type == 0 ? findID(hats, id) : findID(accessories, id);
        const isOwned = type == 0 ? Bot.skins[id] : Bot.tails[id];
        if (!find || isOwned) continue;
        if (Bot.points >= find.price) {
          client.sendWS("c", 1, id, type);
          return;
        }
        return;
      }
    }
  };
  client.autoBuy = new client.AutoBuy([
    [11, 1],
    [40, 0],
    [6, 0],
    [7, 0],
    [31, 0],
    [15, 0],
    [19, 1],
    [22, 0],
    [53, 0],
    [12, 0],
    [20, 0],
    [10, 0],
    [56, 0],
    [21, 1],
    [11, 0],
    [26, 0],
    [18, 1],
    [13, 1],
  ]);
  // BuyEquip Or autoHatAcc:
  client.buyEquip = function (id, index, extra = 0) {
    let nID = extra;
    if (Bot.alive) {
      if (index == 0) {
        if (Bot.skins[id]) {
          if (Bot.latestSkin != id) {
            client.sendWS("c", 0, id, 0);
          }
        } else {
          let find = findID(hats, id);
          if (find) {
            if (Bot.points >= find.price) {
              client.sendWS("c", 1, id, 0);
              client.sendWS("c", 0, id, 0);
            } else if (Bot.latestSkin != nID) {
              client.sendWS("c", 0, nID, 0);
            }
          } else if (Bot.latestSkin != nID) {
            client.sendWS("c", 0, nID, 0);
          }
        }
      } else if (index == 1) {
        if (Bot.tails[id]) {
          if (Bot.latestTail != id) {
            client.sendWS("c", 0, id, 1);
          }
        } else {
          let find = findID(accessories, id);
          if (find) {
            if (Bot.points >= find.price) {
              client.sendWS("c", 1, id, 1);
              client.sendWS("c", 0, id, 1);
            } else if (Bot.latestTail != 0) {
              client.sendWS("c", 0, 0, 1);
            }
          } else if (Bot.latestTail != 0) {
            client.sendWS("c", 0, 0, 1);
          }
        }
      }
    }
  };
  client.hatChanger = function () {
    if (
      Bot.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
      Bot.y2 <= config.mapScale / 2 + config.riverWidth / 2
    ) {
      client.buyEquip(31, 0);
    } else if (Bot.y2 <= config.snowBiomeTop) {
      client.buyEquip(15, 0);
    } else {
      client.buyEquip(12, 0);
    }
    client.buyEquip(11, 1);
  };
  //placesad:
  client.place = function (id, angle) {
    try {
      let item = items.list[Bot.items[id]];
      if (
        Bot.itemCounts[item.group.id] == undefined
          ? true
          : Bot.itemCounts[item.group.id] <
          (config.isSandbox
            ? id === 3 || id === 5
              ? 299
              : 99
            : item.group.limit
              ? item.group.limit
              : 99)
      ) {
        client.sendWS("z", Bot.items[id]);
        client.sendWS("F", 1, angle);
        client.sendWS("F", 0, angle);
        client.sendWS("z", Bot.weaponIndex, true);
      }
    } catch (e) { }
  };
  client.autoMill = function () {
    if (client.breaking) return;
    if (!configs.botMills) return;

    const baseDir = UTILS.getDirect(Bot.oldPos || Bot, Bot, 2, 2);
    const spread = 1.4;
    const angles = [-spread, 0, spread];

    for (let i = 0; i < angles.length; i++) {
      client.place(3, baseDir + angles[i]);
    }
  };
  //AHHHHHH
  client.optimisingAutoReloadFunction = function (weaponIndex) {
    return Bot.reloads[weaponIndex] > 0;
  };
  client.optimisingAutoReloadFunction_2 = function (weaponIndex) {
    return Bot.weaponIndex != weaponIndex || Bot.buildIndex > -1;
  };

  client.followPlayer = function () {
    if (!player || !Bot || !Bot.alive) return undefined;

    const SAFE_DIST = 100;
    const MIN_DIST = 100;
    const MAX_DIST = 100;

    const dx = player.x2 - Bot.x2;
    const dy = player.y2 - Bot.y2;
    const dist = Math.hypot(dx, dy);

    if (dist < MIN_DIST) {
      return Math.atan2(-dy, -dx);
    }

    if (dist > MAX_DIST) {
      return Math.atan2(dy, dx);
    }
  };

  client.isInRiver = function () {
    if (!Bot) return false;
    const riverMin = config.mapScale / 2 - config.riverWidth / 2;
    const riverMax = config.mapScale / 2 + config.riverWidth / 2;
    return Bot.y2 >= riverMin && Bot.y2 <= riverMax;
  };

  client.updateMoveDir = function (debug) {
    if (debug) return debug;
    if (!client.Bot || !client.Bot.alive) return undefined;
    const Bot = client.Bot;

    // Bot autopush logic - takes priority over other movement
    if (client.near) {
      // Find all nearby team traps
      let nearTraps = gameObjects
        .filter(
          (tmp) =>
            tmp.trap &&
            tmp.active &&
            tmp.isTeamObject(Bot) &&
            UTILS.getDist(tmp, client.near, 0, 2) <=
            client.near.scale + tmp.getScale() + 100, // Increased range for multiple traps
        )
        .sort(function (a, b) {
          return (
            UTILS.getDist(a, client.near, 0, 2) -
            UTILS.getDist(b, client.near, 0, 2)
          );
        });

      if (nearTraps.length > 0) {
        // Check for retrap opportunities on all nearby traps
        nearTraps.forEach((trap) => {
          if (trap.health < 150 && trap.health > 0) {
            // Predict trap break and prepare retrap
            const predictedBreakTime = trap.health / 15;
            setTimeout(() => {
              if (trap.health <= 0 && client.near) {
                // Trap broke, move to perfect retrap position
                const retrapAngle = Math.atan2(
                  client.near.y2 - Bot.y2,
                  client.near.x2 - Bot.x2,
                );
                const retrapDistance = client.near.scale + 60;

                // Calculate perfect retrap position
                const retrapX =
                  client.near.x2 + Math.cos(retrapAngle) * retrapDistance;
                const retrapY =
                  client.near.y2 + Math.sin(retrapAngle) * retrapDistance;

                // Move to retrap position
                const moveDir = Math.atan2(retrapY - Bot.y2, retrapX - Bot.x2);
                Bot.moveDir = moveDir;

                // Place trap when in position
                setTimeout(() => {
                  const distToRetrapPos = Math.sqrt(
                    Math.pow(Bot.x2 - retrapX, 2) +
                    Math.pow(Bot.y2 - retrapY, 2),
                  );

                  if (distToRetrapPos <= 50 && Bot.items && Bot.items[4]) {
                    const placeAngle = Math.atan2(
                      client.near.y2 - Bot.y2,
                      client.near.x2 - Bot.x2,
                    );
                    // Bot place trap logic would go here
                    // For now, just show notification
                    textManager.showText(
                      Bot.x2,
                      Bot.y2,
                      30,
                      0.18,
                      500,
                      "bot-retrap",
                      "#ff00ff",
                    );
                  }
                }, 200);
              }
            }, predictedBreakTime * 50);
          }
        });

        // Check for chain pushing opportunities
        for (let i = 0; i < nearTraps.length; i++) {
          let currentTrap = nearTraps[i];

          // Find spikes near this trap
          let spikes = gameObjects
            .filter(
              (tmp) =>
                (tmp.dmg ||
                  (tmp.type == 1 &&
                    tmp.y >= config.mapScale - config.snowBiomeTop)) &&
                tmp.active &&
                !tmp.isTeamObject(client.near) &&
                UTILS.getDist(tmp, currentTrap, 0, 0) <=
                client.near.scale + currentTrap.scale + tmp.scale + 20, // Slightly larger range
            )
            .sort(function (a, b) {
              return (
                UTILS.getDist(a, client.near, 0, 2) -
                UTILS.getDist(b, client.near, 0, 2)
              );
            });

          if (spikes.length > 0) {
            let spike = spikes[0];
            let pushAngle = Math.atan2(
              client.near.y2 - spike.y,
              client.near.x2 - spike.x,
            );

            // Check if we can push to another trap
            let targetTrap = null;
            for (let j = i + 1; j < nearTraps.length; j++) {
              let nextTrap = nearTraps[j];
              let trapToTrapDist = UTILS.getDist(currentTrap, nextTrap, 0, 0);

              // Check if traps are close enough for chain push (increased range)
              if (trapToTrapDist <= 250) {
                // Increased chain push range
                let angleToNextTrap = Math.atan2(
                  nextTrap.y - currentTrap.y,
                  nextTrap.x - currentTrap.x,
                );

                // Check if spike is positioned to push towards next trap
                let spikeToNextTrapAngle = Math.atan2(
                  nextTrap.y - spike.y,
                  nextTrap.x - spike.x,
                );

                let angleDiff = Math.abs(
                  UTILS.getAngleDist(pushAngle, spikeToNextTrapAngle),
                );

                // More lenient angle check (increased from 45 to 90 degrees)
                if (angleDiff < Math.PI / 2) {
                  // Within 90 degrees
                  targetTrap = nextTrap;
                  console.log("Player chain push opportunity found!");
                  break;
                }
              }
            }

            let point;
            if (targetTrap) {
              // Push towards the next trap in the chain
              let chainAngle = Math.atan2(
                targetTrap.y - spike.y,
                targetTrap.x - spike.x,
              );
              point = {
                x: spike.x + Math.cos(chainAngle) * 60,
                y: spike.y + Math.sin(chainAngle) * 60,
              };
            } else {
              // Normal push away from spike
              point = {
                x: client.near.x2 + Math.cos(pushAngle) * 30,
                y: client.near.y2 + Math.sin(pushAngle) * 60,
              };
            }

            let dir = Math.atan2(point.y - Bot.y2, point.x - Bot.x2);

            // Store autopush direction and return it
            Bot.moveDir = dir;
            return Bot.moveDir;
          }
        }
      }
    }

    if (client.synchit && client.syncMoveDir != null) return client.syncMoveDir;
    const px = Bot.x2;
    const py = Bot.y2;
    const lastX = client.lastPos?.x ?? px;
    const lastY = client.lastPos?.y ?? py;
    const moveDist = Math.hypot(px - lastX, py - lastY);
    client.lastPos = { x: px, y: py };
    const speedMult = Bot.spdMult || 1;
    if (moveDist < Math.max(1.5, 2.2 * speedMult)) client.stuckTicks++;
    else client.stuckTicks = 0;
    if (client.breaking && Bot.moveDir !== undefined) {
      return Bot.moveDir;
    }
    const riverMin = config.mapScale / 2 - config.riverWidth / 2;
    const riverMax = config.mapScale / 2 + config.riverWidth / 2;
    const inRiver = py >= riverMin && py <= riverMax;
    let targetX, targetY;
    if (configs.mouseMove) {
      const m = mouseWorldPos();
      targetX = m.x;
      targetY = m.y;
    } else if (configs.botCircle) {
      let i = bottics.indexOf(client);
      let n = bottics.length;
      let ang = (2 * Math.PI * i) / n;
      let rad = 400;
      targetX = player.x2 + rad * Math.cos(ang);
      targetY = player.y2 + rad * Math.sin(ang);
    } else if (configs.botMills && !inRiver && (!player || !player.alive)) {
      if (!Bot.moveDir || client.stuckTicks > 6) {
        Bot.moveDir = Math.random() * Math.PI * 2 - Math.PI;
        client.stuckTicks = 0;
      }

      const avoidObj = gameObjects.find((obj) => {
        if (!obj.active || obj.ignoreCollision) return false;
        if (typeof obj.isTeamObject === "function" && obj.isTeamObject(Bot))
          return false;
        const d = UTILS.getDist(obj, Bot, 0, 2);
        return d > 0 && d < 180;
      });
      if (avoidObj) {
        const objAngle = Math.atan2(avoidObj.y - py, avoidObj.x - px);
        const diff = UTILS.getAngleDist(Bot.moveDir, objAngle);
        Bot.moveDir += diff >= 0 ? -0.6 : 0.6;
      }

      const wanderDist = Math.max(110, 150 * speedMult);
      targetX = px + Math.cos(Bot.moveDir) * wanderDist;
      targetY = py + Math.sin(Bot.moveDir) * wanderDist;
    } else {
      const dxp = player.x2 - px;
      const dyp = player.y2 - py;
      const distp = Math.hypot(dxp, dyp);
      const minDist = 70 * speedMult;
      const maxDist = 140 * speedMult;
      if (distp > minDist && distp < maxDist) {
        Bot.moveDir = undefined;
        return undefined;
      }
      if (distp <= minDist) {
        targetX = player.x2 - dxp * 2;
        targetY = player.y2 - dyp * 2;
      } else {
        targetX = player.x2;
        targetY = player.y2;
      }
    }
    if (typeof targetX !== "number" || typeof targetY !== "number") {
      Bot.moveDir = undefined;
      return undefined;
    }
    const borderDir = client.isAtBorder();
    if (borderDir !== undefined) {
      Bot.moveDir = borderDir;
      return Bot.moveDir;
    }
    const dx = targetX - px;
    const dy = targetY - py;
    const desiredDir = Math.atan2(dy, dx);
    const botR = (Bot.scale || 35) + 12;
    const stepDist = Math.max(45, 70 * speedMult);
    const nearObjs = gameObjects.filter((obj) => {
      if (!obj.active || obj.ignoreCollision) return false;
      const dxo = obj.x - px;
      const dyo = obj.y - py;
      return Math.hypot(dxo, dyo) <= 240;
    });
    function distToSegment(px, py, ax, ay, bx, by) {
      const vx = bx - ax;
      const vy = by - ay;
      const wx = px - ax;
      const wy = py - ay;
      const c1 = vx * wx + vy * wy;
      if (c1 <= 0) return Math.hypot(px - ax, py - ay);
      const c2 = vx * vx + vy * vy;
      if (c2 <= c1) return Math.hypot(px - bx, py - by);
      const t = c1 / c2;
      const hx = ax + t * vx;
      const hy = ay + t * vy;
      return Math.hypot(px - hx, py - hy);
    }
    function score(angle) {
      const nx = px + Math.cos(angle) * stepDist;
      const ny = py + Math.sin(angle) * stepDist;
      let cost = Math.hypot(targetX - nx, targetY - ny);
      let penalty = 0;
      for (const obj of nearObjs) {
        const objR =
          (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) || 50;
        const d = distToSegment(obj.x, obj.y, px, py, nx, ny);
        if (d < objR + botR) {
          penalty += 200 + (objR + botR - d) * 60;
        }
      }
      if (client.stuckTicks > 6) {
        penalty += Math.abs(UTILS.getAngleDist(desiredDir, angle)) * 80;
      }
      return cost + penalty;
    }
    const step = Math.PI / 8;
    const spread = client.stuckTicks > 6 ? 5 : 3;
    let best = desiredDir;
    let bestScore = Infinity;
    for (let i = -spread; i <= spread; i++) {
      const a = desiredDir + i * step;
      const s = score(a);
      if (s < bestScore) {
        bestScore = s;
        best = a;
      }
    }
    if (bestScore > 800 && client.stuckTicks > 8) {
      best = desiredDir + Math.PI;
    }
    Bot.moveDir = best;
    return Bot.moveDir;
  };

  client.isAtBorder = function () {
    const BORDER = 14700;
    const SAFE = 500;

    if (!Bot) return undefined;

    const x = Bot.x2;
    const y = Bot.y2;

    if (x >= BORDER) return Math.PI;
    if (x <= SAFE) return 0;
    if (y >= BORDER) return -Math.PI / 2;
    if (y <= SAFE) return Math.PI / 2;

    return undefined;
  };

  client.breakObstacles = function () {
    if (!Bot || !Bot.alive) return false;

    const px = Bot.x2;
    const py = Bot.y2;
    const breakableTypes = [2, 3];

    for (let i = 0; i < gameObjects.length; i++) {
      const o = gameObjects[i];
      if (!o.active || o.ignoreCollision) continue;
      if (!o.owner) continue;
      if (!breakableTypes.includes(o.itemID)) continue;

      const dx = o.x - px;
      const dy = o.y - py;
      const dist = Math.hypot(dx, dy);

      const objR = (o.getScale ? o.getScale(0.6, o.isItem) : o.scale) || 50;
      const minDist = objR + Bot.scale + 15;

      if (dist < minDist) {
        if (!client.breaking) {
          client.breaking = true;
        }

        const breakAngle = client.updateDir();
        if (breakAngle !== undefined) {
          client.selectWeapon(Bot.weapons[0]);
          client.buyEquip(40, 0);
          client.buyEquip(19, 1);
          client.sendWS("d", 1, breakAngle, 1);
          Bot.moveDir = breakAngle;
          return true;
        }

        return true;
      }
    }

    client.breaking = false;
    return false;
  };

  client.updateDir = function (debug) {
    if (debug != null) return debug;

    if (client.botInTrap) return;

    if (client.breaking) {
      for (const obj of gameObjects) {
        if (!obj.active || obj.ignoreCollision) continue;
        const dx = obj.x - Bot.x2;
        const dy = obj.y - Bot.y2;
        if (Math.abs(dx) > 180 || Math.abs(dy) > 180) continue;

        const objR =
          (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) || 50;
        const minDist = objR + Bot.scale + 15;
        if (Math.hypot(dx, dy) < minDist) {
          return Math.atan2(dy, dx);
        }
      }
      return;
    }

    if (
      (client.syncing || client.synchit || instakill.isTrue) &&
      client.enemy.length &&
      client.near
    ) {
      return UTILS.getDirect(client.near, Bot, 2, 2);
    }

    const m =
      typeof mouseWorldPos === "function" ? mouseWorldPos() : mouseWorldPos;
    if (m && typeof m.x === "number" && typeof m.y === "number") {
      return Math.atan2(m.y - Bot.y2, m.x - Bot.x2);
    }

    if (client.enemy.length && client.near) {
      return UTILS.getDirect(Bot, client.near, 2, 2);
    }

    return UTILS.getDirect(player, Bot, 0, 2);
  };

  client.syncHit = function () {
    if (!Bot || !Bot.alive) {
      client.synchit = false;
      return;
    }

    if (!client.enemy.length) {
      client.synchit = false;
      return;
    }

    client.synchit = true;

    const target = client.near;

    const primaryWeapon = Bot.weapons[0];

    if (Bot.reloads[primaryWeapon] > 0) {
      client.synchit = false;
      return;
    }

    if (Bot.weaponIndex !== primaryWeapon || Bot.buildIndex > -1) {
      client.selectWeapon(primaryWeapon);
    }

    client.buyEquip(53, 0);

    setTimeout(() => {
      client.buyEquip(7, 0);
      client.buyEquip(21, 1);

      const angle = client.updateDir();

      client.sendWS("d", 1, angle);
    }, 160);

    client.game.tickBase(() => { }, 30);
    client.synchit = false;
    client.sendWS("d", 1, undefined);
  };

  client.autoBreak = function () {
    if (!Bot || !Bot.alive || !client.botInTrap) return;

    const trap = client.botTrapObj;
    if (!trap) return;

    const angle = Math.atan2(trap.y - Bot.y2, trap.x - Bot.x2);

    client.sendWS("D", angle);

    const surroundedBySpike = gameObjects.find(
      (e) =>
        /spikes/.test(e.name) &&
        e.owner.sid !== Bot.sid &&
        UTILS.getDistance(e.x, e.y, Bot.x2, Bot.y2) < 200 &&
        e.active,
    );

    const turretFinder = gameObjects.find(
      (e) =>
        /turret/.test(e.name) &&
        e.owner.sid !== Bot.sid &&
        UTILS.getDistance(e.x, e.y, Bot.x2, Bot.y2) < 700 &&
        e.active,
    );

    const smartVal = (id) =>
      !Bot.skins[40]
        ? 6
        : id === 1
          ? 40
          : surroundedBySpike && trap.health > 100
            ? 26
            : Bot.shameCount >= 3
              ? 7
              : turretFinder
                ? 22
                : 6;

    const isSec = Bot.weapons[1] === 10;
    const hp = trap.health;

    if (Bot.buildIndex >= 0) {
      const weapon = isSec ? Bot.weapons[1] : Bot.weapons[0];
      client.selectWeapon(weapon);
    }

    if (
      Bot.weaponIndex !== (isSec ? Bot.weapons[1] : Bot.weapons[0]) &&
      (!isSec || hp > 20)
    ) {
      const weapon = isSec ? Bot.weapons[1] : Bot.weapons[0];
      client.selectWeapon(weapon);
    }

    if (isSec && hp <= 20 && Bot.reloads[Bot.weapons[0]] === 0) {
      client.selectWeapon(Bot.weapons[0]);
    }

    const gearID = smartVal(isSec ? (hp <= 20 ? 1 : 2) : 1);
    client.buyEquip(gearID, 0);
    client.buyEquip(surroundedBySpike ? 21 : 19, 1);

    client.sendWS("d", 1, angle, 1);

    client.game.tickBase(() => {
      const newAngle = Math.atan2(trap.y - Bot.y2, trap.x - Bot.x2);
      client.sendWS("D", newAngle);
      client.sendWS("d", 1, newAngle, 1);
    }, 1);
  };
  client.checkSelection = function () {
    if (!client.inGame || !Bot || !Bot.alive) return;

    const primary = Bot.weapons[0];
    const secondary = Bot.weapons[1];

    if (
      secondary !== undefined &&
      Bot.weaponIndex === secondary &&
      Bot.reloads[secondary] === 0
    ) {
      client.selectWeapon(primary);
    }
  };

  client.onmessage = function (message) {
    let mdata = new Uint8Array(message.data);
    let parsed = window.msgpack.decode(mdata);
    let type = parsed[0];
    let data = parsed[1];
    // SetupGame:
    if (type == "C") {
      BOTSID = data[0];
      if (!client.firstOpen) {
        textManager.showText(
          player.x,
          player.y - 40,
          26,
          0,
          3000,
          `Bot [${client.botCount}] Has Been Connected with a sid of {${BOTSID}}`,
          "orange",
        );
        client.firstOpen = true;
      }
    }
    // PingSocketResponse:
    if (type == "0") {
      let pingTime = Date.now() - client.lastPing;
      client.ping = pingTime;
    }

    // KillPlayer:
    if (type == "P") {
      client.inGame = false;
      client.spawn();
    }
    // AddPlayer:
    if (type == "D") {
      let isYou = data[1];
      data = data[0];

      let tmpPlayer = client.findPlayerByID(data[0]);
      if (!tmpPlayer) {
        tmpPlayer = new Player(
          data[0],
          data[1],
          config,
          UTILS,
          projectileManager,
          objectManager,
          client.players,
          client.ais,
          items,
          hats,
          accessories,
        );
        client.players.push(tmpPlayer);
      }

      const savedPlayer = window.player;

      tmpPlayer.spawn(null);
      tmpPlayer.visible = false;
      tmpPlayer.oldPos = { x2: undefined, y2: undefined };
      tmpPlayer.x2 = undefined;
      tmpPlayer.y2 = undefined;
      tmpPlayer.x3 = undefined;
      tmpPlayer.y3 = undefined;
      tmpPlayer.setData(data);

      if (isYou) {
        window.player = savedPlayer;
        client.Bot = tmpPlayer;
        Bot = client.Bot;
        Bot.isBot = true;
      }
    }
    // RemovePlayer:
    if (type == "E") {
      for (let i = 0; i < client.players.length; i++) {
        if (client.players[i].id == data[0]) {
          client.players.splice(i, 1);
          break;
        }
      }
    }
    // ChatUpdates:
    if (type === "6") {
      const sid = data[0];
      const msg = data[1];

      if (sid === Bot?.sid) return;
      if (typeof msg !== "string") return;

      const clean = msg.trim();
      if (!clean) return;

      if (sid === player.sid) {
        client.sendWS("6", clean);
      }
    }
    // UpdatePlayers:
    if (type == "a") {
      client.lastUpdateTime = client.lastUpdateTime || 0;
      const now = performance.now();

      if (now - client.lastUpdateTime < 33) {
        return;
      }
      client.lastUpdateTime = now;
      data = data[0];
      client.enemy.length = 0;
      client.game.tick++;
      client.game.tickSpeed = performance.now() - client.game.lastTick;
      client.game.lastTick = performance.now();
      client.players.forEach((tmp) => {
        tmp.forcePos = !tmp.visible;
        tmp.visible = false;
        if (tmp.updated) {
          tmp.updated = false;
        }
      });
      function isClanMember(player, sid) {
        if (player && player.sid === sid) return true;
        if (!player || !player.team || sid < 0) return false;

        for (let i = 0; i < alliancePlayers.length; i += 2) {
          if (alliancePlayers[i] === sid) return true;
        }
        return false;
      }
      client.botInTrap = false;
      client.botTrapObj = null;

      if (Bot && Bot.alive) {
        for (let i = 0; i < gameObjects.length; i++) {
          const t = gameObjects[i];
          if (!t?.active || !t.owner) continue;

          const isTrap = t.trap || (t.group && t.group.id === 5);
          if (!isTrap) continue;

          if (t.owner.sid === Bot.sid) continue;
          if (isClanMember(Bot, t.owner.sid)) continue;

          const dx = t.x - Bot.x2;
          const dy = t.y - Bot.y2;
          const dist = Math.hypot(dx, dy);

          const trapRadius = t.scale ?? 50;
          const botRadius = Bot.scale ?? 50;

          if (dist <= trapRadius + botRadius) {
            client.botInTrap = true;
            client.botTrapObj = t;
            break;
          }
        }
      }

      for (let i = 0; i < data.length;) {
        tmpObj = client.findPlayerBySID(data[i]);
        if (tmpObj) {
          tmpObj.t1 = tmpObj.t2 == undefined ? client.game.lastTick : tmpObj.t2;
          tmpObj.t2 = client.game.lastTick;
          tmpObj.oldPos.x2 = tmpObj.x2;
          tmpObj.oldPos.y2 = tmpObj.y2;
          tmpObj.x1 = tmpObj.x;
          tmpObj.y1 = tmpObj.y;
          tmpObj.x2 = data[i + 1];
          tmpObj.y2 = data[i + 2];
          tmpObj.x3 = tmpObj.x2 + (tmpObj.x2 - tmpObj.oldPos.x2);
          tmpObj.y3 = tmpObj.y2 + (tmpObj.y2 - tmpObj.oldPos.y2);
          tmpObj.d1 = tmpObj.d2 == undefined ? data[i + 3] : tmpObj.d2;
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
          tmpObj.update(client.game.tickSpeed);
          tmpObj.dist2 = UTILS.getDist(tmpObj, Bot, 2, 2);
          tmpObj.aim2 = UTILS.getDirect(tmpObj, Bot, 2, 2);
          tmpObj.dist3 = UTILS.getDist(tmpObj, Bot, 3, 3);
          tmpObj.aim3 = UTILS.getDirect(tmpObj, Bot, 3, 3);
          if (tmpObj.skinIndex == 45 && tmpObj.shameTimer <= 0) {
            tmpObj.addShameTimer();
          }
          if (tmpObj.oldSkinIndex == 45 && tmpObj.skinIndex != 45) {
            tmpObj.shameTimer = 0;
            tmpObj.shameCount = 0;
          }
          if (tmpObj.weaponIndex < 9) {
            tmpObj.primaryIndex = tmpObj.weaponIndex;
            tmpObj.primaryVariant = tmpObj.weaponVariant;
          } else {
            tmpObj.secondaryIndex = tmpObj.weaponIndex;
            tmpObj.secondaryVariant = tmpObj.weaponVariant;
          }
          tmpObj.manageReload();
          if (!tmpObj.isTeam(Bot) && !tmpObj.isBot) {
            client.enemy.push(tmpObj);
          }
        }
        i += 13;
      }
      if (client.inGame || Bot.alive) {
        client.breakObstacles();
        if (Bot && Bot.reloads && Bot.reloads[1] < 0) {
          client.selectWeapon(Bot.weapons[1]);
        }
        client.autoMill();
        if (client.autoBreakToggle) {
          client.autoBreak();
        }
        if (client.autoPlaceToggle) {
          client.botAutoPlace();
        }

        client.botAutoHeal();
        client.botAutoBuy();
        if (client.game.tickQueue[client.game.tick]) {
          client.game.tickQueue[client.game.tick].forEach((action) => {
            action();
          });
          client.game.tickQueue[client.game.tick] = null;
        }
        if (client.enemy.length) {
          client.near = client.enemy.sort(
            (a, b) => UTILS.getDist(a, Bot, 2, 2) - UTILS.getDist(b, Bot, 2, 2),
          )[0];
        }
        if (player.team) {
          if (Bot.team != player.team && client.game.tick % 9 == 0) {
            Bot.team && client.sendWS("N");
            client.sendWS("b", player.team);
          }
        }
        if (
          !client.botInTrap &&
          client.autoHatToggle &&
          !client.synchit &&
          !client.breaking
        ) {
          client.hatChanger();
        }

        if (client.hitting && !client.syncing) {
          client.sendAutoGather();
        }
        if (Bot.weapons[1]) {
          if (
            Bot.reloads[Bot.weapons[0]] == 0 &&
            Bot.reloads[Bot.weapons[1]] == 0
          ) {
            if (!client.reloaded) {
              client.reloaded = true;
              let fastSpeed =
                items.weapons[Bot.weapons[0]].spdMult <
                  items.weapons[Bot.weapons[1]].spdMult
                  ? 1
                  : 0;
              if (
                Bot.weaponIndex != Bot.weapons[fastSpeed] ||
                Bot.buildIndex > -1
              ) {
                client.selectWeapon(Bot.weapons[fastSpeed]);
              }
            }
          } else {
            client.reloaded = false;
            if (client.optimisingAutoReloadFunction(Bot.weapons[0])) {
              if (client.optimisingAutoReloadFunction_2(Bot.weapons[0])) {
                client.selectWeapon(Bot.weapons[0]);
              }
            } else if (client.optimisingAutoReloadFunction(Bot.weapons[1])) {
              if (client.optimisingAutoReloadFunction_2(Bot.weapons[1])) {
                client.selectWeapon(Bot.weapons[1]);
              }
            }
          }
        }
        client.checkSelection();

        // Bot autopush functionality (same as player's autoPush)
        if (client.near) {
          let nearTrap = gameObjects
            .filter(
              (tmp) =>
                tmp.trap &&
                tmp.active &&
                tmp.isTeamObject(Bot) &&
                UTILS.getDist(tmp, client.near, 0, 2) <=
                client.near.scale + tmp.getScale() + 5,
            )
            .sort(function (a, b) {
              return (
                UTILS.getDist(a, client.near, 0, 2) -
                UTILS.getDist(b, client.near, 0, 2)
              );
            })[0];

          if (nearTrap) {
            let spike = gameObjects
              .filter(
                (tmp) =>
                  (tmp.dmg ||
                    (tmp.type == 1 &&
                      tmp.y >= config.mapScale - config.snowBiomeTop)) &&
                  tmp.active &&
                  !tmp.isTeamObject(client.near) &&
                  UTILS.getDist(tmp, nearTrap, 0, 0) <=
                  client.near.scale + nearTrap.scale + tmp.scale,
              )
              .sort(function (a, b) {
                return (
                  UTILS.getDist(a, client.near, 0, 2) -
                  UTILS.getDist(b, client.near, 0, 2)
                );
              })[0];

            if (spike) {
              let pushAngle = Math.atan2(
                client.near.y2 - spike.y,
                client.near.x2 - spike.x,
              );

              let point = {
                x: client.near.x2 + Math.cos(pushAngle) * 30,
                y: client.near.y2 + Math.sin(pushAngle) * 60,
              };

              let dir = Math.atan2(point.y - Bot.y2, point.x - Bot.x2);

              client.sendWS("9", dir, 1);
            }
          }
        }

        // Bot defensive placement around themselves
        if (Bot.items[4]) {
          const trapItem = items.list[Bot.items[4]];
          const tmpS = Bot.scale + trapItem.scale + (trapItem.placeOffset || 0);
          const angleStep = Math.PI / 6; // 30-degree steps for coverage
          let placedCount = 0;
          const maxPlace = 3;

          for (let i = 0; i < 12 && placedCount < maxPlace; i++) {
            const testAngle = i * angleStep;
            const tmpX = Bot.x2 + tmpS * Math.cos(testAngle);
            const tmpY = Bot.y2 + tmpS * Math.sin(testAngle);

            if (
              objectManager.checkItemLocation(
                tmpX,
                tmpY,
                trapItem.scale,
                0.6,
                trapItem.id,
                false,
                Bot,
              )
            ) {
              let canPlace = true;
              gameObjects.forEach((tmp) => {
                if (
                  tmp.active &&
                  UTILS.getDistance(tmpX, tmpY, tmp.x, tmp.y) <
                  trapItem.scale +
                  (tmp.blocker
                    ? tmp.blocker
                    : tmp.getScale(0.6, tmp.isItem))
                ) {
                  canPlace = false;
                }
              });

              if (canPlace) {
                client.place(Bot.items.indexOf(4), testAngle);
                placedCount++;
              }
            }
          }
        }

        if (client.syncing && Bot.weapons[1]) {
          const botIndex = bottics.indexOf(client);
          const totalBots = bottics.length;
          const spreadAngle = (2 * Math.PI * botIndex) / totalBots;

          const aimAngle = client.updateDir();

          client.place(Bot.items.indexOf(18), spreadAngle);

          setTimeout(() => {
            client.sendWS("D", aimAngle);
            client.selectWeapon(Bot.weapons[1]);
            if (!client.hitting) {
              client.sendAutoGather();
            }
          }, 150); // 50ms delay

          client.syncing = false;
        } else {
          const aimAngle = client.updateDir();
          client.sendWS("D", aimAngle);
        }

        client.move(client.updateMoveDir());
      }
    }
    // LoadGameObjects:
    if (type == "H") {
      let tmpData = data[0];
      for (let i = 0; i < tmpData.length;) {
        if (!gameObjects.some((e) => e.active && e.sid == tmpData[i])) {
          objectManager.add(
            tmpData[i],
            tmpData[i + 1],
            tmpData[i + 2],
            tmpData[i + 3],
            tmpData[i + 4],
            tmpData[i + 5],
            items.list[tmpData[i + 6]],
            true,
            tmpData[i + 7] >= 0 ? { sid: tmpData[i + 7] } : null,
          );
        }
        i += 8;
      }
    }
    // WiggleGameObjects:
    if (type == "L") {
      // uh none since it will bug
      // planning to add max wiggle on objects dw;
    }
    // ShootTurret:
    if (type == "M") {
      //
    }
    // AddProjectile:
    if (type == "X") {
      const x = data[0],
        y = data[1],
        dir = data[2],
        range = data[3],
        speed = data[4],
        indx = data[5],
        layer = data[6],
        sid = data[7];
      projectileManager.addProjectile(
        x,
        y,
        dir,
        range,
        speed,
        indx,
        null,
        null,
        layer,
        inWindow,
      ).sid = sid;
      let weaponIndx =
        indx == 0 ? 9 : indx == 2 ? 12 : indx == 3 ? 13 : indx == 5 && 15;
      let projOffset = config.playerScale * 2;
      let projXY = {
        x: indx == 1 ? x : x - projOffset * Math.cos(dir),
        y: indx == 1 ? y : y - projOffset * Math.sin(dir),
      };
      let nearPlayer = client.players
        .filter((e) => e.visible && UTILS.getDist(projXY, e, 0, 2) <= e.scale)
        .sort(function (a, b) {
          return (
            UTILS.getDist(projXY, a, 0, 2) - UTILS.getDist(projXY, b, 0, 2)
          );
        })[0];
      if (nearPlayer && !nearPlayer.updated) {
        if (indx == 1) {
          nearPlayer.shooting[53] = 1;
        } else {
          nearPlayer.shootIndex = weaponIndx;
          nearPlayer.shooting[1] = 1;
        }
      }
    }
    // KillObject:
    if (type == "Q") {
      const findObj = findObjectBySid(data[0]);
      objectManager.disableBySid(data[0]);

      if (client.replacerToggle) {
        client.replacer(findObj);
      }
    }
    // KillObjects:
    if (type == "R") {
      if (Bot) {
        objectManager.removeAllItems(data[0]);
      }
    }
    // Gather Animation:
    if (type == "K") {
      tmpObj = client.findPlayerBySID(data[0]);
      if (tmpObj) {
        tmpObj.gatherIndex = data[2];
        tmpObj.startAnim(data[1], data[2]);
        tmpObj.gathering = 1;
      }
    }
    // LoadAI:
    if (type == "I") {
      data = data[0];
    }
    // AnimateAI:
    if (type == "J") {
      data = data[0];
    }
    // UpdatePlayerValue:
    if (type == "N") {
      if (Bot) {
        Bot[data[0]] = data[1];
        if (data[0] == "points") {
          client.autoBuy.buyNext();
        }
      }
    }
    // UpdateHealth:
    if (type === "O") {
      const sid = data[0];
      const value = data[1];
      const obj = client.players.find((p) => p.sid === sid);
      if (obj) {
        const old = obj.health;
        obj.health = value;
        obj.judgeShame?.();
        if (obj === Bot && old > value && client.autoHealToggle) {
          client.handleBotDamage(old - value);
        }
      }
    }
    // UpdateItemCounts:
    if (type == "S") {
      if (Bot) {
        Bot.itemCounts[data[0]] = data[1];
      }
    }
    // UpdateAge:
    if (type == "T") {
      if (data[0] != undefined) {
        Bot.XP = data[0];
      }
      if (data[1] != undefined) {
        Bot.maxXP = data[1];
      }
      if (data[2] != undefined) {
        Bot.age = data[2];
      }
    }
    // UpdateUpgrades:
    if (type == "U") {
      Bot.upgradePoints = data[0];
      Bot.upgrAge = data[1];
      if (Bot.upgradePoints > 0) {
        if (Bot.upgrAge == 2) {
          client.sendWS("H", 5);
          /* 3 -> short sword
                                   5 -> polearm
                                   6 -> Bat
                                   7 -> dagger
                                 */
        } else if (Bot.upgrAge == 3) {
          client.sendWS("H", 17);
        } else if (Bot.upgrAge == 4) {
          client.sendWS("H", 31);
        } else if (Bot.upgrAge == 5) {
          client.sendWS("H", 23);
        } else if (Bot.upgrAge == 6) {
          client.sendWS("H", 9);
        } else if (Bot.upgrAge == 7) {
          client.sendWS("H", 34);
        } else if (Bot.upgrAge == 8) {
          client.sendWS("H", 12);
        } else if (Bot.upgrAge == 9) {
          client.sendWS("H", 15);
        }
      }
    }
    // UpdateItems:
    if (type == "V") {
      if (data[0]) {
        if (data[1]) {
          Bot.weapons = data[0];
          Bot.primaryIndex = Bot.weapons[0];
          Bot.secondaryIndex = Bot.weapons[1];
        } else {
          Bot.items = data[0];
        }
      }
    }
    // UpdateStoreItems:
    if (type == "5") {
      let type = data[0];
      let id = data[1];
      let index = data[2];
      if (index) {
        if (!type) {
          Bot.tails[id] = 1;
        } else {
          Bot.latestTail = id;
        }
      } else if (!type) {
        Bot.skins[id] = 1;
      } else {
        Bot.latestSkin = id;
      }
    }
  };
}

function disconnectBot() {
  if (!bottics || bottics.length === 0) {
    console.log("No bots connected to disconnect");
    return false;
  }

  const lastBot = bottics[bottics.length - 1];
  const botNumber = lastBot.botCount;

  // Clear all intervals and timeouts
  if (lastBot.pingInterval) {
    clearInterval(lastBot.pingInterval);
    lastBot.pingInterval = null;
  }

  if (lastBot.otherIntervals) {
    lastBot.otherIntervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    lastBot.otherIntervals = [];
  }

  if (lastBot.timeouts) {
    lastBot.timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    lastBot.timeouts = [];
  }

  // Clear game state
  if (lastBot.game) {
    if (lastBot.game.tickQueue) {
      lastBot.game.tickQueue = [];
    }
    if (lastBot.game.tickBase) {
      lastBot.game.tickBase = () => { };
    }
  }

  // Clear bot data
  if (lastBot.Bot) {
    lastBot.Bot = null;
  }
  if (lastBot.near) {
    lastBot.near = null;
  }
  if (lastBot.items) {
    lastBot.items = [];
  }
  if (lastBot.weapons) {
    lastBot.weapons = [];
  }

  // Remove event listeners to prevent memory leaks
  if (lastBot.onmessage) {
    lastBot.onmessage = null;
  }
  if (lastBot.onopen) {
    lastBot.onopen = null;
  }
  if (lastBot.onerror) {
    lastBot.onerror = null;
  }
  if (lastBot.onclose) {
    lastBot.onclose = null;
  }

  // Close WebSocket properly
  if (
    lastBot.readyState === WebSocket.OPEN ||
    lastBot.readyState === WebSocket.CONNECTING
  ) {
    try {
      lastBot.close(1000, "Manual disconnect");
    } catch (e) {
      console.log(`Error closing bot ${botNumber} WebSocket:`, e);
    }
  }

  // Remove from bottics array
  bottics.pop();

  // Update remaining bots' numbers
  bottics.forEach((bot, index) => {
    bot.botCount = index + 1;
  });

  console.log(
    `Bot ${botNumber} disconnected. ${bottics.length} bots remaining.`,
  );
  return true;
}

class Traps {
  constructor(UTILS, items) {
    this.dist = 0;
    this.aim = 0;
    this.inTrap = false;
    this.replaced = false;
    this.antiTrapped = false;
    this.info = {};
    this.trappling = false;
    this.spikeplacer = false;
    this.spikePlaced = false;
    this.spikSync = false;
    this._lastBackSpike = 0;
    this._lastObstaclePlace = 0;
    this._lastReplacerBurst = 0;
    this.outtrap = false;
    this.aftertrap = false;
    this.breakOutAngle = 0;
    this.pushOutAngle = 0;
    this.justOutTrap = false;
    this.currTr = false;
    this.notFast = function () {
      return (
        player.weapons[1] === 10 &&
        (this.info.health > items.weapons[player.weapons[0]].dmg ||
          player.weapons[0] === 5)
      );
    };

    this.testCanPlace = function (
      id,
      first = -(Math.PI / 2),
      repeat = Math.PI / 2,
      plus = Math.PI / 36,
      radian,
      replacer,
      yaboi,
    ) {
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
          let tmpX = player.x2 + tmpS * Math.cos(relAim);
          let tmpY = player.y2 + tmpS * Math.sin(relAim);
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
              if (
                UTILS.getAngleDist(near.aim2 + Math.PI, relAim + Math.PI) <=
                Math.PI * 1.3
              ) {
                place(2, relAim, 1);
                if (UTILS.getAngleDist(near.aim2, relAim) <= 1) {
                  counts.placed++;
                }
              } else {
                player.items[4] === 15 && place(4, relAim, 1);
              }
            } else {
              if (
                UTILS.getAngleDist(near.aim2, relAim) <=
                config.gatherAngle / 2.6
              ) {
                place(2, relAim, 1);
                if (UTILS.getAngleDist(near.aim2, relAim) <= 1) {
                  counts.placed++;
                }
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

          if (replacer && UTILS.getAngleDist(near.aim2, relAim) <= 1) {
            counts.placed++;
          }
        }

        if (counts.placed > 0 && replacer && item.dmg) {
          if (
            near.dist2 <=
            items.weapons[player.weapons[0]].range + player.scale * 1.8 &&
            configs.spikeTick
          ) {
            instaC.canSpikeTick = true;
          }
        }
      } catch (err) {
        console.error("Error in testCanPlace: ", err);
      }
    };

    this.createObj = function (item, direct) {
      let preObj = {
        id: item.id,
        dir: direct,
        scale: item.scale,
        colDiv: item.colDiv,
        getScale: function (sM, ig) {
          return this.scale * (ig ? 1 : this.colDiv);
        },
      };

      preObj.x =
        player.x2 +
        (player.scale + preObj.scale + (item.placeOffset || 0)) *
        Math.cos(preObj.dir);
      preObj.y =
        player.y2 +
        (player.scale + preObj.scale + (item.placeOffset || 0)) *
        Math.sin(preObj.dir);
      return preObj;
    };

    this.radCalc = function (obj, direct, item, type) {
      let preObj = this.createObj(item, direct);
      let getScale = obj.getScale(0.6, obj.isItem);

      let dist = UTILS.getDist(obj, preObj, 0, 0);
      let scale = getScale + preObj.scale;

      let angles = [];
      if (dist < scale) {
        let calc = Math.acos(dist / scale);
        let sum = [calc, -calc];

        for (let i = 0; i < sum.length; i++) {
          let angle = direct + sum[i];
          preObj = this.createObj(item, angle);

          let nears = this.preplaces[1].length
            ? this.preplaces[1].some(
              (pos) =>
                UTILS.getDist(pos, preObj, 0, 0) < pos.scale + preObj.scale,
            )
            : false;
          if (nears) continue;

          let renears = this.preplaces[0].length
            ? this.preplaces[0].some(
              (pos) =>
                UTILS.getDist(pos, preObj, 0, 0) < pos.scale + preObj.scale,
            )
            : false;
          if (renears) continue;

          let canPlace = objectManager.checkItemLocation(
            preObj.x,
            preObj.y,
            preObj.scale,
            0.6,
            preObj.id,
            false,
          );
          if (canPlace) {
            angles.push(angle);
            this.preplaces[1].push(preObj);
          }
        }
      } else {
        if (type) return [];

        preObj = this.createObj(item, direct);

        let nears = this.preplaces[1].length
          ? this.preplaces[1].some(
            (pos) =>
              UTILS.getDist(pos, preObj, 0, 0) < pos.scale + preObj.scale,
          )
          : false;
        if (nears) return [];

        let renears = this.preplaces[0].length
          ? this.preplaces[0].some(
            (pos) =>
              UTILS.getDist(pos, preObj, 0, 0) < pos.scale + preObj.scale,
          )
          : false;
        if (renears) return [];

        let canPlace = objectManager.checkItemLocation(
          preObj.x,
          preObj.y,
          preObj.scale,
          0.6,
          preObj.id,
          false,
        );
        if (canPlace) {
          angles.push(direct);
          this.preplaces[1].push(preObj);
        }
      }
      return angles;
    };

    this.closestPossibleAngles = function (obj, id) {
      let itemId = player.items[id];
      if (itemId == undefined) return;
      let item = items.list[itemId];
      if (!item || !obj) return;
      let px = player.x2;
      let py = player.y2;
      let objScale = obj.getScale
        ? obj.getScale(0.6, obj.isItem) + 0.6
        : obj.scale;
      let dx = obj.x - px;
      let dy = obj.y - py;
      let distSq = dx * dx + dy * dy;
      if (distSq <= 0) return;
      let dist = Math.sqrt(distSq);
      let reach =
        player.scale + objScale + 2 * item.scale + (item.placeOffset || 0);
      if (dist > reach) {
        return [UTILS.getDirection(obj.x, obj.y, px, py)];
      }
      let D = player.scale + item.scale + (item.placeOffset || 0);
      let E = objScale + item.scale;
      let a = (D * D - E * E + dist * dist) / (2 * dist);
      let h2 = D * D - a * a;
      let h = h2 > 0 ? Math.sqrt(h2) : 0;
      let bx = px + (a / dist) * dx;
      let by = py + (a / dist) * dy;
      let ox = (h / dist) * dy;
      let oy = (h / dist) * dx;
      return [
        UTILS.getDirection(bx + ox, by - oy, px, py),
        UTILS.getDirection(bx - ox, by + oy, px, py),
      ];
    };

    // Cache of occupied positions to avoid redundant checks
    this._occupiedCache = new Map();
    this._occupiedCacheTick = -1;

    this.getAngles = function (
      id,
      amount,
      targetObj = null,
      prioritizeTarget = true,
    ) {
      let item = items.list[player.items[id]];
      if (!item) return [];

      let result = [];
      let angleNeeded = Math.min(amount, 72);
      if (angleNeeded <= 0) return result;

      const TAU = Math.PI * 2;
      const px = player.x2;
      const py = player.y2;
      const itemScale = item.scale;
      const placeOffset = item.placeOffset || 0;
      const baseReach = (player.scale || 35) + itemScale + placeOffset;

      // Rebuild occupied cache once per tick
      if (this._occupiedCacheTick !== game.tick) {
        this._occupiedCache.clear();
        this._occupiedCacheTick = game.tick;
        for (let i = 0; i < gameObjects.length; i++) {
          let obj = gameObjects[i];
          if (!obj || !obj.active) continue;
          // Key by grid cell (50 unit cells)
          const gx = Math.floor(obj.x / 50);
          const gy = Math.floor(obj.y / 50);
          const key = `${gx},${gy}`;
          if (!this._occupiedCache.has(key)) {
            this._occupiedCache.set(key, []);
          }
          this._occupiedCache.get(key).push(obj);
        }
      }

      // Determine target angle for directional placement
      let targetAngle = null;
      if (targetObj) {
        targetAngle = Math.atan2(targetObj.y - py, targetObj.x - px);
      } else if (near) {
        targetAngle = Math.atan2(near.y2 - py, near.x2 - px);
      } else if (traps.aim != null) {
        targetAngle = traps.aim;
      }

      // Fast collision check using spatial cache
      const checkCollision = (tx, ty) => {
        const gx = Math.floor(tx / 50);
        const gy = Math.floor(ty / 50);
        // Check 3x3 grid around target
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${gx + dx},${gy + dy}`;
            const objs = this._occupiedCache.get(key);
            if (!objs) continue;
            for (let i = 0; i < objs.length; i++) {
              const obj = objs[i];
              const objScale =
                obj.blocker ||
                (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale);
              const ddx = tx - obj.x;
              const ddy = ty - obj.y;
              const limit = itemScale + objScale;
              if (ddx * ddx + ddy * ddy < limit * limit) return true;
            }
          }
        }
        return false;
      };

      // Generate angles - prioritize toward target if specified
      const startAngle = targetAngle != null ? targetAngle : 0;
      const step = TAU / angleNeeded;
      const checked = new Set();

      for (let i = 0; i < angleNeeded; i++) {
        let angle;
        if (prioritizeTarget && targetAngle != null) {
          // Spiral outward from target: 0, +step, -step, +2*step, -2*step...
          const offset = Math.floor((i + 1) / 2) * step;
          angle = i % 2 === 0 ? startAngle + offset : startAngle - offset;
        } else {
          angle = i * step;
        }

        // Normalize angle to [0, TAU)
        angle = ((angle % TAU) + TAU) % TAU;

        // Skip if we've checked this angle slot already
        const angleKey = Math.round(angle * 1000);
        if (checked.has(angleKey)) continue;
        checked.add(angleKey);

        const tx = px + Math.cos(angle) * baseReach;
        const ty = py + Math.sin(angle) * baseReach;

        // Quick bounds check
        if (tx < 0 || ty < 0 || tx > config.mapScale || ty > config.mapScale)
          continue;

        // Fast collision check
        if (checkCollision(tx, ty)) continue;

        // Full placement validity check
        if (
          !objectManager.checkItemLocation(
            tx,
            ty,
            itemScale,
            0.6,
            item.id,
            false,
            player,
          )
        )
          continue;

        result.push(angle);
      }

      return result;
    };

    this.autoPlace = function () {
      if (!enemy.length || !configs.autoPlace || instaC.ticking) return;
      if (!near) return;

      const tickInterval =
        Math.max(1, parseInt(getEl("autoPlaceTick").value)) || 1;
      const isPlaceTick = game.tick % tickInterval === 0;
      const isSpikeTick = game.tick % Math.max(2, tickInterval) === 0;
      if (!isPlaceTick && !isSpikeTick) return;
      if (near.dist3 > 500) return;

      const moveDir = player.moveDir ?? lastMoveDir ?? 0;
      const enemyAngle = UTILS.getDirect(player, near, 2, 2);
      const backAngle = moveDir + Math.PI;

      const spikeItem = items.list[player.items[2]];
      const trapItem = items.list[player.items[4]];
      const spikeScale = spikeItem ? spikeItem.scale : 35;
      const trapScale = trapItem ? trapItem.scale : 35;

      let nearTrap = gameObjects.find(
        (e) =>
          e.trap &&
          e.active &&
          e.isTeamObject &&
          e.isTeamObject(player) &&
          UTILS.getDist(e, near, 0, 2) <= near.scale + e.getScale() + 5,
      );
      const enemyInTrap = !!nearTrap;

      const getExistingSpikes = () =>
        gameObjects.filter(
          (o) =>
            o.active &&
            o.dmg &&
            o.isTeamObject &&
            o.isTeamObject(player) &&
            UTILS.getDist(o, player, 0, 2) <= 350,
        );

      const getNearbyObstacles = () =>
        gameObjects.filter((o) => {
          if (!o.active) return false;
          const dist = UTILS.getDist(o, player, 0, 2);
          if (dist > 250) return false;
          const isTree = o.type === 0;
          const isStone = o.type === 2;
          const isBush =
            o.type === 1 && o.y < config.mapScale - config.snowBiomeTop;
          const isGold = o.type === 3;
          const isCactus =
            o.type === 1 && o.y >= config.mapScale - config.snowBiomeTop;
          return isTree || isStone || isBush || isGold || isCactus;
        });

      const isCactus = (o) =>
        o.type === 1 && o.y >= config.mapScale - config.snowBiomeTop;

      const getPlacePos = (angle, itemScale) => {
        const offset = player.scale + itemScale + (spikeItem?.placeOffset || 0);
        return {
          x: player.x2 + offset * Math.cos(angle),
          y: player.y2 + offset * Math.sin(angle),
        };
      };

      const isTooCloseToSpike = (pos, minDist = 55) => {
        const spikes = getExistingSpikes();
        for (const s of spikes) {
          if (UTILS.getDistance(pos.x, pos.y, s.x, s.y) < minDist) return true;
        }
        return false;
      };

      const isTooFarFromSpikes = (pos, maxDist = 140) => {
        const spikes = getExistingSpikes();
        if (spikes.length === 0) return false;
        for (const s of spikes) {
          if (UTILS.getDistance(pos.x, pos.y, s.x, s.y) <= maxDist)
            return false;
        }
        return true;
      };

      const wouldBlockSelf = (angle) => {
        const angleDiff = Math.abs(UTILS.getAngleDist(moveDir, angle));
        return angleDiff < Math.PI / 4;
      };

      const scoreAngle = (angle, targetAngle, avoidBlock = true) => {
        let score = 0;
        const pos = getPlacePos(angle, spikeScale);

        const angleDist = Math.abs(UTILS.getAngleDist(targetAngle, angle));
        score += (Math.PI - angleDist) * 10;

        if (avoidBlock && wouldBlockSelf(angle)) score -= 50;

        if (isTooCloseToSpike(pos, 50)) score -= 40;
        if (isTooFarFromSpikes(pos, 150)) score -= 20;

        const backDist = Math.abs(UTILS.getAngleDist(backAngle, angle));
        if (backDist < Math.PI / 3) score += 15;

        return score;
      };

      const obstacles = getNearbyObstacles();
      const hasCactusNear = obstacles.some(isCactus);
      const hasObstacleNear = obstacles.length > 0;

      if (hasCactusNear && trapItem && isPlaceTick && near.dist3 <= 350) {
        const cactus = obstacles.find(isCactus);
        if (cactus) {
          const cactusAngle = UTILS.getDirect(player, cactus, 2, 0);
          const enemyToCactus = UTILS.getDirect(near, cactus, 2, 0);
          const trapAngles = this.getAngles(4, 8, cactus, false);
          if (trapAngles.length > 0) {
            trapAngles.sort(
              (a, b) =>
                Math.abs(UTILS.getAngleDist(enemyToCactus, a)) -
                Math.abs(UTILS.getAngleDist(enemyToCactus, b)),
            );
            const best = trapAngles[0];
            if (!wouldBlockSelf(best)) {
              place(4, best, 1);
            }
          }
        }
      }

      if (hasObstacleNear && spikeItem && isSpikeTick && near.dist3 <= 300) {
        const nonCactus = obstacles.filter((o) => !isCactus(o));
        for (const obs of nonCactus.slice(0, 2)) {
          const obsAngle = UTILS.getDirect(player, obs, 2, 0);
          const spikeAngles = this.getAngles(2, 6, obs, false);
          if (spikeAngles.length > 0) {
            const scored = spikeAngles.map((a) => ({
              angle: a,
              score: scoreAngle(a, obsAngle, true),
            }));
            scored.sort((a, b) => b.score - a.score);
            const best = scored[0];
            if (best.score > 0) {
              place(2, best.angle, 1);
              break;
            }
          }
        }
      }

      if (!enemyInTrap && near.dist3 <= 400) {
        if (trapItem && player.items[4] === 15 && isPlaceTick) {
          const trapAngles = this.getAngles(4, 12, null, true);
          if (trapAngles.length > 0) {
            const scored = trapAngles.map((a) => ({
              angle: a,
              score: scoreAngle(a, enemyAngle, true) + 20,
            }));
            scored.sort((a, b) => b.score - a.score);
            const best = scored[0];
            if (best.score > 10 && !wouldBlockSelf(best.angle)) {
              place(4, best.angle, 1);
            }
          }
        }

        if (spikeItem && isSpikeTick && near.dist3 <= 350) {
          const spikeAngles = this.getAngles(2, 16, null, true);
          if (spikeAngles.length > 0) {
            const pushDir = enemyAngle;
            const sideAngle1 = pushDir + Math.PI / 3;
            const sideAngle2 = pushDir - Math.PI / 3;

            const scored = spikeAngles.map((a) => {
              let score = scoreAngle(a, pushDir, true);
              const side1Dist = Math.abs(UTILS.getAngleDist(sideAngle1, a));
              const side2Dist = Math.abs(UTILS.getAngleDist(sideAngle2, a));
              if (side1Dist < Math.PI / 4 || side2Dist < Math.PI / 4) {
                score += 25;
              }
              return { angle: a, score };
            });
            scored.sort((a, b) => b.score - a.score);

            let placed = 0;
            for (const s of scored) {
              if (placed >= 2) break;
              if (s.score > 0) {
                const pos = getPlacePos(s.angle, spikeScale);
                if (!isTooCloseToSpike(pos, 45)) {
                  place(2, s.angle, 1);
                  placed++;
                }
              }
            }
          }
        }
      }

      if (enemyInTrap && near.dist3 <= 300) {
        if (spikeItem && isSpikeTick) {
          const spikeAngles = this.getAngles(2, 20, nearTrap, true);
          if (spikeAngles.length > 0) {
            const scored = spikeAngles.map((a) => {
              let score = scoreAngle(a, enemyAngle, true);
              const trapAngle = UTILS.getDirect(player, nearTrap, 2, 0);
              const trapDist = Math.abs(UTILS.getAngleDist(trapAngle, a));
              if (trapDist < Math.PI / 2) score += 30;
              return { angle: a, score };
            });
            scored.sort((a, b) => b.score - a.score);

            let placed = 0;
            for (const s of scored) {
              if (placed >= 3) break;
              if (s.score > 0) {
                place(2, s.angle, 1);
                placed++;
              }
            }
          }
        }
      }
    };

    this.checkSpikeTick = function () {
      try {
        if (!near || ![3, 4, 5].includes(near.primaryIndex)) return false;
        if (!my.autoPush) return false;

        const weaponIndex = near.primaryIndex;
        const weapon = items.weapons[weaponIndex];
        if (!weapon) return false;

        const placeSpike = (targetObj, useEnemy) => {
          const target = useEnemy ? near : targetObj;
          const targetAngle = Math.atan2(
            target.y - player.y2,
            target.x - player.x2,
          );
          // Get angles prioritized toward target
          const spikeAngles = this.getAngles(2, 8, targetObj, true);
          if (!spikeAngles || spikeAngles.length === 0) return false;

          // Place multiple spikes at once for better coverage
          const placements = [];
          for (let i = 0; i < Math.min(3, spikeAngles.length); i++) {
            placements.push({ id: 2, angle: spikeAngles[i] });
          }
          if (placements.length > 1) {
            placeMulti(placements);
          } else if (placements.length === 1) {
            place(2, placements[0].angle);
          }
          return true;
        };

        const enemyTrap = gameObjects.find((obj) => {
          if (!obj || !obj.active || !obj.trap) return false;
          if (obj.isTeamObject && obj.isTeamObject(player)) return false;
          const trapScale = obj.getScale
            ? obj.getScale(0.6, obj.isItem)
            : obj.scale;
          return UTILS.getDist(obj, near, 0, 2) <= trapScale + near.scale + 10;
        });

        if (enemyTrap) {
          const trapSid = enemyTrap.sid;
          if (this.spikeTickTrapSid !== trapSid) {
            this.spikeTickTrapSid = trapSid;
            this.spikeTickPredicted = false;
            this.spikeTickBroken = false;
          }
          this.lastSpikeTickTrapObj = enemyTrap;

          const baseDamage = Math.max(
            1,
            (weapon.dmg || 0) * (weapon.sDmg || 1),
          );
          const trapHealth = enemyTrap.health || 0;
          const hitsToBreak = trapHealth
            ? Math.ceil(trapHealth / baseDamage)
            : 2;
          const enemyReload = near.reloads?.[weaponIndex] || 0;
          const willBreak =
            hitsToBreak <= 2 && enemyReload <= game.tickRate * 2;

          if (willBreak && !this.spikeTickPredicted) {
            if (placeSpike(enemyTrap, false)) this.spikeTickPredicted = true;
          }

          if (near.dist2 <= 300) {
            // Tighter distance check for spiketick activation
            const enemyReady =
              !near.reloads?.[near.primaryIndex] ||
              near.reloads[near.primaryIndex] <= 100;
            if (near.dist2 <= 200 && enemyReady && instaC && !instaC.isTrue) {
              instaC.canSpikeTick = true;
              // Execute immediately for accuracy
              instaC.spikeTickType();
              instaC.canSpikeTick = false;
            }
            my.anti0Tick = 1;
            healer();
          }

          return willBreak;
        }

        if (this.spikeTickPredicted && !this.spikeTickBroken) {
          const lastTrap = this.lastSpikeTickTrapObj;
          if (
            !lastTrap ||
            !lastTrap.active ||
            isObjectBroken(lastTrap) ||
            lastTrap.health <= 0
          ) {
            if (placeSpike(near, true)) this.spikeTickBroken = true;
            this.spikeTickPredicted = false;
            this.spikeTickTrapSid = null;
            this.lastSpikeTickTrapObj = null;
            return true;
          }
        }

        return false;
      } catch (err) {
        console.warn("checkSpikeTick error:", err);
        return false;
      }
    };

    this.replacer = function (findObj) {
      if (!findObj || !configs.autoReplace) return;
      if (!inGame || this.antiTrapped) return;
      if (!enemy.length || !near) return;
      if (near.dist2 > 600) return;

      const calculatePredictedDamage = (targetObj) => {
        if (!near || !near.primaryIndex) return 0;
        const weapon = items.weapons[near.primaryIndex];
        if (!weapon) return 0;
        let damage = weapon.dmg || 0;
        if (near.primaryVariant !== undefined) {
          const variant = config.weaponVariants[near.primaryVariant];
          if (variant && variant.val) damage *= variant.val;
        }
        if (weapon.sDmg) damage *= weapon.sDmg;
        if (near.skinIndex === 7) damage *= 1.5;
        if (near.skinIndex === 6) damage *= 0.75;
        if (
          near.skinIndex === 40 &&
          targetObj &&
          targetObj.group &&
          targetObj.group.name === "walls"
        )
          damage *= 3.3;
        return Math.max(1, damage);
      };

      const getHitsToBreak = (obj) => {
        const predictedDamage = calculatePredictedDamage(obj);
        if (predictedDamage <= 0 || !obj.health) return Infinity;
        return Math.ceil(obj.health / predictedDamage);
      };

      const willBreakNextTick = (obj) => getHitsToBreak(obj) <= 1;
      const willBreakSoon = (obj) => getHitsToBreak(obj) <= 3;

      if (
        findObj.trap &&
        !findObj.isTeamObject(player) &&
        willBreakNextTick(findObj)
      ) {
        this.antiRetrapBurst(findObj);
      }

      game.tickBase(() => {
        const objDist = UTILS.getDist(findObj, player, 0, 2);
        if (objDist > 350) return;

        const enemyToObjDist = UTILS.getDist(findObj, near, 0, 2);
        if (enemyToObjDist > 400) return;

        const enemyTrap = gameObjects.find(
          (obj) =>
            obj.active &&
            obj.trap &&
            (!obj.isTeamObject || !obj.isTeamObject(player)) &&
            UTILS.getDist(obj, near, 0, 2) <=
            (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) +
            near.scale +
            10,
        );

        if (
          enemyTrap &&
          findObj.active &&
          findObj.dmg &&
          (!findObj.isTeamObject || !findObj.isTeamObject(player)) &&
          UTILS.getDist(findObj, enemyTrap, 0, 2) <=
          (enemyTrap.getScale
            ? enemyTrap.getScale(0.6, enemyTrap.isItem)
            : enemyTrap.scale) +
          120
        ) {
          const spikePriorities = [9, 8, 7, 6];
          let spikeSlot = -1;
          for (const id of spikePriorities) {
            spikeSlot = player.items.findIndex((s) => s === id);
            if (spikeSlot !== -1) break;
          }
          if (spikeSlot === -1) spikeSlot = 2;
          if (near.dist2 <= 350) {
            place(spikeSlot, UTILS.getDirect(player, findObj, 2, 2), 1);
            this.replaced = true;
            return;
          }
        }

        const hitsToBreak = getHitsToBreak(findObj);
        const objectCritical = hitsToBreak <= 1;
        const objectVulnerable = hitsToBreak <= 2;
        const objectAtRisk = hitsToBreak <= 4;

        if (objectCritical || objectVulnerable) {
          const spikePriorities = [9, 8, 7, 6];
          let spikeSlot = -1;
          for (const id of spikePriorities) {
            spikeSlot = player.items.findIndex((s) => s === id);
            if (spikeSlot !== -1) break;
          }

          if (spikeSlot !== -1 && near.dist2 <= 350) {
            const blockingAngles = this.getAngles(spikeSlot, 12, findObj, true);
            if (blockingAngles && blockingAngles.length > 0) {
              const enemyAngle = UTILS.getDirect(player, near, 2, 2);
              const enemyMovementDir = near.moveDir || enemyAngle;
              const objAngle = UTILS.getDirect(player, findObj, 2, 2);

              blockingAngles.sort((a, b) => {
                const enemyWeightA = Math.abs(
                  UTILS.getAngleDist(enemyMovementDir, a),
                );
                const enemyWeightB = Math.abs(
                  UTILS.getAngleDist(enemyMovementDir, b),
                );
                const objWeightA = Math.abs(UTILS.getAngleDist(objAngle, a));
                const objWeightB = Math.abs(UTILS.getAngleDist(objAngle, b));

                const enemyMultiplier = objectCritical ? 0.8 : 0.6;
                const totalA =
                  enemyWeightA * enemyMultiplier +
                  objWeightA * (1 - enemyMultiplier);
                const totalB =
                  enemyWeightB * enemyMultiplier +
                  objWeightB * (1 - enemyMultiplier);

                return totalA - totalB;
              });

              const spikesToPlace = objectCritical ? 3 : 2;
              for (
                let i = 0;
                i < Math.min(spikesToPlace, blockingAngles.length);
                i++
              ) {
                place(spikeSlot, blockingAngles[i], 1);
              }
            }

            const regularSpikeAngles = this.getAngles(2, 8, findObj, true);
            if (regularSpikeAngles && regularSpikeAngles.length > 0) {
              const objAngle = UTILS.getDirect(player, findObj, 2, 2);
              regularSpikeAngles.sort(
                (a, b) =>
                  Math.abs(UTILS.getAngleDist(objAngle, a)) -
                  Math.abs(UTILS.getAngleDist(objAngle, b)),
              );
              place(2, regularSpikeAngles[0], 1);
            }

            this.replaced = true;
            this.lastReplacedObj = {
              obj: findObj,
              tick: game.tick,
              anglesUsed: blockingAngles || [],
            };

            if (near.dist2 <= 180 && instaC) {
              instaC.canSpikeTick = true;
              setTimeout(() => {
                if (instaC.canSpikeTick) {
                  instaC.spikeTickType();
                  instaC.canSpikeTick = false;
                }
              }, 0);
            }

            setTimeout(() => {
              if (isObjectBroken(findObj)) {
                const followUpAngles = this.getAngles(spikeSlot, 8, null, true);
                if (followUpAngles && followUpAngles.length > 0) {
                  const objAngle = UTILS.getDirect(player, findObj, 2, 2);
                  followUpAngles.sort(
                    (a, b) =>
                      Math.abs(UTILS.getAngleDist(objAngle, a)) -
                      Math.abs(UTILS.getAngleDist(objAngle, b)),
                  );
                  for (let i = 0; i < Math.min(2, followUpAngles.length); i++) {
                    place(spikeSlot, followUpAngles[i], 1);
                  }
                }
              }
            }, game.tickRate * 2);
            return;
          }
        }

        if (objDist <= 300 && near.dist2 <= 450) {
          const weaponRange = items.weapons[near.primaryIndex || 5]?.range || 0;
          if (enemyToObjDist > weaponRange + near.scale * 1.8) return;

          const isObjectInDanger = () => {
            const angleToObj = UTILS.getDirect(near, findObj, 2, 2);
            const angleDiff = Math.abs(
              UTILS.getAngleDist(near.dir, angleToObj),
            );
            return (
              angleDiff < Math.PI / 3 &&
              enemyToObjDist <= weaponRange + near.scale * 1.8
            );
          };

          const shouldPlaceDefensively = objectAtRisk || isObjectInDanger();

          if (shouldPlaceDefensively) {
            const spikeAngles = this.getAngles(2, 10, findObj, true);
            if (spikeAngles && spikeAngles.length > 0) {
              const enemyAngle = UTILS.getDirect(player, near, 2, 2);
              const objAngle = UTILS.getDirect(player, findObj, 2, 2);

              spikeAngles.sort((a, b) => {
                const enemyWeightA = Math.abs(
                  UTILS.getAngleDist(enemyAngle, a),
                );
                const enemyWeightB = Math.abs(
                  UTILS.getAngleDist(enemyAngle, b),
                );
                const objWeightA = Math.abs(UTILS.getAngleDist(objAngle, a));
                const objWeightB = Math.abs(UTILS.getAngleDist(objAngle, b));

                const weightMultiplier = objectCritical
                  ? 0.9
                  : objectVulnerable
                    ? 0.75
                    : 0.6;
                const totalA =
                  enemyWeightA * weightMultiplier +
                  objWeightA * (1 - weightMultiplier);
                const totalB =
                  enemyWeightB * weightMultiplier +
                  objWeightB * (1 - weightMultiplier);

                return totalA - totalB;
              });

              const spikesToPlace = objectCritical
                ? 3
                : objectVulnerable
                  ? 2
                  : 1;
              for (
                let i = 0;
                i < Math.min(spikesToPlace, spikeAngles.length);
                i++
              ) {
                place(2, spikeAngles[i], 1);
              }
            }
          } else if (player.items[4] === 15 && near.dist2 > 250) {
            const millAngles = this.getAngles(4, 6, findObj, true);
            if (millAngles && millAngles.length > 0) {
              const objAngle = UTILS.getDirect(player, findObj, 2, 2);
              millAngles.sort(
                (a, b) =>
                  Math.abs(UTILS.getAngleDist(objAngle, a)) -
                  Math.abs(UTILS.getAngleDist(objAngle, b)),
              );
              place(4, millAngles[0], 1);
            }
          }

          this.replaced = true;
        }
      }, 1);
    };

    this.protect = function (aim) {
      if (!configs.antiTrap) return;

      const angles = this.getAngles(2, 2);
      for (const a of angles) {
        place(2, a, 1);
      }

      this.antiTrapped = true;
    };

    this.antiRetrapBurst = function (centerObj) {
      if (!centerObj) return;
      const trapSlot = 4;
      const trapItem = items.list[player.items[trapSlot]];
      if (!trapItem) return;

      selectToBuild(player.items[trapSlot]);

      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16;
        sendAtck(1, angle);
      }

      setTimeout(() => {
        selectWeapon(player.weaponCode, 1);
      }, 0);
    };

    function findAllianceBySid(sid) {
      return player.team ? alliancePlayers.find((THIS) => THIS === sid) : null;
    }
    function calculatePerfectAngle(x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1);
    }
    function isObjectBroken(object) {
      const healthThreshold = 20;
      return object.health < 300;
    }

    this.outtrap = function () {
      if (!this.justOutTrap) return;

      textManager.showText(
        player.x2,
        player.y2,
        30,
        0.18,
        500,
        "outtrap",
        "#ff4444",
      );

      if (configs.autoBreak) {
        autoBreaking = false;
      }

      if (player && player.y2 >= config.mapScale - config.snowBiomeTop) {
        buyEquip(22, 0);
        buyEquip(21, 1);
      } else {
        buyEquip(6, 0);
        buyEquip(21, 1);
      }

      clearTimeout(this._outTrapTimeout);
      this._outTrapTimeout = setTimeout(() => {
        this.testCanPlace(
          4,
          -(Math.PI / 2),
          Math.PI / 2,
          Math.PI / 18,
          undefined,
          false,
          { inTrap: false },
        );
      }, 120);
    };

    this.aftertrap = function (brokenObj) {
      if (!player || !this.inTrap || !brokenObj || !brokenObj.isItem) return;

      if (brokenObj.dmg && UTILS.getDist(brokenObj, player, 0, 2) < 250) {
        this.testCanPlace(
          2,
          -(Math.PI / 2),
          Math.PI / 2,
          Math.PI / 18,
          undefined,
          false,
          { inTrap: false },
        );

        textManager.showText(
          player.x2,
          player.y2,
          30,
          0.18,
          500,
          "aftertrap",
          "#ff8844",
        );
        return;
      }

      if (!brokenObj.trap || brokenObj.isTeamObject(player)) return;

      textManager.showText(
        player.x2,
        player.y2,
        30,
        0.18,
        500,
        "aftertrap",
        "#ff4444",
      );

      if (configs.autoBreak) {
        autoBreaking = false;
      }

      if (player && player.y2 >= config.mapScale - config.snowBiomeTop) {
        buyEquip(22, 0);
        buyEquip(21, 1);
      } else {
        buyEquip(6, 0);
        buyEquip(21, 1);
      }

      clearTimeout(this._afterTrapTimeout);
      this._afterTrapTimeout = setTimeout(
        () => {
          this.testCanPlace(
            4,
            -(Math.PI / 2),
            Math.PI / 2,
            Math.PI / 18,
            undefined,
            false,
            { inTrap: false },
          );
        },
        configs.autoBreak ? 120 : 250,
      );
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

    this.changeType = function (type) {
      this.wait = false;
      this.isTrue = true;
      my.autoAim = true;
      near.backupNobull = false;

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
      //m.showText(mouseCoord.x, mouseCoord.y + 50, 20, .18, 500, description, "white");
    }

    this.revInstakill = function () {
      notif("Rev Insta");
      healer1();
      selectWeapon(player.weapons[1]);
      buyEquip(53, 0);
      sendAutoGather();
      setTimeout(() => {
        selectWeapon(player.weapons[0]);
        buyEquip(7, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, 200);
      }, 100);
    };

    this.noBullInstakill = function () {
      notif("No Bull Insta");
      selectWeapon(player.weapons[0]);
      healer1();
      buyEquip(7, 0);
      buyEquip(21, 1);
      sendAutoGather();
      setTimeout(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(player.reloads[53] == 0 ? 53 : 6, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, 200);
      }, 100);
    };

    this.normalInstakill = function () {
      notif("Insta");
      selectWeapon(player.weapons[0]);
      healer1();
      buyEquip(7, 0);
      buyEquip(21, 1);
      sendAutoGather();
      setTimeout(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(player.reloads[53] == 0 ? 53 : 6, 0);
        setTimeout(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
        }, 200);
      }, 60);
    };

    this.spikeTickType = function () {
      notif("Spike Tick");
      this.isTrue = true;
      my.autoAim = true;

      // Calculate precise aim toward enemy
      const aimAngle = near
        ? Math.atan2(near.y2 - player.y2, near.x2 - player.x2)
        : player.dir;

      // Get spike angles toward enemy for placement
      const spikeAngles = traps.getAngles(2, 4, near, true);

      // First tick: Bull helmet + primary attack
      selectWeapon(player.weapons[0]);
      buyEquip(7, 0);
      buyEquip(21, 1);
      packet("a", aimAngle, 1);
      sendAutoGather();

      // Place spikes toward enemy immediately
      if (spikeAngles.length > 0) {
        place(2, spikeAngles[0]);
        if (spikeAngles.length > 1) place(2, spikeAngles[1]);
      }

      game.tickBase(() => {
        // Second tick: Turret gear for extra damage
        buyEquip(53, 0);
        buyEquip(21, 1);
        selectWeapon(player.weapons[0]);
        packet("a", aimAngle, 1);
        sendAutoGather();

        game.tickBase(() => {
          // Third tick: Continue attack
          buyEquip(53, 0);
          selectWeapon(player.weapons[0]);
          packet("a", aimAngle, 1);
          sendAutoGather();

          game.tickBase(() => {
            // Cleanup
            this.isTrue = false;
            my.autoAim = false;
            packet("a", undefined, 1);
            buyEquip(6, 0);
            buyEquip(21, 1);
          }, 1);
        }, 1);
      }, 1);
    };

    this.counterType = function () {
      notif("Counter");
      this.isTrue = true;
      my.autoAim = true;
      my.revAim = true;
      if (!recording) {
        sendChat("Abyss | Counter");
      }
      selectWeapon(player.weapons[1]);
      buyEquip(53, 0);
      buyEquip(19, 1);
      sendAutoGather();
      packet("a", near.aim2, 1);
      game.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 0);
        buyEquip(19, 1);
        packet("a", near.aim2, 1);
        game.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          packet("a", undefined, 1);
        }, 1);
      }, 1);
    };

    this.antiCounterType = function () {
      notif("Anti Counter");
      my.autoAim = true;
      this.isTrue = true;
      selectWeapon(player.weapons[0]);
      buyEquip(6, 0);
      buyEquip(21, 1);
      io.send("D", near.aim2);
      sendAutoGather();
      game.tickBase(() => {
        buyEquip(player.reloads[53] == 0 ? (player.skins[53] ? 53 : 6) : 6, 0);
        buyEquip(21, 1);
        game.tickBase(() => {
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
      my.ageInsta = false;
      if (player.items[5] === 18) {
        place(5, near.aim2);
      }
      packet("a", undefined, 1);
      buyEquip(22, 0);
      buyEquip(21, 1);
      game.tickBase(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(53, 0);
        buyEquip(21, 1);
        sendAutoGather();
        game.tickBase(() => {
          sendUpgrade(12);
          selectWeapon(player.weapons[1]);
          buyEquip(53, 0);
          buyEquip(21, 1);
          game.tickBase(() => {
            sendUpgrade(15);
            selectWeapon(player.weapons[1]);
            buyEquip(53, 0);
            buyEquip(21, 1);
            game.tickBase(() => {
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
      selectWeapon(player.weapons[1]);
      if (
        player.reloads[53] == 0 &&
        near.dist2 <= 700 &&
        near.skinIndex != 22
      ) {
        buyEquip(53, 0);
      } else {
        buyEquip(20, 0);
      }
      buyEquip(11, 1);
      sendAutoGather();
      game.tickBase(() => {
        sendAutoGather();
        this.isTrue = false;
        my.autoAim = false;
      }, 1);
    };

    this.oneTickType = function () {
      notif("One Tick");
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(player.weapons[1]);
      buyEquip(53, 0);
      buyEquip(19, 1);
      packet("a", near.aim2, 1);
      if (player.weapons[1] == 15) {
        my.revAim = true;
        sendAutoGather();
      }
      game.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 0);
        buyEquip(19, 1);
        packet("a", near.aim2, 1);
        if (player.weapons[1] != 15) {
          sendAutoGather();
        }
        game.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          packet("a", undefined, 1);
        }, 1);
      }, 1);
    };

    this.threeOneTickType = function () {
      notif("One Tick 3");
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(
        player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
      );
      biomeGear();
      buyEquip(19, 1);
      packet("a", near.aim2, 1);
      game.tickBase(() => {
        selectWeapon(
          player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0],
        );
        buyEquip(53, 0);
        buyEquip(19, 1);
        packet("a", near.aim2, 1);
        game.tickBase(() => {
          selectWeapon(player.weapons[0]);
          buyEquip(7, 0);
          buyEquip(19, 1);
          sendAutoGather();
          packet("a", near.aim2, 1);
          game.tickBase(() => {
            sendAutoGather();
            this.isTrue = false;
            my.autoAim = false;
            packet("a", undefined, 1);
          }, 1);
        }, 1);
      }, 1);
    };

    this.kmTickType = function () {
      notif("KM Tick");
      this.isTrue = true;
      my.autoAim = true;
      my.revAim = true;
      selectWeapon(player.weapons[1]);
      buyEquip(53, 0);
      buyEquip(19, 1);
      sendAutoGather();
      packet("a", near.aim2, 1);
      game.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 0);
        buyEquip(19, 1);
        packet("a", near.aim2, 1);
        game.tickBase(() => {
          sendAutoGather();
          this.isTrue = false;
          my.autoAim = false;
          packet("a", undefined, 1);
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

      this.currentTarget = near;

      const targetDistance = near.dist2;

      if (targetDistance <= this.boostRange - 180 && this.canExecute) {
        this.canExecute = false;
        const targetAngle = Math.atan2(near.y2 - player.y, near.x2 - player.x);
        this.executeBoostStrike(targetAngle, targetDistance);
      } else {
        this.scheduleCheck(50);
      }
    };

    this.validateTarget = function () {
      return (
        near && near.x2 && near.alive && near.health > 0 && near !== player
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

      game.tickBase(() => {
        if (!this.validateConnection()) return;
        this.prepareBoostStrike(angle);
      }, 0);

      game.tickBase(() => {
        if (!this.validateConnection()) return;
        this.placeBoostAndInitiate(angle);
      }, timingOffset);

      game.tickBase(() => {
        if (!this.validateConnection()) return;
        this.executeNormalInsta(angle);
      }, timingOffset + 1);

      game.tickBase(() => {
        this.finalizeBoostStrike();
      }, timingOffset + 2);
    };

    this.prepareBoostStrike = function (angle) {
      io.send("boostTickInsta");
      this.isTrue = true;
      my.autoAim = true;
    };

    this.placeBoostAndInitiate = function (angle) {
      if (player.items[4] === 16) {
        place(4, angle);
      }

      packet("a", angle, 1);
      biomeGear();
      buyEquip(19, 1);
    };

    this.executeNormalInsta = function (angle) {
      if (instaC && instaC.normalInstakill) {
        instaC.normalInstakill();
      } else {
        packet("d", 1, angle, 1);
      }

      packet("a", angle, 1);
    };

    this.finalizeBoostStrike = function () {
      this.isTrue = false;
      my.autoAim = false;
      my.revAim = false;
      packet("a", undefined, 0);
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

      packet("a", undefined, 0);
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

      if (enemy.length) {
        let dst = near.dist2;
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
                  if (configs.none) {
                    player.buildIndex != player.items[1] &&
                      selectToBuild(player.items[1]);
                  } else {
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
              biomeGear();
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
              dir: near.aim2 + Math.PI,
              action: 0,
            };
          } else if (dst > goal.b) {
            if (dst <= goal.h) {
              if (dst <= goal.f) {
                if (dst <= goal.d) {
                  bQ(40, 0);
                  bQ(9, 1);
                  if (configs.none) {
                    player.buildIndex != player.items[1] &&
                      selectToBuild(player.items[1]);
                  } else {
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
              biomeGear();
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
              dir: near.aim2,
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
      let moveMent = this.gotoGoal(685, 3);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.rangeType("ageInsta");
        } else {
          packet("a", moveMent.dir, 1);
        }
      } else {
        packet("a", moveMent.dir, 1);
      }
    };

    this.tickMovement = function () {
      let moveMent = this.gotoGoal(238, 3);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.boostTickType();
        } else {
          packet("a", moveMent.dir, 1);
        }
      } else {
        packet("a", moveMent.dir, 1);
      }
    };

    this.kmTickMovement = function () {
      let moveMent = this.gotoGoal(240, 3);
      if (moveMent.action) {
        if (
          near.skinIndex != 22 &&
          player.reloads[53] == 0 &&
          !this.isTrue &&
          (game.tick - near.poisonTick) % config.serverUpdateRate == 8
        ) {
          this.kmTickType();
        } else {
          packet("a", moveMent.dir, 1);
        }
      } else {
        packet("a", moveMent.dir, 1);
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
          packet("a", moveMent.dir, 1);
        }
      } else {
        packet("a", moveMent.dir, 1);
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
        let find = findID(hats, id);
        if (find && !player.skins[id] && player.points >= find.price)
          packet("c", 1, id, 0);
      });
    };
    this.acc = function () {
      buyAcc.forEach((id) => {
        let find = findID(accessories, id);
        if (find && !player.tails[id] && player.points >= find.price)
          packet("c", 1, id, 1);
      });
    };
  }
}

class Autoupgrade {
  constructor() {
    this.upg = (value) => packet("H", value);

    this.sb = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(3);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(31);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(9);
      else if (age === 7) this.upg(38);
    };

    this.kh = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(3);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(31);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(10);
      else if (age === 7) this.upg(38);
      else if (age === 8) this.upg(4);
      else if (age === 9) this.upg(25);
    };

    this.pb = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(5);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(32);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(9);
      else if (age === 7) this.upg(38);
    };

    this.ph = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(5);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(32);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(10);
      else if (age === 7) this.upg(38);
      else if (age === 8) this.upg(28);
      else if (age === 9) this.upg(25);
    };

    this.db = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(7);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(31);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(9);
      else if (age === 7) this.upg(34);
    };

    this.km = (upg) => {
      if (!player || !player.upgradePoints) return;
      const age = player.age;
      if (age === 2) this.upg(7);
      else if (age === 3) this.upg(17);
      else if (age === 4) this.upg(31);
      else if (age === 5) this.upg(23);
      else if (age === 6) this.upg(10);
      else if (age === 7) this.upg(38);
      else if (age === 8) this.upg(4);
      else if (age === 9) this.upg(15);
    };
  }
}

class Damages {
  constructor(items) {
    this.calcDmg = function (dmg, val) {
      return dmg * val;
    };
    this.getAllDamage = function (dmg) {
      return [
        this.calcDmg(dmg, 0.75),
        dmg,
        this.calcDmg(dmg, 1.125),
        this.calcDmg(dmg, 1.5),
      ];
    };
    this.weapons = [];
    for (let i = 0; i < items.weapons.length; i++) {
      let wp = items.weapons[i];
      let name =
        wp.name.split(" ").length <= 1
          ? wp.name
          : wp.name.split(" ")[0] + "_" + wp.name.split(" ")[1];
      this.weapons.push(this.getAllDamage(i > 8 ? wp.Pdmg : wp.dmg));
      this[name] = this.weapons[i];
    }
  }
}

let tmpList = [];
let UTILS = new Utils();
let items = new Items();
let objectManager = new Objectmanager(GameObject, gameObjects, UTILS, config);
let store = new Store();
let hats = store.hats;
let accessories = store.accessories;
let projectileManager = new ProjectileManager(
  Projectile,
  projectiles,
  players,
  ais,
  objectManager,
  items,
  config,
  UTILS,
);
let aiManager = new AiManager(ais, AI, players, items, null, config, UTILS);
let textManager = new Textmanager();

let traps = new Traps(UTILS, items);
let instaC = new Instakill();
let autoBuy = new Autobuy([40, 6, 7, 22, 53, 15, 31], [11, 21, 18, 13]);
let autoUpgrade = new Autoupgrade();

let lastDeath;
let minimapData;
let mapMarker = {};
let mapPings = [];
let tmpPing;

let antiinsta = true;
let antiinsta1 = false;

function sendChat(message) {
  packet("6", message.slice(0, 30));
}

let runAtNextTick = [];

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
      antiProj(nearPlayer, dir, range, speed, indx, weaponIndx);
    }
  }
}
let projectileCount = 0;

function antiProj(tmpObj, dir, range, speed, index, weaponIndex) {
  if (!tmpObj.isTeam(player)) {
    tmpDir = UTILS.getDirect(player, tmpObj, 2, 2);
    if (UTILS.getAngleDist(tmpDir, dir) <= 0.2) {
      tmpObj.bowThreat[weaponIndex]++;
      if (index == 5) {
        projectileCount++;
      }
      setTimeout(() => {
        tmpObj.bowThreat[weaponIndex]--;
        if (index == 5) {
          projectileCount--;
        }
      }, range / speed);
      if (
        tmpObj.bowThreat[9] >= 1 &&
        (tmpObj.bowThreat[12] >= 1 || tmpObj.bowThreat[15] >= 1)
      ) {
        place(1, tmpObj.aim2);
        my.anti0Tick = 4;
        if (!recording) {
          sendChat("Abyss | Skill Issue?");
        }
        if (!my.antiSync) {
          antiSyncHealing(4);
        }
      } else {
        if (projectileCount >= 2) {
          place(1, tmpObj.aim2);
          healer();
          if (!recording) {
            sendChat("Imagine Syncing");
          }
          buyEquip(22, 0);
          buyEquip(13, 1);
          my.anti0Tick = 4;
          if (!my.antiSync) {
            antiSyncHealing(4);
          }
        } else {
          if (projectileCount === 1) {
            buyEquip(6, 0);
            buyEquip(13, 1);
          } else {
            if (projectileCount >= 2) {
              return Math.ceil(
                (100 - player.health) / items.list[player.items[0]].healing,
              );
              healer();
              buyEquip(6, 0);
            }
          }
        }
      }
    }
  }
}

function showItemInfo(item, isWeapon, isStoreItem) {
  if (player && item) {
    UTILS.removeAllChildren(itemInfoHolder);
    itemInfoHolder.classList.add("visible");
    UTILS.generateElement({
      id: "itemInfoName",
      text: UTILS.capitalizeFirst(item.name),
      parent: itemInfoHolder,
    });
    UTILS.generateElement({
      id: "itemInfoDesc",
      text: item.desc,
      parent: itemInfoHolder,
    });
    if (isStoreItem) {
    } else if (isWeapon) {
      UTILS.generateElement({
        class: "itemInfoReq",
        text: !item.type ? "primary" : "secondary",
        parent: itemInfoHolder,
      });
    } else {
      for (let i = 0; i < item.req.length; i += 2) {
        UTILS.generateElement({
          class: "itemInfoReq",
          html:
            item.req[i] +
            "<span class='itemInfoReqVal'> x" +
            item.req[i + 1] +
            "</span>",
          parent: itemInfoHolder,
        });
      }
      if (item.group.limit) {
        UTILS.generateElement({
          class: "itemInfoLmt",
          text:
            (player.itemCounts[item.group.id] || 0) +
            "/" +
            (config.isSandbox
              ? item.group.sandboxLimit || 99
              : item.group.limit),
          parent: itemInfoHolder,
        });
      }
    }
  } else {
    itemInfoHolder.classList.remove("visible");
  }
}

window.addEventListener("resize", UTILS.checkTrusted(resize));

function resize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  let scaleFillNative =
    Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) *
    pixelDensity;
  gameCanvas.width = screenWidth * pixelDensity;
  gameCanvas.height = screenHeight * pixelDensity;
  gameCanvas.style.width = screenWidth + "px";
  gameCanvas.style.height = screenHeight + "px";
  mainContext.setTransform(
    scaleFillNative,
    0,
    0,
    scaleFillNative,
    (screenWidth * pixelDensity - maxScreenWidth * scaleFillNative) / 2,
    (screenHeight * pixelDensity - maxScreenHeight * scaleFillNative) / 2,
  );
}
resize();

var usingTouch;
const mals = document.getElementById("touch-controls-fullscreen");
mals.style.display = "block";
mals.addEventListener("mousemove", gameInput, false);

function gameInput(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
let clicks = {
  left: false,
  middle: false,
  right: false,
};
mals.addEventListener("mousedown", mouseDown, false);

function mouseDown(e) {
  if (attackState != 1) {
    attackState = 1;
    if (e.button == 0) {
      clicks.left = true;
    } else if (e.button == 1) {
      clicks.middle = true;
      bottics.forEach((c) => {
        if (c && c.syncing !== undefined) {
          c.syncing = true;
        }
      });
    } else if (e.button == 2) {
      clicks.right = true;
    }
  }
}
mals.addEventListener("mouseup", UTILS.checkTrusted(mouseUp));

function mouseUp(e) {
  if (attackState != 0) {
    attackState = 0;
    if (e.button == 0) {
      clicks.left = false;
    } else if (e.button == 1) {
      clicks.middle = false;
    } else if (e.button == 2) {
      clicks.right = false;
    }
  }
}
mals.addEventListener("wheel", wheel, false);

let wbe = 1.25;
function wheel(e) {
  if (e.deltaY < 0) {
    wbe -= 0.1;
    maxScreenWidth = config.maxScreenWidth * wbe;
    maxScreenHeight = config.maxScreenHeight * wbe;
    resize();
  } else {
    wbe += 0.1;
    maxScreenWidth = config.maxScreenWidth * wbe;
    maxScreenHeight = config.maxScreenHeight * wbe;
    resize();
  }
}
if (wbe === 1.25) {
  maxScreenWidth = config.maxScreenWidth * wbe;
  maxScreenHeight = config.maxScreenHeight * wbe;
  resize();
}

function getMoveDir() {
  let dx = 0;
  let dy = 0;
  for (let key in moveKeys) {
    let tmpDir = moveKeys[key];
    dx += !!keys[key] * tmpDir[0];
    dy += !!keys[key] * tmpDir[1];
  }
  return dx == 0 && dy == 0 ? undefined : Math.atan2(dy, dx);
}

function getSafeDir() {
  if (!player) {
    return 0;
  }
  if (!player.lockDir) {
    lastDir = Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2);
  }
  return lastDir || 0;
}

let plusDir = 0;
let lastSpin = Date.now();

function getAttackDir() {
  const now = Date.now();

  if (player && now - lastSpin >= 235 && !(clicks.right || clicks.left)) {
    plusDir += Math.random() * (Math.PI * 2);
    lastSpin = now;
  }

  if (!player) {
    return "0";
  }

  const primaryWeapon = player.weapons[0];
  const secondaryWeapon = player.weapons[1];
  const primaryReload = player.reloads[primaryWeapon];
  const secondaryReload = player.reloads[secondaryWeapon];
  const primaryInRange =
    near.dist2 <= items.weapons[primaryWeapon].range + near.scale * 1.8;

  function getBestTargetDirection() {
    if (enemy.length) {
      return near.aim2;
    }
    return getSafeDir();
  }

  if (
    my.autoAim ||
    ((clicks.left || (useWasd && primaryInRange && !traps.inTrap)) &&
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
  } else if (!player.lockDir) {
    if (!autos.stopspin || !useWasd) {
      lastDir = getSafeDir();
    }
  }

  lastDir = smoothTransition(lastDir);

  return lastDir;
}

function smoothTransition(targetDir) {
  const smoothingFactor = 0.1;
  return (1 - smoothingFactor) * lastDir + smoothingFactor * targetDir;
}

function getVisualDir() {
  if (!player) {
    return 0;
  }
  lastDir = getSafeDir();
  return lastDir || 0;
}

function keysActive() {
  return (
    allianceMenu.style.display != "block" && chatHolder.style.display != "block"
  );
}

function keyDown(event) {
  let keyNum = event.which || event.keyCode || 0;
  if (player && player.alive && keysActive()) {
    if (!keys[keyNum]) {
      keys[keyNum] = 1;
      macro[event.key] = 1;
      if (keyNum == 27) {
        // ESC key
        openMenu = !openMenu;
        // FIX: Replace jQuery-style toggle with DOM manipulation
        const menuDiv = document.getElementById("menuDiv");
        if (menuDiv) {
          menuDiv.style.display = openMenu ? "block" : "none";
        }
      } else if (keyNum == 109) {
        recording = !recording;
        console.log(recording);
      } else if (keyNum == 69) {
        sendAutoGather();
      } else if (keyNum == 67) {
        updateMapMarker();
      } else if (player.weapons[keyNum - 49] != undefined) {
        player.weaponCode = player.weapons[keyNum - 49];
      } else if (moveKeys[keyNum]) {
        sendMoveDir();
      } else if (event.key == "m") {
        mills.placeSpawnPads = !mills.placeSpawnPads;
      } else if (event.key == "z") {
        mills.place = !mills.place;
      } else if (event.key == "Z") {
        typeof window.debug == "function" && window.debug();
      } else if (keyNum == 32) {
        packet("d", 1, getSafeDir(), 1);
        packet("d", 0, getSafeDir(), 1);
      } else if (keyNum == 187) {
        botConnect();
      } else if (keyNum == 189) {
        disconnectBot();
      }
    }
  }
}

addEventListener("keydown", UTILS.checkTrusted(keyDown));

function keyUp(event) {
  if (player && player.alive) {
    let keyNum = event.which || event.keyCode || 0;
    if (keysActive()) {
      if (keys[keyNum]) {
        keys[keyNum] = 0;
        macro[event.key] = 0;
        if (moveKeys[keyNum]) {
          sendMoveDir();
        } else if (event.key == ",") {
          player.sync = false;
        }
      }
    }
  }
}

window.addEventListener("keyup", UTILS.checkTrusted(keyUp));

function sendMoveDir() {
  if (found) {
    packet("a", undefined, 1);
  } else {
    let newMoveDir = getMoveDir();
    if (
      lastMoveDir == undefined ||
      newMoveDir == undefined ||
      Math.abs(newMoveDir - lastMoveDir) > 0.3
    ) {
      if (!my.autoPush && !found) {
        packet("a", newMoveDir, 1);
      }
      lastMoveDir = newMoveDir;
    }
  }
}

function bindEvents() { }
bindEvents();

let isItemSetted = [];

function updateItemCountDisplay(index = undefined) {
  for (let i = 3; i < items.list.length; ++i) {
    let id = items.list[i].group.id;
    let tmpI = items.weapons.length + i;
    if (!isItemSetted[tmpI]) {
      isItemSetted[tmpI] = document.createElement("div");
      isItemSetted[tmpI].id = "itemCount" + tmpI;
      getEl("actionBarItem" + tmpI).appendChild(isItemSetted[tmpI]);
      isItemSetted[tmpI].style = `
                        display: block;
                        position: absolute;
                        padding-left: 5px;
                        font-size: 2em;
                        color: #fff;
                        `;
      isItemSetted[tmpI].innerHTML = player.itemCounts[id] || 0;
    } else {
      if (index == id)
        isItemSetted[tmpI].innerHTML = player.itemCounts[index] || 0;
    }
  }
}

function autoPush() {
  let nearTrap = gameObjects
    .filter(
      (tmp) =>
        tmp.trap &&
        tmp.active &&
        tmp.isTeamObject(player) &&
        UTILS.getDist(tmp, near, 0, 2) <= near.scale + tmp.getScale() + 5,
    )
    .sort(function (a, b) {
      return UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2);
    })[0];
  if (nearTrap) {
    // Check for retrap opportunity - monitor trap health
    if (nearTrap.health < 150 && nearTrap.health > 0) {
      // Predict trap break and prepare retrap
      const predictedBreakTime = nearTrap.health / 15; // Rough estimate
      setTimeout(() => {
        if (nearTrap.health <= 0 && near) {
          // Trap broke, move to perfect retrap position
          const retrapAngle = Math.atan2(
            near.y2 - player.y2,
            near.x2 - player.x2,
          );
          const retrapDistance = near.scale + 60; // Perfect retrap distance

          // Calculate perfect retrap position
          const retrapX = near.x2 + Math.cos(retrapAngle) * retrapDistance;
          const retrapY = near.y2 + Math.sin(retrapAngle) * retrapDistance;

          // Move to retrap position
          const moveDir = Math.atan2(retrapY - player.y2, retrapX - player.x2);
          packet("9", moveDir, 1);

          // Place trap when in position
          setTimeout(() => {
            const distToRetrapPos = Math.sqrt(
              Math.pow(player.x2 - retrapX, 2) +
              Math.pow(player.y2 - retrapY, 2),
            );

            if (distToRetrapPos <= 50 && player.items[4]) {
              const placeAngle = Math.atan2(
                near.y2 - player.y2,
                near.x2 - player.x2,
              );
              place(4, placeAngle, 1);

              // Show retrap notification
              textManager.showText(
                player.x2,
                player.y2,
                30,
                0.18,
                500,
                "retrap",
                "#ff00ff",
              );
            }
          }, 200);
        }
      }, predictedBreakTime * 50);
    }

    let spike = gameObjects
      .filter(
        (tmp) =>
          (tmp.dmg ||
            (tmp.type == 1 &&
              tmp.y >= config.mapScale - config.snowBiomeTop)) &&
          tmp.active &&
          !tmp.isTeamObject(near) &&
          UTILS.getDist(tmp, nearTrap, 0, 0) <=
          near.scale + nearTrap.scale + tmp.scale,
      )
      .sort(function (a, b) {
        return UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2);
      })[0];
    if (spike) {
      let pushAngle = Math.atan2(near.y2 - spike.y, near.x2 - spike.x);
      my.autoPush = true;
      my.pushData = {
        x: spike.x + Math.cos(pushAngle),
        y: spike.y + Math.sin(pushAngle),
        x2: player.x2 + 30,
        y2: player.y2 + 30,
      };

      let point = {
        x: near.x2 + Math.cos(pushAngle) * 30,
        y: near.y2 + Math.sin(pushAngle) * 60,
      };

      let dir = Math.atan2(point.y - player.y2, point.x - player.x2);

      packet("9", dir, 1);
    } else {
      if (my.autoPush) {
        my.autoPush = false;
        packet("9", lastMoveDir || undefined, 1);
      }
    }
  } else {
    if (my.autoPush) {
      my.autoPush = false;
      packet("9", lastMoveDir || undefined, 1);
    }
  }
}

function addDeadPlayer(tmpObj) {
  deadPlayers.push(
    new DeadPlayer(
      tmpObj.x,
      tmpObj.y,
      tmpObj.dir,
      tmpObj.buildIndex,
      tmpObj.weaponIndex,
      tmpObj.weaponVariant,
      tmpObj.skinColor,
      tmpObj.scale,
      tmpObj.name,
    ),
  );
}

function setInitData(data) {
  alliances = data.teams;
}

function setupGame(yourSID) {
  keys = {};
  macro = {};
  playerSID = yourSID;
  attackState = 0;
  inGame = true;
  packet("d", 0, getAttackDir(), 1);
  my.ageInsta = true;
  if (firstSetup) {
    firstSetup = false;
    gameObjects.length = 0;
    liztobj.length = 0;
  }
}

let originalName = null;

function addPlayer(data, isYou) {
  let tmpPlayer = findPlayerByID(data[0]);
  if (!tmpPlayer) {
    tmpPlayer = new Player(
      data[0],
      data[1],
      config,
      UTILS,
      projectileManager,
      objectManager,
      players,
      ais,
      items,
      hats,
      accessories,
    );
    players.push(tmpPlayer);
  }
  tmpPlayer.spawn(isYou ? true : null);
  tmpPlayer.visible = false;
  tmpPlayer.oldPos = {
    x2: undefined,
    y2: undefined,
  };
  tmpPlayer.x2 = undefined;
  tmpPlayer.y2 = undefined;
  tmpPlayer.x3 = undefined;
  tmpPlayer.y3 = undefined;
  tmpPlayer.setData(data);
  if (isYou) {
    if (!player) {
      window.prepareUI(tmpPlayer);
    }
    player = tmpPlayer;
    camX = player.x;
    camY = player.y;
    originalName = player.name;
    my.lastDir = 0;
    updateItems();
    updateAge();
    updateItemCountDisplay();
    if (player.skins[7]) {
      my.reSync = true;
    }
  }
}

function removePlayer(id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id == id) {
      players.splice(i, 1);
      break;
    }
  }
}

function updateHealth(sid, value) {
  let tmpObj = findPlayerBySID(sid);
  if (tmpObj) {
    tmpObj.oldHealth = tmpObj.health;
    tmpObj.health = value;
    tmpObj.judgeShame();

    if (tmpObj.oldHealth > tmpObj.health) {
      tmpObj.timeDamaged = Date.now();
      tmpObj.damaged = tmpObj.oldHealth - tmpObj.health;
      let damaged = tmpObj.damaged;

      // Create blood splatter when player takes damage (with SID for stacking)
      createBloodSplatter(
        tmpObj.x2 || tmpObj.x,
        tmpObj.y2 || tmpObj.y,
        damaged,
        tmpObj.sid,
      );

      if (tmpObj.health <= 0 && !tmpObj.death) {
        tmpObj.death = true;
        addDeadPlayer(tmpObj);
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
  let bullTicked = false;
  let autoheal = false;
  let antiinsta = true,
    antiinsta1 = true,
    antiinsta4 = true;

  if (player.shameCount > 1) {
    buyEquip(7, 13);
  } else {
    if (
      player.lastshamecount != 1 ||
      player.lastshamecount != 2 ||
      player.lastshamecount != 3 ||
      player.lastshamecount != 4 ||
      player.lastshamecount != 5 ||
      player.lastshamecount != 6 ||
      player.lastshamecount == 0
    ) {
      buyEquip(6);
    }
  }

  if (inGame) {
    let attackers = getAttacker(damaged);
    let gearDmgs = [0.25, 0.45].map(
      (val) => val * items.weapons[player.weapons[0]].dmg,
    );
    let includeSpikeDmgs = near.length
      ? !bullTicked &&
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
      autoheal = true;
      antiinsta = false;
      antiinsta1 = false;
      antiinsta4 = false;
    } else {
      if (player.shameCount !== 4) {
        autoheal = false;
        antiinsta = true;
        antiinsta4 = true;
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
        antiinsta = true;
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
        antiinsta4 = true;
      }
    }

    if (damaged >= 0 && damaged <= 90 && !antiinsta) {
      if (player.shameCount === 3) {
        antiinsta1 = true;
      } else {
        antiinsta1 = false;
      }
    }

    if (damaged <= 66 && player.skinIndex != 6 && enemy.weaponIndex === 4) {
      game.tickBase(() => {
        healer1();
      }, 2);
    }

    if (
      damaged >= (includeSpikeDmgs ? 8 : 20) &&
      player.damageThreat >= 20 &&
      antiinsta4 &&
      game.tick - player.antiTimer > 1
    ) {
      if (player.reloads[53] == 0 && player.reloads[player.weapons[1]] == 0) {
        player.canEmpAnti = true;
      } else {
        player.soldierAnti = true;
      }
      player.antiTimer = game.tick;
      let shame = player.weapons[0] == 4 ? 2 : 5;
      if (player.shameCount < shame) {
        healer();
      } else {
        game.tickBase(() => {
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
    } else {
      game.tickBase(() => {
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
  }
}

function killPlayer(sid) {
  inGame = false;
  lastDeath = {
    x: player.x,
    y: player.y,
  };
}

function updateItemCounts(index, value) {
  if (player) {
    player.itemCounts[index] = value;
    updateItemCountDisplay(index);
  }
}

function updateAge(xp, mxp, age) {
  if (xp != undefined) {
    player.XP = xp;
  }
  if (mxp != undefined) {
    player.maxXP = mxp;
  }
  if (age != undefined) {
    player.age = age;
  }
}

function updateUpgrades(points, age) {
  player.upgradePoints = points;
  player.upgrAge = age;
  if (points > 0) {
    tmpList.length = 0;
    UTILS.removeAllChildren(upgradeHolder);
    for (let i = 0; i < items.weapons.length; ++i) {
      if (
        items.weapons[i].age == age &&
        (items.weapons[i].pre == undefined ||
          player.weapons.indexOf(items.weapons[i].pre) >= 0)
      ) {
        let e = UTILS.generateElement({
          id: "upgradeItem" + i,
          class: "actionBarItem",
          onmouseout: function () {
            showItemInfo();
          },
          parent: upgradeHolder,
        });
        e.style.backgroundImage = getEl(
          "actionBarItem" + i,
        ).style.backgroundImage;
        tmpList.push(i);
      }
    }
    for (let i = 0; i < items.list.length; ++i) {
      if (
        items.list[i].age == age &&
        (items.list[i].pre == undefined ||
          player.items.indexOf(items.list[i].pre) >= 0)
      ) {
        let tmpI = items.weapons.length + i;
        let e = UTILS.generateElement({
          id: "upgradeItem" + tmpI,
          class: "actionBarItem",
          onmouseout: function () {
            showItemInfo();
          },
          parent: upgradeHolder,
        });
        e.style.backgroundImage = getEl(
          "actionBarItem" + tmpI,
        ).style.backgroundImage;
        tmpList.push(tmpI);
      }
    }
    for (let i = 0; i < tmpList.length; i++) {
      (function (i) {
        let tmpItem = getEl("upgradeItem" + i);
        tmpItem.onmouseover = function () {
          if (items.weapons[i]) {
            showItemInfo(items.weapons[i], true);
          } else {
            showItemInfo(items.list[i - items.weapons.length]);
          }
        };
        tmpItem.onclick = UTILS.checkTrusted(function () {
          packet("H", i);
        });
        UTILS.hookTouchEvents(tmpItem);
      })(tmpList[i]);
    }
    if (tmpList.length) {
      upgradeHolder.style.display = "block";
      upgradeCounter.style.display = "block";
      upgradeCounter.innerHTML = "SELECT ITEMS (" + points + ")";
    } else {
      upgradeHolder.style.display = "none";
      upgradeCounter.style.display = "none";
      showItemInfo();
    }
  } else {
    upgradeHolder.style.display = "none";
    upgradeCounter.style.display = "none";
    showItemInfo();
  }
}

const killObject = (sid) => {
  const findObj = findObjectBySid(sid);
  objectManager.disableBySid(sid);

  // Call aftertrap function when breaking objects
  if (findObj && traps && traps.aftertrap) {
    traps.aftertrap(findObj);
  }

  traps.replacer(findObj);

  const index = breakObjects.findIndex((obj) => obj.sid === sid);
  if (index !== -1) {
    breakObjects.splice(index, 1);
  }
  traps.replacer(findObj);
};

function killObjects(sid) {
  if (player) objectManager.removeAllItems(sid);
}
function fgdo(a, b) {
  return Math.sqrt(Math.pow(b.y - a.y, 2) + Math.pow(b.x - a.x, 2));
}
function setTickout(doo, timeout) {
  if (!ticks.manage[ticks.tick + timeout]) {
    ticks.manage[ticks.tick + timeout] = [doo];
  } else {
    ticks.manage[ticks.tick + timeout].push(doo);
  }
}

function caf(e, t) {
  try {
    return Math.atan2(
      (t.y2 || t.y) - (e.y2 || e.y),
      (t.x2 || t.x) - (e.x2 || e.x),
    );
  } catch (e) {
    return 0;
  }
}

let found = false;
let autoQ = false;

let autos = {
  insta: {
    todo: false,
    wait: false,
    count: 4,
    shame: 5,
  },
  bull: false,
  antibull: 0,
  reloaded: false,
  stopspin: true,
};

function fadeOut(audio, callback) {
  let volume = audio.volume;
  const fadeInterval = setInterval(() => {
    if (volume >= 0.4) {
      volume -= 0.02;
      audio.volume = Math.max(volume, 0).toFixed(1);
    } else {
      clearInterval(fadeInterval);
      audio.pause();
      audio.volume = 0.4;
      if (callback) callback();
    }
  }, 30);
}

function fadeIn(audio) {
  let volume = 0;
  audio.volume = volume;
  audio.play();
  const fadeInterval = setInterval(() => {
    if (volume <= 0.4) {
      volume += 0.02;
      audio.volume = Math.min(volume, 1).toFixed(1);
    } else {
      clearInterval(fadeInterval);
      audio.volume = 0.4;
    }
  }, 30);
}
function fsd(a, b) {
  if (!a || !b) return Infinity; // fallback if undefined
  if (Array.isArray(a)) a = { x: a[1], y: a[2] };
  if (Array.isArray(b)) b = { x: b[1], y: b[2] };
  if (a.x == null || a.y == null || b.x == null || b.y == null) return Infinity;
  return Math.hypot(a.y - b.y, a.x - b.x);
}
function AutoMill() {
  if (!mills.place) return;
  if (window.location.host !== "sandbox.moomoo.io" || checkLimit(3)) {
    mills.place = false;
    return;
  }
  if (lastMoveDir === undefined || (player.y > 6838 && player.y < 7563)) return;

  if (!this.lastMill) this.lastMill = { x: player.x, y: player.y };
  const W2 =
    1.13 + (player.items[3] === 11 ? 0.02 : player.items[3] === 12 ? 0.06 : 0);
  const angles = [
    lastMoveDir + Math.PI,
    lastMoveDir + Math.PI - W2,
    lastMoveDir + Math.PI + W2,
  ];

  if (fsd(this.lastMill, player) >= 90) {
    angles.forEach((a) => checkPlace(3, a));
    this.lastMill.x = player.x;
    this.lastMill.y = player.y;
  }
}
function updatePlayers(data) {
  autoHats();
  player.lastshamecount = player.shameCount;
  function getAngleDifference(angle1, angle2) {
    angle1 = angle1 % (2 * Math.PI);
    angle2 = angle2 % (2 * Math.PI);
    let diff = Math.abs(angle1 - angle2);
    if (diff > Math.PI) {
      diff = 2 * Math.PI - diff;
    }
    return diff;
  }
  game.tick++;
  enemy = [];
  nears = [];
  near = [];
  game.tickSpeed = performance.now() - game.lastTick;
  game.lastTick = performance.now();
  players.forEach((tmp) => {
    tmp.forcePos = !tmp.visible;
    tmp.visible = false;
    if (
      tmp.timeHealed - tmp.timeDamaged > 0 &&
      tmp.lastshamecount < tmp.shameCount
    ) {
      tmp.pinge = tmp.timeHealed - tmp.timeDamaged;
    }
  });
  for (let i = 0; i < data.length;) {
    tmpObj = findPlayerBySID(data[i]);
    if (tmpObj) {
      tmpObj.t1 = tmpObj.t2 === undefined ? game.lastTick : tmpObj.t2;
      tmpObj.t2 = game.lastTick;
      tmpObj.oldPos.x2 = tmpObj.x2;
      tmpObj.oldPos.y2 = tmpObj.y2;
      tmpObj.x1 = tmpObj.x;
      tmpObj.y1 = tmpObj.y;
      tmpObj.x2 = data[i + 1];
      tmpObj.y2 = data[i + 2];
      tmpObj.x3 = tmpObj.x2 + (tmpObj.x2 - tmpObj.oldPos.x2);
      tmpObj.y3 = tmpObj.y2 + (tmpObj.y2 - tmpObj.oldPos.y2);
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
      tmpObj.update(game.tickSpeed);
      tmpObj.dist2 = UTILS.getDist(tmpObj, player, 2, 2);
      tmpObj.aim2 = UTILS.getDirect(tmpObj, player, 2, 2);
      tmpObj.dist3 = UTILS.getDist(tmpObj, player, 3, 3);
      tmpObj.aim3 = UTILS.getDirect(tmpObj, player, 3, 3);
      tmpObj.damageThreat = 0;
      AutoMill();

      let trap = gameObjects.filter(
        (t) =>
          t.id == 15 &&
          UTILS.getDistance(enemy.x2, enemy.y2, t.x, t.y) <= 50 &&
          (t.owner.sid == player.sid || t.isTeamObject(t.owner.sid)),
      )[0];
      if (trap && trap.hideFromEnemy) {
        trap.hideFromEnemy = false;
      }
      if (tmpObj.skinIndex == 45 && tmpObj.shameTimer <= 0) {
        tmpObj.addShameTimer();
      }
      if (tmpObj.oldSkinIndex == 45 && tmpObj.skinIndex != 45) {
        tmpObj.shameTimer = 0;
        tmpObj.shameCount = 0;
        if (tmpObj == player) {
          healer();
        }
      }

      if (
        player.shameCount < 4 &&
        near.dist3 <= 300 &&
        near.reloads[near.primaryIndex] <=
        game.tickRate * (window.pingTime >= 130 ? 2 : 1)
      ) {
        autoQ = true;
        healer();
      } else {
        if (autoQ) {
          healer();
        }
        autoQ = false;
      }

      if (tmpObj == player) {
        if (liztobj.length) {
          liztobj.forEach((tmp) => {
            tmp.onNear = false;
            if (tmp.active) {
              if (
                !tmp.onNear &&
                UTILS.getDist(tmp, tmpObj, 0, 2) <=
                tmp.scale + items.weapons[tmpObj.weapons[0]].range
              ) {
                tmp.onNear = true;
              }
              if (tmp.isItem && tmp.owner) {
                if (
                  !tmp.pps &&
                  tmpObj.sid == tmp.owner.sid &&
                  UTILS.getDist(tmp, tmpObj, 0, 2) >
                  (parseInt(getEl("breakRange").value) || 0) &&
                  !tmp.breakObj &&
                  ![13, 14, 20].includes(tmp.id)
                ) {
                  tmp.breakObj = true;
                  breakObjects.push({
                    x: tmp.x,
                    y: tmp.y,
                    sid: tmp.sid,
                  });
                }
              }
            }
          });
          let nearTrap = liztobj
            .filter(
              (e) =>
                e.trap &&
                e.active &&
                UTILS.getDist(e, tmpObj, 0, 2) <=
                tmpObj.scale + e.getScale() + 15 &&
                !e.isTeamObject(tmpObj),
            )
            .sort(function (a, b) {
              return (
                UTILS.getDist(a, tmpObj, 0, 2) - UTILS.getDist(b, tmpObj, 0, 2)
              );
            })[0];
          if (nearTrap) {
            let spike = gameObjects.filter(
              (obj) =>
                obj.dmg &&
                cdf(tmpObj, obj) <= tmpObj.scale + nearTrap.scale / 2 &&
                !obj.isTeamObject(tmpObj) &&
                obj.active,
            )[0];
            traps.dist = UTILS.getDist(nearTrap, tmpObj, 0, 2);
            traps.aim = UTILS.getDirect(spike ? spike : nearTrap, tmpObj, 0, 2);
            traps.protect(caf(nearTrap, tmpObj) - Math.PI);

            // Check if we just got out of trap
            if (!traps.inTrap && traps.currTr) {
              traps.justOutTrap = true;
              clearTimeout(traps._outTrapTimer);
              traps._outTrapTimer = setTimeout(() => {
                traps.justOutTrap = false;
              }, 111);

              // Call outtrap function
              traps.outtrap();
            }

            traps.inTrap = true;
            traps.info = nearTrap;
          } else {
            // Check if we just got out of trap
            if (traps.inTrap && !traps.currTr) {
              traps.justOutTrap = true;
              clearTimeout(traps._outTrapTimer);
              traps._outTrapTimer = setTimeout(() => {
                traps.justOutTrap = false;
              }, 111);

              // Call outtrap function
              traps.outtrap();
            }

            traps.inTrap = false;
            traps.info = {};
          }

          // Store current trap state
          traps.currTr = traps.inTrap;
        } else {
          traps.inTrap = false;
        }
      }
      if (tmpObj.weaponIndex < 9) {
        tmpObj.primaryIndex = tmpObj.weaponIndex;
        tmpObj.primaryVariant = tmpObj.weaponVariant;
      } else if (tmpObj.weaponIndex > 8) {
        tmpObj.secondaryIndex = tmpObj.weaponIndex;
        tmpObj.secondaryVariant = tmpObj.weaponVariant;
      }
    }
    i += 13;
  }
  if (runAtNextTick.length) {
    runAtNextTick.forEach((tmp) => {
      checkProjectileHolder(...tmp);
    });
    runAtNextTick = [];
  }
  for (let i = 0; i < data.length;) {
    tmpObj = findPlayerBySID(data[i]);
    if (tmpObj) {
      if (!tmpObj.isTeam(player)) {
        enemy.push(tmpObj);
        if (
          tmpObj.dist2 <=
          items.weapons[
            tmpObj.primaryIndex == undefined ? 5 : tmpObj.primaryIndex
          ].range +
          player.scale * 2
        ) {
          nears.push(tmpObj);
        }
      }
      tmpObj.manageReload();
      if (tmpObj != player) {
        tmpObj.addDamageThreat(player);
      }
    }
    i += 13;
  }
  if (player && player.alive) {
    if (enemy.length) {
      near = enemy.sort(function (tmp1, tmp2) {
        return tmp1.dist2 - tmp2.dist2;
      })[0];
    }
    if (game.tickQueue[game.tick]) {
      game.tickQueue[game.tick].forEach((action) => {
        action();
      });
      game.tickQueue[game.tick] = null;
    }
    players.forEach((tmp) => {
      if (!tmp.visible && player != tmp) {
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
        };
      }
      if (tmp.setBullTick) {
        tmp.bullTimer = 0;
      }
      if (tmp.setPoisonTick) {
        tmp.poisonTimer = 0;
      }
      tmp.updateTimer();
    });
    if (inGame) {
      if (enemy.length) {
        if (player.canEmpAnti) {
          player.canEmpAnti = false;
          if (
            near.dist2 <= 300 &&
            !my.safePrimary(near) &&
            !my.safeSecondary(near)
          ) {
            if (near.reloads[53] == 0) {
              player.empAnti = true;
              player.soldierAnti = false;
            } else {
              player.empAnti = false;
              player.soldierAnti = true;
            }
          }
        }
        let prehit = liztobj
          .filter(
            (tmp) =>
              tmp.dmg &&
              tmp.active &&
              tmp.isTeamObject(player) &&
              UTILS.getDist(tmp, near, 0, 3) <= tmp.scale + near.scale,
          )
          .sort(function (a, b) {
            return UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2);
          })[0];
        if (prehit) {
          if (
            near.dist3 <=
            items.weapons[player.weapons[0]].range + player.scale * 1.8 &&
            configs.predictTick
          ) {
            instaC.canSpikeTick = true;
            instaC.syncHit = true;
            if (
              configs.revTick &&
              player.weapons[1] == 15 &&
              player.reloads[53] == 0 &&
              instaC.perfCheck(player, near)
            ) {
              instaC.revTick = true;
            }
          }
        }
        let antiSpikeTick = liztobj
          .filter(
            (tmp) =>
              tmp.dmg &&
              tmp.active &&
              !tmp.isTeamObject(player) &&
              UTILS.getDist(tmp, player, 0, 3) < tmp.scale + player.scale,
          )
          .sort(function (a, b) {
            return (
              UTILS.getDist(a, player, 0, 2) - UTILS.getDist(b, player, 0, 2)
            );
          })[0];
        if (antiSpikeTick && !traps.inTrap) {
          if (near.dist3 <= items.weapons[5].range + near.scale * 1.8) {
            my.anti0Tick = 1;
          }
        }
      }
      if (
        (useWasd
          ? true
          : (player.checkCanInsta(true) >= 100
            ? player.checkCanInsta(true)
            : player.checkCanInsta(false)) >=
          (player.weapons[1] == 10 ? 95 : 100)) &&
        near.dist2 <=
        items.weapons[
          player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]
        ].range +
        near.scale * 1.8 &&
        (instaC.wait || (useWasd && Math.floor(Math.random() * 5) == 0)) &&
        !instaC.isTrue &&
        !my.waitHit &&
        player.reloads[player.weapons[0]] == 0 &&
        player.reloads[player.weapons[1]] == 0 &&
        (useWasd
          ? true
          : getEl("instaType").value == "oneShot"
            ? player.reloads[53] <=
            (player.weapons[1] == 10 ? 0 : game.tickRate)
            : true) &&
        instaC.perfCheck(player, near)
      ) {
        if (player.checkCanInsta(true) >= 100) {
          instaC.nobull = useWasd ? false : instaC.canSpikeTick ? false : true;
        } else {
          instaC.nobull = false;
        }
        instaC.can = true;
      } else {
        instaC.can = false;
      }
      if (macro.q) {
        if (player && player.health < player.maxHealth) {
          if (!window.lastQPlace || Date.now() - window.lastQPlace > 30) {
            place(0, getAttackDir());
            window.lastQPlace = Date.now();
          }
        }
      }
      macro.f && place(4, getSafeDir());
      macro.v && place(2, getSafeDir());
      if (macro.l) {
        let dir =
          near && near.x2 && near.dist2 < 500
            ? UTILS.getDirect(near, player, 2, 2)
            : getSafeDir();

        const spikeItem = items.list[player.items[2]];
        const boostItem = items.list[player.items[4]];
        if (!spikeItem || !boostItem) return;

        const spikeScale =
          player.scale + spikeItem.scale + (spikeItem.placeOffset || 0);
        const boostScale =
          player.scale + boostItem.scale + (boostItem.placeOffset || 0);

        // Predict position based on velocity for tighter placements
        const predX = player.x2 + (player.xVel || 0) * 0.5;
        const predY = player.y2 + (player.yVel || 0) * 0.5;

        const canPlaceAt = (item, scale, angle) => {
          const x = predX + Math.cos(angle) * scale;
          const y = predY + Math.sin(angle) * scale;
          return objectManager.checkItemLocation(
            x,
            y,
            item.scale,
            0.6,
            item.id,
            false,
            player,
          );
        };

        const findValidAngle = (item, scale, baseAngle, searchRange) => {
          if (canPlaceAt(item, scale, baseAngle)) return baseAngle;
          const step = Math.PI / 24;
          for (let offset = step; offset <= searchRange; offset += step) {
            if (canPlaceAt(item, scale, baseAngle + offset))
              return baseAngle + offset;
            if (canPlaceAt(item, scale, baseAngle - offset))
              return baseAngle - offset;
          }
          return null;
        };

        const boostAngle = findValidAngle(
          boostItem,
          boostScale,
          dir,
          Math.PI / 6,
        );
        if (boostAngle !== null) place(4, boostAngle);

        const rightAngle = findValidAngle(
          spikeItem,
          spikeScale,
          dir + Math.PI / 2,
          Math.PI / 4,
        );
        const leftAngle = findValidAngle(
          spikeItem,
          spikeScale,
          dir - Math.PI / 2,
          Math.PI / 4,
        );

        if (rightAngle !== null) place(2, rightAngle);
        if (leftAngle !== null) place(2, leftAngle);
      }
      if (macro.k) {
        let dir = getSafeDir();
        checkPlace(2, dir + Math.PI / 4);
        checkPlace(2, dir - Math.PI / 4);
        checkPlace(2, dir + Math.PI + Math.PI / 4);
        checkPlace(2, dir + Math.PI - Math.PI / 4);
      }
      macro.y && place(5, getSafeDir());
      macro.h && place(player.getItemType(22), getSafeDir());
      macro.n && place(3, getSafeDir());
      if (game.tick % 1 == 0) {
        if (mills.placeSpawnPads) {
          for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
            checkPlace(
              player.getItemType(20),
              UTILS.getDirect(player.oldPos, player, 2, 2) + i,
            );
          }
        }
      }
      if (instaC.can) {
        instaC.changeType(player.weapons[1] == 10 ? "rev" : "normal");
      }
      if (instaC.canCounter) {
        instaC.canCounter = false;
        if (player.reloads[player.weapons[0]] == 0 && !instaC.isTrue) {
          instaC.counterType();
          if (!recording) {
            sendChat("Abyss | Counter");
          }
        }
      }
      if (instaC.canSpikeTick) {
        instaC.canSpikeTick = false;
        if (instaC.revTick) {
          instaC.revTick = false;
          if (
            [1, 2, 3, 4, 5, 6].includes(player.weapons[0]) &&
            player.reloads[player.weapons[1]] == 0 &&
            !instaC.isTrue
          ) {
            instaC.changeType("rev");
          }
        } else {
          if (
            [1, 2, 3, 4, 5, 6].includes(player.weapons[0]) &&
            player.reloads[player.weapons[0]] == 0 &&
            !instaC.isTrue
          ) {
            instaC.spikeTickType();
            if (instaC.syncHit) {
            }
          }
        }
      }
      if (!clicks.middle && (clicks.left || clicks.right) && !instaC.isTrue) {
        bottics.forEach((c) => {
          if (!c.synchit) {
            c.syncHit();
          }
        });
        if (
          player.weaponIndex !=
          (clicks.right && player.weapons[1] == 10
            ? player.weapons[1]
            : player.weapons[0]) ||
          player.buildIndex > -1
        ) {
          selectWeapon(
            clicks.right && player.weapons[1] == 10
              ? player.weapons[1]
              : player.weapons[0],
          );
        }
        if (
          player.reloads[
          clicks.right && player.weapons[1] == 10
            ? player.weapons[1]
            : player.weapons[0]
          ] == 0 &&
          !my.waitHit
        ) {
          sendAutoGather();
          my.waitHit = 1;
          game.tickBase(() => {
            sendAutoGather();
            my.waitHit = 0;
          }, 1);
        }
      }
      if (
        useWasd &&
        !clicks.left &&
        !clicks.right &&
        !instaC.isTrue &&
        near.dist2 <=
        items.weapons[player.weapons[0]].range + near.scale * 1.8 &&
        !traps.inTrap
      ) {
        if (player.weaponIndex != player.weapons[0] || player.buildIndex > -1) {
          selectWeapon(player.weapons[0]);
        }
        if (player.reloads[player.weapons[0]] == 0 && !my.waitHit) {
          sendAutoGather();
          my.waitHit = 1;
          game.tickBase(() => {
            sendAutoGather();
            my.waitHit = 0;
          }, 1);
        }
      }
      if (traps.inTrap) {
        let spike = null;
        let minDist = Infinity;
        for (let i = 0; i < gameObjects.length; i++) {
          let obj = gameObjects[i];
          if (!obj || !obj.active) continue;
          if (
            obj.name !== "spikes" &&
            obj.name !== "greater spikes" &&
            obj.name !== "spinning spikes" &&
            obj.name !== "poison spikes"
          )
            continue;
          if (obj.isTeamObject(player)) continue;
          let dist = fgdo(player, obj);
          if (dist < player.scale + obj.scale + 25 && dist < minDist) {
            minDist = dist;
            spike = obj;
          }
        }

        if (!clicks.left && !clicks.right && !instaC.isTrue) {
          if (spike) {
            traps.aim = Math.atan2(spike.y - player.y, spike.x - player.x);
          } else if (traps.info) {
            traps.aim = Math.atan2(
              traps.info.y - player.y,
              traps.info.x - player.x,
            );
          }

          const useSecondary = traps.notFast();
          const breakWeapon = useSecondary
            ? player.weapons[1]
            : player.weapons[0];

          if (configs.autoBreak) {
            autoBreaking = true;
            if (player.skinIndex !== 40) buyEquip(40, 19);
          }

          if (player.weaponIndex !== breakWeapon || player.buildIndex > -1) {
            selectWeapon(breakWeapon);
          }
          if (player.reloads[breakWeapon] === 0 && !my.waitHit) {
            sendAutoGather();
            my.waitHit = 1;
            game.tickBase(() => {
              sendAutoGather();
              my.waitHit = 0;
            }, 1);
          }
        }
      } else if (autoBreaking) {
        autoBreaking = false;
      }
    }
    if (clicks.middle && !traps.inTrap) {
      if (!instaC.isTrue && player.reloads[player.weapons[1]] == 0) {
        if (
          my.ageInsta &&
          player.weapons[0] != 4 &&
          player.weapons[1] == 9 &&
          player.age >= 9 &&
          enemy.length
        ) {
          instaC.bowMovement();
        } else {
          instaC.rangeType();
        }
      }
    }
    if (macro.t && !traps.inTrap) {
      if (
        !instaC.isTrue &&
        player.reloads[player.weapons[0]] == 0 &&
        (player.weapons[1] == 15
          ? player.reloads[player.weapons[1]] == 0
          : true) &&
        (player.weapons[0] == 5 ||
          (player.weapons[0] == 4 && player.weapons[1] == 15))
      ) {
        instaC[
          player.weapons[0] == 4 && player.weapons[1] == 15
            ? "kmTickMovement"
            : "tickMovement"
        ]();
      }
    }
    if (macro["."] && !traps.inTrap) {
      if (
        !instaC.isTrue &&
        player.reloads[player.weapons[0]] == 0 &&
        ([9, 12, 13, 15].includes(player.weapons[1])
          ? player.reloads[player.weapons[1]] == 0
          : true)
      ) {
        instaC.boostTickType();
      }
    }
    if (macro[","] && !traps.inTrap) {
      if (!instaC.isTrue && player.reloads[player.weapons[0]] == 0) {
        instaC.oneTickType();
      }
    }
    if (
      player.weapons[1] &&
      !clicks.left &&
      !clicks.right &&
      !traps.inTrap &&
      !instaC.isTrue &&
      !(
        useWasd &&
        near.dist2 <= items.weapons[player.weapons[0]].range + near.scale * 1.8
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
        if (useWasd) {
          autos.stopspin = false;
        }
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
          if (useWasd) {
            if (!autos.stopspin) {
              setTimeout(() => {
                autos.stopspin = true;
              }, 750);
            }
          }
        }
      }
    }
    if (!instaC.isTrue && !traps.inTrap && !traps.replaced) {
      traps.autoPlace();
    }
    if (!macro.q && !macro.f && !macro.v && !macro.h && !macro.n) {
      packet("D", getAttackDir());
    }
    let hatChanger = function () {
        const leftHat = 7;
        const rightHat = 40;
        const idleHat = AB.Menu.idleHat || 22;
        const nearDist = near ? near.dist2 : 9999;
        const isStationary = UTILS.getDistance(player.x1, player.y1, player.x2, player.y2) < 1;
        
        if (clicks.left || clicks.right) {
            if (clicks.left) {
                buyEquip(
                    player.reloads[player.weapons[0]] == 0
                        ? AB.Menu.weaponGrind ? 40 : 7
                        : player.empAnti ? 22 : 6,
                    0
                );
            } else if (clicks.right) {
                buyEquip(
                    player.reloads[player.weapons[1] === 10 ? player.weapons[1] : player.weapons[0]] === 0
                        ? 40
                        : player.empAnti ? 22 : 6,
                    0
                );
            }
        } else if (traps.inTrap && traps.info.health > items.weapons[player.weaponIndex].dmg && 
                   player.reloads[player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]] == 0) {
            buyEquip(40, 0);
            buyEquip(21, 1);
        } else if (AB.Menu.weaponGrind && player.items.includes(22)) {
            const targetTier = { Gold: 1, Diamond: 2, Ruby: 3 }[AB.Menu.grindTo] || AB.Menu.grindTo;
            if (player.primaryVariant < targetTier || (player.weapons[1] == 10 && player.secondaryVariant < targetTier)) {
                if (player.reloads[player.weapons[1] === 10 ? player.weapons[1] : player.weapons[0]] === 0) {
                    buyEquip(40, 0);
                }
            }
        } else if (nearDist <= 300) {
            const antiBullActive = (AB.Menu.antiBullType === "abreload" && near.antiBull > 0) ||
                                  (AB.Menu.antiBullType === "abalway" && (near.inTrap || near.reloads[near.primaryIndex] === 0));
            buyEquip(antiBullActive ? 11 : 6, 0);
        } else if (isStationary) {
            buyEquip(idleHat, 0);
        } else {
            biomeGear(1);
        }
    };
    
    let accChanger = function () {
        const idleAcc = AB.Menu.idleAcc || 11;
        const nearDist = near ? near.dist2 : 9999;
        const isStationary = UTILS.getDistance(player.x1, player.y1, player.x2, player.y2) < 1;
        
        if (instaC.can && player.checkCanInsta(true) >= 100) {
            buyEquip(18, 1);
        } else if (clicks.left) {
            setTimeout(() => buyEquip(21, 1), 50);
        } else if (clicks.right) {
            setTimeout(() => buyEquip(18, 1), 50);
        } else if (nearDist <= 240) {
            buyEquip(21, 1);
        } else if (isStationary && !traps.inTrap) {
            buyEquip(idleAcc, 1);
        } else {
            traps.inTrap ? buyEquip(21, 1) : buyEquip(11, 1);
        }
    };

    let wasdGears = function () {
      if (my.anti0Tick > 0) {
        // Keep soldier helmet for anti0Tick situations
        buyEquip(6, 0);
      } else {
        // Check current biome first
        const inWater =
          player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
          player.y2 <= config.mapScale / 2 + config.riverWidth / 2;
        const inSnow = player.y2 <= config.snowBiomeTop;

        // Base hat based on biome (only override for special combat situations)
        let baseHat = 12; // Default: Booster Hat
        if (inWater)
          baseHat = 31; // Flipper in water
        else if (inSnow) baseHat = 15; // Winter in snow

        if (clicks.left || clicks.right) {
          if (
            (player.shameCount > 4320 &&
              (game.tick - player.bullTick) % config.serverUpdateRate === 0 &&
              player.skinIndex != 45) ||
            my.reSync
          ) {
            // Bull helmet for high shame/sync - override biome
            buyEquip(7, 0);
          } else {
            if (clicks.left) {
              // Combat override only if actually attacking
              const combatHat =
                player.reloads[player.weapons[0]] == 0
                  ? getEl("weaponGrind").checked
                    ? 40
                    : 7 // Tank or Bull when attacking
                  : player.empAnti
                    ? 22
                    : baseHat; // EMP or biome hat
              if (player.skinIndex != combatHat) buyEquip(combatHat, 0);
            } else if (clicks.right) {
              const combatHat =
                player.reloads[
                  clicks.right && player.weapons[1] == 10
                    ? player.weapons[1]
                    : player.weapons[0]
                ] == 0
                  ? 40 // Tank gear
                  : player.empAnti
                    ? 22
                    : baseHat; // EMP or biome hat
              if (player.skinIndex != combatHat) buyEquip(combatHat, 0);
            }
          }
        } else if (
          near.dist2 <=
          items.weapons[player.weapons[0]].range + near.scale * 1.8 &&
          !traps.inTrap
        ) {
          // Enemy in range - combat mode
          if (
            (player.shameCount > 4320 &&
              (game.tick - player.bullTick) % config.serverUpdateRate === 0 &&
              player.skinIndex != 45) ||
            my.reSync
          ) {
            buyEquip(7, 0);
          } else {
            const combatHat =
              player.reloads[player.weapons[0]] == 0
                ? 7
                : player.empAnti
                  ? 22
                  : baseHat;
            if (player.skinIndex != combatHat) buyEquip(combatHat, 0);
          }
        } else if (traps.inTrap) {
          // In trap - special handling
          if (
            traps.info.health <= items.weapons[player.weaponIndex].dmg
              ? false
              : player.reloads[
              player.weapons[1] == 10
                ? player.weapons[1]
                : player.weapons[0]
              ] == 0
          ) {
            buyEquip(40, 0); // Tank gear for breaking traps
          } else {
            if (
              (player.shameCount > 4320 &&
                (game.tick - player.bullTick) % config.serverUpdateRate === 0 &&
                player.skinIndex != 45) ||
              my.reSync
            ) {
              buyEquip(7, 0);
            } else {
              buyEquip(player.empAnti ? 22 : baseHat, 0); // EMP or biome hat
            }
          }
        } else {
          // No combat - use biome hat
          if (player.empAnti) {
            buyEquip(22, 0); // EMP override
          } else {
            if (
              (player.shameCount > 4320 &&
                (game.tick - player.bullTick) % config.serverUpdateRate === 0 &&
                player.skinIndex != 45) ||
              my.reSync
            ) {
              buyEquip(7, 0); // Bull for shame
            } else {
              // DEFAULT TO BIOME HAT
              if (player.skinIndex != baseHat) buyEquip(baseHat, 0);
            }
          }
        }
      }
      if (clicks.left || clicks.right) {
        if (clicks.left) {
          buyEquip(0, 1);
        } else if (clicks.right) {
          buyEquip(11, 1);
        }
      } else if (
        near.dist2 <=
        items.weapons[player.weapons[0]].range + near.scale * 1.8 &&
        !traps.inTrap
      ) {
        buyEquip(0, 1);
      } else if (traps.inTrap) {
        buyEquip(0, 1);
      } else {
        buyEquip(11, 1);
      }
    };
    if (
      storeMenu.style.display != "block" &&
      !instaC.isTrue &&
      !instaC.ticking
    ) {
      if (useWasd) {
        wasdGears();
      } else {
        hatChanger();
        accChanger();
      }
    }
    if (
      configs.hatCycle &&
      !clicks.right &&
      !clicks.left &&
      !instaC.canSpikeTick &&
      !instaC.isTrue &&
      !instaC.ticking &&
      !traps.inTrap
    ) {
      const hats = [51, 50, 28, 29, 30, 36, 37, 38, 44, 35, 42, 43, 49];

      const inRiver = function () {
        const riverMin = config.mapScale / 2 - config.riverWidth / 2;
        const riverMax = config.mapScale / 2 + config.riverWidth / 2;
        return player.y2 >= riverMin && player.y2 <= riverMax;
      };

      if (inRiver()) {
        buyEquip(31, 0);
      } else {
        if (typeof player.hatCycleIndex === "undefined") {
          player.hatCycleIndex = hats.indexOf(Number(player.hat));
          if (player.hatCycleIndex === -1) player.hatCycleIndex = 0;
          player.lastHatSwitchTime = Date.now();
        }

        const currentTime = Date.now();
        if (currentTime - player.lastHatSwitchTime >= 100) {
          player.hatCycleIndex = (player.hatCycleIndex + 1) % hats.length;
          buyEquip(hats[player.hatCycleIndex], 0);
          player.lastHatSwitchTime = currentTime;
        }
      }
    }
    if (configs.autoPush && enemy.length && !traps.inTrap && !instaC.ticking) {
      autoPush();
    } else {
      if (my.autoPush) {
        my.autoPush = false;
        packet("a", lastMoveDir || undefined, 1);
      }
    }

    if (configs.autoUpgrade && player.age < 9) {
      const type = getEl("UpgType").value;

      if (autoUpgrade[type]) {
        autoUpgrade[type]();
      }
    }

    if (configs.safeWalk && player.alive) {
      let movementStopped = false;

      const dangerousSpike = gameObjects.find((spike) => {
        if (!spike.active || !spike.dmg) return false;
        if (!spike.owner) return false;
        if (spike.owner.sid === player.sid) return false;
        if (player.team && spike.owner.team === player.team) return false;

        const currentDist = UTILS.getDist(player, spike, 2, 0);
        const minDistance = spike.scale + player.scale * 2 + 40;
        if (currentDist > 300) return false;

        if (player.moveDir !== undefined && currentDist < minDistance) {
          const dx = spike.x - player.x;
          const dy = spike.y - player.y;
          const angleToSpike = Math.atan2(dy, dx);
          const moveAngle = player.moveDir;
          let angleDiff = Math.abs(angleToSpike - moveAngle);
          if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;
          return angleDiff < Math.PI / 4;
        }

        return false;
      });

      if (dangerousSpike && !movementStopped) {
        movementStopped = true;
        packet("9", undefined);
      }

      if (!dangerousSpike && movementStopped) {
        movementStopped = false;
      }
    }

    // ---- Anti-Insta State (Persistent) ----
    if (!window.antiInstaState) {
      window.antiInstaState = {
        lastHP: null,
        lastHPTime: 0,
        lastTrigger: 0,
        lastHealTrigger: 0,
        enemyCache: new Map(),
        damageLog: [],
        threatLevel: 0,
      };
    }

    if (configs.antiInsta && player && player.alive) {
      const now = performance.now();
      const state = window.antiInstaState;
      let threat = 0;
      let immediateThreat = false;

      const calcEnemyDamage = (e) => {
        if (!e || !e.primaryIndex) return 0;
        const weapon = items.weapons[e.primaryIndex];
        if (!weapon) return 0;
        let dmg = weapon.dmg || 0;
        if (e.weaponVariant !== undefined) {
          const variant = config.weaponVariants[e.weaponVariant];
          if (variant && variant.val) dmg *= variant.val;
        }
        if (e.skinIndex === 7) dmg *= 1.5;
        if (e.tailIndex === 21) dmg *= 1.25;
        if (player.skinIndex === 6) dmg *= 0.75;
        if (player.tailIndex === 13) dmg *= 0.8;
        return dmg;
      };

      const calcSecondaryDamage = (e) => {
        if (!e || e.secondaryIndex === undefined) return 0;
        const weapon = items.weapons[e.secondaryIndex];
        if (!weapon) return 0;
        let dmg = weapon.dmg || 0;
        if (e.skinIndex === 7) dmg *= 1.5;
        if (player.skinIndex === 6) dmg *= 0.75;
        return dmg;
      };

      const calcTotalBurst = (e) => {
        let total = calcEnemyDamage(e);
        total += calcSecondaryDamage(e);
        if ([6, 7, 8, 9].includes(e.secondaryIndex)) total += 25;
        return total;
      };

      if (state.lastHP !== null && player.health < state.lastHP) {
        const dmgTaken = state.lastHP - player.health;
        const timeDelta = now - state.lastHPTime;
        state.damageLog.push({ dmg: dmgTaken, time: now });
        state.damageLog = state.damageLog.filter((d) => now - d.time < 500);
        const recentDmg = state.damageLog.reduce((sum, d) => sum + d.dmg, 0);
        if (recentDmg >= 80) threat += 40;
        if (dmgTaken >= 50 && timeDelta < 150) {
          threat += 30;
          immediateThreat = true;
        }
      }
      state.lastHP = player.health;
      state.lastHPTime = now;

      for (let i = enemy.length - 1; i >= 0; i--) {
        const e = enemy[i];
        if (!e.alive) {
          state.enemyCache.delete(e.sid);
          continue;
        }

        const dist = UTILS.getDist(player, e, 2, 2);
        if (dist > 350) continue;

        let c = state.enemyCache.get(e.sid);
        if (!c) {
          c = {
            p: e.primaryIndex,
            s: e.secondaryIndex,
            h: e.skinIndex,
            t: e.tailIndex,
            d: e.dir,
            r: e.reloads?.[e.primaryIndex] || 0,
            m: now,
            burst: 0,
          };
          state.enemyCache.set(e.sid, c);
        }

        const potentialBurst = calcTotalBurst(e);
        const canKillMe = potentialBurst >= player.health;

        if (dist <= 250) {
          if (e.primaryIndex !== c.p || e.secondaryIndex !== c.s) {
            threat += 25;
            if (canKillMe) immediateThreat = true;
          }

          const wasReloading = c.r > 0;
          const nowReady = !e.reloads?.[e.primaryIndex];
          if (wasReloading && nowReady) {
            threat += 20;
            if (dist <= 180) immediateThreat = true;
          }

          const aimingAtMe =
            UTILS.getAngleDist(e.dir, UTILS.getDirect(e, player, 2, 2)) < 0.15;
          if (aimingAtMe) {
            threat += 15;
            if (dist <= 150 && nowReady) immediateThreat = true;
          }

          const stopped = Math.abs(e.spdX) < 0.05 && Math.abs(e.spdY) < 0.05;
          if (stopped && now - c.m > 80) {
            threat += 10;
          } else if (!stopped) {
            c.m = now;
          }

          const combatHats = [6, 7, 11, 14, 21, 22, 26, 40, 53];
          const combatTails = [11, 13, 21];
          if (e.skinIndex !== c.h && combatHats.includes(e.skinIndex)) {
            threat += 20;
          }
          if (e.tailIndex !== c.t && combatTails.includes(e.tailIndex)) {
            threat += 15;
          }
        }

        c.p = e.primaryIndex;
        c.s = e.secondaryIndex;
        c.h = e.skinIndex;
        c.t = e.tailIndex;
        c.d = e.dir;
        c.r = e.reloads?.[e.primaryIndex] || 0;
        c.burst = potentialBurst;
      }

      for (let i = 0; i < projectiles.length; i++) {
        const p = projectiles[i];
        if (!p.owner || player.findAllianceBySid?.(p.owner.sid)) continue;
        const projDist = UTILS.getDist(player, p, 2, 2);
        if (p.projDmg && p.projDmg >= 25 && projDist < 100) {
          threat += 25;
          if (projDist < 60) immediateThreat = true;
        }
      }

      if (player.inTrap) {
        const nearbySpike = gameObjects.find(
          (o) =>
            o.active &&
            o.dmg &&
            (!o.isTeamObject || !o.isTeamObject(player)) &&
            UTILS.getDist(player, o, 2, 0) <=
            player.scale + (o.scale || 35) + 12,
        );
        if (nearbySpike) {
          threat += 35;
          immediateThreat = true;
        }
      }

      state.threatLevel = threat;

      const cooldown = immediateThreat ? 80 : 130;
      if (threat >= 30 && now - state.lastTrigger > cooldown) {
        state.lastTrigger = now;

        if (immediateThreat || threat >= 50) {
          buyEquip(6, 0);
          buyEquip(21, 1);
        } else if (threat >= 30) {
          buyEquip(22, 0);
          buyEquip(13, 1);
        }

        if (
          player.health < player.maxHealth &&
          now - state.lastHealTrigger > 100
        ) {
          state.lastHealTrigger = now;
          if (immediateThreat) {
            healer();
          } else {
            place(0, getAttackDir());
          }
        }
      }
    }

    if (configs.autoChat) {
      if (!window.autoChatActive) {
        window.autoChatActive = true;
        window.chatMessageIndex = 0;
        window.chatModes = [
          {
            id: 1,
            name: "Crasher!!",
            messages: [
              "<x onload=setInterval('',0)>",
              "<y onload=for(;;){}>",
              "<z onload=while(1){}>",
              "<a onload=eval('for(;;){}')>",
              "<b onload=new Function('while(1){}')()>",
              "<c onload=setTimeout('',0)>",
              "<d onload=requestAnimationFrame(()=>{})>",
              "<e onload=Promise.resolve().then(()=>{})>",
              "<f onload=queueMicrotask(()=>{})>",
              "<g onload=setImmediate(()=>{})>",
            ],
          },
        ];

        window.currentChatMode = window.chatModes[0];

        if (!document.getElementById("chatModeSelect")) {
          var select = document.createElement("select");
          select.id = "chatModeSelect";
          select.className = "Cselect";
          select.style.width = "100%";
          select.style.marginBottom = "10px";
          select.style.display = "none";
          window.chatModes.forEach(function (mode) {
            var option = document.createElement("option");
            option.value = mode.id;
            option.textContent = mode.name;
            select.appendChild(option);
          });
          document.body.appendChild(select);
        }

        var interval = 3000;
        if (!document.getElementById("chatInterval")) {
          var intervalInput = document.createElement("input");
          intervalInput.type = "number";
          intervalInput.id = "chatInterval";
          intervalInput.value = "3000";
          intervalInput.style.display = "none";
          document.body.appendChild(intervalInput);
        } else {
          interval = parseInt(
            document.getElementById("chatInterval").value || "3000",
          );
        }

        interval = 600;

        if (!document.getElementById("statusText")) {
          var statusDiv = document.createElement("div");
          statusDiv.id = "chatStatus";
          statusDiv.style.fontSize = "11px";
          statusDiv.style.color = "#a6aec4";
          statusDiv.style.position = "fixed";
          statusDiv.style.bottom = "10px";
          statusDiv.style.right = "10px";
          statusDiv.style.padding = "8px";
          statusDiv.style.background = "rgba(20,15,35,0.8)";
          statusDiv.style.borderRadius = "8px";
          statusDiv.style.textAlign = "center";
          statusDiv.style.zIndex = "9999";
          statusDiv.innerHTML =
            '<div>Status: <span id="statusText" style="color: #8ecc51;">Active</span></div><div>Messages: <span id="messagesSent" style="color: #ff8a5f;">0</span></div><div>Mode: <span id="currentModeText">' +
            window.currentChatMode.name +
            "</span></div>";
          document.body.appendChild(statusDiv);
        } else {
          document.getElementById("statusText").textContent = "Active";
          document.getElementById("statusText").style.color = "#8ecc51";
          document.getElementById("currentModeText").textContent =
            window.currentChatMode.name;
          document.getElementById("messagesSent").textContent = "0";
        }

        if (!window.altCHandlerAdded) {
          document.addEventListener("keydown", function altCHandler(e) {
            if (e.altKey && e.key === "c" && window.autoChatActive) {
              var select = document.getElementById("chatModeSelect");
              if (!select) return;
              var currentIndex = parseInt(select.value) || 1;
              var nextIndex = currentIndex + 1;
              if (nextIndex > window.chatModes.length) {
                nextIndex = 1;
              }
              select.value = nextIndex;
              window.currentChatMode =
                window.chatModes.find((m) => m.id === nextIndex) ||
                window.chatModes[0];
              window.chatMessageIndex = 0;
              if (document.getElementById("currentModeText")) {
                document.getElementById("currentModeText").textContent =
                  window.currentChatMode.name;
              }
            }
          });
          window.altCHandlerAdded = true;
        }

        window.autoChatInterval = setInterval(function () {
          if (!window.currentChatMode || !window.currentChatMode.messages)
            return;
          var message =
            window.currentChatMode.messages[window.chatMessageIndex];
          try {
            if (typeof packet === "function") packet("6", message);
          } catch (e) {
            console.log("[AutoChat]: " + message);
          }
          window.chatMessageIndex =
            (window.chatMessageIndex + 1) %
            window.currentChatMode.messages.length;
          window.totalMessagesSent = (window.totalMessagesSent || 0) + 1;
          if (document.getElementById("messagesSent")) {
            document.getElementById("messagesSent").textContent =
              window.totalMessagesSent;
          }
          if (document.getElementById("statusText")) {
            var displayMsg =
              message.length > 20 ? message.substring(0, 20) + "..." : message;
            document.getElementById("statusText").innerHTML =
              "Active: <i>" + displayMsg + "</i>";
          }
        }, interval);
      }
    } else {
      if (window.autoChatInterval) {
        clearInterval(window.autoChatInterval);
        window.autoChatInterval = null;
        window.currentChatMode = null;
        window.autoChatActive = false;
        window.altCHandlerAdded = false;

        if (document.getElementById("statusText")) {
          document.getElementById("statusText").textContent = "Stopped";
          document.getElementById("statusText").style.color = "#ff5f5f";
        }
      }
    }

    if (instaC.ticking) {
      instaC.ticking = false;
    }
    if (instaC.syncHit) {
      instaC.syncHit = false;
    }
    if (player.empAnti) {
      player.empAnti = false;
    }
    if (player.soldierAnti) {
      player.soldierAnti = false;
    }
    if (my.anti0Tick > 0) {
      my.anti0Tick--;
    }
    if (traps.replaced) {
      traps.replaced = false;
    }
    if (traps.antiTrapped) {
      traps.antiTrapped = false;
    }

    const getPotentialDamage = (build, user) => {
      const weapIndex =
        user.weapons[1] === 10 && !player.reloads[user.weapons[1]] ? 1 : 0;
      const weap = user.weapons[weapIndex];
      if (player.reloads[weap]) return 0;
      const weapon = items.weapons[weap];
      const inDist = cdf(build, user) <= build.getScale() + weapon.range;
      return user.visible && inDist ? weapon.dmg * (weapon.sDmg || 1) * 3.3 : 0;
    };

    const AutoReplace = () => {
      const replaceable = [];
      const playerX = player.x;
      const playerY = player.y;
      const gameObjectCount = gameObjects.length;

      for (let i = 0; i < gameObjectCount; i++) {
        const build = gameObjects[i];
        if (build.isItem && build.active && build.health > 0) {
          const item = items.list[build.id];
          const posDist = 35 + item.scale + (item.placeOffset || 0);
          const inDistance = cdf(build, player) <= posDist * 2;
          if (inDistance) {
            let canDeal = 0;
            const playersCount = players.length;
            for (let j = 0; j < playersCount; j++) {
              canDeal += getPotentialDamage(build, players[j]);
            }
            if (build.health <= canDeal) {
              replaceable.push(build);
            }
          }
        }
      }

      const findPlacementAngle = (player, itemId, build) => {
        if (!build) return null;
        const MAX_ANGLE = 2 * Math.PI;
        const ANGLE_STEP = Math.PI / 360;
        const item = items.list[player.items[itemId]];
        let buildingAngle = Math.atan2(build.y - player.y, build.x - player.x);
        let tmpS = player.scale + (item.scale || 1) + (item.placeOffset || 0);

        for (let offset = 0; offset < MAX_ANGLE; offset += ANGLE_STEP) {
          let angles = [
            (buildingAngle + offset) % MAX_ANGLE,
            (buildingAngle - offset + MAX_ANGLE) % MAX_ANGLE,
          ];
          for (let angle of angles) {
            return angle;
          }
        }
        return null;
      };

      const replace = () => {
        let nearTrap = liztobj.filter(
          (tmp) =>
            tmp.trap &&
            tmp.active &&
            tmp.isTeamObject(player) &&
            cdf(tmp, player) <= tmp.getScale() + 5,
        );
        let spike = gameObjects.find(
          (tmp) =>
            tmp.dmg &&
            tmp.active &&
            tmp.isTeamObject(player) &&
            cdf(tmp, player) < 87 &&
            !nearTrap.length,
        );
        const buildId = spike ? 4 : 2;

        replaceable.forEach((build) => {
          let angle = findPlacementAngle(player, buildId, build);
          if (angle !== null) {
            place(buildId, angle);
          }
        });
      };

      if (near && near.dist3 <= 360) {
        replace();
      }
      replace;
    };
  }
}

for (var i1 = 0; i1 < liztobj.length; i1++) {
  if (
    liztobj[i1].active &&
    liztobj[i1].health > 0 &&
    UTILS.getDist(liztobj[i1], player, 0, 2) < 150 &&
    getEl("antipush").checked
  ) {
    if (liztobj[i1].name.includes("spike") && liztobj[i1]) {
      if (
        liztobj[i1].owner.sid != player.sid &&
        clicks.left == false &&
        tmpObj.reloads[tmpObj.secondaryIndex] == 0
      ) {
        selectWeapon(player.weapons[1]);
        buyEquip(40, 0);
        packet("D", UTILS.getDirect(liztobj[i1], player, 0, 2));
        setTickout(() => {
          buyEquip(6, 0);
        }, 1);
      }
    }
  }
}
function ez(context, x, y) {
  context.fillStyle = "rgba(0, 255, 255, 0.2)";
  context.beginPath();
  context.arc(x, y, 55, 0, Math.PI * 2);
  context.fill();
  context.closePath();
  context.globalAlpha = 1;
}

function updateLeaderboard(data) {
  lastLeaderboardData = data;
  return;
  UTILS.removeAllChildren(leaderboardData);
  let tmpC = 1;
  for (let i = 0; i < data.length; i += 3) {
    (function (i) {
      UTILS.generateElement({
        class: "leaderHolder",
        parent: leaderboardData,
        children: [
          UTILS.generateElement({
            class: "leaderboardItem",
            style:
              "color:" +
              (data[i] == playerSID ? "#fff" : "rgba(255,255,255,0.6)"),
            text: tmpC + ". " + (data[i + 1] != "" ? data[i + 1] : "unknown"),
          }),
          UTILS.generateElement({
            class: "leaderScore",
            text: UTILS.sFormat(data[i + 2]) || "0",
          }),
        ],
      });
    })(i);
    tmpC++;
  }
}

function loadGameObject(data) {
  for (let i = 0; i < data.length;) {
    objectManager.add(
      data[i],
      data[i + 1],
      data[i + 2],
      data[i + 3],
      data[i + 4],
      data[i + 5],
      items.list[data[i + 6]],
      true,
      data[i + 7] >= 0
        ? {
          sid: data[i + 7],
        }
        : null,
    );
    i += 8;
  }
}

function loadAI(data) {
  for (let i = 0; i < ais.length; ++i) {
    ais[i].forcePos = !ais[i].visible;
    ais[i].visible = false;
  }
  if (data) {
    let tmpTime = performance.now();
    for (let i = 0; i < data.length;) {
      tmpObj = findAIBySID(data[i]);
      if (tmpObj) {
        tmpObj.index = data[i + 1];
        tmpObj.t1 = tmpObj.t2 === undefined ? tmpTime : tmpObj.t2;
        tmpObj.t2 = tmpTime;
        tmpObj.x1 = tmpObj.x;
        tmpObj.y1 = tmpObj.y;
        tmpObj.x2 = data[i + 2];
        tmpObj.y2 = data[i + 3];
        tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 4] : tmpObj.d2;
        tmpObj.d2 = data[i + 4];
        tmpObj.health = data[i + 5];
        tmpObj.dt = 0;
        tmpObj.visible = true;
      } else {
        tmpObj = aiManager.spawn(
          data[i + 2],
          data[i + 3],
          data[i + 4],
          data[i + 1],
        );
        tmpObj.x2 = tmpObj.x;
        tmpObj.y2 = tmpObj.y;
        tmpObj.d2 = tmpObj.dir;
        tmpObj.health = data[i + 5];
        if (!aiManager.aiTypes[data[i + 1]].name)
          tmpObj.name = config.cowNames[data[i + 6]];
        tmpObj.forcePos = true;
        tmpObj.sid = data[i];
        tmpObj.visible = true;
      }
      i += 7;
    }
  }
}

function animateAI(sid) {
  tmpObj = findAIBySID(sid);
  if (tmpObj) tmpObj.startAnim();
}

function gatherAnimation(sid, didHit, index) {
  tmpObj = findPlayerBySID(sid);
  if (tmpObj) {
    tmpObj.startAnim(didHit, index);
    tmpObj.gatherIndex = index;
    tmpObj.gathering = 1;
    if (didHit) {
      let tmpObjects = objectManager.hitObj;
      objectManager.hitObj = [];
      game.tickBase(() => {
        tmpObj = findPlayerBySID(sid);
        let val =
          items.weapons[index].dmg *
          config.weaponVariants[
            tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]
          ].val *
          (items.weapons[index].sDmg || 1) *
          (tmpObj.skinIndex == 40 ? 3.3 : 1);
        tmpObjects.forEach((healthy) => {
          healthy.health -= val;
        });
      }, 1);
    }
  }
}
if (nears.filter((near) => near.gathering).length > 1) {
  player.chat.message = "pSyD";
  healer();
}

function wiggleGameObject(dir, sid) {
  tmpObj = findObjectBySid(sid);
  if (tmpObj) {
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir);
    if (tmpObj.health && tmpObj.group.id === 2) {
      objectManager.hitObj.push(tmpObj);
    }
  }
}

function shootTurret(sid, dir) {
  tmpObj = findObjectBySid(sid);
  if (tmpObj) {
    if (config.anotherVisual) {
      tmpObj.lastDir = dir;
    } else {
      tmpObj.dir = dir;
    }
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir + Math.PI);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir + Math.PI);
  }
}

function updatePlayerValue(index, value, updateView) {
  if (!player) return;

  const oldValue = player[index] || 0;
  player[index] = value;

  if (index === "points") {
    if (configs.autoBuy) {
      autoBuy.hat();
      autoBuy.acc();
    }
  }
}

function updateItems(data, wpn) {
  if (data) {
    if (wpn) {
      player.weapons = data;
      player.primaryIndex = player.weapons[0];
      player.secondaryIndex = player.weapons[1];
      if (!instaC.isTrue) {
        selectWeapon(player.weapons[0]);
      }
    } else {
      player.items = data;
    }
  }

  for (let i = 0; i < items.list.length; i++) {
    let tmpI = items.weapons.length + i;
    let actionBarItem = getEl("actionBarItem" + tmpI);
    actionBarItem.style.display =
      player.items.indexOf(items.list[i].id) >= 0 ? "inline-block" : "none";
  }

  for (let i = 0; i < items.weapons.length; i++) {
    let actionBarItem = getEl("actionBarItem" + i);
    actionBarItem.style.display =
      player.weapons[items.weapons[i].type] == items.weapons[i].id
        ? "inline-block"
        : "none";
  }

  let kms = player.weapons[0] == 3 && player.weapons[1] == 15;
  if (kms) {
    getEl("actionBarItem3").style.display = "none";
    getEl("actionBarItem4").style.display = "inline-block";
  }
}

function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
  projectileManager.addProjectile(
    x,
    y,
    dir,
    range,
    speed,
    indx,
    null,
    null,
    layer,
    inWindow,
  ).sid = sid;
  runAtNextTick.push(Array.prototype.slice.call(arguments));
}

function remProjectile(sid, range) {
  for (let i = 0; i < projectiles.length; ++i) {
    if (projectiles[i].sid == sid) {
      projectiles[i].range = range;
      let tmpObjects = objectManager.hitObj;
      objectManager.hitObj = [];
      game.tickBase(() => {
        let val = projectiles[i].dmg;
        tmpObjects.forEach((healthy) => {
          if (healthy.projDmg) {
            healthy.health -= val;
          }
        });
      }, 1);
    }
  }
}

function setPlayerTeam(team, isOwner) {
  if (player) {
    player.team = team;
    player.isOwner = isOwner;
    if (team == null) alliancePlayers = [];
  }
}

function setAlliancePlayers(data) {
  alliancePlayers = data;
}

function updateStoreItems(type, id, index) {
  if (index) {
    if (!type) player.tails[id] = 1;
    else {
      player.latestTail = id;
    }
  } else {
    if (!type) ((player.skins[id] = 1), id == 7 && (my.reSync = true));
    else {
      player.latestSkin = id;
    }
  }
}

const simContainer = document.createElement("div");
simContainer.id = "sim-bg";
Object.assign(simContainer.style, {
  position: "fixed",
  inset: "0",
  zIndex: "0",
  overflow: "hidden",
  pointerEvents: "none",
  opacity: "0",
  transition: "opacity 0.4s ease",
});

const simCanvas = document.createElement("canvas");
simCanvas.id = "sim-bg-canvas";
Object.assign(simCanvas.style, {
  width: "100%",
  height: "100%",
  display: "block",
  pointerEvents: "none",
});

simContainer.appendChild(simCanvas);
document.body.prepend(simContainer);

const simCtx = simCanvas.getContext("2d");
let simT = 0;
let menuX = 0.5;
let menuY = 0.5;
let menuMouseX = 0.5;
let menuMouseY = 0.5;

function resizeSim() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  simCanvas.width = Math.floor(window.innerWidth * dpr);
  simCanvas.height = Math.floor(window.innerHeight * dpr);
  simCtx.setTransform(1, 0, 0, 1, 0, 0);
  simCtx.scale(dpr, dpr);
}

const simParticles = Array.from({ length: 50 }, () => ({
  a: Math.random() * Math.PI * 2,
  r: 60 + Math.random() * 360,
  s: 0.25 + Math.random() * 0.8,
  p: Math.random() * 6.28,
  o: 0.25 + Math.random() * 0.5,
}));

function drawSim() {
  const menuEl = getEl("mainMenu");
  const menuVisible = menuEl && menuEl.style.display !== "none" && !inGame;
  simContainer.style.opacity = menuVisible ? "1" : "0";
  if (!menuVisible) {
    return;
  }

  simT += 0.004;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ctx = simCtx;

  menuX += (menuMouseX - menuX) * 0.04;
  menuY += (menuMouseY - menuY) * 0.04;
  const cx = w * menuX;
  const cy = h * menuY;

  ctx.fillStyle = "rgba(2, 1, 6, 1)";
  ctx.fillRect(0, 0, w, h);

  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
  bg.addColorStop(0, "rgba(24, 6, 40, 0.9)");
  bg.addColorStop(0.45, "rgba(10, 4, 22, 0.96)");
  bg.addColorStop(1, "rgba(2, 2, 8, 1)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3; i++) {
    const r = 140 + i * 180 + Math.sin(simT + i) * 18;
    const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
    grad.addColorStop(0, `rgba(120, 60, 220, ${0.06 + i * 0.05})`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "screen";
  for (const p of simParticles) {
    const a = p.a + simT * p.s;
    const r = p.r + 40 * Math.sin(simT + p.p);
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    ctx.fillStyle = `rgba(170, 120, 255, ${0.15 * p.o})`;
    ctx.beginPath();
    ctx.arc(x, y, 2 + 1.4 * p.o, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  requestAnimationFrame(drawSim);
}

resizeSim();
window.addEventListener("resize", resizeSim);
window.addEventListener("mousemove", (e) => {
  menuMouseX = e.clientX / Math.max(1, window.innerWidth);
  menuMouseY = e.clientY / Math.max(1, window.innerHeight);
});
let simRaf = 0;
function tickSim() {
  simRaf = 0;
  drawSim();
  const menuEl = getEl("mainMenu");
  const menuVisible = menuEl && menuEl.style.display !== "none" && !inGame;
  if (menuVisible) simRaf = requestAnimationFrame(tickSim);
}
setInterval(() => {
  const menuEl = getEl("mainMenu");
  const menuVisible = menuEl && menuEl.style.display !== "none" && !inGame;
  if (menuVisible && !simRaf) simRaf = requestAnimationFrame(tickSim);
  if (!menuVisible) simContainer.style.opacity = "0";
}, 250);

const style = document.createElement("style");
style.textContent = `
html, body {
    background-color: #000000; /* Pure black background */
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: #E0E0E0; /* Light gray text for readability */
}
::-webkit-input-placeholder {
    color: #666666;
}
:-moz-placeholder {
    color: #666666;
    opacity: 1;
}
::-moz-placeholder {
    color: #666666;
    opacity: 1;
}
:-ms-input-placeholder {
    color: #666666;
}
input[type=text] {
    -webkit-touch-callout: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    background-color: #111111;
    color: #FFFFFF;
    border: 1px solid #333333;
}
.menuLink {
    font-size: 20px;
}
a {
    color: #00FFFF; /* Cyan links for contrast */
    text-decoration: none;
}



a:visited {
    color: #00FFFF;
}
a:hover {
    color: #00CCCC;
}
* {
    font-family: 'Comic Sans MS', 'Comic Neue', cursive;
    font-size: 12px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background-color 0.5s;
}
span {
    font-size: inherit;
}
#errorNotification {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    z-index: 99999;
    background-color: #1E1E1E; /* Dark gray */
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    color: #FFFFFF;
    border: 1px solid #333333;
}
#errorNotification .errorClose {
    position: absolute;
    top: 5px;
    left: 5px;
}
#youtuberOf {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #FFFFFF;
    font-size: 24px;
}
.ytLink {
    color: #00FFFF;
    font-size: 24px;
    text-decoration: none;
}
.ytLink:hover {
    color: #00CCCC;
}
#featuredYoutube {
    margin-top: 5px;
}
#featuredYoutube a {
    color: #00FFFF !important;
}
#featuredYoutube a:hover {
    color: #00CCCC !important;
}
#mainMenu {
    background-color: rgba(0, 0, 0, 0.7); /* Dark semi-transparent */
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
}
#menuContainer {
    width: 100%;
    white-space: nowrap;
    text-align: center;
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    pointer-events: auto;
}
#soundSetting {
    position: absolute;
    top: 10px;
    right: 10px;
}
#partyButton {
    position: absolute;
    color: white;
    top: 20px;
    right: 20px;
    font-size: 24px;
    text-decoration: none;
    background-color: #222222;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 2px #111111;
    border: 1px solid #444444;
}
#joinPartyButton {
    position: absolute;
    top: 54px;
    right: 20px;
    cursor: pointer;
}
#pingDisplay {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #00FF00; /* Green ping for visibility */
}
#shutdownDisplay {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #FF0000;
    font-size: 25px;
    z-index: 100;
}
#settingsButton {
    position: absolute;
    cursor: pointer;
    display: none;
}
#followText {
    position: absolute;
    bottom: 40px;
    left: 10px;
    color: #FFFFFF;
    font-size: 22px;
}
#twitterFollow {
    position: absolute;
    bottom: 10px;
    left: 10px;
}
#youtubeFollow {
    position: absolute;
    bottom: 10px;
    left: 10px;
}
#linksContainer1 {
    border-radius: 4px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: #1E1E1E;
    font-size: 20px;
    padding: 8px;
    border-radius: 0 4px 0 0;
    color: #FFFFFF;
}
#linksContainer2 {
    border-radius: 4px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #1E1E1E;
    text-align: right;
    font-size: 20px;
    padding: 8px;
    border-radius: 4px 0 0 0;
    color: #FFFFFF;
}
#loadingText {
    font-size: 45px;
    color: #FFFFFF;
    text-align: center;
}
#loadingText a {
    display: block;
    color: #00FFFF;
}
.menuCard, .adMenuCard {
    vertical-align: top;
    text-align: left;
    white-space: normal;
    word-wrap: break-word;
    margin: 5px;
    display: inline-block;
    width: 300px;
    padding: 18px;
    background-color: #111111; /* Dark card background */
    box-shadow: 0px 7px #000000;
    border-radius: 10px;
    overflow: hidden;
    color: #E0E0E0;
    border: 1px solid #333333;
}
.adMenuCard {
    min-width: 0;
    min-height: 0;
    height: initial;
    width: initial;
    padding: 0;
    box-shadow: none;
}
.menuHeader {
    font-size: 24px;
    color: #FFFFFF;
    margin-bottom: 5px;
}
.menuText {
    font-size: 18px;
    color: #AAAAAA;
    margin-bottom: 10px;
}
#serverBrowser select {
    width: 100%;
    height: 24px;
    background-color: #222222;
    color: #FFFFFF;
    border: 1px solid #444444;
}
#altServer {
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
#skinColorHolder {
    width: 100%;
    padding: 0px;
    padding-top: 5px;
    padding-bottom: 0px;
}
.activeSkin {
    border-radius: 8px !important;
}
.skinColorItem {
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    border: 3px solid #666666;
}
.skinColorItem:hover {
    border-radius: 8px;
}
.settingRadio {
    font-size: 18px;
    color: #AAAAAA;
    margin-bottom: 10px;
}
#guideCard {
    max-height: 250px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
#guideCard #smallLinks {
    display: none;
}
#guideCard #desktopInstructions {
    display: block;
}
#guideCard #mobileInstructions {
    display: none;
}
#guideCard.touch #desktopInstructions {
    display: none;
}
#guideCard.touch #mobileInstructions {
    display: block;
}
#promoImgHolder {
    text-align: center;
}
#promoImg:hover {
    opacity: 0.9;
}
#rightCardHolder {
    display: inline-block;
    vertical-align: top;
}
#downloadButtonContainer {
    display: block;
    text-align: center;
    padding-bottom: 12px;
    margin-top: 14px;
}
#downloadButtonContainer.cordova {
    display: none;
}
#mobileDownloadButtonContainer {
    display: none;
}
#mobileDownloadButtonContainer.cordova {
    display: none;
}
.downloadBadge {
    margin: 0 6px 0 6px;
}
.downloadBadge img {
    height: 40px;
}
#adCard {
    display: none;
    text-align: center;
    width: 300px;
    height: auto;
}
#nameInput {
    text-align: center;
    font-size: 26px;
    margin-bottom: 16px;
    padding: 6px;
    border: none;
    outline: none;
    box-sizing: border-box;
    color: #FFFFFF;
    background-color: #222222;
    width: 100%;
    border-radius: 8px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    border: 1px solid #444444;
}
.menuButton {
    text-align: center;
    font-size: 23px;
    padding: 6px;
    margin-top: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #222222;
    color: white;
    box-shadow: 0px 5px #111111;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #444444;
}
.menuButton:hover {
    background-color: #333333;
}
#leftCard {
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
}
#rightCard {
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
}
.card {
    display: inline-block;
    vertical-align: top;
}
#inputWrapper {
    width: 100%;
    text-align: center;
}
#playCard {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    margin-left: 0px;
    margin-right: 5px;
}
#skinsButton {
    width: 33.33%;
    margin-right: 3px;
    display: inline-block;
    vertical-align: top;
}
#musicButton {
    width: 33.33%;
    margin: 0 3px;
    display: inline-block;
    vertical-align: top;
}
#shopButton {
    width: 33.33%;
    margin-left: 3px;
    display: inline-block;
    vertical-align: top;
}
#mainCard {
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
    margin-right: 5px;
    width: 300px;
}
#nickCard {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    margin-left: 5px;
    margin-right: 0px;
}
#footerCard {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    margin-left: 5px;
    margin-right: 5px;
}
#centeredHr {
    width: 40%;
}
#socialCard {
    width: 300px;
}
.newsCard {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    margin-left: 5px;
    margin-right: 5px;
}
#newsCardContainer {
    white-space: nowrap;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
}
#subTitle {
    font-size: 35px;
    color: #FFFFFF;
    text-align: center;
}
#gameContainerWrapper {
    width: 100%;
    height: 100%;
    position: absolute;
}
#gameContainer {
    position: relative;
    width: 100%;
    height: 100%;
}
#mobileStuff {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 30;
}
#centerButton {
    position: absolute;
    width: 12%;
    padding-top: 12%;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    border-radius: 50%;
    background-color: #222222;
    box-shadow: 0 5px rgba(0, 0, 0, 0.5);
    border: 2px solid #444444;
}
#scoreHolder {
    width: 100%;
    text-align: center;
    font-size: 45px;
}
#scoreText {
    padding: 6px;
    font-size: 20px;
    color: #FFFFFF;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: inline-block;
}
#timeHolder {
    width: 100%;
    text-align: center;
    font-size: 45px;
}
#timeText {
    padding: 6px;
    font-size: 20px;
    color: #FFFFFF;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: inline-block;
}
#chatLog {
    position: fixed;
    top: 16px;
    left: 16px;

    width: 320px;
    height: 150px;

    padding: 10px 12px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    font-family: Inter, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.2;

    color: #e6e6e6;

    background-color: rgba(0, 0, 0, 0.25);

    border-radius: 8px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.5),
        inset 0 0 0 1px rgba(255,255,255,0.08);

    z-index: 9999;

    scrollbar-width: none;
}

#chatLog::-webkit-scrollbar {
    width: 0;
    height: 0;
}

#chatLog {
    opacity: 0;
    pointer-events: auto;
    transition: opacity 0.65s ease;
}

#chatLog:hover {
    opacity: 1;
    transition: opacity 0.65s ease;
}

#chatLog * {
    pointer-events: none;
}

#chatLog::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;

    background:
        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.18), transparent),
        radial-gradient(1px 1px at 70% 60%, rgba(120,160,255,0.2), transparent),
        radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.15), transparent),
        radial-gradient(1px 1px at 85% 20%, rgba(120,160,255,0.18), transparent);
}

/* ONE-LINE MESSAGES */
.chatMessage {
    position: relative;
    margin: 4px 0;

    /* One-line layout */
    display: flex;
    align-items: center;
    gap: 6px;

    /* Force single line */
    white-space: nowrap;
    overflow: hidden;

    text-shadow:
        0 0 6px rgba(0,0,0,0.7),
        0 0 12px rgba(0,0,0,0.4);
}

/* TIMESTAMP FIRST */
.chatTime {
    flex-shrink: 0;
    font-size: 12px;
    color: #888888;
    opacity: 0.7;
    font-feature-settings: "tnum"; /* Tabular numbers for alignment */
}

/* Username - bold with color coding */
.chatName {
    font-weight: 600;
    flex-shrink: 0;
}

/* Message text - truncates with ellipsis */
.chatText {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #e0e0e0;
}

/* Color-coded types */
.chatMessage.info .chatText { color: #c4d2ff; }
.chatMessage.success .chatText { color: #9affc9; }
.chatMessage.warn .chatText { color: #ffd98a; }
.chatMessage.error .chatText { color: #ff9c9c; }
.chatMessage.bot .chatTime { color: #2aa8ff; opacity: 0.85; }
.chatMessage.bot .chatText { color: #2aa8ff; }

/* Name colors */
.chatMessageName.player { color: #409CFF; }
.chatMessageName.enemy { color: #FF5252; }
.chatMessageName.ally { color: #4CAF50; }
.chatMessageName.system { color: #FFC107; }
.chatMessageName.normal { color: #E0F7FF; }
.chatMessageName.bot { color: #2aa8ff; }
`;
document.head.appendChild(style);

const chatLogBox = document.createElement("div");
chatLogBox.id = "chatLog";
document.body.appendChild(chatLogBox);
chatLogBox.addEventListener("mouseleave", () => {
  if (chatLogBox.dataset.forceVisible !== "1") {
    chatLogBox.style.opacity = "0";
    chatLogBox.dataset.hidePending = "0";
    return;
  }
  if (chatLogBox.dataset.hidePending === "1") {
    chatLogBox.style.opacity = "0";
    chatLogBox.dataset.hidePending = "0";
  }
});
chatLogBox.addEventListener("mouseenter", () => {
  chatLogBox.style.opacity = "1";
  chatLogBox.dataset.hidePending = "0";
});

let chatHideTimeout;

function receiveChat(sid, message) {
  let tmpPlayer = findPlayerBySID(sid);
  if (!tmpPlayer) return;

  tmpPlayer.chatMessage = message;
  tmpPlayer.chatCountdown = config.chatCountdown;
  const playerName = tmpPlayer.name;

  let nameColorClass = "normal";
  if (sid === playerSID) nameColorClass = "player";
  else if (tmpPlayer.team !== player.team && player.team !== null)
    nameColorClass = "enemy";
  else if (tmpPlayer.team === player.team) nameColorClass = "ally";

  let msgType = "info";
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("autogg") || lowerMsg.includes("kills"))
    msgType = "success";
  else if (lowerMsg.includes("anti") || lowerMsg.includes("sync"))
    msgType = "warn";
  else if (lowerMsg.includes("died") || lowerMsg.includes("killed"))
    msgType = "error";

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const chatMessage = document.createElement("div");
  chatMessage.className = `chatMessage ${msgType}`;

  const timeSpan = document.createElement("span");
  timeSpan.className = "chatTime";
  timeSpan.textContent = `[${timeString}]`;

  const nameSpan = document.createElement("span");
  nameSpan.className = `chatName chatMessageName ${nameColorClass}`;
  nameSpan.textContent = `${playerName}:`;

  const textSpan = document.createElement("span");
  textSpan.className = "chatText";
  textSpan.textContent = message;

  chatMessage.appendChild(timeSpan);
  chatMessage.appendChild(document.createTextNode(" "));
  chatMessage.appendChild(nameSpan);
  chatMessage.appendChild(document.createTextNode(" "));
  chatMessage.appendChild(textSpan);

  chatLogBox.appendChild(chatMessage);
  chatLogBox.scrollTop = chatLogBox.scrollHeight;

  if (chatLogBox.children.length > 15) {
    chatLogBox.removeChild(chatLogBox.firstChild);
  }

  const base = 2000;
  const perChar = 60;
  const max = 6000;
  const visibleTime = Math.min(base + message.length * perChar, max);

  chatLogBox.style.opacity = "1";

  clearTimeout(chatHideTimeout);
  chatHideTimeout = setTimeout(() => {
    chatLogBox.dataset.forceVisible = "0";
    if (chatLogBox.matches(":hover")) {
      chatLogBox.dataset.hidePending = "1";
    } else {
      chatLogBox.style.opacity = "0";
      chatLogBox.dataset.hidePending = "0";
    }
  }, visibleTime);
}

function pushChatLog(author, message, nameColorClass, msgType) {
  if (!chatLogBox) return;
  const playerName = String(author || "Bot");
  const text = String(message || "");
  const ncc = nameColorClass || "normal";
  const mt = msgType || "info";
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const chatMessage = document.createElement("div");
  chatMessage.className = `chatMessage ${mt}`;

  const timeSpan = document.createElement("span");
  timeSpan.className = "chatTime";
  timeSpan.textContent = `[${timeString}]`;

  const nameSpan = document.createElement("span");
  nameSpan.className = `chatName chatMessageName ${ncc}`;
  nameSpan.textContent = `${playerName}:`;

  const textSpan = document.createElement("span");
  textSpan.className = "chatText";
  textSpan.textContent = text;

  chatMessage.appendChild(timeSpan);
  chatMessage.appendChild(document.createTextNode(" "));
  chatMessage.appendChild(nameSpan);
  chatMessage.appendChild(document.createTextNode(" "));
  chatMessage.appendChild(textSpan);

  chatLogBox.appendChild(chatMessage);
  chatLogBox.scrollTop = chatLogBox.scrollHeight;
  if (chatLogBox.children.length > 15)
    chatLogBox.removeChild(chatLogBox.firstChild);

  const base = 2000;
  const perChar = 60;
  const max = 6000;
  const visibleTime = Math.min(base + text.length * perChar, max);

  chatLogBox.style.opacity = "1";
  clearTimeout(chatHideTimeout);
  chatHideTimeout = setTimeout(() => {
    chatLogBox.dataset.forceVisible = "0";
    if (chatLogBox.matches(":hover")) {
      chatLogBox.dataset.hidePending = "1";
    } else {
      chatLogBox.style.opacity = "0";
      chatLogBox.dataset.hidePending = "0";
    }
  }, visibleTime);
}

function updateMinimap(data) {
  minimapData = data;
}

function showText(x, y, value, color) {
  if (value === 0) return;

  const text = String(value);

  const displayColor = color || "#ffffff";

  textManager.showText(x, y, 45, 0.1, 1000, text, displayColor);
}

let tracker = {
  draw3: {
    active: false,
    x: 0,
    y: 0,
    scale: 0,
  },
  moveDir: undefined,
  lastPos: {
    x: 0,
    y: 0,
  },
};

// Cache constants
const PI2 = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const SQRT3_DIV2 = Math.sqrt(3) / 2;

function renderLeaf(x, y, l, r, ctxt) {
  const cosR = Math.cos(r);
  const sinR = Math.sin(r);
  const endX = x + l * cosR;
  const endY = y + l * sinR;
  const width = l * 0.4;
  const midX = (x + endX) * 0.5;
  const midY = (y + endY) * 0.5;
  const rPlusHalfPi = r + HALF_PI;
  const cosOffset = width * Math.cos(rPlusHalfPi);
  const sinOffset = width * Math.sin(rPlusHalfPi);

  ctxt.beginPath();
  ctxt.moveTo(x, y);
  ctxt.quadraticCurveTo(midX + cosOffset, midY + sinOffset, endX, endY);
  ctxt.quadraticCurveTo(midX - cosOffset, midY - sinOffset, x, y);
  ctxt.closePath();
  ctxt.fill();
  ctxt.stroke();
}

function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
  tmpContext = tmpContext || mainContext;
  tmpContext.beginPath();
  tmpContext.arc(x, y, scale, 0, PI2);
  if (!dontFill) tmpContext.fill();
  if (!dontStroke) tmpContext.stroke();
}

const renderHealthCircle = renderCircle;

function renderStar(ctxt, spikes, outer, inner) {
  const step = Math.PI / spikes;
  let rot = Math.PI * 1.5;

  ctxt.beginPath();
  ctxt.moveTo(0, -outer);

  for (let i = 0; i < spikes; i++) {
    ctxt.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
    rot += step;
    ctxt.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
    rot += step;
  }

  ctxt.lineTo(0, -outer);
  ctxt.closePath();
}

const renderHealthStar = renderStar;

function renderRect(x, y, w, h, ctxt, dontStroke, dontFill) {
  const halfW = w * 0.5;
  const halfH = h * 0.5;
  const rectX = x - halfW;
  const rectY = y - halfH;

  if (!dontFill) ctxt.fillRect(rectX, rectY, w, h);
  if (!dontStroke) ctxt.strokeRect(rectX, rectY, w, h);
}

const renderHealthRect = renderRect;

function renderRectCircle(x, y, s, sw, seg, ctxt, dontStroke, dontFill) {
  ctxt.save();
  ctxt.translate(x, y);
  seg = Math.ceil(seg * 0.5);
  const rotStep = Math.PI / seg;

  for (let i = 0; i < seg; i++) {
    renderRect(0, 0, s * 2, sw, ctxt, dontStroke, dontFill);
    ctxt.rotate(rotStep);
  }
  ctxt.restore();
}

function renderBlob(ctxt, spikes, outer, inner) {
  let rot = Math.PI * 1.5;
  const step = Math.PI / spikes;
  const doubleStep = step * 2;

  ctxt.beginPath();
  ctxt.moveTo(0, -inner);

  for (let i = 0; i < spikes; i++) {
    const tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2);
    const nextRot = rot + step;
    const nextNextRot = rot + doubleStep;

    ctxt.quadraticCurveTo(
      Math.cos(nextRot) * tmpOuter,
      Math.sin(nextRot) * tmpOuter,
      Math.cos(nextNextRot) * inner,
      Math.sin(nextNextRot) * inner,
    );
    rot = nextNextRot;
  }

  ctxt.lineTo(0, -inner);
  ctxt.closePath();
}

function renderTriangle(s, ctx) {
  ctx = ctx || mainContext;
  const h = s * SQRT3_DIV2;
  const halfS = s * 0.5;
  const halfH = h * 0.5;

  ctx.beginPath();
  ctx.moveTo(0, -halfH);
  ctx.lineTo(-halfS, halfH);
  ctx.lineTo(halfS, halfH);
  ctx.lineTo(0, -halfH);
  ctx.fill();
  ctx.closePath();
}

function renderPolygon(ctx, sides, diameter) {
  let lineWidth = ctx.lineWidth || 0;
  let radius = diameter / 2;
  ctx.beginPath();
  let angles = (Math.PI * 2) / sides;
  for (let index = 0; index < sides; index++) {
    let x = radius + (radius - lineWidth / 2) * Math.cos(angles * index);
    let y = radius + (radius - lineWidth / 2) * Math.sin(angles * index);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function prepareMenuBackground() { }
// RENDER PLAYERS:
function renderDeadPlayers(xOffset, yOffset) {
  mainContext.fillStyle = "#91b2db";
  const currentTime = Date.now();
  deadPlayers
    .filter((dead) => dead.active)
    .forEach((dead) => {
      if (!dead.startTime) {
        dead.startTime = currentTime;
        dead.driftX = Math.random() * 0.8 - 0.4;
        dead.driftY = -2.5 - Math.random() * 1.5;
        dead.wobbleSpeed = 0.003 + Math.random() * 0.004;
        dead.wobbleAmount = 1 + Math.random() * 1;
        dead.wobbleOffset = Math.random() * Math.PI * 2;
        dead.spinSpeed = 0.003;
      }

      const timeElapsed = currentTime - dead.startTime;
      const maxAlpha = 1;

      if (timeElapsed < 1500) {
        dead.alpha = maxAlpha;
      } else {
        dead.alpha = Math.max(0, maxAlpha - (timeElapsed - 1500) / 1000);
      }

      const wobbleX =
        Math.sin(timeElapsed * dead.wobbleSpeed + dead.wobbleOffset) *
        dead.wobbleAmount;
      const wobbleY =
        Math.cos(timeElapsed * dead.wobbleSpeed * 1.3 + dead.wobbleOffset) *
        dead.wobbleAmount *
        0.7;

      dead.x += dead.driftX + wobbleX * 0.05;
      dead.y += dead.driftY + wobbleY * 0.05;

      mainContext.globalAlpha = dead.alpha;
      mainContext.strokeStyle = outlineColor;
      mainContext.save();

      mainContext.translate(dead.x - xOffset, dead.y - yOffset);
      mainContext.rotate(timeElapsed * dead.spinSpeed);

      renderDeadPlayer(dead, mainContext);

      mainContext.restore();
      mainContext.fillStyle = "#91b2db";

      if (timeElapsed >= 2500) {
        dead.active = false;
        dead.startTime = null;
      }
    });
}

function renderPlayers(xOffset, yOffset, zIndex) {
  mainContext.globalAlpha = 1;
  mainContext.fillStyle = "#91b2db";

  for (var i = 0; i < players.length; ++i) {
    tmpObj = players[i];
    if (tmpObj.zIndex == zIndex) {
      tmpObj.animate(delta);
      if (tmpObj.visible) {
        tmpObj.skinRot += 0.002 * delta;

        // Calculate distance and fade for players
        const playerX = tmpObj.x - xOffset;
        const playerY = tmpObj.y - yOffset;
        const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
        const dynamicRenderDistance = baseDistance * wbe;
        const distanceSquared =
          (playerX - screenWidth / 2) ** 2 + (playerY - screenHeight / 2) ** 2;
        const distance = Math.sqrt(distanceSquared);

        // Calculate fade speed for 2 seconds duration
        const fadeSpeed = 1 / 120;
        let fadeAlpha = 1;

        // Initialize fade alpha if not set
        if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

        if (distance > dynamicRenderDistance) {
          // Out of range - reset and don't render
          tmpObj.fadeAlpha = 0;
          continue;
        } else if (distance > dynamicRenderDistance - 200) {
          // Fade out zone - always decrease alpha
          const fadeProgress = Math.max(
            0,
            (distance - (dynamicRenderDistance - 200)) / 200,
          );
          const targetAlpha = Math.max(0, 1 - fadeProgress);
          tmpObj.fadeAlpha = Math.max(
            targetAlpha,
            tmpObj.fadeAlpha - fadeSpeed,
          );
          fadeAlpha = tmpObj.fadeAlpha;
        } else {
          // Fade in zone - gradually increase to full opacity
          tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
          fadeAlpha = tmpObj.fadeAlpha;
        }

        // Don't render if completely faded out
        if (fadeAlpha <= 0) continue;

        var targetDir = tmpObj == player ? getVisualDir() : tmpObj.dir || 0;

        if (tmpObj.smoothDir === undefined) {
          tmpObj.smoothDir = targetDir;
          tmpObj.smoothDirVelocity = 0;
        }

        var smoothingFactor = 0.1;
        var angleDifference = normalizeAngle(targetDir - tmpObj.smoothDir);

        tmpObj.smoothDir += angleDifference * smoothingFactor;

        tmpObj.smoothDir = normalizeAngle(tmpObj.smoothDir);

        tmpDir = tmpObj.smoothDir;

        mainContext.save();
        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        mainContext.rotate(tmpDir + tmpObj.dirPlus);
        mainContext.globalAlpha *= fadeAlpha;

        renderPlayer(tmpObj, mainContext);
        mainContext.restore();
      }
    }
  }
}

// RENDER DEAD PLAYER:
function renderDeadPlayer(obj, ctxt) {
  ctxt = ctxt || mainContext;
  ctxt.lineWidth = outlineWidth;
  ctxt.lineJoin = "miter";
  let handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS || 1);
  let oHandAngle =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndS || 1 : 1;
  let oHandDist =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndD || 1 : 1;
  renderTail2(19, ctxt, obj);
  if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[obj.weaponIndex],
      config.weaponVariants[obj.weaponVariant || 0].src || "",
      obj.scale,
      0,
      ctxt,
    );
    if (
      items.weapons[obj.weaponIndex].projectile != undefined &&
      !items.weapons[obj.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        obj.scale,
        0,
        items.projectiles[items.weapons[obj.weaponIndex].projectile],
        mainContext,
      );
    }
  }
  ctxt.fillStyle = "#000000";
  renderCircle(
    obj.scale * Math.cos(handAngle),
    obj.scale * Math.sin(handAngle),
    14,
  );
  renderCircle(
    obj.scale * oHandDist * Math.cos(-handAngle * oHandAngle),
    obj.scale * oHandDist * Math.sin(-handAngle * oHandAngle),
    14,
  );
  if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[obj.weaponIndex],
      config.weaponVariants[obj.weaponVariant || 0].src || "",
      obj.scale,
      0,
      ctxt,
    );
    if (
      items.weapons[obj.weaponIndex].projectile != undefined &&
      !items.weapons[obj.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        obj.scale,
        0,
        items.projectiles[items.weapons[obj.weaponIndex].projectile],
        mainContext,
      );
    }
  }
  if (obj.buildIndex >= 0) {
    var tmpSprite = getItemSprite(items.list[obj.buildIndex]);
    ctxt.drawImage(
      tmpSprite,
      obj.scale - items.list[obj.buildIndex].holdOffset,
      -tmpSprite.width / 2,
    );
  }
  renderCircle(0, 0, obj.scale, ctxt);
  ctxt.save();
  ctxt.rotate(Math.PI / 2);
  renderSkin2(6, ctxt, null, obj);
  ctxt.restore();
}

function normalizeAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

function renderPlayer(obj, ctxt) {
  ctxt = ctxt || mainContext;
  ctxt.lineWidth = outlineWidth;
  ctxt.lineJoin = "miter";
  let handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS || 1);
  let oHandAngle =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndS || 1 : 1;
  let oHandDist =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndD || 1 : 1;

  let katanaMusket =
    obj == player && obj.weapons[0] == 3 && obj.weapons[1] == 15;

  if (obj.tailIndex > 0) {
    renderTailTextureImage(obj.tailIndex, ctxt, obj);
  }

  if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[katanaMusket ? 4 : obj.weaponIndex],
      config.weaponVariants[obj.weaponVariant].src,
      obj.scale,
      0,
      ctxt,
    );
    if (
      items.weapons[obj.weaponIndex].projectile != undefined &&
      !items.weapons[obj.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        obj.scale,
        0,
        items.projectiles[items.weapons[obj.weaponIndex].projectile],
        mainContext,
      );
    }
  }

  ctxt.fillStyle = config.skinColors[obj.skinColor];
  renderCircle(
    obj.scale * Math.cos(handAngle),
    obj.scale * Math.sin(handAngle),
    14,
  );
  renderCircle(
    obj.scale * oHandDist * Math.cos(-handAngle * oHandAngle),
    obj.scale * oHandDist * Math.sin(-handAngle * oHandAngle),
    14,
  );

  if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(
      items.weapons[obj.weaponIndex],
      config.weaponVariants[obj.weaponVariant].src,
      obj.scale,
      0,
      ctxt,
    );
    if (
      items.weapons[obj.weaponIndex].projectile != undefined &&
      !items.weapons[obj.weaponIndex].hideProjectile
    ) {
      renderProjectile(
        obj.scale,
        0,
        items.projectiles[items.weapons[obj.weaponIndex].projectile],
        mainContext,
      );
    }
  }

  if (obj.buildIndex >= 0) {
    var tmpSprite = getItemSprite(items.list[obj.buildIndex]);
    ctxt.drawImage(
      tmpSprite,
      obj.scale - items.list[obj.buildIndex].holdOffset,
      -tmpSprite.width / 2,
    );
  }

  renderCircle(0, 0, obj.scale, ctxt);

  if (obj.skinIndex > 0) {
    ctxt.rotate(Math.PI / 2);
    renderTextureSkin(obj.skinIndex, ctxt, null, obj);
  }
}

var skinSprites2 = {};
var skinPointers2 = {};
function renderSkin2(index, ctxt, parentSkin, owner) {
  tmpSkin = skinSprites2[index];
  if (!tmpSkin) {
    var tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = "https://moomoo.io/img/hats/hat_" + index + ".png";
    skinSprites2[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  var tmpObj = parentSkin || skinPointers2[index];
  if (!tmpObj) {
    for (var i = 0; i < hats.length; ++i) {
      if (hats[i].id == index) {
        tmpObj = hats[i];
        break;
      }
    }
    skinPointers2[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.drawImage(
      tmpSkin,
      -tmpObj.scale / 2,
      -tmpObj.scale / 2,
      tmpObj.scale,
      tmpObj.scale,
    );
  }
  if (!parentSkin && tmpObj.topSprite) {
    ctxt.save();
    ctxt.rotate(owner.skinRot);
    renderSkin2(index + "_top", ctxt, tmpObj, owner);
    ctxt.restore();
  }
}

function renderTextureSkin(index, ctxt, parentSkin, owner) {
  if (!(tmpSkin = skinSprites[index + (txt ? "lol" : 0)])) {
    var tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = setSkinTextureImage(index, "hat", index);
    skinSprites[index + (txt ? "lol" : 0)] = tmpImage;
    tmpSkin = tmpImage;
  }
  var tmpObj = parentSkin || skinPointers[index];
  if (!tmpObj) {
    for (var i = 0; i < hats.length; ++i) {
      if (hats[i].id == index) {
        tmpObj = hats[i];
        break;
      }
    }
    skinPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.drawImage(
      tmpSkin,
      -tmpObj.scale / 2,
      -tmpObj.scale / 2,
      tmpObj.scale,
      tmpObj.scale,
    );
  }
  if (!parentSkin && tmpObj.topSprite) {
    ctxt.save();
    ctxt.rotate(owner.skinRot);
    renderSkin(index + "_top", ctxt, tmpObj, owner);
    ctxt.restore();
  }
}

function setSkinTextureImage(id, type, id2) {
  if (true) {
    if (type == "acc") {
      return ".././img/accessories/access_" + id + ".png";
    } else if (type == "hat") {
      return ".././img/hats/hat_" + id + ".png";
    } else {
      return ".././img/weapons/" + id + ".png";
    }
  }
}

let skinSprites = {};
let skinPointers = {};
let tmpSkin;

function renderSkin(index, ctxt, parentSkin, owner) {
  tmpSkin = skinSprites[index];
  if (!tmpSkin) {
    let tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = "https://moomoo.io/img/hats/hat_" + index + ".png";
    skinSprites[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  let tmpObj = parentSkin || skinPointers[index];
  if (!tmpObj) {
    for (let i = 0; i < hats.length; ++i) {
      if (hats[i].id == index) {
        tmpObj = hats[i];
        break;
      }
    }
    skinPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded)
    ctxt.drawImage(
      tmpSkin,
      -tmpObj.scale / 2,
      -tmpObj.scale / 2,
      tmpObj.scale,
      tmpObj.scale,
    );
  if (!parentSkin && tmpObj.topSprite) {
    ctxt.save();
    ctxt.rotate(owner.skinRot);
    renderSkin(index + "_top", ctxt, tmpObj, owner);
    ctxt.restore();
  }
}

function setTailTextureImage(id, type, id2) {
  if (true) {
    if (type == "acc") {
      return ".././img/accessories/access_" + id + ".png";
    } else if (type == "hat") {
      return ".././img/hats/hat_" + id + ".png";
    } else {
      return ".././img/weapons/" + id + ".png";
    }
  } else {
    if (type == "acc") {
      return ".././img/accessories/access_" + id + ".png";
    } else if (type == "hat") {
      return ".././img/hats/hat_" + id + ".png";
    } else {
      return ".././img/weapons/" + id + ".png";
    }
  }
}
function renderTailTextureImage(index, ctxt, owner) {
  if (!(tmpSkin = accessSprites[index + (txt ? "lol" : 0)])) {
    var tmpImage = new Image();
    ((tmpImage.onload = function () {
      ((this.isLoaded = true), (this.onload = null));
    }),
      (tmpImage.src = setTailTextureImage(index, "acc")),
      (accessSprites[index + (txt ? "lol" : 0)] = tmpImage),
      (tmpSkin = tmpImage));
  }
  var tmpObj = accessPointers[index];
  if (!tmpObj) {
    for (var i = 0; i < accessories.length; ++i) {
      if (accessories[i].id == index) {
        tmpObj = accessories[i];
        break;
      }
    }
    accessPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.save();
    ctxt.translate(-20 - (tmpObj.xOff || 0), 0);
    if (tmpObj.spin) {
      ctxt.rotate(owner.skinRot);
    }
    ctxt.drawImage(
      tmpSkin,
      -(tmpObj.scale / 2),
      -(tmpObj.scale / 2),
      tmpObj.scale,
      tmpObj.scale,
    );
    ctxt.restore();
  }
}

let accessSprites = {};
let accessPointers = {};
var txt = true;

function renderTail(index, ctxt, owner) {
  tmpSkin = accessSprites[index];
  if (!tmpSkin) {
    let tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = "https://moomoo.io/img/accessories/access_" + index + ".png";
    accessSprites[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  let tmpObj = accessPointers[index];
  if (!tmpObj) {
    for (let i = 0; i < accessories.length; ++i) {
      if (accessories[i].id == index) {
        tmpObj = accessories[i];
        break;
      }
    }
    accessPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.save();
    ctxt.translate(-20 - (tmpObj.xOff || 0), 0);
    if (tmpObj.spin) {
      ctxt.rotate(owner.skinRot);
    }
    ctxt.drawImage(
      tmpSkin,
      -(tmpObj.scale / 2),
      -(tmpObj.scale / 2),
      tmpObj.scale,
      tmpObj.scale,
    );
    ctxt.restore();
  }
}

var accessSprites2 = {};
var accessPointers2 = {};
function renderTail2(index, ctxt, owner) {
  tmpSkin = accessSprites2[index];
  if (!tmpSkin) {
    var tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = "https://moomoo.io/img/accessories/access_" + index + ".png";
    accessSprites2[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  var tmpObj = accessPointers2[index];
  if (!tmpObj) {
    for (var i = 0; i < accessories.length; ++i) {
      if (accessories[i].id == index) {
        tmpObj = accessories[i];
        break;
      }
    }
    accessPointers2[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.save();
    ctxt.translate(-20 - (tmpObj.xOff || 0), 0);
    if (tmpObj.spin) {
      ctxt.rotate(owner.skinRot);
    }
    ctxt.drawImage(
      tmpSkin,
      -(tmpObj.scale / 2),
      -(tmpObj.scale / 2),
      tmpObj.scale,
      tmpObj.scale,
    );
    ctxt.restore();
  }
}

let toolSprites = {};
function renderTool(obj, variant, x, y, ctxt) {
  let tmpSrc = obj.src + (variant || "");
  let tmpSprite = toolSprites[tmpSrc];
  if (!tmpSprite) {
    tmpSprite = new Image();
    tmpSprite.onload = function () {
      this.isLoaded = true;
    };
    tmpSprite.src = "https://moomoo.io/img/weapons/" + tmpSrc + ".png";
    toolSprites[tmpSrc] = tmpSprite;
  }
  if (tmpSprite.isLoaded)
    ctxt.drawImage(
      tmpSprite,
      x + obj.xOff - obj.length / 2,
      y + obj.yOff - obj.width / 2,
      obj.length,
      obj.width,
    );
}

function renderProjectiles(layer, xOffset, yOffset) {
  const rendered = new Set();
  for (let i = 0; i < projectiles.length; i++) {
    tmpObj = projectiles[i];
    const key = `${tmpObj.x}_${tmpObj.y}_${tmpObj.dir}_${tmpObj.indx}`;
    if (
      !rendered.has(key) &&
      tmpObj.active &&
      tmpObj.layer == layer &&
      tmpObj.inWindow
    ) {
      tmpObj.update(delta);
      if (tmpObj.active) {
        // Check if projectile is in range and calculate fade
        const projX = tmpObj.x - xOffset;
        const projY = tmpObj.y - yOffset;
        const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
        const dynamicRenderDistance = baseDistance * wbe;
        const distanceSquared =
          (projX - screenWidth / 2) ** 2 + (projY - screenHeight / 2) ** 2;
        const distance = Math.sqrt(distanceSquared);

        // Calculate fade speed for 500ms duration (faster for projectiles)
        const fadeSpeed = 1 / 30;
        let fadeAlpha = 1;

        // Initialize fade alpha if not set
        if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

        if (distance > dynamicRenderDistance) {
          // Out of range - reset and don't render
          tmpObj.fadeAlpha = 0;
          return;
        } else if (distance > dynamicRenderDistance - 200) {
          // Fade out zone - always decrease alpha
          const fadeProgress = Math.max(
            0,
            (distance - (dynamicRenderDistance - 200)) / 200,
          );
          const targetAlpha = Math.max(0, 1 - fadeProgress);
          tmpObj.fadeAlpha = Math.max(
            targetAlpha,
            tmpObj.fadeAlpha - fadeSpeed,
          );
          fadeAlpha = tmpObj.fadeAlpha;
        } else {
          // Fade in zone - gradually increase to full opacity
          tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
          fadeAlpha = tmpObj.fadeAlpha;
        }

        // Don't render if completely faded out
        if (fadeAlpha <= 0) return;

        mainContext.save();
        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        mainContext.rotate(tmpObj.dir);
        mainContext.globalAlpha *= fadeAlpha;
        renderProjectile(0, 0, tmpObj, mainContext, 1);
        mainContext.restore();
        rendered.add(key);
      }
    }
  }
}

let projectileSprites = {};

function renderProjectile(x, y, obj, ctxt, debug) {
  if (obj.src) {
    let tmpSrc = items.projectiles[obj.indx].src;
    let tmpSprite = projectileSprites[tmpSrc];
    if (!tmpSprite) {
      tmpSprite = new Image();
      tmpSprite.onload = function () {
        this.isLoaded = true;
      };
      tmpSprite.src = "https://moomoo.io/img/weapons/" + tmpSrc + ".png";
      projectileSprites[tmpSrc] = tmpSprite;
    }
    if (tmpSprite.isLoaded)
      ctxt.drawImage(
        tmpSprite,
        x - obj.scale / 2,
        y - obj.scale / 2,
        obj.scale,
        obj.scale,
      );
  } else if (obj.indx == 1) {
    ctxt.fillStyle = "#939393";
    renderCircle(x, y, obj.scale, ctxt);
  }
}

let aiSprites = {};

function renderAI(obj, ctxt) {
  let tmpIndx = obj.index;
  let tmpSprite = aiSprites[tmpIndx];
  if (!tmpSprite) {
    let tmpImg = new Image();
    tmpImg.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImg.src = "https://moomoo.io/img/animals/" + obj.src + ".png";
    tmpSprite = tmpImg;
    aiSprites[tmpIndx] = tmpSprite;
  }
  if (tmpSprite.isLoaded) {
    let tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1);
    ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2);
  }
}

function renderWaterBodies(xOffset, yOffset, ctxt, padding) {
  let tmpW = config.riverWidth + padding;
  let tmpY = config.mapScale / 2 - yOffset - tmpW / 2;
  if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
    ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW);
  }
}

let gameObjectSprites = {};

function getResSprite(obj) {
  let biomeID =
    obj.y >= config.mapScale - config.snowBiomeTop
      ? 2
      : obj.y <= config.snowBiomeTop
        ? 1
        : 0;

  let tmpIndex = obj.type + "_" + obj.scale + "_" + biomeID;
  if (gameObjectSprites[tmpIndex]) return gameObjectSprites[tmpIndex];

  let c = document.createElement("canvas");
  c.width = c.height = obj.scale * 2.1 + outlineWidth;
  let ctx = c.getContext("2d");

  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate(UTILS.randFloat(0, Math.PI));
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = outlineWidth;

  if (obj.type == 0) {
    renderStar(ctx, 5, obj.scale, obj.scale * 0.7);
    ctx.fillStyle = biomeID ? "#e3f1f4" : "#9ebf57";
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.5;
    renderStar(ctx, 5, obj.scale * 0.82, obj.scale * 0.55);
    ctx.fillStyle = biomeID ? "#cfe3e7" : "#7f9f4a";
    ctx.fill();
    ctx.globalAlpha = 1;
  } else if (obj.type == 1) {
    if (biomeID == 2) {
      ctx.fillStyle = "#606060";
      renderStar(ctx, 6, obj.scale * 0.3, obj.scale * 0.71);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#89a54c";
      renderCircle(0, 0, obj.scale * 0.55, ctx);
      ctx.fill();

      ctx.fillStyle = "#a5c65b";
      renderCircle(0, 0, obj.scale * 0.3, ctx, true);
    } else {
      renderBlob(ctx, 6, obj.scale, obj.scale * 0.7);
      ctx.fillStyle = biomeID ? "#e3f1f4" : "#89a54c";
      ctx.fill();
      ctx.stroke();

      ctx.globalAlpha = 0.5;
      renderBlob(ctx, 6, obj.scale * 0.75, obj.scale * 0.5);
      ctx.fillStyle = biomeID ? "#cfe3e7" : "#739343";
      ctx.fill();
      ctx.globalAlpha = 1;

      let berries = 4;
      let rot = (Math.PI * 2) / berries;
      ctx.fillStyle = biomeID ? "#e65b5b" : "#ff6f61";

      for (let i = 0; i < berries; i++) {
        let r = UTILS.randInt(obj.scale / 3.5, obj.scale / 2.3);
        ctx.beginPath();
        ctx.arc(
          Math.cos(rot * i) * r,
          Math.sin(rot * i) * r,
          UTILS.randInt(9, 11),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    }
  } else if (obj.type == 2 || obj.type == 3) {
    let base =
      obj.type == 2 ? (biomeID == 2 ? "#938d77" : "#939393") : "#e0c655";

    let inner =
      obj.type == 2 ? (biomeID == 2 ? "#b2ab90" : "#bcbcbc") : "#ebdca3";

    ctx.save();
    ctx.translate(0, 3);
    renderStar(ctx, 3, obj.scale, obj.scale);
    ctx.fillStyle = obj.type == 2 ? "#7f7f7f" : "#c9ad3f";
    ctx.fill();
    ctx.restore();

    renderStar(ctx, 3, obj.scale, obj.scale);
    ctx.fillStyle = base;
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.5;
    renderStar(ctx, 3, obj.scale * 0.6, obj.scale * 0.6);
    ctx.fillStyle = inner;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  gameObjectSprites[tmpIndex] = c;
  return c;
}

let itemSprites = [];
function getItemSprite(obj, asIcon) {
  let tmpSprite = itemSprites[obj.id];
  if (!tmpSprite || asIcon) {
    let tmpCanvas = document.createElement("canvas");
    let reScale =
      !asIcon && obj.name == "windmill" ? items.list[4].scale : obj.scale;
    tmpCanvas.width = tmpCanvas.height =
      reScale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0);
    if (config.useWebGl) {
      let gl = tmpCanvas.getContext("webgl");
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      let buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      function render(vs, fs, vertice, type) {
        let vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, vs);
        gl.compileShader(vShader);
        gl.getShaderParameter(vShader, gl.COMPILE_STATUS);

        let fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, fs);
        gl.compileShader(fShader);
        gl.getShaderParameter(fShader, gl.COMPILE_STATUS);

        let program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.getProgramParameter(program, gl.LINK_STATUS);
        gl.useProgram(program);

        let vertex = gl.getAttribLocation(program, "vertex");
        gl.enableVertexAttribArray(vertex);
        gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

        let vertices = vertice.length / 2;
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertice),
          gl.DYNAMIC_DRAW,
        );
        gl.drawArrays(type, 0, vertices);
      }

      function hexToRgb(hex) {
        return hex
          .slice(1)
          .match(/.{1,2}/g)
          .map((g) => parseInt(g, 16));
      }

      function getRgb(r, g, b) {
        return [r / 255, g / 255, b / 255].join(", ");
      }

      let max = 100;
      for (let i = 0; i < max; i++) {
        let radian = Math.PI * (i / (max / 2));
        render(
          `
                            precision mediump float;
                            attribute vec2 vertex;
                            void main(void) {
                                gl_Position = vec4(vertex, 0, 1);
                            }
                            `,
          `
                            precision mediump float;
                            void main(void) {
                                gl_FragColor = vec4(${getRgb(...hexToRgb("#fff"))}, 1);
                            }
                            `,
          [0 + Math.cos(radian) * 0.5, 0 + Math.sin(radian) * 0.5, 0, 0],
          gl.LINE_LOOP,
        );
      }
    } else {
      let tmpContext = tmpCanvas.getContext("2d");
      tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
      tmpContext.rotate(asIcon ? 0 : Math.PI / 2);
      tmpContext.strokeStyle = outlineColor;
      tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1);
      if (!asIcon) {
        tmpContext.shadowColor = `rgba(0, 0, 0, ${Math.min(obj.name == "pit trap" ? 0.8 : 0.5, obj.alpha)})`;
      }

      if (obj.name == "apple") {
        tmpContext.fillStyle = "#c15555";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#89a54c";
        let leafDir = -(Math.PI / 2);
        renderLeaf(
          obj.scale * Math.cos(leafDir),
          obj.scale * Math.sin(leafDir),
          25,
          leafDir + Math.PI / 2,
          tmpContext,
        );
      } else if (obj.name == "cookie") {
        tmpContext.fillStyle = "#cca861";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#937c4b";
        let chips = 4;
        let rotVal = (Math.PI * 2) / chips;
        let tmpRange;
        for (let i = 0; i < chips; ++i) {
          tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
          renderCircle(
            tmpRange * Math.cos(rotVal * i),
            tmpRange * Math.sin(rotVal * i),
            UTILS.randInt(4, 5),
            tmpContext,
            true,
          );
        }
      } else if (obj.name == "cheese") {
        tmpContext.fillStyle = "#f4f3ac";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#c3c28b";
        let chips = 4;
        let rotVal = (Math.PI * 2) / chips;
        let tmpRange;
        for (let i = 0; i < chips; ++i) {
          tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
          renderCircle(
            tmpRange * Math.cos(rotVal * i),
            tmpRange * Math.sin(rotVal * i),
            UTILS.randInt(4, 5),
            tmpContext,
            true,
          );
        }
      } else if (
        obj.name == "wood wall" ||
        obj.name == "stone wall" ||
        obj.name == "castle wall"
      ) {
        tmpContext.fillStyle =
          obj.name == "castle wall"
            ? "#83898e"
            : obj.name == "wood wall"
              ? "#a5974c"
              : "#939393";
        let sides = obj.name == "castle wall" ? 4 : 3;
        renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle =
          obj.name == "castle wall"
            ? "#9da4aa"
            : obj.name == "wood wall"
              ? "#c9b758"
              : "#bcbcbc";
        renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65);
        tmpContext.fill();
      } else if (
        obj.name == "spikes" ||
        obj.name == "greater spikes" ||
        obj.name == "poison spikes" ||
        obj.name == "spinning spikes"
      ) {
        tmpContext.fillStyle =
          obj.name == "poison spikes" ? "#7b935d" : "#939393";
        let tmpScale = obj.scale * 0.6;
        renderStar(
          tmpContext,
          obj.name == "spikes" ? 5 : 6,
          obj.scale,
          tmpScale,
        );
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, tmpScale, tmpContext);
        tmpContext.fillStyle = "#c9b758";
        renderCircle(0, 0, tmpScale / 2, tmpContext, true);
      } else if (
        obj.name == "windmill" ||
        obj.name == "faster windmill" ||
        obj.name == "power mill"
      ) {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, reScale, tmpContext);
        tmpContext.fillStyle = "#c9b758";
        renderRectCircle(0, 0, reScale * 1.5, 29, 4, tmpContext);
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, reScale * 0.5, tmpContext);
      } else if (obj.name == "mine") {
        tmpContext.fillStyle = "#939393";
        renderStar(tmpContext, 3, obj.scale, obj.scale);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#bcbcbc";
        renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
        tmpContext.fill();
      } else if (obj.name == "sapling") {
        for (let i = 0; i < 2; ++i) {
          let tmpScale = obj.scale * (!i ? 1 : 0.5);
          renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
          tmpContext.fillStyle = !i ? "#9ebf57" : "#b4db62";
          tmpContext.fill();
          if (!i) tmpContext.stroke();
        }
      } else if (obj.name == "pit trap") {
        tmpContext.fillStyle = "#a5974c";
        renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = outlineColor;
        renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
        tmpContext.fill();
      } else if (obj.name == "boost pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#dbd97d";
        renderTriangle(obj.scale * 1, tmpContext);
      } else if (obj.name == "turret") {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#939393";
        let tmpLen = 50;
        renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
      } else if (obj.name == "platform") {
        tmpContext.fillStyle = "#cebd5f";
        let tmpCount = 4;
        let tmpS = obj.scale * 2;
        let tmpW = tmpS / tmpCount;
        let tmpX = -(obj.scale / 2);
        for (let i = 0; i < tmpCount; ++i) {
          renderRect(tmpX - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext);
          tmpContext.fill();
          tmpContext.stroke();
          tmpX += tmpS / tmpCount;
        }
      } else if (obj.name == "healing pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
      } else if (obj.name == "spawn pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#71aad6";
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
      } else if (obj.name == "blocker") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
      } else if (obj.name == "teleporter") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#d76edb";
        renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
      }
    }
    tmpSprite = tmpCanvas;
    if (!asIcon) {
      itemSprites[obj.id] = tmpSprite;
    }
  }
  return tmpSprite;
}

function getItemSprite2(obj, tmpX, tmpY) {
  let tmpContext = mainContext;
  let reScale = obj.name == "windmill" ? items.list[4].scale : obj.scale;
  tmpContext.save();
  tmpContext.translate(tmpX, tmpY);
  tmpContext.rotate(obj.dir);
  tmpContext.strokeStyle = outlineColor;
  tmpContext.lineWidth = outlineWidth;
  if (obj.name == "apple") {
    tmpContext.fillStyle = "#c15555";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fillStyle = "#89a54c";
    let leafDir = -(Math.PI / 2);
    renderLeaf(
      obj.scale * Math.cos(leafDir),
      obj.scale * Math.sin(leafDir),
      25,
      leafDir + Math.PI / 2,
      tmpContext,
    );
  } else if (obj.name == "cookie") {
    tmpContext.fillStyle = "#cca861";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fillStyle = "#937c4b";
    let chips = 4;
    let rotVal = (Math.PI * 2) / chips;
    let tmpRange;
    for (let i = 0; i < chips; ++i) {
      tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
      renderCircle(
        tmpRange * Math.cos(rotVal * i),
        tmpRange * Math.sin(rotVal * i),
        UTILS.randInt(4, 5),
        tmpContext,
        true,
      );
    }
  } else if (obj.name == "cheese") {
    tmpContext.fillStyle = "#f4f3ac";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fillStyle = "#c3c28b";
    let chips = 4;
    let rotVal = (Math.PI * 2) / chips;
    let tmpRange;
    for (let i = 0; i < chips; ++i) {
      tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
      renderCircle(
        tmpRange * Math.cos(rotVal * i),
        tmpRange * Math.sin(rotVal * i),
        UTILS.randInt(4, 5),
        tmpContext,
        true,
      );
    }
  } else if (
    obj.name == "wood wall" ||
    obj.name == "stone wall" ||
    obj.name == "castle wall"
  ) {
    tmpContext.fillStyle =
      obj.name == "castle wall"
        ? "#83898e"
        : obj.name == "wood wall"
          ? "#a5974c"
          : "#939393";
    let sides = obj.name == "castle wall" ? 4 : 3;
    renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle =
      obj.name == "castle wall"
        ? "#9da4aa"
        : obj.name == "wood wall"
          ? "#c9b758"
          : "#bcbcbc";
    renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65);
    tmpContext.fill();
  } else if (
    obj.name == "spikes" ||
    obj.name == "greater spikes" ||
    obj.name == "poison spikes" ||
    obj.name == "spinning spikes"
  ) {
    tmpContext.fillStyle = obj.name == "poison spikes" ? "#7b935d" : "#939393";
    let tmpScale = obj.scale * 0.6;
    renderStar(tmpContext, obj.name == "spikes" ? 5 : 6, obj.scale, tmpScale);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#a5974c";
    renderCircle(0, 0, tmpScale, tmpContext);
    tmpContext.fillStyle = "#c9b758";
    renderCircle(0, 0, tmpScale / 2, tmpContext, true);
  } else if (
    obj.name == "windmill" ||
    obj.name == "faster windmill" ||
    obj.name == "power mill"
  ) {
    tmpContext.fillStyle = "#a5974c";
    renderCircle(0, 0, reScale, tmpContext);
    tmpContext.fillStyle = "#c9b758";
    renderRectCircle(0, 0, reScale * 1.5, 29, 4, tmpContext);
    tmpContext.fillStyle = "#a5974c";
    renderCircle(0, 0, reScale * 0.5, tmpContext);
  } else if (obj.name == "mine") {
    tmpContext.fillStyle = "#939393";
    renderStar(tmpContext, 3, obj.scale, obj.scale);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#bcbcbc";
    renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
    tmpContext.fill();
  } else if (obj.name == "sapling") {
    for (let i = 0; i < 2; ++i) {
      let tmpScale = obj.scale * (!i ? 1 : 0.5);
      renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
      tmpContext.fillStyle = !i ? "#9ebf57" : "#b4db62";
      tmpContext.fill();
      if (!i) tmpContext.stroke();
    }
  } else if (obj.name == "pit trap") {
    tmpContext.fillStyle = "#a5974c";
    renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = outlineColor;
    renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
    tmpContext.fill();
  } else if (obj.name == "boost pad") {
    tmpContext.fillStyle = "#7e7f82";
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#dbd97d";
    renderTriangle(obj.scale * 1, tmpContext);
  } else if (obj.name == "turret") {
    tmpContext.fillStyle = "#a5974c";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#939393";
    let tmpLen = 50;
    renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
    renderCircle(0, 0, obj.scale * 0.6, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
  } else if (obj.name == "platform") {
    tmpContext.fillStyle = "#cebd5f";
    let tmpCount = 4;
    let tmpS = obj.scale * 2;
    let tmpW = tmpS / tmpCount;
    let tmpX = -(obj.scale / 2);
    for (let i = 0; i < tmpCount; ++i) {
      renderRect(tmpX - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpX += tmpS / tmpCount;
    }
  } else if (obj.name == "healing pad") {
    tmpContext.fillStyle = "#7e7f82";
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#db6e6e";
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
  } else if (obj.name == "spawn pad") {
    tmpContext.fillStyle = "#7e7f82";
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "#71aad6";
    renderCircle(0, 0, obj.scale * 0.6, tmpContext);
  } else if (obj.name == "blocker") {
    tmpContext.fillStyle = "#7e7f82";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.rotate(Math.PI / 4);
    tmpContext.fillStyle = "#db6e6e";
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
  } else if (obj.name == "teleporter") {
    tmpContext.fillStyle = "#7e7f82";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.rotate(Math.PI / 4);
    tmpContext.fillStyle = "#d76edb";
    renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
  }
  tmpContext.restore();
}

let objSprites = [];

function getObjSprite(obj) {
  let tmpSprite = objSprites[obj.id];
  if (tmpSprite) return tmpSprite;

  let c = document.createElement("canvas");
  c.width = c.height =
    obj.scale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0);
  let ctx = c.getContext("2d");

  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = outlineWidth;

  if (
    obj.name == "spikes" ||
    obj.name == "greater spikes" ||
    obj.name == "poison spikes" ||
    obj.name == "spinning spikes"
  ) {
    let baseCol = obj.name == "poison spikes" ? "#7b935d" : "#939393";
    let darkCol = obj.name == "poison spikes" ? "#5f7448" : "#7a7a7a";

    let inner = obj.scale * 0.6;
    let points = obj.name == "spikes" ? 5 : 6;

    ctx.save();
    ctx.translate(0, 2);
    ctx.fillStyle = darkCol;
    renderStar(ctx, points, obj.scale, inner);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = baseCol;
    renderStar(ctx, points, obj.scale, inner);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = darkCol;
    renderStar(ctx, points, obj.scale * 0.85, inner * 0.85);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#e6e6e6";
    renderCircle(0, 0, inner, ctx);
    ctx.fill();

    ctx.fillStyle = obj.name == "poison spikes" ? "#b8c97a" : "#ffb6c1";
    renderCircle(0, 0, inner * 0.45, ctx, true);
  } else if (obj.name == "pit trap") {
    ctx.save();
    ctx.translate(0, 3);
    ctx.fillStyle = "#d6d6d6";
    renderStar(ctx, 3, obj.scale * 1.1, obj.scale * 1.1);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#ffffff";
    renderStar(ctx, 3, obj.scale * 1.1, obj.scale * 1.1);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#ff9bb8";
    renderStar(ctx, 3, obj.scale * 0.7, obj.scale * 0.7);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  objSprites[obj.id] = c;
  return c;
}

function getMarkSprite(obj, tmpContext, tmpX, tmpY) {
  let center = { x: screenWidth / 2, y: screenHeight / 2 };

  let time = (Date.now() % 2000) / 2000;
  let pulseAlpha = 0.3 + Math.sin(time * Math.PI * 2) * 0.1;
  let scalePulse = 1 + Math.sin(time * Math.PI * 2) * 0.05;

  mainContext.globalAlpha = pulseAlpha;
  tmpContext.lineWidth = 1.5;
  tmpContext.strokeStyle = "rgba(255, 255, 255, 0.7)";

  tmpContext.save();
  tmpContext.translate(tmpX, tmpY);
  tmpContext.rotate(obj.dir || getAttackDir());
  tmpContext.scale(scalePulse, scalePulse);

  if (
    obj.name == "spikes" ||
    obj.name == "greater spikes" ||
    obj.name == "poison spikes" ||
    obj.name == "spinning spikes"
  ) {
    let spikeCount = obj.name == "spikes" ? 5 : 6;
    let color =
      obj.name == "poison spikes"
        ? "rgba(0, 255, 0, 0.7)"
        : "rgba(0, 255, 0, 0.7)";
    tmpContext.fillStyle = color;
    let innerScale = obj.scale * 0.6;
    renderStar(tmpContext, spikeCount, obj.scale, innerScale);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "rgba(165, 151, 76, 0.6)";
    renderCircle(0, 0, innerScale, tmpContext);
    if (
      player &&
      obj.owner &&
      player.sid != obj.owner.sid &&
      !tmpObj.findAllianceBySid(obj.owner.sid)
    ) {
      tmpContext.fillStyle = "rgba(163, 64, 64, 0.6)";
    } else {
      tmpContext.fillStyle = "rgba(201, 183, 88, 0.6)";
    }
    renderCircle(0, 0, innerScale / 2, tmpContext, true);
  } else if (obj.name == "turret") {
    tmpContext.fillStyle = "rgba(165, 151, 76, 0.6)";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "rgba(147, 147, 147, 0.7)";
    let tmpLen = 50;
    renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
    renderCircle(0, 0, obj.scale * 0.6, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
  } else if (obj.name == "teleporter") {
    tmpContext.fillStyle = "rgba(126, 127, 130, 0.6)";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.rotate(Math.PI / 4);
    tmpContext.fillStyle = "rgba(215, 110, 219, 0.7)";
    renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
  } else if (obj.name == "platform") {
    tmpContext.fillStyle = "rgba(206, 189, 95, 0.6)";
    let tmpCount = 4;
    let tmpS = obj.scale * 2;
    let tmpW = tmpS / tmpCount;
    let tmpXpos = -(obj.scale / 2);
    for (let i = 0; i < tmpCount; ++i) {
      renderRect(tmpXpos - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpXpos += tmpS / tmpCount;
    }
  } else if (obj.name == "healing pad") {
    tmpContext.fillStyle = "rgba(126, 127, 130, 0.6)";
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "rgba(219, 110, 110, 0.7)";
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
  } else if (obj.name == "spawn pad") {
    tmpContext.fillStyle = "rgba(126, 127, 130, 0.6)";
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.fillStyle = "rgba(113, 170, 214, 0.7)";
    renderCircle(0, 0, obj.scale * 0.6, tmpContext);
  } else if (obj.name == "blocker") {
    tmpContext.fillStyle = "rgba(126, 127, 130, 0.6)";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fill();
    tmpContext.stroke();
    tmpContext.rotate(Math.PI / 4);
    tmpContext.fillStyle = "rgba(219, 110, 110, 0.7)";
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
  } else if (
    obj.name == "windmill" ||
    obj.name == "faster windmill" ||
    obj.name == "power mill"
  ) {
    tmpContext.fillStyle = "rgba(165, 151, 76, 0.6)";
    renderCircle(0, 0, obj.scale, tmpContext);
    tmpContext.fillStyle = "rgba(201, 183, 88, 0.7)";
    renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext);
    tmpContext.fillStyle = "rgba(165, 151, 76, 0.6)";
    renderCircle(0, 0, obj.scale * 0.5, tmpContext);
  } else if (obj.name == "pit trap") {
    tmpContext.fillStyle = "rgba(165, 151, 76, 0.6)";
    renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
    tmpContext.fill();
    tmpContext.stroke();
    if (
      player &&
      obj.owner &&
      player.sid != obj.owner.sid &&
      !tmpObj.findAllianceBySid(obj.owner.sid)
    ) {
      tmpContext.fillStyle = "rgba(163, 64, 64, 0.6)";
    } else {
      tmpContext.fillStyle = "rgba(255, 255, 255, 0.6)";
    }
    renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
    tmpContext.fill();
  }

  tmpContext.restore();
}

const baseRenderDistance = 2000;

function isOnScreen(x, y, s) {
  // Calculate render distance based on zoom level and screen size
  const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
  const dynamicRenderDistance = baseDistance * wbe;

  const distanceSquared =
    (x - screenWidth / 2) ** 2 + (y - screenHeight / 2) ** 2;

  if (distanceSquared > dynamicRenderDistance ** 2) {
    // Reset fade alpha when out of range
    tmpObj.fadeAlpha = 0;
    return false;
  }

  // Calculate fade distance (last 200 pixels)
  const fadeDistance = 200;
  const distance = Math.sqrt(distanceSquared);
  const fadeStart = dynamicRenderDistance - fadeDistance;

  // Calculate fade speed for 2 seconds duration (assuming 60 FPS = 120 frames)
  const fadeSpeed = 1 / 120;

  // Initialize fade alpha if not set
  if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

  if (distance > fadeStart) {
    // Fade out zone - calculate target alpha based on distance
    const fadeProgress = (distance - fadeStart) / fadeDistance;
    const targetAlpha = Math.max(0, 1 - fadeProgress);

    // Always move toward target alpha (fade out)
    tmpObj.fadeAlpha = Math.max(targetAlpha, tmpObj.fadeAlpha - fadeSpeed);
  } else {
    // Fade in zone - gradually increase to full opacity
    tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
  }

  return true;
}

function renderBrokenObjects(xOffset, yOffset) {
  // Calculate fade speed for 2 seconds duration
  const fadeSpeed = 1 / 120;

  // Update and render broken objects
  for (let i = breakObjects.length - 1; i >= 0; i--) {
    const obj = breakObjects[i];

    // Initialize fade alpha if not set
    if (obj.fadeAlpha === undefined) obj.fadeAlpha = 1;

    // Always decrease alpha (fade out)
    obj.fadeAlpha = Math.max(0, obj.fadeAlpha - fadeSpeed);

    // Remove if completely faded
    if (obj.fadeAlpha <= 0) {
      breakObjects.splice(i, 1);
      continue;
    }

    // Calculate screen position
    const screenX = obj.x - xOffset;
    const screenY = obj.y - yOffset;

    // Check if on screen
    const distanceSquared =
      (screenX - screenWidth / 2) ** 2 + (screenY - screenHeight / 2) ** 2;
    const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
    const dynamicRenderDistance = baseDistance * wbe;

    if (distanceSquared > dynamicRenderDistance ** 2) continue;

    // Render broken object with fade
    mainContext.save();
    mainContext.globalAlpha = obj.fadeAlpha;
    mainContext.fillStyle = "rgba(100, 100, 100, 0.5)";
    mainContext.fillRect(screenX - 20, screenY - 20, 40, 40);
    mainContext.restore();
  }
}

function renderGameObjects(layer, xOffset, yOffset) {
  let tmpSprite;
  let tmpX;
  let tmpY;
  liztobj.forEach((tmp) => {
    tmpObj = tmp;
    if (tmpObj.active && liztobj.includes(tmp) && tmpObj.render) {
      tmpX = tmpObj.x + tmpObj.xWiggle - xOffset;
      tmpY = tmpObj.y + tmpObj.yWiggle - yOffset;
      if (layer == 0) {
        tmpObj.update(delta);
      }

      // Check if object is in range and calculate fade
      const inRange = isOnScreen(tmpX, tmpY, tmpObj.scale);
      if (!inRange) return;

      // Apply fade alpha (objects start at 0 and fade in)
      const fadeAlpha = tmpObj.fadeAlpha !== undefined ? tmpObj.fadeAlpha : 0;
      mainContext.globalAlpha = tmpObj.alpha * fadeAlpha;

      // Don't render if completely faded out
      if (fadeAlpha <= 0) return;

      if (tmpObj.layer == layer) {
        //mainContext.globalAlpha = tmpObj.hideFromEnemy ? 0.6 : 1;
        if (tmpObj.isItem) {
          if ((tmpObj.dmg || tmpObj.trap) && !tmpObj.isTeamObject(player)) {
            tmpSprite = getObjSprite(tmpObj);
          } else {
            tmpSprite = getItemSprite(tmpObj);
          }

          mainContext.save();
          mainContext.translate(tmpX, tmpY);
          mainContext.rotate(tmpObj.dir);
          if (!tmpObj.active) {
            mainContext.scale(
              tmpObj.visScale / tmpObj.scale,
              tmpObj.visScale / tmpObj.scale,
            );
          }
          mainContext.drawImage(
            tmpSprite,
            -(tmpSprite.width / 2),
            -(tmpSprite.height / 2),
          );

          if (tmpObj.blocker) {
            mainContext.strokeStyle = "#db6e6e";
            mainContext.globalAlpha = 0.3;
            mainContext.lineWidth = 6;
            renderCircle(0, 0, tmpObj.blocker, mainContext, false, true);
          }
          mainContext.restore();
        } else {
          tmpSprite = getResSprite(tmpObj);
          mainContext.drawImage(
            tmpSprite,
            tmpX - tmpSprite.width / 2,
            tmpY - tmpSprite.height / 2,
          );
        }
      }
      if (layer == 3) {
        if (tmpObj.isItem) {
          if (player && UTILS.getDist(tmpObj, player, 0, 0) <= 1200) {
            mainContext.save();
            mainContext.translate(tmpX, tmpY);

            const isAlly = tmpObj.isTeamObject
              ? tmpObj.isTeamObject(player)
              : tmpObj.owner &&
              (tmpObj.owner.sid === player.sid ||
                (player.team && tmpObj.owner.team === player.team));
            const teamColor = isAlly ? "#00FF00" : "#FF0000";
            const healthPercent = tmpObj.buildHealth
              ? tmpObj.buildHealth / tmpObj.health
              : tmpObj.health / tmpObj.maxHealth;

            const outerRadius = 8;
            const ringWidth = 3;
            const innerRadius = outerRadius - ringWidth;

            mainContext.strokeStyle = "#FFFFFF";
            mainContext.lineWidth = 1;
            mainContext.beginPath();
            mainContext.arc(0, 0, outerRadius, 0, Math.PI * 2);
            mainContext.stroke();

            mainContext.strokeStyle = teamColor;
            mainContext.lineWidth = ringWidth;
            mainContext.lineCap = "round";
            mainContext.beginPath();
            mainContext.arc(
              0,
              0,
              outerRadius - ringWidth / 2,
              -Math.PI / 2,
              -Math.PI / 2 + healthPercent * Math.PI * 2,
            );
            mainContext.stroke();

            const innerColor = isAlly ? "#00CC00" : "#CC0000";
            mainContext.fillStyle = innerColor;
            mainContext.beginPath();
            mainContext.arc(0, 0, innerRadius, 0, Math.PI * 2);
            mainContext.fill();

            mainContext.strokeStyle = "#FFFFFF";
            mainContext.lineWidth = 0.5;
            mainContext.beginPath();
            mainContext.arc(0, 0, innerRadius, 0, Math.PI * 2);
            mainContext.stroke();

            mainContext.restore();
          }
        }
      }
    }
  });

  if (layer == 0) {
    if (placeVisible.length) {
      placeVisible.forEach((places) => {
        tmpX = places.x - xOffset;
        tmpY = places.y - yOffset;
        markObject(places, tmpX, tmpY);
      });
    }
  }
}

function markObject(tmpObj, tmpX, tmpY) {
  getMarkSprite(tmpObj, mainContext, tmpX, tmpY);
}

class MapPing {
  constructor(color, scale) {
    this.init = function (x, y) {
      this.scale = 0;
      this.x = x;
      this.y = y;
      this.active = true;
    };
    this.update = function (ctxt, delta) {
      if (this.active) {
        this.scale += 0.05 * delta;
        if (this.scale >= scale) {
          this.active = false;
        } else {
          ctxt.globalAlpha = 1 - Math.max(0, this.scale / scale);
          ctxt.beginPath();
          ctxt.arc(
            (this.x / config.mapScale) * mapDisplay.width,
            (this.y / config.mapScale) * mapDisplay.width,
            this.scale,
            0,
            2 * Math.PI,
          );
          ctxt.stroke();
        }
      }
    };
    this.color = color;
  }
}

function pingMap(x, y) {
  tmpPing = mapPings.find((pings) => !pings.active);
  if (!tmpPing) {
    tmpPing = new MapPing("#FFB6C1", config.mapPingScale);
    mapPings.push(tmpPing);
  }
  tmpPing.init(x, y);
}

function updateMapMarker() {
  mapMarker.x = player.x;
  mapMarker.y = player.y;
}

function renderMinimap(delta) {
  if (player && player.alive) {
    mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height);

    mapContext.lineWidth = 4;
    for (let i = 0; i < mapPings.length; ++i) {
      tmpPing = mapPings[i];
      mapContext.strokeStyle = tmpPing.color;
      tmpPing.update(mapContext, delta);
    }

    mapContext.globalAlpha = 1;
    mapContext.fillStyle = "#55AA55";
    renderCircle(
      (player.x / config.mapScale) * mapDisplay.width,
      (player.y / config.mapScale) * mapDisplay.height,
      7,
      mapContext,
      true,
    );
    mapContext.fillStyle = "rgba(255, 182, 193, 0.35)";
    if (player.team && minimapData) {
      for (let i = 0; i < minimapData.length;) {
        renderCircle(
          (minimapData[i] / config.mapScale) * mapDisplay.width,
          (minimapData[i + 1] / config.mapScale) * mapDisplay.height,
          7,
          mapContext,
          true,
        );
        i += 2;
      }
    }

    if (lastDeath) {
      mapContext.fillStyle = "#fc5553";
      mapContext.font = "34px 'Comic Sans MS', cursive";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText(
        "x",
        (lastDeath.x / config.mapScale) * mapDisplay.width,
        (lastDeath.y / config.mapScale) * mapDisplay.height,
      );
    }

    // DEATH LOCATION:
    if (lastDeath) {
      mapContext.fillStyle = "#fc5553";
      mapContext.font = "34px HammerSmith One";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText(
        "x",
        (lastDeath.x / config.mapScale) * mapDisplay.width,
        (lastDeath.y / config.mapScale) * mapDisplay.height,
      );
    }

    // MAP MARKER:
    if (mapMarker) {
      mapContext.fillStyle = "#fff";
      mapContext.font = "34px HammerSmith One";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText(
        "x",
        (mapMarker.x / config.mapScale) * mapDisplay.width,
        (mapMarker.y / config.mapScale) * mapDisplay.height,
      );
    }
    bottics.forEach((c) => {
      if (
        c &&
        c.Bot &&
        typeof c.Bot.x2 === "number" &&
        typeof c.Bot.y2 === "number"
      ) {
        const mapX = (c.Bot.x2 / config.mapScale) * mapDisplay.width;
        const mapY = (c.Bot.y2 / config.mapScale) * mapDisplay.height;
        mapContext.fillStyle = "white";
        mapContext.globalAlpha = 0.4;
        mapContext.beginPath();
        mapContext.arc(mapX, mapY, 7, 0, Math.PI * 2);
        mapContext.fill();
      }
    });
  }
}

let iconSprites = {};
let icons = ["crown", "skull"];

function loadIcons() {
  for (let i = 0; i < icons.length; ++i) {
    let tmpSprite = new Image();
    tmpSprite.onload = function () {
      this.isLoaded = true;
    };
    tmpSprite.src = "./../img/icons/" + icons[i] + ".png";
    iconSprites[icons[i]] = tmpSprite;
  }
}
loadIcons();

function cdf(e, t) {
  try {
    return Math.hypot(
      (t.y2 || t.y) - (e.y2 || e.y),
      (t.x2 || t.x) - (e.x2 || e.x),
    );
  } catch (e) {
    return Infinity;
  }
}

function seePoint(point) {
  let deltaX = Math.abs(point.x - player.x) - point.scale;
  let deltaY = Math.abs(point.y - player.y) - point.scale;
  let maxVisibleWidth = (maxScreenWidth / 2) * 1.3;
  let maxVisibleHeight = (maxScreenHeight / 2) * 1.3;
  return deltaX <= maxVisibleWidth && deltaY <= maxVisibleHeight;
}
// COASTLINE MAKER:
function ShorePath(startX, startY, endX, distance, float) {
  this.startX = startX;
  this.startY = startY;
  this.endX = endX;
  this.distance = distance;
  this.float = float;

  this.amountPaths = Math.ceil(this.endX / this.distance);

  this.path = new Map();

  this.generate = function () {
    for (let i = 1; i <= this.amountPaths; i += 1) {
      const offsetY = i % 2 === 0 ? this.distance : 0;
      const x = this.startX + this.distance * (i - 1);
      const randomOffsetY = Math.floor(Math.random() * (45 - 10)) + 10;
      const y =
        this.startY +
        ((this.float === "down" ? offsetY : -offsetY) +
          (i % 2 === 0
            ? Math.random() < 0.55
              ? randomOffsetY
              : -randomOffsetY
            : 0));

      this.path.set(i, [x, y, offsetY, randomOffsetY]);
    }
  };

  this.render = function (color, xOffset, yOffset) {
    const path = Array.from(this.path.values());
    if (!player?.active || !player?.alive) return;

    for (let i = 1; i < path.length; i++) {
      const oldPoint = path[i - 1];
      const currentPoint = path[i];

      if (
        !seePoint({
          x: oldPoint[0],
          y: oldPoint[1],
          scale: 10,
        })
      )
        continue;

      if (
        !seePoint({
          x: currentPoint[0],
          y: currentPoint[1],
          scale: 10,
        })
      )
        continue;

      const pointOffset = this.distance / 2;
      const sidePoint1 = [
        oldPoint[0] - pointOffset / 2,
        oldPoint[1] + (oldPoint[2] === 0 ? pointOffset : -pointOffset),
      ];
      const sidePoint2 = [
        currentPoint[0] + pointOffset * 1.15,
        currentPoint[1] + pointOffset * 1.2,
      ];
      const sidePoint3 = [
        currentPoint[0] + pointOffset * 1.35,
        currentPoint[1] - pointOffset * 1.15,
      ];
      const sidePoint4 = [
        currentPoint[0] - pointOffset * 1.35,
        currentPoint[1] + pointOffset * 1.15,
      ];

      mainContext.save();
      mainContext.fillStyle = color;
      mainContext.lineCap = "round";
      mainContext.lineJoin = "round";
      mainContext.beginPath();
      mainContext.moveTo(oldPoint[0] - xOffset, oldPoint[1] - yOffset);
      mainContext.lineTo(
        oldPoint[0] + this.distance * 2 - xOffset,
        this.startY - yOffset,
      );
      mainContext.lineTo(currentPoint[0] - xOffset, currentPoint[1] - yOffset);
      mainContext.fill();
      mainContext.beginPath();
      mainContext.moveTo(oldPoint[0] - xOffset, oldPoint[1] - yOffset);
      mainContext.bezierCurveTo(
        sidePoint1[0] - xOffset,
        sidePoint1[1] - yOffset,
        sidePoint2[0] - xOffset,
        sidePoint2[1] - yOffset,
        currentPoint[0] + (currentPoint[3] >= 10 ? 3.5 : 1) - xOffset,
        currentPoint[1] - yOffset,
      );
      mainContext.fill();
      mainContext.beginPath();
      mainContext.moveTo(currentPoint[0] - xOffset, currentPoint[1] - yOffset);
      mainContext.bezierCurveTo(
        sidePoint2[0] - xOffset,
        sidePoint2[1] - yOffset,
        sidePoint3[0] - xOffset,
        sidePoint3[1] - yOffset,
        currentPoint[0] + this.distance * 2 - xOffset,
        this.startY - yOffset,
      );
      mainContext.fill();
      mainContext.restore();
    }
  };

  return this.generate();
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
  // Ueh logic of making beutiful stars
  isEnabled: true,
  overlay: { opacity: 0, r: 0, g: 0, b: 0 },
  starField: [],
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

let starSpawnTimer = 0;

let renderShapes = (mainContext, delta, offsetX, offsetY) => {
  nightModeState.overlay.opacity = nightModeState.isEnabled
    ? Math.min(0.5, nightModeState.overlay.opacity + 0.001)
    : Math.max(0, nightModeState.overlay.opacity - 0.001);

  // Update blood particles
  updateBloodParticles(delta, offsetX, offsetY);

  if (nightModeState.overlay.opacity > 0) {
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
  const liztSet = new Set(liztobj);

  if (gameObjects.length && inGame) {
    const maxDistSq = 2500 * 2500;

    gameObjects.forEach((tmp) => {
      const dx = tmp.x - player.x;
      const dy = tmp.y - player.y;
      const distSq = dx * dx + dy * dy;

      const inRange = distSq <= maxDistSq;
      const inList = liztSet.has(tmp);

      if (inRange) {
        if (!inList) {
          liztobj.push(tmp);
          liztSet.add(tmp);
        }
        tmp.render = true;
      } else {
        if (inList) {
          liztSet.delete(tmp);
          const index = liztobj.indexOf(tmp);
          if (index !== -1) liztobj.splice(index, 1);
        }
        tmp.render = false;
      }
    });
  }

  mainContext.beginPath();
  mainContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  mainContext.globalAlpha = 1;

  if (player) {
    let easingFactor = 0.1;
    camX += (player.x - camX) * easingFactor;
    camY += (player.y - camY) * easingFactor;
    let time = performance.now() * 0.002;
    let floatFactor = 1.5;
    camX += floatFactor * Math.sin(time);
    camY += floatFactor * Math.cos(time);
  } else {
    camX = config.mapScale / 2;
    camY = config.mapScale / 2;
  }

  let lastTime = now - 1000 / config.serverUpdateRate;
  let tmpDiff;
  for (let i = 0; i < players.length + ais.length; ++i) {
    tmpObj = players[i] || ais[i - players.length];
    if (tmpObj && tmpObj.visible) {
      if (tmpObj.forcePos) {
        tmpObj.x = tmpObj.x2;
        tmpObj.y = tmpObj.y2;
        tmpObj.dir = tmpObj.d2;
      } else {
        let total = tmpObj.t2 - tmpObj.t1;
        let fraction = lastTime - tmpObj.t1;
        let ratio = fraction / total;
        let rate = 170;
        tmpObj.dt += delta;
        let tmpRate = Math.min(1.7, tmpObj.dt / rate);
        tmpDiff = tmpObj.x2 - tmpObj.x1;
        tmpObj.x = tmpObj.x1 + tmpDiff * tmpRate;
        tmpDiff = tmpObj.y2 - tmpObj.y1;
        tmpObj.y = tmpObj.y1 + tmpDiff * tmpRate;
        if (config.anotherVisual) {
          tmpObj.dir = Math.lerpAngle(
            tmpObj.d2,
            tmpObj.d1,
            Math.min(1.2, ratio),
          );
        } else {
          tmpObj.dir = Math.lerpAngle(
            tmpObj.d2,
            tmpObj.d1,
            Math.min(1.2, ratio),
          );
        }
      }
    }
  }

  let xOffset = camX - maxScreenWidth / 2;
  let yOffset = camY - maxScreenHeight / 2;

  if (
    config.snowBiomeTop - yOffset <= 0 &&
    config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight
  ) {
    mainContext.fillStyle = "#b6db66";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  } else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
    mainContext.fillStyle = "#dbc666";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  } else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
    mainContext.fillStyle = "#fff";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  } else if (config.snowBiomeTop - yOffset >= 0) {
    mainContext.fillStyle = "#fff";
    mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset);
    mainContext.fillStyle = "#b6db66";
    mainContext.fillRect(
      0,
      config.snowBiomeTop - yOffset,
      maxScreenWidth,
      maxScreenHeight - (config.snowBiomeTop - yOffset),
    );
    snowPath.render("#fff", xOffset, yOffset);
  } else {
    mainContext.fillStyle = "#b6db66";
    mainContext.fillRect(
      0,
      0,
      maxScreenWidth,
      config.mapScale - config.snowBiomeTop - yOffset,
    );
    mainContext.fillStyle = "#dbc666";
    mainContext.fillRect(
      0,
      config.mapScale - config.snowBiomeTop - yOffset,
      maxScreenWidth,
      maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset),
    );
    desertPath.render("#b6db66", xOffset, yOffset);
  }

  if (!firstSetup) {
    waterMult += waterPlus * config.waveSpeed * delta;
    if (waterMult >= config.waveMax) {
      waterMult = config.waveMax;
      waterPlus = -1;
    } else if (waterMult <= 1) {
      waterMult = waterPlus = 1;
    }
    mainContext.globalAlpha = 1;
    mainContext.fillStyle = "#dbc666";
    renderWaterBodies(xOffset, yOffset, mainContext, config.riverPadding);
    mainContext.fillStyle = "#91b2db";
    renderWaterBodies(xOffset, yOffset, mainContext, (waterMult - 1) * 250);
  }

  mainContext.globalAlpha = 1;
  mainContext.strokeStyle = outlineColor;
  renderDeadPlayers(xOffset, yOffset);

  mainContext.globalAlpha = 1;
  mainContext.strokeStyle = outlineColor;
  renderGameObjects(-1, xOffset, yOffset);

  mainContext.globalAlpha = 1;
  mainContext.lineWidth = outlineWidth;
  renderProjectiles(0, xOffset, yOffset);

  renderPlayers(xOffset, yOffset, 0);

  mainContext.globalAlpha = 1;
  for (let i = 0; i < ais.length; ++i) {
    tmpObj = ais[i];
    if (tmpObj.active && tmpObj.visible) {
      tmpObj.animate(delta);
      mainContext.save();
      mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
      mainContext.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2);
      renderAI(tmpObj, mainContext);
      mainContext.restore();
    }
  }
  renderShapes(mainContext, delta, xOffset, yOffset);
  renderGameObjects(0, xOffset, yOffset);
  renderProjectiles(1, xOffset, yOffset);
  renderGameObjects(1, xOffset, yOffset);
  renderPlayers(xOffset, yOffset, 1);
  renderGameObjects(2, xOffset, yOffset);
  renderGameObjects(3, xOffset, yOffset);

  // Render broken objects with fade-out
  renderBrokenObjects(xOffset, yOffset);

  mainContext.fillStyle = "#000";
  mainContext.globalAlpha = 0.09;
  if (xOffset <= 0) {
    mainContext.fillRect(0, 0, -xOffset, maxScreenHeight);
  }
  if (config.mapScale - xOffset <= maxScreenWidth) {
    let tmpY = Math.max(0, -yOffset);
    mainContext.fillRect(
      config.mapScale - xOffset,
      tmpY,
      maxScreenWidth - (config.mapScale - xOffset),
      maxScreenHeight - tmpY,
    );
  }
  if (yOffset <= 0) {
    mainContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset);
  }
  if (config.mapScale - yOffset <= maxScreenHeight) {
    let tmpX = Math.max(0, -xOffset);
    let tmpMin = 0;
    if (config.mapScale - xOffset <= maxScreenWidth) {
      tmpMin = maxScreenWidth - (config.mapScale - xOffset);
      mainContext.fillRect(
        tmpX,
        config.mapScale - yOffset,
        maxScreenWidth - tmpX - tmpMin,
        maxScreenHeight - (config.mapScale - yOffset),
      );
    }
  }

  var volcano = {
    xof: undefined,
    yof: undefined,
    animationTime: 0,
    land: null,
    lava: null,
    x: config.volcanoLocationX,
    y: config.volcanoLocationY,
  };

  volcano.xof = xOffset;
  volcano.yof = yOffset;

  function createVolcano() {
    let volcanoDimension = config.volcanoScale * 2;
    let landCanvas = document.createElement("canvas");
    landCanvas.width = volcanoDimension;
    landCanvas.height = volcanoDimension;
    let landContext = landCanvas.getContext("2d");

    landContext.fillStyle = "#6a6a6a"; // Solid gray color
    renderPolygon(landContext, 10, volcanoDimension);
    landContext.fill();

    // Add outline
    landContext.strokeStyle = "#3a3a3a";
    landContext.lineWidth = 3;
    renderPolygon(landContext, 10, volcanoDimension);
    landContext.stroke();

    volcano.land = landCanvas;

    let lavaCanvas = document.createElement("canvas");
    let lavaDimension = config.innerVolcanoScale * 2;
    lavaCanvas.width = lavaDimension;
    lavaCanvas.height = lavaDimension;
    let lavaContext = lavaCanvas.getContext("2d");

    // Simple solid lava
    lavaContext.fillStyle = "#ff6622"; // Solid orange-red
    renderPolygon(lavaContext, 10, lavaDimension);
    lavaContext.fill();

    volcano.lava = lavaCanvas;
  }
  createVolcano();

  if (volcano.land && volcano.lava) {
    let volcanoX = volcano.x - volcano.xof;
    let volcanoY = volcano.y - volcano.yof;

    // Update animation time
    volcano.animationTime += 0.02;

    // Draw land layer
    mainContext.globalAlpha = 1;
    mainContext.drawImage(
      volcano.land,
      volcanoX - config.volcanoScale,
      volcanoY - config.volcanoScale,
      config.volcanoScale * 2,
      config.volcanoScale * 2,
    );

    // Animated lava with gentle glow
    let glowIntensity = 0.95 + Math.sin(volcano.animationTime * 3) * 0.05;
    mainContext.globalAlpha = glowIntensity;
    mainContext.drawImage(
      volcano.lava,
      volcanoX - config.innerVolcanoScale,
      volcanoY - config.innerVolcanoScale,
      config.innerVolcanoScale * 2,
      config.innerVolcanoScale * 2,
    );
  }

  mainContext.globalAlpha = 1;
  mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
  mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

  mainContext.globalAlpha = 0.35;
  mainContext.fillStyle = "rgb(0, 0, 100)";
  mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

  // RENDER PLAYER AND AI UI:
  mainContext.strokeStyle = darkOutlineColor;
  mainContext.globalAlpha = 1;

  const AbyssColors = {
    darkOutline: "#000000",
    background: "#000000",
    tracer: "#9D00FF",
  };
  mainContext.strokeStyle = AbyssColors.darkOutline;
  mainContext.globalAlpha = 1;
  for (let i = 0; i < players.length + ais.length; ++i) {
    tmpObj = players[i] || ais[i - players.length];
    if (tmpObj.visible) {
      mainContext.strokeStyle = AbyssColors.darkOutline;
      if (
        tmpObj.skinIndex != 10 ||
        tmpObj === player ||
        (tmpObj.team && tmpObj.team == player.team)
      ) {
        let tmpText =
          (tmpObj.team ? "[" + tmpObj.team + "] " : "") +
          (tmpObj.name || "") +
          (tmpObj.isPlayer
            ? ` [${tmpObj.skinIndex === 45 && tmpObj.shameTimer > 0 ? tmpObj.shameTimer : tmpObj.shameCount}]`
            : "");
        if (!recording) {
          player.name = originalName;
        } else {
          player.name = "unknown";
        }
        if (tmpText != "") {
          mainContext.font = tmpObj.isPlayer
            ? 20 + "px Hammersmith One"
            : 30 + "px Hammersmith One";
          mainContext.fillStyle = "#fff";
          mainContext.textBaseline = "middle";
          mainContext.textAlign = "center";
          mainContext.lineWidth = tmpObj.nameScale ? 11 : 8;
          mainContext.lineJoin = "round";
          mainContext.strokeText(
            tmpText,
            tmpObj.x - xOffset,
            tmpObj.isPlayer
              ? tmpObj.y + 90 - yOffset - tmpObj.scale
              : tmpObj.y - yOffset - tmpObj.scale - config.nameY,
          );
          mainContext.fillText(
            tmpText,
            tmpObj.x - xOffset,
            tmpObj.isPlayer
              ? tmpObj.y + 90 - yOffset - tmpObj.scale
              : tmpObj.y - yOffset - tmpObj.scale - config.nameY,
          );
          if (tmpObj.isLeader && iconSprites.crown.isLoaded) {
            let tmpS = config.crownIconScale;
            let tmpX =
              tmpObj.x -
              xOffset -
              tmpS / 2 -
              mainContext.measureText(tmpText).width / 2 -
              config.crownPad;
            mainContext.drawImage(
              iconSprites.crown,
              tmpX,
              tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5,
              tmpS,
              tmpS,
            );
          }
          if (tmpObj.iconIndex == 1 && iconSprites.skull.isLoaded) {
            let tmpS = config.crownIconScale;
            let tmpX =
              tmpObj.x -
              xOffset -
              tmpS / 2 +
              mainContext.measureText(tmpText).width / 2 +
              config.crownPad;
            mainContext.drawImage(
              iconSprites.skull,
              tmpX,
              tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5,
              tmpS,
              tmpS,
            );
          }
          if (
            tmpObj.isPlayer &&
            instaC.wait &&
            near == tmpObj &&
            enemy.length
          ) {
            const size = tmpObj.scale * 2.2; // adjust if needed
            mainContext.drawImage(
              instaReticle,
              tmpObj.x - xOffset - size / 2,
              tmpObj.y - yOffset - size / 2,
              size,
              size,
            );
          }
        }
        if (tmpObj.health > 0) {
          if (tmpObj.displayHealth === undefined) {
            tmpObj.displayHealth = tmpObj.health;
          }

          tmpObj.displayHealth += (tmpObj.health - tmpObj.displayHealth) * 0.15;

          const baseX = tmpObj.x - xOffset;
          const baseY = tmpObj.y - yOffset + tmpObj.scale + config.nameY;

          const outlineX =
            baseX - (config.healthBarWidth + config.healthBarPad);
          const outlineW = config.healthBarWidth * 2 + config.healthBarPad * 2;

          const t = performance.now() * 0.001;
          const baseShift = 50;
          const waveAmplitude = 25;
          const waveSpeed = 0.2;

          const animatedShift =
            baseShift + Math.sin(t * waveSpeed) * waveAmplitude;

          const outlineGrad = mainContext.createLinearGradient(
            outlineX + animatedShift,
            0,
            outlineX + outlineW + animatedShift,
            0,
          );

          outlineGrad.addColorStop(0, "#000000");
          outlineGrad.addColorStop(0.5, "#120018");
          outlineGrad.addColorStop(1, "#1e002f");

          mainContext.fillStyle = outlineGrad;

          mainContext.roundRect(
            baseX - (config.healthBarWidth + config.healthBarPad),
            baseY,
            config.healthBarWidth * 2 + config.healthBarPad * 2,
            17,
            8,
          );
          mainContext.fill();

          mainContext.fillStyle =
            tmpObj === player || (tmpObj.team && tmpObj.team === player.team)
              ? "#8ecc51"
              : "#cc5151";

          const healthFillWidth =
            config.healthBarWidth *
            2 *
            (tmpObj.displayHealth / tmpObj.maxHealth);
          mainContext.roundRect(
            baseX - config.healthBarWidth,
            baseY + config.healthBarPad,
            healthFillWidth,
            17 - config.healthBarPad * 2,
            7,
          );
          mainContext.fill();
          if (tmpObj.isPlayer) {
            const reloadY =
              tmpObj.y - yOffset + tmpObj.scale + config.nameY + 17 + 1;
            const halfW = config.healthBarWidth;
            const barHeight = 17 - config.healthBarPad * 2;

            const barOuterH = 17;
            const barInnerH = barOuterH - config.healthBarPad * 2;

            const gap = 6;
            const totalInnerW = config.healthBarWidth * 2 - gap;
            const barInnerW = totalInnerW / 2;
            const barOuterW = barInnerW + config.healthBarPad * 2;

            const reload0 = tmpObj.reloads?.[tmpObj.primaryIndex] ?? 0;
            const reload1 = tmpObj.reloads?.[tmpObj.secondaryIndex] ?? 0;

            const reloadTime0 =
              tmpObj.primaryIndex !== undefined
                ? items.weapons[tmpObj.primaryIndex]?.speed || 300
                : 300;
            const reloadTime1 =
              tmpObj.secondaryIndex !== undefined
                ? items.weapons[tmpObj.secondaryIndex]?.speed || 300
                : 300;

            if (tmpObj.displayReload0 === undefined)
              tmpObj.displayReload0 = reload0;
            if (tmpObj.displayReload1 === undefined)
              tmpObj.displayReload1 = reload1;

            tmpObj.displayReload0 += (reload0 - tmpObj.displayReload0) * 0.15;
            tmpObj.displayReload1 += (reload1 - tmpObj.displayReload1) * 0.15;

            const ratio0 = Math.max(
              0,
              Math.min(1, 1 - tmpObj.displayReload0 / reloadTime0),
            );
            const ratio1 = Math.max(
              0,
              Math.min(1, 1 - tmpObj.displayReload1 / reloadTime1),
            );

            const leftOuterX =
              baseX - config.healthBarWidth - config.healthBarPad;
            const rightOuterX = leftOuterX + barOuterW - 2;

            const leftInnerX = leftOuterX + config.healthBarPad;
            const rightInnerX = rightOuterX + config.healthBarPad;

            mainContext.fillStyle = outlineGrad;
            mainContext.roundRect(leftOuterX, reloadY, barOuterW, barOuterH, 8);
            mainContext.fill();

            // Left reload bar fill (primary weapon)
            mainContext.fillStyle = "#4da6ff";
            mainContext.roundRect(
              leftInnerX,
              reloadY + config.healthBarPad,
              barInnerW * ratio0,
              barInnerH,
              7,
            );
            mainContext.fill();
            mainContext.fillStyle = outlineGrad;
            mainContext.roundRect(
              rightOuterX,
              reloadY,
              barOuterW,
              barOuterH,
              8,
            );
            mainContext.fill();

            // Right reload bar fill (secondary weapon)
            mainContext.fillStyle = "#4da6ff";
            mainContext.roundRect(
              rightInnerX,
              reloadY + config.healthBarPad,
              barInnerW * ratio1,
              barInnerH,
              7,
            );
            mainContext.fill();
          }
        }
      }
    }
  }

  // RENDER ANIM TEXTS:
  textManager.update(delta, mainContext, xOffset, yOffset);

  players.forEach((tmp) => {
    tmpObj = tmp;
    if (tmpObj.visible && tmpObj.chatCountdown > 0) {
      tmpObj.chatCountdown = Math.max(0, (tmpObj.chatCountdown -= delta));
      mainContext.font = "32px 'Comic Sans MS', cursive";
      var tmpSize = mainContext.measureText(tmpObj.chatMessage);
      mainContext.textBaseline = "middle";
      mainContext.textAlign = "center";
      var tmpX = tmpObj.x - xOffset;
      var tmpY = tmpObj.y - tmpObj.scale - yOffset - 90;
      var tmpH = 47;
      var tmpW = tmpSize.width + 30;
      var padding = 10;
      var tailSize = 12;
      var earSize = 30;
      var bubbleColor = "rgba(0, 0, 0, 0.25)";
      var textColor = "#fff";

      mainContext.roundRect(
        tmpX - tmpW / 2,
        tmpY - tmpH / 2,
        tmpW,
        tmpH,
        15,
        tailSize,
        earSize,
      );
      mainContext.fillStyle = bubbleColor;
      mainContext.fill();

      mainContext.fillStyle = textColor;
      mainContext.fillText(tmpObj.chatMessage, tmpX, tmpY);
    }
  });

  mainContext.globalAlpha = 1;
  renderMinimap(delta);
}

window.requestAnimFrame = function () {
  return null;
};
window.rAF = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 9);
    }
  );
})();

function doUpdate() {
  now = performance.now();
  delta = now - lastUpdate;
  lastUpdate = now;
  let timer = performance.now();
  let diff = timer - fpsTimer.last;
  if (diff >= 1000) {
    fpsTimer.ltime = fpsTimer.time * (1000 / diff);

    fpsTimer.last = timer;
    fpsTimer.time = 0;
  }
  fpsTimer.time++;

  getEl("pingFps").textContent = `${window.pingTime}ms`;
  getEl("fpsCounter").textContent = Math.round(fpsTimer.ltime);
  getEl("packetStatus").innerHTML = secPacket;
  updateGame();
  rAF(doUpdate);
  ms.avg = Math.round((ms.min + ms.max) / 2);
}

prepareMenuBackground();
doUpdate();

function toggleUseless(boolean) {
  getEl("instaType").disabled = boolean;
  getEl("antiBullType").disabled = boolean;
  getEl("predictType").disabled = boolean;
}
toggleUseless(useWasd);

window.debug = function () {
  my.waitHit = 0;
  my.autoAim = false;
  instaC.isTrue = false;
  traps.inTrap = false;
  itemSprites = [];
  objSprites = [];
  gameObjectSprites = [];
  skinSprites = [];
  skinPointers = [];
  skinSprites2 = [];
  skinPointers2 = [];
  accessSprites = [];
  toolSprites = [];
  projectileSprites = [];
  aiSprites = [];
  console.clear();
};

window.wasdMode = function () {
  useWasd = !useWasd;
  toggleUseless(useWasd);
};

window.startGrind = function () {
  if (getEl("weaponGrind").checked) {
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
      checkPlace(player.getItemType(22), i);
    }
  }
};

window.resBuild = function () {
  if (gameObjects.length) {
    gameObjects.forEach((tmp) => {
      tmp.breakObj = false;
    });
    breakObjects = [];
  }
};

window.toggleVisual = function () {
  config.anotherVisual = !config.anotherVisual;
  gameObjects.forEach((tmp) => {
    if (tmp.active) {
      tmp.dir = tmp.lastDir;
    }
  });
};

window.prepareUI = function (tmpObj) {
  resize();
  var chatBox = document.getElementById("chatBox");
  var chatHolder = document.getElementById("chatHolder");
  var suggestBox = document.createElement("div");
  suggestBox.id = "suggestBox";

  var prevChats = [];
  var prevChatsIndex = 0;

  function toggleChat() {
    if (!usingTouch) {
      if (chatHolder.style.display == "block") {
        if (chatBox.value) {
          sendChat(chatBox.value);
        }
        closeChat();
      } else {
        storeMenu.style.display = "none";
        allianceMenu.style.display = "none";
        chatHolder.style.display = "block";
        chatBox.focus();
        resetMoveDir();
      }
    } else {
      setTimeout(function () {
        var chatMessage = prompt("chat message");
        if (chatMessage) {
          sendChat(chatMessage);
        }
      }, 1);
    }
    chatBox.value = "";
    (() => {
      prevChatsIndex = 0;
    })();
  }

  function closeChat() {
    chatBox.value = "";
    chatHolder.style.display = "none";
  }

  for (let i = 0; i < items.list.length + items.weapons.length; ++i) {
    (function (i) {
      let tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = tmpCanvas.height = 66;
      let tmpContext = tmpCanvas.getContext("2d");
      tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
      tmpContext.imageSmoothingEnabled = false;
      tmpContext.webkitImageSmoothingEnabled = false;
      tmpContext.mozImageSmoothingEnabled = false;

      if (items.weapons[i]) {
        tmpContext.rotate(Math.PI / 4 + Math.PI);
        let tmpSprite = new Image();
        toolSprites[items.weapons[i].src] = tmpSprite;
        tmpSprite.onload = function () {
          this.isLoaded = true;
          let tmpPad = 1 / (this.height / this.width);
          let tmpMlt = items.weapons[i].iPad || 1;
          tmpContext.drawImage(
            this,
            -(tmpCanvas.width * tmpMlt * config.iconPad * tmpPad) / 2,
            -(tmpCanvas.height * tmpMlt * config.iconPad) / 2,
            tmpCanvas.width * tmpMlt * tmpPad * config.iconPad,
            tmpCanvas.height * tmpMlt * config.iconPad,
          );
          tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
          tmpContext.globalCompositeOperation = "source-atop";
          tmpContext.fillRect(
            -tmpCanvas.width / 2,
            -tmpCanvas.height / 2,
            tmpCanvas.width,
            tmpCanvas.height,
          );
          getEl("actionBarItem" + i).style.backgroundImage =
            "url(" + tmpCanvas.toDataURL() + ")";
        };
        tmpSprite.src = "./../img/weapons/" + items.weapons[i].src + ".png";
        let tmpUnit = getEl("actionBarItem" + i);
        tmpUnit.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.weapons[i], true);
        });
        tmpUnit.onclick = UTILS.checkTrusted(function () {
          selectWeapon(tmpObj.weapons[items.weapons[i].type]);
        });
        UTILS.hookTouchEvents(tmpUnit);
      } else {
        let tmpSprite = getItemSprite(
          items.list[i - items.weapons.length],
          true,
        );
        let tmpScale = Math.min(
          tmpCanvas.width - config.iconPadding,
          tmpSprite.width,
        );
        tmpContext.globalAlpha = 1;
        tmpContext.drawImage(
          tmpSprite,
          -tmpScale / 2,
          -tmpScale / 2,
          tmpScale,
          tmpScale,
        );
        tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
        tmpContext.globalCompositeOperation = "source-atop";
        tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
        getEl("actionBarItem" + i).style.backgroundImage =
          "url(" + tmpCanvas.toDataURL() + ")";
        let tmpUnit = getEl("actionBarItem" + i);
        tmpUnit.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.list[i - items.weapons.length]);
        });
        tmpUnit.onclick = UTILS.checkTrusted(function () {
          selectToBuild(
            tmpObj.items[tmpObj.getItemType(i - items.weapons.length)],
          );
        });
        UTILS.hookTouchEvents(tmpUnit);
      }
    })(i);
  }
};
