import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface PageSizeProps {
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
}

const PageSize: React.FC<PageSizeProps> = ({ pageSize, onPageSizeChange }) => {
  return (
    <FormControl style={{ width: "128px" }}>
      <InputLabel id="page-size-label">Items per page</InputLabel>
      <Select
        labelId="page-size-label"
        id="page-size"
        value={pageSize}
        onChange={(event) => onPageSizeChange(event.target.value as number)}
        style={{ height: "36.5px" }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PageSize;
