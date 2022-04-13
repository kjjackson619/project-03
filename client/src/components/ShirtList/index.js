import React, { useEffect } from 'react';
import ShirtItem from '../ShirtItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SHIRT } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_SHIRTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function ShirtList() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_SHIRTS);

    console.log(data)

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_SHIRT,
                shirts: data.shirts,
            });
            data.shirts.forEach((shirt) => {
                idbPromise('shirts', 'put', shirt);
            });
        } else if (!loading) {
            idbPromise('shirts', 'get').then((shirts) => {
                dispatch({
                    type: UPDATE_SHIRT,
                    shirts: shirts,
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterShirts() {
        if (!currentCategory) {
            return data.shirts;
        }

        return data.shirts.filter(
            (shirt) => shirt.category._id === currentCategory
        );
    }

    return (
        <div className="my-2">
            <h2>Our Shirts:</h2>
            {state.shirts ? (
                <div className="flex-row">
                    {filterShirts().map((shirt) => (
                        <ShirtItem
                            key={shirt._id}
                            _id={shirt._id}
                            image={shirt.image}
                            name={shirt.name}
                            price={shirt.price}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any shirts yet!</h3>
            )}

        </div>
    );
}

export default ShirtList;