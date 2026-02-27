const PLANET_COLORS = [
  "#1eabb8",
  "#4f46e5",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
];

/**
 * Gets a color from the palette based on index.
 * Uses modulo to loop if index > palette length.
 */
export const getColor = (index: number): string => {
  return PLANET_COLORS[index % PLANET_COLORS.length];
};