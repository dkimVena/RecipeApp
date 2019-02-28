import React from 'react';

import { graphql } from 'react-apollo';
import mutation from '../../queries/signup';
import query from '../../queries/currentUser';
import SignupForm from '../../components/Form/SignupForm';

class Signup extends React.Component {
  state = { errors: [] };

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/');
    }
  }

  handleSubmit = ({ name, password }) => {
    this.props
      .mutate({
        variables: { name, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };
  render() {
    return (
      <div style={{ height: '90vh' }}>
        <SignupForm errors={this.state.errors} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(Signup));
