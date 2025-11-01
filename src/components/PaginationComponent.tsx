import { useMemo } from "react";

const DOTS = "...";
function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 6,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalPageNumbers) return range(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      return [...range(1, 3 + 2 * siblingCount), DOTS, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      return [
        1,
        DOTS,
        ...range(totalPages - (3 + 2 * siblingCount) + 1, totalPages),
      ];
    }
    return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
  }, [currentPage, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  const baseBtn =
    "rounded-full flex items-center justify-center " +
    " hover:bg-purple60 text-white " +
    "ring-2 ring-purple65 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 " +
    "disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2";

  const circleSize = "w-9 h-9 ";

  return (
    <div className="flex justify-center items-center gap-2 mx-8">
      <div className="flex  justify-center gap-3  sm:space-y-0 space-y-3 flex-wrap mt-6">
        {/* Previous */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${baseBtn} ${circleSize} bg-purple75 lg-custom:mb-0`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Numbers */}
        <div className="flex !items-center justify-center gap-3 ">
          {paginationRange.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`${baseBtn} ${circleSize} ${
                  page === currentPage ? "bg-purple60" : "bg-purple75"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                className="px-2 text-gray-400 select-none text-[12px] sm:text-sm"
              >
                {page}
              </span>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${baseBtn} ${circleSize} bg-purple75  lg-custom:mb-0`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PaginationComponent;
