import { gql } from '@apollo/client';

const GET_AUTHENTICATED_USER = gql`
  {
    authenticatedUser {
      uuid
      firstName
      lastName
      role
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: NonemptyString!, $password: NonemptyString!) {
    loginUser(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export { GET_AUTHENTICATED_USER, LOGIN_USER };
