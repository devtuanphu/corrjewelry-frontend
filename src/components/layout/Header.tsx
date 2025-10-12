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
import PlayIcon from "../../../public/images/play.svg";
import PlayIconBack from "../../../public/images/play-circle.png";
import HeaderMobile from "./HeaderMobile";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { apiService } from "@/services/api.service";
import Marquee from "react-fast-marquee";
import IconCart from "../../../public/icon/Cart Large Minimalistic.svg";
import { notification } from "antd";
import { createOrderService, generateOrderId } from "@/utils/button";
import { Drawer } from "antd";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [headerData, setHeaderData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [headSale, setHeadSale] = useState<any>(null);
  const [cartData, setCartData] = useState<any>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [isVoucherValid, setIsVoucherValid] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [showNotication, setShowNotication] = useState(false);
  const [voucherId, setVoucherId] = useState<any>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await apiService.get(ENDPOINT.GET_HEADER); // Gọi API với endpoint của bạn
        setHeaderData(data); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu đã tải xong dữ liệu
      } catch (error) {
        console.error("Error fetching header data:", error);
        setLoading(false);
      }
    };
    const fetchHeaderSale = async () => {
      try {
        const data = await apiService.get(ENDPOINT.GET_HEAD_SALE); // Gọi API với endpoint của bạn
        setHeadSale(data); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu đã tải xong dữ liệu
      } catch (error) {
        console.error("Error fetching header data:", error);
        setLoading(false);
      }
    };
    const checkLoginStatus = async () => {
      const jwtToken = localStorage.getItem("jwt");

      if (jwtToken) {
        try {
          const response = await fetch(ENDPOINT.GET_ME, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok && data.id) {
            setIsLoggedIn(true);
            setUserData(data);
          } else {
            setIsLoggedIn(false); // Nếu không có ID hoặc API không trả về hợp lệ
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
          setIsLoggedIn(false); // Nếu có lỗi, coi như người dùng chưa đăng nhập
        }
      } else {
        setIsLoggedIn(false); // Không có JWT token
      }
    };
    const fetchCartByUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const data: any = await apiService.get(
          `${ENDPOINT.GET_CART_BY_USER}/${userId}/cart`
        ); // Gọi API với endpoint của bạn
        setCartData(data?.carts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching header data:", error);
        setLoading(false);
      }
    };
    checkLoginStatus();
    fetchHeaderData();
    fetchHeaderSale();
    fetchCartByUser();
  }, [isCartOpen]);
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    resetVoucher();
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
    const selectedMenu =
      headerData[hoveredMenu as keyof typeof headerData]?.danh_muc_con || [];
    const selectedMenuContentVideo =
      headerData[hoveredMenu as keyof typeof headerData]?.content_video || [];
    const avatarVideo = selectedMenuContentVideo?.avatar?.url
      ? BASE_URL + selectedMenuContentVideo.avatar.url
      : ""; // Nếu không có giá trị, trả về chuỗi rỗng

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
                          <Link
                            href={`/${hoveredMenu}/${category.slug}`}
                            className="text-[14px] text-[#000000] font-semibold mb-2"
                          >
                            {category.title}
                          </Link>
                          <ul className="space-y-1 text-sm list-disc pl-[20px]">
                            {category.danh_muc_chi_tiet.map(
                              (item: any, itemIndex: any) => (
                                <li key={itemIndex}>
                                  <Link
                                    href={`/${hoveredMenu}/${category.slug}/${item.slug}`}
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex gap-4">
                    <div className="relative bg-gray-200 mb-4 w-[176px] h-[104px]">
                      {selectedMenuContentVideo && (
                        <div className="relative mb-4 w-[176px] h-[104px]">
                          <Image
                            src={avatarVideo || ""} // Đảm bảo có URL hợp lệ
                            alt="avatar"
                            width={200}
                            height={200}
                            className="!w-full !h-full object-cover rounded-[6px]"
                          />
                        </div>
                      )}

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
                        {selectedMenuContentVideo?.title}
                      </h5>
                      <p className="text-[14px] text-[#475467]">
                        {selectedMenuContentVideo?.description}
                      </p>
                      <a
                        href={selectedMenuContentVideo?.linkVideo}
                        target="_blank"
                      >
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
                      </a>
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

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Điều chỉnh theo kích thước màn hình của bạn
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi khi load lần đầu

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const resetVoucher = () => {
    setVoucherCode(""); // Reset voucher code
    setVoucherDiscount(0); // Reset voucher discount
    setIsVoucherValid(false); // Reset trạng thái voucher hợp lệ
    setFinalAmount(0);
  };
  const handleRemoveFromCart = (idCart: number) => {
    setShowNotication(true);
    // Xóa sản phẩm khỏi cartData bằng cách lọc ra các sản phẩm không có idCart này
    setCartData(cartData.filter((item: any) => item.idCart !== idCart));
    resetVoucher();
  };
  const handleUpdateQuantity = (idCart: number, updatedQuantity: number) => {
    setShowNotication(true);
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    setCartData((prevCartData: any) =>
      prevCartData.map((item: any) =>
        item.idCart === idCart ? { ...item, amount: updatedQuantity } : item
      )
    );
    resetVoucher();
  };

  const calculateTotalPrice = () => {
    let total = 0;

    // Lặp qua tất cả các sản phẩm trong giỏ hàng và cộng dồn tổng tiền
    cartData?.forEach((item: any) => {
      // const selectedSizeObj = item?.san_pham?.size?.find(
      //   (size: any) => size.size === item.size
      // );
      // if (selectedSizeObj) {
      //   total += selectedSizeObj.price * item.amount; // Tổng = giá * số lượng
      // }

      total += item?.price * item.amount;
    });

    return total;
  };

  const handleVoucherCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setVoucherCode(value);

    if (value.length > 0) {
      setIsButtonDisabled(false); // Enable the button when input has value
    } else {
      setIsButtonDisabled(true); // Disable the button if input is empty
    }
  };
  const checkVoucher = async () => {
    setShowNotication(false);
    if (!voucherCode) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập mã voucher!",
      });
      return;
    }

    try {
      const response: any = await apiService.post(
        `${ENDPOINT.GET_CHECK_VOUCHER}`, // Endpoint của bạn
        { code: voucherCode, totalAmount: calculateTotalPrice() }
      );

      if (response?.voucher) {
        const voucher = response.voucher;
        const totalAmount = calculateTotalPrice(); // Lấy tổng đơn hàng

        let discount = 0;
        let rate = 0;

        // Kiểm tra kiểu giảm giá
        if (voucher.type === "Giảm giá theo %") {
          discount = (totalAmount * voucher.gia_tri_giam) / 100; // Giảm theo phần trăm
          rate = voucher.gia_tri_giam;
        } else if (voucher.type === "Giảm giá trực tiếp") {
          discount = voucher.gia_tri_giam; // Giảm theo số tiền trực tiếp
        }

        setVoucherId(voucher?.id);
        // Tính tổng tiền sau giảm giá
        const finalTotal = totalAmount - discount;

        // Lưu giá trị giảm và tổng tiền cuối
        setVoucherDiscount(discount);
        setFinalAmount(finalTotal);

        // Cập nhật trạng thái voucher hợp lệ
        setIsVoucherValid(true);

        notification.success({
          message: "Voucher hợp lệ!",
          description: `Mã voucher áp dụng thành công! Tổng tiền đã được giảm xuống: ${finalTotal.toLocaleString()} đ`,
        });
      } else {
        setIsVoucherValid(false);
        const errorMessage = response.data.message || "Voucher không hợp lệ.";
        notification.error({
          message: "Voucher không hợp lệ",
          description: errorMessage,
        });
      }
    } catch (error: any) {
      console.error("Lỗi khi kiểm tra voucher:", error);
      notification.error({
        message: "Lỗi khi kiểm tra voucher",
        description:
          error?.response?.data?.error?.message ||
          "Đã có lỗi xảy ra khi kiểm tra voucher.",
      });
    }
  };

  const createOrder = async () => {
    // Lấy ngày hiện tại
    const currentDate = new Date().toISOString(); // Sử dụng ISO String để đảm bảo tương thích với kiểu Date của Strapi

    // Tạo ID đơn hàng ngẫu nhiên
    const ID_order = generateOrderId();

    // Tạo mảng các item từ cartData
    const items = cartData.map((item: any) => ({
      amount: item.amount,
      san_pham: item.san_pham.id, // ID sản phẩm
      size: item.size,
      price: item.price,
      idCart: item.idCart,
      noted: item.noted,
    }));

    // Tạo dữ liệu đơn hàng
    const orderData = {
      user: userData.id, // Lấy ID người dùng
      ID_order, // ID đơn hàng
      date_order: currentDate, // Ngày hiện tại
      status: "Nháp", // Trạng thái mặc định là "Nháp"
      items, // Mảng các sản phẩm
      voucher: voucherId, // Lấy ID của voucher hợp lệ
      finalAmount: finalAmount ? finalAmount : calculateTotalPrice(), // Tổng tiền sau giảm giá
      price_not_reduced: calculateTotalPrice(),
    };

    try {
      // Gọi createOrderService để tạo đơn hàng nháp
      const response: any = await createOrderService(orderData);
      setIsCartOpen(false);

      setTimeout(() => {
        window.location.href = `/thanh-toan?id=${response?.data?.attributes?.ID_order}`;
      }, 500);
      return response; // Trả về dữ liệu đơn hàng hoặc thông báo thành công
    } catch (error) {
      // Xử lý lỗi khi tạo đơn hàng
      console.error("Lỗi khi tạo đơn hàng:", error);
      throw error; // Ném lỗi hoặc trả về thông báo lỗi
    }
  };
  return (
    <>
      <div className="bg-[#EBEBEB] py-[12px] hidden md:block">
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
                    <Link href="/bang-size">Bảng size</Link>
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
              >
                <Link href="/nam">NAM</Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "nu" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("nu")}
              >
                <Link href="/nu" className="pb-1">
                  NỮ
                </Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "unisex" ? "border-b-2 border-white" : ""
                }`}
                onMouseEnter={() => setHoveredMenu("unisex")}
              >
                <Link href="/unisex">UNISEX</Link>
              </li>
              <li
                className={`relative ${
                  hoveredMenu === "bo-suu-tap" ? "border-b-2 border-white" : ""
                }`}
              >
                <Link href="/bo-suu-tap">BỘ SƯU TẬP</Link>
              </li>
              <li className="text-[#FF8F8F]">
                <Link href="/sale-off">SALE OFF</Link>
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
              {isLoggedIn ? (
                <Link href="/tai-khoan">
                  <div className="relative">
                    <Image
                      src={UserIcon}
                      className="cursor-pointer"
                      alt="icon-cart"
                      width={17.5}
                      height={17.5}
                    />
                    <div className="absolute bottom-0 right-0">
                      <div className="h-[9px] w-[9px] flex justify-center items-center rounded-full bg-[#ECA100]">
                        <Image
                          src={Diamond}
                          height={5}
                          width={5}
                          alt="diamond"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link className="text-[16px] text-[#E6E6E6]" href="/dang-nhap">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <Drawer
          placement="right"
          open={isCartOpen}
          closable={false}
          onClose={handleCartClick}
          width="40%"
          destroyOnClose
          rootStyle={{
            top: topPosition,
            height: heightValue,
            overflow: "hidden",
          }}
          style={{
            padding: 0,
            transition: "all 0.5s ease-in-out",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex flex-col h-full justify-between">
            {/* Phần đầu - Tiêu đề Giỏ Hàng */}
            <div>
              {" "}
              <div className="flex justify-between">
                <h2
                  className={`${robotosand.className} font-medium text-[18px] text-[#000000] mb-4`}
                >
                  Giỏ hàng ({cartData?.length || 0})
                </h2>
                <button
                  className=" text-2xl text-gray-700"
                  onClick={handleCartClick}
                >
                  <CloseOutlined />
                </button>
              </div>
              {/* Phần giữa - Danh sách sản phẩm */}
              {cartData && cartData?.length > 0 && (
                <div className="py-4 flex flex-col gap-4 overflow-y-auto cart-items ">
                  {cartData?.map((item: any) => {
                    return (
                      <CardProductOrder
                        enableChangeQuanity={true}
                        key={item?.idCart}
                        onRemove={handleRemoveFromCart}
                        onUpdateQuantity={handleUpdateQuantity}
                        data={item}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Phần cuối - Mã giảm giá và thanh toán */}
            {cartData && cartData?.length > 0 && (
              <div className=" pt-0  flex-none">
                <div className="pb-4">
                  <div className="flex items-center gap-4">
                    {/* Ô nhập mã giảm giá */}
                    <div className="relative flex-1">
                      <input
                        value={voucherCode}
                        onChange={handleVoucherCodeChange}
                        type="text"
                        className="h-[44px] w-full py-3 pl-[50px] pr-[12px] bg-[#F0F0F0] outline-none text-[14px]"
                        placeholder="Nhập mã giảm giá"
                      />
                      <Image
                        src={VoucherIcon}
                        alt="Voucher Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]"
                      />
                    </div>

                    {/* Nút áp dụng */}
                    <button
                      onClick={checkVoucher}
                      disabled={isButtonDisabled}
                      className={`h-[44px] px-6 whitespace-nowrap text-white text-[14px] font-medium ${
                        isButtonDisabled ? "bg-[#C1C1C1]" : "bg-[#000000]"
                      }`}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
                {showNotication && (
                  <h5 className="text-[18px] text-[#F33] pb-4">
                    Mời bạn nhập lại mã voucher sau khi thay đổi giỏ hàng
                  </h5>
                )}
                {isVoucherValid && (
                  <div className="flex justify-between pb-4">
                    <h5 className="text-[18px] text-[#383838]">Voucher</h5>
                    <span className="text-[#F33] font-bold text-[18px]">
                      {voucherDiscount.toLocaleString()} đ
                    </span>
                  </div>
                )}
                <div className="flex justify-between pb-4">
                  <h5 className="text-[18px] font-semibold">TỔNG TIỀN</h5>
                  <span className="text-[#1D242D] font-bold text-[18px]">
                    {finalAmount
                      ? finalAmount.toLocaleString()
                      : calculateTotalPrice().toLocaleString()}{" "}
                    đ
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-[100px] bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex gap-4"
                    onClick={() => createOrder()}
                  >
                    <span>Thanh toán</span>
                    <Image src={IconArrowWhite} alt="Icon" />
                  </button>
                </div>
              </div>
            )}

            {/* Nút Đóng Giỏ Hàng */}
          </div>
        </Drawer>
      )}

      <div onMouseLeave={() => setHoveredMenu(null)}>
        {headerData && <RenderMegaMenu />}
      </div>
      <HeaderMobile />
    </>
  );
};

export default Header;
