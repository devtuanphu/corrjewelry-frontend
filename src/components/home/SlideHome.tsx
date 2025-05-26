// SlideHome.tsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface SlideItem {
  id: number;
  alt: string;
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Props {
  slides: SlideItem[];
}

const SlideHome: React.FC<Props> = ({ slides }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {slides.map((slide) => {
          const imageUrl = slide.image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_URL_BE}${slide.image.data.attributes.url}`
            : "/fallback.jpg"; // fallback nếu ảnh lỗi

          return (
            <SwiperSlide key={slide.id}>
              <img
                src={imageUrl}
                alt={slide.alt || `slide-${slide.id}`}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideHome;
