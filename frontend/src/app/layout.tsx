import type { Metadata } from "next";
import "@styles/index.scss";
import { Footer, Header } from "@components";
import { COMPANY_INFO } from "@constants";

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
		"axhome architecture",
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="vi">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
