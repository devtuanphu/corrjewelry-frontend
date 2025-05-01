"use client";
import React, { useState } from "react";
import Image from "next/image";
import SettingIcon from "../../../public/icon/mage_filter.svg";
import { Slider } from "antd";
import { quicksand, robotosand } from "@/font";

interface FilterProps {
  isMobile: boolean;
  listDanhMucFilter: any;
  listSize: any;
  onFilterChange: any;
}
const Filter: React.FC<FilterProps> = ({
  isMobile,
  listDanhMucFilter,
  listSize,
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    onFilterChange({
      selectedTags: selectedTags,
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    // Truyền các bộ lọc về cho component cha (Products)
    onFilterChange({
      selectedSizes,
      priceRange,
      selectedTags,
      selectedCategories, // Truyền selectedCategories vào
    });
  };

  const tagOptions = [
    { label: "Best Seller", value: "isBestSeller" },
    { label: "New Arrival", value: "isNewArrival" },
    { label: "Sale", value: "isSaleHome" },
  ];
  const handleReset = () => {
    setSelectedSizes([]);
    setSelectedTags([]);
    setSelectedCategories([]);
    setPriceRange([0, 5000]);

    // Truyền bộ lọc về component cha với giá trị mặc định
    onFilterChange({
      selectedSizes: [],
      priceRange: [0, 5000],
      selectedTags: [],
      selectedCategories: [],
    });
  };
  return (
    <div
      className={`${
        isMobile ? "py-8" : "border border-[#0000001A]  px-8"
      }   py-4 rounded-[8px] w-full text-[#2A2A2A]`}
    >
      <div
        className={`${
          isMobile ? "hidden" : "flex"
        }  justify-between items-center mb-4 border-b border-solid border-[#0000001A] pb-4`}
      >
        <p className={`${quicksand.className} text-[16px] font-semibold`}>
          FILTERS
        </p>
        <Image src={SettingIcon} alt="filter" width={20} height={20} />
      </div>

      <div className="space-y-3 mb-4">
        {listDanhMucFilter?.map((item: any) => (
          <label
            key={item.id}
            className={`${quicksand.className} flex justify-between text-[14px] items-center text-[#00000099]`}
          >
            <div>
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategories.includes(item.title)} // Cập nhật trạng thái checkbox
                onChange={() => toggleCategory(item.title)} // Cập nhật khi thay đổi category
              />
              {item.title}
            </div>
          </label>
        ))}
      </div>

      <div className="border-t border-[#E0E0E0] pt-4 mb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[14px] font-semibold">GIÁ TIỀN</p>
          <span className="text-[14px]">⌄</span>
        </div>
        <Slider
          range
          min={0}
          max={5000}
          step={0}
          value={priceRange}
          onChange={(val) => setPriceRange(val as [number, number])}
          trackStyle={[{ backgroundColor: "#000" }]}
          styles={{
            track: { backgroundColor: "#000" },
            handle: {
              backgroundColor: "#000",
              borderColor: "#000",
              boxShadow: "none", // optional: remove blue border on focus
            },
          }}
        />
        <div className="flex justify-between text-[14px] mt-[-10px]">
          <span>{priceRange[0]}k</span> <span>{priceRange[1]}k</span>{" "}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0] pt-4 mb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[14px] font-semibold">SIZE</p>
          <span className="text-[14px]">⌄</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {listSize.map((size: any) => (
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

      <div className="space-y-3 my-4">
        {tagOptions.map((item) => (
          <label
            key={item.value}
            className={`${quicksand.className} flex justify-between text-[14px] items-center text-[#00000099]`}
          >
            <div>
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedTags.includes(item.value)}
                onChange={() => toggleTag(item.value)}
              />
              {item.label}
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleApply}
          className="bg-black text-white py-2 text-[14px] rounded text-center"
        >
          Áp dụng
        </button>
        <button
          onClick={handleReset}
          className="text-red-500 text-[14px] underline text-center"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default Filter;
