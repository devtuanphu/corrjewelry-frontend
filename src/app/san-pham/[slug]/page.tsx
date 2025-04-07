import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import CarouselProductDetail from "@/components/share/CarouselProductDetail";
import ProductDetail from "@/components/share/ProductDetail";
import React from "react";
import TabDetailProduct from "@/components/share/TabDetailProduct";
import { robotosand } from "@/font";
import CartProduct from "@/components/share/CartProduct";

import WhyChooseUs from "@/components/home/WhyChooseUs";
const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Danh sách sản phẩm", link: "#" },
  { label: "Lắc tay cỏ bốn lá", link: "#" },
];
const page = () => {
  return (
    <>
      <div className="container py-12">
        <BreadcrumbBlack paths={paths} />
        <div className="py-12">
          <div className="grid grid-cols-12 gap-8 ">
            <div className="col-span-12 md:col-span-6">
              <CarouselProductDetail />
            </div>
            <div className="col-span-12 md:col-span-6">
              <ProductDetail />
            </div>
          </div>
        </div>
        <TabDetailProduct />
        <div className="flex justify-center py-8">
          <h2
            className={`${robotosand.className} relative text-[20px] font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
          >
            <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
            Sản phẩm tương tự
            <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-3">
            <CartProduct />
          </div>
          <div className="col-span-6 md:col-span-3">
            <CartProduct />
          </div>
          <div className="col-span-6 md:col-span-3">
            <CartProduct />
          </div>
          <div className="col-span-6 md:col-span-3">
            <CartProduct />
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </>
  );
};

export default page;
