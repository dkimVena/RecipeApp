import React from 'react';

import { Button, Form, Header } from 'semantic-ui-react';

class RecipeCreateForm extends React.Component {
  state = { title: '', description: '' };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { title, description } = this.state;
    e.preventDefault();
    this.props.onSubmit(title, description);
  };

  render() {
    const { title, description } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Header as="h1">Create a new recipe</Header>
          <Form.Field>
            <label>Recipe Title</label>
            <input
              placeholder="Input recipe title"
              value={title}
              name="title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipe Description</label>
            <input
              placeholder="Input recipe description"
              value={description}
              name="description"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Save</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default RecipeCreateForm;
