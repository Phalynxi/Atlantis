// ==UserScript==
// @name            ! Glotus Client Development
// @author          Murka
// @description     An excellent Moomoo.io hack for a comfortable gaming experience
// @icon            https://i.imgur.com/rlMQW2P.png
// @version         1.0
// @match           *://moomoo.io/
// @match           *://moomoo.io/?server*
// @match           *://*.moomoo.io/
// @match           *://*.moomoo.io/?server*
// @run-at          document-start
// @grant           none
// @license         MIT
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

/* jshint esversion:6 */

/*
    Author: Murka
    Github: https://github.com/Murka007
    Greasyfork: https://greasyfork.org/users/919633
    Discord: https://discord.gg/cPRFdcZkeD

    If you are not a developer, ignore this script.
    This script is intented to be used in development.
    In order to do so, first you need to install the whole repository
    to your computer and then run `bun start` command.

    After that, you can use this script to test some stuff.
*/

try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/dist", false);
    xhr.send();
    Function(xhr.responseText)();
} catch(err) {
    console.error("Glotus Client loading error..");
    console.error(err);
}