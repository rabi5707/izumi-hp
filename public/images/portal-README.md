# ポータル（トップページ `/`）用画像

`/app/page.tsx`（ポータルLP）で使用する画像です。

## 必要なファイル

| ファイル名 | 用途 | 推奨サイズ |
|---|---|---|
| `portal-hero.jpg` | ヒーロー右側の料理画像（豪華な折詰・暗めの背景）| 1200×1200 (1/1) または 1200×1500 (4/5) |
| `portal-storefront.jpg` | ブランドストーリー右側（店舗外観・暖簾）| 800×600 (4/3) |
| `portal-service-shop.jpg` | 冷凍折詰カードの画像 | 800×450 (16/9) |
| `portal-service-bento-delivery.jpg` | お届け弁当カードの画像 | 800×450 (16/9) |
| `portal-service-catering.jpg` | フルケータリングカードの画像 | 800×450 (16/9) |
| `portal-hiromi.jpg` | 会社概要セクション右側（日本料理広美の内装）| 800×1000 (4/5) |

## 配置先

```
public/images/
├── portal-hero.jpg
├── portal-storefront.jpg
├── portal-service-shop.jpg
├── portal-service-bento-delivery.jpg
├── portal-service-catering.jpg
└── portal-hiromi.jpg
```

## 未配置の状態

画像がない場合は自動でプレースホルダー表示。SmartImage コンポーネントがフォールバックします。

## 生成プロンプトの参考

ポータル全体は **品格 + 老舗感** で統一。黒背景＋金アクセントの雰囲気を意識：

### portal-hero.jpg（ヒーロー）
```
Editorial luxury Japanese food photography,
3/4 angle close-up, a beautifully arranged wooden warigo bento box
filled with colorful celebration food (shrimp, vegetables, simmered items,
rolled sushi, NO whole fish),
rich deep black lacquered background,
golden warm lighting from left, cinematic shadows,
sprig of cherry blossoms softly blurred in background corner,
NO people visible,
warm deep color palette: black, gold, cream, muted red accents,
16:9 portrait or 4:5 aspect, 8K ultra detailed
```

### portal-storefront.jpg
```
Traditional Japanese restaurant entrance,
wooden door with noren curtain featuring kamon (family crest),
stone lantern, hanging paper lantern with kanji,
small garden with maple branches,
warm evening light spilling from inside,
editorial architectural photography,
4:3 landscape, 8K
```

### portal-service-shop.jpg
A luxurious overhead shot of a single beautiful frozen bento box
(松花堂 style) with colorful contents, on indigo cloth.

### portal-service-bento-delivery.jpg  
A neat row of ready-to-deliver bento boxes in kraft paper bags,
business meeting context.

### portal-service-catering.jpg
A lavish party spread with silver platters and Japanese-Western fusion food.

### portal-hiromi.jpg
Interior of an elegant Japanese banquet room (日本料理 広美 の広間イメージ),
tatami floor, warm lighting, traditional decoration,
4:5 portrait aspect ratio.
