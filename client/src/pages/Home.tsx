import { Avatar } from "@web3uikit/core";
import { Image } from "@web3uikit/icons";
import React, { useRef, useState } from "react";
import { TweetInFeed } from "../components/tweet-feed";
import { defaultImages } from "../utils/default-images";
import "./Home.css";

const Home = () => {
  const inputFile = useRef(null);
  const [selectImage, setSelectImage] = useState("");
  const [tweetText, setTweetText] = useState("");
  const onImageClick = () => {
    (inputFile.current as unknown as HTMLInputElement).click();
  };
  const onChangeHandler = (event: any) => {
    const imgFile = ((event.target as HTMLInputElement).files as FileList)[0];
    const urlo = URL.createObjectURL(imgFile);
    setSelectImage(urlo);
  };
  return (
    <>
      <div className="mainContent">
        <div className="profileTweet">
          <div className="tweetSection">
            <Avatar
              isRounded
              image={defaultImages[0]}
              theme="image"
              size={60}
            />
            <textarea
              className="textArea"
              name="tweetTextArea"
              placeholder="What´s going on ?"
              onChange={(e) => {
                setTweetText(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="tweetSection">
            <div className="imgDiv" onClick={onImageClick}>
              <input
                type="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={onChangeHandler}
              />
              {selectImage ? (
                <img src={selectImage} width={150} alt="selected" />
              ) : (
                <Image fontSize={25} fill="#ffffff" />
              )}
            </div>
            <div className="tweet">Tweet</div>
          </div>
        </div>
        <TweetInFeed profile={false} />
      </div>
    </>
  );
};

export default Home;
