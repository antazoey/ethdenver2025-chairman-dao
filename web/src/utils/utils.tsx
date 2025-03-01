export function divideAndDisplayAsPercentage(numerator: number, denominator: number): string {
  return `${(numerator / denominator * 100).toFixed(2)}%`;
}