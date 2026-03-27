// ==UserScript==
// @name         💀 DMG POT v4
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Real damage tracking via canvas hook + WebSocket interception + msgpack decoding
// @author       wat (leaked by william delilah)
// @match        *://*.moomoo.io/*
// @grant        none
// @license      MIT
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/568680/%F0%9F%92%80%20DMG%20POT%20v4.user.js
// @updateURL https://update.greasyfork.org/scripts/568680/%F0%9F%92%80%20DMG%20POT%20v4.meta.js
// ==/UserScript==

/**
 * HOW IT WORKS (3 simultaneous hooks installed at document-start):
 *
 * ① Canvas Hook
 *    Wraps CanvasRenderingContext2D.prototype.fillText before ANY game code runs.
 *    Every integer the game paints to canvas is checked — if it matches a known
 *    damage color and is in the valid damage range, it's counted.
 *    Deduplication (60 ms window) collapses multiple draw passes of the same hit.
 *
 * ② WebSocket Hook
 *    Wraps the WebSocket constructor so every socket is intercepted.
 *    Outgoing packets → detects which item slot is being attacked with.
 *    Incoming packets → decodes player item loadout (maps slot → weapon name).
 *    Kill packets → marks the last hit as a kill.
 *    All binary packets are decoded with the built-in msgpack decoder.
 *
 * ③ Keyboard Hook
 *    Tracks which slot key (1–8) was last pressed so hits get the right weapon name.
 *
 * CALIBRATION — damage not registering?
 *    1. Press L to open the panel.
 *    2. Click the "DEBUG" button (or run window.dmgpot.debug(true) in console).
 *    3. Deal damage in-game.
 *    4. Check the browser console for lines like:
 *         [DMG POT] fillText "35"  color="#ff4f4f"  match=false
 *    5. Copy the color value and paste:
 *         window.dmgpot.addColor('#ff4f4f')
 *    6. Disable debug mode again.
 */

