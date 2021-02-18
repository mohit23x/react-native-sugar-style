import React from "react";
import { View, Text } from "react-native";
import StyleSheet from "../style";

export default function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🤘Hello World!</Text>
      {StyleSheet.constants.os.web ? (
        <Text style={styles.help}>Try resizing the browser width.</Text>
      ) : (
        <Text style={styles.help}>
          Try changing the orientation of the device.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    minHeight: 200,
    backgroundColor: theme.surface,
    margin: theme.spacing.l,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadius.m
  },
  text: {
    color: theme.text,
    fontWeight: "700",
    fontSize: theme.fontSize.l
  },
  help: {
    color: theme.text,
    marginTop: theme.spacing.s,
    opacity: 0.7
  }
}));
