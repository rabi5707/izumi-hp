# 株式会社イズミ産業 サイト — 引継ぎドキュメント

> **次回 Claude Code セッション、または別の開発者向けの引継ぎ資料**
> 最終更新: 2026年5月1日

このドキュメントを読めば、プロジェクトの現状・設計思想・残作業がわかります。

## 🚦 現在のステータス（2026-05-01 時点）

**Vercel デプロイ完了**、**ブラウザで完結する管理画面（商品 + 読み物 + 画像庫 + お問合せ受信箱 + ダッシュボード）も稼働中**。役員レビュー用に Basic 認証で保護中。

- 本番URL: `https://izumi-hp.vercel.app`
- 管理画面: `/admin`（ダッシュボード）/ `/admin/products`（商品 CRUD）/ `/admin/inquiries`（お問合せ受信箱）/ `/admin/journal`（読み物編集）/ `/admin/images`（画像庫）
- デプロイ先: Vercel (`rabi5707's projects` / Hobby プラン)
- 自動デプロイ: GitHub `main` への push で自動再ビルド
- Basic 認証: 認証情報は Vercel の環境変数 `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` を参照（一般公開時に env vars を空にして無効化）。**認証情報は Vercel ダッシュボードと 1Password 等のシークレット管理に限定し、コードや CLAUDE.md には書かない**
- 管理画面ログイン: `yamaizumi@isg.co.jp` + Firebase Auth パスワード（izumi-menu と共通）。**Firestore / Storage rules は `request.auth.token.admin == true` を要求**（2026-05-01 に強化済）。新規管理者を追加する際は `node scripts/grant-admin-claim.mjs <email>` で claim 付与が必須
- Firebase 接続済（`/inquiry` → Firestore、`/journal` `/shop` → Firestore + ISR、画像 → Storage）
- **Firebase Auth の自己サインアップは無効化済**（2026-05-01）— Sign-in providers に「メール / パスワード」は残してあるが、新規ユーザー登録は管理者操作のみ
- **冷凍折詰 (`/shop`) は「近日公開」モード**（2026-04-29 切替済、サブルートはすべて `/shop` にリダイレクト）。商品マスタは `lib/products.ts` のハードコードから Firestore `products` collection に移行済（2026-05-01）。`/admin/products` で CRUD 可能、`/api/checkout` も Firestore 経由で価格検証
- **お問合せ受信箱 (`/admin/inquiries`)** 新設（2026-05-01）— `/inquiry` 投稿の一覧・詳細・状態管理（未読/既読/対応済/完了）・社内メモ・削除。未読件数は管理画面ヘッダーにバッジ表示。**メール通知は本格始動前に整備予定**（現状はこの管理画面で確認する運用）
- **スマホ対応 Phase 2 完了**（2026-05-01）— bento-delivery / catering / journal の残ページの inline grid を `.r-grid-*` `.r-hero-split-wide` ユーティリティに置換。`.r-grid-5` を新設。SiteHeader は既存 `@media` で対応済
- **ファビコン・OG画像配置済**（2026-05-01）— `app/icon.png` `app/apple-icon.png` `app/opengraph-image.png` `app/twitter-image.png`。墨色 `#1a1613` 背景 + ISG ロゴ。Next.js 14 App Router の規約名で自動認識
- **決済方法・注文締切ルール確定**（2026-04-29）— bento/catering = 銀行振込 or 当日現金、shop = Stripe（商品確定後）。納期: bento = 2日前17時、catering = 1週間前
- **宴会場の名称変更**（2026-04-30）— 「日本料理 広美」→「料亭 横浜銀泉亭」へ全面リネーム

クォータ増加申請は不承認だったため、**既存の `izumi-menu-app-b8546` プロジェクトを相乗り運用** する方針（詳細は「重要な設計判断」と「Firebase 構成」セクション参照）。

