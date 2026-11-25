import {
  Be_Vietnam_Pro,
  Google_Sans,
  Poppins,
  Space_Grotesk,
} from "next/font/google";

export const FONT_BE_VIETNAM_PRO = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be_vietnam",
});

// export const FONT_PLAYFAIR = Playfair_Display({
//   subsets: ["latin", "vietnamese"],
//   display: "swap",
//   variable: "--font-playfair",
// });

export const FONT_POPPINS = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const FONT_SPACE_GROTESK = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space_grotesk",
});

export const FONT_GOOGLE_SANS = Google_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font_google-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
