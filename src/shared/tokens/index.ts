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
  darkBlue: "#3C538E",
  danger: "#F11010",
};

const shadows = {
  primary: "0 24px 28px rgba(0, 0, 0, 0.04)",
  secondary: `0 12px 7px rgba(0, 0, 0, 0.03),
    0 0 0 2px #fff;`,
};

const fonts = {
  sans: 'Cairo, "Open Sans", Roboto, sans-serif',
  mono: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
  20: "20px",
  24: "24px",
  40: "40px",
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
  fonts,
};

export const lightTokens = {
  ...commonTokens,
  colors: {
    ...palette,
    bgBase: "#F3F3F3",
    bgSecondary: "#F9F9F9",
    bgGradient: `linear-gradient(0deg, rgba(35, 35, 35, 0) 50%, rgba(35, 35, 35, 0.06) 100%),
    #fff`,
    bgGradient2: `linear-gradient(
    180deg,
    rgba(35, 35, 35, 0.03) 0%,
    rgba(35, 35, 35, 0) 50%
  )`,
    textBase: palette.black,
    primary: palette.blue,
    bgContainer: "#F9F9F9",
    accent: palette.lightBlue,
    error: palette.danger,
  },
};

export type ThemeTokens = typeof lightTokens;

export const TOKENS = {
  spacing,
  shadows,
  fonts,
};
