import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../../components/CardsList/CardsList';
import createModalButtons from '../../components/Modal/basicModal/createModalButtons';
import styles from './Favourites.module.scss';
import { fetchCardsList } from '../../store/cards/actions'
import { addToCart } from '../../store/cart/actions';
import { SHOW_ADD_TO_CART_MODAL } from '../../store/modal/types';
import { setAddToCartModalShow, setModalClose } from '../../store/modal/actions';
import { setCurrentArticul } from '../../store/currentCardArticul/actions';
import { ModalRoot } from '../../components/Modal/ModalRoot';
import { addToFavourites, removeFavourites } from '../../store/favourites/actions';
import Loader from '../../components/Loader/Loader';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Favourites = () => {
    const {t} = useTranslation()
    const navigate = useHistory()
    const isLoading = useSelector(({ cards }) => cards.isLoading);
    const cardsList = useSelector(({ cards }) => cards.cards);
    const currrentCardArticul = useSelector(({ currrentCardArticul }) => currrentCardArticul);
    const cardsInFavorites = useSelector(({ favourites }) => favourites);
    const hasError = useSelector(({ hasError }) => hasError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardsList());
        let cookie = Cookies.get('acess_token')
        if(!cookie){
            navigate.push('/signin')
        }
    }, [])

    // Cart
    const addCardsToCartHandler = (articul) => {
        dispatch(addToCart(articul));
        closeModalHandler();
    }

    // Modals
    const onClickHandler = (articul) => {
        dispatch(setAddToCartModalShow(SHOW_ADD_TO_CART_MODAL))
        dispatch(setCurrentArticul(articul));
    }

    const closeModalHandler = () => {
        dispatch(setModalClose(SHOW_ADD_TO_CART_MODAL))
    }

    // Favourites
    const changeFavouriteHandler = (articul) => {
        if (cardsInFavorites.includes(articul)) {
            dispatch(removeFavourites(articul));
        } else {
            dispatch(addToFavourites(articul));
        };
    };

    let content;
    if (isLoading) {
        content = (<Loader />)
    } else if (hasError) {
        content = (<div>Sorry, error</div>)
    }
    else if (cardsInFavorites.length < 1) {
        content = <p className={`${styles.noItemsTitle} font-inter`}>{t('SemItens')}</p>;
    } else {
        const filteredCards = cardsList.filter(({ articul }) => cardsInFavorites.includes(articul));
        content = (<CardsList
            cards={filteredCards}
            onClickHandler={onClickHandler}
            changeFavouriteHandler={changeFavouriteHandler}
            favouritesCardsArr={cardsInFavorites} />)
    }

    return (
        <div className={`${styles.favoritesSection} dark:bg-[#151617] min-h-screen -mt-6`}>
            <div className={`${styles.container} dark:bg-[#151617]`}>
                <h2 className={`${styles.favoritesTitle} font-inter`}>{t('ListaDeDesejos')} - {cardsInFavorites.length} items</h2>
                {content}
                <ModalRoot modalType={SHOW_ADD_TO_CART_MODAL}
                    modalProps={{
                        actions: createModalButtons('Ok', t('Cancelar'), addCardsToCartHandler, closeModalHandler, currrentCardArticul),
                        closeModalHandler: () => { closeModalHandler() },
                        header: t('VoceQuerColocar'),
                        text: t('EsteItemVaiFicar'),
                        closeButton: true,
                    }} />
            </div>
        </div>
    );
};


export default Favourites;
