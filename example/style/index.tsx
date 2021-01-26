import Sugar, { constants } from "react-native-sugar-style";

const commonTheme = {
  ...constants,
  spacing: {
    s: 10,
    m: 20,
    l: 30,
  },
  borderRadius: {
    s: 8,
    m: 24,
  },
  fontSize: {
    small: 12,
    medium: 16,
    big: 24,
  },
  // add any custom value
};

export const lightTheme = {
  ...commonTheme,
  name: "light",
  background: "#fbfbfb",
  surface: "#c0c0c0",
  text: "#121212",
  buttonPrimary: "#f2b400",
};

export const darkTheme = {
  ...commonTheme,
  name: "dark",
  background: "#000000",
  surface: "#2b2b2b",
  text: "#f0f0f0",
  buttonPrimary: "#3700b3",
};

export type Theme = typeof lightTheme;
export const StyleSheet = new Sugar<Theme>(lightTheme);

export default StyleSheet;
