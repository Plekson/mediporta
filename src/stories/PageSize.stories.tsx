import React from "react";
import PageSize from "../components/PageSize";

export default {
  title: "Pagesize",
  component: PageSize,
};

export const Default = () => (
  <PageSize
    pageSize={0}
    onPageSizeChange={function (newPageSize: number): void {
      throw new Error("Function not implemented.");
    }}
  />
);
