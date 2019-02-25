import React from 'react';

import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
  renderRecipes = recipes =>
    recipes.map(({ id, title, likes, description }) => {
      return (
        <Card key={id}>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>User</Card.Meta>
            <Card.Meta>
              <Icon name="thumbs up outline" />
              {likes}
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                <Link to={`/recipes/${id}`}>View</Link>
              </Button>
              <Button basic color="red" onClick={() => this.handleDelete(id)}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    });

  render() {
    const { recipes } = this.props;
    return (
      <React.Fragment>
        <Card.Group>{this.renderRecipes(recipes)}</Card.Group>
      </React.Fragment>
    );
  }
}

export default RecipeList;
