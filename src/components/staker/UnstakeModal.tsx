import React, { useEffect, useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import StakingPointsABI from "../../abis/StakingPoints.json";
import { useStakerContext } from "./StakerContext";
import Modal from "../Modal";
import StakeTokenForm from "./StakeTokenForm";
import { StakedToken, StakedTokenParams } from "@/types";

const UnstakeModal = () => {
  const [selectedValues, setSelectedValues] = useState<StakedTokenParams[]>([]);

  const { isUnstakingModalOpen, setUnstakingModalOpen, staker } =
    useStakerContext();

  const tokensWithoutUnstakingTime = staker?.stakersTokens.filter(
    (token: StakedToken) => token.timeUnstaked.toNumber() === 0
  );

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "unstakeTokens",
    args: [process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS, process.env.NEXT_PUBLIC_INSTANCE_ID, selectedValues],
    enabled: selectedValues.length > 0
  });

  // @dev show txn processing, success
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config);

  const handleUnstaking = () => {
    write?.();
  };

  useEffect(() => {
    setSelectedValues([]);
  }, [isUnstakingModalOpen]);

  return (
    <Modal
      isOpen={isUnstakingModalOpen}
      setModalOpen={setUnstakingModalOpen}
      title={"Unstake token(s)"}
      description="This will transfer ownership of the token(s) back to you."
    >
      <p className="pt-8">{`Currently staked tokens: ${tokensWithoutUnstakingTime?.map(
        (token: StakedToken) =>
          `{tokenAddress: ${token.contractAddress}, tokenId: ${token.tokenId}}`
      )}`}</p>
      <p className="pt-8">{`Selected tokens: ${selectedValues.map(
        (token) =>
          `{tokenAddress: ${token.tokenAddress}, tokenId: ${token.tokenId}}`
      )}`}</p>
      <StakeTokenForm setSelectedValues={setSelectedValues} />
      <div className="flex justify-end">
        <div className="pr-4">
          <button
            className="btn-secondary py-2 px-4"
            onClick={() => setUnstakingModalOpen(false)}
          >
            Nevermind
          </button>
        </div>
        <div>
          <button
            disabled={!write || isError}
            className="btn-primary py-2 px-4"
            onClick={handleUnstaking}
          >
            Unstake
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UnstakeModal;
