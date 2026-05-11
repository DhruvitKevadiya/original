import {
  BadgePercent,
  Bitcoin,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  Globe2,
  Mail,
  Plus,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Header } from "@/components/Header";
import { LiveDropTicker } from "@/components/LiveDropTicker";
import { CoinPrice } from "@/components/CoinPrice";
import { StatsFooter } from "@/components/StatsFooter";

const paymentMethods = [
  { name: "Visa", image: "/payment/visa.png" },
  { name: "Mastercard", image: "/payment/master.png" },
  { name: "Mir", image: "/payment/mir.png" },
];
const amounts = [499, 990, 2490, 4990];

export default function DepositPage() {
  return (
    <>
      <LiveDropTicker />
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 xl:px-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-[16px] bg-gradient-to-b from-honey-300 to-ember-400 text-[#3a1705] shadow-warm">
            <WalletCards size={20} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">Пополнение баланса</h1>
            <p className="mt-1 text-xs font-bold text-amber-100/50">Способ оплаты, сумма и подтверждение</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,780px)_330px] xl:grid-cols-[minmax(0,820px)_330px]">
          <section className="overflow-hidden rounded-[24px] bg-cocoa-850 shadow-soft">
            <div className="grid gap-3 bg-[linear-gradient(135deg,#2b2113,#5a3717)] p-3.5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-cocoa-950/48 shadow-insetWarm">
                  <Gift className="text-honey-300" size={23} strokeWidth={2.8} />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">Бонус к пополнению</h2>
                  <p className="mt-0.5 text-xs font-bold text-amber-100/58">Промокод внутри формы перед оплатой</p>
                </div>
              </div>
              <div className="inline-flex rounded-[16px] bg-cocoa-950/55 px-3 py-1.5 text-xs font-black text-honey-300 shadow-insetWarm">
                +13% к сумме
              </div>
            </div>

            <div className="space-y-3.5 p-4">
              <div>
                <p className="mb-2 text-xs font-black text-amber-100/58">Способ оплаты</p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {paymentMethods.map((method, index) => (
                    <button
                      key={method.name}
                      aria-label={method.name}
                      className={`grid h-[56px] place-items-center rounded-[18px] px-3 shadow-insetWarm transition hover:-translate-y-0.5 ${
                        index === 0
                          ? "bg-gradient-to-b from-ember-300 to-ember-500 ring-2 ring-ember-300"
                          : "bg-cocoa-950/62 text-amber-100/74 hover:bg-cocoa-900"
                      }`}
                    >
                      <img src={method.image} alt={method.name} className="h-8 w-auto object-contain drop-shadow-sm" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_0.8fr]">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-black text-amber-100/58">Укажите Email</span>
                  <span className="flex h-11 items-center gap-3 rounded-[18px] bg-cocoa-950/62 px-4 shadow-insetWarm">
                    <Mail size={17} className="text-honey-300/78" />
                    <input className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-amber-100/34" placeholder="Email" />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-black text-amber-100/58">Промокод</span>
                  <span className="flex h-11 items-center gap-3 rounded-[18px] bg-cocoa-950/62 px-4 shadow-insetWarm">
                    <BadgePercent size={17} className="text-honey-300/78" />
                    <input className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-amber-100/34" placeholder="PANDA_761" />
                    <button className="grid h-7 w-7 shrink-0 place-items-center rounded-[12px] bg-honey-300 text-[#3a1705]">
                      <Check size={16} strokeWidth={3} />
                    </button>
                  </span>
                </label>
              </div>

              <div>
                <p className="mb-2 text-xs font-black text-amber-100/58">Укажите сумму</p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      className="h-10 rounded-[16px] bg-cocoa-950/62 text-sm font-black text-honey-300 shadow-insetWarm transition hover:-translate-y-0.5 hover:bg-cocoa-900"
                    >
                      <CoinPrice value={amount} />
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 flex h-11 items-center justify-between rounded-[18px] bg-cocoa-950/62 px-4 shadow-insetWarm">
                  <CoinPrice value={499} className="text-sm font-black text-white" />
                  <span className="rounded-xl bg-cocoa-800 px-3 py-1 text-xs font-black text-amber-100/45">Мин. 200</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-xs font-bold text-amber-100/54">
                  <span className="relative h-6 w-11 rounded-full bg-cocoa-950 shadow-insetWarm">
                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-honey-300 shadow-warm" />
                  </span>
                  Принимаю условия пользовательского соглашения
                </label>
                <p className="text-xs font-black text-amber-100/58">
                  На баланс поступит: <CoinPrice value={499} className="inline-flex text-honey-300" />
                </p>
              </div>

              <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-b from-ember-300 to-ember-500 text-sm font-black text-[#3a1705] shadow-warm transition hover:-translate-y-0.5 hover:brightness-105">
                Пополнить
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-[28px] bg-cocoa-850 p-4 shadow-soft">
              <p className="mb-2 text-xs font-black text-amber-100/58">Укажите ваш регион</p>
              <button className="flex h-[46px] w-full items-center justify-between rounded-[18px] bg-cocoa-950/62 px-4 text-sm font-black text-white shadow-insetWarm">
                <span className="inline-flex items-center gap-3">
                  <Globe2 className="text-honey-300" size={18} />
                  Global
                </span>
                <ChevronDown size={17} />
              </button>
            </section>

            <section className="rounded-[28px] bg-cocoa-850 p-4 shadow-soft">
              <p className="mb-2 text-xs font-black text-amber-100/58">Выберите тип оплаты</p>
              <div className="grid gap-2.5">
                <button className="relative rounded-[18px] bg-gradient-to-b from-ember-300 to-ember-500 p-3 text-left text-[#3a1705] shadow-warm ring-2 ring-ember-300">
                  <Check className="absolute right-3 top-3 text-[#3a1705]" size={17} strokeWidth={3} />
                  <CreditCard className="mb-3 text-[#3a1705]" size={25} />
                  <p className="text-sm font-black">Карты</p>
                  <p className="mt-1 text-xs font-bold text-[#3a1705]/70">Visa, Mastercard, Mir</p>
                </button>
                <button className="rounded-[18px] bg-cocoa-950/62 p-3 text-left text-amber-100/72 shadow-insetWarm transition hover:bg-cocoa-900">
                  <Bitcoin className="mb-3 text-honey-300" size={25} />
                  <p className="text-sm font-black text-white">Крипта</p>
                  <p className="mt-1 text-xs font-bold text-amber-100/50">Tether, Bitcoin</p>
                </button>
                <button className="rounded-[18px] bg-cocoa-950/62 p-3 text-left text-amber-100/72 shadow-insetWarm transition hover:bg-cocoa-900">
                  <ShieldCheck className="mb-3 text-honey-300" size={25} />
                  <p className="text-sm font-black text-white">Скины</p>
                  <p className="mt-1 text-xs font-bold text-amber-100/50">Оплата предметами</p>
                </button>
              </div>
            </section>
          </aside>
        </div>

        <div className="pt-16 sm:pt-20">
          <StatsFooter />
        </div>
      </main>
    </>
  );
}
