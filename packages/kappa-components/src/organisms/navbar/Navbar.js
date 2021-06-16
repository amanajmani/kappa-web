import React from 'react';

import { AppBar } from '@material-ui/core';
import clsx from 'clsx';

// Styles
import useStyles from './navbar.styles';

const Navbar = ({ isAdmin, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar, isAdmin && classes.adminAppBar)}>
        {children}
      </AppBar>
    </div>
  );
};

export default Navbar;
