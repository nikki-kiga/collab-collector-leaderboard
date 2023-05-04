import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useStakerContext } from "./StakerContext";

const StakingButton = () => {
  const {
    isStakingModalOpen,
    setStakingModalOpen,
    isUnstakingModalOpen,
    setUnstakingModalOpen,
  } = useStakerContext();
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  //get whethere it is a staker
  const { staker } =
    useStakerContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isConnected || !isMounted) return null;
  return (
    <>
      <button onClick={() => setStakingModalOpen(!isStakingModalOpen)}>
        Stake
      </button>
      {}
      <button onClick={() => setUnstakingModalOpen(!isUnstakingModalOpen)}>
        Unstake
      </button>
    </>
  );
};

export default StakingButton;
