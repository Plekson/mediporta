import React from "react";
import TagTable from "../components/TagTable";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default {
  title: "TagTable",
  component: TagTable,
};

export const Default = () => (
  <Provider store={store}>
    <TagTable />
  </Provider>
);
