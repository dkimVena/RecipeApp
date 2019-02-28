import React from 'react';

import { Form, Button, Segment, Message } from 'semantic-ui-react';

class AuthForm extends React.Component {
  renderErrors = errors => {
    return errors.map(error => (
      <Message error header="Something Wrong" content={error} key={error} />
    ));
  };

  render() {
    const {
      name,
      password,
      onSubmit,
      onChange,
      button,
      confirmPassword,
      errors
    } = this.props;

    return (
      <Form
        size="large"
        onSubmit={onSubmit}
        {...errors.length > 0 && { error: true }}
      >
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            type="password"
          />
          {confirmPassword !== undefined ? (
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                type="password"
              />
            </Form.Field>
          ) : null}
          {this.renderErrors(errors)}
          <Button color="teal" fluid size="large">
            {button}
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default AuthForm;
