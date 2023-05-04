import React, { useEffect, useState } from "react";
import { useContractRead, useProvider } from "wagmi";
import { getNetwork, getContract, readContract } from "@wagmi/core";
import StakingPointsABI from "../../abis/StakingPoints.json";
import { ethers } from "ethers";
import { useStakingPointsContext } from "./StakingPointsContext";

const StakingPointsLeaderboard = ({}) => {
  const { chain, chains } = getNetwork();
  const { stakers, rules } = useStakingPointsContext();
  
  // calculate the points from the contract
  console.log("leaderboard stakers", stakers);
  return <div className="title">StakingLeaderboard</div>;
};

export default StakingPointsLeaderboard;
