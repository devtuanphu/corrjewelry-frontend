import React from "react";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho props paths
interface BreadcrumbPath {
  label: string;
  link: string;
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

const BreadcrumbBlack: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <div className="flex items-center text-black text-sm">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;

        return (
          <span key={index} className="flex items-center">
            {!isLast ? (
              <>
                <Link href={path.link} className="text-black hover:underline">
                  {path.label}
                </Link>
                <span className="mx-2">/</span> {/* Dấu phân cách / */}
              </>
            ) : (
              <span>{path.label}</span> // Không phải link ở cấp cuối
            )}
          </span>
        );
      })}
    </div>
  );
};

export default BreadcrumbBlack;
