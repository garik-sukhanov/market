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
  1: "1px",
  2: "2px",
  3: "3px",
  4: "4px",
  5: "5px",
  6: "6px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  48: "48px",
  56: "56px",
  64: "64px",
  72: "72px",
  80: "80px",
  96: "96px",
  128: "128px",
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
    primary: palette.blue,
    bgContainer: "#F9F9F9",
    accent: palette.lightBlue,
  },
};

export type ThemeTokens = typeof lightTokens;

export const TOKENS = {
  spacing,
  shadows,
};
