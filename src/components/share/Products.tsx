"use client";
import React, { useCallback, useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { robotosand, quicksand } from "@/font";
import Image from "next/image";
import ArrowDown from "../../../public/icon/arrowdown.svg";
import ArrowRight from "../../../public/icon/arrow-right.svg";
import ArrowLeft from "../../../public/icon/arrow-left.svg";
import IconFilter from "../../../public/icon/mage_filter.svg";
import Filter from "./Filter";
import { Drawer } from "antd";
import IconClose from "../../../public/icon/icon-close.svg";
import { ENDPOINT } from "@/enums/endpoint.enum";
interface ProductsProps {
  endpoint: string;
  endpointFilter?: string;
  isFilter: boolean;
  title: string;
  slug?: string;
  categorySlug?: string;
}

const sortOptions = ["Phổ biến", "Mới nhất", "Giá tăng dần", "Giá giảm dần"];

const Products: React.FC<ProductsProps> = ({
  endpoint,
  endpointFilter,
  isFilter,
  title,
  slug,
  categorySlug,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Phổ biến");

  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [listDanhMucNam, setListDanhMucNam] = useState([]);
  const [listSize, setListSize] = useState([]);

  const [productsData, setProductsData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [filters, setFilters] = useState({
    selectedSizes: [],
    priceRange: [0, 5000],
    selectedTags: [],
    selectedCategories: [],
  });
  // const fetchProducts = async (page: number) => {
  //   const queryParams: any = {
  //     page: page.toString(),
  //     pageSize: pageSize.toString(),
  //     slug: slug,
  //     categorySlug: slug,
  //     categoryDetailSlug: categorySlug,
  //   };

  //   // Thêm các tham số bộ lọc vào query nếu có giá trị
  //   if (filters.selectedCategories.length > 0) {
  //     queryParams.category = filters.selectedCategories.join(",");
  //   }

  //   if (filters.selectedSizes.length > 0) {
  //     queryParams.size = filters.selectedSizes.join(",");
  //   }

  //   if (filters.selectedTags.length > 0) {
  //     if (filters.selectedTags.includes("isBestSeller" as never)) {
  //       queryParams.isBestSeller = "true";
  //     }
  //     if (filters.selectedTags.includes("isNewArrival" as never)) {
  //       queryParams.isNewArrival = "true";
  //     }
  //     if (filters.selectedTags.includes("isSaleHome" as never)) {
  //       queryParams.isSaleHome = "true";
  //     }
  //   }

  //   // Thêm giá nếu có thay đổi
  //   if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) {
  //     queryParams.startPrice = (filters.priceRange[0] * 1000).toString(); // Nhân giá với 1000
  //     queryParams.endPrice = (filters.priceRange[1] * 1000).toString(); // Nhân giá với 1000
  //   }

  //   const url = `${endpoint}?${new URLSearchParams(queryParams).toString()}`;
  //   const res = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
  //     },
  //     cache: "no-store",
  //   });
  //   const data = await res.json();
  //   setProductsData(data);
  // };

  // const fetchListDanhMucNam = async () => {
  //   try {
  //     const res = await fetch(`${endpointFilter}`, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
  //       },
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setListDanhMucNam(data?.data);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách dữ liệu");
  //   }
  // };
  // const fetchListSize = async () => {
  //   try {
  //     const res = await fetch(`${ENDPOINT.GET_LIST_SIZE}`, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
  //       },
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setListSize(data?.data);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách dữ liệu");
  //   }
  // };

  const fetchProducts = useCallback(
    async (page: number) => {
      const queryParams: any = {
        page: page.toString(),
        pageSize: pageSize.toString(),
        slug: slug,
        categorySlug: slug,
        categoryDetailSlug: categorySlug,
      };

      // Thêm các tham số bộ lọc vào query nếu có giá trị
      if (filters.selectedCategories.length > 0) {
        queryParams.category = filters.selectedCategories.join(",");
      }

      if (filters.selectedSizes.length > 0) {
        queryParams.size = filters.selectedSizes.join(",");
      }

      if (filters.selectedTags.length > 0) {
        if (filters.selectedTags.includes("isBestSeller" as never)) {
          queryParams.isBestSeller = "true";
        }
        if (filters.selectedTags.includes("isNewArrival" as never)) {
          queryParams.isNewArrival = "true";
        }
        if (filters.selectedTags.includes("isSaleHome" as never)) {
          queryParams.isSaleHome = "true";
        }
      }

      // Thêm giá nếu có thay đổi
      if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) {
        queryParams.startPrice = (filters.priceRange[0] * 1000).toString(); // Nhân giá với 1000
        queryParams.endPrice = (filters.priceRange[1] * 1000).toString(); // Nhân giá với 1000
      }

      const url = `${endpoint}?${new URLSearchParams(queryParams).toString()}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
        cache: "no-store",
      });
      const data = await res.json();
      setProductsData(data);
    },
    [filters, pageSize, endpoint, slug, categorySlug]
  ); // Thêm dependencies

  // Bọc hàm fetchListDanhMucNam trong useCallback
  const fetchListDanhMucNam = useCallback(async () => {
    try {
      const res = await fetch(`${endpointFilter}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
        cache: "no-store",
      });
      const data = await res.json();
      setListDanhMucNam(data?.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dữ liệu");
    }
  }, [endpointFilter]); // Dependency cho fetchListDanhMucNam

  // Bọc hàm fetchListSize trong useCallback
  const fetchListSize = useCallback(async () => {
    try {
      const res = await fetch(`${ENDPOINT.GET_LIST_SIZE}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
        cache: "no-store",
      });
      const data = await res.json();
      setListSize(data?.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dữ liệu");
    }
  }, []);
  useEffect(() => {
    fetchProducts(currentPage);
    fetchListDanhMucNam();
    fetchListSize();
  }, [currentPage, filters, fetchProducts, fetchListDanhMucNam, fetchListSize]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleNextPage = () => {
    if (currentPage < productsData?.meta?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Tính sản phẩm hiển thị theo trang
  const startIndex = (currentPage - 1) * pageSize;

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
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleFilterChange = (newFilters: any) => {
    // Cập nhật bộ lọc trong state
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Cập nhật các bộ lọc mới
    }));
  };
  return (
    <>
      {" "}
      <div className="container">
        <div className="grid grid-cols-12 gap-2 md:gap-8">
          <div className="hidden md:block col-span-3">
            {isFilter ? (
              <Filter
                listSize={listSize}
                listDanhMucFilter={listDanhMucNam}
                isMobile={false}
                onFilterChange={handleFilterChange}
              />
            ) : (
              ""
            )}
          </div>

          <div
            className={`col-span-12 ${
              isFilter ? " md:col-span-9" : " md:col-span-12"
            }`}
          >
            <h2
              className={`${robotosand.className} text-[24px] text-[#000000] uppercase  pt-4 text-center md:hidden`}
            >
              {title}
            </h2>
            <div className="pb-4 pt-4 md:pt-0">
              <div className="flex justify-between relative">
                <h2
                  className={`${robotosand.className} text-[24px] text-[#000000] uppercase hidden md:block`}
                >
                  {title}
                </h2>
                <div className="md:hidden">
                  <button onClick={() => showDrawer()}>
                    <Image
                      src={IconFilter}
                      width={24}
                      height={24}
                      alt="Icon filter"
                    />
                  </button>
                </div>
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
              {productsData?.data?.map((product: any) => (
                <div key={product.id} className="col-span-6 md:col-span-4">
                  <CartProduct data={product} />
                </div>
              ))}
            </div>

            {/* <div className="mt-8">
              <div className="flex gap-4 flex-row justify-between items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="text-black"
                >
                  <div className="flex items-center gap-2">
                    <Image src={ArrowLeft} alt="icon" width={20} height={20} />
                    <span
                      className={`${quicksand.className} text-[14px] font-medium  hidden md:block`}
                    >
                      Trước
                    </span>
                  </div>
                </button>
                <div className="flex  md:justify-start ">
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
                <button
                  disabled={
                    currentPage === Math.ceil(fakeProducts.length / pageSize)
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                  className=""
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`${quicksand.className} text-[14px] font-medium hidden md:block`}
                    >
                      Sau
                    </span>
                    <Image src={ArrowRight} alt="icon" width={20} height={20} />
                  </div>
                </button>
              </div>
            </div> */}
            <div className="mt-8">
              <div className="flex gap-4 flex-row justify-between items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="text-black"
                >
                  <div className="flex items-center gap-2">
                    <Image src={ArrowLeft} alt="icon" width={20} height={20} />
                    <span
                      className={`${quicksand.className} text-[14px] font-medium  hidden md:block`}
                    >
                      Trước
                    </span>
                  </div>
                </button>

                <div className="flex md:justify-start">
                  {getPageNumbers(
                    currentPage,
                    productsData?.meta?.totalPages || 1
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
                        onClick={() => setCurrentPage(Number(item))}
                        className={`w-[40px] h-[40px] flex items-center justify-center rounded-[8px] ${
                          currentPage === item ? "border border-black" : ""
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={
                    currentPage === (productsData?.meta?.totalPages || 1)
                  }
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`${quicksand.className} text-[14px] font-medium hidden md:block`}
                    >
                      Sau
                    </span>
                    <Image src={ArrowRight} alt="icon" width={20} height={20} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        onClose={onClose}
        placement="left"
        closable={false}
        open={open}
        width="90%"
        rootStyle={{ top: scrollPosition > 0 ? 70 : 120 }}
        style={{
          height: `calc(100vh - ${scrollPosition > 0 ? "70px" : "120px"})`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "auto", // tránh bị ẩn nội dung
        }}
        destroyOnClose
      >
        <div className="">
          <div className="flex justify-between">
            <h5 className="text-[16px] uppercase ">Bộ lọc</h5>
            <button onClick={onClose}>
              <Image src={IconClose} width={24} height={24} alt="Icon" />
            </button>
          </div>
          <Filter
            listSize={listSize}
            listDanhMucFilter={listDanhMucNam}
            isMobile={true}
            onFilterChange={handleFilterChange}
          />
        </div>
      </Drawer>
    </>
  );
};

export default Products;
