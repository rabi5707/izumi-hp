# 株式会社イズミ産業 サイト — 引継ぎドキュメント

> **次回 Claude Code セッション、または別の開発者向けの引継ぎ資料**
> 最終更新: 2026年4月28日

このドキュメントを読めば、プロジェクトの現状・設計思想・残作業がわかります。

## 🚦 現在のステータス（2026-04-28 時点）

**Vercel デプロイ完了**。役員レビュー用に Basic 認証で保護中。

- 本番URL: `https://izumi-hp.vercel.app`
- デプロイ先: Vercel (`rabi5707's projects` / Hobby プラン)
- 自動デプロイ: GitHub `main` への push で自動再ビルド
- Basic 認証: ID `hiromi` / PW `isg0163`（一般公開時に env vars を空にして無効化）
- Firebase 接続済（`/inquiry` → Firestore 書込動作確認済）

クォータ増加申請は不承認だったため、**既存の `izumi-menu-app-b8546` プロジェクトを相乗り運用** する方針に変更（詳細は「重要な設計判断」と「Firebase 構成」セクション参照）。

次の優先タスク: **Stripe 接続** → メールアドレス確定 → 商品画像配置。

---

## 🎯 プロジェクト概要

横浜の老舗仕出し屋「株式会社イズミ産業」のオフィシャルサイト。

**3つのサービスを展開:**

| サービス | 内容 | 規模 |
|---|---|---|
| 冷凍折詰・全国配送 (`/shop`) | 松花堂・お祝い膳・おせちを冷凍仕立てで全国へ | 8商品 |
| お届け弁当 (`/bento-delivery`) | 横浜近郊への当日便弁当配達（配膳・回収なし）| 最低ご注文 ¥20,000〜 |
| フルケータリング (`/catering`) | 大皿料理・配膳込み（20名様〜・¥2,500〜/人）| 3コース |

**ブランド:**
- 創業: 昭和四十九年(1974年)
- 所在地: 神奈川県横浜市保土ヶ谷区仏向町 946
- 電話: 045-333-0163（横浜本店）
- 関連: 団体様向け宴会施設「日本料理 広美」併設
- 本社: https://www.isg.co.jp/

**運営責任者:** 山泉 貴郎

---

## 🏗 技術スタック

- **フレームワーク**: Next.js 14.2 (App Router) + TypeScript
- **スタイル**: Tailwind CSS + 独自CSS（`app/styles-design.css`、Claude Designからインポート）
- **状態管理**: Zustand（カート用、localStorage 永続化）
- **決済**: Stripe（API key 未設定、雛形のみ）
- **データベース**: Firebase Firestore（**接続済・稼働中**。`izumi-menu-app-b8546` プロジェクトを `c:\kentoAPP\izumi-menu` と相乗り運用。詳細は「Firebase 構成」セクション参照）
- **画像**: Next.js Image（`SmartImage` コンポーネントでフォールバック対応）

```bash
# 開発
npm run dev             # http://localhost:3000

# ビルド
npm run build
npm run start

# 型チェック
npm run typecheck
```

---

## 📁 ディレクトリ構成

