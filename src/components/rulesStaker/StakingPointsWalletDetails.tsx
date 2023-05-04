import React from 'react'
import { useStakingPointsContext } from '../stakingpoints/StakingPointsContext'

const StakingPointsWalletDetails = () => {

  const { stakers } =  useStakingPointsContext();
  const { stakingRules } = useStakingPointsContext();
  
  return (
    <div>StakingPointsWalletDetails</div>
  )
}



export default StakingPointsWalletDetails