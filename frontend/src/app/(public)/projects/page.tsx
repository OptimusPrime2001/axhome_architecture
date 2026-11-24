import {
  ProjectsCatalogue,
  ProjectsCtaBanner,
  ProjectsHero,
  ProjectsStandards,
} from "@components";
import { COMPANY_INFO } from "@constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án",
  description: `Khám phá bộ sưu tập thiết kế 3D độc bản và công trình biệt thự, nhà phố, dinh thự thực tế do ${COMPANY_INFO.brandName} thiết kế & thi công trọn gói.`,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Dự Án Kiến Trúc & Thi Công | ${COMPANY_INFO.brandName}`,
    description: `Bộ sưu tập thiết kế 3D độc bản và công trình biệt thự, nhà phố, dinh thự thực tế do ${COMPANY_INFO.brandName} thực hiện.`,
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: `Dự Án Kiến Trúc & Thi Công | ${COMPANY_INFO.brandName}`,
    description: `Bộ sưu tập thiết kế 3D độc bản và công trình biệt thự, nhà phố, dinh thự thực tế do ${COMPANY_INFO.brandName} thực hiện.`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsCatalogue />
      <ProjectsStandards />
      <ProjectsCtaBanner />
    </>
  );
}
