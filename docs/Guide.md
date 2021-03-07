[Guide](#Guide)

[Constants](#Constants)

[API](#API)

[Live Example](#Demo)

[Why this Package](#Why?)

[Acknowledgement](#Acknowledgement)

[Caveats](#Caveats)

<br />

## Guide

You need to create one main file which will export all the parts of the package like StyleSheet, ThemeProvider, useTheme hook etc.

Here is a full example same for both Javascript and TypeScript projects.

<br />

STEP 1: **style.tsx**

Define configurations for your theme, for more verbose example see [this file](https://github.com/mohit23x/react-native-sugar-style/blob/main/example/style/index.tsx).

```typescript
import Sugar from "react-native-sugar-style";

const commonTheme = {
  fontSize: {
    s: 12,
    m: 16,
  },
  borderRadius: {
    half: 12,
    full: 20,
  },
  // add any custom value here
};

const dark = {
  ...commonTheme,
  name: "dark",
  background: "black",
  text: "white",
  buttonPrimary: "green",
  surface: "gray",
};

const light = {
  ...commonTheme,
  name: "light",
  background: "white",
  text: "black",
  buttonPrimary: "red",
  surface: "gray",
};

export const { StyleSheet, ThemeProvider, useTheme, withTheme } = Sugar(light);

export default StyleSheet;
```

> the `name` key in theme object can be used to distinguish between themes while swapping

<br />

STEP 2: **App.tsx**

Wrap with ThemeProvider

```javascript
import React from "react";
import { ThemeProvider } from "./style";
import Navigation from "./navigation";

const App = () => (
  <ThemeProvider>
    <Navigation />
  </ThemeProvider>
);
```

<br />

STEP 3: **component.tsx**

Use StyleSheet as you do normally do in components

```javascript
import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, useTheme } from "./style";

const Component = () => {
  useTheme();

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
    flexDirection: ["column", "row", "row-reverse"], // column in mobile, row in tablet, row-reverse in desktop
  },
  text: {
    fontSize: theme.fontSize.m,
    color: theme.text,
  },
}));
```

> **NOTE**: if you add `useTheme()` in the navigation screen (parent component), then you can avoid using it in child components\*

<br />

STEP 4: **anotherComponent.tsx**

To change the theme you can call build method and it will swap the theme

```javascript
import React from "react";
import { View, Button } from "react-native";
import { StyleSheet, light, dark } from "./style";

const Component = () => {
  const onLight = () => StyleSheet.build(light);
  const onDark = () => StyleSheet.build(dark);

  return (
    <View>
      <Button onPress={onLight} title="light theme" />
      <Button onPress={onDark} title="dark theme" />
    </View>
  );
};
```

<br />
<br />

## Constants

These are some device specific constants, that are dynamic and get updated when the platform or device dimensions change.

These can be used as a second parameter to the `StyleSheet.create` function:

```javascript
const styles = StyleSheet.create((theme, constants) => ({
  container: {
    height: constants.height,
    width: constants.width,
    marginTop: constants.statusBarHeight,
    backgroundColor: constants.platform.ios ? "yellow" : "red",
  },
}));
```

<br />

All the available value in constants are

| Name                                                           | Type    | Description                                                                 |
| -------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| height                                                         | number  | const {height} = Dimensions.get('window');                                  |
| width                                                          | number  | const {width} = Dimensions.get('window');                                   |
| screenHeight                                                   | number  | const {height} = Dimensions.get('screen');                                  |
| screenWidth                                                    | number  | const {width} = Dimensions.get('screen');                                   |
| statusBarHeight                                                | number  | StatusBar.currentHeight                                                     |
| navBarHeight                                                   | number  | Height of the bottom navigation bar (android only)                          |
| isNavBarVisible                                                | boolean | bottom navigation is visible or not (android only)                          |
| visibleHeight                                                  | number  | the visible height of screen excluding the bottom navigation and status bar |
| platform: {android, ios, windows, web, isPad, isTv, isIPhoneX} | boolean | Current active device platform                                              |

<br />
<br />

## API

- _StyleSheet.theme_

  Access the currently active theme
  <br />

- StyleSheet.constants

  Access the constants
  <br />

- StyleSheet.create

  Create a stylesheet object it can take a plain object or a function as parameter. If a plain object is passed that component is not re-rendered on theme change

  ```javascript
  // static
  const style1 = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // dynamic
  const style1 = StyleSheet.create((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  }));
  ```

<br />

- StyleSheet.build

  Build the stylesheet with a new theme, this will trigger re-render of all the components where StyleSheet.create is a function

  ```javascript
  StyleSheet.build(purpleTheme);
  ```

<br />

- StyleSheet.configure

  Configure the constants available throughout the app, you can change the global available height, width etc. This will also trigger re-render of all the components.

  ```javascript
  StyleSheet.configure({
    height: 400,
    width: 200,
    // any other constant value
  });
  ```

<br />

- StyleSheet.subscribe

  Subscribe to theme changes it accepts event name (`build`) and a callback function

  ```javascript
  StyleSheet.subscribe("build", () => {
    console.log("build happened");
  });
  ```

<br />

- StyleSheet.unsubscribe

  Unsubscribe to theme changes it accepts event name (`build`) and a callback function

<br />

- StyleSheet.theme.name

  It is a simple hack to get the currently active theme, you just need to have `name` key in theme configuration as stated above, and you can get the currently active theme inside or outside your components.

  ```javascript
  StyleSheet.theme.name;

  // or

  const [theme, constants] = useTheme();
  ```

<br />
<br />

## Demo

- https://mohit23x.github.io/reanimated-config-visualizer/
- https://sugar-style.netlify.app/

<br />
<br />

## Why?

[There](https://github.com/vitalets/react-native-extended-stylesheet) [are](https://github.com/wvteijlingen/react-native-themed-styles) [many](https://github.com/wvteijlingen/react-native-themed-styles) [awesome](https://github.com/Shopify/restyle) [solutions](https://github.com/callstack/react-theme-provider) [for](https://www.npmjs.com/package/simple-theme) [styling](https://github.com/nandorojo/dripsy) in React Native. Through this package i wanted to explore and experiment a way to achieve a development experience which is very similar to the existing react native pattern, with the ability to get dynamic theme value and can be used in functional and class based components.

<br />
<br />

## Acknowledgement

Special thanks to the author of the amazing open source library [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)

<br />
<br />

## Caveats

- May introduce performance issues (not tested)

```

```
