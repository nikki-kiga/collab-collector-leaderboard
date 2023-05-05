import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useStakerContext } from "./StakerContext";
import { StakedToken } from "@/types";

const StakingButton = () => {
  const {
    isStakingModalOpen,
    setStakingModalOpen,
    isUnstakingModalOpen,
    setUnstakingModalOpen,
  } = useStakerContext();
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  const { staker } = useStakerContext();

  const tokensWithoutUnstakingTime = staker?.stakersTokens.filter((token: StakedToken) => token.timeUnstaked.toNumber() === 0)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isConnected || !isMounted) return null;
  return (
    <div className="w-full flex justify-end pt-4 mb-24">
      <button className="btn-primary py-2 px-4 mr-4" onClick={() => setStakingModalOpen(!isStakingModalOpen)}>
        Stake
      </button>
      {tokensWithoutUnstakingTime && tokensWithoutUnstakingTime.length > 0 && (
        <button className="btn-primary py-2 px-4" onClick={() => setUnstakingModalOpen(!isUnstakingModalOpen)}>
          Unstake
        </button>
      )}
    </div>
  );
};

export default StakingButton;
