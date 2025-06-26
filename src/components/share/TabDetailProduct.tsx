"use client";
import React, { useRef, useState } from "react";
import { quicksand } from "@/font";
import DemoProduct from "../../../public/images/product-detail.jpg";
import Image from "next/image";
import StartIcon from "../../../public/icon/start.svg";
import ArrowDrop from "../../../public/icon/arrowdown.svg";
import { Modal, Button } from "antd";
import CameraIcon from "../../../public/icon/camera-plus.svg";
import CardFeedBack from "./CardFeedBack";
import IconDown from "../../../public/icon/arrowdown.svg";
import IconRight from "../../../public/icon/chevron-right (1).svg";
import { motion } from "framer-motion";
import { IconStar } from "./IconStar";
interface TabDetailProductProps {
  data: any;
}
const TabDetailProduct: React.FC<TabDetailProductProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTabMobile, setActiveTabMobile] = useState<string | null>(null);
  const ratingRef = useRef(0);
  const [, forceUpdate] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggle = (tab: string) => {
    if (activeTabMobile === tab) {
      setActiveTabMobile(null); // If the tab is already active, close it
    } else {
      setActiveTabMobile(tab); // Otherwise, open the new tab
    }
  };

  const ProductDetails = ({ data }: any) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: data[0]?.attributes?.detail }}
        />
      </div>
    );
  };

  const Manual = ({ data }: any) => {
    return (
      <>
        <div className={`flex flex-col gap-8 ${quicksand.className}`}>
          <div className="bg-[#EBEBEB] p-8 rounded-[8px]">
            <h5 className="text-[20px] font-bold text-[#000000]">
              Cách sử dụng:
            </h5>
            <div
              dangerouslySetInnerHTML={{
                __html: data[0]?.attributes?.how_to_use,
              }}
            />
          </div>
          <div className="bg-[#EBEBEB] p-8 rounded-[8px]">
            <h5 className="text-[20px] font-bold text-[#000000]">
              Cách bảo quản:
            </h5>
            <div
              dangerouslySetInnerHTML={{
                __html: data[0]?.attributes?.how_to_preserve,
              }}
            />
          </div>
        </div>
      </>
    );
  };
  const FeedBack = () => {
    return (
      <>
        <div className="flex justify-between items-center">
          <div
            className={`${quicksand.className} flex flex-col md:flex-row gap-2 md:items-center`}
          >
            <div className="">
              <span className="text-[16px] tẽ md:text-[36px] text-[#383838] font-bold flex gap-2">
                <span> {data[0]?.attributes?.startAVG}</span>
                <Image
                  src={StartIcon}
                  width={16}
                  height={16}
                  alt="Icon star"
                  className="block md:hidden"
                />
              </span>
            </div>

            <Image
              src={StartIcon}
              width={40}
              height={40}
              alt="Icon star"
              className="hidden md:block"
            />
            <span className="text-[14px] md:text-[18px] text-[#383838] font-medium">
              ({data[0]?.attributes?.amountComment} lượt)
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${quicksand.className} block md:hidden bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-all text-[14px] font-medium`}
            >
              Viết đánh giá
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative ">
              <select
                className={`${quicksand.className} w-full bg-[#EBEBEB] appearance-none text-[#000000] text-[14px] font-medium rounded px-6 py-4 pr-10 focus:outline-none`}
                defaultValue="newest"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
              <Image
                src={ArrowDrop}
                alt="Arrow"
                className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 w-[16px] h-[16px]"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${quicksand.className} hidden md:block bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-all text-[14px] font-medium`}
            >
              Viết đánh giá
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 pt-8">
          {data[0]?.attributes?.feedbacks &&
            data[0]?.attributes?.feedbacks?.data?.map((item: any) => {
              return (
                <div className="col-span-12 md:col-span-6" key={item.id}>
                  <CardFeedBack data={item} />
                </div>
              );
            })}
        </div>

        <div className="flex justify-center pt-8">
          <button
            className={`px-12 py-4 ${quicksand.className} text-[16px] font-medium border border-solid border-gray-300 rounded-full`}
          >
            Xem thêm
          </button>
        </div>
      </>
    );
  };

  const tabData = [
    {
      key: "1",
      label: "Chi tiết sản phẩm",
      content: <ProductDetails data={data} />,
    },
    {
      key: "2",
      label: "Sử dụng và bảo quản",
      content: <Manual data={data} />,
    },
    {
      key: "3",
      label: "Đánh giá từ khách hàng",
      content: <FeedBack />,
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        {" "}
        <div className="tabs-container">
          {/* Tab navigation */}
          <div className="tabs">
            {tabData.map((tab) => (
              <div
                key={tab.key}
                className={`tab-label ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span
                  className={`text-[#737373] font-semibold ${quicksand.className} uppercase text-[16px]`}
                >
                  {tab.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tab content */}
          <div className="tab-content mt-6">
            {tabData.map(
              (tab) =>
                activeTab === tab.key && (
                  <div key={tab.key} className="tab-pane">
                    {tab.content}
                  </div>
                )
            )}
          </div>

          <style jsx>{`
            .tabs-container {
              width: 100%;
            }

            .tabs {
              display: flex;
              justify-content: center;
              border-bottom: 2px solid #ddd;
            }

            .tab-label {
              padding: 10px 20px;
              cursor: pointer;
              font-size: 16px;
            }

            .tab-label.active span {
              font-weight: bold;
              color: #000000;
            }

            .tab-content {
              padding: 20px;
            }

            .tab-pane {
              display: block;
            }
          `}</style>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="flex flex-col gap-2">
          {/* Mô tả Tab */}
          <button
            className={`py-2  text-left flex justify-between items-center ${
              activeTabMobile === "description" ? "" : ""
            }`}
            onClick={() => handleToggle("description")}
          >
            Chi tiết sản phẩm
            <Image
              src={activeTabMobile === "description" ? IconDown : IconRight}
              alt="Toggle"
              width={20}
              height={20}
            />
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: activeTabMobile === "description" ? "auto" : 0,
              opacity: activeTabMobile === "description" ? 1 : 0, // Optional: for smoother effect
            }}
            transition={{ duration: 0.3 }} // Thời gian chuyển động
            className="overflow-hidden"
          >
            {activeTabMobile === "description" && (
              <ProductDetails data={data} />
            )}
          </motion.div>

          {/* Đánh giá Tab */}
          <button
            className={`py-2 text-left flex justify-between items-center ${
              activeTabMobile === "reviews" ? "" : ""
            }`}
            onClick={() => handleToggle("reviews")}
          >
            Sử dụng và bảo quản
            <Image
              src={activeTabMobile === "reviews" ? IconDown : IconRight}
              alt="Toggle"
              width={20}
              height={20}
            />
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: activeTabMobile === "reviews" ? "auto" : 0,
              opacity: activeTabMobile === "reviews" ? 1 : 0, // Optional: for smoother effect
            }}
            transition={{ duration: 0.3 }} // Thời gian chuyển động
            className="overflow-hidden"
          >
            {activeTabMobile === "reviews" && <Manual data={data} />}
          </motion.div>

          {/* Chi tiết sản phẩm Tab */}
          <button
            className={`py-2  text-left flex justify-between items-center ${
              activeTabMobile === "details" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleToggle("details")}
          >
            Đánh giá
            <Image
              src={activeTabMobile === "details" ? IconDown : IconRight}
              alt="Toggle"
              width={20}
              height={20}
            />
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: activeTabMobile === "details" ? "auto" : 0,
              opacity: activeTabMobile === "details" ? 1 : 0, // Optional: for smoother effect
            }}
            transition={{ duration: 0.3 }} // Thời gian chuyển động
            className="overflow-hidden"
          >
            {activeTabMobile === "details" && <FeedBack />}
          </motion.div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} // ✨ Xóa footer mặc định
        closable={false}
        width="100%"
        style={{ maxWidth: 500 }} // Giới hạn max-width, chiếm toàn màn hình ở mobile
      >
        <div className={`${quicksand.className} `}>
          <h2 className="text-[18px] md:text-[20px] font-bold ">
            Đánh giá sản phẩm
          </h2>
          <div className="py-4 flex flex-col gap-4">
            <span className="text-[14px] font-semibold">
              Chất lượng sản phẩm
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  onClick={() => {
                    ratingRef.current = value;
                    forceUpdate((n) => n + 1); // ép update UI cho stars thôi
                  }}
                  className="cursor-pointer"
                >
                  <IconStar choosen={value <= ratingRef.current} />
                </div>
              ))}
            </div>
            <textarea
              placeholder="Mô tả"
              rows={6}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 resize-none text-sm"
            />
            <div>
              <h5 className="text-[#2A2A2A] text-[14px] font-semibold">
                Thêm hình ảnh/video
              </h5>
              <div className="mt-2">
                <label
                  htmlFor="media-upload"
                  className="flex flex-col items-center justify-center w-[100px] h-[100px] border-2 border-dotted border-gray-400 rounded-lg cursor-pointer hover:border-black transition-all"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Image
                      src={CameraIcon}
                      alt="Upload media"
                      width={40}
                      height={40}
                    />
                  </div>
                  <input
                    id="media-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-[150px] py-3 border border-solid border-[#909DAD] rounded-[8px]"
              >
                Huỷ
              </button>
              <button
                disabled={ratingRef.current === 0}
                className={`w-[150px] py-3 text-white rounded-[8px] ${
                  ratingRef.current === 0
                    ? "bg-[#C1C1C1] cursor-not-allowed"
                    : "bg-[#000000] hover:bg-[#333333]"
                }`}
              >
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TabDetailProduct;
