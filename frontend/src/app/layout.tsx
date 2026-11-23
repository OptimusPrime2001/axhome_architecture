import type { Metadata } from "next";
import "@styles/index.scss";
import {
  MotionProvider,
  QueryProvider,
  Toaster,
  TooltipProvider,
} from "@components";
import {
  COMPANY_INFO,
  FONT_BE_VIETNAM_PRO,
  FONT_GOOGLE_SANS,
  FONT_PLAYFAIR,
  FONT_SPACE_GROTESK,
} from "@constants";
import { cn } from "@lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.website),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${COMPANY_INFO.brandName} — ${COMPANY_INFO.slogan}`,
    template: `%s | ${COMPANY_INFO.brandName}`,
  },
  description: COMPANY_INFO.description,
  keywords: [
    "thiết kế biệt thự",
    "thi công trọn gói",
    "kiến trúc nhà phố",
    "bản vẽ kiến trúc",
    "xây nhà trọn gói tp hcm",
    "axhome",
  ],
  authors: [{ name: COMPANY_INFO.brandName }],
  creator: COMPANY_INFO.brandName,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: COMPANY_INFO.website,
    title: `${COMPANY_INFO.brandName} — ${COMPANY_INFO.slogan}`,
    description: COMPANY_INFO.description,
    siteName: COMPANY_INFO.brandName,
    images: [
      {
        url: "/images/hero_background.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY_INFO.brandName} — ${COMPANY_INFO.slogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.brandName} — ${COMPANY_INFO.slogan}`,
    description: COMPANY_INFO.description,
    images: ["/images/hero_background.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  "use cache";

  return (
    <html
      lang="vi"
      className={cn(
        FONT_PLAYFAIR.variable,
        FONT_SPACE_GROTESK.variable,
        FONT_GOOGLE_SANS.variable,
      )}
    >
      <head />
      <body className={FONT_BE_VIETNAM_PRO.className}>
        <QueryProvider>
          <MotionProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </MotionProvider>
        </QueryProvider>
        {GA_MEASUREMENT_ID ? (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        ) : null}
      </body>
    </html>
  );
}
