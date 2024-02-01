import { gql } from 'graphql-tag';

export const GET_RECORDS = gql`
  query GetRecords {
    records {
      id
      name
      position
      level
    }
  }
`;
