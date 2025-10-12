"use server";
import React from "react";
import { quicksand } from "@/font";
import Image from "next/image";
import ContactImage from "../../../public/images/contact.png";
import IconInsta from "../../../public/images/insta_contact.png";
import IconTiktok from "../../../public/images/tiktok_contact.png";
import IconFB from "../../../public/images/fb_contact.png";
import IconShope from "../../../public/images/shoppe_contact.png";
import { ENDPOINT } from "@/enums/endpoint.enum";
import FormContact from "@/components/share/FormContact";

const searchData = {
  populate: ["seo.thumbnail", "shop.icon", "img"].toString(),
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

export async function generateMetadata() {
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_LIEN_HE}?${searchParams}`
  );

  const seo =
    (dataHome &&
      dataHome.data &&
      dataHome.data.attributes &&
      dataHome.data.attributes.seo) ||
    {};

  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `https://corrjewelry.vn/lien-he`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}
const page = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_LIEN_HE}?${searchParams}`
  );
  const img = baseUrl + dataHome?.data?.attributes?.img?.data?.attributes?.url;
  const shop = dataHome?.data?.attributes?.shop;

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
            <FormContact />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Image
            src={img}
            alt="Liên hệ"
            className="w-full"
            width={1980}
            height={200}
          />
        </div>
      </div>

      <div className="py-20">
        <div className="grid grid-cols-12 gap-6">
          {shop?.map((item: any) => {
            return (
              <>
                <div className="col-span-6 md:col-span-3">
                  <div className="p-6 bg-[#000000] w-full">
                    <div className="flex flex-col gap-4">
                      <Image
                        src={baseUrl + item.icon?.data?.attributes?.url}
                        alt="Icon"
                        className="w-[40px] h-[40px]"
                        width={40}
                        height={40}
                      />
                      <span className="text-[#F5F5F5] text-[16px] font-semibold">
                        {item?.type}
                      </span>
                      <span className="text-[18px] font-bold text-[#ffffff]">
                        {item?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
