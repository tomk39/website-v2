import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type);
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBytes.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 8 + data.length);
  return out;
}

function roundedRectAlpha(x, y, w, h, r, px, py) {
  const cx = Math.max(x + r, Math.min(px, x + w - r));
  const cy = Math.max(y + r, Math.min(py, y + h - r));
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function paintRect(img, size, x, y, w, h, color) {
  for (let yy = Math.floor(y); yy < Math.ceil(y + h); yy += 1) {
    for (let xx = Math.floor(x); xx < Math.ceil(x + w); xx += 1) {
      if (xx < 0 || yy < 0 || xx >= size || yy >= size) continue;
      const i = (yy * size + xx) * 4;
      img[i] = color[0];
      img[i + 1] = color[1];
      img[i + 2] = color[2];
      img[i + 3] = color[3];
    }
  }
}

function pointInPoly(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function paintPoly(img, size, poly, color) {
  const minX = Math.floor(Math.min(...poly.map((p) => p[0])));
  const maxX = Math.ceil(Math.max(...poly.map((p) => p[0])));
  const minY = Math.floor(Math.min(...poly.map((p) => p[1])));
  const maxY = Math.ceil(Math.max(...poly.map((p) => p[1])));
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (x < 0 || y < 0 || x >= size || y >= size || !pointInPoly(x + 0.5, y + 0.5, poly)) continue;
      const i = (y * size + x) * 4;
      img[i] = color[0];
      img[i + 1] = color[1];
      img[i + 2] = color[2];
      img[i + 3] = color[3];
    }
  }
}

function createIcon(size) {
  const img = Buffer.alloc(size * size * 4);
  const outer = size * 0.05;
  const outerSize = size * 0.9;
  const radius = size * 0.21;
  const inner = size * 0.085;
  const innerSize = size * 0.83;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const t = (x + y) / (size * 2);
      if (roundedRectAlpha(outer, outer, outerSize, outerSize, radius, x, y)) {
        img[i] = mix(37, 96, t);
        img[i + 1] = mix(99, 165, t);
        img[i + 2] = mix(235, 250, t);
        img[i + 3] = 255;
      }
      if (roundedRectAlpha(inner, inner, innerSize, innerSize, radius * 0.9, x, y)) {
        img[i] = mix(23, 15, t);
        img[i + 1] = mix(37, 23, t);
        img[i + 2] = mix(84, 42, t);
        img[i + 3] = 245;
      }
    }
  }

  const s = size / 96;
  const white = [255, 255, 255, 255];
  const cyan = [96, 165, 250, 220];
  paintRect(img, size, 20 * s, 26 * s, 33 * s, 9 * s, white);
  paintRect(img, size, 32 * s, 35 * s, 9 * s, 35 * s, white);
  paintRect(img, size, 56 * s, 26 * s, 9 * s, 44 * s, white);
  paintPoly(img, size, [[65 * s, 45 * s], [81 * s, 26 * s], [92 * s, 26 * s], [73 * s, 47 * s]], white);
  paintPoly(img, size, [[65 * s, 51 * s], [73 * s, 47 * s], [93 * s, 70 * s], [81 * s, 70 * s]], white);
  paintPoly(img, size, [[68 * s, 45 * s], [84 * s, 26 * s], [92 * s, 26 * s], [74 * s, 47 * s]], cyan);
  paintPoly(img, size, [[68 * s, 51 * s], [74 * s, 47 * s], [93 * s, 70 * s], [84 * s, 70 * s]], cyan);
  return img;
}

function png(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  const img = createIcon(size);
  for (let y = 0; y < size; y += 1) {
    raw[y * (size * 4 + 1)] = 0;
    img.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function ico(images) {
  const count = images.length;
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const base = 6 + index * 16;
    header[base] = size >= 256 ? 0 : size;
    header[base + 1] = size >= 256 ? 0 : size;
    header[base + 2] = 0;
    header[base + 3] = 0;
    header.writeUInt16LE(1, base + 4);
    header.writeUInt16LE(32, base + 6);
    header.writeUInt32LE(data.length, base + 8);
    header.writeUInt32LE(offset, base + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const png16 = png(16);
const png32 = png(32);
const png48 = png(48);
const png180 = png(180);
const png512 = png(512);

writeFileSync("apple-touch-icon.png", png180);
writeFileSync("android-chrome-512x512.png", png512);
writeFileSync("favicon-16x16.png", png16);
writeFileSync("favicon-32x32.png", png32);
writeFileSync("favicon.ico", ico([
  { size: 16, data: png16 },
  { size: 32, data: png32 },
  { size: 48, data: png48 }
]));
