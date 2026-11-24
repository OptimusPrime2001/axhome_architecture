import {
  COMPANY_INFO,
  MESSENGER_LINK,
  R2_IMG_URL,
  ZALO_LINK,
} from "@constants";
import type { ContactFaqItem, Project } from "@shared-types";

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function LocalBusinessJsonLd() {
  const baseUrl = COMPANY_INFO.website.replace(/\/+$/, "");
  const mainOffice = COMPANY_INFO.offices[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY_INFO.brandName,
    alternateName: COMPANY_INFO.shortName,
    description: COMPANY_INFO.description,
    url: baseUrl,
    logo: `${baseUrl}/images/axhome_logo.png`,
    image: `${R2_IMG_URL}/banner/hero_background.jpg`,
    telephone: COMPANY_INFO.hotline,
    email: COMPANY_INFO.email,
    slogan: COMPANY_INFO.slogan,
    priceRange: "$$$",
    address: mainOffice
      ? {
          "@type": "PostalAddress",
          streetAddress: mainOffice.address,
          addressLocality: "Hà Đông",
          addressRegion: "Hà Nội",
          addressCountry: "VN",
        }
      : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [MESSENGER_LINK, ZALO_LINK],
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
  };

  return <script type="application/ld+json">{serializeJsonLd(jsonLd)}</script>;
}

export function FaqJsonLd({ items }: { items: ContactFaqItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json">{serializeJsonLd(jsonLd)}</script>;
}

export function ProjectDetailJsonLd({ project }: { project: Project }) {
  const baseUrl = COMPANY_INFO.website.replace(/\/+$/, "");
  const projectUrl = `${baseUrl}/projects/${project.slug}`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription || project.excerpt,
    url: projectUrl,
    image: project.coverImage,
    datePublished: project.createdAt,
    creator: {
      "@type": "Organization",
      name: COMPANY_INFO.brandName,
      url: baseUrl,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dự án",
        item: `${baseUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {serializeJsonLd(creativeWork)}
      </script>
      <script type="application/ld+json">{serializeJsonLd(breadcrumb)}</script>
    </>
  );
}
