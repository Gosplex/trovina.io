import { createContext } from 'react';

/**
 * Theme context: { theme: 'light' | 'dark', toggleTheme, setTheme }.
 * Kept separate from the provider component so fast-refresh stays happy
 * (mirrors the AuthProvider / authContext split in this codebase).
 */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});
