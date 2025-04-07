import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import React from "react";
import CardProductOrder from "@/components/share/CardProductOrder";
import StepPayment from "@/components/share/StepPayment";
const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Giỏ hàng", link: "#" },
  { label: "Thanh toán", link: "#" },
];
const page = () => {
  return (
    <div className="!bg-[#ffffff]">
      <div className="container py-8">
        <BreadcrumbBlack paths={paths} />
        <div className="py-8">
          <div className="grid grid-cols-12 md:gap-12">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1">
              <StepPayment />
            </div>
            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
              <div className="flex flex-col gap-8">
                <h2 className="text-[#383838] text-[24px] font-medium uppercase">
                  Đơn hàng của bạn
                </h2>
                <div className="flex flex-col gap-4">
                  <CardProductOrder />
                  <CardProductOrder />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">Tạm tính</span>
                    <span className="text-[18px] font-bold text-[#1D242D]">
                      1.799.000 đ{" "}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">
                      Giảm giá (-20%)
                    </span>
                    <span className="text-[18px] font-bold text-[#FF3333]">
                      1.799.000 đ{" "}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] text-[#383838]">
                      Vận chuyển
                    </span>
                    <span className="text-[18px] font-bold text-[#1D242D]">
                      0 đ
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] text-[#000000] font-bold">
                    TỔNG CỘNG
                  </span>
                  <span className="text-[18px] font-bold text-[#000000]">
                    1.799.000 đ{" "}
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
