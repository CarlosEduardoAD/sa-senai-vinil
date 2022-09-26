import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";
import FavouriteIcon from "./FavouriteIcon";
import Button from "../Button/Button";
const NOIMGSRC = "img/notfound.png";

const Card = ({
  title,
  price,
  articul,
  color,
  imgSrc,
  onClickHandler,
  changeFavouriteHandler,
  isFavourite,
}) => {
  const isFavouriteClass = isFavourite ? styles.isFavourite : "";
  return (
    <li
      className={`${styles.item}`}
    >
      <img
        className={styles.itemImg}
        src={imgSrc ? imgSrc : NOIMGSRC}
        alt="bed for pets"
      />
      <div className={styles.cardInfo}>
        <h2 className={`${styles.title} dark:text-white`}>{title}</h2>
        <p className={`${styles.cardColor}`}>
          <span className="font-semibold font-inter dark:text-white">
            Color: {color}
          </span>
          <span
            className={styles.productColor}
            style={{ backgroundColor: `${color}` }}
          ></span>
        </p>
        <p className="font-medium font-inter dark:text-white">
          Articul: {articul}
        </p>
        <p
          className={`${styles.cardPrice} text-gray-200 font-medium font-inter`}
        >
          {price} UAH
        </p>
        <button
          onClick={() => {
            changeFavouriteHandler(articul);
          }}
          className={styles.favouriteBox}
        >
          <FavouriteIcon
            classes={`${styles.favouriteIcon} ${isFavouriteClass}`}
          />
        </button>
        <Button
          text="Add to card"
          onClickHandler={() => onClickHandler(articul)}
        />
      </div>
    </li>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  articul: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  changeFavouriteHandler: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool,
};

Card.defaultProps = {
  imgSrc: "",
  isFavourite: false,
};
export default Card;
