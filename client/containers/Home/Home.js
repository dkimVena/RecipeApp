import React from 'react';

import { Segment } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import RecipeList from '../../components/RecipeList';
import query from '../../queries/fetchRecipes';
import LinkButton from '../../components/Buttons/LinkButton';

class Home extends React.Component {
  handleDelete = id => {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch());
  };

  render() {
    const { loading, recipes } = this.props.data;
    return loading ? (
      <div />
    ) : (
      <React.Fragment>
        <Segment>
          <RecipeList
            recipes={recipes}
            onDelete={this.handleDelete}
            currentUser={this.props.currentUser}
          />
        </Segment>
        <Segment>
          <LinkButton link="/recipes/new" size="huge" icon="add" />
        </Segment>
      </React.Fragment>
    );
  }
}

const mutation = gql`
  mutation DeleteRecipe($id: ID) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(Home));
