# React Native Sugar Style

Theme based alternative for React Native StyleSheet. (🧪 Experimental)

| BEFORE                                | AFTER                              |
| ------------------------------------- | ---------------------------------- |
| ![Before](assets/before.png 'Before') | ![After](assets/after.png 'After') |

### Install

```
yarn add react-native-sugar-style
```

```
npm i react-native-sugar-style
```

### Usage

STEP 1: _style.tsx_

Define configurations for your theme see [this file](https://github.com/mohit23x/react-native-sugar-style/blob/main/example/style/index.tsx) for a more verbose example

```typescript
import { Sugar, constants } from 'react-native-sugar-style';

const theme = {
  ...constants,
  background: '#fbfbfb',
  text: '#2b2b2b',
};

export type Theme = typeof theme;
export const { StyleSheet, ThemeProvider, useTheme } = Sugar.init<Theme>(theme);

export default StyleSheet;
```

STEP 2: **App.tsx** (optional)

Wrap with ThemeProvider, if you are using a single theme then this step is not needed skip to STEP 3

```javascript
import React from 'react';
import {ThemeProvider} from './style';
import Navigation from './navigation';

const App = () => (
  <ThemeProvider>
   <Navigation>
  </ThemeProvider>
);
```

STEP 3: **component.tsx**

Use StyleSheet as you do normally in react native component

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, useTheme } from './style';

const Component = () => {
  useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    height: theme.constant.height,
    width: theme.constant.width,
    backgroundColor: theme.background,
  },
  text: {
    fontSize: theme.font.size,
    color: theme.text,
  },
}));
```

> **NOTE**: if you have a single theme then `useTheme()` hook can be avoided, also if you add `useTheme()` in you navigation screen parent component, then you can avoid using it in child components\*

STEP 4: **anotherComponent.tsx** (optional)

To change the theme you can call build method and it will swap the theme

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import { StyleSheet } from './style';

const Component = () => {
  const light = () => StyleSheet.build(lightTheme);
  const dark = () => StyleSheet.build(darkTheme);

  return (
    <View>
      <Button onPress={light} title="light" />
      <Button onPress={dark} title="dark" />
    </View>
  );
};
```

### Demo

Scan and run with expo go app, run the [example project](https://github.com/mohit23x/react-native-sugar-style/tree/main/example) for a more detailed example.
https://expo.io/@mohit23x/projects/react-native-sugar-style

![Scan QR with expo app](assets/qr.png 'Scan QR')

### Constants

Available as **theme.constant**

| Name                                   | Type    | React Native way                           |
| -------------------------------------- | ------- | ------------------------------------------ |
| height                                 | number  | const {height} = Dimensions.get('window'); |
| width                                  | number  | const {width} = Dimensions.get('window');  |
| screenHeight                           | number  | const {height} = Dimensions.get('screen'); |
| screenWidth                            | number  | const {width} = Dimensions.get('screen');  |
| statusBarHeight                        | number  | StatusBar.currentHeight                    |
| navBarHeight                           | number  | screenHeight - statusBarHeight - height    |
| isNavBarVisible                        | boolean | bottom navigation is visible or not        |
| visibleHeight                          | number  | height - navBarHeight                      |
| isIPhoneX                              | boolean |                                            |
| platform: {android, ios, windows, web} | boolean | Platform.OS === 'android'                  |

### Why this package?

[There](https://github.com/vitalets/react-native-extended-stylesheet) [are](https://github.com/wvteijlingen/react-native-themed-styles) [many](https://github.com/wvteijlingen/react-native-themed-styles) [awesome](https://github.com/Shopify/restyle) [solutions](https://github.com/callstack/react-theme-provider) [for](https://www.npmjs.com/package/simple-theme) [styling](https://github.com/nandorojo/dripsy) in React Native. Through this package i wanted to explore and experiment a way to achieve a development experience which is very similar to the existing react native pattern, with the ability to get dynamic theme value and can be used in functional and class based components.

### Acknowledgement

Special thanks to the Authors of the amazing open source libraries

[React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)

### Caveats

- May introduce performance issues (not tested)
- Dimension values are not dynamic (device height/width don't change based on orientation)
