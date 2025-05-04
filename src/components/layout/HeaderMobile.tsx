"use client";
import React, { useEffect, useState } from "react";
import Hambuger from "../../../public/icon/Hamburger Menu.svg";
import Logo from "../../../public/images/logo-footer.png";
import CartIcon from "../../../public/icon/cart_icon.svg";
import Image from "next/image";
import { quicksand } from "@/font";
import Link from "next/link";
import { motion } from "framer-motion"; // Import framer-motion
import SearchIcon from "../../../public/icon/Magnifer.png";
import IconClose from "../../../public/icon/material-symbols_close-rounded.svg";
import IconDown from "../../../public/icon/chevron-down2.svg";
import IconUp from "../../../public/icon/chevron-up.svg";
import AvatarImage from "../../../public/icon/avt.jpg";
import Marquee from "react-fast-marquee";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Drawer } from "antd";
const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [headSale, setHeadSale] = useState<any>(null);
  const [headerData, setHeaderData] = useState<any>(null);
  const [isSafari, setIsSafari] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const isSafariBrowser =
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor);
    setIsSafari(isSafariBrowser);
  }, []);

  // Lắng nghe sự kiện cuộn và điều chỉnh padding
  useEffect(() => {
    if (isSafari) {
      const handleScroll = () => {
        const drawerContent = document.querySelector(".drawer-content");

        if (drawerContent) {
          const currentScrollPos = window.scrollY; // Vị trí cuộn hiện tại

          // Nếu Sidebar chưa mở, vẫn có thể áp dụng padding mặc định khi cuộn xuống
          if (!isMenuOpen) {
            drawerContent.classList.add("safari-scrolled");
          }

          // Nếu cuộn xuống và thanh công cụ bị ẩn, thay đổi padding
          if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
            drawerContent.classList.add("safari-scrolled");
          }
          // Nếu cuộn lên và thanh công cụ xuất hiện lại, khôi phục padding
          else if (currentScrollPos < prevScrollPos || currentScrollPos <= 50) {
            drawerContent.classList.remove("safari-scrolled");
          }

          // Cập nhật vị trí cuộn trước (prevScrollPos)
          setPrevScrollPos(currentScrollPos);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isSafari, prevScrollPos, isMenuOpen]);

  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
  const fetchHeaderData = async () => {
    try {
      const data = await apiService.get(ENDPOINT.GET_HEADER); // Gọi API với endpoint của bạn
      setHeaderData(data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  const fetchHeaderSale = async () => {
    try {
      const data = await apiService.get(ENDPOINT.GET_HEAD_SALE); // Gọi API với endpoint của bạn
      setHeadSale(data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  useEffect(() => {
    fetchHeaderSale();
    fetchHeaderData();
  }, []);
  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveIndex(null);
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

  const categories = [
    {
      name: "NAM",
      subcategories: headerData?.nam?.danh_muc_con,
      slug: "nam",
    },
    {
      name: "NỮ",
      subcategories: headerData?.nu?.danh_muc_con,
      slug: "nu",
    },
    {
      name: "UNISEX",
      subcategories: headerData?.unisex?.danh_muc_con,
      slug: "unisex",
    },
    {
      name: "BỘ SƯU TẬP",
      slug: "bo-suu-tap",
    },
    {
      name: "SALE OFF",
      special: true,
      slug: "sale-off",
    },
  ];

  return (
    <>
      <div className="bg-[#EBEBEB] py-[12px] md:hidden">
        <div
          className={`flex justify-center gap-[100px] text-[14px] font-bold font-quicksand ${quicksand.className}`}
        >
          <div className="container">
            <Marquee speed={50} gradient={false}>
              <span>
                {headSale?.data?.attributes?.content1 ||
                  "Nhập mã SAM5 giảm 5% tất cả sản phẩm"}
              </span>
              <span className="px-10"> ● </span>
              <span>
                {headSale?.data?.attributes?.content2 ||
                  "Free ship cho đơn hàng 500k"}
              </span>
            </Marquee>
          </div>
        </div>
      </div>
      <div className="bg-[#000000] px-2 md:px-4 py-6 sticky top-0 z-50  md:hidden">
        <div className="flex justify-between">
          <div onClick={toggleMenu}>
            <Image src={Hambuger} alt="Icon" />
          </div>
          <div>
            <Link href="/">
              <Image src={Logo} className="w-[78px] " alt="Logo" />
            </Link>
          </div>
          <div>
            <Link href="/gio-hang">
              <Image src={CartIcon} alt="Logo" />
            </Link>
          </div>
        </div>
      </div>

      <Drawer
        className="drawer"
        placement="left"
        open={isMenuOpen}
        onClose={toggleMenu}
        closable={false}
        title={null}
        width="90%"
        rootStyle={{ top: scrollPosition > 0 ? 70 : 120 }} // đơn vị là px
        style={{
          height: `calc(100vh - ${scrollPosition > 0 ? "70px" : "120px"})`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "auto", // tránh bị ẩn nội dung
        }}
        destroyOnClose
      >
        <div className="flex flex-col h-full justify-between">
          <div className={`${quicksand.className} flex-grow`}>
            <div className="flex gap-4 items-center justify-between">
              <div className="w-[85%] relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="outline-none rounded-full h-[44px] w-full pl-10 text-[14px] placeholder:text-[#383838] placeholder:text-[14px] bg-[#EBEBEB]"
                />
                <Image
                  src={SearchIcon}
                  alt="Icon"
                  className="absolute left-3 top-[50%] transform -translate-y-[50%] w-[20px] h-[20px]"
                />
              </div>
              <button onClick={() => toggleMenu()}>
                <Image
                  src={IconClose}
                  alt="icon"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
            <div className="flex-grow pt-[50px]">
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index}>
                    <div
                      onClick={() =>
                        category.subcategories ? handleToggle(index) : null
                      }
                      className="flex justify-between items-center cursor-pointer p-2"
                    >
                      {category.special ? (
                        <>
                          <Link
                            className="text-[#383838]"
                            onClick={() => {
                              toggleMenu();
                            }}
                            href={`/${category.slug}`}
                          >
                            <span
                              className={`text-[15px] font-bold uppercase text-[#EB0000]`}
                            >
                              {category.name}
                            </span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <span
                            className={`text-[15px] font-bold uppercase !text-[#000] ${
                              category.special ? "text-[#EB0000]" : ""
                            }`}
                          >
                            <Link
                              onClick={() => {
                                toggleMenu();
                              }}
                              className="text-[#000]"
                              href={`${category.slug}`}
                            >
                              {category.name}
                            </Link>
                          </span>
                        </>
                      )}

                      {category.subcategories && (
                        <Image
                          src={activeIndex === index ? IconUp : IconDown}
                          alt="toggle icon"
                          className="w-6 h-6"
                        />
                      )}
                    </div>

                    {category.subcategories && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: activeIndex === index ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 pt-4 space-y-2">
                          <div className="text-sm">
                            <Link
                              className="text-[#383838]"
                              onClick={() => {
                                toggleMenu();
                              }}
                              href={`/${category.slug}`} // Chỉ trỏ đến danh mục tổng hợp
                            >
                              Tất cả
                            </Link>
                          </div>
                          {category.subcategories.map(
                            (subcategory: any, subIndex: any) => (
                              <div key={subIndex} className="text-sm">
                                <Link
                                  className="text-[#383838]"
                                  onClick={() => {
                                    toggleMenu();
                                  }}
                                  href={`/${category.slug}/${subcategory?.slug}`}
                                >
                                  {" "}
                                  {subcategory?.title}
                                </Link>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="drawer-content">
            <div className="flex justify-between items-center">
              <div>
                <Image
                  src={AvatarImage}
                  alt="người dùng"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
              <Link
                onClick={() => toggleMenu()}
                className="text-[#595959] link-header text-[16px] font-medium"
                href="/gioi-thieu"
              >
                Giới Thiệu
              </Link>
              <Link
                onClick={() => toggleMenu()}
                className="text-[#595959] link-header text-[16px] font-medium"
                href="/bang-size"
              >
                Bảng size
              </Link>
              <Link
                onClick={() => toggleMenu()}
                className="text-[#595959] link-header text-[16px] font-medium"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                onClick={() => toggleMenu()}
                className="text-[#595959] link-header text-[16px] font-medium"
                href="/lien-he"
              >
                Liên Hệ
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderMobile;
