"use server";
import React from "react";
import { robotosand } from "@/font";
import CartBlog from "../share/CartBlog";
import Link from "next/link";
interface BlogSectionProps {
  data: any;
}

const BlogSection: React.FC<BlogSectionProps> = async ({ data }) => {
  return (
    <>
      <div className="container pt-[40px]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center ">
            <Link
              href="/blog"
              className={`${robotosand.className} relative text-danh-muc font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
            >
              {" "}
              <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
              BLOG
              <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-2 md:gap-8">
            {data &&
              data.map((item: any) => {
                return (
                  <div className="col-span-12 md:col-span-4" key={item.id}>
                    <CartBlog data={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
