import { BrandHeader } from "@/components/BrandHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrandHeader />
      <main data-section="journal">{children}</main>
      <SiteFooter />
    </>
  );
}
