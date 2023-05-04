import React from "react";
import { useStakerContext } from "./StakerContext";
import Modal from "../Modal";

const UnstakeModal = () => {
  const { isUnstakingModalOpen, setUnstakingModalOpen, staker } =
    useStakerContext();

  const handleUnstaking = () => {
    console.log("unstake!", staker);
  };

  return (
    <Modal
      isOpen={isUnstakingModalOpen}
      setModalOpen={setUnstakingModalOpen}
      title={"Unstake token(s)"}
      description="This will transfer ownership of the token(s) back to you."
    >
      <div className="flex justify-end">
        <div className="card"></div>
        <div className="card">
          <button onClick={() => setUnstakingModalOpen(false)}>
            Nevermind
          </button>
        </div>
        <div className="card">
          <button onClick={handleUnstaking}>Stake it!</button>
        </div>
      </div>
    </Modal>
  );
};

export default UnstakeModal;
