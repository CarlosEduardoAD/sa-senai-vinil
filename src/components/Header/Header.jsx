import React, { useState, useEffect } from "react";
import styles from './Header.module.scss';
import { NavLink, Link } from "react-router-dom";
import {ToggleButton} from "../../utils/ToggleButton"

function Header(props) {
  const [top, setTop] = useState(true);
  useEffect(() => {
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
                    <Link to="/"><img className={styles.logo} src="img/logo2.png" alt="pets store logo" /></Link>
                    <ul className={styles.navList}>
                        <li className={`${styles.item} dark:text-white text-lg hidden sm:flex`}><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
                        <li className={`${styles.item} dark:text-white text-lg hidden sm:flex`}><NavLink exact to="/Catalog" activeClassName={styles.active}>Produtos</NavLink></li>
                        <li className={`${styles.item} dark:text-white text-lg hidden sm:flex`}><NavLink exact to="/cart" activeClassName={styles.active}>Cart</NavLink></li>
                        <li className={`${styles.item} dark:text-white text-lg hidden sm:flex`}><NavLink exact to="/favourites" activeClassName={styles.active}>Favourites</NavLink></li>
                        <div className="hidden lg:flex">
                        <li className={`${styles.btn}`}><NavLink exact to="/SignIn" activeClassName={`${styles.active} dark:text-white`}>Sign In</NavLink></li>
                        <li className={styles.btn}><NavLink exact to="/SignUp" activeClassName={`${styles.active} mt-12`}>Sign Up</NavLink></li>
                        </div>
                    </ul>
               </nav>
            </div>
        </header>
    );
};


export default Header;
