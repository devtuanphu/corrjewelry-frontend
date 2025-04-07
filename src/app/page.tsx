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
const page = () => {
  return (
    <div className="flex flex-col gap-[70px] pb-[50px]">
      <Banner />
      <NewArrival />
      <Category />
      <BestSeller />
      <Collection />
      <SaleOff />
      <BlogSection />
      <WhyChooseUs />
    </div>
  );
};

export default page;