;(function () {
'use strict';

// ═══════════════════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════════════════
const CFG = {
    toggleKey : 'l',
    dmgMin    : 1,
    dmgMax    : 3000,
    dedupeMs  : 60,
    floaters  : true,
    debug     : false,

    // Every color moomoo.io is known to use for damage numbers.
    // Stored as a Set for O(1) lookup. Add more via window.dmgpot.addColor().
    dmgColors : new Set([
        '#ff0000','#ff1111','#ff2222','#ff3333','#ff4444','#ff5555',
        '#ee0000','#dd0000','#cc0000','#bb0000',
        '#ff3030','#ff4040','#ff4f4f','#ee4040','#ee3030',
        '#ff6060','#ff7070',
        'rgb(255,0,0)','rgb(255,17,17)','rgb(255,34,34)','rgb(255,49,49)',
        'rgb(255,64,64)','rgb(255,79,79)','rgb(238,68,68)','rgb(204,0,0)',
        'rgb(255,112,112)',
        // Orange/yellow (crits / specials)
        '#ff8800','#ff9900','#ffaa00','#ffbb00','#ffcc00','#ffdd00',
        'rgb(255,136,0)','rgb(255,187,0)','rgb(255,204,0)',
        // White (damage on dark elements)
        '#ffffff','rgb(255,255,255)',
        // Poison / purple
        '#aa00ff','#9900cc','#8800bb','rgb(153,0,204)','rgb(136,0,187)',
    ]),
};

// ═══════════════════════════════════════════════════════════════════════
//  MOOMOO.IO ITEM MAP  id → { name, icon, color }
// ═══════════════════════════════════════════════════════════════════════
const ITEMS = {
    0  : { name:'Tool Hammer',       icon:'🔧', color:'#d35400' },
    1  : { name:'Hand Axe',          icon:'🪓', color:'#27ae60' },
    2  : { name:'Short Sword',       icon:'🗡️',  color:'#f1c40f' },
    3  : { name:'Katana',            icon:'⚔️',  color:'#e74c3c' },
    4  : { name:'Polearm',           icon:'🔱', color:'#c0392b' },
    5  : { name:'Bat',               icon:'🏏', color:'#e67e22' },
    6  : { name:'Daggers',           icon:'🔪', color:'#3498db' },
    7  : { name:'Great Hammer',      icon:'🔨', color:'#7b241c' },
    8  : { name:'Crossbow',          icon:'🏹', color:'#2ecc71' },
    9  : { name:'Hunting Bow',       icon:'🎯', color:'#16a085' },
    10 : { name:'Great Axe',         icon:'🪓', color:'#9b59b6' },
    11 : { name:'Stick',             icon:'🪵', color:'#7f8c8d' },
    12 : { name:'Mc Grabby',         icon:'🦾', color:'#f39c12' },
    13 : { name:'Musket',            icon:'🔫', color:'#1abc9c' },
    14 : { name:'Repeater Crossbow', icon:'🎯', color:'#e67e22' },
    15 : { name:'Spikes',            icon:'📌', color:'#c0392b' },
    16 : { name:'Greater Spikes',    icon:'🔺', color:'#7b241c' },
    17 : { name:'Spinning Spikes',   icon:'🌀', color:'#6c3483' },
    18 : { name:'Poison Spikes',     icon:'☠️',  color:'#1e8449' },
    26 : { name:'Stone Shield',      icon:'🛡️',  color:'#7f8c8d' },
};

// ═══════════════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════════════
const S = {
    weapons      : {},   // name → { name,icon,color,damage,hits,kills }
    slots        : [],   // slot index → item ID
    currentSlot  : 0,
    sessionStart : Date.now(),
    totalDmg     : 0,
    totalHits    : 0,
    totalKills   : 0,
    history      : [],
    lastHit      : { t: 0, v: 0 },
    uiVisible    : false,
    tab          : 'weapons',
    sort         : 'dmg',
    debugMode    : CFG.debug,
    myPlayerId   : null,
};

function curWeapon() {
    const id = S.slots[S.currentSlot];
    if (id != null && ITEMS[id]) return ITEMS[id];
    return { name: `Slot ${S.currentSlot + 1}`, icon: '❓', color: '#8899bb' };
}

function addDmg(weapon, amount, isKill = false) {
    const n = weapon.name;
    if (!S.weapons[n]) S.weapons[n] = { ...weapon, damage: 0, hits: 0, kills: 0 };
    S.weapons[n].damage += amount;
    S.weapons[n].hits++;
    if (isKill) { S.weapons[n].kills++; S.totalKills++; }
    S.totalDmg  += amount;
    S.totalHits++;

    S.history.unshift({ t: (Date.now() - S.sessionStart) / 1000, weapon: n, amount, isKill });
    if (S.history.length > 100) S.history.pop();

    refreshStats();
    refreshWeaponRow(n);
    pushHistoryEntry(S.history[0]);
    if (CFG.floaters && S.uiVisible) spawnFloat(amount, isKill);
}

function resetSession() {
    Object.keys(S.weapons).forEach(k => delete S.weapons[k]);
    S.totalDmg = S.totalHits = S.totalKills = 0;
    S.sessionStart = Date.now();
    S.history.length = 0;
    const h = document.getElementById('dp-hist');
    if (h) h.innerHTML = '';
    renderWeapons();
    refreshStats();
}

// ═══════════════════════════════════════════════════════════════════════
//  ① CANVAS HOOK — installed immediately (document-start)
// ═══════════════════════════════════════════════════════════════════════
;(function installCanvasHook() {
    const _fillText = CanvasRenderingContext2D.prototype.fillText;

    CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
        tryCaptureHit(this, text);
        return maxWidth !== undefined
            ? _fillText.call(this, text, x, y, maxWidth)
            : _fillText.call(this, text, x, y);
    };

    function tryCaptureHit(ctx, text) {
        const str = String(text).trim();
        if (!/^\d{1,4}$/.test(str)) return;           // must be 1-4 digit integer
        const num = parseInt(str, 10);
        if (num < CFG.dmgMin || num > CFG.dmgMax) return;

        // Deduplicate — same value within dedupeMs = same hit rendered twice
        const now = performance.now();
        if (now - S.lastHit.t < CFG.dedupeMs && S.lastHit.v === num) return;
        S.lastHit = { t: now, v: num };

        const cs = normColor(ctx.fillStyle);
        const match = CFG.dmgColors.has(cs);

        if (S.debugMode) {
            console.log(`[DMG POT] fillText "${str}"  color="${cs}"  match=${match}  font="${ctx.font}"`);
        }

        if (!match) return;
        addDmg(curWeapon(), num);
    }

    function normColor(c) {
        if (typeof c !== 'string') return '';
        return c.trim().toLowerCase().replace(/\s+/g, '');
    }
})();

// ═══════════════════════════════════════════════════════════════════════
//  ② WEBSOCKET HOOK — installed immediately (document-start)
// ═══════════════════════════════════════════════════════════════════════
;(function installWSHook() {
    const _WS = window.WebSocket;

    function wrapSocket(ws) {
        // Outgoing
        const _send = ws.send.bind(ws);
        ws.send = function (data) {
            try { onOutgoing(data); } catch (_) {}
            return _send(data);
        };
        // Incoming
        ws.addEventListener('message', ev => {
            try {
                const d = ev.data;
                if (d instanceof Blob)        d.arrayBuffer().then(b => onIncoming(new Uint8Array(b)));
                else if (d instanceof ArrayBuffer) onIncoming(new Uint8Array(d));
                else if (typeof d === 'string')    onIncomingStr(d);
            } catch (_) {}
        });
    }

    // ── Outgoing parser ──────────────────────────────────────────────
    function onOutgoing(data) {
        const pkt = decodeAny(data);
        if (!pkt) return;
        if (S.debugMode) console.log('[DMG POT] → OUT:', JSON.stringify(pkt));
        if (!Array.isArray(pkt)) return;
        const [type] = pkt;

        // Attack packet: ["6", {sid: slotIndex, dir: angle}]  OR  [6, slot, dir]
        if (type === '6' || type === 6) {
            const arg = pkt[1];
            if (arg && typeof arg === 'object' && arg.sid != null) S.currentSlot = arg.sid;
            else if (typeof arg === 'number') S.currentSlot = arg;
            refreshSlotIndicator();
        }
    }

    // ── Incoming parser ──────────────────────────────────────────────
    function onIncoming(bytes) {
        const pkt = msgUnpack(bytes);
        if (!pkt) return;
        if (S.debugMode) console.log('[DMG POT] ← IN:', JSON.stringify(pkt));
        processIn(pkt);
    }
    function onIncomingStr(str) {
        let pkt; try { pkt = JSON.parse(str); } catch (_) { return; }
        if (S.debugMode) console.log('[DMG POT] ← IN(str):', JSON.stringify(pkt));
        processIn(pkt);
    }

    function processIn(pkt) {
        if (!Array.isArray(pkt)) return;
        const [type, payload] = pkt;

        // Item loadout: ["33", {sid, items:[id,id,...]}]
        if (type === '33' || type === 33) {
            if (payload && Array.isArray(payload.items)) {
                if (isMyPlayer(payload)) {
                    payload.items.forEach((id, i) => { if (id != null) S.slots[i] = id; });
                    refreshSlotIndicator();
                }
            }
            // Batch: {pps:[{sid, items},...]}
            if (payload && Array.isArray(payload.pps)) {
                payload.pps.forEach(p => {
                    if (p && Array.isArray(p.items) && isMyPlayer(p)) {
                        p.items.forEach((id, i) => { if (id != null) S.slots[i] = id; });
                        refreshSlotIndicator();
                    }
                });
            }
        }

        // Game init — learn our player SID
        if (type === 'io-init' && payload && payload.sid != null) {
            S.myPlayerId = payload.sid;
        }

        // Kill packets: ["k", ...] or ["kl", ...]
        if (type === 'k' || type === 'kl') {
            if (S.history.length && !S.history[0].isKill) {
                S.history[0].isKill = true;
                S.totalKills++;
                const wn = S.history[0].weapon;
                if (S.weapons[wn]) S.weapons[wn].kills++;
                refreshStats();
            }
        }
    }

    function isMyPlayer(p) { return S.myPlayerId == null || p.sid === S.myPlayerId; }

    function decodeAny(data) {
        if (data instanceof ArrayBuffer)  return msgUnpack(new Uint8Array(data));
        if (data instanceof Uint8Array)   return msgUnpack(data);
        if (typeof data === 'string')     { try { return JSON.parse(data); } catch(_){} }
        return null;
    }

    // Proxy WebSocket constructor
    function ProxiedWS(...args) {
        const ws = new _WS(...args);
        wrapSocket(ws);
        return ws;
    }
    ProxiedWS.prototype         = _WS.prototype;
    ProxiedWS.CONNECTING        = _WS.CONNECTING;
    ProxiedWS.OPEN              = _WS.OPEN;
    ProxiedWS.CLOSING           = _WS.CLOSING;
    ProxiedWS.CLOSED            = _WS.CLOSED;
    window.WebSocket = ProxiedWS;
})();

// ═══════════════════════════════════════════════════════════════════════
//  ③ KEYBOARD HOOK — slot tracking
// ═══════════════════════════════════════════════════════════════════════
;(function installKeyHook() {
    const MAP = { '1':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7 };
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === CFG.toggleKey) { toggleUI(); return; }
        if (MAP[e.key] !== undefined) {
            S.currentSlot = MAP[e.key];
            refreshSlotIndicator();
        }
    }, true);
})();

