"use server";
import React from "react";
import BannerShare from "@/components/share/BannerShare";
import BlogSection from "@/components/home/BlogSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Products from "@/components/share/Products";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
const searchDataWhy = {
  populate: ["item.icon"].toString(),
};
const searchData = {
  populate: ["seo.thumbnail", "banner", "img_bestseller", "avatar"].toString(),
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const { slug, category } = params;

  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_CHI_TIET_DANH_MUC_SLUG}?slug=${slug}`
  );

  const seo = (dataHome && dataHome.seo) || {};

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
      url: `https://corrjewelry.vn/${category}/${slug}`,
      images: [
        {
          url: seo.thumbnail?.url
            ? `${baseUrl}${seo.thumbnail?.url}`
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
const page = async ({
  params,
}: {
  params: { slug: string; category: string };
}) => {
  const { slug } = params;
  const { category } = params;

  const dataWhyChoosen = await fetchWithToken(
    `${ENDPOINT.GET_WHY_CHOOSEN_US}?${searchParmasWhy}`
  );
  const dataWhy = dataWhyChoosen?.data?.attributes?.item;
  const blog = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?populate=seo.thumbnail&pagination[page]=1&pagination[pageSize]=3`
  );
  const dataBlog = blog?.data;
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_CHI_TIET_DANH_MUC_SLUG}?slug=${slug}`
  );

  const urlAvatar = dataHome?.seo?.thumbnail?.url;
  const title = dataHome?.seo?.title;
  const description = dataHome?.seo?.description;
  const paths = [
    { label: "Home", link: "/" },
    { label: title, link: "#" },
  ];
  return (
    <div className="flex flex-col gap-[70px] pb-[50px] ">
      <div className="hidden md:block">
        <BannerShare
          avatar={urlAvatar}
          paths={paths}
          title={title}
          description={description}
        />
      </div>
      <Products
        title={title}
        isFilter={false}
        endpoint={ENDPOINT.GET_PRODUCT_BY_DETAIL_CATEGORY}
        endpointFilter={ENDPOINT.GET_LIST_DANH_MUC_NAM}
        slug={slug}
        categorySlug={category}
      />
      <BlogSection data={dataBlog} />
      <WhyChooseUs dataWhy={dataWhy} />
    </div>
  );
};

export default page;
