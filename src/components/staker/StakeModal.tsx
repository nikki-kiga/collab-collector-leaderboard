import { useStakerContext } from "./StakerContext";
import Modal from "../Modal";
import { useStakingPointsContext } from "../stakingpoints/StakingPointsContext";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { useEffect, useState } from "react";
import StakingPointsABI from "../../abis/StakingPoints.json";
import StakeTokenForm from "./StakeTokenForm";
import { StakedTokenParams } from "@/types";

const StakeModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedValues, setSelectedValues] = useState<StakedTokenParams[]>([]);
  const { isStakingModalOpen, setStakingModalOpen, staker } =
    useStakerContext();
  const { stakingRules } = useStakingPointsContext();
  const ruleAddresses = stakingRules.map((rule) => rule.tokenAddress);

  // @dev multicall is not available on localhost can potentially use getNFTs from alchemy
  // const { data: balances, isError, isLoading } = useContractReads({
  //   contracts: [
  //     ...ruleAddresses.map((contractAddress) => {
  //       return {
  //         address: contractAddress as `0x${string}`,
  //         abi: erc721ABI,
  //         functionName: "balanceOf",
  //         args: [address as`0x${string}`]
  //       };
  //     }),
  //   ],
  // });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: StakingPointsABI,
    functionName: "stakeTokens",
    args: [
      process.env.NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS,
      1,
      selectedValues,
    ],
  });

  // @dev show txn processing, success
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleStaking = () => {
    write?.();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedValues([])
  },[isStakingModalOpen])

  if (!isMounted) return null;
  return (
    <Modal
      isOpen={isStakingModalOpen}
      setModalOpen={setStakingModalOpen}
      title={"Stake token(s)"}
      description="This will transfer ownership of the token(s) to the contract until
    you unstake it/them."
    >
      <p className="pt-8">{`Selected tokens: ${selectedValues.map(
        (token) =>
          `{tokenAddress: ${token.tokenAddress}, tokenId: ${token.tokenId}}`
      )}`}</p>
      {/* add tokens here */}
      <StakeTokenForm setSelectedValues={setSelectedValues} />
      <div className="flex justify-end">
        <div className="pr-4">
          <button
            className="btn-secondary py-4 px-6"
            onClick={() => setStakingModalOpen(false)}
          >
            Nevermind
          </button>
        </div>
        <div className="">
          <button
            disabled={!write || selectedValues.length < 1}
            className="btn-primary py-4 px-6 disabled:cursor-not-allowed disabled:bg-transparent disabled:border disabled:border-gray-500"
            onClick={handleStaking}
          >
            Stake it!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
