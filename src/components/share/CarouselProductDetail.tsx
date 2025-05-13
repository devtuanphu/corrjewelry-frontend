"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProductDetailProps {
  images: any;
}

const IMAGE_HEIGHT = 400;
const THUMB_HEIGHT = IMAGE_HEIGHT / 3;
const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

const CarouselProductDetail: React.FC<CarouselProductDetailProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleSelectImage = (index: number) => {
    if (index !== selectedImage) {
      setDirection(index > selectedImage ? 1 : -1);
      setSelectedImage(index);
    }
  };

  const handleSwipe = (dir: "LEFT" | "RIGHT") => {
    if (dir === "LEFT") {
      setDirection(1);
      setSelectedImage((prev) => (prev + 1) % images.length);
    } else if (dir === "RIGHT") {
      setDirection(-1);
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="flex max-w-4xl mx-auto">
      {/* Thumbnails */}
      <div
        className="hidden mr-4 overflow-y-auto md:flex flex-col gap-2 scrollbar-hide"
        style={{ height: `${IMAGE_HEIGHT}px`, width: "100px" }}
      >
        {images.map((img: any, index: any) => (
          <div
            key={index}
            onClick={() => handleSelectImage(index)}
            className={`relative rounded-lg cursor-pointer border-2 transition-all duration-200 ${
              selectedImage === index ? "border-blue-500" : "border-transparent"
            }`}
            style={{
              height: `${THUMB_HEIGHT}px`,
              minHeight: `${THUMB_HEIGHT}px`,
              maxHeight: `${THUMB_HEIGHT}px`,
              flexShrink: 0,
              width: "100%",
            }}
          >
            <Image
              src={baseUrl + img?.attributes?.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main image with swipe + animation */}
      <div className="flex-1">
        <div
          {...handlers}
          className="relative w-full rounded-xl overflow-hidden shadow-md"
          style={{ height: `${IMAGE_HEIGHT}px` }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedImage}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img
                src={baseUrl + images[selectedImage]?.attributes?.url} // Đảm bảo lấy đúng URL từ dữ liệu API
                alt={`Product ${selectedImage + 1}`}
                className="object-cover rounded-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CarouselProductDetail;
