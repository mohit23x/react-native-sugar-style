import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, lightTheme, darkTheme } from "../style";

export default function Toggle() {
  const isLight = StyleSheet.theme.name === "light";

  const onPress = () => {
    StyleSheet.build(isLight ? darkTheme : lightTheme);
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
    alignItems: "center"
  },
  button: {
    padding: theme.spacing.l,
    backgroundColor: theme.buttonPrimary,
    borderRadius: theme.borderRadius.s
  },
  text: {
    color: theme.text,
    fontSize: theme.fontSize.medium
  }
}));
