import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ import redux चीज़ें
// import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);