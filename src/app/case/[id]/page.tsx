import { CaseContents } from "@/components/CaseContents";
import { Header } from "@/components/Header";
import { LiveDropTicker } from "@/components/LiveDropTicker";
import { Roulette } from "@/components/Roulette";
import { SpinSoundToggle } from "@/components/SpinSoundToggle";
import { StatsFooter } from "@/components/StatsFooter";
import { cases } from "@/data/mock";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ frame?: string }>;
};

export default async function CasePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const item = cases.find((caseItem) => caseItem.id === id);

  if (!item) {
    notFound();
  }

  const frameParam = resolvedSearchParams?.frame;
  const frameVariant =
    frameParam === "rail" ||
    frameParam === "double" ||
    frameParam === "glass" ||
    frameParam === "split" ||
    frameParam === "dock" ||
    frameParam === "shelf"
      ? frameParam
      : "double";

  return (
    <>
      <LiveDropTicker />
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 sm:py-6 xl:px-8">
        <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <a
            href="/#cases"
            className="inline-flex h-[42px] w-fit items-center gap-2 rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-4 text-sm font-black text-[#ffe28a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:-translate-y-0.5 hover:border-[#ffe28a]/30 hover:text-[#fff0be]"
          >
            <ArrowLeft size={17} strokeWidth={3} />
            {
              "\u041d\u0430\u0437\u0430\u0434 \u043a \u043a\u0435\u0439\u0441\u0430\u043c"
            }
          </a>
          <h1 className="text-2xl font-black text-white sm:text-center sm:text-3xl">
            {item.name}
          </h1>
          <div className="flex justify-start sm:justify-end">
            <SpinSoundToggle />
          </div>
        </div>

        <Roulette caseItem={item} frameVariant={frameVariant} />

        <div className="mt-10 space-y-5 sm:mt-12">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.18em] text-[#dfe6ff]/85">
            {
              "\u0421\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435 \u043a\u0435\u0439\u0441\u0430"
            }
          </h2>
          <CaseContents />
        </div>

        <div className="pt-12 sm:pt-14">
          <StatsFooter />
        </div>
      </main>
    </>
  );
}
