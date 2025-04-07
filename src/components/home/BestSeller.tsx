"use client";
import React, { useState } from "react";
import Image from "next/image";
import BestSellerImage from "../../../public/images/bestseller.jpg";
import CartProduct from "../share/CartProduct";
import { quicksand, worksand } from "@/font";
import IconLeft from "../../../public/icon/chevron-right.svg";
import IconRight from "../../../public/icon/chevron-right (1).svg";
const TABS = ["Women", "Men", "Unisex"];
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const BestSeller = () => {
  const [activeTab, setActiveTab] = useState(0); // Default chọn Men

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % TABS.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + TABS.length) % TABS.length);
  };
  const getProductsForTab = (tabIndex: number) => {
    return [1, 2, 3, 4]; // Luôn trả về 4 sản phẩm mô phỏng
  };
  return (
    <div className="container">
      {/* Dùng flex để 2 cột cao bằng nhau */}
      <div className="flex gap-8 items-stretch">
        {/* Cột ảnh */}
        <div className="w-5/12 hidden md:block">
          <Image
            src={BestSellerImage}
            alt="Best seller"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Cột nội dung */}
        <div className="w-12/12 md:w-7/12 flex flex-col">
          {/* Header */}
          <div className="flex-col md:flex-row flex justify-between items-center pb-4 border-b-2 border-solid border-[#ECECEC]">
            <h3 className={`${worksand.className} text-[18px] font-bold`}>
              BESTSELLER PRODUCTS
            </h3>
            <ul className={`${quicksand.className} text-[16px] flex gap-12`}>
              {TABS.map((tab, index) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`cursor-pointer ${
                    activeTab === index ? "underline font-extrabold" : ""
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="md:flex gap-4 hidden ">
              <button onClick={handlePrev} className="custom-prev">
                <div className="w-[40px] h-[40px] flex justify-center items-center border border-solid border-[#C1C1C1] rounded-full">
                  <Image
                    src={IconLeft}
                    width={24}
                    height={24}
                    alt="icon left"
                  />
                </div>
              </button>
              <button onClick={handleNext} className="custom-next">
                <div className="w-[40px] h-[40px] flex justify-center items-center border border-solid border-[#C1C1C1] rounded-full">
                  <Image
                    src={IconRight}
                    width={24}
                    height={24}
                    alt="icon right"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Content panel */}
          <div className="grid grid-cols-2 gap-2 mdgap-12 pt-8 flex-1  ">
            {getProductsForTab(activeTab).map((_, index) => (
              <CartProduct key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
