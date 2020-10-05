import { gql } from '@apollo/client';

const GET_ALL_COMPANY_RECALLS = gql`
  query GetAllCompanyRecalls(
    $companyName: NonemptyString!
    $limit: Count!
    $offset: Count!
    $sortBy: RecallSortBy!
    $sortDirection: String!
  ) {
    getAllCompanyRecalls(
      companyName: $companyName
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      count
      records {
        uuid
        classification
        city
        state
        recallingFirm
        productType
        productQuantity
        reasonForRecall
        recallInitiationDate
        recallNumber
        terminationDate
        voluntaryMandated
        status
      }
    }
  }
`;

export { GET_ALL_COMPANY_RECALLS };
