import type ru from "@/shared/data/i18n/ru.json";

type Messages = typeof ru;

declare global {
  type IntlMessages = Messages;
}
