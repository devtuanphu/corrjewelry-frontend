"use server";
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

import { ENDPOINT } from "@/enums/endpoint.enum";
import Link from "next/link";
const searchData = {
  populate: ["info.logo", "social", "take_care.link", "about.link"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchWithToken(endpoint: string) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

const Footer = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const dataFooter = await fetchWithToken(
    `${ENDPOINT.GET_FOOTER}?${searchParams}`
  );
  const footer = dataFooter?.data;

  const logo = baseUrl + footer?.attributes?.info?.logo?.data?.attributes.url;

  return (
    <>
      <div className={`bg-[#000000] py-8 ${robotosand.className}`}>
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <Image src={logo} alt="Logo" height={64} width={116} />
                <h5 className="text-[#ffffff] font-semibold text-[16px]">
                  {footer?.attributes?.info?.title}
                </h5>
                <p className="text-[#cccccc] text-[14px]">
                  {footer?.attributes?.info?.destinations}
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
                    <a href={`tel:${footer?.attributes?.social?.phone}`}>
                      {footer?.attributes?.social?.phone}
                    </a>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Image src={Email} alt="Email" width={24} height={24} />
                  <span className="text-[16px] text-[#BFBFBF]">Email:</span>
                  <span className="text-[#ffffff] font-bold text-[16px]">
                    {footer?.attributes?.social?.email}
                  </span>
                </div>
                <div>
                  <h5 className="text-[14px] text-[#BFBFBF]">Fanpages:</h5>
                  <div className="pt-4">
                    <div className="flex gap-4">
                      <a
                        href={`${footer?.attributes?.social?.fb}`}
                        target="_blank"
                      >
                        <Image
                          src={FaceBookIcon}
                          alt="fb"
                          width={32}
                          height={32}
                        />
                      </a>
                      <a
                        href={`${footer?.attributes?.social?.insta}`}
                        target="_blank"
                      >
                        <Image
                          src={Instagram}
                          alt="fb"
                          width={32}
                          height={32}
                        />
                      </a>
                      <a
                        target="_blank"
                        href={`https://zalo.me/${footer?.attributes?.social?.zalo}`}
                      >
                        <Image src={ZaloIcon} alt="fb" width={32} height={32} />
                      </a>
                      <a
                        href={`${footer?.attributes?.social?.tiktok}`}
                        target="_blank"
                      >
                        <Image
                          src={TiktokIcon}
                          alt="fb"
                          width={32}
                          height={32}
                        />
                      </a>
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
                {footer?.attributes?.take_care?.link &&
                  footer?.attributes?.take_care?.link?.map((item: any) => {
                    return (
                      <p
                        className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                      >
                        <Link href={`${item?.link}`}>{item?.label}</Link>
                      </p>
                    );
                  })}
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="flex flex-col gap-4">
                <h5 className="text-[16px] font-bold text-[#ffffff]">
                  About us
                </h5>
                {footer?.attributes?.about?.link &&
                  footer?.attributes?.about?.link?.map((item: any) => {
                    return (
                      <p
                        className={`text-[16px] font-medium text-[#ffffff] ${quicksand.className}`}
                      >
                        <Link href={`${item?.link}`}>{item?.label}</Link>
                      </p>
                    );
                  })}
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
