import React from 'react';

import { Container } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import query from '../queries/currentUser';
import HeaderMenu from './HeaderMenu';

class Layout extends React.Component {
  render() {
    const {
      children,
      data: { user }
    } = this.props;

    return (
      <Container>
        <HeaderMenu user={user} />
        {children}
      </Container>
    );
  }
}

export default graphql(query)(Layout);
