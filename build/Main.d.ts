/// <reference types="react" />
import Sugar from './Sugar';
export default function Main<T>(theme: T): {
    StyleSheet: Sugar<T>;
    ThemeContext: import("react").Context<{
        theme: T;
        constants: {
            readonly height: number;
            readonly width: number;
            readonly screenHeight: number;
            readonly screenWidth: number;
            readonly statusBarHeight: number;
            readonly navBarHeight: number;
            readonly isNavBarVisible: boolean;
            readonly visibleHeight: number;
            readonly isIPhoneX: () => boolean;
            readonly os: {
                readonly android: boolean;
                readonly ios: boolean;
                readonly web: boolean;
                readonly windows: boolean;
            };
            readonly breakPoints: {
                mobile: number;
                tablet: number;
                desktop: number;
            };
        };
    }>;
    ThemeProvider: import("react").ComponentType<{
        children: import("react").ReactNode;
        sugar?: Sugar<T> | undefined;
    }>;
    useTheme: () => ({
        readonly height: number;
        readonly width: number;
        readonly screenHeight: number;
        readonly screenWidth: number;
        readonly statusBarHeight: number;
        readonly navBarHeight: number;
        readonly isNavBarVisible: boolean;
        readonly visibleHeight: number;
        readonly isIPhoneX: () => boolean;
        readonly os: {
            readonly android: boolean;
            readonly ios: boolean;
            readonly web: boolean;
            readonly windows: boolean;
        };
        readonly breakPoints: {
            mobile: number;
            tablet: number;
            desktop: number;
        };
    } | T)[];
    withTheme: <P extends import("./type").ThemeProp<T>>(WrappedComponent: import("react").ComponentType<P>) => () => JSX.Element;
};
