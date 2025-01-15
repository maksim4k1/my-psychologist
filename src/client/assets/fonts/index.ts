import { Inter } from "next/font/google";
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

export const fontVariablesClass = [fontInter.variable, fontCygre.variable].join(
  " ",
);
