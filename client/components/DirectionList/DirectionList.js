import React from 'react';

import { List, Button, Label, Icon } from 'semantic-ui-react';

class DirectionList extends React.Component {
  renderDirectionList = directions =>
    directions.map((direction, index) => (
      <List.Item key={direction.id}>
        {this.props.author ? (
          <List.Content floated="right">
            <Button
              animated="vertical"
              onClick={() => this.props.onDelete(direction.id)}
            >
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name="trash alternate" />
              </Button.Content>
            </Button>
          </List.Content>
        ) : (
          ''
        )}
        <List.Content>
          <Label>
            <Icon name="food" />
            {index + 1}
          </Label>{' '}
          {direction.content}
        </List.Content>
      </List.Item>
    ));

  render() {
    const { directions } = this.props;
    return <List divided>{this.renderDirectionList(directions)}</List>;
  }
}

export default DirectionList;
