import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import { type FunctionComponent } from "react";

interface Props {
  message?: string;
}

const BadRequestError: FunctionComponent<Props> = ({ message }) => {
  return (
    <Container>
      <PageTitle>
        400 - {!message ? "отсутствуют ожидаемые параметры" : message}
      </PageTitle>
    </Container>
  );
};

export default BadRequestError;