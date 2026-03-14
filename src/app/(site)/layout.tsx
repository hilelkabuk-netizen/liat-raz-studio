import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
