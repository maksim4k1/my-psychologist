import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import { FunctionComponent } from "react";

interface Props {
  message: string;
}

const NotFoundError: FunctionComponent<Props> = ({ message }) => {
  return (
    <Container>
      <PageTitle>404 - {message}</PageTitle>
    </Container>
  );
};

export default NotFoundError;
