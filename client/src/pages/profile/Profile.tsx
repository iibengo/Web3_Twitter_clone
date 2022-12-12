import React from "react";
import { Link } from "react-router-dom";
import { TweetInFeed } from "../../components/tweet-feed";
import { defaultImages } from "../../utils/default-images";
import "./Profile.css";

export const Profile = () => {
  return (
    <>
      <img className="profileBanner" src={defaultImages[1]} alt="banner" />
      <div className="pfpContainer">
        <img className="profilePFP" src={defaultImages[0]} alt="profilePFP" />
        <div className="profileName">Rahul Agrawal</div>
        <div className="profileWallet">0x987493417943198143</div>
        <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
        </Link>
        <div className="profileBio">A middle class web3 developer</div>
        <div className="profileTabs">
          <div className="profileTab">Your Tweets</div>
        </div>
      </div>
      <TweetInFeed profile={true}></TweetInFeed>
    </>
  );
};
