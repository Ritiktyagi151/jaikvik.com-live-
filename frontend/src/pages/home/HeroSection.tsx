import React, { useRef, useEffect } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero Section hamesha screen par hota hai, isliye turant load hona chahiye
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="overflow-hidden w-full px-2.5">
      <div className="flex flex-wrap w-full justify-center">
        
        {/* LEFT IMAGES - Priority Loading */}
        <div className="hidden lg:block w-full lg:w-1/4 px-4">
          <div className="flex justify-center items-center relative h-full">
            <img
              src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/new-cricle-image.webp"
              className="w-full animate-[spin_15s_linear_infinite]"
              loading="eager" // Turant load karne ke liye
              fetchPriority="high"
              alt="Circle Decor"
            />
            <img
              src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/rotate-3.webp"
              className="absolute w-[900px] mr-7 max-w-none"
              loading="eager"
              fetchPriority="high"
              alt="Rotate Decor"
            />
          </div>
        </div>

        {/* VIDEO - High Priority */}
        <div className="w-full lg:w-3/4 px-4">
          <div className="w-full relative group">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline // Mobile autoplay ke liye zaroori
              loop
              preload="auto" // Hero section ke liye "auto" best hai taaki turant dikhe
              poster="/images/herosection.webp"  
              className="w-full h-auto cursor-pointer rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            >
              <source
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/video/jaikvik-corporate-film1.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;