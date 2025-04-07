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
const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const categories = [
    {
      name: "NAM",
      subcategories: [
        "Tất cả",
        "Dây chuyền",
        "Nhẫn",
        "Lắc tai",
        "Bông tai",
        "Bộ trang sức",
      ],
    },
    {
      name: "NỮ",
      subcategories: [
        "Tất cả",
        "Dây chuyền",
        "Nhẫn",
        "Lắc tai",
        "Bông tai",
        "Bộ trang sức",
      ],
    },
    {
      name: "UNISEX",
      subcategories: [
        "Tất cả",
        "Dây chuyền",
        "Nhẫn",
        "Lắc tai",
        "Bông tai",
        "Bộ trang sức",
      ],
    },
    {
      name: "BỘ SƯU TẬP",
      subcategories: ["Dây chuyền", "Nhẫn", "Lắc tai", "Bông tai"],
    },
    {
      name: "SALE OFF",
      special: true,
    },
  ];

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
  return (
    <>
      {" "}
      <div className="bg-[#EBEBEB] py-[12px] md:hidden">
        <div
          className={`flex justify-center gap-[100px] text-[14px] font-bold font-quicksand ${quicksand.className}`}
        >
          <span>Nhập mã SAM5 giảm 5% tất cả sản phẩm</span>
        </div>
      </div>
      <div className="bg-[#000000] px-4 py-6 sticky top-0 z-50  md:hidden">
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
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 w-[90%]  bg-white z-40 p-6 flex flex-col"
        style={{
          top: scrollPosition > 0 ? "70px" : "120px", // Adjust top position based on scroll
          height: `calc(100vh - ${scrollPosition > 0 ? "70px" : "120px"})`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add shadow to menu
        }}
      >
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
              <Image src={IconClose} alt="icon" className="w-[24px] h-[24px]" />
            </button>
          </div>
          <div className="flex-grow pt-[50px]">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index}>
                  {/* Accordion Header */}
                  <div
                    onClick={() =>
                      category.subcategories ? handleToggle(index) : null
                    } // Only toggle if subcategories exist
                    className="flex justify-between items-center cursor-pointer p-2"
                  >
                    {category.special ? (
                      <>
                        <Link
                          onClick={() => {
                            toggleMenu();
                          }}
                          href="/tat-ca-san-pham"
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
                        {" "}
                        <span
                          className={`text-[15px] font-bold uppercase ${
                            category.special ? "text-[#EB0000]" : ""
                          }`}
                        >
                          {category.name}
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

                  {/* Accordion Content */}
                  {category.subcategories && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: activeIndex === index ? "auto" : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pt-4 space-y-2">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <div key={subIndex} className="text-sm">
                            <Link
                              onClick={() => {
                                toggleMenu();
                              }}
                              href="/tat-ca-san-pham"
                            >
                              {" "}
                              {subcategory}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between">
            <div>
              <Image
                src={AvatarImage}
                alt="người dùng"
                className="w-[32px] h-[32px] rounded-full"
              />
            </div>
            <Link
              onClick={() => toggleMenu()}
              className="text-[#595959] text-[16px] font-medium"
              href="/gioi-thieu"
            >
              Giới Thiệu
            </Link>
            <Link
              onClick={() => toggleMenu()}
              className="text-[#595959] text-[16px] font-medium"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              onClick={() => toggleMenu()}
              className="text-[#595959] text-[16px] font-medium"
              href="/lien-he"
            >
              Liên Hệ
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HeaderMobile;
