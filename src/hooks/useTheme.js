import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

/** Access the current theme and toggle helpers. */
export function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
