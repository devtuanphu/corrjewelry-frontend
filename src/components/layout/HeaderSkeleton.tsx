"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS của skeleton

const HeaderSkeleton = () => {
  return (
    <div className="bg-[#141414] pt-[12px] hidden md:block">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton width={136} height={65} /> {/* Skeleton for Logo */}
            <div>
              <ul className="text-[#E6E6E6] text-[14px] font-medium flex gap-[24px]">
                <li>
                  <Skeleton width={80} />
                </li>
                <li>
                  <Skeleton width={50} />
                </li>
                <li>
                  <Skeleton width={50} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
