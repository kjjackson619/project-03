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
  uri: '/graphql'
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
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/success' component={Success} />
              <Route exact path='/orderHistory' component={OrderHistory} />
              <Route exact path='/shirts/:id' component={Detail} />
              <Route component={NoMatch} />

            </Routes>
          </StoreProvider>
        </div>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;
