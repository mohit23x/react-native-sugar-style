"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeCreator = void 0;
const React = require("react");
/* PROVIDER */
function createThemeProvider(sugar, ThemeContext, defaultTheme) {
    const ThemeProvider = ({ children, }) => {
        const [theme, setTheme] = React.useState(defaultTheme);
        React.useEffect(() => {
            sugar.subscribe('build', () => {
                setTheme(sugar.theme);
            });
        }, []);
        return (<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>);
    };
    return ThemeProvider;
}
/* creator */
function themeCreator(sugar, defaultTheme) {
    const ThemeContext = React.createContext(defaultTheme);
    const ThemeProvider = createThemeProvider(sugar, ThemeContext, defaultTheme);
    function useTheme() {
        const theme = React.useContext(ThemeContext);
        return theme;
    }
    function withTheme(WrappedComponent) {
        return function WithTheme() {
            return (<ThemeContext.Consumer>
          {(theme) => {
                const props = { theme };
                return <WrappedComponent {...props}/>;
            }}
        </ThemeContext.Consumer>);
        };
    }
    return { ThemeContext, ThemeProvider, useTheme, withTheme };
}
exports.themeCreator = themeCreator;
