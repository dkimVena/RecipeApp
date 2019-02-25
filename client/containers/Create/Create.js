import React from 'react';

import { Segment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import query from '../../queries/fetchRecipes';
import RecipeCreateForm from '../../components/RecipeCreateForm';
import LinkButton from '../../components/Buttons/LinkButton';

class RecipeCreate extends React.Component {
  handleSubmit = (title, description) => {
    this.props
      .mutate({
        variables: {
          title,
          description
        },
        refetchQueries: [{ query }]
      })
      .then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <React.Fragment>
        <LinkButton link="/" size="huge" icon="arrow left" />
        <Segment>
          <RecipeCreateForm onSubmit={this.handleSubmit} />
        </Segment>
      </React.Fragment>
    );
  }
}

const mutation = gql`
  mutation AddRecipe($title: String, $description: String) {
    addRecipe(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export default graphql(mutation)(RecipeCreate);
