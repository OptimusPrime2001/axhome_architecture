import {
  ContactFaqSection,
  ContactFormSection,
  ContactHero,
  ContactMapSection,
  ContactSocialStrip,
  FaqJsonLd,
} from "@components";
import { COMPANY_INFO, CONTACT_FAQ_ITEMS } from "@constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: `Kết nối cùng ${COMPANY_INFO.brandName} tại Hà Nội — Đặt lịch khảo sát thực địa, nhận tư vấn phương án thiết kế kiến trúc và dự toán thi công trọn gói miễn phí.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Liên Hệ Tư Vấn | ${COMPANY_INFO.brandName}`,
    description: `Kết nối cùng ${COMPANY_INFO.brandName} tại Hà Nội — Đặt lịch khảo sát thực địa, nhận phương án thiết kế và dự toán sơ bộ miễn phí.`,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: `Liên Hệ Tư Vấn | ${COMPANY_INFO.brandName}`,
    description: `Kết nối cùng ${COMPANY_INFO.brandName} tại Hà Nội — Đặt lịch khảo sát thực địa, nhận phương án thiết kế và dự toán sơ bộ miễn phí.`,
  },
};

export default function ContactPage() {
  return (
    <>
      <FaqJsonLd items={CONTACT_FAQ_ITEMS} />
      <ContactHero />
      <ContactFormSection />
      <ContactMapSection />
      <ContactFaqSection />
      <ContactSocialStrip />
    </>
  );
}
