import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokens } from 'local-storage';
import { onError } from 'apollo-link-error';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication tokens from local storage if they exist.
  const token = getTokens();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink.concat(httpLink),
  ]),
});

export default client;
