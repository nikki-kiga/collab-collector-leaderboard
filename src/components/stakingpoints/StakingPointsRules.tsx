import React from 'react'
import { useStakingPointsContext } from './StakingPointsContext';

const StakingPointsRules = () => {

  const { stakingRules } = useStakingPointsContext();

  console.log('rules', stakingRules);
  return (
    <div>StakingRules</div>
  )
}

export default StakingPointsRules