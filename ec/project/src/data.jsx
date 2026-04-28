// Product & category data for the Izumi Sangyo EC site.
// Categories mirror the corporate site taxonomy: www.isg.co.jp/dishes/*
//   shokado / set / oiwai / party  (+ frozen flag for 全国配送)

const CATEGORIES = [
  { id: "shokado", num: "01", ja: "松花堂",                en: "SHOKADO",     desc: "在りし日を偲び、想い出を語り合う和やかなお席に。一人前の折詰仕立てにて承ります。", count: 6 },
  { id: "set",     num: "02", ja: "セット料理",            en: "SET MENU",    desc: "想い出語りのひとときに、心のこもったお料理をセットにしてご用意致します。", count: 5 },
  { id: "oiwai",   num: "03", ja: "お祝い",                en: "CELEBRATION", desc: "人生の節々に訪れる祝福の門出に。「華」のあるお料理をお創りします。", count: 4 },
  { id: "party",   num: "04", ja: "パーティー・ケータリング", en: "CATERING",    desc: "ご会合や様々な集いのシーンでご希望の多い、ご満足いただけるメニューを。", count: 5 },
];

const PRODUCTS = [
  // 松花堂（折詰）
  { id: "shokado-tsuru",    cat: "shokado", ja: "松花堂　鶴",                en: "SHOKADO TSURU",    price: 4200,  serves: "一人前",    tag: "冷凍可", freeze: true,  desc: "一汁五菜の松花堂仕立て。法要・ご会食のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-kame",     cat: "shokado", ja: "松花堂　亀",                en: "SHOKADO KAME",     price: 3600,  serves: "一人前",    tag: "冷凍可", freeze: true,  desc: "一汁四菜の松花堂。想い出を語り合うお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-matsu",    cat: "shokado", ja: "松花堂御膳　松",            en: "SHOKADO MATSU",    price: 5800,  serves: "一人前",    tag: "定番",   freeze: true,  desc: "晴れの日にも通じる、上品な松花堂仕立て。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-fresh",    cat: "shokado", ja: "松花堂　生仕立",            en: "SHOKADO FRESH",    price: 4800,  serves: "一人前",    tag: null,     freeze: false, desc: "ご近隣向けの生仕立て。当日に召上がるお席に。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "makunouchi",       cat: "shokado", ja: "ロケ弁当　幕の内",          en: "ROKE MAKUNOUCHI",  price: 1400,  serves: "一人前",    tag: null,     freeze: false, desc: "撮影現場・会議用の定番幕の内。冷めても美味しい仕立て。", lead: "前日15時まで", area: "神奈川・東京" },
  { id: "kaigo-bento",      cat: "shokado", ja: "会合弁当　二段重",          en: "KAIGO NIDAN",      price: 2800,  serves: "一人前",    tag: null,     freeze: false, desc: "会議・懇親会に。二段重のボリューム。", lead: "前日15時まで", area: "神奈川・東京" },

  // セット料理
  { id: "set-b12",          cat: "set",     ja: "セット料理　B-12",          en: "SET B-12",         price: 6800,  serves: "2〜3名様",  tag: "人気",   freeze: false, desc: "定番のセット折詰。12種のお料理を彩り良く。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "set-nidan",        cat: "set",     ja: "セット料理　二段重",        en: "SET NIDAN",        price: 9800,  serves: "3〜4名様",  tag: null,     freeze: false, desc: "二段重の仕立て。少人数の集まりに。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "set-frozen",       cat: "set",     ja: "セット料理　冷凍仕立",      en: "SET FROZEN",       price: 7800,  serves: "2〜3名様",  tag: "冷凍可", freeze: true,  desc: "遠方へのお届けに。解凍するだけで整う本格仕立て。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "sushi-platter",    cat: "set",     ja: "寿司盛合せ　特上",          en: "SUSHI TOKUJOU",    price: 12800, serves: "4〜5名様",  tag: "定番",   freeze: false, desc: "三浦の地魚を中心に、握りと巻を盛合せ。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "sand-basket",      cat: "set",     ja: "サンドとサラダの籠盛",      en: "SAND BASKET",      price: 6800,  serves: "4〜5名様",  tag: null,     freeze: false, desc: "軽やかな集まりに。サンドとデリの詰合せ。", lead: "前日17時まで", area: "神奈川・東京" },

  // お祝い
  { id: "oiwai-nidan",      cat: "oiwai",   ja: "お祝い膳　二段重",          en: "OIWAI NIDAN",      price: 8800,  serves: "2〜3名様",  tag: "冷凍可", freeze: true,  desc: "鯛・海老・赤飯を中心に。晴れの日のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "okuizome",         cat: "oiwai",   ja: "お食い初め膳",              en: "OKUIZOME",         price: 12000, serves: "一式",      tag: "定番",   freeze: false, desc: "鯛の姿焼き、赤飯、歯固めの石付き。祝箸・掛紙をお付けします。", lead: "中3日",       area: "神奈川・東京" },
  { id: "oiwai-frozen",     cat: "oiwai",   ja: "お祝い折詰　冷凍",          en: "OIWAI FROZEN",     price: 5800,  serves: "一人前",    tag: "冷凍可", freeze: true,  desc: "遠方へのお祝いに。解凍するだけで晴れの膳が整います。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "uchiiwai",         cat: "oiwai",   ja: "内祝折詰",                  en: "UCHIIWAI",         price: 3600,  serves: "一人前",    tag: null,     freeze: false, desc: "快気・結婚・出産内祝に。掛紙・熨斗無料。", lead: "前日17時まで", area: "神奈川・東京" },

  // パーティー・ケータリング
  { id: "party-platter-l",  cat: "party",   ja: "オードブル盛合せ　大",      en: "PARTY PLATTER L",  price: 14800, serves: "8〜10名様", tag: "人気",   freeze: false, desc: "寿司・焼物・揚物・サラダを彩り良く。お席の中心に。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "party-platter-m",  cat: "party",   ja: "オードブル盛合せ　中",      en: "PARTY PLATTER M",  price: 9800,  serves: "5〜6名様",  tag: null,     freeze: false, desc: "少人数の集まりに。定番の詰合せ。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "party-wa",         cat: "party",   ja: "和のオードブル　華",        en: "PARTY WA HANA",    price: 16800, serves: "8〜10名様", tag: null,     freeze: false, desc: "和食中心の盛合せ。季節の食材を用いた上品な仕立て。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "party-yo",         cat: "party",   ja: "洋のオードブル　彩",        en: "PARTY YO IRODORI", price: 15800, serves: "8〜10名様", tag: null,     freeze: false, desc: "洋食中心の盛合せ。パーティーシーンに華を添えます。", lead: "前日17時まで", area: "神奈川・東京" },
  { id: "sekku-hina",       cat: "party",   ja: "桃の節句　雛ちらし",        en: "SEKKU HINA",       price: 4200,  serves: "一人前",    tag: null,     freeze: false, desc: "三月三日のお祝いに。彩り豊かなちらし寿司。", lead: "前日17時まで", area: "神奈川・東京" },
];

// detail dishes for featured product
const FEATURED_DISHES = [
  "先付 — 胡麻豆腐　山葵餡",
  "向付 — 湯葉の刺身　菜種辛子",
  "椀物 — 清し仕立て　松茸　三つ葉",
  "焼物 — 焼き松茸　酢橘",
  "炊合 — 冬瓜　椎茸　蓮根　人参",
  "揚物 — 素揚げ　茄子　南瓜　獅子唐",
  "酢の物 — 占地の土佐酢",
  "食事 — 豆ご飯　香の物",
  "水菓子 — 季節の果実",
];

const VOICES = [
  { stars: "★★★★★", quote: "社内会合のオードブルをお願いしました。彩りも味も素晴らしく、参加者から大好評でした。", by: { name: "N様", loc: "横浜市・法人", kind: "パーティー・ケータリング" } },
  { stars: "★★★★★", quote: "初節句のお祝いに利用させて頂きました。鯛の姿焼きがお見事で、記念の写真も映えました。", by: { name: "M様", loc: "東京都世田谷区", kind: "お祝い" } },
  { stars: "★★★★★", quote: "遠方の親族にも送れる冷凍の松花堂があり、大変助かりました。お味も生と変わらぬ品格です。", by: { name: "T家", loc: "北海道函館市", kind: "松花堂・冷凍配送" } },
];

window.IZUMI_DATA = { CATEGORIES, PRODUCTS, FEATURED_DISHES, SHOJIN_MATSU_DISHES: FEATURED_DISHES, VOICES };
