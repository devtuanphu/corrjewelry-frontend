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
import Link from "next/link";
interface PropsCategory {
  dataNam: any;
  dataNu: any;
  dataUnisex: any;
}

const Category: React.FC<PropsCategory> = ({ dataNam, dataNu, dataUnisex }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  const combinedData = [
    { category: "Nam", data: dataNam, slug: "nam" },
    { category: "Nữ", data: dataNu, slug: "nu" },
    { category: "Unisex", data: dataUnisex, slug: "unisex" },
  ];

  return (
    <>
      <div className="container">
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
          {combinedData?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.slug}>
                <div className="col-span-4">
                  <div className="flex flex-col gap-4 group overflow-hidden">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={`${baseUrl}${item?.data?.thumbnail?.data?.attributes?.url}`}
                        alt={item?.category}
                        width={2000}
                        height={2000}
                        className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </div>
                    <h5
                      className={`underline text-center font-bold ${quicksand.className} text-[18px]`}
                    >
                      {item?.category || "Default Category"}
                    </h5>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Category;
