import React, { ReactNode, Suspense, useEffect, useState } from "react";
import StakingPointsWalletDetails from "./StakingPointsWalletDetails";
import { getNetwork } from "@wagmi/core";


import StakingPointsLeaderboard from "./leaderboard/StakingPointsLeaderboard";
import StakingPointsRules from "./leaderboard/StakingPointsRules";

interface StakingPointsProps {
  info?: ReactNode;
  details?: ReactNode;
}

const StakingPoints = ({ info, details }: StakingPointsProps) => {
  const { chain } = getNetwork();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      {chain?.id && (
        <Suspense fallback={<>Loading...</>}>
          <div className="flex flex-col w-full lg:flex-row lg:justify-between grow shrink-0">
            {info}
            <div className="pt-16 lg:pt-4 lg:pl-16">{details}</div>
          </div>
        </Suspense>
      )}
    </>
  );
};

StakingPoints.WalletDetails = StakingPointsWalletDetails;
StakingPoints.Rules = StakingPointsRules;
StakingPoints.Leaderboard = StakingPointsLeaderboard;

export default StakingPoints;
