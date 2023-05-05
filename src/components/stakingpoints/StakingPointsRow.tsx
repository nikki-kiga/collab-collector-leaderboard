import React from 'react'
import { useContractRead } from 'wagmi';
import StakingPointsABI from "../../abis/StakingPoints.json";
import { Staker } from '@/types';

const StakingPointsRow = ({staker}: Staker) => {

    const {
    data,
    error
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getPointsForWallet",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, 1, staker.stakerAddress],
  });
  return (
    <div>
      <span>{staker.stakerAddress}</span>
      <p>{data?.toNumber()}</p>
    </div>

  )
}

export default StakingPointsRow