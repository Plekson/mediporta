import React from "react";
import { action } from "@storybook/addon-actions";
import CTA from "../components/CTA";

export default {
  title: "CTA",
  component: CTA,
};

export const SortByNameAscending = () => (
  <CTA
    sortBy="name"
    sortOrder="asc"
    onSortChange={action("Sort by name ascending")}
  />
);

export const SortByNameDescending = () => (
  <CTA
    sortBy="name"
    sortOrder="desc"
    onSortChange={action("Sort by name descending")}
  />
);

export const SortByPopularAscending = () => (
  <CTA
    sortBy="popular"
    sortOrder="asc"
    onSortChange={action("Sort by popularity ascending")}
  />
);

export const SortByPopularDescending = () => (
  <CTA
    sortBy="popular"
    sortOrder="desc"
    onSortChange={action("Sort by popularity descending")}
  />
);
