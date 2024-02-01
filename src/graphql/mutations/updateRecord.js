import { gql } from 'graphql-tag';

export const UPDATE_RECORD = gql`
  mutation UpdateRecord(
    $updateRecordId: ID!
    $position: String
    $name: String
    $level: String
  ) {
    updateRecord(
      id: $updateRecordId
      position: $position
      name: $name
      level: $level
    ) {
      name
      position
      level
    }
  }
`;
