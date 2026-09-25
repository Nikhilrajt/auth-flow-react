import { useState } from "react";
import ThemeContext from "./ThemeContextDefinition";

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";

            localStorage.setItem("theme", newTheme);

            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;