import React, { useEffect } from "react";
import styles from "../App/App.module.scss";
import { fetchCardsList } from "../store/cards/actions";
import createModalButtons from "../components/Modal/basicModal/createModalButtons";
import CardsList from "../components/CardsList/CardsList";
import { ModalRoot } from "../components/Modal/ModalRoot";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ADD_TO_CART_MODAL } from "../store/modal/types";
import { addToFavourites, removeFavourites } from "../store/favourites/actions";
import { addToWishList, removeWishList } from "../store/wishlist/actions";
import { addToCart } from "../store/cart/actions";
import { setAddToCartModalShow, setModalClose } from "../store/modal/actions";
import { setCurrentArticul } from "../store/currentCardArticul/actions";
import Loader from "../components/Loader/Loader";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const navigate = useHistory();
  const { t } = useTranslation();
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const cardsList = useSelector(({ cards }) => cards.cards);
  const currrentCardArticul = useSelector(
    ({ currrentCardArticul }) => currrentCardArticul
  );
  const cardsInFavorites = useSelector(({ favourites }) => favourites);
  const cardsInWishList = useSelector(({ wishList }) => wishList)
  const hasError = useSelector(({ hasError }) => hasError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsList());
  }, []);

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

  // Favourites
  const changeFavouriteHandler = (articul) => {
    if (cardsInFavorites.includes(articul)) {
      dispatch(removeFavourites(articul));
    } else {
      dispatch(addToFavourites(articul));
    }
  };

  let favourites;
  if (isLoading) {
    favourites = <Loader />;
  } else if (hasError) {
    favourites = <div>Sorry, error</div>;
  } else {
    favourites = (
      <CardsList
        cards={cardsList}
        onClickHandler={onClickHandler}
        changeFavouriteHandler={changeFavouriteHandler}
        favouritesCardsArr={cardsInFavorites}
      />
    );
  }

  let wishList;
  if (isLoading) {
    wishList = <Loader />;
  } else if (hasError) {
    wishList = <div>Sorry, error</div>;
  } else {
    wishList = (
      <CardsList
        cards={cardsList}
        onClickHandler={onClickHandler}
        changeFavouriteHandler={changeFavouriteHandler}
        favouritesCardsArr={cardsInFavorites}
      />
    );
  }

  return (
    <div className={`${styles.app} dark:bg-[#151617] -mt-6`}>
      <div className={styles.container}>
        <div className={styles.appInner}>
          <ModalRoot
            modalType={SHOW_ADD_TO_CART_MODAL}
            modalProps={{
              actions: createModalButtons(
                "Ok",
                t('Cancelar'),
                addCardsToCartHandler,
                closeModalHandler,
                currrentCardArticul
              ),
              closeModalHandler: () => {
                closeModalHandler();
              },
              header: t("VoceQuerColocar"),
              text: t('EsteItemVaiFicar'),
              closeButton: true,
            }}
          />
          {favourites}
          {wishList}
        </div>
      </div>
    </div>
  );

};




export default Catalog;
