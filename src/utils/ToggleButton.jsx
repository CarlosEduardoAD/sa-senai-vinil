import { Sun, Moon } from "phosphor-react"
import UseDarkMode from "./UseDarkMode"

function ToggleButton(){
    const [colorTheme, setTheme] = UseDarkMode()

    return(
        <div className="absolute mt-1">
            <span onClick={() => setTheme(colorTheme)}>
            {colorTheme === "dark" ? <button><Moon size={32}></Moon></button> : <button><Sun size={32}></Sun ></button>}
            </span>
        </div>
    )
}

export default ToggleButton