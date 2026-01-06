import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import Chatbot from "../pages/home/Chatbot";
import SEOManagement from "../components/seo/SEOManagement";

const AppLayout = () => {
  return (
    <>
      <SEOManagement />
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
