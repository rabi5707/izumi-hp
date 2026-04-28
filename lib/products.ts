// Product & category data for the Izumi Sangyo EC site.
// Ported from ec/project/src/data.jsx to TypeScript.
// In production, these would be loaded from Firestore.

export type CategoryId = "shokado" | "oiwai" | "osechi";

export type Category = {
  id: CategoryId;
  num: string;
  ja: string;
  en: string;
  desc: string;
  count: number;
};

export type ProductType = "ec" | "catering";

export type Product = {
  id: string;
  cat: CategoryId;
  ja: string;
  en: string;
  price: number;
  /**
   * ec: 固定価格（カート購入可）
   * catering: 一人前目安の参考価格。「¥{price}〜／お一人様」で表示し、見積依頼へ誘導
   */
  type: ProductType;
  serves: string;
  tag: string | null;
  freeze: boolean;
  desc: string;
  lead: string;
  area: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "shokado",
    num: "01",
    ja: "松花堂",
    en: "SHOKADO",
    desc: "在りし日を偲び、想い出を語り合う和やかなお席に。冷凍折詰にて全国へお届けします。",
    count: 3,
  },
  {
    id: "oiwai",
    num: "02",
    ja: "お祝い",
    en: "CELEBRATION",
    desc: "節目のお席の晴れの膳。冷凍仕立てだからこそ、遠方のご親族にもお届けできます。",
    count: 2,
  },
  {
    id: "osechi",
    num: "03",
    ja: "おせち・ふせち",
    en: "OSECHI",
    desc: "新年の祝い膳と、喪中のお正月の仕立て。冷凍仕立てにて全国へお届けいたします。",
    count: 3,
  },
];

// 本サイトは「冷凍便での全国配送」に特化しています。
// 神奈川・東京の当日便お弁当やケータリング以外のお仕立ては、
// 本社コーポレートサイト (www.isg.co.jp) または /catering にてご案内しています。
export const PRODUCTS: Product[] = [
  // 松花堂（冷凍折詰）
  { id: "shokado-tsuru", cat: "shokado", type: "ec", ja: "松花堂　鶴", en: "SHOKADO TSURU", price: 4200, serves: "一人前", tag: "人気", freeze: true, desc: "一汁五菜の松花堂仕立て。法要・ご会食のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-kame", cat: "shokado", type: "ec", ja: "松花堂　亀", en: "SHOKADO KAME", price: 3600, serves: "一人前", tag: null, freeze: true, desc: "一汁四菜の松花堂。想い出を語り合うお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-matsu", cat: "shokado", type: "ec", ja: "松花堂御膳　松", en: "SHOKADO MATSU", price: 5800, serves: "一人前", tag: "定番", freeze: true, desc: "晴れの日にも通じる、上品な松花堂仕立て。", lead: "中3日 (冷凍)", area: "全国配送" },

  // お祝い（冷凍折詰）
  { id: "oiwai-nidan", cat: "oiwai", type: "ec", ja: "お祝い膳　二段重", en: "OIWAI NIDAN", price: 8800, serves: "2〜3名様", tag: "定番", freeze: true, desc: "鯛・海老・赤飯を中心に。晴れの日のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "oiwai-frozen", cat: "oiwai", type: "ec", ja: "お祝い折詰　冷凍", en: "OIWAI FROZEN", price: 5800, serves: "一人前", tag: null, freeze: true, desc: "遠方へのお祝いに。解凍するだけで晴れの膳が整います。", lead: "中3日 (冷凍)", area: "全国配送" },

  // おせち・ふせち（冷凍仕立て・年末年始限定）
  { id: "osechi-nidan", cat: "osechi", type: "ec", ja: "おせち　二段重", en: "OSECHI NIDAN", price: 18000, serves: "3〜4名様", tag: "人気", freeze: true, desc: "伝統の祝い肴から季節の逸品まで、二段重に彩り豊かに。新年を寿ぐお席に。", lead: "12月25日まで受付", area: "全国配送" },
  { id: "osechi-sandan", cat: "osechi", type: "ec", ja: "おせち　三段重", en: "OSECHI SANDAN", price: 32000, serves: "4〜5名様", tag: "定番", freeze: true, desc: "祝い肴・口取・焼物・煮物を三段に詰めた、ご家族皆様での新年に相応しい特製おせち。", lead: "12月25日まで受付", area: "全国配送" },
  { id: "fusechi", cat: "osechi", type: "ec", ja: "ふせち（喪中おせち）", en: "FUSECHI", price: 15000, serves: "2〜3名様", tag: null, freeze: true, desc: "喪中のお正月に。華美を避けた、精進・仏事の仕立てにて。赤い食材を用いず、穏やかに新年を迎えるお膳です。", lead: "12月25日まで受付", area: "全国配送" },
];

export const isCatering = (p: Product) => p.type === "catering";
export const isEc = (p: Product) => p.type === "ec";

export const VOICES = [
  {
    stars: "★★★★★",
    quote: "社内会合のオードブルをお願いしました。彩りも味も素晴らしく、参加者から大好評でした。",
    by: { name: "N様", loc: "横浜市・法人", kind: "パーティー・ケータリング" },
  },
  {
    stars: "★★★★★",
    quote: "初節句のお祝いに利用させて頂きました。鯛の姿焼きがお見事で、記念の写真も映えました。",
    by: { name: "M様", loc: "東京都世田谷区", kind: "お祝い" },
  },
  {
    stars: "★★★★★",
    quote: "遠方の親族にも送れる冷凍の松花堂があり、大変助かりました。お味も生と変わらぬ品格です。",
    by: { name: "T家", loc: "北海道函館市", kind: "松花堂・冷凍配送" },
  },
];
