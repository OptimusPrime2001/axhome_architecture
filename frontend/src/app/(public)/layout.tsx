import {
  BackToTop,
  ChatWidget,
  Footer,
  Header,
  MobileBottomNav,
} from "@components";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <BackToTop />
      <MobileBottomNav />
    </>
  );
}
