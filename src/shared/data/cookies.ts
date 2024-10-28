import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface Cookie {
  name: string;
  params?: Partial<ResponseCookie>;
}

interface Cookies {
  accessToken: Cookie;
  userData: Cookie;
}

export const cookies: Cookies = {
  accessToken: {
    name: "access_token",
    params: {
      httpOnly: true,
    },
  },
  userData: {
    name: "user_data",
  },
};

export const deleteCookieParams: Partial<ResponseCookie> = {
  maxAge: -1,
  path: "/",
};
