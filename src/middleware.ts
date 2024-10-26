import { type NextRequest, NextResponse } from "next/server";
import { getRole } from "@/client/utils/apiUtils";
import { ACCESS, type AccessRole } from "@/shared/config/access.config";
import { customAxios } from "@/shared/config/api.config";
import { routes } from "@/shared/data/routes";

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

const getUserRole = async (request: NextRequest): Promise<AccessRole> => {
  try {
    const accessToken = request.cookies.get("access_token")?.value ?? "";

    const response = await customAxios.post("/users/auth_token", {
      token: accessToken,
    });

    const data = response.data;

    return getRole(data.role);
  } catch {
    return ACCESS.unauthorized;
  }
};

const checkAuth = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const role = await getUserRole(request);

  for (const route of routes) {
    const { path, access } = route;

    if (checkPath(pathname, path)) {
      if (!access || access.includes(role)) return;
      else {
        if (access.length === 1 && access[0] === ACCESS.unauthorized) {
          return NextResponse.redirect(new URL("/profile", request.url));
        } else if (role === ACCESS.unauthorized) {
          return NextResponse.redirect(new URL("/auth/login", request.url));
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
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/_next") && !pathname.startsWith("/static")) {
    return await checkAuth(request);
  }
};
