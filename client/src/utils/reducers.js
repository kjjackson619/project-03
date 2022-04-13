import { useReducer } from "react";
import {
    UPDATE_SHIRTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_SHIRTS:
            return {
                ...state,
                shirts: [...action.shirts],
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, { ...action.payload, qty: 1 }],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(shirt => {
                    if (action._id === shirt._id) {
                        shirt.purchaseQuantity = action.purchaseQuantity
                    }
                    return shirt
                })
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(shirt => {
                return shirt._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        default:
            return state;
    }
};

export function useShirtReducer(initialState) {
    return useReducer(reducer, initialState)
}