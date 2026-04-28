// Only frozen/nationwide area remains — catering delivery areas are now
// handled inside /catering/guide with people-based minimums.

import { PRODUCTS, type Product } from "./products";

export type AreaSlug = "frozen";

export type AreaData = {
  slug: AreaSlug;
  ja: string;
  en: string;
  tag: string;
  h1: string;
  lede: string;
  tel: string;
  telLabel: string;
  /** Illustrative prefecture list. */
  areas: string[];
  scenes: { ja: string; d: string }[];
  prods: Product[];
  faqs: { q: string; a: string }[];
};

export const AREAS: Record<AreaSlug, AreaData> = {
  frozen: {
    slug: "frozen",
    ja: "冷凍便・全国配送",
    en: "FROZEN · NATIONWIDE",
    tag: "関連会社イズミ食品より全国へ",
    h1: "松花堂・お祝い膳を、\n冷凍仕立てにて全国へ。",
    lede:
      "本サイトは冷凍仕立ての折詰を全国どちらへでもお届けするオンライン窓口です。遠方のご親族・お世話になった方々へ、生仕立てに遜色無い品格のお料理を。関連会社「株式会社イズミ食品」の専用工場にて急速冷凍、ヤマト運輸クール便にて全国どちらへでも配送。解凍のご案内も同封致します。",
    tel: "045-332-5100",
    telLabel: "イズミ食品",
    areas: [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ],
    scenes: [
      {
        ja: "遠方のご親族へ",
        d: "お世話になった方々へ、贈答・お歳暮・内祝にも。",
      },
      {
        ja: "法要のお席",
        d: "故人を偲ぶお席に。一人前の折詰から承ります。",
      },
      {
        ja: "お食い初め",
        d: "ご両家遠方の場合にも。解凍するだけで整う晴れの膳。",
      },
      {
        ja: "業務用・まとめ買い",
        d: "ご法要の引出物、ご贈答用に。大口割引も承ります。",
      },
    ],
    prods: PRODUCTS.filter((p) => p.freeze),
    faqs: [
      {
        q: "送料はいくらですか？",
        a: "1配送先につき1,500円（税込）を頂戴しております。ただし10,000円以上のご注文で配送料無料とさせて頂きます。",
      },
      {
        q: "どのくらい日持ちしますか？",
        a: "冷凍庫（-18℃以下）にて製造日より90日間。解凍後は当日中にお召し上がりください。",
      },
      {
        q: "解凍方法は？",
        a: "冷蔵庫にて約12時間の自然解凍をお勧めします。お席の直前に盛り付け直して頂きますと、一層美しくお召し上がり頂けます。",
      },
      {
        q: "配達日指定はできますか？",
        a: "ご注文より中3日以降のお日にちをご指定頂けます。時間帯のご指定も承ります。",
      },
      {
        q: "神奈川・東京の当日便のケータリングは？",
        a: "ご相談ベースで承っております。20名様以上のご会合・ご宴会は、/catering のアドバイザー相談窓口よりお問合せください。",
      },
    ],
  },
};

export const AREA_SLUGS: AreaSlug[] = ["frozen"];
