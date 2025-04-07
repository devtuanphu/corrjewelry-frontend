import React from "react";
import Image from "next/image";
import DemoImageCollection from "../../../public/images/demo-bo-suu-tap.png";
import NewArrivalCollection from "./NewArrivalCollection";
import { quicksand } from "@/font";
const CollectionDetail = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="relative">
            {/* Banner Image */}
            <Image
              src={DemoImageCollection}
              alt="Bộ sưu tập"
              className="w-full"
            />

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />

            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-4 text-center">
                <h5
                  className={`${quicksand.className} text-[32px] font-semibold text-white`}
                >
                  DÂY CHUYỀN
                </h5>
                <p
                  className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                >
                  Kiêu Hãnh Tỏa Sáng
                </p>
                <button className="p-4 text-white border border-solid border-white">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <NewArrivalCollection />
        </div>
        <div className="col-span-8">
          <NewArrivalCollection />
        </div>
        <div className="col-span-4">
          <div className="relative">
            {/* Banner Image */}
            <Image
              src={DemoImageCollection}
              alt="Bộ sưu tập"
              className="w-full"
            />

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />

            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-4 text-center">
                <h5
                  className={`${quicksand.className} text-[32px] font-semibold text-white`}
                >
                  DÂY CHUYỀN
                </h5>
                <p
                  className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                >
                  Kiêu Hãnh Tỏa Sáng
                </p>
                <button className="p-4 text-white border border-solid border-white">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="relative">
            {/* Banner Image */}
            <Image
              src={DemoImageCollection}
              alt="Bộ sưu tập"
              className="w-full"
            />

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />

            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-4 text-center">
                <h5
                  className={`${quicksand.className} text-[32px] font-semibold text-white`}
                >
                  DÂY CHUYỀN
                </h5>
                <p
                  className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                >
                  Kiêu Hãnh Tỏa Sáng
                </p>
                <button className="p-4 text-white border border-solid border-white">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <NewArrivalCollection />
        </div>
        <div className="col-span-8">
          <NewArrivalCollection />
        </div>
        <div className="col-span-4">
          <div className="relative">
            {/* Banner Image */}
            <Image
              src={DemoImageCollection}
              alt="Bộ sưu tập"
              className="w-full"
            />

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />

            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-4 text-center">
                <h5
                  className={`${quicksand.className} text-[32px] font-semibold text-white`}
                >
                  DÂY CHUYỀN
                </h5>
                <p
                  className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                >
                  Kiêu Hãnh Tỏa Sáng
                </p>
                <button className="p-4 text-white border border-solid border-white">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
