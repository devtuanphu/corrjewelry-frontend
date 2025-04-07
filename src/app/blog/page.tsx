import React from "react";
import BannerShare from "@/components/share/BannerShare";
import MainBlog from "@/components/blog/MainBlog";
const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Blog", link: "#" },
];
const page = () => {
  return (
    <div className="flex flex-col gap-[70px] pb-[50px]">
      <div className="hidden md:block">
        <BannerShare paths={paths} />
      </div>
      <MainBlog />
    </div>
  );
};

export default page;
