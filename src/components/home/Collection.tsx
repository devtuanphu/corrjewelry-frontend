import React from "react";

import { worksand } from "@/font";
import CardCollection from "./CardCollection";

const Collection = () => {
  return (
    <>
      <div className="container">
        <div
          className={`flex justify-center gap-8 items-center ${worksand.className} font-bold text-[20px] text-[#000000] pb-[24px]`}
        >
          <span>●</span>
          <h2>Danh mục bộ sưu tập</h2>
          <span>●</span>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-7">
            <CardCollection />
          </div>
          <div className="col-span-12 md:col-span-5">
            <CardCollection />
          </div>
          <div className="col-span-12 md:col-span-5">
            <CardCollection />
          </div>
          <div className="col-span-12 md:col-span-7">
            <CardCollection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
