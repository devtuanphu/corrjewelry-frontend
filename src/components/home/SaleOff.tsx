"use client";
import React from "react";
import { worksand, robotosand } from "@/font";
import Link from "next/link";
import CardSale from "./CardSale";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import IconRight from "../../../public/icon/chevron-down.svg";
import IconLeft from "../../../public/icon/chevron-down (1).svg";
import Image from "next/image";

const SaleOff = () => {
  return (
    <>
      <div className={`container ${robotosand.className}`}>
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-4">
            <div className="bg-[#141718] py-6 px-10">
              <div className="flex flex-col gap-4">
                {" "}
                <h5 className={` text-[#F9B0B0] font-bold uppercase`}>
                  Limited edition
                </h5>
                <h2 className="text-[34px] font-bold text-[#FEFEFE]">
                  30% OFF
                </h2>
                <p className="text-[#FEFEFE] text-[14px]">
                  Ưu đãi có hạn – Săn sale ngay kẻo lỡ!
                </p>
                <p className="text-[#FEFEFE] text-[14px]">
                  Đếm ngược cuối cùng
                </p>
                <div className="flex gap-4">
                  <div className="bg-[#FEFEFE] h-[60px] w-[60px] flex justify-center items-center">
                    <h5 className="text-[34px] font-medium text-[#141718]">
                      02
                    </h5>
                  </div>
                  <div className="bg-[#FEFEFE] h-[60px] w-[60px] flex justify-center items-center">
                    <h5 className="text-[34px] font-medium text-[#141718]">
                      02
                    </h5>
                  </div>
                  <div className="bg-[#FEFEFE] h-[60px] w-[60px] flex justify-center items-center">
                    <h5 className="text-[34px] font-medium text-[#141718]">
                      02
                    </h5>
                  </div>
                  <div className="bg-[#FEFEFE] h-[60px] w-[60px] flex justify-center items-center">
                    <h5 className="text-[34px] font-medium text-[#141718]">
                      02
                    </h5>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href="/tat-ca-san-pham"
                    className="bg-[#FFFFFF] text-[#141718] text-[14px] py-2 px-8 rounded-[2px]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="flex gap-8">
              <button className="hidden md:block swiper-button-prev-custom cursor-pointer ">
                <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#383838] rounded-full">
                  {" "}
                  <Image src={IconRight} width={24} height={24} alt="icon" />
                </div>
              </button>
              <div className="!w-full">
                <Swiper
                  navigation={{
                    prevEl: ".swiper-button-prev-custom",
                    nextEl: ".swiper-button-next-custom",
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide className="!w-full !flex-none relative overflow-hidden">
                    <div className="w-full relative z-10">
                      <CardSale />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="!w-full !flex-none relative overflow-hidden">
                    <div className="w-full relative z-10">
                      <CardSale />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <button className=" hidden md:block swiper-button-next-custom cursor-pointer ">
                <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#383838] rounded-full">
                  <Image src={IconLeft} width={24} height={24} alt="icon" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleOff;
