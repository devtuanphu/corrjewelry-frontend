"use client";
import React, { useState } from "react";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import { quicksand, robotosand } from "@/font";
import Image from "next/image";
import Link from "next/link";
import IconForgot from "../../../public/icon/forgotIcon.svg";
import ArrowLeft from "../../../public/icon/arrow-left.svg";
const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Tài khoản", link: "#" },
];
import { Input, Button, Space } from "antd";
const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className={`${quicksand.className}  container py-8`}>
      <BreadcrumbBlack paths={paths} />
      <div className="flex justify-center">
        <div className="md:w-[40%] w-full">
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <div className="flex justify-center">
              <Image src={IconForgot} alt="Icon" width={56} height={56} />
            </div>
            <div className="leading-8">
              <h5 className="text-[18px] font-bold text-[#1D242D]">
                Quên mật khẩu
              </h5>
              <p className="text-[16px] text-[#1D242D]">
                Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email.
                Bạn sẽ nhận được một liên kết tạo mật khẩu mới qua email.
              </p>
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Email</p>
              <Input
                placeholder="Nhập email của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>

            <div>
              <button className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]">
                Đặt lại mật khẩu
              </button>
            </div>

            <Link href="/dang-nhap">
              {" "}
              <div className="flex justify-center gap-2 items-center">
                <div>
                  <Image src={ArrowLeft} alt="icon" width={20} height={20} />
                </div>
                <div>
                  <span className="text-[#383838] text-[16px]">
                    Trở lại đăng nhập
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
