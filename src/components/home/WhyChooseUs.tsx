"use server";
import React from "react";
import { robotosand, quicksand } from "@/font";
import BoxImage from "../../../public/icon/Box.svg";
import Image from "next/image";
import UyTinImage from "../../../public/icon/uytin.svg";
import DeliImage from "../../../public/icon/deli.svg";
import ThanhToanImage from "../../../public/icon/thanhtoan.svg";
interface PropsWhyChooseUs {
  dataWhy: any;
}
const WhyChooseUs: React.FC<PropsWhyChooseUs> = async ({ dataWhy }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return (
    <>
      <div>
        <div className="pb-4">
          <h2
            className={`text-center ${robotosand.className} font-medium text-[20px] uppercase text-[#000000]`}
          >
            why choose us
          </h2>
        </div>
        <div className="bg-[#EBEBEB] py-8">
          <div className="container">
            <div className="grid grid-cols-12 gap-2 md:gap-8">
              {dataWhy &&
                dataWhy.map((item: any) => {
                  return (
                    <>
                      <div className="col-span-6 md:col-span-3">
                        <div className={`${quicksand.className} text-center`}>
                          <div className="flex justify-center gap-2">
                            <Image
                              src={`${baseUrl}${item?.icon?.data?.attributes?.url}`}
                              width={24}
                              height={24}
                              alt={item?.title}
                            />
                            <span className="font-bold text-[15px] text-[#2A2A2A]">
                              {item?.title}
                            </span>
                          </div>
                          <div className="flex justify-center pt-2">
                            <div className="w-[70%]">
                              <p className="text-[#000000] text-[14px] font-normal">
                                {item?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              {/* <div className="col-span-6 md:col-span-3">
                <div className={`${quicksand.className} text-center`}>
                  <div className="flex justify-center gap-2">
                    <Image
                      src={BoxImage}
                      width={24}
                      height={24}
                      alt="Đóng gói cẩn thận"
                    />
                    <span className="font-bold text-[15px] text-[#2A2A2A]">
                      Đóng gói cẩn thận
                    </span>
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-[70%]">
                      <p className="text-[#000000] text-[14px] font-normal">
                        Có hỗ trợ set up và paketging quà theo yêu cầu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className={`${quicksand.className} text-center`}>
                  <div className="flex justify-center gap-2">
                    <Image
                      src={UyTinImage}
                      width={24}
                      height={24}
                      alt="Uy tín và chất lượng"
                    />
                    <span className="font-bold text-[15px] text-[#2A2A2A]">
                      Uy tín và chất lượng
                    </span>
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-[70%]">
                      <p className="text-[#000000] text-[14px] font-normal">
                        100% chất liệu bạc và có giấy kiểm tra quang phổ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className={`${quicksand.className} text-center`}>
                  <div className="flex justify-center gap-2">
                    <Image
                      src={DeliImage}
                      width={24}
                      height={24}
                      alt="Fast Delivery"
                    />
                    <span className="font-bold text-[15px] text-[#2A2A2A]">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-[70%]">
                      <p className="text-[#000000] text-[14px] font-normal">
                        Nhận hàng từ 1 - 4 ngày làm việc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className={`${quicksand.className} text-center`}>
                  <div className="flex justify-center gap-2">
                    <Image
                      src={ThanhToanImage}
                      width={24}
                      height={24}
                      alt="Thanh toán an toàn"
                    />
                    <span className="font-bold text-[15px] text-[#2A2A2A]">
                      Thanh toán an toàn
                    </span>
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-[70%]">
                      <p className="text-[#000000] text-[14px] font-normal">
                        Xác nhận giao dịch qua email trong vòng 24h
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
