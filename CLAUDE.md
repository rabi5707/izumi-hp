# 株式会社イズミ産業 サイト — 引継ぎドキュメント

> **次回 Claude Code セッション、または別の開発者向けの引継ぎ資料**
> 最終更新: 2026年4月29日

このドキュメントを読めば、プロジェクトの現状・設計思想・残作業がわかります。

## 🚦 現在のステータス（2026-04-29 時点）

**Vercel デプロイ完了**、**ブラウザで完結する管理画面（読み物 + 画像庫）も稼働中**。役員レビュー用に Basic 認証で保護中。

- 本番URL: `https://izumi-hp.vercel.app`
- 管理画面: `/admin/journal`（読み物編集）/ `/admin/images`（画像庫）
- デプロイ先: Vercel (`rabi5707's projects` / Hobby プラン)
- 自動デプロイ: GitHub `main` への push で自動再ビルド
- Basic 認証: ID `hiromi` / PW `isg0163`（一般公開時に env vars を空にして無効化）
- 管理画面ログイン: `yamaizumi@isg.co.jp` + Firebase Auth パスワード（izumi-menu と共通）
- Firebase 接続済（`/inquiry` → Firestore、`/journal` → Firestore + ISR、画像 → Storage）
- **冷凍折詰 (`/shop`) は「近日公開」モード**（2026-04-29 切替済、サブルートはすべて `/shop` にリダイレクト）

クォータ増加申請は不承認だったため、**既存の `izumi-menu-app-b8546` プロジェクトを相乗り運用** する方針（詳細は「重要な設計判断」と「Firebase 構成」セクション参照）。

次の優先タスク: **Stripe 接続** → メールアドレス確定 → ケータリング/お届け弁当の商品画像配置（Phase 5-Lite で十分か、5-Full まで踏むかは要判断）。

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
├── /admin                    → /admin/journal にリダイレクト
├── /admin/login              管理画面ログイン
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

### 管理画面（/admin）— **2026-04-29 新設**
- [x] Firebase Auth (Email/Password) + `ADMIN_EMAILS` allowlist
- [x] サーバーサイドセッションクッキー（5日、HttpOnly）
- [x] `/admin/journal` 読み物 CRUD + Markdownエディタ + プレビュー + カバー画像
- [x] `/admin/images` 汎用画像庫（upload・URLコピー・削除、Firebase Storage `uploads/` 配下）
- [x] middleware で `/admin/*` 未ログイン時 `/admin/login` へ自動誘導

### 共通
- [x] お見積フォーム（`/inquiry/InquiryClient.tsx` を各セクションで再利用、Firestore書込済）
- [x] **3セクション横断の番号バッジ + アクセントライン**（`.feat-num` クラス）

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

#### 3. メールアドレス確定
- `lib/legal.ts` の `email: "info@shop.isg.co.jp"` を実在のアドレスに
- 注文・お見積受信用のメール送信機能（Resend or SendGrid）

### 🟡 優先度: 中

#### 4. ケータリング/お届け弁当の商品画像配置（**2026-04-29 時点 未着手**）
2つの選び方があります:

- **Phase 5-Lite（半日）** — `lib/catering.ts` `lib/bento-delivery.ts` の各データに `image: string` フィールドを追加して画像URLを書く方式。`/admin/images` で upload → URL を貼る → `git push`。年1〜2回しか変えない静的データに最適。
- **Phase 5-Full（3〜4日）** — catering / bento-delivery / portal を全部 Firestore + 管理画面化。コース説明・価格・FAQまで全部ブラウザ編集できる。商品画像の差し替え頻度が高くなったら検討。

ユーザの方針: 「画像差し込みくらいなら直接ファイルでよい」（2026-04-29）→ **当面は 5-Lite 路線**。

#### 5. shop の本格復活
- `app/shop/_archive/original-page.tsx` `original-layout.tsx` を本体に戻す
- `next.config.mjs` の redirects ブロックを削除
- `lib/portal.ts` `components/SectionIndicator.tsx` の `comingSoon: true` を外す
- 商品画像（8品）配置・Stripe接続・メール送信と並行で進める

