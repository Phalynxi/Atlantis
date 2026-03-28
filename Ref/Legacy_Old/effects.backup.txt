
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

let sunShadowDirX = 1;
let sunShadowDirY = 1;
let sunShadowStrength = 1;

const effectsMenuItems = [
  { type: "Header", title: "EFFECTS" },
  {
    type: "checkbox",
    id: "ObjBlur",
    title: "Trap Blur",
    description: "Blur effect on traps",
    icon: "blur_on",
    onChange: [
      ["ObjBlur", false],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjBlurAmount",
    title: "Trap Blur Strength",
    description: "Blur radius in pixels",
    icon: "blur_linear",
    onChange: [
      ["ObjBlurAmount", 2, [0, 12], 0.5],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjBlurLOD",
    title: "Trap Blur LOD",
    description: "Max distance for trap blur",
    icon: "track_changes",
    onChange: [
      ["ObjBlurLOD", 1400, [200, 6000], 100],
      [true, false],
    ],
  },
  {
    type: "checkbox",
    id: "ObjShadows",
    title: "Object Shadows",
    description: "Shadow under gameobjects except resources",
    icon: "filter_hdr",
    onChange: [
      ["ObjShadows", false],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjShadowBlur",
    title: "Shadow Blur",
    description: "Shadow softness",
    icon: "tonality",
    onChange: [
      ["ObjShadowBlur", 12, [0, 40], 1],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjShadowOpacity",
    title: "Shadow Opacity",
    description: "Shadow strength",
    icon: "opacity",
    onChange: [
      ["ObjShadowOpacity", 0.35, [0, 1], 0.05],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjShadowOffset",
    title: "Shadow Offset",
    description: "Shadow distance",
    icon: "swap_vert",
    onChange: [
      ["ObjShadowOffset", 8, [0, 25], 1],
      [true, false],
    ],
  },
  {
    type: "slider",
    id: "ObjShadowLOD",
    title: "Shadow LOD",
    description: "Max distance for shadows",
    icon: "track_changes",
    onChange: [
      ["ObjShadowLOD", 1800, [200, 6000], 100],
      [true, false],
    ],
  },
];

let trapBlurSprites = new Map();
let shadowSprites = new Map();
function getTrapBlurSprite(obj, blurAmount) {
  const base = getItemSprite(obj);
  const blurKey = Math.max(0, Math.round(blurAmount * 100));
  const key = obj.id + "_" + blurKey;
  const cached = trapBlurSprites.get(key);
  if (cached) return cached;
  const pad = Math.ceil((blurKey / 100) * 4);
  const canvas = document.createElement("canvas");
  canvas.width = base.width + pad * 2;
  canvas.height = base.height + pad * 2;
  const ctx = canvas.getContext("2d");
  ctx.filter = `blur(${blurKey / 100}px)`;
  ctx.drawImage(base, pad, pad);
  ctx.filter = "none";
  trapBlurSprites.set(key, canvas);
  return canvas;
}
function getShadowSprite(radius, blur) {
  const radiusKey = Math.max(2, Math.round(radius / 2) * 2);
  const blurKey = Math.max(0, Math.round(blur / 2) * 2);
  const key = radiusKey + "_" + blurKey;
  const cached = shadowSprites.get(key);
  if (cached) return cached;
  const pad = Math.ceil(blurKey * 2);
  const canvas = document.createElement("canvas");
  const width = radiusKey * 2.2 + pad * 2;
  const height = radiusKey * 1.2 + pad * 2;
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const ctx = canvas.getContext("2d");
  ctx.filter = blurKey ? `blur(${blurKey}px)` : "none";
  ctx.fillStyle = "#000";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1.1, 0.55);
  ctx.beginPath();
  ctx.arc(0, 0, radiusKey, 0, Math.PI * 2);
  ctx.fill();
  ctx.filter = "none";
  shadowSprites.set(key, canvas);
  return canvas;
}

function updateSunShadow(phase, sunHeight) {
  const shadowLength = 0.6 + sunHeight * 1.4;
  const shadowAngle = phase + Math.PI;
  sunShadowDirX = Math.cos(shadowAngle) * shadowLength;
  sunShadowDirY = Math.sin(shadowAngle) * shadowLength;
  sunShadowStrength = 0.2 + sunHeight * 0.8;
}

function renderGameObjectEffects(tmpObj, tmpX, tmpY, player, mainContext) {
  const effectDist = player
    ? Math.hypot(tmpObj.x - player.x, tmpObj.y - player.y)
    : 0;
  const blurAmount = Math.max(0, AB.Menu.ObjBlurAmount || 0);
  const blurLod = Math.max(0, AB.Menu.ObjBlurLOD || 0);
  const blurOn =
    AB.Menu.ObjBlur &&
    tmpObj.trap &&
    blurAmount > 0 &&
    (!blurLod || effectDist <= blurLod);
  const shadowOpacity = Math.min(
    1,
    Math.max(0, AB.Menu.ObjShadowOpacity ?? 0),
  );
  const shadowBlur = Math.max(0, AB.Menu.ObjShadowBlur || 0);
  const shadowOffset = Math.max(0, AB.Menu.ObjShadowOffset || 0);
  const shadowLod = Math.max(0, AB.Menu.ObjShadowLOD || 0);
  const shadowFade = shadowLod ? Math.max(0, 1 - effectDist / shadowLod) : 1;
  const shadowStrength = shadowOpacity * shadowFade * sunShadowStrength;
  const shadowBlurAdj = shadowBlur * shadowFade;
  const shadowOffsetX = shadowOffset * sunShadowDirX;
  const shadowOffsetY = shadowOffset * sunShadowDirY;
  const shadowOn = AB.Menu.ObjShadows && shadowStrength > 0.01;
  return {
    blurOn,
    blurAmount,
    shadowOn,
    shadowStrength,
    shadowBlurAdj,
    shadowOffsetX,
    shadowOffsetY,
  };
}
