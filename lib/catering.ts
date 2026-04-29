// Catering LP data — ported from the ChatGPT-generated LP mockup.

export type CourseTier = "casual" | "standard" | "premium";

export type CateringCourse = {
  slug: CourseTier;
  ja: string;
  en: string;
  price: number;
  dishCount: string;
  headline: string;
  description: string;
  useCase: string;
  badgeColor: string; // tailwind / inline color for the tier badge
};

export const COURSES: CateringCourse[] = [
  {
    slug: "casual",
    ja: "カジュアル",
    en: "CASUAL",
    price: 2500,
    dishCount: "6品程度の大皿構成",
    headline: "パーティーらしい彩りを、\n気軽な価格で。",
    description:
      "社内懇親会や日常のお集まりにぴったり。気軽に楽しめるバリエーションで、会話も自然と弾みます。",
    useCase: "社内懇親会・気軽なご会合・同窓会・部活動の打ち上げなど",
    badgeColor: "#4a7c4a", // moss green
  },
  {
    slug: "standard",
    ja: "スタンダード",
    en: "STANDARD",
    price: 3500,
    dishCount: "8品程度の大皿構成",
    headline: "お席を彩る、\n華やかな定番コース。",
    description:
      "歓送迎会・周年・お祝いの席など、主役を引き立てる華やかさと満足感を両立したコースです。",
    useCase: "歓送迎会・周年行事・記念日・各種ご宴会",
    badgeColor: "#b08a3e", // warm gold
  },
  {
    slug: "premium",
    ja: "プレミアム",
    en: "PREMIUM",
    price: 5000,
    dishCount: "10品程度の大皿構成",
    headline: "腕を尽くした、\n特別な一卓を。",
    description:
      "VIP接待・式典・記念日など、大切なお席にふさわしい、上質で贅沢なお料理をご用意します。",
    useCase: "VIP接待・式典・記念日・表彰式・株主総会",
    badgeColor: "#4a3a6b", // deep plum
  },
];

export type UseCase = {
  icon: string; // icon slug from CateringIcons
  ja: string;
};

export const USE_CASES: UseCase[] = [
  { icon: "group", ja: "社内懇親会・\n歓送迎会" },
  { icon: "building", ja: "周年行事・\n創立記念" },
  { icon: "chart", ja: "株主総会・\n役員会" },
  { icon: "family", ja: "ご家族のお祝い\n(七五三・還暦など)" },
  { icon: "clapperboard", ja: "撮影・イベント\n打ち上げ" },
  { icon: "glasses", ja: "立食パーティー・\n各種イベント" },
];

export type Reason = {
  icon: string;
  title: string;
  body: string;
};

export const REASONS: Reason[] = [
  {
    icon: "trophy",
    title: "半世紀の実績と信頼",
    body: "昭和49年創業、大規模なお席も数多く手掛けてきた実績で、安心してお任せいただけます。",
  },
  {
    icon: "chef",
    title: "和洋折衷の幅広い料理",
    body: "和と洋の良いところを一皿に。幅広い年代に喜ばれる彩り豊かな大皿料理をご提供します。",
  },
  {
    icon: "truck",
    title: "配膳・設営・引取まで一貫対応",
    body: "会場へのお届けから配膳、設営、片付け・引取までお任せいただけるので、幹事様も安心です。",
  },
];

export type Customization = {
  icon: string;
  title: string;
  body: string;
};

export const CUSTOMIZATIONS: Customization[] = [
  {
    icon: "swap",
    title: "和食寄り・洋食寄りの調整",
    body: "和のお品を増やす・洋のお品をお増やしなど、ご要望に合わせて調整します。",
  },
  {
    icon: "leaf",
    title: "アレルギー対応",
    body: "食材の除去・置き換えなど、個別にご相談を承ります。",
  },
  {
    icon: "child",
    title: "お子様向けメニュー",
    body: "お子様にも喜ぶ内容でアレンジしたメニューもご用意します。",
  },
  {
    icon: "noentry",
    title: "宗教食・ベジタリアン対応",
    body: "宗教食・菜食対応に配慮したメニューも、ご相談のうえ対応いたします。",
  },
];

