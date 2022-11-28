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
import WishList from "../pages/WishList/WishList";
import Error from "../components/Error/Error";
import ResetPassword from "../pages/ResetPassword";
import { Hamburguer } from "../utils/Hamburguer";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { ArrowArcLeft } from "phosphor-react";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import {AdminPanel} from '../pages/AdminPage'
import {SignInAdmin} from '../pages/SignInAdmin'

const App = () => {
  const {t} = useTranslation()
  const navigate = useHistory();
  const [cookie, setCookie] = useState();
  const [adminCookie, setAdminCookie] = useState();

  useEffect(() => {
    let userToken = Cookies.get("acess_token");
    setCookie(userToken);
    let adminToken = Cookies.get("admin_token")
    setAdminCookie(adminToken)
  }, []);

  return (
    <>
<CookieConsent
        location="bottom"
        buttonText="Ganhamo"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        aoba
      </CookieConsent>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="z-10 flex fixed bottom-4 right-0 lg:hidden">
        <Hamburguer></Hamburguer>
      </div>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/catalog" component={Cards} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/wishlist" component={WishList} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/admin-panel" component={AdminPanel} />
          <Route exact path="/login-admin" component={SignInAdmin} />
          <Route path="/*" component={Error} />
        </Switch>
        <Footer />
      </main>
    </>
  );
};

export default App;
