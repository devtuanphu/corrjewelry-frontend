"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { quicksand, robotosand } from "@/font";
import { worksand } from "@/font";
import SearchIcon from "../../../public/icon/search_icon.svg";
import CartIcon from "../../../public/icon/cart_icon.svg";
import Diamond from "../../../public/icon/diamond.svg";
import UserIcon from "../../../public/icon/user_icon.svg";
import { CloseOutlined } from "@ant-design/icons";
import CardProductOrder from "../share/CardProductOrder";
import IconArrowWhite from "../../../public/icon/arrow-down-bold 1.png";
import VoucherIcon from "../../../public/icon/voucher.svg";
import VideoImage from "../../../public/images/video.jpg";
import PlayIcon from "../../../public/images/play.svg";
import PlayIconBack from "../../../public/images/play-circle.png";
import HeaderMobile from "./HeaderMobile";
type MenuKey = "nu" | "nam" | "unisex";
const menuData = {
  nam: [
    {
      title: "Dây chuyền",
      items: [
        "Dây chuyền mảnh",
        "Dây chuyền đính đá",
        "Dây chuyền hình học",
        "Dây chuyền kiểu dáng vintage",
        "Dây chuyền kim cương",
        "Dây chuyền bạc",
      ],
    },
    {
      title: "Vòng tay",
      items: [
        "Vòng tay da",
        "Vòng tay bạc",
        "Vòng tay kim loại",
        "Vòng tay ngọc trai",
        "Vòng tay đá quý",
        "Vòng tay nam tính",
      ],
    },
    {
      title: "Nhẫn",
      items: [
        "Nhẫn cưới",
        "Nhẫn phong thủy",
        "Nhẫn kim cương",
        "Nhẫn đá quý",
        "Nhẫn bạc",
        "Nhẫn vàng",
      ],
    },
    {
      title: "Bông tai",
      items: [
        "Bông tai vàng",
        "Bông tai bạc",
        "Bông tai kim cương",
        "Bông tai ngọc trai",
        "Bông tai nam tính",
        "Bông tai đá quý",
      ],
    },
    {
      title: "Mặt dây chuyền",
      items: [
        "Mặt dây chuyền bạc",
        "Mặt dây chuyền vàng",
        "Mặt dây chuyền kim cương",
        "Mặt dây chuyền đá quý",
        "Mặt dây chuyền phật bản mệnh",
        "Mặt dây chuyền kiểu dáng cổ điển",
      ],
    },
    {
      title: "Lắc tay",
      items: [
        "Lắc tay bạc",
        "Lắc tay vàng",
        "Lắc tay kim cương",
        "Lắc tay đá quý",
        "Lắc tay phong thủy",
        "Lắc tay thể thao",
      ],
    },
  ],
  nu: [
    {
      title: "Dây chuyền",
      items: [
        "Dây chuyền mảnh",
        "Dây chuyền đính đá",
        "Dây chuyền hình học",
        "Dây chuyền kiểu dáng vintage",
        "Dây chuyền kim cương",
        "Dây chuyền bạc",
      ],
    },
    {
      title: "Vòng tay",
      items: [
        "Vòng tay nữ",
        "Vòng tay ngọc trai",
        "Vòng tay kim cương",
        "Vòng tay đá quý",
        "Vòng tay bạc",
        "Vòng tay vàng",
      ],
    },
    {
      title: "Nhẫn",
      items: [
        "Nhẫn cưới",
        "Nhẫn phong thủy",
        "Nhẫn kim cương",
        "Nhẫn đá quý",
        "Nhẫn bạc",
        "Nhẫn vàng",
      ],
    },
    {
      title: "Bông tai",
      items: [
        "Bông tai vàng",
        "Bông tai bạc",
        "Bông tai kim cương",
        "Bông tai ngọc trai",
        "Bông tai đá quý",
        "Bông tai kiểu dáng thời trang",
      ],
    },
    {
      title: "Mặt dây chuyền",
      items: [
        "Mặt dây chuyền bạc",
        "Mặt dây chuyền vàng",
        "Mặt dây chuyền kim cương",
        "Mặt dây chuyền đá quý",
        "Mặt dây chuyền phật bản mệnh",
        "Mặt dây chuyền kiểu dáng cổ điển",
      ],
    },
    {
      title: "Lắc tay",
      items: [
        "Lắc tay nữ",
        "Lắc tay vàng",
        "Lắc tay kim cương",
        "Lắc tay đá quý",
        "Lắc tay phong thủy",
        "Lắc tay thể thao",
      ],
    },
  ],
  unisex: [
    {
      title: "Dây chuyền",
      items: [
        "Dây chuyền mảnh",
        "Dây chuyền đính đá",
        "Dây chuyền hình học",
        "Dây chuyền kiểu dáng vintage",
        "Dây chuyền kim cương",
        "Dây chuyền bạc",
      ],
    },
    {
      title: "Vòng tay",
      items: [
        "Vòng tay da",
        "Vòng tay bạc",
        "Vòng tay kim loại",
        "Vòng tay ngọc trai",
        "Vòng tay đá quý",
        "Vòng tay phong thủy",
      ],
    },
    {
      title: "Nhẫn",
      items: [
        "Nhẫn cưới",
        "Nhẫn phong thủy",
        "Nhẫn kim cương",
        "Nhẫn đá quý",
        "Nhẫn bạc",
        "Nhẫn vàng",
      ],
    },
    {
      title: "Bông tai",
      items: [
        "Bông tai vàng",
        "Bông tai bạc",
        "Bông tai kim cương",
        "Bông tai ngọc trai",
        "Bông tai đá quý",
        "Bông tai thiết kế đặc biệt",
      ],
    },
    {
      title: "Mặt dây chuyền",
      items: [
        "Mặt dây chuyền bạc",
        "Mặt dây chuyền vàng",
        "Mặt dây chuyền kim cương",
        "Mặt dây chuyền đá quý",
        "Mặt dây chuyền phật bản mệnh",
        "Mặt dây chuyền kiểu dáng cổ điển",
      ],
    },
    {
      title: "Lắc tay",
      items: [
        "Lắc tay bạc",
        "Lắc tay vàng",
        "Lắc tay kim cương",
        "Lắc tay đá quý",
        "Lắc tay phong thủy",
        "Lắc tay thời trang",
      ],
    },
  ],
  bosuutap: [
    {
      title: "Dây chuyền",
      items: [
        "Dây chuyền mảnh",
        "Dây chuyền đính đá",
        "Dây chuyền hình học",
        "Dây chuyền kiểu dáng vintage",
        "Dây chuyền kim cương",
        "Dây chuyền bạc",
      ],
    },
    {
      title: "Vòng tay",
      items: [
        "Vòng tay da",
        "Vòng tay bạc",
        "Vòng tay kim loại",
        "Vòng tay ngọc trai",
        "Vòng tay đá quý",
        "Vòng tay phong thủy",
      ],
    },
    {
      title: "Nhẫn",
      items: [
        "Nhẫn cưới",
        "Nhẫn phong thủy",
        "Nhẫn kim cương",
        "Nhẫn đá quý",
        "Nhẫn bạc",
        "Nhẫn vàng",
      ],
    },
    {
      title: "Bông tai",
      items: [
        "Bông tai vàng",
        "Bông tai bạc",
        "Bông tai kim cương",
        "Bông tai ngọc trai",
        "Bông tai đá quý",
        "Bông tai thiết kế đặc biệt",
      ],
    },
    {
      title: "Mặt dây chuyền",
      items: [
        "Mặt dây chuyền bạc",
        "Mặt dây chuyền vàng",
        "Mặt dây chuyền kim cương",
        "Mặt dây chuyền đá quý",
        "Mặt dây chuyền phật bản mệnh",
        "Mặt dây chuyền kiểu dáng cổ điển",
      ],
    },
    {
      title: "Lắc tay",
      items: [
        "Lắc tay bạc",
        "Lắc tay vàng",
        "Lắc tay kim cương",
        "Lắc tay đá quý",
        "Lắc tay phong thủy",
        "Lắc tay thời trang",
      ],
    },
  ],
};

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY); // Cập nhật giá trị scroll khi cuộn trang
  };

  useEffect(() => {
    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const topPosition = scrollY > 0 ? 72 : 120; // Nếu có cuộn, top là 72, nếu không thì 120
  const heightValue = `calc(100vh - ${topPosition}px)`; // Tính chiều cao của giỏ hàng

  const RenderMegaMenu = () => {
    const selectedMenu = menuData[hoveredMenu as MenuKey] || []; // Chọn menu dựa trên hoveredMenu, đảm bảo hoveredMenu có kiểu chính xác

    return (
      <>
        {selectedMenu.length > 0 && (
          <div
            className={`${quicksand.className} w-full bg-white text-black shadow-lg py-8 px-6`}
            style={{
              position: "fixed", // MegaMenu luôn cố định ở phần đầu
              top: scrollY > 0 ? "72px" : "190px", // Cập nhật top khi cuộn
              left: 0,
              right: 0,
              zIndex: 50, // Đảm bảo MegaMenu luôn nằm trên các phần tử khác
            }}
          >
            <div className="container">
              <div className="grid grid-cols-12 gap-8 z-40">
                <div className="col-span-6">
                  <div className="grid grid-cols-12 gap-8">
                    {selectedMenu.map((category: any, index: any) => (
                      <div key={index} className="col-span-6">
                        <div>
                          <h4 className="text-[14px] text-[#000000] font-semibold mb-2">
                            {category.title}
                          </h4>
                          <ul className="space-y-1 text-sm list-disc pl-[20px]">
                            {category.items.map((item: any, itemIndex: any) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex gap-4">
                    <div className="relative bg-gray-200 mb-4 w-[176px] h-[104px]">
                      <Image
                        src={VideoImage}
                        alt="video"
                        className="w-full h-full object-cover rounded-[6px]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={PlayIcon}
                          alt="icon"
                          className="w-[48px] h-[48px]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h5 className="text-[16px] font-semibold text-[#101828]">
                        How to get started
                      </h5>
                      <p className="text-[14px] text-[#475467]">
                        Jump right in — get an overview of the basics and get
                        started.
                      </p>
                      <div className="flex gap-2">
                        <div>
                          <Image
                            src={PlayIconBack}
                            width={20}
                            height={20}
                            alt="Icon"
                          />
                        </div>
                        <p className="text-[14px] font-semibold text-[#2A2A2A]">
                          Watch video
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const HeaderDesktop = () => {
    return (
      <>
        {" "}
        <div className="bg-[#EBEBEB] py-[12px]">
          <div
            className={`flex justify-center gap-[100px] text-[14px] font-bold font-quicksand ${quicksand.className}`}
          >
            <span>Nhập mã SAM5 giảm 5% tất cả sản phẩm</span>
            <span>●</span>
            <span> Free ship cho đơn hàng 500k</span>
          </div>
        </div>
        <div className="bg-[#141414] pt-[12px]">
          <div className="container">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Link href="/">
                  <Image src={Logo} alt="Logo" width={136} height={65} />
                </Link>
                <div>
                  <ul
                    className={`text-[#E6E6E6] text-[14px] font-medium flex gap-[24px] ${worksand.className}`}
                  >
                    <li>
                      <Link href="/gioi-thieu">Giới thiệu</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/lien-he">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#141414] sticky top-0 z-50 py-[24px] ">
          <div className="container">
            <div className="flex justify-between ">
              <ul
                className={`flex text-[#E6E6E6] gap-[24px] ${worksand.className}`}
              >
                <li
                  className={`relative ${
                    hoveredMenu === "nam" ? "border-b-2 border-white" : ""
                  }`}
                  onMouseEnter={() => setHoveredMenu("nam")}
                  onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
                >
                  <Link href="/tat-ca-san-pham">NAM</Link>
                </li>
                <li
                  className={`relative ${
                    hoveredMenu === "nu" ? "border-b-2 border-white" : ""
                  }`}
                  onMouseEnter={() => setHoveredMenu("nu")}
                >
                  <Link href="/tat-ca-san-pham" className="pb-1">
                    NỮ
                  </Link>
                </li>
                <li
                  className={`relative ${
                    hoveredMenu === "unisex" ? "border-b-2 border-white" : ""
                  }`}
                  onMouseEnter={() => setHoveredMenu("unisex")}
                  onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
                >
                  <Link href="/tat-ca-san-pham">UNISEX</Link>
                </li>
                <li
                  className={`relative ${
                    hoveredMenu === "bosuutap" ? "border-b-2 border-white" : ""
                  }`}
                  onMouseEnter={() => setHoveredMenu("bosuutap")}
                  onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
                >
                  <Link href="/bo-suu-tap">BỘ SƯU TẬP</Link>
                </li>
                <li className="text-[#FF8F8F]">
                  <Link href="/tat-ca-san-pham">SALE OFF</Link>
                </li>
              </ul>
              <div className="flex gap-[30px]">
                <Image
                  src={SearchIcon}
                  className="cursor-pointer"
                  alt="icon-cart"
                  width={24}
                  height={24}
                />
                <Image
                  onClick={handleCartClick}
                  src={CartIcon}
                  alt="icon-cart"
                  className="cursor-pointer"
                  width={24}
                  height={24}
                />

                {/* <div className="relative">
                <Image
                  src={UserIcon}
                  className="cursor-pointer"
                  alt="icon-cart"
                  width={17.5}
                  height={17.5}
                />
               
                <div className="absolute bottom-0 right-0">
                  <div className="h-[9px] w-[9px] flex justify-center items-center rounded-full bg-[#ECA100]">
                    <Image src={Diamond} height={5} width={5} alt="diamond" />
                  </div>
                </div>
              </div> */}
                <Link
                  className={`${worksand.className} text-[16px] text-[#E6E6E6]`}
                  href="/dang-nhap"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
        {isCartOpen && (
          <div
            className="fixed right-0 w-[40%] bg-white shadow-lg z-50 transition-all duration-500 ease-in-out transform"
            style={{
              top: `${topPosition}px`, // Áp dụng top dựa trên scroll
              height: heightValue, // Áp dụng chiều cao động cho giỏ hàng
              visibility: isCartOpen ? "visible" : "hidden", // Đảm bảo giỏ hàng không gây sự chú ý khi ẩn
              opacity: isCartOpen ? 1 : 0, // Đảm bảo giỏ hàng mờ đi khi ẩn
              transform: isCartOpen ? "translateX(0)" : "translateX(100%)", // Thêm hiệu ứng trượt từ phải qua
            }}
          >
            <div className="flex flex-col h-full">
              <div className="p-8 flex-1">
                <h2
                  className={`${robotosand.className} font-medium text-[18px] text-[#000000] mb-4`}
                >
                  Giỏ hàng (2)
                </h2>
                {/* Add your cart content here */}
                <div className="py-4 flex flex-col gap-6">
                  <CardProductOrder />
                  <CardProductOrder />
                </div>
              </div>

              {/* Nút thanh toán sẽ luôn nằm ở cuối */}
              <div className="p-8 pt-0 ">
                <div className="pb-4">
                  <div className="flex gap-4">
                    <div className="relative w-[80%]">
                      <input
                        type="text"
                        className="py-6 h-[44px] pl-[50px] pr-[12px] w-full bg-[#F0F0F0] outline-none"
                        placeholder="Nhập mã giảm giá"
                      />
                      <Image
                        src={VoucherIcon}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] "
                        alt="Voucher Icon"
                      />
                    </div>
                    <button className="h-[44px] bg-[#C1C1C1] text-white px-7">
                      Áp dụng
                    </button>
                  </div>
                </div>
                <div className="flex justify-between pb-4">
                  <h5 className="text-[18px] font-semibold">TỔNG TIỀN</h5>
                  <span className="text-[#1D242D] font-bold text-[18px]">
                    1.799.000 đ
                  </span>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/gio-hang"
                    className="px-[100px] bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex gap-4"
                    onClick={() => setIsCartOpen(false)} // Tắt giỏ hàng khi nhấn vào nút Thanh toán
                  >
                    <span> Thanh toán</span>

                    <Image src={IconArrowWhite} alt="Icon" />
                  </Link>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 text-2xl text-gray-700"
                onClick={handleCartClick}
              >
                <CloseOutlined />
              </button>
            </div>
          </div>
        )}
        <div onMouseLeave={() => setHoveredMenu(null)}>
          <RenderMegaMenu />
        </div>
      </>
    );
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Điều chỉnh theo kích thước màn hình của bạn
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi khi load lần đầu

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <>
      {" "}
      <div className="bg-[#EBEBEB] py-[12px] hidden md:block">
        <div
          className={`flex justify-center gap-[100px] text-[14px] font-bold font-quicksand ${quicksand.className}`}
        >
          <span>Nhập mã SAM5 giảm 5% tất cả sản phẩm</span>
          <span>●</span>
          <span> Free ship cho đơn hàng 500k</span>
        </div>
      </div>
      <div className="bg-[#141414] pt-[12px] hidden md:block">
        <div className="container">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Image src={Logo} alt="Logo" width={136} height={65} />
              </Link>
              <div>
                <ul
                  className={`text-[#E6E6E6] text-[14px] font-medium flex gap-[24px] ${worksand.className}`}
                >
                  <li>
                    <Link href="/gioi-thieu">Giới thiệu</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/lien-he">Liên hệ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#141414] sticky top-0 z-50 py-[24px] hidden md:block">
        <div className="container">
          <div className="flex justify-between ">
            <ul
              className={`flex text-[#E6E6E6] gap-[24px] ${worksand.className}`}
            >
              <li
                className={`relative ${
                  hoveredMenu === "nam" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("nam")}
                onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
              >
                <Link href="/tat-ca-san-pham">NAM</Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "nu" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("nu")}
              >
                <Link href="/tat-ca-san-pham" className="pb-1">
                  NỮ
                </Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "unisex" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("unisex")}
                onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
              >
                <Link href="/tat-ca-san-pham">UNISEX</Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "bosuutap" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("bosuutap")}
                onMouseLeave={() => setHoveredMenu(null)} // Reset when mouse leaves
              >
                <Link href="/bo-suu-tap">BỘ SƯU TẬP</Link>
              </li>
              <li className="text-[#FF8F8F]">
                <Link href="/tat-ca-san-pham">SALE OFF</Link>
              </li>
            </ul>
            <div className="flex gap-[30px]">
              <Image
                src={SearchIcon}
                className="cursor-pointer"
                alt="icon-cart"
                width={24}
                height={24}
              />
              <Image
                onClick={handleCartClick}
                src={CartIcon}
                alt="icon-cart"
                className="cursor-pointer"
                width={24}
                height={24}
              />

              {/* <div className="relative">
                <Image
                  src={UserIcon}
                  className="cursor-pointer"
                  alt="icon-cart"
                  width={17.5}
                  height={17.5}
                />
               
                <div className="absolute bottom-0 right-0">
                  <div className="h-[9px] w-[9px] flex justify-center items-center rounded-full bg-[#ECA100]">
                    <Image src={Diamond} height={5} width={5} alt="diamond" />
                  </div>
                </div>
              </div> */}
              <Link
                className={`${worksand.className} text-[16px] text-[#E6E6E6]`}
                href="/dang-nhap"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div
          className="fixed right-0 w-[40%] bg-white shadow-lg z-50 transition-all duration-500 ease-in-out transform"
          style={{
            top: `${topPosition}px`, // Áp dụng top dựa trên scroll
            height: heightValue, // Áp dụng chiều cao động cho giỏ hàng
            visibility: isCartOpen ? "visible" : "hidden", // Đảm bảo giỏ hàng không gây sự chú ý khi ẩn
            opacity: isCartOpen ? 1 : 0, // Đảm bảo giỏ hàng mờ đi khi ẩn
            transform: isCartOpen ? "translateX(0)" : "translateX(100%)", // Thêm hiệu ứng trượt từ phải qua
          }}
        >
          <div className="flex flex-col h-full">
            <div className="p-8 flex-1">
              <h2
                className={`${robotosand.className} font-medium text-[18px] text-[#000000] mb-4`}
              >
                Giỏ hàng (2)
              </h2>
              {/* Add your cart content here */}
              <div className="py-4 flex flex-col gap-6">
                <CardProductOrder />
                <CardProductOrder />
              </div>
            </div>

            {/* Nút thanh toán sẽ luôn nằm ở cuối */}
            <div className="p-8 pt-0 ">
              <div className="pb-4">
                <div className="flex gap-4">
                  <div className="relative w-[80%]">
                    <input
                      type="text"
                      className="py-6 h-[44px] pl-[50px] pr-[12px] w-full bg-[#F0F0F0] outline-none"
                      placeholder="Nhập mã giảm giá"
                    />
                    <Image
                      src={VoucherIcon}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] "
                      alt="Voucher Icon"
                    />
                  </div>
                  <button className="h-[44px] bg-[#C1C1C1] text-white px-7">
                    Áp dụng
                  </button>
                </div>
              </div>
              <div className="flex justify-between pb-4">
                <h5 className="text-[18px] font-semibold">TỔNG TIỀN</h5>
                <span className="text-[#1D242D] font-bold text-[18px]">
                  1.799.000 đ
                </span>
              </div>
              <div className="flex justify-end">
                <Link
                  href="/gio-hang"
                  className="px-[100px] bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex gap-4"
                  onClick={() => setIsCartOpen(false)} // Tắt giỏ hàng khi nhấn vào nút Thanh toán
                >
                  <span> Thanh toán</span>

                  <Image src={IconArrowWhite} alt="Icon" />
                </Link>
              </div>
            </div>

            <button
              className="absolute top-4 right-4 text-2xl text-gray-700"
              onClick={handleCartClick}
            >
              <CloseOutlined />
            </button>
          </div>
        </div>
      )}
      <div onMouseLeave={() => setHoveredMenu(null)}>
        <RenderMegaMenu />
      </div>
      <HeaderMobile />
    </>
  );
};

export default Header;
