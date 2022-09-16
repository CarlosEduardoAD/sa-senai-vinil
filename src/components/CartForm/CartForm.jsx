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
import { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import OrderTotals from "../OrderTotals/OrderTotals";

export const CartForm = (cards) => {
  const dispatch = useDispatch();
  const [values, setvalues] = useState(null);

  const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart);
  const [promocodes, setPromocodes] = useState(null);
  const [setError] = useState(false);
  const cardsList = useSelector(({ cards }) => cards.cards);
  const discount = useSelector(({ discount }) => discount);
  const subTotal = countSubtotal(cardsInCart, cardsList);
  const total = countTotalWithDiscount(subTotal, discount);

  const totalPrice = useRef()

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
    const finalPrice = totalPrice.current.value
    console.log('O preço final é:  ' + finalPrice)
    setvalues(values);
    dispatch(setCheckoutModalShow(SHOW_CHECKOUT_MODAL));
    let firstName = JSON.stringify(values.firstName);
    console.log(values.firstName)
    let lastName = JSON.stringify(values.lastName);
    let email = JSON.stringify(values.email);
    let age = JSON.stringify(values.age);
    let adress = JSON.stringify(values.address);
    const request = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      adress: adress,
    };
    axios.post("http://localhost:3000/purchase", request);
  };
  const closeModalHandler = () => {
    dispatch(setModalClose(SHOW_CHECKOUT_MODAL));
    dispatch(checkoutOrder());
    dispatch(removeDiscount());
  };
  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.cartTitle}>2. Shipping info</h1>
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
            <Form className={styles.form}>
              <FieldArray
                name="fields"
                render={() => (
                  <>
                    <div className={styles.formInner}>
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
                    <div className={styles.orderTotals}>
                      <div className={styles.totalsContainer}>
                        <h3 className={styles.totalsTitle}>Order totals</h3>
                        <p className={styles.totalsPrices}>
                          <span>Subtotal:</span>
                          <span>{subTotal} UAH</span>
                        </p>
                        <p className={styles.totalsPrices}>
                          <span>Discount:</span>
                          <span>{discount ? discount : "0"}%</span>
                        </p>
                        <p className={styles.totalsPrices}>
                          <span className={styles.orderTotalPrice} ref={totalPrice}>
                            Order total:
                          </span>
                          <span className={styles.totalPrice}>{total} UAH</span>
                        </p>
                      </div>
                    </div>
                    <button
                      className={`${btnStyles.btn} ${styles.submitBtn}`}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Checkout
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
          header: "Your order has been received",
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
