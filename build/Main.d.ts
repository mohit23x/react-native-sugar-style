/// <reference types="react" />
import Sugar from './Sugar';
export default class Main {
    init<T>(theme: T): {
        StyleSheet: Sugar<T>;
        ThemeContext: import("react").Context<T>;
        ThemeProvider: import("react").ComponentType<{
            children: import("react").ReactNode;
            sugar?: Sugar<T> | undefined;
        }>;
        useTheme: () => T;
        withTheme: <P extends import("./type").ThemeProp<T>>(WrappedComponent: import("react").ComponentType<P>) => () => JSX.Element;
    };
}
