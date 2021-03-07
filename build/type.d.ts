/// <reference types="react" />
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { constants } from './Constant';
import Sugar from './Sugar';
export declare type ConstantsType = typeof constants;
export declare type SugarViewStyle = {
    [P in keyof ViewStyle]: ViewStyle[P] | Array<ViewStyle[P]>;
};
export declare type SugarTextStyle = {
    [P in keyof TextStyle]: TextStyle[P] | Array<TextStyle[P]>;
};
export declare type SugarImageStyle = {
    [P in keyof ImageStyle]: ImageStyle[P] | Array<ImageStyle[P]>;
};
export declare type NamedStyles<T> = {
    [P in keyof T]: SugarViewStyle | SugarTextStyle | SugarImageStyle;
};
export declare type S = NamedStyles<any>;
export declare type Fn<T, P> = (theme: T, constants: ConstantsType) => P extends NamedStyles<P> ? NamedStyles<P> : P;
export declare type StyleSheetType<P> = {
    [K in keyof P]: {
        [J in keyof P[K]]: P[K][J] extends Array<any> ? J extends 'transform' | 'transformMatrix' ? P[K][J] : P[K][J][number] : P[K][J];
    };
};
export declare type BuildEventType = 'build';
export declare type ThemeProp<T> = {
    theme: T;
    constants: ConstantsType;
};
export declare type ThemeProviderType<T> = React.ComponentType<{
    children: React.ReactNode;
    sugar?: Sugar<T>;
}>;
