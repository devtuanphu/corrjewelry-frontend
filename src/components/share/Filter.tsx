"use client";
import React, { useState } from "react";
import Image from "next/image";
import SettingIcon from "../../../public/icon/mage_filter.svg";
import { Slider } from "antd";
import { quicksand, robotosand } from "@/font";

const Filter = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 2000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Large"]);

  const sizeOptions = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const checkboxOptions = [
    { label: "Lắc tay", count: 12 },
    { label: "Dây chuyền", count: 14 },
    { label: "Nhẫn", count: 14 },
    { label: "Bông tai", count: 9 },
    { label: "Khác", count: 12 },
  ];

  const tagOptions = [
    { label: "Best Seller", count: 12 },
    { label: "New Arrival", count: 14 },
    { label: "Sale", count: 14 },
    { label: "Quà Tặng", count: 9 },
    { label: "Cặp đôi", count: 12 },
  ];

  return (
    <div className="border border-[#0000001A] px-8 py-4 rounded-[8px] w-[280px] text-[#2A2A2A]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-solid border-[#0000001A] pb-4">
        <p className={`${quicksand.className} text-[16px] font-semibold`}>
          FILTERS
        </p>
        <Image src={SettingIcon} alt="filter" width={20} height={20} />
      </div>

      {/* Checkbox List */}
      <div className="space-y-3 mb-4">
        {checkboxOptions.map((item) => (
          <label
            key={item.label}
            className={`${quicksand.className} flex justify-between text-[14px] items-center text-[#00000099]`}
          >
            <div>
              <input type="checkbox" className="mr-2" />
              {item.label}
            </div>
            <span className="font-semibold">{item.count}</span>
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="border-t border-[#E0E0E0] pt-4 mb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[14px] font-semibold">GIÁ TIỀN</p>
          <span className="text-[14px]">⌄</span>
        </div>
        <Slider
          className="custom-black-slider"
          range
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onChange={(val) => setPriceRange(val as [number, number])}
          trackStyle={[{ backgroundColor: "#000" }]}
          handleStyle={[{}, {}]} // bỏ tạm để style qua CSS
        />
        <div className="flex justify-between text-[14px] mt-[-10px]">
          <span>{priceRange[0]}k</span>
          <span>{priceRange[1].toLocaleString()}k</span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="border-t border-[#E0E0E0] pt-4 mb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[14px] font-semibold">SIZE</p>
          <span className="text-[14px]">⌄</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`text-[12px] px-2 py-1 rounded border ${
                selectedSizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-[#F5F5F5] text-[#2A2A2A]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filters */}
      <div className="space-y-3 my-4">
        {tagOptions.map((item) => (
          <label
            key={item.label}
            className={`${quicksand.className} flex justify-between text-[14px] items-center text-[#00000099]`}
          >
            <div>
              <input type="checkbox" className="mr-2" />
              {item.label}
            </div>
            <span className="font-semibold">{item.count}</span>
          </label>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button className="bg-black text-white py-2 text-[14px] rounded text-center">
          Áp dụng
        </button>
        <button className="text-red-500 text-[14px] underline text-center">
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default Filter;
