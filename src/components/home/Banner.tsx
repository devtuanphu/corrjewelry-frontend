import React from "react";
import Image from "next/image";
import { quicksand } from "@/font";
import Link from "next/link";

interface BannerProps {
  banner: any;
}

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  
  if (!banner) return null;
  
  return (
    <div className="relative">
      <Image
        src={`${baseUrl}${banner}`}
        alt="banner"
        className="!w-full"
        width={1920}
        height={600}
        sizes="100vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYhEhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIREv/aAAwDAQACEQMRAD8AzW0023vLCG4n1G6jkkXqZFSIgH0cf9rZ0O0hO0QBdXJP1e7+0pVKT0cmo//Z"
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

