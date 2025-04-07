"use client";
import React, { useState } from "react";
import CartProduct from "./CartProduct";
import { robotosand, quicksand } from "@/font";
import Image from "next/image";
import ArrowDown from "../../../public/icon/arrowdown.svg";
import ArrowRight from "../../../public/icon/arrow-right.svg";
import ArrowLeft from "../../../public/icon/arrow-left.svg";
import Filter from "./Filter";

const sortOptions = ["Phổ biến", "Mới nhất", "Giá tăng dần", "Giá giảm dần"];

// Tạo danh sách sản phẩm giả lập
const fakeProducts = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
}));

const Products = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Phổ biến");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính sản phẩm hiển thị theo trang
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = fakeProducts.slice(startIndex, startIndex + pageSize);
  const getPageNumbers = (
    current: number,
    total: number
  ): (number | string)[] => {
    if (total <= 6) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1, 2, 3];

    if (total > 6) {
      pages.push("...");

      pages.push(total - 2, total - 1, total);
    }

    return pages;
  };

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-8">
        <div className="hidden md:block col-span-3">
          <Filter />
        </div>

        <div className="col-span-12 md:col-span-9">
          {/* Header */}
          <div className="pb-4 pt-4 md:pt-0">
            <div className="flex justify-between relative">
              <h2
                className={`${robotosand.className} text-[24px] text-[#000000] uppercase`}
              >
                Sản phẩm nữ
              </h2>

              {/* Dropdown Sort */}
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`${quicksand.className} flex items-center gap-1 text-[16px] text-[#000000]`}
                >
                  Sắp xếp: <span className="font-bold">{selectedOption}</span>
                  <Image src={ArrowDown} alt="arrow" width={12} height={12} />
                </button>

                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md border border-gray-200 rounded-md z-10">
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          option === selectedOption
                            ? "font-semibold bg-gray-50"
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-12 gap-2 md:gap-8">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-span-6 md:col-span-4">
                <CartProduct />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              {/* Prev & Next (trên mobile gộp vào dưới) */}
              <div className="flex justify-between md:order-none order-2">
                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="text-black"
                >
                  <div className="flex items-center gap-2">
                    <Image src={ArrowLeft} alt="icon" width={20} height={20} />
                    <span
                      className={`${quicksand.className} text-[14px] font-medium`}
                    >
                      Trước
                    </span>
                  </div>
                </button>

                {/* Next */}
                <button
                  disabled={
                    currentPage === Math.ceil(fakeProducts.length / pageSize)
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                  className=""
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`${quicksand.className} text-[14px] font-medium`}
                    >
                      Sau
                    </span>
                    <Image src={ArrowRight} alt="icon" width={20} height={20} />
                  </div>
                </button>
              </div>

              {/* Page Numbers */}
              <div className="flex justify-center md:justify-start gap-2 order-1 md:order-none">
                {getPageNumbers(
                  currentPage,
                  Math.ceil(fakeProducts.length / pageSize)
                ).map((item, index) => {
                  if (item === "...") {
                    return (
                      <span
                        key={index}
                        className="w-[40px] h-[40px] flex items-center justify-center text-black"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={item}
                      onClick={() => handlePageChange(Number(item))}
                      className={`w-[40px] h-[40px] flex items-center justify-center rounded-[8px] ${
                        currentPage === item ? "border border-black" : ""
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
