"use client";
import React, { useState } from "react";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { notification } from "antd";
const FormContact = () => {
  const [name, setName] = useState(""); // Trạng thái cho tên
  const [phone, setPhone] = useState(""); // Trạng thái cho số điện thoại
  const [email, setEmail] = useState(""); // Trạng thái cho email
  const [content, setContent] = useState(""); // Trạng thái cho nội dung
  const handleSubmit = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
      const response = await fetch(ENDPOINT.POST_LIEN_HE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            name,
            phone,
            email,
            content,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        notification.success({
          message: "Gửi liên hệ thành công!",
          description:
            "Chúng tôi đã nhận được thông tin của bạn. Cảm ơn bạn đã liên hệ!",
        });
        // Reset form
        setName("");
        setPhone("");
        setEmail("");
        setContent("");
      } else {
        notification.error({
          message: "Gửi liên hệ thất bại",
          description: "Đã xảy ra lỗi khi gửi dữ liệu, vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối với máy chủ, vui lòng thử lại sau.",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h5 className="text-[14px] font-medium text-[#383838] pb-2">
          Họ và tên
        </h5>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
        />
      </div>
      <div>
        <h5 className="text-[14px] font-medium text-[#383838] pb-2">
          Số điện thoại
        </h5>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
        />
      </div>
      <div>
        <h5 className="text-[14px] font-medium text-[#383838] pb-2">Email</h5>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="outline-none w-full h-[44px] bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3"
        />
      </div>
      <div>
        <h5 className="text-[14px] font-medium text-[#383838] pb-2">
          Nội dung cần hỗ trợ
        </h5>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4} // Bạn có thể điều chỉnh số dòng tùy ý
          className="outline-none w-full bg-inherit border border-[#BFBFBF] rounded-[4px] pl-3 py-2 resize-none"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="text-[16px] text-[#fff] py-4 px-20 bg-[#000000]"
        >
          Gửi liên hệ
        </button>
      </div>
    </div>
  );
};

export default FormContact;