次の優先タスク: **Stripe 接続**（shop 公開時）→ **お問合せのメール通知整備**（Power Automate / 案 A 新ドメイン取得 / 案 C 当面は受信箱で運用、本格始動前まで保留可）→ shop 商品画像配置・公開モードへの切替 → 会社案内ページの拡充（沿革・板前紹介、原稿待ち）。

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
- 関連: 団体様向け宴会施設「料亭 横浜銀泉亭」併設（旧名: 日本料理 広美）
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
│   ├── shop/                  ← 冷凍EC（**現在「近日公開」モード**）
│   │   ├── layout.tsx        （SectionIndicator + SiteFooter のみ）
│   │   ├── page.tsx          （カミングスーンページ）
│   │   ├── _archive/          （元LP・元レイアウト退避先。公開準備時に戻す）
│   │   ├── products/[id]/    （/shop へリダイレクト）
│   │   ├── cart/, delivery/, confirm/, success/, area/[slug]/  （同上）
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
│   ├── journal/               ← 読み物（**Firestore 読込 + ISR**）
│   │   ├── page.tsx          （fetchAllPublishedPosts、revalidate 60）
│   │   └── [slug]/page.tsx   （react-markdown 描画 + coverImage）
│   ├── legal/                 ← 法務（共通）
│   │   ├── tokusho/, privacy/, terms/
│   │   │
│   ├── admin/                 ← ★ 管理画面（Firebase Auth + allowlist）
│   │   ├── layout.tsx        （ヘッダー + ログアウト）
│   │   ├── page.tsx          （/admin → /admin/journal にリダイレクト）
│   │   ├── login/page.tsx    （メアド+パスワードログイン）
│   │   ├── LogoutButton.tsx
│   │   ├── journal/          （読み物管理）
│   │   │   ├── page.tsx     （一覧・公開/下書/状態表示）
│   │   │   ├── new/page.tsx
│   │   │   ├── [slug]/edit/page.tsx
│   │   │   ├── PostForm.tsx  （新規・編集の共通フォーム + Markdownプレビュー + カバー画像）
│   │   │   └── DeletePostButton.tsx
│   │   └── images/           （汎用画像庫）
│   │       ├── page.tsx
│   │       ├── ImageUploader.tsx
│   │       └── ImageList.tsx
│   │
│   ├── inquiry/               ← 共通お見積フォーム
│   │   ├── page.tsx
│   │   └── InquiryClient.tsx
│   │
│   └── api/
│       ├── auth/session/route.ts ← ★ Admin SDK セッションクッキー発行/破棄
│       ├── checkout/route.ts  （Stripe Checkout、未稼働）
│       ├── stripe/webhook/route.ts
│       └── inquiry/route.ts   （Firestore 書込・稼働中）
│
├── components/
│   ├── SiteHeader.tsx, SiteFooter.tsx               ← /shop および root 共通
│   ├── CateringHeader.tsx, CateringFooter.tsx       ← /catering 専用
│   ├── BentoDeliveryHeader.tsx, BentoDeliveryFooter.tsx ← /bento-delivery 専用
│   ├── SectionIndicator.tsx   ← 全ページ共通の3サービス切替帯（shop に「近日」バッジ）
│   ├── ProductCard.tsx
│   ├── SmartImage.tsx         ← 画像フォールバック（プレースホルダー対応）
│   ├── HeroSlideshow.tsx, DeliveryMap.tsx, CateringIcons.tsx
│
├── lib/
│   ├── products.ts            ← 商品マスタ（冷凍折詰、shop 公開時に再利用）
│   ├── catering.ts            ← ケータリングLPデータ（**現状ハードコード**、Phase 5a で Firestore 化予定）
│   ├── bento-delivery.ts      ← お届け弁当LPデータ（同上、Phase 5b）
│   ├── portal.ts              ← ポータルLPデータ（同上、Phase 5c）
│   ├── areas.ts               ← 配送エリア（frozen のみ）
│   ├── journal.ts             ← 型と SERVICE_LABELS のみ（**データ本体は Firestore に移行済み**）
│   ├── journal-schema.ts      ← ★ Firestore document 型 + 日付パーサ
│   ├── journal-server.ts      ← ★ Admin SDK 経由の読み取り（公開ページ用）
│   ├── journal-admin.ts       ← ★ Server Actions: createPost / updatePost / deletePost
│   ├── image-admin.ts         ← ★ /admin/images 用の汎用 upload / list / delete
│   ├── admin-auth.ts          ← ★ requireAdmin() / getAdminUser() / allowlist
│   ├── admin-auth-shared.ts   ← ★ Edge-safe な定数（middleware 用）
│   ├── legal.ts               ← 法務ページの会社情報
│   ├── cart-store.ts          ← Zustand カートストア
│   ├── firebase.ts            ← Firebase クライアント（Auth/Firestore/Storage 初期化済）
│   ├── firebase-admin.ts      ← Firebase Admin（getAdminDb / getAdminAuth / getAdminStorage）
│   └── stripe.ts              ← Stripe SDK（未稼働）
│
├── public/images/
│   ├── portal-hero.png        ← ポータルヒーロー ✅
│   ├── portal-storefront.jpg  ← 新社屋全景 ✅（実写、2026-04-29 配置）
│   ├── portal-hiromi.jpg      ← 2Fホワイエ ✅（実写、2026-04-29 配置）
│   ├── hero.png               ← /shop ヒーロー（_archive 復帰時に使用）
│   ├── catering/
│   │   ├── hero.jpg           ← /catering ヒーロー（和の設え版・AI生成）✅
│   │   └── _backup/           ← 旧ヒーロー2世代を保管
│   ├── bento-delivery/
│   │   ├── hero-bento.png, hero-party.png, delivery-van.png ✅
│   ├── occasion/, about/      （配置済み）
│   └── products/, journal/    （未配置・公開ページではプレースホルダー or Firestore の coverImage）
│
│   ※ ケータリング/お届け弁当の商品画像は、`/admin/images` で upload → URL を
│   　`lib/catering.ts` `lib/bento-delivery.ts` に手書きで貼る運用（Phase 5-Lite）。
│   　Phase 5-Full に進めば全部 Firestore + 管理画面で完結する。
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
├── /shop/confirm             → /shop へリダイレクト
├── /shop/success             → /shop へリダイレクト
├── /shop/area/[slug]         → /shop へリダイレクト
│  （※ /shop の全サブルートは next.config.mjs の redirects() で /shop に集約）
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
├── /journal                  読み物一覧（Firestore + ISR、現在9記事）
├── /journal/[slug]           記事個別（react-markdown 描画）
├── /legal/tokusho, privacy, terms
├── /inquiry                  共通お見積フォーム
│
├── /admin                    管理ダッシュボード（カード式・各管理ページへの入口）
├── /admin/login              管理画面ログイン
├── /admin/products           冷凍折詰 商品の一覧・公開切替・並び順
├── /admin/products/new       新規商品登録（画像 upload 含む）
├── /admin/products/[id]/edit 商品編集（画像差替含む）
├── /admin/journal            記事の一覧・公開状態切替
├── /admin/journal/new        新規記事
├── /admin/journal/[slug]/edit 記事編集（カバー画像 upload 含む）
├── /admin/images             汎用画像庫（upload + URLコピー + 削除）
│
└── /api/
    ├── auth/session          ログイン時のセッションクッキー発行/破棄
    ├── checkout              Stripe Checkout セッション作成（未稼働）
    ├── stripe/webhook        Stripe Webhook 受信（未稼働）
    └── inquiry               お見積フォーム受信（Firestore書込・稼働中）
