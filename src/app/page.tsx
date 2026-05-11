import { Header } from "@/components/Header";
import { HomeClient } from "@/components/HomeClient";
import { HubBoards } from "@/components/HubBoards";
import { LiveDropTicker } from "@/components/LiveDropTicker";
import { StatsFooter } from "@/components/StatsFooter";
import { cases } from "@/data/mock";

export default function Home() {
  return (
    <>
      <LiveDropTicker />
      <Header />
      <main className="mx-auto max-w-[1280px] space-y-8 px-4 py-6 sm:px-6 xl:px-8">
        <HubBoards />
        <HomeClient items={cases} />
        <div className="pt-10 sm:pt-12">
          <StatsFooter />
        </div>
      </main>
    </>
  );
}
