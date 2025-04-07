import React from "react";
import Image from "next/image";
import { worksand } from "@/font";
import { quicksand } from "@/font";
import CollectionImage from "../../../public/images/colleciton.jpg";
import Link from "next/link";

const CardCollection = () => {
  return (
    <>
      <div className="relative">
        <Image
          src={CollectionImage}
          alt="Collection"
          className="w-full h-[300px]"
        />
        <div className="bg-[#f3f3f3] absolute left-0 bottom-0 px-[24px] py-[12px] leading-7">
          <h5
            className={`${quicksand.className} text-[#000000] font-bold text-[24px]`}
          >
            LẮC TAY
          </h5>
          <p className={`${quicksand.className} text-[14px] font-medium`}>
            Điểm nhấn hoàn hảo cho cổ tay
          </p>
          <div
            className={`text-end text-[16px] ${worksand.className} font-semibold`}
          >
            <Link href="/bo-suu-tap">Shop now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCollection;
