"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CartProduct from "../share/CartProduct";
import { Pagination, Navigation } from "swiper/modules";
import IconLeft from "../../../public/icon/chevron-right.svg";
import IconRight from "../../../public/icon/chevron-right (1).svg";
import Image from "next/image";
import { quicksand } from "@/font";
import Link from "next/link";
interface NewArrivalCollectionProps {
  product: any;
}

const NewArrivalCollection: React.FC<NewArrivalCollectionProps> = ({
  product,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleSwiperProgress = (swiper: any) => {
    if (progressRef.current) {
      const progress = swiper.progress; // value từ 0 đến 1
      progressRef.current.style.width = `${progress * 100}%`;
    }
  };

  return (
    <div className="container">
      <div className="">
        <div className="flex items-center justify-between m-3 gap-4 flex-nowrap">
          <div className="relative w-full h-[2px] bg-[#C1C1C1] overflow-hidden rounded">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-[#383838] transition-all duration-300"
              style={{ width: "0%" }}
            ></div>
          </div>
          <button className="custom-prev">
            <div className=" w-[40px] h-[40px] flex justify-center items-center border border-solid border-[#C1C1C1] rounded-full">
              <Image src={IconLeft} width={24} height={24} alt="icon left" />
            </div>
          </button>
          <button className="custom-next ">
            {" "}
            <div className=" w-[40px] h-[40px] flex justify-center items-center border border-solid border-[#C1C1C1] rounded-full">
              <Image src={IconRight} width={24} height={24} alt="icon left" />
            </div>
          </button>

          <Link
            href=""
            className={`${quicksand.className} font-semibold text-[14px] whitespace-nowrap`}
          >
            Xem tất cả
          </Link>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          onSlideChange={handleSwiperProgress}
          onProgress={handleSwiperProgress}
          onInit={handleSwiperProgress}
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
          {product?.data?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <CartProduct data={item?.attributes} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivalCollection;
