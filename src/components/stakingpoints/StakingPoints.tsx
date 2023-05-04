import React, { ReactNode, Suspense, useEffect, useState } from "react";
import StakingPointsWalletDetails from "../rulesStaker/StakingPointsWalletDetails";
import { getNetwork } from "@wagmi/core";

import StakingPointsRules from "./StakingPointsRules";
import StakingPointsLeaderboard from "./StakingPointsLeaderboard";

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
          {info}
          {details}
        </Suspense>
      )}
    </>
  );
};

StakingPoints.WalletDetails = StakingPointsWalletDetails;
StakingPoints.Rules = StakingPointsRules;
StakingPoints.Leaderboard = StakingPointsLeaderboard;

export default StakingPoints;