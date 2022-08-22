import { useState } from "react";
import Hamburger from 'hamburger-react'

export function Sidebar() {
  let [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(active = !active)
  }

  return (
    <>
    <div className="fixed bottom-0 ml-4 z-20">
      <button onClick={() => handleClick()} className='bg-black text-white rounded-full '><Hamburger size={20} toggled={active} toggle={setActive} /></button></div>
      {active ? <div className={`z-10 w-[300px] fixed h-full bg-neutral-300 dark:bg-black top-0 left-0  ease-in-out transition-all duration-400`}> <div className="flex items-start top-0 justify-start absolute"></div>
      <div className="flex items-center justify-center gap-8 flex-col pt-48 md:text-2xl text-xl dark:text-white text-black">
      <ul className="hover:font-semibold transition-all duration-100">Promoções</ul>
      <ul className="hover:font-semibold transition-all duration-100">Lista de Desejos</ul>
      <ul className="hover:font-semibold transition-all duration-100">Minhas Compras</ul>
      <ul className="hover:font-semibold transition-all duration-100"><a href="/">Logout</a></ul>
      </div>
      </div> : <div></div>}

    </>
  );
}

