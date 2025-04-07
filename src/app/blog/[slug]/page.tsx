import React from "react";
import ImageTinTucDemo from "../../../../public/images/tin-tuc.jpg";
import Image from "next/image";
const page = () => {
  return (
    <div className="container py-8">
      <p className="text-[16px] font-medium">By John Doe l Aug 23, 2021</p>
      <div className="content-blog flex flex-col gap-6">
        <h5 className="font-bold py-4 text-[20px] md:text-[32px]">
          Cách Phối Trang Sức Bạc Với Trang Phục Một Cách Tinh Tế
        </h5>
        <div>
          <ul>
            <li>
              Phong cách casual (Đơn giản, năng động): Dây chuyền bạc mảnh hoặc
              lắc tay bạc nhỏ gọn kết hợp cùng áo thun trắng, quần jean tạo nên
              vẻ ngoài trẻ trung nhưng vẫn nam tính.
            </li>
            <li>
              Phong cách streetwear (Cá tính, bụi bặm): Những chiếc vòng bạc bản
              lớn, nhẫn bạc hầm hố phối cùng áo hoodie, áo khoác bomber và giày
              sneaker giúp tạo vẻ ngoài mạnh mẽ, thời thượng.
            </li>
            <li>
              Phong cách lịch lãm: Nhẫn bạc trơn, lắc tay bạc hoặc dây chuyền
              bạc thanh mảnh kết hợp với vest hoặc áo sơ mi sẽ làm tăng thêm sự
              sang trọng, tinh tế cho phái mạnh.
            </li>
          </ul>
        </div>
        <Image src={ImageTinTucDemo} alt="Tin tức" className="w-full" />
        <p>
          Trang sức bạc không chỉ là phụ kiện, mà còn là điểm nhấn giúp nâng tầm
          phong cách của phái mạnh. Để trang sức bạc thực sự tỏa sáng, bạn cần
          biết cách phối hợp với trang phục một cách hài hòa, phù hợp với từng
          phong cách và hoàn cảnh.
        </p>
      </div>
    </div>
  );
};

export default page;
