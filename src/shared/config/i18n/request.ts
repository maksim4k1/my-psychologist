import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "ru";

  const messages = (await import(`@/shared/data/i18n/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
