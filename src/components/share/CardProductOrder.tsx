"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { robotocondensed, quicksand } from "@/font";
import { updateCartItemQuantity, removeFromCart } from "@/utils/button";
interface CardProductOrderProps {
  data: any;
  onRemove?: any;
  onUpdateQuantity?: any;
  enableChangeQuanity: boolean;
}

const CardProductOrder: React.FC<CardProductOrderProps> = ({
  data,
  onRemove,
  onUpdateQuantity,
  enableChangeQuanity,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    // Đảm bảo chỉ chạy ở phía client
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []); // Mảng phụ thuộc rỗng để chỉ chạy khi component mount

  const [quantity, setQuantity] = useState<number>(data?.amount || 1);

  const selectedSize = data?.size;
  const selectedSizeObj = data?.san_pham.size
    ? data?.san_pham.size.find((item: any) => item.size === selectedSize)
    : data?.san_pham?.data?.attributes?.size.find(
        (item: any) => item.size === selectedSize
      );

  const handleIncrease = async () => {
    try {
      setQuantity((prevQuantity) => prevQuantity + 1); // Tăng số lượng trên giao diện
      await updateCartItemQuantity(userId, data.idCart, "increase"); // Gọi API để tăng số lượng trong server
      onUpdateQuantity(data.idCart, quantity + 1); // Gọi callback từ component cha để cập nhật giỏ hàng
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm:", error);
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      try {
        setQuantity((prevQuantity) => prevQuantity - 1); // Giảm số lượng trên giao diện
        await updateCartItemQuantity(userId, data.idCart, "decrease"); // Gọi API để giảm số lượng trong server
        onUpdateQuantity(data.idCart, quantity - 1); // Gọi callback từ component cha để cập nhật giỏ hàng
      } catch (error) {
        console.error("Lỗi khi giảm số lượng sản phẩm:", error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(userId, data.idCart); // Gọi API để xóa sản phẩm khỏi giỏ hàng
      onRemove(data.idCart); // Thông báo cho component cha để xóa sản phẩm khỏi UI
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const image = data?.san_pham?.data
    ? baseUrl +
      data?.san_pham?.data?.attributes?.images?.data[0]?.attributes?.url
    : baseUrl + data?.san_pham?.images[0]?.url;

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div>
          <Image
            src={image}
            alt="Sản phẩm"
            width={120}
            height={140}
            className="w-[120px] h-[140px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-[16px] font-bold text-[#000000]">
            {data?.san_pham?.title
              ? data?.san_pham?.title
              : data?.san_pham?.data?.attributes?.title}
          </h5>
          <span className="text-[14px] font-medium text-[#000000]">
            {data?.san_pham?.tag
              ? data?.san_pham?.tag
              : data?.san_pham?.data?.attributes.tag}
             | {data?.size}
          </span>
          <span className="text-[#000000] text-[16px] font-semibold">
            <span className="text-[#000000] text-[16px] font-semibold">
              {new Intl.NumberFormat("vi-VN").format(data?.price ?? 0)} đ
            </span>
          </span>
          <div className="flex items-center ">
            {" "}
            <button
              disabled={!enableChangeQuanity}
              onClick={handleDecrease}
              className="w-[36px] h-[36px] flex justify-center items-center border border-solid transition-colors duration-300 disabled:bg-[#E0E0E0] disabled:cursor-not-allowed disabled:border-[#D1D1D1] disabled:text-[#A0A0A0] hover:bg-gray-200"
            >
              <span className="text-[#383838] text-[20px]">-</span>
            </button>
            <input
              readOnly={!enableChangeQuanity}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-[40px] h-[36px] text-center focus:outline-none bg-inherit"
              min="1"
            />{" "}
            <button
              disabled={!enableChangeQuanity}
              onClick={handleIncrease}
              className="w-[36px] h-[36px] flex justify-center items-center border border-solid transition-colors duration-300 disabled:bg-[#E0E0E0] disabled:cursor-not-allowed disabled:border-[#D1D1D1] disabled:text-[#A0A0A0] hover:bg-gray-200"
            >
              <span className="text-[#383838] text-[20px]">+</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {data?.san_pham?.data?.attributes?.isPrenium ||
        data?.san_pham?.isPrenium ? (
          <span
            className={`${robotocondensed.className} text-[12px] bg-[#EBEBEB] p-2 font-medium`}
          >
            PREMIUM
          </span>
        ) : null}{" "}
        {/* Trả về null nếu không có PREMIUM */}
        {enableChangeQuanity ? (
          <button
            onClick={handleRemove}
            className={`${quicksand.className} text-[14px] font-bold text-[#DA0000]`}
          >
            Xoá
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardProductOrder;
