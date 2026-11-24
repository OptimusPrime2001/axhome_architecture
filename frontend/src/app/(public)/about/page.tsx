import {
  AboutCapabilities,
  AboutCoreValues,
  AboutCtaBanner,
  AboutHero,
  AboutProcess,
  AboutStoryTimeline,
  AboutTeam,
  AboutVisionMission,
} from "@components";
import { COMPANY_INFO } from "@constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description: `Hành trình hơn một thập kỷ kiến tạo không gian sống thượng lưu của ${COMPANY_INFO.brandName} — Tầm nhìn, Sứ mệnh, 4 Giá trị cốt lõi, Năng lực Design & Build và Quy trình 6 bước nghiêm ngặt.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `Giới Thiệu | ${COMPANY_INFO.brandName}`,
    description: `Hành trình kiến tạo không gian sống thượng lưu của ${COMPANY_INFO.brandName} — Năng lực thiết kế & tổng thầu thi công trọn gói.`,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: `Giới Thiệu | ${COMPANY_INFO.brandName}`,
    description: `Hành trình kiến tạo không gian sống thượng lưu của ${COMPANY_INFO.brandName} — Năng lực thiết kế & tổng thầu thi công trọn gói.`,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStoryTimeline />
      <AboutVisionMission />
      <AboutCoreValues />
      <AboutCapabilities />
      <AboutTeam />
      <AboutProcess />
      <AboutCtaBanner />
    </>
  );
}
