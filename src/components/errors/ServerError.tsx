import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import { FunctionComponent } from "react";

interface Props {
  message?: string;
}

const ServerError: FunctionComponent<Props> = ({
  message = "ошибка сервера",
}) => {
  return (
    <Container>
      <PageTitle>500 - {message}</PageTitle>
    </Container>
  );
};

export default ServerError;
