// ==UserScript==
// @name         X-X-Client Connector
// @description  Connect You To X-X Client
// @author       [GG]GAMER
// @match        *://*.moomoo.io/*
// @match        *://moomoo.io/*
// @run-at       document-start
// @version 0.0.1.20220815174407
// @namespace This script connect you to X-X-Client
// @downloadURL https://update.greasyfork.org/scripts/448990/X-X-Client%20Connector.user.js
// @updateURL https://update.greasyfork.org/scripts/448990/X-X-Client%20Connector.meta.js
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


/*
i made a new client side for moomoo,
this script connect you to the client i made!
*/

window.onload = function () {
    window.onbeforeunload = {}
    location.href = window.location.href.includes("sandbox") ? "https://x-x-client.glitch.me/" + location.search: confirm("This Script is Made for sandbox, click cancel to go sandbox") ? "https://x-x-client.glitch.me/nor" + location.search : "https://x-x-client.glitch.me/" + location.search
}
