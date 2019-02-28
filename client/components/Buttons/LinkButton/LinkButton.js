import React from 'react';

import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const LinkButton = ({ link, size, icon }) => {
  return (
    <Link to={link}>
      <Icon size={size} name={icon} color="teal" />
    </Link>
  );
};

export default LinkButton;
