import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Staking from "@/components/Staking";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <div className="px-4 pt-4 md:px-8 body">
      <header className="flex justify-between">
        <Nav />
        <div>
          <ConnectButton />
        </div>
      </header>
        <main className={`main ${inter.className}`}>
          <Staking/>
        </main>
    </div>
  );
}
