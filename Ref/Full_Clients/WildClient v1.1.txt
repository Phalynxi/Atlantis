// ==UserScript==
// @name         ! ! ! ! ! WildClient 
// @author
// @description  idc cracked by rkovin
// @version      v1.2
// @match        *://*.moomoo.io/*
// @require      https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js
// @require      https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1144167
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.msgpack=t()}}(function(){return function t(r,e,n){function i(f,u){if(!e[f]){if(!r[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(o)return o(f,!0);var s=new Error("Cannot find module '"+f+"'");throw s.code="MODULE_NOT_FOUND",s}var c=e[f]={exports:{}};r[f][0].call(c.exports,function(t){var e=r[f][1][t];return i(e?e:t)},c,c.exports,t,r,e,n)}return e[f].exports}for(var o="function"==typeof require&&require,f=0;f<n.length;f++)i(n[f]);return i}({1:[function(t,r,e){e.encode=t("./encode").encode,e.decode=t("./decode").decode,e.Encoder=t("./encoder").Encoder,e.Decoder=t("./decoder").Decoder,e.createCodec=t("./ext").createCodec,e.codec=t("./codec").codec},{"./codec":10,"./decode":12,"./decoder":13,"./encode":15,"./encoder":16,"./ext":20}],2:[function(t,r,e){(function(Buffer){function t(t){return t&&t.isBuffer&&t}r.exports=t("undefined"!=typeof Buffer&&Buffer)||t(this.Buffer)||t("undefined"!=typeof window&&window.Buffer)||this.Buffer}).call(this,t("buffer").Buffer)},{buffer:29}],3:[function(t,r,e){function n(t,r){for(var e=this,n=r||(r|=0),i=t.length,o=0,f=0;f<i;)o=t.charCodeAt(f++),o<128?e[n++]=o:o<2048?(e[n++]=192|o>>>6,e[n++]=128|63&o):o<55296||o>57343?(e[n++]=224|o>>>12,e[n++]=128|o>>>6&63,e[n++]=128|63&o):(o=(o-55296<<10|t.charCodeAt(f++)-56320)+65536,e[n++]=240|o>>>18,e[n++]=128|o>>>12&63,e[n++]=128|o>>>6&63,e[n++]=128|63&o);return n-r}function i(t,r,e){var n=this,i=0|r;e||(e=n.length);for(var o="",f=0;i<e;)f=n[i++],f<128?o+=String.fromCharCode(f):(192===(224&f)?f=(31&f)<<6|63&n[i++]:224===(240&f)?f=(15&f)<<12|(63&n[i++])<<6|63&n[i++]:240===(248&f)&&(f=(7&f)<<18|(63&n[i++])<<12|(63&n[i++])<<6|63&n[i++]),f>=65536?(f-=65536,o+=String.fromCharCode((f>>>10)+55296,(1023&f)+56320)):o+=String.fromCharCode(f));return o}function o(t,r,e,n){var i;e||(e=0),n||0===n||(n=this.length),r||(r=0);var o=n-e;if(t===this&&e<r&&r<n)for(i=o-1;i>=0;i--)t[i+r]=this[i+e];else for(i=0;i<o;i++)t[i+r]=this[i+e];return o}e.copy=o,e.toString=i,e.write=n},{}],4:[function(t,r,e){function n(t){return new Array(t)}function i(t){if(!o.isBuffer(t)&&o.isView(t))t=o.Uint8Array.from(t);else if(o.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(t)}var o=t("./bufferish"),e=r.exports=n(0);e.alloc=n,e.concat=o.concat,e.from=i},{"./bufferish":8}],5:[function(t,r,e){function n(t){return new Buffer(t)}function i(t){if(!o.isBuffer(t)&&o.isView(t))t=o.Uint8Array.from(t);else if(o.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Buffer.from&&1!==Buffer.from.length?Buffer.from(t):new Buffer(t)}var o=t("./bufferish"),Buffer=o.global,e=r.exports=o.hasBuffer?n(0):[];e.alloc=o.hasBuffer&&Buffer.alloc||n,e.concat=o.concat,e.from=i},{"./bufferish":8}],6:[function(t,r,e){function n(t,r,e,n){var o=a.isBuffer(this),f=a.isBuffer(t);if(o&&f)return this.copy(t,r,e,n);if(c||o||f||!a.isView(this)||!a.isView(t))return u.copy.call(this,t,r,e,n);var s=e||null!=n?i.call(this,e,n):this;return t.set(s,r),s.length}function i(t,r){var e=this.slice||!c&&this.subarray;if(e)return e.call(this,t,r);var i=a.alloc.call(this,r-t);return n.call(this,i,0,t,r),i}function o(t,r,e){var n=!s&&a.isBuffer(this)?this.toString:u.toString;return n.apply(this,arguments)}function f(t){function r(){var r=this[t]||u[t];return r.apply(this,arguments)}return r}var u=t("./buffer-lite");e.copy=n,e.slice=i,e.toString=o,e.write=f("write");var a=t("./bufferish"),Buffer=a.global,s=a.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,c=s&&!Buffer.TYPED_ARRAY_SUPPORT},{"./buffer-lite":3,"./bufferish":8}],7:[function(t,r,e){function n(t){return new Uint8Array(t)}function i(t){if(o.isView(t)){var r=t.byteOffset,n=t.byteLength;t=t.buffer,t.byteLength!==n&&(t.slice?t=t.slice(r,r+n):(t=new Uint8Array(t),t.byteLength!==n&&(t=Array.prototype.slice.call(t,r,r+n))))}else{if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(t)}var o=t("./bufferish"),e=r.exports=o.hasArrayBuffer?n(0):[];e.alloc=n,e.concat=o.concat,e.from=i},{"./bufferish":8}],8:[function(t,r,e){function n(t){return"string"==typeof t?u.call(this,t):a(this).from(t)}function i(t){return a(this).alloc(t)}function o(t,r){function n(t){r+=t.length}function o(t){a+=w.copy.call(t,u,a)}r||(r=0,Array.prototype.forEach.call(t,n));var f=this!==e&&this||t[0],u=i.call(f,r),a=0;return Array.prototype.forEach.call(t,o),u}function f(t){return t instanceof ArrayBuffer||E(t)}function u(t){var r=3*t.length,e=i.call(this,r),n=w.write.call(e,t);return r!==n&&(e=w.slice.call(e,0,n)),e}function a(t){return d(t)?g:y(t)?b:p(t)?v:h?g:l?b:v}function s(){return!1}function c(t,r){return t="[object "+t+"]",function(e){return null!=e&&{}.toString.call(r?e[r]:e)===t}}var Buffer=e.global=t("./buffer-global"),h=e.hasBuffer=Buffer&&!!Buffer.isBuffer,l=e.hasArrayBuffer="undefined"!=typeof ArrayBuffer,p=e.isArray=t("isarray");e.isArrayBuffer=l?f:s;var d=e.isBuffer=h?Buffer.isBuffer:s,y=e.isView=l?ArrayBuffer.isView||c("ArrayBuffer","buffer"):s;e.alloc=i,e.concat=o,e.from=n;var v=e.Array=t("./bufferish-array"),g=e.Buffer=t("./bufferish-buffer"),b=e.Uint8Array=t("./bufferish-uint8array"),w=e.prototype=t("./bufferish-proto"),E=c("ArrayBuffer")},{"./buffer-global":2,"./bufferish-array":4,"./bufferish-buffer":5,"./bufferish-proto":6,"./bufferish-uint8array":7,isarray:34}],9:[function(t,r,e){function n(t){return this instanceof n?(this.options=t,void this.init()):new n(t)}function i(t){for(var r in t)n.prototype[r]=o(n.prototype[r],t[r])}function o(t,r){function e(){return t.apply(this,arguments),r.apply(this,arguments)}return t&&r?e:t||r}function f(t){function r(t,r){return r(t)}return t=t.slice(),function(e){return t.reduce(r,e)}}function u(t){return s(t)?f(t):t}function a(t){return new n(t)}var s=t("isarray");e.createCodec=a,e.install=i,e.filter=u;var c=t("./bufferish");n.prototype.init=function(){var t=this.options;return t&&t.uint8array&&(this.bufferish=c.Uint8Array),this},e.preset=a({preset:!0})},{"./bufferish":8,isarray:34}],10:[function(t,r,e){t("./read-core"),t("./write-core"),e.codec={preset:t("./codec-base").preset}},{"./codec-base":9,"./read-core":22,"./write-core":25}],11:[function(t,r,e){function n(t){if(!(this instanceof n))return new n(t);if(t&&(this.options=t,t.codec)){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish)}}e.DecodeBuffer=n;var i=t("./read-core").preset,o=t("./flex-buffer").FlexDecoder;o.mixin(n.prototype),n.prototype.codec=i,n.prototype.fetch=function(){return this.codec.decode(this)}},{"./flex-buffer":21,"./read-core":22}],12:[function(t,r,e){function n(t,r){var e=new i(r);return e.write(t),e.read()}e.decode=n;var i=t("./decode-buffer").DecodeBuffer},{"./decode-buffer":11}],13:[function(t,r,e){function n(t){return this instanceof n?void o.call(this,t):new n(t)}e.Decoder=n;var i=t("event-lite"),o=t("./decode-buffer").DecodeBuffer;n.prototype=new o,i.mixin(n.prototype),n.prototype.decode=function(t){arguments.length&&this.write(t),this.flush()},n.prototype.push=function(t){this.emit("data",t)},n.prototype.end=function(t){this.decode(t),this.emit("end")}},{"./decode-buffer":11,"event-lite":31}],14:[function(t,r,e){function n(t){if(!(this instanceof n))return new n(t);if(t&&(this.options=t,t.codec)){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish)}}e.EncodeBuffer=n;var i=t("./write-core").preset,o=t("./flex-buffer").FlexEncoder;o.mixin(n.prototype),n.prototype.codec=i,n.prototype.write=function(t){this.codec.encode(this,t)}},{"./flex-buffer":21,"./write-core":25}],15:[function(t,r,e){function n(t,r){var e=new i(r);return e.write(t),e.read()}e.encode=n;var i=t("./encode-buffer").EncodeBuffer},{"./encode-buffer":14}],16:[function(t,r,e){function n(t){return this instanceof n?void o.call(this,t):new n(t)}e.Encoder=n;var i=t("event-lite"),o=t("./encode-buffer").EncodeBuffer;n.prototype=new o,i.mixin(n.prototype),n.prototype.encode=function(t){this.write(t),this.emit("data",this.read())},n.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end")}},{"./encode-buffer":14,"event-lite":31}],17:[function(t,r,e){function n(t,r){return this instanceof n?(this.buffer=i.from(t),void(this.type=r)):new n(t,r)}e.ExtBuffer=n;var i=t("./bufferish")},{"./bufferish":8}],18:[function(t,r,e){function n(t){t.addExtPacker(14,Error,[u,i]),t.addExtPacker(1,EvalError,[u,i]),t.addExtPacker(2,RangeError,[u,i]),t.addExtPacker(3,ReferenceError,[u,i]),t.addExtPacker(4,SyntaxError,[u,i]),t.addExtPacker(5,TypeError,[u,i]),t.addExtPacker(6,URIError,[u,i]),t.addExtPacker(10,RegExp,[f,i]),t.addExtPacker(11,Boolean,[o,i]),t.addExtPacker(12,String,[o,i]),t.addExtPacker(13,Date,[Number,i]),t.addExtPacker(15,Number,[o,i]),"undefined"!=typeof Uint8Array&&(t.addExtPacker(17,Int8Array,c),t.addExtPacker(18,Uint8Array,c),t.addExtPacker(19,Int16Array,c),t.addExtPacker(20,Uint16Array,c),t.addExtPacker(21,Int32Array,c),t.addExtPacker(22,Uint32Array,c),t.addExtPacker(23,Float32Array,c),"undefined"!=typeof Float64Array&&t.addExtPacker(24,Float64Array,c),"undefined"!=typeof Uint8ClampedArray&&t.addExtPacker(25,Uint8ClampedArray,c),t.addExtPacker(26,ArrayBuffer,c),t.addExtPacker(29,DataView,c)),s.hasBuffer&&t.addExtPacker(27,Buffer,s.from)}function i(r){return a||(a=t("./encode").encode),a(r)}function o(t){return t.valueOf()}function f(t){t=RegExp.prototype.toString.call(t).split("/"),t.shift();var r=[t.pop()];return r.unshift(t.join("/")),r}function u(t){var r={};for(var e in h)r[e]=t[e];return r}e.setExtPackers=n;var a,s=t("./bufferish"),Buffer=s.global,c=s.Uint8Array.from,h={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1}},{"./bufferish":8,"./encode":15}],19:[function(t,r,e){function n(t){t.addExtUnpacker(14,[i,f(Error)]),t.addExtUnpacker(1,[i,f(EvalError)]),t.addExtUnpacker(2,[i,f(RangeError)]),t.addExtUnpacker(3,[i,f(ReferenceError)]),t.addExtUnpacker(4,[i,f(SyntaxError)]),t.addExtUnpacker(5,[i,f(TypeError)]),t.addExtUnpacker(6,[i,f(URIError)]),t.addExtUnpacker(10,[i,o]),t.addExtUnpacker(11,[i,u(Boolean)]),t.addExtUnpacker(12,[i,u(String)]),t.addExtUnpacker(13,[i,u(Date)]),t.addExtUnpacker(15,[i,u(Number)]),"undefined"!=typeof Uint8Array&&(t.addExtUnpacker(17,u(Int8Array)),t.addExtUnpacker(18,u(Uint8Array)),t.addExtUnpacker(19,[a,u(Int16Array)]),t.addExtUnpacker(20,[a,u(Uint16Array)]),t.addExtUnpacker(21,[a,u(Int32Array)]),t.addExtUnpacker(22,[a,u(Uint32Array)]),t.addExtUnpacker(23,[a,u(Float32Array)]),"undefined"!=typeof Float64Array&&t.addExtUnpacker(24,[a,u(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&t.addExtUnpacker(25,u(Uint8ClampedArray)),t.addExtUnpacker(26,a),t.addExtUnpacker(29,[a,u(DataView)])),c.hasBuffer&&t.addExtUnpacker(27,u(Buffer))}function i(r){return s||(s=t("./decode").decode),s(r)}function o(t){return RegExp.apply(null,t)}function f(t){return function(r){var e=new t;for(var n in h)e[n]=r[n];return e}}function u(t){return function(r){return new t(r)}}function a(t){return new Uint8Array(t).buffer}e.setExtUnpackers=n;var s,c=t("./bufferish"),Buffer=c.global,h={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1}},{"./bufferish":8,"./decode":12}],20:[function(t,r,e){t("./read-core"),t("./write-core"),e.createCodec=t("./codec-base").createCodec},{"./codec-base":9,"./read-core":22,"./write-core":25}],21:[function(t,r,e){function n(){if(!(this instanceof n))return new n}function i(){if(!(this instanceof i))return new i}function o(){function t(t){var r=this.offset?p.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=r?t?this.bufferish.concat([r,t]):r:t,this.offset=0}function r(){for(;this.offset<this.buffer.length;){var t,r=this.offset;try{t=this.fetch()}catch(t){if(t&&t.message!=v)throw t;this.offset=r;break}this.push(t)}}function e(t){var r=this.offset,e=r+t;if(e>this.buffer.length)throw new Error(v);return this.offset=e,r}return{bufferish:p,write:t,fetch:a,flush:r,push:c,pull:h,read:s,reserve:e,offset:0}}function f(){function t(){var t=this.start;if(t<this.offset){var r=this.start=this.offset;return p.prototype.slice.call(this.buffer,t,r)}}function r(){for(;this.start<this.offset;){var t=this.fetch();t&&this.push(t)}}function e(){var t=this.buffers||(this.buffers=[]),r=t.length>1?this.bufferish.concat(t):t[0];return t.length=0,r}function n(t){var r=0|t;if(this.buffer){var e=this.buffer.length,n=0|this.offset,i=n+r;if(i<e)return this.offset=i,n;this.flush(),t=Math.max(t,Math.min(2*e,this.maxBufferSize))}return t=Math.max(t,this.minBufferSize),this.buffer=this.bufferish.alloc(t),this.start=0,this.offset=r,0}function i(t){var r=t.length;if(r>this.minBufferSize)this.flush(),this.push(t);else{var e=this.reserve(r);p.prototype.copy.call(t,this.buffer,e)}}return{bufferish:p,write:u,fetch:t,flush:r,push:c,pull:e,read:s,reserve:n,send:i,maxBufferSize:y,minBufferSize:d,offset:0,start:0}}function u(){throw new Error("method not implemented: write()")}function a(){throw new Error("method not implemented: fetch()")}function s(){var t=this.buffers&&this.buffers.length;return t?(this.flush(),this.pull()):this.fetch()}function c(t){var r=this.buffers||(this.buffers=[]);r.push(t)}function h(){var t=this.buffers||(this.buffers=[]);return t.shift()}function l(t){function r(r){for(var e in t)r[e]=t[e];return r}return r}e.FlexDecoder=n,e.FlexEncoder=i;var p=t("./bufferish"),d=2048,y=65536,v="BUFFER_SHORTAGE";n.mixin=l(o()),n.mixin(n.prototype),i.mixin=l(f()),i.mixin(i.prototype)},{"./bufferish":8}],22:[function(t,r,e){function n(t){function r(t){var r=s(t),n=e[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(t)}var e=c.getReadToken(t);return r}function i(){var t=this.options;return this.decode=n(t),t&&t.preset&&a.setExtUnpackers(this),this}function o(t,r){var e=this.extUnpackers||(this.extUnpackers=[]);e[t]=h.filter(r)}function f(t){function r(r){return new u(r,t)}var e=this.extUnpackers||(this.extUnpackers=[]);return e[t]||r}var u=t("./ext-buffer").ExtBuffer,a=t("./ext-unpacker"),s=t("./read-format").readUint8,c=t("./read-token"),h=t("./codec-base");h.install({addExtUnpacker:o,getExtUnpacker:f,init:i}),e.preset=i.call(h.preset)},{"./codec-base":9,"./ext-buffer":17,"./ext-unpacker":19,"./read-format":23,"./read-token":24}],23:[function(t,r,e){function n(t){var r=k.hasArrayBuffer&&t&&t.binarraybuffer,e=t&&t.int64,n=T&&t&&t.usemap,B={map:n?o:i,array:f,str:u,bin:r?s:a,ext:c,uint8:h,uint16:p,uint32:y,uint64:g(8,e?E:b),int8:l,int16:d,int32:v,int64:g(8,e?A:w),float32:g(4,m),float64:g(8,x)};return B}function i(t,r){var e,n={},i=new Array(r),o=new Array(r),f=t.codec.decode;for(e=0;e<r;e++)i[e]=f(t),o[e]=f(t);for(e=0;e<r;e++)n[i[e]]=o[e];return n}function o(t,r){var e,n=new Map,i=new Array(r),o=new Array(r),f=t.codec.decode;for(e=0;e<r;e++)i[e]=f(t),o[e]=f(t);for(e=0;e<r;e++)n.set(i[e],o[e]);return n}function f(t,r){for(var e=new Array(r),n=t.codec.decode,i=0;i<r;i++)e[i]=n(t);return e}function u(t,r){var e=t.reserve(r),n=e+r;return _.toString.call(t.buffer,"utf-8",e,n)}function a(t,r){var e=t.reserve(r),n=e+r,i=_.slice.call(t.buffer,e,n);return k.from(i)}function s(t,r){var e=t.reserve(r),n=e+r,i=_.slice.call(t.buffer,e,n);return k.Uint8Array.from(i).buffer}function c(t,r){var e=t.reserve(r+1),n=t.buffer[e++],i=e+r,o=t.codec.getExtUnpacker(n);if(!o)throw new Error("Invalid ext type: "+(n?"0x"+n.toString(16):n));var f=_.slice.call(t.buffer,e,i);return o(f)}function h(t){var r=t.reserve(1);return t.buffer[r]}function l(t){var r=t.reserve(1),e=t.buffer[r];return 128&e?e-256:e}function p(t){var r=t.reserve(2),e=t.buffer;return e[r++]<<8|e[r]}function d(t){var r=t.reserve(2),e=t.buffer,n=e[r++]<<8|e[r];return 32768&n?n-65536:n}function y(t){var r=t.reserve(4),e=t.buffer;return 16777216*e[r++]+(e[r++]<<16)+(e[r++]<<8)+e[r]}function v(t){var r=t.reserve(4),e=t.buffer;return e[r++]<<24|e[r++]<<16|e[r++]<<8|e[r]}function g(t,r){return function(e){var n=e.reserve(t);return r.call(e.buffer,n,S)}}function b(t){return new P(this,t).toNumber()}function w(t){return new R(this,t).toNumber()}function E(t){return new P(this,t)}function A(t){return new R(this,t)}function m(t){return B.read(this,t,!1,23,4)}function x(t){return B.read(this,t,!1,52,8)}var B=t("ieee754"),U=t("int64-buffer"),P=U.Uint64BE,R=U.Int64BE;e.getReadFormat=n,e.readUint8=h;var k=t("./bufferish"),_=t("./bufferish-proto"),T="undefined"!=typeof Map,S=!0},{"./bufferish":8,"./bufferish-proto":6,ieee754:32,"int64-buffer":33}],24:[function(t,r,e){function n(t){var r=s.getReadFormat(t);return t&&t.useraw?o(r):i(r)}function i(t){var r,e=new Array(256);for(r=0;r<=127;r++)e[r]=f(r);for(r=128;r<=143;r++)e[r]=a(r-128,t.map);for(r=144;r<=159;r++)e[r]=a(r-144,t.array);for(r=160;r<=191;r++)e[r]=a(r-160,t.str);for(e[192]=f(null),e[193]=null,e[194]=f(!1),e[195]=f(!0),e[196]=u(t.uint8,t.bin),e[197]=u(t.uint16,t.bin),e[198]=u(t.uint32,t.bin),e[199]=u(t.uint8,t.ext),e[200]=u(t.uint16,t.ext),e[201]=u(t.uint32,t.ext),e[202]=t.float32,e[203]=t.float64,e[204]=t.uint8,e[205]=t.uint16,e[206]=t.uint32,e[207]=t.uint64,e[208]=t.int8,e[209]=t.int16,e[210]=t.int32,e[211]=t.int64,e[212]=a(1,t.ext),e[213]=a(2,t.ext),e[214]=a(4,t.ext),e[215]=a(8,t.ext),e[216]=a(16,t.ext),e[217]=u(t.uint8,t.str),e[218]=u(t.uint16,t.str),e[219]=u(t.uint32,t.str),e[220]=u(t.uint16,t.array),e[221]=u(t.uint32,t.array),e[222]=u(t.uint16,t.map),e[223]=u(t.uint32,t.map),r=224;r<=255;r++)e[r]=f(r-256);return e}function o(t){var r,e=i(t).slice();for(e[217]=e[196],e[218]=e[197],e[219]=e[198],r=160;r<=191;r++)e[r]=a(r-160,t.bin);return e}function f(t){return function(){return t}}function u(t,r){return function(e){var n=t(e);return r(e,n)}}function a(t,r){return function(e){return r(e,t)}}var s=t("./read-format");e.getReadToken=n},{"./read-format":23}],25:[function(t,r,e){function n(t){function r(t,r){var n=e[typeof r];if(!n)throw new Error('Unsupported type "'+typeof r+'": '+r);n(t,r)}var e=s.getWriteType(t);return r}function i(){var t=this.options;return this.encode=n(t),t&&t.preset&&a.setExtPackers(this),this}function o(t,r,e){function n(r){return e&&(r=e(r)),new u(r,t)}e=c.filter(e);var i=r.name;if(i&&"Object"!==i){var o=this.extPackers||(this.extPackers={});o[i]=n}else{var f=this.extEncoderList||(this.extEncoderList=[]);f.unshift([r,n])}}function f(t){var r=this.extPackers||(this.extPackers={}),e=t.constructor,n=e&&e.name&&r[e.name];if(n)return n;for(var i=this.extEncoderList||(this.extEncoderList=[]),o=i.length,f=0;f<o;f++){var u=i[f];if(e===u[0])return u[1]}}var u=t("./ext-buffer").ExtBuffer,a=t("./ext-packer"),s=t("./write-type"),c=t("./codec-base");c.install({addExtPacker:o,getExtPacker:f,init:i}),e.preset=i.call(c.preset)},{"./codec-base":9,"./ext-buffer":17,"./ext-packer":18,"./write-type":27}],26:[function(t,r,e){function n(t){return t&&t.uint8array?i():m||E.hasBuffer&&t&&t.safe?f():o()}function i(){var t=o();return t[202]=c(202,4,p),t[203]=c(203,8,d),t}function o(){var t=w.slice();return t[196]=u(196),t[197]=a(197),t[198]=s(198),t[199]=u(199),t[200]=a(200),t[201]=s(201),t[202]=c(202,4,x.writeFloatBE||p,!0),t[203]=c(203,8,x.writeDoubleBE||d,!0),t[204]=u(204),t[205]=a(205),t[206]=s(206),t[207]=c(207,8,h),t[208]=u(208),t[209]=a(209),t[210]=s(210),t[211]=c(211,8,l),t[217]=u(217),t[218]=a(218),t[219]=s(219),t[220]=a(220),t[221]=s(221),t[222]=a(222),t[223]=s(223),t}function f(){var t=w.slice();return t[196]=c(196,1,Buffer.prototype.writeUInt8),t[197]=c(197,2,Buffer.prototype.writeUInt16BE),t[198]=c(198,4,Buffer.prototype.writeUInt32BE),t[199]=c(199,1,Buffer.prototype.writeUInt8),t[200]=c(200,2,Buffer.prototype.writeUInt16BE),t[201]=c(201,4,Buffer.prototype.writeUInt32BE),t[202]=c(202,4,Buffer.prototype.writeFloatBE),t[203]=c(203,8,Buffer.prototype.writeDoubleBE),t[204]=c(204,1,Buffer.prototype.writeUInt8),t[205]=c(205,2,Buffer.prototype.writeUInt16BE),t[206]=c(206,4,Buffer.prototype.writeUInt32BE),t[207]=c(207,8,h),t[208]=c(208,1,Buffer.prototype.writeInt8),t[209]=c(209,2,Buffer.prototype.writeInt16BE),t[210]=c(210,4,Buffer.prototype.writeInt32BE),t[211]=c(211,8,l),t[217]=c(217,1,Buffer.prototype.writeUInt8),t[218]=c(218,2,Buffer.prototype.writeUInt16BE),t[219]=c(219,4,Buffer.prototype.writeUInt32BE),t[220]=c(220,2,Buffer.prototype.writeUInt16BE),t[221]=c(221,4,Buffer.prototype.writeUInt32BE),t[222]=c(222,2,Buffer.prototype.writeUInt16BE),t[223]=c(223,4,Buffer.prototype.writeUInt32BE),t}function u(t){return function(r,e){var n=r.reserve(2),i=r.buffer;i[n++]=t,i[n]=e}}function a(t){return function(r,e){var n=r.reserve(3),i=r.buffer;i[n++]=t,i[n++]=e>>>8,i[n]=e}}function s(t){return function(r,e){var n=r.reserve(5),i=r.buffer;i[n++]=t,i[n++]=e>>>24,i[n++]=e>>>16,i[n++]=e>>>8,i[n]=e}}function c(t,r,e,n){return function(i,o){var f=i.reserve(r+1);i.buffer[f++]=t,e.call(i.buffer,o,f,n)}}function h(t,r){new g(this,r,t)}function l(t,r){new b(this,r,t)}function p(t,r){y.write(this,t,r,!1,23,4)}function d(t,r){y.write(this,t,r,!1,52,8)}var y=t("ieee754"),v=t("int64-buffer"),g=v.Uint64BE,b=v.Int64BE,w=t("./write-uint8").uint8,E=t("./bufferish"),Buffer=E.global,A=E.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,m=A&&!Buffer.TYPED_ARRAY_SUPPORT,x=E.hasBuffer&&Buffer.prototype||{};e.getWriteToken=n},{"./bufferish":8,"./write-uint8":28,ieee754:32,"int64-buffer":33}],27:[function(t,r,e){function n(t){function r(t,r){var e=r?195:194;_[e](t,r)}function e(t,r){var e,n=0|r;return r!==n?(e=203,void _[e](t,r)):(e=-32<=n&&n<=127?255&n:0<=n?n<=255?204:n<=65535?205:206:-128<=n?208:-32768<=n?209:210,void _[e](t,n))}function n(t,r){var e=207;_[e](t,r.toArray())}function o(t,r){var e=211;_[e](t,r.toArray())}function v(t){return t<32?1:t<=255?2:t<=65535?3:5}function g(t){return t<32?1:t<=65535?3:5}function b(t){function r(r,e){var n=e.length,i=5+3*n;r.offset=r.reserve(i);var o=r.buffer,f=t(n),u=r.offset+f;n=s.write.call(o,e,u);var a=t(n);if(f!==a){var c=u+a-f,h=u+n;s.copy.call(o,o,c,u,h)}var l=1===a?160+n:a<=3?215+a:219;_[l](r,n),r.offset+=n}return r}function w(t,r){if(null===r)return A(t,r);if(I(r))return Y(t,r);if(i(r))return m(t,r);if(f.isUint64BE(r))return n(t,r);if(u.isInt64BE(r))return o(t,r);var e=t.codec.getExtPacker(r);return e&&(r=e(r)),r instanceof l?U(t,r):void D(t,r)}function E(t,r){return I(r)?k(t,r):void w(t,r)}function A(t,r){var e=192;_[e](t,r)}function m(t,r){var e=r.length,n=e<16?144+e:e<=65535?220:221;_[n](t,e);for(var i=t.codec.encode,o=0;o<e;o++)i(t,r[o])}function x(t,r){var e=r.length,n=e<255?196:e<=65535?197:198;_[n](t,e),t.send(r)}function B(t,r){x(t,new Uint8Array(r))}function U(t,r){var e=r.buffer,n=e.length,i=y[n]||(n<255?199:n<=65535?200:201);_[i](t,n),h[r.type](t),t.send(e)}function P(t,r){var e=Object.keys(r),n=e.length,i=n<16?128+n:n<=65535?222:223;_[i](t,n);var o=t.codec.encode;e.forEach(function(e){o(t,e),o(t,r[e])})}function R(t,r){if(!(r instanceof Map))return P(t,r);var e=r.size,n=e<16?128+e:e<=65535?222:223;_[n](t,e);var i=t.codec.encode;r.forEach(function(r,e,n){i(t,e),i(t,r)})}function k(t,r){var e=r.length,n=e<32?160+e:e<=65535?218:219;_[n](t,e),t.send(r)}var _=c.getWriteToken(t),T=t&&t.useraw,S=p&&t&&t.binarraybuffer,I=S?a.isArrayBuffer:a.isBuffer,Y=S?B:x,C=d&&t&&t.usemap,D=C?R:P,O={boolean:r,function:A,number:e,object:T?E:w,string:b(T?g:v),symbol:A,undefined:A};return O}var i=t("isarray"),o=t("int64-buffer"),f=o.Uint64BE,u=o.Int64BE,a=t("./bufferish"),s=t("./bufferish-proto"),c=t("./write-token"),h=t("./write-uint8").uint8,l=t("./ext-buffer").ExtBuffer,p="undefined"!=typeof Uint8Array,d="undefined"!=typeof Map,y=[];y[1]=212,y[2]=213,y[4]=214,y[8]=215,y[16]=216,e.getWriteType=n},{"./bufferish":8,"./bufferish-proto":6,"./ext-buffer":17,"./write-token":26,"./write-uint8":28,"int64-buffer":33,isarray:34}],28:[function(t,r,e){function n(t){return function(r){var e=r.reserve(1);r.buffer[e]=t}}for(var i=e.uint8=new Array(256),o=0;o<=255;o++)i[o]=n(o)},{}],29:[function(t,r,e){(function(r){"use strict";function n(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}function i(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(t,r){if(i()<r)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r),t.__proto__=Buffer.prototype):(null===t&&(t=new Buffer(r)),t.length=r),t}function Buffer(t,r,e){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(t,r,e);if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return s(this,t)}return f(this,t,r,e)}function f(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?l(t,r,e,n):"string"==typeof r?c(t,r,e):p(t,r)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function a(t,r,e,n){return u(r),r<=0?o(t,r):void 0!==e?"string"==typeof n?o(t,r).fill(e,n):o(t,r).fill(e):o(t,r)}function s(t,r){if(u(r),t=o(t,r<0?0:0|d(r)),!Buffer.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function c(t,r,e){if("string"==typeof e&&""!==e||(e="utf8"),!Buffer.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|v(r,e);t=o(t,n);var i=t.write(r,e);return i!==n&&(t=t.slice(0,i)),t}function h(t,r){var e=r.length<0?0:0|d(r.length);t=o(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function l(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),Buffer.TYPED_ARRAY_SUPPORT?(t=r,t.__proto__=Buffer.prototype):t=h(t,r),t}function p(t,r){if(Buffer.isBuffer(r)){var e=0|d(r.length);return t=o(t,e),0===t.length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||H(r.length)?o(t,0):h(t,r);if("Buffer"===r.type&&Q(r.data))return h(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function d(t){if(t>=i())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i().toString(16)+" bytes");return 0|t}function y(t){return+t!=t&&(t=0),Buffer.alloc(+t)}function v(t,r){if(Buffer.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return q(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return X(t).length;default:if(n)return q(t).length;r=(""+r).toLowerCase(),n=!0}}function g(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if(e>>>=0,r>>>=0,e<=r)return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,r,e);case"utf8":case"utf-8":return k(this,r,e);case"ascii":return T(this,r,e);case"latin1":case"binary":return S(this,r,e);case"base64":return R(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Y(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function b(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function w(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=Buffer.from(r,n)),Buffer.isBuffer(r))return 0===r.length?-1:E(t,r,e,n,i);if("number"==typeof r)return r=255&r,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):E(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function E(t,r,e,n,i){function o(t,r){return 1===f?t[r]:t.readUInt16BE(r*f)}var f=1,u=t.length,a=r.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;f=2,u/=2,a/=2,e/=2}var s;if(i){var c=-1;for(s=e;s<u;s++)if(o(t,s)===o(r,c===-1?0:s-c)){if(c===-1&&(c=s),s-c+1===a)return c*f}else c!==-1&&(s-=s-c),c=-1}else for(e+a>u&&(e=u-a),s=e;s>=0;s--){for(var h=!0,l=0;l<a;l++)if(o(t,s+l)!==o(r,l)){h=!1;break}if(h)return s}return-1}function A(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n),n>i&&(n=i)):n=i;var o=r.length;if(o%2!==0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var f=0;f<n;++f){var u=parseInt(r.substr(2*f,2),16);if(isNaN(u))return f;t[e+f]=u}return f}function m(t,r,e,n){return G(q(r,t.length-e),t,e,n)}function x(t,r,e,n){return G(W(r),t,e,n)}function B(t,r,e,n){return x(t,r,e,n)}function U(t,r,e,n){return G(X(r),t,e,n)}function P(t,r,e,n){return G(J(r,t.length-e),t,e,n)}function R(t,r,e){return 0===r&&e===t.length?Z.fromByteArray(t):Z.fromByteArray(t.slice(r,e))}function k(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o=t[i],f=null,u=o>239?4:o>223?3:o>191?2:1;if(i+u<=e){var a,s,c,h;switch(u){case 1:o<128&&(f=o);break;case 2:a=t[i+1],128===(192&a)&&(h=(31&o)<<6|63&a,h>127&&(f=h));break;case 3:a=t[i+1],s=t[i+2],128===(192&a)&&128===(192&s)&&(h=(15&o)<<12|(63&a)<<6|63&s,h>2047&&(h<55296||h>57343)&&(f=h));break;case 4:a=t[i+1],s=t[i+2],c=t[i+3],128===(192&a)&&128===(192&s)&&128===(192&c)&&(h=(15&o)<<18|(63&a)<<12|(63&s)<<6|63&c,h>65535&&h<1114112&&(f=h))}}null===f?(f=65533,u=1):f>65535&&(f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),i+=u}return _(n)}function _(t){var r=t.length;if(r<=$)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=$));return e}function T(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function S(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function I(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=V(t[o]);return i}function Y(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function C(t,r,e){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function D(t,r,e,n,i,o){if(!Buffer.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function O(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function L(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255}function M(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function N(t,r,e,n,i){return i||M(t,r,e,4,3.4028234663852886e38,-3.4028234663852886e38),K.write(t,r,e,n,23,4),e+4}function F(t,r,e,n,i){return i||M(t,r,e,8,1.7976931348623157e308,-1.7976931348623157e308),K.write(t,r,e,n,52,8),e+8}function j(t){
    if(t=z(t).replace(tt,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function z(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function q(t,r){r=r||1/0;for(var e,n=t.length,i=null,o=[],f=0;f<n;++f){if(e=t.charCodeAt(f),e>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=(i-55296<<10|e-56320)+65536}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function W(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function J(t,r){for(var e,n,i,o=[],f=0;f<t.length&&!((r-=2)<0);++f)e=t.charCodeAt(f),n=e>>8,i=e%256,o.push(i),o.push(n);return o}function X(t){return Z.toByteArray(j(t))}function G(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function H(t){return t!==t}var Z=t("base64-js"),K=t("ieee754"),Q=t("isarray");e.Buffer=Buffer,e.SlowBuffer=y,e.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==r.TYPED_ARRAY_SUPPORT?r.TYPED_ARRAY_SUPPORT:n(),e.kMaxLength=i(),Buffer.poolSize=8192,Buffer._augment=function(t){return t.__proto__=Buffer.prototype,t},Buffer.from=function(t,r,e){return f(null,t,r,e)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(t,r,e){return a(null,t,r,e)},Buffer.allocUnsafe=function(t){return s(null,t)},Buffer.allocUnsafeSlow=function(t){return s(null,t)},Buffer.isBuffer=function(t){return!(null==t||!t._isBuffer)},Buffer.compare=function(t,r){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(t,r){if(!Q(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return Buffer.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=Buffer.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var o=t[e];if(!Buffer.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},Buffer.byteLength=v,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)b(this,r,r+1);return this},Buffer.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)b(this,r,r+3),b(this,r+1,r+2);return this},Buffer.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)b(this,r,r+7),b(this,r+1,r+6),b(this,r+2,r+5),b(this,r+3,r+4);return this},Buffer.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?k(this,0,t):g.apply(this,arguments)},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t,r,e,n,i){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(r>>>=0,e>>>=0,n>>>=0,i>>>=0,this===t)return 0;for(var o=i-n,f=e-r,u=Math.min(o,f),a=this.slice(n,i),s=t.slice(r,e),c=0;c<u;++c)if(a[c]!==s[c]){o=a[c],f=s[c];break}return o<f?-1:f<o?1:0},Buffer.prototype.includes=function(t,r,e){return this.indexOf(t,r,e)!==-1},Buffer.prototype.indexOf=function(t,r,e){return w(this,t,r,e,!0)},Buffer.prototype.lastIndexOf=function(t,r,e){return w(this,t,r,e,!1)},Buffer.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r=0|r,isFinite(e)?(e=0|e,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return A(this,t,r,e);case"utf8":case"utf-8":return m(this,t,r,e);case"ascii":return x(this,t,r,e);case"latin1":case"binary":return B(this,t,r,e);case"base64":return U(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var $=4096;Buffer.prototype.slice=function(t,r){var e=this.length;t=~~t,r=void 0===r?e:~~r,t<0?(t+=e,t<0&&(t=0)):t>e&&(t=e),r<0?(r+=e,r<0&&(r=0)):r>e&&(r=e),r<t&&(r=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=this.subarray(t,r),n.__proto__=Buffer.prototype;else{var i=r-t;n=new Buffer(i,void 0);for(var o=0;o<i;++o)n[o]=this[o+t]}return n},Buffer.prototype.readUIntLE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},Buffer.prototype.readUIntBE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},Buffer.prototype.readUInt8=function(t,r){return r||C(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,r){return r||C(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,r){return r||C(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,r){return r||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,r){return r||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*r)),n},Buffer.prototype.readIntBE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*r)),o},Buffer.prototype.readInt8=function(t,r){return r||C(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},Buffer.prototype.readInt16LE=function(t,r){r||C(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},Buffer.prototype.readInt16BE=function(t,r){r||C(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},Buffer.prototype.readInt32LE=function(t,r){return r||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,r){return r||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,r){return r||C(t,4,this.length),K.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,r){return r||C(t,4,this.length),K.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,r){return r||C(t,8,this.length),K.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,r){return r||C(t,8,this.length),K.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,r,e,n){if(t=+t,r=0|r,e=0|e,!n){var i=Math.pow(2,8*e)-1;D(this,t,r,e,i,0)}var o=1,f=0;for(this[r]=255&t;++f<e&&(o*=256);)this[r+f]=t/o&255;return r+e},Buffer.prototype.writeUIntBE=function(t,r,e,n){if(t=+t,r=0|r,e=0|e,!n){var i=Math.pow(2,8*e)-1;D(this,t,r,e,i,0)}var o=e-1,f=1;for(this[r+o]=255&t;--o>=0&&(f*=256);)this[r+o]=t/f&255;return r+e},Buffer.prototype.writeUInt8=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},Buffer.prototype.writeUInt16LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):O(this,t,r,!0),r+2},Buffer.prototype.writeUInt16BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):O(this,t,r,!1),r+2},Buffer.prototype.writeUInt32LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):L(this,t,r,!0),r+4},Buffer.prototype.writeUInt32BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):L(this,t,r,!1),r+4},Buffer.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r=0|r,!n){var i=Math.pow(2,8*e-1);D(this,t,r,e,i-1,-i)}var o=0,f=1,u=0;for(this[r]=255&t;++o<e&&(f*=256);)t<0&&0===u&&0!==this[r+o-1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},Buffer.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r=0|r,!n){var i=Math.pow(2,8*e-1);D(this,t,r,e,i-1,-i)}var o=e-1,f=1,u=0;for(this[r+o]=255&t;--o>=0&&(f*=256);)t<0&&0===u&&0!==this[r+o+1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},Buffer.prototype.writeInt8=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},Buffer.prototype.writeInt16LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):O(this,t,r,!0),r+2},Buffer.prototype.writeInt16BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):O(this,t,r,!1),r+2},Buffer.prototype.writeInt32LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):L(this,t,r,!0),r+4},Buffer.prototype.writeInt32BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):L(this,t,r,!1),r+4},Buffer.prototype.writeFloatLE=function(t,r,e){return N(this,t,r,!0,e)},Buffer.prototype.writeFloatBE=function(t,r,e){return N(this,t,r,!1,e)},Buffer.prototype.writeDoubleLE=function(t,r,e){return F(this,t,r,!0,e)},Buffer.prototype.writeDoubleBE=function(t,r,e){return F(this,t,r,!1,e)},Buffer.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,o=n-e;if(this===t&&e<r&&r<n)for(i=o-1;i>=0;--i)t[i+r]=this[i+e];else if(o<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},Buffer.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t=255&t);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0);var o;if("number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var f=Buffer.isBuffer(t)?t:q(new Buffer(t,n).toString()),u=f.length;for(o=0;o<e-r;++o)this[o+r]=f[o%u]}return this};var tt=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":30,ieee754:32,isarray:34}],30:[function(t,r,e){"use strict";function n(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[r-2]?2:"="===t[r-1]?1:0}function i(t){return 3*t.length/4-n(t)}function o(t){var r,e,i,o,f,u,a=t.length;f=n(t),u=new h(3*a/4-f),i=f>0?a-4:a;var s=0;for(r=0,e=0;r<i;r+=4,e+=3)o=c[t.charCodeAt(r)]<<18|c[t.charCodeAt(r+1)]<<12|c[t.charCodeAt(r+2)]<<6|c[t.charCodeAt(r+3)],u[s++]=o>>16&255,u[s++]=o>>8&255,u[s++]=255&o;return 2===f?(o=c[t.charCodeAt(r)]<<2|c[t.charCodeAt(r+1)]>>4,u[s++]=255&o):1===f&&(o=c[t.charCodeAt(r)]<<10|c[t.charCodeAt(r+1)]<<4|c[t.charCodeAt(r+2)]>>2,u[s++]=o>>8&255,u[s++]=255&o),u}function f(t){return s[t>>18&63]+s[t>>12&63]+s[t>>6&63]+s[63&t]}function u(t,r,e){for(var n,i=[],o=r;o<e;o+=3)n=(t[o]<<16)+(t[o+1]<<8)+t[o+2],i.push(f(n));return i.join("")}function a(t){for(var r,e=t.length,n=e%3,i="",o=[],f=16383,a=0,c=e-n;a<c;a+=f)o.push(u(t,a,a+f>c?c:a+f));return 1===n?(r=t[e-1],i+=s[r>>2],i+=s[r<<4&63],i+="=="):2===n&&(r=(t[e-2]<<8)+t[e-1],i+=s[r>>10],i+=s[r>>4&63],i+=s[r<<2&63],i+="="),o.push(i),o.join("")}e.byteLength=i,e.toByteArray=o,e.fromByteArray=a;for(var s=[],c=[],h="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,d=l.length;p<d;++p)s[p]=l[p],c[l.charCodeAt(p)]=p;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},{}],31:[function(t,r,e){function n(){if(!(this instanceof n))return new n}!function(t){function e(t){for(var r in s)t[r]=s[r];return t}function n(t,r){return u(this,t).push(r),this}function i(t,r){function e(){o.call(n,t,e),r.apply(this,arguments)}var n=this;return e.originalListener=r,u(n,t).push(e),n}function o(t,r){function e(t){return t!==r&&t.originalListener!==r}var n,i=this;if(arguments.length){if(r){if(n=u(i,t,!0)){if(n=n.filter(e),!n.length)return o.call(i,t);i[a][t]=n}}else if(n=i[a],n&&(delete n[t],!Object.keys(n).length))return o.call(i)}else delete i[a];return i}function f(t,r){function e(t){t.call(o)}function n(t){t.call(o,r)}function i(t){t.apply(o,s)}var o=this,f=u(o,t,!0);if(!f)return!1;var a=arguments.length;if(1===a)f.forEach(e);else if(2===a)f.forEach(n);else{var s=Array.prototype.slice.call(arguments,1);f.forEach(i)}return!!f.length}function u(t,r,e){if(!e||t[a]){var n=t[a]||(t[a]={});return n[r]||(n[r]=[])}}"undefined"!=typeof r&&(r.exports=t);var a="listeners",s={on:n,once:i,off:o,emit:f};e(t.prototype),t.mixin=e}(n)},{}],32:[function(t,r,e){e.read=function(t,r,e,n,i){var o,f,u=8*i-n-1,a=(1<<u)-1,s=a>>1,c=-7,h=e?i-1:0,l=e?-1:1,p=t[r+h];for(h+=l,o=p&(1<<-c)-1,p>>=-c,c+=u;c>0;o=256*o+t[r+h],h+=l,c-=8);for(f=o&(1<<-c)-1,o>>=-c,c+=n;c>0;f=256*f+t[r+h],h+=l,c-=8);if(0===o)o=1-s;else{if(o===a)return f?NaN:(p?-1:1)*(1/0);f+=Math.pow(2,n),o-=s}return(p?-1:1)*f*Math.pow(2,o-n)},e.write=function(t,r,e,n,i,o){var f,u,a,s=8*o-i-1,c=(1<<s)-1,h=c>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,d=n?1:-1,y=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=c):(f=Math.floor(Math.log(r)/Math.LN2),r*(a=Math.pow(2,-f))<1&&(f--,a*=2),r+=f+h>=1?l/a:l*Math.pow(2,1-h),r*a>=2&&(f++,a/=2),f+h>=c?(u=0,f=c):f+h>=1?(u=(r*a-1)*Math.pow(2,i),f+=h):(u=r*Math.pow(2,h-1)*Math.pow(2,i),f=0));i>=8;t[e+p]=255&u,p+=d,u/=256,i-=8);for(f=f<<i|u,s+=i;s>0;t[e+p]=255&f,p+=d,f/=256,s-=8);t[e+p-d]|=128*y}},{}],33:[function(t,r,e){(function(Buffer){var t,r,n,i;!function(e){function o(t,r,n){function i(t,r,e,n){return this instanceof i?v(this,t,r,e,n):new i(t,r,e,n)}function o(t){return!(!t||!t[F])}function v(t,r,e,n,i){if(E&&A&&(r instanceof A&&(r=new E(r)),n instanceof A&&(n=new E(n))),!(r||e||n||g))return void(t.buffer=h(m,0));if(!s(r,e)){var o=g||Array;i=e,n=r,e=0,r=new o(8)}t.buffer=r,t.offset=e|=0,b!==typeof n&&("string"==typeof n?x(r,e,n,i||10):s(n,i)?c(r,e,n,i):"number"==typeof i?(k(r,e+T,n),k(r,e+S,i)):n>0?O(r,e,n):n<0?L(r,e,n):c(r,e,m,0))}function x(t,r,e,n){var i=0,o=e.length,f=0,u=0;"-"===e[0]&&i++;for(var a=i;i<o;){var s=parseInt(e[i++],n);if(!(s>=0))break;u=u*n+s,f=f*n+Math.floor(u/B),u%=B}a&&(f=~f,u?u=B-u:f++),k(t,r+T,f),k(t,r+S,u)}function P(){var t=this.buffer,r=this.offset,e=_(t,r+T),i=_(t,r+S);return n||(e|=0),e?e*B+i:i}function R(t){var r=this.buffer,e=this.offset,i=_(r,e+T),o=_(r,e+S),f="",u=!n&&2147483648&i;for(u&&(i=~i,o=B-o),t=t||10;;){var a=i%t*B+o;if(i=Math.floor(i/t),o=Math.floor(a/t),f=(a%t).toString(t)+f,!i&&!o)break}return u&&(f="-"+f),f}function k(t,r,e){t[r+D]=255&e,e>>=8,t[r+C]=255&e,e>>=8,t[r+Y]=255&e,e>>=8,t[r+I]=255&e}function _(t,r){return t[r+I]*U+(t[r+Y]<<16)+(t[r+C]<<8)+t[r+D]}var T=r?0:4,S=r?4:0,I=r?0:3,Y=r?1:2,C=r?2:1,D=r?3:0,O=r?l:d,L=r?p:y,M=i.prototype,N="is"+t,F="_"+N;return M.buffer=void 0,M.offset=0,M[F]=!0,M.toNumber=P,M.toString=R,M.toJSON=P,M.toArray=f,w&&(M.toBuffer=u),E&&(M.toArrayBuffer=a),i[N]=o,e[t]=i,i}function f(t){var r=this.buffer,e=this.offset;return g=null,t!==!1&&0===e&&8===r.length&&x(r)?r:h(r,e)}function u(t){var r=this.buffer,e=this.offset;if(g=w,t!==!1&&0===e&&8===r.length&&Buffer.isBuffer(r))return r;var n=new w(8);return c(n,0,r,e),n}function a(t){var r=this.buffer,e=this.offset,n=r.buffer;if(g=E,t!==!1&&0===e&&n instanceof A&&8===n.byteLength)return n;var i=new E(8);return c(i,0,r,e),i.buffer}function s(t,r){var e=t&&t.length;return r|=0,e&&r+8<=e&&"string"!=typeof t[r]}function c(t,r,e,n){r|=0,n|=0;for(var i=0;i<8;i++)t[r++]=255&e[n++]}function h(t,r){return Array.prototype.slice.call(t,r,r+8)}function l(t,r,e){for(var n=r+8;n>r;)t[--n]=255&e,e/=256}function p(t,r,e){var n=r+8;for(e++;n>r;)t[--n]=255&-e^255,e/=256}function d(t,r,e){for(var n=r+8;r<n;)t[r++]=255&e,e/=256}function y(t,r,e){var n=r+8;for(e++;r<n;)t[r++]=255&-e^255,e/=256}function v(t){return!!t&&"[object Array]"==Object.prototype.toString.call(t)}var g,b="undefined",w=b!==typeof Buffer&&Buffer,E=b!==typeof Uint8Array&&Uint8Array,A=b!==typeof ArrayBuffer&&ArrayBuffer,m=[0,0,0,0,0,0,0,0],x=Array.isArray||v,B=4294967296,U=16777216;t=o("Uint64BE",!0,!0),r=o("Int64BE",!0,!1),n=o("Uint64LE",!1,!0),i=o("Int64LE",!1,!1)}("object"==typeof e&&"string"!=typeof e.nodeName?e:this||{})}).call(this,t("buffer").Buffer)},{buffer:29}],34:[function(t,r,e){var n={}.toString;r.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},{}]},{},[1])(1)});

let lastSend = +new Date;
let lastRequests = [];
window.WebSocket.prototype.send = new Proxy(window.WebSocket.prototype.send, {
    apply: function() {
        let decoded = msgpack.decode(new Uint8Array(arguments[2][0]))

        console.log(+new Date - lastSend, lastRequests.length, decoded)
        if ( +new Date - lastSend > 500 ) (lastRequests = [], lastSend = +new Date);
        if ( lastRequests.length > 45 && decoded[0] != 'pp') return console.log("Anti Kick Are Stopped Kick");
        decoded[0] != 'pp' && lastRequests.push(decoded)

        return Reflect.apply(...arguments)
    }
});

var xhr = new XMLHttpRequest;
xhr.open("GET", document.URL, false);
xhr.send(null);
var content = xhr.responseText;
var doc = document.implementation.createHTMLDocument("" + (document.title || ""));
doc.open();
doc.write(content);
doc.close();
[...doc.getElementsByTagName("script")].find(e => e?.src.endsWith("bundle.js"))?.remove();
document.replaceChild(document.importNode(doc.documentElement, true), document.documentElement);

var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(``));
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
    heads[0].appendChild(node);
} else {
    document.documentElement.appendChild(node);
}

const pingDisplay = $("#pingDisplay");
pingDisplay.css("left", "110px");
pingDisplay.css("top", "10px");
pingDisplay.css("display", "block");
$("body").append(pingDisplay);

$("#menuCardHolder").append(`<div class='menuCard' id='guideCard'><div class='menuHeader'>
Wild Client Updates<br></div><div class='menuText'>
Fixed Replacer, Fixed Heal, Fixed Insta v1.2
<br>
Fixed Ab v1.1
<br>
Finally Maked Bow Insta stacked v1
<br>
Fixed Bull Tick v0.9, Tried Bow İnsta
<br>
Fixed Insta + Maked Insta Count v0.8
<br>
Deleted Poison Spam And Fixed Heal Again v0.7
<br>
Try Poison Spam v0.6
<br>
Added New Hats For Pvp v0.5
<br>
Fixed Autoplace v0.4
<br>
Fixed Replacer v0.3
<br>
Fixed Heal Added AntiBull v0.2
<br>
Just Maked The Script v0.1`);

let getWS = {
    io: undefined
};

function getws(wsAddress) {
    'use strict';

    let io = getWS.io;
    setInterval(()=>{
    }, 3000 - window.pingTime);

}

$("#scoreDisplay").css({
                "background-image": "url(../img/resources/gold_ico.png)",
                "background-position": "right 6px center",
                right: "20px",
                bottom: "185px",
                "padding-left": "10px",
                "padding-right": "40px",
                left: "inherit",
            });
            document.getElementById("resDisplay").appendChild(killCounter);
            $("#killCounter").css({
                bottom: "240px",
                right: "20px",
                display: "block",
            });


document.getElementById("mapDisplay").style.borderRadius = "10px";
document.getElementById("foodDisplay").style.borderRadius = "10px";
document.getElementById("woodDisplay").style.borderRadius = "10px";
document.getElementById("stoneDisplay").style.borderRadius = "10px";
document.getElementById("scoreDisplay").style.borderRadius = "10px";
document.getElementById("killCounter").style.borderRadius = "10px";

document.getElementById("mapDisplay").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
document.getElementById("foodDisplay").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
document.getElementById("woodDisplay").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
document.getElementById("stoneDisplay").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
document.getElementById("scoreDisplay").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
document.getElementById("killCounter").style.backgroundColor = "rgba(0, 0, 0, 0.6)";

document.getElementById("foodDisplay").style.color = '#c7e9f9'
document.getElementById("woodDisplay").style.color = '#c7e9f9'
document.getElementById("stoneDisplay").style.color = '#c7e9f9'
document.getElementById("scoreDisplay").style.color = '#c7e9f9'
document.getElementById("killCounter").style.color = '#c7e9f9'

document.getElementById('leaderboard').style.color = '#e2f1f1'
document.getElementById('leaderboard').style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
document.getElementById('leaderboard').style.borderRadius = '10px'

document.getElementById('allianceButton').style.borderRadius = '10px'
document.getElementById('storeButton').style.borderRadius = '10px'
document.getElementById('allianceButton').style.backgroundColor = "rgba(0, 0, 0, 0.6)"
document.getElementById('storeButton').style.backgroundColor = "rgba(0, 0, 0, 0.6)"
document.getElementById('allianceButton').style.color = '#c7e9f9'
document.getElementById('storeButton').style.color = '#c7e9f9'
document.getElementById('chatBox').placeholder = ""
document.getElementById('chatBox').style.backgroundColor = "rgba(0, 0, 0, 0.6)"

document.getElementById('ageBar').style.backgroundColor = 'rgba(0, 0, 0, 0.6)'

var modLogs = [];

var menu = document.createElement("div");
menu.id = "menu";
menu.style = `
        position: absolute;
        left: 1%;
        top: 1%;
        overflow-y: scroll;
        margin: 5px;
        padding: 5px;
        width: 500px;
        height: 500px;
        background-color: #bdbfde;
        color: black;
        font-family: 'VT323', sans-serif;
        font-size: 24px;
        border-radius: 6px;
        `;
function toggleUI() {
    $("#gameUI").toggle();
};
menu.innerHTML = `
        <head>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
        </head>
        <button id="TogUI" style="font-family: 'VT323', sans-serif; cursor: pointer; background-color: #bdbfde; font-size: 24px;">
        Toggle Game UI
        </button>
        <br>
        Vis's
        <br>
        <input type = "checkbox" id = "shame">
        SC
        <br>
        <input type = "checkbox" id = "reload1">
        WRB1
        <br>
        <input type = "checkbox" id = "reload2">
        TRB1
        <br>
        <input type = "checkbox" id = "buildHp">
        BLHP
        <br>
        <input type = "checkbox" id = "hatOp">
        HTOP
        <br>
        <input type = "checkbox" id = "damageout">
        DMGOUT
        <br>
        <input type = "checkbox" id = "dmgcal">
        DMGCALCULATE
        <br>
        <input type = "checkbox" id = "textcolr">
        TCOLOR
        <br>
        <input type = "checkbox" id = "objectt">
        OBJALPHA
        <br>
        <br>
        Pvp's
        <br>
        <input type = "checkbox" checked id = "antib">
        antibull
        <br>
        <input type = "checkbox" checked id = "autob">
        autobullspam
        <br>
        <input type = "checkbox" checked id = "spin">
        autospin
        <br>
        <br>
        Auto's
        <br>
        <input type = "checkbox" checked id = "plc1">
        autpc
        <br>
        <input type = "checkbox" checked id = "plc2">
        autrpc
        <br>
        <input type = "checkbox" id = "autgr">
        autogrind
        <br>
    ${generateNewList("song:", "chatType", [
    [0, "League of Legends - Take Over"],
    [1, "Inital D - Dont Stand So Close"],
    [2, "Warriors - Imagine Dragons"],
    [3, "Ken Blast - The Top"],
    [4, "Neffex - Grateful"],
    [5, "Benzz - Je M'appelle"]
])}<br>
<br>
<br>
For Normal:
    ${generateNewList("Auto Place Type For Normal:", "autopfn", [
    [0, "Trap"],
    [1, "Boost"]
])};
<br>
<br>
<br>`;
document.body.prepend(menu);

document.getElementById("TogUI").onclick = toggleUI;

function generateNewList(label, id, configs) {
    let content = `${label} <select style="background-color: #bdbfde; font-size: 24px; font-family: 'VT323', sans-serif" id="${id}">`;
    for(let i = 0; i < configs.length; i++) {
        content += `<option style="background-color: #bdbfde; font-size: 24px; font-family: 'VT323', sans-serif" value="${configs[i][0]}">${configs[i][1]}</option>`;
    }
    content += `</select>`;
    return content;
}

// GET PACKET LIMIT:
var packetLimit = 3000;
var packetCount = 0;
setInterval(() => {
    packetCount = 0;
    console.log("Packet Count Are 0")
}, 60000);

function getEl(id) {
    return document.getElementById(id);
}

let tmpAddress;
let wsconnected = 0;

function bConnect(token) {

    let o = token && (new WebSocket(tmpAddress + "&token=" + encodeURIComponent(token)));
    o.binaryType = "arraybuffer";

    o.id = null;

    function wsSend(ms) {
        o.send(new Uint8Array(Array.from(window.msgpack.encode(ms))));
    }

    function botSpawn() {
        wsSend(["sp", [{
            name: "test bot or h",
            moofoll: 1,
            skin: "constructor"
        }]]);
        setTimeout(()=>{
            plc();
        }, 1000);
    }
    function plc() {
        wsSend(["5", [0]]);
        wsSend(["c", [1]]);
        wsSend(["5", [0, true]]);
    }

    o.onmessage = function (ms) {
        let tmpData = window.msgpack.decode(new Uint8Array(ms.data));
        let data;
        if (tmpData.length > 1) {
            data = [tmpData[0], ...tmpData[1]];
            if (data[1] instanceof Array) {
                data = data;
            }
        } else {
            data = tmpData;
        }
        let item = data[0];
        if (!data) return;
        if (data[0] == "1" && o.id == null) {
            o.id = data[1];
        }
        if (data[0] == "11") {
            botSpawn();
        }
        if (data[0] == "33") {
            for (let i = 0; i < data[1].length / 13; i++) {
                let players = data[1].slice(13 * i, 13 * i + 13);
                if (players[0] == o.id) {
                    o.id = players[0];
                }
            }
        }
        if (data[0] == "h" && data[1] == o.id) {
            if(data[2] < 100){
                setTimeout(()=>{
                }, 120);
            }
        }
    }
    o.onopen = function () {
        wsconnected++;
        botSpawn();
    }
}

/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId]) {
            /******/ 			return installedModules[moduleId].exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
        /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ 		}
        /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
        /******/ 		if(mode & 1) value = __webpack_require__(value);
        /******/ 		if(mode & 8) return value;
        /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/ 		var ns = Object.create(null);
        /******/ 		__webpack_require__.r(ns);
        /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
        /******/ 		return ns;
        /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
        /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
    /******/ })
/************************************************************************/
/******/ ({

    /***/ "./node_modules/bad-words/lib/badwords.js":
    /*!************************************************!*\
  !*** ./node_modules/bad-words/lib/badwords.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        const localList = __webpack_require__(/*! ./lang.json */ "./node_modules/bad-words/lib/lang.json").words;
        const baseList = __webpack_require__(/*! badwords-list */ "./node_modules/badwords-list/lib/index.js").array;

        class Filter {

            /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   */
            constructor(options = {}) {
                Object.assign(this, {
                    list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
                    exclude: options.exclude || [],
                    placeHolder: options.placeHolder || '*',
                    regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
                    replaceRegex: options.replaceRegex || /\w/g
                })
            }

            /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
            isProfane(string) {
                return this.list
                    .filter((word) => {
                    const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
                    return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
                })
                    .length > 0 || false;
            }

            /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
            replaceWord(string) {
                return string
                    .replace(this.regex, '')
                    .replace(this.replaceRegex, this.placeHolder);
            }

            /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
            clean(string) {
                return string.split(/\b/).map((word) => {
                    return this.isProfane(word) ? this.replaceWord(word) : word;
                }).join('');
            }

            /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
            addWords() {
                let words = Array.from(arguments);

                this.list.push(...words);

                words
                    .map(word => word.toLowerCase())
                    .forEach((word) => {
                    if (this.exclude.includes(word)) {
                        this.exclude.splice(this.exclude.indexOf(word), 1);
                    }
                });
            }

            /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
            removeWords() {
                this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
            }
        }

        module.exports = Filter;

        /***/ }),

    /***/ "./node_modules/bad-words/lib/lang.json":
    /*!**********************************************!*\
  !*** ./node_modules/bad-words/lib/lang.json ***!
  \**********************************************/
    /*! exports provided: words, default */
    /***/ (function(module) {

        module.exports = {"words":["ahole","anus","ash0le","ash0les","asholes","ass","Ass Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f u c k","f u c k e r","fag","fag1t","faget","fagg1t","faggit","faggot","fagg0t","fagit","fags","fagz","faig","faigs","fart","flipping the bird","fuck","fucker","fuckin","fucking","fucks","Fudge Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha Fucker","Motha Fuker","Motha Fukkah","Motha Fukker","Mother Fucker","Mother Fukah","Mother Fuker","Mother Fukkah","Mother Fukker","mother-fucker","Mutha Fucker","Mutha Fukah","Mutha Fuker","Mutha Fukkah","Mutha Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","queer","queers","queerz","qweers","qweerz","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slag","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","lesbian","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah"]};

        /***/ }),

    /***/ "./node_modules/badwords-list/lib/array.js":
    /*!*************************************************!*\
  !*** ./node_modules/badwords-list/lib/array.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

        /***/ }),

    /***/ "./node_modules/badwords-list/lib/index.js":
    /*!*************************************************!*\
  !*** ./node_modules/badwords-list/lib/index.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        module.exports = {
            object: __webpack_require__(/*! ./object */ "./node_modules/badwords-list/lib/object.js"),
            array: __webpack_require__(/*! ./array */ "./node_modules/badwords-list/lib/array.js"),
            regex: __webpack_require__(/*! ./regexp */ "./node_modules/badwords-list/lib/regexp.js")
        };

        /***/ }),

    /***/ "./node_modules/badwords-list/lib/object.js":
    /*!**************************************************!*\
  !*** ./node_modules/badwords-list/lib/object.js ***!
  \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = {"4r5e": 1, "5h1t": 1, "5hit": 1, "a55": 1, "anal": 1, "anus": 1, "ar5e": 1, "arrse": 1, "arse": 1, "ass": 1, "ass-fucker": 1, "asses": 1, "assfucker": 1, "assfukka": 1, "asshole": 1, "assholes": 1, "asswhole": 1, "a_s_s": 1, "b!tch": 1, "b00bs": 1, "b17ch": 1, "b1tch": 1, "ballbag": 1, "balls": 1, "ballsack": 1, "bastard": 1, "beastial": 1, "beastiality": 1, "bellend": 1, "bestial": 1, "bestiality": 1, "bi+ch": 1, "biatch": 1, "bitch": 1, "bitcher": 1, "bitchers": 1, "bitches": 1, "bitchin": 1, "bitching": 1, "bloody": 1, "blow job": 1, "blowjob": 1, "blowjobs": 1, "boiolas": 1, "bollock": 1, "bollok": 1, "boner": 1, "boob": 1, "boobs": 1, "booobs": 1, "boooobs": 1, "booooobs": 1, "booooooobs": 1, "breasts": 1, "buceta": 1, "bugger": 1, "bum": 1, "bunny fucker": 1, "butt": 1, "butthole": 1, "buttmuch": 1, "buttplug": 1, "c0ck": 1, "c0cksucker": 1, "carpet muncher": 1, "cawk": 1, "chink": 1, "cipa": 1, "cl1t": 1, "clit": 1, "clitoris": 1, "clits": 1, "cnut": 1, "cock": 1, "cock-sucker": 1, "cockface": 1, "cockhead": 1, "cockmunch": 1, "cockmuncher": 1, "cocks": 1, "cocksuck": 1, "cocksucked": 1, "cocksucker": 1, "cocksucking": 1, "cocksucks": 1, "cocksuka": 1, "cocksukka": 1, "cok": 1, "cokmuncher": 1, "coksucka": 1, "coon": 1, "cox": 1, "crap": 1, "cum": 1, "cummer": 1, "cumming": 1, "cums": 1, "cumshot": 1, "cunilingus": 1, "cunillingus": 1, "cunnilingus": 1, "cunt": 1, "cuntlick": 1, "cuntlicker": 1, "cuntlicking": 1, "cunts": 1, "cyalis": 1, "cyberfuc": 1, "cyberfuck": 1, "cyberfucked": 1, "cyberfucker": 1, "cyberfuckers": 1, "cyberfucking": 1, "d1ck": 1, "damn": 1, "dick": 1, "dickhead": 1, "dildo": 1, "dildos": 1, "dink": 1, "dinks": 1, "dirsa": 1, "dlck": 1, "dog-fucker": 1, "doggin": 1, "dogging": 1, "donkeyribber": 1, "doosh": 1, "duche": 1, "dyke": 1, "ejaculate": 1, "ejaculated": 1, "ejaculates": 1, "ejaculating": 1, "ejaculatings": 1, "ejaculation": 1, "ejakulate": 1, "f u c k": 1, "f u c k e r": 1, "f4nny": 1, "fag": 1, "fagging": 1, "faggitt": 1, "faggot": 1, "faggs": 1, "fagot": 1, "fagots": 1, "fags": 1, "fanny": 1, "fannyflaps": 1, "fannyfucker": 1, "fanyy": 1, "fatass": 1, "fcuk": 1, "fcuker": 1, "fcuking": 1, "feck": 1, "fecker": 1, "felching": 1, "fellate": 1, "fellatio": 1, "fingerfuck": 1, "fingerfucked": 1, "fingerfucker": 1, "fingerfuckers": 1, "fingerfucking": 1, "fingerfucks": 1, "fistfuck": 1, "fistfucked": 1, "fistfucker": 1, "fistfuckers": 1, "fistfucking": 1, "fistfuckings": 1, "fistfucks": 1, "flange": 1, "fook": 1, "fooker": 1, "fuck": 1, "fucka": 1, "fucked": 1, "fucker": 1, "fuckers": 1, "fuckhead": 1, "fuckheads": 1, "fuckin": 1, "fucking": 1, "fuckings": 1, "fuckingshitmotherfucker": 1, "fuckme": 1, "fucks": 1, "fuckwhit": 1, "fuckwit": 1, "fudge packer": 1, "fudgepacker": 1, "fuk": 1, "fuker": 1, "fukker": 1, "fukkin": 1, "fuks": 1, "fukwhit": 1, "fukwit": 1, "fux": 1, "fux0r": 1, "f_u_c_k": 1, "gangbang": 1, "gangbanged": 1, "gangbangs": 1, "gaylord": 1, "gaysex": 1, "goatse": 1, "God": 1, "god-dam": 1, "god-damned": 1, "goddamn": 1, "goddamned": 1, "hardcoresex": 1, "hell": 1, "heshe": 1, "hoar": 1, "hoare": 1, "hoer": 1, "homo": 1, "hore": 1, "horniest": 1, "horny": 1, "hotsex": 1, "jack-off": 1, "jackoff": 1, "jap": 1, "jerk-off": 1, "jism": 1, "jiz": 1, "jizm": 1, "jizz": 1, "kawk": 1, "knob": 1, "knobead": 1, "knobed": 1, "knobend": 1, "knobhead": 1, "knobjocky": 1, "knobjokey": 1, "kock": 1, "kondum": 1, "kondums": 1, "kum": 1, "kummer": 1, "kumming": 1, "kums": 1, "kunilingus": 1, "l3i+ch": 1, "l3itch": 1, "labia": 1, "lust": 1, "lusting": 1, "m0f0": 1, "m0fo": 1, "m45terbate": 1, "ma5terb8": 1, "ma5terbate": 1, "masochist": 1, "master-bate": 1, "masterb8": 1, "masterbat*": 1, "masterbat3": 1, "masterbate": 1, "masterbation": 1, "masterbations": 1, "masturbate": 1, "mo-fo": 1, "mof0": 1, "mofo": 1, "mothafuck": 1, "mothafucka": 1, "mothafuckas": 1, "mothafuckaz": 1, "mothafucked": 1, "mothafucker": 1, "mothafuckers": 1, "mothafuckin": 1, "mothafucking": 1, "mothafuckings": 1, "mothafucks": 1, "mother fucker": 1, "motherfuck": 1, "motherfucked": 1, "motherfucker": 1, "motherfuckers": 1, "motherfuckin": 1, "motherfucking": 1, "motherfuckings": 1, "motherfuckka": 1, "motherfucks": 1, "muff": 1, "mutha": 1, "muthafecker": 1, "muthafuckker": 1, "muther": 1, "mutherfucker": 1, "n1gga": 1, "n1gger": 1, "nazi": 1, "nigg3r": 1, "nigg4h": 1, "nigga": 1, "niggah": 1, "niggas": 1, "niggaz": 1, "nigger": 1, "niggers": 1, "nob": 1, "nob jokey": 1, "nobhead": 1, "nobjocky": 1, "nobjokey": 1, "numbnuts": 1, "nutsack": 1, "orgasim": 1, "orgasims": 1, "orgasm": 1, "orgasms": 1, "p0rn": 1, "pawn": 1, "pecker": 1, "penis": 1, "penisfucker": 1, "phonesex": 1, "phuck": 1, "phuk": 1, "phuked": 1, "phuking": 1, "phukked": 1, "phukking": 1, "phuks": 1, "phuq": 1, "pigfucker": 1, "pimpis": 1, "piss": 1, "pissed": 1, "pisser": 1, "pissers": 1, "pisses": 1, "pissflaps": 1, "pissin": 1, "pissing": 1, "pissoff": 1, "poop": 1, "porn": 1, "porno": 1, "pornography": 1, "pornos": 1, "prick": 1, "pricks": 1, "pron": 1, "pube": 1, "pusse": 1, "pussi": 1, "pussies": 1, "pussy": 1, "pussys": 1, "rectum": 1, "retard": 1, "rimjaw": 1, "rimming": 1, "s hit": 1, "s.o.b.": 1, "sadist": 1, "schlong": 1, "screwing": 1, "scroat": 1, "scrote": 1, "scrotum": 1, "semen": 1, "sex": 1, "sh!+": 1, "sh!t": 1, "sh1t": 1, "shag": 1, "shagger": 1, "shaggin": 1, "shagging": 1, "shemale": 1, "shi+": 1, "shit": 1, "shitdick": 1, "shite": 1, "shited": 1, "shitey": 1, "shitfuck": 1, "shitfull": 1, "shithead": 1, "shiting": 1, "shitings": 1, "shits": 1, "shitted": 1, "shitter": 1, "shitters": 1, "shitting": 1, "shittings": 1, "shitty": 1, "skank": 1, "slut": 1, "sluts": 1, "smegma": 1, "smut": 1, "snatch": 1, "son-of-a-bitch": 1, "spac": 1, "spunk": 1, "s_h_i_t": 1, "t1tt1e5": 1, "t1tties": 1, "teets": 1, "teez": 1, "testical": 1, "testicle": 1, "tit": 1, "titfuck": 1, "tits": 1, "titt": 1, "tittie5": 1, "tittiefucker": 1, "titties": 1, "tittyfuck": 1, "tittywank": 1, "titwank": 1, "tosser": 1, "turd": 1, "tw4t": 1, "twat": 1, "twathead": 1, "twatty": 1, "twunt": 1, "twunter": 1, "v14gra": 1, "v1gra": 1, "vagina": 1, "viagra": 1, "vulva": 1, "w00se": 1, "wang": 1, "wank": 1, "wanker": 1, "wanky": 1, "whoar": 1, "whore": 1, "willies": 1, "willy": 1, "xrated": 1, "xxx": 1};

        /***/ }),

    /***/ "./node_modules/badwords-list/lib/regexp.js":
    /*!**************************************************!*\
  !*** ./node_modules/badwords-list/lib/regexp.js ***!
  \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;

        /***/ }),

    /***/ "./node_modules/base64-js/index.js":
    /*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        exports.byteLength = byteLength
        exports.toByteArray = toByteArray
        exports.fromByteArray = fromByteArray

        var lookup = []
        var revLookup = []
        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

        var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
        for (var i = 0, len = code.length; i < len; ++i) {
            lookup[i] = code[i]
            revLookup[code.charCodeAt(i)] = i
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup['-'.charCodeAt(0)] = 62
        revLookup['_'.charCodeAt(0)] = 63

        function getLens (b64) {
            var len = b64.length

            if (len % 4 > 0) {
                throw new Error('Invalid string. Length must be a multiple of 4')
            }

            // Trim off extra bytes after placeholder bytes are found
            // See: https://github.com/beatgammit/base64-js/issues/42
            var validLen = b64.indexOf('=')
            if (validLen === -1) validLen = len

            var placeHoldersLen = validLen === len
            ? 0
            : 4 - (validLen % 4)

            return [validLen, placeHoldersLen]
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength (b64) {
            var lens = getLens(b64)
            var validLen = lens[0]
            var placeHoldersLen = lens[1]
            return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
        }

        function _byteLength (b64, validLen, placeHoldersLen) {
            return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
        }

        function toByteArray (b64) {
            var tmp
            var lens = getLens(b64)
            var validLen = lens[0]
            var placeHoldersLen = lens[1]

            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

            var curByte = 0

            // if there are placeholders, only get up to the last complete 4 chars
            var len = placeHoldersLen > 0
            ? validLen - 4
            : validLen

            var i
            for (i = 0; i < len; i += 4) {
                tmp =
                    (revLookup[b64.charCodeAt(i)] << 18) |
                    (revLookup[b64.charCodeAt(i + 1)] << 12) |
                    (revLookup[b64.charCodeAt(i + 2)] << 6) |
                    revLookup[b64.charCodeAt(i + 3)]
                arr[curByte++] = (tmp >> 16) & 0xFF
                arr[curByte++] = (tmp >> 8) & 0xFF
                arr[curByte++] = tmp & 0xFF
            }

            if (placeHoldersLen === 2) {
                tmp =
                    (revLookup[b64.charCodeAt(i)] << 2) |
                    (revLookup[b64.charCodeAt(i + 1)] >> 4)
                arr[curByte++] = tmp & 0xFF
            }

            if (placeHoldersLen === 1) {
                tmp =
                    (revLookup[b64.charCodeAt(i)] << 10) |
                    (revLookup[b64.charCodeAt(i + 1)] << 4) |
                    (revLookup[b64.charCodeAt(i + 2)] >> 2)
                arr[curByte++] = (tmp >> 8) & 0xFF
                arr[curByte++] = tmp & 0xFF
            }

            return arr
        }

        function tripletToBase64 (num) {
            return lookup[num >> 18 & 0x3F] +
                lookup[num >> 12 & 0x3F] +
                lookup[num >> 6 & 0x3F] +
                lookup[num & 0x3F]
        }

        function encodeChunk (uint8, start, end) {
            var tmp
            var output = []
            for (var i = start; i < end; i += 3) {
                tmp =
                    ((uint8[i] << 16) & 0xFF0000) +
                    ((uint8[i + 1] << 8) & 0xFF00) +
                    (uint8[i + 2] & 0xFF)
                output.push(tripletToBase64(tmp))
            }
            return output.join('')
        }

        function fromByteArray (uint8) {
            var tmp
            var len = uint8.length
            var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
            var parts = []
            var maxChunkLength = 16383 // must be multiple of 3

            // go through the array every three bytes, we'll deal with trailing stuff later
            for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                parts.push(encodeChunk(
                    uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
                ))
            }

            // pad the end with zeros, but make sure to not forget the extra bytes
            if (extraBytes === 1) {
                tmp = uint8[len - 1]
                parts.push(
                    lookup[tmp >> 2] +
                    lookup[(tmp << 4) & 0x3F] +
                    '=='
                )
            } else if (extraBytes === 2) {
                tmp = (uint8[len - 2] << 8) + uint8[len - 1]
                parts.push(
                    lookup[tmp >> 10] +
                    lookup[(tmp >> 4) & 0x3F] +
                    lookup[(tmp << 2) & 0x3F] +
                    '='
                )
            }

            return parts.join('')
        }


        /***/ }),

    /***/ "./node_modules/buffer/index.js":
    /*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        /* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
            /* eslint-disable no-proto */



            var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
            var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
            var isArray = __webpack_require__(/*! isarray */ "./node_modules/buffer/node_modules/isarray/index.js")

            exports.Buffer = Buffer
            exports.SlowBuffer = SlowBuffer
            exports.INSPECT_MAX_BYTES = 50

            /**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
            Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
                ? global.TYPED_ARRAY_SUPPORT
            : typedArraySupport()

            /*
 * Export kMaxLength after typed array support is determined.
 */
            exports.kMaxLength = kMaxLength()

            function typedArraySupport () {
                try {
                    var arr = new Uint8Array(1)
                    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
                    return arr.foo() === 42 && // typed array instances can be augmented
                        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
                        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
                } catch (e) {
                    return false
                }
            }

            function kMaxLength () {
                return Buffer.TYPED_ARRAY_SUPPORT
                    ? 0x7fffffff
                : 0x3fffffff
            }

            function createBuffer (that, length) {
                if (kMaxLength() < length) {
                    throw new RangeError('Invalid typed array length')
                }
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    // Return an augmented `Uint8Array` instance, for best performance
                    that = new Uint8Array(length)
                    that.__proto__ = Buffer.prototype
                } else {
                    // Fallback: Return an object instance of the Buffer class
                    if (that === null) {
                        that = new Buffer(length)
                    }
                    that.length = length
                }

                return that
            }

            /**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

            function Buffer (arg, encodingOrOffset, length) {
                if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
                    return new Buffer(arg, encodingOrOffset, length)
                }

                // Common case.
                if (typeof arg === 'number') {
                    if (typeof encodingOrOffset === 'string') {
                        throw new Error(
                            'If encoding is specified then the first argument must be a string'
                        )
                    }
                    return allocUnsafe(this, arg)
                }
                return from(this, arg, encodingOrOffset, length)
            }

            Buffer.poolSize = 8192 // not used by this implementation

            // TODO: Legacy, not needed anymore. Remove in next major version.
            Buffer._augment = function (arr) {
                arr.__proto__ = Buffer.prototype
                return arr
            }

            function from (that, value, encodingOrOffset, length) {
                if (typeof value === 'number') {
                    throw new TypeError('"value" argument must not be a number')
                }

                if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
                    return fromArrayBuffer(that, value, encodingOrOffset, length)
                }

                if (typeof value === 'string') {
                    return fromString(that, value, encodingOrOffset)
                }

                return fromObject(that, value)
            }

            /**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
            Buffer.from = function (value, encodingOrOffset, length) {
                return from(null, value, encodingOrOffset, length)
            }

            if (Buffer.TYPED_ARRAY_SUPPORT) {
                Buffer.prototype.__proto__ = Uint8Array.prototype
                Buffer.__proto__ = Uint8Array
                if (typeof Symbol !== 'undefined' && Symbol.species &&
                    Buffer[Symbol.species] === Buffer) {
                    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
                    Object.defineProperty(Buffer, Symbol.species, {
                        value: null,
                        configurable: true
                    })
                }
            }

            function assertSize (size) {
                if (typeof size !== 'number') {
                    throw new TypeError('"size" argument must be a number')
                } else if (size < 0) {
                    throw new RangeError('"size" argument must not be negative')
                }
            }

            function alloc (that, size, fill, encoding) {
                assertSize(size)
                if (size <= 0) {
                    return createBuffer(that, size)
                }
                if (fill !== undefined) {
                    // Only pay attention to encoding if it's a string. This
                    // prevents accidentally sending in a number that would
                    // be interpretted as a start offset.
                    return typeof encoding === 'string'
                        ? createBuffer(that, size).fill(fill, encoding)
                    : createBuffer(that, size).fill(fill)
                }
                return createBuffer(that, size)
            }

            /**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
            Buffer.alloc = function (size, fill, encoding) {
                return alloc(null, size, fill, encoding)
            }

            function allocUnsafe (that, size) {
                assertSize(size)
                that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
                if (!Buffer.TYPED_ARRAY_SUPPORT) {
                    for (var i = 0; i < size; ++i) {
                        that[i] = 0
                    }
                }
                return that
            }

            /**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
            Buffer.allocUnsafe = function (size) {
                return allocUnsafe(null, size)
            }
            /**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
            Buffer.allocUnsafeSlow = function (size) {
                return allocUnsafe(null, size)
            }

            function fromString (that, string, encoding) {
                if (typeof encoding !== 'string' || encoding === '') {
                    encoding = 'utf8'
                }

                if (!Buffer.isEncoding(encoding)) {
                    throw new TypeError('"encoding" must be a valid string encoding')
                }

                var length = byteLength(string, encoding) | 0
                that = createBuffer(that, length)

                var actual = that.write(string, encoding)

                if (actual !== length) {
                    // Writing a hex string, for example, that contains invalid characters will
                    // cause everything after the first invalid character to be ignored. (e.g.
                    // 'abxxcd' will be treated as 'ab')
                    that = that.slice(0, actual)
                }

                return that
            }

            function fromArrayLike (that, array) {
                var length = array.length < 0 ? 0 : checked(array.length) | 0
                that = createBuffer(that, length)
                for (var i = 0; i < length; i += 1) {
                    that[i] = array[i] & 255
                }
                return that
            }

            function fromArrayBuffer (that, array, byteOffset, length) {
                array.byteLength // this throws if `array` is not a valid ArrayBuffer

                if (byteOffset < 0 || array.byteLength < byteOffset) {
                    throw new RangeError('\'offset\' is out of bounds')
                }

                if (array.byteLength < byteOffset + (length || 0)) {
                    throw new RangeError('\'length\' is out of bounds')
                }

                if (byteOffset === undefined && length === undefined) {
                    array = new Uint8Array(array)
                } else if (length === undefined) {
                    array = new Uint8Array(array, byteOffset)
                } else {
                    array = new Uint8Array(array, byteOffset, length)
                }

                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    // Return an augmented `Uint8Array` instance, for best performance
                    that = array
                    that.__proto__ = Buffer.prototype
                } else {
                    // Fallback: Return an object instance of the Buffer class
                    that = fromArrayLike(that, array)
                }
                return that
            }

            function fromObject (that, obj) {
                if (Buffer.isBuffer(obj)) {
                    var len = checked(obj.length) | 0
                    that = createBuffer(that, len)

                    if (that.length === 0) {
                        return that
                    }

                    obj.copy(that, 0, 0, len)
                    return that
                }

                if (obj) {
                    if ((typeof ArrayBuffer !== 'undefined' &&
                         obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
                        if (typeof obj.length !== 'number' || isnan(obj.length)) {
                            return createBuffer(that, 0)
                        }
                        return fromArrayLike(that, obj)
                    }

                    if (obj.type === 'Buffer' && isArray(obj.data)) {
                        return fromArrayLike(that, obj.data)
                    }
                }

                throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
            }

            function checked (length) {
                // Note: cannot use `length < kMaxLength()` here because that fails when
                // length is NaN (which is otherwise coerced to zero.)
                if (length >= kMaxLength()) {
                    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
                }
                return length | 0
            }

            function SlowBuffer (length) {
                if (+length != length) { // eslint-disable-line eqeqeq
                    length = 0
                }
                return Buffer.alloc(+length)
            }

            Buffer.isBuffer = function isBuffer (b) {
                return !!(b != null && b._isBuffer)
            }

            Buffer.compare = function compare (a, b) {
                if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
                    throw new TypeError('Arguments must be Buffers')
                }

                if (a === b) return 0

                var x = a.length
                var y = b.length

                for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                    if (a[i] !== b[i]) {
                        x = a[i]
                        y = b[i]
                        break
                    }
                }

                if (x < y) return -1
                if (y < x) return 1
                return 0
            }

            Buffer.isEncoding = function isEncoding (encoding) {
                switch (String(encoding).toLowerCase()) {
                    case 'hex':
                    case 'utf8':
                    case 'utf-8':
                    case 'ascii':
                    case 'latin1':
                    case 'binary':
                    case 'base64':
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        return true
                    default:
                        return false
                }
            }

            Buffer.concat = function concat (list, length) {
                if (!isArray(list)) {
                    throw new TypeError('"list" argument must be an Array of Buffers')
                }

                if (list.length === 0) {
                    return Buffer.alloc(0)
                }

                var i
                if (length === undefined) {
                    length = 0
                    for (i = 0; i < list.length; ++i) {
                        length += list[i].length
                    }
                }

                var buffer = Buffer.allocUnsafe(length)
                var pos = 0
                for (i = 0; i < list.length; ++i) {
                    var buf = list[i]
                    if (!Buffer.isBuffer(buf)) {
                        throw new TypeError('"list" argument must be an Array of Buffers')
                    }
                    buf.copy(buffer, pos)
                    pos += buf.length
                }
                return buffer
            }

            function byteLength (string, encoding) {
                if (Buffer.isBuffer(string)) {
                    return string.length
                }
                if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
                    (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
                    return string.byteLength
                }
                if (typeof string !== 'string') {
                    string = '' + string
                }

                var len = string.length
                if (len === 0) return 0

                // Use a for loop to avoid recursion
                var loweredCase = false
                for (;;) {
                    switch (encoding) {
                        case 'ascii':
                        case 'latin1':
                        case 'binary':
                            return len
                        case 'utf8':
                        case 'utf-8':
                        case undefined:
                            return utf8ToBytes(string).length
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return len * 2
                        case 'hex':
                            return len >>> 1
                        case 'base64':
                            return base64ToBytes(string).length
                        default:
                            if (loweredCase) return utf8ToBytes(string).length // assume utf8
                            encoding = ('' + encoding).toLowerCase()
                            loweredCase = true
                    }
                }
            }
            Buffer.byteLength = byteLength

            function slowToString (encoding, start, end) {
                var loweredCase = false

                // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
                // property of a typed array.

                // This behaves neither like String nor Uint8Array in that we set start/end
                // to their upper/lower bounds if the value passed is out of range.
                // undefined is handled specially as per ECMA-262 6th Edition,
                // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
                if (start === undefined || start < 0) {
                    start = 0
                }
                // Return early if start > this.length. Done here to prevent potential uint32
                // coercion fail below.
                if (start > this.length) {
                    return ''
                }

                if (end === undefined || end > this.length) {
                    end = this.length
                }

                if (end <= 0) {
                    return ''
                }

                // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
                end >>>= 0
                start >>>= 0

                if (end <= start) {
                    return ''
                }

                if (!encoding) encoding = 'utf8'

                while (true) {
                    switch (encoding) {
                        case 'hex':
                            return hexSlice(this, start, end)

                        case 'utf8':
                        case 'utf-8':
                            return utf8Slice(this, start, end)

                        case 'ascii':
                            return asciiSlice(this, start, end)

                        case 'latin1':
                        case 'binary':
                            return latin1Slice(this, start, end)

                        case 'base64':
                            return base64Slice(this, start, end)

                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return utf16leSlice(this, start, end)

                        default:
                            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                            encoding = (encoding + '').toLowerCase()
                            loweredCase = true
                    }
                }
            }

            // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
            // Buffer instances.
            Buffer.prototype._isBuffer = true

            function swap (b, n, m) {
                var i = b[n]
                b[n] = b[m]
                b[m] = i
            }

            Buffer.prototype.swap16 = function swap16 () {
                var len = this.length
                if (len % 2 !== 0) {
                    throw new RangeError('Buffer size must be a multiple of 16-bits')
                }
                for (var i = 0; i < len; i += 2) {
                    swap(this, i, i + 1)
                }
                return this
            }

            Buffer.prototype.swap32 = function swap32 () {
                var len = this.length
                if (len % 4 !== 0) {
                    throw new RangeError('Buffer size must be a multiple of 32-bits')
                }
                for (var i = 0; i < len; i += 4) {
                    swap(this, i, i + 3)
                    swap(this, i + 1, i + 2)
                }
                return this
            }

            Buffer.prototype.swap64 = function swap64 () {
                var len = this.length
                if (len % 8 !== 0) {
                    throw new RangeError('Buffer size must be a multiple of 64-bits')
                }
                for (var i = 0; i < len; i += 8) {
                    swap(this, i, i + 7)
                    swap(this, i + 1, i + 6)
                    swap(this, i + 2, i + 5)
                    swap(this, i + 3, i + 4)
                }
                return this
            }

            Buffer.prototype.toString = function toString () {
                var length = this.length | 0
                if (length === 0) return ''
                if (arguments.length === 0) return utf8Slice(this, 0, length)
                return slowToString.apply(this, arguments)
            }

            Buffer.prototype.equals = function equals (b) {
                if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
                if (this === b) return true
                return Buffer.compare(this, b) === 0
            }

            Buffer.prototype.inspect = function inspect () {
                var str = ''
                var max = exports.INSPECT_MAX_BYTES
                if (this.length > 0) {
                    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
                    if (this.length > max) str += ' ... '
                }
                return '<Buffer ' + str + '>'
            }

            Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
                if (!Buffer.isBuffer(target)) {
                    throw new TypeError('Argument must be a Buffer')
                }

                if (start === undefined) {
                    start = 0
                }
                if (end === undefined) {
                    end = target ? target.length : 0
                }
                if (thisStart === undefined) {
                    thisStart = 0
                }
                if (thisEnd === undefined) {
                    thisEnd = this.length
                }

                if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                    throw new RangeError('out of range index')
                }

                if (thisStart >= thisEnd && start >= end) {
                    return 0
                }
                if (thisStart >= thisEnd) {
                    return -1
                }
                if (start >= end) {
                    return 1
                }

                start >>>= 0
                end >>>= 0
                thisStart >>>= 0
                thisEnd >>>= 0

                if (this === target) return 0

                var x = thisEnd - thisStart
                var y = end - start
                var len = Math.min(x, y)

                var thisCopy = this.slice(thisStart, thisEnd)
                var targetCopy = target.slice(start, end)

                for (var i = 0; i < len; ++i) {
                    if (thisCopy[i] !== targetCopy[i]) {
                        x = thisCopy[i]
                        y = targetCopy[i]
                        break
                    }
                }

                if (x < y) return -1
                if (y < x) return 1
                return 0
            }

            // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
            // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
            //
            // Arguments:
            // - buffer - a Buffer to search
            // - val - a string, Buffer, or number
            // - byteOffset - an index into `buffer`; will be clamped to an int32
            // - encoding - an optional encoding, relevant is val is a string
            // - dir - true for indexOf, false for lastIndexOf
            function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
                // Empty buffer means no match
                if (buffer.length === 0) return -1

                // Normalize byteOffset
                if (typeof byteOffset === 'string') {
                    encoding = byteOffset
                    byteOffset = 0
                } else if (byteOffset > 0x7fffffff) {
                    byteOffset = 0x7fffffff
                } else if (byteOffset < -0x80000000) {
                    byteOffset = -0x80000000
                }
                byteOffset = +byteOffset  // Coerce to Number.
                if (isNaN(byteOffset)) {
                    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
                    byteOffset = dir ? 0 : (buffer.length - 1)
                }

                // Normalize byteOffset: negative offsets start from the end of the buffer
                if (byteOffset < 0) byteOffset = buffer.length + byteOffset
                if (byteOffset >= buffer.length) {
                    if (dir) return -1
                    else byteOffset = buffer.length - 1
                } else if (byteOffset < 0) {
                    if (dir) byteOffset = 0
                    else return -1
                }

                // Normalize val
                if (typeof val === 'string') {
                    val = Buffer.from(val, encoding)
                }

                // Finally, search either indexOf (if dir is true) or lastIndexOf
                if (Buffer.isBuffer(val)) {
                    // Special case: looking for empty string/buffer always fails
                    if (val.length === 0) {
                        return -1
                    }
                    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
                } else if (typeof val === 'number') {
                    val = val & 0xFF // Search for a byte value [0-255]
                    if (Buffer.TYPED_ARRAY_SUPPORT &&
                        typeof Uint8Array.prototype.indexOf === 'function') {
                        if (dir) {
                            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
                        } else {
                            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
                        }
                    }
                    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
                }

                throw new TypeError('val must be string, number or Buffer')
            }

            function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
                var indexSize = 1
                var arrLength = arr.length
                var valLength = val.length

                if (encoding !== undefined) {
                    encoding = String(encoding).toLowerCase()
                    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
                        encoding === 'utf16le' || encoding === 'utf-16le') {
                        if (arr.length < 2 || val.length < 2) {
                            return -1
                        }
                        indexSize = 2
                        arrLength /= 2
                        valLength /= 2
                        byteOffset /= 2
                    }
                }

                function read (buf, i) {
                    if (indexSize === 1) {
                        return buf[i]
                    } else {
                        return buf.readUInt16BE(i * indexSize)
                    }
                }

                var i
                if (dir) {
                    var foundIndex = -1
                    for (i = byteOffset; i < arrLength; i++) {
                        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                            if (foundIndex === -1) foundIndex = i
                            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
                        } else {
                            if (foundIndex !== -1) i -= i - foundIndex
                            foundIndex = -1
                        }
                    }
                } else {
                    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
                    for (i = byteOffset; i >= 0; i--) {
                        var found = true
                        for (var j = 0; j < valLength; j++) {
                            if (read(arr, i + j) !== read(val, j)) {
                                found = false
                                break
                            }
                        }
                        if (found) return i
                    }
                }

                return -1
            }

            Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
                return this.indexOf(val, byteOffset, encoding) !== -1
            }

            Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
            }

            Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
            }

            function hexWrite (buf, string, offset, length) {
                offset = Number(offset) || 0
                var remaining = buf.length - offset
                if (!length) {
                    length = remaining
                } else {
                    length = Number(length)
                    if (length > remaining) {
                        length = remaining
                    }
                }

                // must be an even number of digits
                var strLen = string.length
                if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

                if (length > strLen / 2) {
                    length = strLen / 2
                }
                for (var i = 0; i < length; ++i) {
                    var parsed = parseInt(string.substr(i * 2, 2), 16)
                    if (isNaN(parsed)) return i
                    buf[offset + i] = parsed
                }
                return i
            }

            function utf8Write (buf, string, offset, length) {
                return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
            }

            function asciiWrite (buf, string, offset, length) {
                return blitBuffer(asciiToBytes(string), buf, offset, length)
            }

            function latin1Write (buf, string, offset, length) {
                return asciiWrite(buf, string, offset, length)
            }

            function base64Write (buf, string, offset, length) {
                return blitBuffer(base64ToBytes(string), buf, offset, length)
            }

            function ucs2Write (buf, string, offset, length) {
                return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
            }

            Buffer.prototype.write = function write (string, offset, length, encoding) {
                // Buffer#write(string)
                if (offset === undefined) {
                    encoding = 'utf8'
                    length = this.length
                    offset = 0
                    // Buffer#write(string, encoding)
                } else if (length === undefined && typeof offset === 'string') {
                    encoding = offset
                    length = this.length
                    offset = 0
                    // Buffer#write(string, offset[, length][, encoding])
                } else if (isFinite(offset)) {
                    offset = offset | 0
                    if (isFinite(length)) {
                        length = length | 0
                        if (encoding === undefined) encoding = 'utf8'
                    } else {
                        encoding = length
                        length = undefined
                    }
                    // legacy write(string, encoding, offset, length) - remove in v0.13
                } else {
                    throw new Error(
                        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                    )
                }

                var remaining = this.length - offset
                if (length === undefined || length > remaining) length = remaining

                if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
                    throw new RangeError('Attempt to write outside buffer bounds')
                }

                if (!encoding) encoding = 'utf8'

                var loweredCase = false
                for (;;) {
                    switch (encoding) {
                        case 'hex':
                            return hexWrite(this, string, offset, length)

                        case 'utf8':
                        case 'utf-8':
                            return utf8Write(this, string, offset, length)

                        case 'ascii':
                            return asciiWrite(this, string, offset, length)

                        case 'latin1':
                        case 'binary':
                            return latin1Write(this, string, offset, length)

                        case 'base64':
                            // Warning: maxLength not taken into account in base64Write
                            return base64Write(this, string, offset, length)

                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return ucs2Write(this, string, offset, length)

                        default:
                            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                            encoding = ('' + encoding).toLowerCase()
                            loweredCase = true
                    }
                }
            }

            Buffer.prototype.toJSON = function toJSON () {
                return {
                    type: 'Buffer',
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }

            function base64Slice (buf, start, end) {
                if (start === 0 && end === buf.length) {
                    return base64.fromByteArray(buf)
                } else {
                    return base64.fromByteArray(buf.slice(start, end))
                }
            }

            function utf8Slice (buf, start, end) {
                end = Math.min(buf.length, end)
                var res = []

                var i = start
                while (i < end) {
                    var firstByte = buf[i]
                    var codePoint = null
                    var bytesPerSequence = (firstByte > 0xEF) ? 4
                    : (firstByte > 0xDF) ? 3
                    : (firstByte > 0xBF) ? 2
                    : 1

                    if (i + bytesPerSequence <= end) {
                        var secondByte, thirdByte, fourthByte, tempCodePoint

                        switch (bytesPerSequence) {
                            case 1:
                                if (firstByte < 0x80) {
                                    codePoint = firstByte
                                }
                                break
                            case 2:
                                secondByte = buf[i + 1]
                                if ((secondByte & 0xC0) === 0x80) {
                                    tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                                    if (tempCodePoint > 0x7F) {
                                        codePoint = tempCodePoint
                                    }
                                }
                                break
                            case 3:
                                secondByte = buf[i + 1]
                                thirdByte = buf[i + 2]
                                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                                    tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                                    if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                                        codePoint = tempCodePoint
                                    }
                                }
                                break
                            case 4:
                                secondByte = buf[i + 1]
                                thirdByte = buf[i + 2]
                                fourthByte = buf[i + 3]
                                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                                    tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                                    if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                                        codePoint = tempCodePoint
                                    }
                                }
                        }
                    }

                    if (codePoint === null) {
                        // we did not generate a valid codePoint so insert a
                        // replacement char (U+FFFD) and advance only 1 byte
                        codePoint = 0xFFFD
                        bytesPerSequence = 1
                    } else if (codePoint > 0xFFFF) {
                        // encode to utf16 (surrogate pair dance)
                        codePoint -= 0x10000
                        res.push(codePoint >>> 10 & 0x3FF | 0xD800)
                        codePoint = 0xDC00 | codePoint & 0x3FF
                    }

                    res.push(codePoint)
                    i += bytesPerSequence
                }

                return decodeCodePointsArray(res)
            }

            // Based on http://stackoverflow.com/a/22747272/680742, the browser with
            // the lowest limit is Chrome, with 0x10000 args.
            // We go 1 magnitude less, for safety
            var MAX_ARGUMENTS_LENGTH = 0x1000

            function decodeCodePointsArray (codePoints) {
                var len = codePoints.length
                if (len <= MAX_ARGUMENTS_LENGTH) {
                    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
                }

                // Decode in chunks to avoid "call stack size exceeded".
                var res = ''
                var i = 0
                while (i < len) {
                    res += String.fromCharCode.apply(
                        String,
                        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
                    )
                }
                return res
            }

            function asciiSlice (buf, start, end) {
                var ret = ''
                end = Math.min(buf.length, end)

                for (var i = start; i < end; ++i) {
                    ret += String.fromCharCode(buf[i] & 0x7F)
                }
                return ret
            }

            function latin1Slice (buf, start, end) {
                var ret = ''
                end = Math.min(buf.length, end)

                for (var i = start; i < end; ++i) {
                    ret += String.fromCharCode(buf[i])
                }
                return ret
            }

            function hexSlice (buf, start, end) {
                var len = buf.length

                if (!start || start < 0) start = 0
                if (!end || end < 0 || end > len) end = len

                var out = ''
                for (var i = start; i < end; ++i) {
                    out += toHex(buf[i])
                }
                return out
            }

            function utf16leSlice (buf, start, end) {
                var bytes = buf.slice(start, end)
                var res = ''
                for (var i = 0; i < bytes.length; i += 2) {
                    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
                }
                return res
            }

            Buffer.prototype.slice = function slice (start, end) {
                var len = this.length
                start = ~~start
                end = end === undefined ? len : ~~end

                if (start < 0) {
                    start += len
                    if (start < 0) start = 0
                } else if (start > len) {
                    start = len
                }

                if (end < 0) {
                    end += len
                    if (end < 0) end = 0
                } else if (end > len) {
                    end = len
                }

                if (end < start) end = start

                var newBuf
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    newBuf = this.subarray(start, end)
                    newBuf.__proto__ = Buffer.prototype
                } else {
                    var sliceLen = end - start
                    newBuf = new Buffer(sliceLen, undefined)
                    for (var i = 0; i < sliceLen; ++i) {
                        newBuf[i] = this[i + start]
                    }
                }

                return newBuf
            }

            /*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
            function checkOffset (offset, ext, length) {
                if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
                if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
            }

            Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) checkOffset(offset, byteLength, this.length)

                var val = this[offset]
                var mul = 1
                var i = 0
                while (++i < byteLength && (mul *= 0x100)) {
                    val += this[offset + i] * mul
                }

                return val
            }

            Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) {
                    checkOffset(offset, byteLength, this.length)
                }

                var val = this[offset + --byteLength]
                var mul = 1
                while (byteLength > 0 && (mul *= 0x100)) {
                    val += this[offset + --byteLength] * mul
                }

                return val
            }

            Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 1, this.length)
                return this[offset]
            }

            Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 2, this.length)
                return this[offset] | (this[offset + 1] << 8)
            }

            Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 2, this.length)
                return (this[offset] << 8) | this[offset + 1]
            }

            Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)

                return ((this[offset]) |
                        (this[offset + 1] << 8) |
                        (this[offset + 2] << 16)) +
                    (this[offset + 3] * 0x1000000)
            }

            Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)

                return (this[offset] * 0x1000000) +
                    ((this[offset + 1] << 16) |
                     (this[offset + 2] << 8) |
                     this[offset + 3])
            }

            Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) checkOffset(offset, byteLength, this.length)

                var val = this[offset]
                var mul = 1
                var i = 0
                while (++i < byteLength && (mul *= 0x100)) {
                    val += this[offset + i] * mul
                }
                mul *= 0x80

                if (val >= mul) val -= Math.pow(2, 8 * byteLength)

                return val
            }

            Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) checkOffset(offset, byteLength, this.length)

                var i = byteLength
                var mul = 1
                var val = this[offset + --i]
                while (i > 0 && (mul *= 0x100)) {
                    val += this[offset + --i] * mul
                }
                mul *= 0x80

                if (val >= mul) val -= Math.pow(2, 8 * byteLength)

                return val
            }

            Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 1, this.length)
                if (!(this[offset] & 0x80)) return (this[offset])
                return ((0xff - this[offset] + 1) * -1)
            }

            Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 2, this.length)
                var val = this[offset] | (this[offset + 1] << 8)
                return (val & 0x8000) ? val | 0xFFFF0000 : val
            }

            Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 2, this.length)
                var val = this[offset + 1] | (this[offset] << 8)
                return (val & 0x8000) ? val | 0xFFFF0000 : val
            }

            Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)

                return (this[offset]) |
                    (this[offset + 1] << 8) |
                    (this[offset + 2] << 16) |
                    (this[offset + 3] << 24)
            }

            Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)

                return (this[offset] << 24) |
                    (this[offset + 1] << 16) |
                    (this[offset + 2] << 8) |
                    (this[offset + 3])
            }

            Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)
                return ieee754.read(this, offset, true, 23, 4)
            }

            Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 4, this.length)
                return ieee754.read(this, offset, false, 23, 4)
            }

            Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 8, this.length)
                return ieee754.read(this, offset, true, 52, 8)
            }

            Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
                if (!noAssert) checkOffset(offset, 8, this.length)
                return ieee754.read(this, offset, false, 52, 8)
            }

            function checkInt (buf, value, offset, ext, max, min) {
                if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
                if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
                if (offset + ext > buf.length) throw new RangeError('Index out of range')
            }

            Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
                value = +value
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1
                    checkInt(this, value, offset, byteLength, maxBytes, 0)
                }

                var mul = 1
                var i = 0
                this[offset] = value & 0xFF
                while (++i < byteLength && (mul *= 0x100)) {
                    this[offset + i] = (value / mul) & 0xFF
                }

                return offset + byteLength
            }

            Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
                value = +value
                offset = offset | 0
                byteLength = byteLength | 0
                if (!noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1
                    checkInt(this, value, offset, byteLength, maxBytes, 0)
                }

                var i = byteLength - 1
                var mul = 1
                this[offset + i] = value & 0xFF
                while (--i >= 0 && (mul *= 0x100)) {
                    this[offset + i] = (value / mul) & 0xFF
                }

                return offset + byteLength
            }

            Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
                if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
                this[offset] = (value & 0xff)
                return offset + 1
            }

            function objectWriteUInt16 (buf, value, offset, littleEndian) {
                if (value < 0) value = 0xffff + value + 1
                for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
                    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                        (littleEndian ? i : 1 - i) * 8
                }
            }

            Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value & 0xff)
                    this[offset + 1] = (value >>> 8)
                } else {
                    objectWriteUInt16(this, value, offset, true)
                }
                return offset + 2
            }

            Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value >>> 8)
                    this[offset + 1] = (value & 0xff)
                } else {
                    objectWriteUInt16(this, value, offset, false)
                }
                return offset + 2
            }

            function objectWriteUInt32 (buf, value, offset, littleEndian) {
                if (value < 0) value = 0xffffffff + value + 1
                for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
                    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
                }
            }

            Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset + 3] = (value >>> 24)
                    this[offset + 2] = (value >>> 16)
                    this[offset + 1] = (value >>> 8)
                    this[offset] = (value & 0xff)
                } else {
                    objectWriteUInt32(this, value, offset, true)
                }
                return offset + 4
            }

            Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value >>> 24)
                    this[offset + 1] = (value >>> 16)
                    this[offset + 2] = (value >>> 8)
                    this[offset + 3] = (value & 0xff)
                } else {
                    objectWriteUInt32(this, value, offset, false)
                }
                return offset + 4
            }

            Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1)

                    checkInt(this, value, offset, byteLength, limit - 1, -limit)
                }

                var i = 0
                var mul = 1
                var sub = 0
                this[offset] = value & 0xFF
                while (++i < byteLength && (mul *= 0x100)) {
                    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                        sub = 1
                    }
                    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
                }

                return offset + byteLength
            }

            Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1)

                    checkInt(this, value, offset, byteLength, limit - 1, -limit)
                }

                var i = byteLength - 1
                var mul = 1
                var sub = 0
                this[offset + i] = value & 0xFF
                while (--i >= 0 && (mul *= 0x100)) {
                    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                        sub = 1
                    }
                    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
                }

                return offset + byteLength
            }

            Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
                if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
                if (value < 0) value = 0xff + value + 1
                this[offset] = (value & 0xff)
                return offset + 1
            }

            Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value & 0xff)
                    this[offset + 1] = (value >>> 8)
                } else {
                    objectWriteUInt16(this, value, offset, true)
                }
                return offset + 2
            }

            Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value >>> 8)
                    this[offset + 1] = (value & 0xff)
                } else {
                    objectWriteUInt16(this, value, offset, false)
                }
                return offset + 2
            }

            Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value & 0xff)
                    this[offset + 1] = (value >>> 8)
                    this[offset + 2] = (value >>> 16)
                    this[offset + 3] = (value >>> 24)
                } else {
                    objectWriteUInt32(this, value, offset, true)
                }
                return offset + 4
            }

            Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
                value = +value
                offset = offset | 0
                if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
                if (value < 0) value = 0xffffffff + value + 1
                if (Buffer.TYPED_ARRAY_SUPPORT) {
                    this[offset] = (value >>> 24)
                    this[offset + 1] = (value >>> 16)
                    this[offset + 2] = (value >>> 8)
                    this[offset + 3] = (value & 0xff)
                } else {
                    objectWriteUInt32(this, value, offset, false)
                }
                return offset + 4
            }

            function checkIEEE754 (buf, value, offset, ext, max, min) {
                if (offset + ext > buf.length) throw new RangeError('Index out of range')
                if (offset < 0) throw new RangeError('Index out of range')
            }

            function writeFloat (buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
                }
                ieee754.write(buf, value, offset, littleEndian, 23, 4)
                return offset + 4
            }

            Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
                return writeFloat(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
                return writeFloat(this, value, offset, false, noAssert)
            }

            function writeDouble (buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
                }
                ieee754.write(buf, value, offset, littleEndian, 52, 8)
                return offset + 8
            }

            Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
                return writeDouble(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
                return writeDouble(this, value, offset, false, noAssert)
            }

            // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
            Buffer.prototype.copy = function copy (target, targetStart, start, end) {
                if (!start) start = 0
                if (!end && end !== 0) end = this.length
                if (targetStart >= target.length) targetStart = target.length
                if (!targetStart) targetStart = 0
                if (end > 0 && end < start) end = start

                // Copy 0 bytes; we're done
                if (end === start) return 0
                if (target.length === 0 || this.length === 0) return 0

                // Fatal error conditions
                if (targetStart < 0) {
                    throw new RangeError('targetStart out of bounds')
                }
                if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
                if (end < 0) throw new RangeError('sourceEnd out of bounds')

                // Are we oob?
                if (end > this.length) end = this.length
                if (target.length - targetStart < end - start) {
                    end = target.length - targetStart + start
                }

                var len = end - start
                var i

                if (this === target && start < targetStart && targetStart < end) {
                    // descending copy from end
                    for (i = len - 1; i >= 0; --i) {
                        target[i + targetStart] = this[i + start]
                    }
                } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
                    // ascending copy from start
                    for (i = 0; i < len; ++i) {
                        target[i + targetStart] = this[i + start]
                    }
                } else {
                    Uint8Array.prototype.set.call(
                        target,
                        this.subarray(start, start + len),
                        targetStart
                    )
                }

                return len
            }

            // Usage:
            //    buffer.fill(number[, offset[, end]])
            //    buffer.fill(buffer[, offset[, end]])
            //    buffer.fill(string[, offset[, end]][, encoding])
            Buffer.prototype.fill = function fill (val, start, end, encoding) {
                // Handle string cases:
                if (typeof val === 'string') {
                    if (typeof start === 'string') {
                        encoding = start
                        start = 0
                        end = this.length
                    } else if (typeof end === 'string') {
                        encoding = end
                        end = this.length
                    }
                    if (val.length === 1) {
                        var code = val.charCodeAt(0)
                        if (code < 256) {
                            val = code
                        }
                    }
                    if (encoding !== undefined && typeof encoding !== 'string') {
                        throw new TypeError('encoding must be a string')
                    }
                    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                        throw new TypeError('Unknown encoding: ' + encoding)
                    }
                } else if (typeof val === 'number') {
                    val = val & 255
                }

                // Invalid ranges are not set to a default, so can range check early.
                if (start < 0 || this.length < start || this.length < end) {
                    throw new RangeError('Out of range index')
                }

                if (end <= start) {
                    return this
                }

                start = start >>> 0
                end = end === undefined ? this.length : end >>> 0

                if (!val) val = 0

                var i
                if (typeof val === 'number') {
                    for (i = start; i < end; ++i) {
                        this[i] = val
                    }
                } else {
                    var bytes = Buffer.isBuffer(val)
                    ? val
                    : utf8ToBytes(new Buffer(val, encoding).toString())
                    var len = bytes.length
                    for (i = 0; i < end - start; ++i) {
                        this[i + start] = bytes[i % len]
                    }
                }

                return this
            }

            // HELPER FUNCTIONS
            // ================

            var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

            function base64clean (str) {
                // Node strips out invalid characters like \n and \t from the string, base64-js does not
                str = stringtrim(str).replace(INVALID_BASE64_RE, '')
                // Node converts strings with length < 2 to ''
                if (str.length < 2) return ''
                // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
                while (str.length % 4 !== 0) {
                    str = str + '='
                }
                return str
            }

            function stringtrim (str) {
                if (str.trim) return str.trim()
                return str.replace(/^\s+|\s+$/g, '')
            }

            function toHex (n) {
                if (n < 16) return '0' + n.toString(16)
                return n.toString(16)
            }

            function utf8ToBytes (string, units) {
                units = units || Infinity
                var codePoint
                var length = string.length
                var leadSurrogate = null
                var bytes = []

                for (var i = 0; i < length; ++i) {
                    codePoint = string.charCodeAt(i)

                    // is surrogate component
                    if (codePoint > 0xD7FF && codePoint < 0xE000) {
                        // last char was a lead
                        if (!leadSurrogate) {
                            // no lead yet
                            if (codePoint > 0xDBFF) {
                                // unexpected trail
                                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                                continue
                            } else if (i + 1 === length) {
                                // unpaired lead
                                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                                continue
                            }

                            // valid lead
                            leadSurrogate = codePoint

                            continue
                        }

                        // 2 leads in a row
                        if (codePoint < 0xDC00) {
                            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                            leadSurrogate = codePoint
                            continue
                        }

                        // valid surrogate pair
                        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
                    } else if (leadSurrogate) {
                        // valid bmp char, but last char was a lead
                        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                    }

                    leadSurrogate = null

                    // encode utf8
                    if (codePoint < 0x80) {
                        if ((units -= 1) < 0) break
                        bytes.push(codePoint)
                    } else if (codePoint < 0x800) {
                        if ((units -= 2) < 0) break
                        bytes.push(
                            codePoint >> 0x6 | 0xC0,
                            codePoint & 0x3F | 0x80
                        )
                    } else if (codePoint < 0x10000) {
                        if ((units -= 3) < 0) break
                        bytes.push(
                            codePoint >> 0xC | 0xE0,
                            codePoint >> 0x6 & 0x3F | 0x80,
                            codePoint & 0x3F | 0x80
                        )
                    } else if (codePoint < 0x110000) {
                        if ((units -= 4) < 0) break
                        bytes.push(
                            codePoint >> 0x12 | 0xF0,
                            codePoint >> 0xC & 0x3F | 0x80,
                            codePoint >> 0x6 & 0x3F | 0x80,
                            codePoint & 0x3F | 0x80
                        )
                    } else {
                        throw new Error('Invalid code point')
                    }
                }

                return bytes
            }

            function asciiToBytes (str) {
                var byteArray = []
                for (var i = 0; i < str.length; ++i) {
                    // Node's code seems to be doing this and not & 0x7F..
                    byteArray.push(str.charCodeAt(i) & 0xFF)
                }
                return byteArray
            }

            function utf16leToBytes (str, units) {
                var c, hi, lo
                var byteArray = []
                for (var i = 0; i < str.length; ++i) {
                    if ((units -= 2) < 0) break

                    c = str.charCodeAt(i)
                    hi = c >> 8
                    lo = c % 256
                    byteArray.push(lo)
                    byteArray.push(hi)
                }

                return byteArray
            }

            function base64ToBytes (str) {
                return base64.toByteArray(base64clean(str))
            }

            function blitBuffer (src, dst, offset, length) {
                for (var i = 0; i < length; ++i) {
                    if ((i + offset >= dst.length) || (i >= src.length)) break
                    dst[i + offset] = src[i]
                }
                return i
            }

            function isnan (val) {
                return val !== val // eslint-disable-line no-self-compare
            }

            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

        /***/ }),

    /***/ "./node_modules/buffer/node_modules/isarray/index.js":
    /*!***********************************************************!*\
  !*** ./node_modules/buffer/node_modules/isarray/index.js ***!
  \***********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var toString = {}.toString;

        module.exports = Array.isArray || function (arr) {
            return toString.call(arr) == '[object Array]';
        };


        /***/ }),

    /***/ "./node_modules/charenc/charenc.js":
    /*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var charenc = {
            // UTF-8 encoding
            utf8: {
                // Convert a string to a byte array
                stringToBytes: function(str) {
                    return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
                },

                // Convert a byte array to a string
                bytesToString: function(bytes) {
                    return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
                }
            },

            // Binary encoding
            bin: {
                // Convert a string to a byte array
                stringToBytes: function(str) {
                    for (var bytes = [], i = 0; i < str.length; i++)
                        bytes.push(str.charCodeAt(i) & 0xFF);
                    return bytes;
                },

                // Convert a byte array to a string
                bytesToString: function(bytes) {
                    for (var str = [], i = 0; i < bytes.length; i++)
                        str.push(String.fromCharCode(bytes[i]));
                    return str.join('');
                }
            }
        };

        module.exports = charenc;


        /***/ }),

    /***/ "./node_modules/crypt/crypt.js":
    /*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        (function() {
            var base64map
            = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

                crypt = {
                    // Bit-wise rotation left
                    rotl: function(n, b) {
                        return (n << b) | (n >>> (32 - b));
                    },

                    // Bit-wise rotation right
                    rotr: function(n, b) {
                        return (n << (32 - b)) | (n >>> b);
                    },

                    // Swap big-endian to little-endian and vice versa
                    endian: function(n) {
                        // If number given, swap endian
                        if (n.constructor == Number) {
                            return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
                        }

                        // Else, assume array and swap all items
                        for (var i = 0; i < n.length; i++)
                            n[i] = crypt.endian(n[i]);
                        return n;
                    },

                    // Generate an array of any length of random bytes
                    randomBytes: function(n) {
                        for (var bytes = []; n > 0; n--)
                            bytes.push(Math.floor(Math.random() * 256));
                        return bytes;
                    },

                    // Convert a byte array to big-endian 32-bit words
                    bytesToWords: function(bytes) {
                        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
                            words[b >>> 5] |= bytes[i] << (24 - b % 32);
                        return words;
                    },

                    // Convert big-endian 32-bit words to a byte array
                    wordsToBytes: function(words) {
                        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
                            bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
                        return bytes;
                    },

                    // Convert a byte array to a hex string
                    bytesToHex: function(bytes) {
                        for (var hex = [], i = 0; i < bytes.length; i++) {
                            hex.push((bytes[i] >>> 4).toString(16));
                            hex.push((bytes[i] & 0xF).toString(16));
                        }
                        return hex.join('');
                    },

                    // Convert a hex string to a byte array
                    hexToBytes: function(hex) {
                        for (var bytes = [], c = 0; c < hex.length; c += 2)
                            bytes.push(parseInt(hex.substr(c, 2), 16));
                        return bytes;
                    },

                    // Convert a byte array to a base-64 string
                    bytesToBase64: function(bytes) {
                        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
                            var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                            for (var j = 0; j < 4; j++)
                                if (i * 8 + j * 6 <= bytes.length * 8)
                                    base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
                                else
                                    base64.push('=');
                        }
                        return base64.join('');
                    },

                    // Convert a base-64 string to a byte array
                    base64ToBytes: function(base64) {
                        // Remove non-base-64 characters
                        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

                        for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
                             imod4 = ++i % 4) {
                            if (imod4 == 0) continue;
                            bytes.push(((base64map.indexOf(base64.charAt(i - 1))
                                         & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
                                       | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
                        }
                        return bytes;
                    }
                };

            module.exports = crypt;
        })();


        /***/ }),

    /***/ "./node_modules/event-lite/event-lite.js":
    /*!***********************************************!*\
  !*** ./node_modules/event-lite/event-lite.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

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

        function EventLite() {
            if (!(this instanceof EventLite)) return new EventLite();
        }

        (function(EventLite) {
            // export the class for node.js
            if (true) module.exports = EventLite;

            // property name to hold listeners
            var LISTENERS = "listeners";

            // methods to export
            var methods = {
                on: on,
                once: once,
                off: off,
                emit: emit
            };

            // mixin to self
            mixin(EventLite.prototype);

            // export mixin function
            EventLite.mixin = mixin;

            /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

            function mixin(target) {
                for (var key in methods) {
                    target[key] = methods[key];
                }
                return target;
            }

            /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

            function on(type, func) {
                getListeners(this, type).push(func);
                return this;
            }

            /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

            function once(type, func) {
                var that = this;
                wrap.originalListener = func;
                getListeners(that, type).push(wrap);
                return that;

                function wrap() {
                    off.call(that, type, wrap);
                    func.apply(this, arguments);
                }
            }

            /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

            function off(type, func) {
                var that = this;
                var listners;
                if (!arguments.length) {
                    delete that[LISTENERS];
                } else if (!func) {
                    listners = that[LISTENERS];
                    if (listners) {
                        delete listners[type];
                        if (!Object.keys(listners).length) return off.call(that);
                    }
                } else {
                    listners = getListeners(that, type, true);
                    if (listners) {
                        listners = listners.filter(ne);
                        if (!listners.length) return off.call(that, type);
                        that[LISTENERS][type] = listners;
                    }
                }
                return that;

                function ne(test) {
                    return test !== func && test.originalListener !== func;
                }
            }

            /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

            function emit(type, value) {
                var that = this;
                var listeners = getListeners(that, type, true);
                if (!listeners) return false;
                var arglen = arguments.length;
                if (arglen === 1) {
                    listeners.forEach(zeroarg);
                } else if (arglen === 2) {
                    listeners.forEach(onearg);
                } else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    listeners.forEach(moreargs);
                }
                return !!listeners.length;

                function zeroarg(func) {
                    func.call(that);
                }

                function onearg(func) {
                    func.call(that, value);
                }

                function moreargs(func) {
                    func.apply(that, args);
                }
            }

            /**
   * @ignore
   */

            function getListeners(that, type, readonly) {
                if (readonly && !that[LISTENERS]) return;
                var listeners = that[LISTENERS] || (that[LISTENERS] = {});
                return listeners[type] || (listeners[type] = []);
            }

        })(EventLite);


        /***/ }),

    /***/ "./node_modules/ieee754/index.js":
    /*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        exports.read = function (buffer, offset, isLE, mLen, nBytes) {
            var e, m
            var eLen = (nBytes * 8) - mLen - 1
            var eMax = (1 << eLen) - 1
            var eBias = eMax >> 1
            var nBits = -7
            var i = isLE ? (nBytes - 1) : 0
            var d = isLE ? -1 : 1
            var s = buffer[offset + i]

            i += d

            e = s & ((1 << (-nBits)) - 1)
            s >>= (-nBits)
            nBits += eLen
            for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

            m = e & ((1 << (-nBits)) - 1)
            e >>= (-nBits)
            nBits += mLen
            for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

            if (e === 0) {
                e = 1 - eBias
            } else if (e === eMax) {
                return m ? NaN : ((s ? -1 : 1) * Infinity)
            } else {
                m = m + Math.pow(2, mLen)
                e = e - eBias
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
        }

        exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c
            var eLen = (nBytes * 8) - mLen - 1
            var eMax = (1 << eLen) - 1
            var eBias = eMax >> 1
            var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
            var i = isLE ? 0 : (nBytes - 1)
            var d = isLE ? 1 : -1
            var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

            value = Math.abs(value)

            if (isNaN(value) || value === Infinity) {
                m = isNaN(value) ? 1 : 0
                e = eMax
            } else {
                e = Math.floor(Math.log(value) / Math.LN2)
                if (value * (c = Math.pow(2, -e)) < 1) {
                    e--
                    c *= 2
                }
                if (e + eBias >= 1) {
                    value += rt / c
                } else {
                    value += rt * Math.pow(2, 1 - eBias)
                }
                if (value * c >= 2) {
                    e++
                    c /= 2
                }

                if (e + eBias >= eMax) {
                    m = 0
                    e = eMax
                } else if (e + eBias >= 1) {
                    m = ((value * c) - 1) * Math.pow(2, mLen)
                    e = e + eBias
                } else {
                    m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
                    e = 0
                }
            }

            for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

            e = (e << mLen) | m
            eLen += mLen
            for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

            buffer[offset + i - d] |= s * 128
        }


        /***/ }),

    /***/ "./node_modules/int64-buffer/int64-buffer.js":
    /*!***************************************************!*\
  !*** ./node_modules/int64-buffer/int64-buffer.js ***!
  \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(Buffer) {// int64-buffer.js

            /*jshint -W018 */ // Confusing use of '!'.
            /*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
            /*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

            var Uint64BE, Int64BE, Uint64LE, Int64LE;

            !function(exports) {
                // constants

                var UNDEFINED = "undefined";
                var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
                var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
                var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
                var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
                var isArray = Array.isArray || _isArray;
                var BIT32 = 4294967296;
                var BIT24 = 16777216;

                // storage class

                var storage; // Array;

                // generate classes

                Uint64BE = factory("Uint64BE", true, true);
                Int64BE = factory("Int64BE", true, false);
                Uint64LE = factory("Uint64LE", false, true);
                Int64LE = factory("Int64LE", false, false);

                // class factory

                function factory(name, bigendian, unsigned) {
                    var posH = bigendian ? 0 : 4;
                    var posL = bigendian ? 4 : 0;
                    var pos0 = bigendian ? 0 : 3;
                    var pos1 = bigendian ? 1 : 2;
                    var pos2 = bigendian ? 2 : 1;
                    var pos3 = bigendian ? 3 : 0;
                    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
                    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
                    var proto = Int64.prototype;
                    var isName = "is" + name;
                    var _isInt64 = "_" + isName;

                    // properties
                    proto.buffer = void 0;
                    proto.offset = 0;
                    proto[_isInt64] = true;

                    // methods
                    proto.toNumber = toNumber;
                    proto.toString = toString;
                    proto.toJSON = toNumber;
                    proto.toArray = toArray;

                    // add .toBuffer() method only when Buffer available
                    if (BUFFER) proto.toBuffer = toBuffer;

                    // add .toArrayBuffer() method only when Uint8Array available
                    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

                    // isUint64BE, isInt64BE
                    Int64[isName] = isInt64;

                    // CommonJS
                    exports[name] = Int64;

                    return Int64;

                    // constructor
                    function Int64(buffer, offset, value, raddix) {
                        if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
                        return init(this, buffer, offset, value, raddix);
                    }

                    // isUint64BE, isInt64BE
                    function isInt64(b) {
                        return !!(b && b[_isInt64]);
                    }

                    // initializer
                    function init(that, buffer, offset, value, raddix) {
                        if (UINT8ARRAY && ARRAYBUFFER) {
                            if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
                            if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
                        }

                        // Int64BE() style
                        if (!buffer && !offset && !value && !storage) {
                            // shortcut to initialize with zero
                            that.buffer = newArray(ZERO, 0);
                            return;
                        }

                        // Int64BE(value, raddix) style
                        if (!isValidBuffer(buffer, offset)) {
                            var _storage = storage || Array;
                            raddix = offset;
                            value = buffer;
                            offset = 0;
                            buffer = new _storage(8);
                        }

                        that.buffer = buffer;
                        that.offset = offset |= 0;

                        // Int64BE(buffer, offset) style
                        if (UNDEFINED === typeof value) return;

                        // Int64BE(buffer, offset, value, raddix) style
                        if ("string" === typeof value) {
                            fromString(buffer, offset, value, raddix || 10);
                        } else if (isValidBuffer(value, raddix)) {
                            fromArray(buffer, offset, value, raddix);
                        } else if ("number" === typeof raddix) {
                            writeInt32(buffer, offset + posH, value); // high
                            writeInt32(buffer, offset + posL, raddix); // low
                        } else if (value > 0) {
                            fromPositive(buffer, offset, value); // positive
                        } else if (value < 0) {
                            fromNegative(buffer, offset, value); // negative
                        } else {
                            fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
                        }
                    }

                    function fromString(buffer, offset, str, raddix) {
                        var pos = 0;
                        var len = str.length;
                        var high = 0;
                        var low = 0;
                        if (str[0] === "-") pos++;
                        var sign = pos;
                        while (pos < len) {
                            var chr = parseInt(str[pos++], raddix);
                            if (!(chr >= 0)) break; // NaN
                            low = low * raddix + chr;
                            high = high * raddix + Math.floor(low / BIT32);
                            low %= BIT32;
                        }
                        if (sign) {
                            high = ~high;
                            if (low) {
                                low = BIT32 - low;
                            } else {
                                high++;
                            }
                        }
                        writeInt32(buffer, offset + posH, high);
                        writeInt32(buffer, offset + posL, low);
                    }

                    function toNumber() {
                        var buffer = this.buffer;
                        var offset = this.offset;
                        var high = readInt32(buffer, offset + posH);
                        var low = readInt32(buffer, offset + posL);
                        if (!unsigned) high |= 0; // a trick to get signed
                        return high ? (high * BIT32 + low) : low;
                    }

                    function toString(radix) {
                        var buffer = this.buffer;
                        var offset = this.offset;
                        var high = readInt32(buffer, offset + posH);
                        var low = readInt32(buffer, offset + posL);
                        var str = "";
                        var sign = !unsigned && (high & 0x80000000);
                        if (sign) {
                            high = ~high;
                            low = BIT32 - low;
                        }
                        radix = radix || 10;
                        while (1) {
                            var mod = (high % radix) * BIT32 + low;
                            high = Math.floor(high / radix);
                            low = Math.floor(mod / radix);
                            str = (mod % radix).toString(radix) + str;
                            if (!high && !low) break;
                        }
                        if (sign) {
                            str = "-" + str;
                        }
                        return str;
                    }

                    function writeInt32(buffer, offset, value) {
                        buffer[offset + pos3] = value & 255;
                        value = value >> 8;
                        buffer[offset + pos2] = value & 255;
                        value = value >> 8;
                        buffer[offset + pos1] = value & 255;
                        value = value >> 8;
                        buffer[offset + pos0] = value & 255;
                    }

                    function readInt32(buffer, offset) {
                        return (buffer[offset + pos0] * BIT24) +
                            (buffer[offset + pos1] << 16) +
                            (buffer[offset + pos2] << 8) +
                            buffer[offset + pos3];
                    }
                }

                function toArray(raw) {
                    var buffer = this.buffer;
                    var offset = this.offset;
                    storage = null; // Array
                    if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer)) return buffer;
                    return newArray(buffer, offset);
                }

                function toBuffer(raw) {
                    var buffer = this.buffer;
                    var offset = this.offset;
                    storage = BUFFER;
                    if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer)) return buffer;
                    var dest = new BUFFER(8);
                    fromArray(dest, 0, buffer, offset);
                    return dest;
                }

                function toArrayBuffer(raw) {
                    var buffer = this.buffer;
                    var offset = this.offset;
                    var arrbuf = buffer.buffer;
                    storage = UINT8ARRAY;
                    if (raw !== false && offset === 0 && (arrbuf instanceof ARRAYBUFFER) && arrbuf.byteLength === 8) return arrbuf;
                    var dest = new UINT8ARRAY(8);
                    fromArray(dest, 0, buffer, offset);
                    return dest.buffer;
                }

                function isValidBuffer(buffer, offset) {
                    var len = buffer && buffer.length;
                    offset |= 0;
                    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
                }

                function fromArray(destbuf, destoff, srcbuf, srcoff) {
                    destoff |= 0;
                    srcoff |= 0;
                    for (var i = 0; i < 8; i++) {
                        destbuf[destoff++] = srcbuf[srcoff++] & 255;
                    }
                }

                function newArray(buffer, offset) {
                    return Array.prototype.slice.call(buffer, offset, offset + 8);
                }

                function fromPositiveBE(buffer, offset, value) {
                    var pos = offset + 8;
                    while (pos > offset) {
                        buffer[--pos] = value & 255;
                        value /= 256;
                    }
                }

                function fromNegativeBE(buffer, offset, value) {
                    var pos = offset + 8;
                    value++;
                    while (pos > offset) {
                        buffer[--pos] = ((-value) & 255) ^ 255;
                        value /= 256;
                    }
                }

                function fromPositiveLE(buffer, offset, value) {
                    var end = offset + 8;
                    while (offset < end) {
                        buffer[offset++] = value & 255;
                        value /= 256;
                    }
                }

                function fromNegativeLE(buffer, offset, value) {
                    var end = offset + 8;
                    value++;
                    while (offset < end) {
                        buffer[offset++] = ((-value) & 255) ^ 255;
                        value /= 256;
                    }
                }

                // https://github.com/retrofox/is-array
                function _isArray(val) {
                    return !!val && "[object Array]" == Object.prototype.toString.call(val);
                }

            }( true && typeof exports.nodeName !== 'string' ? exports : (this || {}));

            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

        /***/ }),

    /***/ "./node_modules/is-buffer/index.js":
    /*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

        // The _isBuffer check is for Safari 5-7 support, because it's missing
        // Object.prototype.constructor. Remove this eventually
        module.exports = function (obj) {
            return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
        }

        function isBuffer (obj) {
            return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
        }

        // For Node v0.10 support. Remove this eventually.
        function isSlowBuffer (obj) {
            return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
        }


        /***/ }),

    /***/ "./node_modules/md5/md5.js":
    /*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        (function(){
            var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
                utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
                isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
                bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

                // The core
                md5 = function (message, options) {
                    // Convert to byte array
                    if (message.constructor == String)
                        if (options && options.encoding === 'binary')
                            message = bin.stringToBytes(message);
                        else
                            message = utf8.stringToBytes(message);
                    else if (isBuffer(message))
                        message = Array.prototype.slice.call(message, 0);
                    else if (!Array.isArray(message))
                        message = message.toString();
                    // else, assume byte array already

                    var m = crypt.bytesToWords(message),
                        l = message.length * 8,
                        a =  1732584193,
                        b = -271733879,
                        c = -1732584194,
                        d =  271733878;

                    // Swap endian
                    for (var i = 0; i < m.length; i++) {
                        m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
                            ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
                    }

                    // Padding
                    m[l >>> 5] |= 0x80 << (l % 32);
                    m[(((l + 64) >>> 9) << 4) + 14] = l;

                    // Method shortcuts
                    var FF = md5._ff,
                        GG = md5._gg,
                        HH = md5._hh,
                        II = md5._ii;

                    for (var i = 0; i < m.length; i += 16) {

                        var aa = a,
                            bb = b,
                            cc = c,
                            dd = d;

                        a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
                        d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
                        c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
                        b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
                        a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
                        d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
                        c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
                        b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
                        a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
                        d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
                        c = FF(c, d, a, b, m[i+10], 17, -42063);
                        b = FF(b, c, d, a, m[i+11], 22, -1990404162);
                        a = FF(a, b, c, d, m[i+12],  7,  1804603682);
                        d = FF(d, a, b, c, m[i+13], 12, -40341101);
                        c = FF(c, d, a, b, m[i+14], 17, -1502002290);
                        b = FF(b, c, d, a, m[i+15], 22,  1236535329);

                        a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
                        d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
                        c = GG(c, d, a, b, m[i+11], 14,  643717713);
                        b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
                        a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
                        d = GG(d, a, b, c, m[i+10],  9,  38016083);
                        c = GG(c, d, a, b, m[i+15], 14, -660478335);
                        b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
                        a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
                        d = GG(d, a, b, c, m[i+14],  9, -1019803690);
                        c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
                        b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
                        a = GG(a, b, c, d, m[i+13],  5, -1444681467);
                        d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
                        c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
                        b = GG(b, c, d, a, m[i+12], 20, -1926607734);

                        a = HH(a, b, c, d, m[i+ 5],  4, -378558);
                        d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
                        c = HH(c, d, a, b, m[i+11], 16,  1839030562);
                        b = HH(b, c, d, a, m[i+14], 23, -35309556);
                        a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
                        d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
                        c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
                        b = HH(b, c, d, a, m[i+10], 23, -1094730640);
                        a = HH(a, b, c, d, m[i+13],  4,  681279174);
                        d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
                        c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
                        b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
                        a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
                        d = HH(d, a, b, c, m[i+12], 11, -421815835);
                        c = HH(c, d, a, b, m[i+15], 16,  530742520);
                        b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

                        a = II(a, b, c, d, m[i+ 0],  6, -198630844);
                        d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
                        c = II(c, d, a, b, m[i+14], 15, -1416354905);
                        b = II(b, c, d, a, m[i+ 5], 21, -57434055);
                        a = II(a, b, c, d, m[i+12],  6,  1700485571);
                        d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
                        c = II(c, d, a, b, m[i+10], 15, -1051523);
                        b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
                        a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
                        d = II(d, a, b, c, m[i+15], 10, -30611744);
                        c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
                        b = II(b, c, d, a, m[i+13], 21,  1309151649);
                        a = II(a, b, c, d, m[i+ 4],  6, -145523070);
                        d = II(d, a, b, c, m[i+11], 10, -1120210379);
                        c = II(c, d, a, b, m[i+ 2], 15,  718787259);
                        b = II(b, c, d, a, m[i+ 9], 21, -343485551);

                        a = (a + aa) >>> 0;
                        b = (b + bb) >>> 0;
                        c = (c + cc) >>> 0;
                        d = (d + dd) >>> 0;
                    }

                    return crypt.endian([a, b, c, d]);
                };

            // Auxiliary functions
            md5._ff  = function (a, b, c, d, x, s, t) {
                var n = a + (b & c | ~b & d) + (x >>> 0) + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            };
            md5._gg  = function (a, b, c, d, x, s, t) {
                var n = a + (b & d | c & ~d) + (x >>> 0) + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            };
            md5._hh  = function (a, b, c, d, x, s, t) {
                var n = a + (b ^ c ^ d) + (x >>> 0) + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            };
            md5._ii  = function (a, b, c, d, x, s, t) {
                var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            };

            // Package private blocksize
            md5._blocksize = 16;
            md5._digestsize = 16;

            module.exports = function (message, options) {
                if (message === undefined || message === null)
                    throw new Error('Illegal argument ' + message);

                var digestbytes = crypt.wordsToBytes(md5(message, options));
                return options && options.asBytes ? digestbytes :
                options && options.asString ? bin.bytesToString(digestbytes) :
                crypt.bytesToHex(digestbytes);
            };

        })();


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/browser.js":
    /*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/browser.js ***!
  \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // browser.js

        exports.encode = __webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode;
        exports.decode = __webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode;

        exports.Encoder = __webpack_require__(/*! ./encoder */ "./node_modules/msgpack-lite/lib/encoder.js").Encoder;
        exports.Decoder = __webpack_require__(/*! ./decoder */ "./node_modules/msgpack-lite/lib/decoder.js").Decoder;

        exports.createCodec = __webpack_require__(/*! ./ext */ "./node_modules/msgpack-lite/lib/ext.js").createCodec;
        exports.codec = __webpack_require__(/*! ./codec */ "./node_modules/msgpack-lite/lib/codec.js").codec;


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/buffer-global.js":
    /*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-global.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(Buffer) {/* globals Buffer */

            module.exports =
                c(("undefined" !== typeof Buffer) && Buffer) ||
                c(this.Buffer) ||
                c(("undefined" !== typeof window) && window.Buffer) ||
                this.Buffer;

            function c(B) {
                return B && B.isBuffer && B;
            }
            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/buffer-lite.js":
    /*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-lite.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        // buffer-lite.js

        var MAXBUFLEN = 8192;

        exports.copy = copy;
        exports.toString = toString;
        exports.write = write;

        /**
 * Buffer.prototype.write()
 *
 * @param string {String}
 * @param [offset] {Number}
 * @returns {Number}
 */

        function write(string, offset) {
            var buffer = this;
            var index = offset || (offset |= 0);
            var length = string.length;
            var chr = 0;
            var i = 0;
            while (i < length) {
                chr = string.charCodeAt(i++);

                if (chr < 128) {
                    buffer[index++] = chr;
                } else if (chr < 0x800) {
                    // 2 bytes
                    buffer[index++] = 0xC0 | (chr >>> 6);
                    buffer[index++] = 0x80 | (chr & 0x3F);
                } else if (chr < 0xD800 || chr > 0xDFFF) {
                    // 3 bytes
                    buffer[index++] = 0xE0 | (chr  >>> 12);
                    buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
                    buffer[index++] = 0x80 | (chr          & 0x3F);
                } else {
                    // 4 bytes - surrogate pair
                    chr = (((chr - 0xD800) << 10) | (string.charCodeAt(i++) - 0xDC00)) + 0x10000;
                    buffer[index++] = 0xF0 | (chr >>> 18);
                    buffer[index++] = 0x80 | ((chr >>> 12) & 0x3F);
                    buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
                    buffer[index++] = 0x80 | (chr          & 0x3F);
                }
            }
            return index - offset;
        }

        /**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

        function toString(encoding, start, end) {
            var buffer = this;
            var index = start|0;
            if (!end) end = buffer.length;
            var string = '';
            var chr = 0;

            while (index < end) {
                chr = buffer[index++];
                if (chr < 128) {
                    string += String.fromCharCode(chr);
                    continue;
                }

                if ((chr & 0xE0) === 0xC0) {
                    // 2 bytes
                    chr = (chr & 0x1F) << 6 |
                        (buffer[index++] & 0x3F);

                } else if ((chr & 0xF0) === 0xE0) {
                    // 3 bytes
                    chr = (chr & 0x0F)             << 12 |
                        (buffer[index++] & 0x3F) << 6  |
                        (buffer[index++] & 0x3F);

                } else if ((chr & 0xF8) === 0xF0) {
                    // 4 bytes
                    chr = (chr & 0x07)             << 18 |
                        (buffer[index++] & 0x3F) << 12 |
                        (buffer[index++] & 0x3F) << 6  |
                        (buffer[index++] & 0x3F);
                }

                if (chr >= 0x010000) {
                    // A surrogate pair
                    chr -= 0x010000;

                    string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
                } else {
                    string += String.fromCharCode(chr);
                }
            }

            return string;
        }

        /**
 * Buffer.prototype.copy()
 *
 * @param target {Buffer}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {number}
 */

        function copy(target, targetStart, start, end) {
            var i;
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (!targetStart) targetStart = 0;
            var len = end - start;

            if (target === this && start < targetStart && targetStart < end) {
                // descending
                for (i = len - 1; i >= 0; i--) {
                    target[i + targetStart] = this[i + start];
                }
            } else {
                // ascending
                for (i = 0; i < len; i++) {
                    target[i + targetStart] = this[i + start];
                }
            }

            return len;
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/bufferish-array.js":
    /*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-array.js ***!
  \**********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // bufferish-array.js

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

        var exports = module.exports = alloc(0);

        exports.alloc = alloc;
        exports.concat = Bufferish.concat;
        exports.from = from;

        /**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function alloc(size) {
            return new Array(size);
        }

        /**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

        function from(value) {
            if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
                // TypedArray to Uint8Array
                value = Bufferish.Uint8Array.from(value);
            } else if (Bufferish.isArrayBuffer(value)) {
                // ArrayBuffer to Uint8Array
                value = new Uint8Array(value);
            } else if (typeof value === "string") {
                // String to Array
                return Bufferish.from.call(exports, value);
            } else if (typeof value === "number") {
                throw new TypeError('"value" argument must not be a number');
            }

            // Array-like to Array
            return Array.prototype.slice.call(value);
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/bufferish-buffer.js":
    /*!***********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-buffer.js ***!
  \***********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // bufferish-buffer.js

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var Buffer = Bufferish.global;

        var exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];

        exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc;
        exports.concat = Bufferish.concat;
        exports.from = from;

        /**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function alloc(size) {
            return new Buffer(size);
        }

        /**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

        function from(value) {
            if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
                // TypedArray to Uint8Array
                value = Bufferish.Uint8Array.from(value);
            } else if (Bufferish.isArrayBuffer(value)) {
                // ArrayBuffer to Uint8Array
                value = new Uint8Array(value);
            } else if (typeof value === "string") {
                // String to Buffer
                return Bufferish.from.call(exports, value);
            } else if (typeof value === "number") {
                throw new TypeError('"value" argument must not be a number');
            }

            // Array-like to Buffer
            if (Buffer.from && Buffer.from.length !== 1) {
                return Buffer.from(value); // node v6+
            } else {
                return new Buffer(value); // node v4
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/bufferish-proto.js":
    /*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-proto.js ***!
  \**********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // bufferish-proto.js

        /* jshint eqnull:true */

        var BufferLite = __webpack_require__(/*! ./buffer-lite */ "./node_modules/msgpack-lite/lib/buffer-lite.js");

        exports.copy = copy;
        exports.slice = slice;
        exports.toString = toString;
        exports.write = gen("write");

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var Buffer = Bufferish.global;

        var isBufferShim = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
        var brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;

        /**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function copy(target, targetStart, start, end) {
            var thisIsBuffer = Bufferish.isBuffer(this);
            var targetIsBuffer = Bufferish.isBuffer(target);
            if (thisIsBuffer && targetIsBuffer) {
                // Buffer to Buffer
                return this.copy(target, targetStart, start, end);
            } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer &&
                       Bufferish.isView(this) && Bufferish.isView(target)) {
                // Uint8Array to Uint8Array (except for minor some browsers)
                var buffer = (start || end != null) ? slice.call(this, start, end) : this;
                target.set(buffer, targetStart);
                return buffer.length;
            } else {
                // other cases
                return BufferLite.copy.call(this, target, targetStart, start, end);
            }
        }

        /**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function slice(start, end) {
            // for Buffer, Uint8Array (except for minor some browsers) and Array
            var f = this.slice || (!brokenTypedArray && this.subarray);
            if (f) return f.call(this, start, end);

            // Uint8Array (for minor some browsers)
            var target = Bufferish.alloc.call(this, end - start);
            copy.call(this, target, 0, start, end);
            return target;
        }

        /**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

        function toString(encoding, start, end) {
            var f = (!isBufferShim && Bufferish.isBuffer(this)) ? this.toString : BufferLite.toString;
            return f.apply(this, arguments);
        }

        /**
 * @private
 */

        function gen(method) {
            return wrap;

            function wrap() {
                var f = this[method] || BufferLite[method];
                return f.apply(this, arguments);
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js":
    /*!***************************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-uint8array.js ***!
  \***************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // bufferish-uint8array.js

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

        var exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];

        exports.alloc = alloc;
        exports.concat = Bufferish.concat;
        exports.from = from;

        /**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function alloc(size) {
            return new Uint8Array(size);
        }

        /**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

        function from(value) {
            if (Bufferish.isView(value)) {
                // TypedArray to ArrayBuffer
                var byteOffset = value.byteOffset;
                var byteLength = value.byteLength;
                value = value.buffer;
                if (value.byteLength !== byteLength) {
                    if (value.slice) {
                        value = value.slice(byteOffset, byteOffset + byteLength);
                    } else {
                        // Android 4.1 does not have ArrayBuffer.prototype.slice
                        value = new Uint8Array(value);
                        if (value.byteLength !== byteLength) {
                            // TypedArray to ArrayBuffer to Uint8Array to Array
                            value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
                        }
                    }
                }
            } else if (typeof value === "string") {
                // String to Uint8Array
                return Bufferish.from.call(exports, value);
            } else if (typeof value === "number") {
                throw new TypeError('"value" argument must not be a number');
            }

            return new Uint8Array(value);
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/bufferish.js":
    /*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish.js ***!
  \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // bufferish.js

        var Buffer = exports.global = __webpack_require__(/*! ./buffer-global */ "./node_modules/msgpack-lite/lib/buffer-global.js");
        var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
        var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

        var isArray = exports.isArray = __webpack_require__(/*! isarray */ "./node_modules/msgpack-lite/node_modules/isarray/index.js");
        exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
        var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
        var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

        exports.alloc = alloc;
        exports.concat = concat;
        exports.from = from;

        var BufferArray = exports.Array = __webpack_require__(/*! ./bufferish-array */ "./node_modules/msgpack-lite/lib/bufferish-array.js");
        var BufferBuffer = exports.Buffer = __webpack_require__(/*! ./bufferish-buffer */ "./node_modules/msgpack-lite/lib/bufferish-buffer.js");
        var BufferUint8Array = exports.Uint8Array = __webpack_require__(/*! ./bufferish-uint8array */ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js");
        var BufferProto = exports.prototype = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

        /**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

        function from(value) {
            if (typeof value === "string") {
                return fromString.call(this, value);
            } else {
                return auto(this).from(value);
            }
        }

        /**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

        function alloc(size) {
            return auto(this).alloc(size);
        }

        /**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

        function concat(list, length) {
            if (!length) {
                length = 0;
                Array.prototype.forEach.call(list, dryrun);
            }
            var ref = (this !== exports) && this || list[0];
            var result = alloc.call(ref, length);
            var offset = 0;
            Array.prototype.forEach.call(list, append);
            return result;

            function dryrun(buffer) {
                length += buffer.length;
            }

            function append(buffer) {
                offset += BufferProto.copy.call(buffer, result, offset);
            }
        }

        var _isArrayBuffer = _is("ArrayBuffer");

        function isArrayBuffer(value) {
            return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
        }

        /**
 * @private
 */

        function fromString(value) {
            var expected = value.length * 3;
            var that = alloc.call(this, expected);
            var actual = BufferProto.write.call(that, value);
            if (expected !== actual) {
                that = BufferProto.slice.call(that, 0, actual);
            }
            return that;
        }

        function auto(that) {
            return isBuffer(that) ? BufferBuffer
            : isView(that) ? BufferUint8Array
            : isArray(that) ? BufferArray
            : hasBuffer ? BufferBuffer
            : hasArrayBuffer ? BufferUint8Array
            : BufferArray;
        }

        function _false() {
            return false;
        }

        function _is(name, key) {
            /* jshint eqnull:true */
            name = "[object " + name + "]";
            return function(value) {
                return (value != null) && {}.toString.call(key ? value[key] : value) === name;
            };
        }

        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/codec-base.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec-base.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // codec-base.js

        var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/msgpack-lite/node_modules/isarray/index.js");

        exports.createCodec = createCodec;
        exports.install = install;
        exports.filter = filter;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

        function Codec(options) {
            if (!(this instanceof Codec)) return new Codec(options);
            this.options = options;
            this.init();
        }

        Codec.prototype.init = function() {
            var options = this.options;

            if (options && options.uint8array) {
                this.bufferish = Bufferish.Uint8Array;
            }

            return this;
        };

        function install(props) {
            for (var key in props) {
                Codec.prototype[key] = add(Codec.prototype[key], props[key]);
            }
        }

        function add(a, b) {
            return (a && b) ? ab : (a || b);

            function ab() {
                a.apply(this, arguments);
                return b.apply(this, arguments);
            }
        }

        function join(filters) {
            filters = filters.slice();

            return function(value) {
                return filters.reduce(iterator, value);
            };

            function iterator(value, filter) {
                return filter(value);
            }
        }

        function filter(filter) {
            return IS_ARRAY(filter) ? join(filter) : filter;
        }

        // @public
        // msgpack.createCodec()

        function createCodec(options) {
            return new Codec(options);
        }

        // default shared codec

        exports.preset = createCodec({preset: true});


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/codec.js":
    /*!************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // codec.js

        // load both interfaces
        __webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
        __webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

        // @public
        // msgpack.codec.preset

        exports.codec = {
            preset: __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").preset
        };


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/decode-buffer.js":
    /*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode-buffer.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // decode-buffer.js

        exports.DecodeBuffer = DecodeBuffer;

        var preset = __webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js").preset;

        var FlexDecoder = __webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexDecoder;

        FlexDecoder.mixin(DecodeBuffer.prototype);

        function DecodeBuffer(options) {
            if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);

            if (options) {
                this.options = options;
                if (options.codec) {
                    var codec = this.codec = options.codec;
                    if (codec.bufferish) this.bufferish = codec.bufferish;
                }
            }
        }

        DecodeBuffer.prototype.codec = preset;

        DecodeBuffer.prototype.fetch = function() {
            return this.codec.decode(this);
        };


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/decode.js":
    /*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // decode.js

        exports.decode = decode;

        var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;

        function decode(input, options) {
            var decoder = new DecodeBuffer(options);
            decoder.write(input);
            return decoder.read();
        }

        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/decoder.js":
    /*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decoder.js ***!
  \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // decoder.js

        exports.Decoder = Decoder;

        var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
        var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;

        function Decoder(options) {
            if (!(this instanceof Decoder)) return new Decoder(options);
            DecodeBuffer.call(this, options);
        }

        Decoder.prototype = new DecodeBuffer();

        EventLite.mixin(Decoder.prototype);

        Decoder.prototype.decode = function(chunk) {
            if (arguments.length) this.write(chunk);
            this.flush();
        };

        Decoder.prototype.push = function(chunk) {
            this.emit("data", chunk);
        };

        Decoder.prototype.end = function(chunk) {
            this.decode(chunk);
            this.emit("end");
        };


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/encode-buffer.js":
    /*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode-buffer.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // encode-buffer.js

        exports.EncodeBuffer = EncodeBuffer;

        var preset = __webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js").preset;

        var FlexEncoder = __webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexEncoder;

        FlexEncoder.mixin(EncodeBuffer.prototype);

        function EncodeBuffer(options) {
            if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);

            if (options) {
                this.options = options;
                if (options.codec) {
                    var codec = this.codec = options.codec;
                    if (codec.bufferish) this.bufferish = codec.bufferish;
                }
            }
        }

        EncodeBuffer.prototype.codec = preset;

        EncodeBuffer.prototype.write = function(input) {
            this.codec.encode(this, input);
        };


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/encode.js":
    /*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // encode.js

        exports.encode = encode;

        var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;

        function encode(input, options) {
            var encoder = new EncodeBuffer(options);
            encoder.write(input);
            return encoder.read();
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/encoder.js":
    /*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encoder.js ***!
  \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // encoder.js

        exports.Encoder = Encoder;

        var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
        var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;

        function Encoder(options) {
            if (!(this instanceof Encoder)) return new Encoder(options);
            EncodeBuffer.call(this, options);
        }

        Encoder.prototype = new EncodeBuffer();

        EventLite.mixin(Encoder.prototype);

        Encoder.prototype.encode = function(chunk) {
            this.write(chunk);
            this.emit("data", this.read());
        };

        Encoder.prototype.end = function(chunk) {
            if (arguments.length) this.encode(chunk);
            this.flush();
            this.emit("end");
        };


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/ext-buffer.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-buffer.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // ext-buffer.js

        exports.ExtBuffer = ExtBuffer;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

        function ExtBuffer(buffer, type) {
            if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
            this.buffer = Bufferish.from(buffer);
            this.type = type;
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/ext-packer.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-packer.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // ext-packer.js

        exports.setExtPackers = setExtPackers;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var Buffer = Bufferish.global;
        var packTypedArray = Bufferish.Uint8Array.from;
        var _encode;

        var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

        function setExtPackers(codec) {
            codec.addExtPacker(0x0E, Error, [packError, encode]);
            codec.addExtPacker(0x01, EvalError, [packError, encode]);
            codec.addExtPacker(0x02, RangeError, [packError, encode]);
            codec.addExtPacker(0x03, ReferenceError, [packError, encode]);
            codec.addExtPacker(0x04, SyntaxError, [packError, encode]);
            codec.addExtPacker(0x05, TypeError, [packError, encode]);
            codec.addExtPacker(0x06, URIError, [packError, encode]);

            codec.addExtPacker(0x0A, RegExp, [packRegExp, encode]);
            codec.addExtPacker(0x0B, Boolean, [packValueOf, encode]);
            codec.addExtPacker(0x0C, String, [packValueOf, encode]);
            codec.addExtPacker(0x0D, Date, [Number, encode]);
            codec.addExtPacker(0x0F, Number, [packValueOf, encode]);

            if ("undefined" !== typeof Uint8Array) {
                codec.addExtPacker(0x11, Int8Array, packTypedArray);
                codec.addExtPacker(0x12, Uint8Array, packTypedArray);
                codec.addExtPacker(0x13, Int16Array, packTypedArray);
                codec.addExtPacker(0x14, Uint16Array, packTypedArray);
                codec.addExtPacker(0x15, Int32Array, packTypedArray);
                codec.addExtPacker(0x16, Uint32Array, packTypedArray);
                codec.addExtPacker(0x17, Float32Array, packTypedArray);

                // PhantomJS/1.9.7 doesn't have Float64Array
                if ("undefined" !== typeof Float64Array) {
                    codec.addExtPacker(0x18, Float64Array, packTypedArray);
                }

                // IE10 doesn't have Uint8ClampedArray
                if ("undefined" !== typeof Uint8ClampedArray) {
                    codec.addExtPacker(0x19, Uint8ClampedArray, packTypedArray);
                }

                codec.addExtPacker(0x1A, ArrayBuffer, packTypedArray);
                codec.addExtPacker(0x1D, DataView, packTypedArray);
            }

            if (Bufferish.hasBuffer) {
                codec.addExtPacker(0x1B, Buffer, Bufferish.from);
            }
        }

        function encode(input) {
            if (!_encode) _encode = __webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode; // lazy load
            return _encode(input);
        }

        function packValueOf(value) {
            return (value).valueOf();
        }

        function packRegExp(value) {
            value = RegExp.prototype.toString.call(value).split("/");
            value.shift();
            var out = [value.pop()];
            out.unshift(value.join("/"));
            return out;
        }

        function packError(value) {
            var out = {};
            for (var key in ERROR_COLUMNS) {
                out[key] = value[key];
            }
            return out;
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/ext-unpacker.js":
    /*!*******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-unpacker.js ***!
  \*******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // ext-unpacker.js

        exports.setExtUnpackers = setExtUnpackers;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var Buffer = Bufferish.global;
        var _decode;

        var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

        function setExtUnpackers(codec) {
            codec.addExtUnpacker(0x0E, [decode, unpackError(Error)]);
            codec.addExtUnpacker(0x01, [decode, unpackError(EvalError)]);
            codec.addExtUnpacker(0x02, [decode, unpackError(RangeError)]);
            codec.addExtUnpacker(0x03, [decode, unpackError(ReferenceError)]);
            codec.addExtUnpacker(0x04, [decode, unpackError(SyntaxError)]);
            codec.addExtUnpacker(0x05, [decode, unpackError(TypeError)]);
            codec.addExtUnpacker(0x06, [decode, unpackError(URIError)]);

            codec.addExtUnpacker(0x0A, [decode, unpackRegExp]);
            codec.addExtUnpacker(0x0B, [decode, unpackClass(Boolean)]);
            codec.addExtUnpacker(0x0C, [decode, unpackClass(String)]);
            codec.addExtUnpacker(0x0D, [decode, unpackClass(Date)]);
            codec.addExtUnpacker(0x0F, [decode, unpackClass(Number)]);

            if ("undefined" !== typeof Uint8Array) {
                codec.addExtUnpacker(0x11, unpackClass(Int8Array));
                codec.addExtUnpacker(0x12, unpackClass(Uint8Array));
                codec.addExtUnpacker(0x13, [unpackArrayBuffer, unpackClass(Int16Array)]);
                codec.addExtUnpacker(0x14, [unpackArrayBuffer, unpackClass(Uint16Array)]);
                codec.addExtUnpacker(0x15, [unpackArrayBuffer, unpackClass(Int32Array)]);
                codec.addExtUnpacker(0x16, [unpackArrayBuffer, unpackClass(Uint32Array)]);
                codec.addExtUnpacker(0x17, [unpackArrayBuffer, unpackClass(Float32Array)]);

                // PhantomJS/1.9.7 doesn't have Float64Array
                if ("undefined" !== typeof Float64Array) {
                    codec.addExtUnpacker(0x18, [unpackArrayBuffer, unpackClass(Float64Array)]);
                }

                // IE10 doesn't have Uint8ClampedArray
                if ("undefined" !== typeof Uint8ClampedArray) {
                    codec.addExtUnpacker(0x19, unpackClass(Uint8ClampedArray));
                }

                codec.addExtUnpacker(0x1A, unpackArrayBuffer);
                codec.addExtUnpacker(0x1D, [unpackArrayBuffer, unpackClass(DataView)]);
            }

            if (Bufferish.hasBuffer) {
                codec.addExtUnpacker(0x1B, unpackClass(Buffer));
            }
        }

        function decode(input) {
            if (!_decode) _decode = __webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode; // lazy load
            return _decode(input);
        }

        function unpackRegExp(value) {
            return RegExp.apply(null, value);
        }

        function unpackError(Class) {
            return function(value) {
                var out = new Class();
                for (var key in ERROR_COLUMNS) {
                    out[key] = value[key];
                }
                return out;
            };
        }

        function unpackClass(Class) {
            return function(value) {
                return new Class(value);
            };
        }

        function unpackArrayBuffer(value) {
            return (new Uint8Array(value)).buffer;
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/ext.js":
    /*!**********************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext.js ***!
  \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // ext.js

        // load both interfaces
        __webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
        __webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

        exports.createCodec = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").createCodec;


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/flex-buffer.js":
    /*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/flex-buffer.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // flex-buffer.js

        exports.FlexDecoder = FlexDecoder;
        exports.FlexEncoder = FlexEncoder;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

        var MIN_BUFFER_SIZE = 2048;
        var MAX_BUFFER_SIZE = 65536;
        var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";

        function FlexDecoder() {
            if (!(this instanceof FlexDecoder)) return new FlexDecoder();
        }

        function FlexEncoder() {
            if (!(this instanceof FlexEncoder)) return new FlexEncoder();
        }

        FlexDecoder.mixin = mixinFactory(getDecoderMethods());
        FlexDecoder.mixin(FlexDecoder.prototype);

        FlexEncoder.mixin = mixinFactory(getEncoderMethods());
        FlexEncoder.mixin(FlexEncoder.prototype);

        function getDecoderMethods() {
            return {
                bufferish: Bufferish,
                write: write,
                fetch: fetch,
                flush: flush,
                push: push,
                pull: pull,
                read: read,
                reserve: reserve,
                offset: 0
            };

            function write(chunk) {
                var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
                this.buffer = prev ? (chunk ? this.bufferish.concat([prev, chunk]) : prev) : chunk;
                this.offset = 0;
            }

            function flush() {
                while (this.offset < this.buffer.length) {
                    var start = this.offset;
                    var value;
                    try {
                        value = this.fetch();
                    } catch (e) {
                        if (e && e.message != BUFFER_SHORTAGE) throw e;
                        // rollback
                        this.offset = start;
                        break;
                    }
                    this.push(value);
                }
            }

            function reserve(length) {
                var start = this.offset;
                var end = start + length;
                if (end > this.buffer.length) throw new Error(BUFFER_SHORTAGE);
                this.offset = end;
                return start;
            }
        }

        function getEncoderMethods() {
            return {
                bufferish: Bufferish,
                write: write,
                fetch: fetch,
                flush: flush,
                push: push,
                pull: pull,
                read: read,
                reserve: reserve,
                send: send,
                maxBufferSize: MAX_BUFFER_SIZE,
                minBufferSize: MIN_BUFFER_SIZE,
                offset: 0,
                start: 0
            };

            function fetch() {
                var start = this.start;
                if (start < this.offset) {
                    var end = this.start = this.offset;
                    return Bufferish.prototype.slice.call(this.buffer, start, end);
                }
            }

            function flush() {
                while (this.start < this.offset) {
                    var value = this.fetch();
                    if (value) this.push(value);
                }
            }

            function pull() {
                var buffers = this.buffers || (this.buffers = []);
                var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
                buffers.length = 0; // buffer exhausted
                return chunk;
            }

            function reserve(length) {
                var req = length | 0;

                if (this.buffer) {
                    var size = this.buffer.length;
                    var start = this.offset | 0;
                    var end = start + req;

                    // is it long enough?
                    if (end < size) {
                        this.offset = end;
                        return start;
                    }

                    // flush current buffer
                    this.flush();

                    // resize it to 2x current length
                    length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
                }

                // minimum buffer size
                length = Math.max(length, this.minBufferSize);

                // allocate new buffer
                this.buffer = this.bufferish.alloc(length);
                this.start = 0;
                this.offset = req;
                return 0;
            }

            function send(buffer) {
                var length = buffer.length;
                if (length > this.minBufferSize) {
                    this.flush();
                    this.push(buffer);
                } else {
                    var offset = this.reserve(length);
                    Bufferish.prototype.copy.call(buffer, this.buffer, offset);
                }
            }
        }

        // common methods

        function write() {
            throw new Error("method not implemented: write()");
        }

        function fetch() {
            throw new Error("method not implemented: fetch()");
        }

        function read() {
            var length = this.buffers && this.buffers.length;

            // fetch the first result
            if (!length) return this.fetch();

            // flush current buffer
            this.flush();

            // read from the results
            return this.pull();
        }

        function push(chunk) {
            var buffers = this.buffers || (this.buffers = []);
            buffers.push(chunk);
        }

        function pull() {
            var buffers = this.buffers || (this.buffers = []);
            return buffers.shift();
        }

        function mixinFactory(source) {
            return mixin;

            function mixin(target) {
                for (var key in source) {
                    target[key] = source[key];
                }
                return target;
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/read-core.js":
    /*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-core.js ***!
  \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // read-core.js

        var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;
        var ExtUnpacker = __webpack_require__(/*! ./ext-unpacker */ "./node_modules/msgpack-lite/lib/ext-unpacker.js");
        var readUint8 = __webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js").readUint8;
        var ReadToken = __webpack_require__(/*! ./read-token */ "./node_modules/msgpack-lite/lib/read-token.js");
        var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

        CodecBase.install({
            addExtUnpacker: addExtUnpacker,
            getExtUnpacker: getExtUnpacker,
            init: init
        });

        exports.preset = init.call(CodecBase.preset);

        function getDecoder(options) {
            var readToken = ReadToken.getReadToken(options);
            return decode;

            function decode(decoder) {
                var type = readUint8(decoder);
                var func = readToken[type];
                if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
                return func(decoder);
            }
        }

        function init() {
            var options = this.options;
            this.decode = getDecoder(options);

            if (options && options.preset) {
                ExtUnpacker.setExtUnpackers(this);
            }

            return this;
        }

        function addExtUnpacker(etype, unpacker) {
            var unpackers = this.extUnpackers || (this.extUnpackers = []);
            unpackers[etype] = CodecBase.filter(unpacker);
        }

        function getExtUnpacker(type) {
            var unpackers = this.extUnpackers || (this.extUnpackers = []);
            return unpackers[type] || extUnpacker;

            function extUnpacker(buffer) {
                return new ExtBuffer(buffer, type);
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/read-format.js":
    /*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-format.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // read-format.js

        var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
        var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
        var Uint64BE = Int64Buffer.Uint64BE;
        var Int64BE = Int64Buffer.Int64BE;

        exports.getReadFormat = getReadFormat;
        exports.readUint8 = uint8;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

        var HAS_MAP = ("undefined" !== typeof Map);
        var NO_ASSERT = true;

        function getReadFormat(options) {
            var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
            var int64 = options && options.int64;
            var usemap = HAS_MAP && options && options.usemap;

            var readFormat = {
                map: (usemap ? map_to_map : map_to_obj),
                array: array,
                str: str,
                bin: (binarraybuffer ? bin_arraybuffer : bin_buffer),
                ext: ext,
                uint8: uint8,
                uint16: uint16,
                uint32: uint32,
                uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
                int8: int8,
                int16: int16,
                int32: int32,
                int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
                float32: read(4, readFloatBE),
                float64: read(8, readDoubleBE)
            };

            return readFormat;
        }

        function map_to_obj(decoder, len) {
            var value = {};
            var i;
            var k = new Array(len);
            var v = new Array(len);

            var decode = decoder.codec.decode;
            for (i = 0; i < len; i++) {
                k[i] = decode(decoder);
                v[i] = decode(decoder);
            }
            for (i = 0; i < len; i++) {
                value[k[i]] = v[i];
            }
            return value;
        }

        function map_to_map(decoder, len) {
            var value = new Map();
            var i;
            var k = new Array(len);
            var v = new Array(len);

            var decode = decoder.codec.decode;
            for (i = 0; i < len; i++) {
                k[i] = decode(decoder);
                v[i] = decode(decoder);
            }
            for (i = 0; i < len; i++) {
                value.set(k[i], v[i]);
            }
            return value;
        }

        function array(decoder, len) {
            var value = new Array(len);
            var decode = decoder.codec.decode;
            for (var i = 0; i < len; i++) {
                value[i] = decode(decoder);
            }
            return value;
        }

        function str(decoder, len) {
            var start = decoder.reserve(len);
            var end = start + len;
            return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
        }

        function bin_buffer(decoder, len) {
            var start = decoder.reserve(len);
            var end = start + len;
            var buf = BufferProto.slice.call(decoder.buffer, start, end);
            return Bufferish.from(buf);
        }

        function bin_arraybuffer(decoder, len) {
            var start = decoder.reserve(len);
            var end = start + len;
            var buf = BufferProto.slice.call(decoder.buffer, start, end);
            return Bufferish.Uint8Array.from(buf).buffer;
        }

        function ext(decoder, len) {
            var start = decoder.reserve(len+1);
            var type = decoder.buffer[start++];
            var end = start + len;
            var unpack = decoder.codec.getExtUnpacker(type);
            if (!unpack) throw new Error("Invalid ext type: " + (type ? ("0x" + type.toString(16)) : type));
            var buf = BufferProto.slice.call(decoder.buffer, start, end);
            return unpack(buf);
        }

        function uint8(decoder) {
            var start = decoder.reserve(1);
            return decoder.buffer[start];
        }

        function int8(decoder) {
            var start = decoder.reserve(1);
            var value = decoder.buffer[start];
            return (value & 0x80) ? value - 0x100 : value;
        }

        function uint16(decoder) {
            var start = decoder.reserve(2);
            var buffer = decoder.buffer;
            return (buffer[start++] << 8) | buffer[start];
        }

        function int16(decoder) {
            var start = decoder.reserve(2);
            var buffer = decoder.buffer;
            var value = (buffer[start++] << 8) | buffer[start];
            return (value & 0x8000) ? value - 0x10000 : value;
        }

        function uint32(decoder) {
            var start = decoder.reserve(4);
            var buffer = decoder.buffer;
            return (buffer[start++] * 16777216) + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
        }

        function int32(decoder) {
            var start = decoder.reserve(4);
            var buffer = decoder.buffer;
            return (buffer[start++] << 24) | (buffer[start++] << 16) | (buffer[start++] << 8) | buffer[start];
        }

        function read(len, method) {
            return function(decoder) {
                var start = decoder.reserve(len);
                return method.call(decoder.buffer, start, NO_ASSERT);
            };
        }

        function readUInt64BE(start) {
            return new Uint64BE(this, start).toNumber();
        }

        function readInt64BE(start) {
            return new Int64BE(this, start).toNumber();
        }

        function readUInt64BE_int64(start) {
            return new Uint64BE(this, start);
        }

        function readInt64BE_int64(start) {
            return new Int64BE(this, start);
        }

        function readFloatBE(start) {
            return ieee754.read(this, start, false, 23, 4);
        }

        function readDoubleBE(start) {
            return ieee754.read(this, start, false, 52, 8);
        }

        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/read-token.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-token.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // read-token.js

        var ReadFormat = __webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js");

        exports.getReadToken = getReadToken;

        function getReadToken(options) {
            var format = ReadFormat.getReadFormat(options);

            if (options && options.useraw) {
                return init_useraw(format);
            } else {
                return init_token(format);
            }
        }

        function init_token(format) {
            var i;
            var token = new Array(256);

            // positive fixint -- 0x00 - 0x7f
            for (i = 0x00; i <= 0x7f; i++) {
                token[i] = constant(i);
            }

            // fixmap -- 0x80 - 0x8f
            for (i = 0x80; i <= 0x8f; i++) {
                token[i] = fix(i - 0x80, format.map);
            }

            // fixarray -- 0x90 - 0x9f
            for (i = 0x90; i <= 0x9f; i++) {
                token[i] = fix(i - 0x90, format.array);
            }

            // fixstr -- 0xa0 - 0xbf
            for (i = 0xa0; i <= 0xbf; i++) {
                token[i] = fix(i - 0xa0, format.str);
            }

            // nil -- 0xc0
            token[0xc0] = constant(null);

            // (never used) -- 0xc1
            token[0xc1] = null;

            // false -- 0xc2
            // true -- 0xc3
            token[0xc2] = constant(false);
            token[0xc3] = constant(true);

            // bin 8 -- 0xc4
            // bin 16 -- 0xc5
            // bin 32 -- 0xc6
            token[0xc4] = flex(format.uint8, format.bin);
            token[0xc5] = flex(format.uint16, format.bin);
            token[0xc6] = flex(format.uint32, format.bin);

            // ext 8 -- 0xc7
            // ext 16 -- 0xc8
            // ext 32 -- 0xc9
            token[0xc7] = flex(format.uint8, format.ext);
            token[0xc8] = flex(format.uint16, format.ext);
            token[0xc9] = flex(format.uint32, format.ext);

            // float 32 -- 0xca
            // float 64 -- 0xcb
            token[0xca] = format.float32;
            token[0xcb] = format.float64;

            // uint 8 -- 0xcc
            // uint 16 -- 0xcd
            // uint 32 -- 0xce
            // uint 64 -- 0xcf
            token[0xcc] = format.uint8;
            token[0xcd] = format.uint16;
            token[0xce] = format.uint32;
            token[0xcf] = format.uint64;

            // int 8 -- 0xd0
            // int 16 -- 0xd1
            // int 32 -- 0xd2
            // int 64 -- 0xd3
            token[0xd0] = format.int8;
            token[0xd1] = format.int16;
            token[0xd2] = format.int32;
            token[0xd3] = format.int64;

            // fixext 1 -- 0xd4
            // fixext 2 -- 0xd5
            // fixext 4 -- 0xd6
            // fixext 8 -- 0xd7
            // fixext 16 -- 0xd8
            token[0xd4] = fix(1, format.ext);
            token[0xd5] = fix(2, format.ext);
            token[0xd6] = fix(4, format.ext);
            token[0xd7] = fix(8, format.ext);
            token[0xd8] = fix(16, format.ext);

            // str 8 -- 0xd9
            // str 16 -- 0xda
            // str 32 -- 0xdb
            token[0xd9] = flex(format.uint8, format.str);
            token[0xda] = flex(format.uint16, format.str);
            token[0xdb] = flex(format.uint32, format.str);

            // array 16 -- 0xdc
            // array 32 -- 0xdd
            token[0xdc] = flex(format.uint16, format.array);
            token[0xdd] = flex(format.uint32, format.array);

            // map 16 -- 0xde
            // map 32 -- 0xdf
            token[0xde] = flex(format.uint16, format.map);
            token[0xdf] = flex(format.uint32, format.map);

            // negative fixint -- 0xe0 - 0xff
            for (i = 0xe0; i <= 0xff; i++) {
                token[i] = constant(i - 0x100);
            }

            return token;
        }

        function init_useraw(format) {
            var i;
            var token = init_token(format).slice();

            // raw 8 -- 0xd9
            // raw 16 -- 0xda
            // raw 32 -- 0xdb
            token[0xd9] = token[0xc4];
            token[0xda] = token[0xc5];
            token[0xdb] = token[0xc6];

            // fixraw -- 0xa0 - 0xbf
            for (i = 0xa0; i <= 0xbf; i++) {
                token[i] = fix(i - 0xa0, format.bin);
            }

            return token;
        }

        function constant(value) {
            return function() {
                return value;
            };
        }

        function flex(lenFunc, decodeFunc) {
            return function(decoder) {
                var len = lenFunc(decoder);
                return decodeFunc(decoder, len);
            };
        }

        function fix(len, method) {
            return function(decoder) {
                return method(decoder, len);
            };
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/write-core.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-core.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // write-core.js

        var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;
        var ExtPacker = __webpack_require__(/*! ./ext-packer */ "./node_modules/msgpack-lite/lib/ext-packer.js");
        var WriteType = __webpack_require__(/*! ./write-type */ "./node_modules/msgpack-lite/lib/write-type.js");
        var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

        CodecBase.install({
            addExtPacker: addExtPacker,
            getExtPacker: getExtPacker,
            init: init
        });

        exports.preset = init.call(CodecBase.preset);

        function getEncoder(options) {
            var writeType = WriteType.getWriteType(options);
            return encode;

            function encode(encoder, value) {
                var func = writeType[typeof value];
                if (!func) throw new Error("Unsupported type \"" + (typeof value) + "\": " + value);
                func(encoder, value);
            }
        }

        function init() {
            var options = this.options;
            this.encode = getEncoder(options);

            if (options && options.preset) {
                ExtPacker.setExtPackers(this);
            }

            return this;
        }

        function addExtPacker(etype, Class, packer) {
            packer = CodecBase.filter(packer);
            var name = Class.name;
            if (name && name !== "Object") {
                var packers = this.extPackers || (this.extPackers = {});
                packers[name] = extPacker;
            } else {
                // fallback for IE
                var list = this.extEncoderList || (this.extEncoderList = []);
                list.unshift([Class, extPacker]);
            }

            function extPacker(value) {
                if (packer) value = packer(value);
                return new ExtBuffer(value, etype);
            }
        }

        function getExtPacker(value) {
            var packers = this.extPackers || (this.extPackers = {});
            var c = value.constructor;
            var e = c && c.name && packers[c.name];
            if (e) return e;

            // fallback for IE
            var list = this.extEncoderList || (this.extEncoderList = []);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var pair = list[i];
                if (c === pair[0]) return pair[1];
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/write-token.js":
    /*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-token.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // write-token.js

        var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
        var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
        var Uint64BE = Int64Buffer.Uint64BE;
        var Int64BE = Int64Buffer.Int64BE;

        var uint8 = __webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8;
        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var Buffer = Bufferish.global;
        var IS_BUFFER_SHIM = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
        var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer.TYPED_ARRAY_SUPPORT;
        var Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};

        exports.getWriteToken = getWriteToken;

        function getWriteToken(options) {
            if (options && options.uint8array) {
                return init_uint8array();
            } else if (NO_TYPED_ARRAY || (Bufferish.hasBuffer && options && options.safe)) {
                return init_safe();
            } else {
                return init_token();
            }
        }

        function init_uint8array() {
            var token = init_token();

            // float 32 -- 0xca
            // float 64 -- 0xcb
            token[0xca] = writeN(0xca, 4, writeFloatBE);
            token[0xcb] = writeN(0xcb, 8, writeDoubleBE);

            return token;
        }

        // Node.js and browsers with TypedArray

        function init_token() {
            // (immediate values)
            // positive fixint -- 0x00 - 0x7f
            // nil -- 0xc0
            // false -- 0xc2
            // true -- 0xc3
            // negative fixint -- 0xe0 - 0xff
            var token = uint8.slice();

            // bin 8 -- 0xc4
            // bin 16 -- 0xc5
            // bin 32 -- 0xc6
            token[0xc4] = write1(0xc4);
            token[0xc5] = write2(0xc5);
            token[0xc6] = write4(0xc6);

            // ext 8 -- 0xc7
            // ext 16 -- 0xc8
            // ext 32 -- 0xc9
            token[0xc7] = write1(0xc7);
            token[0xc8] = write2(0xc8);
            token[0xc9] = write4(0xc9);

            // float 32 -- 0xca
            // float 64 -- 0xcb
            token[0xca] = writeN(0xca, 4, (Buffer_prototype.writeFloatBE || writeFloatBE), true);
            token[0xcb] = writeN(0xcb, 8, (Buffer_prototype.writeDoubleBE || writeDoubleBE), true);

            // uint 8 -- 0xcc
            // uint 16 -- 0xcd
            // uint 32 -- 0xce
            // uint 64 -- 0xcf
            token[0xcc] = write1(0xcc);
            token[0xcd] = write2(0xcd);
            token[0xce] = write4(0xce);
            token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

            // int 8 -- 0xd0
            // int 16 -- 0xd1
            // int 32 -- 0xd2
            // int 64 -- 0xd3
            token[0xd0] = write1(0xd0);
            token[0xd1] = write2(0xd1);
            token[0xd2] = write4(0xd2);
            token[0xd3] = writeN(0xd3, 8, writeInt64BE);

            // str 8 -- 0xd9
            // str 16 -- 0xda
            // str 32 -- 0xdb
            token[0xd9] = write1(0xd9);
            token[0xda] = write2(0xda);
            token[0xdb] = write4(0xdb);

            // array 16 -- 0xdc
            // array 32 -- 0xdd
            token[0xdc] = write2(0xdc);
            token[0xdd] = write4(0xdd);

            // map 16 -- 0xde
            // map 32 -- 0xdf
            token[0xde] = write2(0xde);
            token[0xdf] = write4(0xdf);

            return token;
        }

        // safe mode: for old browsers and who needs asserts

        function init_safe() {
            // (immediate values)
            // positive fixint -- 0x00 - 0x7f
            // nil -- 0xc0
            // false -- 0xc2
            // true -- 0xc3
            // negative fixint -- 0xe0 - 0xff
            var token = uint8.slice();

            // bin 8 -- 0xc4
            // bin 16 -- 0xc5
            // bin 32 -- 0xc6
            token[0xc4] = writeN(0xc4, 1, Buffer.prototype.writeUInt8);
            token[0xc5] = writeN(0xc5, 2, Buffer.prototype.writeUInt16BE);
            token[0xc6] = writeN(0xc6, 4, Buffer.prototype.writeUInt32BE);

            // ext 8 -- 0xc7
            // ext 16 -- 0xc8
            // ext 32 -- 0xc9
            token[0xc7] = writeN(0xc7, 1, Buffer.prototype.writeUInt8);
            token[0xc8] = writeN(0xc8, 2, Buffer.prototype.writeUInt16BE);
            token[0xc9] = writeN(0xc9, 4, Buffer.prototype.writeUInt32BE);

            // float 32 -- 0xca
            // float 64 -- 0xcb
            token[0xca] = writeN(0xca, 4, Buffer.prototype.writeFloatBE);
            token[0xcb] = writeN(0xcb, 8, Buffer.prototype.writeDoubleBE);

            // uint 8 -- 0xcc
            // uint 16 -- 0xcd
            // uint 32 -- 0xce
            // uint 64 -- 0xcf
            token[0xcc] = writeN(0xcc, 1, Buffer.prototype.writeUInt8);
            token[0xcd] = writeN(0xcd, 2, Buffer.prototype.writeUInt16BE);
            token[0xce] = writeN(0xce, 4, Buffer.prototype.writeUInt32BE);
            token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

            // int 8 -- 0xd0
            // int 16 -- 0xd1
            // int 32 -- 0xd2
            // int 64 -- 0xd3
            token[0xd0] = writeN(0xd0, 1, Buffer.prototype.writeInt8);
            token[0xd1] = writeN(0xd1, 2, Buffer.prototype.writeInt16BE);
            token[0xd2] = writeN(0xd2, 4, Buffer.prototype.writeInt32BE);
            token[0xd3] = writeN(0xd3, 8, writeInt64BE);

            // str 8 -- 0xd9
            // str 16 -- 0xda
            // str 32 -- 0xdb
            token[0xd9] = writeN(0xd9, 1, Buffer.prototype.writeUInt8);
            token[0xda] = writeN(0xda, 2, Buffer.prototype.writeUInt16BE);
            token[0xdb] = writeN(0xdb, 4, Buffer.prototype.writeUInt32BE);

            // array 16 -- 0xdc
            // array 32 -- 0xdd
            token[0xdc] = writeN(0xdc, 2, Buffer.prototype.writeUInt16BE);
            token[0xdd] = writeN(0xdd, 4, Buffer.prototype.writeUInt32BE);

            // map 16 -- 0xde
            // map 32 -- 0xdf
            token[0xde] = writeN(0xde, 2, Buffer.prototype.writeUInt16BE);
            token[0xdf] = writeN(0xdf, 4, Buffer.prototype.writeUInt32BE);

            return token;
        }

        function write1(type) {
            return function(encoder, value) {
                var offset = encoder.reserve(2);
                var buffer = encoder.buffer;
                buffer[offset++] = type;
                buffer[offset] = value;
            };
        }

        function write2(type) {
            return function(encoder, value) {
                var offset = encoder.reserve(3);
                var buffer = encoder.buffer;
                buffer[offset++] = type;
                buffer[offset++] = value >>> 8;
                buffer[offset] = value;
            };
        }

        function write4(type) {
            return function(encoder, value) {
                var offset = encoder.reserve(5);
                var buffer = encoder.buffer;
                buffer[offset++] = type;
                buffer[offset++] = value >>> 24;
                buffer[offset++] = value >>> 16;
                buffer[offset++] = value >>> 8;
                buffer[offset] = value;
            };
        }

        function writeN(type, len, method, noAssert) {
            return function(encoder, value) {
                var offset = encoder.reserve(len + 1);
                encoder.buffer[offset++] = type;
                method.call(encoder.buffer, value, offset, noAssert);
            };
        }

        function writeUInt64BE(value, offset) {
            new Uint64BE(this, offset, value);
        }

        function writeInt64BE(value, offset) {
            new Int64BE(this, offset, value);
        }

        function writeFloatBE(value, offset) {
            ieee754.write(this, value, offset, false, 23, 4);
        }

        function writeDoubleBE(value, offset) {
            ieee754.write(this, value, offset, false, 52, 8);
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/write-type.js":
    /*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-type.js ***!
  \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        // write-type.js

        var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/msgpack-lite/node_modules/isarray/index.js");
        var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
        var Uint64BE = Int64Buffer.Uint64BE;
        var Int64BE = Int64Buffer.Int64BE;

        var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
        var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");
        var WriteToken = __webpack_require__(/*! ./write-token */ "./node_modules/msgpack-lite/lib/write-token.js");
        var uint8 = __webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8;
        var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;

        var HAS_UINT8ARRAY = ("undefined" !== typeof Uint8Array);
        var HAS_MAP = ("undefined" !== typeof Map);

        var extmap = [];
        extmap[1] = 0xd4;
        extmap[2] = 0xd5;
        extmap[4] = 0xd6;
        extmap[8] = 0xd7;
        extmap[16] = 0xd8;

        exports.getWriteType = getWriteType;

        function getWriteType(options) {
            var token = WriteToken.getWriteToken(options);
            var useraw = options && options.useraw;
            var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
            var isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer;
            var bin = binarraybuffer ? bin_arraybuffer : bin_buffer;
            var usemap = HAS_MAP && options && options.usemap;
            var map = usemap ? map_to_map : obj_to_map;

            var writeType = {
                "boolean": bool,
                "function": nil,
                "number": number,
                "object": (useraw ? object_raw : object),
                "string": _string(useraw ? raw_head_size : str_head_size),
                "symbol": nil,
                "undefined": nil
            };

            return writeType;

            // false -- 0xc2
            // true -- 0xc3
            function bool(encoder, value) {
                var type = value ? 0xc3 : 0xc2;
                token[type](encoder, value);
            }

            function number(encoder, value) {
                var ivalue = value | 0;
                var type;
                if (value !== ivalue) {
                    // float 64 -- 0xcb
                    type = 0xcb;
                    token[type](encoder, value);
                    return;
                } else if (-0x20 <= ivalue && ivalue <= 0x7F) {
                    // positive fixint -- 0x00 - 0x7f
                    // negative fixint -- 0xe0 - 0xff
                    type = ivalue & 0xFF;
                } else if (0 <= ivalue) {
                    // uint 8 -- 0xcc
                    // uint 16 -- 0xcd
                    // uint 32 -- 0xce
                    type = (ivalue <= 0xFF) ? 0xcc : (ivalue <= 0xFFFF) ? 0xcd : 0xce;
                } else {
                    // int 8 -- 0xd0
                    // int 16 -- 0xd1
                    // int 32 -- 0xd2
                    type = (-0x80 <= ivalue) ? 0xd0 : (-0x8000 <= ivalue) ? 0xd1 : 0xd2;
                }
                token[type](encoder, ivalue);
            }

            // uint 64 -- 0xcf
            function uint64(encoder, value) {
                var type = 0xcf;
                token[type](encoder, value.toArray());
            }

            // int 64 -- 0xd3
            function int64(encoder, value) {
                var type = 0xd3;
                token[type](encoder, value.toArray());
            }

            // str 8 -- 0xd9
            // str 16 -- 0xda
            // str 32 -- 0xdb
            // fixstr -- 0xa0 - 0xbf
            function str_head_size(length) {
                return (length < 32) ? 1 : (length <= 0xFF) ? 2 : (length <= 0xFFFF) ? 3 : 5;
            }

            // raw 16 -- 0xda
            // raw 32 -- 0xdb
            // fixraw -- 0xa0 - 0xbf
            function raw_head_size(length) {
                return (length < 32) ? 1 : (length <= 0xFFFF) ? 3 : 5;
            }

            function _string(head_size) {
                return string;

                function string(encoder, value) {
                    // prepare buffer
                    var length = value.length;
                    var maxsize = 5 + length * 3;
                    encoder.offset = encoder.reserve(maxsize);
                    var buffer = encoder.buffer;

                    // expected header size
                    var expected = head_size(length);

                    // expected start point
                    var start = encoder.offset + expected;

                    // write string
                    length = BufferProto.write.call(buffer, value, start);

                    // actual header size
                    var actual = head_size(length);

                    // move content when needed
                    if (expected !== actual) {
                        var targetStart = start + actual - expected;
                        var end = start + length;
                        BufferProto.copy.call(buffer, buffer, targetStart, start, end);
                    }

                    // write header
                    var type = (actual === 1) ? (0xa0 + length) : (actual <= 3) ? (0xd7 + actual) : 0xdb;
                    token[type](encoder, length);

                    // move cursor
                    encoder.offset += length;
                }
            }

            function object(encoder, value) {
                // null
                if (value === null) return nil(encoder, value);

                // Buffer
                if (isBuffer(value)) return bin(encoder, value);

                // Array
                if (IS_ARRAY(value)) return array(encoder, value);

                // int64-buffer objects
                if (Uint64BE.isUint64BE(value)) return uint64(encoder, value);
                if (Int64BE.isInt64BE(value)) return int64(encoder, value);

                // ext formats
                var packer = encoder.codec.getExtPacker(value);
                if (packer) value = packer(value);
                if (value instanceof ExtBuffer) return ext(encoder, value);

                // plain old Objects or Map
                map(encoder, value);
            }

            function object_raw(encoder, value) {
                // Buffer
                if (isBuffer(value)) return raw(encoder, value);

                // others
                object(encoder, value);
            }

            // nil -- 0xc0
            function nil(encoder, value) {
                var type = 0xc0;
                token[type](encoder, value);
            }

            // fixarray -- 0x90 - 0x9f
            // array 16 -- 0xdc
            // array 32 -- 0xdd
            function array(encoder, value) {
                var length = value.length;
                var type = (length < 16) ? (0x90 + length) : (length <= 0xFFFF) ? 0xdc : 0xdd;
                token[type](encoder, length);

                var encode = encoder.codec.encode;
                for (var i = 0; i < length; i++) {
                    encode(encoder, value[i]);
                }
            }

            // bin 8 -- 0xc4
            // bin 16 -- 0xc5
            // bin 32 -- 0xc6
            function bin_buffer(encoder, value) {
                var length = value.length;
                var type = (length < 0xFF) ? 0xc4 : (length <= 0xFFFF) ? 0xc5 : 0xc6;
                token[type](encoder, length);
                encoder.send(value);
            }

            function bin_arraybuffer(encoder, value) {
                bin_buffer(encoder, new Uint8Array(value));
            }

            // fixext 1 -- 0xd4
            // fixext 2 -- 0xd5
            // fixext 4 -- 0xd6
            // fixext 8 -- 0xd7
            // fixext 16 -- 0xd8
            // ext 8 -- 0xc7
            // ext 16 -- 0xc8
            // ext 32 -- 0xc9
            function ext(encoder, value) {
                var buffer = value.buffer;
                var length = buffer.length;
                var type = extmap[length] || ((length < 0xFF) ? 0xc7 : (length <= 0xFFFF) ? 0xc8 : 0xc9);
                token[type](encoder, length);
                uint8[value.type](encoder);
                encoder.send(buffer);
            }

            // fixmap -- 0x80 - 0x8f
            // map 16 -- 0xde
            // map 32 -- 0xdf
            function obj_to_map(encoder, value) {
                var keys = Object.keys(value);
                var length = keys.length;
                var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
                token[type](encoder, length);

                var encode = encoder.codec.encode;
                keys.forEach(function(key) {
                    encode(encoder, key);
                    encode(encoder, value[key]);
                });
            }

            // fixmap -- 0x80 - 0x8f
            // map 16 -- 0xde
            // map 32 -- 0xdf
            function map_to_map(encoder, value) {
                if (!(value instanceof Map)) return obj_to_map(encoder, value);

                var length = value.size;
                var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
                token[type](encoder, length);

                var encode = encoder.codec.encode;
                value.forEach(function(val, key, m) {
                    encode(encoder, key);
                    encode(encoder, val);
                });
            }

            // raw 16 -- 0xda
            // raw 32 -- 0xdb
            // fixraw -- 0xa0 - 0xbf
            function raw(encoder, value) {
                var length = value.length;
                var type = (length < 32) ? (0xa0 + length) : (length <= 0xFFFF) ? 0xda : 0xdb;
                token[type](encoder, length);
                encoder.send(value);
            }
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/lib/write-uint8.js":
    /*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-uint8.js ***!
  \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        // write-unit8.js

        var constant = exports.uint8 = new Array(256);

        for (var i = 0x00; i <= 0xFF; i++) {
            constant[i] = write0(i);
        }

        function write0(type) {
            return function(encoder) {
                var offset = encoder.reserve(1);
                encoder.buffer[offset] = type;
            };
        }


        /***/ }),

    /***/ "./node_modules/msgpack-lite/node_modules/isarray/index.js":
    /*!*****************************************************************!*\
  !*** ./node_modules/msgpack-lite/node_modules/isarray/index.js ***!
  \*****************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var toString = {}.toString;

        module.exports = Array.isArray || function (arr) {
            return toString.call(arr) == '[object Array]';
        };


        /***/ }),

    /***/ "./node_modules/process/browser.js":
    /*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        // shim for using process in browser
        var process = module.exports = {};

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout () {
            throw new Error('clearTimeout has not been defined');
        }
        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        } ())
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch(e){
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch(e){
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e){
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e){
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }



        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while(len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) { return [] }

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () { return '/' };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function() { return 0; };


        /***/ }),

    /***/ "./node_modules/punycode/punycode.js":
    /*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
                                                              ;(function(root) {

                                                                  /** Detect free variables */
                                                                  var freeExports =  true && exports &&
                                                                      !exports.nodeType && exports;
                                                                  var freeModule =  true && module &&
                                                                      !module.nodeType && module;
                                                                  var freeGlobal = typeof global == 'object' && global;
                                                                  if (
                                                                      freeGlobal.global === freeGlobal ||
                                                                      freeGlobal.window === freeGlobal ||
                                                                      freeGlobal.self === freeGlobal
                                                                  ) {
                                                                      root = freeGlobal;
                                                                  }

                                                                  /**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
                                                                  var punycode,

                                                                      /** Highest positive signed 32-bit float value */
                                                                      maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

                                                                      /** Bootstring parameters */
                                                                      base = 36,
                                                                      tMin = 1,
                                                                      tMax = 26,
                                                                      skew = 38,
                                                                      damp = 700,
                                                                      initialBias = 72,
                                                                      initialN = 128, // 0x80
                                                                      delimiter = '-', // '\x2D'

                                                                      /** Regular expressions */
                                                                      regexPunycode = /^xn--/,
                                                                      regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
                                                                      regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

                                                                      /** Error messages */
                                                                      errors = {
                                                                          'overflow': 'Overflow: input needs wider integers to process',
                                                                          'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                                                                          'invalid-input': 'Invalid input'
                                                                      },

                                                                      /** Convenience shortcuts */
                                                                      baseMinusTMin = base - tMin,
                                                                      floor = Math.floor,
                                                                      stringFromCharCode = String.fromCharCode,

                                                                      /** Temporary variable */
                                                                      key;

                                                                  /*--------------------------------------------------------------------------*/

                                                                  /**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
                                                                  function error(type) {
                                                                      throw new RangeError(errors[type]);
                                                                  }

                                                                  /**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
                                                                  function map(array, fn) {
                                                                      var length = array.length;
                                                                      var result = [];
                                                                      while (length--) {
                                                                          result[length] = fn(array[length]);
                                                                      }
                                                                      return result;
                                                                  }

                                                                  /**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
                                                                  function mapDomain(string, fn) {
                                                                      var parts = string.split('@');
                                                                      var result = '';
                                                                      if (parts.length > 1) {
                                                                          // In email addresses, only the domain name should be punycoded. Leave
                                                                          // the local part (i.e. everything up to `@`) intact.
                                                                          result = parts[0] + '@';
                                                                          string = parts[1];
                                                                      }
                                                                      // Avoid `split(regex)` for IE8 compatibility. See #17.
                                                                      string = string.replace(regexSeparators, '\x2E');
                                                                      var labels = string.split('.');
                                                                      var encoded = map(labels, fn).join('.');
                                                                      return result + encoded;
                                                                  }

                                                                  /**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
                                                                  function ucs2decode(string) {
                                                                      var output = [],
                                                                          counter = 0,
                                                                          length = string.length,
                                                                          value,
                                                                          extra;
                                                                      while (counter < length) {
                                                                          value = string.charCodeAt(counter++);
                                                                          if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                                                                              // high surrogate, and there is a next character
                                                                              extra = string.charCodeAt(counter++);
                                                                              if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                                                                                  output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                                                                              } else {
                                                                                  // unmatched surrogate; only append this code unit, in case the next
                                                                                  // code unit is the high surrogate of a surrogate pair
                                                                                  output.push(value);
                                                                                  counter--;
                                                                              }
                                                                          } else {
                                                                              output.push(value);
                                                                          }
                                                                      }
                                                                      return output;
                                                                  }

                                                                  /**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
                                                                  function ucs2encode(array) {
                                                                      return map(array, function(value) {
                                                                          var output = '';
                                                                          if (value > 0xFFFF) {
                                                                              value -= 0x10000;
                                                                              output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                                                                              value = 0xDC00 | value & 0x3FF;
                                                                          }
                                                                          output += stringFromCharCode(value);
                                                                          return output;
                                                                      }).join('');
                                                                  }

                                                                  /**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
                                                                  function basicToDigit(codePoint) {
                                                                      if (codePoint - 48 < 10) {
                                                                          return codePoint - 22;
                                                                      }
                                                                      if (codePoint - 65 < 26) {
                                                                          return codePoint - 65;
                                                                      }
                                                                      if (codePoint - 97 < 26) {
                                                                          return codePoint - 97;
                                                                      }
                                                                      return base;
                                                                  }

                                                                  /**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
                                                                  function digitToBasic(digit, flag) {
                                                                      //  0..25 map to ASCII a..z or A..Z
                                                                      // 26..35 map to ASCII 0..9
                                                                      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                                                                  }

                                                                  /**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
                                                                  function adapt(delta, numPoints, firstTime) {
                                                                      var k = 0;
                                                                      delta = firstTime ? floor(delta / damp) : delta >> 1;
                                                                      delta += floor(delta / numPoints);
                                                                      for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                                                                          delta = floor(delta / baseMinusTMin);
                                                                      }
                                                                      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                                                                  }

                                                                  /**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
                                                                  function decode(input) {
                                                                      // Don't use UCS-2
                                                                      var output = [],
                                                                          inputLength = input.length,
                                                                          out,
                                                                          i = 0,
                                                                          n = initialN,
                                                                          bias = initialBias,
                                                                          basic,
                                                                          j,
                                                                          index,
                                                                          oldi,
                                                                          w,
                                                                          k,
                                                                          digit,
                                                                          t,
                                                                          /** Cached calculation results */
                                                                          baseMinusT;

                                                                      // Handle the basic code points: let `basic` be the number of input code
                                                                      // points before the last delimiter, or `0` if there is none, then copy
                                                                      // the first basic code points to the output.

                                                                      basic = input.lastIndexOf(delimiter);
                                                                      if (basic < 0) {
                                                                          basic = 0;
                                                                      }

                                                                      for (j = 0; j < basic; ++j) {
                                                                          // if it's not a basic code point
                                                                          if (input.charCodeAt(j) >= 0x80) {
                                                                              error('not-basic');
                                                                          }
                                                                          output.push(input.charCodeAt(j));
                                                                      }

                                                                      // Main decoding loop: start just after the last delimiter if any basic code
                                                                      // points were copied; start at the beginning otherwise.

                                                                      for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

                                                                          // `index` is the index of the next character to be consumed.
                                                                          // Decode a generalized variable-length integer into `delta`,
                                                                          // which gets added to `i`. The overflow checking is easier
                                                                          // if we increase `i` as we go, then subtract off its starting
                                                                          // value at the end to obtain `delta`.
                                                                          for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                                                                              if (index >= inputLength) {
                                                                                  error('invalid-input');
                                                                              }

                                                                              digit = basicToDigit(input.charCodeAt(index++));

                                                                              if (digit >= base || digit > floor((maxInt - i) / w)) {
                                                                                  error('overflow');
                                                                              }

                                                                              i += digit * w;
                                                                              t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                                                                              if (digit < t) {
                                                                                  break;
                                                                              }

                                                                              baseMinusT = base - t;
                                                                              if (w > floor(maxInt / baseMinusT)) {
                                                                                  error('overflow');
                                                                              }

                                                                              w *= baseMinusT;

                                                                          }

                                                                          out = output.length + 1;
                                                                          bias = adapt(i - oldi, out, oldi == 0);

                                                                          // `i` was supposed to wrap around from `out` to `0`,
                                                                          // incrementing `n` each time, so we'll fix that now:
                                                                          if (floor(i / out) > maxInt - n) {
                                                                              error('overflow');
                                                                          }

                                                                          n += floor(i / out);
                                                                          i %= out;

                                                                          // Insert `n` at position `i` of the output
                                                                          output.splice(i++, 0, n);

                                                                      }

                                                                      return ucs2encode(output);
                                                                  }

                                                                  /**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
                                                                  function encode(input) {
                                                                      var n,
                                                                          delta,
                                                                          handledCPCount,
                                                                          basicLength,
                                                                          bias,
                                                                          j,
                                                                          m,
                                                                          q,
                                                                          k,
                                                                          t,
                                                                          currentValue,
                                                                          output = [],
                                                                          /** `inputLength` will hold the number of code points in `input`. */
                                                                          inputLength,
                                                                          /** Cached calculation results */
                                                                          handledCPCountPlusOne,
                                                                          baseMinusT,
                                                                          qMinusT;

                                                                      // Convert the input in UCS-2 to Unicode
                                                                      input = ucs2decode(input);

                                                                      // Cache the length
                                                                      inputLength = input.length;

                                                                      // Initialize the state
                                                                      n = initialN;
                                                                      delta = 0;
                                                                      bias = initialBias;

                                                                      // Handle the basic code points
                                                                      for (j = 0; j < inputLength; ++j) {
                                                                          currentValue = input[j];
                                                                          if (currentValue < 0x80) {
                                                                              output.push(stringFromCharCode(currentValue));
                                                                          }
                                                                      }

                                                                      handledCPCount = basicLength = output.length;

                                                                      // `handledCPCount` is the number of code points that have been handled;
                                                                      // `basicLength` is the number of basic code points.

                                                                      // Finish the basic string - if it is not empty - with a delimiter
                                                                      if (basicLength) {
                                                                          output.push(delimiter);
                                                                      }

                                                                      // Main encoding loop:
                                                                      while (handledCPCount < inputLength) {

                                                                          // All non-basic code points < n have been handled already. Find the next
                                                                          // larger one:
                                                                          for (m = maxInt, j = 0; j < inputLength; ++j) {
                                                                              currentValue = input[j];
                                                                              if (currentValue >= n && currentValue < m) {
                                                                                  m = currentValue;
                                                                              }
                                                                          }

                                                                          // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                                                                          // but guard against overflow
                                                                          handledCPCountPlusOne = handledCPCount + 1;
                                                                          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                                                                              error('overflow');
                                                                          }

                                                                          delta += (m - n) * handledCPCountPlusOne;
                                                                          n = m;

                                                                          for (j = 0; j < inputLength; ++j) {
                                                                              currentValue = input[j];

                                                                              if (currentValue < n && ++delta > maxInt) {
                                                                                  error('overflow');
                                                                              }

                                                                              if (currentValue == n) {
                                                                                  // Represent delta as a generalized variable-length integer
                                                                                  for (q = delta, k = base; /* no condition */; k += base) {
                                                                                      t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                                                                                      if (q < t) {
                                                                                          break;
                                                                                      }
                                                                                      qMinusT = q - t;
                                                                                      baseMinusT = base - t;
                                                                                      output.push(
                                                                                          stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                                                                                      );
                                                                                      q = floor(qMinusT / baseMinusT);
                                                                                  }

                                                                                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                                                                                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                                                                  delta = 0;
                                                                                  ++handledCPCount;
                                                                              }
                                                                          }

                                                                          ++delta;
                                                                          ++n;

                                                                      }
                                                                      return output.join('');
                                                                  }

                                                                  /**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
                                                                  function toUnicode(input) {
                                                                      return mapDomain(input, function(string) {
                                                                          return regexPunycode.test(string)
                                                                              ? decode(string.slice(4).toLowerCase())
                                                                          : string;
                                                                      });
                                                                  }

                                                                  /**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
                                                                  function toASCII(input) {
                                                                      return mapDomain(input, function(string) {
                                                                          return regexNonASCII.test(string)
                                                                              ? 'xn--' + encode(string)
                                                                          : string;
                                                                      });
                                                                  }

                                                                  /*--------------------------------------------------------------------------*/

                                                                  /** Define the public API */
                                                                  punycode = {
                                                                      /**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
                                                                      'version': '1.4.1',
                                                                      /**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
                                                                      'ucs2': {
                                                                          'decode': ucs2decode,
                                                                          'encode': ucs2encode
                                                                      },
                                                                      'decode': decode,
                                                                      'encode': encode,
                                                                      'toASCII': toASCII,
                                                                      'toUnicode': toUnicode
                                                                  };

                                                                  /** Expose `punycode` */
                                                                  // Some AMD build optimizers, like r.js, check for specific condition patterns
                                                                  // like the following:
                                                                  if (
                                                                      true
                                                                  ) {
                                                                      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                                                                          return punycode;
                                                                      }).call(exports, __webpack_require__, exports, module),
                                                                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                                                                  } else {}

                                                              }(this));

                                                              /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

        /***/ }),

    /***/ "./node_modules/querystring-es3/decode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.



        // If obj.hasOwnProperty has been overridden, then calling
        // obj.hasOwnProperty(prop) will break.
        // See: https://github.com/joyent/node/issues/1707
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        module.exports = function(qs, sep, eq, options) {
            sep = sep || '&';
            eq = eq || '=';
            var obj = {};

            if (typeof qs !== 'string' || qs.length === 0) {
                return obj;
            }

            var regexp = /\+/g;
            qs = qs.split(sep);

            var maxKeys = 1000;
            if (options && typeof options.maxKeys === 'number') {
                maxKeys = options.maxKeys;
            }

            var len = qs.length;
            // maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
                len = maxKeys;
            }

            for (var i = 0; i < len; ++i) {
                var x = qs[i].replace(regexp, '%20'),
                    idx = x.indexOf(eq),
                    kstr, vstr, k, v;

                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
                    vstr = '';
                }

                k = decodeURIComponent(kstr);
                v = decodeURIComponent(vstr);

                if (!hasOwnProperty(obj, k)) {
                    obj[k] = v;
                } else if (isArray(obj[k])) {
                    obj[k].push(v);
                } else {
                    obj[k] = [obj[k], v];
                }
            }

            return obj;
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };


        /***/ }),

    /***/ "./node_modules/querystring-es3/encode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.



        var stringifyPrimitive = function(v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };

        module.exports = function(obj, sep, eq, name) {
            sep = sep || '&';
            eq = eq || '=';
            if (obj === null) {
                obj = undefined;
            }

            if (typeof obj === 'object') {
                return map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (isArray(obj[k])) {
                        return map(obj[k], function(v) {
                            return ks + encodeURIComponent(stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                    }
                }).join(sep);

            }

            if (!name) return '';
            return encodeURIComponent(stringifyPrimitive(name)) + eq +
                encodeURIComponent(stringifyPrimitive(obj));
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };

        function map (xs, f) {
            if (xs.map) return xs.map(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
                res.push(f(xs[i], i));
            }
            return res;
        }

        var objectKeys = Object.keys || function (obj) {
            var res = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
            }
            return res;
        };


        /***/ }),

    /***/ "./node_modules/querystring-es3/index.js":
    /*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
        exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


        /***/ }),

    /***/ "./node_modules/url/url.js":
    /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.



        var punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
        var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

        exports.parse = urlParse;
        exports.resolve = urlResolve;
        exports.resolveObject = urlResolveObject;
        exports.format = urlFormat;

        exports.Url = Url;

        function Url() {
            this.protocol = null;
            this.slashes = null;
            this.auth = null;
            this.host = null;
            this.port = null;
            this.hostname = null;
            this.hash = null;
            this.search = null;
            this.query = null;
            this.pathname = null;
            this.path = null;
            this.href = null;
        }

        // Reference: RFC 3986, RFC 1808, RFC 2396

        // define these here so at least they only have to be
        // compiled once on the first module load.
        var protocolPattern = /^([a-z0-9.+-]+:)/i,
            portPattern = /:[0-9]*$/,

            // Special case for a simple path URL
            simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

            // RFC 2396: characters reserved for delimiting URLs.
            // We actually just auto-escape these.
            delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

            // RFC 2396: characters not allowed for various reasons.
            unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

            // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
            autoEscape = ['\''].concat(unwise),
            // Characters that are never ever allowed in a hostname.
            // Note that any invalid chars are also handled, but these
            // are the ones that are *expected* to be seen, so we fast-path
            // them.
            nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
            hostEndingChars = ['/', '?', '#'],
            hostnameMaxLen = 255,
            hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
            hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            // protocols that can allow "unsafe" and "unwise" chars.
            unsafeProtocol = {
                'javascript': true,
                'javascript:': true
            },
            // protocols that never have a hostname.
            hostlessProtocol = {
                'javascript': true,
                'javascript:': true
            },
            // protocols that always contain a // bit.
            slashedProtocol = {
                'http': true,
                'https': true,
                'ftp': true,
                'gopher': true,
                'file': true,
                'http:': true,
                'https:': true,
                'ftp:': true,
                'gopher:': true,
                'file:': true
            },
            querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

        function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url;

            var u = new Url;
            u.parse(url, parseQueryString, slashesDenoteHost);
            return u;
        }

        Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
            if (!util.isString(url)) {
                throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
            }

            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf('?'),
                splitter =
                (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
                uSplit = url.split(splitter),
                slashRegex = /\\/g;
            uSplit[0] = uSplit[0].replace(slashRegex, '/');
            url = uSplit.join(splitter);

            var rest = url;

            // trim before proceeding.
            // This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim();

            if (!slashesDenoteHost && url.split('#').length === 1) {
                // Try fast path regexp
                var simplePath = simplePathPattern.exec(rest);
                if (simplePath) {
                    this.path = rest;
                    this.href = rest;
                    this.pathname = simplePath[1];
                    if (simplePath[2]) {
                        this.search = simplePath[2];
                        if (parseQueryString) {
                            this.query = querystring.parse(this.search.substr(1));
                        } else {
                            this.query = this.search.substr(1);
                        }
                    } else if (parseQueryString) {
                        this.search = '';
                        this.query = {};
                    }
                    return this;
                }
            }

            var proto = protocolPattern.exec(rest);
            if (proto) {
                proto = proto[0];
                var lowerProto = proto.toLowerCase();
                this.protocol = lowerProto;
                rest = rest.substr(proto.length);
            }

            // figure out if it's got a host
            // user@server is *always* interpreted as a hostname, and url
            // resolution will treat //foo/bar as host=foo,path=bar because that's
            // how the browser resolves relative URLs.
            if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = rest.substr(0, 2) === '//';
                if (slashes && !(proto && hostlessProtocol[proto])) {
                    rest = rest.substr(2);
                    this.slashes = true;
                }
            }

            if (!hostlessProtocol[proto] &&
                (slashes || (proto && !slashedProtocol[proto]))) {

                // there's a hostname.
                // the first instance of /, ?, ;, or # ends the host.
                //
                // If there is an @ in the hostname, then non-host chars *are* allowed
                // to the left of the last @ sign, unless some host-ending character
                // comes *before* the @-sign.
                // URLs are obnoxious.
                //
                // ex:
                // http://a@b@c/ => user:a@b host:c
                // http://a@b?@c => user:a host:c path:/?@c

                // v0.12 TODO(isaacs): This is not quite how Chrome does things.
                // Review our test case against browsers more comprehensively.

                // find the first instance of any hostEndingChars
                var hostEnd = -1;
                for (var i = 0; i < hostEndingChars.length; i++) {
                    var hec = rest.indexOf(hostEndingChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }

                // at this point, either we have an explicit point where the
                // auth portion cannot go past, or the last @ char is the decider.
                var auth, atSign;
                if (hostEnd === -1) {
                    // atSign can be anywhere.
                    atSign = rest.lastIndexOf('@');
                } else {
                    // atSign must be in auth portion.
                    // http://a@b/c@d => host:b auth:a path:/c@d
                    atSign = rest.lastIndexOf('@', hostEnd);
                }

                // Now we have a portion which is definitely the auth.
                // Pull that off.
                if (atSign !== -1) {
                    auth = rest.slice(0, atSign);
                    rest = rest.slice(atSign + 1);
                    this.auth = decodeURIComponent(auth);
                }

                // the host is the remaining to the left of the first non-host char
                hostEnd = -1;
                for (var i = 0; i < nonHostChars.length; i++) {
                    var hec = rest.indexOf(nonHostChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }
                // if we still have not hit it, then the entire thing is a host.
                if (hostEnd === -1)
                    hostEnd = rest.length;

                this.host = rest.slice(0, hostEnd);
                rest = rest.slice(hostEnd);

                // pull out port.
                this.parseHost();

                // we've indicated that there is a hostname,
                // so even if it's empty, it has to be present.
                this.hostname = this.hostname || '';

                // if hostname begins with [ and ends with ]
                // assume that it's an IPv6 address.
                var ipv6Hostname = this.hostname[0] === '[' &&
                    this.hostname[this.hostname.length - 1] === ']';

                // validate a little.
                if (!ipv6Hostname) {
                    var hostparts = this.hostname.split(/\./);
                    for (var i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (!part) continue;
                        if (!part.match(hostnamePartPattern)) {
                            var newpart = '';
                            for (var j = 0, k = part.length; j < k; j++) {
                                if (part.charCodeAt(j) > 127) {
                                    // we replace non-ASCII char with a temporary placeholder
                                    // we need this to make sure size of hostname is not
                                    // broken by replacing non-ASCII by nothing
                                    newpart += 'x';
                                } else {
                                    newpart += part[j];
                                }
                            }
                            // we test again with ASCII char only
                            if (!newpart.match(hostnamePartPattern)) {
                                var validParts = hostparts.slice(0, i);
                                var notHost = hostparts.slice(i + 1);
                                var bit = part.match(hostnamePartStart);
                                if (bit) {
                                    validParts.push(bit[1]);
                                    notHost.unshift(bit[2]);
                                }
                                if (notHost.length) {
                                    rest = '/' + notHost.join('.') + rest;
                                }
                                this.hostname = validParts.join('.');
                                break;
                            }
                        }
                    }
                }

                if (this.hostname.length > hostnameMaxLen) {
                    this.hostname = '';
                } else {
                    // hostnames are always lower case.
                    this.hostname = this.hostname.toLowerCase();
                }

                if (!ipv6Hostname) {
                    // IDNA Support: Returns a punycoded representation of "domain".
                    // It only converts parts of the domain name that
                    // have non-ASCII characters, i.e. it doesn't matter if
                    // you call it with a domain that already is ASCII-only.
                    this.hostname = punycode.toASCII(this.hostname);
                }

                var p = this.port ? ':' + this.port : '';
                var h = this.hostname || '';
                this.host = h + p;
                this.href += this.host;

                // strip [ and ] from the hostname
                // the host field still retains them, though
                if (ipv6Hostname) {
                    this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                    if (rest[0] !== '/') {
                        rest = '/' + rest;
                    }
                }
            }

            // now rest is set to the post-host stuff.
            // chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) {

                // First, make 100% sure that any "autoEscape" chars get
                // escaped, even if encodeURIComponent doesn't think they
                // need to be.
                for (var i = 0, l = autoEscape.length; i < l; i++) {
                    var ae = autoEscape[i];
                    if (rest.indexOf(ae) === -1)
                        continue;
                    var esc = encodeURIComponent(ae);
                    if (esc === ae) {
                        esc = escape(ae);
                    }
                    rest = rest.split(ae).join(esc);
                }
            }


            // chop off from the tail first.
            var hash = rest.indexOf('#');
            if (hash !== -1) {
                // got a fragment string.
                this.hash = rest.substr(hash);
                rest = rest.slice(0, hash);
            }
            var qm = rest.indexOf('?');
            if (qm !== -1) {
                this.search = rest.substr(qm);
                this.query = rest.substr(qm + 1);
                if (parseQueryString) {
                    this.query = querystring.parse(this.query);
                }
                rest = rest.slice(0, qm);
            } else if (parseQueryString) {
                // no query string, but parseQueryString still requested
                this.search = '';
                this.query = {};
            }
            if (rest) this.pathname = rest;
            if (slashedProtocol[lowerProto] &&
                this.hostname && !this.pathname) {
                this.pathname = '/';
            }

            //to support http.request
            if (this.pathname || this.search) {
                var p = this.pathname || '';
                var s = this.search || '';
                this.path = p + s;
            }

            // finally, reconstruct the href based on what has been validated.
            this.href = this.format();
            return this;
        };

        // format a parsed object into a url string
        function urlFormat(obj) {
            // ensure it's an object, and not a string url.
            // If it's an obj, this is a no-op.
            // this way, you can call url_format() on strings
            // to clean up potentially wonky urls.
            if (util.isString(obj)) obj = urlParse(obj);
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
            return obj.format();
        }

        Url.prototype.format = function() {
            var auth = this.auth || '';
            if (auth) {
                auth = encodeURIComponent(auth);
                auth = auth.replace(/%3A/i, ':');
                auth += '@';
            }

            var protocol = this.protocol || '',
                pathname = this.pathname || '',
                hash = this.hash || '',
                host = false,
                query = '';

            if (this.host) {
                host = auth + this.host;
            } else if (this.hostname) {
                host = auth + (this.hostname.indexOf(':') === -1 ?
                               this.hostname :
                               '[' + this.hostname + ']');
                if (this.port) {
                    host += ':' + this.port;
                }
            }

            if (this.query &&
                util.isObject(this.query) &&
                Object.keys(this.query).length) {
                query = querystring.stringify(this.query);
            }

            var search = this.search || (query && ('?' + query)) || '';

            if (protocol && protocol.substr(-1) !== ':') protocol += ':';

            // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
            // unless they had them to begin with.
            if (this.slashes ||
                (!protocol || slashedProtocol[protocol]) && host !== false) {
                host = '//' + (host || '');
                if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
            } else if (!host) {
                host = '';
            }

            if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
            if (search && search.charAt(0) !== '?') search = '?' + search;

            pathname = pathname.replace(/[?#]/g, function(match) {
                return encodeURIComponent(match);
            });
            search = search.replace('#', '%23');

            return protocol + host + pathname + search + hash;
        };

        function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative);
        }

        Url.prototype.resolve = function(relative) {
            return this.resolveObject(urlParse(relative, false, true)).format();
        };

        function urlResolveObject(source, relative) {
            if (!source) return relative;
            return urlParse(source, false, true).resolveObject(relative);
        }

        Url.prototype.resolveObject = function(relative) {
            if (util.isString(relative)) {
                var rel = new Url();
                rel.parse(relative, false, true);
                relative = rel;
            }

            var result = new Url();
            var tkeys = Object.keys(this);
            for (var tk = 0; tk < tkeys.length; tk++) {
                var tkey = tkeys[tk];
                result[tkey] = this[tkey];
            }

            // hash is always overridden, no matter what.
            // even href="" will remove it.
            result.hash = relative.hash;

            // if the relative url is empty, then there's nothing left to do here.
            if (relative.href === '') {
                result.href = result.format();
                return result;
            }

            // hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
                // take everything except the protocol from relative
                var rkeys = Object.keys(relative);
                for (var rk = 0; rk < rkeys.length; rk++) {
                    var rkey = rkeys[rk];
                    if (rkey !== 'protocol')
                        result[rkey] = relative[rkey];
                }

                //urlParse appends trailing / to urls like http://www.example.com
                if (slashedProtocol[result.protocol] &&
                    result.hostname && !result.pathname) {
                    result.path = result.pathname = '/';
                }

                result.href = result.format();
                return result;
            }

            if (relative.protocol && relative.protocol !== result.protocol) {
                // if it's a known url protocol, then changing
                // the protocol does weird things
                // first, if it's not file:, then we MUST have a host,
                // and if there was a path
                // to begin with, then we MUST have a path.
                // if it is file:, then the host is dropped,
                // because that's known to be hostless.
                // anything else is assumed to be absolute.
                if (!slashedProtocol[relative.protocol]) {
                    var keys = Object.keys(relative);
                    for (var v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                    }
                    result.href = result.format();
                    return result;
                }

                result.protocol = relative.protocol;
                if (!relative.host && !hostlessProtocol[relative.protocol]) {
                    var relPath = (relative.pathname || '').split('/');
                    while (relPath.length && !(relative.host = relPath.shift()));
                    if (!relative.host) relative.host = '';
                    if (!relative.hostname) relative.hostname = '';
                    if (relPath[0] !== '') relPath.unshift('');
                    if (relPath.length < 2) relPath.unshift('');
                    result.pathname = relPath.join('/');
                } else {
                    result.pathname = relative.pathname;
                }
                result.search = relative.search;
                result.query = relative.query;
                result.host = relative.host || '';
                result.auth = relative.auth;
                result.hostname = relative.hostname || relative.host;
                result.port = relative.port;
                // to support http.request
                if (result.pathname || result.search) {
                    var p = result.pathname || '';
                    var s = result.search || '';
                    result.path = p + s;
                }
                result.slashes = result.slashes || relative.slashes;
                result.href = result.format();
                return result;
            }

            var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
                isRelAbs = (
                    relative.host ||
                    relative.pathname && relative.pathname.charAt(0) === '/'
                ),
                mustEndAbs = (isRelAbs || isSourceAbs ||
                              (result.host && relative.pathname)),
                removeAllDots = mustEndAbs,
                srcPath = result.pathname && result.pathname.split('/') || [],
                relPath = relative.pathname && relative.pathname.split('/') || [],
                psychotic = result.protocol && !slashedProtocol[result.protocol];

            // if the url is a non-slashed url, then relative
            // links like ../.. should be able
            // to crawl up to the hostname, as well.  This is strange.
            // result.protocol has already been set by now.
            // Later on, put the first path part into the host field.
            if (psychotic) {
                result.hostname = '';
                result.port = null;
                if (result.host) {
                    if (srcPath[0] === '') srcPath[0] = result.host;
                    else srcPath.unshift(result.host);
                }
                result.host = '';
                if (relative.protocol) {
                    relative.hostname = null;
                    relative.port = null;
                    if (relative.host) {
                        if (relPath[0] === '') relPath[0] = relative.host;
                        else relPath.unshift(relative.host);
                    }
                    relative.host = null;
                }
                mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
            }

            if (isRelAbs) {
                // it's absolute.
                result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
                result.hostname = (relative.hostname || relative.hostname === '') ?
                    relative.hostname : result.hostname;
                result.search = relative.search;
                result.query = relative.query;
                srcPath = relPath;
                // fall through to the dot-handling below.
            } else if (relPath.length) {
                // it's relative
                // throw away the existing file, and take the new path instead.
                if (!srcPath) srcPath = [];
                srcPath.pop();
                srcPath = srcPath.concat(relPath);
                result.search = relative.search;
                result.query = relative.query;
            } else if (!util.isNullOrUndefined(relative.search)) {
                // just pull out the search.
                // like href='?foo'.
                // Put this after the other two cases because it simplifies the booleans
                if (psychotic) {
                    result.hostname = result.host = srcPath.shift();
                    //occationaly the auth can get stuck only in host
                    //this especially happens in cases like
                    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                        result.host.split('@') : false;
                    if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                    }
                }
                result.search = relative.search;
                result.query = relative.query;
                //to support http.request
                if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                    result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
                }
                result.href = result.format();
                return result;
            }

            if (!srcPath.length) {
                // no path at all.  easy.
                // we've already handled the other stuff above.
                result.pathname = null;
                //to support http.request
                if (result.search) {
                    result.path = '/' + result.search;
                } else {
                    result.path = null;
                }
                result.href = result.format();
                return result;
            }

            // if a url ENDs in . or .., then it must get a trailing slash.
            // however, if it ends in anything else non-slashy,
            // then it must NOT get a trailing slash.
            var last = srcPath.slice(-1)[0];
            var hasTrailingSlash = (
                (result.host || relative.host || srcPath.length > 1) &&
                (last === '.' || last === '..') || last === '');

            // strip single dots, resolve double dots to parent dir
            // if the path tries to go above the root, `up` ends up > 0
            var up = 0;
            for (var i = srcPath.length; i >= 0; i--) {
                last = srcPath[i];
                if (last === '.') {
                    srcPath.splice(i, 1);
                } else if (last === '..') {
                    srcPath.splice(i, 1);
                    up++;
                } else if (up) {
                    srcPath.splice(i, 1);
                    up--;
                }
            }

            // if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) {
                for (; up--; up) {
                    srcPath.unshift('..');
                }
            }

            if (mustEndAbs && srcPath[0] !== '' &&
                (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
                srcPath.unshift('');
            }

            if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
                srcPath.push('');
            }

            var isAbsolute = srcPath[0] === '' ||
                (srcPath[0] && srcPath[0].charAt(0) === '/');

            // put the host back
            if (psychotic) {
                result.hostname = result.host = isAbsolute ? '' :
                srcPath.length ? srcPath.shift() : '';
                //occationaly the auth can get stuck only in host
                //this especially happens in cases like
                //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost = result.host && result.host.indexOf('@') > 0 ?
                    result.host.split('@') : false;
                if (authInHost) {
                    result.auth = authInHost.shift();
                    result.host = result.hostname = authInHost.shift();
                }
            }

            mustEndAbs = mustEndAbs || (result.host && srcPath.length);

            if (mustEndAbs && !isAbsolute) {
                srcPath.unshift('');
            }

            if (!srcPath.length) {
                result.pathname = null;
                result.path = null;
            } else {
                result.pathname = srcPath.join('/');
            }

            //to support request.http
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
            }
            result.auth = relative.auth || result.auth;
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
        };

        Url.prototype.parseHost = function() {
            var host = this.host;
            var port = portPattern.exec(host);
            if (port) {
                port = port[0];
                if (port !== ':') {
                    this.port = port.substr(1);
                }
                host = host.substr(0, host.length - port.length);
            }
            if (host) this.hostname = host;
        };


        /***/ }),

    /***/ "./node_modules/url/util.js":
    /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = {
            isString: function(arg) {
                return typeof(arg) === 'string';
            },
            isObject: function(arg) {
                return typeof(arg) === 'object' && arg !== null;
            },
            isNull: function(arg) {
                return arg === null;
            },
            isNullOrUndefined: function(arg) {
                return arg == null;
            }
        };


        /***/ }),

    /***/ "./node_modules/webpack/buildin/global.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var g;

        // This works in non-strict mode
        g = (function() {
            return this;
        })();

        try {
            // This works if eval is allowed (see CSP)
            g = g || new Function("return this")();
        } catch (e) {
            // This works if the window reference is available
            if (typeof window === "object") g = window;
        }

        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}

        module.exports = g;


        /***/ }),

    /***/ "./node_modules/webpack/buildin/module.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = function(module) {
            if (!module.webpackPolyfill) {
                module.deprecate = function() {};
                module.paths = [];
                // module.parent = undefined by default
                if (!module.children) module.children = [];
                Object.defineProperty(module, "loaded", {
                    enumerable: true,
                    get: function() {
                        return module.l;
                    }
                });
                Object.defineProperty(module, "id", {
                    enumerable: true,
                    get: function() {
                        return module.i;
                    }
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };


        /***/ }),

    /***/ "./src/js/app.js":
    /*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        window.loadedScript = true;

        // ENV:
        var isProd = location.hostname !== "127.0.0.1" && !location.hostname.startsWith("192.168.");

        // IMPORTS:
        __webpack_require__(/*! ./libs/modernizr.js */ "./src/js/libs/modernizr.js");
        var io = __webpack_require__(/*! ./libs/io-client.js */ "./src/js/libs/io-client.js");
        var UTILS = __webpack_require__(/*! ./libs/utils.js */ "./src/js/libs/utils.js");
        var animText = __webpack_require__(/*! ./libs/animText.js */ "./src/js/libs/animText.js");
        var config = __webpack_require__(/*! ./config.js */ "./src/js/config.js");
        var GameObject = __webpack_require__(/*! ./data/gameObject.js */ "./src/js/data/gameObject.js");
        var items = __webpack_require__(/*! ./data/items.js */ "./src/js/data/items.js");
        var MapManager = __webpack_require__(/*! ./data/mapManager.js */ "./src/js/data/mapManager.js");
        var ObjectManager = __webpack_require__(/*! ./data/objectManager.js */ "./src/js/data/objectManager.js");
        var Player = __webpack_require__(/*! ./data/player.js */ "./src/js/data/player.js");
        var store = __webpack_require__(/*! ./data/store.js */ "./src/js/data/store.js");
        var Projectile = __webpack_require__(/*! ./data/projectile.js */ "./src/js/data/projectile.js");
        var ProjectileManager = __webpack_require__(/*! ./data/projectileManager.js */ "./src/js/data/projectileManager.js");
        var SoundManager = __webpack_require__(/*! ./libs/soundManager.js */ "./src/js/libs/soundManager.js").obj;
        var textManager = new animText.TextManager();

        // VULTR:
        var VultrClient = __webpack_require__(/*! ../../vultr/VultrClient.js */ "./vultr/VultrClient.js");
        var vultrClient = new VultrClient("moomoo.io", 3000, config.maxPlayers, 5, false);
        vultrClient.debugLog = false;

        // URL PARAMS:
        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // SOCKET & CONNECTION:
        var connected = false;
        var startedConnecting = false;
        function connectSocketIfReady() {
            // MAKE SURE IT'S READY:
            if (!didLoad || !captchaReady) return;
            startedConnecting = true;

            // GET TOKEN:
            if (isProd) {
                window.grecaptcha.execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {action: "homepage"}).then(function(token) {
                    // CONNECT SOCKET:
                    connectSocket(token);
                });
            } else {
                // CONNECT SOCKET:
                connectSocket(null);
            }
        }
        function connectSocket(token) {
            // CONNECT SOCKET:
            vultrClient.start(function(address, port, gameIndex) {
                // CREATE ADDRESS:
                var protocol = isProd ? "wss" : "ws";
                var wsAddress = protocol + "://" + address + ":" + 8008 + "/?gameIndex=" + gameIndex;
                if (token) wsAddress += "&token=" + encodeURIComponent(token);

                tmpAddress = protocol + "://" + address + ":" + 8008 + "/?gameIndex=" + gameIndex;

                // CONNECT:
                io.connect(wsAddress, function(error) {
                    pingSocket();
                    setInterval(() => pingSocket(), 2500);

                    if (error) {
                        disconnect(error);
                    } else {
                        connected = true;
                        startGame();
                    }
                }, {
                    "id": setInitData,
                    "d": disconnect,
                    "1": setupGame,
                    "2": addPlayer,
                    "4": removePlayer,
                    "33": updatePlayers,
                    "5": updateLeaderboard,
                    "6": loadGameObject,
                    "a": loadAI,
                    "aa": animateAI,
                    "7": gatherAnimation,
                    "8": wiggleGameObject,
                    "sp": shootTurret,
                    "9": updatePlayerValue,
                    "h": updateHealth,
                    "11": killPlayer,
                    "12": killObject,
                    "13": killObjects,
                    "14": updateItemCounts,
                    "15": updateAge,
                    "16": updateUpgrades,
                    "17": updateItems,
                    "18": addProjectile,
                    "19": remProjectile,
                    "20": serverShutdownNotice,
                    "ac": addAlliance,
                    "ad": deleteAlliance,
                    "an": allianceNotification,
                    "st": setPlayerTeam,
                    "sa": setAlliancePlayers,
                    "us": updateStoreItems,
                    "ch": receiveChat,
                    "mm": updateMinimap,
                    "t": showText,
                    "p": pingMap,
                    "pp": pingSocketResponse
                });

                // SERVER LIST:
                setupServerStatus();

                // CHECK AGAIN AFTER DELAY:
                setTimeout(() => updateServerList(), 800);
//                getWS.io = io;
//                getws(wsAddress);
            }, function(error) {
                console.error("Vultr error:", error);
                alert("Error:\n" + error);
                disconnect("disconnected");
            });
        }
        function socketReady() {
            return (io.connected);
        }
        function joinParty() {
            var currentKey = serverBrowser.value;
            var key = prompt("party key", currentKey);
            if (key) {
                window.onbeforeunload = undefined; // Don't ask to leave
                window.location.href = "/?server=" + key;
            }
        }/**/

        // SOUND:
        var Sound = new SoundManager(config, UTILS);
        function toggleSound(active) {
            if (active == undefined)
                active = !Sound.active;
            Sound.active = active;
            //Sound.toggleMute("menu", !active);
            saveVal("moo_moosic", active?1:0);
        }

        // MATHS:
        var mathPI = Math.PI;
        var mathPI2 = mathPI * 2;
        var mathPI3 = mathPI * 3;
        Math.lerpAngle = function (value1, value2, amount) {
            var difference = Math.abs(value2 - value1);
            if (difference > mathPI) {
                if (value1 > value2) {
                    value2 += mathPI2;
                } else {
                    value1 += mathPI2;
                }
            }
            var value = (value2 + ((value1 - value2) * amount));
            if (value >= 0 && value <= mathPI2)
                return value;
            return (value % mathPI2);
        }

        // REOUNDED RECTANGLE:
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            if (r < 0)
                r = 0;
            this.beginPath();
            this.moveTo(x+r, y);
            this.arcTo(x+w, y, x+w, y+h, r);
            this.arcTo(x+w, y+h, x, y+h, r);
            this.arcTo(x, y+h, x, y, r);
            this.arcTo(x, y, x+w, y, r);
            this.closePath();
            return this;
        }

        // STORAGE:
        var canStore;
        if (typeof(Storage) !== "undefined") {
            canStore = true;
        }
        function saveVal(name, val) {
            if (canStore)
                localStorage.setItem(name, val);
        }
        function deleteVal(name) {
            if (canStore)
                localStorage.removeItem(name);
        }
        function getSavedVal(name) {
            if (canStore)
                return localStorage.getItem(name);
            return null;
        }

        // TERMS:

        // GLOBAL VALUES:
        var moofoll = getSavedVal("moofoll");
        function follmoo() {
            if (!moofoll) {
                moofoll = true;
                saveVal("moofoll", 1);
            }
        }
        var useNativeResolution;
        var showPing;
        var playSound;
        var pixelDensity = 1;
        var delta, now, lastSent;
        var lastUpdate = Date.now();
        var keys, attackState;
        var ais = [];
        var players = [];
        var alliances = [];
        var gameObjects = [];
        var projectiles = [];
        var projectileManager = new ProjectileManager(Projectile, projectiles, players, ais, objectManager, items, config, UTILS);
        var AiManager = __webpack_require__(/*! ./data/aiManager.js */ "./src/js/data/aiManager.js");
        var AI = __webpack_require__(/*! ./data/ai.js */ "./src/js/data/ai.js");
        var aiManager = new AiManager(ais, AI, players, items, null, config, UTILS);
        var player, playerSID, tmpObj;
        var waterMult = 1;
        var waterPlus = 0;
        var mouseX = 0;
        var mouseY = 0;
        var controllingTouch = {
            id: -1,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0
        };
        var attackingTouch = {
            id: -1,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0
        };
        var camX, camY;
        var tmpDir;
        var skinColor = 0;
        var selectSkinIndex = 0;
        var maxScreenWidth = config.maxScreenWidth;
        var maxScreenHeight = config.maxScreenHeight;
        var screenWidth, screenHeight;
        var inGame = false;
        var adContainer = document.getElementById("ad-container");
        var mainMenu = document.getElementById("mainMenu");
        var enterGameButton = document.getElementById("enterGame");
        var promoImageButton = document.getElementById("promoImg");
        var promoImageHolder = document.getElementById("promoImgHolder");
        // block squid game ad
        promoImageButton.remove();
        promoImageHolder.remove();
        var partyButton = document.getElementById("partyButton");
        var joinPartyButton = document.getElementById("joinPartyButton");
        var settingsButton = document.getElementById("settingsButton");
        var settingsButtonTitle = settingsButton.getElementsByTagName("span")[0];
        var allianceButton = document.getElementById("allianceButton");
        var storeButton = document.getElementById("storeButton");
        var chatButton = document.getElementById("chatButton");
        var gameCanvas = document.getElementById("gameCanvas");
        var mainContext = gameCanvas.getContext("2d");
        var serverBrowser = document.getElementById("serverBrowser");
        var nativeResolutionCheckbox = document.getElementById("nativeResolution");
        var showPingCheckbox = document.getElementById("showPing");
        var playMusicCheckbox = document.getElementById("playMusic");
        var pingDisplay = document.getElementById("pingDisplay");
        var shutdownDisplay = document.getElementById("shutdownDisplay");
        var menuCardHolder = document.getElementById("menuCardHolder");
        var guideCard = document.getElementById("guideCard");
        var loadingText = document.getElementById("loadingText");
        var gameUI = document.getElementById("gameUI");
        var actionBar = document.getElementById("actionBar");
        var scoreDisplay = document.getElementById("scoreDisplay");
        var foodDisplay = document.getElementById("foodDisplay");
        var woodDisplay = document.getElementById("woodDisplay");
        var stoneDisplay = document.getElementById("stoneDisplay");
        var killCounter = document.getElementById("killCounter");
        var leaderboardData = document.getElementById("leaderboardData");
        var nameInput = document.getElementById("nameInput");
        var itemInfoHolder = document.getElementById("itemInfoHolder");
        var ageText = document.getElementById("ageText");
        var ageBarBody = document.getElementById("ageBarBody");
        var upgradeHolder = document.getElementById("upgradeHolder");
        var upgradeCounter = document.getElementById("upgradeCounter");
        var allianceMenu = document.getElementById("allianceMenu");
        var allianceHolder = document.getElementById("allianceHolder");
        var allianceManager = document.getElementById("allianceManager");
        var mapDisplay = document.getElementById("mapDisplay");
        var diedText = document.getElementById("diedText");
        var skinColorHolder = document.getElementById("skinColorHolder");
        var mapContext = mapDisplay.getContext("2d");
        mapDisplay.width = 300;
        mapDisplay.height = 300;
        var storeMenu = document.getElementById("storeMenu");
        var storeHolder = document.getElementById("storeHolder");
        var noticationDisplay = document.getElementById("noticationDisplay");
        var hats = store.hats;
        var accessories = store.accessories;
        var objectManager = new ObjectManager(GameObject, gameObjects, UTILS, config);
        var outlineColor = "#525252";
        var darkOutlineColor = "#3d3f42";
        var outlineWidth = 5.5;

        // SET INIT DATA:
        function setInitData(data) {
            alliances = data.teams;
        }

        // YOUTUBERS:
        var featuredYoutuber = document.getElementById('featuredYoutube');
        var youtuberList = [{
            name: "Corrupt X",
            link: "https://www.youtube.com/channel/UC0UH2LfQvBSeH24bmtbmITw"
        }, {
            name: "Tweak Big",
            link: "https://www.youtube.com/channel/UCbwvzJ38AndDTkoX8sD9YOw"
        }, {
            name: "Arena Closer",
            link: "https://www.youtube.com/channel/UCazucVSJqW-kiHMIhQhD-QQ"
        }, {
            name: "Godenot",
            link: "https://www.youtube.com/user/SirGodenot"
        }, {
            name: "RajNoobTV",
            link: "https://www.youtube.com/channel/UCVLo9brXBWrCttMaGzvm0-Q"
        }, {
            name: "TomNotTom",
            link: "https://www.youtube.com/channel/UC7z97RgHFJRcv2niXgArBDw"
        }, {
            name: "Nation",
            link: "https://www.youtube.com/channel/UCSl-MBn3qzjrIvLNESQRk-g"
        }, {
            name: "Pidyohago",
            link: "https://www.youtube.com/channel/UC04p8Mg8nDaDx04A9is2B8Q"
        }, {
            name: "Enigma",
            link: "https://www.youtube.com/channel/UC5HhLbs3sReHo8Bb9NDdFrg"
        }, {
            name: "Bauer",
            link: "https://www.youtube.com/channel/UCwU2TbJx3xTSlPqg-Ix3R1g"
        }, {
            name: "iStealth",
            link: "https://www.youtube.com/channel/UCGrvlEOsQFViZbyFDE6t69A"
        }, {
            name: "SICKmania",
            link: "https://www.youtube.com/channel/UCvVI98ezn4TpX5wDMZjMa3g"
        }, {
            name: "LightThief",
            link: "https://www.youtube.com/channel/UCj6C_tiDeATiKd3GX127XoQ"
        }, {
            name: "Fortish",
            link: "https://www.youtube.com/channel/UCou6CLU-szZA3Tb340TB9_Q"
        }, {
            name: "巧克力",
            link: "https://www.youtube.com/channel/UCgL6J6oL8F69vm-GcPScmwg"
        }, {
            name: "i Febag",
            link: "https://www.youtube.com/channel/UCiU6WZwiKbsnt5xmwr0OFbg"
        }, {
            name: "GoneGaming",
            link: "https://www.youtube.com/channel/UCOcQthRanYcwYY0XVyVeK0g"
        }];
        var tmpYoutuber = youtuberList[UTILS.randInt(0, youtuberList.length - 1)];
        featuredYoutuber.innerHTML = "<a target='_blank' class='ytLink' href='" + tmpYoutuber.link + "'><i class='material-icons' style='vertical-align: top;'>&#xE064;</i> " + tmpYoutuber.name + "</a>";

        // ON LOAD:
        var inWindow = true;
        var didLoad = false;
        var captchaReady = false;
        window.onblur = function() {
            inWindow = false;
        };
        window.onfocus = function() {
            inWindow = true;
            if (player && player.alive) {
                resetMoveDir();
            }
        };
        window.onload = function() {
            didLoad = true;
            connectSocketIfReady();

            setTimeout(function() {
                if (!startedConnecting) {
                    alert("Captcha failed to load");
                    window.location.reload();
                }
            }, 20 * 1000);
        };
        window.captchaCallback = function() {
            captchaReady = true;
            connectSocketIfReady();
        };
        gameCanvas.oncontextmenu = function() {
            return false;
        };
        function disconnect(reason) {
            connected = false;
            io.close();
            showLoadingText(reason);
            modLogs.push({
                time: ticks.tick,
                reason: "[" + reason + "]"
            });
            modLogs.forEach((logs)=> {
                console.error(logs);
            });
        }
        function showLoadingText(text) {
            mainMenu.style.display = "block";
            gameUI.style.display = "none";
            menuCardHolder.style.display = "none";
            diedText.style.display = "none";
            loadingText.style.display = "block";
            loadingText.innerHTML = text +
                "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>";
        }

        // BUTTON EVENTS:
        function bindEvents() {
            enterGameButton.onclick = UTILS.checkTrusted(function() {
                // SHOW AD TO START GAME:
                showPreAdIfReady();
            });
            UTILS.hookTouchEvents(enterGameButton);
            promoImageButton.onclick = UTILS.checkTrusted(function() {
                openLink('https://krunker.io/?play=SquidGame_KB');
            });
            UTILS.hookTouchEvents(promoImageButton);
            joinPartyButton.onclick = UTILS.checkTrusted(function() {
                setTimeout(function() { joinParty(); }, 10);
            });
            UTILS.hookTouchEvents(joinPartyButton);
            settingsButton.onclick = UTILS.checkTrusted(function() {
                toggleSettings();
            });
            UTILS.hookTouchEvents(settingsButton);
            allianceButton.onclick = UTILS.checkTrusted(function() {
                toggleAllianceMenu();
            });
            UTILS.hookTouchEvents(allianceButton);
            storeButton.onclick = UTILS.checkTrusted(function() {
                toggleStoreMenu();
            });
            UTILS.hookTouchEvents(storeButton);
            chatButton.onclick = UTILS.checkTrusted(function() {
                toggleChat();
            });
            UTILS.hookTouchEvents(chatButton);
            mapDisplay.onclick = UTILS.checkTrusted(function() {
                sendMapPing();
            });
            UTILS.hookTouchEvents(mapDisplay);
        }

        // SETUP SERVER SELECTOR:
        var gamesPerServer = 1;
        function setupServerStatus() {
            var tmpHTML = "";

            // ADD SERVER SELECTOR:
            var overallTotal = 0;
            var regionCounter = 0;
            for (var region in vultrClient.servers) {
                var serverList = vultrClient.servers[region];

                // COUNT PLAYERS:
                var totalPlayers = 0;
                for (var i = 0; i < serverList.length; i++) {
                    for (var j = 0; j < serverList[i].games.length; j++) {
                        totalPlayers += serverList[i].games[j].playerCount;
                    }
                }
                overallTotal += totalPlayers;

                // ADD REGION LABELS:
                var regionName = vultrClient.regionInfo[region].name;
                tmpHTML += "<option disabled>" + regionName + " - " + totalPlayers + " players</option>"

                // ADD INDIVIDUAL SERVERS IF EXPANDED:
                for (var serverIndex = 0; serverIndex < serverList.length; serverIndex++) {
                    var server = serverList[serverIndex];

                    // ADD INDIVIDUAL GAMES:
                    for (var gameIndex = 0; gameIndex < server.games.length; gameIndex++) {
                        var game = server.games[gameIndex];
                        var adjustedIndex = server.index * gamesPerServer + gameIndex + 1;
                        var isSelected = vultrClient.server && vultrClient.server.region === server.region && vultrClient.server.index === server.index && vultrClient.gameIndex == gameIndex;
                        var serverLabel = regionName + " " + adjustedIndex + " [" + Math.min(game.playerCount, config.maxPlayers) + "/" + config.maxPlayers + "]";
                        // var itemClass = "menuSelector" + (isSelected ? " selectedMenuSelector" : "") + (game.isPrivate ? " privateMenuSelector" : "");
                        // var onClick = game.isPrivate ? "" : "switchServer(" + region + "," + serverIndex + "," + gameIndex + ")";
                        let serverID = vultrClient.stripRegion(region) + ":" + serverIndex + ":" + gameIndex;
                        if (isSelected) partyButton.getElementsByTagName("span")[0].innerText = serverID;
                        let selected = isSelected ? "selected" : "";
                        tmpHTML += "<option value='" + serverID + "' " + selected + ">" + serverLabel + "</option>";
                    }
                }

                // ADD BREAK AFTER EACH SERVER:
                tmpHTML += "<option disabled></option>";

                // INCREMENT COUNTER:
                regionCounter++;
            }

            // ADD TOTAL PLAYERS:
            tmpHTML += "<option disabled>All Servers - " + overallTotal + " players</option>";

            // SET HTML:
            serverBrowser.innerHTML = tmpHTML;

            // ALT SERVER:
            var altServerText;
            var altServerURL;
            if (location.hostname == "sandbox.moomoo.io") {
                altServerText = "Back to MooMoo";
                altServerURL = "//moomoo.io/";
            } else {
                altServerText = "Try the sandbox";
                altServerURL = "//sandbox.moomoo.io/";
            }
            document.getElementById("altServer").innerHTML = "<a href='" + altServerURL + "'>" + altServerText + "<i class='material-icons' style='font-size:10px;vertical-align:middle'>arrow_forward_ios</i></a>";
        }
        function updateServerList() {
            var xmlhttp = new XMLHttpRequest();
            var url = "/serverData";
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        // Parse the text and set it to Vultr
                        window.vultr = JSON.parse(this.responseText);
                        vultrClient.processServers(vultr.servers);

                        // Setup servers
                        setupServerStatus();
                    } else {
                        console.error("Failed to load server data with status code:", this.status);
                    }
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        // SERVER SELECTOR CHANGE LISTENER:
        serverBrowser.addEventListener("change", UTILS.checkTrusted(function() {
            let parts = serverBrowser.value.split(":");
            vultrClient.switchServer(parts[0], parts[1], parts[2]);
        }));

        /*** START CPMSTAR ***/
        var preContentContainer = document.getElementById("pre-content-container");
        var preAdInterval = 1000 * 60 * 5; // 5 minutes
        var preAdLastShowTime = 0;
        var preAdGameCount = 0;
        function showPreAdIfReady() {
            // Make sure the ad should be shown
            preAdGameCount++;
            var validGame = preAdGameCount > 1;
            var validTime = (Date.now() - preAdLastShowTime) > preAdInterval;
            if (validGame && validTime) {
                preAdLastShowTime = Date.now();
                showPreAd();
            } else {
                enterGame();
            }
        }

        function showPreAd() {
            // API FAILED TO LOAD:
            if (!window.adsbygoogle) {
                return console.log("Failed to load video ad API");
                void enterGame();
            }
            // ATTEMPT TO LOAD OR SHOW:
            // https://docs.google.com/document/d/e/2PACX-1vS9eMymhLHkiscofJ442dPIKmXIGD3X2bbSF723b-3Btfao70nE885OlEPkbcM2NfrRaitWL_7KtT6I/pub
            window.adsbygoogle.push({
                type: "next",
                adBreakDone: ()=>{
                    enterGame();
                }
            })
        }
        window.adsbygoogle && window.adsbygoogle.push({
            preloadAdBreaks: "on"
        });
        window.showPreAd = showPreAd;

        function finishPreAd() {
            // HIDE THE AD:
            preContentContainer.style.display = "none";

            // CHECK AD SUCCESS:
            enterGame();
        }
        /*** END CPMSTAR ***/

        /*** START PLAYWIRE ***/
        // // ADS:
        // var preAdInterval = 1000 * 60 * 5; // 5 minutes
        // var preAdLastShowTime = 0;
        // var preAdGameCount = 0;
        // var pendingFinish = false;
        // function showPreAd() {
        //     // Don't show if has admob
        //     if (window.admob) {
        //         enterGame();
        //         return;
        //     }

        //     // Make sure the ad should be shown
        //     preAdGameCount++;
        //     var validGame = preAdGameCount > 1;
        //     var validTime = (Date.now() - preAdLastShowTime) > preAdInterval;
        //     if (!validGame || !validTime) {
        //         enterGame();
        //         return;
        //     }

        //     // Set to pending finish
        //     pendingFinish = true;

        //     // Create the element
        //     var script = document.createElement("script");
        //     script.src = "//cdn.playwire.com/bolt/js/zeus/embed.js";
        //     script.type = "text/javascript";
        //     script.setAttribute("charset", "utf-8");
        //     script.setAttribute("data-config", "//config.playwire.com/1020124/v2/pre_content.json");
        //     script.setAttribute("data-width", "640px");
        //     script.setAttribute("data-height", "360px");
        //     script.setAttribute("data-id", "pre-content-player");
        //     script.setAttribute("data-hidden-container", 'my-content');
        //     script.setAttribute("data-onready", "window.boltEventHandlers");

        //     // Add it to the ad container
        //     var adContainer = document.getElementById("pre-content-container");
        //     adContainer.style.display = "block";
        //     adContainer.appendChild(script);

        //     // Check if the ad was blocked
        //     setTimeout(function() {
        //         let adBlocked = document.getElementById("my-content").style.display != "none";
        //         if (adBlocked) {
        //             console.log("Ad blocked");
        //             finishPreAd();
        //         } else {
        //             console.log("Ad not blocked");
        //         }
        //     }, 2.5 * 1000);

        //     // Force skip ad after 30 seconds
        //     setTimeout(function() {
        //         finishPreAd();
        //     }, 30 * 1000);
        // }
        // window.boltEventHandlers = function() {
        //     Bolt.on("pre-content-player", "showHiddenContainer", function() {
        //         finishPreAd();
        //     });
        // }
        // function finishPreAd() {
        //     if (pendingFinish) {
        //         pendingFinish = false;

        //         // Hide the ad
        //         document.getElementById("pre-content-container").style.display = "none";

        //         // Hide the content again
        //         document.getElementById("my-content").style.display = "none";

        //         // Set the ad show time
        //         preAdLastShowTime = Date.now();

        //         // Enter the game
        //         enterGame();
        //     }
        // }
        // function showPreAdIfReady() {
        //     // Enter game if using admob; otherwise show pre-ad
        //     if (window.admob) {
        //         enterGame();
        //     } else {
        //         showPreAd();
        //     }
        // }
        // window.showPreAd = showPreAd;
        /*** END PLAYWIRE ***/

        // SHOW ITEM INFO:
        function showItemInfo(item, isWeapon, isStoreItem) {
            if (player && item) {
                UTILS.removeAllChildren(itemInfoHolder);
                itemInfoHolder.classList.add("visible");
                // chatButton.classList.add("hide");
                UTILS.generateElement({
                    id: "itemInfoName",
                    text: UTILS.capitalizeFirst(item.name),
                    parent: itemInfoHolder
                });
                UTILS.generateElement({
                    id: "itemInfoDesc",
                    text: item.desc,
                    parent: itemInfoHolder
                });
                if (isStoreItem) {

                } else if (isWeapon) {
                    UTILS.generateElement({
                        class: "itemInfoReq",
                        text: !item.type?"primary":"secondary",
                        parent: itemInfoHolder
                    });
                } else {
                    for (var i = 0; i < item.req.length; i += 2) {
                        UTILS.generateElement({
                            class: "itemInfoReq",
                            html: item.req[i] + "<span class='itemInfoReqVal'> x" + item.req[i + 1] + "</span>",
                            parent: itemInfoHolder
                        });
                    }
                    if (item.group.limit) {
                        UTILS.generateElement({
                            class: "itemInfoLmt",
                            text: (player.itemCounts[item.group.id]||0) + "/" + item.group.limit,
                            parent: itemInfoHolder
                        });
                    }
                }
            } else {
                itemInfoHolder.classList.remove("visible");
                // chatButton.classList.remove("hide");
            }
        }

        // SHOW ALLIANCE MENU:
        var allianceNotifications = [];
        var alliancePlayers = [];
        function allianceNotification(sid, name) {
            allianceNotifications.push({
                sid: sid,
                name: name
            });
            updateNotifications();
        }
        function updateNotifications() {
            if (allianceNotifications[0]) {
                var tmpN = allianceNotifications[0];
                UTILS.removeAllChildren(noticationDisplay);
                noticationDisplay.style.display = "block";
                UTILS.generateElement({
                    class: "notificationText",
                    text: tmpN.name,
                    parent: noticationDisplay
                });
                UTILS.generateElement({
                    class: "notifButton",
                    html: "<i class='material-icons' style='font-size:28px;color:#cc5151;'>&#xE14C;</i>",
                    parent: noticationDisplay,
                    onclick: function() { aJoinReq(0); },
                    hookTouch: true
                });
                UTILS.generateElement({
                    class: "notifButton",
                    html: "<i class='material-icons' style='font-size:28px;color:#8ecc51;'>&#xE876;</i>",
                    parent: noticationDisplay,
                    onclick: function() { aJoinReq(1); },
                    hookTouch: true
                });
            } else {
                noticationDisplay.style.display = "none";
            }
        }
        function addAlliance(data) {
            alliances.push(data);
            if (allianceMenu.style.display == "block")
                showAllianceMenu();
        }
        function setPlayerTeam(team, isOwner) {
            if (player) {
                player.team = team;
                player.isOwner = isOwner;
                if (allianceMenu.style.display == "block")
                    showAllianceMenu();
            }
        }
        function setAlliancePlayers(data) {
            alliancePlayers = data;
            if (allianceMenu.style.display == "block")
                showAllianceMenu();
        }
        function deleteAlliance(sid) {
            for (var i = alliances.length - 1; i >= 0; i--) {
                if (alliances[i].sid == sid)
                    alliances.splice(i, 1);
            }
            if (allianceMenu.style.display == "block")
                showAllianceMenu();
        }
        function toggleAllianceMenu() {
            resetMoveDir();
            if (allianceMenu.style.display != "block") {
                showAllianceMenu();
            } else {
                allianceMenu.style.display = "none";
            }
        }
        function showAllianceMenu() {
            if (player && player.alive) {
                closeChat();
                storeMenu.style.display = "none";
                allianceMenu.style.display = "block";
                UTILS.removeAllChildren(allianceHolder);
                if (player.team) {
                    for (var i = 0; i < alliancePlayers.length; i+=2) {
                        (function(i) {
                            var tmp = UTILS.generateElement({
                                class: "allianceItem",
                                style: "color:" + (alliancePlayers[i]==player.sid ? "#fff" : "rgba(255,255,255,0.6)"),
                                text: alliancePlayers[i+1],
                                parent: allianceHolder
                            });
                            if (player.isOwner && alliancePlayers[i] != player.sid) {
                                UTILS.generateElement({
                                    class: "joinAlBtn",
                                    text: "Kick",
                                    onclick: function() { kickFromClan(alliancePlayers[i]); },
                                    hookTouch: true,
                                    parent: tmp
                                });
                            }
                        })(i);
                    }
                } else {
                    if (alliances.length) {
                        for (var i = 0; i < alliances.length; ++i) {
                            (function(i) {
                                var tmp = UTILS.generateElement({
                                    class: "allianceItem",
                                    style: "color:" + (alliances[i].sid==player.team ? "#fff" : "rgba(255,255,255,0.6)"),
                                    text: alliances[i].sid,
                                    parent: allianceHolder
                                });
                                UTILS.generateElement({
                                    class: "joinAlBtn",
                                    text: "Join",
                                    onclick: function() { sendJoin(i); },
                                    hookTouch: true,
                                    parent: tmp
                                });
                            })(i);
                        }
                    } else {
                        UTILS.generateElement({
                            class: "allianceItem",
                            text: "No Tribes Yet",
                            parent: allianceHolder
                        });
                    }
                }
                UTILS.removeAllChildren(allianceManager);
                if (player.team) {
                    UTILS.generateElement({
                        class: "allianceButtonM",
                        style: "width: 360px",
                        text: player.isOwner? "Delete Tribe" : "Leave Tribe",
                        onclick: function() { leaveAlliance() },
                        hookTouch: true,
                        parent: allianceManager
                    });
                } else {
                    UTILS.generateElement({
                        tag: "input",
                        type: "text",
                        id: "allianceInput",
                        maxLength: 7,
                        placeholder: "unique name",
                        ontouchstart: function(ev) {
                            ev.preventDefault();
                            var newValue = prompt("unique name", ev.currentTarget.value);
                            ev.currentTarget.value = newValue.slice(0, 7);
                        },
                        parent: allianceManager
                    });
                    UTILS.generateElement({
                        tag: "div",
                        class: "allianceButtonM",
                        style: "width: 140px;",
                        text: "Create",
                        onclick: function() { createAlliance(); },
                        hookTouch: true,
                        parent: allianceManager
                    });
                }
            }
        }
        function aJoinReq(join) {
            io.send("11", allianceNotifications[0].sid, join);
            allianceNotifications.splice(0, 1);
            updateNotifications();
        }
        function kickFromClan(sid) {
            io.send("12", sid);
        }
        function sendJoin(index) {
            io.send("10", alliances[index].sid);
        }
        function createAlliance() {
            io.send("8", document.getElementById("allianceInput").value);
        }
        function leaveAlliance() {
            allianceNotifications = [];
            updateNotifications();
            io.send("9");
        }

        // window.testRateLimiting = function() {
        //     setInterval(() => {
        //         if (Math.random() > 0.5) {
        //             io.send("8", "test");
        //         } else {
        //             io.send("9");
        //         }
        //     }, 50);
        // }

        // MINIMAP:
        var lastDeath;
        var minimapData;
        var mapMarker;
        var mapPings = [];
        var tmpPing;
        function MapPing() {
            this.init = function(x, y) {
                this.scale = 0;
                this.x = x;
                this.y = y;
                this.active = true;
            };
            this.update = function(ctxt, delta) {
                if (this.active) {
                    this.scale += 0.05 * delta;
                    if (this.scale >= config.mapPingScale) {
                        this.active = false;
                    } else {
                        ctxt.globalAlpha = (1-Math.max(0, this.scale/config.mapPingScale));
                        ctxt.beginPath();
                        ctxt.arc((this.x / config.mapScale) * mapDisplay.width, (this.y / config.mapScale)
                                 * mapDisplay.width, this.scale, 0, 2 * Math.PI);
                        ctxt.stroke();
                    }
                }
            };
        }
        function pingMap(x, y) {
            for (var i = 0; i < mapPings.length; ++i) {
                if (!mapPings[i].active) {
                    tmpPing = mapPings[i];
                    break;
                }
            }
            if (!tmpPing) {
                tmpPing = new MapPing();
                mapPings.push(tmpPing);
            }
            tmpPing.init(x, y);
        }
        function updateMapMarker() {
            if (!mapMarker)
                mapMarker = {};
            mapMarker.x = player.x;
            mapMarker.y = player.y;
        }
        function updateMinimap(data) {
            minimapData = data;
        }
        function renderMinimap(delta) {
            if (player && player.alive) {
                mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height);

                // RENDER PINGS:
                mapContext.strokeStyle = "#fff";
                mapContext.lineWidth = 4;
                for (var i = 0; i < mapPings.length; ++i) {
                    tmpPing = mapPings[i];
                    tmpPing.update(mapContext, delta);
                }

                // RENDER PLAYERS:
                mapContext.globalAlpha = 1;
                mapContext.fillStyle = "#c7e9f9";
                renderCircle((player.x/config.mapScale)*mapDisplay.width,
                             (player.y/config.mapScale)*mapDisplay.height, 7, mapContext, true);
                if(near.enemy.length || near.enemys.length){
                    mapContext.globalAlpha = 1;
                    mapContext.fillStyle = "#f35147";
                    renderCircle((tmpObj.x/config.mapScale)*mapDisplay.width,
                                 (tmpObj.y/config.mapScale)*mapDisplay.height, 7, mapContext, true);
                }
                mapContext.fillStyle = "#3df49b";
                if (player.team && minimapData) {
                    for (var i = 0; i < minimapData.length;) {
                        renderCircle((minimapData[i]/config.mapScale)*mapDisplay.width,
                                     (minimapData[i+1]/config.mapScale)*mapDisplay.height, 7, mapContext, true);
                        i+=2;
                    }
                }

                // DEATH LOCATION:
                if (lastDeath) {
                    mapContext.fillStyle = "#fc5553";
                    mapContext.font = "34px Hammersmith One";
                    mapContext.textBaseline = "middle";
                    mapContext.textAlign = "center";
                    mapContext.fillText("x", (lastDeath.x/config.mapScale)*mapDisplay.width,
                                        (lastDeath.y/config.mapScale)*mapDisplay.height);
                }

                // MAP MARKER:
                if (mapMarker) {
                    mapContext.fillStyle = "#c7e9f9";
                    mapContext.font = "34px Hammersmith One";
                    mapContext.textBaseline = "middle";
                    mapContext.textAlign = "center";
                    mapContext.fillText("x", (mapMarker.x/config.mapScale)*mapDisplay.width,
                                        (mapMarker.y/config.mapScale)*mapDisplay.height);
                }
            }
        }

        // STORE MENU:
        var currentStoreIndex = 0;
        var playerItems = {};
        function changeStoreIndex(index) {
            if (currentStoreIndex != index) {
                currentStoreIndex = index;
                generateStoreList();
            }
        }
        function toggleStoreMenu() {
            if (storeMenu.style.display != "block") {
                storeMenu.style.display = "block";
                allianceMenu.style.display = "none";
                closeChat();
                generateStoreList();
            } else {
                storeMenu.style.display = "none";
            }
        }
        function updateStoreItems(type, id, index) {
            if (index) {
                if (!type)
                    player.tails[id] = 1;
                else
                    player.tailIndex = id;
            } else {
                if (!type)
                    player.skins[id] = 1;
                else
                    player.skinIndex = id;
            }
            if (storeMenu.style.display == "block")
                generateStoreList();
        }
        function generateStoreList() {
            if (player) {
                UTILS.removeAllChildren(storeHolder);
                var index = currentStoreIndex;
                var tmpArray = index?accessories:hats;
                for (var i = 0; i < tmpArray.length; ++i) {
                    if (!tmpArray[i].dontSell) {
                        (function(i) {
                            var tmp = UTILS.generateElement({
                                id: "storeDisplay" + i,
                                class: "storeItem",
                                onmouseout: function() { showItemInfo(); },
                                onmouseover: function() { showItemInfo(tmpArray[i], false, true); },
                                parent: storeHolder
                            });
                            UTILS.hookTouchEvents(tmp, true);
                            UTILS.generateElement({
                                tag: "img",
                                class: "hatPreview",
                                src: "../img/" + (index?"accessories/access_":"hats/hat_") + tmpArray[i].id + (tmpArray[i].topSprite?"_p":"") + ".png",
                                parent: tmp
                            });
                            UTILS.generateElement({
                                tag: "span",
                                text: tmpArray[i].name,
                                parent: tmp
                            });
                            if (index?(!player.tails[tmpArray[i].id]):(!player.skins[tmpArray[i].id])) {
                                UTILS.generateElement({
                                    class: "joinAlBtn",
                                    style: "margin-top: 5px",
                                    text: "Buy",
                                    onclick: function() { storeBuy(tmpArray[i].id, index); },
                                    hookTouch: true,
                                    parent: tmp
                                });
                                UTILS.generateElement({
                                    tag: "span",
                                    class: "itemPrice",
                                    text: tmpArray[i].price,
                                    parent: tmp
                                })
                            } else if ((index?player.tailIndex:player.skinIndex)==tmpArray[i].id) {
                                UTILS.generateElement({
                                    class: "joinAlBtn",
                                    style: "margin-top: 5px",
                                    text: "Unequip",
                                    onclick: function() { storeEquip(0, index); },
                                    hookTouch: true,
                                    parent: tmp
                                });
                            } else {
                                UTILS.generateElement({
                                    class: "joinAlBtn",
                                    style: "margin-top: 5px",
                                    text: "Equip",
                                    onclick: function() { storeEquip(tmpArray[i].id, index); },
                                    hookTouch: true,
                                    parent: tmp
                                });
                            }
                        })(i);
                    }
                }
            }
        }
        function storeEquip(id, index) {
            io.send("13c", 0, id, index);
        }
        function storeBuy(id, index) {
            io.send("13c", 1, id, index);
        }
        function buyEquip(id, index) {

            // BUY AND EQUIP:
            if (player.alive) {
                if (index == 0) {
                    if (player.skins[id]) {
                        if (player.skinIndex != id) {
                            io.send("13c", 0, id, 0);
                        }
                    } else {
                        if (player.skinIndex != 0) {
                            io.send("13c", 0, 0, 0);
                        }
                        let findId = hats.find(thisID => thisID.id == id);
                        if (findId) {
                            if (player.points >= findId.price) {
                                io.send("13c", 1, id, 0);
                            }
                        }
                    }
                } else if (index == 1) {
                    if (player.tails[id]) {
                        if (player.tailIndex != id) {
                            io.send("13c", 0, id, 1);
                        }
                    } else {
                        if (player.tailIndex != 0) {
                            io.send("13c", 0, 0, 1);
                        }
                        let findId = accessories.find(thisID => thisID.id == id);
                        if (findId) {
                            if (player.points >= findId.price) {
                                io.send("13c", 1, id, 1);
                            }
                        }
                    }
                }
            }

        }

        // HIDE WINDOWS:
        function hideAllWindows() {
            storeMenu.style.display = "none";
            allianceMenu.style.display = "none";
            closeChat();
        }

        // PREPARE UI:
        function prepareUI() {

            // NATIVE RESOLUTION:
            var savedNativeValue = getSavedVal("native_resolution");
            if (!savedNativeValue) {
                setUseNativeResolution(typeof cordova !== "undefined"); // Only default to native if on mobile
            } else {
                setUseNativeResolution(savedNativeValue == "true");
            }

            // SHOW PING:
            showPing = getSavedVal("show_ping") == "true";
            pingDisplay.hidden = !showPing;

            // LOAD SOUND SETTING:
            playSound = getSavedVal("moo_moosic")||0;

            // MOBILE DOWNLOADS:
            setInterval(function() {
                if (window.cordova) {
                    document.getElementById("downloadButtonContainer").classList.add("cordova");
                    document.getElementById("mobileDownloadButtonContainer").classList.add("cordova");
                }
            }, 1000);

            // SKIN COLOR PICKER:
            updateSkinColorPicker();

            // ACTION BAR:
            UTILS.removeAllChildren(actionBar);
            for (var i = 0; i < (items.weapons.length+items.list.length); ++i) {
                (function(i) {
                    UTILS.generateElement({
                        id: "actionBarItem" + i,
                        class: "actionBarItem",
                        style: "display:none",
                        onmouseout: function() {
                            showItemInfo();
                        },
                        parent: actionBar
                    });
                })(i);
            }
            for (var i = 0; i < (items.list.length + items.weapons.length); ++i) {
                (function(i) {
                    var tmpCanvas = document.createElement('canvas');
                    tmpCanvas.width = tmpCanvas.height = 66;
                    var tmpContext = tmpCanvas.getContext('2d');
                    tmpContext.translate((tmpCanvas.width / 2), (tmpCanvas.height / 2));
                    tmpContext.imageSmoothingEnabled = false;
                    tmpContext.webkitImageSmoothingEnabled = false;
                    tmpContext.mozImageSmoothingEnabled = false;
                    if (items.weapons[i]) {
                        tmpContext.rotate((Math.PI/4)+Math.PI);
                        var tmpSprite = new Image();
                        toolSprites[items.weapons[i].src] = tmpSprite;
                        tmpSprite.onload = function() {
                            this.isLoaded = true;
                            var tmpPad = 1 / (this.height / this.width);
                            var tmpMlt = (items.weapons[i].iPad || 1);
                            tmpContext.drawImage(this, -(tmpCanvas.width*tmpMlt*config.iconPad*tmpPad)/2, -(tmpCanvas.height*tmpMlt*config.iconPad)/2,
                                                 tmpCanvas.width*tmpMlt*tmpPad*config.iconPad, tmpCanvas.height*tmpMlt*config.iconPad);
                            tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
                            tmpContext.globalCompositeOperation = "source-atop";
                            tmpContext.fillRect(-tmpCanvas.width / 2, -tmpCanvas.height / 2, tmpCanvas.width, tmpCanvas.height);
                            document.getElementById('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
                        };
                        tmpSprite.src = ".././img/weapons/" + items.weapons[i].src + ".png";
                        var tmpUnit = document.getElementById('actionBarItem' + i);
                        tmpUnit.onmouseover = UTILS.checkTrusted(function() {
                            showItemInfo(items.weapons[i], true);
                        });
                        tmpUnit.onclick = UTILS.checkTrusted(function() {
                            selectToBuild(i, true);
                        });
                        UTILS.hookTouchEvents(tmpUnit);
                    } else {
                        var tmpSprite = getItemSprite(items.list[i-items.weapons.length], true);
                        var tmpScale = Math.min(tmpCanvas.width - config.iconPadding, tmpSprite.width);
                        tmpContext.globalAlpha = 1;
                        tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
                        tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
                        tmpContext.globalCompositeOperation = "source-atop";
                        tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
                        document.getElementById('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
                        var tmpUnit = document.getElementById('actionBarItem' + i);
                        tmpUnit.onmouseover = UTILS.checkTrusted(function() {
                            showItemInfo(items.list[i-items.weapons.length]);
                        });
                        tmpUnit.onclick = UTILS.checkTrusted(function() {
                            selectToBuild(i-items.weapons.length);
                        });
                        UTILS.hookTouchEvents(tmpUnit);
                    }
                })(i);
            }

            // MOBILE NAME INPUT:
            nameInput.ontouchstart = UTILS.checkTrusted(function(e) {
                e.preventDefault();
                var newValue = prompt("enter name", e.currentTarget.value);
                e.currentTarget.value = newValue.slice(0, 15);
            });

            // SETTINGS:
            nativeResolutionCheckbox.checked = useNativeResolution;
            nativeResolutionCheckbox.onchange = UTILS.checkTrusted(function(e) {
                setUseNativeResolution(e.target.checked);
            });
            showPingCheckbox.checked = showPing;
            showPingCheckbox.onchange = UTILS.checkTrusted(function(e) {
                showPing = showPingCheckbox.checked;
                pingDisplay.hidden = !showPing;
                saveVal("show_ping", showPing ? "true" : "false");
            });

            // PLAY MENU SOUND:
            // Sound.play("menu", 1, true);
        }
        function updateItems(data, wpn) {
            data && (wpn ? player.weapons = data : player.items = data);
            for (var i = 0; i < items.list.length; ++i) {
                var tmpI = items.weapons.length + i;
                document.getElementById('actionBarItem' + tmpI).style.display = player.items.indexOf(items.list[i].id) >= 0 ? 'inline-block' : 'none';
            }
            for (i = 0; i < items.weapons.length; ++i)
                document.getElementById('actionBarItem' + i).style.display = player.weapons[items.weapons[i].type] == items.weapons[i].id ? 'inline-block' : 'none';
        }
        function setUseNativeResolution(useNative) {
            useNativeResolution = useNative;
            pixelDensity = useNative ? (window.devicePixelRatio || 1) : 1;
            nativeResolutionCheckbox.checked = useNative;
            saveVal("native_resolution", useNative.toString());
            resize();
        }
        function updateGuide() {
            if (usingTouch) {
                guideCard.classList.add("touch");
            } else {
                guideCard.classList.remove("touch");
            }
        }

        // SETTINGS STUFF:
        function toggleSettings() {
            if (guideCard.classList.contains("showing")) {
                guideCard.classList.remove("showing");
                settingsButtonTitle.innerText = "Settings";
            } else {
                guideCard.classList.add("showing");
                settingsButtonTitle.innerText = "Close";
            }
        }

        // SELECT SKIN COLOR:
        function updateSkinColorPicker() {
            var tmpHTML = "";
            for (var i = 0; i < config.skinColors.length; ++i) {
                if (i == selectSkinIndex) {
                    tmpHTML += ("<div class='skinColorItem activeSkin' style='background-color:" +
                                config.skinColors[i] + "' onclick='selectSkinColor(" + i + ")'></div>");
                } else {
                    tmpHTML += ("<div class='skinColorItem' style='background-color:" +
                                config.skinColors[i] + "' onclick='selectSkinColor(" + i + ")'></div>");
                }
            }
            skinColorHolder.innerHTML = tmpHTML;
        }
        function selectSkinColor(index) {
            selectSkinIndex = index;
            skinColor = index == 10 ? "__lookupGetter__" : index;
            updateSkinColorPicker();
        }

        // CHAT STUFF:
        var chatBox = document.getElementById("chatBox");
        var chatHolder = document.getElementById("chatHolder");
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
                setTimeout(function() { // Timeout lets the `hookTouchEvents` function exit
                    var chatMessage = prompt("chat message");
                    if (chatMessage) {
                        sendChat(chatMessage);
                    }
                }, 1);
            }
            chatBox.value = "";
        }
        function sendChat(message) {
            io.send("ch", message.slice(0, 30));
        }
        function closeChat() {
            chatBox.value = "";
            chatHolder.style.display = "none";
        }

        // SEND MESSAGE:
        var profanityList = ["cunt", "whore", "fuck", "shit", "faggot", "nigger",
                             "nigga", "dick", "vagina", "minge", "cock", "rape", "cum", "sex",
                             "tits", "penis", "clit", "pussy", "meatcurtain", "jizz", "prune",
                             "douche", "wanker", "damn", "bitch", "dick", "fag", "bastard"];
        var cuntwhorefuckshitfaggotniggerniggadickvaginamingecockrapecumsextitspenisclitpussymeatcurtainjizzprunedouchewankerdamnbitchdickfagbastard = "cuntwhorefuckshitfaggotniggerniggadickvaginamingecockrapecumsextitspenisclitpussymeatcurtainjizzprunedouchewankerdamnbitchdickfagbastard";
        function checkProfanityString(text) {
            var tmpString;
            if ((text == cuntwhorefuckshitfaggotniggerniggadickvaginamingecockrapecumsextitspenisclitpussymeatcurtainjizzprunedouchewankerdamnbitchdickfagbastard) || (cuntwhorefuckshitfaggotniggerniggadickvaginamingecockrapecumsextitspenisclitpussymeatcurtainjizzprunedouchewankerdamnbitchdickfagbastard == "cuntwhorefuckshitfaggotniggerniggadickvaginamingecockrapecumsextitspenisclitpussymeatcurtainjizzprunedouchewankerdamnbitchdickfagbastard")) {
                for (var i = 0; i < profanityList.length; ++i) {
                    if (text.indexOf(profanityList[i]) > -1) {
                        tmpString = "";
                        for (var y = 0; y < profanityList[i].length; ++y) {
                            tmpString += tmpString.length?"o":"M";
                        }
                        var re = new RegExp(profanityList[i], 'g');
                        text = text.replace(re, tmpString);
                    }
                }
            }
            return text;
        }
        function receiveChat(sid, message) {
            var tmpPlayer = findPlayerBySID(sid);
            if (tmpPlayer) {
                tmpPlayer.chatMessage = checkProfanityString(message);
                if(tmpPlayer.sid != player.sid && tmpPlayer.chatMessage == "!c!dc user " + player.name){
                    sendChat('im not chicken kys')
                }
                if(tmpPlayer.chatMessage == "-sync"){
                    autoSync();
                }
                if(tmpPlayer.chatMessage == "-bs"){
                    autos.bowSpam = !autos.bowSpam
                    if(!autos.bowSpam){
                        io.send("c", 0);
                    }
                }
                tmpPlayer.chatCountdown = config.chatCountdown;
            }
        }

        function autoSync(){
            if(player.weapons[1] == 15){
                if(player.reloads[player.weapons[1]] == 0){
                    autos.synced = true;
                    selectToBuild(player.weapons[1], true);
                    buyEquip(53, 0);
                    io.send("c", 1, near.aim);
                    setTimeout(() => {
                        selectToBuild(player.weapons[1], true);
                        buyEquip(6, 0);
                        io.send("c", 0, near.aim);
                        autos.synced = false;
                    }, 100);
                } else {
                    selectToBuild(player.weapons[1], true);
                    buyEquip(6, 0);
                    io.send("c", 0, near.aim);
                }
            }
        }
        // RESIZE:
        window.addEventListener('resize', UTILS.checkTrusted(resize));
        function resize() {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
            var scaleFillNative = Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) * pixelDensity;
            gameCanvas.width = screenWidth * pixelDensity;
            gameCanvas.height = screenHeight * pixelDensity;
            gameCanvas.style.width = screenWidth + "px";
            gameCanvas.style.height = screenHeight + "px";
            mainContext.setTransform(
                scaleFillNative, 0,
                0, scaleFillNative,
                (screenWidth * pixelDensity - (maxScreenWidth * scaleFillNative)) / 2,
                (screenHeight * pixelDensity - (maxScreenHeight * scaleFillNative)) / 2
            );
        }
        resize();

        // TOUCH INPUT:
        var usingTouch;
        setUsingTouch(false);
        function setUsingTouch(using) {
            usingTouch = using;
            updateGuide();
            // if (using) {
            //     chatButton.classList.add("mobile");
            // } else {
            //     chatButton.classList.remove("mobile");
            // }
        }
        window.setUsingTouch = setUsingTouch;

        gameCanvas.addEventListener('touchmove', UTILS.checkTrusted(touchMove), false);
        function touchMove(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            setUsingTouch(true);
            for (var i = 0; i < ev.changedTouches.length; i++) {
                var t = ev.changedTouches[i];
                if (t.identifier == controllingTouch.id) {
                    controllingTouch.currentX = t.pageX;
                    controllingTouch.currentY = t.pageY;
                    sendMoveDir();
                } else if (t.identifier == attackingTouch.id) {
                    attackingTouch.currentX = t.pageX;
                    attackingTouch.currentY = t.pageY;
                    attackState = 1;
                }
            }
        }
        gameCanvas.addEventListener('touchstart', UTILS.checkTrusted(touchStart), false);
        function touchStart(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            setUsingTouch(true);
            for (var i = 0; i < ev.changedTouches.length; i++) {
                var t = ev.changedTouches[i];
                if (t.pageX < document.body.scrollWidth / 2 && controllingTouch.id == -1) {
                    controllingTouch.id = t.identifier;
                    controllingTouch.startX = controllingTouch.currentX = t.pageX;
                    controllingTouch.startY = controllingTouch.currentY = t.pageY;
                    sendMoveDir();
                } else if (t.pageX > document.body.scrollWidth / 2 && attackingTouch.id == -1) {
                    attackingTouch.id = t.identifier;
                    attackingTouch.startX = attackingTouch.currentX = t.pageX;
                    attackingTouch.startY = attackingTouch.currentY = t.pageY;
                    if (player.buildIndex < 0) {
                        attackState = 1;
                        sendAtckState();
                    }
                }
            }
        }
        gameCanvas.addEventListener('touchend', UTILS.checkTrusted(touchEnd), false);
        gameCanvas.addEventListener('touchcancel', UTILS.checkTrusted(touchEnd), false);
        gameCanvas.addEventListener('touchleave', UTILS.checkTrusted(touchEnd), false);
        function touchEnd(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            setUsingTouch(true);
            for (var i = 0; i < ev.changedTouches.length; i++) {
                var t = ev.changedTouches[i];
                if (t.identifier == controllingTouch.id) {
                    controllingTouch.id = -1;
                    sendMoveDir();
                } else if (t.identifier == attackingTouch.id) {
                    attackingTouch.id = -1;
                    if (player.buildIndex >= 0) {
                        attackState = 1;
                        sendAtckState();
                    }
                    attackState = 0;
                    sendAtckState();
                }
            }
        }

        // MOUSE INPUT:
        gameCanvas.addEventListener('mousemove', gameInput, false);
        function gameInput(e) {
            e.preventDefault();
            e.stopPropagation();
            setUsingTouch(false);
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        gameCanvas.addEventListener('mousedown', mouseDown, false);
        function mouseDown(e) {
            setUsingTouch(false);
            if (attackState != 1) {
                attackState = 1;
                sendAtckState();
            }
            if(e.button == 2){
                breakObj = true;
                io.send("7", 1);
                if(player.weapons[1] == 10){
                    selectToBuild(player.weapons[1], true);
                }
            }
        }
        gameCanvas.addEventListener('mouseup', mouseUp, false);
        function mouseUp(e) {
            setUsingTouch(false);
            if (attackState != 0) {
                attackState = 0;
                sendAtckState();
            }
            if(e.button == 2){
                breakObj = false;
                io.send("7", 1);
            }
        }

        // INPUT UTILS:
        function getMoveDir() {
            var dx = 0;
            var dy = 0;
            if (controllingTouch.id != -1) {
                dx += controllingTouch.currentX - controllingTouch.startX;
                dy += controllingTouch.currentY - controllingTouch.startY;
            } else {
                for (var key in moveKeys) {
                    var tmpDir = moveKeys[key];
                    dx += !!keys[key] * tmpDir[0];
                    dy += !!keys[key] * tmpDir[1];
                }
            }
            return (dx == 0 && dy == 0) ? undefined : UTILS.fixTo(Math.atan2(dy, dx), 2);
        }
        var lastDir;
        let lessDir = undefined;
        let tmpAttackDir = undefined;
        let plusDir = 0;
        function getAttackDir() {
            if (!player) {
                return 0;
            } else {
                return player ? (-1 != attackingTouch.id ? lastDir = Math.atan2(attackingTouch.currentY - attackingTouch.startY, attackingTouch.currentX - attackingTouch.startX) : player.lockDir || usingTouch ||
                                 (lastDir = Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2)),
                                 UTILS.fixTo(lastDir || 0, 2)) : 0;
            }
            if (autos.bull || autos.insta.wait) {
                return near.aim;
            } else if (traps.intrap) {
                return traps.aim;
            } else {
                if ((!breakObj && !farm && !getEl('autgr').checked) || (places.slot0 || places.slot2 || places.slot4 || places.slot5)) {
                    return plusDir;
                } else {
                    if (breakObj) {
                        if (attackingTouch.id != -1) {
                            lastDir = Math.atan2(
                                attackingTouch.currentY - attackingTouch.startY,
                                attackingTouch.currentX - attackingTouch.startX
                            );
                        } else if (!player.lockDir && !usingTouch) {
                            lastDir = Math.atan2(mouseY - (screenHeight / 2), mouseX - (screenWidth / 2));
                        }
                        return UTILS.fixTo(lastDir || 0, 2);
                    }
                }
            }
        }

        // KEYS:
        var keys = {};
        var moveKeys = {
            87: [0,-1],
            38: [0,-1],
            83: [0,1],
            40: [0,1],
            65: [-1,0],
            37: [-1,0],
            68: [1,0],
            39: [1,0]
        };
        function resetMoveDir() {
            keys = {};
            io.send("rmd");
        }
        function keysActive() {
            return (allianceMenu.style.display != "block"
                    && chatHolder.style.display != "block");
        }

        let places = {
            slot0: false,
            slot2: false,
            slot4: false,
            slot5: false
        }
        document.getElementById('topInfoHolder').style.display = "block";
        document.getElementById('topInfoHolder').style.right = "1%";
        function keyDown(event) {
            var keyNum = event.which||event.keyCode||0;
            if(event.key == ("L" || "l")){
                io.send("6", 28);
                io.send("6", 25);
            }
            if(keyNum == 32){
            }
            if(keyNum == 190){
                io.send("ch", "-sync");
            }
            if (keyNum == 27) {
                if (!keys[keyNum]) {
                    keys[keyNum] = 1;
                    if (player && player.alive) {
                        hideAllWindows();
                        $("#menu").toggle();
                    }
                }
            } else if (player && player.alive && keysActive()) {
                if (!keys[keyNum]) {
                    keys[keyNum] = 1;
                    if(keyNum == 74){
                        farm = !farm;
                        io.send("ch", "farm " + farm);
                    }
                    if(event.key == "c"){
                        if(spamchat == false) {
                            audios[document.getElementById("chatType").value].currentTime = 0;
                            sendMusic(document.getElementById("chatType").value);
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
                        io.send("ch", "song: " + (spamchat == false ? "true" : "false"));
                        spamchat = !spamchat;
                    }
                    if (keyNum == 69) {
                        sendAutoGather();
                    } else if (keyNum == 67) {
                        updateMapMarker();
                    } else if (keyNum == 88) {
                        sendLockDir();
                    } else if (player.weapons[keyNum - 49] != undefined) {
                        selectWeapon(player.weapons[keyNum - 49]);
                    } else if (player.items[keyNum - 49 - player.weapons.length] != undefined) {
                        selectToBuild(player.items[keyNum - 49 - player.weapons.length]);
                    } else if (keyNum == 221) {
                        if(player.weapons[1] == 9){auI=!auI};
                        if(player.weapons[1] != 9){
                            if(autos.insta.count < 10){
                                autos.insta.count++;
                            } else {
                                autos.insta.count = 1;
                            }
                            if (autos.insta.count <= 0) {
                                autos.insta.todo = true;
                            }
                        }
                    } else if (moveKeys[keyNum]) {
                        sendMoveDir();
                    } else if (keyNum == 32) {
                        attackState = 1;
                        sendAtckState();
                    } else if (event.key == "v") {
                        places.slot2 = true;
                    } else if (event.key == "f") {
                        places.slot4 = true;
                    } else if (event.key == "h") {
                        places.slot5 = true;
                    } else if (event.key == "m") {
                        millC.active = !millC.active;
                    } else if (event.key == "G") {
                        for (let i = 0; i < (wsconnected < 3 ? 3 : 4); i++) {
                            if (isProd && tmpAddress) {
                                window.grecaptcha.execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {action : 'homepage' }).then(function(token) {
                                    // CONNECT SOCKET:
                                    bConnect(token, i);
                                });
                            } else {
                                // CONNECT SOCKET:
                                bConnect(null, i);
                            }
                        }
                    }
                }
            }
        }
        window.addEventListener('keydown', UTILS.checkTrusted(keyDown));
        function keyUp(event) {
            if (player && player.alive) {
                var keyNum = event.which||event.keyCode||0;
                if (keyNum == 13) {
                    toggleChat();
                } else if (keysActive()) {
                    if (keys[keyNum]) {
                        keys[keyNum] = 0;
                        if (moveKeys[keyNum]) {
                            sendMoveDir();
                        } else if (keyNum == 32) {
                            attackState = 0;
                            sendAtckState();
                        } else if (event.key == "v") {
                            places.slot2 = false;
                        } else if (event.key == "f") {
                            places.slot4 = false;
                        } else if (event.key == "h") {
                            places.slot5 = false;
                        }
                    }
                }
            }
        }
        window.addEventListener('keyup',  UTILS.checkTrusted(keyUp));
        function sendAtckState() {
            if (player && player.alive) {
                io.send("c", attackState, (player.buildIndex >= 0?getAttackDir():null));
            }
        }
        var lastMoveDir = undefined;
        function sendMoveDir() {
            var newMoveDir = getMoveDir();
            if (lastMoveDir == undefined || newMoveDir == undefined || Math.abs(newMoveDir - lastMoveDir) > 0.3) {
                io.send("33", newMoveDir);
                lastMoveDir = newMoveDir;
            }
        }
        function sendLockDir() {
            player.lockDir = player.lockDir?0:1;
            io.send("7", 0);
        }
        function sendMapPing() {
            io.send("14", 1);
            if(window.pingTime >= 41){
                if(near.dist >= 511){
                    io.send("33", near.aim);
                    buyEquip(22, 0);
                } else if(near.dist <= 499){
                    io.send("33", near.aim + Math.PI);
                    buyEquip(22, 0);
                } else if(near.dist >= 500 && near.dist <= 510){
                    autos.bowInsta = true;
                    selectToBuild(player.weapons[1], true);
                    auI = false;
                    io.send("33", null);
                    io.send("c", 1, near.aim);
                    setTimeout(() => {
                        buyEquip(53, 0);
                        setTimeout(() => {
                            io.send("6", 12);
                            setTimeout(() => {
                                io.send("6", 15);
                                setTimeout(() => {
                                    io.send("c", 0, player.dir);
                                    buyEquip(6, 0);
                                    selectToBuild(player.weapons[0], true);
                                    autos.bowInsta = false;
                                }, 140);
                            }, config.tickRate/2);
                        }, config.tickRate);
                    }, config.tickRate/32);
                }
            } else {
                if(near.dist >= 511){
                    io.send("33", near.aim);
                    buyEquip(22, 0);
                } else if(near.dist <= 499){
                    io.send("33", near.aim + Math.PI);
                    buyEquip(22, 0);
                } else if(near.dist >= 500 && near.dist <= 510){
                    autos.bowInsta = true;
                    selectToBuild(player.weapons[1], true);
                    auI = false;
                    io.send("33", null);
                    io.send("c", 1, near.aim);
                    setTimeout(() => {
                        buyEquip(53, 0);
                        setTimeout(() => {
                            io.send("6", 12);
                            setTimeout(() => {
                                io.send("6", 15);
                                setTimeout(() => {
                                    io.send("c", 0, player.dir);
                                    buyEquip(6, 0);
                                    selectToBuild(player.weapons[0], true);
                                    autos.bowInsta = false;
                                }, 142);
                            }, 142);
                        }, 130);
                    }, 1);
                }
            }
        }
        function sendAutoGather() {
            io.send("7", 1);
        }
        function selectToBuild(index, wpn) {
            io.send("5", index, wpn);
        }
        function selectWeapon(index, isPlace) {
            if (!isPlace) {
                configs.weaponCode = index;
            }
            io.send("5", index, true);
        }
        function sendAtck(id, angle) {
            io.send("c", id, angle);
        }

        // ENTER GAME:
        function enterGame() {
            saveVal("moo_name", nameInput.value);
            if (!inGame && socketReady()) {
                inGame = true;
                Sound.stop("menu");
                showLoadingText("Loading...");
                io.send("sp", {
                    name: nameInput.value,
                    moofoll: moofoll,
                    skin: skinColor
                });
                let cookie = document.getElementById("ot-sdk-btn-floating");
                if (cookie) {
                    cookie.style.display = "none";
                }
            }
        }

        // SETUP GAME:
        var firstSetup = true;
        function setupGame(yourSID) {
            loadingText.style.display = "none";
            menuCardHolder.style.display = "block";
            mainMenu.style.display = "none";
            keys = {};
            playerSID = yourSID;
            attackState = 0;
            inGame = true;
            if (firstSetup) {
                firstSetup = false;
                gameObjects.length = 0;
            }
        }

        // SHOW ANIM TEXT:
        var TickDmg = 0;
        var TickHeal = 0;
        var TickDmgX = 0;
        var TickHealX = 0;
        var TickDmgY = 0;
        var TickHealY = 0;
        var DmgPerTick = [];
        var HealPerTick = [];
        var DmgXPerTick = [];
        var HealXPerTick = [];
        var DmgYPerTick = [];
        var HealYPerTick = [];
        function showText(x, y, value, type) {
            if(getEl('dmgcal').checked){
                if(!reghil){
                    HealYPerTick.push(y)
                    HealXPerTick.push(x)
                    if (value >= 0) {
                        DmgPerTick.push(value)
                        DmgYPerTick.push(y)
                        DmgXPerTick.push(x)
                    } else {
                        HealPerTick.push(value)
                        HealYPerTick.push(y)
                        HealXPerTick.push(x)
                    }
                    setTimeout(() => {
                        for (let i = 0; i < DmgPerTick.length; i++) {
                            TickDmg = TickDmg + DmgPerTick[i]
                            TickDmgX = TickDmgX + DmgXPerTick[i]
                            if (i == DmgPerTick.length - 1) {
                                TickDmgX = TickDmgX / DmgPerTick.length + 1
                            }
                            TickDmgY = TickDmgY + DmgYPerTick[i]
                            if (i == DmgPerTick.length - 1) {
                                TickDmgY = TickDmgY / DmgPerTick.length + 1
                            }
                        }
                        for (let i = 0; i < HealPerTick.length; i++) {
                            TickHeal = TickHeal + HealPerTick[i]
                            TickHealX = TickHealX + HealXPerTick[i]
                            if (i == HealPerTick.length - 1) {
                                TickHealX = TickHealX / HealPerTick.length + 1
                            }
                            TickHealY = TickHealY + HealYPerTick[i]
                            if (i == HealPerTick.length - 1) {
                                TickHealY = TickHealY / HealPerTick.length + 1
                            }
                        }
                        if (TickHeal < 0 && TickHeal != 0) {
                            /*textManager.showText(TickHealX, TickHealY, 50, .18, 1150, "" + Math.abs(TickHeal), "#8ecc51")*/ //e - x // t - y
                        }
                        if (TickDmg > 0) {
                            /*textManager.showText(TickDmgX, TickDmgY, 50, .18, 1150, "" + Math.abs(TickDmg), "#fff")*/ //e - x // t - y
                        }
                        TickDmg = 0;
                        TickHeal = 0;
                        TickDmgX = 0;
                        TickHealX = 0;
                        TickDmgY = 0;
                        TickHealY = 0;
                        DmgPerTick = [];
                        HealPerTick = [];
                        DmgXPerTick = [];
                        HealXPerTick = [];
                        DmgYPerTick = [];
                        HealYPerTick = [];
                    }, 1);
                }else{
                    /*textManager.showText(x, y, 50, .18, 1950, Math.abs(value), value >= 0 ? "#fff" : "#8ecc51")*/
                }
            } else {
                /*textManager.showText(x, y, 50, .18, 1950, Math.abs(value), value >= 0 ? "#fff" : "#8ecc51")*/
            }
        }
        var reghil = false;

        // KILL PLAYER:
        var deathTextScale = 99999;
        function killPlayer() {
            inGame = false;
            try {
                factorem.refreshAds([2], true);
            } catch (e) {};
            gameUI.style.display = "none";
            hideAllWindows();
            lastDeath = {
                x: player.x,
                y: player.y
            };
            loadingText.style.display = "none";
            diedText.style.display = "block";
            diedText.style.fontSize = "0px";
            deathTextScale = 0;
            setTimeout(function() {
                menuCardHolder.style.display = "block";
                mainMenu.style.display = "block";
                // Sound.play("menu", 1, true);
                diedText.style.display = "none";
            }, config.deathFadeout);

            // UPDATE SERVER LIST:
            updateServerList();
        }

        // KILL ALL OBJECTS BY A PLAYER:
        function killObjects(sid) {
            if (player) objectManager.removeAllItems(sid);
        }

      // KILL OBJECT:
        function killObject(sid) {
            if (trapData.sid == sid) {
                trapData.sid = undefined;
            }
            if(getEl('autgr').checked){
                place(5, player.dir - toRad(45));
                place(5, player.dir + toRad(45));
            }
            if(near.dist <= 200){
                if (player.weaponIndex != player.weapons[0]) {
                    selectWeapon(player.weapons[0]);
                }
                if (player.reloads[player.weapons[0]] == 0 && near.dist <= 168) {
                    io.send("c", 1, near.aim);
                    io.send("2", near.aim);
                    buyEquip(7, 0);
                    buyEquip(18, 1);
                    place(player.items[2], near.aim);
                    setTimeout(()=> {
                        io.send("c", 0, player.dir);
                        (nearestturrets > 0 ? buyEquip(22, 0) : buyEquip(6, 0))
                        buyEquip(21, 1);
                    }, config.tickRate);
                }
            }
            let findObj = findObjectBySid(sid);
            try {
                let objAim = UTILS.getDirect(findObj, tmpXY(player));
                let objDst = UTILS.getDist(findObj, tmpXY(player));
                if (player.alive && near.enemys.length) {

                    // REPLACER:
                        if (getEl("plc2").checked && objDst <= 400) {

                            if (near.dist <= 250) {
                                let tmpCount = -1;
                                for (let i = 0; i < Math.PI*8; i+= Math.PI/1) {
                                    tmpCount++
                                    if (tmpCount == 1 && objDst <= 200) {
                                        place(2, objAim);
                                        place(2, objAim + Math.PI);
                                    } else {
                                        checkPlace(2, objAim+i);
                                    }
                                }
                            } else if (near.dist > 250 && near.dist < 500) {
                                let tmpCount = -1;
                                for (let i = 0; i < Math.PI*5.5; i+= Math.PI/2.2) {
                                    if (player.items[4] == 15) {
                                        tmpCount++;
                                        if (tmpCount == 0 && objDst <= 200) {
                                            place(4, objAim);
                                            place(4, objAim + Math.PI);
                                        } else {
                                            checkPlace(4, objAim+i+2);
                                        }
                                    }
                                }
                            }
                        }
                    if(near.dist <= 170 && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if(tmpObj.weaponIndex == 3 || tmpObj.weaponIndex == 4 || tmpObj.weaponIndex == 5 && gconfig.hitdetect && tmpObj.skinIndex == 7){
                            io.send("ch", "spike tick detected");
                            hconfig.spiketick = true;
                        } else {
                            hconfig.spiketick = false;
                        }
                    }
                }
            } catch (error) {
                modLogs.push({
                    time: ticks.tick,
                    reason: "[" + error + "]"
                });
            }
            objectManager.disableBySid(sid);
        }


        // UPDATE SCORE DISPLAY:
        function updateStatusDisplay() {
            scoreDisplay.innerText = player.points;
            foodDisplay.innerText = player.food;;
            woodDisplay.innerText = player.wood;
            stoneDisplay.innerText = player.stone;
            killCounter.innerText = player.kills;
        }

        // ICONS:
        var iconSprites = {};
        var icons = ["crown", "skull"];
        function loadIcons() {
            for (var i = 0; i < icons.length; ++i) {
                var tmpSprite = new Image();
                tmpSprite.onload = function() {
                    this.isLoaded = true;
                };
                tmpSprite.src = ".././img/icons/" + icons[i] + ".png";
                iconSprites[icons[i]] = tmpSprite;
            }
        }

        // UPDATE UPGRADES:
        var tmpList = [];
        function updateUpgrades(points, age) {
            player.upgradePoints = points;
            player.upgrAge = age;
            if (points > 0) {
                tmpList.length = 0;
                UTILS.removeAllChildren(upgradeHolder);
                for (var i = 0; i < items.weapons.length; ++i) {
                    if (items.weapons[i].age == age && (items.weapons[i].pre == undefined || player.weapons.indexOf(items.weapons[i].pre) >= 0)) {
                        var e = UTILS.generateElement({
                            id: "upgradeItem" + i,
                            class: "actionBarItem",
                            onmouseout: function() { showItemInfo(); },
                            parent: upgradeHolder
                        });
                        e.style.backgroundImage = document.getElementById("actionBarItem" + i).style.backgroundImage;
                        tmpList.push(i);
                    }
                }
                for (var i = 0; i < items.list.length; ++i) {
                    if (items.list[i].age == age && (items.list[i].pre == undefined || player.items.indexOf(items.list[i].pre) >= 0)) {
                        var tmpI = (items.weapons.length + i);
                        var e = UTILS.generateElement({
                            id: "upgradeItem" + tmpI,
                            class: "actionBarItem",
                            onmouseout: function() { showItemInfo(); },
                            parent: upgradeHolder
                        });
                        e.style.backgroundImage = document.getElementById("actionBarItem" + tmpI).style.backgroundImage;
                        tmpList.push(tmpI);
                    }
                }
                for (var i = 0; i < tmpList.length; i++) {
                    (function(i) {
                        var tmpItem = document.getElementById('upgradeItem' + i);
                        tmpItem.onmouseover = function() {
                            if (items.weapons[i]) {
                                showItemInfo(items.weapons[i], true);
                            } else {
                                showItemInfo(items.list[i-items.weapons.length]);
                            }
                        };
                        tmpItem.onclick = UTILS.checkTrusted(function() {
                            if (i >= 0 && i <= 15) {
                                if (i < 9) {
                                    selectWeapon(i);
                                } else if (i > 8) {
                                    selectWeapon(player.weapons[0]);
                                }
                                player.reloads[i] = 0;
                            }
                            io.send("6", i);
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
        function sendUpgrade(index) {
            io.send("6", index);
        }

        // UPDATE AGE:
        function updateAge(xp, mxp, age) {
            if (xp != null)
                player.XP = xp;
            if (mxp != null)
                player.maxXP = mxp;
            if (age != null)
                player.age = age;
            if (age == config.maxAge) {
                ageText.innerHTML = "MAX AGE";
            } else {
                age == config.maxAge ? ((ageText.innerHTML = "MAX AGE"), (ageBarBody.style.width = "100%")) : ((ageText.innerHTML = "AGE " + player.age), (ageBarBody.style.width = (player.XP / player.maxXP) * 100 + "%"));
            }
        }

        // UPDATE LEADERBOARD:
        function updateLeaderboard(data) {
            UTILS.removeAllChildren(leaderboardData);
            var tmpC = 1;
            for (var i = 0; i < data.length; i += 3) {
                (function(i) {
                    UTILS.generateElement({
                        class: "leaderHolder",
                        parent: leaderboardData,
                        children: [
                            UTILS.generateElement({
                                class: "leaderboardItem",
                                style: "color:" + (data[i] == playerSID ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.6)")/* + ";text-shadow:" + (data[i] == playerSID ? "4px 4px 5px #95cb95" : "4px 4px 5px #fc6d71")*/,
                                text: tmpC + ". " + (data[i+1] != "" ? data[i+1] : "unknown")
                            }),
                            UTILS.generateElement({
                                class: "leaderScore",
                                style: "color:" + ("#c7e9f9"/*data[i] == playerSID ? "#95cb95" : "#fc6d71"*/)/* + ";text-shadow:" + (data[i] == playerSID ? "4px 4px 5px #95cb95" : "4px 4px 5px #fc6d71")*/,
                                text: UTILS.kFormat(data[i+2]) || "0"
                            })
                        ]
                    });
                })(i);
                tmpC++;
            }
        }

        // UPDATE GAME:
        function updateGame() {
            if (true) {
                var xOffset = camX - (maxScreenWidth / 2);
                var yOffset = camY - (maxScreenHeight / 2);
                // UPDATE DIRECTION:
                if (player) {
                    if (!lastSent || now - lastSent >= (1000 / config.clientSendRate)) {
                        lastSent = now;
                        let atckDir = getAttackDir();
                        if (lessDir !== atckDir) {
                            lessDir = atckDir;
                            io.send("2", atckDir);
                        }
                        tmpAttackDir = atckDir;
                    }
                }

                // DEATH TEXT:
                if (deathTextScale < 120) {
                    deathTextScale += 0.1 * delta;
                    diedText.style.fontSize = Math.min(Math.round(deathTextScale), 120) + "px";
                }

                // MOVE CAMERA:
                if (player) {
                    var tmpDist = UTILS.getDistance(camX, camY, player.x, player.y);
                    var tmpDir = UTILS.getDirection(player.x, player.y, camX, camY);
                    var camSpd = Math.min(tmpDist * 0.01 * delta, tmpDist);
                    if (tmpDist > 3) {
                        camX += camSpd * Math.cos(tmpDir);
                        camY += camSpd * Math.sin(tmpDir);
                    } else {
                        camX = (player.x);
                        camY = (player.y);
                    }
                } else {
                    camX = config.mapScale / 2;
                    camY = config.mapScale / 2;
                }

                // INTERPOLATE PLAYERS AND AI:
                var lastTime = now - (1000 / config.serverUpdateRate);
                var tmpDiff;
                for (var i = 0; i < players.length + ais.length; ++i) {
                    tmpObj = players[i]||ais[i-players.length];
                    if (tmpObj && tmpObj.visible) {
                        if (tmpObj.forcePos) {
                            tmpObj.x = tmpObj.x2;
                            tmpObj.y = tmpObj.y2;
                            tmpObj.dir = tmpObj.d2;
                        } else {
                            var total = tmpObj.t2 - tmpObj.t1;
                            var fraction = lastTime - tmpObj.t1;
                            var ratio = (fraction / total);
                            var rate = 170;
                            tmpObj.dt += delta;
                            var tmpRate = Math.min(1.2, tmpObj.dt / rate);
                            var tmpDiff = (tmpObj.x2 - tmpObj.x1);
                            tmpObj.x = tmpObj.x1 + (tmpDiff * tmpRate);
                            tmpDiff = (tmpObj.y2 - tmpObj.y1);
                            tmpObj.y = tmpObj.y1 + (tmpDiff * tmpRate);
                            tmpObj.dir = Math.lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, ratio));

                        }
                    }
                }

                // RENDER BACKGROUND:
                if (config.snowBiomeTop - yOffset <= 0 && config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight) {
                        mainContext.fillStyle = color.grass;
                    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
                } else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
                    mainContext.fillStyle = color.des;
                    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
                } else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
                    mainContext.fillStyle = color.snow;
                    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
                } else if (config.snowBiomeTop - yOffset >= 0) {
                    mainContext.fillStyle = color.snow;
                    mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset);
                    mainContext.fillStyle = color.grass;
                    mainContext.fillRect(0, config.snowBiomeTop - yOffset, maxScreenWidth,
                                         maxScreenHeight - (config.snowBiomeTop - yOffset));
                } else {
                    mainContext.fillStyle = color.grass;
                    mainContext.fillRect(0, 0, maxScreenWidth,
                                         (config.mapScale - config.snowBiomeTop - yOffset));
                    mainContext.fillStyle = color.grass;
                    mainContext.fillRect(0, (config.mapScale - config.snowBiomeTop - yOffset), maxScreenWidth,
                                         maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset));
                }

                // RENDER WATER AREAS:
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

                // RENDER GRID:
                mainContext.lineWidth = 4;
                mainContext.strokeStyle = "#000";
                mainContext.globalAlpha = 0;
                mainContext.beginPath();
                for (var x = -camX; x < maxScreenWidth; x += maxScreenHeight / 18) {
                    if (x > 0) {
                        mainContext.moveTo(x, 0);
                        mainContext.lineTo(x, maxScreenHeight);
                    }
                }
                for (var y = -camY; y < maxScreenHeight; y += maxScreenHeight / 18) {
                    if (x > 0) {
                        mainContext.moveTo(0, y);
                        mainContext.lineTo(maxScreenWidth, y);
                    }
                }
                mainContext.stroke();

                // RENDER BOTTOM LAYER:
                mainContext.globalAlpha = 1;
                mainContext.strokeStyle = outlineColor;
                renderGameObjects(-1, xOffset, yOffset);

                // RENDER PROJECTILES:
                mainContext.globalAlpha = 0.7;
                mainContext.lineWidth = outlineWidth;
                renderProjectiles(0, xOffset, yOffset);

                // RENDER PLAYERS:
                renderPlayers(xOffset, yOffset, 0);

                // RENDER AI:
                mainContext.globalAlpha = 1;
                for (var i = 0; i < ais.length; ++i) {
                    tmpObj = ais[i];
                    if (tmpObj.active && tmpObj.visible) {
                        tmpObj.animate(delta);
                        mainContext.save();
                        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
                        mainContext.rotate(tmpObj.dir+tmpObj.dirPlus-(Math.PI/2));
                        renderAI(tmpObj, mainContext);
                        mainContext.restore();
                    }
                }

                // RENDER GAME OBJECTS (LAYERED):
                renderGameObjects(0, xOffset, yOffset);
                renderProjectiles(1, xOffset, yOffset);
                renderGameObjects(1, xOffset, yOffset);
                renderPlayers(xOffset, yOffset, 1);
                renderGameObjects(2, xOffset, yOffset);
                renderGameObjects(3, xOffset, yOffset);

                // MAP BOUNDARIES:
                mainContext.fillStyle = "#000";
                mainContext.globalAlpha = 0.09;
                if (xOffset <= 0) {
                    mainContext.fillRect(0, 0, -xOffset, maxScreenHeight);
                } if (config.mapScale - xOffset <= maxScreenWidth) {
                    var tmpY = Math.max(0, -yOffset);
                    mainContext.fillRect(config.mapScale - xOffset, tmpY, maxScreenWidth - (config.mapScale - xOffset), maxScreenHeight - tmpY);
                } if (yOffset <= 0) {
                    mainContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset);
                } if (config.mapScale - yOffset <= maxScreenHeight) {
                    var tmpX = Math.max(0, -xOffset);
                    var tmpMin = 0;
                    if (config.mapScale - xOffset <= maxScreenWidth)
                        tmpMin = maxScreenWidth - (config.mapScale - xOffset);
                    mainContext.fillRect(tmpX, config.mapScale - yOffset,
                                         (maxScreenWidth - tmpX) - tmpMin, maxScreenHeight - (config.mapScale - yOffset));
                }


                // RENDER DAY/NIGHT TIME:
                mainContext.globalAlpha = 1;
                mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
                mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

                // RENDER PLAYER AND AI UI / PLAYERINFOS:
                mainContext.strokeStyle = darkOutlineColor;
                for (var i = 0; i < players.length + ais.length; ++i) {
                    tmpObj = players[i]||ais[i-players.length];
                    if (tmpObj.visible) {

                        // NAME AND HEALTH:
                        if (tmpObj.skinIndex != 10 || (tmpObj==player) || (tmpObj.team && tmpObj.team==player.team)) {
                            var tmpText = (tmpObj.team?"["+tmpObj.team+"] ":"") + (tmpObj.name||"")
                            //BUILD HP:
                            if(getEl("buildHp").checked){
                                for(let i = 0; i < gameObjects.length; i++){
                                    if(Math.hypot(gameObjects[i].y-player.y2, gameObjects[i].x-player.x2) < 590 && gameObjects[i].name && gameObjects[i].cHealth && gameObjects[i].active && gameObjects[i].scale){
                                        gameObjects[i].cHealth > 0 &&
                                            (mainContext.healthBarWidth,
                                             mainContext.fillStyle = darkOutlineColor,
                                             mainContext.roundRect(gameObjects[i].x - xOffset - config.healthBarWidth - config.healthBarPad, gameObjects[i].y - yOffset + gameObjects[i].scale - 110, 2 * config.healthBarWidth + 2 * config.healthBarPad, 17, 8),
                                             mainContext.fill(),
                                             mainContext.fillStyle = gameObjects[i].owner.sid == player.sid ? "#8ecc51" : teamDetect(gameObjects[i].owner.sid) ? "#8ecc51" : "#cc5151",
                                             mainContext.roundRect(gameObjects[i].x - xOffset - config.healthBarWidth, gameObjects[i].y - yOffset + gameObjects[i].scale - 110 + config.healthBarPad, 2 * config.healthBarWidth * (gameObjects[i].cHealth/gameObjects[i].health), 17 - 2 * config.healthBarPad, 7),
                                             mainContext.fill())
                                    }
                                }
                            }
                            //TURRET RELOAD BAR:
                            for (let i = 0; i < gameObjects.length; i++) {
                                gameObjects[i].cHealth > 0 && gameObjects[i].active && Math.hypot(gameObjects[i].y-player.y2, gameObjects[i].x-player.x2) < 590 && gameObjects[i].id == 17 && (config.healthBarWidth,
                        mainContext.fillStyle = darkOutlineColor,
                        mainContext.roundRect(gameObjects[i].x - xOffset - config.healthBarWidth - config.healthBarPad + config.healthBarWidth / 3, gameObjects[i].y - yOffset - 5 - 79, 2 * (config.healthBarWidth - config.healthBarWidth / 3) + 2 * config.healthBarPad, 17, 8),
                        mainContext.fill(),
                        mainContext.fillStyle = "#fff",
                        mainContext.roundRect(gameObjects[i].x - xOffset - config.healthBarWidth + config.healthBarWidth / 3, gameObjects[i].y - yOffset - 79, 2 * (config.healthBarWidth - config.healthBarWidth / 3) * (gameObjects[i].tReload), 17 - 2 * config.healthBarPad, 7),
                        mainContext.fill())
                            }
                            if (tmpText != "") {
                                mainContext.font = (tmpObj.nameScale||30) + "px Hammersmith One";
                                mainContext.fillStyle = "#fff";
                                mainContext.textBaseline = "middle";
                                mainContext.textAlign = "center";
                                mainContext.lineWidth = (tmpObj.nameScale?11:8);
                                mainContext.lineJoin = "round";
                                mainContext.strokeText(tmpText, tmpObj.x - xOffset, (tmpObj.y - yOffset + 135 - tmpObj.scale) - config.nameY);
                                mainContext.fillText(tmpText, tmpObj.x - xOffset, (tmpObj.y - yOffset + 135 - tmpObj.scale) - config.nameY);
                                if (tmpObj.isLeader && iconSprites["crown"].isLoaded) {
                                    var tmpS = config.crownIconScale;
                                    var tmpX = tmpObj.x - xOffset - (tmpS/2) - (mainContext.measureText(tmpText).width / 2) - config.crownPad;
                                    mainContext.drawImage(iconSprites["crown"], tmpX, (tmpObj.y - yOffset + 135 - tmpObj.scale)
                                                          - config.nameY - (tmpS/2) - 5, tmpS, tmpS);
                                } if (tmpObj.iconIndex == 1 && iconSprites["skull"].isLoaded) {
                                    var tmpS = config.crownIconScale;
                                    var tmpX = tmpObj.x - xOffset - (tmpS/2) + (mainContext.measureText(tmpText).width / 2) + config.crownPad;
                                    mainContext.drawImage(iconSprites["skull"], tmpX, (tmpObj.y - yOffset + 135 - tmpObj.scale)
                                                          - config.nameY - (tmpS/2) - 5, tmpS, tmpS);
                                }
                                if (tmpObj != player && tmpObj.isPlayer) {
                                    mainContext.save();
                                    mainContext.translate((player.x - xOffset + tmpObj.x - xOffset) / 2, (player.y - yOffset + tmpObj.y - yOffset) / 2);
                                    mainContext.rotate(Math.atan2(tmpObj.y - player.y, tmpObj.x - player.x));
                                    mainContext.font = 32 + "px Hammersmith One";
                                    mainContext.fillStyle = tmpObj == player || tmpObj.team && tmpObj.team == player.team ? `rgba(0, 0, 0, 0.5)` : `rgba(0, 0, 0, 0.5)`;
                                    mainContext.textBaseline = "middle";
                                    mainContext.fillText("➤", 0, 0);
                                    mainContext.restore();
                                }
                            } if (tmpObj.health > 0) {

                                // HEALTH HOLDER:
                                var tmpWidth = config.healthBarWidth;
                                mainContext.fillStyle = darkOutlineColor;
                                mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad,
                                                      (tmpObj.y - yOffset - 135 + tmpObj.scale) + config.nameY, (config.healthBarWidth * 2) +
                                                      (config.healthBarPad * 2), 17, 8);
                                mainContext.fill();

                                // HEALTH BAR:
                                mainContext.fillStyle = (tmpObj==player||(tmpObj.team&&tmpObj.team==player.team))?"#8ecc51":"#cc5151";
                                mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth,
                                                      (tmpObj.y - yOffset - 135 + tmpObj.scale) + config.nameY + config.healthBarPad,
                                                      ((config.healthBarWidth * 2) * (tmpObj.health / tmpObj.maxHealth)), 17 - config.healthBarPad * 2, 7);
                                mainContext.fill();
                            }
                            if (tmpObj.isPlayer) {
                                if (getEl("shame").checked) {
                                    mainContext.font = (tmpObj.nameScale||30) + "px Hammersmith One";
                                    mainContext.fillStyle = (tmpObj.shameCounter >= tmpObj.dangerShame ? "#e35650" : "#b4bedc");
                                    mainContext.textBaseline = "middle";
                                    mainContext.textAlign = "center";
                                    mainContext.lineWidth = (tmpObj.nameScale?11:8);
                                    mainContext.lineJoin = "round";
                                    var tmpS = config.crownIconScale;
                                    var tmpX = tmpObj.x - xOffset - (tmpS/2) + (mainContext.measureText(tmpText).width / 2) + config.crownPad + ((tmpObj.nameScale||30));
                                    mainContext.strokeText(tmpObj.shameCount, tmpX, (tmpObj.y + 135 - yOffset - tmpObj.scale) - config.nameY);
                                    mainContext.fillText(tmpObj.shameCount, tmpX, (tmpObj.y + 135 - yOffset - tmpObj.scale) - config.nameY);
                                }
                                if (getEl("reload1").checked) {

                                    // SECONDARY RELOAD HOLDER:
                                    var tmpWidth = config.healthBarWidth;
                                    mainContext.fillStyle = darkOutlineColor;
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad + 50,
                                                          (tmpObj.y - 135 - yOffset + tmpObj.scale) + config.nameY - 13, config.healthBarWidth +
                                                          (config.healthBarPad * 2), 17, 8);
                                    mainContext.fill();

                                    // SECONDARY RELOAD BAR:
                                    mainContext.fillStyle = "#ba8c27";
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth + 50,
                                                          (tmpObj.y - 135 - yOffset + tmpObj.scale) + config.nameY - 13 + config.healthBarPad,
                                                          (config.healthBarWidth * (tmpObj.reloads[tmpObj.secondaryIndex] == undefined ? 1 : ((items.weapons[tmpObj.secondaryIndex].speed - tmpObj.reloads[tmpObj.secondaryIndex]) / items.weapons[tmpObj.secondaryIndex].speed))), 17 - config.healthBarPad * 2, 7);
                                    mainContext.fill();

                                    // PRIMARY RELOAD HOLDER:
                                    var tmpWidth = config.healthBarWidth;
                                    mainContext.fillStyle = darkOutlineColor;
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad,
                                                          (tmpObj.y - 135 - yOffset + tmpObj.scale) + config.nameY - 13, config.healthBarWidth +
                                                          (config.healthBarPad * 2), 17, 8);
                                    mainContext.fill();

                                    // PRIMARY RELOAD BAR:
                                    mainContext.fillStyle = "#ba8c27";
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth,
                                                          (tmpObj.y - 135 - yOffset + tmpObj.scale) + config.nameY - 13 + config.healthBarPad,
                                                          (config.healthBarWidth * (tmpObj.reloads[tmpObj.primaryIndex] == undefined ? 1 : ((items.weapons[tmpObj.primaryIndex].speed - tmpObj.reloads[tmpObj.primaryIndex]) / items.weapons[tmpObj.primaryIndex].speed))), 17 - config.healthBarPad * 2, 7);
                                    mainContext.fill();

                                }
                                if (getEl("reload2").checked) {

                                    // TURRET RELOAD HOLDER:
                                    var tmpWidth = config.healthBarWidth;
                                    mainContext.fillStyle = darkOutlineColor;
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad,
                                                          (tmpObj.y - 175 - yOffset + tmpObj.scale) + config.nameY + 13, (config.healthBarWidth * 2) +
                                                          (config.healthBarPad * 2), 17, 8);
                                    mainContext.fill();

                                    // TURRET RELOAD BAR:
                                    mainContext.fillStyle = "#ba8c27";
                                    mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth,
                                                          (tmpObj.y - yOffset - 175 + tmpObj.scale) + config.nameY + config.healthBarPad + 13,
                                                          (config.healthBarWidth * 2) * (!tmpObj.reloads[53] ? 1 : ((2500 - tmpObj.reloads[53]) / 2500)), 17 - config.healthBarPad * 2, 7);
                                    mainContext.fill();

                                }
                            }
                        }
                    }
                }

                // RENDER ANIM TEXTS:
                textManager.update(delta, mainContext, xOffset, yOffset);

                // RENDER CHAT MESSAGES:
                for (var i = 0; i < players.length; ++i) {
                    tmpObj = players[i];
                    if (tmpObj.visible && tmpObj.chatCountdown > 0) {
                        tmpObj.chatCountdown -= delta;
                        if (tmpObj.chatCountdown <= 0)
                            tmpObj.chatCountdown = 0;
                        mainContext.font = "32px Hammersmith One";
                        var tmpSize = mainContext.measureText(tmpObj.chatMessage);
                        mainContext.textBaseline = "middle";
                        mainContext.textAlign = "center";
                        var tmpX = tmpObj.x - xOffset;
                        var tmpY = tmpObj.y - tmpObj.scale - yOffset - 90;
                        var tmpH = 47;
                        var tmpW = tmpSize.width + 17;
                        mainContext.fillStyle = "rgba(0,0,0,0.6)";
                        mainContext.roundRect(tmpX-tmpW/2, tmpY-tmpH/2, tmpW, tmpH, 6);
                        mainContext.fill();
                        mainContext.fillStyle = (getEl('textcolr').checked ? tmpObj == player ? "#c7e9f9" : (tmpObj.team && tmpObj.team == player.team) ? "#c7e9f9" : "#f3818a" : '#fff');
                        mainContext.fillText(tmpObj.chatMessage, tmpX, tmpY);
                    }
                }
            }

            // RENDER MINIMAP:
            renderMinimap(delta);

            // RENDER CONTROLS:
            if (controllingTouch.id !== -1) {
                renderControl(
                    controllingTouch.startX, controllingTouch.startY,
                    controllingTouch.currentX, controllingTouch.currentY
                );
            }
            if (attackingTouch.id !== -1) {
                renderControl(
                    attackingTouch.startX, attackingTouch.startY,
                    attackingTouch.currentX, attackingTouch.currentY
                );
            }
        }

        // RENDER CONTROL:
        function renderControl(startX, startY, currentX, currentY) {
            mainContext.save();
            mainContext.setTransform(1, 0, 0, 1, 0, 0);
            mainContext.resetTransform();
            mainContext.scale(pixelDensity, pixelDensity);
            var controlRadius = 50;
            mainContext.beginPath();
            mainContext.arc(startX, startY, controlRadius, 0, Math.PI * 2, false);
            mainContext.closePath();
            mainContext.fillStyle = "rgba(255, 255, 255, 0.3)";
            mainContext.fill();
            var controlRadius = 50;
            var offsetX = currentX - startX;
            var offsetY = currentY - startY;
            var mag = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
            var divisor = mag > controlRadius ? (mag / controlRadius) : 1;
            offsetX /= divisor;
            offsetY /= divisor;
            mainContext.beginPath();
            mainContext.arc(startX + offsetX, startY + offsetY, controlRadius * 0.5, 0, Math.PI * 2, false);
            mainContext.closePath();
            mainContext.fillStyle = "white";
            mainContext.fill();
            mainContext.restore();
        }

        // RENDER PROJECTILES:
        function renderProjectiles(layer, xOffset, yOffset) {
            for (var i = 0; i < projectiles.length; ++i) {
                tmpObj = projectiles[i];
                if (tmpObj.active && tmpObj.layer == layer) {
                    tmpObj.update(delta);
                    if (tmpObj.active && isOnScreen(tmpObj.x-xOffset, tmpObj.y-yOffset, tmpObj.scale)) {
                        mainContext.save();
                        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
                        mainContext.rotate(tmpObj.dir);
                        renderProjectile(0, 0, tmpObj, mainContext, 1);
                        mainContext.restore();
                    }
                }
            }
        }

        // RENDER PROJECTILE:
        var projectileSprites = {};
        function renderProjectile(x, y, obj, ctxt, debug) {
            if (obj.src) {
                var tmpSrc = items.projectiles[obj.indx].src;
                var tmpSprite = projectileSprites[tmpSrc];
                if (!tmpSprite) {
                    tmpSprite = new Image();
                    tmpSprite.onload = function() {
                        this.isLoaded = true;
                    }
                    tmpSprite.src = ".././img/weapons/" + tmpSrc + ".png";
                    projectileSprites[tmpSrc] = tmpSprite;
                }
                if (tmpSprite.isLoaded)
                    ctxt.drawImage(tmpSprite, x - (obj.scale / 2), y - (obj.scale / 2), obj.scale, obj.scale);
            } else if (obj.indx == 1) {
                ctxt.fillStyle = "#939393";
                renderCircle(x, y, obj.scale, ctxt);
            }
        }

        // RENDER WATER BODIES:
        function renderWaterBodies(xOffset, yOffset, ctxt, padding) {

            // MIDDLE RIVER:
            var tmpW = config.riverWidth + padding;
            var tmpY = (config.mapScale / 2) - yOffset - (tmpW / 2);
            if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
                ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW);
            }
        }

        // RENDER GAME OBJECTS:
        function renderGameObjects(layer, xOffset, yOffset) {
            var tmpSprite, tmpX, tmpY;
            for (var i = 0; i < gameObjects.length; ++i) {
                tmpObj = gameObjects[i];
                if (tmpObj.active) {
                    tmpX = tmpObj.x + tmpObj.xWiggle - xOffset;
                    tmpY = tmpObj.y + tmpObj.yWiggle - yOffset;
                    if (layer == 0) {
                        tmpObj.update(delta);
                    }
                    if (tmpObj.layer == layer && isOnScreen(tmpX, tmpY, tmpObj.scale + (tmpObj.blocker||0))) {
                        if(getEl('objectt').checked){
                            if (player && tmpObj) {
                                var distance = UTILS.getDistance(tmpObj.x, tmpObj.y, player.x, player.y);
                                if (distance < 500) {
                                    mainContext.globalAlpha = 1;
                                } else if (distance < 510) {
                                    mainContext.globalAlpha = 0.9;
                                } else if (distance < 520) {
                                    mainContext.globalAlpha = 0.8;
                                } else if (distance < 530) {
                                    mainContext.globalAlpha = 0.7;
                                } else if (distance < 540) {
                                    mainContext.globalAlpha = 0.6;
                                } else if (distance < 550) {
                                    mainContext.globalAlpha = 0.5;
                                } else if (distance < 560) {
                                    mainContext.globalAlpha = 0.4;
                                } else if (distance < 570) {
                                    mainContext.globalAlpha = 0.3;
                                } else if (distance < 580) {
                                    mainContext.globalAlpha = 0.2;
                                } else if (distance < 590) {
                                    mainContext.globalAlpha = 0.1;
                                } else if (distance > 590) {
                                    mainContext.globalAlpha = 0;
                                }
                            }
                        }
                        if (tmpObj.isItem) {
                            tmpSprite = getItemSprite(tmpObj);
                            mainContext.save();
                            mainContext.translate(tmpX, tmpY),
                            (gameObjects[i].name == "windmill" || gameObjects[i].name == "faster windmill" || gameObjects[i].name == "power mill") ? mainContext.rotate(0) : mainContext.rotate(tmpObj.dir)
                            mainContext.drawImage(tmpSprite, -(tmpSprite.width / 2), -(tmpSprite.height / 2));
                            if (tmpObj.blocker) {
                                mainContext.strokeStyle = "#db6e6e";
                                mainContext.globalAlpha = 0.3;
                                mainContext.lineWidth = 6;
                                renderCircle(0, 0, tmpObj.blocker, mainContext, false, true);
                            }
                            mainContext.restore();
                        } else {
                            tmpSprite = getResSprite(tmpObj);
                            mainContext.drawImage(tmpSprite, tmpX - (tmpSprite.width / 2), tmpY - (tmpSprite.height / 2));
                        }
                    }
                }
            }
        }
        var resolveAll = [];
        function resolveAll1(e){
            for(let i = 0; i < resolveAll.length; i++){
                resolveAll[i](e)
            }
            resolveAll = [];
        }
        function destroyAll(){
            resolveAll = [];
        }
        function newPromise(){
            return new Promise(function(resolve, reject){
                resolveAll.push(resolve);
                setTimeout(function(){
                    reject();
                },50)
            })
        }
        function control(e){
            if(e == 10){
                return 7.5
            }else{
                return 1
            }
        }
        var hitResolve = [];
        var hitID = 0;
        function hitPromise(dmg){
            return new Promise(function(resolve, reject){
                hitID++;
                let a = hitID;
                let smth = {
                    dmg: dmg,
                    resolve: resolve,
                    id: hitID
                }
                hitResolve.push(smth);
                setTimeout(function(){
                    reject();
                    for(let i = 0; i < hitResolve.length; i++){
                        if(hitResolve[i].id == a){
                            hitResolve.splice(i, 1);
                        }
                    }
                },50)
            })
        }
        function hitResolveAll(weapon){
            let dmg = weapon == 5 ? 45 : 40;
            for(let i = 0; i < hitResolve.length; i++){
                if(dmg == hitResolve[i].dmg){
                    hitResolve[i].resolve()
                    hitResolve.splice(i, 1);
                }
            }
        }
        // GATHER ANIMATION:
        function gatherAnimation(sid, didHit, index) {
            tmpObj = findPlayerBySID(sid);
            let bullspamdetect = 0;
            let hat = tmpObj.skinIndex;
            let total = items.weapons[index].dmg;
            let extra = control(index);
            let morex = hat == 40 ? 3.3 : 1;
            let totaldmg = total * extra * morex;
            if (tmpObj) {
                (tmpObj = findPlayerBySID(sid)) && (tmpObj.startAnim(didHit, index), resolveAll1(totaldmg), ((index == 4 || index == 5) && hat != 7 && player.skinIndex != 6 && (hitResolveAll(index))), tmpObj.gatherIndex = index, tmpObj.gathering = 1)
                if(tmpObj.sid != player.sid){
                    tmpDir = UTILS.getDirection(player.x, player.y, tmpObj.x, tmpObj.y);
                    if(UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if(UTILS.getDistance(tmpObj.x, tmpObj.y, player.x, player.y) - (tmpObj.scale * 1.8) <= 210){

                        }
                    }
                    if(near.dist <= 190 && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if(tmpObj.weaponIndex == 10 && (tmpObj.skinIndex == 53 || tmpObj.skinIndex == 7) && sid != player.sid){
                            io.send("ch", "reverse detected");
                            hconfig.reverse = true;
                        } else {
                            hconfig.reverse = false;
                        }
                    }
                    if(near.dist <= 190 && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if((tmpObj.skinIndex == 53 || tmpObj.skinIndex == 7) && sid != player.sid){
                            abconfig.hit = true;
                        } else {
                            abconfig.hit = false;
                        }
                    }
                    if(near.dist <= 400 && near.dist >= 170 && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if((tmpObj.weaponIndex == 12 || tmpObj.weaponIndex == 13) && (tmpObj.skinIndex == 53 || tmpObj.skinIndex == 7)){
                            io.send("ch", "one tick detected");
                            hconfig.onetick = true;
                        } else {
                            hconfig.onetick = false;
                        }
                    }

                    if(near.dist <= 175 && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle && sid != player.sid){
                        hconfig.spiketick = true;
                    } else {
                        hconfig.spiketick = false;
                    }

                    if(UTILS.getDistance(tmpObj.x, tmpObj.y, player.x, player.y) - (player.scale * 1.8) <= items.weapons[index].range && !teamDetect(tmpObj) && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if(player.reloads[player.weapons[0]] == 0 && autos.antibullw){
                            io.send("ch", "ab worked");
                            autos.antibullw = false;
                            autos.antibull = true;
                            selectToBuild(player.weapons[0], true);
                            buyEquip(7, 0);
                            io.send("2", near.aim);
                            io.send("c", 1);
                            setTimeout(() => {
                                buyEquip(53, 0);
                                setTimeout(() => {
                                    buyEquip(6, 0);
                                    io.send("c", 0);
                                    autos.antibull = false;
                                    selectToBuild(player.weapons[0], true);
                                    io.send("7", 1);
                                    io.send("2", player.dir);
                                }, config.tickRate/2);
                            }, config.tickRate);
                        }
                    }
                        // anti bull end
                }// its good?
              // that mod have a token system(protection like password) its on discord i send u the server of link the websocket bot send messages // i sended it
              // lets see.. hmm is that anti trap? oh the upside its anti bull
              if (tmpObj == player) {
                    if (traps.intrap && (player.weapons[0] != 5 && player.weapons[0] != 8) && player.weapons[1] == 10 && player.skins[40] && tmpObj.weaponVariant == 0) {
                        trapData.hitCount++;
                    }
                }
              // code start here? no i said it on 10426 line
                let tmpDist = UTILS.getDistance(tmpObj.x, tmpObj.y, player.x, player.y) - (player.scale * 1.8);
                if(tmpDist <= items.weapons[index].range){
                    tmpDir = UTILS.getDirection(player.x, player.y, tmpObj.x, tmpObj.y);
                    if(UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                        if(tmpObj.skinIndex == 11 && player.skinIndex == 7){
                            if(sid != player.sid){
                                hconfig.antibulldet = true;
                                buyEquip(6, 0);
                                buyEquip(21, 1);
                                io.send("ch", "detected antibull");
                            }
                        } else {
                            hconfig.antibulldet = false;
                        }
                    }
                }
                tmpDir = UTILS.getDirection(player.x, player.y, tmpObj.x, tmpObj.y);
                if(traps.intrap && tmpObj != player && near.dist <= 210 && UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                    autos.barbarian = true;
                } else {
                    autos.barbarian = false;
                }
                /*for(let i = 0; i < players.length; i++){
                    let tmpObj2 = players[i];
                    if(tmpObj2.visible && tmpObj2 != tmpObj){
                        let tmpDist = UTILS.getDistance(tmpObj.x, tmpObj.y, tmpObj2.x, tmpObj2.y) - (tmpObj2.scale * 1.8);
                        if(tmpDist <= items.weapons[index].range){
                            tmpDir = UTILS.getDirection(tmpObj2.x, tmpObj2.y, tmpObj.x, tmpObj.y);
                            if(UTILS.getAngleDist(tmpDir, tmpObj.dir) <= config.gatherAngle){
                                if(tmpObj.weaponVariant == 3 || tmpObj.skinIndex == 21){
                                    if(tmpObj.skinIndex == 21){
                                        tmpObj2.pCount = 6;
                                        near.poisoned = true;
                                        setTimeout(() => {
                                            near.poisoned = false;
                                        }, 6000);
                                    } else {
                                        tmpObj2.pCount = 4;
                                    }
                                }
                            }
                        }
                    }
                }*/
            }
        }

        // RENDER PLAYERS:
        function renderPlayers(xOffset, yOffset, zIndex) {
            mainContext.globalAlpha = 1;
            for (var i = 0; i < players.length; ++i) {
                tmpObj = players[i];
                if (tmpObj.zIndex == zIndex) {
                    tmpObj.animate(delta);
                    if (tmpObj.visible) {
                        tmpObj.skinRot += (0.002 * delta);
                        tmpDir = (tmpObj == player ? player.dir : tmpObj.dir) + tmpObj.dirPlus;
                        mainContext.save();
                        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);

                        // RENDER PLAYER:
                        mainContext.rotate(tmpDir);
                        renderPlayer(tmpObj, mainContext);
                        mainContext.restore();
                    }
                }
            }
        }

        // RENDER PLAYER:
        function renderPlayer(obj, ctxt) {
            ctxt = ctxt || mainContext;
            let xOffset = camX - (maxScreenWidth / 2);
            let yOffset = camY - (maxScreenHeight / 2);
            ctxt.lineWidth = outlineWidth;
            ctxt.lineJoin = "miter";
            var handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS||1);
            var oHandAngle = (obj.buildIndex < 0)?(items.weapons[obj.weaponIndex].hndS||1):1;
            var oHandDist = (obj.buildIndex < 0)?(items.weapons[obj.weaponIndex].hndD||1):1;
            tmpDir = (tmpObj == player ? player.dir : tmpObj.dir) + tmpObj.dirPlus;

            // TAIL/CAPE:
            if (obj.tailIndex > 0) {
                ctxt.globalAlhpa = 0.5;
                renderTail(obj.tailIndex, ctxt, obj);
            }

            // WEAPON BELLOW HANDS:
            if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
                renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
                if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
                    renderProjectile(obj.scale, 0,
                                     items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
                }
            }

            // HANDS:
            ctxt.fillStyle = config.skinColors[obj.skinColor];
            renderCircle(obj.scale * Math.cos(handAngle), (obj.scale * Math.sin(handAngle)), 14);
            renderCircle((obj.scale * oHandDist) * Math.cos(-handAngle * oHandAngle),
                         (obj.scale * oHandDist) * Math.sin(-handAngle * oHandAngle), 14);

            // WEAPON ABOVE HANDS:
            if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
                renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
                if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
                    renderProjectile(obj.scale, 0,
                                     items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
                }
            }

            // BUILD ITEM:
            if (obj.buildIndex >= 0) {
                var tmpSprite = getItemSprite(items.list[obj.buildIndex]);
                ctxt.drawImage(tmpSprite, obj.scale - items.list[obj.buildIndex].holdOffset, -tmpSprite.width / 2);
            }

            // BODY:
            renderCircle(0, 0, obj.scale, ctxt);

            // SKIN:
            if (obj.skinIndex > 0) {
                (getEl('hatOp').checked ? ctxt.globalAlpha = 0.5 : ctxt.globalAlpha = 1);
                ctxt.rotate(Math.PI/2);
                renderSkin(obj.skinIndex, ctxt, null, obj);

            }

            //ITEM RANGE:
           /*ctxt.beginPath();
            ctxt.globalAlpha = 0.5;
            ctxt.fillStyle = darkOutlineColor;
            ctxt.arc(0, 0, items.weapons[obj.weaponIndex].range + 30, 2 * Math.PI, 0);
            ctxt.stroke();
            if(obj.weaponIndex == 9 || obj.weaponIndex == 12 || obj.weaponIndex == 13 || obj.weaponIndex == 15){
                ctxt.beginPath();
                ctxt.lineWidth = 3;
                ctxt.globalAlpha = 0.5;
                ctxt.fillStyle = darkOutlineColor;
                ctxt.moveTo(40 * Math.cos(tmpObj.dir-tmpDir), 40 * Math.sin(tmpObj.dir-tmpDir));
                ctxt.lineTo(1200 * Math.cos(tmpObj.dir-tmpDir), 1200 * Math.sin(tmpObj.dir-tmpDir));
                ctxt.stroke();
            }*/
        }

        // RENDER SKINS:
        var skinSprites = {};
        var skinPointers = {};
        var tmpSkin;
        function renderSkin(index, ctxt, parentSkin, owner) {
            tmpSkin = skinSprites[index];
            if (!tmpSkin) {
                var tmpImage = new Image();
                tmpImage.onload = function() {
                    this.isLoaded = true;
                    this.onload = null;
                };
                tmpImage.src = ".././img/hats/hat_" + index + ".png";
                skinSprites[index] = tmpImage;
                tmpSkin = tmpImage;
            }
            var tmpObj = parentSkin||skinPointers[index];
            if (!tmpObj) {
                for (var i = 0; i < hats.length; ++i) {
                    if (hats[i].id == index) {
                        tmpObj = hats[i];
                        break;
                    }
                }
                skinPointers[index] = tmpObj;
            }
            if (tmpSkin.isLoaded)
                ctxt.drawImage(tmpSkin, -tmpObj.scale/2, -tmpObj.scale/2, tmpObj.scale, tmpObj.scale);
            if (!parentSkin && tmpObj.topSprite) {
                ctxt.save();
                ctxt.rotate(owner.skinRot);
                renderSkin(index + "_top", ctxt, tmpObj, owner);
                ctxt.restore();
            }
        }

        // RENDER TAIL:
        var accessSprites = {};
        var accessPointers = {};
        function renderTail(index, ctxt, owner) {
            tmpSkin = accessSprites[index];
            if (!tmpSkin) {
                var tmpImage = new Image();
                tmpImage.onload = function() {
                    this.isLoaded = true;
                    this.onload = null;
                };
                tmpImage.src = ".././img/accessories/access_" + index + ".png";
                accessSprites[index] = tmpImage;
                tmpSkin = tmpImage;
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
                ctxt.translate(-20 - (tmpObj.xOff||0), 0);
                if (tmpObj.spin)
                    ctxt.rotate(owner.skinRot);
                ctxt.drawImage(tmpSkin, -(tmpObj.scale/2), -(tmpObj.scale/2), tmpObj.scale, tmpObj.scale);
                ctxt.restore();
            }
        }

        // RENDER TOOL:
        var toolSprites = {};
        function renderTool(obj, variant, x, y, ctxt) {
            var tmpSrc = obj.src + (variant||"");
            var tmpSprite = toolSprites[tmpSrc];
            if (!tmpSprite) {
                tmpSprite = new Image();
                tmpSprite.onload = function() {
                    this.isLoaded = true;
                }
                tmpSprite.src = (".././img/weapons/" + tmpSrc + ".png");
                toolSprites[tmpSrc] = tmpSprite;
            }
            if (tmpSprite.isLoaded)
                ctxt.drawImage(tmpSprite, x+obj.xOff-(obj.length/2), y+obj.yOff-(obj.width/2), obj.length, obj.width);
        }

        // RENDER GAME OBJECTS:
        var gameObjectSprites = {};
        function getResSprite(obj) {
            var biomeID = (obj.y>=config.mapScale-config.snowBiomeTop)?2:((obj.y<=config.snowBiomeTop)?1:0);
            var tmpIndex = (obj.type + "_" + obj.scale + "_" + biomeID);
            var tmpSprite = gameObjectSprites[tmpIndex];
            if (!tmpSprite) {
                var tmpCanvas = document.createElement('canvas');
                tmpCanvas.width = tmpCanvas.height = (obj.scale * 2.1) + outlineWidth;
                var tmpContext = tmpCanvas.getContext('2d');
                tmpContext.translate((tmpCanvas.width / 2), (tmpCanvas.height / 2));
                tmpContext.rotate(UTILS.randFloat(0, Math.PI));
                tmpContext.strokeStyle = outlineColor;
                tmpContext.lineWidth = outlineWidth;
                let colors = [
                    ["#b1d959", "#95b946"],
                    ["#bade6e", "#aac76b"],
                    ["#a7d544", "#86a63f"],
                    ["#b4db62", "#9ebf57"]
                ]
				let select = colors[Math.floor(Math.random() * colors.length)];
                if (obj.type == 0) {
                    var tmpScale;
                    for (var i = 0; i < 2; ++i) {
                        tmpScale = tmpObj.scale * (!i?1:0.5);
                        renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
//                        tmpContext.fillStyle = !biomeID?(!i?select[1]:select[0]):(!i?"#e3f1f4":"#fff");
                        tmpContext.fillStyle = !biomeID?(!i?"#9ebf57":"#b4db62"):(!i?"#e3f1f4":"#fff");
                        tmpContext.fill();
                        if (!i)
                            tmpContext.stroke();
                    }
                } else if (obj.type == 1) {
                    if (biomeID == 2) {
                        tmpContext.fillStyle = "#606060";
                        renderStar(tmpContext, 6, obj.scale * 0.3, obj.scale * 0.71);
                        tmpContext.fill();
                        tmpContext.stroke();
                        tmpContext.fillStyle = "#89a54c";
                        renderCircle(0, 0, obj.scale * 0.55, tmpContext);
                        tmpContext.fillStyle = "#a5c65b";
                        renderCircle(0, 0, obj.scale * 0.3, tmpContext, true);
                    } else {
                        renderBlob(tmpContext, 6, tmpObj.scale, tmpObj.scale * 0.7);
                        tmpContext.fillStyle = biomeID?"#e3f1f4":"#89a54c";
                        tmpContext.fill();
                        tmpContext.stroke();
                        tmpContext.fillStyle = biomeID?"#6a64af":"#c15555";
                        var tmpRange;
                        var berries = 4;
                        var rotVal = mathPI2 / berries;
                        for (var i = 0; i < berries; ++i) {
                            tmpRange = UTILS.randInt(tmpObj.scale/3.5, tmpObj.scale/2.3);
                            renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                                         UTILS.randInt(10, 12), tmpContext);
                        }
                    }
                } else if (obj.type == 2 || obj.type == 3) {
                    tmpContext.fillStyle = (obj.type==2)?(biomeID==2?"#938d77":"#939393"):"#e0c655";
                    renderStar(tmpContext, 3, obj.scale, obj.scale);
                    tmpContext.fill();
                    tmpContext.stroke();
                    tmpContext.fillStyle = (obj.type==2)?(biomeID==2?"#b2ab90":"#bcbcbc"):"#ebdca3";
                    renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
                    tmpContext.fill();
                }
                tmpSprite = tmpCanvas;
                gameObjectSprites[tmpIndex] = tmpSprite;
            }
            return tmpSprite;
        }
        function teamDetect(id) {
            for(let i = 0;i < alliancePlayers.length;i+=2){
                if(id == alliancePlayers[i]){
                    return true;
                }
            }
        }
        // GET ITEM SPRITE:
           var itemSprites = [];
        function getItemSprite(obj, asIcon) {
            var tmpSprite = itemSprites[obj.id + (player && obj .owner && obj.owner.sid == player.sid ? 0 : (player && player.team && obj.owner && teamDetect(obj.owner.sid) ? 25 : 50))];
            if (!tmpSprite || asIcon) {
                var tmpCanvas = document.createElement('canvas');
                tmpCanvas.width = tmpCanvas.height = 2.5 * obj.scale + 5.5 + (items.list[obj.id].spritePadding || 0);
                var tmpContext = tmpCanvas.getContext('2d');
                if (tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2), tmpContext.rotate(asIcon ? 0 : Math.PI / 2), tmpContext.strokeStyle = outlineColor, tmpContext.lineWidth = 5.5 * (asIcon ? tmpCanvas.width / 81 : 1), 'apple' == obj.name || 'cookie' == obj.name) {
                    tmpContext.fillStyle = '#c15555', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#89a54c';
                    var leafDir = -Math.PI / 2;
                    !function (x, y, l, r, ctxt) {
                        var endX = x + 25 * Math.cos(r), endY = y + 25 * Math.sin(r);
                        ctxt.moveTo(x, y), ctxt.beginPath(), ctxt.quadraticCurveTo((x + endX) / 2 + 10 * Math.cos(r + Math.PI / 2), (y + endY) / 2 + 10 * Math.sin(r + Math.PI / 2), endX, endY), ctxt.quadraticCurveTo((x + endX) / 2 - 10 * Math.cos(r + Math.PI / 2), (y + endY) / 2 - 10 * Math.sin(r + Math.PI / 2), x, y), ctxt.closePath(), ctxt.fill(), ctxt.stroke();
                    }(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir), 0, leafDir + Math.PI / 2, tmpContext);
                    for (var rotVal = mathPI2 / (chips = 4), i = 0; i < chips; ++i);
                } else if ('cheese' == obj.name) {
                    var chips, tmpRange;
                    for (tmpContext.fillStyle = '#f4f3ac', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#c3c28b', rotVal = mathPI2 / (chips = 4), i = 0; i < chips; ++i)
                        renderCircle((tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)) * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, !0);
                } else if ('wood wall' == obj.name || 'stone wall' == obj.name || 'castle wall' == obj.name) {
                    tmpContext.fillStyle = 'castle wall' == obj.name ? '#83898e' : 'wood wall' == obj.name ? '#a5974c' : '#939393';
                    var sides = 'castle wall' == obj.name ? 4 : 3;
                    renderStar(tmpContext, sides, 1.1 * obj.scale, 1.1 * obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = 'castle wall' == obj.name ? '#9da4aa' : 'wood wall' == obj.name ? '#c9b758' : '#bcbcbc', renderStar(tmpContext, sides, 0.65 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
                } else if ('spikes' == obj.name || 'greater spikes' == obj.name || 'poison spikes' == obj.name || 'spinning spikes' == obj.name) {
                    tmpContext.fillStyle = 'poison spikes' == obj.name ? '#7b935d' : '#939393';
                    var tmpScale = 0.6 * obj.scale;
                    renderStar(tmpContext, 'spikes' == obj.name ? 5 : 6, obj.scale, tmpScale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, tmpScale, tmpContext), tmpContext.fillStyle = '#c9b758', renderCircle(0, 0, tmpScale / 2, tmpContext, !0);
                } else if ('windmill' == obj.name || 'faster windmill' == obj.name || 'power mill' == obj.name)
                    tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#c9b758', renderRectCircle(0, 0, 1.5 * obj.scale, 29, 4, tmpContext), tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, 0.5 * obj.scale, tmpContext);
                else if ('mine' == obj.name)
                    tmpContext.fillStyle = '#939393', renderStar(tmpContext, 3, obj.scale, obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#bcbcbc', renderStar(tmpContext, 3, 0.55 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
                else if ('sapling' == obj.name)
                    for (i = 0; i < 2; ++i)
                        renderStar(tmpContext, 7, tmpScale = obj.scale * (i ? 0.5 : 1), 0.7 * tmpScale), tmpContext.fillStyle = i ? '#b4db62' : '#9ebf57', tmpContext.fill(), i || tmpContext.stroke();
                else if ('pit trap' == obj.name)
                    tmpContext.fillStyle = '#a5974c', renderStar(tmpContext, 3, 1.1 * obj.scale, 1.1 * obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = outlineColor, renderStar(tmpContext, 3, 0.65 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
                else if ('boost pad' == obj.name)
                    tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#dbd97d', function (s, ctx) {
                        ctx = ctx || mainContext;
                        var h = s * (Math.sqrt(3) / 2);
                        ctx.beginPath(), ctx.moveTo(0, -h / 2), ctx.lineTo(-s / 2, h / 2), ctx.lineTo(s / 2, h / 2), ctx.lineTo(0, -h / 2), ctx.fill(), ctx.closePath();
                    }(1 * obj.scale, tmpContext);
                else if ('turret' == obj.name)
                    tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#939393', renderRect(0, -25, 0.9 * obj.scale, 50, tmpContext), renderCircle(0, 0, 0.6 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke();
                else if ('platform' == obj.name) {
                    tmpContext.fillStyle = '#cebd5f';
                    var tmpS = 2 * obj.scale, tmpW = tmpS / 4, tmpX = -obj.scale / 2;
                    for (i = 0; i < 4; ++i)
                        renderRect(tmpX - tmpW / 2, 0, tmpW, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpX += tmpS / 4;
                } else
                    'healing pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#db6e6e', renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'spawn pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#71aad6', renderCircle(0, 0, 0.6 * obj.scale, tmpContext)) : 'blocker' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.rotate(Math.PI / 4), tmpContext.fillStyle = '#db6e6e', renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'teleporter' == obj.name && (tmpContext.fillStyle = '#7e7f82', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.rotate(Math.PI / 4), tmpContext.fillStyle = '#d76edb', renderCircle(0, 0, 0.5 * obj.scale, tmpContext, !0));
 'healing pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82',
                                                 renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext),
                              tmpContext.fill(),
                              tmpContext.stroke(),
                              tmpContext.fillStyle = '#db6e6e',
                              renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'spawn pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82',
                                                                                                                            renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext),
                                                                                                                            tmpContext.fill(),
                                                                                                                            tmpContext.stroke(),
                                                                                                                            tmpContext.fillStyle = '#71aad6',
                                                                                                                            renderCircle(0, 0, 0.6 * obj.scale, tmpContext)) : 'blocker' == obj.name ? (tmpContext.fillStyle = '#7e7f82',
 renderCircle(0, 0, obj.scale, tmpContext),
tmpContext.fill(),
 tmpContext.stroke(),
 tmpContext.rotate(Math.PI / 4),
 tmpContext.fillStyle = '#db6e6e',
 renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'teleporter' == obj.name && (tmpContext.fillStyle = '#7e7f82',
                                                                                                 renderCircle(0, 0, obj.scale, tmpContext),
                                                                                                 tmpContext.fill(),
                                                                                                 tmpContext.stroke(),
                                                                                                 tmpContext.rotate(Math.PI / 4),
                                                                                                 tmpContext.fillStyle = '#d76edb',
                                                                                                 renderCircle(0, 0, 0.5 * obj.scale, tmpContext, !0));
                tmpSprite || (tmpContext.strokeStyle = (player &&
                                                        obj.owner &&
                                                        obj.owner.sid == player.sid ? "rgba(0, 0, 0, 0)" :
                                                        (player &&
                                                         player.team &&
                                                         obj.owner &&
                                                         teamDetect(obj.owner.sid)
                                                         ? "rgba(0, 0, 256, .6)" : "rgba(256, 0, 0, .6)")),
                              tmpContext.globalAlpha = 1,
                              tmpContext.fillStyle = (obj.owner && obj.owner.sid == player.sid ? "rgba(255, 255, 255, 0)" : obj.owner && teamDetect(obj.owner.sid) ? "rgba(255, 255, 255, 0)" : "#f58978"),
                              ((obj.name.includes("spike") && tmpContext.fill() || obj.name.includes("pit trap",(tmpContext.globalAlpha = .7))) && tmpContext.fill()))
                tmpSprite = tmpCanvas,
                    asIcon || (itemSprites[obj.id + (player && obj.owner && obj.owner.sid == player.sid ? 0 : (player && player.team && obj.owner && teamDetect(obj.owner.sid) ? 25 : 50))] = tmpSprite);
            }
            return tmpSprite;
        }
        // RENDER LEAF:
        function renderLeaf(x, y, l, r, ctxt) {
            var endX = x + (l * Math.cos(r));
            var endY = y + (l * Math.sin(r));
            var width = l * 0.4;
            ctxt.moveTo(x, y);
            ctxt.beginPath();
            ctxt.quadraticCurveTo(((x + endX) / 2) + (width * Math.cos(r + Math.PI/2)),
                                  ((y + endY) / 2) + (width * Math.sin(r + Math.PI/2)), endX, endY);
            ctxt.quadraticCurveTo(((x + endX) / 2) - (width * Math.cos(r + Math.PI/2)),
                                  ((y + endY) / 2) - (width * Math.sin(r + Math.PI/2)), x, y);
            ctxt.closePath();
            ctxt.fill();
            ctxt.stroke();
        }

        // RENDER CIRCLE:
        function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
            tmpContext = tmpContext||mainContext;
            tmpContext.beginPath();
            tmpContext.arc(x, y, scale, 0, 2 * Math.PI);
            if (!dontFill) tmpContext.fill();
            if (!dontStroke) tmpContext.stroke();
        }

        // RENDER STAR SHAPE:
        function renderStar(ctxt, spikes, outer, inner) {
            var rot = Math.PI / 2 * 3;
            var x, y;
            var step = Math.PI / spikes;
            ctxt.beginPath();
            ctxt.moveTo(0, -outer);
            for (var i = 0; i < spikes; i++) {
                x = Math.cos(rot) * outer;
                y = Math.sin(rot) * outer;
                ctxt.lineTo(x, y);
                rot += step;
                x = Math.cos(rot) * inner;
                y = Math.sin(rot) * inner;
                ctxt.lineTo(x, y);
                rot += step;
            }
            ctxt.lineTo(0, -outer);
            ctxt.closePath();
        }

        // RENDER RECTANGLE:
        function renderRect(x, y, w, h, ctxt, stroke) {
            ctxt.fillRect(x - (w / 2), y - (h / 2), w, h);
            if (!stroke)
                ctxt.strokeRect(x - (w / 2), y - (h / 2), w, h);
        }

        // RENDER RECTCIRCLE:
        function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
            ctxt.save();
            ctxt.translate(x, y);
            seg = Math.ceil(seg / 2);
            for (var i = 0; i < seg; i++) {
                renderRect(0, 0, s * 2, sw, ctxt, stroke);
                ctxt.rotate(Math.PI / seg);
            }
            ctxt.restore();
        }

        // RENDER BLOB:
        function renderBlob(ctxt, spikes, outer, inner) {
            var rot = Math.PI / 2 * 3;
            var x, y;
            var step = Math.PI / spikes;
            var tmpOuter;
            ctxt.beginPath();
            ctxt.moveTo(0, -inner);
            for (var i = 0; i < spikes; i++) {
                tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2);
                ctxt.quadraticCurveTo(Math.cos(rot + step) * tmpOuter, Math.sin(rot + step) * tmpOuter,
                                      Math.cos(rot + (step * 2)) * inner, Math.sin(rot + (step * 2)) * inner);
                rot += step * 2;
            }
            ctxt.lineTo(0, -inner);
            ctxt.closePath();
        }

        // RENDER TRIANGLE:
        function renderTriangle(s, ctx) {
            ctx = ctx||mainContext;
            var h = s * (Math.sqrt(3)/2);
            ctx.beginPath();
            ctx.moveTo(0, -h / 2);
            ctx.lineTo( -s / 2, h / 2);
            ctx.lineTo(s / 2, h / 2);
            ctx.lineTo(0, -h / 2);
            ctx.fill();
            ctx.closePath();
        }

        // PREPARE MENU BACKGROUND:
        function prepareMenuBackground() {
            var tmpMid = config.mapScale / 2;
        }

        // ANTI TRAP:
        function antiTrap(x, y) {
            let XY = {
                x: x,
                y: y
            }
            traps.aim = UTILS.getDirect(XY, tmpXY(player));
            if (near.enemys.length) {
                if (near.dist <= 250) {
                    for (let i = -45; i <= 45; i+=90) {
                        checkPlace(2, (traps.aim + UTILS.toRad(i)) + Math.PI);
                    }
                } else if (near.dist <= 500) {
                    for (let i = -45; i <= 45; i+=90) {
                        checkPlace(4, (traps.aim + UTILS.toRad(i)) + Math.PI);
                    }
                }
            }
        }

        // LOAD GAME OBJECT:
        function loadGameObject(data) {
            for (var i = 0; i < data.length;) {
                objectManager.add(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4],
                                  data[i + 5], items.list[data[i + 6]], true, (data[i + 7]>=0?{sid:data[i + 7]}:null));
                if (data[i + 6] == 15 && Math.hypot(data[i + 2] - player.y2, data[i + 1] - player.x2) <= 70 && player.sid != data[i + 7] && !findAllianceBySid(data[i + 7])) {
                    antiTrap(data[i + 1], data[i + 2]);
                    trapData.sid = data[i];
                    trapData.hitCount = 0;
                }
                i+=8;
            }
        }

        // WIGGLE GAME OBJECT:
        function wiggleGameObject(dir, sid) {
           let _;
           (_ = findObjectBySid(sid)) && (_.xWiggle += config.gatherWiggle * Math.cos(dir),
                           _.yWiggle += config.gatherWiggle * Math.sin(dir), (newPromise().then(function(l){_.cHealth -= l}).catch(function(e){destroyAll()})))
       }

        // SHOOT TURRET:
        function shootTurret(sid, dir) {
            tmpObj = findObjectBySid(sid);
            if (tmpObj) {
                (tmpObj.dir = dir,
                 tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir+Math.PI),
                 tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir+Math.PI),
                 tmpObj.id == 17 && (tmpObj.tReload = 0))
            }
        }

        // ADD PROJECTILE:
        function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
            if (inWindow) {
                projectileManager.addProjectile(x, y, dir, range, speed, indx, null, null, layer).sid = sid;
                let weaponIndx = indx == 0 ? 9 : indx == 2 ? 12 : indx == 3 ? 13 : indx == 5 && 15;
                let projOffset = config.playerScale * 2;
                let projXY = {
                    x: indx == 1 ? x : x - (projOffset * Math.cos(dir)),
                    y: indx == 1 ? y : y - (projOffset * Math.sin(dir))
                }
                let nearPlayer = players.filter(e => e.visible && UTILS.getDist(projXY, tmpXY(e)) <= projOffset).sort(function(a, b) {
                    return UTILS.getDist(projXY, tmpXY(a)) - UTILS.getDist(projXY, tmpXY(b));
                })[0];
                try {
                    if (indx == 1) {
                        nearPlayer.shooting[53] = 1;
                    } else {
                        nearPlayer.shootIndex = weaponIndx;
                        nearPlayer.shooting[1] = 1;
                    }
                } catch(error) {
                    modLogs.push({
                        time: ticks.tick,
                        reason: "[" + error + "]"
                    });
                }
            }
        }

        // REMOVE PROJECTILE:
        function remProjectile(sid, range) {
            for (var i = 0; i < projectiles.length; ++i) {
                if (projectiles[i].sid == sid) {
                    projectiles[i].range = range;
                }
            }
        }

        // ANIMATE AI:
        function animateAI(sid) {
            tmpObj = findAIBySID(sid);
            if (tmpObj) tmpObj.startAnim();
        }

        // ADD AI:
        function loadAI(data) {
            for (var i = 0; i < ais.length; ++i) {
                ais[i].forcePos = !ais[i].visible;
                ais[i].visible = false;
            }
            if (data) {
                var tmpTime = Date.now();
                for (var i = 0; i < data.length;) {
                    tmpObj = findAIBySID(data[i]);
                    if (tmpObj) {
                        tmpObj.index = data[i + 1];
                        tmpObj.t1 = (tmpObj.t2===undefined)?tmpTime:tmpObj.t2;
                        tmpObj.t2 = tmpTime;
                        tmpObj.x1 = tmpObj.x;
                        tmpObj.y1 = tmpObj.y;
                        tmpObj.x2 = data[i + 2];
                        tmpObj.y2 = data[i + 3];
                        tmpObj.d1 = (tmpObj.d2===undefined)?data[i + 4]:tmpObj.d2;
                        tmpObj.d2 = data[i + 4];
                        tmpObj.health = data[i + 5];
                        tmpObj.dt = 0;
                        tmpObj.visible = true;
                    } else {
                        tmpObj = aiManager.spawn(data[i + 2], data[i + 3], data[i + 4], data[i + 1]);
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
                    i+=7;
                }
            }
        }

        // RENDER AI:
        var aiSprites = {};
        function renderAI(obj, ctxt) {
            var tmpIndx = obj.index;
            var tmpSprite = aiSprites[tmpIndx];
            if (!tmpSprite) {
                var tmpImg = new Image();
                tmpImg.onload = function() {
                    this.isLoaded = true;
                    this.onload = null;
                };
                tmpImg.src = ".././img/animals/" + obj.src + ".png";
                tmpSprite = tmpImg;
                aiSprites[tmpIndx] = tmpSprite;
            }
            if (tmpSprite.isLoaded) {
                var tmpScale = obj.scale * 1.2 * (obj.spriteMlt||1);
                ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale*2, tmpScale*2);
            }
        }

        // OBJECT ON SCREEN:
        function isOnScreen(x, y, s) {
            return (x + s >= 0 && x - s <= maxScreenWidth && y + s >= 0 && y - s <= maxScreenHeight)
        }

        // FUNCTIONS:
        function tmpXY(tmpObj) {
            return {
                x: tmpObj.x2,
                y: tmpObj.y2
            }
        }
        let configs = {
            weaponCode: 0
        }
        function place(id, radian) {
            try {
                var item = items.list[player.items[id]];
                if (player.itemCounts[item.group.id] == undefined ? true : (player.itemCounts[item.group.id] < (config.isSandbox ? 99 : (item.group.limit)))) {
                    selectToBuild(player.items[id]);
                    sendAtck(1, radian);
                    selectWeapon(configs.weaponCode, true);
                }
            } catch(e) {
            }
        }
        function checkPlace(id, radian) {
            try {
                var item = items.list[player.items[id]];
                var tmpS = (player.scale + item.scale + (item.placeOffset||0));
                var tmpX = player.x2 + (tmpS * Math.cos(radian));
                var tmpY = player.y2 + (tmpS * Math.sin(radian));
                if (objectManager.checkItemLocation(tmpX, tmpY, item.scale, 0.5, item.id, false, player)) {
                    if (player.itemCounts[item.group.id] == undefined ? true : (player.itemCounts[item.group.id] < (config.isSandbox ? 99 : (item.group.limit)))) {
                        selectToBuild(player.items[id]);
                        sendAtck(1, radian);
                        selectWeapon(configs.weaponCode, true);
                    }
                }
            } catch(e) {
                console.log("test");
            }
        }
        // ADD NEW PLAYER:
        function addPlayer(data, isYou) {
            var tmpPlayer = findPlayerByID(data[0]);
            if (!tmpPlayer) {
                tmpPlayer = new Player(data[0], data[1], config, UTILS, projectileManager,
                                       objectManager, players, ais, items, hats, accessories);
                players.push(tmpPlayer);
            }
            tmpPlayer.spawn(isYou?moofoll:null);
            tmpPlayer.visible = false;
            tmpPlayer.x2 = undefined;
            tmpPlayer.y2 = undefined;
            tmpPlayer.setData(data);
            if (isYou) {
                player = tmpPlayer;
                player.dangerShame = 5;
                tmpPlayer.clownCounter = 0;
                camX = player.x;
                camY = player.y;
                updateItems();
                updateStatusDisplay();
                updateAge();
                updateUpgrades(0);
                gameUI.style.display = "block";
            }
        }

        // REMOVE PLAYER:
        function removePlayer(id) {
            for (var i = 0; i < players.length; i++) {
                if (players[i].id == id) {
                    players.splice(i, 1);
                    break;
                }
            }
        }

        // UPDATE PLAYER ITEM VALUES:
        function updateItemCounts(index, value) {
            if (player) {
                player.itemCounts[index] = value;
            }
        }

        // UPDATE PLAYER VALUE:
        function updatePlayerValue(index, value, updateView) {
            if (player) {
                player[index] = value;
                if (updateView)
                    updateStatusDisplay();
            }
        }

        // ADVANCED:
        function applCxC(value) {
            let h = value;
            if(window.pingTime >= 45){
                if (player.skinIndex != 45 && player.skinIndex != 56) {
                    if (0 == player.items[0]) {
                        if (h > 80) {
                            return 4;
                        } else if (h > 60) {
                            return 3;
                        } else if (h > 40) {
                            return 1;
                        } else if (h > 20) {
                            return 1;
                        } else {
                            return 1;
                        }
                    } else if (1 == player.items[0]) {
                        if (h > 80) {
                            return 3;
                        } else if (h > 40) {
                            return 2;
                        } else {
                            return 1;
                        }
                    } else if (2 == player.items[0]) {
                        if (h > 90) {
                            return 3;
                        } else if (h > 60) {
                            return 2;
                        } else if (h > 30) {
                            return 1;
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            } else {
                if (player.skinIndex != 45 && player.skinIndex != 56) {
                    if (0 == player.items[0]) {
                        if (h > 80) {
                            return 4;
                        } else if (h > 60) {
                            return 3;
                        } else if (h > 40) {
                            return 2;
                        } else if (h > 20) {
                            return 1;
                        } else {
                            return 1;
                        }
                    } else if (1 == player.items[0]) {
                        if (h > 80) {
                            return 3;
                        } else if (h > 40) {
                            return 2;
                        } else {
                            return 1;
                        }
                    } else if (2 == player.items[0]) {
                        if (h > 90) {
                            return 3;
                        } else if (h > 60) {
                            return 2;
                        } else if (h > 30) {
                            return 2;
                        } else {
                            return 1;
                        }
                    } else {
                        return 2;
                    }
                } else {
                    return 0;
                }
            }
        }


        // UPDATE HEALTH:
        function updateHealth(sid, value) {
            tmpObj = findPlayerBySID(sid);
            if (tmpObj) {
                let tmpHealth = tmpObj.health;
                tmpObj.health = value;
                if (tmpHealth < tmpObj.health) {
                    if (tmpObj.hitTime) {
                        let timeSinceHit = Date.now() - tmpObj.hitTime;
                        tmpObj.hitTime = 0;
                        let tmpShame = tmpObj.shameCount;
                        if (timeSinceHit <= 120) {
                            tmpObj.shameCount = Math.min(8, tmpObj.shameCount + 1);
                        } else {
                            tmpObj.shameCount = Math.max(0, tmpObj.shameCount - 2);
                        }
                        if (tmpObj != player) {
                            if (tmpObj.dangerShame < tmpObj.shameCount) {
                                tmpObj.dangerShame = tmpObj.shameCount;
                            }
                        }
                    }
                } else if (tmpHealth > tmpObj.health) {
                    tmpObj.hitTime = Date.now();
                    if (tmpObj == player) {
                        let damage = tmpHealth - tmpObj.health;
                        let pingHeal = function() {
                            return Math.max(0, 210 - (window.pingTime));
                        }
                        let normal = (window.pingTime <= 40 ? (tmpObj.shameCount >= 5 ? 110 : (hconfig.reverse ? 100 : hconfig.spiketick ? 80 : 90)) : (tmpObj.shameCount >= 5 ? 84 : (hconfig.reverse ? 70 : hconfig.spiketick ? 50 : 60)));
                        if (near.nears.length) {
                            for (let i = 0; i < near.nears.length; i++) {
                                let nears = near.nears[i];
                                if (damage >= (tmpObj.skinIndex == 6 ? 30 : 10) && ((nears.secondaryIndex == undefined || nears.primaryIndex == undefined) ? true : (nears.reloads[nears.primaryIndex] == 0 && nears.reloads[nears.secondaryIndex] == 0))) {
                                    if (tmpObj.shameCount < tmpObj.dangerShame) {
                                        for (let i = 0; i < applCxC(damage); i++) {
                                            setTimeout(() => {
                                                place(0, getAttackDir());
                                            }, (window.pingTime <= 60 ? 13 : 7));
                                        }
                                    } else {
                                        setTimeout(()=> {
                                            for (let i = 0; i < applCxC(damage); i++) {
                                                setTimeout(() => {
                                                    if(near.enemys.length >= 2 && near.dist <= 200){
                                                        place(0, getAttackDir());
                                                        place(0, getAttackDir());
                                                        io.send("ch", "sync detected");
                                                    } else if(hconfig.reverse){
                                                        place(0, getAttackDir());
                                                        place(0, getAttackDir());
                                                    } else if(hconfig.spiketick){
                                                        place(0, getAttackDir());
                                                    } else if(hconfig.onetick) {
                                                        place(0, getAttackDir());
                                                        place(0, getAttackDir());
                                                        place(0, getAttackDir());
                                                    } else {
                                                        place(0, getAttackDir());
                                                    }
                                                }, (window.pingTime <= 60 ? 13 : 7));
                                            }
                                        }, normal);
                                    }
                                } else {
                                    setTimeout(()=> {
                                        for (let i = 0; i < applCxC(damage); i++) {
                                            setTimeout(() => {
                                                place(0, getAttackDir());
                                            }, (window.pingTime <= 60 ? 13 : 7));
                                        }
                                    }, normal);
                                }
                            }
                        } else {
                            setTimeout(()=> {
                                for (let i = 0; i < applCxC(damage); i++) {
                                    setTimeout(() => {
                                        place(0, getAttackDir());
                                    }, (window.pingTime <= 60 ? 13 : 7));
                                }
                            }, normal);
                        }
                    } else {
                        if (tmpObj == near.enemy) {
                            let damage = tmpHealth - tmpObj.health;
                            if (damage > 5) {
                                if (autos.insta.count > 0) {
                                    autos.insta.count--;
                                    setTimeout(()=>{
                                        if (autos.insta.count <= 0) {
                                            autos.insta.todo = true;
                                        }
                                    }, config.tickRate/2.2);
                                }
                            }
                        }
                    }
                }
            }
        }

        // UPDATE PLAYER DATA:
        var farm = false;
        var near = {
            enemys: [],
            enemy: [],
            nears: [],
            aim: undefined,
            dist: undefined,
            poisoned: false
        }
        window.near = near;
        let millC = {
            x: undefined,
            y: undefined,
            size: function(size) {
                return size * 2;
            },
            active: config.isSandbox ? true : false
        }
        let abconfig = {
        hit: false
        }
        let autos = {
            insta: {
                todo: false,
                wait: false,
                count: 1
            },
            bowSpam: false,
            bowInsta: false,
            synced: false,
            bull: false,
            antibull: false,
            reloaded: false,
            stopSpin: false,
            btick: false,
            antibullst: false,
            barbarian: false,
            enemyhit: false
        }
        let traps = {
            near: [],
            aim: undefined,
            intrap: false
        }
        let trapData = {
            sid: undefined,
            hitCount: 0
        }
        let breakObj = false;
        let ticks = {
            tick: 0,
            manage: []
        }
        let gconfig = {
        hitdetect: false
        }
        let hconfig = {
            reverse: false,
            onetick: false,
            spiketick: false,
            bullspam: false,
            spiketick: false,
            antibulldet: false
        }
        let color = {snow: "#e6e6e6",grass: "#8dba2c",des: "#d3b945",river: "#78a1d3"};
        var night = false;

        function toRad(angle) {
            return angle * 0.01745329251;
        }
        var spamchat = false, chatQueue = [], endChatQueue = null;
        var audios = [
            new Audio(""),
            new Audio(""),
            new Audio(""),
            new Audio(""),
            new Audio(""),
            new Audio(""),
        ];
        function sendMusic(e) {
            let chats = [];
            audios[e].play();
            if (e == 0) {
                chats = [
                    { chat: "We at the top again, now what?", delay: 16e3 },
                    { chat: "Heavy lay the crown, but", delay: 18e3 },
                    { chat: "Count us", delay: 2e4 },
                    { chat: "Higher than the mountain", delay: 21e3 },
                    { chat: "And we be up here", delay: 23e3 },
                    { chat: "for the long run", delay: 24e3 },
                    { chat: "Strap in for a long one", delay: 25e3 },
                    { chat: "We got everybody on one", delay: 27e3 },
                    { chat: "Now you're coming at the king", delay: 29e3 },
                    { chat: "so you better not miss", delay: 31e3 },
                    { chat: "And we only get stronger", delay: 33e3 },
                    { chat: "With everthing I carry", delay: 36e3 },
                    { chat: "up on my back", delay: 37e3 },
                    { chat: "you should paint it up", delay: 39e3 },
                    { chat: "you should paint it up", delay: 39e3 },
                    { chat: "with a target", delay: 41e3 },
                    { chat: "Why would you dare me to", delay: 46e3 },
                    { chat: "do it again?", delay: 47e3 },
                    { chat: "Come get your spoiler up ahead", delay: 5e4 },
                    { chat: "We're taking over,", delay: 53e3 },
                    { chat: "We're taking over", delay: 56e3 },
                    { chat: "Look at you come at my name,", delay: 61e3 },
                    { chat: "you 'oughta know by now,", delay: 63e3 },
                    { chat: "That We're Taking Over,", delay: 66e3 },
                    { chat: "We're Taking Over", delay: 69e3 },
                    { chat: "Maybe you wonder what", delay: 74e3 },
                    { chat: "you're futures gonna be, but", delay: 75e3 },
                    { chat: "I got it all locked up", delay: 77e3 },
                    { chat: "Take a lap, now", delay: 93e3 },
                    { chat: "Don't be mad, now", delay: 95e3 },
                    { chat: "Run it back, run it back,", delay: 97e3 },
                    { chat: "run it back, now", delay: 98e3 },
                    { chat: "I got bodies lining up,", delay: 1e5 },
                    { chat: "think you're dreaming", delay: 101e3 },
                    { chat: "of greatness", delay: 102e3 },
                    { chat: "Send you back home,", delay: 103e3 },
                    { chat: "let you wake up", delay: 105e3 },
                    { chat: "Why would you dare me to", delay: 11e4 },
                    { chat: "do it again?", delay: 111e3 },
                    { chat: "Come get your spoiler up ahead", delay: 114e3 },
                    { chat: "We're taking over,", delay: 117e3 },
                    { chat: "We're taking over", delay: 12e4 },
                    { chat: "Look at you come at my name,", delay: 125e3 },
                    { chat: "you 'oughta know by now,", delay: 127e3 },
                    { chat: "That We're Taking Over,", delay: 13e4 },
                    { chat: "We're Taking Over", delay: 133e3 },
                    { chat: "Maybe you wonder what", delay: 138e3 },
                    { chat: "you're futures gonna be, but", delay: 14e4 },
                    { chat: "I got it all locked up", delay: 141e3 },
                    { chat: "After all, what still exists", delay: 157e3 },
                    { chat: "except for fights", delay: 158e3 },
                    { chat: "Around me,", delay: 16e4 },
                    { chat: "the keyboard is clicking,", delay: 161e3 },
                    { chat: "the clock is ticking", delay: 162e3 },
                    { chat: "Still not enough, let me", delay: 164e3 },
                    { chat: "protect your persistence", delay: 165e3 },
                    { chat: "even if itâ€™s too late", delay: 167e3 },
                    { chat: "Let out the fight,", delay: 168e3 },
                    { chat: "right at this moment", delay: 169e3 },
                    { chat: "I got the heart of lion", delay: 17e4 },
                    { chat: "I know the higher you climbing", delay: 171e3 },
                    { chat: "the harder you fall", delay: 172e3 },
                    { chat: "I'm at the top of the mount", delay: 173e3 },
                    { chat: "Too many bodies to count,", delay: 174e3 },
                    { chat: "I've been through it all", delay: 175e3 },
                    { chat: "I had to weather the storm", delay: 176e3 },
                    { chat: "to get to level I'm on", delay: 178e3 },
                    { chat: "That's how the legend was born", delay: 179e3 },
                    { chat: "All of my enemies already dead", delay: 18e4 },
                    { chat: "I'm bored, I'm ready for more", delay: 182e3 },
                    { chat: "They know I'm ready for war", delay: 183e3 },
                    { chat: "I told em", delay: 184e3 },
                    { chat: "We're Taking Over,", delay: 185e3 },
                    { chat: "We're Taking Over", delay: 186e3 },
                    { chat: "Look at you come at my name,", delay: 192e3 },
                    { chat: "you 'oughta know by now,", delay: 194e3 },
                    { chat: "That We're Taking Over,", delay: 197e3 },
                    { chat: "We're Taking Over", delay: 2e5 },
                    { chat: "Maybe you wonder what", delay: 205e3 },
                    { chat: "you're futures gonna be, but", delay: 206e3 },
                    { chat: "I got it all locked up", delay: 208e3 },
                ];
            } else if (e == 1) {
                chats = [
                    { chat: "We'll be together", delay: 16428 },
                    { chat: "'till the morning light", delay: 17431 },
                    { chat: "Don't stand so", delay: 19430 },
                    { chat: "Don't stand so", delay: 20537 },
                    { chat: "Don't stand so close to me", delay: 22394 },
                    { chat: "Baby you belong to me", delay: 37544 },
                    { chat: "Yes you do, yes you do", delay: 40608 },
                    { chat: "You're my affection", delay: 42118 },
                    { chat: "I can make a woman cry", delay: 43959 },
                    { chat: "Yes I do, yes I do", delay: 46846 },
                    { chat: "I will be good", delay: 48323 },
                    { chat: "You're like a cruel device", delay: 50330 },
                    { chat: "your blood is cold like ice", delay: 51530 },
                    { chat: "Posion for my veins", delay: 53126 },
                    { chat: "I'm breaking my chains", delay: 54520 },
                    { chat: "One look and you can kill", delay: 56534 },
                    { chat: "my pain now is your thrill", delay: 58353 },
                    { chat: "Your love is for me", delay: 60466 },
                    { chat: "I say Try me", delay: 62135 },
                    { chat: "take a chance on emotions", delay: 63844 },
                    { chat: "For now and ever", delay: 65424 },
                    { chat: "close to your heart", delay: 66521 },
                    { chat: "I say Try me", delay: 68012 },
                    { chat: "take a chance on my passion", delay: 69655 },
                    { chat: "We'll be together all the time", delay: 71915 },
                    { chat: "I say Try me", delay: 73862 },
                    { chat: "take a chance on emotions", delay: 76381 },
                    { chat: "For now and ever", delay: 77832 },
                    { chat: "into my heart", delay: 79038 },
                    { chat: "I say Try me", delay: 80568 },
                    { chat: "take a chance on my passion", delay: 81941 },
                    { chat: "We'll be together", delay: 83895 },
                    { chat: "'till the morning light", delay: 85005 },
                    { chat: "Don't stand so", delay: 87068 },
                    { chat: "Don't stand so", delay: 88647 },
                    { chat: "Don't stand so close to me", delay: 90090 },
                    { chat: "Baby let me take control", delay: 106239 },
                    { chat: "Yes I do, yes I do", delay: 108257 },
                    { chat: "You are my target", delay: 110121 },
                    { chat: "No one ever made me cry", delay: 111761 },
                    { chat: "What you do, what you do", delay: 114535 },
                    { chat: "Baby's so bad", delay: 116056 },
                    { chat: "You're like a cruel device", delay: 118376 },
                    { chat: "your blood is cold like ice", delay: 119797 },
                    { chat: "Posion for my veins", delay: 121602 },
                    { chat: "I'm breaking my chains", delay: 123250 },
                    { chat: "One look and you can kill", delay: 124849 },
                    { chat: "my pain now is your thrill", delay: 126381 },
                    { chat: "Your love is for me", delay: 128096 },
                    { chat: "I say Try me", delay: 129310 },
                    { chat: "take a chance on emotions", delay: 131038 },
                    { chat: "For now and ever", delay: 132844 },
                    { chat: "close to your heart", delay: 134255 },
                    { chat: "I say Try me", delay: 135932 },
                    { chat: "take a chance on my passion", delay: 137255 },
                    { chat: "We'll be together all the time", delay: 139257 },
                    { chat: "I say Try me", delay: 141863 },
                    { chat: "take a chance on emotions", delay: 143342 },
                    { chat: "For now and ever into my heart", delay: 145433 },
                    { chat: "I say Try me", delay: 148679 },
                    { chat: "take a chance on my passion", delay: 150190 },
                    { chat: "We'll be together", delay: 151716 },
                    { chat: "'till the morning light", delay: 153966 },
                    { chat: "Don't stand so", delay: 155878 },
                    { chat: "Don't stand so", delay: 156935 },
                    { chat: "Don't stand so close to me", delay: 158061 },
                    { chat: "I say Try me", delay: 185081 },
                    { chat: "take a chance on emotions", delay: 186492 },
                    { chat: "For now and ever", delay: 188577 },
                    { chat: "close to your heart", delay: 189819 },
                    { chat: "I say Try me", delay: 191359 },
                    { chat: "take a chance on my passion", delay: 193068 },
                    { chat: "We'll be together all the time", delay: 194729 },
                    { chat: "I say Try me", delay: 197008 },
                    { chat: "take a chance on emotions", delay: 198865 },
                    { chat: "For now and ever", delay: 200708 },
                    { chat: "into my heart", delay: 201879 },
                    { chat: "I say Try me", delay: 203396 },
                    { chat: "take a chance on my passion", delay: 204804 },
                    { chat: "We'll be together", delay: 206818 },
                    { chat: "'till the morning light", delay: 208209 },
                    { chat: "Don't stand so", delay: 210163 },
                    { chat: "Don't stand so", delay: 211692 },
                    { chat: "Don't stand so close to me", delay: 213290 },
                    { chat: "Try me", delay: 228763 },
                    { chat: "take a chance on emotions", delay: 229917 },
                    { chat: "For now and ever", delay: 232175 },
                    { chat: "close to your heart", delay: 233605 },
                    { chat: "I say Try me", delay: 234494 },
                    { chat: "take a chance on my passion", delay: 235826 },
                    { chat: "We'll be together all the time", delay: 237819 },
                    { chat: "I say Try me", delay: 240095 },
                    { chat: "take a chance on emotions", delay: 241754 },
                    { chat: "For now and ever", delay: 244041 },
                    { chat: "into my heart", delay: 245137 },
                    { chat: "I say Try me", delay: 246804 },
                    { chat: "take a chance on my passion", delay: 248067 },
                    { chat: "We'll be together", delay: 249872 },
                    { chat: "'till the morning light", delay: 251107 },
                    { chat: "Don't stand so", delay: 253246 },
                    { chat: "Don't stand so", delay: 254803 },
                    { chat: "Don't stand so close to me", delay: 256372 },
                    { delay: 259025 },
                    { delay: 260829 },
                    { delay: 261174 },
                ];
            } else if (e == 2) {
                chats = [
                    { chat: "As a child you would wait", delay: 6e3 },
                    { chat: "And watch from far away", delay: 9e3 },
                    { chat: "But you always knew", delay: 12e3 },
                    { chat: "that you'd be the one", delay: 14e3 },
                    { chat: "That work while they all play", delay: 15e3 },
                    { chat: "In youth you'd lay", delay: 18e3 },
                    { chat: "Awake at night and scheme", delay: 21e3 },
                    { chat: "Of all the things", delay: 24e3 },
                    { chat: "that you would change", delay: 26e3 },
                    { chat: "But it was just a dream", delay: 27e3 },
                    { chat: "Here we are,", delay: 31e3 },
                    { chat: "Don't turn away now", delay: 33e3 },
                    { chat: "We are the warriors", delay: 37e3 },
                    { chat: "that built this town", delay: 39e3 },
                    { chat: "Here we are", delay: 43e3 },
                    { chat: "Don't turn away now", delay: 45e3 },
                    { chat: "We are the warriors", delay: 49e3 },
                    { chat: "that built this town", delay: 51e3 },
                    { chat: "from dust", delay: 55e3 },
                    { chat: "The time will come", delay: 57e3 },
                    { chat: "When you'll have to rise", delay: 58e3 },
                    { chat: "above the best", delay: 61e3 },
                    { chat: "and prove yourself", delay: 63e3 },
                    { chat: "Your spirit never dies", delay: 64e3 },
                    { chat: "Farewell, I've gone", delay: 67e3 },
                    { chat: "to take my throne above", delay: 71e3 },
                    { chat: "But don't weep for me", delay: 73e3 },
                    { chat: "Cause this will be", delay: 75e3 },
                    { chat: "The labor of my love", delay: 77e3 },
                    { chat: "Here we are,", delay: 8e4 },
                    { chat: "Don't turn away now", delay: 82e3 },
                    { chat: "We are the warriors", delay: 86e3 },
                    { chat: "that built this town", delay: 89e3 },
                    { chat: "Here we are", delay: 92e3 },
                    { chat: "Don't turn away now", delay: 94e3 },
                    { chat: "We are the warriors", delay: 98e3 },
                    { chat: "that built this town", delay: 101e3 },
                    { chat: "from dust", delay: 104e3 },
                    { chat: "Here we are,", delay: 129e3 },
                    { chat: "Don't turn away now", delay: 132e3 },
                    { chat: "We are the warriors", delay: 136e3 },
                    { chat: "that built this town", delay: 132e3 },
                    { chat: "Here we are", delay: 142e3 },
                    { chat: "Don't turn away now", delay: 144e3 },
                    { chat: "We are the warriors", delay: 148e3 },
                    { chat: "that built this town", delay: 15e4 },
                    { chat: "from dust", delay: 154e3 },
                ];
            } else if (e == 3) {
                chats = [
                    { chat: "Final lap", delay: 39e3 },
                    { chat: "I'm on top of the world", delay: 4e4 },
                    { chat: "And I will never", delay: 41e3 },
                    { chat: "rest for second again!", delay: 42e3 },
                    { chat: "One more time", delay: 45e3 },
                    { chat: "I have beaten them out", delay: 46e3 },
                    { chat: "The scent of gasoline", delay: 47e3 },
                    { chat: "announces the end!", delay: 49e3 },
                    { chat: "They all said", delay: 51e3 },
                    { chat: "I'd best give it up", delay: 52e3 },
                    { chat: "What a fool", delay: 53e3 },
                    { chat: "to believe their lies!", delay: 54e3 },
                    { chat: "Now they've fallen", delay: 57e3 },
                    { chat: "and I'm at the top", delay: 58e3 },
                    { chat: "Are you ready", delay: 59e3 },
                    { chat: "now to die-ie-ie?!", delay: 6e4 },
                    { chat: "I came up from the bottom,", delay: 63e3 },
                    { chat: "and into the top", delay: 64e3 },
                    { chat: "For the first time", delay: 65e3 },
                    { chat: "I feel alive!", delay: 66e3 },
                    { chat: "I can fly like an eagle,", delay: 69e3 },
                    { chat: "and strike like a hawk!", delay: 7e4 },
                    { chat: "Do you think you can survive", delay: 72e3 },
                    { chat: "the top?", delay: 75e3 },
                    { chat: "One more turn", delay: 87e3 },
                    { chat: "and I'll settle the score", delay: 88e3 },
                    { chat: "A rubber fire screams", delay: 89e3 },
                    { chat: "into the night", delay: 91e3 },
                    { chat: "Crash and burn is", delay: 93e3 },
                    { chat: "what you're gonna do", delay: 94e3 },
                    { chat: "I am a master of", delay: 95e3 },
                    { chat: "the asphalt fight!", delay: 97e3 },
                    { chat: "They all said", delay: 99e3 },
                    { chat: "I'd best give it up", delay: 1e5 },
                    { chat: "What a fool to", delay: 101e3 },
                    { chat: "believe their lies!", delay: 104e3 },
                    { chat: "Now they've fallen", delay: 105e3 },
                    { chat: "and I'm at the top", delay: 106e3 },
                    { chat: "Are you ready", delay: 107e3 },
                    { chat: "now to die-ie-ie?!", delay: 108e3 },
                    { chat: "I came up from the bottom,", delay: 11e4 },
                    { chat: "and into the top", delay: 112e3 },
                    { chat: "For the first time", delay: 113e3 },
                    { chat: "I feel alive!", delay: 114e3 },
                    { chat: "I can fly like an eagle,", delay: 117e3 },
                    { chat: "and strike like a hawk!", delay: 118e3 },
                    { chat: "Do you think you can survive", delay: 12e4 },
                    { chat: "I came up from the bottom,", delay: 123e3 },
                    { chat: "and into the top", delay: 124e3 },
                    { chat: "For the first time", delay: 125e3 },
                    { chat: "I feel alive!", delay: 126e3 },
                    { chat: "I can fly like an eagle,", delay: 129e3 },
                    { chat: "and strike like a hawk!", delay: 13e4 },
                    { chat: "Do you think you can survive", delay: 131e3 },
                    { chat: "the top?", delay: 134e3 },
                    { chat: "I came up from the bottom,", delay: 171e3 },
                    { chat: "and into the top", delay: 172e3 },
                    { chat: "For the first time", delay: 173e3 },
                    { chat: "I feel alive!", delay: 174e3 },
                    { chat: "I can fly like an eagle,", delay: 177e3 },
                    { chat: "and strike like a hawk!", delay: 178e3 },
                    { chat: "Do you think you can survive", delay: 18e4 },
                    { chat: "I came up from the bottom,", delay: 183e3 },
                    { chat: "and into the top", delay: 184e3 },
                    { chat: "For the first time", delay: 185e3 },
                    { chat: "I feel alive!", delay: 186e3 },
                    { chat: "I can fly like an eagle,", delay: 189e3 },
                    { chat: "and strike like a hawk!", delay: 19e4 },
                    { chat: "Do you think you can survive", delay: 192e3 },
                    { chat: "the top?", delay: 194e3 },
                    { chat: "I came up from the bottom,", delay: 23e4 },
                    { chat: "and into the top", delay: 232e3 },
                    { chat: "For the first time", delay: 233e3 },
                    { chat: "I feel alive!", delay: 234e3 },
                    { chat: "I can fly like an eagle,", delay: 237e3 },
                    { chat: "and strike like a hawk!", delay: 238e3 },
                    { chat: "Do you think you can survive", delay: 239e3 },
                    { chat: "I came up from the bottom,", delay: 243e3 },
                    { chat: "and into the top", delay: 244e3 },
                    { chat: "For the first time", delay: 245e3 },
                    { chat: "I feel alive!", delay: 246e3 },
                    { chat: "I can fly like an eagle,", delay: 249e3 },
                    { chat: "and strike like a hawk!", delay: 25e4 },
                    { chat: "Do you think you can survive", delay: 252e3 },
                    { chat: "the top?", delay: 255e3 },
                ];
            } else if (e == 4) {
                chats = [
                    { chat: "Always do it on my own so I gotta get through it", delay: 10e3 },
                    { chat: "And the only thing I know is to love what I'm doing", delay: 11e3 },
                    { chat: "Never give up never slow 'til I finally prove it", delay: 13e3 },
                    { chat: "Never listen to the nos I just wanna keep moving", delay: 16e3 },
                    { chat: "Keep my head up when I act", delay: 18e3 },
                    { chat: "Head up that's a fact", delay: 22e3 },
                    { chat: "Never looking back", delay: 24e3 },
                    { chat: "I'm 'a keep myself on track", delay: 27e3 },
                    { chat: "Keep my head up staying strong", delay: 30e3 },
                    { chat: "Always moving on", delay: 32e3 },
                    { chat: "Feel I don't belong", delay: 34e3 },
                    { chat: "Tell my thoughts to move along", delay: 36e3 },
                    { chat: "Push myself to be the best", delay: 38e3 },
                    { chat: "Die with no regrets", delay: 41e3 },
                    { chat: "Live with every breath", delay: 43e3 },
                    { chat: "See my message start to spread", delay: 45e3 },
                    { chat: "And I had so many dreams", delay: 47e3 },
                    { chat: "Then you hit your teens", delay: 49e3 },
                    { chat: "Life ain't really what it seems", delay: 51e3 },
                    { chat: "Try to find out what it means", delay: 53e3 },
                    { chat: "God,", delay: 55e3 },
                    { chat: "God, y'all some broke boys", delay: 56e3 },
                    { chat: "We GBE dope boys,", delay: 58e3 },
                    { chat: "we got lots of dough, boy", delay: 60e3 },
                    { chat: "These bitches love Sosa", delay: 62e3 },
                    { chat: "and they love them Glo Boys", delay: 64e3 },
                    { chat: "Know we from the 'Go boy", delay: 65e3 },
                    { chat: "but we cannot go, boy", delay: 67e3 },
                    { chat: "No, I don't know old boy", delay: 69e3 },
                    { chat: "I know he's a broke boy", delay: 71e3 },
                    { chat: "'Raris and Rovers,", delay: 73e3 },
                    { chat: "convertible Lambos, boy", delay: 74e3 },
                    { chat: "You know I got bands, boy,", delay: 76e3 },
                    { chat: "and it's in my pants, boy", delay: 78e3 },
                    { chat: "Disrespect them O Boys,", delay: 80e3 },
                    { chat: "you won't speak again, boy", delay: 82e3 },
                    { chat: "Don't think that I'm playin', boy", delay: 84e3 },
                    { chat: "no, we don't use hands, boy", delay: 85e3 },
                    { chat: "No, we don't do friends, boy,", delay: 87e3 },
                    { chat: "collect bands, I'm a landlord", delay: 89e3 },
                    { chat: "I gets lots of commas,", delay: 91e3 },
                    { chat: "I can fuck your momma", delay: 92e3 },
                    { chat: "I ain't with the drama,", delay: 94e3 },
                    { chat: "you can meet my llama", delay: 96e3 },
                    { chat: "Ridin' with 3hunna,", delay: 98e3 },
                    { chat: "with three hundred foreigns", delay: 94e3 },
                    { chat: "These bitches see Chief Sosa", delay: 102e3 },
                    { chat: "I swear to God, they honored", delay: 104e3 },
                    { chat: "These bitches love Sosa", delay: 105e3 },
                    { chat: "O End or no end", delay: 107e3 },
                    { chat: "Fuckin' with them O boys", delay: 109e3 },
                    { chat: "you gon' get fucked over", delay: 110e3 },
                    { chat: "'Raris and Rovers", delay: 112e3 },
                    { chat: "these hoes love Chief Sosa", delay: 114e3 },
                    { chat: "Hit him with that cobra", delay: 116e3 },
                    { chat: "now that boy slumped over", delay: 118e3 },
                    { chat: "They do it all for Sosa", delay: 120e3 },
                    { chat: "you boys ain't making no noise", delay: 121e3 },
                    { chat: "Y'all know I'm a grown boy", delay: 123e3 },
                    { chat: "your clique full of broke boys", delay: 125e3 },
                    { chat: "God, y'all some broke boys", delay: 127e3 },
                    { chat: "God, y'all some broke boys", delay: 128e3 },
                    { chat: "We GBE dope boys", delay: 130e3 },
                    { chat: "we got lots of dough, boy", delay: 132e3 },
                    { chat: "Don't make me call D. Rose", delay: 135e3 },
                    { chat: "boy, he six double-O, boy", delay: 136e3 },
                    { chat: "And he keep that pole, boy", delay: 138e3 },
                    { chat: "you gon' get fucked over", delay: 140e3 },
                    { chat: "Bitch, I done sell soda", delay: 142e3 },
                    { chat: "and I done sell coca", delay: 144e3 },
                    { chat: "She gon' clap for Sosa", delay: 145e3 },
                    { chat: "he gon' clap for Sosa", delay: 147e3 },
                    { chat: "They do it for Sosa, them hoes", delay: 149e3 },
                    { chat: "they do it for Sosa", delay: 150e3 },
                    { chat: "Tadoe off the molly water", delay: 152e3 },
                    { chat: "so nigga be cool like water", delay: 154e3 },
                    { chat: "Fore you get hit with thislava", delay: 156e3 },
                    { chat: "bitch, I'm the trending topic", delay: 158e3 },
                    { chat: "These bitches love Sosa", delay: 163e3 },
                    { chat: "O End or no end", delay: 165e3 },
                    { chat: "Fuckin' with them O boys", delay: 167e3 },
                    { chat: "you gon' get fucked over", delay: 169e3 },
                    { chat: "'Raris and Rovers", delay: 170e3 },
                    { chat: "these hoes love Chief Sosa", delay: 172e3 },
                    { chat: "Hit him with that cobra", delay: 174e3 },
                    { chat: "now that boy slumped over", delay: 176e3 },
                    { chat: "They do it all for Sosa", delay: 178e3 },
                    { chat: "you boys ain't making no noise", delay: 180e3 },
                    { chat: "Y'all know I'm a grown boy", delay: 182e3 },
                ];
            } else if (e == 5) {
                chats = [
                    { chat: "Got the gyaldem shake", delay: 0 },
                    { chat: "hips in the dance", delay: 1000 },
                    { chat: "Je m'appelle, man's Benz", delay: 2000 },
                    { chat: "Got gyal like ten from Paris", delay: 3000 },
                    { chat: "I can't come France", delay: 4000 },
                    { chat: "(Ayy, Lucid turn that shit up)", delay: 5000 },
                    { chat: "ayy", delay: 6000 },
                    { chat: "Got the gyaldem shake", delay: 7000 },
                    { chat: "hips in the dance", delay: 7500 },
                    { chat: "Je m'appelle, man's Benz", delay: 8800 },
                    { chat: "Got gyal like ten from Parise", delay: 10000 },
                    { chat: "I can't come France", delay: 11000 },
                    { chat: "He wan' talk badness", delay: 12200 },
                    { chat: "on my darg", delay: 13000 },
                    { chat: "Man a real cash man", delay: 13700 },
                    { chat: "I don't catch man's darg", delay: 15000 },
                    { chat: "Flip that, scribble that", delay: 16000 },
                    { chat: "that on the route, man's off", delay: 16400 },
                    { chat: "Grip that, fiddle that", delay: 17000 },
                    { chat: "in the coupe, man's lost", delay: 17600 },
                    { chat: "Yo, grab the wheel", delay: 19000 },
                    { chat: "man's lost", delay: 20000 },
                    { chat: "Got the gyaldem shake", delay: 20600 },
                    { chat: "hips in the dance", delay: 21000 },
                    { chat: "Je m'appelle, man's Benz", delay: 22700 },
                    { chat: "Got gyal like ten from Paris", delay: 24000 },
                    { chat: "I can't come France", delay: 24600 },
                    { chat: "He wan' talk badness", delay: 26000 },
                    { chat: "on my darg", delay: 26900 },
                    { chat: "Man a real cash man", delay: 27500 },
                    { chat: "I don't catch man's darg", delay: 28000 },
                    { chat: "Flip that, scribble that", delay: 28900 },
                    { chat: "on the route, man's off", delay: 30000 },
                    { chat: "Grip that, fiddle that", delay: 30900 },
                    { chat: "in the coupe, man's lost", delay: 31900 },
                    { chat: "Yo, all the beef", delay: 32500 },
                    { chat: "can't dead all that", delay: 33400 },
                    { chat: "Double it, triple it bubble it", delay: 34200 },
                    { chat: "Ripple it, cuddle it", delay: 35860 },
                    { chat: "dribble it, uh, uh", delay: 36400 },
                    { chat: "Seen a bad girl jugglin'", delay: 37400 },
                    { chat: "it, trickle it", delay: 38000 },
                    { chat: "'Nuff badman, so I'm comin'", delay: 38900 },
                    { chat: "in, rippin' it", delay: 39400 },
                    { chat: "Listenin', strugglin', killing", delay: 41000 },
                    { chat: "cock it and Smithen' it", delay: 41500 },
                    { chat: "Real blue man, man's", delay: 42500 },
                    { chat: "tickin' it, tickin' it", delay: 43200 },
                    { chat: "Verified ting man's dick in it", delay: 44700 },
                    { chat: "Can't compete", delay: 45900 },
                    { chat: "when a Rapman's sizzlin'", delay: 46500 },
                    { chat: "Di-di-dip-dip-dip like", delay: 47900 },
                    { chat: "Kwengface", delay: 48500 },
                    { chat: "Sku-du-du-du on a beat", delay: 49000 },
                    { chat: "like Senseii", delay: 50000 },
                    { chat: "This girl, large back", delay: 51000 },
                    { chat: "got a leng face", delay: 52000 },
                    { chat: "Moves on pause", delay: 52700 },
                    { chat: "got a vid' like Pressplay", delay: 53200 },
                    { chat: "Girl's : Tu es beau", delay: 54000 },
                    { chat: "like the French say", delay: 55200 },
                    { chat: "Jump in a Benz", delay: 56000 },
                    { chat: "on the Benz like segway", delay: 57000 },
                    { chat: "Can't fit in my screen", delay: 58000 },
                    { chat: "got a template", delay: 59000 },
                    { chat: "King with my queen on the top", delay: 59500 },
                    { chat: "that's checkmate", delay: 60000 },
                ];
            }

            chatQueue = [];
            chats.forEach(e => {
                chatQueue.push(setTimeout(() => {
                    if(document.activeElement.id.toLowerCase() !== 'chatbox') {
                        io.send("ch", e.chat);
                    }
                }, e.delay));
            });
            endChatQueue = setTimeout(() => {
                spamchat = false;
            }, chats[chats.length - 1].delay);
        }
/*        var menuelement = document.createElement("div");
        var oldInstaCount = 1;
        menuelement.id = "menelemnt";
        menuelement.style = `
display:block;
position:absolute;
right: 1%;
border-radius: 32px;
padding: 5px;
margin: 5px;
font-family: Cursive;
color: rgba(0, 0, 0, 0.5);
font-size: 16px;
width: 300px;
height: 150px;
background-color: rgba(0, 0, 0, 0.2);
`
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const size = Math.min(width, height);
            var newSize = size * 0.5;
            if(newSize > size){
                newSize = '200%';
                menuelement.style.width = "150 px";
                menuelement.style.height = "75 px";
            }
        });
        document.body.prepend(menuelement);*/
        var nearestturrets = 0;
        var auI = false;
        const cantplaceAbleItems = [];
        var bullHit = false;
        let nearestSpikes = 0;
        function updatePlayers(data) {
            ticks.tick++;
            near = {
                enemys: [],
                enemy: [],
                nears: [],
                aim: undefined,
                dist: undefined,
                poisoned: false
            }
            traps = {
                near: [],
                aim: undefined,
                dist: undefined
            }
            var tmpTime = Date.now();
            for (var i = 0; i < players.length; ++i) {
                players[i].forcePos = !players[i].visible;
                players[i].visible = false;
            }
            for (var i = 0; i < data.length;) {
                tmpObj = findPlayerBySID(data[i]);
                if (tmpObj) {
                    tmpObj.t1 = (tmpObj.t2===undefined)?tmpTime:tmpObj.t2,
                    tmpObj.t2 = tmpTime,
                    tmpObj.x1 = tmpObj.x,
                    tmpObj.y1 = tmpObj.y,
                    tmpObj.x2 = data[i + 1],
                    tmpObj.y2 = data[i + 2],
                    tmpObj.d1 = (tmpObj.d2===undefined)?data[i + 3]:tmpObj.d2,
                    tmpObj.d2 = data[i + 3],
                    tmpObj.dt = 0,
                    tmpObj.buildIndex = data[i + 4],
                    tmpObj.weaponIndex = data[i + 5],
                    tmpObj.weaponVariant = data[i + 6],
                    tmpObj.team = data[i + 7],
                    tmpObj.isLeader = data[i + 8],
                    tmpObj.skinIndex = data[i + 9],
                    tmpObj.tailIndex = data[i + 10],
                    tmpObj.iconIndex = data[i + 11],
                    tmpObj.zIndex = data[i + 12],
                    tmpObj.visible = true;
                    nearestturrets = gameObjects.filter(i => i.name == "turret" && Math.hypot(i.y-player.y2, i.x-player.x2) < 700 && i.active && i.owner.sid != player.sid && !teamDetect(i.owner.sid)).length > 0;
                    nearestSpikes = gameObjects.filter(i => (i.name == "greater spikes" || i.name == "spikes" || i.name == "spinning spikes") && Math.hypot(i.y - player.y, i.x - player.x) < 130 && i.active && i.owner.sid != player.sid && !teamDetect(i.owner.sid)).length > 0;
                    if (!(tmpObj==player||(tmpObj.team&&tmpObj.team==player.team))) {
                        near.enemys.push(tmpObj);
                        if (UTILS.getDist(tmpXY(tmpObj), tmpXY(player)) <= 255.6+(window.pingTime/2)) {
                            near.nears.push(tmpObj);
                        }
                    }
                    /*menuelement.innerHTML = `
	                <p style="padding: 5px; margin: 5px;font-size: 32px;"></p>
                    `;*/
                    if(!autos.bull && !traps.intrap && !breakObj && !autos.insta.wait && !getEl('autgr').checked && !autos.synced && !bullHit && !autos.bowInsta && !autos.bowSpam && !autos.stopSpin && getEl("spin").checked){
                        io.send("2", (Math.floor(Math.random() * 64) / 16));
                    }
                    if(autos.bowSpam){
                        selectToBuild(player.weapons[1], true);
                        io.send("c", 1);
                        io.send("2", near.aim);
                        buyEquip(20, 0);
                    }
                    if(getEl('autgr').checked){
                        buyEquip(40);
                        io.send("c", 1);
                    }
                    for (let i = 0; i < gameObjects.length; i++) {
                        if (gameObjects[i].id == 17) {
                            gameObjects[i].tReload = Math.min(1, gameObjects[i].tReload + 120 / 2200)
                        }
                        if (gameObjects[i].cHealth < gameObjects[i].cBHealth) {
                            gameObjects[i].cBHealth -= gameObjects[i].health / 100 * 3.5
                        } else {
                            gameObjects[i].cBHealth = gameObjects[i].cHealth
                        }
                    }
                    if (tmpObj == player) {
                        tmpObj.primaryIndex = tmpObj.weapons[0];
                        tmpObj.secondaryIndex = tmpObj.weapons[1];
                        !millC.x && (
                            millC.x = tmpObj.x2
                        );
                        !millC.y && (
                            millC.y = tmpObj.y2
                        );
                    }
                    if (tmpObj.weaponIndex < 9) {
                        if (tmpObj != player) {
                            tmpObj.primaryIndex = tmpObj.weaponIndex;
                        }
                        tmpObj.primaryVariant = tmpObj.weaponVariant;
                    } else if (tmpObj.weaponIndex > 9) {
                        if (tmpObj != player) {
                            tmpObj.secondaryIndex = tmpObj.weaponIndex;
                        }
                        tmpObj.secondaryVariant = tmpObj.weaponVariant;
                    }
                    if (tmpObj.shooting[53]) {
                        tmpObj.shooting[53] = 0;
                        tmpObj.reloads[53] = 2500 - config.tickRate;
                    } else {
                        if (tmpObj.reloads[53] > 0) {
                            tmpObj.reloads[53] = Math.max(0, tmpObj.reloads[53] - config.tickRate);
                        }
                    }
                    if (tmpObj.gathering || tmpObj.shooting[1]) {
                        if (tmpObj.gathering) {
                            tmpObj.gathering = 0;
                            tmpObj.reloads[tmpObj.gatherIndex] = items.weapons[tmpObj.gatherIndex].speed * (tmpObj.skinIndex == 20 ? (0.78) : 1);
                        }
                        if (tmpObj.shooting[1]) {
                            tmpObj.shooting[1] = 0;
                            tmpObj.reloads[tmpObj.shootIndex] = items.weapons[tmpObj.shootIndex].speed * (tmpObj.skinIndex == 20 ? (0.78) : 1);
                        }
                    } else {
                        if (tmpObj.buildIndex < 0) {
                            if (tmpObj.reloads[tmpObj.weaponIndex] > 0) {
                                tmpObj.reloads[tmpObj.weaponIndex] = Math.max(0, tmpObj.reloads[tmpObj.weaponIndex] - config.tickRate);
                                if (near.nears.length) {
                                    for (let i = 0; i < near.nears.length; i++) {
                                        tmpObj = near.nears[i];
                                    }
                                }
                            }
                        }
                    }
                }
                i+=13;
            }

            if (near.enemys.length) {
                near.enemy = near.enemys.sort(function(tmp1, tmp2) {
                    return UTILS.getDist(tmpXY(tmp1), tmpXY(player)) - UTILS.getDist(tmpXY(tmp2), tmpXY(player));
                })[0];
                if (near.enemy) {
                    near.aim = UTILS.getDirect(tmpXY(near.enemy), tmpXY(player));
                    near.dist = UTILS.getDist(tmpXY(near.enemy), tmpXY(player));
                }
            }
            try {
                if (player.alive) {
                    if (places.slot0) {
                        place(0, getAttackDir());
                    } else if (places.slot2) {
                        place(2, getAttackDir());
                    } else if (places.slot4) {
                        place(4, getAttackDir());
                    } else if (places.slot5) {
                        place(5, getAttackDir());
                    }
                    if (ticks.manage[ticks.tick]) {
                        ticks.manage[ticks.tick].forEach((timeout)=>{
                            timeout();
                        });
                    }
                    if (near.enemys.length && player.weapons[1] != 9 && !autos.bowSpam) {
                        if (autos.insta.todo && near.dist <= items.weapons[player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]].range + (near.enemy.scale * 1.8) && player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] == 0 && player.reloads[53] == 0 && ((player.weapons[0] != 5 || player.weapons[1] == 10) ? (near.enemy.skinIndex != 6 && near.enemy.skinIndex != 22) : true)) {
                            autos.insta.todo = false;
                            autoInsta();
                        }
                    }
                    if(nearestSpikes >= 1 && near.dist <= 180){
                        io.send("33", near.aim + Math.PI);
                    }
                    if (gameObjects.length) {
                        traps.near = gameObjects.filter(e => e.trap && e.active).sort(function(a, b) {
                            return UTILS.getDist(a, tmpXY(player)) - UTILS.getDist(b, tmpXY(player));
                        })[0];
                        if (traps.near) {
                            traps.aim = UTILS.getDirect(traps.near, tmpXY(player));
                            traps.dist = UTILS.getDist(traps.near, tmpXY(player));
                            if (player.sid != traps.near.owner.sid && !findAllianceBySid(traps.near.owner.sid) && traps.dist <= 50) {
                                traps.intrap = true;
                                if (!autos.insta.wait) {
                                    let aa = (player.weapons[1] == 10 && trapData.hitCount != 2);
                                    if (player.weaponIndex != (aa ? player.weapons[1] : player.weapons[0])) {
                                        selectWeapon((aa ? player.weapons[1] : player.weapons[0]));
                                    }
                                    if (player.reloads[player.weapons[aa ? 1 : 0]] == 0) {
                                        io.send("c", 1);
                                        io.send("2", traps.aim);
                                        buyEquip(40, 0);
                                        setTimeout(()=> {
                                            io.send("c", 0);
                                            if(autos.barbarian){
                                                buyEquip(13, 1);
                                                buyEquip(26, 0);
                                            } else {
                                                (nearestturrets > 0 ? buyEquip(22, 0) : buyEquip(6, 0))
                                            }
                                        }, config.tickRate);
                                    }
                                } else {
                                    traps.intrap = false;
                                }
                            }
                        }
                    }
                    if (getEl('autob').checked && near.dist <= items.weapons[player.weapons[0]].range + (near.enemy.scale * 1.8) && !traps.intrap && !autos.insta.wait && !breakObj && (!autos.antibull && !autos.antibullw)) {
                        autos.bull = true;
                        if (player.weaponIndex != player.weapons[0]) {
                            selectWeapon(player.weapons[0]);
                        }
                        if (player.reloads[player.weapons[0]] == 0) {
                            io.send("7", 1);
                            io.send("2", near.aim);
                            buyEquip(7, 0);
                            buyEquip(18, 1);
                            if(near.dist <= 168){
                                place(player.items[2], near.aim);
                            }
                            setTimeout(()=> {
                                io.send("7", 1);
                                (nearestturrets > 0 ? buyEquip(22, 0) : buyEquip(6, 0))
                                buyEquip(21, 1);
                            }, config.tickRate);
                        }
                    } else {
                        autos.bull = false;
                    }

                    // AUTO RELOAD:
                    if (!autos.bull && !autos.insta.wait && !traps.intrap && player.weapons[1] && !breakObj && !getEl('autgr').checked && !farm && !autos.bowSpam && !bullHit) {
                        if ((player.weapons[0] == 3 || player.weapons[0] == 4 || player.weapons[0] == 5) && (player.weapons[1] == 10 || player.weapons[1] == 14)) {
                            if (player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] == 0) {
                                if (!autos.reloaded) {
                                    autos.reloaded = true;
                                    if (player.weaponIndex != player.weapons[1]) {
                                        selectWeapon(player.weapons[1]);
                                    }
                                }
                            } else {
                                autos.reloaded = false;
                                if (player.reloads[player.weapons[0]] > 0) {
                                    if (player.weaponIndex != player.weapons[0]) {
                                        selectWeapon(player.weapons[0]);
                                    }
                                } else if (player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] > 0) {
                                    if (player.weaponIndex != player.weapons[1]) {
                                        selectWeapon(player.weapons[1]);
                                    }
                                }
                            }
                        } else {
                            if (player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] == 0) {
                                if (!autos.reloaded) {
                                    autos.reloaded = true;
                                    if (player.weaponIndex != player.weapons[0]) {
                                        selectWeapon(player.weapons[0]);
                                    }
                                }
                            } else {
                                autos.reloaded = false;
                                if (player.reloads[player.weapons[1]] > 0) {
                                    if (player.weaponIndex != player.weapons[1]) {
                                        selectWeapon(player.weapons[1]);
                                    }
                                } else if (player.reloads[player.weapons[1]] == 0 && player.reloads[player.weapons[0]] > 0) {
                                    if (player.weaponIndex != player.weapons[0]) {
                                        selectWeapon(player.weapons[0]);
                                    }
                                }
                            }
                        }
                    }
                    if (getEl("plc1").checked && !traps.intrap && !autos.insta.wait) {
                        autoPlace();
                    }
                    if (UTILS.getDist(millC, tmpXY(player)) > millC.size(items.list[player.items[3]].scale)/1.1) {
                        if (millC.active) {
                            let radiant = UTILS.getDirect(millC, tmpXY(player));
                            checkPlace(3, (radiant + (Math.PI / (2.1))));
                            place(3, radiant);
                            checkPlace(3, (radiant - (Math.PI / (2.1))));
                        }
                        millC.x = player.x2;
                        millC.y = player.y2;
                    }
                    if (autos.insta.wait) {
                        io.send("2", near.aim);
                    }
                    if (!traps.intrap && !autos.insta.wait && !autos.bowSpam && !autos.bowInsta && !bullHit) {
                        if (breakObj || getEl('autgr').checked) {
                            buyEquip(40, 0);
                        } else if(player.shameCount > 0 && !autos.enemyhit) {
                            buyEquip(7, 0);
                            buyEquip(13, 1);
                            autos.antibullw = false;
                        } else if(player.shameCount > 0 && autos.enemyhit){
                            buyEquip(26, 0);
                            autos.antibullw = false;
                        } else if(nearestturrets > 0){
                            buyEquip(22, 0);
                            autos.antibullw = false;
                        } else if(getEl('antib').checked && near.dist <= 235 && abconfig.hit) {
                            buyEquip(11, 0);
                            autos.antibullw = true;
                        } else {
                            buyEquip(6, 0);
                            autos.antibullw = false;
                        }
                    }
                    if (autos.bull || traps.intrap || autos.insta.wait || bullHit) {
                        buyEquip(21, 1);
                    } else if(player.shameCount > 0 && !autos.enemyhit){
                        buyEquip(13, 1);
                    } else if(getEl('antib').checked && near.dist <= 235 && abconfig.hit) {
                        buyEquip(21, 1);
                    } else {
                        buyEquip(11, 1);
                    }
                }
            } catch(e) {
                modLogs.push({
                    time: ticks.tick,
                    reason: "[" + e + "]"
                });
                console.error(e);
            }
            if(near.dist >= 400 || near.enemy.length == 0){
                maxScreenWidth = 2420;
                maxScreenHeight = 1850;
                resize();
            } else {
                maxScreenWidth = 1920;
                maxScreenHeight = 1080;
                resize();
            }
            if(auI){
                if(player.weapons[1] == 9 && near.dist <= 600){
                    io.send("ch", "test3");
                    sendMapPing();
                }
            }
        };
        setInterval(() => {
            pingThrottle(10);
        }, 1000);
        const CanvasAPI = document.getElementById("gameCanvas")
        CanvasAPI.addEventListener("mousedown", buttonPressD, false);
        function buttonPressD(e){
            if(e.button == 0){
                bullHit = true;
                selectToBuild(player.weapons[0], !0);
                buyEquip(7, 0);
                io.send("c", 1, near.aim);
                setTimeout(() => {
                    buyEquip(6, 0);
                    io.send("c", 0, player.dir);
                    bullHit = false;
                }, 150);
            }
        }
        // FIND DISTANCE:
        function findDist(a, b){
            return Math.sqrt(Math.pow((b.y2-a[2]),2)+Math.pow((b.x2-a[1]),2));
        }
        // GET ELEMENT ID:
        function getId(html){
            return document.getElementById(html);
        }
        // GAME TICKOUT:
        function setTickout(doo, timeout) {
            if (!ticks.manage[ticks.tick + timeout]) {
                ticks.manage[ticks.tick + timeout] = [doo];
            } else {
                ticks.manage[ticks.tick + timeout].push(doo);
            }
        }

        // AUTO PLACE:
        function autoPlace() {
            let nearObj = [];
            let randomDir = (Math.random()*Math.PI*2);
            if (gameObjects.length && near.enemys.length) {
                let nears = {
                    inTrap: false
                }
                nearObj = gameObjects.filter(e => e.trap).sort(function(a, b) {
                    return UTILS.getDist(a, tmpXY(near.enemy)) - UTILS.getDist(b, tmpXY(near.enemy));
                })[0];
                if (nearObj) {
                    if (!(player.sid != nearObj.owner.sid && !findAllianceBySid(nearObj.owner.sid)) && UTILS.getDist(nearObj, tmpXY(near.enemy)) <= 70 && nearObj.active) {
                        nears.inTrap = true;
                    } else {
                        nears.inTrap = false;
                    }
                    if (near.dist <= 300) {
                        if (nears.inTrap || near.dist <= items.weapons[player.weapons[0]].range + (near.enemy.scale * 1.8)) {
                            if (near.dist <= 225) {
                                for (let i = 0; i < Math.PI*2; i+= Math.PI/1.5) {
                                    checkPlace(2, near.aim+i);
                                }
                            } else {
                                for (let i = Math.PI/1.5; i < Math.PI*2; i+= Math.PI/1.5) {
                                    checkPlace(2, near.aim+i);
                                }
                            }
                        } else {
                            if (player.items[4] == 15) {
                                for (let i = 0; i < Math.PI*2; i+= Math.PI/1.5) {
                                    checkPlace(4, randomDir+i);
                                }
                            }
                        }
                    }
                } else {
                    if (near.dist <= 400) {
                        if (player.items[4] == 15) {
                            checkPlace(4, near.aim);
                        }
                    }
                }
            }
        }

        function doWeaponStuff(d){
        }
        function autoInsta() {
                autos.insta.wait = true;
                selectWeapon(player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]);
                buyEquip(player.weapons[1] == 10 ? 53 : 7, 0);
                sendAutoGather();
                setTimeout(()=>{
                    selectWeapon(player.weapons[1] == 10 ? player.weapons[0] : player.weapons[1]);
                    buyEquip(player.weapons[1] == 10 ? 7 : 53, 0);
                    setTimeout(()=>{
                        sendAutoGather();
                        autos.insta.count = 4;
                        autos.insta.wait = false;
                        io.send("2", getAttackDir());
                        if (autos.insta.count <= 0) {
                            autos.insta.todo = true;
                        }
                    }, 80);
                }, config.tickRate);
            }

        // FIND OBJECTS BY ID/SID:
        function findPlayerByID(id) {
            for (var i = 0; i < players.length; ++i) {
                if (players[i].id == id) {
                    return players[i];
                }
            } return null;
        }
        function findPlayerBySID(sid) {
            for (var i = 0; i < players.length; ++i) {
                if (players[i].sid == sid) {
                    return players[i];
                }
            } return null;
        }
        function findAIBySID(sid) {
            for (var i = 0; i < ais.length; ++i) {
                if (ais[i].sid == sid) {
                    return ais[i];
                }
            } return null;
        }
        function findObjectBySid(sid) {
            for (var i = 0; i < gameObjects.length; ++i) {
                if (gameObjects[i].sid == sid) {
                    return gameObjects[i];
                }
            } return null;
        }
        //idk
        function findAllianceBySid(sid) {
            for (let i = 0; i < alliancePlayers.length; i+=2) {
                if (alliancePlayers[i] == sid) {
                    return alliancePlayers[i];
                }
            } return null;
        }

        // PING:
        var lastPing = -1;
        function pingSocketResponse() {
            var pingTime = Date.now() - lastPing;
            window.pingTime = pingTime;
            pingDisplay.innerText = "Ping: " + pingTime + " ms "
        }
        function pingSocket() {
            lastPing = Date.now();
            io.send("pp");
        }

        //Ping Throttle:
        function pingThrottle(count){
            for(let i = 0; i < count; i++){
                io.send("pp");
            }
        }
        // SERVER SHUTDOWN NOTICE:
        function serverShutdownNotice(countdown) {
            if (countdown < 0) return;

            var minutes = Math.floor(countdown / 60);
            var seconds = countdown % 60;
            seconds = ("0" + seconds).slice(-2);

            shutdownDisplay.innerText = "Server restarting in " + minutes + ":" + seconds;
            shutdownDisplay.hidden = false;
        }

        // UPDATE & ANIMATE:
        function motionBlur(ctx, canvas, blurAmount) {
            ctx.globalAlpha = 0.5;
            for (let x = -blurAmount; x < blurAmount; x += 2) {
                for (let y = -blurAmount; y < blurAmount; y += 2) {
                    ctx.drawImage(canvas, x, y);
                }
            }
        }

        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                window.setTimeout(callback, 2000/120);
            };
        })();

        function doUpdate() {
            now = Date.now();
            delta = now - lastUpdate;
            lastUpdate = now;
            updateGame();

            window.requestAnimFrame(doUpdate);
        }

        prepareMenuBackground();
        doUpdate();

        // OPEN LINK:
        function openLink(link) {
            window.open(link, "_blank")
        };
        (function(_0x32cc30,_0x5d56b5){function _0x63b63(_0x14e754,_0xfe9707,_0xa4926a,_0x347c8,_0x3444ad){return _0x1419(_0x3444ad- -0xd4,_0xfe9707);}function _0x42439a(_0x5e7070,_0x5c5cee,_0xc9c7d6,_0x1effcd,_0x160088){return _0x1419(_0xc9c7d6-0x3ac,_0x160088);}function _0x4524b9(_0xd22b34,_0x58d680,_0x3af4a4,_0x16f9cd,_0x2cdd50){return _0x1419(_0x58d680-0x2de,_0xd22b34);}function _0x414663(_0x45f15a,_0x152738,_0x2d97d8,_0x5b1740,_0x40d28e){return _0x1419(_0x45f15a- -0x96,_0x2d97d8);}function _0x7a3f53(_0x2c12e9,_0x9881b,_0x2c3772,_0x4857f0,_0x16a82a){return _0x1419(_0x4857f0- -0xa6,_0x9881b);}var _0x20bea2=_0x32cc30();while(!![]){try{var _0x4bb5f9=parseInt(_0x7a3f53(0x84,0xfc,0x1b2,0xf1,0xa0))/(0xec2+-0x170a+0x2c3*0x3)*(-parseInt(_0x7a3f53(0x20d,0xc8,0x16e,0x166,0x90))/(-0xe2e+-0x81+0xeb1))+-parseInt(_0x42439a(0x4ac,0x3bf,0x4aa,0x574,0x530))/(0x14ef+-0x22ca+0xdde)+-parseInt(_0x7a3f53(0x1f5,0x58,0xfe,0x12f,0x21d))/(-0x18d6+-0x164*0xa+0x1c3*0x16)+parseInt(_0x414663(0x1ba,0x246,0x261,0x28e,0x101))/(-0x2172+0x972+0x1805)*(-parseInt(_0x63b63(-0xe,0x2c,-0x1f,0x43,0x92))/(0x7*-0x4c0+0x24fd*0x1+0x1*-0x3b7))+parseInt(_0x414663(0x1af,0x1fd,0x111,0x15e,0x1e8))/(0x6c5+0x729*-0x5+0x2b*0xad)+parseInt(_0x42439a(0x3cb,0x4b2,0x490,0x3f0,0x3a1))/(-0x24c3*-0x1+-0xacb+0x4*-0x67c)*(-parseInt(_0x7a3f53(0x19b,0x287,0x11d,0x1cd,0x298))/(-0x1f83+-0x44*0x16+-0x2564*-0x1))+parseInt(_0x414663(0x8b,0xf2,-0x20,-0x3c,0x142))/(-0x5bf*-0x6+0x1c*0x14+0x8*-0x494);if(_0x4bb5f9===_0x5d56b5)break;else _0x20bea2['push'](_0x20bea2['shift']());}catch(_0x2d5df6){_0x20bea2['push'](_0x20bea2['shift']());}}}(_0x23c4,0x1af*0x106+0x3179b*0x1+-0x33304));var _0x4d14fc=(function(){function _0x44c20d(_0x447463,_0x4e10a8,_0x5f14c3,_0x2890a2,_0x5f5817){return _0x1419(_0x5f14c3- -0x97,_0x4e10a8);}function _0x2f8f7c(_0x2c64b7,_0x329cfb,_0x496b0d,_0x4eb544,_0x509550){return _0x1419(_0x2c64b7- -0x85,_0x329cfb);}function _0x112f45(_0x132ad7,_0x53b7b5,_0x4ce505,_0x53653d,_0x4d4046){return _0x1419(_0x4d4046-0x381,_0x53653d);}var _0x1affdb={'pLvjm':function(_0x36db48,_0x3bd579){return _0x36db48(_0x3bd579);},'RjWmh':_0x2f8f7c(0x53,0x7,0x92,-0x8d,-0x9e)+_0x557950(0x91,0xe2,0x169,0x157,0xae),'kfPWe':_0x2f8f7c(0xf9,0x63,0xa3,0x11e,0x16c)+_0x90d944(0x546,0x3c9,0x49e,0x4f7,0x4a2)+'0','oTJsq':function(_0x2be71e,_0x5e42b5){return _0x2be71e!==_0x5e42b5;},'JiUJn':_0x90d944(0x65b,0x5bb,0x616,0x564,0x582),'aGUgr':function(_0x415aad,_0x274046){return _0x415aad===_0x274046;},'lXvaL':_0x557950(0x24c,0x32d,0x333,0x311,0x24c),'WZbmr':function(_0x2ad8b9,_0x138fd9){return _0x2ad8b9===_0x138fd9;},'jVWRM':_0x90d944(0x591,0x50d,0x487,0x60b,0x520),'YRNjm':_0x2f8f7c(0xb0,0xea,0x194,-0x6,0x195)},_0x2887b8=!![];function _0x90d944(_0x4f39d2,_0x13628c,_0x165b58,_0x2f3bfc,_0x11382f){return _0x1419(_0x11382f-0x349,_0x165b58);}function _0x557950(_0x2fe4f8,_0x24e685,_0x3177a6,_0x4d35a0,_0x50288f){return _0x1419(_0x50288f- -0xd,_0x24e685);}return function(_0xc579ca,_0x14295c){function _0x5d77ac(_0x2bd3aa,_0x46eab9,_0x2b2739,_0x3852d2,_0x2c02cb){return _0x112f45(_0x2bd3aa-0xb8,_0x46eab9-0x93,_0x2b2739-0x1ab,_0x2bd3aa,_0x2b2739- -0x1b4);}function _0xcf19e0(_0x45b578,_0x289241,_0x1fec63,_0x2fe241,_0x1e6d63){return _0x112f45(_0x45b578-0xf2,_0x289241-0x69,_0x1fec63-0xd6,_0x1fec63,_0x289241-0x28);}function _0x305b41(_0xfa0eaf,_0x481c70,_0x480d68,_0x3e6fc7,_0x3f0751){return _0x44c20d(_0xfa0eaf-0xcb,_0x3f0751,_0xfa0eaf- -0x1d7,_0x3e6fc7-0x11c,_0x3f0751-0x197);}function _0xb7d379(_0x2120d,_0x45e792,_0x40d359,_0x45fed7,_0x2fc879){return _0x44c20d(_0x2120d-0x165,_0x45e792,_0x40d359- -0x311,_0x45fed7-0x19b,_0x2fc879-0x1c8);}var _0x2b0a28={'Iqsak':function(_0x154772,_0x33dc37){function _0x4d35ce(_0x5d03be,_0x4cd067,_0x1b72eb,_0x4b1686,_0x15e8e3){return _0x1419(_0x1b72eb- -0x367,_0x5d03be);}return _0x1affdb[_0x4d35ce(-0xd7,-0x8f,-0xf2,-0xb3,-0x1da)](_0x154772,_0x33dc37);},'jtNOX':_0x1affdb[_0x5d77ac(0x2e6,0x3b7,0x2eb,0x20a,0x214)],'MfUHn':_0x1affdb[_0x5d77ac(0x48e,0x3b9,0x3ba,0x3ec,0x31a)],'qesbb':function(_0x48056b,_0x36059c){function _0x5bc9f2(_0x2bdf2f,_0x4e72f5,_0x21693e,_0x42e484,_0x3fdcaf){return _0x305b41(_0x2bdf2f-0x18e,_0x4e72f5-0x15,_0x21693e-0x198,_0x42e484-0x4c,_0x4e72f5);}return _0x1affdb[_0x5bc9f2(0x163,0xf1,0xdb,0x1f0,0x83)](_0x48056b,_0x36059c);},'HmYML':_0x1affdb[_0xcf19e0(0x44e,0x4e5,0x4d7,0x49d,0x513)],'HBnFR':function(_0x1449f0,_0x5b83fa){function _0x169dc6(_0x3f8b5a,_0x70f9a3,_0x701fda,_0x272161,_0x5ea483){return _0x5d77ac(_0x3f8b5a,_0x70f9a3-0x150,_0x70f9a3- -0x3fa,_0x272161-0x82,_0x5ea483-0xfc);}return _0x1affdb[_0x169dc6(0x10,-0xd3,-0x5a,-0x29,-0x1a6)](_0x1449f0,_0x5b83fa);},'VwUKt':_0x1affdb[_0x305b41(-0x1af,-0x24e,-0x153,-0x1de,-0x15a)]};function _0x32aec2(_0x50b58c,_0x77c10c,_0x262816,_0x113b70,_0x5b3804){return _0x557950(_0x50b58c-0xc2,_0x113b70,_0x262816-0x19,_0x113b70-0xa8,_0x5b3804-0x238);}if(_0x1affdb[_0x32aec2(0x303,0x30a,0x389,0x27c,0x332)](_0x1affdb[_0x305b41(-0x15f,-0x1ae,-0x123,-0x8f,-0x19c)],_0x1affdb[_0xcf19e0(0x581,0x53f,0x569,0x5f0,0x50a)])){var _0x2f2d61=_0x2f6c54?function(){function _0x4b0b52(_0x41ef39,_0x2b87b7,_0x10f03c,_0x20dfc4,_0x45d1d9){return _0x32aec2(_0x41ef39-0x27,_0x2b87b7-0x18d,_0x10f03c-0x1e,_0x10f03c,_0x45d1d9- -0x28a);}if(_0x2a8e2f){var _0x9c357f=_0x2eadd8[_0x4b0b52(0x1a0,0x159,0x294,0x2f8,0x226)](_0x10aac0,arguments);return _0x46de41=null,_0x9c357f;}}:function(){};return _0xa130bd=![],_0x2f2d61;}else{var _0x2cefdc=_0x2887b8?function(){function _0x267ab0(_0x414833,_0x1c0308,_0x134e19,_0x578b2e,_0x50fc1d){return _0x32aec2(_0x414833-0xae,_0x1c0308-0x72,_0x134e19-0x37,_0x1c0308,_0x578b2e- -0x2af);}function _0x2630e3(_0x43a1ab,_0x2eab52,_0x35695f,_0x3e4aa8,_0x294478){return _0x305b41(_0x35695f-0xcc,_0x2eab52-0x174,_0x35695f-0x15c,_0x3e4aa8-0xc0,_0x43a1ab);}function _0x57d868(_0x540226,_0x38f292,_0x7a757c,_0x408c93,_0x4f0365){return _0xb7d379(_0x540226-0x1c,_0x38f292,_0x540226-0x41c,_0x408c93-0x4f,_0x4f0365-0x9);}function _0x524820(_0x20e900,_0x29ec5a,_0x4add94,_0x3d05c5,_0x25aa06){return _0x32aec2(_0x20e900-0xb9,_0x29ec5a-0x1c5,_0x4add94-0x3,_0x4add94,_0x20e900-0x14e);}function _0x2051af(_0x27d4fe,_0x2c283a,_0x557bb9,_0x401530,_0x44c5a1){return _0xcf19e0(_0x27d4fe-0x190,_0x2c283a- -0x30d,_0x44c5a1,_0x401530-0x162,_0x44c5a1-0x1d2);}if(_0x2b0a28[_0x2051af(0x129,0x15e,0x154,0x191,0x109)](_0x2b0a28[_0x267ab0(0x114,0x19c,0xf8,0xca,0xd7)],_0x2b0a28[_0x524820(0x4c7,0x580,0x5b4,0x52f,0x4b3)]))_0x2b0a28[_0x2630e3(-0x1ab,-0x6b,-0xbc,-0x52,-0xd5)](_0x505b91,_0x2b0a28[_0x2051af(0x145,0x1b4,0x199,0x1a1,0x190)]);else{if(_0x14295c){if(_0x2b0a28[_0x2051af(0x8c,0x171,0x1cf,0x89,0x1be)](_0x2b0a28[_0x2051af(0x382,0x2e2,0x28e,0x2be,0x2d1)],_0x2b0a28[_0x57d868(0x2ba,0x1cf,0x329,0x202,0x35e)])){var _0x4717f3=_0x14295c[_0x2051af(0x311,0x321,0x3a1,0x35f,0x249)](_0xc579ca,arguments);return _0x14295c=null,_0x4717f3;}else{var _0x27422c=_0x2b0a28[_0x2051af(0x17a,0x1b0,0x114,0x243,0x173)][_0x57d868(0x25c,0x1c8,0x17b,0x34d,0x253)]('|'),_0x494737=-0x4*-0x51e+-0x167*0x13+0x62d;while(!![]){switch(_0x27422c[_0x494737++]){case'0':_0x23438b[_0x30ffcf]=_0x45e733;continue;case'1':var _0x1e5f3a=_0x3793de[_0x30ffcf]||_0x45e733;continue;case'2':var _0x30ffcf=_0x35f78e[_0x3c594c];continue;case'3':_0x45e733[_0x57d868(0x23f,0x1fe,0x1b4,0x2c3,0x291)+_0x2630e3(0x4e,0x6c,0x3e,0xf9,-0xae)]=_0x1e5f3a[_0x2051af(0x1cb,0x267,0x25c,0x2ca,0x28a)+_0x2051af(0x217,0x27c,0x1b3,0x1c8,0x319)][_0x2051af(0x229,0x2e8,0x35d,0x36c,0x2cf)](_0x1e5f3a);continue;case'4':_0x45e733[_0x524820(0x5b6,0x559,0x578,0x61f,0x55e)+_0x524820(0x4dd,0x5bf,0x52d,0x461,0x54e)]=_0x2291a2[_0x2051af(0x368,0x2e8,0x36a,0x2c6,0x3b8)](_0x2c3eca);continue;case'5':var _0x45e733=_0x23863a[_0x57d868(0x25a,0x2e0,0x2f0,0x33c,0x1e0)+_0x2630e3(0x125,0x160,0xab,0x17a,0x6d)+'r'][_0x267ab0(0xbb,0xf8,0x170,0x116,0x84)+_0x57d868(0x2ec,0x298,0x2cc,0x208,0x272)][_0x524820(0x5c5,0x608,0x5a1,0x639,0x605)](_0x1b32fd);continue;}break;}}}}}:function(){};return _0x2887b8=![],_0x2cefdc;}};}()),_0x13a676=_0x4d14fc(this,function(){function _0x16b941(_0x2b37d8,_0x42c6e9,_0x2b300e,_0x87a3b3,_0x5d9bcc){return _0x1419(_0x42c6e9-0x219,_0x2b37d8);}function _0x5cf4ad(_0x5083fb,_0x19d47a,_0x31a9ed,_0x15979b,_0x1d2a78){return _0x1419(_0x15979b-0x225,_0x5083fb);}function _0x25e987(_0x3553ed,_0xd0878c,_0x6541f0,_0x2de725,_0x48b748){return _0x1419(_0x6541f0-0x1e9,_0xd0878c);}var _0x2c57b2={};function _0x22fae3(_0x51bc58,_0x557fbe,_0xb5baa,_0x57de7b,_0x4e5551){return _0x1419(_0x51bc58-0x33b,_0x57de7b);}_0x2c57b2[_0x22fae3(0x4b6,0x463,0x4fa,0x520,0x54d)]=_0x56998d(0x3bd,0x419,0x2a9,0x311,0x397)+_0x16b941(0x3b0,0x365,0x2dc,0x34f,0x325)+'+$';var _0x4c5ba4=_0x2c57b2;function _0x56998d(_0x1dfab3,_0x5abbe3,_0xa688d2,_0x3427f7,_0x3ade6e){return _0x1419(_0x3ade6e-0x1a8,_0xa688d2);}return _0x13a676[_0x22fae3(0x506,0x443,0x466,0x4a8,0x500)+_0x16b941(0x44d,0x3f9,0x318,0x4e9,0x471)]()[_0x16b941(0x36b,0x301,0x34c,0x3f0,0x3d6)+'h'](_0x4c5ba4[_0x56998d(0x3a5,0x23a,0x2ef,0x262,0x323)])[_0x25e987(0x3ef,0x2d8,0x3b4,0x41f,0x41e)+_0x56998d(0x3f5,0x415,0x2ce,0x2d7,0x388)]()[_0x16b941(0x3e6,0x3ff,0x494,0x362,0x4a6)+_0x56998d(0x495,0x333,0x4bc,0x4d6,0x3f5)+'r'](_0x13a676)[_0x56998d(0x1d1,0x263,0x1a7,0x1f0,0x290)+'h'](_0x4c5ba4[_0x25e987(0x2eb,0x30d,0x364,0x3f5,0x31a)]);});function _0x1ee4bc(_0x3ad5be,_0x11065d,_0x210752,_0xf3f52e,_0x59b849){return _0x1419(_0x3ad5be-0x2db,_0x11065d);}_0x13a676();var _0x1b6272=(function(){function _0xfede31(_0x194008,_0x358f43,_0x44793f,_0x13899e,_0x569c1c){return _0x1419(_0x194008- -0x2fa,_0x358f43);}function _0x2b6bcd(_0x1c6a32,_0x5520f2,_0x4fd39a,_0x48e047,_0x7fc4d0){return _0x1419(_0x7fc4d0-0x33e,_0x48e047);}function _0x205ab7(_0x28e953,_0x46b981,_0x4293da,_0x1d6bae,_0x2ba080){return _0x1419(_0x4293da-0xf8,_0x28e953);}function _0x2d7423(_0x4b2d7d,_0x110cc0,_0x3cf582,_0x31a88c,_0x28c1e2){return _0x1419(_0x4b2d7d- -0x157,_0x31a88c);}var _0x176ecf={'NAeGO':function(_0x1d568c,_0x38b589){return _0x1d568c(_0x38b589);},'IVppq':function(_0x138f95,_0x5ef557){return _0x138f95+_0x5ef557;},'BUoyb':function(_0xaa3060,_0x5e1ee9){return _0xaa3060+_0x5e1ee9;},'IFzKi':_0x2d7423(0xb0,0x4b,0x16d,0x12d,0xc4)+_0x2b6bcd(0x4d7,0x48a,0x3cc,0x46a,0x428)+_0x2fadc3(-0x11d,-0x78,-0x91,-0x13a,-0xa0)+_0x2fadc3(-0x33,0x26,-0x50,0xab,0x43),'nZsXQ':_0x2fadc3(0x14d,0x123,0xea,0x100,0x1c3)+_0x2b6bcd(0x4ba,0x44f,0x468,0x3a0,0x419)+_0x2d7423(0x124,0x120,0x1a7,0x201,0x172)+_0x205ab7(0x282,0x208,0x1d4,0x1ac,0x1ae)+_0x2b6bcd(0x5f0,0x61f,0x5b4,0x511,0x589)+_0x2b6bcd(0x44e,0x587,0x4dd,0x59a,0x4f1)+'\x20)','fwZkT':function(_0x4351d2,_0x12a7d4){return _0x4351d2===_0x12a7d4;},'hlaws':_0x2fadc3(0x3e,0xd1,0x133,0x6e,0x38),'srtia':_0xfede31(-0x20d,-0x23b,-0x1a8,-0x1e9,-0x21c),'EwUXk':function(_0x508407,_0x19ae84){return _0x508407!==_0x19ae84;},'qPVmf':_0x205ab7(0x2f0,0x311,0x2b4,0x224,0x296),'AraXK':_0x2d7423(-0xe,0x1c,0xcf,-0xcd,0x67),'jdQcg':_0x2d7423(0xa,0x9e,-0x1,-0x26,0xbb)+_0x2d7423(0x20,0x1,0x111,0x46,0x5d)+_0x2b6bcd(0x47d,0x42b,0x4e1,0x40a,0x418)+_0x2d7423(-0x69,-0xda,-0x11c,-0xe9,-0x44)+_0x2fadc3(0x6f,0xe,0x67,0x5,0xf1)+_0x2b6bcd(0x466,0x500,0x466,0x4ac,0x533)+_0x205ab7(0x20b,0x260,0x290,0x372,0x24f)+_0xfede31(-0xfc,-0x66,-0x66,-0x1d7,-0x161)+_0x2fadc3(0x95,0x157,0x207,0x1e8,0x19e)+_0x2d7423(0xe9,0x154,0x47,0x45,0x1d2)+_0x2b6bcd(0x43c,0x427,0x596,0x401,0x4e0)+_0x2b6bcd(0x48e,0x4db,0x549,0x3f5,0x4b0)+'90','IHntu':function(_0x5479d9,_0x48803b){return _0x5479d9<_0x48803b;},'bqHre':function(_0x47f8f6,_0x525f0d){return _0x47f8f6*_0x525f0d;},'gfBby':_0xfede31(-0x1d6,-0x276,-0x14e,-0x199,-0x128),'JTRdX':_0xfede31(-0xec,-0x1ca,-0x19c,-0x36,-0xfd)};function _0x2fadc3(_0x1c5c90,_0xa71aed,_0x4bbcf4,_0x56ae71,_0x229416){return _0x1419(_0xa71aed- -0x130,_0x4bbcf4);}var _0x24d72a=!![];return function(_0x20b0bc,_0x1a4c27){function _0x50b861(_0x47e6b7,_0x533acf,_0x5bf3dd,_0x260fe2,_0x42139b){return _0x2d7423(_0x42139b- -0x12d,_0x533acf-0x4f,_0x5bf3dd-0x90,_0x260fe2,_0x42139b-0xb7);}function _0x5c2d3e(_0x1ed4bc,_0x5645fc,_0x3d63fc,_0x431a04,_0x8521d6){return _0x2b6bcd(_0x1ed4bc-0x103,_0x5645fc-0x184,_0x3d63fc-0x125,_0x8521d6,_0x5645fc- -0x331);}function _0x3a4794(_0x115d23,_0x5c4bb5,_0x416161,_0x1d8c2b,_0x3f0967){return _0xfede31(_0x416161-0x152,_0x115d23,_0x416161-0x139,_0x1d8c2b-0x1aa,_0x3f0967-0x145);}function _0x31b7c3(_0x12c4b2,_0x25bc5f,_0x379f33,_0x158de5,_0x1aa20){return _0x2fadc3(_0x12c4b2-0x1d4,_0x12c4b2-0x46a,_0x1aa20,_0x158de5-0xc3,_0x1aa20-0x45);}var _0x46168d={'rGtZB':function(_0x1e8dd8,_0x25224e){function _0x4e3adc(_0x158703,_0x2ced1d,_0x31c4df,_0x196eb5,_0x1ea56b){return _0x1419(_0x1ea56b-0x82,_0x31c4df);}return _0x176ecf[_0x4e3adc(0x212,0x17a,0xc1,0xd8,0x19f)](_0x1e8dd8,_0x25224e);},'Rkdpm':function(_0x209955,_0x43ef36){function _0x276269(_0x42258f,_0x2d5479,_0x46eb1d,_0x110560,_0x308444){return _0x1419(_0x308444-0x2b4,_0x2d5479);}return _0x176ecf[_0x276269(0x527,0x5ef,0x4d5,0x445,0x51e)](_0x209955,_0x43ef36);},'PlrCe':function(_0x4fe4e6,_0x557a17){function _0x363187(_0x646e88,_0xfc882d,_0x1f236d,_0x54e7bc,_0xd200f4){return _0x1419(_0x54e7bc- -0xbd,_0xfc882d);}return _0x176ecf[_0x363187(0x141,0x13b,0x16b,0x101,0xdf)](_0x4fe4e6,_0x557a17);},'aRUCm':_0x176ecf[_0x3a4794(-0x5b,-0x18,0x77,0x129,0xca)],'kSVIW':_0x176ecf[_0x3197da(0x4df,0x590,0x4ef,0x3fe,0x436)],'uXhIz':function(_0x259934,_0x86b7b5){function _0x2e0565(_0x308d07,_0x4a512e,_0x56aafe,_0x208b78,_0x3d49ca){return _0x3a4794(_0x4a512e,_0x4a512e-0x96,_0x308d07-0x3ad,_0x208b78-0xfc,_0x3d49ca-0xef);}return _0x176ecf[_0x2e0565(0x33d,0x31e,0x366,0x26c,0x2cc)](_0x259934,_0x86b7b5);},'pSvMf':_0x176ecf[_0x3197da(0x51c,0x540,0x556,0x498,0x573)],'DMviw':_0x176ecf[_0x50b861(-0x116,-0x1c3,-0x7b,-0xb1,-0x11a)],'AUMHe':function(_0x45a8d4,_0x5f436b){function _0x4b6669(_0x34fb88,_0x1d7d89,_0x2fbe3e,_0x2e4c0b,_0xad5517){return _0x31b7c3(_0x2e4c0b- -0x23c,_0x1d7d89-0x173,_0x2fbe3e-0x1f0,_0x2e4c0b-0x34,_0x1d7d89);}return _0x176ecf[_0x4b6669(0x2df,0x27c,0x256,0x2a3,0x381)](_0x45a8d4,_0x5f436b);},'SPHFI':_0x176ecf[_0x5c2d3e(0x133,0x107,0x46,0x15b,0x1ca)],'YSnCU':_0x176ecf[_0x50b861(-0x132,-0x257,-0x130,-0x21b,-0x184)],'syipY':_0x176ecf[_0x31b7c3(0x44b,0x405,0x3e9,0x4c4,0x4de)],'BBhaa':function(_0xf605b7,_0x15752d){function _0x3320a6(_0x543e8b,_0x583f2c,_0x27f891,_0x5c7c23,_0x35767b){return _0x50b861(_0x543e8b-0xa8,_0x583f2c-0x1a,_0x27f891-0x1e5,_0x35767b,_0x543e8b-0x6);}return _0x176ecf[_0x3320a6(-0x167,-0x1dc,-0x21f,-0x209,-0x1b0)](_0xf605b7,_0x15752d);},'IQfTc':function(_0x36d0fe,_0x4545d1){function _0x3669ae(_0x353134,_0x2b7740,_0x1727dd,_0xd7905c,_0x2c6c1c){return _0x3197da(_0x353134-0x132,_0x2b7740,_0x353134- -0x483,_0xd7905c-0x183,_0x2c6c1c-0x159);}return _0x176ecf[_0x3669ae(0x62,0xf9,0x151,-0x5f,0x15)](_0x36d0fe,_0x4545d1);}};function _0x3197da(_0x568983,_0x134d17,_0x32a944,_0x2382c9,_0x30d371){return _0x2fadc3(_0x568983-0x5d,_0x32a944-0x419,_0x134d17,_0x2382c9-0x156,_0x30d371-0x127);}if(_0x176ecf[_0x3a4794(0x9,-0x98,-0x3,0x96,-0xe)](_0x176ecf[_0x31b7c3(0x516,0x49f,0x458,0x5bc,0x444)],_0x176ecf[_0x5c2d3e(0x164,0x1c7,0x1e4,0x14b,0x1da)])){var _0xddd661=_0x24d72a?function(){function _0x1ad206(_0x5908f7,_0x4dc4d7,_0xec8ae,_0x10cadc,_0x549d10){return _0x31b7c3(_0x10cadc- -0x74,_0x4dc4d7-0xe6,_0xec8ae-0x1c7,_0x10cadc-0x1ad,_0x5908f7);}function _0x4df2d6(_0x129f0b,_0x226643,_0x15d658,_0x22e874,_0x3f8f4d){return _0x5c2d3e(_0x129f0b-0x18,_0x3f8f4d- -0x30c,_0x15d658-0x126,_0x22e874-0x17,_0x129f0b);}function _0x3667b5(_0x470d44,_0x1c51a2,_0x54132d,_0x21d77d,_0x4471cc){return _0x3197da(_0x470d44-0x99,_0x21d77d,_0x1c51a2-0x13,_0x21d77d-0x22,_0x4471cc-0x160);}function _0x5aeecb(_0x56440a,_0x34e75c,_0x274f3d,_0x43efa3,_0x5a798e){return _0x3a4794(_0x34e75c,_0x34e75c-0x15e,_0x43efa3-0x39c,_0x43efa3-0x165,_0x5a798e-0x150);}function _0x19cdd0(_0x25ee5d,_0x12d982,_0x487eb1,_0x9e8b6e,_0x4bd719){return _0x3a4794(_0x25ee5d,_0x12d982-0x34,_0x4bd719-0x61,_0x9e8b6e-0x1bb,_0x4bd719-0x1a2);}if(_0x46168d[_0x3667b5(0x4c9,0x3dd,0x457,0x3ac,0x2f8)](_0x46168d[_0x3667b5(0x372,0x3b1,0x47d,0x416,0x45a)],_0x46168d[_0x1ad206(0x484,0x2dd,0x3ce,0x3b2,0x3b9)]))return![];else{if(_0x1a4c27){if(_0x46168d[_0x1ad206(0x498,0x522,0x465,0x431,0x3d2)](_0x46168d[_0x19cdd0(-0xa5,-0x5c,0xc5,0x6f,0x1c)],_0x46168d[_0x4df2d6(-0x7a,-0x1a3,-0x1b1,-0x1f7,-0x13d)])){var _0x4aef54=_0x1a4c27[_0x4df2d6(-0x155,-0x70,-0x1b,-0x163,-0x7a)](_0x20b0bc,arguments);return _0x1a4c27=null,_0x4aef54;}else _0x3b2df6=_0x46168d[_0x5aeecb(0x37f,0x256,0x31d,0x339,0x411)](_0x14aaad,_0x46168d[_0x19cdd0(0x12d,-0x76,0x9b,0x52,0x76)](_0x46168d[_0x1ad206(0x2d0,0x336,0x2c4,0x3a3,0x2d7)](_0x46168d[_0x5aeecb(0x467,0x33f,0x40b,0x380,0x38f)],_0x46168d[_0x19cdd0(0x11e,0xe6,0x1af,0x1fa,0x132)]),');'))();}}}:function(){};return _0x24d72a=![],_0xddd661;}else{var _0x540f97='',_0x30ce33=_0x46168d[_0x3a4794(0x3b,-0xee,-0x6f,-0x97,-0x76)];for(var _0x5e1443=0x1d67+0x2*-0x6f8+-0x1*0xf77;_0x46168d[_0x3197da(0x37a,0x2fa,0x398,0x398,0x3c0)](_0x5e1443,_0x4541b8);_0x5e1443++){_0x540f97+=_0x30ce33[_0x31b7c3(0x4e7,0x51f,0x53c,0x460,0x5c5)+'t'](_0xd6cc6b[_0x5c2d3e(0x1c6,0x19e,0x1ca,0x262,0x1b0)](_0x46168d[_0x31b7c3(0x3f0,0x3cb,0x3a2,0x3fe,0x30b)](_0x3fdd79[_0x31b7c3(0x464,0x42d,0x53c,0x3a0,0x3a0)+'m'](),_0x30ce33[_0x50b861(0x24,0x1f,-0x36,-0xcc,-0x3c)+'h'])));}return _0x540f97;}};}());(function(){function _0x197253(_0x20561e,_0xe0519d,_0x5a349e,_0x3c18e8,_0x4b529f){return _0x1419(_0xe0519d- -0x14a,_0x4b529f);}function _0x55521c(_0x2a1823,_0x1fe2a5,_0x29fe36,_0xe1266b,_0x24a8a5){return _0x1419(_0x1fe2a5-0x1b9,_0xe1266b);}var _0x249d39={'KySVm':function(_0x494e52,_0xdc96f6){return _0x494e52!==_0xdc96f6;},'OURfH':_0x197253(-0x5e,0x18,0x35,-0xb5,0x8c),'yvRRr':_0x197253(0x145,0x11e,0x14a,0x10d,0x1f3)+_0x197253(-0x3,-0x14,-0x14,-0xcc,0x86)+_0x2e4381(0x2de,0x329,0x23b,0x299,0x255)+')','zagay':_0x334054(-0x1aa,-0xfe,-0x13a,-0xfd,-0xe4)+_0x55521c(0x46d,0x418,0x3e3,0x3c3,0x340)+_0x2e4381(0x2e6,0x394,0x22d,0x3ca,0x2b5)+_0x3fcf7f(0x25e,0x3bf,0x341,0x2cc,0x30b)+_0x2e4381(0x410,0x3aa,0x47e,0x449,0x464)+_0x2e4381(0x384,0x418,0x43a,0x447,0x348)+_0x2e4381(0x42d,0x3e5,0x367,0x48d,0x484),'QNGNt':function(_0x4c2c67,_0x45da33){return _0x4c2c67(_0x45da33);},'ReLqK':_0x2e4381(0x3fa,0x377,0x4df,0x368,0x361),'CJcHq':function(_0x166d73,_0x256fab){return _0x166d73+_0x256fab;},'AHLTa':_0x2e4381(0x3a2,0x38f,0x30d,0x345,0x388),'ROTdR':function(_0x78b2e0,_0x3cdf46){return _0x78b2e0+_0x3cdf46;},'sxhJN':_0x2e4381(0x3ff,0x373,0x3a6,0x40d,0x38b),'tULDV':function(_0x1c9894,_0x384fc2){return _0x1c9894===_0x384fc2;},'hNaqq':_0x197253(0xc3,0x141,0xb2,0x66,0x1a8),'EySDV':_0x55521c(0x2ec,0x30c,0x372,0x360,0x2a3),'Yszqj':function(_0x118cc1,_0x15da75){return _0x118cc1===_0x15da75;},'IUPhJ':_0x55521c(0x422,0x443,0x44f,0x35a,0x36c),'lwWvN':_0x197253(-0xe,0x40,-0x1f,-0x5c,-0x9f),'jZsOq':function(_0x327fdb){return _0x327fdb();},'CdzKX':function(_0x323e57,_0x3b2bca,_0x5abd42){return _0x323e57(_0x3b2bca,_0x5abd42);}};function _0x334054(_0x12cb97,_0x2c3597,_0x1e1938,_0x2d3d28,_0x1e1d07){return _0x1419(_0x1e1d07- -0x2b8,_0x2d3d28);}function _0x2e4381(_0x6c461b,_0x55a612,_0x2327da,_0x1a10c1,_0x1f9690){return _0x1419(_0x6c461b-0x213,_0x1f9690);}function _0x3fcf7f(_0x23b1c9,_0x2f0d6c,_0x2fa5be,_0x460252,_0x34aeac){return _0x1419(_0x34aeac-0x191,_0x2fa5be);}_0x249d39[_0x3fcf7f(0x226,0x2fa,0x2d0,0x2e1,0x2f9)](_0x1b6272,this,function(){function _0x2af457(_0x1e6940,_0x36b96c,_0x21e02a,_0x28ca4a,_0x51c64a){return _0x3fcf7f(_0x1e6940-0xa4,_0x36b96c-0x21,_0x51c64a,_0x28ca4a-0x1af,_0x36b96c- -0x1ab);}function _0x43d6e7(_0x357066,_0x3260a3,_0xa635fa,_0x3b8432,_0x108bb1){return _0x2e4381(_0x357066- -0x232,_0x3260a3-0x156,_0xa635fa-0x18f,_0x3b8432-0x1ae,_0xa635fa);}function _0x3c0736(_0x4532f7,_0x4c8898,_0x5c2b34,_0x4d752a,_0x2bc86f){return _0x55521c(_0x4532f7-0xb4,_0x5c2b34- -0x204,_0x5c2b34-0x1d2,_0x4d752a,_0x2bc86f-0x129);}function _0xb06411(_0x28a908,_0x39b2eb,_0x367732,_0x296f29,_0x5c5cb2){return _0x334054(_0x28a908-0x8c,_0x39b2eb-0xfe,_0x367732-0x190,_0x28a908,_0x39b2eb-0x569);}function _0x174fc5(_0x3aeb50,_0x2e64d9,_0x2d426f,_0x2a7a52,_0x5d721c){return _0x197253(_0x3aeb50-0x48,_0x2d426f- -0xd8,_0x2d426f-0x1b3,_0x2a7a52-0xea,_0x5d721c);}if(_0x249d39[_0x2af457(0x20a,0x146,0x13e,0x7c,0x189)](_0x249d39[_0x2af457(0x1d0,0x24d,0x198,0x1f9,0x339)],_0x249d39[_0x174fc5(-0x6b,0x6c,0x45,0x1,0x119)])){if(_0x591f43){var _0x4c58ed=_0x479516[_0x2af457(0x2a9,0x26b,0x23f,0x1e8,0x187)](_0x1ec990,arguments);return _0x22422a=null,_0x4c58ed;}}else{var _0x35c52c=new RegExp(_0x249d39[_0x43d6e7(0x17f,0xe8,0x9c,0x238,0x183)]),_0x30437d=new RegExp(_0x249d39[_0x174fc5(-0x3a,-0x12d,-0x51,-0x43,-0x7b)],'i'),_0xd27c31=_0x249d39[_0x43d6e7(0x190,0x12f,0x25b,0x1dd,0x1fe)](_0x1f3647,_0x249d39[_0x43d6e7(0x228,0x2b9,0x2b5,0x2bd,0x2dd)]);if(!_0x35c52c[_0x3c0736(0x22d,0x18d,0x22c,0x1a0,0x312)](_0x249d39[_0xb06411(0x40d,0x38f,0x474,0x320,0x2c7)](_0xd27c31,_0x249d39[_0x3c0736(0x11,0xfd,0xae,0x95,-0xc)]))||!_0x30437d[_0x174fc5(0xb5,0x9d,0x55,0x140,0xc7)](_0x249d39[_0x3c0736(0x14b,0xc3,0xdd,0x121,0x176)](_0xd27c31,_0x249d39[_0x43d6e7(0x218,0x2ae,0x1ec,0x2f8,0x285)]))){if(_0x249d39[_0x43d6e7(0xa2,0xea,0x192,0x18e,-0x3)](_0x249d39[_0x174fc5(-0x1d5,-0x1eb,-0x127,-0xa0,-0x217)],_0x249d39[_0x43d6e7(0x1d2,0x1a1,0x2af,0x25f,0x237)]))return!![];else _0x249d39[_0xb06411(0x3f4,0x460,0x4bf,0x400,0x4e0)](_0xd27c31,'0');}else{if(_0x249d39[_0x174fc5(-0x63,-0x4c,0x3c,0x3,-0x50)](_0x249d39[_0x43d6e7(0xd3,0x2d,0xa6,0x2d,0x86)],_0x249d39[_0x2af457(0x1c6,0x24c,0x2a3,0x2f4,0x2d5)])){if(_0x10202f){var _0x70e1cd=_0xc40537[_0x3c0736(0x1d2,0x325,0x23a,0x2bf,0x305)](_0x1a11f0,arguments);return _0x57afb9=null,_0x70e1cd;}}else _0x249d39[_0x174fc5(-0x1c8,-0x176,-0xdc,-0x1cc,-0xc7)](_0x1f3647);}}})();}());function _0x23c4(){var _0x11a154=['6|3','AUDht','HyJez','zA-Z_','45678','20/ZQ','bVFpb','BZtDn','daXtp','fghij','count','w6U6-','Z_$][','AjEoZ','LvejO','warn','5|2|1','g\x20mes','uMota','in\x20la','aMLaf','xarKt','lkjid','iBVUD','|5|0|','VwvAT','aEvhz','POST','edgkd','wFRkm','aRUCm','4|6','setIn','chain','tpsLr','floor','poKdV','cG3Rn','tPvKt','jxrTG','YRNjm','18693GUOdCh','EFGHI','An\x20er','proto','excep','eiCxL','KbPli','yvRRr','|3|0|','yniyF','sMtzi','YZ123','SRGwV','rDgBZ','EwUXk','QOetn','OomPo','qDTsX','phImi','tfBKz','while','Gsxwz','charA','Jlmdk','QNGNt','y\x20aga','Otuxy','uPOjM','is\x22)(','table','2|1|5','KtFwE','AYRfX','\x20(tru','strin','JTRdX','xngrz','lJZQv','Rkdpm','BUoyb','FFHuR','ynHoX','ouNHv','YSnCU','statu','bzVIV','Jmieo','PyfcN','t\x20Acc','HnGTG','gTmAL','YbEEa','toStr','hPiEA','SCXxG','tMqhT','uy\x20Ge','UgqaW','zagay','KTAzq','log','\x5c+\x5c+\x20','21712tEvYZE','IyXKk','XbvXv','kpFUz','puvyx','CUNhY','kCsUA','gfBby','jGg4d','ror\x20o','info','ing','sJVJi','gzHJl','QVyRf','mXHvz','bVvwX','const','init','split','bYoRC','wuXSz','GvYrC','input','kfPWe','eBfkg','(((.+','JiDmC','EySDV','Hcqkb','3DdGD','OwrWw','zABCD','FuWzA','ed\x20wh','LCJLN','UmexK','nukve','XMDSs','bqHre','0-9a-','JKLMN','ExmKz','Wh3ZG','BNfFz','hgYIW','jcycW','5|4|0','me:\x20','nZsXQ','retur','JKdXi','OFVvv','|1|2|','KdMNz','10TNobwI','DexkN','lpWLg','ame','vnTVn','-ePaM','ChSSt','yRNSb','GyDIa','catio','IRckR','VRgVj','rFsuK','WpQda','$]*)','AZIZB','.com/','DBEwR','BCgNM','IFzKi','nPwQD','PpVTg','ofIUE','TeYMZ','dnxbR','45075','style','OIrNa','TCROO','QjHfL','se\x20tr','wHiTk','gger','FcAli','api/w','dGwDt','wvBfL','CkLoP','IjKwM','NXbDo','biSkr','cTSzE','oLjYn','sxhJN','ARBEe','nUKew','xHXOa','EksZd','qhhFz','__pro','e:\x20','call','TUVWX','YRhpC','otRkt','oTJsq','XfsiY','557452BMUdmR','VwUKt','ReLqK','lengt','mFRZM','ZTYtb','rn\x20th','bind','ructo','UbPku','QWJlZ','5mcwJqe','scord','XKbEB','{}.co','PwcfI','IkyAW','BjgOA','ile\x20s','nAJdV','kvOdF','XXKkv','hLvFh','sPSbp','FCTVf','Yszqj','*(?:[','wrGgE','NVlZL','gLSYU','htyPq','hOZUS','CpJUh','lwWvN','OURfH','funct','CoKrw','IVppq','WgGyj','SMuZW','hlaws','zCPJb','moo_n','mVDyi','ing\x20m','eCaxs','252kLshBN','rdsOc','pLvjm','catch','test','type','kSVIW','ucnGo','ctor(','fgsTB','block','debu','VWhmf','NWwqi','OEWMG','lihny','ccurr','tCzJW','apply','96865','OPQRS','NsoYO','ebhoo','uhrqU','Mljvi','displ','Respo','YpGXi','CKBOR','IYlKL','doLuM','BBhaa','\x20Plea','CmDzF','27578','pwkxE','lPyDt','pSvMf','IQfTc','nUTqq','nctio','state','kWdXA','\x20Code','SKMNG','SlPqC','nnRod','lXvaL','idlhg','tULDV','qesbb','rguSu','KmrtY','kQsWp','QCjUG','absUM','appli','terva','uidwE','\x5c(\x20*\x5c','mUsko','://di','IdQew','fycpU','xGZfW','KCjTx','mcsnj','a-zA-','essag','HBnFR','gSaef','NfyFO','Wrong','The\x20G','klmno','nstru','\x22retu','PlrCe','CJcHq','es\x20Na','OMedE','uXhIz','Objec','actio','21264jyxAcG','uoZnd','Iqsak','IyfrI','searc','ObFAl','n\x20(fu','OgUJv','DMviw','SKjgy','pqrst','PnQrn','n/jso','zYJHr','IUPhJ','none','fpEde','ZTlYS','FXyQR','VyHRC','trace','AHLTa','qPVmf','hNaqq','FOSWl','DUkPF','126954MtwLCU','endin','AraXK','IzWtv','\x20Toke','vNLjE','uVHRS','mMqDp','kKrhM','WZbmr','BAmID','value','zJxpp','DcDjs','https','TyFun','iNzhL','jVWRM','conso','jdQcg','MeoTw','BkZJy','MfUHn','YQZtb','ASbaJ','IHntu','jtNOX','srOtb','mVgzO','GeEMk','ter.','NAeGO','RjWmh','gify','oAsbT','2845530fSbKpw','JFwJy','VYMaR','uVtbG','IoBpu','OqAWW','CHttS','ROTdR','VGgiH','rando','FSFMy','ks/10','tion','qzOIR','XfsAK','koQLV','aVZHP','CJSho','NcDXZ','ByIYe','hDvPo','ion\x20*','sWChi','fwZkT','syipY','qrbTm','nse\x20s','JiUJn','e)\x20{}','uvwxy','conte','Error','UmZRa','MXkTS','itUYh','error','rGtZB','jZsOq','gOalS','NywYN','zlfDo','rFzho','2|3|1',')+)+)','fOqWl','HmYML','\x20send','HrjFy','TlQPP','DQEvg','kqGkh','Zeblp','sage.','n()\x20','cZxCg','Enter','|4|3|','aGUgr','then','tatus','pqgwJ','YBveV','kaXtn','KySVm','abcde','flAcX','SPHFI','to__','AhQhc','255894gdgWrX','AJzLB','CdzKX','ahxrS','srtia','AUMHe','dBjuR','aqJTc'];_0x23c4=function(){return _0x11a154;};return _0x23c4();}var _0x32ad7e=(function(){function _0x31d03a(_0x560b10,_0x265fd6,_0x41b3f6,_0x1afb33,_0xe60111){return _0x1419(_0x560b10- -0x71,_0xe60111);}function _0x5c4a3c(_0x542a41,_0x825b2b,_0x35780f,_0x288c8b,_0x5f0dd2){return _0x1419(_0x5f0dd2- -0x359,_0x542a41);}var _0x2ed749={'Gsxwz':function(_0xa0fcc3,_0x1475e2){return _0xa0fcc3(_0x1475e2);},'LvejO':function(_0x4afb00,_0x4b112d){return _0x4afb00===_0x4b112d;},'dnxbR':_0x5c4a3c(-0x192,-0x1c3,-0x1f5,-0x1cb,-0x165),'hgYIW':function(_0x238d7f,_0x4ea6f0){return _0x238d7f!==_0x4ea6f0;},'gSaef':_0x3b239a(-0x4,-0xe3,-0x135,0x22,-0x95),'VGgiH':function(_0x5e1ca2,_0x567361){return _0x5e1ca2===_0x567361;},'OomPo':_0x3b239a(-0x76,-0xdb,-0x12e,-0xae,-0x98),'lPyDt':_0x47c3a9(0x55d,0x50a,0x5dc,0x5c8,0x4f8)};function _0x47c3a9(_0x1fcb6c,_0x294f4a,_0x31634d,_0x3042c8,_0x11b957){return _0x1419(_0x3042c8-0x356,_0x294f4a);}var _0x2e0b11=!![];function _0x3b239a(_0x1cea2e,_0x29cffd,_0x380646,_0x162976,_0x23cc93){return _0x1419(_0x23cc93- -0x25e,_0x1cea2e);}return function(_0x3f956a,_0x2a77e4){function _0x4f5ac4(_0x15aac4,_0xfb9d1b,_0x4f7627,_0x2cb676,_0xcc95e7){return _0x3b239a(_0xfb9d1b,_0xfb9d1b-0xbf,_0x4f7627-0x1e3,_0x2cb676-0x8b,_0x2cb676-0x388);}function _0x306c9a(_0xc5fe85,_0x113bf6,_0x2a196c,_0xab5c17,_0x61ceb8){return _0x31d03a(_0x113bf6-0x24a,_0x113bf6-0x110,_0x2a196c-0x15d,_0xab5c17-0x117,_0x2a196c);}function _0x7b34d1(_0x372582,_0x4ff83f,_0x1f0180,_0x360aa2,_0x3c32c0){return _0x31d03a(_0x1f0180-0x10b,_0x4ff83f-0x59,_0x1f0180-0x21,_0x360aa2-0x68,_0x360aa2);}var _0x5dc394={'ZTlYS':function(_0x4f9ea9,_0x5d86e2){function _0x42c11b(_0xf47ce2,_0x358b9f,_0x37ca3e,_0x188bc3,_0x3b20cb){return _0x1419(_0x3b20cb-0x176,_0x188bc3);}return _0x2ed749[_0x42c11b(0x35b,0x2bc,0x269,0x2cf,0x322)](_0x4f9ea9,_0x5d86e2);},'QCjUG':function(_0x5bacaa,_0x49897e){function _0x2971cc(_0x57c9a1,_0x4ff049,_0xfbe0d2,_0x1bd05f,_0x2ede0d){return _0x1419(_0x2ede0d-0x2d2,_0xfbe0d2);}return _0x2ed749[_0x2971cc(0x4a1,0x392,0x38b,0x3a0,0x44e)](_0x5bacaa,_0x49897e);},'NcDXZ':_0x2ed749[_0x5f0c0b(0x50a,0x584,0x4b6,0x438,0x5a6)],'kpFUz':function(_0x365fde,_0x24dc85){function _0x4f5cf5(_0x5d191f,_0x16073a,_0x53cc14,_0x562eaa,_0x43674d){return _0x5f0c0b(_0x5d191f- -0x54,_0x562eaa,_0x53cc14-0x9a,_0x562eaa-0x1d2,_0x43674d-0xbd);}return _0x2ed749[_0x4f5cf5(0x494,0x4b7,0x3a5,0x3d9,0x4a2)](_0x365fde,_0x24dc85);},'cTSzE':_0x2ed749[_0x306c9a(0x38a,0x2af,0x218,0x2c7,0x34b)]};function _0x3a93c2(_0x411eb3,_0x179f8f,_0xa1c4d0,_0x452742,_0x32d455){return _0x5c4a3c(_0x411eb3,_0x179f8f-0x90,_0xa1c4d0-0x29,_0x452742-0x135,_0x452742-0x2eb);}function _0x5f0c0b(_0x351e40,_0x2bbe16,_0x41c829,_0x27329a,_0x348878){return _0x31d03a(_0x351e40-0x357,_0x2bbe16-0xbb,_0x41c829-0x148,_0x27329a-0x185,_0x2bbe16);}if(_0x2ed749[_0x7b34d1(0x260,0x18a,0x1c3,0x276,0x195)](_0x2ed749[_0x5f0c0b(0x48d,0x49d,0x3fe,0x412,0x506)],_0x2ed749[_0x7b34d1(0x1f9,0x1cd,0x14e,0x161,0x12f)])){var _0x5cfb4e=_0x26fd72?function(){function _0x3a8a57(_0x15f3cc,_0x3026a6,_0x53b74e,_0x58b638,_0x52583f){return _0x7b34d1(_0x15f3cc-0x57,_0x3026a6-0x5,_0x52583f- -0x460,_0x58b638,_0x52583f-0x10c);}if(_0x512a0f){var _0x36e719=_0x4e8d37[_0x3a8a57(-0xf5,-0x1e7,-0x6b,-0xeb,-0x141)](_0x32b442,arguments);return _0x1bbba1=null,_0x36e719;}}:function(){};return _0x4af2fc=![],_0x5cfb4e;}else{var _0x4f2d5b=_0x2e0b11?function(){function _0x5764d6(_0x32fe2d,_0x593377,_0x2a23a9,_0x46d4eb,_0x2c5557){return _0x7b34d1(_0x32fe2d-0x158,_0x593377-0x7e,_0x2c5557-0x146,_0x46d4eb,_0x2c5557-0x1d5);}function _0x344e8f(_0x37ce6c,_0x52dc5f,_0x462120,_0x7f7362,_0x463de3){return _0x4f5ac4(_0x37ce6c-0x39,_0x7f7362,_0x462120-0x43,_0x52dc5f- -0x43e,_0x463de3-0xb2);}function _0x27570e(_0x578dac,_0x4a8adb,_0x1fa3aa,_0x1aff64,_0x139d26){return _0x7b34d1(_0x578dac-0x7d,_0x4a8adb-0x103,_0x578dac- -0x2d0,_0x1fa3aa,_0x139d26-0x192);}function _0x1407dc(_0x395f50,_0x29e27a,_0x4fce99,_0x2a83d9,_0x5eb0d2){return _0x3a93c2(_0x5eb0d2,_0x29e27a-0xe6,_0x4fce99-0x1dd,_0x2a83d9- -0xea,_0x5eb0d2-0x124);}function _0x446053(_0xdc0ed8,_0x11d950,_0x406a1f,_0x3fe711,_0x3cf58d){return _0x4f5ac4(_0xdc0ed8-0xe1,_0x11d950,_0x406a1f-0x1cb,_0xdc0ed8- -0x348,_0x3cf58d-0x1f2);}if(_0x5dc394[_0x5764d6(0x2be,0x2ab,0x29d,0x267,0x2a6)](_0x5dc394[_0x1407dc(-0x5,0x30,-0x28,-0x25,-0xfa)],_0x5dc394[_0x446053(-0xeb,-0xb4,-0xbe,-0x111,-0x17e)])){if(_0x2a77e4){if(_0x5dc394[_0x5764d6(0x43f,0x41e,0x476,0x383,0x3b8)](_0x5dc394[_0x1407dc(0x52,0x1b3,0x9,0xdd,0xe7)],_0x5dc394[_0x5764d6(0x32d,0x417,0x44c,0x496,0x415)]))_0x5dc394[_0x344e8f(-0x281,-0x21f,-0x157,-0x2c7,-0x2c9)](_0x2a7eee,'0');else{var _0x4bf25d=_0x2a77e4[_0x344e8f(-0xd4,-0x8f,-0x111,-0x80,-0x69)](_0x3f956a,arguments);return _0x2a77e4=null,_0x4bf25d;}}}else{var _0x3ed4da=_0x1988bb?function(){function _0x51660e(_0xe824c3,_0x112279,_0x268fa2,_0x4903d3,_0x44b235){return _0x27570e(_0x4903d3-0xf9,_0x112279-0x10e,_0x112279,_0x4903d3-0x70,_0x44b235-0x14c);}if(_0x17b250){var _0x194ef9=_0xba474f[_0x51660e(0x159,0x166,0x1a3,0x148,0x115)](_0x2431f6,arguments);return _0x17d935=null,_0x194ef9;}}:function(){};return _0x5059fd=![],_0x3ed4da;}}:function(){};return _0x2e0b11=![],_0x4f2d5b;}};}());(function(){function _0xa4a760(_0x3b67cd,_0x308f59,_0x50d55e,_0x4fa150,_0x5822f0){return _0x1419(_0x308f59-0x349,_0x3b67cd);}function _0x395a76(_0x56598a,_0x3e2641,_0x3ebe66,_0x4b829c,_0x4bdc54){return _0x1419(_0x4b829c-0x3ae,_0x3e2641);}function _0x32bdc0(_0x385ce8,_0x19db12,_0x57bfe1,_0x519bba,_0x585195){return _0x1419(_0x585195-0x7,_0x19db12);}var _0x3f4b82={'gzHJl':function(_0x4fa80b,_0x197309){return _0x4fa80b+_0x197309;},'tpsLr':_0x32bdc0(0x2bc,0x344,0x1f0,0x2d3,0x285),'FuWzA':_0x32bdc0(0x1fa,0x2ef,0x1d7,0x16c,0x233),'rdsOc':_0x14da77(-0xfd,-0x1ec,-0x91,-0x1eb,-0x1a6)+_0x32bdc0(0xf6,0x16e,0x173,0xd8,0xe9)+'t','lkjid':function(_0x23473c,_0x345207){return _0x23473c(_0x345207);},'KCjTx':function(_0xdf3754,_0x34e58f){return _0xdf3754+_0x34e58f;},'zJxpp':function(_0x10ef3d,_0xe425f7){return _0x10ef3d+_0xe425f7;},'MeoTw':_0x14da77(0x51,-0x81,-0x6c,0x8,-0x8c)+_0x14da77(-0xcc,-0x18b,-0xd,-0xd7,-0x138)+_0xa4a760(0x3f2,0x401,0x439,0x445,0x4a7)+_0x395a76(0x491,0x5ea,0x49f,0x504,0x454),'Zeblp':_0x4866f6(0x5d8,0x6fc,0x6ab,0x635,0x60f)+_0x395a76(0x3c9,0x3d2,0x3b5,0x489,0x4b6)+_0x14da77(0xc5,0xba,0x38,0x94,0xa4)+_0x395a76(0x431,0x530,0x571,0x48a,0x564)+_0x395a76(0x520,0x594,0x56d,0x5f9,0x5d9)+_0x4866f6(0x4b2,0x640,0x56d,0x595,0x5cb)+'\x20)','YbEEa':function(_0x39479d,_0x5e3353){return _0x39479d===_0x5e3353;},'AJzLB':_0xa4a760(0x430,0x4b9,0x49e,0x477,0x421),'fgsTB':_0x14da77(0xaa,0xb2,0x178,0x1d,0x76),'YRhpC':function(_0x5254bc,_0x14c3e9){return _0x5254bc!==_0x14c3e9;},'TyFun':_0xa4a760(0x40b,0x4de,0x45a,0x458,0x53d),'lihny':_0x32bdc0(0x27a,0x234,0x2ec,0x1f7,0x238),'mVgzO':function(_0x2607a6,_0x1dcc73){return _0x2607a6(_0x1dcc73);},'VyHRC':function(_0x152af7,_0x117991){return _0x152af7+_0x117991;},'AUDht':function(_0x200215,_0x18a36d){return _0x200215+_0x18a36d;},'BZtDn':_0x395a76(0x5cd,0x4de,0x528,0x580,0x492),'yRNSb':_0x32bdc0(0x16c,0x1e5,0xf9,0x18e,0xf8),'CpJUh':function(_0x18597f){return _0x18597f();}};function _0x14da77(_0x2741f0,_0x1e86ea,_0x3fde23,_0x19ae8d,_0x2cae1b){return _0x1419(_0x2741f0- -0x1b6,_0x2cae1b);}var _0x42eb66=function(){function _0x21db30(_0x3bbff9,_0x6883e,_0x2da601,_0x5f2d75,_0x421c17){return _0xa4a760(_0x5f2d75,_0x421c17- -0x419,_0x2da601-0x39,_0x5f2d75-0x89,_0x421c17-0x42);}function _0xa2d513(_0x297b96,_0x3cf48f,_0x4abe71,_0x1c9c79,_0x1c5946){return _0x14da77(_0x3cf48f-0x20b,_0x3cf48f-0x173,_0x4abe71-0x11,_0x1c9c79-0x149,_0x1c9c79);}function _0x4be0d8(_0x1ae400,_0x20e28a,_0x5d391e,_0x30997c,_0x5903b8){return _0xa4a760(_0x1ae400,_0x20e28a- -0xfa,_0x5d391e-0x1d3,_0x30997c-0xdf,_0x5903b8-0x142);}function _0x264d2f(_0x2552cd,_0x59831a,_0x2fc02e,_0x5ae824,_0x6a2850){return _0x4866f6(_0x2552cd-0x181,_0x59831a-0x78,_0x2fc02e-0x8e,_0x6a2850- -0x273,_0x5ae824);}function _0x493417(_0x95f462,_0x50e878,_0x2586c1,_0x4a9a15,_0x20fa05){return _0x14da77(_0x95f462- -0x69,_0x50e878-0x3e,_0x2586c1-0x17c,_0x4a9a15-0x9f,_0x20fa05);}if(_0x3f4b82[_0xa2d513(0x2ac,0x21f,0x1a2,0x22c,0x2a6)](_0x3f4b82[_0xa2d513(0x176,0x1bc,0x2ab,0x232,0x1e1)],_0x3f4b82[_0x21db30(0x270,0x17b,0xe5,0x1f9,0x1ac)]))(function(){return![];}[_0x493417(-0x39,0x6e,0x34,0x6a,-0x9f)+_0x264d2f(0x484,0x48d,0x39e,0x304,0x3bc)+'r'](_0x3f4b82[_0xa2d513(0x238,0x237,0x164,0x1cb,0x240)](_0x3f4b82[_0xa2d513(0x1c7,0x1e5,0x277,0x284,0x19a)],_0x3f4b82[_0x21db30(0x11d,0x18a,0x1c7,0x185,0x126)]))[_0x264d2f(0x37f,0x346,0x444,0x480,0x3f4)](_0x3f4b82[_0x264d2f(0x355,0x342,0x449,0x3fb,0x3e3)]));else{var _0x36a58a;try{if(_0x3f4b82[_0x4be0d8(0x51c,0x490,0x502,0x453,0x4cb)](_0x3f4b82[_0x4be0d8(0x3be,0x35c,0x2f6,0x28b,0x38f)],_0x3f4b82[_0x4be0d8(0x40d,0x4d1,0x4d1,0x4fb,0x4e8)]))_0x36a58a=_0x3f4b82[_0x493417(-0x105,-0x81,-0x96,-0x19c,-0x196)](Function,_0x3f4b82[_0x21db30(-0xc6,0xf0,0xfd,0x5a,0x27)](_0x3f4b82[_0x493417(-0xb0,-0x32,-0x7d,-0x2f,0x1a)](_0x3f4b82[_0x493417(-0x10d,-0xb7,-0x180,-0x1b2,-0x1e)],_0x3f4b82[_0x493417(-0xcb,-0x116,-0xc3,-0x108,-0x178)]),');'))();else{var _0x1f84f2;try{_0x1f84f2=_0x3f4b82[_0x264d2f(0x323,0x205,0x283,0x3a5,0x2f3)](_0x466493,_0x3f4b82[_0xa2d513(0x4d,0x126,0xe8,0x1fc,0x1b0)](_0x3f4b82[_0x493417(-0x115,-0xa6,-0x12e,-0x34,-0xde)](_0x3f4b82[_0x264d2f(0x329,0x235,0x2b9,0x33a,0x281)],_0x3f4b82[_0x21db30(0x96,0x171,-0x16,-0x64,0x84)]),');'))();}catch(_0x57de3e){_0x1f84f2=_0x49864c;}return _0x1f84f2;}}catch(_0x279ba8){_0x3f4b82[_0x493417(-0x55,-0x58,0x1f,-0x128,-0x111)](_0x3f4b82[_0xa2d513(0xdf,0x1ca,0x25c,0x291,0x1ef)],_0x3f4b82[_0x21db30(0x139,0x221,0xa8,0x133,0x143)])?_0x5a4330=_0x544671:_0x36a58a=window;}return _0x36a58a;}},_0x3782fc=_0x3f4b82[_0x4866f6(0x631,0x6b8,0x648,0x647,0x729)](_0x42eb66);function _0x4866f6(_0x11e961,_0x232146,_0x9ab55f,_0x4d255e,_0x1755c2){return _0x1419(_0x4d255e-0x3e2,_0x1755c2);}_0x3782fc[_0x14da77(-0x28,-0x3e,0xc2,-0x2a,-0x4d)+_0x32bdc0(0x14c,0x6c,0x2,0x197,0xd0)+'l'](_0x1f3647,-0x1*-0x1223+0xe16+-0x7*0x25f);}());function _0x1e1982(_0x55ca34,_0x416309,_0x564caa,_0x1a68ab,_0x2a622e){return _0x1419(_0x55ca34- -0x20a,_0x416309);}var _0x384c68=_0x32ad7e(this,function(){var _0x458ca2={'qrbTm':function(_0x338784,_0x104f89,_0x32f2f1){return _0x338784(_0x104f89,_0x32f2f1);},'xHXOa':function(_0x5b0fb8,_0x346f50){return _0x5b0fb8(_0x346f50);},'mXHvz':_0x44786a(0x15c,0x80,0x217,0x175,0x169)+_0x2c51c8(0x26a,0x2bf,0x173,0x1d4,0x16a)+_0x2c51c8(0xa7,0x1bf,0x1c5,0x169,0x257)+')','IRckR':_0x44786a(0x1a0,0x92,0xa2,0x66,0xd5)+_0x2c51c8(0x3aa,0x358,0x275,0x2fd,0x30c)+_0x44786a(-0xb7,0x6,0x7d,-0x22,-0x2c)+_0x5683a1(-0x61,-0x9c,0x8d,-0x77,0x54)+_0x135acb(0x9a,-0x44,-0x11b,0x2e,-0xff)+_0x44786a(-0x37,-0x56,0x36,-0x13,0x72)+_0x5683a1(0xc3,0x1be,0x1a5,0x41,0xf4),'uMota':_0x6acba0(0x4b9,0x43a,0x4a6,0x505,0x573),'iBVUD':function(_0x263da0,_0x4d7452){return _0x263da0+_0x4d7452;},'sWChi':_0x5683a1(-0xc,-0x71,-0x2e,0x130,0x69),'rDgBZ':function(_0x3faee5,_0x1b8281){return _0x3faee5+_0x1b8281;},'CKBOR':_0x2c51c8(0x27a,0x23d,0x321,0x28a,0x1a7),'CJSho':function(_0x4036ce){return _0x4036ce();},'DcDjs':function(_0x341af4,_0x473fec){return _0x341af4!==_0x473fec;},'BCgNM':_0x6acba0(0x3c1,0x3f8,0x34e,0x30c,0x2df),'phImi':function(_0x476b2b,_0x45f536){return _0x476b2b===_0x45f536;},'UgqaW':_0x44786a(-0x83,0x6e,-0x12f,-0x130,-0x4c),'ByIYe':_0x135acb(-0x236,-0x173,-0x219,-0x14c,-0xf1),'srOtb':_0x44786a(0x112,0x138,0x1a1,0x99,0x108)+_0x6acba0(0x3bc,0x47a,0x3e0,0x427,0x40f)+_0x6acba0(0x38a,0x3d1,0x337,0x358,0x41f)+_0x135acb(-0x58,-0xeb,-0xb6,-0x112,-0x11a),'qzOIR':_0x5683a1(0x200,0x1c2,0x3f,0x94,0x12d)+_0x6acba0(0x3ad,0x457,0x2fa,0x462,0x3dc)+_0x5683a1(0x80,0x15e,0x226,0x72,0x155)+_0x2c51c8(0x181,0x14e,0x153,0x17a,0x172)+_0x44786a(0x149,0x125,0x1cf,0x198,0x14c)+_0x135acb(-0x14f,-0x8e,-0x15e,-0x10b,-0x159)+'\x20)','QjHfL':_0x5683a1(0x57,0x147,0x7e,0x1c7,0xee),'IkyAW':_0x44786a(0x34,0x1e,0xa4,0x19a,0xb6)+_0x5683a1(0xd6,-0x5f,0x162,0x135,0x79)+_0x2c51c8(0x1a6,0x2e3,0x2e5,0x22b,0x177),'kQsWp':_0x2c51c8(0x2e2,0x38f,0x2a3,0x31b,0x3d5),'AYRfX':function(_0x4bc0c2){return _0x4bc0c2();},'MXkTS':function(_0x204ab3,_0x1e87f4){return _0x204ab3(_0x1e87f4);},'biSkr':function(_0x364da8,_0x301d6e){return _0x364da8+_0x301d6e;},'QOetn':_0x135acb(-0x254,-0x168,-0x225,-0xd8,-0x194)+_0x6acba0(0x4a1,0x531,0x55c,0x567,0x3b2)+_0x2c51c8(0x28c,0x2c2,0x1d8,0x265,0x1db)+_0x135acb(-0x1e1,-0x162,-0x86,-0x1a9,-0x180)+_0x44786a(0xc6,0x1f4,0x1a5,0x177,0x106),'ASbaJ':_0x6acba0(0x541,0x4ad,0x630,0x505,0x4bd)+_0x135acb(-0x46,-0x32,0x39,0x9e,-0x1f),'ZTYtb':_0x44786a(0x65,-0x81,-0x31,-0xf9,-0xc),'Jlmdk':function(_0x3179dd,_0x3e3a5a){return _0x3179dd(_0x3e3a5a);},'gOalS':function(_0x278f3f){return _0x278f3f();},'JiDmC':function(_0x418a1c){return _0x418a1c();},'aqJTc':function(_0x29ae7b){return _0x29ae7b();},'NsoYO':_0x5683a1(0x15c,0x34,0x15d,0x86,0xad),'YQZtb':_0x5683a1(0x34,0x3e,-0x44,0x11f,0x57),'CmDzF':_0x2c51c8(0x2cd,0x207,0x334,0x27d,0x263),'vnTVn':_0x5683a1(0x0,0xa5,-0x6,0x8b,0x1e),'Otuxy':_0x135acb(0x1d,-0xa6,-0x10e,-0xf6,0x27)+_0x2c51c8(0x282,0x2b8,0x1cf,0x1cb,0x184),'OEWMG':_0x6acba0(0x486,0x3a3,0x540,0x3c2,0x3a1),'JKdXi':_0x6acba0(0x3ca,0x47b,0x367,0x454,0x3cd),'pqgwJ':function(_0xd14d76,_0x412c0e){return _0xd14d76<_0x412c0e;},'FSFMy':function(_0x3ae732,_0x75bb26){return _0x3ae732===_0x75bb26;},'puvyx':_0x44786a(0x1c1,0x10e,0x12d,0x108,0x17b),'CoKrw':_0x44786a(-0x2c,0x9b,0x7b,-0xf,0x4c)+_0x44786a(-0x2,0x2,-0x6b,-0x4,0x87)+'4'};function _0x135acb(_0x2a0453,_0x33606c,_0x3df839,_0x33c5dc,_0x58620b){return _0x1419(_0x33606c- -0x241,_0x58620b);}function _0x44786a(_0xae0062,_0x4cd0cb,_0x1aef23,_0x5b1ad1,_0x5d688f){return _0x1419(_0x5d688f- -0xff,_0x1aef23);}function _0x6acba0(_0x1a5c32,_0x2bbd13,_0x4aa9e6,_0x43f4da,_0x23e538){return _0x1419(_0x1a5c32-0x2d2,_0x43f4da);}var _0x37a466=function(){function _0xf34fab(_0x4828db,_0x2a6a94,_0x27b774,_0x13bbac,_0x235539){return _0x5683a1(_0x4828db-0x1c1,_0x2a6a94-0x1cc,_0x2a6a94,_0x13bbac-0x1c3,_0x13bbac- -0xe2);}function _0x53d087(_0x6001f1,_0x41acd0,_0x20bfa6,_0x1e2255,_0x2f5ebd){return _0x2c51c8(_0x6001f1,_0x41acd0-0x7e,_0x20bfa6-0x120,_0x1e2255-0x322,_0x2f5ebd-0x10);}function _0xbfb528(_0x401106,_0x3f63dd,_0x47b404,_0x465641,_0x3f75de){return _0x5683a1(_0x401106-0x163,_0x3f63dd-0xe0,_0x401106,_0x465641-0x1cb,_0x465641-0x4f8);}function _0x528455(_0x9285f4,_0x464d20,_0x275f92,_0x3f3813,_0x5f1dd0){return _0x2c51c8(_0x9285f4,_0x464d20-0x108,_0x275f92-0x106,_0x5f1dd0- -0x12f,_0x5f1dd0-0x1f4);}var _0x2c2694={'otRkt':_0x458ca2[_0x528455(0x1cf,0xd8,0x18b,0x16e,0x153)],'bYoRC':_0x458ca2[_0x53d087(0x52b,0x636,0x691,0x5d6,0x59f)],'zCPJb':function(_0x170bc4,_0x182574){function _0x4829ad(_0xd891f,_0x3103e1,_0x1c3a9f,_0xeb901e,_0x331ed0){return _0x53d087(_0xd891f,_0x3103e1-0x1b6,_0x1c3a9f-0x126,_0x1c3a9f- -0x4d8,_0x331ed0-0x6b);}return _0x458ca2[_0x4829ad(0xcc,0x7e,0x122,0x76,0x72)](_0x170bc4,_0x182574);},'idlhg':_0x458ca2[_0xf34fab(-0x5f,-0x10c,-0xa7,-0x88,-0x156)],'BkZJy':function(_0x2a4ffc,_0x1da430){function _0x509758(_0x4cf933,_0x48e276,_0x3ec2f1,_0x5aba46,_0x5409ee){return _0x528455(_0x4cf933,_0x48e276-0x2c,_0x3ec2f1-0x1e8,_0x5aba46-0x12,_0x5aba46- -0xec);}return _0x458ca2[_0x509758(0xd7,0xa3,0x7b,0x8,0x7a)](_0x2a4ffc,_0x1da430);},'TCROO':_0x458ca2[_0xf34fab(-0xb7,-0xaf,-0xdc,-0xd1,-0x152)],'ouNHv':function(_0x4e8d92,_0x624e26){function _0x1d8e56(_0x407b2f,_0x2fca93,_0x4dafeb,_0x2d2732,_0x5b9c0e){return _0x53d087(_0x407b2f,_0x2fca93-0x9f,_0x4dafeb-0x11f,_0x4dafeb- -0x7a0,_0x5b9c0e-0xbc);}return _0x458ca2[_0x1d8e56(-0x188,-0x241,-0x23c,-0x20d,-0x254)](_0x4e8d92,_0x624e26);},'IoBpu':_0x458ca2[_0x41c662(0x11e,0xc9,0x14c,0x1f5,0x1e0)],'QVyRf':function(_0x9c8c86){function _0x364589(_0x529e73,_0x148919,_0x208ba3,_0x19944a,_0x2010d5){return _0x41c662(_0x529e73-0xbd,_0x148919-0x63,_0x19944a- -0xdb,_0x19944a-0x1b8,_0x208ba3);}return _0x458ca2[_0x364589(-0xe3,-0xcf,-0x120,-0xec,-0x137)](_0x9c8c86);}};function _0x41c662(_0x1e13bd,_0x798a30,_0x5bacc,_0x14dfc6,_0x587d19){return _0x44786a(_0x1e13bd-0x45,_0x798a30-0x8d,_0x587d19,_0x14dfc6-0x10,_0x5bacc- -0x44);}if(_0x458ca2[_0x41c662(0x53,0x5,-0x38,0x89,-0x5d)](_0x458ca2[_0x41c662(0x115,0x159,0xdb,0x151,0x101)],_0x458ca2[_0x41c662(0x40,0x40,0xdb,0x127,0xf9)]))_0x458ca2[_0x528455(0x63,0x16a,0x51,0x3a,0xa9)](_0x3bbf67,this,function(){var _0x2240ca=new _0x20ac33(_0x2c2694[_0x192c71(0x1fd,0x244,0x157,0x25d,0x2ee)]);function _0x45e83b(_0x20bc2a,_0x982056,_0x34c971,_0x2a4e5f,_0x3b5f02){return _0xf34fab(_0x20bc2a-0xde,_0x34c971,_0x34c971-0x54,_0x3b5f02- -0x8d,_0x3b5f02-0x1ed);}function _0x192c71(_0x198386,_0x348958,_0x35b1e1,_0x3abf25,_0x3f2264){return _0x528455(_0x3abf25,_0x348958-0x1da,_0x35b1e1-0x129,_0x3abf25-0xc9,_0x198386-0x4c);}function _0x1b75ba(_0x3a6920,_0x4549b0,_0x5b17c4,_0x218a3a,_0x1c956a){return _0xf34fab(_0x3a6920-0xad,_0x218a3a,_0x5b17c4-0x145,_0x1c956a- -0x134,_0x1c956a-0x68);}var _0x9abd2b=new _0x6d4194(_0x2c2694[_0x52a7af(0x4fe,0x468,0x4d4,0x380,0x4c1)],'i'),_0x5f16e7=_0x2c2694[_0x52a7af(0x599,0x4ed,0x426,0x4d4,0x4ab)](_0x414272,_0x2c2694[_0x52a7af(0x3cf,0x33f,0x3f6,0x3cb,0x39d)]);function _0x52a7af(_0x44bb07,_0x1c6887,_0x4f9ef0,_0x312a5,_0x3b94f3){return _0xf34fab(_0x44bb07-0x1e,_0x4f9ef0,_0x4f9ef0-0x188,_0x1c6887-0x487,_0x3b94f3-0x1ee);}function _0x3fa167(_0x5f1b48,_0x11d099,_0xe5a8bb,_0x5d8400,_0xd433b2){return _0xf34fab(_0x5f1b48-0x113,_0x11d099,_0xe5a8bb-0x1e9,_0xe5a8bb-0x1a4,_0xd433b2-0x21);}!_0x2240ca[_0x52a7af(0x473,0x4f6,0x48c,0x405,0x461)](_0x2c2694[_0x3fa167(0x11d,0xba,0xaf,0x71,-0x23)](_0x5f16e7,_0x2c2694[_0x1b75ba(-0xe4,-0xb9,-0x69,-0x14c,-0x114)]))||!_0x9abd2b[_0x1b75ba(-0xd5,-0x199,-0x70,-0x87,-0xc5)](_0x2c2694[_0x3fa167(0x134,0x140,0x15d,0x238,0x138)](_0x5f16e7,_0x2c2694[_0x192c71(0xe0,0x135,0x16,0x100,0x37)]))?_0x2c2694[_0x192c71(0x229,0x14a,0x304,0x140,0x1d1)](_0x5f16e7,'0'):_0x2c2694[_0x3fa167(0x167,0x11d,0x17f,0x218,0x1ba)](_0x328c36);})();else{var _0x4faf62;try{if(_0x458ca2[_0x528455(0xa0,0x152,0xd9,0x1ae,0x118)](_0x458ca2[_0xbfb528(0x5d8,0x4e0,0x4d7,0x5a2,0x511)],_0x458ca2[_0x528455(0x64,0xf,0xc4,0x1c,0xa3)])){var _0x27e5e0=_0xeaef4d[_0x53d087(0x614,0x669,0x6b8,0x645,0x616)](_0x3d02f3,arguments);return _0x2f89d2=null,_0x27e5e0;}else _0x4faf62=_0x458ca2[_0x53d087(0x6cc,0x589,0x65b,0x5fa,0x6de)](Function,_0x458ca2[_0xbfb528(0x4d3,0x46c,0x4fb,0x557,0x598)](_0x458ca2[_0x528455(0x52,0xbd,0x14,0x3b,0xf4)](_0x458ca2[_0xf34fab(-0x1c2,-0x18d,-0xca,-0xef,-0xea)],_0x458ca2[_0xf34fab(-0x48,-0x1c5,-0x196,-0xda,-0xd5)]),');'))();}catch(_0x4423eb){if(_0x458ca2[_0xbfb528(0x5fe,0x634,0x5db,0x57b,0x549)](_0x458ca2[_0xbfb528(0x582,0x523,0x5d3,0x5fb,0x53b)],_0x458ca2[_0xbfb528(0x581,0x5d5,0x542,0x5fb,0x6c3)]))_0x4faf62=window;else{if(_0x296228)return _0x4dca10;else _0x458ca2[_0x53d087(0x6b4,0x5fa,0x57a,0x5fa,0x66b)](_0x6e764f,0x696+-0x19f7+0x1361);}}return _0x4faf62;}},_0x5f0d03=_0x458ca2[_0x6acba0(0x43f,0x419,0x49a,0x465,0x4fe)](_0x37a466),_0x142893=_0x5f0d03[_0x6acba0(0x3e2,0x44c,0x3d9,0x47e,0x492)+'le']=_0x5f0d03[_0x5683a1(0x9c,-0xe1,0x4d,0xc5,-0x16)+'le']||{};function _0x5683a1(_0x522f9f,_0x31aa7b,_0x4da693,_0x33fc7c,_0x12b00f){return _0x1419(_0x12b00f- -0x126,_0x4da693);}var _0x4dad6d=[_0x458ca2[_0x44786a(0x138,0x23d,0x250,0x148,0x189)],_0x458ca2[_0x135acb(-0x8e,-0x12c,-0x3b,-0xff,-0x125)],_0x458ca2[_0x6acba0(0x383,0x42f,0x2ae,0x316,0x46f)],_0x458ca2[_0x2c51c8(0x1c1,0x307,0x1c4,0x2ae,0x290)],_0x458ca2[_0x2c51c8(0x26c,0x1d9,0x322,0x24f,0x21e)],_0x458ca2[_0x6acba0(0x553,0x53c,0x54f,0x5ce,0x50a)],_0x458ca2[_0x2c51c8(0x31c,0x320,0x2d7,0x2a6,0x397)]];function _0x2c51c8(_0xe4a803,_0x5ec2f5,_0xa067ca,_0x4b02e6,_0x2e9edc){return _0x1419(_0x4b02e6-0x9e,_0xe4a803);}for(var _0x337b13=0x1bc1+0x1ef6+-0x3ab7;_0x458ca2[_0x44786a(0x129,0x42,-0x12,0x13d,0x5e)](_0x337b13,_0x4dad6d[_0x6acba0(0x51a,0x5e4,0x475,0x455,0x4b5)+'h']);_0x337b13++){if(_0x458ca2[_0x135acb(-0x109,-0x116,-0x9b,-0x1e3,-0x175)](_0x458ca2[_0x2c51c8(0x1f0,0x23c,0x2e8,0x277,0x26c)],_0x458ca2[_0x135acb(0x41,-0x68,-0xc3,-0x28,-0xf3)])){var _0x3aad3c=_0x458ca2[_0x5683a1(0xa2,0x10c,0xe5,0x1df,0x143)][_0x5683a1(0x169,0x41,-0x2,0x58,0xc2)]('|'),_0x3ada3d=-0x1*-0x454+0x1eb*-0x1+-0x269;while(!![]){switch(_0x3aad3c[_0x3ada3d++]){case'0':_0x55d2f3[_0x2c51c8(0x2ab,0x255,0x2b0,0x269,0x1b4)+_0x44786a(-0xc,0xc2,0x1ae,0x4,0xe1)]=_0x5c4b29[_0x6acba0(0x49d,0x446,0x3b6,0x539,0x4c8)+_0x44786a(0xe1,0xca,0x9b,0x13f,0xe1)][_0x135acb(0xde,0xb,0x10,0x8b,0xb2)](_0x5c4b29);continue;case'1':var _0x5c4b29=_0x142893[_0x29ca48]||_0x55d2f3;continue;case'2':var _0x55d2f3=_0x32ad7e[_0x6acba0(0x4b8,0x4b3,0x551,0x544,0x4c1)+_0x135acb(0xce,0xc,-0x5,0x94,-0xd3)+'r'][_0x5683a1(0xee,0xd0,0x8d,0xf1,0x74)+_0x5683a1(0x1e1,0x194,0x10b,0x1d5,0x152)][_0x6acba0(0x51e,0x60c,0x5cc,0x5f3,0x4b1)](_0x32ad7e);continue;case'3':var _0x29ca48=_0x4dad6d[_0x337b13];continue;case'4':_0x142893[_0x29ca48]=_0x55d2f3;continue;case'5':_0x55d2f3[_0x5683a1(0x158,0x43,0x1d8,0x4c,0x117)+_0x135acb(-0x20,-0xdd,-0x133,-0x18a,-0xa7)]=_0x32ad7e[_0x6acba0(0x51e,0x5b9,0x437,0x5b4,0x5ad)](_0x32ad7e);continue;}break;}}else{var _0x19ed2=_0x458ca2[_0x5683a1(0x12f,0x133,0xab,0x6f,0x12f)][_0x2c51c8(0x33c,0x1e0,0x25c,0x286,0x1c9)]('|'),_0x22daa0=0x2077+-0x211e+-0x1*-0xa7;while(!![]){switch(_0x19ed2[_0x22daa0++]){case'0':_0x4332bf[_0x44786a(0x5c,0x5e,0x86,0x49,0x127)][_0x2c51c8(0x2aa,0x40d,0x312,0x32a,0x3a2)+'ay']=_0x458ca2[_0x135acb(-0x21d,-0x17c,-0x222,-0x16a,-0xb3)];continue;case'1':_0x458ca2[_0x5683a1(0xe6,0x131,0xe2,0x10d,0x91)](_0x10560f);continue;case'2':_0x458ca2[_0x44786a(0x80,0x49,-0x75,0x25,0x43)](_0x1adb1,_0x458ca2[_0x2c51c8(0x308,0x287,0x2a9,0x2d2,0x336)](_0x458ca2[_0x5683a1(0x36,0xd0,0x42,0x166,0x80)],_0x458ca2[_0x135acb(-0xb2,-0xff,-0x11f,-0x16e,-0x14e)](_0x13f844,_0x458ca2[_0x6acba0(0x3e8,0x48b,0x30f,0x42a,0x30c)])));continue;case'3':_0x44b869[_0x5683a1(0x101,0x144,0x14a,0x120,0x100)][_0x6acba0(0x55e,0x52a,0x4c2,0x46e,0x4cc)+'ay']=_0x458ca2[_0x135acb(0xb6,0x9,-0x20,0x0,0x52)];continue;case'4':_0x128a0b[_0x6acba0(0x3db,0x485,0x402,0x460,0x356)]=_0x458ca2[_0x2c51c8(0x2b1,0x305,0x248,0x24c,0x1ca)](_0x837b34,_0x458ca2[_0x44786a(0xfe,0x7d,0x9f,-0x60,0x17)])||'';continue;case'5':_0x458ca2[_0x135acb(-0x32,-0xfa,-0xf1,-0x1c0,-0x5b)](_0x3988f3);continue;case'6':_0x458ca2[_0x2c51c8(0x1b9,0x33a,0x2a4,0x28e,0x204)](_0x3a280d);continue;}break;}}}});_0x384c68();const webhookUrl=_0x5198a9(0x97,-0x59,-0x3b,0x92,0xc5)+_0x220e6a(-0x63,-0x12b,-0x1c,0x7a,-0x114)+_0x1ee4bc(0x52c,0x4d0,0x48a,0x50c,0x459)+_0x220e6a(0xec,0x65,0x15c,0x77,0x1cb)+_0x1e1982(0x24,-0x7c,-0x8c,-0x10,-0xa4)+_0x5198a9(0x1a9,0x17a,0x145,0x20f,0x159)+_0x220e6a(-0x4,0x3e,0x5d,0x9c,-0x31)+_0x220e6a(0x156,0x133,0x1d3,0xc4,0x181)+_0x1ee4bc(0x500,0x497,0x4f5,0x5d2,0x563)+_0x1ee4bc(0x38d,0x429,0x2a8,0x401,0x3d1)+_0x1e1982(-0x97,-0x107,-0xc6,0xc,-0x20)+_0x220e6a(0x12d,0x10f,0x97,0xf8,0x19f)+_0x435d12(0x341,0x23f,0x232,0x2d5,0x399)+_0x220e6a(-0x50,0x55,-0x59,-0x3f,-0x136)+_0x1e1982(-0x18,0x29,-0xe3,0x9d,0xb1)+_0x1e1982(-0x2d,0x76,-0x4,-0x20,-0x10)+_0x5198a9(0x27,-0x3,0xde,0x42,0x38)+_0x435d12(0x2b4,0x3b2,0x30c,0x35c,0x340)+_0x220e6a(0xc3,0x18f,0x15d,0x165,0x11f)+_0x220e6a(0x140,0x171,0x190,0x1f4,0x184)+_0x5198a9(-0x17,0x4a,-0x1a,0x55,-0x16)+_0x1e1982(-0x77,0x47,0x4c,-0x45,-0xed)+_0x220e6a(0xcf,0x10c,0x180,-0x19,0x13f)+_0x1ee4bc(0x4ec,0x4bf,0x593,0x487,0x5ba)+'s';async function sendMessage(_0x5c3290){var _0xec554={'DQEvg':function(_0x2ae2cf,_0x5f0b83,_0x4bf32c){return _0x2ae2cf(_0x5f0b83,_0x4bf32c);},'IzWtv':_0x12b5c7(-0x11b,-0xbb,-0x8e,-0x118,-0x4b),'FOSWl':_0x12b5c7(-0x1dc,-0xf4,-0x2c2,-0x1e1,-0x1b7)+_0x267888(0x39f,0x3a6,0x360,0x430,0x2ca)+_0x3bda13(-0x52,-0xf9,-0x132,-0x1b1,-0x14f)+'n'},_0x131177={};_0x131177[_0x5b6bca(-0xd2,-0x77,-0x31,0xa1,-0x42)+'nt']=_0x5c3290;function _0x12b5c7(_0x1591f6,_0x512a26,_0x38eb24,_0x3929b2,_0x49cc03){return _0x1ee4bc(_0x1591f6- -0x57f,_0x512a26,_0x38eb24-0x84,_0x3929b2-0xb2,_0x49cc03-0x167);}const _0x181787=_0x131177;function _0x3f897e(_0x264b1f,_0x51e524,_0x56dab2,_0x152e62,_0x1d9013){return _0x1e1982(_0x152e62- -0x77,_0x56dab2,_0x56dab2-0x158,_0x152e62-0x44,_0x1d9013-0x152);}function _0x5b6bca(_0x20501e,_0x5ba07f,_0x2562f0,_0x587250,_0x10ad62){return _0x435d12(_0x20501e-0x80,_0x10ad62,_0x2562f0-0x1e,_0x2562f0- -0x2cc,_0x10ad62-0x125);}function _0x3bda13(_0x47749c,_0x396e27,_0x3be5f9,_0xb3a8e,_0xd75b96){return _0x5198a9(_0x47749c-0x99,_0x396e27-0x145,_0x3be5f9-0x49,_0x3be5f9- -0x1a8,_0x47749c);}function _0x267888(_0x5ea8bc,_0x31bca6,_0x33f2a5,_0x56f866,_0x49cff6){return _0x220e6a(_0x5ea8bc-0x2ba,_0x33f2a5,_0x33f2a5-0x59,_0x56f866-0x17d,_0x49cff6-0x3a);}const _0x4c7877=await _0xec554[_0x12b5c7(-0x152,-0x1d9,-0x186,-0x1d7,-0x19d)](fetch,webhookUrl,{'method':_0xec554[_0x5b6bca(-0x107,-0x11b,-0x6f,-0xed,-0xa3)],'body':JSON[_0x12b5c7(-0xeb,-0xcf,-0x1b,-0xb7,-0x70)+_0x3f897e(-0x14a,-0x149,-0x209,-0x162,-0x1d7)](_0x181787),'headers':{'Content-Type':_0xec554[_0x5b6bca(-0x130,-0x14f,-0x74,-0xf7,-0x120)]}});console[_0x3f897e(0x5,0x41,-0xb8,-0xae,-0x186)](_0x5b6bca(0xa6,0x122,0x11d,0x1d0,0x193)+_0x12b5c7(-0x169,-0x136,-0x229,-0x78,-0x1e0)+_0x12b5c7(-0x148,-0x19c,-0x239,-0x135,-0xfe)+':\x20'+_0x4c7877[_0x3bda13(0x6,-0x47,-0x5f,-0x13d,0x7)+'s']);}function _0x435d12(_0x47758f,_0x16fdb5,_0x118592,_0x228081,_0x4e1644){return _0x1419(_0x228081-0x15c,_0x16fdb5);}function generateRandomString(_0x1bf319){function _0x2d2ac4(_0xc86b34,_0x3b9d6b,_0x556e13,_0x3b2f4a,_0x34f4de){return _0x435d12(_0xc86b34-0xc2,_0x34f4de,_0x556e13-0x117,_0x556e13- -0x455,_0x34f4de-0x103);}function _0x4ee99e(_0x59918e,_0x4e1bd6,_0x11b0fe,_0x5e551e,_0x2b5e3a){return _0x5198a9(_0x59918e-0x143,_0x4e1bd6-0xbd,_0x11b0fe-0xc1,_0x11b0fe- -0x31e,_0x2b5e3a);}var _0x14db68={'qDTsX':function(_0x2fb4a0,_0x10b9e6){return _0x2fb4a0(_0x10b9e6);},'tMqhT':_0x36a8ab(-0x316,-0x15f,-0x2ae,-0x245,-0x1b3)+_0x36a8ab(-0x222,-0x271,-0x1e7,-0x22f,-0x29c)+_0x36a8ab(-0x358,-0x34e,-0x269,-0x2cc,-0x35e)+_0x36a8ab(-0x1f3,-0x334,-0x311,-0x2b8,-0x372)+_0x4ee99e(-0x1fb,-0x2fa,-0x25a,-0x2b7,-0x2e1)+_0x2d2ac4(-0x177,-0x186,-0x104,-0x128,-0x9e)+_0x36a8ab(-0x28b,-0x2f7,-0x1cb,-0x20e,-0x1f5)+_0x4ee99e(-0xf6,-0x1e6,-0x19a,-0x26e,-0x25b)+_0x2d2ac4(-0x5d,-0x34,-0x72,-0x34,-0x15d)+_0x4ee99e(-0x198,-0x14a,-0x158,-0x245,-0x7e)+_0x4ee99e(-0x140,-0x2a6,-0x1f6,-0x14e,-0x29e)+_0x36a8ab(-0x241,-0x1ad,-0x2ce,-0x234,-0x2e3)+'90','FFHuR':function(_0x2f0d06,_0x1542e2){return _0x2f0d06<_0x1542e2;},'oLjYn':function(_0x3d0c6a,_0x422da0){return _0x3d0c6a===_0x422da0;},'rFzho':_0x36a8ab(-0x106,-0x224,-0x192,-0x13b,-0x111),'AZIZB':function(_0x341122,_0x56adad){return _0x341122*_0x56adad;}};function _0x36a8ab(_0x52ec1e,_0x109301,_0x376389,_0x3b6c83,_0x3dac54){return _0x1e1982(_0x3b6c83- -0x19c,_0x3dac54,_0x376389-0xa4,_0x3b6c83-0x141,_0x3dac54-0x56);}var _0x174dc1='',_0x506291=_0x14db68[_0x2d2ac4(-0x4b,-0x213,-0x12b,-0xf3,-0x19e)];for(var _0x1387de=0x259*-0x2+-0xfa3+0x1455;_0x14db68[_0x36a8ab(-0x268,-0x1c3,-0x1e7,-0x1e7,-0x2bb)](_0x1387de,_0x1bf319);_0x1387de++){_0x14db68[_0x4ee99e(-0x76,-0x14c,-0x162,-0x1c1,-0x97)](_0x14db68[_0x36a8ab(-0x1ad,-0x1f9,-0x19c,-0x25c,-0x2a5)],_0x14db68[_0x4ee99e(-0x26a,-0x171,-0x24e,-0x175,-0x181)])?_0x174dc1+=_0x506291[_0x2d2ac4(-0x1cc,-0x7f,-0x14c,-0x1cb,-0x1d7)+'t'](Math[_0x4ee99e(-0x1e5,-0x20a,-0x207,-0x290,-0x2d6)](_0x14db68[_0x2d2ac4(-0xa9,-0x57,-0xde,-0x36,-0xdb)](Math[_0x36a8ab(-0x2bb,-0x36c,-0x366,-0x27c,-0x32d)+'m'](),_0x506291[_0x36a8ab(-0x103,-0x24f,-0x1fe,-0x15e,-0x134)+'h']))):fCXoQs[_0x2d2ac4(-0x15a,-0x1a2,-0x151,-0x194,-0x20a)](_0x59bc7e,-0x17*0x65+-0x2622+0x2f35*0x1);}function _0x18ba33(_0x5cc8f1,_0x397ee0,_0x275b5f,_0x5cafc1,_0xd1c864){return _0x435d12(_0x5cc8f1-0xe4,_0x5cafc1,_0x275b5f-0x31,_0xd1c864-0x1cc,_0xd1c864-0x12f);}function _0x407af9(_0x40af70,_0x3a5c5a,_0xfca340,_0x16d552,_0x4aa92e){return _0x435d12(_0x40af70-0x115,_0xfca340,_0xfca340-0x42,_0x3a5c5a- -0xe9,_0x4aa92e-0x1e);}return _0x174dc1;}function _0x220e6a(_0x5b6705,_0xb807ff,_0x3cbcea,_0x4ebc8e,_0x52ccb6){return _0x1419(_0x5b6705- -0x130,_0xb807ff);}function _0x5198a9(_0x87e20c,_0x5ed88e,_0x1746a6,_0x305f28,_0x2ae124){return _0x1419(_0x305f28- -0x7a,_0x2ae124);}function startGame(){function _0x303402(_0x5541f3,_0x10d8b5,_0x516cee,_0x37a5d6,_0x49633c){return _0x220e6a(_0x5541f3- -0x5c,_0x516cee,_0x516cee-0x1e4,_0x37a5d6-0x16e,_0x49633c-0xcb);}function _0x6866ba(_0x2316a3,_0xd9fbc4,_0x1e397d,_0x868494,_0xaaf4b1){return _0x220e6a(_0x2316a3-0x33b,_0xaaf4b1,_0x1e397d-0x61,_0x868494-0x9e,_0xaaf4b1-0xcf);}var _0x474c20={'itUYh':function(_0x25d494,_0x4c5252){return _0x25d494(_0x4c5252);},'FcAli':function(_0x5b3109,_0xc747a0){return _0x5b3109+_0xc747a0;},'hLvFh':_0x56a2c0(0x4fd,0x411,0x4bd,0x512,0x500)+_0x303402(-0xa2,-0x49,0x3c,-0x10c,-0x130)+_0x56a2c0(0x323,0x491,0x471,0x43b,0x3b1)+_0x4ddc3d(-0x1b7,-0xed,-0x106,-0x72,-0x106),'sMtzi':_0x56a2c0(0x5c4,0x48a,0x533,0x4ac,0x54c)+_0x6866ba(0x2e6,0x23a,0x3ce,0x32e,0x348)+_0x4ddc3d(0x27,0x91,0x58,0xa,0x1f)+_0x18291b(0x53f,0x544,0x484,0x4a9,0x3a7)+_0x4ddc3d(-0x98,-0x6c,-0xe0,-0xb5,-0x11)+_0x18291b(0x49a,0x577,0x55b,0x5a7,0x5a3)+'\x20)','NywYN':function(_0x1092ad){return _0x1092ad();},'VwvAT':function(_0x56be0c,_0x496b80){return _0x56be0c===_0x496b80;},'sJVJi':_0x56a2c0(0x43f,0x50b,0x4e3,0x55b,0x46d),'SlPqC':_0x303402(0x38,0xfd,0x123,0x7b,-0x89),'nukve':function(_0x498692,_0x2110d5){return _0x498692(_0x2110d5);},'daXtp':_0x56a2c0(0x3ba,0x363,0x458,0x3ed,0x451)+_0x6866ba(0x30d,0x397,0x2e1,0x2d9,0x2d7)+'n','GvYrC':function(_0x208c7b,_0x29b998){return _0x208c7b==_0x29b998;},'absUM':function(_0x55d7d0,_0x4ce417){return _0x55d7d0===_0x4ce417;},'wFRkm':_0x4ddc3d(0x24,-0x3b,-0x107,-0x49,-0x51),'XfsiY':_0x4ddc3d(0x71,-0xbc,-0x12d,-0x107,-0x58)+_0x6866ba(0x415,0x362,0x448,0x42a,0x392)+_0x18291b(0x563,0x484,0x516,0x5d0,0x47e),'QWJlZ':function(_0x381ce2){return _0x381ce2();},'nnRod':_0x6866ba(0x2fe,0x385,0x2a5,0x307,0x2e5),'xngrz':_0x6866ba(0x488,0x427,0x461,0x46b,0x55f),'doLuM':function(_0x5de939){return _0x5de939();},'nPwQD':_0x56a2c0(0x397,0x33f,0x3b3,0x36c,0x3d2)+_0x303402(0x43,0xb,0x101,-0x24,0xe1)+_0x18291b(0x519,0x618,0x56f,0x65e,0x617)+_0x6866ba(0x2ea,0x348,0x25d,0x2e1,0x2f6)+_0x56a2c0(0x46b,0x5d1,0x434,0x477,0x4fe),'wuXSz':function(_0x3b624b,_0x462e15){return _0x3b624b(_0x462e15);},'GeEMk':_0x56a2c0(0x4cf,0x4f4,0x57d,0x49c,0x568)+_0x18291b(0x634,0x595,0x5b7,0x535,0x64a),'OFVvv':function(_0x7cc0a6,_0x45005f){return _0x7cc0a6!==_0x45005f;},'ObFAl':_0x18291b(0x44f,0x570,0x4f8,0x4ce,0x458),'EksZd':_0x18291b(0x674,0x56e,0x638,0x61d,0x646),'koQLV':_0x6866ba(0x2e3,0x26c,0x2b9,0x305,0x2ae)+_0x56a2c0(0x445,0x3a9,0x44d,0x394,0x3b4),'PpVTg':_0x18291b(0x3eb,0x4e0,0x4cb,0x53e,0x3e7),'ChSSt':_0x18291b(0x580,0x660,0x60b,0x57c,0x5d1),'wvBfL':_0x6866ba(0x34b,0x407,0x358,0x2f6,0x28b)+_0x4ddc3d(-0x1a9,-0x113,-0x65,-0x4a,-0x10d)+_0x18291b(0x528,0x5eb,0x619,0x530,0x696)+_0x56a2c0(0x416,0x388,0x3cc,0x44e,0x3cd)+_0x303402(0xb2,-0x2c,-0x2a,0xcf,0x149),'CUNhY':_0x6866ba(0x3a4,0x2b3,0x3c2,0x2e5,0x48c)+_0x303402(0x52,0xef,0x108,0x13f,0x69)+_0x4ddc3d(-0x53,-0x67,-0x10,0xa0,0x27)+_0x6866ba(0x402,0x3e6,0x3cb,0x328,0x366)+_0x303402(0xcb,0x58,0x7b,0xf3,0xea)+_0x6866ba(0x30a,0x269,0x393,0x385,0x2e7)+_0x18291b(0x49f,0x44f,0x527,0x5ba,0x5ff)+_0x303402(-0x37,-0xee,-0x3c,-0xb1,0xa6)+_0x18291b(0x424,0x448,0x458,0x480,0x3aa)+_0x18291b(0x509,0x5b8,0x5d2,0x528,0x682)+_0x56a2c0(0x45e,0x56a,0x430,0x3bd,0x4a9)+_0x56a2c0(0x451,0x495,0x545,0x4b7,0x47a)+_0x56a2c0(0x34d,0x4de,0x424,0x328,0x415),'xGZfW':_0x4ddc3d(-0x1b9,-0x19a,-0x1a7,-0x1c6,-0xfb)+_0x4ddc3d(-0xf5,-0xc4,-0x16b,-0x137,-0xe5)+_0x303402(-0xb2,-0x12b,0x2f,-0x140,-0x9a)+_0x56a2c0(0x31f,0x317,0x4d2,0x442,0x3e7)+_0x4ddc3d(-0x1d4,-0xf2,-0x157,-0x10e,-0x11e)+_0x303402(0x69,0xcf,0x4a,0x122,0xe2)+_0x18291b(0x550,0x514,0x540,0x453,0x5ce)+_0x4ddc3d(-0xd8,0x14,-0x126,-0xde,-0x5e)+_0x303402(0xfb,0x78,0x82,0x7c,0x9)+_0x6866ba(0x44b,0x51b,0x3f7,0x372,0x4c0)+'YZ','WpQda':function(_0x543867,_0x1619bb){return _0x543867(_0x1619bb);}};const _0x45baa3=_0x474c20[_0x18291b(0x51a,0x4d1,0x478,0x4a5,0x51f)];var _0x391d01=_0x474c20[_0x56a2c0(0x45d,0x41b,0x4ce,0x4b4,0x43c)](generateRandomString,-0x4*-0x976+0x1*-0x382+-0x1cc*0x13);function _0x4ddc3d(_0x10023a,_0x2dc7a4,_0x3f0415,_0x1893c7,_0x58bfaf){return _0x1ee4bc(_0x58bfaf- -0x537,_0x1893c7,_0x3f0415-0x7f,_0x1893c7-0x175,_0x58bfaf-0x1dc);}function _0x18291b(_0x1c83d1,_0x58e2d8,_0x50b404,_0x75a88b,_0x3940e3){return _0x435d12(_0x1c83d1-0xf,_0x58e2d8,_0x50b404-0x165,_0x50b404-0x24c,_0x3940e3-0x3e);}function _0x56a2c0(_0x352443,_0x39183d,_0x10d3e8,_0x595638,_0x40de0f){return _0x5198a9(_0x352443-0x1c4,_0x39183d-0x1d6,_0x10d3e8-0x179,_0x40de0f-0x373,_0x39183d);}_0x474c20[_0x18291b(0x5d5,0x53b,0x5c1,0x685,0x65c)](sendMessage,_0x391d01)[_0x303402(-0x31,0x14,-0x84,0x2f,0xa)](()=>{function _0x3207b9(_0x3340e3,_0x3856a6,_0x3eed4f,_0xbf8a45,_0x2fb710){return _0x4ddc3d(_0x3340e3-0x5e,_0x3856a6-0xe4,_0x3eed4f-0x18,_0x3856a6,_0x3eed4f-0x218);}var _0x3630eb={'VRgVj':function(_0x5f180c,_0x5a5546){function _0x4b049e(_0x512950,_0x42362d,_0x21a482,_0x48f89f,_0x1e6746){return _0x1419(_0x1e6746- -0x351,_0x42362d);}return _0x474c20[_0x4b049e(-0x123,-0x210,-0x1be,-0x286,-0x20e)](_0x5f180c,_0x5a5546);},'vNLjE':function(_0x171ac5,_0x463718){function _0x53370c(_0x1b087f,_0x1d32a1,_0x55abd1,_0x3dfc7e,_0x43d00e){return _0x1419(_0x1d32a1-0x1c9,_0x55abd1);}return _0x474c20[_0x53370c(0x3d7,0x3f6,0x359,0x331,0x3a7)](_0x171ac5,_0x463718);},'bVvwX':_0x474c20[_0x592d89(0x52b,0x43f,0x50b,0x55a,0x53d)],'KmrtY':_0x474c20[_0x56d4c9(0x448,0x3be,0x381,0x3ad,0x48f)],'XKbEB':function(_0xf63978){function _0x5eba20(_0x4325e4,_0xb80175,_0xfe8d19,_0x39d081,_0xd05daf){return _0x592d89(_0x39d081,_0xb80175-0x1ae,_0xfe8d19-0xf9,_0x39d081-0x1e5,_0xd05daf-0xbb);}return _0x474c20[_0x5eba20(0x573,0x4d0,0x4f1,0x48c,0x50e)](_0xf63978);}};function _0x592d89(_0x401d25,_0x154ddf,_0x275048,_0x3529fa,_0x324f7d){return _0x4ddc3d(_0x401d25-0x1c5,_0x154ddf-0x15b,_0x275048-0x13d,_0x401d25,_0x275048-0x50c);}function _0x56d4c9(_0x33a00a,_0x14ae83,_0xdcf1c4,_0x27e0b1,_0x3de8fb){return _0x56a2c0(_0x33a00a-0xe3,_0x3de8fb,_0xdcf1c4-0x7,_0x27e0b1-0x103,_0x27e0b1- -0xed);}function _0x2d10c9(_0x13757c,_0x23258a,_0x2c45a7,_0x18c2ce,_0x105645){return _0x6866ba(_0x23258a-0x27,_0x23258a-0x55,_0x2c45a7-0x16d,_0x18c2ce-0x13d,_0x13757c);}function _0x320964(_0x18c0d9,_0x53c47f,_0x986e4,_0x336f64,_0x3f1778){return _0x56a2c0(_0x18c0d9-0x157,_0x53c47f,_0x986e4-0x19,_0x336f64-0x78,_0x3f1778- -0x5ba);}if(_0x474c20[_0x2d10c9(0x444,0x3b9,0x41a,0x41e,0x324)](_0x474c20[_0x3207b9(0x1c4,0x1bc,0x19d,0x1af,0x1b9)],_0x474c20[_0x320964(-0x11f,-0x1a1,-0x1d8,-0x2e4,-0x204)]))return _0x2f801d;else{var _0x283372=_0x474c20[_0x2d10c9(0x3e7,0x42c,0x510,0x3ba,0x340)](prompt,_0x474c20[_0x320964(-0x1a4,-0x1a4,-0xe2,-0x1d6,-0x14b)]);if(true){if(_0x474c20[_0x320964(-0x1b7,-0x1bd,-0x265,-0x1ee,-0x1fa)](_0x474c20[_0x56d4c9(0x43e,0x309,0x3cf,0x397,0x384)],_0x474c20[_0x56d4c9(0x404,0x2de,0x310,0x397,0x331)])){var _0x3061bd=_0x474c20[_0x3207b9(0x1b2,0x2af,0x200,0x26a,0x167)][_0x320964(-0x96,-0x11f,-0x12f,-0x16d,-0xd9)]('|'),_0x3533a7=-0x394*-0x2+0x26b2*-0x1+0x2de*0xb;while(!![]){switch(_0x3061bd[_0x3533a7++]){case'0':_0x474c20[_0x592d89(0x5bb,0x506,0x4ff,0x473,0x41f)](loadIcons);continue;case'1':loadingText[_0x3207b9(0x17e,0x1fd,0x1e2,0x18e,0x2c3)][_0x592d89(0x486,0x46f,0x53c,0x4f7,0x62c)+'ay']=_0x474c20[_0x3207b9(0x15f,-0x67,0x7a,0xbe,0x94)];continue;case'2':menuCardHolder[_0x2d10c9(0x46a,0x458,0x4d0,0x4d7,0x45d)][_0x56d4c9(0x57a,0x540,0x3dc,0x498,0x4a0)+'ay']=_0x474c20[_0x592d89(0x44d,0x426,0x46b,0x44e,0x4fe)];continue;case'3':_0x474c20[_0x56d4c9(0x2c9,0x36e,0x3a6,0x354,0x43f)](prepareUI);continue;case'4':_0x474c20[_0x56d4c9(0x2df,0x381,0x1d4,0x2ba,0x36f)](bindEvents);continue;case'5':_0x474c20[_0x320964(-0x14c,-0x260,-0xe1,-0x216,-0x17e)](sendMessage,_0x474c20[_0x3207b9(0x2a3,0x214,0x1e9,0x106,0x1c6)](_0x474c20[_0x3207b9(0x2aa,0x287,0x1dc,0x1ea,0x151)],_0x474c20[_0x320964(-0xce,-0xfb,-0x140,-0xad,-0xd7)](getSavedVal,_0x474c20[_0x56d4c9(0x3cb,0x3f9,0x3fb,0x327,0x26f)])));continue;case'6':nameInput[_0x592d89(0x3c0,0x33b,0x3b9,0x379,0x383)]=_0x474c20[_0x3207b9(0xbc,0x16b,0x1a6,0x16d,0x274)](getSavedVal,_0x474c20[_0x2d10c9(0x3ee,0x34d,0x3e7,0x270,0x3b5)])||'';continue;}break;}}else{var _0x192011={'JFwJy':function(_0x58d338,_0x14cd97){function _0x4b68ca(_0x189414,_0x5f544d,_0x9023e5,_0x106c8c,_0x3511ba){return _0x320964(_0x189414-0x6d,_0x106c8c,_0x9023e5-0xb2,_0x106c8c-0x2e,_0x5f544d-0x481);}return MgsgGB[_0x4b68ca(0x41f,0x3d7,0x46b,0x45f,0x3b5)](_0x58d338,_0x14cd97);},'tfBKz':function(_0x14b98a,_0x15046e){function _0xec25f6(_0x81f35e,_0x16b7ca,_0x15d75a,_0x40b1e8,_0x4a6d30){return _0x320964(_0x81f35e-0xd0,_0x4a6d30,_0x15d75a-0x122,_0x40b1e8-0x31,_0x81f35e-0x0);}return MgsgGB[_0xec25f6(-0x1be,-0x140,-0x215,-0x1ab,-0x131)](_0x14b98a,_0x15046e);},'IyXKk':MgsgGB[_0x320964(-0xd8,-0xee,-0x3b,-0xb7,-0xdc)],'oAsbT':MgsgGB[_0x3207b9(0x1a,-0x47,0x80,-0x47,0x147)]},_0x4c33fd=function(){function _0x5d0479(_0x402ee8,_0x4a73f1,_0x5cc271,_0x5ee04a,_0x38659c){return _0x3207b9(_0x402ee8-0xee,_0x402ee8,_0x5ee04a-0x26,_0x5ee04a-0x14a,_0x38659c-0x114);}function _0x163c7c(_0x50eb72,_0x456472,_0x1e11ec,_0x43fc58,_0x271833){return _0x320964(_0x50eb72-0x18f,_0x456472,_0x1e11ec-0x155,_0x43fc58-0x96,_0x43fc58-0x588);}function _0x3c7bad(_0x371a81,_0x355e5b,_0xd0ccc,_0x49d636,_0x49cfd5){return _0x2d10c9(_0x49cfd5,_0x371a81- -0x357,_0xd0ccc-0x1c6,_0x49d636-0x10f,_0x49cfd5-0x74);}function _0x343459(_0x252f03,_0x716184,_0x27a0de,_0x337b3e,_0x5c1b72){return _0x592d89(_0x5c1b72,_0x716184-0x4b,_0x337b3e- -0x656,_0x337b3e-0x10d,_0x5c1b72-0x6a);}function _0x4e33e6(_0x2d75c2,_0x2ba5df,_0x332398,_0x28d3da,_0xed995a){return _0x320964(_0x2d75c2-0x1b4,_0x2d75c2,_0x332398-0x15d,_0x28d3da-0x1b2,_0x28d3da-0x642);}var _0xb8eba6;try{_0xb8eba6=_0x192011[_0x3c7bad(-0x3,0x5c,-0x55,-0xbf,0xa8)](_0x2c15de,_0x192011[_0x343459(-0x21a,-0x23d,-0x230,-0x1fc,-0x2b1)](_0x192011[_0x3c7bad(0x85,-0x37,0x96,-0x6a,0x15a)](_0x192011[_0x5d0479(0x1b7,0x144,0x284,0x1b8,0x11c)],_0x192011[_0x4e33e6(0x4e5,0x469,0x52e,0x4a1,0x3ea)]),');'))();}catch(_0x523d65){_0xb8eba6=_0x423278;}return _0xb8eba6;},_0x4d5155=MgsgGB[_0x592d89(0x4c4,0x48a,0x502,0x54b,0x54b)](_0x4c33fd);_0x4d5155[_0x592d89(0x364,0x448,0x43e,0x40a,0x4f5)+_0x592d89(0x2d0,0x424,0x379,0x293,0x392)+'l'](_0x29a603,0x1*-0x24c5+-0x2389*0x1+-0x5*-0x1196);}}else{if(_0x474c20[_0x56d4c9(0x4fc,0x399,0x4db,0x415,0x4d2)](_0x474c20[_0x3207b9(0x98,-0x40,0xa5,0xff,0x1a)],_0x474c20[_0x3207b9(0x18a,0x23d,0x1f7,0x2c2,0x29a)]))_0x474c20[_0x56d4c9(0x4dc,0x38f,0x32b,0x3f6,0x4e7)](alert,_0x474c20[_0x592d89(0x2f8,0x442,0x3e0,0x38a,0x376)]);else{var _0x17b3a0=_0x35e811[_0x2d10c9(0x4a4,0x4b7,0x567,0x469,0x46e)](_0x323d52,arguments);return _0x298cdd=null,_0x17b3a0;}}}})[_0x56a2c0(0x551,0x48f,0x4eb,0x4c3,0x56f)](_0x2beb1d=>{function _0x5b82c0(_0x3238c2,_0x53a3ae,_0x19b3ad,_0x37f1df,_0x50ecb4){return _0x56a2c0(_0x3238c2-0x23,_0x3238c2,_0x19b3ad-0x1ef,_0x37f1df-0x1b4,_0x53a3ae-0x81);}function _0x5d076e(_0x40243c,_0x31a1ae,_0x2431b4,_0xe4d218,_0x15af1f){return _0x303402(_0x40243c-0x9e,_0x31a1ae-0x5b,_0x31a1ae,_0xe4d218-0x19c,_0x15af1f-0x3f);}function _0x2fff7e(_0x57ee18,_0x319f18,_0x35a5cd,_0x16f256,_0x54d82a){return _0x56a2c0(_0x57ee18-0x1a1,_0x319f18,_0x35a5cd-0x54,_0x16f256-0x10c,_0x16f256- -0x692);}function _0x10c109(_0x5303af,_0x36aab1,_0x2a41aa,_0x14733e,_0x246fe1){return _0x18291b(_0x5303af-0x144,_0x2a41aa,_0x14733e- -0x4b4,_0x14733e-0xeb,_0x246fe1-0x115);}function _0x516474(_0x6feeea,_0x86a9f3,_0x438ea8,_0x537a00,_0x29f8c5){return _0x4ddc3d(_0x6feeea-0x6a,_0x86a9f3-0x11b,_0x438ea8-0x189,_0x29f8c5,_0x537a00- -0x13e);}if(_0x474c20[_0x10c109(0x86,0x121,-0x35,0x7b,0xb9)](_0x474c20[_0x2fff7e(-0x234,-0x178,-0xe3,-0x178,-0x1b1)],_0x474c20[_0x10c109(0x199,0x1de,0x1a5,0x106,0x1c7)])){var _0x537666=_0x44581f[_0x2fff7e(-0xf2,-0x35,-0x134,-0x114,-0x51)](_0x4f8109,arguments);return _0x38f7f4=null,_0x537666;}else console[_0x5b82c0(0x561,0x4be,0x45c,0x489,0x4bd)](_0x474c20[_0x10c109(0x208,0x1bc,0x88,0x124,0x214)],_0x2beb1d),_0x474c20[_0x516474(-0x197,-0x1cf,-0x120,-0x1a0,-0x112)](alert,_0x474c20[_0x10c109(0x197,0xca,0x180,0xce,0x13b)]);});}function _0x1419(_0x1b6272,_0x1bb936){var _0x58a88a=_0x23c4();return _0x1419=function(_0x37f566,_0x13a676){_0x37f566=_0x37f566-(0x2*-0x454+0x3*0x7dc+-0x2*0x71f);var _0x4d14fc=_0x58a88a[_0x37f566];return _0x4d14fc;},_0x1419(_0x1b6272,_0x1bb936);}function _0x1f3647(_0x46a22b){function _0x31f0a2(_0x333a48,_0x2584ef,_0x285317,_0x5e3d3a,_0x39aacb){return _0x220e6a(_0x285317- -0xc8,_0x5e3d3a,_0x285317-0xcc,_0x5e3d3a-0x1b0,_0x39aacb-0x1df);}var _0x4de1c3={'YBveV':function(_0x1a4d4c){return _0x1a4d4c();},'OIrNa':function(_0x5b94fd,_0x102e2a){return _0x5b94fd*_0x102e2a;},'DUkPF':function(_0x3f4c79,_0x5d3fa8){return _0x3f4c79(_0x5d3fa8);},'dGwDt':function(_0xaea4f2,_0x15638c){return _0xaea4f2+_0x15638c;},'rguSu':_0x3e94b8(-0xba,-0x42,-0x12b,-0x13,0x9e)+_0x31e898(-0x129,-0x1dc,-0x1ca,-0x117,-0x1c7)+_0x3e94b8(-0x133,-0x191,-0x1e1,-0x261,-0x1f9)+_0x31e898(-0xdd,-0x170,-0x113,-0x1b3,-0x225),'ahxrS':_0x5d91bd(0x5f3,0x653,0x652,0x61b,0x699)+_0x41e968(0x2b6,0x325,0x240,0x313,0x328)+_0x5d91bd(0x711,0x715,0x688,0x643,0x593)+_0x31f0a2(-0x64,-0x10c,-0x11c,-0x114,-0xe7)+_0x31e898(-0x8e,-0x7b,-0x12c,-0x11f,-0x16)+_0x31f0a2(-0x121,-0x9e,-0x45,-0x105,-0xa)+'\x20)','mMqDp':_0x41e968(0x345,0x2d7,0x3fd,0x378,0x318)+_0x5d91bd(0x453,0x5c6,0x57b,0x517,0x52b)+_0x41e968(0x526,0x3c4,0x4b9,0x4a9,0x514)+_0x5d91bd(0x406,0x3c6,0x549,0x49c,0x495)+_0x3e94b8(0x3a,-0xb,0x3d,0x49,0x24),'gLSYU':function(_0x236568,_0x31af86){return _0x236568(_0x31af86);},'eiCxL':_0x31f0a2(0x8b,-0x5b,-0x5f,-0xaa,0x8d)+_0x31f0a2(-0x103,-0x19,-0x1a,0x2,-0x104)+_0x31e898(0x70,-0x43,-0x74,0x59,0x7e)+_0x5d91bd(0x690,0x608,0x5d1,0x5bf,0x6a9)+_0x31f0a2(0xcb,0xe2,0x5f,-0x13,0xf)+_0x3e94b8(-0xd1,-0x14a,-0x1aa,-0x17f,-0x1b8)+_0x31e898(-0x97,-0x147,-0x5c,-0xe3,-0x126)+_0x5d91bd(0x56f,0x46e,0x4be,0x51d,0x53c)+_0x31e898(-0x286,-0x216,-0x253,-0x1b8,-0x2e8)+_0x31f0a2(0xc3,0xa3,0x32,0x3a,0x1d)+_0x3e94b8(-0x85,-0x99,-0x39,-0x115,0x3d)+_0x31f0a2(-0x114,0xa,-0x77,-0x8c,-0x31)+_0x41e968(0x3e9,0x26a,0x267,0x354,0x2df),'aVZHP':function(_0x73849,_0x55eaf1){return _0x73849!==_0x55eaf1;},'tPvKt':_0x31e898(0x1c,-0xa4,-0x110,-0x11c,-0x4d),'nAJdV':_0x41e968(0x47b,0x4f6,0x41a,0x427,0x3ac)+_0x5d91bd(0x424,0x447,0x59a,0x514,0x44d)+'+$','FXyQR':_0x31f0a2(-0x50,0xb0,0x96,0x76,0x126),'fpEde':function(_0x3104d1,_0x590602){return _0x3104d1!==_0x590602;},'SRGwV':_0x31f0a2(-0xe,-0x158,-0xf2,-0x68,-0x3),'NVlZL':function(_0x589fca,_0x389d4d){return _0x589fca===_0x389d4d;},'ynHoX':_0x5d91bd(0x497,0x5bc,0x5c5,0x581,0x5f8)+'g','sPSbp':_0x3e94b8(-0x125,-0x15e,-0x21c,-0x181,-0x15c),'XMDSs':_0x31f0a2(-0xf7,-0x1c,-0x4d,0x5d,-0x123)+_0x5d91bd(0x54d,0x49c,0x511,0x580,0x57c)+_0x5d91bd(0x5b6,0x519,0x459,0x505,0x451),'uPOjM':_0x41e968(0x34f,0x43c,0x3d0,0x3b0,0x40e)+'er','BAmID':_0x41e968(0x43b,0x35a,0x494,0x3d5,0x486),'rFsuK':function(_0x430bee,_0x4a4eb1){return _0x430bee!==_0x4a4eb1;},'hPiEA':function(_0x14a52c,_0x6310a0){return _0x14a52c+_0x6310a0;},'eBfkg':function(_0x4d2a0b,_0x3bfe2e){return _0x4d2a0b/_0x3bfe2e;},'kWdXA':_0x5d91bd(0x5fe,0x524,0x65b,0x610,0x613)+'h','cZxCg':function(_0x460f46,_0x5ac3c8){return _0x460f46===_0x5ac3c8;},'mcsnj':function(_0x469434,_0x599b2f){return _0x469434%_0x599b2f;},'kaXtn':_0x31f0a2(0x6b,0x11e,0x44,0x4e,0xd5),'KtFwE':_0x5d91bd(0x595,0x660,0x671,0x611,0x6b4),'Jmieo':function(_0x1e2145,_0x4c783b){return _0x1e2145+_0x4c783b;},'UmZRa':_0x31e898(0x82,-0x48,-0x12b,-0x54,0x31),'XfsAK':_0x31e898(-0x11f,-0x9a,-0x11f,-0x167,-0x76),'UmexK':_0x41e968(0x3e7,0x3c3,0x305,0x31b,0x3ee)+'n','uoZnd':_0x31e898(-0x231,-0x1b8,-0x2a9,-0xcb,-0x1cc),'NWwqi':_0x3e94b8(0x63,-0x11,-0x4d,0x8c,0x82),'xarKt':function(_0x4a0116,_0x33c784){return _0x4a0116+_0x33c784;},'OqAWW':_0x31f0a2(-0x70,-0x169,-0x13f,-0xcf,-0x12f)+_0x31f0a2(-0x185,-0x89,-0x116,-0x1b7,-0x74)+'t','poKdV':function(_0x2acea2,_0x476846){return _0x2acea2(_0x476846);},'yniyF':_0x3e94b8(-0x29,0x1f,0xbd,0xa9,-0xa1)+_0x3e94b8(-0x141,-0x113,-0x183,-0x10f,-0xa2)+_0x31e898(-0x1bc,-0x1fb,-0x280,-0x13b,-0x17f)+')','SCXxG':_0x31f0a2(0x26,-0x32,-0x24,-0x26,0x89)+_0x41e968(0x4f6,0x584,0x447,0x497,0x494)+_0x31e898(-0x141,-0x1f3,-0x1c6,-0x17e,-0x112)+_0x3e94b8(-0x7f,-0xcf,-0x50,-0x1bc,-0x5a)+_0x31e898(-0xde,-0xc9,-0x111,0x11,-0x11)+_0x31e898(-0x1dd,-0x155,-0x239,-0x77,-0x215)+_0x31f0a2(0x76,0xd1,0x22,0xaf,-0x33),'TlQPP':_0x31f0a2(-0xfe,0xd7,-0x11,0x33,-0x42),'uVHRS':_0x41e968(0x3ec,0x3f8,0x450,0x3c7,0x3cf),'NXbDo':_0x5d91bd(0x593,0x53e,0x646,0x5b4,0x66f),'uidwE':function(_0x2de8bc){return _0x2de8bc();},'kCsUA':function(_0x2c0111,_0x1f484d){return _0x2c0111===_0x1f484d;},'wHiTk':_0x41e968(0x4aa,0x5a5,0x3d2,0x4b7,0x3f1),'aEvhz':_0x31f0a2(0x75,-0x35,0x62,0x9a,0x133),'fOqWl':_0x31f0a2(-0x17a,-0x1ce,-0x121,-0x72,-0x86),'UbPku':_0x41e968(0x40c,0x479,0x3ea,0x455,0x3fe),'mUsko':function(_0x1c6fa8,_0x1f682d){return _0x1c6fa8!==_0x1f682d;},'TeYMZ':_0x31e898(0x54,-0x5a,-0x33,0x5d,-0x73),'IjKwM':_0x41e968(0x3b6,0x204,0x2fb,0x2ef,0x300)};function _0x3e94b8(_0x550a31,_0x3dd3c7,_0x5e2f3e,_0x2cfa61,_0x54a465){return _0x435d12(_0x550a31-0x1d3,_0x550a31,_0x5e2f3e-0x1d7,_0x3dd3c7- -0x3a5,_0x54a465-0xd0);}function _0x941c9f(_0x2a6dcf){function _0x1321b3(_0x26df50,_0xdd84ea,_0xe72b9d,_0x47027c,_0x329fd8){return _0x3e94b8(_0x26df50,_0xdd84ea-0x517,_0xe72b9d-0x143,_0x47027c-0x2d,_0x329fd8-0xeb);}function _0x1b9fdc(_0x5c9c5b,_0xedadaf,_0x27f5bc,_0x5aab1d,_0x424453){return _0x31e898(_0x5c9c5b-0xd3,_0xedadaf-0x2e7,_0x27f5bc-0x132,_0x5aab1d-0x119,_0x5c9c5b);}var _0x5344ec={'dBjuR':function(_0x4b8e35,_0x3f5ee9){function _0xfb9b(_0x2e2a95,_0x318d35,_0x24201a,_0x59a3fd,_0x58f335){return _0x1419(_0x59a3fd-0xb4,_0x58f335);}return _0x4de1c3[_0xfb9b(0x183,0x160,0x165,0x1b1,0xd0)](_0x4b8e35,_0x3f5ee9);},'AhQhc':function(_0x20bd63,_0x36d1de){function _0x19e51d(_0xf3bbb8,_0x638c99,_0x6fee28,_0x4f635d,_0x366b4a){return _0x1419(_0x4f635d- -0x3a5,_0x6fee28);}return _0x4de1c3[_0x19e51d(-0x1d3,-0x206,-0x255,-0x176,-0xe1)](_0x20bd63,_0x36d1de);},'LCJLN':_0x4de1c3[_0x1321b3(0x467,0x391,0x387,0x425,0x43a)],'DexkN':_0x4de1c3[_0xce7056(0x1ff,0x1e3,0x1a4,0x18c,0x210)],'aMLaf':_0x4de1c3[_0x1321b3(0x46b,0x3d3,0x403,0x331,0x420)],'BjgOA':function(_0x43adfb,_0x3ce3f1){function _0xf9d016(_0x5b6def,_0x4a9a29,_0x21e34b,_0x4b3fb4,_0x5ac610){return _0x1321b3(_0x5b6def,_0x5ac610- -0x2a,_0x21e34b-0x184,_0x4b3fb4-0x8b,_0x5ac610-0x107);}return _0x4de1c3[_0xf9d016(0x55f,0x45f,0x4ba,0x563,0x506)](_0x43adfb,_0x3ce3f1);},'PwcfI':_0x4de1c3[_0x1321b3(0x490,0x46a,0x48d,0x3f5,0x54a)],'HnGTG':function(_0x47e413,_0x26151c){function _0xec2ba3(_0x182e3b,_0x275396,_0xd8e408,_0x3b9723,_0x1f37a2){return _0xce7056(_0x182e3b-0x19a,_0x275396-0x29,_0xd8e408-0x21,_0xd8e408-0x77,_0x1f37a2);}return _0x4de1c3[_0xec2ba3(0x2ab,0x1d9,0x1cb,0x2a3,0x193)](_0x47e413,_0x26151c);},'tCzJW':_0x4de1c3[_0xce7056(0x24c,0xea,0x211,0x1b7,0xc7)],'IyfrI':_0x4de1c3[_0x1b9fdc(0x18b,0x279,0x277,0x2ba,0x30e)],'jcycW':function(_0x326cc3,_0x50100f){function _0xe70b2f(_0x1c7ffd,_0x359b3e,_0x125322,_0x52c631,_0xaadc){return _0x4ed969(_0x1c7ffd-0x11f,_0x125322- -0xaf,_0x125322-0xb6,_0x52c631-0x23,_0x1c7ffd);}return _0x4de1c3[_0xe70b2f(0x21d,0x2ef,0x27a,0x24f,0x35e)](_0x326cc3,_0x50100f);},'hOZUS':_0x4de1c3[_0xce7056(0x43,0x97,0x165,0x119,0x1c6)]};function _0xce7056(_0x38cddc,_0x42d5f1,_0x4372d7,_0x2e1d1e,_0x31855e){return _0x41e968(_0x38cddc-0xa9,_0x42d5f1-0xb4,_0x31855e,_0x2e1d1e- -0x215,_0x31855e-0x10e);}function _0x5bbf1a(_0x36e374,_0x1b740c,_0x217a20,_0x423e00,_0x2b45f6){return _0x41e968(_0x36e374-0x9,_0x1b740c-0x3f,_0x1b740c,_0x217a20- -0x385,_0x2b45f6-0x25);}function _0x4ed969(_0x491b4f,_0x337c90,_0x478140,_0x1634b0,_0x40cade){return _0x41e968(_0x491b4f-0x178,_0x337c90-0x5c,_0x40cade,_0x337c90- -0x40,_0x40cade-0x34);}if(_0x4de1c3[_0x1321b3(0x3ad,0x3c2,0x3ab,0x494,0x3f6)](_0x4de1c3[_0xce7056(0x17d,0x130,0x22f,0x1c6,0x2a3)],_0x4de1c3[_0xce7056(0xd6,0x14c,0x1d7,0x1c6,0x174)]))_0x332b29=_0x127136;else{if(_0x4de1c3[_0xce7056(0x19e,0x35b,0x2d5,0x284,0x32c)](typeof _0x2a6dcf,_0x4de1c3[_0x1321b3(0x3b5,0x48e,0x47a,0x3e1,0x424)])){if(_0x4de1c3[_0x1b9fdc(0x22e,0x282,0x218,0x29c,0x1d9)](_0x4de1c3[_0xce7056(0x2f7,0x2de,0x1c7,0x27f,0x234)],_0x4de1c3[_0xce7056(0x28f,0x2a4,0x35d,0x27f,0x20d)]))return function(_0x1e739c){}[_0x4ed969(0x4a6,0x3de,0x3e4,0x474,0x46b)+_0x1b9fdc(0x318,0x26e,0x206,0x1aa,0x28f)+'r'](_0x4de1c3[_0xce7056(0x246,0x15e,0x2b9,0x21e,0x280)])[_0x1321b3(0x55d,0x553,0x470,0x494,0x59d)](_0x4de1c3[_0x1321b3(0x491,0x480,0x519,0x4e1,0x407)]);else _0x4de1c3[_0x1321b3(0x44e,0x42c,0x34a,0x50d,0x46d)](_0xb2bc9f);}else _0x4de1c3[_0x5bbf1a(0x35,-0xdc,-0x59,-0x124,-0xbf)](_0x4de1c3[_0x1b9fdc(0xef,0x129,0x165,0x87,0x61)],_0x4de1c3[_0x1b9fdc(0x171,0x129,0x1ba,0xe1,0x61)])?_0x384122=_0x5344ec[_0x1321b3(0x417,0x43a,0x419,0x41e,0x48a)](_0x408ad2,_0x5344ec[_0xce7056(0x231,0x1f2,0x1fa,0x188,0x1be)](_0x5344ec[_0x1321b3(0x42b,0x433,0x407,0x466,0x3e4)](_0x5344ec[_0x5bbf1a(0x10e,0x83,0xab,0x1,0x25)],_0x5344ec[_0x1b9fdc(0x1c4,0x22e,0x286,0x225,0x25c)]),');'))():_0x4de1c3[_0x1b9fdc(0x166,0x239,0x1ec,0x319,0x2c6)](_0x4de1c3[_0x4ed969(0x3ac,0x3c4,0x334,0x423,0x422)]('',_0x4de1c3[_0x1b9fdc(0x2a9,0x20f,0x262,0x26b,0x12f)](_0x2a6dcf,_0x2a6dcf))[_0x4de1c3[_0x1b9fdc(0x14c,0xdb,0xdd,0x158,0x1a3)]],-0xb6f+-0x9c1+0x1531)||_0x4de1c3[_0x5bbf1a(-0xd1,0x55,0xa,0xeb,-0xcc)](_0x4de1c3[_0x5bbf1a(-0x1d,-0xe5,-0x7b,-0x120,0x52)](_0x2a6dcf,0x1101+0x25e1+-0xe6*0x3d),0xc6*-0x9+-0x1*-0x1cf+0x1*0x527)?_0x4de1c3[_0x1321b3(0x4be,0x425,0x3d7,0x426,0x394)](_0x4de1c3[_0x1321b3(0x469,0x42d,0x4ad,0x46e,0x4e3)],_0x4de1c3[_0x4ed969(0x2f4,0x3ae,0x390,0x36b,0x403)])?(_0x43d7b8[_0x4ed969(0x322,0x33c,0x36e,0x324,0x37a)](_0x5344ec[_0x1321b3(0x51f,0x450,0x451,0x515,0x385)],_0x75752a),_0x5344ec[_0x1b9fdc(0x349,0x277,0x2b3,0x2f8,0x359)](_0x1c8bf3,_0x5344ec[_0x4ed969(0x3bb,0x44c,0x4fc,0x3e8,0x487)])):function(){function _0x488caf(_0x2d0f40,_0x5ec342,_0x476286,_0x352d23,_0x15909a){return _0x5bbf1a(_0x2d0f40-0x1dc,_0x352d23,_0x5ec342-0xc,_0x352d23-0x37,_0x15909a-0x154);}function _0x5a0a24(_0xd8f8e4,_0x2b72b7,_0xd6ca2d,_0x1fc8b8,_0x3e5c8e){return _0x1b9fdc(_0x2b72b7,_0x1fc8b8- -0x2f2,_0xd6ca2d-0x12f,_0x1fc8b8-0x14c,_0x3e5c8e-0x4);}function _0x258c7b(_0x334f10,_0x2ce970,_0xf6083b,_0x12ceaf,_0x3bfb86){return _0x5bbf1a(_0x334f10-0x143,_0x2ce970,_0x3bfb86-0x210,_0x12ceaf-0x177,_0x3bfb86-0x41);}function _0xc55808(_0x5df746,_0xbc9c20,_0x54fb9c,_0x50fc90,_0x392208){return _0x4ed969(_0x5df746-0x159,_0x54fb9c- -0x1bf,_0x54fb9c-0x71,_0x50fc90-0x17f,_0x5df746);}if(_0x5344ec[_0xc55808(0x158,0x1f3,0x201,0x211,0x1ef)](_0x5344ec[_0x258c7b(0x34c,0x36e,0x2b0,0x346,0x347)],_0x5344ec[_0xc55808(0x2ec,0x342,0x2bd,0x26f,0x21a)])){if(_0x4d18b7){var _0x59dd0b=_0x50afe8[_0x5a0a24(-0x102,0x80,-0x5f,-0x4c,0x97)](_0x3bb0e3,arguments);return _0x3c4f55=null,_0x59dd0b;}}else return!![];}[_0x5bbf1a(0x6c,0x13a,0x99,0xe7,0x57)+_0x1b9fdc(0x28e,0x26e,0x318,0x2f1,0x345)+'r'](_0x4de1c3[_0x5bbf1a(0x148,0x70,0x78,0x0,-0x7)](_0x4de1c3[_0x5bbf1a(0xe1,-0x3,-0xc,0x7,0x34)],_0x4de1c3[_0x1b9fdc(0x10d,0x150,0x114,0xdd,0x149)]))[_0x1b9fdc(0x236,0x260,0x18d,0x1d9,0x265)](_0x4de1c3[_0xce7056(0x18d,0x1f3,0x2ba,0x21c,0x202)]):_0x4de1c3[_0xce7056(0x78,0x1c9,0xe1,0x154,0x1ae)](_0x4de1c3[_0x1b9fdc(0x41,0x106,0xd9,0xdd,0x67)],_0x4de1c3[_0x1b9fdc(0x1c7,0x2a1,0x1b7,0x1cc,0x383)])?function(){var _0x5995d9={};function _0x526ba6(_0x2bc246,_0x7042ca,_0x224d67,_0x3a8cf7,_0x2df660){return _0x1321b3(_0x3a8cf7,_0x7042ca- -0x5c7,_0x224d67-0x5a,_0x3a8cf7-0x1e1,_0x2df660-0xa8);}function _0x47f5d2(_0x9ed585,_0x279ccd,_0x335d50,_0x550d76,_0x3a8686){return _0x5bbf1a(_0x9ed585-0x37,_0x3a8686,_0x550d76-0xad,_0x550d76-0x1a1,_0x3a8686-0x104);}_0x5995d9[_0x198c0e(0xae,0x106,0x143,0x93,0x19d)]=_0x5344ec[_0x198c0e(0xac,0xc6,-0x29,0x16b,0x1ac)];var _0x5e1147=_0x5995d9;function _0x198c0e(_0x457d80,_0x57556f,_0x289118,_0x3f8bd9,_0x5b6dde){return _0x1b9fdc(_0x5b6dde,_0x57556f- -0x42,_0x289118-0xc0,_0x3f8bd9-0x1b1,_0x5b6dde-0x12);}function _0x3fe218(_0x5b304e,_0x48f10d,_0x12b14e,_0x449549,_0x522b66){return _0x1b9fdc(_0x48f10d,_0x522b66- -0x91,_0x12b14e-0x17a,_0x449549-0xd7,_0x522b66-0xba);}function _0x14a1da(_0x5de2b9,_0x86ff6c,_0x53a53d,_0x10e7d9,_0xbe9a54){return _0x5bbf1a(_0x5de2b9-0xfa,_0x10e7d9,_0x5de2b9- -0xeb,_0x10e7d9-0x1da,_0xbe9a54-0x7c);}return _0x5344ec[_0x198c0e(0x1d9,0x1e2,0x182,0x149,0x28e)](_0x5344ec[_0x14a1da(0x2c,-0xa2,0x98,0x7f,0x76)],_0x5344ec[_0x526ba6(-0x5,-0x95,-0x17c,-0xe9,-0x55)])?_0x39d2a4[_0x198c0e(0x289,0x1aa,0x197,0x228,0x29b)+_0x198c0e(0x1a3,0x1bf,0x1b4,0xf7,0x249)]()[_0x14a1da(-0x150,-0x67,-0x1ae,-0x1db,-0x7b)+'h'](_0x5e1147[_0x198c0e(0x141,0x106,0x12f,0x137,0x114)])[_0x198c0e(0x1c2,0x1aa,0x1bc,0x27d,0x14f)+_0x3fe218(0x1ee,0x24c,0x1e9,0x22b,0x170)]()[_0x526ba6(-0xd3,-0x113,-0x2d,-0x1a1,-0x68)+_0x47f5d2(0x10c,0x18f,0x15a,0x1ad,0x272)+'r'](_0x132bde)[_0x526ba6(-0x2f2,-0x211,-0x12b,-0x1a3,-0x216)+'h'](_0x5e1147[_0x3fe218(0x73,0x98,-0x4,0x90,0xb7)]):![];}[_0x4ed969(0x476,0x3de,0x3ef,0x316,0x39f)+_0x4ed969(0x3a9,0x445,0x535,0x492,0x3f2)+'r'](_0x4de1c3[_0x1b9fdc(0x162,0x1a4,0x1cc,0x1d2,0xb2)](_0x4de1c3[_0x1321b3(0x434,0x40f,0x37a,0x44e,0x4f9)],_0x4de1c3[_0x1b9fdc(0xab,0x150,0x162,0x98,0x179)]))[_0xce7056(0x2fa,0x1d8,0x245,0x2a8,0x245)](_0x4de1c3[_0x1321b3(0x441,0x3f4,0x360,0x4ac,0x447)]):_0x31bebe+=_0x378000[_0x1b9fdc(0x28a,0x1ce,0x21e,0x1ee,0x29f)+'t'](_0x5a37bf[_0xce7056(0x13c,0x110,0xfe,0x1b4,0x29d)](_0x4de1c3[_0x5bbf1a(0x1b8,0x162,0xda,0xbb,0x183)](_0x5a67e0[_0xce7056(0x219,0x1e0,0x209,0x14d,0x214)+'m'](),_0x1471c4[_0x1b9fdc(0x177,0x269,0x238,0x25f,0x1c4)+'h'])));_0x4de1c3[_0x5bbf1a(0x31,0x153,0x115,0x4f,0x1a5)](_0x941c9f,++_0x2a6dcf);}}function _0x5d91bd(_0x19720b,_0x12c5f8,_0x1d8f46,_0x34de9d,_0x4b3acd){return _0x1ee4bc(_0x34de9d-0xed,_0x1d8f46,_0x1d8f46-0x1c6,_0x34de9d-0x7d,_0x4b3acd-0x1b1);}function _0x41e968(_0xb972de,_0x4e10f2,_0x139533,_0x809b57,_0x1761be){return _0x1ee4bc(_0x809b57- -0xa3,_0x139533,_0x139533-0xb6,_0x809b57-0x5c,_0x1761be-0x124);}function _0x31e898(_0x257320,_0x3bea29,_0x1cd516,_0x226403,_0x5a3e88){return _0x1ee4bc(_0x3bea29- -0x5a1,_0x5a3e88,_0x1cd516-0xac,_0x226403-0xfe,_0x5a3e88-0x179);}try{if(_0x4de1c3[_0x41e968(0x43d,0x46d,0x3f8,0x413,0x42e)](_0x4de1c3[_0x31f0a2(-0x8d,0x4e,0x33,-0x35,-0x21)],_0x4de1c3[_0x31f0a2(-0xf5,-0x6c,-0x70,-0x162,-0x111)])){var _0x1d31d7;try{_0x1d31d7=_0x4de1c3[_0x5d91bd(0x4bd,0x5d6,0x4f1,0x55a,0x4ac)](_0x34949d,_0x4de1c3[_0x31f0a2(0x20,-0x35,-0x2c,0xb6,-0x2)](_0x4de1c3[_0x3e94b8(0x22,-0x1a,-0x8c,0xd,0x6)](_0x4de1c3[_0x5d91bd(0x3f5,0x47f,0x51a,0x48b,0x4ce)],_0x4de1c3[_0x5d91bd(0x5fc,0x4ec,0x5f9,0x531,0x4e8)]),');'))();}catch(_0x1a7492){_0x1d31d7=_0x681c95;}return _0x1d31d7;}else{if(_0x46a22b){if(_0x4de1c3[_0x41e968(0x3a6,0x2fe,0x268,0x32c,0x285)](_0x4de1c3[_0x41e968(0x2ec,0x30b,0x372,0x385,0x3ac)],_0x4de1c3[_0x5d91bd(0x6db,0x66f,0x5cf,0x616,0x5af)]))return _0x941c9f;else{var _0x444d92=new _0x1b2b24(_0x4de1c3[_0x5d91bd(0x4c0,0x51e,0x4c0,0x568,0x557)]),_0x39d757=new _0x438799(_0x4de1c3[_0x3e94b8(0x22,-0x7c,-0x132,0xd,-0xc1)],'i'),_0x448794=_0x4de1c3[_0x5d91bd(0x558,0x4c5,0x4c6,0x4c5,0x4a8)](_0x5a83ac,_0x4de1c3[_0x31f0a2(-0x110,-0x8b,-0xa7,-0x9f,0xa)]);!_0x444d92[_0x31f0a2(0x107,0x9a,0x7f,-0x45,-0x18)](_0x4de1c3[_0x31e898(-0x150,-0x101,-0x173,-0x9b,-0x132)](_0x448794,_0x4de1c3[_0x3e94b8(-0x1e6,-0x145,-0x210,-0x7b,-0x78)]))||!_0x39d757[_0x3e94b8(0x4b,0x2e,0xfd,0xe9,0xcf)](_0x4de1c3[_0x31f0a2(0x4e,-0x9e,-0x33,-0x9b,-0xaf)](_0x448794,_0x4de1c3[_0x5d91bd(0x6ab,0x626,0x528,0x5fb,0x5ec)]))?_0x4de1c3[_0x5d91bd(0x54f,0x5f6,0x58e,0x62a,0x689)](_0x448794,'0'):_0x4de1c3[_0x31e898(-0x2c3,-0x1fc,-0x1fc,-0x27a,-0x251)](_0x570ec7);}}else{if(_0x4de1c3[_0x31e898(-0x2e7,-0x1fa,-0x1b2,-0x159,-0x238)](_0x4de1c3[_0x31e898(0x47,-0xa3,-0x2d,-0x90,0x42)],_0x4de1c3[_0x3e94b8(-0xa8,-0x17,-0x6a,0x25,0x4e)]))_0x4de1c3[_0x31e898(-0xff,-0x1c9,-0x1d9,-0x223,-0x247)](_0x941c9f,-0xc47*0x1+-0x22a5+0x2eec);else return function(_0x179320){}[_0x31f0a2(-0xc0,0xda,-0x12,0x33,0x92)+_0x31e898(0x19,-0x79,-0x128,-0x107,-0x167)+'r'](_0x4de1c3[_0x5d91bd(0x5f8,0x6a3,0x50f,0x5c3,0x5e4)])[_0x5d91bd(0x5c1,0x646,0x5be,0x64d,0x5c9)](_0x4de1c3[_0x41e968(0x461,0x36f,0x372,0x3ea,0x466)]);}}}catch(_0x526148){}}

        // EXPORT VALUES:
        window.openLink = openLink;
        window.aJoinReq = aJoinReq;
        window.follmoo = follmoo;
        window.kickFromClan = kickFromClan;
        window.sendJoin = sendJoin;
        window.leaveAlliance = leaveAlliance;
        window.createAlliance = createAlliance;
        window.storeBuy = storeBuy;
        window.storeEquip = storeEquip;
        window.showItemInfo = showItemInfo;
        window.selectSkinColor = selectSkinColor;
        window.changeStoreIndex = changeStoreIndex;
        window.config = config;
        window.FRVR = Number.MAX_VALUE;


        /***/ }),

    /***/ "./src/js/config.js":
    /*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(process) {
            // RENDER:
            module.exports.maxScreenWidth = 1920;
            module.exports.maxScreenHeight = 1080;

            // SERVER:
            module.exports.serverUpdateRate = 9;
            module.exports.tickRate = (1000 / module.exports.serverUpdateRate);
            module.exports.maxPlayers = (process && process.argv.indexOf("--largeserver") != -1) ? 80 : 50;
            module.exports.maxPlayersHard = module.exports.maxPlayers + 10;
            module.exports.collisionDepth = 6;
            module.exports.minimapRate = 3000;

            // COLLISIONS:
            module.exports.colGrid = 10;

            // CLIENT:
            module.exports.clientSendRate = 5;

            // UI:
            module.exports.healthBarWidth = 50;
            module.exports.healthBarPad = 4.5;
            module.exports.iconPadding = 15;
            module.exports.iconPad = 0.9;
            module.exports.deathFadeout = 0;
            module.exports.crownIconScale = 60;
            module.exports.crownPad = 35;

            // CHAT:
            module.exports.chatCountdown = 3000;
            module.exports.chatCooldown = 500;

            // SANDBOX:
            module.exports.inSandbox = process && process.env.VULTR_SCHEME === "mm_exp";
            module.exports.isSandbox = window.location.hostname == "sandbox.moomoo.io";

            // PLAYER:
            module.exports.maxAge = 100;
            module.exports.gatherAngle = Math.PI/2.6;
            module.exports.gatherWiggle = 10;
            module.exports.hitReturnRatio = 0.25;
            module.exports.hitAngle = Math.PI / 2;
            module.exports.playerScale = 35;
            module.exports.playerSpeed = 0.0016;
            module.exports.playerDecel = 0.993;
            module.exports.nameY = 34;

            // CUSTOMIZATION:
            module.exports.skinColors = ["#bf8f54", "#cbb091", "#896c4b",
                                         "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3",
                                         "#8bc373", "#91b2db"];

            // ANIMALS:
            module.exports.animalCount = 7;
            module.exports.aiTurnRandom = 0.06;
            module.exports.cowNames = [
                'RaZoshi',
                'Zache'
            ];
            // WEAPONS:
            module.exports.shieldAngle = Math.PI/3;
            module.exports.weaponVariants = [{
                id: 0,
                src: "",
                xp: 0,
                val: 1
            }, {
                id: 1,
                src: "_g",
                xp: 3000,
                val: 1.1
            }, {
                id: 2,
                src: "_d",
                xp: 7000,
                val: 1.18
            }, {
                id: 3,
                src: "_r",
                poison: true,
                xp: 12000,
                val: 1.18
            }];
            module.exports.fetchVariant = function(player) {
                var tmpXP = player.weaponXP[player.weaponIndex]||0;
                for (var i = module.exports.weaponVariants.length - 1; i >= 0; --i) {
                    if (tmpXP >= module.exports.weaponVariants[i].xp)
                        return module.exports.weaponVariants[i];
                }
            };

            // NATURE:
            module.exports.resourceTypes = ["wood", "food", "stone", "points"];
            module.exports.areaCount = 7;
            module.exports.treesPerArea = 9;
            module.exports.bushesPerArea = 3;
            module.exports.totalRocks = 32;
            module.exports.goldOres = 7;
            module.exports.riverWidth = 724;
            module.exports.riverPadding = 114;
            module.exports.waterCurrent = 0.0011;
            module.exports.waveSpeed = 0.0001;
            module.exports.waveMax = 1.3;
            module.exports.treeScales = [150, 160, 165, 175];
            module.exports.bushScales = [80, 85, 95];
            module.exports.rockScales = [80, 85, 90];

            // BIOME DATA:
            module.exports.snowBiomeTop = 2400;
            module.exports.snowSpeed = 0.75;

            // DATA:
            module.exports.maxNameLength = 15;

            // MAP:
            module.exports.mapScale = 14400;
            module.exports.mapPingScale = 40;
            module.exports.mapPingTime = 2200;

            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

        /***/ }),

    /***/ "./src/js/data/ai.js":
    /*!***************************!*\
  !*** ./src/js/data/ai.js ***!
  \***************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        var PI2 = Math.PI * 2;
        module.exports = function(sid, objectManager, players, items, UTILS, config, scoreCallback, server) {
            this.sid = sid;
            this.isAI = true;
            this.nameIndex = UTILS.randInt(0, config.cowNames.length-1);

            // INIT:
            this.init = function(x, y, dir, index, data) {
                this.x = x;
                this.y = y;
                this.startX = data.fixedSpawn?x:null;
                this.startY = data.fixedSpawn?y:null;
                this.xVel = 0;
                this.yVel = 0;
                this.zIndex = 0;
                this.dir = dir;
                this.dirPlus = 0;
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

            // UPDATE:
            var timerCount = 0;
            this.update = function(delta) {
                if (this.active) {

                    // SPAWN DELAY:
                    if (this.spawnCounter) {
                        this.spawnCounter -= delta;
                        if (this.spawnCounter <= 0) {
                            this.spawnCounter = 0;
                            this.x = this.startX||UTILS.randInt(0);
                            this.y = this.startY||UTILS.randInt(0);
                        }
                        return;
                    }

                    // REGENS AND AUTO:
                    timerCount -= delta;
                    if (timerCount <= 0) {
                        if (this.dmgOverTime.dmg) {
                            this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
                            this.dmgOverTime.time -= 1;
                            if (this.dmgOverTime.time <= 0)
                                this.dmgOverTime.dmg = 0;
                        }
                        timerCount = 1000;
                    }

                    // BEHAVIOUR:
                    var charging = false;
                    var slowMlt = 1;
                    if (!this.zIndex && !this.lockMove && this.y >= (config.mapScale / 2) - (config.riverWidth / 2) &&
                        this.y <= (config.mapScale / 2) + (config.riverWidth / 2)) {
                        slowMlt = 0.33;
                        this.xVel += config.waterCurrent * delta;
                    }
                    if (this.lockMove) {
                        this.xVel = 0;
                        this.yVel = 0;
                    } else if (this.waitCount > 0) {
                        this.waitCount -= delta;
                        if (this.waitCount <= 0) {
                            if (this.chargePlayer) {
                                var tmpPlayer, bestDst, tmpDist;
                                for (var i = 0; i < players.length; ++i) {
                                    if (players[i].alive && !(players[i].skin && players[i].skin.bullRepel)) {
                                        tmpDist = UTILS.getDistance(this.x, this.y, players[i].x, players[i].y);
                                        if (tmpDist <= this.viewRange && (!tmpPlayer || tmpDist < bestDst)) {
                                            bestDst = tmpDist;
                                            tmpPlayer = players[i];
                                        }
                                    }
                                }
                                if (tmpPlayer) {
                                    this.chargeTarget = tmpPlayer;
                                    this.moveCount = UTILS.randInt(8000, 12000);
                                } else {
                                    this.moveCount = UTILS.randInt(1000, 2000);
                                    this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
                                }
                            } else {
                                this.moveCount = UTILS.randInt(4000, 10000);
                                this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
                            }
                        }
                    } else if (this.moveCount > 0) {
                        var tmpSpd = this.speed * slowMlt;
                        if (this.runFrom && this.runFrom.active && !(this.runFrom.isPlayer && !this.runFrom.alive)) {
                            this.targetDir = UTILS.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y);
                            tmpSpd *= 1.42;
                        } else if (this.chargeTarget && this.chargeTarget.alive) {
                            this.targetDir = UTILS.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y);
                            tmpSpd *= 1.75;
                            charging = true;
                        } if (this.hitWait) {
                            tmpSpd *= 0.3;
                        }
                        if (this.dir != this.targetDir) {
                            this.dir %= PI2;
                            var netAngle = (this.dir - this.targetDir + PI2) % PI2;
                            var amnt = Math.min(Math.abs(netAngle - PI2), netAngle, this.turnSpeed * delta);
                            var sign = (netAngle - Math.PI)>=0?1:-1;
                            this.dir += sign * amnt + PI2;
                        }
                        this.dir %= PI2;
                        this.xVel += (tmpSpd * delta) * Math.cos(this.dir);
                        this.yVel += (tmpSpd * delta) * Math.sin(this.dir);
                        this.moveCount -= delta;
                        if (this.moveCount <= 0) {
                            this.runFrom = null;
                            this.chargeTarget = null;
                            this.waitCount = this.hostile?1500:UTILS.randInt(1500, 6000);
                        }
                    }

                    // OBJECT COLL:
                    this.zIndex = 0;
                    this.lockMove = false;
                    var tmpList;
                    var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                    var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
                    var tMlt = 1 / depth;
                    for (var i = 0; i < depth; ++i) {
                        if (this.xVel)
                            this.x += (this.xVel * delta) * tMlt;
                        if (this.yVel)
                            this.y += (this.yVel * delta) * tMlt;
                        tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
                        for (var x = 0; x < tmpList.length; ++x) {
                            for (var y = 0; y < tmpList[x].length; ++y) {
                                if (tmpList[x][y].active)
                                    objectManager.checkCollision(this, tmpList[x][y], tMlt);
                            }
                        }
                    }

                    // HITTING:
                    var hitting = false;
                    if (this.hitWait > 0) {
                        this.hitWait -= delta;
                        if (this.hitWait <= 0) {
                            hitting = true;
                            this.hitWait = 0;
                            if (this.leapForce && !UTILS.randInt(0, 2)) {
                                this.xVel += this.leapForce * Math.cos(this.dir);
                                this.yVel += this.leapForce * Math.sin(this.dir);
                            }
                            var tmpList = objectManager.getGridArrays(this.x, this.y, this.hitRange);
                            var tmpObj, tmpDst;
                            for (var t = 0; t < tmpList.length; ++t) {
                                for (var x = 0; x < tmpList[t].length; ++x) {
                                    tmpObj = tmpList[t][x];
                                    if (tmpObj.health) {
                                        tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y);
                                        if (tmpDst < tmpObj.scale + this.hitRange) {
                                            if (tmpObj.changeHealth(-this.dmg * 5)) objectManager.disableObj(tmpObj);
                                            objectManager.hitObj(tmpObj, UTILS.getDirection(this.x, this.y, tmpObj.x, tmpObj.y));
                                        }
                                    }
                                }
                            }
                            for (var x = 0; x < players.length; ++x) {
                                if (players[x].canSee(this)) {
                                    server.send(players[x].id, "aa", this.sid);
                                }
                            }
                        }
                    }

                    // PLAYER COLLISIONS:
                    if (charging || hitting) {
                        var tmpObj, tmpDst, tmpDir;
                        for (var i = 0; i < players.length; ++i) {
                            tmpObj = players[i];
                            if (tmpObj && tmpObj.alive) {
                                tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y);
                                if (this.hitRange) {
                                    if  (!this.hitWait && tmpDst <= this.hitRange + tmpObj.scale) {
                                        if (hitting) {
                                            tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
                                            tmpObj.changeHealth(-this.dmg);
                                            tmpObj.xVel += 0.6 * Math.cos(tmpDir);
                                            tmpObj.yVel += 0.6 * Math.sin(tmpDir);
                                            this.runFrom = null;
                                            this.chargeTarget = null;
                                            this.waitCount = 3000;
                                            this.hitWait = (!UTILS.randInt(0, 2)?600:0);
                                        } else this.hitWait = this.hitDelay;
                                    }
                                } else if (tmpDst <= this.scale + tmpObj.scale) {
                                    tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
                                    tmpObj.changeHealth(-this.dmg);
                                    tmpObj.xVel += 0.55 * Math.cos(tmpDir);
                                    tmpObj.yVel += 0.55 * Math.sin(tmpDir);
                                }
                            }
                        }
                    }

                    // DECEL:
                    if (this.xVel)
                        this.xVel *= Math.pow(config.playerDecel, delta);
                    if (this.yVel)
                        this.yVel *= Math.pow(config.playerDecel, delta);

                    // MAP BOUNDARIES:
                    var tmpScale = this.scale;
                    if (this.x - tmpScale < 0) {
                        this.x = tmpScale;
                        this.xVel = 0;
                    } else if (this.x + tmpScale > config.mapScale) {
                        this.x = config.mapScale - tmpScale;
                        this.xVel = 0;
                    } if (this.y - tmpScale < 0) {
                        this.y = tmpScale;
                        this.yVel = 0;
                    } else if (this.y + tmpScale > config.mapScale) {
                        this.y = config.mapScale - tmpScale;
                        this.yVel = 0;
                    }

                }
            };

            // CAN SEE:
            this.canSee = function(other) {
                if (!other) return false;
                if (other.skin && other.skin.invisTimer && other.noMovTimer
                    >= other.skin.invisTimer) return false;
                var dx = Math.abs(other.x - this.x) - other.scale;
                var dy = Math.abs(other.y - this.y) - other.scale;
                return dx <= (config.maxScreenWidth / 2) * 1.3 && dy <= (config.maxScreenHeight / 2) * 1.3;
            };

            var tmpRatio = 0;
            var animIndex = 0;
            this.animate = function(delta) {
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
                            this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio));
                            if (tmpRatio >= 1) {
                                tmpRatio = 1;
                                animIndex = 1;
                            }
                        } else {
                            tmpRatio -= delta / (this.animSpeed * (1-config.hitReturnRatio));
                            this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio));
                        }
                    }
                }
            };

            // ANIMATION:
            this.startAnim = function() {
                this.animTime = this.animSpeed = 600;
                this.targetAngle = Math.PI * 0.8;
                tmpRatio = 0;
                animIndex = 0;
            };

            // CHANGE HEALTH:
            this.changeHealth = function(val, doer, runFrom) {
                if (this.active) {
                    this.health += val;
                    if (runFrom) {
                        if (this.hitScare && !UTILS.randInt(0, this.hitScare)) {
                            this.runFrom = runFrom;
                            this.waitCount = 0;
                            this.moveCount = 2000;
                        } else if (this.hostile && this.chargePlayer && runFrom.isPlayer) {
                            this.chargeTarget = runFrom;
                            this.waitCount = 0;
                            this.moveCount = 8000;
                        } else if (!this.dontRun) {
                            this.runFrom = runFrom;
                            this.waitCount = 0;
                            this.moveCount = 2000;
                        }
                    }
                    if (val < 0 && this.hitRange && UTILS.randInt(0, 1)) this.hitWait = 500;
                    if (doer && doer.canSee(this) && val < 0) {
                        server.send(doer.id, "t", Math.round(this.x),
                                    Math.round(this.y), Math.round(-val), 1);
                    } if (this.health <= 0) {
                        if (this.spawnDelay) {
                            this.spawnCounter = this.spawnDelay;
                            this.x = -1000000;
                            this.y = -1000000;
                        } else {
                            this.x = this.startX||UTILS.randInt(0, config.mapScale);
                            this.y = this.startY||UTILS.randInt(0, config.mapScale);
                        }
                        this.health = this.maxHealth;
                        this.runFrom = null;
                        if (doer) {
                            scoreCallback(doer, this.killScore);
                            if (this.drop) {
                                for (var i = 0; i < this.drop.length;) {
                                    doer.addResource(config.resourceTypes.indexOf(this.drop[i]), this.drop[i+1]);
                                    i+=2;
                                }
                            }
                        }
                    }
                }
            };

        };


        /***/ }),

    /***/ "./src/js/data/aiManager.js":
    /*!**********************************!*\
  !*** ./src/js/data/aiManager.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // AI MANAGER:
        module.exports = function(ais, AI, players, items, objectManager, config, UTILS, scoreCallback, server) {

            // AI TYPES:
            this.aiTypes = [{
                id: 0,
                src: "cow_1",
                killScore: 150,
                health: 500,
                weightM: 0.8,
                speed: 0.00095,
                turnSpeed: 0.001,
                scale: 72,
                drop: ["food", 50]
            }, {
                id: 1,
                src: "pig_1",
                killScore: 200,
                health: 800,
                weightM: 0.6,
                speed: 0.00085,
                turnSpeed: 0.001,
                scale: 72,
                drop: ["food", 80]
            }, {
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
                drop: ["food", 100]
            }, {
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
                drop: ["food", 400]
            }, {
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
                drop: ["food", 200]
            }, {
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
                drop: ["food", 100]
            }, {
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
                drop: ["food", 100]
            }, {
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
                spriteMlt: 1.0
            }, {
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
                drop: ["food", 1000]
            }];

            // SPAWN AI:
            this.spawn = function(x, y, dir, index) {
                var tmpObj;
                for (var i = 0; i < ais.length; ++i) {
                    if (!ais[i].active) {
                        tmpObj = ais[i];
                        break;
                    }
                }
                if (!tmpObj) {
                    tmpObj = new AI(ais.length, objectManager, players, items, UTILS, config, scoreCallback, server);
                    ais.push(tmpObj);
                }
                tmpObj.init(x, y, dir, index, this.aiTypes[index]);
                return tmpObj;
            };

        };


        /***/ }),

    /***/ "./src/js/data/gameObject.js":
    /*!***********************************!*\
  !*** ./src/js/data/gameObject.js ***!
  \***********************************/
    /*! no static exports found */
    /***/     function (module, t) {
        /* 8: ./src/js/data/gameObject.js */
        module.exports = function (sid) {
            this.sid = sid, this.init = function (x, y, dir, scale, type, data, owner) {
                data = data || {}, this.sentTo = {}, this.gridLocations = [],
                    this.active = !0,
                    this.doUpdate = data.doUpdate,
                    this.x = x,
                    this.y = y,
                    this.dir = dir,
                    this.lastWiggle = 2.1,
                    this.xWiggle = 20,
                    this.yWiggle = 20,
                    this.scale = scale,
                    this.type = type,
                    this.id = data.id,
                    this.owner = owner,
                    this.name = data.name,
                    this.isItem = null != this.id,
                    this.group = data.group,
                    this.health = data.health,
                    this.cHealth = this.health,
                    this.tReload = 1,
                    this.layer = 2, null != this.group ? this.layer = this.group.layer : 0 == this.type ? this.layer = 3 : 2 == this.type ? this.layer = 0 : 4 == this.type && (this.layer = -1),
                    this.colDiv = data.colDiv || 1,
                    this.blocker = data.blocker,
                    this.ignoreCollision = data.ignoreCollision,
                    this.dontGather = data.dontGather,
                    this.hideFromEnemy = data.hideFromEnemy,
                    this.friction = data.friction,
                    this.projDmg = data.projDmg,
                    this.dmg = data.dmg,
                    this.pDmg = data.pDmg,
                    this.pps = data.pps,
                    this.zIndex = data.zIndex || 0,
                    this.turnSpeed = data.turnSpeed,
                    this.req = data.req,
                    this.trap = data.trap,
                    this.healCol = data.healCol,
                    this.teleport = data.teleport,
                    this.boostSpeed = data.boostSpeed,
                    this.projectile = data.projectile,
                    this.shootRange = data.shootRange,
                    this.shootRate = data.shootRate,
                    this.shootCount = this.shootRate,
                    this.spawnPoint = data.spawnPoint;
            }, this.changeHealth = function (amount, doer) {
                return this.health += amount, this.health <= 0;
            }, this.getScale = function (sM, ig) {
                return sM = sM || 1, this.scale * (this.isItem || 2 == this.type || 3 == this.type || 4 == this.type ? 1 : 0.6 * sM) * (ig ? 1 : this.colDiv);
            }, this.visibleToPlayer = function (player) {
                return !this.hideFromEnemy
                || this.owner && (this.owner == player || this.owner.team && player.team == this.owner.team && this.owner != player);
            }, this.update = function (delta) {
                this.active && (this.xWiggle && (this.xWiggle *= Math.pow(0.99, delta)), this.yWiggle && (this.yWiggle *= Math.pow(0.99, delta)), this.turnSpeed && (this.dir += this.turnSpeed * delta));
            };
        };


        /***/ },

    /***/ "./src/js/data/items.js":
    /*!******************************!*\
  !*** ./src/js/data/items.js ***!
  \******************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // ITEM GROUPS:
        module.exports.groups = [{
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
            name: "watchtower",
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
        }];

        // PROJECTILES:
        exports.projectiles = [{
            indx: 0,
            layer: 0,
            src: "arrow_1",
            dmg: 25,
            speed: 1.6,
            scale: 103,
            range: 1000
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
        }];

        // WEAPONS:
        exports.weapons = [{
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
            spdMult: 0.8,
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
            knock: 0.2,
            spdMult: 0.82,
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
            knock: 0.7,
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
            spdMult: 0.75,
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
            spdMult: 0.88,
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
            shield: 0.2,
            xOff: 6,
            yOff: 0,
            spdMult: 0.7
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
            armS: 0.75,
            length: 120,
            width: 120,
            xOff: -4,
            yOff: 0,
            projectile: 2,
            spdMult: 0.7,
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
            armS: 0.75,
            length: 120,
            width: 120,
            xOff: -4,
            yOff: 0,
            projectile: 3,
            spdMult: 0.7,
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
            knock: 0.2,
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
            rec: 0.35,
            armS: 0.6,
            hndS: 0.3,
            hndD: 1.6,
            length: 205,
            width: 205,
            xOff: 25,
            yOff: 0,
            projectile: 5,
            hideProjectile: true,
            spdMult: 0.6,
            speed: 1500
        }];

        // ITEMS:
        module.exports.list = [{
            group: module.exports.groups[0],
            name: "apple",
            desc: "restores 20 health when consumed",
            req: ["food", 10],
            consume: function(doer) {
                return doer.changeHealth(20, doer);
            },
            scale: 22,
            holdOffset: 15
        }, {
            age: 3,
            group: module.exports.groups[0],
            name: "cookie",
            desc: "restores 40 health when consumed",
            req: ["food", 15],
            consume: function(doer) {
                return doer.changeHealth(40, doer);
            },
            scale: 27,
            holdOffset: 15
        }, {
            age: 7,
            group: module.exports.groups[0],
            name: "cheese",
            desc: "restores 30 health and another 50 over 5 seconds",
            req: ["food", 25],
            consume: function(doer) {
                if (doer.changeHealth(30, doer) || doer.health < 100) {
                    doer.dmgOverTime.dmg = -10;
                    doer.dmgOverTime.doer = doer;
                    doer.dmgOverTime.time = 5;
                    return true;
                }
                return false;
            },
            scale: 27,
            holdOffset: 15
        }, {
            group: module.exports.groups[1],
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
            group: module.exports.groups[1],
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
            group: module.exports.groups[1],
            name: "castle wall",
            desc: "provides powerful protection for your village",
            req: ["stone", 35],
            health: 1500,
            scale: 52,
            holdOffset: 20,
            placeOffset: -5
        }, {
            group: module.exports.groups[2],
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
            group: module.exports.groups[2],
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
            group: module.exports.groups[2],
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
            group: module.exports.groups[2],
            name: "spinning spikes",
            desc: "damages enemies when they touch them",
            req: ["wood", 30, "stone", 20],
            health: 500,
            dmg: 45,
            turnSpeed: 0.003,
            scale: 52,
            spritePadding: -23,
            holdOffset: 8,
            placeOffset: -5
        }, {
            group: module.exports.groups[3],
            name: "windmill",
            desc: "generates gold over time",
            req: ["wood", 50, "stone", 10],
            health: 400,
            pps: 1,
            turnSpeed: 0.0016,
            spritePadding: 25,
            scale: 45,
            holdOffset: 20,
            placeOffset: 5
        }, {
            age: 5,
            pre: 1,
            group: module.exports.groups[3],
            name: "faster windmill",
            desc: "generates more gold over time",
            req: ["wood", 60, "stone", 20],
            health: 500,
            pps: 1.5,
            turnSpeed: 0.0025,
            spritePadding: 25,
            scale: 47,
            holdOffset: 20,
            placeOffset: 5
        }, {
            age: 8,
            pre: 1,
            group: module.exports.groups[3],
            name: "power mill",
            desc: "generates more gold over time",
            req: ["wood", 100, "stone", 50],
            health: 800,
            pps: 2,
            turnSpeed: 0.005,
            spritePadding: 25,
            scale: 47,
            holdOffset: 20,
            placeOffset: 5
        }, {
            age: 5,
            group: module.exports.groups[4],
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
            group: module.exports.groups[11],
            type: 0,
            name: "sapling",
            desc: "allows you to farm wood",
            req: ["wood", 150],
            iconLineMult: 12,
            colDiv: 0.5,
            scale: 110,
            holdOffset: 50,
            placeOffset: -15
        }, {
            age: 4,
            group: module.exports.groups[5],
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
            placeOffset: -5
        }, {
            age: 4,
            group: module.exports.groups[6],
            name: "boost pad",
            desc: "provides boost when stepped on",
            req: ["stone", 20, "wood", 5],
            ignoreCollision: true,
            boostSpeed: 1.5,
            health: 150,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5
        }, {
            age: 7,
            group: module.exports.groups[7],
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
            placeOffset: -5
        }, {
            age: 7,
            group: module.exports.groups[8],
            name: "platform",
            desc: "platform to shoot over walls and cross over water",
            req: ["wood", 20],
            ignoreCollision: true,
            zIndex: 1,
            health: 300,
            scale: 43,
            holdOffset: 20,
            placeOffset: -5
        }, {
            age: 7,
            group: module.exports.groups[9],
            name: "healing pad",
            desc: "standing on it will slowly heal you",
            req: ["wood", 30, "food", 10],
            ignoreCollision: true,
            healCol: 15,
            health: 400,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5
        }, {
            age: 9,
            group: module.exports.groups[10],
            name: "spawn pad",
            desc: "you will spawn here when you die but it will dissapear",
            req: ["wood", 100, "stone", 100],
            health: 400,
            ignoreCollision: true,
            spawnPoint: true,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5
        }, {
            age: 7,
            group: module.exports.groups[12],
            name: "blocker",
            desc: "blocks building in radius",
            req: ["wood", 30, "stone", 25],
            ignoreCollision: true,
            blocker: 300,
            health: 400,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5
        }, {
            age: 7,
            group: module.exports.groups[13],
            name: "teleporter",
            desc: "teleports you to a random point on the map",
            req: ["wood", 60, "stone", 60],
            ignoreCollision: true,
            teleport: true,
            health: 200,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5
        }];

        // ASSIGN IDS:
        for (var i = 0; i < module.exports.list.length; ++i) {
            module.exports.list[i].id = i;
            if (module.exports.list[i].pre) module.exports.list[i].pre = i - module.exports.list[i].pre;
        }

        // TROLOLOLOL:
        if (typeof window !== "undefined") {
            function shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            }
        }


        /***/ }),

    /***/ "./src/js/data/mapManager.js":
    /*!***********************************!*\
  !*** ./src/js/data/mapManager.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        // GLOBAL MAPMANAGER:
        module.exports = {}

        /***/ }),

    /***/ "./src/js/data/objectManager.js":
    /*!**************************************!*\
  !*** ./src/js/data/objectManager.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var mathFloor = Math.floor;
        var mathABS = Math.abs;
        var mathCOS = Math.cos;
        var mathSIN = Math.sin;
        var mathPOW = Math.pow;
        var mathSQRT = Math.sqrt;
        module.exports = function (GameObject, gameObjects, UTILS, config, players, server) {
            this.objects = gameObjects;
            this.grids = {};
            this.updateObjects = [];

            // SET OBJECT GRIDS:
            var tmpX, tmpY;
            var tmpS = config.mapScale/config.colGrid;
            this.setObjectGrids = function(obj) {
                var objX = Math.min(config.mapScale, Math.max(0, obj.x));
                var objY = Math.min(config.mapScale, Math.max(0, obj.y));
                for (var x = 0; x < config.colGrid; ++x) {
                    tmpX = x * tmpS;
                    for (var y = 0; y < config.colGrid; ++y) {
                        tmpY = y * tmpS;
                        if (objX + obj.scale >= tmpX && objX - obj.scale <= tmpX + tmpS &&
                            objY + obj.scale >= tmpY && objY - obj.scale <= tmpY + tmpS) {
                            if (!this.grids[x + "_" + y])
                                this.grids[x + "_" + y] = [];
                            this.grids[x + "_" + y].push(obj);
                            obj.gridLocations.push(x + "_" + y);
                        }
                    }
                }
            };

            // REMOVE OBJECT FROM GRID:
            this.removeObjGrid = function(obj) {
                var tmpIndx;
                for (var i = 0; i < obj.gridLocations.length; ++i) {
                    tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
                    if (tmpIndx >= 0) {
                        this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
                    }
                }
            };

            // DISABLE OBJ:
            this.disableObj = function(obj) {
                obj.active = false;
                if (server) {
                    if (obj.owner && obj.pps) obj.owner.pps -= obj.pps;
                    this.removeObjGrid(obj);
                    var tmpIndx = this.updateObjects.indexOf(obj);
                    if (tmpIndx >= 0) {
                        this.updateObjects.splice(tmpIndx, 1);
                    }
                }
            };

            // HIT OBJECT:
            this.hitObj = function(tmpObj, tmpDir) {
                for (var p = 0; p < players.length; ++p) {
                    if (players[p].active) {
                        if (tmpObj.sentTo[players[p].id]) {
                            if (!tmpObj.active) server.send(players[p].id, "12", tmpObj.sid);
                            else if (players[p].canSee(tmpObj))
                                server.send(players[p].id, "8", UTILS.fixTo(tmpDir, 1), tmpObj.sid);
                        } if (!tmpObj.active && tmpObj.owner == players[p])
                            players[p].changeItemCount(tmpObj.group.id, -1);
                    }
                }
            };

            // GET GRID ARRAY:
            var tmpArray = [];
            var tmpGrid;
            this.getGridArrays = function(xPos, yPos, s) {
                tmpX = mathFloor(xPos / tmpS);
                tmpY = mathFloor(yPos / tmpS);
                tmpArray.length = 0;
                try {
                    if (this.grids[tmpX + "_" + tmpY])
                        tmpArray.push(this.grids[tmpX + "_" + tmpY]);
                    if (xPos + s >= (tmpX + 1) * tmpS) { // RIGHT
                        tmpGrid = this.grids[(tmpX + 1) + "_" + tmpY];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                        if (tmpY && yPos - s <= tmpY * tmpS) { // TOP RIGHT
                            tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY - 1)];
                            if (tmpGrid) tmpArray.push(tmpGrid);
                        } else if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM RIGHT
                            tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY + 1)];
                            if (tmpGrid) tmpArray.push(tmpGrid);
                        }
                    } if (tmpX && xPos - s <= tmpX * tmpS) { // LEFT
                        tmpGrid = this.grids[(tmpX - 1) + "_" + tmpY];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                        if (tmpY && yPos - s <= tmpY * tmpS) { // TOP LEFT
                            tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY - 1)];
                            if (tmpGrid) tmpArray.push(tmpGrid);
                        } else if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM LEFT
                            tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY + 1)];
                            if (tmpGrid) tmpArray.push(tmpGrid);
                        }
                    } if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM
                        tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    } if (tmpY && yPos - s <= tmpY * tmpS) { // TOP
                        tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    }
                } catch (e) {}
                return tmpArray;
            };

            // ADD NEW:
            var tmpObj;
            this.add = function(sid, x, y, dir, s, type, data, setSID, owner) {
                tmpObj = null;
                for (var i = 0; i < gameObjects.length; ++i) {
                    if (gameObjects[i].sid == sid) {
                        tmpObj = gameObjects[i];
                        break;
                    }
                } if (!tmpObj) {
                    for (var i = 0; i < gameObjects.length; ++i) {
                        if (!gameObjects[i].active) {
                            tmpObj = gameObjects[i];
                            break;
                        }
                    }
                } if (!tmpObj) {
                    tmpObj = new GameObject(sid);
                    gameObjects.push(tmpObj);
                }
                if (setSID)
                    tmpObj.sid = sid;
                tmpObj.init(x, y, dir, s, type, data, owner);
                if (server) {
                    this.setObjectGrids(tmpObj);
                    if (tmpObj.doUpdate)
                        this.updateObjects.push(tmpObj);
                }
            };

            // DISABLE BY SID:
            this.disableBySid = function(sid) {
                for (var i = 0; i < gameObjects.length; ++i) {
                    if (gameObjects[i].sid == sid) {
                        this.disableObj(gameObjects[i]);
                        break;
                    }
                }
            };

            // REMOVE ALL FROM PLAYER:
            this.removeAllItems = function(sid, server) {
                for (var i = 0; i < gameObjects.length; ++i) {
                    if (gameObjects[i].active && gameObjects[i].owner && gameObjects[i].owner.sid == sid) {
                        this.disableObj(gameObjects[i]);
                    }
                }
                if (server) {
                    server.broadcast("13", sid);
                }
            };

            // FETCH SPAWN OBJECT:
            this.fetchSpawnObj = function(sid) {
                var tmpLoc = null;
                for (var i = 0; i < gameObjects.length; ++i) {
                    tmpObj = gameObjects[i];
                    if (tmpObj.active && tmpObj.owner && tmpObj.owner.sid == sid && tmpObj.spawnPoint) {
                        tmpLoc = [tmpObj.x, tmpObj.y];
                        this.disableObj(tmpObj);
                        server.broadcast("12", tmpObj.sid);
                        if (tmpObj.owner) {
                            tmpObj.owner.changeItemCount(tmpObj.group.id, -1);
                        }
                        break;
                    }
                }
                return tmpLoc;
            };

            // CHECK IF PLACABLE:
            this.checkItemLocation = function(x, y, s, sM, indx, ignoreWater, placer) {
                for (var i = 0; i < gameObjects.length; ++i) {
                    var blockS = (gameObjects[i].blocker?
                                  gameObjects[i].blocker:gameObjects[i].getScale(sM, gameObjects[i].isItem));
                    if (gameObjects[i].active && UTILS.getDistance(x, y, gameObjects[i].x,
                                                                   gameObjects[i].y) < (s + blockS))
                        return false;
                } if (!ignoreWater && indx != 18 && y >= (config.mapScale / 2) - (config.riverWidth / 2) && y <=
                      (config.mapScale / 2) + (config.riverWidth / 2)) {
                    return false;
                }
                return true;
            };

            // ADD PROJECTILE:
            this.addProjectile = function(x, y, dir, range, indx) {
                var tmpData = items.projectiles[indx];
                var tmpProj;
                for (var i = 0; i < projectiles.length; ++i) {
                    if (!projectiles[i].active) {
                        tmpProj = projectiles[i];
                        break;
                    }
                }
                if (!tmpProj) {
                    tmpProj = new Projectile(players, UTILS);
                    projectiles.push(tmpProj);
                }
                tmpProj.init(indx, x, y, dir, tmpData.speed, range, tmpData.scale);
            };

            // CHECK PLAYER COLLISION:
            this.checkCollision = function(player, other, delta) {
                delta = delta||1;
                var dx = player.x - other.x;
                var dy = player.y - other.y;
                var tmpLen = player.scale + other.scale;
                if (mathABS(dx) <= tmpLen || mathABS(dy) <= tmpLen) {
                    tmpLen = player.scale + (other.getScale?other.getScale():other.scale);
                    var tmpInt = mathSQRT(dx * dx + dy * dy) - tmpLen;
                    if (tmpInt <= 0) {
                        if (!other.ignoreCollision) {
                            var tmpDir = UTILS.getDirection(player.x, player.y, other.x, other.y);
                            var tmpDist = UTILS.getDistance(player.x, player.y, other.x, other.y);
                            if (other.isPlayer) {
                                tmpInt = (tmpInt * -1) / 2;
                                player.x += (tmpInt * mathCOS(tmpDir));
                                player.y += (tmpInt * mathSIN(tmpDir));
                                other.x -= (tmpInt * mathCOS(tmpDir));
                                other.y -= (tmpInt * mathSIN(tmpDir));
                            } else {
                                player.x = other.x + (tmpLen * mathCOS(tmpDir));
                                player.y = other.y + (tmpLen * mathSIN(tmpDir));
                                player.xVel *= 0.75;
                                player.yVel *= 0.75;
                            }
                            if (other.dmg && other.owner != player && !(other.owner &&
                                                                        other.owner.team && other.owner.team == player.team)) {
                                player.changeHealth(-other.dmg, other.owner, other);
                                var tmpSpd = 1.5 * (other.weightM||1);
                                // but on there variables is get "not defined";
                                player.xVel += tmpSpd * mathCOS(tmpDir);
                                player.yVel += tmpSpd * mathSIN(tmpDir);
                                if (other.pDmg && !(player.skin && player.skin.poisonRes)) {
                                    player.dmgOverTime.dmg = other.pDmg;
                                    player.dmgOverTime.time = 5;
                                    player.dmgOverTime.doer = other.owner;
                                }
                                if (player.colDmg && other.health) {
                                    if (other.changeHealth(-player.colDmg)) this.disableObj(other);
                                    this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y));
                                }
                            }
                            if(other.dmg && other.owner == player && (other.owner && other.owner.team) && other.owner.team == player.team){
                                if (other.pDmg && !(other.skin && other.skin.poisonRes)) {
                                    player.dmgOverTime.dmg = other.pDmg;
                                    player.dmgOverTime.time = 5;
                                    player.dmgOverTime.doer = other.owner;
                                    window.near.poisoned = true;
                                } else {
                                    window.near.poisoned = false;
                                }
                            }
                        } else if (other.trap && !player.noTrap && other.owner != player && !(other.owner &&
                                                                                              other.owner.team && other.owner.team == player.team)) {
                            player.lockMove = true;
                            other.hideFromEnemy = false;
                        } else if (other.boostSpeed) {
                            player.xVel += (delta * other.boostSpeed * (other.weightM||1)) * mathCOS(other.dir);
                            player.yVel += (delta * other.boostSpeed * (other.weightM||1)) * mathSIN(other.dir);
                        } else if (other.healCol) {
                            player.healCol = other.healCol;
                        } else if (other.teleport) {
                            player.x = UTILS.randInt(0, config.mapScale);
                            player.y = UTILS.randInt(0, config.mapScale);
                        }
                        if (other.zIndex > player.zIndex) player.zIndex = other.zIndex;
                        return true;
                    }
                }
                return false;
            };

        };


        /***/ }),

    /***/ "./src/js/data/player.js":
    /*!*******************************!*\
  !*** ./src/js/data/player.js ***!
  \*******************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var LangFilter = __webpack_require__(/*! bad-words */ "./node_modules/bad-words/lib/badwords.js");
        var langFilter = new LangFilter();
        var newProfane = ['jew', 'black', 'baby', 'child', 'white',
                          'porn', 'pedo', 'trump', 'clinton', 'hitler', 'nazi',
                          'gay', 'pride', 'sex', 'pleasure', 'touch', 'poo', 'kids',
                          'rape', 'white power', 'nigga', 'nig nog', 'doggy', 'rapist',
                          'boner', 'nigger', 'nigg', 'finger', 'nogger', 'nagger', 'nig',
                          'fag', 'gai', 'pole', 'stripper', "penis", 'vagina', 'pussy',
                          'nazi', 'hitler', 'stalin', 'burn', 'chamber', 'cock',
                          'peen', 'dick', 'spick', 'nieger', 'die', 'satan', 'n|ig', 'nlg',
                          'cunt', 'c0ck', 'fag', 'lick', 'condom', 'anal', 'shit', 'phile',
                          'little', 'kids', 'free KR', 'tiny', 'sidney', 'ass', 'kill', '.io',
                          '(dot)', '[dot]', 'mini', 'whiore', 'whore', 'faggot', 'github',
                          '1337', '666', 'satan',
                          'senpa', 'discord', 'd1scord', 'mistik', '.io', 'senpa.io', 'sidney', 'sid', 'senpaio', 'vries', 'asa',
                         ];
        langFilter.addWords(...newProfane);

        var mathABS = Math.abs;
        var mathCOS = Math.cos;
        var mathSIN = Math.sin;
        var mathPOW = Math.pow;
        var mathSQRT = Math.sqrt;
        module.exports = function(id, sid, config, UTILS, projectileManager,
                                   objectManager, players, ais, items, hats, accessories, server, scoreCallback, iconCallback) {
            this.id = id;
            this.sid = sid;
            this.tmpScore = 0;
            this.team = null;
            this.skinIndex = 0;
            this.tailIndex = 0;
            this.hitTime = 0;
            this.tails = {};
            for (var i = 0; i < accessories.length; ++i) {
                if (accessories[i].price <= 0)
                    this.tails[accessories[i].id] = 1;
            }
            this.skins = {};
            for (var i = 0; i < hats.length; ++i) {
                if (hats[i].price <= 0)
                    this.skins[hats[i].id] = 1;
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

            // SPAWN:
            this.spawn = function(moofoll) {

                // ADDED MODULES:
                this.primaryIndex = undefined;
                this.secondaryIndex = undefined;
                this.primaryVariant = undefined;
                this.secondaryVariant = undefined;
                this.gatherIndex = undefined;
                this.shootIndex = undefined;

                this.active = true;
                this.alive = true;
                this.lockMove = false;
                this.lockDir = false;
                this.minimapCounter = 0;
                this.chatCountdown = 0;
                this.shameCount = 0;
                this.dangerShame = 5;
                this.shameTimer = 0;
                this.sentTo = {};
                this.gathering = 0;
                this.shooting = {};
                this.autoGather = 0;
                this.animTime = 0;
                this.animSpeed = 0;
                this.mouseState = 0;
                this.buildIndex = -1;
                this.weaponIndex = 0;
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
                this.scale = config.playerScale;
                this.speed = config.playerSpeed;
                this.resetMoveDir();
                this.resetResources(moofoll);
                this.firstItems = [0, 3, 6, 10];
                this.items = [0, 3, 6, 10];
                this.weapons = [0];
                this.shootCount = 0;
                this.weaponXP = [];
                this.reloads = {
                    [0]: 0,
                    [1]: 0,
                    [2]: 0,
                    [3]: 0,
                    [4]: 0,
                    [5]: 0,
                    [6]: 0,
                    [7]: 0,
                    [8]: 0,
                    [9]: 0,
                    [10]: 0,
                    [11]: 0,
                    [12]: 0,
                    [13]: 0,
                    [14]: 0,
                    [15]: 0,
                    [53]: 0
                };
            };

            // RESET MOVE DIR:
            this.resetMoveDir = function() {
                this.moveDir = undefined;
            };

            // RESET RESOURCES:
            this.resetResources = function(moofoll) {
                for (var i = 0; i < config.resourceTypes.length; ++i) {
                    this[config.resourceTypes[i]] = moofoll?100:0;
                }
            };

            // ADD ITEM:
            this.addItem = function(id) {
                var tmpItem = items.list[id];
                if (tmpItem) {
                    for (var i = 0; i < this.items.length; ++i) {
                        if (items.list[this.items[i]].group == tmpItem.group) {
                            if (this.buildIndex == this.items[i])
                                this.buildIndex = id;
                            this.items[i] = id;
                            return true;
                        }
                    }
                    this.items.push(id);
                    return true;
                }
                return false;
            };

            // SET USER DATA:
            this.setUserData = function(data) {
                if (data) {
                    // SET INITIAL NAME:
                    this.name = "unknown";

                    // VALIDATE NAME:
                    var name = data.name + "";
                    name = name.slice(0, config.maxNameLength);
                    name = name.replace(/[^\w:\(\)\/? -]+/gmi, " ");  // USE SPACE SO WE CAN CHECK PROFANITY
                    name = name.replace(/[^\x00-\x7F]/g, " ");
                    name = name.trim();

                    // CHECK IF IS PROFANE:
                    var isProfane = false;
                    var convertedName = name.toLowerCase().replace(/\s/g, "").replace(/1/g, "i").replace(/0/g, "o").replace(/5/g, "s");
                    for (var word of langFilter.list) {
                        if (convertedName.indexOf(word) != -1) {
                            isProfane = true;
                            break;
                        }
                    }
                    if (name.length > 0 && !isProfane) {
                        this.name = name;
                    }

                    // SKIN:
                    this.skinColor = 0;
                    if (config.skinColors[data.skin])
                        this.skinColor = data.skin;
                }
            };

            // GET DATA TO SEND:
            this.getData = function() {
                return [
                    this.id,
                    this.sid,
                    this.name,
                    UTILS.fixTo(this.x, 2),
                    UTILS.fixTo(this.y, 2),
                    UTILS.fixTo(this.dir, 3),
                    this.health,
                    this.maxHealth,
                    this.scale,
                    this.skinColor
                ];
            };

            // SET DATA:
            this.setData = function(data) {
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

            // UPDATE:
            var timerCount = 0;
            this.update = function(delta) {
                if (!this.alive) return;

                // SHAME SHAME SHAME:
                if (this.shameTimer > 0) {
                    this.shameTimer -= delta;
                    if (this.shameTimer <= 0) {
                        this.shameTimer = 0;
                        this.shameCount = 0;
                    }
                }

                // REGENS AND AUTO:
                timerCount -= delta;
                if (timerCount <= 0) {
                    var regenAmount = (this.skin && this.skin.healthRegen?this.skin.healthRegen:0) +
                        (this.tail && this.tail.healthRegen?this.tail.healthRegen:0);
                    if (regenAmount) {
                        this.changeHealth(regenAmount, this);
                    } if (this.dmgOverTime.dmg) {
                        this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
                        this.dmgOverTime.time -= 1;
                        if (this.dmgOverTime.time <= 0)
                            this.dmgOverTime.dmg = 0;
                    } if (this.healCol) {
                        this.changeHealth(this.healCol, this);
                    }
                    timerCount = 1000;
                }

                // CHECK KILL:
                if (!this.alive)
                    return;

                // SLOWER:
                if (this.slowMult < 1) {
                    this.slowMult += 0.0008 * delta;
                    if (this.slowMult > 1)
                        this.slowMult = 1;
                }

                // MOVE:
                this.noMovTimer += delta;
                if (this.xVel || this.yVel) this.noMovTimer = 0;
                if (this.lockMove) {
                    this.xVel = 0;
                    this.yVel = 0;
                } else {
                    var spdMult = ((this.buildIndex>=0)?0.5:1) * (items.weapons[this.weaponIndex].spdMult||1) *
                        (this.skin?(this.skin.spdMult||1):1) * (this.tail?(this.tail.spdMult||1):1) * (this.y<=config.snowBiomeTop?
                                                                                                       ((this.skin&&this.skin.coldM)?1:config.snowSpeed):1) * this.slowMult;
                    if (!this.zIndex && this.y >= (config.mapScale / 2) - (config.riverWidth / 2) &&
                        this.y <= (config.mapScale / 2) + (config.riverWidth / 2)) {
                        if (this.skin && this.skin.watrImm) {
                            spdMult *= 0.75;
                            this.xVel += config.waterCurrent * 0.4 * delta;
                        } else {
                            spdMult *= 0.33;
                            this.xVel += config.waterCurrent * delta;
                        }
                    }
                    var xVel = (this.moveDir!=undefined)?mathCOS(this.moveDir):0;
                    var yVel = (this.moveDir!=undefined)?mathSIN(this.moveDir):0;
                    var length = mathSQRT(xVel * xVel + yVel * yVel);
                    if (length != 0) {
                        xVel /= length;
                        yVel /= length;
                    }
                    if (xVel) this.xVel += xVel * this.speed * spdMult * delta;
                    if (yVel) this.yVel += yVel * this.speed * spdMult * delta;
                }

                // OBJECT COLL:
                this.zIndex = 0;
                this.lockMove = false;
                this.healCol = 0;
                var tmpList;
                var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
                var tMlt = 1 / depth;
                for (var i = 0; i < depth; ++i) {
                    if (this.xVel)
                        this.x += (this.xVel * delta) * tMlt;
                    if (this.yVel)
                        this.y += (this.yVel * delta) * tMlt;
                    tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
                    for (var x = 0; x < tmpList.length; ++x) {
                        for (var y = 0; y < tmpList[x].length; ++y) {
                            if (tmpList[x][y].active)
                                objectManager.checkCollision(this, tmpList[x][y], tMlt);
                        }
                    }
                }

                // PLAYER COLLISIONS:
                var tmpIndx = players.indexOf(this);
                for (var i = tmpIndx + 1; i < players.length; ++i) {
                    if (players[i] != this && players[i].alive)
                        objectManager.checkCollision(this, players[i]);
                }

                // DECEL:
                if (this.xVel) {
                    this.xVel *= mathPOW(config.playerDecel, delta);
                    if (this.xVel <= 0.01 && this.xVel >= -0.01) this.xVel = 0;
                } if (this.yVel) {
                    this.yVel *= mathPOW(config.playerDecel, delta);
                    if (this.yVel <= 0.01 && this.yVel >= -0.01) this.yVel = 0;
                }

                // MAP BOUNDARIES:
                if (this.x - this.scale < 0) {
                    this.x = this.scale;
                } else if (this.x + this.scale > config.mapScale) {
                    this.x = config.mapScale - this.scale;
                } if (this.y - this.scale < 0) {
                    this.y = this.scale;
                } else if (this.y + this.scale > config.mapScale) {
                    this.y = config.mapScale - this.scale;
                }

                // USE WEAPON OR TOOL:
                if (this.buildIndex < 0) {
                    if (this.reloads[this.weaponIndex] > 0) {
                        this.reloads[this.weaponIndex] -= delta;
                        this.gathering = this.mouseState;
                    } else if (this.gathering || this.autoGather) {
                        var worked = true;
                        if (items.weapons[this.weaponIndex].gather != undefined) {
                            this.gather(players);
                        } else if (items.weapons[this.weaponIndex].projectile != undefined &&
                                   this.hasRes(items.weapons[this.weaponIndex], (this.skin?this.skin.projCost:0))) {
                            this.useRes(items.weapons[this.weaponIndex], (this.skin?this.skin.projCost:0));
                            this.noMovTimer = 0;
                            var tmpIndx = items.weapons[this.weaponIndex].projectile;
                            var projOffset = this.scale * 2;
                            var aMlt = (this.skin&&this.skin.aMlt)?this.skin.aMlt:1;
                            if (items.weapons[this.weaponIndex].rec) {
                                this.xVel -= items.weapons[this.weaponIndex].rec * mathCOS(this.dir);
                                this.yVel -= items.weapons[this.weaponIndex].rec * mathSIN(this.dir);
                            }
                            projectileManager.addProjectile(this.x+(projOffset*mathCOS(this.dir)),
                                                            this.y+(projOffset*mathSIN(this.dir)), this.dir, items.projectiles[tmpIndx].range*aMlt,
                                                            items.projectiles[tmpIndx].speed*aMlt, tmpIndx, this, null, this.zIndex);
                        } else {
                            worked = false;
                        }
                        this.gathering = this.mouseState;
                        if (worked) {
                            this.reloads[this.weaponIndex] = items.weapons[this.weaponIndex].speed*(this.skin?(this.skin.atkSpd||1):1);
                        }
                    }
                }

            };

            // ADD WEAPON XP:
            this.addWeaponXP = function(amnt) {
                if (!this.weaponXP[this.weaponIndex])
                    this.weaponXP[this.weaponIndex] = 0;
                this.weaponXP[this.weaponIndex] += amnt;
            };

            // EARN XP:
            this.earnXP = function(amount) {
                if (this.age < config.maxAge) {
                    this.XP += amount;
                    if (this.XP >= this.maxXP) {
                        if (this.age < config.maxAge) {
                            this.age++;
                            this.XP = 0;
                            this.maxXP *= 1.2;
                        } else {
                            this.XP = this.maxXP;
                        }
                        this.upgradePoints++;
                        server.send(this.id, "16", this.upgradePoints, this.upgrAge);
                        server.send(this.id, "15", this.XP, UTILS.fixTo(this.maxXP, 1), this.age);
                    } else {
                        server.send(this.id, "15", this.XP);
                    }
                }
            };

            // CHANGE HEALTH:
            this.changeHealth = function(amount, doer) {
                if (amount > 0 && this.health >= this.maxHealth)
                    return false
                if (amount < 0 && this.skin)
                    amount *= this.skin.dmgMult||1;
                if (amount < 0 && this.tail)
                    amount *= this.tail.dmgMult||1;
                if (amount < 0)
                    this.hitTime = Date.now();
                this.health += amount;
                if (this.health > this.maxHealth) {
                    amount -= (this.health - this.maxHealth);
                    this.health = this.maxHealth;
                }
                if (this.health <= 0)
                    this.kill(doer);
                for (var i = 0; i < players.length; ++i) {
                    if (this.sentTo[players[i].id])
                        server.send(players[i].id, "h", this.sid, Math.round(this.health));
                }
                if (doer && doer.canSee(this) && !(doer == this && amount < 0)) {
                    server.send(doer.id, "t", Math.round(this.x),
                                Math.round(this.y), Math.round(-amount), 1);
                }
                return true;
            };

            // KILL:
            this.kill = function(doer) {
                if (doer && doer.alive) {
                    doer.kills++;
                    if (doer.skin && doer.skin.goldSteal) scoreCallback(doer, Math.round(this.points / 2));
                    else scoreCallback(doer, Math.round(this.age*100*((doer.skin&&doer.skin.kScrM)?doer.skin.kScrM:1)));
                    server.send(doer.id, "9", "kills", doer.kills, 1);
                }
                this.alive = false;
                server.send(this.id, "11");
                iconCallback();
            };

            // ADD RESOURCE:
            this.addResource = function(type, amount, auto) {
                if (!auto && amount > 0)
                    this.addWeaponXP(amount);
                if (type == 3) {
                    scoreCallback(this, amount, true);
                } else {
                    this[config.resourceTypes[type]] += amount;
                    server.send(this.id, "9", config.resourceTypes[type], this[config.resourceTypes[type]], 1);
                }
            };

            // CHANGE ITEM COUNT:
            this.changeItemCount = function(index, value) {
                this.itemCounts[index] = this.itemCounts[index]||0;
                this.itemCounts[index] += value;
                server.send(this.id, "14", index, this.itemCounts[index]);
            };

            // BUILD:
            this.buildItem = function(item) {
                var tmpS = (this.scale + item.scale + (item.placeOffset||0));
                var tmpX = this.x + (tmpS * mathCOS(this.dir));
                var tmpY = this.y + (tmpS * mathSIN(this.dir));
                if (this.canBuild(item) && !(item.consume && (this.skin && this.skin.noEat))
                    && (item.consume || objectManager.checkItemLocation(tmpX, tmpY, item.scale,
                                                                        0.6, item.id, false, this))) {
                    var worked = false;
                    if (item.consume) {
                        if (this.hitTime) {
                            var timeSinceHit = Date.now() - this.hitTime;
                            this.hitTime = 0;
                            if (timeSinceHit <= 120) {
                                this.shameCount++;
                                if (this.shameCount >= 8) {
                                    this.shameTimer = 30000;
                                    this.shameCount = 0;
                                }
                            } else {
                                this.shameCount -= 2;
                                if (this.shameCount <= 0) {
                                    this.shameCount = 0;
                                }
                            }
                        }
                        if (this.shameTimer <= 0)
                            worked = item.consume(this);
                    } else {
                        worked = true;
                        if (item.group.limit) {
                            this.changeItemCount(item.group.id, 1);
                        }
                        if (item.pps)
                            this.pps += item.pps;
                        objectManager.add(objectManager.objects.length, tmpX, tmpY, this.dir, item.scale,
                                          item.type, item, false, this);
                    }
                    if (worked) {
                        this.useRes(item);
                        this.buildIndex = -1;
                    }
                }
            };

            // HAS RESOURCES:
            this.hasRes = function(item, mult) {
                for (var i = 0; i < item.req.length;) {
                    if (this[item.req[i]] < Math.round(item.req[i + 1] * (mult||1)))
                        return false;
                    i+=2;
                }
                return true;
            };

            // USE RESOURCES:
            this.useRes = function(item, mult) {
                if (config.inSandbox)
                    return;
                for (var i = 0; i < item.req.length;) {
                    this.addResource(config.resourceTypes.indexOf(item.req[i]), -Math.round(item.req[i+1]*(mult||1)));
                    i+=2;
                }
            };

            // CAN BUILD:
            this.canBuild = function(item) {
                if (config.inSandbox)
                    return true;
                if (item.group.limit && this.itemCounts[item.group.id] >= item.group.limit)
                    return false;
                return this.hasRes(item);
            };

            // GATHER:
            this.gather = function() {

                // SHOW:
                this.noMovTimer = 0;

                // SLOW MOVEMENT:
                this.slowMult -= (items.weapons[this.weaponIndex].hitSlow||0.3);
                if (this.slowMult < 0)
                    this.slowMult = 0;

                // VARIANT DMG:
                var tmpVariant = config.fetchVariant(this);
                var applyPoison = tmpVariant.poison;
                var variantDmg = tmpVariant.val;

                // CHECK IF HIT GAME OBJECT:
                var hitObjs = {};
                var tmpDist, tmpDir, tmpObj, hitSomething;
                var tmpList = objectManager.getGridArrays(this.x, this.y, items.weapons[this.weaponIndex].range);
                for (var t = 0; t < tmpList.length; ++t) {
                    for (var i = 0; i < tmpList[t].length; ++i) {
                        tmpObj = tmpList[t][i];
                        if (tmpObj.active && !tmpObj.dontGather && !hitObjs[tmpObj.sid] && tmpObj.visibleToPlayer(this)) {
                            tmpDist = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - tmpObj.scale;
                            if (tmpDist <= items.weapons[this.weaponIndex].range) {
                                tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
                                if (UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {
                                    hitObjs[tmpObj.sid] = 1;
                                    if (tmpObj.health) {
                                        if (tmpObj.changeHealth(-items.weapons[this.weaponIndex].dmg*(variantDmg)*
                                                                (items.weapons[this.weaponIndex].sDmg||1)*(this.skin&&this.skin.bDmg?this.skin.bDmg:1), this)) {
                                            for (var x = 0; x < tmpObj.req.length;) {
                                                this.addResource(config.resourceTypes.indexOf(tmpObj.req[x]), tmpObj.req[x+1]);
                                                x+=2;
                                            }
                                            objectManager.disableObj(tmpObj);
                                        }
                                    } else {
                                        this.earnXP(4*items.weapons[this.weaponIndex].gather);
                                        var count = items.weapons[this.weaponIndex].gather+(tmpObj.type==3?4:0);
                                        if (this.skin && this.skin.extraGold) {
                                            this.addResource(3, 1);
                                        } this.addResource(tmpObj.type, count);
                                    }
                                    hitSomething = true;
                                    objectManager.hitObj(tmpObj, tmpDir);
                                }
                            }
                        }
                    }
                }

                // CHECK IF HIT PLAYER:
                for (var i = 0; i < players.length + ais.length; ++i) {
                    tmpObj = players[i]||ais[i-players.length];
                    if (tmpObj != this && tmpObj.alive && !(tmpObj.team && tmpObj.team == this.team)) {
                        tmpDist = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - (tmpObj.scale * 1.8);
                        if (tmpDist <= items.weapons[this.weaponIndex].range) {
                            tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
                            if (UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {

                                // STEAL RESOURCES:
                                var stealCount = items.weapons[this.weaponIndex].steal;
                                if (stealCount && tmpObj.addResource) {
                                    stealCount = Math.min((tmpObj.points||0), stealCount);
                                    this.addResource(3, stealCount);
                                    tmpObj.addResource(3, -stealCount);
                                }

                                // MELEE HIT PLAYER:
                                var dmgMlt = variantDmg;
                                if (tmpObj.weaponIndex != undefined && items.weapons[tmpObj.weaponIndex].shield &&
                                    UTILS.getAngleDist(tmpDir+Math.PI, tmpObj.dir) <= config.shieldAngle) {
                                    dmgMlt = items.weapons[tmpObj.weaponIndex].shield;
                                }
                                var dmgVal = items.weapons[this.weaponIndex].dmg *
                                    (this.skin && this.skin.dmgMultO?this.skin.dmgMultO:1) *
                                    (this.tail && this.tail.dmgMultO?this.tail.dmgMultO:1);
                                var tmpSpd = (0.3 * (tmpObj.weightM||1)) + (items.weapons[this.weaponIndex].knock||0);
                                tmpObj.xVel += tmpSpd * mathCOS(tmpDir);
                                tmpObj.yVel += tmpSpd * mathSIN(tmpDir);
                                if (this.skin && this.skin.healD)
                                    this.changeHealth(dmgVal * dmgMlt * this.skin.healD, this);
                                if (this.tail && this.tail.healD)
                                    this.changeHealth(dmgVal * dmgMlt * this.tail.healD, this);
                                if (tmpObj.skin && tmpObj.skin.dmg && dmgMlt == 1)
                                    this.changeHealth(-dmgVal * tmpObj.skin.dmg, tmpObj);
                                if (tmpObj.tail && tmpObj.tail.dmg && dmgMlt == 1)
                                    this.changeHealth(-dmgVal * tmpObj.tail.dmg, tmpObj);
                                if (tmpObj.dmgOverTime && this.skin && this.skin.poisonDmg &&
                                    !(tmpObj.skin && tmpObj.skin.poisonRes)) {
                                    tmpObj.dmgOverTime.dmg = this.skin.poisonDmg;
                                    tmpObj.dmgOverTime.time = this.skin.poisonTime||1;
                                    tmpObj.dmgOverTime.doer = this;
                                } if (tmpObj.dmgOverTime && applyPoison &&
                                      !(tmpObj.skin && tmpObj.skin.poisonRes)) {
                                    tmpObj.dmgOverTime.dmg = 5;
                                    tmpObj.dmgOverTime.time = 5;
                                    tmpObj.dmgOverTime.doer = this;
                                } if (tmpObj.skin && tmpObj.skin.dmgK) {
                                    this.xVel -= tmpObj.skin.dmgK * mathCOS(tmpDir);
                                    this.yVel -= tmpObj.skin.dmgK * mathSIN(tmpDir);
                                } tmpObj.changeHealth(-dmgVal * dmgMlt, this, this);
                            }
                        }
                    }
                }

                // SEND FOR ANIMATION:
                this.sendAnimation(hitSomething?1:0);
            };

            // SEND ANIMATION:
            this.sendAnimation = function(hit) {
                for (var i = 0; i < players.length; ++i) {
                    if (this.sentTo[players[i].id] && this.canSee(players[i])) {
                        server.send(players[i].id, "7", this.sid, hit?1:0, this.weaponIndex);
                    }
                }
            };

            // ANIMATE:
            var tmpRatio = 0;
            var animIndex = 0;
            this.animate = function(delta) {
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
                            this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio));
                            if (tmpRatio >= 1) {
                                tmpRatio = 1;
                                animIndex = 1;
                            }
                        } else {
                            tmpRatio -= delta / (this.animSpeed * (1-config.hitReturnRatio));
                            this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio));
                        }
                    }
                }
            };

            // GATHER ANIMATION:
            this.startAnim = function(didHit, index) {
                this.animTime = this.animSpeed = items.weapons[index].speed;
                this.targetAngle = (didHit?-config.hitAngle:-Math.PI);
                tmpRatio = 0;
                animIndex = 0;
            };

            // CAN SEE:
            this.canSee = function(other) {
                if (!other) return false;
                if (other.skin && other.skin.invisTimer && other.noMovTimer
                    >= other.skin.invisTimer) return false;
                var dx = mathABS(other.x - this.x) - other.scale;
                var dy = mathABS(other.y - this.y) - other.scale;
                return dx <= (config.maxScreenWidth / 2) * 1.3 && dy <= (config.maxScreenHeight / 2) * 1.3;
            };

        };


        /***/ }),

    /***/ "./src/js/data/projectile.js":
    /*!***********************************!*\
  !*** ./src/js/data/projectile.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = function (players, ais, objectManager, items, config, UTILS, server) {

            // INIT:
            this.init = function(indx, x, y, dir, spd, dmg, rng, scl, owner) {
                this.active = true;
                this.indx = indx;
                this.x = x;
                this.y = y;
                this.dir = dir;
                this.skipMov = true;
                this.speed = spd;
                this.dmg = dmg;
                this.scale = scl;
                this.range = rng;
                this.owner = owner;
                if (server)
                    this.sentTo = {};
            };

            // UPDATE:
            var objectsHit = [];
            var tmpObj;
            this.update = function(delta) {
                if (this.active) {
                    var tmpSpeed = this.speed * delta;
                    var tmpScale;
                    if (!this.skipMov) {
                        this.x += tmpSpeed * Math.cos(this.dir);
                        this.y += tmpSpeed * Math.sin(this.dir);
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
                    if (server) {
                        for (var i = 0; i < players.length; ++i) {
                            if (!this.sentTo[players[i].id] && players[i].canSee(this)) {
                                this.sentTo[players[i].id] = 1;
                                server.send(players[i].id, "18", UTILS.fixTo(this.x, 1), UTILS.fixTo(this.y, 1),
                                            UTILS.fixTo(this.dir, 2), UTILS.fixTo(this.range, 1), this.speed, this.indx, this.layer, this.sid);
                            }
                        }
                        objectsHit.length = 0;
                        for (var i = 0; i < players.length + ais.length; ++i) {
                            tmpObj = players[i]||ais[i-players.length];
                            if (tmpObj.alive && tmpObj != this.owner && !(this.owner.team && tmpObj.team == this.owner.team)) {
                                if (UTILS.lineInRect(tmpObj.x-tmpObj.scale, tmpObj.y-tmpObj.scale, tmpObj.x+tmpObj.scale,
                                                     tmpObj.y+tmpObj.scale, this.x, this.y, this.x+(tmpSpeed*Math.cos(this.dir)),
                                                     this.y+(tmpSpeed*Math.sin(this.dir)))) {
                                    objectsHit.push(tmpObj);
                                }
                            }
                        }
                        var tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
                        for (var x = 0; x < tmpList.length; ++x) {
                            for (var y = 0; y < tmpList[x].length; ++y) {
                                tmpObj = tmpList[x][y];
                                tmpScale = tmpObj.getScale();
                                if (tmpObj.active && !(this.ignoreObj == tmpObj.sid) && (this.layer <= tmpObj.layer) &&
                                    objectsHit.indexOf(tmpObj) < 0 && !tmpObj.ignoreCollision && UTILS.lineInRect(tmpObj.x-tmpScale, tmpObj.y-tmpScale, tmpObj.x+tmpScale, tmpObj.y+tmpScale,
                                                                                                                  this.x, this.y, this.x+(tmpSpeed*Math.cos(this.dir)), this.y+(tmpSpeed*Math.sin(this.dir)))) {
                                    objectsHit.push(tmpObj);
                                }
                            }
                        }

                        // HIT OBJECTS:
                        if (objectsHit.length > 0) {
                            var hitObj = null;
                            var shortDist = null;
                            var tmpDist = null;
                            for (var i = 0; i < objectsHit.length; ++i) {
                                tmpDist = UTILS.getDistance(this.x, this.y, objectsHit[i].x, objectsHit[i].y);
                                if (shortDist == null || tmpDist < shortDist) {
                                    shortDist = tmpDist;
                                    hitObj = objectsHit[i];
                                }
                            }
                            if (hitObj.isPlayer || hitObj.isAI) {
                                var tmpSd = 0.3 * (hitObj.weightM||1);
                                hitObj.xVel += tmpSd * Math.cos(this.dir);
                                hitObj.yVel += tmpSd * Math.sin(this.dir);
                                if (hitObj.weaponIndex == undefined || (!(items.weapons[hitObj.weaponIndex].shield &&
                                                                          UTILS.getAngleDist(this.dir+Math.PI, hitObj.dir) <= config.shieldAngle))) {
                                    hitObj.changeHealth(-this.dmg, this.owner, this.owner);
                                }
                            } else {
                                if (hitObj.projDmg && hitObj.health && hitObj.changeHealth(-this.dmg)) {
                                    objectManager.disableObj(hitObj);
                                }
                                for (var i = 0; i < players.length; ++i) {
                                    if (players[i].active) {
                                        if (hitObj.sentTo[players[i].id]) {
                                            if (hitObj.active) {
                                                if (players[i].canSee(hitObj))
                                                    server.send(players[i].id, "8", UTILS.fixTo(this.dir, 2), hitObj.sid);
                                            } else {
                                                server.send(players[i].id, "12", hitObj.sid);
                                            }
                                        }
                                        if (!hitObj.active && hitObj.owner == players[i])
                                            players[i].changeItemCount(hitObj.group.id, -1);
                                    }

                                }
                            }
                            this.active = false;
                            for (var i = 0; i < players.length; ++i) {
                                if (this.sentTo[players[i].id])
                                    server.send(players[i].id, "19", this.sid, UTILS.fixTo(shortDist, 1));
                            }
                        }
                    }
                }
            };
        };


        /***/ }),

    /***/ "./src/js/data/projectileManager.js":
    /*!******************************************!*\
  !*** ./src/js/data/projectileManager.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = function (Projectile, projectiles, players, ais, objectManager, items, config, UTILS, server) {
            this.addProjectile = function(x, y, dir, range, speed, indx, owner, ignoreObj, layer) {
                var tmpData = items.projectiles[indx];
                var tmpProj;
                for (var i = 0; i < projectiles.length; ++i) {
                    if (!projectiles[i].active) {
                        tmpProj = projectiles[i];
                        break;
                    }
                } if (!tmpProj) {
                    tmpProj = new Projectile(players, ais, objectManager, items, config, UTILS, server);
                    tmpProj.sid = projectiles.length;
                    projectiles.push(tmpProj);
                }
                tmpProj.init(indx, x, y, dir, speed, tmpData.dmg, range, tmpData.scale, owner);
                tmpProj.ignoreObj = ignoreObj;
                tmpProj.layer = layer||tmpData.layer;
                tmpProj.src = tmpData.src;
                return tmpProj;
            };
        };


        /***/ }),

    /***/ "./src/js/data/store.js":
    /*!******************************!*\
  !*** ./src/js/data/store.js ***!
  \******************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // STORE HATS:
        module.exports.hats = [{
            id: 45,
            name: "Shame!",
            dontSell: false,
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
            price: 1000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 4,
            name: "Ranger Hat",
            price: 2000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 18,
            name: "Explorer Hat",
            price: 2000,
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
            price: 3000,
            scale: 120,
            desc: "increases arrow speed and range",
            aMlt: 1.3
        }, {
            id: 10,
            name: "Bush Gear",
            price: 3000,
            scale: 160,
            desc: "allows you to disguise yourself as a bush"
        }, {
            id: 48,
            name: "Halo",
            price: 3000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 6,
            name: "Soldier Helmet",
            price: 4000,
            scale: 120,
            desc: "reduces damage taken but slows movement",
            spdMult: 0.94,
            dmgMult: 0.75
        }, {
            id: 23,
            name: "Anti Venom Gear",
            price: 4000,
            scale: 120,
            desc: "makes you immune to poison",
            poisonRes: 1
        }, {
            id: 13,
            name: "Medic Gear",
            price: 5000,
            scale: 110,
            desc: "slowly regenerates health over time",
            healthRegen: 3
        }, {
            id: 9,
            name: "Miners Helmet",
            price: 5000,
            scale: 120,
            desc: "earn 1 extra gold per resource",
            extraGold: 1
        }, {
            id: 32,
            name: "Musketeer Hat",
            price: 5000,
            scale: 120,
            desc: "reduces cost of projectiles",
            projCost: 0.5
        }, {
            id: 7,
            name: "Bull Helmet",
            price: 6000,
            scale: 120,
            desc: "increases damage done but drains health",
            healthRegen: -5,
            dmgMultO: 1.5,
            spdMult: 0.96
        }, {
            id: 22,
            name: "Emp Helmet",
            price: 6000,
            scale: 120,
            desc: "turrets won't attack but you move slower",
            antiTurret: 1,
            spdMult: 0.7
        }, {
            id: 12,
            name: "Booster Hat",
            price: 6000,
            scale: 120,
            desc: "increases your movement speed",
            spdMult: 1.16
        }, {
            id: 26,
            name: "Barbarian Armor",
            price: 8000,
            scale: 120,
            desc: "knocks back enemies that attack you",
            dmgK: 0.6
        }, {
            id: 21,
            name: "Plague Mask",
            price: 10000,
            scale: 120,
            desc: "melee attacks deal poison damage",
            poisonDmg: 5,
            poisonTime: 6
        }, {
            id: 46,
            name: "Bull Mask",
            price: 10000,
            scale: 120,
            desc: "bulls won't target you unless you attack them",
            bullRepel: 1
        }, {
            id: 14,
            name: "Windmill Hat",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "generates points while worn",
            pps: 1.5
        }, {
            id: 11,
            name: "Spike Gear",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "deal damage to players that damage you",
            dmg: 0.45
        }, {
            id: 53,
            name: "Turret Gear",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "you become a walking turret",
            turret: {
                proj: 1,
                range: 700,
                rate: 2500
            },
            spdMult: 0.7
        }, {
            id: 20,
            name: "Samurai Armor",
            price: 12000,
            scale: 120,
            desc: "increased attack speed and fire rate",
            atkSpd: 0.78
        }, {
            id: 58,
            name: "Dark Knight",
            price: 12000,
            scale: 120,
            desc: "restores health when you deal damage",
            healD: 0.4
        }, {
            id: 27,
            name: "Scavenger Gear",
            price: 15000,
            scale: 120,
            desc: "earn double points for each kill",
            kScrM: 2
        }, {
            id: 40,
            name: "Tank Gear",
            price: 15000,
            scale: 120,
            desc: "increased damage to buildings but slower movement",
            spdMult: 0.3,
            bDmg: 3.3
        }, {
            id: 52,
            name: "Thief Gear",
            price: 15000,
            scale: 120,
            desc: "steal half of a players gold when you kill them",
            goldSteal: 0.5
        }, {
            id: 55,
            name: "Bloodthirster",
            price: 20000,
            scale: 120,
            desc: "Restore Health when dealing damage. And increased damage",
            healD: 0.25,
            dmgMultO: 1.2,
        }, {
            id: 56,
            name: "Assassin Gear",
            price: 20000,
            scale: 120,
            desc: "Go invisible when not moving. Can't eat. Increased speed",
            noEat: true,
            spdMult: 1.1,
            invisTimer: 1000
        }];

        // STORE ACCESSORIES:
        module.exports.accessories = [{
            id: 12,
            name: "Snowball",
            price: 1000,
            scale: 105,
            xOff: 18,
            desc: "no effect"
        }, {
            id: 9,
            name: "Tree Cape",
            price: 1000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 10,
            name: "Stone Cape",
            price: 1000,
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
            price: 2000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 11,
            name: "Monkey Tail",
            price: 2000,
            scale: 97,
            xOff: 25,
            desc: "Super speed but reduced damage",
            spdMult: 1.35,
            dmgMultO: 0.2
        }, {
            id: 17,
            name: "Apple Basket",
            price: 3000,
            scale: 80,
            xOff: 12,
            desc: "slowly regenerates health over time",
            healthRegen: 1
        }, {
            id: 6,
            name: "Winter Cape",
            price: 3000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 4,
            name: "Skull Cape",
            price: 4000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 5,
            name: "Dash Cape",
            price: 5000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 2,
            name: "Dragon Cape",
            price: 6000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 1,
            name: "Super Cape",
            price: 8000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 7,
            name: "Troll Cape",
            price: 8000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 14,
            name: "Thorns",
            price: 10000,
            scale: 115,
            xOff: 20,
            desc: "no effect"
        }, {
            id: 15,
            name: "Blockades",
            price: 10000,
            scale: 95,
            xOff: 15,
            desc: "no effect"
        }, {
            id: 20,
            name: "Devils Tail",
            price: 10000,
            scale: 95,
            xOff: 20,
            desc: "no effect"
        }, {
            id: 16,
            name: "Sawblade",
            price: 12000,
            scale: 90,
            spin: true,
            xOff: 0,
            desc: "deal damage to players that damage you",
            dmg: 0.15
        }, {
            id: 13,
            name: "Angel Wings",
            price: 15000,
            scale: 138,
            xOff: 22,
            desc: "slowly regenerates health over time",
            healthRegen: 3
        }, {
            id: 19,
            name: "Shadow Wings",
            price: 15000,
            scale: 138,
            xOff: 22,
            desc: "increased movement speed",
            spdMult: 1.1
        }, {
            id: 18,
            name: "Blood Wings",
            price: 20000,
            scale: 178,
            xOff: 26,
            desc: "restores health when you deal damage",
            healD: 0.2
        }, {
            id: 21,
            name: "Corrupt X Wings",
            price: 20000,
            scale: 178,
            xOff: 26,
            desc: "deal damage to players that damage you",
            dmg: 0.25
        }];


        /***/ }),

    /***/ "./src/js/libs/animText.js":
    /*!*********************************!*\
  !*** ./src/js/libs/animText.js ***!
  \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // ANIMATED TEXT:
        module.exports.AnimText = function() {

            // INIT:
            this.init = function(x, y, scale, speed, life, text, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.scale = scale;
                this.startScale = this.scale;
                this.maxScale = scale * 2;
                this.scaleSpeed = 0.3;
                this.speed = speed;
                this.life = life;
                this.text = text;
            };

            // UPDATE:
            this.update = function(delta) {
                if (this.life) {
                    this.life -= delta;
                    this.y -= this.speed * delta;
                    this.scale += this.scaleSpeed * delta;
                    if (this.scale >= this.maxScale) {
                        this.scale = this.maxScale;
                        this.scaleSpeed *= -1;
                    } else if (this.scale <= this.startScale) {
                        this.scale = this.startScale;
                        this.scaleSpeed = 0;
                    }
                    if (this.life <= 0) {
                        this.life = 0;
                    }
                }
            };

            // RENDER:
            this.render = function(ctxt, xOff, yOff) {
                ctxt.fillStyle = this.color;
                ctxt.font = this.scale + "px Hammersmith One";
                (getEl('damageout').checked ? ctxt.strokeText(this.text, this.x - xOff, this.y - yOff) : '');
                ctxt.fillText(this.text, this.x - xOff, this.y - yOff);
            };

        }

        // TEXT MANAGER:
        module.exports.TextManager = function() {
            this.texts = [];

            // UPDATE:
            this.update = function(delta, ctxt, xOff, yOff) {
                ctxt.textBaseline = "middle";
                ctxt.textAlign = "center";
                for (var i = 0; i < this.texts.length; ++i) {
                    if (this.texts[i].life) {
                        this.texts[i].update(delta);
                        this.texts[i].render(ctxt, xOff, yOff);
                    }
                }
            };

            // SHOW TEXT:
            this.showText = function(x, y, scale, speed, life, text, color) {
                var tmpText;
                for (var i = 0; i < this.texts.length; ++i) {
                    if (!this.texts[i].life) {
                        tmpText = this.texts[i];
                        break;
                    }
                }
                if (!tmpText) {
                    tmpText = new module.exports.AnimText();
                    this.texts.push(tmpText);
                }
                tmpText.init(x, y, scale, speed, life, text, color);
            };
        }


        /***/ }),

    /***/ "./src/js/libs/io-client.js":
    /*!**********************************!*\
  !*** ./src/js/libs/io-client.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var msgpack = __webpack_require__(/*! msgpack-lite */ "./node_modules/msgpack-lite/lib/browser.js");
        var config = __webpack_require__(/*! ../config */ "./src/js/config.js");

        module.exports = {
            socket: null,
            connected: false,
            socketId: -1,
            connect: function(address, callback, events) {
                if (this.socket) return;

                // CREATE SOCKET:
                var _this = this;
                try {
                    var socketError = false;
                    var socketAddress = address;
                    this.socket = new WebSocket(socketAddress);
                    this.socket.binaryType = "arraybuffer";
                    this.socket.onmessage = function(message) {

                        // PARSE MESSAGE:
                        var data = new Uint8Array(message.data);
                        var parsed = msgpack.decode(data);
                        var type = parsed[0];
                        var data = parsed[1];

                        // CALL EVENT:
                        if (type == "io-init") {
                            _this.socketId = data[0];
                        } else {
                            events[type].apply(undefined, data);
                        }
                    };
                    this.socket.onopen = function() {
                        _this.connected = true;
                        callback();
                    };
                    this.socket.onclose = function(event) {
                        _this.connected = false;
                        if (event.code == 4001) {
                            callback("Invalid Connection");
                        } else if (!socketError) {
                            callback("disconnected");
                        }
                    };
                    this.socket.onerror = function(error) {
                        if (this.socket && this.socket.readyState != WebSocket.OPEN) {
                            socketError = true;
                            console.error("Socket error", arguments);
                            callback("Socket error");
                        }
                    };
                } catch(e) {
                    console.warn("Socket connection error:", e);
                    callback(e);
                }
            },
            send: function(type) {
                // EXTRACT DATA ARRAY:
                var data = Array.prototype.slice.call(arguments, 1);

                // SEND MESSAGE:
                var binary = msgpack.encode([type, data]);
                this.socket.send(binary);
            },
            socketReady: function() {
                return (this.socket && this.connected);
            },
            close: function() {
                this.socket && this.socket.close();
            }
        };


        /***/ }),

    /***/ "./src/js/libs/modernizr.js":
    /*!**********************************!*\
  !*** ./src/js/libs/modernizr.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        !function(e,n,s){function o(e,n){return typeof e===n}function a(){var e,n,s,a,t,f,l;for(var c in r)if(r.hasOwnProperty(c)){if(e=[],n=r[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,t=0;t<e.length;t++)f=e[t],l=f.split("."),1===l.length?Modernizr[l[0]]=a:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=a),i.push((a?"":"no-")+l.join("-"))}}function t(e){var n=l.className,s=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),c?l.className.baseVal=n:l.className=n)}var i=[],r=[],f={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var l=n.documentElement,c="svg"===l.nodeName.toLowerCase();Modernizr.addTest("passiveeventlisteners",function(){var n=!1;try{var s=Object.defineProperty({},"passive",{get:function(){n=!0}});e.addEventListener("test",null,s)}catch(o){}return n}),a(),t(i),delete f.addTest,delete f.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);


        /***/ }),

    /***/ "./src/js/libs/soundManager.js":
    /*!*************************************!*\
  !*** ./src/js/libs/soundManager.js ***!
  \*************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // PLAYER MANAGER:
        module.exports.obj = function(config, UTILS) {

            // INIT:
            var tmpSound;
            this.sounds = [];
            this.active = true;

            // PLAY SOUND:
            this.play = function(id, volume, loop) {
                if (!volume || !this.active) return;
                tmpSound = this.sounds[id];
                if (!tmpSound) {
                    tmpSound = new Howl({
                        src: ".././sound/" + id + ".mp3"
                    });
                    this.sounds[id] = tmpSound;
                }
                if (!loop || !tmpSound.isPlaying) {
                    tmpSound.isPlaying = true;
                    tmpSound.play();
                    tmpSound.volume((volume||1)*config.volumeMult);
                    tmpSound.loop(loop);
                }
            };

            // TOGGLE MUTE:
            this.toggleMute = function(id, mute) {
                tmpSound = this.sounds[id];
                if (tmpSound) tmpSound.mute(mute);
            };

            // STOP SOUND:
            this.stop = function(id) {
                tmpSound = this.sounds[id];
                if (tmpSound) {
                    tmpSound.stop();
                    tmpSound.isPlaying = false;
                }
            };

        };


        /***/ }),

    /***/ "./src/js/libs/utils.js":
    /*!******************************!*\
  !*** ./src/js/libs/utils.js ***!
  \******************************/
    /*! no static exports found */
    /***/ (function(module, exports) {


        // MATH UTILS:
        var mathABS = Math.abs;
        var mathCOS = Math.cos;
        var mathSIN = Math.sin;
        var mathPOW = Math.pow;
        var mathSQRT = Math.sqrt;
        var mathHYPOT = Math.hypot;
        var mathATAN2 = Math.atan2;
        var mathPI = Math.PI;

        // GLOBAL UTILS:
        module.exports.toRad = function (angle) {
            return angle * (Math.PI / 180);
        };
        module.exports.toAng = function (radian) {
            return radian / (Math.PI / 180);
        };
        module.exports.randInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        module.exports.randFloat = function (min, max) {
            return Math.random() * (max - min + 1) + min;
        };
        module.exports.lerp = function (value1, value2, amount) {
            return value1 + (value2 - value1) * amount;
        };
        module.exports.decel = function (val, cel) {
            if (val > 0)
                val = Math.max(0, val - cel);
            else if (val < 0)
                val = Math.min(0, val + cel);
            return val;
        };
        module.exports.getDistance = function (x1, y1, x2, y2) {
            return mathSQRT((x2 -= x1) * x2 + (y2 -= y1) * y2);
        };
        module.exports.getDist = function (tmp1, tmp2) {
            return mathSQRT((tmp2.x -= tmp1.x) * tmp2.x + (tmp2.y -= tmp1.y) * tmp2.y);
        };
        module.exports.getDirection = function (x1, y1, x2, y2) {
            return mathATAN2(y1 - y2, x1 - x2);
        };
        module.exports.getDirect = function (tmp1, tmp2) {
            return mathATAN2(tmp1.y - tmp2.y, tmp1.x - tmp2.x);
        };
        module.exports.getAngleDist = function (a, b) {
            var p = mathABS(b - a) % (mathPI * 2);
            return (p > mathPI ? (mathPI * 2) - p : p);
        };
        module.exports.isNumber = function (n) {
            return (typeof n == "number" && !isNaN(n) && isFinite(n));
        };
        module.exports.isString = function (s) {
            return (s && typeof s == "string");
        };
        module.exports.kFormat = function (num) {
            return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
        };
        module.exports.capitalizeFirst = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        module.exports.fixTo = function (n, v) {
            return parseFloat(n.toFixed(v));
        };
        module.exports.sortByPoints = function (a, b) {
            return parseFloat(b.points) - parseFloat(a.points);
        };
        module.exports.lineInRect = function (recX, recY, recX2, recY2, x1, y1, x2, y2) {
            var minX = x1;
            var maxX = x2;
            if (x1 > x2) {
                minX = x2;
                maxX = x1;
            }
            if (maxX > recX2)
                maxX = recX2;
            if (minX < recX)
                minX = recX;
            if (minX > maxX)
                return false;
            var minY = y1;
            var maxY = y2;
            var dx = x2 - x1;
            if (Math.abs(dx) > 0.0000001) {
                var a = (y2 - y1) / dx;
                var b = y1 - a * x1;
                minY = a * minX + b;
                maxY = a * maxX + b;
            }
            if (minY > maxY) {
                var tmp = maxY;
                maxY = minY;
                minY = tmp;
            }
            if (maxY > recY2)
                maxY = recY2;
            if (minY < recY)
                minY = recY;
            if (minY > maxY)
                return false;
            return true;
        };
        module.exports.containsPoint = function (element, x, y) {
            var bounds = element.getBoundingClientRect();
            var left = bounds.left + window.scrollX;
            var top = bounds.top + window.scrollY;
            var width = bounds.width;
            var height = bounds.height;

            var insideHorizontal = x > left && x < left + width;
            var insideVertical = y > top && y < top + height;
            return insideHorizontal && insideVertical;
        };
        module.exports.mousifyTouchEvent = function(event) {
            var touch = event.changedTouches[0];
            event.screenX = touch.screenX;
            event.screenY = touch.screenY;
            event.clientX = touch.clientX;
            event.clientY = touch.clientY;
            event.pageX = touch.pageX;
            event.pageY = touch.pageY;
        };
        module.exports.hookTouchEvents = function (element, skipPrevent) {
            var preventDefault = !skipPrevent;
            var isHovering = false;
            // var passive = window.Modernizr.passiveeventlisteners ? {passive: true} : false;
            var passive = false;
            element.addEventListener("touchstart", module.exports.checkTrusted(touchStart), passive);
            element.addEventListener("touchmove", module.exports.checkTrusted(touchMove), passive);
            element.addEventListener("touchend", module.exports.checkTrusted(touchEnd), passive);
            element.addEventListener("touchcancel", module.exports.checkTrusted(touchEnd), passive);
            element.addEventListener("touchleave", module.exports.checkTrusted(touchEnd), passive);
            function touchStart(e) {
                module.exports.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (element.onmouseover)
                    element.onmouseover(e);
                isHovering = true;
            }
            function touchMove(e) {
                module.exports.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (module.exports.containsPoint(element, e.pageX, e.pageY)) {
                    if (!isHovering) {
                        if (element.onmouseover)
                            element.onmouseover(e);
                        isHovering = true;
                    }
                } else {
                    if (isHovering) {
                        if (element.onmouseout)
                            element.onmouseout(e);
                        isHovering = false;
                    }
                }
            }
            function touchEnd(e) {
                module.exports.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (isHovering) {
                    if (element.onclick)
                        element.onclick(e);
                    if (element.onmouseout)
                        element.onmouseout(e);
                    isHovering = false;
                }
            }
        };
        module.exports.removeAllChildren = function (element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
        };
        module.exports.generateElement = function (config) {
            var element = document.createElement(config.tag || "div");
            function bind(configValue, elementValue) {
                if (config[configValue])
                    element[elementValue] = config[configValue];
            }
            bind("text", "textContent");
            bind("html", "innerHTML");
            bind("class", "className");
            for (var key in config) {
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
            if (element.onclick)
                element.onclick = module.exports.checkTrusted(element.onclick);
            if (element.onmouseover)
                element.onmouseover = module.exports.checkTrusted(element.onmouseover);
            if (element.onmouseout)
                element.onmouseout = module.exports.checkTrusted(element.onmouseout);
            if (config.style) {
                element.style.cssText = config.style;
            }
            if (config.hookTouch) {
                module.exports.hookTouchEvents(element);
            }
            if (config.parent) {
                config.parent.appendChild(element);
            }
            if (config.children) {
                for (var i = 0; i < config.children.length; i++) {
                    element.appendChild(config.children[i]);
                }
            }
            return element;
        }
        module.exports.eventIsTrusted = function(ev) {
            if (ev && typeof ev.isTrusted == "boolean") {
                return ev.isTrusted;
            } else {
                return true;
            }
        }
        module.exports.checkTrusted = function(callback) {
            return function(ev) {
                if (ev && ev instanceof Event && module.exports.eventIsTrusted(ev)) {
                    callback(ev);
                } else {
                    //console.error("Event is not trusted.", ev);
                }
            }
        }
        module.exports.randomString = function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        module.exports.countInArray = function(array, val) {
            var count = 0;
            for (var i = 0; i < array.length; i++) {
                if (array[i] === val) count++;
            } return count;
        };


        /***/ }),

    /***/ "./vultr/VultrClient.js":
    /*!******************************!*\
  !*** ./vultr/VultrClient.js ***!
  \******************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
        var md5 = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");

        function VultrClient(baseUrl, devPort, lobbySize, lobbySpread, rawIPs) {
            // Redirect from "localhost" to "127.0.0.1" if needed; this is because the server
            // manager uses "127.0.0.1" as the home
            if (location.hostname == "localhost") {
                window.location.hostname = "127.0.0.1";
            }

            // Don't log anything
            this.debugLog = false;

            // Save the base data
            this.baseUrl = baseUrl;
            this.lobbySize = lobbySize;
            this.devPort = devPort;
            this.lobbySpread = lobbySpread;
            this.rawIPs = !!rawIPs;

            // Default data
            this.server = undefined;
            this.gameIndex = undefined;

            // Callback for the client
            this.callback = undefined;
            this.errorCallback = undefined;

            // Process the servers
            this.processServers(vultr.servers);
        }

        VultrClient.prototype.regionInfo = {
            0: { name: "Local", latitude: 0, longitude: 0 },
            "vultr:1": { name: "New Jersey", latitude: 40.1393329, longitude: -75.8521818 },
            "vultr:2": { name: "Chicago", latitude: 41.8339037, longitude: -87.872238 },
            "vultr:3": { name: "Dallas", latitude: 32.8208751, longitude: -96.8714229 },
            "vultr:4": { name: "Seattle", latitude: 47.6149942, longitude: -122.4759879 },
            "vultr:5": { name: "Los Angeles", latitude: 34.0207504, longitude: -118.691914 },
            "vultr:6": { name: "Atlanta", latitude: 33.7676334, longitude: -84.5610332 },
            "vultr:7": { name: "Amsterdam", latitude: 52.3745287, longitude: 4.7581878 },
            "vultr:8": { name: "London", latitude: 51.5283063, longitude: -0.382486 },
            "vultr:9": { name: "Frankfurt", latitude: 50.1211273, longitude: 8.496137 },
            "vultr:12": { name: "Silicon Valley", latitude: 37.4024714, longitude: -122.3219752 },
            "vultr:19": { name: "Sydney", latitude: -33.8479715, longitude: 150.651084 },
            "vultr:24": { name: "Paris", latitude: 48.8588376, longitude: 2.2773454 },
            "vultr:25": { name: "Tokyo", latitude: 35.6732615, longitude: 139.569959 },
            "vultr:39": { name: "Miami", latitude: 25.7823071, longitude: -80.3012156 },
            "vultr:40": { name: "Singapore", latitude: 1.3147268, longitude: 103.7065876 }
        };

        VultrClient.prototype.start = function(callback, errorCallback) {
            // Set the callback
            this.callback = callback;
            this.errorCallback = errorCallback;

            // Parse the query for a server; if doesn't exist, ping the servers to find
            // the right one
            var query = this.parseServerQuery();
            if (query) {
                this.log("Found server in query.");
                this.password = query[3];
                this.connect(query[0], query[1], query[2]);
            } else {
                this.log("Pinging servers...");
                this.pingServers();
            }
        };

        VultrClient.prototype.parseServerQuery = function() {
            // Get the server from the query
            var parsed = url.parse(location.href, true);
            var serverRaw = parsed.query.server;
            if (typeof serverRaw != "string") {
                return;
            }

            // Parse the server string
            var split = serverRaw.split(":");
            if (split.length != 3) {
                this.errorCallback("Invalid number of server parameters in " + serverRaw);
                return;
            }
            var region = split[0];
            var index = parseInt(split[1]);
            var gameIndex = parseInt(split[2]);

            if (region != "0" && !region.startsWith("vultr:")) {
                region = "vultr:" + region;
            }

            return [region, index, gameIndex, parsed.query.password];
        };

        VultrClient.prototype.findServer = function(region, index) {
            // Find the list of servers for the region
            var serverList = this.servers[region];
            if (!Array.isArray(serverList)) {
                this.errorCallback("No server list for region " + region);
                return;
            }

            // Find the server matching the index
            for (var i = 0; i < serverList.length; i++) {
                var server = serverList[i];

                if (server.index == index) {
                    return server;
                }
            }

            // Otherwise, return nothing
            console.warn("Could not find server in region " + region + " with index " + index + ".");
            return;
        };

        VultrClient.prototype.pingServers = function() {
            var _this = this;

            // Ping random servers from each region
            var requests = [];
            for (var region in this.servers) {
                // Find the server to ping
                if (!this.servers.hasOwnProperty(region)) continue;
                var serverList = this.servers[region];
                var targetServer = serverList[Math.floor(Math.random() * serverList.length)];

                // Handle no server
                if (targetServer == undefined) {
                    console.log("No target server for region " + region);
                    continue;
                }

                // Ping the server
                (function(serverList, targetServer) {
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function(requestEvent) {
                        var request = requestEvent.target;

                        // Ensure that the request finished
                        if (request.readyState != 4)
                            return;

                        if (request.status == 200) {
                            // Stop all other ping requests
                            for (var i = 0; i < requests.length; i++) {
                                requests[i].abort();
                            }

                            _this.log("Connecting to region", targetServer.region);

                            // Seek the appropriate server
                            var targetGame = _this.seekServer(targetServer.region);
                            _this.connect(targetGame[0], targetGame[1], targetGame[2]);
                        } else {
                            console.warn("Error pinging " + targetServer.ip + " in region " + region);
                        }
                    };

                    var targetAddress = "//" + _this.serverAddress(targetServer.ip, true) + ":" + _this.serverPort(targetServer) + "/ping";
                    request.open("GET", targetAddress, true);
                    request.send(null);

                    _this.log("Pinging", targetAddress);

                    // Save the request
                    requests.push(request);
                })(serverList, targetServer);
            }
        };

        /// Finds a new server; region is the index of the region to look in; game mode is the mode to search for;
        /// reload is wether a connection should be created or the page should be redirected
        VultrClient.prototype.seekServer = function(region, isPrivate, gameMode) {
            if (gameMode == undefined) {
                gameMode = "random";
            }
            if (isPrivate == undefined) {
                isPrivate = false;
            }

            // Define configuration
            const gameModeList = [ "random" ];
            var lobbySize = this.lobbySize;
            var lobbySpread = this.lobbySpread;

            // Sort the servers by player count then filter by available servers
            var servers = this.servers[region]
            .flatMap(function(s) {
                // Map the servers to { region, index, gameIndex, gameCount, playerCount, isPrivate } where index is from 0 to (total servers * games per server)
                // This way, we can decompose the index again later to find the server amd game index
                var gameIndex = 0;
                return s.games.map(function(g) {
                    var currentGameIndex = gameIndex++;
                    return {
                        region: s.region,
                        index: s.index * s.games.length + currentGameIndex,
                        gameIndex: currentGameIndex,
                        gameCount: s.games.length,
                        playerCount: g.playerCount,
                        isPrivate: g.isPrivate
                    }
                });
            })
            .filter(function(s) {
                // Remove private games
                return !s.isPrivate;
            })
            .filter(function(s) {
                // If private, only find rooms that are empty and have a large enough index
                if (isPrivate) {
                    return s.playerCount == 0 && s.gameIndex >= s.gameCount / 2;
                } else {
                    return true;
                }
            })
            .filter(function(s) {
                // If not a random game mode, filter them to the proper mode
                if (gameMode == "random") {
                    return true;
                } else {
                    return gameModeList[s.index % gameModeList.length].key == gameMode;
                }
            })
            .sort(function(a, b) { return b.playerCount - a.playerCount })
            .filter(function(s) { return s.playerCount < lobbySize });

            // Reverse the server list so private servers are at the end of the list
            if (isPrivate) {
                servers.reverse();
            }

            // Handle no available servers
            if (servers.length == 0) {
                this.errorCallback("No open servers.");
                return;
            }

            // Pick a random server; `lobbySpread` defines how many top lobbies to spread the players
            // over
            var randomSpread = Math.min(lobbySpread, servers.length);
            var serverIndex = Math.floor(Math.random() * randomSpread);
            serverIndex = Math.min(serverIndex, servers.length - 1);
            var rawServer = servers[serverIndex];

            // Extract the information from the raw server
            var serverRegion = rawServer.region;
            var serverIndex = Math.floor(rawServer.index / rawServer.gameCount);
            var gameIndex = rawServer.index % rawServer.gameCount;
            this.log("Found server.");

            // Determine what to do with the information
            return [serverRegion, serverIndex, gameIndex];
        };

        VultrClient.prototype.connect = function(region, index, game) {
            // Make sure not connected already
            if (this.connected) {
                return;
            }

            // Find the server with the given data
            var server = this.findServer(region, index);
            if (server == undefined) {
                this.errorCallback("Failed to find server for region " + region + " and index " + index);
                return;
            }

            this.log("Connecting to server", server, "with game index", game);

            // Check if the server is full
            if (server.games[game].playerCount >= this.lobbySize) {
                this.errorCallback("Server is already full.");
                return;
            }

            // Replace the URL
            window.history.replaceState(document.title, document.title, this.generateHref(region, index, game, this.password));

            // Save the server
            this.server = server;
            this.gameIndex = game;

            // Return the address and port
            this.log("Calling callback with address", this.serverAddress(server.ip), "on port", this.serverPort(server), "with game index", game);
            this.callback(this.serverAddress(server.ip), this.serverPort(server), game);
        };

        VultrClient.prototype.switchServer = function(region, index, game, password) {
            // Save switching
            this.switchingServers = true;

            // Navigate to the server
            window.location.href = this.generateHref(region, index, game, password);
        };

        VultrClient.prototype.generateHref = function(region, index, game, password) {
            region = this.stripRegion(region);

            // Generate HREF
            var href = "/?server=" + region + ":" + index + ":" + game;
            if (password) {
                href += "&password=" + encodeURIComponent(password);
            }
            return href;
        };

        /// Returns the server address for an IP using reverse DNS lookup; turn `forceSecure`
        /// on in order to force the server address to go through Cloudflare
        VultrClient.prototype.serverAddress = function(ip, forceSecure) {
            // Determine the domain to connect to; this way it connects directly to localhost if needed
            // "903d62ef5d1c2fecdcaeb5e7dd485eff" is the md5 hash for "127.0.0.1"
            if (ip == "127.0.0.1" || ip == "7f000001" || ip == "903d62ef5d1c2fecdcaeb5e7dd485eff") {
                // return "127.0.0.1";
                return window.location.hostname; // This allows for connection over local IP networks
            } else if (this.rawIPs) {
                if (forceSecure) {
                    return "ip_" + this.hashIP(ip) + "." + this.baseUrl;
                } else {
                    return ip;
                }
            } else {
                return "ip_" + ip + "." + this.baseUrl;
            }
        };

        /// Returns the port to connect to
        VultrClient.prototype.serverPort = function(server) {
            // Return dev port if development server
            if (server.region == 0) {
                return this.devPort;
            }

            // Otherwise return the port depending on the protocol
            return location.protocol.startsWith("https") ? 443 : 80;
        };

        VultrClient.prototype.processServers = function(serverList) {
            // Group the servers by region
            var servers = { };
            for (var i = 0; i < serverList.length; i++) {
                var server = serverList[i];

                // Get or create the list
                var list = servers[server.region];
                if (list == undefined) {
                    list = [];
                    servers[server.region] = list;
                }

                // Add the server
                list.push(server);
            }

            // Sort the servers
            for (var region in servers) {
                // Sort the servers
                servers[region] = servers[region].sort(function(a, b) { return a.index - b.index });
            }

            // Save the servers
            this.servers = servers;
        };

        // TODO: Merge into VultrManager
        /// Converts an IP to a hex string
        VultrClient.prototype.ipToHex = function(ip) {
            const encoded = ip.split(".") // Split by components
            .map((component) =>
                 ("00" + parseInt(component).toString(16)) // Parses the component then converts it to a hex
                 .substr(-2) // Ensures there's 2 characters
                )
            .join("") // Join the string
            .toLowerCase(); // Make sure it's lowercase
            return encoded;
        };

        // TODO: Merge into VultrManager
        /// Hashes an IP to a cryptographically secure string; it does this by converting
        /// the ip to a hex string then doing an md5 hash on the string; e.g. "102.168.1.128" ->
        /// "c0a80180" -> "f8177f9878f2d00df00e51d786d97c0a"
        VultrClient.prototype.hashIP = function(ip) {
            return md5(this.ipToHex(ip));
        };

        /// Logs debug information
        VultrClient.prototype.log = function() {
            if (this.debugLog) {
                return console.log.apply(undefined, arguments);
            } else if (console.verbose) {
                return console.verbose.apply(undefined, arguments);
            }
        };

        VultrClient.prototype.stripRegion = function(region) {
            if (region.startsWith("vultr:")) {
                region = region.slice(6);
            } else if (region.startsWith("do:")) {
                region = region.slice(3);
            }
            return region;
        };

        window.testVultrClient = function() {
            var assertIndex = 1;
            function assert(actual, expected) {
                actual = `${actual}`;
                expected = `${expected}`;
                if (actual == expected) {
                    console.log(`Assert ${assertIndex} passed.`)
                } else {
                    console.warn(`Assert ${assertIndex} failed. Expected ${expected}, got ${actual}.`)
                }
                assertIndex++;
            }

            function generateServerList(regions) {
                var servers = [];
                for (var region in regions) {
                    var regionServers = regions[region];
                    for (var i = 0; i < regionServers.length; i++) {
                        servers.push({
                            ip: region + ":" + i,
                            scheme: "testing",
                            region: region,
                            index: i,
                            games: regionServers[i].map(p => { return { playerCount: p, isPrivate: false }; })
                        });
                    }
                }
                return servers;
            }

            // Test 1
            var maxPlayers = 5;
            var client1 = new VultrClient("test.io", -1, maxPlayers, 1, false);
            var lastError = undefined;
            client1.errorCallback = function(error) { lastError = error };
            client1.processServers(generateServerList({
                1: [[0, 0, 0, 0], [0, 0, 0, 0]],
                2: [[maxPlayers, 1, 0, 0], [0, 0, 0, 0]],
                3: [[maxPlayers, 0, 1, maxPlayers], [0, 0, 0, 0]],
                4: [[maxPlayers, 1, 1, maxPlayers], [1, 0, 0, 0]],
                5: [[maxPlayers, 1, 1, maxPlayers], [1, 0, maxPlayers-1, 0]],
                6: [[maxPlayers, maxPlayers, maxPlayers, maxPlayers], [2, 3, 1, 4]],
                7: [[maxPlayers, maxPlayers, maxPlayers, maxPlayers], [maxPlayers, maxPlayers, maxPlayers, maxPlayers]],
            }));
            assert(client1.seekServer(1, false), [1, 0, 0]);
            assert(client1.seekServer(1, true), [1, 1, 3]);
            assert(client1.seekServer(2, false), [2, 0, 1]);
            assert(client1.seekServer(2, true), [2, 1, 3]);
            assert(client1.seekServer(3, false), [3, 0, 2]);
            assert(client1.seekServer(3, true), [3, 1, 3]);
            assert(client1.seekServer(4, false), [4, 0, 1]);
            assert(client1.seekServer(4, true), [4, 1, 3]);
            assert(client1.seekServer(5, false), [5, 1, 2]);
            assert(client1.seekServer(5, true), [5, 1, 3]);
            assert(client1.seekServer(6, false), [6, 1, 3]);
            assert(client1.seekServer(6, true), undefined);
            assert(client1.seekServer(7, false), undefined);
            assert(client1.seekServer(7, true), undefined);

            console.log("Tests passed.");
        };

        // FLATMAP:
        var concat = function(x, y) { return x.concat(y) };

        var flatMap = function(f, xs) { return xs.map(f).reduce(concat, []); };

        Array.prototype.flatMap = function(f) {
            return flatMap(f, this)
        };

        module.exports = VultrClient;


        /***/ })

    /******/ });
//# sourceMappingURL=bundle.js.map


(function() {
    'use strict';
requestAnimationFrame = (a) => setTimeout(a, 1e9/1000)
})();

const MooMoo = (function MooMooJS_beta(){})[69];

const styles = {
    position: "absolute",
    top: "0",
    paddingLeft: "5px",
    fontSize: "2em",
    color: "#fff"
};

MooMoo.onGameLoad = () => {
    initializeActionBar()
}

function initializeActionBar() {
    'use strict';
    const actionBarItems = document.getElementsByClassName("actionBarItem");
    for (let i = 0; i < actionBarItems.length; i++) {
        actionBarItems[i].style.borderRadius = "10px";
        actionBarItems[i].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    }

    for (let i = 0; i < actionBarItems.length; i++) {
        if (i >= 19 && i <= 38) {
            const divElement = createActionBarItem(i);
            appendActionBarItem(divElement, i);
        }
    }

    function createActionBarItem(index) {
        const divElement = document.createElement("div");
        divElement.setAttribute("id", `actionBarItemnum${index}`);
        applyStyles(divElement, styles);
        divElement.innerHTML = "0";
        return divElement;
    }

    function applyStyles(element, styles) {
        for (const style in styles) {
            element.style[style] = styles[style];
        }
    }

    function appendActionBarItem(divElement, index) {
        const parentElement = document.getElementById(`actionBarItem${index}`);
        parentElement.appendChild(divElement);
    }

    function getElementById(id) {
        return document.getElementById(id);
    }

    MooMoo.addEventListener("14", function (event) {
        const value = event[1];
        const indicesByEventType = {
            1: [19, 20, 21],
            2: [22, 23, 24, 25],
            3: [26, 27, 28],
            4: [29],
            5: [31],
            6: [32],
            7: [33],
            8: [34],
            9: [35],
            10: [36],
            11: [30],
            12: [37],
            13: [38]
        };
        const updateActionBarItem = index => {
            document.getElementById(`actionBarItemnum${index}`).innerHTML = value;
        };
        const indices = indicesByEventType[event[0]];
        indices.forEach(updateActionBarItem);
    });
}

document.getElementById("chatButton").remove()
