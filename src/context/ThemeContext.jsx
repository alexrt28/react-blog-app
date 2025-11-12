import React, { createContext, useState, useEffect, useMemo } from 'react';

// 1. DEFINE YOUR COLOR OBJECTS
// We'll create a mapping from theme names to actual CSS color values.
const themes = {
  light: {
    background: '#FFFFFF',
    text: '#121212',
    primary: '#6200EE',
    cardBg: '#F5F5F5',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#BB86FC',
    cardBg: '#1E1E1E',
  },
};

// Create the context (no changes here)
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Your existing state logic is perfect and remains unchanged
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Your existing useEffect is also perfect and remains unchanged
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Your existing toggle function remains unchanged
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 2. ENHANCE THE CONTEXT VALUE
  // Instead of just providing the theme name, we now provide the name AND
  // the corresponding color object from our `themes` mapping.
  // `useMemo` ensures this value object is only recreated when the theme changes.
  const value = useMemo(
    () => ({
      themeName: theme,      // The original string: 'light' or 'dark'
      colors: themes[theme], // The object with actual CSS values
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};