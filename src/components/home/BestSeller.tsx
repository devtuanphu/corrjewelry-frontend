"use client";
import React, { useState } from "react";
import Image from "next/image";
import { quicksand, worksand } from "@/font";
import IconLeft from "../../../public/icon/chevron-right.svg";
import IconRight from "../../../public/icon/chevron-right (1).svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import CartProduct from "../share/CartProduct"; // Import your CartProduct component

const TABS = ["Nam", "Nữ", "Unisex"];

interface PropsBestSeller {
  img_bestseller: any;
  data: any;
}

const BestSeller: React.FC<PropsBestSeller> = ({ img_bestseller, data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const [activeTab, setActiveTab] = useState(0); // Default chọn Nam
  console.log(data);

  // Hàm xử lý tab chuyển đổi
  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % TABS.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + TABS.length) % TABS.length);
  };

  // Lọc dữ liệu sản phẩm theo tab hiện tại
  const filteredData = data?.filter((item: any) => {
    const tag = item?.attributes?.tag;
    if (activeTab === 0) return tag === "Nam"; // Nếu tab là Nam, chỉ lấy sản phẩm Nam
    if (activeTab === 1) return tag === "Nữ"; // Nếu tab là Nữ, chỉ lấy sản phẩm Nữ
    if (activeTab === 2) return tag === "Unisex"; // Nếu tab là Unisex, chỉ lấy sản phẩm Unisex
    return true;
  });

  return (
    <div className="container">
      {/* Dùng flex để 2 cột cao bằng nhau */}
      <div className=" gap-8 items-stretch  hidden md:flex">
        {/* Cột ảnh */}
        <div className="w-5/12">
          <Image
            src={`${baseUrl}${img_bestseller}`}
            alt="Best seller"
            width={2000}
            height={2000}
            className="w-full h-full object-cover rounded"
            priority
          />
        </div>

        <div className="w-12/12 md:w-7/12 flex flex-col">
          <div className="flex-col md:flex-row flex justify-between items-center pb-4 border-b-2 border-solid border-[#ECECEC]">
            <h3 className={`${worksand.className} text-[18px] font-bold `}>
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
            <div className="md:flex gap-4 hidden">
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

          <div className="grid grid-cols-2 gap-2 mdgap-12 pt-8 flex-1">
            {filteredData?.map((item: any) => (
              <CartProduct key={item.id} data={item?.attributes} />
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex-col md:flex-row flex justify-between items-center pb-4 border-b-2 border-solid border-[#ECECEC]">
          <h3 className={`${worksand.className} text-[18px] font-bold `}>
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
          <div className="md:flex gap-4 hidden">
            <button onClick={handlePrev} className="custom-prev">
              <div className="w-[40px] h-[40px] flex justify-center items-center border border-solid border-[#C1C1C1] rounded-full">
                <Image src={IconLeft} width={24} height={24} alt="icon left" />
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
        <div className="grid grid-cols-2 gap-2 mdgap-12 pt-8 flex-1">
          {filteredData?.map((item: any) => (
            <CartProduct key={item.id} data={item?.attributes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
