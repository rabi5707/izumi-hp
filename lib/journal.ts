// Journal — shared client/server types and labels.
//
// Article data lives in Firestore (collection `journal_posts`). Server-side
// fetchers are in `lib/journal-server.ts`; the document shape is in
// `lib/journal-schema.ts`. This file only holds the small bits that both
// client and server components need.

export type Service = "frozen" | "bento" | "catering" | "common";

export const SERVICE_LABELS: Record<Service, { ja: string; en: string; href: string }> = {
  frozen: { ja: "冷凍折詰", en: "Frozen", href: "/shop" },
  bento: { ja: "お届け弁当", en: "Bento Delivery", href: "/bento-delivery" },
  catering: { ja: "ケータリング", en: "Catering", href: "/catering" },
  common: { ja: "共通・知識", en: "General", href: "/" },
};

export function isService(value: string | undefined): value is Service {
  return (
    value === "frozen" ||
    value === "bento" ||
    value === "catering" ||
    value === "common"
  );
}
