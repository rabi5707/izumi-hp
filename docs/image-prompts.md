# 画像生成プロンプト集 — 株式会社イズミ産業 オンライン御注文

AI画像生成（Midjourney / DALL-E / Stable Diffusion / Gemini 等）用の
プロンプト集です。後日実写に差し替える前の仮画像として使用します。

## 配置ルール

| 画像カテゴリ | 配置先 | ファイル形式 | 推奨サイズ |
|---|---|---|---|
| 商品画像 | `public/images/products/{id}.jpg` | JPG | 800×600 px（4:3） |
| ヒーロー画像 | `public/images/hero.jpg` | JPG | 1600×1200 px（4:3） |
| 記事画像 | `public/images/journal/{slug}.jpg` | JPG | 1280×720 px（16:9） |
| 会社案内 | `public/images/about/*.jpg` | JPG | 800×1000 px（4:5） |

**ファイル名は必ず商品 ID / 記事 slug と一致させる**こと。`SmartImage`
コンポーネントが自動で参照します。

## 共通スタイル指針

毎回プロンプトに含める要素：

```
Japanese traditional cuisine photography,
overhead shot, natural soft daylight,
minimalist composition with generous negative space,
black lacquer tray or white pine board background,
linen cloth, subtle wabi-sabi aesthetic,
color palette: warm kinari (#f5f1ea), deep ink (#1a1613),
earthen red-brown accent, matte textures,
high detail, editorial food photography style,
8k resolution
```

避ける要素：

```
--no over-saturation, bright colors, cartoon style,
western silverware, plastic items, glossy plastic sheen
```

---

## 商品画像プロンプト（20品）

### 松花堂（Shokado）— 6品

#### shokado-tsuru — 松花堂　鶴
```
Traditional Japanese shokado bento box with crane motif,
one-soup-five-side preparation, overhead shot,
black lacquer box divided into 4 compartments,
grilled fish, simmered vegetables, sashimi, rice, soup,
on dark wooden table, natural daylight from left,
[common-style]
```

#### shokado-kame — 松花堂　亀
```
Traditional Japanese shokado bento box for memorial service,
one-soup-four-side preparation, understated elegance,
black lacquer box, compartmentalized,
simmered vegetables, grilled fish, tofu, rice,
somber but refined presentation,
[common-style]
```

#### shokado-matsu — 松花堂御膳　松
```
Premium Japanese shokado gozen set with pine motif,
celebration-grade presentation,
black and gold lacquer tray, multiple small dishes,
sashimi, tempura, grilled fish, chawanmushi, rice, pickles,
sense of luxury and tradition,
[common-style]
```

#### shokado-fresh — 松花堂　生仕立
```
Fresh Japanese shokado bento, same-day delivery style,
vibrant seasonal ingredients visible,
black lacquer box with clear partitions,
emphasis on freshness and color,
[common-style]
```

#### makunouchi — ロケ弁当　幕の内
```
Japanese makunouchi bento in disposable black plastic box,
filming location / business meeting style,
grilled salmon, tamagoyaki, simmered vegetables,
rice with umeboshi, practical and appetizing,
overhead shot, casual daylight,
[common-style]
```

#### kaigo-bento — 会合弁当　二段重
```
Two-tier Japanese business meeting bento box,
black lacquer two-layer jubako,
upper tier with grilled dishes, lower tier with rice and pickles,
formal yet approachable presentation,
[common-style]
```

### セット料理（Set Menu）— 5品

#### set-b12 — セット料理　B-12
```
Japanese multi-dish platter set for 2-3 people,
12 varieties artfully arranged,
sashimi, tempura, grilled fish, simmered dishes,
colorful seasonal ingredients on black platter,
[common-style]
```

#### set-nidan — セット料理　二段重
```
Two-tier Japanese jubako box set for small gathering,
black lacquer double-layer box,
assorted traditional dishes in both tiers,
elegant ribbon-tied presentation,
[common-style]
```

#### set-frozen — セット料理　冷凍仕立
```
Japanese frozen bento set, thawed and plated,
restored freshness, natural arrangement,
various small dishes on white ceramic plates,
hint of ice in the background to suggest frozen origin,
[common-style]
```

#### sushi-platter — 寿司盛合せ　特上
```
Premium Japanese sushi platter, high-end presentation,
nigiri sushi of various fish (tuna, salmon, shrimp, sea urchin),
maki rolls, on large black lacquer platter,
garnished with shiso leaves and pickled ginger,
glossy rice, fresh fish sheen,
[common-style]
```

#### sand-basket — サンドとサラダの籠盛
```
Japanese-style sandwich and salad basket arrangement,
assorted small sandwiches (egg, ham, cucumber),
fresh salads in small cups,
woven bamboo basket, picnic-style,
light and casual yet refined,
[common-style]
```

### お祝い（Celebration）— 4品

#### oiwai-nidan — お祝い膳　二段重
```
Celebration two-tier Japanese jubako,
whole sea bream (tai), lobster or shrimp, red rice (sekihan),
festive presentation with pine decoration,
red and gold accents, auspicious,
[common-style]
```

#### okuizome — お食い初め膳
```
Japanese okuizome first meal ceremony tray,
whole grilled sea bream, red rice, clear soup,
simmered vegetables, small stone on tiny dish (hagatame-ishi),
tiny red lacquer bowls, baby-sized arrangement,
ceremonial and traditional,
[common-style]
```

#### oiwai-frozen — お祝い折詰　冷凍
```
Celebration Japanese bento, frozen preparation,
vacuum-sealed style visible,
compact celebration meal with tai, red rice,
practical yet festive, designed for long-distance shipping,
[common-style]
```

