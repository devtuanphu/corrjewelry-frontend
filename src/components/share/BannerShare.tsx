"use client";
import React from "react";
import Image from "next/image";
import BannerShareImage from "../../../public/images/banner-share.png";
import { robotosand, quicksand } from "@/font";
import Breadcrumb from "./Breadcrumb"; // Đảm bảo đường dẫn đúng

interface Path {
  label: string;
  link: string;
}

interface BannerShareProps {
  paths: Path[]; // Định nghĩa kiểu cho prop paths
}

const BannerShare: React.FC<BannerShareProps> = ({ paths }) => {
  return (
    <div className="relative">
      <div className="absolute top-[2%] left-[255px]">
        <Breadcrumb paths={paths} />
      </div>

      {/* Banner Image */}
      <Image src={BannerShareImage} alt="Tất cả sản phẩm" className="w-full" />

      {/* Text Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2
          className={`${robotosand.className} text-[36px] font-semibold text-[#ffffff]`}
        >
          TRANG SỨC NỮ
        </h2>
        <h5
          className={`${quicksand.className} text-[#F5F5F5] font-medium text-[20px]`}
        >
          Kiêu Hãnh Tỏa Sáng, Ghi Dấu Phong Cách
        </h5>
      </div>
    </div>
  );
};

export default BannerShare;
