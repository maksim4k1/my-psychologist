import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type FC, type ReactNode } from "react";

interface I18nLayoutProps {
  children: ReactNode;
}

export const I18nLayer: FC<I18nLayoutProps> = async ({ children }) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
