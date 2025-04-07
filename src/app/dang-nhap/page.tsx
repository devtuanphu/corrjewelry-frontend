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
        <div className="w-full md:w-[40%]">
          {" "}
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <h2 className={`text-[20px] font-bold text-[#000000] text-center`}>
              ĐĂNG NHẬP
            </h2>
            <div>
              <p className="text-[14px] font-medium pb-2">Email</p>
              <Input
                placeholder="Nhập email của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Mật khẩu</p>
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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="custom-checkbox"
                />
                <label
                  className={`text-[14px] text-[#344054] font-medium select-none ${quicksand.className}`}
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div>
                <Link
                  href="/quen-mat-khau"
                  className={`${quicksand.className} text-[14px] font-medium`}
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div>
              <button className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]">
                Đăng nhập
              </button>
            </div>
            <div>
              <Image src={IconDivider} className="w-full" alt="icon" />
            </div>
            <div>
              <button className="w-full py-4 border border-solid border-[#D0D5DD] text-[#ffffff] text-[16px] font-medium  rounded-[8px] flex items-center justify-center gap-2">
                <div className="">
                  <Image
                    src={IconGoogle}
                    width={24}
                    height={24}
                    alt="login with google"
                  />
                </div>
                <span className="text-[16px] text-[#1D242D] font-medium">
                  Đăng nhập với Google
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-[#141414] font-normal text-[16px]">
                Nếu bạn chưa có tài khoản ?
              </span>
              <Link
                href="/dang-ki"
                className="text-[16px] font-bold text-[#000000]"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
