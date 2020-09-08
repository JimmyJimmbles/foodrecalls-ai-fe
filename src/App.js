import React from 'react';
// import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
// import { createBrowserHistory } from 'history';
import Routes from './Routes';

import client from './apollo-client';
import theme from './theme';

// const browserHistory = createBrowserHistory();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
