import React from "react";
import PaginationControl from "../components/PaginationControl";

export default {
  title: "PaginationControl",
  component: PaginationControl,
};

export const Default = () => (
  <PaginationControl
    pageCount={0}
    currentPage={0}
    onPageChange={function (newPage: number): void {
      throw new Error("Function not implemented.");
    }}
  />
);
