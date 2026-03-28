// ==UserScript==
// @name        SunClient
// @version     v6.9
// @description nothing
// @author      RaZoshi
// @match       *://moomoo.io/*
// @match       *://sandbox.moomoo.io/*
// @icon http://i.imgur.com/eJSOmz9.png[/img]
// @require      https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1159501
// @require     https://greasyfork.org/scripts/423602-msgpack/code/msgpack.js
// @require     https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1144738
// @grant       none
// ==/UserScript==


{
const a=document.createElement('div');
a.setAttribute('onclick',`"use strict";
function string_to_chat_packet(s){
  var l=s.length;
  var buf=new ArrayBuffer(6+l);
  var view=new Uint8Array(buf);
  view[0]=146;
  view[1]=162;
  view[2]=99;
  view[3]=104;
  view[4]=145;
  view[5]=160+l;
  while(l--)view[6+l]=s.charCodeAt(l);
  return buf;
}
var anim=[
  '/',
  '-',
  '\\\\',
  '|'
].map(s=>string_to_chat_packet(''));
var discard_message=string_to_chat_packet('');
var frame=0;
var frame_count=anim.length;
var chat_style=document.getElementById('chatHolder').style;
var first_send=true;
var message_to_send=false;
var was_chat_active=false;
var old_send=WebSocket.prototype.send;
WebSocket.prototype.send=function(data){
  if(first_send){
    first_send=false;
    window.setInterval(()=>{
      if(message_to_send){
        old_send.call(this,message_to_send);
        message_to_send=false;
        was_chat_active=false;
        return;
      }
      if(chat_style.display=='none'){
        if(was_chat_active)old_send.call(this,discard_message);
        was_chat_active=false;
        return;
      }
      was_chat_active=true;
      if(frame==frame_count)frame=0;
      old_send.call(this,anim[frame++]);
    },560);
  }
  if(
    data instanceof Uint8Array
    &&data.length>6
    &&data[0]==146
    &&data[1]==162
    &&data[2]==99
    &&data[3]==104
    &&data[4]==145
    &&data[5]>160
  ){
    var off=data.byteOffset;
    message_to_send=data.buffer.slice(off,off+data.length);
    return;
  }
  return old_send.call(this,data);
};`);
a.click();
}

var moomooVer = $('#linksContainer2 .menuLink').html(),
    hideSelectors = ['#mobileDownloadButtonContainer',
                     '#followText',
                     '#smallLinks',
                     '#linksContainer1',
                     '#twitterFollow',
                     '#youtubeFollow',
                     '#cdm-zone-02',
                     '#youtuberOf',
                     '#downloadButtonContainer',
                     '#promoImg',
                     '.menuHeader',
                     '.menuLink',
                     '.menuHeader:nth-child(5)',
                     '.menuHeader:nth-child(6)',
                     '.menuText',
                     '#adCard',
                     '#promoImgHolder',
                     ],

    css = '#rightCardHolder {display: block!important}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

for ( let i = 0; i < hideSelectors.length; i++ ) {
    $(hideSelectors[i]).hide();
}

head.appendChild(style);
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">' + moomooVer + '</a>');

// document.getElementById('promoImgHolder').innerHTML = '</iframe><iframe width="420px" height="236.25px" src="https://www.youtube-nocookie.com/embed/GPATUFiWoTI" frameborder="0" allowfullscreen></iframe>';
// document.getElementById('adCard').innerHTML = '<iframe width="420px" height="236.25px" src="https://www.youtube-nocookie.com/embed/D3_2AIOEnZQ" frameborder="0" allowfullscreen></iframe>';
// document.getElementById('downloadButtonContainer').innerHTML = '</iframe><iframe width="420px" height="236.25px" src="http://icecast3.play.cz/evropa2-128.mp3"></iframe>';

// document.getElementById("gameUI").style.backgroundImage = "url('')";
// document.getElementById("mainMenu").style.backgroundImage = "url('')";
document.getElementById('enterGame').innerHTML = 'Enter Game';
document.getElementById('enterGame').style.color = 'White';
document.getElementById('loadingText').innerHTML = 'Just Relax';
document.getElementById('nameInput').placeholder = "SunClient";
document.getElementById('diedText').innerHTML = 'It ok, Just Try Again!';
document.getElementById('gameName').innerHTML = 'SunClient';
document.getElementById("leaderboard").append ('SunClient');
document.getElementById("leaderboard").style.color = "white";


$('.menuCard').css({'white-space': 'normal',
                    'text-align': 'center',
                    'background-color': 'rgba(0, 0, 0, 0.74)',
                    '-moz-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    'box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'margin': '15px',
                    'margin-top': '15px'});

$('#menuContainer').css({'white-space': 'normal'});

$('#nativeResolution').css({'cursor': 'pointer'});

$('#playMusic').css({'cursor': 'pointer'});

$('#guideCard').css({'overflow-y': 'hidden',
                     'margin-top': 'auto',
                     'margin-bottom': '30px'});

$('#serverSelect').css({'margin-bottom': '30.75px'});

$('#skinColorHolder').css({'margin-bottom': '30.75px'});

$('.settingRadio').css({'margin-bottom': '30.75px'});

$('#partyButton').css({'right': '70%',
                       'left': '10%',
                       'text-align': 'center',
                       'bottom': '48px',
                       'font-size': '24px',
                       'top': 'unset'});

$('#joinPartyButton').css({'right': '10%',
                           'left': '70%',
                           'text-align': 'center',
                           'bottom': '48px',
                           'font-size': '24px',
                           'top': 'unset'});

$('#linksContainer2').css({'-webkit-border-radius': '0px 0 0 0',
                           '-moz-border-radius': '0px 0 0 0',
                           'border-radius': '0px 0 0 0',
                           'right': '44%',
                           'left': '44%',
                           'background-color': 'rgba(0, 0, 0, 0.74)',
                           'text-align': 'center',
                           'bottom': '12px'});

$('#gameName').css({'color': 'white',
                    'text-shadow': '0 1px 0 rgba(255, 255, 255, 0), 0 2px 0 rgba(255, 255, 255, 0), 0 3px 0 rgba(255, 255, 255, 0), 0 4px 0 rgba(255, 255, 255, 0), 0 5px 0 rgba(255, 255, 255, 0), 0 6px 0 rgba(255, 255, 255, 0), 0 7px 0 rgba(255, 255, 255, 0), 0 8px 0 rgba(255, 255, 255, 0), 0 9px 0 rgba(255, 255, 255, 0)',
                    'text-align': 'center',
                    'font-size': '156px',
                    'margin-bottom': '-30px'});

$('#loadingText').css({'color': 'white',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

$('.ytLink').css({'color': 'white',
                  'padding': '8px',
                  'background-color': 'rgba(0, 0, 0, 0.74)'});

$('.menuLink').css({'color': 'white'});

$('#nameInput').css({'border-radius': '0px',
                     '-moz-border-radius': '0px',
                     '-webkit-border-radius': '0px',
                     'border': 'hidden'});

$('#serverSelect').css({'cursor': 'pointer',
                        'color': 'white',
                        'background-color': 'white',
                        'border': 'hidden',
                        'font-size': '20px'});

$('.menuButton').css({'border-radius': '0px',
                      '-moz-border-radius': '0px',
                      '-webkit-border-radius': '0px'});

$('#promoImgHolder').css({'position': 'absolute',
                          'bottom': '-7%',
                          'left': '20px',
                          'width': '420px',
                          'height': '236.25px',
                          'padding-bottom': '18px',
                          'margin-top': '0px'});

$('#adCard').css({'position': 'absolute',
                  'bottom': '-7%',
                  'right': '20px',
                  'width': '420px',
                  'height': '236.25px',
                  'padding-bottom': '18px'});

$('#mapDisplay').css({'-webkit-border-radius': '0px',
                      '-moz-border-radius': '0px',
                      'border-radius': '0px'});

$('.menuHeader').css({'color': '#fff'});

$('#killCounter').css({'color': '#fff'});

$('#diedText').css({'background-color': 'clear'});

$('#gameCanvas').css({'background-color': 'clear'});

$('#allianceButton').css({'color': 'white'});

$('#storeButton').css({'color': 'white'});

$('#chatButton').css({'color': 'white'});

$('.gameButton').css({'-webkit-border-radius': '0px 0 0 0',
                      '-moz-border-radius': '0px 0 0 0',
                      'border-radius': '0px 0 0 0',
                      'background-color': 'rgba(0, 0, 0, 0.4)'});

$('.uiElement, .resourceDisplay').css({'-webkit-border-radius': '0px',
                                       '-moz-border-radius': '0px',
                                       'border-radius': '0px',
                                       'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#chatBox').css({'-webkit-border-radius': '0px',
                   '-moz-border-radius': '0px',
                   'border-radius': '0px',
                   'background-color': 'rgba(0, 0, 0, 0.4)',
                   'text-align': 'center'});

$('#foodDisplay').css({'color': 'white'});

$('#woodDisplay').css({'color': 'white'});

$('#stoneDisplay').css({'color': 'white'});

$('#scoreDisplay').css({'color': 'white'});

$('#leaderboard').css({'-webkit-border-radius': '0px',
                       '-moz-border-radius': '0px',
                       'border-radius': '0px',
                       'background-color': 'rgb((255,240,245))',
                       'text-align': 'center'});

$('#ageText').css({'color': '#fff'});

$('#ageBar').css({'-webkit-border-radius': '0px',
                  '-moz-border-radius': '0px',
                  'border-radius': '0px',
                  'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#ageBarBody').css({'-webkit-border-radius': '0px',
                      '-moz-border-radius': '0px',
                      'border-radius': '0px',
                      'background-color': '#fff'});

$('.storeTab').css({'-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#storeHolder').css({'-webkit-border-radius': '0px',
                       '-moz-border-radius': '0px',
                       'border-radius': '0px',
                       'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#allianceHolder').css({'-webkit-border-radius': '0px',
                          '-moz-border-radius': '0px',
                          'border-radius': '0px',
                          'background-color': 'rgba(0, 0, 0, 0.4)'});

$('.actionBarItem').css({'-webkit-border-radius': '0px',
                         'border-radius': '0px',
                         'background-color': 'rgba(0, 0, 0, 0.4)'});


var myElement = document.querySelector('#nameInput');
myElement.style.backgroundColor = "#808080";
myElement.style.color = "white";

var myElement = document.querySelector('#enterGame');
myElement.style.backgroundColor = "clear";
myElement.style.color = "white";


document.title = "SunClient"
var tick = 0;
/*let newPingDisplay = document.createElement("div");
newPingDisplay = document.getElementById("pingDisplay");
newPingDisplay.style.top = "20px";
newPingDisplay.style.fontSize = "15px";
newPingDisplay.style.display = "block";
document.body.append(newPingDisplay);*/
window.onbeforeunload = null;
! function () {
    "use strict";
    setInterval(() => {
        document.getElementById("onetrust-consent-sdk") && "complete" == document.readyState && document.getElementById("onetrust-consent-sdk").remove()
    }, 100)
}();
!function(e) {
    var t = {};
    function n(i) {
        if (t[i])
            return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n),
        r.l = !0,
        r.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var i = Object.create(null);
        if (n.r(i),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                n.d(i, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return i
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 21)
}([function(e, t, n) {
    var i = t.global = n(25)
      , r = t.hasBuffer = i && !!i.isBuffer
      , s = t.hasArrayBuffer = "undefined" != typeof ArrayBuffer
      , a = t.isArray = n(5);
    t.isArrayBuffer = s ? function(e) {
        return e instanceof ArrayBuffer || p(e)
    }
    : m;
    var o = t.isBuffer = r ? i.isBuffer : m
      , c = t.isView = s ? ArrayBuffer.isView || y("ArrayBuffer", "buffer") : m;
    t.alloc = d,
    t.concat = function(e, n) {
        n || (n = 0,
        Array.prototype.forEach.call(e, (function(e) {
            n += e.length
        }
        )));
        var i = this !== t && this || e[0]
          , r = d.call(i, n)
          , s = 0;
        return Array.prototype.forEach.call(e, (function(e) {
            s += f.copy.call(e, r, s)
        }
        )),
        r
    }
    ,
    t.from = function(e) {
        return "string" == typeof e ? function(e) {
            var t = 3 * e.length
              , n = d.call(this, t)
              , i = f.write.call(n, e);
            return t !== i && (n = f.slice.call(n, 0, i)),
            n
        }
        .call(this, e) : g(this).from(e)
    }
    ;
    var l = t.Array = n(28)
      , h = t.Buffer = n(29)
      , u = t.Uint8Array = n(30)
      , f = t.prototype = n(6);
    function d(e) {
        return g(this).alloc(e)
    }
    var p = y("ArrayBuffer");
    function g(e) {
        return o(e) ? h : c(e) ? u : a(e) ? l : r ? h : s ? u : l
    }
    function m() {
        return !1
    }
    function y(e, t) {
        return e = "[object " + e + "]",
        function(n) {
            return null != n && {}.toString.call(t ? n[t] : n) === e
        }
    }
}
, function(e, t, n) {
    var i = n(5);
    t.createCodec = o,
    t.install = function(e) {
        for (var t in e)
            s.prototype[t] = a(s.prototype[t], e[t])
    }
    ,
    t.filter = function(e) {
        return i(e) ? function(e) {
            return e = e.slice(),
            function(n) {
                return e.reduce(t, n)
            }
            ;
            function t(e, t) {
                return t(e)
            }
        }(e) : e
    }
    ;
    var r = n(0);
    function s(e) {
        if (!(this instanceof s))
            return new s(e);
        this.options = e,
        this.init()
    }
    function a(e, t) {
        return e && t ? function() {
            return e.apply(this, arguments),
            t.apply(this, arguments)
        }
        : e || t
    }
    function o(e) {
        return new s(e)
    }
    s.prototype.init = function() {
        var e = this.options;
        return e && e.uint8array && (this.bufferish = r.Uint8Array),
        this
    }
    ,
    t.preset = o({
        preset: !0
    })
}
, function(e, t, n) {
    var i = n(3).ExtBuffer
      , r = n(32)
      , s = n(33)
      , a = n(1);
    function o() {
        var e = this.options;
        return this.encode = function(e) {
            var t = s.getWriteType(e);
            return function(e, n) {
                var i = t[typeof n];
                if (!i)
                    throw new Error('Unsupported type "' + typeof n + '": ' + n);
                i(e, n)
            }
        }(e),
        e && e.preset && r.setExtPackers(this),
        this
    }
    a.install({
        addExtPacker: function(e, t, n) {
            n = a.filter(n);
            var r = t.name;
            r && "Object" !== r ? (this.extPackers || (this.extPackers = {}))[r] = s : (this.extEncoderList || (this.extEncoderList = [])).unshift([t, s]);
            function s(t) {
                return n && (t = n(t)),
                new i(t,e)
            }
        },
        getExtPacker: function(e) {
            var t = this.extPackers || (this.extPackers = {})
              , n = e.constructor
              , i = n && n.name && t[n.name];
            if (i)
                return i;
            for (var r = this.extEncoderList || (this.extEncoderList = []), s = r.length, a = 0; a < s; a++) {
                var o = r[a];
                if (n === o[0])
                    return o[1]
            }
        },
        init: o
    }),
    t.preset = o.call(a.preset)
}
, function(e, t, n) {
    t.ExtBuffer = function e(t, n) {
        if (!(this instanceof e))
            return new e(t,n);
        this.buffer = i.from(t),
        this.type = n
    }
    ;
    var i = n(0)
}
, function(e, t) {
    t.read = function(e, t, n, i, r) {
        var s, a, o = 8 * r - i - 1, c = (1 << o) - 1, l = c >> 1, h = -7, u = n ? r - 1 : 0, f = n ? -1 : 1, d = e[t + u];
        for (u += f,
        s = d & (1 << -h) - 1,
        d >>= -h,
        h += o; h > 0; s = 256 * s + e[t + u],
        u += f,
        h -= 8)
            ;
        for (a = s & (1 << -h) - 1,
        s >>= -h,
        h += i; h > 0; a = 256 * a + e[t + u],
        u += f,
        h -= 8)
            ;
        if (0 === s)
            s = 1 - l;
        else {
            if (s === c)
                return a ? NaN : 1 / 0 * (d ? -1 : 1);
            a += Math.pow(2, i),
            s -= l
        }
        return (d ? -1 : 1) * a * Math.pow(2, s - i)
    }
    ,
    t.write = function(e, t, n, i, r, s) {
        var a, o, c, l = 8 * s - r - 1, h = (1 << l) - 1, u = h >> 1, f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = i ? 0 : s - 1, p = i ? 1 : -1, g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t),
        isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0,
        a = h) : (a = Math.floor(Math.log(t) / Math.LN2),
        t * (c = Math.pow(2, -a)) < 1 && (a--,
        c *= 2),
        (t += a + u >= 1 ? f / c : f * Math.pow(2, 1 - u)) * c >= 2 && (a++,
        c /= 2),
        a + u >= h ? (o = 0,
        a = h) : a + u >= 1 ? (o = (t * c - 1) * Math.pow(2, r),
        a += u) : (o = t * Math.pow(2, u - 1) * Math.pow(2, r),
        a = 0)); r >= 8; e[n + d] = 255 & o,
        d += p,
        o /= 256,
        r -= 8)
            ;
        for (a = a << r | o,
        l += r; l > 0; e[n + d] = 255 & a,
        d += p,
        a /= 256,
        l -= 8)
            ;
        e[n + d - p] |= 128 * g
    }
}
, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e)
    }
}
, function(e, t, n) {
    var i = n(31);
    t.copy = c,
    t.slice = l,
    t.toString = function(e, t, n) {
        return (!a && r.isBuffer(this) ? this.toString : i.toString).apply(this, arguments)
    }
    ,
    t.write = function(e) {
        return function() {
            return (this[e] || i[e]).apply(this, arguments)
        }
    }("write");
    var r = n(0)
      , s = r.global
      , a = r.hasBuffer && "TYPED_ARRAY_SUPPORT"in s
      , o = a && !s.TYPED_ARRAY_SUPPORT;
    function c(e, t, n, s) {
        var a = r.isBuffer(this)
          , c = r.isBuffer(e);
        if (a && c)
            return this.copy(e, t, n, s);
        if (o || a || c || !r.isView(this) || !r.isView(e))
            return i.copy.call(this, e, t, n, s);
        var h = n || null != s ? l.call(this, n, s) : this;
        return e.set(h, t),
        h.length
    }
    function l(e, t) {
        var n = this.slice || !o && this.subarray;
        if (n)
            return n.call(this, e, t);
        var i = r.alloc.call(this, t - e);
        return c.call(this, i, 0, e, t),
        i
    }
}
, function(e, t, n) {
    (function(e) {
        !function(t) {
            var n, i = "undefined", r = i !== typeof e && e, s = i !== typeof Uint8Array && Uint8Array, a = i !== typeof ArrayBuffer && ArrayBuffer, o = [0, 0, 0, 0, 0, 0, 0, 0], c = Array.isArray || function(e) {
                return !!e && "[object Array]" == Object.prototype.toString.call(e)
            }
            , l = 4294967296;
            function h(e, c, h) {
                var b = c ? 0 : 4
                  , x = c ? 4 : 0
                  , S = c ? 0 : 3
                  , T = c ? 1 : 2
                  , I = c ? 2 : 1
                  , E = c ? 3 : 0
                  , M = c ? y : v
                  , A = c ? k : w
                  , P = O.prototype
                  , B = "is" + e
                  , C = "_" + B;
                return P.buffer = void 0,
                P.offset = 0,
                P[C] = !0,
                P.toNumber = R,
                P.toString = function(e) {
                    var t = this.buffer
                      , n = this.offset
                      , i = _(t, n + b)
                      , r = _(t, n + x)
                      , s = ""
                      , a = !h && 2147483648 & i;
                    for (a && (i = ~i,
                    r = l - r),
                    e = e || 10; ; ) {
                        var o = i % e * l + r;
                        if (i = Math.floor(i / e),
                        r = Math.floor(o / e),
                        s = (o % e).toString(e) + s,
                        !i && !r)
                            break
                    }
                    return a && (s = "-" + s),
                    s
                }
                ,
                P.toJSON = R,
                P.toArray = u,
                r && (P.toBuffer = f),
                s && (P.toArrayBuffer = d),
                O[B] = function(e) {
                    return !(!e || !e[C])
                }
                ,
                t[e] = O,
                O;
                function O(e, t, r, c) {
                    return this instanceof O ? function(e, t, r, c, h) {
                        if (s && a && (t instanceof a && (t = new s(t)),
                        c instanceof a && (c = new s(c))),
                        t || r || c || n) {
                            if (!p(t, r))
                                h = r,
                                c = t,
                                r = 0,
                                t = new (n || Array)(8);
                            e.buffer = t,
                            e.offset = r |= 0,
                            i !== typeof c && ("string" == typeof c ? function(e, t, n, i) {
                                var r = 0
                                  , s = n.length
                                  , a = 0
                                  , o = 0;
                                "-" === n[0] && r++;
                                for (var c = r; r < s; ) {
                                    var h = parseInt(n[r++], i);
                                    if (!(h >= 0))
                                        break;
                                    o = o * i + h,
                                    a = a * i + Math.floor(o / l),
                                    o %= l
                                }
                                c && (a = ~a,
                                o ? o = l - o : a++),
                                j(e, t + b, a),
                                j(e, t + x, o)
                            }(t, r, c, h || 10) : p(c, h) ? g(t, r, c, h) : "number" == typeof h ? (j(t, r + b, c),
                            j(t, r + x, h)) : c > 0 ? M(t, r, c) : c < 0 ? A(t, r, c) : g(t, r, o, 0))
                        } else
                            e.buffer = m(o, 0)
                    }(this, e, t, r, c) : new O(e,t,r,c)
                }
                function R() {
                    var e = this.buffer
                      , t = this.offset
                      , n = _(e, t + b)
                      , i = _(e, t + x);
                    return h || (n |= 0),
                    n ? n * l + i : i
                }
                function j(e, t, n) {
                    e[t + E] = 255 & n,
                    n >>= 8,
                    e[t + I] = 255 & n,
                    n >>= 8,
                    e[t + T] = 255 & n,
                    n >>= 8,
                    e[t + S] = 255 & n
                }
                function _(e, t) {
                    return 16777216 * e[t + S] + (e[t + T] << 16) + (e[t + I] << 8) + e[t + E]
                }
            }
            function u(e) {
                var t = this.buffer
                  , i = this.offset;
                return n = null,
                !1 !== e && 0 === i && 8 === t.length && c(t) ? t : m(t, i)
            }
            function f(t) {
                var i = this.buffer
                  , s = this.offset;
                if (n = r,
                !1 !== t && 0 === s && 8 === i.length && e.isBuffer(i))
                    return i;
                var a = new r(8);
                return g(a, 0, i, s),
                a
            }
            function d(e) {
                var t = this.buffer
                  , i = this.offset
                  , r = t.buffer;
                if (n = s,
                !1 !== e && 0 === i && r instanceof a && 8 === r.byteLength)
                    return r;
                var o = new s(8);
                return g(o, 0, t, i),
                o.buffer
            }
            function p(e, t) {
                var n = e && e.length;
                return t |= 0,
                n && t + 8 <= n && "string" != typeof e[t]
            }
            function g(e, t, n, i) {
                t |= 0,
                i |= 0;
                for (var r = 0; r < 8; r++)
                    e[t++] = 255 & n[i++]
            }
            function m(e, t) {
                return Array.prototype.slice.call(e, t, t + 8)
            }
            function y(e, t, n) {
                for (var i = t + 8; i > t; )
                    e[--i] = 255 & n,
                    n /= 256
            }
            function k(e, t, n) {
                var i = t + 8;
                for (n++; i > t; )
                    e[--i] = 255 & -n ^ 255,
                    n /= 256
            }
            function v(e, t, n) {
                for (var i = t + 8; t < i; )
                    e[t++] = 255 & n,
                    n /= 256
            }
            function w(e, t, n) {
                var i = t + 8;
                for (n++; t < i; )
                    e[t++] = 255 & -n ^ 255,
                    n /= 256
            }
            h("Uint64BE", !0, !0),
            h("Int64BE", !0, !1),
            h("Uint64LE", !1, !0),
            h("Int64LE", !1, !1)
        }("string" != typeof t.nodeName ? t : this || {})
    }
    ).call(this, n(11).Buffer)
}
, function(e, t, n) {
    var i = n(3).ExtBuffer
      , r = n(35)
      , s = n(17).readUint8
      , a = n(36)
      , o = n(1);
    function c() {
        var e = this.options;
        return this.decode = function(e) {
            var t = a.getReadToken(e);
            return function(e) {
                var n = s(e)
                  , i = t[n];
                if (!i)
                    throw new Error("Invalid type: " + (n ? "0x" + n.toString(16) : n));
                return i(e)
            }
        }(e),
        e && e.preset && r.setExtUnpackers(this),
        this
    }
    o.install({
        addExtUnpacker: function(e, t) {
            (this.extUnpackers || (this.extUnpackers = []))[e] = o.filter(t)
        },
        getExtUnpacker: function(e) {
            return (this.extUnpackers || (this.extUnpackers = []))[e] || function(t) {
                return new i(t,e)
            }
        },
        init: c
    }),
    t.preset = c.call(o.preset)
}
, function(e, t, n) {
    t.encode = function(e, t) {
        var n = new i(t);
        return n.write(e),
        n.read()
    }
    ;
    var i = n(10).EncodeBuffer
}
, function(e, t, n) {
    t.EncodeBuffer = r;
    var i = n(2).preset;
    function r(e) {
        if (!(this instanceof r))
            return new r(e);
        if (e && (this.options = e,
        e.codec)) {
            var t = this.codec = e.codec;
            t.bufferish && (this.bufferish = t.bufferish)
        }
    }
    n(14).FlexEncoder.mixin(r.prototype),
    r.prototype.codec = i,
    r.prototype.write = function(e) {
        this.codec.encode(this, e)
    }
}
, function(e, t, n) {
    "use strict";
    (function(e) {
        /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
        var i = n(26)
          , r = n(4)
          , s = n(27);
        function a() {
            return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function o(e, t) {
            if (a() < t)
                throw new RangeError("Invalid typed array length");
            return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = c.prototype : (null === e && (e = new c(t)),
            e.length = t),
            e
        }
        function c(e, t, n) {
            if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c))
                return new c(e,t,n);
            if ("number" == typeof e) {
                if ("string" == typeof t)
                    throw new Error("If encoding is specified then the first argument must be a string");
                return u(this, e)
            }
            return l(this, e, t, n)
        }
        function l(e, t, n, i) {
            if ("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, i) {
                if (t.byteLength,
                n < 0 || t.byteLength < n)
                    throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (i || 0))
                    throw new RangeError("'length' is out of bounds");
                return t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t,n) : new Uint8Array(t,n,i),
                c.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = c.prototype : e = f(e, t),
                e
            }(e, t, n, i) : "string" == typeof t ? function(e, t, n) {
                if ("string" == typeof n && "" !== n || (n = "utf8"),
                !c.isEncoding(n))
                    throw new TypeError('"encoding" must be a valid string encoding');
                var i = 0 | p(t, n)
                  , r = (e = o(e, i)).write(t, n);
                return r !== i && (e = e.slice(0, r)),
                e
            }(e, t, n) : function(e, t) {
                if (c.isBuffer(t)) {
                    var n = 0 | d(t.length);
                    return 0 === (e = o(e, n)).length || t.copy(e, 0, 0, n),
                    e
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
                        return "number" != typeof t.length || function(e) {
                            return e != e
                        }(t.length) ? o(e, 0) : f(e, t);
                    if ("Buffer" === t.type && s(t.data))
                        return f(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(e, t)
        }
        function h(e) {
            if ("number" != typeof e)
                throw new TypeError('"size" argument must be a number');
            if (e < 0)
                throw new RangeError('"size" argument must not be negative')
        }
        function u(e, t) {
            if (h(t),
            e = o(e, t < 0 ? 0 : 0 | d(t)),
            !c.TYPED_ARRAY_SUPPORT)
                for (var n = 0; n < t; ++n)
                    e[n] = 0;
            return e
        }
        function f(e, t) {
            var n = t.length < 0 ? 0 : 0 | d(t.length);
            e = o(e, n);
            for (var i = 0; i < n; i += 1)
                e[i] = 255 & t[i];
            return e
        }
        function d(e) {
            if (e >= a())
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
            return 0 | e
        }
        function p(e, t) {
            if (c.isBuffer(e))
                return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n)
                return 0;
            for (var i = !1; ; )
                switch (t) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                case void 0:
                    return z(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return H(e).length;
                default:
                    if (i)
                        return z(e).length;
                    t = ("" + t).toLowerCase(),
                    i = !0
                }
        }
        function g(e, t, n) {
            var i = e[t];
            e[t] = e[n],
            e[n] = i
        }
        function m(e, t, n, i, r) {
            if (0 === e.length)
                return -1;
            if ("string" == typeof n ? (i = n,
            n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
            n = +n,
            isNaN(n) && (n = r ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length) {
                if (r)
                    return -1;
                n = e.length - 1
            } else if (n < 0) {
                if (!r)
                    return -1;
                n = 0
            }
            if ("string" == typeof t && (t = c.from(t, i)),
            c.isBuffer(t))
                return 0 === t.length ? -1 : y(e, t, n, i, r);
            if ("number" == typeof t)
                return t &= 255,
                c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : y(e, [t], n, i, r);
            throw new TypeError("val must be string, number or Buffer")
        }
        function y(e, t, n, i, r) {
            var s, a = 1, o = e.length, c = t.length;
            if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                if (e.length < 2 || t.length < 2)
                    return -1;
                a = 2,
                o /= 2,
                c /= 2,
                n /= 2
            }
            function l(e, t) {
                return 1 === a ? e[t] : e.readUInt16BE(t * a)
            }
            if (r) {
                var h = -1;
                for (s = n; s < o; s++)
                    if (l(e, s) === l(t, -1 === h ? 0 : s - h)) {
                        if (-1 === h && (h = s),
                        s - h + 1 === c)
                            return h * a
                    } else
                        -1 !== h && (s -= s - h),
                        h = -1
            } else
                for (n + c > o && (n = o - c),
                s = n; s >= 0; s--) {
                    for (var u = !0, f = 0; f < c; f++)
                        if (l(e, s + f) !== l(t, f)) {
                            u = !1;
                            break
                        }
                    if (u)
                        return s
                }
            return -1
        }
        function k(e, t, n, i) {
            n = Number(n) || 0;
            var r = e.length - n;
            i ? (i = Number(i)) > r && (i = r) : i = r;
            var s = t.length;
            if (s % 2 != 0)
                throw new TypeError("Invalid hex string");
            i > s / 2 && (i = s / 2);
            for (var a = 0; a < i; ++a) {
                var o = parseInt(t.substr(2 * a, 2), 16);
                if (isNaN(o))
                    return a;
                e[n + a] = o
            }
            return a
        }
        function v(e, t, n, i) {
            return V(z(t, e.length - n), e, n, i)
        }
        function w(e, t, n, i) {
            return V(function(e) {
                for (var t = [], n = 0; n < e.length; ++n)
                    t.push(255 & e.charCodeAt(n));
                return t
            }(t), e, n, i)
        }
        function b(e, t, n, i) {
            return w(e, t, n, i)
        }
        function x(e, t, n, i) {
            return V(H(t), e, n, i)
        }
        function S(e, t, n, i) {
            return V(function(e, t) {
                for (var n, i, r, s = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                    i = (n = e.charCodeAt(a)) >> 8,
                    r = n % 256,
                    s.push(r),
                    s.push(i);
                return s
            }(t, e.length - n), e, n, i)
        }
        function T(e, t, n) {
            return 0 === t && n === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, n))
        }
        function I(e, t, n) {
            n = Math.min(e.length, n);
            for (var i = [], r = t; r < n; ) {
                var s, a, o, c, l = e[r], h = null, u = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                if (r + u <= n)
                    switch (u) {
                    case 1:
                        l < 128 && (h = l);
                        break;
                    case 2:
                        128 == (192 & (s = e[r + 1])) && (c = (31 & l) << 6 | 63 & s) > 127 && (h = c);
                        break;
                    case 3:
                        s = e[r + 1],
                        a = e[r + 2],
                        128 == (192 & s) && 128 == (192 & a) && (c = (15 & l) << 12 | (63 & s) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (h = c);
                        break;
                    case 4:
                        s = e[r + 1],
                        a = e[r + 2],
                        o = e[r + 3],
                        128 == (192 & s) && 128 == (192 & a) && 128 == (192 & o) && (c = (15 & l) << 18 | (63 & s) << 12 | (63 & a) << 6 | 63 & o) > 65535 && c < 1114112 && (h = c)
                    }
                null === h ? (h = 65533,
                u = 1) : h > 65535 && (h -= 65536,
                i.push(h >>> 10 & 1023 | 55296),
                h = 56320 | 1023 & h),
                i.push(h),
                r += u
            }
            return function(e) {
                var t = e.length;
                if (t <= E)
                    return String.fromCharCode.apply(String, e);
                for (var n = "", i = 0; i < t; )
                    n += String.fromCharCode.apply(String, e.slice(i, i += E));
                return n
            }(i)
        }
        t.Buffer = c,
        t.SlowBuffer = function(e) {
            return +e != e && (e = 0),
            c.alloc(+e)
        }
        ,
        t.INSPECT_MAX_BYTES = 50,
        c.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch (e) {
                return !1
            }
        }(),
        t.kMaxLength = a(),
        c.poolSize = 8192,
        c._augment = function(e) {
            return e.__proto__ = c.prototype,
            e
        }
        ,
        c.from = function(e, t, n) {
            return l(null, e, t, n)
        }
        ,
        c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype,
        c.__proto__ = Uint8Array,
        "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
            value: null,
            configurable: !0
        })),
        c.alloc = function(e, t, n) {
            return function(e, t, n, i) {
                return h(t),
                t <= 0 ? o(e, t) : void 0 !== n ? "string" == typeof i ? o(e, t).fill(n, i) : o(e, t).fill(n) : o(e, t)
            }(null, e, t, n)
        }
        ,
        c.allocUnsafe = function(e) {
            return u(null, e)
        }
        ,
        c.allocUnsafeSlow = function(e) {
            return u(null, e)
        }
        ,
        c.isBuffer = function(e) {
            return !(null == e || !e._isBuffer)
        }
        ,
        c.compare = function(e, t) {
            if (!c.isBuffer(e) || !c.isBuffer(t))
                throw new TypeError("Arguments must be Buffers");
            if (e === t)
                return 0;
            for (var n = e.length, i = t.length, r = 0, s = Math.min(n, i); r < s; ++r)
                if (e[r] !== t[r]) {
                    n = e[r],
                    i = t[r];
                    break
                }
            return n < i ? -1 : i < n ? 1 : 0
        }
        ,
        c.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        c.concat = function(e, t) {
            if (!s(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length)
                return c.alloc(0);
            var n;
            if (void 0 === t)
                for (t = 0,
                n = 0; n < e.length; ++n)
                    t += e[n].length;
            var i = c.allocUnsafe(t)
              , r = 0;
            for (n = 0; n < e.length; ++n) {
                var a = e[n];
                if (!c.isBuffer(a))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(i, r),
                r += a.length
            }
            return i
        }
        ,
        c.byteLength = p,
        c.prototype._isBuffer = !0,
        c.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2)
                g(this, t, t + 1);
            return this
        }
        ,
        c.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)
                g(this, t, t + 3),
                g(this, t + 1, t + 2);
            return this
        }
        ,
        c.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)
                g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this
        }
        ,
        c.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? I(this, 0, e) : function(e, t, n) {
                var i = !1;
                if ((void 0 === t || t < 0) && (t = 0),
                t > this.length)
                    return "";
                if ((void 0 === n || n > this.length) && (n = this.length),
                n <= 0)
                    return "";
                if ((n >>>= 0) <= (t >>>= 0))
                    return "";
                for (e || (e = "utf8"); ; )
                    switch (e) {
                    case "hex":
                        return P(this, t, n);
                    case "utf8":
                    case "utf-8":
                        return I(this, t, n);
                    case "ascii":
                        return M(this, t, n);
                    case "latin1":
                    case "binary":
                        return A(this, t, n);
                    case "base64":
                        return T(this, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return B(this, t, n);
                    default:
                        if (i)
                            throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(),
                        i = !0
                    }
            }
            .apply(this, arguments)
        }
        ,
        c.prototype.equals = function(e) {
            if (!c.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === c.compare(this, e)
        }
        ,
        c.prototype.inspect = function() {
            var e = ""
              , n = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
            this.length > n && (e += " ... ")),
            "<Buffer " + e + ">"
        }
        ,
        c.prototype.compare = function(e, t, n, i, r) {
            if (!c.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0),
            void 0 === n && (n = e ? e.length : 0),
            void 0 === i && (i = 0),
            void 0 === r && (r = this.length),
            t < 0 || n > e.length || i < 0 || r > this.length)
                throw new RangeError("out of range index");
            if (i >= r && t >= n)
                return 0;
            if (i >= r)
                return -1;
            if (t >= n)
                return 1;
            if (this === e)
                return 0;
            for (var s = (r >>>= 0) - (i >>>= 0), a = (n >>>= 0) - (t >>>= 0), o = Math.min(s, a), l = this.slice(i, r), h = e.slice(t, n), u = 0; u < o; ++u)
                if (l[u] !== h[u]) {
                    s = l[u],
                    a = h[u];
                    break
                }
            return s < a ? -1 : a < s ? 1 : 0
        }
        ,
        c.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n)
        }
        ,
        c.prototype.indexOf = function(e, t, n) {
            return m(this, e, t, n, !0)
        }
        ,
        c.prototype.lastIndexOf = function(e, t, n) {
            return m(this, e, t, n, !1)
        }
        ,
        c.prototype.write = function(e, t, n, i) {
            if (void 0 === t)
                i = "utf8",
                n = this.length,
                t = 0;
            else if (void 0 === n && "string" == typeof t)
                i = t,
                n = this.length,
                t = 0;
            else {
                if (!isFinite(t))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0,
                isFinite(n) ? (n |= 0,
                void 0 === i && (i = "utf8")) : (i = n,
                n = void 0)
            }
            var r = this.length - t;
            if ((void 0 === n || n > r) && (n = r),
            e.length > 0 && (n < 0 || t < 0) || t > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            i || (i = "utf8");
            for (var s = !1; ; )
                switch (i) {
                case "hex":
                    return k(this, e, t, n);
                case "utf8":
                case "utf-8":
                    return v(this, e, t, n);
                case "ascii":
                    return w(this, e, t, n);
                case "latin1":
                case "binary":
                    return b(this, e, t, n);
                case "base64":
                    return x(this, e, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return S(this, e, t, n);
                default:
                    if (s)
                        throw new TypeError("Unknown encoding: " + i);
                    i = ("" + i).toLowerCase(),
                    s = !0
                }
        }
        ,
        c.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var E = 4096;
        function M(e, t, n) {
            var i = "";
            n = Math.min(e.length, n);
            for (var r = t; r < n; ++r)
                i += String.fromCharCode(127 & e[r]);
            return i
        }
        function A(e, t, n) {
            var i = "";
            n = Math.min(e.length, n);
            for (var r = t; r < n; ++r)
                i += String.fromCharCode(e[r]);
            return i
        }
        function P(e, t, n) {
            var i = e.length;
            (!t || t < 0) && (t = 0),
            (!n || n < 0 || n > i) && (n = i);
            for (var r = "", s = t; s < n; ++s)
                r += F(e[s]);
            return r
        }
        function B(e, t, n) {
            for (var i = e.slice(t, n), r = "", s = 0; s < i.length; s += 2)
                r += String.fromCharCode(i[s] + 256 * i[s + 1]);
            return r
        }
        function C(e, t, n) {
            if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
            if (e + t > n)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function O(e, t, n, i, r, s) {
            if (!c.isBuffer(e))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > r || t < s)
                throw new RangeError('"value" argument is out of bounds');
            if (n + i > e.length)
                throw new RangeError("Index out of range")
        }
        function R(e, t, n, i) {
            t < 0 && (t = 65535 + t + 1);
            for (var r = 0, s = Math.min(e.length - n, 2); r < s; ++r)
                e[n + r] = (t & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
        }
        function j(e, t, n, i) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var r = 0, s = Math.min(e.length - n, 4); r < s; ++r)
                e[n + r] = t >>> 8 * (i ? r : 3 - r) & 255
        }
        function _(e, t, n, i, r, s) {
            if (n + i > e.length)
                throw new RangeError("Index out of range");
            if (n < 0)
                throw new RangeError("Index out of range")
        }
        function U(e, t, n, i, s) {
            return s || _(e, 0, n, 4),
            r.write(e, t, n, i, 23, 4),
            n + 4
        }
        function D(e, t, n, i, s) {
            return s || _(e, 0, n, 8),
            r.write(e, t, n, i, 52, 8),
            n + 8
        }
        c.prototype.slice = function(e, t) {
            var n, i = this.length;
            if ((e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
            (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
            t < e && (t = e),
            c.TYPED_ARRAY_SUPPORT)
                (n = this.subarray(e, t)).__proto__ = c.prototype;
            else {
                var r = t - e;
                n = new c(r,void 0);
                for (var s = 0; s < r; ++s)
                    n[s] = this[s + e]
            }
            return n
        }
        ,
        c.prototype.readUIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || C(e, t, this.length);
            for (var i = this[e], r = 1, s = 0; ++s < t && (r *= 256); )
                i += this[e + s] * r;
            return i
        }
        ,
        c.prototype.readUIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || C(e, t, this.length);
            for (var i = this[e + --t], r = 1; t > 0 && (r *= 256); )
                i += this[e + --t] * r;
            return i
        }
        ,
        c.prototype.readUInt8 = function(e, t) {
            return t || C(e, 1, this.length),
            this[e]
        }
        ,
        c.prototype.readUInt16LE = function(e, t) {
            return t || C(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ,
        c.prototype.readUInt16BE = function(e, t) {
            return t || C(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ,
        c.prototype.readUInt32LE = function(e, t) {
            return t || C(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }
        ,
        c.prototype.readUInt32BE = function(e, t) {
            return t || C(e, 4, this.length),
            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ,
        c.prototype.readIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || C(e, t, this.length);
            for (var i = this[e], r = 1, s = 0; ++s < t && (r *= 256); )
                i += this[e + s] * r;
            return i >= (r *= 128) && (i -= Math.pow(2, 8 * t)),
            i
        }
        ,
        c.prototype.readIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || C(e, t, this.length);
            for (var i = t, r = 1, s = this[e + --i]; i > 0 && (r *= 256); )
                s += this[e + --i] * r;
            return s >= (r *= 128) && (s -= Math.pow(2, 8 * t)),
            s
        }
        ,
        c.prototype.readInt8 = function(e, t) {
            return t || C(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }
        ,
        c.prototype.readInt16LE = function(e, t) {
            t || C(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        c.prototype.readInt16BE = function(e, t) {
            t || C(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        c.prototype.readInt32LE = function(e, t) {
            return t || C(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ,
        c.prototype.readInt32BE = function(e, t) {
            return t || C(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ,
        c.prototype.readFloatLE = function(e, t) {
            return t || C(e, 4, this.length),
            r.read(this, e, !0, 23, 4)
        }
        ,
        c.prototype.readFloatBE = function(e, t) {
            return t || C(e, 4, this.length),
            r.read(this, e, !1, 23, 4)
        }
        ,
        c.prototype.readDoubleLE = function(e, t) {
            return t || C(e, 8, this.length),
            r.read(this, e, !0, 52, 8)
        }
        ,
        c.prototype.readDoubleBE = function(e, t) {
            return t || C(e, 8, this.length),
            r.read(this, e, !1, 52, 8)
        }
        ,
        c.prototype.writeUIntLE = function(e, t, n, i) {
            e = +e,
            t |= 0,
            n |= 0,
            i || O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var r = 1
              , s = 0;
            for (this[t] = 255 & e; ++s < n && (r *= 256); )
                this[t + s] = e / r & 255;
            return t + n
        }
        ,
        c.prototype.writeUIntBE = function(e, t, n, i) {
            e = +e,
            t |= 0,
            n |= 0,
            i || O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var r = n - 1
              , s = 1;
            for (this[t + r] = 255 & e; --r >= 0 && (s *= 256); )
                this[t + r] = e / s & 255;
            return t + n
        }
        ,
        c.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 1, 255, 0),
            c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            this[t] = 255 & e,
            t + 1
        }
        ,
        c.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 65535, 0),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8) : R(this, e, t, !0),
            t + 2
        }
        ,
        c.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 65535, 0),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
            this[t + 1] = 255 & e) : R(this, e, t, !1),
            t + 2
        }
        ,
        c.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = 255 & e) : j(this, e, t, !0),
            t + 4
        }
        ,
        c.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e) : j(this, e, t, !1),
            t + 4
        }
        ,
        c.prototype.writeIntLE = function(e, t, n, i) {
            if (e = +e,
            t |= 0,
            !i) {
                var r = Math.pow(2, 8 * n - 1);
                O(this, e, t, n, r - 1, -r)
            }
            var s = 0
              , a = 1
              , o = 0;
            for (this[t] = 255 & e; ++s < n && (a *= 256); )
                e < 0 && 0 === o && 0 !== this[t + s - 1] && (o = 1),
                this[t + s] = (e / a >> 0) - o & 255;
            return t + n
        }
        ,
        c.prototype.writeIntBE = function(e, t, n, i) {
            if (e = +e,
            t |= 0,
            !i) {
                var r = Math.pow(2, 8 * n - 1);
                O(this, e, t, n, r - 1, -r)
            }
            var s = n - 1
              , a = 1
              , o = 0;
            for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
                e < 0 && 0 === o && 0 !== this[t + s + 1] && (o = 1),
                this[t + s] = (e / a >> 0) - o & 255;
            return t + n
        }
        ,
        c.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 1, 127, -128),
            c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            this[t] = 255 & e,
            t + 1
        }
        ,
        c.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 32767, -32768),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8) : R(this, e, t, !0),
            t + 2
        }
        ,
        c.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 32767, -32768),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
            this[t + 1] = 255 & e) : R(this, e, t, !1),
            t + 2
        }
        ,
        c.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 2147483647, -2147483648),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24) : j(this, e, t, !0),
            t + 4
        }
        ,
        c.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e) : j(this, e, t, !1),
            t + 4
        }
        ,
        c.prototype.writeFloatLE = function(e, t, n) {
            return U(this, e, t, !0, n)
        }
        ,
        c.prototype.writeFloatBE = function(e, t, n) {
            return U(this, e, t, !1, n)
        }
        ,
        c.prototype.writeDoubleLE = function(e, t, n) {
            return D(this, e, t, !0, n)
        }
        ,
        c.prototype.writeDoubleBE = function(e, t, n) {
            return D(this, e, t, !1, n)
        }
        ,
        c.prototype.copy = function(e, t, n, i) {
            if (n || (n = 0),
            i || 0 === i || (i = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            i > 0 && i < n && (i = n),
            i === n)
                return 0;
            if (0 === e.length || 0 === this.length)
                return 0;
            if (t < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (i < 0)
                throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length),
            e.length - t < i - n && (i = e.length - t + n);
            var r, s = i - n;
            if (this === e && n < t && t < i)
                for (r = s - 1; r >= 0; --r)
                    e[r + t] = this[r + n];
            else if (s < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                for (r = 0; r < s; ++r)
                    e[r + t] = this[r + n];
            else
                Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
            return s
        }
        ,
        c.prototype.fill = function(e, t, n, i) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (i = t,
                t = 0,
                n = this.length) : "string" == typeof n && (i = n,
                n = this.length),
                1 === e.length) {
                    var r = e.charCodeAt(0);
                    r < 256 && (e = r)
                }
                if (void 0 !== i && "string" != typeof i)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof i && !c.isEncoding(i))
                    throw new TypeError("Unknown encoding: " + i)
            } else
                "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= t)
                return this;
            var s;
            if (t >>>= 0,
            n = void 0 === n ? this.length : n >>> 0,
            e || (e = 0),
            "number" == typeof e)
                for (s = t; s < n; ++s)
                    this[s] = e;
            else {
                var a = c.isBuffer(e) ? e : z(new c(e,i).toString())
                  , o = a.length;
                for (s = 0; s < n - t; ++s)
                    this[s + t] = a[s % o]
            }
            return this
        }
        ;
        var L = /[^+\/0-9A-Za-z-_]/g;
        function F(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }
        function z(e, t) {
            var n;
            t = t || 1 / 0;
            for (var i = e.length, r = null, s = [], a = 0; a < i; ++a) {
                if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                    if (!r) {
                        if (n > 56319) {
                            (t -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === i) {
                            (t -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        r = n;
                        continue
                    }
                    if (n < 56320) {
                        (t -= 3) > -1 && s.push(239, 191, 189),
                        r = n;
                        continue
                    }
                    n = 65536 + (r - 55296 << 10 | n - 56320)
                } else
                    r && (t -= 3) > -1 && s.push(239, 191, 189);
                if (r = null,
                n < 128) {
                    if ((t -= 1) < 0)
                        break;
                    s.push(n)
                } else if (n < 2048) {
                    if ((t -= 2) < 0)
                        break;
                    s.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((t -= 3) < 0)
                        break;
                    s.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112))
                        throw new Error("Invalid code point");
                    if ((t -= 4) < 0)
                        break;
                    s.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return s
        }
        function H(e) {
            return i.toByteArray(function(e) {
                if ((e = function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }(e).replace(L, "")).length < 2)
                    return "";
                for (; e.length % 4 != 0; )
                    e += "=";
                return e
            }(e))
        }
        function V(e, t, n, i) {
            for (var r = 0; r < i && !(r + n >= t.length || r >= e.length); ++r)
                t[r + n] = e[r];
            return r
        }
    }
    ).call(this, n(12))
}
, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}
, function(e, t) {
    for (var n = t.uint8 = new Array(256), i = 0; i <= 255; i++)
        n[i] = r(i);
    function r(e) {
        return function(t) {
            var n = t.reserve(1);
            t.buffer[n] = e
        }
    }
}
, function(e, t, n) {
    t.FlexDecoder = s,
    t.FlexEncoder = a;
    var i = n(0)
      , r = "BUFFER_SHORTAGE";
    function s() {
        if (!(this instanceof s))
            return new s
    }
    function a() {
        if (!(this instanceof a))
            return new a
    }
    function o() {
        throw new Error("method not implemented: write()")
    }
    function c() {
        throw new Error("method not implemented: fetch()")
    }
    function l() {
        return this.buffers && this.buffers.length ? (this.flush(),
        this.pull()) : this.fetch()
    }
    function h(e) {
        (this.buffers || (this.buffers = [])).push(e)
    }
    function u() {
        return (this.buffers || (this.buffers = [])).shift()
    }
    function f(e) {
        return function(t) {
            for (var n in e)
                t[n] = e[n];
            return t
        }
    }
    s.mixin = f({
        bufferish: i,
        write: function(e) {
            var t = this.offset ? i.prototype.slice.call(this.buffer, this.offset) : this.buffer;
            this.buffer = t ? e ? this.bufferish.concat([t, e]) : t : e,
            this.offset = 0
        },
        fetch: c,
        flush: function() {
            for (; this.offset < this.buffer.length; ) {
                var e, t = this.offset;
                try {
                    e = this.fetch()
                } catch (e) {
                    if (e && e.message != r)
                        throw e;
                    this.offset = t;
                    break
                }
                this.push(e)
            }
        },
        push: h,
        pull: u,
        read: l,
        reserve: function(e) {
            var t = this.offset
              , n = t + e;
            if (n > this.buffer.length)
                throw new Error(r);
            return this.offset = n,
            t
        },
        offset: 0
    }),
    s.mixin(s.prototype),
    a.mixin = f({
        bufferish: i,
        write: o,
        fetch: function() {
            var e = this.start;
            if (e < this.offset) {
                var t = this.start = this.offset;
                return i.prototype.slice.call(this.buffer, e, t)
            }
        },
        flush: function() {
            for (; this.start < this.offset; ) {
                var e = this.fetch();
                e && this.push(e)
            }
        },
        push: h,
        pull: function() {
            var e = this.buffers || (this.buffers = [])
              , t = e.length > 1 ? this.bufferish.concat(e) : e[0];
            return e.length = 0,
            t
        },
        read: l,
        reserve: function(e) {
            var t = 0 | e;
            if (this.buffer) {
                var n = this.buffer.length
                  , i = 0 | this.offset
                  , r = i + t;
                if (r < n)
                    return this.offset = r,
                    i;
                this.flush(),
                e = Math.max(e, Math.min(2 * n, this.maxBufferSize))
            }
            return e = Math.max(e, this.minBufferSize),
            this.buffer = this.bufferish.alloc(e),
            this.start = 0,
            this.offset = t,
            0
        },
        send: function(e) {
            var t = e.length;
            if (t > this.minBufferSize)
                this.flush(),
                this.push(e);
            else {
                var n = this.reserve(t);
                i.prototype.copy.call(e, this.buffer, n)
            }
        },
        maxBufferSize: 65536,
        minBufferSize: 2048,
        offset: 0,
        start: 0
    }),
    a.mixin(a.prototype)
}
, function(e, t, n) {
    t.decode = function(e, t) {
        var n = new i(t);
        return n.write(e),
        n.read()
    }
    ;
    var i = n(16).DecodeBuffer
}
, function(e, t, n) {
    t.DecodeBuffer = r;
    var i = n(8).preset;
    function r(e) {
        if (!(this instanceof r))
            return new r(e);
        if (e && (this.options = e,
        e.codec)) {
            var t = this.codec = e.codec;
            t.bufferish && (this.bufferish = t.bufferish)
        }
    }
    n(14).FlexDecoder.mixin(r.prototype),
    r.prototype.codec = i,
    r.prototype.fetch = function() {
        return this.codec.decode(this)
    }
}
, function(e, t, n) {
    var i = n(4)
      , r = n(7)
      , s = r.Uint64BE
      , a = r.Int64BE;
    t.getReadFormat = function(e) {
        var t = o.hasArrayBuffer && e && e.binarraybuffer
          , n = e && e.int64;
        return {
            map: l && e && e.usemap ? u : h,
            array: f,
            str: d,
            bin: t ? g : p,
            ext: m,
            uint8: y,
            uint16: v,
            uint32: b,
            uint64: S(8, n ? E : T),
            int8: k,
            int16: w,
            int32: x,
            int64: S(8, n ? M : I),
            float32: S(4, A),
            float64: S(8, P)
        }
    }
    ,
    t.readUint8 = y;
    var o = n(0)
      , c = n(6)
      , l = "undefined" != typeof Map;
    function h(e, t) {
        var n, i = {}, r = new Array(t), s = new Array(t), a = e.codec.decode;
        for (n = 0; n < t; n++)
            r[n] = a(e),
            s[n] = a(e);
        for (n = 0; n < t; n++)
            i[r[n]] = s[n];
        return i
    }
    function u(e, t) {
        var n, i = new Map, r = new Array(t), s = new Array(t), a = e.codec.decode;
        for (n = 0; n < t; n++)
            r[n] = a(e),
            s[n] = a(e);
        for (n = 0; n < t; n++)
            i.set(r[n], s[n]);
        return i
    }
    function f(e, t) {
        for (var n = new Array(t), i = e.codec.decode, r = 0; r < t; r++)
            n[r] = i(e);
        return n
    }
    function d(e, t) {
        var n = e.reserve(t)
          , i = n + t;
        return c.toString.call(e.buffer, "utf-8", n, i)
    }
    function p(e, t) {
        var n = e.reserve(t)
          , i = n + t
          , r = c.slice.call(e.buffer, n, i);
        return o.from(r)
    }
    function g(e, t) {
        var n = e.reserve(t)
          , i = n + t
          , r = c.slice.call(e.buffer, n, i);
        return o.Uint8Array.from(r).buffer
    }
    function m(e, t) {
        var n = e.reserve(t + 1)
          , i = e.buffer[n++]
          , r = n + t
          , s = e.codec.getExtUnpacker(i);
        if (!s)
            throw new Error("Invalid ext type: " + (i ? "0x" + i.toString(16) : i));
        return s(c.slice.call(e.buffer, n, r))
    }
    function y(e) {
        var t = e.reserve(1);
        return e.buffer[t]
    }
    function k(e) {
        var t = e.reserve(1)
          , n = e.buffer[t];
        return 128 & n ? n - 256 : n
    }
    function v(e) {
        var t = e.reserve(2)
          , n = e.buffer;
        return n[t++] << 8 | n[t]
    }
    function w(e) {
        var t = e.reserve(2)
          , n = e.buffer
          , i = n[t++] << 8 | n[t];
        return 32768 & i ? i - 65536 : i
    }
    function b(e) {
        var t = e.reserve(4)
          , n = e.buffer;
        return 16777216 * n[t++] + (n[t++] << 16) + (n[t++] << 8) + n[t]
    }
    function x(e) {
        var t = e.reserve(4)
          , n = e.buffer;
        return n[t++] << 24 | n[t++] << 16 | n[t++] << 8 | n[t]
    }
    function S(e, t) {
        return function(n) {
            var i = n.reserve(e);
            return t.call(n.buffer, i, !0)
        }
    }
    function T(e) {
        return new s(this,e).toNumber()
    }
    function I(e) {
        return new a(this,e).toNumber()
    }
    function E(e) {
        return new s(this,e)
    }
    function M(e) {
        return new a(this,e)
    }
    function A(e) {
        return i.read(this, e, !1, 23, 4)
    }
    function P(e) {
        return i.read(this, e, !1, 52, 8)
    }
}
, function(e, t, n) {
    !function(t) {
        e.exports = t;
        var n = "listeners"
          , i = {
            on: function(e, t) {
                return a(this, e).push(t),
                this
            },
            once: function(e, t) {
                var n = this;
                return i.originalListener = t,
                a(n, e).push(i),
                n;
                function i() {
                    s.call(n, e, i),
                    t.apply(this, arguments)
                }
            },
            off: s,
            emit: function(e, t) {
                var n = this
                  , i = a(n, e, !0);
                if (!i)
                    return !1;
                var r = arguments.length;
                if (1 === r)
                    i.forEach((function(e) {
                        e.call(n)
                    }
                    ));
                else if (2 === r)
                    i.forEach((function(e) {
                        e.call(n, t)
                    }
                    ));
                else {
                    var s = Array.prototype.slice.call(arguments, 1);
                    i.forEach((function(e) {
                        e.apply(n, s)
                    }
                    ))
                }
                return !!i.length
            }
        };
        function r(e) {
            for (var t in i)
                e[t] = i[t];
            return e
        }
        function s(e, t) {
            var i;
            if (arguments.length) {
                if (t) {
                    if (i = a(this, e, !0)) {
                        if (!(i = i.filter((function(e) {
                            return e !== t && e.originalListener !== t
                        }
                        ))).length)
                            return s.call(this, e);
                        this[n][e] = i
                    }
                } else if ((i = this[n]) && (delete i[e],
                !Object.keys(i).length))
                    return s.call(this)
            } else
                delete this[n];
            return this
        }
        function a(e, t, i) {
            if (!i || e[n]) {
                var r = e[n] || (e[n] = {});
                return r[t] || (r[t] = [])
            }
        }
        r(t.prototype),
        t.mixin = r
    }((/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */
    function e() {
        if (!(this instanceof e))
            return new e
    }
    ))
}
, function(e, t, n) {
    (function(t) {
        e.exports.maxScreenWidth = 1920,
        e.exports.maxScreenHeight = 1080,
        e.exports.serverUpdateRate = 9,
        e.exports.maxPlayers = 50,
        e.exports.maxPlayersHard = 50,
        e.exports.collisionDepth = 6,
        e.exports.minimapRate = 3e3,
        e.exports.colGrid = 10,
        e.exports.clientSendRate = 5,
        e.exports.healthBarWidth = 50,
        e.exports.healthBarPad = 4.5,
        e.exports.reloadBarWidth = 22,
        e.exports.iconPadding = 15,
        e.exports.iconPad = .9,
        e.exports.deathFadeout = 3e3,
        e.exports.crownIconScale = 60,
        e.exports.crownPad = 35,
        e.exports.chatCountdown = 3e3,
        e.exports.chatCooldown = 500,
        e.exports.inSandbox = t && "mm_exp" === t.env.VULTR_SCHEME,
        e.exports.maxAge = 100,
        e.exports.gatherAngle = Math.PI / 2.6,
        e.exports.gatherWiggle = 10,
        e.exports.hitReturnRatio = .25,
        e.exports.hitAngle = Math.PI / 2,
        e.exports.playerScale = 35,
        e.exports.playerSpeed = .0016,
        e.exports.playerDecel = .993,
        e.exports.nameY = 34,
        e.exports.skinColors = ["'constructor", "'constructor", "'constructor", "'constructor", "'constructor", "'constructor", "'constructor", "'constructor", "'constructor", "'constructor"],
        e.exports.animalCount = 7,
        e.exports.aiTurnRandom = .06,
        e.exports.cowNames = ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"],
        e.exports.shieldAngle = Math.PI / 3,
        e.exports.weaponVariants = [{
            id: 0,
            src: "",
            xp: 0,
            val: 1
        }, {
            id: 1,
            src: "_g",
            xp: 3e3,
            val: 1.1
        }, {
            id: 2,
            src: "_d",
            xp: 7e3,
            val: 1.18
        }, {
            id: 3,
            src: "_r",
            poison: !0,
            xp: 12e3,
            val: 1.18
        }],
        e.exports.fetchVariant = function(t) {
            for (var n = t.weaponXP[t.weaponIndex] || 0, i = e.exports.weaponVariants.length - 1; i >= 0; --i)
                if (n >= e.exports.weaponVariants[i].xp)
                    return e.exports.weaponVariants[i]
        }
        ,
        e.exports.resourceTypes = ["wood", "food", "stone", "points"],
        e.exports.areaCount = 7,
        e.exports.treesPerArea = 9,
        e.exports.bushesPerArea = 3,
        e.exports.totalRocks = 32,
        e.exports.goldOres = 7,
        e.exports.riverWidth = 724,
        e.exports.riverPadding = 114,
        e.exports.waterCurrent = .0011,
        e.exports.waveSpeed = 1e-4,
        e.exports.waveMax = 1.3,
        e.exports.treeScales = [150, 160, 165, 175],
        e.exports.bushScales = [80, 85, 95],
        e.exports.rockScales = [80, 85, 90],
        e.exports.snowBiomeTop = 2400,
        e.exports.snowSpeed = .75,
        e.exports.maxNameLength = 15,
        e.exports.mapScale = 14400,
        e.exports.mapPingScale = 40,
        e.exports.mapPingTime = 2200
    }
    ).call(this, n(41))
}
, function(e, t) {
    var n = {
        utf8: {
            stringToBytes: function(e) {
                return n.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(n.bin.bytesToString(e)))
            }
        },
        bin: {
            stringToBytes: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push(255 & e.charCodeAt(n));
                return t
            },
            bytesToString: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push(String.fromCharCode(e[n]));
                return t.join("")
            }
        }
    };
    e.exports = n
}
, function(e, t, n) {
    "use strict";
    window.loadedScript = !0;
    var i = "127.0.0.1" !== location.hostname && !location.hostname.startsWith("192.168.");
    n(22);
    var r = n(23)
      , s = n(42)
      , a = n(43)
      , o = n(19)
      , c = n(44)
      , l = n(45)
      , h = (n(46),
    n(47))
      , u = n(48)
      , f = n(55)
      , d = n(56)
      , p = n(57)
      , g = n(58).obj
      , m = new a.TextManager
    , y = new (n(59))("moomoo.IO",3e3,o.maxPlayers,5,!1);
    y.debugLog = !1;
    var k = !1;
    function v() {
        ht && ut && (k = !0,
        i ? window.grecaptcha.execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {
            action: "homepage"
        }).then((function(e) {
            w(e)
        }
        )) : w(null))
    }
    function w(e) {
        y.start((function(t, n, a) {
            var c = (i ? "wss" : "ws") + "://" + t + ":8008/?gameIndex=" + a;
            e && (c += "&token=" + encodeURIComponent(e)),
            r.connect(c, (function(e) {
                Bi(),
                setInterval(()=>Bi(), 1000),
                e ? ft(e) : (ue.onclick = s.checkTrusted((function() {
                    !function() {
                        var e = ++bt > 1
                          , t = Date.now() - wt > vt;
                        e && t ? (wt = Date.now(),
                        xt()) : Tn()
                    }()
                }
                )),
                s.hookTouchEvents(ue),
                fe.onclick = s.checkTrusted((function() {
                    Oi("https://krunker.io")
                }
                )),
                s.hookTouchEvents(fe),
                pe.onclick = s.checkTrusted((function() {
                    setTimeout((function() {
                        !function() {
                            var e = xe.value
                              , t = prompt("party key", e);
                            t && (window.onbeforeunload = void 0,
                            window.location.href = "/?server=" + t)
                        }()
                    }
                    ), 10)
                }
                )),
                s.hookTouchEvents(pe),
                ge.onclick = s.checkTrusted((function() {
                    Ae.classList.contains("showing") ? (Ae.classList.remove("showing"),
                    me.innerText = "Settings") : (Ae.classList.add("showing"),
                    me.innerText = "Close")
                }
                )),
                s.hookTouchEvents(ge),
                ye.onclick = s.checkTrusted((function() {
                    yn(),
                    "block" != Ye.style.display ? Ut() : Ye.style.display = "none"
                }
                )),
                s.hookTouchEvents(ye),
                ke.onclick = s.checkTrusted((function() {
                    "block" != Qe.style.display ? (Qe.style.display = "block",
                    Ye.style.display = "none",
                    an(),
                    Gt()) : Qe.style.display = "none"
                }
                )),
                s.hookTouchEvents(ke),
                ve.onclick = s.checkTrusted((function() {
                    rn()
                }
                )),
                s.hookTouchEvents(ve),
                Ne.onclick = s.checkTrusted((function() {
                    xn()
                }
       )),
                s.hookTouchEvents(Ne),
                function() {
                    for (var e = 0; e < jn.length; ++e) {
                        var t = new Image;
                        t.onload = function() {
                            this.isLoaded = !0
                        }
                        ,
                        t.src = jn[e] == "crosshair" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Crosshairs_Red.svg/1200px-Crosshairs_Red.svg.png" : ".././img/icons/" + jn[e] + ".png",
                        Rn[jn[e]] = t
                    }
                }(),
                Pe.style.display = "none",
                Me.style.display = "block",
                Le.value = E("moo_name") || "",
                function() {
                    var e = E("native_resolution") || 1;
                    Zt(e ? "true" == e : "undefined" != typeof cordova),
                    A = "true" == E("show_ping"),
                    Ie.hidden = !A,
                    E("moo_moosic"),
                    setInterval((function() {
                        window.cordova && (document.getElementById("downloadButtonContainer").classList.add("cordova"),
                        document.getElementById("mobileDownloadButtonContainer").classList.add("cordova"))
                    }
                    ), 1e3),
                    en(),
                    s.removeAllChildren(Ce);
                    for (var t = 0; t < l.weapons.length + l.list.length; ++t)
                        !function(e) {
                            s.generateElement({
                                id: "actionBarItem" + e,
                                class: "actionBarItem",
                                style: "display:none",
                                onmouseout: function() {
                                    Tt()
                                },
                                parent: Ce
                            })
                        }(t);
                    for (t = 0; t < l.list.length + l.weapons.length; ++t)
                        !function(e) {
                            var t = document.createElement("canvas");
                            t.width = t.height = 66;
                            var n = t.getContext("2d");
                            if (n.translate(t.width / 2, t.height / 2),
                            n.imageSmoothingEnabled = !1,
                            n.webkitImageSmoothingEnabled = !1,
                            n.mozImageSmoothingEnabled = !1,
                            l.weapons[e]) {
                                n.rotate(Math.PI / 4 + Math.PI);
                                var i = new Image;
                                Zn[l.weapons[e].src] = i,
                                i.onload = function() {
                                    this.isLoaded = !0;
                                    var i = 1 / (this.height / this.width)
                                      , r = l.weapons[e].iPad || 1;
                                    n.drawImage(this, -t.width * r * o.iconPad * i / 2, -t.height * r * o.iconPad / 2, t.width * r * i * o.iconPad, t.height * r * o.iconPad),
                                    n.fillStyle = "rgba(0, 0, 70, 0.1)",
                                    n.globalCompositeOperation = "source-atop",
                                    n.fillRect(-t.width / 2, -t.height / 2, t.width, t.height),
                                    document.getElementById("actionBarItem" + e).style.backgroundImage = "url(" + t.toDataURL() + ")"
                                }
                                ,
                                i.src = ".././img/weapons/" + l.weapons[e].src + ".png",
                                (r = document.getElementById("actionBarItem" + e)).onmouseover = s.checkTrusted((function() {
                                    Tt(l.weapons[e], !0)
                                }
                                )),
                                r.onclick = s.checkTrusted((function() {
                                    Sn(e, !0)
                                }
                                )),
                                s.hookTouchEvents(r)
                            } else {
                                i = ri(l.list[e - l.weapons.length], !0);
                                var r, a = Math.min(t.width - o.iconPadding, i.width);
                                n.globalAlpha = 1,
                                n.drawImage(i, -a / 2, -a / 2, a, a),
                                n.fillStyle = "rgba(0, 0, 70, 0.1)",
                                n.globalCompositeOperation = "source-atop",
                                n.fillRect(-a / 2, -a / 2, a, a),
                                document.getElementById("actionBarItem" + e).style.backgroundImage = "url(" + t.toDataURL() + ")",
                                (r = document.getElementById("actionBarItem" + e)).onmouseover = s.checkTrusted((function() {
                                    Tt(l.list[e - l.weapons.length])
                                }
                                )),
                                r.onclick = s.checkTrusted((function() {
                                    Sn(e - l.weapons.length)
                                }
                                )),
                                s.hookTouchEvents(r)
                            }
                        }(t);
                    Le.ontouchstart = s.checkTrusted((function(e) {
                        e.preventDefault();
                        var t = prompt("enter name", e.currentTarget.value);
                        e.currentTarget.value = t.slice(0, 15)
                    }
                    )),
                    Se.checked = M,
                    Se.onchange = s.checkTrusted((function(e) {
                        Zt(e.target.checked)
                    }
                    )),
                    Te.checked = A,
                    Te.onchange = s.checkTrusted((function(e) {
                        A = Te.checked,
                        Ie.hidden = !A,
                        I("show_ping", A ? "true" : "false")
                    }
                    ))
                }())
            }
            ), {
                id: st,
                d: ft,
                1: En,
                2: vi,
                4: wi,
                33: Ti,
                5: Ln,
                6: li,
                a: gi,
                aa: pi,
                7: Wn,
                8: hi,
                sp: ui,
                9: xi,
                h: Si,
                11: Pn,
                12: Cn,
                13: Bn,
                14: bi,
                15: Dn,
                16: Un,
                17: $t,
                18: fi,
                19: di,
                20: Ci,
                ac: Ot,
                ad: _t,
                an: Bt,
                st: Rt,
                sa: jt,
                us: Nt,
                ch: hn,
                mm: Wt,
                t: Mn,
                p: Yt,
                pp: Pi
            }),
            pt(),
            setTimeout(()=>gt(), 3e3)
        }
        ), (function(e) {
            console.error("Vultr error:", e),
            alert("Error:\n" + e),
            ft("disconnected")
        }
        ))
    }
    var b, x = new g(o,s), S = Math.PI, T = 2 * S;
    function I(e, t) {
        b && localStorage.setItem(e, t)
    }
    function E(e) {
        return b ? localStorage.getItem(e) : null
    }
    Math.lerpAngle = function(e, t, n) {
        Math.abs(t - e) > S && (e > t ? t += T : e += T);
        var i = t + (e - t) * n;
        return i >= 0 && i <= T ? i : i % T
    }
    ,
    CanvasRenderingContext2D.prototype.roundRect = function(e, t, n, i, r) {
        return n < 2 * r && (r = n / 2),
        i < 2 * r && (r = i / 2),
        r < 0 && (r = 0),
        this.beginPath(),
        this.moveTo(e + r, t),
        this.arcTo(e + n, t, e + n, t + i, r),
        this.arcTo(e + n, t + i, e, t + i, r),
        this.arcTo(e, t + i, e, t, r),
        this.arcTo(e, t, e + n, t, r),
        this.closePath(),
        this
    }
    ,
    "undefined" != typeof Storage && (b = !0)
    var M, A, P, B, C, O, R, j, _, U, D, L, F, z, H = E("moofoll"), V = 1, q = Date.now(), Y = [], W = [], X = [], N = [], G = [], J = new p(d,G,W,Y,nt,l,o,s), K = n(70), Q = n(71), Z = new K(Y,Q,W,l,null,o,s), ee = 1, te = 0, ne = 0, ie = 0, re = {
        id: -1,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
    }, se = {
        id: -1,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
    }, ae = 0, oe = o.maxScreenWidth, ce = o.maxScreenHeight, le = !1, he = (document.getElementById("ad-container"),
    document.getElementById("mainMenu")), ue = document.getElementById("enterGame"), fe = document.getElementById("promoImg"), de = document.getElementById("partyButton"), pe = document.getElementById("joinPartyButton"), ge = document.getElementById("settingsButton"), me = ge.getElementsByTagName("span")[0], ye = document.getElementById("allianceButton"), ke = document.getElementById("storeButton"), ve = document.getElementById("chatButton"), we = document.getElementById("gameCanvas"), be = we.getContext("2d"), xe = document.getElementById("serverBrowser"), Se = document.getElementById("nativeResolution"), Te = document.getElementById("showPing"), Ie = (document.getElementById("playMusic"),
    document.getElementById("pingDisplay")), Ee = document.getElementById("shutdownDisplay"), Me = document.getElementById("menuCardHolder"), Ae = document.getElementById("guideCard"), Pe = document.getElementById("loadingText"), Be = document.getElementById("gameUI"), Ce = document.getElementById("actionBar"), Oe = document.getElementById("scoreDisplay"), Re = document.getElementById("foodDisplay"), je = document.getElementById("woodDisplay"), _e = document.getElementById("stoneDisplay"), Ue = document.getElementById("killCounter"), De = document.getElementById("leaderboardData"), Le = document.getElementById("nameInput"), Fe = document.getElementById("itemInfoHolder"), ze = document.getElementById("ageText"), He = document.getElementById("ageBarBody"), Ve = document.getElementById("upgradeHolder"), qe = document.getElementById("upgradeCounter"), Ye = document.getElementById("allianceMenu"), We = document.getElementById("allianceHolder"), Xe = document.getElementById("allianceManager"), Ne = document.getElementById("mapDisplay"), Ge = document.getElementById("diedText"), Je = document.getElementById("skinColorHolder"), Ke = Ne.getContext("2d");
    Ne.width = 300,
    Ne.height = 300;
    var Qe = document.getElementById("storeMenu")
      , $e = document.getElementById("storeHolder")
      , Ze = document.getElementById("noticationDisplay")
      , et = f.hats
      , tt = f.accessories
      , nt = new h(c,N,s,o)
      , it = "#525252"
      , rt = "#3d3f42";
    $e.style.height = "500px";
    function st(e) {
        X = e.teams
    }
    var at = document.getElementById("featuredYoutube")
    , ct = {
        name: "giga chad",
        link: "https://www.youtube.com/channel/UCAenpfQHRYjJhZGdb3u202Q"
    };
    at.innerHTML = "<a target='_blank' class='ytLink' href='" + ct.link + "'><i class='material-icons' style='vertical-align: top;'>&#xE064;</i> " + ct.name + "</a>";
    var lt = !0
      , ht = !1
      , ut = !1;
    function ft(e) {
        r.close(),
        dt(e)
    }
    function dt(e) {
        he.style.display = "block",
        Be.style.display = "none",
        Me.style.display = "none",
        Ge.style.display = "none",
        Pe.style.display = "block",
        Pe.innerHTML = e + "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>"
    }
    window.onblur = function() {
        lt = !1
    }
    ,
    window.onfocus = function() {
        lt = !0,
        R && R.alive && yn()
    }
    ,
    window.onload = function() {
        ht = !0,
        v(),
        setTimeout((function() {
            k || (alert("Captcha failed to load"),
            window.location.reload())
        }
        ), 2e4)
    }
    ,
    window.captchaCallback = function() {
        ut = !0,
            v()
    }
    ,
    we.oncontextmenu = function() {
        return !1
    }
    ;
    function pt() {
        var e, t, n = "", i = 0;
        for (var r in y.servers) {
            for (var s = y.servers[r], a = 0, c = 0; c < s.length; c++)
                for (var l = 0; l < s[c].games.length; l++)
                    a += s[c].games[l].playerCount;
            i += a;
            var h = y.regionInfo[r].name;
            n += "<option disabled>" + h + " - " + a + " players</option>";
            for (var u = 0; u < s.length; u++)
                for (var f = s[u], d = 0; d < f.games.length; d++) {
                    var p = f.games[d]
                      , g = 1 * f.index + d + 1
                      , m = y.server && y.server.region === f.region && y.server.index === f.index && y.gameIndex == d
                      , k = h + " " + g + " [" + Math.min(p.playerCount, o.maxPlayers) + "/" + o.maxPlayers + "]";
                    let e = y.stripRegion(r) + ":" + u + ":" + d;
                    m && (de.getElementsByTagName("span")[0].innerText = e),
                    n += "<option value='" + e + "' " + (m ? "selected" : "") + ">" + k + "</option>"
                }
            n += "<option disabled></option>"
        }
        n += "<option disabled>All Servers - " + i + " players</option>",
        xe.innerHTML = n,
        "sandbox.moomoo.io" == location.hostname ? (e = "Back to MooMoo",
        t = "//moomoo.io/") : (e = "Try the sandbox",
        t = "//sandbox.moomoo.io/"),
        document.getElementById("altServer").innerHTML = "<a href='" + t + "'>" + e + "<i class='material-icons' style='font-size:10px;vertical-align:middle'>arrow_forward_ios</i></a>"
    }
    function gt() {
        var e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            4 == this.readyState && (200 == this.status ? (window.vultr = JSON.parse(this.responseText),
            y.processServers(vultr.servers),
            pt()) : console.error("Failed to load server data with status code:", this.status))
        }
        ,
        e.open("GET", "/serverData", !0),
        e.send()
    }
    xe.addEventListener("change", s.checkTrusted((function() {
        let e = xe.value.split(":");
        y.switchServer(e[0], e[1], e[2])
    }
    )));
    var mt = document.getElementById("pre-content-container")
      , yt = null
      , kt = null;
    var vt = 3e5
      , wt = 0
      , bt = 0;
    window.cpmstarAPI = function(e) {
        e.game.setTarget(mt),
        kt = e
    };
    function xt() {
        if (!cpmstarAPI || !kt)
            return console.log("Failed to load video ad API", !!cpmstarAPI, !!kt),
            void Tn();
        (yt = new kt.game.RewardedVideoView("rewardedvideo")).addEventListener("ad_closed", (function(e) {
            console.log("Video ad closed"),
            St()
        }
        )),
        yt.addEventListener("loaded", (function(e) {
            console.log("Video ad loaded"),
            yt.show()
        }
        )),
        yt.addEventListener("load_failed", (function(e) {
            console.log("Video ad load failed", e),
            St()
        }
        )),
        yt.load(),
        mt.style.display = "block"
    }
    function St() {
        mt.style.display = "none",
        Tn()
    }
    function Tt(e, t, n) {
        if (R && e)
            if (s.removeAllChildren(Fe),
            Fe.classList.add("visible"),
            s.generateElement({
                id: "itemInfoName",
                text: s.capitalizeFirst(e.name),
                parent: Fe
            }),
            s.generateElement({
                id: "itemInfoDesc",
                text: e.desc,
                parent: Fe
            }),
            n)
                ;
            else if (t)
                s.generateElement({
                    class: "itemInfoReq",
                    text: e.type ? "secondary" : "primary",
                    parent: Fe
                });
            else {
                for (var i = 0; i < e.req.length; i += 2)
                    s.generateElement({
                        class: "itemInfoReq",
                        html: e.req[i] + "<span class='itemInfoReqVal'> x" + e.req[i + 1] + "</span>",
                        parent: Fe
                    });
                e.group.limit && s.generateElement({
                    class: "itemInfoLmt",
                    text: (R.itemCounts[e.group.id] || 0) + "/" + e.group.limit,
                    parent: Fe
                })
            }
        else
            Fe.classList.remove("visible")
    }
    window.showPreAd = xt;
    function newwebsocket(url) {
        return new WebSocket(url);
    }
    var It, Et, Mt, At = [], Pt = [];
    function Bt(e, t) {
        At.push({
            sid: e,
            name: t
        }),
        Ct()
    }
    function Ct() {
        if (At[0]) {
            var e = At[0];
            s.removeAllChildren(Ze),
            Ze.style.display = "block",
            s.generateElement({
                class: "notificationText",
                text: e.name,
                parent: Ze
            }),
            s.generateElement({
                class: "notifButton",
                html: "<i class='material-icons' style='font-size:28px;color:white;'>&#xE14C;</i>",
                parent: Ze,
                onclick: function() {
                    Dt(0)
                },
                hookTouch: !0
            }),
            s.generateElement({
                class: "notifButton",
                html: "<i class='material-icons' style='font-size:28px;color:white;'>&#xE876;</i>",
                parent: Ze,
                onclick: function() {
                    Dt(1)
                },
                hookTouch: !0
            })
        } else
            Ze.style.display = "none"
    }
    function Ot(e) {
        X.push(e),
        "block" == Ye.style.display && Ut()
    }
    var oneTimeOpen = false;
    function Tn() {
        I(atob("bW9vX25hbWU="), Le.value);
        if (!le && r.connected) {
            le = true;
            x.stop(atob("bWVudQ==")), dt(atob("TG9hZGluZy4uLg=="));
            r.send(atob("c3A="), {
                name: Le.value,
                moofoll: 1,
                skin: "constructor"
            });
            if(oneTimeOpen == false) {
                oneTimeOpen = true;
                scriptMenu.style.display = "block";
            }
        }
    }
    function Rt(e, t) {
        R && (R.team = e,
        R.isOwner = t,
        "block" == Ye.style.display && Ut())
    }
    function jt(e) {
        Pt = e,
        "block" == Ye.style.display && Ut()
    }
    function _t(e) {
        for (var t = X.length - 1; t >= 0; t--)
            X[t].sid == e && X.splice(t, 1);
        "block" == Ye.style.display && Ut()
    }
    function Ut() {
        if (R && R.alive) {
            if (an(),
            Qe.style.display = "none",
            Ye.style.display = "block",
            s.removeAllChildren(We),
            R.team)
                for (var e = 0; e < Pt.length; e += 2)
                    !function(e) {
                        var t = s.generateElement({
                            class: "allianceItem",
                            style: "color:" + (Pt[e] == R.sid ? "#fff" : "rgba(255,255,255,0.6)"),
                            text: Pt[e + 1],
                            parent: We
                        });
                        R.isOwner && Pt[e] != R.sid && s.generateElement({
                            class: "joinAlBtn",
                            text: "Kick",
                            onclick: function() {
                                Lt(Pt[e])
                            },
                            hookTouch: !0,
                            parent: t
                        })
                    }(e);
            else if (X.length)
                for (e = 0; e < X.length; ++e)
                    !function(e) {
                        var t = s.generateElement({
                            class: "allianceItem",
                            style: "color:" + (X[e].sid == R.team ? "#fff" : "rgba(255,255,255,0.6)"),
                            text: X[e].sid,
                            parent: We
                        });
                        s.generateElement({
                            class: "joinAlBtn",
                            text: "Join",
                            onclick: function() {
                                Ft(e)
                            },
                            hookTouch: !0,
                            parent: t
                        })
                    }(e);
            else
                s.generateElement({
                    class: "allianceItem",
                    text: "No Tribes Yet",
                    parent: We
                });
            s.removeAllChildren(Xe),
            R.team ? s.generateElement({
                class: "allianceButtonM",
                style: "width: 360px",
                text: R.isOwner ? "Delete Tribe" : "Leave Tribe",
                onclick: function() {
                    Ht()
                },
                hookTouch: !0,
                parent: Xe
            }) : (s.generateElement({
                tag: "input",
                type: "text",
                id: "allianceInput",
                maxLength: 7,
                placeholder: "unique name",
                ontouchstart: function(e) {
                    e.preventDefault();
                    var t = prompt("unique name", e.currentTarget.value);
                    e.currentTarget.value = t.slice(0, 7)
                },
                parent: Xe
            }),
            s.generateElement({
                tag: "div",
                class: "allianceButtonM",
                style: "width: 140px;",
                text: "Create",
                onclick: function() {
                    zt()
                },
                hookTouch: !0,
                parent: Xe
            }))
        }
    }
    function Dt(e) {
        r.send("11", At[0].sid, e),
        At.splice(0, 1),
        Ct()
    }
    function Lt(e) {
        r.send("12", e)
    }
    function Ft(e) {
        r.send("10", X[e].sid)
    }
    function zt() {
        r.send("8", document.getElementById("allianceInput").value)
    }
    function Ht() {
        At = [],
        Pt = [],
        Ct(),
        r.send("9")
    }
    var Vt, qt = [];
    function Yt(e, t) {
        for (var n = 0; n < qt.length; ++n)
            if (!qt[n].active) {
                Vt = qt[n];
                break
            }
        Vt || (Vt = new function() {
            this.init = function(e, t) {
                this.scale = 0,
                this.x = e,
                this.y = t,
                this.active = !0
            }
            ,
            this.update = function(e, t) {
                this.active && (this.scale += .05 * t,
                this.scale >= o.mapPingScale ? this.active = !1 : (e.globalAlpha = 1 - Math.max(0, this.scale / o.mapPingScale),
                e.beginPath(),
                e.arc(this.x / o.mapScale * Ne.width, this.y / o.mapScale * Ne.width, this.scale, 0, 2 * Math.PI),
                e.stroke()))
            }
        }
        ,
        qt.push(Vt)),
        Vt.init(e, t)
        if(R.team && autoaim == false && nearestEnemy.length && toggles.teamsync()) {
            autoaim = true;
            Jt(53);
            Sn(R.weapons[1], true);
            autoPrimary.change(false);
            autoSecondary.change(true);
            autoheal.change(true);
            setTimeout(() => {
                autoheal.change(false);
                autoaim = false;
                autoPrimary.change(false);
                autoSecondary.change(false);
            }, 250);
        }
    }
    function Wt(e) {
        Et = e
    }
    var Xt = 0;
    function Nt(e, t, n) {
        n ? e ? R.tailIndex = t : R.tails[t] = 1 : e ? R.skinIndex = t : R.skins[t] = 1,
        "block" == Qe.style.display && Gt()
    }
    function Gt() {
        if (R) {
            s.removeAllChildren($e);
            for (var e = Xt, t = e ? tt : et, n = 0; n < t.length; ++n)
                t[n].dontSell || function(n) {
                    var i = s.generateElement({
                        id: "storeDisplay" + n,
                        class: "storeItem",
                        onmouseout: function() {
                            Tt()
                        },
                        onmouseover: function() {
                            Tt(t[n], !1, !0)
                        },
                        parent: $e
                    });
                    s.hookTouchEvents(i, !0),
                    s.generateElement({
                        tag: "img",
                        class: "hatPreview",
                        src: ".././img/" + (e ? "accessories/access_" : "hats/hat_") + t[n].id + (t[n].topSprite ? "_p" : "") + ".png",
                        parent: i
                    }),
                    s.generateElement({
                        tag: "span",
                        text: t[n].name,
                        parent: i
                    }),
                    (e ? R.tails[t[n].id] : R.skins[t[n].id]) ? (e ? R.tailIndex : R.skinIndex) == t[n].id ? s.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Unequip",
                        onclick: function() {
                            Jt(0, e)
                        },
                        hookTouch: !0,
                        parent: i
                    }) : s.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Equip",
                        onclick: function() {
                            Jt(t[n].id, e)
                        },
                        hookTouch: !0,
                        parent: i
                    }) : (s.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Buy",
                        onclick: function() {
                            Kt(t[n].id, e)
                        },
                        hookTouch: !0,
                        parent: i
                    }),
                    s.generateElement({
                        tag: "span",
                        class: "itemPrice",
                        text: t[n].price,
                        parent: i
                    }))
                }(n)
        }
    }
    var onlySoldier = false, onlyEMP = false;
    var autoheal = {
        status: false,
        interval: null,
        change: function(boolean) {
            if(boolean == true) {
                clearInterval(this.interval);
                if(this.status == false) {
                   // r.send("7", 1);
                }
                r.send("c", 1, nearestEnemyAngle);
                this.status = true;
            }else {
                if(this.status == true) {
                    //r.send("7", 1);
                }
                this.status = false;
                r.send("c", 0, nearestEnemyAngle);
            }
        }
    };
    var autoPrimary = {
        interval: null,
        status: false,
        change: function(boolean) {
            return false;
            if(boolean == true) {
                clearInterval(this.interval);
                this.status = true;
                Sn(R.weapons[0], true);
                this.interval = setInterval(() => {
                    Sn(R.weapons[0], true);
                }, 0);
            }else {
                this.status = false;
                clearInterval(this.interval);
            }
        }
    };
    var autoSecondary = {
        interval: null,
        status: false,
        change: function(boolean) {
            return false;
            if(boolean == true) {
                clearInterval(this.interval);
                this.status = true;
                Sn(R.weapons[1], true);
                this.interval = setInterval(() => {
                    Sn(R.weapons[1], true);
                }, 0);
            }else {
                this.status = false;
                clearInterval(this.interval);
            }
        }
    };
    function Jt(e, t) {
        if(!t) {
            if(onlyEMP == true) {
                if(R.skinIndex != e) {
                    r.send("13c", 0, 22, 0);
                }
            }else if(onlySoldier == true || otSoldier == true || trapSoldier == true || rangedSoldier == true) {
                if(R.skinIndex != e) {
                    r.send("13c", 0, 6, 0);
                }
            }else {
                if(R.skinIndex != e && R.skins[e] && e > 0) {
                    r.send("13c", 0, e, 0);
                }/*else if(R.skinIndex != 0 && !R.skins[e]) {
                    r.send("13c", 0, 0, 0);
                }*/
            }
        }else {
            if(R.tailIndex != e && R.tails[e] && e > 0) {
                r.send("13c", 0, e, 1);
            }else if(R.tailIndex != 0 && R.tailIndex != e) {
                r.send("13c", 0, 0, 1);
            }
        }
    }
    function Kt(e, t) {
        r.send("13c", 1, e, t)
    }
    function Qt() {
        Qe.style.display = "none",
        Ye.style.display = "none",
        an()
    }
    function $t(e, t) {
        e && (t ? R.weapons = e : R.items = e);
        for (var n = 0; n < l.list.length; ++n) {
            var i = l.weapons.length + n;
            document.getElementById("actionBarItem" + i).style.display = R.items.indexOf(l.list[n].id) >= 0 ? "inline-block" : "none";
        }
        for (n = 0; n < l.weapons.length; ++n)
            document.getElementById("actionBarItem" + n).style.display = R.weapons[l.weapons[n].type] == l.weapons[n].id ? "inline-block" : "none"
    }
    function Zt(e) {
        M = e,
        V = e && window.devicePixelRatio || 1,
        Se.checked = e,
        I("native_resolution", e.toString()),
        un()
    }
    function en() {
        for (var e = "", t = 0; t < o.skinColors.length; ++t)
            e += t == ae ? "<div class='skinColorItem activeSkin' style='background-color:" + o.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'></div>" : "<div class='skinColorItem' style='background-color:" + o.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'></div>";
        Je.innerHTML = e
    }
    var tn = document.getElementById("chatBox")
      , nn = document.getElementById("chatHolder");
    function rn() {
        on ? setTimeout((function() {
            var e = prompt("chat message");
            e && sn(e)
        }
        ), 1) : "block" == nn.style.display ? (tn.value && sn(tn.value),
        an()) : (Qe.style.display = "none",
        Ye.style.display = "none",
        nn.style.display = "block",
        tn.focus(),
        yn()),
        tn.value = ""
    }
    function sn(e) {
        r.send("ch", e.slice(0, 30))
    }
    function an() {
        tn.value = "",
        nn.style.display = "none"
    }
    var on, cn, ln = [];
    function hn(e, t) {
        var n = Ii(e);
        n && (n.chatMessage = function(e) {
            for (var t, n = 0; n < ln.length; ++n)
                if (e.indexOf(ln[n]) > -1) {
                    t = "";
                    for (var i = 0; i < ln[n].length; ++i)
                        t += t.length ? "o" : "M";
                    var r = new RegExp(ln[n],"g");
                    e = e.replace(r, t)
                }
            return e
        }(t),
        n.chatCountdown = o.chatCountdown)
    }
    function un() {
        F = window.innerWidth,
        z = window.innerHeight;
        var e = Math.max(F / oe, z / ce) * V;
        we.width = F * V,
        we.height = z * V,
        we.style.width = F + "px",
        we.style.height = z + "px"//,
        be.setTransform(e, 0, 0, e, (F * V - oe * e) / 2, (z * V - ce * e) / 2)
    }
    function fn(e) {
        (on = e) ? Ae.classList.add("touch") : Ae.classList.remove("touch")
    }
    function dn(e) {
        e.preventDefault(),
        e.stopPropagation(),
        fn(!0);
        for (var t = 0; t < e.changedTouches.length; t++) {
            var n = e.changedTouches[t];
            n.identifier == re.id ? (re.id = -1,
            bn()) : n.identifier == se.id && (se.id = -1,
            R.buildIndex >= 0 && (O = 1),
            O = 0)
        }
    }
    var tankSpam = false, bowSpam = false;
    document.getElementById("gameCanvas").addEventListener("mousedown", e => {
        if(e.button == 0) {
            tankSpam = !tankSpam;
        }else if(e.button == 2) {
            bowSpam = !bowSpam;
        }
    });
    function pn() {
        if(!R) {
            return 0;
        }else if(oneticking == true && R.weapons[0] == 4 && R.weapons[1] == 15 && R.primary.variant == 3) {
            return nearestEnemyAngle + Math.PI;
        }else if(autoaim == true) {
            return nearestEnemyAngle;
        }else if(intrap == true && mills.space == false && toggles.autobreak()) {
            let weapon = R.weapons[1] == 10 ? 10 : R.weapons[0];
            if((weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                return trapAngle;
            }else {
                return Math.atan2(ie - z / 2, ne - F / 2);
            }
        }else if(tankSpam == true || toggles.autogrind() == true) {
            return Math.atan2(ie - z / 2, ne - F / 2);
        }else if(bowSpam == true && nearestEnemy.length) {
            return nearestEnemyAngle;
        }else if(scriptStatus == "auto bull spam") {
            return nearestEnemyAngle || Math.atan2(ie - z / 2, ne - F / 2);
        }else if(se.id != -1) {
            cn = Math.atan2(se.currentY - se.startY, se.currentX - se.startX);
        }else if(!R.lockDir && !on) {
            cn = Math.atan2(ie - z / 2, ne - F / 2);
        }
        return s.fixTo(cn || 0, 2);
    }
    window.addEventListener("resize", s.checkTrusted(un)),
    un(),
    fn(!1),
    window.setUsingTouch = fn,
    we.addEventListener("touchmove", s.checkTrusted((function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        fn(!0);
        for (var t = 0; t < e.changedTouches.length; t++) {
            var n = e.changedTouches[t];
            n.identifier == re.id ? (re.currentX = n.pageX,
            re.currentY = n.pageY,
            bn()) : n.identifier == se.id && (se.currentX = n.pageX,
            se.currentY = n.pageY,
            O = 1)
        }
    }
    )), !1),
    we.addEventListener("touchstart", s.checkTrusted((function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        fn(!0);
        for (var t = 0; t < e.changedTouches.length; t++) {
            var n = e.changedTouches[t];
            n.pageX < document.body.scrollWidth / 2 && -1 == re.id ? (re.id = n.identifier,
            re.startX = re.currentX = n.pageX,
            re.startY = re.currentY = n.pageY,
            bn()) : n.pageX > document.body.scrollWidth / 2 && -1 == se.id && (se.id = n.identifier,
            se.startX = se.currentX = n.pageX,
            se.startY = se.currentY = n.pageY,
            R.buildIndex < 0 && (O = 1))
        }
    }
    )), !1),
    we.addEventListener("touchend", s.checkTrusted(dn), !1),
    we.addEventListener("touchcancel", s.checkTrusted(dn), !1),
    we.addEventListener("touchleave", s.checkTrusted(dn), !1),
    we.addEventListener("mousemove", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        fn(!1),
        ne = e.clientX,
        ie = e.clientY
    }
    ), !1),
    we.addEventListener("mousedown", (function(e) {
        fn(!1),
        1 != O && (O = 1)
    }
    ), !1),
    we.addEventListener("mouseup", (function(e) {
        fn(!1),
        0 != O && (O = 0)
    }
    ), !1);
    var gn = {}
      , mn = {
        87: [0, -1],
        38: [0, -1],
        83: [0, 1],
        40: [0, 1],
        65: [-1, 0],
        37: [-1, 0],
        68: [1, 0],
        39: [1, 0]
    };
    function yn() {
        gn = {},
        r.send("rmd")
    }
    function kn() {
        return "block" != Ye.style.display && "block" != nn.style.display
    }
    function vn() {
        R && R.alive && r.send("c", O, R.buildIndex >= 0 ? pn() : null)
    }
    var toggles = {};
    window.toggles = toggles;
    function generateNewToggle(label, id, isChecked, style) {
        toggles[id] = function() {
            return document.getElementById(id).checked;
        };
        return `
        ${label} <input type="checkbox" style="cursor: pointer;${style ? " " + style : ""}" id="${id}" ${isChecked}>
        `;
    }
    function generateNewList(label, id, configs) {
        let content = `${label} <select id="${id}">`;
        for(let i = 0; i < configs.length; i++) {
            content += `<option value="${configs[i][0]}">${configs[i][1]}</option>`;
        }
        content += `</select>`;
        return content;
    }
    function setConfig(elements, id) {
        for(let i = 0; i < elements.length; i++) {
            document.getElementById(elements[i][3]).style.display = id == elements[i][0] ? "inline-block" : "none";
        }
    }
    function addEventListen(id, configs) {
        let interval = setInterval(() => {
            if(document.getElementById(id) != null) {
                document.getElementById(id).addEventListener("change", function() {
                    setConfig(configs, document.getElementById(id).value);
                });
                clearInterval(interval);
            }
        }, 0);
    }
    function generateNewConfig(label, id, configs) {
        let content = `${label} <select id="${id}">`;
        for(let i = 0; i < configs.length; i++) {
            content += `<option value="${configs[i][0]}">${configs[i][1]}</option>`;
        }
        content += `</select>`;
        for(let i = 0; i < configs.length; i++) {
            content += generateNewToggle("", configs[i][3], configs[i][2], !i ? "display: inline-block;" : "display: none;");
        }
        addEventListen(id, configs);
        return content;
    }
    let scriptMenu = document.createElement("div");
    scriptMenu.style = `
    position: absolute;
    top: 0px;
    left: 0px;
    width: 380px;
    height: 380px;
    max-height: 300px;
    border: clear;
    background-color: clear;
    color: white;
    border-radius: 3px;
    border-color: #606060;
    z-index: 3;
    display: none;
    `;
    scriptMenu.innerHTML = `-
    <style>
    ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
    }
    </style>
    <h1 style="font-size: 0px; margin-left: 0px;"></h1>
    <center>
    <div style="width: 400px; height: 180px; text-align: left; margin-left: 14px; overflow-y:">
    <button id="antianticheat" style="cursor: pointer;"></button><br>
    ${generateNewList("", "upgradetype", [[0, ""], [1, ""]])} ${generateNewList("", "sixbuilding", [["", ""], ["", ""], ["", ""], ["", ""]])} ${generateNewToggle("", "autoupgrade", "")}<br>
    ${generateNewToggle("Auto Placer:", "autoplace", "")}<br>
    ${generateNewToggle("Auto Bull Spam: ", "autobullspam", "")}<br>
    ${generateNewConfig("Option: ", "configType", [
        [0, "Auto Grind", "", "autogrind"],
        [1, "Texture Pack", "", "texturepack"],
        [2, "Weapon Range", "", "weaponRange"],
        [3, "Auto OneTick", "", "autotick"],
        [4, "Anti Bull", "", "antibull"],
        [5, "Autobreak", "checked", "autobreak"],
        [6, "Auto Respawn", "", "autorespawn"],
        [7, "Infnite Range Tracers", "checked", "infiniterange"],
        [8, "Auto Reload", "", "autoreload"],
        [9, "Auto Replace", "checked", "autoreplace"],
        [10, "Auto Buy", "", "autobuy"],
        [11, "Counter", "", "realdir"],
        [12, "Anti Trap", "checked", "antitrap"],
        [13, "Blue skin", "", "glitchcolor"],
        [14, "Smooth Age Bar", "", "smoothbar"],
        [15, "Spike Sync", "", "spiketick"],
        [16, "Shame Count", "checked", "shamecount"],
        [17, "Reloading Bars", "checked", "reloadbars"],
        [18, "Stats Menu", "checked", "statsmenu"],
        [18, "OneTickBoost", "checked", "OneTickBoost"],

    ])}<br>
    ${generateNewToggle("Lag :", "mapcolor", )}<br>
    ${generateNewList("Chat Type: ", "chatType", [
        [0, "Taking Over - LOL"],
        [1, "Don't Stand of Close - Initial D"],
        [2, "Warriors - Imagine Dragons"],
        [3, "The Top - Initial D"],
        [4, "Love Sosa"],
        [5, "DESOLATOR - Hxndvmviner "]
    ])}<br>
    ${generateNewToggle("Dark Mode :", "darkmode", )}<br>
    ${generateNewToggle("Team sync: ", "teamsync", "")}<br>
    ${generateNewToggle("Streamer Mode", "streamermode", )}<br>
    ${generateNewConfig("Bullet Config: ", "bulletType", [
        [0, "Anti Turret", "", "antiTurretSync"],
        [1, "Anti Ranged", "checked", "backUpRAnti"]
    ])}<br>
    ${generateNewToggle("SunCliente(go insane): ", "tryhard", "")}<br>
    ${generateNewToggle("Auto Hit:", "autohitsync", "")}<br>
    ${generateNewList("Healer Speed: ", "healSpeed", [
        [1, "God Heal"],
        [124, "pvp Heal"]
    ])}<br>
        ${generateNewToggle("", "quadTurret", "")}
    <p></p>
    </div>
    </center>
    `;
    Math.randInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    document.body.appendChild(scriptMenu);
    let checkboxs = scriptMenu.getElementsByTagName("input");
    for(let i = 0; i < checkboxs.length; i++) {
        if(checkboxs[i].type == "checkbox") {
            checkboxs[i].addEventListener("change", () => {
                checkboxs[i].blur();
            })
        }
    }
    document.getElementById("antianticheat").onclick = function() {
        let element = (e) => {return document.getElementById(e);};
        element("autobullspam").checked = false;
        element("antibull").checked = false;
        element("autotick").checked = false;
        element("autohitsync").checked = false;
        element("autoplace").checked = false;
        element("backUpRAnti").checked = false;
        element("autobuy").checked = false;
        element("autoreplace").checked = false;
        element("autoreload").checked = false;
        element("autoupgrade").checked = false;
        element("antitrap").checked = false;
        element("spiketick").checked = false;
        element("OneTickBoost"). checked = false;
        this.blur();
    };
    document.getElementById("smoothbar").addEventListener("change", () => {
        if(document.getElementById("smoothbar").checked) {
            He.style.transition = "0.5s";
        }else {
            He.style.transition = "";
        }
    });
    document.getElementById("tryhard").addEventListener("change", () => {
        if(document.getElementById("tryhard").checked) {
            let element = (e) => {return document.getElementById(e);};
            element("autobullspam").checked = false;
            element("darkmode").checked = false;
            element("antibull").checked = true;
            element("autobreak").checked = true;
            element("autotick").checked = true;
            element("autohitsync").checked = true;
            element("autoplace").checked = true;
            element("backUpRAnti").checked = true;
            element("teamsync").checked = false
            element("mapcolor").checked = false;
            element("realdir").checked = true;
            element("autorespawn").checked = true;
            element("autobuy").checked = true;
            element("autoreplace").checked = true;
            element("autoreload").checked = true;
            element("antitrap").checked = true;
            element("spiketick").checked = true;
            element("texturepack").checked = false;
            element("weaponRange").checked = false;
        }
    });
    document.getElementById("autogrind").addEventListener("change", () => {
        if(document.getElementById("autogrind").checked) {
            for(let i = 0; i < 4; i++) {
                place(R.items[5] ? R.items[5] : R.items[3], i * Math.PI / 2);
            }
        }
    });
    document.getElementById("topInfoHolder").style.left = "20px";
    document.getElementById("resDisplay").appendChild(document.getElementById("killCounter"));
    document.getElementById("killCounter").style.bottom = "185px";
    document.getElementById("killCounter").style.right = "20px";
    document.getElementById("killCounter").style.top = "660px";
    ye.style.left = "330px";
    ke.style.left = "270px";
    document.getElementById("chatButton").style.right = "140px";
    document.getElementById("chatButton").style.display = "none";
    document.getElementById("topInfoHolder").style.display = "none";
    ye.style.display = "none";
    ke.style.display = "none";
    Oe.style.right = "20px";
    Oe.style.bottom = "240px";
    Oe.style.top = "613px";
    Ne.style.backgroundImage = "url('')";
    Oe.style.backgroundPosition = "right 4px center";
    Oe.style.backgroundImage = "url('../img/resources/gold_ico.png')";
    Oe.removeAttribute("id");
    ye.removeAttribute("id");
    ke.removeAttribute("id");
    let statusMenu = document.createElement("div");
    statusMenu.style = `
    position: absolute;
    color: white;
    text-align: left;
    font-size: 14px;
    width: 180px;
    height: 326px;
    top: 60px;
    right: 15px;
    `;
document.getElementById('enterGame').innerHTML = 'Enter Game';
$("#adCard").hide();
$(".menuHeader").hide();
$(".menuText").hide();
$(".downloadBadge").remove();
$("div[style='inline-block']").css('display', 'block');
$("div[style*='inline-block']").css('display', 'block');
$("div#menuCard.adCard").remove();
document.getElementById('adCard').remove();
$("ins.adsbygoogle").remove();
$("#div.menuCard").remove();
$("#mobileInstructions").remove();
$("#promoImgHolder").hide();
$("#downloadButtonContainer").hide();
$("#mobileDownloadButtonContainer").hide();
    document.getElementById("gameUI").appendChild(statusMenu);
    document.getElementById("featuredYoutube").style.color = "white";
    document.getElementById("gameName").style.color = "white";
    document.getElementById("gameName").innerHTML = "SunClient";
    document.getElementById("partyButton").style.color = "white";
    document.getElementById("enterGame").style.color = "white";
    document.getElementById("mainMenu").style.backgroundColor = "";
    var mills = {
        w: false,
        a: false,
        s: false,
        d: false,
        y: 0,
        x: 0,
        aim: 0,
        status: location.hostname == "moomoo.io" ? false : true,
        space: false
    };
    function repeater(e, t, o) {
        let a = !1, i;
        return {start(r) {
            r == e && "chatbox" !== document.activeElement.id.toLowerCase() && R && (a = !0, void 0 === i && (i = setInterval(() => {
                t(), a || (clearInterval(i), i = void 0);
            }, o)));
        }, stop(t) {
            t == e && "chatbox" !== document.activeElement.id.toLowerCase() && (a = !1);
        }};
    }
    var qHolding = false;
    const foodPlacer = repeater(81, () => {
        place(R.items[0]);
        qHolding = true;
    }, 60);
    const spikePlacer = repeater(86, () => {
        cplace(R.items[2]);
    }, 60);
    const trapPlacer = repeater(70, () => {
        cplace(R.items[4]);
    }, 60);
    const millPlacer = repeater(78, () => {
        cplace(R.items[3]);
    }, 60);
    const tpPlacer = repeater(72, () => {
        if(toggles.quadTurret()) {
            for(let i = 0; i < Math.PI * 2; i+=Math.PI/4) {
                cplace(R.items[5], i);
            }
        }else {
            cplace(R.items[5]);
        }
    }, 60);
    document.getElementById("gameCanvas").addEventListener("wheel", function(e) {
        if(e.deltaY > 0) {
            oe *= 0.95;
            ce *= 0.95;
        }else {
            oe /= 0.95;
            ce /= 0.95;
        }
        un();
    })
    var spamchat = false, chatQueue = [], endChatQueue = null;
    var freeCam = {
        status: false,
        x: 0,
        y: 0,
    }
    var audios = [
        new Audio("https://cdn.discordapp.com/attachments/967213871267971072/1027416621318414406/8mb.video-Vf9-wfenD0dA.m4a"),
        new Audio("https://cdn.discordapp.com/attachments/967213871267971072/1027001423034065006/DR._LOVE___DONT_STAND_SO_CLOSED_INITIAL_D.mp3"),
        new Audio("https://cdn.discordapp.com/attachments/967213871267971072/1027051825871990845/YT2mp3.info_-_Imagine_Dragons_-_Warriors_Lyrics_320kbps.mp3"),
        new Audio("https://cdn.discordapp.com/attachments/967213871267971072/1027003301465706537/Ken_Blast_-_The_Top_Lyrics_Video_Eurobeat_Initial_D_REUPLOAD.mp3"),
        new Audio("https://cdn.discordapp.com/attachments/1052272022639620168/1078016672209842186/y2mate.com_-_Chief_Keef_Love_Sosa_v144P.mp4"),
        new Audio("https://cdn.discordapp.com/attachments/1082944025037905981/1085477994056929320/hxndvmviner-f99-desolator.mp3"),
    ];
    function sendChat(e) {
        let chats = [];
        audios[e].play();
        if(e == 0) {
            chats=[{chat:"We at the top again, now what?",delay:16e3},{chat:"Heavy lay the crown, but",delay:18e3},{chat:"Count us",delay:2e4},{chat:"Higher than the mountain",delay:21e3},{chat:"And we be up here",delay:23e3},{chat:"for the long run",delay:24e3},{chat:"Strap in for a long one",delay:25e3},{chat:"We got everybody on one",delay:27e3},{chat:"Now you're coming at the king",delay:29e3},{chat:"so you better not miss",delay:31e3},{chat:"And we only get stronger",delay:33e3},{chat:"With everthing I carry",delay:36e3},{chat:"up on my back",delay:37e3},{chat:"you should paint it up",delay:39e3},{chat:"you should paint it up",delay:39e3},{chat:"with a target",delay:41e3},{chat:"Why would you dare me to",delay:46e3},{chat:"do it again?",delay:47e3},{chat:"Come get your spoiler up ahead",delay:5e4},{chat:"We're taking over,",delay:53e3},{chat:"We're taking over",delay:56e3},{chat:"Look at you come at my name,",delay:61e3},{chat:"you 'oughta know by now,",delay:63e3},{chat:"That We're Taking Over,",delay:66e3},{chat:"We're Taking Over",delay:69e3},{chat:"Maybe you wonder what",delay:74e3},{chat:"you're futures gonna be, but",delay:75e3},{chat:"I got it all locked up",delay:77e3},{chat:"Take a lap, now",delay:93e3},{chat:"Don't be mad, now",delay:95e3},{chat:"Run it back, run it back,",delay:97e3},{chat:"run it back, now",delay:98e3},{chat:"I got bodies lining up,",delay:1e5},{chat:"think you're dreaming",delay:101e3},{chat:"of greatness",delay:102e3},{chat:"Send you back home,",delay:103e3},{chat:"let you wake up",delay:105e3},{chat:"Why would you dare me to",delay:11e4},{chat:"do it again?",delay:111e3},{chat:"Come get your spoiler up ahead",delay:114e3},{chat:"We're taking over,",delay:117e3},{chat:"We're taking over",delay:12e4},{chat:"Look at you come at my name,",delay:125e3},{chat:"you 'oughta know by now,",delay:127e3},{chat:"That We're Taking Over,",delay:13e4},{chat:"We're Taking Over",delay:133e3},{chat:"Maybe you wonder what",delay:138e3},{chat:"you're futures gonna be, but",delay:14e4},{chat:"I got it all locked up",delay:141e3},{chat:"After all, what still exists",delay:157e3},{chat:"except for fights",delay:158e3},{chat:"Around me,",delay:16e4},{chat:"the keyboard is clicking,",delay:161e3},{chat:"the clock is ticking",delay:162e3},{chat:"Still not enough, let me",delay:164e3},{chat:"protect your persistence",delay:165e3},{chat:"even if itâ€™s too late",delay:167e3},{chat:"Let out the fight,",delay:168e3},{chat:"right at this moment",delay:169e3},{chat:"I got the heart of lion",delay:17e4},{chat:"I know the higher you climbing",delay:171e3},{chat:"the harder you fall",delay:172e3},{chat:"I'm at the top of the mount",delay:173e3},{chat:"Too many bodies to count,",delay:174e3},{chat:"I've been through it all",delay:175e3},{chat:"I had to weather the storm",delay:176e3},{chat:"to get to level I'm on",delay:178e3},{chat:"That's how the legend was born",delay:179e3},{chat:"All of my enemies already dead",delay:18e4},{chat:"I'm bored, I'm ready for more",delay:182e3},{chat:"They know I'm ready for war",delay:183e3},{chat:"I told em",delay:184e3},{chat:"We're Taking Over,",delay:185e3},{chat:"We're Taking Over",delay:186e3},{chat:"Look at you come at my name,",delay:192e3},{chat:"you 'oughta know by now,",delay:194e3},{chat:"That We're Taking Over,",delay:197e3},{chat:"We're Taking Over",delay:2e5},{chat:"Maybe you wonder what",delay:205e3},{chat:"you're futures gonna be, but",delay:206e3},{chat:"I got it all locked up",delay:208e3}];
        }else if(e == 1) {
            chats=[{chat: "We'll be together", delay: 16428}, {chat: "'till the morning light", delay: 17431}, {chat: "Don't stand so", delay: 19430}, {chat: "Don't stand so", delay: 20537}, {chat: "Don't stand so close to me", delay: 22394}, {chat: "Baby you belong to me", delay: 37544}, {chat: "Yes you do, yes you do", delay: 40608}, {chat: "You're my affection", delay: 42118}, {chat: "I can make a woman cry", delay: 43959}, {chat: "Yes I do, yes I do", delay: 46846}, {chat: "I will be good", delay: 48323}, {chat: "You're like a cruel device", delay: 50330}, {chat: "your blood is cold like ice", delay: 51530}, {chat: "Posion for my veins", delay: 53126}, {chat: "I'm breaking my chains", delay: 54520}, {chat: "One look and you can kill", delay: 56534}, {chat: "my pain now is your thrill", delay: 58353}, {chat: "Your love is for me", delay: 60466}, {chat: "I say Try me", delay: 62135}, {chat: "take a chance on emotions", delay: 63844}, {chat: "For now and ever", delay: 65424}, {chat: "close to your heart", delay: 66521}, {chat: "I say Try me", delay: 68012}, {chat: "take a chance on my passion", delay: 69655}, {chat: "We'll be together all the time", delay: 71915}, {chat: "I say Try me", delay: 73862}, {chat: "take a chance on emotions", delay: 76381}, {chat: "For now and ever", delay: 77832}, {chat: "into my heart", delay: 79038}, {chat: "I say Try me", delay: 80568}, {chat: "take a chance on my passion", delay: 81941}, {chat: "We'll be together", delay: 83895}, {chat: "'till the morning light", delay: 85005}, {chat: "Don't stand so", delay: 87068}, {chat: "Don't stand so", delay: 88647}, {chat: "Don't stand so close to me", delay: 90090}, {chat: "Baby let me take control", delay: 106239}, {chat: "Yes I do, yes I do", delay: 108257}, {chat: "You are my target", delay: 110121}, {chat: "No one ever made me cry", delay: 111761}, {chat: "What you do, what you do", delay: 114535}, {chat: "Baby's so bad", delay: 116056}, {chat: "You're like a cruel device", delay: 118376}, {chat: "your blood is cold like ice", delay: 119797}, {chat: "Posion for my veins", delay: 121602}, {chat: "I'm breaking my chains", delay: 123250}, {chat: "One look and you can kill", delay: 124849}, {chat: "my pain now is your thrill", delay: 126381}, {chat: "Your love is for me", delay: 128096}, {chat: "I say Try me", delay: 129310}, {chat: "take a chance on emotions", delay: 131038}, {chat: "For now and ever", delay: 132844}, {chat: "close to your heart", delay: 134255}, {chat: "I say Try me", delay: 135932}, {chat: "take a chance on my passion", delay: 137255}, {chat: "We'll be together all the time", delay: 139257}, {chat: "I say Try me", delay: 141863}, {chat: "take a chance on emotions", delay: 143342}, {chat: "For now and ever into my heart", delay: 145433}, {chat: "I say Try me", delay: 148679}, {chat: "take a chance on my passion", delay: 150190}, {chat: "We'll be together", delay: 151716}, {chat: "'till the morning light", delay: 153966}, {chat: "Don't stand so", delay: 155878}, {chat: "Don't stand so", delay: 156935}, {chat: "Don't stand so close to me", delay: 158061}, {chat: "I say Try me", delay: 185081}, {chat: "take a chance on emotions", delay: 186492}, {chat: "For now and ever", delay: 188577}, {chat: "close to your heart", delay: 189819}, {chat: "I say Try me", delay: 191359}, {chat: "take a chance on my passion", delay: 193068}, {chat: "We'll be together all the time", delay: 194729}, {chat: "I say Try me", delay: 197008}, {chat: "take a chance on emotions", delay: 198865}, {chat: "For now and ever", delay: 200708}, {chat: "into my heart", delay: 201879}, {chat: "I say Try me", delay: 203396}, {chat: "take a chance on my passion", delay: 204804}, {chat: "We'll be together", delay: 206818}, {chat: "'till the morning light", delay: 208209}, {chat: "Don't stand so", delay: 210163}, {chat: "Don't stand so", delay: 211692}, {chat: "Don't stand so close to me", delay: 213290}, {chat: "Try me", delay: 228763}, {chat: "take a chance on emotions", delay: 229917}, {chat: "For now and ever", delay: 232175}, {chat: "close to your heart", delay: 233605}, {chat: "I say Try me", delay: 234494}, {chat: "take a chance on my passion", delay: 235826}, {chat: "We'll be together all the time", delay: 237819}, {chat: "I say Try me", delay: 240095}, {chat: "take a chance on emotions", delay: 241754}, {chat: "For now and ever", delay: 244041}, {chat: "into my heart", delay: 245137}, {chat: "I say Try me", delay: 246804}, {chat: "take a chance on my passion", delay: 248067}, {chat: "We'll be together", delay: 249872}, {chat: "'till the morning light", delay: 251107}, {chat: "Don't stand so", delay: 253246}, {chat: "Don't stand so", delay: 254803}, {chat: "Don't stand so close to me", delay: 256372}, {delay: 259025}, {delay: 260829}, {delay: 261174}];
        }else if(e == 2) {
            chats=[{chat:"As a child you would wait",delay:6e3},{chat:"And watch from far away",delay:9e3},{chat:"But you always knew",delay:12e3},{chat:"that you'd be the one",delay:14e3},{chat:"That work while they all play",delay:15e3},{chat:"In youth you'd lay",delay:18e3},{chat:"Awake at night and scheme",delay:21e3},{chat:"Of all the things",delay:24e3},{chat:"that you would change",delay:26e3},{chat:"But it was just a dream",delay:27e3},{chat:"Here we are,",delay:31e3},{chat:"Don't turn away now",delay:33e3},{chat:"We are the warriors",delay:37e3},{chat:"that built this town",delay:39e3},{chat:"Here we are",delay:43e3},{chat:"Don't turn away now",delay:45e3},{chat:"We are the warriors",delay:49e3},{chat:"that built this town",delay:51e3},{chat:"from dust",delay:55e3},{chat:"The time will come",delay:57e3},{chat:"When you'll have to rise",delay:58e3},{chat:"above the best",delay:61e3},{chat:"and prove yourself",delay:63e3},{chat:"Your spirit never dies",delay:64e3},{chat:"Farewell, I've gone",delay:67e3},{chat:"to take my throne above",delay:71e3},{chat:"But don't weep for me",delay:73e3},{chat:"Cause this will be",delay:75e3},{chat:"The labor of my love",delay:77e3},{chat:"Here we are,",delay:8e4},{chat:"Don't turn away now",delay:82e3},{chat:"We are the warriors",delay:86e3},{chat:"that built this town",delay:89e3},{chat:"Here we are",delay:92e3},{chat:"Don't turn away now",delay:94e3},{chat:"We are the warriors",delay:98e3},{chat:"that built this town",delay:101e3},{chat:"from dust",delay:104e3},{chat:"Here we are,",delay:129e3},{chat:"Don't turn away now",delay:132e3},{chat:"We are the warriors",delay:136e3},{chat:"that built this town",delay:132e3},{chat:"Here we are",delay:142e3},{chat:"Don't turn away now",delay:144e3},{chat:"We are the warriors",delay:148e3},{chat:"that built this town",delay:15e4},{chat:"from dust",delay:154e3}];
        }else if(e == 3) {
            chats=[{chat:"Final lap",delay:39e3},{chat:"I'm on top of the world",delay:4e4},{chat:"And I will never",delay:41e3},{chat:"rest for second again!",delay:42e3},{chat:"One more time",delay:45e3},{chat:"I have beaten them out",delay:46e3},{chat:"The scent of gasoline",delay:47e3},{chat:"announces the end!",delay:49e3},{chat:"They all said",delay:51e3},{chat:"I'd best give it up",delay:52e3},{chat:"What a fool",delay:53e3},{chat:"to believe their lies!",delay:54e3},{chat:"Now they've fallen",delay:57e3},{chat:"and I'm at the top",delay:58e3},{chat:"Are you ready",delay:59e3},{chat:"now to die-ie-ie?!",delay:6e4},{chat:"I came up from the bottom,",delay:63e3},{chat:"and into the top",delay:64e3},{chat:"For the first time",delay:65e3},{chat:"I feel alive!",delay:66e3},{chat:"I can fly like an eagle,",delay:69e3},{chat:"and strike like a hawk!",delay:7e4},{chat:"Do you think you can survive",delay:72e3},{chat:"the top?",delay:75e3},{chat:"One more turn",delay:87e3},{chat:"and I'll settle the score",delay:88e3},{chat:"A rubber fire screams",delay:89e3},{chat:"into the night",delay:91e3},{chat:"Crash and burn is",delay:93e3},{chat:"what you're gonna do",delay:94e3},{chat:"I am a master of",delay:95e3},{chat:"the asphalt fight!",delay:97e3},{chat:"They all said",delay:99e3},{chat:"I'd best give it up",delay:1e5},{chat:"What a fool to",delay:101e3},{chat:"believe their lies!",delay:104e3},{chat:"Now they've fallen",delay:105e3},{chat:"and I'm at the top",delay:106e3},{chat:"Are you ready",delay:107e3},{chat:"now to die-ie-ie?!",delay:108e3},{chat:"I came up from the bottom,",delay:11e4},{chat:"and into the top",delay:112e3},{chat:"For the first time",delay:113e3},{chat:"I feel alive!",delay:114e3},{chat:"I can fly like an eagle,",delay:117e3},{chat:"and strike like a hawk!",delay:118e3},{chat:"Do you think you can survive",delay:12e4},{chat:"I came up from the bottom,",delay:123e3},{chat:"and into the top",delay:124e3},{chat:"For the first time",delay:125e3},{chat:"I feel alive!",delay:126e3},{chat:"I can fly like an eagle,",delay:129e3},{chat:"and strike like a hawk!",delay:13e4},{chat:"Do you think you can survive",delay:131e3},{chat:"the top?",delay:134e3},{chat:"I came up from the bottom,",delay:171e3},{chat:"and into the top",delay:172e3},{chat:"For the first time",delay:173e3},{chat:"I feel alive!",delay:174e3},{chat:"I can fly like an eagle,",delay:177e3},{chat:"and strike like a hawk!",delay:178e3},{chat:"Do you think you can survive",delay:18e4},{chat:"I came up from the bottom,",delay:183e3},{chat:"and into the top",delay:184e3},{chat:"For the first time",delay:185e3},{chat:"I feel alive!",delay:186e3},{chat:"I can fly like an eagle,",delay:189e3},{chat:"and strike like a hawk!",delay:19e4},{chat:"Do you think you can survive",delay:192e3},{chat:"the top?",delay:194e3},{chat:"I came up from the bottom,",delay:23e4},{chat:"and into the top",delay:232e3},{chat:"For the first time",delay:233e3},{chat:"I feel alive!",delay:234e3},{chat:"I can fly like an eagle,",delay:237e3},{chat:"and strike like a hawk!",delay:238e3},{chat:"Do you think you can survive",delay:239e3},{chat:"I came up from the bottom,",delay:243e3},{chat:"and into the top",delay:244e3},{chat:"For the first time",delay:245e3},{chat:"I feel alive!",delay:246e3},{chat:"I can fly like an eagle,",delay:249e3},{chat:"and strike like a hawk!",delay:25e4},{chat:"Do you think you can survive",delay:252e3},{chat:"the top?",delay:255e3}];
        }else if(e == 4) {
            chats=[{chat:"Love Sosa",delay:7e3},{chat:"bitches love Sosa, huh?",delay:10e3},{chat:"O End or no end",delay:14e3},{chat:"Raris and Rovers",delay:16e3},{chat:"Ayy, li'l Cobra, ayy, ayy",delay:18e3},{chat:"Bang, Bang-bang",delay:27e3},{chat:"God, y'all some broke boys",delay:29e3},{chat:"God, y'all some broke boys",delay:30e3},{chat:"These bitches love Sosa",delay:32e3},{chat:"O End or no end",delay:34e3},{chat:"Fuckin' with them O boys",delay:36e3},{chat:"you gon' get fucked over",delay:38e3},{chat:"'Raris and Rovers",delay:40e3},{chat:"these hoes love Chief Sosa",delay:42e3},{chat:"Hit him with that cobra",delay:43e3},{chat:"now that boy slumped over",delay:45e3},{chat:"They do it all for Sosa",delay:47e3},{chat:"you boys ain't making no noise",delay:49e3},{chat:"Y'all know I'm a grown boy",delay:51e3},{chat:"your clique full of broke boys",delay:53e3},{chat:"God, y'all some broke boys",delay:55e3},{chat:"God, y'all some broke boys",delay:56e3},{chat:"We GBE dope boys,",delay:58e3},{chat:"we got lots of dough, boy",delay:60e3},{chat:"These bitches love Sosa",delay:62e3},{chat:"and they love them Glo Boys",delay:64e3},{chat:"Know we from the 'Go boy",delay:65e3},{chat:"but we cannot go, boy",delay:67e3},{chat:"No, I don't know old boy",delay:69e3},{chat:"I know he's a broke boy",delay:71e3},{chat:"'Raris and Rovers,",delay:73e3},{chat:"convertible Lambos, boy",delay:74e3},{chat:"You know I got bands, boy,",delay:76e3},{chat:"and it's in my pants, boy",delay:78e3},{chat:"Disrespect them O Boys,",delay:80e3},{chat:"you won't speak again, boy",delay:82e3},{chat:"Don't think that I'm playin', boy",delay:84e3},{chat:"no, we don't use hands, boy",delay:85e3},{chat:"No, we don't do friends, boy,",delay:87e3},{chat:"collect bands, I'm a landlord",delay:89e3},{chat:"I gets lots of commas,",delay:91e3},{chat:"I can fuck your momma",delay:92e3},{chat:"I ain't with the drama,",delay:94e3},{chat:"you can meet my llama",delay:96e3},{chat:"Ridin' with 3hunna,",delay:98e3},{chat:"with three hundred foreigns",delay:94e3},{chat:"These bitches see Chief Sosa",delay:102e3},{chat:"I swear to God, they honored",delay:104e3},{chat:"These bitches love Sosa",delay:105e3},{chat:"O End or no end",delay:107e3},{chat:"Fuckin' with them O boys",delay:109e3},{chat:"you gon' get fucked over",delay:110e3},{chat:"'Raris and Rovers",delay:112e3},{chat:"these hoes love Chief Sosa",delay:114e3},{chat:"Hit him with that cobra",delay:116e3},{chat:"now that boy slumped over",delay:118e3},{chat:"They do it all for Sosa",delay:120e3},{chat:"you boys ain't making no noise",delay:121e3},{chat:"Y'all know I'm a grown boy",delay:123e3},{chat:"your clique full of broke boys",delay:125e3},{chat:"God, y'all some broke boys",delay:127e3},{chat:"God, y'all some broke boys",delay:128e3},{chat:"We GBE dope boys",delay:130e3},{chat:"we got lots of dough, boy",delay:132e3},{chat:"Don't make me call D. Rose",delay:135e3},{chat:"boy, he six double-O, boy",delay:136e3},{chat:"And he keep that pole, boy",delay:138e3},{chat:"you gon' get fucked over",delay:140e3},{chat:"Bitch, I done sell soda",delay:142e3},{chat:"and I done sell coca",delay:144e3},{chat:"She gon' clap for Sosa",delay:145e3},{chat:"he gon' clap for Sosa",delay:147e3},{chat:"They do it for Sosa, them hoes",delay:149e3},{chat:"they do it for Sosa",delay:150e3},{chat:"Tadoe off the molly water",delay:152e3},{chat:"so nigga be cool like water",delay:154e3},{chat:"Fore you get hit with thislava",delay:156e3},{chat:"bitch, I'm the trending topic",delay:158e3},{chat:"These bitches love Sosa",delay:163e3},{chat:"O End or no end",delay:165e3},{chat:"Fuckin' with them O boys",delay:167e3},{chat:"you gon' get fucked over",delay:169e3},{chat:"'Raris and Rovers",delay:170e3},{chat:"these hoes love Chief Sosa",delay:172e3},{chat:"Hit him with that cobra",delay:174e3},{chat:"now that boy slumped over",delay:176e3},{chat:"They do it all for Sosa",delay:178e3},{chat:"you boys ain't making no noise",delay:180e3},{chat:"Y'all know I'm a grown boy",delay:182e3},{chat:"your clique full of broke boys",delay:184e3},{chat:"God, y'all some broke boys",delay:185e3},{chat:"God, y'all some broke boys",delay:187e3},{chat:"We GBE dope boys",delay:189e3},{chat:"we got lots of dough, boy",delay:191e3}];
        }else if(e == 5) {
            chats=[{chat:"",delay:0},{chat:"",delay:1000},{chat:"",delay:2000}];
        }
        chatQueue = [];
        chats.forEach(e => {
            chatQueue.push(setTimeout(() => {
                if(document.activeElement.id.toLowerCase() !== 'chatbox') {
                    r.send("ch", e.chat);
                }
            }, e.delay));
        });
        endChatQueue = setTimeout(() => {
            spamchat = false;
        }, chats[chats.length - 1].delay);
    }
    window.addEventListener("keydown", s.checkTrusted((function(e) {
        var t = e.which || e.keyCode || 0;
        if(R) {
            foodPlacer.start(t);
            tpPlacer.start(t);
            trapPlacer.start(t);
            spikePlacer.start(t);
            millPlacer.start(t);
        }
        if(e.keyCode == 27 && R) {
            if(scriptMenu.style.display == "block") {
                scriptMenu.style.display = "none";
                document.getElementById("topInfoHolder").style.display = "block";
                ye.style.display = "block";
                ke.style.display = "block";
            }else {
                scriptMenu.style.display = "block";
                document.getElementById("topInfoHolder").style.display = "none";
                ye.style.display = "none";
                ke.style.display = "none";
            }
        }
        if(e.key == "=" && R && "chatbox" !== document.activeElement.id.toLowerCase()) {
            oe = o.maxScreenWidth;
            ce = o.maxScreenHeight;
            un();
        }
        if(t == 191 && R && "chatbox" !== document.activeElement.id.toLowerCase()) {
            if(freeCam.status == true) {
                freeCam.status = false;
                freeCam.dir = null;
                clearInterval(freeCam.interval);
            }else {
                freeCam.x = R.x;
                freeCam.y = R.y;
                freeCam.interval = setInterval(() => {
                    if(freeCam.dir != null) {
                        freeCam.x += Math.cos(freeCam.dir) * 10;
                        freeCam.y += Math.sin(freeCam.dir) * 10;
                    }
                }, 0);
                freeCam.status = true;
            }
        }
        if(e.keyCode == 106) {
           document.getElementById('gameUI').style.display = document.getElementById('gameUI').style.display == "block" ? "none" : "block";
           };
        if(e.key && e.key == "C" && R && "chatbox" !== document.activeElement.id.toLowerCase()) {
            if(spamchat == false) {
                audios[document.getElementById("chatType").value].currentTime = 0;
                sendChat(document.getElementById("chatType").value);
            }else {
                clearTimeout(endChatQueue);
                for(let i = 0; i < chatQueue.length; i++) {
                    clearTimeout(chatQueue[i]);
                }
                for(let i = 0; i < audios.length; i++) {
                    audios[i].pause();
                    audios[i].currentTime = 0;
                }
                chatQueue = [];
            }
            spamchat = !spamchat;
        }
        e.key == "z" && R && "chatbox" !== document.activeElement.id.toLowerCase() &&
            (mills.status = !mills.status);
        (t == 87 || t == 38) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.w = true);
        (t == 65 || t == 37) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.a = true);
        (t == 83 || t == 40) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.s = true);
        (t == 68 || t == 39) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.d = true);
        32 == t && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.space = true);
        if(e.key && e.key == "Z" && "chatbox" !== document.activeElement.id.toLowerCase()) {
            autoPrimary.change(false);
            autoSecondary.change(false);
        }
        if(e.keyCode == 190 && R && autoaim == false && nearestEnemy.length && R.team && "chatbox" !== document.activeElement.id.toLowerCase()) {
            r.send("14", 1);
        }
        27 == t ? Qt() : R && R.alive && kn() && (gn[t] || (gn[t] = 1,
        69 == t ? r.send("7", 1) : 67 == t && e.key != "C" ? (Mt || (Mt = {}),
        Mt.x = R.x,
        Mt.y = R.y) : 143 == t ? (R.lockDir = R.lockDir ? 0 : 1,
        r.send("7", 0)) : null != R.weapons[t - 49] ? Sn(R.weapons[t - 49], !0) : null != R.items[t - 49 - R.weapons.length] ? Sn(R.items[t - 49 - R.weapons.length]) : 81 == t ? Sn(R.items[0]) : 82 == t ? xn() : mn[t] ? bn() : 32 == t && (O = 1)))
    }
    ))),
    window.addEventListener("keyup", s.checkTrusted((function(e) {
        if (R && R.alive) {
            var t = e.which || e.keyCode || 0;
            foodPlacer.stop(t);
            tpPlacer.stop(t);
            trapPlacer.stop(t);
            spikePlacer.stop(t);
            millPlacer.stop(t);
            if(t == 81) {
                qHolding = false;
            }
            (t == 87 || t == 38) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.w = false);
            (t == 65 || t == 37) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.a = false);
            (t == 83 || t == 40) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.s = false);
            (t == 68 || t == 39) && R && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.d = false);
            32 == t && "chatbox" !== document.activeElement.id.toLowerCase() && (mills.space = false);
            13 == t ? rn() : kn() && gn[t] && (gn[t] = 0,
            mn[t] ? bn() : 32 == t && (O = 0))
        }
    }
    )));
    var wn = void 0;
    function bn() {
        var e = function() {
            var e = 0
              , t = 0;
            if (-1 != re.id)
                e += re.currentX - re.startX,
                t += re.currentY - re.startY;
            else
                for (var n in mn) {
                    var i = mn[n];
                    e += !!gn[n] * i[0],
                    t += !!gn[n] * i[1]
                }
            return 0 == e && 0 == t ? void 0 : s.fixTo(Math.atan2(t, e), 2)
        }();
        if((wn == null || e == null || Math.abs(e - wn) > .3) && oneticking == false) {
            if(!freeCam.status) {
                r.send("33", e);
            }
            mills.aim = e;
            freeCam.dir = e;
            wn = e;
        }
    }
    var insta = false;
    function xn() {
        insta = !insta;
    }
    function Sn(e, t) {
        r.send("5", e, t)
    }
    var In = !0;
    function En(e) {
        Pe.style.display = "none",
        Me.style.display = "block",
        he.style.display = "none",
        gn = {},
        j = e,
        O = 0,
        le = !0,
        In && (In = !1,
        N.length = 0)
    }
    function Mn(e, t, n, i) {
        m.showText(e, t, 50, .18, 2000, Math.abs(n), n >= 0 ? "#fff" : "#8ecc51")
    }
    var An = 99999;
    function Pn() {
        le = !1;
        Ge.innerHTML = R.shameCount < 5 ? "OOF" : "OOF";
        Be.style.display = "none",
        Qt(),
        It = {
            x: R.x,
            y: R.y
        },
        Pe.style.display = "none",
        Ge.style.display = "block",
        Ge.style.fontSize = "0px",
        An = 0,
        setTimeout((function() {
            Me.style.display = "block"
            he.style.display = "block"
            Ge.style.display = "none"
            if(toggles.autorespawn() || toggles.streamermode()) {
                setTimeout(() => {
                    Tn();
                }, 250);
            }
        }), o.deathFadeout),
        gt()
    }
    function Bn(e) {
        R && nt.removeAllItems(e)
    }
    var tempTracers = [], infinteTracers = [];
    function Cn(e) {
        let b = Mi(e);
        let nearestTrap = N.filter(e => e.trap && e.owner.sid != R.sid && !isAlly(e.owner.sid) && e.active && Math.hypot(e.y - R.y2, e.x - R.x2) < 80).sort(
            (e, t) => Math.hypot(e.y - R.y2, e.x - R.x2) - Math.hypot(t.y - R.y2, t.x - R.x2)
        )[0];
        nt.disableBySid(e);
        if(nearestTrap && b == nearestTrap) {
            trapSoldier = true;
            Jt(6);
            if(onlyEMP == true) {
                if(R.shameCount < 5) {
                    //heal();
                }
                onlyEMP = false;
            }
            setTimeout(() => {
                trapSoldier = false;
            }, 200);
        }
        if(toggles.autogrind() == false) {
            if(b && Math.hypot(b.y - R.y2, b.x - R.x2) < 300 && nearestEnemy.length) {
                if(dist(nearestEnemy, R) < 140 && autoaim == false && R.primary.reload == 1 && R.primary.dmg >= 40 && hitting == false && toggles.spiketick()) {
                    place(R.items[2], nearestEnemyAngle);
                    autoaim = true;
                    hitting = true;
                    Jt(7, 0);
                    Jt(R.tails[21] ? 21 : 0, 1);
                    Sn(R.weapons[0], true);
                    autoSecondary.change(false);
                    autoPrimary.change(true);
                    autoheal.change(true);
                    setTimeout(() => {
                        autoheal.change(false);
                        hitting = true;
                        autoPrimary.change(false);
                        autoSecondary.change(false);
                        autoaim = false;
                    }, 240);
                }
                if(toggles.autoreplace()) {
                    if(dist(nearestEnemy, R) < 250) {
                        for(let i = 0; i < Math.PI * 2; i += Math.PI/2) {
                            cplace(R.items[2], i + nearestEnemyAngle);
                        }
                    }//nearestEnemyAngle-Math.PI/3; i < nearestEnemyAngle+Math.PI/3; i+=Math.PI/12
                    if(R.items[4] == 15 && dist(nearestEnemy, R) < 350) {
                        for(let i = 0; i < Math.PI * 2; i += Math.PI/2) {
                            cplace(R.items[4], i + nearestEnemyAngle + Math.PI);
                        }
                    }
                }
            }
        }else {
            if(Math.hypot(b.y - R.y2, b.x - R.x2) < 300) {
                for(let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
                    cplace(R.items[5] ? R.items[5] : R.items[3], i);
                }
            }
        }
        if(b && Math.hypot(b.y - R.y2, b.x - R.x2) > 1100 && toggles.infiniterange()) {
            tempTracers.push(b);
            infinteTracers.push({x: b.x, y: b.y, time: Date.now()});
        }
    }
    function On() {
        je.innerText = R.wood;
        _e.innerText = R.stone;
        Oe.innerText = R.points;
        Ue.innerText = R.kills;
        Re.innerText = R.food;
    }
    var Rn = {}
      , jn = ["crown", "skull", "crosshair"]
      , _n = [];
    function Un(e, t) {
        if (R.upgradePoints = e,
        R.upgrAge = t,
        e > 0) {
            _n.length = 0,
            s.removeAllChildren(Ve);
            for (var n = 0; n < l.weapons.length; ++n)
                l.weapons[n].age == t && (null == l.weapons[n].pre || R.weapons.indexOf(l.weapons[n].pre) >= 0) && (s.generateElement({
                    id: "upgradeItem" + n,
                    class: "actionBarItem",
                    onmouseout: function() {
                        Tt()
                    },
                    parent: Ve
                }).style.backgroundImage = document.getElementById("actionBarItem" + n).style.backgroundImage,
                _n.push(n));
            for (n = 0; n < l.list.length; ++n)
                if (l.list[n].age == t) {
                    var i = l.weapons.length + n;
                    s.generateElement({
                        id: "upgradeItem" + i,
                        class: "actionBarItem",
                        onmouseout: function() {
                            Tt()
                        },
                        parent: Ve
                    }).style.backgroundImage = document.getElementById("actionBarItem" + i).style.backgroundImage,
                    _n.push(i)
                }
            for (n = 0; n < _n.length; n++)
                !function(e) {
                    var t = document.getElementById("upgradeItem" + e);
                    t.onmouseover = function() {
                        l.weapons[e] ? Tt(l.weapons[e], !0) : Tt(l.list[e - l.weapons.length])
                    }
                    ,
                    t.onclick = s.checkTrusted((function() {
                        r.send("6", e)
                    }
                    )),
                    s.hookTouchEvents(t)
                }(_n[n]);
            _n.length ? (Ve.style.display = "block",
            qe.style.display = "block",
            qe.innerHTML = "SELECT ITEMS (" + e + ")") : (Ve.style.display = "none",
            qe.style.display = "none",
            Tt())
        } else
            Ve.style.display = "none",
            qe.style.display = "none",
            Tt()
    }
    function Dn(e, t, n) {
        null != e && (R.XP = e),
        null != t && (R.maxXP = t),
        null != n && (R.age = n),
        n == o.maxAge ? (ze.innerHTML = "MAX AGE",
        He.style.width = "100%") : (ze.innerHTML = "AGE " + R.age,
        He.style.width = R.XP / R.maxXP * 100 + "%")
    }
    function Ln(e) {
        s.removeAllChildren(De);
        for (var t = 1, n = 0; n < e.length; n += 3)
            !function(n) {
                s.generateElement({
                    class: "leaderHolder",
                    parent: De,
                    children: [s.generateElement({
                        class: "leaderboardItem",
                        style: "color:" + (e[n] == j ? "#fff" : "rgba(255,255,255,0.6)"),
                        text: t + ". " + ("" != e[n + 1] ? e[n] == R.sid && toggles.streamermode() ? "unknown" : e[n + 1] : "unknown")
                    }), s.generateElement({
                        class: "leaderScore",
                        text: s.kFormat(e[n + 2]) || "0"
                    })]
                })
            }(n),
            t++
    }
    function Fn(e, t, n, i) {
        be.save(),
        be.setTransform(1, 0, 0, 1, 0, 0),
        be.scale(V, V);
        var r = 50;
        be.beginPath(),
        be.arc(e, t, r, 0, 2 * Math.PI, !1),
        be.closePath(),
        be.fillStyle = "white",
        be.fill(),
        r = 50;
        var s = n - e
          , a = i - t
          , o = Math.sqrt(Math.pow(s, 2) + Math.pow(a, 2))
          , c = o > r ? o / r : 1;
        s /= c,
        a /= c,
        be.beginPath(),
        be.arc(e + s, t + a, .5 * r, 0, 2 * Math.PI, !1),
        be.closePath(),
        be.fillStyle = "white",
        be.fill(),
        be.restore()
    }
    function zn(e, t, n) {
        for (var i = 0; i < G.length; ++i)
            (_ = G[i]).active && _.layer == e && (_.update(P),
            _.active && ki(_.x - t, _.y - n, _.scale) && (be.save(),
            be.translate(_.x - t, _.y - n),
            be.rotate(_.dir),
            Vn(0, 0, _, be, 1),
            be.restore()))
    }
    var Hn = {};
    function Vn(e, t, n, i, r) {
        if (n.src) {
            var s = l.projectiles[n.indx].src
              , a = Hn[s];
            a || ((a = new Image).onload = function() {
                this.isLoaded = !0
            }
            ,
            a.src = ".././img/weapons/" + s + ".png",
            Hn[s] = a),
            a.isLoaded && i.drawImage(a, e - n.scale / 2, t - n.scale / 2, n.scale, n.scale)
        } else
            1 == n.indx && (i.fillStyle = "#white",
            si(e, t, n.scale, i))
    }
    function qn(e, t, n, i) {
        var r = o.riverWidth + i
          , s = o.mapScale / 2 - t - r / 2;
        s < ce && s + r > 0 && n.fillRect(0, s, oe, r)
    }
    function Yn(e, t, n) {
        for (var i, r, s, a = 0; a < N.length; ++a)
            (_ = N[a]).active && (r = _.x + _.xWiggle - t,
            s = _.y + _.yWiggle - n,
            0 == e && _.update(P),
            _.layer == e && ki(r, s, _.scale + (_.blocker || 0)) && (be.globalAlpha = _.hideFromEnemy ? .6 : 1,
            _.isItem ? (i = ri(_),
            be.save(),
            be.translate(r, s),
            be.rotate(be.rotate(Math.atan2(Math.sin(_.dir), Math.cos(_.dir)))),
            be.drawImage(i, -i.width / 2, -i.height / 2),
            _.blocker && (be.strokeStyle = "#db6e6e",
            be.globalAlpha = .3,
            be.lineWidth = 6,
            si(0, 0, _.blocker, be, !1, !0)),
            be.restore()) : (i = ni(_),
            be.drawImage(i, r - i.width / 2, s - i.height / 2))))
    }
    var allDamages = [];
    function sendHitProcess(a) {
        for (let e = 0; e < allDamages.length; e++) allDamages[e](a);
        allDamages = [];
    }
    function newPromise() {
        return new Promise(function (a, e) {
            allDamages.push(a), setTimeout(function () {
                e();
            }, 50);
        });
    }
    function Wn(e, t, n) {
        let extra = Ii(e).skinIndex == 40 ? 3.3 : 1;
        let totaldmg = l.weapons[n].dmg * (n == 10 ? 7.5 : 1) * extra;
        (_ = Ii(e)) && (
            _.startAnim(t, n),
            sendHitProcess(totaldmg)
        )
    }
    function sendFzDir() {
        if(toggles.realdir()) {
            return R.dir
        }else if(autoaim == true) {
            return nearestEnemyAngle;
        }else if(intrap == true && toggles.autobreak() && mills.space == false) {
            let weapon = R.weapons[1] == 10 ? 10 : R.weapons[0];
            if((weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                return trapAngle;
            }else {
                return Math.atan2(ie - z / 2, ne - F / 2);
            }
        }else if(scriptStatus == "auto bull spam") {
            if(R.primary.reload == 1) {
                return nearestEnemyAngle;
            }else {
                return Math.atan2(ie - z / 2, ne - F / 2);
            }
        }else {
            return Math.atan2(ie - z / 2, ne - F / 2);
        }
    }
    function Xn(e, t, n) {
        be.globalAlpha = 1;
        for(var i = 0; i < W.length; i++) {
            _ = W[i];
            if(_.zIndex == n) {
                _.animate(P);
                if(_.visible) {
                    _.skinRot += .002 * P;
                    L = (_ == R ? sendFzDir() : _.dir) + _.dirPlus;
                    be.save();
                    be.translate(_.x - e, _.y - t);
                    be.rotate(L);
                    /*if(_ == R) {
                        if(intrap == true && toggles.autobreak()) {
                            let weapon = R.weapons[1] == 10 ? 10 : R.weapons[0];
                            if((weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                                if(trapAngle != Number.MAX_VALUE) {
                                    Nn(_, be);
                                }
                            }else {
                                Nn(_, be);
                            }
                        }else if(tankSpam == true) {
                            let weapon = R.weapons[1] == 10 ? 10 : R.weapons[0];
                            if((weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                            }else {
                                Nn(_, be);
                            }
                        }else {
                            Nn(_, be);
                        }
                    }else {*/
                    Nn(_, be);
                    //}
                    be.restore();
                }
            }
        }
    }
    var newHatImgs = {
        7: "https://i.imgur.com/vAOzlyY.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        11: "https://i.imgur.com/yfqME8H.png",
        12: "https://i.imgur.com/VSUId2s.png",
        40: "https://i.imgur.com/Xzmg27N.png",
        26: "https://i.imgur.com/I0xGtyZ.png",
        6: "https://i.imgur.com/vM9Ri8g.png",
    };
    var newAccImgs = {
        18: "https://i.imgur.com/0rmN7L9.png",
        21: "https://i.imgur.com/4ddZert.png",
    };
    var newWeaponImgs = {
        "sword_1": "https://cdn.discordapp.com/attachments/1085609376921952358/1087787878551138374/imageedit_20_4477147681.png",
        "sword_1_g": "https://cdn.discordapp.com/attachments/1085609376921952358/1087787504335339520/imageedit_12_9519258625.png",
        "sword_1_r": "https://cdn.discordapp.com/attachments/1085609376921952358/1087787604184936548/imageedit_14_7133662511.png",
        "samurai_1": "https://cdn.discordapp.com/attachments/1085609376921952358/1087755885536882718/imageedit_4_5241420795.png",
        "samurai_1_g": "https://cdn.discordapp.com/attachments/967213871267971072/1030852038948552724/image.png",
        "samurai_1_r": "https://cdn.discordapp.com/attachments/1085609376921952358/1087753023511605349/imageedit_1_2759271815.png",
        "great_hammer_1": "https://cdn.discordapp.com/attachments/1085609376921952358/1087762311718121563/imageedit_8_9487430448.png",
        "great_hammer_1_g": "https://cdn.discordapp.com/attachments/1085609376921952358/1087762226930262026/imageedit_7_8567460335.png",
        "great_hammer_1_r": "https://cdn.discordapp.com/attachments/1085609376921952358/1087762115835727982/imageedit_6_9324593706.png",
    };
    function getTexturePackImg(id, type) {
        if(toggles.texturepack()) {
            if(newHatImgs[id] && type == "hat") {
                return newHatImgs[id];
            }else if(newAccImgs[id] && type == "acc") {
                return newAccImgs[id];
            }else if(newWeaponImgs[id] && type == "weapons") {
                return newWeaponImgs[id];
            }else {
                if(type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                }else if(type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                }else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        }else {
            if(type == "acc") {
                return ".././img/accessories/access_" + id + ".png";
            }else if(type == "hat") {
                return ".././img/hats/hat_" + id + ".png";
            }else {
                return ".././img/weapons/" + id + ".png";
            }
        }
    }
    function Nn(e, t) {
        (t = t || be).lineWidth = 5.5,
        t.lineJoin = "miter";
        var n = Math.PI / 4 * (l.weapons[e.weaponIndex].armS || 1)
          , i = e.buildIndex < 0 && l.weapons[e.weaponIndex].hndS || 1
          , r = e.buildIndex < 0 && l.weapons[e.weaponIndex].hndD || 1;
        if (e.tailIndex > 0 && function(e, t, n) {
            if (!(Gn = Qn[e + (toggles.texturepack() ? "lol" : 0)])) {
                var i = new Image;
                i.onload = function() {
                    this.isLoaded = !0,
                    this.onload = null
                }
                ,
                i.src = getTexturePackImg(e, "acc"),
                Qn[e + (toggles.texturepack() ? "lol" : 0)] = i,
                Gn = i
            }
            var r = $n[e];
            if (!r) {
                for (var s = 0; s < tt.length; ++s)
                    if (tt[s].id == e) {
                        r = tt[s];
                        break
                    }
                $n[e] = r
            }
            Gn.isLoaded && (t.save(),
            t.translate(-20 - (r.xOff || 0), 0),
            r.spin && t.rotate(n.skinRot),
            t.drawImage(Gn, -r.scale / 2, -r.scale / 2, r.scale, r.scale),
            t.restore())
        }(e.tailIndex, t, e),
        e.buildIndex < 0 && !l.weapons[e.weaponIndex].aboveHand && (ei(l.weapons[e.weaponIndex], o.weaponVariants[e.weaponVariant].src, e.scale, 0, t),
        null == l.weapons[e.weaponIndex].projectile || l.weapons[e.weaponIndex].hideProjectile || Vn(e.scale, 0, l.projectiles[l.weapons[e.weaponIndex].projectile], be)),
        t.fillStyle = o.skinColors[e.skinColor],
        si(e.scale * Math.cos(n), e.scale * Math.sin(n), 14),
        si(e.scale * r * Math.cos(-n * i), e.scale * r * Math.sin(-n * i), 14),
        e.buildIndex < 0 && l.weapons[e.weaponIndex].aboveHand && (ei(l.weapons[e.weaponIndex], o.weaponVariants[e.weaponVariant].src, e.scale, 0, t),
        null == l.weapons[e.weaponIndex].projectile || l.weapons[e.weaponIndex].hideProjectile || Vn(e.scale, 0, l.projectiles[l.weapons[e.weaponIndex].projectile], be)),
        e.buildIndex >= 0) {
            var s = ri(l.list[e.buildIndex]);
            t.drawImage(s, e.scale - l.list[e.buildIndex].holdOffset, -s.width / 2)
        }
        si(0, 0, e.scale, t),
        toggles.weaponRange() && R && e == R && (t.beginPath(),
        t.globalAlpha = 0.15,
        t.fillStyle = "#000000",
        t.strokeStyle = "#000000",
        t.arc(0, 0, l.weapons[e.weaponIndex].range * 1.5, 0 - L + e.dir - Math.PI/2, Math.PI/2 - L + e.dir),
        t.fill(),
        t.stroke(),
        t.globalAlpha = 1),
        e.skinIndex > 0 && (t.rotate(Math.PI / 2),
        function e(t, n, i, r) {
            if (!(Gn = Jn[t + (toggles.texturepack() ? "lol" : 0)])) {
                var s = new Image;
                s.onload = function() {
                    this.isLoaded = !0,
                    this.onload = null
                }
                ,
                s.src = getTexturePackImg(t, "hat"),
                Jn[t + (toggles.texturepack() ? "lol" : 0)] = s,
                Gn = s
            }
            var a = i || Kn[t];
            if (!a) {
                for (var o = 0; o < et.length; ++o)
                    if (et[o].id == t) {
                        a = et[o];
                        break
                    }
                Kn[t] = a
            }
            Gn.isLoaded && n.drawImage(Gn, -a.scale / 2, -a.scale / 2, a.scale, a.scale),
            !i && a.topSprite && (n.save(),
            n.rotate(r.skinRot),
            e(t + "_top", n, a, r),
            n.restore())
        }(e.skinIndex, t, null, e))
    }
    var Gn, Jn = {}, Kn = {}, Qn = {}, $n = {}, Zn = {};
    function ei(e, t, n, i, r) {
        var s = e.src + (t || "")
          , a = Zn[s + (toggles.texturepack() ? "lol" : 0)];
        a || ((a = new Image).onload = function() {
            this.isLoaded = !0
        }
        ,
        a.src = getTexturePackImg(s, "weapons"),
        Zn[s + (toggles.texturepack() ? "lol" : 0)] = a),
        a.isLoaded && r.drawImage(a, n + e.xOff - e.length / 2, i + e.yOff - e.width / 2, e.length, e.width)
    }
    var ti = {};
    function ni(e) {
        var t = e.y >= o.mapScale - o.snowBiomeTop ? 2 : e.y <= o.snowBiomeTop ? 1 : 0
          , n = e.type + "_" + e.scale + "_" + t
          , i = ti[n];
        if (!i) {
            var r = document.createElement("canvas");
            r.width = r.height = 2.1 * e.scale + 5.5;
            var a = r.getContext("2d");
            if (a.translate(r.width / 2, r.height / 2),
            a.rotate(s.randFloat(0, Math.PI)),
            a.strokeStyle = it,
            a.lineWidth = 5.5,
            0 == e.type)
                for (var c, l = 0; l < 2; ++l)
                    ai(a, 7, c = _.scale * (l ? .5 : 1), .7 * c),
                    a.fillStyle = t ? l ? "#fff" : "#e3f1f4" : l ? "#b4db62" : "#9ebf57",
                    a.fill(),
                    l || a.stroke();
            else if (1 == e.type)
                if (2 == t)
                    a.fillStyle = "white",
                    ai(a, 6, .3 * e.scale, .71 * e.scale),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = "#89a54c",
                    si(0, 0, .55 * e.scale, a),
                    a.fillStyle = "#a5c65b",
                    si(0, 0, .3 * e.scale, a, !0);
                else {
                    var h;
                    !function(e, t, n, i) {
                        var r, a = Math.PI / 2 * 3, o = Math.PI / 6;
                        e.beginPath(),
                        e.moveTo(0, -i);
                        for (var c = 0; c < 6; c++)
                            r = s.randInt(n + .9, 1.2 * n),
                            e.quadraticCurveTo(Math.cos(a + o) * r, Math.sin(a + o) * r, Math.cos(a + 2 * o) * i, Math.sin(a + 2 * o) * i),
                            a += 2 * o;
                        e.lineTo(0, -i),
                        e.closePath()
                    }(a, 0, _.scale, .7 * _.scale),
                    a.fillStyle = t ? "#e3f1f4" : "#89a54c",
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = t ? "#6a64af" : "#c15555";
                    var u = T / 4;
                    for (l = 0; l < 4; ++l)
                        si((h = s.randInt(_.scale / 3.5, _.scale / 2.3)) * Math.cos(u * l), h * Math.sin(u * l), s.randInt(10, 12), a)
                }
            else
                2 != e.type && 3 != e.type || (a.fillStyle = 2 == e.type ? 2 == t ? "#938d77" : "#939393" : "#e0c655",
                ai(a, 3, e.scale, e.scale),
                a.fill(),
                a.stroke(),
                a.fillStyle = 2 == e.type ? 2 == t ? "#b2ab90" : "#bcbcbc" : "#ebdca3",
                ai(a, 3, .55 * e.scale, .65 * e.scale),
                a.fill());
            i = r,
            ti[n] = i
        }
        return i
    }
    var ii = [];
    function ri(e, t) {
        var n = ii[e.id + (R && e.owner && e.owner.sid == R.sid ? 0 : R && R.team && e.owner && isAlly(e.owner.sid) ? 25 : 50)];
        if (!n || t) {
            var i = document.createElement("canvas");
            i.width = i.height = 2.5 * e.scale + 5.5 + (l.list[e.id].spritePadding || 0);
            var r = i.getContext("2d");
            if (r.translate(i.width / 2, i.height / 2),
            r.rotate(t ? 0 : Math.PI / 2),
            r.strokeStyle = it,
            r.lineWidth = 5.5 * (t ? i.width / 81 : 1),
            "apple" == e.name) {
                r.fillStyle = "#c15555",
                si(0, 0, e.scale, r),
                r.fillStyle = "#89a54c";
                var a = -Math.PI / 2;
                !function(e, t, n, i, r) {
                    var s = e + 25 * Math.cos(i)
                      , a = t + 25 * Math.sin(i);
                    r.moveTo(e, t),
                    r.beginPath(),
                    r.quadraticCurveTo((e + s) / 2 + 10 * Math.cos(i + Math.PI / 2), (t + a) / 2 + 10 * Math.sin(i + Math.PI / 2), s, a),
                    r.quadraticCurveTo((e + s) / 2 - 10 * Math.cos(i + Math.PI / 2), (t + a) / 2 - 10 * Math.sin(i + Math.PI / 2), e, t),
                    r.closePath(),
                    r.fill(),
                    r.stroke()
                }(e.scale * Math.cos(a), e.scale * Math.sin(a), 0, a + Math.PI / 2, r)
            } else if ("cookie" == e.name) {
                r.fillStyle = "#cca861",
                si(0, 0, e.scale, r),
                r.fillStyle = "#937c4b";
                for (var o = T / (h = 4), c = 0; c < h; ++c)
                    si((u = s.randInt(e.scale / 2.5, e.scale / 1.7)) * Math.cos(o * c), u * Math.sin(o * c), s.randInt(4, 5), r, !0)
            } else if ("cheese" == e.name) {
                var h, u;
                for (r.fillStyle = "#f4f3ac",
                si(0, 0, e.scale, r),
                r.fillStyle = "#c3c28b",
                o = T / (h = 4),
                c = 0; c < h; ++c)
                    si((u = s.randInt(e.scale / 2.5, e.scale / 1.7)) * Math.cos(o * c), u * Math.sin(o * c), s.randInt(4, 5), r, !0)
            } else if ("wood wall" == e.name || "stone wall" == e.name || "castle wall" == e.name) {
                r.fillStyle = "castle wall" == e.name ? "#83898e" : "wood wall" == e.name ? "#a5974c" : "#939393";
                var f = "castle wall" == e.name ? 4 : 3;
                ai(r, f, 1.1 * e.scale, 1.1 * e.scale),
                r.fill(),
                r.stroke(),
                r.fillStyle = "castle wall" == e.name ? "#9da4aa" : "wood wall" == e.name ? "#c9b758" : "#bcbcbc",
                ai(r, f, .65 * e.scale, .65 * e.scale),
                r.fill()
            } else if ("spikes" == e.name || "greater spikes" == e.name || "poison spikes" == e.name || "spinning spikes" == e.name) {
                r.fillStyle = "poison spikes" == e.name ? "#7b935d" : "#939393";
                var d = .6 * e.scale;
                ai(r, "spikes" == e.name ? 5 : 6, e.scale, d),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#a5974c",
                si(0, 0, d, r),
                r.fillStyle = "#c9b758",
                si(0, 0, d / 2, r, !0)
            } else if ("windmill" == e.name || "faster windmill" == e.name || "power mill" == e.name)
                r.fillStyle = "#a5974c",
                si(0, 0, e.scale, r),
                r.fillStyle = "#c9b758",
                ci(0, 0, 1.5 * e.scale, 29, 4, r),
                r.fillStyle = "#a5974c",
                si(0, 0, .5 * e.scale, r);
            else if ("mine" == e.name)
                r.fillStyle = "#939393",
                ai(r, 3, e.scale, e.scale),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#bcbcbc",
                ai(r, 3, .55 * e.scale, .65 * e.scale),
                r.fill();
            else if ("sapling" == e.name)
                for (c = 0; c < 2; ++c)
                    ai(r, 7, d = e.scale * (c ? .5 : 1), .7 * d),
                    r.fillStyle = c ? "#b4db62" : "#9ebf57",
                    r.fill(),
                    c || r.stroke();
            else if ("pit trap" == e.name)
                r.fillStyle = "#a5974c",
                ai(r, 3, 1.1 * e.scale, 1.1 * e.scale),
                r.fill(),
                r.stroke(),
                r.fillStyle = it,
                ai(r, 3, .65 * e.scale, .65 * e.scale),
                r.fill();
            else if ("boost pad" == e.name)
                r.fillStyle = "#7e7f82",
                oi(0, 0, 2 * e.scale, 2 * e.scale, r),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#dbd97d",
                function(e, t) {
                    t = t || be;
                    var n = e * (Math.sqrt(3) / 2);
                    t.beginPath(),
                    t.moveTo(0, -n / 2),
                    t.lineTo(-e / 2, n / 2),
                    t.lineTo(e / 2, n / 2),
                    t.lineTo(0, -n / 2),
                    t.fill(),
                    t.closePath()
                }(1 * e.scale, r);
            else if ("turret" == e.name)
                r.fillStyle = "#a5974c",
                si(0, 0, e.scale, r),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#939393",
                oi(0, -25, .9 * e.scale, 50, r),
                si(0, 0, .6 * e.scale, r),
                r.fill(),
                r.stroke();
            else if ("platform" == e.name) {
                r.fillStyle = "#cebd5f";
                var p = 2 * e.scale
                  , g = p / 4
                  , m = -e.scale / 2;
                for (c = 0; c < 4; ++c)
                    oi(m - g / 2, 0, g, 2 * e.scale, r),
                    r.fill(),
                    r.stroke(),
                    m += p / 4
            } else
                "healing pad" == e.name ? (r.fillStyle = "#7e7f82",
                oi(0, 0, 2 * e.scale, 2 * e.scale, r),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#db6e6e",
                ci(0, 0, .65 * e.scale, 20, 4, r, !0)) : "spawn pad" == e.name ? (r.fillStyle = "#7e7f82",
                oi(0, 0, 2 * e.scale, 2 * e.scale, r),
                r.fill(),
                r.stroke(),
                r.fillStyle = "#71aad6",
                si(0, 0, .6 * e.scale, r)) : "blocker" == e.name ? (r.fillStyle = "#7e7f82",
                si(0, 0, e.scale, r),
                r.fill(),
                r.stroke(),
                r.rotate(Math.PI / 4),
                r.fillStyle = "#db6e6e",
                ci(0, 0, .65 * e.scale, 20, 4, r, !0)) : "teleporter" == e.name && (r.fillStyle = "#7e7f82",
                si(0, 0, e.scale, r),
                r.fill(),
                r.stroke(),
                r.rotate(Math.PI / 4),
                r.fillStyle = "#d76edb",
                si(0, 0, .5 * e.scale, r, !0));
            if(!t) {
                r.globalAlpha = 0.6;
                r.fillStyle = R && e.owner && e.owner.sid == R.sid ? "" : (e.owner && R && R.team && isAlly(e.owner.sid)) ? "" : "#780c0c";
                if(R && e.owner && e.owner.sid == R.sid) {
                }else if(e.owner && R && R.team && isAlly(e.owner.sid)) {
                }else {
                    if(e.name.includes("spike") || e.name.includes("pit trap")) {
                        if(e.name.includes("spike")) {
                            r.globalAlpha = 0.6;
                        }else {
                            r.globalAlpha = 1;
                        }
                        r.fill();
                    }
                }
            }
            n = i;
            if(!t) {
                ii[e.id + (R && e.owner && e.owner.sid == R.sid ? 0 : R && R.team && e.owner && isAlly(e.owner.sid) ? 25 : 50)] = n;
            }
        }
        return n
    }
    function si(e, t, n, i, r, s) {
        (i = i || be).beginPath(),
        i.arc(e, t, n, 0, 2 * Math.PI),
        s || i.fill(),
        r || i.stroke()
    }
    function ai(e, t, n, i, p) {
        var r, s, a = Math.PI / 2 * 3, o = Math.PI / t;
        e.beginPath(),
        e.moveTo(0, -n);
        if(p) e.rotate(Math.PI/2);
        for (var c = 0; c < t; c++)
            r = Math.cos(a) * n,
            s = Math.sin(a) * n,
            e.lineTo(r, s),
            a += o,
            r = Math.cos(a) * i,
            s = Math.sin(a) * i,
            e.lineTo(r, s),
            a += o;
        e.lineTo(0, -n),
        e.closePath()
    }
    function oi(e, t, n, i, r, s) {
        r.fillRect(e - n / 2, t - i / 2, n, i),
        s || r.strokeRect(e - n / 2, t - i / 2, n, i)
    }
    function ci(e, t, n, i, r, s, a) {
        s.save(),
        s.translate(e, t),
        r = Math.ceil(r / 2);
        for (var o = 0; o < r; o++)
            oi(0, 0, 2 * n, i, s, a),
            s.rotate(Math.PI / r);
        s.restore()
    }
    function doAntiTrap(id, x, y) {
        if(!toggles.antitrap()) return;
        if(id == 15 && Math.hypot(y - R.y2, x - R.x2) <= 80) {
            let angle = Math.atan2(y - R.y2, x - R.x2) + toRad(180);
            for(let i = 0; i < Math.PI * 2; i+=Math.PI/2) {
                cplace(R.items[2], i + angle);
            }
        }
    }
    function li(e) {
        for (var t = 0; t < e.length;) {
            if(e[t + 7] && e[t + 7] != R.sid && !isAlly(e[t + 7])) {
                doAntiTrap(e[t + 6], e[t + 1], e[t + 2]);
            }
            nt.add(e[t], e[t + 1], e[t + 2], e[t + 3], e[t + 4], e[t + 5], l.list[e[t + 6]], !0, e[t + 7] >= 0 ? {
                sid: e[t + 7]
            } : null);
            t += 8;
        }
    }
    function hi(e, t) {
        let _;
        (_ = Mi(t)) && (_.xWiggle += o.gatherWiggle * Math.cos(e),
        _.yWiggle += o.gatherWiggle * Math.sin(e),
        (newPromise().then(function(l){
            _.currentHealth -= l;
            if(_.currentHealth < 0) {
                Cn(_.sid);
            }
        }).catch(function(e){
            allDamages = [];
        })))
    }
    function ui(e, t) {
        if((_ = Mi(e))) {
            _.dir = t;
            _.xWiggle += o.gatherWiggle * Math.cos(t + Math.PI);
            _.yWiggle += o.gatherWiggle * Math.sin(t + Math.PI);
            if(toggles.antiTurretSync()) {
                let distance = Math.hypot(R.y2 - _.y, R.x2 - _.x);
                let x = _.x + Math.cos(t) * distance;
                let y = _.y + Math.sin(t) * distance;
                if(Math.hypot(y - R.y2, x - R.x2) <= 35 && !willBlock(_) && _.owner.sid != R.sid && !isAlly(_.owner.sid)) {
                    turretSync++;
                    setTimeout(() => {
                        turretSync--;
                    }, 250);
                }
            }else if(!toggles.antiTurretSync()) {
                turretSync = 0;
            }
            if(turretSync > 2) {
                sn("homo turret sync");
                place(R.items[3], Math.atan2(_.y - R.y2, _.x - R.x2));
                rangedSoldier = true;
                Jt(6);
                setTimeout(() => {
                    rangedSoldier = false;
                }, 600);
            }
        }
    }
    var otSoldier = false, bulletDmgs = [];
    function bulletStuff(sid, damage) {
        if(R.sid != sid && !isAlly(sid)) {
            let index = Ii(sid);
            if(typeof bulletDmgs[sid] == "object") {
                bulletDmgs[sid].push(damage);
            }else {
                bulletDmgs[sid] = [damage];
            }
            if(index && dist2(index, R) < 260 && (index.primary.id == 4 || index.primary.id == 5) && index.primary.variant > 1 && index.primary.reload == 1) {
                otSoldier = true;
                Jt(6);
                setTimeout(() => {
                    otSoldier = false;
                }, 500);
            }
            let dmg = 0;
            for(let i = 0; i < bulletDmgs[sid].length; i++) {
                dmg += bulletDmgs[sid][i];
            }
            if(dmg >= 75 && dist2(index, R) > 300 && R.shameCount < 5 && Date.now() - lastAntiHeal >= 200 && toggles.backUpRAnti()) {
                heal();
                lastAntiHeal = Date.now();
                bulletDmgs[sid] = [];
                rangedSoldier = true;
                Jt(6);
                setTimeout(() => {
                    rangedSoldier = false;
                }, 200);
            }
            setTimeout(() => {
                if(bulletDmgs[sid]) {
                    bulletDmgs[sid].shift();
                }
            }, 500);
        }
    }
    var turretSync = 0, rangedSoldier = false;
    function willBlock(e) {
        let be = Math.hypot(e.y-R.y2, e.x-R.x2)/1.56;
        let fc = {num: 360,scale: 22,range: 700};
        for(let i = 0; i < N.length; i++) {
            let me = Math.hypot(N[i].y-R.y2, N[i].x-R.x2)/1.56;
            if(N[i].sid != e.sid && me < fc.range && me < be) {
                let dg = Math.atan2(N[i].y-R.y2, N[i].x-R.x2)/(Math.PI/180), pj = Math.atan2(e.y-R.y2, e.x-R.x2)/(Math.PI/180);
                if((Math.abs(dg-pj) < (me/fc.scale) || Math.abs(dg-pj) > (fc.num-(me/fc.scale))) &&
                   !["spikes", "wood wall", "stone wall", "castle wall", "greater spikes", "poison spikes", "spinning spikes", "mine", "sapling", "pit trap", "boost pad", "platform", "healing pad", "spawn pad", "teleporter", "blocker"].includes(N[i].name)) {
                    return true;
                }
            }
        }
        return false;
    }
    function fi(e, t, n, i, r, s, a, o) {
        if(lt) {
            J.addProjectile(e, t, n, i, r, s, null, null, a).sid = o;
            let min = Infinity;
            let id = -1;
            for (let i = 0; i < W.length; i++) {
                (_ = W[i]) && _.visible && _.secondary.id && l.weapons[_.secondary.id].projectile !== undefined && l.projectiles[l.weapons[_.secondary.id].projectile].speed == r && min > (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 80) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 80) ** 2 && (id = _, min = (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 80) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 80) ** 2);
            }
            if (Math.sqrt(min) > 60) {
                if (r == 1.5) {
                    for (let i = 0; i < W.length; i++) {
                        (_ = W[i]) && _.visible && min > (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 10) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 10) ** 2 && (id = _, min = (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 10) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 10) ** 2);
                    }
                    if (Math.sqrt(min) < 60) {
                        id.turret = -0.0444;
                        bulletStuff(id.sid, 25);
                    }
                } else {
                    for (let i = 0; i < W.length; i++) {
                        (_ = W[i]) && _.visible && _.secondary.id && min > (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 80) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 80) ** 2 && (id = _.sid, min = (_.x2 * 1.5 - _.x1 / 2 - e + Math.cos(n) * 80) ** 2 + (_.y2 * 1.5 - _.y1 / 2 - t + Math.sin(n) * 80) ** 2);
                    }
                    bulletStuff(id.sid, id.secondary ? id.secondary.dmg || 35 : 50);
                    setTimeout(() => {
                        id.secondary.reload = 0;
                    });
                }
            } else {
                bulletStuff(id.sid, 50);
                id.secondary.reload = -111 / l.weapons[15].speed;
            }
        }
    }
    function di(e, t) {
        for (var n = 0; n < G.length; ++n)
            G[n].sid == e && (G[n].range = t)
    }
    function pi(e) {
        (_ = Ei(e)) && _.startAnim()
    }
    function gi(e) {
        for (var t = 0; t < Y.length; ++t)
            Y[t].forcePos = !Y[t].visible,
            Y[t].visible = !1;
        if (e) {
            var n = Date.now();
            for (t = 0; t < e.length; )
                (_ = Ei(e[t])) ? (_.index = e[t + 1],
                _.t1 = void 0 === _.t2 ? n : _.t2,
                _.t2 = n,
                _.x1 = _.x,
                _.y1 = _.y,
                _.x2 = e[t + 2],
                _.y2 = e[t + 3],
                _.d1 = void 0 === _.d2 ? e[t + 4] : _.d2,
                _.d2 = e[t + 4],
                _.health = e[t + 5],
                _.dt = 0,
                _.visible = !0) : ((_ = Z.spawn(e[t + 2], e[t + 3], e[t + 4], e[t + 1])).x2 = _.x,
                _.y2 = _.y,
                _.d2 = _.dir,
                _.health = e[t + 5],
                Z.aiTypes[e[t + 1]].name || (_.name = o.cowNames[e[t + 6]]),
                _.forcePos = !0,
                _.sid = e[t],
                _.visible = !0),
                t += 7
        }
    }
    var mi = {};
    function yi(e, t) {
        var n = e.index
          , i = mi[n];
        if (!i) {
            var r = new Image;
            r.onload = function() {
                this.isLoaded = !0,
                this.onload = null
            }
            ,
            r.src = ".././img/animals/" + e.src + ".png",
            i = r,
            mi[n] = i
        }
        if (i.isLoaded) {
            var s = 1.2 * e.scale * (e.spriteMlt || 1);
            t.drawImage(i, -s, -s, 2 * s, 2 * s)
        }
    }
    function ki(e, t, n) {
        return e + n >= 0 && e - n <= oe && t + n >= 0 && t - n <= ce
    }
    function vi(e, t) {
        var n = function(e) {
            for (var t = 0; t < W.length; ++t)
                if (W[t].id == e)
                    return W[t];
            return null
        }(e[0]);
        n || (n = new u(e[0],e[1],o,s,J,nt,W,Y,l,et,tt),
        W.push(n)),
        n.spawn(t ? H : null),
        n.visible = !1,
        n.x2 = void 0,
        n.y2 = void 0,
        n.setData(e),
        t && (U = (R = n).x,
        D = R.y,
        $t(),
        On(),
        Dn(),
        Un(0),
        Be.style.display = "block")
    }
    function wi(e) {
        for (var t = 0; t < W.length; t++)
            if (W[t].id == e) {
                if(document.getElementById("enemyradar" + W[t].sid)) {
                    document.getElementById("enemyradar" + W[t].sid).remove();
                }
                W.splice(t, 1);
                break
            }
    }
    function bi(e, t) {
        if(R) {
            R.itemCounts[e] = t;
            if(e == 1) {
                for (let ee = 19; ee < 22; ee++) document.getElementById("itemCounts" + ee.toString()).innerHTML = t;
            }else if(e == 2) {
                for (let ee = 22; ee < 26; ee++) document.getElementById("itemCounts" + ee.toString()).innerHTML = t;
            }else if(e == 3) {
                for (let ee = 26; ee < 29; ee++) document.getElementById("itemCounts" + ee.toString()).innerHTML = t;
            }else if(e == 4) {
                document.getElementById("itemCounts29").innerHTML = t;
            }else if(e == 5) {
                document.getElementById("itemCounts31").innerHTML = t;
            }else if(e == 6) {
                document.getElementById("itemCounts32").innerHTML = t;
            }else if(e == 7) {
                document.getElementById("itemCounts33").innerHTML = t;
            }else if(e == 8) {
                document.getElementById("itemCounts34").innerHTML = t;
            }else if(e == 9) {
                document.getElementById("itemCounts35").innerHTML = t;
            }else if(e == 10) {
                document.getElementById("itemCounts36").innerHTML = t;
            }else if(e == 11) {
                document.getElementById("itemCounts30").innerHTML = t;
            }else if(e == 12) {
                document.getElementById("itemCounts37").innerHTML = t;
            }else if(e == 13) {
                document.getElementById("itemCounts38").innerHTML = t;
            }
        }
    }
    function xi(e, t, n) {
        R && (R[e] = t,
        n && On())
    }
    function place(id, angle = Math.atan2(ie - z / 2, ne - F / 2)) {
        Sn(id);
        r.send("c", 1, angle);
        r.send("c", 0, angle);
        Sn(autoSecondary.status == true ? R.weapons[1] : autoPrimary.status == true ? R.weapons[0] : R.weaponIndex, true);
    }
    window.place = place;
    function heal(d) {
        let heal = R.items[0] == 0 ? 20 : R.items[0] == 1 ? 40 : 30;
        let amount = d / heal;
        for(let i = 0; i < amount; i++) {
            place(R.items[0]);
        }
    }
    window.secondaryDmg = function(id) {
        if(id == 15) {
            return 50;
        }else if(id == 9) {
            return 25;
        }else if(id == 12) {
            return 35;
        }else if(id == 13) {
            return 30;
        }else {
            return 0;
        }
    };
    window.variantMulti = function(id) {
        if(id == 1) {
            return 1.1;
        }else if(id == 2 || id == 3) {
            return 1.18;
        }else {
            return 1;
        }
    };
    var enemiesNear = [];
    var needTick = 0;
    function sr(e) {
        if(R.skinIndex == 6) {
            if(e == 75) {
                return 57;
            }else {
                return Math.round(e * .75);
            }
        }else {
            return Math.round(e);
        }
    }
    function identifyDamage(source, damage) {
        damage = (damage / .75 == 75 ? 57 : damage == 49 || damage == 49.5 ? 50 : Math.round(damage));
        source = source.sort((a, b) => b.total - a.total)[0];
        if(source && source.length) {
            let _ = Ii(source[i].sid);
            if(damage == sr(_.primary.dmg * 1.5) || damage == sr(_.primary.dmg) || damage == sr(_.primary.dmg * 1.2)) {
                return [Math.round(_.primary.dmg * 1.5), (_.turret > .7 ? true : false), _];
            }
            if(damage == sr(_.secondary.dmg)) {
                return [([12, 10, 11].includes(damage) ? _.secondary.dmg + 25 : _.secondary.dmg), false, _];
            }else if(damage == sr(_.secondary.dmg + 25)) {
                return [_.secondary.dmg + 25, false, _];
            }else if(damage == sr(_.secondary.dmg * 1.5)) {
                return [_.secondary.dmg, false, _];
            }else if(damage == sr(25)) {
                return [25, false, _];
            }
        }
        return "unknown";
    }
    function addAllDamage() {
        let info = [], totalDamage = 0;
        for(let i = 0; i < enemiesNear.length; i++) {
            let _ = enemiesNear[i], dmg = 0;
            if(_.primary.reload > 0.7) {
                dmg += Math.round(_.primary.dmg * 1.5);
            }
            if(_.secondary.reload > 0.7) {
                dmg += _.secondary.dmg;
            }
            if(_.turret > 0.7) {
                dmg += 25;
            }
            if(_.primary.variant == 3) {
                dmg += 5;
            }
            if(_.secondary.variant == 3) {
                dmg += 5;
            }
            if(_.skinIndex == 11) {
                dmg += Math.round((R.weaponIndex < 9 ? _.primary.dmg : R.weapons[1] == 10 ? _.secondary.dmg : 0) * .45 * (R.skinIndex == 7 ? 1.5 : 1));
            }
            if(_.tailIndex == 21) {
                dmg += Math.round((R.weaponIndex < 9 ? _.primary.dmg : R.weapons[1] == 10 ? _.secondary.dmg : 0) * .25 * (R.skinIndex == 7 ? 1.5 : 1));
            }
            totalDamage += dmg;
            info.push({sid: _.sid, total: dmg});
        }
        if(R.skinIndex == 7) {
            totalDamage += 5;
        }
        return [info, totalDamage];
    }
    function backUpAnti(d) {
        let healSpeed = parseInt(document.getElementById("healSpeed").value);
        if((Ii(nearestEnemy[0]).primary.id == 4 || Ii(nearestEnemy[0]).primary.id == 5) && dist(nearestEnemy, R) < 300 && [38, 19, 50, 25].includes(d) && Date.now() - lastAntiHeal > 200 && R.shameCount < 5) {
            lastAntiHeal = Date.now();
            heal(d);
            needTick++;
            bulletDmgs = [];
        }else if(Ii(nearestEnemy[0]).secondary.id == 10 && Date.now() - lastAntiHeal > 200 && dist(nearestEnemy, R) < 300 && R.shameCount < 5 && [12, 10, 11, 60, 66, 71, 68, 74, 80].includes(d) && onlyEMP == false && Ii(nearestEnemy[0]).secondary.id) {
            lastAntiHeal = Date.now();
            onlySoldier = true;
            Jt(6);
            setTimeout(() => {
                heal(d);
                onlySoldier = false;
            }, 200);
        }else if([Math.round(R.primary.dmg * 1.5 * .45), Math.round(R.primary.dmg * 1.5 * .25)].includes(d) && Date.now() - lastAntiHeal > 200) {
            lastAntiHeal = Date.now();
            let _ = Ii(nearestEnemy[0]);
            if(_ && _.primary.id == 5 && _.primary.variant == 2 && R.shameCount < 5) {
                heal(d);
            }else {
                onlySoldier = true;
                Jt(6);
                setTimeout(() => {
                    heal(d);
                    onlySoldier = false;
                }, 200);
            }
        }else if(Ii(nearestEnemy[0]).primary.id == 7 && Date.now() - lastAntiHeal >= 200) {
            let _ = Ii(nearestEnemy[0]);
            let canEmpAnti = ((_.skinIndex == 11 || _.tailIndex == 21));
            if(R.skinIndex == 6 && (d == 30 || d == 45) && !canEmpAnti && onlySoldier == false && otSoldier == false && trapSoldier == false && rangedSoldier == false) {
                lastAntiHeal = Date.now();
                onlyEMP = true;
                Jt(22);
                setTimeout(() => {
                    heal(d);
                    onlyEMP = false;
                }, 200);
            }else if(d == 60 && R.shameCount < 5) {
                lastAntiHeal = Date.now();
                heal(d);
            }else {
                setTimeout(() => {
                    heal(d);
                }, healSpeed);
            }
        }else {
            setTimeout(() => {
                heal(d);
            }, healSpeed);
        }
    }
    var trapSoldier = false, lastAntiHeal = 0;
    function healing(d) {
        let allDamage = addAllDamage();
        let healSpeed = parseInt(document.getElementById("healSpeed").value);
        if([Math.round(R.primary.dmg * 1.5 * .45), Math.round(R.primary.dmg * 1.5 * .25)].includes(d) && Date.now() - lastAntiHeal >= 200) {
            lastAntiHeal = Date.now();
            let _ = Ii(nearestEnemy[0]);
            if(_ && _.primary.id == 5 && _.primary.variant == 2 && R.shameCount < 5) {
                heal(d);
            }else {
                onlySoldier = true;
                Jt(6);
                setTimeout(() => {
                    heal(d);
                    onlySoldier = false;
                }, 200);
            }
        }else if(nearestEnemy.length && Ii(nearestEnemy[0]).primary.id == 7 && Date.now() - lastAntiHeal >= 200) {
            let _ = Ii(nearestEnemy[0]);
            let canEmpAnti = ((_.skinIndex == 11 || _.tailIndex == 21));
            if(R.skinIndex == 6 && (d == 30 || d == 45) && !canEmpAnti && onlySoldier == false && otSoldier == false && trapSoldier == false && rangedSoldier == false) {
                lastAntiHeal = Date.now();
                onlyEMP = true;
                Jt(22);
                setTimeout(() => {
                    heal();
                    onlyEMP = false;
                }, 200);
            }else if(d == 60 && R.shameCount < 5) {
                lastAntiHeal = Date.now();
                heal(d);
            }else {
                setTimeout(() => {
                    heal(d);
                }, healSpeed);
            }
        }else if(nearestEnemy.length && dist(nearestEnemy, R) < 300 && [50, 38, 25, 19].includes(d) && Date.now() - lastAntiHeal >= 200) {
            lastAntiHeal = Date.now();
            if(R.shameCount < 5) {
                heal(d);
            }else {
                setTimeout(() => {
                    heal(d);
                }, healSpeed);
            }
        }else if(allDamage[1] >= 100) {
            let remove = identifyDamage(allDamage[0], d);
            if(remove == "unknown") {
                if(R.shameCount < 5 && Date.now() - lastAntiHeal >= 200 && d >= 19) {
                    heal(d);
                }else {
                    setTimeout(() => {
                        heal(d);
                    }, healSpeed);
                }
            }else {
                d = d == 49 ? 50 : d;
                let dmg = R.health - Math.abs(d), damage = allDamage[1] - remove[0];
                let canEmpAnti = ((remove[2].skinIndex == 11 || remove[2].tailIndex == 21));
                bulletDmgs = [];
                lastAntiHeal = Date.now();
                if(remove[1] && !canEmpAnti && ((dmg - damage) + 25 > 0) && onlySoldier == false && otSoldier == false && trapSoldier == false && rangedSoldier == false && R.skins[22]) {
                    onlyEMP = true;
                    Jt(22);
                    setTimeout(() => {
                        heal(d);
                        onlyEMP = false;
                    }, 200);
                }else if(dmg - Math.round(damage * 0.75) > 0 && R.skins[6]) {
                    onlySoldier = true;
                    Jt(6);
                    setTimeout(() => {
                        heal(d);
                        onlySoldier = false;
                    }, 200);
                }else {
                    if(R.shameCount < 5) {
                        heal(d);
                    }else {
                        setTimeout(() => {
                            heal(d);
                        }, healSpeed);
                    }
                }
            }
        }else if(nearestEnemy.length) {
            backUpAnti(d);
        }else {
            setTimeout(() => {
                heal(d);
            }, healSpeed);
        }
        if(nearestEnemy.length && canAB == true && autoaim == false && R.primary.reload == 1 && (d == 60 || d == 68) && hitting == false) {
            autoaim = true;
            Jt(7);
            Jt(R.tails[21] ? 21 : 0, 1);
            Sn(R.weapons[0], true);
            autoSecondary.change(false);
            autoPrimary.change(true);
            hitting = true;
            autoheal.change(true);
            setTimeout(() => {
                autoheal.change(false);
                hitting = false;
                autoaim = false;
                autoPrimary.change(false);
                autoSecondary.change(false);
            }, 100);
        }
    }
    function Si(e, t) {
        if((_ = Ii(e))) {
            let d = t - _.health;
            if(d >= 0) {
                if(d == 3 && _.tailIndex == 13) {
                    _.bullTick = tick;
                }else if(d == 6 && _.tailIndex == 13 && _.skinIndex == 13) {
                    _.bullTick = tick;
                }else if(d == 1 && _.tailIndex == 17) {
                    _.bullTick = tick;
                }else {
                    _.buildItem();
                }
            }else {
                _.hitTime = tick;
                if(d == -2 && _.skinIndex == 7 && _.tailIndex == 13) {
                    _.bullTick = tick;
                    if(_ == R) {
                        needTick = 0;
                    }
                }else if(d == -5) {
                    _.bullTick = tick;
                    if(_ == R) {
                        needTick = 0;
                    }
                }
                if(_ == R) {
                    healing(Math.abs(d));
                }
            }
            _.health = t;
        }
    }
    var autoaim = false;
    setInterval(() => {
        /*if(autoaim == true && R.dir != nearestEnemyAngle) {
            r.send("2", nearestEnemyAngle);
        }*/
        if(turretSync < 0) {
            turretSync = 0;
        }
    }, 7.5);
    function isAlly(id) {
        return Pt.includes(id);
    }
    window.isAlly = isAlly;
    var trapinfo = {last: false, health: 700, location: {x: 0, y: 0}}, intrap = false;
    function doinsta(e) {
        insta = false;
        if(e == 2) {
            autoaim = true;
            Jt(R.tails[21] ? 21 : 0, 1);
            Sn(R.weapons[1], true);
            autoSecondary.change(true);
            autoPrimary.change(false);
            Jt(53);
            autoheal.change(true);
            setTimeout(() => {
                Jt(R.tails[21] ? 21 : 0, 1);
                autoSecondary.change(false);
                Sn(R.weapons[0], true);
                Jt(7);
                autoPrimary.change(true);
                setTimeout(() => {
                    autoaim = false;
                    autoheal.change(false);
                    autoPrimary.change(false);
                    autoSecondary.change(false);
                }, 160);
            }, 90);
        }else if(e == 1) {
            autoaim = true;
            Jt(R.tails[21] ? 21 : 0, 1);
            Jt(11);
            Sn(R.weapons[0], true);
            autoPrimary.change(true);
            autoSecondary.change(false);
            autoheal.change(true);
            setTimeout(() => {
                Jt((nearestEnemy[9] == 6 || nearestEnemy[9] == 22) ? 20 : 53);
                Jt(11, 1);
                Sn(R.weapons[1], true);
                autoSecondary.change(true);
                autoPrimary.change(false);
                setTimeout(() => {
                    autoaim = false;
                    autoheal.change(false);
                    autoPrimary.change(false);
                    autoSecondary.change(false);
                }, 160);
            }, 90);
        }else {
            autoaim = true;
            Jt(R.tails[21] ? 21 : 0, 1);
            Jt(7);
            Sn(R.weapons[0], true);
            autoPrimary.change(true);
            autoSecondary.change(false);
            autoheal.change(true);
            setTimeout(() => {
                Jt((nearestEnemy[9] == 22) ? 20 : 53);
                Jt(11, 1);
                Sn(R.weapons[1], true);
                autoSecondary.change(true);
                autoPrimary.change(false);
                setTimeout(() => {
                    autoaim = false;
                    autoheal.change(false);
                    autoPrimary.change(false);
                    autoSecondary.change(false);
                }, 160);
            }, 90);
        }
    }
    var allEnemy = [], nearestEnemyAngle = 0, trapAngle = 0, scriptStatus = "none", nearestEnemy = [];
    function toRad(angle) {
        return angle / 180 * Math.PI;
    }
    var shopList = [
        [11, false],
        [15, true],
        [6, true],
        [7, true],
        [22, true],
        [40, true],
        [53, true],
        [31, true],
        [12, true],
        [11, true],
        [26, true],
        [21, false],
        [20, true],
        [18, false],
        [13, false],
    ];
    var autobuy = setInterval(() => {
        if(!toggles.autobuy()) return;
        if(shopList[0][1] == true) {
            et.filter(e => e.id == shopList[0][0]).forEach(t => {
                if(R && R.points >= t.price) {
                    Kt(t.id, 0);
                    shopList.shift();
                }
            });
        }else if(shopList[0][1] == false) {
            tt.filter(e => e.id == shopList[0][0]).forEach(t => {
                if(R && R.points >= t.price) {
                    Kt(t.id, 1);
                    shopList.shift();
                }
            });
        }
        if(shopList.length == 0 || !shopList.length) {
            clearInterval(autobuy);
            document.getElementById("autobuy").checked = false;
            document.getElementById("autobuy").disabled = true;
        }
    }, 500);
    function cplace(id, angle = Math.atan2(ie - z / 2, ne - F / 2)) {
        let item = l.list[id];
        let scale = 35 + item.scale + (item.placeOffset || 0);
        if(nt.checkItemLocation(R.x2 + Math.cos(angle) * scale,
                                R.y2 + Math.sin(angle) * scale,
                                item.scale,
                                0.6,
                                n.id,
                                false)) {
            place(id, angle);
        }
    }
    var canAB = false, lastNearestDist = 0, nearestDist = 0, preHit = {
        amount: [],
        info: [],
    }, turrets = [];
    function autoplace() {
        if(!nearestEnemy.length || mills.status) return;
        let trap = N.find(e => e.trap && (e.owner.sid == R.sid || isAlly(e.owner.sid)) && Math.hypot(e.y - nearestEnemy[2], e.x - nearestEnemy[1]) < 70);
        if(trap && dist(nearestEnemy, R) < 150) {
            /*let spikes = N.filter(e => e.dmg && (e.owner.sid == R.sid || isAlly(e.owner.sid)) && Math.hypot(e.y - nearestEnemy[2], e.x - nearestEnemy[1]) <= 130);
            if(dist(nearestEnemy, R) < 200 && spikes.length) {
                cplace(R.items[4], nearestEnemyAngle);
            }else {
                if(dist(nearestEnemy, R) <= 120) {
                    let fromEdge = 50 - Math.hypot(nearestEnemy[1] - trap.x, nearestEnemy[2] - trap.y),
                        cosY = Math.cos(Math.atan2(nearestEnemy[2] - trap.y, nearestEnemy[1] - trap.x)) * fromEdge + 10,
                        cosX = Math.sin(Math.atan2(nearestEnemy[2] - trap.y, nearestEnemy[1] - trap.x)) * fromEdge + 10,
                        rad = Math.atan2(cosY - R.y2, cosX - R.x2);
                    for(let i = 0; i < 18; i++){
                        cplace(R.items[2], i * 3 * Math.cos(i + rad) / 180 * Math.PI + nearestEnemyAngle);
                        cplace(R.items[2], i * 3 * Math.sin(i + rad) / 180 * Math.PI + nearestEnemyAngle);
                    }
                }
            }*/
            //cplace(R.items[2], nearestEnemyAngle);
            for(let i = 0; i < Math.PI * 2; i+=Math.PI/1.5) {
                cplace(R.items[2], i+nearestEnemyAngle);
            }
        }else if(dist(nearestEnemy, R) < 200) {
            for(let i = 0; i < Math.PI * 2; i+=Math.PI/1.5) {
                cplace(R.items[4], i);
            }
        }/*else {
            cplace(R.items[4], nearestEnemyAngle);
        }*/
        /*if(dist(nearestEnemy, R) < 250) {
            cplace(R.items[2], nearestEnemyAngle);
            //let i = nearestEnemyAngle-Math.PI/3; i < nearestEnemyAngle+Math.PI/3; i+=Math.PI/18
            for(let i = 0; i < Math.PI * 2; i+=Math.PI/2) {
                cplace(R.items[4], i);
            }
        }else {*/
    }
    var lastAllEnemies = [];
    var hitting = false;
    function drawTracer(_) {
        if (!document.getElementById("enemyradar" + _.sid)) {
            let newE = document.createElement("div");
            newE.id = `enemyradar${_.sid}`;
            newE.style = `
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            color: #fff;
            width: 0;
            height: 0;
            border: solid;
            border-color: transparent transparent transparent #000000;
            `;
            document.body.appendChild(newE);
        }
        let center_x = window.innerWidth / 2, center_y = window.innerHeight / 2;
		let rad = Math.atan2(_.y2 - R.y2, _.x2 - R.x2), alpha = Math.sqrt(Math.pow(0 - (R.x2 - _.x2), 2) + Math.pow(0 - (R.y2 - _.y2) * (16 / 9), 2)) * 100 / (ce / 2) / center_y;
		if (alpha > 1.0) alpha = 1.0;
		let tx = center_x + (center_y * alpha) * Math.cos(rad) - 20 / 2, ty = center_y + (center_y * alpha) * Math.sin(rad) - 20 / 2;
        document.getElementById("enemyradar" + _.sid).style.borderWidth = "10px 0px 10px 20px";
        document.getElementById("enemyradar" + _.sid).style.pointerEvents = "none";
        document.getElementById("enemyradar" + _.sid).style.left = tx + "px";
        document.getElementById("enemyradar" + _.sid).style.top = ty + "px";
        document.getElementById("enemyradar" + _.sid).style.opacity = alpha;
        document.getElementById("enemyradar" + _.sid).style.transform = `rotate(${((rad * 180) / Math.PI)}deg)`;
        document.getElementById("enemyradar" + _.sid).style.display = (R.team === null || R.team !== _.team) ? "block" : "none";
    }
    function canOT(distance, type) {
        if("chatbox" == document.activeElement.id.toLowerCase()) return false;
        if(type == "polearm") {
            let calDist = Math.abs(distance - 239);
            if(calDist <= 40 && R.primary.reload == 1 && R.turret == 1 && nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && !N.some(e => dist2(e, R) < dist(nearestEnemy, R) && (Math.abs(Math.atan2(e.y-R.y, e.x-R.x) - nearestEnemyAngle) <= (e.scale+10)/dist2(e, R)) && e.active && !e.ignoreCollision)) {
                if(calDist < 5) {
                    otHatting = true;
                    r.send("33", nearestEnemyAngle);
                    return true;
                }else {
                    Jt(40);
                    Jt(calDist < 20 ? 0 : 11, 1);
                    otHatting = true;
                    r.send("33", distance > 239 ? nearestEnemyAngle : nearestEnemyAngle + Math.PI);
                    return false;
                }
            }else {
                otHatting = false;
                return false;
            }
        }
    }
    var oneticking = false, otHatting = false;
    function canSyncHit() {
        let _ = Ii(nearestEnemy[0]);
        let distance = Math.hypot(_.y1 - _.y2, _.x1 - _.x2) * 2;
        if(R.primary.reload < 1) return false;
        if(dist(nearestEnemy, R)/1.56 > l.weapons[R.weapons[0]].range) return false;
        let isEnemyTraped = false;
        for(let i = 0; i < N.length; i++) {
            if(N[i] && N[i].name == "pit trap" && N[i].active && (N[i].owner.sid == R.sid || isAlly(N[i].owner.sid)) && Math.hypot(N[i].y - _.y2, N[i].x - _.x2)) {
                isEnemyTraped = true;
            }
            if(N[i] && ("spikes" == N[i].name || "greater spikes" == N[i].name || "poison spikes" == N[i].name || "spinning spikes" == N[i].name) && N[i].active && isEnemyTraped == false) {
                if((Math.hypot(N[i].y - _.y2, N[i].x - _.x2) + distance) <= (_.scale + N[i].scale + 20) && (N[i].owner.sid == R.sid || isAlly(N[i].owner.sid))) {
                    return true;
                }
            }
        }
        if(_.health - Math.round(R.primary.dmg * 1.5) <= 0) {
            return true;
        }
        return false;
    }
    function Ti(e) {
        tick++;
        lastAllEnemies = allEnemy;
        allEnemy = [];
        nearestEnemy = [];
        nearestEnemyAngle = 0;
        enemiesNear = [];
        var t = Date.now();
        for (var n = 0; n < W.length; n++) {
            if(document.getElementById("enemyradar" + W[n].sid)) {
                document.getElementById("enemyradar" + W[n].sid).style.display = "none";
            }
            W[n].forcePos = !W[n].visible;
            W[n].visible = false;
        }
        for (n = 0; n < e.length;) {
            _ = Ii(e[n])
            if(_) {
                _.t1 = void 0 === _.t2 ? t : _.t2;
                _.t2 = t;
                _.x1 = _.x;
                _.y1 = _.y;
                _.x2 = e[n + 1];
                _.y2 = e[n + 2];
                _.d1 = void 0 === _.d2 ? e[n + 3] : _.d2;
                _.d2 = e[n + 3];
                _.dt = 0;
                _.buildIndex = e[n + 4];
                _.weaponIndex = e[n + 5];
                _.weaponVariant = e[n + 6];
                _.team = e[n + 7];
                _.isLeader = e[n + 8];
                _.skinIndex = e[n + 9];
                _.tailIndex = e[n + 10];
                _.iconIndex = e[n + 11];
                _.zIndex = e[n + 12];
                _.visible = !0;
                _.update();
                if(!(_ == R || _.team && _.team == R.team)) {
                    drawTracer(_);
                    allEnemy.push(e.slice(n, n + 13));
                }
                if(_ == R) {
                    if(R.weapons[0] && R.primary.id != R.weapons[0]) {
                        R.primary.id = R.primary.id = R.weapons[0];
                    }else if(R.weapons[1] && R.secondary.id != R.weapons[1]) {
                        R.secondary.id = R.secondary.id = R.weapons[1];
                    }
                }
            }
            n+=13;
        }
        if(Math.sqrt(Math.pow((mills.y - R.y), 2) + Math.pow((mills.x - R.x), 2)) > 99) {
            if(mills.status) {
                place(R.items[3], mills.aim + toRad(180));
                place(R.items[3], mills.aim - toRad(69 + 180));
                place(R.items[3], mills.aim + toRad(69 + 180));
            }
            mills.x = R.x;
            mills.y = R.y;
        }
        if(allEnemy.length) {
            allEnemy = allEnemy.sort((a,b) => dist(a, R) - dist(b, R));
            nearestEnemy = allEnemy[0];
            for(let i = 0; i < allEnemy.length; i++) {
                let _ = Ii(allEnemy[i][0]);
                if(dist2(_, R)/1.7 <= l.weapons[_.primary.id].range + 35) {
                    enemiesNear.push(_);
                }
            }
        }
        allEnemy.forEach(e => {
            let _ = Ii(e[0]);
            if(!lastAllEnemies.length && _) {
                _.primary.reload = 1;
                _.secondary.reload = 1;
                _.turret = 1;
            }
        });
        lastAllEnemies.forEach(index => {
            if(!allEnemy.find(e => e[0] == index[0])) {
                let _ = Ii(index[0]);
                if(_) {
                    _.primary.reload = 1;
                    _.secondary.reload = 1;
                    _.turret = 1;
                }
            }
        });
        if(nearestEnemy.length) {
            nearestEnemyAngle = Math.atan2(nearestEnemy[2] - R.y2, nearestEnemy[1] - R.x2);
        }else {
            bulletDmgs = [];
            nearestEnemyAngle = 0;
        }
        if(nearestEnemy.length) {
            lastNearestDist = nearestDist;
            nearestDist = dist(nearestEnemy, R);
        }
        if((R.skins[11] || R.tails[21]) && nearestEnemy.length && toggles.antibull()) {
            preHit.amount = [];
            for(let i = 0; i < preHit.info.length; i++) {
                if(preHit.info[i] && preHit.info[i].primary.reload == 1) {
                    if(allEnemy.find(e => preHit.info[i].sid == e[0])) {
                        preHit.amount.push(true);
                    }
                }
            }
            preHit.info = [];
            for(let i = 0; i < enemiesNear.length; i++) {
                if(
                    enemiesNear[i].primary.reload + (111/l.weapons[enemiesNear[i].primary.id].speed) >= 1
                    &&
                    Math.round((enemiesNear[i].primary.reload + (111/l.weapons[enemiesNear[i].primary.id].speed))*100)/100 <= (enemiesNear[i].primary.id == 5 ? 1.15 : 1.2)
                ) {
                    preHit.info.push(enemiesNear[i]);
                }
            }
        }
        turrets = N.filter(i => i.name == "turret" && Math.hypot(i.y-R.y2, i.x-R.x2) <= 700 && i.active && i.owner.sid != R.sid && !isAlly(i.owner.sid) && !willBlock(i));
        if(!R.team && Pt.length) {
            Pt = [];
        }
        if(
            nearestEnemy.length && autoaim == false && R.items[4] == 15 &&
            toggles.autogrind() == false &&
            intrap == false && toggles.autoplace()
        ) {
            autoplace();
        }
        doAutoUpgrade();
        trapinfo.last = intrap;
        let nearestTrap = N.filter(e => e.trap && e.owner.sid != R.sid && !isAlly(e.owner.sid) && e.active && Math.hypot(e.y - R.y2, e.x - R.x2) < 80).sort(
            (e, t) => Math.hypot(e.y - R.y2, e.x - R.x2) - Math.hypot(t.y - R.y2, t.x - R.x2)
        )[0];
        if(nearestTrap) {
            intrap = true;
            trapinfo.health = nearestTrap.currentHealth;
            trapinfo.location = {
                x: nearestTrap.x,
                y: nearestTrap.y
            };
        }else {
            intrap = false;
            if(trapinfo.last == true) {
                trapSoldier = true;
                Jt(6);
                if(onlyEMP == true) {
                    if(R.shameCount < 5) {
                        //heal();
                    }
                    onlyEMP = false;
                }
                setTimeout(() => {
                    trapSoldier = false;
                }, 200);
            }
        }
        if(nearestEnemy.length && R.primary.reload == 1 && R.secondary.reload == 1 && R.turret == 1 && R.weapons[1]) {
            let cando = N.some(e => dist2(e, R) < dist(nearestEnemy, R) && (Math.abs(Math.atan2(e.y-R.y, e.x-R.x) - nearestEnemyAngle) <= (e.scale+10)/dist2(e, R)) && e.active && !e.ignoreCollision);
            if(insta == true && hitting == false) {
                let _ = Ii(nearestEnemy[0]), cando2 = true;
                if(_.weaponIndex == 11 && nearestEnemyAngle - _.dir <= Math.PI/3) {
                    cando2 = false;
                }
                if(cando2) {
                    if((dist(nearestEnemy, R) < 179 || nearestDist !== lastNearestDist && lastNearestDist >= 185 && nearestDist < 185)
                       && R.weapons[1] != 10 && !cando) {
                        if(nearestDist !== lastNearestDist && lastNearestDist >= 185 && nearestDist < 180) {
                            if(nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && R.skins[53] && R.weapons[1] != 13) {
                                doinsta(1);
                            }else {
                                doinsta(0);
                            }
                        }else if(
                            (R.shameCount > 3 && (((tick - R.bullTick) % 9) == 8)) ||
                            (nearestEnemy[9] == 11)
                        ) {
                            doinsta(2);
                        }else {
                            if(nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && R.skins[53] && R.weapons[1] != 13) {
                                doinsta(1);
                            }else {
                                doinsta(0);
                            }
                        }
                    }else if(dist(nearestEnemy, R) < 130 && nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && R.weapons[1] == 10) {
                        doinsta(2);
                    }
                }
            }
        }
        if(autoaim == true) {
            scriptStatus = "instaing";
            hitting = true;
        }else if(oneticking == true && R.weapons[0] == 4 && R.weapons[1] == 15 && R.primary.variant == 3) {
            scriptStatus = "doing ot";
            hitting = true;
        }else if(intrap == true && mills.space == false && toggles.autobreak()) {
            scriptStatus = "autobreaking";
            let trap = N.find(e => e.trap && nearestEnemy.length && (e.owner.sid == R.sid || isAlly(e.owner.sid)) && Math.hypot(e.y - nearestEnemy[2], e.x - nearestEnemy[1]) < 70);
            let weapon = (R.weapons[1] == 10 ? R.primary.reload == 1 && trapinfo.health <= 20 ? R.weapons[0] : 10 : R.weapons[0]);
            let spikes = N.filter(e => e.dmg && e.dmg > 0 && e.sid != R.sid && !isAlly(e.sid) && Math.hypot(e.y - R.y, e.x - R.x) < 130 && e.active);
            let buildings = N.filter(e => !e.ignoreCollision && !e.dmg && Math.hypot(e.y - R.y, e.x - R.x) < 200 && e.active && e.health);
            /*if(!trap && (spikes.length > 0 || buildings.length > 2)) {
                trapAngle = Number.MAX_VALUE;
            }else {*/
            trapAngle = Math.atan2(trapinfo.location.y - R.y2, trapinfo.location.x - R.x2);
            if(R.weaponIndex != weapon) Sn(weapon, true);
            if((weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                Jt(40);
                Jt(R.tails[21] ? 21 : 0, 1);
                r.send("c", 1, trapAngle);
                r.send("c", 0, trapAngle);
                hitting = true;
            }else {
                hitting = false;
                if(canTick()) {
                    needTick++;
                    Jt(7);
                }else if(turrets.length) {
                    Jt(22);
                    Jt(11, 1);
                }else if((spikes.length > 0 || buildings.length > 2) && !trap) {
                    Jt(26);
                    Jt(21, 1);
                }else if(nearestEnemy.length && (lastNearestDist > 180 && nearestDist < 180 || preHit.amount.length)) {
                    canAB = true;
                    Jt(11);
                    Jt(21, 1);
                }else {
                    Jt(6);
                    Jt(13, 1);
                }
            }
            r.send("2", (weapon == 10 ? R.secondary.reload == 1 : R.primary.reload == 1) ? trapAngle : Math.atan2(ie - z / 2, ne - F / 2));
        }else if(nearestEnemy.length && !toggles.autobullspam() && toggles.autohitsync() && canSyncHit() && hitting == false) {
            autoaim = true;
            hitting = true;
            Jt(7);
            Jt(0, 1);
            Sn(R.weapons[0], true);
            autoSecondary.change(false);
            autoPrimary.change(true);
            autoheal.change(true);
            setTimeout(() => {
                autoheal.change(false);
                autoaim = false;
                hitting = false;
                autoSecondary.change(false);
                autoPrimary.change(false);
            }, 100);
        }else if(tankSpam == true) {
            scriptStatus = "tankspam";
            let weapon = R.weapons[1] == 10 ? R.weapons[1] : R.weapons[0];
            Sn(weapon, true);
            if((weapon == R.weapons[1] ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                r.send("c", 1, Math.atan2(ie - z / 2, ne - F / 2));
                r.send("c", 0, Math.atan2(ie - z / 2, ne - F / 2));
                Jt(40);
                hitting = true;
            }else {
                hitting = false;
                if(canTick()) {
                    needTick++;
                    Jt(7);
                }else if(turrets.length) {
                    Jt(22);
                    Jt(11, 1);
                }else {
                    Jt(6);
                    Jt(11, 1);
                }
            }
            r.send("2", Math.atan2(ie - z / 2, ne - F / 2));
        }else if(toggles.autogrind()) {
            scriptStatus = "autogrind";
            if((R.weaponIndex > 9 ? R.secondary.reload == 1 : R.primary.reload == 1)) {
                r.send("c", 1, Math.atan2(ie - z / 2, ne - F / 2));
                r.send("c", 0, Math.atan2(ie - z / 2, ne - F / 2));
                Jt(40);
                hitting = true;
            }else {
                hitting = false;
            }
            r.send("2", Math.atan2(ie - z / 2, ne - F / 2));
        }else if(bowSpam == true) {
            scriptStatus = "bowSpam";
            if(R.weaponIndex != R.weapons[1]) Sn(R.weapons[1], true);
            if(R.secondary.reload == 1) {
                Jt(20);
                Jt(11, 1);
                r.send("c", 1, nearestEnemyAngle);
                r.send("c", 0, nearestEnemyAngle);
                hitting = true;
            }else {
                hitting = false;
                if(canTick() && R.skins[7]) {
                    needTick++;
                    Jt(7);
                }else if(turrets.length && R.skins[22]) {
                    Jt(22);
                    Jt(11, 1);
                }else if(R.y2 > 6850 && R.y2 < 7550 && R.skins[31]) {
                    Jt(31);
                    Jt(11, 1);
                }else if(nearestEnemy.length && dist(nearestEnemy, R) < 250 && R.skins[6]) {
                    Jt(6);
                    Jt(11, 1);
                }else if(R.y2 < 2400 && R.skins[15]) {
                    Jt(15);
                    Jt(11, 1);
                }else {
                    Jt(12);
                    Jt(11, 1);
                }
            }
            r.send("2", nearestEnemyAngle);
        }else if(nearestEnemy.length && toggles.autotick() == true && R.weapons[0] == 5 && toggles.autobullspam() == false && R.primary.variant >= 2 && canOT(dist(nearestEnemy, R), "polearm") && nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && hitting == false) {
            oneticking = true;
            r.send("33", nearestEnemyAngle);
            autoaim = true;
            Jt(53);
            Jt(0, 1);
            Sn(R.weapons[0], true);
            autoSecondary.change(false);
            autoPrimary.change(true);
            hitting = true;
            setTimeout(() => {
                Jt(7);
                Jt(18, 1);
                r.send("c", 1, nearestEnemyAngle);
                r.send("c", 0, nearestEnemyAngle);
                setTimeout(() => {
                    autoaim = false;
                    oneticking = false;
                    autoPrimary.change(false);
                    autoSecondary.change(false);
                }, 100);
            }, 100);
        /*}else if(nearestEnemy.length && toggles.autotick() == true && R.weapons[0] == 4 && R.weapons[1] == 15 && R.primary.variant == 3 && canOT(dist(nearestEnemy, R), "katana") && nearestEnemy[9] != 6 && nearestEnemy[9] != 22 && hitting == false) {
            oneticking = true;
            r.send("33", nearestEnemyAngle);
            hitting = true;
            Jt(53);
            Jt(11, 1);
            Sn(R.weapons[1], true);
            autoPrimary.change(false);
            autoSecondary.change(true);
            r.send("c", 1, nearestEnemyAngle + Math.PI);
            r.send("c", 0, nearestEnemyAngle + Math.PI);
            setTimeout(() => {
                autoaim = true;
                Jt(7);
                Jt(18, 1);
                Sn(R.weapons[0], true);
                autoSecondary.change(false);
                autoPrimary.change(true);
                r.send("c", 1, nearestEnemyAngle);
                r.send("c", 0, nearestEnemyAngle);
                setTimeout(() => {
                    autoaim = false;
                    oneticking = false;
                    autoPrimary.change(false);
                    autoSecondary.change(false);
                }, 100);
            }, 100);*/
        }else if(nearestEnemy.length && R.skins[11] && R.tails[21] && (lastNearestDist > 180 && nearestDist < 180 || preHit.amount.length)) {
            scriptStatus = "pab";
            canAB = true;
            Jt(11);
            Jt(21, 1);
        }else if((nearestEnemy.length && toggles.autobullspam() == true && insta == false && dist(nearestEnemy, R)/1.7 < l.weapons[R.weapons[0]].range && R.secondary.reload == 1) || mills.space == true) {
            scriptStatus = "auto bull spam";
            Sn(R.weapons[0], true);
            if(R.primary.reload == 1) {
                Jt(R.tails[18] ? 18 : 0, 1);
                /*if(R.weaponIndex != R.weapons[0]) {
                    Sn(R.weapons[0], true);
                }else if(dist(nearestEnemy, R) < 150) {
                    cplace(R.items[2], nearestEnemyAngle || pn());
                }*/
                if(nearestEnemy[9] == 11) {
                    Jt(6);
                }else {
                    Jt(7);
                }
                r.send("c", 1, nearestEnemyAngle || pn());
                r.send("c", 0, nearestEnemyAngle || pn());
                hitting = true;
            }else {
                hitting = false;
                if(turrets.length && R.skins[22]) {
                    Jt(22);
                    Jt(11, 1);
                }else if(nearestEnemy.length && nearestEnemy[9] == 11) {
                    Jt(6);
                    Jt(13, 1);
                }else if(nearestEnemy.length && R.skins[11] && R.tails[21] && (lastNearestDist > 180 && nearestDist < 180 || preHit.amount.length)) {
                    canAB = true;
                    Jt(11);
                    Jt(21, 1);
                }else {
                    Jt(6);
                    Jt(13, 1);
                }
            }
        }else {
            hitting = false;
            canAB = false;
            otHatting = false;
            scriptStatus = "none";
            autoreload();
            autohat();
        }
        let type = R.items[0] == 0 ? 20 : R.items[0] == 1 ? 40 : 30;
        document.getElementById("itemCounts16").innerHTML = Math.round(R.food / type);
        document.getElementById("itemCounts17").innerHTML = Math.round(R.food / type);
        document.getElementById("itemCounts18").innerHTML = Math.round(R.food / type);
        tempTracers = [];
    }
    var auorelad = false;
    function doAutoUpgrade() {
        if(toggles.autoupgrade() == true) {
            if(document.getElementById("upgradetype").value == 0) {
                if(R.items[5] != l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))) {
                    if(document.getElementById("upgradeItem7")) r.send("6", 7);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("cookie"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("cookie"))+16);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("pit"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("pit"))+16);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("greater"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("greater"))+16);
                    if(document.getElementById("upgradeItem10")) r.send("6", 10);
                    if(document.getElementById("upgradeItem") + (l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))+16)) r.send("6", l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))+16);
                }
            }else {
                if(R.items[5] != l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))) {
                    if(document.getElementById("upgradeItem5")) r.send("6", 5);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("cookie"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("cookie"))+16);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("pit"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("pit"))+16);
                    if(document.getElementById("upgradeItem" + (l.list.findIndex(e => e.name.includes("greater"))+16))) r.send("6", l.list.findIndex(e => e.name.includes("greater"))+16);
                    if(document.getElementById("upgradeItem10")) r.send("6", 10);
                    if(document.getElementById("upgradeItem") + (l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))+16)) r.send("6", l.list.findIndex(e => e.name.includes(document.getElementById("sixbuilding").value))+16);
                }
            }
        }
    }
    function autohat() {
        if(otHatting == true && nearestEnemy.length) return;
        if(canTick() && R.skins[7]) {
            needTick++;
            Jt(7);
            Jt(11, 1);
        }else if(turrets.length && R.skins[22]) {
            Jt(22);
            Jt(11, 1);
        }else if(R.y2 > 6850 && R.y2 < 7550 && R.skins[31]) {
            Jt(31);
            Jt(11, 1);
        }else if(mills.aim == null && toggles.tryhard()) {
            Jt(22);
            Jt(11, 1);
        }else if(nearestEnemy.length && dist(nearestEnemy, R) < 300 && R.skins[6]) {
            Jt(6);
            Jt(11, 1);
        }else if(R.y2 < 2400 && R.skins[15]) {
            Jt(15);
            Jt(11, 1);
        }else {
            Jt(12);
            Jt(11, 1);
        }
    }
    function autoreload() {
        if(!toggles.autoreload()) return;
        if(R.primary.reload != 1 && [4, 5].includes(R.weapons[0])) {
            auorelad = true;
            if(R.weaponIndex != R.weapons[0]) {
                Sn(R.weapons[0], 1);
            }
        }else if(R.secondary.reload != 1) {
            auorelad = true;
            if(R.weaponIndex != R.weapons[1]) {
                Sn(R.weapons[1], 1);
            }
        }else if(R.primary.reload != 1) {
            auorelad = true;
            if(R.weaponIndex != R.weapons[0]) {
                Sn(R.weapons[0], 1);
            }
        }else if(auorelad) {
            auorelad = false;
            if(R.weapons[1] == 10 && (R.weapons[0] == 4 || R.weapons[0] == 5)) {
                if(R.weaponIndex != R.weapons[1]) {
                    Sn(R.weapons[1], 1);
                }
            }else {
                if(R.weaponIndex != R.weapons[0]) {
                    Sn(R.weapons[0], 1);
                }
            }
        }
    }
    function canTick(e) {
        if(R.skinIndex == 45) return false;
        if(R.shameCount > 0 && ((tick - R.bullTick) % 9 == 0) || (needTick > 1)) {
            return true;
        }
        return false;
    }
    function dist(a, b){
        return Math.sqrt(Math.pow((b.y2 || b.y) - a[2], 2) + Math.pow((b.x2 || b.x) - a[1], 2))
    }
    function dist2(a, b){
        return Math.sqrt(Math.pow((b.y2 || b.y) - (a.y2 || a.y), 2) + Math.pow((b.x2 || b.x) - (a.x2 || a.x), 2))
    }
    function Ii(e) {
        for (var t = 0; t < W.length; ++t)
            if (W[t].sid == e)
                return W[t];
        return null
    }
    function Ei(e) {
        for (var t = 0; t < Y.length; ++t)
            if (Y[t].sid == e)
                return Y[t];
        return null
    }
    function Mi(e) {
        for (var t = 0; t < N.length; ++t)
            if (N[t].sid == e)
                return N[t];
        return null
    }
    var Ai = -1;
    function Pi() {
        var e = Date.now() - Ai;
        window.pingTime = e,
            Ie.innerText = "Ping: " + e + " ms";
    }
    var _et$ = false, isDark = false;
    setInterval(() => {
        isDark = !isDark;
    }, 39000);
    var _e$fds = setInterval(() => {
        if(document.getElementById("actionBarItem0") != null) {
            for (let i = 0; i <= 38; i++) {
                let doit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].some(a => {return a == i})
                if(!doit) {
                    let thing = document.createElement("div");
                    thing.setAttribute("id", "itemCounts" + (i));
                    thing.style = `
                    position: absolute;
                    top: 0;
                    padding-left: 5px;
                    font-size: 2em;
                    color: #fff;`;
                    thing.innerHTML = "0";
                    document.getElementById("actionBarItem" + JSON.stringify(i)).appendChild(thing);
                    document.getElementById("actionBarItem" + i).appendChild(thing);
                }
            }
            clearInterval(_e$fds);
        }
    }, 100);
    function Bi() {
        if(_et$ == false) {
            _et$ = true;
        }
        Ai = Date.now(),
        r.send("pp")
    }
    function Ci(e) {
        if (!(e < 0)) {
            var t = Math.floor(e / 60)
              , n = e % 60;
            n = ("0" + n).slice(-2),
            Ee.innerText = "Server restarting in " + t + ":" + n,
            Ee.hidden = !1
        }
    }
    function Oi(e) {
        window.open(e, "_blank")
    }
    window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
    ,
    function() {
        var e = o.mapScale / 2;
        nt.add(0, e, e + 200, 0, o.treeScales[3], 0),
        nt.add(1, e, e - 480, 0, o.treeScales[3], 0),
        nt.add(2, e + 300, e + 450, 0, o.treeScales[3], 0),
        nt.add(3, e - 950, e - 130, 0, o.treeScales[2], 0),
        nt.add(4, e - 750, e - 400, 0, o.treeScales[3], 0),
        nt.add(5, e - 700, e + 400, 0, o.treeScales[2], 0),
        nt.add(6, e + 800, e - 200, 0, o.treeScales[3], 0),
        nt.add(7, e - 260, e + 340, 0, o.bushScales[3], 1),
        nt.add(8, e + 760, e + 310, 0, o.bushScales[3], 1),
        nt.add(9, e - 800, e + 100, 0, o.bushScales[3], 1),
        nt.add(10, e - 800, e + 300, 0, l.list[4].scale, l.list[4].id, l.list[10]),
        nt.add(11, e + 650, e - 390, 0, l.list[4].scale, l.list[4].id, l.list[10]),
        nt.add(12, e - 400, e - 450, 0, o.rockScales[2], 2)
    }(),
    function e() {
        B = Date.now(),
        P = B - q,
        q = B,
        function() {
            if (R && (!C || B - C >= 1e3 / o.clientSendRate) && (C = B,
            r.send("2", pn())),
            An < 120 && (An += .1 * P,
            Ge.style.fontSize = Math.min(Math.round(An), 120) + "px"),
            R) {
                var e = s.getDistance(U, D, R.x, R.y)
                  , t = s.getDirection(R.x, R.y, U, D)
                  , n = Math.min(.01 * e * P, e);
                e > .05 ? (U += n * Math.cos(t),
                D += n * Math.sin(t)) : (U = R.x,
                D = R.y)
            } else
                U = o.mapScale / 2,
                D = o.mapScale / 2;
            for (var i = B - 1e3 / o.serverUpdateRate, a = 0; a < W.length + Y.length; ++a)
                if ((_ = W[a] || Y[a - W.length]) && _.visible)
                    if (_.forcePos)
                        _.x = _.x2,
                        _.y = _.y2,
                        _.dir = _.d2;
                    else {
                        var c = _.t2 - _.t1
                          , l = (i - _.t1) / c;
                        _.dt += P;
                        var h = Math.min(1.7, _.dt / 170)
                          , u = _.x2 - _.x1;
                        _.x = _.x1 + u * h,
                        u = _.y2 - _.y1,
                        _.y = _.y1 + u * h,
                        _.dir = Math.lerpAngle(_.d2, _.d1, Math.min(1.2, l))
                    }
            var f = (freeCam.status ? freeCam.x : U) - oe / 2
              , d = (freeCam.status ? freeCam.y : D) - ce / 2;
            let color = {snow: "", grass: "", des: "", river: ""};
            if(toggles.mapcolor()) {
                if(isDark) {
                    color = {snow: "#e6e6e6",grass: "#8dba2c",des: "#d3b945",river: "#78a1d3"};
                }else {
                    color = {snow: "#fff",grass: "#b6db66",des: "#dbc666",river: "#91b2db"};
                }
            }else {
                color = {snow: "#fff",grass: "#b6db66",des: "#dbc666",river: "#91b2db"};
            }
            o.snowBiomeTop - d <= 0 && o.mapScale - o.snowBiomeTop - d >= ce ? (be.fillStyle = color.grass,
            be.fillRect(0, 0, oe, ce)) : o.mapScale - o.snowBiomeTop - d <= 0 ? (be.fillStyle = color.des,
            be.fillRect(0, 0, oe, ce)) : o.snowBiomeTop - d >= ce ? (be.fillStyle = color.snow,
            be.fillRect(0, 0, oe, ce)) : o.snowBiomeTop - d >= 0 ? (be.fillStyle = color.snow,
            be.fillRect(0, 0, oe, o.snowBiomeTop - d),
            be.fillStyle = color.grass,
            be.fillRect(0, o.snowBiomeTop - d, oe, ce - (o.snowBiomeTop - d))) : (be.fillStyle = color.grass,
            be.fillRect(0, 0, oe, o.mapScale - o.snowBiomeTop - d),
            be.fillStyle = color.des,
            be.fillRect(0, o.mapScale - o.snowBiomeTop - d, oe, ce - (o.mapScale - o.snowBiomeTop - d))),
            In || ((ee += te * o.waveSpeed * P) >= o.waveMax ? (ee = o.waveMax,
            te = -1) : ee <= 1 && (ee = te = 1),
            be.globalAlpha = 1,
            be.fillStyle = color.des,
            qn(f, d, be, o.riverPadding),
            be.fillStyle = color.river,
            qn(f, d, be, 250 * (ee - 1)));
            be.lineWidth = 8;
            /*be.strokeStyle = "clear",
            be.globalAlpha = .0,
            be.beginPath();
            for (var p = ((14400-f) % 1440); p < oe; p += 1440)
                p > 0 && (be.moveTo(p, 0),
                be.lineTo(p, ce));
            for (var g = ((14400-d) % 1440); g < ce; g += 1440)
                p > 0 && (be.moveTo(0, g),
                be.lineTo(oe, g));*/
            for (/*be.stroke(),*/
            be.globalAlpha = 1,
            be.strokeStyle = it,
            Yn(-1, f, d),
            be.globalAlpha = 1,
            be.lineWidth = 5.5,
            zn(0, f, d),
            Xn(f, d, 0),
            be.globalAlpha = 1,
            a = 0; a < Y.length; ++a)
                (_ = Y[a]).active && _.visible && (_.animate(P),
                be.save(),
                be.translate(_.x - f, _.y - d),
                be.rotate(_.dir + _.dirPlus - Math.PI / 2),
                yi(_, be),
                be.restore());
            if (Yn(0, f, d),
            zn(1, f, d),
            Yn(1, f, d),
            Xn(f, d, 1),
            Yn(2, f, d),
            Yn(3, f, d),
            be.fillStyle = "#000",
            be.globalAlpha = .09,
            f <= 0 && be.fillRect(0, 0, -f, ce),
            o.mapScale - f <= oe) {
                var y = Math.max(0, -d);
                be.fillRect(o.mapScale - f, y, oe - (o.mapScale - f), ce - y)
            }
            if (d <= 0 && be.fillRect(-f, 0, oe + f, -d),
            o.mapScale - d <= ce) {
                var k = Math.max(0, -f)
                  , v = 0;
                o.mapScale - f <= oe && (v = oe - (o.mapScale - f)),
                be.fillRect(k, o.mapScale - d, oe - k - v, ce - (o.mapScale - d))
            }
            for (be.globalAlpha = 1,
            be.fillStyle = "rgba(0, 0, 70, 0.35)",
            be.fillRect(0, 0, oe, ce),
            be.strokeStyle = rt,
            a = 0; a < W.length + Y.length; ++a)
                if ((_ = W[a] || Y[a - W.length]).visible && (10 != _.skinIndex || _ == R || _.team && _.team == R.team)) {
                    var w = (_.team ? "[" + _.team + "] " : "") + (_.isPlayer && _ != R ? "["+_.primary.id+"/"+_.secondary.id+"/"+(_.turret==1?1:0)+"] " : "") + ((_ == R && toggles.streamermode() ? "FZ is Big Dog" : _.name) || "");
                    if ("" != w) {
                        if (be.font = (_.nameScale || 30) + "px Hammersmith One",
                        be.fillStyle = "white",
                        be.textBaseline = "middle",
                        be.textAlign = "center",
                        be.lineWidth = _.nameScale ? 11 : 8,
                        be.lineJoin = "round",
                        be.strokeText(w, _.x - f, _.y - d - _.scale - o.nameY),
                        be.fillText(w, _.x - f, _.y - d - _.scale - o.nameY),
                        _.isLeader && Rn.crown.isLoaded) {
                            var b = o.crownIconScale;
                            k = _.x - f - b / 2 - be.measureText(w).width / 2 - o.crownPad,
                            be.drawImage(Rn.crown, k, _.y - d - _.scale - o.nameY - b / 2 - 5, b, b)
                        }
                        1 == _.iconIndex && Rn.skull.isLoaded && (b = o.crownIconScale,
                        k = _.x - f - b / 2 + be.measureText(w).width / 2 + o.crownPad,
                        be.drawImage(Rn.skull, k, _.y - d - _.scale - o.nameY - b / 2 - 5, b, b))
                        Rn.crosshair.isLoaded && insta && nearestEnemy.length && _.sid == nearestEnemy[0] && _.isPlayer &&
                            (b = 2 * o.playerScale -10,
                             be.drawImage(Rn.crosshair, _.x - f - b / 2, _.y - d - b / 2, b, b))
                    }
                    if(_ == R) {
                        let text = "["+mills.status+"/"+insta+"/"+66+","+window.pingTime+","+(R.turret==1?1:0)+"]";
                        be.textAlign = "center";
                        be.fillStyle = "white";
                        be.lineJoin = "round";
                        be.font = "20px Hammersmith One";
                        be.strokeStyle = "clear";
                        be.lineWidth = 6;
                        be.strokeText(text, _.x - f, _.y - d + _.scale + o.nameY + (30));
                        be.fillText(text, _.x - f, _.y - d + _.scale + o.nameY + (30));
                        if(toggles.statsmenu()) {
                            statusMenu.innerHTML = `
                            Auto-Insta: ${insta?"ON":"OFF"}<br>
                            Music: ${spamchat?"ON":"OFF"}<br>
                            `;
                        }else {
                            statusMenu.innerHTML = "";
                        }
                        for(let i = 0; i < tempTracers.length; i++) {
                            if(tempTracers[i]) {
                                be.beginPath();
                                be.moveTo(R.x2 - f, R.y2 - d);
                                be.lineTo(tempTracers[i].x - f, tempTracers[i].y - d);
                                be.stroke();
                            }
                        }
                    }
                    if(_.isPlayer) {
                        if(toggles.shamecount()) {
                            be.font = (_.nameScale || 30) + "px Hammersmith One";
                            be.fillStyle = "#ff4141";
                            be.textBaseline = "middle";
                            be.textAlign = "center";
                            be.lineWidth = _.nameScale ? 11 : 8;
                            be.lineJoin = "round";
                            be.strokeText(_.shameCount, (_.iconIndex == 1 ? (_.x - f - 30 + be.measureText(w).width / 2 + o.crownPad * 3.5 + 5) : (_.x - f + be.measureText(w).width / 2 + o.crownPad)), _.y - d - _.scale - o.nameY);
                            be.fillText(_.shameCount, (_.iconIndex == 1 ? (_.x - f - 30 + be.measureText(w).width / 2 + o.crownPad * 3.5 + 5) : (_.x - f + be.measureText(w).width / 2 + o.crownPad)), _.y - d - _.scale - o.nameY);
                        }
                        if(toggles.reloadbars()) {
                            be.fillStyle = rt;
                            be.roundRect(_.x - f + 2 - o.healthBarPad, _.y - d + _.scale + o.nameY - 13, 2 * 23.5 + 2 * o.healthBarPad, 17, 10);
                            be.fill();
                            be.fillStyle = _.secondary.reload == 1 ? "yellow" : "hsl(" + 360 * _.secondary.reload+ ", 50%, 60%)";
                            be.roundRect(_.x - f + 2, _.y - d + _.scale + o.nameY - 13 + o.healthBarPad, 2 * 23.5 * (_.secondary.reload), 16 - 2 * o.healthBarPad, 10);
                            be.fill();
                            be.fillStyle = rt;
                            be.roundRect(_.x - f - 50 - o.healthBarPad, _.y - d + _.scale + o.nameY - 13, 2 * 25.5 + 2 * o.healthBarPad, 17, 10);
                            be.fill();
                            be.fillStyle = _.primary.reload == 1 ? "yellow" : "hsl(" + 360 * _.primary.reload+ ", 50%, 60%)";
                            be.roundRect(_.x - f - 50, _.y - d + _.scale + o.nameY - 13 + o.healthBarPad, 2 * 25.5 * (_.primary.reload), 16 - 2 * o.healthBarPad, 10);
                            be.fill();
                        }
                    }
                    _.health > 0 && (o.healthBarWidth,
                    be.fillStyle = rt,
                    be.roundRect(_.x - f - o.healthBarWidth - o.healthBarPad, _.y - d + _.scale + o.nameY, 2 * o.healthBarWidth + 2 * o.healthBarPad, 17, 8),
                    be.fill(),
                    be.fillStyle = _ == R || _.team && _.team == R.team ? "#8ecc51" : "#cc5151",
                    be.roundRect(_.x - f - o.healthBarWidth, _.y - d + _.scale + o.nameY + o.healthBarPad, 2 * o.healthBarWidth * (_.health / _.maxHealth), 17 - 2 * o.healthBarPad, 7),
                    be.fill())
                }
            for (m.update(P, be, f, d),
            a = 0; a < W.length; ++a)
                if ((_ = W[a]).visible && _.chatCountdown > 0) {
                    _.chatCountdown -= P,
                    _.chatCountdown <= 0 && (_.chatCountdown = 0),
                    be.font = "32px Hammersmith One";
                    var x = be.measureText(_.chatMessage);
                    be.textBaseline = "middle",
                    be.textAlign = "center",
                    k = _.x - f,
                    y = _.y - _.scale - d - 90;
                    var S = x.width + 17;
                    be.fillStyle = "rgba(0,0,0,0.2)",
                    be.roundRect(k - S / 2, y - 23.5, S, 47, 6),
                    be.fill(),
                    be.fillStyle = "#fff",
                    be.fillText(_.chatMessage, k, y)
                }
            !function(e) {
                if (R && R.alive) {
                    Ke.clearRect(0, 0, Ne.width, Ne.height),
                    Ke.strokeStyle = "#fff",
                    Ke.lineWidth = 4;
                    for (var t = 0; t < qt.length; ++t)
                        (Vt = qt[t]).update(Ke, e);
                    if (Ke.globalAlpha = 1,
                    Ke.fillStyle = "#fff",
                    si(R.x / o.mapScale * Ne.width, R.y / o.mapScale * Ne.height, 7, Ke, !0),
                    Ke.fillStyle = "rgba(255, 255, 255, 0.35)",
                    R.team && Et) {
                        for (t = 0; t < Et.length; t += 2) {
                            si(Et[t] / o.mapScale * Ne.width, Et[t + 1] / o.mapScale * Ne.height, 7, Ke, !0);
                        }
                    }
                    It && (Ke.fillStyle = "#fc5553",
                    Ke.font = "34px Hammersmith One",
                    Ke.textBaseline = "middle",
                    Ke.textAlign = "center",
                    Ke.fillText("x", It.x / o.mapScale * Ne.width, It.y / o.mapScale * Ne.height)),
                    Mt && (Ke.fillStyle = "#fff",
                    Ke.font = "34px Hammersmith One",
                    Ke.textBaseline = "middle",
                    Ke.textAlign = "center",
                    Ke.fillText("x", Mt.x / o.mapScale * Ne.width, Mt.y / o.mapScale * Ne.height))
                    for(let i = 0; i < infinteTracers.length; i++) {
                        if(infinteTracers[i] && Date.now() - infinteTracers[i].time <= 30000 && toggles.infiniterange() && Math.hypot(infinteTracers[i].y - R.y2, infinteTracers[i].x - R.x2) > 600) {
                            Ke.fillStyle = "#fff";
                            Ke.font = "34px Hammersmith One";
                            Ke.textBaseline = "middle";
                            Ke.textAlign = "center";
                            Ke.fillText("", infinteTracers[i].x / o.mapScale * Ne.width, infinteTracers[i].y / o.mapScale * Ne.height);
                        }else if(infinteTracers[i] && Date.now() - infinteTracers[i].time > 30000) {
                            infinteTracers.splice(i, 1);
                        }else if(Math.hypot(infinteTracers[i].y - R.y2, infinteTracers[i].x - R.x2) <= 600) {
                            infinteTracers.splice(i, 1);
                        }
                    }
                }
            }(P),
            -1 !== re.id && Fn(re.startX, re.startY, re.currentX, re.currentY),
            -1 !== se.id && Fn(se.startX, se.startY, se.currentX, se.currentY)
        }()
        if(R && toggles.darkmode()) {
            let eb = be.getTransform();
            let grd = be.createRadialGradient(oe/2, ce/2, 100, oe/2, ce/2, 1000);
            grd.addColorStop(0, "rgb(0, 0, 0, 0)"), grd.addColorStop(0.4, "rgb(0, 0, 0, 0.3)"), grd.addColorStop(1, "rgb(0, 0, 0, 0.100)");
            be.fillStyle = grd;
            be.fillRect(0, 0, oe, ce);
            be.setTransform(eb);
        }
        requestAnimFrame(e)
    }(),
    window.openLink = Oi,
    window.aJoinReq = Dt,
    window.follmoo = function() {
        H || (H = !0,
        I("moofoll", 1))
    }
    ,
    window.kickFromClan = Lt,
    window.sendJoin = Ft,
    window.leaveAlliance = Ht,
    window.createAlliance = zt,
    window.storeBuy = Kt,
    window.storeEquip = Jt,
    window.showItemInfo = Tt,
    window.selectSkinColor = function(e) {
        ae = e,
        en()
    }
    ,
    window.changeStoreIndex = function(e) {
        Xt != e && (Xt = e,
        Gt())
    }
    ,
    window.config = o
}
, function(e, t) {
    !function(e, t, n) {
        function i(e, t) {
            return typeof e === t
        }
        var r = []
          , s = []
          , a = {
            _version: "3.5.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout((function() {
                    t(n[e])
                }
                ), 0)
            },
            addTest: function(e, t, n) {
                s.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                s.push({
                    name: null,
                    fn: e
                })
            }
        }
          , o = function() {};
        o.prototype = a,
        o = new o;
        var c = t.documentElement
          , l = "svg" === c.nodeName.toLowerCase();
        o.addTest("passiveeventlisteners", (function() {
            var t = !1;
            try {
                var n = Object.defineProperty({}, "passive", {
                    get: function() {
                        t = !0
                    }
                });
                e.addEventListener("test", null, n)
            } catch (e) {}
            return t
        }
        )),
        function() {
            var e, t, n, a, c, l;
            for (var h in s)
                if (s.hasOwnProperty(h)) {
                    if (e = [],
                    (t = s[h]).name && (e.push(t.name.toLowerCase()),
                    t.options && t.options.aliases && t.options.aliases.length))
                        for (n = 0; n < t.options.aliases.length; n++)
                            e.push(t.options.aliases[n].toLowerCase());
                    for (a = i(t.fn, "function") ? t.fn() : t.fn,
                    c = 0; c < e.length; c++)
                        1 === (l = e[c].split(".")).length ? o[l[0]] = a : (!o[l[0]] || o[l[0]]instanceof Boolean || (o[l[0]] = new Boolean(o[l[0]])),
                        o[l[0]][l[1]] = a),
                        r.push((a ? "" : "no-") + l.join("-"))
                }
        }(),
        function(e) {
            var t = c.className
              , n = o._config.classPrefix || "";
            if (l && (t = t.baseVal),
            o._config.enableJSClass) {
                var i = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
                t = t.replace(i, "$1" + n + "js$2")
            }
            o._config.enableClasses && (t += " " + n + e.join(" " + n),
            l ? c.className.baseVal = t : c.className = t)
        }(r),
        delete a.addTest,
        delete a.addAsyncTest;
        for (var h = 0; h < o._q.length; h++)
            o._q[h]();
        e.Modernizr = o
    }(window, document)
}
, function(e, t, n) {
    var i = n(24);
    n(19),
    e.exports = {
        socket: null,
        connected: !1,
        socketId: -1,
        connect: function(e, t, n) {
            if (!this.socket) {
                var r = this;
                try {
                    var s = !1
                      , a = e;
                    this.socket = new WebSocket(a),
                    this.socket.binaryType = "arraybuffer",
                    this.socket.onmessage = function(e) {
                        var t = new Uint8Array(e.data)
                          , s = i.decode(t)
                          , a = s[0];
                        t = s[1],
                        "io-init" == a ? r.socketId = t[0] : n[a].apply(void 0, t)
                    }
                    ,
                    this.socket.onopen = function() {
                        r.connected = !0,
                        t()
                    }
                    ,
                    this.socket.onclose = function(e) {
                        r.connected = !1,
                        4001 == e.code ? t("Invalid Connection") : s || t("disconnected")
                    }
                    ,
                    this.socket.onerror = function(e) {
                        this.socket && this.socket.readyState != WebSocket.OPEN && (s = !0,
                        console.error("Socket error", arguments),
                        t("Socket error"))
                    }
                } catch (e) {
                    console.warn("Socket connection error:", e),
                    t(e)
                }
            }
        },
        send: function(e) {
            var t = Array.prototype.slice.call(arguments, 1)
            , n = i.encode([e, t]);
            this.socket.send(n);
        },
        socketReady: function() {
            return this.socket && this.connected
        },
        close: function() {
            if(false) {
                this.socket && this.socket.close()
            }
        }
    }
}
, function(e, t, n) {
    t.encode = n(9).encode,
    t.decode = n(15).decode,
    t.Encoder = n(37).Encoder,
    t.Decoder = n(38).Decoder,
    t.createCodec = n(39).createCodec,
    t.codec = n(40).codec
}
, function(e, t, n) {
    (function(t) {
        function n(e) {
            return e && e.isBuffer && e
        }
        e.exports = n(void 0 !== t && t) || n(this.Buffer) || n("undefined" != typeof window && window.Buffer) || this.Buffer
    }
    ).call(this, n(11).Buffer)
}
, function(e, t, n) {
    "use strict";
    t.byteLength = function(e) {
        var t = l(e)
          , n = t[0]
          , i = t[1];
        return 3 * (n + i) / 4 - i
    }
    ,
    t.toByteArray = function(e) {
        var t, n, i = l(e), a = i[0], o = i[1], c = new s(function(e, t, n) {
            return 3 * (t + n) / 4 - n
        }(0, a, o)), h = 0, u = o > 0 ? a - 4 : a;
        for (n = 0; n < u; n += 4)
            t = r[e.charCodeAt(n)] << 18 | r[e.charCodeAt(n + 1)] << 12 | r[e.charCodeAt(n + 2)] << 6 | r[e.charCodeAt(n + 3)],
            c[h++] = t >> 16 & 255,
            c[h++] = t >> 8 & 255,
            c[h++] = 255 & t;
        return 2 === o && (t = r[e.charCodeAt(n)] << 2 | r[e.charCodeAt(n + 1)] >> 4,
        c[h++] = 255 & t),
        1 === o && (t = r[e.charCodeAt(n)] << 10 | r[e.charCodeAt(n + 1)] << 4 | r[e.charCodeAt(n + 2)] >> 2,
        c[h++] = t >> 8 & 255,
        c[h++] = 255 & t),
        c
    }
    ,
    t.fromByteArray = function(e) {
        for (var t, n = e.length, r = n % 3, s = [], a = 0, o = n - r; a < o; a += 16383)
            s.push(u(e, a, a + 16383 > o ? o : a + 16383));
        return 1 === r ? (t = e[n - 1],
        s.push(i[t >> 2] + i[t << 4 & 63] + "==")) : 2 === r && (t = (e[n - 2] << 8) + e[n - 1],
        s.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=")),
        s.join("")
    }
    ;
    for (var i = [], r = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, c = a.length; o < c; ++o)
        i[o] = a[o],
        r[a.charCodeAt(o)] = o;
    function l(e) {
        var t = e.length;
        if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        return -1 === n && (n = t),
        [n, n === t ? 0 : 4 - n % 4]
    }
    function h(e) {
        return i[e >> 18 & 63] + i[e >> 12 & 63] + i[e >> 6 & 63] + i[63 & e]
    }
    function u(e, t, n) {
        for (var i, r = [], s = t; s < n; s += 3)
            i = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
            r.push(h(i));
        return r.join("")
    }
    r["-".charCodeAt(0)] = 62,
    r["_".charCodeAt(0)] = 63
}
, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e)
    }
}
, function(e, t, n) {
    var i = n(0);
    function r(e) {
        return new Array(e)
    }
    (t = e.exports = r(0)).alloc = r,
    t.concat = i.concat,
    t.from = function(e) {
        if (!i.isBuffer(e) && i.isView(e))
            e = i.Uint8Array.from(e);
        else if (i.isArrayBuffer(e))
            e = new Uint8Array(e);
        else {
            if ("string" == typeof e)
                return i.from.call(t, e);
            if ("number" == typeof e)
                throw new TypeError('"value" argument must not be a number')
        }
        return Array.prototype.slice.call(e)
    }
}
, function(e, t, n) {
    var i = n(0)
      , r = i.global;
    function s(e) {
        return new r(e)
    }
    (t = e.exports = i.hasBuffer ? s(0) : []).alloc = i.hasBuffer && r.alloc || s,
    t.concat = i.concat,
    t.from = function(e) {
        if (!i.isBuffer(e) && i.isView(e))
            e = i.Uint8Array.from(e);
        else if (i.isArrayBuffer(e))
            e = new Uint8Array(e);
        else {
            if ("string" == typeof e)
                return i.from.call(t, e);
            if ("number" == typeof e)
                throw new TypeError('"value" argument must not be a number')
        }
        return r.from && 1 !== r.from.length ? r.from(e) : new r(e)
    }
}
, function(e, t, n) {
    var i = n(0);
    function r(e) {
        return new Uint8Array(e)
    }
    (t = e.exports = i.hasArrayBuffer ? r(0) : []).alloc = r,
    t.concat = i.concat,
    t.from = function(e) {
        if (i.isView(e)) {
            var n = e.byteOffset
              , r = e.byteLength;
            (e = e.buffer).byteLength !== r && (e.slice ? e = e.slice(n, n + r) : (e = new Uint8Array(e)).byteLength !== r && (e = Array.prototype.slice.call(e, n, n + r)))
        } else {
            if ("string" == typeof e)
                return i.from.call(t, e);
            if ("number" == typeof e)
                throw new TypeError('"value" argument must not be a number')
        }
        return new Uint8Array(e)
    }
}
, function(e, t) {
    t.copy = function(e, t, n, i) {
        var r;
        n || (n = 0),
        i || 0 === i || (i = this.length),
        t || (t = 0);
        var s = i - n;
        if (e === this && n < t && t < i)
            for (r = s - 1; r >= 0; r--)
                e[r + t] = this[r + n];
        else
            for (r = 0; r < s; r++)
                e[r + t] = this[r + n];
        return s
    }
    ,
    t.toString = function(e, t, n) {
        var i = 0 | t;
        n || (n = this.length);
        for (var r = "", s = 0; i < n; )
            (s = this[i++]) < 128 ? r += String.fromCharCode(s) : (192 == (224 & s) ? s = (31 & s) << 6 | 63 & this[i++] : 224 == (240 & s) ? s = (15 & s) << 12 | (63 & this[i++]) << 6 | 63 & this[i++] : 240 == (248 & s) && (s = (7 & s) << 18 | (63 & this[i++]) << 12 | (63 & this[i++]) << 6 | 63 & this[i++]),
            s >= 65536 ? (s -= 65536,
            r += String.fromCharCode(55296 + (s >>> 10), 56320 + (1023 & s))) : r += String.fromCharCode(s));
        return r
    }
    ,
    t.write = function(e, t) {
        for (var n = t || (t |= 0), i = e.length, r = 0, s = 0; s < i; )
            (r = e.charCodeAt(s++)) < 128 ? this[n++] = r : r < 2048 ? (this[n++] = 192 | r >>> 6,
            this[n++] = 128 | 63 & r) : r < 55296 || r > 57343 ? (this[n++] = 224 | r >>> 12,
            this[n++] = 128 | r >>> 6 & 63,
            this[n++] = 128 | 63 & r) : (r = 65536 + (r - 55296 << 10 | e.charCodeAt(s++) - 56320),
            this[n++] = 240 | r >>> 18,
            this[n++] = 128 | r >>> 12 & 63,
            this[n++] = 128 | r >>> 6 & 63,
            this[n++] = 128 | 63 & r);
        return n - t
    }
}
, function(e, t, n) {
    t.setExtPackers = function(e) {
        e.addExtPacker(14, Error, [u, c]),
        e.addExtPacker(1, EvalError, [u, c]),
        e.addExtPacker(2, RangeError, [u, c]),
        e.addExtPacker(3, ReferenceError, [u, c]),
        e.addExtPacker(4, SyntaxError, [u, c]),
        e.addExtPacker(5, TypeError, [u, c]),
        e.addExtPacker(6, URIError, [u, c]),
        e.addExtPacker(10, RegExp, [h, c]),
        e.addExtPacker(11, Boolean, [l, c]),
        e.addExtPacker(12, String, [l, c]),
        e.addExtPacker(13, Date, [Number, c]),
        e.addExtPacker(15, Number, [l, c]),
        "undefined" != typeof Uint8Array && (e.addExtPacker(17, Int8Array, a),
        e.addExtPacker(18, Uint8Array, a),
        e.addExtPacker(19, Int16Array, a),
        e.addExtPacker(20, Uint16Array, a),
        e.addExtPacker(21, Int32Array, a),
        e.addExtPacker(22, Uint32Array, a),
        e.addExtPacker(23, Float32Array, a),
        "undefined" != typeof Float64Array && e.addExtPacker(24, Float64Array, a),
        "undefined" != typeof Uint8ClampedArray && e.addExtPacker(25, Uint8ClampedArray, a),
        e.addExtPacker(26, ArrayBuffer, a),
        e.addExtPacker(29, DataView, a)),
        r.hasBuffer && e.addExtPacker(27, s, r.from)
    }
    ;
    var i, r = n(0), s = r.global, a = r.Uint8Array.from, o = {
        name: 1,
        message: 1,
        stack: 1,
        columnNumber: 1,
        fileName: 1,
        lineNumber: 1
    };
    function c(e) {
        return i || (i = n(9).encode),
        i(e)
    }
    function l(e) {
        return e.valueOf()
    }
    function h(e) {
        (e = RegExp.prototype.toString.call(e).split("/")).shift();
        var t = [e.pop()];
        return t.unshift(e.join("/")),
        t
    }
    function u(e) {
        var t = {};
        for (var n in o)
            t[n] = e[n];
        return t
    }
}
, function(e, t, n) {
    var i = n(5)
      , r = n(7)
      , s = r.Uint64BE
      , a = r.Int64BE
      , o = n(0)
      , c = n(6)
      , l = n(34)
      , h = n(13).uint8
      , u = n(3).ExtBuffer
      , f = "undefined" != typeof Uint8Array
      , d = "undefined" != typeof Map
      , p = [];
    p[1] = 212,
    p[2] = 213,
    p[4] = 214,
    p[8] = 215,
    p[16] = 216,
    t.getWriteType = function(e) {
        var t = l.getWriteToken(e)
          , n = e && e.useraw
          , r = f && e && e.binarraybuffer
          , g = r ? o.isArrayBuffer : o.isBuffer
          , m = r ? function(e, t) {
            w(e, new Uint8Array(t))
        }
        : w
          , y = d && e && e.usemap ? function(e, n) {
            if (!(n instanceof Map))
                return b(e, n);
            var i = n.size;
            t[i < 16 ? 128 + i : i <= 65535 ? 222 : 223](e, i);
            var r = e.codec.encode;
            n.forEach((function(t, n, i) {
                r(e, n),
                r(e, t)
            }
            ))
        }
        : b;
        return {
            boolean: function(e, n) {
                t[n ? 195 : 194](e, n)
            },
            function: v,
            number: function(e, n) {
                var i = 0 | n;
                n === i ? t[-32 <= i && i <= 127 ? 255 & i : 0 <= i ? i <= 255 ? 204 : i <= 65535 ? 205 : 206 : -128 <= i ? 208 : -32768 <= i ? 209 : 210](e, i) : t[203](e, n)
            },
            object: n ? function(e, n) {
                if (g(n))
                    return function(e, n) {
                        var i = n.length;
                        t[i < 32 ? 160 + i : i <= 65535 ? 218 : 219](e, i),
                        e.send(n)
                    }(e, n);
                k(e, n)
            }
            : k,
            string: function(e) {
                return function(n, i) {
                    var r = i.length
                      , s = 5 + 3 * r;
                    n.offset = n.reserve(s);
                    var a = n.buffer
                      , o = e(r)
                      , l = n.offset + o;
                    r = c.write.call(a, i, l);
                    var h = e(r);
                    if (o !== h) {
                        var u = l + h - o
                          , f = l + r;
                        c.copy.call(a, a, u, l, f)
                    }
                    t[1 === h ? 160 + r : h <= 3 ? 215 + h : 219](n, r),
                    n.offset += r
                }
            }(n ? function(e) {
                return e < 32 ? 1 : e <= 65535 ? 3 : 5
            }
            : function(e) {
                return e < 32 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5
            }
            ),
            symbol: v,
            undefined: v
        };
        function k(e, n) {
            if (null === n)
                return v(e, n);
            if (g(n))
                return m(e, n);
            if (i(n))
                return function(e, n) {
                    var i = n.length;
                    t[i < 16 ? 144 + i : i <= 65535 ? 220 : 221](e, i);
                    for (var r = e.codec.encode, s = 0; s < i; s++)
                        r(e, n[s])
                }(e, n);
            if (s.isUint64BE(n))
                return function(e, n) {
                    t[207](e, n.toArray())
                }(e, n);
            if (a.isInt64BE(n))
                return function(e, n) {
                    t[211](e, n.toArray())
                }(e, n);
            var r = e.codec.getExtPacker(n);
            if (r && (n = r(n)),
            n instanceof u)
                return function(e, n) {
                    var i = n.buffer
                      , r = i.length
                      , s = p[r] || (r < 255 ? 199 : r <= 65535 ? 200 : 201);
                    t[s](e, r),
                    h[n.type](e),
                    e.send(i)
                }(e, n);
            y(e, n)
        }
        function v(e, n) {
            t[192](e, n)
        }
        function w(e, n) {
            var i = n.length;
            t[i < 255 ? 196 : i <= 65535 ? 197 : 198](e, i),
            e.send(n)
        }
        function b(e, n) {
            var i = Object.keys(n)
              , r = i.length;
            t[r < 16 ? 128 + r : r <= 65535 ? 222 : 223](e, r);
            var s = e.codec.encode;
            i.forEach((function(t) {
                s(e, t),
                s(e, n[t])
            }
            ))
        }
    }
}
, function(e, t, n) {
    var i = n(4)
      , r = n(7)
      , s = r.Uint64BE
      , a = r.Int64BE
      , o = n(13).uint8
      , c = n(0)
      , l = c.global
      , h = c.hasBuffer && "TYPED_ARRAY_SUPPORT"in l && !l.TYPED_ARRAY_SUPPORT
      , u = c.hasBuffer && l.prototype || {};
    function f() {
        var e = o.slice();
        return e[196] = d(196),
        e[197] = p(197),
        e[198] = g(198),
        e[199] = d(199),
        e[200] = p(200),
        e[201] = g(201),
        e[202] = m(202, 4, u.writeFloatBE || v, !0),
        e[203] = m(203, 8, u.writeDoubleBE || w, !0),
        e[204] = d(204),
        e[205] = p(205),
        e[206] = g(206),
        e[207] = m(207, 8, y),
        e[208] = d(208),
        e[209] = p(209),
        e[210] = g(210),
        e[211] = m(211, 8, k),
        e[217] = d(217),
        e[218] = p(218),
        e[219] = g(219),
        e[220] = p(220),
        e[221] = g(221),
        e[222] = p(222),
        e[223] = g(223),
        e
    }
    function d(e) {
        return function(t, n) {
            var i = t.reserve(2)
              , r = t.buffer;
            r[i++] = e,
            r[i] = n
        }
    }
    function p(e) {
        return function(t, n) {
            var i = t.reserve(3)
              , r = t.buffer;
            r[i++] = e,
            r[i++] = n >>> 8,
            r[i] = n
        }
    }
    function g(e) {
        return function(t, n) {
            var i = t.reserve(5)
              , r = t.buffer;
            r[i++] = e,
            r[i++] = n >>> 24,
            r[i++] = n >>> 16,
            r[i++] = n >>> 8,
            r[i] = n
        }
    }
    function m(e, t, n, i) {
        return function(r, s) {
            var a = r.reserve(t + 1);
            r.buffer[a++] = e,
            n.call(r.buffer, s, a, i)
        }
    }
    function y(e, t) {
        new s(this,t,e)
    }
    function k(e, t) {
        new a(this,t,e)
    }
    function v(e, t) {
        i.write(this, e, t, !1, 23, 4)
    }
    function w(e, t) {
        i.write(this, e, t, !1, 52, 8)
    }
    t.getWriteToken = function(e) {
        return e && e.uint8array ? function() {
            var e = f();
            return e[202] = m(202, 4, v),
            e[203] = m(203, 8, w),
            e
        }() : h || c.hasBuffer && e && e.safe ? function() {
            var e = o.slice();
            return e[196] = m(196, 1, l.prototype.writeUInt8),
            e[197] = m(197, 2, l.prototype.writeUInt16BE),
            e[198] = m(198, 4, l.prototype.writeUInt32BE),
            e[199] = m(199, 1, l.prototype.writeUInt8),
            e[200] = m(200, 2, l.prototype.writeUInt16BE),
            e[201] = m(201, 4, l.prototype.writeUInt32BE),
            e[202] = m(202, 4, l.prototype.writeFloatBE),
            e[203] = m(203, 8, l.prototype.writeDoubleBE),
            e[204] = m(204, 1, l.prototype.writeUInt8),
            e[205] = m(205, 2, l.prototype.writeUInt16BE),
            e[206] = m(206, 4, l.prototype.writeUInt32BE),
            e[207] = m(207, 8, y),
            e[208] = m(208, 1, l.prototype.writeInt8),
            e[209] = m(209, 2, l.prototype.writeInt16BE),
            e[210] = m(210, 4, l.prototype.writeInt32BE),
            e[211] = m(211, 8, k),
            e[217] = m(217, 1, l.prototype.writeUInt8),
            e[218] = m(218, 2, l.prototype.writeUInt16BE),
            e[219] = m(219, 4, l.prototype.writeUInt32BE),
            e[220] = m(220, 2, l.prototype.writeUInt16BE),
            e[221] = m(221, 4, l.prototype.writeUInt32BE),
            e[222] = m(222, 2, l.prototype.writeUInt16BE),
            e[223] = m(223, 4, l.prototype.writeUInt32BE),
            e
        }() : f()
    }
}
, function(e, t, n) {
    t.setExtUnpackers = function(e) {
        e.addExtUnpacker(14, [o, l(Error)]),
        e.addExtUnpacker(1, [o, l(EvalError)]),
        e.addExtUnpacker(2, [o, l(RangeError)]),
        e.addExtUnpacker(3, [o, l(ReferenceError)]),
        e.addExtUnpacker(4, [o, l(SyntaxError)]),
        e.addExtUnpacker(5, [o, l(TypeError)]),
        e.addExtUnpacker(6, [o, l(URIError)]),
        e.addExtUnpacker(10, [o, c]),
        e.addExtUnpacker(11, [o, h(Boolean)]),
        e.addExtUnpacker(12, [o, h(String)]),
        e.addExtUnpacker(13, [o, h(Date)]),
        e.addExtUnpacker(15, [o, h(Number)]),
        "undefined" != typeof Uint8Array && (e.addExtUnpacker(17, h(Int8Array)),
        e.addExtUnpacker(18, h(Uint8Array)),
        e.addExtUnpacker(19, [u, h(Int16Array)]),
        e.addExtUnpacker(20, [u, h(Uint16Array)]),
        e.addExtUnpacker(21, [u, h(Int32Array)]),
        e.addExtUnpacker(22, [u, h(Uint32Array)]),
        e.addExtUnpacker(23, [u, h(Float32Array)]),
        "undefined" != typeof Float64Array && e.addExtUnpacker(24, [u, h(Float64Array)]),
        "undefined" != typeof Uint8ClampedArray && e.addExtUnpacker(25, h(Uint8ClampedArray)),
        e.addExtUnpacker(26, u),
        e.addExtUnpacker(29, [u, h(DataView)])),
        r.hasBuffer && e.addExtUnpacker(27, h(s))
    }
    ;
    var i, r = n(0), s = r.global, a = {
        name: 1,
        message: 1,
        stack: 1,
        columnNumber: 1,
        fileName: 1,
        lineNumber: 1
    };
    function o(e) {
        return i || (i = n(15).decode),
        i(e)
    }
    function c(e) {
        return RegExp.apply(null, e)
    }
    function l(e) {
        return function(t) {
            var n = new e;
            for (var i in a)
                n[i] = t[i];
            return n
        }
    }
    function h(e) {
        return function(t) {
            return new e(t)
        }
    }
    function u(e) {
        return new Uint8Array(e).buffer
    }
}
, function(e, t, n) {
    var i = n(17);
    function r(e) {
        var t, n = new Array(256);
        for (t = 0; t <= 127; t++)
            n[t] = s(t);
        for (t = 128; t <= 143; t++)
            n[t] = o(t - 128, e.map);
        for (t = 144; t <= 159; t++)
            n[t] = o(t - 144, e.array);
        for (t = 160; t <= 191; t++)
            n[t] = o(t - 160, e.str);
        for (n[192] = s(null),
        n[193] = null,
        n[194] = s(!1),
        n[195] = s(!0),
        n[196] = a(e.uint8, e.bin),
        n[197] = a(e.uint16, e.bin),
        n[198] = a(e.uint32, e.bin),
        n[199] = a(e.uint8, e.ext),
        n[200] = a(e.uint16, e.ext),
        n[201] = a(e.uint32, e.ext),
        n[202] = e.float32,
        n[203] = e.float64,
        n[204] = e.uint8,
        n[205] = e.uint16,
        n[206] = e.uint32,
        n[207] = e.uint64,
        n[208] = e.int8,
        n[209] = e.int16,
        n[210] = e.int32,
        n[211] = e.int64,
        n[212] = o(1, e.ext),
        n[213] = o(2, e.ext),
        n[214] = o(4, e.ext),
        n[215] = o(8, e.ext),
        n[216] = o(16, e.ext),
        n[217] = a(e.uint8, e.str),
        n[218] = a(e.uint16, e.str),
        n[219] = a(e.uint32, e.str),
        n[220] = a(e.uint16, e.array),
        n[221] = a(e.uint32, e.array),
        n[222] = a(e.uint16, e.map),
        n[223] = a(e.uint32, e.map),
        t = 224; t <= 255; t++)
            n[t] = s(t - 256);
        return n
    }
    function s(e) {
        return function() {
            return e
        }
    }
    function a(e, t) {
        return function(n) {
            var i = e(n);
            return t(n, i)
        }
    }
    function o(e, t) {
        return function(n) {
            return t(n, e)
        }
    }
    t.getReadToken = function(e) {
        var t = i.getReadFormat(e);
        return e && e.useraw ? function(e) {
            var t, n = r(e).slice();
            for (n[217] = n[196],
            n[218] = n[197],
            n[219] = n[198],
            t = 160; t <= 191; t++)
                n[t] = o(t - 160, e.bin);
            return n
        }(t) : r(t)
    }
}
, function(e, t, n) {
    t.Encoder = s;
    var i = n(18)
      , r = n(10).EncodeBuffer;
    function s(e) {
        if (!(this instanceof s))
            return new s(e);
        r.call(this, e)
    }
    s.prototype = new r,
    i.mixin(s.prototype),
    s.prototype.encode = function(e) {
        this.write(e),
        this.emit("data", this.read())
    }
    ,
    s.prototype.end = function(e) {
        arguments.length && this.encode(e),
        this.flush(),
        this.emit("end")
    }
}
, function(e, t, n) {
    t.Decoder = s;
    var i = n(18)
      , r = n(16).DecodeBuffer;
    function s(e) {
        if (!(this instanceof s))
            return new s(e);
        r.call(this, e)
    }
    s.prototype = new r,
    i.mixin(s.prototype),
    s.prototype.decode = function(e) {
        arguments.length && this.write(e),
        this.flush()
    }
    ,
    s.prototype.push = function(e) {
        this.emit("data", e)
    }
    ,
    s.prototype.end = function(e) {
        this.decode(e),
        this.emit("end")
    }
}
, function(e, t, n) {
    n(8),
    n(2),
    t.createCodec = n(1).createCodec
}
, function(e, t, n) {
    n(8),
    n(2),
    t.codec = {
        preset: n(1).preset
    }
}
, function(e, t) {
    var n, i, r = e.exports = {};
    function s() {
        throw new Error("setTimeout has not been defined")
    }
    function a() {
        throw new Error("clearTimeout has not been defined")
    }
    function o(e) {
        if (n === setTimeout)
            return setTimeout(e, 0);
        if ((n === s || !n) && setTimeout)
            return n = setTimeout,
            setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }
    !function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : s
        } catch (e) {
            n = s
        }
        try {
            i = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            i = a
        }
    }();
    var c, l = [], h = !1, u = -1;
    function f() {
        h && c && (h = !1,
        c.length ? l = c.concat(l) : u = -1,
        l.length && d())
    }
    function d() {
        if (!h) {
            var e = o(f);
            h = !0;
            for (var t = l.length; t; ) {
                for (c = l,
                l = []; ++u < t; )
                    c && c[u].run();
                u = -1,
                t = l.length
            }
            c = null,
            h = !1,
            function(e) {
                if (i === clearTimeout)
                    return clearTimeout(e);
                if ((i === a || !i) && clearTimeout)
                    return i = clearTimeout,
                    clearTimeout(e);
                try {
                    i(e)
                } catch (t) {
                    try {
                        return i.call(null, e)
                    } catch (t) {
                        return i.call(this, e)
                    }
                }
            }(e)
        }
    }
    function p(e, t) {
        this.fun = e,
        this.array = t
    }
    function g() {}
    r.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
        l.push(new p(e,t)),
        1 !== l.length || h || o(d)
    }
    ,
    p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ,
    r.title = "browser",
    r.browser = !0,
    r.env = {},
    r.argv = [],
    r.version = "",
    r.versions = {},
    r.on = g,
    r.addListener = g,
    r.once = g,
    r.off = g,
    r.removeListener = g,
    r.removeAllListeners = g,
    r.emit = g,
    r.prependListener = g,
    r.prependOnceListener = g,
    r.listeners = function(e) {
        return []
    }
    ,
    r.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ,
    r.cwd = function() {
        return "/"
    }
    ,
    r.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ,
    r.umask = function() {
        return 0
    }
}
, function(e, t) {
    var n = Math.abs
      , i = (Math.cos,
    Math.sin,
    Math.pow,
    Math.sqrt)
      , r = (n = Math.abs,
    Math.atan2)
      , s = Math.PI;
    e.exports.randInt = function(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    ,
    e.exports.randFloat = function(e, t) {
        return Math.random() * (t - e + 1) + e
    }
    ,
    e.exports.lerp = function(e, t, n) {
        return e + (t - e) * n
    }
    ,
    e.exports.decel = function(e, t) {
        return e > 0 ? e = Math.max(0, e - t) : e < 0 && (e = Math.min(0, e + t)),
        e
    }
    ,
    e.exports.getDistance = function(e, t, n, r) {
        return i((n -= e) * n + (r -= t) * r)
    }
    ,
    e.exports.getDirection = function(e, t, n, i) {
        return r(t - i, e - n)
    }
    ,
    e.exports.getAngleDist = function(e, t) {
        var i = n(t - e) % (2 * s);
        return i > s ? 2 * s - i : i
    }
    ,
    e.exports.isNumber = function(e) {
        return "number" == typeof e && !isNaN(e) && isFinite(e)
    }
    ,
    e.exports.isString = function(e) {
        return e && "string" == typeof e
    }
    ,
    e.exports.kFormat = function(e) {
        return e > 999 ? (e / 1e3).toFixed(1) + "k" : e
    }
    ,
    e.exports.capitalizeFirst = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    ,
    e.exports.fixTo = function(e, t) {
        return parseFloat(e.toFixed(t))
    }
    ,
    e.exports.sortByPoints = function(e, t) {
        return parseFloat(t.points) - parseFloat(e.points)
    }
    ,
    e.exports.lineInRect = function(e, t, n, i, r, s, a, o) {
        var c = r
          , l = a;
        if (r > a && (c = a,
        l = r),
        l > n && (l = n),
        c < e && (c = e),
        c > l)
            return !1;
        var h = s
          , u = o
          , f = a - r;
        if (Math.abs(f) > 1e-7) {
            var d = (o - s) / f
              , p = s - d * r;
            h = d * c + p,
            u = d * l + p
        }
        if (h > u) {
            var g = u;
            u = h,
            h = g
        }
        return u > i && (u = i),
        h < t && (h = t),
        !(h > u)
    }
    ,
    e.exports.containsPoint = function(e, t, n) {
        var i = e.getBoundingClientRect()
          , r = i.left + window.scrollX
          , s = i.top + window.scrollY
          , a = i.width
          , o = i.height;
        return t > r && t < r + a && n > s && n < s + o
    }
    ,
    e.exports.mousifyTouchEvent = function(e) {
        var t = e.changedTouches[0];
        e.screenX = t.screenX,
        e.screenY = t.screenY,
        e.clientX = t.clientX,
        e.clientY = t.clientY,
        e.pageX = t.pageX,
        e.pageY = t.pageY
    }
    ,
    e.exports.hookTouchEvents = function(t, n) {
        var i = !n
          , r = !1;
        function s(n) {
            e.exports.mousifyTouchEvent(n),
            window.setUsingTouch(!0),
            i && (n.preventDefault(),
            n.stopPropagation()),
            r && (t.onclick && t.onclick(n),
            t.onmouseout && t.onmouseout(n),
            r = !1)
        }
        t.addEventListener("touchstart", e.exports.checkTrusted((function(n) {
            e.exports.mousifyTouchEvent(n),
            window.setUsingTouch(!0),
            i && (n.preventDefault(),
            n.stopPropagation()),
            t.onmouseover && t.onmouseover(n),
            r = !0
        }
        )), !1),
        t.addEventListener("touchmove", e.exports.checkTrusted((function(n) {
            e.exports.mousifyTouchEvent(n),
            window.setUsingTouch(!0),
            i && (n.preventDefault(),
            n.stopPropagation()),
            e.exports.containsPoint(t, n.pageX, n.pageY) ? r || (t.onmouseover && t.onmouseover(n),
            r = !0) : r && (t.onmouseout && t.onmouseout(n),
            r = !1)
        }
        )), !1),
        t.addEventListener("touchend", e.exports.checkTrusted(s), !1),
        t.addEventListener("touchcancel", e.exports.checkTrusted(s), !1),
        t.addEventListener("touchleave", e.exports.checkTrusted(s), !1)
    }
    ,
    e.exports.removeAllChildren = function(e) {
        for (; e.hasChildNodes(); )
            e.removeChild(e.lastChild)
    }
    ,
    e.exports.generateElement = function(t) {
        var n = document.createElement(t.tag || "div");
        function i(e, i) {
            t[e] && (n[i] = t[e])
        }
        for (var r in i("text", "textContent"),
        i("html", "innerHTML"),
        i("class", "className"),
        t) {
            switch (r) {
            case "tag":
            case "text":
            case "html":
            case "class":
            case "style":
            case "hookTouch":
            case "parent":
            case "children":
                continue
            }
            n[r] = t[r]
        }
        if (n.onclick && (n.onclick = e.exports.checkTrusted(n.onclick)),
        n.onmouseover && (n.onmouseover = e.exports.checkTrusted(n.onmouseover)),
        n.onmouseout && (n.onmouseout = e.exports.checkTrusted(n.onmouseout)),
        t.style && (n.style.cssText = t.style),
        t.hookTouch && e.exports.hookTouchEvents(n),
        t.parent && t.parent.appendChild(n),
        t.children)
            for (var s = 0; s < t.children.length; s++)
                n.appendChild(t.children[s]);
        return n
    }
    ,
    e.exports.eventIsTrusted = function(e) {
        return !e || "boolean" != typeof e.isTrusted || e.isTrusted
    }
    ,
    e.exports.checkTrusted = function(t) {
        return function(n) {
            n && n instanceof Event && e.exports.eventIsTrusted(n) && t(n)
        }
    }
    ,
    e.exports.randomString = function(e) {
        for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; i < e; i++)
            t += n.charAt(Math.floor(Math.random() * n.length));
        return t
    }
    ,
    e.exports.countInArray = function(e, t) {
        for (var n = 0, i = 0; i < e.length; i++)
            e[i] === t && n++;
        return n
    }
}
, function(e, t) {
    e.exports.AnimText = function() {
        this.init = function(e, t, n, i, r, s, a) {
            this.x = e,
            this.y = t,
            this.color = a,
            this.scale = n,
            this.startScale = this.scale,
            this.maxScale = 1.5 * n,
            this.scaleSpeed = .7,
            this.speed = i,
            this.life = r,
            this.text = s
        }
        ,
        this.update = function(e) {
            this.life && (this.life -= e,
            this.y -= this.speed * e,
            this.scale += this.scaleSpeed * e,
            this.scale >= this.maxScale ? (this.scale = this.maxScale,
            this.scaleSpeed *= -1) : this.scale <= this.startScale && (this.scale = this.startScale,
            this.scaleSpeed = 0),
            this.life <= 0 && (this.life = 0))
        }
        ,
        this.render = function(e, t, n) {
            e.fillStyle = this.color;
            e.font = this.scale + "px Hammersmith One";
            e.fillText(this.text, this.x - t, this.y - n);
        }
    }
    ,
    e.exports.TextManager = function() {
        this.texts = [],
        this.update = function(e, t, n, i) {
            t.textBaseline = "middle",
            t.textAlign = "center";
            for (var r = 0; r < this.texts.length; ++r)
                this.texts[r].life && (this.texts[r].update(e),
                this.texts[r].render(t, n, i))
        }
        ,
        this.showText = function(t, n, i, r, s, a, o) {
            for (var c, l = 0; l < this.texts.length; ++l)
                if (!this.texts[l].life) {
                    c = this.texts[l];
                    break
                }
            c || (c = new e.exports.AnimText,
            this.texts.push(c)),
            c.init(t, n, i, r, s, a, o)
        }
    }
}
, function(e, t) {
    e.exports = function(e) {
        this.sid = e,
        this.init = function(e, t, n, i, r, s, a) {
            s = s || {},
            this.sentTo = {},
            this.gridLocations = [],
            this.active = !0,
            this.doUpdate = s.doUpdate,
            this.x = e,
            this.y = t,
            this.dir = n,
            this.xWiggle = 0,
            this.yWiggle = 0,
            this.scale = i,
            this.type = r,
            this.id = s.id,
            this.owner = a,
            this.name = s.name,
            this.isItem = null != this.id,
            this.group = s.group,
            this.health = s.health,
            this.currentHealth = this.health,
            this.layer = 2,
            null != this.group ? this.layer = this.group.layer : 0 == this.type ? this.layer = 3 : 2 == this.type ? this.layer = 0 : 4 == this.type && (this.layer = -1),
            this.colDiv = s.colDiv || 1,
            this.blocker = s.blocker,
            this.ignoreCollision = s.ignoreCollision,
            this.dontGather = s.dontGather,
            this.hideFromEnemy = s.hideFromEnemy,
            this.friction = s.friction,
            this.projDmg = s.projDmg,
            this.dmg = s.dmg,
            this.pDmg = s.pDmg,
            this.pps = s.pps,
            this.zIndex = s.zIndex || 0,
            this.turnSpeed = s.turnSpeed,
            this.req = s.req,
            this.trap = s.trap,
            this.healCol = s.healCol,
            this.teleport = s.teleport,
            this.boostSpeed = s.boostSpeed,
            this.projectile = s.projectile,
            this.shootRange = s.shootRange,
            this.shootRate = s.shootRate,
            this.shootCount = this.shootRate,
            this.spawnPoint = s.spawnPoint
        }
        ,
        this.changeHealth = function(e, t) {
            return this.health += e,
            this.health <= 0
        }
        ,
        this.getScale = function(e, t) {
            return e = e || 1,
            this.scale * (this.isItem || 2 == this.type || 3 == this.type || 4 == this.type ? 1 : .6 * e) * (t ? 1 : this.colDiv)
        }
        ,
        this.visibleToPlayer = function(e) {
            return !this.hideFromEnemy || this.owner && (this.owner == e || this.owner.team && e.team == this.owner.team)
        }
        ,
        this.update = function(e) {
            this.active && (this.xWiggle && (this.xWiggle *= Math.pow(.99, e)),
            this.yWiggle && (this.yWiggle *= Math.pow(.99, e)),
            this.turnSpeed && (this.dir += this.turnSpeed * e))
        }
    }
}
, function(e, t) {
    e.exports.groups = [{
        id: 0,
        name: "food",
        layer: 0
    }, {
        id: 1,
        name: "walls",
        place: !0,
        limit: 30,
        layer: 0
    }, {
        id: 2,
        name: "spikes",
        place: !0,
        limit: 15,
        layer: 0
    }, {
        id: 3,
        name: "mill",
        place: !0,
        limit: 7,
        layer: 1
    }, {
        id: 4,
        name: "mine",
        place: !0,
        limit: 1,
        layer: 0
    }, {
        id: 5,
        name: "trap",
        place: !0,
        limit: 6,
        layer: -1
    }, {
        id: 6,
        name: "booster",
        place: !0,
        limit: 12,
        layer: -1
    }, {
        id: 7,
        name: "turret",
        place: !0,
        limit: 2,
        layer: 1
    }, {
        id: 8,
        name: "watchtower",
        place: !0,
        limit: 12,
        layer: 1
    }, {
        id: 9,
        name: "buff",
        place: !0,
        limit: 4,
        layer: -1
    }, {
        id: 10,
        name: "spawn",
        place: !0,
        limit: 1,
        layer: -1
    }, {
        id: 11,
        name: "sapling",
        place: !0,
        limit: 2,
        layer: 0
    }, {
        id: 12,
        name: "blocker",
        place: !0,
        limit: 3,
        layer: -1
    }, {
        id: 13,
        name: "teleporter",
        place: !0,
        limit: 2,
        layer: -1
    }],
    t.projectiles = [{
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 25,
        speed: 1.6,
        scale: 103,
        range: 1e3
    }, {
        indx: 1,
        layer: 1,
        dmg: 25,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 35,
        speed: 2.5,
        scale: 103,
        range: 1200
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 30,
        speed: 2,
        scale: 103,
        range: 1200
    }, {
        indx: 1,
        layer: 1,
        dmg: 16,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "bullet_1",
        dmg: 50,
        speed: 3.6,
        scale: 160,
        range: 1400
    }],
    t.weapons = window.weapons = [{
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
        speed: 300
    }, {
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
        speed: 400
    }, {
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
        speed: 400
    }, {
        id: 3,
        type: 0,
        age: 2,
        name: "short sword",
        desc: "increased heal power but slower move speed",
        src: "sword_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 46,
        dmg: 35,
        spdMult: .85,
        range: 110,
        gather: 1,
        speed: 300
    }, {
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
        spdMult: .8,
        range: 118,
        gather: 1,
        speed: 300
    }, {
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
        knock: .2,
        spdMult: .82,
        range: 142,
        gather: 1,
        speed: 700
    }, {
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
        knock: .7,
        range: 110,
        gather: 1,
        speed: 300
    }, {
        id: 7,
        type: 0,
        age: 2,
        name: "daggers",
        desc: "really fast short range weapon",
        src: "dagger_1",
        iPad: .8,
        length: 110,
        width: 110,
        xOff: 18,
        yOff: 0,
        dmg: 20,
        knock: .1,
        range: 65,
        gather: 1,
        hitSlow: .1,
        spdMult: 1.13,
        speed: 100
    }, {
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
        speed: 400
    }, {
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
        spdMult: .75,
        speed: 600
    }, {
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
        spdMult: .88,
        range: 75,
        sDmg: 7.5,
        gather: 1,
        speed: 400
    }, {
        id: 11,
        type: 1,
        age: 6,
        name: "wooden shield",
        desc: "blocks projectiles and reduces melee damage",
        src: "shield_1",
        length: 120,
        width: 120,
        shield: .2,
        speed: 111,
        xOff: 6,
        yOff: 0,
        spdMult: .7
    }, {
        id: 12,
        type: 1,
        age: 8,
        pre: 9,
        name: "crossbow",
        desc: "deals more damage and has greater range",
        src: "crossbow_1",
        req: ["wood", 5],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 2,
        spdMult: .7,
        speed: 700
    }, {
        id: 13,
        type: 1,
        age: 9,
        pre: 12,
        name: "repeater crossbow",
        desc: "high firerate crossbow with reduced damage",
        src: "crossbow_2",
        req: ["wood", 10],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 3,
        spdMult: .7,
        speed: 230
    }, {
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
        knock: .2,
        spdMult: 1.05,
        range: 125,
        gather: 0,
        speed: 700
    }, {
        id: 15,
        type: 1,
        age: 9,
        pre: 12,
        name: "musket",
        desc: "slow firerate but high damage and range",
        src: "musket_1",
        req: ["stone", 10],
        aboveHand: !0,
        rec: .35,
        armS: .6,
        hndS: .3,
        hndD: 1.6,
        length: 205,
        width: 205,
        xOff: 25,
        yOff: 0,
        projectile: 5,
        hideProjectile: !0,
        spdMult: .6,
        speed: 1500
    }],
    e.exports.list = [{
        group: e.exports.groups[0],
        name: "apple",
        desc: "restores 20 health when consumed",
        req: ["food", 10],
        consume: function(e) {
            return e.changeHealth(20, e)
        },
        scale: 22,
        holdOffset: 15
    }, {
        age: 3,
        group: e.exports.groups[0],
        name: "cookie",
        desc: "restores 40 health when consumed",
        req: ["food", 15],
        consume: function(e) {
            return e.changeHealth(40, e)
        },
        scale: 27,
        holdOffset: 15
    }, {
        age: 7,
        group: e.exports.groups[0],
        name: "cheese",
        desc: "restores 30 health and another 50 over 5 seconds",
        req: ["food", 25],
        consume: function(e) {
            return !!(e.changeHealth(30, e) || e.health < 100) && (e.dmgOverTime.dmg = -10,
            e.dmgOverTime.doer = e,
            e.dmgOverTime.time = 5,
            !0)
        },
        scale: 27,
        holdOffset: 15
    }, {
        group: e.exports.groups[1],
        name: "wood wall",
        desc: "provides protection for your village",
        req: ["wood", 10],
        projDmg: !0,
        health: 380,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 3,
        group: e.exports.groups[1],
        name: "stone wall",
        desc: "provides improved protection for your village",
        req: ["stone", 25],
        health: 900,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        pre: 1,
        group: e.exports.groups[1],
        name: "castle wall",
        desc: "provides powerful protection for your village",
        req: ["stone", 35],
        health: 1500,
        scale: 52,
        holdOffset: 20,
        placeOffset: -5
    }, {
        group: e.exports.groups[2],
        name: "spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 20, "stone", 5],
        health: 400,
        dmg: 20,
        scale: 49,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 5,
        group: e.exports.groups[2],
        name: "greater spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 30, "stone", 10],
        health: 500,
        dmg: 35,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 9,
        pre: 1,
        group: e.exports.groups[2],
        name: "poison spikes",
        desc: "poisons enemies when they touch them",
        req: ["wood", 35, "stone", 15],
        health: 600,
        dmg: 30,
        pDmg: 5,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 9,
        pre: 2,
        group: e.exports.groups[2],
        name: "spinning spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 30, "stone", 20],
        health: 500,
        dmg: 45,
        turnSpeed: .003,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        group: e.exports.groups[3],
        name: "windmill",
        desc: "generates gold over time",
        req: ["wood", 50, "stone", 10],
        health: 400,
        pps: 1,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 45,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 5,
        pre: 1,
        group: e.exports.groups[3],
        name: "faster windmill",
        desc: "generates more gold over time",
        req: ["wood", 60, "stone", 20],
        health: 500,
        pps: 1.5,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 8,
        pre: 1,
        group: e.exports.groups[3],
        name: "power mill",
        desc: "generates more gold over time",
        req: ["wood", 100, "stone", 50],
        health: 800,
        pps: 2,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 5,
        group: e.exports.groups[4],
        type: 2,
        name: "mine",
        desc: "allows you to mine stone",
        req: ["wood", 20, "stone", 100],
        iconLineMult: 12,
        scale: 65,
        holdOffset: 20,
        placeOffset: 0
    }, {
        age: 5,
        group: e.exports.groups[11],
        type: 0,
        name: "sapling",
        desc: "allows you to farm wood",
        req: ["wood", 150],
        iconLineMult: 12,
        colDiv: .5,
        scale: 110,
        holdOffset: 50,
        placeOffset: -15
    }, {
        age: 4,
        group: e.exports.groups[5],
        name: "pit trap",
        desc: "pit that traps enemies if they walk over it",
        req: ["wood", 30, "stone", 30],
        trap: !0,
        ignoreCollision: !0,
        hideFromEnemy: !0,
        health: 500,
        colDiv: .2,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 4,
        group: e.exports.groups[6],
        name: "boost pad",
        desc: "provides boost when stepped on",
        req: ["stone", 20, "wood", 5],
        ignoreCollision: !0,
        boostSpeed: 1.5,
        health: 150,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: e.exports.groups[7],
        doUpdate: !0,
        name: "turret",
        desc: "defensive structure that shoots at enemies",
        req: ["wood", 200, "stone", 150],
        health: 800,
        projectile: 1,
        shootRange: 700,
        shootRate: 2200,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: e.exports.groups[8],
        name: "platform",
        desc: "platform to shoot over walls and cross over water",
        req: ["wood", 20],
        ignoreCollision: !0,
        zIndex: 1,
        health: 300,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: e.exports.groups[9],
        name: "healing pad",
        desc: "standing on it will slowly heal you",
        req: ["wood", 30, "food", 10],
        ignoreCollision: !0,
        healCol: 15,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 9,
        group: e.exports.groups[10],
        name: "spawn pad",
        desc: "you will spawn here when you die but it will dissapear",
        req: ["wood", 100, "stone", 100],
        health: 400,
        ignoreCollision: !0,
        spawnPoint: !0,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: e.exports.groups[12],
        name: "blocker",
        desc: "blocks building in radius",
        req: ["wood", 30, "stone", 25],
        ignoreCollision: !0,
        blocker: 300,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: e.exports.groups[13],
        name: "teleporter",
        desc: "teleports you to a random point on the map",
        req: ["wood", 60, "stone", 60],
        ignoreCollision: !0,
        teleport: !0,
        health: 200,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }];
    for (var n = 0; n < e.exports.list.length; ++n)
        e.exports.list[n].id = n,
        e.exports.list[n].pre && (e.exports.list[n].pre = n - e.exports.list[n].pre)
}
, function(e, t) {
    e.exports = {}
}
, function(e, t) {
    var n = Math.floor
      , i = Math.abs
      , r = Math.cos
      , s = Math.sin
      , a = (Math.pow,
    Math.sqrt);
    e.exports = function(e, t, o, c, l, h) {
        var u, f;
        this.objects = t,
        this.grids = {},
        this.updateObjects = [];
        var d = c.mapScale / c.colGrid;
        this.setObjectGrids = function(e) {
            for (var t = Math.min(c.mapScale, Math.max(0, e.x)), n = Math.min(c.mapScale, Math.max(0, e.y)), i = 0; i < c.colGrid; ++i) {
                u = i * d;
                for (var r = 0; r < c.colGrid; ++r)
                    f = r * d,
                    t + e.scale >= u && t - e.scale <= u + d && n + e.scale >= f && n - e.scale <= f + d && (this.grids[i + "_" + r] || (this.grids[i + "_" + r] = []),
                    this.grids[i + "_" + r].push(e),
                    e.gridLocations.push(i + "_" + r))
            }
        }
        ,
        this.removeObjGrid = function(e) {
            for (var t, n = 0; n < e.gridLocations.length; ++n)
                (t = this.grids[e.gridLocations[n]].indexOf(e)) >= 0 && this.grids[e.gridLocations[n]].splice(t, 1)
        }
        ,
        this.disableObj = function(e) {
            if (e.active = !1,
            h) {
                e.owner && e.pps && (e.owner.pps -= e.pps),
                this.removeObjGrid(e);
                var t = this.updateObjects.indexOf(e);
                t >= 0 && this.updateObjects.splice(t, 1)
            }
        }
        ,
        this.hitObj = function(e, t) {
            for (var n = 0; n < l.length; ++n)
                l[n].active && (e.sentTo[l[n].id] && (e.active ? l[n].canSee(e) && h.send(l[n].id, "8", o.fixTo(t, 1), e.sid) : h.send(l[n].id, "12", e.sid)),
                e.active || e.owner != l[n] || l[n].changeItemCount(e.group.id, -1))
        }
        ;
        var p, g, m = [];
        this.getGridArrays = function(e, t, i) {
            u = n(e / d),
            f = n(t / d),
            m.length = 0;
            try {
                this.grids[u + "_" + f] && m.push(this.grids[u + "_" + f]),
                e + i >= (u + 1) * d && ((p = this.grids[u + 1 + "_" + f]) && m.push(p),
                f && t - i <= f * d ? (p = this.grids[u + 1 + "_" + (f - 1)]) && m.push(p) : t + i >= (f + 1) * d && (p = this.grids[u + 1 + "_" + (f + 1)]) && m.push(p)),
                u && e - i <= u * d && ((p = this.grids[u - 1 + "_" + f]) && m.push(p),
                f && t - i <= f * d ? (p = this.grids[u - 1 + "_" + (f - 1)]) && m.push(p) : t + i >= (f + 1) * d && (p = this.grids[u - 1 + "_" + (f + 1)]) && m.push(p)),
                t + i >= (f + 1) * d && (p = this.grids[u + "_" + (f + 1)]) && m.push(p),
                f && t - i <= f * d && (p = this.grids[u + "_" + (f - 1)]) && m.push(p)
            } catch (e) {}
            return m
        }
        ,
        this.add = function(n, i, r, s, a, o, c, l, u) {
            g = null;
            for (var f = 0; f < t.length; ++f)
                if (t[f].sid == n) {
                    g = t[f];
                    break
                }
            if (!g)
                for (f = 0; f < t.length; ++f)
                    if (!t[f].active) {
                        g = t[f];
                        break
                    }
            g || (g = new e(n),
            t.push(g)),
            l && (g.sid = n),
            g.init(i, r, s, a, o, c, u),
            h && (this.setObjectGrids(g),
            g.doUpdate && this.updateObjects.push(g))
        }
        ,
        this.disableBySid = function(e) {
            for (var n = 0; n < t.length; ++n)
                if (t[n].sid == e) {
                    this.disableObj(t[n]);
                    break
                }
        }
        ,
        this.removeAllItems = function(e, n) {
            for (var i = 0; i < t.length; ++i)
                t[i].active && t[i].owner && t[i].owner.sid == e && this.disableObj(t[i]);
            n && n.broadcast("13", e)
        }
        ,
        this.fetchSpawnObj = function(e) {
            for (var n = null, i = 0; i < t.length; ++i)
                if ((g = t[i]).active && g.owner && g.owner.sid == e && g.spawnPoint) {
                    n = [g.x, g.y],
                    this.disableObj(g),
                    h.broadcast("12", g.sid),
                    g.owner && g.owner.changeItemCount(g.group.id, -1);
                    break
                }
            return n
        }
        ,
        this.checkItemLocation = function(e, n, i, r, s, a, l) {
            for (var h = 0; h < t.length; ++h) {
                var u = t[h].blocker ? t[h].blocker : t[h].getScale(r, t[h].isItem);
                if (t[h].active && o.getDistance(e, n, t[h].x, t[h].y) < i + u)
                    return !1
            }
            return !(!a && 18 != s && n >= c.mapScale / 2 - c.riverWidth / 2 && n <= c.mapScale / 2 + c.riverWidth / 2)
        }
        ,
        this.addProjectile = function(e, t, n, i, r) {
            for (var s, a = items.projectiles[r], c = 0; c < projectiles.length; ++c)
                if (!projectiles[c].active) {
                    s = projectiles[c];
                    break
                }
            s || (s = new Projectile(l,o),
            projectiles.push(s)),
            s.init(r, e, t, n, a.speed, i, a.scale)
        }
        ,
        this.checkCollision = function(e, t, n) {
            n = n || 1;
            var l = e.x - t.x
              , h = e.y - t.y
              , u = e.scale + t.scale;
            if (i(l) <= u || i(h) <= u) {
                u = e.scale + (t.getScale ? t.getScale() : t.scale);
                var f = a(l * l + h * h) - u;
                if (f <= 0) {
                    if (t.ignoreCollision)
                        !t.trap || e.noTrap || t.owner == e || t.owner && t.owner.team && t.owner.team == e.team ? t.boostSpeed ? (e.xVel += n * t.boostSpeed * (t.weightM || 1) * r(t.dir),
                        e.yVel += n * t.boostSpeed * (t.weightM || 1) * s(t.dir)) : t.healCol ? e.healCol = t.healCol : t.teleport && (e.x = o.randInt(0, c.mapScale),
                        e.y = o.randInt(0, c.mapScale)) : (e.lockMove = !0,
                        t.hideFromEnemy = !1);
                    else {
                        var d = o.getDirection(e.x, e.y, t.x, t.y);
                        if (o.getDistance(e.x, e.y, t.x, t.y),
                        t.isPlayer ? (f = -1 * f / 2,
                        e.x += f * r(d),
                        e.y += f * s(d),
                        t.x -= f * r(d),
                        t.y -= f * s(d)) : (e.x = t.x + u * r(d),
                        e.y = t.y + u * s(d),
                        e.xVel *= .75,
                        e.yVel *= .75),
                        t.dmg && t.owner != e && (!t.owner || !t.owner.team || t.owner.team != e.team)) {
                            e.changeHealth(-t.dmg, t.owner, t);
                            var p = 1.5 * (t.weightM || 1);
                            e.xVel += p * r(d),
                            e.yVel += p * s(d),
                            !t.pDmg || e.skin && e.skin.poisonRes || (e.dmgOverTime.dmg = t.pDmg,
                            e.dmgOverTime.time = 5,
                            e.dmgOverTime.doer = t.owner),
                            e.colDmg && t.health && (t.changeHealth(-e.colDmg) && this.disableObj(t),
                            this.hitObj(t, o.getDirection(e.x, e.y, t.x, t.y)))
                        }
                    }
                    return t.zIndex > e.zIndex && (e.zIndex = t.zIndex),
                    !0
                }
            }
            return !1
        }
    }
}
, function(e, t, n) {
    var i = new (n(49));
    i.addWords("jew", "black", "baby", "child", "white", "porn", "pedo", "trump", "clinton", "hitler", "nazi", "gay", "pride", "sex", "pleasure", "touch", "poo", "kids", "rape", "white power", "nigga", "nig nog", "doggy", "rapist", "boner", "nigger", "nigg", "finger", "nogger", "nagger", "nig", "fag", "gai", "pole", "stripper", "penis", "vagina", "pussy", "nazi", "hitler", "stalin", "burn", "chamber", "cock", "peen", "dick", "spick", "nieger", "die", "satan", "n|ig", "nlg", "cunt", "c0ck", "fag", "lick", "condom", "anal", "shit", "phile", "little", "kids", "free KR", "tiny", "sidney", "ass", "kill", ".io", "(dot)", "[dot]", "mini", "whiore", "whore", "faggot", "github", "1337", "666", "satan", "senpa", "discord", "d1scord", "mistik", ".io", "senpa.io", "sidney", "sid", "senpaio", "vries", "asa");
    var r = Math.abs
      , s = Math.cos
      , a = Math.sin
      , o = Math.pow
      , c = Math.sqrt;
    e.exports = function(e, t, n, l, h, u, f, d, p, g, m, y, k, v) {
        this.id = e,
        this.sid = t,
        this.tmpScore = 0,
        this.team = null,
        this.skinIndex = 0,
        this.tailIndex = 0,
        this.hitTime = 0,
        this.tails = {};
        for (var w = 0; w < m.length; ++w)
            m[w].price <= 0 && (this.tails[m[w].id] = 1);
        for (this.skins = {},
        w = 0; w < g.length; ++w)
            g[w].price <= 0 && (this.skins[g[w].id] = 1);
        this.points = 0,
        this.dt = 0,
        this.hidden = !1,
        this.itemCounts = {},
        this.isPlayer = !0,
        this.pps = 0,
        this.moveDir = void 0,
        this.skinRot = 0,
        this.lastPing = 0,
        this.iconIndex = 0,
        this.skinColor = 0,
        this.spawn = function(e) {
            this.active = !0,
            this.alive = !0,
            this.lockMove = !1,
            this.lockDir = !1,
            this.minimapCounter = 0,
            this.chatCountdown = 0,
            this.shameCount = 0,
            this.shameTimer = 0,
            this.sentTo = {},
            this.gathering = 0,
            this.autoGather = 0,
            this.animTime = 0,
            this.animSpeed = 0,
            this.mouseState = 0,
            this.buildIndex = -1,
            this.weaponIndex = 0,
            this.dmgOverTime = {},
            this.noMovTimer = 0,
            this.maxXP = 300,
            this.XP = 0,
            this.age = 1,
            this.kills = 0,
            this.upgrAge = 2,
            this.upgradePoints = 0,
            this.x = 0,
            this.y = 0,
            this.zIndex = 0,
            this.xVel = 0,
            this.yVel = 0,
            this.slowMult = 1,
            this.dir = 0,
            this.dirPlus = 0,
            this.targetDir = 0,
            this.targetAngle = 0,
            this.maxHealth = 100,
            this.health = this.maxHealth,
            this.scale = n.playerScale,
            this.speed = n.playerSpeed,
            this.resetMoveDir(),
            this.resetResources(e),
            this.items = [0, 3, 6, 10],
            this.weapons = [0],
            this.shootCount = 0,
            this.weaponXP = [],
            this.reloads = {},
            this.primary = {reload: 1, id: 0, variant: 0, dmg: 25},
            this.secondary = {reload: 1, id: null, variant: 0, dmg: 50},
            this.turret = 1,
            this.bullTick = 0;
        }
        ,
        this.resetMoveDir = function() {
            this.moveDir = void 0
        }
        ,
        this.resetResources = function(e) {
            for (var t = 0; t < n.resourceTypes.length; ++t)
                this[n.resourceTypes[t]] = e ? 100 : 0
        }
        ,
        this.addItem = function(e) {
            var t = p.list[e];
            if (t) {
                for (var n = 0; n < this.items.length; ++n)
                    if (p.list[this.items[n]].group == t.group)
                        return this.buildIndex == this.items[n] && (this.buildIndex = e),
                        this.items[n] = e,
                        !0;
                return this.items.push(e),
                !0
            }
            return !1
        }
        ,
        this.setUserData = function(e) {
            if (e) {
                this.name = "unknown";
                var t = e.name + ""
                  , r = !1
                  , s = (t = (t = (t = (t = t.slice(0, n.maxNameLength)).replace(/[^\w:\(\)\/? -]+/gim, " ")).replace(/[^\x00-\x7F]/g, " ")).trim()).toLowerCase().replace(/\s/g, "").replace(/1/g, "i").replace(/0/g, "o").replace(/5/g, "s");
                for (var a of i.list)
                    if (-1 != s.indexOf(a)) {
                        r = !0;
                        break
                    }
                t.length > 0 && !r && (this.name = t),
                this.skinColor = 0,
                n.skinColors[e.skin] && (this.skinColor = e.skin)
            }
        }
        ,
        this.getData = function() {
            return [this.id, this.sid, this.name, l.fixTo(this.x, 2), l.fixTo(this.y, 2), l.fixTo(this.dir, 3), this.health, this.maxHealth, this.scale, this.skinColor]
        }
        ,
        this.setData = function(e) {
            this.id = e[0],
            this.sid = e[1],
            this.name = e[2],
            this.x = e[3],
            this.y = e[4],
            this.dir = e[5],
            this.health = e[6],
            this.maxHealth = e[7],
            this.scale = e[8],
            this.skinColor = e[9]
        }
        ;
        var b = 0;
        this.update = function(e) {
            if (this.alive) {
                if(this.buildIndex == -1) {
                    if(this.weaponIndex < 9) {
                        if(this.primary.id == this.weaponIndex) {
                            this.primary.variant = this.weaponVariant;
                            this.primary.dmg = Math.round(window.weapons[this.weaponIndex].dmg * window.variantMulti(this.weaponVariant));
                            this.primary.reload = Math.min(this.primary.reload + 111/(window.weapons[this.weaponIndex].speed * (this.primary.fastReload == true ? .78 : 1)), 1);
                            if(this.primary.fastReload == true && this.primary.reload == 1) {
                                this.primary.fastReload = false;
                            }
                        }else {
                            this.primary.id = this.weaponIndex;
                            this.secondary.reload = 1;
                            this.secondary.id = 15;
                            this.secondary.variant = 0;
                            this.secondary.dmg = 50;
                        }
                    }else {
                        if(this.secondary.id == this.weaponIndex) {
                            this.secondary.variant = this.weaponVariant;
                            if(this.weaponIndex == 10) {
                                this.secondary.dmg = Math.round(window.weapons[this.weaponIndex].dmg * window.variantMulti(this.weaponVariant));
                            }else this.secondary.dmg = window.secondaryDmg(this.weaponIndex);
                            this.secondary.reload = Math.min(this.secondary.reload + 111/(window.weapons[this.weaponIndex].speed * (this.secondary.fastReload == true ? .78 : 1)), 1);
                            if(this.secondary.fastReload == true && this.secondary.reload == 1) {
                                this.secondary.fastReload = false;
                            }
                        }else {
                            this.secondary.id = this.weaponIndex;
                            if(!this.primary.id) {
                                this.primary.id = 5;
                                this.primary.variant = 3;
                                this.primary.reload = 1;
                                this.primary.dmg = 53;
                            }
                        }
                    }
                }
                this.turret = Math.min(this.turret + 0.0444, 1);
            }
        }
        ,
        this.addWeaponXP = function(e) {
            this.weaponXP[this.weaponIndex] || (this.weaponXP[this.weaponIndex] = 0),
            this.weaponXP[this.weaponIndex] += e
        }
        ,
        this.earnXP = function(e) {
            this.age < n.maxAge && (this.XP += e,
            this.XP >= this.maxXP ? (this.age < n.maxAge ? (this.age++,
            this.XP = 0,
            this.maxXP *= 1.2) : this.XP = this.maxXP,
            this.upgradePoints++,
            y.send(this.id, "16", this.upgradePoints, this.upgrAge),
            y.send(this.id, "15", this.XP, l.fixTo(this.maxXP, 1), this.age)) : y.send(this.id, "15", this.XP))
        }
        ,
        this.changeHealth = function(e, t) {
            if (e > 0 && this.health >= this.maxHealth)
                return !1;
            e < 0 && this.skin && (e *= this.skin.dmgMult || 1),
            e < 0 && this.tail && (e *= this.tail.dmgMult || 1),
            e < 0 && (this.hitTime = Date.now()),
            this.health += e,
            this.health > this.maxHealth && (e -= this.health - this.maxHealth,
            this.health = this.maxHealth),
            this.health <= 0 && this.kill(t);
            for (var n = 0; n < f.length; ++n)
                this.sentTo[f[n].id] && y.send(f[n].id, "h", this.sid, Math.round(this.health));
            return !t || !t.canSee(this) || t == this && e < 0 || y.send(t.id, "t", Math.round(this.x), Math.round(this.y), Math.round(-e), 1),
            !0
        }
        ,
        this.kill = function(e) {
            e && e.alive && (e.kills++,
            e.skin && e.skin.goldSteal ? k(e, Math.round(this.points / 2)) : k(e, Math.round(100 * this.age * (e.skin && e.skin.kScrM ? e.skin.kScrM : 1))),
            y.send(e.id, "9", "kills", e.kills, 1)),
            this.alive = !1,
            y.send(this.id, "11"),
            v()
        }
        ,
        this.addResource = function(e, t, i) {
            !i && t > 0 && this.addWeaponXP(t),
            3 == e ? k(this, t, !0) : (this[n.resourceTypes[e]] += t,
            y.send(this.id, "9", n.resourceTypes[e], this[n.resourceTypes[e]], 1))
        }
        ,
        this.changeItemCount = function(e, t) {
            this.itemCounts[e] = this.itemCounts[e] || 0,
            this.itemCounts[e] += t,
            y.send(this.id, "14", e, this.itemCounts[e])
        }
        ,
        this.buildItem = function() {
            if(this.hitTime) {
                let e = tick - this.hitTime;
                this.hitTime = 0;
                if(e < 2) {
                    this.shameCount++;
                }else {
                    this.shameCount = Math.max(0, this.shameCount - 2);
                }
            }
        }
        ,
        this.hasRes = function(e, t) {
            for (var n = 0; n < e.req.length; ) {
                if (this[e.req[n]] < Math.round(e.req[n + 1] * (t || 1)))
                    return !1;
                n += 2
            }
            return !0
        }
        ,
        this.useRes = function(e, t) {
            if (!n.inSandbox)
                for (var i = 0; i < e.req.length; )
                    this.addResource(n.resourceTypes.indexOf(e.req[i]), -Math.round(e.req[i + 1] * (t || 1))),
                    i += 2
        }
        ,
        this.canBuild = function(e) {
            return !!n.inSandbox || !(e.group.limit && this.itemCounts[e.group.id] >= e.group.limit) && this.hasRes(e)
        }
        ,
        this.gather = function() {
            this.noMovTimer = 0,
            this.slowMult -= p.weapons[this.weaponIndex].hitSlow || .3,
            this.slowMult < 0 && (this.slowMult = 0);
            for (var e, t, i, r = n.fetchVariant(this), o = r.poison, c = r.val, h = {}, g = u.getGridArrays(this.x, this.y, p.weapons[this.weaponIndex].range), m = 0; m < g.length; ++m)
                for (var y = 0; y < g[m].length; ++y)
                    if ((t = g[m][y]).active && !t.dontGather && !h[t.sid] && t.visibleToPlayer(this) && l.getDistance(this.x, this.y, t.x, t.y) - t.scale <= p.weapons[this.weaponIndex].range && (e = l.getDirection(t.x, t.y, this.x, this.y),
                    l.getAngleDist(e, this.dir) <= n.gatherAngle)) {
                        if (h[t.sid] = 1,
                        t.health) {
                            if (t.changeHealth(-p.weapons[this.weaponIndex].dmg * c * (p.weapons[this.weaponIndex].sDmg || 1) * (this.skin && this.skin.bDmg ? this.skin.bDmg : 1), this)) {
                                for (var k = 0; k < t.req.length; )
                                    this.addResource(n.resourceTypes.indexOf(t.req[k]), t.req[k + 1]),
                                    k += 2;
                                u.disableObj(t)
                            }
                        } else {
                            this.earnXP(4 * p.weapons[this.weaponIndex].gather);
                            var v = p.weapons[this.weaponIndex].gather + (3 == t.type ? 4 : 0);
                            this.skin && this.skin.extraGold && this.addResource(3, 1),
                            this.addResource(t.type, v)
                        }
                        i = !0,
                        u.hitObj(t, e)
                    }
            for (y = 0; y < f.length + d.length; ++y)
                if ((t = f[y] || d[y - f.length]) != this && t.alive && (!t.team || t.team != this.team) && l.getDistance(this.x, this.y, t.x, t.y) - 1.8 * t.scale <= p.weapons[this.weaponIndex].range && (e = l.getDirection(t.x, t.y, this.x, this.y),
                l.getAngleDist(e, this.dir) <= n.gatherAngle)) {
                    var w = p.weapons[this.weaponIndex].steal;
                    w && t.addResource && (w = Math.min(t.points || 0, w),
                    this.addResource(3, w),
                    t.addResource(3, -w));
                    var b = c;
                    null != t.weaponIndex && p.weapons[t.weaponIndex].shield && l.getAngleDist(e + Math.PI, t.dir) <= n.shieldAngle && (b = p.weapons[t.weaponIndex].shield);
                    var x = p.weapons[this.weaponIndex].dmg * (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) * (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1)
                      , S = .3 * (t.weightM || 1) + (p.weapons[this.weaponIndex].knock || 0);
                    t.xVel += S * s(e),
                    t.yVel += S * a(e),
                    this.skin && this.skin.healD && this.changeHealth(x * b * this.skin.healD, this),
                    this.tail && this.tail.healD && this.changeHealth(x * b * this.tail.healD, this),
                    t.skin && t.skin.dmg && 1 == b && this.changeHealth(-x * t.skin.dmg, t),
                    t.tail && t.tail.dmg && 1 == b && this.changeHealth(-x * t.tail.dmg, t),
                    !(t.dmgOverTime && this.skin && this.skin.poisonDmg) || t.skin && t.skin.poisonRes || (t.dmgOverTime.dmg = this.skin.poisonDmg,
                    t.dmgOverTime.time = this.skin.poisonTime || 1,
                    t.dmgOverTime.doer = this),
                    !t.dmgOverTime || !o || t.skin && t.skin.poisonRes || (t.dmgOverTime.dmg = 5,
                    t.dmgOverTime.time = 5,
                    t.dmgOverTime.doer = this),
                    t.skin && t.skin.dmgK && (this.xVel -= t.skin.dmgK * s(e),
                    this.yVel -= t.skin.dmgK * a(e)),
                    t.changeHealth(-x * b, this, this)
                }
            this.sendAnimation(i ? 1 : 0)
        }
        ,
        this.sendAnimation = function(e) {
            for (var t = 0; t < f.length; ++t)
                this.sentTo[f[t].id] && this.canSee(f[t]) && y.send(f[t].id, "7", this.sid, e ? 1 : 0, this.weaponIndex)
        }
        ;
        var x = 0
          , S = 0;
        this.animate = function(e) {
            this.animTime > 0 && (this.animTime -= e,
            this.animTime <= 0 ? (this.animTime = 0,
            this.dirPlus = 0,
            x = 0,
            S = 0) : 0 == S ? (x += e / (this.animSpeed * n.hitReturnRatio),
            this.dirPlus = l.lerp(0, this.targetAngle, Math.min(1, x)),
            x >= 1 && (x = 1,
            S = 1)) : (x -= e / (this.animSpeed * (1 - n.hitReturnRatio)),
            this.dirPlus = l.lerp(0, this.targetAngle, Math.max(0, x))))
        }
        ,
        this.startAnim = function(e, t) {
            this.animTime = this.animSpeed = p.weapons[t].speed,
            this.targetAngle = e ? -n.hitAngle : -Math.PI,
            x = 0,
            S = 0
            if(t > 9) {
                setTimeout(() => {
                    this.secondary.reload = 0;
                    if(this.skinIndex == 20) {
                        this.secondary.fastReload = true;
                    }
                })
            }else {
                setTimeout(() => {
                    this.primary.reload = 0;
                    if(this.skinIndex == 20) {
                        this.primary.fastReload = false;
                    }
                })
            }
        }
        ,
        this.canSee = function(e) {
            if (!e)
                return !1;
            if (e.skin && e.skin.invisTimer && e.noMovTimer >= e.skin.invisTimer)
                return !1;
            var t = r(e.x - this.x) - e.scale
              , i = r(e.y - this.y) - e.scale;
            return t <= n.maxScreenWidth / 2 * 1.3 && i <= n.maxScreenHeight / 2 * 1.3
        }
    }
}
, function(e, t, n) {
    const i = n(50).words
      , r = n(51).array;
    e.exports = class {
        constructor(e={}) {
            Object.assign(this, {
                list: e.emptyList && [] || Array.prototype.concat.apply(i, [r, e.list || []]),
                exclude: e.exclude || [],
                placeHolder: e.placeHolder || "*",
                regex: e.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
                replaceRegex: e.replaceRegex || /\w/g
            })
        }
        isProfane(e) {
            return this.list.filter(t=>{
                const n = new RegExp(`\\b${t.replace(/(\W)/g, "\\$1")}\\b`,"gi");
                return !this.exclude.includes(t.toLowerCase()) && n.test(e)
            }
            ).length > 0 || !1
        }
        replaceWord(e) {
            return e.replace(this.regex, "").replace(this.replaceRegex, this.placeHolder)
        }
        clean(e) {
            return e.split(/\b/).map(e=>this.isProfane(e) ? this.replaceWord(e) : e).join("")
        }
        addWords() {
            let e = Array.from(arguments);
            this.list.push(...e),
            e.map(e=>e.toLowerCase()).forEach(e=>{
                this.exclude.includes(e) && this.exclude.splice(this.exclude.indexOf(e), 1)
            }
            )
        }
        removeWords() {
            this.exclude.push(...Array.from(arguments).map(e=>e.toLowerCase()))
        }
    }
}
, function(e) {
    e.exports = {
        words: ["ahole", "anus", "ash0le", "ash0les", "asholes", "ass", "Ass Monkey", "Assface", "assh0le", "assh0lez", "asshole", "assholes", "assholz", "asswipe", "azzhole", "bassterds", "bastard", "bastards", "bastardz", "basterds", "basterdz", "Biatch", "bitch", "bitches", "Blow Job", "boffing", "butthole", "buttwipe", "c0ck", "c0cks", "c0k", "Carpet Muncher", "cawk", "cawks", "Clit", "cnts", "cntz", "cock", "cockhead", "cock-head", "cocks", "CockSucker", "cock-sucker", "crap", "cum", "cunt", "cunts", "cuntz", "dick", "dild0", "dild0s", "dildo", "dildos", "dilld0", "dilld0s", "dominatricks", "dominatrics", "dominatrix", "dyke", "enema", "f u c k", "f u c k e r", "fag", "fag1t", "faget", "fagg1t", "faggit", "faggot", "fagg0t", "fagit", "fags", "fagz", "faig", "faigs", "fart", "flipping the bird", "fuck", "fucker", "fuckin", "fucking", "fucks", "Fudge Packer", "fuk", "Fukah", "Fuken", "fuker", "Fukin", "Fukk", "Fukkah", "Fukken", "Fukker", "Fukkin", "g00k", "God-damned", "h00r", "h0ar", "h0re", "hells", "hoar", "hoor", "hoore", "jackoff", "jap", "japs", "jerk-off", "jisim", "jiss", "jizm", "jizz", "knob", "knobs", "knobz", "kunt", "kunts", "kuntz", "Lezzian", "Lipshits", "Lipshitz", "masochist", "masokist", "massterbait", "masstrbait", "masstrbate", "masterbaiter", "masterbate", "masterbates", "Motha Fucker", "Motha Fuker", "Motha Fukkah", "Motha Fukker", "Mother Fucker", "Mother Fukah", "Mother Fuker", "Mother Fukkah", "Mother Fukker", "mother-fucker", "Mutha Fucker", "Mutha Fukah", "Mutha Fuker", "Mutha Fukkah", "Mutha Fukker", "n1gr", "nastt", "nigger;", "nigur;", "niiger;", "niigr;", "orafis", "orgasim;", "orgasm", "orgasum", "oriface", "orifice", "orifiss", "packi", "packie", "packy", "paki", "pakie", "paky", "pecker", "peeenus", "peeenusss", "peenus", "peinus", "pen1s", "penas", "penis", "penis-breath", "penus", "penuus", "Phuc", "Phuck", "Phuk", "Phuker", "Phukker", "polac", "polack", "polak", "Poonani", "pr1c", "pr1ck", "pr1k", "pusse", "pussee", "pussy", "puuke", "puuker", "queer", "queers", "queerz", "qweers", "qweerz", "qweir", "recktum", "rectum", "potDmg", "sadist", "scank", "schlong", "screwing", "semen", "sex", "sexy", "Sh!t", "sh1t", "sh1ter", "sh1ts", "sh1tter", "sh1tz", "shit", "shits", "shitter", "Shitty", "Shity", "shitz", "Shyt", "Shyte", "Shytty", "Shyty", "skanck", "skank", "skankee", "skankey", "skanks", "Skanky", "slag", "slut", "sluts", "Slutty", "slutz", "son-of-a-bitch", "tit", "turd", "va1jina", "vag1na", "vagiina", "vagina", "vaj1na", "vajina", "vullva", "vulva", "w0p", "wh00r", "wh0re", "whore", "xrated", "xxx", "b!+ch", "bitch", "blowjob", "clit", "arschloch", "fuck", "shit", "ass", "asshole", "b!tch", "b17ch", "b1tch", "bastard", "bi+ch", "boiolas", "buceta", "c0ck", "cawk", "chink", "cipa", "clits", "cock", "cum", "cunt", "dildo", "dirsa", "ejakulate", "fatass", "fcuk", "fuk", "fux0r", "hoer", "hore", "jism", "kawk", "l3itch", "l3i+ch", "lesbian", "masturbate", "masterbat*", "masterbat3", "motherfucker", "s.o.b.", "mofo", "nazi", "nigga", "nigger", "nutsack", "phuck", "pimpis", "pusse", "pussy", "scrotum", "sh!t", "shemale", "shi+", "sh!+", "slut", "smut", "teets", "tits", "boobs", "b00bs", "teez", "testical", "testicle", "titt", "w00se", "jackoff", "wank", "whoar", "whore", "*damn", "*dyke", "*fuck*", "*shit*", "@$$", "amcik", "andskota", "arse*", "assrammer", "ayir", "bi7ch", "bitch*", "bollock*", "breasts", "butt-pirate", "cabron", "cazzo", "chraa", "chuj", "Cock*", "cunt*", "d4mn", "daygo", "dego", "dick*", "dike*", "dupa", "dziwka", "ejackulate", "Ekrem*", "Ekto", "enculer", "faen", "fag*", "fanculo", "fanny", "feces", "feg", "Felcher", "ficken", "fitt*", "Flikker", "foreskin", "Fotze", "Fu(*", "fuk*", "futkretzn", "gook", "guiena", "h0r", "h4x0r", "hell", "helvete", "hoer*", "honkey", "Huevon", "hui", "injun", "jizz", "kanker*", "kike", "klootzak", "kraut", "knulle", "kuk", "kuksuger", "Kurac", "kurwa", "kusi*", "kyrpa*", "lesbo", "mamhoon", "masturbat*", "merd*", "mibun", "monkleigh", "mouliewop", "muie", "mulkku", "muschi", "nazis", "nepesaurio", "nigger*", "orospu", "paska*", "perse", "picka", "pierdol*", "pillu*", "pimmel", "piss*", "pizda", "poontsee", "poop", "porn", "p0rn", "pr0n", "preteen", "pula", "pule", "puta", "puto", "qahbeh", "queef*", "rautenberg", "schaffer", "scheiss*", "schlampe", "schmuck", "screw", "sh!t*", "sharmuta", "sharmute", "shipal", "shiz", "skribz", "skurwysyn", "sphencter", "spic", "spierdalaj", "splooge", "suka", "b00b*", "testicle*", "titt*", "twat", "vittu", "wank*", "wetback*", "wichser", "wop*", "yed", "zabourah"]
    }
}
, function(e, t, n) {
    e.exports = {
        object: n(52),
        array: n(53),
        regex: n(54)
    }
}
, function(e, t) {
    e.exports = {
        "4r5e": 1,
        "5h1t": 1,
        "5hit": 1,
        a55: 1,
        anal: 1,
        anus: 1,
        ar5e: 1,
        arrse: 1,
        arse: 1,
        ass: 1,
        "ass-fucker": 1,
        asses: 1,
        assfucker: 1,
        assfukka: 1,
        asshole: 1,
        assholes: 1,
        asswhole: 1,
        a_s_s: 1,
        "b!tch": 1,
        b00bs: 1,
        b17ch: 1,
        b1tch: 1,
        ballbag: 1,
        balls: 1,
        ballsack: 1,
        bastard: 1,
        beastial: 1,
        beastiality: 1,
        bellend: 1,
        bestial: 1,
        bestiality: 1,
        "bi+ch": 1,
        biatch: 1,
        bitch: 1,
        bitcher: 1,
        bitchers: 1,
        bitches: 1,
        bitchin: 1,
        bitching: 1,
        bloody: 1,
        "blow job": 1,
        blowjob: 1,
        blowjobs: 1,
        boiolas: 1,
        bollock: 1,
        bollok: 1,
        boner: 1,
        boob: 1,
        boobs: 1,
        booobs: 1,
        boooobs: 1,
        booooobs: 1,
        booooooobs: 1,
        breasts: 1,
        buceta: 1,
        bugger: 1,
        bum: 1,
        "bunny fucker": 1,
        butt: 1,
        butthole: 1,
        buttmuch: 1,
        buttplug: 1,
        c0ck: 1,
        c0cksucker: 1,
        "carpet muncher": 1,
        cawk: 1,
        chink: 1,
        cipa: 1,
        cl1t: 1,
        clit: 1,
        clitoris: 1,
        clits: 1,
        cnut: 1,
        cock: 1,
        "cock-sucker": 1,
        cockface: 1,
        cockhead: 1,
        cockmunch: 1,
        cockmuncher: 1,
        cocks: 1,
        cocksuck: 1,
        cocksucked: 1,
        cocksucker: 1,
        cocksucking: 1,
        cocksucks: 1,
        cocksuka: 1,
        cocksukka: 1,
        cok: 1,
        cokmuncher: 1,
        coksucka: 1,
        coon: 1,
        cox: 1,
        crap: 1,
        cum: 1,
        cummer: 1,
        cumming: 1,
        cums: 1,
        cumshot: 1,
        cunilingus: 1,
        cunillingus: 1,
        cunnilingus: 1,
        cunt: 1,
        cuntlick: 1,
        cuntlicker: 1,
        cuntlicking: 1,
        cunts: 1,
        cyalis: 1,
        cyberfuc: 1,
        cyberfuck: 1,
        cyberfucked: 1,
        cyberfucker: 1,
        cyberfuckers: 1,
        cyberfucking: 1,
        d1ck: 1,
        damn: 1,
        dick: 1,
        dickhead: 1,
        dildo: 1,
        dildos: 1,
        dink: 1,
        dinks: 1,
        dirsa: 1,
        dlck: 1,
        "dog-fucker": 1,
        doggin: 1,
        dogging: 1,
        donkeyribber: 1,
        doosh: 1,
        duche: 1,
        dyke: 1,
        ejaculate: 1,
        ejaculated: 1,
        ejaculates: 1,
        ejaculating: 1,
        ejaculatings: 1,
        ejaculation: 1,
        ejakulate: 1,
        "f u c k": 1,
        "f u c k e r": 1,
        f4nny: 1,
        fag: 1,
        fagging: 1,
        faggitt: 1,
        faggot: 1,
        faggs: 1,
        fagot: 1,
        fagots: 1,
        fags: 1,
        fanny: 1,
        fannyflaps: 1,
        fannyfucker: 1,
        fanyy: 1,
        fatass: 1,
        fcuk: 1,
        fcuker: 1,
        fcuking: 1,
        feck: 1,
        fecker: 1,
        felching: 1,
        fellate: 1,
        fellatio: 1,
        fingerfuck: 1,
        fingerfucked: 1,
        fingerfucker: 1,
        fingerfuckers: 1,
        fingerfucking: 1,
        fingerfucks: 1,
        fistfuck: 1,
        fistfucked: 1,
        fistfucker: 1,
        fistfuckers: 1,
        fistfucking: 1,
        fistfuckings: 1,
        fistfucks: 1,
        flange: 1,
        fook: 1,
        fooker: 1,
        fuck: 1,
        fucka: 1,
        fucked: 1,
        fucker: 1,
        fuckers: 1,
        fuckhead: 1,
        fuckheads: 1,
        fuckin: 1,
        fucking: 1,
        fuckings: 1,
        fuckingshitmotherfucker: 1,
        fuckme: 1,
        fucks: 1,
        fuckwhit: 1,
        fuckwit: 1,
        "fudge packer": 1,
        fudgepacker: 1,
        fuk: 1,
        fuker: 1,
        fukker: 1,
        fukkin: 1,
        fuks: 1,
        fukwhit: 1,
        fukwit: 1,
        fux: 1,
        fux0r: 1,
        f_u_c_k: 1,
        gangbang: 1,
        gangbanged: 1,
        gangbangs: 1,
        gaylord: 1,
        gaysex: 1,
        goatse: 1,
        God: 1,
        "god-dam": 1,
        "god-damned": 1,
        goddamn: 1,
        goddamned: 1,
        hardcoresex: 1,
        hell: 1,
        heshe: 1,
        hoar: 1,
        hoare: 1,
        hoer: 1,
        homo: 1,
        hore: 1,
        horniest: 1,
        horny: 1,
        hotsex: 1,
        "jack-off": 1,
        jackoff: 1,
        jap: 1,
        "jerk-off": 1,
        jism: 1,
        jiz: 1,
        jizm: 1,
        jizz: 1,
        kawk: 1,
        knob: 1,
        knobead: 1,
        knobed: 1,
        knobend: 1,
        knobhead: 1,
        knobjocky: 1,
        knobjokey: 1,
        kock: 1,
        kondum: 1,
        kondums: 1,
        kum: 1,
        kummer: 1,
        kumming: 1,
        kums: 1,
        kunilingus: 1,
        "l3i+ch": 1,
        l3itch: 1,
        labia: 1,
        lust: 1,
        lusting: 1,
        m0f0: 1,
        m0fo: 1,
        m45terbate: 1,
        ma5terb8: 1,
        ma5terbate: 1,
        masochist: 1,
        "master-bate": 1,
        masterb8: 1,
        "masterbat*": 1,
        masterbat3: 1,
        masterbate: 1,
        masterbation: 1,
        masterbations: 1,
        masturbate: 1,
        "mo-fo": 1,
        mof0: 1,
        mofo: 1,
        mothafuck: 1,
        mothafucka: 1,
        mothafuckas: 1,
        mothafuckaz: 1,
        mothafucked: 1,
        mothafucker: 1,
        mothafuckers: 1,
        mothafuckin: 1,
        mothafucking: 1,
        mothafuckings: 1,
        mothafucks: 1,
        "mother fucker": 1,
        motherfuck: 1,
        motherfucked: 1,
        motherfucker: 1,
        motherfuckers: 1,
        motherfuckin: 1,
        motherfucking: 1,
        motherfuckings: 1,
        motherfuckka: 1,
        motherfucks: 1,
        muff: 1,
        mutha: 1,
        muthafecker: 1,
        muthafuckker: 1,
        muther: 1,
        mutherfucker: 1,
        n1gga: 1,
        n1gger: 1,
        nazi: 1,
        nigg3r: 1,
        nigg4h: 1,
        nigga: 1,
        niggah: 1,
        niggas: 1,
        niggaz: 1,
        nigger: 1,
        niggers: 1,
        nob: 1,
        "nob jokey": 1,
        nobhead: 1,
        nobjocky: 1,
        nobjokey: 1,
        numbnuts: 1,
        nutsack: 1,
        orgasim: 1,
        orgasims: 1,
        orgasm: 1,
        orgasms: 1,
        p0rn: 1,
        pawn: 1,
        pecker: 1,
        penis: 1,
        penisfucker: 1,
        phonesex: 1,
        phuck: 1,
        phuk: 1,
        phuked: 1,
        phuking: 1,
        phukked: 1,
        phukking: 1,
        phuks: 1,
        phuq: 1,
        pigfucker: 1,
        pimpis: 1,
        piss: 1,
        pissed: 1,
        pisser: 1,
        pissers: 1,
        pisses: 1,
        pissflaps: 1,
        pissin: 1,
        pissing: 1,
        pissoff: 1,
        poop: 1,
        porn: 1,
        porno: 1,
        pornography: 1,
        pornos: 1,
        prick: 1,
        pricks: 1,
        pron: 1,
        pube: 1,
        pusse: 1,
        pussi: 1,
        pussies: 1,
        pussy: 1,
        pussys: 1,
        rectum: 1,
        potDmg: 1,
        rimjaw: 1,
        rimming: 1,
        "s hit": 1,
        "s.o.b.": 1,
        sadist: 1,
        schlong: 1,
        screwing: 1,
        scroat: 1,
        scrote: 1,
        scrotum: 1,
        semen: 1,
        sex: 1,
        "sh!+": 1,
        "sh!t": 1,
        sh1t: 1,
        shag: 1,
        shagger: 1,
        shaggin: 1,
        shagging: 1,
        shemale: 1,
        "shi+": 1,
        shit: 1,
        shitdick: 1,
        shite: 1,
        shited: 1,
        shitey: 1,
        shitfuck: 1,
        shitfull: 1,
        shithead: 1,
        shiting: 1,
        shitings: 1,
        shits: 1,
        shitted: 1,
        shitter: 1,
        shitters: 1,
        shitting: 1,
        shittings: 1,
        shitty: 1,
        skank: 1,
        slut: 1,
        sluts: 1,
        smegma: 1,
        smut: 1,
        snatch: 1,
        "son-of-a-bitch": 1,
        spac: 1,
        spunk: 1,
        s_h_i_t: 1,
        t1tt1e5: 1,
        t1tties: 1,
        teets: 1,
        teez: 1,
        testical: 1,
        testicle: 1,
        tit: 1,
        titfuck: 1,
        tits: 1,
        titt: 1,
        tittie5: 1,
        tittiefucker: 1,
        titties: 1,
        tittyfuck: 1,
        tittywank: 1,
        titwank: 1,
        tosser: 1,
        turd: 1,
        tw4t: 1,
        twat: 1,
        twathead: 1,
        twatty: 1,
        twunt: 1,
        twunter: 1,
        v14gra: 1,
        v1gra: 1,
        vagina: 1,
        viagra: 1,
        vulva: 1,
        w00se: 1,
        wang: 1,
        wank: 1,
        wanker: 1,
        wanky: 1,
        whoar: 1,
        whore: 1,
        willies: 1,
        willy: 1,
        xrated: 1,
        xxx: 1
    }
}
, function(e, t) {
    e.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "potDmg", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"]
}
, function(e, t) {
    e.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|potDmg|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi
}
, function(e, t) {
    e.exports.hats = [{
        id: 45,
        name: "Shame!",
        price: 0,
        scale: 120,
        desc: "hacks are for losers"
    }, {
        id: 51,
        name: "Moo Cap",
        price: 0,
        scale: 120,
        desc: "coolest mooer around"
    }, {
        id: 50,
        name: "Apple Cap",
        price: 0,
        scale: 120,
        desc: "apple farms remembers"
    }, {
        id: 28,
        name: "Moo Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 29,
        name: "Pig Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 30,
        name: "Fluff Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 36,
        name: "Pandou Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 37,
        name: "Bear Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 38,
        name: "Monkey Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 44,
        name: "Polar Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 35,
        name: "Fez Hat",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 42,
        name: "Enigma Hat",
        price: 0,
        scale: 120,
        desc: "join the enigma army"
    }, {
        id: 43,
        name: "Blitz Hat",
        price: 0,
        scale: 120,
        desc: "hey everybody i'm blitz"
    }, {
        id: 49,
        name: "Bob XIII Hat",
        price: 0,
        scale: 120,
        desc: "like and subscribe"
    }, {
        id: 57,
        name: "Pumpkin",
        price: 50,
        scale: 120,
        desc: "Spooooky"
    }, {
        id: 8,
        name: "Bummle Hat",
        price: 100,
        scale: 120,
        desc: "no effect"
    }, {
        id: 2,
        name: "Straw Hat",
        price: 500,
        scale: 120,
        desc: "no effect"
    }, {
        id: 15,
        name: "Winter Cap",
        price: 600,
        scale: 120,
        desc: "allows you to move at normal speed in snow",
        coldM: 1
    }, {
        id: 5,
        name: "Cowboy Hat",
        price: 1e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 4,
        name: "Ranger Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 18,
        name: "Explorer Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 31,
        name: "Flipper Hat",
        price: 2500,
        scale: 120,
        desc: "have more control while in water",
        watrImm: !0
    }, {
        id: 1,
        name: "Marksman Cap",
        price: 3e3,
        scale: 120,
        desc: "increases arrow speed and range",
        aMlt: 1.3
    }, {
        id: 10,
        name: "Bush Gear",
        price: 3e3,
        scale: 160,
        desc: "allows you to disguise yourself as a bush"
    }, {
        id: 48,
        name: "Halo",
        price: 3e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 6,
        name: "Soldier Helmet",
        price: 4e3,
        scale: 120,
        desc: "reduces damage taken but slows movement",
        spdMult: .94,
        dmgMult: .75
    }, {
        id: 23,
        name: "Anti Venom Gear",
        price: 4e3,
        scale: 120,
        desc: "makes you immune to poison",
        poisonRes: 1
    }, {
        id: 13,
        name: "Medic Gear",
        price: 5e3,
        scale: 110,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 9,
        name: "Miners Helmet",
        price: 5e3,
        scale: 120,
        desc: "earn 1 extra gold per resource",
        extraGold: 1
    }, {
        id: 32,
        name: "Musketeer Hat",
        price: 5e3,
        scale: 120,
        desc: "reduces cost of projectiles",
        projCost: .5
    }, {
        id: 7,
        name: "Bull Helmet",
        price: 6e3,
        scale: 120,
        desc: "increases damage done but drains health",
        healthRegen: -5,
        dmgMultO: 1.5,
        spdMult: .96
    }, {
        id: 22,
        name: "Emp Helmet",
        price: 6e3,
        scale: 120,
        desc: "Turrets won't attack but you move slower",
        antiTurret: 1,
        spdMult: .7
    }, {
        id: 12,
        name: "Booster Hat",
        price: 6e3,
        scale: 120,
        desc: "increases your movement speed",
        spdMult: 1.16
    }, {
        id: 26,
        name: "Barbarian Armor",
        price: 8e3,
        scale: 120,
        desc: "knocks back enemies that attack you",
        dmgK: .6
    }, {
        id: 21,
        name: "Plague Mask",
        price: 1e4,
        scale: 120,
        desc: "melee heals deal poison damage",
        poisonDmg: 5,
        poisonTime: 6
    }, {
        id: 46,
        name: "Bull Mask",
        price: 1e4,
        scale: 120,
        desc: "bulls won't target you unless you attack them",
        bullRepel: 1
    }, {
        id: 14,
        name: "Windmill Hat",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "generates points while worn",
        pps: 1.5
    }, {
        id: 11,
        name: "Spike Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "deal damage to players that damage you",
        dmg: .45
    }, {
        id: 53,
        name: "Turret Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "you become a walking turret",
        turret: {
            proj: 1,
            range: 700,
            rate: 2500
        },
        spdMult: .7
    }, {
        id: 20,
        name: "Samurai Armor",
        price: 12e3,
        scale: 120,
        desc: "increased attack speed and fire rate",
        atkSpd: .78
    }, {
        id: 58,
        name: "Dark Knight",
        price: 12e3,
        scale: 120,
        desc: "restores health when you deal damage",
        healD: .4
    }, {
        id: 27,
        name: "Scavenger Gear",
        price: 15e3,
        scale: 120,
        desc: "earn double points for each kill",
        kScrM: 2
    }, {
        id: 40,
        name: "Tank Gear",
        price: 15e3,
        scale: 120,
        desc: "increased damage to buildings but slower movement",
        spdMult: .3,
        bDmg: 3.3
    }, {
        id: 52,
        name: "Thief Gear",
        price: 15e3,
        scale: 120,
        desc: "steal half of a players gold when you kill them",
        goldSteal: .5
    }, {
        id: 55,
        name: "Bloodthirster",
        price: 2e4,
        scale: 120,
        desc: "Restore Health when dealing damage. And increased damage",
        healD: .25,
        dmgMultO: 1.2
    }, {
        id: 56,
        name: "Assassin Gear",
        price: 2e4,
        scale: 120,
        desc: "Go invisible when not moving. Can't eat. Increased speed",
        noEat: !0,
        spdMult: 1.1,
        invisTimer: 1e3
    }],
    e.exports.accessories = [{
        id: 12,
        name: "Snowball",
        price: 1e3,
        scale: 105,
        xOff: 18,
        desc: "no effect"
    }, {
        id: 9,
        name: "Tree Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 10,
        name: "Stone Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 3,
        name: "Cookie Cape",
        price: 1500,
        scale: 90,
        desc: "no effect"
    }, {
        id: 8,
        name: "Cow Cape",
        price: 2e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 11,
        name: "Monkey Tail",
        price: 2e3,
        scale: 97,
        xOff: 25,
        desc: "Super speed but reduced damage",
        spdMult: 1.35,
        dmgMultO: .2
    }, {
        id: 17,
        name: "Apple Basket",
        price: 3e3,
        scale: 80,
        xOff: 12,
        desc: "slowly regenerates health over time",
        healthRegen: 1
    }, {
        id: 6,
        name: "Winter Cape",
        price: 3e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 4,
        name: "Skull Cape",
        price: 4e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 5,
        name: "Dash Cape",
        price: 5e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 2,
        name: "Dragon Cape",
        price: 6e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 1,
        name: "Super Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 7,
        name: "Troll Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 14,
        name: "Thorns",
        price: 1e4,
        scale: 115,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 15,
        name: "Blockades",
        price: 1e4,
        scale: 95,
        xOff: 15,
        desc: "no effect"
    }, {
        id: 20,
        name: "Devils Tail",
        price: 1e4,
        scale: 95,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 16,
        name: "Sawblade",
        price: 12e3,
        scale: 90,
        spin: !0,
        xOff: 0,
        desc: "deal damage to players that damage you",
        dmg: .15
    }, {
        id: 13,
        name: "Angel Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 19,
        name: "Shadow Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "increased movement speed",
        spdMult: 1.1
    }, {
        id: 18,
        name: "Blood Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "restores health when you deal damage",
        healD: .2
    }, {
        id: 21,
        name: "Corrupt X Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "deal damage to players that damage you",
        dmg: .25
    }]
}
, function(e, t) {
    e.exports = function(e, t, n, i, r, s, a) {
        this.init = function(e, t, n, i, r, s, o, c, l) {
            this.active = !0,
            this.indx = e,
            this.x = t,
            this.y = n,
            this.dir = i,
            this.skipMov = !0,
            this.speed = r,
            this.dmg = s,
            this.scale = c,
            this.range = o,
            this.owner = l,
            a && (this.sentTo = {})
        }
        ;
        var o, c = [];
        this.update = function(l) {
            if (this.active) {
                var h, u = this.speed * l;
                if (this.skipMov ? this.skipMov = !1 : (this.x += u * Math.cos(this.dir),
                this.y += u * Math.sin(this.dir),
                this.range -= u,
                this.range <= 0 && (this.x += this.range * Math.cos(this.dir),
                this.y += this.range * Math.sin(this.dir),
                u = 1,
                this.range = 0,
                this.active = !1)),
                a) {
                    for (var f = 0; f < e.length; ++f)
                        !this.sentTo[e[f].id] && e[f].canSee(this) && (this.sentTo[e[f].id] = 1,
                        a.send(e[f].id, "18", s.fixTo(this.x, 1), s.fixTo(this.y, 1), s.fixTo(this.dir, 2), s.fixTo(this.range, 1), this.speed, this.indx, this.layer, this.sid));
                    for (c.length = 0,
                    f = 0; f < e.length + t.length; ++f)
                        !(o = e[f] || t[f - e.length]).alive || o == this.owner || this.owner.team && o.team == this.owner.team || s.lineInRect(o.x - o.scale, o.y - o.scale, o.x + o.scale, o.y + o.scale, this.x, this.y, this.x + u * Math.cos(this.dir), this.y + u * Math.sin(this.dir)) && c.push(o);
                    for (var d = n.getGridArrays(this.x, this.y, this.scale), p = 0; p < d.length; ++p)
                        for (var g = 0; g < d[p].length; ++g)
                            h = (o = d[p][g]).getScale(),
                            o.active && this.ignoreObj != o.sid && this.layer <= o.layer && c.indexOf(o) < 0 && !o.ignoreCollision && s.lineInRect(o.x - h, o.y - h, o.x + h, o.y + h, this.x, this.y, this.x + u * Math.cos(this.dir), this.y + u * Math.sin(this.dir)) && c.push(o);
                    if (c.length > 0) {
                        var m = null
                          , y = null
                          , k = null;
                        for (f = 0; f < c.length; ++f)
                            k = s.getDistance(this.x, this.y, c[f].x, c[f].y),
                            (null == y || k < y) && (y = k,
                            m = c[f]);
                        if (m.isPlayer || m.isAI) {
                            var v = .3 * (m.weightM || 1);
                            m.xVel += v * Math.cos(this.dir),
                            m.yVel += v * Math.sin(this.dir),
                            null != m.weaponIndex && i.weapons[m.weaponIndex].shield && s.getAngleDist(this.dir + Math.PI, m.dir) <= r.shieldAngle || m.changeHealth(-this.dmg, this.owner, this.owner)
                        } else
                            for (m.projDmg && m.health && m.changeHealth(-this.dmg) && n.disableObj(m),
                            f = 0; f < e.length; ++f)
                                e[f].active && (m.sentTo[e[f].id] && (m.active ? e[f].canSee(m) && a.send(e[f].id, "8", s.fixTo(this.dir, 2), m.sid) : a.send(e[f].id, "12", m.sid)),
                                m.active || m.owner != e[f] || e[f].changeItemCount(m.group.id, -1));
                        for (this.active = !1,
                        f = 0; f < e.length; ++f)
                            this.sentTo[e[f].id] && a.send(e[f].id, "19", this.sid, s.fixTo(y, 1))
                    }
                }
            }
        }
    }
}
, function(e, t) {
    e.exports = function(e, t, n, i, r, s, a, o, c) {
        this.addProjectile = function(l, h, u, f, d, p, g, m, y) {
            for (var k, v = s.projectiles[p], w = 0; w < t.length; ++w)
                if (!t[w].active) {
                    k = t[w];
                    break
                }
            return k || ((k = new e(n,i,r,s,a,o,c)).sid = t.length,
            t.push(k)),
            k.init(p, l, h, u, d, v.dmg, f, v.scale, g),
            k.ignoreObj = m,
            k.layer = y || v.layer,
            k.src = v.src,
            k
        }
    }
}
, function(e, t) {
    e.exports.obj = function(e, t) {
        var n;
        this.sounds = [],
        this.active = !0,
        this.play = function(t, i, r) {
            i && this.active && ((n = this.sounds[t]) || (n = new Howl({
                src: ".././sound/" + t + ".mp3"
            }),
            this.sounds[t] = n),
            r && n.isPlaying || (n.isPlaying = !0,
            n.play(),
            n.volume((i || 1) * e.volumeMult),
            n.loop(r)))
        }
        ,
        this.toggleMute = function(e, t) {
            (n = this.sounds[e]) && n.mute(t)
        }
        ,
        this.stop = function(e) {
            (n = this.sounds[e]) && (n.stop(),
            n.isPlaying = !1)
        }
    }
}
, function(e, t, n) {
    var i = n(60)
      , r = n(67);
    function s(e, t, n, i, r) {
        "localhost" == location.hostname && (window.location.hostname = "127.0.0.1"),
        this.debugLog = !1,
        this.baseUrl = e,
        this.lobbySize = n,
        this.devPort = t,
        this.lobbySpread = i,
        this.rawIPs = !!r,
        this.server = void 0,
        this.gameIndex = void 0,
        this.callback = void 0,
        this.errorCallback = void 0,
        this.processServers(vultr.servers)
    }
    s.prototype.regionInfo = {
        0: {
            name: "Local",
            latitude: 0,
            longitude: 0
        },
        "vultr:1": {
            name: "New Jersey",
            latitude: 40.1393329,
            longitude: -75.8521818
        },
        "vultr:2": {
            name: "Chicago",
            latitude: 41.8339037,
            longitude: -87.872238
        },
        "vultr:3": {
            name: "Dallas",
            latitude: 32.8208751,
            longitude: -96.8714229
        },
        "vultr:4": {
            name: "Seattle",
            latitude: 47.6149942,
            longitude: -122.4759879
        },
        "vultr:5": {
            name: "Los Angeles",
            latitude: 34.0207504,
            longitude: -118.691914
        },
        "vultr:6": {
            name: "Atlanta",
            latitude: 33.7676334,
            longitude: -84.5610332
        },
        "vultr:7": {
            name: "Amsterdam",
            latitude: 52.3745287,
            longitude: 4.7581878
        },
        "vultr:8": {
            name: "London",
            latitude: 51.5283063,
            longitude: -.382486
        },
        "vultr:9": {
            name: "Frankfurt",
            latitude: 50.1211273,
            longitude: 8.496137
        },
        "vultr:12": {
            name: "Silicon Valley",
            latitude: 37.4024714,
            longitude: -122.3219752
        },
        "vultr:19": {
            name: "Sydney",
            latitude: -33.8479715,
            longitude: 150.651084
        },
        "vultr:24": {
            name: "Paris",
            latitude: 48.8588376,
            longitude: 2.2773454
        },
        "vultr:25": {
            name: "Tokyo",
            latitude: 35.6732615,
            longitude: 139.569959
        },
        "vultr:39": {
            name: "Miami",
            latitude: 25.7823071,
            longitude: -80.3012156
        },
        "vultr:40": {
            name: "Singapore",
            latitude: 1.3147268,
            longitude: 103.7065876
        }
    },
    s.prototype.start = function(e, t) {
        this.callback = e,
        this.errorCallback = t;
        var n = this.parseServerQuery();
        n ? (this.log("Found server in query."),
        this.password = n[3],
        this.connect(n[0], n[1], n[2])) : (this.log("Pinging servers..."),
        this.pingServers())
    }
    ,
    s.prototype.parseServerQuery = function() {
        var e = i.parse(location.href, !0)
          , t = e.query.server;
        if ("string" == typeof t) {
            var n = t.split(":");
            if (3 == n.length) {
                var r = n[0]
                  , s = parseInt(n[1])
                  , a = parseInt(n[2]);
                return "0" == r || r.startsWith("vultr:") || (r = "vultr:" + r),
                [r, s, a, e.query.password]
            }
            this.errorCallback("Invalid number of server parameters in " + t)
        }
    }
    ,
    s.prototype.findServer = function(e, t) {
        var n = this.servers[e];
        if (Array.isArray(n)) {
            for (var i = 0; i < n.length; i++) {
                var r = n[i];
                if (r.index == t)
                    return r
            }
            console.warn("Could not find server in region " + e + " with index " + t + ".")
        } else
            this.errorCallback("No server list for region " + e)
    }
    ,
    s.prototype.pingServers = function() {
        var e = this
          , t = [];
        for (var n in this.servers)
            if (this.servers.hasOwnProperty(n)) {
                var i = this.servers[n]
                  , r = i[Math.floor(Math.random() * i.length)];
                null != r ? function(i, r) {
                    var s = new XMLHttpRequest;
                    s.onreadystatechange = function(i) {
                        var s = i.target;
                        if (4 == s.readyState)
                            if (200 == s.status) {
                                for (var a = 0; a < t.length; a++)
                                    t[a].abort();
                                e.log("Connecting to region", r.region);
                                var o = e.seekServer(r.region);
                                e.connect(o[0], o[1], o[2])
                            } else
                                console.warn("Error pinging " + r.ip + " in region " + n)
                    }
                    ;
                    var a = "//" + e.serverAddress(r.ip, !0) + ":" + e.serverPort(r) + "/ping";
                    s.open("GET", a, !0),
                    s.send(null),
                    e.log("Pinging", a),
                    t.push(s)
                }(0, r) : console.log("No target server for region " + n)
            }
    }
    ,
    s.prototype.seekServer = function(e, t, n) {
        null == n && (n = "random"),
        null == t && (t = !1);
        const i = ["random"];
        var r = this.lobbySize
          , s = this.lobbySpread
          , a = this.servers[e].flatMap((function(e) {
            var t = 0;
            return e.games.map((function(n) {
                var i = t++;
                return {
                    region: e.region,
                    index: e.index * e.games.length + i,
                    gameIndex: i,
                    gameCount: e.games.length,
                    playerCount: n.playerCount,
                    isPrivate: n.isPrivate
                }
            }
            ))
        }
        )).filter((function(e) {
            return !e.isPrivate
        }
        )).filter((function(e) {
            return !t || 0 == e.playerCount && e.gameIndex >= e.gameCount / 2
        }
        )).filter((function(e) {
            return "random" == n || i[e.index % i.length].key == n
        }
        )).sort((function(e, t) {
            return t.playerCount - e.playerCount
        }
        )).filter((function(e) {
            return e.playerCount < r
        }
        ));
        if (t && a.reverse(),
        0 != a.length) {
            var o = Math.min(s, a.length)
              , c = Math.floor(Math.random() * o)
              , l = a[c = Math.min(c, a.length - 1)]
              , h = l.region
              , u = (c = Math.floor(l.index / l.gameCount),
            l.index % l.gameCount);
            return this.log("Found server."),
            [h, c, u]
        }
        this.errorCallback("No open servers.")
    }
    ,
    s.prototype.connect = function(e, t, n) {
        if (!this.connected) {
            var i = this.findServer(e, t);
            null != i ? (this.log("Connecting to server", i, "with game index", n),
            i.games[n].playerCount >= this.lobbySize ? this.errorCallback("Server is already full.") : (window.history.replaceState(document.title, document.title, this.generateHref(e, t, n, this.password)),
            this.server = i,
            this.gameIndex = n,
            this.log("Calling callback with address", this.serverAddress(i.ip), "on port", this.serverPort(i), "with game index", n),
            this.callback(this.serverAddress(i.ip), this.serverPort(i), n))) : this.errorCallback("Failed to find server for region " + e + " and index " + t)
        }
    }
    ,
    s.prototype.switchServer = function(e, t, n, i) {
        this.switchingServers = !0,
        window.location.href = this.generateHref(e, t, n, i)
    }
    ,
    s.prototype.generateHref = function(e, t, n, i) {
        var r = "/?server=" + (e = this.stripRegion(e)) + ":" + t + ":" + n;
        return i && (r += "&password=" + encodeURIComponent(i)),
        r
    }
    ,
    s.prototype.serverAddress = function(e, t) {
        return "127.0.0.1" == e || "7f000001" == e || "903d62ef5d1c2fecdcaeb5e7dd485eff" == e ? window.location.hostname : this.rawIPs ? t ? "ip_" + this.hashIP(e) + "." + this.baseUrl : e : "ip_" + e + "." + this.baseUrl
    }
    ,
    s.prototype.serverPort = function(e) {
        return 0 == e.region ? this.devPort : location.protocol.startsWith("https") ? 443 : 80
    }
    ,
    s.prototype.processServers = function(e) {
        for (var t = {}, n = 0; n < e.length; n++) {
            var i = e[n]
              , r = t[i.region];
            null == r && (r = [],
            t[i.region] = r),
            r.push(i)
        }
        for (var s in t)
            t[s] = t[s].sort((function(e, t) {
                return e.index - t.index
            }
            ));
        this.servers = t
    }
    ,
    s.prototype.ipToHex = function(e) {
        return e.split(".").map(e=>("00" + parseInt(e).toString(16)).substr(-2)).join("").toLowerCase()
    }
    ,
    s.prototype.hashIP = function(e) {
        return r(this.ipToHex(e))
    }
    ,
    s.prototype.log = function() {
        return this.debugLog ? console.log.apply(void 0, arguments) : console.verbose ? console.verbose.apply(void 0, arguments) : void 0
    }
    ,
    s.prototype.stripRegion = function(e) {
        return e.startsWith("vultr:") ? e = e.slice(6) : e.startsWith("do:") && (e = e.slice(3)),
        e
    }
    ,
    window.testVultrClient = function() {
        var e = 1;
        function t(t, n) {
            (t = "" + t) == (n = "" + n) ? console.log(`Assert ${e} passed.`) : console.warn(`Assert ${e} failed. Expected ${n}, got ${t}.`),
            e++
        }
        var n = new s("test.io",-1,5,1,!1);
        n.errorCallback = function(e) {}
        ,
        n.processServers(function(e) {
            var t = [];
            for (var n in e)
                for (var i = e[n], r = 0; r < i.length; r++)
                    t.push({
                        ip: n + ":" + r,
                        scheme: "testing",
                        region: n,
                        index: r,
                        games: i[r].map(e=>({
                            playerCount: e,
                            isPrivate: !1
                        }))
                    });
            return t
        }({
            1: [[0, 0, 0, 0], [0, 0, 0, 0]],
            2: [[5, 1, 0, 0], [0, 0, 0, 0]],
            3: [[5, 0, 1, 5], [0, 0, 0, 0]],
            4: [[5, 1, 1, 5], [1, 0, 0, 0]],
            5: [[5, 1, 1, 5], [1, 0, 4, 0]],
            6: [[5, 5, 5, 5], [2, 3, 1, 4]],
            7: [[5, 5, 5, 5], [5, 5, 5, 5]]
        })),
        t(n.seekServer(1, !1), [1, 0, 0]),
        t(n.seekServer(1, !0), [1, 1, 3]),
        t(n.seekServer(2, !1), [2, 0, 1]),
        t(n.seekServer(2, !0), [2, 1, 3]),
        t(n.seekServer(3, !1), [3, 0, 2]),
        t(n.seekServer(3, !0), [3, 1, 3]),
        t(n.seekServer(4, !1), [4, 0, 1]),
        t(n.seekServer(4, !0), [4, 1, 3]),
        t(n.seekServer(5, !1), [5, 1, 2]),
        t(n.seekServer(5, !0), [5, 1, 3]),
        t(n.seekServer(6, !1), [6, 1, 3]),
        t(n.seekServer(6, !0), void 0),
        t(n.seekServer(7, !1), void 0),
        t(n.seekServer(7, !0), void 0),
        console.log("Tests passed.")
    }
    ;
    var a = function(e, t) {
        return e.concat(t)
    };
    Array.prototype.flatMap = function(e) {
        return function(e, t) {
            return t.map(e).reduce(a, [])
        }(e, this)
    }
    ,
    e.exports = s
}
, function(e, t, n) {
    "use strict";
    var i = n(61)
      , r = n(63);
    function s() {
        this.protocol = null,
        this.slashes = null,
        this.auth = null,
        this.host = null,
        this.port = null,
        this.hostname = null,
        this.hash = null,
        this.search = null,
        this.query = null,
        this.pathname = null,
        this.path = null,
        this.href = null
    }
    t.parse = v,
    t.resolve = function(e, t) {
        return v(e, !1, !0).resolve(t)
    }
    ,
    t.resolveObject = function(e, t) {
        return e ? v(e, !1, !0).resolveObject(t) : t
    }
    ,
    t.format = function(e) {
        return r.isString(e) && (e = v(e)),
        e instanceof s ? e.format() : s.prototype.format.call(e)
    }
    ,
    t.Url = s;
    var a = /^([a-z0-9.+-]+:)/i
      , o = /:[0-9]*$/
      , c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
      , l = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"])
      , h = ["'"].concat(l)
      , u = ["%", "/", "?", ";", "#"].concat(h)
      , f = ["/", "?", "#"]
      , d = /^[+a-z0-9A-Z_-]{0,63}$/
      , p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
      , g = {
        javascript: !0,
        "javascript:": !0
    }
      , m = {
        javascript: !0,
        "javascript:": !0
    }
      , y = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }
      , k = n(64);
    function v(e, t, n) {
        if (e && r.isObject(e) && e instanceof s)
            return e;
        var i = new s;
        return i.parse(e, t, n),
        i
    }
    s.prototype.parse = function(e, t, n) {
        if (!r.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var s = e.indexOf("?")
          , o = -1 !== s && s < e.indexOf("#") ? "?" : "#"
          , l = e.split(o);
        l[0] = l[0].replace(/\\/g, "/");
        var v = e = l.join(o);
        if (v = v.trim(),
        !n && 1 === e.split("#").length) {
            var w = c.exec(v);
            if (w)
                return this.path = v,
                this.href = v,
                this.pathname = w[1],
                w[2] ? (this.search = w[2],
                this.query = t ? k.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                this.query = {}),
                this
        }
        var b = a.exec(v);
        if (b) {
            var x = (b = b[0]).toLowerCase();
            this.protocol = x,
            v = v.substr(b.length)
        }
        if (n || b || v.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var S = "//" === v.substr(0, 2);
            !S || b && m[b] || (v = v.substr(2),
            this.slashes = !0)
        }
        if (!m[b] && (S || b && !y[b])) {
            for (var T, I, E = -1, M = 0; M < f.length; M++)
                -1 !== (A = v.indexOf(f[M])) && (-1 === E || A < E) && (E = A);
            for (-1 !== (I = -1 === E ? v.lastIndexOf("@") : v.lastIndexOf("@", E)) && (T = v.slice(0, I),
            v = v.slice(I + 1),
            this.auth = decodeURIComponent(T)),
            E = -1,
            M = 0; M < u.length; M++) {
                var A;
                -1 !== (A = v.indexOf(u[M])) && (-1 === E || A < E) && (E = A)
            }
            -1 === E && (E = v.length),
            this.host = v.slice(0, E),
            v = v.slice(E),
            this.parseHost(),
            this.hostname = this.hostname || "";
            var P = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!P)
                for (var B = this.hostname.split(/\./), C = (M = 0,
                B.length); M < C; M++) {
                    var O = B[M];
                    if (O && !O.match(d)) {
                        for (var R = "", j = 0, _ = O.length; j < _; j++)
                            O.charCodeAt(j) > 127 ? R += "x" : R += O[j];
                        if (!R.match(d)) {
                            var U = B.slice(0, M)
                              , D = B.slice(M + 1)
                              , L = O.match(p);
                            L && (U.push(L[1]),
                            D.unshift(L[2])),
                            D.length && (v = "/" + D.join(".") + v),
                            this.hostname = U.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
            P || (this.hostname = i.toASCII(this.hostname));
            var F = this.port ? ":" + this.port : ""
              , z = this.hostname || "";
            this.host = z + F,
            this.href += this.host,
            P && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
            "/" !== v[0] && (v = "/" + v))
        }
        if (!g[x])
            for (M = 0,
            C = h.length; M < C; M++) {
                var H = h[M];
                if (-1 !== v.indexOf(H)) {
                    var V = encodeURIComponent(H);
                    V === H && (V = escape(H)),
                    v = v.split(H).join(V)
                }
            }
        var q = v.indexOf("#");
        -1 !== q && (this.hash = v.substr(q),
        v = v.slice(0, q));
        var Y = v.indexOf("?");
        if (-1 !== Y ? (this.search = v.substr(Y),
        this.query = v.substr(Y + 1),
        t && (this.query = k.parse(this.query)),
        v = v.slice(0, Y)) : t && (this.search = "",
        this.query = {}),
        v && (this.pathname = v),
        y[x] && this.hostname && !this.pathname && (this.pathname = "/"),
        this.pathname || this.search) {
            F = this.pathname || "";
            var W = this.search || "";
            this.path = F + W
        }
        return this.href = this.format(),
        this
    }
    ,
    s.prototype.format = function() {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"),
        e += "@");
        var t = this.protocol || ""
          , n = this.pathname || ""
          , i = this.hash || ""
          , s = !1
          , a = "";
        this.host ? s = e + this.host : this.hostname && (s = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
        this.port && (s += ":" + this.port)),
        this.query && r.isObject(this.query) && Object.keys(this.query).length && (a = k.stringify(this.query));
        var o = this.search || a && "?" + a || "";
        return t && ":" !== t.substr(-1) && (t += ":"),
        this.slashes || (!t || y[t]) && !1 !== s ? (s = "//" + (s || ""),
        n && "/" !== n.charAt(0) && (n = "/" + n)) : s || (s = ""),
        i && "#" !== i.charAt(0) && (i = "#" + i),
        o && "?" !== o.charAt(0) && (o = "?" + o),
        t + s + (n = n.replace(/[?#]/g, (function(e) {
            return encodeURIComponent(e)
        }
        ))) + (o = o.replace("#", "%23")) + i
    }
    ,
    s.prototype.resolve = function(e) {
        return this.resolveObject(v(e, !1, !0)).format()
    }
    ,
    s.prototype.resolveObject = function(e) {
        if (r.isString(e)) {
            var t = new s;
            t.parse(e, !1, !0),
            e = t
        }
        for (var n = new s, i = Object.keys(this), a = 0; a < i.length; a++) {
            var o = i[a];
            n[o] = this[o]
        }
        if (n.hash = e.hash,
        "" === e.href)
            return n.href = n.format(),
            n;
        if (e.slashes && !e.protocol) {
            for (var c = Object.keys(e), l = 0; l < c.length; l++) {
                var h = c[l];
                "protocol" !== h && (n[h] = e[h])
            }
            return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
            n.href = n.format(),
            n
        }
        if (e.protocol && e.protocol !== n.protocol) {
            if (!y[e.protocol]) {
                for (var u = Object.keys(e), f = 0; f < u.length; f++) {
                    var d = u[f];
                    n[d] = e[d]
                }
                return n.href = n.format(),
                n
            }
            if (n.protocol = e.protocol,
            e.host || m[e.protocol])
                n.pathname = e.pathname;
            else {
                for (var p = (e.pathname || "").split("/"); p.length && !(e.host = p.shift()); )
                    ;
                e.host || (e.host = ""),
                e.hostname || (e.hostname = ""),
                "" !== p[0] && p.unshift(""),
                p.length < 2 && p.unshift(""),
                n.pathname = p.join("/")
            }
            if (n.search = e.search,
            n.query = e.query,
            n.host = e.host || "",
            n.auth = e.auth,
            n.hostname = e.hostname || e.host,
            n.port = e.port,
            n.pathname || n.search) {
                var g = n.pathname || ""
                  , k = n.search || "";
                n.path = g + k
            }
            return n.slashes = n.slashes || e.slashes,
            n.href = n.format(),
            n
        }
        var v = n.pathname && "/" === n.pathname.charAt(0)
          , w = e.host || e.pathname && "/" === e.pathname.charAt(0)
          , b = w || v || n.host && e.pathname
          , x = b
          , S = n.pathname && n.pathname.split("/") || []
          , T = (p = e.pathname && e.pathname.split("/") || [],
        n.protocol && !y[n.protocol]);
        if (T && (n.hostname = "",
        n.port = null,
        n.host && ("" === S[0] ? S[0] = n.host : S.unshift(n.host)),
        n.host = "",
        e.protocol && (e.hostname = null,
        e.port = null,
        e.host && ("" === p[0] ? p[0] = e.host : p.unshift(e.host)),
        e.host = null),
        b = b && ("" === p[0] || "" === S[0])),
        w)
            n.host = e.host || "" === e.host ? e.host : n.host,
            n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
            n.search = e.search,
            n.query = e.query,
            S = p;
        else if (p.length)
            S || (S = []),
            S.pop(),
            S = S.concat(p),
            n.search = e.search,
            n.query = e.query;
        else if (!r.isNullOrUndefined(e.search))
            return T && (n.hostname = n.host = S.shift(),
            (P = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = P.shift(),
            n.host = n.hostname = P.shift())),
            n.search = e.search,
            n.query = e.query,
            r.isNull(n.pathname) && r.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            n.href = n.format(),
            n;
        if (!S.length)
            return n.pathname = null,
            n.search ? n.path = "/" + n.search : n.path = null,
            n.href = n.format(),
            n;
        for (var I = S.slice(-1)[0], E = (n.host || e.host || S.length > 1) && ("." === I || ".." === I) || "" === I, M = 0, A = S.length; A >= 0; A--)
            "." === (I = S[A]) ? S.splice(A, 1) : ".." === I ? (S.splice(A, 1),
            M++) : M && (S.splice(A, 1),
            M--);
        if (!b && !x)
            for (; M--; M)
                S.unshift("..");
        !b || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""),
        E && "/" !== S.join("/").substr(-1) && S.push("");
        var P, B = "" === S[0] || S[0] && "/" === S[0].charAt(0);
        return T && (n.hostname = n.host = B ? "" : S.length ? S.shift() : "",
        (P = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = P.shift(),
        n.host = n.hostname = P.shift())),
        (b = b || n.host && S.length) && !B && S.unshift(""),
        S.length ? n.pathname = S.join("/") : (n.pathname = null,
        n.path = null),
        r.isNull(n.pathname) && r.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
        n.auth = e.auth || n.auth,
        n.slashes = n.slashes || e.slashes,
        n.href = n.format(),
        n
    }
    ,
    s.prototype.parseHost = function() {
        var e = this.host
          , t = o.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)),
        e = e.substr(0, e.length - t.length)),
        e && (this.hostname = e)
    }
}
, function(e, t, n) {
    (function(e, i) {
        var r;
        /*! https://mths.be/punycode v1 by @mathias */
        !function(s) {
            t && t.nodeType,
            e && e.nodeType;
            var a = "object" == typeof i && i;
            a.global !== a && a.window !== a && a.self;
            var o, c = 2147483647, l = 36, h = /^xn--/, u = /[^\x20-\x7E]/, f = /[\x2E\u3002\uFF0E\uFF61]/g, d = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, p = Math.floor, g = String.fromCharCode;
            function m(e) {
                throw new RangeError(d[e])
            }
            function y(e, t) {
                for (var n = e.length, i = []; n--; )
                    i[n] = t(e[n]);
                return i
            }
            function k(e, t) {
                var n = e.split("@")
                  , i = "";
                return n.length > 1 && (i = n[0] + "@",
                e = n[1]),
                i + y((e = e.replace(f, ".")).split("."), t).join(".")
            }
            function v(e) {
                for (var t, n, i = [], r = 0, s = e.length; r < s; )
                    (t = e.charCodeAt(r++)) >= 55296 && t <= 56319 && r < s ? 56320 == (64512 & (n = e.charCodeAt(r++))) ? i.push(((1023 & t) << 10) + (1023 & n) + 65536) : (i.push(t),
                    r--) : i.push(t);
                return i
            }
            function w(e) {
                return y(e, (function(e) {
                    var t = "";
                    return e > 65535 && (t += g((e -= 65536) >>> 10 & 1023 | 55296),
                    e = 56320 | 1023 & e),
                    t + g(e)
                }
                )).join("")
            }
            function b(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : l
            }
            function x(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
            }
            function S(e, t, n) {
                var i = 0;
                for (e = n ? p(e / 700) : e >> 1,
                e += p(e / t); e > 455; i += l)
                    e = p(e / 35);
                return p(i + 36 * e / (e + 38))
            }
            function T(e) {
                var t, n, i, r, s, a, o, h, u, f, d = [], g = e.length, y = 0, k = 128, v = 72;
                for ((n = e.lastIndexOf("-")) < 0 && (n = 0),
                i = 0; i < n; ++i)
                    e.charCodeAt(i) >= 128 && m("not-basic"),
                    d.push(e.charCodeAt(i));
                for (r = n > 0 ? n + 1 : 0; r < g; ) {
                    for (s = y,
                    a = 1,
                    o = l; r >= g && m("invalid-input"),
                    ((h = b(e.charCodeAt(r++))) >= l || h > p((c - y) / a)) && m("overflow"),
                    y += h * a,
                    !(h < (u = o <= v ? 1 : o >= v + 26 ? 26 : o - v)); o += l)
                        a > p(c / (f = l - u)) && m("overflow"),
                        a *= f;
                    v = S(y - s, t = d.length + 1, 0 == s),
                    p(y / t) > c - k && m("overflow"),
                    k += p(y / t),
                    y %= t,
                    d.splice(y++, 0, k)
                }
                return w(d)
            }
            function I(e) {
                var t, n, i, r, s, a, o, h, u, f, d, y, k, w, b, T = [];
                for (y = (e = v(e)).length,
                t = 128,
                n = 0,
                s = 72,
                a = 0; a < y; ++a)
                    (d = e[a]) < 128 && T.push(g(d));
                for (i = r = T.length,
                r && T.push("-"); i < y; ) {
                    for (o = c,
                    a = 0; a < y; ++a)
                        (d = e[a]) >= t && d < o && (o = d);
                    for (o - t > p((c - n) / (k = i + 1)) && m("overflow"),
                    n += (o - t) * k,
                    t = o,
                    a = 0; a < y; ++a)
                        if ((d = e[a]) < t && ++n > c && m("overflow"),
                        d == t) {
                            for (h = n,
                            u = l; !(h < (f = u <= s ? 1 : u >= s + 26 ? 26 : u - s)); u += l)
                                b = h - f,
                                w = l - f,
                                T.push(g(x(f + b % w, 0))),
                                h = p(b / w);
                            T.push(g(x(h, 0))),
                            s = S(n, k, i == r),
                            n = 0,
                            ++i
                        }
                    ++n,
                    ++t
                }
                return T.join("")
            }
            o = {
                version: "1.4.1",
                ucs2: {
                    decode: v,
                    encode: w
                },
                decode: T,
                encode: I,
                toASCII: function(e) {
                    return k(e, (function(e) {
                        return u.test(e) ? "xn--" + I(e) : e
                    }
                    ))
                },
                toUnicode: function(e) {
                    return k(e, (function(e) {
                        return h.test(e) ? T(e.slice(4).toLowerCase()) : e
                    }
                    ))
                }
            },
            void 0 === (r = function() {
                return o
            }
            .call(t, n, t, e)) || (e.exports = r)
        }()
    }
    ).call(this, n(62)(e), n(12))
}
, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}
        ,
        e.paths = [],
        e.children || (e.children = []),
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }),
        Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }),
        e.webpackPolyfill = 1),
        e
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = {
        isString: function(e) {
            return "string" == typeof e
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e
        },
        isNull: function(e) {
            return null === e
        },
        isNullOrUndefined: function(e) {
            return null == e
        }
    }
}
, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(65),
    t.encode = t.stringify = n(66)
}
, function(e, t, n) {
    "use strict";
    function i(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, n, s) {
        t = t || "&",
        n = n || "=";
        var a = {};
        if ("string" != typeof e || 0 === e.length)
            return a;
        var o = /\+/g;
        e = e.split(t);
        var c = 1e3;
        s && "number" == typeof s.maxKeys && (c = s.maxKeys);
        var l = e.length;
        c > 0 && l > c && (l = c);
        for (var h = 0; h < l; ++h) {
            var u, f, d, p, g = e[h].replace(o, "%20"), m = g.indexOf(n);
            m >= 0 ? (u = g.substr(0, m),
            f = g.substr(m + 1)) : (u = g,
            f = ""),
            d = decodeURIComponent(u),
            p = decodeURIComponent(f),
            i(a, d) ? r(a[d]) ? a[d].push(p) : a[d] = [a[d], p] : a[d] = p
        }
        return a
    }
    ;
    var r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
}
, function(e, t, n) {
    "use strict";
    var i = function(e) {
        switch (typeof e) {
        case "string":
            return e;
        case "boolean":
            return e ? "true" : "false";
        case "number":
            return isFinite(e) ? e : "";
        default:
            return ""
        }
    };
    e.exports = function(e, t, n, o) {
        return t = t || "&",
        n = n || "=",
        null === e && (e = void 0),
        "object" == typeof e ? s(a(e), (function(a) {
            var o = encodeURIComponent(i(a)) + n;
            return r(e[a]) ? s(e[a], (function(e) {
                return o + encodeURIComponent(i(e))
            }
            )).join(t) : o + encodeURIComponent(i(e[a]))
        }
        )).join(t) : o ? encodeURIComponent(i(o)) + n + encodeURIComponent(i(e)) : ""
    }
    ;
    var r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    ;
    function s(e, t) {
        if (e.map)
            return e.map(t);
        for (var n = [], i = 0; i < e.length; i++)
            n.push(t(e[i], i));
        return n
    }
    var a = Object.keys || function(e) {
        var t = [];
        for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t
    }
}
, function(e, t, n) {
    !function() {
        var t = n(68)
          , i = n(20).utf8
          , r = n(69)
          , s = n(20).bin
          , a = function(e, n) {
            e.constructor == String ? e = n && "binary" === n.encoding ? s.stringToBytes(e) : i.stringToBytes(e) : r(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
            for (var o = t.bytesToWords(e), c = 8 * e.length, l = 1732584193, h = -271733879, u = -1732584194, f = 271733878, d = 0; d < o.length; d++)
                o[d] = 16711935 & (o[d] << 8 | o[d] >>> 24) | 4278255360 & (o[d] << 24 | o[d] >>> 8);
            o[c >>> 5] |= 128 << c % 32,
            o[14 + (c + 64 >>> 9 << 4)] = c;
            var p = a._ff
              , g = a._gg
              , m = a._hh
              , y = a._ii;
            for (d = 0; d < o.length; d += 16) {
                var k = l
                  , v = h
                  , w = u
                  , b = f;
                h = y(h = y(h = y(h = y(h = m(h = m(h = m(h = m(h = g(h = g(h = g(h = g(h = p(h = p(h = p(h = p(h, u = p(u, f = p(f, l = p(l, h, u, f, o[d + 0], 7, -680876936), h, u, o[d + 1], 12, -389564586), l, h, o[d + 2], 17, 606105819), f, l, o[d + 3], 22, -1044525330), u = p(u, f = p(f, l = p(l, h, u, f, o[d + 4], 7, -176418897), h, u, o[d + 5], 12, 1200080426), l, h, o[d + 6], 17, -1473231341), f, l, o[d + 7], 22, -45705983), u = p(u, f = p(f, l = p(l, h, u, f, o[d + 8], 7, 1770035416), h, u, o[d + 9], 12, -1958414417), l, h, o[d + 10], 17, -42063), f, l, o[d + 11], 22, -1990404162), u = p(u, f = p(f, l = p(l, h, u, f, o[d + 12], 7, 1804603682), h, u, o[d + 13], 12, -40341101), l, h, o[d + 14], 17, -1502002290), f, l, o[d + 15], 22, 1236535329), u = g(u, f = g(f, l = g(l, h, u, f, o[d + 1], 5, -165796510), h, u, o[d + 6], 9, -1069501632), l, h, o[d + 11], 14, 643717713), f, l, o[d + 0], 20, -373897302), u = g(u, f = g(f, l = g(l, h, u, f, o[d + 5], 5, -701558691), h, u, o[d + 10], 9, 38016083), l, h, o[d + 15], 14, -660478335), f, l, o[d + 4], 20, -405537848), u = g(u, f = g(f, l = g(l, h, u, f, o[d + 9], 5, 568446438), h, u, o[d + 14], 9, -1019803690), l, h, o[d + 3], 14, -187363961), f, l, o[d + 8], 20, 1163531501), u = g(u, f = g(f, l = g(l, h, u, f, o[d + 13], 5, -1444681467), h, u, o[d + 2], 9, -51403784), l, h, o[d + 7], 14, 1735328473), f, l, o[d + 12], 20, -1926607734), u = m(u, f = m(f, l = m(l, h, u, f, o[d + 5], 4, -378558), h, u, o[d + 8], 11, -2022574463), l, h, o[d + 11], 16, 1839030562), f, l, o[d + 14], 23, -35309556), u = m(u, f = m(f, l = m(l, h, u, f, o[d + 1], 4, -1530992060), h, u, o[d + 4], 11, 1272893353), l, h, o[d + 7], 16, -155497632), f, l, o[d + 10], 23, -1094730640), u = m(u, f = m(f, l = m(l, h, u, f, o[d + 13], 4, 681279174), h, u, o[d + 0], 11, -358537222), l, h, o[d + 3], 16, -722521979), f, l, o[d + 6], 23, 76029189), u = m(u, f = m(f, l = m(l, h, u, f, o[d + 9], 4, -640364487), h, u, o[d + 12], 11, -421815835), l, h, o[d + 15], 16, 530742520), f, l, o[d + 2], 23, -995338651), u = y(u, f = y(f, l = y(l, h, u, f, o[d + 0], 6, -198630844), h, u, o[d + 7], 10, 1126891415), l, h, o[d + 14], 15, -1416354905), f, l, o[d + 5], 21, -57434055), u = y(u, f = y(f, l = y(l, h, u, f, o[d + 12], 6, 1700485571), h, u, o[d + 3], 10, -1894986606), l, h, o[d + 10], 15, -1051523), f, l, o[d + 1], 21, -2054922799), u = y(u, f = y(f, l = y(l, h, u, f, o[d + 8], 6, 1873313359), h, u, o[d + 15], 10, -30611744), l, h, o[d + 6], 15, -1560198380), f, l, o[d + 13], 21, 1309151649), u = y(u, f = y(f, l = y(l, h, u, f, o[d + 4], 6, -145523070), h, u, o[d + 11], 10, -1120210379), l, h, o[d + 2], 15, 718787259), f, l, o[d + 9], 21, -343485551),
                l = l + k >>> 0,
                h = h + v >>> 0,
                u = u + w >>> 0,
                f = f + b >>> 0
            }
            return t.endian([l, h, u, f])
        };
        a._ff = function(e, t, n, i, r, s, a) {
            var o = e + (t & n | ~t & i) + (r >>> 0) + a;
            return (o << s | o >>> 32 - s) + t
        }
        ,
        a._gg = function(e, t, n, i, r, s, a) {
            var o = e + (t & i | n & ~i) + (r >>> 0) + a;
            return (o << s | o >>> 32 - s) + t
        }
        ,
        a._hh = function(e, t, n, i, r, s, a) {
            var o = e + (t ^ n ^ i) + (r >>> 0) + a;
            return (o << s | o >>> 32 - s) + t
        }
        ,
        a._ii = function(e, t, n, i, r, s, a) {
            var o = e + (n ^ (t | ~i)) + (r >>> 0) + a;
            return (o << s | o >>> 32 - s) + t
        }
        ,
        a._blocksize = 16,
        a._digestsize = 16,
        e.exports = function(e, n) {
            if (null == e)
                throw new Error("Illegal argument " + e);
            var i = t.wordsToBytes(a(e, n));
            return n && n.asBytes ? i : n && n.asString ? s.bytesToString(i) : t.bytesToHex(i)
        }
    }()
}
, function(e, t) {
    !function() {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , n = {
            rotl: function(e, t) {
                return e << t | e >>> 32 - t
            },
            rotr: function(e, t) {
                return e << 32 - t | e >>> t
            },
            endian: function(e) {
                if (e.constructor == Number)
                    return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
                for (var t = 0; t < e.length; t++)
                    e[t] = n.endian(e[t]);
                return e
            },
            randomBytes: function(e) {
                for (var t = []; e > 0; e--)
                    t.push(Math.floor(256 * Math.random()));
                return t
            },
            bytesToWords: function(e) {
                for (var t = [], n = 0, i = 0; n < e.length; n++,
                i += 8)
                    t[i >>> 5] |= e[n] << 24 - i % 32;
                return t
            },
            wordsToBytes: function(e) {
                for (var t = [], n = 0; n < 32 * e.length; n += 8)
                    t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
                return t
            },
            bytesToHex: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push((e[n] >>> 4).toString(16)),
                    t.push((15 & e[n]).toString(16));
                return t.join("")
            },
            hexToBytes: function(e) {
                for (var t = [], n = 0; n < e.length; n += 2)
                    t.push(parseInt(e.substr(n, 2), 16));
                return t
            },
            bytesToBase64: function(e) {
                for (var n = [], i = 0; i < e.length; i += 3)
                    for (var r = e[i] << 16 | e[i + 1] << 8 | e[i + 2], s = 0; s < 4; s++)
                        8 * i + 6 * s <= 8 * e.length ? n.push(t.charAt(r >>> 6 * (3 - s) & 63)) : n.push("=");
                return n.join("")
            },
            base64ToBytes: function(e) {
                e = e.replace(/[^A-Z0-9+\/]/gi, "");
                for (var n = [], i = 0, r = 0; i < e.length; r = ++i % 4)
                    0 != r && n.push((t.indexOf(e.charAt(i - 1)) & Math.pow(2, -2 * r + 8) - 1) << 2 * r | t.indexOf(e.charAt(i)) >>> 6 - 2 * r);
                return n
            }
        };
        e.exports = n
    }()
}
, function(e, t) {
    function n(e) {
        return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    }
    /*!
 * Determine if an object is a Buffer
 *
 * @author   RaZoshi <https://feross.org>
 * @license  MIT
 */
    e.exports = function(e) {
        return null != e && (n(e) || function(e) {
            return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
        }(e) || !!e._isBuffer)
    }
}
, function(e, t) {
    e.exports = function(e, t, n, i, r, s, a, o, c) {
        this.aiTypes = [{
            id: 0,
            name: "cow",
            src: "cow_1",
            killScore: 150,
            health: 500,
            weightM: .8,
            speed: 95e-5,
            turnSpeed: .001,
            scale: 72,
            drop: ["food", 50]
        }, {
            id: 1,
            name: "pig",
            src: "pig_1",
            killScore: 200,
            health: 800,
            weightM: .6,
            speed: 85e-5,
            turnSpeed: .001,
            scale: 72,
            drop: ["food", 80]
        }, {
            id: 2,
            name: "Bull",
            src: "bull_2",
            hostile: !0,
            dmg: 20,
            killScore: 1e3,
            health: 1800,
            weightM: .5,
            speed: 94e-5,
            turnSpeed: 74e-5,
            scale: 78,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 100]
        }, {
            id: 3,
            name: "Bully",
            src: "Bull_1",
            hostile: !0,
            dmg: 20,
            killScore: 2e3,
            health: 2800,
            weightM: .45,
            speed: .001,
            turnSpeed: 8e-4,
            scale: 90,
            viewRange: 900,
            chargePlayer: !0,
            drop: ["food", 400]
        }, {
            id: 4,
            name: "Wolf",
            src: "wolf_1",
            hostile: !0,
            dmg: 8,
            killScore: 500,
            health: 300,
            weightM: .45,
            speed: .001,
            turnSpeed: .002,
            scale: 84,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 200]
        }, {
            id: 5,
            name: "Quack",
            src: "duck",
            dmg: 8,
            killScore: 2e3,
            noTrap: !0,
            health: 300,
            weightM: .2,
            speed: .0018,
            turnSpeed: .006,
            scale: 70,
            drop: ["food", 100]
        }, {
            id: 6,
            name: "MOOSTAFE",
            nameScale: 50,
            src: "enemy",
            hostile: !0,
            dontRun: !0,
            fixedSpawn: !0,
            spawnDelay: 6e4,
            noTrap: !0,
            colDmg: 100,
            dmg: 40,
            killScore: 8e3,
            health: 18e3,
            weightM: .4,
            speed: 7e-4,
            turnSpeed: .01,
            scale: 80,
            spriteMlt: 1.8,
            leapForce: .9,
            viewRange: 1e3,
            hitRange: 210,
            hitDelay: 1e3,
            chargePlayer: !0,
            drop: ["food", 100]
        }, {
            id: 7,
            name: "Treasure",
            hostile: !0,
            nameScale: 35,
            src: "crate_1",
            fixedSpawn: !0,
            spawnDelay: 12e4,
            colDmg: 200,
            killScore: 5e3,
            health: 2e4,
            weightM: .1,
            speed: 0,
            turnSpeed: 0,
            scale: 70,
            spriteMlt: 1
        }, {
            id: 8,
            name: "MOOFIE",
            src: "wolf_2",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 4,
            spawnDelay: 3e4,
            noTrap: !0,
            nameScale: 45,
            dmg: 10,
            colDmg: 100,
            killScore: 3e3,
            health: 7e3,
            weightM: .45,
            speed: .0015,
            turnSpeed: .002,
            scale: 90,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 1e3]
        }],
        this.spawn = function(l, h, u, f) {
            for (var d, p = 0; p < e.length; ++p)
                if (!e[p].active) {
                    d = e[p];
                    break
                }
            return d || (d = new t(e.length,r,n,i,a,s,o,c),
            e.push(d)),
            d.init(l, h, u, f, this.aiTypes[f]),
            d
        }
    }
}
, function(e, t) {
    var n = 2 * Math.PI;
    e.exports = function(e, t, i, r, s, a, o, c) {
        this.sid = e,
        this.isAI = !0,
        this.nameIndex = s.randInt(0, a.cowNames.length - 1),
        this.init = function(e, t, n, i, r) {
            this.x = e,
            this.y = t,
            this.startX = r.fixedSpawn ? e : null,
            this.startY = r.fixedSpawn ? t : null,
            this.xVel = 0,
            this.yVel = 0,
            this.zIndex = 0,
            this.dir = n,
            this.dirPlus = 0,
            this.index = i,
            this.src = r.src,
            r.name && (this.name = r.name),
            this.weightM = r.weightM,
            this.speed = r.speed,
            this.killScore = r.killScore,
            this.turnSpeed = r.turnSpeed,
            this.scale = r.scale,
            this.maxHealth = r.health,
            this.leapForce = r.leapForce,
            this.health = this.maxHealth,
            this.chargePlayer = r.chargePlayer,
            this.viewRange = r.viewRange,
            this.drop = r.drop,
            this.dmg = r.dmg,
            this.hostile = r.hostile,
            this.dontRun = r.dontRun,
            this.hitRange = r.hitRange,
            this.hitDelay = r.hitDelay,
            this.hitScare = r.hitScare,
            this.spriteMlt = r.spriteMlt,
            this.nameScale = r.nameScale,
            this.colDmg = r.colDmg,
            this.noTrap = r.noTrap,
            this.spawnDelay = r.spawnDelay,
            this.hitWait = 0,
            this.waitCount = 1e3,
            this.moveCount = 0,
            this.targetDir = 0,
            this.active = !0,
            this.alive = !0,
            this.runFrom = null,
            this.chargeTarget = null,
            this.dmgOverTime = {}
        }
        ;
        var l = 0;
        this.update = function(e) {
            if (this.active) {
                if (this.spawnCounter)
                    return this.spawnCounter -= e,
                    void (this.spawnCounter <= 0 && (this.spawnCounter = 0,
                    this.x = this.startX || s.randInt(0, a.mapScale),
                    this.y = this.startY || s.randInt(0, a.mapScale)));
                (l -= e) <= 0 && (this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer),
                this.dmgOverTime.time -= 1,
                this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)),
                l = 1e3);
                var r = !1
                  , o = 1;
                if (!this.zIndex && !this.lockMove && this.y >= a.mapScale / 2 - a.riverWidth / 2 && this.y <= a.mapScale / 2 + a.riverWidth / 2 && (o = .33,
                this.xVel += a.waterCurrent * e),
                this.lockMove)
                    this.xVel = 0,
                    this.yVel = 0;
                else if (this.waitCount > 0) {
                    if (this.waitCount -= e,
                    this.waitCount <= 0)
                        if (this.chargePlayer) {
                            for (var h, u, f, d = 0; d < i.length; ++d)
                                !i[d].alive || i[d].skin && i[d].skin.bullRepel || (f = s.getDistance(this.x, this.y, i[d].x, i[d].y)) <= this.viewRange && (!h || f < u) && (u = f,
                                h = i[d]);
                            h ? (this.chargeTarget = h,
                            this.moveCount = s.randInt(8e3, 12e3)) : (this.moveCount = s.randInt(1e3, 2e3),
                            this.targetDir = s.randFloat(-Math.PI, Math.PI))
                        } else
                            this.moveCount = s.randInt(4e3, 1e4),
                            this.targetDir = s.randFloat(-Math.PI, Math.PI)
                } else if (this.moveCount > 0) {
                    var p = this.speed * o;
                    if (this.runFrom && this.runFrom.active && (!this.runFrom.isPlayer || this.runFrom.alive) ? (this.targetDir = s.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y),
                    p *= 1.42) : this.chargeTarget && this.chargeTarget.alive && (this.targetDir = s.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y),
                    p *= 1.75,
                    r = !0),
                    this.hitWait && (p *= .3),
                    this.dir != this.targetDir) {
                        this.dir %= n;
                        var g = (this.dir - this.targetDir + n) % n
                          , m = Math.min(Math.abs(g - n), g, this.turnSpeed * e)
                          , y = g - Math.PI >= 0 ? 1 : -1;
                        this.dir += y * m + n
                    }
                    this.dir %= n,
                    this.xVel += p * e * Math.cos(this.dir),
                    this.yVel += p * e * Math.sin(this.dir),
                    this.moveCount -= e,
                    this.moveCount <= 0 && (this.runFrom = null,
                    this.chargeTarget = null,
                    this.waitCount = this.hostile ? 1500 : s.randInt(1500, 6e3))
                }
                this.zIndex = 0,
                this.lockMove = !1;
                var k = s.getDistance(0, 0, this.xVel * e, this.yVel * e)
                  , v = Math.min(4, Math.max(1, Math.round(k / 40)))
                  , w = 1 / v;
                for (d = 0; d < v; ++d) {
                    this.xVel && (this.x += this.xVel * e * w),
                    this.yVel && (this.y += this.yVel * e * w),
                    M = t.getGridArrays(this.x, this.y, this.scale);
                    for (var b = 0; b < M.length; ++b)
                        for (var x = 0; x < M[b].length; ++x)
                            M[b][x].active && t.checkCollision(this, M[b][x], w)
                }
                var S, T, I, E = !1;
                if (this.hitWait > 0 && (this.hitWait -= e,
                this.hitWait <= 0)) {
                    E = !0,
                    this.hitWait = 0,
                    this.leapForce && !s.randInt(0, 2) && (this.xVel += this.leapForce * Math.cos(this.dir),
                    this.yVel += this.leapForce * Math.sin(this.dir));
                    for (var M = t.getGridArrays(this.x, this.y, this.hitRange), A = 0; A < M.length; ++A)
                        for (b = 0; b < M[A].length; ++b)
                            (S = M[A][b]).health && (T = s.getDistance(this.x, this.y, S.x, S.y)) < S.scale + this.hitRange && (S.changeHealth(5 * -this.dmg) && t.disableObj(S),
                            t.hitObj(S, s.getDirection(this.x, this.y, S.x, S.y)));
                    for (b = 0; b < i.length; ++b)
                        i[b].canSee(this) && c.send(i[b].id, "aa", this.sid)
                }
                if (r || E)
                    for (d = 0; d < i.length; ++d)
                        (S = i[d]) && S.alive && (T = s.getDistance(this.x, this.y, S.x, S.y),
                        this.hitRange ? !this.hitWait && T <= this.hitRange + S.scale && (E ? (I = s.getDirection(S.x, S.y, this.x, this.y),
                        S.changeHealth(-this.dmg),
                        S.xVel += .6 * Math.cos(I),
                        S.yVel += .6 * Math.sin(I),
                        this.runFrom = null,
                        this.chargeTarget = null,
                        this.waitCount = 3e3,
                        this.hitWait = s.randInt(0, 2) ? 0 : 600) : this.hitWait = this.hitDelay) : T <= this.scale + S.scale && (I = s.getDirection(S.x, S.y, this.x, this.y),
                        S.changeHealth(-this.dmg),
                        S.xVel += .55 * Math.cos(I),
                        S.yVel += .55 * Math.sin(I)));
                this.xVel && (this.xVel *= Math.pow(a.playerDecel, e)),
                this.yVel && (this.yVel *= Math.pow(a.playerDecel, e));
                var P = this.scale;
                this.x - P < 0 ? (this.x = P,
                this.xVel = 0) : this.x + P > a.mapScale && (this.x = a.mapScale - P,
                this.xVel = 0),
                this.y - P < 0 ? (this.y = P,
                this.yVel = 0) : this.y + P > a.mapScale && (this.y = a.mapScale - P,
                this.yVel = 0)
            }
        }
        ,
        this.canSee = function(e) {
            if (!e)
                return !1;
            if (e.skin && e.skin.invisTimer && e.noMovTimer >= e.skin.invisTimer)
                return !1;
            var t = Math.abs(e.x - this.x) - e.scale
              , n = Math.abs(e.y - this.y) - e.scale;
            return t <= a.maxScreenWidth / 2 * 1.3 && n <= a.maxScreenHeight / 2 * 1.3
        }
        ;
        var h = 0
          , u = 0;
        this.animate = function(e) {
            this.animTime > 0 && (this.animTime -= e,
            this.animTime <= 0 ? (this.animTime = 0,
            this.dirPlus = 0,
            h = 0,
            u = 0) : 0 == u ? (h += e / (this.animSpeed * a.hitReturnRatio),
            this.dirPlus = s.lerp(0, this.targetAngle, Math.min(1, h)),
            h >= 1 && (h = 1,
            u = 1)) : (h -= e / (this.animSpeed * (1 - a.hitReturnRatio)),
            this.dirPlus = s.lerp(0, this.targetAngle, Math.max(0, h))))
        }
        ,
        this.startAnim = function() {
            this.animTime = this.animSpeed = 600,
            this.targetAngle = .8 * Math.PI,
            h = 0,
            u = 0
        }
        ,
        this.changeHealth = function(e, t, n) {
            if (this.active && (this.health += e,
            n && (this.hitScare && !s.randInt(0, this.hitScare) ? (this.runFrom = n,
            this.waitCount = 0,
            this.moveCount = 2e3) : this.hostile && this.chargePlayer && n.isPlayer ? (this.chargeTarget = n,
            this.waitCount = 0,
            this.moveCount = 8e3) : this.dontRun || (this.runFrom = n,
            this.waitCount = 0,
            this.moveCount = 2e3)),
            e < 0 && this.hitRange && s.randInt(0, 1) && (this.hitWait = 500),
            t && t.canSee(this) && e < 0 && c.send(t.id, "t", Math.round(this.x), Math.round(this.y), Math.round(-e), 1),
            this.health <= 0 && (this.spawnDelay ? (this.spawnCounter = this.spawnDelay,
            this.x = -1e6,
            this.y = -1e6) : (this.x = this.startX || s.randInt(0, a.mapScale),
            this.y = this.startY || s.randInt(0, a.mapScale)),
            this.health = this.maxHealth,
            this.runFrom = null,
            t && (o(t, this.killScore),
            this.drop))))
                for (var i = 0; i < this.drop.length; )
                    t.addResource(a.resourceTypes.indexOf(this.drop[i]), this.drop[i + 1]),
                    i += 2
        }
    }
 const stycross = [
    "Default (Cursor)","Default (Crosshair)",
];

var stylerSelect = document.createElement("select");
stylerSelect.style.backgroundColor = "white";
stylerSelect.style.color = "red";
stylerSelect.id = "cursor-game";
stylerSelect.style.marginBottom = "0px";
for (var mn = 0; mn < stycross.length; mn++) {
    var optioner = document.createElement("option");
    optioner.text = stycross[mn];
    if(stycross[mn] == "Default (Cursor)") { optioner.value="auto"; }
    if(stycross[mn] == "Default (Crosshair)") { optioner.value="url('http://cur.cursors-4u.net/user/use-1/use153.cur'), auto"; }
    stylerSelect.add(optioner);
}

document.getElementById("setupCard").appendChild(stylerSelect);

stylerSelect.onchange = function() {

    document.body.style.cursor = document.getElementById('cursor-game').options[document.getElementById('cursor-game').selectedIndex].value;
}
}
]);

//Heal
var _0xfd30c1=_0x2943;(function(_0x317ab2,_0x37d994){var _0x1433ff=_0x2943,_0x521fd7=_0x317ab2();while(!![]){try{var _0x3b878f=-parseInt(_0x1433ff(0x573))/0x1+-parseInt(_0x1433ff(0x33c))/0x2*(parseInt(_0x1433ff(0x468))/0x3)+parseInt(_0x1433ff(0x198))/0x4*(parseInt(_0x1433ff(0x357))/0x5)+parseInt(_0x1433ff(0x1f8))/0x6*(-parseInt(_0x1433ff(0x3b1))/0x7)+parseInt(_0x1433ff(0x979))/0x8+parseInt(_0x1433ff(0x429))/0x9+-parseInt(_0x1433ff(0x1db))/0xa*(-parseInt(_0x1433ff(0x8cb))/0xb);if(_0x3b878f===_0x37d994)break;else _0x521fd7['push'](_0x521fd7['shift']());}catch(_0x587a73){_0x521fd7['push'](_0x521fd7['shift']());}}}(_0x5a92,0xc6863),$(_0xfd30c1(0x877))['append'](_0xfd30c1(0x367)));var አህሳ='ክር',ትከፍታለህ=[0x0];for(let ታ=0x0;ታ<0x3;ታ++){let አስድሳዳስ=_0xfd30c1(0x392);ትከፍታለህ[_0xfd30c1(0x333)][አስድሳዳስ];}function _0x2943(_0x580984,_0x23c3c9){var _0x5a9213=_0x5a92();return _0x2943=function(_0x294344,_0x4c87aa){_0x294344=_0x294344-0xd9;var _0x4963e8=_0x5a9213[_0x294344];return _0x4963e8;},_0x2943(_0x580984,_0x23c3c9);}let InbundleMyPlayer;setInterval(()=>{var _0x1427dc=_0xfd30c1;function _0x4acc6c(_0x22871){var _0x55bd11=_0x2943;return null!==_0x22871[_0x55bd11(0x3de)];}var _0x1309d4=0x3;try{if(_0x4acc6c(document[_0x1427dc(0x838)]('actionBarItem26'))){let _0xc3602;(_0xc3602=document[_0x1427dc(0x9a5)](_0x1427dc(0x3d6)))['id']='windmillCounts26',_0xc3602['style'][_0x1427dc(0xe3)]=_0x1427dc(0x29d),document[_0x1427dc(0x838)](_0x1427dc(0x1cb))||document['getElementById'](_0x1427dc(0x719))['appendChild'](_0xc3602),document[_0x1427dc(0x838)](_0x1427dc(0x1cb))['innerHTML']=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x3fe75f){}try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x17b)))){let _0x40a19f;(_0x40a19f=document[_0x1427dc(0x9a5)](_0x1427dc(0x3d6)))['id']='windmillCounts27',_0x40a19f[_0x1427dc(0x29c)]['cssText']=_0x1427dc(0x29d),document[_0x1427dc(0x838)](_0x1427dc(0x623))||document['getElementById'](_0x1427dc(0x17b))[_0x1427dc(0x8bf)](_0x40a19f),document[_0x1427dc(0x838)](_0x1427dc(0x623))[_0x1427dc(0x426)]=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x6c58fa){}try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x244)))){let _0x2d632d;(_0x2d632d=document[_0x1427dc(0x9a5)]('div'))['id']=_0x1427dc(0x815),_0x2d632d[_0x1427dc(0x29c)]['cssText']=_0x1427dc(0x212),document[_0x1427dc(0x838)](_0x1427dc(0x815))||document[_0x1427dc(0x838)](_0x1427dc(0x244))[_0x1427dc(0x8bf)](_0x2d632d),document[_0x1427dc(0x838)](_0x1427dc(0x815))['innerHTML']=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x227301){}_0x1309d4=0x6;try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x7ea)))){let _0x4c6f13;(_0x4c6f13=document['createElement'](_0x1427dc(0x3d6)))['id']=_0x1427dc(0x239),_0x4c6f13[_0x1427dc(0x29c)][_0x1427dc(0xe3)]=_0x1427dc(0x706),document['getElementById'](_0x1427dc(0x239))||document[_0x1427dc(0x838)]('actionBarItem32')[_0x1427dc(0x8bf)](_0x4c6f13),document[_0x1427dc(0x838)](_0x1427dc(0x239))['innerHTML']=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x5bc07e){}_0x1309d4=0x5;try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x7e7)))){let _0x4e34be;(_0x4e34be=document['createElement'](_0x1427dc(0x3d6)))['id']='trapCounts31',_0x4e34be['style']['cssText']=_0x1427dc(0x687),document[_0x1427dc(0x838)](_0x1427dc(0x2ad))||document['getElementById'](_0x1427dc(0x7e7))['appendChild'](_0x4e34be),document[_0x1427dc(0x838)](_0x1427dc(0x2ad))[_0x1427dc(0x426)]=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x4511d6){}_0x1309d4=0x2;for(var _0x360925=0x0;_0x360925<0x4;_0x360925++)try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x895)+(0x16+_0x360925)))){let _0x21e272;(_0x21e272=document[_0x1427dc(0x9a5)](_0x1427dc(0x3d6)))['id']=_0x1427dc(0x6e2)+(0x16+_0x360925),_0x21e272[_0x1427dc(0x29c)][_0x1427dc(0xe3)]=_0x1427dc(0x687),document[_0x1427dc(0x838)](_0x1427dc(0x6e2)+(0x16+_0x360925))||document[_0x1427dc(0x838)](_0x1427dc(0x895)+(0x16+_0x360925))[_0x1427dc(0x8bf)](_0x21e272),document[_0x1427dc(0x838)](_0x1427dc(0x6e2)+(0x16+_0x360925))['innerHTML']=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x166016){}try{if(_0x4acc6c(document[_0x1427dc(0x838)](_0x1427dc(0x895)+(0x16+_0x360925)))){let _0x3b523d;(_0x3b523d=document['createElement'](_0x1427dc(0x3d6)))['id']='cookieCounts17',_0x3b523d[_0x1427dc(0x29c)][_0x1427dc(0xe3)]=_0x1427dc(0x687),document[_0x1427dc(0x838)](_0x1427dc(0x2bb))||document['getElementById']('actionBarItem17')[_0x1427dc(0x8bf)](_0x3b523d),document[_0x1427dc(0x838)](_0x1427dc(0x2bb))[_0x1427dc(0x426)]=Math[_0x1427dc(0x7ee)](Number(document[_0x1427dc(0x838)](_0x1427dc(0x29e))[_0x1427dc(0x426)])/0xf);}}catch(_0x386ff1){}try{if(_0x4acc6c(document['getElementById']('actionBarItem'+(0x16+_0x360925)))){let _0x186c68;(_0x186c68=document[_0x1427dc(0x9a5)](_0x1427dc(0x3d6)))['id']=_0x1427dc(0x3e8),_0x186c68[_0x1427dc(0x29c)]['cssText']=_0x1427dc(0x687),document[_0x1427dc(0x838)](_0x1427dc(0x3e8))||document['getElementById'](_0x1427dc(0x698))[_0x1427dc(0x8bf)](_0x186c68),document[_0x1427dc(0x838)]('appleCounts16')[_0x1427dc(0x426)]=Math[_0x1427dc(0x7ee)](Number(document[_0x1427dc(0x838)](_0x1427dc(0x29e))[_0x1427dc(0x426)])/0xa);}}catch(_0x5310a9){}_0x1309d4=0x7;try{if(_0x4acc6c(document[_0x1427dc(0x838)]('actionBarItem33'))){let _0x55db62;(_0x55db62=document[_0x1427dc(0x9a5)]('div'))['id']=_0x1427dc(0x2af),_0x55db62[_0x1427dc(0x29c)][_0x1427dc(0xe3)]=_0x1427dc(0x687),document[_0x1427dc(0x838)](_0x1427dc(0x2af))||document[_0x1427dc(0x838)](_0x1427dc(0x1ad))['appendChild'](_0x55db62),document['getElementById']('turretCounts33')['innerHTML']=InbundleMyPlayer['itemCounts'][_0x1309d4]||0x0;}}catch(_0x5587ec){}_0x1309d4=0x1;for(_0x360925=0x0;_0x360925<0x3;_0x360925++)try{if(_0x4acc6c(document['getElementById'](_0x1427dc(0x895)+(0x13+_0x360925)))){let _0x4bd285;(_0x4bd285=document[_0x1427dc(0x9a5)](_0x1427dc(0x3d6)))['id']=_0x1427dc(0x3ab)+(0x13+_0x360925),_0x4bd285[_0x1427dc(0x29c)][_0x1427dc(0xe3)]=_0x1427dc(0x29d),document['getElementById'](_0x1427dc(0x3ab)+(0x13+_0x360925))||document[_0x1427dc(0x838)](_0x1427dc(0x895)+(0x13+_0x360925))[_0x1427dc(0x8bf)](_0x4bd285),document[_0x1427dc(0x838)]('wallCounts'+(0x13+_0x360925))[_0x1427dc(0x426)]=InbundleMyPlayer[_0x1427dc(0x538)][_0x1309d4]||0x0;}}catch(_0x2c687f){}},0x64),window[_0xfd30c1(0x8b3)]=0x1;var scriptData={'name':GM_info[_0xfd30c1(0x6f9)][_0xfd30c1(0x2f1)],'author':GM_info['script'][_0xfd30c1(0x3c2)],'description':GM_info[_0xfd30c1(0x6f9)]['description'],'version':GM_info[_0xfd30c1(0x6f9)]['version']};window[_0xfd30c1(0x6d3)]=0x0;var hatts,accessoriees;let bot=0xa,webskt,isConnected=![],myConfig={'x':0x0,'y':0x0,'clan':void 0x0,'dir':0x0,'safeDir':0x0,'nearDist':void 0x0,'nearAim':0x0,'sync':![],'buy':![],'doChat':_0xfd30c1(0x90c)},botConfig={'waitHeal':![],'botJoin':![],'stop':![],'atck':![],'nearDst':0x115c};WebSocket['prototype'][_0xfd30c1(0x2c5)]=WebSocket[_0xfd30c1(0x59d)][_0xfd30c1(0x1a6)],WebSocket[_0xfd30c1(0x59d)]['send']=function(_0x455e74){var _0x3f70e3=_0xfd30c1;webskt||(webskt=this),this[_0x3f70e3(0x2c5)](_0x455e74);};let randomcowname=[_0xfd30c1(0x34e),_0xfd30c1(0x6e0),_0xfd30c1(0x6e0),_0xfd30c1(0x34e)];function bConnect(_0x1d76a8,_0x2e00d1,_0x5c3ab7){var _0x5d172e=_0xfd30c1;let _0x258373=new WebSocket(webskt[_0x5d172e(0x2f6)]['split']('&')[0x0]+_0x5d172e(0x792)+encodeURIComponent(_0x1d76a8));_0x258373[_0x5d172e(0x99a)]=_0x5d172e(0x363),_0x258373[_0x5d172e(0x931)]=_0x2e00d1,_0x258373[_0x5d172e(0x92a)]=[0x0],_0x258373[_0x5d172e(0x801)]=[0x0,0x3,0x6,0xa],_0x258373['waitHeal']=![],_0x258373['testTickCount']=0x0,_0x258373[_0x5d172e(0x280)]=undefined,_0x258373[_0x5d172e(0x69f)]=![],_0x258373[_0x5d172e(0x1e9)]=0x0,_0x258373[_0x5d172e(0x4dd)]=0x0,_0x258373[_0x5d172e(0x30a)]=0x0,_0x258373[_0x5d172e(0x62d)]=!![],_0x258373['uplist']={'one':!![],'two':!![],'three':!![],'four':!![],'five':!![],'six':!![],'seven':!![],'eight':!![]},_0x258373['trapData']={'sid':void 0x0,'x':void 0x0,'y':void 0x0},_0x258373[_0x5d172e(0x4ca)]={'x':0x0,'y':0x0},_0x258373[_0x5d172e(0x4c7)]={'x':0x0,'y':0x0},_0x258373[_0x5d172e(0x5eb)]=[0x0],_0x258373[_0x5d172e(0x32e)]=[0x0],_0x258373[_0x5d172e(0x440)]=0x0,_0x258373[_0x5d172e(0x23d)]=0x0,_0x258373[_0x5d172e(0x3c8)]=!![],_0x258373['score']=0x0;let _0x487a03=0x960,_0x299ac1=0x2d4,_0x34d760=0x3840,_0x1efe06=Math[_0x5d172e(0x7ee)](Math[_0x5d172e(0x459)]()*0xa),_0x5a5704=_0x1efe06==0xa?_0x5d172e(0x700):Math[_0x5d172e(0x7ee)](Math[_0x5d172e(0x459)]()*0xa);function _0x34c342(_0x139d51){var _0x1e507b=_0x5d172e;_0x258373[_0x1e507b(0x1a6)](new Uint8Array(Array[_0x1e507b(0x6db)](window['msgpack'][_0x1e507b(0x11e)](_0x139d51))));}function _0xf6791d(_0x56d81e,_0x1b7499){var _0x191b95=_0x5d172e;_0x258373[_0x191b95(0x4ae)]?(_0x34c342(['5',[_0x258373[_0x191b95(0x801)][_0x56d81e]]]),_0x34c342(['c',[0x1,_0x1b7499]]),_0x34c342(['c',[0x0,_0x1b7499]]),_0x34c342(['5',[_0x258373['weapon'],0x1]])):(_0x34c342(['5',[_0x258373[_0x191b95(0x801)][_0x56d81e]]]),_0x34c342(['c',[0x1,_0x1b7499]]),_0x34c342(['c',[0x0,_0x1b7499]]),_0x34c342(['5',[_0x258373[_0x191b95(0x508)],0x1]]));}function _0x3952fc(_0x26d1f8){return _0x26d1f8*(Math['PI']/0xb4);}function _0x106c6b(_0xa287e6,_0x4235cd){var _0xbd92f6=_0x5d172e;return Math[_0xbd92f6(0x634)](_0xa287e6['y']-_0x4235cd['y'],_0xa287e6['x']-_0x4235cd['x']);}function _0x302478(_0x541ef1,_0x4916a3){return Math['atan2'](_0x541ef1[0x2]-_0x4916a3['y'],_0x541ef1[0x1]-_0x4916a3['x']);}function _0x9e3c1d(_0x2d883b,_0x957b04){var _0xafbcec=_0x5d172e;return Math[_0xafbcec(0x90e)](_0x2d883b['y']-_0x957b04['y'],_0x2d883b['x']-_0x957b04['x']);}function _0x24da8a(_0x2a49f7,_0x4606ea){var _0x2fe2ca=_0x5d172e;return Math[_0x2fe2ca(0x90e)](_0x2a49f7[0x2]-_0x4606ea['y'],_0x2a49f7[0x1]-_0x4606ea['x']);}function _0x4e1282(_0x54ce0d,_0x5dc5fd){var _0x1c77db=_0x5d172e;_0x34c342([_0x1c77db(0x3d1),[0x0,_0x54ce0d,_0x5dc5fd]]);}function _0x117db4(_0x5e8864,_0x545105){_0x34c342(['13c',[0x1,_0x5e8864,_0x545105]]);}function _0x5f4f0f(_0x192536,_0x2f4fc7){var _0x38e88a=_0x5d172e;if(!_0x258373['skins'][_0x192536]&&_0x2f4fc7==0x0)_0x117db4(_0x192536,0x0);else!_0x258373[_0x38e88a(0x32e)][_0x192536]&&_0x2f4fc7==0x1&&_0x117db4(_0x192536,0x1);if(_0x258373['skins'][_0x192536]&&_0x2f4fc7==0x0)_0x258373[_0x38e88a(0x462)]!=_0x192536&&_0x4e1282(_0x192536,0x0);else _0x258373[_0x38e88a(0x32e)][_0x192536]&&_0x2f4fc7==0x1&&(_0x258373[_0x38e88a(0x897)]!=_0x192536&&_0x4e1282(_0x192536,0x1));}function _0x24661d(_0x1f473c,_0x5b3397){var _0x271ce6=_0x5d172e;if(_0x5b3397==0x0){if(_0x258373['skins'][_0x1f473c])_0x258373[_0x271ce6(0x462)]!=_0x1f473c&&_0x4e1282(_0x1f473c,0x0);else{if(_0x1f473c==0x28&&_0x258373['score']>=0x3a98)_0x117db4(_0x1f473c,0x0);else{if(_0x1f473c==0x35&&_0x258373[_0x271ce6(0x1d0)]>=0x2710)_0x117db4(_0x1f473c,0x0);else{if(_0x1f473c==0xc&&_0x258373[_0x271ce6(0x1d0)]>=0x1770)_0x117db4(_0x1f473c,0x0);else{if(_0x1f473c==0x6&&_0x258373[_0x271ce6(0x1d0)]>=0xfa0)_0x117db4(_0x1f473c,0x0);else{if(_0x1f473c==0x1f&&_0x258373[_0x271ce6(0x1d0)]>=0x9c4)_0x117db4(_0x1f473c,0x0);else _0x1f473c==0xf&&_0x258373[_0x271ce6(0x1d0)]>=0x258&&_0x117db4(_0x1f473c,0x0);}}}}}}else _0x5b3397==0x1&&(_0x258373[_0x271ce6(0x32e)][_0x1f473c]?_0x258373['accessory']!=_0x1f473c&&_0x4e1282(_0x1f473c,0x1):_0x1f473c==0xb&&_0x258373['score']>=0x7d0&&_0x117db4(_0x1f473c,0x1));}function _0x4a816a(_0x102fba,_0x26762e){var _0x16e987=_0x5d172e;if(_0x26762e==0x0)!_0x258373[_0x16e987(0x5eb)][_0x102fba]&&_0x117db4(_0x102fba,0x0);else _0x26762e==0x1&&(!_0x258373[_0x16e987(0x32e)][_0x102fba]&&_0x117db4(_0x102fba,0x0));}function _0x5129d1(){var _0x5958f6=_0x5d172e;if(_0x258373['y']<=_0x487a03)_0x24661d(0xf,0x0);else _0x258373['y']>=_0x34d760/0x2-_0x299ac1/0x2&&_0x258373['y']<=_0x34d760/0x2+_0x299ac1/0x2?_0x24661d(0x1f,0x0):myConfig['nearDist']&&botConfig[_0x5958f6(0x6f0)](_0x258373)<=0x12c?_0x24661d(0x6,0x0):_0x24661d(0xc,0x0);_0x24661d(0xb,0x1);}function _0x266eb1(){var _0x4a4722=_0x5d172e;_0x258373[_0x4a4722(0x801)]=[0x0,0x3,0x6,0xa],_0x258373['weapons']=[0x0],_0x258373[_0x4a4722(0x9ae)]=0x0,_0x258373[_0x4a4722(0x868)]=0x0,_0x258373['score']=0x0,_0x34c342(['sp',[{'name':randomcowname[Math['floor'](Math['random']()*randomcowname[_0x4a4722(0x404)])],'moofoll':0x1,'skin':_0x5a5704}]]);}function _0x1910da(_0x44e8be){_0x34c342(['6',[_0x44e8be]]);}_0x258373[_0x5d172e(0x990)]=function(_0x47404f){var _0x42fd23=_0x5d172e;let _0x49d2f9=window[_0x42fd23(0x557)][_0x42fd23(0x566)](new Uint8Array(_0x47404f['data'])),_0x44e215;_0x49d2f9[_0x42fd23(0x404)]>0x1?(_0x44e215=[_0x49d2f9[0x0],..._0x49d2f9[0x1]],_0x44e215[0x1]instanceof Array&&(_0x44e215=_0x44e215)):_0x44e215=_0x49d2f9;let _0x4ed0ea=_0x44e215[0x0];if(!_0x44e215)return;_0x44e215[0x0]=='1'&&_0x258373['id']==null&&(_0x258373['id']=_0x44e215[0x1]);if(_0x44e215[0x0]=='33'){_0x258373[_0x42fd23(0x670)]++;for(let _0x309b80=0x0;_0x309b80<_0x44e215[0x1][_0x42fd23(0x404)]/0xd;_0x309b80++){let _0x5e0265=_0x44e215[0x1][_0x42fd23(0x789)](0xd*_0x309b80,0xd*_0x309b80+0xd);_0x5e0265[0x0]==_0x258373['id']&&(_0x258373['id']=_0x5e0265[0x0],_0x258373['x']=_0x5e0265[0x1],_0x258373['y']=_0x5e0265[0x2],_0x258373[_0x42fd23(0x8a0)]=_0x5e0265[0x3],_0x258373['object']=_0x5e0265[0x4],_0x258373[_0x42fd23(0x508)]=_0x5e0265[0x5],_0x258373[_0x42fd23(0x40f)]=_0x5e0265[0x7],_0x258373[_0x42fd23(0x722)]=_0x5e0265[0x8],_0x258373[_0x42fd23(0x462)]=_0x5e0265[0x9],_0x258373[_0x42fd23(0x897)]=_0x5e0265[0xa],_0x258373[_0x42fd23(0x7e3)]=_0x5e0265[0xb]);if(myConfig['doChat']){}myConfig[_0x42fd23(0x49a)]&&!_0x258373[_0x42fd23(0x49a)]&&!_0x258373[_0x42fd23(0x336)]&&(_0x258373[_0x42fd23(0x49a)]=!![],_0x24661d(0x35,0x0),_0x34c342(['5',[_0x258373[_0x42fd23(0x92a)][0x1],!0x0]]),_0x34c342(['2',[myConfig[_0x42fd23(0x5d8)](_0x258373)]]),_0x34c342(['7',[0x1]]),_0x258373[_0x42fd23(0x23d)]=myConfig[_0x42fd23(0x5d8)](_0x258373),setTimeout(()=>{_0x5129d1(),_0x34c342(['7',[0x1]]),setTimeout(()=>{var _0x52b55b=_0x2943;_0x34c342(['5',[_0x258373[_0x52b55b(0x92a)][0x0],!0x0]]),_0x258373[_0x52b55b(0x49a)]=![];},0x681);},0xf0));_0x9e3c1d(_0x258373[_0x42fd23(0x5bc)],_0x258373)<=0x5a?(_0x258373[_0x42fd23(0x336)]=!![],_0x258373['trapAim']=_0x106c6b(_0x258373[_0x42fd23(0x5bc)],_0x258373),_0x258373[_0x42fd23(0x23d)]=_0x258373['trapAim'],_0x258373[_0x42fd23(0x8a0)]!=_0x258373[_0x42fd23(0x2d7)]&&_0x34c342(['2',[_0x258373[_0x42fd23(0x2d7)]]]),_0x258373[_0x42fd23(0x3c8)]&&(_0x258373[_0x42fd23(0x3c8)]=![],_0x34c342(['7',[0x1]])),_0x24661d(0x28,0x0)):(_0x258373[_0x42fd23(0x336)]=![],!_0x258373[_0x42fd23(0x3c8)]&&(_0x258373[_0x42fd23(0x3c8)]=!![],_0x34c342(['7',[0x1]])));if(_0x258373[_0x42fd23(0x336)]==![]){!_0x258373[_0x42fd23(0x49a)]&&_0x5129d1();_0x258373[_0x42fd23(0x670)]%0x3===0x0&&(botConfig[_0x42fd23(0x4ae)]?_0x258373[_0x42fd23(0x280)]!=undefined&&(_0x258373[_0x42fd23(0x280)]=undefined,_0x34c342(['33',[_0x258373['lessmove']]])):_0x9e3c1d(myConfig,_0x258373)>0xc8?_0x258373[_0x42fd23(0x280)]!=_0x106c6b(myConfig,_0x258373)&&(_0x258373[_0x42fd23(0x280)]=_0x106c6b(myConfig,_0x258373),_0x34c342(['33',[_0x258373[_0x42fd23(0x280)]]])):_0x258373['lessmove']!=undefined&&(_0x258373[_0x42fd23(0x280)]=undefined,_0x34c342(['33',[_0x258373[_0x42fd23(0x280)]]])));_0x258373[_0x42fd23(0x670)]%0x9===0x0&&(myConfig[_0x42fd23(0x40f)]&&_0x258373[_0x42fd23(0x40f)]!=myConfig[_0x42fd23(0x40f)]&&(_0x34c342(['9']),_0x34c342(['10',[myConfig[_0x42fd23(0x40f)]]])));_0x258373[_0x42fd23(0x1c1)]=_0x258373['y']>=_0x34d760/0x2-_0x299ac1/0x2&&_0x258373['y']<=_0x34d760/0x2+_0x299ac1/0x2?!![]:![];if(_0x258373['millCount']<=0x60&&!_0x258373[_0x42fd23(0x1c1)]){if(_0x258373[_0x42fd23(0x7fd)]!=_0x258373['y']||_0x258373[_0x42fd23(0x49e)]!=_0x258373['x']){if(_0x9e3c1d(_0x258373[_0x42fd23(0x4ca)],_0x258373)>0x5a){let _0x27fccb=_0x106c6b(_0x258373[_0x42fd23(0x4c7)],_0x258373);_0xf6791d(0x3,_0x27fccb+_0x3952fc(0x5a/1.25)),_0xf6791d(0x3,_0x27fccb-_0x3952fc(0x5a/1.25)),_0xf6791d(0x3,_0x27fccb),_0x258373[_0x42fd23(0x4ca)]['x']=_0x258373['x'],_0x258373[_0x42fd23(0x4ca)]['y']=_0x258373['y'];}_0x258373[_0x42fd23(0x4c7)]['x']=_0x258373['x'],_0x258373['old']['y']=_0x258373['y'];}}}}}if(_0x44e215[0x0]=='5')for(var _0x4ddd24=0x0;_0x4ddd24<_0x44e215[0x1]['length']/0x3;_0x4ddd24++){let _0x1a188b=_0x44e215[0x1][_0x42fd23(0x789)](0x3*_0x4ddd24,0x3*_0x4ddd24+0x3);_0x1a188b[0x0]==_0x258373['id']&&(_0x258373[_0x42fd23(0x1d0)]=_0x1a188b[0x2]);}if(_0x44e215[0x0]=='6')for(let _0x1d4f87=0x0;_0x1d4f87<_0x44e215[0x1][_0x42fd23(0x404)]/0x8;_0x1d4f87++){let _0x211d2e=_0x44e215[0x1]['slice'](0x8*_0x1d4f87,0x8*_0x1d4f87+0x8);_0x211d2e[0x6]==0xf&&_0x24da8a(_0x211d2e,_0x258373)<=0x5a&&_0x211d2e[0x7]!=_0x258373['id']&&_0x211d2e[0x7]!=_0x258373[_0x42fd23(0x40f)]&&(_0x258373[_0x42fd23(0x336)]=!![],_0x258373[_0x42fd23(0x5bc)]={'sid':_0x211d2e[0x0],'x':_0x211d2e[0x1],'y':_0x211d2e[0x2]},_0x4e1282(0x0,0x1));}_0x44e215[0x0]=='11'&&_0x266eb1();_0x44e215[0x0]=='12'&&(_0x258373[_0x42fd23(0x5bc)][_0x42fd23(0x204)]==_0x44e215[0x1]&&(_0x258373[_0x42fd23(0x5bc)]={'sid':void 0x0,'x':void 0x0,'y':void 0x0},_0x258373[_0x42fd23(0x336)]=![]));_0x44e215[0x0]=='14'&&(_0x44e215[0x1]==0x3&&(_0x258373['millCount']=_0x44e215[0x2]));_0x44e215[0x0]=='15'&&(_0x258373[_0x42fd23(0x9ae)]=_0x44e215[0x3]);if(_0x44e215[0x0]=='16'){if(_0x44e215[0x1]>0x0){if(_0x258373[_0x42fd23(0x868)]==0x0)_0x1910da(0x3);else{if(_0x258373[_0x42fd23(0x868)]==0x1)_0x1910da(0x11);else{if(_0x258373[_0x42fd23(0x868)]==0x2)_0x1910da(0x1f);else{if(_0x258373['upgraded']==0x3)_0x1910da(0x17);else{if(_0x258373['upgraded']==0x4)_0x1910da(0x9);else{if(_0x258373[_0x42fd23(0x868)]==0x5)_0x1910da(0x26);else{if(_0x258373[_0x42fd23(0x868)]==0x6)_0x1910da(0xc);else _0x258373[_0x42fd23(0x868)]==0x7&&_0x1910da(0xf);}}}}}}_0x258373['upgraded']++;}}_0x44e215[0x0]=='17'&&(_0x44e215[0x1]&&(_0x44e215[0x2]?_0x258373[_0x42fd23(0x92a)]=_0x44e215[0x1]:_0x258373[_0x42fd23(0x801)]=_0x44e215[0x1]));if(_0x44e215[0x0]=='h'&&_0x44e215[0x1]==_0x258373['id']){let _0x137de3=0x64-_0x44e215[0x2];(_0x137de3>=_0x258373[_0x42fd23(0x462)]==0x6?0x34:0x23)?_0xf6791d(0x0):setTimeout(()=>{_0xf6791d(0x0);},0xb4);}if(_0x44e215[0x0]=='us'){if(_0x44e215[0x3]){if(!_0x44e215[0x1])_0x258373[_0x42fd23(0x32e)][_0x44e215[0x2]]=0x1;else _0x258373[_0x42fd23(0x897)]=_0x44e215[0x2];}else{if(!_0x44e215[0x1])_0x258373['skins'][_0x44e215[0x2]]=0x1;else _0x258373[_0x42fd23(0x462)]=_0x44e215[0x2];}}},_0x258373[_0x5d172e(0x252)]=function(){var _0x5a102c=_0x5d172e;isConnected=!![],_0x266eb1(),_0x258373[_0x5a102c(0x28c)]=!![];},_0x258373[_0x5d172e(0x658)]=function(){isConnected=![];};}document[_0xfd30c1(0x838)](_0xfd30c1(0x71c))[_0xfd30c1(0x426)]=_0xfd30c1(0x953);const ohio=new Audio('\x20'),goofy=new Audio('\x20'),ohiosong=new Audio('\x20'),madeinohio=new Audio('\x20'),song1=new Audio(_0xfd30c1(0x79f)),song2=new Audio('https://cdn.discordapp.com/attachments/1053956635032289280/1055516288249757797/ae86.mp3'),song3=new Audio(_0xfd30c1(0x18d));let silentMode=!![],pfmMode=![],mooTickCount=0x0,fuckoll=![],modVisual=!![];(function(_0x28bba6){var _0x142bd0={};function _0x25034e(_0x223b38){var _0x4b288e=_0x2943;if(_0x142bd0[_0x223b38])return _0x142bd0[_0x223b38][_0x4b288e(0x245)];var _0x16d16a=_0x142bd0[_0x223b38]={'i':_0x223b38,'l':![],'exports':{}};return _0x28bba6[_0x223b38][_0x4b288e(0x7bf)](_0x16d16a[_0x4b288e(0x245)],_0x16d16a,_0x16d16a[_0x4b288e(0x245)],_0x25034e),_0x16d16a['l']=!![],_0x16d16a[_0x4b288e(0x245)];}return _0x25034e['m']=_0x28bba6,_0x25034e['c']=_0x142bd0,_0x25034e['d']=function(_0x5abf1f,_0x4d4063,_0x4a3804){var _0x49443d=_0x2943;!_0x25034e['o'](_0x5abf1f,_0x4d4063)&&Object[_0x49443d(0x4b6)](_0x5abf1f,_0x4d4063,{'enumerable':!![],'get':_0x4a3804});},_0x25034e['r']=function(_0x13e6ff){var _0x5534fb=_0x2943;typeof Symbol!==_0x5534fb(0x3fe)&&Symbol[_0x5534fb(0x513)]&&Object[_0x5534fb(0x4b6)](_0x13e6ff,Symbol[_0x5534fb(0x513)],{'value':_0x5534fb(0x76d)}),Object[_0x5534fb(0x4b6)](_0x13e6ff,'__esModule',{'value':!![]});},_0x25034e['t']=function(_0x4febac,_0x454579){var _0x50ff25=_0x2943;if(_0x454579&0x1)_0x4febac=_0x25034e(_0x4febac);if(_0x454579&0x8)return _0x4febac;if(_0x454579&0x4&&typeof _0x4febac===_0x50ff25(0x219)&&_0x4febac&&_0x4febac[_0x50ff25(0x99e)])return _0x4febac;var _0x2334bb=Object[_0x50ff25(0x60e)](null);_0x25034e['r'](_0x2334bb),Object[_0x50ff25(0x4b6)](_0x2334bb,_0x50ff25(0x57f),{'enumerable':!![],'value':_0x4febac});if(_0x454579&0x2&&typeof _0x4febac!='string'){for(var _0x3c0941 in _0x4febac)_0x25034e['d'](_0x2334bb,_0x3c0941,function(_0x37d87b){return _0x4febac[_0x37d87b];}[_0x50ff25(0x366)](null,_0x3c0941));}return _0x2334bb;},_0x25034e['n']=function(_0x3f1fc6){var _0x560cca=_0x2943,_0xd01917=_0x3f1fc6&&_0x3f1fc6[_0x560cca(0x99e)]?function _0x132d77(){return _0x3f1fc6['default'];}:function _0x160f15(){return _0x3f1fc6;};return _0x25034e['d'](_0xd01917,'a',_0xd01917),_0xd01917;},_0x25034e['o']=function(_0x495e6c,_0x2d9599){var _0x503ae0=_0x2943;return Object[_0x503ae0(0x59d)][_0x503ae0(0x19b)][_0x503ae0(0x7bf)](_0x495e6c,_0x2d9599);},_0x25034e['p']='',_0x25034e(_0x25034e['s']='./src/js/app.js');}({'./node_modules/bad-words/lib/badwords.js':function(_0x407c05,_0xc43c5e,_0x1cd8a0){var _0x5a19e1=_0xfd30c1;const _0x45cefb=_0x1cd8a0(_0x5a19e1(0x7b3))['words'],_0x495c4c=_0x1cd8a0(_0x5a19e1(0x674))['array'];class _0x57b9a3{constructor(_0x786fdb={}){var _0x1a7b50=_0x5a19e1;Object[_0x1a7b50(0xf9)](this,{'list':_0x786fdb[_0x1a7b50(0x478)]&&[]||Array[_0x1a7b50(0x59d)]['concat']['apply'](_0x45cefb,[_0x495c4c,_0x786fdb[_0x1a7b50(0x188)]||[]]),'exclude':_0x786fdb[_0x1a7b50(0x610)]||[],'placeHolder':_0x786fdb[_0x1a7b50(0x898)]||'*','regex':_0x786fdb['regex']||/[^a-zA-Z0-9|\$|\@]|\^/g,'replaceRegex':_0x786fdb['replaceRegex']||/\w/g});}[_0x5a19e1(0x3ff)](_0x34a47e){var _0x52e121=_0x5a19e1;return this['list'][_0x52e121(0x661)](_0x3cff3e=>{var _0x4478a6=_0x52e121;const _0x4952b7=new RegExp('\x5cb'+_0x3cff3e[_0x4478a6(0x759)](/(\W)/g,_0x4478a6(0x140))+'\x5cb','gi');return!this[_0x4478a6(0x610)][_0x4478a6(0x4f6)](_0x3cff3e[_0x4478a6(0x14f)]())&&_0x4952b7[_0x4478a6(0x509)](_0x34a47e);})[_0x52e121(0x404)]>0x0||![];}[_0x5a19e1(0x689)](_0x3db4cb){var _0x1f772d=_0x5a19e1;return _0x3db4cb['replace'](this[_0x1f772d(0x2f0)],'')[_0x1f772d(0x759)](this[_0x1f772d(0x6d9)],this[_0x1f772d(0x898)]);}[_0x5a19e1(0x3dc)](_0x4f3c1c){var _0xd2a147=_0x5a19e1;return _0x4f3c1c[_0xd2a147(0x87c)](/\b/)[_0xd2a147(0x1d6)](_0x1f76e4=>{var _0x9a6961=_0xd2a147;return this[_0x9a6961(0x3ff)](_0x1f76e4)?this[_0x9a6961(0x689)](_0x1f76e4):_0x1f76e4;})[_0xd2a147(0x64e)]('');}[_0x5a19e1(0x986)](){var _0x3f2c5f=_0x5a19e1;let _0x2327e8=Array[_0x3f2c5f(0x6db)](arguments);this['list'][_0x3f2c5f(0x333)](..._0x2327e8),_0x2327e8[_0x3f2c5f(0x1d6)](_0x3d86bb=>_0x3d86bb[_0x3f2c5f(0x14f)]())['forEach'](_0x321937=>{var _0x1091c7=_0x3f2c5f;this[_0x1091c7(0x610)][_0x1091c7(0x4f6)](_0x321937)&&this[_0x1091c7(0x610)]['splice'](this['exclude']['indexOf'](_0x321937),0x1);});}['removeWords'](){var _0x251816=_0x5a19e1;this[_0x251816(0x610)]['push'](...Array[_0x251816(0x6db)](arguments)[_0x251816(0x1d6)](_0x1aa201=>_0x1aa201[_0x251816(0x14f)]()));}}_0x407c05['exports']=_0x57b9a3;},'./node_modules/bad-words/lib/lang.json':function(_0x25aa82){var _0x3c182c=_0xfd30c1;_0x25aa82[_0x3c182c(0x245)]={'words':[_0x3c182c(0x37c),'anus',_0x3c182c(0x45b),_0x3c182c(0xdb),_0x3c182c(0x67b),_0x3c182c(0x3b0),_0x3c182c(0x624),'Assface',_0x3c182c(0x899),_0x3c182c(0x218),_0x3c182c(0x4b2),_0x3c182c(0x98b),_0x3c182c(0x223),_0x3c182c(0x7b9),_0x3c182c(0xf2),'bassterds',_0x3c182c(0x585),_0x3c182c(0x5b8),'bastardz','basterds',_0x3c182c(0x6cb),_0x3c182c(0x605),_0x3c182c(0x715),_0x3c182c(0x597),_0x3c182c(0x34c),_0x3c182c(0x5f6),_0x3c182c(0x2b6),'buttwipe',_0x3c182c(0x865),_0x3c182c(0x796),_0x3c182c(0x3be),'Carpet\x20Muncher',_0x3c182c(0x499),_0x3c182c(0x37a),_0x3c182c(0x3a6),_0x3c182c(0x4a6),_0x3c182c(0x991),_0x3c182c(0x34a),_0x3c182c(0x2ba),'cock-head',_0x3c182c(0x22a),_0x3c182c(0x293),'cock-sucker','crap','cum',_0x3c182c(0x797),_0x3c182c(0x192),_0x3c182c(0x929),_0x3c182c(0x583),_0x3c182c(0x69e),'dild0s',_0x3c182c(0x45a),_0x3c182c(0x761),'dilld0',_0x3c182c(0x2da),_0x3c182c(0x8c9),_0x3c182c(0x2d1),_0x3c182c(0x1bc),'dyke',_0x3c182c(0x3ea),'f\x20u\x20c\x20k',_0x3c182c(0x21a),_0x3c182c(0x30e),_0x3c182c(0x278),_0x3c182c(0x828),_0x3c182c(0x288),'faggit',_0x3c182c(0x343),_0x3c182c(0x6a3),_0x3c182c(0x1e2),_0x3c182c(0x350),'fagz','faig',_0x3c182c(0x1fe),_0x3c182c(0x83b),_0x3c182c(0x145),_0x3c182c(0x607),'fucker',_0x3c182c(0x952),_0x3c182c(0x137),_0x3c182c(0x840),'Fudge\x20Packer',_0x3c182c(0x59f),_0x3c182c(0x5a0),_0x3c182c(0x3c5),_0x3c182c(0x7bc),_0x3c182c(0x599),_0x3c182c(0x80b),_0x3c182c(0x3a0),_0x3c182c(0x100),_0x3c182c(0x6ff),_0x3c182c(0x851),_0x3c182c(0x764),_0x3c182c(0x593),'h00r',_0x3c182c(0x7eb),'h0re',_0x3c182c(0x58a),_0x3c182c(0x48b),_0x3c182c(0x81d),_0x3c182c(0x5b9),_0x3c182c(0x30b),_0x3c182c(0x87e),_0x3c182c(0x2ce),'jerk-off',_0x3c182c(0x625),_0x3c182c(0x7d8),_0x3c182c(0x708),_0x3c182c(0x417),_0x3c182c(0x4dc),'knobs',_0x3c182c(0x3f5),'kunt',_0x3c182c(0x13d),_0x3c182c(0x7ec),_0x3c182c(0x2e3),_0x3c182c(0x6f2),_0x3c182c(0x23f),_0x3c182c(0x1ac),_0x3c182c(0x5a5),'massterbait',_0x3c182c(0x766),'masstrbate',_0x3c182c(0x549),'masterbate',_0x3c182c(0x10f),'Motha\x20Fucker',_0x3c182c(0x8a8),'Motha\x20Fukkah',_0x3c182c(0x57a),_0x3c182c(0x2e9),_0x3c182c(0x69b),'Mother\x20Fuker',_0x3c182c(0x99b),_0x3c182c(0x2a5),_0x3c182c(0x94c),'Mutha\x20Fucker','Mutha\x20Fukah',_0x3c182c(0x44c),_0x3c182c(0x4a1),_0x3c182c(0x4f4),'n1gr',_0x3c182c(0x334),'nigger;','nigur;',_0x3c182c(0x682),_0x3c182c(0x8da),'orafis',_0x3c182c(0x65e),_0x3c182c(0x550),_0x3c182c(0x13f),_0x3c182c(0x735),_0x3c182c(0x126),_0x3c182c(0xf3),_0x3c182c(0x47b),_0x3c182c(0x272),'packy',_0x3c182c(0x824),'pakie',_0x3c182c(0x4fa),'pecker',_0x3c182c(0x5d4),_0x3c182c(0x755),_0x3c182c(0x46f),_0x3c182c(0x6c1),_0x3c182c(0x649),'penas',_0x3c182c(0x26c),_0x3c182c(0xf4),'penus',_0x3c182c(0x2a3),'Phuc',_0x3c182c(0x6a9),_0x3c182c(0x5c6),_0x3c182c(0x37e),_0x3c182c(0x501),_0x3c182c(0x3ed),_0x3c182c(0xf5),_0x3c182c(0x1fc),'Poonani','pr1c','pr1ck',_0x3c182c(0x1eb),_0x3c182c(0x79e),_0x3c182c(0x5a4),'pussy',_0x3c182c(0x5ae),_0x3c182c(0x75c),_0x3c182c(0x227),'queers','queerz',_0x3c182c(0x7f8),_0x3c182c(0x3c1),_0x3c182c(0x7f1),_0x3c182c(0x11b),'rectum','retard','sadist',_0x3c182c(0x938),'schlong',_0x3c182c(0x127),_0x3c182c(0x1a5),_0x3c182c(0x2c7),_0x3c182c(0x3aa),_0x3c182c(0x3e0),'sh1t','sh1ter',_0x3c182c(0x5fa),_0x3c182c(0x5f8),'sh1tz',_0x3c182c(0x802),_0x3c182c(0x976),'shitter',_0x3c182c(0x474),_0x3c182c(0x578),_0x3c182c(0x235),_0x3c182c(0x8c6),_0x3c182c(0x6cc),_0x3c182c(0x5c2),_0x3c182c(0x983),_0x3c182c(0x587),_0x3c182c(0x52f),_0x3c182c(0x44d),_0x3c182c(0x92e),_0x3c182c(0x91e),_0x3c182c(0x522),'slag','slut',_0x3c182c(0x494),'Slutty',_0x3c182c(0x156),_0x3c182c(0x5f3),_0x3c182c(0x974),_0x3c182c(0x632),_0x3c182c(0x6d1),_0x3c182c(0x38b),_0x3c182c(0x64c),_0x3c182c(0x8e6),'vaj1na','vajina',_0x3c182c(0x1c7),'vulva','w0p',_0x3c182c(0x544),_0x3c182c(0x247),_0x3c182c(0x5e4),_0x3c182c(0x896),_0x3c182c(0x3ad),_0x3c182c(0x91c),'bitch',_0x3c182c(0x1a8),'clit',_0x3c182c(0x1d5),_0x3c182c(0x607),_0x3c182c(0x802),_0x3c182c(0x3b0),_0x3c182c(0x4b2),_0x3c182c(0x106),_0x3c182c(0x115),'b1tch',_0x3c182c(0x585),_0x3c182c(0x854),_0x3c182c(0x68f),'buceta','c0ck',_0x3c182c(0x499),_0x3c182c(0x691),_0x3c182c(0x577),_0x3c182c(0x22b),_0x3c182c(0x34a),_0x3c182c(0x73d),_0x3c182c(0x797),'dildo',_0x3c182c(0x659),_0x3c182c(0x83f),_0x3c182c(0x7b6),_0x3c182c(0x2c1),'fuk','fux0r',_0x3c182c(0x22d),_0x3c182c(0x234),_0x3c182c(0x3f4),_0x3c182c(0x32b),_0x3c182c(0x901),'l3i+ch','lesbian',_0x3c182c(0x2fa),_0x3c182c(0x807),_0x3c182c(0x2eb),_0x3c182c(0x209),'s.o.b.',_0x3c182c(0x4e7),'nazi',_0x3c182c(0x331),_0x3c182c(0x463),'nutsack','phuck',_0x3c182c(0x10e),'pusse',_0x3c182c(0x68a),_0x3c182c(0x360),_0x3c182c(0x52b),_0x3c182c(0x612),'shi+',_0x3c182c(0xfb),_0x3c182c(0x6e4),_0x3c182c(0x3b7),_0x3c182c(0x935),'tits',_0x3c182c(0x653),_0x3c182c(0x904),_0x3c182c(0x973),'testical',_0x3c182c(0x262),_0x3c182c(0x640),_0x3c182c(0x348),'jackoff',_0x3c182c(0x34d),_0x3c182c(0x5a1),_0x3c182c(0x5e4),'*damn',_0x3c182c(0x384),_0x3c182c(0x4aa),_0x3c182c(0x85f),_0x3c182c(0x8b0),'amcik','andskota',_0x3c182c(0x660),_0x3c182c(0x733),_0x3c182c(0x1c6),_0x3c182c(0x821),_0x3c182c(0x90a),_0x3c182c(0x43c),'breasts',_0x3c182c(0x87f),_0x3c182c(0x48a),'cazzo','chraa',_0x3c182c(0x453),'Cock*',_0x3c182c(0x71f),_0x3c182c(0x97c),_0x3c182c(0x675),_0x3c182c(0x111),_0x3c182c(0x55c),'dike*',_0x3c182c(0x66c),'dziwka','ejackulate',_0x3c182c(0x485),_0x3c182c(0x627),_0x3c182c(0x5e8),'faen',_0x3c182c(0x47f),_0x3c182c(0x6a2),_0x3c182c(0x7f4),_0x3c182c(0x73e),_0x3c182c(0x4c8),_0x3c182c(0x8f5),_0x3c182c(0x769),_0x3c182c(0x180),_0x3c182c(0x1ee),_0x3c182c(0x1a4),_0x3c182c(0x643),_0x3c182c(0x531),_0x3c182c(0x479),_0x3c182c(0x61d),_0x3c182c(0x45f),_0x3c182c(0x6b7),_0x3c182c(0x99c),_0x3c182c(0x8e0),_0x3c182c(0x3df),_0x3c182c(0x487),_0x3c182c(0x7df),'honkey',_0x3c182c(0x324),_0x3c182c(0x31c),_0x3c182c(0x17c),_0x3c182c(0x417),_0x3c182c(0x842),'kike','klootzak',_0x3c182c(0x3c4),_0x3c182c(0x66d),_0x3c182c(0x913),_0x3c182c(0x395),'Kurac',_0x3c182c(0x3f3),'kusi*',_0x3c182c(0x1a2),'lesbo',_0x3c182c(0x793),_0x3c182c(0x1f9),_0x3c182c(0x3cb),_0x3c182c(0x466),'monkleigh',_0x3c182c(0x88f),_0x3c182c(0x3b9),'mulkku',_0x3c182c(0x35d),_0x3c182c(0x729),_0x3c182c(0x781),_0x3c182c(0x7e8),_0x3c182c(0x4f1),_0x3c182c(0x1d4),_0x3c182c(0x428),'picka',_0x3c182c(0x28e),_0x3c182c(0x22c),_0x3c182c(0x50b),_0x3c182c(0x397),_0x3c182c(0x128),'poontsee',_0x3c182c(0x175),_0x3c182c(0x2cf),_0x3c182c(0x8ea),_0x3c182c(0x1cd),_0x3c182c(0x15f),'pula',_0x3c182c(0x7a1),_0x3c182c(0x161),'puto',_0x3c182c(0x168),_0x3c182c(0x303),'rautenberg',_0x3c182c(0x144),_0x3c182c(0x1b5),_0x3c182c(0x80a),'schmuck','screw',_0x3c182c(0x54d),_0x3c182c(0x37d),_0x3c182c(0x146),_0x3c182c(0x8c7),_0x3c182c(0xe7),'skribz',_0x3c182c(0x58e),'sphencter',_0x3c182c(0x83d),'spierdalaj',_0x3c182c(0x3e4),'suka',_0x3c182c(0x35f),_0x3c182c(0x387),_0x3c182c(0x83a),_0x3c182c(0x58d),_0x3c182c(0x8c2),_0x3c182c(0x3a1),_0x3c182c(0x93f),_0x3c182c(0x998),_0x3c182c(0x49c),'yed',_0x3c182c(0x6da)]};},'./node_modules/badwords-list/lib/array.js':function(_0x3ef92d,_0x19e660){var _0x1a9761=_0xfd30c1;_0x3ef92d['exports']=['4r5e',_0x1a9761(0x72a),'5hit',_0x1a9761(0x6c4),_0x1a9761(0x847),_0x1a9761(0x481),_0x1a9761(0x9a0),_0x1a9761(0x2e8),_0x1a9761(0x45d),_0x1a9761(0x3b0),_0x1a9761(0x4b3),_0x1a9761(0x955),_0x1a9761(0x515),'assfukka',_0x1a9761(0x4b2),'assholes',_0x1a9761(0x310),_0x1a9761(0x95e),'b!tch','b00bs',_0x1a9761(0x115),_0x1a9761(0x803),_0x1a9761(0x32f),_0x1a9761(0x1a3),'ballsack','bastard','beastial','beastiality',_0x1a9761(0x95d),_0x1a9761(0x6f6),_0x1a9761(0x398),_0x1a9761(0x854),_0x1a9761(0x84c),_0x1a9761(0x715),_0x1a9761(0x50d),_0x1a9761(0x332),_0x1a9761(0x597),'bitchin',_0x1a9761(0x1a7),_0x1a9761(0x3a3),'blow\x20job','blowjob',_0x1a9761(0x5a9),'boiolas','bollock',_0x1a9761(0x8dd),_0x1a9761(0x6dc),_0x1a9761(0x87d),_0x1a9761(0x653),'booobs',_0x1a9761(0x19a),_0x1a9761(0x6e3),_0x1a9761(0x13c),_0x1a9761(0x308),_0x1a9761(0x567),_0x1a9761(0x5d5),_0x1a9761(0x5ed),_0x1a9761(0x8e2),_0x1a9761(0x319),_0x1a9761(0x2b6),_0x1a9761(0x6d2),_0x1a9761(0x5bf),'c0ck','c0cksucker',_0x1a9761(0x819),_0x1a9761(0x499),'chink','cipa','cl1t',_0x1a9761(0x255),_0x1a9761(0x8f3),_0x1a9761(0x22b),_0x1a9761(0x393),'cock',_0x1a9761(0x628),'cockface',_0x1a9761(0x2ba),'cockmunch','cockmuncher',_0x1a9761(0x22a),_0x1a9761(0x620),_0x1a9761(0x10b),_0x1a9761(0x507),_0x1a9761(0x740),_0x1a9761(0x371),'cocksuka',_0x1a9761(0x62c),'cok',_0x1a9761(0x6de),_0x1a9761(0x12d),'coon',_0x1a9761(0x921),_0x1a9761(0x2c4),_0x1a9761(0x73d),'cummer',_0x1a9761(0x123),'cums',_0x1a9761(0x446),_0x1a9761(0x4fd),'cunillingus',_0x1a9761(0x66e),_0x1a9761(0x797),'cuntlick',_0x1a9761(0x6fa),_0x1a9761(0x5d7),_0x1a9761(0x192),_0x1a9761(0x2b2),'cyberfuc',_0x1a9761(0x1c8),_0x1a9761(0x340),_0x1a9761(0x8d3),_0x1a9761(0x44e),'cyberfucking',_0x1a9761(0x450),'damn','dick',_0x1a9761(0x347),_0x1a9761(0x45a),_0x1a9761(0x761),'dink','dinks',_0x1a9761(0x659),_0x1a9761(0x86a),_0x1a9761(0x41e),_0x1a9761(0x4b7),'dogging',_0x1a9761(0x787),_0x1a9761(0x29a),_0x1a9761(0x8ce),_0x1a9761(0x1cc),_0x1a9761(0x52d),_0x1a9761(0x64f),_0x1a9761(0x374),_0x1a9761(0x82c),_0x1a9761(0x837),_0x1a9761(0x77f),_0x1a9761(0x83f),_0x1a9761(0x5c4),_0x1a9761(0x21a),_0x1a9761(0x858),_0x1a9761(0x30e),_0x1a9761(0x19f),_0x1a9761(0x493),_0x1a9761(0x343),_0x1a9761(0x3d7),'fagot',_0x1a9761(0x7e0),_0x1a9761(0x350),_0x1a9761(0x7f4),_0x1a9761(0xf0),'fannyfucker',_0x1a9761(0x1ab),_0x1a9761(0x7b6),_0x1a9761(0x2c1),'fcuker','fcuking',_0x1a9761(0x7ca),_0x1a9761(0x8d0),_0x1a9761(0x5cb),_0x1a9761(0x548),_0x1a9761(0x3ec),_0x1a9761(0x928),_0x1a9761(0x3b8),_0x1a9761(0x51b),_0x1a9761(0x55d),'fingerfucking','fingerfucks',_0x1a9761(0x435),_0x1a9761(0x35e),_0x1a9761(0x229),'fistfuckers',_0x1a9761(0x4ac),'fistfuckings','fistfucks',_0x1a9761(0x4a2),_0x1a9761(0x5e2),'fooker','fuck',_0x1a9761(0x15a),'fucked',_0x1a9761(0x329),_0x1a9761(0x13a),'fuckhead','fuckheads',_0x1a9761(0x952),_0x1a9761(0x137),_0x1a9761(0x2cc),_0x1a9761(0x870),_0x1a9761(0x4bd),'fucks',_0x1a9761(0x7af),_0x1a9761(0x132),'fudge\x20packer',_0x1a9761(0x81e),_0x1a9761(0x59f),_0x1a9761(0x7bc),_0x1a9761(0x6fe),'fukkin',_0x1a9761(0x40e),_0x1a9761(0x4c9),'fukwit','fux',_0x1a9761(0x5cf),'f_u_c_k',_0x1a9761(0x1ed),_0x1a9761(0x511),_0x1a9761(0x75f),_0x1a9761(0x8e9),'gaysex','goatse',_0x1a9761(0x213),_0x1a9761(0x41a),_0x1a9761(0x29b),_0x1a9761(0x261),_0x1a9761(0x6c8),_0x1a9761(0x1df),_0x1a9761(0x3df),_0x1a9761(0x804),_0x1a9761(0x48b),_0x1a9761(0x376),'hoer',_0x1a9761(0x3e5),_0x1a9761(0x234),_0x1a9761(0x2ef),_0x1a9761(0x1de),_0x1a9761(0x108),'jack-off',_0x1a9761(0x30b),_0x1a9761(0x87e),_0x1a9761(0x8c3),_0x1a9761(0x3f4),'jiz',_0x1a9761(0x708),_0x1a9761(0x417),_0x1a9761(0x32b),_0x1a9761(0x4dc),_0x1a9761(0x8a6),'knobed','knobend',_0x1a9761(0x480),'knobjocky',_0x1a9761(0x107),_0x1a9761(0x267),_0x1a9761(0x746),_0x1a9761(0x472),_0x1a9761(0x91d),_0x1a9761(0x644),_0x1a9761(0x155),'kums',_0x1a9761(0x33b),_0x1a9761(0x54f),'l3itch',_0x1a9761(0x59b),_0x1a9761(0x720),_0x1a9761(0x866),_0x1a9761(0x7b8),_0x1a9761(0x5f9),'m45terbate','ma5terb8',_0x1a9761(0x263),_0x1a9761(0x1ac),'master-bate',_0x1a9761(0x205),_0x1a9761(0x807),_0x1a9761(0x2eb),'masterbate',_0x1a9761(0x933),_0x1a9761(0x42d),'masturbate',_0x1a9761(0xfc),_0x1a9761(0x403),_0x1a9761(0x4e7),_0x1a9761(0x39e),'mothafucka',_0x1a9761(0x9b2),_0x1a9761(0x33e),_0x1a9761(0x3f7),_0x1a9761(0x286),_0x1a9761(0x99f),_0x1a9761(0x5a8),_0x1a9761(0x3f8),'mothafuckings',_0x1a9761(0x8dc),'mother\x20fucker',_0x1a9761(0x5df),_0x1a9761(0x932),_0x1a9761(0x209),_0x1a9761(0x989),'motherfuckin',_0x1a9761(0x527),_0x1a9761(0x34b),_0x1a9761(0x553),'motherfucks',_0x1a9761(0x750),_0x1a9761(0x253),_0x1a9761(0x62b),_0x1a9761(0x7b0),_0x1a9761(0x112),_0x1a9761(0x56a),_0x1a9761(0x7ac),_0x1a9761(0x8d4),_0x1a9761(0x44f),_0x1a9761(0x8b7),_0x1a9761(0x6b6),'nigga',_0x1a9761(0x805),_0x1a9761(0x72e),'niggaz',_0x1a9761(0x463),_0x1a9761(0x14a),_0x1a9761(0x1ea),'nob\x20jokey','nobhead',_0x1a9761(0x569),_0x1a9761(0x51e),_0x1a9761(0x558),_0x1a9761(0x237),_0x1a9761(0xed),_0x1a9761(0x971),'orgasm',_0x1a9761(0x609),'p0rn',_0x1a9761(0x299),_0x1a9761(0x3b6),_0x1a9761(0x26c),_0x1a9761(0x447),_0x1a9761(0x884),'phuck','phuk',_0x1a9761(0x369),_0x1a9761(0x70a),_0x1a9761(0x495),_0x1a9761(0x775),_0x1a9761(0x7ce),_0x1a9761(0x542),_0x1a9761(0x73c),_0x1a9761(0x10e),_0x1a9761(0x79b),'pissed',_0x1a9761(0x47c),_0x1a9761(0x99d),_0x1a9761(0x187),'pissflaps',_0x1a9761(0x86d),_0x1a9761(0x709),_0x1a9761(0x486),_0x1a9761(0x175),'porn',_0x1a9761(0x582),_0x1a9761(0x5fc),'pornos',_0x1a9761(0x1f0),_0x1a9761(0x748),_0x1a9761(0x537),_0x1a9761(0x552),_0x1a9761(0x79e),_0x1a9761(0x82e),_0x1a9761(0x344),_0x1a9761(0x68a),_0x1a9761(0x568),_0x1a9761(0x271),_0x1a9761(0x562),_0x1a9761(0x876),_0x1a9761(0x656),_0x1a9761(0x2b9),_0x1a9761(0x4fc),_0x1a9761(0x8bc),_0x1a9761(0x50c),_0x1a9761(0x127),_0x1a9761(0x496),_0x1a9761(0x320),_0x1a9761(0x360),'semen',_0x1a9761(0x2c7),_0x1a9761(0xfb),_0x1a9761(0x52b),_0x1a9761(0x8ba),_0x1a9761(0x77e),_0x1a9761(0x680),_0x1a9761(0x14e),'shagging',_0x1a9761(0x612),'shi+',_0x1a9761(0x802),_0x1a9761(0x456),_0x1a9761(0x2e0),_0x1a9761(0x274),_0x1a9761(0x6c2),_0x1a9761(0x1f4),_0x1a9761(0x970),_0x1a9761(0x810),_0x1a9761(0x2f8),_0x1a9761(0x7b2),_0x1a9761(0x976),_0x1a9761(0x7f6),_0x1a9761(0x8d1),_0x1a9761(0x8df),_0x1a9761(0x74f),_0x1a9761(0x88c),_0x1a9761(0x8db),_0x1a9761(0x52f),_0x1a9761(0x6e4),_0x1a9761(0x494),'smegma',_0x1a9761(0x3b7),_0x1a9761(0x47d),_0x1a9761(0x5f3),'spac',_0x1a9761(0x95b),'s_h_i_t',_0x1a9761(0x78c),_0x1a9761(0x2fe),_0x1a9761(0x935),_0x1a9761(0x973),_0x1a9761(0x3f1),'testicle',_0x1a9761(0x974),_0x1a9761(0x9af),_0x1a9761(0x441),_0x1a9761(0x640),_0x1a9761(0x1ec),_0x1a9761(0x6ae),_0x1a9761(0x94a),_0x1a9761(0x6e8),'tittywank',_0x1a9761(0x836),_0x1a9761(0x888),_0x1a9761(0x632),_0x1a9761(0x5ce),_0x1a9761(0x58d),'twathead','twatty',_0x1a9761(0x7ab),_0x1a9761(0x8cd),_0x1a9761(0x806),_0x1a9761(0x6f4),_0x1a9761(0x8e6),_0x1a9761(0x92c),'vulva',_0x1a9761(0x348),_0x1a9761(0x1f2),_0x1a9761(0x34d),_0x1a9761(0x457),_0x1a9761(0x289),_0x1a9761(0x5a1),_0x1a9761(0x5e4),_0x1a9761(0x21c),_0x1a9761(0x36a),_0x1a9761(0x896),_0x1a9761(0x3ad)];},'./node_modules/badwords-list/lib/index.js':function(_0x5f41a0,_0x46c05e,_0x317dc4){_0x5f41a0['exports']={'object':_0x317dc4('./node_modules/badwords-list/lib/object.js'),'array':_0x317dc4('./node_modules/badwords-list/lib/array.js'),'regex':_0x317dc4('./node_modules/badwords-list/lib/regexp.js')};},'./node_modules/badwords-list/lib/object.js':function(_0x4148fc,_0x2a26e3){var _0x4a430a=_0xfd30c1;_0x4148fc[_0x4a430a(0x245)]={'4r5e':0x1,'5h1t':0x1,'5hit':0x1,'a55':0x1,'anal':0x1,'anus':0x1,'ar5e':0x1,'arrse':0x1,'arse':0x1,'ass':0x1,'ass-fucker':0x1,'asses':0x1,'assfucker':0x1,'assfukka':0x1,'asshole':0x1,'assholes':0x1,'asswhole':0x1,'a_s_s':0x1,'b!tch':0x1,'b00bs':0x1,'b17ch':0x1,'b1tch':0x1,'ballbag':0x1,'balls':0x1,'ballsack':0x1,'bastard':0x1,'beastial':0x1,'beastiality':0x1,'bellend':0x1,'bestial':0x1,'bestiality':0x1,'bi+ch':0x1,'biatch':0x1,'bitch':0x1,'bitcher':0x1,'bitchers':0x1,'bitches':0x1,'bitchin':0x1,'bitching':0x1,'bloody':0x1,'blow\x20job':0x1,'blowjob':0x1,'blowjobs':0x1,'boiolas':0x1,'bollock':0x1,'bollok':0x1,'boner':0x1,'boob':0x1,'boobs':0x1,'booobs':0x1,'boooobs':0x1,'booooobs':0x1,'booooooobs':0x1,'breasts':0x1,'buceta':0x1,'bugger':0x1,'bum':0x1,'bunny\x20fucker':0x1,'butt':0x1,'butthole':0x1,'buttmuch':0x1,'buttplug':0x1,'c0ck':0x1,'c0cksucker':0x1,'carpet\x20muncher':0x1,'cawk':0x1,'chink':0x1,'cipa':0x1,'cl1t':0x1,'clit':0x1,'clitoris':0x1,'clits':0x1,'cnut':0x1,'cock':0x1,'cock-sucker':0x1,'cockface':0x1,'cockhead':0x1,'cockmunch':0x1,'cockmuncher':0x1,'cocks':0x1,'cocksuck':0x1,'cocksucked':0x1,'cocksucker':0x1,'cocksucking':0x1,'cocksucks':0x1,'cocksuka':0x1,'cocksukka':0x1,'cok':0x1,'cokmuncher':0x1,'coksucka':0x1,'coon':0x1,'cox':0x1,'crap':0x1,'cum':0x1,'cummer':0x1,'cumming':0x1,'cums':0x1,'cumshot':0x1,'cunilingus':0x1,'cunillingus':0x1,'cunnilingus':0x1,'cunt':0x1,'cuntlick':0x1,'cuntlicker':0x1,'cuntlicking':0x1,'cunts':0x1,'cyalis':0x1,'cyberfuc':0x1,'cyberfuck':0x1,'cyberfucked':0x1,'cyberfucker':0x1,'cyberfuckers':0x1,'cyberfucking':0x1,'d1ck':0x1,'damn':0x1,'dick':0x1,'dickhead':0x1,'dildo':0x1,'dildos':0x1,'dink':0x1,'dinks':0x1,'dirsa':0x1,'dlck':0x1,'dog-fucker':0x1,'doggin':0x1,'dogging':0x1,'donkeyribber':0x1,'doosh':0x1,'duche':0x1,'dyke':0x1,'ejaculate':0x1,'ejaculated':0x1,'ejaculates':0x1,'ejaculating':0x1,'ejaculatings':0x1,'ejaculation':0x1,'ejakulate':0x1,'f\x20u\x20c\x20k':0x1,'f\x20u\x20c\x20k\x20e\x20r':0x1,'f4nny':0x1,'fag':0x1,'fagging':0x1,'faggitt':0x1,'faggot':0x1,'faggs':0x1,'fagot':0x1,'fagots':0x1,'fags':0x1,'fanny':0x1,'fannyflaps':0x1,'fannyfucker':0x1,'fanyy':0x1,'fatass':0x1,'fcuk':0x1,'fcuker':0x1,'fcuking':0x1,'feck':0x1,'fecker':0x1,'felching':0x1,'fellate':0x1,'fellatio':0x1,'fingerfuck':0x1,'fingerfucked':0x1,'fingerfucker':0x1,'fingerfuckers':0x1,'fingerfucking':0x1,'fingerfucks':0x1,'fistfuck':0x1,'fistfucked':0x1,'fistfucker':0x1,'fistfuckers':0x1,'fistfucking':0x1,'fistfuckings':0x1,'fistfucks':0x1,'flange':0x1,'fook':0x1,'fooker':0x1,'fuck':0x1,'fucka':0x1,'fucked':0x1,'fucker':0x1,'fuckers':0x1,'fuckhead':0x1,'fuckheads':0x1,'fuckin':0x1,'fucking':0x1,'fuckings':0x1,'fuckingshitmotherfucker':0x1,'fuckme':0x1,'fucks':0x1,'fuckwhit':0x1,'fuckwit':0x1,'fudge\x20packer':0x1,'fudgepacker':0x1,'fuk':0x1,'fuker':0x1,'fukker':0x1,'fukkin':0x1,'fuks':0x1,'fukwhit':0x1,'fukwit':0x1,'fux':0x1,'fux0r':0x1,'f_u_c_k':0x1,'gangbang':0x1,'gangbanged':0x1,'gangbangs':0x1,'gaylord':0x1,'gaysex':0x1,'goatse':0x1,'God':0x1,'god-dam':0x1,'god-damned':0x1,'goddamn':0x1,'goddamned':0x1,'hardcoresex':0x1,'hell':0x1,'heshe':0x1,'hoar':0x1,'hoare':0x1,'hoer':0x1,'homo':0x1,'hore':0x1,'horniest':0x1,'horny':0x1,'hotsex':0x1,'jack-off':0x1,'jackoff':0x1,'jap':0x1,'jerk-off':0x1,'jism':0x1,'jiz':0x1,'jizm':0x1,'jizz':0x1,'kawk':0x1,'knob':0x1,'knobead':0x1,'knobed':0x1,'knobend':0x1,'knobhead':0x1,'knobjocky':0x1,'knobjokey':0x1,'kock':0x1,'kondum':0x1,'kondums':0x1,'kum':0x1,'kummer':0x1,'kumming':0x1,'kums':0x1,'kunilingus':0x1,'l3i+ch':0x1,'l3itch':0x1,'labia':0x1,'lust':0x1,'lusting':0x1,'m0f0':0x1,'m0fo':0x1,'m45terbate':0x1,'ma5terb8':0x1,'ma5terbate':0x1,'masochist':0x1,'master-bate':0x1,'masterb8':0x1,'masterbat*':0x1,'masterbat3':0x1,'masterbate':0x1,'masterbation':0x1,'masterbations':0x1,'masturbate':0x1,'mo-fo':0x1,'mof0':0x1,'mofo':0x1,'mothafuck':0x1,'mothafucka':0x1,'mothafuckas':0x1,'mothafuckaz':0x1,'mothafucked':0x1,'mothafucker':0x1,'mothafuckers':0x1,'mothafuckin':0x1,'mothafucking':0x1,'mothafuckings':0x1,'mothafucks':0x1,'mother\x20fucker':0x1,'motherfuck':0x1,'motherfucked':0x1,'motherfucker':0x1,'motherfuckers':0x1,'motherfuckin':0x1,'motherfucking':0x1,'motherfuckings':0x1,'motherfuckka':0x1,'motherfucks':0x1,'muff':0x1,'mutha':0x1,'muthafecker':0x1,'muthafuckker':0x1,'muther':0x1,'mutherfucker':0x1,'n1gga':0x1,'n1gger':0x1,'nazi':0x1,'nigg3r':0x1,'nigg4h':0x1,'nigga':0x1,'niggah':0x1,'niggas':0x1,'niggaz':0x1,'nigger':0x1,'niggers':0x1,'nob':0x1,'nob\x20jokey':0x1,'nobhead':0x1,'nobjocky':0x1,'nobjokey':0x1,'numbnuts':0x1,'nutsack':0x1,'orgasim':0x1,'orgasims':0x1,'orgasm':0x1,'orgasms':0x1,'p0rn':0x1,'pawn':0x1,'pecker':0x1,'penis':0x1,'penisfucker':0x1,'phonesex':0x1,'phuck':0x1,'phuk':0x1,'phuked':0x1,'phuking':0x1,'phukked':0x1,'phukking':0x1,'phuks':0x1,'phuq':0x1,'pigfucker':0x1,'pimpis':0x1,'piss':0x1,'pissed':0x1,'pisser':0x1,'pissers':0x1,'pisses':0x1,'pissflaps':0x1,'pissin':0x1,'pissing':0x1,'pissoff':0x1,'poop':0x1,'porn':0x1,'porno':0x1,'pornography':0x1,'pornos':0x1,'prick':0x1,'pricks':0x1,'pron':0x1,'pube':0x1,'pusse':0x1,'pussi':0x1,'pussies':0x1,'pussy':0x1,'pussys':0x1,'rectum':0x1,'retard':0x1,'rimjaw':0x1,'rimming':0x1,'s\x20hit':0x1,'s.o.b.':0x1,'sadist':0x1,'schlong':0x1,'screwing':0x1,'scroat':0x1,'scrote':0x1,'scrotum':0x1,'semen':0x1,'sex':0x1,'sh!+':0x1,'sh!t':0x1,'sh1t':0x1,'shag':0x1,'shagger':0x1,'shaggin':0x1,'shagging':0x1,'shemale':0x1,'shi+':0x1,'shit':0x1,'shitdick':0x1,'shite':0x1,'shited':0x1,'shitey':0x1,'shitfuck':0x1,'shitfull':0x1,'shithead':0x1,'shiting':0x1,'shitings':0x1,'shits':0x1,'shitted':0x1,'shitter':0x1,'shitters':0x1,'shitting':0x1,'shittings':0x1,'shitty':0x1,'skank':0x1,'slut':0x1,'sluts':0x1,'smegma':0x1,'smut':0x1,'snatch':0x1,'son-of-a-bitch':0x1,'spac':0x1,'spunk':0x1,'s_h_i_t':0x1,'t1tt1e5':0x1,'t1tties':0x1,'teets':0x1,'teez':0x1,'testical':0x1,'testicle':0x1,'tit':0x1,'titfuck':0x1,'tits':0x1,'titt':0x1,'tittie5':0x1,'tittiefucker':0x1,'titties':0x1,'tittyfuck':0x1,'tittywank':0x1,'titwank':0x1,'tosser':0x1,'turd':0x1,'tw4t':0x1,'twat':0x1,'twathead':0x1,'twatty':0x1,'twunt':0x1,'twunter':0x1,'v14gra':0x1,'v1gra':0x1,'vagina':0x1,'viagra':0x1,'vulva':0x1,'w00se':0x1,'wang':0x1,'wank':0x1,'wanker':0x1,'wanky':0x1,'whoar':0x1,'whore':0x1,'willies':0x1,'willy':0x1,'xrated':0x1,'xxx':0x1};},'./node_modules/badwords-list/lib/regexp.js':function(_0x315331,_0x353219){var _0x44043e=_0xfd30c1;_0x315331[_0x44043e(0x245)]=/\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;},'./node_modules/base64-js/index.js':function(_0x579d11,_0x51a07e,_0x4c21f6){'use strict';var _0x19570a=_0xfd30c1;_0x51a07e[_0x19570a(0x3e6)]=_0x1c691a,_0x51a07e['toByteArray']=_0x1d3ee7,_0x51a07e[_0x19570a(0x268)]=_0x5a03d0;var _0x1f8b04=[],_0xc4389=[],_0x34ce88=typeof Uint8Array!=='undefined'?Uint8Array:Array,_0x1752ad=_0x19570a(0x8a9);for(var _0x94ed17=0x0,_0x5dce05=_0x1752ad[_0x19570a(0x404)];_0x94ed17<_0x5dce05;++_0x94ed17){_0x1f8b04[_0x94ed17]=_0x1752ad[_0x94ed17],_0xc4389[_0x1752ad[_0x19570a(0x2a2)](_0x94ed17)]=_0x94ed17;}_0xc4389['-'[_0x19570a(0x2a2)](0x0)]=0x3e,_0xc4389['_'[_0x19570a(0x2a2)](0x0)]=0x3f;function _0x5760ae(_0x15a6fe){var _0x1fd1d5=_0x19570a,_0x3079c8=_0x15a6fe[_0x1fd1d5(0x404)];if(_0x3079c8%0x4>0x0)throw new Error(_0x1fd1d5(0x711));var _0x4d376d=_0x15a6fe[_0x1fd1d5(0x5b5)]('=');if(_0x4d376d===-0x1)_0x4d376d=_0x3079c8;var _0x4ba8c6=_0x4d376d===_0x3079c8?0x0:0x4-_0x4d376d%0x4;return[_0x4d376d,_0x4ba8c6];}function _0x1c691a(_0x219a29){var _0x3e37d1=_0x5760ae(_0x219a29),_0x160e98=_0x3e37d1[0x0],_0x433ab8=_0x3e37d1[0x1];return(_0x160e98+_0x433ab8)*0x3/0x4-_0x433ab8;}function _0x3751de(_0x32cd7a,_0x195904,_0x25c9cd){return(_0x195904+_0x25c9cd)*0x3/0x4-_0x25c9cd;}function _0x1d3ee7(_0x1cc3ce){var _0x50a889=_0x19570a,_0x52b004,_0xc4cf45=_0x5760ae(_0x1cc3ce),_0x2defe4=_0xc4cf45[0x0],_0x515551=_0xc4cf45[0x1],_0x63853f=new _0x34ce88(_0x3751de(_0x1cc3ce,_0x2defe4,_0x515551)),_0x53c51f=0x0,_0x378458=_0x515551>0x0?_0x2defe4-0x4:_0x2defe4,_0x1b84ed;for(_0x1b84ed=0x0;_0x1b84ed<_0x378458;_0x1b84ed+=0x4){_0x52b004=_0xc4389[_0x1cc3ce['charCodeAt'](_0x1b84ed)]<<0x12|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x1)]<<0xc|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x2)]<<0x6|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x3)],_0x63853f[_0x53c51f++]=_0x52b004>>0x10&0xff,_0x63853f[_0x53c51f++]=_0x52b004>>0x8&0xff,_0x63853f[_0x53c51f++]=_0x52b004&0xff;}return _0x515551===0x2&&(_0x52b004=_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed)]<<0x2|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x1)]>>0x4,_0x63853f[_0x53c51f++]=_0x52b004&0xff),_0x515551===0x1&&(_0x52b004=_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed)]<<0xa|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x1)]<<0x4|_0xc4389[_0x1cc3ce[_0x50a889(0x2a2)](_0x1b84ed+0x2)]>>0x2,_0x63853f[_0x53c51f++]=_0x52b004>>0x8&0xff,_0x63853f[_0x53c51f++]=_0x52b004&0xff),_0x63853f;}function _0x374196(_0x1f8eec){return _0x1f8b04[_0x1f8eec>>0x12&0x3f]+_0x1f8b04[_0x1f8eec>>0xc&0x3f]+_0x1f8b04[_0x1f8eec>>0x6&0x3f]+_0x1f8b04[_0x1f8eec&0x3f];}function _0x95f39e(_0x4ab02b,_0x28389f,_0x305955){var _0x3086cc=_0x19570a,_0x28e1e5,_0x295c3e=[];for(var _0x553b02=_0x28389f;_0x553b02<_0x305955;_0x553b02+=0x3){_0x28e1e5=(_0x4ab02b[_0x553b02]<<0x10&0xff0000)+(_0x4ab02b[_0x553b02+0x1]<<0x8&0xff00)+(_0x4ab02b[_0x553b02+0x2]&0xff),_0x295c3e['push'](_0x374196(_0x28e1e5));}return _0x295c3e[_0x3086cc(0x64e)]('');}function _0x5a03d0(_0x4a0b0f){var _0x28cfc2=_0x19570a,_0x3e307b,_0x4a60a9=_0x4a0b0f['length'],_0x683bdd=_0x4a60a9%0x3,_0x15ae91=[],_0x5f4ae9=0x3fff;for(var _0x3862b1=0x0,_0x157a32=_0x4a60a9-_0x683bdd;_0x3862b1<_0x157a32;_0x3862b1+=_0x5f4ae9){_0x15ae91[_0x28cfc2(0x333)](_0x95f39e(_0x4a0b0f,_0x3862b1,_0x3862b1+_0x5f4ae9>_0x157a32?_0x157a32:_0x3862b1+_0x5f4ae9));}if(_0x683bdd===0x1)_0x3e307b=_0x4a0b0f[_0x4a60a9-0x1],_0x15ae91[_0x28cfc2(0x333)](_0x1f8b04[_0x3e307b>>0x2]+_0x1f8b04[_0x3e307b<<0x4&0x3f]+'==');else _0x683bdd===0x2&&(_0x3e307b=(_0x4a0b0f[_0x4a60a9-0x2]<<0x8)+_0x4a0b0f[_0x4a60a9-0x1],_0x15ae91[_0x28cfc2(0x333)](_0x1f8b04[_0x3e307b>>0xa]+_0x1f8b04[_0x3e307b>>0x4&0x3f]+_0x1f8b04[_0x3e307b<<0x2&0x3f]+'='));return _0x15ae91['join']('');}},'./node_modules/buffer/index.js':function(_0x5aba02,_0x5330af,_0xc76248){'use strict';var _0x2e1773=_0xfd30c1;(function(_0x27ecde){var _0x5f254e=_0x2943,_0x1c950c=_0xc76248(_0x5f254e(0x762)),_0x4d96bc=_0xc76248(_0x5f254e(0x15d)),_0x2811f8=_0xc76248(_0x5f254e(0x2b1));_0x5330af[_0x5f254e(0x233)]=_0x436365,_0x5330af[_0x5f254e(0x323)]=_0x4457f0,_0x5330af[_0x5f254e(0x3ac)]=0x32,_0x436365[_0x5f254e(0x11a)]=_0x27ecde[_0x5f254e(0x11a)]!==undefined?_0x27ecde[_0x5f254e(0x11a)]:_0x1a9a01(),_0x5330af[_0x5f254e(0x3e9)]=_0x342642();function _0x1a9a01(){var _0x258cc3=_0x5f254e;try{var _0x5c0053=new Uint8Array(0x1);return _0x5c0053[_0x258cc3(0x498)]={'__proto__':Uint8Array[_0x258cc3(0x59d)],'foo':function(){return 0x2a;}},_0x5c0053['foo']()===0x2a&&typeof _0x5c0053[_0x258cc3(0x451)]==='function'&&_0x5c0053[_0x258cc3(0x451)](0x1,0x1)[_0x258cc3(0x3e6)]===0x0;}catch(_0x3ca83e){return![];}}function _0x342642(){return _0x436365['TYPED_ARRAY_SUPPORT']?0x7fffffff:0x3fffffff;}function _0x46bc9b(_0x3197c0,_0xfbb29b){var _0x266da7=_0x5f254e;if(_0x342642()<_0xfbb29b)throw new RangeError(_0x266da7(0x134));return _0x436365[_0x266da7(0x11a)]?(_0x3197c0=new Uint8Array(_0xfbb29b),_0x3197c0['__proto__']=_0x436365['prototype']):(_0x3197c0===null&&(_0x3197c0=new _0x436365(_0xfbb29b)),_0x3197c0[_0x266da7(0x404)]=_0xfbb29b),_0x3197c0;}function _0x436365(_0x3c4953,_0x5bc047,_0x2ba9a7){var _0x479352=_0x5f254e;if(!_0x436365[_0x479352(0x11a)]&&!(this instanceof _0x436365))return new _0x436365(_0x3c4953,_0x5bc047,_0x2ba9a7);if(typeof _0x3c4953===_0x479352(0x8ec)){if(typeof _0x5bc047===_0x479352(0x325))throw new Error(_0x479352(0x7ad));return _0x12b9a9(this,_0x3c4953);}return _0x20ef3c(this,_0x3c4953,_0x5bc047,_0x2ba9a7);}_0x436365[_0x5f254e(0x95a)]=0x2000,_0x436365[_0x5f254e(0x402)]=function(_0x5ccab1){var _0x5f30e8=_0x5f254e;return _0x5ccab1[_0x5f30e8(0x498)]=_0x436365['prototype'],_0x5ccab1;};function _0x20ef3c(_0x450d36,_0x449402,_0x40df64,_0x338817){var _0x45fbcd=_0x5f254e;if(typeof _0x449402===_0x45fbcd(0x8ec))throw new TypeError(_0x45fbcd(0x641));if(typeof ArrayBuffer!==_0x45fbcd(0x3fe)&&_0x449402 instanceof ArrayBuffer)return _0x1f2c03(_0x450d36,_0x449402,_0x40df64,_0x338817);if(typeof _0x449402===_0x45fbcd(0x325))return _0x40e762(_0x450d36,_0x449402,_0x40df64);return _0x37c6a6(_0x450d36,_0x449402);}_0x436365[_0x5f254e(0x6db)]=function(_0x4a6f8d,_0x401f1a,_0x1a5fcb){return _0x20ef3c(null,_0x4a6f8d,_0x401f1a,_0x1a5fcb);};_0x436365[_0x5f254e(0x11a)]&&(_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x498)]=Uint8Array['prototype'],_0x436365['__proto__']=Uint8Array,typeof Symbol!==_0x5f254e(0x3fe)&&Symbol[_0x5f254e(0x200)]&&_0x436365[Symbol['species']]===_0x436365&&Object[_0x5f254e(0x4b6)](_0x436365,Symbol[_0x5f254e(0x200)],{'value':null,'configurable':!![]}));function _0x4aae1c(_0xcf3d06){var _0x1be288=_0x5f254e;if(typeof _0xcf3d06!==_0x1be288(0x8ec))throw new TypeError(_0x1be288(0x226));else{if(_0xcf3d06<0x0)throw new RangeError(_0x1be288(0x5f4));}}function _0x4f38d5(_0x47637b,_0xf089f2,_0x1bbc72,_0x257a73){var _0x5813fb=_0x5f254e;_0x4aae1c(_0xf089f2);if(_0xf089f2<=0x0)return _0x46bc9b(_0x47637b,_0xf089f2);if(_0x1bbc72!==undefined)return typeof _0x257a73===_0x5813fb(0x325)?_0x46bc9b(_0x47637b,_0xf089f2)['fill'](_0x1bbc72,_0x257a73):_0x46bc9b(_0x47637b,_0xf089f2)['fill'](_0x1bbc72);return _0x46bc9b(_0x47637b,_0xf089f2);}_0x436365[_0x5f254e(0x285)]=function(_0x3c37b4,_0x186a72,_0x432412){return _0x4f38d5(null,_0x3c37b4,_0x186a72,_0x432412);};function _0x12b9a9(_0xc4c78f,_0x5eb964){var _0x4181a0=_0x5f254e;_0x4aae1c(_0x5eb964),_0xc4c78f=_0x46bc9b(_0xc4c78f,_0x5eb964<0x0?0x0:_0x14d7a9(_0x5eb964)|0x0);if(!_0x436365[_0x4181a0(0x11a)])for(var _0x16e724=0x0;_0x16e724<_0x5eb964;++_0x16e724){_0xc4c78f[_0x16e724]=0x0;}return _0xc4c78f;}_0x436365[_0x5f254e(0x194)]=function(_0x18d055){return _0x12b9a9(null,_0x18d055);},_0x436365[_0x5f254e(0x8e5)]=function(_0x5cf446){return _0x12b9a9(null,_0x5cf446);};function _0x40e762(_0x30cd96,_0x403b8b,_0x4b54b5){var _0x8317bc=_0x5f254e;(typeof _0x4b54b5!=='string'||_0x4b54b5==='')&&(_0x4b54b5=_0x8317bc(0x701));if(!_0x436365[_0x8317bc(0x51d)](_0x4b54b5))throw new TypeError('\x22encoding\x22\x20must\x20be\x20a\x20valid\x20string\x20encoding');var _0x286441=_0x50e0e6(_0x403b8b,_0x4b54b5)|0x0;_0x30cd96=_0x46bc9b(_0x30cd96,_0x286441);var _0x285ca0=_0x30cd96[_0x8317bc(0x8f9)](_0x403b8b,_0x4b54b5);return _0x285ca0!==_0x286441&&(_0x30cd96=_0x30cd96['slice'](0x0,_0x285ca0)),_0x30cd96;}function _0x19d0e9(_0x18a824,_0x29085f){var _0x5d403f=_0x5f254e,_0xe8dc80=_0x29085f[_0x5d403f(0x404)]<0x0?0x0:_0x14d7a9(_0x29085f[_0x5d403f(0x404)])|0x0;_0x18a824=_0x46bc9b(_0x18a824,_0xe8dc80);for(var _0x276cb9=0x0;_0x276cb9<_0xe8dc80;_0x276cb9+=0x1){_0x18a824[_0x276cb9]=_0x29085f[_0x276cb9]&0xff;}return _0x18a824;}function _0x1f2c03(_0x2c464a,_0x20b638,_0x523d32,_0x416281){var _0x7c2041=_0x5f254e;_0x20b638[_0x7c2041(0x3e6)];if(_0x523d32<0x0||_0x20b638[_0x7c2041(0x3e6)]<_0x523d32)throw new RangeError(_0x7c2041(0x3bc));if(_0x20b638[_0x7c2041(0x3e6)]<_0x523d32+(_0x416281||0x0))throw new RangeError('\x27length\x27\x20is\x20out\x20of\x20bounds');if(_0x523d32===undefined&&_0x416281===undefined)_0x20b638=new Uint8Array(_0x20b638);else _0x416281===undefined?_0x20b638=new Uint8Array(_0x20b638,_0x523d32):_0x20b638=new Uint8Array(_0x20b638,_0x523d32,_0x416281);return _0x436365[_0x7c2041(0x11a)]?(_0x2c464a=_0x20b638,_0x2c464a[_0x7c2041(0x498)]=_0x436365[_0x7c2041(0x59d)]):_0x2c464a=_0x19d0e9(_0x2c464a,_0x20b638),_0x2c464a;}function _0x37c6a6(_0x37c79c,_0x103724){var _0x36a680=_0x5f254e;if(_0x436365[_0x36a680(0xdd)](_0x103724)){var _0x244e89=_0x14d7a9(_0x103724[_0x36a680(0x404)])|0x0;_0x37c79c=_0x46bc9b(_0x37c79c,_0x244e89);if(_0x37c79c[_0x36a680(0x404)]===0x0)return _0x37c79c;return _0x103724[_0x36a680(0x96f)](_0x37c79c,0x0,0x0,_0x244e89),_0x37c79c;}if(_0x103724){if(typeof ArrayBuffer!=='undefined'&&_0x103724['buffer']instanceof ArrayBuffer||_0x36a680(0x404)in _0x103724){if(typeof _0x103724[_0x36a680(0x404)]!==_0x36a680(0x8ec)||_0x41333d(_0x103724[_0x36a680(0x404)]))return _0x46bc9b(_0x37c79c,0x0);return _0x19d0e9(_0x37c79c,_0x103724);}if(_0x103724[_0x36a680(0x669)]===_0x36a680(0x233)&&_0x2811f8(_0x103724[_0x36a680(0x852)]))return _0x19d0e9(_0x37c79c,_0x103724[_0x36a680(0x852)]);}throw new TypeError(_0x36a680(0x56b));}function _0x14d7a9(_0x5cc06b){var _0x225f39=_0x5f254e;if(_0x5cc06b>=_0x342642())throw new RangeError(_0x225f39(0x614)+_0x225f39(0x53d)+_0x342642()[_0x225f39(0x44a)](0x10)+'\x20bytes');return _0x5cc06b|0x0;}function _0x4457f0(_0x54009f){var _0x1cca6a=_0x5f254e;return+_0x54009f!=_0x54009f&&(_0x54009f=0x0),_0x436365[_0x1cca6a(0x285)](+_0x54009f);}_0x436365[_0x5f254e(0xdd)]=function _0x47d72f(_0x153a67){var _0x44809e=_0x5f254e;return!!(_0x153a67!=null&&_0x153a67[_0x44809e(0x488)]);},_0x436365[_0x5f254e(0x442)]=function _0x5432da(_0x155378,_0x29608e){var _0x4e415c=_0x5f254e;if(!_0x436365['isBuffer'](_0x155378)||!_0x436365[_0x4e415c(0xdd)](_0x29608e))throw new TypeError(_0x4e415c(0x84e));if(_0x155378===_0x29608e)return 0x0;var _0x17c498=_0x155378[_0x4e415c(0x404)],_0x4be80f=_0x29608e['length'];for(var _0x1e41aa=0x0,_0xd9c63=Math['min'](_0x17c498,_0x4be80f);_0x1e41aa<_0xd9c63;++_0x1e41aa){if(_0x155378[_0x1e41aa]!==_0x29608e[_0x1e41aa]){_0x17c498=_0x155378[_0x1e41aa],_0x4be80f=_0x29608e[_0x1e41aa];break;}}if(_0x17c498<_0x4be80f)return-0x1;if(_0x4be80f<_0x17c498)return 0x1;return 0x0;},_0x436365[_0x5f254e(0x51d)]=function _0x196e4f(_0x344232){var _0x2850c2=_0x5f254e;switch(String(_0x344232)[_0x2850c2(0x14f)]()){case _0x2850c2(0x260):case _0x2850c2(0x701):case'utf-8':case'ascii':case _0x2850c2(0x31e):case _0x2850c2(0xf1):case _0x2850c2(0x2ee):case'ucs2':case _0x2850c2(0x686):case _0x2850c2(0x2ae):case _0x2850c2(0x39b):return!![];default:return![];}},_0x436365['concat']=function _0x27057a(_0x52f03d,_0x1eba90){var _0x411e5d=_0x5f254e;if(!_0x2811f8(_0x52f03d))throw new TypeError(_0x411e5d(0x26d));if(_0x52f03d[_0x411e5d(0x404)]===0x0)return _0x436365[_0x411e5d(0x285)](0x0);var _0x1f5d30;if(_0x1eba90===undefined){_0x1eba90=0x0;for(_0x1f5d30=0x0;_0x1f5d30<_0x52f03d['length'];++_0x1f5d30){_0x1eba90+=_0x52f03d[_0x1f5d30][_0x411e5d(0x404)];}}var _0x42d90c=_0x436365[_0x411e5d(0x194)](_0x1eba90),_0x26b1e9=0x0;for(_0x1f5d30=0x0;_0x1f5d30<_0x52f03d[_0x411e5d(0x404)];++_0x1f5d30){var _0x427404=_0x52f03d[_0x1f5d30];if(!_0x436365['isBuffer'](_0x427404))throw new TypeError(_0x411e5d(0x26d));_0x427404[_0x411e5d(0x96f)](_0x42d90c,_0x26b1e9),_0x26b1e9+=_0x427404[_0x411e5d(0x404)];}return _0x42d90c;};function _0x50e0e6(_0x19c835,_0x334ac8){var _0x40dc66=_0x5f254e;if(_0x436365['isBuffer'](_0x19c835))return _0x19c835[_0x40dc66(0x404)];if(typeof ArrayBuffer!==_0x40dc66(0x3fe)&&typeof ArrayBuffer[_0x40dc66(0x182)]===_0x40dc66(0x848)&&(ArrayBuffer[_0x40dc66(0x182)](_0x19c835)||_0x19c835 instanceof ArrayBuffer))return _0x19c835['byteLength'];typeof _0x19c835!==_0x40dc66(0x325)&&(_0x19c835=''+_0x19c835);var _0x48047e=_0x19c835[_0x40dc66(0x404)];if(_0x48047e===0x0)return 0x0;var _0x41dfa5=![];for(;;){switch(_0x334ac8){case'ascii':case _0x40dc66(0x31e):case _0x40dc66(0xf1):return _0x48047e;case'utf8':case _0x40dc66(0x800):case undefined:return _0x53ee3e(_0x19c835)[_0x40dc66(0x404)];case'ucs2':case _0x40dc66(0x686):case _0x40dc66(0x2ae):case _0x40dc66(0x39b):return _0x48047e*0x2;case _0x40dc66(0x260):return _0x48047e>>>0x1;case'base64':return _0x42aa35(_0x19c835)['length'];default:if(_0x41dfa5)return _0x53ee3e(_0x19c835)[_0x40dc66(0x404)];_0x334ac8=(''+_0x334ac8)[_0x40dc66(0x14f)](),_0x41dfa5=!![];}}}_0x436365[_0x5f254e(0x3e6)]=_0x50e0e6;function _0x81a357(_0x4da0e1,_0xcae8a4,_0x134c74){var _0x4e948f=_0x5f254e,_0x2c87db=![];(_0xcae8a4===undefined||_0xcae8a4<0x0)&&(_0xcae8a4=0x0);if(_0xcae8a4>this['length'])return'';(_0x134c74===undefined||_0x134c74>this['length'])&&(_0x134c74=this[_0x4e948f(0x404)]);if(_0x134c74<=0x0)return'';_0x134c74>>>=0x0,_0xcae8a4>>>=0x0;if(_0x134c74<=_0xcae8a4)return'';if(!_0x4da0e1)_0x4da0e1=_0x4e948f(0x701);while(!![]){switch(_0x4da0e1){case _0x4e948f(0x260):return _0x1dd02a(this,_0xcae8a4,_0x134c74);case _0x4e948f(0x701):case _0x4e948f(0x800):return _0x4a2702(this,_0xcae8a4,_0x134c74);case _0x4e948f(0x822):return _0x3d3370(this,_0xcae8a4,_0x134c74);case _0x4e948f(0x31e):case _0x4e948f(0xf1):return _0x4f7f89(this,_0xcae8a4,_0x134c74);case _0x4e948f(0x2ee):return _0x54e70e(this,_0xcae8a4,_0x134c74);case'ucs2':case'ucs-2':case'utf16le':case _0x4e948f(0x39b):return _0x115798(this,_0xcae8a4,_0x134c74);default:if(_0x2c87db)throw new TypeError(_0x4e948f(0x82a)+_0x4da0e1);_0x4da0e1=(_0x4da0e1+'')[_0x4e948f(0x14f)](),_0x2c87db=!![];}}}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x488)]=!![];function _0x5e1532(_0x461d66,_0x24badb,_0x595ede){var _0x4e756f=_0x461d66[_0x24badb];_0x461d66[_0x24badb]=_0x461d66[_0x595ede],_0x461d66[_0x595ede]=_0x4e756f;}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x5a7)]=function _0x3b9a46(){var _0x2d87d2=_0x5f254e,_0x5a34b8=this[_0x2d87d2(0x404)];if(_0x5a34b8%0x2!==0x0)throw new RangeError(_0x2d87d2(0x318));for(var _0x30e86a=0x0;_0x30e86a<_0x5a34b8;_0x30e86a+=0x2){_0x5e1532(this,_0x30e86a,_0x30e86a+0x1);}return this;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x61a)]=function _0x277570(){var _0x3a3413=_0x5f254e,_0x57258f=this[_0x3a3413(0x404)];if(_0x57258f%0x4!==0x0)throw new RangeError(_0x3a3413(0x467));for(var _0x2158a8=0x0;_0x2158a8<_0x57258f;_0x2158a8+=0x4){_0x5e1532(this,_0x2158a8,_0x2158a8+0x3),_0x5e1532(this,_0x2158a8+0x1,_0x2158a8+0x2);}return this;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x984)]=function _0x11d659(){var _0x1f1d4d=_0x5f254e,_0x14bf25=this[_0x1f1d4d(0x404)];if(_0x14bf25%0x8!==0x0)throw new RangeError(_0x1f1d4d(0x3fd));for(var _0x1403c9=0x0;_0x1403c9<_0x14bf25;_0x1403c9+=0x8){_0x5e1532(this,_0x1403c9,_0x1403c9+0x7),_0x5e1532(this,_0x1403c9+0x1,_0x1403c9+0x6),_0x5e1532(this,_0x1403c9+0x2,_0x1403c9+0x5),_0x5e1532(this,_0x1403c9+0x3,_0x1403c9+0x4);}return this;},_0x436365['prototype']['toString']=function _0x2fb151(){var _0x10cae3=_0x5f254e,_0x3cc293=this[_0x10cae3(0x404)]|0x0;if(_0x3cc293===0x0)return'';if(arguments['length']===0x0)return _0x4a2702(this,0x0,_0x3cc293);return _0x81a357[_0x10cae3(0x416)](this,arguments);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x25f)]=function _0x20cc19(_0x15225a){var _0x1d2343=_0x5f254e;if(!_0x436365['isBuffer'](_0x15225a))throw new TypeError(_0x1d2343(0x39c));if(this===_0x15225a)return!![];return _0x436365['compare'](this,_0x15225a)===0x0;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x684)]=function _0x3faf5a(){var _0x3d7c3a=_0x5f254e,_0x29a405='',_0xde3747=_0x5330af[_0x3d7c3a(0x3ac)];if(this[_0x3d7c3a(0x404)]>0x0){_0x29a405=this['toString'](_0x3d7c3a(0x260),0x0,_0xde3747)[_0x3d7c3a(0x353)](/.{2}/g)['join']('\x20');if(this[_0x3d7c3a(0x404)]>_0xde3747)_0x29a405+=_0x3d7c3a(0x46a);}return _0x3d7c3a(0x702)+_0x29a405+'>';},_0x436365[_0x5f254e(0x59d)]['compare']=function _0x35d5b3(_0x5eb633,_0x5439cb,_0x4c7fbf,_0x124dce,_0xb86628){var _0x523c1a=_0x5f254e;if(!_0x436365[_0x523c1a(0xdd)](_0x5eb633))throw new TypeError('Argument\x20must\x20be\x20a\x20Buffer');_0x5439cb===undefined&&(_0x5439cb=0x0);_0x4c7fbf===undefined&&(_0x4c7fbf=_0x5eb633?_0x5eb633[_0x523c1a(0x404)]:0x0);_0x124dce===undefined&&(_0x124dce=0x0);_0xb86628===undefined&&(_0xb86628=this[_0x523c1a(0x404)]);if(_0x5439cb<0x0||_0x4c7fbf>_0x5eb633[_0x523c1a(0x404)]||_0x124dce<0x0||_0xb86628>this[_0x523c1a(0x404)])throw new RangeError(_0x523c1a(0x655));if(_0x124dce>=_0xb86628&&_0x5439cb>=_0x4c7fbf)return 0x0;if(_0x124dce>=_0xb86628)return-0x1;if(_0x5439cb>=_0x4c7fbf)return 0x1;_0x5439cb>>>=0x0,_0x4c7fbf>>>=0x0,_0x124dce>>>=0x0,_0xb86628>>>=0x0;if(this===_0x5eb633)return 0x0;var _0x31aa7a=_0xb86628-_0x124dce,_0x5d1c93=_0x4c7fbf-_0x5439cb,_0x2c4214=Math['min'](_0x31aa7a,_0x5d1c93),_0x582734=this[_0x523c1a(0x789)](_0x124dce,_0xb86628),_0x4a3906=_0x5eb633['slice'](_0x5439cb,_0x4c7fbf);for(var _0x23c9a7=0x0;_0x23c9a7<_0x2c4214;++_0x23c9a7){if(_0x582734[_0x23c9a7]!==_0x4a3906[_0x23c9a7]){_0x31aa7a=_0x582734[_0x23c9a7],_0x5d1c93=_0x4a3906[_0x23c9a7];break;}}if(_0x31aa7a<_0x5d1c93)return-0x1;if(_0x5d1c93<_0x31aa7a)return 0x1;return 0x0;};function _0x37105a(_0x1e7194,_0x44ee49,_0x368aaf,_0x39e1e0,_0x15ae3a){var _0x47a727=_0x5f254e;if(_0x1e7194[_0x47a727(0x404)]===0x0)return-0x1;if(typeof _0x368aaf===_0x47a727(0x325))_0x39e1e0=_0x368aaf,_0x368aaf=0x0;else{if(_0x368aaf>0x7fffffff)_0x368aaf=0x7fffffff;else _0x368aaf<-0x80000000&&(_0x368aaf=-0x80000000);}_0x368aaf=+_0x368aaf;isNaN(_0x368aaf)&&(_0x368aaf=_0x15ae3a?0x0:_0x1e7194[_0x47a727(0x404)]-0x1);if(_0x368aaf<0x0)_0x368aaf=_0x1e7194[_0x47a727(0x404)]+_0x368aaf;if(_0x368aaf>=_0x1e7194[_0x47a727(0x404)]){if(_0x15ae3a)return-0x1;else _0x368aaf=_0x1e7194['length']-0x1;}else{if(_0x368aaf<0x0){if(_0x15ae3a)_0x368aaf=0x0;else return-0x1;}}typeof _0x44ee49==='string'&&(_0x44ee49=_0x436365['from'](_0x44ee49,_0x39e1e0));if(_0x436365[_0x47a727(0xdd)](_0x44ee49)){if(_0x44ee49['length']===0x0)return-0x1;return _0x5050f2(_0x1e7194,_0x44ee49,_0x368aaf,_0x39e1e0,_0x15ae3a);}else{if(typeof _0x44ee49===_0x47a727(0x8ec)){_0x44ee49=_0x44ee49&0xff;if(_0x436365[_0x47a727(0x11a)]&&typeof Uint8Array[_0x47a727(0x59d)]['indexOf']==='function')return _0x15ae3a?Uint8Array[_0x47a727(0x59d)][_0x47a727(0x5b5)][_0x47a727(0x7bf)](_0x1e7194,_0x44ee49,_0x368aaf):Uint8Array['prototype'][_0x47a727(0x88e)][_0x47a727(0x7bf)](_0x1e7194,_0x44ee49,_0x368aaf);return _0x5050f2(_0x1e7194,[_0x44ee49],_0x368aaf,_0x39e1e0,_0x15ae3a);}}throw new TypeError(_0x47a727(0x2e2));}function _0x5050f2(_0x4ec724,_0x20d51c,_0xa83eb1,_0x1230f5,_0xf35503){var _0x408179=_0x5f254e,_0x28d96f=0x1,_0xfd89b=_0x4ec724[_0x408179(0x404)],_0x122276=_0x20d51c['length'];if(_0x1230f5!==undefined){_0x1230f5=String(_0x1230f5)[_0x408179(0x14f)]();if(_0x1230f5===_0x408179(0x964)||_0x1230f5==='ucs-2'||_0x1230f5===_0x408179(0x2ae)||_0x1230f5==='utf-16le'){if(_0x4ec724[_0x408179(0x404)]<0x2||_0x20d51c[_0x408179(0x404)]<0x2)return-0x1;_0x28d96f=0x2,_0xfd89b/=0x2,_0x122276/=0x2,_0xa83eb1/=0x2;}}function _0x4139f2(_0x222c52,_0xe20fd5){var _0xecbb21=_0x408179;return _0x28d96f===0x1?_0x222c52[_0xe20fd5]:_0x222c52[_0xecbb21(0x6e5)](_0xe20fd5*_0x28d96f);}var _0x33ec03;if(_0xf35503){var _0x581e8d=-0x1;for(_0x33ec03=_0xa83eb1;_0x33ec03<_0xfd89b;_0x33ec03++){if(_0x4139f2(_0x4ec724,_0x33ec03)===_0x4139f2(_0x20d51c,_0x581e8d===-0x1?0x0:_0x33ec03-_0x581e8d)){if(_0x581e8d===-0x1)_0x581e8d=_0x33ec03;if(_0x33ec03-_0x581e8d+0x1===_0x122276)return _0x581e8d*_0x28d96f;}else{if(_0x581e8d!==-0x1)_0x33ec03-=_0x33ec03-_0x581e8d;_0x581e8d=-0x1;}}}else{if(_0xa83eb1+_0x122276>_0xfd89b)_0xa83eb1=_0xfd89b-_0x122276;for(_0x33ec03=_0xa83eb1;_0x33ec03>=0x0;_0x33ec03--){var _0x21159d=!![];for(var _0x5b367b=0x0;_0x5b367b<_0x122276;_0x5b367b++){if(_0x4139f2(_0x4ec724,_0x33ec03+_0x5b367b)!==_0x4139f2(_0x20d51c,_0x5b367b)){_0x21159d=![];break;}}if(_0x21159d)return _0x33ec03;}}return-0x1;}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x4f6)]=function _0x1d5896(_0x2ace0c,_0x4fb3c6,_0x3e114c){var _0x421e17=_0x5f254e;return this[_0x421e17(0x5b5)](_0x2ace0c,_0x4fb3c6,_0x3e114c)!==-0x1;},_0x436365[_0x5f254e(0x59d)]['indexOf']=function _0x444ffc(_0x11030a,_0xc99736,_0x1eb2dd){return _0x37105a(this,_0x11030a,_0xc99736,_0x1eb2dd,!![]);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x88e)]=function _0x4070c9(_0x1f9372,_0x43e9ca,_0x283129){return _0x37105a(this,_0x1f9372,_0x43e9ca,_0x283129,![]);};function _0x206d66(_0x51248c,_0x483bb7,_0x27dc54,_0x32b58c){var _0x4f3978=_0x5f254e;_0x27dc54=Number(_0x27dc54)||0x0;var _0x47f24f=_0x51248c[_0x4f3978(0x404)]-_0x27dc54;!_0x32b58c?_0x32b58c=_0x47f24f:(_0x32b58c=Number(_0x32b58c),_0x32b58c>_0x47f24f&&(_0x32b58c=_0x47f24f));var _0x4374c4=_0x483bb7[_0x4f3978(0x404)];if(_0x4374c4%0x2!==0x0)throw new TypeError('Invalid\x20hex\x20string');_0x32b58c>_0x4374c4/0x2&&(_0x32b58c=_0x4374c4/0x2);for(var _0x5c53f8=0x0;_0x5c53f8<_0x32b58c;++_0x5c53f8){var _0x333f55=parseInt(_0x483bb7[_0x4f3978(0x863)](_0x5c53f8*0x2,0x2),0x10);if(isNaN(_0x333f55))return _0x5c53f8;_0x51248c[_0x27dc54+_0x5c53f8]=_0x333f55;}return _0x5c53f8;}function _0x1528d9(_0xcdd0bb,_0xc3ae36,_0x160dcc,_0x453ca0){var _0x854ec9=_0x5f254e;return _0x3a41ba(_0x53ee3e(_0xc3ae36,_0xcdd0bb[_0x854ec9(0x404)]-_0x160dcc),_0xcdd0bb,_0x160dcc,_0x453ca0);}function _0x34e5c2(_0x3f330a,_0x210eac,_0x834203,_0x13cdfd){return _0x3a41ba(_0x34a509(_0x210eac),_0x3f330a,_0x834203,_0x13cdfd);}function _0x50db64(_0x50488d,_0x24edd3,_0x1efeec,_0x33596b){return _0x34e5c2(_0x50488d,_0x24edd3,_0x1efeec,_0x33596b);}function _0xd1cc3(_0x49f4af,_0x575a12,_0x46a154,_0x4fd5f2){return _0x3a41ba(_0x42aa35(_0x575a12),_0x49f4af,_0x46a154,_0x4fd5f2);}function _0x40a1a4(_0x1fc5a0,_0x7ce12e,_0x1cd2b7,_0x53b535){return _0x3a41ba(_0x3cc2a1(_0x7ce12e,_0x1fc5a0['length']-_0x1cd2b7),_0x1fc5a0,_0x1cd2b7,_0x53b535);}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x8f9)]=function _0x42dd1f(_0x508ee8,_0x1c3253,_0x46ae14,_0x20ea4a){var _0x4a3004=_0x5f254e;if(_0x1c3253===undefined)_0x20ea4a=_0x4a3004(0x701),_0x46ae14=this[_0x4a3004(0x404)],_0x1c3253=0x0;else{if(_0x46ae14===undefined&&typeof _0x1c3253==='string')_0x20ea4a=_0x1c3253,_0x46ae14=this[_0x4a3004(0x404)],_0x1c3253=0x0;else{if(isFinite(_0x1c3253)){_0x1c3253=_0x1c3253|0x0;if(isFinite(_0x46ae14)){_0x46ae14=_0x46ae14|0x0;if(_0x20ea4a===undefined)_0x20ea4a=_0x4a3004(0x701);}else _0x20ea4a=_0x46ae14,_0x46ae14=undefined;}else throw new Error(_0x4a3004(0x652));}}var _0x2892d1=this[_0x4a3004(0x404)]-_0x1c3253;if(_0x46ae14===undefined||_0x46ae14>_0x2892d1)_0x46ae14=_0x2892d1;if(_0x508ee8[_0x4a3004(0x404)]>0x0&&(_0x46ae14<0x0||_0x1c3253<0x0)||_0x1c3253>this[_0x4a3004(0x404)])throw new RangeError(_0x4a3004(0x7ba));if(!_0x20ea4a)_0x20ea4a=_0x4a3004(0x701);var _0x3c88f2=![];for(;;){switch(_0x20ea4a){case _0x4a3004(0x260):return _0x206d66(this,_0x508ee8,_0x1c3253,_0x46ae14);case _0x4a3004(0x701):case'utf-8':return _0x1528d9(this,_0x508ee8,_0x1c3253,_0x46ae14);case'ascii':return _0x34e5c2(this,_0x508ee8,_0x1c3253,_0x46ae14);case'latin1':case'binary':return _0x50db64(this,_0x508ee8,_0x1c3253,_0x46ae14);case _0x4a3004(0x2ee):return _0xd1cc3(this,_0x508ee8,_0x1c3253,_0x46ae14);case _0x4a3004(0x964):case _0x4a3004(0x686):case'utf16le':case _0x4a3004(0x39b):return _0x40a1a4(this,_0x508ee8,_0x1c3253,_0x46ae14);default:if(_0x3c88f2)throw new TypeError('Unknown\x20encoding:\x20'+_0x20ea4a);_0x20ea4a=(''+_0x20ea4a)['toLowerCase'](),_0x3c88f2=!![];}}},_0x436365['prototype'][_0x5f254e(0x14c)]=function _0x39746d(){var _0x186df7=_0x5f254e;return{'type':'Buffer','data':Array[_0x186df7(0x59d)][_0x186df7(0x789)][_0x186df7(0x7bf)](this['_arr']||this,0x0)};};function _0x54e70e(_0x5807e2,_0x156a87,_0x55422a){var _0x483bb5=_0x5f254e;return _0x156a87===0x0&&_0x55422a===_0x5807e2['length']?_0x1c950c[_0x483bb5(0x268)](_0x5807e2):_0x1c950c[_0x483bb5(0x268)](_0x5807e2['slice'](_0x156a87,_0x55422a));}function _0x4a2702(_0x4061b2,_0x17069d,_0x13bf12){var _0x30a941=_0x5f254e;_0x13bf12=Math[_0x30a941(0x176)](_0x4061b2[_0x30a941(0x404)],_0x13bf12);var _0x4255d1=[],_0x497cc9=_0x17069d;while(_0x497cc9<_0x13bf12){var _0x7a8ccd=_0x4061b2[_0x497cc9],_0x217c94=null,_0x46434e=_0x7a8ccd>0xef?0x4:_0x7a8ccd>0xdf?0x3:_0x7a8ccd>0xbf?0x2:0x1;if(_0x497cc9+_0x46434e<=_0x13bf12){var _0x330915,_0x47d4cf,_0x1aff4e,_0x3d6dd2;switch(_0x46434e){case 0x1:_0x7a8ccd<0x80&&(_0x217c94=_0x7a8ccd);break;case 0x2:_0x330915=_0x4061b2[_0x497cc9+0x1];(_0x330915&0xc0)===0x80&&(_0x3d6dd2=(_0x7a8ccd&0x1f)<<0x6|_0x330915&0x3f,_0x3d6dd2>0x7f&&(_0x217c94=_0x3d6dd2));break;case 0x3:_0x330915=_0x4061b2[_0x497cc9+0x1],_0x47d4cf=_0x4061b2[_0x497cc9+0x2];(_0x330915&0xc0)===0x80&&(_0x47d4cf&0xc0)===0x80&&(_0x3d6dd2=(_0x7a8ccd&0xf)<<0xc|(_0x330915&0x3f)<<0x6|_0x47d4cf&0x3f,_0x3d6dd2>0x7ff&&(_0x3d6dd2<0xd800||_0x3d6dd2>0xdfff)&&(_0x217c94=_0x3d6dd2));break;case 0x4:_0x330915=_0x4061b2[_0x497cc9+0x1],_0x47d4cf=_0x4061b2[_0x497cc9+0x2],_0x1aff4e=_0x4061b2[_0x497cc9+0x3];(_0x330915&0xc0)===0x80&&(_0x47d4cf&0xc0)===0x80&&(_0x1aff4e&0xc0)===0x80&&(_0x3d6dd2=(_0x7a8ccd&0xf)<<0x12|(_0x330915&0x3f)<<0xc|(_0x47d4cf&0x3f)<<0x6|_0x1aff4e&0x3f,_0x3d6dd2>0xffff&&_0x3d6dd2<0x110000&&(_0x217c94=_0x3d6dd2));}}if(_0x217c94===null)_0x217c94=0xfffd,_0x46434e=0x1;else _0x217c94>0xffff&&(_0x217c94-=0x10000,_0x4255d1[_0x30a941(0x333)](_0x217c94>>>0xa&0x3ff|0xd800),_0x217c94=0xdc00|_0x217c94&0x3ff);_0x4255d1['push'](_0x217c94),_0x497cc9+=_0x46434e;}return _0x3d3eaf(_0x4255d1);}var _0x16fa2e=0x1000;function _0x3d3eaf(_0x4e7097){var _0x5acd7a=_0x5f254e,_0x42077c=_0x4e7097[_0x5acd7a(0x404)];if(_0x42077c<=_0x16fa2e)return String[_0x5acd7a(0x9a8)][_0x5acd7a(0x416)](String,_0x4e7097);var _0x51c2ae='',_0x53495=0x0;while(_0x53495<_0x42077c){_0x51c2ae+=String['fromCharCode'][_0x5acd7a(0x416)](String,_0x4e7097[_0x5acd7a(0x789)](_0x53495,_0x53495+=_0x16fa2e));}return _0x51c2ae;}function _0x3d3370(_0x174ed5,_0x3e0066,_0x1ae4aa){var _0xace200=_0x5f254e,_0x300d02='';_0x1ae4aa=Math[_0xace200(0x176)](_0x174ed5['length'],_0x1ae4aa);for(var _0x3c94e2=_0x3e0066;_0x3c94e2<_0x1ae4aa;++_0x3c94e2){_0x300d02+=String[_0xace200(0x9a8)](_0x174ed5[_0x3c94e2]&0x7f);}return _0x300d02;}function _0x4f7f89(_0x4b7347,_0x26921d,_0x1243da){var _0x4f4878=_0x5f254e,_0x23e6a0='';_0x1243da=Math['min'](_0x4b7347['length'],_0x1243da);for(var _0x36eb21=_0x26921d;_0x36eb21<_0x1243da;++_0x36eb21){_0x23e6a0+=String[_0x4f4878(0x9a8)](_0x4b7347[_0x36eb21]);}return _0x23e6a0;}function _0x1dd02a(_0xff6fad,_0x371a46,_0xcd9e37){var _0xe31b2=_0x5f254e,_0xe6ef28=_0xff6fad[_0xe31b2(0x404)];if(!_0x371a46||_0x371a46<0x0)_0x371a46=0x0;if(!_0xcd9e37||_0xcd9e37<0x0||_0xcd9e37>_0xe6ef28)_0xcd9e37=_0xe6ef28;var _0x1ba911='';for(var _0x53e001=_0x371a46;_0x53e001<_0xcd9e37;++_0x53e001){_0x1ba911+=_0x1ca464(_0xff6fad[_0x53e001]);}return _0x1ba911;}function _0x115798(_0x338fc4,_0x71214c,_0x3d48fe){var _0x13c493=_0x5f254e,_0x372ec8=_0x338fc4['slice'](_0x71214c,_0x3d48fe),_0x55974b='';for(var _0x36cfc1=0x0;_0x36cfc1<_0x372ec8[_0x13c493(0x404)];_0x36cfc1+=0x2){_0x55974b+=String[_0x13c493(0x9a8)](_0x372ec8[_0x36cfc1]+_0x372ec8[_0x36cfc1+0x1]*0x100);}return _0x55974b;}_0x436365[_0x5f254e(0x59d)]['slice']=function _0x85f4cc(_0x4e336a,_0x2e9c1d){var _0x1293b3=_0x5f254e,_0x479dd0=this['length'];_0x4e336a=~~_0x4e336a,_0x2e9c1d=_0x2e9c1d===undefined?_0x479dd0:~~_0x2e9c1d;if(_0x4e336a<0x0){_0x4e336a+=_0x479dd0;if(_0x4e336a<0x0)_0x4e336a=0x0;}else _0x4e336a>_0x479dd0&&(_0x4e336a=_0x479dd0);if(_0x2e9c1d<0x0){_0x2e9c1d+=_0x479dd0;if(_0x2e9c1d<0x0)_0x2e9c1d=0x0;}else _0x2e9c1d>_0x479dd0&&(_0x2e9c1d=_0x479dd0);if(_0x2e9c1d<_0x4e336a)_0x2e9c1d=_0x4e336a;var _0x48c7dc;if(_0x436365[_0x1293b3(0x11a)])_0x48c7dc=this[_0x1293b3(0x451)](_0x4e336a,_0x2e9c1d),_0x48c7dc[_0x1293b3(0x498)]=_0x436365[_0x1293b3(0x59d)];else{var _0x1efceb=_0x2e9c1d-_0x4e336a;_0x48c7dc=new _0x436365(_0x1efceb,undefined);for(var _0x1e74bf=0x0;_0x1e74bf<_0x1efceb;++_0x1e74bf){_0x48c7dc[_0x1e74bf]=this[_0x1e74bf+_0x4e336a];}}return _0x48c7dc;};function _0x1b0e82(_0x169b2f,_0x885f2a,_0x1cd50f){var _0x5dcc3c=_0x5f254e;if(_0x169b2f%0x1!==0x0||_0x169b2f<0x0)throw new RangeError('offset\x20is\x20not\x20uint');if(_0x169b2f+_0x885f2a>_0x1cd50f)throw new RangeError(_0x5dcc3c(0x68d));}_0x436365['prototype'][_0x5f254e(0x189)]=function _0x47894c(_0x2e9441,_0x3a87c2,_0x21f7dd){var _0x51eec=_0x5f254e;_0x2e9441=_0x2e9441|0x0,_0x3a87c2=_0x3a87c2|0x0;if(!_0x21f7dd)_0x1b0e82(_0x2e9441,_0x3a87c2,this[_0x51eec(0x404)]);var _0x30166c=this[_0x2e9441],_0x46dfc1=0x1,_0x10885d=0x0;while(++_0x10885d<_0x3a87c2&&(_0x46dfc1*=0x100)){_0x30166c+=this[_0x2e9441+_0x10885d]*_0x46dfc1;}return _0x30166c;},_0x436365[_0x5f254e(0x59d)]['readUIntBE']=function _0x4be1dd(_0x42f92d,_0x132560,_0xc0a2ad){var _0x5b2c50=_0x5f254e;_0x42f92d=_0x42f92d|0x0,_0x132560=_0x132560|0x0;!_0xc0a2ad&&_0x1b0e82(_0x42f92d,_0x132560,this[_0x5b2c50(0x404)]);var _0x477307=this[_0x42f92d+--_0x132560],_0x1b4a2a=0x1;while(_0x132560>0x0&&(_0x1b4a2a*=0x100)){_0x477307+=this[_0x42f92d+--_0x132560]*_0x1b4a2a;}return _0x477307;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x724)]=function _0x63014f(_0xb40d91,_0x16f319){var _0x4c11c5=_0x5f254e;if(!_0x16f319)_0x1b0e82(_0xb40d91,0x1,this[_0x4c11c5(0x404)]);return this[_0xb40d91];},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x871)]=function _0x5d603b(_0x2d27c0,_0x2ba5a7){var _0x277413=_0x5f254e;if(!_0x2ba5a7)_0x1b0e82(_0x2d27c0,0x2,this[_0x277413(0x404)]);return this[_0x2d27c0]|this[_0x2d27c0+0x1]<<0x8;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x6e5)]=function _0x154dd7(_0x54bb01,_0x59fc52){var _0x74e6f2=_0x5f254e;if(!_0x59fc52)_0x1b0e82(_0x54bb01,0x2,this[_0x74e6f2(0x404)]);return this[_0x54bb01]<<0x8|this[_0x54bb01+0x1];},_0x436365[_0x5f254e(0x59d)]['readUInt32LE']=function _0x4e03f0(_0x3afbd7,_0x45a428){var _0x3217b6=_0x5f254e;if(!_0x45a428)_0x1b0e82(_0x3afbd7,0x4,this[_0x3217b6(0x404)]);return(this[_0x3afbd7]|this[_0x3afbd7+0x1]<<0x8|this[_0x3afbd7+0x2]<<0x10)+this[_0x3afbd7+0x3]*0x1000000;},_0x436365[_0x5f254e(0x59d)]['readUInt32BE']=function _0x179bb9(_0x18ce65,_0x3976cd){var _0x9186dd=_0x5f254e;if(!_0x3976cd)_0x1b0e82(_0x18ce65,0x4,this[_0x9186dd(0x404)]);return this[_0x18ce65]*0x1000000+(this[_0x18ce65+0x1]<<0x10|this[_0x18ce65+0x2]<<0x8|this[_0x18ce65+0x3]);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x6cf)]=function _0x2146b3(_0x13179f,_0x2d36aa,_0x59c976){var _0x684435=_0x5f254e;_0x13179f=_0x13179f|0x0,_0x2d36aa=_0x2d36aa|0x0;if(!_0x59c976)_0x1b0e82(_0x13179f,_0x2d36aa,this[_0x684435(0x404)]);var _0x26bb49=this[_0x13179f],_0x1dd9ed=0x1,_0x2ffb1d=0x0;while(++_0x2ffb1d<_0x2d36aa&&(_0x1dd9ed*=0x100)){_0x26bb49+=this[_0x13179f+_0x2ffb1d]*_0x1dd9ed;}_0x1dd9ed*=0x80;if(_0x26bb49>=_0x1dd9ed)_0x26bb49-=Math[_0x684435(0x11f)](0x2,0x8*_0x2d36aa);return _0x26bb49;},_0x436365['prototype'][_0x5f254e(0x745)]=function _0x46090e(_0x596307,_0x4e5d06,_0x297139){var _0x55f0e7=_0x5f254e;_0x596307=_0x596307|0x0,_0x4e5d06=_0x4e5d06|0x0;if(!_0x297139)_0x1b0e82(_0x596307,_0x4e5d06,this[_0x55f0e7(0x404)]);var _0x3942c9=_0x4e5d06,_0x30cb60=0x1,_0x2bd32b=this[_0x596307+--_0x3942c9];while(_0x3942c9>0x0&&(_0x30cb60*=0x100)){_0x2bd32b+=this[_0x596307+--_0x3942c9]*_0x30cb60;}_0x30cb60*=0x80;if(_0x2bd32b>=_0x30cb60)_0x2bd32b-=Math[_0x55f0e7(0x11f)](0x2,0x8*_0x4e5d06);return _0x2bd32b;},_0x436365[_0x5f254e(0x59d)]['readInt8']=function _0x28ef79(_0x437271,_0x3feb11){var _0x284128=_0x5f254e;if(!_0x3feb11)_0x1b0e82(_0x437271,0x1,this[_0x284128(0x404)]);if(!(this[_0x437271]&0x80))return this[_0x437271];return(0xff-this[_0x437271]+0x1)*-0x1;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x6ab)]=function _0x3ca1ce(_0x587dcd,_0x36191a){var _0x4ef05e=_0x5f254e;if(!_0x36191a)_0x1b0e82(_0x587dcd,0x2,this[_0x4ef05e(0x404)]);var _0x5849e7=this[_0x587dcd]|this[_0x587dcd+0x1]<<0x8;return _0x5849e7&0x8000?_0x5849e7|0xffff0000:_0x5849e7;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x5dc)]=function _0x4124a6(_0x3fada8,_0x2dc017){if(!_0x2dc017)_0x1b0e82(_0x3fada8,0x2,this['length']);var _0x30f06a=this[_0x3fada8+0x1]|this[_0x3fada8]<<0x8;return _0x30f06a&0x8000?_0x30f06a|0xffff0000:_0x30f06a;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x94e)]=function _0x5130c9(_0x3db17a,_0x5d4dcc){if(!_0x5d4dcc)_0x1b0e82(_0x3db17a,0x4,this['length']);return this[_0x3db17a]|this[_0x3db17a+0x1]<<0x8|this[_0x3db17a+0x2]<<0x10|this[_0x3db17a+0x3]<<0x18;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x159)]=function _0xa2dee4(_0x1b64ae,_0x3031c3){var _0x5294b9=_0x5f254e;if(!_0x3031c3)_0x1b0e82(_0x1b64ae,0x4,this[_0x5294b9(0x404)]);return this[_0x1b64ae]<<0x18|this[_0x1b64ae+0x1]<<0x10|this[_0x1b64ae+0x2]<<0x8|this[_0x1b64ae+0x3];},_0x436365['prototype'][_0x5f254e(0x543)]=function _0x29d5f9(_0xba0d80,_0x820a3){var _0x4227f5=_0x5f254e;if(!_0x820a3)_0x1b0e82(_0xba0d80,0x4,this[_0x4227f5(0x404)]);return _0x4d96bc[_0x4227f5(0x8fc)](this,_0xba0d80,!![],0x17,0x4);},_0x436365[_0x5f254e(0x59d)]['readFloatBE']=function _0x54e375(_0x4728fe,_0x374d2b){var _0x7a33d5=_0x5f254e;if(!_0x374d2b)_0x1b0e82(_0x4728fe,0x4,this[_0x7a33d5(0x404)]);return _0x4d96bc[_0x7a33d5(0x8fc)](this,_0x4728fe,![],0x17,0x4);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x1e1)]=function _0x55c9eb(_0x44f65e,_0x2c792c){var _0xb47377=_0x5f254e;if(!_0x2c792c)_0x1b0e82(_0x44f65e,0x8,this[_0xb47377(0x404)]);return _0x4d96bc['read'](this,_0x44f65e,!![],0x34,0x8);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x554)]=function _0x2b40bb(_0xd7c8f2,_0x1b79c0){var _0x5d211d=_0x5f254e;if(!_0x1b79c0)_0x1b0e82(_0xd7c8f2,0x8,this[_0x5d211d(0x404)]);return _0x4d96bc['read'](this,_0xd7c8f2,![],0x34,0x8);};function _0x3acb86(_0x22c334,_0x4dad6a,_0x25c2e4,_0x37820e,_0x1493eb,_0x349fa8){var _0x230b3e=_0x5f254e;if(!_0x436365[_0x230b3e(0xdd)](_0x22c334))throw new TypeError(_0x230b3e(0x2a0));if(_0x4dad6a>_0x1493eb||_0x4dad6a<_0x349fa8)throw new RangeError(_0x230b3e(0x97e));if(_0x25c2e4+_0x37820e>_0x22c334[_0x230b3e(0x404)])throw new RangeError('Index\x20out\x20of\x20range');}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x248)]=function _0xf4af4c(_0x24b013,_0x3c03db,_0x3a14ad,_0x27e7fd){var _0x5942dd=_0x5f254e;_0x24b013=+_0x24b013,_0x3c03db=_0x3c03db|0x0,_0x3a14ad=_0x3a14ad|0x0;if(!_0x27e7fd){var _0x21fa85=Math[_0x5942dd(0x11f)](0x2,0x8*_0x3a14ad)-0x1;_0x3acb86(this,_0x24b013,_0x3c03db,_0x3a14ad,_0x21fa85,0x0);}var _0x45e1a2=0x1,_0x1ebc66=0x0;this[_0x3c03db]=_0x24b013&0xff;while(++_0x1ebc66<_0x3a14ad&&(_0x45e1a2*=0x100)){this[_0x3c03db+_0x1ebc66]=_0x24b013/_0x45e1a2&0xff;}return _0x3c03db+_0x3a14ad;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x12f)]=function _0x59fa9e(_0xd1196a,_0x35ebd8,_0x3433de,_0x5c998c){var _0x21bbfa=_0x5f254e;_0xd1196a=+_0xd1196a,_0x35ebd8=_0x35ebd8|0x0,_0x3433de=_0x3433de|0x0;if(!_0x5c998c){var _0x1ee1f8=Math[_0x21bbfa(0x11f)](0x2,0x8*_0x3433de)-0x1;_0x3acb86(this,_0xd1196a,_0x35ebd8,_0x3433de,_0x1ee1f8,0x0);}var _0x2c7a6b=_0x3433de-0x1,_0x12998f=0x1;this[_0x35ebd8+_0x2c7a6b]=_0xd1196a&0xff;while(--_0x2c7a6b>=0x0&&(_0x12998f*=0x100)){this[_0x35ebd8+_0x2c7a6b]=_0xd1196a/_0x12998f&0xff;}return _0x35ebd8+_0x3433de;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x5ab)]=function _0x2ef60b(_0x22d386,_0x34bee6,_0x2098c7){var _0x4400b3=_0x5f254e;_0x22d386=+_0x22d386,_0x34bee6=_0x34bee6|0x0;if(!_0x2098c7)_0x3acb86(this,_0x22d386,_0x34bee6,0x1,0xff,0x0);if(!_0x436365[_0x4400b3(0x11a)])_0x22d386=Math[_0x4400b3(0x7ee)](_0x22d386);return this[_0x34bee6]=_0x22d386&0xff,_0x34bee6+0x1;};function _0x56c0f6(_0x37bd39,_0x3d0a69,_0x18eab7,_0x39c695){var _0x3ecdd1=_0x5f254e;if(_0x3d0a69<0x0)_0x3d0a69=0xffff+_0x3d0a69+0x1;for(var _0x34e4db=0x0,_0x220cf0=Math[_0x3ecdd1(0x176)](_0x37bd39[_0x3ecdd1(0x404)]-_0x18eab7,0x2);_0x34e4db<_0x220cf0;++_0x34e4db){_0x37bd39[_0x18eab7+_0x34e4db]=(_0x3d0a69&0xff<<0x8*(_0x39c695?_0x34e4db:0x1-_0x34e4db))>>>(_0x39c695?_0x34e4db:0x1-_0x34e4db)*0x8;}}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x736)]=function _0xfa453a(_0x5614bc,_0x1fc76c,_0x229e40){_0x5614bc=+_0x5614bc,_0x1fc76c=_0x1fc76c|0x0;if(!_0x229e40)_0x3acb86(this,_0x5614bc,_0x1fc76c,0x2,0xffff,0x0);return _0x436365['TYPED_ARRAY_SUPPORT']?(this[_0x1fc76c]=_0x5614bc&0xff,this[_0x1fc76c+0x1]=_0x5614bc>>>0x8):_0x56c0f6(this,_0x5614bc,_0x1fc76c,!![]),_0x1fc76c+0x2;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x21b)]=function _0x2d6e66(_0x45ef59,_0x2c1ecf,_0x3ab7d0){var _0x3e186a=_0x5f254e;_0x45ef59=+_0x45ef59,_0x2c1ecf=_0x2c1ecf|0x0;if(!_0x3ab7d0)_0x3acb86(this,_0x45ef59,_0x2c1ecf,0x2,0xffff,0x0);return _0x436365[_0x3e186a(0x11a)]?(this[_0x2c1ecf]=_0x45ef59>>>0x8,this[_0x2c1ecf+0x1]=_0x45ef59&0xff):_0x56c0f6(this,_0x45ef59,_0x2c1ecf,![]),_0x2c1ecf+0x2;};function _0x108ab6(_0x3f9795,_0x2728e0,_0x5b9753,_0x2034ab){if(_0x2728e0<0x0)_0x2728e0=0xffffffff+_0x2728e0+0x1;for(var _0x50fc26=0x0,_0x248190=Math['min'](_0x3f9795['length']-_0x5b9753,0x4);_0x50fc26<_0x248190;++_0x50fc26){_0x3f9795[_0x5b9753+_0x50fc26]=_0x2728e0>>>(_0x2034ab?_0x50fc26:0x3-_0x50fc26)*0x8&0xff;}}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x7d1)]=function _0x71e6fe(_0x4fcfce,_0x3fffcb,_0x218570){var _0x721bcf=_0x5f254e;_0x4fcfce=+_0x4fcfce,_0x3fffcb=_0x3fffcb|0x0;if(!_0x218570)_0x3acb86(this,_0x4fcfce,_0x3fffcb,0x4,0xffffffff,0x0);return _0x436365[_0x721bcf(0x11a)]?(this[_0x3fffcb+0x3]=_0x4fcfce>>>0x18,this[_0x3fffcb+0x2]=_0x4fcfce>>>0x10,this[_0x3fffcb+0x1]=_0x4fcfce>>>0x8,this[_0x3fffcb]=_0x4fcfce&0xff):_0x108ab6(this,_0x4fcfce,_0x3fffcb,!![]),_0x3fffcb+0x4;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x8b4)]=function _0x51dfe5(_0xdc26a,_0x1466f5,_0x1c4e4c){var _0x284d3b=_0x5f254e;_0xdc26a=+_0xdc26a,_0x1466f5=_0x1466f5|0x0;if(!_0x1c4e4c)_0x3acb86(this,_0xdc26a,_0x1466f5,0x4,0xffffffff,0x0);return _0x436365[_0x284d3b(0x11a)]?(this[_0x1466f5]=_0xdc26a>>>0x18,this[_0x1466f5+0x1]=_0xdc26a>>>0x10,this[_0x1466f5+0x2]=_0xdc26a>>>0x8,this[_0x1466f5+0x3]=_0xdc26a&0xff):_0x108ab6(this,_0xdc26a,_0x1466f5,![]),_0x1466f5+0x4;},_0x436365[_0x5f254e(0x59d)]['writeIntLE']=function _0x49d72a(_0x277313,_0x86581b,_0x168129,_0x4354e4){_0x277313=+_0x277313,_0x86581b=_0x86581b|0x0;if(!_0x4354e4){var _0xd0c412=Math['pow'](0x2,0x8*_0x168129-0x1);_0x3acb86(this,_0x277313,_0x86581b,_0x168129,_0xd0c412-0x1,-_0xd0c412);}var _0x2161ec=0x0,_0x1df572=0x1,_0x4113c9=0x0;this[_0x86581b]=_0x277313&0xff;while(++_0x2161ec<_0x168129&&(_0x1df572*=0x100)){_0x277313<0x0&&_0x4113c9===0x0&&this[_0x86581b+_0x2161ec-0x1]!==0x0&&(_0x4113c9=0x1),this[_0x86581b+_0x2161ec]=(_0x277313/_0x1df572>>0x0)-_0x4113c9&0xff;}return _0x86581b+_0x168129;},_0x436365[_0x5f254e(0x59d)]['writeIntBE']=function _0xb00ba5(_0x2f0924,_0x458a79,_0x37e165,_0x112ab8){var _0x129ac1=_0x5f254e;_0x2f0924=+_0x2f0924,_0x458a79=_0x458a79|0x0;if(!_0x112ab8){var _0xb7f0b4=Math[_0x129ac1(0x11f)](0x2,0x8*_0x37e165-0x1);_0x3acb86(this,_0x2f0924,_0x458a79,_0x37e165,_0xb7f0b4-0x1,-_0xb7f0b4);}var _0x5dc414=_0x37e165-0x1,_0x22a4f1=0x1,_0x3c3b2e=0x0;this[_0x458a79+_0x5dc414]=_0x2f0924&0xff;while(--_0x5dc414>=0x0&&(_0x22a4f1*=0x100)){_0x2f0924<0x0&&_0x3c3b2e===0x0&&this[_0x458a79+_0x5dc414+0x1]!==0x0&&(_0x3c3b2e=0x1),this[_0x458a79+_0x5dc414]=(_0x2f0924/_0x22a4f1>>0x0)-_0x3c3b2e&0xff;}return _0x458a79+_0x37e165;},_0x436365[_0x5f254e(0x59d)]['writeInt8']=function _0x1b6eeb(_0x50014d,_0x1e9fe3,_0x5232d2){var _0x4c2b75=_0x5f254e;_0x50014d=+_0x50014d,_0x1e9fe3=_0x1e9fe3|0x0;if(!_0x5232d2)_0x3acb86(this,_0x50014d,_0x1e9fe3,0x1,0x7f,-0x80);if(!_0x436365[_0x4c2b75(0x11a)])_0x50014d=Math[_0x4c2b75(0x7ee)](_0x50014d);if(_0x50014d<0x0)_0x50014d=0xff+_0x50014d+0x1;return this[_0x1e9fe3]=_0x50014d&0xff,_0x1e9fe3+0x1;},_0x436365['prototype'][_0x5f254e(0x50a)]=function _0x430706(_0x26b1b7,_0x435e58,_0x33e5a0){var _0x1a2c26=_0x5f254e;_0x26b1b7=+_0x26b1b7,_0x435e58=_0x435e58|0x0;if(!_0x33e5a0)_0x3acb86(this,_0x26b1b7,_0x435e58,0x2,0x7fff,-0x8000);return _0x436365[_0x1a2c26(0x11a)]?(this[_0x435e58]=_0x26b1b7&0xff,this[_0x435e58+0x1]=_0x26b1b7>>>0x8):_0x56c0f6(this,_0x26b1b7,_0x435e58,!![]),_0x435e58+0x2;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x1ce)]=function _0x10bdec(_0x1aefa2,_0x1aff0b,_0x2cf45d){var _0x2bd80c=_0x5f254e;_0x1aefa2=+_0x1aefa2,_0x1aff0b=_0x1aff0b|0x0;if(!_0x2cf45d)_0x3acb86(this,_0x1aefa2,_0x1aff0b,0x2,0x7fff,-0x8000);return _0x436365[_0x2bd80c(0x11a)]?(this[_0x1aff0b]=_0x1aefa2>>>0x8,this[_0x1aff0b+0x1]=_0x1aefa2&0xff):_0x56c0f6(this,_0x1aefa2,_0x1aff0b,![]),_0x1aff0b+0x2;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x25b)]=function _0x27d884(_0x5e8499,_0x4e7407,_0x5cedc7){var _0x3e5ef8=_0x5f254e;_0x5e8499=+_0x5e8499,_0x4e7407=_0x4e7407|0x0;if(!_0x5cedc7)_0x3acb86(this,_0x5e8499,_0x4e7407,0x4,0x7fffffff,-0x80000000);return _0x436365[_0x3e5ef8(0x11a)]?(this[_0x4e7407]=_0x5e8499&0xff,this[_0x4e7407+0x1]=_0x5e8499>>>0x8,this[_0x4e7407+0x2]=_0x5e8499>>>0x10,this[_0x4e7407+0x3]=_0x5e8499>>>0x18):_0x108ab6(this,_0x5e8499,_0x4e7407,!![]),_0x4e7407+0x4;},_0x436365[_0x5f254e(0x59d)]['writeInt32BE']=function _0x1f8300(_0x104004,_0xa70686,_0xbc2084){var _0x41766d=_0x5f254e;_0x104004=+_0x104004,_0xa70686=_0xa70686|0x0;if(!_0xbc2084)_0x3acb86(this,_0x104004,_0xa70686,0x4,0x7fffffff,-0x80000000);if(_0x104004<0x0)_0x104004=0xffffffff+_0x104004+0x1;return _0x436365[_0x41766d(0x11a)]?(this[_0xa70686]=_0x104004>>>0x18,this[_0xa70686+0x1]=_0x104004>>>0x10,this[_0xa70686+0x2]=_0x104004>>>0x8,this[_0xa70686+0x3]=_0x104004&0xff):_0x108ab6(this,_0x104004,_0xa70686,![]),_0xa70686+0x4;};function _0x1bdf5b(_0x3f93f4,_0x17fabc,_0x44379b,_0x1cb699,_0x373225,_0xe35551){var _0x5877ef=_0x5f254e;if(_0x44379b+_0x1cb699>_0x3f93f4[_0x5877ef(0x404)])throw new RangeError(_0x5877ef(0x84f));if(_0x44379b<0x0)throw new RangeError('Index\x20out\x20of\x20range');}function _0x1b1c84(_0x3c3f56,_0x344451,_0x54b06a,_0x51b96a,_0x53292c){var _0x42b8ee=_0x5f254e;return!_0x53292c&&_0x1bdf5b(_0x3c3f56,_0x344451,_0x54b06a,0x4,0xffffff00000000000000000000000000,-0xffffff00000000000000000000000000),_0x4d96bc[_0x42b8ee(0x8f9)](_0x3c3f56,_0x344451,_0x54b06a,_0x51b96a,0x17,0x4),_0x54b06a+0x4;}_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x300)]=function _0x405fa1(_0xe6e43f,_0x4c2072,_0x381cbb){return _0x1b1c84(this,_0xe6e43f,_0x4c2072,!![],_0x381cbb);},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0xff)]=function _0x255004(_0x3340e8,_0x5669a6,_0x5b843d){return _0x1b1c84(this,_0x3340e8,_0x5669a6,![],_0x5b843d);};function _0x2c1679(_0x1363d1,_0xf96881,_0x11322b,_0x58bc07,_0x1f2b6c){var _0xc7c30=_0x5f254e;return!_0x1f2b6c&&_0x1bdf5b(_0x1363d1,_0xf96881,_0x11322b,0x8,0xfffffffffffff800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-0xfffffffffffff800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),_0x4d96bc[_0xc7c30(0x8f9)](_0x1363d1,_0xf96881,_0x11322b,_0x58bc07,0x34,0x8),_0x11322b+0x8;}_0x436365['prototype'][_0x5f254e(0x16d)]=function _0x5e0bb5(_0x4f78fb,_0x12e923,_0x223e15){return _0x2c1679(this,_0x4f78fb,_0x12e923,!![],_0x223e15);},_0x436365['prototype'][_0x5f254e(0x7cb)]=function _0x41c5a9(_0x2d5e44,_0x7ff114,_0x139c0a){return _0x2c1679(this,_0x2d5e44,_0x7ff114,![],_0x139c0a);},_0x436365['prototype'][_0x5f254e(0x96f)]=function _0x4e9db7(_0x2ff68e,_0x4f7e2d,_0x54d420,_0x56d2f9){var _0x323bed=_0x5f254e;if(!_0x54d420)_0x54d420=0x0;if(!_0x56d2f9&&_0x56d2f9!==0x0)_0x56d2f9=this[_0x323bed(0x404)];if(_0x4f7e2d>=_0x2ff68e[_0x323bed(0x404)])_0x4f7e2d=_0x2ff68e[_0x323bed(0x404)];if(!_0x4f7e2d)_0x4f7e2d=0x0;if(_0x56d2f9>0x0&&_0x56d2f9<_0x54d420)_0x56d2f9=_0x54d420;if(_0x56d2f9===_0x54d420)return 0x0;if(_0x2ff68e['length']===0x0||this['length']===0x0)return 0x0;if(_0x4f7e2d<0x0)throw new RangeError(_0x323bed(0x2ac));if(_0x54d420<0x0||_0x54d420>=this[_0x323bed(0x404)])throw new RangeError(_0x323bed(0x758));if(_0x56d2f9<0x0)throw new RangeError(_0x323bed(0x7e4));if(_0x56d2f9>this[_0x323bed(0x404)])_0x56d2f9=this[_0x323bed(0x404)];_0x2ff68e['length']-_0x4f7e2d<_0x56d2f9-_0x54d420&&(_0x56d2f9=_0x2ff68e['length']-_0x4f7e2d+_0x54d420);var _0x4bb28e=_0x56d2f9-_0x54d420,_0x1ba698;if(this===_0x2ff68e&&_0x54d420<_0x4f7e2d&&_0x4f7e2d<_0x56d2f9)for(_0x1ba698=_0x4bb28e-0x1;_0x1ba698>=0x0;--_0x1ba698){_0x2ff68e[_0x1ba698+_0x4f7e2d]=this[_0x1ba698+_0x54d420];}else{if(_0x4bb28e<0x3e8||!_0x436365[_0x323bed(0x11a)])for(_0x1ba698=0x0;_0x1ba698<_0x4bb28e;++_0x1ba698){_0x2ff68e[_0x1ba698+_0x4f7e2d]=this[_0x1ba698+_0x54d420];}else Uint8Array[_0x323bed(0x59d)]['set'][_0x323bed(0x7bf)](_0x2ff68e,this[_0x323bed(0x451)](_0x54d420,_0x54d420+_0x4bb28e),_0x4f7e2d);}return _0x4bb28e;},_0x436365[_0x5f254e(0x59d)][_0x5f254e(0x749)]=function _0x48b84f(_0x3085be,_0x308da2,_0x3fcc00,_0x11fb71){var _0x40c4d4=_0x5f254e;if(typeof _0x3085be===_0x40c4d4(0x325)){if(typeof _0x308da2===_0x40c4d4(0x325))_0x11fb71=_0x308da2,_0x308da2=0x0,_0x3fcc00=this[_0x40c4d4(0x404)];else typeof _0x3fcc00==='string'&&(_0x11fb71=_0x3fcc00,_0x3fcc00=this[_0x40c4d4(0x404)]);if(_0x3085be[_0x40c4d4(0x404)]===0x1){var _0x1360da=_0x3085be[_0x40c4d4(0x2a2)](0x0);_0x1360da<0x100&&(_0x3085be=_0x1360da);}if(_0x11fb71!==undefined&&typeof _0x11fb71!==_0x40c4d4(0x325))throw new TypeError(_0x40c4d4(0x207));if(typeof _0x11fb71===_0x40c4d4(0x325)&&!_0x436365['isEncoding'](_0x11fb71))throw new TypeError(_0x40c4d4(0x82a)+_0x11fb71);}else typeof _0x3085be==='number'&&(_0x3085be=_0x3085be&0xff);if(_0x308da2<0x0||this[_0x40c4d4(0x404)]<_0x308da2||this[_0x40c4d4(0x404)]<_0x3fcc00)throw new RangeError(_0x40c4d4(0x28d));if(_0x3fcc00<=_0x308da2)return this;_0x308da2=_0x308da2>>>0x0,_0x3fcc00=_0x3fcc00===undefined?this[_0x40c4d4(0x404)]:_0x3fcc00>>>0x0;if(!_0x3085be)_0x3085be=0x0;var _0x5bf24b;if(typeof _0x3085be===_0x40c4d4(0x8ec))for(_0x5bf24b=_0x308da2;_0x5bf24b<_0x3fcc00;++_0x5bf24b){this[_0x5bf24b]=_0x3085be;}else{var _0x2ce25d=_0x436365[_0x40c4d4(0xdd)](_0x3085be)?_0x3085be:_0x53ee3e(new _0x436365(_0x3085be,_0x11fb71)[_0x40c4d4(0x44a)]()),_0x5a3490=_0x2ce25d[_0x40c4d4(0x404)];for(_0x5bf24b=0x0;_0x5bf24b<_0x3fcc00-_0x308da2;++_0x5bf24b){this[_0x5bf24b+_0x308da2]=_0x2ce25d[_0x5bf24b%_0x5a3490];}}return this;};var _0x354610=/[^+\/0-9A-Za-z-_]/g;function _0xb02d07(_0x58d46d){_0x58d46d=_0x499abe(_0x58d46d)['replace'](_0x354610,'');if(_0x58d46d['length']<0x2)return'';while(_0x58d46d['length']%0x4!==0x0){_0x58d46d=_0x58d46d+'=';}return _0x58d46d;}function _0x499abe(_0x539fa8){var _0x5ba921=_0x5f254e;if(_0x539fa8[_0x5ba921(0x94b)])return _0x539fa8[_0x5ba921(0x94b)]();return _0x539fa8[_0x5ba921(0x759)](/^\s+|\s+$/g,'');}function _0x1ca464(_0x87e6dc){var _0x1b487a=_0x5f254e;if(_0x87e6dc<0x10)return'0'+_0x87e6dc[_0x1b487a(0x44a)](0x10);return _0x87e6dc['toString'](0x10);}function _0x53ee3e(_0x169960,_0x496fce){var _0x5d0927=_0x5f254e;_0x496fce=_0x496fce||Infinity;var _0x40a0e0,_0x4956c4=_0x169960['length'],_0x75dab5=null,_0x46caed=[];for(var _0x530827=0x0;_0x530827<_0x4956c4;++_0x530827){_0x40a0e0=_0x169960['charCodeAt'](_0x530827);if(_0x40a0e0>0xd7ff&&_0x40a0e0<0xe000){if(!_0x75dab5){if(_0x40a0e0>0xdbff){if((_0x496fce-=0x3)>-0x1)_0x46caed[_0x5d0927(0x333)](0xef,0xbf,0xbd);continue;}else{if(_0x530827+0x1===_0x4956c4){if((_0x496fce-=0x3)>-0x1)_0x46caed['push'](0xef,0xbf,0xbd);continue;}}_0x75dab5=_0x40a0e0;continue;}if(_0x40a0e0<0xdc00){if((_0x496fce-=0x3)>-0x1)_0x46caed[_0x5d0927(0x333)](0xef,0xbf,0xbd);_0x75dab5=_0x40a0e0;continue;}_0x40a0e0=(_0x75dab5-0xd800<<0xa|_0x40a0e0-0xdc00)+0x10000;}else{if(_0x75dab5){if((_0x496fce-=0x3)>-0x1)_0x46caed['push'](0xef,0xbf,0xbd);}}_0x75dab5=null;if(_0x40a0e0<0x80){if((_0x496fce-=0x1)<0x0)break;_0x46caed['push'](_0x40a0e0);}else{if(_0x40a0e0<0x800){if((_0x496fce-=0x2)<0x0)break;_0x46caed[_0x5d0927(0x333)](_0x40a0e0>>0x6|0xc0,_0x40a0e0&0x3f|0x80);}else{if(_0x40a0e0<0x10000){if((_0x496fce-=0x3)<0x0)break;_0x46caed[_0x5d0927(0x333)](_0x40a0e0>>0xc|0xe0,_0x40a0e0>>0x6&0x3f|0x80,_0x40a0e0&0x3f|0x80);}else{if(_0x40a0e0<0x110000){if((_0x496fce-=0x4)<0x0)break;_0x46caed[_0x5d0927(0x333)](_0x40a0e0>>0x12|0xf0,_0x40a0e0>>0xc&0x3f|0x80,_0x40a0e0>>0x6&0x3f|0x80,_0x40a0e0&0x3f|0x80);}else throw new Error(_0x5d0927(0x87b));}}}}return _0x46caed;}function _0x34a509(_0x4ec164){var _0x2106e8=_0x5f254e,_0x283b3c=[];for(var _0x22959c=0x0;_0x22959c<_0x4ec164[_0x2106e8(0x404)];++_0x22959c){_0x283b3c[_0x2106e8(0x333)](_0x4ec164[_0x2106e8(0x2a2)](_0x22959c)&0xff);}return _0x283b3c;}function _0x3cc2a1(_0x204a73,_0x791532){var _0x52c228=_0x5f254e,_0x200c51,_0x167e33,_0x3815a3,_0x2c447d=[];for(var _0x561564=0x0;_0x561564<_0x204a73['length'];++_0x561564){if((_0x791532-=0x2)<0x0)break;_0x200c51=_0x204a73[_0x52c228(0x2a2)](_0x561564),_0x167e33=_0x200c51>>0x8,_0x3815a3=_0x200c51%0x100,_0x2c447d[_0x52c228(0x333)](_0x3815a3),_0x2c447d['push'](_0x167e33);}return _0x2c447d;}function _0x42aa35(_0xc31523){var _0x2a451d=_0x5f254e;return _0x1c950c[_0x2a451d(0xdc)](_0xb02d07(_0xc31523));}function _0x3a41ba(_0x4386a5,_0x24697b,_0x23eccf,_0x28280a){var _0x18fca9=_0x5f254e;for(var _0x4e2bd6=0x0;_0x4e2bd6<_0x28280a;++_0x4e2bd6){if(_0x4e2bd6+_0x23eccf>=_0x24697b[_0x18fca9(0x404)]||_0x4e2bd6>=_0x4386a5[_0x18fca9(0x404)])break;_0x24697b[_0x4e2bd6+_0x23eccf]=_0x4386a5[_0x4e2bd6];}return _0x4e2bd6;}function _0x41333d(_0x587f3e){return _0x587f3e!==_0x587f3e;}}['call'](this,_0xc76248(_0x2e1773(0x469))));},'./node_modules/buffer/node_modules/isarray/index.js':function(_0xf5516c,_0x490f70){var _0x12862b=_0xfd30c1,_0x40eb5a={}[_0x12862b(0x44a)];_0xf5516c[_0x12862b(0x245)]=Array[_0x12862b(0x91b)]||function(_0x5c969a){var _0x47d22d=_0x12862b;return _0x40eb5a[_0x47d22d(0x7bf)](_0x5c969a)==_0x47d22d(0x4b8);};},'./node_modules/charenc/charenc.js':function(_0x261151,_0x53c4ef){var _0x355d3b=_0xfd30c1,_0x221506={'utf8':{'stringToBytes':function(_0x46097b){var _0x1a1597=_0x2943;return _0x221506['bin'][_0x1a1597(0xd9)](unescape(encodeURIComponent(_0x46097b)));},'bytesToString':function(_0x328e26){var _0x39e4eb=_0x2943;return decodeURIComponent(escape(_0x221506[_0x39e4eb(0x424)][_0x39e4eb(0x8f7)](_0x328e26)));}},'bin':{'stringToBytes':function(_0x2e0ef9){var _0x52fd35=_0x2943;for(var _0x35e714=[],_0x2445f3=0x0;_0x2445f3<_0x2e0ef9[_0x52fd35(0x404)];_0x2445f3++)_0x35e714[_0x52fd35(0x333)](_0x2e0ef9['charCodeAt'](_0x2445f3)&0xff);return _0x35e714;},'bytesToString':function(_0x37d078){var _0x34b9ba=_0x2943;for(var _0x35fdf4=[],_0x505f93=0x0;_0x505f93<_0x37d078[_0x34b9ba(0x404)];_0x505f93++)_0x35fdf4[_0x34b9ba(0x333)](String[_0x34b9ba(0x9a8)](_0x37d078[_0x505f93]));return _0x35fdf4['join']('');}}};_0x261151[_0x355d3b(0x245)]=_0x221506;},'./node_modules/crypt/crypt.js':function(_0x23d22a,_0x1f4271){(function(){var _0x15c69c=_0x2943,_0x294e2d=_0x15c69c(0x8a9),_0xa45ed5={'rotl':function(_0x3c379b,_0x8d954e){return _0x3c379b<<_0x8d954e|_0x3c379b>>>0x20-_0x8d954e;},'rotr':function(_0x70346d,_0x509d07){return _0x70346d<<0x20-_0x509d07|_0x70346d>>>_0x509d07;},'endian':function(_0x29b77f){var _0x3df74c=_0x15c69c;if(_0x29b77f[_0x3df74c(0x700)]==Number)return _0xa45ed5[_0x3df74c(0x63f)](_0x29b77f,0x8)&0xff00ff|_0xa45ed5[_0x3df74c(0x63f)](_0x29b77f,0x18)&0xff00ff00;for(var _0x6080a1=0x0;_0x6080a1<_0x29b77f[_0x3df74c(0x404)];_0x6080a1++)_0x29b77f[_0x6080a1]=_0xa45ed5[_0x3df74c(0x414)](_0x29b77f[_0x6080a1]);return _0x29b77f;},'randomBytes':function(_0x156ed2){var _0x686c99=_0x15c69c;for(var _0x3acc6a=[];_0x156ed2>0x0;_0x156ed2--)_0x3acc6a[_0x686c99(0x333)](Math['floor'](Math[_0x686c99(0x459)]()*0x100));return _0x3acc6a;},'bytesToWords':function(_0x4d6fa7){var _0x2a5e25=_0x15c69c;for(var _0x4ee991=[],_0x2d91c1=0x0,_0x22c85a=0x0;_0x2d91c1<_0x4d6fa7[_0x2a5e25(0x404)];_0x2d91c1++,_0x22c85a+=0x8)_0x4ee991[_0x22c85a>>>0x5]|=_0x4d6fa7[_0x2d91c1]<<0x18-_0x22c85a%0x20;return _0x4ee991;},'wordsToBytes':function(_0x1ba666){var _0x5920a4=_0x15c69c;for(var _0x237e3c=[],_0x2572f2=0x0;_0x2572f2<_0x1ba666[_0x5920a4(0x404)]*0x20;_0x2572f2+=0x8)_0x237e3c[_0x5920a4(0x333)](_0x1ba666[_0x2572f2>>>0x5]>>>0x18-_0x2572f2%0x20&0xff);return _0x237e3c;},'bytesToHex':function(_0x5f1d34){var _0x502972=_0x15c69c;for(var _0x5cdc31=[],_0x1be3cc=0x0;_0x1be3cc<_0x5f1d34['length'];_0x1be3cc++){_0x5cdc31[_0x502972(0x333)]((_0x5f1d34[_0x1be3cc]>>>0x4)[_0x502972(0x44a)](0x10)),_0x5cdc31[_0x502972(0x333)]((_0x5f1d34[_0x1be3cc]&0xf)['toString'](0x10));}return _0x5cdc31[_0x502972(0x64e)]('');},'hexToBytes':function(_0x17c3df){var _0x22d088=_0x15c69c;for(var _0x3e29c9=[],_0x4a7b94=0x0;_0x4a7b94<_0x17c3df[_0x22d088(0x404)];_0x4a7b94+=0x2)_0x3e29c9[_0x22d088(0x333)](parseInt(_0x17c3df['substr'](_0x4a7b94,0x2),0x10));return _0x3e29c9;},'bytesToBase64':function(_0x34f9c9){var _0x17c26f=_0x15c69c;for(var _0x573bbe=[],_0x3dce00=0x0;_0x3dce00<_0x34f9c9[_0x17c26f(0x404)];_0x3dce00+=0x3){var _0x1445ca=_0x34f9c9[_0x3dce00]<<0x10|_0x34f9c9[_0x3dce00+0x1]<<0x8|_0x34f9c9[_0x3dce00+0x2];for(var _0x132007=0x0;_0x132007<0x4;_0x132007++)if(_0x3dce00*0x8+_0x132007*0x6<=_0x34f9c9[_0x17c26f(0x404)]*0x8)_0x573bbe[_0x17c26f(0x333)](_0x294e2d[_0x17c26f(0x297)](_0x1445ca>>>0x6*(0x3-_0x132007)&0x3f));else _0x573bbe['push']('=');}return _0x573bbe['join']('');},'base64ToBytes':function(_0x370b9b){var _0x23a150=_0x15c69c;_0x370b9b=_0x370b9b[_0x23a150(0x759)](/[^A-Z0-9+\/]/ig,'');for(var _0xdf9ed6=[],_0x47582c=0x0,_0x50b6f8=0x0;_0x47582c<_0x370b9b[_0x23a150(0x404)];_0x50b6f8=++_0x47582c%0x4){if(_0x50b6f8==0x0)continue;_0xdf9ed6[_0x23a150(0x333)]((_0x294e2d[_0x23a150(0x5b5)](_0x370b9b[_0x23a150(0x297)](_0x47582c-0x1))&Math[_0x23a150(0x11f)](0x2,-0x2*_0x50b6f8+0x8)-0x1)<<_0x50b6f8*0x2|_0x294e2d['indexOf'](_0x370b9b[_0x23a150(0x297)](_0x47582c))>>>0x6-_0x50b6f8*0x2);}return _0xdf9ed6;}};_0x23d22a['exports']=_0xa45ed5;}());},'./node_modules/event-lite/event-lite.js':function(_0x24cc6e,_0x1ed0a2,_0x584e5e){/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */
function _0x522aad(){if(!(this instanceof _0x522aad))return new _0x522aad();}(function(_0x4b59df){var _0x4bea67=_0x2943;if(!![])_0x24cc6e['exports']=_0x4b59df;var _0x3c90a7=_0x4bea67(0x949),_0xcd3210={'on':_0x1c35ab,'once':_0x441036,'off':_0x882f72,'emit':_0x588ffc};_0x55ffd9(_0x4b59df[_0x4bea67(0x59d)]),_0x4b59df[_0x4bea67(0x98d)]=_0x55ffd9;function _0x55ffd9(_0x638f4d){for(var _0x1baa7 in _0xcd3210){_0x638f4d[_0x1baa7]=_0xcd3210[_0x1baa7];}return _0x638f4d;}function _0x1c35ab(_0x4308e4,_0x4fca60){var _0x48fca1=_0x4bea67;return _0x1ef9ef(this,_0x4308e4)[_0x48fca1(0x333)](_0x4fca60),this;}function _0x441036(_0x2059ea,_0x563e03){var _0x1eb94b=_0x4bea67,_0x40e5fc=this;_0x7451ea[_0x1eb94b(0x7aa)]=_0x563e03,_0x1ef9ef(_0x40e5fc,_0x2059ea)[_0x1eb94b(0x333)](_0x7451ea);return _0x40e5fc;function _0x7451ea(){var _0x536e4a=_0x1eb94b;_0x882f72[_0x536e4a(0x7bf)](_0x40e5fc,_0x2059ea,_0x7451ea),_0x563e03[_0x536e4a(0x416)](this,arguments);}}function _0x882f72(_0x2d09d9,_0xc505b2){var _0x4cc983=_0x4bea67,_0x4443f0=this,_0x1921db;if(!arguments[_0x4cc983(0x404)])delete _0x4443f0[_0x3c90a7];else{if(!_0xc505b2){_0x1921db=_0x4443f0[_0x3c90a7];if(_0x1921db){delete _0x1921db[_0x2d09d9];if(!Object['keys'](_0x1921db)[_0x4cc983(0x404)])return _0x882f72['call'](_0x4443f0);}}else{_0x1921db=_0x1ef9ef(_0x4443f0,_0x2d09d9,!![]);if(_0x1921db){_0x1921db=_0x1921db[_0x4cc983(0x661)](_0x2069b6);if(!_0x1921db[_0x4cc983(0x404)])return _0x882f72[_0x4cc983(0x7bf)](_0x4443f0,_0x2d09d9);_0x4443f0[_0x3c90a7][_0x2d09d9]=_0x1921db;}}}return _0x4443f0;function _0x2069b6(_0x56a842){var _0x4e1d1f=_0x4cc983;return _0x56a842!==_0xc505b2&&_0x56a842[_0x4e1d1f(0x7aa)]!==_0xc505b2;}}function _0x588ffc(_0x31379b,_0x418f5c){var _0x2b66c6=_0x4bea67,_0x5da10a=this,_0x391012=_0x1ef9ef(_0x5da10a,_0x31379b,!![]);if(!_0x391012)return![];var _0xad22da=arguments[_0x2b66c6(0x404)];if(_0xad22da===0x1)_0x391012['forEach'](_0x33d5ec);else{if(_0xad22da===0x2)_0x391012[_0x2b66c6(0x8b1)](_0x3dcc8d);else{var _0x743983=Array[_0x2b66c6(0x59d)][_0x2b66c6(0x789)][_0x2b66c6(0x7bf)](arguments,0x1);_0x391012[_0x2b66c6(0x8b1)](_0x27f98a);}}return!!_0x391012[_0x2b66c6(0x404)];function _0x33d5ec(_0xe41d7a){var _0x2ac280=_0x2b66c6;_0xe41d7a[_0x2ac280(0x7bf)](_0x5da10a);}function _0x3dcc8d(_0x2bad4e){var _0x1141f6=_0x2b66c6;_0x2bad4e[_0x1141f6(0x7bf)](_0x5da10a,_0x418f5c);}function _0x27f98a(_0x99261){var _0x56c950=_0x2b66c6;_0x99261[_0x56c950(0x416)](_0x5da10a,_0x743983);}}function _0x1ef9ef(_0x105cf2,_0x47a019,_0x5a93a8){if(_0x5a93a8&&!_0x105cf2[_0x3c90a7])return;var _0x14888c=_0x105cf2[_0x3c90a7]||(_0x105cf2[_0x3c90a7]={});return _0x14888c[_0x47a019]||(_0x14888c[_0x47a019]=[]);}}(_0x522aad));},'./node_modules/ieee754/index.js':function(_0x1417fa,_0x650343){var _0x2160a1=_0xfd30c1;_0x650343['read']=function(_0xb903e5,_0x524095,_0x5520a2,_0x599014,_0x1be65b){var _0x583931=_0x2943,_0x230930,_0x588629,_0x2e9173=_0x1be65b*0x8-_0x599014-0x1,_0x3ccdc3=(0x1<<_0x2e9173)-0x1,_0x35c5c8=_0x3ccdc3>>0x1,_0x45c8fb=-0x7,_0x1c75f0=_0x5520a2?_0x1be65b-0x1:0x0,_0x442d89=_0x5520a2?-0x1:0x1,_0x25c4fa=_0xb903e5[_0x524095+_0x1c75f0];_0x1c75f0+=_0x442d89,_0x230930=_0x25c4fa&(0x1<<-_0x45c8fb)-0x1,_0x25c4fa>>=-_0x45c8fb,_0x45c8fb+=_0x2e9173;for(;_0x45c8fb>0x0;_0x230930=_0x230930*0x100+_0xb903e5[_0x524095+_0x1c75f0],_0x1c75f0+=_0x442d89,_0x45c8fb-=0x8){}_0x588629=_0x230930&(0x1<<-_0x45c8fb)-0x1,_0x230930>>=-_0x45c8fb,_0x45c8fb+=_0x599014;for(;_0x45c8fb>0x0;_0x588629=_0x588629*0x100+_0xb903e5[_0x524095+_0x1c75f0],_0x1c75f0+=_0x442d89,_0x45c8fb-=0x8){}if(_0x230930===0x0)_0x230930=0x1-_0x35c5c8;else{if(_0x230930===_0x3ccdc3)return _0x588629?NaN:(_0x25c4fa?-0x1:0x1)*Infinity;else _0x588629=_0x588629+Math[_0x583931(0x11f)](0x2,_0x599014),_0x230930=_0x230930-_0x35c5c8;}return(_0x25c4fa?-0x1:0x1)*_0x588629*Math[_0x583931(0x11f)](0x2,_0x230930-_0x599014);},_0x650343[_0x2160a1(0x8f9)]=function(_0x102012,_0x1f92ae,_0x5c6003,_0x38ad54,_0x39f06c,_0x358088){var _0x527ec5=_0x2160a1,_0x3c71b9,_0x26fe6a,_0xa5b649,_0x40edef=_0x358088*0x8-_0x39f06c-0x1,_0xb08f94=(0x1<<_0x40edef)-0x1,_0x1f4c69=_0xb08f94>>0x1,_0x17c027=_0x39f06c===0x17?Math[_0x527ec5(0x11f)](0x2,-0x18)-Math[_0x527ec5(0x11f)](0x2,-0x4d):0x0,_0x5b1ac2=_0x38ad54?0x0:_0x358088-0x1,_0x4adb33=_0x38ad54?0x1:-0x1,_0x4d20d9=_0x1f92ae<0x0||_0x1f92ae===0x0&&0x1/_0x1f92ae<0x0?0x1:0x0;_0x1f92ae=Math[_0x527ec5(0x11d)](_0x1f92ae);if(isNaN(_0x1f92ae)||_0x1f92ae===Infinity)_0x26fe6a=isNaN(_0x1f92ae)?0x1:0x0,_0x3c71b9=_0xb08f94;else{_0x3c71b9=Math[_0x527ec5(0x7ee)](Math['log'](_0x1f92ae)/Math['LN2']);_0x1f92ae*(_0xa5b649=Math[_0x527ec5(0x11f)](0x2,-_0x3c71b9))<0x1&&(_0x3c71b9--,_0xa5b649*=0x2);_0x3c71b9+_0x1f4c69>=0x1?_0x1f92ae+=_0x17c027/_0xa5b649:_0x1f92ae+=_0x17c027*Math[_0x527ec5(0x11f)](0x2,0x1-_0x1f4c69);_0x1f92ae*_0xa5b649>=0x2&&(_0x3c71b9++,_0xa5b649/=0x2);if(_0x3c71b9+_0x1f4c69>=_0xb08f94)_0x26fe6a=0x0,_0x3c71b9=_0xb08f94;else _0x3c71b9+_0x1f4c69>=0x1?(_0x26fe6a=(_0x1f92ae*_0xa5b649-0x1)*Math[_0x527ec5(0x11f)](0x2,_0x39f06c),_0x3c71b9=_0x3c71b9+_0x1f4c69):(_0x26fe6a=_0x1f92ae*Math[_0x527ec5(0x11f)](0x2,_0x1f4c69-0x1)*Math[_0x527ec5(0x11f)](0x2,_0x39f06c),_0x3c71b9=0x0);}for(;_0x39f06c>=0x8;_0x102012[_0x5c6003+_0x5b1ac2]=_0x26fe6a&0xff,_0x5b1ac2+=_0x4adb33,_0x26fe6a/=0x100,_0x39f06c-=0x8){}_0x3c71b9=_0x3c71b9<<_0x39f06c|_0x26fe6a,_0x40edef+=_0x39f06c;for(;_0x40edef>0x0;_0x102012[_0x5c6003+_0x5b1ac2]=_0x3c71b9&0xff,_0x5b1ac2+=_0x4adb33,_0x3c71b9/=0x100,_0x40edef-=0x8){}_0x102012[_0x5c6003+_0x5b1ac2-_0x4adb33]|=_0x4d20d9*0x80;};},'./node_modules/int64-buffer/int64-buffer.js':function(_0x1f104a,_0x2ffaf3,_0x5e6e15){var _0x5c1c26=_0xfd30c1;(function(_0x4e956c){var _0x24ac36=_0x2943,_0x4d49e6,_0xb6ab89,_0x52b97d,_0x25eee4;!function(_0x27c4ec){var _0x38f521=_0x2943,_0x1e550d=_0x38f521(0x3fe),_0x1945e3=_0x1e550d!==typeof _0x4e956c&&_0x4e956c,_0x2a26d7=_0x1e550d!==typeof Uint8Array&&Uint8Array,_0x396f66=_0x1e550d!==typeof ArrayBuffer&&ArrayBuffer,_0x1ccf7c=[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],_0x4fbc75=Array[_0x38f521(0x91b)]||_0x350ede,_0x4a2c39=0x100000000,_0x14f8ab=0x1000000,_0x263792;_0x4d49e6=_0x416ca3(_0x38f521(0x89d),!![],!![]),_0xb6ab89=_0x416ca3(_0x38f521(0x678),!![],![]),_0x52b97d=_0x416ca3('Uint64LE',![],!![]),_0x25eee4=_0x416ca3(_0x38f521(0x630),![],![]);function _0x416ca3(_0x42cf65,_0x1d07bd,_0x2943a6){var _0x337115=_0x38f521,_0x3991bf=_0x1d07bd?0x0:0x4,_0xaf0bcd=_0x1d07bd?0x4:0x0,_0x44aadd=_0x1d07bd?0x0:0x3,_0x5c0564=_0x1d07bd?0x1:0x2,_0x14b4ba=_0x1d07bd?0x2:0x1,_0x377adf=_0x1d07bd?0x3:0x0,_0x5163f1=_0x1d07bd?_0x190801:_0x38cb58,_0x5ef551=_0x1d07bd?_0x36f15c:_0x92488d,_0x5200b7=_0x157e92['prototype'],_0x5e9858='is'+_0x42cf65,_0x40cea8='_'+_0x5e9858;_0x5200b7[_0x337115(0x287)]=void 0x0,_0x5200b7['offset']=0x0,_0x5200b7[_0x40cea8]=!![],_0x5200b7[_0x337115(0x81c)]=_0xeb987a,_0x5200b7[_0x337115(0x44a)]=_0x43ac40,_0x5200b7[_0x337115(0x14c)]=_0xeb987a,_0x5200b7[_0x337115(0x74c)]=_0x5a180d;if(_0x1945e3)_0x5200b7['toBuffer']=_0x109a44;if(_0x2a26d7)_0x5200b7[_0x337115(0x772)]=_0x4257f7;_0x157e92[_0x5e9858]=_0x534931,_0x27c4ec[_0x42cf65]=_0x157e92;return _0x157e92;function _0x157e92(_0x4343dc,_0x39b5ca,_0x2b901f,_0x4cea4b){if(!(this instanceof _0x157e92))return new _0x157e92(_0x4343dc,_0x39b5ca,_0x2b901f,_0x4cea4b);return _0x80e0a2(this,_0x4343dc,_0x39b5ca,_0x2b901f,_0x4cea4b);}function _0x534931(_0x162aaa){return!!(_0x162aaa&&_0x162aaa[_0x40cea8]);}function _0x80e0a2(_0x2a45f7,_0x44aef8,_0x27f82b,_0x217823,_0x3f0507){var _0x6e3b=_0x337115;if(_0x2a26d7&&_0x396f66){if(_0x44aef8 instanceof _0x396f66)_0x44aef8=new _0x2a26d7(_0x44aef8);if(_0x217823 instanceof _0x396f66)_0x217823=new _0x2a26d7(_0x217823);}if(!_0x44aef8&&!_0x27f82b&&!_0x217823&&!_0x263792){_0x2a45f7[_0x6e3b(0x287)]=_0x10e486(_0x1ccf7c,0x0);return;}if(!_0x1b6a1d(_0x44aef8,_0x27f82b)){var _0x58382a=_0x263792||Array;_0x3f0507=_0x27f82b,_0x217823=_0x44aef8,_0x27f82b=0x0,_0x44aef8=new _0x58382a(0x8);}_0x2a45f7[_0x6e3b(0x287)]=_0x44aef8,_0x2a45f7[_0x6e3b(0x32c)]=_0x27f82b|=0x0;if(_0x1e550d===typeof _0x217823)return;if(_0x6e3b(0x325)===typeof _0x217823)_0x98e365(_0x44aef8,_0x27f82b,_0x217823,_0x3f0507||0xa);else{if(_0x1b6a1d(_0x217823,_0x3f0507))_0x5e4551(_0x44aef8,_0x27f82b,_0x217823,_0x3f0507);else{if(_0x6e3b(0x8ec)===typeof _0x3f0507)_0x3851f7(_0x44aef8,_0x27f82b+_0x3991bf,_0x217823),_0x3851f7(_0x44aef8,_0x27f82b+_0xaf0bcd,_0x3f0507);else{if(_0x217823>0x0)_0x5163f1(_0x44aef8,_0x27f82b,_0x217823);else _0x217823<0x0?_0x5ef551(_0x44aef8,_0x27f82b,_0x217823):_0x5e4551(_0x44aef8,_0x27f82b,_0x1ccf7c,0x0);}}}}function _0x98e365(_0x59943e,_0x16fdc7,_0x30d31a,_0x475376){var _0x3ea40d=_0x337115,_0x3bca9a=0x0,_0x5171be=_0x30d31a[_0x3ea40d(0x404)],_0x5d5fef=0x0,_0x1366be=0x0;if(_0x30d31a[0x0]==='-')_0x3bca9a++;var _0x2fc68a=_0x3bca9a;while(_0x3bca9a<_0x5171be){var _0x317985=parseInt(_0x30d31a[_0x3bca9a++],_0x475376);if(!(_0x317985>=0x0))break;_0x1366be=_0x1366be*_0x475376+_0x317985,_0x5d5fef=_0x5d5fef*_0x475376+Math[_0x3ea40d(0x7ee)](_0x1366be/_0x4a2c39),_0x1366be%=_0x4a2c39;}_0x2fc68a&&(_0x5d5fef=~_0x5d5fef,_0x1366be?_0x1366be=_0x4a2c39-_0x1366be:_0x5d5fef++),_0x3851f7(_0x59943e,_0x16fdc7+_0x3991bf,_0x5d5fef),_0x3851f7(_0x59943e,_0x16fdc7+_0xaf0bcd,_0x1366be);}function _0xeb987a(){var _0x3abc80=_0x337115,_0x18abc6=this[_0x3abc80(0x287)],_0x36e01f=this[_0x3abc80(0x32c)],_0x55cf87=_0x576f2f(_0x18abc6,_0x36e01f+_0x3991bf),_0x5a2c49=_0x576f2f(_0x18abc6,_0x36e01f+_0xaf0bcd);if(!_0x2943a6)_0x55cf87|=0x0;return _0x55cf87?_0x55cf87*_0x4a2c39+_0x5a2c49:_0x5a2c49;}function _0x43ac40(_0xf90de6){var _0xe3ce1=_0x337115,_0x287474=this[_0xe3ce1(0x287)],_0x2da949=this[_0xe3ce1(0x32c)],_0x2e71dd=_0x576f2f(_0x287474,_0x2da949+_0x3991bf),_0x4a1177=_0x576f2f(_0x287474,_0x2da949+_0xaf0bcd),_0x191642='',_0x349d2a=!_0x2943a6&&_0x2e71dd&0x80000000;_0x349d2a&&(_0x2e71dd=~_0x2e71dd,_0x4a1177=_0x4a2c39-_0x4a1177);_0xf90de6=_0xf90de6||0xa;while(0x1){var _0x174bff=_0x2e71dd%_0xf90de6*_0x4a2c39+_0x4a1177;_0x2e71dd=Math[_0xe3ce1(0x7ee)](_0x2e71dd/_0xf90de6),_0x4a1177=Math[_0xe3ce1(0x7ee)](_0x174bff/_0xf90de6),_0x191642=(_0x174bff%_0xf90de6)[_0xe3ce1(0x44a)](_0xf90de6)+_0x191642;if(!_0x2e71dd&&!_0x4a1177)break;}return _0x349d2a&&(_0x191642='-'+_0x191642),_0x191642;}function _0x3851f7(_0x41637f,_0x5cd559,_0x18ea29){_0x41637f[_0x5cd559+_0x377adf]=_0x18ea29&0xff,_0x18ea29=_0x18ea29>>0x8,_0x41637f[_0x5cd559+_0x14b4ba]=_0x18ea29&0xff,_0x18ea29=_0x18ea29>>0x8,_0x41637f[_0x5cd559+_0x5c0564]=_0x18ea29&0xff,_0x18ea29=_0x18ea29>>0x8,_0x41637f[_0x5cd559+_0x44aadd]=_0x18ea29&0xff;}function _0x576f2f(_0x23cc83,_0x538db3){return _0x23cc83[_0x538db3+_0x44aadd]*_0x14f8ab+(_0x23cc83[_0x538db3+_0x5c0564]<<0x10)+(_0x23cc83[_0x538db3+_0x14b4ba]<<0x8)+_0x23cc83[_0x538db3+_0x377adf];}}function _0x5a180d(_0x4034e5){var _0x390791=_0x38f521,_0x53493e=this[_0x390791(0x287)],_0x13924e=this[_0x390791(0x32c)];_0x263792=null;if(_0x4034e5!==![]&&_0x13924e===0x0&&_0x53493e['length']===0x8&&_0x4fbc75(_0x53493e))return _0x53493e;return _0x10e486(_0x53493e,_0x13924e);}function _0x109a44(_0x208649){var _0xe00445=_0x38f521,_0x2c7c75=this['buffer'],_0x112c3e=this[_0xe00445(0x32c)];_0x263792=_0x1945e3;if(_0x208649!==![]&&_0x112c3e===0x0&&_0x2c7c75[_0xe00445(0x404)]===0x8&&_0x4e956c[_0xe00445(0xdd)](_0x2c7c75))return _0x2c7c75;var _0x2801ff=new _0x1945e3(0x8);return _0x5e4551(_0x2801ff,0x0,_0x2c7c75,_0x112c3e),_0x2801ff;}function _0x4257f7(_0xe37bc9){var _0xc68ffe=_0x38f521,_0x25836f=this[_0xc68ffe(0x287)],_0x67ae1c=this[_0xc68ffe(0x32c)],_0x5a0f66=_0x25836f['buffer'];_0x263792=_0x2a26d7;if(_0xe37bc9!==![]&&_0x67ae1c===0x0&&_0x5a0f66 instanceof _0x396f66&&_0x5a0f66[_0xc68ffe(0x3e6)]===0x8)return _0x5a0f66;var _0x2dbdc8=new _0x2a26d7(0x8);return _0x5e4551(_0x2dbdc8,0x0,_0x25836f,_0x67ae1c),_0x2dbdc8[_0xc68ffe(0x287)];}function _0x1b6a1d(_0x28d6d3,_0x52d704){var _0x53a548=_0x38f521,_0x3dce36=_0x28d6d3&&_0x28d6d3[_0x53a548(0x404)];return _0x52d704|=0x0,_0x3dce36&&_0x52d704+0x8<=_0x3dce36&&_0x53a548(0x325)!==typeof _0x28d6d3[_0x52d704];}function _0x5e4551(_0x217e4a,_0x5714a4,_0x1d49da,_0xfa6bb4){_0x5714a4|=0x0,_0xfa6bb4|=0x0;for(var _0x10cce1=0x0;_0x10cce1<0x8;_0x10cce1++){_0x217e4a[_0x5714a4++]=_0x1d49da[_0xfa6bb4++]&0xff;}}function _0x10e486(_0x5b0e3f,_0x555318){var _0x2f43c1=_0x38f521;return Array['prototype']['slice'][_0x2f43c1(0x7bf)](_0x5b0e3f,_0x555318,_0x555318+0x8);}function _0x190801(_0x5783af,_0x14b60c,_0x1a463e){var _0x549a7f=_0x14b60c+0x8;while(_0x549a7f>_0x14b60c){_0x5783af[--_0x549a7f]=_0x1a463e&0xff,_0x1a463e/=0x100;}}function _0x36f15c(_0x5b9d93,_0x3be616,_0x35d29c){var _0x5f5371=_0x3be616+0x8;_0x35d29c++;while(_0x5f5371>_0x3be616){_0x5b9d93[--_0x5f5371]=-_0x35d29c&0xff^0xff,_0x35d29c/=0x100;}}function _0x38cb58(_0x14922d,_0x3d0826,_0x15d46d){var _0x59db25=_0x3d0826+0x8;while(_0x3d0826<_0x59db25){_0x14922d[_0x3d0826++]=_0x15d46d&0xff,_0x15d46d/=0x100;}}function _0x92488d(_0x3d0fb8,_0x3e3a7b,_0xdd2113){var _0x16db52=_0x3e3a7b+0x8;_0xdd2113++;while(_0x3e3a7b<_0x16db52){_0x3d0fb8[_0x3e3a7b++]=-_0xdd2113&0xff^0xff,_0xdd2113/=0x100;}}function _0x350ede(_0x34a508){var _0x4bef10=_0x38f521;return!!_0x34a508&&_0x4bef10(0x4b8)==Object[_0x4bef10(0x59d)][_0x4bef10(0x44a)][_0x4bef10(0x7bf)](_0x34a508);}}(!![]&&typeof _0x2ffaf3[_0x24ac36(0x63a)]!=='string'?_0x2ffaf3:this||{});}[_0x5c1c26(0x7bf)](this,_0x5e6e15('./node_modules/buffer/index.js')[_0x5c1c26(0x233)]));},'./node_modules/is-buffer/index.js':function(_0x3a4db8,_0x5bfd2b){var _0xa405f2=_0xfd30c1;/*!
 * Determine if an object is a Buffer
 *
 * @author   RaZoshi <https://feross.org>
 * @license  MIT
 */
_0x3a4db8[_0xa405f2(0x245)]=function(_0x266a2a){return _0x266a2a!=null&&(_0x4f9481(_0x266a2a)||_0x198ff1(_0x266a2a)||!!_0x266a2a['_isBuffer']);};function _0x4f9481(_0xc8d6d2){var _0x28d4fd=_0xa405f2;return!!_0xc8d6d2[_0x28d4fd(0x700)]&&typeof _0xc8d6d2[_0x28d4fd(0x700)][_0x28d4fd(0xdd)]===_0x28d4fd(0x848)&&_0xc8d6d2['constructor']['isBuffer'](_0xc8d6d2);}function _0x198ff1(_0x2c8108){var _0x273d97=_0xa405f2;return typeof _0x2c8108[_0x273d97(0x543)]===_0x273d97(0x848)&&typeof _0x2c8108[_0x273d97(0x789)]===_0x273d97(0x848)&&_0x4f9481(_0x2c8108[_0x273d97(0x789)](0x0,0x0));}},'./node_modules/md5/md5.js':function(_0x3e667f,_0x8a6e45,_0x412806){(function(){var _0x2b0113=_0x2943,_0x2c627c=_0x412806(_0x2b0113(0x6a0)),_0x5c7ec5=_0x412806(_0x2b0113(0x2d2))[_0x2b0113(0x701)],_0xda8a3e=_0x412806(_0x2b0113(0x818)),_0x5530e9=_0x412806(_0x2b0113(0x2d2))[_0x2b0113(0x424)],_0x6a05fe=function(_0x65190a,_0x1f4211){var _0x5c4ff1=_0x2b0113;if(_0x65190a[_0x5c4ff1(0x700)]==String){if(_0x1f4211&&_0x1f4211[_0x5c4ff1(0x1aa)]===_0x5c4ff1(0xf1))_0x65190a=_0x5530e9['stringToBytes'](_0x65190a);else _0x65190a=_0x5c7ec5['stringToBytes'](_0x65190a);}else{if(_0xda8a3e(_0x65190a))_0x65190a=Array[_0x5c4ff1(0x59d)][_0x5c4ff1(0x789)][_0x5c4ff1(0x7bf)](_0x65190a,0x0);else{if(!Array[_0x5c4ff1(0x91b)](_0x65190a))_0x65190a=_0x65190a[_0x5c4ff1(0x44a)]();}}var _0x48a7b2=_0x2c627c[_0x5c4ff1(0x1f1)](_0x65190a),_0x56cecc=_0x65190a[_0x5c4ff1(0x404)]*0x8,_0x41316f=0x67452301,_0x20af84=-0x10325477,_0x4fcb67=-0x67452302,_0x120127=0x10325476;for(var _0x4e90eb=0x0;_0x4e90eb<_0x48a7b2[_0x5c4ff1(0x404)];_0x4e90eb++){_0x48a7b2[_0x4e90eb]=(_0x48a7b2[_0x4e90eb]<<0x8|_0x48a7b2[_0x4e90eb]>>>0x18)&0xff00ff|(_0x48a7b2[_0x4e90eb]<<0x18|_0x48a7b2[_0x4e90eb]>>>0x8)&0xff00ff00;}_0x48a7b2[_0x56cecc>>>0x5]|=0x80<<_0x56cecc%0x20,_0x48a7b2[(_0x56cecc+0x40>>>0x9<<0x4)+0xe]=_0x56cecc;var _0x3b8a61=_0x6a05fe[_0x5c4ff1(0x75d)],_0x399508=_0x6a05fe[_0x5c4ff1(0x465)],_0x4d8d47=_0x6a05fe[_0x5c4ff1(0x317)],_0x2a8b1f=_0x6a05fe[_0x5c4ff1(0x172)];for(var _0x4e90eb=0x0;_0x4e90eb<_0x48a7b2[_0x5c4ff1(0x404)];_0x4e90eb+=0x10){var _0x92c7df=_0x41316f,_0x1c9212=_0x20af84,_0x52f8bd=_0x4fcb67,_0x598848=_0x120127;_0x41316f=_0x3b8a61(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x0],0x7,-0x28955b88),_0x120127=_0x3b8a61(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x1],0xc,-0x173848aa),_0x4fcb67=_0x3b8a61(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x2],0x11,0x242070db),_0x20af84=_0x3b8a61(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x3],0x16,-0x3e423112),_0x41316f=_0x3b8a61(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x4],0x7,-0xa83f051),_0x120127=_0x3b8a61(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x5],0xc,0x4787c62a),_0x4fcb67=_0x3b8a61(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x6],0x11,-0x57cfb9ed),_0x20af84=_0x3b8a61(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x7],0x16,-0x2b96aff),_0x41316f=_0x3b8a61(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x8],0x7,0x698098d8),_0x120127=_0x3b8a61(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x9],0xc,-0x74bb0851),_0x4fcb67=_0x3b8a61(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xa],0x11,-0xa44f),_0x20af84=_0x3b8a61(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xb],0x16,-0x76a32842),_0x41316f=_0x3b8a61(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0xc],0x7,0x6b901122),_0x120127=_0x3b8a61(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xd],0xc,-0x2678e6d),_0x4fcb67=_0x3b8a61(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xe],0x11,-0x5986bc72),_0x20af84=_0x3b8a61(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xf],0x16,0x49b40821),_0x41316f=_0x399508(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x1],0x5,-0x9e1da9e),_0x120127=_0x399508(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x6],0x9,-0x3fbf4cc0),_0x4fcb67=_0x399508(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xb],0xe,0x265e5a51),_0x20af84=_0x399508(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x0],0x14,-0x16493856),_0x41316f=_0x399508(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x5],0x5,-0x29d0efa3),_0x120127=_0x399508(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xa],0x9,0x2441453),_0x4fcb67=_0x399508(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xf],0xe,-0x275e197f),_0x20af84=_0x399508(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x4],0x14,-0x182c0438),_0x41316f=_0x399508(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x9],0x5,0x21e1cde6),_0x120127=_0x399508(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xe],0x9,-0x3cc8f82a),_0x4fcb67=_0x399508(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x3],0xe,-0xb2af279),_0x20af84=_0x399508(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x8],0x14,0x455a14ed),_0x41316f=_0x399508(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0xd],0x5,-0x561c16fb),_0x120127=_0x399508(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x2],0x9,-0x3105c08),_0x4fcb67=_0x399508(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x7],0xe,0x676f02d9),_0x20af84=_0x399508(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xc],0x14,-0x72d5b376),_0x41316f=_0x4d8d47(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x5],0x4,-0x5c6be),_0x120127=_0x4d8d47(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x8],0xb,-0x788e097f),_0x4fcb67=_0x4d8d47(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xb],0x10,0x6d9d6122),_0x20af84=_0x4d8d47(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xe],0x17,-0x21ac7f4),_0x41316f=_0x4d8d47(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x1],0x4,-0x5b4115bc),_0x120127=_0x4d8d47(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x4],0xb,0x4bdecfa9),_0x4fcb67=_0x4d8d47(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x7],0x10,-0x944b4a0),_0x20af84=_0x4d8d47(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xa],0x17,-0x41404390),_0x41316f=_0x4d8d47(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0xd],0x4,0x289b7ec6),_0x120127=_0x4d8d47(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x0],0xb,-0x155ed806),_0x4fcb67=_0x4d8d47(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x3],0x10,-0x2b10cf7b),_0x20af84=_0x4d8d47(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x6],0x17,0x4881d05),_0x41316f=_0x4d8d47(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x9],0x4,-0x262b2fc7),_0x120127=_0x4d8d47(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xc],0xb,-0x1924661b),_0x4fcb67=_0x4d8d47(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xf],0x10,0x1fa27cf8),_0x20af84=_0x4d8d47(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x2],0x17,-0x3b53a99b),_0x41316f=_0x2a8b1f(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x0],0x6,-0xbd6ddbc),_0x120127=_0x2a8b1f(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x7],0xa,0x432aff97),_0x4fcb67=_0x2a8b1f(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xe],0xf,-0x546bdc59),_0x20af84=_0x2a8b1f(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x5],0x15,-0x36c5fc7),_0x41316f=_0x2a8b1f(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0xc],0x6,0x655b59c3),_0x120127=_0x2a8b1f(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0x3],0xa,-0x70f3336e),_0x4fcb67=_0x2a8b1f(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0xa],0xf,-0x100b83),_0x20af84=_0x2a8b1f(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x1],0x15,-0x7a7ba22f),_0x41316f=_0x2a8b1f(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x8],0x6,0x6fa87e4f),_0x120127=_0x2a8b1f(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xf],0xa,-0x1d31920),_0x4fcb67=_0x2a8b1f(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x6],0xf,-0x5cfebcec),_0x20af84=_0x2a8b1f(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0xd],0x15,0x4e0811a1),_0x41316f=_0x2a8b1f(_0x41316f,_0x20af84,_0x4fcb67,_0x120127,_0x48a7b2[_0x4e90eb+0x4],0x6,-0x8ac817e),_0x120127=_0x2a8b1f(_0x120127,_0x41316f,_0x20af84,_0x4fcb67,_0x48a7b2[_0x4e90eb+0xb],0xa,-0x42c50dcb),_0x4fcb67=_0x2a8b1f(_0x4fcb67,_0x120127,_0x41316f,_0x20af84,_0x48a7b2[_0x4e90eb+0x2],0xf,0x2ad7d2bb),_0x20af84=_0x2a8b1f(_0x20af84,_0x4fcb67,_0x120127,_0x41316f,_0x48a7b2[_0x4e90eb+0x9],0x15,-0x14792c6f),_0x41316f=_0x41316f+_0x92c7df>>>0x0,_0x20af84=_0x20af84+_0x1c9212>>>0x0,_0x4fcb67=_0x4fcb67+_0x52f8bd>>>0x0,_0x120127=_0x120127+_0x598848>>>0x0;}return _0x2c627c[_0x5c4ff1(0x414)]([_0x41316f,_0x20af84,_0x4fcb67,_0x120127]);};_0x6a05fe['_ff']=function(_0x4b8926,_0x16475c,_0x115c6b,_0x972345,_0x571584,_0x4880c4,_0x11e4e7){var _0x149758=_0x4b8926+(_0x16475c&_0x115c6b|~_0x16475c&_0x972345)+(_0x571584>>>0x0)+_0x11e4e7;return(_0x149758<<_0x4880c4|_0x149758>>>0x20-_0x4880c4)+_0x16475c;},_0x6a05fe[_0x2b0113(0x465)]=function(_0x340727,_0x3563ff,_0x5eaab3,_0x12998c,_0x21d52f,_0x5ecc56,_0x5a97b7){var _0x537a06=_0x340727+(_0x3563ff&_0x12998c|_0x5eaab3&~_0x12998c)+(_0x21d52f>>>0x0)+_0x5a97b7;return(_0x537a06<<_0x5ecc56|_0x537a06>>>0x20-_0x5ecc56)+_0x3563ff;},_0x6a05fe[_0x2b0113(0x317)]=function(_0x257dcd,_0xfe4ab0,_0x1a61a4,_0x2ee8dc,_0x49e6dd,_0xd863db,_0x5d5458){var _0x320e3b=_0x257dcd+(_0xfe4ab0^_0x1a61a4^_0x2ee8dc)+(_0x49e6dd>>>0x0)+_0x5d5458;return(_0x320e3b<<_0xd863db|_0x320e3b>>>0x20-_0xd863db)+_0xfe4ab0;},_0x6a05fe[_0x2b0113(0x172)]=function(_0x4ff1d8,_0xa3834d,_0xed6979,_0x427dc2,_0x116f0f,_0x5a244b,_0xde9922){var _0x2fa967=_0x4ff1d8+(_0xed6979^(_0xa3834d|~_0x427dc2))+(_0x116f0f>>>0x0)+_0xde9922;return(_0x2fa967<<_0x5a244b|_0x2fa967>>>0x20-_0x5a244b)+_0xa3834d;},_0x6a05fe[_0x2b0113(0x2a7)]=0x10,_0x6a05fe[_0x2b0113(0x693)]=0x10,_0x3e667f[_0x2b0113(0x245)]=function(_0x4c9f80,_0x50ca45){var _0x406dcc=_0x2b0113;if(_0x4c9f80===undefined||_0x4c9f80===null)throw new Error(_0x406dcc(0x533)+_0x4c9f80);var _0x1133c2=_0x2c627c[_0x406dcc(0x437)](_0x6a05fe(_0x4c9f80,_0x50ca45));return _0x50ca45&&_0x50ca45[_0x406dcc(0x259)]?_0x1133c2:_0x50ca45&&_0x50ca45[_0x406dcc(0x232)]?_0x5530e9[_0x406dcc(0x8f7)](_0x1133c2):_0x2c627c[_0x406dcc(0x382)](_0x1133c2);};}());},'./node_modules/msgpack-lite/lib/browser.js':function(_0x4b63e7,_0x455e1f,_0x4b527f){var _0x51ba13=_0xfd30c1;_0x455e1f[_0x51ba13(0x11e)]=_0x4b527f('./node_modules/msgpack-lite/lib/encode.js')['encode'],_0x455e1f['decode']=_0x4b527f('./node_modules/msgpack-lite/lib/decode.js')[_0x51ba13(0x566)],_0x455e1f['Encoder']=_0x4b527f('./node_modules/msgpack-lite/lib/encoder.js')['Encoder'],_0x455e1f[_0x51ba13(0x920)]=_0x4b527f('./node_modules/msgpack-lite/lib/decoder.js')[_0x51ba13(0x920)],_0x455e1f['createCodec']=_0x4b527f('./node_modules/msgpack-lite/lib/ext.js')[_0x51ba13(0x136)],_0x455e1f[_0x51ba13(0x2a1)]=_0x4b527f('./node_modules/msgpack-lite/lib/codec.js')['codec'];},'./node_modules/msgpack-lite/lib/buffer-global.js':function(_0x1c0fd4,_0x1aaa9e,_0x5b9e88){var _0x593226=_0xfd30c1;(function(_0x6fa6bc){var _0x1d94b5=_0x2943;_0x1c0fd4['exports']=_0x48e9cc('undefined'!==typeof _0x6fa6bc&&_0x6fa6bc)||_0x48e9cc(this[_0x1d94b5(0x233)])||_0x48e9cc('undefined'!==typeof window&&window[_0x1d94b5(0x233)])||this[_0x1d94b5(0x233)];function _0x48e9cc(_0x1dd17a){var _0x323f68=_0x1d94b5;return _0x1dd17a&&_0x1dd17a[_0x323f68(0xdd)]&&_0x1dd17a;}}['call'](this,_0x5b9e88(_0x593226(0x3ba))[_0x593226(0x233)]));},'./node_modules/msgpack-lite/lib/buffer-lite.js':function(_0x31fae0,_0x59faba){var _0x4add17=_0xfd30c1,_0x32d38f=0x2000;_0x59faba[_0x4add17(0x96f)]=_0x214a64,_0x59faba[_0x4add17(0x44a)]=_0x11ed2c,_0x59faba['write']=_0xbb90f0;function _0xbb90f0(_0x16b950,_0x571615){var _0x462acb=_0x4add17,_0x58bdef=this,_0x127bbe=_0x571615||(_0x571615|=0x0),_0x39332b=_0x16b950[_0x462acb(0x404)],_0x3ec62f=0x0,_0x5ed62e=0x0;while(_0x5ed62e<_0x39332b){_0x3ec62f=_0x16b950[_0x462acb(0x2a2)](_0x5ed62e++);if(_0x3ec62f<0x80)_0x58bdef[_0x127bbe++]=_0x3ec62f;else{if(_0x3ec62f<0x800)_0x58bdef[_0x127bbe++]=0xc0|_0x3ec62f>>>0x6,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f&0x3f;else _0x3ec62f<0xd800||_0x3ec62f>0xdfff?(_0x58bdef[_0x127bbe++]=0xe0|_0x3ec62f>>>0xc,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f>>>0x6&0x3f,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f&0x3f):(_0x3ec62f=(_0x3ec62f-0xd800<<0xa|_0x16b950[_0x462acb(0x2a2)](_0x5ed62e++)-0xdc00)+0x10000,_0x58bdef[_0x127bbe++]=0xf0|_0x3ec62f>>>0x12,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f>>>0xc&0x3f,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f>>>0x6&0x3f,_0x58bdef[_0x127bbe++]=0x80|_0x3ec62f&0x3f);}}return _0x127bbe-_0x571615;}function _0x11ed2c(_0x144172,_0xc61cde,_0x230263){var _0x302dd1=_0x4add17,_0x377c8f=this,_0x4a16f2=_0xc61cde|0x0;if(!_0x230263)_0x230263=_0x377c8f[_0x302dd1(0x404)];var _0x141da3='',_0x218496=0x0;while(_0x4a16f2<_0x230263){_0x218496=_0x377c8f[_0x4a16f2++];if(_0x218496<0x80){_0x141da3+=String[_0x302dd1(0x9a8)](_0x218496);continue;}if((_0x218496&0xe0)===0xc0)_0x218496=(_0x218496&0x1f)<<0x6|_0x377c8f[_0x4a16f2++]&0x3f;else{if((_0x218496&0xf0)===0xe0)_0x218496=(_0x218496&0xf)<<0xc|(_0x377c8f[_0x4a16f2++]&0x3f)<<0x6|_0x377c8f[_0x4a16f2++]&0x3f;else(_0x218496&0xf8)===0xf0&&(_0x218496=(_0x218496&0x7)<<0x12|(_0x377c8f[_0x4a16f2++]&0x3f)<<0xc|(_0x377c8f[_0x4a16f2++]&0x3f)<<0x6|_0x377c8f[_0x4a16f2++]&0x3f);}_0x218496>=0x10000?(_0x218496-=0x10000,_0x141da3+=String[_0x302dd1(0x9a8)]((_0x218496>>>0xa)+0xd800,(_0x218496&0x3ff)+0xdc00)):_0x141da3+=String[_0x302dd1(0x9a8)](_0x218496);}return _0x141da3;}function _0x214a64(_0x2ff62a,_0x2738d8,_0x3f41af,_0x672ed4){var _0x186d59;if(!_0x3f41af)_0x3f41af=0x0;if(!_0x672ed4&&_0x672ed4!==0x0)_0x672ed4=this['length'];if(!_0x2738d8)_0x2738d8=0x0;var _0x5b8eee=_0x672ed4-_0x3f41af;if(_0x2ff62a===this&&_0x3f41af<_0x2738d8&&_0x2738d8<_0x672ed4)for(_0x186d59=_0x5b8eee-0x1;_0x186d59>=0x0;_0x186d59--){_0x2ff62a[_0x186d59+_0x2738d8]=this[_0x186d59+_0x3f41af];}else for(_0x186d59=0x0;_0x186d59<_0x5b8eee;_0x186d59++){_0x2ff62a[_0x186d59+_0x2738d8]=this[_0x186d59+_0x3f41af];}return _0x5b8eee;}},'./node_modules/msgpack-lite/lib/bufferish-array.js':function(_0x3800c6,_0x118d6e,_0x59cb76){var _0x431857=_0xfd30c1,_0xdb853c=_0x59cb76(_0x431857(0x6b4)),_0x118d6e=_0x3800c6[_0x431857(0x245)]=_0x200d4c(0x0);_0x118d6e[_0x431857(0x285)]=_0x200d4c,_0x118d6e[_0x431857(0x954)]=_0xdb853c[_0x431857(0x954)],_0x118d6e[_0x431857(0x6db)]=_0x238e30;function _0x200d4c(_0x12dedb){return new Array(_0x12dedb);}function _0x238e30(_0x3fffba){var _0x25b5f7=_0x431857;if(!_0xdb853c[_0x25b5f7(0xdd)](_0x3fffba)&&_0xdb853c[_0x25b5f7(0x182)](_0x3fffba))_0x3fffba=_0xdb853c['Uint8Array'][_0x25b5f7(0x6db)](_0x3fffba);else{if(_0xdb853c[_0x25b5f7(0x6b9)](_0x3fffba))_0x3fffba=new Uint8Array(_0x3fffba);else{if(typeof _0x3fffba===_0x25b5f7(0x325))return _0xdb853c[_0x25b5f7(0x6db)][_0x25b5f7(0x7bf)](_0x118d6e,_0x3fffba);else{if(typeof _0x3fffba===_0x25b5f7(0x8ec))throw new TypeError('\x22value\x22\x20argument\x20must\x20not\x20be\x20a\x20number');}}}return Array[_0x25b5f7(0x59d)][_0x25b5f7(0x789)][_0x25b5f7(0x7bf)](_0x3fffba);}},'./node_modules/msgpack-lite/lib/bufferish-buffer.js':function(_0x1ea1ec,_0x458d95,_0x4c6e61){var _0x2c81c3=_0xfd30c1,_0x87b38c=_0x4c6e61('./node_modules/msgpack-lite/lib/bufferish.js'),_0x45c82e=_0x87b38c['global'],_0x458d95=_0x1ea1ec[_0x2c81c3(0x245)]=_0x87b38c[_0x2c81c3(0x663)]?_0x508f63(0x0):[];_0x458d95[_0x2c81c3(0x285)]=_0x87b38c['hasBuffer']&&_0x45c82e[_0x2c81c3(0x285)]||_0x508f63,_0x458d95[_0x2c81c3(0x954)]=_0x87b38c[_0x2c81c3(0x954)],_0x458d95[_0x2c81c3(0x6db)]=_0x26f8ff;function _0x508f63(_0x43a2bc){return new _0x45c82e(_0x43a2bc);}function _0x26f8ff(_0x343ef2){var _0x3e0133=_0x2c81c3;if(!_0x87b38c[_0x3e0133(0xdd)](_0x343ef2)&&_0x87b38c['isView'](_0x343ef2))_0x343ef2=_0x87b38c[_0x3e0133(0x35b)][_0x3e0133(0x6db)](_0x343ef2);else{if(_0x87b38c['isArrayBuffer'](_0x343ef2))_0x343ef2=new Uint8Array(_0x343ef2);else{if(typeof _0x343ef2===_0x3e0133(0x325))return _0x87b38c['from'][_0x3e0133(0x7bf)](_0x458d95,_0x343ef2);else{if(typeof _0x343ef2==='number')throw new TypeError(_0x3e0133(0x641));}}}return _0x45c82e['from']&&_0x45c82e[_0x3e0133(0x6db)][_0x3e0133(0x404)]!==0x1?_0x45c82e['from'](_0x343ef2):new _0x45c82e(_0x343ef2);}},'./node_modules/msgpack-lite/lib/bufferish-proto.js':function(_0x2d0a91,_0x5d44de,_0x21f6d0){var _0x29465f=_0xfd30c1,_0xd4b89a=_0x21f6d0(_0x29465f(0x190));_0x5d44de['copy']=_0x1d1844,_0x5d44de['slice']=_0x25a608,_0x5d44de['toString']=_0xbc63b3,_0x5d44de['write']=_0x4f33f1(_0x29465f(0x8f9));var _0x3ad554=_0x21f6d0(_0x29465f(0x6b4)),_0x1a7dfe=_0x3ad554[_0x29465f(0x79a)],_0x5a3c17=_0x3ad554[_0x29465f(0x663)]&&_0x29465f(0x11a)in _0x1a7dfe,_0x524f73=_0x5a3c17&&!_0x1a7dfe[_0x29465f(0x11a)];function _0x1d1844(_0x591887,_0x509bcc,_0x134d28,_0x671249){var _0x2d26ef=_0x29465f,_0x247493=_0x3ad554[_0x2d26ef(0xdd)](this),_0x1620af=_0x3ad554[_0x2d26ef(0xdd)](_0x591887);if(_0x247493&&_0x1620af)return this[_0x2d26ef(0x96f)](_0x591887,_0x509bcc,_0x134d28,_0x671249);else{if(!_0x524f73&&!_0x247493&&!_0x1620af&&_0x3ad554[_0x2d26ef(0x182)](this)&&_0x3ad554[_0x2d26ef(0x182)](_0x591887)){var _0x531187=_0x134d28||_0x671249!=null?_0x25a608[_0x2d26ef(0x7bf)](this,_0x134d28,_0x671249):this;return _0x591887['set'](_0x531187,_0x509bcc),_0x531187[_0x2d26ef(0x404)];}else return _0xd4b89a[_0x2d26ef(0x96f)][_0x2d26ef(0x7bf)](this,_0x591887,_0x509bcc,_0x134d28,_0x671249);}}function _0x25a608(_0x5a816b,_0xbe7788){var _0x413a26=_0x29465f,_0x4aeea8=this[_0x413a26(0x789)]||!_0x524f73&&this[_0x413a26(0x451)];if(_0x4aeea8)return _0x4aeea8[_0x413a26(0x7bf)](this,_0x5a816b,_0xbe7788);var _0x34d410=_0x3ad554[_0x413a26(0x285)][_0x413a26(0x7bf)](this,_0xbe7788-_0x5a816b);return _0x1d1844[_0x413a26(0x7bf)](this,_0x34d410,0x0,_0x5a816b,_0xbe7788),_0x34d410;}function _0xbc63b3(_0x4726ee,_0x1010b1,_0x1b9155){var _0x508595=_0x29465f,_0x3f74db=!_0x5a3c17&&_0x3ad554[_0x508595(0xdd)](this)?this[_0x508595(0x44a)]:_0xd4b89a[_0x508595(0x44a)];return _0x3f74db[_0x508595(0x416)](this,arguments);}function _0x4f33f1(_0x173a2e){return _0x5683fe;function _0x5683fe(){var _0x41b3bb=_0x2943,_0x1c3f3c=this[_0x173a2e]||_0xd4b89a[_0x173a2e];return _0x1c3f3c[_0x41b3bb(0x416)](this,arguments);}}},'./node_modules/msgpack-lite/lib/bufferish-uint8array.js':function(_0x46a899,_0x3f6f8b,_0x3c06aa){var _0x45d55e=_0xfd30c1,_0x2daa1d=_0x3c06aa(_0x45d55e(0x6b4)),_0x3f6f8b=_0x46a899[_0x45d55e(0x245)]=_0x2daa1d['hasArrayBuffer']?_0x16446c(0x0):[];_0x3f6f8b['alloc']=_0x16446c,_0x3f6f8b[_0x45d55e(0x954)]=_0x2daa1d[_0x45d55e(0x954)],_0x3f6f8b[_0x45d55e(0x6db)]=_0x110254;function _0x16446c(_0xe1a6e6){return new Uint8Array(_0xe1a6e6);}function _0x110254(_0xb1df87){var _0x233bcf=_0x45d55e;if(_0x2daa1d['isView'](_0xb1df87)){var _0x7fc083=_0xb1df87[_0x233bcf(0x683)],_0x413d9a=_0xb1df87[_0x233bcf(0x3e6)];_0xb1df87=_0xb1df87[_0x233bcf(0x287)],_0xb1df87[_0x233bcf(0x3e6)]!==_0x413d9a&&(_0xb1df87['slice']?_0xb1df87=_0xb1df87[_0x233bcf(0x789)](_0x7fc083,_0x7fc083+_0x413d9a):(_0xb1df87=new Uint8Array(_0xb1df87),_0xb1df87[_0x233bcf(0x3e6)]!==_0x413d9a&&(_0xb1df87=Array[_0x233bcf(0x59d)]['slice'][_0x233bcf(0x7bf)](_0xb1df87,_0x7fc083,_0x7fc083+_0x413d9a))));}else{if(typeof _0xb1df87===_0x233bcf(0x325))return _0x2daa1d[_0x233bcf(0x6db)]['call'](_0x3f6f8b,_0xb1df87);else{if(typeof _0xb1df87===_0x233bcf(0x8ec))throw new TypeError(_0x233bcf(0x641));}}return new Uint8Array(_0xb1df87);}},'./node_modules/msgpack-lite/lib/bufferish.js':function(_0x5b2736,_0x2b9059,_0x51d4e2){var _0x2c8425=_0xfd30c1,_0x552e5f=_0x2b9059[_0x2c8425(0x79a)]=_0x51d4e2(_0x2c8425(0x765)),_0x2ac57f=_0x2b9059[_0x2c8425(0x663)]=_0x552e5f&&!!_0x552e5f[_0x2c8425(0xdd)],_0x2cda17=_0x2b9059['hasArrayBuffer']='undefined'!==typeof ArrayBuffer,_0x4a5896=_0x2b9059[_0x2c8425(0x91b)]=_0x51d4e2(_0x2c8425(0x592));_0x2b9059[_0x2c8425(0x6b9)]=_0x2cda17?_0x20a4fb:_0x49def7;var _0x27bd03=_0x2b9059[_0x2c8425(0xdd)]=_0x2ac57f?_0x552e5f[_0x2c8425(0xdd)]:_0x49def7,_0x4e7688=_0x2b9059[_0x2c8425(0x182)]=_0x2cda17?ArrayBuffer[_0x2c8425(0x182)]||_0x41c78f(_0x2c8425(0x20b),_0x2c8425(0x287)):_0x49def7;_0x2b9059[_0x2c8425(0x285)]=_0x2baf4c,_0x2b9059[_0x2c8425(0x954)]=_0xfa51af,_0x2b9059['from']=_0x360821;var _0x252c0d=_0x2b9059[_0x2c8425(0x5b4)]=_0x51d4e2(_0x2c8425(0x1c9)),_0x51e8d9=_0x2b9059[_0x2c8425(0x233)]=_0x51d4e2(_0x2c8425(0x71a)),_0x5acfd8=_0x2b9059['Uint8Array']=_0x51d4e2(_0x2c8425(0x1b7)),_0x1be48c=_0x2b9059[_0x2c8425(0x59d)]=_0x51d4e2('./node_modules/msgpack-lite/lib/bufferish-proto.js');function _0x360821(_0x454bd4){var _0x3efbbf=_0x2c8425;return typeof _0x454bd4==='string'?_0xf599c[_0x3efbbf(0x7bf)](this,_0x454bd4):_0xd81218(this)[_0x3efbbf(0x6db)](_0x454bd4);}function _0x2baf4c(_0x1fd402){var _0x443b4a=_0x2c8425;return _0xd81218(this)[_0x443b4a(0x285)](_0x1fd402);}function _0xfa51af(_0x3b3e5c,_0x2f4800){var _0x2de6e8=_0x2c8425;!_0x2f4800&&(_0x2f4800=0x0,Array[_0x2de6e8(0x59d)][_0x2de6e8(0x8b1)][_0x2de6e8(0x7bf)](_0x3b3e5c,_0x415303));var _0x20fb05=this!==_0x2b9059&&this||_0x3b3e5c[0x0],_0x12b39f=_0x2baf4c[_0x2de6e8(0x7bf)](_0x20fb05,_0x2f4800),_0x547e4e=0x0;Array[_0x2de6e8(0x59d)][_0x2de6e8(0x8b1)][_0x2de6e8(0x7bf)](_0x3b3e5c,_0xfb93be);return _0x12b39f;function _0x415303(_0x580280){var _0x1d58f5=_0x2de6e8;_0x2f4800+=_0x580280[_0x1d58f5(0x404)];}function _0xfb93be(_0x3b44ee){var _0x56e26a=_0x2de6e8;_0x547e4e+=_0x1be48c[_0x56e26a(0x96f)]['call'](_0x3b44ee,_0x12b39f,_0x547e4e);}}var _0x4434b7=_0x41c78f(_0x2c8425(0x20b));function _0x20a4fb(_0x47460f){return _0x47460f instanceof ArrayBuffer||_0x4434b7(_0x47460f);}function _0xf599c(_0xafb5c3){var _0x34b3e8=_0x2c8425,_0x2c2dff=_0xafb5c3['length']*0x3,_0xe6dc77=_0x2baf4c[_0x34b3e8(0x7bf)](this,_0x2c2dff),_0x578a7c=_0x1be48c[_0x34b3e8(0x8f9)][_0x34b3e8(0x7bf)](_0xe6dc77,_0xafb5c3);return _0x2c2dff!==_0x578a7c&&(_0xe6dc77=_0x1be48c['slice'][_0x34b3e8(0x7bf)](_0xe6dc77,0x0,_0x578a7c)),_0xe6dc77;}function _0xd81218(_0x59ff48){return _0x27bd03(_0x59ff48)?_0x51e8d9:_0x4e7688(_0x59ff48)?_0x5acfd8:_0x4a5896(_0x59ff48)?_0x252c0d:_0x2ac57f?_0x51e8d9:_0x2cda17?_0x5acfd8:_0x252c0d;}function _0x49def7(){return![];}function _0x41c78f(_0x3c5ab8,_0x31d0c4){return _0x3c5ab8='[object\x20'+_0x3c5ab8+']',function(_0x1a1fe2){var _0x51c5e4=_0x2943;return _0x1a1fe2!=null&&{}[_0x51c5e4(0x44a)][_0x51c5e4(0x7bf)](_0x31d0c4?_0x1a1fe2[_0x31d0c4]:_0x1a1fe2)===_0x3c5ab8;};}},'./node_modules/msgpack-lite/lib/codec-base.js':function(_0x1644e6,_0x25ffc1,_0x10150a){var _0x1f10f6=_0xfd30c1,_0xcdc517=_0x10150a('./node_modules/msgpack-lite/node_modules/isarray/index.js');_0x25ffc1['createCodec']=_0x43ec06,_0x25ffc1['install']=_0x402240,_0x25ffc1['filter']=_0x10b702;var _0xbaa97d=_0x10150a('./node_modules/msgpack-lite/lib/bufferish.js');function _0x35beb8(_0x585c32){var _0x2357cd=_0x2943;if(!(this instanceof _0x35beb8))return new _0x35beb8(_0x585c32);this['options']=_0x585c32,this[_0x2357cd(0x4b1)]();}_0x35beb8['prototype'][_0x1f10f6(0x4b1)]=function(){var _0x35d414=_0x1f10f6,_0xc8e99b=this[_0x35d414(0x857)];return _0xc8e99b&&_0xc8e99b[_0x35d414(0x8a2)]&&(this['bufferish']=_0xbaa97d[_0x35d414(0x35b)]),this;};function _0x402240(_0x2cb34c){for(var _0x1626e6 in _0x2cb34c){_0x35beb8['prototype'][_0x1626e6]=_0x2be09b(_0x35beb8['prototype'][_0x1626e6],_0x2cb34c[_0x1626e6]);}}function _0x2be09b(_0x27e6ca,_0x415060){return _0x27e6ca&&_0x415060?_0x524a36:_0x27e6ca||_0x415060;function _0x524a36(){var _0x16dcb9=_0x2943;return _0x27e6ca[_0x16dcb9(0x416)](this,arguments),_0x415060['apply'](this,arguments);}}function _0x545100(_0x415730){var _0x292911=_0x1f10f6;_0x415730=_0x415730[_0x292911(0x789)]();return function(_0xd5444e){var _0x303e96=_0x292911;return _0x415730[_0x303e96(0x40b)](_0x3b2937,_0xd5444e);};function _0x3b2937(_0x269ef4,_0x27116b){return _0x27116b(_0x269ef4);}}function _0x10b702(_0x4997a0){return _0xcdc517(_0x4997a0)?_0x545100(_0x4997a0):_0x4997a0;}function _0x43ec06(_0x45fc3b){return new _0x35beb8(_0x45fc3b);}_0x25ffc1[_0x1f10f6(0x378)]=_0x43ec06({'preset':!![]});},'./node_modules/msgpack-lite/lib/codec.js':function(_0x12a303,_0x3416ae,_0x5d9881){var _0x39565a=_0xfd30c1;_0x5d9881(_0x39565a(0x283)),_0x5d9881(_0x39565a(0x2f7)),_0x3416ae[_0x39565a(0x2a1)]={'preset':_0x5d9881(_0x39565a(0x6f3))['preset']};},'./node_modules/msgpack-lite/lib/decode-buffer.js':function(_0x53adef,_0x3ee234,_0x5bbc7f){var _0x246e5d=_0xfd30c1;_0x3ee234[_0x246e5d(0x8fb)]=_0x511901;var _0x3f9117=_0x5bbc7f('./node_modules/msgpack-lite/lib/read-core.js')[_0x246e5d(0x378)],_0x11848c=_0x5bbc7f('./node_modules/msgpack-lite/lib/flex-buffer.js')[_0x246e5d(0x8d6)];_0x11848c[_0x246e5d(0x98d)](_0x511901['prototype']);function _0x511901(_0x3dfa88){var _0x2c50db=_0x246e5d;if(!(this instanceof _0x511901))return new _0x511901(_0x3dfa88);if(_0x3dfa88){this[_0x2c50db(0x857)]=_0x3dfa88;if(_0x3dfa88['codec']){var _0x36d168=this[_0x2c50db(0x2a1)]=_0x3dfa88[_0x2c50db(0x2a1)];if(_0x36d168['bufferish'])this[_0x2c50db(0x5c7)]=_0x36d168['bufferish'];}}}_0x511901[_0x246e5d(0x59d)][_0x246e5d(0x2a1)]=_0x3f9117,_0x511901[_0x246e5d(0x59d)][_0x246e5d(0x731)]=function(){var _0x50be44=_0x246e5d;return this[_0x50be44(0x2a1)]['decode'](this);};},'./node_modules/msgpack-lite/lib/decode.js':function(_0x113a4d,_0x34825f,_0x7f01e7){var _0x45112f=_0xfd30c1;_0x34825f[_0x45112f(0x566)]=_0x1043df;var _0x491fb6=_0x7f01e7(_0x45112f(0x47e))['DecodeBuffer'];function _0x1043df(_0x495ebc,_0x5e7851){var _0x26950f=_0x45112f,_0x42d84b=new _0x491fb6(_0x5e7851);return _0x42d84b[_0x26950f(0x8f9)](_0x495ebc),_0x42d84b[_0x26950f(0x8fc)]();}},'./node_modules/msgpack-lite/lib/decoder.js':function(_0xa7b22f,_0x23783d,_0x1f3673){var _0x4fd76c=_0xfd30c1;_0x23783d[_0x4fd76c(0x920)]=_0x2c195a;var _0x2bfd6b=_0x1f3673('./node_modules/event-lite/event-lite.js'),_0x5a8b05=_0x1f3673('./node_modules/msgpack-lite/lib/decode-buffer.js')['DecodeBuffer'];function _0x2c195a(_0x47e813){if(!(this instanceof _0x2c195a))return new _0x2c195a(_0x47e813);_0x5a8b05['call'](this,_0x47e813);}_0x2c195a[_0x4fd76c(0x59d)]=new _0x5a8b05(),_0x2bfd6b['mixin'](_0x2c195a[_0x4fd76c(0x59d)]),_0x2c195a[_0x4fd76c(0x59d)][_0x4fd76c(0x566)]=function(_0x2c7298){var _0x397acf=_0x4fd76c;if(arguments[_0x397acf(0x404)])this['write'](_0x2c7298);this[_0x397acf(0x389)]();},_0x2c195a[_0x4fd76c(0x59d)]['push']=function(_0xb17f40){var _0x5452e6=_0x4fd76c;this[_0x5452e6(0x1d3)](_0x5452e6(0x852),_0xb17f40);},_0x2c195a['prototype']['end']=function(_0x1e93dc){var _0x11bd4a=_0x4fd76c;this['decode'](_0x1e93dc),this[_0x11bd4a(0x1d3)]('end');};},'./node_modules/msgpack-lite/lib/encode-buffer.js':function(_0x3aedbe,_0x82039f,_0x4d18c6){var _0x505c22=_0xfd30c1;_0x82039f['EncodeBuffer']=_0x2503ac;var _0x16ef34=_0x4d18c6('./node_modules/msgpack-lite/lib/write-core.js')[_0x505c22(0x378)],_0x1602b6=_0x4d18c6(_0x505c22(0x291))['FlexEncoder'];_0x1602b6[_0x505c22(0x98d)](_0x2503ac[_0x505c22(0x59d)]);function _0x2503ac(_0xc6d7cd){var _0x47813d=_0x505c22;if(!(this instanceof _0x2503ac))return new _0x2503ac(_0xc6d7cd);if(_0xc6d7cd){this[_0x47813d(0x857)]=_0xc6d7cd;if(_0xc6d7cd[_0x47813d(0x2a1)]){var _0x95d667=this[_0x47813d(0x2a1)]=_0xc6d7cd[_0x47813d(0x2a1)];if(_0x95d667['bufferish'])this[_0x47813d(0x5c7)]=_0x95d667['bufferish'];}}}_0x2503ac[_0x505c22(0x59d)][_0x505c22(0x2a1)]=_0x16ef34,_0x2503ac[_0x505c22(0x59d)][_0x505c22(0x8f9)]=function(_0x1c745d){var _0x5dbc9d=_0x505c22;this[_0x5dbc9d(0x2a1)][_0x5dbc9d(0x11e)](this,_0x1c745d);};},'./node_modules/msgpack-lite/lib/encode.js':function(_0x2fa10d,_0x1bd3db,_0x1ccd42){var _0x2f0eae=_0xfd30c1;_0x1bd3db[_0x2f0eae(0x11e)]=_0xf77712;var _0x11ab48=_0x1ccd42(_0x2f0eae(0x2bd))[_0x2f0eae(0x4b0)];function _0xf77712(_0x32d18e,_0x6a0a1e){var _0x3ea4d9=_0x2f0eae,_0x42d94b=new _0x11ab48(_0x6a0a1e);return _0x42d94b[_0x3ea4d9(0x8f9)](_0x32d18e),_0x42d94b[_0x3ea4d9(0x8fc)]();}},'./node_modules/msgpack-lite/lib/encoder.js':function(_0x50afee,_0x91634f,_0x58caf0){var _0x3a793e=_0xfd30c1;_0x91634f[_0x3a793e(0x3b5)]=_0x10884b;var _0x533ceb=_0x58caf0('./node_modules/event-lite/event-lite.js'),_0x5aebc1=_0x58caf0('./node_modules/msgpack-lite/lib/encode-buffer.js')[_0x3a793e(0x4b0)];function _0x10884b(_0x4d001e){var _0x11b461=_0x3a793e;if(!(this instanceof _0x10884b))return new _0x10884b(_0x4d001e);_0x5aebc1[_0x11b461(0x7bf)](this,_0x4d001e);}_0x10884b[_0x3a793e(0x59d)]=new _0x5aebc1(),_0x533ceb[_0x3a793e(0x98d)](_0x10884b['prototype']),_0x10884b[_0x3a793e(0x59d)][_0x3a793e(0x11e)]=function(_0x2c17f9){var _0x2cc6a9=_0x3a793e;this[_0x2cc6a9(0x8f9)](_0x2c17f9),this['emit']('data',this[_0x2cc6a9(0x8fc)]());},_0x10884b[_0x3a793e(0x59d)][_0x3a793e(0x7e1)]=function(_0x427ed1){var _0x267c32=_0x3a793e;if(arguments[_0x267c32(0x404)])this[_0x267c32(0x11e)](_0x427ed1);this[_0x267c32(0x389)](),this['emit']('end');};},'./node_modules/msgpack-lite/lib/ext-buffer.js':function(_0x26486f,_0x4db27b,_0x455104){var _0x2e5e1a=_0xfd30c1;_0x4db27b[_0x2e5e1a(0x927)]=_0x29efa7;var _0x5a7c41=_0x455104(_0x2e5e1a(0x6b4));function _0x29efa7(_0x3ac375,_0x78c762){var _0xac5cc4=_0x2e5e1a;if(!(this instanceof _0x29efa7))return new _0x29efa7(_0x3ac375,_0x78c762);this[_0xac5cc4(0x287)]=_0x5a7c41[_0xac5cc4(0x6db)](_0x3ac375),this[_0xac5cc4(0x669)]=_0x78c762;}},'./node_modules/msgpack-lite/lib/ext-packer.js':function(_0x48f790,_0x39ed6f,_0x4fba5f){var _0x358814=_0xfd30c1;_0x39ed6f[_0x358814(0x409)]=_0x5a175d;var _0x27740a=_0x4fba5f(_0x358814(0x6b4)),_0x581153=_0x27740a[_0x358814(0x79a)],_0x1e263a=_0x27740a[_0x358814(0x35b)][_0x358814(0x6db)],_0x392767,_0x4bdfad={'name':0x1,'message':0x1,'stack':0x1,'columnNumber':0x1,'fileName':0x1,'lineNumber':0x1};function _0x5a175d(_0x392cf0){var _0x1ecac5=_0x358814;_0x392cf0['addExtPacker'](0xe,Error,[_0xa96f9e,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0x1,EvalError,[_0xa96f9e,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0x2,RangeError,[_0xa96f9e,_0xffa54b]),_0x392cf0['addExtPacker'](0x3,ReferenceError,[_0xa96f9e,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0x4,SyntaxError,[_0xa96f9e,_0xffa54b]),_0x392cf0['addExtPacker'](0x5,TypeError,[_0xa96f9e,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0x6,URIError,[_0xa96f9e,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0xa,RegExp,[_0x385ea1,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0xb,Boolean,[_0x2f0a3c,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0xc,String,[_0x2f0a3c,_0xffa54b]),_0x392cf0['addExtPacker'](0xd,Date,[Number,_0xffa54b]),_0x392cf0[_0x1ecac5(0x561)](0xf,Number,[_0x2f0a3c,_0xffa54b]),_0x1ecac5(0x3fe)!==typeof Uint8Array&&(_0x392cf0[_0x1ecac5(0x561)](0x11,Int8Array,_0x1e263a),_0x392cf0['addExtPacker'](0x12,Uint8Array,_0x1e263a),_0x392cf0[_0x1ecac5(0x561)](0x13,Int16Array,_0x1e263a),_0x392cf0[_0x1ecac5(0x561)](0x14,Uint16Array,_0x1e263a),_0x392cf0['addExtPacker'](0x15,Int32Array,_0x1e263a),_0x392cf0['addExtPacker'](0x16,Uint32Array,_0x1e263a),_0x392cf0[_0x1ecac5(0x561)](0x17,Float32Array,_0x1e263a),_0x1ecac5(0x3fe)!==typeof Float64Array&&_0x392cf0[_0x1ecac5(0x561)](0x18,Float64Array,_0x1e263a),_0x1ecac5(0x3fe)!==typeof Uint8ClampedArray&&_0x392cf0[_0x1ecac5(0x561)](0x19,Uint8ClampedArray,_0x1e263a),_0x392cf0[_0x1ecac5(0x561)](0x1a,ArrayBuffer,_0x1e263a),_0x392cf0['addExtPacker'](0x1d,DataView,_0x1e263a)),_0x27740a[_0x1ecac5(0x663)]&&_0x392cf0[_0x1ecac5(0x561)](0x1b,_0x581153,_0x27740a['from']);}function _0xffa54b(_0x53e1fb){var _0x3864cb=_0x358814;if(!_0x392767)_0x392767=_0x4fba5f(_0x3864cb(0x677))[_0x3864cb(0x11e)];return _0x392767(_0x53e1fb);}function _0x2f0a3c(_0x39b59f){var _0x308992=_0x358814;return _0x39b59f[_0x308992(0x118)]();}function _0x385ea1(_0x2010f2){var _0x228751=_0x358814;_0x2010f2=RegExp[_0x228751(0x59d)]['toString'][_0x228751(0x7bf)](_0x2010f2)[_0x228751(0x87c)]('/'),_0x2010f2['shift']();var _0x390719=[_0x2010f2['pop']()];return _0x390719['unshift'](_0x2010f2[_0x228751(0x64e)]('/')),_0x390719;}function _0xa96f9e(_0x2f552c){var _0x509815={};for(var _0x3755e1 in _0x4bdfad){_0x509815[_0x3755e1]=_0x2f552c[_0x3755e1];}return _0x509815;}},'./node_modules/msgpack-lite/lib/ext-unpacker.js':function(_0x5f0d13,_0x4a094c,_0x62f8af){var _0x2bee06=_0xfd30c1;_0x4a094c[_0x2bee06(0x972)]=_0x30eb26;var _0x188abe=_0x62f8af(_0x2bee06(0x6b4)),_0x527679=_0x188abe['global'],_0x259c2e,_0x35d3a2={'name':0x1,'message':0x1,'stack':0x1,'columnNumber':0x1,'fileName':0x1,'lineNumber':0x1};function _0x30eb26(_0x2e3da4){var _0x3feed0=_0x2bee06;_0x2e3da4[_0x3feed0(0x8ef)](0xe,[_0x1778ad,_0x48eb10(Error)]),_0x2e3da4[_0x3feed0(0x8ef)](0x1,[_0x1778ad,_0x48eb10(EvalError)]),_0x2e3da4[_0x3feed0(0x8ef)](0x2,[_0x1778ad,_0x48eb10(RangeError)]),_0x2e3da4[_0x3feed0(0x8ef)](0x3,[_0x1778ad,_0x48eb10(ReferenceError)]),_0x2e3da4[_0x3feed0(0x8ef)](0x4,[_0x1778ad,_0x48eb10(SyntaxError)]),_0x2e3da4[_0x3feed0(0x8ef)](0x5,[_0x1778ad,_0x48eb10(TypeError)]),_0x2e3da4[_0x3feed0(0x8ef)](0x6,[_0x1778ad,_0x48eb10(URIError)]),_0x2e3da4[_0x3feed0(0x8ef)](0xa,[_0x1778ad,_0x52b4ba]),_0x2e3da4['addExtUnpacker'](0xb,[_0x1778ad,_0x2d1d18(Boolean)]),_0x2e3da4['addExtUnpacker'](0xc,[_0x1778ad,_0x2d1d18(String)]),_0x2e3da4[_0x3feed0(0x8ef)](0xd,[_0x1778ad,_0x2d1d18(Date)]),_0x2e3da4[_0x3feed0(0x8ef)](0xf,[_0x1778ad,_0x2d1d18(Number)]),_0x3feed0(0x3fe)!==typeof Uint8Array&&(_0x2e3da4[_0x3feed0(0x8ef)](0x11,_0x2d1d18(Int8Array)),_0x2e3da4[_0x3feed0(0x8ef)](0x12,_0x2d1d18(Uint8Array)),_0x2e3da4['addExtUnpacker'](0x13,[_0x130087,_0x2d1d18(Int16Array)]),_0x2e3da4[_0x3feed0(0x8ef)](0x14,[_0x130087,_0x2d1d18(Uint16Array)]),_0x2e3da4[_0x3feed0(0x8ef)](0x15,[_0x130087,_0x2d1d18(Int32Array)]),_0x2e3da4[_0x3feed0(0x8ef)](0x16,[_0x130087,_0x2d1d18(Uint32Array)]),_0x2e3da4[_0x3feed0(0x8ef)](0x17,[_0x130087,_0x2d1d18(Float32Array)]),_0x3feed0(0x3fe)!==typeof Float64Array&&_0x2e3da4[_0x3feed0(0x8ef)](0x18,[_0x130087,_0x2d1d18(Float64Array)]),_0x3feed0(0x3fe)!==typeof Uint8ClampedArray&&_0x2e3da4[_0x3feed0(0x8ef)](0x19,_0x2d1d18(Uint8ClampedArray)),_0x2e3da4[_0x3feed0(0x8ef)](0x1a,_0x130087),_0x2e3da4[_0x3feed0(0x8ef)](0x1d,[_0x130087,_0x2d1d18(DataView)])),_0x188abe[_0x3feed0(0x663)]&&_0x2e3da4[_0x3feed0(0x8ef)](0x1b,_0x2d1d18(_0x527679));}function _0x1778ad(_0x455651){var _0x2f4f14=_0x2bee06;if(!_0x259c2e)_0x259c2e=_0x62f8af('./node_modules/msgpack-lite/lib/decode.js')[_0x2f4f14(0x566)];return _0x259c2e(_0x455651);}function _0x52b4ba(_0x12ad87){return RegExp['apply'](null,_0x12ad87);}function _0x48eb10(_0x25e12d){return function(_0x7e73cc){var _0x3f18ba=new _0x25e12d();for(var _0x1f512e in _0x35d3a2){_0x3f18ba[_0x1f512e]=_0x7e73cc[_0x1f512e];}return _0x3f18ba;};}function _0x2d1d18(_0x236dad){return function(_0x199d41){return new _0x236dad(_0x199d41);};}function _0x130087(_0x3617c8){var _0x219fc1=_0x2bee06;return new Uint8Array(_0x3617c8)[_0x219fc1(0x287)];}},'./node_modules/msgpack-lite/lib/ext.js':function(_0x23ea12,_0x3275ba,_0x215d80){var _0x5b3301=_0xfd30c1;_0x215d80(_0x5b3301(0x283)),_0x215d80(_0x5b3301(0x2f7)),_0x3275ba[_0x5b3301(0x136)]=_0x215d80(_0x5b3301(0x6f3))['createCodec'];},'./node_modules/msgpack-lite/lib/flex-buffer.js':function(_0x410905,_0x90e345,_0x567613){var _0x4a4592=_0xfd30c1;_0x90e345[_0x4a4592(0x8d6)]=_0x267963,_0x90e345[_0x4a4592(0x47a)]=_0x10f912;var _0x7354d=_0x567613(_0x4a4592(0x6b4)),_0x12ba96=0x800,_0x241bae=0x10000,_0x2519e6='BUFFER_SHORTAGE';function _0x267963(){if(!(this instanceof _0x267963))return new _0x267963();}function _0x10f912(){if(!(this instanceof _0x10f912))return new _0x10f912();}_0x267963[_0x4a4592(0x98d)]=_0x1fee7c(_0x527171()),_0x267963[_0x4a4592(0x98d)](_0x267963[_0x4a4592(0x59d)]),_0x10f912[_0x4a4592(0x98d)]=_0x1fee7c(_0x460cc8()),_0x10f912['mixin'](_0x10f912['prototype']);function _0x527171(){return{'bufferish':_0x7354d,'write':_0x2168af,'fetch':_0x217edd,'flush':_0x54586f,'push':_0x505809,'pull':_0x21a442,'read':_0x2e1abf,'reserve':_0x1823f4,'offset':0x0};function _0x2168af(_0x2a6df5){var _0x46d013=_0x2943,_0x4be1a8=this['offset']?_0x7354d[_0x46d013(0x59d)][_0x46d013(0x789)][_0x46d013(0x7bf)](this[_0x46d013(0x287)],this[_0x46d013(0x32c)]):this[_0x46d013(0x287)];this[_0x46d013(0x287)]=_0x4be1a8?_0x2a6df5?this[_0x46d013(0x5c7)][_0x46d013(0x954)]([_0x4be1a8,_0x2a6df5]):_0x4be1a8:_0x2a6df5,this[_0x46d013(0x32c)]=0x0;}function _0x54586f(){var _0x218474=_0x2943;while(this['offset']<this['buffer'][_0x218474(0x404)]){var _0x35d7f6=this[_0x218474(0x32c)],_0x4457e8;try{_0x4457e8=this['fetch']();}catch(_0x4de526){if(_0x4de526&&_0x4de526['message']!=_0x2519e6)throw _0x4de526;this[_0x218474(0x32c)]=_0x35d7f6;break;}this[_0x218474(0x333)](_0x4457e8);}}function _0x1823f4(_0x1a917b){var _0x376a0e=_0x2943,_0x58fe34=this[_0x376a0e(0x32c)],_0x2015db=_0x58fe34+_0x1a917b;if(_0x2015db>this[_0x376a0e(0x287)][_0x376a0e(0x404)])throw new Error(_0x2519e6);return this[_0x376a0e(0x32c)]=_0x2015db,_0x58fe34;}}function _0x460cc8(){return{'bufferish':_0x7354d,'write':_0x9643cd,'fetch':_0x415a77,'flush':_0x375e4c,'push':_0x505809,'pull':_0x31a4f1,'read':_0x2e1abf,'reserve':_0x150d84,'send':_0x36df05,'maxBufferSize':_0x241bae,'minBufferSize':_0x12ba96,'offset':0x0,'start':0x0};function _0x415a77(){var _0x458c58=_0x2943,_0x40acb3=this['start'];if(_0x40acb3<this[_0x458c58(0x32c)]){var _0x4289e0=this[_0x458c58(0x7a2)]=this[_0x458c58(0x32c)];return _0x7354d[_0x458c58(0x59d)]['slice'][_0x458c58(0x7bf)](this['buffer'],_0x40acb3,_0x4289e0);}}function _0x375e4c(){var _0x244291=_0x2943;while(this[_0x244291(0x7a2)]<this['offset']){var _0x13039c=this[_0x244291(0x731)]();if(_0x13039c)this[_0x244291(0x333)](_0x13039c);}}function _0x31a4f1(){var _0x4caac1=_0x2943,_0x16e64e=this[_0x4caac1(0x312)]||(this[_0x4caac1(0x312)]=[]),_0x114628=_0x16e64e[_0x4caac1(0x404)]>0x1?this[_0x4caac1(0x5c7)]['concat'](_0x16e64e):_0x16e64e[0x0];return _0x16e64e[_0x4caac1(0x404)]=0x0,_0x114628;}function _0x150d84(_0x12174a){var _0x5f4737=_0x2943,_0x487869=_0x12174a|0x0;if(this['buffer']){var _0xd6b987=this['buffer'][_0x5f4737(0x404)],_0x6de484=this[_0x5f4737(0x32c)]|0x0,_0x2bd2c3=_0x6de484+_0x487869;if(_0x2bd2c3<_0xd6b987)return this['offset']=_0x2bd2c3,_0x6de484;this[_0x5f4737(0x389)](),_0x12174a=Math[_0x5f4737(0x77b)](_0x12174a,Math[_0x5f4737(0x176)](_0xd6b987*0x2,this[_0x5f4737(0x856)]));}return _0x12174a=Math[_0x5f4737(0x77b)](_0x12174a,this['minBufferSize']),this[_0x5f4737(0x287)]=this[_0x5f4737(0x5c7)]['alloc'](_0x12174a),this[_0x5f4737(0x7a2)]=0x0,this[_0x5f4737(0x32c)]=_0x487869,0x0;}function _0x36df05(_0x4f813e){var _0x3d0bbf=_0x2943,_0x529161=_0x4f813e['length'];if(_0x529161>this[_0x3d0bbf(0x3a8)])this['flush'](),this[_0x3d0bbf(0x333)](_0x4f813e);else{var _0x191f33=this['reserve'](_0x529161);_0x7354d['prototype']['copy']['call'](_0x4f813e,this[_0x3d0bbf(0x287)],_0x191f33);}}}function _0x9643cd(){var _0x5003a0=_0x4a4592;throw new Error(_0x5003a0(0x16e));}function _0x217edd(){var _0xf2a70f=_0x4a4592;throw new Error(_0xf2a70f(0x24e));}function _0x2e1abf(){var _0x3b05dc=_0x4a4592,_0x25750f=this[_0x3b05dc(0x312)]&&this[_0x3b05dc(0x312)][_0x3b05dc(0x404)];if(!_0x25750f)return this[_0x3b05dc(0x731)]();return this[_0x3b05dc(0x389)](),this[_0x3b05dc(0x3a2)]();}function _0x505809(_0x40e93b){var _0x4d7b11=_0x4a4592,_0x259abd=this[_0x4d7b11(0x312)]||(this[_0x4d7b11(0x312)]=[]);_0x259abd[_0x4d7b11(0x333)](_0x40e93b);}function _0x21a442(){var _0xb61bd1=_0x4a4592,_0x58ddf2=this[_0xb61bd1(0x312)]||(this['buffers']=[]);return _0x58ddf2[_0xb61bd1(0x396)]();}function _0x1fee7c(_0x15d05c){return _0x174c31;function _0x174c31(_0x562f8){for(var _0x157333 in _0x15d05c){_0x562f8[_0x157333]=_0x15d05c[_0x157333];}return _0x562f8;}}},'./node_modules/msgpack-lite/lib/read-core.js':function(_0x2aec30,_0x4760cd,_0x2ff2e8){var _0x16eb6c=_0xfd30c1,_0x115bf9=_0x2ff2e8(_0x16eb6c(0x6b2))['ExtBuffer'],_0x21eac5=_0x2ff2e8(_0x16eb6c(0x17f)),_0x3b662c=_0x2ff2e8(_0x16eb6c(0x996))[_0x16eb6c(0x67f)],_0x88f6ce=_0x2ff2e8(_0x16eb6c(0x27b)),_0xc5df5a=_0x2ff2e8(_0x16eb6c(0x6f3));_0xc5df5a[_0x16eb6c(0x539)]({'addExtUnpacker':_0x1530b1,'getExtUnpacker':_0x2fed4c,'init':_0x2f107e}),_0x4760cd['preset']=_0x2f107e[_0x16eb6c(0x7bf)](_0xc5df5a[_0x16eb6c(0x378)]);function _0xd894f5(_0x23f94b){var _0x5d98c3=_0x16eb6c,_0x4ade99=_0x88f6ce[_0x5d98c3(0x5ee)](_0x23f94b);return _0x254575;function _0x254575(_0x208ac0){var _0x451112=_0x5d98c3,_0x202506=_0x3b662c(_0x208ac0),_0x4d16e7=_0x4ade99[_0x202506];if(!_0x4d16e7)throw new Error(_0x451112(0xe4)+(_0x202506?'0x'+_0x202506['toString'](0x10):_0x202506));return _0x4d16e7(_0x208ac0);}}function _0x2f107e(){var _0x1e0b16=_0x16eb6c,_0x2f4169=this[_0x1e0b16(0x857)];return this[_0x1e0b16(0x566)]=_0xd894f5(_0x2f4169),_0x2f4169&&_0x2f4169['preset']&&_0x21eac5[_0x1e0b16(0x972)](this),this;}function _0x1530b1(_0x2f5b10,_0x415905){var _0x41a87d=_0x16eb6c,_0x41cbf7=this['extUnpackers']||(this['extUnpackers']=[]);_0x41cbf7[_0x2f5b10]=_0xc5df5a[_0x41a87d(0x661)](_0x415905);}function _0x2fed4c(_0x442087){var _0x3cf369=_0x16eb6c,_0x1bffc2=this[_0x3cf369(0x1d8)]||(this[_0x3cf369(0x1d8)]=[]);return _0x1bffc2[_0x442087]||_0x3656f0;function _0x3656f0(_0x2fbacc){return new _0x115bf9(_0x2fbacc,_0x442087);}}},'./node_modules/msgpack-lite/lib/read-format.js':function(_0xc3f913,_0x128c2a,_0x29a6fa){var _0x20c227=_0xfd30c1,_0x45a312=_0x29a6fa(_0x20c227(0x15d)),_0x18e588=_0x29a6fa(_0x20c227(0x3f0)),_0x239204=_0x18e588[_0x20c227(0x89d)],_0x338f51=_0x18e588[_0x20c227(0x678)];_0x128c2a[_0x20c227(0x64d)]=_0x5d307c,_0x128c2a['readUint8']=_0x340d27;var _0x17539d=_0x29a6fa('./node_modules/msgpack-lite/lib/bufferish.js'),_0x18b266=_0x29a6fa(_0x20c227(0x648)),_0x58c9c0=_0x20c227(0x3fe)!==typeof Map,_0x5665f2=!![];function _0x5d307c(_0x516a75){var _0xd9799=_0x20c227,_0x5f0e53=_0x17539d[_0xd9799(0x3c0)]&&_0x516a75&&_0x516a75[_0xd9799(0x85a)],_0x3e0d4c=_0x516a75&&_0x516a75[_0xd9799(0x89c)],_0x4b7de2=_0x58c9c0&&_0x516a75&&_0x516a75['usemap'],_0x537c57={'map':_0x4b7de2?_0x4b630a:_0xa6fa48,'array':_0x3777d5,'str':_0x2ea884,'bin':_0x5f0e53?_0x37e916:_0x41889d,'ext':_0x14c1c4,'uint8':_0x340d27,'uint16':_0x5c9aa0,'uint32':_0x58282a,'uint64':_0x32371c(0x8,_0x3e0d4c?_0x37c5a7:_0x3f9c66),'int8':_0x3f975a,'int16':_0x3f583e,'int32':_0x199d6a,'int64':_0x32371c(0x8,_0x3e0d4c?_0x298f10:_0x5c4b7c),'float32':_0x32371c(0x4,_0x249f7b),'float64':_0x32371c(0x8,_0x19433b)};return _0x537c57;}function _0xa6fa48(_0xe671c0,_0x169df2){var _0x48d3aa={},_0x4d8bf0,_0x56e933=new Array(_0x169df2),_0x3ee3a1=new Array(_0x169df2),_0x3fbfcd=_0xe671c0['codec']['decode'];for(_0x4d8bf0=0x0;_0x4d8bf0<_0x169df2;_0x4d8bf0++){_0x56e933[_0x4d8bf0]=_0x3fbfcd(_0xe671c0),_0x3ee3a1[_0x4d8bf0]=_0x3fbfcd(_0xe671c0);}for(_0x4d8bf0=0x0;_0x4d8bf0<_0x169df2;_0x4d8bf0++){_0x48d3aa[_0x56e933[_0x4d8bf0]]=_0x3ee3a1[_0x4d8bf0];}return _0x48d3aa;}function _0x4b630a(_0x5a1c4c,_0x40ef38){var _0x26fe09=_0x20c227,_0x1aec37=new Map(),_0x2c0f87,_0x532c2d=new Array(_0x40ef38),_0x2b7d4c=new Array(_0x40ef38),_0x32a2e1=_0x5a1c4c['codec'][_0x26fe09(0x566)];for(_0x2c0f87=0x0;_0x2c0f87<_0x40ef38;_0x2c0f87++){_0x532c2d[_0x2c0f87]=_0x32a2e1(_0x5a1c4c),_0x2b7d4c[_0x2c0f87]=_0x32a2e1(_0x5a1c4c);}for(_0x2c0f87=0x0;_0x2c0f87<_0x40ef38;_0x2c0f87++){_0x1aec37['set'](_0x532c2d[_0x2c0f87],_0x2b7d4c[_0x2c0f87]);}return _0x1aec37;}function _0x3777d5(_0x1d105f,_0x3adb6a){var _0x130ab9=_0x20c227,_0x309aef=new Array(_0x3adb6a),_0x2552e0=_0x1d105f['codec'][_0x130ab9(0x566)];for(var _0x2ecfea=0x0;_0x2ecfea<_0x3adb6a;_0x2ecfea++){_0x309aef[_0x2ecfea]=_0x2552e0(_0x1d105f);}return _0x309aef;}function _0x2ea884(_0x215ce9,_0x3cba0d){var _0x24a15b=_0x20c227,_0x780bb5=_0x215ce9[_0x24a15b(0x4c4)](_0x3cba0d),_0x4f9b36=_0x780bb5+_0x3cba0d;return _0x18b266[_0x24a15b(0x44a)][_0x24a15b(0x7bf)](_0x215ce9['buffer'],'utf-8',_0x780bb5,_0x4f9b36);}function _0x41889d(_0x59cc24,_0x3e8ae2){var _0x432c5d=_0x20c227,_0x37995b=_0x59cc24[_0x432c5d(0x4c4)](_0x3e8ae2),_0x1b59de=_0x37995b+_0x3e8ae2,_0x3323ac=_0x18b266[_0x432c5d(0x789)][_0x432c5d(0x7bf)](_0x59cc24[_0x432c5d(0x287)],_0x37995b,_0x1b59de);return _0x17539d[_0x432c5d(0x6db)](_0x3323ac);}function _0x37e916(_0x599b11,_0x5f4bea){var _0x4de5cc=_0x20c227,_0x2671f4=_0x599b11['reserve'](_0x5f4bea),_0x5cb6fd=_0x2671f4+_0x5f4bea,_0x25b91a=_0x18b266['slice'][_0x4de5cc(0x7bf)](_0x599b11[_0x4de5cc(0x287)],_0x2671f4,_0x5cb6fd);return _0x17539d['Uint8Array'][_0x4de5cc(0x6db)](_0x25b91a)[_0x4de5cc(0x287)];}function _0x14c1c4(_0x187583,_0x287b7d){var _0x2c10e7=_0x20c227,_0x3276f6=_0x187583[_0x2c10e7(0x4c4)](_0x287b7d+0x1),_0x338a84=_0x187583[_0x2c10e7(0x287)][_0x3276f6++],_0x1cbf8b=_0x3276f6+_0x287b7d,_0x4b3302=_0x187583[_0x2c10e7(0x2a1)][_0x2c10e7(0x528)](_0x338a84);if(!_0x4b3302)throw new Error(_0x2c10e7(0x33a)+(_0x338a84?'0x'+_0x338a84[_0x2c10e7(0x44a)](0x10):_0x338a84));var _0x1f2f4e=_0x18b266[_0x2c10e7(0x789)][_0x2c10e7(0x7bf)](_0x187583['buffer'],_0x3276f6,_0x1cbf8b);return _0x4b3302(_0x1f2f4e);}function _0x340d27(_0x7232d8){var _0x44d240=_0x20c227,_0x377733=_0x7232d8[_0x44d240(0x4c4)](0x1);return _0x7232d8[_0x44d240(0x287)][_0x377733];}function _0x3f975a(_0x2d4ca0){var _0x1655d3=_0x20c227,_0x228161=_0x2d4ca0[_0x1655d3(0x4c4)](0x1),_0x23f790=_0x2d4ca0[_0x1655d3(0x287)][_0x228161];return _0x23f790&0x80?_0x23f790-0x100:_0x23f790;}function _0x5c9aa0(_0x55b41f){var _0xdfec7=_0x20c227,_0x38b709=_0x55b41f[_0xdfec7(0x4c4)](0x2),_0x15e0f0=_0x55b41f[_0xdfec7(0x287)];return _0x15e0f0[_0x38b709++]<<0x8|_0x15e0f0[_0x38b709];}function _0x3f583e(_0x2e2322){var _0x354aea=_0x2e2322['reserve'](0x2),_0x29410b=_0x2e2322['buffer'],_0x32d1cc=_0x29410b[_0x354aea++]<<0x8|_0x29410b[_0x354aea];return _0x32d1cc&0x8000?_0x32d1cc-0x10000:_0x32d1cc;}function _0x58282a(_0x303f71){var _0x2826d4=_0x20c227,_0x19f0a1=_0x303f71[_0x2826d4(0x4c4)](0x4),_0x538460=_0x303f71[_0x2826d4(0x287)];return _0x538460[_0x19f0a1++]*0x1000000+(_0x538460[_0x19f0a1++]<<0x10)+(_0x538460[_0x19f0a1++]<<0x8)+_0x538460[_0x19f0a1];}function _0x199d6a(_0x3977cd){var _0x197411=_0x20c227,_0x3e94b9=_0x3977cd['reserve'](0x4),_0x29ba03=_0x3977cd[_0x197411(0x287)];return _0x29ba03[_0x3e94b9++]<<0x18|_0x29ba03[_0x3e94b9++]<<0x10|_0x29ba03[_0x3e94b9++]<<0x8|_0x29ba03[_0x3e94b9];}function _0x32371c(_0x49ebac,_0x39955d){return function(_0x48f9bf){var _0x4f4102=_0x2943,_0x5896d6=_0x48f9bf[_0x4f4102(0x4c4)](_0x49ebac);return _0x39955d[_0x4f4102(0x7bf)](_0x48f9bf[_0x4f4102(0x287)],_0x5896d6,_0x5665f2);};}function _0x3f9c66(_0x3e2efa){var _0x4018bc=_0x20c227;return new _0x239204(this,_0x3e2efa)[_0x4018bc(0x81c)]();}function _0x5c4b7c(_0x400d5e){var _0x467fe2=_0x20c227;return new _0x338f51(this,_0x400d5e)[_0x467fe2(0x81c)]();}function _0x37c5a7(_0xa2b0bf){return new _0x239204(this,_0xa2b0bf);}function _0x298f10(_0x3f24bd){return new _0x338f51(this,_0x3f24bd);}function _0x249f7b(_0x4ad1bb){var _0x9cf0ae=_0x20c227;return _0x45a312[_0x9cf0ae(0x8fc)](this,_0x4ad1bb,![],0x17,0x4);}function _0x19433b(_0x20d575){return _0x45a312['read'](this,_0x20d575,![],0x34,0x8);}},'./node_modules/msgpack-lite/lib/read-token.js':function(_0x216943,_0x337f0d,_0x21fb1c){var _0x22795c=_0x21fb1c('./node_modules/msgpack-lite/lib/read-format.js');_0x337f0d['getReadToken']=_0xb494a6;function _0xb494a6(_0x5a40cc){var _0x3d4928=_0x2943,_0x5390b3=_0x22795c['getReadFormat'](_0x5a40cc);return _0x5a40cc&&_0x5a40cc[_0x3d4928(0x30c)]?_0x2b2041(_0x5390b3):_0x42a091(_0x5390b3);}function _0x42a091(_0x4d7bbe){var _0x229d74=_0x2943,_0x50e23c,_0x2ef6c8=new Array(0x100);for(_0x50e23c=0x0;_0x50e23c<=0x7f;_0x50e23c++){_0x2ef6c8[_0x50e23c]=_0x1f9dc1(_0x50e23c);}for(_0x50e23c=0x80;_0x50e23c<=0x8f;_0x50e23c++){_0x2ef6c8[_0x50e23c]=_0x2cf2c9(_0x50e23c-0x80,_0x4d7bbe['map']);}for(_0x50e23c=0x90;_0x50e23c<=0x9f;_0x50e23c++){_0x2ef6c8[_0x50e23c]=_0x2cf2c9(_0x50e23c-0x90,_0x4d7bbe[_0x229d74(0x279)]);}for(_0x50e23c=0xa0;_0x50e23c<=0xbf;_0x50e23c++){_0x2ef6c8[_0x50e23c]=_0x2cf2c9(_0x50e23c-0xa0,_0x4d7bbe['str']);}_0x2ef6c8[0xc0]=_0x1f9dc1(null),_0x2ef6c8[0xc1]=null,_0x2ef6c8[0xc2]=_0x1f9dc1(![]),_0x2ef6c8[0xc3]=_0x1f9dc1(!![]),_0x2ef6c8[0xc4]=_0xe6860c(_0x4d7bbe[_0x229d74(0x5f2)],_0x4d7bbe[_0x229d74(0x424)]),_0x2ef6c8[0xc5]=_0xe6860c(_0x4d7bbe['uint16'],_0x4d7bbe[_0x229d74(0x424)]),_0x2ef6c8[0xc6]=_0xe6860c(_0x4d7bbe['uint32'],_0x4d7bbe[_0x229d74(0x424)]),_0x2ef6c8[0xc7]=_0xe6860c(_0x4d7bbe[_0x229d74(0x5f2)],_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xc8]=_0xe6860c(_0x4d7bbe[_0x229d74(0x7be)],_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xc9]=_0xe6860c(_0x4d7bbe[_0x229d74(0x598)],_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xca]=_0x4d7bbe[_0x229d74(0x744)],_0x2ef6c8[0xcb]=_0x4d7bbe[_0x229d74(0x8de)],_0x2ef6c8[0xcc]=_0x4d7bbe['uint8'],_0x2ef6c8[0xcd]=_0x4d7bbe[_0x229d74(0x7be)],_0x2ef6c8[0xce]=_0x4d7bbe[_0x229d74(0x598)],_0x2ef6c8[0xcf]=_0x4d7bbe[_0x229d74(0x6d6)],_0x2ef6c8[0xd0]=_0x4d7bbe['int8'],_0x2ef6c8[0xd1]=_0x4d7bbe[_0x229d74(0x5e0)],_0x2ef6c8[0xd2]=_0x4d7bbe[_0x229d74(0x5c0)],_0x2ef6c8[0xd3]=_0x4d7bbe[_0x229d74(0x89c)],_0x2ef6c8[0xd4]=_0x2cf2c9(0x1,_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xd5]=_0x2cf2c9(0x2,_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xd6]=_0x2cf2c9(0x4,_0x4d7bbe['ext']),_0x2ef6c8[0xd7]=_0x2cf2c9(0x8,_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xd8]=_0x2cf2c9(0x10,_0x4d7bbe[_0x229d74(0x388)]),_0x2ef6c8[0xd9]=_0xe6860c(_0x4d7bbe['uint8'],_0x4d7bbe[_0x229d74(0x3fc)]),_0x2ef6c8[0xda]=_0xe6860c(_0x4d7bbe[_0x229d74(0x7be)],_0x4d7bbe[_0x229d74(0x3fc)]),_0x2ef6c8[0xdb]=_0xe6860c(_0x4d7bbe[_0x229d74(0x598)],_0x4d7bbe[_0x229d74(0x3fc)]),_0x2ef6c8[0xdc]=_0xe6860c(_0x4d7bbe[_0x229d74(0x7be)],_0x4d7bbe[_0x229d74(0x279)]),_0x2ef6c8[0xdd]=_0xe6860c(_0x4d7bbe[_0x229d74(0x598)],_0x4d7bbe[_0x229d74(0x279)]),_0x2ef6c8[0xde]=_0xe6860c(_0x4d7bbe[_0x229d74(0x7be)],_0x4d7bbe[_0x229d74(0x1d6)]),_0x2ef6c8[0xdf]=_0xe6860c(_0x4d7bbe[_0x229d74(0x598)],_0x4d7bbe[_0x229d74(0x1d6)]);for(_0x50e23c=0xe0;_0x50e23c<=0xff;_0x50e23c++){_0x2ef6c8[_0x50e23c]=_0x1f9dc1(_0x50e23c-0x100);}return _0x2ef6c8;}function _0x2b2041(_0x10b153){var _0x40ad10=_0x2943,_0x5536ef,_0x181dce=_0x42a091(_0x10b153)[_0x40ad10(0x789)]();_0x181dce[0xd9]=_0x181dce[0xc4],_0x181dce[0xda]=_0x181dce[0xc5],_0x181dce[0xdb]=_0x181dce[0xc6];for(_0x5536ef=0xa0;_0x5536ef<=0xbf;_0x5536ef++){_0x181dce[_0x5536ef]=_0x2cf2c9(_0x5536ef-0xa0,_0x10b153[_0x40ad10(0x424)]);}return _0x181dce;}function _0x1f9dc1(_0x10693a){return function(){return _0x10693a;};}function _0xe6860c(_0xd788cd,_0x368997){return function(_0x5a566c){var _0x45f384=_0xd788cd(_0x5a566c);return _0x368997(_0x5a566c,_0x45f384);};}function _0x2cf2c9(_0xd4fbe0,_0x3d53ef){return function(_0x15406c){return _0x3d53ef(_0x15406c,_0xd4fbe0);};}},'./node_modules/msgpack-lite/lib/write-core.js':function(_0x109c0f,_0x1d7f3e,_0x19870f){var _0x516327=_0xfd30c1,_0x2e975b=_0x19870f(_0x516327(0x6b2))[_0x516327(0x927)],_0x412eb9=_0x19870f('./node_modules/msgpack-lite/lib/ext-packer.js'),_0x271229=_0x19870f(_0x516327(0x1b2)),_0x37242d=_0x19870f(_0x516327(0x6f3));_0x37242d[_0x516327(0x539)]({'addExtPacker':_0x44576e,'getExtPacker':_0x346dc8,'init':_0x49fa79}),_0x1d7f3e[_0x516327(0x378)]=_0x49fa79[_0x516327(0x7bf)](_0x37242d[_0x516327(0x378)]);function _0x266fb7(_0x31735){var _0x379376=_0x271229['getWriteType'](_0x31735);return _0x195677;function _0x195677(_0x19ff27,_0x1d61e8){var _0x41b08a=_0x2943,_0x10a9d5=_0x379376[typeof _0x1d61e8];if(!_0x10a9d5)throw new Error(_0x41b08a(0x418)+typeof _0x1d61e8+_0x41b08a(0x873)+_0x1d61e8);_0x10a9d5(_0x19ff27,_0x1d61e8);}}function _0x49fa79(){var _0x388c9b=_0x516327,_0x14470b=this[_0x388c9b(0x857)];return this['encode']=_0x266fb7(_0x14470b),_0x14470b&&_0x14470b[_0x388c9b(0x378)]&&_0x412eb9[_0x388c9b(0x409)](this),this;}function _0x44576e(_0x6c5da7,_0x478c26,_0x213303){var _0x57e4aa=_0x516327;_0x213303=_0x37242d[_0x57e4aa(0x661)](_0x213303);var _0x35a49d=_0x478c26[_0x57e4aa(0x2f1)];if(_0x35a49d&&_0x35a49d!==_0x57e4aa(0x710)){var _0x4b3858=this['extPackers']||(this['extPackers']={});_0x4b3858[_0x35a49d]=_0x4fb29c;}else{var _0x3f1080=this[_0x57e4aa(0x58c)]||(this[_0x57e4aa(0x58c)]=[]);_0x3f1080[_0x57e4aa(0x60f)]([_0x478c26,_0x4fb29c]);}function _0x4fb29c(_0x5081e0){if(_0x213303)_0x5081e0=_0x213303(_0x5081e0);return new _0x2e975b(_0x5081e0,_0x6c5da7);}}function _0x346dc8(_0x1ad03e){var _0x2ec82e=_0x516327,_0x3386af=this['extPackers']||(this[_0x2ec82e(0x25a)]={}),_0x3c0f0f=_0x1ad03e[_0x2ec82e(0x700)],_0x1dab29=_0x3c0f0f&&_0x3c0f0f[_0x2ec82e(0x2f1)]&&_0x3386af[_0x3c0f0f['name']];if(_0x1dab29)return _0x1dab29;var _0x25b5c6=this[_0x2ec82e(0x58c)]||(this['extEncoderList']=[]),_0x4b256e=_0x25b5c6['length'];for(var _0x44389d=0x0;_0x44389d<_0x4b256e;_0x44389d++){var _0x9eca3=_0x25b5c6[_0x44389d];if(_0x3c0f0f===_0x9eca3[0x0])return _0x9eca3[0x1];}}},'./node_modules/msgpack-lite/lib/write-token.js':function(_0x1adbef,_0x15adea,_0x138422){var _0x40ad9f=_0xfd30c1,_0x469d6b=_0x138422(_0x40ad9f(0x15d)),_0x49e513=_0x138422(_0x40ad9f(0x3f0)),_0x23bc9f=_0x49e513[_0x40ad9f(0x89d)],_0x548ff8=_0x49e513['Int64BE'],_0x24cca7=_0x138422(_0x40ad9f(0x7ef))[_0x40ad9f(0x5f2)],_0x206b64=_0x138422(_0x40ad9f(0x6b4)),_0x5000ee=_0x206b64['global'],_0x5c332d=_0x206b64['hasBuffer']&&_0x40ad9f(0x11a)in _0x5000ee,_0x7764ab=_0x5c332d&&!_0x5000ee[_0x40ad9f(0x11a)],_0x1e6818=_0x206b64[_0x40ad9f(0x663)]&&_0x5000ee['prototype']||{};_0x15adea[_0x40ad9f(0x2f9)]=_0x503d05;function _0x503d05(_0x1e531a){var _0x5b4930=_0x40ad9f;if(_0x1e531a&&_0x1e531a['uint8array'])return _0x12d449();else return _0x7764ab||_0x206b64[_0x5b4930(0x663)]&&_0x1e531a&&_0x1e531a[_0x5b4930(0x730)]?_0x13c2ff():_0x35d2e7();}function _0x12d449(){var _0x4e61bb=_0x35d2e7();return _0x4e61bb[0xca]=_0x3e1564(0xca,0x4,_0x58010c),_0x4e61bb[0xcb]=_0x3e1564(0xcb,0x8,_0x354d7c),_0x4e61bb;}function _0x35d2e7(){var _0x39d4e1=_0x40ad9f,_0x4aee29=_0x24cca7['slice']();return _0x4aee29[0xc4]=_0x4cb0d7(0xc4),_0x4aee29[0xc5]=_0x3f2036(0xc5),_0x4aee29[0xc6]=_0x223d68(0xc6),_0x4aee29[0xc7]=_0x4cb0d7(0xc7),_0x4aee29[0xc8]=_0x3f2036(0xc8),_0x4aee29[0xc9]=_0x223d68(0xc9),_0x4aee29[0xca]=_0x3e1564(0xca,0x4,_0x1e6818[_0x39d4e1(0xff)]||_0x58010c,!![]),_0x4aee29[0xcb]=_0x3e1564(0xcb,0x8,_0x1e6818[_0x39d4e1(0x7cb)]||_0x354d7c,!![]),_0x4aee29[0xcc]=_0x4cb0d7(0xcc),_0x4aee29[0xcd]=_0x3f2036(0xcd),_0x4aee29[0xce]=_0x223d68(0xce),_0x4aee29[0xcf]=_0x3e1564(0xcf,0x8,_0x399eda),_0x4aee29[0xd0]=_0x4cb0d7(0xd0),_0x4aee29[0xd1]=_0x3f2036(0xd1),_0x4aee29[0xd2]=_0x223d68(0xd2),_0x4aee29[0xd3]=_0x3e1564(0xd3,0x8,_0x188b82),_0x4aee29[0xd9]=_0x4cb0d7(0xd9),_0x4aee29[0xda]=_0x3f2036(0xda),_0x4aee29[0xdb]=_0x223d68(0xdb),_0x4aee29[0xdc]=_0x3f2036(0xdc),_0x4aee29[0xdd]=_0x223d68(0xdd),_0x4aee29[0xde]=_0x3f2036(0xde),_0x4aee29[0xdf]=_0x223d68(0xdf),_0x4aee29;}function _0x13c2ff(){var _0x4a78bd=_0x40ad9f,_0x31f567=_0x24cca7[_0x4a78bd(0x789)]();return _0x31f567[0xc4]=_0x3e1564(0xc4,0x1,_0x5000ee['prototype']['writeUInt8']),_0x31f567[0xc5]=_0x3e1564(0xc5,0x2,_0x5000ee['prototype'][_0x4a78bd(0x21b)]),_0x31f567[0xc6]=_0x3e1564(0xc6,0x4,_0x5000ee[_0x4a78bd(0x59d)]['writeUInt32BE']),_0x31f567[0xc7]=_0x3e1564(0xc7,0x1,_0x5000ee[_0x4a78bd(0x59d)][_0x4a78bd(0x5ab)]),_0x31f567[0xc8]=_0x3e1564(0xc8,0x2,_0x5000ee['prototype'][_0x4a78bd(0x21b)]),_0x31f567[0xc9]=_0x3e1564(0xc9,0x4,_0x5000ee[_0x4a78bd(0x59d)][_0x4a78bd(0x8b4)]),_0x31f567[0xca]=_0x3e1564(0xca,0x4,_0x5000ee['prototype'][_0x4a78bd(0xff)]),_0x31f567[0xcb]=_0x3e1564(0xcb,0x8,_0x5000ee[_0x4a78bd(0x59d)]['writeDoubleBE']),_0x31f567[0xcc]=_0x3e1564(0xcc,0x1,_0x5000ee['prototype'][_0x4a78bd(0x5ab)]),_0x31f567[0xcd]=_0x3e1564(0xcd,0x2,_0x5000ee[_0x4a78bd(0x59d)]['writeUInt16BE']),_0x31f567[0xce]=_0x3e1564(0xce,0x4,_0x5000ee[_0x4a78bd(0x59d)][_0x4a78bd(0x8b4)]),_0x31f567[0xcf]=_0x3e1564(0xcf,0x8,_0x399eda),_0x31f567[0xd0]=_0x3e1564(0xd0,0x1,_0x5000ee['prototype']['writeInt8']),_0x31f567[0xd1]=_0x3e1564(0xd1,0x2,_0x5000ee[_0x4a78bd(0x59d)]['writeInt16BE']),_0x31f567[0xd2]=_0x3e1564(0xd2,0x4,_0x5000ee['prototype'][_0x4a78bd(0x5bb)]),_0x31f567[0xd3]=_0x3e1564(0xd3,0x8,_0x188b82),_0x31f567[0xd9]=_0x3e1564(0xd9,0x1,_0x5000ee[_0x4a78bd(0x59d)]['writeUInt8']),_0x31f567[0xda]=_0x3e1564(0xda,0x2,_0x5000ee[_0x4a78bd(0x59d)]['writeUInt16BE']),_0x31f567[0xdb]=_0x3e1564(0xdb,0x4,_0x5000ee['prototype'][_0x4a78bd(0x8b4)]),_0x31f567[0xdc]=_0x3e1564(0xdc,0x2,_0x5000ee['prototype'][_0x4a78bd(0x21b)]),_0x31f567[0xdd]=_0x3e1564(0xdd,0x4,_0x5000ee[_0x4a78bd(0x59d)]['writeUInt32BE']),_0x31f567[0xde]=_0x3e1564(0xde,0x2,_0x5000ee[_0x4a78bd(0x59d)][_0x4a78bd(0x21b)]),_0x31f567[0xdf]=_0x3e1564(0xdf,0x4,_0x5000ee[_0x4a78bd(0x59d)][_0x4a78bd(0x8b4)]),_0x31f567;}function _0x4cb0d7(_0x125f58){return function(_0x2b318b,_0x322498){var _0x18e7f4=_0x2943,_0x186672=_0x2b318b['reserve'](0x2),_0x21be7a=_0x2b318b[_0x18e7f4(0x287)];_0x21be7a[_0x186672++]=_0x125f58,_0x21be7a[_0x186672]=_0x322498;};}function _0x3f2036(_0x45ad9e){return function(_0x337242,_0x3bbe3b){var _0x203cbf=_0x2943,_0x21b683=_0x337242[_0x203cbf(0x4c4)](0x3),_0x4add82=_0x337242[_0x203cbf(0x287)];_0x4add82[_0x21b683++]=_0x45ad9e,_0x4add82[_0x21b683++]=_0x3bbe3b>>>0x8,_0x4add82[_0x21b683]=_0x3bbe3b;};}function _0x223d68(_0xb6c645){return function(_0xdcb669,_0x422cf2){var _0x5f1897=_0xdcb669['reserve'](0x5),_0x44332f=_0xdcb669['buffer'];_0x44332f[_0x5f1897++]=_0xb6c645,_0x44332f[_0x5f1897++]=_0x422cf2>>>0x18,_0x44332f[_0x5f1897++]=_0x422cf2>>>0x10,_0x44332f[_0x5f1897++]=_0x422cf2>>>0x8,_0x44332f[_0x5f1897]=_0x422cf2;};}function _0x3e1564(_0x185670,_0x46b2ad,_0x307564,_0x14a723){return function(_0x29c779,_0x12587b){var _0x22e706=_0x2943,_0x40f84c=_0x29c779['reserve'](_0x46b2ad+0x1);_0x29c779['buffer'][_0x40f84c++]=_0x185670,_0x307564[_0x22e706(0x7bf)](_0x29c779[_0x22e706(0x287)],_0x12587b,_0x40f84c,_0x14a723);};}function _0x399eda(_0x7c8596,_0xc92fae){new _0x23bc9f(this,_0xc92fae,_0x7c8596);}function _0x188b82(_0x3a8c7d,_0x4ec6a3){new _0x548ff8(this,_0x4ec6a3,_0x3a8c7d);}function _0x58010c(_0x529426,_0x48d589){var _0x3ec5e1=_0x40ad9f;_0x469d6b[_0x3ec5e1(0x8f9)](this,_0x529426,_0x48d589,![],0x17,0x4);}function _0x354d7c(_0x4b10d7,_0x327ab5){var _0x2eff68=_0x40ad9f;_0x469d6b[_0x2eff68(0x8f9)](this,_0x4b10d7,_0x327ab5,![],0x34,0x8);}},'./node_modules/msgpack-lite/lib/write-type.js':function(_0x336d68,_0x98ebbe,_0x511abb){var _0x4187e8=_0xfd30c1,_0x3b9f6e=_0x511abb(_0x4187e8(0x592)),_0x3741dc=_0x511abb(_0x4187e8(0x3f0)),_0x49dd41=_0x3741dc[_0x4187e8(0x89d)],_0x44b484=_0x3741dc[_0x4187e8(0x678)],_0x499ab7=_0x511abb(_0x4187e8(0x6b4)),_0x3073bc=_0x511abb('./node_modules/msgpack-lite/lib/bufferish-proto.js'),_0x582268=_0x511abb(_0x4187e8(0x197)),_0x36c84f=_0x511abb(_0x4187e8(0x7ef))['uint8'],_0x4a4724=_0x511abb(_0x4187e8(0x6b2))['ExtBuffer'],_0x20930e='undefined'!==typeof Uint8Array,_0x22c05f=_0x4187e8(0x3fe)!==typeof Map,_0x2a9f43=[];_0x2a9f43[0x1]=0xd4,_0x2a9f43[0x2]=0xd5,_0x2a9f43[0x4]=0xd6,_0x2a9f43[0x8]=0xd7,_0x2a9f43[0x10]=0xd8,_0x98ebbe[_0x4187e8(0x1be)]=_0x21bb75;function _0x21bb75(_0x16709c){var _0x230d99=_0x4187e8,_0x196dd9=_0x582268[_0x230d99(0x2f9)](_0x16709c),_0x2876c4=_0x16709c&&_0x16709c['useraw'],_0x293fc9=_0x20930e&&_0x16709c&&_0x16709c[_0x230d99(0x85a)],_0x4a9fff=_0x293fc9?_0x499ab7['isArrayBuffer']:_0x499ab7['isBuffer'],_0x5b62e2=_0x293fc9?_0x370603:_0x5bb0fd,_0x5d7c74=_0x22c05f&&_0x16709c&&_0x16709c[_0x230d99(0x54e)],_0x191811=_0x5d7c74?_0x115a27:_0xf7955,_0x466a5e={'boolean':_0x5b732a,'function':_0x16f247,'number':_0x4a5907,'object':_0x2876c4?_0x11d8a8:_0x28672b,'string':_0xfb8bb0(_0x2876c4?_0x3aad47:_0x4107f6),'symbol':_0x16f247,'undefined':_0x16f247};return _0x466a5e;function _0x5b732a(_0x5c3737,_0x36a5fe){var _0x479fdc=_0x36a5fe?0xc3:0xc2;_0x196dd9[_0x479fdc](_0x5c3737,_0x36a5fe);}function _0x4a5907(_0x1d15cf,_0x9965cc){var _0x2da962=_0x9965cc|0x0,_0x689320;if(_0x9965cc!==_0x2da962){_0x689320=0xcb,_0x196dd9[_0x689320](_0x1d15cf,_0x9965cc);return;}else{if(-0x20<=_0x2da962&&_0x2da962<=0x7f)_0x689320=_0x2da962&0xff;else 0x0<=_0x2da962?_0x689320=_0x2da962<=0xff?0xcc:_0x2da962<=0xffff?0xcd:0xce:_0x689320=-0x80<=_0x2da962?0xd0:-0x8000<=_0x2da962?0xd1:0xd2;}_0x196dd9[_0x689320](_0x1d15cf,_0x2da962);}function _0x58124c(_0x65cb5a,_0x27d199){var _0x12fcce=0xcf;_0x196dd9[_0x12fcce](_0x65cb5a,_0x27d199['toArray']());}function _0x22b5ea(_0x5b989c,_0x457709){var _0x3546ab=_0x230d99,_0x24d65f=0xd3;_0x196dd9[_0x24d65f](_0x5b989c,_0x457709[_0x3546ab(0x74c)]());}function _0x4107f6(_0x29342d){return _0x29342d<0x20?0x1:_0x29342d<=0xff?0x2:_0x29342d<=0xffff?0x3:0x5;}function _0x3aad47(_0x4a7fd){return _0x4a7fd<0x20?0x1:_0x4a7fd<=0xffff?0x3:0x5;}function _0xfb8bb0(_0x4dc98b){return _0x3bf4fc;function _0x3bf4fc(_0x57edf5,_0x3d305b){var _0x48815d=_0x2943,_0x440d74=_0x3d305b['length'],_0xa3a7eb=0x5+_0x440d74*0x3;_0x57edf5[_0x48815d(0x32c)]=_0x57edf5[_0x48815d(0x4c4)](_0xa3a7eb);var _0x3b8af1=_0x57edf5['buffer'],_0x481414=_0x4dc98b(_0x440d74),_0x128308=_0x57edf5[_0x48815d(0x32c)]+_0x481414;_0x440d74=_0x3073bc[_0x48815d(0x8f9)][_0x48815d(0x7bf)](_0x3b8af1,_0x3d305b,_0x128308);var _0x502f1e=_0x4dc98b(_0x440d74);if(_0x481414!==_0x502f1e){var _0x5f1946=_0x128308+_0x502f1e-_0x481414,_0x568088=_0x128308+_0x440d74;_0x3073bc[_0x48815d(0x96f)][_0x48815d(0x7bf)](_0x3b8af1,_0x3b8af1,_0x5f1946,_0x128308,_0x568088);}var _0x23f87f=_0x502f1e===0x1?0xa0+_0x440d74:_0x502f1e<=0x3?0xd7+_0x502f1e:0xdb;_0x196dd9[_0x23f87f](_0x57edf5,_0x440d74),_0x57edf5[_0x48815d(0x32c)]+=_0x440d74;}}function _0x28672b(_0xbc8652,_0x3d87cc){var _0x3027bf=_0x230d99;if(_0x3d87cc===null)return _0x16f247(_0xbc8652,_0x3d87cc);if(_0x4a9fff(_0x3d87cc))return _0x5b62e2(_0xbc8652,_0x3d87cc);if(_0x3b9f6e(_0x3d87cc))return _0x222d50(_0xbc8652,_0x3d87cc);if(_0x49dd41[_0x3027bf(0x28f)](_0x3d87cc))return _0x58124c(_0xbc8652,_0x3d87cc);if(_0x44b484['isInt64BE'](_0x3d87cc))return _0x22b5ea(_0xbc8652,_0x3d87cc);var _0x432c65=_0xbc8652['codec'][_0x3027bf(0x265)](_0x3d87cc);if(_0x432c65)_0x3d87cc=_0x432c65(_0x3d87cc);if(_0x3d87cc instanceof _0x4a4724)return _0x2d14f6(_0xbc8652,_0x3d87cc);_0x191811(_0xbc8652,_0x3d87cc);}function _0x11d8a8(_0x11b496,_0x515a22){if(_0x4a9fff(_0x515a22))return _0x1cb9b6(_0x11b496,_0x515a22);_0x28672b(_0x11b496,_0x515a22);}function _0x16f247(_0x52bbeb,_0x3aa5da){var _0x574e9a=0xc0;_0x196dd9[_0x574e9a](_0x52bbeb,_0x3aa5da);}function _0x222d50(_0x541be1,_0x35ba38){var _0x58aea6=_0x230d99,_0x4d8f78=_0x35ba38[_0x58aea6(0x404)],_0x2393b4=_0x4d8f78<0x10?0x90+_0x4d8f78:_0x4d8f78<=0xffff?0xdc:0xdd;_0x196dd9[_0x2393b4](_0x541be1,_0x4d8f78);var _0xbb6878=_0x541be1[_0x58aea6(0x2a1)][_0x58aea6(0x11e)];for(var _0x1bda5f=0x0;_0x1bda5f<_0x4d8f78;_0x1bda5f++){_0xbb6878(_0x541be1,_0x35ba38[_0x1bda5f]);}}function _0x5bb0fd(_0x2faf2d,_0x38de40){var _0x454adf=_0x230d99,_0x5287d6=_0x38de40[_0x454adf(0x404)],_0x412fe0=_0x5287d6<0xff?0xc4:_0x5287d6<=0xffff?0xc5:0xc6;_0x196dd9[_0x412fe0](_0x2faf2d,_0x5287d6),_0x2faf2d[_0x454adf(0x1a6)](_0x38de40);}function _0x370603(_0x5e49bf,_0x34fbda){_0x5bb0fd(_0x5e49bf,new Uint8Array(_0x34fbda));}function _0x2d14f6(_0x210c9d,_0x2992d7){var _0x164a07=_0x230d99,_0x4afdcf=_0x2992d7[_0x164a07(0x287)],_0x5f1196=_0x4afdcf[_0x164a07(0x404)],_0x140c65=_0x2a9f43[_0x5f1196]||(_0x5f1196<0xff?0xc7:_0x5f1196<=0xffff?0xc8:0xc9);_0x196dd9[_0x140c65](_0x210c9d,_0x5f1196),_0x36c84f[_0x2992d7['type']](_0x210c9d),_0x210c9d[_0x164a07(0x1a6)](_0x4afdcf);}function _0xf7955(_0x41df50,_0x564318){var _0x360b58=_0x230d99,_0x5ec69d=Object[_0x360b58(0x8ae)](_0x564318),_0x48f8a1=_0x5ec69d['length'],_0x23adc8=_0x48f8a1<0x10?0x80+_0x48f8a1:_0x48f8a1<=0xffff?0xde:0xdf;_0x196dd9[_0x23adc8](_0x41df50,_0x48f8a1);var _0x591b21=_0x41df50[_0x360b58(0x2a1)][_0x360b58(0x11e)];_0x5ec69d[_0x360b58(0x8b1)](function(_0x40c2d3){_0x591b21(_0x41df50,_0x40c2d3),_0x591b21(_0x41df50,_0x564318[_0x40c2d3]);});}function _0x115a27(_0x398e27,_0x57a469){var _0x5e0e9c=_0x230d99;if(!(_0x57a469 instanceof Map))return _0xf7955(_0x398e27,_0x57a469);var _0x50458c=_0x57a469['size'],_0x3efbea=_0x50458c<0x10?0x80+_0x50458c:_0x50458c<=0xffff?0xde:0xdf;_0x196dd9[_0x3efbea](_0x398e27,_0x50458c);var _0x51fa6f=_0x398e27[_0x5e0e9c(0x2a1)][_0x5e0e9c(0x11e)];_0x57a469[_0x5e0e9c(0x8b1)](function(_0x406aa6,_0x12c1f1,_0x383cb9){_0x51fa6f(_0x398e27,_0x12c1f1),_0x51fa6f(_0x398e27,_0x406aa6);});}function _0x1cb9b6(_0x38925a,_0xee41ff){var _0x386c78=_0x230d99,_0x10a841=_0xee41ff[_0x386c78(0x404)],_0x22df53=_0x10a841<0x20?0xa0+_0x10a841:_0x10a841<=0xffff?0xda:0xdb;_0x196dd9[_0x22df53](_0x38925a,_0x10a841),_0x38925a['send'](_0xee41ff);}}},'./node_modules/msgpack-lite/lib/write-uint8.js':function(_0xa5c981,_0x398510){var _0x632d44=_0xfd30c1,_0x2c7dd4=_0x398510[_0x632d44(0x5f2)]=new Array(0x100);for(var _0x32d1f9=0x0;_0x32d1f9<=0xff;_0x32d1f9++){_0x2c7dd4[_0x32d1f9]=_0x352400(_0x32d1f9);}function _0x352400(_0x8e87f9){return function(_0x43dbb6){var _0x4e49ff=_0x2943,_0xf5698e=_0x43dbb6[_0x4e49ff(0x4c4)](0x1);_0x43dbb6['buffer'][_0xf5698e]=_0x8e87f9;};}},'./node_modules/msgpack-lite/node_modules/isarray/index.js':function(_0x50fd0e,_0x3fa54b){var _0x4dd1cf=_0xfd30c1,_0x610024={}['toString'];_0x50fd0e['exports']=Array[_0x4dd1cf(0x91b)]||function(_0x5028f8){var _0x198401=_0x4dd1cf;return _0x610024[_0x198401(0x7bf)](_0x5028f8)=='[object\x20Array]';};},'./node_modules/process/browser.js':function(_0x378fad,_0x45edde){var _0x6f2c8=_0xfd30c1,_0x2cf946=_0x378fad[_0x6f2c8(0x245)]={},_0x11ad64,_0x40762d;function _0x50ac94(){var _0x5238ed=_0x6f2c8;throw new Error(_0x5238ed(0x28b));}function _0x3440c6(){var _0x513ad=_0x6f2c8;throw new Error(_0x513ad(0x595));}(function(){var _0x211de0=_0x6f2c8;try{typeof setTimeout===_0x211de0(0x848)?_0x11ad64=setTimeout:_0x11ad64=_0x50ac94;}catch(_0x33bd43){_0x11ad64=_0x50ac94;}try{typeof clearTimeout===_0x211de0(0x848)?_0x40762d=clearTimeout:_0x40762d=_0x3440c6;}catch(_0x6db3fd){_0x40762d=_0x3440c6;}}());function _0x30ddf1(_0x5bbd27){var _0x1fcb35=_0x6f2c8;if(_0x11ad64===setTimeout)return setTimeout(_0x5bbd27,0x0);if((_0x11ad64===_0x50ac94||!_0x11ad64)&&setTimeout)return _0x11ad64=setTimeout,setTimeout(_0x5bbd27,0x0);try{return _0x11ad64(_0x5bbd27,0x0);}catch(_0x158289){try{return _0x11ad64[_0x1fcb35(0x7bf)](null,_0x5bbd27,0x0);}catch(_0x46d6e7){return _0x11ad64[_0x1fcb35(0x7bf)](this,_0x5bbd27,0x0);}}}function _0x518643(_0x9e73ca){var _0x59aecc=_0x6f2c8;if(_0x40762d===clearTimeout)return clearTimeout(_0x9e73ca);if((_0x40762d===_0x3440c6||!_0x40762d)&&clearTimeout)return _0x40762d=clearTimeout,clearTimeout(_0x9e73ca);try{return _0x40762d(_0x9e73ca);}catch(_0x1d07f3){try{return _0x40762d[_0x59aecc(0x7bf)](null,_0x9e73ca);}catch(_0x9d2ec9){return _0x40762d['call'](this,_0x9e73ca);}}}var _0xe8786c=[],_0x178481=![],_0x264fbc,_0x139124=-0x1;function _0x983112(){var _0x42d5c4=_0x6f2c8;if(!_0x178481||!_0x264fbc)return;_0x178481=![],_0x264fbc['length']?_0xe8786c=_0x264fbc[_0x42d5c4(0x954)](_0xe8786c):_0x139124=-0x1,_0xe8786c[_0x42d5c4(0x404)]&&_0x348549();}function _0x348549(){var _0x3fbeb2=_0x6f2c8;if(_0x178481)return;var _0x192981=_0x30ddf1(_0x983112);_0x178481=!![];var _0x4c9975=_0xe8786c[_0x3fbeb2(0x404)];while(_0x4c9975){_0x264fbc=_0xe8786c,_0xe8786c=[];while(++_0x139124<_0x4c9975){_0x264fbc&&_0x264fbc[_0x139124][_0x3fbeb2(0x8e3)]();}_0x139124=-0x1,_0x4c9975=_0xe8786c[_0x3fbeb2(0x404)];}_0x264fbc=null,_0x178481=![],_0x518643(_0x192981);}_0x2cf946[_0x6f2c8(0x358)]=function(_0x31238c){var _0x1a9022=_0x6f2c8,_0x43b240=new Array(arguments[_0x1a9022(0x404)]-0x1);if(arguments[_0x1a9022(0x404)]>0x1)for(var _0x125b1c=0x1;_0x125b1c<arguments[_0x1a9022(0x404)];_0x125b1c++){_0x43b240[_0x125b1c-0x1]=arguments[_0x125b1c];}_0xe8786c[_0x1a9022(0x333)](new _0x38efef(_0x31238c,_0x43b240)),_0xe8786c['length']===0x1&&!_0x178481&&_0x30ddf1(_0x348549);};function _0x38efef(_0x4d2c28,_0x14a149){var _0x18a4e4=_0x6f2c8;this[_0x18a4e4(0x222)]=_0x4d2c28,this[_0x18a4e4(0x279)]=_0x14a149;}_0x38efef[_0x6f2c8(0x59d)]['run']=function(){var _0x4e3103=_0x6f2c8;this[_0x4e3103(0x222)][_0x4e3103(0x416)](null,this[_0x4e3103(0x279)]);},_0x2cf946['title']='browser',_0x2cf946[_0x6f2c8(0x664)]=!![],_0x2cf946[_0x6f2c8(0x407)]={},_0x2cf946['argv']=[],_0x2cf946[_0x6f2c8(0x6fd)]='',_0x2cf946['versions']={};function _0x3a5885(){}_0x2cf946['on']=_0x3a5885,_0x2cf946['addListener']=_0x3a5885,_0x2cf946['once']=_0x3a5885,_0x2cf946[_0x6f2c8(0x5fe)]=_0x3a5885,_0x2cf946['removeListener']=_0x3a5885,_0x2cf946[_0x6f2c8(0xe8)]=_0x3a5885,_0x2cf946[_0x6f2c8(0x1d3)]=_0x3a5885,_0x2cf946[_0x6f2c8(0x626)]=_0x3a5885,_0x2cf946['prependOnceListener']=_0x3a5885,_0x2cf946[_0x6f2c8(0x949)]=function(_0x4b4898){return[];},_0x2cf946[_0x6f2c8(0x380)]=function(_0x1aa5b6){var _0x3577e9=_0x6f2c8;throw new Error(_0x3577e9(0x968));},_0x2cf946[_0x6f2c8(0x77c)]=function(){return'/';},_0x2cf946[_0x6f2c8(0x7f7)]=function(_0x48d095){var _0x45ed4c=_0x6f2c8;throw new Error(_0x45ed4c(0x22e));},_0x2cf946[_0x6f2c8(0x6ba)]=function(){return 0x0;};},'./node_modules/punycode/punycode.js':function(_0x4904a8,_0x1f14b7,_0x22b297){var _0x49eb83=_0xfd30c1;(function(_0x557951,_0x38aed5){var _0x5657a9;;(function(_0x7036f6){var _0x5347f5=_0x2943,_0x28a629=!![]&&_0x1f14b7&&!_0x1f14b7[_0x5347f5(0x36f)]&&_0x1f14b7,_0x5e622b=!![]&&_0x557951&&!_0x557951[_0x5347f5(0x36f)]&&_0x557951,_0x41354e=typeof _0x38aed5=='object'&&_0x38aed5;(_0x41354e[_0x5347f5(0x79a)]===_0x41354e||_0x41354e[_0x5347f5(0x377)]===_0x41354e||_0x41354e[_0x5347f5(0x611)]===_0x41354e)&&(_0x7036f6=_0x41354e);var _0x4dc08f,_0x454a9c=0x7fffffff,_0x56554c=0x24,_0x42940e=0x1,_0x3d50f6=0x1a,_0x201497=0x26,_0x4de312=0x2bc,_0x503e86=0x48,_0x4de948=0x80,_0xa8f995='-',_0x56ac60=/^xn--/,_0x49fb8e=/[^\x20-\x7E]/,_0x55a225=/[\x2E\u3002\uFF0E\uFF61]/g,_0x4e130e={'overflow':'Overflow:\x20input\x20needs\x20wider\x20integers\x20to\x20process','not-basic':_0x5347f5(0x7d3),'invalid-input':_0x5347f5(0x926)},_0x35b9ec=_0x56554c-_0x42940e,_0x1a265b=Math[_0x5347f5(0x7ee)],_0x31eef6=String['fromCharCode'],_0x58e4df;function _0x5eea46(_0x4cad3a){throw new RangeError(_0x4e130e[_0x4cad3a]);}function _0x59cc32(_0x4ad828,_0x471444){var _0x349804=_0x5347f5,_0x34b7aa=_0x4ad828[_0x349804(0x404)],_0x26152e=[];while(_0x34b7aa--){_0x26152e[_0x34b7aa]=_0x471444(_0x4ad828[_0x34b7aa]);}return _0x26152e;}function _0x288761(_0x42e6a8,_0x2f84d1){var _0x5ca865=_0x5347f5,_0x1c8bcc=_0x42e6a8['split']('@'),_0x15ebe7='';_0x1c8bcc[_0x5ca865(0x404)]>0x1&&(_0x15ebe7=_0x1c8bcc[0x0]+'@',_0x42e6a8=_0x1c8bcc[0x1]);_0x42e6a8=_0x42e6a8[_0x5ca865(0x759)](_0x55a225,'.');var _0x5d0b17=_0x42e6a8[_0x5ca865(0x87c)]('.'),_0x57ce83=_0x59cc32(_0x5d0b17,_0x2f84d1)['join']('.');return _0x15ebe7+_0x57ce83;}function _0x5ed281(_0x38aecf){var _0x41486a=_0x5347f5,_0x1dd104=[],_0x330b5a=0x0,_0x5c2858=_0x38aecf[_0x41486a(0x404)],_0x4b051e,_0x1217b7;while(_0x330b5a<_0x5c2858){_0x4b051e=_0x38aecf[_0x41486a(0x2a2)](_0x330b5a++),_0x4b051e>=0xd800&&_0x4b051e<=0xdbff&&_0x330b5a<_0x5c2858?(_0x1217b7=_0x38aecf['charCodeAt'](_0x330b5a++),(_0x1217b7&0xfc00)==0xdc00?_0x1dd104[_0x41486a(0x333)](((_0x4b051e&0x3ff)<<0xa)+(_0x1217b7&0x3ff)+0x10000):(_0x1dd104[_0x41486a(0x333)](_0x4b051e),_0x330b5a--)):_0x1dd104[_0x41486a(0x333)](_0x4b051e);}return _0x1dd104;}function _0x3bb0e7(_0x392bd0){return _0x59cc32(_0x392bd0,function(_0x5b21bc){var _0x41101b='';return _0x5b21bc>0xffff&&(_0x5b21bc-=0x10000,_0x41101b+=_0x31eef6(_0x5b21bc>>>0xa&0x3ff|0xd800),_0x5b21bc=0xdc00|_0x5b21bc&0x3ff),_0x41101b+=_0x31eef6(_0x5b21bc),_0x41101b;})['join']('');}function _0x5a95d6(_0x55c522){if(_0x55c522-0x30<0xa)return _0x55c522-0x16;if(_0x55c522-0x41<0x1a)return _0x55c522-0x41;if(_0x55c522-0x61<0x1a)return _0x55c522-0x61;return _0x56554c;}function _0x20ac37(_0x4582e4,_0xd0b654){return _0x4582e4+0x16+0x4b*(_0x4582e4<0x1a)-((_0xd0b654!=0x0)<<0x5);}function _0x518528(_0x2b99b4,_0x1b781d,_0x356a8e){var _0x3ca530=0x0;_0x2b99b4=_0x356a8e?_0x1a265b(_0x2b99b4/_0x4de312):_0x2b99b4>>0x1,_0x2b99b4+=_0x1a265b(_0x2b99b4/_0x1b781d);for(;_0x2b99b4>_0x35b9ec*_0x3d50f6>>0x1;_0x3ca530+=_0x56554c){_0x2b99b4=_0x1a265b(_0x2b99b4/_0x35b9ec);}return _0x1a265b(_0x3ca530+(_0x35b9ec+0x1)*_0x2b99b4/(_0x2b99b4+_0x201497));}function _0x2e7058(_0x2353b7){var _0x465796=_0x5347f5,_0x44a313=[],_0x2309da=_0x2353b7[_0x465796(0x404)],_0x1e8ad,_0x79c20e=0x0,_0x229ed5=_0x4de948,_0x6dd06a=_0x503e86,_0x1ba233,_0x300e1e,_0x9585e2,_0x30648f,_0x2bf10d,_0x1b6bd8,_0x48d317,_0x18a0c6,_0xc9995c;_0x1ba233=_0x2353b7['lastIndexOf'](_0xa8f995);_0x1ba233<0x0&&(_0x1ba233=0x0);for(_0x300e1e=0x0;_0x300e1e<_0x1ba233;++_0x300e1e){_0x2353b7[_0x465796(0x2a2)](_0x300e1e)>=0x80&&_0x5eea46(_0x465796(0x8a4)),_0x44a313['push'](_0x2353b7[_0x465796(0x2a2)](_0x300e1e));}for(_0x9585e2=_0x1ba233>0x0?_0x1ba233+0x1:0x0;_0x9585e2<_0x2309da;){for(_0x30648f=_0x79c20e,_0x2bf10d=0x1,_0x1b6bd8=_0x56554c;;_0x1b6bd8+=_0x56554c){_0x9585e2>=_0x2309da&&_0x5eea46('invalid-input');_0x48d317=_0x5a95d6(_0x2353b7[_0x465796(0x2a2)](_0x9585e2++));(_0x48d317>=_0x56554c||_0x48d317>_0x1a265b((_0x454a9c-_0x79c20e)/_0x2bf10d))&&_0x5eea46(_0x465796(0x436));_0x79c20e+=_0x48d317*_0x2bf10d,_0x18a0c6=_0x1b6bd8<=_0x6dd06a?_0x42940e:_0x1b6bd8>=_0x6dd06a+_0x3d50f6?_0x3d50f6:_0x1b6bd8-_0x6dd06a;if(_0x48d317<_0x18a0c6)break;_0xc9995c=_0x56554c-_0x18a0c6,_0x2bf10d>_0x1a265b(_0x454a9c/_0xc9995c)&&_0x5eea46(_0x465796(0x436)),_0x2bf10d*=_0xc9995c;}_0x1e8ad=_0x44a313[_0x465796(0x404)]+0x1,_0x6dd06a=_0x518528(_0x79c20e-_0x30648f,_0x1e8ad,_0x30648f==0x0),_0x1a265b(_0x79c20e/_0x1e8ad)>_0x454a9c-_0x229ed5&&_0x5eea46(_0x465796(0x436)),_0x229ed5+=_0x1a265b(_0x79c20e/_0x1e8ad),_0x79c20e%=_0x1e8ad,_0x44a313[_0x465796(0x2d8)](_0x79c20e++,0x0,_0x229ed5);}return _0x3bb0e7(_0x44a313);}function _0x44838f(_0x16d5de){var _0x57488e=_0x5347f5,_0x27684c,_0x379023,_0x353bb3,_0x34d479,_0x13bbef,_0x2b2135,_0x45ea79,_0x2eb35a,_0x24c54d,_0x3c0a20,_0x2b683e,_0x1a1224=[],_0x5b8f76,_0x5c8133,_0x6d68e0,_0x3afb95;_0x16d5de=_0x5ed281(_0x16d5de),_0x5b8f76=_0x16d5de[_0x57488e(0x404)],_0x27684c=_0x4de948,_0x379023=0x0,_0x13bbef=_0x503e86;for(_0x2b2135=0x0;_0x2b2135<_0x5b8f76;++_0x2b2135){_0x2b683e=_0x16d5de[_0x2b2135],_0x2b683e<0x80&&_0x1a1224[_0x57488e(0x333)](_0x31eef6(_0x2b683e));}_0x353bb3=_0x34d479=_0x1a1224[_0x57488e(0x404)];_0x34d479&&_0x1a1224[_0x57488e(0x333)](_0xa8f995);while(_0x353bb3<_0x5b8f76){for(_0x45ea79=_0x454a9c,_0x2b2135=0x0;_0x2b2135<_0x5b8f76;++_0x2b2135){_0x2b683e=_0x16d5de[_0x2b2135],_0x2b683e>=_0x27684c&&_0x2b683e<_0x45ea79&&(_0x45ea79=_0x2b683e);}_0x5c8133=_0x353bb3+0x1;_0x45ea79-_0x27684c>_0x1a265b((_0x454a9c-_0x379023)/_0x5c8133)&&_0x5eea46(_0x57488e(0x436));_0x379023+=(_0x45ea79-_0x27684c)*_0x5c8133,_0x27684c=_0x45ea79;for(_0x2b2135=0x0;_0x2b2135<_0x5b8f76;++_0x2b2135){_0x2b683e=_0x16d5de[_0x2b2135];_0x2b683e<_0x27684c&&++_0x379023>_0x454a9c&&_0x5eea46('overflow');if(_0x2b683e==_0x27684c){for(_0x2eb35a=_0x379023,_0x24c54d=_0x56554c;;_0x24c54d+=_0x56554c){_0x3c0a20=_0x24c54d<=_0x13bbef?_0x42940e:_0x24c54d>=_0x13bbef+_0x3d50f6?_0x3d50f6:_0x24c54d-_0x13bbef;if(_0x2eb35a<_0x3c0a20)break;_0x3afb95=_0x2eb35a-_0x3c0a20,_0x6d68e0=_0x56554c-_0x3c0a20,_0x1a1224[_0x57488e(0x333)](_0x31eef6(_0x20ac37(_0x3c0a20+_0x3afb95%_0x6d68e0,0x0))),_0x2eb35a=_0x1a265b(_0x3afb95/_0x6d68e0);}_0x1a1224['push'](_0x31eef6(_0x20ac37(_0x2eb35a,0x0))),_0x13bbef=_0x518528(_0x379023,_0x5c8133,_0x353bb3==_0x34d479),_0x379023=0x0,++_0x353bb3;}}++_0x379023,++_0x27684c;}return _0x1a1224[_0x57488e(0x64e)]('');}function _0x22225d(_0x166264){return _0x288761(_0x166264,function(_0x3e883f){var _0x449ba0=_0x2943;return _0x56ac60[_0x449ba0(0x509)](_0x3e883f)?_0x2e7058(_0x3e883f[_0x449ba0(0x789)](0x4)[_0x449ba0(0x14f)]()):_0x3e883f;});}function _0x173ff9(_0x4bf9b5){return _0x288761(_0x4bf9b5,function(_0x4c93e4){var _0x1d7990=_0x2943;return _0x49fb8e['test'](_0x4c93e4)?_0x1d7990(0x3d2)+_0x44838f(_0x4c93e4):_0x4c93e4;});}_0x4dc08f={'version':_0x5347f5(0x30d),'ucs2':{'decode':_0x5ed281,'encode':_0x3bb0e7},'decode':_0x2e7058,'encode':_0x44838f,'toASCII':_0x173ff9,'toUnicode':_0x22225d};if(!![])!(_0x5657a9=function(){return _0x4dc08f;}['call'](_0x1f14b7,_0x22b297,_0x1f14b7,_0x557951),_0x5657a9!==undefined&&(_0x557951[_0x5347f5(0x245)]=_0x5657a9));else{}}(this));}[_0x49eb83(0x7bf)](this,_0x22b297(_0x49eb83(0xea))(_0x4904a8),_0x22b297('./node_modules/webpack/buildin/global.js')));},'./node_modules/querystring-es3/decode.js':function(_0x30dafc,_0x5c96c3,_0x434836){'use strict';var _0xbddf7b=_0xfd30c1;function _0x2ced88(_0x1c4b3f,_0xaeb38){var _0x489d8a=_0x2943;return Object[_0x489d8a(0x59d)][_0x489d8a(0x19b)]['call'](_0x1c4b3f,_0xaeb38);}_0x30dafc[_0xbddf7b(0x245)]=function(_0x56369f,_0x29eb9d,_0x3171a4,_0x50e726){var _0x17eb3f=_0xbddf7b;_0x29eb9d=_0x29eb9d||'&',_0x3171a4=_0x3171a4||'=';var _0x1c0815={};if(typeof _0x56369f!==_0x17eb3f(0x325)||_0x56369f['length']===0x0)return _0x1c0815;var _0x2db8f4=/\+/g;_0x56369f=_0x56369f[_0x17eb3f(0x87c)](_0x29eb9d);var _0xb87a53=0x3e8;_0x50e726&&typeof _0x50e726['maxKeys']===_0x17eb3f(0x8ec)&&(_0xb87a53=_0x50e726[_0x17eb3f(0xda)]);var _0x2bead4=_0x56369f[_0x17eb3f(0x404)];_0xb87a53>0x0&&_0x2bead4>_0xb87a53&&(_0x2bead4=_0xb87a53);for(var _0x5b301a=0x0;_0x5b301a<_0x2bead4;++_0x5b301a){var _0x28841a=_0x56369f[_0x5b301a][_0x17eb3f(0x759)](_0x2db8f4,_0x17eb3f(0x5d0)),_0x3b75a7=_0x28841a['indexOf'](_0x3171a4),_0x41bca3,_0x60deda,_0xf81f06,_0x2b7ab9;_0x3b75a7>=0x0?(_0x41bca3=_0x28841a[_0x17eb3f(0x863)](0x0,_0x3b75a7),_0x60deda=_0x28841a[_0x17eb3f(0x863)](_0x3b75a7+0x1)):(_0x41bca3=_0x28841a,_0x60deda='');_0xf81f06=decodeURIComponent(_0x41bca3),_0x2b7ab9=decodeURIComponent(_0x60deda);if(!_0x2ced88(_0x1c0815,_0xf81f06))_0x1c0815[_0xf81f06]=_0x2b7ab9;else _0x7dfffd(_0x1c0815[_0xf81f06])?_0x1c0815[_0xf81f06][_0x17eb3f(0x333)](_0x2b7ab9):_0x1c0815[_0xf81f06]=[_0x1c0815[_0xf81f06],_0x2b7ab9];}return _0x1c0815;};var _0x7dfffd=Array[_0xbddf7b(0x91b)]||function(_0x348b55){var _0x5c9a90=_0xbddf7b;return Object['prototype']['toString'][_0x5c9a90(0x7bf)](_0x348b55)===_0x5c9a90(0x4b8);};},'./node_modules/querystring-es3/encode.js':function(_0x403bc1,_0x4dae4,_0x29966f){'use strict';var _0x529bb7=_0xfd30c1;var _0x5cc7eb=function(_0x490850){var _0x4429d4=_0x2943;switch(typeof _0x490850){case _0x4429d4(0x325):return _0x490850;case _0x4429d4(0x97a):return _0x490850?'true':_0x4429d4(0x230);case _0x4429d4(0x8ec):return isFinite(_0x490850)?_0x490850:'';default:return'';}};_0x403bc1[_0x529bb7(0x245)]=function(_0x3cbac8,_0x301ad4,_0x7bb47b,_0x8d0825){var _0x13686b=_0x529bb7;_0x301ad4=_0x301ad4||'&',_0x7bb47b=_0x7bb47b||'=';_0x3cbac8===null&&(_0x3cbac8=undefined);if(typeof _0x3cbac8===_0x13686b(0x219))return _0x190243(_0x1f1f3f(_0x3cbac8),function(_0x332f7a){var _0x594601=_0x13686b,_0x1e8432=encodeURIComponent(_0x5cc7eb(_0x332f7a))+_0x7bb47b;return _0x3a36e1(_0x3cbac8[_0x332f7a])?_0x190243(_0x3cbac8[_0x332f7a],function(_0x4b1f94){return _0x1e8432+encodeURIComponent(_0x5cc7eb(_0x4b1f94));})[_0x594601(0x64e)](_0x301ad4):_0x1e8432+encodeURIComponent(_0x5cc7eb(_0x3cbac8[_0x332f7a]));})[_0x13686b(0x64e)](_0x301ad4);if(!_0x8d0825)return'';return encodeURIComponent(_0x5cc7eb(_0x8d0825))+_0x7bb47b+encodeURIComponent(_0x5cc7eb(_0x3cbac8));};var _0x3a36e1=Array[_0x529bb7(0x91b)]||function(_0x4d9dc1){var _0x46f0c6=_0x529bb7;return Object[_0x46f0c6(0x59d)][_0x46f0c6(0x44a)][_0x46f0c6(0x7bf)](_0x4d9dc1)===_0x46f0c6(0x4b8);};function _0x190243(_0x4afad1,_0x17e7e1){var _0x29f3a4=_0x529bb7;if(_0x4afad1[_0x29f3a4(0x1d6)])return _0x4afad1['map'](_0x17e7e1);var _0x20c51e=[];for(var _0x52abfa=0x0;_0x52abfa<_0x4afad1['length'];_0x52abfa++){_0x20c51e['push'](_0x17e7e1(_0x4afad1[_0x52abfa],_0x52abfa));}return _0x20c51e;}var _0x1f1f3f=Object['keys']||function(_0x197825){var _0x1f7b85=_0x529bb7,_0x1c2abd=[];for(var _0x2db471 in _0x197825){if(Object[_0x1f7b85(0x59d)][_0x1f7b85(0x19b)][_0x1f7b85(0x7bf)](_0x197825,_0x2db471))_0x1c2abd['push'](_0x2db471);}return _0x1c2abd;};},'./node_modules/querystring-es3/index.js':function(_0x5eca73,_0x3315be,_0x52476c){'use strict';var _0x5a9ab7=_0xfd30c1;_0x3315be[_0x5a9ab7(0x566)]=_0x3315be[_0x5a9ab7(0x27d)]=_0x52476c('./node_modules/querystring-es3/decode.js'),_0x3315be['encode']=_0x3315be[_0x5a9ab7(0xfe)]=_0x52476c('./node_modules/querystring-es3/encode.js');},'./node_modules/url/url.js':function(_0x5e51a4,_0x45c256,_0x847c1){'use strict';var _0x187093=_0xfd30c1;var _0x541bf3=_0x847c1(_0x187093(0x613)),_0x10bf1d=_0x847c1(_0x187093(0x3fa));_0x45c256['parse']=_0xcbb0c7,_0x45c256['resolve']=_0x4efd70,_0x45c256[_0x187093(0x2bf)]=_0x7b5f0d,_0x45c256[_0x187093(0x24d)]=_0x219141,_0x45c256[_0x187093(0x142)]=_0x351199;function _0x351199(){var _0x4a456a=_0x187093;this[_0x4a456a(0x6e7)]=null,this[_0x4a456a(0x3ef)]=null,this[_0x4a456a(0x8cf)]=null,this[_0x4a456a(0x963)]=null,this[_0x4a456a(0x3d9)]=null,this['hostname']=null,this[_0x4a456a(0x373)]=null,this['search']=null,this['query']=null,this['pathname']=null,this[_0x4a456a(0x791)]=null,this['href']=null;}var _0x36f397=/^([a-z0-9.+-]+:)/i,_0x3ef76c=/:[0-9]*$/,_0x3ddcc4=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,_0x5d5883=['<','>','\x22','`','\x20','\x0d','\x0a','\x09'],_0x15439c=['{','}','|','\x5c','^','`'][_0x187093(0x954)](_0x5d5883),_0x32838a=['\x27'][_0x187093(0x954)](_0x15439c),_0x363d35=['%','/','?',';','#']['concat'](_0x32838a),_0xce5ac1=['/','?','#'],_0x419930=0xff,_0x78fb8d=/^[+a-z0-9A-Z_-]{0,63}$/,_0x3f5c8b=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,_0x1b72bb={'javascript':!![],'javascript:':!![]},_0x19c005={'javascript':!![],'javascript:':!![]},_0x1c7fe1={'http':!![],'https':!![],'ftp':!![],'gopher':!![],'file':!![],'http:':!![],'https:':!![],'ftp:':!![],'gopher:':!![],'file:':!![]},_0x1e30e1=_0x847c1('./node_modules/querystring-es3/index.js');function _0xcbb0c7(_0x970042,_0x331c2d,_0x18e236){var _0x3d42b3=_0x187093;if(_0x970042&&_0x10bf1d[_0x3d42b3(0x445)](_0x970042)&&_0x970042 instanceof _0x351199)return _0x970042;var _0x4a7edf=new _0x351199();return _0x4a7edf[_0x3d42b3(0x27d)](_0x970042,_0x331c2d,_0x18e236),_0x4a7edf;}_0x351199[_0x187093(0x59d)]['parse']=function(_0x2d3cbc,_0x3e78d4,_0x4a061f){var _0x5e3b2a=_0x187093;if(!_0x10bf1d[_0x5e3b2a(0x2d3)](_0x2d3cbc))throw new TypeError('Parameter\x20\x27url\x27\x20must\x20be\x20a\x20string,\x20not\x20'+typeof _0x2d3cbc);var _0x538ebc=_0x2d3cbc['indexOf']('?'),_0x2923c9=_0x538ebc!==-0x1&&_0x538ebc<_0x2d3cbc['indexOf']('#')?'?':'#',_0x42073f=_0x2d3cbc[_0x5e3b2a(0x87c)](_0x2923c9),_0x5c5d23=/\\/g;_0x42073f[0x0]=_0x42073f[0x0][_0x5e3b2a(0x759)](_0x5c5d23,'/'),_0x2d3cbc=_0x42073f[_0x5e3b2a(0x64e)](_0x2923c9);var _0x479b27=_0x2d3cbc;_0x479b27=_0x479b27[_0x5e3b2a(0x94b)]();if(!_0x4a061f&&_0x2d3cbc['split']('#')[_0x5e3b2a(0x404)]===0x1){var _0x1c8b14=_0x3ddcc4[_0x5e3b2a(0x547)](_0x479b27);if(_0x1c8b14){this[_0x5e3b2a(0x791)]=_0x479b27,this[_0x5e3b2a(0xeb)]=_0x479b27,this['pathname']=_0x1c8b14[0x1];if(_0x1c8b14[0x2])this['search']=_0x1c8b14[0x2],_0x3e78d4?this[_0x5e3b2a(0x33d)]=_0x1e30e1['parse'](this[_0x5e3b2a(0x993)]['substr'](0x1)):this[_0x5e3b2a(0x33d)]=this[_0x5e3b2a(0x993)]['substr'](0x1);else _0x3e78d4&&(this[_0x5e3b2a(0x993)]='',this[_0x5e3b2a(0x33d)]={});return this;}}var _0x5d5ad3=_0x36f397['exec'](_0x479b27);if(_0x5d5ad3){_0x5d5ad3=_0x5d5ad3[0x0];var _0xa47d31=_0x5d5ad3['toLowerCase']();this['protocol']=_0xa47d31,_0x479b27=_0x479b27[_0x5e3b2a(0x863)](_0x5d5ad3['length']);}if(_0x4a061f||_0x5d5ad3||_0x479b27['match'](/^\/\/[^@\/]+@[^@\/]+/)){var _0x3f0503=_0x479b27[_0x5e3b2a(0x863)](0x0,0x2)==='//';_0x3f0503&&!(_0x5d5ad3&&_0x19c005[_0x5d5ad3])&&(_0x479b27=_0x479b27['substr'](0x2),this[_0x5e3b2a(0x3ef)]=!![]);}if(!_0x19c005[_0x5d5ad3]&&(_0x3f0503||_0x5d5ad3&&!_0x1c7fe1[_0x5d5ad3])){var _0x1d5f4e=-0x1;for(var _0x4c11fa=0x0;_0x4c11fa<_0xce5ac1[_0x5e3b2a(0x404)];_0x4c11fa++){var _0x56fac8=_0x479b27['indexOf'](_0xce5ac1[_0x4c11fa]);if(_0x56fac8!==-0x1&&(_0x1d5f4e===-0x1||_0x56fac8<_0x1d5f4e))_0x1d5f4e=_0x56fac8;}var _0x439457,_0x1959e6;_0x1d5f4e===-0x1?_0x1959e6=_0x479b27[_0x5e3b2a(0x88e)]('@'):_0x1959e6=_0x479b27['lastIndexOf']('@',_0x1d5f4e);_0x1959e6!==-0x1&&(_0x439457=_0x479b27[_0x5e3b2a(0x789)](0x0,_0x1959e6),_0x479b27=_0x479b27[_0x5e3b2a(0x789)](_0x1959e6+0x1),this[_0x5e3b2a(0x8cf)]=decodeURIComponent(_0x439457));_0x1d5f4e=-0x1;for(var _0x4c11fa=0x0;_0x4c11fa<_0x363d35[_0x5e3b2a(0x404)];_0x4c11fa++){var _0x56fac8=_0x479b27[_0x5e3b2a(0x5b5)](_0x363d35[_0x4c11fa]);if(_0x56fac8!==-0x1&&(_0x1d5f4e===-0x1||_0x56fac8<_0x1d5f4e))_0x1d5f4e=_0x56fac8;}if(_0x1d5f4e===-0x1)_0x1d5f4e=_0x479b27[_0x5e3b2a(0x404)];this[_0x5e3b2a(0x963)]=_0x479b27['slice'](0x0,_0x1d5f4e),_0x479b27=_0x479b27[_0x5e3b2a(0x789)](_0x1d5f4e),this['parseHost'](),this[_0x5e3b2a(0x917)]=this[_0x5e3b2a(0x917)]||'';var _0x419792=this['hostname'][0x0]==='['&&this['hostname'][this[_0x5e3b2a(0x917)][_0x5e3b2a(0x404)]-0x1]===']';if(!_0x419792){var _0x555b12=this['hostname'][_0x5e3b2a(0x87c)](/\./);for(var _0x4c11fa=0x0,_0x570c4a=_0x555b12[_0x5e3b2a(0x404)];_0x4c11fa<_0x570c4a;_0x4c11fa++){var _0xc8fb83=_0x555b12[_0x4c11fa];if(!_0xc8fb83)continue;if(!_0xc8fb83[_0x5e3b2a(0x353)](_0x78fb8d)){var _0x6bf335='';for(var _0x1e9cec=0x0,_0x221225=_0xc8fb83[_0x5e3b2a(0x404)];_0x1e9cec<_0x221225;_0x1e9cec++){_0xc8fb83[_0x5e3b2a(0x2a2)](_0x1e9cec)>0x7f?_0x6bf335+='x':_0x6bf335+=_0xc8fb83[_0x1e9cec];}if(!_0x6bf335[_0x5e3b2a(0x353)](_0x78fb8d)){var _0x38dab2=_0x555b12[_0x5e3b2a(0x789)](0x0,_0x4c11fa),_0x3a0dbc=_0x555b12[_0x5e3b2a(0x789)](_0x4c11fa+0x1),_0x20b43e=_0xc8fb83[_0x5e3b2a(0x353)](_0x3f5c8b);_0x20b43e&&(_0x38dab2[_0x5e3b2a(0x333)](_0x20b43e[0x1]),_0x3a0dbc[_0x5e3b2a(0x60f)](_0x20b43e[0x2]));_0x3a0dbc[_0x5e3b2a(0x404)]&&(_0x479b27='/'+_0x3a0dbc[_0x5e3b2a(0x64e)]('.')+_0x479b27);this[_0x5e3b2a(0x917)]=_0x38dab2[_0x5e3b2a(0x64e)]('.');break;}}}}this[_0x5e3b2a(0x917)][_0x5e3b2a(0x404)]>_0x419930?this[_0x5e3b2a(0x917)]='':this['hostname']=this[_0x5e3b2a(0x917)][_0x5e3b2a(0x14f)]();!_0x419792&&(this[_0x5e3b2a(0x917)]=_0x541bf3[_0x5e3b2a(0x284)](this[_0x5e3b2a(0x917)]));var _0x329079=this[_0x5e3b2a(0x3d9)]?':'+this[_0x5e3b2a(0x3d9)]:'',_0x3dd2b1=this['hostname']||'';this[_0x5e3b2a(0x963)]=_0x3dd2b1+_0x329079,this[_0x5e3b2a(0xeb)]+=this['host'],_0x419792&&(this[_0x5e3b2a(0x917)]=this[_0x5e3b2a(0x917)][_0x5e3b2a(0x863)](0x1,this[_0x5e3b2a(0x917)]['length']-0x2),_0x479b27[0x0]!=='/'&&(_0x479b27='/'+_0x479b27));}if(!_0x1b72bb[_0xa47d31])for(var _0x4c11fa=0x0,_0x570c4a=_0x32838a['length'];_0x4c11fa<_0x570c4a;_0x4c11fa++){var _0x507c35=_0x32838a[_0x4c11fa];if(_0x479b27['indexOf'](_0x507c35)===-0x1)continue;var _0x5db623=encodeURIComponent(_0x507c35);_0x5db623===_0x507c35&&(_0x5db623=escape(_0x507c35)),_0x479b27=_0x479b27[_0x5e3b2a(0x87c)](_0x507c35)[_0x5e3b2a(0x64e)](_0x5db623);}var _0x353e71=_0x479b27[_0x5e3b2a(0x5b5)]('#');_0x353e71!==-0x1&&(this[_0x5e3b2a(0x373)]=_0x479b27[_0x5e3b2a(0x863)](_0x353e71),_0x479b27=_0x479b27[_0x5e3b2a(0x789)](0x0,_0x353e71));var _0x4dd081=_0x479b27['indexOf']('?');if(_0x4dd081!==-0x1)this[_0x5e3b2a(0x993)]=_0x479b27[_0x5e3b2a(0x863)](_0x4dd081),this[_0x5e3b2a(0x33d)]=_0x479b27['substr'](_0x4dd081+0x1),_0x3e78d4&&(this[_0x5e3b2a(0x33d)]=_0x1e30e1[_0x5e3b2a(0x27d)](this['query'])),_0x479b27=_0x479b27[_0x5e3b2a(0x789)](0x0,_0x4dd081);else _0x3e78d4&&(this[_0x5e3b2a(0x993)]='',this[_0x5e3b2a(0x33d)]={});if(_0x479b27)this[_0x5e3b2a(0x6a7)]=_0x479b27;_0x1c7fe1[_0xa47d31]&&this[_0x5e3b2a(0x917)]&&!this['pathname']&&(this['pathname']='/');if(this[_0x5e3b2a(0x6a7)]||this[_0x5e3b2a(0x993)]){var _0x329079=this['pathname']||'',_0x50b17b=this[_0x5e3b2a(0x993)]||'';this[_0x5e3b2a(0x791)]=_0x329079+_0x50b17b;}return this['href']=this[_0x5e3b2a(0x24d)](),this;};function _0x219141(_0x47ce08){var _0x2999d5=_0x187093;if(_0x10bf1d['isString'](_0x47ce08))_0x47ce08=_0xcbb0c7(_0x47ce08);if(!(_0x47ce08 instanceof _0x351199))return _0x351199[_0x2999d5(0x59d)][_0x2999d5(0x24d)][_0x2999d5(0x7bf)](_0x47ce08);return _0x47ce08[_0x2999d5(0x24d)]();}_0x351199[_0x187093(0x59d)][_0x187093(0x24d)]=function(){var _0xd5b6cd=_0x187093,_0x26292e=this[_0xd5b6cd(0x8cf)]||'';_0x26292e&&(_0x26292e=encodeURIComponent(_0x26292e),_0x26292e=_0x26292e[_0xd5b6cd(0x759)](/%3A/i,':'),_0x26292e+='@');var _0x1d2c2d=this[_0xd5b6cd(0x6e7)]||'',_0x542a03=this[_0xd5b6cd(0x6a7)]||'',_0x28752a=this[_0xd5b6cd(0x373)]||'',_0xb15fea=![],_0x430fb9='';if(this[_0xd5b6cd(0x963)])_0xb15fea=_0x26292e+this['host'];else this['hostname']&&(_0xb15fea=_0x26292e+(this['hostname'][_0xd5b6cd(0x5b5)](':')===-0x1?this[_0xd5b6cd(0x917)]:'['+this[_0xd5b6cd(0x917)]+']'),this['port']&&(_0xb15fea+=':'+this[_0xd5b6cd(0x3d9)]));this['query']&&_0x10bf1d[_0xd5b6cd(0x445)](this[_0xd5b6cd(0x33d)])&&Object[_0xd5b6cd(0x8ae)](this[_0xd5b6cd(0x33d)])[_0xd5b6cd(0x404)]&&(_0x430fb9=_0x1e30e1['stringify'](this['query']));var _0x19d60c=this['search']||_0x430fb9&&'?'+_0x430fb9||'';if(_0x1d2c2d&&_0x1d2c2d['substr'](-0x1)!==':')_0x1d2c2d+=':';if(this[_0xd5b6cd(0x3ef)]||(!_0x1d2c2d||_0x1c7fe1[_0x1d2c2d])&&_0xb15fea!==![]){_0xb15fea='//'+(_0xb15fea||'');if(_0x542a03&&_0x542a03['charAt'](0x0)!=='/')_0x542a03='/'+_0x542a03;}else!_0xb15fea&&(_0xb15fea='');if(_0x28752a&&_0x28752a[_0xd5b6cd(0x297)](0x0)!=='#')_0x28752a='#'+_0x28752a;if(_0x19d60c&&_0x19d60c[_0xd5b6cd(0x297)](0x0)!=='?')_0x19d60c='?'+_0x19d60c;return _0x542a03=_0x542a03[_0xd5b6cd(0x759)](/[?#]/g,function(_0x271e0e){return encodeURIComponent(_0x271e0e);}),_0x19d60c=_0x19d60c['replace']('#',_0xd5b6cd(0x504)),_0x1d2c2d+_0xb15fea+_0x542a03+_0x19d60c+_0x28752a;};function _0x4efd70(_0x276596,_0x1d02f0){var _0x258ce2=_0x187093;return _0xcbb0c7(_0x276596,![],!![])[_0x258ce2(0x654)](_0x1d02f0);}_0x351199[_0x187093(0x59d)][_0x187093(0x654)]=function(_0x540652){var _0x36cc2a=_0x187093;return this[_0x36cc2a(0x2bf)](_0xcbb0c7(_0x540652,![],!![]))[_0x36cc2a(0x24d)]();};function _0x7b5f0d(_0x18e025,_0x3cf6db){var _0x41bb20=_0x187093;if(!_0x18e025)return _0x3cf6db;return _0xcbb0c7(_0x18e025,![],!![])[_0x41bb20(0x2bf)](_0x3cf6db);}_0x351199[_0x187093(0x59d)]['resolveObject']=function(_0x5f3a37){var _0xa5a7d=_0x187093;if(_0x10bf1d['isString'](_0x5f3a37)){var _0x55ab39=new _0x351199();_0x55ab39[_0xa5a7d(0x27d)](_0x5f3a37,![],!![]),_0x5f3a37=_0x55ab39;}var _0x45c80e=new _0x351199(),_0x390aff=Object[_0xa5a7d(0x8ae)](this);for(var _0xa0bef8=0x0;_0xa0bef8<_0x390aff['length'];_0xa0bef8++){var _0xf2cc6b=_0x390aff[_0xa0bef8];_0x45c80e[_0xf2cc6b]=this[_0xf2cc6b];}_0x45c80e[_0xa5a7d(0x373)]=_0x5f3a37[_0xa5a7d(0x373)];if(_0x5f3a37[_0xa5a7d(0xeb)]==='')return _0x45c80e[_0xa5a7d(0xeb)]=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;if(_0x5f3a37['slashes']&&!_0x5f3a37[_0xa5a7d(0x6e7)]){var _0x172cf9=Object[_0xa5a7d(0x8ae)](_0x5f3a37);for(var _0x5d1359=0x0;_0x5d1359<_0x172cf9[_0xa5a7d(0x404)];_0x5d1359++){var _0x1b2d72=_0x172cf9[_0x5d1359];if(_0x1b2d72!==_0xa5a7d(0x6e7))_0x45c80e[_0x1b2d72]=_0x5f3a37[_0x1b2d72];}return _0x1c7fe1[_0x45c80e[_0xa5a7d(0x6e7)]]&&_0x45c80e[_0xa5a7d(0x917)]&&!_0x45c80e[_0xa5a7d(0x6a7)]&&(_0x45c80e[_0xa5a7d(0x791)]=_0x45c80e[_0xa5a7d(0x6a7)]='/'),_0x45c80e[_0xa5a7d(0xeb)]=_0x45c80e['format'](),_0x45c80e;}if(_0x5f3a37['protocol']&&_0x5f3a37[_0xa5a7d(0x6e7)]!==_0x45c80e[_0xa5a7d(0x6e7)]){if(!_0x1c7fe1[_0x5f3a37[_0xa5a7d(0x6e7)]]){var _0x280966=Object[_0xa5a7d(0x8ae)](_0x5f3a37);for(var _0x343cbb=0x0;_0x343cbb<_0x280966['length'];_0x343cbb++){var _0x2af20d=_0x280966[_0x343cbb];_0x45c80e[_0x2af20d]=_0x5f3a37[_0x2af20d];}return _0x45c80e['href']=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;}_0x45c80e[_0xa5a7d(0x6e7)]=_0x5f3a37[_0xa5a7d(0x6e7)];if(!_0x5f3a37[_0xa5a7d(0x963)]&&!_0x19c005[_0x5f3a37[_0xa5a7d(0x6e7)]]){var _0x44bcb0=(_0x5f3a37['pathname']||'')[_0xa5a7d(0x87c)]('/');while(_0x44bcb0[_0xa5a7d(0x404)]&&!(_0x5f3a37[_0xa5a7d(0x963)]=_0x44bcb0[_0xa5a7d(0x396)]()));if(!_0x5f3a37[_0xa5a7d(0x963)])_0x5f3a37[_0xa5a7d(0x963)]='';if(!_0x5f3a37[_0xa5a7d(0x917)])_0x5f3a37[_0xa5a7d(0x917)]='';if(_0x44bcb0[0x0]!=='')_0x44bcb0[_0xa5a7d(0x60f)]('');if(_0x44bcb0[_0xa5a7d(0x404)]<0x2)_0x44bcb0['unshift']('');_0x45c80e['pathname']=_0x44bcb0[_0xa5a7d(0x64e)]('/');}else _0x45c80e[_0xa5a7d(0x6a7)]=_0x5f3a37[_0xa5a7d(0x6a7)];_0x45c80e[_0xa5a7d(0x993)]=_0x5f3a37['search'],_0x45c80e['query']=_0x5f3a37[_0xa5a7d(0x33d)],_0x45c80e[_0xa5a7d(0x963)]=_0x5f3a37['host']||'',_0x45c80e[_0xa5a7d(0x8cf)]=_0x5f3a37['auth'],_0x45c80e[_0xa5a7d(0x917)]=_0x5f3a37['hostname']||_0x5f3a37['host'],_0x45c80e['port']=_0x5f3a37[_0xa5a7d(0x3d9)];if(_0x45c80e[_0xa5a7d(0x6a7)]||_0x45c80e[_0xa5a7d(0x993)]){var _0x1372d5=_0x45c80e[_0xa5a7d(0x6a7)]||'',_0x13c210=_0x45c80e[_0xa5a7d(0x993)]||'';_0x45c80e[_0xa5a7d(0x791)]=_0x1372d5+_0x13c210;}return _0x45c80e[_0xa5a7d(0x3ef)]=_0x45c80e['slashes']||_0x5f3a37['slashes'],_0x45c80e[_0xa5a7d(0xeb)]=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;}var _0x2187dc=_0x45c80e[_0xa5a7d(0x6a7)]&&_0x45c80e['pathname'][_0xa5a7d(0x297)](0x0)==='/',_0x2981a5=_0x5f3a37['host']||_0x5f3a37[_0xa5a7d(0x6a7)]&&_0x5f3a37[_0xa5a7d(0x6a7)][_0xa5a7d(0x297)](0x0)==='/',_0x3c0d92=_0x2981a5||_0x2187dc||_0x45c80e[_0xa5a7d(0x963)]&&_0x5f3a37[_0xa5a7d(0x6a7)],_0x1ec445=_0x3c0d92,_0x46c0c1=_0x45c80e[_0xa5a7d(0x6a7)]&&_0x45c80e[_0xa5a7d(0x6a7)]['split']('/')||[],_0x44bcb0=_0x5f3a37['pathname']&&_0x5f3a37[_0xa5a7d(0x6a7)]['split']('/')||[],_0x294ca9=_0x45c80e[_0xa5a7d(0x6e7)]&&!_0x1c7fe1[_0x45c80e['protocol']];if(_0x294ca9){_0x45c80e[_0xa5a7d(0x917)]='',_0x45c80e[_0xa5a7d(0x3d9)]=null;if(_0x45c80e[_0xa5a7d(0x963)]){if(_0x46c0c1[0x0]==='')_0x46c0c1[0x0]=_0x45c80e[_0xa5a7d(0x963)];else _0x46c0c1[_0xa5a7d(0x60f)](_0x45c80e['host']);}_0x45c80e[_0xa5a7d(0x963)]='';if(_0x5f3a37[_0xa5a7d(0x6e7)]){_0x5f3a37[_0xa5a7d(0x917)]=null,_0x5f3a37[_0xa5a7d(0x3d9)]=null;if(_0x5f3a37['host']){if(_0x44bcb0[0x0]==='')_0x44bcb0[0x0]=_0x5f3a37[_0xa5a7d(0x963)];else _0x44bcb0[_0xa5a7d(0x60f)](_0x5f3a37[_0xa5a7d(0x963)]);}_0x5f3a37[_0xa5a7d(0x963)]=null;}_0x3c0d92=_0x3c0d92&&(_0x44bcb0[0x0]===''||_0x46c0c1[0x0]==='');}if(_0x2981a5)_0x45c80e[_0xa5a7d(0x963)]=_0x5f3a37[_0xa5a7d(0x963)]||_0x5f3a37[_0xa5a7d(0x963)]===''?_0x5f3a37[_0xa5a7d(0x963)]:_0x45c80e[_0xa5a7d(0x963)],_0x45c80e[_0xa5a7d(0x917)]=_0x5f3a37['hostname']||_0x5f3a37[_0xa5a7d(0x917)]===''?_0x5f3a37[_0xa5a7d(0x917)]:_0x45c80e[_0xa5a7d(0x917)],_0x45c80e[_0xa5a7d(0x993)]=_0x5f3a37[_0xa5a7d(0x993)],_0x45c80e['query']=_0x5f3a37[_0xa5a7d(0x33d)],_0x46c0c1=_0x44bcb0;else{if(_0x44bcb0[_0xa5a7d(0x404)]){if(!_0x46c0c1)_0x46c0c1=[];_0x46c0c1[_0xa5a7d(0x330)](),_0x46c0c1=_0x46c0c1[_0xa5a7d(0x954)](_0x44bcb0),_0x45c80e[_0xa5a7d(0x993)]=_0x5f3a37[_0xa5a7d(0x993)],_0x45c80e[_0xa5a7d(0x33d)]=_0x5f3a37['query'];}else{if(!_0x10bf1d[_0xa5a7d(0xde)](_0x5f3a37[_0xa5a7d(0x993)])){if(_0x294ca9){_0x45c80e[_0xa5a7d(0x917)]=_0x45c80e[_0xa5a7d(0x963)]=_0x46c0c1['shift']();var _0xdea96e=_0x45c80e['host']&&_0x45c80e[_0xa5a7d(0x963)][_0xa5a7d(0x5b5)]('@')>0x0?_0x45c80e[_0xa5a7d(0x963)][_0xa5a7d(0x87c)]('@'):![];_0xdea96e&&(_0x45c80e[_0xa5a7d(0x8cf)]=_0xdea96e[_0xa5a7d(0x396)](),_0x45c80e[_0xa5a7d(0x963)]=_0x45c80e[_0xa5a7d(0x917)]=_0xdea96e[_0xa5a7d(0x396)]());}return _0x45c80e[_0xa5a7d(0x993)]=_0x5f3a37[_0xa5a7d(0x993)],_0x45c80e['query']=_0x5f3a37['query'],(!_0x10bf1d[_0xa5a7d(0x560)](_0x45c80e[_0xa5a7d(0x6a7)])||!_0x10bf1d[_0xa5a7d(0x560)](_0x45c80e[_0xa5a7d(0x993)]))&&(_0x45c80e[_0xa5a7d(0x791)]=(_0x45c80e[_0xa5a7d(0x6a7)]?_0x45c80e['pathname']:'')+(_0x45c80e[_0xa5a7d(0x993)]?_0x45c80e[_0xa5a7d(0x993)]:'')),_0x45c80e['href']=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;}}}if(!_0x46c0c1[_0xa5a7d(0x404)])return _0x45c80e[_0xa5a7d(0x6a7)]=null,_0x45c80e[_0xa5a7d(0x993)]?_0x45c80e[_0xa5a7d(0x791)]='/'+_0x45c80e['search']:_0x45c80e[_0xa5a7d(0x791)]=null,_0x45c80e[_0xa5a7d(0xeb)]=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;var _0x19fe1d=_0x46c0c1[_0xa5a7d(0x789)](-0x1)[0x0],_0x55f6e5=(_0x45c80e[_0xa5a7d(0x963)]||_0x5f3a37[_0xa5a7d(0x963)]||_0x46c0c1[_0xa5a7d(0x404)]>0x1)&&(_0x19fe1d==='.'||_0x19fe1d==='..')||_0x19fe1d==='',_0x338b24=0x0;for(var _0x40c836=_0x46c0c1['length'];_0x40c836>=0x0;_0x40c836--){_0x19fe1d=_0x46c0c1[_0x40c836];if(_0x19fe1d==='.')_0x46c0c1[_0xa5a7d(0x2d8)](_0x40c836,0x1);else{if(_0x19fe1d==='..')_0x46c0c1['splice'](_0x40c836,0x1),_0x338b24++;else _0x338b24&&(_0x46c0c1[_0xa5a7d(0x2d8)](_0x40c836,0x1),_0x338b24--);}}if(!_0x3c0d92&&!_0x1ec445)for(;_0x338b24--;_0x338b24){_0x46c0c1['unshift']('..');}_0x3c0d92&&_0x46c0c1[0x0]!==''&&(!_0x46c0c1[0x0]||_0x46c0c1[0x0][_0xa5a7d(0x297)](0x0)!=='/')&&_0x46c0c1[_0xa5a7d(0x60f)]('');_0x55f6e5&&_0x46c0c1[_0xa5a7d(0x64e)]('/')[_0xa5a7d(0x863)](-0x1)!=='/'&&_0x46c0c1['push']('');var _0x45f5e8=_0x46c0c1[0x0]===''||_0x46c0c1[0x0]&&_0x46c0c1[0x0][_0xa5a7d(0x297)](0x0)==='/';if(_0x294ca9){_0x45c80e['hostname']=_0x45c80e['host']=_0x45f5e8?'':_0x46c0c1[_0xa5a7d(0x404)]?_0x46c0c1['shift']():'';var _0xdea96e=_0x45c80e[_0xa5a7d(0x963)]&&_0x45c80e[_0xa5a7d(0x963)][_0xa5a7d(0x5b5)]('@')>0x0?_0x45c80e[_0xa5a7d(0x963)][_0xa5a7d(0x87c)]('@'):![];_0xdea96e&&(_0x45c80e['auth']=_0xdea96e['shift'](),_0x45c80e[_0xa5a7d(0x963)]=_0x45c80e['hostname']=_0xdea96e[_0xa5a7d(0x396)]());}return _0x3c0d92=_0x3c0d92||_0x45c80e[_0xa5a7d(0x963)]&&_0x46c0c1[_0xa5a7d(0x404)],_0x3c0d92&&!_0x45f5e8&&_0x46c0c1[_0xa5a7d(0x60f)](''),!_0x46c0c1['length']?(_0x45c80e[_0xa5a7d(0x6a7)]=null,_0x45c80e[_0xa5a7d(0x791)]=null):_0x45c80e['pathname']=_0x46c0c1[_0xa5a7d(0x64e)]('/'),(!_0x10bf1d[_0xa5a7d(0x560)](_0x45c80e[_0xa5a7d(0x6a7)])||!_0x10bf1d[_0xa5a7d(0x560)](_0x45c80e['search']))&&(_0x45c80e[_0xa5a7d(0x791)]=(_0x45c80e['pathname']?_0x45c80e[_0xa5a7d(0x6a7)]:'')+(_0x45c80e['search']?_0x45c80e['search']:'')),_0x45c80e[_0xa5a7d(0x8cf)]=_0x5f3a37[_0xa5a7d(0x8cf)]||_0x45c80e['auth'],_0x45c80e[_0xa5a7d(0x3ef)]=_0x45c80e[_0xa5a7d(0x3ef)]||_0x5f3a37['slashes'],_0x45c80e[_0xa5a7d(0xeb)]=_0x45c80e[_0xa5a7d(0x24d)](),_0x45c80e;},_0x351199[_0x187093(0x59d)]['parseHost']=function(){var _0x31e503=_0x187093,_0x3fcf06=this[_0x31e503(0x963)],_0x1f7071=_0x3ef76c[_0x31e503(0x547)](_0x3fcf06);_0x1f7071&&(_0x1f7071=_0x1f7071[0x0],_0x1f7071!==':'&&(this['port']=_0x1f7071['substr'](0x1)),_0x3fcf06=_0x3fcf06['substr'](0x0,_0x3fcf06[_0x31e503(0x404)]-_0x1f7071[_0x31e503(0x404)]));if(_0x3fcf06)this['hostname']=_0x3fcf06;};},'./node_modules/url/util.js':function(_0x189de3,_0x443b1e,_0x125f1d){'use strict';_0x189de3['exports']={'isString':function(_0x26f110){var _0x46695d=_0x2943;return typeof _0x26f110===_0x46695d(0x325);},'isObject':function(_0x316faa){return typeof _0x316faa==='object'&&_0x316faa!==null;},'isNull':function(_0x35550b){return _0x35550b===null;},'isNullOrUndefined':function(_0x55bd29){return _0x55bd29==null;}};},'./node_modules/webpack/buildin/global.js':function(_0x2d2d93,_0x3b2204){var _0x51f9a3=_0xfd30c1,_0x134be7;_0x134be7=(function(){return this;}());try{_0x134be7=_0x134be7||new Function(_0x51f9a3(0x6fc))();}catch(_0x1c6857){if(typeof window===_0x51f9a3(0x219))_0x134be7=window;}_0x2d2d93[_0x51f9a3(0x245)]=_0x134be7;},'./node_modules/webpack/buildin/module.js':function(_0x2c36c0,_0x55616e){var _0x59cd32=_0xfd30c1;_0x2c36c0[_0x59cd32(0x245)]=function(_0x256a4b){var _0xc8fd00=_0x59cd32;if(!_0x256a4b[_0xc8fd00(0x502)]){_0x256a4b[_0xc8fd00(0x3a5)]=function(){},_0x256a4b[_0xc8fd00(0x8cc)]=[];if(!_0x256a4b['children'])_0x256a4b['children']=[];Object[_0xc8fd00(0x4b6)](_0x256a4b,'loaded',{'enumerable':!![],'get':function(){return _0x256a4b['l'];}}),Object[_0xc8fd00(0x4b6)](_0x256a4b,'id',{'enumerable':!![],'get':function(){return _0x256a4b['i'];}}),_0x256a4b[_0xc8fd00(0x502)]=0x1;}return _0x256a4b;};},'./src/js/app.js':function(_0x3b0f72,_0x1f69af,_0x1a0ef2){'use strict';var _0x4c4069=_0xfd30c1;window[_0x4c4069(0x937)]=!![];var _0x14f639=location['hostname']!==_0x4c4069(0x8f6)&&!location[_0x4c4069(0x917)][_0x4c4069(0x95c)](_0x4c4069(0x27e));_0x1a0ef2(_0x4c4069(0x302));var _0x15695a=_0x1a0ef2('./src/js/libs/io-client.js'),_0x4271e0=_0x1a0ef2(_0x4c4069(0x26f)),_0x5ce08f=_0x1a0ef2('./src/js/libs/animText.js'),_0x252a23=_0x1a0ef2(_0x4c4069(0x4e8)),_0x10bf8a=_0x1a0ef2(_0x4c4069(0x96c)),_0x1a5e63=_0x1a0ef2('./src/js/data/items.js'),_0x4e6f57=_0x1a0ef2(_0x4c4069(0x4f7)),_0x2876a7=_0x1a0ef2('./src/js/data/objectManager.js'),_0x56ec72=_0x1a0ef2('./src/js/data/player.js'),_0x308ccd=_0x1a0ef2(_0x4c4069(0x830)),_0x2c1827=_0x1a0ef2(_0x4c4069(0x694)),_0x33ede5=_0x1a0ef2(_0x4c4069(0x7fa)),_0x419fce=_0x1a0ef2(_0x4c4069(0x158))['obj'],_0x3d45a7=new _0x5ce08f[(_0x4c4069(0x77d))](),_0x140074=_0x1a0ef2(_0x4c4069(0x6ec)),_0x32bba1=new _0x140074(_0x4c4069(0x77a),0xbb8,_0x252a23[_0x4c4069(0x231)],0x5,![]);_0x32bba1[_0x4c4069(0x122)]=![];function _0x26bd0e(_0x1b2fba,_0x4c177c){var _0x469165=_0x4c4069;!_0x4c177c&&(_0x4c177c=window[_0x469165(0x25c)]['href']);_0x1b2fba=_0x1b2fba[_0x469165(0x759)](/[\[\]]/g,_0x469165(0x4c0));var _0x1c147c=new RegExp(_0x469165(0x639)+_0x1b2fba+'(=([^&#]*)|&|#|$)'),_0xd15991=_0x1c147c['exec'](_0x4c177c);if(!_0xd15991)return null;if(!_0xd15991[0x2])return'';return decodeURIComponent(_0xd15991[0x2]['replace'](/\+/g,'\x20'));}var _0x38bfb7=![],_0x436d48=![];function _0x447522(){var _0x22ed86=_0x4c4069;if(!_0x3239b4||!_0x5e8ab1)return;_0x436d48=!![],_0x14f639?window[_0x22ed86(0x147)][_0x22ed86(0x316)](_0x22ed86(0x65f),{'action':_0x22ed86(0x63b)})[_0x22ed86(0x3d0)](function(_0x887172){_0x2a045f(_0x887172);}):_0x2a045f(null);}function _0x2a045f(_0x318d62){var _0x49b7e5=_0x4c4069;_0x32bba1[_0x49b7e5(0x7a2)](function(_0x44136f,_0x26f628,_0x29a451){var _0xb6eb4f=_0x49b7e5,_0x19eaad=_0x14f639?_0xb6eb4f(0x72b):'ws',_0xe43746=_0x19eaad+'://'+_0x44136f+':'+0x1f48+_0xb6eb4f(0x2fd)+_0x29a451;if(_0x318d62)_0xe43746+=_0xb6eb4f(0x792)+encodeURIComponent(_0x318d62);_0x15695a[_0xb6eb4f(0x7a0)](_0xe43746,function(_0x3cbaf7){_0x28aa37(),setInterval(()=>_0x28aa37(),0x9c4),_0x3cbaf7?_0x3e1d36(_0x3cbaf7):(_0x38bfb7=!![],_0x4229a3());},{'id':_0x32ce0a,'d':_0x3e1d36,'1':_0x3bf803,'2':_0x1589cf,'4':_0x143f20,'33':_0x203fb2,'5':_0x4b0823,'6':_0x444514,'a':_0x46e008,'aa':_0x4eb3ab,'7':_0x550146,'8':_0x1d1bcf,'sp':_0x3f1eea,'9':_0x33d5da,'h':_0xe19720,'11':_0x514ba1,'12':_0x21d7f7,'13':_0x466c2d,'14':_0x1cb152,'15':_0x19b92a,'16':_0x4cc213,'17':_0x550713,'18':_0x47b0be,'19':_0x3ce86a,'20':_0x53f240,'ac':_0x1a3883,'ad':_0x47dbbf,'an':_0x13c805,'st':_0x25888c,'sa':_0xf8b4dc,'us':_0x1e9eb4,'ch':_0x4c59b4,'mm':_0xd991af,'t':_0x822fd4,'p':_0x219f9c,'pp':_0x3e1b43}),_0x12b825(),setTimeout(()=>_0x533960(),0x3*0x3e8);},function(_0x2945e6){var _0x3f3c55=_0x49b7e5;console[_0x3f3c55(0x514)]('Vultr\x20error:',_0x2945e6),alert(_0x3f3c55(0x944)+_0x2945e6),_0x3e1d36(_0x3f3c55(0x608));});}function _0x415f53(){var _0x352665=_0x4c4069;return _0x15695a[_0x352665(0x65b)];}function _0x234164(){var _0x22976c=_0x4c4069,_0x2636b2=_0x4df546['value'],_0x27c5a3=prompt(_0x22976c(0x62a),_0x2636b2);_0x27c5a3&&(window['onbeforeunload']=undefined,window[_0x22976c(0x25c)]['href']='/?server='+_0x27c5a3);}var _0x1b7595=new _0x419fce(_0x252a23,_0x4271e0);function _0x5f27d7(_0x11d32e){var _0x31d5a9=_0x4c4069;if(_0x11d32e==undefined)_0x11d32e=!_0x1b7595[_0x31d5a9(0x4ab)];_0x1b7595[_0x31d5a9(0x4ab)]=_0x11d32e,_0x1f9e9f(_0x31d5a9(0x18a),_0x11d32e?0x1:0x0);}var _0x43c407=Math['PI'],_0x2e6311=_0x43c407*0x2,_0x4886fa=_0x43c407*0x3,_0x3d0e4c=Math[_0x4c4069(0x11d)];Math[_0x4c4069(0x936)]=function(_0x24bda7,_0x59b43f,_0x19416b){var _0x1b8deb=_0x4c4069,_0x1c5fc5=Math[_0x1b8deb(0x11d)](_0x59b43f-_0x24bda7);_0x1c5fc5>_0x43c407&&(_0x24bda7>_0x59b43f?_0x59b43f+=_0x2e6311:_0x24bda7+=_0x2e6311);var _0x523f04=_0x59b43f+(_0x24bda7-_0x59b43f)*_0x19416b;if(_0x523f04>=0x0&&_0x523f04<=_0x2e6311)return _0x523f04;return _0x523f04%_0x2e6311;},CanvasRenderingContext2D[_0x4c4069(0x59d)][_0x4c4069(0x6c7)]=function(_0x28b844,_0x55fca1,_0x4b9f8b,_0x1a414d,_0x3a39e3){var _0x4d70db=_0x4c4069;if(_0x4b9f8b<0x2*_0x3a39e3)_0x3a39e3=_0x4b9f8b/0x2;if(_0x1a414d<0x2*_0x3a39e3)_0x3a39e3=_0x1a414d/0x2;if(_0x3a39e3<0x0)_0x3a39e3=0x0;return this[_0x4d70db(0x6f8)](),this[_0x4d70db(0x4bc)](_0x28b844+_0x3a39e3,_0x55fca1),this[_0x4d70db(0x8b8)](_0x28b844+_0x4b9f8b,_0x55fca1,_0x28b844+_0x4b9f8b,_0x55fca1+_0x1a414d,_0x3a39e3),this[_0x4d70db(0x8b8)](_0x28b844+_0x4b9f8b,_0x55fca1+_0x1a414d,_0x28b844,_0x55fca1+_0x1a414d,_0x3a39e3),this[_0x4d70db(0x8b8)](_0x28b844,_0x55fca1+_0x1a414d,_0x28b844,_0x55fca1,_0x3a39e3),this[_0x4d70db(0x8b8)](_0x28b844,_0x55fca1,_0x28b844+_0x4b9f8b,_0x55fca1,_0x3a39e3),this['closePath'](),this;};var _0x2760ba;typeof Storage!==_0x4c4069(0x3fe)&&(_0x2760ba=!![]);function _0x1f9e9f(_0x1f2e6e,_0xc6f14b){var _0x4f2ca9=_0x4c4069;if(_0x2760ba)localStorage[_0x4f2ca9(0x581)](_0x1f2e6e,_0xc6f14b);}function _0x5297a0(_0x1733b3){var _0x315fa9=_0x4c4069;if(_0x2760ba)localStorage[_0x315fa9(0x6c3)](_0x1733b3);}function _0x207805(_0x42be46){if(_0x2760ba)return localStorage['getItem'](_0x42be46);return null;}var _0x5bf8b0=!![],_0x24c43d=_0x5bf8b0?!![]:_0x207805(_0x4c4069(0x62e));function _0x4ee2bb(){var _0x509afe=_0x4c4069;!_0x24c43d&&(_0x24c43d=!![],_0x1f9e9f(_0x509afe(0x62e),0x1));}var _0x4f70eb,_0x47b036,_0x3448b5,_0x126d17=0x1,_0x3d1537,_0x4bc405,_0x2fec6c,_0x3b063f=Date[_0x4c4069(0x951)](),_0x86fbe0,_0x3781ef,_0x33d1e5=[],_0x15cbee=[],_0x29e7f4=[],_0xc6fef7=[],_0x273611=[],_0x22945a=new _0x33ede5(_0x2c1827,_0x273611,_0x15cbee,_0x33d1e5,_0x3d4c29,_0x1a5e63,_0x252a23,_0x4271e0),_0x3f6bc6=_0x1a0ef2(_0x4c4069(0x924)),_0x26b317=_0x1a0ef2(_0x4c4069(0x20d)),_0x926bb8=new _0x3f6bc6(_0x33d1e5,_0x26b317,_0x15cbee,_0x1a5e63,null,_0x252a23,_0x4271e0),_0x3522e5,_0x3f7d86,_0x3abbd0,_0x229bf0=0x1,_0x1b5894=0x0,_0x34dbf5=0x0,_0x2f1fec=0x0,_0x39d2c8={'id':-0x1,'startX':0x0,'startY':0x0,'currentX':0x0,'currentY':0x0},_0x1b84ce={'id':-0x1,'startX':0x0,'startY':0x0,'currentX':0x0,'currentY':0x0},_0x490b88,_0x17514f,_0x5f1445,_0xe3bff1=0x0,_0x361505=_0x252a23[_0x4c4069(0x38d)],_0x26317f=_0x252a23[_0x4c4069(0x742)],_0x1655fa,_0x28fa9f,_0x3604ee=![],_0x349ca3=document[_0x4c4069(0x838)](_0x4c4069(0x40c)),_0x3fd78a=document[_0x4c4069(0x838)](_0x4c4069(0x85b)),_0x213880=document['getElementById'](_0x4c4069(0x171)),_0x4d4b4a=document['getElementById'](_0x4c4069(0x65d)),_0x987171=document[_0x4c4069(0x838)]('partyButton'),_0x9fc051=document[_0x4c4069(0x838)](_0x4c4069(0x113)),_0x2079d7=document[_0x4c4069(0x838)](_0x4c4069(0x666)),_0x2a60b9=_0x2079d7[_0x4c4069(0x4d5)]('span')[0x0],_0x381efb=document[_0x4c4069(0x838)](_0x4c4069(0x101)),_0x1f0aec=document[_0x4c4069(0x838)](_0x4c4069(0x8d8)),_0x40ae1f=document[_0x4c4069(0x838)]('chatButton'),_0x15b64f=document[_0x4c4069(0x838)](_0x4c4069(0x339)),_0x315ee0=_0x15b64f[_0x4c4069(0x26e)]('2d'),_0x4df546=document[_0x4c4069(0x838)](_0x4c4069(0x5bd)),_0x294d63=document['getElementById'](_0x4c4069(0x523)),_0x60e4d5=document[_0x4c4069(0x838)](_0x4c4069(0x2e1)),_0x2cd824=document[_0x4c4069(0x838)]('playMusic'),_0x943ba0=document[_0x4c4069(0x838)](_0x4c4069(0xe9)),_0x936b8c=document[_0x4c4069(0x838)](_0x4c4069(0x6ad)),_0x42ee52=document[_0x4c4069(0x838)](_0x4c4069(0x5b7)),_0x4cd21a=document[_0x4c4069(0x838)](_0x4c4069(0x52a)),_0x44cd52=document[_0x4c4069(0x838)](_0x4c4069(0x7a7)),_0xc866cc=document[_0x4c4069(0x838)](_0x4c4069(0x309)),_0x841522=document[_0x4c4069(0x838)]('actionBar'),_0x4f870f=document[_0x4c4069(0x838)](_0x4c4069(0x381)),_0x4f8d35=document[_0x4c4069(0x838)](_0x4c4069(0x29e)),_0x12d056=document[_0x4c4069(0x838)](_0x4c4069(0x7d9)),_0x8bbc99=document[_0x4c4069(0x838)](_0x4c4069(0x727)),_0x18e0a4=document['getElementById']('killCounter'),_0x578738=document[_0x4c4069(0x838)]('leaderboardData'),_0x567c55=document['getElementById']('nameInput'),_0x2ea2d3=document[_0x4c4069(0x838)](_0x4c4069(0x6bd)),_0x48a5f1=document[_0x4c4069(0x838)](_0x4c4069(0x76e)),_0x3091d9=document[_0x4c4069(0x838)]('ageBarBody'),_0x30e3e5=document[_0x4c4069(0x838)](_0x4c4069(0x4eb)),_0x3a177c=document[_0x4c4069(0x838)](_0x4c4069(0x535)),_0x3712e9=document[_0x4c4069(0x838)](_0x4c4069(0x415)),_0x1d0ec8=document[_0x4c4069(0x838)](_0x4c4069(0x3c3)),_0x14dd7c=document['getElementById']('allianceManager'),_0x5964e9=document[_0x4c4069(0x838)](_0x4c4069(0x93e)),_0x31420d=document[_0x4c4069(0x838)](_0x4c4069(0x619)),_0x4bcc78=document[_0x4c4069(0x838)](_0x4c4069(0x875)),_0x2ee1eb=_0x5964e9[_0x4c4069(0x26e)]('2d');_0x5964e9[_0x4c4069(0x338)]=0x12c,_0x5964e9[_0x4c4069(0x646)]=0x12c;var _0x33d872=document[_0x4c4069(0x838)](_0x4c4069(0x193)),_0x2ab36f=document[_0x4c4069(0x838)](_0x4c4069(0x58b)),_0x21c8a4=document[_0x4c4069(0x838)](_0x4c4069(0x7cc)),_0xff75ba=_0x308ccd['hats'],_0x507a1f=_0x308ccd['accessories'];hatts=_0xff75ba,accessoriees=_0x507a1f;var _0x3d4c29=new _0x2876a7(_0x10bf8a,_0xc6fef7,_0x4271e0,_0x252a23),_0x1a973e='#525252',_0x496f04='#3d3f42',_0x224ee7=5.5;$(_0x4c4069(0x351))[_0x4c4069(0x27f)]({'background':_0x4c4069(0x103)}),document['getElementById'](_0x4c4069(0x3f6))[_0x4c4069(0x29c)][_0x4c4069(0x545)]=_0x4c4069(0x893),document[_0x4c4069(0x838)](_0x4c4069(0x66a))['style'][_0x4c4069(0x196)]=_0x4c4069(0x15e),document[_0x4c4069(0x838)]('resDisplay')['appendChild'](document[_0x4c4069(0x838)](_0x4c4069(0x3c9))),document[_0x4c4069(0x838)](_0x4c4069(0x3c9))[_0x4c4069(0x29c)]['bottom']=_0x4c4069(0x41b),document[_0x4c4069(0x838)](_0x4c4069(0x3c9))[_0x4c4069(0x29c)]['right']='20px',document['getElementById'](_0x4c4069(0x29e))[_0x4c4069(0x29c)][_0x4c4069(0x196)]=_0x4c4069(0x893),document[_0x4c4069(0x838)](_0x4c4069(0x727))[_0x4c4069(0x29c)]['display']='20px',document['getElementById'](_0x4c4069(0x7d9))[_0x4c4069(0x29c)][_0x4c4069(0x196)]='20px',_0x381efb['style'][_0x4c4069(0x545)]=_0x4c4069(0x216),_0x1f0aec['style'][_0x4c4069(0x545)]='270px',_0x381efb[_0x4c4069(0x48c)]('id'),_0x1f0aec[_0x4c4069(0x48c)]('id'),document[_0x4c4069(0x838)](_0x4c4069(0x6bd))[_0x4c4069(0x29c)][_0x4c4069(0x545)]='270px',document[_0x4c4069(0x838)](_0x4c4069(0x6bd))['style'][_0x4c4069(0x5b3)]=_0x4c4069(0x546);function _0x32ce0a(_0x182a6c){var _0x5dc18a=_0x4c4069;_0x29e7f4=_0x182a6c[_0x5dc18a(0x183)];}var _0x1275e6=document['getElementById'](_0x4c4069(0x78e)),_0x1a9386=[{'name':_0x4c4069(0x34e),'link':_0x4c4069(0x3bf)},{'name':_0x4c4069(0x63d),'link':_0x4c4069(0x6c5)}],_0x2ef054=_0x1a9386[_0x4271e0[_0x4c4069(0x1af)](0x0,_0x1a9386[_0x4c4069(0x404)]-0x1)];_0x1275e6[_0x4c4069(0x426)]=_0x4c4069(0x1e3)+_0x2ef054[_0x4c4069(0x356)]+_0x4c4069(0x321)+_0x2ef054[_0x4c4069(0x2f1)]+_0x4c4069(0x1d9);var _0x363e8f=!![],_0x3239b4=![],_0x5e8ab1=![];window[_0x4c4069(0x825)]=function(){_0x363e8f=![];},window['onfocus']=function(){var _0x2ec768=_0x4c4069;_0x363e8f=!![],_0x3522e5&&_0x3522e5[_0x2ec768(0x1c5)]&&_0x2c1498();},window[_0x4c4069(0x66f)]=function(){_0x3239b4=!![],_0x447522(),setTimeout(function(){!_0x436d48&&window['location']['reload']();},0x14*0x3e8);},window[_0x4c4069(0x3cf)]=function(){_0x5e8ab1=!![],_0x447522();},_0x15b64f[_0x4c4069(0x42b)]=function(){return![];};function _0x3e1d36(_0x4dda73){var _0xf34a3c=_0x4c4069;_0x38bfb7=![],_0x15695a[_0xf34a3c(0x7d6)](),_0x2b7172(_0x4dda73);}function _0x2b7172(_0x3c160d){var _0x7465d9=_0x4c4069;_0x3fd78a[_0x7465d9(0x29c)][_0x7465d9(0x196)]=_0x7465d9(0x76c),_0xc866cc[_0x7465d9(0x29c)]['display']=_0x7465d9(0x15e),_0x42ee52[_0x7465d9(0x29c)][_0x7465d9(0x196)]=_0x7465d9(0x15e),_0x31420d[_0x7465d9(0x29c)][_0x7465d9(0x196)]=_0x7465d9(0x15e),_0x44cd52[_0x7465d9(0x29c)][_0x7465d9(0x196)]=_0x7465d9(0x76c),_0x44cd52[_0x7465d9(0x426)]=_0x3c160d+_0x7465d9(0x889);}function _0x100d25(){var _0x36dc99=_0x4c4069;_0x213880['onclick']=_0x4271e0['checkTrusted'](function(){_0x3a0ac3();}),_0x4271e0[_0x36dc99(0x4fb)](_0x213880),_0x4d4b4a[_0x36dc99(0x90b)]=_0x4271e0[_0x36dc99(0x89e)](function(){var _0x23e582=_0x36dc99;_0x365f0a(_0x23e582(0x401));}),_0x4271e0[_0x36dc99(0x4fb)](_0x4d4b4a),_0x9fc051['onclick']=_0x4271e0['checkTrusted'](function(){setTimeout(function(){_0x234164();},0xa);}),_0x4271e0[_0x36dc99(0x4fb)](_0x9fc051),_0x2079d7['onclick']=_0x4271e0['checkTrusted'](function(){_0x5650cd();}),_0x4271e0['hookTouchEvents'](_0x2079d7),_0x381efb[_0x36dc99(0x90b)]=_0x4271e0[_0x36dc99(0x89e)](function(){_0x46e323();}),_0x4271e0[_0x36dc99(0x4fb)](_0x381efb),_0x1f0aec[_0x36dc99(0x90b)]=_0x4271e0[_0x36dc99(0x89e)](function(){_0x5bf6f1();}),_0x4271e0[_0x36dc99(0x4fb)](_0x1f0aec),_0x40ae1f['onclick']=_0x4271e0['checkTrusted'](function(){_0x148a64();}),_0x4271e0['hookTouchEvents'](_0x40ae1f),_0x5964e9['onclick']=_0x4271e0[_0x36dc99(0x89e)](function(){_0x28009f();}),_0x4271e0['hookTouchEvents'](_0x5964e9);}var _0x3c3be6=0x1;function _0x12b825(){var _0x5dbfb0=_0x4c4069,_0x5e6440='',_0x3f80b3=0x0,_0x152f55=0x0;for(var _0x5c7e66 in _0x32bba1[_0x5dbfb0(0x536)]){var _0x5f0b2a=_0x32bba1[_0x5dbfb0(0x536)][_0x5c7e66],_0x253353=0x0;for(var _0x1d9f9c=0x0;_0x1d9f9c<_0x5f0b2a[_0x5dbfb0(0x404)];_0x1d9f9c++){for(var _0x101d52=0x0;_0x101d52<_0x5f0b2a[_0x1d9f9c][_0x5dbfb0(0x850)][_0x5dbfb0(0x404)];_0x101d52++){_0x253353+=_0x5f0b2a[_0x1d9f9c][_0x5dbfb0(0x850)][_0x101d52]['playerCount'];}}_0x3f80b3+=_0x253353;var _0x1e5f9b=_0x32bba1['regionInfo'][_0x5c7e66][_0x5dbfb0(0x2f1)];_0x5e6440+=_0x5dbfb0(0x4ba)+_0x1e5f9b+_0x5dbfb0(0x52c)+_0x253353+_0x5dbfb0(0x540);for(var _0x1e9d95=0x0;_0x1e9d95<_0x5f0b2a['length'];_0x1e9d95++){var _0x50f96f=_0x5f0b2a[_0x1e9d95];for(var _0x3b2def=0x0;_0x3b2def<_0x50f96f[_0x5dbfb0(0x850)]['length'];_0x3b2def++){var _0x54f082=_0x50f96f[_0x5dbfb0(0x850)][_0x3b2def],_0x4d6448=_0x50f96f[_0x5dbfb0(0x556)]*_0x3c3be6+_0x3b2def+0x1,_0x29d957=_0x32bba1[_0x5dbfb0(0x153)]&&_0x32bba1[_0x5dbfb0(0x153)]['region']===_0x50f96f[_0x5dbfb0(0x1c2)]&&_0x32bba1['server'][_0x5dbfb0(0x556)]===_0x50f96f[_0x5dbfb0(0x556)]&&_0x32bba1[_0x5dbfb0(0x87a)]==_0x3b2def,_0x4f8277=_0x1e5f9b+'\x20'+_0x4d6448+'\x20['+Math[_0x5dbfb0(0x176)](_0x54f082[_0x5dbfb0(0x60c)],_0x252a23[_0x5dbfb0(0x231)])+'/'+_0x252a23[_0x5dbfb0(0x231)]+']';let _0x12d1a5=_0x32bba1['stripRegion'](_0x5c7e66)+':'+_0x1e9d95+':'+_0x3b2def;if(_0x29d957)_0x987171[_0x5dbfb0(0x4d5)](_0x5dbfb0(0x992))[0x0]['innerText']=_0x12d1a5;let _0x45a616=_0x29d957?_0x5dbfb0(0x704):'';_0x5e6440+=_0x5dbfb0(0x2be)+_0x12d1a5+'\x27\x20'+_0x45a616+'>'+_0x4f8277+_0x5dbfb0(0x4ad);}}_0x5e6440+=_0x5dbfb0(0x785),_0x152f55++;}_0x5e6440+=_0x5dbfb0(0x2e7)+_0x3f80b3+_0x5dbfb0(0x540),_0x4df546['innerHTML']=_0x5e6440;var _0x1ee3d8,_0x4c0bf8;location['hostname']==_0x5dbfb0(0x2c8)?(_0x1ee3d8=_0x5dbfb0(0x777),_0x4c0bf8=_0x5dbfb0(0x685)):(_0x1ee3d8=_0x5dbfb0(0x703),_0x4c0bf8=_0x5dbfb0(0x6c0)),document[_0x5dbfb0(0x838)](_0x5dbfb0(0x342))[_0x5dbfb0(0x426)]='<a\x20href=\x27'+_0x4c0bf8+'\x27>'+_0x1ee3d8+_0x5dbfb0(0x92f);}function _0x533960(){var _0x37bece=_0x4c4069,_0x447f81=new XMLHttpRequest(),_0x125811=_0x37bece(0x362);_0x447f81[_0x37bece(0x1f3)]=function(){var _0x524cea=_0x37bece;this[_0x524cea(0x54c)]==0x4&&(this[_0x524cea(0x361)]==0xc8?(window[_0x524cea(0x458)]=JSON['parse'](this[_0x524cea(0x38f)]),_0x32bba1[_0x524cea(0x79d)](vultr['servers']),_0x12b825()):console[_0x524cea(0x514)]('Failed\x20to\x20load\x20server\x20data\x20with\x20status\x20code:',this[_0x524cea(0x361)]));},_0x447f81['open'](_0x37bece(0x637),_0x125811,!![]),_0x447f81[_0x37bece(0x1a6)]();}_0x4df546[_0x4c4069(0x8bb)](_0x4c4069(0x31f),_0x4271e0[_0x4c4069(0x89e)](function(){var _0x2cbcfa=_0x4c4069;let _0x4a23a9=_0x4df546[_0x2cbcfa(0x985)][_0x2cbcfa(0x87c)](':');_0x32bba1['switchServer'](_0x4a23a9[0x0],_0x4a23a9[0x1],_0x4a23a9[0x2]);}));var _0x5da0a7=document[_0x4c4069(0x838)](_0x4c4069(0x945)),_0x5ee338=null,_0x30235d=null,_0x563d66=0x3e8*0x3c*0x5,_0x1faa42=0x0,_0x13e56c=0x0;function _0x3a0ac3(){var _0x1bb92b=_0x4c4069;_0x13e56c++;var _0x48b185=_0x13e56c>0x1,_0x57e6c7=Date['now']()-_0x1faa42>_0x563d66;_0x48b185&&_0x57e6c7?(_0x1faa42=Date[_0x1bb92b(0x951)](),_0x2d75d6()):_0x5e5ef0();}function _0x2d75d6(){var _0x351ca3=_0x4c4069;if(!window[_0x351ca3(0x8bd)]){return console[_0x351ca3(0x91a)]('Failed\x20to\x20load\x20video\x20ad\x20API');void _0x5e5ef0();}window[_0x351ca3(0x8bd)][_0x351ca3(0x333)]({'type':'next','adBreakDone':()=>{_0x5e5ef0();}});}window['adsbygoogle']&&adsbygoogle[_0x4c4069(0x333)]({'preloadAdBreaks':'on'}),window[_0x4c4069(0x811)]=_0x2d75d6;function _0x342fdf(){var _0x205878=_0x4c4069;_0x5da0a7[_0x205878(0x29c)][_0x205878(0x196)]=_0x205878(0x15e),_0x5e5ef0();}function _0x342c8a(_0x48baa0,_0x534662,_0x269cee){var _0x5cd68c=_0x4c4069;if(_0x3522e5&&_0x48baa0){_0x4271e0[_0x5cd68c(0x365)](_0x2ea2d3),_0x2ea2d3[_0x5cd68c(0x1a0)][_0x5cd68c(0x110)](_0x5cd68c(0x65a)),_0x4271e0['generateElement']({'id':_0x5cd68c(0xfd),'text':_0x4271e0['capitalizeFirst'](_0x48baa0[_0x5cd68c(0x2f1)]),'parent':_0x2ea2d3}),_0x4271e0[_0x5cd68c(0x39d)]({'id':'itemInfoDesc','text':_0x48baa0[_0x5cd68c(0x2c2)],'parent':_0x2ea2d3});if(_0x269cee){}else{if(_0x534662)_0x4271e0[_0x5cd68c(0x39d)]({'class':_0x5cd68c(0x1da),'text':!_0x48baa0[_0x5cd68c(0x669)]?_0x5cd68c(0x72f):_0x5cd68c(0x5e1),'parent':_0x2ea2d3});else{for(var _0x39e75d=0x0;_0x39e75d<_0x48baa0[_0x5cd68c(0x6e1)][_0x5cd68c(0x404)];_0x39e75d+=0x2){_0x4271e0['generateElement']({'class':'itemInfoReq','html':_0x48baa0['req'][_0x39e75d]+'<span\x20class=\x27itemInfoReqVal\x27>\x20x'+_0x48baa0['req'][_0x39e75d+0x1]+_0x5cd68c(0x139),'parent':_0x2ea2d3});}_0x48baa0[_0x5cd68c(0x408)][_0x5cd68c(0x716)]&&_0x4271e0['generateElement']({'class':_0x5cd68c(0x264),'text':(_0x3522e5[_0x5cd68c(0x538)][_0x48baa0['group']['id']]||0x0)+'/'+_0x48baa0[_0x5cd68c(0x408)][_0x5cd68c(0x716)],'parent':_0x2ea2d3});}}}else _0x2ea2d3[_0x5cd68c(0x1a0)][_0x5cd68c(0x779)]('visible');}var _0x410ae3=[],_0x46b0fa=[];function _0x13c805(_0x1b2911,_0x427389){var _0x3a8b06=_0x4c4069;_0x410ae3[_0x3a8b06(0x333)]({'sid':_0x1b2911,'name':_0x427389}),_0x2790d3();}function _0x2790d3(){var _0x3ab042=_0x4c4069;if(_0x410ae3[0x0]){var _0x456630=_0x410ae3[0x0];_0x4271e0[_0x3ab042(0x365)](_0x21c8a4),_0x21c8a4[_0x3ab042(0x29c)][_0x3ab042(0x196)]='block',_0x4271e0[_0x3ab042(0x39d)]({'class':'notificationText','text':_0x456630[_0x3ab042(0x2f1)],'parent':_0x21c8a4}),_0x4271e0['generateElement']({'class':_0x3ab042(0x5e5),'html':_0x3ab042(0x1e0),'parent':_0x21c8a4,'onclick':function(){_0x255d10(0x0);},'hookTouch':!![]}),_0x4271e0[_0x3ab042(0x39d)]({'class':_0x3ab042(0x5e5),'html':_0x3ab042(0x69c),'parent':_0x21c8a4,'onclick':function(){_0x255d10(0x1);},'hookTouch':!![]});}else _0x21c8a4[_0x3ab042(0x29c)][_0x3ab042(0x196)]='none';}function _0x1a3883(_0x14339b){var _0x21d56d=_0x4c4069;_0x29e7f4[_0x21d56d(0x333)](_0x14339b);if(_0x3712e9[_0x21d56d(0x29c)][_0x21d56d(0x196)]=='block')_0x49b4f4();}function _0x25888c(_0x40a592,_0x55a470){var _0xcc5c43=_0x4c4069;if(_0x3522e5){_0x3522e5[_0xcc5c43(0x2b8)]=_0x40a592,_0x3522e5[_0xcc5c43(0x4f3)]=_0x55a470;if(_0x3712e9[_0xcc5c43(0x29c)][_0xcc5c43(0x196)]==_0xcc5c43(0x76c))_0x49b4f4();}}function _0xf8b4dc(_0x3bee4e){var _0xdcb14a=_0x4c4069;_0x46b0fa=_0x3bee4e;if(_0x3712e9['style'][_0xdcb14a(0x196)]==_0xdcb14a(0x76c))_0x49b4f4();}function _0x47dbbf(_0x30bd5b){var _0x3e7ce5=_0x4c4069;for(var _0x2a0982=_0x29e7f4['length']-0x1;_0x2a0982>=0x0;_0x2a0982--){if(_0x29e7f4[_0x2a0982]['sid']==_0x30bd5b)_0x29e7f4[_0x3e7ce5(0x2d8)](_0x2a0982,0x1);}if(_0x3712e9[_0x3e7ce5(0x29c)][_0x3e7ce5(0x196)]==_0x3e7ce5(0x76c))_0x49b4f4();}function _0x46e323(){var _0x14ed3d=_0x4c4069;_0x2c1498(),_0x3712e9[_0x14ed3d(0x29c)]['display']!=_0x14ed3d(0x76c)?_0x49b4f4():_0x3712e9[_0x14ed3d(0x29c)]['display']=_0x14ed3d(0x15e);}function _0x49b4f4(){var _0x52288c=_0x4c4069;if(_0x3522e5&&_0x3522e5[_0x52288c(0x1c5)]){_0x27c730(),_0x33d872[_0x52288c(0x29c)]['display']=_0x52288c(0x15e),_0x3712e9[_0x52288c(0x29c)][_0x52288c(0x196)]=_0x52288c(0x76c),_0x4271e0[_0x52288c(0x365)](_0x1d0ec8);if(_0x3522e5['team'])for(var _0x3b610e=0x0;_0x3b610e<_0x46b0fa[_0x52288c(0x404)];_0x3b610e+=0x2){(function(_0x567e7b){var _0x17e619=_0x52288c,_0x451398=_0x4271e0[_0x17e619(0x39d)]({'class':'allianceItem','style':_0x17e619(0x5b6)+(_0x46b0fa[_0x567e7b]==_0x3522e5[_0x17e619(0x204)]?'#fff':'rgba(255,255,255,0.6)'),'text':_0x46b0fa[_0x567e7b+0x1],'parent':_0x1d0ec8});_0x3522e5[_0x17e619(0x4f3)]&&_0x46b0fa[_0x567e7b]!=_0x3522e5[_0x17e619(0x204)]&&_0x4271e0[_0x17e619(0x39d)]({'class':'joinAlBtn','text':_0x17e619(0x9b0),'onclick':function(){_0x553f15(_0x46b0fa[_0x567e7b]);},'hookTouch':!![],'parent':_0x451398});}(_0x3b610e));}else{if(_0x29e7f4[_0x52288c(0x404)])for(var _0x3b610e=0x0;_0x3b610e<_0x29e7f4[_0x52288c(0x404)];++_0x3b610e){(function(_0x3f02f4){var _0x11a247=_0x52288c,_0x5dac7f=_0x4271e0[_0x11a247(0x39d)]({'class':'allianceItem','style':_0x11a247(0x5b6)+(_0x29e7f4[_0x3f02f4][_0x11a247(0x204)]==_0x3522e5[_0x11a247(0x2b8)]?'#fff':_0x11a247(0x606)),'text':_0x29e7f4[_0x3f02f4][_0x11a247(0x204)],'parent':_0x1d0ec8});_0x4271e0[_0x11a247(0x39d)]({'class':_0x11a247(0x584),'text':'Join','onclick':function(){_0x423723(_0x3f02f4);},'hookTouch':!![],'parent':_0x5dac7f});}(_0x3b610e));}else _0x4271e0[_0x52288c(0x39d)]({'class':_0x52288c(0x327),'text':_0x52288c(0x7c2),'parent':_0x1d0ec8});}_0x4271e0[_0x52288c(0x365)](_0x14dd7c),_0x3522e5[_0x52288c(0x2b8)]?_0x4271e0[_0x52288c(0x39d)]({'class':_0x52288c(0xef),'style':'width:\x20360px','text':_0x3522e5[_0x52288c(0x4f3)]?_0x52288c(0x855):_0x52288c(0x49f),'onclick':function(){_0x271fd4();},'hookTouch':!![],'parent':_0x14dd7c}):(_0x4271e0[_0x52288c(0x39d)]({'tag':_0x52288c(0x3cd),'type':_0x52288c(0x957),'id':_0x52288c(0x305),'maxLength':0x7,'placeholder':_0x52288c(0x712),'ontouchstart':function(_0xdc1eb8){var _0x10d1ba=_0x52288c;_0xdc1eb8['preventDefault']();var _0x596985=prompt(_0x10d1ba(0x712),_0xdc1eb8[_0x10d1ba(0x89b)]['value']);_0xdc1eb8[_0x10d1ba(0x89b)][_0x10d1ba(0x985)]=_0x596985[_0x10d1ba(0x789)](0x0,0x7);},'parent':_0x14dd7c}),_0x4271e0[_0x52288c(0x39d)]({'tag':_0x52288c(0x3d6),'class':_0x52288c(0xef),'style':_0x52288c(0x4e4),'text':_0x52288c(0x62f),'onclick':function(){_0x1b1f4f();},'hookTouch':!![],'parent':_0x14dd7c}));}}function _0x255d10(_0x29a165){var _0x1a34a6=_0x4c4069;_0x15695a[_0x1a34a6(0x1a6)]('11',_0x410ae3[0x0][_0x1a34a6(0x204)],_0x29a165),_0x410ae3[_0x1a34a6(0x2d8)](0x0,0x1),_0x2790d3();}function _0x553f15(_0x47cf80){var _0x232022=_0x4c4069;_0x15695a[_0x232022(0x1a6)]('12',_0x47cf80);}function _0x423723(_0x384995){var _0x2418b6=_0x4c4069;_0x15695a[_0x2418b6(0x1a6)]('10',_0x29e7f4[_0x384995][_0x2418b6(0x204)]),myConfig[_0x2418b6(0x40f)]=_0x29e7f4[_0x384995][_0x2418b6(0x204)],botConfig[_0x2418b6(0x942)]=!![];}function _0x1b1f4f(){var _0x4f028b=_0x4c4069;_0x15695a[_0x4f028b(0x1a6)]('8',document['getElementById'](_0x4f028b(0x305))[_0x4f028b(0x985)]),myConfig[_0x4f028b(0x40f)]=document[_0x4f028b(0x838)]('allianceInput')[_0x4f028b(0x985)],botConfig[_0x4f028b(0x942)]=!![];}function _0x271fd4(){_0x410ae3=[],_0x2790d3(),_0x15695a['send']('9');}var _0x1a6ccc,_0x179129,_0x4d1033,_0x5e10d1=[],_0x116378=[],_0x24f196,_0xd84006;function _0x3ee47d(){var _0x4139b9=_0x4c4069;this[_0x4139b9(0x4b1)]=function(_0xff2a56,_0x2df23e){var _0x5a94de=_0x4139b9;this[_0x5a94de(0x5d9)]=0x0,this['x']=_0xff2a56,this['y']=_0x2df23e,this[_0x5a94de(0x4ab)]=!![];},this[_0x4139b9(0x767)]=function(_0x29ad6d,_0x195f5b){var _0x24eb82=_0x4139b9;this[_0x24eb82(0x4ab)]&&(this[_0x24eb82(0x5d9)]+=0.05*_0x195f5b,this[_0x24eb82(0x5d9)]>=_0x252a23[_0x24eb82(0x908)]?this[_0x24eb82(0x4ab)]=![]:(_0x29ad6d[_0x24eb82(0x452)]=0x1-Math[_0x24eb82(0x77b)](0x0,this[_0x24eb82(0x5d9)]/_0x252a23[_0x24eb82(0x908)]),_0x29ad6d[_0x24eb82(0x6f8)](),_0x29ad6d[_0x24eb82(0x25e)](this['x']/_0x252a23[_0x24eb82(0x141)]*_0x5964e9[_0x24eb82(0x338)],this['y']/_0x252a23[_0x24eb82(0x141)]*_0x5964e9['width'],this[_0x24eb82(0x5d9)],0x0,0x2*Math['PI']),_0x29ad6d['stroke']()));};}function _0x219f9c(_0x4566b3,_0x3bcc62){var _0x315d3b=_0x4c4069;for(var _0x3dfbbc=0x0;_0x3dfbbc<_0x5e10d1[_0x315d3b(0x404)];++_0x3dfbbc){if(!_0x5e10d1[_0x3dfbbc][_0x315d3b(0x4ab)]){_0x24f196=_0x5e10d1[_0x3dfbbc];break;}}!_0x24f196&&(_0x24f196=new _0x3ee47d(),_0x5e10d1['push'](_0x24f196)),_0x24f196[_0x315d3b(0x4b1)](_0x4566b3,_0x3bcc62);}function _0x1a1112(_0x55fce7,_0x12ce5d){var _0x34c7cb=_0x4c4069;for(var _0x168af2=0x0;_0x168af2<_0x116378[_0x34c7cb(0x404)];++_0x168af2){if(!_0x116378[_0x168af2]['active']){_0xd84006=_0x116378[_0x168af2];break;}}!_0xd84006&&(_0xd84006=new _0x3ee47d(),_0x116378[_0x34c7cb(0x333)](_0xd84006)),_0xd84006['init'](_0x55fce7,_0x12ce5d);}function _0x17c46c(){if(!_0x4d1033)_0x4d1033={};_0x4d1033['x']=_0x3522e5['x'],_0x4d1033['y']=_0x3522e5['y'];}function _0xd991af(_0x30b3e4){_0x179129=_0x30b3e4;}function _0x48b7e5(_0x1196ec){var _0x3dec54=_0x4c4069;if(_0x3522e5&&_0x3522e5[_0x3dec54(0x1c5)]){_0x2ee1eb[_0x3dec54(0x946)](0x0,0x0,_0x5964e9[_0x3dec54(0x338)],_0x5964e9[_0x3dec54(0x646)]),_0x2ee1eb['strokeStyle']=_0x3dec54(0xe6),_0x2ee1eb[_0x3dec54(0x713)]=0x4;for(var _0x33fe0b=0x0;_0x33fe0b<_0x5e10d1['length'];++_0x33fe0b){_0x24f196=_0x5e10d1[_0x33fe0b],_0x24f196['update'](_0x2ee1eb,_0x1196ec);}_0x2ee1eb['strokeStyle']='#cc5151',_0x2ee1eb['lineWidth']=0x4;for(var _0x33fe0b=0x0;_0x33fe0b<_0x116378[_0x3dec54(0x404)];++_0x33fe0b){_0xd84006=_0x116378[_0x33fe0b],_0xd84006[_0x3dec54(0x767)](_0x2ee1eb,_0x1196ec);}_0x2ee1eb[_0x3dec54(0x452)]=0x1,_0x2ee1eb[_0x3dec54(0x3fb)]=_0x3dec54(0xe6),_0x4741da(_0x3522e5['x']/_0x252a23[_0x3dec54(0x141)]*_0x5964e9['width'],_0x3522e5['y']/_0x252a23[_0x3dec54(0x141)]*_0x5964e9[_0x3dec54(0x646)],0x7,_0x2ee1eb,!![]),_0x2ee1eb[_0x3dec54(0x3fb)]=_0x3dec54(0x326);if(_0x3522e5[_0x3dec54(0x2b8)]&&_0x179129)for(var _0x33fe0b=0x0;_0x33fe0b<_0x179129[_0x3dec54(0x404)];){_0x4741da(_0x179129[_0x33fe0b]/_0x252a23[_0x3dec54(0x141)]*_0x5964e9[_0x3dec54(0x338)],_0x179129[_0x33fe0b+0x1]/_0x252a23[_0x3dec54(0x141)]*_0x5964e9['height'],0x7,_0x2ee1eb,!![]),_0x33fe0b+=0x2;}_0x1a6ccc&&(_0x2ee1eb[_0x3dec54(0x3fb)]=_0x3dec54(0x771),_0x2ee1eb[_0x3dec54(0x872)]=_0x3dec54(0x86f),_0x2ee1eb[_0x3dec54(0x8af)]=_0x3dec54(0x3e2),_0x2ee1eb['textAlign']='center',_0x2ee1eb[_0x3dec54(0x7d2)]('x',_0x1a6ccc['x']/_0x252a23['mapScale']*_0x5964e9['width'],_0x1a6ccc['y']/_0x252a23[_0x3dec54(0x141)]*_0x5964e9[_0x3dec54(0x646)])),_0x4d1033&&(_0x2ee1eb['fillStyle']=_0x3dec54(0xe6),_0x2ee1eb[_0x3dec54(0x872)]=_0x3dec54(0x86f),_0x2ee1eb[_0x3dec54(0x8af)]=_0x3dec54(0x3e2),_0x2ee1eb[_0x3dec54(0x8d9)]=_0x3dec54(0x9a6),_0x2ee1eb[_0x3dec54(0x7d2)]('x',_0x4d1033['x']/_0x252a23[_0x3dec54(0x141)]*_0x5964e9[_0x3dec54(0x338)],_0x4d1033['y']/_0x252a23[_0x3dec54(0x141)]*_0x5964e9[_0x3dec54(0x646)]));}}var _0x166e52=0x0,_0x1c4f31={};function _0x535f8f(_0x4c3096){_0x166e52!=_0x4c3096&&(_0x166e52=_0x4c3096,_0x11e376());}function _0x5bf6f1(){var _0x5d1458=_0x4c4069;_0x33d872[_0x5d1458(0x29c)][_0x5d1458(0x196)]!=_0x5d1458(0x76c)?(_0x33d872[_0x5d1458(0x29c)][_0x5d1458(0x196)]=_0x5d1458(0x76c),_0x3712e9[_0x5d1458(0x29c)][_0x5d1458(0x196)]=_0x5d1458(0x15e),_0x27c730(),_0x11e376()):_0x33d872['style'][_0x5d1458(0x196)]=_0x5d1458(0x15e);}function _0x1e9eb4(_0x420b54,_0x11ac2e,_0x23e46c){var _0x443749=_0x4c4069;if(_0x23e46c){if(!_0x420b54)_0x3522e5[_0x443749(0x32e)][_0x11ac2e]=0x1;else _0x3522e5['tailIndex']=_0x11ac2e;}else{if(!_0x420b54)_0x3522e5['skins'][_0x11ac2e]=0x1;else _0x3522e5[_0x443749(0x201)]=_0x11ac2e;}if(_0x33d872[_0x443749(0x29c)]['display']==_0x443749(0x76c))_0x11e376();}function _0x11e376(){var _0x20c254=_0x4c4069;if(_0x3522e5){_0x4271e0[_0x20c254(0x365)](_0x2ab36f);var _0x30c8ba=_0x166e52,_0x239f27=_0x30c8ba?_0x507a1f:_0xff75ba;for(var _0x1d75c3=0x0;_0x1d75c3<_0x239f27[_0x20c254(0x404)];++_0x1d75c3){!_0x239f27[_0x1d75c3][_0x20c254(0x726)]&&function(_0x5d6b85){var _0x344a3a=_0x20c254,_0x4f4f42=_0x4271e0['generateElement']({'id':_0x344a3a(0x37b)+_0x5d6b85,'class':'storeItem','onmouseout':function(){_0x342c8a();},'onmouseover':function(){_0x342c8a(_0x239f27[_0x5d6b85],![],!![]);},'parent':_0x2ab36f});_0x4271e0[_0x344a3a(0x4fb)](_0x4f4f42,!![]),_0x4271e0[_0x344a3a(0x39d)]({'tag':_0x344a3a(0x214),'class':_0x344a3a(0x41c),'src':_0x344a3a(0x491)+(_0x30c8ba?_0x344a3a(0x315):_0x344a3a(0x372))+_0x239f27[_0x5d6b85]['id']+(_0x239f27[_0x5d6b85]['topSprite']?'_p':'')+'.png','parent':_0x4f4f42}),_0x4271e0[_0x344a3a(0x39d)]({'tag':_0x344a3a(0x992),'text':_0x239f27[_0x5d6b85][_0x344a3a(0x2f1)],'parent':_0x4f4f42});if(_0x30c8ba?!_0x3522e5[_0x344a3a(0x32e)][_0x239f27[_0x5d6b85]['id']]:!_0x3522e5[_0x344a3a(0x5eb)][_0x239f27[_0x5d6b85]['id']])_0x4271e0[_0x344a3a(0x39d)]({'class':_0x344a3a(0x584),'style':_0x344a3a(0x4a7),'text':_0x344a3a(0x621),'onclick':function(){_0x4aea54(_0x239f27[_0x5d6b85]['id'],_0x30c8ba);},'hookTouch':!![],'parent':_0x4f4f42}),_0x4271e0[_0x344a3a(0x39d)]({'tag':'span','class':_0x344a3a(0x500),'text':_0x239f27[_0x5d6b85][_0x344a3a(0x8c5)],'parent':_0x4f4f42});else(_0x30c8ba?_0x3522e5['tailIndex']:_0x3522e5['skinIndex'])==_0x239f27[_0x5d6b85]['id']?_0x4271e0[_0x344a3a(0x39d)]({'class':_0x344a3a(0x584),'style':'margin-top:\x205px','text':_0x344a3a(0x169),'onclick':function(){_0x48e847(0x0,_0x30c8ba);},'hookTouch':!![],'parent':_0x4f4f42}):_0x4271e0['generateElement']({'class':_0x344a3a(0x584),'style':_0x344a3a(0x4a7),'text':'Equip','onclick':function(){_0x48e847(_0x239f27[_0x5d6b85]['id'],_0x30c8ba);},'hookTouch':!![],'parent':_0x4f4f42});}(_0x1d75c3);}}}function _0x48e847(_0x1c5989,_0x2842c8){var _0x29ad18=_0x4c4069;if(_0x3522e5[_0x29ad18(0x1c5)]){if(_0x2842c8==0x0)_0x15695a[_0x29ad18(0x1a6)](_0x29ad18(0x3d1),0x0,_0x1c5989,0x0);else _0x2842c8==0x1&&_0x15695a['send'](_0x29ad18(0x3d1),0x0,_0x1c5989,0x1);}}function _0x4aea54(_0x283a0f,_0x58872b){var _0x365de2=_0x4c4069;_0x15695a['send'](_0x365de2(0x3d1),0x1,_0x283a0f,_0x58872b);}function _0xcd504(_0x194805,_0x4ae602,_0xef3f67){var _0x43082e=_0x4c4069;if(_0x3522e5[_0x43082e(0x1c5)]){if(_0x4ae602==0x0)_0x3522e5[_0x43082e(0x5eb)][_0x194805]?_0xef3f67?_0x3522e5['skinIndex']!=_0x194805&&_0x15695a[_0x43082e(0x1a6)](_0x43082e(0x3d1),0x0,_0x194805,0x0):_0x15695a[_0x43082e(0x1a6)](_0x43082e(0x3d1),0x0,_0x194805,0x0):(_0xef3f67?_0x3522e5[_0x43082e(0x201)]!=0x0&&_0x15695a['send'](_0x43082e(0x3d1),0x0,0x0,0x0):_0x15695a['send'](_0x43082e(0x3d1),0x0,0x0,0x0),_0x15695a[_0x43082e(0x1a6)](_0x43082e(0x3d1),0x1,_0x194805,0x0));else _0x4ae602==0x1&&(_0x3522e5['tails'][_0x194805]?_0xef3f67?_0x3522e5[_0x43082e(0x45c)]!=_0x194805&&_0x15695a[_0x43082e(0x1a6)]('13c',0x0,_0x194805,0x1):_0x15695a[_0x43082e(0x1a6)]('13c',0x0,_0x194805,0x1):(_0xef3f67?_0x3522e5[_0x43082e(0x45c)]!=0x0&&_0x15695a[_0x43082e(0x1a6)]('13c',0x0,0x0,0x1):_0x15695a[_0x43082e(0x1a6)]('13c',0x0,0x0,0x1),_0x15695a[_0x43082e(0x1a6)]('13c',0x1,_0x194805,0x1)));}}function _0x286887(){var _0x429429=_0x4c4069;_0x15695a[_0x429429(0x1a6)]('13c',0x0,0x0,0x0);}function _0x3b4a3c(){var _0x344cb0=_0x4c4069;_0x15695a['send'](_0x344cb0(0x3d1),0x0,0x0,0x1);}function _0x2702a6(){var _0x3a6d65=_0x4c4069;_0x33d872['style'][_0x3a6d65(0x196)]=_0x3a6d65(0x15e),_0x3712e9['style'][_0x3a6d65(0x196)]=_0x3a6d65(0x15e),_0x27c730();}function _0x14f291(){var _0x469cd4=_0x4c4069,_0x4f9811=_0x207805(_0x469cd4(0xe2));!_0x4f9811?_0x41ca88(typeof cordova!=='undefined'):_0x41ca88(_0x4f9811==_0x469cd4(0x1fd));_0x47b036=_0x207805(_0x469cd4(0x5da))==_0x469cd4(0x1fd),_0x943ba0[_0x469cd4(0x4ec)]=!_0x47b036,_0x3448b5=_0x207805('moo_moosic')||0x0,setInterval(function(){var _0x1c40ec=_0x469cd4;window['cordova']&&(document[_0x1c40ec(0x838)]('downloadButtonContainer')[_0x1c40ec(0x1a0)]['add'](_0x1c40ec(0x6d8)),document[_0x1c40ec(0x838)](_0x1c40ec(0x7c8))[_0x1c40ec(0x1a0)][_0x1c40ec(0x110)](_0x1c40ec(0x6d8)));},0x3e8),_0x21c0b6(),_0x4271e0[_0x469cd4(0x365)](_0x841522);for(var _0x1ce606=0x0;_0x1ce606<_0x1a5e63[_0x469cd4(0x92a)][_0x469cd4(0x404)]+_0x1a5e63['list'][_0x469cd4(0x404)];++_0x1ce606){(function(_0x2ec182){var _0x274c65=_0x469cd4;_0x4271e0[_0x274c65(0x39d)]({'id':'actionBarItem'+_0x2ec182,'class':'actionBarItem','style':_0x274c65(0x6ac),'onmouseout':function(){_0x342c8a();},'parent':_0x841522});}(_0x1ce606));}for(var _0x1ce606=0x0;_0x1ce606<_0x1a5e63[_0x469cd4(0x188)][_0x469cd4(0x404)]+_0x1a5e63[_0x469cd4(0x92a)][_0x469cd4(0x404)];++_0x1ce606){(function(_0x45b67c){var _0x30d74e=_0x469cd4,_0x31006d=document[_0x30d74e(0x9a5)](_0x30d74e(0x3da));_0x31006d['width']=_0x31006d['height']=0x42;var _0x202ef2=_0x31006d[_0x30d74e(0x26e)]('2d');_0x202ef2[_0x30d74e(0x475)](_0x31006d['width']/0x2,_0x31006d[_0x30d74e(0x646)]/0x2),_0x202ef2[_0x30d74e(0x57d)]=![],_0x202ef2['webkitImageSmoothingEnabled']=![],_0x202ef2[_0x30d74e(0x1a9)]=![];if(_0x1a5e63[_0x30d74e(0x92a)][_0x45b67c]){_0x202ef2[_0x30d74e(0x8e8)](Math['PI']/0x4+Math['PI']);var _0x469c79=new Image();_0x4bff39[_0x1a5e63[_0x30d74e(0x92a)][_0x45b67c]['src']]=_0x469c79,_0x469c79[_0x30d74e(0x66f)]=function(){var _0x41c67e=_0x30d74e;this[_0x41c67e(0x622)]=!![];var _0x2f5e2e=0x1/(this['height']/this['width']),_0x6ed033=_0x1a5e63[_0x41c67e(0x92a)][_0x45b67c][_0x41c67e(0x5d1)]||0x1;_0x202ef2[_0x41c67e(0x732)](this,-(_0x31006d[_0x41c67e(0x338)]*_0x6ed033*_0x252a23['iconPad']*_0x2f5e2e)/0x2,-(_0x31006d[_0x41c67e(0x646)]*_0x6ed033*_0x252a23[_0x41c67e(0x93b)])/0x2,_0x31006d[_0x41c67e(0x338)]*_0x6ed033*_0x2f5e2e*_0x252a23[_0x41c67e(0x93b)],_0x31006d[_0x41c67e(0x646)]*_0x6ed033*_0x252a23[_0x41c67e(0x93b)]),_0x202ef2[_0x41c67e(0x3fb)]=_0x41c67e(0x448),_0x202ef2[_0x41c67e(0x191)]='source-atop',_0x202ef2[_0x41c67e(0x56c)](-_0x31006d[_0x41c67e(0x338)]/0x2,-_0x31006d[_0x41c67e(0x646)]/0x2,_0x31006d[_0x41c67e(0x338)],_0x31006d[_0x41c67e(0x646)]),document[_0x41c67e(0x838)](_0x41c67e(0x895)+_0x45b67c)[_0x41c67e(0x29c)][_0x41c67e(0x4da)]='url('+_0x31006d[_0x41c67e(0x728)]()+')';},_0x469c79['src']='.././img/weapons/'+_0x1a5e63[_0x30d74e(0x92a)][_0x45b67c][_0x30d74e(0x4c3)]+_0x30d74e(0x853);var _0x26222c=document[_0x30d74e(0x838)](_0x30d74e(0x895)+_0x45b67c);_0x26222c[_0x30d74e(0x16f)]=_0x4271e0[_0x30d74e(0x89e)](function(){var _0x210358=_0x30d74e;_0x342c8a(_0x1a5e63[_0x210358(0x92a)][_0x45b67c],!![]);}),_0x26222c[_0x30d74e(0x90b)]=_0x4271e0[_0x30d74e(0x89e)](function(){_0x256ae0(_0x45b67c,!![]);}),_0x4271e0[_0x30d74e(0x4fb)](_0x26222c);}else{var _0x469c79=_0x1b58d1(_0x1a5e63['list'][_0x45b67c-_0x1a5e63[_0x30d74e(0x92a)][_0x30d74e(0x404)]],!![]),_0x473da1=Math['min'](_0x31006d[_0x30d74e(0x338)]-_0x252a23['iconPadding'],_0x469c79[_0x30d74e(0x338)]);_0x202ef2['globalAlpha']=0x1,_0x202ef2[_0x30d74e(0x732)](_0x469c79,-_0x473da1/0x2,-_0x473da1/0x2,_0x473da1,_0x473da1),_0x202ef2[_0x30d74e(0x3fb)]=_0x30d74e(0x448),_0x202ef2['globalCompositeOperation']='source-atop',_0x202ef2[_0x30d74e(0x56c)](-_0x473da1/0x2,-_0x473da1/0x2,_0x473da1,_0x473da1),document[_0x30d74e(0x838)](_0x30d74e(0x895)+_0x45b67c)[_0x30d74e(0x29c)]['backgroundImage']='url('+_0x31006d[_0x30d74e(0x728)]()+')';var _0x26222c=document[_0x30d74e(0x838)](_0x30d74e(0x895)+_0x45b67c);_0x26222c[_0x30d74e(0x16f)]=_0x4271e0[_0x30d74e(0x89e)](function(){var _0x1f88ad=_0x30d74e;_0x342c8a(_0x1a5e63[_0x1f88ad(0x188)][_0x45b67c-_0x1a5e63[_0x1f88ad(0x92a)][_0x1f88ad(0x404)]]);}),_0x26222c[_0x30d74e(0x90b)]=_0x4271e0[_0x30d74e(0x89e)](function(){var _0x12c2ac=_0x30d74e;_0x256ae0(_0x45b67c-_0x1a5e63[_0x12c2ac(0x92a)][_0x12c2ac(0x404)]);}),_0x4271e0['hookTouchEvents'](_0x26222c);}}(_0x1ce606));}_0x567c55[_0x469cd4(0x383)]=_0x4271e0['checkTrusted'](function(_0x10a3cd){var _0x2c1cd6=_0x469cd4;_0x10a3cd[_0x2c1cd6(0x2a4)]();var _0x278146=prompt(_0x2c1cd6(0x61b),_0x10a3cd[_0x2c1cd6(0x89b)][_0x2c1cd6(0x985)]);_0x10a3cd[_0x2c1cd6(0x89b)][_0x2c1cd6(0x985)]=_0x278146[_0x2c1cd6(0x789)](0x0,0xf);}),_0x294d63['checked']=_0x4f70eb,_0x294d63[_0x469cd4(0x2ec)]=_0x4271e0[_0x469cd4(0x89e)](function(_0xcedb28){var _0x436053=_0x469cd4;_0x41ca88(_0xcedb28[_0x436053(0x40a)][_0x436053(0x1a1)]);}),_0x60e4d5[_0x469cd4(0x1a1)]=_0x47b036,_0x60e4d5[_0x469cd4(0x2ec)]=_0x4271e0['checkTrusted'](function(_0x46a2b6){var _0x36f75d=_0x469cd4;_0x47b036=_0x60e4d5[_0x36f75d(0x1a1)],_0x943ba0[_0x36f75d(0x4ec)]=!_0x47b036,_0x1f9e9f('show_ping',_0x47b036?_0x36f75d(0x1fd):_0x36f75d(0x230));}),!silentMode&&ohio[_0x469cd4(0x236)]();}function _0x550713(_0x4c35d1,_0x114e32){var _0x6c4577=_0x4c4069;if(_0x4c35d1){if(_0x114e32)_0x3522e5[_0x6c4577(0x92a)]=_0x4c35d1;else _0x3522e5[_0x6c4577(0x21f)]=_0x4c35d1;}for(var _0x413ead=0x0;_0x413ead<_0x1a5e63['list'][_0x6c4577(0x404)];++_0x413ead){var _0x23190f=_0x1a5e63[_0x6c4577(0x92a)]['length']+_0x413ead;document[_0x6c4577(0x838)]('actionBarItem'+_0x23190f)[_0x6c4577(0x29c)]['display']=(modVisual||fuckoll?_0x3522e5[_0x6c4577(0x21f)]:[0x0,0x3,0x6,0xa])[_0x6c4577(0x5b5)](_0x1a5e63[_0x6c4577(0x188)][_0x413ead]['id'])>=0x0?_0x6c4577(0x923):'none';}for(var _0x413ead=0x0;_0x413ead<_0x1a5e63[_0x6c4577(0x92a)][_0x6c4577(0x404)];++_0x413ead){document[_0x6c4577(0x838)](_0x6c4577(0x895)+_0x413ead)[_0x6c4577(0x29c)][_0x6c4577(0x196)]=_0x3522e5[_0x6c4577(0x92a)][_0x1a5e63[_0x6c4577(0x92a)][_0x413ead]['type']]==_0x1a5e63[_0x6c4577(0x92a)][_0x413ead]['id']?_0x6c4577(0x923):_0x6c4577(0x15e);}}function _0x41ca88(_0xd964ea){var _0x1ebc59=_0x4c4069;_0x4f70eb=_0xd964ea,_0x126d17=_0xd964ea?window[_0x1ebc59(0x444)]||0x1:window['devicePixelRatio2'],_0x294d63[_0x1ebc59(0x1a1)]=_0xd964ea,_0x1f9e9f(_0x1ebc59(0xe2),_0xd964ea[_0x1ebc59(0x44a)]()),_0x26bfe7();}function _0x4aa304(){var _0x531b37=_0x4c4069;_0xf7a015?_0x4cd21a[_0x531b37(0x1a0)][_0x531b37(0x110)](_0x531b37(0x510)):_0x4cd21a[_0x531b37(0x1a0)]['remove'](_0x531b37(0x510));}function _0x5650cd(){var _0xbe16ee=_0x4c4069;_0x4cd21a[_0xbe16ee(0x1a0)][_0xbe16ee(0x52e)](_0xbe16ee(0x4df))?(_0x4cd21a[_0xbe16ee(0x1a0)]['remove'](_0xbe16ee(0x4df)),_0x2a60b9['innerText']='Settings'):(_0x4cd21a[_0xbe16ee(0x1a0)]['add'](_0xbe16ee(0x4df)),_0x2a60b9[_0xbe16ee(0x809)]=_0xbe16ee(0x114));}let _0x4be03e=0x0;function _0x21c0b6(){var _0x1fdb70=_0x4c4069,_0x35ba2d='';for(var _0x133243=0x0;_0x133243<_0x252a23[_0x1fdb70(0xe5)][_0x1fdb70(0x404)];++_0x133243){_0x133243==_0x4be03e?_0x35ba2d+='<div\x20class=\x27skinColorItem\x20activeSkin\x27\x20style=\x27background-color:'+_0x252a23[_0x1fdb70(0xe5)][_0x133243]+'\x27\x20onclick=\x27selectSkinColor('+_0x133243+_0x1fdb70(0x2e4):_0x35ba2d+='<div\x20class=\x27skinColorItem\x27\x20style=\x27background-color:'+_0x252a23['skinColors'][_0x133243]+'\x27\x20onclick=\x27selectSkinColor('+_0x133243+')\x27></div>';if((!modVisual||!fuckoll)&&_0x133243>=0x9)break;}_0x4bcc78['innerHTML']=_0x35ba2d;}function _0x4518f7(_0x5464d6){var _0x11039b=_0x4c4069;_0x4be03e=_0x5464d6,_0xe3bff1=_0x5464d6==0xa?_0x11039b(0x700):_0x5464d6,_0x21c0b6();}var _0x178728=document[_0x4c4069(0x838)](_0x4c4069(0x9a4)),_0x3fc4af=document['getElementById']('chatHolder'),_0x43a510=0x0;function _0x148a64(){var _0x171cc3=_0x4c4069;!_0xf7a015?_0x43a510?(_0x178728[_0x171cc3(0x985)]&&_0x4f43b2(_0x178728[_0x171cc3(0x985)]),_0x27c730()):(_0x43a510=0x1,_0x33d872[_0x171cc3(0x29c)][_0x171cc3(0x196)]=_0x171cc3(0x15e),_0x3712e9[_0x171cc3(0x29c)][_0x171cc3(0x196)]=_0x171cc3(0x15e),_0x3fc4af[_0x171cc3(0x29c)][_0x171cc3(0x196)]=_0x171cc3(0x76c),modVisual||fuckoll?(_0x3fc4af[_0x171cc3(0x29c)][_0x171cc3(0x82b)]='1',_0x178728[_0x171cc3(0x86b)]='on'):(_0x3fc4af[_0x171cc3(0x29c)][_0x171cc3(0x82b)]='0',_0x178728['autocomplete']=_0x171cc3(0x5fe)),_0x178728[_0x171cc3(0xec)](),_0x2c1498()):setTimeout(function(){var _0x28248e=_0x171cc3,_0x4e98d3=prompt(_0x28248e(0x6bc));_0x4e98d3&&_0x4f43b2(_0x4e98d3);},0x1),_0x178728[_0x171cc3(0x985)]='';}function _0x4f43b2(_0x1d4857){var _0x344fc1=_0x4c4069;let _0x5858d1=function(_0xcc3b47){return _0x1d4857=='!!'+_0xcc3b47;};if(_0x5858d1('grind'))_0x19bdc3=!_0x19bdc3;else{if(_0x5858d1(_0x344fc1(0x759)))_0xb7c744=!_0xb7c744;else{if(_0x5858d1(_0x344fc1(0x813)))_0x3b0e8d=!_0x3b0e8d;else{if(_0x5858d1(_0x344fc1(0x788))){modVisual=!modVisual,_0x3091d9['style']['width']=(modVisual||fuckoll?_0x3522e5['XP']/_0x3522e5[_0x344fc1(0x2dc)]*0x64:0x0)+'%';for(var _0x100674=0x0;_0x100674<_0x1a5e63[_0x344fc1(0x188)]['length'];++_0x100674){var _0x21fc16=_0x1a5e63[_0x344fc1(0x92a)][_0x344fc1(0x404)]+_0x100674;document[_0x344fc1(0x838)](_0x344fc1(0x895)+_0x21fc16)[_0x344fc1(0x29c)][_0x344fc1(0x196)]=(modVisual||fuckoll?_0x3522e5['items']:[0x0,0x3,0x6,0xa])[_0x344fc1(0x5b5)](_0x1a5e63[_0x344fc1(0x188)][_0x100674]['id'])>=0x0?_0x344fc1(0x923):_0x344fc1(0x15e);}$('#pingDisplay')[_0x344fc1(0x892)]();}else{if(_0x5858d1('pfm'))pfmMode=!pfmMode;else{if(_0x5858d1(_0x344fc1(0x607)))pfmMode=!pfmMode;else{if(_0x5858d1('texture'))_0x394c9c=!_0x394c9c;else{if(_0x5858d1(_0x344fc1(0x121)))_0x2f34cf('1');else{if(_0x5858d1('ch2'))_0x2f34cf('2');else{if(_0x5858d1(_0x344fc1(0x94f)))_0x2f34cf('3');else{if(_0x5858d1(_0x344fc1(0x1c0)))silentMode=!silentMode;else{if(_0x5858d1(_0x344fc1(0x430)))_0x46067a=!_0x46067a;else{if(_0x5858d1(_0x344fc1(0x601)))_0x532a19=!_0x532a19;else{if(_0x5858d1(_0x344fc1(0x42f)))botConfig['stop']=!botConfig[_0x344fc1(0x4ae)];else{if(_0x5858d1(_0x344fc1(0x82d)))botConfig['atck']=!botConfig[_0x344fc1(0x82d)];else{if(_0x5858d1(_0x344fc1(0x1d1)))myConfig[_0x344fc1(0x1d1)]=!myConfig[_0x344fc1(0x1d1)];else{if(_0x5858d1(_0x344fc1(0x75a)))for(let _0x8b0caf=0x0;_0x8b0caf<_0x15cbee['length'];++_0x8b0caf){_0x198cad(_0x15cbee[_0x8b0caf],_0x15cbee[_0x8b0caf][_0x344fc1(0x2f1)]+',\x20'+_0x15cbee[_0x8b0caf][_0x344fc1(0x204)],_0x252a23['chatCountdown']);}else{let _0x1c5c98=_0x1d4857;_0x15695a[_0x344fc1(0x1a6)]('ch',_0x1c5c98['slice'](0x0,0x1e));}}}}}}}}}}}}}}}}}}function _0x27c730(){var _0x42f808=_0x4c4069;_0x43a510=0x0,_0x178728['value']='',_0x3fc4af[_0x42f808(0x29c)][_0x42f808(0x196)]='none';}function _0x198cad(_0x4ed718,_0x59d5ee,_0x272a39){var _0x5be0b9=_0x4c4069;_0x4ed718[_0x5be0b9(0x243)]=_0x59d5ee,_0x4ed718[_0x5be0b9(0x124)]=_0x272a39;}let _0x391a9d=![],_0x46067a=![];window[_0x4c4069(0x36c)]=![];function _0x2f34cf(_0x3f0d11){var _0x169ae6=_0x4c4069;_0x391a9d=!_0x391a9d;let _0x14eae0=_0x3f0d11=='1'?song1:_0x3f0d11=='2'?song2:_0x3f0d11=='3'?song3:madeinohio,_0xd00d4e,_0x578be2=[{'say':_0x169ae6(0x714),'time':0x3d6d},{'say':'Look\x20at\x20all\x20this\x20mess\x20we\x20made','time':0x48a8},{'say':'Guess\x20i\x20never\x20know','time':0x53fc},{'say':_0x169ae6(0x12b),'time':0x59d8},{'say':'Sometimes\x20i\x20feel\x20like\x20all','time':0x6b6c},{'say':_0x169ae6(0x864),'time':0x6f54},{'say':_0x169ae6(0x24c),'time':0x7724},{'say':_0x169ae6(0x2a6),'time':0x82dc},{'say':_0x169ae6(0x4de),'time':0x87f0},{'say':_0x169ae6(0x8e7),'time':0x9858},{'say':'But\x20i\x20close\x20my\x20eyes','time':0xa028},{'say':_0x169ae6(0x42e),'time':0xa924},{'say':_0x169ae6(0x2f3),'time':0xafc8},{'say':_0x169ae6(0x55a),'time':0xb66c},{'say':_0x169ae6(0x647),'time':0xc350},{'say':'From\x20the\x20ground\x20but','time':0xcbe8},{'say':'Nobody\x20makes\x20a\x20sound','time':0xd322},{'say':_0x169ae6(0x8e7),'time':0xdea8},{'say':_0x169ae6(0x179),'time':0xe678},{'say':_0x169ae6(0x290),'time':0xee48},{'say':'Now\x20i\x20am\x20nobody','time':0x11d28},{'say':_0x169ae6(0x206),'time':0x184ac},{'say':_0x169ae6(0x5ec),'time':0x190c8},{'say':_0x169ae6(0x2b5),'time':0x19c1c},{'say':_0x169ae6(0x5af),'time':0x1a194},{'say':_0x169ae6(0x413),'time':0x1b2c4},{'say':_0x169ae6(0x150),'time':0x1b968},{'say':'My\x20anxiety\x27s\x20off','time':0x1bee0},{'say':_0x169ae6(0x739),'time':0x1c458},{'say':_0x169ae6(0x505),'time':0x1ca98},{'say':_0x169ae6(0x19d),'time':0x1d010},{'say':_0x169ae6(0x8e7),'time':0x1e078},{'say':_0x169ae6(0x760),'time':0x1e848},{'say':_0x169ae6(0x42e),'time':0x1f144},{'say':_0x169ae6(0x2f3),'time':0x1f7e8},{'say':_0x169ae6(0x55a),'time':0x1ffb8},{'say':_0x169ae6(0x647),'time':0x20b70},{'say':_0x169ae6(0x503),'time':0x2114c},{'say':_0x169ae6(0x699),'time':0x21b10},{'say':_0x169ae6(0x8e7),'time':0x226c8},{'say':_0x169ae6(0x179),'time':0x22e98},{'say':_0x169ae6(0x290),'time':0x23668},{'say':_0x169ae6(0x290),'time':0x29428}],_0x4fe627=[{'say':_0x169ae6(0x886),'time':0x9b78},{'say':_0x169ae6(0x257),'time':0xa154},{'say':_0x169ae6(0x238),'time':0xa7f8},{'say':_0x169ae6(0x2db),'time':0xb4dc},{'say':_0x169ae6(0x1dc),'time':0xbab8},{'say':_0x169ae6(0x7ae),'time':0xbf68},{'say':_0x169ae6(0x3ee),'time':0xcd78},{'say':'So\x20come\x20on,','time':0xd28c},{'say':'The\x20drift\x20is\x20on\x20my\x20mind!','time':0xd994},{'say':'AE\x20eighity\x20Speedy\x2086','time':0xe4e8},{'say':_0x169ae6(0x987),'time':0xf230},{'say':_0x169ae6(0x734),'time':0xfa00},{'say':_0x169ae6(0x6ee),'time':0x1048c},{'say':'Anybody\x20will\x20be\x20around\x20me','time':0x10a68},{'say':_0x169ae6(0x618),'time':0x11620},{'say':'See\x20my\x20speed\x20is\x20getting\x20higher','time':0x12494},{'say':'\x27Cause\x20i\x20can\x27t\x20stop\x20driving','time':0x12cc8},{'say':_0x169ae6(0xe0),'time':0x13628},{'say':'Anybody\x20will\x20be\x20around\x20me','time':0x13c68},{'say':_0x169ae6(0x490),'time':0x17c14},{'say':'Burning\x20like\x20a\x20flame','time':0x181f0},{'say':'Engine\x20will\x20be\x20fly','time':0x187cc},{'say':_0x169ae6(0x298),'time':0x19546},{'say':_0x169ae6(0x4a3),'time':0x19b54},{'say':_0x169ae6(0x4e9),'time':0x1a0fe},{'say':_0x169ae6(0x3ee),'time':0x1adb0},{'say':_0x169ae6(0x5fb),'time':0x1b454},{'say':_0x169ae6(0x576),'time':0x1b968},{'say':_0x169ae6(0x618),'time':0x1c520},{'say':'Every\x20road\x20is\x20fire!','time':0x1d3c6},{'say':_0x169ae6(0x734),'time':0x1db96},{'say':_0x169ae6(0x6ee),'time':0x1e4f6},{'say':'Anybody\x20will\x20be\x20around\x20me','time':0x1ec30},{'say':_0x169ae6(0x618),'time':0x1f7e8},{'say':_0x169ae6(0x27a),'time':0x2049a},{'say':'\x27Cause\x20i\x20can\x27t\x20stop\x20driving','time':0x20e5e},{'say':_0x169ae6(0xe0),'time':0x21728},{'say':_0x169ae6(0x422),'time':0x21dfe},{'say':_0x169ae6(0x3ee),'time':0x35778},{'say':_0x169ae6(0x5fb),'time':0x35d54},{'say':_0x169ae6(0x576),'time':0x36330},{'say':'AE\x20eighity\x20go\x20go\x2086','time':0x36ee8},{'say':_0x169ae6(0x102),'time':0x37c94},{'say':'\x27Cause\x20i\x20can\x27t\x20stop\x20driving','time':0x3855e},{'say':_0x169ae6(0x6ee),'time':0x38e28},{'say':_0x169ae6(0x422),'time':0x394fe},{'say':_0x169ae6(0x618),'time':0x3a0b6},{'say':_0x169ae6(0x27a),'time':0x3ae30},{'say':_0x169ae6(0x734),'time':0x3b72c},{'say':_0x169ae6(0xe0),'time':0x3c08c},{'say':'Anybody\x20will\x20be\x20around\x20me','time':0x3c6cc}],_0x22625f=[{'say':_0x169ae6(0x44b),'time':0x9c4},{'say':_0x169ae6(0x470),'time':0x128e},{'say':_0x169ae6(0x3a7),'time':0x3c8c},{'say':_0x169ae6(0x345),'time':0x416e},{'say':_0x169ae6(0x916),'time':0x493e},{'say':_0x169ae6(0x10c),'time':0x5014},{'say':_0x169ae6(0x4a9),'time':0x55f0},{'say':_0x169ae6(0x638),'time':0x9088},{'say':_0x169ae6(0x135),'time':0x9c40},{'say':_0x169ae6(0x1ff),'time':0xa316},{'say':_0x169ae6(0x88b),'time':0xa7f8},{'say':_0x169ae6(0x6aa),'time':0xb4aa},{'say':'I\x20well\x20be\x20good','time':0xba86},{'say':'You\x27re\x20like\x20a\x20cruel\x20device','time':0xc256},{'say':_0x169ae6(0x20a),'time':0xc738},{'say':'Poison\x20for\x20my\x20veins,','time':0xcd14},{'say':_0x169ae6(0x602),'time':0xd2f0},{'say':_0x169ae6(0x6f1),'time':0xd9c6},{'say':_0x169ae6(0x76b),'time':0xdfa2},{'say':_0x169ae6(0x92d),'time':0xe57e},{'say':'I\x20say','time':0xee48},{'say':_0x169ae6(0x563),'time':0xf136},{'say':_0x169ae6(0x2e6),'time':0xf51e},{'say':_0x169ae6(0x6f5),'time':0xfcee},{'say':_0x169ae6(0x6b3),'time':0x101d0},{'say':_0x169ae6(0x46d),'time':0x105b8},{'say':_0x169ae6(0x563),'time':0x108a6},{'say':'take\x20a\x20chance\x20on\x20my\x20passion','time':0x10c8e},{'say':_0x169ae6(0x705),'time':0x11558},{'say':_0x169ae6(0x46d),'time':0x11e22},{'say':_0x169ae6(0x563),'time':0x12110},{'say':_0x169ae6(0x2e6),'time':0x124f8},{'say':'For\x20now\x20and\x20ever','time':0x12cc8},{'say':_0x169ae6(0x22f),'time':0x132a4},{'say':_0x169ae6(0x46d),'time':0x13592},{'say':'Try\x20me','time':0x13880},{'say':'take\x20a\x20chance\x20on\x20my\x20passion','time':0x13c68},{'say':_0x169ae6(0x3a7),'time':0x14532},{'say':_0x169ae6(0x345),'time':0x14a14},{'say':_0x169ae6(0x916),'time':0x152de},{'say':'don\x27t\x20stand\x20so','time':0x157c0},{'say':_0x169ae6(0x4a9),'time':0x15d9c},{'say':'Baby\x20let\x20me\x20take\x20control','time':0x1992e},{'say':_0x169ae6(0x6aa),'time':0x1a4e6},{'say':_0x169ae6(0x368),'time':0x1aac2},{'say':_0x169ae6(0x6a6),'time':0x1b198},{'say':_0x169ae6(0x98e),'time':0x1bd50},{'say':_0x169ae6(0x3a4),'time':0x1c32c},{'say':'You\x27re\x20like\x20a\x20cruel\x20device','time':0x1ca02},{'say':'Your\x20blood\x20is\x20cold\x20like\x20ice','time':0x1cee4},{'say':'Poison\x20for\x20my\x20veins,','time':0x1d5ba},{'say':'I\x27m\x20breaking\x20my\x20chains','time':0x1db96},{'say':'One\x20look\x20and\x20you\x20can\x20kill','time':0x1e078},{'say':_0x169ae6(0x76b),'time':0x1e74e},{'say':'Your\x20love\x20is\x20for\x20me','time':0x1ee24},{'say':'I\x20say','time':0x1f5f4},{'say':_0x169ae6(0x563),'time':0x1f8e2},{'say':_0x169ae6(0x2e6),'time':0x1fcca},{'say':_0x169ae6(0x6f5),'time':0x2068e},{'say':'close\x20to\x20your\x20heart','time':0x20a76},{'say':'I\x20say','time':0x20e5e},{'say':_0x169ae6(0x563),'time':0x2114c},{'say':_0x169ae6(0x4d2),'time':0x21534},{'say':_0x169ae6(0x705),'time':0x21dfe},{'say':_0x169ae6(0x46d),'time':0x226c8},{'say':_0x169ae6(0x563),'time':0x229b6},{'say':_0x169ae6(0x2e6),'time':0x22d9e},{'say':_0x169ae6(0x6f5),'time':0x23668},{'say':_0x169ae6(0x22f),'time':0x23a50},{'say':_0x169ae6(0x46d),'time':0x23e38},{'say':_0x169ae6(0x563),'time':0x24126},{'say':_0x169ae6(0x4d2),'time':0x2450e},{'say':'We\x27ll\x20be\x20together','time':0x24dd8},{'say':_0x169ae6(0x345),'time':0x252ba},{'say':'Don\x27t\x20stand\x20so','time':0x25a8a},{'say':'don\x27t\x20stand\x20so','time':0x26066},{'say':'Don\x27t\x20stand\x20so\x20close\x20to\x20me','time':0x26548},{'say':_0x169ae6(0x46d),'time':0x2cec0},{'say':_0x169ae6(0x563),'time':0x2d1ae},{'say':_0x169ae6(0x2e6),'time':0x2d49c},{'say':_0x169ae6(0x6f5),'time':0x2de60},{'say':_0x169ae6(0x6b3),'time':0x2e248},{'say':_0x169ae6(0x46d),'time':0x2e630},{'say':'Try\x20me','time':0x2e91e},{'say':_0x169ae6(0x4d2),'time':0x2f0ee},{'say':'We\x27ll\x20be\x20together\x20all\x20the\x20time','time':0x2f5d0},{'say':_0x169ae6(0x46d),'time':0x2fe9a},{'say':_0x169ae6(0x563),'time':0x30188},{'say':'take\x20a\x20chance\x20on\x20emotions','time':0x30570},{'say':_0x169ae6(0x6f5),'time':0x30e3a},{'say':_0x169ae6(0x22f),'time':0x31222},{'say':'I\x20say','time':0x31704},{'say':_0x169ae6(0x563),'time':0x319f2},{'say':_0x169ae6(0x4d2),'time':0x31ce0},{'say':_0x169ae6(0x3a7),'time':0x326a4},{'say':_0x169ae6(0x345),'time':0x32a8c},{'say':'Don\x27t\x20stand\x20so','time':0x33356},{'say':_0x169ae6(0x10c),'time':0x33932},{'say':_0x169ae6(0x4a9),'time':0x33f0e}];!silentMode&&(_0x391a9d?_0x46067a?_0x14eae0[_0x169ae6(0x236)]():setTimeout(()=>{_0x14eae0['play']();},window[_0x169ae6(0x78a)]):_0x46067a?_0x14eae0[_0x169ae6(0x236)]():setTimeout(()=>{var _0x5abb76=_0x169ae6;_0x14eae0[_0x5abb76(0x236)]();},window[_0x169ae6(0x78a)]));let _0x12a240=_0x3f0d11=='1'?_0x578be2:_0x3f0d11=='2'?_0x4fe627:_0x3f0d11=='3'?_0x22625f:_0x578be2,_0xd50c81=_0x12a240[_0x169ae6(0x404)];_0x12a240['forEach'](_0x2f951c=>{var _0x53f327=_0x169ae6;setTimeout(()=>{var _0x36f2b1=_0x2943;_0x46067a?(_0x4f43b2(_0x2f951c[_0x36f2b1(0x948)]),_0xd50c81--):_0x198cad(_0x3522e5,_0x2f951c[_0x36f2b1(0x948)],_0x252a23[_0x36f2b1(0x591)]),consoleSinger&&console[_0x36f2b1(0x91a)](_0x2f951c[_0x36f2b1(0x948)]);},_0x2f951c[_0x53f327(0x8ab)]);});}var _0x532a19=![],_0x51cb94=[_0x4c4069(0x797),_0x4c4069(0x5e4),_0x4c4069(0x607),_0x4c4069(0x802),'faggot',_0x4c4069(0x463),_0x4c4069(0x331),'dick',_0x4c4069(0x8e6),_0x4c4069(0x60d),_0x4c4069(0x34a),_0x4c4069(0x337),_0x4c4069(0x73d),_0x4c4069(0x2c7),_0x4c4069(0x441),_0x4c4069(0x26c),'clit',_0x4c4069(0x68a),_0x4c4069(0x831),'jizz','prune',_0x4c4069(0x130),_0x4c4069(0x457),_0x4c4069(0x752),_0x4c4069(0x715),_0x4c4069(0x583),_0x4c4069(0x30e),_0x4c4069(0x585)],_0x2f957f=[_0x4c4069(0x6af)],_0x393260=[_0x4c4069(0x4c1)];function _0x3005a8(_0xdc40ad){var _0x4330ba=_0x4c4069,_0x534214,_0x404e4a='';for(let _0x208b8b=0x0;_0x208b8b<_0x2f957f[_0x4330ba(0x404)];++_0x208b8b){if(_0xdc40ad[_0x4330ba(0x5b5)](_0x2f957f[_0x208b8b])>-0x1){_0x534214='';for(let _0x2cdd2d=0x0;_0x2cdd2d<_0x2f957f[_0x208b8b][_0x4330ba(0x404)];++_0x2cdd2d){_0x534214+=_0x393260[_0x208b8b];}var _0x47e856=new RegExp(_0x393260[_0x208b8b],'g');_0x404e4a=_0xdc40ad[_0x4330ba(0x759)](_0x47e856,_0x534214);}}_0x3abbd0!=_0x3522e5&&_0x404e4a!=''&&_0x15695a[_0x4330ba(0x1a6)]('ch',_0x404e4a);if(!_0x532a19){var _0x58aa7a;for(var _0x489567=0x0;_0x489567<_0x51cb94[_0x4330ba(0x404)];++_0x489567){if(_0xdc40ad[_0x4330ba(0x5b5)](_0x51cb94[_0x489567])>-0x1){_0x58aa7a='';for(var _0xffa9f3=0x0;_0xffa9f3<_0x51cb94[_0x489567][_0x4330ba(0x404)];++_0xffa9f3){_0x58aa7a+=_0x58aa7a[_0x4330ba(0x404)]?'o':'M';}var _0x47e856=new RegExp(_0x51cb94[_0x489567],'g');_0xdc40ad=_0xdc40ad[_0x4330ba(0x759)](_0x47e856,_0x58aa7a);}}}return _0xdc40ad;}function _0x4c59b4(_0x78266e,_0x48b0d7){var _0x33c811=_0x4c4069,_0x4278b4=_0xf4ede0(_0x78266e);_0x4278b4&&(_0x4278b4[_0x33c811(0x978)]=_0x3005a8(_0x48b0d7),_0x4278b4[_0x33c811(0x591)]=_0x252a23['chatCountdown']);}window[_0x4c4069(0x8bb)](_0x4c4069(0x55b),_0x4271e0[_0x4c4069(0x89e)](_0x26bfe7));function _0x26bfe7(){var _0x994b62=_0x4c4069;_0x1655fa=window[_0x994b62(0x177)],_0x28fa9f=window[_0x994b62(0x53e)];var _0x179ed5=Math[_0x994b62(0x77b)](_0x1655fa/_0x361505,_0x28fa9f/_0x26317f)*_0x126d17;_0x15b64f[_0x994b62(0x338)]=_0x1655fa*_0x126d17,_0x15b64f[_0x994b62(0x646)]=_0x28fa9f*_0x126d17,_0x15b64f[_0x994b62(0x29c)]['width']=_0x1655fa+'px',_0x15b64f[_0x994b62(0x29c)][_0x994b62(0x646)]=_0x28fa9f+'px',_0x315ee0[_0x994b62(0x5f7)](_0x179ed5,0x0,0x0,_0x179ed5,(_0x1655fa*_0x126d17-_0x361505*_0x179ed5)/0x2,(_0x28fa9f*_0x126d17-_0x26317f*_0x179ed5)/0x2);}_0x26bfe7();var _0xf7a015;_0x4bec0d(![]);function _0x4bec0d(_0x1fbafb){_0xf7a015=_0x1fbafb,_0x4aa304();}window[_0x4c4069(0x4cf)]=_0x4bec0d,_0x15b64f[_0x4c4069(0x8bb)](_0x4c4069(0x662),_0x4271e0[_0x4c4069(0x89e)](_0xb8f5ae),![]);function _0xb8f5ae(_0x565d56){var _0x57a08f=_0x4c4069;_0x565d56[_0x57a08f(0x2a4)](),_0x565d56['stopPropagation'](),_0x4bec0d(!![]);for(var _0x33cd7b=0x0;_0x33cd7b<_0x565d56[_0x57a08f(0x541)]['length'];_0x33cd7b++){var _0x5c8811=_0x565d56[_0x57a08f(0x541)][_0x33cd7b];if(_0x5c8811[_0x57a08f(0x6a1)]==_0x39d2c8['id'])_0x39d2c8[_0x57a08f(0x370)]=_0x5c8811[_0x57a08f(0x3af)],_0x39d2c8[_0x57a08f(0x2cb)]=_0x5c8811['pageY'],_0x5636b0();else _0x5c8811[_0x57a08f(0x6a1)]==_0x1b84ce['id']&&(_0x1b84ce['currentX']=_0x5c8811[_0x57a08f(0x3af)],_0x1b84ce[_0x57a08f(0x2cb)]=_0x5c8811[_0x57a08f(0x860)],_0x3781ef=0x1);}}_0x15b64f[_0x4c4069(0x8bb)](_0x4c4069(0x43a),_0x4271e0[_0x4c4069(0x89e)](_0x452718),![]);function _0x452718(_0x1ad042){var _0x7721de=_0x4c4069;_0x1ad042['preventDefault'](),_0x1ad042['stopPropagation'](),_0x4bec0d(!![]);for(var _0x3ce9ae=0x0;_0x3ce9ae<_0x1ad042[_0x7721de(0x541)][_0x7721de(0x404)];_0x3ce9ae++){var _0x20bdb8=_0x1ad042[_0x7721de(0x541)][_0x3ce9ae];if(_0x20bdb8['pageX']<document['body'][_0x7721de(0x9a3)]/0x2&&_0x39d2c8['id']==-0x1)_0x39d2c8['id']=_0x20bdb8[_0x7721de(0x6a1)],_0x39d2c8['startX']=_0x39d2c8[_0x7721de(0x370)]=_0x20bdb8['pageX'],_0x39d2c8[_0x7721de(0x5b1)]=_0x39d2c8[_0x7721de(0x2cb)]=_0x20bdb8[_0x7721de(0x860)],_0x5636b0();else _0x20bdb8[_0x7721de(0x3af)]>document[_0x7721de(0x773)]['scrollWidth']/0x2&&_0x1b84ce['id']==-0x1&&(_0x1b84ce['id']=_0x20bdb8[_0x7721de(0x6a1)],_0x1b84ce[_0x7721de(0x497)]=_0x1b84ce[_0x7721de(0x370)]=_0x20bdb8[_0x7721de(0x3af)],_0x1b84ce['startY']=_0x1b84ce['currentY']=_0x20bdb8[_0x7721de(0x860)],_0x3522e5['buildIndex']<0x0&&(_0x3781ef=0x1,_0x5695a3()));}}_0x15b64f['addEventListener']('touchend',_0x4271e0[_0x4c4069(0x89e)](_0x1634c5),![]),_0x15b64f[_0x4c4069(0x8bb)](_0x4c4069(0x43b),_0x4271e0['checkTrusted'](_0x1634c5),![]),_0x15b64f['addEventListener'](_0x4c4069(0x70b),_0x4271e0['checkTrusted'](_0x1634c5),![]);function _0x1634c5(_0x51acac){var _0x543d61=_0x4c4069;_0x51acac[_0x543d61(0x2a4)](),_0x51acac[_0x543d61(0x827)](),_0x4bec0d(!![]);for(var _0x52cfa1=0x0;_0x52cfa1<_0x51acac[_0x543d61(0x541)][_0x543d61(0x404)];_0x52cfa1++){var _0x4275a5=_0x51acac[_0x543d61(0x541)][_0x52cfa1];if(_0x4275a5['identifier']==_0x39d2c8['id'])_0x39d2c8['id']=-0x1,_0x5636b0();else _0x4275a5[_0x543d61(0x6a1)]==_0x1b84ce['id']&&(_0x1b84ce['id']=-0x1,_0x3522e5[_0x543d61(0x915)]>=0x0&&(_0x3781ef=0x1,_0x5695a3()),_0x3781ef=0x0,_0x5695a3());}}_0x15b64f[_0x4c4069(0x8bb)]('mousemove',_0xfb1756,![]);function _0xfb1756(_0x3cdeec){var _0x265109=_0x4c4069;_0x3cdeec['preventDefault'](),_0x3cdeec['stopPropagation'](),_0x4bec0d(![]),_0x34dbf5=_0x3cdeec['clientX'],_0x2f1fec=_0x3cdeec[_0x265109(0x78b)];}_0x15b64f[_0x4c4069(0x8bb)](_0x4c4069(0x571),_0x122a22,![]);let _0x2e158=![],_0x501ded=![];function _0x122a22(_0x4d9832){var _0x5ada39=_0x4c4069;_0x4bec0d(![]);if(_0x3781ef!=0x1){_0x3781ef=0x1,_0x3b5514=!![];if(_0x4d9832[_0x5ada39(0x7c0)]==0x0)_0x599154=!![],_0x2e158=!![];else{if(_0x4d9832[_0x5ada39(0x7c0)]==0x1)_0x206a05=!![],_0x252e21=!![];else _0x4d9832[_0x5ada39(0x7c0)]==0x2&&(_0xc16fb6=!![]);}}}_0x15b64f['addEventListener'](_0x4c4069(0x754),_0x14f519,![]);function _0x14f519(_0x45619b){var _0x4e90ad=_0x4c4069;_0x4bec0d(![]);if(_0x3781ef!=0x0){_0x3781ef=0x0;if(_0x45619b['button']==0x0)_0x599154=![],_0x501ded=!![];else{if(_0x45619b[_0x4e90ad(0x7c0)]==0x1)_0x206a05=![];else _0x45619b[_0x4e90ad(0x7c0)]==0x2&&(_0xc16fb6=![]);}!_0x599154&&!_0x206a05&&!_0xc16fb6&&(_0x3b5514=![]);}}function _0x5c6e07(_0x44c2de){_0x44c2de['deltaY']<0x0?_0x257e84=!![]:_0x257e84=![];};_0x15b64f[_0x4c4069(0x8bb)]('wheel',_0x5c6e07,![]);function _0xa86641(){var _0x4ab07d=_0x4c4069,_0x88811e=0x0,_0x2935f7=0x0;if(_0x39d2c8['id']!=-0x1)_0x88811e+=_0x39d2c8[_0x4ab07d(0x370)]-_0x39d2c8[_0x4ab07d(0x497)],_0x2935f7+=_0x39d2c8[_0x4ab07d(0x2cb)]-_0x39d2c8[_0x4ab07d(0x5b1)];else for(var _0x12f00f in _0x52df27){var _0x5a81fa=_0x52df27[_0x12f00f];_0x88811e+=!!_0x86fbe0[_0x12f00f]*_0x5a81fa[0x0],_0x2935f7+=!!_0x86fbe0[_0x12f00f]*_0x5a81fa[0x1];}return _0x88811e==0x0&&_0x2935f7==0x0?undefined:_0x4271e0[_0x4ab07d(0xe1)](Math[_0x4ab07d(0x634)](_0x2935f7,_0x88811e),0x2);}var _0x2a0a46,_0x2e131e=null,_0x3b0e8d=![];function _0x12f69b(){var _0x2549e0=_0x4c4069;if(!_0x3522e5)return 0x0;if(_0x22239e&&!_0x55702f)return _0x2cb3f8;else{if(_0x55702f)return _0x555091;else{if(_0x3b0e8d&&_0x3522e5['weaponIndex']==0xf&&!_0x3adf50[_0x2549e0(0x6d5)]&&!_0x407e2c&&!_0x22239e)return Math[_0x2549e0(0x459)]()*(Math['PI']*0x2);else{if(_0x1b84ce['id']!=-0x1)_0x2a0a46=Math[_0x2549e0(0x634)](_0x1b84ce['currentY']-_0x1b84ce[_0x2549e0(0x5b1)],_0x1b84ce[_0x2549e0(0x370)]-_0x1b84ce[_0x2549e0(0x497)]);else!_0x3522e5[_0x2549e0(0x849)]&&!_0xf7a015&&(_0x2a0a46=Math[_0x2549e0(0x634)](_0x2f1fec-_0x28fa9f/0x2,_0x34dbf5-_0x1655fa/0x2));return _0x4271e0['fixTo'](_0x2a0a46||0x0,0x2);}}}}function _0x13a352(){var _0x5247d0=_0x4c4069;if(!_0x3522e5)return 0x0;if(_0x1b84ce['id']!=-0x1)_0x2a0a46=Math[_0x5247d0(0x634)](_0x1b84ce[_0x5247d0(0x2cb)]-_0x1b84ce[_0x5247d0(0x5b1)],_0x1b84ce[_0x5247d0(0x370)]-_0x1b84ce[_0x5247d0(0x497)]);else!_0x3522e5['lockDir']&&!_0xf7a015&&(_0x2a0a46=Math[_0x5247d0(0x634)](_0x2f1fec-_0x28fa9f/0x2,_0x34dbf5-_0x1655fa/0x2));return _0x4271e0[_0x5247d0(0xe1)](_0x2a0a46||0x0,0x2);}var _0x86fbe0={},_0x52df27={0x57:[0x0,-0x1],0x26:[0x0,-0x1],0x53:[0x0,0x1],0x28:[0x0,0x1],0x41:[-0x1,0x0],0x25:[-0x1,0x0],0x44:[0x1,0x0],0x27:[0x1,0x0]};function _0x2c1498(){var _0x215c3f=_0x4c4069;_0x86fbe0={},_0x15695a[_0x215c3f(0x1a6)]('rmd');}function _0x284c72(){var _0x2c9437=_0x4c4069;return _0x3712e9[_0x2c9437(0x29c)][_0x2c9437(0x196)]!=_0x2c9437(0x76c)&&!_0x43a510;}var _0x599d15=![],_0x118cec=![],_0x11466a=![],_0x3853a8=![];function _0x3895fa(_0x187b7e){var _0x265af8=_0x4c4069,_0x338ea3=_0x187b7e[_0x265af8(0x67c)]||_0x187b7e[_0x265af8(0x7a9)]||0x0;if(_0x3522e5&&_0x3522e5['alive']&&_0x284c72()){if(!_0x86fbe0[_0x338ea3]){_0x86fbe0[_0x338ea3]=0x1;if(_0x338ea3==0x1b)_0x2702a6(),toggleModMenu();else{if(_0x338ea3==0x45)_0x16fe33();else{if(_0x338ea3==0x43)_0x17c46c();else{if(_0x338ea3==0x4d)_0x466448=!_0x466448;else{if(_0x338ea3==0x58)_0x309813();else{if(_0x3522e5[_0x265af8(0x92a)][_0x338ea3-0x31]!=undefined)_0x3902f3=_0x3522e5[_0x265af8(0x92a)][_0x338ea3-0x31],_0x256ae0(_0x3522e5[_0x265af8(0x92a)][_0x338ea3-0x31],!![]);else{if(_0x3522e5[_0x265af8(0x21f)][_0x338ea3-0x31-_0x3522e5[_0x265af8(0x92a)][_0x265af8(0x404)]]!=undefined)_0x256ae0(_0x3522e5['items'][_0x338ea3-0x31-_0x3522e5['weapons'][_0x265af8(0x404)]]);else{if(_0x338ea3==0x52)_0x28009f();else{if(_0x338ea3==0x54)_0x3f04b2=!_0x3f04b2,_0x48e847(0x0,0x1);else{if(_0x52df27[_0x338ea3])_0x5636b0();else{if(_0x338ea3==0x20)_0x3781ef=0x1,_0x5695a3();else{if(_0x338ea3==0x4b)_0xcd504(0x7,0x0);else{if(_0x338ea3==0x5a)_0xcd504(0x28,0x0);else{if(_0x338ea3==0x4c)_0x494ef1=!_0x494ef1,_0x58a1c7(),_0x22239e?_0x48e847(0x0,0x1):_0xcd504(0xb,0x1);else{if(_0x187b7e['key']=='q')_0x599d15=!![];else{if(_0x187b7e[_0x265af8(0x74b)]=='f')_0x118cec=!![];else{if(_0x187b7e[_0x265af8(0x74b)]=='v')_0x11466a=!![];else{if(_0x187b7e[_0x265af8(0x74b)]=='h')_0x3853a8=!![];else{if(_0x187b7e[_0x265af8(0x74b)]=='B')_0xc56d1b=!_0xc56d1b;else{if(_0x187b7e['key']==_0x265af8(0x650))_0x58a1c7(),_0x22239e?_0x48e847(0x0,0x1):_0xcd504(0xb,0x1);else{if(_0x187b7e[_0x265af8(0x74b)]=='G'){let _0x1357f5=[];for(let _0x502632=0x0;_0x502632<bot;_0x502632++)_0x1357f5[_0x265af8(0x333)](window[_0x265af8(0x147)][_0x265af8(0x316)](_0x265af8(0x65f),{'action':_0x265af8(0x63b)}));Promise[_0x265af8(0x668)](_0x1357f5)[_0x265af8(0x3d0)](_0x18b3bb=>{for(let _0x3aa3dc=0x0;_0x3aa3dc<bot;_0x3aa3dc++)bConnect(_0x18b3bb[_0x3aa3dc],_0x3aa3dc,_0x1357f5);bot=0xa;});}else _0x187b7e[_0x265af8(0x74b)]=='g'&&(_0x367bdb?_0x3fe04e=!_0x3fe04e:_0x3ac5ff=!_0x3ac5ff,_0x48e847(0x0,0x1));}}}}}}}}}}}}}}}}}}}}}}}window[_0x4c4069(0x8bb)](_0x4c4069(0x633),_0x4271e0[_0x4c4069(0x89e)](_0x3895fa));function _0x115219(_0xa0d393){var _0x455995=_0x4c4069;if(_0x3522e5&&_0x3522e5['alive']){var _0x3f642a=_0xa0d393[_0x455995(0x67c)]||_0xa0d393[_0x455995(0x7a9)]||0x0;if(_0x3f642a==0xd)_0x148a64();else{if(_0x284c72()){if(_0x86fbe0[_0x3f642a]){_0x86fbe0[_0x3f642a]=0x0;if(_0x52df27[_0x3f642a])_0x5636b0();else{if(_0x3f642a==0x20)_0x3781ef=0x0,_0x5695a3();else{if(_0xa0d393[_0x455995(0x74b)]=='q')_0x599d15=![];else{if(_0xa0d393[_0x455995(0x74b)]=='f')_0x118cec=![];else{if(_0xa0d393['key']=='v')_0x11466a=![];else _0xa0d393[_0x455995(0x74b)]=='h'&&(_0x3853a8=![]);}}}}}}}}}window[_0x4c4069(0x8bb)](_0x4c4069(0x56f),_0x4271e0['checkTrusted'](_0x115219));function _0x5695a3(){var _0x17c3ea=_0x4c4069;_0x3522e5&&_0x3522e5[_0x17c3ea(0x1c5)]&&_0x15695a['send']('c',_0x3781ef,_0x3522e5[_0x17c3ea(0x915)]>=0x0?_0x12f69b():null);}var _0x1dcbc8=undefined,_0x532267=undefined,_0x59d25e=undefined;function _0x5636b0(){var _0x3a3dd7=_0x4c4069,_0x63eba7=_0x46ce5?_0x23f241:_0xa86641();(_0x1dcbc8==undefined||_0x63eba7==undefined||Math[_0x3a3dd7(0x11d)](_0x63eba7-_0x1dcbc8)>0.3)&&(!_0x46ce5&&_0x15695a[_0x3a3dd7(0x1a6)]('33',_0x63eba7),_0x1dcbc8=_0x63eba7,_0x59d25e=_0x63eba7);}function _0x309813(){var _0x2989b0=_0x4c4069;_0x3522e5[_0x2989b0(0x849)]=_0x3522e5[_0x2989b0(0x849)]?0x0:0x1,_0x15695a['send']('7',0x0);}function _0x28009f(){_0x15695a['send']('14',0x1),_0x306f57=!_0x306f57;}function _0x15ec2e(){var _0x4a9d78=_0x4c4069;_0x407e2c=!![],_0x55702f=!![],_0x13cae8=!![],_0x3902f3=_0x3522e5[_0x4a9d78(0x92a)][_0x3522e5['weapons'][0x1]==0xa?0x1:0x0],_0x256ae0(_0x3522e5[_0x4a9d78(0x92a)][_0x3522e5[_0x4a9d78(0x92a)][0x1]==0xa?0x1:0x0],!0x0),_0x15695a['send']('2',_0x555091),_0xcd504(_0x3522e5['weapons'][0x1]==0xa?0x35:_0x3adf50[_0x4a9d78(0x1e8)]?0x7:0x6,0x0),_0x48e847(0x0,0x1),_0x16fe33(),(window[_0x4a9d78(0x7dd)]?_0xb10f4c:setTimeout)(()=>{var _0x2aea17=_0x4a9d78;_0x3902f3=_0x3522e5[_0x2aea17(0x92a)][_0x3522e5[_0x2aea17(0x92a)][0x1]==0xa?0x0:0x1],_0x256ae0(_0x3522e5[_0x2aea17(0x92a)][_0x3522e5['weapons'][0x1]==0xa?0x0:0x1],!0x0),_0x15695a['send']('2',_0x555091),_0xcd504(_0x3522e5[_0x2aea17(0x92a)][0x1]==0xa?0x7:0x35,0x0),(window[_0x2aea17(0x7dd)]?_0xb10f4c:setTimeout)(()=>{var _0x30277f=_0x2aea17;_0x407e2c=![],_0x55702f=![],_0x13cae8=![],_0x22239e?(_0x56dc5b[_0x30277f(0x404)]?_0xcd504(0x16,0x0):_0xcd504(0x6,0x0),_0x48e847(0x0,0x1)):(_0x58a1c7(),_0xcd504(0xb,0x1)),_0x16fe33(),(window[_0x30277f(0x7dd)]?_0xb10f4c:setTimeout)(()=>{var _0x14b9a2=_0x30277f;_0x3522e5[_0x14b9a2(0x5eb)][0x35]&&_0x3522e5['tR']==0x1?_0x3adf50['dobull']=!![]:_0x3adf50[_0x14b9a2(0x1e8)]=!![];},window['testTick']?0x1:0x3e8/_0x252a23[_0x30277f(0x1fa)]);},window['testTick']?0x1:0x3e8/_0x252a23['serverUpdateRate']);},window['testTick']?0x1:0x3e8/_0x252a23[_0x4a9d78(0x1fa)]);}function _0x356491(){var _0x1472cb=_0x4c4069;_0x3f04b2=![],_0x4dbb96=!![],_0x13cae8=!![],_0x55702f=!![],_0x3902f3=_0x3522e5[_0x1472cb(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x1472cb(0x92a)][0x0],!0x0),_0x15695a[_0x1472cb(0x1a6)]('33',_0x555091),_0xcd504(0x35,0x0),_0x48e847(0xb,0x1),(window['testTick']?_0xb10f4c:setTimeout)(()=>{var _0x1d9a2e=_0x1472cb;_0x3902f3=_0x3522e5['weapons'][0x0],_0x256ae0(_0x3522e5[_0x1d9a2e(0x92a)][0x0],!0x0),_0x15695a[_0x1d9a2e(0x1a6)]('2',_0x555091),_0x15695a[_0x1d9a2e(0x1a6)]('33',_0x555091),_0xcd504(0x7,0x0),_0x48e847(0x0,0x1),_0x16fe33(),(window[_0x1d9a2e(0x7dd)]?_0xb10f4c:setTimeout)(()=>{var _0x179976=_0x1d9a2e;_0x4dbb96=![],_0x13cae8=![],_0x55702f=![],_0x15695a['send']('33',undefined),_0x22239e?(_0x3902f3=_0x3522e5['weapons'][0x1]==0xa&&_0x3522e5[_0x179976(0x92a)][0x0]!=0x8&&_0x3affe5['hitCount']!=0x2?_0x3522e5[_0x179976(0x92a)][0x1]:_0x3522e5[_0x179976(0x92a)][0x0],_0x256ae0(_0x3522e5['weapons'][0x1]==0xa&&_0x3522e5[_0x179976(0x92a)][0x0]!=0x8&&_0x3affe5[_0x179976(0x51a)]!=0x2?_0x3522e5[_0x179976(0x92a)][0x1]:_0x3522e5[_0x179976(0x92a)][0x0],!0x0),_0x56dc5b[_0x179976(0x404)]?_0xcd504(0x16,0x0):_0xcd504(0x6,0x0),_0x48e847(0x0,0x1)):(_0x58a1c7(),_0xcd504(0xb,0x1)),_0x16fe33();},window['testTick']?0x1:0x3e8/_0x252a23[_0x1d9a2e(0x1fa)]);},window[_0x1472cb(0x7dd)]?0x1:0x3e8/_0x252a23['serverUpdateRate']);}function _0x3c20fd(){var _0x42e959=_0x4c4069;_0x3ac5ff=![],_0x5a6faa=!![],_0x13cae8=!![],_0x55702f=!![],_0x3902f3=_0x3522e5['weapons'][0x0],_0x256ae0(_0x3522e5['weapons'][0x0],!0x0),_0x15695a[_0x42e959(0x1a6)]('33',_0x555091),_0xcd504(0x35,0x0),_0xcd504(0xb,0x1),(window['testTick']?_0xb10f4c:setTimeout)(()=>{var _0x486e9d=_0x42e959;_0x3902f3=_0x3522e5[_0x486e9d(0x92a)][0x1],_0x256ae0(_0x3522e5[_0x486e9d(0x92a)][0x1],!0x0),_0x15695a[_0x486e9d(0x1a6)]('2',_0x555091),_0x15695a[_0x486e9d(0x1a6)]('33',_0x555091),_0xcd504(0xc,0x0),_0xcd504(0xb,0x1),_0x16fe33(),_0x5e4bb3(0x4,_0x555091),(window[_0x486e9d(0x7dd)]?_0xb10f4c:setTimeout)(()=>{var _0x50a5cd=_0x486e9d;_0x3902f3=_0x3522e5[_0x50a5cd(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x50a5cd(0x92a)][0x0],!0x0),_0x15695a[_0x50a5cd(0x1a6)]('2',_0x555091),_0x15695a['send']('33',_0x555091),_0xcd504(0x7,0x0),_0x48e847(0x0,0x1),(window['testTick']?_0xb10f4c:setTimeout)(()=>{var _0x3d754d=_0x50a5cd;_0x4dbb96=![],_0x13cae8=![],_0x55702f=![],_0x15695a[_0x3d754d(0x1a6)]('33',undefined),_0x22239e?(_0x3902f3=_0x3522e5[_0x3d754d(0x92a)][0x1]==0xa&&_0x3522e5[_0x3d754d(0x92a)][0x0]!=0x8&&_0x3affe5['hitCount']!=0x2?_0x3522e5['weapons'][0x1]:_0x3522e5[_0x3d754d(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x3d754d(0x92a)][0x1]==0xa&&_0x3522e5[_0x3d754d(0x92a)][0x0]!=0x8&&_0x3affe5[_0x3d754d(0x51a)]!=0x2?_0x3522e5[_0x3d754d(0x92a)][0x1]:_0x3522e5[_0x3d754d(0x92a)][0x0],!0x0),_0x56dc5b[_0x3d754d(0x404)]?_0xcd504(0x16,0x0):_0xcd504(0x6,0x0),_0x48e847(0x0,0x1)):(_0x58a1c7(),_0xcd504(0xb,0x1)),_0x16fe33();},window['testTick']?0x1:0x3e8/_0x252a23[_0x50a5cd(0x1fa)]);},window[_0x486e9d(0x7dd)]?0x1:0x3e8/_0x252a23['serverUpdateRate']);},window[_0x42e959(0x7dd)]?0x1:0x3e8/_0x252a23[_0x42e959(0x1fa)]);}function _0x16fe33(){var _0x260361=_0x4c4069;_0x15695a[_0x260361(0x1a6)]('7',0x1);}function _0x256ae0(_0x319dfa,_0x2986ec){var _0x5a1fe4=_0x4c4069;_0x15695a[_0x5a1fe4(0x1a6)]('5',_0x319dfa,_0x2986ec);}function _0x5e5ef0(){var _0x4f0e3c=_0x4c4069;_0x1f9e9f('moo_name',_0x567c55[_0x4f0e3c(0x985)]);if(!_0x3604ee&&_0x415f53()){_0x3902f3=0x0,_0x3604ee=!![],_0x1b7595['stop'](_0x4f0e3c(0x148)),ohio[_0x4f0e3c(0x6cd)](),ohio['currentTime']=0x0,_0x2b7172(_0x4f0e3c(0x7d5)),_0x15695a['send']('sp',{'name':modVisual||fuckoll?_0x567c55[_0x4f0e3c(0x985)]:urName,'moofoll':_0x24c43d,'skin':_0xe3bff1});let _0x206d42=document[_0x4f0e3c(0x838)](_0x4f0e3c(0x959));_0x206d42&&(_0x206d42['style'][_0x4f0e3c(0x196)]='none');}}var _0x436e15=!![];function _0x3bf803(_0x59b0f8){var _0x2c1fab=_0x4c4069;_0x44cd52[_0x2c1fab(0x29c)]['display']=_0x2c1fab(0x15e),_0x42ee52[_0x2c1fab(0x29c)][_0x2c1fab(0x196)]=_0x2c1fab(0x76c),_0x3fd78a[_0x2c1fab(0x29c)][_0x2c1fab(0x196)]=_0x2c1fab(0x15e),_0x86fbe0={},_0x3f7d86=_0x59b0f8,_0x3781ef=0x0,_0x3604ee=!![],_0x436e15&&(_0x436e15=![],_0xc6fef7[_0x2c1fab(0x404)]=0x0);}function _0x822fd4(_0x5aaadb,_0x386090,_0x89e827,_0x4e1003){var _0x988a24=_0x4c4069;_0x3d45a7['showText'](_0x5aaadb,_0x386090,0x32,0.18,0x1f4,Math[_0x988a24(0x11d)](_0x89e827),_0x89e827>=0x0?_0x988a24(0xe6):_0x988a24(0x524));}function _0x2a2022(_0x2eb123,_0xac3b9b){var _0x592dda=_0x4c4069;_0x3d45a7[_0x592dda(0x3d8)](_0x3522e5['x'],_0x3522e5['y'],_0x3522e5[_0x592dda(0x5d9)],0.1,_0x2eb123,_0xac3b9b?_0x592dda(0x1fb):_0x592dda(0x2de),_0xac3b9b?_0x592dda(0xe6):_0x592dda(0xe6));}function _0x18f4e7(_0x562180,_0x59ee2d,_0x10c7e8,_0x8e905d,_0x19b400,_0x18c533){var _0x35ebe3=_0x4c4069;_0x3d45a7[_0x35ebe3(0x3d8)](_0x562180['x'],_0x562180['y'],_0x59ee2d,_0x10c7e8,_0x8e905d,_0x19b400,_0x18c533);}var _0x91542c=0x1869f;function _0x514ba1(){var _0x1e04e9=_0x4c4069;_0x3adf50[_0x1e04e9(0xf7)]=0x0,_0x3604ee=![];try{factorem['refreshAds']([0x2],!![]);}catch(_0x140a13){};_0xc866cc[_0x1e04e9(0x29c)][_0x1e04e9(0x196)]=_0x1e04e9(0x15e),_0x2702a6(),_0x1a6ccc={'x':_0x3522e5['x'],'y':_0x3522e5['y']},_0x44cd52['style'][_0x1e04e9(0x196)]=_0x1e04e9(0x15e),_0x31420d[_0x1e04e9(0x29c)]['display']='block',_0x31420d[_0x1e04e9(0x29c)][_0x1e04e9(0x3bb)]='0px',_0x91542c=0x0,setTimeout(function(){var _0x44dc08=_0x1e04e9;_0x42ee52[_0x44dc08(0x29c)]['display']=_0x44dc08(0x76c),_0x3fd78a['style'][_0x44dc08(0x196)]=_0x44dc08(0x76c),!silentMode&&ohio[_0x44dc08(0x236)](),_0x31420d[_0x44dc08(0x29c)][_0x44dc08(0x196)]=_0x44dc08(0x15e);},fuckoll?_0x252a23['deathFadeout']:0x0),_0x533960();}function _0x466c2d(_0xf54c8e){var _0x4fe722=_0x4c4069;_0x3522e5&&_0x3d4c29[_0x4fe722(0x814)](_0xf54c8e);}var _0x19bdc3=![],_0xb7c744=!![];function _0x21d7f7(_0x53689f){var _0x45385b=_0x4c4069;_0x3affe5[_0x45385b(0x204)]==_0x53689f&&(_0x3affe5={'sid':void 0x0,'hitCount':0x0},_0xc16fb6?_0xcd504(0x0,0x1):_0xcd504(0xb,0x1));let _0x4f197a=_0x2624c0(_0x53689f);if(_0x19bdc3)_0xa5236f(_0x4f197a,_0x3522e5)<=0x6f&&(_0x5e4bb3(0x5,_0x13a352()-_0x3a1dca(0x2d)),_0x5e4bb3(0x5,_0x13a352()+_0x3a1dca(0x2d)),_0x15695a[_0x45385b(0x1a6)]('2',_0x13a352()));else{if(_0xa5236f(_0x4f197a,_0x3522e5)<0x1f4&&_0xb7c744){if(_0x2971cc[_0x45385b(0x404)]){if(_0xa4351a(_0x2971cc,_0x3522e5)<=0x12c)for(let _0x523341=-0x5a;_0x523341<0x5a*0x2;_0x523341+=0x5a){_0x3522e5[_0x45385b(0x21f)][0x2]&&_0x5e4bb3(0x2,_0x555091+_0x3a1dca(_0x523341));}else{if(_0xa4351a(_0x2971cc,_0x3522e5)>0x12c&&_0xa4351a(_0x2971cc,_0x3522e5)<0x1f4)for(let _0xfa171a=0x0;_0xfa171a<Math['PI']*0x2;_0xfa171a+=Math['PI']/0x2){_0x3522e5[_0x45385b(0x21f)][0x4]&&_0x3522e5['items'][0x4]==0xf&&_0x5e4bb3(0x4,_0x555091+_0xfa171a);}}}}}_0xa5236f(_0x4f197a,_0x3522e5)>0x4b0&&(modVisual&&_0x1a1112(_0x4f197a['x'],_0x4f197a['y'])),_0x3d4c29[_0x45385b(0x564)](_0x53689f);}let _0x4515e7=0x0;function _0x3e0240(){var _0x33a089=_0x4c4069;_0x4f870f[_0x33a089(0x809)]=_0x3522e5[_0x33a089(0x960)],_0x4f8d35[_0x33a089(0x809)]=_0x3522e5[_0x33a089(0x594)],_0x12d056[_0x33a089(0x809)]=_0x3522e5['wood'],_0x8bbc99[_0x33a089(0x809)]=_0x3522e5[_0x33a089(0x29f)],_0x3522e5['kills']>_0x18e0a4['innerText']&&(_0x4515e7++,_0x15695a[_0x33a089(0x1a6)]('ch',_0x33a089(0x14b))),_0x18e0a4[_0x33a089(0x809)]=_0x3522e5[_0x33a089(0x8b2)];}var _0x420826={},_0x487f3f=[_0x4c4069(0x8ee),_0x4c4069(0x7cd),_0x4c4069(0x46e)];function _0x275917(){var _0x3f0b9b=_0x4c4069;for(var _0x65a575=0x0;_0x65a575<_0x487f3f[_0x3f0b9b(0x404)];++_0x65a575){var _0x493db9=new Image();_0x493db9[_0x3f0b9b(0x66f)]=function(){this['isLoaded']=!![];},_0x487f3f[_0x65a575]==_0x3f0b9b(0x46e)?_0x493db9[_0x3f0b9b(0x4c3)]=_0x3f0b9b(0x80f):_0x493db9[_0x3f0b9b(0x4c3)]=_0x3f0b9b(0x629)+_0x487f3f[_0x65a575]+'.png',_0x420826[_0x487f3f[_0x65a575]]=_0x493db9;}}var _0x3a905d=[];function _0x4cc213(_0x1854ae,_0x1e4762){var _0x44ae0d=_0x4c4069;_0x3522e5[_0x44ae0d(0x586)]=_0x1854ae,_0x3522e5['upgrAge']=_0x1e4762;if(_0x1854ae>0x0){_0x3a905d[_0x44ae0d(0x404)]=0x0,_0x4271e0['removeAllChildren'](_0x30e3e5);for(var _0x2a0e08=0x0;_0x2a0e08<_0x1a5e63[_0x44ae0d(0x92a)][_0x44ae0d(0x404)];++_0x2a0e08){if(_0x1a5e63[_0x44ae0d(0x92a)][_0x2a0e08]['age']==_0x1e4762&&(_0x1a5e63['weapons'][_0x2a0e08][_0x44ae0d(0x8ca)]==undefined||_0x3522e5[_0x44ae0d(0x92a)][_0x44ae0d(0x5b5)](_0x1a5e63[_0x44ae0d(0x92a)][_0x2a0e08][_0x44ae0d(0x8ca)])>=0x0)){var _0x23c74f=_0x4271e0[_0x44ae0d(0x39d)]({'id':_0x44ae0d(0x19e)+_0x2a0e08,'class':_0x44ae0d(0x895),'onmouseout':function(){_0x342c8a();},'parent':_0x30e3e5});_0x23c74f[_0x44ae0d(0x29c)][_0x44ae0d(0x4da)]=document[_0x44ae0d(0x838)](_0x44ae0d(0x895)+_0x2a0e08)['style'][_0x44ae0d(0x4da)],_0x3a905d[_0x44ae0d(0x333)](_0x2a0e08);}}for(var _0x2a0e08=0x0;_0x2a0e08<_0x1a5e63[_0x44ae0d(0x188)][_0x44ae0d(0x404)];++_0x2a0e08){if(_0x1a5e63[_0x44ae0d(0x188)][_0x2a0e08]['age']==_0x1e4762&&(_0x1a5e63[_0x44ae0d(0x188)][_0x2a0e08][_0x44ae0d(0x8ca)]==undefined||_0x3522e5[_0x44ae0d(0x21f)][_0x44ae0d(0x5b5)](_0x1a5e63['list'][_0x2a0e08][_0x44ae0d(0x8ca)])>=0x0)){var _0x212631=_0x1a5e63['weapons']['length']+_0x2a0e08,_0x23c74f=_0x4271e0[_0x44ae0d(0x39d)]({'id':_0x44ae0d(0x19e)+_0x212631,'class':_0x44ae0d(0x895),'onmouseout':function(){_0x342c8a();},'parent':_0x30e3e5});_0x23c74f[_0x44ae0d(0x29c)][_0x44ae0d(0x4da)]=document[_0x44ae0d(0x838)](_0x44ae0d(0x895)+_0x212631)[_0x44ae0d(0x29c)][_0x44ae0d(0x4da)],_0x3a905d[_0x44ae0d(0x333)](_0x212631);}}for(var _0x2a0e08=0x0;_0x2a0e08<_0x3a905d[_0x44ae0d(0x404)];_0x2a0e08++){(function(_0x4bbf9e){var _0x4d96be=_0x44ae0d,_0x5ca441=document[_0x4d96be(0x838)]('upgradeItem'+_0x4bbf9e);_0x5ca441[_0x4d96be(0x16f)]=function(){var _0x14dfc7=_0x4d96be;_0x1a5e63[_0x14dfc7(0x92a)][_0x4bbf9e]?_0x342c8a(_0x1a5e63[_0x14dfc7(0x92a)][_0x4bbf9e],!![]):_0x342c8a(_0x1a5e63['list'][_0x4bbf9e-_0x1a5e63[_0x14dfc7(0x92a)]['length']]);},_0x5ca441[_0x4d96be(0x90b)]=_0x4271e0[_0x4d96be(0x89e)](function(){_0x4bbf9e>=0x0&&_0x4bbf9e<=0xf&&(_0x3902f3=_0x4bbf9e),_0x15695a['send']('6',_0x4bbf9e);}),_0x4271e0[_0x4d96be(0x4fb)](_0x5ca441);}(_0x3a905d[_0x2a0e08]));}_0x3a905d[_0x44ae0d(0x404)]?(_0x30e3e5[_0x44ae0d(0x29c)][_0x44ae0d(0x196)]='block',_0x3a177c['style']['display']=_0x44ae0d(0x76c),_0x3a177c[_0x44ae0d(0x426)]='SELECT\x20ITEMS\x20('+_0x1854ae+')'):(_0x30e3e5['style']['display']=_0x44ae0d(0x15e),_0x3a177c[_0x44ae0d(0x29c)][_0x44ae0d(0x196)]=_0x44ae0d(0x15e),_0x342c8a());}else _0x30e3e5[_0x44ae0d(0x29c)]['display']='none',_0x3a177c[_0x44ae0d(0x29c)][_0x44ae0d(0x196)]='none',_0x342c8a();}function _0x2a0881(_0x452c18){_0x452c18>=0x0&&_0x452c18<=0xf&&(_0x3902f3=_0x452c18),_0x15695a['send']('6',_0x452c18);}function _0x19b92a(_0xd901b9,_0x49209d,_0x3ced46){var _0x4c3a47=_0x4c4069;if(_0xd901b9!=undefined)_0x3522e5['XP']=_0xd901b9;if(_0x49209d!=undefined)_0x3522e5['maxXP']=_0x49209d;if(_0x3ced46!=undefined)_0x3522e5[_0x4c3a47(0x9ae)]=_0x3ced46;_0x3ced46==_0x252a23[_0x4c3a47(0x163)]?(_0x48a5f1[_0x4c3a47(0x426)]=_0x4c3a47(0x7de),_0x3091d9[_0x4c3a47(0x29c)][_0x4c3a47(0x338)]='100%'):(_0x48a5f1['innerHTML']=_0x4c3a47(0x96d)+_0x3522e5[_0x4c3a47(0x9ae)],_0x3091d9['style']['width']=(modVisual||fuckoll?_0x3522e5['XP']/_0x3522e5['maxXP']*0x64:0x0)+'%');}var _0x5190b8=![];function _0x4b0823(_0x3f9a30){var _0x2e2d25=_0x4c4069;_0x4271e0[_0x2e2d25(0x365)](_0x578738);var _0x1d334b=0x1;if(_0x5190b8){}else for(var _0x96ba2=0x0;_0x96ba2<_0x3f9a30[_0x2e2d25(0x404)];_0x96ba2+=0x3){(function(_0x47c318){var _0x1f0cce=_0x2e2d25;_0x4271e0['generateElement']({'class':'leaderHolder','parent':_0x578738,'children':[_0x4271e0[_0x1f0cce(0x39d)]({'class':_0x1f0cce(0x41d),'style':_0x1f0cce(0x5b6)+(_0x3f9a30[_0x47c318]==_0x3f7d86?_0x1f0cce(0xe6):_0x1f0cce(0x606)),'text':_0x1d334b+'.\x20'+(_0x3f9a30[_0x47c318+0x1]!=''?_0x3f9a30[_0x47c318+0x1]:_0x1f0cce(0x5f0))}),_0x4271e0[_0x1f0cce(0x39d)]({'class':'leaderScore','text':_0x4271e0['kFormat'](_0x3f9a30[_0x47c318+0x2])||'0'})]});}(_0x96ba2),_0x1d334b++);}}function _0x306cf9(){var _0x3d4775=_0x4c4069;if(!![]){if(_0x3522e5){if(!_0x2fec6c||_0x4bc405-_0x2fec6c>=0x3e8/_0x252a23[_0x3d4775(0x2fc)]){_0x2fec6c=_0x4bc405;let _0x32a556=_0x12f69b();_0x2e131e!==_0x32a556&&(_0x2e131e=_0x32a556,_0x15695a['send']('2',_0x32a556));}}_0x91542c<0x78&&(_0x91542c+=0.1*_0x3d1537,_0x31420d['style'][_0x3d4775(0x3bb)]=Math[_0x3d4775(0x176)](Math[_0x3d4775(0x131)](_0x91542c),0x78)+'px');if(_0x3522e5){var _0x177fbe=_0x4271e0[_0x3d4775(0x596)](_0x490b88,_0x17514f,_0x3522e5['x'],_0x3522e5['y']),_0x53d2a1=_0x4271e0[_0x3d4775(0x743)](_0x3522e5['x'],_0x3522e5['y'],_0x490b88,_0x17514f),_0x3fe4c2=Math['min'](_0x177fbe*0.01*_0x3d1537,_0x177fbe);_0x177fbe>0.05?(_0x490b88+=_0x3fe4c2*Math[_0x3d4775(0x90f)](_0x53d2a1),_0x17514f+=_0x3fe4c2*Math['sin'](_0x53d2a1)):(_0x490b88=_0x3522e5['x'],_0x17514f=_0x3522e5['y']);}else _0x490b88=_0x252a23[_0x3d4775(0x141)]/0x2,_0x17514f=_0x252a23['mapScale']/0x2;var _0x341b0e=_0x4bc405-0x3e8/_0x252a23[_0x3d4775(0x1fa)],_0x415062;for(var _0x11f317=0x0;_0x11f317<_0x15cbee[_0x3d4775(0x404)]+_0x33d1e5[_0x3d4775(0x404)];++_0x11f317){_0x3abbd0=_0x15cbee[_0x11f317]||_0x33d1e5[_0x11f317-_0x15cbee[_0x3d4775(0x404)]];if(_0x3abbd0&&_0x3abbd0[_0x3d4775(0x65a)]){if(_0x3abbd0[_0x3d4775(0x943)])_0x3abbd0['x']=_0x3abbd0['x2'],_0x3abbd0['y']=_0x3abbd0['y2'],_0x3abbd0['dir']=_0x3abbd0['d2'];else{var _0x550105=_0x3abbd0['t2']-_0x3abbd0['t1'],_0x46bbab=_0x341b0e-_0x3abbd0['t1'],_0x36cdf2=_0x46bbab/_0x550105,_0x1750fd=0xaa;_0x3abbd0['dt']+=_0x3d1537;var _0x1f510d=Math[_0x3d4775(0x176)](1.7,_0x3abbd0['dt']/_0x1750fd),_0x415062=_0x3abbd0['x2']-_0x3abbd0['x1'];_0x3abbd0['x']=_0x3abbd0['x1']+_0x415062*_0x1f510d,_0x415062=_0x3abbd0['y2']-_0x3abbd0['y1'],_0x3abbd0['y']=_0x3abbd0['y1']+_0x415062*_0x1f510d,_0x3abbd0[_0x3d4775(0x8a0)]=Math['lerpAngle'](_0x3abbd0['d2'],_0x3abbd0['d1'],Math['min'](1.2,_0x36cdf2));}}}var _0x4f38ec=_0x490b88-_0x361505/0x2,_0x171ae3=_0x17514f-_0x26317f/0x2;if(_0x252a23[_0x3d4775(0x834)]-_0x171ae3<=0x0&&_0x252a23[_0x3d4775(0x141)]-_0x252a23[_0x3d4775(0x834)]-_0x171ae3>=_0x26317f)_0x315ee0['fillStyle']=_0x3d4775(0x2e5),_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,_0x361505,_0x26317f);else{if(_0x252a23[_0x3d4775(0x141)]-_0x252a23[_0x3d4775(0x834)]-_0x171ae3<=0x0)_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x5ff),_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,_0x361505,_0x26317f);else{if(_0x252a23['snowBiomeTop']-_0x171ae3>=_0x26317f)_0x315ee0['fillStyle']='#fff',_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,_0x361505,_0x26317f);else _0x252a23[_0x3d4775(0x834)]-_0x171ae3>=0x0?(_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0xe6),_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,_0x361505,_0x252a23[_0x3d4775(0x834)]-_0x171ae3),_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x2e5),_0x315ee0[_0x3d4775(0x56c)](0x0,_0x252a23[_0x3d4775(0x834)]-_0x171ae3,_0x361505,_0x26317f-(_0x252a23['snowBiomeTop']-_0x171ae3))):(_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x2e5),_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,_0x361505,_0x252a23[_0x3d4775(0x141)]-_0x252a23['snowBiomeTop']-_0x171ae3),_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x5ff),_0x315ee0[_0x3d4775(0x56c)](0x0,_0x252a23['mapScale']-_0x252a23[_0x3d4775(0x834)]-_0x171ae3,_0x361505,_0x26317f-(_0x252a23[_0x3d4775(0x141)]-_0x252a23[_0x3d4775(0x834)]-_0x171ae3)));}}if(!_0x436e15){_0x229bf0+=_0x1b5894*_0x252a23[_0x3d4775(0x225)]*_0x3d1537;if(_0x229bf0>=_0x252a23[_0x3d4775(0x617)])_0x229bf0=_0x252a23['waveMax'],_0x1b5894=-0x1;else _0x229bf0<=0x1&&(_0x229bf0=_0x1b5894=0x1);_0x315ee0[_0x3d4775(0x452)]=0x1,_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x5ff),_0x15f059(_0x4f38ec,_0x171ae3,_0x315ee0,_0x252a23['riverPadding']),_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x725),_0x15f059(_0x4f38ec,_0x171ae3,_0x315ee0,(_0x229bf0-0x1)*0xfa);}_0x315ee0[_0x3d4775(0x713)]=0x4,_0x315ee0['strokeStyle']=_0x3d4775(0xfa),_0x315ee0[_0x3d4775(0x452)]=0.06,_0x315ee0[_0x3d4775(0x6f8)]();for(var _0x47da6c=(0x3840-_0x4f38ec)%0x5a0;_0x47da6c<_0x361505;_0x47da6c+=0x5a0){_0x47da6c>0x0&&(_0x315ee0[_0x3d4775(0x4bc)](_0x47da6c,0x0),_0x315ee0[_0x3d4775(0x604)](_0x47da6c,_0x26317f));}for(var _0x5901a=(0x3840-_0x171ae3)%0x5a0;_0x5901a<_0x26317f;_0x5901a+=0x5a0){_0x5901a>0x0&&(_0x315ee0['moveTo'](0x0,_0x5901a),_0x315ee0[_0x3d4775(0x604)](_0x361505,_0x5901a));}_0x315ee0[_0x3d4775(0x631)](),_0x315ee0['globalAlpha']=0x1,_0x315ee0['strokeStyle']=_0x1a973e,_0x5cfa66(-0x1,_0x4f38ec,_0x171ae3),_0x315ee0['globalAlpha']=0x1,_0x315ee0[_0x3d4775(0x713)]=_0x224ee7,_0x2db951(0x0,_0x4f38ec,_0x171ae3),_0x30464c(_0x4f38ec,_0x171ae3,0x0),_0x315ee0['globalAlpha']=0x1;for(var _0x11f317=0x0;_0x11f317<_0x33d1e5[_0x3d4775(0x404)];++_0x11f317){_0x3abbd0=_0x33d1e5[_0x11f317],_0x3abbd0[_0x3d4775(0x4ab)]&&_0x3abbd0[_0x3d4775(0x65a)]&&(_0x3abbd0[_0x3d4775(0x307)](_0x3d1537),_0x315ee0[_0x3d4775(0x59c)](),_0x315ee0[_0x3d4775(0x475)](_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3),_0x315ee0['rotate'](_0x3abbd0['dir']+_0x3abbd0['dirPlus']-Math['PI']/0x2),_0x4811fd(_0x3abbd0,_0x315ee0),_0x315ee0[_0x3d4775(0x3d4)]());}_0x5cfa66(0x0,_0x4f38ec,_0x171ae3),_0x2db951(0x1,_0x4f38ec,_0x171ae3),_0x5cfa66(0x1,_0x4f38ec,_0x171ae3),_0x30464c(_0x4f38ec,_0x171ae3,0x1),_0x5cfa66(0x2,_0x4f38ec,_0x171ae3),_0x5cfa66(0x3,_0x4f38ec,_0x171ae3),_0x315ee0[_0x3d4775(0x3fb)]='#000',_0x315ee0[_0x3d4775(0x452)]=0.09;_0x4f38ec<=0x0&&_0x315ee0[_0x3d4775(0x56c)](0x0,0x0,-_0x4f38ec,_0x26317f);if(_0x252a23[_0x3d4775(0x141)]-_0x4f38ec<=_0x361505){var _0x4c9ae2=Math[_0x3d4775(0x77b)](0x0,-_0x171ae3);_0x315ee0[_0x3d4775(0x56c)](_0x252a23['mapScale']-_0x4f38ec,_0x4c9ae2,_0x361505-(_0x252a23[_0x3d4775(0x141)]-_0x4f38ec),_0x26317f-_0x4c9ae2);}_0x171ae3<=0x0&&_0x315ee0[_0x3d4775(0x56c)](-_0x4f38ec,0x0,_0x361505+_0x4f38ec,-_0x171ae3);if(_0x252a23['mapScale']-_0x171ae3<=_0x26317f){var _0x2a3d92=Math[_0x3d4775(0x77b)](0x0,-_0x4f38ec),_0x12947e=0x0;if(_0x252a23[_0x3d4775(0x141)]-_0x4f38ec<=_0x361505)_0x12947e=_0x361505-(_0x252a23[_0x3d4775(0x141)]-_0x4f38ec);_0x315ee0[_0x3d4775(0x56c)](_0x2a3d92,_0x252a23[_0x3d4775(0x141)]-_0x171ae3,_0x361505-_0x2a3d92-_0x12947e,_0x26317f-(_0x252a23[_0x3d4775(0x141)]-_0x171ae3));}_0x315ee0[_0x3d4775(0x452)]=0x1,_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0x4d9),_0x315ee0['fillRect'](0x0,0x0,_0x361505,_0x26317f),_0x315ee0[_0x3d4775(0x71e)]=_0x496f04;for(var _0x11f317=0x0;_0x11f317<_0x15cbee[_0x3d4775(0x404)]+_0x33d1e5[_0x3d4775(0x404)];++_0x11f317){_0x3abbd0=_0x15cbee[_0x11f317]||_0x33d1e5[_0x11f317-_0x15cbee[_0x3d4775(0x404)]];if(_0x3abbd0[_0x3d4775(0x65a)]){if(_0x3abbd0[_0x3d4775(0x201)]!=0xa||_0x3abbd0==_0x3522e5||_0x3abbd0[_0x3d4775(0x2b8)]&&_0x3abbd0[_0x3d4775(0x2b8)]==_0x3522e5['team']){var _0x2ec120=(_0x3abbd0['team']?'['+_0x3abbd0[_0x3d4775(0x2b8)]+']\x20':'')+(_0x3abbd0[_0x3d4775(0x2f1)]||'');if(_0x2ec120!=''){_0x315ee0[_0x3d4775(0x872)]=(_0x3abbd0['nameScale']||0x1e)+'px\x20Hammersmith\x20One',_0x315ee0[_0x3d4775(0x3fb)]='#fff',_0x315ee0[_0x3d4775(0x8af)]=_0x3d4775(0x3e2),_0x315ee0['textAlign']='center',_0x315ee0[_0x3d4775(0x71e)]=_0x3d4775(0x3b4),_0x315ee0[_0x3d4775(0x713)]=_0x3abbd0[_0x3d4775(0x783)]?0xb:0x8,_0x315ee0[_0x3d4775(0x89f)]=_0x3d4775(0x131),_0x315ee0[_0x3d4775(0x2f2)](_0x2ec120,_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3-_0x3abbd0['scale']-_0x252a23['nameY']),_0x315ee0['fillText'](_0x2ec120,_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3-_0x3abbd0['scale']-_0x252a23[_0x3d4775(0x881)]);if(_0x3abbd0['isLeader']&&_0x420826[_0x3d4775(0x8ee)][_0x3d4775(0x622)]){var _0x55882b=_0x252a23['crownIconScale'],_0x2a3d92=_0x3abbd0['x']-_0x4f38ec-_0x55882b/0x2-_0x315ee0[_0x3d4775(0x603)](_0x2ec120)['width']/0x2-_0x252a23[_0x3d4775(0x256)];_0x315ee0['drawImage'](_0x420826[_0x3d4775(0x8ee)],_0x2a3d92,_0x3abbd0['y']-_0x171ae3-_0x3abbd0[_0x3d4775(0x5d9)]-_0x252a23[_0x3d4775(0x881)]-_0x55882b/0x2-0x5,_0x55882b,_0x55882b);}if(_0x3abbd0['iconIndex']==0x1&&_0x420826['skull'][_0x3d4775(0x622)]){var _0x55882b=_0x252a23['crownIconScale'],_0x2a3d92=_0x3abbd0['x']-_0x4f38ec-_0x55882b/0x2+_0x315ee0[_0x3d4775(0x603)](_0x2ec120)['width']/0x2+_0x252a23[_0x3d4775(0x256)];_0x315ee0[_0x3d4775(0x732)](_0x420826[_0x3d4775(0x7cd)],_0x2a3d92,_0x3abbd0['y']-_0x171ae3-_0x3abbd0[_0x3d4775(0x5d9)]-_0x252a23[_0x3d4775(0x881)]-_0x55882b/0x2-0x5,_0x55882b,_0x55882b);}if(_0x3abbd0['sid']===_0x2971cc[0x0]&&_0x306f57&&_0x420826[_0x3d4775(0x46e)][_0x3d4775(0x622)]&&_0x2971cc[_0x3d4775(0x404)]&&modVisual){var _0x55882b=_0x252a23['playerScale']*0x2;_0x315ee0['drawImage'](_0x420826[_0x3d4775(0x46e)],_0x3abbd0['x']-_0x4f38ec-_0x55882b+_0x252a23[_0x3d4775(0x116)],_0x3abbd0['y']-_0x171ae3-_0x252a23[_0x3d4775(0x116)],_0x55882b,_0x55882b);}}if((_0x3abbd0[_0x3d4775(0x526)]&&!(_0x3abbd0==_0x3522e5||_0x3abbd0['team']&&_0x3abbd0[_0x3d4775(0x2b8)]==_0x3522e5[_0x3d4775(0x2b8)])&&!modVisual&&!fuckoll?_0x3abbd0[_0x3d4775(0x7f3)]:_0x3abbd0[_0x3d4775(0x1d7)])>0x0){var _0x33faf2=_0x252a23[_0x3d4775(0x1e4)];_0x315ee0[_0x3d4775(0x3fb)]=_0x496f04,_0x315ee0[_0x3d4775(0x6c7)](_0x3abbd0['x']-_0x4f38ec-_0x252a23[_0x3d4775(0x1e4)]-_0x252a23[_0x3d4775(0x2cd)],_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23[_0x3d4775(0x881)],_0x252a23[_0x3d4775(0x1e4)]*0x2+_0x252a23[_0x3d4775(0x2cd)]*0x2,0x11,0x8),_0x315ee0[_0x3d4775(0x749)](),_0x315ee0[_0x3d4775(0x3fb)]=_0x3abbd0==_0x3522e5||_0x3abbd0['team']&&_0x3abbd0['team']==_0x3522e5['team']?'#8ecc51':_0x3d4775(0x2ca),_0x315ee0['roundRect'](_0x3abbd0['x']-_0x4f38ec-_0x252a23['healthBarWidth'],_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23['nameY']+_0x252a23[_0x3d4775(0x2cd)],_0x252a23[_0x3d4775(0x1e4)]*0x2*(_0x3abbd0[_0x3d4775(0x1d7)]/_0x3abbd0['maxHealth']),0x11-_0x252a23['healthBarPad']*0x2,0x7),_0x315ee0[_0x3d4775(0x749)]();}if(_0x3abbd0['isPlayer']){_0x315ee0[_0x3d4775(0x872)]=(_0x3abbd0[_0x3d4775(0x783)]||0x1e)+_0x3d4775(0x8f8),_0x315ee0[_0x3d4775(0x3fb)]=_0x3abbd0[_0x3d4775(0x23b)]<_0x3abbd0[_0x3d4775(0x880)]?'red':_0x3d4775(0x93a),_0x315ee0[_0x3d4775(0x8af)]='middle',_0x315ee0[_0x3d4775(0x8d9)]=_0x3d4775(0x9a6),_0x315ee0['lineWidth']=_0x3abbd0['nameScale']?0xb:0x8,_0x315ee0['lineJoin']=_0x3d4775(0x131),_0x315ee0['strokeStyle']=_0x3d4775(0x3b4);var _0x55882b=_0x252a23[_0x3d4775(0x3a9)],_0x2a3d92=_0x3abbd0['x']-_0x4f38ec-_0x55882b/0x2+_0x315ee0[_0x3d4775(0x603)](_0x2ec120)[_0x3d4775(0x338)]/0x2+_0x252a23['crownPad']+(_0x3abbd0[_0x3d4775(0x96a)]==0x1?(_0x3abbd0[_0x3d4775(0x783)]||0x1e)*2.5:_0x3abbd0['nameScale']||0x1e);_0x315ee0['strokeText'](_0x3abbd0[_0x3d4775(0x23b)],_0x2a3d92,_0x3abbd0['y']-_0x171ae3-_0x3abbd0['scale']-_0x252a23['nameY']),_0x315ee0['fillText'](_0x3abbd0['shameCount2'],_0x2a3d92,_0x3abbd0['y']-_0x171ae3-_0x3abbd0[_0x3d4775(0x5d9)]-_0x252a23[_0x3d4775(0x881)]);var _0x33faf2=_0x252a23['healthBarWidth'];_0x315ee0[_0x3d4775(0x3fb)]=_0x496f04,_0x315ee0[_0x3d4775(0x6c7)](_0x3abbd0['x']-_0x4f38ec-_0x252a23[_0x3d4775(0x1e4)]-_0x252a23[_0x3d4775(0x2cd)]+0x32,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23['nameY']-0xd,_0x252a23['healthBarWidth']+_0x252a23['healthBarPad']*0x2,0x11,0x8),_0x315ee0[_0x3d4775(0x749)](),InbundleMyPlayer=_0x3522e5,_0x315ee0['fillStyle']=_0x3abbd0['sR']==0x1&&(_0x3abbd0==_0x3522e5||_0x3abbd0['team']&&_0x3abbd0[_0x3d4775(0x2b8)]==_0x3522e5[_0x3d4775(0x2b8)])?'#978b6a':_0x3d4775(0x907),_0x315ee0[_0x3d4775(0x6c7)](_0x3abbd0['x']-_0x4f38ec-_0x252a23['healthBarWidth']+0x32,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23['nameY']-0xd+_0x252a23[_0x3d4775(0x2cd)],_0x252a23[_0x3d4775(0x1e4)]*_0x3abbd0['sR'],0x11-_0x252a23['healthBarPad']*0x2,0x7),_0x315ee0[_0x3d4775(0x749)]();var _0x33faf2=_0x252a23[_0x3d4775(0x1e4)];_0x315ee0[_0x3d4775(0x3fb)]=_0x496f04,_0x315ee0[_0x3d4775(0x6c7)](_0x3abbd0['x']-_0x4f38ec-_0x252a23[_0x3d4775(0x1e4)]-_0x252a23['healthBarPad'],_0x3abbd0['y']-_0x171ae3+_0x3abbd0['scale']+_0x252a23[_0x3d4775(0x881)]-0xd,_0x252a23['healthBarWidth']+_0x252a23[_0x3d4775(0x2cd)]*0x2,0x11,0x8),_0x315ee0[_0x3d4775(0x749)](),_0x315ee0[_0x3d4775(0x3fb)]=_0x3abbd0['pR']==0x1&&(_0x3abbd0==_0x3522e5||_0x3abbd0[_0x3d4775(0x2b8)]&&_0x3abbd0[_0x3d4775(0x2b8)]==_0x3522e5[_0x3d4775(0x2b8)])?_0x3d4775(0x907):_0x3d4775(0x907),_0x315ee0['roundRect'](_0x3abbd0['x']-_0x4f38ec-_0x252a23[_0x3d4775(0x1e4)],_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23['nameY']-0xd+_0x252a23['healthBarPad'],_0x252a23[_0x3d4775(0x1e4)]*_0x3abbd0['pR'],0x11-_0x252a23[_0x3d4775(0x2cd)]*0x2,0x7),_0x315ee0['fill']();if(_0x3abbd0==_0x3522e5&&modVisual)_0x315ee0[_0x3d4775(0x872)]=_0x3d4775(0x6ed),_0x315ee0[_0x3d4775(0x3fb)]='#fff',_0x315ee0[_0x3d4775(0x8af)]=_0x3d4775(0x3e2),_0x315ee0[_0x3d4775(0x8d9)]='center',_0x315ee0[_0x3d4775(0x713)]=_0x3abbd0['nameScale']?0xb:0x8,_0x315ee0['lineJoin']=_0x3d4775(0x131),_0x315ee0[_0x3d4775(0x71e)]='black',_0x315ee0[_0x3d4775(0x2f2)]('['+_0x2c24e5[_0x3abbd0[_0x3d4775(0x204)]]+'/'+_0x5b3b1d[_0x3abbd0[_0x3d4775(0x204)]]+'/'+_0x3f04b2+'/'+_0x466448+'/'+_0x407e2c+']',_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23[_0x3d4775(0x881)]+13.5*0x2),_0x315ee0[_0x3d4775(0x7d2)]('['+_0x2c24e5[_0x3abbd0[_0x3d4775(0x204)]]+'/'+_0x5b3b1d[_0x3abbd0['sid']]+'/'+_0x3f04b2+'/'+_0x466448+'/'+_0x407e2c+']',_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23[_0x3d4775(0x881)]+13.5*0x2);else{_0x3abbd0,_0x315ee0[_0x3d4775(0x872)]=_0x3d4775(0x6ed),_0x315ee0[_0x3d4775(0x3fb)]=_0x3d4775(0xe6),_0x315ee0[_0x3d4775(0x8af)]=_0x3d4775(0x3e2),_0x315ee0[_0x3d4775(0x8d9)]='center',_0x315ee0[_0x3d4775(0x713)]=_0x3abbd0[_0x3d4775(0x783)]?0xb:0x8,_0x315ee0[_0x3d4775(0x89f)]='round',_0x315ee0[_0x3d4775(0x71e)]=_0x3d4775(0x3b4),_0x315ee0[_0x3d4775(0x2f2)]('['+_0x2c24e5[_0x3abbd0[_0x3d4775(0x204)]]+'/'+_0x5b3b1d[_0x3abbd0[_0x3d4775(0x204)]]+']',_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23[_0x3d4775(0x881)]+13.5*0x2),_0x315ee0[_0x3d4775(0x7d2)]('['+_0x2c24e5[_0x3abbd0[_0x3d4775(0x204)]]+'/'+_0x5b3b1d[_0x3abbd0['sid']]+']',_0x3abbd0['x']-_0x4f38ec,_0x3abbd0['y']-_0x171ae3+_0x3abbd0[_0x3d4775(0x5d9)]+_0x252a23['nameY']+13.5*0x2);if(!(_0x3abbd0==_0x3522e5||_0x3abbd0[_0x3d4775(0x2b8)]&&_0x3abbd0['team']==_0x3522e5['team'])){let _0x4fa880=Math['floor'](_0x1631ab(_0x3abbd0,_0x3522e5)),_0xf7fc26=function(_0x457153){return _0x4fa880/_0x457153;},_0x20480c=function(_0x257cea){let _0xf20f15=_0x4fa880/_0x257cea;return _0xf20f15>0x168?_0x257cea:_0xf20f15;};_0x315ee0['save'](),_0x315ee0[_0x3d4775(0x475)](_0x3522e5['x1']+_0xf7fc26(0x2)*Math[_0x3d4775(0x90f)](_0x5874dd(_0x3abbd0,_0x3522e5))-_0x4f38ec,_0x3522e5['y1']+_0xf7fc26(0x2)*Math['sin'](_0x5874dd(_0x3abbd0,_0x3522e5))-_0x171ae3),_0x315ee0[_0x3d4775(0x8e8)](_0x5874dd(_0x3abbd0,_0x3522e5)+Math['PI']/0x2),_0x315ee0[_0x3d4775(0x3fb)]='hsl('+_0xf7fc26(0xe)+_0x3d4775(0x981),_0x315ee0[_0x3d4775(0x452)]=Math[_0x3d4775(0x176)](0x1,_0xf7fc26(0x5a0)),_0x2e0b81(_0x252a23[_0x3d4775(0x116)],_0x315ee0),_0x315ee0[_0x3d4775(0x3d4)]();}}}}}}_0x3d45a7['update'](_0x3d1537,_0x315ee0,_0x4f38ec,_0x171ae3);for(var _0x11f317=0x0;_0x11f317<_0x15cbee[_0x3d4775(0x404)];++_0x11f317){_0x3abbd0=_0x15cbee[_0x11f317];if(_0x3abbd0[_0x3d4775(0x65a)]&&_0x3abbd0[_0x3d4775(0x591)]>0x0){_0x3abbd0[_0x3d4775(0x591)]-=_0x3d1537;if(_0x3abbd0[_0x3d4775(0x591)]<=0x0)_0x3abbd0[_0x3d4775(0x591)]=0x0;_0x315ee0[_0x3d4775(0x872)]=_0x3d4775(0x784);var _0x258a3c=_0x315ee0[_0x3d4775(0x603)](_0x3abbd0[_0x3d4775(0x978)]);_0x315ee0[_0x3d4775(0x8af)]=_0x3d4775(0x3e2),_0x315ee0[_0x3d4775(0x8d9)]=_0x3d4775(0x9a6);var _0x2a3d92=_0x3abbd0['x']-_0x4f38ec,_0x4c9ae2=_0x3abbd0['y']-_0x3abbd0['scale']-_0x171ae3-0x5a,_0x1003c6=0x2f,_0x410aa1=_0x258a3c[_0x3d4775(0x338)]+0x11;_0x315ee0[_0x3d4775(0x3fb)]='rgba(0,0,0,0.2)',_0x315ee0['roundRect'](_0x2a3d92-_0x410aa1/0x2,_0x4c9ae2-_0x1003c6/0x2,_0x410aa1,_0x1003c6,0x6),_0x315ee0[_0x3d4775(0x749)](),_0x315ee0[_0x3d4775(0x3fb)]='#fff',_0x315ee0['fillText'](_0x3abbd0[_0x3d4775(0x978)],_0x2a3d92,_0x4c9ae2);}if(_0x3abbd0[_0x3d4775(0x65a)]&&_0x3abbd0[_0x3d4775(0x124)]>0x0){_0x3abbd0[_0x3d4775(0x124)]-=_0x3d1537;if(_0x3abbd0['iChatCountdown']<=0x0)_0x3abbd0[_0x3d4775(0x124)]=0x0;_0x315ee0[_0x3d4775(0x872)]=_0x3d4775(0x784);var _0x258a3c=_0x315ee0[_0x3d4775(0x603)](_0x3abbd0['iChatMessage']);_0x315ee0[_0x3d4775(0x8af)]=_0x3d4775(0x3e2),_0x315ee0[_0x3d4775(0x8d9)]=_0x3d4775(0x9a6);var _0x2a3d92=_0x3abbd0['x']-_0x4f38ec,_0x4c9ae2=_0x3abbd0['y']-_0x3abbd0[_0x3d4775(0x5d9)]-_0x171ae3+0xb4,_0x1003c6=0x2f,_0x410aa1=_0x258a3c[_0x3d4775(0x338)]+0x11;_0x315ee0[_0x3d4775(0x3fb)]='rgba(0,0,0,0.2)',_0x315ee0[_0x3d4775(0x6c7)](_0x2a3d92-_0x410aa1/0x2,_0x4c9ae2-_0x1003c6/0x2,_0x410aa1,_0x1003c6,0x6),_0x315ee0[_0x3d4775(0x749)](),_0x315ee0[_0x3d4775(0x3fb)]='rgba(255,255,255,0.6)',_0x315ee0['fillText'](_0x3abbd0[_0x3d4775(0x243)],_0x2a3d92,_0x4c9ae2);}}}_0x48b7e5(_0x3d1537),_0x39d2c8['id']!==-0x1&&_0x2e29f8(_0x39d2c8[_0x3d4775(0x497)],_0x39d2c8['startY'],_0x39d2c8[_0x3d4775(0x370)],_0x39d2c8[_0x3d4775(0x2cb)]),_0x1b84ce['id']!==-0x1&&_0x2e29f8(_0x1b84ce[_0x3d4775(0x497)],_0x1b84ce[_0x3d4775(0x5b1)],_0x1b84ce[_0x3d4775(0x370)],_0x1b84ce[_0x3d4775(0x2cb)]);}function _0x2e29f8(_0x568a7b,_0xa69acf,_0x25493c,_0x5e36fc){var _0x2c63a5=_0x4c4069;_0x315ee0[_0x2c63a5(0x59c)](),_0x315ee0[_0x2c63a5(0x5f7)](0x1,0x0,0x0,0x1,0x0,0x0),_0x315ee0['scale'](_0x126d17,_0x126d17);var _0x499b48=0x32;_0x315ee0['beginPath'](),_0x315ee0[_0x2c63a5(0x25e)](_0x568a7b,_0xa69acf,_0x499b48,0x0,Math['PI']*0x2,![]),_0x315ee0[_0x2c63a5(0x9ad)](),_0x315ee0[_0x2c63a5(0x3fb)]='rgba(255,\x20255,\x20255,\x200.3)',_0x315ee0[_0x2c63a5(0x749)]();var _0x499b48=0x32,_0x4e6ccf=_0x25493c-_0x568a7b,_0x2f729d=_0x5e36fc-_0xa69acf,_0x39f05e=Math[_0x2c63a5(0x934)](Math['pow'](_0x4e6ccf,0x2)+Math[_0x2c63a5(0x11f)](_0x2f729d,0x2)),_0x55373b=_0x39f05e>_0x499b48?_0x39f05e/_0x499b48:0x1;_0x4e6ccf/=_0x55373b,_0x2f729d/=_0x55373b,_0x315ee0[_0x2c63a5(0x6f8)](),_0x315ee0[_0x2c63a5(0x25e)](_0x568a7b+_0x4e6ccf,_0xa69acf+_0x2f729d,_0x499b48*0.5,0x0,Math['PI']*0x2,![]),_0x315ee0[_0x2c63a5(0x9ad)](),_0x315ee0[_0x2c63a5(0x3fb)]=_0x2c63a5(0x59a),_0x315ee0[_0x2c63a5(0x749)](),_0x315ee0['restore']();}function _0x2db951(_0x4afa8a,_0x55377d,_0x4584c0){var _0x41bc38=_0x4c4069;for(var _0x140c85=0x0;_0x140c85<_0x273611[_0x41bc38(0x404)];++_0x140c85){_0x3abbd0=_0x273611[_0x140c85],_0x3abbd0['active']&&_0x3abbd0[_0x41bc38(0x2aa)]==_0x4afa8a&&(_0x3abbd0[_0x41bc38(0x767)](_0x3d1537),_0x3abbd0[_0x41bc38(0x4ab)]&&_0xcfb940(_0x3abbd0['x']-_0x55377d,_0x3abbd0['y']-_0x4584c0,_0x3abbd0[_0x41bc38(0x5d9)])&&(_0x315ee0['save'](),_0x315ee0[_0x41bc38(0x475)](_0x3abbd0['x']-_0x55377d,_0x3abbd0['y']-_0x4584c0),_0x315ee0[_0x41bc38(0x8e8)](_0x3abbd0[_0x41bc38(0x8a0)]),_0x32a44f(0x0,0x0,_0x3abbd0,_0x315ee0,0x1),_0x315ee0[_0x41bc38(0x3d4)]()));}}var _0x1f5bf7={};function _0x32a44f(_0xc1a9c4,_0xc98f39,_0x3a2c86,_0x1fcbbd,_0x2bf7e2){var _0x5c27fb=_0x4c4069;if(_0x3a2c86['src']){var _0x442f2b=_0x1a5e63[_0x5c27fb(0x217)][_0x3a2c86[_0x5c27fb(0x18b)]]['src'],_0x733c52=_0x1f5bf7[_0x442f2b];!_0x733c52&&(_0x733c52=new Image(),_0x733c52['onload']=function(){var _0x2fc90a=_0x5c27fb;this[_0x2fc90a(0x622)]=!![];},_0x733c52['src']=_0x5c27fb(0x97f)+_0x442f2b+_0x5c27fb(0x853),_0x1f5bf7[_0x442f2b]=_0x733c52);if(_0x733c52[_0x5c27fb(0x622)])_0x1fcbbd[_0x5c27fb(0x732)](_0x733c52,_0xc1a9c4-_0x3a2c86[_0x5c27fb(0x5d9)]/0x2,_0xc98f39-_0x3a2c86['scale']/0x2,_0x3a2c86[_0x5c27fb(0x5d9)],_0x3a2c86['scale']);}else _0x3a2c86[_0x5c27fb(0x18b)]==0x1&&(_0x1fcbbd[_0x5c27fb(0x3fb)]=_0x5c27fb(0x790),_0x4741da(_0xc1a9c4,_0xc98f39,_0x3a2c86[_0x5c27fb(0x5d9)],_0x1fcbbd));}function _0x15f059(_0x117476,_0x39bed9,_0x248626,_0x4fffac){var _0x12639e=_0x4c4069,_0x587c85=_0x252a23[_0x12639e(0x386)]+_0x4fffac,_0x1cffbc=_0x252a23[_0x12639e(0x141)]/0x2-_0x39bed9-_0x587c85/0x2;_0x1cffbc<_0x26317f&&_0x1cffbc+_0x587c85>0x0&&_0x248626[_0x12639e(0x56c)](0x0,_0x1cffbc,_0x361505,_0x587c85);}function _0x5cfa66(_0x4dc390,_0x4444c6,_0x2788ea){var _0x30f595=_0x4c4069,_0x4d6383,_0x1cde87,_0x343965;for(var _0x2b11e6=0x0;_0x2b11e6<_0xc6fef7[_0x30f595(0x404)];++_0x2b11e6){_0x3abbd0=_0xc6fef7[_0x2b11e6],_0x3abbd0[_0x30f595(0x4ab)]&&(_0x1cde87=_0x3abbd0['x']+_0x3abbd0[_0x30f595(0x4f8)]-_0x4444c6,_0x343965=_0x3abbd0['y']+_0x3abbd0[_0x30f595(0x8be)]-_0x2788ea,_0x4dc390==0x0&&_0x3abbd0[_0x30f595(0x767)](_0x3d1537),_0x3abbd0['layer']==_0x4dc390&&_0xcfb940(_0x1cde87,_0x343965,_0x3abbd0[_0x30f595(0x5d9)]+(_0x3abbd0[_0x30f595(0x81b)]||0x0))&&(_0x315ee0[_0x30f595(0x452)]=_0x3abbd0[_0x30f595(0x799)]?0.6:0x1,_0x3abbd0[_0x30f595(0x521)]?(_0x4d6383=_0x3da042(_0x3abbd0,![]),_0x315ee0[_0x30f595(0x59c)](),_0x315ee0[_0x30f595(0x475)](_0x1cde87,_0x343965),_0x315ee0['rotate'](modVisual||fuckoll?_0x3abbd0[_0x30f595(0x8a0)]:0x0),_0x315ee0[_0x30f595(0x732)](_0x4d6383,-(_0x4d6383['width']/0x2),-(_0x4d6383[_0x30f595(0x646)]/0x2)),_0x3abbd0[_0x30f595(0x81b)]&&(_0x315ee0[_0x30f595(0x71e)]=_0x30f595(0x757),_0x315ee0[_0x30f595(0x452)]=0.3,_0x315ee0['lineWidth']=0x6,_0x4741da(0x0,0x0,_0x3abbd0[_0x30f595(0x81b)],_0x315ee0,![],!![])),_0x315ee0['restore']()):(_0x4d6383=_0x1d00bb(_0x3abbd0),_0x315ee0['drawImage'](_0x4d6383,_0x1cde87-_0x4d6383['width']/0x2,_0x343965-_0x4d6383[_0x30f595(0x646)]/0x2))));}}function _0x550146(_0x15e868,_0x2e8e3a,_0x37c0c1){var _0x3d7ece=_0x4c4069;_0x3abbd0=_0xf4ede0(_0x15e868);if(_0x3abbd0){_0x3abbd0[_0x3d7ece(0x1c3)](_0x2e8e3a,_0x37c0c1);if(_0x37c0c1<0x9)_0x3abbd0['pR']=-(0x3e8/_0x252a23['serverUpdateRate'])/_0x1a5e63[_0x3d7ece(0x92a)][_0x37c0c1][_0x3d7ece(0x737)],_0x3abbd0['pCd']=_0x1a5e63[_0x3d7ece(0x92a)][_0x37c0c1][_0x3d7ece(0x341)];else _0x37c0c1>0x8&&(_0x3abbd0['sR']=-(0x3e8/_0x252a23[_0x3d7ece(0x1fa)])/_0x1a5e63[_0x3d7ece(0x92a)][_0x37c0c1][_0x3d7ece(0x737)],_0x3abbd0[_0x3d7ece(0x258)]=_0x1a5e63['weapons'][_0x37c0c1][_0x3d7ece(0x341)]);_0x3abbd0==_0x3522e5&&(_0x22239e&&_0x3522e5[_0x3d7ece(0x92a)][0x1]==0xa&&_0x3522e5[_0x3d7ece(0x5eb)][0x28]&&_0x3affe5[_0x3d7ece(0x51a)]++);}}var _0x5b80b5=![];function _0x30464c(_0x1ee10f,_0x4ac825,_0x183733){var _0x49d542=_0x4c4069;_0x315ee0['globalAlpha']=0x1;for(var _0x5a40af=0x0;_0x5a40af<_0x15cbee[_0x49d542(0x404)];++_0x5a40af){_0x3abbd0=_0x15cbee[_0x5a40af],_0x3abbd0[_0x49d542(0x3f2)]==_0x183733&&(_0x3abbd0['animate'](_0x3d1537),_0x3abbd0[_0x49d542(0x65a)]&&(_0x3abbd0['skinRot']+=0.002*_0x3d1537,_0x5f1445=(_0x3abbd0==_0x3522e5&&(modVisual||fuckoll)?_0x13a352():_0x3abbd0[_0x49d542(0x8a0)])+_0x3abbd0[_0x49d542(0x1bb)],_0x315ee0[_0x49d542(0x59c)](),_0x315ee0['translate'](_0x3abbd0['x']-_0x1ee10f,_0x3abbd0['y']-_0x4ac825),_0x315ee0[_0x49d542(0x8e8)](_0x5f1445),_0x3f5e06(_0x3abbd0,_0x315ee0),_0x315ee0['restore']()));}}var _0x394c9c=![];function _0x3f5e06(_0x330aa1,_0x20bf27){var _0x4d7c3d=_0x4c4069;_0x20bf27=_0x20bf27||_0x315ee0,_0x20bf27[_0x4d7c3d(0x713)]=_0x224ee7,_0x20bf27[_0x4d7c3d(0x89f)]=_0x4d7c3d(0x5a2);var _0x207157=Math['PI']/0x4*(_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1['weaponIndex']][_0x4d7c3d(0x4e5)]||0x1),_0x373327=_0x330aa1[_0x4d7c3d(0x915)]<0x0?_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x433)]||0x1:0x1,_0x31324a=_0x330aa1[_0x4d7c3d(0x915)]<0x0?_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x4c5)]||0x1:0x1;_0x330aa1[_0x4d7c3d(0x45c)]>0x0&&(_0x394c9c?_0x1a359f(_0x330aa1[_0x4d7c3d(0x45c)],_0x20bf27,_0x330aa1):_0xefbd33(_0x330aa1[_0x4d7c3d(0x45c)],_0x20bf27,_0x330aa1));_0x330aa1[_0x4d7c3d(0x915)]<0x0&&!_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x753)]&&(_0x394c9c?_0xacfb07(_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]],_0x252a23['weaponVariants'][_0x330aa1['weaponVariant']][_0x4d7c3d(0x4c3)],_0x330aa1[_0x4d7c3d(0x5d9)],0x0,_0x20bf27,_0x330aa1):_0x46632e(_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]],_0x252a23[_0x4d7c3d(0x125)][_0x330aa1[_0x4d7c3d(0x4d3)]][_0x4d7c3d(0x4c3)],_0x330aa1[_0x4d7c3d(0x5d9)],0x0,_0x20bf27),_0x1a5e63['weapons'][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x4a5)]!=undefined&&!_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x4d0)]&&_0x32a44f(_0x330aa1[_0x4d7c3d(0x5d9)],0x0,_0x1a5e63['projectiles'][_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1['weaponIndex']][_0x4d7c3d(0x4a5)]],_0x315ee0));_0x20bf27[_0x4d7c3d(0x3fb)]=_0x252a23[_0x4d7c3d(0xe5)][_0x330aa1['skinColor']],_0x4741da(_0x330aa1[_0x4d7c3d(0x5d9)]*Math[_0x4d7c3d(0x90f)](_0x207157),_0x330aa1[_0x4d7c3d(0x5d9)]*Math[_0x4d7c3d(0x8b9)](_0x207157),0xe),_0x4741da(_0x330aa1['scale']*_0x31324a*Math[_0x4d7c3d(0x90f)](-_0x207157*_0x373327),_0x330aa1[_0x4d7c3d(0x5d9)]*_0x31324a*Math['sin'](-_0x207157*_0x373327),0xe);_0x330aa1['buildIndex']<0x0&&_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x753)]&&(_0x394c9c?_0xacfb07(_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1['weaponIndex']],_0x252a23[_0x4d7c3d(0x125)][_0x330aa1[_0x4d7c3d(0x4d3)]]['src'],_0x330aa1[_0x4d7c3d(0x5d9)],0x0,_0x20bf27,_0x330aa1):_0x46632e(_0x1a5e63[_0x4d7c3d(0x92a)][_0x330aa1[_0x4d7c3d(0x7a4)]],_0x252a23['weaponVariants'][_0x330aa1[_0x4d7c3d(0x4d3)]][_0x4d7c3d(0x4c3)],_0x330aa1[_0x4d7c3d(0x5d9)],0x0,_0x20bf27),_0x1a5e63['weapons'][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x4a5)]!=undefined&&!_0x1a5e63['weapons'][_0x330aa1[_0x4d7c3d(0x7a4)]]['hideProjectile']&&_0x32a44f(_0x330aa1['scale'],0x0,_0x1a5e63[_0x4d7c3d(0x217)][_0x1a5e63['weapons'][_0x330aa1[_0x4d7c3d(0x7a4)]][_0x4d7c3d(0x4a5)]],_0x315ee0));if(_0x330aa1[_0x4d7c3d(0x915)]>=0x0){var _0x4717b7=_0x3da042(_0x1a5e63[_0x4d7c3d(0x188)][_0x330aa1[_0x4d7c3d(0x915)]],!![]);_0x20bf27[_0x4d7c3d(0x732)](_0x4717b7,_0x330aa1[_0x4d7c3d(0x5d9)]-_0x1a5e63[_0x4d7c3d(0x188)][_0x330aa1[_0x4d7c3d(0x915)]][_0x4d7c3d(0x10a)],-_0x4717b7['width']/0x2);}_0x4741da(0x0,0x0,_0x330aa1[_0x4d7c3d(0x5d9)],_0x20bf27),_0x330aa1[_0x4d7c3d(0x201)]>0x0&&(_0x20bf27[_0x4d7c3d(0x8e8)](Math['PI']/0x2),_0x394c9c?_0x22e9f3(_0x330aa1[_0x4d7c3d(0x201)],_0x20bf27,null,_0x330aa1):_0x1099ed(_0x330aa1['skinIndex'],_0x20bf27,null,_0x330aa1));}var _0x49664a={},_0x15cafe={},_0x44b3a3;function _0x1099ed(_0x4b4433,_0x5530d0,_0x5f5566,_0x4d43dc){var _0x275ca2=_0x4c4069;_0x44b3a3=_0x49664a[_0x4b4433];if(!_0x44b3a3){var _0xe74093=new Image();_0xe74093['onload']=function(){var _0x1f338a=_0x2943;this[_0x1f338a(0x622)]=!![],this[_0x1f338a(0x66f)]=null;},_0xe74093[_0x275ca2(0x4c3)]='.././img/hats/hat_'+_0x4b4433+_0x275ca2(0x853),_0x49664a[_0x4b4433]=_0xe74093,_0x44b3a3=_0xe74093;}var _0x6b37c2=_0x5f5566||_0x15cafe[_0x4b4433];if(!_0x6b37c2){for(var _0x589d5d=0x0;_0x589d5d<_0xff75ba[_0x275ca2(0x404)];++_0x589d5d){if(_0xff75ba[_0x589d5d]['id']==_0x4b4433){_0x6b37c2=_0xff75ba[_0x589d5d];break;}}_0x15cafe[_0x4b4433]=_0x6b37c2;}if(_0x44b3a3[_0x275ca2(0x622)])_0x5530d0['drawImage'](_0x44b3a3,-_0x6b37c2[_0x275ca2(0x5d9)]/0x2,-_0x6b37c2[_0x275ca2(0x5d9)]/0x2,_0x6b37c2[_0x275ca2(0x5d9)],_0x6b37c2[_0x275ca2(0x5d9)]);!_0x5f5566&&_0x6b37c2[_0x275ca2(0x525)]&&(_0x5530d0['save'](),_0x5530d0[_0x275ca2(0x8e8)](_0x4d43dc[_0x275ca2(0x8a1)]),_0x1099ed(_0x4b4433+_0x275ca2(0x4be),_0x5530d0,_0x6b37c2,_0x4d43dc),_0x5530d0[_0x275ca2(0x3d4)]());}var _0x3f04ed={},_0x5a2722={},_0x41de0e;function _0x22e9f3(_0x18011a,_0x228762,_0x4376,_0x481e9f){var _0x5deaa3=_0x4c4069;_0x41de0e=_0x3f04ed[_0x18011a];if(!_0x41de0e){var _0x56090c=new Image();_0x56090c[_0x5deaa3(0x66f)]=function(){var _0xf8e5da=_0x5deaa3;this[_0xf8e5da(0x622)]=!![],this['onload']=null;},_0x56090c[_0x5deaa3(0x4c3)]=_0x5deaa3(0x5ea),_0x3f04ed[_0x18011a]=_0x56090c,_0x41de0e=_0x56090c;}var _0x3b2f75=_0x4376||_0x5a2722[_0x18011a];if(!_0x3b2f75){for(var _0x3abcac=0x0;_0x3abcac<_0xff75ba['length'];++_0x3abcac){if(_0xff75ba[_0x3abcac]['id']==_0x18011a){_0x3b2f75=_0xff75ba[_0x3abcac];break;}}_0x5a2722[_0x18011a]=_0x3b2f75;}if(_0x41de0e[_0x5deaa3(0x622)])_0x228762[_0x5deaa3(0x732)](_0x41de0e,-_0x3b2f75[_0x5deaa3(0x5d9)]/0x2,-_0x3b2f75[_0x5deaa3(0x5d9)]/0x2,_0x3b2f75[_0x5deaa3(0x5d9)],_0x3b2f75['scale']);!_0x4376&&_0x3b2f75[_0x5deaa3(0x525)]&&(_0x228762[_0x5deaa3(0x59c)](),_0x228762[_0x5deaa3(0x8e8)](_0x481e9f[_0x5deaa3(0x8a1)]),_0x22e9f3(_0x18011a+_0x5deaa3(0x4be),_0x228762,_0x3b2f75,_0x481e9f),_0x228762[_0x5deaa3(0x3d4)]());}var _0x53d26a={},_0x2c4c57={};function _0xefbd33(_0x515e33,_0x31e77e,_0x51324f){var _0x508539=_0x4c4069;_0x44b3a3=_0x53d26a[_0x515e33];if(!_0x44b3a3){var _0x12f643=new Image();_0x12f643['onload']=function(){var _0x125171=_0x2943;this[_0x125171(0x622)]=!![],this[_0x125171(0x66f)]=null;},_0x12f643[_0x508539(0x4c3)]=_0x508539(0x7c3)+_0x515e33+'.png',_0x53d26a[_0x515e33]=_0x12f643,_0x44b3a3=_0x12f643;}var _0x5a112f=_0x2c4c57[_0x515e33];if(!_0x5a112f){for(var _0x15c9d8=0x0;_0x15c9d8<_0x507a1f['length'];++_0x15c9d8){if(_0x507a1f[_0x15c9d8]['id']==_0x515e33){_0x5a112f=_0x507a1f[_0x15c9d8];break;}}_0x2c4c57[_0x515e33]=_0x5a112f;}if(_0x44b3a3['isLoaded']){_0x31e77e['save'](),_0x31e77e['translate'](-0x14-(_0x5a112f[_0x508539(0x151)]||0x0),0x0);if(_0x5a112f[_0x508539(0x6e9)])_0x31e77e[_0x508539(0x8e8)](_0x51324f[_0x508539(0x8a1)]);_0x31e77e[_0x508539(0x732)](_0x44b3a3,-(_0x5a112f[_0x508539(0x5d9)]/0x2),-(_0x5a112f['scale']/0x2),_0x5a112f[_0x508539(0x5d9)],_0x5a112f[_0x508539(0x5d9)]),_0x31e77e['restore']();}}var _0x66334d={},_0x4fdd0c={};function _0x1a359f(_0x5e06e4,_0x2ddab9,_0x91ae3){var _0x3a63a2=_0x4c4069;_0x44b3a3=_0x66334d[_0x5e06e4];if(!_0x44b3a3){var _0xa284a8=new Image();_0xa284a8[_0x3a63a2(0x66f)]=function(){var _0x4784d3=_0x3a63a2;this[_0x4784d3(0x622)]=!![],this[_0x4784d3(0x66f)]=null;},_0xa284a8[_0x3a63a2(0x4c3)]=_0x3a63a2(0x7c3)+_0x5e06e4+_0x3a63a2(0x853),_0x66334d[_0x5e06e4]=_0xa284a8,_0x44b3a3=_0xa284a8;}var _0x302e21=_0x4fdd0c[_0x5e06e4];if(!_0x302e21){for(var _0x8bcb71=0x0;_0x8bcb71<_0x507a1f[_0x3a63a2(0x404)];++_0x8bcb71){if(_0x507a1f[_0x8bcb71]['id']==_0x5e06e4){_0x302e21=_0x507a1f[_0x8bcb71];break;}}_0x4fdd0c[_0x5e06e4]=_0x302e21;}if(_0x44b3a3[_0x3a63a2(0x622)]){_0x2ddab9[_0x3a63a2(0x59c)](),_0x2ddab9[_0x3a63a2(0x475)](-0x14-(_0x302e21[_0x3a63a2(0x151)]||0x0),0x0);if(_0x302e21['spin'])_0x2ddab9['rotate'](_0x91ae3[_0x3a63a2(0x8a1)]);_0x2ddab9['drawImage'](_0x44b3a3,-(_0x302e21[_0x3a63a2(0x5d9)]/0x2),-(_0x302e21['scale']/0x2),_0x302e21[_0x3a63a2(0x5d9)],_0x302e21['scale']),_0x2ddab9[_0x3a63a2(0x3d4)]();}}var _0x4bff39={};function _0x46632e(_0x3b6808,_0x370c22,_0x34b6cf,_0x56f88a,_0x4b9c56){var _0x43505e=_0x4c4069,_0x466562=_0x3b6808[_0x43505e(0x4c3)]+(_0x370c22||''),_0x4edb19=_0x4bff39[_0x466562];!_0x4edb19&&(_0x4edb19=new Image(),_0x4edb19[_0x43505e(0x66f)]=function(){var _0x33b88a=_0x43505e;this[_0x33b88a(0x622)]=!![];},_0x4edb19[_0x43505e(0x4c3)]='.././img/weapons/'+_0x466562+_0x43505e(0x853),_0x4bff39[_0x466562]=_0x4edb19);if(_0x4edb19[_0x43505e(0x622)])_0x4b9c56[_0x43505e(0x732)](_0x4edb19,_0x34b6cf+_0x3b6808[_0x43505e(0x151)]-_0x3b6808[_0x43505e(0x404)]/0x2,_0x56f88a+_0x3b6808[_0x43505e(0x590)]-_0x3b6808['width']/0x2,_0x3b6808[_0x43505e(0x404)],_0x3b6808[_0x43505e(0x338)]);}var _0x27ab4a={};function _0x368f77(_0x100b13,_0x3afb94,_0x1d5aa3){var _0x367bd2=_0x4c4069;if(_0x3afb94['weaponVariant']==0x3){if(_0x100b13['id']==0x0)return _0x367bd2(0x3ca);else{if(_0x100b13['id']==0x1)return'https://i.imgur.com/kr8H9g7.png';else{if(_0x100b13['id']==0x2)return'https://i.imgur.com/UZ2HcQw.png';else{if(_0x100b13['id']==0x3)return _0x367bd2(0x4c2);else{if(_0x100b13['id']==0x4)return _0x367bd2(0x1ca);else{if(_0x100b13['id']==0x5)return _0x367bd2(0x484);else{if(_0x100b13['id']==0x6)return _0x367bd2(0x9a9);else{if(_0x100b13['id']==0x7)return _0x367bd2(0x5e7);else{if(_0x100b13['id']==0x8)return _0x367bd2(0x165);else return _0x100b13['id']==0xa?_0x367bd2(0x210):_0x367bd2(0x97f)+_0x1d5aa3+_0x367bd2(0x853);}}}}}}}}}else{if(_0x3afb94[_0x367bd2(0x4d3)]==0x2){if(_0x100b13['id']==0x0)return _0x367bd2(0x794);else{if(_0x100b13['id']==0x1)return _0x367bd2(0x688);else{if(_0x100b13['id']==0x2)return _0x367bd2(0x195);else{if(_0x100b13['id']==0x3)return _0x367bd2(0x220);else{if(_0x100b13['id']==0x4)return _0x367bd2(0x460);else{if(_0x100b13['id']==0x5)return'https://i.imgur.com/HSWcyku.png';else{if(_0x100b13['id']==0x6)return _0x367bd2(0x4ed);else{if(_0x100b13['id']==0x7)return'https://i.imgur.com/ROTb7Ks.png';else{if(_0x100b13['id']==0x8)return _0x367bd2(0x438);else{if(_0x100b13['id']==0x9)return'https://i.imgur.com/qu7HHT5.png';else{if(_0x100b13['id']==0xa)return _0x367bd2(0x55f);else{if(_0x100b13['id']==0xb)return _0x367bd2(0x4cb);else{if(_0x100b13['id']==0xc)return _0x367bd2(0x820);else return _0x100b13['id']==0xd?_0x367bd2(0x313):_0x367bd2(0x97f)+_0x1d5aa3+_0x367bd2(0x853);}}}}}}}}}}}}}else{if(_0x3afb94[_0x367bd2(0x4d3)]==0x1){if(_0x100b13['id']==0x3)return _0x367bd2(0x7c6);else{if(_0x100b13['id']==0x4)return _0x367bd2(0x84b);else{if(_0x100b13['id']==0x5)return _0x367bd2(0x2d5);else{if(_0x100b13['id']==0x6)return _0x367bd2(0x97d);else return _0x100b13['id']==0x8?_0x367bd2(0x57b):_0x367bd2(0x97f)+_0x1d5aa3+_0x367bd2(0x853);}}}}else return'.././img/weapons/'+_0x1d5aa3+_0x367bd2(0x853);}}}function _0xacfb07(_0x5acac0,_0x435394,_0x3aecd6,_0x4dbe97,_0x224010,_0x2017bd){var _0x2ece93=_0x4c4069,_0x3c2616=_0x5acac0[_0x2ece93(0x4c3)]+(_0x435394||''),_0x127950=_0x27ab4a[_0x3c2616];!_0x127950&&(_0x127950=new Image(),_0x127950[_0x2ece93(0x66f)]=function(){var _0x382dee=_0x2ece93;this[_0x382dee(0x622)]=!![];},_0x127950['src']=_0x368f77(_0x5acac0,_0x2017bd,_0x3c2616),_0x27ab4a[_0x3c2616]=_0x127950);if(_0x127950[_0x2ece93(0x622)])_0x224010[_0x2ece93(0x732)](_0x127950,_0x3aecd6+_0x5acac0[_0x2ece93(0x151)]-_0x5acac0[_0x2ece93(0x404)]/0x2,_0x4dbe97+_0x5acac0[_0x2ece93(0x590)]-_0x5acac0[_0x2ece93(0x338)]/0x2,_0x5acac0[_0x2ece93(0x404)],_0x5acac0[_0x2ece93(0x338)]);}var _0xe5737c={};function _0x1d00bb(_0x171a7b){var _0x54d348=_0x4c4069,_0x3f9335=_0x171a7b['y']>=_0x252a23[_0x54d348(0x141)]-_0x252a23[_0x54d348(0x834)]?0x2:_0x171a7b['y']<=_0x252a23['snowBiomeTop']?0x1:0x0,_0x1f24a7=_0x171a7b['type']+'_'+_0x171a7b[_0x54d348(0x5d9)]+'_'+_0x3f9335,_0x3be4be=_0xe5737c[_0x1f24a7];if(!_0x3be4be){var _0x54922d=document[_0x54d348(0x9a5)](_0x54d348(0x3da));_0x54922d['width']=_0x54922d['height']=_0x171a7b[_0x54d348(0x5d9)]*2.1+_0x224ee7;var _0x9be1fc=_0x54922d[_0x54d348(0x26e)]('2d');_0x9be1fc[_0x54d348(0x475)](_0x54922d['width']/0x2,_0x54922d[_0x54d348(0x646)]/0x2),_0x9be1fc['rotate'](_0x4271e0[_0x54d348(0x967)](0x0,Math['PI'])),_0x9be1fc[_0x54d348(0x71e)]=_0x1a973e,_0x9be1fc[_0x54d348(0x713)]=_0x224ee7;if(_0x171a7b['type']==0x0){var _0x4eb9f0;for(var _0x19196c=0x0;_0x19196c<0x2;++_0x19196c){_0x4eb9f0=_0x3abbd0['scale']*(!_0x19196c?0x1:0.5),_0x5c3d42(_0x9be1fc,0x7,_0x4eb9f0,_0x4eb9f0*0.7),_0x9be1fc[_0x54d348(0x3fb)]=!_0x3f9335?!_0x19196c?'#9ebf57':'#b4db62':!_0x19196c?_0x54d348(0x4b9):_0x54d348(0xe6),_0x9be1fc[_0x54d348(0x749)]();if(!_0x19196c)_0x9be1fc[_0x54d348(0x631)]();}}else{if(_0x171a7b[_0x54d348(0x669)]==0x1){if(_0x3f9335==0x2)_0x9be1fc[_0x54d348(0x3fb)]='#606060',_0x5c3d42(_0x9be1fc,0x6,_0x171a7b[_0x54d348(0x5d9)]*0.3,_0x171a7b[_0x54d348(0x5d9)]*0.71),_0x9be1fc[_0x54d348(0x749)](),_0x9be1fc['stroke'](),_0x9be1fc[_0x54d348(0x3fb)]='#89a54c',_0x4741da(0x0,0x0,_0x171a7b[_0x54d348(0x5d9)]*0.55,_0x9be1fc),_0x9be1fc[_0x54d348(0x3fb)]=_0x54d348(0x181),_0x4741da(0x0,0x0,_0x171a7b['scale']*0.3,_0x9be1fc,!![]);else{_0xe7cd6(_0x9be1fc,0x6,_0x3abbd0[_0x54d348(0x5d9)],_0x3abbd0[_0x54d348(0x5d9)]*0.7),_0x9be1fc[_0x54d348(0x3fb)]=_0x3f9335?_0x54d348(0x4b9):_0x54d348(0x774),_0x9be1fc[_0x54d348(0x749)](),_0x9be1fc[_0x54d348(0x631)](),_0x9be1fc['fillStyle']=_0x3f9335?_0x54d348(0x43f):_0x54d348(0x8c8);var _0x4fec65,_0x468e3e=0x4,_0x2f921c=_0x2e6311/_0x468e3e;for(var _0x19196c=0x0;_0x19196c<_0x468e3e;++_0x19196c){_0x4fec65=_0x4271e0['randInt'](_0x3abbd0[_0x54d348(0x5d9)]/3.5,_0x3abbd0[_0x54d348(0x5d9)]/2.3),_0x4741da(_0x4fec65*Math[_0x54d348(0x90f)](_0x2f921c*_0x19196c),_0x4fec65*Math[_0x54d348(0x8b9)](_0x2f921c*_0x19196c),_0x4271e0[_0x54d348(0x1af)](0xa,0xc),_0x9be1fc);}}}else(_0x171a7b[_0x54d348(0x669)]==0x2||_0x171a7b[_0x54d348(0x669)]==0x3)&&(_0x9be1fc[_0x54d348(0x3fb)]=_0x171a7b[_0x54d348(0x669)]==0x2?_0x3f9335==0x2?_0x54d348(0x844):_0x54d348(0x790):_0x54d348(0x67a),_0x5c3d42(_0x9be1fc,0x3,_0x171a7b[_0x54d348(0x5d9)],_0x171a7b[_0x54d348(0x5d9)]),_0x9be1fc[_0x54d348(0x749)](),_0x9be1fc[_0x54d348(0x631)](),_0x9be1fc['fillStyle']=_0x171a7b['type']==0x2?_0x3f9335==0x2?_0x54d348(0x7b7):'#bcbcbc':_0x54d348(0x798),_0x5c3d42(_0x9be1fc,0x3,_0x171a7b[_0x54d348(0x5d9)]*0.55,_0x171a7b['scale']*0.65),_0x9be1fc[_0x54d348(0x749)]());}_0x3be4be=_0x54922d,_0xe5737c[_0x1f24a7]=_0x3be4be;}return _0x3be4be;}var _0x504150=[];function _0x1b58d1(_0x1415a1,_0x49292c){var _0x371051=_0x4c4069,_0x2e276f=_0x504150[_0x1415a1['id']];if(!_0x2e276f||_0x49292c){var _0x2ea790=document[_0x371051(0x9a5)](_0x371051(0x3da));_0x2ea790['width']=_0x2ea790[_0x371051(0x646)]=_0x1415a1[_0x371051(0x5d9)]*2.5+_0x224ee7+(_0x1a5e63['list'][_0x1415a1['id']]['spritePadding']||0x0);var _0x267e85=_0x2ea790[_0x371051(0x26e)]('2d');_0x267e85['translate'](_0x2ea790[_0x371051(0x338)]/0x2,_0x2ea790[_0x371051(0x646)]/0x2),_0x267e85[_0x371051(0x8e8)](_0x49292c?0x0:Math['PI']/0x2),_0x267e85[_0x371051(0x71e)]=_0x1a973e,_0x267e85[_0x371051(0x713)]=_0x224ee7*(_0x49292c?_0x2ea790[_0x371051(0x338)]/0x51:0x1);if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x841)){_0x267e85[_0x371051(0x3fb)]=_0x371051(0x8c8),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x774);var _0x37d4cd=-(Math['PI']/0x2);_0x2cc153(_0x1415a1[_0x371051(0x5d9)]*Math['cos'](_0x37d4cd),_0x1415a1[_0x371051(0x5d9)]*Math[_0x371051(0x8b9)](_0x37d4cd),0x19,_0x37d4cd+Math['PI']/0x2,_0x267e85);}else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x530)){_0x267e85[_0x371051(0x3fb)]=_0x371051(0x1f6),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x18c);var _0xf7af3b=0x4,_0x467ccb=_0x2e6311/_0xf7af3b,_0x332c40;for(var _0x550154=0x0;_0x550154<_0xf7af3b;++_0x550154){_0x332c40=_0x4271e0[_0x371051(0x1af)](_0x1415a1['scale']/2.5,_0x1415a1[_0x371051(0x5d9)]/1.7),_0x4741da(_0x332c40*Math['cos'](_0x467ccb*_0x550154),_0x332c40*Math['sin'](_0x467ccb*_0x550154),_0x4271e0[_0x371051(0x1af)](0x4,0x5),_0x267e85,!![]);}}else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x449)){_0x267e85[_0x371051(0x3fb)]=_0x371051(0x269),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x3fb)]='#c3c28b';var _0xf7af3b=0x4,_0x467ccb=_0x2e6311/_0xf7af3b,_0x332c40;for(var _0x550154=0x0;_0x550154<_0xf7af3b;++_0x550154){_0x332c40=_0x4271e0[_0x371051(0x1af)](_0x1415a1['scale']/2.5,_0x1415a1[_0x371051(0x5d9)]/1.7),_0x4741da(_0x332c40*Math[_0x371051(0x90f)](_0x467ccb*_0x550154),_0x332c40*Math['sin'](_0x467ccb*_0x550154),_0x4271e0[_0x371051(0x1af)](0x4,0x5),_0x267e85,!![]);}}else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x845)||_0x1415a1['name']==_0x371051(0x2c9)||_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x7ff)){_0x267e85['fillStyle']=_0x1415a1['name']==_0x371051(0x7ff)?'#83898e':_0x1415a1[_0x371051(0x2f1)]=='wood\x20wall'?_0x371051(0x249):_0x371051(0x790);var _0x23d6e8=_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x7ff)?0x4:0x3;_0x5c3d42(_0x267e85,_0x23d6e8,_0x1415a1['scale']*1.1,_0x1415a1[_0x371051(0x5d9)]*1.1),_0x267e85['fill'](),_0x267e85[_0x371051(0x631)](),_0x267e85['fillStyle']=_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x7ff)?_0x371051(0x174):_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x845)?_0x371051(0x5ef):_0x371051(0x520),_0x5c3d42(_0x267e85,_0x23d6e8,_0x1415a1[_0x371051(0x5d9)]*0.65,_0x1415a1[_0x371051(0x5d9)]*0.65),_0x267e85[_0x371051(0x749)]();}else{if(_0x1415a1[_0x371051(0x2f1)]=='spikes'||_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x8f0)||_0x1415a1['name']==_0x371051(0x962)||_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x8eb)){_0x267e85['fillStyle']=_0x1415a1['name']==_0x371051(0x962)?_0x371051(0x76f):_0x371051(0x790);var _0x53d41e=_0x1415a1['scale']*0.6;_0x5c3d42(_0x267e85,_0x1415a1[_0x371051(0x2f1)]=='spikes'?0x5:0x6,_0x1415a1[_0x371051(0x5d9)],_0x53d41e),_0x267e85['fill'](),_0x267e85['stroke'](),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x249),_0x4741da(0x0,0x0,_0x53d41e,_0x267e85),_0x267e85[_0x371051(0x3fb)]='#c9b758',_0x4741da(0x0,0x0,_0x53d41e/0x2,_0x267e85,!![]);}else{if(_0x1415a1['name']=='windmill'||_0x1415a1['name']==_0x371051(0x517)||_0x1415a1[_0x371051(0x2f1)]=='power\x20mill')_0x267e85['fillStyle']=_0x371051(0x249),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x5ef),_0x3eea25(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*1.5,0x1d,0x4,_0x267e85),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x249),_0x4741da(0x0,0x0,_0x1415a1['scale']*0.5,_0x267e85);else{if(_0x1415a1[_0x371051(0x2f1)]=='mine')_0x267e85[_0x371051(0x3fb)]='#939393',_0x5c3d42(_0x267e85,0x3,_0x1415a1[_0x371051(0x5d9)],_0x1415a1['scale']),_0x267e85[_0x371051(0x749)](),_0x267e85['stroke'](),_0x267e85['fillStyle']=_0x371051(0x520),_0x5c3d42(_0x267e85,0x3,_0x1415a1['scale']*0.55,_0x1415a1['scale']*0.65),_0x267e85['fill']();else{if(_0x1415a1[_0x371051(0x2f1)]=='sapling')for(var _0x550154=0x0;_0x550154<0x2;++_0x550154){var _0x53d41e=_0x1415a1[_0x371051(0x5d9)]*(!_0x550154?0x1:0.5);_0x5c3d42(_0x267e85,0x7,_0x53d41e,_0x53d41e*0.7),_0x267e85[_0x371051(0x3fb)]=!_0x550154?_0x371051(0x412):_0x371051(0x96e),_0x267e85[_0x371051(0x749)]();if(!_0x550154)_0x267e85[_0x371051(0x631)]();}else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x57e))_0x267e85[_0x371051(0x3fb)]=_0x371051(0x249),_0x5c3d42(_0x267e85,0x3,_0x1415a1[_0x371051(0x5d9)]*1.1,_0x1415a1['scale']*1.1),_0x267e85['fill'](),_0x267e85['stroke'](),_0x267e85['fillStyle']=_0x1a973e,_0x5c3d42(_0x267e85,0x3,_0x1415a1[_0x371051(0x5d9)]*0.65,_0x1415a1[_0x371051(0x5d9)]*0.65),_0x267e85[_0x371051(0x749)]();else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x66b))_0x267e85[_0x371051(0x3fb)]=_0x371051(0x53f),_0x3d3e35(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*0x2,_0x1415a1[_0x371051(0x5d9)]*0x2,_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)](),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x76a),_0x2e0b81(_0x1415a1['scale']*0x1,_0x267e85);else{if(_0x1415a1[_0x371051(0x2f1)]==_0x371051(0x281)){_0x267e85['fillStyle']=_0x371051(0x249),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)](),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x790);var _0x166424=0x32;_0x3d3e35(0x0,-_0x166424/0x2,_0x1415a1[_0x371051(0x5d9)]*0.9,_0x166424,_0x267e85),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*0.6,_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)]();}else{if(_0x1415a1[_0x371051(0x2f1)]=='platform'){_0x267e85['fillStyle']='#cebd5f';var _0x1fa56d=0x4,_0x58e202=_0x1415a1[_0x371051(0x5d9)]*0x2,_0x337521=_0x58e202/_0x1fa56d,_0x413ce1=-(_0x1415a1[_0x371051(0x5d9)]/0x2);for(var _0x550154=0x0;_0x550154<_0x1fa56d;++_0x550154){_0x3d3e35(_0x413ce1-_0x337521/0x2,0x0,_0x337521,_0x1415a1['scale']*0x2,_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)](),_0x413ce1+=_0x58e202/_0x1fa56d;}}else{if(_0x1415a1[_0x371051(0x2f1)]=='healing\x20pad')_0x267e85[_0x371051(0x3fb)]='#7e7f82',_0x3d3e35(0x0,0x0,_0x1415a1['scale']*0x2,_0x1415a1['scale']*0x2,_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)](),_0x267e85[_0x371051(0x3fb)]='#db6e6e',_0x3eea25(0x0,0x0,_0x1415a1['scale']*0.65,0x14,0x4,_0x267e85,!![]);else{if(_0x1415a1[_0x371051(0x2f1)]=='spawn\x20pad')_0x267e85[_0x371051(0x3fb)]='#7e7f82',_0x3d3e35(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*0x2,_0x1415a1[_0x371051(0x5d9)]*0x2,_0x267e85),_0x267e85['fill'](),_0x267e85['stroke'](),_0x267e85[_0x371051(0x3fb)]='#71aad6',_0x4741da(0x0,0x0,_0x1415a1['scale']*0.6,_0x267e85);else{if(_0x1415a1['name']==_0x371051(0x81b))_0x267e85[_0x371051(0x3fb)]=_0x371051(0x53f),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85[_0x371051(0x631)](),_0x267e85['rotate'](Math['PI']/0x4),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x757),_0x3eea25(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*0.65,0x14,0x4,_0x267e85,!![]);else _0x1415a1['name']==_0x371051(0x922)&&(_0x267e85[_0x371051(0x3fb)]=_0x371051(0x53f),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)],_0x267e85),_0x267e85[_0x371051(0x749)](),_0x267e85['stroke'](),_0x267e85[_0x371051(0x8e8)](Math['PI']/0x4),_0x267e85[_0x371051(0x3fb)]=_0x371051(0x16c),_0x4741da(0x0,0x0,_0x1415a1[_0x371051(0x5d9)]*0.5,_0x267e85,!![]));}}}}}}}}}}}}}}_0x2e276f=_0x2ea790;if(!_0x49292c)_0x504150[_0x1415a1['id']]=_0x2e276f;}return _0x2e276f;}var _0x1e289f=[];function _0x3da042(_0x4a3dac,_0x53c9ab){var _0x27e35f=_0x4c4069,_0x36c9b8=_0x1e289f[_0x4a3dac['id']+(!_0x53c9ab&&_0x3522e5&&_0x3522e5[_0x27e35f(0x204)]!=_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)]&&!_0xce790d(_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)])&&modVisual?0x32:0x0)];if(!_0x36c9b8){var _0x46fabb=document[_0x27e35f(0x9a5)]('canvas');_0x46fabb[_0x27e35f(0x338)]=_0x46fabb[_0x27e35f(0x646)]=_0x4a3dac[_0x27e35f(0x5d9)]*2.5+_0x224ee7+(_0x1a5e63[_0x27e35f(0x188)][_0x4a3dac['id']][_0x27e35f(0x54a)]||0x0);var _0x31864e=_0x46fabb[_0x27e35f(0x26e)]('2d');_0x31864e[_0x27e35f(0x475)](_0x46fabb['width']/0x2,_0x46fabb[_0x27e35f(0x646)]/0x2),_0x31864e[_0x27e35f(0x8e8)](Math['PI']/0x2),_0x31864e[_0x27e35f(0x71e)]=_0x1a973e,_0x31864e['lineWidth']=_0x224ee7;if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x841)){_0x31864e['fillStyle']=_0x27e35f(0x8c8),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)],_0x31864e),_0x31864e['fillStyle']=_0x27e35f(0x774);var _0x4e597e=-(Math['PI']/0x2);_0x2cc153(_0x4a3dac['scale']*Math[_0x27e35f(0x90f)](_0x4e597e),_0x4a3dac[_0x27e35f(0x5d9)]*Math['sin'](_0x4e597e),0x19,_0x4e597e+Math['PI']/0x2,_0x31864e);}else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='cookie'){_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x1f6),_0x4741da(0x0,0x0,_0x4a3dac['scale'],_0x31864e),_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x18c);var _0x1f3b30=0x4,_0x3ebb40=_0x2e6311/_0x1f3b30,_0x307b0c;for(var _0x5bee53=0x0;_0x5bee53<_0x1f3b30;++_0x5bee53){_0x307b0c=_0x4271e0[_0x27e35f(0x1af)](_0x4a3dac[_0x27e35f(0x5d9)]/2.5,_0x4a3dac['scale']/1.7),_0x4741da(_0x307b0c*Math[_0x27e35f(0x90f)](_0x3ebb40*_0x5bee53),_0x307b0c*Math[_0x27e35f(0x8b9)](_0x3ebb40*_0x5bee53),_0x4271e0['randInt'](0x4,0x5),_0x31864e,!![]);}}else{if(_0x4a3dac['name']==_0x27e35f(0x449)){_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x269),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)],_0x31864e),_0x31864e[_0x27e35f(0x3fb)]='#c3c28b';var _0x1f3b30=0x4,_0x3ebb40=_0x2e6311/_0x1f3b30,_0x307b0c;for(var _0x5bee53=0x0;_0x5bee53<_0x1f3b30;++_0x5bee53){_0x307b0c=_0x4271e0['randInt'](_0x4a3dac['scale']/2.5,_0x4a3dac[_0x27e35f(0x5d9)]/1.7),_0x4741da(_0x307b0c*Math[_0x27e35f(0x90f)](_0x3ebb40*_0x5bee53),_0x307b0c*Math[_0x27e35f(0x8b9)](_0x3ebb40*_0x5bee53),_0x4271e0['randInt'](0x4,0x5),_0x31864e,!![]);}}else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='wood\x20wall'||_0x4a3dac['name']==_0x27e35f(0x2c9)||_0x4a3dac[_0x27e35f(0x2f1)]=='castle\x20wall'){_0x31864e[_0x27e35f(0x3fb)]=_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x7ff)?_0x27e35f(0x104):_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x845)?_0x27e35f(0x249):'#939393';var _0x2f8dfc=_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x7ff)?0x4:0x3;_0x5c3d42(_0x31864e,_0x2f8dfc,_0x4a3dac[_0x27e35f(0x5d9)]*1.1,_0x4a3dac[_0x27e35f(0x5d9)]*1.1),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x31864e['fillStyle']=_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x7ff)?_0x27e35f(0x174):_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x845)?_0x27e35f(0x5ef):_0x27e35f(0x520),_0x5c3d42(_0x31864e,_0x2f8dfc,_0x4a3dac[_0x27e35f(0x5d9)]*0.65,_0x4a3dac['scale']*0.65),_0x31864e[_0x27e35f(0x749)]();}else{if(_0x4a3dac['name']=='spikes'||_0x4a3dac[_0x27e35f(0x2f1)]=='greater\x20spikes'||_0x4a3dac['name']=='poison\x20spikes'||_0x4a3dac['name']==_0x27e35f(0x8eb)){_0x31864e['fillStyle']=_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x962)?_0x27e35f(0x76f):'#939393';var _0x333286=_0x4a3dac['scale']*0.6;_0x5c3d42(_0x31864e,_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x2a9)?0x5:0x6,_0x4a3dac[_0x27e35f(0x5d9)],_0x333286),_0x31864e[_0x27e35f(0x749)](),_0x31864e['stroke'](),_0x31864e[_0x27e35f(0x3fb)]='#a5974c',_0x4741da(0x0,0x0,_0x333286,_0x31864e),!_0x53c9ab&&_0x3522e5&&_0x3522e5[_0x27e35f(0x204)]!=_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)]&&!_0xce790d(_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)])&&modVisual?_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x2b3):_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x5ef),_0x4741da(0x0,0x0,_0x333286/0x2,_0x31864e,!![]);}else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='windmill'||_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x517)||_0x4a3dac['name']==_0x27e35f(0x431))_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x249),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)],_0x31864e),_0x31864e[_0x27e35f(0x3fb)]='#c9b758',_0x3eea25(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*1.5,0x1d,0x4,_0x31864e),_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x249),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0.5,_0x31864e);else{if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x4d4))_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x790),_0x5c3d42(_0x31864e,0x3,_0x4a3dac[_0x27e35f(0x5d9)],_0x4a3dac[_0x27e35f(0x5d9)]),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x520),_0x5c3d42(_0x31864e,0x3,_0x4a3dac[_0x27e35f(0x5d9)]*0.55,_0x4a3dac[_0x27e35f(0x5d9)]*0.65),_0x31864e[_0x27e35f(0x749)]();else{if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x982))for(var _0x5bee53=0x0;_0x5bee53<0x2;++_0x5bee53){var _0x333286=_0x4a3dac['scale']*(!_0x5bee53?0x1:0.5);_0x5c3d42(_0x31864e,0x7,_0x333286,_0x333286*0.7),_0x31864e[_0x27e35f(0x3fb)]=!_0x5bee53?_0x27e35f(0x412):_0x27e35f(0x96e),_0x31864e[_0x27e35f(0x749)]();if(!_0x5bee53)_0x31864e[_0x27e35f(0x631)]();}else{if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x57e))_0x31864e['fillStyle']=_0x27e35f(0x249),_0x5c3d42(_0x31864e,0x3,_0x4a3dac[_0x27e35f(0x5d9)]*1.1,_0x4a3dac[_0x27e35f(0x5d9)]*1.1),_0x31864e[_0x27e35f(0x749)](),_0x31864e['stroke'](),!_0x53c9ab&&_0x3522e5&&_0x3522e5[_0x27e35f(0x204)]!=_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)]&&!_0xce790d(_0x4a3dac['owner'][_0x27e35f(0x204)])&&modVisual?_0x31864e['fillStyle']='#780c0c':_0x31864e[_0x27e35f(0x3fb)]=_0x1a973e,_0x5c3d42(_0x31864e,0x3,_0x4a3dac[_0x27e35f(0x5d9)]*0.65,_0x4a3dac['scale']*0.65),_0x31864e['fill']();else{if(_0x4a3dac['name']==_0x27e35f(0x66b))_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x53f),_0x3d3e35(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x76a),_0x2e0b81(_0x4a3dac[_0x27e35f(0x5d9)]*0x1,_0x31864e);else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='turret'){_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x249),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)],_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x31864e['fillStyle']=_0x27e35f(0x790);var _0x11a42a=0x32;_0x3d3e35(0x0,-_0x11a42a/0x2,_0x4a3dac['scale']*0.9,_0x11a42a,_0x31864e),_0x4741da(0x0,0x0,_0x4a3dac['scale']*0.6,_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)]();}else{if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x5d6)){_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x8ad);var _0x9b0709=0x4,_0x3fb177=_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x126075=_0x3fb177/_0x9b0709,_0x5d30f6=-(_0x4a3dac[_0x27e35f(0x5d9)]/0x2);for(var _0x5bee53=0x0;_0x5bee53<_0x9b0709;++_0x5bee53){_0x3d3e35(_0x5d30f6-_0x126075/0x2,0x0,_0x126075,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x5d30f6+=_0x3fb177/_0x9b0709;}}else{if(_0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x717))_0x31864e['fillStyle']=_0x27e35f(0x53f),_0x3d3e35(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e[_0x27e35f(0x631)](),_0x31864e[_0x27e35f(0x3fb)]='#db6e6e',_0x3eea25(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0.65,0x14,0x4,_0x31864e,!![]);else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='spawn\x20pad')_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x53f),_0x3d3e35(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x4a3dac[_0x27e35f(0x5d9)]*0x2,_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e['stroke'](),_0x31864e[_0x27e35f(0x3fb)]='#71aad6',_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0.6,_0x31864e);else{if(_0x4a3dac[_0x27e35f(0x2f1)]=='blocker')_0x31864e['fillStyle']=_0x27e35f(0x53f),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)],_0x31864e),_0x31864e['fill'](),_0x31864e['stroke'](),_0x31864e['rotate'](Math['PI']/0x4),_0x31864e[_0x27e35f(0x3fb)]='#db6e6e',_0x3eea25(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0.65,0x14,0x4,_0x31864e,!![]);else _0x4a3dac[_0x27e35f(0x2f1)]==_0x27e35f(0x922)&&(_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x53f),_0x4741da(0x0,0x0,_0x4a3dac['scale'],_0x31864e),_0x31864e[_0x27e35f(0x749)](),_0x31864e['stroke'](),_0x31864e[_0x27e35f(0x8e8)](Math['PI']/0x4),_0x31864e[_0x27e35f(0x3fb)]=_0x27e35f(0x16c),_0x4741da(0x0,0x0,_0x4a3dac[_0x27e35f(0x5d9)]*0.5,_0x31864e,!![]));}}}}}}}}}}}}}}_0x36c9b8=_0x46fabb,_0x1e289f[_0x4a3dac['id']+(!_0x53c9ab&&_0x3522e5&&_0x3522e5['sid']!=_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)]&&!_0xce790d(_0x4a3dac[_0x27e35f(0x1e6)][_0x27e35f(0x204)])&&modVisual?0x32:0x0)]=_0x36c9b8;}return _0x36c9b8;}function _0x2cc153(_0x4c1364,_0x6fa799,_0x253129,_0x2e79fd,_0x50ade7){var _0x3a350c=_0x4c4069,_0x370a1c=_0x4c1364+_0x253129*Math[_0x3a350c(0x90f)](_0x2e79fd),_0x568233=_0x6fa799+_0x253129*Math[_0x3a350c(0x8b9)](_0x2e79fd),_0x53ccc7=_0x253129*0.4;_0x50ade7['moveTo'](_0x4c1364,_0x6fa799),_0x50ade7[_0x3a350c(0x6f8)](),_0x50ade7['quadraticCurveTo']((_0x4c1364+_0x370a1c)/0x2+_0x53ccc7*Math[_0x3a350c(0x90f)](_0x2e79fd+Math['PI']/0x2),(_0x6fa799+_0x568233)/0x2+_0x53ccc7*Math['sin'](_0x2e79fd+Math['PI']/0x2),_0x370a1c,_0x568233),_0x50ade7[_0x3a350c(0x914)]((_0x4c1364+_0x370a1c)/0x2-_0x53ccc7*Math[_0x3a350c(0x90f)](_0x2e79fd+Math['PI']/0x2),(_0x6fa799+_0x568233)/0x2-_0x53ccc7*Math[_0x3a350c(0x8b9)](_0x2e79fd+Math['PI']/0x2),_0x4c1364,_0x6fa799),_0x50ade7['closePath'](),_0x50ade7[_0x3a350c(0x749)](),_0x50ade7[_0x3a350c(0x631)]();}function _0x4741da(_0x2a62a3,_0x80262b,_0x8d33ca,_0x578e65,_0x40bf42,_0x5a9c1a){var _0x371b5e=_0x4c4069;_0x578e65=_0x578e65||_0x315ee0,_0x578e65[_0x371b5e(0x6f8)](),_0x578e65[_0x371b5e(0x25e)](_0x2a62a3,_0x80262b,_0x8d33ca,0x0,0x2*Math['PI']);if(!_0x5a9c1a)_0x578e65[_0x371b5e(0x749)]();if(!_0x40bf42)_0x578e65[_0x371b5e(0x631)]();}function _0x5c3d42(_0x450616,_0x337368,_0x1a27a8,_0x23b786){var _0x27b36b=_0x4c4069,_0x551ef8=Math['PI']/0x2*0x3,_0x22024e,_0x2b942b,_0x2fd3aa=Math['PI']/_0x337368;_0x450616[_0x27b36b(0x6f8)](),_0x450616[_0x27b36b(0x4bc)](0x0,-_0x1a27a8);for(var _0x4bd1e0=0x0;_0x4bd1e0<_0x337368;_0x4bd1e0++){_0x22024e=Math['cos'](_0x551ef8)*_0x1a27a8,_0x2b942b=Math[_0x27b36b(0x8b9)](_0x551ef8)*_0x1a27a8,_0x450616[_0x27b36b(0x604)](_0x22024e,_0x2b942b),_0x551ef8+=_0x2fd3aa,_0x22024e=Math[_0x27b36b(0x90f)](_0x551ef8)*_0x23b786,_0x2b942b=Math['sin'](_0x551ef8)*_0x23b786,_0x450616[_0x27b36b(0x604)](_0x22024e,_0x2b942b),_0x551ef8+=_0x2fd3aa;}_0x450616['lineTo'](0x0,-_0x1a27a8),_0x450616[_0x27b36b(0x9ad)]();}function _0x3d3e35(_0x3daa39,_0x492024,_0x50499d,_0xea1c07,_0x3059aa,_0x154a66){var _0x1418f1=_0x4c4069;_0x3059aa['fillRect'](_0x3daa39-_0x50499d/0x2,_0x492024-_0xea1c07/0x2,_0x50499d,_0xea1c07);if(!_0x154a66)_0x3059aa[_0x1418f1(0x7f5)](_0x3daa39-_0x50499d/0x2,_0x492024-_0xea1c07/0x2,_0x50499d,_0xea1c07);}function _0x3eea25(_0x426286,_0x575f21,_0x138f6c,_0x3c239c,_0x2d9dcb,_0x7caf1c,_0x4bcf0a){var _0x5241fd=_0x4c4069;_0x7caf1c[_0x5241fd(0x59c)](),_0x7caf1c['translate'](_0x426286,_0x575f21),_0x2d9dcb=Math['ceil'](_0x2d9dcb/0x2);for(var _0x318c49=0x0;_0x318c49<_0x2d9dcb;_0x318c49++){_0x3d3e35(0x0,0x0,_0x138f6c*0x2,_0x3c239c,_0x7caf1c,_0x4bcf0a),_0x7caf1c['rotate'](Math['PI']/_0x2d9dcb);}_0x7caf1c[_0x5241fd(0x3d4)]();}function _0xe7cd6(_0x1dba36,_0x3a9ff6,_0x2a7111,_0x341374){var _0x3a4843=_0x4c4069,_0x27c91d=Math['PI']/0x2*0x3,_0x1dae71,_0x37e4ae,_0x39506f=Math['PI']/_0x3a9ff6,_0x3f1f3c;_0x1dba36['beginPath'](),_0x1dba36[_0x3a4843(0x4bc)](0x0,-_0x341374);for(var _0x4717b4=0x0;_0x4717b4<_0x3a9ff6;_0x4717b4++){_0x3f1f3c=_0x4271e0[_0x3a4843(0x1af)](_0x2a7111+0.9,_0x2a7111*1.2),_0x1dba36[_0x3a4843(0x914)](Math[_0x3a4843(0x90f)](_0x27c91d+_0x39506f)*_0x3f1f3c,Math['sin'](_0x27c91d+_0x39506f)*_0x3f1f3c,Math[_0x3a4843(0x90f)](_0x27c91d+_0x39506f*0x2)*_0x341374,Math['sin'](_0x27c91d+_0x39506f*0x2)*_0x341374),_0x27c91d+=_0x39506f*0x2;}_0x1dba36[_0x3a4843(0x604)](0x0,-_0x341374),_0x1dba36[_0x3a4843(0x9ad)]();}function _0x2e0b81(_0x19857c,_0x113863){var _0x4fb906=_0x4c4069;_0x113863=_0x113863||_0x315ee0;var _0x182621=_0x19857c*(Math[_0x4fb906(0x934)](0x3)/0x2);_0x113863[_0x4fb906(0x6f8)](),_0x113863[_0x4fb906(0x4bc)](0x0,-_0x182621/0x2),_0x113863['lineTo'](-_0x19857c/0x2,_0x182621/0x2),_0x113863[_0x4fb906(0x604)](_0x19857c/0x2,_0x182621/0x2),_0x113863['lineTo'](0x0,-_0x182621/0x2),_0x113863[_0x4fb906(0x749)](),_0x113863[_0x4fb906(0x9ad)]();}function _0x5bb2ad(){var _0x196b44=_0x4c4069,_0x1545cd=_0x252a23[_0x196b44(0x141)]/0x2;_0x3d4c29['add'](0x0,_0x1545cd,_0x1545cd+0xc8,0x0,_0x252a23[_0x196b44(0x925)][0x3],0x0),_0x3d4c29[_0x196b44(0x110)](0x1,_0x1545cd,_0x1545cd-0x1e0,0x0,_0x252a23[_0x196b44(0x925)][0x3],0x0),_0x3d4c29[_0x196b44(0x110)](0x2,_0x1545cd+0x12c,_0x1545cd+0x1c2,0x0,_0x252a23['treeScales'][0x3],0x0),_0x3d4c29[_0x196b44(0x110)](0x3,_0x1545cd-0x3b6,_0x1545cd-0x82,0x0,_0x252a23['treeScales'][0x2],0x0),_0x3d4c29[_0x196b44(0x110)](0x4,_0x1545cd-0x2ee,_0x1545cd-0x190,0x0,_0x252a23[_0x196b44(0x925)][0x3],0x0),_0x3d4c29[_0x196b44(0x110)](0x5,_0x1545cd-0x2bc,_0x1545cd+0x190,0x0,_0x252a23[_0x196b44(0x925)][0x2],0x0),_0x3d4c29[_0x196b44(0x110)](0x6,_0x1545cd+0x320,_0x1545cd-0xc8,0x0,_0x252a23[_0x196b44(0x925)][0x3],0x0),_0x3d4c29[_0x196b44(0x110)](0x7,_0x1545cd-0x104,_0x1545cd+0x154,0x0,_0x252a23[_0x196b44(0x70d)][0x3],0x1),_0x3d4c29['add'](0x8,_0x1545cd+0x2f8,_0x1545cd+0x136,0x0,_0x252a23[_0x196b44(0x70d)][0x3],0x1),_0x3d4c29[_0x196b44(0x110)](0x9,_0x1545cd-0x320,_0x1545cd+0x64,0x0,_0x252a23[_0x196b44(0x70d)][0x3],0x1),_0x3d4c29[_0x196b44(0x110)](0xa,_0x1545cd-0x320,_0x1545cd+0x12c,0x0,_0x1a5e63[_0x196b44(0x188)][0x4][_0x196b44(0x5d9)],_0x1a5e63[_0x196b44(0x188)][0x4]['id'],_0x1a5e63['list'][0xa]),_0x3d4c29[_0x196b44(0x110)](0xb,_0x1545cd+0x28a,_0x1545cd-0x186,0x0,_0x1a5e63[_0x196b44(0x188)][0x4]['scale'],_0x1a5e63[_0x196b44(0x188)][0x4]['id'],_0x1a5e63[_0x196b44(0x188)][0xa]),_0x3d4c29[_0x196b44(0x110)](0xc,_0x1545cd-0x190,_0x1545cd-0x1c2,0x0,_0x252a23[_0x196b44(0x5cd)][0x2],0x2);}function _0x26b79c(_0x4ef310){_0x3affe5={'sid':_0x4ef310,'hitCount':0x0},_0x22239e=!![];}function _0x152b6f(_0x57fc63,_0x1111f1){var _0x22f949=_0x4c4069;let _0x1241e9=Math[_0x22f949(0x634)](_0x3522e5['y2']-_0x57fc63,_0x3522e5['x2']-_0x1111f1);_0x2971cc[_0x22f949(0x404)]&&_0xa4351a(_0x2971cc,_0x3522e5)<=0xfa?_0x5e4bb3(0x2,_0x1241e9+Math['PI']):_0x3522e5['items'][0x4]&&_0x5e4bb3(0x4,_0x1241e9+Math['PI']);}function _0x444514(_0x20e94d){var _0x20d242=_0x4c4069;for(var _0x4f8ce6=0x0;_0x4f8ce6<_0x20e94d[_0x20d242(0x404)];){_0x3d4c29['add'](_0x20e94d[_0x4f8ce6],_0x20e94d[_0x4f8ce6+0x1],_0x20e94d[_0x4f8ce6+0x2],_0x20e94d[_0x4f8ce6+0x3],_0x20e94d[_0x4f8ce6+0x4],_0x20e94d[_0x4f8ce6+0x5],_0x1a5e63['list'][_0x20e94d[_0x4f8ce6+0x6]],!![],_0x20e94d[_0x4f8ce6+0x7]>=0x0?{'sid':_0x20e94d[_0x4f8ce6+0x7]}:null),_0x20e94d[_0x4f8ce6+0x6]==0xf&&Math[_0x20d242(0x90e)](_0x3522e5['y2']-_0x20e94d[_0x4f8ce6+0x2],_0x3522e5['x2']-_0x20e94d[_0x4f8ce6+0x1])<=0x55&&_0x20e94d[_0x4f8ce6+0x7]!=_0x3522e5[_0x20d242(0x204)]&&!_0xce790d(_0x20e94d[_0x4f8ce6+0x7])&&(_0x152b6f(_0x20e94d[_0x4f8ce6+0x2],_0x20e94d[_0x4f8ce6+0x1]),_0x26b79c(_0x20e94d[_0x4f8ce6]),_0xcd504(0x6,0x0),_0x48e847(0x0,0x1)),_0x4f8ce6+=0x8;}}function _0x1d1bcf(_0x4da8fa,_0x589813){var _0x569169=_0x4c4069;_0x3abbd0=_0x2624c0(_0x589813),_0x3abbd0&&(_0x3abbd0[_0x569169(0x4f8)]+=_0x252a23['gatherWiggle']*Math[_0x569169(0x90f)](_0x4da8fa),_0x3abbd0[_0x569169(0x8be)]+=_0x252a23[_0x569169(0x4a8)]*Math['sin'](_0x4da8fa));}function _0x3f1eea(_0x347db8,_0x2a749f){var _0x476c69=_0x4c4069;_0x3abbd0=_0x2624c0(_0x347db8),_0x3abbd0&&(_0x3abbd0[_0x476c69(0x8a0)]=_0x2a749f,_0x3abbd0[_0x476c69(0x4f8)]+=_0x252a23[_0x476c69(0x4a8)]*Math['cos'](_0x2a749f+Math['PI']),_0x3abbd0[_0x476c69(0x8be)]+=_0x252a23[_0x476c69(0x4a8)]*Math['sin'](_0x2a749f+Math['PI']));}function _0x47b0be(_0x4bad18,_0x105d1a,_0x54d22a,_0x2e7a1d,_0x399c0f,_0x2a7c94,_0x5c5a96,_0xda8f5a){var _0x53b737=_0x4c4069;_0x363e8f&&(_0x22945a[_0x53b737(0x4af)](_0x4bad18,_0x105d1a,_0x54d22a,_0x2e7a1d,_0x399c0f,_0x2a7c94,null,null,_0x5c5a96)[_0x53b737(0x204)]=_0xda8f5a,_0x5b33fc(_0x4bad18,_0x105d1a,_0x54d22a,_0x2e7a1d,_0x399c0f,_0x2a7c94));}var _0x58c97f={'bullet':0x0,'arrow':0x0},_0x558623=0x0,_0x4ccb0a=![];function _0x5b33fc(_0x98054,_0x348afb,_0x20886f,_0x2e51af,_0x482ba8,_0x5d113f){var _0x592805=_0x4c4069;let _0x32190e=0x1/0x0,_0xd45128=_0x3abbd0,_0x4966ca=_0x5d113f==0x0?0x9:_0x5d113f==0x2?0xc:_0x5d113f==0x3?0xd:_0x5d113f==0x5&&0xf;for(let _0x2265b4=0x0;_0x2265b4<_0x15cbee['length'];_0x2265b4++){_0x3abbd0=_0x15cbee[_0x2265b4],_0x3abbd0[_0x592805(0x65a)]&&_0x1a5e63[_0x592805(0x92a)][_0x4966ca][_0x592805(0x4a5)]!==undefined&&_0x1a5e63['projectiles'][_0x1a5e63[_0x592805(0x92a)][_0x4966ca][_0x592805(0x4a5)]][_0x592805(0x737)]==_0x482ba8&&_0x32190e>(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math[_0x592805(0x90f)](_0x20886f)*0x50)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math[_0x592805(0x8b9)](_0x20886f)*0x50)**0x2&&(_0xd45128=_0x3abbd0,_0x32190e=(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math[_0x592805(0x90f)](_0x20886f)*0x50)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math[_0x592805(0x8b9)](_0x20886f)*0x50)**0x2);}if(Math[_0x592805(0x934)](_0x32190e)>0x3c){if(_0x482ba8==1.5){for(let _0x4d6276=0x0;_0x4d6276<_0x15cbee[_0x592805(0x404)];_0x4d6276++){_0x3abbd0=_0x15cbee[_0x4d6276],_0x3abbd0[_0x592805(0x65a)]&&_0x32190e>(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math['cos'](_0x20886f)*0xa)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math[_0x592805(0x8b9)](_0x20886f)*0xa)**0x2&&(_0xd45128=_0x3abbd0,_0x32190e=(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math[_0x592805(0x90f)](_0x20886f)*0xa)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math[_0x592805(0x8b9)](_0x20886f)*0xa)**0x2);}Math['sqrt'](_0x32190e)<0x3c&&(_0x2a160a(_0xd45128,_0x592805(0x21e)),_0xd45128['tR']=-(0x3e8/_0x252a23['serverUpdateRate'])/0x9c4);}else{for(let _0x5ea02f=0x0;_0x5ea02f<_0x15cbee[_0x592805(0x404)];_0x5ea02f++){_0x3abbd0=_0x15cbee[_0x5ea02f],_0x3abbd0[_0x592805(0x65a)]&&_0x32190e>(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math[_0x592805(0x90f)](_0x20886f)*0x50)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math[_0x592805(0x8b9)](_0x20886f)*0x50)**0x2&&(_0xd45128=_0x3abbd0,_0x32190e=(_0x3abbd0['x2']*1.5-_0x3abbd0['x1']/0x2-_0x98054+Math['cos'](_0x20886f)*0x50)**0x2+(_0x3abbd0['y2']*1.5-_0x3abbd0['y1']/0x2-_0x348afb+Math['sin'](_0x20886f)*0x50)**0x2);}_0x2a160a(_0xd45128,'bullet'),_0xd45128['sR']=-(0x3e8/_0x252a23[_0x592805(0x1fa)])/_0x1a5e63[_0x592805(0x92a)][_0x4966ca][_0x592805(0x737)],_0xd45128[_0x592805(0x258)]=_0x1a5e63[_0x592805(0x92a)][_0x4966ca][_0x592805(0x341)];}}else _0x2a160a(_0xd45128,_0x592805(0x21e)),_0xd45128['sR']=-(0x3e8/_0x252a23[_0x592805(0x1fa)])/_0x1a5e63['weapons'][_0x4966ca][_0x592805(0x737)],_0xd45128[_0x592805(0x258)]=_0x1a5e63[_0x592805(0x92a)][_0x4966ca][_0x592805(0x341)];}function _0x2a160a(_0x17109d,_0x4a44a0){var _0x747b44=_0x4c4069;_0x17109d[_0x747b44(0x204)]!=_0x3522e5[_0x747b44(0x204)]&&!_0xce790d(_0x17109d[_0x747b44(0x204)])&&(_0x58c97f[_0x747b44(0x21e)]++,_0xb10f4c(()=>{var _0x5b602a=_0x747b44;_0x58c97f[_0x5b602a(0x21e)]--;},0x3),_0x2971cc['length']&&(_0x58c97f[_0x747b44(0x21e)]>=0x5&&!_0x4ccb0a&&(_0x4ccb0a=!![],_0xb10f4c(()=>{_0x4ccb0a=![];},0x9),_0x15cbee[_0x747b44(0x404)]>=0x3?_0xa4351a(_0x2971cc,_0x3522e5)<=0x12c?_0x198cad(_0x3522e5,_0x747b44(0x7fe),0xbb8):_0x198cad(_0x3522e5,_0x747b44(0x83e),0xbb8):_0x198cad(_0x3522e5,_0x747b44(0x98c),0xbb8))));}function _0x3ce86a(_0x172624,_0x1580dc){var _0x5357b0=_0x4c4069;for(var _0x9fa46a=0x0;_0x9fa46a<_0x273611[_0x5357b0(0x404)];++_0x9fa46a){_0x273611[_0x9fa46a][_0x5357b0(0x204)]==_0x172624&&(_0x273611[_0x9fa46a]['range']=_0x1580dc);}_0x558623++;}function _0x4eb3ab(_0x57900e){var _0x8c49ff=_0x4c4069;_0x3abbd0=_0x1442b8(_0x57900e);if(_0x3abbd0)_0x3abbd0[_0x8c49ff(0x1c3)]();}function _0x46e008(_0x3748c3){var _0x50d776=_0x4c4069;for(var _0x51501a=0x0;_0x51501a<_0x33d1e5['length'];++_0x51501a){_0x33d1e5[_0x51501a][_0x50d776(0x943)]=!_0x33d1e5[_0x51501a][_0x50d776(0x65a)],_0x33d1e5[_0x51501a][_0x50d776(0x65a)]=![];}if(_0x3748c3){var _0x3842a3=Date[_0x50d776(0x951)]();for(var _0x51501a=0x0;_0x51501a<_0x3748c3[_0x50d776(0x404)];){_0x3abbd0=_0x1442b8(_0x3748c3[_0x51501a]);if(_0x3abbd0)_0x3abbd0[_0x50d776(0x556)]=_0x3748c3[_0x51501a+0x1],_0x3abbd0['t1']=_0x3abbd0['t2']===undefined?_0x3842a3:_0x3abbd0['t2'],_0x3abbd0['t2']=_0x3842a3,_0x3abbd0['x1']=_0x3abbd0['x'],_0x3abbd0['y1']=_0x3abbd0['y'],_0x3abbd0['x2']=_0x3748c3[_0x51501a+0x2],_0x3abbd0['y2']=_0x3748c3[_0x51501a+0x3],_0x3abbd0['d1']=_0x3abbd0['d2']===undefined?_0x3748c3[_0x51501a+0x4]:_0x3abbd0['d2'],_0x3abbd0['d2']=_0x3748c3[_0x51501a+0x4],_0x3abbd0[_0x50d776(0x1d7)]=_0x3748c3[_0x51501a+0x5],_0x3abbd0['dt']=0x0,_0x3abbd0[_0x50d776(0x65a)]=!![];else{_0x3abbd0=_0x926bb8[_0x50d776(0x4f5)](_0x3748c3[_0x51501a+0x2],_0x3748c3[_0x51501a+0x3],_0x3748c3[_0x51501a+0x4],_0x3748c3[_0x51501a+0x1]),_0x3abbd0['x2']=_0x3abbd0['x'],_0x3abbd0['y2']=_0x3abbd0['y'],_0x3abbd0['d2']=_0x3abbd0[_0x50d776(0x8a0)],_0x3abbd0[_0x50d776(0x1d7)]=_0x3748c3[_0x51501a+0x5];if(!_0x926bb8[_0x50d776(0x346)][_0x3748c3[_0x51501a+0x1]][_0x50d776(0x2f1)])_0x3abbd0['name']=_0x252a23['cowNames'][_0x3748c3[_0x51501a+0x6]];_0x3abbd0[_0x50d776(0x943)]=!![],_0x3abbd0[_0x50d776(0x204)]=_0x3748c3[_0x51501a],_0x3abbd0[_0x50d776(0x65a)]=!![];}_0x51501a+=0x7;}}}var _0x3a8c7f={};function _0x4811fd(_0x14f480,_0x5f2d64){var _0x3d7860=_0x4c4069,_0x12c5bd=_0x14f480[_0x3d7860(0x556)],_0x203b40=_0x3a8c7f[_0x12c5bd];if(!_0x203b40){var _0x1d6500=new Image();_0x1d6500[_0x3d7860(0x66f)]=function(){this['isLoaded']=!![],this['onload']=null;},_0x1d6500[_0x3d7860(0x4c3)]=_0x3d7860(0x7dc)+_0x14f480[_0x3d7860(0x4c3)]+'.png',_0x203b40=_0x1d6500,_0x3a8c7f[_0x12c5bd]=_0x203b40;}if(_0x203b40[_0x3d7860(0x622)]){var _0x4407c0=_0x14f480[_0x3d7860(0x5d9)]*1.2*(_0x14f480[_0x3d7860(0x817)]||0x1);_0x5f2d64[_0x3d7860(0x732)](_0x203b40,-_0x4407c0,-_0x4407c0,_0x4407c0*0x2,_0x4407c0*0x2);}}function _0xcfb940(_0x4ced46,_0x42e8c8,_0x563bed){return _0x4ced46+_0x563bed>=0x0&&_0x4ced46-_0x563bed<=_0x361505&&_0x42e8c8+_0x563bed>=0x0&&_0x42e8c8-_0x563bed<=_0x26317f;}var _0x3902f3=0x0,_0x306f57=![],_0x407e2c=![],_0x55702f=![],_0x13cae8=![],_0x2890f3=0x32,_0x58a6f9=0x32,_0x104083={'x2':0x0,'y2':0x0},_0x215018={'x2':0x0,'y2':0x0},_0x3affe5={'sid':void 0x0,'hitCount':0x0},_0x466448=![],_0x494ef1=![],_0x22239e=![],_0x2cb3f8=0x0,_0x3b5514=![],_0x599154=![],_0xc16fb6=![],_0x206a05=![],_0x252e21=![],_0x164e2a=![],_0x3d630e=![],_0x444300=[],_0x2971cc=[],_0x5f5df1=[],_0x5de5e5=[],_0x555091=0x0;const _0x4ceb13=[];var _0x4a5674=0x0,_0x257e84=![],_0x3adf50={'totaldmg':0x0,'canInsta':![],'healCount':0x0,'dobull':![],'nobull':![]},_0x187ca6={'totaldmg':0x0,'canInsta':![],'healCount':0x0},_0x2c24e5=[],_0x563047=[],_0x5b3b1d=[],_0x7da852=[],_0x3f04b2=![],_0x46ce5=![],_0x3ac5ff=![],_0x57c2f2=![],_0x4dbb96=![],_0x14bfb4=!![],_0x5a6faa=![],_0x367bdb=![],_0x3fe04e=![],_0x37bf3a=undefined,_0xc56d1b=![],_0x23f241=undefined;function _0x1589cf(_0x1f462b,_0xde1263){var _0x38441c=_0x4c4069,_0x3920e5=_0x128bce(_0x1f462b[0x0]);!_0x3920e5&&(_0x3920e5=new _0x56ec72(_0x1f462b[0x0],_0x1f462b[0x1],_0x252a23,_0x4271e0,_0x22945a,_0x3d4c29,_0x15cbee,_0x33d1e5,_0x1a5e63,_0xff75ba,_0x507a1f),_0x15cbee[_0x38441c(0x333)](_0x3920e5)),_0x3920e5[_0x38441c(0x4f5)](_0xde1263?_0x24c43d:null),_0x3920e5[_0x38441c(0x65a)]=![],_0x3920e5['x2']=undefined,_0x3920e5['y2']=undefined,_0x3920e5['hitTime2']=0x0,_0x3920e5[_0x38441c(0x7f3)]=0x0,_0x3920e5[_0x38441c(0x23b)]=0x0,_0x3920e5[_0x38441c(0x880)]=0x5,_0x3920e5['pR']=0x1,_0x3920e5['sR']=0x1,_0x3920e5['tR']=0x1,_0x3920e5['pCd']=0x0,_0x3920e5['sCd']=0x0,_0x3920e5[_0x38441c(0x78f)](_0x1f462b),_0xde1263&&(_0x3522e5=_0x3920e5,_0x490b88=_0x3522e5['x'],_0x17514f=_0x3522e5['y'],_0x550713(),_0x3e0240(),_0x19b92a(),_0x4cc213(0x0),_0xc866cc[_0x38441c(0x29c)][_0x38441c(0x196)]='block');}function _0xa5236f(_0x2d7dde,_0x5d9e4d){var _0x5b2443=_0x4c4069;return Math[_0x5b2443(0x90e)](_0x2d7dde['y']-_0x5d9e4d['y'],_0x2d7dde['x']-_0x5d9e4d['x']);}function _0x1631ab(_0x1a9301,_0x174df5){return Math['hypot'](_0x1a9301['y1']-_0x174df5['y1'],_0x1a9301['x1']-_0x174df5['x1']);}function _0xc06ab8(_0x516540,_0x5f2b0e){var _0x28520e=_0x4c4069;return Math[_0x28520e(0x90e)](_0x516540['y2']-_0x5f2b0e['y2'],_0x516540['x2']-_0x5f2b0e['x2']);}function _0xa4351a(_0x135881,_0x2f6cd6){var _0x428b0c=_0x4c4069;return Math[_0x428b0c(0x90e)](_0x135881[0x2]-_0x2f6cd6['y2'],_0x135881[0x1]-_0x2f6cd6['x2']);}function _0x4cc912(_0x1bc999,_0x25139e){var _0x3bfccb=_0x4c4069;return Math[_0x3bfccb(0x634)](_0x1bc999['y']-_0x25139e['y'],_0x1bc999['x']-_0x25139e['x']);}function _0x11ea91(_0x417c23,_0x12da2d){var _0x2a1bfc=_0x4c4069;return Math[_0x2a1bfc(0x634)](_0x417c23['y1']-_0x12da2d['y1'],_0x417c23['x1']-_0x12da2d['x1']);}function _0x5874dd(_0x59679b,_0x34cdbf){return Math['atan2'](_0x59679b['y2']-_0x34cdbf['y2'],_0x59679b['x2']-_0x34cdbf['x2']);}function _0x176462(_0x12ba54,_0x18abef){var _0x4b2f36=_0x4c4069;return Math[_0x4b2f36(0x634)](_0x12ba54[0x2]-_0x18abef['y2'],_0x12ba54[0x1]-_0x18abef['x2']);}function _0x143f20(_0x2fb840){var _0x195ebc=_0x4c4069;for(var _0xe6bf67=0x0;_0xe6bf67<_0x15cbee[_0x195ebc(0x404)];_0xe6bf67++){if(_0x15cbee[_0xe6bf67]['id']==_0x2fb840){_0x15cbee['splice'](_0xe6bf67,0x1);break;}}}function _0x1cb152(_0x1f327a,_0x5b3521){var _0x4e3ce7=_0x4c4069;_0x3522e5&&(_0x3522e5[_0x4e3ce7(0x538)][_0x1f327a]=_0x5b3521);}function _0x33d5da(_0x35e2ea,_0x4203d4,_0x2fd771){if(_0x3522e5){_0x3522e5[_0x35e2ea]=_0x4203d4;if(_0x2fd771)_0x3e0240();}}function _0x41efbd(_0x4e2eb0){var _0x5da7ef=_0x4c4069;if(_0x3522e5['y2']<=_0x252a23[_0x5da7ef(0x834)])_0x4e2eb0(0xf,0x0);else _0x3522e5['y2']>=_0x252a23[_0x5da7ef(0x141)]/0x2-_0x252a23[_0x5da7ef(0x386)]/0x2&&_0x3522e5['y2']<=_0x252a23['mapScale']/0x2+_0x252a23[_0x5da7ef(0x386)]/0x2?_0x4e2eb0(0x1f,0x0):_0x4e2eb0(0xc,0x0);}function _0x468bea(_0x10eba7){var _0x45d4b5=_0x4c4069;let _0x5c7428=_0xf4ede0(_0x2971cc[0x0]);if(_0x10eba7=='1'){if(!_0x22239e&&!_0x407e2c&&!_0x3b5514){if(_0x3522e5[_0x45d4b5(0x23b)]>0x0&&(mooTickCount-_0x4a5674)%_0x252a23[_0x45d4b5(0x1fa)]===0x0||_0x257e84)_0xcd504(0x7,0x0,!![]);else{if(_0xa4351a(_0x2971cc,_0x3522e5)<=0x12c)_0x5c7428['pR']==0x1&&_0x3522e5['pR']<0x1?_0xcd504(0x1a,0x0,!![]):_0xcd504(0x6,0x0,!![]);else{if(_0x56dc5b[_0x45d4b5(0x404)]||_0x59d25e==undefined)_0xcd504(0x16,0x0,!![]);else{if(_0x3522e5['y2']<=_0x252a23[_0x45d4b5(0x834)])_0xcd504(0xf,0x0,!![]);else _0x3522e5['y2']>=_0x252a23[_0x45d4b5(0x141)]/0x2-_0x252a23[_0x45d4b5(0x386)]/0x2&&_0x3522e5['y2']<=_0x252a23[_0x45d4b5(0x141)]/0x2+_0x252a23[_0x45d4b5(0x386)]/0x2?_0xcd504(0x1f,0x0,!![]):_0xcd504(0xc,0x0,!![]);}}}}}}function _0x58a1c7(){_0x56dc5b['length']?_0xcd504(0x16,0x0):_0x494ef1?_0x41efbd(_0xcd504):_0xcd504(0x6,0x0);}function _0x287e2a(_0x4c8864){var _0x2fdafa=_0x4c4069;let _0x25a9d3=_0x4c8864;if(_0x3522e5[_0x2fdafa(0x201)]!=0x2d&&_0x3522e5[_0x2fdafa(0x201)]!=0x38){if(0x0==_0x3522e5['items'][0x0]){if(_0x25a9d3<-0x50)return 0x5;else{if(_0x25a9d3<-0x3c)return 0x4;else{if(_0x25a9d3<-0x28)return 0x3;else return _0x25a9d3<-0x14?0x2:0x1;}}}else{if(0x1==_0x3522e5[_0x2fdafa(0x21f)][0x0]){if(_0x25a9d3<-0x50)return 0x3;else return _0x25a9d3<-0x28?0x2:0x1;}else{if(0x2==_0x3522e5[_0x2fdafa(0x21f)][0x0]){if(_0x25a9d3<-0x5a)return 0x4;else{if(_0x25a9d3<-0x3c)return 0x3;else return _0x25a9d3<-0x1e?0x2:0x1;}}else return 0x4;}}}else return 0x0;}function _0xe19720(_0x4f7053,_0x4d6aeb){var _0x14669a=_0x4c4069;_0x3abbd0=_0xf4ede0(_0x4f7053),_0x3abbd0&&(_0x4c16af(_0x3abbd0,_0x4d6aeb),_0x3abbd0[_0x14669a(0x1d7)]=_0x4d6aeb);}function _0x4c16af(_0x307663,_0x1cad35){var _0x41c0e5=_0x4c4069;let _0x618d7f=_0x1cad35-_0x307663[_0x41c0e5(0x1d7)];if(_0x618d7f>0x0){if(_0x307663['hitTime2']){let _0x2867ac=Date[_0x41c0e5(0x951)]()-_0x307663[_0x41c0e5(0x90d)];_0x307663[_0x41c0e5(0x90d)]=0x0,_0x2867ac<=0x78?(_0x307663[_0x41c0e5(0x23b)]++,_0x307663['shameCount2']>=0x8&&(_0x307663==_0x3522e5?_0x307663[_0x41c0e5(0x23b)]=0x8:_0x307663[_0x41c0e5(0x23b)]=0x0)):(_0x307663[_0x41c0e5(0x23b)]-=0x2,_0x307663['shameCount2']<=0x0&&(_0x307663[_0x41c0e5(0x23b)]=0x0));}}else _0x618d7f<0x0&&(_0x307663[_0x41c0e5(0x90d)]=Date[_0x41c0e5(0x951)](),_0x307663['isHitted']++,_0x307663==_0x3522e5&&(_0x3522e5[_0x41c0e5(0x201)]==0x7&&(_0x618d7f==-0x5||_0x3522e5['tailIndex']==0xd&&_0x618d7f==-0x2)&&(_0x4a5674=mooTickCount,_0x257e84=![]),_0x228a75(_0x618d7f)));}function _0x2edde7(_0x2a5c5e){var _0x1eb2a0=_0x4c4069;return _0x2a5c5e*_0x3522e5[_0x1eb2a0(0x201)]==0x6?1.25:0x1;}function _0x228a75(_0x45eb9c){var _0x36bfd4=_0x4c4069;let _0x72493c=_0xf4ede0(_0x2971cc[0x0]);if(_0x45eb9c<_0x2edde7(_0xa4351a(_0x2971cc,_0x3522e5)<=0xb4&&_0x3522e5[_0x36bfd4(0x201)]!=0x6?-0x9:-0x19)&&_0xa4351a(_0x2971cc,_0x3522e5)<=0x12c&&_0x2971cc['length']&&_0x72493c['pR']==0x1){if(_0x3522e5[_0x36bfd4(0x23b)]<_0x3522e5[_0x36bfd4(0x880)]){_0x3adf50[_0x36bfd4(0xf7)]++;for(let _0x14a4dd=0x0;_0x14a4dd<_0x287e2a(_0x45eb9c);_0x14a4dd++)_0x5e4bb3(0x0);}else _0xb10f4c(()=>{var _0x3b3a68=_0x36bfd4;_0x3adf50[_0x3b3a68(0xf7)]++;for(let _0x1dd0e4=0x0;_0x1dd0e4<_0x287e2a(_0x45eb9c);_0x1dd0e4++)_0x5e4bb3(0x0);},0x2);!_0x164e2a&&!_0x3adf50[_0x36bfd4(0x6d5)]&&!_0x407e2c&&!_0x3b5514&&!_0x22239e&&_0x72493c['sR']==0x1&&_0x45eb9c<=-0x1e&&(_0x164e2a=!![]);}else _0xb10f4c(()=>{_0x3adf50['healCount']++;for(let _0x1c2abe=0x0;_0x1c2abe<_0x287e2a(_0x45eb9c);_0x1c2abe++)_0x5e4bb3(0x0);},0x2);}function _0x3a1dca(_0xe23f91){return _0xe23f91*(Math['PI']/0xb4);}function _0x12ab2b(_0x8d60bf){return _0x8d60bf/(Math['PI']/0xb4);}function _0x5e4bb3(_0x39e235,_0x30db67){var _0x2f86fc=_0x4c4069;_0x256ae0(_0x3522e5[_0x2f86fc(0x21f)][_0x39e235]),_0x15695a[_0x2f86fc(0x1a6)]('c',0x1,_0x30db67),_0x15695a[_0x2f86fc(0x1a6)]('c',0x0,_0x30db67),_0x256ae0(_0x3902f3,!0x0);}function _0x3e4e93(_0x1ec8e3,_0x1f670d){var _0xad8fac=_0x4c4069;_0x1ec8e3=='ok'&&_0xa9fc15(),_0x2971cc[_0xad8fac(0x404)]&&_0x1f670d=='ok'&&_0x1a501c();}function _0xa9fc15(){var _0x5a37b0=_0x4c4069;let _0x79abd8=_0x2971cc[_0x5a37b0(0x404)]?_0x2971cc[0x9]!=0x16&&_0x3522e5[_0x5a37b0(0x5eb)][0x35]&&_0x3522e5['tR']==0x1:_0x3522e5['skins'][0x35]&&_0x3522e5['tR']==0x1?!![]:![],_0x2d649b=_0x3522e5['skins'][0x7]?!![]:![],_0x4e0027=_0x2971cc['length']&&_0x2971cc[0x9]==0x6?!![]:![],_0x470510=_0x563047[_0x3522e5[_0x5a37b0(0x204)]]==0x0?0x1:_0x563047[_0x3522e5[_0x5a37b0(0x204)]]==0x1?1.1:_0x563047[_0x3522e5[_0x5a37b0(0x204)]]>=0x2?1.18:0x1,_0x22d20d=_0x7da852[_0x3522e5[_0x5a37b0(0x204)]]==0x0?0x1:_0x7da852[_0x3522e5[_0x5a37b0(0x204)]]==0x1?1.1:_0x7da852[_0x3522e5[_0x5a37b0(0x204)]]>=0x2?1.18:0x1,_0x38a63f=_0xf4ede0(_0x2971cc[0x0]);if(_0x3522e5['pR']==0x1&&_0x3522e5['sR']==0x1&&_0x3522e5[_0x5a37b0(0x92a)][0x0]!=undefined&&_0x3522e5[_0x5a37b0(0x92a)][0x1]!=undefined)_0x79abd8?_0x2d649b?_0x3adf50[_0x5a37b0(0x5de)]=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x173)]*_0x470510*1.5+(_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5['weapons'][0x1]]['dmg']*_0x22d20d:_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x23c)])+0x19)):_0x3adf50['totaldmg']=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x173)]*_0x470510+(_0x3522e5['weapons'][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5['weapons'][0x1]]['dmg']*_0x22d20d:_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x23c)])+0x19)):_0x2d649b?_0x3adf50['totaldmg']=Math['round']((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5['weapons'][0x0]][_0x5a37b0(0x173)]*_0x470510*1.5+(_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]]['dmg']*_0x22d20d:_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x23c)]))):_0x3adf50['totaldmg']=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5['weapons'][0x0]]['dmg']*_0x470510+(_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x173)]*_0x22d20d:_0x1a5e63['weapons'][_0x3522e5['weapons'][0x1]][_0x5a37b0(0x23c)])));else{if(_0x3522e5['pR']==0x1&&_0x3522e5[_0x5a37b0(0x92a)][0x0]!=undefined)_0x79abd8?_0x2d649b?_0x3adf50[_0x5a37b0(0x5de)]=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x173)]*_0x470510*1.5+0x19)):_0x3adf50[_0x5a37b0(0x5de)]=Math['round']((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x173)]*_0x470510+0x19)):_0x2d649b?_0x3adf50['totaldmg']=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x173)]*_0x470510*1.5)):_0x3adf50[_0x5a37b0(0x5de)]=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*(_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x0]]['dmg']*_0x470510));else _0x3522e5['sR']==0x1&&_0x3522e5[_0x5a37b0(0x92a)][0x1]!=undefined?_0x79abd8?_0x3adf50[_0x5a37b0(0x5de)]=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*((_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x173)]*_0x22d20d:_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]]['Pdmg'])+0x19)):_0x3adf50[_0x5a37b0(0x5de)]=Math['round']((_0x4e0027?0.75:0x1)*(_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa||_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xe?_0x1a5e63['weapons'][_0x3522e5[_0x5a37b0(0x92a)][0x1]][_0x5a37b0(0x173)]*_0x22d20d:_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]]['Pdmg'])):_0x79abd8?_0x3adf50[_0x5a37b0(0x5de)]=Math[_0x5a37b0(0x131)]((_0x4e0027?0.75:0x1)*0x19):_0x3adf50['totaldmg']=0x0;}_0x3adf50['totaldmg']>=0x64&&_0x2971cc['length']&&_0x306f57&&!_0x3d630e&&!_0x407e2c&&!_0x3b5514&&_0xa4351a(_0x2971cc,_0x3522e5)<_0x1a5e63[_0x5a37b0(0x92a)][_0x3522e5[_0x5a37b0(0x92a)][0x1]==0xa?_0x3522e5[_0x5a37b0(0x92a)][0x1]:_0x3522e5[_0x5a37b0(0x92a)][0x0]][_0x5a37b0(0x2dd)]+_0x252a23[_0x5a37b0(0x116)]*0x2&&_0x3522e5['pR']==0x1&&_0x3522e5['sR']==0x1&&_0x3522e5['tR']==0x1&&!_0x5b8722?_0x3adf50[_0x5a37b0(0x6d5)]=!![]:_0x3adf50[_0x5a37b0(0x6d5)]=![];}function _0x1a501c(){var _0xe1e459=_0x4c4069;let _0x23735b=!![],_0x3387d0=_0x2971cc[0x9]==0x7?!![]:![],_0xdd787d=_0x3522e5[_0xe1e459(0x201)]==0x6?!![]:![],_0x96a3e3=_0xf4ede0(_0x2971cc[0x0]);if(_0x96a3e3['pR']==0x1&&_0x96a3e3['sR']==0x1&&_0x2c24e5[_0x2971cc[0x0]]!=undefined&&_0x5b3b1d[_0x2971cc[0x0]]!=undefined)_0x23735b?_0x3387d0?_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*(_0x1a5e63['weapons'][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]*1.5+(_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]]['dmg']:_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)])+0x19)):_0x187ca6[_0xe1e459(0x5de)]=Math['round']((_0xdd787d?0.75:0x1)*(_0x1a5e63[_0xe1e459(0x92a)][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]+(_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]]['dmg']:_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)])+0x19)):_0x3387d0?_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*(_0x1a5e63[_0xe1e459(0x92a)][_0x2c24e5[_0x2971cc[0x0]]]['dmg']*1.5+(_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x173)]:_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)]))):_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*(_0x1a5e63[_0xe1e459(0x92a)][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]+(_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x173)]:_0x1a5e63['weapons'][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)])));else{if(_0x96a3e3['pR']==0x1&&_0x2c24e5[_0x2971cc[0x0]]!=undefined)_0x23735b?_0x3387d0?_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*(_0x1a5e63[_0xe1e459(0x92a)][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]*1.5+0x19)):_0x187ca6[_0xe1e459(0x5de)]=Math['round']((_0xdd787d?0.75:0x1)*(_0x1a5e63[_0xe1e459(0x92a)][_0x2c24e5[_0x2971cc[0x0]]]['dmg']+0x19)):_0x3387d0?_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*(_0x1a5e63['weapons'][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]*1.5)):_0x187ca6[_0xe1e459(0x5de)]=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*_0x1a5e63['weapons'][_0x2c24e5[_0x2971cc[0x0]]][_0xe1e459(0x173)]);else _0x96a3e3['sR']==0x1&&_0x5b3b1d[_0x2971cc[0x0]]!=undefined?_0x23735b?_0x187ca6[_0xe1e459(0x5de)]=Math['round']((_0xdd787d?0.75:0x1)*((_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x173)]:_0x1a5e63['weapons'][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)])+0x19)):_0x187ca6[_0xe1e459(0x5de)]=Math['round']((_0xdd787d?0.75:0x1)*(_0x5b3b1d[_0x2971cc[0x0]]==0xa||_0x5b3b1d[_0x2971cc[0x0]]==0xe?_0x1a5e63['weapons'][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x173)]:_0x1a5e63[_0xe1e459(0x92a)][_0x5b3b1d[_0x2971cc[0x0]]][_0xe1e459(0x23c)])):_0x23735b?_0x187ca6['totaldmg']=Math[_0xe1e459(0x131)]((_0xdd787d?0.75:0x1)*0x19):_0x187ca6['totaldmg']=0x0;}_0x187ca6[_0xe1e459(0x5de)]>=0x64?_0x187ca6[_0xe1e459(0x6d5)]=!![]:_0x187ca6[_0xe1e459(0x6d5)]=![];}window['testTick']=![];var _0x584026=0x45,_0x56dc5b=0x0,_0x480d49=![],_0x5b8722=![];function _0x1f0d36(_0xc15015,_0x497d05){var _0x8d8513=_0x4c4069,_0x21129b=Math[_0x8d8513(0x11d)](_0x497d05-_0xc15015)%(Math['PI']*0x2);return _0x21129b>Math['PI']?Math['PI']*0x2-_0x21129b:_0x21129b;}function _0x203fb2(_0x428d52){var _0x19aa14=_0x4c4069;_0x444300=[],_0x2971cc=[],_0x5f5df1=[],_0x5de5e5=[],_0x555091=0x0,mooTickCount++;var _0x1dfd79=Date[_0x19aa14(0x951)]();for(var _0x578120=0x0;_0x578120<_0x15cbee[_0x19aa14(0x404)];++_0x578120){_0x15cbee[_0x578120][_0x19aa14(0x943)]=!_0x15cbee[_0x578120][_0x19aa14(0x65a)],_0x15cbee[_0x578120]['visible']=![];}for(var _0x578120=0x0;_0x578120<_0x428d52[_0x19aa14(0x404)];){_0x3abbd0=_0xf4ede0(_0x428d52[_0x578120]),_0x3abbd0&&(_0x3abbd0['t1']=_0x3abbd0['t2']===undefined?_0x1dfd79:_0x3abbd0['t2'],_0x3abbd0['t2']=_0x1dfd79,_0x3abbd0['x1']=_0x3abbd0['x'],_0x3abbd0['y1']=_0x3abbd0['y'],_0x3abbd0['x2']=_0x428d52[_0x578120+0x1],_0x3abbd0['y2']=_0x428d52[_0x578120+0x2],_0x3abbd0['d1']=_0x3abbd0['d2']===undefined?_0x428d52[_0x578120+0x3]:_0x3abbd0['d2'],_0x3abbd0['d2']=_0x428d52[_0x578120+0x3],_0x3abbd0['dt']=0x0,_0x3abbd0[_0x19aa14(0x915)]=_0x428d52[_0x578120+0x4],_0x3abbd0[_0x19aa14(0x7a4)]=_0x428d52[_0x578120+0x5],_0x3abbd0[_0x19aa14(0x4d3)]=_0x428d52[_0x578120+0x6],_0x3abbd0['team']=_0x428d52[_0x578120+0x7],_0x3abbd0['isLeader']=_0x428d52[_0x578120+0x8],_0x3abbd0[_0x19aa14(0x201)]=_0x428d52[_0x578120+0x9],_0x3abbd0[_0x19aa14(0x45c)]=_0x428d52[_0x578120+0xa],_0x3abbd0[_0x19aa14(0x96a)]=_0x428d52[_0x578120+0xb],_0x3abbd0[_0x19aa14(0x3f2)]=_0x428d52[_0x578120+0xc],_0x3abbd0[_0x19aa14(0x65a)]=!![],!(_0x3abbd0==_0x3522e5||_0x3abbd0[_0x19aa14(0x2b8)]&&_0x3abbd0[_0x19aa14(0x2b8)]==_0x3522e5[_0x19aa14(0x2b8)])&&_0x444300['push'](_0x428d52['slice'](_0x578120,_0x578120+0xd)),_0x57479f(_0x3abbd0)),_0x578120+=0xd;}if(_0x599d15)_0x5e4bb3(0x0,_0x12f69b());else{if(_0x118cec)_0x5e4bb3(0x4,_0x12f69b());else{if(_0x11466a)_0x5e4bb3(0x2,_0x12f69b());else _0x3853a8&&_0x5e4bb3(0x5,_0x12f69b());}}_0xc6fef7[_0x19aa14(0x404)]>0x0&&(_0x480d49=!![]);_0x444300[_0x19aa14(0x404)]&&(_0x444300=_0x444300['sort']((_0x339339,_0x1374de)=>_0xa4351a(_0x339339,_0x3522e5)-_0xa4351a(_0x1374de,_0x3522e5)),_0x2971cc=_0x444300[0x0]),_0x555091=_0x2971cc['length']?_0x176462(_0x2971cc,_0x3522e5):_0x13a352(),_0xc6fef7[_0x19aa14(0x404)]&&(_0x5f5df1=_0xc6fef7['sort']((_0x3328d2,_0x2473b1)=>_0xa5236f(_0x3328d2,_0x3522e5)-_0xa5236f(_0x2473b1,_0x3522e5)),_0x5de5e5=_0x5f5df1[0x0]),myConfig['dir']=_0x12f69b(),myConfig[_0x19aa14(0x354)]=_0x13a352(),myConfig['x']=_0x3522e5['x2'],myConfig['y']=_0x3522e5['y2'],myConfig[_0x19aa14(0x6ce)]=_0x2971cc[_0x19aa14(0x404)],myConfig[_0x19aa14(0x5d8)]=function(_0x57184d){var _0x373a2b=_0x19aa14;return _0x2971cc[_0x373a2b(0x404)]?Math[_0x373a2b(0x634)](_0x2971cc[0x2]-_0x57184d['y'],_0x2971cc[0x1]-_0x57184d['x']):_0x3522e5['d2'];},botConfig[_0x19aa14(0x6f0)]=function(_0x75a219){var _0x235d3f=_0x19aa14;return Math[_0x235d3f(0x90e)](_0x2971cc[0x2]-_0x75a219['y'],_0x2971cc[0x1]-_0x75a219['x']);},_0x56dc5b=_0xc6fef7[_0x19aa14(0x661)](_0x1327de=>_0x1327de[_0x19aa14(0x2f1)]=='turret'&&_0x3522e5[_0x19aa14(0x204)]!=_0x1327de[_0x19aa14(0x1e6)][_0x19aa14(0x204)]&&!_0xce790d(_0x1327de['owner']['sid'])&&_0xa5236f(_0x1327de,_0x3522e5)<=0x2bc&&_0x1327de['active']),_0x5b8722=_0x2971cc[0x5]==0xb&&_0x1f0d36(Math['atan2'](_0x3522e5['y2']-_0x2971cc[0x2],_0x3522e5['x2']-_0x2971cc[0x1]),_0x2971cc[0x3])<=_0x252a23[_0x19aa14(0x4cd)]?!![]:![],_0xa9fc15();_0x252e21&&(myConfig[_0x19aa14(0x49a)]=!![],_0x252e21=![],_0x55702f=!![],!modVisual&&_0x15695a['send']('ch','ml,\x20'+_0x3522e5['x2']+',\x20'+_0x3522e5['y2']),_0x15695a['send']('7',0x1),_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x1],_0x256ae0(_0x3522e5['weapons'][0x1],!0x0),_0x15695a[_0x19aa14(0x1a6)]('2',_0x555091),_0xcd504(0x35,0x0),_0xb10f4c(()=>{var _0x2e359=_0x19aa14;myConfig[_0x2e359(0x49a)]=![],_0x55702f=![],_0x58a1c7(),_0x15695a[_0x2e359(0x1a6)]('7',0x1);},0x1));_0xc56d1b&&(myConfig[_0x19aa14(0x7c5)]=!![],_0xb10f4c(()=>{var _0x25b9cc=_0x19aa14;myConfig[_0x25b9cc(0x7c5)]=![];},0x1),_0xc56d1b=![],console[_0x19aa14(0x91a)]([_0x3522e5['buildIndex'],_0x3522e5[_0x19aa14(0x7a4)],_0x3522e5[_0x19aa14(0x4d3)]][_0x19aa14(0x64e)](',\x20')),console[_0x19aa14(0x91a)](_0x2971cc),_0xb10f4c(()=>{var _0x11a02a=_0x19aa14;console['log'](_0x11a02a(0x607));},0x2),_0x3522e5['iChatCountdown']>0x0?_0x3522e5[_0x19aa14(0x243)]=_0x19aa14(0x81a):_0x3522e5[_0x19aa14(0x243)]=_0x19aa14(0x482),_0x3522e5[_0x19aa14(0x124)]=0xbb8,_0x26bfe7());_0x2e158&&(_0x2e158=![],_0x48e847(0x0,0x1));_0x501ded&&(_0x501ded=![],_0x22239e||_0x407e2c||_0x3adf50[_0x19aa14(0x6d5)]?_0x48e847(0x0,0x1):_0xcd504(0xb,0x1));_0x3b5514&&!_0x206a05&&!_0x22239e&&(_0x599154?(!_0x407e2c&&!_0x3d630e&&_0x3522e5['pR']==0x1&&(_0x3d630e=!![],_0x15695a[_0x19aa14(0x1a6)]('7',0x1),_0xcd504(0x7,0x0),_0xb10f4c(()=>{var _0x92654c=_0x19aa14;_0x3d630e=![],_0x15695a[_0x92654c(0x1a6)]('7',0x1),_0x58a1c7();},0x1)),_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x19aa14(0x92a)][0x0],!0x0)):_0xc16fb6&&(!_0x407e2c&&!_0x3d630e&&(_0x3522e5[_0x19aa14(0x92a)][0x1]==0xa?_0x3522e5['sR']:_0x3522e5['pR'])==0x1&&(_0x3d630e=!![],_0x15695a[_0x19aa14(0x1a6)]('7',0x1),_0xcd504(0x28,0x0),_0xb10f4c(()=>{var _0x4fbc6f=_0x19aa14;_0x3d630e=![],_0x15695a[_0x4fbc6f(0x1a6)]('7',0x1),_0x58a1c7();},0x1)),_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x1]==0xa?_0x3522e5[_0x19aa14(0x92a)][0x1]:_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x19aa14(0x92a)][0x1]==0xa?_0x3522e5[_0x19aa14(0x92a)][0x1]:_0x3522e5['weapons'][0x0],!0x0)));if(_0x5de5e5[_0x19aa14(0x2f1)]==_0x19aa14(0x57e)&&_0x3522e5[_0x19aa14(0x204)]!=_0x5de5e5[_0x19aa14(0x1e6)][_0x19aa14(0x204)]&&!_0xce790d(_0x5de5e5[_0x19aa14(0x1e6)]['sid'])&&_0xa5236f(_0x5de5e5,_0x3522e5)<=0x32&&_0x5de5e5[_0x19aa14(0x4ab)]){_0x22239e=!![],_0x2cb3f8=_0x4cc912(_0x5de5e5,_0x3522e5);let _0x57e48d=_0x3522e5['weapons'][0x1]==0xa&&_0x3522e5[_0x19aa14(0x92a)][0x0]!=0x8&&_0x3affe5['hitCount']!=0x2?_0x3522e5[_0x19aa14(0x92a)][0x1]:_0x3522e5['weapons'][0x0];!_0x3adf50[_0x19aa14(0x6d5)]&&!_0x407e2c&&(_0x3902f3=_0x57e48d,_0x256ae0(_0x57e48d,!0x0)),_0x22239e&&!_0x3adf50[_0x19aa14(0x6d5)]&&!_0x407e2c&&!_0x3d630e&&(_0x3522e5['weapons'][0x1]==0xa&&_0x3522e5[_0x19aa14(0x92a)][0x0]!=0x8&&_0x3affe5['hitCount']!=0x2?_0x3522e5['sR']==0x1:_0x3522e5['pR']==0x1)&&(_0x3d630e=!![],_0x15695a[_0x19aa14(0x1a6)]('7',0x1),_0x15695a[_0x19aa14(0x1a6)]('2',_0x2cb3f8),_0x3affe5[_0x19aa14(0x51a)]==0x2?_0x56dc5b[_0x19aa14(0x404)]?_0xcd504(0x16,0x0):(_0xcd504(0x6,0x0),_0xcd504(0x15,0x1)):(_0xcd504(0x28,0x0),_0xcd504(0x15,0x1)),_0xb10f4c(()=>{var _0x3486ad=_0x19aa14;_0x3522e5[_0x3486ad(0x92a)][0x1]==0xa&&_0x3522e5[_0x3486ad(0x92a)][0x0]!=0x8&&_0x3affe5[_0x3486ad(0x51a)]==0x2?(_0x3d630e=!![],_0x22239e?_0x56dc5b[_0x3486ad(0x404)]?_0xcd504(0x16,0x0):(_0xcd504(0x6,0x0),_0xcd504(0x15,0x1)):_0x58a1c7(),_0xb10f4c(()=>{var _0x5d07a5=_0x3486ad;_0x15695a['send']('7',0x1),_0x3d630e=![],_0x3902f3=_0x3522e5[_0x5d07a5(0x92a)][0x1]==0xa?_0x3522e5[_0x5d07a5(0x92a)][0x1]:_0x3522e5[_0x5d07a5(0x92a)][0x0],_0x256ae0(_0x3522e5['weapons'][0x1]==0xa?_0x3522e5[_0x5d07a5(0x92a)][0x1]:_0x3522e5[_0x5d07a5(0x92a)][0x0],!0x0);},0x1)):(_0x3d630e=![],_0x15695a[_0x3486ad(0x1a6)]('7',0x1),_0x22239e?modVisual?_0x56dc5b['length']?_0xcd504(0x16,0x0):(_0xcd504(0x6,0x0),_0xcd504(0x15,0x1)):_0x56dc5b['length']?_0xcd504(0x16,0x0):(_0xcd504(0x6,0x0),_0xcd504(0x15,0x1)):_0x58a1c7());},0x1));}else _0x22239e=![];if(_0x306f57){if(!_0x3522e5['skins'][0x35])_0x4aea54(0x35,0x0);else!_0x3522e5[_0x19aa14(0x5eb)][0x7]&&_0x4aea54(0x7,0x0);}_0x3adf50[_0x19aa14(0x6d5)]&&(_0x306f57=![],_0x15ec2e());_0x407e2c&&_0x2971cc[0x9]==0x16&&_0x198cad(_0x3522e5,_0x19aa14(0x51f),_0x252a23[_0x19aa14(0x591)]);if(_0x3f04b2&&!_0x22239e&&_0x3522e5[_0x19aa14(0x92a)][0x0]==0x5){let _0x160997=_0xa4351a(_0x2971cc,_0x3522e5),_0x39b40c=_0x555091,_0x19703c=_0x555091+Math['PI'];if(_0x2971cc[_0x19aa14(0x404)]){_0x46ce5=!![];if(_0x160997<0xb9)_0x58a1c7(),_0x23f241!=_0x19703c&&(_0x23f241=_0x19703c,_0x15695a[_0x19aa14(0x1a6)]('33',_0x19703c)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5['weapons'][0x0],!0x0));else{if(_0x160997>=0xb9&&_0x160997<0xdc)_0x160997<0xd2?_0xcd504(0x16,0x0):_0xcd504(0x28,0x0),_0x23f241!=_0x19703c&&(_0x23f241=_0x19703c,_0x15695a['send']('33',_0x19703c)),_0x3522e5[_0x19aa14(0x915)]!=_0x3522e5[_0x19aa14(0x21f)][0x1]&&_0x256ae0(_0x3522e5[_0x19aa14(0x21f)][0x1]);else{if(_0x160997>0xe6&&_0x160997<=0x109)_0x160997>0xf0?_0xcd504(0x16,0x0):_0xcd504(0x28,0x0),_0x23f241!=_0x39b40c&&(_0x23f241=_0x39b40c,_0x15695a[_0x19aa14(0x1a6)]('33',_0x39b40c)),_0x3522e5[_0x19aa14(0x915)]!=_0x3522e5[_0x19aa14(0x21f)][0x1]&&_0x256ae0(_0x3522e5[_0x19aa14(0x21f)][0x1]);else{if(_0x160997>0x109)_0x58a1c7(),_0x23f241!=_0x39b40c&&(_0x23f241=_0x39b40c,_0x15695a[_0x19aa14(0x1a6)]('33',_0x39b40c)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5['weapons'][0x0],!0x0));else _0x160997>=0xdc&&_0x160997<=0xe6&&(_0x2971cc[0x9]!=0x6&&_0x2971cc[0x9]!=0x16&&_0x3522e5['pR']==0x1&&_0x3522e5['tR']==0x1&&_0x14bfb4?_0x356491():(_0x14bfb4=!![],_0x48e847(0x0,0x0),_0x23f241!=undefined&&(_0x23f241=undefined,_0x15695a[_0x19aa14(0x1a6)]('33',undefined)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x19aa14(0x92a)][0x0],!0x0))));}}}}else _0x46ce5=![];}else _0x46ce5=![];if(_0x3ac5ff&&!_0x22239e&&_0x3522e5[_0x19aa14(0x92a)][0x0]==0x5){let _0x248c5a=_0xa4351a(_0x2971cc,_0x3522e5),_0x2c3272=_0x555091,_0x58086e=_0x555091+Math['PI'];if(_0x2971cc[_0x19aa14(0x404)]){_0x57c2f2=!![];if(_0x248c5a<0x163)_0x367bdb=![],_0x58a1c7(),_0x23f241!=_0x58086e&&(_0x23f241=_0x58086e,_0x15695a[_0x19aa14(0x1a6)]('33',_0x58086e)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5['weapons'][0x0],_0x256ae0(_0x3522e5[_0x19aa14(0x92a)][0x0],!0x0));else{if(_0x248c5a>=0x163&&_0x248c5a<0x181)_0x367bdb=![],_0x248c5a<0x177?_0xcd504(0x16,0x0):_0xcd504(0x28,0x0),_0x23f241!=_0x58086e&&(_0x23f241=_0x58086e,_0x15695a[_0x19aa14(0x1a6)]('33',_0x58086e)),_0x3522e5[_0x19aa14(0x915)]!=_0x3522e5[_0x19aa14(0x21f)][0x1]&&_0x256ae0(_0x3522e5[_0x19aa14(0x21f)][0x1]);else{if(_0x248c5a>0x186&&_0x248c5a<=0x1a4)_0x367bdb=![],_0x248c5a>0x190?_0xcd504(0x16,0x0):_0xcd504(0x28,0x0),_0x23f241!=_0x2c3272&&(_0x23f241=_0x2c3272,_0x15695a[_0x19aa14(0x1a6)]('33',_0x2c3272)),_0x3522e5['buildIndex']!=_0x3522e5['items'][0x1]&&_0x256ae0(_0x3522e5[_0x19aa14(0x21f)][0x1]);else{if(_0x248c5a>0x1a4)_0x367bdb=![],_0x58a1c7(),_0x23f241!=_0x2c3272&&(_0x23f241=_0x2c3272,_0x15695a['send']('33',_0x2c3272)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5['weapons'][0x0],!0x0));else _0x248c5a>=0x181&&_0x248c5a<=0x186&&(_0x3522e5['pR']==0x1&&_0x3522e5['sR']==0x1&&_0x3522e5['tR']==0x1&&_0x3fe04e&&_0x14bfb4?(_0x367bdb=![],_0x3fe04e=![],_0x3c20fd()):(_0x14bfb4=!![],_0x367bdb=!![],_0x48e847(0x0,0x0),_0x23f241!=undefined&&(_0x23f241=undefined,_0x15695a['send']('33',undefined)),_0x3522e5[_0x19aa14(0x915)]!=-0x1&&(_0x3902f3=_0x3522e5[_0x19aa14(0x92a)][0x0],_0x256ae0(_0x3522e5[_0x19aa14(0x92a)][0x0],!0x0))));}}}}else _0x367bdb=![],_0x46ce5=![];}else _0x367bdb=![],_0x46ce5=![];if(_0x13cae8){}_0x164e2a&&(_0x164e2a=![],_0xcd504(0x16,0x0),_0xb10f4c(()=>{_0x58a1c7();},0x1));_0x58a6f9=_0x3522e5['items'][0x3]==0xa?0x5a:0x5e,_0x2890f3=_0x3522e5['items'][0x2]==0x6?0x31:0x34;let _0x12ccf8=_0x3522e5['y2']>=_0x252a23[_0x19aa14(0x141)]/0x2-_0x252a23['riverWidth']/0x2&&_0x3522e5['y2']<=_0x252a23[_0x19aa14(0x141)]/0x2+_0x252a23[_0x19aa14(0x386)]/0x2?!![]:![];if((_0x104083['y2']!=_0x3522e5['y2']||_0x104083['x2']!=_0x3522e5['x2'])&&!_0x12ccf8){if(_0x466448){if(_0xc06ab8(_0x215018,_0x3522e5)>_0x58a6f9){let _0xcec01d=_0x5874dd(_0x104083,_0x3522e5);_0x5e4bb3(0x3,_0xcec01d+_0x3a1dca(_0x58a6f9/1.25)),_0x5e4bb3(0x3,_0xcec01d-_0x3a1dca(_0x58a6f9/1.25)),_0x5e4bb3(0x3,_0xcec01d+_0x3a1dca(0x0)),_0x215018['x2']=_0x3522e5['x2'],_0x215018['y2']=_0x3522e5['y2'];}}_0x104083['x2']=_0x3522e5['x2'],_0x104083['y2']=_0x3522e5['y2'];}modVisual&&(_0xa4351a(_0x2971cc,_0x3522e5)>=0x3c5||!_0x2971cc[_0x19aa14(0x404)])?_0x361505!=0x780&&_0x26317f!=0x438&&(_0x361505=0x780,_0x26317f=0x438,_0x26bfe7()):(_0x361505!=0x780||_0x26317f!=0x438)&&(_0x361505=0x780,_0x26317f=0x438,_0x26bfe7());if(_0x4ceb13[mooTickCount])for(let _0x5168f1=0x0;_0x5168f1<_0x4ceb13[mooTickCount][_0x19aa14(0x404)];_0x5168f1++){_0x4ceb13[mooTickCount][_0x5168f1]();}}function _0xb10f4c(_0x4245c6,_0x1e85cf){var _0x588ab3=_0x4c4069;if(typeof _0x4245c6!=_0x588ab3(0x848))return;typeof _0x4ceb13[mooTickCount+_0x1e85cf]!='object'?_0x4ceb13[mooTickCount+_0x1e85cf]=[_0x4245c6]:_0x4ceb13[mooTickCount+_0x1e85cf][_0x588ab3(0x333)](_0x4245c6);}function _0x36f833(_0x54aae4,_0x459fb2){let _0x1b9851=mooTickCount+_0x459fb2,_0x9a3e22=setInterval(()=>{var _0x149f5f=_0x2943;console[_0x149f5f(0x91a)](_0x1b9851,mooTickCount),mooTickCount>=_0x1b9851&&(clearInterval(_0x9a3e22),_0x54aae4());},0x0);}var _0x3c04bb=![];function _0x57479f(_0x2202ab){var _0x34e1d3=_0x4c4069;_0x2202ab[_0x34e1d3(0x64a)]=_0x1a5e63[_0x34e1d3(0x92a)][_0x2202ab[_0x34e1d3(0x7a4)]];if(_0x2202ab[_0x34e1d3(0x7a4)]<0x9)_0x2202ab==_0x3522e5?_0x2c24e5[_0x2202ab[_0x34e1d3(0x204)]]=_0x3522e5[_0x34e1d3(0x92a)][0x0]:_0x2c24e5[_0x2202ab[_0x34e1d3(0x204)]]=_0x2202ab[_0x34e1d3(0x7a4)],_0x563047[_0x2202ab[_0x34e1d3(0x204)]]=_0x2202ab['weaponVariant'],_0x2202ab['weaponIndex']==_0x2c24e5[_0x2202ab[_0x34e1d3(0x204)]]&&(_0x2202ab[_0x34e1d3(0x915)]<0x0&&(_0x2202ab['pR']=Math[_0x34e1d3(0x176)](0x1,_0x2202ab['pR']+0x3e8/_0x252a23['serverUpdateRate']/_0x1a5e63[_0x34e1d3(0x92a)][_0x2c24e5[_0x2202ab[_0x34e1d3(0x204)]]][_0x34e1d3(0x737)]),_0x2202ab['pCd']=Math[_0x34e1d3(0x77b)](0x0,_0x2202ab[_0x34e1d3(0x1bd)]-0x1)));else _0x2202ab[_0x34e1d3(0x7a4)]>0x8&&(_0x2202ab==_0x3522e5?_0x5b3b1d[_0x2202ab[_0x34e1d3(0x204)]]=_0x3522e5[_0x34e1d3(0x92a)][0x1]:_0x5b3b1d[_0x2202ab[_0x34e1d3(0x204)]]=_0x2202ab['weaponIndex'],_0x7da852[_0x2202ab['sid']]=_0x2202ab[_0x34e1d3(0x4d3)],_0x2202ab[_0x34e1d3(0x7a4)]==_0x5b3b1d[_0x2202ab[_0x34e1d3(0x204)]]&&(_0x2202ab['buildIndex']<0x0&&(_0x2202ab['sR']=Math[_0x34e1d3(0x176)](0x1,_0x2202ab['sR']+0x3e8/_0x252a23[_0x34e1d3(0x1fa)]/_0x1a5e63[_0x34e1d3(0x92a)][_0x5b3b1d[_0x2202ab[_0x34e1d3(0x204)]]][_0x34e1d3(0x737)]),_0x2202ab[_0x34e1d3(0x258)]=Math[_0x34e1d3(0x77b)](0x0,_0x2202ab[_0x34e1d3(0x258)]-0x1))));_0x2202ab['tR']=Math[_0x34e1d3(0x176)](0x1,_0x2202ab['tR']+0x3e8/_0x252a23['serverUpdateRate']/0x9c4);if(_0x2202ab==_0x3522e5){if(_0x2202ab['tR']==0x1)_0x3c04bb&&(_0x3c04bb=![]);else{}}}function _0x128bce(_0x54d7b9){var _0x2a2272=_0x4c4069;for(var _0xc265ea=0x0;_0xc265ea<_0x15cbee[_0x2a2272(0x404)];++_0xc265ea){if(_0x15cbee[_0xc265ea]['id']==_0x54d7b9)return _0x15cbee[_0xc265ea];}return null;}function _0xf4ede0(_0x1e24da){var _0x421e3c=_0x4c4069;for(var _0x5be000=0x0;_0x5be000<_0x15cbee[_0x421e3c(0x404)];++_0x5be000){if(_0x15cbee[_0x5be000][_0x421e3c(0x204)]==_0x1e24da)return _0x15cbee[_0x5be000];}return null;}function _0x1442b8(_0x141a2c){var _0x3ac509=_0x4c4069;for(var _0x4183e8=0x0;_0x4183e8<_0x33d1e5[_0x3ac509(0x404)];++_0x4183e8){if(_0x33d1e5[_0x4183e8][_0x3ac509(0x204)]==_0x141a2c)return _0x33d1e5[_0x4183e8];}return null;}function _0x2624c0(_0x549ed8){var _0x133ee0=_0x4c4069;for(var _0x55c8b0=0x0;_0x55c8b0<_0xc6fef7[_0x133ee0(0x404)];++_0x55c8b0){if(_0xc6fef7[_0x55c8b0][_0x133ee0(0x204)]==_0x549ed8)return _0xc6fef7[_0x55c8b0];}return null;}function _0xce790d(_0x1757ec){var _0x2bd758=_0x4c4069;for(let _0x4da8ae=0x0;_0x4da8ae<_0x46b0fa[_0x2bd758(0x404)];_0x4da8ae+=0x2){if(_0x46b0fa[_0x4da8ae]==_0x1757ec)return _0x46b0fa[_0x4da8ae];}return null;}var _0x4e4ff0=-0x1;function _0x3e1b43(){var _0x4597f8=_0x4c4069,_0x46b2e7=Date[_0x4597f8(0x951)]()-_0x4e4ff0;window[_0x4597f8(0x78a)]=_0x46b2e7,_0x943ba0[_0x4597f8(0x809)]=_0x4597f8(0x1ba)+_0x46b2e7+'\x20ms';}function _0x28aa37(){var _0x30f635=_0x4c4069;_0x4e4ff0=Date[_0x30f635(0x951)](),_0x15695a['send']('pp');}_0x943ba0[_0x4c4069(0x29c)][_0x4c4069(0x2f4)]=_0x4c4069(0x73a),_0x943ba0[_0x4c4069(0x29c)]['display']='block',document[_0x4c4069(0x773)][_0x4c4069(0x8bf)](_0x943ba0);function _0x53f240(_0x25fb2d){var _0x118fdc=_0x4c4069;if(_0x25fb2d<0x0)return;var _0x2198cd=Math[_0x118fdc(0x7ee)](_0x25fb2d/0x3c),_0x313cd8=_0x25fb2d%0x3c;_0x313cd8=('0'+_0x313cd8)[_0x118fdc(0x789)](-0x2),_0x936b8c['innerText']='Server\x20restarting\x20in\x20'+_0x2198cd+':'+_0x313cd8,_0x936b8c[_0x118fdc(0x4ec)]=![];}window[_0x4c4069(0x37f)]=(function(){var _0x22d929=_0x4c4069;return window[_0x22d929(0x143)]||window[_0x22d929(0x778)]||window[_0x22d929(0x170)]||function(_0x4c44fe){var _0x2ced48=_0x22d929;window[_0x2ced48(0x8f4)](_0x4c44fe,0x3e8/0x3c);};}());function _0x252fca(){var _0x3560dc=_0x4c4069;_0x4bc405=Date[_0x3560dc(0x951)](),_0x3d1537=_0x4bc405-_0x3b063f,_0x3b063f=_0x4bc405,_0x306cf9(),requestAnimFrame(_0x252fca);}let _0x38a3a4=[];function _0x4229a3(){var _0x13a8b8=_0x4c4069;_0x100d25(),_0x275917(),_0x44cd52[_0x13a8b8(0x29c)][_0x13a8b8(0x196)]=_0x13a8b8(0x15e),_0x42ee52[_0x13a8b8(0x29c)]['display']=_0x13a8b8(0x76c);if(modVisual)_0x207805(_0x13a8b8(0x443))||'';else{let _0x3dfb07=['w','a','s','d'];for(let _0x1fd178=0x0;_0x1fd178<0x8;_0x1fd178++){_0x38a3a4[_0x13a8b8(0x333)](_0x3dfb07[Math[_0x13a8b8(0x7ee)](Math['random']()*_0x3dfb07[_0x13a8b8(0x404)])]);}_0x567c55[_0x13a8b8(0x985)]=_0x38a3a4[_0x13a8b8(0x64e)]('');}_0x14f291();}_0x5bb2ad(),_0x252fca();function _0x365f0a(_0x5d85e0){var _0x641bba=_0x4c4069;window[_0x641bba(0x86c)](_0x5d85e0,'_blank');}window[_0x4c4069(0x6ea)]=_0x365f0a,window[_0x4c4069(0x129)]=_0x255d10,window[_0x4c4069(0x8f2)]=_0x4ee2bb,window[_0x4c4069(0x1cf)]=_0x553f15,window[_0x4c4069(0x254)]=_0x423723,window[_0x4c4069(0x32a)]=_0x271fd4,window[_0x4c4069(0x40d)]=_0x1b1f4f,window[_0x4c4069(0x518)]=_0x4aea54,window[_0x4c4069(0x812)]=_0x48e847,window['showItemInfo']=_0x342c8a,window['selectSkinColor']=_0x4518f7,window[_0x4c4069(0x228)]=_0x535f8f,window[_0x4c4069(0x940)]=_0x252a23;},'./src/js/config.js':function(_0x5df52f,_0x4d4374,_0xa6be38){var _0x3d5c4f=_0xfd30c1;(function(_0x3b8f3e){var _0x46bf86=_0x2943;_0x5df52f[_0x46bf86(0x245)]['maxScreenWidth']=0x780,_0x5df52f['exports'][_0x46bf86(0x742)]=0x438,_0x5df52f[_0x46bf86(0x245)]['serverUpdateRate']=0x9,_0x5df52f['exports'][_0x46bf86(0x231)]=_0x3b8f3e&&_0x3b8f3e[_0x46bf86(0x780)][_0x46bf86(0x5b5)]('--largeserver')!=-0x1?0x50:0x32,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x1b1)]=_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x231)]+0xa,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x157)]=0x6,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x215)]=0xbb8,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x50f)]=0xa,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x2fc)]=0x5,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x1e4)]=0x32,_0x5df52f['exports'][_0x46bf86(0x2cd)]=4.5,_0x5df52f[_0x46bf86(0x245)]['iconPadding']=0xf,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x93b)]=0.9,_0x5df52f['exports'][_0x46bf86(0x5f5)]=0xbb8,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x3a9)]=0x3c,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x256)]=0x23,_0x5df52f['exports'][_0x46bf86(0x591)]=0xbb8,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x400)]=0x1f4,_0x5df52f[_0x46bf86(0x245)]['inSandbox']=_0x3b8f3e&&_0x3b8f3e['env'][_0x46bf86(0x5c1)]==='mm_exp';;_0x5df52f['exports'][_0x46bf86(0x163)]=0x64,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x28a)]=Math['PI']/2.6,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x4a8)]=0xa,_0x5df52f['exports'][_0x46bf86(0x4ee)]=0.25,_0x5df52f['exports']['hitAngle']=Math['PI']/0x2,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x116)]=0x23,_0x5df52f['exports']['playerSpeed']=0.0016,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x68b)]=0.993,_0x5df52f[_0x46bf86(0x245)]['nameY']=0x22,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0xe5)]=['#bf8f54',_0x46bf86(0x891),'#896c4b',_0x46bf86(0x696),_0x46bf86(0x105),_0x46bf86(0x18e),'#4c4c4c',_0x46bf86(0x282),'#738cc3',_0x46bf86(0x53b),_0x46bf86(0x725)],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x756)]=0x7,_0x5df52f[_0x46bf86(0x245)]['aiTurnRandom']=0.06,_0x5df52f[_0x46bf86(0x245)]['cowNames']=[_0x46bf86(0x75e),_0x46bf86(0x73f),'Bmoe',_0x46bf86(0x7e9),_0x46bf86(0x1c4),_0x46bf86(0x56d),'Vince','Nathan','Nick',_0x46bf86(0x53a),_0x46bf86(0x909),_0x46bf86(0x427),_0x46bf86(0x31a),'Mc\x20Donald','Theo',_0x46bf86(0x816),_0x46bf86(0x15c),_0x46bf86(0x314),_0x46bf86(0x770),'Helena',_0x46bf86(0x69d),'Ben',_0x46bf86(0x1b6),_0x46bf86(0x379),_0x46bf86(0x32d),_0x46bf86(0x4bf),_0x46bf86(0x71d),_0x46bf86(0x164),'Destined',_0x46bf86(0x2df),_0x46bf86(0x203),'Meaty','Sophia',_0x46bf86(0x138),_0x46bf86(0x3e3),_0x46bf86(0x7c1),'Murdoch','Theo','Jared',_0x46bf86(0x4ce),_0x46bf86(0x43d),_0x46bf86(0x6a5),'Dexter',_0x46bf86(0x572),_0x46bf86(0x23a)],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x4cd)]=Math['PI']/0x3,_0x5df52f[_0x46bf86(0x245)]['weaponVariants']=[{'id':0x0,'src':'','xp':0x0,'val':0x1},{'id':0x1,'src':'_g','xp':0xbb8,'val':1.1},{'id':0x2,'src':'_d','xp':0x1b58,'val':1.18},{'id':0x3,'src':'_r','poison':!![],'xp':0x2ee0,'val':1.18}],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x9a2)]=function(_0x2591fd){var _0x412cc9=_0x46bf86,_0x29ee09=_0x2591fd[_0x412cc9(0x27c)][_0x2591fd[_0x412cc9(0x7a4)]]||0x0;for(var _0x11c857=_0x5df52f['exports'][_0x412cc9(0x125)][_0x412cc9(0x404)]-0x1;_0x11c857>=0x0;--_0x11c857){if(_0x29ee09>=_0x5df52f[_0x412cc9(0x245)][_0x412cc9(0x125)][_0x11c857]['xp'])return _0x5df52f[_0x412cc9(0x245)]['weaponVariants'][_0x11c857];}},_0x5df52f['exports'][_0x46bf86(0x5ca)]=[_0x46bf86(0x532),_0x46bf86(0x594),_0x46bf86(0x29f),_0x46bf86(0x960)],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x14d)]=0x7,_0x5df52f[_0x46bf86(0x245)]['treesPerArea']=0x9,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x961)]=0x3,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x885)]=0x20,_0x5df52f['exports'][_0x46bf86(0x30f)]=0x7,_0x5df52f['exports'][_0x46bf86(0x386)]=0x2d4,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x9ab)]=0x72,_0x5df52f[_0x46bf86(0x245)]['waterCurrent']=0.0011,_0x5df52f[_0x46bf86(0x245)]['waveSpeed']=0.0001,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x617)]=1.3,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x925)]=[0x96,0xa0,0xa5,0xaf],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x70d)]=[0x50,0x55,0x5f],_0x5df52f[_0x46bf86(0x245)]['rockScales']=[0x50,0x55,0x5a],_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x834)]=0x960,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x8a5)]=0.75,_0x5df52f['exports'][_0x46bf86(0x166)]=0xf,_0x5df52f['exports'][_0x46bf86(0x141)]=0x3840,_0x5df52f[_0x46bf86(0x245)][_0x46bf86(0x908)]=0x28,_0x5df52f[_0x46bf86(0x245)]['mapPingTime']=0x898;}[_0x3d5c4f(0x7bf)](this,_0xa6be38('./node_modules/process/browser.js')));},'./src/js/data/ai.js':function(_0x5a2234,_0x1b1bfb){var _0x3b4b1a=_0xfd30c1,_0x1d0dee=Math['PI']*0x2;_0x5a2234[_0x3b4b1a(0x245)]=function(_0x5bd180,_0x164686,_0xa6dfa5,_0x439c49,_0x14faaf,_0x305a94,_0x3e25a1,_0x24c84b){var _0x359b80=_0x3b4b1a;this[_0x359b80(0x204)]=_0x5bd180,this[_0x359b80(0x2d9)]=!![],this[_0x359b80(0x5c8)]=_0x14faaf[_0x359b80(0x1af)](0x0,_0x305a94['cowNames'][_0x359b80(0x404)]-0x1),this[_0x359b80(0x4b1)]=function(_0x140363,_0x3e82f1,_0x4df256,_0x5ad9c2,_0x56f2d2){var _0x89df3b=_0x359b80;this['x']=_0x140363,this['y']=_0x3e82f1,this[_0x89df3b(0x497)]=_0x56f2d2[_0x89df3b(0x1b8)]?_0x140363:null,this[_0x89df3b(0x5b1)]=_0x56f2d2[_0x89df3b(0x1b8)]?_0x3e82f1:null,this[_0x89df3b(0x60a)]=0x0,this['yVel']=0x0,this[_0x89df3b(0x3f2)]=0x0,this[_0x89df3b(0x8a0)]=_0x4df256,this['dirPlus']=0x0,this[_0x89df3b(0x556)]=_0x5ad9c2,this[_0x89df3b(0x4c3)]=_0x56f2d2[_0x89df3b(0x4c3)];if(_0x56f2d2[_0x89df3b(0x2f1)])this[_0x89df3b(0x2f1)]=_0x56f2d2[_0x89df3b(0x2f1)];this[_0x89df3b(0x2c0)]=_0x56f2d2[_0x89df3b(0x2c0)],this[_0x89df3b(0x737)]=_0x56f2d2[_0x89df3b(0x737)],this[_0x89df3b(0x9a7)]=_0x56f2d2['killScore'],this[_0x89df3b(0x1f7)]=_0x56f2d2['turnSpeed'],this[_0x89df3b(0x5d9)]=_0x56f2d2[_0x89df3b(0x5d9)],this[_0x89df3b(0x8fe)]=_0x56f2d2[_0x89df3b(0x1d7)],this[_0x89df3b(0x224)]=_0x56f2d2[_0x89df3b(0x224)],this[_0x89df3b(0x1d7)]=this[_0x89df3b(0x8fe)],this['chargePlayer']=_0x56f2d2[_0x89df3b(0x3e1)],this[_0x89df3b(0x2c3)]=_0x56f2d2['viewRange'],this[_0x89df3b(0x70f)]=_0x56f2d2[_0x89df3b(0x70f)],this[_0x89df3b(0x173)]=_0x56f2d2[_0x89df3b(0x173)],this[_0x89df3b(0x471)]=_0x56f2d2[_0x89df3b(0x471)],this[_0x89df3b(0x551)]=_0x56f2d2['dontRun'],this[_0x89df3b(0x6d0)]=_0x56f2d2[_0x89df3b(0x6d0)],this[_0x89df3b(0x616)]=_0x56f2d2[_0x89df3b(0x616)],this[_0x89df3b(0x1b4)]=_0x56f2d2[_0x89df3b(0x1b4)],this['spriteMlt']=_0x56f2d2[_0x89df3b(0x817)],this['nameScale']=_0x56f2d2[_0x89df3b(0x783)],this[_0x89df3b(0x8b6)]=_0x56f2d2[_0x89df3b(0x8b6)],this[_0x89df3b(0x747)]=_0x56f2d2['noTrap'],this[_0x89df3b(0x2d6)]=_0x56f2d2['spawnDelay'],this[_0x89df3b(0x86e)]=0x0,this[_0x89df3b(0x965)]=0x3e8,this[_0x89df3b(0x162)]=0x0,this[_0x89df3b(0x8c0)]=0x0,this[_0x89df3b(0x4ab)]=!![],this[_0x89df3b(0x1c5)]=!![],this[_0x89df3b(0x4f2)]=null,this[_0x89df3b(0x79c)]=null,this[_0x89df3b(0x58f)]={};};var _0x4c91c7=0x0;this[_0x359b80(0x767)]=function(_0x469a14){var _0x3e072b=_0x359b80;if(this[_0x3e072b(0x4ab)]){if(this[_0x3e072b(0x657)]){this[_0x3e072b(0x657)]-=_0x469a14;this['spawnCounter']<=0x0&&(this[_0x3e072b(0x657)]=0x0,this['x']=this[_0x3e072b(0x497)]||_0x14faaf[_0x3e072b(0x1af)](0x0,_0x305a94[_0x3e072b(0x141)]),this['y']=this[_0x3e072b(0x5b1)]||_0x14faaf['randInt'](0x0,_0x305a94['mapScale']));return;}_0x4c91c7-=_0x469a14;if(_0x4c91c7<=0x0){if(this[_0x3e072b(0x58f)][_0x3e072b(0x173)]){this[_0x3e072b(0x950)](-this[_0x3e072b(0x58f)][_0x3e072b(0x173)],this[_0x3e072b(0x58f)][_0x3e072b(0x8e1)]),this['dmgOverTime'][_0x3e072b(0x8ab)]-=0x1;if(this['dmgOverTime'][_0x3e072b(0x8ab)]<=0x0)this[_0x3e072b(0x58f)][_0x3e072b(0x173)]=0x0;}_0x4c91c7=0x3e8;}var _0x6ffc1b=![],_0x4b7544=0x1;!this['zIndex']&&!this[_0x3e072b(0x9b1)]&&this['y']>=_0x305a94[_0x3e072b(0x141)]/0x2-_0x305a94['riverWidth']/0x2&&this['y']<=_0x305a94[_0x3e072b(0x141)]/0x2+_0x305a94['riverWidth']/0x2&&(_0x4b7544=0.33,this['xVel']+=_0x305a94[_0x3e072b(0x8fd)]*_0x469a14);if(this[_0x3e072b(0x9b1)])this[_0x3e072b(0x60a)]=0x0,this[_0x3e072b(0x56e)]=0x0;else{if(this[_0x3e072b(0x965)]>0x0){this[_0x3e072b(0x965)]-=_0x469a14;if(this[_0x3e072b(0x965)]<=0x0){if(this[_0x3e072b(0x3e1)]){var _0x4873f7,_0x30987a,_0x4d7e98;for(var _0x342f77=0x0;_0x342f77<_0xa6dfa5[_0x3e072b(0x404)];++_0x342f77){_0xa6dfa5[_0x342f77]['alive']&&!(_0xa6dfa5[_0x342f77][_0x3e072b(0x36b)]&&_0xa6dfa5[_0x342f77][_0x3e072b(0x36b)][_0x3e072b(0x5db)])&&(_0x4d7e98=_0x14faaf[_0x3e072b(0x596)](this['x'],this['y'],_0xa6dfa5[_0x342f77]['x'],_0xa6dfa5[_0x342f77]['y']),_0x4d7e98<=this[_0x3e072b(0x2c3)]&&(!_0x4873f7||_0x4d7e98<_0x30987a)&&(_0x30987a=_0x4d7e98,_0x4873f7=_0xa6dfa5[_0x342f77]));}_0x4873f7?(this[_0x3e072b(0x79c)]=_0x4873f7,this[_0x3e072b(0x162)]=_0x14faaf['randInt'](0x1f40,0x2ee0)):(this['moveCount']=_0x14faaf[_0x3e072b(0x1af)](0x3e8,0x7d0),this[_0x3e072b(0x8c0)]=_0x14faaf[_0x3e072b(0x967)](-Math['PI'],Math['PI']));}else this[_0x3e072b(0x162)]=_0x14faaf[_0x3e072b(0x1af)](0xfa0,0x2710),this[_0x3e072b(0x8c0)]=_0x14faaf['randFloat'](-Math['PI'],Math['PI']);}}else{if(this[_0x3e072b(0x162)]>0x0){var _0x37b55c=this[_0x3e072b(0x737)]*_0x4b7544;if(this['runFrom']&&this['runFrom'][_0x3e072b(0x4ab)]&&!(this[_0x3e072b(0x4f2)][_0x3e072b(0x526)]&&!this[_0x3e072b(0x4f2)][_0x3e072b(0x1c5)]))this[_0x3e072b(0x8c0)]=_0x14faaf[_0x3e072b(0x743)](this['x'],this['y'],this[_0x3e072b(0x4f2)]['x'],this['runFrom']['y']),_0x37b55c*=1.42;else this[_0x3e072b(0x79c)]&&this['chargeTarget'][_0x3e072b(0x1c5)]&&(this['targetDir']=_0x14faaf[_0x3e072b(0x743)](this[_0x3e072b(0x79c)]['x'],this[_0x3e072b(0x79c)]['y'],this['x'],this['y']),_0x37b55c*=1.75,_0x6ffc1b=!![]);this[_0x3e072b(0x86e)]&&(_0x37b55c*=0.3);if(this[_0x3e072b(0x8a0)]!=this['targetDir']){this[_0x3e072b(0x8a0)]%=_0x1d0dee;var _0x5b43c1=(this[_0x3e072b(0x8a0)]-this['targetDir']+_0x1d0dee)%_0x1d0dee,_0x3e1c72=Math['min'](Math[_0x3e072b(0x11d)](_0x5b43c1-_0x1d0dee),_0x5b43c1,this['turnSpeed']*_0x469a14),_0x58b220=_0x5b43c1-Math['PI']>=0x0?0x1:-0x1;this[_0x3e072b(0x8a0)]+=_0x58b220*_0x3e1c72+_0x1d0dee;}this[_0x3e072b(0x8a0)]%=_0x1d0dee,this[_0x3e072b(0x60a)]+=_0x37b55c*_0x469a14*Math[_0x3e072b(0x90f)](this[_0x3e072b(0x8a0)]),this[_0x3e072b(0x56e)]+=_0x37b55c*_0x469a14*Math[_0x3e072b(0x8b9)](this[_0x3e072b(0x8a0)]),this[_0x3e072b(0x162)]-=_0x469a14,this[_0x3e072b(0x162)]<=0x0&&(this[_0x3e072b(0x4f2)]=null,this[_0x3e072b(0x79c)]=null,this[_0x3e072b(0x965)]=this[_0x3e072b(0x471)]?0x5dc:_0x14faaf['randInt'](0x5dc,0x1770));}}}this[_0x3e072b(0x3f2)]=0x0,this['lockMove']=![];var _0x5415c6,_0x1c6f40=_0x14faaf[_0x3e072b(0x596)](0x0,0x0,this[_0x3e072b(0x60a)]*_0x469a14,this[_0x3e072b(0x56e)]*_0x469a14),_0x279edd=Math[_0x3e072b(0x176)](0x4,Math[_0x3e072b(0x77b)](0x1,Math[_0x3e072b(0x131)](_0x1c6f40/0x28))),_0x57b9ac=0x1/_0x279edd;for(var _0x342f77=0x0;_0x342f77<_0x279edd;++_0x342f77){if(this[_0x3e072b(0x60a)])this['x']+=this[_0x3e072b(0x60a)]*_0x469a14*_0x57b9ac;if(this['yVel'])this['y']+=this[_0x3e072b(0x56e)]*_0x469a14*_0x57b9ac;_0x5415c6=_0x164686[_0x3e072b(0x352)](this['x'],this['y'],this[_0x3e072b(0x5d9)]);for(var _0x445d7b=0x0;_0x445d7b<_0x5415c6[_0x3e072b(0x404)];++_0x445d7b){for(var _0x4f11f8=0x0;_0x4f11f8<_0x5415c6[_0x445d7b][_0x3e072b(0x404)];++_0x4f11f8){if(_0x5415c6[_0x445d7b][_0x4f11f8]['active'])_0x164686['checkCollision'](this,_0x5415c6[_0x445d7b][_0x4f11f8],_0x57b9ac);}}}var _0x19bd7d=![];if(this[_0x3e072b(0x86e)]>0x0){this[_0x3e072b(0x86e)]-=_0x469a14;if(this[_0x3e072b(0x86e)]<=0x0){_0x19bd7d=!![],this[_0x3e072b(0x86e)]=0x0;this[_0x3e072b(0x224)]&&!_0x14faaf[_0x3e072b(0x1af)](0x0,0x2)&&(this[_0x3e072b(0x60a)]+=this[_0x3e072b(0x224)]*Math[_0x3e072b(0x90f)](this['dir']),this[_0x3e072b(0x56e)]+=this['leapForce']*Math[_0x3e072b(0x8b9)](this[_0x3e072b(0x8a0)]));var _0x5415c6=_0x164686[_0x3e072b(0x352)](this['x'],this['y'],this[_0x3e072b(0x6d0)]),_0x4e0b21,_0x41f329;for(var _0x2268d3=0x0;_0x2268d3<_0x5415c6[_0x3e072b(0x404)];++_0x2268d3){for(var _0x445d7b=0x0;_0x445d7b<_0x5415c6[_0x2268d3][_0x3e072b(0x404)];++_0x445d7b){_0x4e0b21=_0x5415c6[_0x2268d3][_0x445d7b];if(_0x4e0b21[_0x3e072b(0x1d7)]){_0x41f329=_0x14faaf[_0x3e072b(0x596)](this['x'],this['y'],_0x4e0b21['x'],_0x4e0b21['y']);if(_0x41f329<_0x4e0b21[_0x3e072b(0x5d9)]+this[_0x3e072b(0x6d0)]){if(_0x4e0b21[_0x3e072b(0x950)](-this['dmg']*0x5))_0x164686[_0x3e072b(0x211)](_0x4e0b21);_0x164686[_0x3e072b(0xee)](_0x4e0b21,_0x14faaf[_0x3e072b(0x743)](this['x'],this['y'],_0x4e0b21['x'],_0x4e0b21['y']));}}}}for(var _0x445d7b=0x0;_0x445d7b<_0xa6dfa5['length'];++_0x445d7b){_0xa6dfa5[_0x445d7b][_0x3e072b(0x35c)](this)&&_0x24c84b[_0x3e072b(0x1a6)](_0xa6dfa5[_0x445d7b]['id'],'aa',this[_0x3e072b(0x204)]);}}}if(_0x6ffc1b||_0x19bd7d){var _0x4e0b21,_0x41f329,_0x2a1c39;for(var _0x342f77=0x0;_0x342f77<_0xa6dfa5[_0x3e072b(0x404)];++_0x342f77){_0x4e0b21=_0xa6dfa5[_0x342f77];if(_0x4e0b21&&_0x4e0b21[_0x3e072b(0x1c5)]){_0x41f329=_0x14faaf[_0x3e072b(0x596)](this['x'],this['y'],_0x4e0b21['x'],_0x4e0b21['y']);if(this[_0x3e072b(0x6d0)]){if(!this['hitWait']&&_0x41f329<=this['hitRange']+_0x4e0b21[_0x3e072b(0x5d9)]){if(_0x19bd7d)_0x2a1c39=_0x14faaf[_0x3e072b(0x743)](_0x4e0b21['x'],_0x4e0b21['y'],this['x'],this['y']),_0x4e0b21['changeHealth'](-this[_0x3e072b(0x173)]),_0x4e0b21[_0x3e072b(0x60a)]+=0.6*Math[_0x3e072b(0x90f)](_0x2a1c39),_0x4e0b21[_0x3e072b(0x56e)]+=0.6*Math[_0x3e072b(0x8b9)](_0x2a1c39),this[_0x3e072b(0x4f2)]=null,this[_0x3e072b(0x79c)]=null,this[_0x3e072b(0x965)]=0xbb8,this['hitWait']=!_0x14faaf[_0x3e072b(0x1af)](0x0,0x2)?0x258:0x0;else this[_0x3e072b(0x86e)]=this[_0x3e072b(0x616)];}}else _0x41f329<=this[_0x3e072b(0x5d9)]+_0x4e0b21[_0x3e072b(0x5d9)]&&(_0x2a1c39=_0x14faaf[_0x3e072b(0x743)](_0x4e0b21['x'],_0x4e0b21['y'],this['x'],this['y']),_0x4e0b21['changeHealth'](-this[_0x3e072b(0x173)]),_0x4e0b21['xVel']+=0.55*Math[_0x3e072b(0x90f)](_0x2a1c39),_0x4e0b21[_0x3e072b(0x56e)]+=0.55*Math[_0x3e072b(0x8b9)](_0x2a1c39));}}}if(this[_0x3e072b(0x60a)])this[_0x3e072b(0x60a)]*=Math[_0x3e072b(0x11f)](_0x305a94[_0x3e072b(0x68b)],_0x469a14);if(this[_0x3e072b(0x56e)])this[_0x3e072b(0x56e)]*=Math[_0x3e072b(0x11f)](_0x305a94[_0x3e072b(0x68b)],_0x469a14);var _0x551775=this[_0x3e072b(0x5d9)];if(this['x']-_0x551775<0x0)this['x']=_0x551775,this[_0x3e072b(0x60a)]=0x0;else this['x']+_0x551775>_0x305a94[_0x3e072b(0x141)]&&(this['x']=_0x305a94['mapScale']-_0x551775,this[_0x3e072b(0x60a)]=0x0);if(this['y']-_0x551775<0x0)this['y']=_0x551775,this[_0x3e072b(0x56e)]=0x0;else this['y']+_0x551775>_0x305a94[_0x3e072b(0x141)]&&(this['y']=_0x305a94['mapScale']-_0x551775,this[_0x3e072b(0x56e)]=0x0);}},this[_0x359b80(0x35c)]=function(_0x220597){var _0x2cf4e6=_0x359b80;if(!_0x220597)return![];if(_0x220597[_0x2cf4e6(0x36b)]&&_0x220597['skin'][_0x2cf4e6(0x208)]&&_0x220597[_0x2cf4e6(0x5e6)]>=_0x220597[_0x2cf4e6(0x36b)][_0x2cf4e6(0x208)])return![];var _0xfa724=Math[_0x2cf4e6(0x11d)](_0x220597['x']-this['x'])-_0x220597['scale'],_0x1999ea=Math[_0x2cf4e6(0x11d)](_0x220597['y']-this['y'])-_0x220597['scale'];return _0xfa724<=_0x305a94[_0x2cf4e6(0x38d)]/0x2*1.3&&_0x1999ea<=_0x305a94[_0x2cf4e6(0x742)]/0x2*1.3;};var _0x309672=0x0,_0x39bed0=0x0;this['animate']=function(_0x1c9cd9){var _0x50680a=_0x359b80;this[_0x50680a(0x6b1)]>0x0&&(this[_0x50680a(0x6b1)]-=_0x1c9cd9,this[_0x50680a(0x6b1)]<=0x0?(this[_0x50680a(0x6b1)]=0x0,this['dirPlus']=0x0,_0x309672=0x0,_0x39bed0=0x0):_0x39bed0==0x0?(_0x309672+=_0x1c9cd9/(this[_0x50680a(0x46b)]*_0x305a94['hitReturnRatio']),this[_0x50680a(0x1bb)]=_0x14faaf['lerp'](0x0,this[_0x50680a(0x887)],Math[_0x50680a(0x176)](0x1,_0x309672)),_0x309672>=0x1&&(_0x309672=0x1,_0x39bed0=0x1)):(_0x309672-=_0x1c9cd9/(this[_0x50680a(0x46b)]*(0x1-_0x305a94[_0x50680a(0x4ee)])),this[_0x50680a(0x1bb)]=_0x14faaf[_0x50680a(0x829)](0x0,this['targetAngle'],Math['max'](0x0,_0x309672))));},this[_0x359b80(0x1c3)]=function(){var _0x2db9e7=_0x359b80;this[_0x2db9e7(0x6b1)]=this[_0x2db9e7(0x46b)]=0x258,this[_0x2db9e7(0x887)]=Math['PI']*0.8,_0x309672=0x0,_0x39bed0=0x0;},this['changeHealth']=function(_0x5d86c1,_0x243a3e,_0x535ed5){var _0x5e3619=_0x359b80;if(this[_0x5e3619(0x4ab)]){this[_0x5e3619(0x1d7)]+=_0x5d86c1;if(_0x535ed5){if(this[_0x5e3619(0x1b4)]&&!_0x14faaf[_0x5e3619(0x1af)](0x0,this[_0x5e3619(0x1b4)]))this[_0x5e3619(0x4f2)]=_0x535ed5,this[_0x5e3619(0x965)]=0x0,this[_0x5e3619(0x162)]=0x7d0;else{if(this[_0x5e3619(0x471)]&&this[_0x5e3619(0x3e1)]&&_0x535ed5['isPlayer'])this['chargeTarget']=_0x535ed5,this[_0x5e3619(0x965)]=0x0,this[_0x5e3619(0x162)]=0x1f40;else!this[_0x5e3619(0x551)]&&(this[_0x5e3619(0x4f2)]=_0x535ed5,this[_0x5e3619(0x965)]=0x0,this['moveCount']=0x7d0);}}if(_0x5d86c1<0x0&&this[_0x5e3619(0x6d0)]&&_0x14faaf[_0x5e3619(0x1af)](0x0,0x1))this['hitWait']=0x1f4;_0x243a3e&&_0x243a3e[_0x5e3619(0x35c)](this)&&_0x5d86c1<0x0&&_0x24c84b[_0x5e3619(0x1a6)](_0x243a3e['id'],'t',Math[_0x5e3619(0x131)](this['x']),Math[_0x5e3619(0x131)](this['y']),Math[_0x5e3619(0x131)](-_0x5d86c1),0x1);if(this[_0x5e3619(0x1d7)]<=0x0){this['spawnDelay']?(this[_0x5e3619(0x657)]=this[_0x5e3619(0x2d6)],this['x']=-0xf4240,this['y']=-0xf4240):(this['x']=this[_0x5e3619(0x497)]||_0x14faaf[_0x5e3619(0x1af)](0x0,_0x305a94['mapScale']),this['y']=this[_0x5e3619(0x5b1)]||_0x14faaf[_0x5e3619(0x1af)](0x0,_0x305a94['mapScale']));this['health']=this[_0x5e3619(0x8fe)],this[_0x5e3619(0x4f2)]=null;if(_0x243a3e){_0x3e25a1(_0x243a3e,this[_0x5e3619(0x9a7)]);if(this[_0x5e3619(0x70f)])for(var _0x11db4a=0x0;_0x11db4a<this[_0x5e3619(0x70f)][_0x5e3619(0x404)];){_0x243a3e[_0x5e3619(0x423)](_0x305a94[_0x5e3619(0x5ca)]['indexOf'](this['drop'][_0x11db4a]),this['drop'][_0x11db4a+0x1]),_0x11db4a+=0x2;}}}}};};},'./src/js/data/aiManager.js':function(_0x2d5892,_0x155a07){var _0x3d8cf8=_0xfd30c1;_0x2d5892[_0x3d8cf8(0x245)]=function(_0x1c0b23,_0x281a67,_0x1ee648,_0x36ae86,_0x3c958a,_0x458c2b,_0x4b1042,_0x209752,_0x44067f){var _0xd168e2=_0x3d8cf8;this['aiTypes']=[{'id':0x0,'src':'cow_1','killScore':0x96,'health':0x1f4,'weightM':0.8,'speed':0.00095,'turnSpeed':0.001,'scale':0x48,'drop':['food',0x32]},{'id':0x1,'src':'pig_1','killScore':0xc8,'health':0x320,'weightM':0.6,'speed':0.00085,'turnSpeed':0.001,'scale':0x48,'drop':[_0xd168e2(0x594),0x50]},{'id':0x2,'name':'Bull','src':'bull_2','hostile':!![],'dmg':0x14,'killScore':0x3e8,'health':0x708,'weightM':0.5,'speed':0.00094,'turnSpeed':0.00074,'scale':0x4e,'viewRange':0x320,'chargePlayer':!![],'drop':['food',0x64]},{'id':0x3,'name':_0xd168e2(0x53c),'src':_0xd168e2(0x61c),'hostile':!![],'dmg':0x14,'killScore':0x7d0,'health':0xaf0,'weightM':0.45,'speed':0.001,'turnSpeed':0.0008,'scale':0x5a,'viewRange':0x384,'chargePlayer':!![],'drop':['food',0x190]},{'id':0x4,'name':_0xd168e2(0x930),'src':_0xd168e2(0x38e),'hostile':!![],'dmg':0x8,'killScore':0x1f4,'health':0x12c,'weightM':0.45,'speed':0.001,'turnSpeed':0.002,'scale':0x54,'viewRange':0x320,'chargePlayer':!![],'drop':[_0xd168e2(0x594),0xc8]},{'id':0x5,'name':'Quack','src':_0xd168e2(0x375),'dmg':0x8,'killScore':0x7d0,'noTrap':!![],'health':0x12c,'weightM':0.2,'speed':0.0018,'turnSpeed':0.006,'scale':0x46,'drop':['food',0x64]},{'id':0x6,'name':_0xd168e2(0x645),'nameScale':0x32,'src':_0xd168e2(0x4a0),'hostile':!![],'dontRun':!![],'fixedSpawn':!![],'spawnDelay':0xea60,'noTrap':!![],'colDmg':0x64,'dmg':0x28,'killScore':0x1f40,'health':0x4650,'weightM':0.4,'speed':0.0007,'turnSpeed':0.01,'scale':0x50,'spriteMlt':1.8,'leapForce':0.9,'viewRange':0x3e8,'hitRange':0xd2,'hitDelay':0x3e8,'chargePlayer':!![],'drop':[_0xd168e2(0x594),0x64]},{'id':0x7,'name':_0xd168e2(0x4a4),'hostile':!![],'nameScale':0x23,'src':'crate_1','fixedSpawn':!![],'spawnDelay':0x1d4c0,'colDmg':0xc8,'killScore':0x1388,'health':0x4e20,'weightM':0.1,'speed':0x0,'turnSpeed':0x0,'scale':0x46,'spriteMlt':0x1},{'id':0x8,'name':_0xd168e2(0x1ae),'src':_0xd168e2(0x5b0),'hostile':!![],'fixedSpawn':!![],'dontRun':!![],'hitScare':0x4,'spawnDelay':0x7530,'noTrap':!![],'nameScale':0x23,'dmg':0xa,'colDmg':0x64,'killScore':0xbb8,'health':0x1b58,'weightM':0.45,'speed':0.0015,'turnSpeed':0.002,'scale':0x5a,'viewRange':0x320,'chargePlayer':!![],'drop':[_0xd168e2(0x594),0x3e8]}],this['spawn']=function(_0x2e01cc,_0x5e0d47,_0x581a80,_0x72b69){var _0x1fb795=_0xd168e2,_0x1bb1f4;for(var _0x5beaa3=0x0;_0x5beaa3<_0x1c0b23[_0x1fb795(0x404)];++_0x5beaa3){if(!_0x1c0b23[_0x5beaa3][_0x1fb795(0x4ab)]){_0x1bb1f4=_0x1c0b23[_0x5beaa3];break;}}return!_0x1bb1f4&&(_0x1bb1f4=new _0x281a67(_0x1c0b23[_0x1fb795(0x404)],_0x3c958a,_0x1ee648,_0x36ae86,_0x4b1042,_0x458c2b,_0x209752,_0x44067f),_0x1c0b23[_0x1fb795(0x333)](_0x1bb1f4)),_0x1bb1f4[_0x1fb795(0x4b1)](_0x2e01cc,_0x5e0d47,_0x581a80,_0x72b69,this[_0x1fb795(0x346)][_0x72b69]),_0x1bb1f4;};};},'./src/js/data/gameObject.js':function(_0x424203,_0x3d9413){_0x424203['exports']=function(_0x3908a6){var _0x3a0a81=_0x2943;this[_0x3a0a81(0x204)]=_0x3908a6,this[_0x3a0a81(0x4b1)]=function(_0x3d3111,_0x8c5d38,_0x5bc8bd,_0xb6a94b,_0x5c2df7,_0x5a1eec,_0x3521f0){var _0x2fc481=_0x3a0a81;_0x5a1eec=_0x5a1eec||{},this[_0x2fc481(0x6a4)]={},this['gridLocations']=[],this[_0x2fc481(0x4ab)]=!![],this[_0x2fc481(0x8f1)]=_0x5a1eec[_0x2fc481(0x8f1)],this['x']=_0x3d3111,this['y']=_0x8c5d38,this[_0x2fc481(0x8a0)]=_0x5bc8bd,this['xWiggle']=0x0,this[_0x2fc481(0x8be)]=0x0,this[_0x2fc481(0x5d9)]=_0xb6a94b,this[_0x2fc481(0x669)]=_0x5c2df7,this['id']=_0x5a1eec['id'],this[_0x2fc481(0x1e6)]=_0x3521f0,this['name']=_0x5a1eec[_0x2fc481(0x2f1)],this[_0x2fc481(0x521)]=this['id']!=undefined,this[_0x2fc481(0x408)]=_0x5a1eec[_0x2fc481(0x408)],this[_0x2fc481(0x1d7)]=_0x5a1eec[_0x2fc481(0x1d7)],this['layer']=0x2;if(this[_0x2fc481(0x408)]!=undefined)this[_0x2fc481(0x2aa)]=this[_0x2fc481(0x408)][_0x2fc481(0x2aa)];else{if(this[_0x2fc481(0x669)]==0x0)this['layer']=0x3;else{if(this[_0x2fc481(0x669)]==0x2)this[_0x2fc481(0x2aa)]=0x0;else this[_0x2fc481(0x669)]==0x4&&(this[_0x2fc481(0x2aa)]=-0x1);}}this[_0x2fc481(0x5fd)]=_0x5a1eec[_0x2fc481(0x5fd)]||0x1,this[_0x2fc481(0x81b)]=_0x5a1eec['blocker'],this[_0x2fc481(0x2d4)]=_0x5a1eec[_0x2fc481(0x2d4)],this[_0x2fc481(0x882)]=_0x5a1eec[_0x2fc481(0x882)],this[_0x2fc481(0x799)]=_0x5a1eec[_0x2fc481(0x799)],this[_0x2fc481(0x5b2)]=_0x5a1eec['friction'],this[_0x2fc481(0x723)]=_0x5a1eec[_0x2fc481(0x723)],this[_0x2fc481(0x173)]=_0x5a1eec[_0x2fc481(0x173)],this[_0x2fc481(0x35a)]=_0x5a1eec['pDmg'],this['pps']=_0x5a1eec['pps'],this[_0x2fc481(0x3f2)]=_0x5a1eec[_0x2fc481(0x3f2)]||0x0,this[_0x2fc481(0x1f7)]=_0x5a1eec['turnSpeed'],this['req']=_0x5a1eec['req'],this['trap']=_0x5a1eec[_0x2fc481(0x49b)],this[_0x2fc481(0x152)]=_0x5a1eec[_0x2fc481(0x152)],this['teleport']=_0x5a1eec[_0x2fc481(0x24f)],this[_0x2fc481(0x85d)]=_0x5a1eec[_0x2fc481(0x85d)],this[_0x2fc481(0x4a5)]=_0x5a1eec[_0x2fc481(0x4a5)],this['shootRange']=_0x5a1eec[_0x2fc481(0x4e2)],this['shootRate']=_0x5a1eec[_0x2fc481(0x78d)],this[_0x2fc481(0x277)]=this[_0x2fc481(0x78d)],this[_0x2fc481(0x3db)]=_0x5a1eec[_0x2fc481(0x3db)];},this[_0x3a0a81(0x950)]=function(_0x47e4b2,_0x1668d7){var _0x42172b=_0x3a0a81;return this[_0x42172b(0x1d7)]+=_0x47e4b2,this['health']<=0x0;},this[_0x3a0a81(0x54b)]=function(_0x432268,_0x5d3733){var _0x4c79e7=_0x3a0a81;return _0x432268=_0x432268||0x1,this[_0x4c79e7(0x5d9)]*(this[_0x4c79e7(0x521)]||this[_0x4c79e7(0x669)]==0x2||this[_0x4c79e7(0x669)]==0x3||this['type']==0x4?0x1:0.6*_0x432268)*(_0x5d3733?0x1:this[_0x4c79e7(0x5fd)]);},this[_0x3a0a81(0x69a)]=function(_0xa887db){var _0x4e2188=_0x3a0a81;return!this[_0x4e2188(0x799)]||this[_0x4e2188(0x1e6)]&&(this[_0x4e2188(0x1e6)]==_0xa887db||this[_0x4e2188(0x1e6)][_0x4e2188(0x2b8)]&&_0xa887db[_0x4e2188(0x2b8)]==this[_0x4e2188(0x1e6)][_0x4e2188(0x2b8)]);},this[_0x3a0a81(0x767)]=function(_0x2b7d48){var _0x4e136a=_0x3a0a81;this[_0x4e136a(0x4ab)]&&(this[_0x4e136a(0x4f8)]&&(this[_0x4e136a(0x4f8)]*=Math[_0x4e136a(0x11f)](0.99,_0x2b7d48)),this[_0x4e136a(0x8be)]&&(this[_0x4e136a(0x8be)]*=Math[_0x4e136a(0x11f)](0.99,_0x2b7d48)),this[_0x4e136a(0x1f7)]&&((!modVisual||this['dmg'])&&(this['dir']+=this['turnSpeed']*_0x2b7d48)));};};},'./src/js/data/items.js':function(_0x5948ed,_0x23b667){var _0x14b389=_0xfd30c1;_0x5948ed[_0x14b389(0x245)]['groups']=[{'id':0x0,'name':_0x14b389(0x594),'layer':0x0},{'id':0x1,'name':'walls','place':!![],'limit':0x1e,'layer':0x0},{'id':0x2,'name':_0x14b389(0x2a9),'place':!![],'limit':0xf,'layer':0x0},{'id':0x3,'name':_0x14b389(0x4ca),'place':!![],'limit':0x7,'layer':0x1},{'id':0x4,'name':_0x14b389(0x4d4),'place':!![],'limit':0x1,'layer':0x0},{'id':0x5,'name':_0x14b389(0x49b),'place':!![],'limit':0x6,'layer':-0x1},{'id':0x6,'name':_0x14b389(0x6be),'place':!![],'limit':0xc,'layer':-0x1},{'id':0x7,'name':_0x14b389(0x281),'place':!![],'limit':0x2,'layer':0x1},{'id':0x8,'name':_0x14b389(0x61e),'place':!![],'limit':0xc,'layer':0x1},{'id':0x9,'name':_0x14b389(0x1e7),'place':!![],'limit':0x4,'layer':-0x1},{'id':0xa,'name':_0x14b389(0x4f5),'place':!![],'limit':0x1,'layer':-0x1},{'id':0xb,'name':'sapling','place':!![],'limit':0x2,'layer':0x0},{'id':0xc,'name':_0x14b389(0x81b),'place':!![],'limit':0x3,'layer':-0x1},{'id':0xd,'name':'teleporter','place':!![],'limit':0x2,'layer':-0x1}],_0x23b667[_0x14b389(0x217)]=[{'indx':0x0,'layer':0x0,'src':_0x14b389(0x419),'dmg':0x19,'speed':1.6,'scale':0x67,'range':0x3e8},{'indx':0x1,'layer':0x1,'dmg':0x19,'scale':0x14},{'indx':0x0,'layer':0x0,'src':'arrow_1','dmg':0x23,'speed':2.5,'scale':0x67,'range':0x4b0},{'indx':0x0,'layer':0x0,'src':_0x14b389(0x419),'dmg':0x1e,'speed':0x2,'scale':0x67,'range':0x4b0},{'indx':0x1,'layer':0x1,'dmg':0x10,'scale':0x14},{'indx':0x0,'layer':0x0,'src':_0x14b389(0x8c4),'dmg':0x32,'speed':3.6,'scale':0xa0,'range':0x578}],_0x23b667['weapons']=[{'id':0x0,'type':0x0,'name':_0x14b389(0x975),'desc':'tool\x20for\x20gathering\x20all\x20resources','src':_0x14b389(0x221),'length':0x8c,'width':0x8c,'xOff':-0x3,'yOff':0x12,'dmg':0x19,'range':0x41,'gather':0x1,'speed':0x12c,'count':0x3},{'id':0x1,'type':0x0,'age':0x2,'name':_0x14b389(0x6a8),'desc':'gathers\x20resources\x20at\x20a\x20higher\x20rate','src':'axe_1','length':0x8c,'width':0x8c,'xOff':0x3,'yOff':0x18,'dmg':0x1e,'spdMult':0x1,'range':0x46,'gather':0x2,'speed':0x190,'count':0x4},{'id':0x2,'type':0x0,'age':0x8,'pre':0x1,'name':_0x14b389(0x294),'desc':_0x14b389(0x1d2),'src':_0x14b389(0x3c6),'length':0x8c,'width':0x8c,'xOff':-0x8,'yOff':0x19,'dmg':0x23,'spdMult':0x1,'range':0x4b,'gather':0x4,'speed':0x190,'count':0x4},{'id':0x3,'type':0x0,'age':0x2,'name':_0x14b389(0x672),'desc':'increased\x20attack\x20power\x20but\x20slower\x20move\x20speed','src':_0x14b389(0x46c),'iPad':1.3,'length':0x82,'width':0xd2,'xOff':-0x8,'yOff':0x2e,'dmg':0x23,'spdMult':0.85,'range':0x6e,'gather':0x1,'speed':0x12c,'count':0x3},{'id':0x4,'type':0x0,'age':0x8,'pre':0x3,'name':_0x14b389(0x8a3),'desc':_0x14b389(0x385),'src':'samurai_1','iPad':1.3,'length':0x82,'width':0xd2,'xOff':-0x8,'yOff':0x3b,'dmg':0x28,'spdMult':0.8,'range':0x76,'gather':0x1,'speed':0x12c,'count':0x3},{'id':0x5,'type':0x0,'age':0x2,'name':_0x14b389(0x6dd),'desc':_0x14b389(0x51c),'src':'spear_1','iPad':1.3,'length':0x82,'width':0xd2,'xOff':-0x8,'yOff':0x35,'dmg':0x2d,'knock':0.2,'spdMult':0.82,'range':0x8e,'gather':0x1,'speed':0x2bc,'count':0x7},{'id':0x6,'type':0x0,'age':0x2,'name':_0x14b389(0x4b4),'desc':_0x14b389(0x7e2),'src':_0x14b389(0x10d),'iPad':1.3,'length':0x6e,'width':0xb4,'xOff':-0x8,'yOff':0x35,'dmg':0x14,'knock':0.7,'range':0x6e,'gather':0x1,'speed':0x12c,'count':0x3},{'id':0x7,'type':0x0,'age':0x2,'name':'daggers','desc':_0x14b389(0x364),'src':_0x14b389(0x3c7),'iPad':0.8,'length':0x6e,'width':0x6e,'xOff':0x12,'yOff':0x0,'dmg':0x14,'knock':0.1,'range':0x41,'gather':0x1,'hitSlow':0.1,'spdMult':1.13,'speed':0x64,'count':0x1},{'id':0x8,'type':0x0,'age':0x2,'name':_0x14b389(0x1b9),'desc':'great\x20for\x20gathering\x20but\x20very\x20weak','src':_0x14b389(0x879),'length':0x8c,'width':0x8c,'xOff':0x3,'yOff':0x18,'dmg':0x1,'spdMult':0x1,'range':0x46,'gather':0x7,'speed':0x190,'count':0x4},{'id':0x9,'type':0x1,'age':0x6,'name':'hunting\x20bow','desc':_0x14b389(0x178),'src':_0x14b389(0x4d6),'req':['wood',0x4],'length':0x78,'width':0x78,'xOff':-0x6,'yOff':0x0,'Pdmg':0x19,'projectile':0x0,'spdMult':0.75,'speed':0x258,'count':0x6},{'id':0xa,'type':0x1,'age':0x6,'name':_0x14b389(0x6e6),'desc':_0x14b389(0x50e),'src':_0x14b389(0x5c3),'length':0x8c,'width':0x8c,'xOff':-0x9,'yOff':0x19,'dmg':0xa,'spdMult':0.88,'range':0x4b,'sDmg':7.5,'gather':0x1,'speed':0x190,'count':0x4},{'id':0xb,'type':0x1,'age':0x6,'name':_0x14b389(0x565),'desc':_0x14b389(0x7a6),'src':_0x14b389(0x7a3),'length':0x78,'width':0x78,'shield':0.2,'xOff':0x6,'yOff':0x0,'Pdmg':0x0,'spdMult':0.7},{'id':0xc,'type':0x1,'age':0x8,'pre':0x9,'name':_0x14b389(0x2ed),'desc':'deals\x20more\x20damage\x20and\x20has\x20greater\x20range','src':_0x14b389(0x21d),'req':[_0x14b389(0x532),0x5],'aboveHand':!![],'armS':0.75,'length':0x78,'width':0x78,'xOff':-0x4,'yOff':0x0,'Pdmg':0x23,'projectile':0x2,'spdMult':0.7,'speed':0x2bc,'count':0x7},{'id':0xd,'type':0x1,'age':0x9,'pre':0xc,'name':'repeater\x20crossbow','desc':_0x14b389(0x34f),'src':_0x14b389(0x7a8),'req':[_0x14b389(0x532),0xa],'aboveHand':!![],'armS':0.75,'length':0x78,'width':0x78,'xOff':-0x4,'yOff':0x0,'Pdmg':0x1e,'projectile':0x3,'spdMult':0.7,'speed':0xe6,'count':0x3},{'id':0xe,'type':0x1,'age':0x6,'name':_0x14b389(0x690),'desc':_0x14b389(0x250),'src':_0x14b389(0x3f9),'length':0x82,'width':0xd2,'xOff':-0x8,'yOff':0x35,'dmg':0x0,'steal':0xfa,'knock':0.2,'spdMult':1.05,'range':0x7d,'gather':0x0,'speed':0x2bc,'count':0x7},{'id':0xf,'type':0x1,'age':0x9,'pre':0xc,'name':_0x14b389(0x97b),'desc':'slow\x20firerate\x20but\x20high\x20damage\x20and\x20range','src':_0x14b389(0x199),'req':[_0x14b389(0x29f),0xa],'aboveHand':!![],'rec':0.35,'armS':0.6,'hndS':0.3,'hndD':1.6,'length':0xcd,'width':0xcd,'xOff':0x19,'yOff':0x0,'Pdmg':0x32,'projectile':0x5,'hideProjectile':!![],'spdMult':0.6,'speed':0x5dc,'count':0xf}],_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)]=[{'group':_0x5948ed[_0x14b389(0x245)]['groups'][0x0],'name':_0x14b389(0x841),'desc':_0x14b389(0x977),'req':[_0x14b389(0x594),0xa],'consume':function(_0xdedf6f){var _0x530fd2=_0x14b389;return _0xdedf6f[_0x530fd2(0x950)](0x14,_0xdedf6f);},'scale':0x16,'holdOffset':0xf},{'age':0x3,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x0],'name':_0x14b389(0x530),'desc':_0x14b389(0x246),'req':['food',0xf],'consume':function(_0x33f833){var _0x32e025=_0x14b389;return _0x33f833[_0x32e025(0x950)](0x28,_0x33f833);},'scale':0x1b,'holdOffset':0xf},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x0],'name':_0x14b389(0x449),'desc':_0x14b389(0x96b),'req':[_0x14b389(0x594),0x19],'consume':function(_0xd056c5){var _0x23a281=_0x14b389;if(_0xd056c5[_0x23a281(0x950)](0x1e,_0xd056c5)||_0xd056c5[_0x23a281(0x1d7)]<0x64)return _0xd056c5[_0x23a281(0x58f)][_0x23a281(0x173)]=-0xa,_0xd056c5[_0x23a281(0x58f)][_0x23a281(0x8e1)]=_0xd056c5,_0xd056c5['dmgOverTime'][_0x23a281(0x8ab)]=0x5,!![];return![];},'scale':0x1b,'holdOffset':0xf},{'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x1],'name':_0x14b389(0x845),'desc':'provides\x20protection\x20for\x20your\x20village','req':['wood',0xa],'projDmg':!![],'health':0x17c,'scale':0x32,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x3,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x1],'name':_0x14b389(0x2c9),'desc':_0x14b389(0x4ff),'req':[_0x14b389(0x29f),0x19],'health':0x384,'scale':0x32,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x1],'name':_0x14b389(0x7ff),'desc':_0x14b389(0x328),'req':[_0x14b389(0x29f),0x23],'health':0x5dc,'scale':0x34,'holdOffset':0x14,'placeOffset':-0x5},{'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x2],'name':_0x14b389(0x2a9),'desc':_0x14b389(0x6ca),'req':[_0x14b389(0x532),0x14,_0x14b389(0x29f),0x5],'health':0x190,'dmg':0x14,'scale':0x31,'spritePadding':-0x17,'holdOffset':0x8,'placeOffset':-0x5},{'age':0x5,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x2],'name':_0x14b389(0x8f0),'desc':'damages\x20enemies\x20when\x20they\x20touch\x20them','req':[_0x14b389(0x532),0x1e,_0x14b389(0x29f),0xa],'health':0x1f4,'dmg':0x23,'scale':0x34,'spritePadding':-0x17,'holdOffset':0x8,'placeOffset':-0x5},{'age':0x9,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x2],'name':'poison\x20spikes','desc':'poisons\x20enemies\x20when\x20they\x20touch\x20them','req':['wood',0x23,_0x14b389(0x29f),0xf],'health':0x258,'dmg':0x1e,'pDmg':0x5,'scale':0x34,'spritePadding':-0x17,'holdOffset':0x8,'placeOffset':-0x5},{'age':0x9,'group':_0x5948ed[_0x14b389(0x245)]['groups'][0x2],'name':'spinning\x20spikes','desc':_0x14b389(0x6ca),'req':[_0x14b389(0x532),0x1e,'stone',0x14],'health':0x1f4,'dmg':0x2d,'turnSpeed':0.003,'scale':0x34,'spritePadding':-0x17,'holdOffset':0x8,'placeOffset':-0x5},{'group':_0x5948ed[_0x14b389(0x245)]['groups'][0x3],'name':_0x14b389(0xf6),'desc':_0x14b389(0x432),'req':[_0x14b389(0x532),0x32,_0x14b389(0x29f),0xa],'health':0x190,'pps':0x1,'turnSpeed':0.0016,'spritePadding':0x19,'iconLineMult':0xc,'scale':0x2d,'holdOffset':0x14,'placeOffset':0x5},{'age':0x5,'group':_0x5948ed[_0x14b389(0x245)]['groups'][0x3],'name':'faster\x20windmill','desc':'generates\x20more\x20gold\x20over\x20time','req':[_0x14b389(0x532),0x3c,'stone',0x14],'health':0x1f4,'pps':1.5,'turnSpeed':0.0025,'spritePadding':0x19,'iconLineMult':0xc,'scale':0x2f,'holdOffset':0x14,'placeOffset':0x5},{'age':0x8,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x3],'name':_0x14b389(0x431),'desc':_0x14b389(0x7b5),'req':[_0x14b389(0x532),0x64,_0x14b389(0x29f),0x32],'health':0x320,'pps':0x2,'turnSpeed':0.005,'spritePadding':0x19,'iconLineMult':0xc,'scale':0x2f,'holdOffset':0x14,'placeOffset':0x5},{'age':0x5,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x4],'type':0x2,'name':'mine','desc':_0x14b389(0x695),'req':[_0x14b389(0x532),0x14,_0x14b389(0x29f),0x64],'iconLineMult':0xc,'scale':0x41,'holdOffset':0x14,'placeOffset':0x0},{'age':0x5,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0xb],'type':0x0,'name':_0x14b389(0x982),'desc':'allows\x20you\x20to\x20farm\x20wood','req':[_0x14b389(0x532),0x96],'iconLineMult':0xc,'colDiv':0.5,'scale':0x6e,'holdOffset':0x32,'placeOffset':-0xf},{'age':0x4,'group':_0x5948ed['exports'][_0x14b389(0x48d)][0x5],'name':_0x14b389(0x57e),'desc':_0x14b389(0x8a7),'req':[_0x14b389(0x532),0x1e,_0x14b389(0x29f),0x1e],'trap':!![],'ignoreCollision':!![],'hideFromEnemy':!![],'health':0x1f4,'colDiv':0.2,'scale':0x32,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x4,'group':_0x5948ed[_0x14b389(0x245)]['groups'][0x6],'name':_0x14b389(0x66b),'desc':_0x14b389(0x786),'req':[_0x14b389(0x29f),0x14,_0x14b389(0x532),0x5],'ignoreCollision':!![],'boostSpeed':1.5,'health':0x96,'colDiv':0.7,'scale':0x2d,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x7],'doUpdate':!![],'name':_0x14b389(0x281),'desc':'defensive\x20structure\x20that\x20shoots\x20at\x20enemies','req':[_0x14b389(0x532),0xc8,_0x14b389(0x29f),0x96],'health':0x320,'projectile':0x1,'shootRange':0x2bc,'shootRate':0x898,'scale':0x2b,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x8],'name':'platform','desc':_0x14b389(0x149),'req':['wood',0x14],'ignoreCollision':!![],'zIndex':0x1,'health':0x12c,'scale':0x2b,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0x9],'name':_0x14b389(0x717),'desc':_0x14b389(0x4d1),'req':[_0x14b389(0x532),0x1e,'food',0xa],'ignoreCollision':!![],'healCol':0xf,'health':0x190,'colDiv':0.7,'scale':0x2d,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x9,'group':_0x5948ed[_0x14b389(0x245)][_0x14b389(0x48d)][0xa],'name':_0x14b389(0x84a),'desc':_0x14b389(0x7db),'req':[_0x14b389(0x532),0x64,'stone',0x64],'health':0x190,'ignoreCollision':!![],'spawnPoint':!![],'scale':0x2d,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed[_0x14b389(0x245)]['groups'][0xc],'name':_0x14b389(0x81b),'desc':_0x14b389(0x82f),'req':[_0x14b389(0x532),0x1e,'stone',0x19],'ignoreCollision':!![],'blocker':0x12c,'health':0x190,'colDiv':0.7,'scale':0x2d,'holdOffset':0x14,'placeOffset':-0x5},{'age':0x7,'group':_0x5948ed['exports'][_0x14b389(0x48d)][0xd],'name':_0x14b389(0x922),'desc':_0x14b389(0x6b0),'req':[_0x14b389(0x532),0x3c,_0x14b389(0x29f),0x3c],'ignoreCollision':!![],'teleport':!![],'health':0xc8,'colDiv':0.7,'scale':0x2d,'holdOffset':0x14,'placeOffset':-0x5}];for(var _0x14cf5b=0x0;_0x14cf5b<_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)][_0x14b389(0x404)];++_0x14cf5b){_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)][_0x14cf5b]['id']=_0x14cf5b;if(_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)][_0x14cf5b][_0x14b389(0x8ca)])_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)][_0x14cf5b]['pre']=_0x14cf5b-_0x5948ed[_0x14b389(0x245)][_0x14b389(0x188)][_0x14cf5b][_0x14b389(0x8ca)];}if(typeof window!=='undefined'){function _0x5d3aca(_0x5b5e5b){var _0x12a87a=_0x14b389;for(let _0x27f008=_0x5b5e5b[_0x12a87a(0x404)]-0x1;_0x27f008>0x0;_0x27f008--){const _0x115cd7=Math[_0x12a87a(0x7ee)](Math[_0x12a87a(0x459)]()*(_0x27f008+0x1));[_0x5b5e5b[_0x27f008],_0x5b5e5b[_0x115cd7]]=[_0x5b5e5b[_0x115cd7],_0x5b5e5b[_0x27f008]];}return _0x5b5e5b;}}},'./src/js/data/mapManager.js':function(_0x4b5861,_0x1c1f1d){var _0x2db5aa=_0xfd30c1;_0x4b5861[_0x2db5aa(0x245)]={};},'./src/js/data/objectManager.js':function(_0x2bf388,_0x252e5d){var _0x1ddf7b=_0xfd30c1,_0x2a0742=Math[_0x1ddf7b(0x7ee)],_0x40b559=Math[_0x1ddf7b(0x11d)],_0xe45c15=Math[_0x1ddf7b(0x90f)],_0x11cc89=Math['sin'],_0x22d2ef=Math[_0x1ddf7b(0x11f)],_0xde4d1f=Math[_0x1ddf7b(0x934)];_0x2bf388['exports']=function(_0x460b8c,_0x11d083,_0x260f7f,_0x35ba32,_0x1d0ae6,_0x13fd11){var _0x26ef4b=_0x1ddf7b;this['objects']=_0x11d083,this[_0x26ef4b(0x8d7)]={},this[_0x26ef4b(0x651)]=[];var _0x2e8652,_0x44121c,_0x3bf921=_0x35ba32['mapScale']/_0x35ba32[_0x26ef4b(0x50f)];this[_0x26ef4b(0x160)]=function(_0x5971c1){var _0x37fa6c=_0x26ef4b,_0x5532a0=Math[_0x37fa6c(0x176)](_0x35ba32['mapScale'],Math[_0x37fa6c(0x77b)](0x0,_0x5971c1['x'])),_0x3a952f=Math[_0x37fa6c(0x176)](_0x35ba32['mapScale'],Math[_0x37fa6c(0x77b)](0x0,_0x5971c1['y']));for(var _0x4229fb=0x0;_0x4229fb<_0x35ba32['colGrid'];++_0x4229fb){_0x2e8652=_0x4229fb*_0x3bf921;for(var _0x532e58=0x0;_0x532e58<_0x35ba32['colGrid'];++_0x532e58){_0x44121c=_0x532e58*_0x3bf921;if(_0x5532a0+_0x5971c1['scale']>=_0x2e8652&&_0x5532a0-_0x5971c1['scale']<=_0x2e8652+_0x3bf921&&_0x3a952f+_0x5971c1[_0x37fa6c(0x5d9)]>=_0x44121c&&_0x3a952f-_0x5971c1[_0x37fa6c(0x5d9)]<=_0x44121c+_0x3bf921){if(!this[_0x37fa6c(0x8d7)][_0x4229fb+'_'+_0x532e58])this[_0x37fa6c(0x8d7)][_0x4229fb+'_'+_0x532e58]=[];this[_0x37fa6c(0x8d7)][_0x4229fb+'_'+_0x532e58]['push'](_0x5971c1),_0x5971c1[_0x37fa6c(0x8c1)][_0x37fa6c(0x333)](_0x4229fb+'_'+_0x532e58);}}}},this['removeObjGrid']=function(_0x2de97a){var _0x534445=_0x26ef4b,_0x5bcb6d;for(var _0x363f6e=0x0;_0x363f6e<_0x2de97a[_0x534445(0x8c1)][_0x534445(0x404)];++_0x363f6e){_0x5bcb6d=this['grids'][_0x2de97a['gridLocations'][_0x363f6e]][_0x534445(0x5b5)](_0x2de97a),_0x5bcb6d>=0x0&&this[_0x534445(0x8d7)][_0x2de97a['gridLocations'][_0x363f6e]][_0x534445(0x2d8)](_0x5bcb6d,0x1);}},this[_0x26ef4b(0x211)]=function(_0x2484c3){var _0x46af6b=_0x26ef4b;_0x2484c3['active']=![];if(_0x13fd11){if(_0x2484c3['owner']&&_0x2484c3['pps'])_0x2484c3[_0x46af6b(0x1e6)][_0x46af6b(0x721)]-=_0x2484c3[_0x46af6b(0x721)];this[_0x46af6b(0x6fb)](_0x2484c3);var _0x511f70=this[_0x46af6b(0x651)][_0x46af6b(0x5b5)](_0x2484c3);_0x511f70>=0x0&&this[_0x46af6b(0x651)]['splice'](_0x511f70,0x1);}},this[_0x26ef4b(0xee)]=function(_0x28c3c1,_0x1d7389){var _0x34f380=_0x26ef4b;for(var _0x34592b=0x0;_0x34592b<_0x1d0ae6[_0x34f380(0x404)];++_0x34592b){if(_0x1d0ae6[_0x34592b]['active']){if(_0x28c3c1['sentTo'][_0x1d0ae6[_0x34592b]['id']]){if(!_0x28c3c1['active'])_0x13fd11[_0x34f380(0x1a6)](_0x1d0ae6[_0x34592b]['id'],'12',_0x28c3c1[_0x34f380(0x204)]);else{if(_0x1d0ae6[_0x34592b]['canSee'](_0x28c3c1))_0x13fd11[_0x34f380(0x1a6)](_0x1d0ae6[_0x34592b]['id'],'8',_0x260f7f['fixTo'](_0x1d7389,0x1),_0x28c3c1[_0x34f380(0x204)]);}}if(!_0x28c3c1[_0x34f380(0x4ab)]&&_0x28c3c1[_0x34f380(0x1e6)]==_0x1d0ae6[_0x34592b])_0x1d0ae6[_0x34592b][_0x34f380(0x38c)](_0x28c3c1[_0x34f380(0x408)]['id'],-0x1);}}};var _0x41e1c8=[],_0x276f83;this[_0x26ef4b(0x352)]=function(_0x4bfbd0,_0x1b8747,_0x2050ce){var _0x24cc8f=_0x26ef4b;_0x2e8652=_0x2a0742(_0x4bfbd0/_0x3bf921),_0x44121c=_0x2a0742(_0x1b8747/_0x3bf921),_0x41e1c8[_0x24cc8f(0x404)]=0x0;try{if(this['grids'][_0x2e8652+'_'+_0x44121c])_0x41e1c8[_0x24cc8f(0x333)](this['grids'][_0x2e8652+'_'+_0x44121c]);if(_0x4bfbd0+_0x2050ce>=(_0x2e8652+0x1)*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652+0x1+'_'+_0x44121c];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);if(_0x44121c&&_0x1b8747-_0x2050ce<=_0x44121c*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652+0x1+'_'+(_0x44121c-0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}else{if(_0x1b8747+_0x2050ce>=(_0x44121c+0x1)*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652+0x1+'_'+(_0x44121c+0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}}}if(_0x2e8652&&_0x4bfbd0-_0x2050ce<=_0x2e8652*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652-0x1+'_'+_0x44121c];if(_0x276f83)_0x41e1c8['push'](_0x276f83);if(_0x44121c&&_0x1b8747-_0x2050ce<=_0x44121c*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652-0x1+'_'+(_0x44121c-0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}else{if(_0x1b8747+_0x2050ce>=(_0x44121c+0x1)*_0x3bf921){_0x276f83=this['grids'][_0x2e8652-0x1+'_'+(_0x44121c+0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}}}if(_0x1b8747+_0x2050ce>=(_0x44121c+0x1)*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652+'_'+(_0x44121c+0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}if(_0x44121c&&_0x1b8747-_0x2050ce<=_0x44121c*_0x3bf921){_0x276f83=this[_0x24cc8f(0x8d7)][_0x2e8652+'_'+(_0x44121c-0x1)];if(_0x276f83)_0x41e1c8[_0x24cc8f(0x333)](_0x276f83);}}catch(_0xad965){}return _0x41e1c8;};var _0x1ebc3c;this['add']=function(_0x581d3c,_0x4383c6,_0x51326f,_0x1bc2d1,_0xa55f67,_0x13f326,_0x831191,_0x51bddd,_0x32a4ca){var _0x45f730=_0x26ef4b;_0x1ebc3c=null;for(var _0x5a1dd2=0x0;_0x5a1dd2<_0x11d083['length'];++_0x5a1dd2){if(_0x11d083[_0x5a1dd2]['sid']==_0x581d3c){_0x1ebc3c=_0x11d083[_0x5a1dd2];break;}}if(!_0x1ebc3c)for(var _0x5a1dd2=0x0;_0x5a1dd2<_0x11d083[_0x45f730(0x404)];++_0x5a1dd2){if(!_0x11d083[_0x5a1dd2][_0x45f730(0x4ab)]){_0x1ebc3c=_0x11d083[_0x5a1dd2];break;}}!_0x1ebc3c&&(_0x1ebc3c=new _0x460b8c(_0x581d3c),_0x11d083[_0x45f730(0x333)](_0x1ebc3c));if(_0x51bddd)_0x1ebc3c[_0x45f730(0x204)]=_0x581d3c;_0x1ebc3c[_0x45f730(0x4b1)](_0x4383c6,_0x51326f,_0x1bc2d1,_0xa55f67,_0x13f326,_0x831191,_0x32a4ca);if(_0x13fd11){this[_0x45f730(0x160)](_0x1ebc3c);if(_0x1ebc3c[_0x45f730(0x8f1)])this[_0x45f730(0x651)][_0x45f730(0x333)](_0x1ebc3c);}},this[_0x26ef4b(0x564)]=function(_0x6c4b47){var _0x2b163a=_0x26ef4b;for(var _0x2ce27c=0x0;_0x2ce27c<_0x11d083[_0x2b163a(0x404)];++_0x2ce27c){if(_0x11d083[_0x2ce27c][_0x2b163a(0x204)]==_0x6c4b47){this[_0x2b163a(0x211)](_0x11d083[_0x2ce27c]);break;}}},this[_0x26ef4b(0x814)]=function(_0x322442,_0x57b007){var _0x123a29=_0x26ef4b;for(var _0x5c5569=0x0;_0x5c5569<_0x11d083[_0x123a29(0x404)];++_0x5c5569){_0x11d083[_0x5c5569][_0x123a29(0x4ab)]&&_0x11d083[_0x5c5569][_0x123a29(0x1e6)]&&_0x11d083[_0x5c5569][_0x123a29(0x1e6)][_0x123a29(0x204)]==_0x322442&&this[_0x123a29(0x211)](_0x11d083[_0x5c5569]);}_0x57b007&&_0x57b007[_0x123a29(0x506)]('13',_0x322442);},this[_0x26ef4b(0x751)]=function(_0x8cd9e){var _0x2ff955=_0x26ef4b,_0x5cdb39=null;for(var _0x27fe46=0x0;_0x27fe46<_0x11d083[_0x2ff955(0x404)];++_0x27fe46){_0x1ebc3c=_0x11d083[_0x27fe46];if(_0x1ebc3c['active']&&_0x1ebc3c[_0x2ff955(0x1e6)]&&_0x1ebc3c[_0x2ff955(0x1e6)][_0x2ff955(0x204)]==_0x8cd9e&&_0x1ebc3c[_0x2ff955(0x3db)]){_0x5cdb39=[_0x1ebc3c['x'],_0x1ebc3c['y']],this[_0x2ff955(0x211)](_0x1ebc3c),_0x13fd11[_0x2ff955(0x506)]('12',_0x1ebc3c[_0x2ff955(0x204)]);_0x1ebc3c[_0x2ff955(0x1e6)]&&_0x1ebc3c[_0x2ff955(0x1e6)][_0x2ff955(0x38c)](_0x1ebc3c[_0x2ff955(0x408)]['id'],-0x1);break;}}return _0x5cdb39;},this[_0x26ef4b(0x26b)]=function(_0x1123b9,_0x147752,_0x50115d,_0x1e0097,_0xc1e04e,_0x13355b,_0x5e1d40){var _0x234cf9=_0x26ef4b;for(var _0x5d9d5f=0x0;_0x5d9d5f<_0x11d083[_0x234cf9(0x404)];++_0x5d9d5f){var _0x59fc46=_0x11d083[_0x5d9d5f]['blocker']?_0x11d083[_0x5d9d5f]['blocker']:_0x11d083[_0x5d9d5f][_0x234cf9(0x54b)](_0x1e0097,_0x11d083[_0x5d9d5f][_0x234cf9(0x521)]);if(_0x11d083[_0x5d9d5f][_0x234cf9(0x4ab)]&&_0x260f7f[_0x234cf9(0x596)](_0x1123b9,_0x147752,_0x11d083[_0x5d9d5f]['x'],_0x11d083[_0x5d9d5f]['y'])<_0x50115d+_0x59fc46)return![];}if(!_0x13355b&&_0xc1e04e!=0x12&&_0x147752>=_0x35ba32[_0x234cf9(0x141)]/0x2-_0x35ba32[_0x234cf9(0x386)]/0x2&&_0x147752<=_0x35ba32['mapScale']/0x2+_0x35ba32['riverWidth']/0x2)return![];return!![];},this[_0x26ef4b(0x4af)]=function(_0x3717e8,_0x2d9e6f,_0x447ffa,_0xe5d4eb,_0x236acd){var _0x4e3f8a=_0x26ef4b,_0x405e4b=items[_0x4e3f8a(0x217)][_0x236acd],_0x286309;for(var _0x2d9fb4=0x0;_0x2d9fb4<projectiles[_0x4e3f8a(0x404)];++_0x2d9fb4){if(!projectiles[_0x2d9fb4][_0x4e3f8a(0x4ab)]){_0x286309=projectiles[_0x2d9fb4];break;}}!_0x286309&&(_0x286309=new Projectile(_0x1d0ae6,_0x260f7f),projectiles[_0x4e3f8a(0x333)](_0x286309)),_0x286309[_0x4e3f8a(0x4b1)](_0x236acd,_0x3717e8,_0x2d9e6f,_0x447ffa,_0x405e4b[_0x4e3f8a(0x737)],_0xe5d4eb,_0x405e4b[_0x4e3f8a(0x5d9)]);},this[_0x26ef4b(0x296)]=function(_0x56848b,_0x137f11,_0x5b60cf){var _0x4f1be8=_0x26ef4b;_0x5b60cf=_0x5b60cf||0x1;var _0x118f5c=_0x56848b['x']-_0x137f11['x'],_0x7f32b9=_0x56848b['y']-_0x137f11['y'],_0x525ba2=_0x56848b['scale']+_0x137f11[_0x4f1be8(0x5d9)];if(_0x40b559(_0x118f5c)<=_0x525ba2||_0x40b559(_0x7f32b9)<=_0x525ba2){_0x525ba2=_0x56848b[_0x4f1be8(0x5d9)]+(_0x137f11[_0x4f1be8(0x54b)]?_0x137f11[_0x4f1be8(0x54b)]():_0x137f11[_0x4f1be8(0x5d9)]);var _0x307008=_0xde4d1f(_0x118f5c*_0x118f5c+_0x7f32b9*_0x7f32b9)-_0x525ba2;if(_0x307008<=0x0){if(!_0x137f11[_0x4f1be8(0x2d4)]){var _0x3e49a5=_0x260f7f[_0x4f1be8(0x743)](_0x56848b['x'],_0x56848b['y'],_0x137f11['x'],_0x137f11['y']),_0x2bdc33=_0x260f7f[_0x4f1be8(0x596)](_0x56848b['x'],_0x56848b['y'],_0x137f11['x'],_0x137f11['y']);_0x137f11[_0x4f1be8(0x526)]?(_0x307008=_0x307008*-0x1/0x2,_0x56848b['x']+=_0x307008*_0xe45c15(_0x3e49a5),_0x56848b['y']+=_0x307008*_0x11cc89(_0x3e49a5),_0x137f11['x']-=_0x307008*_0xe45c15(_0x3e49a5),_0x137f11['y']-=_0x307008*_0x11cc89(_0x3e49a5)):(_0x56848b['x']=_0x137f11['x']+_0x525ba2*_0xe45c15(_0x3e49a5),_0x56848b['y']=_0x137f11['y']+_0x525ba2*_0x11cc89(_0x3e49a5),_0x56848b['xVel']*=0.75,_0x56848b[_0x4f1be8(0x56e)]*=0.75);if(_0x137f11[_0x4f1be8(0x173)]&&_0x137f11[_0x4f1be8(0x1e6)]!=_0x56848b&&!(_0x137f11['owner']&&_0x137f11[_0x4f1be8(0x1e6)][_0x4f1be8(0x2b8)]&&_0x137f11[_0x4f1be8(0x1e6)][_0x4f1be8(0x2b8)]==_0x56848b['team'])){_0x56848b[_0x4f1be8(0x950)](-_0x137f11['dmg'],_0x137f11[_0x4f1be8(0x1e6)],_0x137f11);var _0x5d2b74=1.5*(_0x137f11[_0x4f1be8(0x2c0)]||0x1);_0x56848b[_0x4f1be8(0x60a)]+=_0x5d2b74*_0xe45c15(_0x3e49a5),_0x56848b[_0x4f1be8(0x56e)]+=_0x5d2b74*_0x11cc89(_0x3e49a5);_0x137f11[_0x4f1be8(0x35a)]&&!(_0x56848b['skin']&&_0x56848b[_0x4f1be8(0x36b)][_0x4f1be8(0x23e)])&&(_0x56848b['dmgOverTime']['dmg']=_0x137f11[_0x4f1be8(0x35a)],_0x56848b['dmgOverTime'][_0x4f1be8(0x8ab)]=0x5,_0x56848b['dmgOverTime']['doer']=_0x137f11[_0x4f1be8(0x1e6)]);if(_0x56848b[_0x4f1be8(0x8b6)]&&_0x137f11[_0x4f1be8(0x1d7)]){if(_0x137f11['changeHealth'](-_0x56848b[_0x4f1be8(0x8b6)]))this['disableObj'](_0x137f11);this[_0x4f1be8(0xee)](_0x137f11,_0x260f7f[_0x4f1be8(0x743)](_0x56848b['x'],_0x56848b['y'],_0x137f11['x'],_0x137f11['y']));}}}else{if(_0x137f11[_0x4f1be8(0x49b)]&&!_0x56848b['noTrap']&&_0x137f11[_0x4f1be8(0x1e6)]!=_0x56848b&&!(_0x137f11[_0x4f1be8(0x1e6)]&&_0x137f11[_0x4f1be8(0x1e6)]['team']&&_0x137f11[_0x4f1be8(0x1e6)][_0x4f1be8(0x2b8)]==_0x56848b[_0x4f1be8(0x2b8)]))_0x56848b[_0x4f1be8(0x9b1)]=!![],_0x137f11['hideFromEnemy']=![];else{if(_0x137f11['boostSpeed'])_0x56848b[_0x4f1be8(0x60a)]+=_0x5b60cf*_0x137f11[_0x4f1be8(0x85d)]*(_0x137f11['weightM']||0x1)*_0xe45c15(_0x137f11[_0x4f1be8(0x8a0)]),_0x56848b[_0x4f1be8(0x56e)]+=_0x5b60cf*_0x137f11['boostSpeed']*(_0x137f11[_0x4f1be8(0x2c0)]||0x1)*_0x11cc89(_0x137f11[_0x4f1be8(0x8a0)]);else{if(_0x137f11[_0x4f1be8(0x152)])_0x56848b['healCol']=_0x137f11[_0x4f1be8(0x152)];else _0x137f11['teleport']&&(_0x56848b['x']=_0x260f7f[_0x4f1be8(0x1af)](0x0,_0x35ba32[_0x4f1be8(0x141)]),_0x56848b['y']=_0x260f7f[_0x4f1be8(0x1af)](0x0,_0x35ba32[_0x4f1be8(0x141)]));}}}if(_0x137f11['zIndex']>_0x56848b[_0x4f1be8(0x3f2)])_0x56848b[_0x4f1be8(0x3f2)]=_0x137f11[_0x4f1be8(0x3f2)];return!![];}}return![];};};},'./src/js/data/player.js':function(_0x571bec,_0x2bd06e,_0x453e16){var _0x5f4b6d=_0xfd30c1,_0x7f4e4f=_0x453e16('./node_modules/bad-words/lib/badwords.js'),_0x578805=new _0x7f4e4f(),_0x3ecb04=[_0x5f4b6d(0x439),_0x5f4b6d(0x3b4),_0x5f4b6d(0x574),'child',_0x5f4b6d(0x59a),_0x5f4b6d(0x2cf),_0x5f4b6d(0x635),'trump','clinton',_0x5f4b6d(0x270),_0x5f4b6d(0x44f),_0x5f4b6d(0x768),'pride',_0x5f4b6d(0x2c7),_0x5f4b6d(0x570),_0x5f4b6d(0x510),_0x5f4b6d(0x67d),_0x5f4b6d(0x83c),_0x5f4b6d(0x337),_0x5f4b6d(0x1bf),_0x5f4b6d(0x331),_0x5f4b6d(0x7b1),'doggy',_0x5f4b6d(0x912),_0x5f4b6d(0x6dc),_0x5f4b6d(0x463),'nigg',_0x5f4b6d(0x8aa),_0x5f4b6d(0x12c),_0x5f4b6d(0x26a),_0x5f4b6d(0x405),_0x5f4b6d(0x30e),_0x5f4b6d(0x5c5),_0x5f4b6d(0x391),_0x5f4b6d(0x6eb),_0x5f4b6d(0x26c),_0x5f4b6d(0x8e6),_0x5f4b6d(0x68a),'nazi',_0x5f4b6d(0x270),'stalin',_0x5f4b6d(0x42a),'chamber',_0x5f4b6d(0x34a),_0x5f4b6d(0x68c),_0x5f4b6d(0x583),_0x5f4b6d(0x2d0),_0x5f4b6d(0x1b3),_0x5f4b6d(0x3e7),'satan',_0x5f4b6d(0x529),_0x5f4b6d(0x862),'cunt',_0x5f4b6d(0x865),'fag',_0x5f4b6d(0x7a5),_0x5f4b6d(0x154),_0x5f4b6d(0x847),_0x5f4b6d(0x802),'phile',_0x5f4b6d(0x292),_0x5f4b6d(0x83c),_0x5f4b6d(0x57c),'tiny',_0x5f4b6d(0x304),_0x5f4b6d(0x3b0),_0x5f4b6d(0x2ff),_0x5f4b6d(0x2a8),_0x5f4b6d(0x861),_0x5f4b6d(0x3b3),_0x5f4b6d(0x4f9),'whiore',_0x5f4b6d(0x5e4),'faggot',_0x5f4b6d(0x15b),_0x5f4b6d(0x966),_0x5f4b6d(0x63e),_0x5f4b6d(0x8b5),'senpa',_0x5f4b6d(0x74d),'d1scord',_0x5f4b6d(0x17a),_0x5f4b6d(0x2a8),_0x5f4b6d(0x7e5),_0x5f4b6d(0x304),_0x5f4b6d(0x204),_0x5f4b6d(0x311),_0x5f4b6d(0x43e),_0x5f4b6d(0x869)];_0x578805[_0x5f4b6d(0x986)](..._0x3ecb04);var _0x250044=Math[_0x5f4b6d(0x11d)],_0x41d051=Math[_0x5f4b6d(0x90f)],_0x5845a0=Math[_0x5f4b6d(0x8b9)],_0x3c6d1e=Math[_0x5f4b6d(0x11f)],_0x639a7=Math[_0x5f4b6d(0x934)];_0x571bec['exports']=function(_0x2fddf1,_0x358f45,_0xe0bfe9,_0x46b83f,_0x3ac80c,_0x5542e5,_0x3ca057,_0x219787,_0x11f7eb,_0x310125,_0x5a44ea,_0x5296a7,_0x497d77,_0x3dd196){var _0x45000c=_0x5f4b6d;this['id']=_0x2fddf1,this['sid']=_0x358f45,this['tmpScore']=0x0,this[_0x45000c(0x2b8)]=null,this[_0x45000c(0x201)]=0x0,this[_0x45000c(0x45c)]=0x0,this[_0x45000c(0x65c)]=0x0,this[_0x45000c(0x32e)]={};for(var _0x2f9716=0x0;_0x2f9716<_0x5a44ea[_0x45000c(0x404)];++_0x2f9716){if(_0x5a44ea[_0x2f9716]['price']<=0x0)this[_0x45000c(0x32e)][_0x5a44ea[_0x2f9716]['id']]=0x1;}this['skins']={};for(var _0x2f9716=0x0;_0x2f9716<_0x310125['length'];++_0x2f9716){if(_0x310125[_0x2f9716][_0x45000c(0x8c5)]<=0x0)this[_0x45000c(0x5eb)][_0x310125[_0x2f9716]['id']]=0x1;}this[_0x45000c(0x960)]=0x0,this['dt']=0x0,this[_0x45000c(0x4ec)]=![],this[_0x45000c(0x538)]={},this['isPlayer']=!![],this[_0x45000c(0x721)]=0x0,this[_0x45000c(0x7d7)]=undefined,this[_0x45000c(0x8a1)]=0x0,this[_0x45000c(0x1dd)]=0x0,this[_0x45000c(0x96a)]=0x0,this[_0x45000c(0x322)]=0x0,this[_0x45000c(0x4f5)]=function(_0x52a66f){var _0x506e69=_0x45000c;this[_0x506e69(0x4ab)]=!![],this[_0x506e69(0x1c5)]=!![],this[_0x506e69(0x9b1)]=![],this['lockDir']=![],this['minimapCounter']=0x0,this[_0x506e69(0x591)]=0x0,this['shameCount']=0x0,this[_0x506e69(0x826)]=0x0,this[_0x506e69(0x6a4)]={},this[_0x506e69(0x3dd)]=0x0,this[_0x506e69(0x4e6)]=0x0,this[_0x506e69(0x6b1)]=0x0,this[_0x506e69(0x46b)]=0x0,this['mouseState']=0x0,this['buildIndex']=-0x1,this[_0x506e69(0x7a4)]=0x0,this[_0x506e69(0x58f)]={},this['noMovTimer']=0x0,this['maxXP']=0x12c,this['XP']=0x0,this[_0x506e69(0x9ae)]=0x1,this[_0x506e69(0x8b2)]=0x0,this[_0x506e69(0x17e)]=0x2,this[_0x506e69(0x586)]=0x0,this['x']=0x0,this['y']=0x0,this['zIndex']=0x0,this[_0x506e69(0x60a)]=0x0,this['yVel']=0x0,this[_0x506e69(0x48e)]=0x1,this[_0x506e69(0x8a0)]=0x0,this['dirPlus']=0x0,this['targetDir']=0x0,this[_0x506e69(0x887)]=0x0,this[_0x506e69(0x8fe)]=0x64,this[_0x506e69(0x1d7)]=this[_0x506e69(0x8fe)],this[_0x506e69(0x5d9)]=_0xe0bfe9['playerScale'],this[_0x506e69(0x737)]=_0xe0bfe9[_0x506e69(0x483)],this[_0x506e69(0x8fa)](),this[_0x506e69(0x512)](_0x52a66f),this['items']=[0x0,0x3,0x6,0xa],this['weapons']=[0x0],this['shootCount']=0x0,this[_0x506e69(0x27c)]=[],this[_0x506e69(0x94d)]={};},this[_0x45000c(0x8fa)]=function(){var _0x3c13ab=_0x45000c;this[_0x3c13ab(0x7d7)]=undefined;},this['resetResources']=function(_0x2b799e){var _0x9521e=_0x45000c;for(var _0x47cf8d=0x0;_0x47cf8d<_0xe0bfe9[_0x9521e(0x5ca)][_0x9521e(0x404)];++_0x47cf8d){this[_0xe0bfe9['resourceTypes'][_0x47cf8d]]=_0x2b799e?0x64:0x0;}},this[_0x45000c(0x5a3)]=function(_0x4cc897){var _0x4aa536=_0x45000c,_0x56c5d1=_0x11f7eb[_0x4aa536(0x188)][_0x4cc897];if(_0x56c5d1){for(var _0x37dfeb=0x0;_0x37dfeb<this[_0x4aa536(0x21f)]['length'];++_0x37dfeb){if(_0x11f7eb[_0x4aa536(0x188)][this[_0x4aa536(0x21f)][_0x37dfeb]]['group']==_0x56c5d1['group']){if(this[_0x4aa536(0x915)]==this[_0x4aa536(0x21f)][_0x37dfeb])this[_0x4aa536(0x915)]=_0x4cc897;return this[_0x4aa536(0x21f)][_0x37dfeb]=_0x4cc897,!![];}}return this[_0x4aa536(0x21f)]['push'](_0x4cc897),!![];}return![];},this[_0x45000c(0x741)]=function(_0x29e2a3){var _0x353caf=_0x45000c;if(_0x29e2a3){this[_0x353caf(0x2f1)]=_0x353caf(0x5f0);var _0x1fe494=_0x29e2a3[_0x353caf(0x2f1)]+'';_0x1fe494=_0x1fe494[_0x353caf(0x789)](0x0,_0xe0bfe9[_0x353caf(0x166)]),_0x1fe494=_0x1fe494[_0x353caf(0x759)](/[^\w:\(\)\/? -]+/gmi,'\x20'),_0x1fe494=_0x1fe494[_0x353caf(0x759)](/[^\x00-\x7F]/g,'\x20'),_0x1fe494=_0x1fe494['trim']();var _0x592c24=![],_0x3d475d=_0x1fe494[_0x353caf(0x14f)]()[_0x353caf(0x759)](/\s/g,'')[_0x353caf(0x759)](/1/g,'i')[_0x353caf(0x759)](/0/g,'o')[_0x353caf(0x759)](/5/g,'s');for(var _0x4014f7 of _0x578805[_0x353caf(0x188)]){if(_0x3d475d[_0x353caf(0x5b5)](_0x4014f7)!=-0x1){_0x592c24=!![];break;}}_0x1fe494[_0x353caf(0x404)]>0x0&&!_0x592c24&&(this[_0x353caf(0x2f1)]=_0x1fe494);this[_0x353caf(0x322)]=0x0;if(_0xe0bfe9[_0x353caf(0xe5)][_0x29e2a3[_0x353caf(0x36b)]])this['skinColor']=_0x29e2a3[_0x353caf(0x36b)];}},this[_0x45000c(0x902)]=function(){var _0x2d5ea5=_0x45000c;return[this['id'],this[_0x2d5ea5(0x204)],this[_0x2d5ea5(0x2f1)],_0x46b83f[_0x2d5ea5(0xe1)](this['x'],0x2),_0x46b83f[_0x2d5ea5(0xe1)](this['y'],0x2),_0x46b83f[_0x2d5ea5(0xe1)](this[_0x2d5ea5(0x8a0)],0x3),this[_0x2d5ea5(0x1d7)],this[_0x2d5ea5(0x8fe)],this[_0x2d5ea5(0x5d9)],this['skinColor']];},this[_0x45000c(0x78f)]=function(_0x54f749){var _0x31422e=_0x45000c;this['id']=_0x54f749[0x0],this[_0x31422e(0x204)]=_0x54f749[0x1],this[_0x31422e(0x2f1)]=_0x54f749[0x2],this['x']=_0x54f749[0x3],this['y']=_0x54f749[0x4],this[_0x31422e(0x8a0)]=_0x54f749[0x5],this[_0x31422e(0x1d7)]=_0x54f749[0x6],this[_0x31422e(0x8fe)]=_0x54f749[0x7],this['scale']=_0x54f749[0x8],this[_0x31422e(0x322)]=_0x54f749[0x9];};var _0x21562d=0x0;this[_0x45000c(0x767)]=function(_0x5d3ed4){var _0x15d19e=_0x45000c;if(!this[_0x15d19e(0x1c5)])return;this[_0x15d19e(0x826)]>0x0&&(this['shameTimer']-=_0x5d3ed4,this[_0x15d19e(0x826)]<=0x0&&(this['shameTimer']=0x0,this[_0x15d19e(0x4db)]=0x0));_0x21562d-=_0x5d3ed4;if(_0x21562d<=0x0){var _0x588348=(this[_0x15d19e(0x36b)]&&this[_0x15d19e(0x36b)]['healthRegen']?this[_0x15d19e(0x36b)][_0x15d19e(0x4cc)]:0x0)+(this[_0x15d19e(0x7fb)]&&this[_0x15d19e(0x7fb)][_0x15d19e(0x4cc)]?this[_0x15d19e(0x7fb)][_0x15d19e(0x4cc)]:0x0);_0x588348&&this[_0x15d19e(0x950)](_0x588348,this);if(this['dmgOverTime'][_0x15d19e(0x173)]){this['changeHealth'](-this[_0x15d19e(0x58f)][_0x15d19e(0x173)],this[_0x15d19e(0x58f)]['doer']),this[_0x15d19e(0x58f)][_0x15d19e(0x8ab)]-=0x1;if(this[_0x15d19e(0x58f)]['time']<=0x0)this[_0x15d19e(0x58f)][_0x15d19e(0x173)]=0x0;}this[_0x15d19e(0x152)]&&this[_0x15d19e(0x950)](this[_0x15d19e(0x152)],this),_0x21562d=0x3e8;}if(!this['alive'])return;if(this[_0x15d19e(0x48e)]<0x1){this['slowMult']+=0.0008*_0x5d3ed4;if(this[_0x15d19e(0x48e)]>0x1)this[_0x15d19e(0x48e)]=0x1;}this[_0x15d19e(0x5e6)]+=_0x5d3ed4;if(this[_0x15d19e(0x60a)]||this[_0x15d19e(0x56e)])this[_0x15d19e(0x5e6)]=0x0;if(this[_0x15d19e(0x9b1)])this[_0x15d19e(0x60a)]=0x0,this[_0x15d19e(0x56e)]=0x0;else{var _0x3f939b=(this[_0x15d19e(0x915)]>=0x0?0.5:0x1)*(_0x11f7eb[_0x15d19e(0x92a)][this[_0x15d19e(0x7a4)]]['spdMult']||0x1)*(this[_0x15d19e(0x36b)]?this[_0x15d19e(0x36b)][_0x15d19e(0x6bf)]||0x1:0x1)*(this[_0x15d19e(0x7fb)]?this['tail'][_0x15d19e(0x6bf)]||0x1:0x1)*(this['y']<=_0xe0bfe9[_0x15d19e(0x834)]?this[_0x15d19e(0x36b)]&&this[_0x15d19e(0x36b)][_0x15d19e(0x240)]?0x1:_0xe0bfe9[_0x15d19e(0x8a5)]:0x1)*this['slowMult'];!this['zIndex']&&this['y']>=_0xe0bfe9[_0x15d19e(0x141)]/0x2-_0xe0bfe9['riverWidth']/0x2&&this['y']<=_0xe0bfe9[_0x15d19e(0x141)]/0x2+_0xe0bfe9[_0x15d19e(0x386)]/0x2&&(this[_0x15d19e(0x36b)]&&this[_0x15d19e(0x36b)][_0x15d19e(0x25d)]?(_0x3f939b*=0.75,this[_0x15d19e(0x60a)]+=_0xe0bfe9['waterCurrent']*0.4*_0x5d3ed4):(_0x3f939b*=0.33,this[_0x15d19e(0x60a)]+=_0xe0bfe9[_0x15d19e(0x8fd)]*_0x5d3ed4));var _0x15a918=this[_0x15d19e(0x7d7)]!=undefined?_0x41d051(this['moveDir']):0x0,_0x201fc7=this[_0x15d19e(0x7d7)]!=undefined?_0x5845a0(this[_0x15d19e(0x7d7)]):0x0,_0x1d349a=_0x639a7(_0x15a918*_0x15a918+_0x201fc7*_0x201fc7);_0x1d349a!=0x0&&(_0x15a918/=_0x1d349a,_0x201fc7/=_0x1d349a);if(_0x15a918)this[_0x15d19e(0x60a)]+=_0x15a918*this[_0x15d19e(0x737)]*_0x3f939b*_0x5d3ed4;if(_0x201fc7)this['yVel']+=_0x201fc7*this[_0x15d19e(0x737)]*_0x3f939b*_0x5d3ed4;}this['zIndex']=0x0,this[_0x15d19e(0x9b1)]=![],this['healCol']=0x0;var _0x20b6d5,_0x5105b9=_0x46b83f['getDistance'](0x0,0x0,this[_0x15d19e(0x60a)]*_0x5d3ed4,this[_0x15d19e(0x56e)]*_0x5d3ed4),_0x2fc753=Math[_0x15d19e(0x176)](0x4,Math[_0x15d19e(0x77b)](0x1,Math[_0x15d19e(0x131)](_0x5105b9/0x28))),_0x4ee4cf=0x1/_0x2fc753;for(var _0x379908=0x0;_0x379908<_0x2fc753;++_0x379908){if(this['xVel'])this['x']+=this[_0x15d19e(0x60a)]*_0x5d3ed4*_0x4ee4cf;if(this[_0x15d19e(0x56e)])this['y']+=this['yVel']*_0x5d3ed4*_0x4ee4cf;_0x20b6d5=_0x5542e5['getGridArrays'](this['x'],this['y'],this[_0x15d19e(0x5d9)]);for(var _0x787e44=0x0;_0x787e44<_0x20b6d5[_0x15d19e(0x404)];++_0x787e44){for(var _0x316dc6=0x0;_0x316dc6<_0x20b6d5[_0x787e44][_0x15d19e(0x404)];++_0x316dc6){if(_0x20b6d5[_0x787e44][_0x316dc6][_0x15d19e(0x4ab)])_0x5542e5[_0x15d19e(0x296)](this,_0x20b6d5[_0x787e44][_0x316dc6],_0x4ee4cf);}}}var _0x319de0=_0x3ca057[_0x15d19e(0x5b5)](this);for(var _0x379908=_0x319de0+0x1;_0x379908<_0x3ca057[_0x15d19e(0x404)];++_0x379908){if(_0x3ca057[_0x379908]!=this&&_0x3ca057[_0x379908]['alive'])_0x5542e5[_0x15d19e(0x296)](this,_0x3ca057[_0x379908]);}if(this[_0x15d19e(0x60a)]){this['xVel']*=_0x3c6d1e(_0xe0bfe9[_0x15d19e(0x68b)],_0x5d3ed4);if(this['xVel']<=0.01&&this['xVel']>=-0.01)this[_0x15d19e(0x60a)]=0x0;}if(this[_0x15d19e(0x56e)]){this[_0x15d19e(0x56e)]*=_0x3c6d1e(_0xe0bfe9['playerDecel'],_0x5d3ed4);if(this[_0x15d19e(0x56e)]<=0.01&&this[_0x15d19e(0x56e)]>=-0.01)this['yVel']=0x0;}if(this['x']-this['scale']<0x0)this['x']=this[_0x15d19e(0x5d9)];else this['x']+this[_0x15d19e(0x5d9)]>_0xe0bfe9['mapScale']&&(this['x']=_0xe0bfe9['mapScale']-this[_0x15d19e(0x5d9)]);if(this['y']-this[_0x15d19e(0x5d9)]<0x0)this['y']=this[_0x15d19e(0x5d9)];else this['y']+this[_0x15d19e(0x5d9)]>_0xe0bfe9[_0x15d19e(0x141)]&&(this['y']=_0xe0bfe9[_0x15d19e(0x141)]-this[_0x15d19e(0x5d9)]);if(this['buildIndex']<0x0){if(this[_0x15d19e(0x94d)][this[_0x15d19e(0x7a4)]]>0x0)this['reloads'][this[_0x15d19e(0x7a4)]]-=_0x5d3ed4,this[_0x15d19e(0x3dd)]=this[_0x15d19e(0x13e)];else{if(this[_0x15d19e(0x3dd)]||this['autoGather']){var _0x520cc9=!![];if(_0x11f7eb[_0x15d19e(0x92a)][this[_0x15d19e(0x7a4)]][_0x15d19e(0x62d)]!=undefined)this['gather'](_0x3ca057);else{if(_0x11f7eb[_0x15d19e(0x92a)][this[_0x15d19e(0x7a4)]]['projectile']!=undefined&&this['hasRes'](_0x11f7eb['weapons'][this[_0x15d19e(0x7a4)]],this[_0x15d19e(0x36b)]?this[_0x15d19e(0x36b)][_0x15d19e(0x911)]:0x0)){this[_0x15d19e(0x49d)](_0x11f7eb[_0x15d19e(0x92a)][this[_0x15d19e(0x7a4)]],this[_0x15d19e(0x36b)]?this[_0x15d19e(0x36b)]['projCost']:0x0),this[_0x15d19e(0x5e6)]=0x0;var _0x319de0=_0x11f7eb[_0x15d19e(0x92a)][this['weaponIndex']][_0x15d19e(0x4a5)],_0x189178=this['scale']*0x2,_0x7d2469=this[_0x15d19e(0x36b)]&&this[_0x15d19e(0x36b)][_0x15d19e(0x399)]?this[_0x15d19e(0x36b)][_0x15d19e(0x399)]:0x1;_0x11f7eb[_0x15d19e(0x92a)][this['weaponIndex']][_0x15d19e(0x202)]&&(this[_0x15d19e(0x60a)]-=_0x11f7eb['weapons'][this[_0x15d19e(0x7a4)]][_0x15d19e(0x202)]*_0x41d051(this[_0x15d19e(0x8a0)]),this['yVel']-=_0x11f7eb['weapons'][this[_0x15d19e(0x7a4)]][_0x15d19e(0x202)]*_0x5845a0(this[_0x15d19e(0x8a0)])),_0x3ac80c[_0x15d19e(0x4af)](this['x']+_0x189178*_0x41d051(this['dir']),this['y']+_0x189178*_0x5845a0(this[_0x15d19e(0x8a0)]),this[_0x15d19e(0x8a0)],_0x11f7eb[_0x15d19e(0x217)][_0x319de0][_0x15d19e(0x2dd)]*_0x7d2469,_0x11f7eb[_0x15d19e(0x217)][_0x319de0][_0x15d19e(0x737)]*_0x7d2469,_0x319de0,this,null,this['zIndex']);}else _0x520cc9=![];}this['gathering']=this['mouseState'],_0x520cc9&&(this['reloads'][this['weaponIndex']]=_0x11f7eb[_0x15d19e(0x92a)][this[_0x15d19e(0x7a4)]]['speed']*(this['skin']?this[_0x15d19e(0x36b)]['atkSpd']||0x1:0x1));}}}},this[_0x45000c(0x6bb)]=function(_0x43fe95){var _0x574871=_0x45000c;if(!this['weaponXP'][this[_0x574871(0x7a4)]])this[_0x574871(0x27c)][this['weaponIndex']]=0x0;this['weaponXP'][this['weaponIndex']]+=_0x43fe95;},this[_0x45000c(0x88d)]=function(_0x2676bf){var _0x28f39e=_0x45000c;this['age']<_0xe0bfe9['maxAge']&&(this['XP']+=_0x2676bf,this['XP']>=this[_0x28f39e(0x2dc)]?(this[_0x28f39e(0x9ae)]<_0xe0bfe9['maxAge']?(this[_0x28f39e(0x9ae)]++,this['XP']=0x0,this['maxXP']*=1.2):this['XP']=this[_0x28f39e(0x2dc)],this[_0x28f39e(0x586)]++,_0x5296a7[_0x28f39e(0x1a6)](this['id'],'16',this[_0x28f39e(0x586)],this[_0x28f39e(0x17e)]),_0x5296a7[_0x28f39e(0x1a6)](this['id'],'15',this['XP'],_0x46b83f[_0x28f39e(0xe1)](this[_0x28f39e(0x2dc)],0x1),this[_0x28f39e(0x9ae)])):_0x5296a7[_0x28f39e(0x1a6)](this['id'],'15',this['XP']));},this[_0x45000c(0x950)]=function(_0x581975,_0x35ee23){var _0x3c4c0e=_0x45000c;if(_0x581975>0x0&&this[_0x3c4c0e(0x1d7)]>=this[_0x3c4c0e(0x8fe)])return![];if(_0x581975<0x0&&this['skin'])_0x581975*=this[_0x3c4c0e(0x36b)][_0x3c4c0e(0x7e6)]||0x1;if(_0x581975<0x0&&this[_0x3c4c0e(0x7fb)])_0x581975*=this[_0x3c4c0e(0x7fb)]['dmgMult']||0x1;if(_0x581975<0x0)this['hitTime']=Date[_0x3c4c0e(0x951)]();this['health']+=_0x581975;this[_0x3c4c0e(0x1d7)]>this[_0x3c4c0e(0x8fe)]&&(_0x581975-=this[_0x3c4c0e(0x1d7)]-this[_0x3c4c0e(0x8fe)],this['health']=this[_0x3c4c0e(0x8fe)]);if(this['health']<=0x0)this['kill'](_0x35ee23);for(var _0x4e29b4=0x0;_0x4e29b4<_0x3ca057[_0x3c4c0e(0x404)];++_0x4e29b4){if(this['sentTo'][_0x3ca057[_0x4e29b4]['id']])_0x5296a7[_0x3c4c0e(0x1a6)](_0x3ca057[_0x4e29b4]['id'],'h',this[_0x3c4c0e(0x204)],this[_0x3c4c0e(0x1d7)]);}return _0x35ee23&&_0x35ee23['canSee'](this)&&!(_0x35ee23==this&&_0x581975<0x0)&&_0x5296a7['send'](_0x35ee23['id'],'t',Math[_0x3c4c0e(0x131)](this['x']),Math[_0x3c4c0e(0x131)](this['y']),Math['round'](-_0x581975),0x1),!![];},this[_0x45000c(0x2ff)]=function(_0x30d46f){var _0x4eecdb=_0x45000c;if(_0x30d46f&&_0x30d46f['alive']){_0x30d46f['kills']++;if(_0x30d46f['skin']&&_0x30d46f[_0x4eecdb(0x36b)][_0x4eecdb(0x7f9)])_0x497d77(_0x30d46f,Math[_0x4eecdb(0x131)](this[_0x4eecdb(0x960)]/0x2));else _0x497d77(_0x30d46f,Math[_0x4eecdb(0x131)](this[_0x4eecdb(0x9ae)]*0x64*(_0x30d46f[_0x4eecdb(0x36b)]&&_0x30d46f[_0x4eecdb(0x36b)]['kScrM']?_0x30d46f[_0x4eecdb(0x36b)][_0x4eecdb(0x8ac)]:0x1)));_0x5296a7[_0x4eecdb(0x1a6)](_0x30d46f['id'],'9','kills',_0x30d46f[_0x4eecdb(0x8b2)],0x1);}this[_0x4eecdb(0x1c5)]=![],_0x5296a7[_0x4eecdb(0x1a6)](this['id'],'11'),_0x3dd196();},this[_0x45000c(0x423)]=function(_0x40c03a,_0x192903,_0x20da7a){var _0x340303=_0x45000c;if(!_0x20da7a&&_0x192903>0x0)this[_0x340303(0x6bb)](_0x192903);_0x40c03a==0x3?_0x497d77(this,_0x192903,!![]):(this[_0xe0bfe9[_0x340303(0x5ca)][_0x40c03a]]+=_0x192903,_0x5296a7[_0x340303(0x1a6)](this['id'],'9',_0xe0bfe9[_0x340303(0x5ca)][_0x40c03a],this[_0xe0bfe9[_0x340303(0x5ca)][_0x40c03a]],0x1));},this['changeItemCount']=function(_0x164f6e,_0x4b7b42){var _0x2c9e68=_0x45000c;this[_0x2c9e68(0x538)][_0x164f6e]=this[_0x2c9e68(0x538)][_0x164f6e]||0x0,this[_0x2c9e68(0x538)][_0x164f6e]+=_0x4b7b42,_0x5296a7['send'](this['id'],'14',_0x164f6e,this['itemCounts'][_0x164f6e]);},this[_0x45000c(0x958)]=function(_0x4cb774){var _0x900ae6=_0x45000c,_0x37d0c0=this[_0x900ae6(0x5d9)]+_0x4cb774[_0x900ae6(0x5d9)]+(_0x4cb774['placeOffset']||0x0),_0x482996=this['x']+_0x37d0c0*_0x41d051(this[_0x900ae6(0x8a0)]),_0x101560=this['y']+_0x37d0c0*_0x5845a0(this['dir']);if(this[_0x900ae6(0x454)](_0x4cb774)&&!(_0x4cb774[_0x900ae6(0x707)]&&(this[_0x900ae6(0x36b)]&&this[_0x900ae6(0x36b)][_0x900ae6(0x8d5)]))&&(_0x4cb774[_0x900ae6(0x707)]||_0x5542e5[_0x900ae6(0x26b)](_0x482996,_0x101560,_0x4cb774['scale'],0.6,_0x4cb774['id'],![],this))){var _0x1e8259=![];if(_0x4cb774['consume']){if(this[_0x900ae6(0x65c)]){var _0xcf1c1f=Date['now']()-this[_0x900ae6(0x65c)];this[_0x900ae6(0x65c)]=0x0,_0xcf1c1f<=0x78?(this['shameCount']++,this[_0x900ae6(0x4db)]>=0x8&&(this[_0x900ae6(0x826)]=0x7530,this[_0x900ae6(0x4db)]=0x0)):(this[_0x900ae6(0x4db)]-=0x2,this[_0x900ae6(0x4db)]<=0x0&&(this[_0x900ae6(0x4db)]=0x0));}if(this[_0x900ae6(0x826)]<=0x0)_0x1e8259=_0x4cb774[_0x900ae6(0x707)](this);}else{_0x1e8259=!![];_0x4cb774[_0x900ae6(0x408)][_0x900ae6(0x716)]&&this[_0x900ae6(0x38c)](_0x4cb774[_0x900ae6(0x408)]['id'],0x1);if(_0x4cb774['pps'])this[_0x900ae6(0x721)]+=_0x4cb774[_0x900ae6(0x721)];_0x5542e5[_0x900ae6(0x110)](_0x5542e5[_0x900ae6(0x4d7)]['length'],_0x482996,_0x101560,this[_0x900ae6(0x8a0)],_0x4cb774['scale'],_0x4cb774[_0x900ae6(0x669)],_0x4cb774,![],this);}_0x1e8259&&(this['useRes'](_0x4cb774),this[_0x900ae6(0x915)]=-0x1);}},this[_0x45000c(0x36d)]=function(){},this[_0x45000c(0x874)]=function(_0x351206,_0x2417fc){var _0x6c4c07=_0x45000c;for(var _0x238867=0x0;_0x238867<_0x351206['req']['length'];){if(this[_0x351206['req'][_0x238867]]<Math[_0x6c4c07(0x131)](_0x351206[_0x6c4c07(0x6e1)][_0x238867+0x1]*(_0x2417fc||0x1)))return![];_0x238867+=0x2;}return!![];},this[_0x45000c(0x49d)]=function(_0x3bda73,_0x1a0dd7){var _0x3a6a9d=_0x45000c;if(_0xe0bfe9['inSandbox'])return;for(var _0x424151=0x0;_0x424151<_0x3bda73[_0x3a6a9d(0x6e1)][_0x3a6a9d(0x404)];){this[_0x3a6a9d(0x423)](_0xe0bfe9['resourceTypes'][_0x3a6a9d(0x5b5)](_0x3bda73[_0x3a6a9d(0x6e1)][_0x424151]),-Math[_0x3a6a9d(0x131)](_0x3bda73[_0x3a6a9d(0x6e1)][_0x424151+0x1]*(_0x1a0dd7||0x1))),_0x424151+=0x2;}},this[_0x45000c(0x454)]=function(_0xc8497f){var _0x116913=_0x45000c;if(_0xe0bfe9[_0x116913(0x5e9)])return!![];if(_0xc8497f['group']['limit']&&this[_0x116913(0x538)][_0xc8497f[_0x116913(0x408)]['id']]>=_0xc8497f['group']['limit'])return![];return this[_0x116913(0x874)](_0xc8497f);},this[_0x45000c(0x62d)]=function(){var _0x706efc=_0x45000c;this[_0x706efc(0x5e6)]=0x0,this[_0x706efc(0x48e)]-=_0x11f7eb[_0x706efc(0x92a)][this['weaponIndex']]['hitSlow']||0.3;if(this[_0x706efc(0x48e)]<0x0)this['slowMult']=0x0;var _0x152b2f=_0xe0bfe9[_0x706efc(0x9a2)](this),_0x193e69=_0x152b2f[_0x706efc(0x642)],_0x4e96a8=_0x152b2f[_0x706efc(0x92b)],_0x25b412={},_0x37fd0e,_0x2f03c8,_0x428f2b,_0x203a08,_0x3abb26=_0x5542e5['getGridArrays'](this['x'],this['y'],_0x11f7eb[_0x706efc(0x92a)][this['weaponIndex']][_0x706efc(0x2dd)]);for(var _0xa0a9da=0x0;_0xa0a9da<_0x3abb26[_0x706efc(0x404)];++_0xa0a9da){for(var _0x270449=0x0;_0x270449<_0x3abb26[_0xa0a9da]['length'];++_0x270449){_0x428f2b=_0x3abb26[_0xa0a9da][_0x270449];if(_0x428f2b[_0x706efc(0x4ab)]&&!_0x428f2b[_0x706efc(0x882)]&&!_0x25b412[_0x428f2b[_0x706efc(0x204)]]&&_0x428f2b[_0x706efc(0x69a)](this)){_0x37fd0e=_0x46b83f['getDistance'](this['x'],this['y'],_0x428f2b['x'],_0x428f2b['y'])-_0x428f2b[_0x706efc(0x5d9)];if(_0x37fd0e<=_0x11f7eb['weapons'][this[_0x706efc(0x7a4)]][_0x706efc(0x2dd)]){_0x2f03c8=_0x46b83f[_0x706efc(0x743)](_0x428f2b['x'],_0x428f2b['y'],this['x'],this['y']);if(_0x46b83f['getAngleDist'](_0x2f03c8,this[_0x706efc(0x8a0)])<=_0xe0bfe9[_0x706efc(0x28a)]){_0x25b412[_0x428f2b[_0x706efc(0x204)]]=0x1;if(_0x428f2b[_0x706efc(0x1d7)]){if(_0x428f2b[_0x706efc(0x950)](-_0x11f7eb['weapons'][this['weaponIndex']]['dmg']*_0x4e96a8*(_0x11f7eb['weapons'][this[_0x706efc(0x7a4)]][_0x706efc(0x117)]||0x1)*(this[_0x706efc(0x36b)]&&this['skin'][_0x706efc(0x2ab)]?this[_0x706efc(0x36b)][_0x706efc(0x2ab)]:0x1),this)){for(var _0x2b89ce=0x0;_0x2b89ce<_0x428f2b[_0x706efc(0x6e1)][_0x706efc(0x404)];){this['addResource'](_0xe0bfe9[_0x706efc(0x5ca)][_0x706efc(0x5b5)](_0x428f2b[_0x706efc(0x6e1)][_0x2b89ce]),_0x428f2b['req'][_0x2b89ce+0x1]),_0x2b89ce+=0x2;}_0x5542e5[_0x706efc(0x211)](_0x428f2b);}}else{this[_0x706efc(0x88d)](0x4*_0x11f7eb[_0x706efc(0x92a)][this['weaponIndex']]['gather']);var _0x1fd40f=_0x11f7eb[_0x706efc(0x92a)][this[_0x706efc(0x7a4)]]['gather']+(_0x428f2b[_0x706efc(0x669)]==0x3?0x4:0x0);this[_0x706efc(0x36b)]&&this['skin']['extraGold']&&this[_0x706efc(0x423)](0x3,0x1),this['addResource'](_0x428f2b[_0x706efc(0x669)],_0x1fd40f);}_0x203a08=!![],_0x5542e5[_0x706efc(0xee)](_0x428f2b,_0x2f03c8);}}}}}for(var _0x270449=0x0;_0x270449<_0x3ca057[_0x706efc(0x404)]+_0x219787[_0x706efc(0x404)];++_0x270449){_0x428f2b=_0x3ca057[_0x270449]||_0x219787[_0x270449-_0x3ca057[_0x706efc(0x404)]];if(_0x428f2b!=this&&_0x428f2b[_0x706efc(0x1c5)]&&!(_0x428f2b[_0x706efc(0x2b8)]&&_0x428f2b[_0x706efc(0x2b8)]==this[_0x706efc(0x2b8)])){_0x37fd0e=_0x46b83f[_0x706efc(0x596)](this['x'],this['y'],_0x428f2b['x'],_0x428f2b['y'])-_0x428f2b['scale']*1.8;if(_0x37fd0e<=_0x11f7eb[_0x706efc(0x92a)][this[_0x706efc(0x7a4)]][_0x706efc(0x2dd)]){_0x2f03c8=_0x46b83f['getDirection'](_0x428f2b['x'],_0x428f2b['y'],this['x'],this['y']);if(_0x46b83f[_0x706efc(0x80c)](_0x2f03c8,this[_0x706efc(0x8a0)])<=_0xe0bfe9[_0x706efc(0x28a)]){var _0x5ce347=_0x11f7eb[_0x706efc(0x92a)][this[_0x706efc(0x7a4)]]['steal'];_0x5ce347&&_0x428f2b[_0x706efc(0x423)]&&(_0x5ce347=Math['min'](_0x428f2b[_0x706efc(0x960)]||0x0,_0x5ce347),this[_0x706efc(0x423)](0x3,_0x5ce347),_0x428f2b[_0x706efc(0x423)](0x3,-_0x5ce347));var _0x500ed2=_0x4e96a8;_0x428f2b['weaponIndex']!=undefined&&_0x11f7eb[_0x706efc(0x92a)][_0x428f2b[_0x706efc(0x7a4)]][_0x706efc(0x70c)]&&_0x46b83f[_0x706efc(0x80c)](_0x2f03c8+Math['PI'],_0x428f2b[_0x706efc(0x8a0)])<=_0xe0bfe9[_0x706efc(0x4cd)]&&(_0x500ed2=_0x11f7eb[_0x706efc(0x92a)][_0x428f2b[_0x706efc(0x7a4)]]['shield']);var _0xda3394=_0x11f7eb[_0x706efc(0x92a)][this[_0x706efc(0x7a4)]][_0x706efc(0x173)]*(this[_0x706efc(0x36b)]&&this[_0x706efc(0x36b)]['dmgMultO']?this[_0x706efc(0x36b)]['dmgMultO']:0x1)*(this[_0x706efc(0x7fb)]&&this[_0x706efc(0x7fb)]['dmgMultO']?this[_0x706efc(0x7fb)]['dmgMultO']:0x1),_0x1b0c9b=0.3*(_0x428f2b[_0x706efc(0x2c0)]||0x1)+(_0x11f7eb['weapons'][this['weaponIndex']][_0x706efc(0x74a)]||0x0);_0x428f2b[_0x706efc(0x60a)]+=_0x1b0c9b*_0x41d051(_0x2f03c8),_0x428f2b[_0x706efc(0x56e)]+=_0x1b0c9b*_0x5845a0(_0x2f03c8);if(this[_0x706efc(0x36b)]&&this['skin']['healD'])this[_0x706efc(0x950)](_0xda3394*_0x500ed2*this['skin'][_0x706efc(0x276)],this);if(this[_0x706efc(0x7fb)]&&this[_0x706efc(0x7fb)][_0x706efc(0x276)])this['changeHealth'](_0xda3394*_0x500ed2*this[_0x706efc(0x7fb)]['healD'],this);if(_0x428f2b[_0x706efc(0x36b)]&&_0x428f2b[_0x706efc(0x36b)][_0x706efc(0x173)]&&_0x500ed2==0x1)this[_0x706efc(0x950)](-_0xda3394*_0x428f2b['skin'][_0x706efc(0x173)],_0x428f2b);if(_0x428f2b['tail']&&_0x428f2b['tail'][_0x706efc(0x173)]&&_0x500ed2==0x1)this['changeHealth'](-_0xda3394*_0x428f2b['tail']['dmg'],_0x428f2b);_0x428f2b[_0x706efc(0x58f)]&&this['skin']&&this[_0x706efc(0x36b)][_0x706efc(0x98a)]&&!(_0x428f2b[_0x706efc(0x36b)]&&_0x428f2b[_0x706efc(0x36b)]['poisonRes'])&&(_0x428f2b[_0x706efc(0x58f)][_0x706efc(0x173)]=this['skin'][_0x706efc(0x98a)],_0x428f2b['dmgOverTime'][_0x706efc(0x8ab)]=this[_0x706efc(0x36b)]['poisonTime']||0x1,_0x428f2b[_0x706efc(0x58f)][_0x706efc(0x8e1)]=this),_0x428f2b[_0x706efc(0x58f)]&&_0x193e69&&!(_0x428f2b[_0x706efc(0x36b)]&&_0x428f2b[_0x706efc(0x36b)]['poisonRes'])&&(_0x428f2b['dmgOverTime'][_0x706efc(0x173)]=0x5,_0x428f2b[_0x706efc(0x58f)][_0x706efc(0x8ab)]=0x5,_0x428f2b[_0x706efc(0x58f)][_0x706efc(0x8e1)]=this),_0x428f2b[_0x706efc(0x36b)]&&_0x428f2b['skin'][_0x706efc(0x109)]&&(this[_0x706efc(0x60a)]-=_0x428f2b[_0x706efc(0x36b)][_0x706efc(0x109)]*_0x41d051(_0x2f03c8),this[_0x706efc(0x56e)]-=_0x428f2b[_0x706efc(0x36b)][_0x706efc(0x109)]*_0x5845a0(_0x2f03c8)),_0x428f2b[_0x706efc(0x950)](-_0xda3394*_0x500ed2,this,this);}}}}this[_0x706efc(0x31b)](_0x203a08?0x1:0x0);},this[_0x45000c(0x31b)]=function(_0x1406b9){var _0x2dce26=_0x45000c;for(var _0x5d3c05=0x0;_0x5d3c05<_0x3ca057['length'];++_0x5d3c05){this[_0x2dce26(0x6a4)][_0x3ca057[_0x5d3c05]['id']]&&this[_0x2dce26(0x35c)](_0x3ca057[_0x5d3c05])&&_0x5296a7[_0x2dce26(0x1a6)](_0x3ca057[_0x5d3c05]['id'],'7',this['sid'],_0x1406b9?0x1:0x0,this[_0x2dce26(0x7a4)]);}};var _0x189faf=0x0,_0x2820c8=0x0;this[_0x45000c(0x307)]=function(_0xff321a){var _0x538ebd=_0x45000c;this['animTime']>0x0&&(this['animTime']-=_0xff321a,this[_0x538ebd(0x6b1)]<=0x0?(this[_0x538ebd(0x6b1)]=0x0,this[_0x538ebd(0x1bb)]=0x0,_0x189faf=0x0,_0x2820c8=0x0):_0x2820c8==0x0?(_0x189faf+=_0xff321a/(this['animSpeed']*_0xe0bfe9[_0x538ebd(0x4ee)]),this['dirPlus']=_0x46b83f[_0x538ebd(0x829)](0x0,this[_0x538ebd(0x887)],Math[_0x538ebd(0x176)](0x1,_0x189faf)),_0x189faf>=0x1&&(_0x189faf=0x1,_0x2820c8=0x1)):(_0x189faf-=_0xff321a/(this[_0x538ebd(0x46b)]*(0x1-_0xe0bfe9[_0x538ebd(0x4ee)])),this[_0x538ebd(0x1bb)]=_0x46b83f[_0x538ebd(0x829)](0x0,this[_0x538ebd(0x887)],Math['max'](0x0,_0x189faf))));},this['startAnim']=function(_0x142f8c,_0x34e55c){var _0x4b5a75=_0x45000c;this['animTime']=this[_0x4b5a75(0x46b)]=_0x11f7eb[_0x4b5a75(0x92a)][_0x34e55c][_0x4b5a75(0x737)],this['targetAngle']=_0x142f8c?-_0xe0bfe9[_0x4b5a75(0x995)]:-Math['PI'],_0x189faf=0x0,_0x2820c8=0x0;},this[_0x45000c(0x35c)]=function(_0x236584){var _0x41e321=_0x45000c;if(!_0x236584)return![];if(_0x236584[_0x41e321(0x36b)]&&_0x236584[_0x41e321(0x36b)][_0x41e321(0x208)]&&_0x236584[_0x41e321(0x5e6)]>=_0x236584['skin'][_0x41e321(0x208)])return![];var _0x2ddc73=_0x250044(_0x236584['x']-this['x'])-_0x236584['scale'],_0x5700ee=_0x250044(_0x236584['y']-this['y'])-_0x236584['scale'];return _0x2ddc73<=_0xe0bfe9[_0x41e321(0x38d)]/0x2*1.3&&_0x5700ee<=_0xe0bfe9[_0x41e321(0x742)]/0x2*1.3;};};},'./src/js/data/projectile.js':function(_0x31e3e6,_0x54a2c4){_0x31e3e6['exports']=function(_0x324db2,_0x251551,_0x49b266,_0x1ba299,_0x5e46d3,_0x55db79,_0x418160){var _0x16c3e2=_0x2943;this[_0x16c3e2(0x4b1)]=function(_0xf49955,_0x117a3f,_0x32a73c,_0x7d0ee5,_0xfdf545,_0x5c01eb,_0x11a4de,_0x17c1df,_0x58102d){var _0x547954=_0x16c3e2;this[_0x547954(0x4ab)]=!![],this[_0x547954(0x18b)]=_0xf49955,this['x']=_0x117a3f,this['y']=_0x32a73c,this[_0x547954(0x8a0)]=_0x7d0ee5,this[_0x547954(0x7bd)]=!![],this[_0x547954(0x737)]=_0xfdf545,this[_0x547954(0x173)]=_0x5c01eb,this['scale']=_0x17c1df,this['range']=_0x11a4de,this['owner']=_0x58102d;if(_0x418160)this[_0x547954(0x6a4)]={};};var _0x58dcae=[],_0x5132b0;this[_0x16c3e2(0x767)]=function(_0x537d89){var _0x31c2eb=_0x16c3e2;if(this[_0x31c2eb(0x4ab)]){var _0x74ffe9=this['speed']*_0x537d89,_0x2ccafd;!this['skipMov']?(this['x']+=_0x74ffe9*Math['cos'](this[_0x31c2eb(0x8a0)]),this['y']+=_0x74ffe9*Math[_0x31c2eb(0x8b9)](this[_0x31c2eb(0x8a0)]),this['range']-=_0x74ffe9,this[_0x31c2eb(0x2dd)]<=0x0&&(this['x']+=this[_0x31c2eb(0x2dd)]*Math['cos'](this['dir']),this['y']+=this['range']*Math[_0x31c2eb(0x8b9)](this['dir']),_0x74ffe9=0x1,this[_0x31c2eb(0x2dd)]=0x0,this[_0x31c2eb(0x4ab)]=![])):this['skipMov']=![];if(_0x418160){for(var _0x2e26c0=0x0;_0x2e26c0<_0x324db2[_0x31c2eb(0x404)];++_0x2e26c0){!this[_0x31c2eb(0x6a4)][_0x324db2[_0x2e26c0]['id']]&&_0x324db2[_0x2e26c0][_0x31c2eb(0x35c)](this)&&(this[_0x31c2eb(0x6a4)][_0x324db2[_0x2e26c0]['id']]=0x1,_0x418160[_0x31c2eb(0x1a6)](_0x324db2[_0x2e26c0]['id'],'18',_0x55db79[_0x31c2eb(0xe1)](this['x'],0x1),_0x55db79[_0x31c2eb(0xe1)](this['y'],0x1),_0x55db79['fixTo'](this['dir'],0x2),_0x55db79[_0x31c2eb(0xe1)](this[_0x31c2eb(0x2dd)],0x1),this[_0x31c2eb(0x737)],this[_0x31c2eb(0x18b)],this[_0x31c2eb(0x2aa)],this[_0x31c2eb(0x204)]));}_0x58dcae[_0x31c2eb(0x404)]=0x0;for(var _0x2e26c0=0x0;_0x2e26c0<_0x324db2[_0x31c2eb(0x404)]+_0x251551['length'];++_0x2e26c0){_0x5132b0=_0x324db2[_0x2e26c0]||_0x251551[_0x2e26c0-_0x324db2['length']],_0x5132b0[_0x31c2eb(0x1c5)]&&_0x5132b0!=this[_0x31c2eb(0x1e6)]&&!(this[_0x31c2eb(0x1e6)][_0x31c2eb(0x2b8)]&&_0x5132b0[_0x31c2eb(0x2b8)]==this['owner'][_0x31c2eb(0x2b8)])&&(_0x55db79[_0x31c2eb(0x555)](_0x5132b0['x']-_0x5132b0['scale'],_0x5132b0['y']-_0x5132b0[_0x31c2eb(0x5d9)],_0x5132b0['x']+_0x5132b0[_0x31c2eb(0x5d9)],_0x5132b0['y']+_0x5132b0['scale'],this['x'],this['y'],this['x']+_0x74ffe9*Math[_0x31c2eb(0x90f)](this[_0x31c2eb(0x8a0)]),this['y']+_0x74ffe9*Math['sin'](this[_0x31c2eb(0x8a0)]))&&_0x58dcae[_0x31c2eb(0x333)](_0x5132b0));}var _0xe669fa=_0x49b266[_0x31c2eb(0x352)](this['x'],this['y'],this[_0x31c2eb(0x5d9)]);for(var _0x42fa4=0x0;_0x42fa4<_0xe669fa[_0x31c2eb(0x404)];++_0x42fa4){for(var _0x6775e0=0x0;_0x6775e0<_0xe669fa[_0x42fa4][_0x31c2eb(0x404)];++_0x6775e0){_0x5132b0=_0xe669fa[_0x42fa4][_0x6775e0],_0x2ccafd=_0x5132b0[_0x31c2eb(0x54b)](),_0x5132b0['active']&&!(this['ignoreObj']==_0x5132b0[_0x31c2eb(0x204)])&&this[_0x31c2eb(0x2aa)]<=_0x5132b0['layer']&&_0x58dcae[_0x31c2eb(0x5b5)](_0x5132b0)<0x0&&!_0x5132b0['ignoreCollision']&&_0x55db79[_0x31c2eb(0x555)](_0x5132b0['x']-_0x2ccafd,_0x5132b0['y']-_0x2ccafd,_0x5132b0['x']+_0x2ccafd,_0x5132b0['y']+_0x2ccafd,this['x'],this['y'],this['x']+_0x74ffe9*Math[_0x31c2eb(0x90f)](this['dir']),this['y']+_0x74ffe9*Math[_0x31c2eb(0x8b9)](this[_0x31c2eb(0x8a0)]))&&_0x58dcae['push'](_0x5132b0);}}if(_0x58dcae[_0x31c2eb(0x404)]>0x0){var _0x5b73f4=null,_0x317bb0=null,_0x4ce3e0=null;for(var _0x2e26c0=0x0;_0x2e26c0<_0x58dcae[_0x31c2eb(0x404)];++_0x2e26c0){_0x4ce3e0=_0x55db79[_0x31c2eb(0x596)](this['x'],this['y'],_0x58dcae[_0x2e26c0]['x'],_0x58dcae[_0x2e26c0]['y']),(_0x317bb0==null||_0x4ce3e0<_0x317bb0)&&(_0x317bb0=_0x4ce3e0,_0x5b73f4=_0x58dcae[_0x2e26c0]);}if(_0x5b73f4['isPlayer']||_0x5b73f4[_0x31c2eb(0x2d9)]){var _0x8c6ed6=0.3*(_0x5b73f4['weightM']||0x1);_0x5b73f4[_0x31c2eb(0x60a)]+=_0x8c6ed6*Math[_0x31c2eb(0x90f)](this[_0x31c2eb(0x8a0)]),_0x5b73f4[_0x31c2eb(0x56e)]+=_0x8c6ed6*Math['sin'](this[_0x31c2eb(0x8a0)]),(_0x5b73f4['weaponIndex']==undefined||!(_0x1ba299['weapons'][_0x5b73f4[_0x31c2eb(0x7a4)]]['shield']&&_0x55db79[_0x31c2eb(0x80c)](this[_0x31c2eb(0x8a0)]+Math['PI'],_0x5b73f4[_0x31c2eb(0x8a0)])<=_0x5e46d3[_0x31c2eb(0x4cd)]))&&_0x5b73f4[_0x31c2eb(0x950)](-this[_0x31c2eb(0x173)],this[_0x31c2eb(0x1e6)],this[_0x31c2eb(0x1e6)]);}else{_0x5b73f4[_0x31c2eb(0x723)]&&_0x5b73f4[_0x31c2eb(0x1d7)]&&_0x5b73f4['changeHealth'](-this[_0x31c2eb(0x173)])&&_0x49b266['disableObj'](_0x5b73f4);for(var _0x2e26c0=0x0;_0x2e26c0<_0x324db2[_0x31c2eb(0x404)];++_0x2e26c0){if(_0x324db2[_0x2e26c0]['active']){if(_0x5b73f4[_0x31c2eb(0x6a4)][_0x324db2[_0x2e26c0]['id']]){if(_0x5b73f4[_0x31c2eb(0x4ab)]){if(_0x324db2[_0x2e26c0]['canSee'](_0x5b73f4))_0x418160['send'](_0x324db2[_0x2e26c0]['id'],'8',_0x55db79[_0x31c2eb(0xe1)](this[_0x31c2eb(0x8a0)],0x2),_0x5b73f4['sid']);}else _0x418160['send'](_0x324db2[_0x2e26c0]['id'],'12',_0x5b73f4[_0x31c2eb(0x204)]);}if(!_0x5b73f4[_0x31c2eb(0x4ab)]&&_0x5b73f4['owner']==_0x324db2[_0x2e26c0])_0x324db2[_0x2e26c0][_0x31c2eb(0x38c)](_0x5b73f4[_0x31c2eb(0x408)]['id'],-0x1);}}}this[_0x31c2eb(0x4ab)]=![];for(var _0x2e26c0=0x0;_0x2e26c0<_0x324db2[_0x31c2eb(0x404)];++_0x2e26c0){if(this['sentTo'][_0x324db2[_0x2e26c0]['id']])_0x418160[_0x31c2eb(0x1a6)](_0x324db2[_0x2e26c0]['id'],'19',this[_0x31c2eb(0x204)],_0x55db79[_0x31c2eb(0xe1)](_0x317bb0,0x1));}}}}};};},'./src/js/data/projectileManager.js':function(_0x182f9d,_0x351bc6){var _0x27b370=_0xfd30c1;_0x182f9d[_0x27b370(0x245)]=function(_0x5aac74,_0x1c9fa3,_0x599eba,_0x6a11b9,_0x8c9675,_0x29afbc,_0x599b08,_0x57ecaa,_0x3ec3c9){this['addProjectile']=function(_0xc0f22c,_0x42c2ab,_0x209bfe,_0x1125b7,_0x27b8e6,_0x2a0787,_0x1fa190,_0x531e5b,_0x65eef8){var _0x32fa51=_0x2943,_0x58e01c=_0x29afbc[_0x32fa51(0x217)][_0x2a0787],_0x536e28;for(var _0x1ec3d8=0x0;_0x1ec3d8<_0x1c9fa3[_0x32fa51(0x404)];++_0x1ec3d8){if(!_0x1c9fa3[_0x1ec3d8][_0x32fa51(0x4ab)]){_0x536e28=_0x1c9fa3[_0x1ec3d8];break;}}return!_0x536e28&&(_0x536e28=new _0x5aac74(_0x599eba,_0x6a11b9,_0x8c9675,_0x29afbc,_0x599b08,_0x57ecaa,_0x3ec3c9),_0x536e28['sid']=_0x1c9fa3[_0x32fa51(0x404)],_0x1c9fa3[_0x32fa51(0x333)](_0x536e28)),_0x536e28[_0x32fa51(0x4b1)](_0x2a0787,_0xc0f22c,_0x42c2ab,_0x209bfe,_0x27b8e6,_0x58e01c[_0x32fa51(0x173)],_0x1125b7,_0x58e01c[_0x32fa51(0x5d9)],_0x1fa190),_0x536e28[_0x32fa51(0x997)]=_0x531e5b,_0x536e28[_0x32fa51(0x2aa)]=_0x65eef8||_0x58e01c['layer'],_0x536e28[_0x32fa51(0x4c3)]=_0x58e01c[_0x32fa51(0x4c3)],_0x536e28;};};},'./src/js/data/store.js':function(_0x4c5a62,_0xb26ceb){var _0x2220d7=_0xfd30c1;_0x4c5a62[_0x2220d7(0x245)][_0x2220d7(0x4ea)]=[{'id':0x2d,'name':_0x2220d7(0x980),'dontSell':!![],'price':0x0,'scale':0x78,'desc':_0x2220d7(0x33f)},{'id':0x33,'name':_0x2220d7(0x167),'price':0x0,'scale':0x78,'desc':_0x2220d7(0x808)},{'id':0x32,'name':_0x2220d7(0x679),'price':0x0,'scale':0x78,'desc':_0x2220d7(0x636)},{'id':0x1c,'name':_0x2220d7(0x420),'price':0x0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x1d,'name':_0x2220d7(0xdf),'price':0x0,'scale':0x78,'desc':'no\x20effect'},{'id':0x1e,'name':_0x2220d7(0x969),'price':0x0,'scale':0x78,'desc':'no\x20effect'},{'id':0x24,'name':_0x2220d7(0x994),'price':0x0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x25,'name':_0x2220d7(0x7f2),'price':0x0,'scale':0x78,'desc':'no\x20effect'},{'id':0x26,'name':'Monkey\x20Head','price':0x0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x2c,'name':_0x2220d7(0x5f1),'price':0x0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x23,'name':'Fez\x20Hat','price':0x0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x2a,'name':'Enigma\x20Hat','price':0x0,'scale':0x78,'desc':'join\x20the\x20enigma\x20army'},{'id':0x2b,'name':_0x2220d7(0x5d2),'price':0x0,'scale':0x78,'desc':'hey\x20everybody\x20i\x27m\x20blitz'},{'id':0x31,'name':'Bob\x20XIII\x20Hat','price':0x0,'scale':0x78,'desc':_0x2220d7(0x61f)},{'id':0x39,'name':_0x2220d7(0x890),'price':0x32,'scale':0x78,'desc':'Spooooky'},{'id':0x8,'name':_0x2220d7(0x88a),'price':0x64,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x2,'name':'Straw\x20Hat','price':0x1f4,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0xf,'name':_0x2220d7(0x878),'price':0x258,'scale':0x78,'desc':'allows\x20you\x20to\x20move\x20at\x20normal\x20speed\x20in\x20snow','coldM':0x1},{'id':0x5,'name':_0x2220d7(0x697),'price':0x3e8,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x4,'name':_0x2220d7(0x266),'price':0x7d0,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x12,'name':_0x2220d7(0x48f),'price':0x7d0,'scale':0x78,'desc':'no\x20effect'},{'id':0x1f,'name':_0x2220d7(0x355),'price':0x9c4,'scale':0x78,'desc':_0x2220d7(0x8e4),'watrImm':!![]},{'id':0x1,'name':_0x2220d7(0x6c9),'price':0xbb8,'scale':0x78,'desc':_0x2220d7(0x5d3),'aMlt':1.3},{'id':0xa,'name':_0x2220d7(0x12a),'price':0xbb8,'scale':0xa0,'desc':_0x2220d7(0x411)},{'id':0x30,'name':_0x2220d7(0x85c),'price':0xbb8,'scale':0x78,'desc':_0x2220d7(0x615)},{'id':0x6,'name':_0x2220d7(0x4e3),'price':0xfa0,'scale':0x78,'desc':'reduces\x20damage\x20taken\x20but\x20slows\x20movement','spdMult':0.94,'dmgMult':0.75},{'id':0x17,'name':_0x2220d7(0x394),'price':0xfa0,'scale':0x78,'desc':'makes\x20you\x20immune\x20to\x20poison','poisonRes':0x1},{'id':0xd,'name':_0x2220d7(0x18f),'price':0x1388,'scale':0x6e,'desc':'slowly\x20regenerates\x20health\x20over\x20time','healthRegen':0x3},{'id':0x9,'name':_0x2220d7(0x489),'price':0x1388,'scale':0x78,'desc':_0x2220d7(0x3eb),'extraGold':0x1},{'id':0x20,'name':_0x2220d7(0x823),'price':0x1388,'scale':0x78,'desc':_0x2220d7(0x2c6),'projCost':0.5},{'id':0x7,'name':'Bull\x20Helmet','price':0x1770,'scale':0x78,'desc':_0x2220d7(0x918),'healthRegen':-0x5,'dmgMultO':1.5,'spdMult':0.96},{'id':0x16,'name':_0x2220d7(0x39a),'price':0x1770,'scale':0x78,'desc':_0x2220d7(0x5e3),'antiTurret':0x1,'spdMult':0.7},{'id':0xc,'name':_0x2220d7(0x8ed),'price':0x1770,'scale':0x78,'desc':_0x2220d7(0x7c9),'spdMult':1.16},{'id':0x1a,'name':'Barbarian\x20Armor','price':0x1f40,'scale':0x78,'desc':_0x2220d7(0x306),'dmgK':0.6},{'id':0x15,'name':_0x2220d7(0x1e5),'price':0x2710,'scale':0x78,'desc':_0x2220d7(0x133),'poisonDmg':0x5,'poisonTime':0x6},{'id':0x2e,'name':'Bull\x20Mask','price':0x2710,'scale':0x78,'desc':_0x2220d7(0x681),'bullRepel':0x1},{'id':0xe,'name':'Windmill\x20Hat','topSprite':!![],'price':0x2710,'scale':0x78,'desc':_0x2220d7(0x1b0),'pps':1.5},{'id':0xb,'name':_0x2220d7(0x867),'topSprite':!![],'price':0x2710,'scale':0x78,'desc':'deal\x20damage\x20to\x20players\x20that\x20damage\x20you','dmg':0.45},{'id':0x35,'name':'Turret\x20Gear','topSprite':!![],'price':0x2710,'scale':0x78,'desc':_0x2220d7(0x7f0),'turret':{'proj':0x1,'range':0x2bc,'rate':0x9c4},'spdMult':0.7},{'id':0x14,'name':_0x2220d7(0x6df),'price':0x2ee0,'scale':0x78,'desc':_0x2220d7(0x185),'atkSpd':0.78},{'id':0x3a,'name':_0x2220d7(0x559),'price':0x2ee0,'scale':0x78,'desc':'restores\x20health\x20when\x20you\x20deal\x20damage','healD':0.4},{'id':0x1b,'name':'Scavenger\x20Gear','price':0x3a98,'scale':0x78,'desc':_0x2220d7(0x8ff),'kScrM':0x2},{'id':0x28,'name':_0x2220d7(0x24a),'price':0x3a98,'scale':0x78,'desc':_0x2220d7(0x692),'spdMult':0.3,'bDmg':3.3},{'id':0x34,'name':_0x2220d7(0x410),'price':0x3a98,'scale':0x78,'desc':'steal\x20half\x20of\x20a\x20players\x20gold\x20when\x20you\x20kill\x20them','goldSteal':0.5},{'id':0x37,'name':_0x2220d7(0x776),'price':0x4e20,'scale':0x78,'desc':_0x2220d7(0x7b4),'healD':0.25,'dmgMultO':1.2},{'id':0x38,'name':_0x2220d7(0x273),'price':0x4e20,'scale':0x78,'desc':_0x2220d7(0x5c9),'noEat':!![],'spdMult':1.1,'invisTimer':0x3e8}],_0x4c5a62[_0x2220d7(0x245)][_0x2220d7(0x75b)]=[{'id':0xc,'name':_0x2220d7(0x38a),'price':0x3e8,'scale':0x69,'xOff':0x12,'desc':_0x2220d7(0x615)},{'id':0x9,'name':_0x2220d7(0x4f0),'price':0x3e8,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0xa,'name':_0x2220d7(0x859),'price':0x3e8,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0x3,'name':_0x2220d7(0x947),'price':0x5dc,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0x8,'name':_0x2220d7(0x3bd),'price':0x7d0,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0xb,'name':_0x2220d7(0x275),'price':0x7d0,'scale':0x61,'xOff':0x19,'desc':'Super\x20speed\x20but\x20reduced\x20damage','spdMult':1.35,'dmgMultO':0.2},{'id':0x11,'name':_0x2220d7(0x119),'price':0xbb8,'scale':0x50,'xOff':0xc,'desc':_0x2220d7(0x718),'healthRegen':0x1},{'id':0x6,'name':'Winter\x20Cape','price':0xbb8,'scale':0x5a,'desc':'no\x20effect'},{'id':0x4,'name':_0x2220d7(0x5ac),'price':0xfa0,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0x5,'name':_0x2220d7(0x6ef),'price':0x1388,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0x2,'name':_0x2220d7(0x84d),'price':0x1770,'scale':0x5a,'desc':'no\x20effect'},{'id':0x1,'name':_0x2220d7(0x1f5),'price':0x1f40,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0x7,'name':_0x2220d7(0x9ac),'price':0x1f40,'scale':0x5a,'desc':_0x2220d7(0x615)},{'id':0xe,'name':_0x2220d7(0x16a),'price':0x2710,'scale':0x73,'xOff':0x14,'desc':_0x2220d7(0x615)},{'id':0xf,'name':'Blockades','price':0x2710,'scale':0x5f,'xOff':0xf,'desc':_0x2220d7(0x615)},{'id':0x14,'name':_0x2220d7(0x7da),'price':0x2710,'scale':0x5f,'xOff':0x14,'desc':_0x2220d7(0x615)},{'id':0x10,'name':_0x2220d7(0x3d3),'price':0x2ee0,'scale':0x5a,'spin':!![],'xOff':0x0,'desc':_0x2220d7(0x846),'dmg':0.15},{'id':0xd,'name':_0x2220d7(0x7c4),'price':0x3a98,'scale':0x8a,'xOff':0x16,'desc':_0x2220d7(0x718),'healthRegen':0x3},{'id':0x13,'name':_0x2220d7(0x905),'price':0x3a98,'scale':0x8a,'xOff':0x16,'desc':_0x2220d7(0x519),'spdMult':1.1},{'id':0x12,'name':_0x2220d7(0x36e),'price':0x4e20,'scale':0xb2,'xOff':0x1a,'desc':_0x2220d7(0x4fe),'healD':0.2},{'id':0x15,'name':_0x2220d7(0x390),'price':0x4e20,'scale':0xb2,'xOff':0x1a,'desc':_0x2220d7(0x846),'dmg':0.25}];},'./src/js/libs/animText.js':function(_0x38f691,_0x41f212){var _0x3c49f7=_0xfd30c1;_0x38f691[_0x3c49f7(0x245)][_0x3c49f7(0x74e)]=function(){var _0x1994d0=_0x3c49f7;this[_0x1994d0(0x4b1)]=function(_0x3d4994,_0x1cb625,_0x25ad47,_0x166684,_0x429e60,_0x457cd4,_0x1b7583){var _0xf15147=_0x1994d0;this['x']=_0x3d4994,this['y']=_0x1cb625,this[_0xf15147(0x4b5)]=_0x1b7583,this[_0xf15147(0x5d9)]=_0x25ad47,this[_0xf15147(0x7fc)]=this[_0xf15147(0x5d9)],this['maxScale']=_0x25ad47*1.5,this[_0xf15147(0x910)]=0.7,this[_0xf15147(0x737)]=_0x166684,this['life']=_0x429e60,this[_0xf15147(0x957)]=_0x457cd4;},this['update']=function(_0x38c059){var _0x19b6be=_0x1994d0;if(this[_0x19b6be(0x676)]){this['life']-=_0x38c059,this['y']-=this[_0x19b6be(0x737)]*_0x38c059,this['scale']+=this[_0x19b6be(0x910)]*_0x38c059;if(this[_0x19b6be(0x5d9)]>=this[_0x19b6be(0x832)])this[_0x19b6be(0x5d9)]=this[_0x19b6be(0x832)],this[_0x19b6be(0x910)]*=-0x1;else this['scale']<=this['startScale']&&(this[_0x19b6be(0x5d9)]=this[_0x19b6be(0x7fc)],this[_0x19b6be(0x910)]=0x0);this['life']<=0x0&&(this[_0x19b6be(0x676)]=0x0);}},this[_0x1994d0(0xf8)]=function(_0x2e3e6d,_0x179dd9,_0x505c25){var _0xc78946=_0x1994d0;_0x2e3e6d[_0xc78946(0x3fb)]=this[_0xc78946(0x4b5)],_0x2e3e6d[_0xc78946(0x872)]=this[_0xc78946(0x5d9)]+'px\x20Hammersmith\x20One',pfmMode&&!fuckoll&&_0x2e3e6d['strokeText'](this['text'],this['x']-_0x179dd9,this['y']-_0x505c25),_0x2e3e6d[_0xc78946(0x7d2)](this[_0xc78946(0x957)],this['x']-_0x179dd9,this['y']-_0x505c25);};},_0x38f691[_0x3c49f7(0x245)][_0x3c49f7(0x77d)]=function(){var _0x2c6f42=_0x3c49f7;this[_0x2c6f42(0x45e)]=[],this[_0x2c6f42(0x767)]=function(_0x527976,_0x1da158,_0x384adc,_0x1fff46){var _0x4dcf37=_0x2c6f42;_0x1da158[_0x4dcf37(0x8af)]=_0x4dcf37(0x3e2),_0x1da158[_0x4dcf37(0x8d9)]=_0x4dcf37(0x9a6);for(var _0x561d54=0x0;_0x561d54<this[_0x4dcf37(0x45e)]['length'];++_0x561d54){this[_0x4dcf37(0x45e)][_0x561d54][_0x4dcf37(0x676)]&&(this['texts'][_0x561d54][_0x4dcf37(0x767)](_0x527976),this['texts'][_0x561d54][_0x4dcf37(0xf8)](_0x1da158,_0x384adc,_0x1fff46));}},this[_0x2c6f42(0x3d8)]=function(_0x4386a0,_0x5174f2,_0x2fac96,_0x3be666,_0x485e5c,_0x252cc2,_0x1c50f6){var _0x18405a=_0x2c6f42,_0xfba3a5;for(var _0x32f98f=0x0;_0x32f98f<this['texts'][_0x18405a(0x404)];++_0x32f98f){if(!this[_0x18405a(0x45e)][_0x32f98f][_0x18405a(0x676)]){_0xfba3a5=this[_0x18405a(0x45e)][_0x32f98f];break;}}!_0xfba3a5&&(_0xfba3a5=new _0x38f691['exports'][(_0x18405a(0x74e))](),this[_0x18405a(0x45e)][_0x18405a(0x333)](_0xfba3a5)),_0xfba3a5[_0x18405a(0x4b1)](_0x4386a0,_0x5174f2,_0x2fac96,_0x3be666,_0x485e5c,_0x252cc2,_0x1c50f6);};};},'./src/js/libs/io-client.js':function(_0x52f366,_0x1b001,_0x5cb590){var _0x352c93=_0xfd30c1,_0x2d27fc=_0x5cb590(_0x352c93(0x6b8)),_0x1ba6e6=_0x5cb590(_0x352c93(0x4e8));_0x52f366[_0x352c93(0x245)]={'socket':null,'connected':![],'socketId':-0x1,'connect':function(_0x5a304e,_0x17648b,_0x27c3de){var _0x79f2c1=_0x352c93;if(this[_0x79f2c1(0x3cc)])return;var _0x37107b=this;try{var _0x5293e3=![],_0x490b49=_0x5a304e;this[_0x79f2c1(0x3cc)]=new WebSocket(_0x490b49),this[_0x79f2c1(0x3cc)][_0x79f2c1(0x99a)]=_0x79f2c1(0x363),this['socket'][_0x79f2c1(0x990)]=function(_0xe20dbd){var _0x1b589e=_0x79f2c1,_0x37a6d3=new Uint8Array(_0xe20dbd['data']),_0x47ea45=_0x2d27fc['decode'](_0x37a6d3),_0x12ca9f=_0x47ea45[0x0],_0x37a6d3=_0x47ea45[0x1];_0x12ca9f==_0x1b589e(0x16b)?_0x37107b[_0x1b589e(0x3b2)]=_0x37a6d3[0x0]:_0x27c3de[_0x12ca9f][_0x1b589e(0x416)](undefined,_0x37a6d3);},this['socket']['onopen']=function(){var _0x391dbe=_0x79f2c1;_0x37107b[_0x391dbe(0x65b)]=!![],_0x17648b();},this[_0x79f2c1(0x3cc)][_0x79f2c1(0x658)]=function(_0x47309c){var _0x631a6=_0x79f2c1;_0x37107b[_0x631a6(0x65b)]=![];if(_0x47309c[_0x631a6(0x900)]==0xfa1)_0x17648b(_0x631a6(0x39f));else!_0x5293e3&&_0x17648b(_0x631a6(0x608));!silentMode&&madeinohio['play']();},this[_0x79f2c1(0x3cc)][_0x79f2c1(0x589)]=function(_0x33268d){var _0x12b586=_0x79f2c1;this[_0x12b586(0x3cc)]&&this['socket'][_0x12b586(0x54c)]!=WebSocket[_0x12b586(0x5be)]&&(_0x5293e3=!![],console[_0x12b586(0x514)]('Socket\x20error',arguments),_0x17648b('Socket\x20error'));};}catch(_0x2371d5){console[_0x79f2c1(0x349)](_0x79f2c1(0x941),_0x2371d5),_0x17648b(_0x2371d5);}},'send':function(_0x40c00c){var _0xb61900=_0x352c93,_0x4af73e=Array[_0xb61900(0x59d)][_0xb61900(0x789)][_0xb61900(0x7bf)](arguments,0x1),_0x3be0a1=_0x2d27fc[_0xb61900(0x11e)]([_0x40c00c,_0x4af73e]);this['socket']['send'](_0x3be0a1);},'doNewSend':function(_0x203e42){var _0x38bc6b=_0x352c93,_0x35e8d7=Array[_0x38bc6b(0x59d)][_0x38bc6b(0x789)][_0x38bc6b(0x7bf)](arguments,0x1),_0x45571c=_0x2d27fc['encode']([_0x203e42,_0x35e8d7]);this['socket'][_0x38bc6b(0x1a6)](_0x45571c);},'socketReady':function(){var _0x327fc4=_0x352c93;return this[_0x327fc4(0x3cc)]&&this['connected'];},'close':function(){var _0x11dc63=_0x352c93;this[_0x11dc63(0x3cc)]&&this['socket'][_0x11dc63(0x7d6)]();}};},'./src/js/libs/modernizr.js':function(_0x59d29e,_0x395e15){!function(_0x54f2ed,_0x3f6a9b,_0x464b2e){var _0x568be0=_0x2943;function _0x46b7ce(_0x3c382c,_0x49c861){return typeof _0x3c382c===_0x49c861;}function _0x500c11(){var _0x1d2108=_0x2943,_0x552bc9,_0x493351,_0x5bfa11,_0x27f5eb,_0x11e6c1,_0x2a83ca,_0x5efcd1;for(var _0x506501 in _0x181309)if(_0x181309[_0x1d2108(0x19b)](_0x506501)){if(_0x552bc9=[],_0x493351=_0x181309[_0x506501],_0x493351[_0x1d2108(0x2f1)]&&(_0x552bc9['push'](_0x493351[_0x1d2108(0x2f1)][_0x1d2108(0x14f)]()),_0x493351[_0x1d2108(0x857)]&&_0x493351['options'][_0x1d2108(0x477)]&&_0x493351[_0x1d2108(0x857)]['aliases']['length'])){for(_0x5bfa11=0x0;_0x5bfa11<_0x493351[_0x1d2108(0x857)][_0x1d2108(0x477)]['length'];_0x5bfa11++)_0x552bc9[_0x1d2108(0x333)](_0x493351[_0x1d2108(0x857)][_0x1d2108(0x477)][_0x5bfa11][_0x1d2108(0x14f)]());}for(_0x27f5eb=_0x46b7ce(_0x493351['fn'],_0x1d2108(0x848))?_0x493351['fn']():_0x493351['fn'],_0x11e6c1=0x0;_0x11e6c1<_0x552bc9['length'];_0x11e6c1++)_0x2a83ca=_0x552bc9[_0x11e6c1],_0x5efcd1=_0x2a83ca[_0x1d2108(0x87c)]('.'),0x1===_0x5efcd1[_0x1d2108(0x404)]?_0x48ca16[_0x5efcd1[0x0]]=_0x27f5eb:(!_0x48ca16[_0x5efcd1[0x0]]||_0x48ca16[_0x5efcd1[0x0]]instanceof Boolean||(_0x48ca16[_0x5efcd1[0x0]]=new Boolean(_0x48ca16[_0x5efcd1[0x0]])),_0x48ca16[_0x5efcd1[0x0]][_0x5efcd1[0x1]]=_0x27f5eb),_0xa2bfa7[_0x1d2108(0x333)]((_0x27f5eb?'':_0x1d2108(0x295))+_0x5efcd1[_0x1d2108(0x64e)]('-'));}}function _0x1cd0c2(_0x203b55){var _0x52c967=_0x2943,_0x2a095d=_0xff543b[_0x52c967(0x11c)],_0x1104ff=_0x48ca16[_0x52c967(0x93d)][_0x52c967(0x8d2)]||'';if(_0x80ae68&&(_0x2a095d=_0x2a095d[_0x52c967(0x673)]),_0x48ca16['_config'][_0x52c967(0x3ae)]){var _0x4d9bd4=new RegExp('(^|\x5cs)'+_0x1104ff+_0x52c967(0x795));_0x2a095d=_0x2a095d[_0x52c967(0x759)](_0x4d9bd4,'$1'+_0x1104ff+_0x52c967(0x473));}_0x48ca16[_0x52c967(0x93d)][_0x52c967(0x671)]&&(_0x2a095d+='\x20'+_0x1104ff+_0x203b55[_0x52c967(0x64e)]('\x20'+_0x1104ff),_0x80ae68?_0xff543b[_0x52c967(0x11c)][_0x52c967(0x673)]=_0x2a095d:_0xff543b[_0x52c967(0x11c)]=_0x2a095d);}var _0xa2bfa7=[],_0x181309=[],_0x355f9f={'_version':'3.5.0','_config':{'classPrefix':'','enableClasses':!0x0,'enableJSClass':!0x0,'usePrefixes':!0x0},'_q':[],'on':function(_0x5ed1b2,_0x4b360d){var _0x3a04cb=this;setTimeout(function(){_0x4b360d(_0x3a04cb[_0x5ed1b2]);},0x0);},'addTest':function(_0x4b73da,_0x4e0871,_0x15ebf2){var _0x583bdb=_0x2943;_0x181309[_0x583bdb(0x333)]({'name':_0x4b73da,'fn':_0x4e0871,'options':_0x15ebf2});},'addAsyncTest':function(_0x48f5f4){var _0x378979=_0x2943;_0x181309[_0x378979(0x333)]({'name':null,'fn':_0x48f5f4});}},_0x48ca16=function(){};_0x48ca16['prototype']=_0x355f9f,_0x48ca16=new _0x48ca16();var _0xff543b=_0x3f6a9b[_0x568be0(0x906)],_0x80ae68='svg'===_0xff543b[_0x568be0(0x63a)][_0x568be0(0x14f)]();_0x48ca16[_0x568be0(0x843)](_0x568be0(0x2fb),function(){var _0x47085e=_0x568be0,_0x57107c=!0x1;try{var _0x1c7e20=Object[_0x47085e(0x4b6)]({},'passive',{'get':function(){_0x57107c=!0x0;}});_0x54f2ed['addEventListener'](_0x47085e(0x509),null,_0x1c7e20);}catch(_0x203a62){}return _0x57107c;}),_0x500c11(),_0x1cd0c2(_0xa2bfa7),delete _0x355f9f[_0x568be0(0x843)],delete _0x355f9f[_0x568be0(0x894)];for(var _0x5b64ad=0x0;_0x5b64ad<_0x48ca16['_q']['length'];_0x5b64ad++)_0x48ca16['_q'][_0x5b64ad]();_0x54f2ed['Modernizr']=_0x48ca16;}(window,document);},'./src/js/libs/soundManager.js':function(_0x27ce4c,_0x356ae3){var _0x4a7688=_0xfd30c1;_0x27ce4c['exports'][_0x4a7688(0x13b)]=function(_0x59dca5,_0x1a603e){var _0x353311=_0x4a7688,_0x397c49;this[_0x353311(0x492)]=[],this[_0x353311(0x4ab)]=!![],this[_0x353311(0x236)]=function(_0x516a00,_0x157b5e,_0x4ad6a3){var _0x3db0dc=_0x353311;if(!_0x157b5e||!this['active'])return;_0x397c49=this[_0x3db0dc(0x492)][_0x516a00],!_0x397c49&&(_0x397c49=new Howl({'src':_0x3db0dc(0x7ed)+_0x516a00+_0x3db0dc(0x421)}),this[_0x3db0dc(0x492)][_0x516a00]=_0x397c49),(!_0x4ad6a3||!_0x397c49['isPlaying'])&&(_0x397c49['isPlaying']=!![],_0x397c49[_0x3db0dc(0x236)](),_0x397c49[_0x3db0dc(0x98f)]((_0x157b5e||0x1)*_0x59dca5['volumeMult']),_0x397c49[_0x3db0dc(0x120)](_0x4ad6a3));},this[_0x353311(0x4c6)]=function(_0x248e8c,_0x261ece){var _0x555900=_0x353311;_0x397c49=this[_0x555900(0x492)][_0x248e8c];if(_0x397c49)_0x397c49[_0x555900(0x988)](_0x261ece);},this[_0x353311(0x4ae)]=function(_0x50bbb9){var _0x24b981=_0x353311;_0x397c49=this['sounds'][_0x50bbb9],_0x397c49&&(_0x397c49[_0x24b981(0x4ae)](),_0x397c49[_0x24b981(0x80d)]=![]);};};},'./src/js/libs/utils.js':function(_0x140968,_0x125b81){var _0x23eccb=_0xfd30c1,_0xabf96c=Math[_0x23eccb(0x11d)],_0x2b21c2=Math[_0x23eccb(0x90f)],_0xe1c64e=Math['sin'],_0x59e6b8=Math[_0x23eccb(0x11f)],_0x3a9169=Math[_0x23eccb(0x934)],_0x28e09a=Math[_0x23eccb(0x634)],_0x52f8bf=Math['PI'];_0x140968[_0x23eccb(0x245)][_0x23eccb(0x1af)]=function(_0x42c2be,_0x527a39){var _0x21c4f4=_0x23eccb;return Math[_0x21c4f4(0x7ee)](Math[_0x21c4f4(0x459)]()*(_0x527a39-_0x42c2be+0x1))+_0x42c2be;},_0x140968[_0x23eccb(0x245)]['randFloat']=function(_0xb03b7e,_0x35ddba){return Math['random']()*(_0x35ddba-_0xb03b7e+0x1)+_0xb03b7e;},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x829)]=function(_0x371944,_0x56e2c5,_0x5eb1c0){return _0x371944+(_0x56e2c5-_0x371944)*_0x5eb1c0;},_0x140968['exports'][_0x23eccb(0x89a)]=function(_0x974c3f,_0x2d69fd){var _0x5d6f20=_0x23eccb;if(_0x974c3f>0x0)_0x974c3f=Math[_0x5d6f20(0x77b)](0x0,_0x974c3f-_0x2d69fd);else{if(_0x974c3f<0x0)_0x974c3f=Math[_0x5d6f20(0x176)](0x0,_0x974c3f+_0x2d69fd);}return _0x974c3f;},_0x140968[_0x23eccb(0x245)]['getDistance']=function(_0x500e5f,_0x2dc979,_0x3486e,_0xe6b4ed){return _0x3a9169((_0x3486e-=_0x500e5f)*_0x3486e+(_0xe6b4ed-=_0x2dc979)*_0xe6b4ed);},_0x140968[_0x23eccb(0x245)]['getDirection']=function(_0x10aecb,_0x238ab5,_0xfee819,_0x1fd078){return _0x28e09a(_0x238ab5-_0x1fd078,_0x10aecb-_0xfee819);},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x80c)]=function(_0x106804,_0x3862b2){var _0x3fb72d=_0xabf96c(_0x3862b2-_0x106804)%(_0x52f8bf*0x2);return _0x3fb72d>_0x52f8bf?_0x52f8bf*0x2-_0x3fb72d:_0x3fb72d;},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x335)]=function(_0x233710){return typeof _0x233710=='number'&&!isNaN(_0x233710)&&isFinite(_0x233710);},_0x140968[_0x23eccb(0x245)]['isString']=function(_0x92623c){var _0x1bd687=_0x23eccb;return _0x92623c&&typeof _0x92623c==_0x1bd687(0x325);},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x80e)]=function(_0x40f037){var _0x2623b3=_0x23eccb;return _0x40f037>0x3e7?(_0x40f037/0x3e8)[_0x2623b3(0x70e)](0x1)+'k':_0x40f037;},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x4d8)]=function(_0x45a40c){var _0x4aa289=_0x23eccb;return _0x45a40c[_0x4aa289(0x297)](0x0)[_0x4aa289(0x738)]()+_0x45a40c[_0x4aa289(0x789)](0x1);},_0x140968['exports'][_0x23eccb(0xe1)]=function(_0x42457a,_0x354c3a){var _0x83ff8e=_0x23eccb;return parseFloat(_0x42457a[_0x83ff8e(0x70e)](_0x354c3a));},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x67e)]=function(_0x2f9965,_0x211f8a){return parseFloat(_0x211f8a['points'])-parseFloat(_0x2f9965['points']);},_0x140968['exports'][_0x23eccb(0x555)]=function(_0x28a05f,_0x4b7a24,_0x3702dd,_0x117d4a,_0x58bdb,_0x459828,_0x4fdd3d,_0x40b299){var _0x48bcb6=_0x23eccb,_0x230df3=_0x58bdb,_0x54bed1=_0x4fdd3d;_0x58bdb>_0x4fdd3d&&(_0x230df3=_0x4fdd3d,_0x54bed1=_0x58bdb);if(_0x54bed1>_0x3702dd)_0x54bed1=_0x3702dd;if(_0x230df3<_0x28a05f)_0x230df3=_0x28a05f;if(_0x230df3>_0x54bed1)return![];var _0x5677a8=_0x459828,_0x2a0526=_0x40b299,_0x5cb63b=_0x4fdd3d-_0x58bdb;if(Math[_0x48bcb6(0x11d)](_0x5cb63b)>1e-7){var _0x5341a1=(_0x40b299-_0x459828)/_0x5cb63b,_0x5751ee=_0x459828-_0x5341a1*_0x58bdb;_0x5677a8=_0x5341a1*_0x230df3+_0x5751ee,_0x2a0526=_0x5341a1*_0x54bed1+_0x5751ee;}if(_0x5677a8>_0x2a0526){var _0x14a22e=_0x2a0526;_0x2a0526=_0x5677a8,_0x5677a8=_0x14a22e;}if(_0x2a0526>_0x117d4a)_0x2a0526=_0x117d4a;if(_0x5677a8<_0x4b7a24)_0x5677a8=_0x4b7a24;if(_0x5677a8>_0x2a0526)return![];return!![];},_0x140968['exports'][_0x23eccb(0x95f)]=function(_0x3ac5d5,_0x1cc5d9,_0x91f0d6){var _0x1911a2=_0x23eccb,_0xa901e8=_0x3ac5d5[_0x1911a2(0x42c)](),_0x25bb2f=_0xa901e8[_0x1911a2(0x545)]+window[_0x1911a2(0x782)],_0x4c4cc0=_0xa901e8[_0x1911a2(0x5b3)]+window[_0x1911a2(0x73b)],_0x3c0e14=_0xa901e8[_0x1911a2(0x338)],_0x4369ee=_0xa901e8['height'],_0x3cb96c=_0x1cc5d9>_0x25bb2f&&_0x1cc5d9<_0x25bb2f+_0x3c0e14,_0x3da8db=_0x91f0d6>_0x4c4cc0&&_0x91f0d6<_0x4c4cc0+_0x4369ee;return _0x3cb96c&&_0x3da8db;},_0x140968['exports']['mousifyTouchEvent']=function(_0x300cd7){var _0x3e0a02=_0x23eccb,_0x3b7102=_0x300cd7[_0x3e0a02(0x541)][0x0];_0x300cd7['screenX']=_0x3b7102[_0x3e0a02(0x301)],_0x300cd7[_0x3e0a02(0x242)]=_0x3b7102['screenY'],_0x300cd7[_0x3e0a02(0x60b)]=_0x3b7102['clientX'],_0x300cd7[_0x3e0a02(0x78b)]=_0x3b7102[_0x3e0a02(0x78b)],_0x300cd7[_0x3e0a02(0x3af)]=_0x3b7102[_0x3e0a02(0x3af)],_0x300cd7[_0x3e0a02(0x860)]=_0x3b7102[_0x3e0a02(0x860)];},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x4fb)]=function(_0x2a6760,_0x4d1bde){var _0x2fc847=_0x23eccb,_0x57d30f=!_0x4d1bde,_0x28771b=![],_0x5d32a7=![];_0x2a6760[_0x2fc847(0x8bb)](_0x2fc847(0x43a),_0x140968[_0x2fc847(0x245)][_0x2fc847(0x89e)](_0xf862b4),_0x5d32a7),_0x2a6760[_0x2fc847(0x8bb)](_0x2fc847(0x662),_0x140968[_0x2fc847(0x245)][_0x2fc847(0x89e)](_0x5d784c),_0x5d32a7),_0x2a6760[_0x2fc847(0x8bb)](_0x2fc847(0x919),_0x140968['exports']['checkTrusted'](_0x2ac6ab),_0x5d32a7),_0x2a6760['addEventListener'](_0x2fc847(0x43b),_0x140968['exports'][_0x2fc847(0x89e)](_0x2ac6ab),_0x5d32a7),_0x2a6760[_0x2fc847(0x8bb)]('touchleave',_0x140968[_0x2fc847(0x245)][_0x2fc847(0x89e)](_0x2ac6ab),_0x5d32a7);function _0xf862b4(_0x4f43ee){var _0x21973f=_0x2fc847;_0x140968['exports'][_0x21973f(0x425)](_0x4f43ee),window['setUsingTouch'](!![]);_0x57d30f&&(_0x4f43ee[_0x21973f(0x2a4)](),_0x4f43ee[_0x21973f(0x827)]());if(_0x2a6760['onmouseover'])_0x2a6760[_0x21973f(0x16f)](_0x4f43ee);_0x28771b=!![];}function _0x5d784c(_0x469007){var _0x22b3f3=_0x2fc847;_0x140968[_0x22b3f3(0x245)][_0x22b3f3(0x425)](_0x469007),window[_0x22b3f3(0x4cf)](!![]);_0x57d30f&&(_0x469007[_0x22b3f3(0x2a4)](),_0x469007['stopPropagation']());if(_0x140968['exports'][_0x22b3f3(0x95f)](_0x2a6760,_0x469007[_0x22b3f3(0x3af)],_0x469007[_0x22b3f3(0x860)])){if(!_0x28771b){if(_0x2a6760[_0x22b3f3(0x16f)])_0x2a6760[_0x22b3f3(0x16f)](_0x469007);_0x28771b=!![];}}else{if(_0x28771b){if(_0x2a6760[_0x22b3f3(0x2f5)])_0x2a6760[_0x22b3f3(0x2f5)](_0x469007);_0x28771b=![];}}}function _0x2ac6ab(_0x374e20){var _0x13fe2c=_0x2fc847;_0x140968[_0x13fe2c(0x245)][_0x13fe2c(0x425)](_0x374e20),window[_0x13fe2c(0x4cf)](!![]);_0x57d30f&&(_0x374e20[_0x13fe2c(0x2a4)](),_0x374e20[_0x13fe2c(0x827)]());if(_0x28771b){if(_0x2a6760['onclick'])_0x2a6760[_0x13fe2c(0x90b)](_0x374e20);if(_0x2a6760['onmouseout'])_0x2a6760[_0x13fe2c(0x2f5)](_0x374e20);_0x28771b=![];}}},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x365)]=function(_0x2254bf){var _0x27b9ad=_0x23eccb;while(_0x2254bf['hasChildNodes']()){_0x2254bf[_0x27b9ad(0x1ef)](_0x2254bf[_0x27b9ad(0x2bc)]);}},_0x140968[_0x23eccb(0x245)]['generateElement']=function(_0x5178ba){var _0x1c34fa=_0x23eccb,_0x5a5f61=document[_0x1c34fa(0x9a5)](_0x5178ba[_0x1c34fa(0x19c)]||_0x1c34fa(0x3d6));function _0x5956a9(_0x412434,_0x1ba9d2){if(_0x5178ba[_0x412434])_0x5a5f61[_0x1ba9d2]=_0x5178ba[_0x412434];}_0x5956a9('text',_0x1c34fa(0x516)),_0x5956a9(_0x1c34fa(0x7c7),_0x1c34fa(0x426)),_0x5956a9(_0x1c34fa(0x20e),_0x1c34fa(0x11c));for(var _0x368b2f in _0x5178ba){switch(_0x368b2f){case _0x1c34fa(0x19c):case _0x1c34fa(0x957):case _0x1c34fa(0x7c7):case _0x1c34fa(0x20e):case _0x1c34fa(0x29c):case'hookTouch':case _0x1c34fa(0x7d0):case _0x1c34fa(0x6d4):continue;default:break;}_0x5a5f61[_0x368b2f]=_0x5178ba[_0x368b2f];}if(_0x5a5f61['onclick'])_0x5a5f61[_0x1c34fa(0x90b)]=_0x140968['exports'][_0x1c34fa(0x89e)](_0x5a5f61['onclick']);if(_0x5a5f61[_0x1c34fa(0x16f)])_0x5a5f61[_0x1c34fa(0x16f)]=_0x140968[_0x1c34fa(0x245)][_0x1c34fa(0x89e)](_0x5a5f61['onmouseover']);if(_0x5a5f61[_0x1c34fa(0x2f5)])_0x5a5f61[_0x1c34fa(0x2f5)]=_0x140968[_0x1c34fa(0x245)]['checkTrusted'](_0x5a5f61[_0x1c34fa(0x2f5)]);_0x5178ba[_0x1c34fa(0x29c)]&&(_0x5a5f61[_0x1c34fa(0x29c)][_0x1c34fa(0xe3)]=_0x5178ba['style']);_0x5178ba[_0x1c34fa(0x186)]&&_0x140968['exports'][_0x1c34fa(0x4fb)](_0x5a5f61);_0x5178ba['parent']&&_0x5178ba[_0x1c34fa(0x7d0)][_0x1c34fa(0x8bf)](_0x5a5f61);if(_0x5178ba[_0x1c34fa(0x6d4)])for(var _0x3f20aa=0x0;_0x3f20aa<_0x5178ba[_0x1c34fa(0x6d4)][_0x1c34fa(0x404)];_0x3f20aa++){_0x5a5f61[_0x1c34fa(0x8bf)](_0x5178ba[_0x1c34fa(0x6d4)][_0x3f20aa]);}return _0x5a5f61;},_0x140968[_0x23eccb(0x245)][_0x23eccb(0x3d5)]=function(_0x99f18f){var _0x280dba=_0x23eccb;return _0x99f18f&&typeof _0x99f18f[_0x280dba(0x72c)]==_0x280dba(0x97a)?_0x99f18f['isTrusted']:!![];},_0x140968['exports'][_0x23eccb(0x89e)]=function(_0x58d8ba){return function(_0x4c04a2){var _0x2edb8a=_0x2943;if(_0x4c04a2&&_0x4c04a2 instanceof Event&&_0x140968['exports'][_0x2edb8a(0x3d5)](_0x4c04a2))_0x58d8ba(_0x4c04a2);else{}};},_0x140968['exports'][_0x23eccb(0x7bb)]=function(_0x32c0dd){var _0x2c7970=_0x23eccb,_0x7dab45='',_0x3ddfa='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';for(var _0x481031=0x0;_0x481031<_0x32c0dd;_0x481031++){_0x7dab45+=_0x3ddfa[_0x2c7970(0x297)](Math[_0x2c7970(0x7ee)](Math[_0x2c7970(0x459)]()*_0x3ddfa[_0x2c7970(0x404)]));}return _0x7dab45;},_0x140968[_0x23eccb(0x245)]['countInArray']=function(_0x331593,_0x2e284e){var _0x4d954c=_0x23eccb,_0x27bbe1=0x0;for(var _0x12dd2e=0x0;_0x12dd2e<_0x331593[_0x4d954c(0x404)];_0x12dd2e++){if(_0x331593[_0x12dd2e]===_0x2e284e)_0x27bbe1++;}return _0x27bbe1;};},'./vultr/VultrClient.js':function(_0x1492c0,_0x1c1fa6,_0x2229da){var _0x2a1325=_0xfd30c1,_0xc7039e=_0x2229da(_0x2a1325(0x600)),_0x307c23=_0x2229da(_0x2a1325(0x7d4));function _0x4d7349(_0x2fc87c,_0x17418d,_0x574ebf,_0x173c1c,_0x3fc1a9){var _0x3de19f=_0x2a1325;location[_0x3de19f(0x917)]==_0x3de19f(0x4ef)&&(window['location'][_0x3de19f(0x917)]='127.0.0.1'),this[_0x3de19f(0x122)]=![],this[_0x3de19f(0x68e)]=_0x2fc87c,this[_0x3de19f(0x667)]=_0x574ebf,this[_0x3de19f(0x20f)]=_0x17418d,this[_0x3de19f(0x72d)]=_0x173c1c,this['rawIPs']=!!_0x3fc1a9,this[_0x3de19f(0x153)]=undefined,this[_0x3de19f(0x87a)]=undefined,this[_0x3de19f(0x359)]=undefined,this[_0x3de19f(0x2ea)]=undefined,this[_0x3de19f(0x79d)](vultr[_0x3de19f(0x536)]);}_0x4d7349[_0x2a1325(0x59d)]['regionInfo']={0x0:{'name':_0x2a1325(0x81f),'latitude':0x0,'longitude':0x0},'vultr:1':{'name':'New\x20Jersey','latitude':40.1393329,'longitude':-75.8521818},'vultr:2':{'name':_0x2a1325(0x6d7),'latitude':41.8339037,'longitude':-87.872238},'vultr:3':{'name':_0x2a1325(0x93c),'latitude':32.8208751,'longitude':-96.8714229},'vultr:4':{'name':_0x2a1325(0x20c),'latitude':47.6149942,'longitude':-122.4759879},'vultr:5':{'name':_0x2a1325(0x2b4),'latitude':34.0207504,'longitude':-118.691914},'vultr:6':{'name':_0x2a1325(0x9aa),'latitude':33.7676334,'longitude':-84.5610332},'vultr:7':{'name':_0x2a1325(0x665),'latitude':52.3745287,'longitude':4.7581878},'vultr:8':{'name':_0x2a1325(0x4e1),'latitude':51.5283063,'longitude':-0.382486},'vultr:9':{'name':_0x2a1325(0x833),'latitude':50.1211273,'longitude':8.496137},'vultr:12':{'name':'Silicon\x20Valley','latitude':37.4024714,'longitude':-122.3219752},'vultr:19':{'name':'Sydney','latitude':-33.8479715,'longitude':150.651084},'vultr:24':{'name':_0x2a1325(0x579),'latitude':48.8588376,'longitude':2.2773454},'vultr:25':{'name':_0x2a1325(0x999),'latitude':35.6732615,'longitude':139.569959},'vultr:39':{'name':'Miami','latitude':25.7823071,'longitude':-80.3012156},'vultr:40':{'name':_0x2a1325(0x251),'latitude':1.3147268,'longitude':103.7065876}},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x7a2)]=function(_0x46257d,_0x3fc8c8){var _0x32b8f6=_0x2a1325;this['callback']=_0x46257d,this[_0x32b8f6(0x2ea)]=_0x3fc8c8;var _0x14fb8f=this['parseServerQuery']();_0x14fb8f?(this[_0x32b8f6(0x91a)](_0x32b8f6(0x5aa)),this[_0x32b8f6(0x31d)]=_0x14fb8f[0x3],this['connect'](_0x14fb8f[0x0],_0x14fb8f[0x1],_0x14fb8f[0x2])):(this[_0x32b8f6(0x91a)](_0x32b8f6(0x434)),this['pingServers']());},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x534)]=function(){var _0x42d8e2=_0x2a1325,_0x24917f=_0xc7039e[_0x42d8e2(0x27d)](location[_0x42d8e2(0xeb)],!![]),_0xb54fb6=_0x24917f[_0x42d8e2(0x33d)][_0x42d8e2(0x153)];if(typeof _0xb54fb6!='string')return;var _0x1bed93=_0xb54fb6[_0x42d8e2(0x87c)](':');if(_0x1bed93[_0x42d8e2(0x404)]!=0x3){this[_0x42d8e2(0x2ea)](_0x42d8e2(0x91f)+_0xb54fb6);return;}var _0x564c76=_0x1bed93[0x0],_0x4d6a5a=parseInt(_0x1bed93[0x1]),_0x47305a=parseInt(_0x1bed93[0x2]);return _0x564c76!='0'&&!_0x564c76[_0x42d8e2(0x95c)](_0x42d8e2(0x17d))&&(_0x564c76='vultr:'+_0x564c76),[_0x564c76,_0x4d6a5a,_0x47305a,_0x24917f[_0x42d8e2(0x33d)][_0x42d8e2(0x31d)]];},_0x4d7349[_0x2a1325(0x59d)]['findServer']=function(_0xa225a,_0x779eb){var _0x23dec9=_0x2a1325,_0x40aa1c=this[_0x23dec9(0x536)][_0xa225a];if(!Array[_0x23dec9(0x91b)](_0x40aa1c)){this[_0x23dec9(0x2ea)](_0x23dec9(0x461)+_0xa225a);return;}for(var _0x1594f5=0x0;_0x1594f5<_0x40aa1c['length'];_0x1594f5++){var _0x3ee390=_0x40aa1c[_0x1594f5];if(_0x3ee390[_0x23dec9(0x556)]==_0x779eb)return _0x3ee390;}console['warn']('Could\x20not\x20find\x20server\x20in\x20region\x20'+_0xa225a+_0x23dec9(0x5cc)+_0x779eb+'.');return;},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x406)]=function(){var _0x39ee58=_0x2a1325,_0xefe6a7=this,_0xb77f57=[];for(var _0x383335 in this[_0x39ee58(0x536)]){if(!this[_0x39ee58(0x536)]['hasOwnProperty'](_0x383335))continue;var _0x1f454d=this['servers'][_0x383335],_0x251f22=_0x1f454d[Math[_0x39ee58(0x7ee)](Math[_0x39ee58(0x459)]()*_0x1f454d[_0x39ee58(0x404)])];if(_0x251f22==undefined){console[_0x39ee58(0x91a)](_0x39ee58(0x575)+_0x383335);continue;}(function(_0x3c3fcf,_0x121640){var _0xbb689d=_0x39ee58,_0x3b8687=new XMLHttpRequest();_0x3b8687[_0xbb689d(0x1f3)]=function(_0x3d2180){var _0x1adc54=_0xbb689d,_0x24323e=_0x3d2180[_0x1adc54(0x40a)];if(_0x24323e[_0x1adc54(0x54c)]!=0x4)return;if(_0x24323e['status']==0xc8){for(var _0x2b559e=0x0;_0x2b559e<_0xb77f57[_0x1adc54(0x404)];_0x2b559e++){_0xb77f57[_0x2b559e][_0x1adc54(0x4e0)]();}_0xefe6a7['log'](_0x1adc54(0x476),_0x121640[_0x1adc54(0x1c2)]);var _0x8fb7ce=_0xefe6a7[_0x1adc54(0x4bb)](_0x121640[_0x1adc54(0x1c2)]);_0xefe6a7[_0x1adc54(0x7a0)](_0x8fb7ce[0x0],_0x8fb7ce[0x1],_0x8fb7ce[0x2]);}else console[_0x1adc54(0x349)]('Error\x20pinging\x20'+_0x121640['ip']+_0x1adc54(0x71b)+_0x383335);};var _0x5edd86='//'+_0xefe6a7['serverAddress'](_0x121640['ip'],!![])+':'+_0xefe6a7[_0xbb689d(0x3ce)](_0x121640)+'/ping';_0x3b8687[_0xbb689d(0x86c)](_0xbb689d(0x637),_0x5edd86,!![]),_0x3b8687[_0xbb689d(0x1a6)](null),_0xefe6a7[_0xbb689d(0x91a)](_0xbb689d(0x5ba),_0x5edd86),_0xb77f57[_0xbb689d(0x333)](_0x3b8687);}(_0x1f454d,_0x251f22));}},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x4bb)]=function(_0x400e8a,_0x4db8d9,_0x3702e6){var _0x5e5a9b=_0x2a1325;_0x3702e6==undefined&&(_0x3702e6=_0x5e5a9b(0x459));_0x4db8d9==undefined&&(_0x4db8d9=![]);const _0x377728=[_0x5e5a9b(0x459)];var _0x3246eb=this[_0x5e5a9b(0x667)],_0x996420=this[_0x5e5a9b(0x72d)],_0x1b77f0=this[_0x5e5a9b(0x536)][_0x400e8a]['flatMap'](function(_0x1279b3){var _0x501daf=_0x5e5a9b,_0x21b9b1=0x0;return _0x1279b3[_0x501daf(0x850)][_0x501daf(0x1d6)](function(_0x2a79e6){var _0x5d364a=_0x501daf,_0x39a930=_0x21b9b1++;return{'region':_0x1279b3[_0x5d364a(0x1c2)],'index':_0x1279b3[_0x5d364a(0x556)]*_0x1279b3[_0x5d364a(0x850)][_0x5d364a(0x404)]+_0x39a930,'gameIndex':_0x39a930,'gameCount':_0x1279b3[_0x5d364a(0x850)][_0x5d364a(0x404)],'playerCount':_0x2a79e6['playerCount'],'isPrivate':_0x2a79e6[_0x5d364a(0x956)]};});})[_0x5e5a9b(0x661)](function(_0x40cef4){var _0x4f3c4c=_0x5e5a9b;return!_0x40cef4[_0x4f3c4c(0x956)];})['filter'](function(_0x288fab){var _0x523676=_0x5e5a9b;return _0x4db8d9?_0x288fab[_0x523676(0x60c)]==0x0&&_0x288fab[_0x523676(0x87a)]>=_0x288fab[_0x523676(0x839)]/0x2:!![];})['filter'](function(_0x8276ec){var _0x1d4fb0=_0x5e5a9b;return _0x3702e6==_0x1d4fb0(0x459)?!![]:_0x377728[_0x8276ec[_0x1d4fb0(0x556)]%_0x377728[_0x1d4fb0(0x404)]][_0x1d4fb0(0x74b)]==_0x3702e6;})['sort'](function(_0x1bd32f,_0x140c1e){var _0x238f4a=_0x5e5a9b;return _0x140c1e['playerCount']-_0x1bd32f[_0x238f4a(0x60c)];})[_0x5e5a9b(0x661)](function(_0x3f7d91){var _0x3045ef=_0x5e5a9b;return _0x3f7d91[_0x3045ef(0x60c)]<_0x3246eb;});_0x4db8d9&&_0x1b77f0['reverse']();if(_0x1b77f0['length']==0x0){this[_0x5e5a9b(0x2ea)](_0x5e5a9b(0x6c6));return;}var _0xb2d288=Math[_0x5e5a9b(0x176)](_0x996420,_0x1b77f0['length']),_0x3a48e1=Math[_0x5e5a9b(0x7ee)](Math[_0x5e5a9b(0x459)]()*_0xb2d288);_0x3a48e1=Math[_0x5e5a9b(0x176)](_0x3a48e1,_0x1b77f0[_0x5e5a9b(0x404)]-0x1);var _0x420361=_0x1b77f0[_0x3a48e1],_0x52e609=_0x420361[_0x5e5a9b(0x1c2)],_0x3a48e1=Math[_0x5e5a9b(0x7ee)](_0x420361['index']/_0x420361['gameCount']),_0x3c8246=_0x420361[_0x5e5a9b(0x556)]%_0x420361[_0x5e5a9b(0x839)];return this[_0x5e5a9b(0x91a)]('Found\x20server.'),[_0x52e609,_0x3a48e1,_0x3c8246];},_0x4d7349[_0x2a1325(0x59d)]['connect']=function(_0x299213,_0x56a6c8,_0x42847f){var _0x26a555=_0x2a1325;if(this[_0x26a555(0x65b)])return;var _0x54d21f=this[_0x26a555(0x6f7)](_0x299213,_0x56a6c8);if(_0x54d21f==undefined){this[_0x26a555(0x2ea)](_0x26a555(0x835)+_0x299213+'\x20and\x20index\x20'+_0x56a6c8);return;}this[_0x26a555(0x91a)](_0x26a555(0x5ad),_0x54d21f,_0x26a555(0x64b),_0x42847f);if(_0x54d21f['games'][_0x42847f]['playerCount']>=this[_0x26a555(0x667)]){this[_0x26a555(0x2ea)]('Server\x20is\x20already\x20full.');return;}window[_0x26a555(0x2b7)][_0x26a555(0x85e)](document[_0x26a555(0x9a1)],document[_0x26a555(0x9a1)],this['generateHref'](_0x299213,_0x56a6c8,_0x42847f,this[_0x26a555(0x31d)])),this['server']=_0x54d21f,this['gameIndex']=_0x42847f,this['log'](_0x26a555(0x939),this[_0x26a555(0x763)](_0x54d21f['ip']),'on\x20port',this[_0x26a555(0x3ce)](_0x54d21f),'with\x20game\x20index',_0x42847f),this[_0x26a555(0x359)](this[_0x26a555(0x763)](_0x54d21f['ip']),this[_0x26a555(0x3ce)](_0x54d21f),_0x42847f);},_0x4d7349[_0x2a1325(0x59d)]['switchServer']=function(_0x43e109,_0x494fc1,_0x24b20e,_0x227f24){var _0x507c23=_0x2a1325;this[_0x507c23(0x5a6)]=!![],window[_0x507c23(0x25c)]['href']=this['generateHref'](_0x43e109,_0x494fc1,_0x24b20e,_0x227f24);},_0x4d7349[_0x2a1325(0x59d)]['generateHref']=function(_0x184185,_0x165263,_0xf03a1,_0x133374){var _0x57aaa2=_0x2a1325;_0x184185=this[_0x57aaa2(0x12e)](_0x184185);var _0x36fd4c=_0x57aaa2(0x464)+_0x184185+':'+_0x165263+':'+_0xf03a1;return _0x133374&&(_0x36fd4c+=_0x57aaa2(0x6b5)+encodeURIComponent(_0x133374)),_0x36fd4c;},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x763)]=function(_0x4d0ff3,_0x14e935){var _0x5424f9=_0x2a1325;if(_0x4d0ff3==_0x5424f9(0x8f6)||_0x4d0ff3==_0x5424f9(0x588)||_0x4d0ff3=='903d62ef5d1c2fecdcaeb5e7dd485eff')return window[_0x5424f9(0x25c)][_0x5424f9(0x917)];else return this[_0x5424f9(0x63c)]?_0x14e935?_0x5424f9(0x2b0)+this[_0x5424f9(0x184)](_0x4d0ff3)+'.'+this['baseUrl']:_0x4d0ff3:'ip_'+_0x4d0ff3+'.'+this[_0x5424f9(0x68e)];},_0x4d7349['prototype'][_0x2a1325(0x3ce)]=function(_0x4ba852){var _0x1720cd=_0x2a1325;if(_0x4ba852[_0x1720cd(0x1c2)]==0x0)return this[_0x1720cd(0x20f)];return location['protocol'][_0x1720cd(0x95c)](_0x1720cd(0x41f))?0x1bb:0x50;},_0x4d7349['prototype'][_0x2a1325(0x79d)]=function(_0x1b59bb){var _0x2df3be=_0x2a1325,_0x2bda98={};for(var _0x319b14=0x0;_0x319b14<_0x1b59bb[_0x2df3be(0x404)];_0x319b14++){var _0x54e29d=_0x1b59bb[_0x319b14],_0x3f0f15=_0x2bda98[_0x54e29d[_0x2df3be(0x1c2)]];_0x3f0f15==undefined&&(_0x3f0f15=[],_0x2bda98[_0x54e29d['region']]=_0x3f0f15),_0x3f0f15[_0x2df3be(0x333)](_0x54e29d);}for(var _0x1c4f2c in _0x2bda98){_0x2bda98[_0x1c4f2c]=_0x2bda98[_0x1c4f2c][_0x2df3be(0x883)](function(_0x3ea317,_0x514666){var _0x51cd47=_0x2df3be;return _0x3ea317[_0x51cd47(0x556)]-_0x514666[_0x51cd47(0x556)];});}this[_0x2df3be(0x536)]=_0x2bda98;},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x5dd)]=function(_0x412d37){var _0x4f4af4=_0x2a1325;const _0x139f0f=_0x412d37[_0x4f4af4(0x87c)]('.')[_0x4f4af4(0x1d6)](_0x424c52=>('00'+parseInt(_0x424c52)[_0x4f4af4(0x44a)](0x10))[_0x4f4af4(0x863)](-0x2))[_0x4f4af4(0x64e)]('')[_0x4f4af4(0x14f)]();return _0x139f0f;},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x184)]=function(_0x90670f){var _0x2f9825=_0x2a1325;return _0x307c23(this[_0x2f9825(0x5dd)](_0x90670f));},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x91a)]=function(){var _0x3cc81c=_0x2a1325;if(this['debugLog'])return console['log'][_0x3cc81c(0x416)](undefined,arguments);else{if(console[_0x3cc81c(0x455)])return console[_0x3cc81c(0x455)][_0x3cc81c(0x416)](undefined,arguments);}},_0x4d7349[_0x2a1325(0x59d)][_0x2a1325(0x12e)]=function(_0x17cd60){var _0xfeac98=_0x2a1325;if(_0x17cd60[_0xfeac98(0x95c)](_0xfeac98(0x17d)))_0x17cd60=_0x17cd60[_0xfeac98(0x789)](0x6);else _0x17cd60[_0xfeac98(0x95c)]('do:')&&(_0x17cd60=_0x17cd60['slice'](0x3));return _0x17cd60;},window[_0x2a1325(0x580)]=function(){var _0x35d678=_0x2a1325,_0x55c548=0x1;function _0x278657(_0x83645,_0x2c1a28){var _0x103c70=_0x2943;_0x83645=''+_0x83645,_0x2c1a28=''+_0x2c1a28,_0x83645==_0x2c1a28?console[_0x103c70(0x91a)](_0x103c70(0x55e)+_0x55c548+'\x20passed.'):console[_0x103c70(0x349)](_0x103c70(0x55e)+_0x55c548+_0x103c70(0x7cf)+_0x2c1a28+_0x103c70(0x241)+_0x83645+'.'),_0x55c548++;}function _0x53a775(_0x6611c7){var _0x543379=_0x2943,_0x3497cd=[];for(var _0x246147 in _0x6611c7){var _0x41bc0c=_0x6611c7[_0x246147];for(var _0x5470a7=0x0;_0x5470a7<_0x41bc0c[_0x543379(0x404)];_0x5470a7++){_0x3497cd[_0x543379(0x333)]({'ip':_0x246147+':'+_0x5470a7,'scheme':'testing','region':_0x246147,'index':_0x5470a7,'games':_0x41bc0c[_0x5470a7][_0x543379(0x1d6)](_0x22cc9a=>{return{'playerCount':_0x22cc9a,'isPrivate':![]};})});}}return _0x3497cd;}var _0x1a1c4f=0x5,_0x3b6aad=new _0x4d7349(_0x35d678(0x59e),-0x1,_0x1a1c4f,0x1,![]),_0x1b7ac3=undefined;_0x3b6aad[_0x35d678(0x2ea)]=function(_0x23442a){_0x1b7ac3=_0x23442a;},_0x3b6aad[_0x35d678(0x79d)](_0x53a775({0x1:[[0x0,0x0,0x0,0x0],[0x0,0x0,0x0,0x0]],0x2:[[_0x1a1c4f,0x1,0x0,0x0],[0x0,0x0,0x0,0x0]],0x3:[[_0x1a1c4f,0x0,0x1,_0x1a1c4f],[0x0,0x0,0x0,0x0]],0x4:[[_0x1a1c4f,0x1,0x1,_0x1a1c4f],[0x1,0x0,0x0,0x0]],0x5:[[_0x1a1c4f,0x1,0x1,_0x1a1c4f],[0x1,0x0,_0x1a1c4f-0x1,0x0]],0x6:[[_0x1a1c4f,_0x1a1c4f,_0x1a1c4f,_0x1a1c4f],[0x2,0x3,0x1,0x4]],0x7:[[_0x1a1c4f,_0x1a1c4f,_0x1a1c4f,_0x1a1c4f],[_0x1a1c4f,_0x1a1c4f,_0x1a1c4f,_0x1a1c4f]]})),_0x278657(_0x3b6aad['seekServer'](0x1,![]),[0x1,0x0,0x0]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x1,!![]),[0x1,0x1,0x3]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x2,![]),[0x2,0x0,0x1]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x2,!![]),[0x2,0x1,0x3]),_0x278657(_0x3b6aad['seekServer'](0x3,![]),[0x3,0x0,0x2]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x3,!![]),[0x3,0x1,0x3]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x4,![]),[0x4,0x0,0x1]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x4,!![]),[0x4,0x1,0x3]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x5,![]),[0x5,0x1,0x2]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x5,!![]),[0x5,0x1,0x3]),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x6,![]),[0x6,0x1,0x3]),_0x278657(_0x3b6aad['seekServer'](0x6,!![]),undefined),_0x278657(_0x3b6aad[_0x35d678(0x4bb)](0x7,![]),undefined),_0x278657(_0x3b6aad['seekServer'](0x7,!![]),undefined),console[_0x35d678(0x91a)](_0x35d678(0x24b));};var _0x50cf31=function(_0x2a4cf3,_0x4ca432){var _0x186499=_0x2a1325;return _0x2a4cf3[_0x186499(0x954)](_0x4ca432);},_0x2bde7d=function(_0x5df69a,_0x11e574){return _0x11e574['map'](_0x5df69a)['reduce'](_0x50cf31,[]);};Array['prototype'][_0x2a1325(0x903)]=function(_0x29f9d6){return _0x2bde7d(_0x29f9d6,this);},_0x1492c0[_0x2a1325(0x245)]=_0x4d7349;}}));function _0x5a92(){var _0x2009e7=['replaceState','*shit*','pageY','(dot)','nlg','substr','That\x27s\x20said','c0ck','lusting','Spike\x20Gear','upgraded','asa','dlck','autocomplete','open','pissin','hitWait','34px\x20Hammersmith\x20One','fuckingshitmotherfucker','readUInt16LE','font','\x22:\x20','hasRes','skinColorHolder','rimjaw','#menuCardHolder','Winter\x20Cap','stick_1','gameIndex','Invalid\x20code\x20point','split','boob','jap','butt-pirate','dangerCount','nameY','dontGather','sort','phonesex','totalRocks','I\x27m\x20burning','targetAngle','tosser','<a\x20href=\x27javascript:window.location.href=window.location.href\x27\x20class=\x27ytLink\x27>reload</a>','Bummle\x20Hat','I\x20can\x20make\x20a\x20woman\x20cry','shittings','earnXP','lastIndexOf','mouliewop','Pumpkin','#cbb091','toggle','20px','addAsyncTest','actionBarItem','xrated','accessory','placeHolder','assh0le','decel','currentTarget','int64','Uint64BE','checkTrusted','lineJoin','dir','skinRot','uint8array','katana','not-basic','snowSpeed','knobead','pit\x20that\x20traps\x20enemies\x20if\x20they\x20walk\x20over\x20it','Motha\x20Fuker','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/','finger','time','kScrM','#cebd5f','keys','textBaseline','@$$','forEach','kills','devicePixelRatio2','writeUInt32BE','satan','colDmg','nigg3r','arcTo','sin','sh1t','addEventListener','sadist','adsbygoogle','yWiggle','appendChild','targetDir','gridLocations','vittu','jerk-off','bullet_1','price','Shyt','shipal','#c15555','dominatricks','pre','916223uhZArJ','paths','twunter','duche','auth','fecker','shitter','classPrefix','cyberfucker','n1gger','noEat','FlexDecoder','grids','storeButton','textAlign','niigr;','shitty','mothafucks','bollok','float64','shitters','h4x0r','doer','bunny\x20fucker','run','have\x20more\x20control\x20while\x20in\x20water','allocUnsafeSlow','vagina','I\x20see\x20fire\x20burning','rotate','gaylord','p0rn','spinning\x20spikes','number','Booster\x20Hat','crown','addExtUnpacker','greater\x20spikes','doUpdate','follmoo','clitoris','setTimeout','Felcher','127.0.0.1','bytesToString','px\x20Hammersmith\x20One','write','resetMoveDir','DecodeBuffer','read','waterCurrent','maxHealth','earn\x20double\x20points\x20for\x20each\x20kill','code','l3itch','getData','flatMap','b00bs','Shadow\x20Wings','documentElement','#978b6a','mapPingScale','Ronald','bitch*','onclick','SunClient\x20OMG','hitTime2','hypot','cos','scaleSpeed','projCost','rapist','kuk','quadraticCurveTo','buildIndex','Don\x27t\x20stand\x20so','hostname','increases\x20damage\x20done\x20but\x20drains\x20health','touchend','log','isArray','b!+ch','kum','skanks','Invalid\x20number\x20of\x20server\x20parameters\x20in\x20','Decoder','cox','teleporter','inline-block','./src/js/data/aiManager.js','treeScales','Invalid\x20input','ExtBuffer','fingerfuck','cuntz','weapons','val','viagra','Your\x20love\x20is\x20for\x20me','skankey','<i\x20class=\x27material-icons\x27\x20style=\x27font-size:10px;vertical-align:middle\x27>arrow_forward_ios</i></a>','Wolf','botthing','motherfucked','masterbation','sqrt','teets','lerpAngle','loadedScript','scank','Calling\x20callback\x20with\x20address','red','iconPad','Dallas','_config','mapDisplay','wetback*','config','Socket\x20connection\x20error:','botJoin','forcePos','Error:\x0a','pre-content-container','clearRect','Cookie\x20Cape','say','listeners','titties','trim','mother-fucker','reloads','readInt32LE','ch3','changeHealth','now','fuckin','SunClient','concat','asses','isPrivate','text','buildItem','ot-sdk-btn-floating','poolSize','spunk','startsWith','bellend','a_s_s','containsPoint','points','bushesPerArea','poison\x20spikes','host','ucs2','waitCount','1337','randFloat','process.binding\x20is\x20not\x20supported','Fluff\x20Head','iconIndex','restores\x2030\x20health\x20and\x20another\x2050\x20over\x205\x20seconds','./src/js/data/gameObject.js','AGE\x20','#b4db62','copy','shitfull','orgasims','setExtUnpackers','teez','tit','tool\x20hammer','shits','restores\x2020\x20health\x20when\x20consumed','chatMessage','823480zXcefO','boolean','musket','d4mn','https://i.imgur.com/ivLPh10.png','\x22value\x22\x20argument\x20is\x20out\x20of\x20bounds','.././img/weapons/','Shame!',',\x20100%,\x20100%)','sapling','Shyty','swap64','value','addWords','Every\x20road\x20is\x20on\x20fire!','mute','motherfuckers','poisonDmg','assholes','ranged\x20insta\x20detect','mixin','What\x20you\x20do,\x20what\x20you\x20do','volume','onmessage','cntz','span','search','Pandou\x20Head','hitAngle','./node_modules/msgpack-lite/lib/read-format.js','ignoreObj','wichser','Tokyo','binaryType','Mother\x20Fukkah','h0r','pissers','__esModule','mothafuckers','ar5e','title','fetchVariant','scrollWidth','chatBox','createElement','center','killScore','fromCharCode','https://i.imgur.com/6ayjbIz.png','Atlanta','riverPadding','Troll\x20Cape','closePath','age','titfuck','Kick','lockMove','mothafuckas','stringToBytes','maxKeys','ash0les','toByteArray','isBuffer','isNullOrUndefined','Pig\x20Head','Go\x20go\x2086','fixTo','native_resolution','cssText','Invalid\x20type:\x20','skinColors','#fff','shiz','removeAllListeners','pingDisplay','./node_modules/webpack/buildin/module.js','href','focus','orgasim','hitObj','allianceButtonM','fannyflaps','binary','azzhole','orifiss','penis-breath','polack','windmill','healCount','render','assign','#000','sh!+','mo-fo','itemInfoName','stringify','writeFloatBE','Fukken','allianceButton','Every\x20road\x20is\x20fire!','url(\x27https://i.imgur.com/fgFsQJp.png\x27)','#83898e','#ececec','b!tch','knobjokey','hotsex','dmgK','holdOffset','cocksucked','don\x27t\x20stand\x20so','bat_1','pimpis','masterbates','add','dego','muther','joinPartyButton','Close','b17ch','playerScale','sDmg','valueOf','Apple\x20Basket','TYPED_ARRAY_SUPPORT','recktum','className','abs','encode','pow','loop','ch1','debugLog','cumming','iChatCountdown','weaponVariants','orifice','screwing','pizda','aJoinReq','Bush\x20Gear','It\x20went\x20wrong','nogger','coksucka','stripRegion','writeUIntBE','douche','round','fuckwit','melee\x20attacks\x20deal\x20poison\x20damage','Invalid\x20typed\x20array\x20length','Yes\x20you\x20do,\x20yes\x20you\x20do','createCodec','fucking','Vaja','</span>','fuckers','obj','booooooobs','kunts','mouseState','orgasum','\x5c$1','mapScale','Url','requestAnimationFrame','schaffer','flipping\x20the\x20bird','sharmute','grecaptcha','menu','platform\x20to\x20shoot\x20over\x20walls\x20and\x20cross\x20over\x20water','niggers','\x20\x20\x20\x20','toJSON','areaCount','shaggin','toLowerCase','The\x20world\x20will\x20die\x20out','xOff','healCol','server','condom','kumming','slutz','collisionDepth','./src/js/libs/soundManager.js','readInt32BE','fucka','github','Oliver','./node_modules/ieee754/index.js','none','preteen','setObjectGrids','puta','moveCount','maxAge','Mike','https://i.imgur.com/aEs3FSU.png','maxNameLength','Moo\x20Cap','qahbeh','Unequip','Thorns','io-init','#d76edb','writeDoubleLE','method\x20not\x20implemented:\x20write()','onmouseover','mozRequestAnimationFrame','enterGame','_ii','dmg','#9da4aa','poop','min','innerWidth','bow\x20used\x20for\x20ranged\x20combat\x20and\x20hunting','But\x20i\x27m\x20fine','mistik','actionBarItem27','injun','vultr:','upgrAge','./node_modules/msgpack-lite/lib/ext-unpacker.js','fitt*','#a5c65b','isView','teams','hashIP','increased\x20attack\x20speed\x20and\x20fire\x20rate','hookTouch','pisses','list','readUIntLE','moo_moosic','indx','#937c4b','https://cdn.discordapp.com/attachments/1053956635032289280/1069192210932826182/dontstandsoclose.mp3','#c37373','Medic\x20Gear','./node_modules/msgpack-lite/lib/buffer-lite.js','globalCompositeOperation','cunts','storeMenu','allocUnsafe','https://i.imgur.com/aAJyHBB.png','display','./node_modules/msgpack-lite/lib/write-token.js','2009864SpGXIs','musket_1','boooobs','hasOwnProperty','tag','Take\x20me\x20back\x20right\x20now','upgradeItem','fagging','classList','checked','kyrpa*','balls','foreskin','semen','send','bitching','blowjob','mozImageSmoothingEnabled','encoding','fanyy','masochist','actionBarItem33','MOOFIE','randInt','generates\x20points\x20while\x20worn','maxPlayersHard','./node_modules/msgpack-lite/lib/write-type.js','nieger','hitScare','scheiss*','Alan','./node_modules/msgpack-lite/lib/bufferish-uint8array.js','fixedSpawn','stick','Ping:\x20','dirPlus','dominatrix','pCd','getWriteType','white\x20power','silent','onriver','region','startAnim','Jononthecool','alive','ayir','vullva','cyberfuck','./node_modules/msgpack-lite/lib/bufferish-array.js','https://i.imgur.com/vxLZW0S.png','windmillCounts26','dyke','pr0n','writeInt16BE','kickFromClan','score','buy','deal\x20more\x20damage\x20and\x20gather\x20more\x20resources','emit','paska*','arschloch','map','health','extUnpackers','</a>','itemInfoReq','70SdoXLZ','Cross\x20the\x20fire','lastPing','horny','hardcoresex','<i\x20class=\x27material-icons\x27\x20style=\x27font-size:28px;color:#cc5151;\x27>&#xE14C;</i>','readDoubleLE','fagit','<a\x20target=\x27_blank\x27\x20class=\x27ytLink\x27\x20href=\x27','healthBarWidth','Plague\x20Mask','owner','buff','dobull','plced','nob','pr1k','tittie5','gangbang','Flikker','removeChild','prick','bytesToWords','wang','onreadystatechange','shitfuck','Super\x20Cape','#cca861','turnSpeed','2226396CNlZOC','masturbat*','serverUpdateRate','Enabled','polak','true','faigs','You\x27re\x20my\x20affection','species','skinIndex','rec','Allison','sid','masterb8','The\x20future\x20feels\x20so\x20unsure','encoding\x20must\x20be\x20a\x20string','invisTimer','motherfucker','Your\x20blood\x20is\x20cold\x20like\x20ice','ArrayBuffer','Seattle','./src/js/data/ai.js','class','devPort','https://i.imgur.com/tmUzurk.png','disableObj','position:\x20absolute;top:\x200;padding-left:\x205px;font-size:\x202em;color:\x20#fff;text-shadow:\x20#FFFFFF\x201px\x201px\x2040px;;','God','img','minimapRate','330px','projectiles','assh0lez','object','f\x20u\x20c\x20k\x20e\x20r','writeUInt16BE','willies','crossbow_1','bullet','items','https://i.imgur.com/h5jqSRp.png','hammer_1','fun','assholz','leapForce','waveSpeed','\x22size\x22\x20argument\x20must\x20be\x20a\x20number','queer','changeStoreIndex','fistfucker','cocks','clits','pillu*','hoer','process.chdir\x20is\x20not\x20supported','into\x20my\x20heart','false','maxPlayers','asString','Buffer','hore','shitz','play','nutsack','Right\x20into\x20my\x20veins','boostCounts32','Milky','shameCount2','Pdmg','aim','poisonRes','Lipshitz','coldM',',\x20got\x20','screenY','iChatMessage','actionBarItem28','exports','restores\x2040\x20health\x20when\x20consumed','wh0re','writeUIntLE','#a5974c','Tank\x20Gear','Tests\x20passed.','Goes\x20viral\x20then\x20people\x20forget','format','method\x20not\x20implemented:\x20fetch()','teleport','steals\x20resources\x20from\x20enemies','Singapore','onopen','mutha','sendJoin','clit','crownPad','Wanna\x20fell\x20your\x20power','sCd','asBytes','extPackers','writeInt32LE','location','watrImm','arc','equals','hex','goddamn','testicle','ma5terbate','itemInfoLmt','getExtPacker','Ranger\x20Hat','kock','fromByteArray','#f4f3ac','nagger','checkItemLocation','penis','\x22list\x22\x20argument\x20must\x20be\x20an\x20Array\x20of\x20Buffers','getContext','./src/js/libs/utils.js','hitler','rectum','packie','Assassin\x20Gear','shited','Monkey\x20Tail','healD','shootCount','fag1t','array','See\x20my\x20speed\x20is\x20getting\x20higher','./node_modules/msgpack-lite/lib/read-token.js','weaponXP','parse','192.168.','css','lessmove','turret','#ffa305','./node_modules/msgpack-lite/lib/read-core.js','toASCII','alloc','mothafucker','buffer','fagg1t','wanky','gatherAngle','setTimeout\x20has\x20not\x20been\x20defined','botjoin','Out\x20of\x20range\x20index','pierdol*','isUint64BE','Now\x20i\x20am\x20nobody','./node_modules/msgpack-lite/lib/flex-buffer.js','little','CockSucker','great\x20axe','no-','checkCollision','charAt','My\x20racer','pawn','doosh','god-damned','style','position:\x20absolute;top:\x200;padding-left:\x205px;font-size:\x202em;color:\x20#fff;text-shadow:\x20#FFFFFF\x201px\x201px\x2040px;','foodDisplay','stone','\x22buffer\x22\x20argument\x20must\x20be\x20a\x20Buffer\x20instance','codec','charCodeAt','penuus','preventDefault','Mother\x20Fukker','In\x20this\x20crazy\x20world','_blocksize','.io','spikes','layer','bDmg','targetStart\x20out\x20of\x20bounds','trapCounts31','utf16le','turretCounts33','ip_','./node_modules/buffer/node_modules/isarray/index.js','cyalis','#780c0c','Los\x20Angeles','The\x20burden\x20that\x20you\x20left','butthole','history','team','s\x20hit','cockhead','cookieCounts17','lastChild','./node_modules/msgpack-lite/lib/encode-buffer.js','<option\x20value=\x27','resolveObject','weightM','fcuk','desc','viewRange','crap','oldSend','reduces\x20cost\x20of\x20projectiles','sex','sandbox.moomoo.io','stone\x20wall','#cc5151','currentY','fuckings','healthBarPad','japs','porn','spick','dominatrics','./node_modules/charenc/charenc.js','isString','ignoreCollision','https://i.imgur.com/jKDdyvc.png','spawnDelay','trapAim','splice','isAI','dilld0s','Come,\x20racer','maxXP','range','Disabled','Stallion','shite','showPing','val\x20must\x20be\x20string,\x20number\x20or\x20Buffer','Lezzian',')\x27></div>','#b6db66','take\x20a\x20chance\x20on\x20emotions','<option\x20disabled>All\x20Servers\x20-\x20','arrse','Mother\x20Fucker','errorCallback','masterbat3','onchange','crossbow','base64','horniest','regex','name','strokeText','Everything\x20is\x20falling','right','onmouseout','url','./node_modules/msgpack-lite/lib/write-core.js','shiting','getWriteToken','masturbate','passiveeventlisteners','clientSendRate','/?gameIndex=','t1tties','kill','writeFloatLE','screenX','./src/js/libs/modernizr.js','queef*','sidney','allianceInput','knocks\x20back\x20enemies\x20that\x20attack\x20you','animate','breasts','gameUI','hatted','jackoff','useraw','1.4.1','fag','goldOres','asswhole','senpaio','buffers','https://i.imgur.com/DVjCdwI.png','Jeff','accessories/access_','execute','_hh','Buffer\x20size\x20must\x20be\x20a\x20multiple\x20of\x2016-bits','butt','Pepe','sendAnimation','hui','password','latin1','change','scrote','\x27><i\x20class=\x27material-icons\x27\x20style=\x27vertical-align:\x20top;\x27>&#xE064;</i>\x20','skinColor','SlowBuffer','Huevon','string','rgba(255,255,255,0.35)','allianceItem','provides\x20powerful\x20protection\x20for\x20your\x20village','fucker','leaveAlliance','kawk','offset','XYZ','tails','ballbag','pop','nigga','bitchers','push','nastt','isNumber','inTrap','rape','width','gameCanvas','Invalid\x20ext\x20type:\x20','kunilingus','2YhuPhV','query','mothafuckaz','hacks\x20are\x20for\x20losers','cyberfucked','count','altServer','faggot','pussies','till\x20the\x20morning\x20light','aiTypes','dickhead','w00se','warn','cock','motherfuckings','Blow\x20Job','wank','RaZoshi','high\x20firerate\x20crossbow\x20with\x20reduced\x20damage','fags','#mapDisplay','getGridArrays','match','safeDir','Flipper\x20Hat','link','15PtMAZL','nextTick','callback','pDmg','Uint8Array','canSee','muschi','fistfucked','b00b*','scrotum','status','/serverData','arraybuffer','really\x20fast\x20short\x20range\x20weapon','removeAllChildren','bind','<div\x20class=\x27menuCard\x27\x20id=\x27guideCard\x27><div\x20class=\x27menuHeader\x27>SunClient\x20Keys:<br></div><div\x20class=\x27menuText\x27>\x0a<br>R\x20to\x20Smart\x20Insta<br>ESC\x20to\x20Menu\x20<br>Capital\x20C\x20to\x20auto\x20song<br>Capital\x20G\x20to\x20Spawn\x203 bots(does not work)<br>Z\x20to\x20AutoMill<br>F\x20to\x20Trap\x20(u\x20can\x20hold\x20it\x20if\x20u\x20want)\x0a<br>V\x20to\x20Spikes\x20(u\x20can\x20hold\x20it\x20if\x20u\x20want)<br>T\x20to\x20lag\x20insta (does not work)<br>Left\x20Click\x20to\x20auto\x20tank<br>Right\x20Click\x20to\x20auto\x20bow<br>Q\x20to\x20Heal (be careful, might lead to clown)<br>Space\x20to\x20auto bull spam (hold to bull spam)<br>H\x20to\x20Turret/Tp<br>Thanks\x20to\x20Subscribers\x20to\x20help\x20me\x20code\x20this\x20mod<br>Pls\x20Dont share this mod. Thank you for playing with my script!<br>It\x20took a very long time to code so pls appreciate it. Thanks!<br><h3\x20id=\x22createdEnd\x22>Created\x20by\x20RaZoshi and Subscribers<br>','You\x20are\x20my\x20target','phuked','willy','skin','consoleSinger','updateShame','Blood\x20Wings','nodeType','currentX','cocksucks','hats/hat_','hash','ejaculates','chicken_1','hoare','window','preset','Naomi','cawks','storeDisplay','ahole','sharmuta','Phuker','requestAnimFrame','binding','scoreDisplay','bytesToHex','ontouchstart','*dyke','greater\x20range\x20and\x20damage','riverWidth','testicle*','ext','flush','Snowball','vag1na','changeItemCount','maxScreenWidth','wolf_1','responseText','Corrupt\x20X\x20Wings','pole','አመሳስል','cnut','Anti\x20Venom\x20Gear','kuksuger','shift','piss*','bestiality','aMlt','Emp\x20Helmet','utf-16le','Argument\x20must\x20be\x20a\x20Buffer','generateElement','mothafuck','Invalid\x20Connection','Fukkah','wank*','pull','bloody','Baby\x27s\x20so\x20bad','deprecate','Clit','We\x27ll\x20be\x20together','minBufferSize','crownIconScale','sexy','wallCounts','INSPECT_MAX_BYTES','xxx','enableJSClass','pageX','ass','14zrnSZQ','socketId','[dot]','black','Encoder','pecker','smut','fingerfucked','muie','./node_modules/buffer/index.js','fontSize','\x27offset\x27\x20is\x20out\x20of\x20bounds','Cow\x20Cape','c0k','https://www.youtube.com/channel/UCdmbKWputTxyI6vyMmpTypg','hasArrayBuffer','qweerz','author','allianceHolder','kraut','Fuken','great_axe_1','dagger_1','gaga','killCounter','https://i.imgur.com/oRXUfW8.png','merd*','socket','input','serverPort','captchaCallback','then','13c','xn--','Sawblade','restore','eventIsTrusted','div','faggs','showText','port','canvas','spawnPoint','clean','gathering','offsetParent','hell','Sh!t','chargePlayer','middle','Joey','splooge','homo','byteLength','die','appleCounts16','kMaxLength','enema','earn\x201\x20extra\x20gold\x20per\x20resource','fellatio','polac','So\x20come\x20on','slashes','./node_modules/int64-buffer/int64-buffer.js','testical','zIndex','kurwa','jism','knobz','topInfoHolder','mothafucked','mothafucking','grab_1','./node_modules/url/util.js','fillStyle','str','Buffer\x20size\x20must\x20be\x20a\x20multiple\x20of\x2064-bits','undefined','isProfane','chatCooldown','https://krunker.io/?play=SquidGame_KB','_augment','mof0','length','nig','pingServers','env','group','setExtPackers','target','reduce','ad-container','createAlliance','fuks','clan','Thief\x20Gear','allows\x20you\x20to\x20disguise\x20yourself\x20as\x20a\x20bush','#9ebf57','Do\x20you\x20ever\x20feel\x20like','endian','allianceMenu','apply','jizz','Unsupported\x20type\x20\x22','arrow_1','god-dam','200px','hatPreview','leaderboardItem','dog-fucker','https','Moo\x20Head','.mp3','Anybody\x20will\x20be\x20around\x20me','addResource','bin','mousifyTouchEvent','innerHTML','Otis','perse','6038523eSWpUi','burn','oncontextmenu','getBoundingClientRect','masterbations','(I\x27d\x20rather\x20deny\x20that)','move','showch','power\x20mill','generates\x20gold\x20over\x20time','hndS','Pinging\x20servers...','fistfuck','overflow','wordsToBytes','https://i.imgur.com/RnkmWgs.png','jew','touchstart','touchcancel','bollock*','Sonia','vries','#6a64af','millCount','tits','compare','moo_name','devicePixelRatio','isObject','cumshot','penisfucker','rgba(0,\x200,\x2070,\x200.1)','cheese','toString','Oh\x20oh\x20ooooh','Mutha\x20Fuker','skankee','cyberfuckers','nazi','d1ck','subarray','globalAlpha','chuj','canBuild','verbose','shitdick','wanker','vultr','random','dildo','ash0le','tailIndex','arse','texts','gook','https://i.imgur.com/4ZxIJQM.png','No\x20server\x20list\x20for\x20region\x20','hat','nigger','/?server=','_gg','mibun','Buffer\x20size\x20must\x20be\x20a\x20multiple\x20of\x2032-bits','1136997BVPsEh','./node_modules/webpack/buildin/global.js','\x20...\x20','animSpeed','sword_1','I\x20say','cross','peenus','Oh\x20we\x20begin','hostile','kondums','js$2','Shitty','translate','Connecting\x20to\x20region','aliases','emptyList','fuk*','FlexEncoder','packi','pisser','snatch','./node_modules/msgpack-lite/lib/decode-buffer.js','fag*','knobhead','anus','Hey\x20u\x20pressed\x20a\x20secret\x20key\x20🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓','playerSpeed','https://i.imgur.com/UY7SV7j.png','Ekrem*','pissoff','helvete','_isBuffer','Miners\x20Helmet','cabron','hoar','removeAttribute','groups','slowMult','Explorer\x20Hat','Your\x20body','../img/','sounds','faggitt','sluts','phukked','scroat','startX','__proto__','cawk','sync','trap','wop*','useRes','oldx','Leave\x20Tribe','enemy','Mutha\x20Fukkah','flange','Can\x20you\x20hear\x20me?','Treasure','projectile','cnts','margin-top:\x205px','gatherWiggle','Don\x27t\x20stand\x20so\x20close\x20to\x20me','*fuck*','active','fistfucking','</option>','stop','addProjectile','EncodeBuffer','init','asshole','ass-fucker','bat','color','defineProperty','doggin','[object\x20Array]','#e3f1f4','<option\x20disabled>','seekServer','moveTo','fuckme','_top','Clever','\x5c$&','laugh','https://i.imgur.com/V9dzAbF.png','src','reserve','hndD','toggleMute','old','feg','fukwhit','mill','https://i.imgur.com/hSqLP3t.png','healthRegen','shieldAngle','July','setUsingTouch','hideProjectile','standing\x20on\x20it\x20will\x20slowly\x20heal\x20you','take\x20a\x20chance\x20on\x20my\x20passion','weaponVariant','mine','getElementsByTagName','bow_1','objects','capitalizeFirst','rgba(0,\x200,\x2070,\x200.35)','backgroundImage','shameCount','knob','healed','I\x20don\x27t\x20belong','showing','abort','London','shootRange','Soldier\x20Helmet','width:\x20140px;','armS','autoGather','mofo','./src/js/config.js','Listen\x20to\x20me\x20now!','hats','upgradeHolder','hidden','https://i.imgur.com/phXTNsa.png','hitReturnRatio','localhost','Tree\x20Cape','orospu','runFrom','isOwner','Mutha\x20Fukker','spawn','includes','./src/js/data/mapManager.js','xWiggle','mini','paky','hookTouchEvents','s.o.b.','cunilingus','restores\x20health\x20when\x20you\x20deal\x20damage','provides\x20improved\x20protection\x20for\x20your\x20village','itemPrice','Phukker','webpackPolyfill','From\x20the\x20ground\x20but','%23','We\x20have\x20gone\x20too\x20far','broadcast','cocksucker','weapon','test','writeInt16LE','pimmel','schlong','bitcher','hammer\x20used\x20for\x20destroying\x20structures','colGrid','touch','gangbanged','resetResources','toStringTag','error','assfucker','textContent','faster\x20windmill','storeBuy','increased\x20movement\x20speed','hitCount','fingerfucker','long\x20range\x20melee\x20weapon','isEncoding','nobjokey','empanti\x20detected','#bcbcbc','isItem','Skanky','nativeResolution','#8ecc51','topSprite','isPlayer','motherfucking','getExtUnpacker','n|ig','guideCard','sh!t','\x20-\x20','ejaculate','contains','skank','cookie','Fu(*','wood','Illegal\x20argument\x20','parseServerQuery','upgradeCounter','servers','pron','itemCounts','install','Flappy','#8bc373','Bully','size:\x200x','innerHeight','#7e7f82','\x20players</option>','changedTouches','phuq','readFloatLE','wh00r','left','80px','exec','fellate','masterbaiter','spritePadding','getScale','readyState','sh!t*','usemap','l3i+ch','orgasm','dontRun','pube','motherfuckka','readDoubleBE','lineInRect','index','msgpack','numbnuts','Dark\x20Knight','Out\x20of\x20place','resize','dick*','fingerfuckers','Assert\x20','https://i.imgur.com/Fg93gj3.png','isNull','addExtPacker','retard','Try\x20me','disableBySid','wooden\x20shield','decode','buceta','pussys','nobjocky','mutherfucker','First\x20argument\x20must\x20be\x20a\x20string,\x20Buffer,\x20ArrayBuffer,\x20Array,\x20or\x20array-like\x20object.','fillRect','Fiona','yVel','keyup','pleasure','mousedown','Quinn','930045fZcsFw','baby','No\x20target\x20server\x20for\x20region\x20','The\x20drift\x20is\x20on\x20my\x20mind!','cipa','Shity','Paris','Motha\x20Fukker','https://i.imgur.com/DTd8Xl6.png','free\x20KR','imageSmoothingEnabled','pit\x20trap','default','testVultrClient','setItem','porno','dick','joinAlBtn','bastard','upgradePoints','skanck','7f000001','onerror','hells','storeHolder','extEncoderList','twat','skurwysyn','dmgOverTime','yOff','chatCountdown','./node_modules/msgpack-lite/node_modules/isarray/index.js','God-damned','food','clearTimeout\x20has\x20not\x20been\x20defined','getDistance','bitches','uint32','Fukin','white','labia','save','prototype','test.io','fuk','Fukah','whoar','miter','addItem','pussee','masokist','switchingServers','swap16','mothafuckin','blowjobs','Found\x20server\x20in\x20query.','writeUInt8','Skull\x20Cape','Connecting\x20to\x20server','puuke','Is\x20too\x20heavy\x20for\x20me','wolf_2','startY','friction','top','Array','indexOf','color:','menuCardHolder','bastards','hoore','Pinging','writeInt32BE','trapData','serverBrowser','OPEN','buttplug','int32','VULTR_SCHEME','Shytty','great_hammer_1','f\x20u\x20c\x20k','gai','Phuk','bufferish','nameIndex','Go\x20invisible\x20when\x20not\x20moving.\x20Can\x27t\x20eat.\x20Increased\x20speed','resourceTypes','felching','\x20with\x20index\x20','rockScales','tw4t','fux0r','%20','iPad','Blitz\x20Hat','increases\x20arrow\x20speed\x20and\x20range','peeenus','bugger','platform','cuntlicking','nearAim','scale','show_ping','bullRepel','readInt16BE','ipToHex','totaldmg','motherfuck','int16','secondary','fook','turrets\x20won\x27t\x20attack\x20but\x20you\x20move\x20slower','whore','notifButton','noMovTimer','https://i.imgur.com/CDAmjux.png','enculer','inSandbox','https://yt3.ggpht.com/ytc/AKedOLQGFz3mA-CDeHTgOUnA3aGZYqLCWKx2MxtlXEBQSw=s176-c-k-c0x00ffffff-no-rj','skins','Didin\x27t\x20we\x20deserve\x20more','bum','getReadToken','#c9b758','unknown','Polar\x20Head','uint8','son-of-a-bitch','\x22size\x22\x20argument\x20must\x20not\x20be\x20negative','deathFadeout','boffing','setTransform','sh1tter','m0fo','sh1ts','So\x20come\x20on,','pornography','colDiv','off','#dbc666','./node_modules/url/url.js','profany','I\x27m\x20breaking\x20my\x20chains','measureText','lineTo','Biatch','rgba(255,255,255,0.6)','fuck','disconnected','orgasms','xVel','clientX','playerCount','minge','create','unshift','exclude','self','shemale','./node_modules/punycode/punycode.js','Attempt\x20to\x20allocate\x20Buffer\x20larger\x20than\x20maximum\x20','no\x20effect','hitDelay','waveMax','AE\x20eighity\x20Speedy\x2086','diedText','swap32','enter\x20name','bull_1','futkretzn','watchtower','like\x20and\x20subscribe','cocksuck','Buy','isLoaded','windmillCounts27','Ass\x20Monkey','jisim','prependListener','Ekto','cock-sucker','.././img/icons/','party\x20key','muthafecker','cocksukka','gather','moofoll','Create','Int64LE','stroke','turd','keydown','atan2','pedo','apple\x20farms\x20remembers','GET','Baby\x20you\x20belong\x20to\x20me','[?&]','nodeName','homepage','rawIPs','ueheuauc','666','rotl','titt','\x22value\x22\x20argument\x20must\x20not\x20be\x20a\x20number','poison','Fotze','kummer','MOOSTAFA','height','I\x20see\x20trees\x20ripped','./node_modules/msgpack-lite/lib/bufferish-proto.js','pen1s','weaponSettings','with\x20game\x20index','vagiina','getReadFormat','join','ejaculated','Shift','updateObjects','Buffer.write(string,\x20encoding,\x20offset[,\x20length])\x20is\x20no\x20longer\x20supported','boobs','resolve','out\x20of\x20range\x20index','rimming','spawnCounter','onclose','dirsa','visible','connected','hitTime','promoImg','orgasim;','6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ','arse*','filter','touchmove','hasBuffer','browser','Amsterdam','settingsButton','lobbySize','all','type','chatButton','boost\x20pad','dupa','knulle','cunnilingus','onload','testTickCount','enableClasses','short\x20sword','baseVal','./node_modules/badwords-list/lib/index.js','daygo','life','./node_modules/msgpack-lite/lib/encode.js','Int64BE','Apple\x20Cap','#e0c655','asholes','which','poo','sortByPoints','readUint8','shagger','bulls\x20won\x27t\x20target\x20you\x20unless\x20you\x20attack\x20them','niiger;','byteOffset','inspect','//moomoo.io/','ucs-2','position:\x20absolute;top:\x200;padding-left:\x205px;font-size:\x202em;\x20color:\x20#fff;text-shadow:\x20#FFFFFF\x201px\x201px\x2040px;','https://i.imgur.com/OU5os0h.png','replaceWord','pussy','playerDecel','peen','Trying\x20to\x20access\x20beyond\x20buffer\x20length','baseUrl','boiolas','mc\x20grabby','chink','increased\x20damage\x20to\x20buildings\x20but\x20slower\x20movement','_digestsize','./src/js/data/projectile.js','allows\x20you\x20to\x20mine\x20stone','#fadadc','Cowboy\x20Hat','actionBarItem16','Nobody\x20makes\x20a\x20sound','visibleToPlayer','Mother\x20Fukah','<i\x20class=\x27material-icons\x27\x20style=\x27font-size:28px;color:#8ecc51;\x27>&#xE876;</i>','Reaper','dild0','chat','./node_modules/crypt/crypt.js','identifier','fanculo','fagg0t','sentTo','Mel','No\x20one\x20ever\x20made\x20me\x20cry','pathname','hand\x20axe','Phuck','Yes\x20I\x20do,\x20yes\x20I\x20do','readInt16LE','display:none','shutdownDisplay','tittiefucker','lol','teleports\x20you\x20to\x20a\x20random\x20point\x20on\x20the\x20map','animTime','./node_modules/msgpack-lite/lib/ext-buffer.js','close\x20to\x20your\x20heart','./node_modules/msgpack-lite/lib/bufferish.js','&password=','nigg4h','guiena','./node_modules/msgpack-lite/lib/browser.js','isArrayBuffer','umask','addWeaponXP','chat\x20message','itemInfoHolder','booster','spdMult','//sandbox.moomoo.io/','peinus','shitey','removeItem','a55','https://www.youtube.com/@content7054','No\x20open\x20servers.','roundRect','goddamned','Marksman\x20Cap','damages\x20enemies\x20when\x20they\x20touch\x20them','basterdz','Shyte','pause','nearDist','readIntLE','hitRange','va1jina','buttmuch','FRVR','children','canInsta','uint64','Chicago','cordova','replaceRegex','zabourah','from','boner','polearm','cokmuncher','Samurai\x20Armor','RaZoshi','req','spikeCounts','booooobs','slut','readUInt16BE','great\x20hammer','protocol','tittyfuck','spin','openLink','stripper','./vultr/VultrClient.js','20px\x20Hammersmith\x20One','With\x20my\x2086','Dash\x20Cape','nearDst','One\x20look\x20and\x20you\x20can\x20kill','Lipshits','./node_modules/msgpack-lite/lib/codec-base.js','v1gra','For\x20now\x20and\x20ever','bestial','findServer','beginPath','script','cuntlicker','removeObjGrid','return\x20this','version','fukker','Fukker','constructor','utf8','<Buffer\x20','Try\x20the\x20sandbox','selected','We\x27ll\x20be\x20together\x20all\x20the\x20time','position:\x20absolute;top:\x200;padding-left:\x205px;font-size:\x202em;\x20color:\x20#fff;text-shadow:\x20#FFFFFF\x201px\x201px\x2040px;;','consume','jizm','pissing','phuking','touchleave','shield','bushScales','toFixed','drop','Object','Invalid\x20string.\x20Length\x20must\x20be\x20a\x20multiple\x20of\x204','unique\x20name','lineWidth','Children\x20used\x20to\x20run\x20and\x20play','bitch','limit','healing\x20pad','slowly\x20regenerates\x20health\x20over\x20time','actionBarItem26','./node_modules/msgpack-lite/lib/bufferish-buffer.js','\x20in\x20region\x20','gameName','Jeremy','strokeStyle','cunt*','lust','pps','isLeader','projDmg','readUInt8','#91b2db','dontSell','stoneDisplay','toDataURL','nazis','5h1t','wss','isTrusted','lobbySpread','niggas','primary','safe','fetch','drawImage','assrammer','\x27Cause\x20i\x20can\x27t\x20stop\x20driving','oriface','writeUInt16LE','speed','toUpperCase','The\x20roof\x20i\x20cry\x20out','100px','scrollY','pigfucker','cum','feces','Steph','cocksucking','setUserData','maxScreenHeight','getDirection','float32','readIntBE','kondum','noTrap','pricks','fill','knock','key','toArray','discord','AnimText','shitting','muff','fetchSpawnObj','damn','aboveHand','mouseup','peeenusss','animalCount','#db6e6e','sourceStart\x20out\x20of\x20bounds','replace','getsid','accessories','puuker','_ff','Sid','gangbangs','But\x20i\x20close\x20my\x20eyes','dildos','./node_modules/base64-js/index.js','serverAddress','g00k','./node_modules/msgpack-lite/lib/buffer-global.js','masstrbait','update','gay','ficken','#dbd97d','my\x20pain\x20now\x20is\x20your\x20thrill','block','Module','ageText','#7b935d','Jimmy','#fc5553','toArrayBuffer','body','#89a54c','phukking','Bloodthirster','Back\x20to\x20MooMoo','webkitRequestAnimationFrame','remove','moomoo.io','max','cwd','TextManager','shag','ejaculation','argv','nepesaurio','scrollX','nameScale','32px\x20Hammersmith\x20One','<option\x20disabled></option>','provides\x20boost\x20when\x20stepped\x20on','donkeyribber','visual','slice','pingTime','clientY','t1tt1e5','shootRate','featuredYoutube','setData','#939393','path','&token=','mamhoon','https://i.imgur.com/WPWU8zC.png','no-js(\x5cs|$)','c0cks','cunt','#ebdca3','hideFromEnemy','global','piss','chargeTarget','processServers','pusse','https://cdn.discordapp.com/attachments/1053956635032289280/1055142773948428348/Zack_Merci_X_CRVN_-_Nobody_NCS_Release.mp3','connect','pule','start','shield_1','weaponIndex','lick','blocks\x20projectiles\x20and\x20reduces\x20melee\x20damage','loadingText','crossbow_2','keyCode','originalListener','twunt','n1gga','If\x20encoding\x20is\x20specified\x20then\x20the\x20first\x20argument\x20must\x20be\x20a\x20string','Pushing\x20on\x20the\x20gas','fuckwhit','muthafuckker','nig\x20nog','shitings','./node_modules/bad-words/lib/lang.json','Restore\x20Health\x20when\x20dealing\x20damage.\x20And\x20increased\x20damage','generates\x20more\x20gold\x20over\x20time','fatass','#b2ab90','m0f0','asswipe','Attempt\x20to\x20write\x20outside\x20buffer\x20bounds','randomString','fuker','skipMov','uint16','call','button','Pendy','No\x20Tribes\x20Yet','.././img/accessories/access_','Angel\x20Wings','doChat','https://i.imgur.com/wOTr8TG.png','html','mobileDownloadButtonContainer','increases\x20your\x20movement\x20speed','feck','writeDoubleBE','noticationDisplay','skull','phuks','\x20failed.\x20Expected\x20','parent','writeUInt32LE','fillText','Illegal\x20input\x20>=\x200x80\x20(not\x20a\x20basic\x20code\x20point)','./node_modules/md5/md5.js','Loading...','close','moveDir','jiss','woodDisplay','Devils\x20Tail','you\x20will\x20spawn\x20here\x20when\x20you\x20die\x20but\x20it\x20will\x20dissapear','.././img/animals/','testTick','MAX\x20AGE','hoer*','fagots','end','fast\x20long\x20range\x20melee\x20weapon','isSkull','sourceEnd\x20out\x20of\x20bounds','senpa.io','dmgMult','actionBarItem31','nigger*','Romn','actionBarItem32','h0ar','kuntz','.././sound/','floor','./node_modules/msgpack-lite/lib/write-uint8.js','you\x20become\x20a\x20walking\x20turret','qweir','Bear\x20Head','isHitted','fanny','strokeRect','shitted','chdir','qweers','goldSteal','./src/js/data/projectileManager.js','tail','startScale','oldy','sync\x20threat','castle\x20wall','utf-8','fixItems','shit','b1tch','heshe','niggah','v14gra','masterbat*','coolest\x20mooer\x20around','innerText','schlampe','Fukk','getAngleDist','isPlaying','kFormat','https://cdn.discordapp.com/attachments/1001384433078779927/1041105230374391878/crorrrrrrrrrshairlololol.png','shithead','showPreAd','storeEquip','autospin','removeAllItems','windmillCounts28','Fabz','spriteMlt','./node_modules/is-buffer/index.js','carpet\x20muncher','Bro\x20nerd.\x20🤓','blocker','toNumber','hoor','fudgepacker','Local','https://i.imgur.com/TRqDlgX.png','bi7ch','ascii','Musketeer\x20Hat','paki','onblur','shameTimer','stopPropagation','faget','lerp','Unknown\x20encoding:\x20','opacity','ejaculating','atck','pussi','blocks\x20building\x20in\x20radius','./src/js/data/store.js','meatcurtain','maxScale','Frankfurt','snowBiomeTop','Failed\x20to\x20find\x20server\x20for\x20region\x20','titwank','ejaculatings','getElementById','gameCount','titt*','fart','kids','spic','ranged\x20sync\x20detect','ejakulate','fucks','apple','kanker*','addTest','#938d77','wood\x20wall','deal\x20damage\x20to\x20players\x20that\x20damage\x20you','anal','function','lockDir','spawn\x20pad','https://i.imgur.com/QKBc2ou.png','biatch','Dragon\x20Cape','Arguments\x20must\x20be\x20Buffers','Index\x20out\x20of\x20range','games','Fukkin','data','.png','bi+ch','Delete\x20Tribe','maxBufferSize','options','f4nny','Stone\x20Cape','binarraybuffer','mainMenu','Halo','boostSpeed'];_0x5a92=function(){return _0x2009e7;};return _0x5a92();}

//Lag Insta
(function() {
    'use strict';
    let mouseX;
    let mouseY;
    let width;
    let height;
    var ws;
    var msgpack5 = msgpack;
    let user = {
        id: null,
        x: null,
        y: null,
        dir: null,
        weapon: null
    };
    var primaryWeapon, secondaryWeapon;
    WebSocket.prototype.oldSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(m){
        if (!ws){
            document.ws = this;
            ws = this;
            socketFound(this);
        }
        this.oldSend(m);
    };
    function socketFound(socket){
        socket.addEventListener('message', function(message){
            handleMessage(message);
        });
    }
    function handleMessage(m){
        let temp = msgpack5.decode(new Uint8Array(m.data));
        let data;
        if(temp.length > 1) {
            data = [temp[0], ...temp[1]];
            if (data[1] instanceof Array){
                data = data;
            }
        } else {
            data = temp;
        }
        let item = data[0];
        if(!data) {return};
        if(item === "io-init") {
            let cvs = document.getElementById("gameCanvas");
            width = cvs.clientWidth;
            height = cvs.clientHeight;
            $(window).resize(function() {
                width = cvs.clientWidth;
                height = cvs.clientHeight;
            });
            cvs.addEventListener("mousemove", e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
        }
        if (item == "1" && user.id == null){
            user.id = data[1];
        }
        if (item == "33") {
            for(let i = 0; i < data[1].length / 13; i++) {
                let playerInfo = data[1].slice(13*i, 13*i+13);
                if(playerInfo[0] == user.id) {
                    user.x = playerInfo[1];
                    user.y = playerInfo[2];
                    user.dir = playerInfo[3];
                    user.weapon = playerInfo[5];
                    user.clan = playerInfo[7];
                }
            }
        }
        update();
    }

    function send(sender){
        ws.send(new Uint8Array(Array.from(msgpack5.encode(sender))));
    }

    function isElementVisible(e) {
        return (e.offsetParent !== null);
    }
    document.addEventListener('keydown', (e)=>{
        if(e.keyCode == 84 && document.activeElement.id.toLowerCase() !== 'chatbox'){
            send(["5", [primaryWeapon, true]]);
            send(["13c", [0, 7, 0]]);
            send(["7", [1]]);
            setTimeout( () => {
                var sck = "";
                send(["13c", [0, 53, 0]]);
                send(["5", [secondaryWeapon, true]]);
                for(let i = 0; i < 500; i++){
                    let caas = new Uint8Array(490);
                    for(let i = 0; i <caas.length;i++){
                        caas[i] = Math.floor(Math.random()*5);
                        sck += caas[i]
                    }
                }
                ws.send(caas);
            }, 50);
            setTimeout( () => {
                send(["5", [primaryWeapon, true]]);
                send(["7", [1]]);
                send(["13c", [0, 0, 1]]);
                send(["13c", [0, 0, 0]]);
            }, 250);
        }
    })
    function update() {
        for (let i=0;i<9;i++){
            if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
                primaryWeapon = i;
            }
        }
        for (let i=9;i<16;i++){
            if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
                secondaryWeapon = i;
            }
        }
    }
window.addEventListener("mousedown", (e)=>{
    if (e.which == 3) {
                        doNewSend(["7", [1]]);
    doNewSend(["13c", [0, 40, 0]]);
                doNewSend(["13c", [0, 0, 1]]);
        doNewSend(["13c", [0, 18, 1]]);
    }
}, false);
window.addEventListener("mouseup", (e)=>{
    if (e.which == 3) {
                doNewSend(["7", [2]]);
            doNewSend(["13c", [0, 0, 1]]);
                    doNewSend(["13c", [0, 0, 0]]);
        doNewSend(["13c", [0, 0, 1]]);
            if (myPlayer.y < 2400 && isEnemyNear == false) {
                doNewSend(["13c", [0, 15, 0]]);
                doNewSend(["13c", [0, 11, 1]]);
            } else if (myPlayer.y > 6850 && myPlayer.y < 7550 && isEnemyNear == false) {
                doNewSend(["13c", [0, 31, 0]]);
                doNewSend(["13c", [0, 11, 1]]);
            } else {
	            doNewSend(["13c", [0, 12, 0]]);
                doNewSend(["13c", [0, 11, 1]]);
            }
    }
}, false);
window.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
}, false);
})();
