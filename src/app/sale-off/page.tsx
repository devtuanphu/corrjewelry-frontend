"use server";
import React from "react";
import { ENDPOINT } from "@/enums/endpoint.enum";
import BannerShare from "@/components/share/BannerShare";
import Products from "@/components/share/Products";
import BlogSection from "@/components/home/BlogSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
const searchData = {
  populate: ["seo.thumbnail", "banner", "img_bestseller"].toString(),
};
const searchDataWhy = {
  populate: ["item.icon"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();
const searchParmasWhy = new URLSearchParams(searchDataWhy).toString();

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
    `${ENDPOINT.GET_SALE_OFF}?${searchParams}`
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
      url: `https://corrjewelry.vn/sale-off`,
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
  const paths = [
    { label: "Home", link: "/" },
    { label: "Sale off", link: "#" },
  ];
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_SALE_OFF}?${searchParams}`
  );
  const dataWhyChoosen = await fetchWithToken(
    `${ENDPOINT.GET_WHY_CHOOSEN_US}?${searchParmasWhy}`
  );
  const dataWhy = dataWhyChoosen?.data?.attributes?.item;

  const blog = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?populate=seo.thumbnail&pagination[page]=1&pagination[pageSize]=3`
  );

  const dataBlog = blog?.data;
  const seo =
    (dataHome &&
      dataHome.data &&
      dataHome.data.attributes &&
      dataHome.data.attributes.seo) ||
    {};
  const banner = seo.thumbnail.data.attributes.url;
  const title = seo?.title;
  const description = seo?.description;

  console.log(banner);

  return (
    <div className="flex flex-col gap-[70px] pb-[50px]">
      <div className="hidden md:block">
        <BannerShare
          avatar={banner}
          paths={paths}
          title={title}
          description={description}
        />
      </div>
      <Products
        title={title}
        isFilter={false}
        endpoint={ENDPOINT.GET_PRODUCT_SALE_OFF}
      />
      <BlogSection data={dataBlog} />
      <WhyChooseUs dataWhy={dataWhy} />
    </div>
  );
};

export default page;
