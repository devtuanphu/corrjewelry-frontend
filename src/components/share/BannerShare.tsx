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
  avatar?: string;
  title?: string;
  description?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

const BannerShare: React.FC<BannerShareProps> = ({
  paths,
  avatar,
  title,
  description,
}) => {
  return (
    <div className="relative">
      <div className="absolute top-[2%] left-[3rem]">
        <Breadcrumb paths={paths} />
      </div>

      {/* Banner Image */}
      <Image
        src={baseUrl + avatar}
        width={1920}
        height={500}
        alt="Tất cả sản phẩm"
        className="h-[500px] w-full"
        priority
      />

      {/* Text Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2
          className={`${robotosand.className} uppercase text-[36px] font-semibold text-[#ffffff]`}
        >
          {title}
        </h2>
        <h5
          className={`${quicksand.className} text-[#F5F5F5] font-medium text-[20px]`}
        >
          {description}
        </h5>
      </div>
    </div>
  );
};

export default BannerShare;
