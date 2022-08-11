import { useState } from "react";
import Hamburger from 'hamburger-react'

export function Sidebar() {
  let [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(active = !active)
  }

  return (
    <>
    <div className="fixed bottom-0 ml-4 p-2">
      <button onClick={() => handleClick()} className='bg-black text-white rounded-full '><Hamburger size={20} toggled={active} toggle={setActive} /></button></div>
      {active ? <div className={`z-10 w-[300px] fixed h-full bg-neutral-300 dark:bg-black top-0 left-0  ease-in-out transition-all duration-400`}> <div className="flex items-start top-0 justify-start absolute"><button className="text-white  ml-1 p-2 rounded-full" onClick={() => handleClick()}><Hamburger size={24} toggled={active} toggle={setActive} /></button></div></div> : <div></div>}

    </>
  );
}

