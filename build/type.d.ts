/// <reference types="react" />
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import Sugar from './Sugar';
export declare type Fn<T, S> = (theme: T) => S;
export declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export declare type S = NamedStyles<any>;
export declare type buildEventType = 'build';
export declare type ThemeProp<T> = {
    theme: T;
};
export declare type ThemeProviderType<T> = React.ComponentType<{
    children: React.ReactNode;
    sugar?: Sugar<T>;
}>;
