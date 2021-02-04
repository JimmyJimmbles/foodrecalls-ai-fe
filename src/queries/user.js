import { gql } from '@apollo/client';

const GET_CURRENT_USER = gql`
  {
    me {
      uuid
      firstName
      lastName
      email
      role
      jobTitle
      company {
        id
        uuid
        name
        recalls {
          count
          records {
            uuid
            recallingFirm
            recallInitiationDate
            reasonForRecall
            recallNumber
            productQuantity
            voluntaryMandated
            classification
            status
          }
        }
      }
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

const UPDATE_ME = gql`
  mutation UpdateUser($uuid: Uuid!, $updateUserInput: UpdateUserInput!) {
    updateUser(uuid: $uuid, input: $updateUserInput) {
      uuid
      firstName
      lastName
      email
      role
      jobTitle
    }
  }
`;

export { GET_CURRENT_USER, LOGIN_USER, UPDATE_ME };
