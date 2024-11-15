import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface Cookie {
  name: string;
  params?: Partial<ResponseCookie>;
}

interface Cookies {
  accessToken: Cookie;
}

export const cookies: Cookies = {
  accessToken: {
    name: "access_token",
    params: {
      httpOnly: true,
    },
  },
};

export const deleteCookieParams: Partial<ResponseCookie> = {
  maxAge: -1,
  path: "/",
};
