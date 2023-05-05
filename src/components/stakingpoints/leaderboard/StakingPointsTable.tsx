import React, { useEffect, useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import { useStakersWithPointsContext } from "../PointsContext";
const StakingPointsTable = () => {
  const { stakersWithPoints } = useStakersWithPointsContext();
  const [sortedStakersWithPoints, setSortedStakersWithPoints] = useState<{ stakerAddress: string; points: number; }[]>([]);
  function renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
        <span className="">{sortedStakersWithPoints[index]?.stakerAddress} has </span>
        <span className="">{sortedStakersWithPoints[index]?.points} points available</span>
      </div>
    );
  }

  useEffect(() => {
    setSortedStakersWithPoints(
      stakersWithPoints.slice().sort((a, b) => b.points - a.points)
    );
  }, [stakersWithPoints, stakersWithPoints.length]);

  if (!sortedStakersWithPoints) return null;

  return (
    <div className="pt-16">
      <List
        width={600}
        height={600}
        rowHeight={60}
        rowRenderer={renderRow}
        rowCount={sortedStakersWithPoints.length}
        overscanRowCount={1}
      />
    </div>
  );
};

export default StakingPointsTable;
