import React from "react";
import { Button } from "@mui/material";

interface CTAProps {
  sortBy: "name" | "popular";
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: "name" | "popular") => void;
}

const CTA: React.FC<CTAProps> = ({ sortBy, sortOrder, onSortChange }) => {
  return (
    <Button variant="contained" onClick={() => onSortChange(sortBy)}>
      Sort by {sortBy === "name" ? "Name" : "Count"}{" "}
      {sortOrder === "asc" ? "↑" : "↓"}
    </Button>
  );
};

export default CTA;
