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
interface BannerProps {
  banner: any;
}

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  return (
    <div className="relative">
      <Image
        src={`${baseUrl}${banner}`}
        alt="banner"
        className="!w-full"
        width={2000}
        height={2000}
      />
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
