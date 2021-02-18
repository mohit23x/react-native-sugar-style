import { Sugar } from "react-native-sugar-style";

const commonTheme = {
  spacing: {
    xs: 5,
    s: 10,
    m: 20,
    l: 30
  },
  borderRadius: {
    s: 8,
    m: 24
  },
  fontSize: {
    s: 12,
    m: 16,
    l: 24,
    xl: 32
  },
  orangeOff: "#f2b40059",
  orange: "#f0932b",
  greenOff: "#badc5859",
  green: "#6ab04c"
};

export const lightTheme = {
  ...commonTheme,
  name: "light",
  background: "#fbfbfb",
  surface: "#c0c0c0",
  text: "#121212",
  buttonPrimary: "#7ed6df"
};

export const darkTheme = {
  ...commonTheme,
  name: "dark",
  background: "#000000",
  surface: "#2b2b2b",
  text: "#f0f0f0",
  buttonPrimary: "#4834d4"
};

export type Theme = typeof lightTheme;
export const {
  StyleSheet,
  ThemeProvider,
  ThemeContext,
  useTheme,
  withTheme
} = Sugar<Theme>(lightTheme);

export default StyleSheet;
