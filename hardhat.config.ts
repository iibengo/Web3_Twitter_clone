import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_URL_POLY_TEST,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
  },
};

export default config;
