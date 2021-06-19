import React from 'react';

import { AppBar } from '@material-ui/core';

// Styles
import useStyles from './navbar.styles';

const Navbar = ({ isAdmin, children, isHidden }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        {children}
      </AppBar>
    </div>
  );
};

export default Navbar;
