import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, lightTheme, darkTheme } from "../style";

export default function Toggle() {
  const isLight = StyleSheet.theme.name === "light";

  const onPress = () => {
    const newTheme = isLight ? darkTheme : lightTheme;
    StyleSheet.build(newTheme);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>
          {isLight ? "🌙 Switch to dark mode" : "☀ Switch to light mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: theme.spacing.m
  },
  button: {
    padding: theme.spacing.m,
    marginVertical: theme.spacing.s,
    backgroundColor: theme.buttonPrimary,
    borderRadius: theme.borderRadius.s
  },
  text: {
    color: theme.text,
    fontSize: theme.fontSize.m
  }
}));
