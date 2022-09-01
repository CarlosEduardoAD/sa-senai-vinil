import HeroPromocoes from "../partials/HeroPromocoes";
import AuthHeader from "../partials/AuthHeader";
import Footer from "../partials/Footer"


function Promocoes() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <AuthHeader firstButton='Sign In' secondButton='Sign Up'/>

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroPromocoes />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
    )
}

export default Promocoes;