```
C:\APP\HP\
├── app/
│   ├── layout.tsx             ← root レイアウト（最小・header/footerなし）
│   ├── page.tsx               ← ★ ポータル（/）
│   ├── globals.css
│   ├── styles-design.css      ← デザイントークン
│   │
│   ├── shop/                  ← 冷凍EC
│   │   ├── layout.tsx        （SiteHeader + SiteFooter）
│   │   ├── page.tsx          （全商品リスト + ヒーロー）
│   │   ├── products/[id]/    （商品詳細）
│   │   ├── cart/
│   │   ├── delivery/
│   │   ├── confirm/
│   │   ├── success/
│   │   └── area/[slug]/      （配送について）
│   │
│   ├── bento-delivery/        ← お届け弁当
│   │   ├── layout.tsx        （BentoDeliveryHeader/Footer）
│   │   ├── page.tsx
│   │   ├── menu/
│   │   └── inquiry/
│   │
│   ├── catering/              ← フルケータリング
│   │   ├── layout.tsx        （CateringHeader/Footer）
│   │   ├── page.tsx          （シネマティックヒーロー）
│   │   ├── menu/
│   │   ├── guide/
│   │   └── inquiry/
│   │
│   ├── about/                 ← 会社案内（共通）
│   ├── journal/               ← 読み物（共通）
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── legal/                 ← 法務（共通）
│   │   ├── tokusho/          （特定商取引法）
│   │   ├── privacy/
│   │   └── terms/
│   ├── inquiry/               ← 共通お見積フォーム
│   │   ├── page.tsx
│   │   └── InquiryClient.tsx ← 各セクションの inquiry ページから import
│   │
│   └── api/
│       ├── checkout/route.ts  （Stripe Checkout）
│       ├── stripe/webhook/route.ts
│       └── inquiry/route.ts   （Firestore 書込）
│
├── components/
│   ├── SiteHeader.tsx         ← /shop および root 共通
│   ├── SiteFooter.tsx
│   ├── CateringHeader.tsx     ← /catering 専用
│   ├── CateringFooter.tsx
│   ├── BentoDeliveryHeader.tsx ← /bento-delivery 専用
│   ├── BentoDeliveryFooter.tsx
│   ├── SectionIndicator.tsx   ← 全ページ共通の3サービス切替帯
│   ├── ProductCard.tsx
│   ├── SmartImage.tsx         ← 画像フォールバック（プレースホルダー対応）
│   ├── HeroSlideshow.tsx      ← /bento-delivery で使用（クロスフェード）
│   ├── DeliveryMap.tsx        ← SVG同心円マップ（/catering で使用）
│   └── CateringIcons.tsx      ← セクション別の SVG アイコン集
│
├── lib/
│   ├── products.ts            ← 商品マスタ（8品の冷凍折詰）
│   ├── catering.ts            ← ケータリングLPデータ
│   ├── bento-delivery.ts      ← お届け弁当LPデータ
│   ├── portal.ts              ← ポータルLPデータ
│   ├── areas.ts               ← 配送エリア（frozenのみ）
│   ├── journal.ts             ← 記事データ（6記事、本文付き）
│   ├── legal.ts               ← 法務ページの会社情報
│   ├── cart-store.ts          ← Zustand カートストア
│   ├── firebase.ts            ← Firebase クライアント（未設定）
│   ├── firebase-admin.ts      ← Firebase Admin（未設定）
│   └── stripe.ts              ← Stripe SDK（未設定）
│
├── public/images/
│   ├── portal-hero.png        ← ポータルヒーロー ✅
│   ├── hero.png               ← /shop ヒーロー（9区画松花堂）✅
│   ├── catering/
│   │   └── hero.jpg           ← /catering ヒーロー（銀皿パーティー）✅
│   ├── bento-delivery/
│   │   ├── hero-bento.png     ← お届け弁当 ヒーロー1 ✅
│   │   ├── hero-party.png     ← お届け弁当 ヒーロー2 ✅
│   │   └── delivery-van.png   ← 配達車 ✅
│   ├── products/              ← 各商品の写真（未配置・プレースホルダー）
│   ├── journal/               ← 記事画像（未配置）
│   └── about/                 ← 会社案内画像（未配置）
│
├── docs/
│   └── image-prompts.md       ← AI画像生成プロンプト集
│
├── ec/                        ← 元のClaude Designハンドオフ（参考用、削除可）
│
└── CLAUDE.md                  ← この文書
```

---

## 🌐 URL ルーティング

```
/                            ポータル（3サービス紹介）
│
├── /shop                     冷凍EC ホーム
├── /shop/products/[id]       商品詳細（8商品分の static page）
├── /shop/cart                カート
├── /shop/delivery            配送先入力
├── /shop/confirm             注文確認
├── /shop/success             注文完了
├── /shop/area/frozen         配送について
│
├── /bento-delivery           お届け弁当 LP
├── /bento-delivery/menu      お弁当の種類
├── /bento-delivery/inquiry   お見積フォーム
│
├── /catering                 フルケータリング LP
├── /catering/menu            お料理の例（3コース）
├── /catering/guide           ご利用ガイド
├── /catering/inquiry         お見積フォーム
│
├── /about                    会社案内（global）
├── /journal                  読み物一覧（6記事）
├── /journal/[slug]           記事個別
├── /legal/tokusho            特定商取引法に基づく表記
├── /legal/privacy            プライバシーポリシー
├── /legal/terms              ご利用規約
├── /inquiry                  共通お見積フォーム
│
└── /api/
    ├── checkout              Stripe Checkout セッション作成
    ├── stripe/webhook        Stripe Webhook 受信
    └── inquiry               お見積フォーム受信（Firestore書込）
```

