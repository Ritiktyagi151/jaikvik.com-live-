import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import Chatbot from "../pages/home/Chatbot";
import SEOManagement from "../components/seo/SEOManagement";
import DottedNeonProgress from "../loading_bar/LoadingBar";

const AppLayout = () => {
  return (
    <>
      <SEOManagement />
      {/* <DottedNeonProgress/> */}
      <Navbar />
       <Chatbot />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
