import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import client from './apollo-client';
import theme from './theme';
import Routes from './Routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
