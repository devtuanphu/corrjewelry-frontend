"use server";
import React from "react";

import { robotosand, worksand } from "@/font";
import CardCollection from "./CardCollection";
interface CollectionProps {
  data: any;
}
const Collection: React.FC<CollectionProps> = async ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="flex justify-center pb-[18px]">
          <h2
            className={`${robotosand.className} relative text-danh-muc font-bold text-black uppercase before:content-[''] after:content-[''] flex items-center gap-4`}
          >
            <span className="before:block before:h-[2px] before:w-10 before:bg-black" />
            Danh mục sản phẩm
            <span className="after:block after:h-[2px] after:w-10 after:bg-black" />
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {data &&
            data?.map((item: any, index: number) => {
              const colSpanClass =
                index % 4 === 0 || index % 4 === 3
                  ? "md:col-span-7"
                  : "md:col-span-5";

              return (
                <div key={item?.id} className={`col-span-12 ${colSpanClass}`}>
                  <CardCollection data={item?.attributes} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Collection;
