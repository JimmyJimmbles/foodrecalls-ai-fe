import React, { useState } from 'react';
// import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
// import { createBrowserHistory } from 'history';
import Routes from './Routes';

import client from './apollo-client';
import theme from './theme';
import { useEffect } from 'react';

// const browserHistory = createBrowserHistory();

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return isLoaded ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ApolloProvider>
  ) : null;
}

export default App;
