import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const AccessDeniedError: FC = () => {
  return (
    <Container>
      <PageTitle>403 - отказано в доступе</PageTitle>
    </Container>
  );
};
