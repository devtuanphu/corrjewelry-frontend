"use client";
import React from "react";
import Image from "next/image";
import { quicksand } from "@/font";
import StarIcon from "../../../public/icon/start.svg";
import { IconStar } from "./IconStar";
interface CardFeedBackProps {
  data: any;
}

const CardFeedBack: React.FC<CardFeedBackProps> = ({ data }) => {
  console.log(data);
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const starCount = data?.attributes?.star || 0;

  return (
    <div
      className={`p-8 border border-solid border-gray-300 rounded-[20px] ${quicksand.className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between item-center">
          <div className="flex gap-2">
            <div>
              <Image
                src={
                  baseUrl +
                  data?.attributes?.user?.data?.attributes?.picture?.data
                    ?.attributes?.url
                }
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <h2 className="text-[20px] font-semibold text-[#000000]">
              {data?.attributes?.user?.data?.attributes?.firstName +
                " " +
                data?.attributes?.user?.data?.attributes?.lastName}
            </h2>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <IconStar key={index} choosen={index < starCount} />
            ))}
          </div>
        </div>
        <p className="text-[14px] font-medium text-[#2A2A2A]">
          {data?.attributes?.content}
        </p>
        <div className="flex gap-2">
          {data?.attributes?.images &&
            data?.attributes?.images?.data?.map((item: any) => {
              return (
                <Image
                  src={baseUrl + item?.attributes?.url}
                  alt="Feed back"
                  className="w-[80px] h-[80px]"
                  width={80}
                  height={80}
                />
              );
            })}
        </div>
        <span className="text-[14px] font-semibold text-[#595959]">
          Posted on {data?.attributes?.date}
        </span>
      </div>
    </div>
  );
};

export default CardFeedBack;
