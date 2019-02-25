import React from 'react';

import { Segment, Form, Button } from 'semantic-ui-react';

class DirectionCreate extends React.Component {
  state = { content: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({ content: '' });
  };
  render() {
    const { content } = this.state;
    return (
      <React.Fragment>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Add a Direction</label>
              <input
                placeholder="Input direction"
                value={content}
                name="content"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit">ADD</Button>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default DirectionCreate;
