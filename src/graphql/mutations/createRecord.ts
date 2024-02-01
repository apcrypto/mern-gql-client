import { gql } from 'graphql-tag';

export const CREATE_RECORD = gql`
  mutation CreateRecord($name: String!, $position: String, $level: String) {
    createRecord(name: $name, position: $position, level: $level) {
      id
    }
  }
`;
