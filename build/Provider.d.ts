import * as React from 'react';
import Sugar from './Sugar';
import type { ThemeProp } from './type';
export declare function themeCreator<T>(sugar: Sugar<T>, defaultTheme: T): {
    ThemeContext: React.Context<T>;
    ThemeProvider: React.ComponentType<{
        children: React.ReactNode;
        sugar?: Sugar<T> | undefined;
    }>;
    useTheme: () => T;
    withTheme: <P extends ThemeProp<T>>(WrappedComponent: React.ComponentType<P>) => () => JSX.Element;
};
