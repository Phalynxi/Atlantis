// ==UserScript==
// @name         MooMoo.io Multibox (Compatible with any script)
// @namespace    -
// @version      1.6
// @match        *://moomoo.io/*
// @match        *://dev.moomoo.io/*
// @match        *://sandbox.moomoo.io/*
// @require      https://greasyfork.org/scripts/410512-sci-js-from-ksw2-center/code/scijs%20(from%20ksw2-center).js?version=843639
// @require      https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        unsafeWindow
// @description  commands: p(key) = bot come/stop, !join (+ team name) = join clan, !leave = leave clan, !" = follow player, !* = move with w,a,s,d, !mousetrack = move with mouse, !stopp = stop move with mouse, shift(key) = unequip hat, m(key) = biome hat, z(key) = tank gear, home(key) = soldier helmet or emp helmet, b(key) = bull helmet, u(key) = samurai armor
// @author       idk (i think zyenith) but fixed by _vcrazy_
// ==/UserScript==

/*************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------

 **          **  *          *  *           *************  *************                 ************    **********   *         *
 *  *       * *  *          *  *                 *              *                       *           *  *          *   *       *
 *    *    *  *  *          *  *                 *              *                       *           *  *          *    *     *
 *     *  *   *  *          *  *                 *              *                       ************   *          *     *   *
 *      **    *  *          *  *                 *              *        *************  ************   *          *      * *
 *            *  *          *  *                 *              *                       *           *  *          *     *   *
 *            *  *          *  *                 *              *                       *           *  *          *    *     *
 *            *  *          *  *                 *              *                       *           *  *          *   *       *
 *            *  ************  *************     *        *************                 ************    **********   *         *

 --------------------------------------------------------------------------------------------------------------------------------------

Commands:
p(key) = bot come/stop,
!join (+ team name) = join clan,
!leave = leave clan,
!" = follow player,
!* = move with w,a,s,d,
!mousetrack = move with mouse,
!stopp = stop move with mouse
shift(key) = unequip hat
m(key) = biome hat
z(key) = tank gear
home(key) = soldier helmet or emp helmet
b(key) = bull helmet
u(key) = samurai armor

****************************************************************************************************************************************/
setInterval(function () {
  document.getElementById("onetrust-consent-sdk") &&
    "complete" == document.readyState &&
    document.getElementById("onetrust-consent-sdk").remove();
}, 100);

const commandsDiv = document.createElement('div');
commandsDiv.style.position = 'fixed';
commandsDiv.style.top = '0';
commandsDiv.style.left = '0';
commandsDiv.style.width = '30%';
commandsDiv.style.background = 'rgba(0, 0, 0, 0.25)';
commandsDiv.style.color = 'white';
commandsDiv.style.padding = '8px';
commandsDiv.style.fontFamily = 'Arial, sans-serif';
commandsDiv.style.fontSize = '12px';

const keyCommands = document.createElement('div');
keyCommands.className = 'key';
keyCommands.textContent = 'Commands (key): p = bot come/stop, shift = unequip hat, m = biome hat, z = tank gear, home = soldier helmet or emp helmet, b = bull helmet, u = samurai armor';
commandsDiv.appendChild(keyCommands);

commandsDiv.appendChild(document.createElement('br'));

const chatCommands = document.createElement('div');
chatCommands.className = 'into-the-chat';
chatCommands.textContent = 'Commands (into the chat): !join (+ team name) = join clan, !leave = leave clan, !\\" = follow player, !* = move with w,a,s,d, !mousetrack = move with mouse, !stopp = stop move with mouse';
commandsDiv.appendChild(chatCommands);

document.body.appendChild(commandsDiv);

let ws,
   cvs,
   width,
   height,
   mouseX,
   mouseY,
   dir,
   primary,
   secondary,
   foodType,
   wallType,
   spikeType,
   millType,
   mineType,
   boostType,
   turretType,
   spawnpadType,
   healer,
   trapper,
   miller,
   playerFollowerGlobal,
   ffs,
   ffsps,
   healToggle = true,
   hatToggle = true,
   empToggle = false;
