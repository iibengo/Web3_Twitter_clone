import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profilee";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div className="Page">
        <div className="sideBar">SideBar</div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="rightBar"></div>
      </div>
    </>
  );
}

export default App;
