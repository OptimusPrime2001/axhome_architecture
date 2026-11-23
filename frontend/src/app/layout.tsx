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

export const metadata: Metadata = {
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
      </body>
    </html>
  );
}
