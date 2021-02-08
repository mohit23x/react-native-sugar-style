import React from "react";
import { View, Text } from "react-native";
import StyleSheet from "../style";

export default function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🤘Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    height: 250,
    backgroundColor: theme.surface,
    margin: theme.spacing.m,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadius.m,
  },
  text: {
    color: theme.text,
    fontWeight: "700",
    fontSize: theme.fontSize.l,
  },
}));
