import { Link } from "react-router-dom";

function HeroCart(){
    return(
        <>
        <button className="absolute dark:text-white text-black p-4"><Link to='/menu'>Voltar</Link></button>
        <section className="flex flex-row items-center justify-center flex-wrap md:gap-12 -space-y-[300px] xs:space-y-0 dark:bg-[#151617] min-h-screen">
            <div className="pr-4 pl-4"><img className="rounded-lg max-w-full h-auto" src="https://telemagia.files.wordpress.com/2009/06/faustao1.jpg" alt="" /></div>
            <div className="flex flex-col font-semibold font-inter">
                <ul className="space-y-4 dark:text-white text-black">
                    <li className="md:text-xl text-2xl">Produto:</li>
                    <li className="md:text-xl text-2xl">Preço:</li>
                    <li className="md:text-xl text-2xl">Descrição:</li>
                </ul>
            </div>
        </section>
        </>
    )
}

export default HeroCart;