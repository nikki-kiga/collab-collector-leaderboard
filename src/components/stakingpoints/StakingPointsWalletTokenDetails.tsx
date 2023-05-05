import React from "react";

const StakingPointsWalletTokenDetails = ({token}) => {

  return (
    <div key={`${token.tokenId}-${token.timeUnstaked}`}>
      <span>{token.contractAddress} </span>
      <span>, {new Date(token.timeStaked.toNumber() * 1000).toString()}</span>
      <span>
        ,{" "}
        {token.timeUnstaked.toNumber() > 0
          ? new Date(token.timeUnstaked.toNumber() * 1000).toUTCString()
          : "Still staked"}
      </span>
    </div>
  );
};

export default StakingPointsWalletTokenDetails;
