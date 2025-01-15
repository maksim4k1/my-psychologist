import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Inter, Montserrat, Roboto, Victor_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ModalsPortal, SnackbarsPortal } from "@/client/components";
import { AuthLayer, I18nLayer, StoreLayer } from "@/client/components/layers";
import "@/client/styles/global.scss";
import "@/client/styles/reset.scss";
import { type FC, type ReactNode } from "react";

export const fontCygre = localFont({
  src: "../client/assets/fonts/Cygre-SemiBold.ttf",
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

export const metadata: Metadata = {
  title: "Одеяло",
  description:
    "Программная система для сопровождения психотерапии и самостоятельной проработки психологических проблем",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${fontRoboto.variable} ${fontVictorMono.variable} ${fontMontserrat.variable} ${fontInter.variable} ${fontCygre.variable}`}
      >
        <I18nLayer>
          <StoreLayer>
            <AuthLayer>
              {children}
              <SnackbarsPortal />
              <ModalsPortal />
            </AuthLayer>
          </StoreLayer>
        </I18nLayer>
      </body>
    </html>
  );
};

export default RootLayout;
