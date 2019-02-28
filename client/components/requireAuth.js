import React from 'react';

import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';

export default WrappedComponent => {
  class RequireAuth extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth = () => {
      if (!this.props.data.loading && !this.props.data.user) {
        this.props.history.push('/login');
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
