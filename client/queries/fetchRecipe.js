import { gql } from 'apollo-boost';

export default gql`
  query fetchSong($id: ID!) {
    recipe(id: $id) {
      id
      title
      likes
      description
      directions {
        id
        content
      }
    }
  }
`;