#### 6. 会社案内ページの拡充
- 沿革（タイムライン）
- 板前紹介
- 受賞歴・メディア掲載

### 🟢 優先度: 低（あれば良い）

#### 7. ログイン・会員機能（一般ユーザー向け）
- Firebase Auth で実装可（既に管理画面側で使ってる）
- リピート注文の記録、お気に入り商品など

#### 8. 管理画面の拡張
- 既存: `/admin/journal`（読み物）/ `/admin/images`（画像庫）
- 追加候補: お見積一覧 / 注文一覧（shop稼働後）/ ケータリング・お届け弁当 / ポータルの編集（Phase 5-Full）

#### 9. ~~ローカル → デプロイ~~ ✅ 完了
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
| ポータル 広美 | `portal-hiromi.jpg` | `public/images/` | ✅（2026-04-29 配置・2Fホワイエ） |
| /shop ヒーロー | `hero.png` | `public/images/` | ✅（_archive 復活時に使用） |
| /shop シーン画像 | `okuizome.png` 等 | `public/images/occasion/` | ✅ |
| /shop 板前画像 | `kitchen.png` | `public/images/about/` | ✅（_archive 復活時に使用） |
| /shop 商品 | `{id}.jpg` | `public/images/products/` | ❌（shop 公開準備時に） |
| /catering ヒーロー | `hero.jpg` | `public/images/catering/` | ✅（2026-04-29 和の設え版に差替、旧2世代は `_backup/`） |
| /catering 広美 | `hiromi-building.jpg` | `public/images/catering/` | ❌ 実写予定 |
| /bento-delivery ヒーロー | `hero-bento.png`, `hero-party.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 配達車 | `delivery-van.png` | `public/images/bento-delivery/` | ✅ |
| /bento-delivery 商品 | `kaigou.jpg`, `roke.jpg`, `party.jpg` | `public/images/bento-delivery/` | ❌（Phase 5-Lite で対応予定） |

未配置の画像は `SmartImage` が **斜線パターンのプレースホルダー** を自動表示。

### Firestore-driven 画像

| 用途 | 保管 | 設定方法 |
|---|---|---|
| 読み物のカバー画像 | Firebase Storage `journal-covers/` + Firestore の `coverImage` フィールド | `/admin/journal/[slug]/edit` のフォームから直接 upload |
| 汎用画像（lib/*.ts に貼る用） | Firebase Storage `uploads/` | `/admin/images` で upload → URL コピー → 該当の TS ファイルに貼る |

AI生成プロンプト集: `docs/image-prompts.md`

---

## 🛠 よくある作業のレシピ

### 商品を追加する（shop 復活後）
1. `lib/products.ts` の `PRODUCTS` 配列に追加
2. カテゴリが新しい場合は `CATEGORIES` と `CategoryId` 型も更新
3. `public/images/products/{新ID}.jpg` に画像配置

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
- 公開サイト全体（Vercel・Basic認証保護中）
- `/journal` の読み物読込（Firestore + ISR）
- `/admin/journal` 読み物の編集（カバー画像upload含む）
- `/admin/images` 汎用画像upload
- `/inquiry` のお見積フォーム（Firestore書込）

**次のセッションで取り組む候補:**
1. Phase 5-Lite — ケータリング/お届け弁当の商品画像追加（画像upload は管理画面、URLをコードに貼る作業を私と一緒に / 半日）
2. Stripe 接続 + shop の `_archive` から復活（shop公開準備、半日〜1日）
3. メールアドレス確定 + 注文・お見積メール送信機能
4. 会社案内ページの拡充（沿革・板前紹介・受賞歴）
5. Phase 5-Full — catering / bento-delivery / portal を Firestore + 管理画面化（編集頻度が上がってから / 3〜4日）

公開時期目安: 約半年後（2026年10月頃）

良いプロジェクトをよろしくお願いします 🙏
