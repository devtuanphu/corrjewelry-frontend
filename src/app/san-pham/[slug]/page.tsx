"use server";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import CarouselProductDetail from "@/components/share/CarouselProductDetail";
import ProductDetail from "@/components/share/ProductDetail";
import React from "react";
import TabDetailProduct from "@/components/share/TabDetailProduct";
import { robotosand } from "@/font";
import CartProduct from "@/components/share/CartProduct";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { ENDPOINT } from "@/enums/endpoint.enum";

const searchData = {
  populate: [
    "seo.thumbnail",
    "feedbacks.user.picture",
    "feedbacks.images",
    "images",
    "size",
  ].toString(),
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_PRODUCT_DETAIL}?${searchParams}&filters[slug][$eq]=${slug}`
  );

  const seo =
    (dataHome &&
      dataHome.data[0] &&
      dataHome.data[0].attributes &&
      dataHome.data[0].attributes.seo) ||
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
      url: `https://corrjewelry.vn/san-pham/${slug}`,
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

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const dataWhyChoosen = await fetchWithToken(
    `${ENDPOINT.GET_WHY_CHOOSEN_US}?${searchParmasWhy}`
  );
  const dataWhy = dataWhyChoosen?.data?.attributes?.item;
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_PRODUCT_DETAIL}?${searchParams}&filters[slug][$eq]=${slug}`
  );
  const images = dataHome.data[0].attributes?.images?.data;
  const title = dataHome?.data[0]?.attributes?.title;
  const paths = [
    { label: "Trang chủ", link: "/" },
    { label: "Danh sách sản phẩm", link: "#" },
    { label: title || "", link: "#" },
  ];
  const tag = dataHome?.data[0]?.attributes?.tag;

  const dataProductRecommend =
    tag === "Nam"
      ? await fetchWithToken(`${ENDPOINT.GET_PRODUCT_BY_NAM}?${searchParams}`)
      : tag === "Nữ"
      ? await fetchWithToken(`${ENDPOINT.GET_PRODUCT_BY_NU}?${searchParams}`)
      : await fetchWithToken(
          `${ENDPOINT.GET_PRODUCT_BY_UNISEX}?${searchParams}`
        );

  return (
    <>
      <div className="container py-12">
        <BreadcrumbBlack paths={paths} />
        <div className="py-12">
          <div className="grid grid-cols-12 gap-2 md:gap-8 ">
            <div className="col-span-12 md:col-span-6">
              <CarouselProductDetail images={images} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <ProductDetail data={dataHome?.data} />
            </div>
          </div>
        </div>
        <TabDetailProduct data={dataHome?.data} />
        <div className="flex justify-center py-8">
          <h2
            className={`${robotosand.className} relative text-[20px] font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
          >
            <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
            Sản phẩm tương tự
            <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {dataProductRecommend?.data?.map((product: any) => (
            <div key={product.id} className="col-span-6 md:col-span-3">
              <CartProduct data={product} />
            </div>
          ))}
        </div>
      </div>
      <WhyChooseUs dataWhy={dataWhy} />
    </>
  );
};

export default page;
