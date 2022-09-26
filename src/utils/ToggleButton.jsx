import { Sun, Moon } from "phosphor-react"
import UseDarkMode from "./UseDarkMode"

export function ToggleButton(){
    const [colorTheme, setTheme] = UseDarkMode()

    return(
        <div className="absolute mt-1 flex flex-grow justify-end flex-wrap items-center">
            <span onClick={() => setTheme(colorTheme)}>
            {colorTheme === "dark" ? <button><Moon size={32}></Moon></button> : <button><Sun color={'white'} size={32}></Sun ></button>}
            </span>
        </div>
    )
}

