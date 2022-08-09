import { useState } from 'react';
import {MagnifyingGlass} from "phosphor-react"
import Button from '@mui/material/Button';

function HeroHome() {
    let nome = "{Nome de usuário}";
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    }
    return (
        <section className="relative">
            <main
                className='flex flex-grow flex-col sm:max-w-full min-h-screen dark:bg-[#151617]'>
                <div className='flex flex-col items-center justify-center '>
                    <h1 className='text-center dark:text-white text-neutral-800 font-bold pt-24 text-4xl'>Seja bem vindo {" "}<span
                        className='opacity-40
                    text-black
                    dark:text-white 
                    hover:opacity-100
                    hover:text-amber-500
                    dark:hover:text-blue-700
                    bg-clip-text
                    text-transparent
                    transition-all
                    duration-900'
                    >{nome}</span></h1>
                    <p className='text-white pt-12 font-inter font-bold text-3xl text-black dark:text-white'>Últimas compras</p>
                    <div className='pt-12 flex items-center justify-center gap-2 flex-wrap'><input className='md:w-[350px] w-[200px] h-[30px] rounded-lg border-2 border-neutral-300 dark:border-neutral-800 focus:outline-0 dark:bg-neutral-700 dark:text-white pl-2 text-mg'></input>
                    <Button className='bg-blue-700 '><MagnifyingGlass size={24}/></Button></div>
                    <div className='flex flex-col md:grid md:grid-cols-3 md:grid-flow-row gap-12 pt-24 dark:text-white pr-4 pl-4'>
                        <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                        <div className='p-20 bg-blue-600 rounded-md max-w-sm x-auto md:p-22'>Aoba</div>
                        <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                    </div>
                </div>
                <div className='pt-16 flex items-center justify-center font-inter dark:text-white text-center'>
                    <p className='font-bold text-3xl'>Discos na moda</p>
                </div>
                <div className='flex flex-col flex-wrap items-center justify-center'>
                <div className='flex flex-col md:grid md:grid-cols-3 md:grid-flow-row gap-12 pt-24 dark:text-white pr-4 pl-4 pb-12'>
                    <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                    <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                    <div className='p-20 bg-blue-600 rounded-md max-w-sm mx-auto md:p-22'>Aoba</div>
                </div>
                </div>
            </main>
        </section>
    )
}

export default HeroHome;
