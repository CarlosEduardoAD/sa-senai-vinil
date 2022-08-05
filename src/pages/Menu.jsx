import Header from "../partials/Header";
import HeroMenu from "../partials/HeroMenu";

function Menu(){
    return(
        <section className="relative flex flex-col min-h-screen overflow-hidden">
            <Header firstButton='Pedidos' secondButton='Carrinho'/>

        <section>
            <HeroMenu></HeroMenu>
        </section>
        </section>
    )
}

export default Menu;
