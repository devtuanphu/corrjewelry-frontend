"use client";
import React, { useEffect, useState } from "react";
import ProductDemo from "../../../public/images/product2.jpg";
import StartIcon from "../../../public/icon/start.svg";
import { quicksand, robotocondensed, robotosand } from "@/font";
import Image from "next/image";
import { notification, Radio } from "antd";
import Link from "next/link";
import { addToCart, createOrderService, generateOrderId } from "@/utils/button";
interface CardSaleProps {
  data: any;
}
interface ItemOrderData {
  amount: number;
  san_pham: number;
  size: string;
  price: string;
  idCart: string;
}

interface OrderData {
  user: string;
  ID_order: string;
  date_order: string;
  status: string;
  items: ItemOrderData[];
  voucher?: number;
  finalAmount: number;
  price_not_reduced: number;
}

const CardSale: React.FC<CardSaleProps> = ({ data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  const image = data?.attributes?.images?.data[0]?.attributes?.url;
  console.log(image);

  const [size, setSize] = useState<string | undefined>(undefined);
  const [formattedSalePrice, setFormattedSalePrice] = useState<string>("");
  const [formattedOriginalPrice, setFormattedOriginalPrice] =
    useState<string>("");
  useEffect(() => {
    const firstSize = data?.attributes?.size?.[0]?.size;
    if (firstSize) {
      setSize(firstSize);
    }
  }, [data]);

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };
  const selectedSize = data?.attributes?.size?.find(
    (item: any) => item.size === size
  );
  const originalPrice = selectedSize?.price || 0;
  const percentSale = data?.attributes?.percentSale || 0;
  const salePrice = originalPrice - (originalPrice * percentSale) / 100;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormattedSalePrice(salePrice.toLocaleString()); // Format sale price
      setFormattedOriginalPrice(originalPrice.toLocaleString()); // Format original price
    }
  }, [salePrice, originalPrice]);
  const handleBuyNow = async () => {
    console.log(data?.id);

    const userId = localStorage.getItem("userId");
    const currentDate = new Date().toISOString();
    const ID_order = generateOrderId();

    if (!userId) {
      notification.error({
        message: "Chưa đăng nhập",
        description: "Vui lòng đăng nhập để thực hiện thanh toán.",
      });
      setTimeout(() => {
        window.location.href = "/dang-nhap";
      }, 500);
      return;
    }

    if (!size) {
      notification.error({
        message: "Chưa chọn kích thước",
        description: "Vui lòng chọn kích thước sản phẩm trước khi mua.",
      });
      return;
    }

    addToCart(data?.id, 1, userId, size, salePrice) // Truyền size và price vào
      .then((response: any) => {
        if (response?.cart) {
          // Cập nhật items với cart mới nhất
          const newItem: ItemOrderData = {
            amount: 1,
            san_pham: data?.id,
            size: size,
            price: salePrice.toString(), // Chuyển giá thành kiểu string
            idCart: response?.cart?.idCart,
          };

          // Cập nhật orderData với các giá trị đã chọn
          const newOrderData: OrderData = {
            user: userId,
            ID_order,
            date_order: currentDate,
            status: "Nháp",
            items: [newItem], // Thêm sản phẩm vào đơn hàng
            finalAmount: salePrice, // Tính tổng giá trị đơn hàng
            price_not_reduced: salePrice,
          };

          // Gọi API tạo đơn hàng với dữ liệu orderData
          createOrderService(newOrderData)
            .then((createResponse: any) => {
              console.log("Order Created:", createResponse);
              if (createResponse) {
                setTimeout(() => {
                  // Chuyển hướng tới trang thanh toán sau khi tạo đơn hàng thành công
                  window.location.href = `/thanh-toan?id=${createResponse?.data?.attributes?.ID_order}`;
                }, 500);
              }
            })
            .catch((error) => {
              console.error("Lỗi khi tạo đơn hàng:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      });
  };
  return (
    <>
      <div className="relative z-20">
        <div className="absolute top-[10%] left-0 w-full h-[80%] bg-white rounded-[16px] shadow-md z-0" />
        <div className="absolute top-[5%] left-0 w-[98%] h-[90%] bg-white rounded-[16px] shadow-lg z-10" />
        <div className="relative z-20 bg-[#FFFFFF] p-8 rounded-[16px] left-0 w-[96%] shadow-xl">
          <div className="flex justify-end pb-4">
            <span
              className={`${quicksand.className} text-[#EB0000] text-[14px] font-semibold`}
            >
              Sale Off
            </span>
          </div>
          <div className="md:flex gap-12 items-start">
            <div className="w-full md:w-1/3 pb-4 md:0">
              <div className="h-full">
                <div className="relative aspect-[3/3] w-full">
                  <Image
                    src={baseUrl + image}
                    alt="product"
                    fill
                    className="object-cover"
                    priority
                  />
                  {data?.attributes?.isPrenium && (
                    <div className="absolute top-[72px] left-0 ">
                      <div className="bg-[#E1E1E1] rotate-[-90deg] origin-top-left">
                        <span
                          className={`text-[#383838] text-[14px] p-2 ${robotocondensed.className} font-semibold`}
                        >
                          PREMIUM
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute  right-4 top-3">
                    <span
                      className={`${quicksand.className} font-bold text-[10px] text-[#ffffff] px-2 py-1 bg-[#BE0101] rounded-[4px]`}
                    >
                      Giảm {data?.attributes?.percentSale}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <h5
                      className={`${robotosand.className} text-[#141414] font-bold text-[18px]`}
                    >
                      {data?.attributes?.title}
                    </h5>
                    <div
                      className={`${robotosand.className} flex gap-2 items-center`}
                    >
                      <h5 className="text-[#EB0000] text-[16px] font-medium">
                        {formattedSalePrice} đ
                      </h5>
                      <h5 className="text-[#595959] text-[12px] font-normal line-through">
                        {formattedOriginalPrice} đ
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${quicksand.className} flex gap-2 items-center`}
                  >
                    <span className="text-[12px] text-[#383838] font-medium">
                      {data?.attributes?.startAVG}
                    </span>
                    <Image
                      src={StartIcon}
                      width={16}
                      height={16}
                      alt="Icon star"
                    />
                    <span className="text-[12px] text-[#383838] font-medium">
                      ({data?.attributes?.amountComment} lượt)
                    </span>
                  </div>
                </div>
                <div className="">
                  <Radio.Group
                    onChange={handleSizeChange}
                    value={size}
                    className="flex gap-2 mt-2"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    {data?.attributes?.size &&
                      data.attributes?.size?.map((item: any) => {
                        return (
                          <>
                            <Radio.Button
                              key={item.id}
                              value={item.size}
                              className={`!bg-[#F5F5F5] !text-[#000] !border-none !rounded-[2px] px-3 py-2 flex items-center justify-center 
                                 hover:!bg-[#e4e4e4] focus:!shadow-none !outline-none`}
                              style={{ borderRight: "none" }}
                            >
                              {`Size ${item.size}`}
                            </Radio.Button>
                          </>
                        );
                      })}
                  </Radio.Group>
                </div>
                <div
                  className={`${quicksand.className} flex justify-between gap-4`}
                >
                  <Link
                    href={`/san-pham/${data?.attributes?.slug}`}
                    className="w-full py-[12px] text-[#000000] bg-[#fff] rounded-[2px] text-center border border-solid border-[#000000]"
                  >
                    XEM CHI TIẾT
                  </Link>
                  <button
                    onClick={() => handleBuyNow()}
                    className="w-full py-[12px] text-[#fff] bg-[#383838] rounded-[2px]"
                  >
                    MUA NGAY
                  </button>
                </div>
                <div
                  className={`flex ${quicksand.className} gap-1 items-center`}
                >
                  <h5 className="text-[12px] text-[#595959] font-normal">
                    Xem thêm bộ sưu tập:{" "}
                  </h5>
                  <Link
                    className="underline text-[12px] text-[#000] font-medium"
                    href=""
                  >
                    Lắc tay nữ
                  </Link>
                </div>
                <div>
                  <h5
                    className={`text-[#000000] text-[14px] font-semibold ${robotosand.className}`}
                  >
                    Bạc CORR – Thanh Lịch & Đẳng Cấp
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSale;