ビルド時静的生成: 約 40ページ（うち動的: API routes 3つ）

---

## 🎨 デザイン哲学（重要）

### 3セクションの差別化（"D案" 適用済み）

CSS変数システムで `data-section` 属性によりカラーパレットを切替:

| セクション | アクセントカラー | トーン |
|---|---|---|
| **/shop** | 朱茶（既定）| 静謐・伝統編集誌 |
| **/bento-delivery** | 深緑 #2d5f4e | 実務的・法人ツール |
| **/catering** | 深紅 #8a2e2e + 金 #b8924c | 華やか・ホテル雑誌 |

レイアウトも差別化:
- shop: 左テキスト + 右画像（縦長寄り）
- bento-delivery: ヒーロー直下に **Stat Bar**（黒帯・等幅フォント・数字訴求）
- catering: **シネマティックフルブリード**（画像全幅 + 黒グラデ + 白抜きテキスト）

### ポータル（/）の役割

3サービスへの "玄関"。各サービスを対等に扱う。
- フルブリードヒーロー（深緑〜墨色）+ 金アクセント
- 3サービスカード（各カードに既存ヒーロー画像を流用）
- ブランドストーリー / 選ばれる理由 / お客様の声 / 会社概要

### SectionIndicator（全ページ共通の上部帯）

```
[ホーム] [冷凍折詰 通販] [お届け弁当] [フルケータリング]
```

現在のセクションが自動ハイライト。`/components/SectionIndicator.tsx`。

---

## 📦 商品データ（lib/products.ts）

**冷凍折詰のみ・全8品:**

| ID | カテゴリ | 商品名 | 価格 |
|---|---|---|---|
| shokado-tsuru | shokado | 松花堂 鶴 | ¥4,200 |
| shokado-kame | shokado | 松花堂 亀 | ¥3,600 |
| shokado-matsu | shokado | 松花堂御膳 松 | ¥5,800 |
| oiwai-nidan | oiwai | お祝い膳 二段重 | ¥8,800 |
| oiwai-frozen | oiwai | お祝い折詰 冷凍 | ¥5,800 |
| osechi-nidan | osechi | おせち 二段重 | ¥18,000 |
| osechi-sandan | osechi | おせち 三段重 | ¥32,000 |
| fusechi | osechi | ふせち（喪中おせち）| ¥15,000 |

`type: "ec"` のみ。`type: "catering"` は廃止済み（catering は `/catering` に独立）。

---

## ✅ 完了済みの主要機能

### 一般機能
- [x] 41ページの静的サイト（SSG）
- [x] レスポンシブな和風デザイン
- [x] SEO 完備（JSON-LD、metadata、canonical）
- [x] 法務ページ3本（特商法・プライバシー・利用規約）

### EC（冷凍折詰）
- [x] 商品カタログ表示（カテゴリ別グループ化）
- [x] カート機能（Zustand + localStorage）
- [x] 配送先入力フォーム
- [x] 注文確認フロー
- [x] Stripe Checkout API雛形（API key未設定）
- [x] Stripe Webhook 雛形
- [x] **編集誌調LP（2026-04-25 リニューアル）** — 7セクション構成・落款風マーカー・FAQ 4問（複数配送先対応含む）

### お届け弁当
- [x] 3ページLP（top + menu + inquiry）
- [x] ヒーロースライドショー（5.5秒クロスフェード）
- [x] 3商品ラインナップ（会合弁当 / ロケ弁 / ホームパーティーセット）
- [x] フルケータリングとの比較表

### ケータリング
- [x] 4ページLP（top + menu + guide + inquiry）
- [x] シネマティックヒーロー
- [x] 3コース（カジュアル/スタンダード/プレミアム）
- [x] FAQ + 配達エリア（人数ベース 20名/50名）

### 共通
- [x] お見積フォーム（`/inquiry/InquiryClient.tsx` を各セクションで再利用）
- [x] InquiryAPI route（Firestore接続未だが console.log フォールバックあり）
- [x] 6記事の Journal（本文付き、カード全体クリック可能）
- [x] **3セクション横断の番号バッジ + アクセントライン**（`.feat-num` クラス、各セクションの「3つの○○」型カードに適用）

