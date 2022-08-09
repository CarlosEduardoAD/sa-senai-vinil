import AuthHeader from "../partials/AuthHeader";
import HeroMenu from "../partials/HeroMenu";
import Footer from "../partials/Footer"

function Menu(){
    return(
        <section className="relative flex flex-col min-h-screen overflow-hidden">
            <AuthHeader firstButton='Pedidos' secondButton='Carrinho' />

        <section>
            <HeroMenu></HeroMenu>
        </section>

        <section>
            <Footer></Footer>
        </section>

        </section>
    )
}

export default Menu;
