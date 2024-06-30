import { getCookie } from "@/utils/cookieUtils";

export const saveToken = (token: string): void => {
  document.cookie = `session_cookie=${token}; path=/`;
};

export const getToken = (): string | null => {
  return getCookie("session_cookie");
};

export const deleteToken = (): void => {
  document.cookie = "session_cookie=; Max-Age=-1;";
};
