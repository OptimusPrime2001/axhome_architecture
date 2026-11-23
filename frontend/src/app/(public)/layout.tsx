import {
  BackToTop,
  ChatWidget,
  Footer,
  Header,
  LocalBusinessJsonLd,
  MobileBottomNav,
} from "@components";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <BackToTop />
      <MobileBottomNav />
    </>
  );
}
