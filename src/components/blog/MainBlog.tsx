"use client";
import { robotosand } from "@/font";
import React, { useState } from "react";
import CartBlog from "../share/CartBlog";
import ArrowLeft from "../../../public/icon/arrow-left.svg";
import ArrowRight from "../../../public/icon/arrow-right.svg";
import Image from "next/image";

// Fake blog data
const fakeBlogs = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
}));

const MainBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.ceil(fakeBlogs.length / pageSize);
  const currentBlogs = fakeBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = (
    current: number,
    total: number
  ): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (total <= 6) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total - 2, total - 1, total);
      } else if (current >= total - 2) {
        pages.push(1, 2, 3, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  };

  return (
    <div className="container">
      <div className="flex justify-center pt-4 pb-12">
        <h2
          className={`${robotosand.className} relative text-[20px] font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
        >
          <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
          BLOG
          <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
        </h2>
      </div>

      {/* Grid blogs */}
      <div className="grid grid-cols-12 gap-4">
        {currentBlogs.map((blog) => (
          <div className="col-span-12 md:col-span-4" key={blog.id}>
            <CartBlog />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col gap-4 items-center md:flex-row md:justify-between">
        {/* Nút Trước */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50"
        >
          <div className="flex items-center gap-1 md:gap-2">
            <Image
              src={ArrowLeft}
              alt="prev"
              width={16}
              height={16}
              className="md:w-[20px] md:h-[20px]"
            />
            <span className="text-sm font-medium">Trước</span>
          </div>
        </button>

        {/* Danh sách số trang */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-2">
          {getPageNumbers(currentPage, totalPages).map((page, i) =>
            page === "..." ? (
              <span
                key={i}
                className="min-w-[40px] h-[40px] flex items-center justify-center text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => handlePageChange(Number(page))}
                className={`min-w-[40px] h-[40px] rounded-[8px] flex items-center justify-center text-sm ${
                  currentPage === page ? "border border-black" : ""
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Nút Sau */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50"
        >
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-sm font-medium">Sau</span>
            <Image
              src={ArrowRight}
              alt="next"
              width={16}
              height={16}
              className="md:w-[20px] md:h-[20px]"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MainBlog;
