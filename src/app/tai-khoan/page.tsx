"use client";
import { quicksand } from "@/font";
import React, { useState, useEffect } from "react";
import DemoAvatar from "../../../public/images/avatar_demo.jpg";
import Image from "next/image";
import IconCamera from "../../../public/icon/camera.svg";
import MedalSliver from "../../../public/images/sliver.png";
import { Button, Modal, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ENDPOINT } from "@/enums/endpoint.enum";
import IconLeft from "../../../public/icon/chevron-right.svg";
import IconUser from "../../../public/icon/user.svg";
import IconCheck from "../../../public/icon/check.svg";
import TestImg from "../../../public/images/testimg.jpg";

const Page = () => {
  const [activeTab, setActiveTab] = useState<string | null>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState("");
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Hàm để toggle mở rộng hoặc đóng đơn hàng
  const toggleAccordion = (id: string) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null); // Đóng nếu đã mở
    } else {
      setExpandedOrderId(id); // Mở nếu chưa mở
    }
  };
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
  const TOKEN_DEV = process.env.NEXT_PUBLIC_TOKEN_DEV;
  useEffect(() => {
    const fetchHeaderData = async () => {
      setLoading(true); // Bắt đầu quá trình tải

      const jwtToken = localStorage.getItem("jwt");
      if (jwtToken) {
        try {
          const response = await fetch(`${ENDPOINT.GET_ME}?populate=picture`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok && data.id) {
            setUserData(data);
            setUserId(data?.id);
            setPicture(data.picture.url); // Không cần cho BASE_URL vào dependency
          } else {
            console.error("Không có dữ liệu người dùng.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        } finally {
          setLoading(false); // Kết thúc quá trình tải
        }
      } else {
        console.error("Không có JWT token.");
        setLoading(false); // Kết thúc quá trình tải nếu không có token
      }
    };
    fetchHeaderData();
  }, []); // Chạy 1 lần khi component mount

  useEffect(() => {
    // Chỉ fetch khi userId đã có giá trị
    if (!userId) return;

    const fetchOrderByUser = async () => {
      setLoading(true); // Bắt đầu quá trình tải
      console.log(userId); // Kiểm tra xem userId có đúng không
      try {
        const response = await fetch(`${ENDPOINT.GET_DON_HANG}/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN_DEV}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchOrderByUser();
  }, [userId]); // Phụ thuộc vào userId, chỉ fetch khi userId có giá trị

  const showModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };
  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  const handleLogoutModalOk = () => {
    setIsLogoutModalVisible(false);
    // Xử lý đăng xuất ở đây, ví dụ như xóa JWT
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    window.location.href = "/dang-nhap"; // Redirect về trang đăng nhập
  };
  const handleLogoutModalCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "ID_order",
      key: "ID_order",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "date_order",
      key: "date_order",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "geekblue";
        if (status === "Chờ xác nhận") {
          color = "orange";
        } else if (status === "Đang đóng gói") {
          color = "blue";
        } else if (status === "Đã giao") {
          color = "green";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "finalAmount",
      key: "finalAmount",
      render: (amount: number) => (
        <span style={{ fontWeight: "bold" }}>
          {`${amount.toLocaleString()} đ`}
        </span>
      ),
    },
  ];

  // Hàm để thay đổi tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const TabInfoAccount = () => {
    return (
      <>
        <h5 className="text-[#383838] text-[20px] font-bold uppercase">
          Thông tin tài khoản
        </h5>
        <div className="pt-[16px] pb-[40px] flex flex-col gap-[16px]">
          <div>
            <span className="text-[#383838] text-[14px]">Họ </span>
            <input
              type="text"
              value={userData?.firstName || ""}
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">Tên</span>
            <input
              type="text"
              value={userData?.lastName || ""}
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">Sô điện thoại</span>
            <input
              type="text"
              value={userData?.phone || ""}
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">Email</span>
            <input
              value={userData?.email || ""}
              readOnly
              type="text"
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">Địa chỉ</span>
            <input
              value={userData?.address || ""}
              type="text"
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
        </div>
        <h5 className="text-[#383838] text-[20px] font-bold uppercase">
          Mật khẩu
        </h5>
        <div className="pt-[16px]  flex flex-col gap-[16px]">
          <div>
            <span className="text-[#383838] text-[14px]">
              Mật khẩu hiện tại
            </span>
            <input
              type="text"
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">Mật khẩu mới</span>
            <input
              type="text"
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <div>
            <span className="text-[#383838] text-[14px]">
              Nhập lại mật khẩu mới
            </span>
            <input
              type="text"
              className="w-[100%] mt-2 h-[44px] pl-2 border border-solid border-[#BFBFBF] bg-[#fff] outline-none"
            />
          </div>
          <button className="px-[40px] py-[10px] bg-[#000] w-max text-[#ffff]">
            Lưu chỉnh sửa
          </button>
        </div>
      </>
    );
  };

  const TabOrder = () => {
    return (
      <>
        <h5 className="text-[20px] pb-[40px] font-bold">Đơn hàng của bạn</h5>
        <Table
          columns={columns}
          dataSource={order?.data} // Đảm bảo sử dụng order.data thay vì chỉ order
          pagination={false}
          onRow={(record) => ({
            onClick: () => showModal(record),
            className: "cursor-pointer",
          })}
        />
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          closable={false}
          width="80%"
        >
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-8">
              <div className="flex items-center gap-2">
                <h5 className="text-[#1D242D]">Đơn hàng</h5>
                <span className="font-bold text-[18px]">#3456_980</span>
              </div>

              <div className="pt-[32px]">
                <div className="flex justify-between">
                  <div>
                    <div className="w-[40px] h-[40px] bg-[#C0E4CA] rounded-full flex items-center justify-center relative">
                      <Image
                        src={IconCheck}
                        alt="Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h5 className="py-4 text-[#2A2A2A] font-bold">
                      CHỜ XÁC NHẬN
                    </h5>
                  </div>
                  <div>
                    <div className="w-[40px] h-[40px] bg-[#C0E4CA] rounded-full flex items-center justify-center relative">
                      <Image
                        src={IconCheck}
                        alt="Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h5 className="py-4 text-[#2A2A2A] font-bold">ĐÓNG GÓI</h5>
                  </div>
                  <div>
                    <div className="w-[40px] h-[40px] bg-[#C0E4CA] rounded-full flex items-center justify-center relative">
                      <Image
                        src={IconCheck}
                        alt="Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h5 className="py-4 text-[#2A2A2A] font-bold">
                      VẬN CHUYỂN
                    </h5>
                  </div>
                  <div>
                    <div className="w-[40px] h-[40px] bg-[#C0E4CA] rounded-full flex items-center justify-center relative">
                      <Image
                        src={IconCheck}
                        alt="Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h5 className="py-4 text-[#2A2A2A] font-bold">GIAO HÀNG</h5>
                  </div>
                </div>
                <div className="px-[16px] pt-[16px] bg-[#F8F8F8]">
                  <h5 className="text-[#737373] text-[14px]">
                    Thông tin nhận hàng
                  </h5>
                  <div className="py-[12px] px-[16px]">
                    <div className="flex gap-[16px] items-center">
                      <h5 className="text-[#2A2A2A] font-bold">
                        Le Huong Thao
                      </h5>
                      <span className="text-[#219653] font-bold">
                        +84 933724566
                      </span>
                      <span className="text-[#1D242D]">Anguyen@gmail.com</span>
                    </div>
                    <h5 className="py-[16px] text-[#1D242D] font-bold">
                      Địa chỉ: Lô B chung cư XYZ, Phường 10, Quận 5, Hồ Chí
                      Minh.
                    </h5>
                  </div>
                </div>

                <div className="pt-[16px]">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment-method-cod"
                      name="payment-method"
                      value="Thanh toán khi nhận hàng"
                      className="accent-[#219653]"
                    />
                    <label
                      htmlFor="payment-method-cod"
                      className="text-[#1D242D] font-bold text-[16px]"
                    >
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="radio"
                      id="payment-method-online"
                      name="payment-method"
                      value="Thanh toán online"
                      className="accent-[#219653]"
                    />
                    <label
                      htmlFor="payment-method-online"
                      className="text-[#1D242D] font-bold text-[16px]"
                    >
                      Thanh toán online
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="pt-[32px]">
                <div className="flex justify-between py-[8px]">
                  <h5 className="text-[#2A2A2A] font-bold">Tạm tính</h5>
                  <span className="text-[#2A2A2A] font-bold">1.799.000 đ</span>
                </div>
                <div className="flex justify-between py-[8px]">
                  <h5 className="text-[#2A2A2A] font-bold">Giảm giá (-20%)</h5>
                  <span className="text-[#D40000] font-bold">-359.000 đ</span>
                </div>
                <div className="flex justify-between py-[8px]">
                  <h5 className="text-[#2A2A2A] font-bold">Voucher</h5>
                  <span className="text-[#D40000] font-bold">-100.000 đ</span>
                </div>
                <div className="flex justify-between py-[8px]">
                  <h5 className="text-[#2A2A2A] font-bold">Vận chuyển</h5>
                  <span className="text-[#219653] font-bold">Free</span>
                </div>
                <hr className="my-[16px]" />
                <div className="flex justify-between py-[8px]">
                  <h5 className="text-[#1D242D] font-bold text-[18px]">
                    TỔNG CỘNG
                  </h5>
                  <span className="text-[#1D242D] font-bold text-[18px]">
                    1.340.000 đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const SkeletonLoadingBoxInfo = () => {
    return (
      <div className="bg-[#fff] px-[16px] py-[40px]">
        <div className="flex flex-col gap-[6px]">
          <div className="flex justify-center">
            <div className="relative w-max">
              {/* Skeleton for Profile Picture */}
              <div className="w-[80px] h-[80px] bg-gray-300 rounded-full animate-pulse"></div>
              <div className="bg-[#383838] p-1 w-max rounded-[8px] absolute bottom-0 right-0">
                <div className="w-[16px] h-[16px] bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Skeleton for Name */}
          <h2 className="text-[20px] font-bold text-center">
            <div className="w-[120px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
          </h2>

          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-1">
              {/* Skeleton for "Member" text */}
              <h5 className="text-[#595959] font-[12px] text-center">
                <div className="w-[80px] h-[12px] bg-gray-300 rounded animate-pulse"></div>
              </h5>
              <div className="flex justify-center">
                {/* Skeleton for Medal */}
                <div className="w-[32px] h-[32px] bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              {/* Skeleton for Member Type */}
              <h5 className="text-[#000] text-[16px] font-bold text-center">
                <div className="w-[60px] h-[16px] bg-gray-300 rounded animate-pulse"></div>
              </h5>
            </div>
          </div>
        </div>

        <div className="pt-[40px]">
          {/* Skeleton for Tab List */}
          <ul className="flex flex-col gap-[12px]">
            {["Tài Khoản", "Đơn hàng", "Yêu thích"].map((item, index) => (
              <li
                key={index}
                className="py-[8px] text-[#383838] text-[16px] cursor-pointer"
              >
                <div className="w-[100px] h-[16px] bg-gray-300 rounded animate-pulse"></div>
              </li>
            ))}
            <li className="py-[8px] text-[#D40000] text-[16px] font-bold cursor-pointer">
              <div className="w-[100px] h-[16px] bg-gray-300 rounded animate-pulse"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const TabOrderMobile = () => {
    // Giả sử order là một mảng chứa các đơn hàng
    const orders = order?.data || [];
    const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;

    return (
      <>
        <div className="w-full bg-white p-4">
          {orders.map((orderItem: any, index: any) => (
            <div
              key={index}
              className="mb-6"
              onClick={() => toggleAccordion(orderItem?.ID_order)}
            >
              <div className="flex items-center justify-between pb-4">
                <div className="text-xl font-semibold text-gray-900">
                  <span>ID: </span>
                  <span className="text-blue-500">{orderItem?.ID_order}</span>
                </div>
                <span className="text-orange-500 font-semibold">
                  {orderItem?.status}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {/* Hiển thị sản phẩm cho mỗi đơn hàng */}
                {orderItem?.items?.map((item: any, itemIndex: any) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    <div className="w-[80px] h-[80px] bg-gray-200 rounded-md">
                      <Image
                        src={
                          BASE_URL + item?.san_pham?.images?.[0]?.url || TestImg
                        } // Lấy ảnh đầu tiên của sản phẩm và ghép BASE_URL vào đầu
                        alt={item?.san_pham?.title || "Sản phẩm"}
                        className="object-cover w-full h-full rounded-md"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-lg font-semibold text-gray-800">
                        {item?.san_pham?.title || "Sản phẩm"}
                      </h5>
                      <p className="text-gray-500">{item?.size || "M"}</p>
                      <span className="text-gray-800">
                        {item?.amount} x{" "}
                        {item?.price?.toLocaleString() || "0 đ"}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Ngày đặt */}
                <div className="flex justify-between items-center pt-4">
                  <div className="text-gray-500">Ngày đặt</div>
                  <div className="font-semibold text-gray-900">
                    {orderItem?.date_order || "Ngày không xác định"}
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="flex justify-between pt-4 font-semibold text-gray-900">
                  <div className="text-lg">Tổng cộng</div>
                  <div className="text-lg">
                    {orderItem?.finalAmount?.toLocaleString() || "0 đ"}
                  </div>
                </div>
              </div>

              {expandedOrderId === orderItem?.ID_order && (
                <div>
                  {/* <div className="flex justify-between">
                    <h2 className="text-[#383838]">Tạm tính</h2>
                    <h5>
                      {" "}
                      {orderItem?.price_not_reduced?.toLocaleString() ||
                        "0 đ"}{" "}
                    </h5>
                  </div> */}
                  <h5 className="text-[#595959] text-[14px]">
                    Thông tin nhận hàng
                  </h5>
                  <div className="pt-[8px] flex items-center gap-4">
                    <h5 className="text-[#2A2A2A] font-bold">
                      {orderItem?.firstName + orderItem?.lastName}
                    </h5>
                    <span className="text-[#219653] font-bold">
                      {orderItem?.phone}
                    </span>
                  </div>
                  <h5 className="py-2">{orderItem?.email}</h5>
                  <h5 className="font-bold text-[#1D242D]">
                    Địa chỉ: {orderItem?.address}
                  </h5>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= 768;
      setIsMobile(isCurrentlyMobile);
      // Set default activeTab to 'account' for desktop
      if (!isCurrentlyMobile && activeTab === "") {
        setActiveTab("account");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]); // Dependency on activeTab so it resets when switching to desktop
  const handleGoBack = () => {
    setActiveTab(null); // Quay lại danh sách tab, ẩn phần nội dung
  };

  return (
    <>
      <div className={`${quicksand.className}  container py-8`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[80px]">
          {/* Phần danh sách Tab */}
          <div
            className={`col-span-2 md:col-span-4 md:block ${
              activeTab ? "hidden" : ""
            }`}
          >
            {userData && picture ? (
              <div className="bg-[#fff] px-[16px] py-[40px] max-w-full overflow-hidden">
                <div className="flex flex-col gap-[6px]">
                  {/* Profile Picture */}
                  <div className="flex justify-center">
                    <div className="relative w-max">
                      <Image
                        src={BASE_URL + picture || ""}
                        className="w-[80px] h-[80px] rounded-full max-w-full object-cover"
                        width={80}
                        height={80}
                        alt={userData?.firstName + userData?.lastName || ""}
                      />
                      <div className="bg-[#383838] p-1 w-max rounded-[8px] absolute bottom-0 right-0">
                        <Image
                          src={IconCamera}
                          alt="camera"
                          className="w-[16px] h-[16px]"
                        />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-[20px] font-bold text-center">
                    {userData?.firstName + " " + userData?.lastName}
                  </h2>

                  <div className="pt-[40px]">
                    {/* Danh sách Tab */}
                    <ul className="flex flex-col gap-[12px]">
                      <li
                        className={`py-[8px] text-[#383838] text-[16px] cursor-pointer ${
                          activeTab === "account" ? "active-tab-profile" : ""
                        }`}
                        onClick={() => handleTabClick("account")}
                      >
                        Tài Khoản
                      </li>
                      <li
                        className={`py-[8px] text-[#383838] text-[16px] cursor-pointer ${
                          activeTab === "orders" ? "active-tab-profile" : ""
                        }`}
                        onClick={() => handleTabClick("orders")}
                      >
                        Đơn hàng
                      </li>
                      <li
                        className={`py-[8px] text-[#383838] text-[16px] cursor-pointer ${
                          activeTab === "favorites" ? "active-tab-profile" : ""
                        }`}
                        onClick={() => handleTabClick("favorites")}
                      >
                        Yêu thích
                      </li>
                      <li
                        onClick={showLogoutModal}
                        className="py-[8px] text-[#D40000] text-[16px] font-bold cursor-pointer"
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <SkeletonLoadingBoxInfo />
            )}
          </div>

          {/* Phần Tab Content (Chỉ hiển thị khi activeTab có giá trị) */}
          <div className="col-span-2 md:col-span-8">
            {/* Ẩn phần Tab Content khi không có activeTab */}
            <div className={`${activeTab ? "block" : "hidden"}`}>
              {activeTab === "account" && (
                <div>
                  <button
                    className="mb-[20px] text-[#000] md:hidden"
                    onClick={handleGoBack} // Quay lại phần danh sách tab
                  >
                    <div className="flex items-center">
                      {" "}
                      <Image src={IconLeft} width={20} alt="Icon" height={20} />
                      <span>Thông tin tài khoản</span>
                    </div>
                  </button>
                  <TabInfoAccount />
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <button
                    className="mb-[20px] text-[#000] md:hidden"
                    onClick={handleGoBack} // Quay lại phần danh sách tab
                  >
                    <div className="flex items-center">
                      <Image src={IconLeft} width={20} alt="Icon" height={20} />
                      <span>Đơn hàng của bạn</span>
                    </div>
                  </button>
                  <div className="hidden md:block">
                    <TabOrder />
                  </div>

                  <div className="md:hidden">
                    <TabOrderMobile />
                  </div>
                </div>
              )}

              {activeTab === "favorites" && (
                <div>
                  <button
                    className="mb-[20px] text-[#000] md:hidden"
                    onClick={handleGoBack} // Quay lại phần danh sách tab
                  >
                    <div className="flex items-center">
                      {" "}
                      <Image src={IconLeft} width={20} alt="Icon" height={20} />
                      <span>Yêu thích</span>
                    </div>
                  </button>
                  <h3 className="text-[18px] font-bold">Yêu thích</h3>
                  <p className="text-[14px]">Các sản phẩm yêu thích của bạn.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="ĐĂNG XUẤT"
        visible={isLogoutModalVisible}
        onOk={handleLogoutModalOk}
        onCancel={handleLogoutModalCancel}
        footer={[
          <button
            key="back"
            className="px-[16px] py-[12px] bg-[#EBEBEB] mx-[24px] rounded-[2px]"
            onClick={handleLogoutModalCancel}
          >
            Đóng
          </button>,
          <button
            className="px-[16px] py-[12px] bg-[#000000] text-[#fff] rounded-[2px]"
            key="submit"
            onClick={handleLogoutModalOk}
          >
            Đăng xuất
          </button>,
        ]}
      >
        <p className="pb-[24px]">
          Bạn chắc chắn muốn đăng xuất khỏi tài khoản?
        </p>
        <hr className="py-[12px]" />
      </Modal>
    </>
  );
};

export default Page;
