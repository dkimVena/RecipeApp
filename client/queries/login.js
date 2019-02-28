import { gql } from 'apollo-boost';

export default gql`
  mutation Login($name: String, $password: String) {
    login(name: $name, password: $password) {
      name
    }
  }
`;
