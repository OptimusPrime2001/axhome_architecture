import { BackToTop, ChatWidget, Footer, Header } from "@components";

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
    </>
  );
}
