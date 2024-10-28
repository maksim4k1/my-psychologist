import { type NextRequest, NextResponse } from "next/server";
import { mapSendHrSurveyRequest } from "@/server/mappers";
import { customAxios } from "@/shared/config/api.config";
import { type SendHrSurveyRequestData } from "@/shared/types";

const sendHrSurvey = async (request: NextRequest) => {
  try {
    const body: SendHrSurveyRequestData = await request.json();

    await customAxios.post(
      "/manager/send_manager",
      mapSendHrSurveyRequest(body),
      {
        headers: {
          "Cookie": request.cookies.toString(),
        },
      },
    );

    return NextResponse.json({ message: "Заявка создана" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 },
    );
  }
};

export const hrSurveyRoutes = {
  POST: sendHrSurvey,
};
