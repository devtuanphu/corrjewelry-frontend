"use server";
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
import { ENDPOINT } from "@/enums/endpoint.enum";
import Link from "next/link";
const searchData = {
  populate: [
    "seo.thumbnail",
    "banner",
    "img_bestseller",
    "img1",
    "link_shop.icon",
    "img_trip",
    "imgBig",
  ].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();
async function fetchWithToken(endpoint: string) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function generateMetadata() {
  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_GIOI_THIEU}?${searchParams}`
  );

  const seo =
    (dataHome &&
      dataHome.data &&
      dataHome.data.attributes &&
      dataHome.data.attributes.seo) ||
    {};

  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/home`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}
const page = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_GIOI_THIEU}?${searchParams}`
  );
  console.log(dataHome);
  const blog = await fetchWithToken(
    `${ENDPOINT.GET_BLOG}?populate=seo.thumbnail&pagination[page]=1&pagination[pageSize]=3`
  );

  const dataBlog = blog?.data;

  const image1 =
    baseUrl + dataHome?.data?.attributes?.img1?.data?.attributes?.url;

  const imgTrip =
    baseUrl + dataHome?.data?.attributes?.img_trip?.data?.attributes?.url;

  const imgBig =
    baseUrl + dataHome?.data?.attributes?.imgBig?.data?.attributes?.url;

  return (
    <>
      <div className={`bg-[#ffffff] ${robotocondensed.className}`}>
        {" "}
        <div className="container py-8">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-6">
              <Image
                src={image1}
                alt="Giới thiệu"
                className="w-full"
                width={1980}
                height={200}
                priority
              />
            </div>

            <div
              className={`${robotocondensed.className} col-span-12 md:col-span-6`}
            >
              <div>
                <h2 className="text-[#000000] text-[20px] md:text-[40px] font-medium">
                  {dataHome?.data?.attributes?.title}
                </h2>
                <p className="text-[18px] md:text-[24px] font-medium">
                  {dataHome?.data?.attributes?.subtitle}
                </p>
              </div>
              <div className="py-10 border-b border-solid ">
                <p className={`${quicksand.className} text-[16px]`}>
                  {dataHome?.data?.attributes?.description}
                </p>
              </div>

              <div className="pt-8">
                <h5 className="text-[16px] font-bold">
                  Theo Dõi CORR – Trang Sức Bạc Mới Nhất
                </h5>
                <div className="flex flex-col md:flex-row  gap-4 py-4">
                  {dataHome?.data?.attributes?.link_shop.map((item: any) => {
                    return (
                      <>
                        <a
                          key={item.type}
                          href={`/${item.link}`}
                          target="_blank"
                        >
                          {" "}
                          <div className="flex gap-2">
                            <Image
                              src={baseUrl + item?.icon?.data?.attributes?.url}
                              alt="icon"
                              width={22}
                              height={22}
                              className="w-[22px] h-[22px]"
                            />
                            <div>
                              <span
                                className={`${quicksand.className} text-[14px] font-semibold text-[#141414]`}
                              >
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </a>
                      </>
                    );
                  })}
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
                {/* <h2
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
                </ul> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataHome?.data?.attributes?.content_trip,
                  }}
                ></div>
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
              {/* <div
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
              </div> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: dataHome?.data?.attributes?.content_become,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[700px] relative overflow-hidden">
        <Image
          src={imgBig}
          alt="Giới thiệu"
          fill
          className="object-cover"
          priority // optional, nếu là ảnh trên fold đầu
        />
      </div>
      <div className="py-12">
        {" "}
        <BlogSection data={dataBlog} />
      </div>
    </>
  );
};

export default page;
