import React from "react";
import { quicksand } from "@/font";
import Image from "next/image";
import ContactImage from "../../../public/images/contact.png";
import IconInsta from "../../../public/images/insta_contact.png";
import IconTiktok from "../../../public/images/tiktok_contact.png";
import IconFB from "../../../public/images/fb_contact.png";
import IconShope from "../../../public/images/shoppe_contact.png";
const page = () => {
  return (
    <div className={`container py-20 ${quicksand.className}`}>
      <div className="grid grid-cols-12 gap-2 md:gap-12">
        <div className="col-span-12 md:col-span-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-[26px] font-bold uppercase">
              CORR rất vui khi NHẬN ĐƯỢC LIÊN HỆ TỪ bạn
            </h2>
            <p className="text-[#383838] font-medium">
              Hãy để lại thông tin, chúng tôi hổ trợ bạn sớm nhất nhé!
            </p>
            <div>
              <h5 className="text-[14px] font-medium text-[#383838] pb-2">
                Họ và tên
              </h5>
              <input
                type="text"
                className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
              />
            </div>
            <div>
              <h5 className="text-[14px] font-medium text-[#383838] pb-2">
                Số điện thoại
              </h5>
              <input
                type="text"
                className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
              />
            </div>
            <div>
              <h5 className="text-[14px] font-medium text-[#383838] pb-2">
                Email
              </h5>
              <input
                type="text"
                className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
              />
            </div>
            <div>
              <h5 className="text-[14px] font-medium text-[#383838] pb-2">
                Nội dung cần hỗ trợ
              </h5>
              <textarea
                rows={4} // Bạn có thể điều chỉnh số dòng tùy ý
                className="outline-none w-full bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3 py-2 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="text-[16px] text-[#fff] py-4 px-20 bg-[#000000]">
                Gửi liên hệ
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Image src={ContactImage} alt="Liên hệ" className="w-full" />
        </div>
      </div>

      <div className="py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 md:col-span-3">
            <div className="p-6 bg-[#000000] w-full">
              <div className="flex flex-col gap-4">
                {" "}
                <Image
                  src={IconInsta}
                  alt="Icon"
                  className="w-[40px] h-[40px]"
                />
                <span className="text-[#F5F5F5] text-[16px] font-semibold">
                  Instagram
                </span>
                <span className="text-[18px] font-bold text-[#ffffff]">
                  corrjewelry
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="p-6 bg-[#000000] w-full">
              <div className="flex flex-col gap-4">
                {" "}
                <Image
                  src={IconTiktok}
                  alt="Icon"
                  className="w-[40px] h-[40px]"
                />
                <span className="text-[#F5F5F5] text-[16px] font-semibold">
                  Tiktok
                </span>
                <span className="text-[18px] font-bold text-[#ffffff]">
                  corrjewelry
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="p-6 bg-[#000000] w-full">
              <div className="flex flex-col gap-4">
                {" "}
                <Image src={IconFB} alt="Icon" className="w-[40px] h-[40px]" />
                <span className="text-[#F5F5F5] text-[16px] font-semibold">
                  FaceBook
                </span>
                <span className="text-[18px] font-bold text-[#ffffff]">
                  corrjewelry
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="p-6 bg-[#000000] w-full">
              <div className="flex flex-col gap-4">
                {" "}
                <Image
                  src={IconShope}
                  alt="Icon"
                  className="w-[40px] h-[40px]"
                />
                <span className="text-[#F5F5F5] text-[16px] font-semibold">
                  Shoppe
                </span>
                <span className="text-[18px] font-bold text-[#ffffff]">
                  corrjewelry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
