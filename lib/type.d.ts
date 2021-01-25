import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export declare type Fn<T, S> = (theme: T) => S;
export declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export declare type S = NamedStyles<any>;
