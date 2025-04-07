import React from "react";
import BlogDemo from "../../../public/images/blogdemo.jpg";
import Image from "next/image";
import { robotosand, quicksand } from "@/font";
import Link from "next/link";
const CartBlog = () => {
  return (
    <>
      <Link href="/blog/tin-tuc">
        {" "}
        <div className="flex flex-col gap-4">
          <Image src={BlogDemo} alt="Tin tức" className="w-full" />
          <div
            className={`flex gap-4 ${robotosand.className} text-[16px] font-medium text-[#4C4C4C]`}
          >
            <span>By John Doe</span>
            <span>l</span>
            <span>Aug 23, 2021</span>
          </div>
          <h2
            className={`${robotosand.className} text-[18px] font-semibold text-[#2A2A2A]`}
          >
            Vì Sao Trang Sức Bạc Luôn Được Yêu Thích?
          </h2>
          <p
            className={`${quicksand.className} text-[16px] font-medium text-[#2A2A2A]`}
          >
            Trang sức bạc không chỉ là món phụ kiện lấp lánh mà còn mang nhiều ý
            nghĩa đặc biệt. Với thiết kế tinh tế, dễ phối đồ và giá cả phải
            chăng, ...
          </p>
        </div>
      </Link>
    </>
  );
};

export default CartBlog;
