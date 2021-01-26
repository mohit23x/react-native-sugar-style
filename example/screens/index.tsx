import React from "react";
import { View } from "react-native";
import Card from "../components/Card";
import Toggle from "../components/Toggle";
import StyleSheet from "../style";

export default function Screen() {
  return (
    <View style={styles.container}>
      <Card />
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
