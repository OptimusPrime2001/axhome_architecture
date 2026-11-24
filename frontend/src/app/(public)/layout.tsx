import {
  BackToTop,
  ChatWidget,
  Footer,
  Header,
  LocalBusinessJsonLd,
  MobileBottomNav,
  UtmTracker,
} from "@components";
import { Suspense } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <Suspense fallback={null}>
        <UtmTracker />
      </Suspense>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <BackToTop />
      <MobileBottomNav />
    </>
  );
}
