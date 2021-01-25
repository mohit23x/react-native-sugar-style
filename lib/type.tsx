import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Fn<T, S> = (theme: T) => S;

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type S = NamedStyles<any>;