// ═══════════════════════════════════════════════════════════════════════
//  MINIMAL MSGPACK DECODER  (no external library required)
// ═══════════════════════════════════════════════════════════════════════
function msgUnpack(bytes) {
    if (!bytes || !bytes.byteLength) return null;
    try {
        let p = 0;
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

        function r() {
            const b = bytes[p++];
            if (b === 0xc0) return null;
            if (b === 0xc2) return false;
            if (b === 0xc3) return true;
            if ((b & 0x80) === 0) return b;                          // positive fixint
            if ((b & 0xe0) === 0xe0) return b - 256;                 // negative fixint
            if ((b & 0xe0) === 0xa0) return rStr(b & 0x1f);         // fixstr
            if ((b & 0xf0) === 0x90) return rArr(b & 0x0f);         // fixarray
            if ((b & 0xf0) === 0x80) return rMap(b & 0x0f);         // fixmap
            switch (b) {
                case 0xcc: return bytes[p++];
                case 0xcd: { const v=dv.getUint16(p); p+=2; return v; }
                case 0xce: { const v=dv.getUint32(p); p+=4; return v; }
                case 0xd0: return dv.getInt8(p++);
                case 0xd1: { const v=dv.getInt16(p); p+=2; return v; }
                case 0xd2: { const v=dv.getInt32(p); p+=4; return v; }
                case 0xca: { const v=dv.getFloat32(p); p+=4; return v; }
                case 0xcb: { const v=dv.getFloat64(p); p+=8; return v; }
                case 0xd9: { const l=bytes[p++]; return rStr(l); }
                case 0xda: { const l=dv.getUint16(p); p+=2; return rStr(l); }
                case 0xdb: { const l=dv.getUint32(p); p+=4; return rStr(l); }
                case 0xdc: { const l=dv.getUint16(p); p+=2; return rArr(l); }
                case 0xdd: { const l=dv.getUint32(p); p+=4; return rArr(l); }
                case 0xde: { const l=dv.getUint16(p); p+=2; return rMap(l); }
                case 0xdf: { const l=dv.getUint32(p); p+=4; return rMap(l); }
                default: return b;
            }
        }
        function rStr(l) { const s=new TextDecoder().decode(bytes.subarray(p,p+l)); p+=l; return s; }
        function rArr(l) { const a=[]; for(let i=0;i<l;i++) a.push(r()); return a; }
        function rMap(l) { const o={}; for(let i=0;i<l;i++){const k=r();o[k]=r();} return o; }
        return r();
    } catch(_) { return null; }
}