```

ビルド時静的生成 + ISR + 動的（admin/api）の混成。`/journal` は60秒ごと再生成、admin保存時は即時 `revalidatePath()`。

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

## 📦 商品データ（Firestore `products` collection）

**冷凍折詰のみ・全8品（2026-05-01 時点の seed 値）:**

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

**真実の源**: Firestore `products` collection（doc ID = 商品 ID）。`/admin/products` で CRUD 可能、`/api/checkout` の価格検証も Firestore 経由（2026-05-01）。

**関連ファイル:**
- `lib/products.ts` — `CATEGORIES`（3カテゴリのメタデータ・ハードコード）と `Product` 型のみ。商品本体は Firestore に移行済
- `lib/products-schema.ts` — Firestore document の型 `ProductDoc`
- `lib/products-server.ts` — `fetchAllPublishedProducts()` `fetchProductForCheckout()` 等の Admin SDK 経由読込
- `lib/products-admin.ts` — Server Actions: createProduct / updateProduct / deleteProduct
- `scripts/seed-products.mjs` — 上記 8 商品を Firestore に流し込む idempotent スクリプト

**categories は静的**: `CATEGORIES`（shokado / oiwai / osechi）は `lib/products.ts` のハードコードのまま。新カテゴリを増やすときはコード変更が必要。

商品データの `type: "ec"` のみ。`type: "catering"` は廃止済み（catering は `/catering` に独立）。

---

## ✅ 完了済みの主要機能

### 一般機能
- [x] レスポンシブな和風デザイン
- [x] SEO 完備（JSON-LD、metadata、canonical、sitemap.xml）
- [x] 法務ページ3本（特商法・プライバシー・利用規約）

### EC（冷凍折詰）— 現在「近日公開」モード
- [x] 元のLP（編集誌調・7セクション・落款風マーカー）は `app/shop/_archive/` に退避済み
- [x] `/shop` トップは「近日公開」プレースホルダ + 045-333-0163 + 他サービス導線
- [x] サブルートはすべて `/shop` にリダイレクト（next.config.mjs redirects）
- [x] ポータル/SectionIndicator に「近日公開」バッジ + CTAグレー化
- [x] Stripe Checkout / Webhook の雛形は `_archive` 内に維持（公開準備時に復活）
- [x] カート機能（Zustand + localStorage）— shop 復活時に再稼働

### お届け弁当
- [x] 3ページLP（top + menu + inquiry）
- [x] ヒーロースライドショー（5.5秒クロスフェード）
- [x] 3商品ラインナップ（会合弁当 / ロケ弁 / ホームパーティーセット）
- [x] フルケータリングとの比較表

### ケータリング
- [x] 4ページLP（top + menu + guide + inquiry）
- [x] シネマティックヒーロー（和の設え版・実写ベースAI生成、2026-04-29 差替）
- [x] 3コース（カジュアル/スタンダード/プレミアム）
- [x] FAQ + 配達エリア（人数ベース 20名/50名）

### 読み物（Journal）— **2026-04-29 に Firestore + 管理画面化**
- [x] Firestore `journal_posts` collection に9記事移行済み
- [x] 公開ページ `/journal` `/journal/[slug]` は Firestore + ISR（60秒）+ Markdown レンダリング
- [x] 管理画面 `/admin/journal` で新規・編集・公開停止・削除（コード触らず完結）
- [x] カバー画像 upload（Firebase Storage `journal-covers/`）

### 管理画面（/admin）— **2026-04-29 新設、2026-05-01 大幅拡張**
- [x] Firebase Auth (Email/Password) + `ADMIN_EMAILS` allowlist + Custom Claim `admin: true`
- [x] サーバーサイドセッションクッキー（5日、HttpOnly）
- [x] `/admin` ダッシュボード（カード式・各管理対象への入口・未読件数アラート）
- [x] `/admin/products` 冷凍折詰 商品 CRUD（画像 upload・並び順・公開切替・カテゴリ）
- [x] `/admin/inquiries` お問合せ受信箱（一覧・詳細・状態管理・社内メモ・削除・自動既読化）
- [x] `/admin/journal` 読み物 CRUD + Markdownエディタ + プレビュー + カバー画像
- [x] `/admin/images` 汎用画像庫（upload・URLコピー・削除、Firebase Storage `uploads/` 配下）
- [x] middleware で `/admin/*` 未ログイン時 `/admin/login` へ自動誘導
- [x] ヘッダーに未読バッジ・新規管理者は `node scripts/grant-admin-claim.mjs <email>` で claim 付与

### 共通
- [x] お見積フォーム（`/inquiry/InquiryClient.tsx` を各セクションで再利用、Firestore書込済）
- [x] **3セクション横断の番号バッジ + アクセントライン**（`.feat-num` クラス）
- [x] **決済方法の表記統一**（2026-04-29）— bento/catering の各 LP・特商法・inquiry に「銀行振込 or 当日現金」を反映、inquiry フォームに希望決済 chip 追加
- [x] **注文締切ルールの統一**（2026-04-29）— bento = ご希望日の2日前17時、catering = 1週間前。「お急ぎはお電話で」を必ず併記
- [x] **スマホ向けレスポンシブ Phase 1**（2026-04-30）— `app/styles-design.css` に `.r-grid-{2,3,4,6}` `.r-hero-split[-wide]` `.r-cta-bar` ユーティリティを新設、portal/catering/bento-delivery の主要4ページ + 両セクションフッター + 特商法表（spec-table）を mobile 対応
- [x] **スマホ向けレスポンシブ Phase 2**（2026-05-01）— bento-delivery / catering / journal の残ページの inline grid を ユーティリティに置換、`.r-grid-5` を新設。SiteHeader は既存 `@media` で対応済
- [x] **宴会場の名称変更**（2026-04-30）— アクティブコード（portal / SiteFooter / about / CateringFooter / lib/portal.ts）を「日本料理 広美」→「料亭 横浜銀泉亭」に置換
- [x] **セキュリティ強化**（2026-05-01）— Firestore/Storage rules を `request.auth.token.admin == true` 必須に / Firebase 自己サインアップ無効化 / `/api/checkout` 価格をサーバ側で再計算 / `/api/inquiry` フィールド上書き防止 + IP rate limit + 文字数上限 / Stripe webhook の Firestore 失敗時に 500 リトライ / Basic 認証 constant-time 比較 / JSON-LD `</script>` 脱出対策 / `next.config.mjs` images.remotePatterns をプロジェクトバケットに限定
- [x] **ファビコン・OG画像配置**（2026-05-01）— `app/icon.png`（512x512）/ `app/apple-icon.png`（180x180）/ `app/opengraph-image.png` `app/twitter-image.png`（1200x630）。墨色 `#1a1613` 背景 + ISG ロゴ。元素材は `public/images/ChatGPT Image 2026年5月1日 19_19_07.png`（透過 PNG）。再生成は `node scripts/generate-icons.mjs`

---

## 🚧 残作業 / 次のステップ

### 🔴 優先度: 高（公開前に必須）

#### 1. ~~Firebase 接続~~ ✅ 完了（2026-04-28）
詳細は **「Firebase 構成」** セクション参照。

#### 2. Stripe 接続（shop 公開タイミングで）
- Stripe アカウント作成 → API key 取得
- `.env.local` に `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- 雛形は `app/shop/_archive/` 内 + `app/api/checkout/route.ts` `app/api/stripe/webhook/route.ts` に既存
- shop の `_archive` を本体に戻すタイミングと連動
- 価格検証は **Firestore `products` collection** 経由で済（2026-05-01）— `/admin/products` の更新が即座に反映される

#### 3. お問合せのメール通知（本格始動前まで保留可）
**現状の運用**: メール通知は未実装。`/admin/inquiries` の管理画面で確認する運用（未読バッジで気づける）。当面はこれで十分。

**整備が必要になったら**（2026-05-01 ユーザーと相談済の選択肢）:
- **案 A 新ドメイン取得** — `izumi-info.com` 等を取得（年 1,500円程度）→ Resend で認証 → `noreply@izumi-info.com` から送信。45 分で完了、自己完結。
- **案 B isg.co.jp で送信** — `e-jim@isg.co.jp` の Microsoft 365 から送信。**isg.co.jp の DNS 管理者を社内で確認する必要あり**（現状不明）。
- **案 C Power Automate** — Microsoft 365 標準機能で `e-jim@isg.co.jp` 経由のメール送信フローを GUI で構築。30 分。`https://make.powerautomate.com/` でライセンス確認から。
- 通知先は `e-jim@isg.co.jp`（事務メアド）。本格運用時には `lib/legal.ts` の `email` 値も実アドレスに差替。

#### 4. メールアドレス確定
- `lib/legal.ts` の `email: "info@shop.isg.co.jp"` を実在のアドレスに（おそらく `e-jim@isg.co.jp` か別のお問合せ専用）

### 🟡 優先度: 中

#### 5. ケータリング/お届け弁当の商品画像配置（**未着手**）
2つの選び方があります:

- **Phase 5-Lite（半日）** — `lib/catering.ts` `lib/bento-delivery.ts` の各データに `image: string` フィールドを追加して画像URLを書く方式。`/admin/images` で upload → URL を貼る → `git push`。年1〜2回しか変えない静的データに最適。
- **Phase 5-Full（3〜4日）** — catering / bento-delivery / portal を全部 Firestore + 管理画面化。コース説明・価格・FAQまで全部ブラウザ編集できる。商品画像の差し替え頻度が高くなったら検討。

ユーザの方針: 「画像差し込みくらいなら直接ファイルでよい」「BC は差し替えない予定」（2026-04-29 / 2026-05-01）→ **当面は 5-Lite 路線、必要になってから着手**。

#### 6. shop の本格復活
- `app/shop/_archive/original-page.tsx` `original-layout.tsx` を本体に戻す
- `next.config.mjs` の redirects ブロックを削除
- `lib/portal.ts` `components/SectionIndicator.tsx` の `comingSoon: true` を外す
- shop ページ側の商品取得を `lib/products-server.ts` の `fetchAllPublishedProducts()` 経由に切替（現状は `lib/products.ts` の static `PRODUCTS` を参照）
- 商品画像（8品）は `/admin/products` 各商品の編集画面で upload
- Stripe接続・メール送信と並行で進める

#### 7. 会社案内ページの拡充
- 沿革（タイムライン）
- 板前紹介
- 受賞歴・メディア掲載
- ※ 山泉様から原稿・写真をいただく必要あり

### 🟢 優先度: 低（あれば良い）

#### 8. ログイン・会員機能（一般ユーザー向け）
- Firebase Auth で実装可（既に管理画面側で使ってる）
- リピート注文の記録、お気に入り商品など

#### 9. inquiry の rate limit を Upstash Redis 化
- 現状は単一 Lambda インスタンスのメモリ内 rate limit（5req/min）
- Vercel が並列起動した場合に擦り抜ける可能性あり。スパムが実際に来始めてから Upstash Redis / Vercel KV へ置き換え

#### 10. 管理画面の更なる拡張
- 既存: `/admin` `/admin/products` `/admin/inquiries` `/admin/journal` `/admin/images`
- 追加候補: 注文一覧（shop稼働後）/ ケータリング・お届け弁当・ポータルの編集（Phase 5-Full）

#### 11. ~~ローカル → デプロイ~~ ✅ 完了
Vercel に自動デプロイ稼働中。

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
| `journal_posts` | izumi-hp | read public（`published==true` のみ）、write Admin SDK のみ |

### Firebase Storage パスの責任分担

| パス | 所有 | アクセス |
|---|---|---|
| `menu_images/*` | izumi-menu | read public、write auth |
| `journal-covers/*` | izumi-hp | read public、write Admin SDK のみ |
| `uploads/*` | izumi-hp | read public、write Admin SDK のみ（`/admin/images` 由来） |

### Storage

`menu_images/*`（既存・izumi-menu 由来）は read public・write auth で運用継続。izumi-hp 側で Storage を使う際も同じポリシー。

---

## 🔌 環境変数（.env.local）

`.env.local.example` をコピーして作成。**Vercel側にも同じものを Production と Preview に登録すること**（FIREBASE_PRIVATE_KEY だけ改行を実際の改行で貼る）。

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

# 管理画面 (/admin) のログイン許可リスト（カンマ区切り）
ADMIN_EMAILS=yamaizumi@isg.co.jp

# Basic 認証（役員レビュー段階の保護、一般公開時は空にして無効化）
BASIC_AUTH_USER=hiromi
BASIC_AUTH_PASSWORD=isg0163

# Stripe（shop 公開時に設定）
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# サイトURL（本番デプロイ時）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

未設定でも `npm run dev` は動作する（決済・問合せ・管理画面ログインの送信時にエラーが出るのみ）。

**Firebase Auth で管理者を追加するには:** `https://console.firebase.google.com/project/izumi-menu-app-b8546/authentication/users` で **ユーザーを追加** → `ADMIN_EMAILS` にもカンマ区切りで追記（ローカル + Vercel）。

---

## 📷 画像配置ガイド

### 画像の置き場所は2系統

1. **`public/images/`** — リポジトリに含む静的画像（ヒーロー・装飾画像など、公開時に固定の画像）
2. **Firebase Storage** — `/admin/images` から upload した画像（記事カバー、AI生成のスポット画像など、後から差し替えたいもの）

### 静的画像 (public/images/)

| 場所 | 命名 | 配置先 | 状態 |
|---|---|---|---|
| ポータル ヒーロー | `portal-hero.png` | `public/images/` | ✅ |
| ポータル 店舗外観 | `portal-storefront.jpg` | `public/images/` | ✅（2026-04-29 配置・新社屋全景） |
| ポータル 横浜銀泉亭（ホワイエ）| `portal-hiromi.jpg` | `public/images/` | ✅（2026-04-29 配置・2Fホワイエ。ファイル名は旧称由来） |
| 横浜銀泉亭 宴会場 | `ginsentei-banquet.jpg` | `public/images/` | ✅（2026-04-30 配置・実写。`/catering` フッターの広美枠で使用） |
| /shop ヒーロー | `hero.png` | `public/images/` | ✅（_archive 復活時に使用） |
| /shop シーン画像 | `okuizome.png` 等 | `public/images/occasion/` | ✅ |
| /shop 板前画像 | `kitchen.png` | `public/images/about/` | ✅（_archive 復活時に使用） |
| /shop 商品 | `{id}.jpg` | `public/images/products/` | ❌（shop 公開準備時に） |
| /catering ヒーロー | `hero.jpg` | `public/images/catering/` | ✅（2026-04-29 和の設え版に差替、旧2世代は `_backup/`） |
| /bento-delivery ヒーロー | `hero-bento.png`, `hero-party.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 配達車 | `delivery-van.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 商品 | `kaigou.jpg`, `roke.jpg`, `party.jpg` | `public/images/bento-delivery/` | ❌（Phase 5-Lite で対応予定） |
| /bento-delivery フッター 横浜本社 | `portal-storefront.jpg` を流用 | `public/images/` | ✅（2026-04-30 差替、元は存在しない `hiromi-building.jpg` を参照していた） |

未配置の画像は `SmartImage` が **斜線パターンのプレースホルダー** を自動表示。

### Firestore-driven 画像

| 用途 | 保管 | 設定方法 |
|---|---|---|
| 読み物のカバー画像 | Firebase Storage `journal-covers/` + Firestore の `coverImage` フィールド | `/admin/journal/[slug]/edit` のフォームから直接 upload |
| 汎用画像（lib/*.ts に貼る用） | Firebase Storage `uploads/` | `/admin/images` で upload → URL コピー → 該当の TS ファイルに貼る |

AI生成プロンプト集: `docs/image-prompts.md`

---

## 🛠 よくある作業のレシピ

### 商品を追加する
**コード編集は不要。** `/admin/products` の **「＋ 新しい商品を登録」** からブラウザで完結。商品画像も同フォーム内で upload。

新カテゴリを増やしたいとき（shokado / oiwai / osechi 以外）は `lib/products.ts` の `CATEGORIES` と `CategoryId` 型を更新する必要あり（ハードコードのため）。

### お問合せを確認する
`/admin/inquiries` で受信箱を開く。詳細を開けば自動既読化。状態は「未読 → 既読 → 対応済 → 完了」で進める。社内メモ欄に経緯を残せる。

### 記事を追加する
**コード編集は不要。** `/admin/journal` から **「＋ 新しい記事を書く」** で作成。本文は Markdown、カバー画像はフォーム内で upload。保存すると 60秒以内 に `/journal` に反映される（即時の場合もあり）。

### 記事を直す
**コード編集は不要。** `/admin/journal` の一覧で **編集** を押すだけ。下書きに戻したいなら「公開する」のチェックを外して保存。

### 任意の画像を upload して URL を得る
`/admin/images` でファイル選択 → アップロード → **URL をコピー** ボタン。コピーしたURLを `lib/catering.ts` `lib/bento-delivery.ts` 等の任意の場所に貼って `git push`。

### LP のコピーを変更する（Phase 5-Full 完了までは要コード編集）
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
23. **2026-04-29**: ポータルの実写2枚（新社屋全景・2Fホワイエ）を `portal-storefront.jpg` `portal-hiromi.jpg` に配置
24. **2026-04-29**: ケータリングのヒーロー画像を実写ビュッフェ → 和の設えAI合成版に2段階で差替（旧画像は `_backup/` に2世代保管）
25. **2026-04-29**: **冷凍折詰 (`/shop`) を「近日公開」モードに切替**。元LP・元レイアウトは `app/shop/_archive/` に退避、サブルートはすべて `/shop` にリダイレクト、ポータル + SectionIndicator に「近日公開」バッジ。Stripe接続・商品画像配置に時間がかかるため、それ以外を先に公開可能にする狙い
26. **2026-04-29**: **読み物 (`/journal`) を Firestore-backed 化**（Phase 1〜2）。`lib/journal.ts` の900行ハードコードデータを Firestore `journal_posts` collection に移行（9記事）、読み込みは Admin SDK + ISR (60s)、本文は `react-markdown` + `remark-gfm` で描画。`lib/journal.ts` は型 + SERVICE_LABELS のみの25行に縮小
27. **2026-04-29**: **管理画面 `/admin/journal` 新設**（Phase 3）。Firebase Auth (Email/Password) + `ADMIN_EMAILS` allowlist、Admin SDK セッションクッキー（5日）、middleware で `/admin/*` 保護、Server Actions で CRUD + `revalidatePath()` で即時反映、Markdown エディタ + プレビュー
28. **2026-04-29**: **読み物カバー画像upload + `/admin/images` 汎用画像庫を追加**（Phase 4a + 4b）。Firebase Storage `journal-covers/` `uploads/` に保存、download token方式で公開URL発行、storage rules を Admin SDK のみ書込に絞った
29. **2026-04-29**: ケータリング/お届け弁当/ポータルのデータも Firestore 化する Phase 5 構想を策定。年1〜2回の更新頻度なので **Phase 5-Lite（画像 URL を `/admin/images` で発行 → コードに貼る、3行コミットで済む）** で当面の目的（画像配置）を満たす方針。Phase 5-Full（全データ Firestore + 管理画面）は実際に編集頻度が上がってから検討
30. **2026-04-29**: **決済方法を確定** — bento/catering = 銀行振込 or 当日現金（請求書払い・代引は不採用）、shop = Stripe（商品ラインナップ確定後に着手）。各 LP・特商法・inquiry フォームに反映済
31. **2026-04-29**: **注文締切ルールを確定** — お届け弁当 = ご希望日の2日前17時、フルケータリング = 1週間前。「お急ぎはお電話で」を必ず併記。サイト全体の文言を統一
32. **2026-04-30**: **スマホ向けレスポンシブ Phase 1** — `app/styles-design.css` に `.r-grid-{2,3,4,6}` `.r-hero-split[-wide]` `.r-cta-bar` ユーティリティを新設、portal/catering/bento-delivery の主要4ページ + フッターを置換。`globals.css` の旧ブルートフォース overrides（`body [style*="grid-template-columns"] { 1fr !important }`）を撤去し、6項目グリッドが縦6個に潰れる害を解消。`body { overflow-x: clip }` で site-wide 横スクロール防止。`.spec-table` の th/td 縦積み対応も追加
33. **2026-04-30**: **宴会場の名称変更** — 「日本料理 広美」→「料亭 横浜銀泉亭」へ全面リネーム。`portal-hiromi.jpg`（2Fホワイエ・ファイル名は旧称由来のまま残置）と新画像 `ginsentei-banquet.jpg`（実写・宴会場）を `/catering` フッターで使用
34. **2026-05-01**: **セキュリティ全面強化**。Firestore/Storage rules を `request.auth != null` から `request.auth.token.admin == true` 必須に変更（Firebase 自己サインアップした第三者の書込を防止）。Firebase コンソールでメール/パスワード自己サインアップを無効化。`scripts/grant-admin-claim.mjs` で `yamaizumi@isg.co.jp` に admin claim を付与。`/api/checkout` の価格を `lib/products.ts` から Firestore `products` 経由の信頼ルックアップに切替。`/api/inquiry` をフィールドホワイトリスト化 + IP rate limit (5req/min) + content-length 上限 (32KB)。Stripe webhook の Firestore 失敗時に 500 を返してリトライ。Basic 認証を constant-time 比較。JSON-LD で `</script>` 等の脱出をエスケープ。`next.config.mjs` の images.remotePatterns を自プロジェクトのバケットパスに限定。CLAUDE.md から認証情報を削除。
35. **2026-05-01**: **商品管理 UI (`/admin/products`) 新設**。Firestore `products` collection を新設（doc ID = 商品 ID）、journal と同じパターンで CRUD + 画像 upload (Storage `product-images/`)。`scripts/seed-products.mjs` で既存 8 商品を流し込み。`/admin` を `/admin/journal` リダイレクトからカード式ダッシュボードに変更（INQUIRIES / PRODUCTS / JOURNAL / IMAGES の入口、各件数サマリー表示）。`/api/checkout` も Firestore 経由の価格検証に切替済。
36. **2026-05-01**: **お問合せ受信箱 (`/admin/inquiries`) 新設**。`/inquiry` 投稿の一覧・詳細・状態管理（未読/既読/対応済/完了）・社内メモ・削除。詳細を開いた瞬間に未読→既読に自動遷移。管理ダッシュボードに未読件数アラートバンド + ヘッダーに未読バッジ。**メール通知の代替として運用**（メール通知は本格始動前まで保留、Power Automate / 新ドメイン取得 / 案 A〜C を比較済）。
37. **2026-05-01**: **スマホ対応 Phase 2 完了**。bento-delivery/menu, bento-delivery/inquiry, catering/menu, catering/inquiry, journal/[slug] の inline grid を `.r-grid-*` `.r-hero-split-wide` ユーティリティに置換。`.r-grid-5` 新設（5col→3col→2col）。SiteHeader は既存 `@media (max-width: 920px)` `@media (max-width: 480px)` で対応済を確認、変更なし。shop の archived ルート（confirm/area/[slug] 等）は redirect で表示されないため未対応。
38. **2026-05-01**: **ファビコン・OG 画像配置**。`app/icon.png` (512x512), `app/apple-icon.png` (180x180), `app/opengraph-image.png` `app/twitter-image.png` (1200x630)。墨色 `#1a1613` 背景 + 透過 ISG ロゴ + OG は社名「株式会社イズミ産業」+ キャッチ「横浜の老舗仕出し屋」+ 創業年「昭和四十九年（1974年）」を Yu Mincho で組版。元素材: `public/images/ChatGPT Image 2026年5月1日 19_19_07.png`（透過 RGBA）。生成スクリプト: `scripts/generate-icons.mjs`（sharp + 動的 SVG 合成）。Yu Mincho フォントは `~/.config/fontconfig/fonts.conf` で `/mnt/c/Windows/Fonts` を参照させて利用。

---

## 📞 何か困ったら

- **Next.js**: https://nextjs.org/docs
- **Stripe Next.js 統合**: https://github.com/stripe/stripe-node
- **Firebase**: https://firebase.google.com/docs/web/setup
- **デザインの元**: `ec/project/` に Claude Design からの元素材

---

## 🎬 次のセッションへ

このドキュメントを読んでから始めると、コンテキストが早く揃います。

**現状で動いているもの:**
- 公開サイト全体（Vercel・Basic認証保護中・ファビコン/OG 画像配置済）
- `/shop` の商品マスタ（Firestore `products` collection、`/admin/products` で CRUD）— ただし `/shop` 自体は「近日公開」モードで shop ページからの読込切替は未着手
- `/journal` の読み物読込（Firestore + ISR）
- `/inquiry` のお見積フォーム（Firestore 書込・サーバ側バリデーション・rate limit）
- `/admin` ダッシュボード + `/admin/products` `/admin/inquiries` `/admin/journal` `/admin/images`
- セキュリティ: Firestore/Storage rules で admin claim 必須・自己サインアップ不可

**次のセッションで取り組む候補（優先順）:**
1. **Stripe 接続 + shop の `_archive` から復活**（半日〜1日）— shop ページの product 取得を `lib/products-server.ts` 経由に切替、Stripe API key 設定、redirects 削除、`comingSoon: true` 解除
2. **shop の商品画像配置** — `/admin/products` から各商品に画像 upload（写真撮影が完了次第）
3. **お問合せのメール通知**（半日）— Power Automate or 案 A 新ドメイン取得（CLAUDE.md「3. お問合せのメール通知」参照）
4. **会社案内ページの拡充**（1日）— 沿革・板前紹介・受賞歴（原稿・写真は山泉様から）
5. **メールアドレス確定** — `lib/legal.ts` の `email` を実在のアドレスに
6. Phase 5-Lite — ケータリング/お届け弁当の商品画像追加（必要が出たら / 半日）
7. Phase 5-Full — catering / bento-delivery / portal を Firestore + 管理画面化（編集頻度が上がってから / 3〜4日）

**新規管理者を追加する手順:**
1. Firebase コンソールの Authentication で新規ユーザー作成（メール+パスワード）
2. `lib/admin-auth.ts` の参照する `ADMIN_EMAILS` 環境変数（Vercel + ローカル `.env.local`）に追加
3. `node scripts/grant-admin-claim.mjs <email>` で admin claim を付与
4. 当該ユーザーがログアウト → 再ログインで反映

公開時期目安: 約半年後（2026年10月頃）

良いプロジェクトをよろしくお願いします 🙏