---

## 🚧 残作業 / 次のステップ

### 🔴 優先度: 高（公開前に必須）

#### 1. ~~Firebase 接続~~ ✅ 完了（2026-04-28）
- クォータ増加申請は **不承認** だったため、既存の `izumi-menu-app-b8546` プロジェクトを相乗り運用
- `.env.local` 設定済（Admin SDK のサービスアカウントJSON投入済）
- Firestore rules / Storage rules 設定済（`c:\kentoAPP\izumi-hp\firestore.rules` で一元管理）
- `/inquiry` 送信 → Firestore `inquiries` collection 書込まで動作確認済
- 詳細は **「Firebase 構成」** セクション参照

#### 2. Stripe 接続
- Stripe アカウント作成 → API key 取得
- `.env.local` に `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- ローカルで `stripe listen` でWebhookテスト
- カード決済 → Webhook → Firestore 注文ステータス更新の流れ確認

#### 3. メールアドレス確定
- `lib/legal.ts` の `email: "info@shop.isg.co.jp"` を実在のアドレスに
- 注文・お見積受信用のメール送信機能（Resend or SendGrid）

### 🟡 優先度: 中

#### 4. 商品画像の配置
- `public/images/products/{id}.jpg` に配置すれば自動表示
- `docs/image-prompts.md` にAI生成プロンプト集
- 8商品 + 記事画像 + 会社案内画像

#### 5. ポータルの残り画像（2枚）
- `portal-storefront.jpg`（ブランドストーリー右側・店舗外観）
- `portal-hiromi.jpg`（会社概要右側・広美の内装）

#### 6. 会社案内ページの拡充
- 沿革（タイムライン）
- 板前紹介
- 受賞歴・メディア掲載

### 🟢 優先度: 低（あれば良い）

#### 7. ログイン・会員機能
- Firebase Auth で実装可
- リピート注文の記録、お気に入り商品など

#### 8. 管理画面
- 注文一覧・ステータス変更
- お見積一覧・対応ログ

#### 9. ローカル → デプロイ
- Vercel 推奨（Next.js 純正、無料枠豊富）
- Firebase Hosting も選択肢

---

## 🧠 重要な設計判断（過去の議論から）

### 1. Firebase プロジェクトを `izumi-menu` と相乗り運用（2026-04-28 確定）
- クォータ増加申請が **不承認** → 新規プロジェクト作成不可
- 隣の `c:\kentoAPP\izumi-menu`（既存・QR専用の裏ツール）が既に持っている `izumi-menu-app-b8546` プロジェクトを共用
- collection 名は衝突なし（hp = `orders`, `inquiries` / menu = `menus`, `banquet_menus`, `plans`, `events`）
- 詳細は **「Firebase 構成」** セクション

### 2. ポータル階層を `/` に作った
「3サービスを対等に扱う」ため、shop を `/shop` に降格。

### 3. お届け弁当はケータリングと分離
- フルケータリング: 配膳・大皿・20名〜・**¥2,500〜/人**
- お届け弁当: 配膳なし・個別箱・**最低ご注文 ¥20,000〜**（金額ベース、2026-04-25 に個数/人数ベースから変更）
- 同じ「ケータリング」だが UX が全然違うので別セクションに

### 4. 商品ラインナップを冷凍特化
本社サイト（www.isg.co.jp）で当日便仕出しを扱っているので、本サイトは「冷凍便で全国配送」に特化して棲み分け。

### 5. お弁当に「お寿司・尾頭付き魚」は入れない
冷凍適性が悪いため。AI画像生成プロンプトでも明示的に除外。

### 6. ケータリングの最低注文は人数ベース
当初は金額（¥30,000 / ¥50,000）だったが、人数（20名 / 50名）の方が直感的なので変更。

---

## 🔥 Firebase 構成（重要）

### プロジェクト共有

`izumi-menu-app-b8546` を **2サイトで共用**：

| サイト | フォルダ | 役割 | URL |
|---|---|---|---|
| **izumi-hp** | `c:\kentoAPP\izumi-hp` | 公式サイト（SEO・広告のメイン） | （未確定） |
| **izumi-menu** | `c:\kentoAPP\izumi-menu` | QR専用の裏ツール（noindex想定） | `https://izumi-menu-app-b8546.web.app/` |

