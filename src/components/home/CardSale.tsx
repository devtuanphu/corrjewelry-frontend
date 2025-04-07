"use client";
import React, { useState } from "react";
import ProductDemo from "../../../public/images/product2.jpg";
import StartIcon from "../../../public/icon/start.svg";
import { quicksand, robotocondensed, robotosand } from "@/font";
import Image from "next/image";
import { Radio } from "antd";
import Link from "next/link";

const CardSale = () => {
  const [size, setSize] = useState("S");

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };

  return (
    <>
      <div className="relative z-20">
        <div className="absolute top-[10%] left-0 w-full h-[80%] bg-white rounded-[16px] shadow-md z-0" />
        <div className="absolute top-[5%] left-0 w-[98%] h-[90%] bg-white rounded-[16px] shadow-lg z-10" />
        <div className="relative z-20 bg-[#FFFFFF] p-8 rounded-[16px] left-0 w-[96%] shadow-xl">
          <div className="flex justify-end pb-4">
            <span
              className={`${quicksand.className} text-[#EB0000] text-[14px] font-semibold`}
            >
              Sale Off
            </span>
          </div>
          <div className="md:flex gap-12 items-start">
            <div className="w-full md:w-1/3 pb-4 md:0">
              <div className="h-full">
                <div className="relative aspect-[3/3] w-full">
                  <Image
                    src={ProductDemo}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-[72px] left-0 ">
                    <div className="bg-[#E1E1E1] rotate-[-90deg] origin-top-left">
                      <span
                        className={`text-[#383838] text-[14px] p-2 ${robotocondensed.className} font-semibold`}
                      >
                        PREMIUM
                      </span>
                    </div>
                  </div>
                  <div className="absolute  right-4 top-3">
                    <span
                      className={`${quicksand.className} font-bold text-[10px] text-[#ffffff] px-2 py-1 bg-[#BE0101] rounded-[4px]`}
                    >
                      Giảm 3%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <h5
                      className={`${robotosand.className} text-[#141414] font-bold text-[18px]`}
                    >
                      Lắc tay hạt charm
                    </h5>
                    <div
                      className={`${robotosand.className} flex gap-2 items-center`}
                    >
                      <h5 className="text-[#EB0000] text-[16px] font-medium">
                        699.000 đ
                      </h5>
                      <h5 className="text-[#595959] text-[12px] font-normal line-through">
                        800.000 đ
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${quicksand.className} flex gap-2 items-center`}
                  >
                    <span className="text-[12px] text-[#383838] font-medium">
                      4.8
                    </span>
                    <Image
                      src={StartIcon}
                      width={16}
                      height={16}
                      alt="Icon star"
                    />
                    <span className="text-[12px] text-[#383838] font-medium">
                      (24 lượt)
                    </span>
                  </div>
                </div>
                <div className="">
                  <Radio.Group
                    onChange={handleSizeChange}
                    value={size}
                    className="flex gap-2 mt-2"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button
                      value="S"
                      className={`!bg-[#F5F5F5] !text-[#000] !border-none !rounded-[2px] px-3 py-2 flex items-center justify-center 
                hover:!bg-[#e4e4e4] focus:!shadow-none !outline-none`}
                      style={{ borderRight: "none" }}
                    >
                      Size S
                    </Radio.Button>
                    <Radio.Button
                      value="M"
                      className={`!bg-[#F5F5F5] !text-black !border-none !rounded-[2px] px-3 py-2 flex items-center justify-center 
                hover:!bg-[#e4e4e4] focus:!shadow-none !outline-none`}
                    >
                      Size M
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div
                  className={`${quicksand.className} flex justify-between gap-4`}
                >
                  <Link
                    href="/san-pham/lac-tay"
                    className="w-full py-[12px] text-[#000000] bg-[#fff] rounded-[2px] text-center border border-solid border-[#000000]"
                  >
                    XEM CHI TIẾT
                  </Link>
                  <button className="w-full py-[12px] text-[#fff] bg-[#383838] rounded-[2px]">
                    MUA NGAY
                  </button>
                </div>
                <div
                  className={`flex ${quicksand.className} gap-1 items-center`}
                >
                  <h5 className="text-[12px] text-[#595959] font-normal">
                    Xem thêm bộ sưu tập:{" "}
                  </h5>
                  <Link
                    className="underline text-[12px] text-[#000] font-medium"
                    href=""
                  >
                    Lắc tay nữ
                  </Link>
                </div>
                <div>
                  <h5
                    className={`text-[#000000] text-[14px] font-semibold ${robotosand.className}`}
                  >
                    Bạc CORR – Thanh Lịch & Đẳng Cấp
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSale;
