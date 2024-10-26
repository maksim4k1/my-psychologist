import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import { type FC } from "react";

export const NotFoundPage: FC = () => {
  return (
    <Container>
      <PageTitle>404 - страница не найдена</PageTitle>
    </Container>
  );
};
