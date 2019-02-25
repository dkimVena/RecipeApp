import React from 'react';

import { List, Button, Label, Icon } from 'semantic-ui-react';

class DirectionList extends React.Component {
  renderDirectionList = directions =>
    directions.map(direction => (
      <List.Item key={direction.id}>
        <List.Content floated="right">
          <Button>Add</Button>
        </List.Content>
        <List.Content>
          <Label>
            <Icon name="food" />1
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
