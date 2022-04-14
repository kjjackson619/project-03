import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import AppNav from './components/Nav';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Detail from './pages/Detail';
import { StoreProvider } from './utils/GlobalState';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <AppNav />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/success' element={<Success />} />
              <Route exact path='/orderHistory' element={<OrderHistory />} />
              <Route exact path='/shirts/:id' element={<Detail />} />
              <Route element={<NoMatch />} />

            </Routes>
          </StoreProvider>
        </div>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;
