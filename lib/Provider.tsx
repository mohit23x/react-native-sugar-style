import * as React from 'react';
import Sugar from './Sugar';
import type { ThemeProp, ThemeProviderType } from './type';

/* PROVIDER */
function createThemeProvider<T>(
  sugar: Sugar<T>,
  ThemeContext: React.Context<T>,
  defaultTheme: T
): ThemeProviderType<T> {
  const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [theme, setTheme] = React.useState(defaultTheme);

    React.useEffect(() => {
      sugar.subscribe('build', () => {
        setTheme(sugar.theme);
      });
    }, []);

    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  };

  return ThemeProvider;
}

/* creator */
export function themeCreator<T>(sugar: Sugar<T>, defaultTheme: T) {
  const ThemeContext = React.createContext<T>(defaultTheme);
  const ThemeProvider = createThemeProvider(sugar, ThemeContext, defaultTheme);
  function useTheme() {
    const theme = React.useContext(ThemeContext);
    return theme;
  }
  function withTheme<P extends ThemeProp<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {
    return function WithTheme() {
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            const props = { theme } as P;
            return <WrappedComponent {...props} />;
          }}
        </ThemeContext.Consumer>
      );
    };
  }
  return { ThemeContext, ThemeProvider, useTheme, withTheme };
}
