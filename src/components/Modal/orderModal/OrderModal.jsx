import { useSelector } from 'react-redux';
import styles from '../basicModal/Modal.module.scss';
import CheckoutIcon from './CheckoutIcon';
import orderModalStyles from './OrderModal.module.scss';
import CheckoutList from '../../CheckoutList/CheckoutList';
import { countSubtotal } from '../../../helpers/countSubtotal';
import { countTotalWithDiscount } from '../../../helpers/countTotalWithDiscount'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const OrderModal = ({ header, closeButton, formValues, closeModalHandler }) => {
    const modalIsShown = useSelector(({ modal }) => modal.checkoutModalIsOpen);
    const classHide = !modalIsShown ? styles.hide : '';
    const cardsList = useSelector(({ cards }) => cards.cards);
    const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart);
    const discount = useSelector(({ discount }) => discount);
    const { t } = useTranslation()

    const filteredCards = cardsList.filter(({ articul }) => {
        return cardsInCart.find(({ id }) => {
            return articul === id;
        })
    });

    const normalizeInputKeys = (key) => {
        if (key === 'firstName') return t('PrimeiroNome');
        if (key === 'lastName') return t('Sobrenome');
        if (key === 'age') return t('Idade');
        if (key === 'phone') return t('Telefone');
        if (key === 'address') return t('Endereco');
        if (key === 'gift') return t('Presente');
        if (key === 'nomeCartao') return t('NomeCartao');
        if (key === 'numeroCartao') return t('NumeroCartao');
        if (key === 'validade') return t('DataValidade');
        if (key === 'email') return;
        return key[0].toUpperCase() + key.slice(1);
    }

    const dataArr = [];
    if (formValues) {
        let i = 0;
        for (const [key, value] of Object.entries(formValues)) {
            dataArr.push(<li key={i++}>
                <span className={orderModalStyles.filedName}>{normalizeInputKeys(key)}</span>{key === "email" ? "" : ":"} {value}
            </li>)
        }
    };

    const subTotal = countSubtotal(cardsInCart, cardsList);
    const total = countTotalWithDiscount(subTotal, discount);

    return (
        <>
            <div className={`${styles.modalBox} ${modalIsShown ? '' : styles.hide} dark:bg-[#312a86] dark:text-white`}>
                <div className={`${styles.header} ${orderModalStyles.header} dark:bg-[#312a86]`}>
                    <button onClick={() => { closeModalHandler() }} className={closeButton ? `${styles.closeBtn} ${orderModalStyles.closeBtn}` : ''}></button>
                    <CheckoutIcon />
                    <h2 className={`${styles.headerTitle} ${orderModalStyles.headerTitle} font-semibold`}>{header}</h2>
                </div>
                <div className={orderModalStyles.orderInfoBlock}>
                    <p className={`${orderModalStyles.orderDetailsTitle} font-inter`}>{t('InformacoesDoCliente')}</p>

                    <ul className={orderModalStyles.customerDataList}>
                        {[...dataArr]}
                    </ul>
                    <p className={`${orderModalStyles.orderDetailsTitle} font-inter`}>{t('InformacoesDoProduto')}</p>
                    <ul className={orderModalStyles.productsTitles}>
                        <li>{t('produtos')}</li>
                        <li>{t('Quantidade')}</li>
                        <li>Subtotal</li>
                    </ul>
                    <div className={orderModalStyles.itemsList}>
                        <CheckoutList cards={filteredCards} />
                    </div>

                    <p className={`${orderModalStyles.discount} font-inter`}><span>{t('Desconto')} :</span><span>{discount ? discount : '0'}%</span></p>
                    <p className={`${orderModalStyles.total} font-inter`}><span>Total:</span><span>{total} UAH</span></p>
                </div>
                <button className={orderModalStyles.btn} onClick={() => { closeModalHandler() }}>Ok</button>
            </div>

            <div onClick={() => { closeModalHandler() }} className={`${styles.overlay} ${classHide}`}></div>
        </>
    )
}

OrderModal.propTypes = {
    header: PropTypes.string.isRequired,
    closeButton: PropTypes.bool,
    formValues: PropTypes.object,
    closeModalHandler: PropTypes.func.isRequired,
};

OrderModal.defaultProps = {
    formValues: {},
    closeButton: true
};
