import React from "react";
import BannerHome from "../../../public/images/banner-home.png";
import Image from "next/image";
import { quicksand } from "@/font";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative">
      <Image src={BannerHome} alt="banner" className="w-full" />
      <div className="absolute bottom-[10%] left-[10%] md:bottom-[25%] Md:left-[23%]">
        <Link
          href="/tat-ca-san-pham"
          className={`bg-[#FFFFFF] font-extrabold py-[12px] px-[30px] rounded-[4px] ${quicksand.className}`}
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default Banner;
