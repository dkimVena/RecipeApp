import React from 'react';

import { graphql, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Header, Icon, Divider, Segment } from 'semantic-ui-react';
import fetchRecipe from '../../queries/fetchRecipe';
import DirectionCreateForm from '../../components/DirectionCreateForm';
import DirectionList from '../../components/DirectionList';
import LinkButton from '../../components/Buttons/LinkButton';
import fetchCurrentUser from '../../queries/currentUser';

const ADD_DIRECTION = gql`
  mutation AddDirectionToRecipe($content: String, $recipeId: ID) {
    addDirectionToRecipe(content: $content, recipeId: $recipeId) {
      id
      directions {
        id
        content
      }
    }
  }
`;

const LIKE_RECIPE = gql`
  mutation LikeRecipe($id: ID) {
    likeRecipe(id: $id) {
      id
      likes
    }
  }
`;

const DELETE_DIRECTION = gql`
  mutation DeleteDirection($id: ID) {
    deleteDirection(id: $id) {
      id
    }
  }
`;

class Detail extends React.Component {
  checkUser = () =>
    this.props.currentUser &&
    this.props.currentUser.name === this.props.data.recipe.user.name;

  render() {
    const { loading, recipe, user } = this.props.data;

    return loading ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        <LinkButton link="/" size="huge" icon="arrow left" />
        <Segment clearing>
          <Header as="h3" floated="right">
            <Mutation mutation={LIKE_RECIPE}>
              {likeRecipe => (
                <React.Fragment>
                  <Icon
                    link
                    size="large"
                    name="thumbs up outline"
                    onClick={() => {
                      likeRecipe({
                        variables: { id: recipe.id },
                        optimisticResponse: {
                          __typename: 'Mutation',
                          likeRecipe: {
                            id: recipe.id,
                            __typename: 'RecipeType',
                            likes: recipe.likes + 1
                          }
                        }
                      });
                    }}
                  />
                  {recipe.likes}
                </React.Fragment>
              )}
            </Mutation>
          </Header>
          <Header as="h2" floated="left">
            {recipe.title}
            <Header.Subheader>by {recipe.user.name}</Header.Subheader>
            <Header.Subheader>{recipe.description}</Header.Subheader>
          </Header>
        </Segment>

        <Divider />
        <Mutation mutation={DELETE_DIRECTION}>
          {deleteDirection => (
            <DirectionList
              directions={recipe.directions}
              author={this.checkUser()}
              onDelete={id => {
                deleteDirection({
                  variables: { id }
                }).then(() => this.props.data.refetch());
              }}
            />
          )}
        </Mutation>

        {this.checkUser() ? (
          <Mutation mutation={ADD_DIRECTION}>
            {addDirectionToRecipe => (
              <DirectionCreateForm
                onSubmit={content => {
                  addDirectionToRecipe({
                    variables: { recipeId: recipe.id, content }
                  });
                }}
              />
            )}
          </Mutation>
        ) : null}
      </React.Fragment>
    );
  }
}

export default graphql(fetchRecipe, {
  options: props => ({ variables: { id: props.match.params.id } })
})(Detail);
