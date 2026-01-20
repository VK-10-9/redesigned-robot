export const LOGO_VARIATIONS = [
  { id: 1, name: "Variation 1" },
  { id: 2, name: "Variation 2" },
  { id: 3, name: "Variation 3" },
  { id: 4, name: "Variation 4" },
] as const;

export const LOGO_DIMENSIONS = {
  main: { width: 140, height: 140 },
  variation: { width: 220, height: 220 },
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;