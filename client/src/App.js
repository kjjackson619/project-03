import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import SideNav from './components/SideNav';
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
        <div className="App">
          <Switch>
            <div>
              <Nav></Nav>
            </div>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route component={NoMatch} />

          </Switch>
          <div>
            <SideNav></SideNav>
          </div>
        </div>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;
