import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo-footer.png";
import { robotosand, quicksand } from "@/font";
import IconPhone from "../../../public/icon/Phone Rounded.svg";
import Email from "../../../public/icon/Letter.svg";
import FaceBookIcon from "../../../public/icon/fb_icon.svg";
import Instagram from "../../../public/icon/instagram.svg";
import ZaloIcon from "../../../public/icon/zalo.svg";
import TiktokIcon from "../../../public/icon/tiktok.svg";
const Footer = () => {
  return (
    <>
      <div className={`bg-[#000000] py-8 ${robotosand.className}`}>
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <Image src={Logo} alt="Logo" height={64} width={116} />
                <h5 className="text-[#ffffff] font-semibold text-[16px]">
                  CORR JEWELRY – Tỏa sáng theo cách của bạn
                </h5>
                <p className="text-[#cccccc] text-[14px]">
                  CORR JEWELRY – thiết kế tinh tế, bền đẹp theo thời gian, tôn
                  vinh phong cách và đẳng cấp riêng của bạn.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Image
                    src={IconPhone}
                    alt="Icon phone"
                    width={24}
                    height={24}
                  />
                  <span className="text-[16px] text-[#BFBFBF]">
                    Hotline 24/7:
                  </span>
                  <span className="text-[#ffffff] font-bold text-[16px]">
                    086 279 7948
                  </span>
                </div>
                <div className="flex gap-2">
                  <Image src={Email} alt="Email" width={24} height={24} />
                  <span className="text-[16px] text-[#BFBFBF]">Email:</span>
                  <span className="text-[#ffffff] font-bold text-[16px]">
                    corrjewelry@gmail.com
                  </span>
                </div>
                <div>
                  <h5 className="text-[14px] text-[#BFBFBF]">Fanpages:</h5>
                  <div className="pt-4">
                    <div className="flex gap-4">
                      <Image
                        src={FaceBookIcon}
                        alt="fb"
                        width={32}
                        height={32}
                      />
                      <Image src={Instagram} alt="fb" width={32} height={32} />
                      <Image src={ZaloIcon} alt="fb" width={32} height={32} />
                      <Image src={TiktokIcon} alt="fb" width={32} height={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <h5 className="text-[16px] font-bold text-[#ffffff]">
                  Chăm sóc khách hàng
                </h5>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Bảng size
                </p>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Chính sách bán hàng
                </p>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Chính sách bảo mật
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <h5 className="text-[16px] font-bold text-[#ffffff]">
                  About us
                </h5>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Câu chuyện của CORR
                </p>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Hướng dẫn sử dụng và bảo quản
                </p>
                <p
                  className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                >
                  Blog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#BFBFBF] py-2">
        <div className="text-center">
          <span
            className={`${quicksand.className} text-[#1D242D] text-[14px] font-medium`}
          >
            ©2025 CORR JEWELRY - All rights reserved
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
