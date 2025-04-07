import React from "react";
import ProductDemo from "../../../public/images/product.jpg";
import Image from "next/image";
import { robotocondensed } from "@/font";
import { quicksand } from "@/font";
import { robotosand } from "@/font";
import Start from "../../../public/icon/start.svg";
import Link from "next/link";

const CartProduct = () => {
  return (
    <>
      <Link href="/san-pham/lac-tay">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Image src={ProductDemo} alt="product" className="w-full" />
            <div className="absolute top-[72px] left-0 ">
              <div className="bg-[#E1E1E1] rotate-[-90deg] origin-top-left">
                <span
                  className={`text-[#383838] text-[14px] p-2 ${robotocondensed.className} font-semibold`}
                >
                  PREMIUM
                </span>
              </div>
            </div>
            <div className="absolute  right-4 top-3">
              <span
                className={`${quicksand.className} font-bold text-[10px] text-[#ffffff] px-2 py-1 bg-[#BE0101] rounded-[4px]`}
              >
                Giảm 3%
              </span>
            </div>
          </div>
          <div className={`${robotosand.className} flex justify-between`}>
            <div>
              <h2 className="font-bold text-[#141414] text-[16px]">Lắc tay</h2>
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold text-[14px] text-[#141414]">
                  699.000 đ
                </h3>
                <h3 className="font-normal text-[12px] text-[#595959] line-through">
                  800.000 đ
                </h3>
              </div>
            </div>
            <div>
              <div className="text-end">
                <h2 className="text-[#141414] text-[14px] underline">Nữ</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[#595959]">
                  4.8
                </span>
                <Image src={Start} height={16} width={16} alt="icon star" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CartProduct;