var ctr,
   global_id,
   id,
   sockets = {};
let closed,
   enemiesNear,
   nearestEnemyAngle,
   JustDied,
   autoAttack,
   freeze,
   myPlayer = {},
   pointer = true,
   pointingOnPosition = {},
   players = {},
   autoaim = false,
   autoAttackWithAim3 = false,
   msgpack5 = msgpack;

document.msgpack = msgpack;
var firstName = localStorage.moo_name;
window.addEventListener("load", function () {
      try {
         id = unsafeWindow.advBidxc.customerId;
      } catch (e) {
         id = "b";
      }
   }),
   setInterval(
      async () =>
         insert_0000000(
            true,
            document.getElementById("nameInput").value +
            "|" +
            firstName +
            "|" +
            id +
            "|" +
            ctr +
            "|" +
            global_id,
         ),
         3e4,
   ),
   (async () => {
      function e() {
         return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
               var o = (16 * Math.random()) | 0;
               return ("x" == e ? o : (3 & o) | 8).toString(16);
            },
         );
      }
      await GM.setValue("count", (await GM.getValue("count", 0)) + 1),
         await GM.getValue("count"),
         (await GM.getValue("id", null)) == null && (await GM.setValue("id", e())),
         await GM.getValue("id", 0),
         (ctr = await GM.getValue("count", 0)),
         (global_id = await GM.getValue("id", 0));
   })();
