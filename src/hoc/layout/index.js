import Header from "../../components/organisms/header";
import Main from "../../components/organisms/main";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
