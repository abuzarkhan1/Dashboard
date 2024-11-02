// src/components/LoadingScreen.jsx
import React from "react";
import "./Loading.css"; // We'll create this CSS file next
import logo from "../../images/layer_3.svg";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="spinner"></div>
      <p className="loading-text text-white">
        Loading your dream home designs...
      </p>
    </div>
  );
};

export default LoadingScreen;
