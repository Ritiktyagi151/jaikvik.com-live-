import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// 1. Inhe Direct rakhein kyunki ye sabse pehle dikhne chahiye (Above the fold)
import Navbar from "../common/navbar/Navbar";
import SEOManagement from "../components/seo/SEOManagement";

// 2. Inhe Lazy Load karein (Ye heavy ho sakte hain aur page ke neeche aate hain)
const Footer = lazy(() => import("../common/footer/Footer"));
const Chatbot = lazy(() => import("../pages/home/Chatbot"));

// Ek chhota loading spinner ya bar jo fallback mein dikhega
const PageLoader = () => (
  <div style={{ height: '5px', width: '100%', background: '#eee' }}>
     <div style={{ height: '100%', width: '30%', background: '#ff0000', animation: 'loading 2s infinite' }}></div>
  </div>
);

const AppLayout = () => {
  return (
    <>
      <SEOManagement />
      
      {/* Navbar turant dikhega */}
      <Navbar />

      <main>
        {/* Suspense un components ka intezaar karega jo load ho rahe hain */}
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer aur Chatbot background mein load honge */}
      <Suspense fallback={null}>
        <Chatbot />
        <Footer />
      </Suspense>
    </>
  );
};

export default AppLayout;