import { useEffect, useState } from "react";

export default function UseDarkMode(){

    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() =>{ const root = window.document.documentElement;
    
    root.classList.remove(colorTheme);
    localStorage.setItem('theme', theme)
    root.classList.add(theme), [theme]}
    )
    return [colorTheme, setTheme];
} 