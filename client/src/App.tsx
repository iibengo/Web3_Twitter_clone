import React, { useState } from "react";
import "./App.css";
import { Home } from "./pages/";
import { Profile } from "./pages/profile";
import { Settings } from "./pages/settings";
import { Route, Routes } from "react-router-dom";
import { Rightbar, Sidebar } from "./components/";
import { Button } from "@web3uikit/core";
import { Twitter, Metamask } from "@web3uikit/icons";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return event;
  };
  return (
    <>
      {isAuthenticated ? (
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
      ) : (
        <div className="loginPage">
          <Twitter fill="#ffffff" fontSize={80} />
          <Button
            onClick={loginHandler}
            size="xl"
            text="Login with metamas"
            theme="primary"
            icon={<Metamask />}
          />
        </div>
      )}
    </>
  );
}

export default App;
