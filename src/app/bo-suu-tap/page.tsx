"use server";
import React from "react";
import { robotocondensed } from "@/font";
import CollectionDetail from "@/components/bo-suu-tap/CollectionDetail";
import Products from "@/components/share/Products";
import { ENDPOINT } from "@/enums/endpoint.enum";

const searchData = {
  populate: [
    "seo.thumbnail",
    "avatar",
    "content_video.avatar",
    "item.image",
    "item.san_phams",
    "item.san_phams.seo.thumbnail",
    "item.san_phams.images",
    "item.san_phams.size",
  ].toString(),
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
    `${ENDPOINT.GET_BO_SUU_TAP}?${searchParams}`
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
      url: `${baseUrl}/home`,
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
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_BO_SUU_TAP}?${searchParams}`
  );
  const itemCollection = dataHome?.data?.attributes?.item;

  return (
    <div className="flex flex-col gap-[0px] md:gap-[70px] md:py-[50px]">
      <div className="container">
        <div className=" justify-center md:justify-end flex">
          <h5
            className={`${robotocondensed.className} text-[40px] font-medium uppercase text-[#595959] `}
          >
            BỘ SƯU TẬP - corr
          </h5>
        </div>
      </div>
      <div className="">
        <CollectionDetail item={itemCollection} />
      </div>
      {/* <div className="md:hidden">
        <Products />
      </div> */}
    </div>
  );
};

export default page;
