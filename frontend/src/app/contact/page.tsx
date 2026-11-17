import {
  ContactFaqSection,
  ContactFormSection,
  ContactHero,
  ContactMapSection,
  ContactSocialStrip,
} from "@components";
import { COMPANY_INFO } from "@constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: `Kết nối cùng ${COMPANY_INFO.brandName} — Địa chỉ văn phòng TP. Hồ Chí Minh & Hưng Yên, bản đồ chỉ đường, đăng ký nhận phương án thiết kế và dự toán sơ bộ.`,
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactMapSection />
      <ContactFaqSection />
      <ContactSocialStrip />
    </>
  );
}
