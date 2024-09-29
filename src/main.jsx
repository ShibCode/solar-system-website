import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import "./index.css";
import AttributesProvider from "./context/AttributesProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AttributesProvider>
      <App />
    </AttributesProvider>
  </Provider>
  // </React.StrictMode>
);
