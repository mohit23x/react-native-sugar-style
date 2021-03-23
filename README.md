<h1 align="left">

    🚀React Native Sugar Style

</h1>

https://www.npmjs.com/package/react-native-sugar-style (🧪 Experimental)

<br />

🎨 Theme based alternative for React Native StyleSheet

✨ Support responsive values as array

📐 Reduce computing device height & width in every component

📱 Works on android/ios/web (expo/react-native)

## Install

```
yarn add react-native-sugar-style
```

```
npm i react-native-sugar-style
```

## Usage

STEP 1: **style.tsx**

Define configurations for your theme, for more verbose example see [this file](https://github.com/mohit23x/react-native-sugar-style/blob/main/example/style/index.tsx).

```typescript
import Sugar from "react-native-sugar-style";

const dark = {
  background: "#2b2b2b",
  text: "#ffffff",
};

const light = {
  background: "#fbfbfb",
  text: "#000000",
};

export const { StyleSheet } = Sugar(light);

export default StyleSheet;
```

<br />

STEP 2: **component.tsx**

Use StyleSheet as you do normally do in components

```javascript
import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "./style";

const Component = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme, constants) => ({
  container: {
    height: constants.height,
    width: constants.width,
    backgroundColor: theme.background,
    flexDirection: ["column", "row"],
  },
  text: {
    color: theme.text,
  },
}));
```

<br />

## Demo

Scan and run with expo go app, run the [example project](https://github.com/mohit23x/react-native-sugar-style/tree/main/example) for a more detailed example.
https://expo.io/@mohit23x/projects/react-native-sugar-style or try the [react native web version](https://sugar-style.netlify.app/)

![Scan QR with expo app](assets/qr.png "Scan QR")

## More

[Guide](docs/Guide.md#Guide)

[Constants](docs/Guide.md#Constants)

[API](docs/Guide.md#API)

[Live Example](docs/Guide.md#Demo)

[Why this Package](docs/Guide.md#Why?)

[Acknowledgement](docs/Guide.md#Acknowledgement)

[Caveats](docs/Guide.md#Caveats)
