// Bento-delivery LP data — ported from the ChatGPT-generated LP mockup.
// "Delivery only, no collection" bento service distinct from full catering.

export type BentoSlug = "kaigou" | "roke" | "party";

export type BentoItem = {
  slug: BentoSlug;
  number: string; // ①②③
  ja: string;
  en: string;
  price: number;
  unit: "個" | "人";
  tagline: string; // 金額下のサブラベル
  headline: string;
  description: string;
  features: string[];
  badgeColor: string;
  isNew?: boolean;
};

export const BENTO_LINEUP: BentoItem[] = [
  {
    slug: "kaigou",
    number: "①",
    ja: "会合弁当（二段重）",
    en: "KAIGOU BENTO",
    price: 1800,
    unit: "個",
    tagline: "会議・法人向け ｜ 法事・ご法要に",
    headline: "二段重仕立ての幕の内弁当",
    description:
      "品数豊富で見た目も華やか。会議や役員会、法事のお席など、きちんとしたお席に最適です。",
    features: [
      "二段重仕立ての幕の内",
      "旬の食材を活かした品数の多さ",
      "法人ご担当者様からの定番",
    ],
    badgeColor: "#4a3a6b", // deep plum
  },
  {
    slug: "roke",
    number: "②",
    ja: "ロケ弁当（幕の内）",
    en: "ROKE BENTO",
    price: 1200,
    unit: "個",
    tagline: "撮影現場・会合用",
    headline: "冷めても美味しい仕立ての幕の内弁当",
    description:
      "栄養バランスを考え、食べやすく飽きのこない内容でご用意。まとまった数のご注文にも。",
    features: [
      "冷めても美味しい工夫",
      "ボリュームとバランス",
      "シンプルで実用的",
    ],
    badgeColor: "#b08a3e", // warm gold
  },
  {
    slug: "party",
    number: "③",
    ja: "ホームパーティーセット",
    en: "HOME PARTY SET",
    price: 1500,
    unit: "人",
    tagline: "ご家庭での集まりに",
    headline: "和洋折衷のオードブル風セット",
    description:
      "取り分けて楽しめる盛合せ。使い捨て容器でお届けするので、お片付けも簡単です。",
    features: [
      "和洋折衷の取り分けセット",
      "10〜30名の小規模パーティーに",
      "お皿やカトラリー不要でそのまま食卓へ",
    ],
    badgeColor: "#4a7c4a", // moss green
    isNew: true,
  },
];

export type UseCase = { icon: string; ja: string };

export const USE_CASES: UseCase[] = [
  { icon: "handshake", ja: "会議・役員会\nのお昼に" },
  { icon: "temple", ja: "法事・ご法要\nのお席に" },
  { icon: "camera", ja: "ロケ・撮影現場\nのロケ弁に" },
  { icon: "house", ja: "ホームパーティー\nや誕生日会に" },
  { icon: "people", ja: "同窓会・ママ会\nサークルに" },
  { icon: "celebrate", ja: "お祝い席・家族の\n集まりに" },
];

export type Benefit = { icon: string; title: string; body: string };

export const BENEFITS: Benefit[] = [
  {
    icon: "check",
    title: "シンプルで手間いらず",
    body: "配膳・回収の必要がなく、受け取ってそのままご利用いただけます。容器はそのまま破棄OK。",
  },
  {
    icon: "yen",
    title: "気軽な価格帯",
    body: "会議弁当は¥1,200〜、パーティーセットも¥1,500〜/人。高品質を、適正価格で。",
  },
  {
    icon: "ten",
    title: "小口注文OK",
    body: "¥20,000からご注文可能。小規模なお席にも最適です。",
  },
];

export type ProcessStep = { n: string; title: string; body: string };

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "1",
    title: "お問い合わせ・お見積",
    body: "お電話またはフォームで ご要望をお知らせください。",
  },
  {
    n: "2",
    title: "内容のご確認",
    body: "メニュー・数量・お届け日時を ご相談し、お見積りをご提示。",
  },
  {
    n: "3",
    title: "お届け",
    body: "ご指定の場所・時間に お届けいたします。",
  },
];

export type Customization = { icon: string; title: string };

export const CUSTOMIZATIONS: Customization[] = [
  { icon: "shojin", title: "精進料理・法事対応" },
  { icon: "allergy", title: "アレルギー対応" },
  { icon: "kids", title: "お子様向けメニュー" },
  { icon: "custom", title: "ご予定に応じた内容調整" },
  { icon: "special", title: "特別な食材・献立のご相談" },
];

export type TrustBadge = { icon: string; title: string; body: string };

export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: "clock",
    title: "ご希望日の2日前17時までにご注文",
    body: "(お急ぎの場合はお電話にてご相談ください)",
  },
  {
    icon: "van",
    title: "配膳・回収なしで気軽にご利用",
    body: "お運びに専念するシンプルサービス",
  },
  {
    icon: "box",
    title: "使い捨て・簡易容器でそのまま破棄OK",
    body: "回収・引取はいたしません",
  },
];

export const SERVICE_INFO = [
  {
    icon: "pin",
    label: "配達エリア",
    body: "保土ヶ谷本社から往復1時間圏内\n横浜市全域・川崎南部・東京23区西部の一部",
  },
  {
    icon: "ten",
    label: "最低ご注文",
    body: "¥20,000より\n（合計金額）",
  },
  {
    icon: "clock",
    label: "納期",
    body: "ご希望日の2日前17時までにご注文\nお急ぎの場合はお電話にてご相談ください",
  },
  {
    icon: "box",
    label: "容器について",
    body: "使い捨てまたは簡易容器でお届け。\n回収・引取はいたしません。\nそのまま破棄いただけます。",
  },
  {
    icon: "yen",
    label: "お支払い",
    body: "銀行振込（前払い／後日一括）\nまたは当日現金にて承ります。",
  },
];

// Comparison with /catering — shown on menu page.
export const COMPARISON_ROWS = [
  {
    label: "形式",
    catering: "大皿料理・配膳あり",
    delivery: "個別のお弁当または取り分けセット",
  },
  {
    label: "サービス",
    catering: "配膳・設営・引取込み",
    delivery: "お届け専念・回収なし",
  },
  { label: "最低ご注文", catering: "20名以上", delivery: "¥20,000以上" },
  {
    label: "価格帯",
    catering: "¥2,500〜5,000/人",
    delivery: "¥1,200〜/個・¥1,500〜/人",
  },
  {
    label: "向くシーン",
    catering: "懇親会・周年・宴会など",
    delivery: "会議・法事・ロケ・ホームパーティーなど",
  },
  {
    label: "客層",
    catering: "主に法人の大規模宴会",
    delivery: "法人から個人のご家庭まで",
  },
];
