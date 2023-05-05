import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import StakingPoints from "@/components/stakingpoints/StakingPoints";
import StakingButton from "@/components/staker/StakingButton";
import StakerContext from "@/components/staker/StakerContext";
import StakingPointsContext from "./stakingpoints/StakingPointsContext";
import StakeModal from "@/components/staker/StakeModal";
import UnstakeModal from "@/components/staker/UnstakeModal";
import StakingPointsABI from "../abis/StakingPoints.json";

const Staking = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isStakingModalOpen, setStakingModalOpen] = useState(false);
  const [isUnstakingModalOpen, setUnstakingModalOpen] = useState(false);

  const { address } = useAccount();

  const {
    data: staker,
    error: stakerError,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getStaker",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, 1, address],
  });

  const { data: instance, error: instanceError } = useContractRead({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "getStakingPointsInstance",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, 1],
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !instance) return null;

  return (
    <StakingPointsContext.Provider value={instance}>
      <StakerContext.Provider
        value={{
          isStakingModalOpen,
          setStakingModalOpen,
          isUnstakingModalOpen,
          setUnstakingModalOpen,
          staker: staker,
        }}
      >
        <StakingButton />
        <StakingPoints
          info={<StakingPoints.Leaderboard />}
          details={
            <div className="flex flex-col min-w-0 w-full shrink">
              <StakingPoints.Rules />
              <StakingPoints.WalletDetails />
            </div>
          }
        />
        <StakeModal />
        <UnstakeModal />
      </StakerContext.Provider>
    </StakingPointsContext.Provider>
  );
};

export default Staking;
