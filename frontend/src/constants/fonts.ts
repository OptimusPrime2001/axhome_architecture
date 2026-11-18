import {
  Be_Vietnam_Pro,
  Google_Sans,
  Playfair_Display,
  Poppins,
  Space_Grotesk,
} from "next/font/google";

export const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be_vietnam",
});
export const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-playfair", // xuất ra CSS variable để dùng trong SCSS
});
export const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
export const space_grotesk = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space_grotesk",
});
export const googleSans = Google_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-google-sans", // Tạo biến CSS để dùng trong SCSS
  display: "swap",
});
