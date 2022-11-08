import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";
import FavouriteIcon from "./FavouriteIcon";
import Button from "../Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Heart, HeartBreak } from "phosphor-react";
import { useState } from "react";
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
  addToWishList,
  isFavourite,
}) => {
  const isFavouriteClass = isFavourite ? styles.isFavourite : "";
  const { t } = useTranslation();
  // const [email, setEmail] = useState('')
  const [heart, setFullHeart] = useState(false)

  return (
    <div className="bg-gradient-to-b dark:from-[#050026] dark:to-emerald-900 relative -pt-2 pl-[0.8px] pr-[0.8px] rounded-lg">
      <li className={`${styles.item}`}>
        <img
          className={styles.itemImg}
          src={imgSrc ? imgSrc : NOIMGSRC}
          alt="bed for pets"
        />
        <div className={`${styles.cardInfo} `}>
          <h2
            className={`${styles.title} dark:text-white font-inter font-black`}
          >
            {title}
          </h2>
          <p className={`${styles.cardColor}`}>
            <span className="font-medium font-inter dark:text-white">
              {t("Genre")}: {genre}
            </span>
            <span className={styles.productColor}></span>
          </p>
          <span className="font-medium font-inter dark:text-white">
            {t("Artista")}: {artist}
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
          <button
            onClick={async () => {
              const res = await axios.get('http://localhost:3000/user_email', {withCredentials : true})
              console.log(res.data)
              let userRequest = {
                email : res.data,
                discName : title,
                price : price,
                artist : artist
              };
              axios.post("http://localhost:8080/api/index.php", userRequest);
              setFullHeart(true)
            }}
            className={`${styles.wishlistBox} dark:text-white flex items-center justify-center`}
          >
            {heart ? <Heart size={25}/> : <HeartBreak size={25}/>}
          </button>
          <Button
            text={t("AdicionarAoCarrinho")}
            onClickHandler={() => {
              onClickHandler(articul);
            }}
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