// ═══════════════════════════════════════════════════════════════════════
//  UI — built after DOMContentLoaded
// ═══════════════════════════════════════════════════════════════════════
function buildUI() {

    // ── Styles ────────────────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

    #dp,#dp *{box-sizing:border-box;margin:0;padding:0;}
    #dp {
        position:fixed;top:10px;right:10px;width:318px;max-height:93vh;
        background:#07090e;border:1px solid #1b2536;border-top:2px solid #f03535;
        font-family:'Oxanium',sans-serif;color:#c4cedf;
        z-index:2147483647;border-radius:4px;
        box-shadow:0 0 0 1px rgba(255,255,255,.025),0 0 28px rgba(240,53,53,.14),0 22px 60px rgba(0,0,0,.82);
        transform:translateX(calc(100% + 16px));
        transition:transform .36s cubic-bezier(.16,1,.3,1);
        display:flex;flex-direction:column;overflow:hidden;
    }
    #dp.dp-show{transform:translateX(0);}

    /* grip */
    #dp-grip{
        position:fixed;top:10px;right:10px;width:34px;height:34px;
        background:#07090e;border:1px solid #1b2536;border-top:2px solid #f03535;
        border-radius:4px;cursor:pointer;z-index:2147483646;
        display:flex;align-items:center;justify-content:center;font-size:16px;
        box-shadow:0 0 18px rgba(240,53,53,.2);transition:box-shadow .2s,transform .15s;
    }
    #dp-grip:hover{box-shadow:0 0 28px rgba(240,53,53,.4);transform:scale(1.07);}
    #dp-grip.dp-gone{display:none;}

    /* header */
    #dp-hdr{background:#0b0e15;border-bottom:1px solid #1b2536;padding:10px 12px 9px;flex-shrink:0;}
    #dp-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
    #dp-title{font-size:13.5px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
              color:#f03535;text-shadow:0 0 14px rgba(240,53,53,.5);}
    #dp-hint{font-family:'JetBrains Mono',monospace;font-size:9px;color:#3a4f6a;
             background:#070a10;border:1px solid #1b2536;padding:2px 6px;border-radius:3px;}
    .dp-sg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:5px;}
    .dp-sg2{display:grid;grid-template-columns:1fr 1fr;gap:5px;}
    .dp-sc{background:#070a10;border:1px solid #1b2536;border-radius:3px;padding:5px 6px;text-align:center;}
    .dp-sv{display:block;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;
           color:#f03535;line-height:1;}
    .dp-sl{display:block;font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;
           color:#3a4f6a;margin-top:3px;}

    /* active weapon strip */
    #dp-strip{background:rgba(240,53,53,.05);border-bottom:1px solid #1b2536;
              padding:5px 12px;display:flex;align-items:center;gap:7px;
              font-size:11px;flex-shrink:0;min-height:27px;}
    #dp-strip-icon{font-size:14px;}
    #dp-strip-name{font-weight:700;flex:1;letter-spacing:.4px;}
    #dp-strip-slot{font-family:'JetBrains Mono',monospace;font-size:9px;color:#3a4f6a;}

    /* debug bar */
    #dp-dbg{background:rgba(255,193,7,.1);border-bottom:1px solid rgba(255,193,7,.3);
            padding:4px 10px;font-size:9px;letter-spacing:1px;text-transform:uppercase;
            color:#ffc107;text-align:center;flex-shrink:0;}
    #dp-dbg.dp-gone{display:none;}

    /* tabs */
    #dp-tabs{display:flex;background:#090c12;border-bottom:1px solid #1b2536;flex-shrink:0;}
    .dp-tab{flex:1;padding:7px 0;cursor:pointer;font-size:9.5px;font-weight:700;
            letter-spacing:2px;text-transform:uppercase;text-align:center;
            color:#3a4f6a;border-bottom:2px solid transparent;transition:color .15s,border-color .15s;}
    .dp-tab:hover{color:#c4cedf;}
    .dp-tab.dp-on{color:#f03535;border-bottom-color:#f03535;}

    /* body */
    #dp-body{overflow-y:auto;flex:1;padding:7px;
             scrollbar-width:thin;scrollbar-color:#1b2536 transparent;}
    #dp-body::-webkit-scrollbar{width:3px;}
    #dp-body::-webkit-scrollbar-thumb{background:#1b2536;border-radius:2px;}

    /* weapon rows */
    #dp-wlist{display:flex;flex-direction:column;gap:4px;}
    .dp-wrow{display:flex;align-items:center;gap:7px;padding:6px 8px;
             background:#0b0e15;border:1px solid #1b2536;border-radius:3px;
             transition:border-color .2s;position:relative;overflow:hidden;}
    .dp-wrow.dp-zero{opacity:.3;}
    .dp-wrow.dp-cur{border-color:rgba(240,53,53,.42);}
    .dp-wrow.dp-flash{animation:dpF .28s ease-out;}
    @keyframes dpF{0%{background:rgba(240,53,53,.18);}100%{background:#0b0e15;}}
    .dp-wi{font-size:15px;width:18px;text-align:center;flex-shrink:0;}
    .dp-winfo{flex:1;min-width:0;}
    .dp-wname{font-size:11.5px;font-weight:700;letter-spacing:.4px;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .dp-wbar-bg{height:2px;background:#1b2536;border-radius:2px;margin-top:4px;}
    .dp-wbar{height:100%;border-radius:2px;transition:width .35s ease;}
    .dp-wright{text-align:right;flex-shrink:0;min-width:60px;}
    .dp-wdmg{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;
             color:#f03535;line-height:1;}
    .dp-wmeta{font-size:8.5px;color:#3a4f6a;margin-top:2px;}

    /* history */
    #dp-hist{display:none;flex-direction:column;gap:3px;}
    .dp-hrow{display:flex;align-items:center;gap:7px;padding:4px 8px;
             background:#0b0e15;border:1px solid #1b2536;border-radius:3px;
             font-size:10.5px;animation:dpSl .18s ease-out;}
    @keyframes dpSl{from{opacity:0;transform:translateX(-5px);}to{opacity:1;transform:none;}}
    .dp-hrow.dp-kill{border-color:rgba(240,53,53,.3);}
    .dp-ht{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:#3a4f6a;flex-shrink:0;}
    .dp-hw{color:#7a90b0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .dp-hd{font-family:'JetBrains Mono',monospace;font-weight:700;color:#f03535;flex-shrink:0;}

    /* footer */
    #dp-foot{padding:7px 8px;border-top:1px solid #1b2536;display:flex;gap:5px;
             flex-shrink:0;background:#090c12;}
    .dp-btn{flex:1;padding:5px 0;background:#07090e;border:1px solid #1b2536;
            border-radius:3px;color:#3a4f6a;font-family:'Oxanium',sans-serif;
            font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
            cursor:pointer;transition:color .15s,border-color .15s,background .15s;}
    .dp-btn:hover{color:#f03535;border-color:rgba(240,53,53,.45);background:rgba(240,53,53,.06);}
    .dp-btn.dp-act{color:#f03535;border-color:rgba(240,53,53,.4);}

    /* floating numbers */
    .dp-float{position:fixed;pointer-events:none;z-index:2147483645;
              font-family:'JetBrains Mono',monospace;font-weight:700;
              color:#f03535;text-shadow:0 0 8px rgba(240,53,53,.85),1px 1px 0 #000;
              animation:dpFl .75s ease-out forwards;}
    .dp-kill-f{color:#ffd700!important;}
    @keyframes dpFl{0%{opacity:1;transform:translateY(0) scale(1);}
                    60%{opacity:1;transform:translateY(-28px) scale(1.15);}
                    100%{opacity:0;transform:translateY(-52px) scale(.8);}}
    `;
    document.head.appendChild(style);

    // ── Grip button ───────────────────────────────────────────────────
    const grip = document.createElement('div');
    grip.id = 'dp-grip';
    grip.title = 'DMG POT  [L]';
    grip.innerHTML = '💀';
    grip.addEventListener('click', toggleUI);
    document.body.appendChild(grip);

    // ── Panel ─────────────────────────────────────────────────────────
    const panel = document.createElement('div');
    panel.id = 'dp';
    panel.innerHTML = `
    <div id="dp-hdr">
        <div id="dp-title-row">
            <span id="dp-title">DMG POT</span>
            <span id="dp-hint">[L]</span>
        </div>
        <div class="dp-sg">
            <div class="dp-sc"><span class="dp-sv" id="sv-dmg">0</span><span class="dp-sl">Total DMG</span></div>
            <div class="dp-sc"><span class="dp-sv" id="sv-dps">0.0</span><span class="dp-sl">DPS</span></div>
            <div class="dp-sc"><span class="dp-sv" id="sv-time">00:00</span><span class="dp-sl">Session</span></div>
        </div>
        <div class="dp-sg2">
            <div class="dp-sc"><span class="dp-sv" id="sv-hits">0</span><span class="dp-sl">Total Hits</span></div>
            <div class="dp-sc"><span class="dp-sv" id="sv-kills">0</span><span class="dp-sl">Kills</span></div>
        </div>
    </div>
    <div id="dp-strip">
        <span id="dp-strip-icon">❓</span>
        <span id="dp-strip-name">—</span>
        <span id="dp-strip-slot">Slot 1</span>
    </div>
    <div id="dp-dbg" class="dp-gone">⚠ DEBUG MODE — check browser console</div>
    <div id="dp-tabs">
        <div class="dp-tab dp-on" data-tab="weapons">Weapons</div>
        <div class="dp-tab" data-tab="history">History</div>
    </div>
    <div id="dp-body">
        <div id="dp-wlist"></div>
        <div id="dp-hist"></div>
    </div>
    <div id="dp-foot">
        <button class="dp-btn" id="dp-sort">Sort: DMG</button>
        <button class="dp-btn" id="dp-debug">Debug</button>
        <button class="dp-btn" id="dp-reset">Reset</button>
    </div>
    `;
    document.body.appendChild(panel);

    // ── Tabs ──────────────────────────────────────────────────────────
    panel.querySelectorAll('.dp-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            panel.querySelectorAll('.dp-tab').forEach(t => t.classList.remove('dp-on'));
            tab.classList.add('dp-on');
            S.tab = tab.dataset.tab;
            document.getElementById('dp-wlist').style.display = S.tab === 'weapons' ? 'flex' : 'none';
            document.getElementById('dp-hist').style.display  = S.tab === 'history' ? 'flex' : 'none';
        });
    });

    // ── Sort ──────────────────────────────────────────────────────────
    const sorts = [['dmg','Sort: DMG'],['hits','Sort: HITS'],['name','Sort: A–Z']];
    let si = 0;
    document.getElementById('dp-sort').addEventListener('click', () => {
        si = (si + 1) % 3;
        S.sort = sorts[si][0];
        document.getElementById('dp-sort').textContent = sorts[si][1];
        renderWeapons();
    });

    // ── Debug toggle ──────────────────────────────────────────────────
    document.getElementById('dp-debug').addEventListener('click', () => {
        S.debugMode = !S.debugMode;
        document.getElementById('dp-debug').classList.toggle('dp-act', S.debugMode);
        document.getElementById('dp-dbg').classList.toggle('dp-gone', !S.debugMode);
    });

    // ── Reset ─────────────────────────────────────────────────────────
    document.getElementById('dp-reset').addEventListener('click', resetSession);

    // ── Timer ─────────────────────────────────────────────────────────
    setInterval(() => {
        const el = document.getElementById('sv-time');
        if (!el) return;
        const s = Math.floor((Date.now() - S.sessionStart) / 1000);
        el.textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
        refreshStats();
    }, 1000);

    renderWeapons();
    refreshStats();
    refreshSlotIndicator();

    console.log('%c💀 DMG POT v4 ready — press L to toggle', 'color:#f03535;font-weight:bold;font-size:13px');
    console.log('%cCanvas hook ✓ · WebSocket hook ✓ · Keyboard hook ✓', 'color:#3a9bd5');
    console.log('%cIf damage isn\'t counting: enable Debug mode, deal damage, check console for color strings.', 'color:#ffc107');
}

// ═══════════════════════════════════════════════════════════════════════
//  UI UPDATERS
// ═══════════════════════════════════════════════════════════════════════
function toggleUI() {
    S.uiVisible = !S.uiVisible;
    document.getElementById('dp').classList.toggle('dp-show', S.uiVisible);
    document.getElementById('dp-grip').classList.toggle('dp-gone', S.uiVisible);
}

function refreshSlotIndicator() {
    const w = curWeapon();
    const ni = document.getElementById('dp-strip-icon');
    const nn = document.getElementById('dp-strip-name');
    const ns = document.getElementById('dp-strip-slot');
    if (!ni) return;
    ni.textContent = w.icon || '❓';
    nn.textContent = w.name;
    ns.textContent = `Slot ${S.currentSlot + 1}`;
    // Highlight active row
    document.querySelectorAll('.dp-wrow').forEach(r => r.classList.remove('dp-cur'));
    const cur = document.getElementById('dpw-' + w.name.replace(/\s+/g,'-').replace(/[^\w-]/g,''));
    if (cur) cur.classList.add('dp-cur');
}

function refreshStats() {
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    const elapsed = (Date.now() - S.sessionStart) / 1000;
    const dps = elapsed > 1 ? (S.totalDmg / elapsed).toFixed(1) : '0.0';
    set('sv-dmg',   S.totalDmg.toLocaleString());
    set('sv-dps',   dps);
    set('sv-hits',  S.totalHits.toLocaleString());
    set('sv-kills', S.totalKills.toLocaleString());
}

function renderWeapons() {
    const list = document.getElementById('dp-wlist');
    if (!list) return;
    list.innerHTML = '';
    const arr = Object.values(S.weapons);
    if (S.sort === 'dmg')  arr.sort((a,b) => b.damage - a.damage);
    if (S.sort === 'hits') arr.sort((a,b) => b.hits   - a.hits);
    if (S.sort === 'name') arr.sort((a,b) => a.name.localeCompare(b.name));
    const maxDmg = Math.max(1, ...arr.map(w => w.damage));
    arr.forEach(w => list.appendChild(makeRow(w, maxDmg)));
    if (!arr.length) {
        const ph = document.createElement('div');
        ph.style.cssText = 'text-align:center;color:#2d3f56;font-size:11px;padding:22px 0;letter-spacing:1px;';
        ph.textContent = 'No damage recorded yet.';
        list.appendChild(ph);
    }
}

function makeRow(w, maxDmg) {
    const safeName = w.name.replace(/\s+/g,'-').replace(/[^\w-]/g,'');
    const pct  = S.totalDmg > 0 ? ((w.damage / S.totalDmg) * 100).toFixed(1) : '0.0';
    const barW = ((w.damage / maxDmg) * 100).toFixed(1);
    const isCur = curWeapon().name === w.name;
    const el = document.createElement('div');
    el.className = 'dp-wrow' + (w.damage === 0 ? ' dp-zero' : '') + (isCur ? ' dp-cur' : '');
    el.id = 'dpw-' + safeName;
    el.innerHTML = `
        <span class="dp-wi">${w.icon||'❓'}</span>
        <div class="dp-winfo">
            <div class="dp-wname">${w.name}</div>
            <div class="dp-wbar-bg">
                <div class="dp-wbar" style="width:${barW}%;background:${w.color||'#f03535'}"></div>
            </div>
        </div>
        <div class="dp-wright">
            <div class="dp-wdmg">${w.damage.toLocaleString()}</div>
            <div class="dp-wmeta">${w.hits}h · ${w.kills}k · ${pct}%</div>
        </div>`;
    return el;
}

function refreshWeaponRow(name) {
    const list = document.getElementById('dp-wlist');
    if (!list) return;
    const w = S.weapons[name];
    if (!w) return;
    const maxDmg = Math.max(1, ...Object.values(S.weapons).map(x => x.damage));
    const safeName = name.replace(/\s+/g,'-').replace(/[^\w-]/g,'');
    const existing = document.getElementById('dpw-' + safeName);
    if (existing) {
        const pct  = S.totalDmg > 0 ? ((w.damage / S.totalDmg) * 100).toFixed(1) : '0.0';
        const barW = ((w.damage / maxDmg) * 100).toFixed(1);
        const ed = existing.querySelector('.dp-wdmg');
        const em = existing.querySelector('.dp-wmeta');
        const eb = existing.querySelector('.dp-wbar');
        if (ed) ed.textContent = w.damage.toLocaleString();
        if (em) em.textContent = `${w.hits}h · ${w.kills}k · ${pct}%`;
        if (eb) eb.style.width = barW + '%';
        existing.classList.remove('dp-zero','dp-flash');
        void existing.offsetWidth;
        existing.classList.add('dp-flash');
        // Rescale all bars since maxDmg may have changed
        list.querySelectorAll('.dp-wrow').forEach(row => {
            const rn = row.id.replace('dpw-','').replace(/-/g,' ');
            const rw = Object.values(S.weapons).find(x => x.name.replace(/\s+/g,'-').replace(/[^\w-]/g,'') === row.id.replace('dpw-',''));
            if (rw) { const b = row.querySelector('.dp-wbar'); if (b) b.style.width = ((rw.damage/maxDmg)*100).toFixed(1)+'%'; }
        });
        if (S.sort === 'dmg') renderWeapons(); // keep sorted
    } else {
        renderWeapons();
    }
}

function pushHistoryEntry(entry) {
    const hist = document.getElementById('dp-hist');
    if (!hist) return;
    const el = document.createElement('div');
    el.className = 'dp-hrow' + (entry.isKill ? ' dp-kill' : '');
    el.innerHTML = `
        <span class="dp-ht">${entry.t.toFixed(1)}s</span>
        <span class="dp-hw">${entry.weapon}</span>
        <span class="dp-hd">+${entry.amount}</span>
        ${entry.isKill ? '<span style="font-size:10px">💀</span>' : ''}`;
    hist.insertBefore(el, hist.firstChild);
    while (hist.children.length > 100) hist.removeChild(hist.lastChild);
}

function spawnFloat(amount, isKill) {
    const el = document.createElement('div');
    el.className = 'dp-float' + (isKill ? ' dp-kill-f' : '');
    el.style.fontSize = isKill ? '22px' : Math.min(21, 11 + Math.floor(amount / 25)) + 'px';
    el.style.left = (25 + Math.random() * 45) + 'vw';
    el.style.top  = (18 + Math.random() * 35) + 'vh';
    el.textContent = isKill ? `💀 ${amount}` : `+${amount}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 820);
}

// ═══════════════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
} else {
    buildUI();
}

// ═══════════════════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════════════════
window.dmgpot = {
    /** Manually register a hit.  dmgpot.hit('Polearm', 42) */
    hit(weaponName, amount) {
        const w = Object.values(ITEMS).find(i => i.name === weaponName)
               || { name: weaponName, icon: '❓', color: '#f03535' };
        addDmg(w, amount);
    },
    /** Add a new damage number color.  dmgpot.addColor('#ff5500') */
    addColor(hex) {
        const c = hex.trim().toLowerCase().replace(/\s+/g,'');
        CFG.dmgColors.add(c);
        console.log(`[DMG POT] Added color "${c}". Total colors: ${CFG.dmgColors.size}`);
    },
    /** Enable or disable debug logging.  dmgpot.debug(true) */
    debug(on) {
        S.debugMode = !!on;
        const btn = document.getElementById('dp-debug');
        const bar = document.getElementById('dp-dbg');
        if (btn) btn.classList.toggle('dp-act', S.debugMode);
        if (bar) bar.classList.toggle('dp-gone', !S.debugMode);
        console.log(`[DMG POT] Debug ${S.debugMode ? 'ON' : 'OFF'}`);
    },
    /** Manually map a weapon slot.  dmgpot.setSlot(0, 4) → slot 0 = Polearm */
    setSlot(slot, itemId) {
        S.slots[slot] = itemId;
        refreshSlotIndicator();
    },
    state: S,
    ITEMS,
    CFG,
};

})();