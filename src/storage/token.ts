import { getCookie } from "@/utils/cookieUtils";

export const saveToken = (token: string): void => {
  document.cookie = `session_cookie=${token}; path=/`;
};

export const getToken = (): string | null => {
  return getCookie("session_cookie");
};

export const deleteToken = (): void => {
  document.cookie =
    "session_cookie=; Path=/; Domain=" +
    process.env.NEXT_PUBLIC_DOMAIN +
    "; Max-Age=-1;";
};
