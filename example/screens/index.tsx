import React from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet, useTheme } from "../style";

import Card from "../components/Card";
import Counter from "../components/Counter";
import Toggle from "../components/Toggle";

export default function Screen() {
  useTheme();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card />
        <Counter />
        <Toggle />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme, constants) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: constants.statusBarHeight
  }
}));
