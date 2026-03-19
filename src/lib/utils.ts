

/**
 * Formats numbers into a compact, human-readable string (e.g., 1.2K, 1.5M)
 */
export const formatCompactNumber = (number: number | undefined | null): string => {
  if (number === undefined || number === null) return "0";

  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

/**
 * Formats a decimal (0.12) or whole number (12) into a percentage string.
 * @param value - The number to format
 * @param isDecimal - Set to true if 0.12 should become "12%", false if 12 should become "12%"
 */
export const formatPercentNumber = (
  value: number | undefined | null,
  isDecimal = false
): string => {
  if (value === null || value === undefined) return "0%";

  // Intl.NumberFormat 'percent' expects decimals (0.12 = 12%)
  // If your input is already 12, we divide by 100 first.
  const numberToFormat = isDecimal ? value : value / 100;

  return new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberToFormat);
};