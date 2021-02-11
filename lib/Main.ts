import Sugar from './Sugar';
import { themeCreator } from './Provider';

export default function Main<T>(theme: T) {
  const StyleSheet = new Sugar<T>(theme);
  const { ThemeContext, ThemeProvider, useTheme, withTheme } = themeCreator(
    StyleSheet,
    theme
  );
  return { StyleSheet, ThemeContext, ThemeProvider, useTheme, withTheme };
}
