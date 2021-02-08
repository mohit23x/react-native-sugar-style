import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import Sugar from './Sugar';

export type Fn<T, S> = (theme: T) => S;

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type S = NamedStyles<any>;

export type buildEventType = 'build';

export type ThemeProp<T> = {
  theme: T;
};

export type ThemeProviderType<T> = React.ComponentType<{
  children: React.ReactNode;
  sugar?: Sugar<T>;
}>;
