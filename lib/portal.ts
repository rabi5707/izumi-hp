// Portal (home `/`) page data — the brand's top-level entry.

export type PortalService = {
  slug: "shop" | "bento-delivery" | "catering";
  num: string;
  en: string;
  ja: string;
  targetJa: string;
  tagline: string;
  features: string[];
  priceLabel: string;
  priceValue: string;
  minLabel: string;
  minValue: string;
  href: string;
  accentColor: string;
  ctaBg: string;
  /** Reuse each section's existing hero image for the portal card. */
  image: string;
  imageObjectPosition?: string;
};

export const SERVICES: PortalService[] = [
  {
    slug: "shop",
    num: "01",
    en: "FROZEN BENTO",
    ja: "冷凍折詰・全国配送",
    targetJa: "全国のお客様へ",
    tagline:
      "松花堂・お祝い膳・おせち・ふせちなどの冷凍仕立て折詰",
    features: [
      "松花堂・お祝い膳・おせち・ふせちなどの冷凍仕立て折詰",
      "関連会社イズミ食品にて急速冷凍、ヤマト運輸クール便で全国配送",
      "一人前の折詰から承ります",
      "遠方のご親族への贈答、ご法要、お祝いのお席",
    ],
    priceLabel: "価格帯",
    priceValue: "¥3,600〜",
    minLabel: "最低数",
    minValue: "1個から",
    href: "/shop",
    accentColor: "#2c4a6b",
    ctaBg: "#2c4a6b",
    image: "/images/hero.png",
    imageObjectPosition: "center",
  },
  {
    slug: "bento-delivery",
    num: "02",
    en: "BENTO DELIVERY",
    ja: "お弁当・パーティーセットのお届け",
    targetJa: "横浜近郊の法人・個人",
    tagline: "会合弁当・ロケ弁・ホームパーティーセット",
    features: [
      "配膳・設営・回収不要、お届けに専念するシンプルなご提供",
      "使い捨て容器でそのまま破棄OK",
      "法人の会議弁当から家庭のパーティーまで",
    ],
    priceLabel: "価格帯",
    priceValue: "¥1,200〜/個\n¥1,500〜/人",
    minLabel: "最低ご注文",
    minValue: "¥20,000から",
    href: "/bento-delivery",
    accentColor: "#2d5f4e",
    ctaBg: "#2d5f4e",
    image: "/images/bento-delivery/hero-bento.png",
    imageObjectPosition: "center",
  },
  {
    slug: "catering",
    num: "03",
    en: "FULL CATERING",
    ja: "フルケータリング",
    targetJa: "横浜近郊の大人数イベントに",
    tagline: "和洋折衷の大皿料理、配膳込みの本格ケータリング",
    features: [
      "配膳・設営・引取まで一貫対応",
      "和洋折衷の大皿料理、3つのコースをご用意",
      "懇親会・周年行事・ご宴会など、特別なお席に",
    ],
    priceLabel: "価格帯",
    priceValue: "¥2,500〜/人",
    minLabel: "最低数",
    minValue: "主要エリア20名様〜\n拡張エリア50名様〜",
    href: "/catering",
    accentColor: "#8a2e2e",
    ctaBg: "#8a2e2e",
    image: "/images/catering/hero.jpg",
    imageObjectPosition: "center",
  },
];

export const REASONS = [
  {
    icon: "trophy",
    title: "半世紀の実績と信頼",
    body: "昭和四十九年創業。冠婚葬祭をはじめ、企業・団体・個人のお席を半世紀にわたり支えて参りました。",
  },
  {
    icon: "chef",
    title: "熟練板前の技と献立力",
    body: "四季の食材を活かし、用途やご予算に応じた献立をご提案。見た目も美しい料理でお席を彩ります。",
  },
  {
    icon: "swap",
    title: "用途に応じた柔軟な対応",
    body: "少人数のお席から大人数の宴席まで、ご要望に合わせた最適なかたちをご提案いたします。",
  },
  {
    icon: "pin",
    title: "地域密着と全国展開の両立",
    body: "横浜近郊へのきめ細やかな対応と、全国への冷凍配送で、どこへでも心を込めてお届けします。",
  },
];

export const VOICES = [
  {
    quote:
      "遠方の親族に贈りましたが、「料亭の味がそのままだ」と大変喜ばれました。",
    by: "神奈川県在住",
    kind: "ご法要にてご利用",
  },
  {
    quote:
      "会議弁当として定期的に利用しています。時間通りの配達で、味も安定しており安心です。",
    by: "横浜市内 企業様",
    kind: "会議弁当にてご利用",
  },
  {
    quote:
      "周年行事でケータリングをお願いしましたが、料理もサービスも素晴らしく、参加者に好評でした。",
    by: "神奈川県内 企業様",
    kind: "周年行事にてご利用",
  },
  {
    quote:
      "ホームパーティーで利用して、準備や片付けの手間がなく、ゆっくりおもてなしができました。",
    by: "横浜市在住 個人様",
    kind: "ご家庭の集いにてご利用",
  },
];

export const COMPANY_INFO = [
  { label: "会社名", value: "株式会社イズミ産業" },
  { label: "創業", value: "昭和四十九年（1974年）" },
  { label: "所在地", value: "神奈川県横浜市保土ヶ谷区仏向町 946" },
  { label: "電話", value: "045-333-0163（横浜本店 9:00-21:00 年中無休）" },
  { label: "関連", value: "団体様向け宴会施設「日本料理 広美」併設" },
];
