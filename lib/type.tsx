import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { constants } from './Constant';
import Sugar from './Sugar';

export type ConstantsType = typeof constants;

export type SugarViewStyle = {
  [P in keyof ViewStyle]: ViewStyle[P] | Array<ViewStyle[P]>;
};
export type SugarTextStyle = {
  [P in keyof TextStyle]: TextStyle[P] | Array<TextStyle[P]>;
};

export type SugarImageStyle = {
  [P in keyof ImageStyle]: ImageStyle[P] | Array<ImageStyle[P]>;
};

export type NamedStyles<T> = {
  [P in keyof T]: SugarViewStyle | SugarTextStyle | SugarImageStyle;
};

export type S = NamedStyles<any>;

export type Fn<T, P> = (theme: T, constants: ConstantsType) => P;

export type StyleSheetType<P> = {
  [K in keyof P]: {
    [J in keyof P[K]]: P[K][J] extends Array<any>
      ? J extends 'transform' | 'transformMatrix'
        ? P[K][J]
        : P[K][J][number]
      : P[K][J];
  };
};

export type buildEventType = 'build';

export type ThemeProp<T> = {
  theme: T;
  constants: ConstantsType;
};

export type ThemeProviderType<T> = React.ComponentType<{
  children: React.ReactNode;
  sugar?: Sugar<T>;
}>;
