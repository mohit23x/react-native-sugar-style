import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import { StyleSheet } from "../style";

const placeholder = {
  potrait: `if width less than 480 the color will be orange (potrait mode and mobile)`,
  landscape: `if width greater than 480 the color will be green (landscape mode and desktop)`
};

export default function Counter() {
  const [count, setCount] = useState(1);

  return (
    <>
      <Pressable style={styles.pressable} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.text}>{`Click: ${count}`}</Text>
      </Pressable>
      <Text style={styles.subtitle}>{placeholder.landscape}</Text>
      <Text style={styles.subtitle}>{placeholder.potrait}</Text>
    </>
  );
}

const styles = StyleSheet.create(theme => ({
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.m,
    backgroundColor: [theme.orangeOff, theme.greenOff]
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: theme.fontSize.xl,
    color: [theme.orange, theme.green],
    marginVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s
  },
  subtitle: {
    textAlign: "center",
    color: theme.text,
    marginVertical: theme.spacing.xs
  }
}));
