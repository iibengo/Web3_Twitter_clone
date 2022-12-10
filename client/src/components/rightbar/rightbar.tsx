import React from "react";
import "./rightbar.css";
import { Twitter, Cube, User, Cog } from "@web3uikit/icons";
import { Link } from "react-router-dom";

import hardhat from "../../images/hardhat.png";
import solidity from "../../images/solidity.png";
import react from "../../images/react.png";
import metamask from "../../images/metamask.png";
import { Input } from "@web3uikit/core";
import { Search } from "@web3uikit/icons";

export const Rightbar = () => {
  const trends = [
    {
      img: hardhat,
      text: "learn to use hardhat dev tool",
      link: "#",
    },
    {
      img: solidity,
      text: "Master smart contract development",
      link: "#",
    },
    {
      img: react,
      text: "Master React in 2023",
      link: "#",
    },
    {
      img: metamask,
      text: "Become web3 developer",
      link: "#",
    },
  ];
  return (
    <>
      <div className="rightbarContent">
        <Input
          label="Search Twitter"
          name="Serch Twitter"
          prefixIcon={<Search />}
          labelBgColor="#141d26"
        ></Input>
        <div className="trends">
          Trending
          {trends.map((trend) => {
            return (
              <>
                <div
                  className="trend"
                  key={trend.text}
                  onClick={() => window.open(trend.link)}
                >
                  <img src={trend.img} className="trendImg" alt={trend.text} />
                  <div className="trendText">{trend.text}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
