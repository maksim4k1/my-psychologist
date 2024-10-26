import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import { type FC } from "react";

export const AccessDeniedPage: FC = () => {
  return (
    <Container>
      <PageTitle>403 - отказано в доступе</PageTitle>
    </Container>
  );
};
