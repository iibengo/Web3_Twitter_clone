import React, { useState } from "react";
import "./App.css";
import { Home } from "./pages/";
import { Profile } from "./pages/profile";
import { Settings } from "./pages/settings";
import { Route, Routes } from "react-router-dom";
import { Rightbar, Sidebar } from "./components/";
import { Button, useNotification, Loading } from "@web3uikit/core";
import { Twitter, Metamask } from "@web3uikit/icons";
import { ethers, utils } from "ethers";
import Web3Modal from "web3modal";
import { twitter_contract_address } from "./config";
import TwitterAbi from "./abi/Twitter.json";
var toonAvatar = require("cartoon-avatar");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [provider, setProver] = useState(
    window.ethereum as ethers.providers.Web3Provider
  );
  const notification = useNotification();
  const [loading, setLoading] = useState(false);

  const warningNotification = () => {
    notification({
      type: "warning",
      message: "Change network to polygon to visit the site",
      title: "Switch to polygon Network",
      position: "topR",
    });
  };
  const infoNotification = (accountNum: string) => {
    notification({
      type: "info",
      message: accountNum,
      title: "Connected to polygon Account",
      position: "topR",
    });
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    let provider = new ethers.providers.Web3Provider(connection);
    const getNetwork = await provider.getNetwork();
    const polygonChainId = 80001;
    if (getNetwork.chainId !== polygonChainId) {
      warningNotification();
      try {
        if (provider.provider.request) {
          await provider.provider
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: utils.hexValue(polygonChainId) }], // chainId must be in hexadecimal numbers
            })
            .then(() => window.location.reload());
        }
      } catch (error: any) {
        // chain has not been added to metamask
        if (error.code === 4902) {
          try {
            if (provider.provider.request) {
              await provider.provider
                .request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: polygonChainId,
                      chainName: "Polygon testner",
                      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                      blockExplorer: ["https://mumbai.polygonscan.com"],
                      nativeCurrency: {
                        Symbol: "MATIC",
                        decimals: 18,
                      },
                    },
                  ], // chainId must be in hexadecimal numbers
                })
                .then(() => window.location.reload());
            }
          } catch (addError) {
            throw addError;
          }
        }
      }
    } else {
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const contract = new ethers.Contract(
        twitter_contract_address,
        TwitterAbi.abi,
        signer
      );
      const getUserDetails = await contract.getUserDetail(signerAddress);
      if (getUserDetails("profileImage")) {
        //if user exists
      } else {
        //first time user
        // get random avatar and update the contrat
      }

      setProver(provider);
      setIsAuthenticated(true);
    }
  };
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
