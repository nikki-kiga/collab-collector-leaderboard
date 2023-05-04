import { createContext, useContext } from "react";

const StakerContext = createContext<{
  isStakingModalOpen: boolean;
  setStakingModalOpen: (val: boolean) => void;
  isUnstakingModalOpen: boolean;
  setUnstakingModalOpen: (val: boolean) => void;
  staker: Staker | null;
} | null>(null);

export function useStakerContext() {
  const context = useContext(StakerContext);

  if (!context) {
    throw new Error("Component must be child of StakingModal");
  }
  return context;
}

export default StakerContext;
