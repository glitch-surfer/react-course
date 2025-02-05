import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLastPage: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  isLastPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span>Page: {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};
