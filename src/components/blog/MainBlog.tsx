"use client";
import React, { useEffect, useState } from "react";
import CartBlog from "../share/CartBlog";
import { robotosand } from "@/font";
import Image from "next/image";
import ArrowLeft from "../../../public/icon/arrow-left.svg";
import ArrowRight from "../../../public/icon/arrow-right.svg";
import { ENDPOINT } from "@/enums/endpoint.enum";

const MainBlog = () => {
  const [blogData, setBlogData] = useState<any>([]); // Lưu trữ dữ liệu blog
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [pageSize] = useState(9); // Số lượng blog trên mỗi trang

  // Hàm fetch để lấy danh sách blog
  const fetchBlogs = async (page: number) => {
    const queryParams: any = {
      "pagination[page]": page.toString(), // Sử dụng 'page' thay cho 'offset'
      "pagination[pageSize]": pageSize.toString(),
      populate: "seo.thumbnail",
    };

    const url = `${ENDPOINT.GET_BLOG}?${new URLSearchParams(
      queryParams
    ).toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      setBlogData(data?.data); // Set dữ liệu blog
      setTotalPages(data?.meta?.pagination?.pageCount); // Cập nhật tổng số trang từ API
    } else {
      console.error("Failed to fetch blog data");
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage); // Fetch dữ liệu khi component mount hoặc khi thay đổi trang
  }, [currentPage]); // Phụ thuộc vào currentPage

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Cập nhật trang hiện tại
    }
  };

  // Hàm tính số trang để hiển thị
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
      <div className="flex justify-center pt-4 pb-12">
        <h2
          className={`${robotosand.className} relative text-[20px] font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
        >
          <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
          BLOG
          <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {blogData.map((item: any) => {
          return (
            <>
              <div className="col-span-12 md:col-span-4" key={item.id}>
                <CartBlog data={item} />
              </div>
            </>
          );
        })}
      </div>

      {/* Phân trang */}
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
                className={`min-w-[40px] h-[40px] flex items-center justify-center text-sm ${
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
