// ==UserScript==
// @name Moomoo.io Force connect
// @author Murka
// @description Allows to connect to the full server
// @icon https://moomoo.io/img/favicon.png?v=1
// @version 0.2
// @match *://moomoo.io/*
// @match *://*.moomoo.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace https://greasyfork.org/users/919633
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
    Discord: https://discord.gg/sG9cyfGPj5
    Greasyfork: https://greasyfork.org/en/users/919633
    MooMooForge: https://github.com/MooMooForge
*/

(function() {
    "use strict";

    const log = console.log;
    function createHook(target, prop, callback) {
        const symbol = Symbol(prop);
        Object.defineProperty(target, prop, {
            get() {
                return this[symbol];
            },
            set(value) {
                callback(this, symbol, value);
            },
            configurable: true
        })
    }

    createHook(Object.prototype, "maxPlayers", function(that, symbol, value) {
        delete Object.prototype.maxPlayers;
        that.maxPlayers = value + 10;
    })

})();