import React from "react";
import ErrorMessage from "../components/ErrorMessage";

export default {
  title: "ErrorMessage",
  component: ErrorMessage,
};

export const Default = () => <ErrorMessage message="An error occurred" />;
