"use client";
import React, { useState } from "react";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import { quicksand, robotosand } from "@/font";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox } from "antd";
import IconDivider from "../../../public/icon/divider.svg";
import IconGoogle from "../../../public/icon/icongg.svg";
import Image from "next/image";
import Link from "next/link";
import { DatePicker } from "antd";

const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Tài khoản", link: "#" },
];
import { Input, Button, Space } from "antd";
const page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className={`${quicksand.className}  container py-8`}>
      <BreadcrumbBlack paths={paths} />
      <div className="flex justify-center">
        <div className="w-full md:w-[40%]">
          {" "}
          <div className="flex flex-col gap-4">
            <h2
              className={`text-[20px] font-bold text-[#000000] text-center pt-8 md:pt-0`}
            >
              ĐĂNG KÝ
            </h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] font-medium pb-2">
                  Tên <span className="text-[#E03529]">*</span>
                </p>
                <Input
                  placeholder="Nhập tên của bạn"
                  className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] font-medium pb-2">
                  Họ <span className="text-[#E03529]">*</span>
                </p>
                <Input
                  placeholder="Nhập họ của bạn"
                  className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Số điện thoại <span className="text-[#E03529]">*</span>
              </p>
              <Input
                placeholder="Nhập số điện thoại của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Ngày sinh</p>
              <DatePicker
                format="DD-MM-YYYY"
                placeholder="dd-mm-yyyy"
                className="w-full h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Email</p>
              <Input
                placeholder="Nhập email thoại của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Mật khẩu <span className="text-[#E03529]">*</span>
              </p>
              <Input.Password
                placeholder="Nhập mật khẩu của bạn"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="text-black" />
                  ) : (
                    <EyeInvisibleOutlined className="text-black" />
                  )
                }
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Nhập lại mật khẩu <span className="text-[#E03529]">*</span>
              </p>
              <Input.Password
                placeholder="Nhập lại mật khẩu của bạn"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="text-black" />
                  ) : (
                    <EyeInvisibleOutlined className="text-black" />
                  )
                }
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>

            <div>
              <button className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]">
                Đăng kí
              </button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-[#141414] font-normal text-[16px]">
                Nếu bạn đã có tài khoản ?
              </span>
              <Link
                href="/dang-nhap"
                className="text-[16px] font-bold text-[#000000]"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
