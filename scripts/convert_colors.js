// Small script to convert sRGB (0-255) to OKLab -> OKLCH and print CSS variables
// Usage: node scripts/convert_colors.js

function srgbToLinear(c) {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r, g, b) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);

  // linear sRGB -> LMS
  const L = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
  const M = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
  const S = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;

  const l_ = Math.cbrt(L);
  const m_ = Math.cbrt(M);
  const s_ = Math.cbrt(S);

  const L_ok = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a_ok = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ok = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  return { L: L_ok, a: a_ok, b: b_ok };
}

function oklabToOklch({ L, a, b }) {
  const C = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return { L, C, h };
}

function toCssOklch(r, g, b, alpha = 1) {
  const lab = rgbToOklab(r, g, b);
  const lch = oklabToOklch(lab);
  // CSS oklch expects L in percent (0% - 100%)
  const Lp = (lch.L * 100).toFixed(4).replace(/\.0000$/, '') + '%';
  const C = Number(lch.C.toFixed(4));
  const H = Number(lch.h.toFixed(2));

  if (alpha >= 0 && alpha < 1) {
    return `oklch(${Lp} ${C} ${H}deg / ${alpha})`;
  }
  return `oklch(${Lp} ${C} ${H}deg)`;
}

const colors = {
  '--color-pk-red': [238, 21, 21],
  '--color-pk-yellow': [255, 222, 0],
  '--color-pk-blue': [59, 76, 202],
  '--pk-red': [238, 21, 21],
};

for (const [name, rgb] of Object.entries(colors)) {
  console.log(`${name}: ${toCssOklch(...rgb)};`);
}
