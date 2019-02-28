import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';

import Layout from './components/Layout';
import Home from './containers/Home';
import Create from './containers/Create';
import Detail from './containers/Detail';
import Login from './containers/Login';
import Signup from './containers/Signup';
import requireAuth from './components/requireAuth';
import useCurrentUser from './components/useCurrentUser';

const link = createHttpLink({
  uri: '/api/graphql',
  credentials: 'same-origin'
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});

const client = new ApolloClient({
  link,
  cache
});
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={useCurrentUser(Home)} />
            <Route path="/recipes/new" component={requireAuth(Create)} />
            <Route path="/recipes/:id" component={useCurrentUser(Detail)} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Layout>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#app'));
