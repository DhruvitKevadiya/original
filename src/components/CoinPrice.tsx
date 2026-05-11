import { formatCoins } from "@/lib/format";

type CoinPriceProps = {
  value: number;
  className?: string;
};

export function CoinPrice({ value, className = "" }: CoinPriceProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="coin" aria-hidden="true" />
      {formatCoins(value)}
    </span>
  );
}
