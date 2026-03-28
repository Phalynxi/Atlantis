// ==UserScript==
// @name 🌙 Moonlight Client (MOOMOO.IO) 🌙
// @namespace http://tampermonkey.net/
// @version v1.4.3
// @description Moomoo.io Multibox Cheat (30+ bots) as well as Ultra Fast Autoheal
// @author freepentests
// @match *://*.moomoo.io/*
// @grant none
// @run-at document-start
// @require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js
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


let multiboxAlts = [];
const mousePosition = {x: 0, y: 0};
const upgradeOptions = {};
let placingSpikes = false;
let placingTraps = false;
let repellingAlts = false;
let automill = false;

const updateAltsCounter = () => {
 document.getElementById('altsCounter').innerText = String(multiboxAlts.length);
};

class PowSolver {
 constructor() { console.log('PowSolver initialized'); }
 createToken(json, solution) {
  return 'alt:' + btoa(JSON.stringify({algorithm: "SHA-256", challenge: json.challenge, number: solution, salt: json.salt, signature: json.signature || null, took: 15439}));
 }
 async getCaptcha() { const resp = await fetch('https://api.moomoo.io/verify'); return await resp.json(); }
 async hash(string) { const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(string)); return new Uint8Array(hash).toHex(); }
 async solveCaptcha(json) { for (let i = 0; i < json.maxnumber; i++) { if (await this.hash(json.salt + i) == json.challenge) return i; } }
 async generateAltchaToken() { const json = await this.getCaptcha(); const solution = await this.solveCaptcha(json); return this.createToken(json, solution); }
}

class Input {
 constructor(ws) { this.msgpack = msgpack; this.ws = ws; }
 sendMsg(data) { this.ws.send(this.msgpack.encode(data)); }
 sendChatMessage(message) { this.sendMsg(['6', [message]]); }
 useItem(id) { this.sendMsg(['z', [id, null]]); this.sendMsg(['F', [1, null]]); this.sendMsg(['F', [0, null]]); this.sendMsg(['z', [document.ws.player.entity.weapon, true]]); }
 healPlayer(currentHealth) { let timeout = currentHealth <= 60 ? 1 : 115; setTimeout(() => { this.useItem(0); this.useItem(1); }, timeout); }
 moveTowardsDirection(angle) { this.sendMsg(['9', [angle]]); }
 sendEnterWorld(name) { this.sendMsg(['M', [{name: name, moofoll: true, skin: 0}]]); }
 joinTribe(name) { this.sendMsg(['b', [name]]); }
 placeTrap() { return this.useItem(15); }
 placeBoost() { return this.useItem(16); }
 placeSpike(spikeType) { switch(spikeType) { case 'regular': this.useItem(6); break; case 'greater': this.useItem(7); break; case 'poison': this.useItem(8); break; case 'spinning': this.useItem(9); break; } }
}

class Player {
 constructor(ws) {
  this.ws = ws; this.input = new Input(this.ws); this.autoheal = true;
  this.entity = {id: null, health: 100, knownPlayers: [], position: {x: 0, y: 0}, aimingYaw: 0, object: -1, weapon: 0, clan: null, isLeader: 0, hat: 0, accessory: 0};
  this.fullyUpgraded = true;
  this.ws.addEventListener('message', this.handleMessage.bind(this));
 }
 handleMessage(msg) {
  const data = msgpack.decode(msg.data);
  switch(data[0]) {
   case 'C': this.entity.id = data[1][0]; break;
   case 'O': if (data[1][0] == this.entity.id) this.entity.health = data[1][1]; if (data[1][0] == this.entity.id && this.autoheal && data[1][1] < 100) this.input.healPlayer(this.entity.health); break;
   case 'a':
    this.entity.knownPlayers = [];
    var playerInfos = data[1][0];
    for (let j = 0; j < playerInfos.length; j += 13) {
     const playerInfo = playerInfos.slice(j, j + 13);
     if (playerInfo[0] == this.entity.id) {
      this.entity.position.x = playerInfo[1]; this.entity.position.y = playerInfo[2]; this.entity.aimingYaw = playerInfo[3];
      this.entity.object = playerInfo[4]; this.entity.weapon = playerInfo[5]; this.entity.clan = playerInfo[7];
      this.entity.isLeader = playerInfo[8]; this.entity.hat = playerInfo[9]; this.entity.accessory = playerInfo[10];
     } else {
      this.entity.knownPlayers.push({id: playerInfo[0], position: {x: playerInfo[1], y: playerInfo[2]}, aimingYaw: playerInfo[3], object: playerInfo[4], weapon: playerInfo[5], clan: playerInfo[7], isLeader: playerInfo[8], hat: playerInfo[9], accessory: playerInfo[10]});
     }
    }
    break;
   case 'U': this.upgradeAge = ((data[1][0] + data[1][1]) - data[1][0]); this.fullyUpgraded = data[1][0] == 0; break;
  }
 }
}