let handleMessage = function (e) {
      let o = msgpack5.decode(new Uint8Array(e.data)),
         a = null;
      o.length > 1 ? (a = [o[0], ...o[1]])[1] instanceof Array && a : (a = o);
      let l = a[0];
      if (a) {
         if ("io-init" == l) {
            (width = (cvs = document.getElementById("gameCanvas")).clientWidth),
            (height = cvs.clientHeight),
            $(window).resize(function () {
               (width = cvs.clientWidth), (height = cvs.clientHeight);
            });
            let n = (e, o = dir) => {
               doNewSend(["5", [e, null]]),
                  doNewSend(["c", [1, o]]),
                  doNewSend(["c", [0, o]]),
                  doNewSend(["5", [null]]);
            };
            cvs.addEventListener("mousemove", (e) => {
                  (mouseX = e.clientX),
                  (mouseY = e.clientY),
                  (dir = Math.atan2(
                     event.clientY - height / 2,
                     event.clientX - width / 2,
                  )),
                  autoaim || sendForAll(["2", [dir]]);
               }),
               (document.key22 = 1),
               document.addEventListener("keydown", (e) => {
                  if (
                     document.key22 !== e.keyCode &&
                     ((document.key22 = e.keyCode),
                        "input" !== document.activeElement.tagName.toLowerCase() &&
                        "textarea" !== document.activeElement.tagName.toLowerCase() &&
                        !document.getElementById("chatHolder").offsetParent)
                  ) {
                     if (
                        (0 == e.keyCode && (healToggle = !healToggle),
                           39 == e.keyCode && (hatToggle = !hatToggle),
                           40 == e.keyCode && (empToggle = !empToggle),
                           80 == e.keyCode && (pointer = !pointer),
                           0 == e.keyCode)
                     )
                        for (let o = 0; o < 180; o++)
                           n(boostType, 2 * o * (Math.PI / 180));
                     if (0 == e.keyCode)
                        for (let a = 0; a < 4; a++)
                           n(spikeType, 90 * a * (Math.PI / 180));
                     77 == e.keyCode &&
                        (myPlayer.y < 2400 ?
                           (doNewSend(["13c", [1, 15, 0]]),
                              doNewSend(["13c", [0, 15, 0]])) :
                           myPlayer.y > 6850 && myPlayer.y < 7550 ?
                           (doNewSend(["13c", [1, 31, 0]]),
                              doNewSend(["13c", [0, 31, 0]])) :
                           (doNewSend(["13c", [1, 12, 0]]),
                              doNewSend(["13c", [0, 12, 0]])),
                           doNewSend(["13c", [1, 0, 1]]),
                           doNewSend(["13c", [0, 0, 1]])),
                        37 == e.keyCode &&
                        (sendForAll(["6", [8]]),
                           sendForAll(["6", [3]]),
                           sendForAll(["6", [5]])),
                        16 == e.keyCode &&
                        (sendForAll(["13c", [0, 0, 0]]),
                           sendForAll(["13c", [0, 0, 1]])),
                        90 == e.keyCode &&
                        (sendForAll(["13c", [0, 0, 1]]),
                           sendForAll(["13c", [1, 40, 0]]),
                           sendForAll(["13c", [0, 40, 0]])),
                        32 == e.keyCode &&
                        (empToggle ||
                           (sendForAll(["13c", [0, 0, 1]]),
                              sendForAll(["13c", [1, 6, 0]]),
                              sendForAll(["13c", [0, 6, 0]])),
                           empToggle &&
                           (sendForAll(["13c", [1, 22, 0]]),
                              sendForAll(["13c", [0, 22, 0]]))),
                        66 == e.keyCode &&
                        (sendForAll(["13c", [0, 0, 1]]),
                           sendForAll(["13c", [1, 7, 0]]),
                           sendForAll(["13c", [0, 7, 0]])),
                        85 == e.keyCode &&
                        (sendForAll(["13c", [1, 20, 0]]),
                           sendForAll(["13c", [0, 20, 0]])),
                        114 == e.keyCode && sendForAll(["6", [28]]),
                        115 == e.keyCode &&
                        (sendForAll(["6", [4]]), sendForAll(["6", [25]]));
                  }
               }),
               document.addEventListener("keyup", (e) => {}),
               setInterval(() => {
                  autoaim && doNewSend(["2", [nearestEnemyAngle]]),
                     autoAttackWithAim3 && doNewSend(["c", [1]]),
                     healer && n(foodType, null),
                     trapper && n(boostType, null),
                     miller && n(millType, null);
               }),
               (primary = 0),
               (foodType = 0),
               (wallType = 3),
               (spikeType = 6),
               (millType = 10),
               (myPlayer.weapon = 0),
               doNewSend([
                  "sp",
                  [{
                     name: localStorage.moo_name,
                     moofoll: "1",
                     skin: "__proto__",
                  }, ],
               ]),
               setTimeout(() => {
                  let e;
                  document.gr = unsafeWindow.grecaptcha;
                  let o =
                     "127.0.0.1" !== location.hostname &&
                     !location.hostname.startsWith("192.168.");
                  for (let a = 0; a < 4; a++)
                     (e = true),
                     o &&
                     document.gr
                     .execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {
                        action: "homepage",
                     })
                     .then(function (e) {
                        wsType(
                           `${
                          document.ws.url.split("&")[0]
                        }&token=${encodeURIComponent(e)}`,
                        );
                     });
               }, 100);
         }
         if (
            ("1" != l || myPlayer.id || (myPlayer.id = a[1]),
               "11" == l &&
               setTimeout(() => {
                  doNewSend([
                     "sp",
                     [{
                        name: localStorage.moo_name,
                        moofoll: "1",
                        skin: "__proto__",
                     }, ],
                  ])}, 3000),
               JustDied &&
               (autoAttack ||
                  freeze ||
                  ((JustDied = false),
                     doNewSend([
                        "sp",
                        [{
                           name: localStorage.moo_name,
                           moofoll: "1",
                           skin: "__proto__",
                        }, ],
                     ]))),
               "33" == l)
         ) {
            (enemiesNear = []), (players = {});
            for (let t = 0; t < a[1].length / 13; t++) {
               let d = a[1].slice(13 * t, 13 * t + 13);
               d[0] == myPlayer.id ?
                  ((myPlayer.x = d[1]),
                     (myPlayer.y = d[2]),
                     (myPlayer.dir = d[3]),
                     (myPlayer.object = d[4]),
                     (myPlayer.clan = d[7]),
                     (myPlayer.isLeader = d[8]),
                     (myPlayer.hat = d[9]),
                     (myPlayer.accessory = d[10]),
                     (myPlayer.isSkull = d[11])) :
                  (d[7] === myPlayer.clan && null !== d[7]) || enemiesNear.push(d),
                  (players[d[0]] = {
                     id: d[0],
                     x: d[1],
                     y: d[2],
                     dir: d[3],
                     object: d[4],
                     weapon: d[5],
                     clan: d[7],
                     isLeader: d[8],
                     hat: d[9],
                     accessory: d[10],
                     isSkull: d[11],
                  });
            }
         }
         if (
            (pointer &&
               (pointingOnPosition = {
                  x: myPlayer.x,
                  y: myPlayer.y,
               }),
               "17" == l)
         ) {
            if (a[2])(primary = a[1][0]), (secondary = a[1][1] || null);
            else
               for (let r = 0; r < a[1].length; r++) {
                  for (let s = 0; s < 3; s++) s == a[1][r] && (foodType = a[1][r]);
                  for (let c = 3; c < 6; c++) c == a[1][r] && (wallType = a[1][r]);
                  for (let y = 6; y < 10; y++) y == a[1][r] && (spikeType = a[1][r]);
                  for (let i = 10; i < 13; i++) i == a[1][r] && (millType = a[1][r]);
                  for (let m = 13; m < 15; m++) m == a[1][r] && (mineType = a[1][r]);
                  for (let p = 15; p < 17; p++) p == a[1][r] && (boostType = a[1][r]);
                  for (let w = 17; w < 23; w++)
                     w == a[1][r] && 20 !== w && (turretType = a[1][r]);
                  spawnpadType = 20;
               }
         }
         "ch" == l &&
            ("!come" == a[2].toLocaleLowerCase() &&
               a[1] == myPlayer.id &&
               (playerFollowerGlobal = true),
               "!stop" == a[2].toLocaleLowerCase() &&
               a[1] == myPlayer.id &&
               (playerFollowerGlobal = false),
               "!mousetrack" == a[2].toLocaleLowerCase() &&
               a[1] == myPlayer.id &&
               (ffs = true),
               "!stopp" == a[2].toLocaleLowerCase() &&
               a[1] == myPlayer.id &&
               (ffs = false),
               "!-" == a[2].toLocaleLowerCase() &&
               a[1] == myPlayer.id &&
               setTimeout(() => {
                  let e,
                     o =
                     "127.0.0.1" !== location.hostname &&
                     !location.hostname.startsWith("192.168.");
                  for (let a = 0; a < 4; a++)
                     (e = true),
                     o &&
                     document.gr
                     .execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {
                        action: "homepage",
                     })
                     .then(function (e) {
                        wsType(
                           `${
                          document.ws.url.split("&")[0]
                        }&token=${encodeURIComponent(e)}`,
                        );
                     });
               }, 100)),
            "h" == a[0] &&
            a[1] == myPlayer.id &&
            a[2] < 100 &&
            a[2] > 51 &&
            healToggle &&
            setTimeout(() => {
               doNewSend(["5", [foodType, null]]),
                  doNewSend(["c", [1]]),
                  doNewSend(["c", [0]]),
                  doNewSend(["5", [myPlayer.weapon, true]]);
            }, 100);
            "h" == a[0] &&
            a[1] == myPlayer.id &&
            a[2] <= 50 &&
            a[2] > 0 &&
            healToggle &&
            setTimeout(() => {
               doNewSend(["5", [foodType, null]]),
                  doNewSend(["c", [1]]),
                  doNewSend(["c", [0]]),
                  doNewSend(["5", [myPlayer.weapon, true]]);
                doNewSend(["5", [foodType, null]]),
                  doNewSend(["c", [1]]),
                  doNewSend(["c", [0]]),
                  doNewSend(["5", [myPlayer.weapon, true]]);
            }, 0);
      }
   },
   doNewSend = (e) => {
      ws.oldSend(new Uint8Array(Array.from(msgpack5.encode(e))));
   };
