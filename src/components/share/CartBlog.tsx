"use client";
import React from "react";
import BlogDemo from "../../../public/images/blogdemo.jpg";
import Image from "next/image";
import { robotosand, quicksand } from "@/font";
import Link from "next/link";
import { blob } from "stream/consumers";
interface CartBlogProps {
  data: any;
}
const CartBlog: React.FC<CartBlogProps> = ({ data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensures two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const image =
    baseUrl + data?.attributes?.seo?.thumbnail?.data?.attributes?.url;

  return (
    <>
      <Link href={`/blog/${data?.attributes?.slug}`}>
        {" "}
        <div className="flex flex-col gap-4">
          <Image
            src={image}
            alt="Tin tức"
            className="w-full"
            width={600}
            height={600}
            priority
          />
          <div
            className={`flex gap-4 ${robotosand.className} text-[16px] font-medium text-[#4C4C4C]`}
          >
            <span>Admin</span>
            <span>l</span>
            <span>{formatDate(data?.attributes?.createdAt)}</span>
          </div>
          <h2
            className={`${robotosand.className} text-[18px] font-semibold text-[#2A2A2A]`}
          >
            {data?.attributes?.title}
          </h2>
          <p
            className={`${quicksand.className} text-[16px] font-medium text-[#2A2A2A] truncate-text`}
          >
            {data?.attributes?.description}
          </p>
        </div>
      </Link>
    </>
  );
};

export default CartBlog;
