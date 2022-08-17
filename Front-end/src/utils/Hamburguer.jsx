import Hamburger from 'hamburger-react'
import { useState } from 'react'
import ToggleButton from './ToggleButton';

export function Hamburguer() {

    const [isOpen, setOpen] = useState()

    const handleClick = () => {
        setOpen(isOpen = !isOpen)
    }

    return (
        <>
            <button onClick={() => handleClick} className="text-blue-500 ml-4"><Hamburger size={20} toggled={isOpen} toggle={setOpen} /></button>
            {isOpen ? <div className='absolute dark:bg-neutral-900 bg-white dark:text-white w-full right-0 h-36 mt-14 ease-in-out transition-all duration-200'><ul className='flex flex-col items-center justify-center gap-4 mt-4'>
                <li>aoba</li>
                <li>aoba</li>
                <li>aoba</li></ul>
            <div className='absolute -mt-8 ml-4'>
                <ToggleButton></ToggleButton></div></div> : <div className='absolute mt-24 text-blue-700'></div>}
        </>
    )
}