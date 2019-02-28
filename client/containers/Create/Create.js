import React from 'react';

import { Segment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import query from '../../queries/fetchRecipes';
import RecipeCreateForm from '../../components/RecipeCreateForm';
import LinkButton from '../../components/Buttons/LinkButton';

class RecipeCreate extends React.Component {
  handleSubmit = (title, description) => {
    console.log(this.props);
    this.props
      .mutate({
        variables: {
          title,
          description,
          user: this.props.data.user.id
        },
        refetchQueries: [{ query }]
      })
      .then(() => this.props.history.push('/'));
  };

  render() {
    console.log(this.props.data);
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
  mutation AddRecipe($title: String, $description: String, $user: ID) {
    addRecipe(title: $title, description: $description, user: $user) {
      id
      title
      description
    }
  }
`;

export default graphql(mutation)(RecipeCreate);
