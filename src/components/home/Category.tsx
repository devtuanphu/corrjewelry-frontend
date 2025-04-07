"use client";
import React from "react";
import ForCategory from "../../../public/images/forhim.jpg";
import Image from "next/image";
import { quicksand } from "@/font";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Category = () => {
  return (
    <>
      {/* <div className="container">
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="col-span-4">
              <div className="flex flex-col gap-4 group overflow-hidden">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={ForCategory}
                    alt="For Him"
                    className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h5
                  className={`underline text-center font-bold ${quicksand.className} text-[18px]`}
                >
                  FOR HER - NỮ
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="container">
        {" "}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            360: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {[...Array(3)].map((_, index) => (
            <SwiperSlide key={index}>
              <div key={index} className="col-span-4">
                <div className="flex flex-col gap-4 group overflow-hidden">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={ForCategory}
                      alt="For Him"
                      className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5
                    className={`underline text-center font-bold ${quicksand.className} text-[18px]`}
                  >
                    FOR HER - NỮ
                  </h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Category;
