"use client";
import React, { useEffect, useState } from "react";
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
import { ENDPOINT } from "@/enums/endpoint.enum";
import { apiService } from "@/services/api.service";
import IconCopy from "../../../public/icon/Copy.svg";
interface StepPaymentProps {
  user: any;
  idOrder: number;
  finalAmount: number;
  feeDelivery: number;
  codeOrder: string;
}

const StepPayment: React.FC<StepPaymentProps> = ({
  user,
  idOrder,
  finalAmount,
  feeDelivery,
  codeOrder,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [remember, setRemember] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    "Thanh toán khi nhận hàng"
  );

  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopy = async (text: string) => {
    try {
      // Lấy giá trị cần sao chép
      const textToCopy = text;

      // Sử dụng API Clipboard để sao chép
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true); // Hiển thị thông báo sao chép thành công
    } catch (error) {
      console.error("Lỗi khi sao chép:", error);
      setCopySuccess(false); // Nếu có lỗi xảy ra
    }
  };
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;

  const fetchPaymentInfo = async () => {
    try {
      const data = await apiService.get(
        `${ENDPOINT.GET_THONG_TIN_THANH_TOAN}?populate=item.imageBank,item.QR_code`
      ); // Gọi API với endpoint của bạn
      setPaymentInfo(data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

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

  const [form, setForm] = useState({
    firstName: user?.data?.attributes?.firstName,
    lastName: user?.data?.attributes?.lastName,
    phone: user?.data?.attributes?.phone,
    email: user?.data?.attributes?.email,
    address: user?.data?.attributes?.address,
    note: "",
  });
  const userId = user?.data?.id;
  console.log("id", userId);

  const updateOrderStep1 = async () => {
    try {
      const response = await fetch(`${ENDPOINT.UPDATE_ORDER}/${idOrder}`, {
        method: "PUT", // Sử dụng PATCH để cập nhật dữ liệu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Thêm token nếu cần
        },
        body: JSON.stringify({
          data: {
            remember,
            user: userId,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            address: form.address,
            note: form.note,
            finalAmount,
            feeDelivery,
          },
        }),
      });

      if (response.ok) {
        // Nếu cập nhật thành công, chuyển sang bước tiếp theo
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Có lỗi khi cập nhật đơn hàng", error);
    }
  };

  const updateOrderStep2 = async () => {
    try {
      const response = await fetch(`${ENDPOINT.UPDATE_ORDER}/${idOrder}`, {
        method: "PUT", // Sử dụng PATCH để cập nhật dữ liệu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Thêm token nếu cần
        },
        body: JSON.stringify({
          data: {
            payment_method: paymentMethod,
            status: "Chờ xác nhận",
          },
        }),
      });

      if (response.ok) {
        // Nếu cập nhật thành công, chuyển sang bước tiếp theo
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Có lỗi khi cập nhật đơn hàng", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value); // Lưu phương thức thanh toán
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
              Họ <span className="text-[#EB0000]">*</span>
            </p>
            <input
              value={form.firstName || ""}
              onChange={handleInputChange}
              name="firstName"
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Tên <span className="text-[#EB0000]">*</span>
            </p>
            <input
              value={form.lastName || ""}
              onChange={handleInputChange}
              name="lastName"
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Số điện thoại <span className="text-[#EB0000]">*</span>
            </p>
            <input
              value={form.phone || ""}
              onChange={handleInputChange}
              name="phone"
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Email <span className="text-[#EB0000]">*</span>
            </p>
            <input
              readOnly
              value={form.email || ""}
              name="email"
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">
              Địa chỉ <span className="text-[#EB0000]">*</span>
            </p>
            <input
              value={form.address || ""}
              onChange={handleInputChange}
              name="address"
              type="text"
              className="w-full outline-none h-[44px] px-2 border border-solid border-[#595959] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#2A2A2A] text-[14px] font-medium">Ghi chú</p>
            <input
              value={form.note || ""}
              onChange={handleInputChange}
              name="note"
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
              onClick={updateOrderStep1}
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
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="Ngân hàng"
                checked={paymentMethod === "Ngân hàng"}
                onChange={handlePaymentChange}
                className="accent-black"
              />
              <span className="text-sm text-[#000]">
                Thanh toán chuyển khoản qua ngân hàng
              </span>
            </div>
            <Image
              src={
                BASE_URL +
                paymentInfo?.data?.attributes?.item[0]?.imageBank?.data
                  ?.attributes?.url
              }
              alt="ACB"
              width={40}
              height={40}
            />
          </label>

          {/* Option 2: Ví điện tử MOMO */}
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="Momo"
                checked={paymentMethod === "Momo"}
                onChange={handlePaymentChange}
                className="accent-black"
              />
              <span className="text-sm text-[#000]">Ví điện tử MOMO</span>
            </div>
            <Image
              src={
                BASE_URL +
                paymentInfo?.data?.attributes?.item[1]?.imageBank?.data
                  ?.attributes?.url
              }
              alt="Momo"
              width={40}
              height={40}
            />
          </label>

          {/* Option 3: Thanh toán khi nhận hàng */}
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="Thanh toán khi nhận hàng"
                checked={paymentMethod === "Thanh toán khi nhận hàng"}
                onChange={handlePaymentChange}
                className="accent-black"
              />
              <span className="text-sm text-[#000]">
                Thanh toán khi nhận hàng
              </span>
            </div>
          </label>
        </div>

        {/* Show additional content when a payment method is selected */}
        {paymentMethod === "Ngân hàng" && (
          <div className="mt-4">
            <div className="md:flex gap-[48px]">
              <div className="flex flex-col gap-4">
                <p
                  className={`${quicksand.className} text-[14px] text-[#383838]`}
                >
                  Quét mã để chuyển tiền
                </p>
                <p className="text-[14px] text-[#000] font-bold">
                  Nội dung: {paymentInfo?.data?.attributes?.item[0]?.content}
                </p>
                <p className="text-[#FF4D00] italic text-[14px]">
                  *Lưu ý: {paymentInfo?.data?.attributes?.item[0]?.note}
                </p>
              </div>
              <div className="flex flex-col gap-4 pt-4 md:pt-0">
                <h5 className="text-[#000] font-bold text-[16px] text-center">
                  {paymentInfo?.data?.attributes?.item[0]?.nameBank}
                </h5>
                <div className="flex justify-center gap-4">
                  <p className="text-[#06F] text-[16px] font-bold text-center">
                    {paymentInfo?.data?.attributes?.item[0]?.numberBank}
                  </p>
                  <button
                    onClick={() =>
                      handleCopy(
                        paymentInfo?.data?.attributes?.item[0]?.numberBank
                      )
                    }
                  >
                    <Image src={IconCopy} alt="icon" width={20} height={20} />
                  </button>
                </div>
                {/* {copySuccess && (
                  <p className="mt-2 text-green-500 font-semibold text-center md:text-start">
                    Đã sao chép vào clipboard!
                  </p>
                )} */}
                <div className="flex justify-center md:block">
                  <Image
                    src={
                      BASE_URL +
                      paymentInfo?.data?.attributes?.item[0]?.QR_code?.data
                        ?.attributes?.url
                    }
                    alt="Qr ngân hàng"
                    width={160}
                    height={160}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "Momo" && (
          <div className="mt-4">
            <div className="mt-4">
              <div className="md:flex gap-[48px]">
                <div className="flex flex-col gap-4">
                  <p
                    className={`${quicksand.className} text-[14px] text-[#383838]`}
                  >
                    Quét mã để chuyển tiền
                  </p>
                  <p className="text-[14px] text-[#000] font-bold">
                    Nội dung: {paymentInfo?.data?.attributes?.item[1]?.content}
                  </p>
                  <p className="text-[#FF4D00] italic text-[14px]">
                    *Lưu ý: {paymentInfo?.data?.attributes?.item[1]?.note}
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-4 md:pt-0">
                  <h5 className="text-[#000] font-bold text-[16px] text-center">
                    {paymentInfo?.data?.attributes?.item[1]?.nameBank}
                  </h5>
                  <div className="flex justify-center gap-4">
                    <p className="text-[#F30089] text-[16px] font-bold text-center">
                      {paymentInfo?.data?.attributes?.item[1]?.numberBank}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(
                          paymentInfo?.data?.attributes?.item[1]?.numberBank
                        )
                      }
                    >
                      <Image src={IconCopy} alt="icon" width={20} height={20} />
                    </button>
                  </div>
                  {/* {copySuccess && (
                    <p className="mt-2 text-green-500 font-semibold text-center md:text-start">
                      Đã sao chép vào clipboard!
                    </p>
                  )} */}
                  <div className="flex justify-center md:block">
                    <Image
                      src={
                        BASE_URL +
                        paymentInfo?.data?.attributes?.item[1]?.QR_code?.data
                          ?.attributes?.url
                      }
                      alt="Qr ngân hàng"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "Thanh toán khi nhận hàng" && (
          <div className="mt-4">
            <h3 className="text-[16px] font-semibold">
              Thanh toán khi nhận hàng:
            </h3>
            <p>Thanh toán khi bạn nhận được hàng từ nhân viên giao hàng.</p>
          </div>
        )}

        <div className="flex justify-center md:justify-end py-6">
          <button
            onClick={updateOrderStep2}
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
              {codeOrder}
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

  console.log(paymentInfo);

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
