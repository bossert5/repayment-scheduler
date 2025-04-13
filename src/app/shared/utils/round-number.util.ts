/*
* Utility function to round a number to a specified number of decimal places.
* Positive decimals will round to the right of the decimal point.
* Negative decimals will round to the left of the decimal point.
*
* @param value - The number to round.
* @param decimals - The number of decimal places to round to. Default is 2.
* @returns The rounded number.
* */
export function roundNumber(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
