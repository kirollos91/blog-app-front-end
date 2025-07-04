import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer theme="colored" position="top-center" />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
