import { type MiddlewareConfig, type NextRequest } from "next/server";
import { checkAuth } from "@/server/utils";

export const middleware = async (request: NextRequest) => {
  const response = await checkAuth(request);

  return response;
};

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next|static|image|favicon.ico).*)"],
};
