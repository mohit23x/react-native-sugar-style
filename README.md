# React Native Sugar Style

Theme based alternative for React Native StyleSheet. (🧪 Highly Experimental)

| BEFORE                                | AFTER                              |
| ------------------------------------- | ---------------------------------- |
| ![Before](assets/before.png 'Before') | ![After](assets/after.png 'After') |

### Install

```
yarn add react-native-sugar-style

npm i react-native-sugar-style
```

### Usage

**style.tsx** - define a configuration for you theme

```typescript
import { Sugar, constants } from 'react-native-sugar-style';

const theme = {
  ...constants,
  background: '#fbfbfb',
  text: '#2b2b2b',
};

export type Theme = typeof theme;
export const { StyleSheet } = new Sugar.init<Theme>(theme);

export default StyleSheet;
```

**component.tsx** - use StyleSheet as you do normally

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import StyleSheet from './style';

const Component = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello World</Text>
  </View>
);

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

### Demo

Scan and run with expo go app, See example folder for a complete setup.
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

[There](https://github.com/vitalets/react-native-extended-stylesheet) [are](https://github.com/wvteijlingen/react-native-themed-styles) [many](https://github.com/wvteijlingen/react-native-themed-styles) [awesome](https://github.com/Shopify/restyle) [solutions](https://github.com/callstack/react-theme-provider) [for](https://www.npmjs.com/package/simple-theme) React Native. Through this package i wanted to explore and experiment a way to achieve a solution which is very similar to the existing react native code pattern, with the ability to get dynamic theme value and can be used in functional and class based components.

### Acknowledgement

Special thanks to the Authors of the amazing open source libraries

[React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)

### Caveats

- May introduce performance issues (not tested)
- Re-rendering on theme change causes mount and un-mounting of parent
- re-renders when same theme is applied again
- Caching not implemented
- Dimension values are not dynamic
