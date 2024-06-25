import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";

function AccessDeniedError() {
  return (
    <Container>
      <PageTitle>403 - отказано в доступе</PageTitle>
    </Container>
  );
}

export default AccessDeniedError;
