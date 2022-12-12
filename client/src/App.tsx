import React from "react";
import "./App.css";
import { Home } from "./pages/";
import { Profile } from "./pages/profile";
import { Settings } from "./pages/settings";
import { Route, Routes } from "react-router-dom";
import { Rightbar, Sidebar } from "./components/";
function App() {
  return (
    <>
      <div className="Page">
        <div className="sideBar">
          <Sidebar />
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}

export default App;
