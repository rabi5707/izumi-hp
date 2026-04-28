import type { Metadata } from "next";
import { CateringHeader } from "@/components/CateringHeader";
import { CateringFooter } from "@/components/CateringFooter";

export const metadata: Metadata = {
  title: "ケータリング　｜　株式会社イズミ産業",
  description:
    "横浜の老舗・株式会社イズミ産業のケータリング。法人懇親会・周年行事・株主総会・ご家族のお祝いから撮影現場の食事まで、20名様以上のパーティー料理を和洋折衷でお届けします。",
};

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CateringHeader />
      <main data-section="catering">{children}</main>
      <CateringFooter />
    </>
  );
}
