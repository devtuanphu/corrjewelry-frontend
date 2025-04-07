import React from "react";
import { robotosand } from "@/font";
import CartBlog from "../share/CartBlog";

const BlogSection = () => {
  return (
    <>
      <div className="container pt-[40px]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center ">
            <h2
              className={`${robotosand.className} relative text-[20px] font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
            >
              <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
              BLOG
              <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <CartBlog />
            </div>
            <div className="col-span-12 md:col-span-4">
              <CartBlog />
            </div>
            <div className="col-span-12 md:col-span-4">
              <CartBlog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
