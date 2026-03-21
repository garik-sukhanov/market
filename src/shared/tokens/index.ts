export const palette = {
  white: "#FFFFFF",
  black: "#000000",
  grey1: "#EBEBEB",
  grey2: "#E2E2E2",
  grey3: "#B2B3B9",
  grey4: "#9C9C9C",
  grey5: "#6C6C6C",
  blue: "#242EDB",
  lightBlue: "#367AFF",
};

const shadows = {
  primary: "4px 4px 0 0 #221b19",
};

const spacing = {
  1: "2px",
  2: "4px",
  3: "8px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "40px",
  8: "48px",
  9: "56px",
  10: "64px",
};

const commonTokens = {
  spacing,
  shadows,
};

export const lightTokens = {
  ...commonTokens,
  colors: {
    ...palette,
    bgBase: "#F3F3F3",
    bgSecondary: "#F9F9F9",
    textBase: palette.black,
    primary: palette.lightBlue,
    bgContainer: "#F9F9F9",
    accent: palette.lightBlue,
  },
};

export type ThemeTokens = typeof lightTokens;

export const TOKENS = {
  spacing,
  shadows,
};
