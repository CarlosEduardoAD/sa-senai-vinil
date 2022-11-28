/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsList from "../../components/CardsList/CardsList";
import createModalButtons from "../../components/Modal/basicModal/createModalButtons";
import styles from "./WishList.module.scss";
import { fetchCardsList } from "../../store/cards/actions";
import { addToCart } from "../../store/cart/actions";
import { SHOW_ADD_TO_CART_MODAL } from "../../store/modal/types";
import {
  setAddToCartModalShow,
  setModalClose,
} from "../../store/modal/actions";
import { setCurrentArticul } from "../../store/currentCardArticul/actions";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { addToWishList, removeWishList } from "../../store/wishlist/actions";
import Loader from "../../components/Loader/Loader";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
const php = require("phpjs");

const WishList = () => {
  const [wishes, setWishes] = useState([]);
  const { t } = useTranslation();
  const navigate = useHistory();
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const cardsList = useSelector(({ cards }) => cards.cards);
  const currrentCardArticul = useSelector(
    ({ currrentCardArticul }) => currrentCardArticul
  );
  const cardsInWishList = useSelector(({ wishList }) => wishList);
  const hasError = useSelector(({ hasError }) => hasError);
  const dispatch = useDispatch();

  useEffect(async () => {
    // dispatch(fetchCardsList());
    let cookie = Cookies.get("acess_token");
    if (!cookie) {
      navigate.push("/signin");
    }
    let adminCookie = Cookies.get("admin_token");
    if (adminCookie) {
      navigate.push("/admin-panel");
    }

    const uniqueArray = []

    const res = await axios.get("http://localhost:3000/user_email", {
      withCredentials: true,
    });
    const userEmail = res.data;
    console.log("Este é o email: " + userEmail);
    await axios
      .get("http://localhost:8080/api/index.php", {
        params: { email: userEmail },
      })
      .then((res) => {
        console.log(res.data);
        console.log(typeof res.data);
        setWishes(res.data);
      });
  }, []);

  const removeFromWishlist = async (userId) => {
    const res = await axios.get("http://localhost:3000/user_email", {
      withCredentials: true,
    });
    const userEmail = res.data;
    console.log("Este é o email: " + userEmail);
    await axios
      .delete("http://localhost:8080/api/index.php", {
        params: { id: userId, email : userEmail},
      })
      .then((res) => {
        navigate.go(0)
      });
  };

  // Cart
  const addCardsToCartHandler = (articul) => {
    dispatch(addToCart(articul));
    closeModalHandler();
  };

  // Modals
  const onClickHandler = (articul) => {
    dispatch(setAddToCartModalShow(SHOW_ADD_TO_CART_MODAL));
    dispatch(setCurrentArticul(articul));
  };

  const closeModalHandler = () => {
    dispatch(setModalClose(SHOW_ADD_TO_CART_MODAL));
  };

  // WishList
  const changeWishListHandler = (articul) => {
    if (cardsInWishList.includes(articul)) {
      dispatch(removeWishList(articul));
    } else {
      dispatch(addToWishList(articul));
    }
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = <div>Sorry, error</div>;
  } else if (cardsInWishList.length < 1) {
    content = (
      <p className={`${styles.noItemsTitle} font-inter`}>{t("SemDesejos")}</p>
    );
  } else {
    const filteredCards = cardsList.filter(({ articul }) =>
      cardsInWishList.includes(articul)
    );
    content = (
      <CardsList
        cards={filteredCards}
        onClickHandler={onClickHandler}
        changeWishListHandler={changeWishListHandler}
        wishListCardsArr={cardsInWishList}
      />
    );
  }

  return (
    <div
      className={`${styles.wishsSection} dark:bg-[#151617] min-h-screen -mt-6`}
    >
      <div className={`${styles.container} dark:bg-[#151617]`}>
        <h2 className={`${styles.wishsTitle} font-inter`}>{t("Favoritos")}</h2>
        <div className="flex items-center justify-center">
          <h1 className="dark:text-white text-4xl font-bold">{t("HallDaFama")}</h1>
        </div>
        <div className={`${styles.list}`}>
          {wishes.map((value, key) => {
            return (
                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-violet-300 to-indigo-300 dark:from-[#050026]/50 dark:to-[#180a55] bg-opacity-20 dark:text-white text-black w-full rounded-lg font-inter text-center py-4">
                <div className="text-lg font-normal mt-1" key={key}>
                  <span className="font-bold">{t("Nome")}</span> :{" "}
                  {value.disc_name}
                </div>
                <div className="text-lg font-normal mt-1">
                  <span className="font-bold">{t("Preco")}</span> :{" "}
                  {value.price} UAH
                </div>
                <div className="text-lg font-normal mt-1 mb-4">
                  <span className="font-bold">{t("Artista")}</span> :{" "}
                  {value.artist}
                </div>
                <button
                  className="font-semibold text-xl"
                  onClick={() => {
                    removeFromWishlist(value.disc_name)}
                  }
                >
                  {t("Remover")}{" "}
                </button>
              </div>
            );
          })}
        </div>
        <ModalRoot
          modalType={SHOW_ADD_TO_CART_MODAL}
          modalProps={{
            actions: createModalButtons(
              "Ok",
              t("Cancelar"),
              addCardsToCartHandler,
              closeModalHandler,
              currrentCardArticul
            ),
            closeModalHandler: () => {
              closeModalHandler();
            },
            header: t("VoceQuerColocar"),
            text: t("EsteItemVaiFicar"),
            closeButton: true,
          }}
        />
      </div>
    </div>
  );
};

export default WishList;
