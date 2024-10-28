import { type NextRequest, NextResponse } from "next/server";
import { deleteAuthCookies, setAuthCookies } from "@/server/utils";
import { ACCESS, type AccessRole } from "@/shared/config/access.config";
import { customAxios } from "@/shared/config/api.config";
import { cookies, pages, routes } from "@/shared/data";
import { getRole } from "@/shared/utils/api";

const checkPath = (pathname: string, template: string): boolean => {
  const pathElements = pathname.split("/");
  const templateElements = template.split("/");

  if (pathElements.length !== templateElements.length) return false;

  const pathElRegExp = /[A-Za-z0-9-_.~%]/i;
  const n = pathElements.length;

  for (let i = 0; i < n; i++) {
    const pathEl = pathElements[i];
    const templateEl = templateElements[i];

    if (templateEl[0] === ":") {
      if (!pathElRegExp.test(pathEl)) return false;
    } else if (pathEl !== templateEl) return false;
  }

  return true;
};

const loginByToken = async (request: NextRequest) => {
  try {
    const accessToken = request.cookies.get(cookies.authToken.name)?.value;

    if (accessToken) {
      const response = await customAxios.post("/users/auth_token", {
        token: accessToken,
      });

      return response.data;
    }
  } catch {
    return null;
  }

  return null;
};

const checkAuth = async (request: NextRequest, role: AccessRole) => {
  const { pathname } = request.nextUrl;

  for (const route of routes) {
    const { path, access } = route;

    if (checkPath(pathname, path)) {
      if (!access || access.includes(role)) return NextResponse.next();
      else {
        if (access.length === 1 && access[0] === ACCESS.unauthorized) {
          return NextResponse.redirect(
            new URL(pages.profile.path, request.url),
          );
        } else if (role === ACCESS.unauthorized) {
          return NextResponse.redirect(new URL(pages.login.path, request.url));
        }

        return NextResponse.rewrite(
          new URL("/error/access-denied", request.url),
        );
      }
    }
  }

  return NextResponse.rewrite(new URL("/error/not-found", request.url));
};

export const middleware = async (request: NextRequest) => {
  const userData = await loginByToken(request);

  let response = await checkAuth(request, getRole(userData?.role));

  if (userData === null) {
    response = deleteAuthCookies(response);
  } else {
    response = setAuthCookies(response, userData);
  }

  return response;
};

export const config = {
  matcher: ["/((?!api|_next|static).*)"],
};
