import { Header } from "@/components/Header";
import { HubBoards } from "@/components/HubBoards";
import { HomeClient } from "@/components/HomeClient";
import { LiveDropTicker } from "@/components/LiveDropTicker";
import { StatsFooter } from "@/components/StatsFooter";
import { cases } from "@/data/mock";

export default function Home() {
  return (
    <>
      <LiveDropTicker />
      <Header />
      <main className="mx-auto max-w-[1280px] space-y-6 px-4 py-6 sm:px-6 xl:px-8">
        <HubBoards />
        <HomeClient items={cases} />
        <div className="pt-8 sm:pt-10">
          <StatsFooter />
        </div>
      </main>
    </>
  );
}
