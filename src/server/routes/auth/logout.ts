import { NextResponse } from "next/server";

const logout = async () => {
  const response = NextResponse.json({ message: "OK" });
  response.cookies.set("access_token", "", {
    maxAge: -1,
    path: "/",
  });
  response.cookies.set("user_data", "", {
    maxAge: -1,
    path: "/",
  });

  return response;
};

export const LogoutRoutes = {
  POST: logout,
};
