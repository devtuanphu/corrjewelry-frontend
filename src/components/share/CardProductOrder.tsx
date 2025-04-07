"use client";
import React, { useState } from "react";
import DemoImage from "../../../public/images/product-detail.jpg";
import Image from "next/image";
import { robotocondensed, quicksand } from "@/font";

const CardProductOrder = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent going below 1
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div>
          <Image
            src={DemoImage}
            alt="Sản phẩm"
            className="w-[120px] h-[140px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-[16px] font-bold text-[#000000]">
            Lắc tay bi bạc cỏ bốn lá{" "}
          </h5>
          <span className="text-[14px] font-medium text-[#000000]">
            Sterling Silver | M
          </span>
          <span className="text-[#000000] text-[16px] font-semibold">
            1.100.000 đ
          </span>
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
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span
          className={`${robotocondensed.className} text-[12px] bg-[#EBEBEB] p-2 font-medium`}
        >
          PREMIUM
        </span>
        <button
          className={`${quicksand.className} text-[14px] font-bold text-[#DA0000]`}
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default CardProductOrder;
