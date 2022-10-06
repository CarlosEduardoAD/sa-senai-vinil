import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import styles from './CardsList.module.scss';


const CardsList = ({ cards, onClickHandler, changeFavouriteHandler, favouritesCardsArr }) => {
    const cardsComponents = cards.map(({ title, price, articul, genre, imgSrc, artist }) => {
        return (
            <Card key={articul}
                title={title}
                price={price}
                articul={articul}
                genre={genre}
                imgSrc={imgSrc}
                artist={artist}
                isFavourite={favouritesCardsArr.includes(articul)}
                onClickHandler={onClickHandler}
                changeFavouriteHandler={changeFavouriteHandler} />
        )
    })

    return (
        <ul className={styles.list}>
            {cardsComponents}
        </ul>
    );
};

CardsList.propTypes = {
    cards: PropTypes.array.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    changeFavouriteHandler: PropTypes.func.isRequired,
    favouritesCardsArr: PropTypes.array
};

CardsList.defaultProps = {
    cards: [],
    favouritesCardsArr: []
};

export default CardsList;
