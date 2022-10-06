import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home";
import Cards from "../pages/Catalog";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Favourites from "../pages/Favourites/Favourites";
import Error from "../components/Error/Error";
import ResetPassword from "../pages/ResetPassword";
import { Hamburguer } from "../utils/Hamburguer";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { ArrowArcLeft } from "phosphor-react";

const App = () => {
  const navigate = useHistory();
  const [cookie, setCookie] = useState();

  useEffect(() => {
    let userToken = Cookies.get("acess_token");
    setCookie(userToken);
  }, []);

  const logoutUser = async () => {
    Cookies.remove("acess_token");
    navigate.push("/");
  };

  return (
    <>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="z-10 flex fixed bottom-4 right-0 lg:hidden">
        <Hamburguer></Hamburguer>
      </div>
      {cookie ? (
         <button onClick={() => logoutUser()}>
        <div className="z-10 lg:flex lg:items-center lg:gap-4 lg:fixed lg:bottom-12 lg:right-12 lg:rounded-lg lg:dark:bg-indigo-900 bg-blue-700 lg:hover:scale-105 lg:p-4 text-white transition-all duration-200 ease-in-out hidden">
       <ArrowArcLeft></ArrowArcLeft>Logout
      </div>
      </button>
      ) : (
        <div></div>
      )}
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/catalog" component={Cards} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="/*" component={Error} />
        </Switch>
        <Footer />
      </main>
    </>
  );
};

export default App;
