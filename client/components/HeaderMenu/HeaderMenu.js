import React from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import query from '../../queries/currentUser';
import mutation from '../../queries/logout';
import { graphql } from 'react-apollo';

class HeaderMenu extends React.Component {
  handleLogout = () => {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  };

  renderButtons = () => {
    const { user } = this.props;

    if (user) {
      return (
        <React.Fragment>
          {`Welcome ${user.name}`}
          <Button
            as="a"
            style={{ marginLeft: '10px' }}
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button>
            <Link to="/login">Log in</Link>
          </Button>
          <Button style={{ marginLeft: '0.5em' }}>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <Menu size="large">
        <Container>
          <Link to="/">
            <Menu.Item header>Your Recipes!</Menu.Item>
          </Link>
          <Menu.Item position="right">{this.renderButtons()}</Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default graphql(mutation)(HeaderMenu);
