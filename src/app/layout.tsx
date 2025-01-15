import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { fontVariablesClass } from "@/client/assets/fonts";
import { ModalsPortal, SnackbarsPortal } from "@/client/components";
import { AuthLayer, I18nLayer, StoreLayer } from "@/client/components/layers";
import "@/client/styles/global.scss";
import "@/client/styles/reset.scss";
import { type FC, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Одеяло",
  description:
    "Программная система для сопровождения психотерапии и самостоятельной проработки психологических проблем",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={fontVariablesClass}>
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
