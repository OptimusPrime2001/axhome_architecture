import type { Metadata } from "next";
import "@styles/index.scss";
import {
  MetaPixel,
  MotionProvider,
  QueryProvider,
  Toaster,
  TooltipProvider,
} from "@components";
import {
  COMPANY_INFO,
  FONT_BE_VIETNAM_PRO,
  FONT_GOOGLE_SANS,
  FONT_SPACE_GROTESK,
  R2_IMG_URL,
} from "@constants";
import { cn } from "@lib/utils";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.website),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.svg",
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
    "xây nhà trọn gói hà nội",
    "thiết kế kiến trúc hà nội",
    "axhome",
  ],
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        url: `${R2_IMG_URL}/banner/hero_background.jpg`,
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
    images: [`${R2_IMG_URL}/banner/hero_background.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={cn(FONT_SPACE_GROTESK.variable, FONT_GOOGLE_SANS.variable)}
      data-scroll-behavior="smooth"
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
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        {GA_MEASUREMENT_ID ? (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        ) : null}
        <MetaPixel />
      </body>
    </html>
  );
}
