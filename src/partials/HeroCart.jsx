import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function HeroCart() {
  return (
    <>
    <div className="dark:bg-[#151617] max-w-6xl">
      <button className="absolute dark:text-white text-black p-4">
        <Link to="/menu">Voltar</Link>
      </button>
      <section className="flex flex-row items-center justify-center flex-wrap md:gap-12 -space-y-[300px] xs:space-y-0 pt-32">
        <div className="pr-4 pl-4">
          <img
            className="rounded-lg max-w-full h-auto"
            src="https://telemagia.files.wordpress.com/2009/06/faustao1.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col flex-wrap font-semibold font-inter pt-64 xs:pt-0">
          <div className="border-t w-[150px] pt-3 border-gray-400">
            <ul className="space-y-2 dark:text-white text-black">
              <li className="md:text-2xl text-2xl whitespace-nowrap">Produto: amogus</li>
              <li className="md:text-2xl text-2xl">Preço: 29,90</li>
              <li className="md:text-2xl text-2xl whitespace-wrap">Descrição: <span className="text-sm">aoba aoba aoba aoba</span></li>
            </ul>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-center flex-col">
        <div className="grid grid-cols-2 grid-flow-row gap-4 pt-8 ">
            <div><Button>Ver mais</Button></div>
            <div><Button>Continuar</Button></div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HeroCart;
