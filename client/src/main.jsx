import "./index.css";
import "antd/dist/antd";
import App from "./App.jsx";
import "intersection-observer";
import store from "./redux/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);
