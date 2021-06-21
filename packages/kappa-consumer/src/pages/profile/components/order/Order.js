import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Button from '@kappa/components/src/atoms/button';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Paper from '@kappa/components/src/atoms/paper';
import Menu from '@kappa/components/src/atoms/menu';

import MenuItem from '@kappa/components/src/atoms/menuItem';
import IconButton from '@kappa/components/src/atoms/iconButton';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Loader from '@kappa/components/src/atoms/loader';

// molecules

// organisms
import OrderCard from '../../../../components/organisms/orderCard';

/* STYLES */
import useStyles from './order.styles';

/* ASSETS */

/* CONSTANTS */

/* SERVICES */
import ActionCreators from '../../../../actions';

const Order = ({ order, fetching }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid container item xs={12} sm={10} md={8} spacing={3}>
          <Typography gutterBottom variant='subtitle1'>
            Total Orders : {order.length}
          </Typography>
          <OrderCard data={order} fetching={fetching} />
        </Grid>
      </Grid>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    order: state.order.order,
    fetching: state.order.fetching,
    message: state.order.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
