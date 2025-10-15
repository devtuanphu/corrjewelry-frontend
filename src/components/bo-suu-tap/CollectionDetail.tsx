"use server";
import React from "react";
import Image from "next/image";
import DemoImageCollection from "../../../public/images/demo-bo-suu-tap.png";
import NewArrivalCollection from "./NewArrivalCollection";
import { quicksand } from "@/font";
import Link from "next/link";
interface CollectionDetailProps {
  item: any;
}
const CollectionDetail: React.FC<CollectionDetailProps> = ({ item }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-8">
        {item?.map((product: any, index: number) => {
          console.log(product?.image?.data?.attributes?.url);

          if (index % 2 === 0) {
            return (
              <>
                <div
                  className={`col-span-4 hidden md:block`}
                  key={`banner-${index}`}
                >
                  <div className="relative">
                    <Image
                      src={
                        baseUrl + product?.image?.data?.attributes?.url || ""
                      }
                      alt="Bộ sưu tập"
                      className="w-full"
                      width={product?.image?.data?.attributes?.width}
                      height={product?.image?.data?.attributes?.height}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />
                    <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="flex flex-col gap-4 text-center">
                        <h5
                          className={`${quicksand.className} text-[32px] font-semibold text-white`}
                        >
                          {product.title || "Sản phẩm"}
                        </h5>
                        <p
                          className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                        >
                          {product.description || "Mô tả sản phẩm"}
                        </p>
                        <Link
                          href={product.llink}
                          className="p-4 text-white border border-solid border-white"
                        >
                          SHOP NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-span-12 md:col-span-8 `}
                  key={`product-${index}`}
                >
                  <NewArrivalCollection product={product.san_phams} />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div
                  className={`col-span-12 md:col-span-8 `}
                  key={`product-${index}`}
                >
                  <NewArrivalCollection product={product.san_phams} />
                </div>
                <div
                  className={`col-span-4  hidden md:block`}
                  key={`banner-${index}`}
                >
                  <div className="relative">
                    <Image
                      src={DemoImageCollection}
                      alt="Bộ sưu tập"
                      className="w-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]" />
                    <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="flex flex-col gap-4 text-center">
                        <h5
                          className={`${quicksand.className} text-[32px] font-semibold text-white`}
                        >
                          {product.title || "Sản phẩm"}
                        </h5>
                        <p
                          className={`${quicksand.className} text-[18px] font-semibold text-[#F5F5F5] pb-4`}
                        >
                          {product.description || "Mô tả sản phẩm"}
                        </p>
                        <button className="p-4 text-white border border-solid border-white">
                          SHOP NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CollectionDetail;
