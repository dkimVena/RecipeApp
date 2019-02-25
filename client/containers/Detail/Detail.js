import React from 'react';

import { graphql, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Header, Icon, Divider, Segment } from 'semantic-ui-react';
import fetchRecipe from '../../queries/fetchRecipe';
import DirectionCreateForm from '../../components/DirectionCreateForm';
import DirectionList from '../../components/DirectionList';
import LinkButton from '../../components/Buttons/LinkButton';

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

class RecipeDetail extends React.Component {
  render() {
    const { loading, recipe } = this.props.data;

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
            <Header.Subheader>{recipe.description}</Header.Subheader>
          </Header>
        </Segment>

        <Divider />
        <DirectionList directions={recipe.directions} />
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
      </React.Fragment>
    );
  }
}

export default graphql(fetchRecipe, {
  options: props => ({ variables: { id: props.match.params.id } })
})(RecipeDetail);
