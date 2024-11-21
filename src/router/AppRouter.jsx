import BackTopButton from "../components/backtop/BackTopButton";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Main />
      <BackTopButton />
      <Footer />
    </div>
  );
};

export default AppRouter;
