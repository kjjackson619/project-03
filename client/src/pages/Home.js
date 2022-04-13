import React from 'react';
import ShirtList from '../components/ShirtList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Home = () => {
    return (
        <div className='container'>
            <CategoryMenu />
            <ShirtList />
            <Cart />
        </div>
    );
};

export default Home;