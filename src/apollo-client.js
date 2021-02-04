import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokens } from 'local-storage';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
  credentials: 'same-origin',
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const token = getTokens();

  console.log('token', token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink.concat(httpLink), uploadLink]),
  cache: new InMemoryCache(),
  // link: ApolloLink.from([
  //   authLink.concat(httpLink),
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors)
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //         )
  //       );

  //     if (networkError) console.log(`[Network error]: ${networkError}`);
  //   }),
  // ]),
});

export default client;
