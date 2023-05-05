import React, { useEffect, useState } from "react";
import { useContractRead, useProvider } from "wagmi";
import { getNetwork, getContract, readContract } from "@wagmi/core";
import StakingPointsABI from "../../abis/StakingPoints.json";
import { ethers } from "ethers";
import { useStakingPointsContext } from "./StakingPointsContext";
import { List, AutoSizer } from "react-virtualized";
import StakingPointsRow from "./StakingPointsRow";

const StakingPointsLeaderboard = ({}) => {
  const { chain, chains } = getNetwork();
  const { stakers, rules } = useStakingPointsContext();
  const parentRef = React.useRef();

  function renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
          <div>{stakers[index]?.stakerAddress}</div>
          {/* <div>{stakers[index]?.stakerIdx.toNumber()}</div> */}
          {/* add component with contractRead call for points for wallet */}
      </div>
    );
  }

  return (
    <div>
      <h1 className="title text-left">StakingLeaderboard</h1>
      {/* <AutoSizer>
        {({ width, height }) => {
          <List
            width={width}
            height={height}
            rowHeight={60}
            rowRenderer={renderRow}
            rowCount={stakers.length}
            overscanRowCount={1}
          />;
        }}
      </AutoSizer> */}
      {stakers.map((staker) => (
        <StakingPointsRow staker={staker} key={staker.stakerAddress}/>
      ))}
    </div>
  );
};

export default StakingPointsLeaderboard;
