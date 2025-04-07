"use client";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import React from "react";
import { quicksand, robotosand } from "@/font";
import CardProductOrder from "@/components/share/CardProductOrder";
import Image from "next/image";
import VoucherIcon from "../../../public/icon/voucher.svg";
import Link from "next/link";
import IconArrowWhite from "../../../public/icon/arrow-down-bold 1.png";

const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Giỏ hàng", link: "#" },
];
const page = () => {
  return (
    <div className="container py-8">
      <BreadcrumbBlack paths={paths} />
      <div className="py-6 flex gap-2 items-center">
        <h5
          className={`${robotosand.className} text-[20px] font-medium uppercase`}
        >
          Giỏ hàng của bạn
        </h5>
        <span className={`${quicksand.className} text-[15px]`}>
          ( <span className="font-bold">2</span> sản phẩm )
        </span>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <div className="p-6 border border-solid border-gray-300 rounded-[20px] flex flex-col gap-8">
            <CardProductOrder />
            <CardProductOrder />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="p-6 border border-solid border-gray-300 rounded-[20px] flex flex-col gap-8">
            <h5 className="text-[24px] uppercase font-medium">
              Đơn hàng của bạn
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">Tạm tính</span>
                <span className="text-[18px] font-bold text-[#1D242D]">
                  1.799.000 đ{" "}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">
                  Giảm giá (-20%)
                </span>
                <span className="text-[18px] font-bold text-[#FF3333]">
                  1.799.000 đ{" "}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">Vận chuyển</span>
                <span className="text-[18px] font-bold text-[#1D242D]">
                  0 đ
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative w-[60%] md:w-[79%]">
                <input
                  type="text"
                  className="py-6 h-[44px] pl-[50px] pr-[12px] w-full bg-[#F0F0F0] outline-none"
                  placeholder="Nhập mã giảm giá"
                />
                <Image
                  src={VoucherIcon}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] "
                  alt="Voucher Icon"
                />
              </div>
              <button className="h-[44px] bg-[#C1C1C1] text-white px-7">
                Áp dụng
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[18px] text-[#000000] font-bold">
                TỔNG CỘNG
              </span>
              <span className="text-[18px] font-bold text-[#000000]">
                1.799.000 đ{" "}
              </span>
            </div>
            <div className="">
              <Link
                href="/thanh-toan"
                className="w-full bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex justify-center gap-4"
              >
                <span> Thanh toán</span>

                <Image src={IconArrowWhite} alt="Icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
