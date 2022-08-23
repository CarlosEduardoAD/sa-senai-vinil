import AuthHeader from "../partials/AuthHeader";
import HeroMenu from "../partials/HeroMenu";
import Footer from "../partials/Footer"
import {Sidebar} from "../utils/Sidebar"

function Menu(){
    return(
        
        <section className="relative flex flex-col min-h-screen overflow-hidden">
            <div className="z-auto"><Sidebar></Sidebar></div>
            <AuthHeader firstButton='Pedidos' secondButton='Carrinho' />

        <section className="flex-grow">
            <HeroMenu></HeroMenu>
        </section>

        <section>
            <Footer></Footer>
        </section>

        </section>
    )
}

export default Menu;
