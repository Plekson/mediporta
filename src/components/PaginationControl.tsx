import React from "react";
import { Pagination } from "@mui/material";

interface PaginationControlProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination
      count={pageCount}
      color="primary"
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
    />
  );
};

export default PaginationControl;
