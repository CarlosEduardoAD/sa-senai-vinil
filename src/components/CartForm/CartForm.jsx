import { useEffect, useState } from "react";
import { getPromocodesList } from "../../api/getPromocodesList";
import { useSelector } from "react-redux";
import { countSubtotal } from "../../helpers/countSubtotal";
import { countTotalWithDiscount } from "../../helpers/countTotalWithDiscount";
import { addDiscount } from "../../store/cart/actions";
import React from "react";
import { Formik, Form, FieldArray } from "formik";
import styles from "./CartForm.module.scss";
import btnStyles from "../Button/Button.module.scss";
import { BasicFormSchema } from "./BasicFormSchema";
import { formDataFields } from "./formDataFields";
import { FormikInputBlock } from "./formFields/FormikInputBlock";
import { NumberFormatInputBlock } from "./formFields/NumberFormatInputBlock";
import { useDispatch } from "react-redux";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { SHOW_CHECKOUT_MODAL } from "../../store/modal/types";
import { setCheckoutModalShow, setModalClose } from "../../store/modal/actions";
import { checkoutOrder } from "../../store/cart/actions";
import { removeDiscount } from "../../store/cart/actions";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import OrderTotals from "../OrderTotals/OrderTotals";

export const CartForm = (cards) => {
  const dispatch = useDispatch();
  const [values, setvalues] = useState(null);
  const { t } = useTranslation();
  const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart);
  const [promocodes, setPromocodes] = useState(null);
  const [setError] = useState(false);
  const cardsList = useSelector(({ cards }) => cards.cards);
  const discount = useSelector(({ discount }) => discount);
  const subTotal = countSubtotal(cardsInCart, cardsList);
  const total = countTotalWithDiscount(subTotal, discount);

  const filteredCards = cardsList.filter(({ articul }) => {
    return cardsInCart.find(({ id }) => {
      return articul === id;
    });
  });

  const filteredObject = { ...filteredCards };
  const filteredCart = { ...cardsInCart };

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

  const handleFormSubmit = (values) => {
    setvalues(values);
    dispatch(setCheckoutModalShow(SHOW_CHECKOUT_MODAL));
    let firstName = JSON.stringify(values.firstName);
    console.log(values.firstName);
    let lastName = JSON.stringify(values.lastName);
    let email = JSON.stringify(values.email);
    let age = JSON.stringify(values.age);
    let adress = JSON.stringify(values.address);
    let price = sessionStorage.getItem("totalPrice".toString());
    console.log(JSON.stringify(price));
    const request = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      adress: adress,
      price: price,
      discInfo: filteredCart,
    };
    axios.post("http://localhost:3000/purchase", request, {
      withCredentials: true,
    });
  };
  const closeModalHandler = () => {
    dispatch(setModalClose(SHOW_CHECKOUT_MODAL));
    dispatch(checkoutOrder());
    dispatch(removeDiscount());
  };
  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={`${styles.cartTitle} font-inter`}>2. {t('InformacoesTransporte')}</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            age: "",
            phone: "",
            address: "",
          }}
          validationSchema={BasicFormSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={`${styles.form} backdrop-blur-lg dark:shadow-xl`}>
              <FieldArray
                name="fields"
                render={() => (
                  <>
                    <div className={`${styles.formInner} p-4 dark:shadow-xl`}>
                      {formDataFields.map(
                        ({ id, name, label, placeholder, type }) => {
                          return name === "phone" ? (
                            <NumberFormatInputBlock
                              key={id}
                              name={name}
                              type={type}
                              label={label}
                            />
                          ) : (
                            <FormikInputBlock
                              key={id}
                              name={name}
                              type={type}
                              label={label}
                              placeholder={placeholder}
                            />
                          );
                        }
                      )}
                    </div>
                    <button
                      className={`${btnStyles.btn} ${styles.submitBtn}`}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {t('Finalizar')}
                    </button>
                  </>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
      <ModalRoot
        modalType={SHOW_CHECKOUT_MODAL}
        modalProps={{
          closeModalHandler: () => {
            closeModalHandler();
          },
          header: t('SeuPedido'),
          closeButton: true,
          cards: { cards },
          formValues: values ? values : null,
        }}
      />
    </>
  );
};

CartForm.propTypes = {
  cards: PropTypes.array,
};
CartForm.defaultProps = {
  cards: [],
};
