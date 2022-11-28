import { useEffect, useState } from "react";
import styles from "./OrderTotals.module.scss";
import { getPromocodesList } from "../../api/getPromocodesList";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { countSubtotal } from "../../helpers/countSubtotal";
import { countTotalWithDiscount } from "../../helpers/countTotalWithDiscount";
import { addDiscount } from "../../store/cart/actions";
import { useTranslation } from "react-i18next";

const OrderTotals = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart);
  const [promocodes, setPromocodes] = useState(null);
  const [setError] = useState(false);
  const cardsList = useSelector(({ cards }) => cards.cards);
  const discount = useSelector(({ discount }) => discount);

  useEffect(() => {
    let mounted = true;
    getPromocodesList()
      .then((data) => {
        if (mounted) {
          setPromocodes(data);
        }
      })
      .catch(() => {
        setError(true);
      });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subTotal = countSubtotal(cardsInCart, cardsList);
  const total = countTotalWithDiscount(subTotal, discount);
  sessionStorage.setItem("totalPrice", total);

  const handleSubmit = (values) => {
    const { promocode } = values;
    const availablePromocode = promocodes.find(
      ({ code }) => code === promocode.trim()
    );
    availablePromocode &&
      dispatch(addDiscount(availablePromocode.discountInPercentage));
  };

  return (
    <div className={styles.orderTotals}>
      <Formik initialValues={{ promocode: "" }} onSubmit={handleSubmit}>
        {() => (
          <Form className={styles.promocodeForm}>
            <p className={`${styles.promocodeFormTitle} font-inter dark:text-white`}>{t('ColocarCodigo')}</p>
            <div className={styles.promocodeFieldContainer}>
              <Field
                className={`${styles.promocodeField} dark:bg-transparent border-none dark:opacity-100 rounded-lg font-inter dark:text-white`}
                name="promocode"
                type="text"
                placeholder={t('CodigoPlaceholder')}
              />
              <button className={`${styles.promocodeBtn} -mt-1 mr-1 dark:text-white dark:bg-indigo-500`} type="submit">
                {(t('Aplicar'))}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div
        className={`${styles.totalsContainer} dark:bg-slate-300/10 shadow-none`}
      >
        <h3 className={`${styles.totalsTitle} font-inter`}>{t('PrecoFinal')}</h3>
        <p className={`${styles.totalsPrices} dark:text-white font-inter`}>
          <span>Subtotal:</span>
          <span>{subTotal} UAH</span>
        </p>
        <p className={`${styles.totalsPrices} dark:text-white font-inter`}>
          <span>{t('Desconto')}:</span>
          <span>{discount ? discount : "0"}%</span>
        </p>
        <p className={`${styles.totalsPrices} dark:text-white font-inter`}>
          <span className={styles.orderTotalPrice}>Total:</span>
          <span className={styles.totalPrice}>{total} UAH</span>
        </p>
      </div>
    </div>
  );
};

export default OrderTotals;
