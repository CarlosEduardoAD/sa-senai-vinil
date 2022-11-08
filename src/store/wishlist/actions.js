import { ADD_WISHLIST, REMOVE_WISHLIST } from './types';

export const addToWishList = (articul) => {
    return {
        type: ADD_WISHLIST,
        payload: articul
    }
}

export const removeWishList = (articul) => {
    return {
        type: REMOVE_WISHLIST,
        payload: articul
    }
}
