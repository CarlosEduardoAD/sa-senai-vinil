import React, { useState, useEffect } from "react";
import Modal from "../utils/Modal.jsx";
import Goldies from "../images/Goldies.png";
import { NavLink } from "react-router-dom";
import styles from "./Header/Header.module.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {I18n} from '../utils/I18n'

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [cookie, setCookie] = useState();
  const [discs, setDiscs] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    let userToken = Cookies.get("acess_token");
    setCookie(userToken);
    await axios
      .get("http://localhost:3000/itens", { withCredentials: true })
      .then((res) => {
        let dados = res.data;
        console.log(res.data[0].nome);
        setDiscs(dados);
        console.log(typeof dados)
        console.log(dados);
      });
  }, []);

  return (
    <section className="relative dark:bg-[#151617]">
      <I18n/>
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        data-aos="zoom-in"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#1d4ed8" offset="0%" />
              <stop stopColor="#3b82f6" offset="77.402%" />
              <stop stopColor="#93c5fd" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="70%"
              y1="40%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#1d4ed8" offset="0%" />
              <stop stopColor="#3b82f6" offset="77.402%" />
              <stop stopColor="#93c5fd" offset="100%" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl sm:max-w-full mx-auto px-4 sm:px-6 ">
        {/* Hero content */}
        <div className="pt-32 pb-48 sm:pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              <span className="dark:text-white"> {t("oVelho")} </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-250 dark:from-blue-700 dark:to-indigo-900 animate-gradient-x">
                {t("novo")}
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8 dark:text-white"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                {t("Saudades")}
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              ></div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div
              className="relative flex justify-center mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="450"
            >
              <div className={`flex flex-col justify-center`}>
                <img
                  className="mx-auto"
                  src={Goldies}
                  width="768"
                  height="432"
                  alt="Hero"
                />
              </div>
              <button
                className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVideoModalOpen(true);
                }}
                aria-controls="modal"
              >
                <svg
                  className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">{t('AssistaAoVideo')} (2 min)</span>
              </button>
            </div>

            {/* Modal */}
            <Modal
              id="modal"
              ariaLabel="modal-headline"
              show={videoModalOpen}
              handleClose={() => setVideoModalOpen(false)}
            >
              <div className="relative pb-9/16">
                <iframe
                  className="absolute w-full h-full"
                  src="https://player.vimeo.com/video/769906157"
                  title="Video"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal>
          </div>
          {cookie ? (
            <div className="text-white flex items-center justify-center text-center">
              <div className="mt-12">
                {discs.map((disc) => {
                  return (
                    <div className="flex items-center justify-center">
                      <div className="border-b-4 rounded-xl border-black dark:border-blue-800 p-8 mt-14 text-black dark:text-white">
                        <ul>
                          <li className="lg:text-4xl font-bold">{disc.nome}</li>
                          <li className="lg:text-2xl font-semibold">
                            {t('Ano')}: {disc.ano}
                          </li>
                          <li className="lg:text-2xl font-semibold">
                            {t('Artista')}: {disc.cantor}
                          </li>
                          <li className="lg:text-lg">
                            {t('DataDeCompra')}:{" "}
                            {new Date(parseInt(disc.data)).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex flex-col items-center justify-center mt-24 max-x-md text-black dark:text-white font-inter sm:text-[2.4rem] text-2xl font-bold text-center ">
            {t('Catalogo')}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r text-5xl sm:text-7xl py-8 sm:py-12 from-blue-700 to-teal-250 dark:from-blue-700 dark:to-indigo-900 animate-gradient-x">
              &nbsp; {t('VariasOpcoes')} &nbsp;
            </span>
            <span className="relative mb-12">
              <ul className="flex flex-row gap-4">
                <li>
                  <img
                    className="rounded-lg"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="rounded-lg"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="rounded-lg"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </li>
              </ul>
            </span>{" "}
            {t('DeDiscos')}
          </div>
          <div className="flex flex-col items-center justify-center text-black dark:text-white text-2xl sm:text-[2.4rem] font-bold pt-24">
           {t('TodosOs')}{" "}
            <span className="sm:text-8xl text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-250 dark:from-emerald-700 dark:to-indigo-900 animate-gradient-x">
            {t('Generos')}
            </span>
            <span className="relative mb-12 mt-12">
              <ul className="flex sm:flex-row flex-col gap-4 text-center">
                <li
                  className="hover:opacity-70
                  hover:bg-black
                  tranisition-all
                  rounded-md ease-in-out
                  duration-300 w-[12rem]
                  h-[10rem] sm:w-[11rem] sm:h-[11rem]
                  md:w-[14rem] md:h-[14rem] no-repeat bg-cover "
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,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)`,
                  }}
                >
                  <p className="text-gray-200 hover:opacity-100 hover:scale-150 pt-4 text-lg transition-all duration-300 ease-in-out">
                    Techno
                  </p>
                </li>
                <li
                  className="hover:opacity-70 tranisition-all ease-in-out rounded-md duration-300 sm:w-[11rem] w-[12rem] h-[10rem] sm:h-[11rem] md:w-[14rem] md:h-[14rem] no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1561611882-33b20c4d1335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8RDdTbGZsajVTVzB8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)`,
                  }}
                >
                  <p className="text-gray-200 hover:opacity-100 hover:scale-150 pt-4 text-lg transition-all duration-300 ease-in-out">
                    Vaporwave{" "}
                  </p>
                </li>
                <li
                  className="hover:opacity-70 tranisition-all ease-in-out rounded-md duration-300 sm:w-[11rem] w-[12rem] h-[10rem] sm:h-[11rem] md:w-[14rem] md:h-[14rem] no-repeat bg-cover "
                  style={{
                    backgroundImage: `url(https://images.pexels.com/photos/4413724/pexels-photo-4413724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                  }}
                >
                  <p className="text-gray-200 hover:opacity-100 hover:scale-150 pt-4 text-lg transition-all duration-300 ease-in-out">
                    Rock'n Roll
                  </p>
                </li>
              </ul>
            </span>{" "}
          </div>
          <div className="flex flex-col items-center justify-center pt-24 text-center">
            <p className="text-2xl sm:text-4xl text-black dark:text-white font-bold">
              {t('Afinal')}
            </p>
            <p className="text-lg sm:text-2xl text-center text-black dark:text-white font-medium pt-24 px-12 md:px-48">
              {t('Independente')}
            </p>
            <p className="text-lg sm:text-2xl text-center text-black dark:text-white font-medium pt-16 px-12 md:px-48">
              {t('AMusica')}
            </p>
            {cookie ? (
              <div></div>
            ) : (
              <>
                {" "}
                <p className="sm:text-5xl text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-250 dark:from-rose-500 dark:to-blue-700 animate-gradient-xy font-bold mt-16">
                  {t('EntaoColocaOSom')}
                </p>
                <a>
                  {" "}
                  <button className={`${styles.btn} font-inter mt-12`}>
                    <NavLink
                      exact
                      to="/SignUp"
                      activeClassName={`${styles.active} dark:text-white`}
                    >
                      {t('Entrar')}
                    </NavLink>
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
