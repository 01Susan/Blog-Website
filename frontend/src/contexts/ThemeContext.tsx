// ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkTheme(darkModeMediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);


    useEffect(() => {
        console.log("isDarkTheme useeffext running", isDarkTheme);

        if (isDarkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkTheme]);

    const toggleTheme = () => setIsDarkTheme(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}