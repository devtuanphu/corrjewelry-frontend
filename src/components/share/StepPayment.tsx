"use client";
import React, { useState } from "react";
import IconUser from "../../../public/icon/user2.svg";
import PaymentIcon from "../../../public/icon/Subtract.png";
import ConfirmIcon from "../../../public/icon/Union.png";
import CheckIcon from "../../../public/icon/check.png";
import Image from "next/image";
import { quicksand } from "@/font";
import { Checkbox } from "antd";
import IconArrowWhite from "../../../public/icon/arrow-down-bold 1.png";
import MomoLogo from "../../../public/images/momo_bank.png";
import ACBLogo from "../../../public/images/acb_bank.png";

const StepPayment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [remember, setRemember] = useState(false);

  const steps = [
    { icon: IconUser, alt: "User", label: "Thông tin" },
    { icon: ConfirmIcon, alt: "Payment", label: "Xác nhận" },
    { icon: PaymentIcon, alt: "Confirm", label: "Thanh toán" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const renderStep1 = () => {
    return (
      <div className="py-4">
        <div className="flex justify-end">
          <h2 className="text-[#000000] text-[20px] font-semibold">
            THÔNG TIN GIAO HÀNG
          </h2>
        </div>
        <div className={`${quicksand.className} flex flex-col gap-3`}>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Họ và tên <span className="text-[#EB0000]">*</span>
            </p>
            <input
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Số điện thoại <span className="text-[#EB0000]">*</span>
            </p>
            <input
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Email <span className="text-[#EB0000]">*</span>
            </p>
            <input
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Địa chỉ <span className="text-[#EB0000]">*</span>
            </p>
            <input
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">Ghi chú</p>
            <input
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="custom-checkbox"
            />
            <label
              className={`text-[14px] text-[#344054] font-medium select-none ${quicksand.className}`}
            >
              Lưu thông tin địa chỉ
            </label>
          </div>
          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="px-[50px] bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex gap-4"
            >
              <span>Tiếp Tục</span>

              <Image src={IconArrowWhite} alt="Icon" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="py-4">
        <div className="flex justify-start mb-4">
          <h2 className="text-[#000000] text-[20px] font-semibold">
            PHƯƠNG THỨC THANH TOÁN
          </h2>
        </div>

        <div className="space-y-4">
          {/* Option 1: Chuyển khoản ngân hàng */}
          <label className="flex items-center justify-between   cursor-pointer">
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" className="accent-black" />
              <span className="text-sm text-[#000]">
                Thanh toán chuyển khoản qua ngân hàng
              </span>
            </div>
            <Image src={ACBLogo} alt="ACB" width={40} height={40} />
          </label>

          {/* Option 2: Ví điện tử MOMO */}
          <label className="flex items-center justify-between   cursor-pointer">
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" className="accent-black" />
              <span className="text-sm text-[#000]">Ví điện tử MOMO</span>
            </div>
            <Image src={MomoLogo} alt="Momo" width={40} height={40} />
          </label>

          {/* Option 3: Thanh toán khi nhận hàng */}
          <label className="flex items-center justify-between   cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                className="accent-black"
                defaultChecked
              />
              <span className="text-sm text-[#000] ">
                Thanh toán khi nhận hàng
              </span>
            </div>
          </label>
        </div>
        <div className="flex justify-end py-6">
          <button
            onClick={nextStep}
            className="px-[50px] bg-[#000000] text-white py-3 text-[16px] font-medium uppercase flex gap-4"
          >
            <span>Xác nhận</span>

            <Image src={IconArrowWhite} alt="Icon" />
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className={`py-4 ${quicksand.className}`}>
        <div className="flex justify-between items-center">
          <div className="leading-8">
            <h2 className="text-[16px] font-semibold uppercase text-[#595959]">
              Mã đơn hàng
            </h2>
            <h5 className="text-[#000000] font-semibold uppercase text-[24px]">
              12345ASDFGHJ
            </h5>
          </div>
          <span className="bg-[#383838] px-4 py-2 text-[#ffffff] text-[16px] font-semibold rounded-[2px]">
            Chờ xác nhận
          </span>
        </div>
        <div className="py-6">
          <h5 className="text-[16px] font-semibold uppercase text-[#595959]">
            thông tin thanh toán
          </h5>
          <p className="text-[18px] font-medium">
            Sau khi đặt hàng thành công, bạn sẽ nhận được email xác nhận thanh
            toán. Email này sẽ bao gồm chi tiết sản phẩm đã mua và tổng số tiền
            thanh toán.{" "}
          </p>
          <p className="text-[18px] font-bold">
            Vui lòng kiểm tra hộp thư email để đảm bảo thông tin đơn hàng chính
            xác!
          </p>
        </div>
      </div>
    );
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="hidden relative md:flex items-center justify-between mb-6 w-full">
        {/* Line between steps */}
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-0 flex">
          {steps.slice(0, -1).map((_, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div
                className={`h-0.5 w-full 
                  ${currentStep > index ? "bg-[#383838]" : "bg-[#E6E6E6]"}`}
              ></div>
            </div>
          ))}
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          return (
            <div key={index} className="z-10">
              <div
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center border-1
                  ${
                    isCompleted
                      ? "bg-[#C0E4CA]"
                      : isActive
                      ? "bg-[#BFBFBF]"
                      : "bg-[#E1E1E1]"
                  }
                  border-[#E1E1E1]`}
              >
                <Image
                  src={isCompleted ? CheckIcon : step.icon}
                  alt={step.alt}
                  width={18}
                  height={18}
                  className={`${isCompleted || isActive ? "" : ""}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex justify-between">
        <div className="flex gap-2 items-center">
          <h5
            className={`${quicksand.className} text-[12px] font-medium text-[#595959]`}
          >
            Bước 1
          </h5>
          <span
            className={`${quicksand.className} text-[16px] font-semibold text-[#2A2A2A] uppercase`}
          >
            thông tin
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <h5
            className={`${quicksand.className} text-[12px] font-medium text-[#595959] `}
          >
            Bước 2
          </h5>
          <span
            className={`${quicksand.className} text-[16px] font-semibold text-[#2A2A2A] uppercase`}
          >
            THANH TOÁN
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <h5
            className={`${quicksand.className} text-[12px] font-medium text-[#595959] `}
          >
            Bước 3
          </h5>
          <span
            className={`${quicksand.className} text-[16px] font-semibold text-[#2A2A2A] uppercase`}
          >
            xác nhận đơn hàng
          </span>
        </div>
      </div>

      <div className="my-8">{renderCurrentStep()}</div>
    </div>
  );
};

export default StepPayment;
