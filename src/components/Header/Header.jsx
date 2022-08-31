import React, { useState, useEffect } from "react";
import styles from './Header.module.scss';
import { NavLink, Link } from "react-router-dom";

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
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link to="/"><img className={styles.logo} src="img/logo2.png" alt="pets store logo" /></Link>
                    <ul className={styles.navList}>
                        <li className={styles.item}><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
                        <li className={styles.item}><NavLink exact to="/Catalog" activeClassName={styles.active}>Produtos</NavLink></li>
                        <li className={styles.item}><NavLink exact to="/cart" activeClassName={styles.active}>Cart</NavLink></li>
                        <li className={styles.item}><NavLink exact to="/favourites" activeClassName={styles.active}>Favourites</NavLink></li>
                        <li className={styles.signin}><NavLink exact to="/SignIn" activeClassName={styles.active}>Sign In</NavLink></li>
                        <li className={styles.signup}><NavLink exact to="/SignUp" activeClassName={styles.active}>Sign Up</NavLink></li>                  
                    </ul>
               </nav>
            </div>
        </header>
    );
};


export default Header;