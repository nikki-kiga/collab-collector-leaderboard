import React from "react";
import StakingPointsRow from "./StakingPointsRow";
import { useStakingPointsContext } from "../StakingPointsContext";

const StakingPointsLeaderRows = () => {
  const { stakers } = useStakingPointsContext();
  return (
    <div>
    {stakers.map((staker) => (
      <StakingPointsRow
        staker={staker}
        key={staker.stakerAddress}
      />
    ))}
  </div>
  );
};

export default StakingPointsLeaderRows;
