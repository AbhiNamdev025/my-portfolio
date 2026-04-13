import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './themeContext';

const isValidTheme = (value) => value === 'light' || value === 'dark';

const getInitialTheme = () => 'dark';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const safeTheme = isValidTheme(theme) ? theme : 'dark';
    document.documentElement.setAttribute('data-theme', safeTheme);
    localStorage.setItem('portfolio-theme', safeTheme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
