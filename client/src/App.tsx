import React, { useEffect, useState } from "react";
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
  const [provider, setProvider] = useState(
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

  useEffect(() => {
    console.log("useeffecr");
    if (!provider) {
      window.alert("No Metamask Intalled");
      window.location.replace("https://metamask.io");
    }

    connectWallet();
    const handleAccountChanged = async (accounts: [string]) => {
      const { chainId } = await provider.getNetwork();
      if (chainId.toString() === "0x13881") {
        infoNotification(accounts[0]);
      }
      if (
        JSON.parse(localStorage.getItem("activeAccount") as string) !== null
      ) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };
    const handleChainChanged = (chainId: string) => {
      console.log("chain");
      if (chainId !== "0x13881") {
        warningNotification();
      }
      window.location.reload();
    };
    const handleDisconnect = (accounts: {}) => {};
    provider.on("accountChanged", handleAccountChanged);
    provider.on("chainChanged", handleChainChanged);
    provider.on("disconnect", handleDisconnect);
  }, []);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    let provider = new ethers.providers.Web3Provider(connection);
    const getNetwork = await provider.getNetwork();
    const polygonChainId = 80001;
    if (getNetwork.chainId !== polygonChainId) {
      console.log("entra coonect");
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
      const getUserDetails = await contract.getUser(signerAddress);
      if (getUserDetails["profileBanner"]) {
        //if user exists
        window.localStorage.setItem(
          "activeAccount",
          JSON.stringify(signerAddress)
        );
        window.localStorage.setItem(
          "userName",
          JSON.stringify(getUserDetails["name"])
        );
        window.localStorage.setItem(
          "userBio",
          JSON.stringify(getUserDetails["bio"])
        );
        window.localStorage.setItem(
          "userImage",
          JSON.stringify(getUserDetails["profileImage"])
        );
        window.localStorage.setItem(
          "userBanner",
          JSON.stringify(getUserDetails["profileBanner"])
        );
      } else {
        //first time user
        // get random avatar and update the contrat
        setLoading(true);
        let avatar = toonAvatar.generate_avatar();
        let defaultBanner =
          "https://media.istockphoto.com/id/1308480157/es/vector/simple-ilustración-de-arte-de-p%C3%ADxel-plano-de-gatito-lindo-dibujos-animados-sentado-en-una.jpg?s=612x612&w=is&k=20&c=HTpWkvf2QLTk94eUqFxcx2EYZJfrCT5QCgmeQJV3xoE=";
        window.localStorage.setItem(
          "activeAccount",
          JSON.stringify(signerAddress)
        );
        window.localStorage.setItem("userName", JSON.stringify(""));
        window.localStorage.setItem("userBio", JSON.stringify(""));
        window.localStorage.setItem("userImage", JSON.stringify(avatar));
        window.localStorage.setItem(
          "userBanner",
          JSON.stringify(defaultBanner)
        );
        try {
          const transaction = await contract.updateUserDetails(
            "",
            "",
            avatar,
            defaultBanner
          );
          await transaction.wait();
        } catch (error) {
          console.log("Error", error);
          notification({
            type: "warning",
            message: "Get test matic from polygon faucet",
            title: "Require minimum 0.1 MATIC",
            position: "topR",
          });
          setLoading(false);
          return;
        }
      }

      setProvider(provider);
      setIsAuthenticated(true);
    }
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
          {loading ? (
            <Loading size={50} spinnerColor="green" />
          ) : (
            <Button
              onClick={connectWallet}
              size="xl"
              text="Login with metamask"
              theme="primary"
              icon={<Metamask />}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
