import React from "react";
import { useContractRead } from "wagmi";
import StakingPointsABI from "../../../abis/StakingPoints.json";
import { Staker } from "@/types";
import { useStakersWithPointsContext } from "../PointsContext";

interface StakingPointsRowProps {
  staker: Staker;
}

const StakingPointsRow = ({ staker }: StakingPointsRowProps) => {
  const { setStakersWithPoints } =
    useStakersWithPointsContext();
  const { data: pointsBig } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getPointsForWallet",
    args: [
      process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS,
      process.env.NEXT_PUBLIC_INSTANCE_ID,
      staker.stakerAddress,
    ],
    onSettled(data) {
      const points = data?.toNumber();
      const stakerIdx = staker.stakerIdx?.toNumber();
      setStakersWithPoints((prev) => [
        ...prev.slice(0, stakerIdx),
        {
          stakerAddress: staker.stakerAddress,
          points: points,
        },
        ...prev.slice(stakerIdx + 1),
      ]);
    }
  });

  return (
    <div>
    </div>
  );
};

export default StakingPointsRow;
