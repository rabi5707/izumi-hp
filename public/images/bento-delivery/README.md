# お届け弁当配達 (`/bento-delivery`) 用画像

## 必要な画像ファイル

| ファイル名 | 用途 | 推奨サイズ |
|---|---|---|
| `hero-bento.jpg` | ヒーロー1枚目（会合弁当・ビジネスシーン）| 1600×1200px (4/3) |
| `hero-party.jpg` | ヒーロー2枚目（ホームパーティープラッター）| 1600×1200px (4/3) |
| `delivery-van.jpg` | Page 1 配達車の写真 | 640×480px (4/3) |
| `kaigou.jpg` | ① 会合弁当のお料理 | 640×480px (4/3) |
| `roke.jpg` | ② ロケ弁当のお料理 | 640×480px (4/3) |
| `party.jpg` | ③ ホームパーティーセット | 640×480px (4/3) |

## ヒーローの切替え動作

`hero-bento.jpg` と `hero-party.jpg` が **5.5秒ごとにクロスフェード** で入れ替わります。ユーザーがドットをクリックして手動切替も可能。動きを嫌う設定（prefers-reduced-motion）の場合は自動切替が停止します。

---

## AI生成プロンプト

### 🏢 hero-bento.jpg（ビジネスシーン）

**英語版:**
```
Editorial food photography, 3/4 angle perspective from above,
multiple identical Japanese two-tier jubako bento boxes 
arranged in neat parallel rows on a clean wood table,
ready for delivery to a business meeting,
approximately 8-12 bento boxes visible with lids partially open showing:
  - teriyaki fish fillet (no head, no whole fish)
  - simmered vegetables (carrot, lotus root, kabocha)
  - tamagoyaki slices
  - rolled sushi pieces
  - rice section with black sesame
  - colorful pickled vegetables
  - grilled shelled shrimp

professional catering preparation scene,
warm natural daylight from left, soft shadows,
clean ivory linen under the table,
small kraft paper bags with twine handles stacked neatly at edge,
clean napkins and disposable chopsticks nearby,

sense of order, preparation, and professional hospitality,
muted palette: warm cream, soft greens, dark wood tones,
subtle sage green accents (#2d5f4e-compatible),

NO whole fish, NO sashimi, NO party decorations,
shallow depth of field, farther rows softly blurred,
business-professional mood (NOT festive),

16:9 landscape, 8K, editorial magazine photography,
generous negative space on left for text overlay
```

### 🎉 hero-party.jpg（ホームパーティープラッター）

**英語版:**
```
Editorial food photography, overhead flat-lay OR slightly angled,
a single large disposable party platter (black plastic or 
sturdy kraft paper tray, clearly intended for casual home use, 
not lacquerware),
filled with vibrant Japanese-Western fusion party assortment:
  - assorted small nigiri sushi pieces
  - sliced roast beef (or chicken) with microgreens
  - fresh colorful salad section
  - potato salad and pasta salad small portions
  - tamagoyaki and rolled sushi slices
  - grilled shelled shrimp
  - colorful fruits (grapes, berries, orange slices) as accent
  - small simmered items

placed on a simple dining table at a home setting,
a casual linen runner or wooden board visible underneath,
hint of home party atmosphere: a few wine glasses softly 
blurred in background, simple flower in a small vase, 
maybe a wooden serving spoon and simple disposable chopsticks,

bright inviting natural daylight from a window,
warm cheerful mood, "home gathering" feeling,
vibrant yet refined color palette:
  cream, warm wood, pops of red, green, and yellow from food,
  light pastel accents,

IMPORTANT: disposable/simple container, NOT formal lacquerware,
NO whole fish, NO raw sashimi dominance, NO sparse minimal styling,

sense of abundance, casual celebration,
suitable for home birthdays, small family gatherings,
shallow depth of field,

16:9 landscape, 8K, editorial lifestyle food photography,
generous negative space for text overlay on the left
```

---

## 切り抜きガイド

- **アスペクト比**: 16:9 (1600×900) または 4:3 (1600×1200)
  - hero-bento と hero-party は **同じ比率** で揃えてください
- **フォーカス位置**: 左側に余白を確保（右に寄せても可）
- **雰囲気の統一**: 両方の画像を **同じ時間帯・光の色** で撮ることで切替時の違和感を減らす

## 命名ルール

- **ファイル名は上記と完全一致** させてください
- 拡張子は `.jpg`
- 大文字小文字注意

## 推奨事項

- **ファイルサイズ**: 各画像 300KB以下に圧縮（[Squoosh](https://squoosh.app/) 推奨）
- **カラーモード**: sRGB

## 現在の表示について

画像が未配置の間は、SmartImage コンポーネントが **プレースホルダー**（斜線パターン）を表示します。どちらか1枚だけでも配置すれば、そちらが表示されます。
