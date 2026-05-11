export function formatCoins(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}
