import { gql } from 'apollo-boost';

export default gql`
  {
    recipes {
      id
      title
      likes
      description
      user {
        id
        name
      }
    }
  }
`;
