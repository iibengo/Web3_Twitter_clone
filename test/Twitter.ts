import { expect } from "chai";
import { ethers } from "hardhat";

describe("Twitter contract", () => {
  let twitter: any;
  let owner: any;
  let tweetCount = 1;
  const tweet = {
    name: "tweet",
    img: "img",
  };
  async function getTimeStamp() {
    const block = await ethers.provider.getBlockNumber();
    const blockTimeStamp =
      (await ethers.provider.getBlock(block)).timestamp + 1;
    return blockTimeStamp;
  }
  beforeEach(async () => {
    let Twitter = await ethers.getContractFactory("Twitter");
    twitter = await Twitter.deploy();
    [owner] = await ethers.getSigners();
    await twitter.addTweet("text", "img", {
      value: ethers.utils.parseEther("1.0"),
    });
  });
  it("addTweet", async () => {
    const blockTimeStamp = await getTimeStamp();
    await expect(
      await twitter.addTweet("text", "img", {
        value: ethers.utils.parseEther("1.0"),
      })
    )
      .to.emit(twitter, "TweetCreated")
      .withArgs(
        owner.address,
        tweetCount,
        "text",
        "img",
        false,
        blockTimeStamp
      );
  });
  it("getAllTweets", async () => {
    const tweets = await twitter.getAllTweets();
    expect(tweets.length).to.equal(tweetCount);
  });
  it("getMyTweets", async () => {
    const tweets = await twitter.getMyTweets();
    expect(tweets.length).to.equal(tweetCount);
  });
  it("deleteTweet", async () => {
    await twitter.addTweet("added", "img", {
      value: ethers.utils.parseEther("1.0"),
    });
    await expect(await twitter.deleteTweet(1, true))
      .to.emit(twitter, "TweetDeleted")
      .withArgs(1, true);
  });
  it("updateUserDetails", async () => {
    await twitter.updateUserDetails("name", "bio", "img", "banner");
    const user = await twitter.getUser(owner.address);
    expect(user.name).to.equal("name");
  });
});