class Bot {
 constructor(name, serverUrl) {
  this.powSolver = new PowSolver(); this.name = name; this.age = 1;
  this.powSolver.generateAltchaToken().then((token) => {
   this.ws = new WebSocket(document.ws.url.split('?token=')[0] + '?token=' + token);
   this.ws.binaryType = 'arraybuffer'; this.ws.player = new Player(this.ws);
   this.ws.addEventListener('message', this.handleMessage.bind(this));
   setInterval(() => {
    this.ws.player.input.sendChatMessage('Moonlight Client! Age: ' + this.age);
    if (!this.ws.player.fullyUpgraded) { try { this.ws.player.input.sendMsg(['H', [upgradeOptions[this.ws.player.upgradeAge]]]); } catch(e) {} }
   }, 1000);
  });
 }
 handleMessage(msg) {
  const data = this.ws.player.input.msgpack.decode(msg.data);
  switch(data[0]) {
   case 'io-init':
    multiboxAlts.push(this.ws);
    this.ws.player.input.sendEnterWorld(this.name);
    setInterval(() => { this.ws.player.input.sendEnterWorld(this.name); this.ws.player.input.joinTribe(document.ws.player.entity.clan); }, 1000);
    updateAltsCounter(); break;
   case 'a':
    var mouseXWorld = (document.ws.player.entity.position.x - this.ws.player.entity.position.x) + (mousePosition.x - (window.innerWidth / 2)) * (1+(1/3));
    var mouseYWorld = (document.ws.player.entity.position.y - this.ws.player.entity.position.y) + (mousePosition.y - (window.innerHeight / 2)) * (1+(1/3));
    var dirToMove = Math.atan2(mouseYWorld, mouseXWorld);
    this.ws.player.input.sendMsg(['D', [dirToMove]]);
    this.ws.player.input.moveTowardsDirection(repellingAlts ? dirToMove - 2.35619 : dirToMove); break;
   case 'U': this.age = (data[1][0] + data[1][1]) - 1; break;
  }
 }
}

const init = () => {
 document.getElementById('promoImgHolder').remove();
 document.getElementsByClassName('adsbygoogle')[0]?.remove();
 document.getElementById('gameName').innerText = 'Moonlight';
 document.getElementById('gameName').style = 'color: #f00';
 document.getElementById('mainMenu').style = 'background-color: #000';
 document.getElementById('diedText').innerText = 'GET REVENGE';
 document.getElementById('diedText').style = 'color: #f00; background-color: #000;';
 const altCounter = document.createElement('h2');
 altCounter.style = 'text-align: center; font-size: 25px; position: fixed; top: 10px; left: 50%; transform: translateX(-50%);';
 altCounter.innerHTML = 'Alts: <span id="altsCounter">0</span>';
 document.getElementById('gameUI').appendChild(altCounter);
 document.getElementById('touch-controls-fullscreen').addEventListener('mousemove', (e) => { mousePosition.x = e.clientX; mousePosition.y = e.clientY; });
 const originalWebSocket = WebSocket;
 const wsInterceptor = {
  construct(target, args) {
   const ws = new originalWebSocket(...args); document.ws = ws; console.log('captured ws');
   window.WebSocket = originalWebSocket;
   document.ws.player = new Player(document.ws);
   window.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'l') new Bot('gg/VU8t67TBKs');
    if (e.key === ',') { multiboxAlts.forEach((sock) => sock.close()); multiboxAlts = []; updateAltsCounter(); }
    if (e.key === 'm') automill = !automill;
    if (e.key === 'v') placingSpikes = false;
    if (e.key === 'f') placingTraps = false;
    if (e.key === 'z') repellingAlts = false;
   });
   window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'f') placingTraps = true;
    if (e.key === 'v') placingSpikes = true;
    if (e.key === 'z') repellingAlts = true;
   });
   setInterval(() => {
    if (placingSpikes) {
     if (upgradeOptions[5] == 23) document.ws.player.input.placeSpike('greater');
     else document.ws.player.input.placeSpike('regular');
     if (upgradeOptions[9] == 24) document.ws.player.input.placeSpike('poison');
     if (upgradeOptions[9] == 25) document.ws.player.input.placeSpike('spinning');
    }
    if (placingTraps) document.ws.player.input.placeTrap();
    if (automill) document.ws.player.input.useItem(upgradeOptions[5] == 27 ? (upgradeOptions[8] == 28 ? 12 : 11) : 10);
   }, 50);
   let originalSend = document.ws.send.bind(document.ws);
   document.ws.send = (msg) => {
    if (['F', 'z', 'c'].includes(msgpack.decode(msg)[0])) multiboxAlts.forEach((sock) => sock.send(msg));
    if (msgpack.decode(msg)[0] === 'H') upgradeOptions[document.ws.player.upgradeAge] = msgpack.decode(msg)[1][0];
    originalSend(msg);
   };
   return ws;
  }
 };
 window.WebSocket = new Proxy(originalWebSocket, wsInterceptor);
};

setInterval(() => { if (document.getElementById('gameName')) { clearInterval(waitForGameName); return init(); } }, 100);
let waitForGameName;
