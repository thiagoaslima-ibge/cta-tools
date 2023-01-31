export const mediaQueries = ["xs", "sm", "md", "lg"] as const;
export type MediaQuery = typeof mediaQueries[number];

// TODO: Import breakpoints from Theme
const breakpoints: Record<Exclude<MediaQuery, 'xs'>, string> = {
  sm: "50em",
  md: "64em",
  lg: "92em",
};

export function getCurrentMediaQuery(): MediaQuery {
  if (window.matchMedia(`(min-width: ${breakpoints.lg})`).matches) {
    return "lg";
  }
  if (window.matchMedia(`(min-width: ${breakpoints.md})`).matches) {
    return "md";
  }
  if (window.matchMedia(`(min-width: ${breakpoints.sm})`).matches) {
    return "sm";
  }
  return "xs";
}
