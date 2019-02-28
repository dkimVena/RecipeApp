import React from 'react';

import { Grid, Header } from 'semantic-ui-react';
import AuthForm from './AuthForm';
import FormManager from './FormManager';

class LoginForm extends React.Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in
          </Header>
          <FormManager
            defaultForm={{ name: '', password: '' }}
            onSubmit={this.props.onSubmit}
            render={({ form, onSubmit, onChange }) => (
              <AuthForm
                name={form.name}
                password={form.password}
                onSubmit={onSubmit}
                onChange={onChange}
                button={'Login'}
                errors={this.props.errors}
              />
            )}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
