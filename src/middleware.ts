import type { NextRequest } from "next/server";
import { Roles } from "@/configs/routesConfig";
import { checkAccessRights } from "./routes";

export function middleware(request: NextRequest) {
  const role: string = Roles.unauthorized;
  const pathname: string = request.nextUrl.pathname;

  const redirect: string | null = checkAccessRights(pathname, role);

  if (redirect !== null) {
    // return Response.redirect(new URL(redirect, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
