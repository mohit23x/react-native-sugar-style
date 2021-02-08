import React from "react";
import { ThemeProvider } from "./style";
import Screen from "./screens";

export default function App() {
  return (
    <ThemeProvider>
      <Screen />
    </ThemeProvider>
  );
}
