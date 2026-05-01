// Generate favicon / apple-icon / OG image / Twitter image from a single
// transparent master logo. Run after replacing the master file:
//
//   node scripts/generate-icons.mjs
//
// Output goes to app/icon.png, app/apple-icon.png, app/opengraph-image.png,
// app/twitter-image.png — Next.js 14 App Router auto-detects these names.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const MASTER = join(root, "public/images/ChatGPT Image 2026年5月1日 19_19_07.png");

// Brand color: 墨色 (sumiiro). Same as ink in styles-design.css.
const BG = { r: 26, g: 22, b: 19, alpha: 1 };

// ----------------------------------------------------------------------------
// Helpers

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function makeSquareIcon(size, marginRatio, outPath) {
  const inner = Math.round(size * (1 - marginRatio * 2));
  const offset = Math.round((size - inner) / 2);

  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  });

  const logo = await sharp(MASTER)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await canvas
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(outPath);

  console.log(`✅ ${outPath} (${size}x${size})`);
}

async function makeOpenGraphImage(outPath) {
  const W = 1200;
  const H = 630;

  // Logo size on the left
  const logoSize = 360;
  const logoX = 110;
  const logoY = Math.round((H - logoSize) / 2);

  // Text on the right
  const titleJa = "株式会社イズミ産業";
  const taglineJa = "横浜の老舗仕出し屋";
  const subJa = "創業 昭和四十九年（1974年）";

  const textX = logoX + logoSize + 60;

  // SVG for text overlay. Yu Mincho-like fallback chain.
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .title {
      font-family: "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Noto Serif JP", serif;
      font-weight: 500;
      letter-spacing: 0.14em;
      fill: #ffffff;
    }
    .tag {
      font-family: "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Noto Serif JP", serif;
      font-weight: 400;
      letter-spacing: 0.18em;
      fill: #b8924c;
    }
    .sub {
      font-family: "Yu Gothic", "YuGothic", "Hiragino Sans", "Noto Sans JP", sans-serif;
      font-weight: 400;
      letter-spacing: 0.22em;
      fill: rgba(255,255,255,0.55);
    }
    .accent {
      stroke: #b8924c;
      stroke-width: 1;
      opacity: 0.9;
    }
  </style>
  <text x="${textX}" y="265" class="title" font-size="56">${escapeXml(titleJa)}</text>
  <line x1="${textX}" y1="295" x2="${textX + 100}" y2="295" class="accent"/>
  <text x="${textX}" y="365" class="tag" font-size="32">${escapeXml(taglineJa)}</text>
  <text x="${textX}" y="425" class="sub" font-size="16">${escapeXml(subJa)}</text>
</svg>
  `.trim();

  const logo = await sharp(MASTER)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: W, height: H, channels: 4, background: BG },
  })
    .composite([
      { input: logo, top: logoY, left: logoX },
      { input: Buffer.from(svg), top: 0, left: 0 },
    ])
    .png()
    .toFile(outPath);

  console.log(`✅ ${outPath} (${W}x${H})`);
}

// ----------------------------------------------------------------------------

await makeSquareIcon(512, 0.12, join(root, "app/icon.png"));
await makeSquareIcon(180, 0.12, join(root, "app/apple-icon.png"));
await makeOpenGraphImage(join(root, "app/opengraph-image.png"));

// Twitter card uses the same image.
const og = readFileSync(join(root, "app/opengraph-image.png"));
writeFileSync(join(root, "app/twitter-image.png"), og);
console.log(`✅ app/twitter-image.png (cloned from opengraph-image.png)`);

console.log("\n完了。git add app/icon.png app/apple-icon.png app/opengraph-image.png app/twitter-image.png でコミットしてください。");
