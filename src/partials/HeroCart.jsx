import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Sidebar } from '../utils/Sidebar'
import img from '../images/encontro-com-radio.jpg';
import Popover from '../utils/Popover';


function HeroCart() {

  let response = {
    produto : 'Disco do abba',
    preco : 'R$ 100,00',
    descricao : 'Disco do abba de 100GB',
  }

  return (
    <>
<<<<<<< HEAD
    <div className="dark:bg-[#151617] max-w-6xl xs:max-w-ful min-h-screen">
      <button className="absolute dark:text-white text-black p-4">
        <Link to="/menu">Voltar</Link>
      </button>
      <section className="flex flex-row items-center justify-center flex-wrap md:gap-12 -space-y-[300px] xs:space-y-0 pt-20">
        <div className="pl-4 pr-4 md:pl-0 md:pr-0">
          <img
            className="rounded-lg max-w-full h-auto w-[500px] "
=======
    <div className="dark:bg-[#151617] max-w-full min-h-screen">
      <button className="absolute dark:text-white text-black p-4">
        <Link to="/menu">Voltar</Link>
      </button>
      <section className="flex flex-row items-center justify-center flex-wrap md:gap-12 -space-y-[300px] xs:space-y-0 pt-32">
        <div className="pr-4 pl-4">
          <img
            className="rounded-lg max-w-full h-auto w-[600px] "
>>>>>>> main
            src={img}
            alt=""
          />
        </div>
        <div className="flex flex-col flex-wrap xs:pr-0 pr-36 font-semibold font-inter pt-80 xs:pt-0">
          <div className="border-t w-[150px] pt-3 border-gray-400">
            <ul className="space-y-2 dark:text-white text-black">
              <li className="md:text-3xl text-2xl whitespace-nowrap">Produto: <span className="text-xl">{response.produto}</span></li>
              <li className="md:text-3xl text-2xl whitespace-nowrap">Preço: <span className="text-xl">{response.preco}</span></li>
              <li className="md:text-3xl text-2xl whitespace-wrap ">Descrição: <span className="text-sm"><Popover></Popover></span></li>
            </ul>
          </div>
        </div>
      </section>
      <div><Sidebar></Sidebar></div>
      <div className="flex flex-wrap items-center justify-center flex-col">
        <div className="grid grid-cols-2 grid-flow-row gap-4 pt-8 pb-8">
            <div><Button variant='contained' size='medium'>Ver mais</Button></div>
            <div><Button variant='contained' size='medium'>Continuar</Button></div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HeroCart;
