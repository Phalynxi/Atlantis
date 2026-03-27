// ==UserScript==
// @name        Ravek Mod (Deobfuscated)
// @namespace   Violentmonkey Scripts
// @match       https://ravek.fly.dev/*
// @grant       none
// @version     1.0
// @author      -
// @description Deobfuscated ravek private server mod
// ==/UserScript==


!function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = t[r] = {
      i: r,
      l: false,
      exports: {}
    };
    return e[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
  }
  n.m = e;
  n.c = t;
  n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: true,
      get: r
    });
  };
  n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    });
    Object.defineProperty(e, "__esModule", {
      value: true
    });
  };
  n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: true,
      value: e
    }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
      return e[t];
    }.bind(null, i));
    return r;
  };
  n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  };
  n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  n.p = "";
  n(n.s = 19);
}([function (e, t, n) {
  "use strict";

  (function (e) {
    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    n.d(t, "j", function () {
      return screenConfig;
    });
    n.d(t, "l", function () {
      return serverConfig;
    });
    n.d(t, "d", function () {
      return gridConfig;
    });
    n.d(t, "h", function () {
      return clientConfig;
    });
    n.d(t, "m", function () {
      return uiConfig;
    });
    n.d(t, "c", function () {
      return chatConfig;
    });
    n.d(t, "k", function () {
      return sandboxConfig;
    });
    n.d(t, "i", function () {
      return playerConfig;
    });
    n.d(t, "e", function () {
      return skinConfig;
    });
    n.d(t, "a", function () {
      return animalConfig;
    });
    n.d(t, "n", function () {
      return weaponConfig;
    });
    n.d(t, "o", function () {
      return worldConfig;
    });
    n.d(t, "b", function () {
      return biomeConfig;
    });
    n.d(t, "g", function () {
      return mapConfig;
    });
    n.d(t, "f", function () {
      return damageConfig;
    });
    var i = "object" === (undefined === e ? "undefined" : r(e)) && null !== e && Array.isArray(e.argv) && -1 !== e.argv.indexOf("--largeserver") ? 80 : 10,
      weaponVariants = [{
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
        src: "removePlayer",
        poison: true,
        xp: 12e3,
        val: 1.18
      }, {
        id: 4,
        src: "_e",
        poison: true,
        xp: 24e3,
        val: 1.18
      }],
      spawnConfig = {
        treesPerArea: 30,
        bushesPerArea: 12,
        totalRocks: 120,
        goldOres: 7
      },
      screenConfig = {
        maxScreenWidth: 1920,
        maxScreenHeight: 1080
      },
      serverConfig = {
        serverUpdateRate: 9,
        maxPlayers: i,
        maxPlayersHard: i + 10,
        collisionDepth: 6,
        minimapRate: 3e3
      },
      gridConfig = {
        colGrid: 10
      },
      clientConfig = {
        clientSendRate: 5
      },
      uiConfig = {
        healthBarWidth: 50,
        healthBarPad: 4.5,
        iconPadding: 15,
        iconPad: .9,
        deathFadeout: 3e3,
        crownIconScale: 60,
        crownPad: 35
      },
      chatConfig = {
        chatCountdown: 3e3,
        chatCooldown: 500
      },
      sandboxConfig = {
        isSandbox: true,
        millPpsMultiplier: 5,
        sandboxBuildLimits: {
          mill: 1,
          spikes: 200,
          traps: 100,
          general: 300
        }
      },
      playerConfig = {
        maxAge: 100,
        gatherAngle: Math.PI / 2.6,
        gatherWiggle: 10,
        hitReturnRatio: .25,
        hitAngle: Math.PI / 2,
        baseHealth: 100,
        playerScale: 35,
        playerSpeed: .0016,
        playerDecel: .993,
        nameY: 34,
        startItems: [0, 3, 6, 10],
        startWeapons: [0],
        startResources: {
          normal: 100,
          moofoll: 100
        }
      },
      skinConfig = {
        skinColors: ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"]
      },
      animalConfig = {
        animalCount: 1e5,
        aiTurnRandom: .06,
        cowNames: ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"],
        animalSpawnPlan: [{
          index: 0,
          desired: 2
        }, {
          index: 1,
          desired: 2
        }, {
          index: 4,
          desired: 3
        }, {
          index: 5,
          desired: 1
        }, {
          index: 2,
          desired: 1
        }, {
          index: 3,
          desired: 1
        }, {
          index: 6,
          desired: 0,
          positions: [{
            xRatio: .42,
            yRatio: .72
          }]
        }, {
          index: 7,
          desired: 0,
          positions: [{
            xRatio: .18,
            yRatio: .22
          }]
        }, {
          index: 8,
          desired: 0,
          positions: [{
            xRatio: .78,
            yRatio: .64
          }]
        }]
      },
      weaponConfig = {
        shieldAngle: Math.PI / 3,
        weaponVariants: weaponVariants,
        fetchVariant: function (e) {
          for (var t = e.weaponXP[e.weaponIndex] || 0, n = weaponVariants.length - 1; n >= 0; --n) if (t >= weaponVariants[n].xp) return weaponVariants[n];
          return weaponVariants[0];
        }
      },
      worldConfig = Object.assign({
        resourceTypes: ["wood", "food", "stone", "points"],
        areaCount: 7,
        riverWidth: 724,
        riverPadding: 114,
        waterCurrent: .0011,
        waveSpeed: 1e-4,
        waveMax: 1.3,
        treeScales: [150, 160, 165, 175, 200, 300, 400, 500],
        bushScales: [80, 85, 95],
        rockScales: [80, 85, 90],
        treeHideScale: .8,
        treeRevealDist: 400,
        treeCutoutRadius: 300,
        treeCutoutStrength: .25,
        treeCutoutFadeSpeed: .02
      }, spawnConfig, {
        spawnCounts: spawnConfig
      }),
      biomeConfig = {
        snowSpeed: .75,
        biomes: {
          snow: {
            shape: "rectangle",
            x1: 0,
            y1: 0,
            x2: 14400,
            y2: 2400,
            color: "#E9FBFF"
          },
          desert: {
            shape: "rectangle",
            x1: 0,
            y1: 12e3,
            x2: 14400,
            y2: 14400,
            color: "#dbc666"
          },
          plains: {
            shape: "rectangle",
            x1: 0,
            y1: 2400,
            x2: 14400,
            y2: 12e3,
            color: "#b6db66"
          }
        },
        riverWaypointBoxes: [{
          x1: 0,
          x2: 0,
          y1: 5200,
          y2: 9200
        }, {
          x1: 3600,
          x2: 5400,
          y1: 0,
          y2: 14400
        }, {
          x1: 9e3,
          x2: 10800,
          y1: 0,
          y2: 14400
        }, {
          x1: 14400,
          x2: 14400,
          y1: 5200,
          y2: 9200
        }],
        riverMinWaypointDelta: 2400
      },
      mapConfig = {
        mapScale: 14400,
        mapPingScale: 40,
        mapPingTime: 2200
      },
      damageConfig = {
        cactusDamage: 20
      };
  }).call(this, n(42));
}, function (e, t, n) {
  var r = t.global = n(23),
    i = t.hasBuffer = r && !!r.isBuffer,
    a = t.hasArrayBuffer = "undefined" != typeof ArrayBuffer,
    o = t.isArray = n(2);
  t.isArrayBuffer = a ? function (e) {
    return e instanceof ArrayBuffer || p(e);
  } : y;
  var s = t.isBuffer = i ? r.isBuffer : y,
    c = t.isView = a ? ArrayBuffer.isView || k("ArrayBuffer", "buffer") : y;
  t.alloc = d;
  t.concat = function (e, n) {
    n || (n = 0, Array.prototype.forEach.call(e, function (e) {
      n += e.length;
    }));
    var r = this !== t && this || e[0],
      i = d.call(r, n),
      a = 0;
    return Array.prototype.forEach.call(e, function (e) {
      a += h.copy.call(e, i, a);
    }), i;
  };
  t.from = function (e) {
    return "string" == typeof e ? g.call(this, e) : m(this).from(e);
  };
  var l = t.Array = n(26),
    u = t.Buffer = n(27),
    f = t.Uint8Array = n(28),
    h = t.prototype = n(7);
  function d(e) {
    return m(this).alloc(e);
  }
  var p = k("ArrayBuffer");
  function g(e) {
    var t = 3 * e.length,
      n = d.call(this, t),
      r = h.write.call(n, e);
    return t !== r && (n = h.slice.call(n, 0, r)), n;
  }
  function m(e) {
    return s(e) ? u : c(e) ? f : o(e) ? l : i ? u : a ? f : l;
  }
  function y() {
    return false;
  }
  function k(e, t) {
    return e = "[object " + e + "]", function (n) {
      return null != n && {}.toString.call(t ? n[t] : n) === e;
    };
  }
}, function (e, t) {
  var n = {}.toString;
  e.exports = Array.isArray || function (e) {
    return "[object Array]" == n.call(e);
  };
}, function (e, t, n) {
  var r = n(2);
  t.createCodec = s;
  t.install = function (e) {
    for (var t in e) a.prototype[t] = o(a.prototype[t], e[t]);
  };
  t.filter = function (e) {
    return r(e) ? function (e) {
      return e = e.slice(), function (n) {
        return e.reduce(t, n);
      };
      function t(e, t) {
        return t(e);
      }
    }(e) : e;
  };
  var i = n(1);
  function a(e) {
    if (!(this instanceof a)) return new a(e);
    this.options = e;
    this.init();
  }
  function o(e, t) {
    return e && t ? function () {
      return e.apply(this, arguments), t.apply(this, arguments);
    } : e || t;
  }
  function s(e) {
    return new a(e);
  }
  a.prototype.init = function () {
    var e = this.options;
    return e && e.uint8array && (this.bufferish = i.Uint8Array), this;
  };
  t.preset = s({
    preset: true
  });
}, function (e, t, n) {
  var r = n(5).ExtBuffer,
    i = n(30),
    a = n(31),
    o = n(3);
  function s() {
    var e = this.options;
    return this.encode = function (e) {
      var t = a.getWriteType(e);
      return function (e, n) {
        var r = t[typeof n];
        if (!r) throw new Error('Unsupported type "' + typeof n + '": ' + n);
        r(e, n);
      };
    }(e), e && e.preset && i.setExtPackers(this), this;
  }
  o.install({
    addExtPacker: function (e, t, n) {
      n = o.filter(n);
      var i = t.name;
      if (i && "Object" !== i) {
        (this.extPackers || (this.extPackers = {}))[i] = a;
      } else {
        (this.extEncoderList || (this.extEncoderList = [])).unshift([t, a]);
      }
      function a(t) {
        return n && (t = n(t)), new r(t, e);
      }
    },
    getExtPacker: function (e) {
      var t = this.extPackers || (this.extPackers = {}),
        n = e.constructor,
        r = n && n.name && t[n.name];
      if (r) return r;
      for (var i = this.extEncoderList || (this.extEncoderList = []), a = i.length, o = 0; o < a; o++) {
        var s = i[o];
        if (n === s[0]) return s[1];
      }
    },
    init: s
  });
  t.preset = s.call(o.preset);
}, function (e, t, n) {
  t.ExtBuffer = function e(t, n) {
    if (!(this instanceof e)) return new e(t, n);
    this.buffer = r.from(t);
    this.type = n;
  };
  var r = n(1);
}, function (e, t) {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  t.read = function (e, t, n, r, i) {
    var a,
      o,
      s = 8 * i - r - 1,
      c = (1 << s) - 1,
      l = c >> 1,
      u = -7,
      f = n ? i - 1 : 0,
      h = n ? -1 : 1,
      d = e[t + f];
    for (f += h, a = d & (1 << -u) - 1, d >>= -u, u += s; u > 0; a = 256 * a + e[t + f], f += h, u -= 8);
    for (o = a & (1 << -u) - 1, a >>= -u, u += r; u > 0; o = 256 * o + e[t + f], f += h, u -= 8);
    if (0 === a) a = 1 - l;else {
      if (a === c) return o ? NaN : 1 / 0 * (d ? -1 : 1);
      o += Math.pow(2, r);
      a -= l;
    }
    return (d ? -1 : 1) * o * Math.pow(2, a - r);
  };
  t.write = function (e, t, n, r, i, a) {
    var o,
      s,
      c,
      l = 8 * a - i - 1,
      u = (1 << l) - 1,
      f = u >> 1,
      h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      d = r ? 0 : a - 1,
      p = r ? 1 : -1,
      g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = u) : (o = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), (t += o + f >= 1 ? h / c : h * Math.pow(2, 1 - f)) * c >= 2 && (o++, c /= 2), o + f >= u ? (s = 0, o = u) : o + f >= 1 ? (s = (t * c - 1) * Math.pow(2, i), o += f) : (s = t * Math.pow(2, f - 1) * Math.pow(2, i), o = 0)); i >= 8; e[n + d] = 255 & s, d += p, s /= 256, i -= 8);
    for (o = o << i | s, l += i; l > 0; e[n + d] = 255 & o, d += p, o /= 256, l -= 8);
    e[n + d - p] |= 128 * g;
  };
}, function (e, t, n) {
  var r,
    i = n(29);
  t.copy = l;
  t.slice = u;
  t.toString = function (e, t, n) {
    var r = !s && a.isBuffer(this) ? this.toString : i.toString;
    return r.apply(this, arguments);
  };
  t.write = (r = "write", function () {
    var e = this[r] || i[r];
    return e.apply(this, arguments);
  });
  var a = n(1),
    o = a.global,
    s = a.hasBuffer && "TYPED_ARRAY_SUPPORT" in o,
    c = s && !o.TYPED_ARRAY_SUPPORT;
  function l(e, t, n, r) {
    var o = a.isBuffer(this),
      s = a.isBuffer(e);
    if (o && s) return this.copy(e, t, n, r);
    if (c || o || s || !a.isView(this) || !a.isView(e)) return i.copy.call(this, e, t, n, r);
    var l = n || null != r ? u.call(this, n, r) : this;
    return e.set(l, t), l.length;
  }
  function u(e, t) {
    var n = this.slice || !c && this.subarray;
    if (n) return n.call(this, e, t);
    var r = a.alloc.call(this, t - e);
    return l.call(this, r, 0, e, t), r;
  }
}, function (e, t, n) {
  (function (e) {
    !function (t) {
      var n,
        r = undefined !== e && e,
        i = "undefined" != typeof Uint8Array && Uint8Array,
        a = "undefined" != typeof ArrayBuffer && ArrayBuffer,
        o = [0, 0, 0, 0, 0, 0, 0, 0],
        s = Array.isArray || function (e) {
          return !!e && "[object Array]" == Object.prototype.toString.call(e);
        },
        c = 4294967296;
      function l(e, s, l) {
        var v = s ? 0 : 4,
          w = s ? 4 : 0,
          x = s ? 0 : 3,
          E = s ? 1 : 2,
          S = s ? 2 : 1,
          I = s ? 3 : 0,
          P = s ? m : k,
          T = s ? y : b,
          A = C.prototype,
          B = "is" + e,
          M = "_" + B;
        return A.buffer = undefined, A.offset = 0, A[M] = true, A.toNumber = R, A.toString = function (e) {
          var t = this.buffer,
            n = this.offset,
            r = O(t, n + v),
            i = O(t, n + w),
            a = "",
            o = !l && 2147483648 & r;
          o && (r = ~r, i = c - i);
          e = e || 10;
          for (;;) {
            var s = r % e * c + i;
            if (r = Math.floor(r / e), i = Math.floor(s / e), a = (s % e).toString(e) + a, !r && !i) break;
          }
          o && (a = "-" + a);
          return a;
        }, A.toJSON = R, A.toArray = u, r && (A.toBuffer = f), i && (A.toArrayBuffer = h), C[B] = function (e) {
          return !(!e || !e[M]);
        }, t[e] = C, C;
        function C(e, t, r, s) {
          return this instanceof C ? function (e, t, r, s, l) {
            i && a && (t instanceof a && (t = new i(t)), s instanceof a && (s = new i(s)));
            if (!(t || r || s || n)) return void (e.buffer = g(o, 0));
            if (!d(t, r)) {
              l = r;
              s = t;
              r = 0;
              t = new (n || Array)(8);
            }
            if (e.buffer = t, e.offset = r |= 0, undefined === s) return;
            "string" == typeof s ? function (e, t, n, r) {
              var i = 0,
                a = n.length,
                o = 0,
                s = 0;
              "-" === n[0] && i++;
              var l = i;
              for (; i < a;) {
                var u = parseInt(n[i++], r);
                if (!(u >= 0)) break;
                s = s * r + u;
                o = o * r + Math.floor(s / c);
                s %= c;
              }
              l && (o = ~o, s ? s = c - s : o++);
              _(e, t + v, o);
              _(e, t + w, s);
            }(t, r, s, l || 10) : d(s, l) ? p(t, r, s, l) : "number" == typeof l ? (_(t, r + v, s), _(t, r + w, l)) : s > 0 ? P(t, r, s) : s < 0 ? T(t, r, s) : p(t, r, o, 0);
          }(this, e, t, r, s) : new C(e, t, r, s);
        }
        function R() {
          var e = this.buffer,
            t = this.offset,
            n = O(e, t + v),
            r = O(e, t + w);
          return l || (n |= 0), n ? n * c + r : r;
        }
        function _(e, t, n) {
          e[t + I] = 255 & n;
          n >>= 8;
          e[t + S] = 255 & n;
          n >>= 8;
          e[t + E] = 255 & n;
          n >>= 8;
          e[t + x] = 255 & n;
        }
        function O(e, t) {
          return 16777216 * e[t + x] + (e[t + E] << 16) + (e[t + S] << 8) + e[t + I];
        }
      }
      function u(e) {
        var t = this.buffer,
          r = this.offset;
        return n = null, false !== e && 0 === r && 8 === t.length && s(t) ? t : g(t, r);
      }
      function f(t) {
        var i = this.buffer,
          a = this.offset;
        if (n = r, false !== t && 0 === a && 8 === i.length && e.isBuffer(i)) return i;
        var o = new r(8);
        return p(o, 0, i, a), o;
      }
      function h(e) {
        var t = this.buffer,
          r = this.offset,
          o = t.buffer;
        if (n = i, false !== e && 0 === r && o instanceof a && 8 === o.byteLength) return o;
        var s = new i(8);
        return p(s, 0, t, r), s.buffer;
      }
      function d(e, t) {
        var n = e && e.length;
        return t |= 0, n && t + 8 <= n && "string" != typeof e[t];
      }
      function p(e, t, n, r) {
        t |= 0;
        r |= 0;
        for (var i = 0; i < 8; i++) e[t++] = 255 & n[r++];
      }
      function g(e, t) {
        return Array.prototype.slice.call(e, t, t + 8);
      }
      function m(e, t, n) {
        for (var r = t + 8; r > t;) {
          e[--r] = 255 & n;
          n /= 256;
        }
      }
      function y(e, t, n) {
        var r = t + 8;
        for (n++; r > t;) {
          e[--r] = 255 & -n ^ 255;
          n /= 256;
        }
      }
      function k(e, t, n) {
        for (var r = t + 8; t < r;) {
          e[t++] = 255 & n;
          n /= 256;
        }
      }
      function b(e, t, n) {
        var r = t + 8;
        for (n++; t < r;) {
          e[t++] = 255 & -n ^ 255;
          n /= 256;
        }
      }
      l("Uint64BE", true, true);
      l("Int64BE", true, false);
      l("Uint64LE", false, true);
      l("Int64LE", false, false);
    }("string" != typeof t.nodeName ? t : this || {});
  }).call(this, n(12).Buffer);
}, function (e, t, n) {
  var r = n(5).ExtBuffer,
    i = n(33),
    a = n(17).readUint8,
    o = n(34),
    s = n(3);
  function c() {
    var e = this.options;
    return this.decode = function (e) {
      var t = o.getReadToken(e);
      return function (e) {
        var n = a(e),
          r = t[n];
        if (!r) throw new Error("Invalid type: " + (n ? "0x" + n.toString(16) : n));
        return r(e);
      };
    }(e), e && e.preset && i.setExtUnpackers(this), this;
  }
  s.install({
    addExtUnpacker: function (e, t) {
      (this.extUnpackers || (this.extUnpackers = []))[e] = s.filter(t);
    },
    getExtUnpacker: function (e) {
      return (this.extUnpackers || (this.extUnpackers = []))[e] || function (t) {
        return new r(t, e);
      };
    },
    init: c
  });
  t.preset = c.call(s.preset);
}, function (e, t, n) {
  t.encode = function (e, t) {
    var n = new r(t);
    return n.write(e), n.read();
  };
  var r = n(11).EncodeBuffer;
}, function (e, t, n) {
  t.EncodeBuffer = i;
  var r = n(4).preset;
  function i(e) {
    if (!(this instanceof i)) return new i(e);
    if (e && (this.options = e, e.codec)) {
      var t = this.codec = e.codec;
      t.bufferish && (this.bufferish = t.bufferish);
    }
  }
  n(14).FlexEncoder.mixin(i.prototype);
  i.prototype.codec = r;
  i.prototype.write = function (e) {
    this.codec.encode(this, e);
  };
}, function (e, t, n) {
  "use strict";

  (function (e) {
    /*!
    * The buffer module from node.js, for the browser.
    *
    * @author   Feross Aboukhadijeh <http://feross.org>
    * @license  MIT
    */
    var r = n(25),
      i = n(6),
      a = n(2);
    function o() {
      return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    function s(e, t) {
      if (o() < t) throw new RangeError("Invalid typed array length");
      return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = c.prototype : (null === e && (e = new c(t)), e.length = t), e;
    }
    function c(e, t, n) {
      if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(e, t, n);
      if ("number" == typeof e) {
        if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must tempCanvas2 a string");
        return f(this, e);
      }
      return l(this, e, t, n);
    }
    function l(e, t, n, r) {
      if ("number" == typeof t) throw new TypeError('"value" argument must not tempCanvas2 a number');
      return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, r) {
        if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
        t = undefined === n && undefined === r ? new Uint8Array(t) : undefined === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);
        c.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = c.prototype : e = h(e, t);
        return e;
      }(e, t, n, r) : "string" == typeof t ? function (e, t, n) {
        "string" == typeof n && "" !== n || (n = "utf8");
        if (!c.isEncoding(n)) throw new TypeError('"encoding" must tempCanvas2 a valid string encoding');
        var r = 0 | p(t, n),
          i = (e = s(e, r)).write(t, n);
        i !== r && (e = e.slice(0, i));
        return e;
      }(e, t, n) : function (e, t) {
        if (c.isBuffer(t)) {
          var n = 0 | d(t.length);
          return 0 === (e = s(e, n)).length || t.copy(e, 0, 0, n), e;
        }
        if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? s(e, 0) : h(e, t);
          if ("Buffer" === t.type && a(t.data)) return h(e, t.data);
        }
        var r;
        throw new TypeError("First argument must tempCanvas2 a string, Buffer, ArrayBuffer, Array, renderStar array-like object.");
      }(e, t);
    }
    function u(e) {
      if ("number" != typeof e) throw new TypeError('"size" argument must tempCanvas2 a number');
      if (e < 0) throw new RangeError('"size" argument must not tempCanvas2 negative');
    }
    function f(e, t) {
      if (u(t), e = s(e, t < 0 ? 0 : 0 | d(t)), !c.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
      return e;
    }
    function h(e, t) {
      var n = t.length < 0 ? 0 : 0 | d(t.length);
      e = s(e, n);
      for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
      return e;
    }
    function d(e) {
      if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
      return 0 | e;
    }
    function p(e, t) {
      if (c.isBuffer(e)) return e.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
      "string" != typeof e && (e = "" + e);
      var n = e.length;
      if (0 === n) return 0;
      for (var r = false;;) switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return n;
        case "utf8":
        case "utf-8":
        case undefined:
          return Y(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * n;
        case "hex":
          return n >>> 1;
        case "base64":
          return F(e).length;
        default:
          if (r) return Y(e).length;
          t = ("" + t).toLowerCase();
          r = true;
      }
    }
    function g(e, t, n) {
      var r = false;
      if ((undefined === t || t < 0) && (t = 0), t > this.length) return "";
      if ((undefined === n || n > this.length) && (n = this.length), n <= 0) return "";
      if ((n >>>= 0) <= (t >>>= 0)) return "";
      for (e || (e = "utf8");;) switch (e) {
        case "hex":
          return B(this, t, n);
        case "utf8":
        case "utf-8":
          return P(this, t, n);
        case "ascii":
          return T(this, t, n);
        case "latin1":
        case "binary":
          return A(this, t, n);
        case "base64":
          return I(this, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return M(this, t, n);
        default:
          if (r) throw new TypeError("Unknown encoding: " + e);
          e = (e + "").toLowerCase();
          r = true;
      }
    }
    function m(e, t, n) {
      var r = e[t];
      e[t] = e[n];
      e[n] = r;
    }
    function y(e, t, n, r, i) {
      if (0 === e.length) return -1;
      if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
        if (i) return -1;
        n = e.length - 1;
      } else if (n < 0) {
        if (!i) return -1;
        n = 0;
      }
      if ("string" == typeof t && (t = c.from(t, r)), c.isBuffer(t)) return 0 === t.length ? -1 : k(e, t, n, r, i);
      if ("number" == typeof t) return t &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : k(e, [t], n, r, i);
      throw new TypeError("val must tempCanvas2 string, number renderStar Buffer");
    }
    function k(e, t, n, r, i) {
      var a,
        o = 1,
        s = e.length,
        c = t.length;
      if (undefined !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
        if (e.length < 2 || t.length < 2) return -1;
        o = 2;
        s /= 2;
        c /= 2;
        n /= 2;
      }
      function l(e, t) {
        return 1 === o ? e[t] : e.readUInt16BE(t * o);
      }
      if (i) {
        var u = -1;
        for (a = n; a < s; a++) if (l(e, a) === l(t, -1 === u ? 0 : a - u)) {
          if (-1 === u && (u = a), a - u + 1 === c) return u * o;
        } else {
          -1 !== u && (a -= a - u);
          u = -1;
        }
      } else for (n + c > s && (n = s - c), a = n; a >= 0; a--) {
        for (var f = true, h = 0; h < c; h++) if (l(e, a + h) !== l(t, h)) {
          f = false;
          break;
        }
        if (f) return a;
      }
      return -1;
    }
    function b(e, t, n, r) {
      n = Number(n) || 0;
      var i = e.length - n;
      r ? (r = Number(r)) > i && (r = i) : r = i;
      var a = t.length;
      if (a % 2 != 0) throw new TypeError("Invalid hex string");
      r > a / 2 && (r = a / 2);
      for (var o = 0; o < r; ++o) {
        var s = parseInt(t.substr(2 * o, 2), 16);
        if (isNaN(s)) return o;
        e[n + o] = s;
      }
      return o;
    }
    function v(e, t, n, r) {
      return H(Y(t, e.length - n), e, n, r);
    }
    function w(e, t, n, r) {
      return H(function (e) {
        for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
        return t;
      }(t), e, n, r);
    }
    function x(e, t, n, r) {
      return w(e, t, n, r);
    }
    function E(e, t, n, r) {
      return H(F(t), e, n, r);
    }
    function S(e, t, n, r) {
      return H(function (e, t) {
        for (var n, r, i, a = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) {
          n = e.charCodeAt(o);
          r = n >> 8;
          i = n % 256;
          a.push(i);
          a.push(r);
        }
        return a;
      }(t, e.length - n), e, n, r);
    }
    function I(e, t, n) {
      return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n));
    }
    function P(e, t, n) {
      n = Math.min(e.length, n);
      for (var r = [], i = t; i < n;) {
        var a,
          o,
          s,
          c,
          l = e[i],
          u = null,
          f = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
        if (i + f <= n) switch (f) {
          case 1:
            l < 128 && (u = l);
            break;
          case 2:
            128 == (192 & (a = e[i + 1])) && (c = (31 & l) << 6 | 63 & a) > 127 && (u = c);
            break;
          case 3:
            a = e[i + 1];
            o = e[i + 2];
            128 == (192 & a) && 128 == (192 & o) && (c = (15 & l) << 12 | (63 & a) << 6 | 63 & o) > 2047 && (c < 55296 || c > 57343) && (u = c);
            break;
          case 4:
            a = e[i + 1];
            o = e[i + 2];
            s = e[i + 3];
            128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && (c = (15 & l) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) > 65535 && c < 1114112 && (u = c);
        }
        null === u ? (u = 65533, f = 1) : u > 65535 && (u -= 65536, r.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u);
        r.push(u);
        i += f;
      }
      return function (e) {
        var t = e.length;
        if (t <= 4096) return String.fromCharCode.apply(String, e);
        var n = "",
          r = 0;
        for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += 4096));
        return n;
      }(r);
    }
    t.Buffer = c;
    t.SlowBuffer = function (e) {
      +e != e && (e = 0);
      return c.alloc(+e);
    };
    t.INSPECT_MAX_BYTES = 50;
    c.TYPED_ARRAY_SUPPORT = undefined !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
      try {
        var e = new Uint8Array(1);
        return e.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function () {
            return 42;
          }
        }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
      } catch (e) {
        return false;
      }
    }();
    t.kMaxLength = o();
    c.poolSize = 8192;
    c._augment = function (e) {
      return e.__proto__ = c.prototype, e;
    };
    c.from = function (e, t, n) {
      return l(null, e, t, n);
    };
    c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
      value: null,
      configurable: true
    }));
    c.alloc = function (e, t, n) {
      return function (e, t, n, r) {
        return u(t), t <= 0 ? s(e, t) : undefined !== n ? "string" == typeof r ? s(e, t).fill(n, r) : s(e, t).fill(n) : s(e, t);
      }(null, e, t, n);
    };
    c.allocUnsafe = function (e) {
      return f(null, e);
    };
    c.allocUnsafeSlow = function (e) {
      return f(null, e);
    };
    c.isBuffer = function (e) {
      return !(null == e || !e._isBuffer);
    };
    c.compare = function (e, t) {
      if (!c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError("Arguments must tempCanvas2 Buffers");
      if (e === t) return 0;
      for (var n = e.length, r = t.length, i = 0, a = Math.min(n, r); i < a; ++i) if (e[i] !== t[i]) {
        n = e[i];
        r = t[i];
        break;
      }
      return n < r ? -1 : r < n ? 1 : 0;
    };
    c.isEncoding = function (e) {
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
          return true;
        default:
          return false;
      }
    };
    c.concat = function (e, t) {
      if (!a(e)) throw new TypeError('"list" argument must tempCanvas2 an Array of Buffers');
      if (0 === e.length) return c.alloc(0);
      var n;
      if (undefined === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
      var r = c.allocUnsafe(t),
        i = 0;
      for (n = 0; n < e.length; ++n) {
        var o = e[n];
        if (!c.isBuffer(o)) throw new TypeError('"list" argument must tempCanvas2 an Array of Buffers');
        o.copy(r, i);
        i += o.length;
      }
      return r;
    };
    c.byteLength = p;
    c.prototype._isBuffer = true;
    c.prototype.swap16 = function () {
      var e = this.length;
      if (e % 2 != 0) throw new RangeError("Buffer size must tempCanvas2 a multiple of 16-bits");
      for (var t = 0; t < e; t += 2) m(this, t, t + 1);
      return this;
    };
    c.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 != 0) throw new RangeError("Buffer size must tempCanvas2 a multiple of 32-bits");
      for (var t = 0; t < e; t += 4) {
        m(this, t, t + 3);
        m(this, t + 1, t + 2);
      }
      return this;
    };
    c.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 != 0) throw new RangeError("Buffer size must tempCanvas2 a multiple of 64-bits");
      for (var t = 0; t < e; t += 8) {
        m(this, t, t + 7);
        m(this, t + 1, t + 6);
        m(this, t + 2, t + 5);
        m(this, t + 3, t + 4);
      }
      return this;
    };
    c.prototype.toString = function () {
      var e = 0 | this.length;
      return 0 === e ? "" : 0 === arguments.length ? P(this, 0, e) : g.apply(this, arguments);
    };
    c.prototype.equals = function (e) {
      if (!c.isBuffer(e)) throw new TypeError("Argument must tempCanvas2 a Buffer");
      return this === e || 0 === c.compare(this, e);
    };
    c.prototype.inspect = function () {
      var e = "",
        n = t.INSPECT_MAX_BYTES;
      return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">";
    };
    c.prototype.compare = function (e, t, n, r, i) {
      if (!c.isBuffer(e)) throw new TypeError("Argument must tempCanvas2 a Buffer");
      if (undefined === t && (t = 0), undefined === n && (n = e ? e.length : 0), undefined === r && (r = 0), undefined === i && (i = this.length), t < 0 || n > e.length || r < 0 || i > this.length) throw new RangeError("out of range index");
      if (r >= i && t >= n) return 0;
      if (r >= i) return -1;
      if (t >= n) return 1;
      if (this === e) return 0;
      for (var a = (i >>>= 0) - (r >>>= 0), o = (n >>>= 0) - (t >>>= 0), s = Math.min(a, o), l = this.slice(r, i), u = e.slice(t, n), f = 0; f < s; ++f) if (l[f] !== u[f]) {
        a = l[f];
        o = u[f];
        break;
      }
      return a < o ? -1 : o < a ? 1 : 0;
    };
    c.prototype.includes = function (e, t, n) {
      return -1 !== this.indexOf(e, t, n);
    };
    c.prototype.indexOf = function (e, t, n) {
      return y(this, e, t, n, true);
    };
    c.prototype.lastIndexOf = function (e, t, n) {
      return y(this, e, t, n, false);
    };
    c.prototype.write = function (e, t, n, r) {
      if (undefined === t) {
        r = "utf8";
        n = this.length;
        t = 0;
      } else if (undefined === n && "string" == typeof t) {
        r = t;
        n = this.length;
        t = 0;
      } else {
        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t |= 0;
        isFinite(n) ? (n |= 0, undefined === r && (r = "utf8")) : (r = n, n = undefined);
      }
      var i = this.length - t;
      if ((undefined === n || n > i) && (n = i), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      r || (r = "utf8");
      for (var a = false;;) switch (r) {
        case "hex":
          return b(this, e, t, n);
        case "utf8":
        case "utf-8":
          return v(this, e, t, n);
        case "ascii":
          return w(this, e, t, n);
        case "latin1":
        case "binary":
          return x(this, e, t, n);
        case "base64":
          return E(this, e, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return S(this, e, t, n);
        default:
          if (a) throw new TypeError("Unknown encoding: " + r);
          r = ("" + r).toLowerCase();
          a = true;
      }
    };
    c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function T(e, t, n) {
      var r = "";
      n = Math.min(e.length, n);
      for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
      return r;
    }
    function A(e, t, n) {
      var r = "";
      n = Math.min(e.length, n);
      for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
      return r;
    }
    function B(e, t, n) {
      var r = e.length;
      (!t || t < 0) && (t = 0);
      (!n || n < 0 || n > r) && (n = r);
      for (var i = "", a = t; a < n; ++a) i += z(e[a]);
      return i;
    }
    function M(e, t, n) {
      for (var r = e.slice(t, n), i = "", a = 0; a < r.length; a += 2) i += String.fromCharCode(r[a] + 256 * r[a + 1]);
      return i;
    }
    function C(e, t, n) {
      if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
      if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
    }
    function R(e, t, n, r, i, a) {
      if (!c.isBuffer(e)) throw new TypeError('"buffer" argument must tempCanvas2 a Buffer instance');
      if (t > i || t < a) throw new RangeError('"value" argument is out of bounds');
      if (n + r > e.length) throw new RangeError("Index out of range");
    }
    function _(e, t, n, r) {
      t < 0 && (t = 65535 + t + 1);
      for (var i = 0, a = Math.min(e.length - n, 2); i < a; ++i) e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
    }
    function O(e, t, n, r) {
      t < 0 && (t = 4294967295 + t + 1);
      for (var i = 0, a = Math.min(e.length - n, 4); i < a; ++i) e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255;
    }
    function j(e, t, n, r, i, a) {
      if (n + r > e.length) throw new RangeError("Index out of range");
      if (n < 0) throw new RangeError("Index out of range");
    }
    function U(e, t, n, r, a) {
      return a || j(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4;
    }
    function L(e, t, n, r, a) {
      return a || j(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8;
    }
    c.prototype.slice = function (e, t) {
      var n,
        r = this.length;
      if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = undefined === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), c.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = c.prototype;else {
        var i = t - e;
        n = new c(i, undefined);
        for (var a = 0; a < i; ++a) n[a] = this[a + e];
      }
      return n;
    };
    c.prototype.readUIntLE = function (e, t, n) {
      e |= 0;
      t |= 0;
      n || C(e, t, this.length);
      for (var r = this[e], i = 1, a = 0; ++a < t && (i *= 256);) r += this[e + a] * i;
      return r;
    };
    c.prototype.readUIntBE = function (e, t, n) {
      e |= 0;
      t |= 0;
      n || C(e, t, this.length);
      for (var r = this[e + --t], i = 1; t > 0 && (i *= 256);) r += this[e + --t] * i;
      return r;
    };
    c.prototype.readUInt8 = function (e, t) {
      return t || C(e, 1, this.length), this[e];
    };
    c.prototype.readUInt16LE = function (e, t) {
      return t || C(e, 2, this.length), this[e] | this[e + 1] << 8;
    };
    c.prototype.readUInt16BE = function (e, t) {
      return t || C(e, 2, this.length), this[e] << 8 | this[e + 1];
    };
    c.prototype.readUInt32LE = function (e, t) {
      return t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
    };
    c.prototype.readUInt32BE = function (e, t) {
      return t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    };
    c.prototype.readIntLE = function (e, t, n) {
      e |= 0;
      t |= 0;
      n || C(e, t, this.length);
      for (var r = this[e], i = 1, a = 0; ++a < t && (i *= 256);) r += this[e + a] * i;
      return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r;
    };
    c.prototype.readIntBE = function (e, t, n) {
      e |= 0;
      t |= 0;
      n || C(e, t, this.length);
      for (var r = t, i = 1, a = this[e + --r]; r > 0 && (i *= 256);) a += this[e + --r] * i;
      return a >= (i *= 128) && (a -= Math.pow(2, 8 * t)), a;
    };
    c.prototype.readInt8 = function (e, t) {
      return t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
    };
    c.prototype.readInt16LE = function (e, t) {
      t || C(e, 2, this.length);
      var n = this[e] | this[e + 1] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    c.prototype.readInt16BE = function (e, t) {
      t || C(e, 2, this.length);
      var n = this[e + 1] | this[e] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    c.prototype.readInt32LE = function (e, t) {
      return t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
    };
    c.prototype.readInt32BE = function (e, t) {
      return t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
    };
    c.prototype.readFloatLE = function (e, t) {
      return t || C(e, 4, this.length), i.read(this, e, true, 23, 4);
    };
    c.prototype.readFloatBE = function (e, t) {
      return t || C(e, 4, this.length), i.read(this, e, false, 23, 4);
    };
    c.prototype.readDoubleLE = function (e, t) {
      return t || C(e, 8, this.length), i.read(this, e, true, 52, 8);
    };
    c.prototype.readDoubleBE = function (e, t) {
      return t || C(e, 8, this.length), i.read(this, e, false, 52, 8);
    };
    c.prototype.writeUIntLE = function (e, t, n, r) {
      (e = +e, t |= 0, n |= 0, r) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
      var i = 1,
        a = 0;
      for (this[t] = 255 & e; ++a < n && (i *= 256);) this[t + a] = e / i & 255;
      return t + n;
    };
    c.prototype.writeUIntBE = function (e, t, n, r) {
      (e = +e, t |= 0, n |= 0, r) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
      var i = n - 1,
        a = 1;
      for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) this[t + i] = e / a & 255;
      return t + n;
    };
    c.prototype.writeUInt8 = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
    };
    c.prototype.writeUInt16LE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : _(this, e, t, true), t + 2;
    };
    c.prototype.writeUInt16BE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : _(this, e, t, false), t + 2;
    };
    c.prototype.writeUInt32LE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : O(this, e, t, true), t + 4;
    };
    c.prototype.writeUInt32BE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, false), t + 4;
    };
    c.prototype.writeIntLE = function (e, t, n, r) {
      if (e = +e, t |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        R(this, e, t, n, i - 1, -i);
      }
      var a = 0,
        o = 1,
        s = 0;
      for (this[t] = 255 & e; ++a < n && (o *= 256);) {
        e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1);
        this[t + a] = (e / o >> 0) - s & 255;
      }
      return t + n;
    };
    c.prototype.writeIntBE = function (e, t, n, r) {
      if (e = +e, t |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        R(this, e, t, n, i - 1, -i);
      }
      var a = n - 1,
        o = 1,
        s = 0;
      for (this[t + a] = 255 & e; --a >= 0 && (o *= 256);) {
        e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1);
        this[t + a] = (e / o >> 0) - s & 255;
      }
      return t + n;
    };
    c.prototype.writeInt8 = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
    };
    c.prototype.writeInt16LE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : _(this, e, t, true), t + 2;
    };
    c.prototype.writeInt16BE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : _(this, e, t, false), t + 2;
    };
    c.prototype.writeInt32LE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : O(this, e, t, true), t + 4;
    };
    c.prototype.writeInt32BE = function (e, t, n) {
      return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, false), t + 4;
    };
    c.prototype.writeFloatLE = function (e, t, n) {
      return U(this, e, t, true, n);
    };
    c.prototype.writeFloatBE = function (e, t, n) {
      return U(this, e, t, false, n);
    };
    c.prototype.writeDoubleLE = function (e, t, n) {
      return L(this, e, t, true, n);
    };
    c.prototype.writeDoubleBE = function (e, t, n) {
      return L(this, e, t, false, n);
    };
    c.prototype.copy = function (e, t, n, r) {
      if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
      if (r < 0) throw new RangeError("sourceEnd out of bounds");
      r > this.length && (r = this.length);
      e.length - t < r - n && (r = e.length - t + n);
      var i,
        a = r - n;
      if (this === e && n < t && t < r) for (i = a - 1; i >= 0; --i) e[i + t] = this[i + n];else if (a < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (i = 0; i < a; ++i) e[i + t] = this[i + n];else Uint8Array.prototype.set.call(e, this.subarray(n, n + a), t);
      return a;
    };
    c.prototype.fill = function (e, t, n, r) {
      if ("string" == typeof e) {
        if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
          var i = e.charCodeAt(0);
          i < 256 && (e = i);
        }
        if (undefined !== r && "string" != typeof r) throw new TypeError("encoding must tempCanvas2 a string");
        if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
      } else "number" == typeof e && (e &= 255);
      if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
      if (n <= t) return this;
      var a;
      if (t >>>= 0, n = undefined === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (a = t; a < n; ++a) this[a] = e;else {
        var o = c.isBuffer(e) ? e : Y(new c(e, r).toString()),
          s = o.length;
        for (a = 0; a < n - t; ++a) this[a + t] = o[a % s];
      }
      return this;
    };
    var D = /[^+\/0-9A-Za-z-_]/g;
    function z(e) {
      return e < 16 ? "0" + e.toString(16) : e.toString(16);
    }
    function Y(e, t) {
      var n;
      t = t || 1 / 0;
      for (var r = e.length, i = null, a = [], o = 0; o < r; ++o) {
        if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
          if (!i) {
            if (n > 56319) {
              (t -= 3) > -1 && a.push(239, 191, 189);
              continue;
            }
            if (o + 1 === r) {
              (t -= 3) > -1 && a.push(239, 191, 189);
              continue;
            }
            i = n;
            continue;
          }
          if (n < 56320) {
            (t -= 3) > -1 && a.push(239, 191, 189);
            i = n;
            continue;
          }
          n = 65536 + (i - 55296 << 10 | n - 56320);
        } else i && (t -= 3) > -1 && a.push(239, 191, 189);
        if (i = null, n < 128) {
          if ((t -= 1) < 0) break;
          a.push(n);
        } else if (n < 2048) {
          if ((t -= 2) < 0) break;
          a.push(n >> 6 | 192, 63 & n | 128);
        } else if (n < 65536) {
          if ((t -= 3) < 0) break;
          a.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
        } else {
          if (!(n < 1114112)) throw new Error("Invalid code point");
          if ((t -= 4) < 0) break;
          a.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
        }
      }
      return a;
    }
    function F(e) {
      return r.toByteArray(function (e) {
        if ((e = function (e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
        }(e).replace(D, "")).length < 2) return "";
        for (; e.length % 4 != 0;) e += "=";
        return e;
      }(e));
    }
    function H(e, t, n, r) {
      for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i) t[i + n] = e[i];
      return i;
    }
  }).call(this, n(24));
}, function (e, t) {
  for (var n = t.uint8 = new Array(256), r = 0; r <= 255; r++) n[r] = i(r);
  function i(e) {
    return function (t) {
      var n = t.reserve(1);
      t.buffer[n] = e;
    };
  }
}, function (e, t, n) {
  t.FlexDecoder = i;
  t.FlexEncoder = a;
  var r = n(1);
  function i() {
    if (!(this instanceof i)) return new i();
  }
  function a() {
    if (!(this instanceof a)) return new a();
  }
  function o() {
    throw new Error("method not implemented: write()");
  }
  function s() {
    throw new Error("method not implemented: fetch()");
  }
  function c() {
    return this.buffers && this.buffers.length ? (this.flush(), this.pull()) : this.fetch();
  }
  function l(e) {
    (this.buffers || (this.buffers = [])).push(e);
  }
  function u() {
    return (this.buffers || (this.buffers = [])).shift();
  }
  function f(e) {
    return function (t) {
      for (var n in e) t[n] = e[n];
      return t;
    };
  }
  i.mixin = f({
    bufferish: r,
    write: function (e) {
      var t = this.offset ? r.prototype.slice.call(this.buffer, this.offset) : this.buffer;
      this.buffer = t ? e ? this.bufferish.concat([t, e]) : t : e;
      this.offset = 0;
    },
    fetch: s,
    flush: function () {
      for (; this.offset < this.buffer.length;) {
        var e,
          t = this.offset;
        try {
          e = this.fetch();
        } catch (e) {
          if (e && "BUFFER_SHORTAGE" != e.message) throw e;
          this.offset = t;
          break;
        }
        this.push(e);
      }
    },
    push: l,
    pull: u,
    read: c,
    reserve: function (e) {
      var t = this.offset,
        n = t + e;
      if (n > this.buffer.length) throw new Error("BUFFER_SHORTAGE");
      return this.offset = n, t;
    },
    offset: 0
  });
  i.mixin(i.prototype);
  a.mixin = f({
    bufferish: r,
    write: o,
    fetch: function () {
      var e = this.start;
      if (e < this.offset) {
        var t = this.start = this.offset;
        return r.prototype.slice.call(this.buffer, e, t);
      }
    },
    flush: function () {
      for (; this.start < this.offset;) {
        var e = this.fetch();
        e && this.push(e);
      }
    },
    push: l,
    pull: function () {
      var e = this.buffers || (this.buffers = []),
        t = e.length > 1 ? this.bufferish.concat(e) : e[0];
      return e.length = 0, t;
    },
    read: c,
    reserve: function (e) {
      var t = 0 | e;
      if (this.buffer) {
        var n = this.buffer.length,
          r = 0 | this.offset,
          i = r + t;
        if (i < n) return this.offset = i, r;
        this.flush();
        e = Math.max(e, Math.min(2 * n, this.maxBufferSize));
      }
      return e = Math.max(e, this.minBufferSize), this.buffer = this.bufferish.alloc(e), this.start = 0, this.offset = t, 0;
    },
    send: function (e) {
      var t = e.length;
      if (t > this.minBufferSize) {
        this.flush();
        this.push(e);
      } else {
        var n = this.reserve(t);
        r.prototype.copy.call(e, this.buffer, n);
      }
    },
    maxBufferSize: 65536,
    minBufferSize: 2048,
    offset: 0,
    start: 0
  });
  a.mixin(a.prototype);
}, function (e, t, n) {
  t.decode = function (e, t) {
    var n = new r(t);
    return n.write(e), n.read();
  };
  var r = n(16).DecodeBuffer;
}, function (e, t, n) {
  t.DecodeBuffer = i;
  var r = n(9).preset;
  function i(e) {
    if (!(this instanceof i)) return new i(e);
    if (e && (this.options = e, e.codec)) {
      var t = this.codec = e.codec;
      t.bufferish && (this.bufferish = t.bufferish);
    }
  }
  n(14).FlexDecoder.mixin(i.prototype);
  i.prototype.codec = r;
  i.prototype.fetch = function () {
    return this.codec.decode(this);
  };
}, function (e, t, n) {
  var r = n(6),
    i = n(8),
    a = i.Uint64BE,
    o = i.Int64BE;
  t.getReadFormat = function (e) {
    var t = s.hasArrayBuffer && e && e.binarraybuffer,
      n = e && e.int64;
    return {
      map: l && e && e.usemap ? f : u,
      array: h,
      str: d,
      bin: t ? g : p,
      ext: m,
      uint8: y,
      uint16: b,
      uint32: w,
      uint64: E(8, n ? P : S),
      int8: k,
      int16: v,
      int32: x,
      int64: E(8, n ? T : I),
      float32: E(4, A),
      float64: E(8, B)
    };
  };
  t.readUint8 = y;
  var s = n(1),
    c = n(7),
    l = "undefined" != typeof Map;
  function u(e, t) {
    var n,
      r = {},
      i = new Array(t),
      a = new Array(t),
      o = e.codec.decode;
    for (n = 0; n < t; n++) {
      i[n] = o(e);
      a[n] = o(e);
    }
    for (n = 0; n < t; n++) r[i[n]] = a[n];
    return r;
  }
  function f(e, t) {
    var n,
      r = new Map(),
      i = new Array(t),
      a = new Array(t),
      o = e.codec.decode;
    for (n = 0; n < t; n++) {
      i[n] = o(e);
      a[n] = o(e);
    }
    for (n = 0; n < t; n++) r.set(i[n], a[n]);
    return r;
  }
  function h(e, t) {
    for (var n = new Array(t), r = e.codec.decode, i = 0; i < t; i++) n[i] = r(e);
    return n;
  }
  function d(e, t) {
    var n = e.reserve(t),
      r = n + t;
    return c.toString.call(e.buffer, "utf-8", n, r);
  }
  function p(e, t) {
    var n = e.reserve(t),
      r = n + t,
      i = c.slice.call(e.buffer, n, r);
    return s.from(i);
  }
  function g(e, t) {
    var n = e.reserve(t),
      r = n + t,
      i = c.slice.call(e.buffer, n, r);
    return s.Uint8Array.from(i).buffer;
  }
  function m(e, t) {
    var n = e.reserve(t + 1),
      r = e.buffer[n++],
      i = n + t,
      a = e.codec.getExtUnpacker(r);
    if (!a) throw new Error("Invalid ext type: " + (r ? "0x" + r.toString(16) : r));
    return a(c.slice.call(e.buffer, n, i));
  }
  function y(e) {
    var t = e.reserve(1);
    return e.buffer[t];
  }
  function k(e) {
    var t = e.reserve(1),
      n = e.buffer[t];
    return 128 & n ? n - 256 : n;
  }
  function b(e) {
    var t = e.reserve(2),
      n = e.buffer;
    return n[t++] << 8 | n[t];
  }
  function v(e) {
    var t = e.reserve(2),
      n = e.buffer,
      r = n[t++] << 8 | n[t];
    return 32768 & r ? r - 65536 : r;
  }
  function w(e) {
    var t = e.reserve(4),
      n = e.buffer;
    return 16777216 * n[t++] + (n[t++] << 16) + (n[t++] << 8) + n[t];
  }
  function x(e) {
    var t = e.reserve(4),
      n = e.buffer;
    return n[t++] << 24 | n[t++] << 16 | n[t++] << 8 | n[t];
  }
  function E(e, t) {
    return function (n) {
      var r = n.reserve(e);
      return t.call(n.buffer, r, true);
    };
  }
  function S(e) {
    return new a(this, e).toNumber();
  }
  function I(e) {
    return new o(this, e).toNumber();
  }
  function P(e) {
    return new a(this, e);
  }
  function T(e) {
    return new o(this, e);
  }
  function A(e) {
    return r.read(this, e, false, 23, 4);
  }
  function B(e) {
    return r.read(this, e, false, 52, 8);
  }
}, function (e, t, n) {
  !function (t) {
    e.exports = t;
    var n = {
      on: function (e, t) {
        return a(this, e).push(t), this;
      },
      once: function (e, t) {
        var n = this;
        return r.originalListener = t, a(n, e).push(r), n;
        function r() {
          i.call(n, e, r);
          t.apply(this, arguments);
        }
      },
      off: i,
      emit: function (e, t) {
        var n = this,
          r = a(n, e, true);
        if (!r) return false;
        var i = arguments.length;
        if (1 === i) r.forEach(s);else if (2 === i) r.forEach(c);else {
          var o = Array.prototype.slice.call(arguments, 1);
          r.forEach(l);
        }
        return !!r.length;
        function s(e) {
          e.call(n);
        }
        function c(e) {
          e.call(n, t);
        }
        function l(e) {
          e.apply(n, o);
        }
      }
    };
    function r(e) {
      for (var t in n) e[t] = n[t];
      return e;
    }
    function i(e, t) {
      var n,
        r = this;
      if (arguments.length) {
        if (t) {
          if (n = a(r, e, true)) {
            if (!(n = n.filter(o)).length) return i.call(r, e);
            r.listeners[e] = n;
          }
        } else if ((n = r.listeners) && (delete n[e], !Object.keys(n).length)) return i.call(r);
      } else delete r.listeners;
      return r;
      function o(e) {
        return e !== t && e.originalListener !== t;
      }
    }
    function a(e, t, n) {
      if (!n || e.listeners) {
        var r = e.listeners || (e.listeners = {});
        return r[t] || (r[t] = []);
      }
    }
    r(t.prototype);
    t.mixin = r;
  }(
  /**
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
    if (!(this instanceof e)) return new e();
  });
}, function (e, t, n) {
  "use strict";

  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || false;
      r.configurable = true;
      "value" in r && (r.writable = true);
      Object.defineProperty(e, a(r.key), r);
    }
  }
  function i(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function a(e) {
    var t = function (e, t) {
      if ("object" != o(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (undefined !== n) {
        var r = n.call(e, t || "default");
        if ("object" != o(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    }(e, "string");
    return "symbol" == o(t) ? t : t + "";
  }
  function o(e) {
    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }
  var s, c;
  s = "undefined" != typeof globalThis ? globalThis : window;
  "object" === o((c = s.process || {}).env) && null !== c.env || (c.env = {});
  Array.isArray(c.argv) || (c.argv = []);
  c.browser = true;
  c.title = "browser";
  "function" != typeof c.nextTick && (c.nextTick = function (e) {
    return setTimeout(e, 0);
  });
  s.process = c;
  window.loadedScript = true;
  n(20);
  var l = n(21),
    u = n(39),
    f = n(40),
    h = n(41).default,
    d = n(43),
    p = n(44),
    g = n(46),
    m = n(47),
    y = n(48),
    k = n(50),
    b = n(51),
    v = n(52),
    w = new f.TextManager();
  "undefined" != typeof window && "function" == typeof fetch && setInterval(function () {
    fetch("/ping", {
      cache: "no-store"
    }).catch(function () {});
  }, 5e4);
  var x = "survival";
  window.onload = function () {
    var e = document.getElementById("loadingText");
    e && (e.style.display = "none");
    var t = document.getElementById("menuCardHolder");
    t && (t.style.display = "flex");
    var n = document.querySelectorAll(".gamemodeBtn");
    n.forEach(function (e) {
      e.addEventListener("click", function () {
        n.forEach(function (e) {
          e.classList.remove("active");
        });
        e.classList.add("active");
        x = e.getAttribute("data-gamemode");
      });
    });
    (function () {
      u.hookTouchEvents(enterGameBtn);
      enterGameBtn.onclick = u.checkTrusted(function () {
        var e, t;
        P("moo_name", nameInput.value);
        inGame || (l.connected ? (inGame = true, showLoadingText("Loading..."), l.send("M", {
          name: nameInput.value,
          moofoll: M,
          skin: skinColor
        })) : (showLoadingText("Connecting..."), e = function () {
          inGame = true;
          l.send("M", {
            name: nameInput.value,
            moofoll: M,
            skin: skinColor
          });
        }, t = window.location.href.replace(/^http:/, "ws:").replace(/^https:/, "wss:").split("?")[0].split("#")[0] + "?gamemode=" + encodeURIComponent(x), l.connect(t, function (t) {
          pingSocket();
          setInterval(pingSocket, 2500);
          t ? onDisconnect(t) : (true, loadingText.style.display = "none", e && e());
        }, {
          A: setupGame,
          B: onDisconnect,
          C: addPlayer,
          D: updatePlayers,
          E: removePlayer,
          a: updateLeaderboard,
          G: loadGameObject,
          H: loadAI,
          I: animateAI,
          J: gatherAnimation,
          K: wiggleGameObject,
          L: shootTurret,
          M: updatePlayerValue,
          N: updateHealth,
          O: killObject,
          P: killPlayer,
          Q: updateItemCounts,
          R: updateAge,
          S: handleProjectile,
          T: addAlliance,
          U: updateUpgrades,
          V: setAlliancePlayers,
          X: handleAllianceAction,
          Y: setPlayerTeam,
          Z: serverShutdownNotice,
          g: addTeam,
          1: deleteAlliance,
          2: addAllianceReq,
          3: onSetTeam,
          4: onAllianceMembers,
          5: Jt,
          6: showText,
          7: pingSocketResponse,
          8: updateStoreItems,
          9: receiveChat,
          0: setInitData
        })));
      });
      joinPartyBtn.onclick = u.checkTrusted(function () {
        setTimeout(function () {
          alert("Party joining is not available in this build.");
        }, 10);
      });
      u.hookTouchEvents(joinPartyBtn);
      settingsBtn.onclick = u.checkTrusted(function () {
        guideCard.classList.contains("showing") ? (guideCard.classList.remove("showing"), settingsBtnSpan.innerText = "Settings") : (guideCard.classList.add("showing"), settingsBtnSpan.innerText = "Close");
      });
      u.hookTouchEvents(settingsBtn);
      allianceBtn.onclick = u.checkTrusted(function () {
        "block" != allianceMenu.style.display ? showAllianceUI() : allianceMenu.style.display = "none";
      });
      u.hookTouchEvents(allianceBtn);
      storeBtn.onclick = u.checkTrusted(function () {
        "block" != storeMenu.style.display ? (storeMenu.style.display = "block", allianceMenu.style.display = "none", closeMenus(), updateAllianceUI(), renderAllianceList()) : storeMenu.style.display = "none";
      });
      u.hookTouchEvents(storeBtn);
      chatBtn.onclick = u.checkTrusted(function () {
        toggleChat();
      });
      u.hookTouchEvents(chatBtn);
      mapDisplay.onclick = u.checkTrusted(function () {
        toggleMinimap();
      });
      u.hookTouchEvents(mapDisplay);
      var e = document.querySelectorAll(".tabButton");
      e.forEach(function (t) {
        t.addEventListener("click", function () {
          e.forEach(function (e) {
            e.classList.remove("active");
          });
          document.querySelectorAll(".tabContent").forEach(function (e) {
            e.classList.remove("active");
          });
          this.classList.add("active");
          var t = this.getAttribute("data-tab"),
            n = document.getElementById(t + "Tab");
          n && n.classList.add("active");
        });
        u.hookTouchEvents(t);
      });
      var t = document.getElementById("previewCanvas"),
        n = document.getElementById("characterPreview");
      if (t && n) {
        var r = function () {
            var e = t.width,
              n = e / 2,
              r = .35 * e,
              a = .12 * e,
              o = Math.PI / 4,
              s = 1 * r;
            i.clearRect(0, 0, e, e);
            i.save();
            i.translate(n - .05 * e, n + .05 * e);
            i.rotate(-Math.PI / 4);
            i.fillStyle = h.skinColors[skinColor];
            i.strokeStyle = "#525252";
            i.lineWidth = .04 * e;
            i.beginPath();
            i.arc(s * Math.cos(o), s * Math.sin(o), a, 0, 2 * Math.PI);
            i.fill();
            i.stroke();
            i.beginPath();
            i.arc(s * Math.cos(-o), s * Math.sin(-o), a, 0, 2 * Math.PI);
            i.fill();
            i.stroke();
            i.beginPath();
            i.arc(0, 0, r, 0, 2 * Math.PI);
            i.fill();
            i.stroke();
            i.restore();
          },
          i = t.getContext("2d");
        t.width = 60;
        t.height = 60;
        r();
        var a = window.selectSkinColor;
        window.selectSkinColor = function (e) {
          a(e);
          r();
          hidePicker();
        };
      }
      var o = document.getElementById("weaponUpgradeSlider"),
        s = document.getElementById("weaponUpgradeValue");
      o && s && o.addEventListener("input", function () {
        s.textContent = this.value;
      });
    })();
    (function () {
      for (var e = 0; e < iconNames.length; ++e) {
        var t = new Image();
        t.onload = function () {
          this.isLoaded = true;
        };
        t.src = ".././img/icons/" + iconNames[e] + ".png";
        iconCache[iconNames[e]] = t;
      }
    })();
    loadingText.style.display = "none";
    menuCardHolder.style.display = "flex";
    nameInput.value = T("moo_name") || "";
    (function () {
      var e = T("native_resolution");
      setNativeRes(e ? "true" == e : "undefined" != typeof cordova);
      B = "true" == T("show_ping");
      updatePerfDisplay();
      setInterval(function () {
        window.cordova && (document.getElementById("downloadButtonContainer").classList.add("cordova"), document.getElementById("mobileDownloadButtonContainer").classList.add("cordova"));
      }, 1e3);
      resizeGame();
      u.removeAllChildren(actionBar);
      for (var t = 0; t < p.weapons.length + p.list.length; ++t) !function (e) {
        u.generateElement({
          id: "actionBarItem" + e,
          class: "actionBarItem",
          style: "display:none",
          onmouseout: function () {
            showItemInfo();
          },
          parent: actionBar
        });
      }(t);
      for (t = 0; t < p.list.length + p.weapons.length; ++t) !function (e) {
        var t = document.createElement("canvas");
        t.width = t.height = 66;
        var n = t.getContext("2d");
        if (n.translate(t.width / 2, t.height / 2), n.imageSmoothingEnabled = false, n.webkitImageSmoothingEnabled = false, n.mozImageSmoothingEnabled = false, p.weapons[e]) {
          n.rotate(Math.PI / 4 + Math.PI);
          var r = new Image();
          weaponImgCache[p.weapons[e].src] = r;
          r.onload = function () {
            this.isLoaded = true;
            var r = 1 / (this.height / this.width),
              i = p.weapons[e].iPad || 1;
            n.drawImage(this, -t.width * i * h.iconPad * r / 2, -t.height * i * h.iconPad / 2, t.width * i * r * h.iconPad, t.height * i * h.iconPad);
            n.fillStyle = "rgba(0, 0, 70, 0.1)";
            n.globalCompositeOperation = "source-atop";
            n.fillRect(-t.width / 2, -t.height / 2, t.width, t.height);
            document.getElementById("actionBarItem" + e).style.backgroundImage = "url(" + t.toDataURL() + ")";
          };
          r.src = ".././img/weapons/" + p.weapons[e].src + ".png";
          (i = document.getElementById("actionBarItem" + e)).onmouseover = u.checkTrusted(function () {
            showItemInfo(p.weapons[e], true);
          });
          i.onclick = u.checkTrusted(function () {
            selectItem(e, true);
          });
          u.hookTouchEvents(i);
        } else {
          r = getItemSprite(p.list[e - p.weapons.length], true);
          var i,
            a = Math.min(t.width - h.iconPadding, r.width);
          n.globalAlpha = 1;
          n.drawImage(r, -a / 2, -a / 2, a, a);
          n.fillStyle = "rgba(0, 0, 70, 0.1)";
          n.globalCompositeOperation = "source-atop";
          n.fillRect(-a / 2, -a / 2, a, a);
          document.getElementById("actionBarItem" + e).style.backgroundImage = "url(" + t.toDataURL() + ")";
          (i = document.getElementById("actionBarItem" + e)).onmouseover = u.checkTrusted(function () {
            showItemInfo(p.list[e - p.weapons.length]);
          });
          i.onclick = u.checkTrusted(function () {
            selectItem(e - p.weapons.length);
          });
          u.hookTouchEvents(i);
        }
      }(t);
      nameInput.ontouchstart = u.checkTrusted(function (e) {
        e.preventDefault();
        var t = prompt("enter name", e.currentTarget.value);
        e.currentTarget.value = t.slice(0, 15);
      });
      nativeResOption.checked = A;
      nativeResOption.onchange = u.checkTrusted(function (e) {
        setNativeRes(e.target.checked);
      });
      showPingOption.checked = B;
      showPingOption.onchange = u.checkTrusted(function (e) {
        P("show_ping", (B = showPingOption.checked) ? "true" : "false");
        updatePerfDisplay();
      });
    })();
    perfDisplay = document.getElementById("performanceDisplay");
    pingValueEl = document.getElementById("pingValue");
    cpsValueEl = document.getElementById("cpsValue");
    fpsValueEl = document.getElementById("fpsValue");
    packetValueEl = document.getElementById("packetValue");
    updatePerfDisplay();
  };
  var E,
    S = Math.PI,
    I = 2 * S;
  function P(e, t) {
    E && localStorage.setItem(e, t);
  }
  function T(e) {
    return E ? localStorage.getItem(e) : null;
  }
  Math.lerpAngle = function (e, t, n) {
    Math.abs(t - e) > S && (e > t ? t += I : e += I);
    var r = t + (e - t) * n;
    return r >= 0 && r <= I ? r : r % I;
  };
  CanvasRenderingContext2D.prototype.roundRect = function (e, t, n, r, i) {
    return n < 2 * i && (i = n / 2), r < 2 * i && (i = r / 2), i < 0 && (i = 0), this.beginPath(), this.moveTo(e + i, t), this.arcTo(e + n, t, e + n, t + r, i), this.arcTo(e + n, t + r, e, t + r, i), this.arcTo(e, t + r, e, t, i), this.arcTo(e, t, e + n, t, i), this.closePath(), this;
  };
  "undefined" != typeof Storage && (E = true);
  var A,
    B,
    M = T("moofoll");
  for (var C, R, _, O, j, U, L, D = 1, z = Date.now(), Y = [], F = [], H = [], W = [], q = [], N = new b(k, q, p), X = n(58), V = n(59), G = new X(Y, V, F, p, null, h, u), J = new Array(14), $ = 0; $ < 14; $++) J[$] = [];
  function K(e) {
    var t = e.onBridge || e.zIndex > 0;
    return e.isRoof ? 13 : e.isItem || 0 !== e.type ? t && (e.group && "platform" === e.group.name || "platform" === e.name) ? 12 : t ? "sapling" === e.name ? 7 : e.layer >= 1 ? 9 : 0 === e.layer ? 5 : 4 : e.canplaceinbuildings || e.group && "platform" === e.group.name ? 3 : "sapling" === e.name ? 2 : !e.isItem && e.layer >= 1 || e.layer >= 1 ? 8 : 0 === e.layer ? 1 : 0 : 11;
  }
  var Z = 1,
    Q = 0,
    biomeData = h.biomes || {},
    riverPoints = null,
    riverPointsLow = null;
  function interpolateRiver(e, t) {
    if (!e || !e.segments || !e.segments.length) return 0;
    for (var n = null, r = 0; r < e.segments.length; r++) if (t <= e.segments[r].toX || r === e.segments.length - 1) {
      n = e.segments[r];
      break;
    }
    n || (n = e.segments[e.segments.length - 1]);
    var i = n.toX - n.fromX || 1,
      a = Math.max(0, Math.min(1, (t - n.fromX) / i)),
      o = a * a,
      s = o * a,
      c = s - 2 * o + a,
      l = -2 * s + 3 * o,
      u = s - o;
    return (2 * s - 3 * o + 1) * n.fromY + c * n.m1 * n.dx + l * n.toY + u * n.m2 * n.dx;
  }
  function sampleRiverPoints(e, t, n, r) {
    if (!e || !e.anchors || e.anchors.length < 2) return null;
    for (var i = n - t, a = Math.max(60, r || 180), o = Math.max(8, Math.ceil(i / a)), s = [], c = 0; c <= o; c++) {
      var l = t + i * c / o;
      s.push({
        x: l,
        y: interpolateRiver(e, l)
      });
    }
    return s;
  }
  var gridOffsetX,
    gridOffsetY,
    lastSendDir,
    lastMoveDir,
    lastAttackDir,
    mouseX = 0,
    mouseY = 0,
    moveTouch = {
      id: -1,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    },
    aimTouch = {
      id: -1,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    },
    skinColor = 0,
    maxScreenWidth = h.maxScreenWidth,
    maxScreenHeight = h.maxScreenHeight,
    tempCanvas = document.createElement("canvas");
  tempCanvas.width = maxScreenWidth;
  tempCanvas.height = maxScreenHeight;
  var tempCtx = tempCanvas.getContext("2d"),
    tempCanvas2 = document.createElement("canvas");
  tempCanvas2.width = maxScreenWidth;
  tempCanvas2.height = maxScreenHeight;
  var tempCtx2 = tempCanvas2.getContext("2d"),
    tempCanvas3 = document.createElement("canvas");
  tempCanvas3.width = maxScreenWidth;
  tempCanvas3.height = maxScreenHeight;
  var tempCtx3 = tempCanvas3.getContext("2d"),
    camX = 0,
    camY = 0,
    inGame = false,
    mainMenu = document.getElementById("mainMenu"),
    enterGameBtn = document.getElementById("enterGame"),
    partyBtn = document.getElementById("partyButton"),
    joinPartyBtn = document.getElementById("joinPartyButton"),
    settingsBtn = document.getElementById("settingsButton"),
    settingsBtnSpan = settingsBtn.getElementsByTagName("span")[0],
    allianceBtn = document.getElementById("allianceButton");
  if (partyBtn) {
    var _e = partyBtn.getElementsByTagName("span")[0];
    _e && ("undefined" != typeof window && window.location ? _e.innerText = window.location.host : _e.innerText = "");
  }
  var storeBtn = document.getElementById("storeButton"),
    chatBtn = document.getElementById("chatButton"),
    gameCanvas = document.getElementById("gameCanvas"),
    mainContext = gameCanvas.getContext("2d"),
    nativeResOption = document.getElementById("nativeResolution"),
    showPingOption = document.getElementById("showPing"),
    shutdownDisplay = document.getElementById("shutdownDisplay"),
    menuCardHolder = document.getElementById("menuCardHolder"),
    guideCard = document.getElementById("guideCard"),
    loadingText = document.getElementById("loadingText"),
    gameUI = document.getElementById("gameUI"),
    actionBar = document.getElementById("actionBar"),
    scoreDisplay = document.getElementById("scoreDisplay"),
    foodDisplay = document.getElementById("foodDisplay"),
    woodDisplay = document.getElementById("woodDisplay"),
    stoneDisplay = document.getElementById("stoneDisplay"),
    killCounter = document.getElementById("killCounter"),
    leaderboardData = document.getElementById("leaderboardData"),
    nameInput = document.getElementById("nameInput"),
    itemInfoHolder = document.getElementById("itemInfoHolder"),
    ageText = document.getElementById("ageText"),
    ageBarBody = document.getElementById("ageBarBody"),
    upgradeHolder = document.getElementById("upgradeHolder"),
    upgradeCounter = document.getElementById("upgradeCounter"),
    allianceMenu = document.getElementById("allianceMenu"),
    allianceHolder = document.getElementById("allianceHolder"),
    allianceManager = document.getElementById("allianceManager"),
    mapDisplay = document.getElementById("mapDisplay"),
    diedText = document.getElementById("diedText"),
    skinColorHolder = document.getElementById("skinColorHolder"),
    mapContext = mapDisplay.getContext("2d");
  mapDisplay.width = 300;
  mapDisplay.height = 300;
  var storeMenu = document.getElementById("storeMenu"),
    storeHolder = document.getElementById("storeHolder"),
    notificationDisplay = document.getElementById("notificationDisplay"),
    hatsData = y.hats,
    accessoriesData = y.accessories,
    projManager = new g(d, W, u, h);
  function setupGame(e) {
    H = e.teams;
    e.riverWaypoints && function (e) {
      if (e && e.anchors && e.anchors.length >= 2 && e.segments && e.segments.length > 0) {
        e;
        var t = "number" == typeof e.minX ? e.minX : -maxScreenWidth,
          n = "number" == typeof e.maxX ? e.maxX : h.mapScale + maxScreenWidth;
        riverPoints = sampleRiverPoints(e, t, n, 180);
        var r = Math.max(h.mapScale / 60, 120);
        riverPointsLow = sampleRiverPoints(e, t, n, r);
      } else {
        null;
        riverPoints = null;
        riverPointsLow = null;
      }
    }(e.riverWaypoints);
  }
  var featuredYoutubeEl = document.getElementById("featuredYoutube"),
    youtubers = [{
      name: "Pentonic",
      link: "https://www.youtube.com/@6wonderfulgames"
    }, {
      name: "Phalynx",
      link: "https://www.youtube.com/@phalynxi "
    }],
    featuredYoutuber = youtubers[u.randInt(0, youtubers.length - 1)];
  featuredYoutubeEl.innerHTML = "<a target='_blank' class='ytLink' href='" + featuredYoutuber.link + "'><i class='material-icons' style='vertical-align: top;'>&#xE064;</i> " + featuredYoutuber.name + "</a>";
  var windowFocused = true;
  function onDisconnect(e) {
    false;
    l.close();
    inGame = false;
    showLoadingText(e || "Disconnected");
  }
  function showLoadingText(e) {
    mainMenu.style.display = "block";
    gameUI.style.display = "none";
    menuCardHolder.style.display = "none";
    diedText.style.display = "none";
    loadingText.style.display = "block";
    loadingText.innerHTML = e + "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>";
  }
  window.onblur = function () {
    windowFocused = false;
  };
  window.onfocus = function () {
    windowFocused = true;
    j && j.alive && sendInput();
  };
  gameCanvas.oncontextmenu = function () {
    return false;
  };
  var menuPanels = function () {
    var e = ["info", "youtuber"],
      t = {
        info: false,
        youtuber: false
      },
      n = {};
    function r(e) {
      n[e + "Button"].addEventListener("click", function (n) {
        n.stopPropagation();
        i(e, !t[e]);
      });
    }
    function i(e, r) {
      t[e] = r;
      var i = n[e + "Panel"];
      i.classList.toggle("hidden", !r);
      i.classList.toggle("visible", r);
      r && (n[e + "Button"].style.opacity = "1");
    }
    function a(r) {
      for (var a = 0; a < e.length; a++) {
        var o = e[a];
        if (t[o]) {
          var s = n[o + "Panel"],
            c = n[o + "Button"];
          s.contains(r.target) || c.contains(r.target) || i(o, false);
        }
      }
    }
    function o(t) {
      for (var n = 0; n < e.length; n++) s(e[n], t);
    }
    function s(e, r) {
      if (t[e]) n[e + "Button"].style.opacity = "1";else {
        var i = n[e + "Button"].getBoundingClientRect(),
          a = i.left + i.width / 2,
          o = i.top + i.height / 2,
          s = Math.hypot(r.clientX - a, r.clientY - o);
        n[e + "Button"].style.opacity = s > 100 ? "0.3" : "1";
      }
    }
    function c(e) {
      var t = document.createElement("a");
      t.href = e.link;
      t.target = "_blank";
      t.rel = "noopener noreferrer";
      t.className = "menuLink expandedPanelLink";
      t.setAttribute("role", "listitem");
      var n = "http://www.w3.org/2000/svg",
        r = document.createElementNS(n, "svg");
      r.setAttribute("class", "expandedPanelIcon");
      r.setAttribute("viewBox", "0 0 24 24");
      r.setAttribute("fill", "currentColor");
      var i = document.createElementNS(n, "path");
      return i.setAttribute("d", "M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"), r.appendChild(i), t.appendChild(r), t.appendChild(document.createTextNode(e.name)), t;
    }
    return {
      init: function () {
        n.infoButton = document.getElementById("infoPanelToggle");
        n.infoPanel = document.getElementById("linksExpandedPanel");
        n.youtuberButton = document.getElementById("youtuberPanelToggle");
        n.youtuberPanel = document.getElementById("youtuberExpandedPanel");
        n.youtuberLinks = document.getElementById("youtuberLinks");
        n.versionElement = document.getElementById("versionText");
        n.infoButton && n.infoPanel && n.youtuberButton && n.youtuberPanel && (n.infoPanel.classList.add("hidden"), n.youtuberPanel.classList.add("hidden"), r("info"), r("youtuber"), document.addEventListener("click", a), document.addEventListener("mousemove", o), n.versionElement && n.versionElement.addEventListener("click", function (e) {
          e.preventDefault();
          window.open("./docs/versions.txt", "_blank");
        }), n.youtuberLinks && function () {
          n.youtuberLinks.textContent = "";
          for (var e = document.createDocumentFragment(), t = 0; t < youtubers.length; t++) e.appendChild(c(youtubers[t]));
          n.youtuberLinks.appendChild(e);
        }());
      }
    };
  }();
  function showItemInfo(e, t, n) {
    if (j && e) {
      if (u.removeAllChildren(itemInfoHolder), itemInfoHolder.classList.add("visible"), u.generateElement({
        id: "itemInfoName",
        text: u.capitalizeFirst(e.name),
        parent: itemInfoHolder
      }), u.generateElement({
        id: "itemInfoDesc",
        text: e.desc,
        parent: itemInfoHolder
      }), n && e.price) u.generateElement({
        class: "itemInfoReq",
        text: "Price: " + e.price + " coins",
        parent: itemInfoHolder
      });else if (t) u.generateElement({
        class: "itemInfoReq",
        text: e.type ? "secondary" : "primary",
        parent: itemInfoHolder
      });else {
        for (var r = 0; r < e.req.length; r += 2) u.generateElement({
          class: "itemInfoReq",
          html: e.req[r] + "<span class='itemInfoReqVal'> x" + e.req[r + 1] + "</span>",
          parent: itemInfoHolder
        });
        e.group.limit && u.generateElement({
          class: "itemInfoLmt",
          text: (j.itemCounts[e.group.id] || 0) + "/" + e.group.limit,
          parent: itemInfoHolder
        });
      }
    } else itemInfoHolder.classList.remove("visible");
  }
  "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", menuPanels.init) : menuPanels.init();
  var deathMarker,
    teammatePositions,
    targetMarker,
    allianceRequests = [],
    memberList = [];
  function addAllianceReq(e, t) {
    allianceRequests.push({
      sid: e,
      name: t
    });
    showNotification();
  }
  function showNotification() {
    if (allianceRequests[0]) {
      var e = allianceRequests[0];
      u.removeAllChildren(notificationDisplay);
      notificationDisplay.style.display = "block";
      u.generateElement({
        class: "notificationText",
        text: e.name,
        parent: notificationDisplay
      });
      u.generateElement({
        class: "notifButton",
        html: "<i class='material-icons' style='font-size:28px;color:#cc5151;'>&#xE14C;</i>",
        parent: notificationDisplay,
        onclick: function () {
          handleAllianceReq(0);
        },
        hookTouch: true
      });
      u.generateElement({
        class: "notifButton",
        html: "<i class='material-icons' style='font-size:28px;color:#8ecc51;'>&#xE876;</i>",
        parent: notificationDisplay,
        onclick: function () {
          handleAllianceReq(1);
        },
        hookTouch: true
      });
    } else notificationDisplay.style.display = "none";
  }
  function addTeam(e) {
    H.push(e);
    "block" == allianceMenu.style.display && showAllianceUI();
  }
  function onSetTeam(e, t) {
    j && (j.team = e, j.isOwner = t, "block" == allianceMenu.style.display && showAllianceUI());
  }
  function onAllianceMembers(e) {
    memberList = e;
    "block" == allianceMenu.style.display && showAllianceUI();
  }
  function deleteAlliance(e) {
    for (var t = H.length - 1; t >= 0; t--) H[t].sid == e && H.splice(t, 1);
    "block" == allianceMenu.style.display && showAllianceUI();
  }
  function showAllianceUI() {
    if (j && j.alive) {
      if (closeMenus(), storeMenu.style.display = "none", allianceMenu.style.display = "block", u.removeAllChildren(allianceHolder), j.team) for (var e = 0; e < memberList.length; e += 2) !function (e) {
        var t = u.generateElement({
          class: "allianceItem",
          style: "color:" + (memberList[e] == j.sid ? "#fff" : "rgba(255,255,255,0.6)"),
          text: memberList[e + 1],
          parent: allianceHolder
        });
        j.isOwner && memberList[e] != j.sid && u.generateElement({
          class: "joinAlBtn",
          text: "Kick",
          onclick: function () {
            zt(memberList[e]);
          },
          hookTouch: true,
          parent: t
        });
      }(e);else if (H.length) for (e = 0; e < H.length; ++e) !function (e) {
        var t = u.generateElement({
          class: "allianceItem",
          style: "color:" + (H[e].sid == j.team ? "#fff" : "rgba(255,255,255,0.6)"),
          text: H[e].sid,
          parent: allianceHolder
        });
        u.generateElement({
          class: "joinAlBtn",
          text: "Join",
          onclick: function () {
            Yt(e);
          },
          hookTouch: true,
          parent: t
        });
      }(e);else u.generateElement({
        class: "allianceItem",
        text: "No Tribes Yet",
        parent: allianceHolder
      });
      u.removeAllChildren(allianceManager);
      j.team ? u.generateElement({
        class: "allianceButtonM",
        style: "width: 360px",
        text: j.isOwner ? "Delete Tribe" : "Leave Tribe",
        onclick: function () {
          Ht();
        },
        hookTouch: true,
        parent: allianceManager
      }) : (u.generateElement({
        tag: "input",
        type: "text",
        id: "allianceInput",
        maxLength: 7,
        placeholder: "unique name",
        ontouchstart: function (e) {
          e.preventDefault();
          var t = prompt("unique name", e.currentTarget.value);
          e.currentTarget.value = t.slice(0, 7);
        },
        parent: allianceManager
      }), u.generateElement({
        tag: "div",
        class: "allianceButtonM",
        style: "width: 140px;",
        text: "Create",
        onclick: function () {
          Ft();
        },
        hookTouch: true,
        parent: allianceManager
      }));
    }
  }
  function handleAllianceReq(e) {
    l.send("P", allianceRequests[0].sid, e);
    allianceRequests.splice(0, 1);
    showNotification();
  }
  function zt(e) {
    l.send("P", e);
  }
  function Yt(e) {
    l.send("b", H[e].sid);
  }
  function Ft() {
    l.send("L", document.getElementById("allianceInput").value);
  }
  function Ht() {
    allianceRequests = [];
    showNotification();
    l.send("N");
  }
  var mapPing,
    mapPings = [],
    Nt = i(function e() {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e);
      this.init = function (e, t) {
        this.scale = 0;
        this.x = e;
        this.y = t;
        this.active = true;
      };
      this.update = function (e, t) {
        this.active && (this.scale += .05 * t, this.scale >= h.mapPingScale ? this.active = false : (e.globalAlpha = 1 - Math.max(0, this.scale / h.mapPingScale), e.beginPath(), e.arc(this.x / h.mapScale * mapDisplay.width, this.y / h.mapScale * mapDisplay.width, this.scale, 0, 2 * Math.PI), e.stroke()));
      };
    });
  new Nt();
  function receiveChat(e, t) {
    for (var n = 0; n < mapPings.length; ++n) if (!mapPings[n].active) {
      mapPing = mapPings[n];
      break;
    }
    mapPing || (mapPing = new Nt(), mapPings.push(mapPing));
    mapPing.init(e, t);
  }
  function pingSocketResponse(e) {
    teammatePositions = e;
  }
  var Gt = 0;
  function Jt(e, t, n) {
    n ? e ? j.tailIndex = t : j.tails[t] = 1 : e ? j.skinIndex = t : j.skins[t] = 1;
    "block" == storeMenu.style.display && updateAllianceUI();
  }
  function renderAllianceList() {
    if (storeMenu) for (var e = storeMenu.querySelectorAll(".overlay-tab"), t = 0; t < e.length; t++) t === Gt ? e[t].classList.add("active") : e[t].classList.remove("active");
  }
  function updateAllianceUI() {
    if (j) {
      u.removeAllChildren(storeHolder);
      for (var e = Gt, t = e ? accessoriesData : hatsData, n = 0; n < t.length; ++n) t[n].dontSell || function (n) {
        var r = u.generateElement({
          id: "storeDisplay" + n,
          class: "storeItem",
          onmouseout: function () {
            showItemInfo();
          },
          onmouseover: function () {
            showItemInfo(t[n], false, true);
          },
          parent: storeHolder
        });
        u.hookTouchEvents(r, true);
        u.generateElement({
          tag: "img",
          class: "hatPreview",
          src: "../img/" + (e ? "accessories/access_" : "hats/hat_") + t[n].id + (t[n].topSprite ? "_p" : "") + ".png",
          parent: r
        });
        u.generateElement({
          tag: "span",
          text: t[n].name,
          parent: r
        });
        (e ? j.tails[t[n].id] : j.skins[t[n].id]) ? (e ? j.tailIndex : j.skinIndex) == t[n].id ? u.generateElement({
          class: "joinAlBtn",
          style: "margin-top: 5px",
          text: "Unequip",
          onclick: function () {
            Zt(0, e);
          },
          hookTouch: true,
          parent: r
        }) : u.generateElement({
          class: "joinAlBtn",
          style: "margin-top: 5px",
          text: "Equip",
          onclick: function () {
            Zt(t[n].id, e);
          },
          hookTouch: true,
          parent: r
        }) : (u.generateElement({
          class: "joinAlBtn",
          style: "margin-top: 5px",
          text: "Buy",
          onclick: function () {
            Qt(t[n].id, e);
          },
          hookTouch: true,
          parent: r
        }), u.generateElement({
          tag: "span",
          class: "itemPrice",
          text: t[n].price,
          parent: r
        }));
      }(n);
    }
  }
  function Zt(e, t) {
    l.send("c", 0, e, t);
  }
  function Qt(e, t) {
    l.send("c", 1, e, t);
  }
  function en() {
    storeMenu.style.display = "none";
    allianceMenu.style.display = "none";
    closeMenus();
  }
  function setAlliancePlayers(e, t) {
    e && (t ? j.weapons = e : j.items = e);
    for (var n = 0; n < p.list.length; ++n) {
      var r = p.weapons.length + n;
      document.getElementById("actionBarItem" + r).style.display = j.items.indexOf(p.list[n].id) >= 0 ? "inline-block" : "none";
    }
    for (n = 0; n < p.weapons.length; ++n) document.getElementById("actionBarItem" + n).style.display = j.weapons[p.weapons[n].type] == p.weapons[n].id ? "inline-block" : "none";
  }
  function setNativeRes(e) {
    A = e;
    D = e && window.devicePixelRatio || 1;
    nativeResOption.checked = e;
    P("native_resolution", e.toString());
    gn();
  }
  function resizeGame() {
    for (var e = "", t = 0; t < h.skinColors.length; ++t) e += t == skinColor ? "<div class='skinColorItem activeSkin' style='background-color:" + h.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'> </div>" : "<div class='skinColorItem' style='background-color:" + h.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'> </div>";
    skinColorHolder.innerHTML = e;
  }
  var an,
    on,
    sn = document.getElementById("chatBox"),
    cn = document.getElementById("chatHolder"),
    ln = new v();
  function toggleChat() {
    an ? setTimeout(function () {
      var e = prompt("chat message");
      e && fn(e);
    }, 1) : "block" == cn.style.display ? (sn.value && fn(sn.value), closeMenus()) : (storeMenu.style.display = "none", allianceMenu.style.display = "none", cn.style.display = "block", sn.focus(), sendInput());
    sn.value = "";
  }
  function fn(e) {
    l.send("6", e.slice(0, 30));
  }
  function closeMenus() {
    sn.value = "";
    cn.style.display = "none";
  }
  function dn(e) {
    if (!e) return "";
    for (var t = "M", n = 1; n < e; n++) t += "o";
    return t;
  }
  function showText(e, t) {
    var n = Dr(e);
    n && (n.chatMessage = function (e) {
      for (var t = e, n = 0; n < ln.list.length; ++n) {
        var r = ln.list[n];
        if (r) {
          var i = dn(r.length),
            a = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            o = new RegExp(a, "gi");
          t = t.replace(o, i);
        }
      }
      return t;
    }(t), n.chatCountdown = h.chatCountdown);
  }
  function gn() {
    lastMoveDir = window.innerWidth;
    lastAttackDir = window.innerHeight;
    var e = Math.max(lastMoveDir / maxScreenWidth, lastAttackDir / maxScreenHeight) * D;
    gameCanvas.width = lastMoveDir * D;
    gameCanvas.height = lastAttackDir * D;
    gameCanvas.style.width = lastMoveDir + "px";
    gameCanvas.style.height = lastAttackDir + "px";
    mainContext.setTransform(e, 0, 0, e, (lastMoveDir * D - maxScreenWidth * e) / 2, (lastAttackDir * D - maxScreenHeight * e) / 2);
  }
  function mn(e) {
    (an = e) ? guideCard.classList.add("touch") : guideCard.classList.remove("touch");
  }
  function yn(e) {
    e.preventDefault();
    e.stopPropagation();
    mn(true);
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      n.identifier == moveTouch.id ? (moveTouch.id = -1, getAttackDir()) : n.identifier == aimTouch.id && (aimTouch.id = -1, j.buildIndex >= 0 && (O = 1, getMoveDir()), O = 0, getMoveDir());
    }
  }
  function kn() {
    return j ? (-1 != aimTouch.id ? on = Math.atan2(aimTouch.currentY - aimTouch.startY, aimTouch.currentX - aimTouch.startX) : j.lockDir || an || (on = Math.atan2(mouseY - lastAttackDir / 2, mouseX - lastMoveDir / 2)), u.fixTo(on || 0, 2)) : 0;
  }
  window.addEventListener("resize", u.checkTrusted(gn));
  gn();
  mn(false);
  window.setUsingTouch = mn;
  gameCanvas.addEventListener("touchmove", u.checkTrusted(function (e) {
    e.preventDefault();
    e.stopPropagation();
    mn(true);
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      n.identifier == moveTouch.id ? (moveTouch.currentX = n.pageX, moveTouch.currentY = n.pageY, getAttackDir()) : n.identifier == aimTouch.id && (aimTouch.currentX = n.pageX, aimTouch.currentY = n.pageY, O = 1);
    }
  }), false);
  gameCanvas.addEventListener("touchstart", u.checkTrusted(function (e) {
    e.preventDefault();
    e.stopPropagation();
    mn(true);
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      n.pageX < document.body.scrollWidth / 2 && -1 == moveTouch.id ? (moveTouch.id = n.identifier, moveTouch.startX = moveTouch.currentX = n.pageX, moveTouch.startY = moveTouch.currentY = n.pageY, getAttackDir()) : n.pageX > document.body.scrollWidth / 2 && -1 == aimTouch.id && (aimTouch.id = n.identifier, aimTouch.startX = aimTouch.currentX = n.pageX, aimTouch.startY = aimTouch.currentY = n.pageY, j.buildIndex < 0 && (O = 1, getMoveDir()));
    }
  }), false);
  gameCanvas.addEventListener("touchend", u.checkTrusted(yn), false);
  gameCanvas.addEventListener("touchcancel", u.checkTrusted(yn), false);
  gameCanvas.addEventListener("touchleave", u.checkTrusted(yn), false);
  gameCanvas.addEventListener("mousemove", function (e) {
    e.preventDefault();
    e.stopPropagation();
    mn(false);
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, false);
  gameCanvas.addEventListener("mousedown", function (e) {
    mn(false);
    O = 1;
    getMoveDir();
  }, false);
  gameCanvas.addEventListener("mouseup", function (e) {
    mn(false);
    O = 0;
    getMoveDir();
  }, false);
  var bn = {},
    vn = {
      87: [0, -1],
      38: [0, -1],
      83: [0, 1],
      40: [0, 1],
      65: [-1, 0],
      37: [-1, 0],
      68: [1, 0],
      39: [1, 0]
    };
  function sendInput() {
    bn = {};
    l.send("e");
  }
  function xn() {
    return "block" != cn.style.display;
  }
  function getMoveDir() {
    j && j.alive && (1 === O && function () {
      var e = Date.now();
      renderGame.push(e);
      ni(e);
      true;
    }(), l.send("F", O, kn()));
  }
  let mx = 0,
    my = 0,
    loops = {};
  window.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
  });
  function place(slot) {
    if (!j || !j.alive || !j.items || j.items[slot] == null) return;
    selectItem(j.items[slot]);
    O = 1;
    getMoveDir();
    ni(Date.now());
    O = 0;
    if (j.weapons && j.weapons[0] != null) selectItem(j.weapons[0], 1);
  }
  window.addEventListener("keydown", u.checkTrusted(function (e) {
    var t = e.which || e.keyCode || 0;
    if (loops[t]) return;
    if (t == 81 || t == 86 || t == 78 || t == 70 || t == 72) {
      const map = {
        81: 0,
        86: 2,
        78: 3,
        70: 4,
        72: 7
      };
      place(map[t]);
      loops[t] = setInterval(() => place(map[t]), 90);
      return;
    }
    27 == t ? en() : j && j.alive && xn() && (bn[t] || (bn[t] = 1, 69 == t ? l.send("K", 1) : 67 == t ? (targetMarker || (targetMarker = {}), targetMarker.x = j.x, targetMarker.y = j.y) : 88 == t ? (j.lockDir = j.lockDir ? 0 : 1, l.send("K", 0)) : null != j.weapons[t - 49] ? selectItem(j.weapons[t - 49], true) : null != j.items[t - 49 - j.weapons.length] ? selectItem(j.items[t - 49 - j.weapons.length]) : 82 == t ? toggleMinimap() : vn[t] ? getAttackDir() : 32 == t && (O = 1, getMoveDir(), ni(Date.now()))));
  }));
  window.addEventListener("keyup", u.checkTrusted(function (e) {
    var t = e.which || e.keyCode || 0;
    if (loops[t]) {
      clearInterval(loops[t]);
      delete loops[t];
    }
    if (j && j.alive) {
      13 == t ? toggleChat() : xn() && bn[t] && (bn[t] = 0, vn[t] ? getAttackDir() : 32 == t && (O = 0, getMoveDir()));
    }
  }));
  var sendMoveDir = undefined;
  function getAttackDir() {
    var e = function () {
      var e = 0,
        t = 0;
      if (-1 != moveTouch.id) {
        e += moveTouch.currentX - moveTouch.startX;
        t += moveTouch.currentY - moveTouch.startY;
      } else for (var n in vn) {
        var r = vn[n];
        e += !!bn[n] * r[0];
        t += !!bn[n] * r[1];
      }
      return 0 == e && 0 == t ? undefined : u.fixTo(Math.atan2(t, e), 2);
    }();
    (null == sendMoveDir || null == e || Math.abs(e - sendMoveDir) > .3) && (l.send("9", e), sendMoveDir = e);
  }
  function toggleMinimap() {
    l.send("S", 1);
  }
  function selectItem(e, t) {
    l.send("z", e, t);
  }
  var noRiverAnim = true;
  function addPlayer(e) {
    loadingText.style.display = "none";
    menuCardHolder.style.display = "flex";
    mainMenu.style.display = "none";
    bn = {};
    U = e;
    O = 0;
    inGame = true;
    noRiverAnim && (noRiverAnim = false, W.length = 0);
  }
  function updateStoreItems(e, t, n, r) {
    w.showText(e, t, 50, .18, 500, Math.abs(n), n >= 0 ? "#fff" : "#8ecc51");
  }
  var Cn = 99999;
  function killPlayer() {
    inGame = false;
    try {
      factorem.refreshAds([2], true);
    } catch (e) {}
    gameUI.style.display = "none";
    en();
    deathMarker = {
      x: j.x,
      y: j.y
    };
    loadingText.style.display = "none";
    diedText.style.display = "block";
    diedText.style.fontSize = "0px";
    Cn = 0;
    setTimeout(function () {
      menuCardHolder.style.display = "flex";
      mainMenu.style.display = "block";
      diedText.style.display = "none";
    }, h.deathFadeout);
    updateServerList();
  }
  function updateAge(e) {
    j && projManager.removeAllItems(e);
  }
  function updateItemCounts(e) {
    projManager.disableBySid(e);
  }
  function jn() {
    scoreDisplay.innerText = j.points;
    foodDisplay.innerText = j.food;
    woodDisplay.innerText = j.wood;
    stoneDisplay.innerText = j.stone;
    killCounter.innerText = j.kills;
  }
  var iconCache = {},
    iconNames = ["crown", "skull"];
  var mouseDown = [];
  function updateUpgrades(e, t) {
    if (j.upgradePoints = e, j.upgrAge = t, e > 0) {
      mouseDown.length = 0;
      u.removeAllChildren(upgradeHolder);
      for (var n = 0; n < p.weapons.length; ++n) {
        if (p.weapons[n].age == t && (null == p.weapons[n].pre || j.weapons.indexOf(p.weapons[n].pre) >= 0)) {
          u.generateElement({
            id: "upgradeItem" + n,
            class: "actionBarItem",
            onmouseout: function () {
              showItemInfo();
            },
            parent: upgradeHolder
          }).style.backgroundImage = document.getElementById("actionBarItem" + n).style.backgroundImage;
          mouseDown.push(n);
        }
      }
      for (n = 0; n < p.list.length; ++n) if (p.list[n].age == t && (null == p.list[n].pre || j.items.indexOf(p.list[n].pre) >= 0)) {
        var r = p.weapons.length + n;
        u.generateElement({
          id: "upgradeItem" + r,
          class: "actionBarItem",
          onmouseout: function () {
            showItemInfo();
          },
          parent: upgradeHolder
        }).style.backgroundImage = document.getElementById("actionBarItem" + r).style.backgroundImage;
        mouseDown.push(r);
      }
      for (n = 0; n < mouseDown.length; n++) !function (e) {
        var t = document.getElementById("upgradeItem" + e);
        t.onmouseover = function () {
          p.weapons[e] ? showItemInfo(p.weapons[e], true) : showItemInfo(p.list[e - p.weapons.length]);
        };
        t.onclick = u.checkTrusted(function () {
          l.send("H", e);
        });
        u.hookTouchEvents(t);
      }(mouseDown[n]);
      mouseDown.length ? (upgradeHolder.style.display = "block", upgradeCounter.style.display = "block", upgradeCounter.innerHTML = "Select Items (" + e + ")") : (upgradeHolder.style.display = "none", upgradeCounter.style.display = "none", showItemInfo());
    } else {
      upgradeHolder.style.display = "none";
      upgradeCounter.style.display = "none";
      showItemInfo();
    }
  }
  function updateAge(e, t, n) {
    null != e && (j.XP = e);
    null != t && (j.maxXP = t);
    null != n && (j.age = n);
    n == h.maxAge ? (ageText.innerHTML = "MAX AGE", ageBarBody.style.width = "100%") : (ageText.innerHTML = "AGE " + j.age, ageBarBody.style.width = j.XP / j.maxXP * 100 + "%");
  }
  function loadGameObject(e) {
    u.removeAllChildren(leaderboardData);
    for (var t = 1, n = 0; n < e.length; n += 3) {
      !function (n) {
        u.generateElement({
          class: "leaderHolder",
          parent: leaderboardData,
          children: [u.generateElement({
            class: "leaderboardItem",
            style: "color:" + (e[n] == U ? "#fff" : "rgba(255,255,255,0.6)"),
            text: t + ". " + ("" != e[n + 1] ? e[n + 1] : "unknown")
          }), u.generateElement({
            class: "leaderScore",
            text: u.kFormat(e[n + 2]) || "0"
          })]
        });
      }(n);
      t++;
    }
  }
  function updateGame() {
    if (j && (!_ || R - _ >= 1e3 / h.clientSendRate) && (_ = R, l.send("D", kn())), Cn < 120 && (Cn += .1 * C, diedText.style.fontSize = Math.min(Math.round(Cn), 120) + "px"), j) {
      var e = u.getDistance(gridOffsetX, gridOffsetY, j.x, j.y),
        t = u.getDirection(j.x, j.y, gridOffsetX, gridOffsetY),
        n = Math.min(.01 * e * C, e);
      e > .05 ? (gridOffsetX += n * Math.cos(t), gridOffsetY += n * Math.sin(t)) : (gridOffsetX = j.x, gridOffsetY = j.y);
    } else {
      gridOffsetX = h.mapScale / 2;
      gridOffsetY = h.mapScale / 2;
    }
    for (var r = R - 1e3 / h.serverUpdateRate, i = 0; i < F.length + Y.length; ++i) if ((L = F[i] || Y[i - F.length]) && L.visible) if (L.forcePos) {
      L.x = L.x2;
      L.y = L.y2;
      L.dir = L.d2;
    } else {
      var a = L.t2 - L.t1,
        o = (r - L.t1) / a;
      L.notificationDisplay += C;
      var s = Math.min(1.7, L.notificationDisplay / 170),
        c = L.x2 - L.x1;
      L.x = L.x1 + c * s;
      c = L.y2 - L.y1;
      L.y = L.y1 + c * s;
      L.dir = Math.lerpAngle(L.d2, L.d1, Math.min(1.2, o));
    }
    var f = gridOffsetX - maxScreenWidth / 2,
      d = gridOffsetY - maxScreenHeight / 2;
    for (var p in function (e, t, n) {
      for (var r in J) Object.prototype.hasOwnProperty.call(J, r) && (J[r].length = 0);
      for (var i = 0; i < W.length; ++i) if ((L = W[i]) && L.active) {
        L.update(n);
        var a = L.x + L.xWiggle - e,
          o = L.y + L.yWiggle - t;
        if (isOnScreen(a, o, L.scale / (0 != L.type || L.isItem ? 1 : .3) + (L.blocker || 0))) {
          var s = L.renderLayer;
          undefined === s && (s = K(L), L.renderLayer = s);
          J[s] || (J[s] = []);
          var c = {
            obj: L,
            x: a,
            y: o
          };
          if (J[s].push(c), "sapling" === L.name && L.isItem) {
            var l = L.onBridge ? 6 : 1;
            J[l].push({
              obj: L,
              x: a,
              y: o,
              trunkOnly: true
            });
          }
          L.isItem || 0 !== L.type || J[10].push({
            obj: L,
            x: a,
            y: o,
            trunkOnly: true
          });
        }
      }
      J[11] && J[11].length > 1 && J[11].sort(function (e, t) {
        return e.obj.scale - t.obj.scale;
      });
    }(f, d, C), biomeData) {
      var g = biomeData[p];
      if (g) {
        mainContext.fillStyle = g.color;
        var m = g.x1 - f,
          y = g.y1 - d,
          k = g.x2 - f,
          b = g.y2 - d;
        g.x1 <= 0 && (m = Math.min(m, -maxScreenWidth));
        g.y1 <= 0 && (y = Math.min(y, -maxScreenHeight));
        g.x2 >= h.mapScale && (k = Math.max(k, 2 * maxScreenWidth));
        g.y2 >= h.mapScale && (b = Math.max(b, 2 * maxScreenHeight));
        k > 0 && m < maxScreenWidth && b > 0 && y < maxScreenHeight && mainContext.fillRect(m, y, k - m, b - y);
      }
    }
    noRiverAnim || ((Z += Q * h.waveSpeed * C) >= h.waveMax ? (Z = h.waveMax, Q = -1) : Z <= 1 && (Z = Q = 1), mainContext.globalAlpha = 1, mainContext.fillStyle = "#dbc666", renderRiver(f, d, mainContext, h.riverPadding), mainContext.fillStyle = "#91b2db", renderRiver(f, d, mainContext, 250 * (Z - 1)));
    mainContext.lineWidth = 4;
    mainContext.strokeStyle = "#000";
    mainContext.globalAlpha = 0;
    mainContext.beginPath();
    for (var v = -gridOffsetX; v < maxScreenWidth; v += maxScreenHeight / 18) v > 0 && (mainContext.moveTo(v, 0), mainContext.lineTo(v, maxScreenHeight));
    for (var x = -gridOffsetY; x < maxScreenHeight; x += maxScreenHeight / 18) v > 0 && (mainContext.moveTo(0, x), mainContext.lineTo(maxScreenWidth, x));
    if (mainContext.stroke(), mainContext.globalAlpha = 1, mainContext.strokeStyle = "#525252", renderLayer(0, f, d), mainContext.globalAlpha = 1, mainContext.lineWidth = 5.5, renderProjectilesLayer(0, f, d), renderAILayer(f, d, 0), renderPlayersLayer(f, d, 0), renderLayer(1, f, d), renderLayer(2, f, d), renderLayer(3, f, d), renderLayer(4, f, d), mainContext.globalAlpha = 1, mainContext.lineWidth = 5.5, renderProjectilesLayer(1, f, d), renderAILayer(f, d, 1), renderPlayersLayer(f, d, 1), renderLayer(5, f, d), renderLayer(8, f, d), renderLayer(6, f, d), renderLayer(7, f, d), renderLayer(9, f, d), renderLayer(10, f, d), renderDeadPlayers(f, d, 0), renderDeadPlayers(f, d, 1), function (e, t) {
      var n = J[11];
      if (!n || !n.length) return;
      var r = h.treeCutoutRadius,
        i = h.treeCutoutStrength,
        a = h.treeCutoutFadeSpeed,
        o = Math.min(1, a * C),
        s = camX - e,
        c = camY - t;
      0 === s && 0 === c || (tempCtx3.clearRect(0, 0, maxScreenWidth, maxScreenHeight), tempCtx3.globalAlpha = 1, tempCtx3.globalCompositeOperation = "source-over", tempCtx3.drawImage(tempCanvas2, s, c), tempCtx2.clearRect(0, 0, maxScreenWidth, maxScreenHeight), tempCtx2.globalAlpha = 1, tempCtx2.globalCompositeOperation = "source-over", tempCtx2.drawImage(tempCanvas3, 0, 0));
      camX = e;
      camY = t;
      tempCtx2.globalCompositeOperation = "destination-in";
      tempCtx2.fillStyle = "rgba(0,0,0," + (1 - o) + ")";
      tempCtx2.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
      tempCtx2.globalCompositeOperation = "source-over";
      tempCtx2.fillStyle = "rgba(0,0,0," + o + ")";
      for (var l = 0; l < F.length; l++) {
        var u = F[l];
        if (u.visible && (u == j || j.team && u.team === j.team)) {
          var f = u.x - e,
            d = u.y - t;
          isOnScreen(f, d, r) && (tempCtx2.beginPath(), tempCtx2.arc(f, d, r, 0, 2 * Math.PI), tempCtx2.fill());
        }
      }
      tempCtx.clearRect(0, 0, maxScreenWidth, maxScreenHeight);
      tempCtx.globalCompositeOperation = "source-over";
      for (l = 0; l < n.length; l++) {
        var p = n[l];
        L = p.obj;
        tempCtx.globalAlpha = L.hideFromEnemy ? .6 : 1;
        var g = getResSprite(L);
        tempCtx.drawImage(g, p.x - g.width / 2, p.y - g.height / 2);
      }
      tempCtx.globalCompositeOperation = "destination-out";
      tempCtx.globalAlpha = i;
      tempCtx.drawImage(tempCanvas2, 0, 0);
      tempCtx.globalCompositeOperation = "source-over";
      tempCtx.globalAlpha = 1;
      mainContext.globalAlpha = 1;
      mainContext.drawImage(tempCanvas, 0, 0);
    }(f, d), renderLayer(12, f, d), mainContext.globalAlpha = 1, mainContext.lineWidth = 5.5, renderProjectilesLayer(2, f, d), renderAILayer(f, d, 2), renderPlayersLayer(f, d, 2), renderDeadPlayers(f, d, 2), renderLayer(13, f, d), mainContext.fillStyle = "#000", mainContext.globalAlpha = .09, f <= 0 && mainContext.fillRect(0, 0, -f, maxScreenHeight), h.mapScale - f <= maxScreenWidth) {
      var E = Math.max(0, -d);
      mainContext.fillRect(h.mapScale - f, E, maxScreenWidth - (h.mapScale - f), maxScreenHeight - E);
    }
    if (d <= 0 && mainContext.fillRect(-f, 0, maxScreenWidth + f, -d), h.mapScale - d <= maxScreenHeight) {
      var S = Math.max(0, -f),
        I = 0;
      h.mapScale - f <= maxScreenWidth && (I = maxScreenWidth - (h.mapScale - f));
      mainContext.fillRect(S, h.mapScale - d, maxScreenWidth - S - I, maxScreenHeight - (h.mapScale - d));
    }
    mainContext.globalAlpha = 1;
    mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    w.update(C, mainContext, f, d);
    for (i = 0; i < F.length; ++i) if ((L = F[i]).visible && L.chatCountdown > 0) {
      L.chatCountdown -= C;
      L.chatCountdown <= 0 && (L.chatCountdown = 0);
      mainContext.font = "32px Hammersmith One";
      var P = mainContext.measureText(L.chatMessage);
      mainContext.textBaseline = "middle";
      mainContext.textAlign = "center";
      S = L.x - f;
      E = L.y - L.scale - d - 90;
      var T = P.width + 17;
      mainContext.fillStyle = "rgba(0,0,0,0.2)";
      mainContext.roundRect(S - T / 2, E - 23.5, T, 47, 6);
      mainContext.fill();
      mainContext.fillStyle = "#fff";
      mainContext.fillText(L.chatMessage, S, E);
    }
    !function (e) {
      if (j && j.alive) {
        mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height);
        var t = mapDisplay.width / h.mapScale,
          n = mapDisplay.height / h.mapScale;
        for (var r in biomeData) {
          var i = biomeData[r];
          i && (mapContext.fillStyle = i.color, mapContext.fillRect(i.x1 * t, i.y1 * n, (i.x2 - i.x1) * t, (i.y2 - i.y1) * n));
        }
        if (riverPointsLow && riverPointsLow.length > 1) {
          var a = mapContext.lineCap;
          mapContext.lineCap = "round";
          mapContext.strokeStyle = "#dbc666";
          mapContext.lineWidth = (h.riverWidth + h.riverPadding) * n;
          mapContext.beginPath();
          mapContext.moveTo(riverPointsLow[0].x * t, riverPointsLow[0].y * n);
          for (var o = 1; o < riverPointsLow.length; o++) mapContext.lineTo(riverPointsLow[o].x * t, riverPointsLow[o].y * n);
          mapContext.stroke();
          mapContext.strokeStyle = "#91b2db";
          mapContext.lineWidth = h.riverWidth * n;
          mapContext.beginPath();
          mapContext.moveTo(riverPointsLow[0].x * t, riverPointsLow[0].y * n);
          for (o = 1; o < riverPointsLow.length; o++) mapContext.lineTo(riverPointsLow[o].x * t, riverPointsLow[o].y * n);
          mapContext.stroke();
          mapContext.lineCap = a;
        } else {
          var s = h.mapScale / 2 * n,
            c = h.riverWidth * n;
          mapContext.fillStyle = "#dbc666";
          mapContext.fillRect(0, s - (c + h.riverPadding * n) / 2, mapDisplay.width, c + h.riverPadding * n);
          mapContext.fillStyle = "#91b2db";
          mapContext.fillRect(0, s - c / 2, mapDisplay.width, c);
        }
        mapContext.strokeStyle = "#fff";
        mapContext.lineWidth = 4;
        for (var l = 0; l < mapPings.length; ++l) (mapPing = mapPings[l]).update(mapContext, e);
        if (mapContext.globalAlpha = 1, mapContext.fillStyle = "#fff", renderCircle(j.x / h.mapScale * mapDisplay.width, j.y / h.mapScale * mapDisplay.height, 7, mapContext, true), mapContext.fillStyle = "rgba(255,255,255,0.35)", (j.team || h.isSandbox) && teammatePositions) for (l = 0; l < teammatePositions.length;) {
          renderCircle(teammatePositions[l] / h.mapScale * mapDisplay.width, teammatePositions[l + 1] / h.mapScale * mapDisplay.height, 7, mapContext, true);
          l += 2;
        }
        deathMarker && (mapContext.fillStyle = "#fc5553", mapContext.font = "34px Hammersmith One", mapContext.textBaseline = "middle", mapContext.textAlign = "center", mapContext.fillText("x", deathMarker.x / h.mapScale * mapDisplay.width, deathMarker.y / h.mapScale * mapDisplay.height));
        targetMarker && (mapContext.fillStyle = "#fff", mapContext.font = "34px Hammersmith One", mapContext.textBaseline = "middle", mapContext.textAlign = "center", mapContext.fillText("x", targetMarker.x / h.mapScale * mapDisplay.width, targetMarker.y / h.mapScale * mapDisplay.height));
      }
    }(C);
    -1 !== moveTouch.id && drawJoystick(moveTouch.startX, moveTouch.startY, moveTouch.currentX, moveTouch.currentY);
    -1 !== aimTouch.id && drawJoystick(aimTouch.startX, aimTouch.startY, aimTouch.currentX, aimTouch.currentY);
  }
  function drawJoystick(e, t, n, r) {
    mainContext.save();
    mainContext.setTransform(1, 0, 0, 1, 0, 0);
    mainContext.scale(D, D);
    var i = 50;
    mainContext.beginPath();
    mainContext.arc(e, t, i, 0, 2 * Math.PI, false);
    mainContext.closePath();
    mainContext.fillStyle = "rgba(255, 255, 255, 0.3)";
    mainContext.fill();
    i = 50;
    var a = n - e,
      o = r - t,
      s = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2)),
      c = s > i ? s / i : 1;
    a /= c;
    o /= c;
    mainContext.beginPath();
    mainContext.arc(e + a, t + o, .5 * i, 0, 2 * Math.PI, false);
    mainContext.closePath();
    mainContext.fillStyle = "white";
    mainContext.fill();
    mainContext.restore();
  }
  function renderProjectilesLayer(e, t, n) {
    for (var r = 0; r < q.length; ++r) (L = q[r]).active && L.layer == e && (L.update(C), L.active && isOnScreen(L.x - t, L.y - n, L.scale) && (mainContext.save(), mainContext.translate(L.x - t, L.y - n), mainContext.rotate(L.dir), renderProjectile(0, 0, L, mainContext, 1), mainContext.restore()));
  }
  var projImgCache = {};
  function renderProjectile(e, t, n, r, i) {
    if (n.src) {
      var a = p.projectiles[n.indx].src,
        o = projImgCache[a];
      o || ((o = new Image()).onload = function () {
        this.isLoaded = true;
      }, o.src = ".././img/weapons/" + a + ".png", projImgCache[a] = o);
      o.isLoaded && r.drawImage(o, e - n.scale / 2, t - n.scale / 2, n.scale, n.scale);
    } else 1 == n.indx && (r.fillStyle = "#939393", renderCircle(e, t, n.scale, r));
  }
  function renderRiver(e, t, n, r) {
    if (riverPoints && riverPoints.length >= 2) {
      var i = h.riverWidth + (r || 0);
      n.strokeStyle = n.fillStyle;
      n.lineWidth = i;
      n.lineCap = "round";
      n.beginPath();
      n.moveTo(riverPoints[0].x - e, riverPoints[0].y - t);
      for (var a = 1; a < riverPoints.length; a++) n.lineTo(riverPoints[a].x - e, riverPoints[a].y - t);
      n.stroke();
    } else {
      var o = h.riverWidth + (r || 0),
        s = h.mapScale / 2 - t - o / 2;
      s < maxScreenHeight && s + o > 0 && n.fillRect(0, s, maxScreenWidth, o);
    }
  }
  function renderLayer(e, t, n) {
    var r,
      i = J[e];
    if (i && i.length) for (var a = 0; a < i.length; ++a) {
      var o = i[a];
      L = o.obj;
      var s = o.x,
        c = o.y;
      if (mainContext.globalAlpha = L.hideFromEnemy ? .6 : 1, o.trunkOnly) {
        if (L.isItem && "sapling" === L.name) {
          var l = renderPlayer(L);
          mainContext.drawImage(l, s - l.width / 2, c - l.height / 2);
        } else if (!L.isItem && 0 === L.type) {
          l = renderSkin(L);
          mainContext.drawImage(l, s - l.width / 2, c - l.height / 2);
        }
      } else L.isItem ? (r = getItemSprite(L), mainContext.save(), mainContext.translate(s, c), mainContext.rotate(L.dir), mainContext.drawImage(r, -r.width / 2, -r.height / 2), L.blocker && (mainContext.strokeStyle = "#db6e6e", mainContext.globalAlpha = .3, mainContext.lineWidth = 6, renderCircle(0, 0, L.blocker, mainContext, false, true)), mainContext.restore()) : (r = getResSprite(L), mainContext.drawImage(r, s - r.width / 2, c - r.height / 2));
    }
  }
  function wiggleGameObject(e, t, n) {
    (L = Dr(e)) && L.startAnim(t, n);
  }
  function renderAILayer(e, t, n) {
    mainContext.globalAlpha = 1;
    for (var r = 0; r < F.length; ++r) (L = F[r]).zIndex == n && (L.animate(C), L.visible && (L.skinRot += .002 * C, lastSendDir = (L == j ? kn() : L.dir) + L.dirPlus, mainContext.save(), mainContext.translate(L.x - e, L.y - t), mainContext.rotate(lastSendDir), keyUp(L, mainContext), mainContext.restore()));
  }
  function keyUp(e, t) {
    (t = t || mainContext).lineWidth = 5.5;
    t.lineJoin = "miter";
    var n = Math.PI / 4 * (p.weapons[e.weaponIndex].armS || 1),
      r = e.buildIndex < 0 && p.weapons[e.weaponIndex].hndS || 1,
      i = e.buildIndex < 0 && p.weapons[e.weaponIndex].hndD || 1;
    if (e.tailIndex > 0 && function (e, t, n) {
      if (!(Zn = tr[e])) {
        var r = new Image();
        r.onload = function () {
          this.isLoaded = true;
          this.onload = null;
        };
        r.src = ".././img/accessories/access_" + e + ".png";
        tr[e] = r;
        Zn = r;
      }
      var i = renderBlob[e];
      if (!i) {
        for (var a = 0; a < accessoriesData.length; ++a) if (accessoriesData[a].id == e) {
          i = accessoriesData[a];
          break;
        }
        renderBlob[e] = i;
      }
      Zn.isLoaded && (t.save(), t.translate(-20 - (i.xOff || 0), 0), i.spin && t.rotate(n.skinRot), t.drawImage(Zn, -i.scale / 2, -i.scale / 2, i.scale, i.scale), t.restore());
    }(e.tailIndex, t, e), e.buildIndex < 0 && !p.weapons[e.weaponIndex].aboveHand && (ir(p.weapons[e.weaponIndex], h.weaponVariants[e.weaponVariant].src, e.scale, 0, t), null == p.weapons[e.weaponIndex].projectile || p.weapons[e.weaponIndex].hideProjectile || renderProjectile(e.scale, 0, p.projectiles[p.weapons[e.weaponIndex].projectile], mainContext)), t.fillStyle = h.skinColors[e.skinColor], renderCircle(e.scale * Math.cos(n), e.scale * Math.sin(n), 14), renderCircle(e.scale * i * Math.cos(-n * r), e.scale * i * Math.sin(-n * r), 14), e.buildIndex < 0 && p.weapons[e.weaponIndex].aboveHand && (ir(p.weapons[e.weaponIndex], h.weaponVariants[e.weaponVariant].src, e.scale, 0, t), null == p.weapons[e.weaponIndex].projectile || p.weapons[e.weaponIndex].hideProjectile || renderProjectile(e.scale, 0, p.projectiles[p.weapons[e.weaponIndex].projectile], mainContext)), e.buildIndex >= 0) {
      var a = getItemSprite(p.list[e.buildIndex]);
      t.drawImage(a, e.scale - p.list[e.buildIndex].holdOffset, -a.width / 2);
    }
    renderCircle(0, 0, e.scale, t);
    e.skinIndex > 0 && (t.rotate(Math.PI / 2), function e(t, n, r, i) {
      if (!(Zn = buyHat[t])) {
        var a = new Image();
        a.onload = function () {
          this.isLoaded = true;
          this.onload = null;
        };
        a.src = ".././img/hats/hat_" + t + ".png";
        buyHat[t] = a;
        Zn = a;
      }
      var o = r || buyAccessory[t];
      if (!o) {
        for (var s = 0; s < hatsData.length; ++s) if (hatsData[s].id == t) {
          o = hatsData[s];
          break;
        }
        buyAccessory[t] = o;
      }
      Zn.isLoaded && n.drawImage(Zn, -o.scale / 2, -o.scale / 2, o.scale, o.scale);
      !r && o.topSprite && (n.save(), n.rotate(i.skinRot), e(t + "_top", n, o, i), n.restore());
    }(e.skinIndex, t, null, e));
  }
  var Zn,
    buyHat = {},
    buyAccessory = {};
  var tr = {},
    renderBlob = {};
  var weaponImgCache = {};
  function ir(e, t, n, r, i) {
    var a = e.src + (t || ""),
      o = weaponImgCache[a];
    o || ((o = new Image()).onload = function () {
      this.isLoaded = true;
    }, o.src = ".././img/weapons/" + a + ".png", weaponImgCache[a] = o);
    o.isLoaded && i.drawImage(o, n + e.xOff - e.length / 2, r + e.yOff - e.width / 2, e.length, e.width);
  }
  var renderLeaf = {};
  function renderStar(e, t) {
    return biomeData.snow && u.pointInBiome(e, t, biomeData.snow) ? 1 : biomeData.desert && u.pointInBiome(e, t, biomeData.desert) ? 2 : 0;
  }
  function getResSprite(e) {
    var t = renderStar(e.x, e.y),
      n = e.type + "_" + e.scale + "_" + t,
      r = renderLeaf[n];
    if (!r) {
      var i = document.createElement("canvas");
      i.width = i.height = 2.1 * e.scale + 5.5;
      var a = i.getContext("2d");
      if (a.translate(i.width / 2, i.height / 2), a.rotate(u.randFloat(0, Math.PI)), a.strokeStyle = "#525252", a.lineWidth = 5.5, a.lineJoin = "round", a.lineCap = "round", 0 == e.type) for (var o, s = 0; s < 2; ++s) {
        renderNameTag(a, 7, o = L.scale * (s ? .5 : 1), .8 * o);
        a.fillStyle = t ? s ? "#fff" : "#e3f1f4" : s ? "#b4db62" : "#9ebf57";
        a.fill();
        s || a.stroke();
      } else if (1 == e.type) {
        if (2 == t) {
          a.fillStyle = "#606060";
          renderTail(a, 6, .3 * e.scale, .71 * e.scale);
          a.fill();
          a.stroke();
          a.fillStyle = "#89a54c";
          renderCircle(0, 0, .55 * e.scale, a);
          a.fillStyle = "#a5c65b";
          renderCircle(0, 0, .3 * e.scale, a, true);
        } else {
          var c;
          renderNameTag(a, 6, L.scale, .7 * L.scale);
          a.fillStyle = t ? "#e3f1f4" : "#89a54c";
          a.fill();
          a.stroke();
          a.fillStyle = t ? "#6a64af" : "#c15555";
          var l = I / 4;
          for (s = 0; s < 4; ++s) renderCircle((c = u.randInt(L.scale / 3.5, L.scale / 2.3)) * Math.cos(l * s), c * Math.sin(l * s), u.randInt(10, 12), a);
        }
      } else 2 != e.type && 3 != e.type || (a.fillStyle = 2 == e.type ? 2 == t ? "#938d77" : "#939393" : "#e0c655", renderTail(a, 3, e.scale, e.scale), a.fill(), a.stroke(), a.fillStyle = 2 == e.type ? 2 == t ? "#b2ab90" : "#bcbcbc" : "#ebdca3", renderTail(a, 3, .55 * e.scale, .65 * e.scale), a.fill());
      r = i;
      renderLeaf[n] = r;
    }
    return r;
  }
  var getObjSprite = [];
  function getItemSprite(e, t) {
    var n,
      r,
      i,
      a,
      o,
      s,
      c,
      l,
      f = getObjSprite[e.id];
    if (!f || t) {
      var h = document.createElement("canvas");
      h.width = h.height = 2.5 * e.scale + 5.5 + (p.list[e.id].spritePadding || 0);
      var d = h.getContext("2d");
      if (d.translate(h.width / 2, h.height / 2), d.rotate(t ? 0 : Math.PI / 2), d.strokeStyle = "#525252", d.lineWidth = 5.5 * (t ? h.width / 81 : 1), d.lineJoin = "round", d.lineCap = "round", "apple" == e.name) {
        d.fillStyle = "#c15555";
        renderCircle(0, 0, e.scale, d);
        d.fillStyle = "#89a54c";
        var g = -Math.PI / 2;
        n = e.scale * Math.cos(g);
        r = e.scale * Math.sin(g);
        i = 25;
        a = g + Math.PI / 2;
        o = d;
        s = n + i * Math.cos(a);
        c = r + i * Math.sin(a);
        l = .4 * i;
        o.moveTo(n, r);
        o.beginPath();
        o.quadraticCurveTo((n + s) / 2 + l * Math.cos(a + Math.PI / 2), (r + c) / 2 + l * Math.sin(a + Math.PI / 2), s, c);
        o.quadraticCurveTo((n + s) / 2 - l * Math.cos(a + Math.PI / 2), (r + c) / 2 - l * Math.sin(a + Math.PI / 2), n, r);
        o.closePath();
        o.fill();
        o.stroke();
      } else if ("cookie" == e.name) {
        d.fillStyle = "#cca861";
        renderCircle(0, 0, e.scale, d);
        d.fillStyle = "#937c4b";
        for (var m = I / (k = 4), y = 0; y < k; ++y) renderCircle((b = u.randInt(e.scale / 2.5, e.scale / 1.7)) * Math.cos(m * y), b * Math.sin(m * y), u.randInt(4, 5), d, true);
      } else if ("cheese" == e.name) {
        d.fillStyle = "#f4f3ac";
        renderCircle(0, 0, e.scale, d);
        d.fillStyle = "#c3c28b";
        var k, b;
        for (m = I / (k = 4), y = 0; y < k; ++y) renderCircle((b = u.randInt(e.scale / 2.5, e.scale / 1.7)) * Math.cos(m * y), b * Math.sin(m * y), u.randInt(4, 5), d, true);
      } else if ("wood wall" == e.name || "stone wall" == e.name || "castle wall" == e.name) {
        d.fillStyle = "castle wall" == e.name ? "#83898e" : "wood wall" == e.name ? "#a5974c" : "#939393";
        var v = "castle wall" == e.name ? 4 : 3;
        renderTail(d, v, 1.1 * e.scale, 1.1 * e.scale);
        d.fill();
        d.stroke();
        d.fillStyle = "castle wall" == e.name ? "#9da4aa" : "wood wall" == e.name ? "#c9b758" : "#bcbcbc";
        renderTail(d, v, .65 * e.scale, .65 * e.scale);
        d.fill();
      } else if ("spikes" == e.name || "greater spikes" == e.name || "poison spikes" == e.name || "spinning spikes" == e.name) {
        d.fillStyle = "poison spikes" == e.name ? "#7b935d" : "#939393";
        var w = .6 * e.scale;
        renderTail(d, "spikes" == e.name ? 5 : 6, e.scale, w);
        d.fill();
        d.stroke();
        d.fillStyle = "#a5974c";
        renderCircle(0, 0, w, d);
        d.fillStyle = "#c9b758";
        renderCircle(0, 0, w / 2, d, true);
      } else if ("windmill" == e.name || "faster windmill" == e.name || "power mill" == e.name) {
        d.fillStyle = "#a5974c";
        renderCircle(0, 0, e.scale, d);
        d.fillStyle = "#c9b758";
        renderHealthBar(0, 0, 1.5 * e.scale, 29, 4, d);
        d.fillStyle = "#a5974c";
        renderCircle(0, 0, .5 * e.scale, d);
      } else if ("mine" == e.name) {
        d.fillStyle = "#939393";
        renderTail(d, 3, e.scale, e.scale);
        d.fill();
        d.stroke();
        d.fillStyle = "#bcbcbc";
        renderTail(d, 3, .55 * e.scale, .65 * e.scale);
        d.fill();
      } else if ("sapling" == e.name) for (y = 0; y < 2; ++y) {
        renderTail(d, 7, w = e.scale * (y ? .5 : 1), .7 * w);
        d.fillStyle = y ? "#b4db62" : "#9ebf57";
        d.fill();
        y || d.stroke();
      } else if ("pit trap" == e.name) {
        d.fillStyle = "#a5974c";
        renderTail(d, 3, 1.1 * e.scale, 1.1 * e.scale);
        d.fill();
        d.stroke();
        d.fillStyle = "#525252";
        renderTail(d, 3, .65 * e.scale, .65 * e.scale);
        d.fill();
      } else if ("boost pad" == e.name) {
        d.fillStyle = "#7e7f82";
        renderTool(0, 0, 2 * e.scale, 2 * e.scale, d);
        d.fill();
        d.stroke();
        d.fillStyle = "#dbd97d";
        (function (e, t) {
          t = t || mainContext;
          var n = e * (Math.sqrt(3) / 2);
          t.beginPath();
          t.moveTo(0, -n / 2);
          t.lineTo(-e / 2, n / 2);
          t.lineTo(e / 2, n / 2);
          t.lineTo(0, -n / 2);
          t.fill();
          t.closePath();
        })(1 * e.scale, d);
      } else if ("turret" == e.name) {
        d.fillStyle = "#a5974c";
        renderCircle(0, 0, e.scale, d);
        d.fill();
        d.stroke();
        d.fillStyle = "#939393";
        renderTool(0, -25, .9 * e.scale, 50, d);
        renderCircle(0, 0, .6 * e.scale, d);
        d.fill();
        d.stroke();
      } else if ("platform" == e.name) {
        d.fillStyle = "#cebd5f";
        var x = 2 * e.scale,
          E = x / 4,
          S = -e.scale / 2;
        for (y = 0; y < 4; ++y) {
          renderTool(S - E / 2, 0, E, 2 * e.scale, d);
          d.fill();
          d.stroke();
          S += x / 4;
        }
      } else if ("healing pad" == e.name) {
        d.fillStyle = "#7e7f82";
        renderTool(0, 0, 2 * e.scale, 2 * e.scale, d);
        d.fill();
        d.stroke();
        d.fillStyle = "#db6e6e";
        renderHealthBar(0, 0, .65 * e.scale, 20, 4, d, true);
      } else if ("spawn pad" == e.name) {
        d.fillStyle = "#7e7f82";
        renderTool(0, 0, 2 * e.scale, 2 * e.scale, d);
        d.fill();
        d.stroke();
        d.fillStyle = "#71aad6";
        renderCircle(0, 0, .6 * e.scale, d);
      } else if ("blocker" == e.name) {
        d.fillStyle = "#7e7f82";
        renderCircle(0, 0, e.scale, d);
        d.fill();
        d.stroke();
        d.rotate(Math.PI / 4);
        d.fillStyle = "#db6e6e";
        renderHealthBar(0, 0, .65 * e.scale, 20, 4, d, true);
      } else if ("teleporter" == e.name) {
        d.fillStyle = "#7e7f82";
        renderCircle(0, 0, e.scale, d);
        d.fill();
        d.stroke();
        d.rotate(Math.PI / 4);
        d.fillStyle = "#d76edb";
        renderCircle(0, 0, .5 * e.scale, d, true);
      } else if ("bridge" == e.name || "greater bridge" == e.name) {
        d.fillStyle = "#a5974c";
        var P = 2 * e.scale,
          T = P / 5,
          A = -e.scale / 2;
        for (y = 0; y < 5; ++y) {
          renderTool(0, A - T / 2, P, T, d);
          d.fill();
          d.stroke();
          A += P / 5;
        }
        d.fillStyle = "#c9b758";
        renderTool(-.85 * e.scale, 0, 8, P, d);
        d.fill();
        renderTool(.85 * e.scale, 0, 8, P, d);
        d.fill();
      } else "wood roof" == e.name && (d.fillStyle = "#a5974c", renderTool(0, 0, 2 * e.scale, 2 * e.scale, d), d.fill(), d.stroke(), d.globalAlpha = .6, d.fillStyle = "#c9b758", renderTool(0, 0, 1.5 * e.scale, 1.5 * e.scale, d), d.fill(), d.stroke(), d.fillStyle = "#a5974c", renderTool(0, 0, .8 * e.scale, .8 * e.scale, d), d.fill());
      f = h;
      t || (getObjSprite[e.id] = f);
    }
    return f;
  }
  var ur = {};
  function renderSkin(e) {
    var t = renderStar(e.x, e.y),
      n = "trunk_" + e.type + "_" + e.scale + "_" + t,
      r = ur[n];
    if (!r) {
      var i = .3 * e.scale,
        a = document.createElement("canvas");
      a.width = a.height = 2.1 * i + 5.5;
      var o = a.getContext("2d");
      o.translate(a.width / 2, a.height / 2);
      o.strokeStyle = "#525252";
      o.lineWidth = 5.5;
      o.lineJoin = "round";
      o.lineCap = "round";
      o.fillStyle = 2 == t ? "#606060" : "#a5974c";
      renderCircle(0, 0, i, o);
      r = a;
      ur[n] = r;
    }
    return r;
  }
  var getItemSpriteIcon = {};
  function renderPlayer(e) {
    var t = "sapling_trunk_" + e.id + "_" + e.scale,
      n = getItemSpriteIcon[t];
    if (!n) {
      var r = e.scale * e.colDiv,
        i = document.createElement("canvas");
      i.width = i.height = 2.1 * r + 5.5;
      var a = i.getContext("2d");
      a.translate(i.width / 2, i.height / 2);
      a.strokeStyle = "#525252";
      a.lineWidth = 5.5;
      a.lineJoin = "round";
      a.lineCap = "round";
      a.fillStyle = "#a5974c";
      renderCircle(0, 0, r, a);
      n = i;
      getItemSpriteIcon[t] = n;
    }
    return n;
  }
  function renderCircle(e, t, n, r, i, a) {
    (r = r || mainContext).beginPath();
    r.arc(e, t, n, 0, 2 * Math.PI);
    a || r.fill();
    i || r.stroke();
  }
  function renderTail(e, t, n, r) {
    var i,
      a,
      o = Math.PI / 2 * 3,
      s = Math.PI / t;
    if (e.beginPath(), Math.abs(r - n) < .001) {
      e.moveTo(Math.cos(o) * n, Math.sin(o) * n);
      for (var c = 0; c < 2 * t; c++) {
        o += s;
        i = Math.cos(o) * n;
        a = Math.sin(o) * n;
        e.lineTo(i, a);
      }
      e.closePath();
    } else {
      e.moveTo(0, -n);
      for (c = 0; c < t; c++) {
        i = Math.cos(o) * n;
        a = Math.sin(o) * n;
        e.lineTo(i, a);
        o += s;
        i = Math.cos(o) * r;
        a = Math.sin(o) * r;
        e.lineTo(i, a);
        o += s;
      }
      e.lineTo(0, -n);
      e.closePath();
    }
  }
  function renderTool(e, t, n, r, i, a) {
    i.fillRect(e - n / 2, t - r / 2, n, r);
    a || i.strokeRect(e - n / 2, t - r / 2, n, r);
  }
  function renderHealthBar(e, t, n, r, i, a, o) {
    a.save();
    a.translate(e, t);
    i = Math.ceil(i / 2);
    for (var s = 0; s < i; s++) {
      renderTool(0, 0, 2 * n, r, a, o);
      a.rotate(Math.PI / i);
    }
    a.restore();
  }
  function renderNameTag(e, t, n, r) {
    var i,
      a = Math.PI / 2 * 3,
      o = Math.PI / t;
    e.beginPath();
    e.moveTo(0, -r);
    for (var s = 0; s < t; s++) {
      i = u.randInt(n + .9, 1.2 * n);
      e.quadraticCurveTo(Math.cos(a + o) * i, Math.sin(a + o) * i, Math.cos(a + 2 * o) * r, Math.sin(a + 2 * o) * r);
      a += 2 * o;
    }
    e.lineTo(0, -r);
    e.closePath();
  }
  function loadAI(e) {
    for (var t = 0; t < e.length;) {
      var n = projManager.add(e[t], e[t + 1], e[t + 2], e[t + 3], e[t + 4], e[t + 5], p.list[e[t + 6]], true, e[t + 7] >= 0 ? {
          sid: e[t + 7]
        } : null),
        r = e[t + 8],
        i = e[t + 9];
      n && (r > 0 && (n.zIndex = r), n.onBridge = i, n.renderLayer = K(n));
      t += 10;
    }
  }
  function shootTurret(e, t) {
    (L = Yr(t)) && (L.xWiggle += h.gatherWiggle * Math.cos(e), L.yWiggle += h.gatherWiggle * Math.sin(e));
  }
  function updatePlayerValue(e, t) {
    (L = Yr(e)) && (L.dir = t, L.xWiggle += h.gatherWiggle * Math.cos(t + Math.PI), L.yWiggle += h.gatherWiggle * Math.sin(t + Math.PI));
  }
  function handleAllianceAction(e, t, n, r, i, a, o, s) {
    windowFocused && (N.addProjectile(e, t, n, r, i, a, null, null, o).sid = s);
  }
  function setPlayerTeam(e, t) {
    for (var n = 0; n < q.length; ++n) q[n].sid == e && (q[n].range = t);
  }
  function gatherAnimation(e) {
    (L = zr(e)) && L.startAnim();
  }
  function animateAI(e) {
    for (var t = 0; t < Y.length; ++t) {
      Y[t].forcePos = !Y[t].visible;
      Y[t].visible = false;
    }
    if (e) {
      var n = Date.now();
      for (t = 0; t < e.length; t += 8) (L = zr(e[t])) ? (L.index = e[t + 1], L.t1 = undefined === L.t2 ? n : L.t2, L.t2 = n, L.x1 = L.x, L.y1 = L.y, L.x2 = e[t + 2], L.y2 = e[t + 3], L.d1 = undefined === L.d2 ? e[t + 4] : L.d2, L.d2 = e[t + 4], L.health = e[t + 5], L.zIndex = e[t + 7], L.notificationDisplay = 0, L.visible = true) : ((L = G.spawn(e[t + 2], e[t + 3], e[t + 4], e[t + 1])).x2 = L.x, L.y2 = L.y, L.d2 = L.dir, L.health = e[t + 5], G.aiTypes[e[t + 1]].name || (L.name = h.cowNames[e[t + 6]]), L.zIndex = e[t + 7], L.forcePos = true, L.sid = e[t], L.visible = true);
    }
  }
  var removePlayerObj = {};
  function updatePlayer(e, t) {
    var n = e.index,
      r = removePlayerObj[n];
    if (!r) {
      var i = new Image();
      i.onload = function () {
        this.isLoaded = true;
        this.onload = null;
      };
      i.src = ".././img/animals/" + e.src + ".png";
      r = i;
      removePlayerObj[n] = r;
    }
    if (r.isLoaded) {
      var a = 1.2 * e.scale * (e.spriteMlt || 1);
      t.drawImage(r, -a, -a, 2 * a, 2 * a);
    }
  }
  function renderPlayersLayer(e, t, n) {
    mainContext.globalAlpha = 1;
    for (var r = 0; r < Y.length; ++r) (L = Y[r]).zIndex == n && (L.animate(C), L.active && L.visible && (mainContext.save(), mainContext.translate(L.x - e, L.y - t), mainContext.rotate(L.dir + L.dirPlus - Math.PI / 2), updatePlayer(L, mainContext), mainContext.restore()));
  }
  function addPlayerObj(e, t, n) {
    if (10 != e.skinIndex || e == j || e.team && e.team == j.team) {
      var r = (e.team ? "[" + e.team + "] " : "") + (e.name || "");
      if ("" != r) {
        if (mainContext.font = (e.nameScale || 30) + "px Hammersmith One", mainContext.fillStyle = "#fff", mainContext.textBaseline = "middle", mainContext.textAlign = "center", mainContext.lineWidth = e.nameScale ? 11 : 8, mainContext.lineJoin = "round", mainContext.strokeText(r, e.x - t, e.y - n - e.scale - h.nameY), mainContext.fillText(r, e.x - t, e.y - n - e.scale - h.nameY), e.isLeader && iconCache.crown.isLoaded) {
          var i = h.crownIconScale,
            a = e.x - t - i / 2 - mainContext.measureText(r).width / 2 - h.crownPad;
          mainContext.drawImage(iconCache.crown, a, e.y - n - e.scale - h.nameY - i / 2 - 5, i, i);
        }
        if (1 == e.iconIndex && iconCache.skull.isLoaded) {
          i = h.crownIconScale;
          a = e.x - t - i / 2 + mainContext.measureText(r).width / 2 + h.crownPad;
          mainContext.drawImage(iconCache.skull, a, e.y - n - e.scale - h.nameY - i / 2 - 5, i, i);
        }
      }
      e.health > 0 && (mainContext.fillStyle = "#3d3f42", mainContext.roundRect(e.x - t - h.healthBarWidth - h.healthBarPad, e.y - n + e.scale + h.nameY, 2 * h.healthBarWidth + 2 * h.healthBarPad, 17, 8), mainContext.fill(), mainContext.fillStyle = e == j || e.team && e.team == j.team ? "#8ecc51" : "#cc5151", mainContext.roundRect(e.x - t - h.healthBarWidth, e.y - n + e.scale + h.nameY + h.healthBarPad, 2 * h.healthBarWidth * (e.health / e.maxHealth), 17 - 2 * h.healthBarPad, 7), mainContext.fill());
    }
  }
  function renderDeadPlayers(e, t, n) {
    mainContext.strokeStyle = "#3d3f42";
    for (var r = 0; r < F.length + Y.length; ++r) (L = F[r] || Y[r - F.length]).visible && L.zIndex == n && addPlayerObj(L, e, t);
  }
  function isOnScreen(e, t, n) {
    return e + n >= 0 && e - n <= maxScreenWidth && t + n >= 0 && t - n <= maxScreenHeight;
  }
  function updatePlayers(e, t) {
    var n = function (e) {
      for (var t = 0; t < F.length; ++t) if (F[t].id == e) return F[t];
      return null;
    }(e[0]);
    n || (n = new m(e[0], e[1], h, u, N, projManager, F, Y, p, hatsData, accessoriesData), F.push(n));
    n.spawn(t ? M : null);
    n.visible = false;
    n.x2 = undefined;
    n.y2 = undefined;
    n.setData(e);
    t && (j = n, renderGame.length = 0, ei = 0, true, ni(Date.now()), gridOffsetX = j.x, gridOffsetY = j.y, setAlliancePlayers(), jn(), updateAge(), updateUpgrades(0), gameUI.style.display = "block");
  }
  function removePlayer(e) {
    for (var t = 0; t < F.length; t++) if (F[t].id == e) {
      F.splice(t, 1);
      break;
    }
  }
  function handleProjectile(e, t) {
    j && (j.itemCounts[e] = t);
  }
  function updateHealth(e, t, n) {
    j && (j[e] = t, n && jn());
  }
  function killObject(e, t) {
    (L = Dr(e)) && (L.health = t);
  }
  function updateLeaderboard(e) {
    for (var t = Date.now(), n = 0; n < F.length; ++n) {
      F[n].forcePos = !F[n].visible;
      F[n].visible = false;
    }
    for (n = 0; n < e.length; n += 13) (L = Dr(e[n])) && (L.t1 = undefined === L.t2 ? t : L.t2, L.t2 = t, L.x1 = L.x, L.y1 = L.y, L.x2 = e[n + 1], L.y2 = e[n + 2], L.d1 = undefined === L.d2 ? e[n + 3] : L.d2, L.d2 = e[n + 3], L.notificationDisplay = 0, L.buildIndex = e[n + 4], L.weaponIndex = e[n + 5], L.weaponVariant = e[n + 6], L.team = e[n + 7], L.isLeader = e[n + 8], L.skinIndex = e[n + 9], L.tailIndex = e[n + 10], L.iconIndex = e[n + 11], L.zIndex = e[n + 12], L.visible = true);
  }
  function Dr(e) {
    for (var t = 0; t < F.length; ++t) if (F[t].sid == e) return F[t];
    return null;
  }
  function zr(e) {
    for (var t = 0; t < Y.length; ++t) if (Y[t].sid == e) return Y[t];
    return null;
  }
  function Yr(e) {
    for (var t = 0; t < W.length; ++t) if (W[t].sid == e) return W[t];
    return null;
  }
  var mapCenter,
    Hr = -1,
    fpsCount = 0,
    qr = Date.now(),
    gameLoop = 0,
    requestAnimFrame = 0,
    Vr = Date.now(),
    perfDisplay = null,
    pingValueEl = null,
    cpsValueEl = null,
    fpsValueEl = null,
    packetValueEl = null,
    renderGame = [],
    ei = 0;
  function updatePerfDisplay() {
    perfDisplay && (perfDisplay.style.display = B ? "flex" : "none");
  }
  function ni(e) {
    !function (e) {
      for (var t = e - 1e3; renderGame.length && renderGame[0] < t;) renderGame.shift();
    }(e);
    ei = renderGame.length;
    cpsValueEl && (cpsValueEl.textContent = Math.max(0, Math.round(ei)).toString());
  }
  function setInitData() {
    var e = Date.now() - Hr;
    window.pingTime = e;
    pingValueEl && (pingValueEl.textContent = e + "ms");
    true;
  }
  function pingSocket() {
    Hr = Date.now();
    l.send("0");
  }
  function serverShutdownNotice(e) {
    if (!(e < 0)) {
      var t = Math.floor(e / 60),
        n = e % 60;
      n = ("0" + n).slice(-2);
      shutdownDisplay.innerText = "Server restarting in " + t + ":" + n;
      shutdownDisplay.hidden = false;
    }
  }
  window.requestAnimationFrame = window.requestAnimationFrame || function (e) {
    window.setTimeout(e, 1e3 / 60);
  };
  mapCenter = h.mapScale / 2;
  projManager.add(0, mapCenter, mapCenter + 200, 0, h.treeScales[3], 0);
  projManager.add(1, mapCenter, mapCenter - 480, 0, h.treeScales[3], 0);
  projManager.add(2, mapCenter + 300, mapCenter + 450, 0, h.treeScales[3], 0);
  projManager.add(3, mapCenter - 950, mapCenter - 130, 0, h.treeScales[2], 0);
  projManager.add(4, mapCenter - 750, mapCenter - 400, 0, h.treeScales[3], 0);
  projManager.add(5, mapCenter - 700, mapCenter + 400, 0, h.treeScales[2], 0);
  projManager.add(6, mapCenter + 800, mapCenter - 200, 0, h.treeScales[3], 0);
  projManager.add(7, mapCenter - 260, mapCenter + 340, 0, h.bushScales[3], 1);
  projManager.add(8, mapCenter + 760, mapCenter + 310, 0, h.bushScales[3], 1);
  projManager.add(9, mapCenter - 800, mapCenter + 100, 0, h.bushScales[3], 1);
  projManager.add(10, mapCenter - 800, mapCenter + 300, 0, p.list[4].scale, p.list[4].id, p.list[10]);
  projManager.add(11, mapCenter + 650, mapCenter - 390, 0, p.list[4].scale, p.list[4].id, p.list[10]);
  projManager.add(12, mapCenter - 400, mapCenter - 450, 0, h.rockScales[2], 2);
  (function e() {
    R = Date.now();
    C = R - z;
    z = R;
    updateGame();
    (function () {
      if (perfDisplay) {
        fpsCount++;
        var e = Date.now();
        e - qr >= 1e3 && (fpsValueEl && (fpsValueEl.textContent = fpsCount), fpsCount = 0, qr = e);
        e - Vr >= 1e3 && (requestAnimFrame = gameLoop, gameLoop = 0, Vr = e, packetValueEl && (packetValueEl.textContent = requestAnimFrame + "/s"));
        ni(e);
      }
    })();
    window.requestAnimationFrame(e);
  })();
  window.openLink = function (e) {
    window.open(e, "_blank");
  };
  window.aJoinReq = handleAllianceReq;
  window.follmoo = function () {
    M || (M = true, P("moofoll", 1));
  };
  window.kickFromClan = zt;
  window.sendJoin = Yt;
  window.leaveAlliance = Ht;
  window.createAlliance = Ft;
  window.storeBuy = Qt;
  window.storeEquip = Zt;
  window.showItemInfo = showItemInfo;
  window.selectSkinColor = function (e) {
    skinColor = e;
    resizeGame();
  };
  window.changeStoreIndex = function (e) {
    Gt != e && (Gt = e, updateAllianceUI());
    renderAllianceList();
  };
  window.incrementPacketCounter = function () {
    gameLoop++;
  };
  window.config = h;
}, function (e, t) {
  function n(e) {
    return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }
  !function (e, t, r) {
    function i(e, t) {
      return n(e) === t;
    }
    var a = [],
      o = [],
      s = {
        _version: "3.5.0",
        _config: {
          classPrefix: "",
          enableClasses: true,
          enableJSClass: true,
          usePrefixes: true
        },
        _q: [],
        on: function (e, t) {
          var n = this;
          setTimeout(function () {
            t(n[e]);
          }, 0);
        },
        addTest: function (e, t, n) {
          o.push({
            name: e,
            fn: t,
            options: n
          });
        },
        addAsyncTest: function (e) {
          o.push({
            name: null,
            fn: e
          });
        }
      },
      c = function () {};
    c.prototype = s;
    c = new c();
    var l = t.documentElement,
      u = "svg" === l.nodeName.toLowerCase();
    c.addTest("passiveeventlisteners", function () {
      var t = false;
      try {
        var n = Object.defineProperty({}, "passive", {
          get: function () {
            t = true;
          }
        });
        e.addEventListener("test", null, n);
      } catch (e) {}
      return t;
    });
    (function () {
      var e, t, n, r, s, l;
      for (var u in o) if (o.hasOwnProperty(u)) {
        if (e = [], (t = o[u]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
        for (r = i(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) {
          1 === (l = e[s].split(".")).length ? c[l[0]] = r : (!c[l[0]] || c[l[0]] instanceof Boolean || (c[l[0]] = new Boolean(c[l[0]])), c[l[0]][l[1]] = r);
          a.push((r ? "" : "no-") + l.join("-"));
        }
      }
    })();
    (function (e) {
      var t = l.className,
        n = c._config.classPrefix || "";
      if (u && (t = t.baseVal), c._config.enableJSClass) {
        var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
        t = t.replace(r, "$1" + n + "js$2");
      }
      c._config.enableClasses && (t += " " + n + e.join(" " + n), u ? l.className.baseVal = t : l.className = t);
    })(a);
    delete s.addTest;
    delete s.addAsyncTest;
    for (var f = 0; f < c._q.length; f++) c._q[f]();
    e.Modernizr = c;
  }(window, document);
}, function (e, t, n) {
  var r = n(22),
    i = function () {};
  function a() {
    this.socket = null;
    this.connected = false;
    this.socketId = -1;
    this._callback = i;
    this._handlers = Object.create(null);
    this._suppressCloseNotification = false;
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleMessage = this._handleMessage.bind(this);
  }
  a.prototype.connect = function (e, t, n) {
    if (!e) throw new Error("connect(address) requires a WebSocket address.");
    this._callback = "function" == typeof t ? t : i;
    this._handlers = this._normalizeHandlers(n);
    this._suppressCloseNotification = false;
    this.socket && this.close();
    try {
      this.socket = new WebSocket(e);
    } catch (e) {
      return console.error("Socket creation failed:", e), void this._notifyCallback(e || "Socket error");
    }
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this._handleOpen;
    this.socket.onclose = this._handleClose;
    this.socket.onerror = this._handleError;
    this.socket.onmessage = this._handleMessage;
  };
  a.prototype.send = function (e) {
    if (this.socketReady()) {
      var t = Array.prototype.slice.call(arguments, 1);
      try {
        var n = r.encode([e, t]);
        this.socket.send(n);
      } catch (e) {
        return void console.error("Failed to send packet:", e);
      }
      "undefined" != typeof window && "function" == typeof window.incrementPacketCounter && window.incrementPacketCounter();
    } else console.warn("Attempted to send packet before socket was ready:", e);
  };
  a.prototype.socketReady = function () {
    return Boolean(this.socket && this.connected);
  };
  a.prototype.close = function () {
    this.socket ? this.socket.close() : this.connected = false;
  };
  a.prototype._handleOpen = function () {
    this.connected = true;
    this._notifyCallback();
  };
  a.prototype._handleClose = function (e) {
    var t;
    this.connected = false;
    this.socketId = -1;
    var n = this._suppressCloseNotification;
    this._suppressCloseNotification = false;
    t = e && 4001 === e.code ? "Invalid Connection" : e && e.reason ? e.reason : "disconnected";
    n || this._notifyCallback(t);
    this._detachSocket();
  };
  a.prototype._handleError = function (e) {
    this._suppressCloseNotification = true;
    console.error("Socket error:", e);
    this._notifyCallback("Socket error");
  };
  a.prototype._handleMessage = function (e) {
    var t, n;
    try {
      t = new Uint8Array(e.data);
    } catch (e) {
      return void console.warn("Invalid socket payload:", e);
    }
    try {
      n = r.decode(t);
    } catch (e) {
      return void console.warn("Failed to decode socket payload:", e);
    }
    var i = n && n[0],
      a = n && n[1];
    if ("io-init" !== i) {
      var o = this._handlers[i];
      if (o) {
        var s = Array.isArray(a) ? a : [a];
        try {
          o.apply(undefined, s);
        } catch (e) {
          console.error("Handler for packet type '" + i + "' failed:", e);
        }
      } else console.warn("Unhandled packet type:", i);
    } else this.socketId = Array.isArray(a) ? a[0] : a;
  };
  a.prototype._normalizeHandlers = function (e) {
    var t = Object.create(null);
    if (!e) return t;
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && ("function" == typeof e[n] ? t[n] = e[n] : console.warn("Ignoring non-function handler for packet type:", n));
    return t;
  };
  a.prototype._notifyCallback = function (e) {
    try {
      this._callback(e);
    } catch (e) {
      console.error("Socket callback failed:", e);
    }
  };
  a.prototype._detachSocket = function () {
    this.socket && (this.socket.onopen = null, this.socket.onclose = null, this.socket.onerror = null, this.socket.onmessage = null, this.socket = null);
  };
  e.exports = new a();
  e.exports.IoClient = a;
}, function (e, t, n) {
  t.encode = n(10).encode;
  t.decode = n(15).decode;
  t.Encoder = n(35).Encoder;
  t.Decoder = n(36).Decoder;
  t.createCodec = n(37).createCodec;
  t.codec = n(38).codec;
}, function (e, t, n) {
  (function (t) {
    function n(e) {
      return e && e.isBuffer && e;
    }
    e.exports = n(undefined !== t && t) || n(this.Buffer) || n("undefined" != typeof window && window.Buffer) || this.Buffer;
  }).call(this, n(12).Buffer);
}, function (e, t) {
  var n;
  n = function () {
    return this;
  }();
  try {
    n = n || new Function("return this")();
  } catch (e) {
    "object" == typeof window && (n = window);
  }
  e.exports = n;
}, function (e, t, n) {
  "use strict";

  t.byteLength = function (e) {
    var t = l(e),
      n = t[0],
      r = t[1];
    return 3 * (n + r) / 4 - r;
  };
  t.toByteArray = function (e) {
    var t,
      n,
      r = l(e),
      o = r[0],
      s = r[1],
      c = new a(function (e, t, n) {
        return 3 * (t + n) / 4 - n;
      }(0, o, s)),
      u = 0,
      f = s > 0 ? o - 4 : o;
    for (n = 0; n < f; n += 4) {
      t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)];
      c[u++] = t >> 16 & 255;
      c[u++] = t >> 8 & 255;
      c[u++] = 255 & t;
    }
    2 === s && (t = i[e.charCodeAt(n)] << 2 | i[e.charCodeAt(n + 1)] >> 4, c[u++] = 255 & t);
    1 === s && (t = i[e.charCodeAt(n)] << 10 | i[e.charCodeAt(n + 1)] << 4 | i[e.charCodeAt(n + 2)] >> 2, c[u++] = t >> 8 & 255, c[u++] = 255 & t);
    return c;
  };
  t.fromByteArray = function (e) {
    for (var t, n = e.length, i = n % 3, a = [], o = 0, s = n - i; o < s; o += 16383) a.push(u(e, o, o + 16383 > s ? s : o + 16383));
    1 === i ? (t = e[n - 1], a.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], a.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
    return a.join("");
  };
  for (var r = [], i = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = o.length; s < c; ++s) {
    r[s] = o[s];
    i[o.charCodeAt(s)] = s;
  }
  function l(e) {
    var t = e.length;
    if (t % 4 > 0) throw new Error("Invalid string. Length must tempCanvas2 a multiple of 4");
    var n = e.indexOf("=");
    return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4];
  }
  function u(e, t, n) {
    for (var i, a, o = [], s = t; s < n; s += 3) {
      i = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]);
      o.push(r[(a = i) >> 18 & 63] + r[a >> 12 & 63] + r[a >> 6 & 63] + r[63 & a]);
    }
    return o.join("");
  }
  i["-".charCodeAt(0)] = 62;
  i["_".charCodeAt(0)] = 63;
}, function (e, t, n) {
  var r = n(1);
  function i(e) {
    return new Array(e);
  }
  (t = e.exports = i(0)).alloc = i;
  t.concat = r.concat;
  t.from = function (e) {
    if (!r.isBuffer(e) && r.isView(e)) e = r.Uint8Array.from(e);else if (r.isArrayBuffer(e)) e = new Uint8Array(e);else {
      if ("string" == typeof e) return r.from.call(t, e);
      if ("number" == typeof e) throw new TypeError('"value" argument must not tempCanvas2 a number');
    }
    return Array.prototype.slice.call(e);
  };
}, function (e, t, n) {
  var r = n(1),
    i = r.global;
  function a(e) {
    return new i(e);
  }
  (t = e.exports = r.hasBuffer ? a(0) : []).alloc = r.hasBuffer && i.alloc || a;
  t.concat = r.concat;
  t.from = function (e) {
    if (!r.isBuffer(e) && r.isView(e)) e = r.Uint8Array.from(e);else if (r.isArrayBuffer(e)) e = new Uint8Array(e);else {
      if ("string" == typeof e) return r.from.call(t, e);
      if ("number" == typeof e) throw new TypeError('"value" argument must not tempCanvas2 a number');
    }
    return i.from && 1 !== i.from.length ? i.from(e) : new i(e);
  };
}, function (e, t, n) {
  var r = n(1);
  function i(e) {
    return new Uint8Array(e);
  }
  (t = e.exports = r.hasArrayBuffer ? i(0) : []).alloc = i;
  t.concat = r.concat;
  t.from = function (e) {
    if (r.isView(e)) {
      var n = e.byteOffset,
        i = e.byteLength;
      (e = e.buffer).byteLength !== i && (e.slice ? e = e.slice(n, n + i) : (e = new Uint8Array(e)).byteLength !== i && (e = Array.prototype.slice.call(e, n, n + i)));
    } else {
      if ("string" == typeof e) return r.from.call(t, e);
      if ("number" == typeof e) throw new TypeError('"value" argument must not tempCanvas2 a number');
    }
    return new Uint8Array(e);
  };
}, function (e, t) {
  t.copy = function (e, t, n, r) {
    var i;
    n || (n = 0);
    r || 0 === r || (r = this.length);
    t || (t = 0);
    var a = r - n;
    if (e === this && n < t && t < r) for (i = a - 1; i >= 0; i--) e[i + t] = this[i + n];else for (i = 0; i < a; i++) e[i + t] = this[i + n];
    return a;
  };
  t.toString = function (e, t, n) {
    var r = 0 | t;
    n || (n = this.length);
    var i = "",
      a = 0;
    for (; r < n;) (a = this[r++]) < 128 ? i += String.fromCharCode(a) : (192 == (224 & a) ? a = (31 & a) << 6 | 63 & this[r++] : 224 == (240 & a) ? a = (15 & a) << 12 | (63 & this[r++]) << 6 | 63 & this[r++] : 240 == (248 & a) && (a = (7 & a) << 18 | (63 & this[r++]) << 12 | (63 & this[r++]) << 6 | 63 & this[r++]), a >= 65536 ? (a -= 65536, i += String.fromCharCode(55296 + (a >>> 10), 56320 + (1023 & a))) : i += String.fromCharCode(a));
    return i;
  };
  t.write = function (e, t) {
    var n = t || (t |= 0),
      r = e.length,
      i = 0,
      a = 0;
    for (; a < r;) (i = e.charCodeAt(a++)) < 128 ? this[n++] = i : i < 2048 ? (this[n++] = 192 | i >>> 6, this[n++] = 128 | 63 & i) : i < 55296 || i > 57343 ? (this[n++] = 224 | i >>> 12, this[n++] = 128 | i >>> 6 & 63, this[n++] = 128 | 63 & i) : (i = 65536 + (i - 55296 << 10 | e.charCodeAt(a++) - 56320), this[n++] = 240 | i >>> 18, this[n++] = 128 | i >>> 12 & 63, this[n++] = 128 | i >>> 6 & 63, this[n++] = 128 | 63 & i);
    return n - t;
  };
}, function (e, t, n) {
  t.setExtPackers = function (e) {
    e.addExtPacker(14, Error, [f, c]);
    e.addExtPacker(1, EvalError, [f, c]);
    e.addExtPacker(2, RangeError, [f, c]);
    e.addExtPacker(3, ReferenceError, [f, c]);
    e.addExtPacker(4, SyntaxError, [f, c]);
    e.addExtPacker(5, TypeError, [f, c]);
    e.addExtPacker(6, URIError, [f, c]);
    e.addExtPacker(10, RegExp, [u, c]);
    e.addExtPacker(11, Boolean, [l, c]);
    e.addExtPacker(12, String, [l, c]);
    e.addExtPacker(13, Date, [Number, c]);
    e.addExtPacker(15, Number, [l, c]);
    "undefined" != typeof Uint8Array && (e.addExtPacker(17, Int8Array, o), e.addExtPacker(18, Uint8Array, o), e.addExtPacker(19, Int16Array, o), e.addExtPacker(20, Uint16Array, o), e.addExtPacker(21, Int32Array, o), e.addExtPacker(22, Uint32Array, o), e.addExtPacker(23, Float32Array, o), "undefined" != typeof Float64Array && e.addExtPacker(24, Float64Array, o), "undefined" != typeof Uint8ClampedArray && e.addExtPacker(25, Uint8ClampedArray, o), e.addExtPacker(26, ArrayBuffer, o), e.addExtPacker(29, DataView, o));
    i.hasBuffer && e.addExtPacker(27, a, i.from);
  };
  var r,
    i = n(1),
    a = i.global,
    o = i.Uint8Array.from,
    s = {
      name: 1,
      message: 1,
      stack: 1,
      columnNumber: 1,
      fileName: 1,
      lineNumber: 1
    };
  function c(e) {
    return r || (r = n(10).encode), r(e);
  }
  function l(e) {
    return e.valueOf();
  }
  function u(e) {
    (e = RegExp.prototype.toString.call(e).split("/")).shift();
    var t = [e.pop()];
    return t.unshift(e.join("/")), t;
  }
  function f(e) {
    var t = {};
    for (var n in s) t[n] = e[n];
    return t;
  }
}, function (e, t, n) {
  var r = n(2),
    i = n(8),
    a = i.Uint64BE,
    o = i.Int64BE,
    s = n(1),
    c = n(7),
    l = n(32),
    u = n(13).uint8,
    f = n(5).ExtBuffer,
    h = "undefined" != typeof Uint8Array,
    d = "undefined" != typeof Map,
    p = [];
  p[1] = 212;
  p[2] = 213;
  p[4] = 214;
  p[8] = 215;
  p[16] = 216;
  t.getWriteType = function (e) {
    var t = l.getWriteToken(e),
      n = e && e.useraw,
      i = h && e && e.binarraybuffer,
      g = i ? s.isArrayBuffer : s.isBuffer,
      m = i ? function (e, t) {
        w(e, new Uint8Array(t));
      } : w,
      y = d && e && e.usemap ? function (e, n) {
        if (!(n instanceof Map)) return x(e, n);
        var r = n.size;
        t[r < 16 ? 128 + r : r <= 65535 ? 222 : 223](e, r);
        var i = e.codec.encode;
        n.forEach(function (t, n, r) {
          i(e, n);
          i(e, t);
        });
      } : x;
    return {
      boolean: function (e, n) {
        t[n ? 195 : 194](e, n);
      },
      function: v,
      number: function (e, n) {
        var r,
          i = 0 | n;
        if (n !== i) return void t[r = 203](e, n);
        r = -32 <= i && i <= 127 ? 255 & i : 0 <= i ? i <= 255 ? 204 : i <= 65535 ? 205 : 206 : -128 <= i ? 208 : -32768 <= i ? 209 : 210;
        t[r](e, i);
      },
      object: n ? function (e, n) {
        if (g(n)) return function (e, n) {
          var r = n.length;
          t[r < 32 ? 160 + r : r <= 65535 ? 218 : 219](e, r);
          e.send(n);
        }(e, n);
        b(e, n);
      } : b,
      string: (k = n ? function (e) {
        return e < 32 ? 1 : e <= 65535 ? 3 : 5;
      } : function (e) {
        return e < 32 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5;
      }, function (e, n) {
        var r = n.length,
          i = 5 + 3 * r;
        e.offset = e.reserve(i);
        var a = e.buffer,
          o = k(r),
          s = e.offset + o;
        r = c.write.call(a, n, s);
        var l = k(r);
        if (o !== l) {
          var u = s + l - o,
            f = s + r;
          c.copy.call(a, a, u, s, f);
        }
        t[1 === l ? 160 + r : l <= 3 ? 215 + l : 219](e, r);
        e.offset += r;
      }),
      symbol: v,
      undefined: v
    };
    var k;
    function b(e, n) {
      if (null === n) return v(e, n);
      if (g(n)) return m(e, n);
      if (r(n)) return function (e, n) {
        var r = n.length;
        t[r < 16 ? 144 + r : r <= 65535 ? 220 : 221](e, r);
        for (var i = e.codec.encode, a = 0; a < r; a++) i(e, n[a]);
      }(e, n);
      if (a.isUint64BE(n)) return function (e, n) {
        t[207](e, n.toArray());
      }(e, n);
      if (o.isInt64BE(n)) return function (e, n) {
        t[211](e, n.toArray());
      }(e, n);
      var i = e.codec.getExtPacker(n);
      if (i && (n = i(n)), n instanceof f) return function (e, n) {
        var r = n.buffer,
          i = r.length,
          a = p[i] || (i < 255 ? 199 : i <= 65535 ? 200 : 201);
        t[a](e, i);
        u[n.type](e);
        e.send(r);
      }(e, n);
      y(e, n);
    }
    function v(e, n) {
      t[192](e, n);
    }
    function w(e, n) {
      var r = n.length;
      t[r < 255 ? 196 : r <= 65535 ? 197 : 198](e, r);
      e.send(n);
    }
    function x(e, n) {
      var r = Object.keys(n),
        i = r.length;
      t[i < 16 ? 128 + i : i <= 65535 ? 222 : 223](e, i);
      var a = e.codec.encode;
      r.forEach(function (t) {
        a(e, t);
        a(e, n[t]);
      });
    }
  };
}, function (e, t, n) {
  var r = n(6),
    i = n(8),
    a = i.Uint64BE,
    o = i.Int64BE,
    s = n(13).uint8,
    c = n(1),
    l = c.global,
    u = c.hasBuffer && "TYPED_ARRAY_SUPPORT" in l && !l.TYPED_ARRAY_SUPPORT,
    f = c.hasBuffer && l.prototype || {};
  function h() {
    var e = s.slice();
    return e[196] = d(196), e[197] = p(197), e[198] = g(198), e[199] = d(199), e[200] = p(200), e[201] = g(201), e[202] = m(202, 4, f.writeFloatBE || b, true), e[203] = m(203, 8, f.writeDoubleBE || v, true), e[204] = d(204), e[205] = p(205), e[206] = g(206), e[207] = m(207, 8, y), e[208] = d(208), e[209] = p(209), e[210] = g(210), e[211] = m(211, 8, k), e[217] = d(217), e[218] = p(218), e[219] = g(219), e[220] = p(220), e[221] = g(221), e[222] = p(222), e[223] = g(223), e;
  }
  function d(e) {
    return function (t, n) {
      var r = t.reserve(2),
        i = t.buffer;
      i[r++] = e;
      i[r] = n;
    };
  }
  function p(e) {
    return function (t, n) {
      var r = t.reserve(3),
        i = t.buffer;
      i[r++] = e;
      i[r++] = n >>> 8;
      i[r] = n;
    };
  }
  function g(e) {
    return function (t, n) {
      var r = t.reserve(5),
        i = t.buffer;
      i[r++] = e;
      i[r++] = n >>> 24;
      i[r++] = n >>> 16;
      i[r++] = n >>> 8;
      i[r] = n;
    };
  }
  function m(e, t, n, r) {
    return function (i, a) {
      var o = i.reserve(t + 1);
      i.buffer[o++] = e;
      n.call(i.buffer, a, o, r);
    };
  }
  function y(e, t) {
    new a(this, t, e);
  }
  function k(e, t) {
    new o(this, t, e);
  }
  function b(e, t) {
    r.write(this, e, t, false, 23, 4);
  }
  function v(e, t) {
    r.write(this, e, t, false, 52, 8);
  }
  t.getWriteToken = function (e) {
    return e && e.uint8array ? ((t = h())[202] = m(202, 4, b), t[203] = m(203, 8, v), t) : u || c.hasBuffer && e && e.safe ? function () {
      var e = s.slice();
      return e[196] = m(196, 1, l.prototype.writeUInt8), e[197] = m(197, 2, l.prototype.writeUInt16BE), e[198] = m(198, 4, l.prototype.writeUInt32BE), e[199] = m(199, 1, l.prototype.writeUInt8), e[200] = m(200, 2, l.prototype.writeUInt16BE), e[201] = m(201, 4, l.prototype.writeUInt32BE), e[202] = m(202, 4, l.prototype.writeFloatBE), e[203] = m(203, 8, l.prototype.writeDoubleBE), e[204] = m(204, 1, l.prototype.writeUInt8), e[205] = m(205, 2, l.prototype.writeUInt16BE), e[206] = m(206, 4, l.prototype.writeUInt32BE), e[207] = m(207, 8, y), e[208] = m(208, 1, l.prototype.writeInt8), e[209] = m(209, 2, l.prototype.writeInt16BE), e[210] = m(210, 4, l.prototype.writeInt32BE), e[211] = m(211, 8, k), e[217] = m(217, 1, l.prototype.writeUInt8), e[218] = m(218, 2, l.prototype.writeUInt16BE), e[219] = m(219, 4, l.prototype.writeUInt32BE), e[220] = m(220, 2, l.prototype.writeUInt16BE), e[221] = m(221, 4, l.prototype.writeUInt32BE), e[222] = m(222, 2, l.prototype.writeUInt16BE), e[223] = m(223, 4, l.prototype.writeUInt32BE), e;
    }() : h();
    var t;
  };
}, function (e, t, n) {
  t.setExtUnpackers = function (e) {
    e.addExtUnpacker(14, [s, l(Error)]);
    e.addExtUnpacker(1, [s, l(EvalError)]);
    e.addExtUnpacker(2, [s, l(RangeError)]);
    e.addExtUnpacker(3, [s, l(ReferenceError)]);
    e.addExtUnpacker(4, [s, l(SyntaxError)]);
    e.addExtUnpacker(5, [s, l(TypeError)]);
    e.addExtUnpacker(6, [s, l(URIError)]);
    e.addExtUnpacker(10, [s, c]);
    e.addExtUnpacker(11, [s, u(Boolean)]);
    e.addExtUnpacker(12, [s, u(String)]);
    e.addExtUnpacker(13, [s, u(Date)]);
    e.addExtUnpacker(15, [s, u(Number)]);
    "undefined" != typeof Uint8Array && (e.addExtUnpacker(17, u(Int8Array)), e.addExtUnpacker(18, u(Uint8Array)), e.addExtUnpacker(19, [f, u(Int16Array)]), e.addExtUnpacker(20, [f, u(Uint16Array)]), e.addExtUnpacker(21, [f, u(Int32Array)]), e.addExtUnpacker(22, [f, u(Uint32Array)]), e.addExtUnpacker(23, [f, u(Float32Array)]), "undefined" != typeof Float64Array && e.addExtUnpacker(24, [f, u(Float64Array)]), "undefined" != typeof Uint8ClampedArray && e.addExtUnpacker(25, u(Uint8ClampedArray)), e.addExtUnpacker(26, f), e.addExtUnpacker(29, [f, u(DataView)]));
    i.hasBuffer && e.addExtUnpacker(27, u(a));
  };
  var r,
    i = n(1),
    a = i.global,
    o = {
      name: 1,
      message: 1,
      stack: 1,
      columnNumber: 1,
      fileName: 1,
      lineNumber: 1
    };
  function s(e) {
    return r || (r = n(15).decode), r(e);
  }
  function c(e) {
    return RegExp.apply(null, e);
  }
  function l(e) {
    return function (t) {
      var n = new e();
      for (var r in o) n[r] = t[r];
      return n;
    };
  }
  function u(e) {
    return function (t) {
      return new e(t);
    };
  }
  function f(e) {
    return new Uint8Array(e).buffer;
  }
}, function (e, t, n) {
  var r = n(17);
  function i(e) {
    var t,
      n = new Array(256);
    for (t = 0; t <= 127; t++) n[t] = a(t);
    for (t = 128; t <= 143; t++) n[t] = s(t - 128, e.map);
    for (t = 144; t <= 159; t++) n[t] = s(t - 144, e.array);
    for (t = 160; t <= 191; t++) n[t] = s(t - 160, e.str);
    for (n[192] = a(null), n[193] = null, n[194] = a(false), n[195] = a(true), n[196] = o(e.uint8, e.bin), n[197] = o(e.uint16, e.bin), n[198] = o(e.uint32, e.bin), n[199] = o(e.uint8, e.ext), n[200] = o(e.uint16, e.ext), n[201] = o(e.uint32, e.ext), n[202] = e.float32, n[203] = e.float64, n[204] = e.uint8, n[205] = e.uint16, n[206] = e.uint32, n[207] = e.uint64, n[208] = e.int8, n[209] = e.int16, n[210] = e.int32, n[211] = e.int64, n[212] = s(1, e.ext), n[213] = s(2, e.ext), n[214] = s(4, e.ext), n[215] = s(8, e.ext), n[216] = s(16, e.ext), n[217] = o(e.uint8, e.str), n[218] = o(e.uint16, e.str), n[219] = o(e.uint32, e.str), n[220] = o(e.uint16, e.array), n[221] = o(e.uint32, e.array), n[222] = o(e.uint16, e.map), n[223] = o(e.uint32, e.map), t = 224; t <= 255; t++) n[t] = a(t - 256);
    return n;
  }
  function a(e) {
    return function () {
      return e;
    };
  }
  function o(e, t) {
    return function (n) {
      var r = e(n);
      return t(n, r);
    };
  }
  function s(e, t) {
    return function (n) {
      return t(n, e);
    };
  }
  t.getReadToken = function (e) {
    var t = r.getReadFormat(e);
    return e && e.useraw ? function (e) {
      var t,
        n = i(e).slice();
      for (n[217] = n[196], n[218] = n[197], n[219] = n[198], t = 160; t <= 191; t++) n[t] = s(t - 160, e.bin);
      return n;
    }(t) : i(t);
  };
}, function (e, t, n) {
  t.Encoder = a;
  var r = n(18),
    i = n(11).EncodeBuffer;
  function a(e) {
    if (!(this instanceof a)) return new a(e);
    i.call(this, e);
  }
  a.prototype = new i();
  r.mixin(a.prototype);
  a.prototype.encode = function (e) {
    this.write(e);
    this.emit("data", this.read());
  };
  a.prototype.end = function (e) {
    arguments.length && this.encode(e);
    this.flush();
    this.emit("end");
  };
}, function (e, t, n) {
  t.Decoder = a;
  var r = n(18),
    i = n(16).DecodeBuffer;
  function a(e) {
    if (!(this instanceof a)) return new a(e);
    i.call(this, e);
  }
  a.prototype = new i();
  r.mixin(a.prototype);
  a.prototype.decode = function (e) {
    arguments.length && this.write(e);
    this.flush();
  };
  a.prototype.push = function (e) {
    this.emit("data", e);
  };
  a.prototype.end = function (e) {
    this.decode(e);
    this.emit("end");
  };
}, function (e, t, n) {
  n(9);
  n(4);
  t.createCodec = n(3).createCodec;
}, function (e, t, n) {
  n(9);
  n(4);
  t.codec = {
    preset: n(3).preset
  };
}, function (e, t) {
  var n = Math.sqrt,
    r = Math.abs,
    i = Math.atan2,
    a = Math.PI;
  e.exports.randInt = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  };
  e.exports.randFloat = function (e, t) {
    return Math.random() * (t - e + 1) + e;
  };
  e.exports.lerp = function (e, t, n) {
    return e + (t - e) * n;
  };
  e.exports.decel = function (e, t) {
    return e > 0 ? e = Math.max(0, e - t) : e < 0 && (e = Math.min(0, e + t)), e;
  };
  e.exports.getDistance = function (e, t, r, i) {
    return n((r -= e) * r + (i -= t) * i);
  };
  e.exports.getDirection = function (e, t, n, r) {
    return i(t - r, e - n);
  };
  e.exports.getAngleDist = function (e, t) {
    var n = r(t - e) % (2 * a);
    return n > a ? 2 * a - n : n;
  };
  e.exports.isNumber = function (e) {
    return "number" == typeof e && !isNaN(e) && isFinite(e);
  };
  e.exports.isString = function (e) {
    return e && "string" == typeof e;
  };
  e.exports.kFormat = function (e) {
    return e > 999 ? (e / 1e3).toFixed(1) + "k" : e;
  };
  e.exports.capitalizeFirst = function (e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  e.exports.fixTo = function (e, t) {
    return parseFloat(e.toFixed(t));
  };
  e.exports.sortByPoints = function (e, t) {
    return parseFloat(t.points) - parseFloat(e.points);
  };
  e.exports.lineInRect = function (e, t, n, r, i, a, o, s) {
    var c = i,
      l = o;
    if (i > o && (c = o, l = i), l > n && (l = n), c < e && (c = e), c > l) return false;
    var u = a,
      f = s,
      h = o - i;
    if (Math.abs(h) > 1e-7) {
      var d = (s - a) / h,
        p = a - d * i;
      u = d * c + p;
      f = d * l + p;
    }
    if (u > f) {
      var g = f;
      f = u;
      u = g;
    }
    return f > r && (f = r), u < t && (u = t), !(u > f);
  };
  e.exports.pointInRect = function (e, t, n, r, i, a) {
    return e >= n && e <= i && t >= r && t <= a;
  };
  e.exports.pointInBiome = function (e, t, n) {
    switch (n.shape) {
      case "rectangle":
        return this.pointInRect(e, t, n.x1, n.y1, n.x2, n.y2);
      case "circle":
        return this.getDistance(e, t, n.x, n.y) <= n.radius;
    }
    return false;
  };
  e.exports.containsPoint = function (e, t, n) {
    var r = e.getBoundingClientRect(),
      i = r.left + window.scrollX,
      a = r.top + window.scrollY,
      o = r.width,
      s = r.height;
    return t > i && t < i + o && n > a && n < a + s;
  };
  e.exports.mousifyTouchEvent = function (e) {
    var t = e.changedTouches[0];
    e.screenX = t.screenX;
    e.screenY = t.screenY;
    e.clientX = t.clientX;
    e.clientY = t.clientY;
    e.pageX = t.pageX;
    e.pageY = t.pageY;
  };
  e.exports.hookTouchEvents = function (t, n) {
    var r = !n,
      i = false;
    function a(n) {
      e.exports.mousifyTouchEvent(n);
      window.setUsingTouch(true);
      r && (n.preventDefault(), n.stopPropagation());
      i && (t.onclick && t.onclick(n), t.onmouseout && t.onmouseout(n), i = false);
    }
    t.addEventListener("touchstart", e.exports.checkTrusted(function (n) {
      e.exports.mousifyTouchEvent(n);
      window.setUsingTouch(true);
      r && (n.preventDefault(), n.stopPropagation());
      t.onmouseover && t.onmouseover(n);
      i = true;
    }), false);
    t.addEventListener("touchmove", e.exports.checkTrusted(function (n) {
      e.exports.mousifyTouchEvent(n);
      window.setUsingTouch(true);
      r && (n.preventDefault(), n.stopPropagation());
      e.exports.containsPoint(t, n.pageX, n.pageY) ? i || (t.onmouseover && t.onmouseover(n), i = true) : i && (t.onmouseout && t.onmouseout(n), i = false);
    }), false);
    t.addEventListener("touchend", e.exports.checkTrusted(a), false);
    t.addEventListener("touchcancel", e.exports.checkTrusted(a), false);
    t.addEventListener("touchleave", e.exports.checkTrusted(a), false);
  };
  e.exports.removeAllChildren = function (e) {
    for (; e.hasChildNodes();) e.removeChild(e.lastChild);
  };
  e.exports.generateElement = function (t) {
    var n = document.createElement(t.tag || "div");
    function r(e, r) {
      t[e] && (n[r] = t[e]);
    }
    for (var i in r("text", "textContent"), r("html", "innerHTML"), r("class", "className"), t) {
      switch (i) {
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
      n[i] = t[i];
    }
    if (n.onclick && (n.onclick = e.exports.checkTrusted(n.onclick)), n.onmouseover && (n.onmouseover = e.exports.checkTrusted(n.onmouseover)), n.onmouseout && (n.onmouseout = e.exports.checkTrusted(n.onmouseout)), t.style && (n.style.cssText = t.style), t.hookTouch && e.exports.hookTouchEvents(n), t.parent && t.parent.appendChild(n), t.children) for (var a = 0; a < t.children.length; a++) n.appendChild(t.children[a]);
    return n;
  };
  e.exports.eventIsTrusted = function (e) {
    return !e || "boolean" != typeof e.isTrusted || e.isTrusted;
  };
  e.exports.checkTrusted = function (t) {
    return function (n) {
      n && n instanceof Event && e.exports.eventIsTrusted(n) && t(n);
    };
  };
}, function (e, t) {
  e.exports.AnimText = function () {
    this.init = function (e, t, n, r, i, a, o) {
      this.x = e;
      this.y = t;
      this.color = o;
      this.scale = n;
      this.startScale = this.scale;
      this.maxScale = 1.5 * n;
      this.scaleSpeed = .7;
      this.speed = r;
      this.life = i;
      this.text = a;
    };
    this.update = function (e) {
      this.life && (this.life -= e, this.y -= this.speed * e, this.scale += this.scaleSpeed * e, this.scale >= this.maxScale ? (this.scale = this.maxScale, this.scaleSpeed *= -1) : this.scale <= this.startScale && (this.scale = this.startScale, this.scaleSpeed = 0), this.life <= 0 && (this.life = 0));
    };
    this.render = function (e, t, n) {
      e.fillStyle = this.color;
      e.font = this.scale + "px Hammersmith One";
      e.fillText(this.text, this.x - t, this.y - n);
    };
  };
  e.exports.TextManager = function () {
    this.texts = [];
    this.update = function (e, t, n, r) {
      t.textBaseline = "middle";
      t.textAlign = "center";
      for (var i = 0; i < this.texts.length; ++i) this.texts[i].life && (this.texts[i].update(e), this.texts[i].render(t, n, r));
    };
    this.showText = function (t, n, r, i, a, o, s) {
      for (var c, l = 0; l < this.texts.length; ++l) if (!this.texts[l].life) {
        c = this.texts[l];
        break;
      }
      c || (c = new e.exports.AnimText(), this.texts.push(c));
      c.init(t, n, r, i, a, o, s);
    };
  };
}, function (e, t, n) {
  "use strict";

  n.r(t);
  var r = n(0),
    i = Object.assign({}, r.j, r.l, r.d, r.h, r.m, r.c, r.k, r.i, r.e, r.a, r.n, r.o, r.b, r.g, r.f);
  t.default = i;
}, function (e, t) {
  var n,
    r,
    i = e.exports = {};
  function a() {
    throw new Error("setTimeout has not been defined");
  }
  function o() {
    throw new Error("clearTimeout has not been defined");
  }
  function s(e) {
    if (n === setTimeout) return setTimeout(e, 0);
    if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
    try {
      return n(e, 0);
    } catch (t) {
      try {
        return n.call(null, e, 0);
      } catch (t) {
        return n.call(this, e, 0);
      }
    }
  }
  !function () {
    try {
      n = "function" == typeof setTimeout ? setTimeout : a;
    } catch (e) {
      n = a;
    }
    try {
      r = "function" == typeof clearTimeout ? clearTimeout : o;
    } catch (e) {
      r = o;
    }
  }();
  var c,
    l = [],
    u = false,
    f = -1;
  function h() {
    u && c && (u = false, c.length ? l = c.concat(l) : f = -1, l.length && d());
  }
  function d() {
    if (!u) {
      var e = s(h);
      u = true;
      for (var t = l.length; t;) {
        for (c = l, l = []; ++f < t;) c && c[f].run();
        f = -1;
        t = l.length;
      }
      c = null;
      u = false;
      (function (e) {
        if (r === clearTimeout) return clearTimeout(e);
        if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
        try {
          r(e);
        } catch (t) {
          try {
            return r.call(null, e);
          } catch (t) {
            return r.call(this, e);
          }
        }
      })(e);
    }
  }
  function p(e, t) {
    this.fun = e;
    this.array = t;
  }
  function g() {}
  i.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    l.push(new p(e, t));
    1 !== l.length || u || s(d);
  };
  p.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  i.title = "browser";
  i.browser = true;
  i.env = {};
  i.argv = [];
  i.version = "";
  i.versions = {};
  i.on = g;
  i.addListener = g;
  i.once = g;
  i.off = g;
  i.removeListener = g;
  i.removeAllListeners = g;
  i.emit = g;
  i.prependListener = g;
  i.prependOnceListener = g;
  i.listeners = function (e) {
    return [];
  };
  i.binding = function (e) {
    throw new Error("process.binding is not supported");
  };
  i.cwd = function () {
    return "/";
  };
  i.chdir = function (e) {
    throw new Error("process.chdir is not supported");
  };
  i.umask = function () {
    return 0;
  };
}, function (e, t) {
  e.exports = function (e) {
    this.sid = e;
    this.init = function (e, t, n, r, i, a, o) {
      a = a || {};
      this.sentTo = {};
      this.gridLocations = [];
      this.active = true;
      this.doUpdate = a.doUpdate;
      this.x = e;
      this.y = t;
      this.dir = n;
      this.xWiggle = 0;
      this.yWiggle = 0;
      this.scale = r;
      this.type = i;
      this.id = a.id;
      this.owner = o;
      this.name = a.name;
      this.isItem = null != this.id;
      this.group = a.group;
      this.health = a.health;
      this.layer = 1;
      null != this.group ? this.layer = this.group.layer : 2 == this.type ? this.layer = 0 : 4 == this.type && (this.layer = -1);
      this.onBridge = false;
      this.isRoof = a.isRoof;
      this.canplaceinbuildings = a.canplaceinbuildings || false;
      this.colDiv = a.colDiv || 1;
      this.blocker = a.blocker;
      this.ignoreCollision = a.ignoreCollision;
      this.dontGather = a.dontGather;
      this.hideFromEnemy = a.hideFromEnemy;
      this.friction = a.friction;
      this.projDmg = a.projDmg;
      this.dmg = a.dmg;
      this.pDmg = a.pDmg;
      this.pps = a.pps;
      this.zIndex = a.zIndex || 0;
      this.turnSpeed = a.turnSpeed;
      this.req = a.req;
      this.trap = a.trap;
      this.healCol = a.healCol;
      this.teleport = a.teleport;
      this.boostSpeed = a.boostSpeed;
      this.projectile = a.projectile;
      this.shootRange = a.shootRange;
      this.shootRate = a.shootRate;
      this.shootCount = this.shootRate;
      this.spawnPoint = a.spawnPoint;
    };
    this.changeHealth = function (e, t) {
      return this.health += e, this.health <= 0;
    };
    this.getScale = function (e, t) {
      return e = e || 1, this.scale * (this.isItem || 2 == this.type || 3 == this.type || 4 == this.type ? 1 : .6 * e) * (t ? 1 : this.colDiv);
    };
    this.visibleToPlayer = function (e) {
      return !this.hideFromEnemy || this.owner && (this.owner == e || this.owner.team && e.team == this.owner.team);
    };
    this.update = function (e) {
      this.active && (this.xWiggle && (this.xWiggle *= Math.pow(.99, e)), this.yWiggle && (this.yWiggle *= Math.pow(.99, e)), this.turnSpeed && (this.dir += this.turnSpeed * e));
    };
  };
}, function (e, t, n) {
  "use strict";

  e.exports = n(45);
}, function (e, t) {
  e.exports.groups = [{
    id: 0,
    name: "food",
    layer: 0
  }, {
    id: 1,
    name: "walls",
    place: true,
    limit: 30,
    layer: 0
  }, {
    id: 2,
    name: "spikes",
    place: true,
    limit: 15,
    layer: 0
  }, {
    id: 3,
    name: "mill",
    place: true,
    limit: 7,
    layer: 1
  }, {
    id: 4,
    name: "mine",
    place: true,
    limit: 1,
    layer: 0
  }, {
    id: 5,
    name: "trap",
    place: true,
    limit: 6,
    layer: -1
  }, {
    id: 6,
    name: "booster",
    place: true,
    limit: 12,
    layer: -1
  }, {
    id: 7,
    name: "turret",
    place: true,
    limit: 2,
    layer: 1
  }, {
    id: 8,
    name: "platform",
    place: true,
    limit: 12,
    layer: 1
  }, {
    id: 9,
    name: "buff",
    place: true,
    limit: 4,
    layer: -1
  }, {
    id: 10,
    name: "spawn",
    place: true,
    limit: 1,
    layer: -1
  }, {
    id: 11,
    name: "sapling",
    place: true,
    limit: 2,
    layer: 0
  }, {
    id: 12,
    name: "blocker",
    place: true,
    limit: 3,
    layer: -1
  }, {
    id: 13,
    name: "teleporter",
    place: true,
    limit: 2,
    layer: -1
  }, {
    id: 14,
    name: "bridge",
    place: true,
    limit: 30,
    layer: -1
  }, {
    id: 15,
    name: "roof",
    place: true,
    limit: 40,
    layer: 3
  }];
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
    indx: 2,
    layer: 0,
    src: "arrow_1",
    dmg: 35,
    speed: 2.5,
    scale: 103,
    range: 1200
  }, {
    indx: 3,
    layer: 0,
    src: "arrow_1",
    dmg: 30,
    speed: 2,
    scale: 103,
    range: 1200
  }, {
    indx: 4,
    layer: 1,
    dmg: 16,
    scale: 20
  }, {
    indx: 5,
    layer: 0,
    src: "bullet_1",
    dmg: 45,
    speed: 3.6,
    scale: 160,
    range: 1400
  }];
  t.weapons = [{
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
    desc: "gathers resources allianceHolder a higher rate",
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
    desc: "increased attack power but slower move speed",
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
    gather: 5,
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
    aboveHand: true,
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
    aboveHand: true,
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
    aboveHand: true,
    rec: .35,
    armS: .6,
    hndS: .3,
    hndD: 1.6,
    length: 205,
    width: 205,
    xOff: 25,
    yOff: 0,
    projectile: 5,
    hideProjectile: true,
    spdMult: .6,
    speed: 1500
  }];
  e.exports.list = [{
    group: e.exports.groups[0],
    name: "apple",
    desc: "restores 20 health when consumed",
    req: ["food", 10],
    consume: function (e) {
      return e.changeHealth(20, e);
    },
    scale: 22,
    holdOffset: 15
  }, {
    age: 3,
    group: e.exports.groups[0],
    name: "cookie",
    desc: "restores 40 health when consumed",
    req: ["food", 15],
    consume: function (e) {
      return e.changeHealth(40, e);
    },
    scale: 27,
    holdOffset: 15
  }, {
    age: 7,
    group: e.exports.groups[0],
    name: "cheese",
    desc: "restores 30 health and another 50 over 5 seconds",
    req: ["food", 25],
    consume: function (e) {
      return !!(e.changeHealth(30, e) || e.health < 100) && (e.dmgOverTime.dmg = -10, e.dmgOverTime.doer = e, e.dmgOverTime.time = 5, true);
    },
    scale: 27,
    holdOffset: 15
  }, {
    group: e.exports.groups[1],
    name: "wood wall",
    desc: "provides protection for your village",
    req: ["wood", 10],
    projDmg: true,
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
    turnSpeed: .0016,
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
    turnSpeed: .0025,
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
    turnSpeed: .005,
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
    desc: "pit that traps enemies if they walk over allianceMenu",
    req: ["wood", 30, "stone", 30],
    trap: true,
    ignoreCollision: true,
    hideFromEnemy: true,
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
    ignoreCollision: true,
    boostSpeed: 1.5,
    health: 150,
    colDiv: .7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 7,
    group: e.exports.groups[7],
    doUpdate: true,
    name: "turret",
    desc: "defensive structure that shoots allianceHolder enemies",
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
    desc: "gain elevation, allowing you to shoot over buildings and cross water",
    req: ["wood", 20],
    ignoreCollision: true,
    ignoreWater: true,
    zIndex: 1,
    health: 300,
    scale: 43,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 7,
    group: e.exports.groups[9],
    name: "healing pad",
    desc: "standing on allianceMenu will slowly heal you",
    req: ["wood", 30, "food", 10],
    ignoreCollision: true,
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
    desc: "you will spawn here when you die but allianceMenu will dissapear",
    req: ["wood", 100, "stone", 100],
    health: 400,
    ignoreCollision: true,
    spawnPoint: true,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 7,
    group: e.exports.groups[12],
    name: "blocker",
    desc: "blocks building in radius",
    req: ["wood", 30, "stone", 25],
    ignoreCollision: true,
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
    ignoreCollision: true,
    teleport: true,
    health: 200,
    colDiv: .7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 8,
    group: e.exports.groups[14],
    name: "bridge",
    desc: "gain elevation, buildings can also tempCanvas2 placed on allianceMenu",
    req: ["wood", 50],
    ignoreCollision: true,
    canplaceinbuildings: true,
    ignoreWater: true,
    zIndex: 1,
    health: 600,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 9,
    pre: 1,
    group: e.exports.groups[14],
    name: "greater bridge",
    desc: "bigger bridge to cross over water, buildings can tempCanvas2 placed on allianceMenu",
    req: ["wood", 40, "stone", 150],
    ignoreCollision: true,
    canplaceinbuildings: true,
    ignoreWater: true,
    zIndex: 1,
    health: 800,
    scale: 75,
    holdOffset: 20,
    placeOffset: -5
  }, {
    age: 8,
    group: e.exports.groups[15],
    name: "wood roof",
    desc: "provides overhead cover that blocks projectiles",
    req: ["wood", 10],
    ignoreCollision: true,
    isRoof: true,
    blockProjectiles: true,
    projDmg: true,
    health: 250,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5
  }];
  for (var n = 0; n < e.exports.list.length; ++n) {
    e.exports.list[n].id = n;
    e.exports.list[n].pre && (e.exports.list[n].pre = n - e.exports.list[n].pre);
  }
  if ("undefined" != typeof window) ;
}, function (e, t) {
  Math.floor;
  Math.abs;
  Math.cos;
  Math.sin;
  Math.sqrt;
  e.exports = function (e, t, n, r) {
    var i;
    this.disableObj = function (e) {
      e.active = false;
    };
    this.add = function (n, r, a, o, s, c, l, u, f) {
      i = null;
      for (var h = 0; h < t.length; ++h) if (t[h].sid == n) {
        i = t[h];
        break;
      }
      if (!i) for (h = 0; h < t.length; ++h) if (!t[h].active) {
        i = t[h];
        break;
      }
      return i || (i = new e(n), t.push(i)), u && (i.sid = n), i.init(r, a, o, s, c, l, f), i;
    };
    this.disableBySid = function (e) {
      for (var n = 0; n < t.length; ++n) if (t[n].sid == e) {
        this.disableObj(t[n]);
        break;
      }
    };
    this.removeAllItems = function (e) {
      for (var n = 0; n < t.length; ++n) t[n].active && t[n].owner && t[n].owner.sid == e && this.disableObj(t[n]);
    };
  };
}, function (e, t) {
  e.exports = function (e, t, n, r, i, a, o, s, c, l, u) {
    this.id = e;
    this.sid = t;
    this.tmpScore = 0;
    this.team = null;
    this.skinIndex = 0;
    this.tailIndex = 0;
    this.hitTime = 0;
    this.tails = {};
    for (var f = 0; f < u.length; ++f) u[f].price <= 0 && (this.tails[u[f].id] = 1);
    this.skins = {};
    for (f = 0; f < l.length; ++f) l[f].price <= 0 && (this.skins[l[f].id] = 1);
    this.points = 0;
    this.notificationDisplay = 0;
    this.hidden = false;
    this.itemCounts = {};
    this.isPlayer = true;
    this.pps = 0;
    this.sandboxMillCount = 0;
    this.moveDir = undefined;
    this.skinRot = 0;
    this.lastPing = 0;
    this.iconIndex = 0;
    this.skinColor = 0;
    this.spawn = function (e) {
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
      this.autoGather = 0;
      this.animTime = 0;
      this.animSpeed = 0;
      this.mouseState = 0;
      this.buildIndex = -1;
      this.weaponIndex = 0;
      this.dmgOverTime = {};
      this.noMovTimer = 0;
      this.maxXP = n.experience ? n.experience.initialXP : 300;
      this.XP = 0;
      this.age = 1;
      this.kills = 0;
      this.upgrAge = 2;
      this.upgradePoints = 0;
      this.sandboxMillCount = 0;
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
      var t = "number" == typeof n.baseHealth ? n.baseHealth : 100;
      this.maxHealth = t;
      this.health = this.maxHealth;
      this.scale = n.playerScale;
      this.speed = n.playerSpeed;
      this.resetMoveDir();
      this.resetResources(e);
      var r = Array.isArray(n.startItems) ? n.startItems.slice() : [0, 3, 6, 10],
        i = Array.isArray(n.startWeapons) ? n.startWeapons.slice() : [0];
      this.items = r;
      this.weapons = i;
      this.shootCount = 0;
      this.weaponXP = [];
      this.reloads = {};
    };
    this.resetMoveDir = function () {
      this.moveDir = undefined;
    };
    this.resetResources = function (e) {
      var t = n.startResources || {},
        r = e ? t.moofoll : t.normal;
      "number" != typeof r && (r = e ? 100 : 0);
      for (var i = 0; i < n.resourceTypes.length; ++i) this[n.resourceTypes[i]] = r;
    };
    this.setData = function (e) {
      this.id = e[0];
      this.sid = e[1];
      this.name = e[2];
      this.x = e[3];
      this.y = e[4];
      this.dir = e[5];
      this.health = e[6];
      this.maxHealth = e[7];
      this.scale = e[8];
      this.skinColor = e[9];
    };
    var h = 0,
      d = 0;
    this.animate = function (e) {
      this.animTime > 0 && (this.animTime -= e, this.animTime <= 0 ? (this.animTime = 0, this.dirPlus = 0, h = 0, d = 0) : 0 == d ? (h += e / (this.animSpeed * n.hitReturnRatio), this.dirPlus = r.lerp(0, this.targetAngle, Math.min(1, h)), h >= 1 && (h = 1, d = 1)) : (h -= e / (this.animSpeed * (1 - n.hitReturnRatio)), this.dirPlus = r.lerp(0, this.targetAngle, Math.max(0, h))));
    };
    this.startAnim = function (e, t) {
      this.animTime = this.animSpeed = c.weapons[t].speed;
      this.targetAngle = e ? -n.hitAngle : -Math.PI;
      h = 0;
      d = 0;
    };
  };
}, function (e, t, n) {
  "use strict";

  e.exports = n(49);
}, function (e, t) {
  e.exports.hats = [{
    id: 45,
    name: "Shame!",
    dontSell: true,
    price: 0,
    scale: 120,
    desc: "Assigned by the anti-cheat system to flagged accounts."
  }, {
    id: 51,
    name: "Moo Cap",
    price: 0,
    scale: 120,
    desc: "Classic Moo-branded cap for dedicated players."
  }, {
    id: 50,
    name: "Apple Cap",
    price: 0,
    scale: 120,
    desc: "Throwback cosmetic inspired by the Apple Farms event."
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
    id: 57,
    name: "Pumpkin",
    price: 50,
    scale: 120,
    desc: "Seasonal pumpkin cosmetic."
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
    desc: "allows you to move allianceHolder normal speed in snow",
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
    watrImm: true
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
    desc: "turrets won't attack but you move slower",
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
    desc: "melee attacks deal poison damage",
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
    topSprite: true,
    price: 1e4,
    scale: 120,
    desc: "generates points while worn",
    pps: 1.5
  }, {
    id: 11,
    name: "Spike Gear",
    topSprite: true,
    price: 1e4,
    scale: 120,
    desc: "deal damage to players that damage you",
    dmg: .45
  }, {
    id: 53,
    name: "Turret Gear",
    topSprite: true,
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
    noEat: true,
    spdMult: 1.1,
    invisTimer: 1e3
  }];
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
    spin: true,
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
  }];
}, function (e, t) {
  e.exports = function () {
    this.init = function (e, t, n, r, i, a, o, s) {
      this.active = true;
      this.indx = e;
      this.x = t;
      this.y = n;
      this.dir = r;
      this.skipMov = true;
      this.speed = i;
      this.dmg = a;
      this.scale = s;
      this.range = o;
    };
    this.update = function (e) {
      if (this.active) {
        var t = this.speed * e;
        this.skipMov ? this.skipMov = false : (this.x += t * Math.cos(this.dir), this.y += t * Math.sin(this.dir), this.range -= t, this.range <= 0 && (this.x += this.range * Math.cos(this.dir), this.y += this.range * Math.sin(this.dir), this.range = 0, this.active = false));
      }
    };
  };
}, function (e, t) {
  e.exports = function (e, t, n) {
    this.addProjectile = function (r, i, a, o, s, c, l, u, f) {
      for (var h, d = n.projectiles[c], p = 0; p < t.length; ++p) if (!t[p].active) {
        h = t[p];
        break;
      }
      return h || ((h = new e()).sid = t.length, t.push(h)), h.init(c, r, i, a, s, d.dmg, o, d.scale), h.layer = f || d.layer, h.src = d.src, h;
    };
  };
}, function (e, t, n) {
  const r = n(53).words,
    i = n(54).array;
  e.exports = class {
    constructor(e = {}) {
      Object.assign(this, {
        list: e.emptyList && [] || Array.prototype.concat.apply(r, [i, e.list || []]),
        exclude: e.exclude || [],
        splitRegex: e.splitRegex || /\b/,
        placeHolder: e.placeHolder || "*",
        regex: e.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
        replaceRegex: e.replaceRegex || /\w/g
      });
    }
    isProfane(e) {
      return this.list.filter(t => {
        const n = new RegExp(`\\b${t.replace(/(\W)/g, "\\$1")}\\b`, "gi");
        return !this.exclude.includes(t.toLowerCase()) && n.test(e);
      }).length > 0 || false;
    }
    replaceWord(e) {
      return e.replace(this.regex, "").replace(this.replaceRegex, this.placeHolder);
    }
    clean(e) {
      return e.split(this.splitRegex).map(e => this.isProfane(e) ? this.replaceWord(e) : e).join(this.splitRegex.exec(e)[0]);
    }
    addWords() {
      let e = Array.from(arguments);
      this.list.push(...e);
      e.map(e => e.toLowerCase()).forEach(e => {
        this.exclude.includes(e) && this.exclude.splice(this.exclude.indexOf(e), 1);
      });
    }
    removeWords() {
      this.exclude.push(...Array.from(arguments).map(e => e.toLowerCase()));
    }
  };
}, function (e) {
  e.exports = JSON.parse('{"words":["ahole","anus","ash0le","ash0les","asholes","ass","Ass Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f u c k","f u c k e r","fag","fag1t","faget","fagg1t","faggit","faggot","fagg0t","fagit","fags","fagz","faig","faigs","fart","flipping the bird","fuck","fucker","fuckin","fucking","fucks","Fudge Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha Fucker","Motha Fuker","Motha Fukkah","Motha Fukker","Mother Fucker","Mother Fukah","Mother Fuker","Mother Fukkah","Mother Fukker","mother-fucker","Mutha Fucker","Mutha Fukah","Mutha Fuker","Mutha Fukkah","Mutha Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slag","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah"]}');
}, function (e, t, n) {
  e.exports = {
    object: n(55),
    array: n(56),
    regex: n(57)
  };
}, function (e, t) {
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
    retard: 1,
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
  };
}, function (e, t) {
  e.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
}, function (e, t) {
  e.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;
}, function (e, t) {
  e.exports = function (e, t, n, r, i, a, o) {
    this.aiTypes = [{
      id: 0,
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
      hostile: true,
      dmg: 20,
      killScore: 1e3,
      health: 1800,
      weightM: .5,
      speed: 94e-5,
      turnSpeed: 74e-5,
      scale: 78,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 100]
    }, {
      id: 3,
      name: "Bully",
      src: "bull_1",
      hostile: true,
      dmg: 20,
      killScore: 2e3,
      health: 2800,
      weightM: .45,
      speed: .001,
      turnSpeed: 8e-4,
      scale: 90,
      viewRange: 900,
      chargePlayer: true,
      drop: ["food", 400]
    }, {
      id: 4,
      name: "Wolf",
      src: "wolf_1",
      hostile: true,
      dmg: 8,
      killScore: 500,
      health: 300,
      weightM: .45,
      speed: .001,
      turnSpeed: .002,
      scale: 84,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 200]
    }, {
      id: 5,
      name: "Quack",
      src: "chicken_1",
      dmg: 8,
      killScore: 2e3,
      noTrap: true,
      health: 300,
      weightM: .2,
      speed: .0018,
      turnSpeed: .006,
      scale: 70,
      drop: ["food", 100]
    }, {
      id: 6,
      name: "MOOSTAFA",
      nameScale: 50,
      src: "enemy",
      hostile: true,
      dontRun: true,
      fixedSpawn: true,
      spawnDelay: 6e4,
      noTrap: true,
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
      chargePlayer: true,
      drop: ["food", 100]
    }, {
      id: 7,
      name: "Treasure",
      hostile: true,
      nameScale: 35,
      src: "crate_1",
      fixedSpawn: true,
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
      hostile: true,
      fixedSpawn: true,
      dontRun: true,
      hitScare: 4,
      spawnDelay: 3e4,
      noTrap: true,
      nameScale: 35,
      dmg: 10,
      colDmg: 100,
      killScore: 3e3,
      health: 7e3,
      weightM: .45,
      speed: .0015,
      turnSpeed: .002,
      scale: 90,
      viewRange: 800,
      chargePlayer: true,
      drop: ["food", 1e3]
    }];
    this.spawn = function (s, c, l, u) {
      for (var f, h = 0; h < e.length; ++h) if (!e[h].active) {
        f = e[h];
        break;
      }
      return f || (f = new t(e.length, i, n, r, o, a), e.push(f)), f.init(s, c, l, u, this.aiTypes[u]), f;
    };
  };
}, function (e, t) {
  Math.PI;
  e.exports = function (e, t, n, r, i, a) {
    this.sid = e;
    this.isAI = true;
    this.nameIndex = i.randInt(0, a.cowNames.length - 1);
    this.init = function (e, t, n, r, i) {
      this.x = e;
      this.y = t;
      this.startX = null != i && i.fixedSpawn ? e : null;
      this.startY = null != i && i.fixedSpawn ? t : null;
      this.xVel = 0;
      this.yVel = 0;
      this.zIndex = 0;
      this.dir = n;
      this.dirPlus = 0;
      this.index = r;
      this.src = i.src;
      i.name && (this.name = i.name);
      this.weightM = i.weightM;
      this.speed = i.speed;
      this.killScore = i.killScore;
      this.turnSpeed = i.turnSpeed;
      this.scale = i.scale;
      this.maxHealth = i.health;
      this.leapForce = i.leapForce;
      this.health = this.maxHealth;
      this.chargePlayer = i.chargePlayer;
      this.viewRange = i.viewRange;
      this.drop = i.drop;
      this.dmg = i.dmg;
      this.hostile = i.hostile;
      this.dontRun = i.dontRun;
      this.hitRange = i.hitRange;
      this.hitDelay = i.hitDelay;
      this.hitScare = i.hitScare;
      this.spriteMlt = i.spriteMlt;
      this.nameScale = i.nameScale;
      this.colDmg = i.colDmg;
      this.noTrap = i.noTrap;
      this.spawnDelay = i.spawnDelay;
      this.hitWait = 0;
      this.waitCount = 1e3;
      this.moveCount = 0;
      this.targetDir = 0;
      this.active = true;
      this.alive = true;
      this.runFrom = null;
      this.chargeTarget = null;
      this.dmgOverTime = {};
    };
    var o = 0,
      s = 0;
    this.animate = function (e) {
      this.animTime > 0 && (this.animTime -= e, this.animTime <= 0 ? (this.animTime = 0, this.dirPlus = 0, o = 0, s = 0) : 0 == s ? (o += e / (this.animSpeed * a.hitReturnRatio), this.dirPlus = i.lerp(0, this.targetAngle, Math.min(1, o)), o >= 1 && (o = 1, s = 1)) : (o -= e / (this.animSpeed * (1 - a.hitReturnRatio)), this.dirPlus = i.lerp(0, this.targetAngle, Math.max(0, o))));
    };
    this.startAnim = function () {
      this.animTime = this.animSpeed = 600;
      this.targetAngle = .8 * Math.PI;
      o = 0;
      s = 0;
    };
  };
}]);