両サイトはドメインで完全分離（SEO 干渉なし）。

### Firebase 設定の "真実の源" は izumi-hp

rules 二重管理を防ぐため、Firebase 設定ファイルは **すべて izumi-hp に集約**：

- `c:\kentoAPP\izumi-hp\firestore.rules` ← rules はここで管理
- `c:\kentoAPP\izumi-hp\storage.rules`
- `c:\kentoAPP\izumi-hp\firestore.indexes.json`
- `c:\kentoAPP\izumi-hp\firebase.json`
- `c:\kentoAPP\izumi-hp\.firebaserc`

izumi-menu フォルダにある旧 rules は `*.deprecated` にリネーム済（編集禁止）。詳細は `c:\kentoAPP\izumi-menu\RULES_MOVED.md`。

### デプロイコマンド

| 対象 | 実行フォルダ | コマンド |
|---|---|---|
| Firestore rules | `c:\kentoAPP\izumi-hp` | `firebase deploy --only firestore:rules` |
| Storage rules | `c:\kentoAPP\izumi-hp` | `firebase deploy --only storage` |
| Firestore indexes | `c:\kentoAPP\izumi-hp` | `firebase deploy --only firestore:indexes` |
| izumi-menu のサイト本体 | `c:\kentoAPP\izumi-menu` | `firebase deploy --only hosting` |
| izumi-hp のサイト本体 | （未定・Vercel想定） | — |

### Firestore collection の責任分担

| collection | 所有 | アクセス |
|---|---|---|
| `menus` / `banquet_menus` / `plans` / `events` | izumi-menu | read public（QR閲覧）、write auth（admin編集） |
| `orders` / `inquiries` | izumi-hp | クライアント全拒否、Admin SDK 経由のみ |

### Storage

`menu_images/*`（既存・izumi-menu 由来）は read public・write auth で運用継続。izumi-hp 側で Storage を使う際も同じポリシー。

---

## 🔌 環境変数（.env.local）

`.env.local.example` をコピーして作成:

