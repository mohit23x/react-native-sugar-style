<h1 align="left">

    React Native Sugar Style

</h1>
https://www.npmjs.com/package/react-native-sugar-style (🧪 Experimental)

- Theme based alternative for React Native StyleSheet

- Support responsive values as array

- works on android/ios/web (expo/react-native)

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

STEP 1: **style.tsx**

Define configurations for your theme, for more verbose example see [this file](https://github.com/mohit23x/react-native-sugar-style/blob/main/example/style/index.tsx).

```typescript
import Sugar from 'react-native-sugar-style';

const dark = {
  background: '#2b2b2b',
  text: '#ffffff',
};

const light = {
  background: '#fbfbfb',
  text: '#000000',
};

export const { StyleSheet, ThemeProvider, useTheme } = Sugar(light);

export default StyleSheet;
```

<br />

STEP 2: **App.tsx**

Wrap with ThemeProvider

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

<br />

STEP 3: **component.tsx**

Use StyleSheet as you do normally do in components

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

const styles = StyleSheet.create((theme, constants) => ({
  container: {
    height: constants.height,
    width: constants.width,
    backgroundColor: theme.background,
    flexDirection: ['column', 'row'],
  },
  text: {
    fontSize: theme.size.m,
    color: theme.text,
  },
}));
```

> **NOTE**: if you add `useTheme()` in the navigation screen (parent component), then you can avoid using it in child components\*

<br />

STEP 4: **anotherComponent.tsx**

To change the theme you can call build method and it will swap the theme

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import { StyleSheet, light, dark } from './style';

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

### Demo

Scan and run with expo go app, run the [example project](https://github.com/mohit23x/react-native-sugar-style/tree/main/example) for a more detailed example.
https://expo.io/@mohit23x/projects/react-native-sugar-style or try the [react native web version](https://sugar-style.netlify.app/)

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
