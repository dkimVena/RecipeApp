import React from 'react';

import { Grid, Header } from 'semantic-ui-react';
import AuthForm from './AuthForm';
import FormManager from './FormManager';

class SignupForm extends React.Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign-up
          </Header>
          <FormManager
            defaultForm={{ name: '', password: '', confirmPassword: '' }}
            onSubmit={this.props.onSubmit}
            render={({ form, onSubmit, onChange }) => (
              <AuthForm
                name={form.name}
                password={form.password}
                confirmPassword={form.confirmPassword}
                onSubmit={onSubmit}
                onChange={onChange}
                button={'Signup'}
                errors={this.props.errors}
              />
            )}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignupForm;
