import type { Metadata } from "next";
import { Montserrat, Roboto, Victor_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ModalsPortal, SnackbarsPortal } from "@/client/components";
import { AuthLayout } from "@/client/components/AuthLayout";
import { StoreProvider } from "@/client/redux";
import "@/client/styles/global.scss";
import "@/client/styles/reset.scss";
import { cookies as cookiesData } from "@/shared/data";
import { getInitialState } from "@/shared/utils";
import { type FC, type ReactNode } from "react";

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
  title: "Обсудим?",
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(cookiesData.accessToken.name)?.value;

  const initialState = await getInitialState(accessToken);

  return (
    <html lang="ru">
      <body
        className={`${fontRoboto.variable} ${fontVictorMono.variable} ${fontMontserrat.variable}`}
      >
        <StoreProvider initialState={initialState}>
          <AuthLayout>
            {children}
            <SnackbarsPortal />
            <ModalsPortal />
          </AuthLayout>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
