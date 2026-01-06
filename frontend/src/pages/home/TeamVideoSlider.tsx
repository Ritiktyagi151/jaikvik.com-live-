import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react";
import axios from "axios"; // Axios import kiya
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";

// ✅ API configuration environment variable se
const API_URL = `${import.meta.env.VITE_API_URL}/team-videos`;

const TeamVideoSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    video: string;
    poster: string;
  } | null>(null);

  // ✅ States for API Data
  const [teamVideosList, setTeamVideosList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data logic
  useEffect(() => {
    const fetchTeamVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        // Checking for success property as per your backend standard
        if (response.data.success) {
          setTeamVideosList(response.data.data);
        } else {
          setTeamVideosList(response.data); // Fallback if direct array
        }
      } catch (error) {
        console.error("Team videos fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamVideos();
  }, []);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  // Loading indicator (optional, keeps UI clean)
  if (loading && teamVideosList.length === 0) {
    return <div className="h-40 flex items-center justify-center text-white animate-pulse">Loading Team Videos...</div>;
  }

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Meet Our Team
          </a>
        </h2>
      </div>

      {/* Swiper */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={teamVideosList.length > 4} // Loop tabhi jab sufficient items hon
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper !overflow-visible"
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 },
          }}
        >
          {teamVideosList.map((item, index) => (
            <SwiperSlide key={item._id || index} className="hover:z-50">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setSelectedVideo(item);
                  }
                }}
              >
                <ReelVideoCard
                  src={item.video}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-125"
                  poster={item.poster}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* Fullscreen Overlay for Mobile */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          <button
            className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedVideo(null)}
          >
            <BackIcon size={24} />
          </button>

          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={26} />
          </button>

          <video
            src={selectedVideo.video}
            poster={selectedVideo.poster}
            controls
            autoPlay
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TeamVideoSlider; 