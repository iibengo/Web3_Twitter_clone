// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Twitter {
    address public owner;
    uint256 private counter; // Id of a tweet

    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    struct tweet {
        address tweeter;
        uint256 id;
        string tweetText;
        string tweetImg;
        bool isDeleted;
        uint256 timestamp;
    }

    struct user {
        string name;
        string bio;
        string profileImg;
        string profileBanner;
    }

    mapping(uint256 => tweet) Tweets; // id to tweeet
    mapping(address => user) Users; // address to user struct

    event TweetCreated(
        address tweeter,
        uint256 id,
        string tweetText,
        string tweetImg,
        bool isDeleted,
        uint256 timestamp
    );
    event TweetDeleted(uint256 id, bool isDeleted);

    function addTweet(string memory tweetText, string memory tweetImg)
        public
        payable
    {
        require(msg.value == (0.01 ether), "Please submit 0.01 MATIC");
        tweet storage newTweet = Tweets[counter];
        newTweet.tweetText = tweetText;
        newTweet.tweetImg = tweetImg;
        newTweet.tweeter = msg.sender;
        newTweet.id = counter;
        newTweet.isDeleted = false;
        newTweet.timestamp = block.timestamp;
        emit TweetCreated(
            meg.sender,
            counter,
            tweetText,
            tweetImg,
            false,
            block.timestamp
        );
        counter++;
        payable(owner).transform(msg.value);
    }

    function getAllTweets() public view returns (tweet[] memory) {
        tweet[] memory temporary = new tweet[](counter);
        uint256 countTweets = 0;
        for (uint256 i = 0; i < counter; i++) {
            if (Tweets[i].isDeleted == false) {
                temporary[countTweets] = Tweets[i];
                countTweets++;
            }
        }
        tweet[] memory result = new tweet[](countTweets);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getMyTweets() external view returns (tweet[] memory) {
        tweet[] memory temporary = new tweet[](counter);
        uint256 countMyTweets = 0;
        for (i = 0; i < counter; i++) {
            if (Tweets[i].tweeter == msg.sender) {
                temporary[countMyTweets] = Tweets[i];
                countMyTweets++;
            }
        }
        tweet[] memory result = new tweet[](countMyTweets);
        for (i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
    }
}
