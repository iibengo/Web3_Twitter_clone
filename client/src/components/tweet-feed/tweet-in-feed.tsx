import React from "react";
import "./tweet-in-feed.css";
import { defaultImages } from "../../utils/default-images";
import { Avatar } from "@web3uikit/core";
import { MessageCircle, Star, Matic } from "@web3uikit/icons";
import { theme } from "@web3uikit/core/dist/lib/Accordion/types";

interface TweetInFeedModel {
  profile: boolean;
}
export const TweetInFeed = ({ profile }: TweetInFeedModel) => {
  return (
    <>
      <div className="feedTweet">
        <Avatar isRounded image={defaultImages[0]} theme="image" size={60} />
        <div className="completeTweet">
          <div className="who">
            Elon Musk
            <div className="accWhen">0x479234913471941479</div>{" "}
          </div>
          <div className="tweetContent">
            Nice day learning web3 from scratch
            <img src={defaultImages[1]} className="tweetImg" alt="tweet" />
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <MessageCircle fontSize={20} />
            </div>
            <div className="interactionNums">
              <Star fontSize={20} />
            </div>
            <div className="interactionNums">
              <Matic fontSize={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
