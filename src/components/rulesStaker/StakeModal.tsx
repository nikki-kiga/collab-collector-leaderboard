import { useStakerContext } from "../staker/StakerContext";
import Modal from "../Modal";
import { useStakingPointsContext } from "../stakingpoints/StakingPointsContext";
import { useContractRead, useContractReads, erc721ABI, useAccount } from "wagmi";

const StakeModal = () => {
  const { isStakingModalOpen, setStakingModalOpen, staker } =
    useStakerContext();
  const { stakingRules } = useStakingPointsContext();
  const { address } = useAccount();
  const ruleAddresses = stakingRules.map((rule) => rule.tokenAddress);

  // const { data, isError, isLoading } = useContractReads({
  //   contracts: [
  //     ...ruleAddresses.map((contractAddress) => {
  //       return {
  //         address: contractAddress as `0x${string}`,
  //         abi: erc721ABI,
  //         functionName: "balanceOf",
  //         args: [address]
  //       };
  //     }),
  //   ],
  // });

  // @dev multicall is not available on localhost so only using first ruleAddress
  const { data } = useContractRead({
    address: ruleAddresses[0] as `0x${string}`, 
    abi: erc721ABI,
    functionName: "balanceOf",
    args: [address as`0x${string}`],
  })

  console.log('data', data);

  const handleStaking = () => {
    console.log("stake!", staker);
  };

  return (
    <Modal
      isOpen={isStakingModalOpen}
      setModalOpen={setStakingModalOpen}
      title={"Stake token(s)"}
      description="This will transfer ownership of the token(s) to the contract until
    you unstake it/them."
    >
      <div className="flex justify-end">
        <div className="card">
          <button onClick={() => setStakingModalOpen(false)}>Nevermind</button>
        </div>
        <div className="card">
          <button onClick={handleStaking}>Stake it!</button>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
