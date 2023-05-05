import { BigNumber } from "ethers";

interface StakedToken {
  tokenId: string;
  contractAddress: string;
  stakerAddress: string;
  timeStaked: BigNumber;
  timeUnstaked: BigNumber;
  tokenIdx: BigNumber;
}

interface Staker {
  pointsRedeemed: BigNumber;
  stakerIdx: BigNumber;
  stakersTokens: StakedToken[];
  stakerAddress: string;
}

interface StakingRule {
  tokenAddress: string;
  pointsRatePerDay: BigNumber;
  startTime: BigNumber;
  endTime: BigNumber;
}

interface StakedTokenParams {
  tokenAddress: string;
  tokenId: BigNumber;
}
