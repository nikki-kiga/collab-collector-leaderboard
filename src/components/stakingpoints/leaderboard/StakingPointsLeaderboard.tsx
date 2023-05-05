import React, { useEffect, useState } from "react";
import { useStakingPointsContext } from "../StakingPointsContext";
import StakersWithPointsContext from "../PointsContext";

const StakingPointsLeaderboard = ({children}) => {
  const { stakers } = useStakingPointsContext();
  const [stakersWithPoints, setStakersWithPoints] = useState<
    { stakerAddress: string; points: number }[]
  >([]);

  useEffect(() => {
    setStakersWithPoints(
      new Array(stakers.length).fill({ stakerAddress: null, points: 0 })
    );
  }, [stakers.length]);

  return (
    <StakersWithPointsContext.Provider value={{stakersWithPoints, setStakersWithPoints}}>
      <div className="flex flex-col">

      <h1 className="title text-left">StakingLeaderboard</h1>
      {
        children
      }
      </div>
    </StakersWithPointsContext.Provider>
  );
};

export default StakingPointsLeaderboard;