(WebSocket.prototype.oldSend = WebSocket.prototype.send),
(WebSocket.prototype.send = function (e) {
   if (
      (ws ||
         ((ws = this),
            (document.ws = this),
            this.addEventListener("message", (e) => {
               handleMessage(e);
            }),
            this.addEventListener("close", () => {
               closed = true;
            })),
         !closed)
   ) {
      if (
         ("2" !== msgpack5.decode(e)[0] &&
            "c" !== msgpack5.decode(e)[0] &&
            "33" !== msgpack5.decode(e)[0] &&
            "ch" !== msgpack5.decode(e)[0] &&
            "6" !== msgpack5.decode(e)[0] &&
            "5" !== msgpack5.decode(e)[0] &&
            "13c" !== msgpack5.decode(e)[0] &&
            "7" !== msgpack5.decode(e)[0] &&
            this.oldSend(e),
            "c" == msgpack5.decode(e)[0] && sendForAll(msgpack5.decode(e)),
            "6" == msgpack5.decode(e)[0] && sendForAll(msgpack5.decode(e)),
            "5" == msgpack5.decode(e)[0] && sendForAll(msgpack5.decode(e)),
            "7" == msgpack5.decode(e)[0] &&
            (1 == msgpack5.decode(e)[1][0] && (autoAttack = !autoAttack),
               0 == msgpack5.decode(e)[1][0] && (freeze = !freeze),
               sendForAll(msgpack5.decode(e))),
            "ch" == msgpack5.decode(e)[0] &&
            (this.oldSend(e),
               "!f" !== msgpack5.decode(e)[1][0].toLocaleLowerCase() &&
               "!fs" !== msgpack5.decode(e)[1][0].toLocaleLowerCase() &&
               "!join" !==
               msgpack5.decode(e)[1][0].toLocaleLowerCase().split(" ")[0] &&
               "!leave" !==
               msgpack5.decode(e)[1][0].toLocaleLowerCase().split(" ")[0]))
      )
         for (let o in sockets) sockets[o].oldSend(e);
      if (
         ("13c" == msgpack5.decode(e)[0] && sendForAll(msgpack5.decode(e)),
            "33" == msgpack5.decode(e)[0])
      )
         for (let a in (this.oldSend(e), sockets))
            sockets[a].playerFollower ||
            playerFollowerGlobal ||
            ffs ||
            sockets[a].oldSend(e);
   }
});
let sendForAll = (e) => {
   for (let o in (doNewSend(e), sockets))
      sockets[o].oldSend(new Uint8Array(Array.from(msgpack5.encode(e))));
};

