import Hamburger from "hamburger-react";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { NavLink } from "react-router-dom";
import styles from "../components/Header/Header.module.scss";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function Hamburguer() {
  const [cookie, setCookie] = useState();
  const navigate = useHistory();

  useEffect(() => {
    let userToken = Cookies.get("acess_token");
    setCookie(userToken);
  }, []);

  const logoutUser = async () => {
    Cookies.remove('acess_token')
    navigate.push('/')
  };

  const [isOpen, setOpen] = useState();

  const handleClick = () => {
    setOpen((isOpen = !isOpen));
  };

  return (
    <>
      <button onClick={() => handleClick} className="text-blue-500 ml-4">
        <Hamburger size={30} toggled={isOpen} toggle={setOpen} />
      </button>
      {isOpen ? (
        <div className="flex flex-col items-center justify-center fixed top-0 backdrop-blur dark:bg-indigo-500/75 bg-slate-300/75 dark:text-white w-56 rounded-sm right-0 h-full ease-in-out transition-all duration-200">
          <ul className="flex flex-col items-center justify-center gap-12 text-xl">
            <li className="active:text-blue-600">
              <NavLink exact to="/" activeClassName="">
                Home
              </NavLink>
            </li>
            <li className="active:text-blue-600">
              <NavLink exact to="/Catalog" activeClassName="">
                Produtos
              </NavLink>
            </li>
            <li className="active:text-blue-600">
              <NavLink exact to="/cart" activeClassName="">
                Carrinho
              </NavLink>
            </li>
            <li className="active:text-blue-600">
              <NavLink exact to="/favourites" activeClassName="">
                Favoritos
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-12 ml-4">
            <div>
              {cookie ? (
                <div></div>
              ) : (
                <li
                  className={`rounded-lg border-2 p-2 border-black dark:border-white mt-4`}
                >
                  <NavLink exact to="/signin" activeClassName={styles.active}>
                    Sign in
                  </NavLink>
                </li>
              )}
            </div>
            <div>
              {cookie ? (
                <div></div>
              ) : (
                <li
                  className={`rounded-lg border-2 p-2 border-black dark:border-white mt-4`}
                >
                  <NavLink exact to="/signup" activeClassName={styles.active}>
                    Sign up
                  </NavLink>
                </li>
              )}
            </div>
            <div></div>
          </div>
          {cookie ? (
              <li
                className={`rounded-lg border-2 p-2 border-black dark:border-white mt-4`}
              >
                <button onClick={() => logoutUser()}>
                <li exact to="/" activeClassName={styles.active}>
                  Sign Out
                </li>
                </button>
              </li>
          ) : (
            <div></div>
          )}

          <div className="grid grid-cols-2 grid-flow-row">
            <div className="absolute bottom-12 left-0 ml-[10px] sm:hidden ">
              <ToggleButton></ToggleButton>
            </div>
            <button
              onClick={() => handleClick}
              className="absolute text-blue-500 top-4 left-0"
            >
              <Hamburger size={30} toggled={isOpen} toggle={setOpen} />
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute mt-24 text-blue-700"></div>
      )}
    </>
  );
}
