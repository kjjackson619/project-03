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

    const { loading, data } = useQuery(QUERY_SHIRTS, {
<<<<<<< HEAD
        variables: {category: ""}
    });


    const shirtData = data?.shirts || []
    console.log(shirtData)

=======
>>>>>>> 1bdd7a76ad278380f941d1894ba95cf258df9f4d

        variables: { category: '' }
    });

    const shirtData = data?.shirts || []
    console.log(shirtData);

    console.log(currentCategory, 'currentCategory')
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
            return shirtData;
        }
<<<<<<< HEAD

=======
        console.log(currentCategory, 'currentCategory');
        console.log(shirtData, 'line 47')
>>>>>>> 1bdd7a76ad278380f941d1894ba95cf258df9f4d
        return shirtData.filter(
            (shirt) => shirt.category._id === currentCategory
        );
    }

    return (
        <div className="my-2">
            <h2>Our Shirts:</h2>
<<<<<<< HEAD
            {loading ? (
=======
            {!loading ? (
>>>>>>> 1bdd7a76ad278380f941d1894ba95cf258df9f4d
                <div className="flex-row">
                    {console.log(currentCategory, 'line 58')}
                    {shirtData.filter(
                        (shirt) => shirt.category._id === currentCategory
                    ).map((shirt) => (
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