// Structured data (JSON-LD) helpers — centralized so every consumer agrees
// on the canonical Organization/LocalBusiness identity.

import { LEGAL_INFO } from "./legal";

const BASE = LEGAL_INFO.shopUrl.replace(/\/$/, "");

/**
 * FoodEstablishment is the most specific schema.org type for a 仕出し屋.
 * Google treats it as a LocalBusiness subtype, surfacing it in local
 * results and Maps. Anchor everything else (Article publisher, Product
 * brand, etc.) to the same @id so search engines coalesce the entity.
 */
export const ORG_ID = `${BASE}/#organization`;

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "LocalBusiness"],
  "@id": ORG_ID,
  name: LEGAL_INFO.corpName,
  alternateName: ["イズミ産業", "Izumi Sangyo"],
  url: LEGAL_INFO.shopUrl,
  logo: `${BASE}/images/portal-hero.png`,
  image: `${BASE}/images/portal-hero.png`,
  telephone: LEGAL_INFO.tel,
  faxNumber: LEGAL_INFO.fax,
  email: LEGAL_INFO.email,
  foundingDate: LEGAL_INFO.foundedEn,
  founder: { "@type": "Person", name: LEGAL_INFO.representative },
  priceRange: "¥¥–¥¥¥",
  servesCuisine: ["Japanese", "和食", "仕出し", "懐石", "松花堂"],
  paymentAccepted: ["Cash", "Credit Card", "Invoice"],
  currenciesAccepted: "JPY",
  address: {
    "@type": "PostalAddress",
    streetAddress: "仏向町 946",
    addressLocality: "横浜市保土ヶ谷区",
    addressRegion: "神奈川県",
    postalCode: LEGAL_INFO.zip,
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.4575,
    longitude: 139.5862,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "横浜市" },
    { "@type": "AdministrativeArea", name: "神奈川県" },
    { "@type": "Country", name: "日本（冷凍折詰の全国配送）" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "サービス一覧",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "冷凍折詰・全国配送",
        url: `${BASE}/shop`,
      },
      {
        "@type": "OfferCatalog",
        name: "お届け弁当（横浜近郊）",
        url: `${BASE}/bento-delivery`,
      },
      {
        "@type": "OfferCatalog",
        name: "フルケータリング（横浜近郊）",
        url: `${BASE}/catering`,
      },
    ],
  },
  sameAs: [LEGAL_INFO.corporateUrl],
};

/** A lighter Organization reference for use as `publisher` / `author`. */
export const orgRef = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: LEGAL_INFO.corpName,
  url: LEGAL_INFO.shopUrl,
};

export type Crumb = { name: string; path: string };

export function breadcrumbLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${BASE}${it.path}`,
    })),
  };
}

export function jsonLdScript(data: unknown) {
  // `</` を含む文字列が JSON 値に紛れ込むと script タグから抜け出されてしまう。
  // `<` に置換して script コンテキスト脱出を防ぐ。
  // 加えて U+2028/U+2029 もブラウザの旧パーサ実装に合わせて escape する。
  const safe = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(new RegExp("\\u2028", "g"), "\\u2028")
    .replace(new RegExp("\\u2029", "g"), "\\u2029");
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: safe },
  };
}
