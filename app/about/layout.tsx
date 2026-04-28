import { BrandHeader } from "@/components/BrandHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrandHeader />
      <main data-section="about">{children}</main>
      <SiteFooter />
    </>
  );
}
