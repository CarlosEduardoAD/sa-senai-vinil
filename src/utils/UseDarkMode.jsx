import { useEffect, useState } from "react";

export default function UseDarkMode(){

    let [theme, setTheme] = useState(localStorage.theme);
    let colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() =>{ const root = window.document.documentElement;
    
    root.classList.remove(colorTheme);
    localStorage.setItem('theme', theme)
    root.classList.add(theme), [theme]}
    )
    return [colorTheme, setTheme];
} 