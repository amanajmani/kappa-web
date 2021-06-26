import React from 'react';

/* COMPONENTS */
import Navbar from '@kappa/components/src/organisms/navbar';
import ConsumerNavbar from '../consumerNavbar';

import Footer from '../footer';

/* STYLES */
import useStyles from './primaryLayout.styles';

const PrimaryLayout = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar>
        <ConsumerNavbar />
      </Navbar>
      <div className={classes.content}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PrimaryLayout;
