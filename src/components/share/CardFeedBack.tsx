import React from "react";
import AvatarImage from "../../../public/images/user.png";
import Image from "next/image";
import { quicksand } from "@/font";
import StarIcon from "../../../public/icon/start.svg";
import ImageFeedback from "../../../public/images/feedback1.jpg";

const CardFeedBack = () => {
  return (
    <div
      className={`p-8 border border-solid border-gray-300 rounded-[20px] ${quicksand.className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between item-center">
          <div className="flex gap-2">
            <div>
              <Image
                src={AvatarImage}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <h2 className="text-[20px] font-semibold text-[#000000]">
              Samantha D.
            </h2>
          </div>
          <div className="flex gap-2">
            <Image src={StarIcon} width={22} height={22} alt="icon star" />
            <Image src={StarIcon} width={22} height={22} alt="icon star" />
            <Image src={StarIcon} width={22} height={22} alt="icon star" />
            <Image src={StarIcon} width={22} height={22} alt="icon star" />
            <Image src={StarIcon} width={22} height={22} alt="icon star" />
          </div>
        </div>
        <p className="text-[14px] font-medium text-[#2A2A2A]">
          "I absolutely love this! The design is unique and the fabric feels so
          comfortable. As a fellow designer, I appreciate the attention to
          detail.
        </p>
        <div className="flex gap-2">
          <Image
            src={ImageFeedback}
            alt="Feed back"
            className="w-[80px] h-[80px]"
          />
          <Image
            src={ImageFeedback}
            alt="Feed back"
            className="w-[80px] h-[80px]"
          />
        </div>
        <span className="text-[14px] font-semibold text-[#595959]">
          Posted on 24/10/2023
        </span>
      </div>
    </div>
  );
};

export default CardFeedBack;