```bash
# Firebase（クライアント）
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin（サーバー）
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# サイトURL（本番デプロイ時）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

未設定でも `npm run dev` は動作する（決済・問合せの送信時にエラーが出るのみ）。

---

## 📷 画像配置ガイド

| 場所 | 命名 | 配置先 | 状態 |
|---|---|---|---|
| ポータル ヒーロー | `portal-hero.png` | `public/images/` | ✅ |
| ポータル 店舗外観 | `portal-storefront.jpg` | `public/images/` | ❌ 実写予定 |
| ポータル 広美 | `portal-hiromi.jpg` | `public/images/` | ❌ 実写予定 |
| /shop ヒーロー | `hero.png` | `public/images/` | ✅（2026-04-25 にAI生成画像で差替済み。旧画像は `hero-old.png` にバックアップ） |
| /shop シーン画像 | `okuizome.png`, `houji.png`, `kisei.png`, `zoutou.png` | `public/images/occasion/` | ✅ 4枚配置済み |
| /shop 板前画像 | `kitchen.png` | `public/images/about/` | ✅ |
| /shop 商品 | `{id}.jpg` | `public/images/products/` | ❌ |
| /catering ヒーロー | `hero.jpg` | `public/images/catering/` | ✅ |
| /catering 広美 | `hiromi-building.jpg` | `public/images/catering/` | ❌ 実写予定 |
| /bento-delivery ヒーロー | `hero-bento.png`, `hero-party.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 配達車 | `delivery-van.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 商品 | `kaigou.jpg`, `roke.jpg`, `party.jpg` | `public/images/bento-delivery/` | ❌ |
| Journal 記事 | `{slug}.jpg` | `public/images/journal/` | ❌（コード側にも未wire-up） |

未配置の画像は `SmartImage` が **斜線パターンのプレースホルダー** を自動表示。

AI生成プロンプト集: `docs/image-prompts.md`

---

## 🛠 よくある作業のレシピ

### 商品を追加する
1. `lib/products.ts` の `PRODUCTS` 配列に追加
2. カテゴリが新しい場合は `CATEGORIES` と `CategoryId` 型も更新
3. `public/images/products/{新ID}.jpg` に画像配置

### 記事を追加する
1. `lib/journal.ts` の `JOURNAL_POSTS` に追加（slug, body 必須）
2. `public/images/journal/{slug}.jpg` に画像

### LP のコピーを変更する
- ポータル → `app/page.tsx` + `lib/portal.ts`
- ケータリング → `app/catering/*/page.tsx` + `lib/catering.ts`
- お届け弁当 → `app/bento-delivery/*/page.tsx` + `lib/bento-delivery.ts`

### セクションのカラーを変更する
`app/globals.css` の `main[data-section="..."]` ブロック内で CSS 変数を編集。

### ナビゲーションを変更する
- 冷凍EC ヘッダー → `components/SiteHeader.tsx`
- ケータリング → `components/CateringHeader.tsx`
- お届け弁当 → `components/BentoDeliveryHeader.tsx`

---

## 💬 過去のセッションでの主要な決定事項

時系列で重要な決定（一部抜粋）:

1. **2026-04-21**: Next.js + Firebase + Stripe で構築開始
2. **2026-04-22**: Firebase プロジェクト数上限に到達 → 接続は後回しに
3. **2026-04-22**: 当初の20商品から冷凍6品に絞り込み（本社サイトとの棲み分け）
4. **2026-04-23**: ヒーロー画像をAI生成（藍色布 + 二段重）→ 後に9区画松花堂に差し替え
5. **2026-04-23**: ケータリングは別ページに分離（`/catering`）
6. **2026-04-24**: 最低注文を人数ベースに変更（20名 / 50名）
7. **2026-04-24**: お届け弁当（`/bento-delivery`）を新セクションとして追加
8. **2026-04-24**: D案（3セクション差別化）適用 + SectionIndicator 追加
9. **2026-04-25**: ポータル（`/`）を新設、shop を `/shop` に降格
10. **2026-04-25**: shop ナビを最小化、お品書きページを home に統合
11. **2026-04-25**: `/shop` LP を編集誌調に全面リニューアル（7セクション・落款風マーカー）
12. **2026-04-25**: ヒーロー画像を kinari ベージュ調のお重写真に差替（旧 = 藍色9区画は `hero-old.png` 保存）
13. **2026-04-25**: SiteHeader を他2セクションと同じパターン（朱茶のサブコンテキストストリップ）に統一
14. **2026-04-25**: 「お届けのみ」「お届けするだけ」等のぶっきらぼうなコピーを「お運びに専念」「お席まで」等に書換
15. **2026-04-25**: 3セクション横断で「3つの○○」型カードに番号バッジ + 上アクセントラインを追加（`.feat-num` クラス）
16. **2026-04-25**: お届け弁当の最低ご注文を **個数/人数ベース → 金額ベース ¥20,000〜** に変更
17. **2026-04-25**: ケータリング casual プランを ¥2,000 → ¥2,500 に値上げ
18. **2026-04-25**: 配送料表記を「1か所¥10,000以上で無料」に明確化（複数配送先対応の含み）
19. **2026-04-25**: Firebase クォータ増加申請を Google Cloud に提出 → **承認待ち**
20. **2026-04-28**: クォータ増加申請が**不承認** → 既存 `izumi-menu-app-b8546`（隣の `c:\kentoAPP\izumi-menu` プロジェクトのもの）を相乗り運用する方針に変更
21. **2026-04-28**: Firebase 設定ファイル（rules / firebase.json / .firebaserc）を **izumi-hp 側に一元管理**。izumi-menu 側の旧rulesは `.deprecated` にリネームし `RULES_MOVED.md` で誘導
22. **2026-04-28**: `.env.local` 設定完了 → `/inquiry` から Firestore `inquiries` collection への書込を動作確認

---

## 📞 何か困ったら

- **Next.js**: https://nextjs.org/docs
- **Stripe Next.js 統合**: https://github.com/stripe/stripe-node
- **Firebase**: https://firebase.google.com/docs/web/setup
- **デザインの元**: `ec/project/` に Claude Design からの元素材

---

## 🎬 次のセッションへ

このドキュメントを読んでから始めると、コンテキストが早く揃います。

最優先タスク（公開のために必要）:
1. Firebase 接続
2. Stripe 接続
3. メールアドレス確定
4. 商品画像の配置（最低限の数枚）

公開時期目安: 約半年後（2026年10月頃）

良いプロジェクトをよろしくお願いします 🙏
