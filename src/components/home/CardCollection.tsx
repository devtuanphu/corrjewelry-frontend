import React from "react";
import Image from "next/image";
import { worksand } from "@/font";
import { quicksand } from "@/font";
import CollectionImage from "../../../public/images/colleciton.jpg";
import Link from "next/link";
interface CardCollectionProps {
  data: any;
}
const CardCollection: React.FC<CardCollectionProps> = ({ data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const image = baseUrl + data?.avatar?.data?.attributes?.url;

  return (
    <>
      <div className="relative">
        <Image
          src={image}
          alt="Collection"
          className="w-full h-[300px]"
          width={2000}
          height={300}
          priority
        />
        <div className="bg-[#f3f3f3] absolute left-0 bottom-0 px-[24px] py-[12px] leading-7">
          <h5
            className={`${quicksand.className} uppercase text-[#000000] font-bold text-[24px]`}
          >
            {data?.title}
          </h5>
          <p className={`${quicksand.className} text-[14px] font-medium`}>
            {data?.subTitle}
          </p>
          <div
            className={`text-end text-[16px] ${worksand.className} font-semibold`}
          >
            <Link href={`/${data?.slug}`}>Shop now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCollection;
