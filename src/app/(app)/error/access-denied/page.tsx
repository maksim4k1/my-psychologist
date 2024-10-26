import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";

function AccessDeniedError() {
  return (
    <Container>
      <PageTitle>403 - отказано в доступе</PageTitle>
    </Container>
  );
}

export default AccessDeniedError;
