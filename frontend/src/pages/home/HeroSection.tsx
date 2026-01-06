import React, { useRef, useEffect, useState } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Detect when video section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true); // Now load video
        }
      },
      { threshold: 0.2 }
    );

    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

  return (
    <section className="overflow-hidden w-full px-2.5">
      <div className="flex flex-wrap w-full justify-center">
        
        {/* LEFT IMAGES */}
        <div className="hidden lg:block w-full lg:w-1/4 px-4">
          <div className="flex justify-center items-center relative h-full">
            <img
              src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/new-cricle-image.webp"
              className="w-full animate-[spin_15s_linear_infinite]"
            />
            <img
              src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/rotate-3.webp"
              className="absolute w-[900px] mr-7 max-w-none"
            />
          </div>
        </div>

        {/* VIDEO */}
        <div className="w-full lg:w-3/4 px-4">
          <div className="w-full relative group">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              preload="none"
              poster="/images/herosection.webp"  
              className="w-full h-auto cursor-pointer rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            >
              {shouldLoadVideo && (
                <source
                  src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/video/jaikvik-corporate-film1.mp4"
                  type="video/mp4"
                />
              )}
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
