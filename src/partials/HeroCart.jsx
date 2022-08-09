import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function HeroCart() {
  return (
    <>
    <div className="dark:bg-[#151617]">
      <button className="absolute dark:text-white text-black p-4">
        <Link to="/menu">Voltar</Link>
      </button>
      <section className="flex flex-row items-center justify-center flex-wrap md:gap-12 -space-y-[300px] xs:space-y-0  min-h-screen">
        <div className="pr-4 pl-4">
          <img
            className="rounded-lg max-w-full h-auto"
            src="https://telemagia.files.wordpress.com/2009/06/faustao1.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col flex-wrap font-semibold font-inter">
          <div className="border-t w-[150px] pt-3 border-gray-400">
            <ul className="space-y-2 dark:text-white text-black">
              <li className="md:text-2xl text-xl">Produto:</li>
              <li className="md:text-2xl text-xl">Preço:</li>
              <li className="md:text-2xl text-xl">Descrição:</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row">
            <div><Button>sissu</Button></div>
            <div><Button>aoba</Button></div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroCart;
