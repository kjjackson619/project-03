import React, { createContext, useContext } from 'react';
import { useShirtReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useShirtReducer({
        shirts: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };