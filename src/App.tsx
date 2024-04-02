import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TagTable from "./components/TagTable";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TagTable />
      </div>
    </Provider>
  );
};

export default App;