#### uchiiwai — 内祝折詰
```
Japanese thank-you gift bento with noshi paper cover,
refined refined presentation,
noshi paper and red-white mizuhiki cord visible,
compact elegant box, thoughtful gift atmosphere,
[common-style]
```

### パーティー・ケータリング（Catering）— 5品

#### party-platter-l — オードブル盛合せ　大
```
Large Japanese party platter for 8-10 people,
abundant variety: sushi, grilled meats, tempura, salads,
colorful and plentiful arrangement,
large round black platter, celebratory mood,
party setting with soft background blur,
[common-style]
```

#### party-platter-m — オードブル盛合せ　中
```
Medium Japanese party platter for 5-6 people,
balanced selection of sushi, grilled dishes, salads,
oval black platter, refined casual,
[common-style]
```

#### party-wa — 和のオードブル　華
```
Traditional Japanese hors d'oeuvres platter, elegant,
sashimi, simmered dishes, tempura, pickles,
seasonal flower garnish (cherry blossom in spring / maple in autumn),
deeply refined washoku aesthetic,
[common-style]
```

#### party-yo — 洋のオードブル　彩
```
Western-style hors d'oeuvres with Japanese sensibility,
roast beef, terrine, cheese, salmon,
colorful salads, bread,
on black slate platter, refined fusion style,
[common-style]
```

#### sekku-hina — 桃の節句　雛ちらし
```
Japanese hinamatsuri chirashi sushi for Girls' Day,
colorful scattered sushi with pink, yellow, green,
shrimp, salmon roe, egg, pea pods, lotus root,
served in round pink lacquer bowl,
spring peach blossom atmosphere,
[common-style]
```

---

## ヒーロー画像プロンプト

`public/images/hero.jpg`（1600×1200）

```
Hero image for Japanese traditional catering website,
overhead shot of elegant oiwai-zen (celebration tray),
two-tier black lacquer jubako box open at center,
red rice, tai fish, colorful seasonal dishes,
placed on deep indigo cloth with subtle pattern,
soft morning light from the side,
ample negative space around for text overlay,
cinematic and magazine-quality,
color palette: warm ivory background, deep ink shadows,
accent of faded crimson,
[common-style]
```

---

## 記事画像プロンプト（6記事）

#### okuizome — お食い初めの儀式と、お膳の整え方
```
Japanese okuizome ceremony scene, intimate family gathering,
baby in traditional yukata held by grandparents,
small celebration tray visible in foreground,
warm indoor natural light, soft focus on background,
16:9 aspect ratio, documentary-editorial style,
[common-style]
```

#### sekku-tango — 端午の節句　兜御膳の由来
```
Japanese Boys' Day festival scene,
kabuto helmet display with miniature samurai armor,
celebration meal in foreground, colorful springtime ingredients,
koinobori carp streamers in soft-focus background,
May afternoon sunlight,
[common-style]
```

#### houyou-manners — ご法要のお席、お弁当の手配とマナー
```
Formal Japanese memorial service setting,
rows of identical elegant black lacquer bento boxes on long table,
subdued tatami room, paper shoji doors, somber but dignified,
overhead three-quarter view, muted color palette,
[common-style]
```

#### catering-yokohama — 横浜での企業ケータリング
```
Modern Yokohama office meeting room with catered spread,
Japanese bento boxes and party platters arranged on conference table,
city skyline blurred through window,
contemporary corporate-refined aesthetic,
natural afternoon light,
[common-style]
```

#### reito-kaito — 冷凍折詰の美味しい解凍方法
```
Hands carefully unwrapping a frozen bento box,
transferring from insulated cooler to refrigerator,
clean modern kitchen, minimalist,
close-up detail shot, step-by-step feel,
[common-style]
```

#### uchiiwai — 内祝の折詰　表書きと品選び
```
Elegant Japanese gift wrapping scene,
noshi paper with mizuhiki cord being tied around a bento box,
hands visible, calligraphy brush and ink stone nearby,
refined atmosphere of gift-giving tradition,
warm indoor light,
[common-style]
```

---

## 会社案内画像プロンプト

`public/images/about/honsha.jpg`（横浜本社外観）

```
Traditional Japanese restaurant building exterior,
Yokohama Hodogaya location,
wooden facade with subtle signage, noren curtain at entrance,
stone lantern by the door, small garden with pine tree,
evening scene with warm interior light spilling out,
architectural photography style,
[common-style but outdoor setting]
```

---

## 運用メモ

### 生成後のチェックポイント

1. **解像度**: 商品画像は最低 800×600、ヒーローは 1600×1200 以上
2. **ファイル形式**: JPG（WebP 変換は next/image が自動でやってくれる）
3. **ファイルサイズ**: 圧縮して 200KB 以下が理想
4. **ファイル名**: ID・slug と完全一致（大文字小文字も）
5. **著作権**: AI生成画像は商用利用可能なツールを使用（Midjourney有料版、DALL-E、Gemini Imagen等）

### 実写への差し替え

撮影後、AI で修正して画像を置き換える予定：
- 同じファイル名で上書きすれば、コード変更不要
- `SmartImage` コンポーネントが自動的に新しい画像を表示
- 過渡期：一部商品だけ実写でも、未差替の商品はプレースホルダーで表示され続ける

### 将来的な最適化

本番運用時には以下を検討：
- Firebase Storage にアップロード → CDN 経由で配信
- `next/image` の `remotePatterns` に firebasestorage.googleapis.com を追加済
- 画像の blur placeholder 生成（plaiceholder パッケージ等）
