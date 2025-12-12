import React from 'react';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of visible page numbers
    const ellipsis = <span className="px-4 py-2">...</span>;

    if (pageCount <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to maxVisiblePages
      for (let i = 0; i < pageCount; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded ${
              currentPage === i
                ? 'bg-green-500 text-white' // Active page styling
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      // Truncate page numbers for large page counts
      if (currentPage < maxVisiblePages - 1) {
        // Show first few pages
        for (let i = 0; i < maxVisiblePages; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-4 py-2 rounded ${
                currentPage === i
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          );
        }
        pages.push(ellipsis);
        pages.push(
          <button
            key={pageCount - 1}
            onClick={() => onPageChange(pageCount - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === pageCount - 1
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageCount}
          </button>
        );
      } else if (currentPage >= pageCount - maxVisiblePages + 1) {
        // Show last few pages
        pages.push(
          <button
            key={0}
            onClick={() => onPageChange(0)}
            className={`px-4 py-2 rounded ${
              currentPage === 0
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            1
          </button>
        );
        pages.push(ellipsis);
        for (let i = pageCount - maxVisiblePages; i < pageCount; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-4 py-2 rounded ${
                currentPage === i
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          );
        }
      } else {
        // Show middle pages with ellipsis on both sides
        pages.push(
          <button
            key={0}
            onClick={() => onPageChange(0)}
            className={`px-4 py-2 rounded ${
              currentPage === 0
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            1
          </button>
        );
        pages.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-4 py-2 rounded ${
                currentPage === i
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          );
        }
        pages.push(ellipsis);
        pages.push(
          <button
            key={pageCount - 1}
            onClick={() => onPageChange(pageCount - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === pageCount - 1
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageCount}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-4 gap-3 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage > 0 ? currentPage - 1 : 0)}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded ${
          currentPage === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // Disabled styling
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
        aria-label="Previous Page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        onClick={() =>
          onPageChange(currentPage < pageCount - 1 ? currentPage + 1 : pageCount - 1)
        }
        disabled={currentPage === pageCount - 1}
        className={`px-4 py-2 rounded ${
          currentPage === pageCount - 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // Disabled styling
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;