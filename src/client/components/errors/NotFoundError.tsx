import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

interface Props {
  message: string;
}

export const NotFoundError: FC<Props> = ({ message }) => {
  return (
    <Container>
      <PageTitle>404 - {message}</PageTitle>
    </Container>
  );
};
