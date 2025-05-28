"use server";
import React from "react";
import ImageTinTucDemo from "../../../../public/images/tin-tuc.jpg";
import Image from "next/image";
import { ENDPOINT } from "@/enums/endpoint.enum";

const searchData = {
  populate: ["seo.thumbnail"].toString(),
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?${searchParams}&filters[slug][$eq]=${slug}`
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
      url: `https://corrjewelry.vn/blog/${slug}`,
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
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Ensures two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?${searchParams}&filters[slug][$eq]=${slug}`
  );
  const blogDetail = dataHome?.data;
  console.log(blogDetail);

  return (
    <div className="container py-8">
      <p className="text-[16px] font-medium">
        By Admin {formatDate(blogDetail[0]?.attributes?.createdAt)}
      </p>
      <div className="content-blog flex flex-col gap-6">
        <div
          dangerouslySetInnerHTML={{
            __html: blogDetail[0]?.attributes?.content || "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default page;
