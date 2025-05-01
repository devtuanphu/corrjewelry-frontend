"use server";
import React from "react";
import Banner from "@/components/home/Banner";
import NewArrival from "@/components/home/NewArrival";
import Category from "@/components/home/Category";
import Collection from "@/components/home/Collection";
import BestSeller from "@/components/home/BestSeller";
import SaleOff from "@/components/home/SaleOff";
import BlogSection from "@/components/home/BlogSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "../enums/endpoint.enum";

const searchData = {
  populate: ["seo.thumbnail", "banner", "img_bestseller"].toString(),
};
const searchDataWhy = {
  populate: ["item.icon"].toString(),
};
const searchDataProduct = {
  populate: ["seo.thumbnail", "images", "size"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();
const searchParmasWhy = new URLSearchParams(searchDataWhy).toString();
const searchataProduct = new URLSearchParams(searchDataProduct).toString();

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
  const dataHome = await fetchWithToken(`${ENDPOINT.GET_HOME}?${searchParams}`);

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
  const dataHome = await fetchWithToken(`${ENDPOINT.GET_HOME}?${searchParams}`);
  const dataWhyChoosen = await fetchWithToken(
    `${ENDPOINT.GET_WHY_CHOOSEN_US}?${searchParmasWhy}`
  );
  const dataNamAPI = await fetchWithToken(
    `${ENDPOINT.GET_NAM}?${searchParams}`
  );
  const dataNuAPI = await fetchWithToken(`${ENDPOINT.GET_NU}?${searchParams}`);
  const dataUnisexAPI = await fetchWithToken(
    `${ENDPOINT.GET_UNISEX}?${searchParams}`
  );
  const banner = dataHome?.data?.attributes?.banner?.data?.attributes?.url;
  const img_bestseller =
    dataHome?.data?.attributes?.img_bestseller?.data?.attributes?.url;
  const dataWhy = dataWhyChoosen?.data?.attributes?.item;

  const dataNam = dataNamAPI?.data?.attributes?.seo;
  const dataNu = dataNuAPI?.data?.attributes?.seo;
  const dataUnisex = dataUnisexAPI?.data?.attributes?.seo;

  const productArrival = await fetchWithToken(
    `${ENDPOINT.GET_PRODUCT_DETAIL}?${searchataProduct}&filters[isNewArrival][$eq]=true&pagination[page]=1&pagination[pageSize]=10`
  );
  const dataProductArrival = productArrival?.data;
  const productBestSeller = await fetchWithToken(
    `${ENDPOINT.GET_PRODUCT_DETAIL}?${searchataProduct}&filters[isBestSeller][$eq]=true&pagination[page]=1&pagination[pageSize]=10`
  );
  const dataProductBestSeller = productBestSeller?.data;

  const danhMucTrangChu = await fetchWithToken(
    `${ENDPOINT.GET_DANH_MUC_TRANG_CHU}?populate=avatar`
  );
  const dataDanhMucTrangChu = danhMucTrangChu?.data;

  const blog = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?populate=seo.thumbnail&pagination[page]=1&pagination[pageSize]=3`
  );

  const dataBlog = blog?.data;

  return (
    <div className="flex flex-col gap-[70px] pb-[50px]">
      <Banner banner={banner} />
      <NewArrival data={dataProductArrival} />
      <Category dataNam={dataNam} dataNu={dataNu} dataUnisex={dataUnisex} />
      <BestSeller
        img_bestseller={img_bestseller}
        data={dataProductBestSeller}
      />
      <Collection data={dataDanhMucTrangChu} />
      <SaleOff />
      <BlogSection data={dataBlog} />
      <WhyChooseUs dataWhy={dataWhy} />
    </div>
  );
};

export default page;
