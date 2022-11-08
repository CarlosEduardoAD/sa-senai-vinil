export const wishListReducer = ((state = [], action) => {
    switch (action.type) {
        case 'ADD_WISHLIST':
            return [...state, action.payload];
        case 'REMOVE_WISHLIST':
            return state.filter((articulNum) => articulNum !== action.payload);
        default:
            return state;
    }
})
