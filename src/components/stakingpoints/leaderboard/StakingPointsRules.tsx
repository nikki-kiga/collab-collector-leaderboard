import React from "react";
import { useStakingPointsContext } from "../StakingPointsContext";

const StakingPointsRules = () => {
  const { stakingRules } = useStakingPointsContext();

  return (
    <div className="p-2 bg-gray-900 w-full">
      <table className="text-md text-left text-gray-500 min-w-full flex flex-col">
        <caption className="text-left text-lg bg-gray-900">
          Staking rules
        </caption>
        <thead className="contents">
          <tr className="bg-gray-700 flex flex-wrap justify-between">
            <th className="text-ellipsis">Token address</th>
            <th>Points per day</th>
          </tr>
        </thead>
        <tbody className="contents">
          {stakingRules.map((rule) => {
            return (
              <tr key={rule.tokenAddress} className="border-t border-gray-700 flex flex-wrap justify-between">
                <td className="text-ellipsis">{rule.tokenAddress}</td>
                <td align="right">{rule.pointsRatePerDay.toNumber()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StakingPointsRules;
