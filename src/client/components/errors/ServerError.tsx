import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import { type FunctionComponent } from "react";

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
