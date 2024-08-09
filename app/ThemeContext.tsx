import React, { createContext, useState, useContext, ReactNode } from "react";


// Define the shape of the context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create a context with default undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
