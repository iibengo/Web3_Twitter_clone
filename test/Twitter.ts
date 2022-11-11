import { expect } from "chai";
import { ethers } from "hardhat";

describe("Twitter contract", () => {
  let Twitter, twitter, owner;
  it("addTweet", () => {
    beforeEach(async () => {
      Twitter = await ethers.getContractFactory("Twitter");
      twitter = await Twitter.deploy();
      [owner] = await ethers.getSigners();
    });
  });
});
