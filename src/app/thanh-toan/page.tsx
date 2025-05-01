"use server";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import React from "react";
import CardProductOrder from "@/components/share/CardProductOrder";
import StepPayment from "@/components/share/StepPayment";
import { ENDPOINT } from "@/enums/endpoint.enum";

interface ThanhToanProps {
  searchParams: {
    id?: string;
  };
}

const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Giỏ hàng", link: "#" },
  { label: "Thanh toán", link: "#" },
];

const searchData = {
  populate: [
    "user.picture",
    "items.san_pham.images",
    "voucher",
    "items.san_pham.size",
  ].toString(),
};
const searchDataParams = new URLSearchParams(searchData).toString();

async function fetchWithToken(endpoint: string) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
const page = async ({ searchParams }: ThanhToanProps) => {
  const dataOrderDetail = await fetchWithToken(
    `${ENDPOINT.GET_DETAIL_ORDER}?${searchDataParams}&filters[ID_order][$eq]=${searchParams?.id}`
  );
  const detail = dataOrderDetail?.data[0];
  const productOrders = detail?.attributes?.items;
  const phiVanChuyen = await fetchWithToken(`${ENDPOINT.GET_PHI_VAN_CHUYEN}`);
  const dataPhiVanChuyen = phiVanChuyen?.data?.attributes?.fee;
  const voucher = detail?.attributes?.voucher;

  const typeVoucher = voucher?.data?.attributes?.type;
  const rateDiscout = voucher?.data?.attributes?.gia_tri_giam;
  const finalAmount = detail?.attributes?.finalAmount;
  const estPrice = detail?.attributes?.price_not_reduced;
  let discountAmount = 0;
  if (typeVoucher === "Giảm giá theo %") {
    // Nếu là giảm giá theo phần trăm, tính theo finalAmount
    discountAmount = (estPrice * rateDiscout) / 100;
  } else if (typeVoucher === "Giảm giá trực tiếp") {
    // Nếu là giảm giá trực tiếp, lấy giá trị giảm trực tiếp
    discountAmount = rateDiscout;
  }
  const amountTotal = finalAmount + dataPhiVanChuyen;
  const user = detail?.attributes?.user;
  const handleRemoveFromCart = (idCart: number) => {};
  const handleUpdateQuantity = (idCart: number, updatedQuantity: number) => {};

  return (
    <div className="!bg-[#ffffff]">
      <div className="container py-8">
        <BreadcrumbBlack paths={paths} />
        <div className="py-8">
          <div className="grid grid-cols-12 md:gap-12">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1">
              <StepPayment
                idOrder={detail?.id}
                user={user}
                finalAmount={amountTotal}
                feeDelivery={dataPhiVanChuyen}
                codeOrder={detail?.attributes?.ID_order}
              />
            </div>
            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
              <div className="flex flex-col gap-8">
                <h2 className="text-[#383838] text-[24px] font-medium uppercase">
                  Đơn hàng của bạn
                </h2>
                <div className="flex flex-col gap-4">
                  {productOrders &&
                    productOrders?.map((item: any) => {
                      return (
                        <CardProductOrder
                          key={item.id}
                          enableChangeQuanity={false}
                          data={item}
                        />
                      );
                    })}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">Tạm tính</span>
                    <span className="text-[18px] font-bold text-[#1D242D]">
                      {new Intl.NumberFormat("vi-VN").format(estPrice ?? 0)} đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">Giảm giá</span>
                    <span className="text-[18px] font-bold text-[#FF3333]">
                      {new Intl.NumberFormat("vi-VN").format(
                        discountAmount ?? 0
                      )}{" "}
                      đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">
                      Vận chuyển
                    </span>
                    <span className="text-[18px] font-bold text-[#1D242D]">
                      {new Intl.NumberFormat("vi-VN").format(
                        dataPhiVanChuyen ?? 0
                      )}{" "}
                      đ
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] text-[#000000] font-bold">
                    TỔNG CỘNG
                  </span>
                  <span className="text-[18px] font-bold text-[#000000]">
                    {new Intl.NumberFormat("vi-VN").format(amountTotal ?? 0)} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
