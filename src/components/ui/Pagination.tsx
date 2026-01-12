import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5; // Number of pages to show at start/end or around current

    if (totalPages <= showMax + 2) {
      // If total pages is small, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    else {
      // Always add 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Calculate start and end of current range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust for beginning
      if (currentPage < 4) {
        end = 5;
      }

      // Adjust for end
      if (currentPage > totalPages - 3) {
        start = totalPages - 4;
      }

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always add last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    // Custom logic to match the image "1 2 3 4 5 6 .. 22" more closely if needed,
    // but standard generic logic is safer for dynamic ranges.
    // The image shows 1,2,3,4,5,6,..,22 when 1 is active.
    // This implies showing generous amount of start pages.
    // Let's stick to a robust standard first.
    return pages;
  };

  const renderPageButton = (page: number | string, index: number) => {
    if (page === "...") {
      return (
        <span
          key={`ellipsis-${index}`}
          className="w-10 h-10 flex items-center justify-center text-grey-grey "
        >
          ..
        </span>
      );
    }

    const isActive = page === currentPage;

    return (
      <button
        key={index}
        onClick={() => typeof page === "number" && onPageChange(page)}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-md type-body-3 transition-all duration-200",
          isActive
            ? "bg-primary text-grey-white "
            : "bg-grey-white text-grey-grey hover:bg-grey-bg-light border border-grey-divider",
        )}
      >
        {page}
      </button>
    );
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-grey-white border border-grey-divider text-grey-grey hover:bg-grey-bg-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => renderPageButton(page, index))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-grey-white border border-grey-divider text-grey-grey hover:bg-grey-bg-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