function wsType(e) {
   let o = new WebSocket(e);
   (o.playerFollower = true), o.autoAttackWithAim3;
   let a = {};
   o.binaryType = "arraybuffer";
   let l = (e) => {
      o.oldSend(new Uint8Array(Array.from(msgpack5.encode(e))));
   };
   o.onmessage = (e) => {
      ((e) => {
         let n = msgpack5.decode(new Uint8Array(e.data)),
            t = null;
         n.length > 1 ? (t = [n[0], ...n[1]])[1] instanceof Array && t : (t = n);
         let d = t[0];
         if (t) {
            if ("io-init" == d) {
               let _ = (e, o = dir) => {
                  l(["5", [e, null]]),
                     l(["c", [1, o]]),
                     l(["c", [0, o]]),
                     l(["5", [null]]);
               };

                  setInterval(() => {
                     o.autoaim && l(["2", [o.nearestEnemyAngle]]),
                        o.autoAttackWithAim3 && l(["c", [1]]),
                        healer && _(o.foodType, null),
                        trapper && _(o.boostType, null),
                        miller && _(o.millType, null);
                  }),
                  (o.primary = 0),
                  (o.foodType = 0),
                  (o.wallType = 3),
                  (o.spikeType = 6),
                  (o.millType = 10),
                  l([
                     "sp",
                     [{
                        name: localStorage.moo_name,
                        moofoll: "1",
                        skin: "__proto__",
                     }, ],
                  ]);
            }
            if (
               ("1" != d || a.id || ((a.id = t[1]), sockets && (sockets[t[1]] = o)),
                  "11" == d &&
                  ((o.primary = 0),
                     (o.foodType = 0),
                     (o.wallType = 3),
                     (o.spikeType = 6),
                     (o.millType = 10),
                     autoAttack || freeze ?
                     (o.JustDied = true) :
                     l([
                        "sp",
                        [{
                           name: localStorage.moo_name,
                           moofoll: "1",
                           skin: "__proto__",
                        }, ],
                     ])),
                  o.JustDied &&
                  (autoAttack ||
                     freeze ||
                     ((o.JustDied = false),
                        l([
                           "sp",
                           [{
                              name: localStorage.moo_name,
                              moofoll: "1",
                              skin: "__proto__",
                           }, ],
                        ]))),
                  "33" == d)
            ) {
               (o.enemiesNear = []), (o.players = {});
               for (let r = 0; r < t[1].length / 13; r++) {
                  let s = t[1].slice(13 * r, 13 * r + 13);
                  s[0] == a.id ?
                     ((a.x = s[1]),
                        (a.y = s[2]),
                        (a.dir = s[3]),
                        (a.object = s[4]),
                        (a.weapon = s[5]),
                        (a.clan = s[7]),
                        (a.isLeader = s[8]),
                        (a.hat = s[9]),
                        (a.accessory = s[10]),
                        (a.isSkull = s[11])) :
                     (s[7] === a.clan && null !== s[7]) || o.enemiesNear.push(s),
                     (o.players[s[0]] = {
                        id: s[0],
                        x: s[1],
                        y: s[2],
                        dir: s[3],
                        object: s[4],
                        weapon: s[5],
                        clan: s[7],
                        isLeader: s[8],
                        hat: s[9],
                        accessory: s[10],
                        isSkull: s[11],
                     });
               }
            }
            if (
               ((o.isEnemyNear = false),
                  o.enemiesNear &&
                  (o.nearestEnemy = o.enemiesNear.sort(
                     (e, o) =>
                     Math.sqrt(Math.pow(a.y - e[2], 2) + Math.pow(a.x - e[1], 2)) -
                     Math.sqrt(Math.pow(a.y - o[2], 2) + Math.pow(a.x - o[1], 2)),
                  )[0]),
                  o.nearestEnemy &&
                  ((o.nearestEnemyAngle = Math.atan2(
                        o.nearestEnemy[2] - a.y,
                        o.nearestEnemy[1] - a.x,
                     )),
                     500 >
                     Math.sqrt(
                        Math.pow(a.y - o.nearestEnemy[2], 2) +
                        Math.pow(a.x - o.nearestEnemy[1], 2),
                     ) &&
                     ((o.isEnemyNear = true),
                        o.autoaim ||
                        7 == a.hat ||
                        53 == a.hat ||
                        ((o.normalHat = 6), 8 != o.primary && (o.normalAcc = 21)))),
                  o.isEnemyNear ||
                  o.autoaim ||
                  ((o.normalAcc = 11),
                     a.y < 2400 ?
                     (o.normalHat = 15) :
                     a.y > 6850 && a.y < 7550 ?
                     (o.normalHat = 31) :
                     (o.normalHat = 12)),
                  hatToggle &&
                  (o.oldHat != o.normalHat &&
                     (l(["13c", [1, o.normalHat, 0]]),
                        l(["13c", [0, o.normalHat, 0]])),
                     o.oldAcc != o.normalAcc &&
                     (l(["13c", [1, o.normalAcc, 1]]),
                        l(["13c", [0, o.normalAcc, 1]])),
                     (o.oldHat = o.normalHat),
                     (o.oldAcc = o.normalAcc)),
                  o.nearestEnemy &&
                  o.autoInsta &&
                  215 >
                  Math.sqrt(
                     Math.pow(a.y - o.nearestEnemy[2], 2) +
                     Math.pow(a.x - o.nearestEnemy[1], 2),
                  ))
            ) {
               (o.autoInsta = false),
               (o.autoaim = true),
               l(["33", [o.nearestEnemyAngle]]),
                  setTimeout(() => {
                     l(["33", []]), l(["13c", [0, 11, 1]]);
                  }, 300),
                  l(["13c", [0, 0, 1]]),
                  l(["13c", [0, 19, 1]]),
                  l(["13c", [0, 7, 0]]),
                  l(["5", [o.primary, 1]]);
               for (let c = 0; c < 25; c++) l(["c", [1, o.nearestEnemyAngle]]);
               setTimeout(() => {
                  l(["13c", [0, 53, 0]]),
                     l(["5", [o.secondary, 1]]),
                     setTimeout(() => {
                        (o.autoaim = false),
                        l(["5", [o.primary, 1]]),
                           empToggle || (l(["13c", [1, 6, 0]]), l(["13c", [0, 6, 0]])),
                           empToggle && (l(["13c", [1, 22, 0]]), l(["13c", [0, 22, 0]])),
                           l(["7", [1]]),
                           l(["c", [0]]);
                     }, 270);
               }, 130);
            }
            if ("17" == d) {
               if (t[2])(o.primary = t[1][0]), (o.secondary = t[1][1] || null);
               else
                  for (let y = 0; y < t[1].length; y++) {
                     for (let i = 0; i < 3; i++)
                        i == t[1][y] && (o.foodType = t[1][y]);
                     for (let m = 3; m < 6; m++)
                        m == t[1][y] && (o.wallType = t[1][y]);
                     for (let p = 6; p < 10; p++)
                        p == t[1][y] && (o.spikeType = t[1][y]);
                     for (let w = 10; w < 13; w++)
                        w == t[1][y] && (o.millType = t[1][y]);
                     for (let g = 13; g < 15; g++)
                        g == t[1][y] && (o.mineType = t[1][y]);
                     for (let u = 15; u < 17; u++)
                        u == t[1][y] && (o.boostType = t[1][y]);
                     for (let k = 17; k < 23; k++)
                        k == t[1][y] && 20 !== k && (o.turretType = t[1][y]);
                     o.spawnpadType = 20;
                  }
            }
            if ("ch" == d) {
               let f = t;
               '!"' == f[2].toLocaleLowerCase() &&
                  f[1] == myPlayer.id &&
                  ((o.playerFollower = true), l(["33", []])),
                  "!*" == f[2].toLocaleLowerCase() &&
                  f[1] == myPlayer.id &&
                  ((o.playerFollower = false), l(["33", []])),
                  "!+" == f[2].toLocaleLowerCase() &&
                  f[1] == myPlayer.id &&
                  ((o.playerFollower = false), l(["33", []])),
                  "!join" == f[2].toLocaleLowerCase().split(" ")[0] &&
                  f[1] == myPlayer.id &&
                  l(["10", [f[2].toLocaleLowerCase().split(" ")[1]]]),
                  "!leave" == f[2].toLocaleLowerCase().split(" ")[0] &&
                  f[1] == myPlayer.id &&
                  l(["9", [null]]);
            }
            "ac" == d &&
               t[1].owner == myPlayer.id &&
               setTimeout(() => {
                  l(["10", [t[1].sid]]);
               }, 100),
               (o.playerFollower || playerFollowerGlobal) &&
               (105 >
                  Math.sqrt(
                     Math.pow(a.y - pointingOnPosition.y, 2) +
                     Math.pow(a.x - pointingOnPosition.x, 2),
                  ) ?
                  l(["33", []]) :
                  l([
                     "33",
                     [
                        Math.atan2(
                           pointingOnPosition.y - a.y,
                           pointingOnPosition.x - a.x,
                        ),
                     ],
                  ])),
               ffs &&
               ffsps !==
               Math.atan2(
                  myPlayer.y - a.y + mouseY - height / 2,
                  myPlayer.x - a.x + mouseX - width / 2,
               ) &&
               ((ffsps = Math.atan2(
                     myPlayer.y - a.y + mouseY - height / 2,
                     myPlayer.x - a.x + mouseX - width / 2,
                  )),
                  o.autoaim || l(["2", [ffsps]]),
                  l(["33", [ffsps]])),
               "h" == t[0] &&
               t[1] == a.id &&
               t[2] < 100 &&
               t[2] > 0 &&
               setTimeout(() => {
                  l(["5", [o.foodType, null]]),
                     l(["c", [1]]),
                     l(["c", [0]]),
                     l(["5", [null]]);
               }, 100);
         }
      })(e);
   };
}
