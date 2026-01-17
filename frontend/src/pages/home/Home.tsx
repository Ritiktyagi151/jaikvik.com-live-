import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer"; // Scroll detection ke liye
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

// Ek wrapper component jo scroll hone par hi load karega
const LazySection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ek baar load hone ke baad wapis hide nahi hoga
    rootMargin: '200px 0px', // User pahuche usse 200px pehle hi load shuru kar dega
  });

  return (
    <div ref={ref} className="section-wrapper">
      {inView ? (
        <Suspense fallback={<div className="section-loading-placeholder" />}>
          {children}
        </Suspense>
      ) : (
        <div className="section-placeholder" />
      )}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <SEOManagement
        title="Jaikvik Technology India – Digital Marketing, SEO & Web Development"
        description="Jaikvik Technology India offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more."
        image="https://jaikvik.com/img/logo/og-image.jpg" 
        canonical="https://www.jaikvik.com/"
        keywords="Digital marketing, SEO Agency, Web development"
      />

      {/* Hero Section ko turant load hone dein (isko lazy wrapper mein mat daalein) */}
      <Suspense fallback={<div className="hero-placeholder" />}>
        <HeroSection />
      </Suspense>

      <div className="section-spacer" />

      {/* Baki sections tabhi load honge jab user scroll karega */}
      <LazySection><WebsiteSection /></LazySection>
      {/* <LazySection><OurTechnologies /></LazySection>
      <LazySection><SocialMediaSection /></LazySection>
      <LazySection><MobileAppSection /></LazySection>
      <LazySection><SocialMediaPostSection /></LazySection>
      <LazySection><OurVideosSection /></LazySection>
      <LazySection><GalleryImages /></LazySection>
      <LazySection><CorporateVideosSection /></LazySection>
      <LazySection><OurTestimonials /></LazySection>
      <LazySection><BlogsSection /></LazySection>
      <LazySection><OurServices /></LazySection>
      <LazySection><TeamVideoSlider /></LazySection>
      <LazySection><ReviewsSection /></LazySection>
      <LazySection><OurClients /></LazySection>
      <LazySection><EnquireSection /></LazySection>
      <LazySection><ChatBot /></LazySection> */}

      <style>{`
        .home-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          gap: 20px;
        }
        .section-wrapper {
          min-height: 200px; /* Placeholder height taaki scroll bar jump na kare */
        }
        .section-spacer {
          height: 20px;
        }
        .section-placeholder {
          height: 200px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home; 