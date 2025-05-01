import React from "react";
import BannerShare from "@/components/share/BannerShare";
import BlogSection from "@/components/home/BlogSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Products from "@/components/share/Products";
const page = () => {
  const paths = [
    { label: "Home", link: "/" },
    { label: "Trang Sức Nữ", link: "#" },
  ];
  return (
    <div className="flex flex-col gap-[70px] pb-[50px]">
      <div className="hidden md:block">
        <BannerShare paths={paths} />
      </div>
      {/* <Products />
      <BlogSection />
      <WhyChooseUs /> */}
    </div>
  );
};

export default page;
