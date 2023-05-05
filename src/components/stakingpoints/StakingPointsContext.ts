import { Staker, StakingRule } from "@/types";
import { createContext, useContext } from "react";

const StakingPointsContext = createContext<{
  stakers: Staker[];
  stakingRules: StakingRule[];
} | null>(null);

export function useStakingPointsContext() {
  const context = useContext(StakingPointsContext);

  if (!context) {
    throw new Error("Component must be child of StakingPoints");
  }
  return context;
}

export default StakingPointsContext;
