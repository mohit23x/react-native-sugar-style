import React from "react";
import { View } from "react-native";
import Card from "../components/Card";
import Counter from "../components/Counter";
import Toggle from "../components/Toggle";
import { StyleSheet, useTheme } from "../style";

export default function Screen() {
  useTheme();
  return (
    <View style={styles.container}>
      <Card />
      <Counter />
      <Toggle />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
}));
