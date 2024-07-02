import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import { FunctionComponent } from "react";

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
