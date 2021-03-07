import * as React from 'react';
import Sugar from './Sugar';
import type { ConstantsType, ThemeProp, ThemeProviderType } from './type';
export declare function themeCreator<T>(sugar: Sugar<T>, defaultTheme: T): {
    ThemeContext: React.Context<{
        theme: T;
        constants: ConstantsType;
    }>;
    ThemeProvider: ThemeProviderType<T>;
    useTheme: () => ({
        readonly height: number;
        readonly width: number;
        readonly screenHeight: number;
        readonly screenWidth: number;
        readonly statusBarHeight: number;
        readonly navBarHeight: number;
        readonly isNavBarVisible: boolean;
        readonly visibleHeight: number;
        readonly platform: {
            readonly android: boolean;
            readonly ios: boolean;
            readonly web: boolean;
            readonly windows: boolean;
            readonly isPad: boolean;
            readonly isTv: boolean;
            readonly isIPhoneX: () => boolean;
        };
        readonly breakPoints: {
            mobile: number;
            tablet: number;
            desktop: number;
        };
    } | T)[];
    withTheme: <P extends ThemeProp<T>>(WrappedComponent: React.ComponentType<P>) => () => JSX.Element;
};
