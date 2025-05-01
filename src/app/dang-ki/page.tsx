"use client";
import React, { useState } from "react";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import { quicksand } from "@/font";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { DatePicker } from "antd";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import dayjs from "dayjs";
import { notification } from "antd";

const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Tài khoản", link: "#" },
];
import { Input } from "antd";
const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: any, dateString: any) => {
    setFormData({ ...formData, date: dateString });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const {
      firstName,
      lastName,
      date,
      email,
      password,
      phone,
      confirmPassword,
    } = formData;
    // Kiểm tra xem mật khẩu và nhập lại mật khẩu có khớp nhau không
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      setLoading(false);
      return;
    }

    const username = email; // Gán username bằng email

    // Kiểm tra và chuyển đổi date sang định dạng yyyy-MM-dd
    const formattedDate = dayjs(date).isValid()
      ? dayjs(date).format("YYYY-MM-DD")
      : null;

    try {
      const response = await apiService.post(ENDPOINT.REGISTER, {
        firstName,
        lastName,
        date: formattedDate, // Dùng date đã được định dạng
        email,
        password,
        username,
        phone,
      });

      // Nếu đăng ký thành công, có thể chuyển hướng hoặc thông báo thành công
      console.log("Đăng ký thành công:", response);
      notification.success({
        message: "Đăng ký thành công",
        description: "Bạn đã đăng ký tài khoản thành công.",
      });
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dang-nhap";
      }, 1000);
      // Redirect hoặc thông báo thành công
    } catch (error) {
      setErrorMessage("Đăng ký thất bại, vui lòng thử lại!");
      setLoading(false);
    }
  };

  return (
    <div className={`${quicksand.className}  container py-8`}>
      <BreadcrumbBlack paths={paths} />
      <div className="flex justify-center">
        <div className="w-full md:w-[40%]">
          <div className="flex flex-col gap-4">
            <h2
              className={`text-[20px] font-bold text-[#000000] text-center pt-8 md:pt-0`}
            >
              ĐĂNG KÝ
            </h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] font-medium pb-2">
                  Tên <span className="text-[#E03529]">*</span>
                </p>
                <Input
                  name="name"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nhập tên của bạn"
                  className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] font-medium pb-2">
                  Họ <span className="text-[#E03529]">*</span>
                </p>
                <Input
                  name="surname"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nhập họ của bạn"
                  className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Số điện thoại <span className="text-[#E03529]">*</span>
              </p>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Ngày sinh</p>
              <DatePicker
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                placeholder="dd-mm-yyyy"
                className="w-full h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Email <span className="text-[#E03529]">*</span>
              </p>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email thoại của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Mật khẩu <span className="text-[#E03529]">*</span>
              </p>
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu của bạn"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="text-black" />
                  ) : (
                    <EyeInvisibleOutlined className="text-black" />
                  )
                }
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">
                Nhập lại mật khẩu <span className="text-[#E03529]">*</span>
              </p>
              <Input.Password
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu của bạn"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="text-black" />
                  ) : (
                    <EyeInvisibleOutlined className="text-black" />
                  )
                }
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-[#141414] font-normal text-[16px]">
                Nếu bạn đã có tài khoản ?
              </span>
              <Link
                href="/dang-nhap"
                className="text-[16px] font-bold text-[#000000]"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
