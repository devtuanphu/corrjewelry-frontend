"use client";
import React, { useState, useEffect } from "react";
import { notification, Radio } from "antd";
import { IconHeart } from "./IconHeart";
import { addToCart, createOrderService, generateOrderId } from "@/utils/button";
import { quicksand, robotosand } from "@/font";
import StartIcon from "../../../public/icon/start.svg";
import Image from "next/image";

interface ProductDetailProps {
  data: any;
}
interface ItemOrderData {
  amount: number;
  san_pham: number;
  size: string;
  price: string;
  idCart: string;
  noted?: string;
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

const ProductDetail: React.FC<ProductDetailProps> = ({ data }) => {
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [formattedSalePrice, setFormattedSalePrice] = useState<string>("");
  const [formattedOriginalPrice, setFormattedOriginalPrice] =
    useState<string>("");
  const [noted, setNoted] = useState<string>("");

  const [items, setItems] = useState<any>([]);
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    const firstSize = data?.[0]?.attributes?.size?.[0]?.size;
    if (firstSize) {
      setSize(firstSize);
    }
  }, [data]);

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent going below 1
  };

  const selectedSize = data[0]?.attributes?.size?.find(
    (item: any) => item.size === size
  );
  const originalPrice = selectedSize?.price || 0;
  const percentSale = data[0]?.attributes?.percentSale || 0;
  const salePrice = originalPrice - (originalPrice * percentSale) / 100;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormattedSalePrice(salePrice.toLocaleString()); // Format sale price
      setFormattedOriginalPrice(originalPrice.toLocaleString()); // Format original price
    }
  }, [salePrice, originalPrice]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");

    // Kiểm tra nếu userId không tồn tại hoặc không hợp lệ
    if (!userId) {
      notification.error({
        message: "Chưa đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
      });
      setTimeout(() => {
        window.location.href = "/dang-nhap"; // Chuyển hướng đến trang đăng nhập
      }, 500);
      return;
    }

    // Kiểm tra xem size và giá có được chọn hay không
    if (!size) {
      notification.error({
        message: "Chưa chọn kích thước",
        description:
          "Vui lòng chọn kích thước sản phẩm trước khi thêm vào giỏ hàng.",
      });
      return;
    }

    // Truyền size và price vào hàm addToCart
    addToCart(data[0]?.id, quantity, userId, size, salePrice, noted) // Sửa lại để truyền price (formattedSalePrice) vào
      .then(() => {
        notification.success({
          message: "Thêm vào giỏ hàng thành công",
          description: "Sản phẩm đã được thêm vào giỏ hàng.",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi khi thêm vào giỏ hàng",
          description: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      });
  };

  const handleBuyNow = async () => {
    const userId = localStorage.getItem("userId");
    const currentDate = new Date().toISOString();
    const ID_order = generateOrderId();

    if (!userId) {
      notification.error({
        message: "Chưa đăng nhập",
        description: "Vui lòng đăng nhập để thực hiện thanh toán.",
      });
      setTimeout(() => {
        window.location.href = "/dang-nhap"; // Chuyển hướng đến trang đăng nhập
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

    addToCart(data[0]?.id, quantity, userId, size, salePrice, noted) // Truyền size và price vào
      .then((response: any) => {
        if (response?.cart) {
          // Cập nhật items với cart mới nhất
          const newItem: ItemOrderData = {
            amount: quantity,
            san_pham: data[0]?.id,
            size: size,
            price: salePrice.toString(), // Chuyển giá thành kiểu string
            idCart: response?.cart?.idCart,
            noted: noted,
          };

          // Cập nhật orderData với các giá trị đã chọn
          const newOrderData: OrderData = {
            user: userId,
            ID_order,
            date_order: currentDate,
            status: "Nháp",
            items: [newItem], // Thêm sản phẩm vào đơn hàng
            finalAmount: salePrice * quantity, // Tính tổng giá trị đơn hàng
            price_not_reduced: salePrice * quantity,
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span
            className={`${quicksand.className} text-[14px] font-semibold text-[#ffffff] bg-[#BE0101] p-1 rounded-[4px]`}
          >
            Giảm {percentSale}%
          </span>
          <div>
            <IconHeart like={false} />
          </div>
        </div>
        <div className={`${robotosand.className} flex items-center gap-4`}>
          <h2 className="text-[24px] font-bold text-[#141414]">
            {data[0]?.attributes?.title}
          </h2>
          <span className="font-[14px] text-[#141414] bg-[#EBEBEB] p-1">
            {data[0]?.attributes?.tag}
          </span>
        </div>
        <div className={`${quicksand.className} flex gap-2 items-center`}>
          <span className="text-[12px] text-[#383838] font-medium">
            {data[0]?.attributes?.startAVG}
          </span>
          <Image src={StartIcon} width={16} height={16} alt="Icon star" />
          <span className="text-[12px] text-[#383838] font-medium">
            ( {data[0]?.attributes?.amountComment} lượt)
          </span>
        </div>
        <div>
          <h5
            className={`${quicksand.className} flex gap-2 items-center text-[#546881] text-[14px] font-medium`}
          >
            Phong cách:{" "}
            <span className="text-[#1D242D]">{data[0]?.attributes?.style}</span>
          </h5>
        </div>

        <div>
          <textarea
            placeholder="Khắc tên - ngày sinh - icon... (Vui lòng ghi chú rõ nội dung)"
            className="w-full h-[80px] p-2 border border-gray-300 rounded resize-none text-sm focus:outline-none"
            value={noted}
            onChange={(e) => setNoted(e.target.value)}
          />
        </div>
        <div className="">
          <Radio.Group
            onChange={handleSizeChange}
            value={size}
            className="flex gap-4 mt-2"
            optionType="button"
            buttonStyle="solid"
          >
            {data[0]?.attributes?.size &&
              data[0].attributes?.size?.map((item: any) => {
                return (
                  <Radio.Button
                    key={item.id}
                    value={item.size}
                    className={`!bg-[#F5F5F5] !text-[#000] !border-none !rounded-[2px] px-3 py-2 flex items-center justify-center 
              hover:!bg-[#e4e4e4] focus:!shadow-none !outline-none`}
                    style={{ borderRight: "none" }}
                  >
                    {`Size ${item.size}`}
                  </Radio.Button>
                );
              })}
          </Radio.Group>
        </div>
        <div className={`${robotosand.className} flex gap-2 items-center`}>
          <h5 className="text-[#EB0000] text-[16px] font-medium">
            {formattedSalePrice} đ
          </h5>

          {formattedSalePrice != formattedOriginalPrice && (
            <h5 className="text-[#595959] text-[12px] font-normal line-through">
              {formattedOriginalPrice} đ
            </h5>
          )}
        </div>
        <div className="flex items-center ">
          <button
            onClick={handleDecrease}
            className="w-[36px] h-[36px] flex justify-center items-center border border-solid border-[#C1C1C1]  hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="text-[#383838] text-[20px]">-</span>
          </button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-[40px] h-[36px] text-center focus:outline-none bg-inherit"
            min="1"
          />
          <button
            onClick={handleIncrease}
            className="w-[36px] h-[36px] flex justify-center items-center border border-solid border-[#C1C1C1]  hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="text-[#383838] text-[20px]">+</span>
          </button>
        </div>
        <div className="flex">
          <div className="w-full md:w-[70%]">
            <div
              className={`${quicksand.className} flex justify-between gap-4`}
            >
              <button
                onClick={() => handleAddToCart()}
                className="w-full py-[12px] text-[#000000] bg-[#fff] rounded-[2px] border border-solid border-[#000000]"
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button
                onClick={() => handleBuyNow()}
                className="w-full py-[12px] text-[#fff] bg-[#383838] rounded-[2px]"
              >
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
