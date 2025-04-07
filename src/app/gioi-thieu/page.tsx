import React from "react";
import ImageGioiThieu from "../../../public/images/gioi-thieu.jpg";
import Image from "next/image";
import { robotosand, robotocondensed, quicksand } from "@/font";
import IconShoppe from "../../../public/images/shoppe.png";
import IconInsta from "../../../public/images/mingcute_ins-fill.png";
import IconTiktok from "../../../public/images/tiktok.png";
import CheTacImage from "../../../public/images/gioi-thieu-3.jpg";
import GioiThieuImage from "../../../public/images/image-gioi-thieu-2.jpg";
import BlogSection from "@/components/home/BlogSection";
const page = () => {
  return (
    <>
      <div className={`bg-[#ffffff] ${robotocondensed.className}`}>
        {" "}
        <div className="container py-8">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-6">
              <Image src={ImageGioiThieu} alt="Giới thiệu" className="w-full" />
            </div>

            <div
              className={`${robotocondensed.className} col-span-12 md:col-span-6`}
            >
              <div>
                <h2 className="text-[#000000] text-[20px] md:text-[40px] font-medium">
                  CORR
                </h2>
                <p className="text-[18px] md:text-[24px] font-medium">
                  Tinh Hoa Trang Sức Bạc, Tỏa Sáng Phong Cách
                </p>
              </div>
              <div className="py-10 border-b border-solid ">
                <p className={`${quicksand.className} text-[16px]`}>
                  CORR ra đời với sứ mệnh mang đến những món trang sức bạc tinh
                  xảo, hiện đại, giúp tôn vinh vẻ đẹp và cá tính của mỗi khách
                  hàng. Chúng tôi không chỉ tạo ra trang sức, mà còn kiến tạo
                  giá trị – nơi mỗi thiết kế đều chứa đựng sự sáng tạo, đam mê
                  và chất lượng vượt trội.
                </p>
              </div>

              <div className="pt-8">
                <h5 className="text-[16px] font-bold">
                  Theo Dõi CORR – Trang Sức Bạc Mới Nhất
                </h5>
                <div className="flex flex-col md:flex-row  gap-4 py-4">
                  <div className="flex gap-2">
                    <Image
                      src={IconShoppe}
                      alt="icon"
                      className="w-[22px] h-[22px]"
                    />
                    <div>
                      <span
                        className={`${quicksand.className} text-[14px] font-semibold text-[#141414]`}
                      >
                        CORRjewelry
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src={IconInsta}
                      alt="icon"
                      className="w-[22px] h-[22px]"
                    />
                    <div>
                      <span
                        className={`${quicksand.className} text-[14px] font-semibold text-[#141414]`}
                      >
                        CORRjewelry
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src={IconTiktok}
                      alt="icon"
                      className="w-[22px] h-[22px]"
                    />
                    <div>
                      <span
                        className={`${quicksand.className} text-[14px] font-semibold text-[#141414]`}
                      >
                        CORRjewelry
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pt-[500px] md:relative">
        <div className="container md:absolute md:top-[120px] md:left-1/2 md:transform md:-translate-x-1/2">
          <div className="bg-[#ffffff] w-full p-4 md:p-12">
            <div className="grid grid-cols-12 gap-2 md:gap-12">
              <div className="col-span-12 md:col-span-6  md:pl-12">
                <h2
                  className={`${robotocondensed.className} text-[32px] md:text-[40px] font-bold text-center`}
                >
                  Hành Trình & Sứ Mệnh
                </h2>
                <p
                  className={`${quicksand.className} py-8 text-[16px] font-medium`}
                >
                  Được thành lập vào năm 2024, CORR không ngừng phát triển và
                  trở thành thương hiệu trang sức bạc được yêu thích tại Việt
                  Nam. Mỗi sản phẩm của chúng tôi không chỉ là món phụ kiện thời
                  trang mà còn là biểu tượng của sự thanh lịch, cá tính và những
                  khoảnh khắc đáng nhớ trong cuộc sống.
                </p>
                <ul
                  className={`${quicksand.className} text-[16px] font-medium list-disc pl-[20px]`}
                >
                  <li>
                    Hơn 1.000 khách hàng tin tưởng, đồng hành cùng CORR qua nền
                    tảng trực tuyến.
                  </li>
                  <li>
                    Hơn 1.000 sản phẩm đã được trao gửi, trở thành món quà ý
                    nghĩa, đồng hành cùng khách hàng trong những khoảnh khắc
                    đáng nhớ
                  </li>
                  <li>
                    Chất liệu bạc 925 cao cấp, chế tác tinh xảo, bền đẹp theo
                    thời gian, an toàn và thân thiện với làn da
                  </li>
                </ul>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Image src={CheTacImage} className="w-full" alt="Giới thiệu" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#000000] pt-8 mt-8 md:mt-0 md:pt-[300px] pb-[100px]">
          <div className="flex justify-center">
            <div className="w-full px-6 md:px-0 md:w-[65%] ">
              {" "}
              <div
                className={`${quicksand.className} text-center flex flex-col gap-4 `}
              >
                <h5 className="text-[16px] text-[#ffffff] uppercase font-medium">
                  Become one of us!
                </h5>
                <h5 className="text-[32px] md:text-[48px] font-semibold text-[#ffffff]">
                  Đội Ngũ CORR – Sáng Tạo Vì Bạn
                </h5>
                <p className="text-[18px] text-[#F5F5F5]">
                  Tại CORR, chúng tôi không chỉ bán trang sức – chúng tôi mang
                  đến những câu chuyện, cảm xúc và sự kết nối. Dù là một món quà
                  tặng người thương hay một dấu ấn dành riêng cho bạn, CORR luôn
                  sẵn sàng đồng hành cùng bạn trong mọi khoảnh khắc. CORR –
                  Trang sức bạc dành riêng cho bạn, vì bạn xứng đáng tỏa sáng!
                </p>
                <p className="text-[18px] font-bold text-[#ffffff]">
                  CORR – Trang sức bạc dành riêng cho bạn, vì bạn xứng đáng tỏa
                  sáng!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[700px] relative overflow-hidden">
        <Image
          src={GioiThieuImage}
          alt="Giới thiệu"
          fill
          className="object-cover"
          priority // optional, nếu là ảnh trên fold đầu
        />
      </div>
      <div className="py-12">
        {" "}
        <BlogSection />
      </div>
    </>
  );
};

export default page;
