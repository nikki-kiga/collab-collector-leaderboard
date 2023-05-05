This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setting up
add a local.env file with matching contract addresses and instanceId for chain/env
```
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS="[STAKING_POINTS_CONTRACT_ADRESS]"
NEXT_PUBLIC_CREATOR_CONTRACT_ADDRESS="[CONTRACT_CREATOR_CONTRACT_ADDRESS]"
NEXT_PUBLIC_INSTANCE_ID="[STAKING_POINTS_INSTANCE]"
```
## Helpers for working locally with Ganache
```
let creator = await ERC721Creator.deployed()
let stakingPoints = await ERC721StakingPoints.deployed() let membership = await MockManifoldMembership.deployed()
let mock721 = await MockERC721.deployed()


let accounts = await web3.eth.getAccounts()

await stakingPoints.setMembershipAddress(membership.address)

await creator.registerExtension(stakingPoints.address, {from: accounts[0]})

mock721.mint(accounts[1], 1)
mock721.mint(accounts[1], 2)
mock721.mint(accounts[1], 3)

mock721.mint(accounts[2], 4)
mock721.mint(accounts[2], 5)

mock721.mint(accounts[3], 6)

mock721.mint(accounts[4], 7)

await stakingPoints.initializeStakingPoints(creator.address, 1, {paymentReceiver: accounts[0], stakingRules:[{tokenAddress: mock721.address, pointsRatePerDay: 28800, startTime: 1683146979 , endTime: 1685850440}]}, {from: accounts[0]})

await mock721.setApprovalForAll(stakingPoints.address, true, {from: accounts[1]})

await stakingPoints.stakeTokens(creator.address, 1, [{tokenAddress: mock721.address, tokenId: 1}], {from: accounts[1]})

await stakingPoints.unstakeTokens(creator.address, 1, [{tokenAddress: mock721.address, tokenId: 1}], {from: accounts[1]})

await stakingPoints.getPointsForWallet(creator.address, 1, accounts[1])

await stakingPoints.getStaker(creator.address, 1, accounts[1])
```

### Potential next steps
- [] adding approve token transaction on first staking transaction
- [] adding txn processing to modals for staking and unstaking
- [] styling more
- [] alternative provider or fallback in order to render staking points instance details when wallet is not connected
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
