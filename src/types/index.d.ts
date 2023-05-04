interface StakedToken {
  tokenId: string;
  contractAddress: string;
  stakerAddress: string;
  timeStaked: number;
  timeUnstaked: number;
  tokenIdx: number;
}

interface Staker {
  pointsRedeemed: number;
  stakerIdx: number;
  stakers: TokensStakedToken[];
}

interface StakingRule {
  tokenAddress: string;
  pointsRatePerDay: number;
  startTime: number;
  endTime: number;
}
