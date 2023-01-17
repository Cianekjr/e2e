import { ethers } from "ethers";

export const generateNewWallet = () => {
  return ethers.Wallet.createRandom();
};
