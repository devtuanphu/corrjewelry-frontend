"use client";
import React, { useEffect, useState } from "react";
import ProductDemo from "../../../public/images/product.jpg";
import Image from "next/image";
import { robotocondensed } from "@/font";
import { quicksand } from "@/font";
import { robotosand } from "@/font";
import Start from "../../../public/icon/start.svg";
import Link from "next/link";
interface CartProductProps {
  data: any;
}

const CartProduct: React.FC<CartProductProps> = ({ data }) => {
  const [formattedSalePrice, setFormattedSalePrice] = useState<string>("");
  const [formattedOriginalPrice, setFormattedOriginalPrice] =
    useState<string>("");
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  const salePrice =
    data?.size[0]?.price * ((100 - data?.percentSale) / 100) || 0;
  const originalPrice = data?.size[0]?.price || 0;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const formattedSale = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(salePrice); // Định dạng giá bán sau khi giảm giá
      const formattedOriginal = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(originalPrice); // Định dạng giá gốc

      setFormattedSalePrice(formattedSale);
      setFormattedOriginalPrice(formattedOriginal);
    }
  }, [salePrice, originalPrice]);

  const imageProduct = data?.images[0]?.url
    ? data?.images[0]?.url
    : data?.images?.data[0]?.attributes?.url;
  return (
    <>
      <Link href={`/san-pham/${data?.slug}`}>
        <div className="flex flex-col gap-2">
          <div className="relative">
            {imageProduct && (
              <Image
                src={baseUrl + imageProduct}
                alt="product"
                className="w-full"
                height={100}
                width={400}
                priority
              />
            )}
            {data?.isPrenium && (
              <div className="absolute top-[72px] left-0 ">
                <div className="bg-[#E1E1E1] rotate-[-90deg] origin-top-left">
                  <span
                    className={`text-[#383838] text-[14px] p-2 ${robotocondensed.className} font-semibold`}
                  >
                    PREMIUM
                  </span>
                </div>
              </div>
            )}

            {data?.percentSale > 0 && (
              <div className="absolute right-4 top-3">
                <span
                  className={`${quicksand.className} font-bold text-[10px] text-[#ffffff] px-2 py-1 bg-[#BE0101] rounded-[4px]`}
                >
                  Giảm {data?.percentSale}%
                </span>
              </div>
            )}
          </div>
          <div
            className={`${robotosand.className} flex justify-between items-center md:items-start`}
          >
            <div>
              <h2 className="font-bold text-[#141414] text-[16px]">
                {data?.title}
              </h2>
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold text-[14px] text-[#141414]">
                  {formattedSalePrice}
                </h3>

                {formattedSalePrice != formattedOriginalPrice && (
                  <h3 className="font-normal text-[12px] text-[#595959] line-through">
                    {formattedOriginalPrice}
                  </h3>
                )}
              </div>
            </div>
            <div>
              <div className="text-end">
                <h2 className="text-[#141414] text-[14px] underline">
                  {data?.tag}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[#595959]">
                  {data?.startAVG}
                </span>
                <Image
                  src={Start}
                  height={16}
                  width={16}
                  alt="icon star"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CartProduct;
