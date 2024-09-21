import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import { type FunctionComponent } from "react";

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
