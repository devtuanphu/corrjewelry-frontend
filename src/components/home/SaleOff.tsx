"use client";
import React, { useEffect, useState } from "react";
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
import { io } from "socket.io-client";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
interface ItemOrderData {
  amount: number;
  san_pham: number;
  size: string;
  price: string;
  idCart: string;
}

interface OrderData {
  user: string;
  ID_order: string;
  date_order: string;
  status: string;
  items: ItemOrderData[];
  voucher?: number;
  finalAmount: number;
  price_not_reduced: number;
}
const socket = io(`${process.env.NEXT_PUBLIC_URL_BE}`);

const SaleOff = () => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [dataCountdown, setDataCountdown] = useState<any>(null);
  const [productSale, setProductSale] = useState<any>([]);
  const fetchDataCountDown = async () => {
    try {
      const data: any = await apiService.get(ENDPOINT.GET_SALE_COUNTDOWN);

      setDataCountdown(data?.data?.attributes); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  const fetchDataProductSale = async () => {
    try {
      const data: any = await apiService.get(
        `${ENDPOINT.GET_PRODUCT_DETAIL}?populate=size,images&filters[isSaleHome][$eq]=true`
      );

      setProductSale(data?.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  useEffect(() => {
    socket.on("countdown", (secondsLeft: number) => {
      const days = Math.floor(secondsLeft / (3600 * 24));
      const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    });

    return () => {
      socket.off("countdown");
    };
  }, []);

  useEffect(() => {
    fetchDataCountDown();
    fetchDataProductSale();
  }, []);

  return (
    <>
      <div className={`container ${robotosand.className}`}>
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-4">
            <div className="bg-[#141718] py-6 px-10">
              <div className="flex flex-col gap-4">
                {" "}
                <h5 className={` text-[#F9B0B0] font-bold uppercase`}>
                  {dataCountdown?.title}
                </h5>
                <h2 className="text-[34px] font-bold text-[#FEFEFE]">
                  {dataCountdown?.percentSale}% OFF
                </h2>
                <p className="text-[#FEFEFE] text-[14px]">
                  {dataCountdown?.subTitile}
                </p>
                <p className="text-[#FEFEFE] text-[14px]">
                  {dataCountdown?.description}
                </p>
                <div className="flex gap-4">
                  {[
                    countdown.days,
                    countdown.hours,
                    countdown.minutes,
                    countdown.seconds,
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="bg-[#FEFEFE] h-[60px] w-[60px] flex justify-center items-center"
                    >
                      <h5 className="text-[34px] font-medium text-[#141718]">
                        {value}
                      </h5>
                    </div>
                  ))}
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
                  {productSale &&
                    productSale?.map((item: any) => {
                      return (
                        <SwiperSlide className="!w-full !flex-none relative overflow-hidden">
                          <div className="w-full relative z-10">
                            <CardSale data={item} key={item.id} />
                          </div>
                        </SwiperSlide>
                      );
                    })}
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
