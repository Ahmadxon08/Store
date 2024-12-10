import BackTopButton from "../components/backtop/BackTopButton";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import { Toaster } from "react-hot-toast";

const AppRouter = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          position: "fixed",
          top: 80,
          right: 0,
          zIndex: 9995435439,
        }}
      />
      <Header />
      <Banner />
      <Main />
      <BackTopButton />
      <Footer />
    </div>
  );
};

export default AppRouter;
