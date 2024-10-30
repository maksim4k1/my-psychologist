import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

interface Props {
  status?: number;
  message?: string;
}

export const ServerError: FC<Props> = ({
  status = 500,
  message = "ошибка сервера",
}) => {
  return (
    <Container>
      <PageTitle>
        {status} - {message}
      </PageTitle>
    </Container>
  );
};
