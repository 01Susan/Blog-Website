// ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    console.log("First: isDarkTheme", isDarkTheme);


    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkTheme(darkModeMediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);


    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkTheme]);

    const toggleTheme = () => setIsDarkTheme(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}