import { gql } from '@apollo/client';

const GET_ALL_COMPANIES = gql`
  query GetAllCompanies(
    $limit: Count!
    $offset: Count!
    $sortBy: CompanySortBy!
    $sortDirection: String!
  ) {
    getAllCompanies(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      count
      records {
        id
        uuid
        name
      }
    }
  }
`;

const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: ID!) {
    getCompanyById(id: $id) {
      id
      uuid
      name
      recalls {
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
  }
`;

export { GET_ALL_COMPANIES, GET_COMPANY_BY_ID };
