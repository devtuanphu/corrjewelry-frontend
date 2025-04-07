"use client";
import React, { useState } from "react";
import { quicksand, robotosand } from "@/font";
import { HeartOutlined } from "@ant-design/icons";
import StartIcon from "../../../public/icon/start.svg";
import Image from "next/image";
import { Radio } from "antd";
import Link from "next/link";
const ProductDetail = () => {
  const [size, setSize] = useState("S");

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent going below 1
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span
            className={`${quicksand.className} text-[14px] font-semibold text-[#ffffff] bg-[#BE0101] p-1 rounded-[4px]`}
          >
            Giảm 30%
          </span>
          <div>
            <HeartOutlined className="text-[24px]" />
          </div>
        </div>
        <div className={`${robotosand.className} flex items-center gap-4`}>
          <h2 className="text-[24px] font-bold text-[#141414]">
            Lắc tay cỏ bốn lá
          </h2>
          <span className="font-[14px] text-[#141414] bg-[#EBEBEB] p-1">
            Nữ
          </span>
        </div>
        <div className={`${quicksand.className} flex gap-2 items-center`}>
          <span className="text-[12px] text-[#383838] font-medium">4.8</span>
          <Image src={StartIcon} width={16} height={16} alt="Icon star" />
          <span className="text-[12px] text-[#383838] font-medium">
            (24 lượt)
          </span>
        </div>
        <div>
          <h5
            className={`${quicksand.className} flex gap-2 items-center text-[#546881] text-[14px] font-medium`}
          >
            Phong cách:{" "}
            <span className="text-[#1D242D]">Cuốn hút, thanh lịch</span>
          </h5>
        </div>
        <div className="">
          <Radio.Group
            onChange={handleSizeChange}
            value={size}
            className="flex gap-4 mt-2"
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
        <div className={`${robotosand.className} flex gap-2 items-center`}>
          <h5 className="text-[#EB0000] text-[16px] font-medium">699.000 đ</h5>
          <h5 className="text-[#595959] text-[12px] font-normal line-through">
            800.000 đ
          </h5>
        </div>
        <div className="flex items-center ">
          {" "}
          <button
            onClick={handleDecrease}
            className="w-[36px] h-[36px] flex justify-center items-center border border-solid border-[#C1C1C1]  hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="text-[#383838] text-[20px]">-</span>
          </button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-[40px] h-[36px] text-center focus:outline-none bg-inherit"
            min="1"
          />{" "}
          <button
            onClick={handleIncrease}
            className="w-[36px] h-[36px] flex justify-center items-center border border-solid border-[#C1C1C1]  hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="text-[#383838] text-[20px]">+</span>
          </button>
        </div>
        <div className="flex">
          <div className="w-full md:w-[70%]">
            {" "}
            <div
              className={`${quicksand.className} flex justify-between gap-4`}
            >
              <button className="w-full py-[12px] text-[#000000] bg-[#fff] rounded-[2px] border border-solid border-[#000000]">
                THÊM VÀO GIỎ HÀNG
              </button>
              <button className="w-full py-[12px] text-[#fff] bg-[#383838] rounded-[2px]">
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className={`${quicksand.className} text-[14px] text-[#595959]`}>
            Xem thêm bộ sưu tập:{" "}
            <span className="text-[#000000] font-medium">
              <Link href="/tat-ca-san-pham">Lắc tay nữ</Link>
            </span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
