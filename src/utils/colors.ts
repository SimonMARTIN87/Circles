
export const decimalToCSSColor = (decimal: number): string => {
  const hex = decimal.toString(16);
  return `#${hex}`;
}

export const cssStringToDecimal = (cssString: string): number => {
  const hex = cssString.slice(1);
  return parseInt(hex, 16);
}