import { Dispatch, SetStateAction, createContext, useContext } from "react";

const StakersWithPointsContext = createContext<{
  stakersWithPoints: { stakerAddress: string; points: number }[];
  setStakersWithPoints: Dispatch<
    SetStateAction<{ stakerAddress: string; points: number }[]>
  >;
} | null>(null);

export function useStakersWithPointsContext() {
  const context = useContext(StakersWithPointsContext);

  if (!context) {
    throw new Error("Component must be of stakerswithpoints");
  }
  return context;
}

export default StakersWithPointsContext;
