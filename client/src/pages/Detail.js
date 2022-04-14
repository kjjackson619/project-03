import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART

} from '../utils/actions';
import { QUERY_SHIRTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { UPDATE_SHIRT } from '../utils/mutations';


function Detail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentShirt, setCurrentShirt] = useState({});

    const { loading, data } = useQuery(QUERY_SHIRTS);

    const { shirts, cart } = state;

    useEffect(() => {

        if (shirts.length) {
            setCurrentShirt(shirts.find((shirt) => shirt._id === id));
        }

        else if (data) {
            dispatch({
                type: UPDATE_SHIRT,
                shirts: data.shirts,
            });

            data.shirts.forEach((shirt) => {
                idbPromise('shirts', 'put', shirt);
            });
        }

        else if (!loading) {
            idbPromise('shirts', 'get').then((indexedShirts) => {
                dispatch({
                    type: UPDATE_SHIRT,
                    shirts: indexedShirts,
                });
            });
        }
    }, [shirts, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                shirt: { ...currentShirt, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentShirt, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentShirt._id,
        });

        idbPromise('cart', 'delete', { ...currentShirt });
    };

    return (
        <>
            {currentShirt && cart ? (
                <div className="container my-1">
                    <Link to="/">← Back to Shirts</Link>

                    <h2>{currentShirt.name}</h2>

                    <p>{currentShirt.description}</p>

                    <p>
                        <strong>Price:</strong>${currentShirt.price}{' '}
                        <button onClick={addToCart}>Add to Cart</button>
                        <button
                            disabled={!cart.find((p) => p._id === currentShirt._id)}
                            onClick={removeFromCart}
                        >
                            Remove from Cart
                        </button>
                    </p>

                    <img
                        src={`/images/${currentShirt.image}`}
                        alt={currentShirt.name}
                    />
                </div>
            ) : null}

            <Cart />
        </>
    );
}

export default Detail;