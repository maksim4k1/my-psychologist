import { type NextRequest, NextResponse } from "next/server";
import { type LoginPayload } from "@/client/redux/features/auth/types";
import { setAuthCookies } from "@/server/utils";
import { customAxios } from "@/shared/config/api.config";

const login = async (request: NextRequest) => {
  try {
    const body: LoginPayload = await request.json();

    const serverResponse = await customAxios.post("/users/auth", body);

    const data = serverResponse.data;

    const response = setAuthCookies(
      NextResponse.json(data, { status: 200 }),
      data,
    );

    return response;
  } catch {
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 },
    );
  }
};

export const LoginRoutes = {
  POST: login,
};
