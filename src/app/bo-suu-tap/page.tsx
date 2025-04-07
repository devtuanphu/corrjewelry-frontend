import React from "react";
import { robotocondensed } from "@/font";
import CollectionDetail from "@/components/bo-suu-tap/CollectionDetail";

const page = () => {
  return (
    <div className="flex flex-col gap-[70px] py-[50px]">
      <div className="container">
        <div className="flex justify-end">
          <h5
            className={`${robotocondensed.className} text-[40px] font-medium uppercase text-[#595959]`}
          >
            BỘ SƯU TẬP - corr
          </h5>
        </div>
      </div>
      <CollectionDetail />
    </div>
  );
};

export default page;
