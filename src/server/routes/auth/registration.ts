import { type NextRequest, NextResponse } from "next/server";
import { type RegistrationPayload } from "@/client/redux/features/auth/types";
import { customAxios } from "@/shared/config/api.config";

const registration = async (request: NextRequest) => {
  try {
    const body: RegistrationPayload = await request.json();

    const serverResponse = await customAxios.post("/users/reg", body);

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

export const RegistrationRoutes = {
  POST: registration,
};
