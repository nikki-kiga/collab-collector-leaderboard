import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { getAccount } from "@wagmi/core";
import StakingPoints from "@/components/stakingpoints/StakingPoints";
import StakingButton from "@/components/staker/StakingButton";
import StakerContext from "@/components/staker/StakerContext";
import StakingPointsContext from "./stakingpoints/StakingPointsContext";
import StakeModal from "@/components/rulesStaker/StakeModal";
import UnstakeModal from "@/components/staker/UnstakeModal";
import StakingPointsABI from "../abis/StakingPoints.json";

const Staking = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isStakingModalOpen, setStakingModalOpen] = useState(false);
  const [isUnstakingModalOpen, setUnstakingModalOpen] = useState(false);
  const account = getAccount();

  const { data: staker, error: stakerError } = useContractRead({
    address: "0xBDAd5f915E030ad72954E644e7f665b33A4e2EDC",
    abi: StakingPointsABI,
    functionName: "getStaker",
    args: ["0xd9F894965Efd196e654a53Dc96212bb220e7ECd7", 1, account.address],
    enabled: account.isConnected,
  });

  const { data: instance, error: instanceError } = useContractRead({
    address: "0xBDAd5f915E030ad72954E644e7f665b33A4e2EDC",
    abi: StakingPointsABI,
    functionName: "getStakingPointsInstance",
    args: ["0xd9F894965Efd196e654a53Dc96212bb220e7ECd7", 1],
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

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
          <>
            <StakingPoints.Rules />
            <StakingPoints.WalletDetails />
          </>
        }
      />
      <StakeModal />
      <UnstakeModal />
    </StakerContext.Provider>

    </StakingPointsContext.Provider>
  );
};

export default Staking;
