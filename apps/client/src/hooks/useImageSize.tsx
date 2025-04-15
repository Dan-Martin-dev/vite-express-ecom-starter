import { useEffect, useState } from "react";

const useImageSize = (): "small" | "medium" => {
  const [imageSize, setImageSize] = useState<"small" | "medium">("small");

  useEffect(() => {
    const handleResize = () => {
      setImageSize(window.innerWidth >= 768 ? "medium" : "small");
    };

    handleResize(); // Set initial image size

    return () => {
       window.removeEventListener("resize", handleResize);
    };
  }, []);

  return imageSize;
};

export default useImageSize;
