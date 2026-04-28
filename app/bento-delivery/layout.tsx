import type { Metadata } from "next";
import { BentoDeliveryHeader } from "@/components/BentoDeliveryHeader";
import { BentoDeliveryFooter } from "@/components/BentoDeliveryFooter";

export const metadata: Metadata = {
  title: "お弁当・パーティーセットのお届け窓口　｜　株式会社イズミ産業",
  description:
    "横浜の老舗・株式会社イズミ産業のお弁当・パーティーセットのお届け窓口。会議・法事・ロケ弁・ホームパーティーまで、配膳・回収なしで気軽にご利用いただけます。ご注文¥20,000より承ります。",
};

export default function BentoDeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BentoDeliveryHeader />
      <main data-section="bento-delivery">{children}</main>
      <BentoDeliveryFooter />
    </>
  );
}
