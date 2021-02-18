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

export type Fn<T, P> = (theme: T, constants: ConstantsType) => P extends NamedStyles<P> ? NamedStyles<P> : P;

export type StyleSheetType<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
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
