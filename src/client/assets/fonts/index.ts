import { Inter, Montserrat, Roboto, Victor_Mono } from "next/font/google";
import localFont from "next/font/local";

export const fontCygre = localFont({
  src: "./Cygre-SemiBold.ttf",
  display: "swap",
  variable: "--font-cygre",
});

export const fontInter = Inter({
  weight: ["500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const fontRoboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const fontVictorMono = Victor_Mono({
  weight: ["700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-victor-mono",
});

export const fontMontserrat = Montserrat({
  weight: ["400", "600"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const fontVariablesClass = [
  fontRoboto.variable,
  fontVictorMono.variable,
  fontMontserrat.variable,
  fontInter.variable,
  fontCygre.variable,
].join(" ");
