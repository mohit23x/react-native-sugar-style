"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeCreator = void 0;
const React = require("react");
const react_native_1 = require("react-native");
const Constant_1 = require("./Constant");
/* PROVIDER */
function createThemeProvider(sugar, ThemeContext, defaultTheme) {
    const ThemeProvider = ({ children, }) => {
        const [theme, setTheme] = React.useState(defaultTheme);
        const [constants, setConstants] = React.useState(Constant_1.constants);
        const subscribeToThemeChanges = () => {
            sugar.subscribe('build', () => {
                setTheme(sugar.theme);
                setConstants(sugar.constants);
            });
        };
        const onDimensionChange = ({ window: { height, width }, screen: { height: screenHeight, width: screenWidth }, }) => {
            const navBarHeight = Constant_1.calculateNavBarHeight({
                screenHeight,
                height,
            });
            const visibleHeight = Constant_1.calculateVisibleHeight({ height, navBarHeight });
            const newValues = {
                width,
                height,
                screenHeight,
                screenWidth,
                navBarHeight,
                visibleHeight,
            };
            sugar.configure(newValues);
        };
        const subscribeToDimensionsChange = () => {
            react_native_1.Dimensions.addEventListener('change', onDimensionChange);
        };
        React.useEffect(() => {
            subscribeToThemeChanges();
            subscribeToDimensionsChange();
            return () => {
                react_native_1.Dimensions.removeEventListener('change', onDimensionChange);
            };
        }, []);
        return (<ThemeContext.Provider value={{ theme, constants }}>{children}</ThemeContext.Provider>);
    };
    return ThemeProvider;
}
/* creator */
function themeCreator(sugar, defaultTheme) {
    const ThemeContext = React.createContext({ theme: defaultTheme, constants: Constant_1.constants });
    const ThemeProvider = createThemeProvider(sugar, ThemeContext, defaultTheme);
    function useTheme() {
        const { theme, constants } = React.useContext(ThemeContext);
        return [theme, constants];
    }
    function withTheme(WrappedComponent) {
        return function WithTheme() {
            return (<ThemeContext.Consumer>
          {({ theme, constants }) => {
                const props = { theme, constants };
                return <WrappedComponent {...props}/>;
            }}
        </ThemeContext.Consumer>);
        };
    }
    return { ThemeContext, ThemeProvider, useTheme, withTheme };
}
exports.themeCreator = themeCreator;
