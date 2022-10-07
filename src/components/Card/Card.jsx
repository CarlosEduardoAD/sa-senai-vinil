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
  genre,
  imgSrc,
  artist,
  onClickHandler,
  changeFavouriteHandler,
  isFavourite,
}) => {
  const isFavouriteClass = isFavourite ? styles.isFavourite : "";
  return (
    <div className='bg-gradient-to-b dark:from-[#050026] dark:to-emerald-900 relative -pt-2 pl-[0.8px] pr-[0.8px] rounded-lg'>
    <li
      className={`${styles.item}`}
    >
      <img
        className={styles.itemImg}
        src={imgSrc ? imgSrc : NOIMGSRC}
        alt="bed for pets"
      />
      <div className={`${styles.cardInfo} `}>
        <h2 className={`${styles.title} dark:text-white font-inter font-black`}>{title}</h2>
        <p className={`${styles.cardColor}`}>
          <span className="font-medium font-inter dark:text-white">
            Genre: {genre}
          </span>
          <span
            className={styles.productColor}
          ></span>
        </p>
        <span className="font-medium font-inter dark:text-white">
            Artist: {artist}
          </span>
        <p
          className={`${styles.cardPrice} text-slate-800 dark:text-white font-medium font-inter`}
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
    </div>
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
