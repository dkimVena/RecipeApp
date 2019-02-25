import { gql } from 'apollo-boost';

export default gql`
  mutation {
    logout {
      id
      name
    }
  }
`;
