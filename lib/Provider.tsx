import * as React from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import {
  calculateNavBarHeight,
  calculateVisibleHeight,
  constants as defaultConstants,
} from './Constant';
import Sugar from './Sugar';
import type { ThemeProp, ThemeProviderType, ConstantsType } from './type';

/* PROVIDER */
function createThemeProvider<T>(
  sugar: Sugar<T>,
  ThemeContext: React.Context<{ theme: T; constants: ConstantsType }>,
  defaultTheme: T
): ThemeProviderType<T> {
  const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [theme, setTheme] = React.useState(defaultTheme);
    const [constants, setConstants] = React.useState(defaultConstants);

    const subscribeToThemeChanges = () => {
      sugar.subscribe('build', () => {
        setTheme(sugar.theme);
        setConstants(sugar.constants);
      });
    };

    const onDimensionChange = ({
      window: { height, width },
      screen: { height: screenHeight, width: screenWidth },
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      const navBarHeight = calculateNavBarHeight({
        screenHeight,
        height,
      });
      const visibleHeight = calculateVisibleHeight({ height, navBarHeight });

      const newValues: Partial<ConstantsType> = {
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
      Dimensions.addEventListener('change', onDimensionChange);
    };


    React.useEffect(() => {
      subscribeToThemeChanges();
      subscribeToDimensionsChange();
      return () => {
        Dimensions.removeEventListener('change', onDimensionChange);
      };
    }, []);

    return (
      <ThemeContext.Provider value={{ theme, constants }}>{children}</ThemeContext.Provider>
    );
  };

  return ThemeProvider;
}

/* creator */
export function themeCreator<T>(sugar: Sugar<T>, defaultTheme: T) {
  const ThemeContext = React.createContext<{
    theme: T;
    constants: ConstantsType;
  }>({ theme: defaultTheme, constants: defaultConstants });

  const ThemeProvider = createThemeProvider(sugar, ThemeContext, defaultTheme);
  function useTheme() {
    const {theme, constants} = React.useContext(ThemeContext);
    return [theme, constants];
  }
  function withTheme<P extends ThemeProp<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {
    return function WithTheme() {
      return (
        <ThemeContext.Consumer>
          {({theme, constants}) => {
              const props = { theme, constants } as P;
              return <WrappedComponent {...props} />;
          }}
        </ThemeContext.Consumer>
      );
    };
  }
  return { ThemeContext, ThemeProvider, useTheme, withTheme };
}
