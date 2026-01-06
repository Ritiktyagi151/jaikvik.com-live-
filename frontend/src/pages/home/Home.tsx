import React, { lazy, Suspense } from "react";
import SEOManagement from "../../components/seo/SEOManagement";

// Lazy load all sections
const HeroSection = lazy(() => import("./HeroSection"));
const WebsiteSection = lazy(() => import("./WebsiteSection"));
const SocialMediaSection = lazy(() => import("./SocialMediaSection"));
const SocialMediaPostSection = lazy(() => import("./SocialMediaPostSection"));
const ReviewsSection = lazy(() => import("./ReviewsSection"));
const OurClients = lazy(() => import("./OurClients"));
const EnquireSection = lazy(() => import("./EnquireSection"));
const OurVideosSection = lazy(() => import("./OurVideosSection"));
const GalleryImages = lazy(() => import("./GalleryImages"));
const BlogsSection = lazy(() => import("./BlogsSection"));
const OurTestimonials = lazy(() => import("./OurTestimonials"));
const OurServices = lazy(() => import("./OurSerives"));
const CorporateVideosSection = lazy(() => import("./CorporateVideosSection"));
const OurTechnologies = lazy(() => import("./OurTechnologies"));
const MobileAppSection = lazy(() => import("./MobileAppSection"));
const TeamVideoSlider = lazy(() => import("./TeamVideoSlider"));
const ChatBot = lazy(() => import("./Chatbot"));

const Home: React.FC = () => {
  return (
    <div className="home-container">
       <SEOManagement
        title="Jaikvik Technology India – Digital Marketing, SEO & Web Development"
        description=" Jaikvik Technology India offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth."
        image="https://jaikvik.com/img/logo/og-image.jpg" 
        canonical="https://www.jaikvik.com/"
        keywords="Digital marketing agency in india,Digital Marketing,Digital Marketing Services,Digital Marketing Agency,Digital Marketing Company,SEO Agency in India,Best SEO Company,SEO Services in India,Best SEO Services,Search Engine Optimisation,Seo Agency Near Me,Web development Company,Website Development Companies,Website Development Company,Website development"
      />

      {[
        HeroSection,
        WebsiteSection,
        OurTechnologies,
        SocialMediaSection,
        MobileAppSection,
        SocialMediaPostSection,
        OurVideosSection,
        GalleryImages,
        CorporateVideosSection,
        OurTestimonials,
        BlogsSection,
        OurServices,
        TeamVideoSlider,
        ReviewsSection,
        OurClients,
        EnquireSection,
        ChatBot,
      ].map((Component, index) => (
        <React.Fragment key={index}>
          <Suspense fallback={<div></div>}>
            <Component />
          </Suspense>
          <div className="section-spacer" />
        </React.Fragment>
      ))}

      <style>{`
        .home-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          gap: 20px;
        }
        .section-spacer {
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
