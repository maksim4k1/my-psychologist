import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import { FunctionComponent } from "react";

interface Props {
  status?: number;
  message?: string;
}

const ServerError: FunctionComponent<Props> = ({
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

export default ServerError;
