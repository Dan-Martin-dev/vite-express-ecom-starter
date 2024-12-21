import { Link } from "react-router-dom";
import heroSecond2 from "@/assets/frontend_assets/heroSecond2.webp";
import heroSecond1 from "@/assets/frontend_assets/heroSecond1.webp";

const HeroSecond = () => {

  return (
    <div className="w-full relative">

      {/* Container for both images (only shows on md and larger screens) */}
      <div
        className="hidden md:flex w-full h-full"
      >
        {/* Image 1 */}
        <div className="w-1/2 h-full overflow-hidden relative">
          <img
            src={heroSecond1} // Replace with your image path
            alt="Image 1"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />

          {/* Text at the bottom of the first image */}
          <div className="absolute bottom-10 left-0 w-full text-left ml-4">
            <h1 className="text-white font-normal text-7xl lg:text-9xl">
              Hoodies
            </h1>
            <div className="text-left mt-2 lg:ml-2">
              <Link to={"/"} className="text-white text-md underline">
                New drop
              </Link>
            </div>
          </div>
          
        </div>

        {/* Image 2 */}
        <div className="w-1/2 h-full overflow-hidden relative">
          <img
            src={heroSecond2} // Replace with your image path
            alt="Image 2"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          {/* Text at the bottom of the second image */}
          <div className="absolute bottom-10 left-0 w-full text-left ml-4">
            <h1 className="text-white font-normal text-7xl lg:text-9xl">
              Hoodies
            </h1>
            <div className="text-left mt-2 lg:ml-2">
              <Link to={"/"} className="text-white text-md underline">
                New drop
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Two stacked images view (only shows on small screens) */}
      <div
        className="block md:hidden w-full overflow-hidden"
      >
        {/* Image 1 (Top Image) */}
        <div className="w-full h-[25rem] sm:h-[50rem] overflow-hidden relative">
          <img
            src={heroSecond1} // Replace with your image path
            alt="Image 1"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          {/* Text at the bottom of the first image */}
          <div className="absolute bottom-10 left-0 w-full text-left ml-4">
            <h1 className="text-white text-7xl font-medium">Hoodies</h1>
            <div className="text-left mt-2">
              <Link to={"/"} className="text-white text-lg underline">
                New drop
              </Link>
            </div>
          </div>
        </div>

        {/* Image 2 (Bottom Image) */}
        <div className="w-full h-[25rem] sm:h-[50rem] overflow-hidden relative">
          <img
            src={heroSecond2} // Replace with your image path
            alt="Image 2"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          {/* Text at the bottom of the second image */}
          <div className="absolute bottom-10 left-0 w-full text-left ml-4">
            <h1 className="text-white text-7xl font-medium">Hoodies</h1>
            <div className="text-left mt-2">
              <Link to={"/"} className="text-white text-lg underline">
                New drop
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSecond;
