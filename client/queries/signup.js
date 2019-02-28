import { gql } from 'apollo-boost';

export default gql`
  mutation Signup($name: String, $password: String) {
    signup(name: $name, password: $password) {
      name
    }
  }
`;
