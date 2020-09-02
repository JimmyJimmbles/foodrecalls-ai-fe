import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';

import client from './apollo-client';
import theme from './theme';
import { LogIn, Dashboard } from 'views';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
