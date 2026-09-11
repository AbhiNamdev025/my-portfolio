import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./themeContext";

const isValidTheme = (value) => value === "light" || value === "dark";

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("portfolio-theme-v2");
    if (saved === "light" || saved === "dark") return saved;
  }
  return "dark";
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const safeTheme = isValidTheme(theme) ? theme : "dark";
    document.documentElement.setAttribute("data-theme", safeTheme);
    localStorage.setItem("portfolio-theme-v2", safeTheme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
