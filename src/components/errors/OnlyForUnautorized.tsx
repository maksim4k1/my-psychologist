import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";

function OnlyForUnauthorizedErrorPage() {
  return (
    <Container>
      <PageTitle>Вы уже вошли в систему</PageTitle>
    </Container>
  );
}

export default OnlyForUnauthorizedErrorPage;
