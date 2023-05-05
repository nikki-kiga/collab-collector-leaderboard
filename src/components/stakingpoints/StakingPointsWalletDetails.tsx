import React from "react";
import { useStakingPointsContext } from "./StakingPointsContext";
import { useStakerContext } from "../staker/StakerContext";
import { StakedToken } from "@/types";
import { useAccount, useContractRead } from "wagmi";
import StakingPointsABI from "../../abis/StakingPoints.json";

const StakingPointsWalletDetails = () => {
  const { stakingRules } = useStakingPointsContext();
  const { staker } = useStakerContext();
  const { address } = useAccount();

  const { data, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getPointsForWallet",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, 1, address],
  });

  return (
    <>
      <h4>Your points</h4>
      <p>
        Total available: {data?.totalPoints.toNumber()}, Claimed so far:{" "}
        {data?.totalPoints.toNumber() - data?.diff.toNumber()}
      </p>
      <div>
        {staker?.stakersTokens?.map((token: StakedToken) => {
          return (
            <div key={`${token.tokenId}-${token.timeUnstaked}`}>
              <span>{token.contractAddress} </span>
              <span>, {token.timeStaked.toNumber()}</span>
              <span>, {token.timeUnstaked.toNumber()}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StakingPointsWalletDetails;
