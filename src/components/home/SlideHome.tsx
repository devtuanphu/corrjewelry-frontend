// SlideHome.tsx
"use client";
import React from "react";
import Image from "next/image";
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
        {slides?.map((slide, index) => {
          const imageUrl = slide.image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_URL_BE}${slide.image.data.attributes.url}`
            : "/fallback.jpg";

          return (
            <SwiperSlide key={slide.id}>
              {/* Aspect ratio container để tránh CLS */}
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={imageUrl}
                  alt={slide.alt || `slide-${slide.id}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYhEhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIREv/aAAwDAQACEQMRAD8AzW0023vLCG4n1G6jkkXqZFSIgH0cf9rZ0O0hO0QBdXJP1e7+0pVKT0cmo//Z"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideHome;

