import React from "react";
import { SugarProvider } from "react-native-sugar-style";
import StyleSheet from "./style";
import Screen from "./screens";

export default function App() {
  return (
    <SugarProvider sugar={StyleSheet}>
      <Screen />
    </SugarProvider>
  );
}
