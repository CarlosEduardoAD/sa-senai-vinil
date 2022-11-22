import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { NavLink, Link } from "react-router-dom";
import { ToggleButton } from "../../utils/ToggleButton";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

function Header(props) {

  const {t} = useTranslation()

  const [cookie, setCookie] = useState(null);
  const [adminCookie, setAdminCookie] = useState(null);
  const [top, setTop] = useState(true);
  useEffect(() => {
    let userToken = Cookies.get("acess_token");
    setCookie(userToken);
    let adminToken = Cookies.get("admin_token")
    setAdminCookie(adminToken)
    console.log(adminCookie)
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <header className={`${styles.header} dark:bg-[#151617]`}>
      <div className={styles.container}>
        <div className="hidden sm:relative sm:flex sm:items-center sm:justify-end sm:top-7 ">
          <ToggleButton></ToggleButton>
        </div>
        <nav className={styles.nav}>
          <Link to="/">
            <img
              className={`${styles.logo} -mt-4`}
              src="img/logo2.png"
              alt="pets store logo"
            />
          </Link>
          {cookie ? (
            <>
              <li
                className={`${styles.item} dark:text-white text-lg hidden sm:flex font-inter`}
              >
                <NavLink exact to="/" activeClassName={styles.active}>
                  {t('inicio')}
                </NavLink>
              </li>
              <li
                className={`${styles.item} dark:text-white text-lg hidden sm:flex font-inter`}
              >
                <NavLink exact to="/Catalog" activeClassName={styles.active}>
                  {t('produtos')}
                </NavLink>
              </li>
              <li
                className={`${styles.item} dark:text-white text-lg hidden sm:flex font-inter`}
              >
                <NavLink exact to="/cart" activeClassName={styles.active}>
                {t('Carrinho')}
                </NavLink>
              </li>
              <li
                className={`${styles.item} dark:text-white text-lg hidden sm:flex font-inter`}
              >
                <NavLink exact to="/favourites" activeClassName={styles.active}>
                {t('Lista de Desejos')}
                </NavLink>
              </li>
            <li
                className={`${styles.item} dark:text-white text-lg hidden sm:flex font-inter`}
              >
                <NavLink exact to="/wishlist" activeClassName={styles.active}>
                {t('Favoritos')}
                </NavLink>
              </li>
              </>
          ) : (
            <div></div>
          )}
          {cookie ? <div></div> : <ul className={`${styles.navList}`}>
            <div className="hidden lg:flex pb-8">
              <li className={`${styles.btn} font-inter border-2 border-blue-700 text-center`}>
                <NavLink
                  exact
                  to="/SignIn"
                  activeClassName={`${styles.active} dark:text-white text-center`}
                >
                  {t('Login')}
                </NavLink>
              </li>
              <li className={`${styles.btn} font-inter border-2 border-blue-700 text-center`}>
                <NavLink
                  exact
                  to="/SignUp"
                  activeClassName={`${styles.active} text-center`}
                >
                  {t('Cadastro')}
                </NavLink>
              </li>
            </div>
          </ul>}
        </nav>
      </div>
    </header>

  );
}

export default Header;
