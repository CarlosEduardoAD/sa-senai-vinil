import React, { useEffect } from 'react';
import { fetchCardsList } from '../../store/cards/actions'
import styles from './Cart.module.scss';
import CartList from '../../components/CartList/CartList';
import createModalButtons from '../../components/Modal/basicModal/createModalButtons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../store/cart/actions';
import { SHOW_REMOVE_FROM_CART_MODAL } from '../../store/modal/types';
import { setRemoveFromCartModalShow, setModalClose } from '../../store/modal/actions';
import { ModalRoot } from '../../components/Modal/ModalRoot';
import { setCurrentArticul } from '../../store/currentCardArticul/actions';
import Loader from '../../components/Loader/Loader';
import { CartForm } from '../../components/CartForm/CartForm';
import OrderTotals from '../../components/OrderTotals/OrderTotals'
import DogIcon from './DogIcon';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const navigate = useHistory()
    const isLoading = useSelector(({ cards }) => cards.isLoading);
    const cardsList = useSelector(({ cards }) => cards.cards);
    const currrentCardArticul = useSelector(({ currrentCardArticul }) => currrentCardArticul);
    const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart);
    const hasError = useSelector(({ hasError }) => hasError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardsList());
        let cookie = Cookies.get('acess_token')
        if(!cookie){
            navigate.push('/signin')
        }
    }, []);

    const deleteFromCartHandler = (articul) => {
        dispatch(removeFromCart(articul));
        closeModalHandler();
    }

    // Modals
    const onClickHandler = (articul) => {
        dispatch(setRemoveFromCartModalShow(SHOW_REMOVE_FROM_CART_MODAL, { articul }))
        dispatch(setCurrentArticul(articul));
    }

    const closeModalHandler = () => {
        dispatch(setModalClose(SHOW_REMOVE_FROM_CART_MODAL));
    }

    let content;

    if (hasError) {
        content = (<div>Sorry, error</div>)
    } else {
        const filteredCards = cardsList.filter(({ articul }) => {
            return cardsInCart.find(({ id }) => {
                return articul === id;
            })
        });
        content = (<>
            <CartList
                cards={filteredCards}
                onClickHandler={onClickHandler} />
            <div className={styles.totalBlock}>
                <OrderTotals />
                <div className={styles.dogIcon}><DogIcon /></div>
            </div>
            <CartForm />
        </>)
    }

    return (
        <div className={`${styles.cartSection} dark:bg-[#151617] pb-48 -mt-6`}>

            <div className={styles.container}>
                <h2 className={`${styles.cartTitle} font-inter`}>1. Products  - {cardsInCart.length}</h2>
                {isLoading ? <Loader /> : ''}
                {cardsInCart.length >= 1 ?
                    <div className={styles.cartInner}>
                        <ul className={styles.listTitles}>
                            <li className='dark:text-white'>Photo</li>
                            <li className='dark:text-white'>Description</li>
                            <li className='dark:text-white'>Price</li>
                            <li className='dark:text-white'>Quantity</li>
                            <li className='dark:text-white'>Total</li>
                        </ul>
                        {content}
                    </div> :
                    content = <p className={styles.noItemsTitle}>No items in cart</p>}
            </div>
            <ModalRoot modalType={SHOW_REMOVE_FROM_CART_MODAL}
                modalProps={{
                    actions: createModalButtons('Delete', 'Cancel', deleteFromCartHandler, closeModalHandler, currrentCardArticul.currentArticul),
                    closeModalHandler: () => { closeModalHandler() },
                    header: 'Do you want to delete this product ?',
                    text: 'This product will be deleted from the cart',
                    closeButton: true,
                }} />
        </div>
    );
};

export default Cart;
