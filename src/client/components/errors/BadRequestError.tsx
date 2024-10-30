import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

interface Props {
  message?: string;
}

export const BadRequestError: FC<Props> = ({ message }) => {
  return (
    <Container>
      <PageTitle>
        400 - {!message ? "отсутствуют ожидаемые параметры" : message}
      </PageTitle>
    </Container>
  );
};
