import React from 'react';

import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';

export default WrappedComponent => {
  class UseCurrentUser extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props} currentUser={this.props.data.user} />
      );
    }
  }

  return graphql(currentUserQuery)(UseCurrentUser);
};
