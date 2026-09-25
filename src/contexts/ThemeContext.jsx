import { useState } from "react";
import ThemeContext from "./ThemeContextDefinition";

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;