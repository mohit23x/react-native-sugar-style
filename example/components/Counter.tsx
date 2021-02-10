import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import { StyleSheet, useTheme } from "../style";

export default function Counter() {
  useTheme();
  const [count, setCount] = useState(1);

  return (
    <Pressable style={styles.pressable} onPress={() => setCount(c => c + 1)}>
      <Text style={styles.text}>{`count: ${count}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => ({
  pressable: {
    width: theme.constant.width,
    alignItems: "center",
    backgroundColor: theme.buttonPrimary
  },
  text: {
    fontSize: theme.fontSize.xl,
    color: theme.text,
    padding: theme.spacing.l
  }
}));
