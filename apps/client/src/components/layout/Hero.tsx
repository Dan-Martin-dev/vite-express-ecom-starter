import { useState } from "react";
import useImageSize from "@/hooks/useImageSize";
import useCarousel from "@/hooks/useCarousel";
import hero1 from "@/assets/frontend_assets/hero_1.webp"
import hero2 from "@/assets/frontend_assets/hero_2.webp"
import herosmart1 from "@/assets/frontend_assets/hero_smart_1.webp"

const images = {
  small: [
    herosmart1,
  ],
  medium: [
    hero1,
hero2
  ],
};

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const imageSize = useImageSize();
  const { currentIndex, handleNext, handlePrevious } = useCarousel(
    images[imageSize],
    5000
  );
  const imageArray = images[imageSize];

  return (
    <div className="relative w-full h-full">
      <div
        className={`relative w-full transition-opacity duration-2000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <img
            alt=""
            className="w-full h-auto transition-all duration-500 ease-in-out object-cover"
            src={imageArray[currentIndex]}
            onLoad={() => {
              setVisible(true);
            }}
            onError={() => {
              console.error("Failed to load image:", imageArray[currentIndex]);
            }}
          />
        </div>
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            className="w-8 h-8 text-white text-4xl flex items-center justify-center transition"
            onClick={handlePrevious}
          >
            &#8249;
          </button>
          <button
            className="w-8 h-8 text-white text-4xl flex items-center justify-center transition"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
