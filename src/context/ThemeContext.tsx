import React, { createContext, useContext, useState, useCallback } from 'react';
import { Theme, themes } from '../types/theme';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const handleSetTheme = useCallback((theme: Theme) => {
    try {
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Error setting theme:', error);
      // Fallback to light theme if there's an error
      setCurrentTheme(themes[0]);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}