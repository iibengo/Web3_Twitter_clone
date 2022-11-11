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
        require(msg.value == (1 ether), "Please submit 1 MATIC");
        tweet storage newTweet = Tweets[counter];
        newTweet.tweetText = tweetText;
        newTweet.tweetImg = tweetImg;
        newTweet.tweeter = msg.sender;
        newTweet.id = counter;
        newTweet.isDeleted = false;
        newTweet.timestamp = block.timestamp;
        emit TweetCreated(
            msg.sender,
            counter,
            tweetText,
            tweetImg,
            false,
            block.timestamp
        );
        counter++;
        payable(owner).transfer(msg.value);
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
        for (uint256 i = 0; i < counter; i++) {
            if (
                Tweets[i].tweeter == msg.sender && Tweets[i].isDeleted == false
            ) {
                temporary[countMyTweets] = Tweets[i];
                countMyTweets++;
            }
        }
        tweet[] memory result = new tweet[](countMyTweets);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getTweet(uint256 id)
        external
        view
        returns (
            string memory,
            string memory,
            address
        )
    {
        require(id < counter, "No such Tweet");
        tweet storage t = Tweets[id];
        require(t.isDeleted == false);
        return (t.tweetText, t.tweetImg, t.tweeter);
    }

    function deleteTweet(uint256 tweetId, bool isDeleted) external {
        require(
            Tweets[tweetId].tweeter == msg.sender,
            "You can only delete yout own tweet"
        );
        Tweets[tweetId].isDeleted = isDeleted;
        emit TweetDeleted(tweetId, isDeleted);
    }

    function updateUserDetails(
        string memory newName,
        string memory newBio,
        string memory newProfileImg,
        string memory newProfileBanner
    ) public {
        user storage userData = Users[msg.sender];
        userData.name = newName;
        userData.bio = newBio;
        userData.profileBanner = newProfileImg;
        userData.profileBanner = newProfileBanner;
    }

    function getUser(address userAdress) public view returns (user memory) {
        return Users[userAdress];
    }
}
