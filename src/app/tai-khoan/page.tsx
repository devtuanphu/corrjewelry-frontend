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
const Page = () => {
  const [activeTab, setActiveTab] = useState<string | null>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
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
  }, []); // Không cần BASE_URL ở đây, vì nó là một giá trị cố định

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
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>, // In đậm
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      // Không cần in đậm cho cột này
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
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span
          style={{ fontWeight: "bold" }}
        >{`${amount.toLocaleString()} đ`}</span>
      ), // In đậm
    },
  ];
  const data = [
    {
      key: "1",
      orderId: "#3456_768",
      orderDate: "11/02/2025",
      status: "Chờ xác nhận",
      amount: 1100000,
    },
    {
      key: "2",
      orderId: "#3456_980",
      orderDate: "10/02/2025",
      status: "Đang đóng gói",
      amount: 1100000,
    },
    {
      key: "3",
      orderId: "#3456_120",
      orderDate: "19/01/2025",
      status: "Đã giao",
      amount: 850000,
    },
    {
      key: "4",
      orderId: "#3456_030",
      orderDate: "20/12/2024",
      status: "Đã giao",
      amount: 900000,
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
          dataSource={data}
          pagination={false}
          onRow={(record) => ({
            onClick: () => showModal(record),
            className: "cursor-pointer",
          })}
        />
        <Modal
          title="Thông tin đơn hàng"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          {selectedOrder && (
            <div>
              <p>
                <strong>Mã đơn hàng:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {selectedOrder.orderDate}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Thành tiền:</strong>{" "}
                {`${selectedOrder.amount.toLocaleString()} đ`}
              </p>
            </div>
          )}
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
                      {" "}
                      <Image src={IconLeft} width={20} alt="Icon" height={20} />
                      <span>Đơn hàng của bạn</span>
                    </div>
                  </button>
                  <TabOrder />
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
