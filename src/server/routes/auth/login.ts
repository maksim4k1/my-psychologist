import { type NextRequest, NextResponse } from "next/server";
import { type LoginPayload } from "@/client/redux/features/auth/types";
import { customAxios } from "@/shared/config/api.config";

const loginByToken = async (request: NextRequest) => {
  const accessToken = request.cookies.get("access_token")?.value;

  if (accessToken) {
    try {
      const serverResponse = await customAxios.post("/users/auth_token", {
        token: accessToken,
      });

      const data = serverResponse.data;

      const response = NextResponse.json(data);

      response.cookies.set("access_token", data.token);
      response.cookies.set("user_data", JSON.stringify(data));

      return response;
    } catch {
      return NextResponse.json(
        { message: "Токен не валиден" },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ message: "Токена нет" }, { status: 400 });
};

const login = async (request: NextRequest) => {
  try {
    const body: LoginPayload = await request.json();

    const serverResponse = await customAxios.post("/users/auth", body);

    const data = serverResponse.data;

    const response = NextResponse.json(data, { status: 200 });

    response.cookies.set("access_token", data.token);
    response.cookies.set("user_data", JSON.stringify(data));

    return response;
  } catch {
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 },
    );
  }
};

export const LoginByTokenRoutes = {
  POST: loginByToken,
};

export const LoginRoutes = {
  POST: login,
};
