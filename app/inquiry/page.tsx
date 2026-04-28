import { Suspense } from "react";
import type { Metadata } from "next";
import { InquiryClient } from "./InquiryClient";

export const metadata: Metadata = {
  title:
    "お見積・ご相談　｜　株式会社イズミ産業 オンライン御注文",
  description:
    "ケータリング・お届け弁当・冷凍折詰のお見積ご相談フォーム。日時・人数・会場・ご予算をお伺いし、アドバイザーよりご連絡差し上げます。横浜・川崎・東京23区西部は当日便、冷凍便は全国配送にて承ります。",
  alternates: {
    canonical: "https://shop.isg.co.jp/inquiry",
  },
};

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="shell" style={{ padding: 80 }} />}>
      <InquiryClient />
    </Suspense>
  );
}
