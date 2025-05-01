"use client";
import { useState, useEffect, useCallback } from "react";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import { quicksand, robotosand } from "@/font";
import CardProductOrder from "@/components/share/CardProductOrder";
import Image from "next/image";
import VoucherIcon from "../../../public/icon/voucher.svg";
import Link from "next/link";
import IconArrowWhite from "../../../public/icon/arrow-down-bold 1.png";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { notification } from "antd";
import { createOrderService, generateOrderId } from "@/utils/button";

const Page = () => {
  const paths = [
    { label: "Trang chủ", link: "/" },
    { label: "Giỏ hàng", link: "#" },
  ];
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
  const [cartData, setCartData] = useState<any>(null);
  const [showNotication, setShowNotication] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherId, setVoucherId] = useState<any>(null);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [isVoucherValid, setIsVoucherValid] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [phiVanChuyen, setPhiVanChuyen] = useState(0);
  const [userData, setUserData] = useState<any>(null);

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
          setUserData(data);
        } else {
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    } else {
    }
  };

  const fetchCartByUser = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const data: any = await apiService.get(
        `${ENDPOINT.GET_CART_BY_USER}/${userId}/cart`
      );
      setCartData(data?.carts);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };

  const fetchPhiVanChuyen = async () => {
    try {
      const data: any = await apiService.get(`${ENDPOINT.GET_PHI_VAN_CHUYEN}`);
      setPhiVanChuyen(data?.data?.attributes?.fee);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchCartByUser();
    fetchPhiVanChuyen();
    checkLoginStatus();
  }, []);

  // Sử dụng useCallback để tránh việc tái tạo lại hàm calculateTotalPrice
  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    cartData?.forEach((item: any) => {
      total += item?.price * item.amount;
    });
    return total;
  }, [cartData]); // cartData sẽ là dependency để tính lại giá trị tổng khi có sự thay đổi

  useEffect(() => {
    if (cartData) {
      setFinalAmount(calculateTotalPrice());
    }
  }, [cartData, calculateTotalPrice]); // Đưa calculateTotalPrice vào dependency của useEffect

  const handleVoucherCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setVoucherCode(value);

    if (value.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
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
        `${ENDPOINT.GET_CHECK_VOUCHER}`,
        { code: voucherCode, totalAmount: calculateTotalPrice() }
      );

      if (response?.voucher) {
        const voucher = response.voucher;
        const totalAmount = calculateTotalPrice();
        let discount = 0;
        let rate = 0;

        if (voucher.type === "Giảm giá theo %") {
          discount = (totalAmount * voucher.gia_tri_giam) / 100;
          rate = voucher.gia_tri_giam;
        } else if (voucher.type === "Giảm giá trực tiếp") {
          discount = voucher.gia_tri_giam;
        }

        setVoucherId(voucher?.id);
        const finalTotal = totalAmount - discount;

        setVoucherDiscount(discount);
        setFinalAmount(finalTotal);
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
    const currentDate = new Date().toISOString();
    const ID_order = generateOrderId();

    const items = cartData.map((item: any) => ({
      amount: item.amount,
      san_pham: item.san_pham.id,
      size: item.size,
      price: item.price,
      idCart: item.idCart,
    }));

    const orderData = {
      user: userData.id,
      ID_order,
      date_order: currentDate,
      status: "Nháp",
      items,
      voucher: voucherId,
      finalAmount: finalAmount ? finalAmount : calculateTotalPrice(),
      price_not_reduced: calculateTotalPrice(),
    };

    try {
      const response: any = await createOrderService(orderData);

      setTimeout(() => {
        window.location.href = `/thanh-toan?id=${response?.data?.attributes?.ID_order}`;
      }, 500);
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      throw error;
    }
  };

  const amountTotal = finalAmount + phiVanChuyen;

  return (
    <div className="container py-8">
      <BreadcrumbBlack paths={paths} />
      <div className="py-6 flex gap-2 items-center">
        <h5
          className={`${robotosand.className} text-[20px] font-medium uppercase`}
        >
          Giỏ hàng của bạn
        </h5>
        <span className={`${quicksand.className} text-[15px]`}>
          ( <span className="font-bold">{cartData?.length}</span> sản phẩm )
        </span>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <div className="p-6 border border-solid border-gray-300 rounded-[20px] flex flex-col gap-8">
            {cartData?.map((item: any) => {
              return (
                <CardProductOrder
                  enableChangeQuanity={true}
                  key={item?.idCart}
                  data={item}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="p-6 border border-solid border-gray-300 rounded-[20px] flex flex-col gap-8">
            <h5 className="text-[24px] uppercase font-medium">
              Đơn hàng của bạn
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">Tạm tính</span>
                <span className="text-[18px] font-bold text-[#1D242D]">
                  {calculateTotalPrice().toLocaleString()}đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">Giảm giá</span>
                <span className="text-[18px] font-bold text-[#FF3333]">
                  {voucherDiscount.toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] text-[#383838]">Vận chuyển</span>
                <span className="text-[18px] font-bold text-[#1D242D]">
                  {phiVanChuyen.toLocaleString()} đ
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  value={voucherCode}
                  onChange={handleVoucherCodeChange}
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
            <div className="flex justify-between items-center">
              <span className="text-[18px] text-[#000000] font-bold">
                TỔNG CỘNG
              </span>
              <span className="text-[18px] font-bold text-[#000000]">
                {amountTotal.toLocaleString()} đ
              </span>
            </div>
            <div className="">
              <button
                onClick={() => createOrder()}
                className="w-full bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex justify-center gap-4"
              >
                <span> Thanh toán</span>

                <Image src={IconArrowWhite} alt="Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
