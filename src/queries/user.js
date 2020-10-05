import { gql } from '@apollo/client';

const GET_CURRENT_USER = gql`
  {
    me {
      uuid
      firstName
      lastName
      email
      role
      CompanyId
      jobTitle
      company {
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

export { GET_CURRENT_USER, LOGIN_USER };
