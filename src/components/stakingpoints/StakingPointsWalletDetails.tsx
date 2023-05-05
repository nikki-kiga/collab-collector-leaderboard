import React from "react";
import { useStakerContext } from "../staker/StakerContext";
import { StakedToken } from "@/types";
import { useAccount, useContractRead } from "wagmi";
import StakingPointsABI from "../../abis/StakingPoints.json";
import StakingPointsWalletTokenDetails from "./StakingPointsWalletTokenDetails";

const StakingPointsWalletDetails = () => {
  const { staker } = useStakerContext();
  const { address } = useAccount();

  const { data, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getPointsForWallet",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, process.env.NEXT_PUBLIC_INSTANCE_ID, address],
  });

  return (
    <div className="bg-gray-700 mt-20 py-4 px-2">
      <h4 className="text-xl text-black font-extrabold">Your points</h4>
      <p className="text-black text-lg">
        Total available: {data?.toNumber()}, Claimed so far:{" "}
        {staker?.pointsRedeemed?.toNumber()}
      </p>
      <div className="bg-gray-700 text-gray-400">
        {staker?.stakersTokens?.map((token: StakedToken) => {
          return (
            <StakingPointsWalletTokenDetails token={token} key={token.contractAddress}/>
          );
        })}
      </div>
    </div>
  );
};

export default StakingPointsWalletDetails;