export type ProcessStep = {
  n: string;
  icon: string;
  title: string;
  body: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "1",
    icon: "people",
    title: "ご相談・お見積",
    body: "ご希望の日時・人数・ご予算・会場などをお伺いし、最適なプランとお見積をご提案いたします。",
  },
  {
    n: "2",
    icon: "clipboard",
    title: "内容のご確認・ご決定",
    body: "メニューやサービス内容のご確認をいただき、ご要望に応じて調整のうえ、ご決定いただきます。",
  },
  {
    n: "3",
    icon: "truck",
    title: "お届け・設営・配膳",
    body: "当日、時間通りにお届けし、設営・配膳を行います。スタッフが丁寧に対応し、安心してお楽しみいただけます。",
  },
  {
    n: "4",
    icon: "cheers",
    title: "お片付け・引取",
    body: "お席後の片付け・器材の引取まで責任を持って対応いたしますので、幹事様の負担を軽減します。",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "最低注文人数は何名からですか？",
    a: "20名様より承ります。上限はございません。拡張エリアへのお届けは50名様以上からご相談を承っております。",
  },
  {
    q: "どのくらい前までに予約すれば良いですか？",
    a: "ご希望日の1週間前までにご相談ください。仕入れ・お仕立ての段取りに必要なお日にちです。お急ぎの場合もまずはお電話にてご相談ください。",
  },
  {
    q: "支払い方法はどのようになりますか？",
    a: "銀行振込（前払いまたは後日一括）または当日現金のいずれかをお選びいただけます。法人様の場合、お届け後のお振込みも承ります。詳細はご相談時にご案内いたします。",
  },
  {
    q: "会場の設営・備品のご手配もお願いできますか？",
    a: "はい、テーブルクロスや備品の手配、会場レイアウトのご相談も承ります。",
  },
  {
    q: "アレルギーや食事制限への対応は可能ですか？",
    a: "はい、可能な限り対応します。事前にご相談ください。",
  },
  {
    q: "キャンセルポリシーについて教えてください。",
    a: "ご予約後のキャンセルは、時期によりキャンセル料が発生する場合がございます。詳細はご相談時にご案内します。",
  },
];

export type Voice = {
  from: string;
  body: string;
};

export const VOICES: Voice[] = [
  {
    from: "製造業 A社 様",
    body: "周年行事で100名規模のパーティーをお願いしました。見た目の彩りもボリューム、スタッフの対応まですべて素晴らしく、参加者からも大好評でした。",
  },
  {
    from: "IT企業 B社 様",
    body: "株主総会後の懇親会で利用しました。メニューの幅広さから料理の品格まで安心して任せられ、役員からも高い評価をいただきました。",
  },
];

export type TrustBadge = {
  icon: string;
  title: string;
  body: string;
};

export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: "clock",
    title: "24時間以内にご連絡",
    body: "通常、24時間以内に担当者よりご連絡いたします。",
  },
  {
    icon: "shield",
    title: "無理な営業は致しません",
    body: "ご相談内容に合わせて、誠実にご提案いたします。",
  },
  {
    icon: "lock",
    title: "秘密は厳守いたします",
    body: "いただいた情報は厳重に管理し、第三者に開示することはありません。",
  },
];

// Catering delivery tiers — gated by minimum party size instead of yen amount.
// Cooking/transport capacity scales with the distance, so more people = further reach.
export const AREAS = {
  main: {
    label: "主要エリア",
    note: "往復1時間圏",
    places: "横浜市全域・川崎南部・東京23区西部の一部",
    minPeople: 20,
    tail: "スムーズなお届けが可能なエリアです。",
  },
  extended: {
    label: "拡張エリア",
    note: "往復1〜2時間圏",
    places: "相模原・藤沢・鎌倉・町田・多摩地区など",
    minPeople: 50,
    tail: "上記以外のエリアも、まずはご相談ください。",
  },
};
