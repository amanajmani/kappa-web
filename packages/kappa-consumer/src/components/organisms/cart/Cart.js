import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import clsx from 'clsx';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import Paper from '@kappa/components/src/atoms/paper';
import Loader from '@kappa/components/src/atoms/loader';

// molecules
import Drawer from '@kappa/components/src/molecules/drawer';
import QuantityButton from '../../molecules/quantityButton';

/* STYLES */
import useStyles from './cart.styles';

/* SERVICES */
import ActionCreators from '../../../actions';

/* ASSETS */
// images
import CloseIcon from '../../../assets/images/close';
import SadIcon from '../../../assets/images/sad';

import BASE_URL from '../../../constants/baseURL';

/* UTILS */
import isEmpty from '../../../utils/isEmpty.utils';

const Cart = ({
  getCart,
  cart,
  fetching,
  isCartVisible,
  setIsCartVisible,
  deleteProductFromCart,
  updateCart,
}) => {
  const classes = useStyles();
  // responsive
  const theme = useTheme();
  const isXtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  useEffect(() => {
    console.log('get cart -------- ');
    getCart();
  }, []);

  const incrementProduct = (data) => {
    const { _id, quantity } = data;

    if (quantity < 10) {
      updateCart({
        itemId: _id,
        type: 'inc',
      });
    }
  };

  const decrementProduct = (data) => {
    const { _id, quantity } = data;

    if (quantity > 1) {
      updateCart({
        itemId: _id,
        type: 'dec',
      });
    }
  };

  const deleteProduct = (id) => {
    deleteProductFromCart(id);
  };

  return (
    <Drawer
      isDrawerVisible={isCartVisible}
      setIsDrawerVisible={setIsCartVisible}
      anchor={isXtraSmall ? 'bottom' : 'right'}
      large={!isXtraSmall}
      full={isXtraSmall}
    >
      {isXtraSmall && (
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => setIsCartVisible(false)}
        />
      )}
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Typography variant='h5' gutterBottom>
            CART
          </Typography>
          <Typography variant='caption' gutterBottom>
            You are eligible for free shipping
          </Typography>
        </div>
        <div
          className={clsx(
            classes.productsList,
            isEmpty(cart) && classes.emptyCart
          )}
        >
          {isEmpty(cart) ? (
            fetching ? (
              <Loader padding />
            ) : (
              <>
                <Typography gutterBottom>
                  You haven&apos;t added anything yet
                </Typography>
                <SadIcon fontSize='large' />
              </>
            )
          ) : (
            cart &&
            cart.map((cartData) => (
              <div key={cartData.product.id} className={classes.product}>
                <img
                  className={classes.image}
                  src={`${BASE_URL}/api/v1/files/${
                    cartData.product &&
                    cartData.product.images.length &&
                    cartData.product.images[0]
                  }`}
                  alt={cartData.product.title}
                />
                <div className={classes.productDescription}>
                  <div>
                    <Typography variant='h6'>
                      {cartData.product.title}
                    </Typography>
                    <Typography variant='body1'>
                      {cartData.product.price}
                    </Typography>
                  </div>
                  <div className={classes.productActions}>
                    <QuantityButton
                      quantity={cartData.quantity}
                      incrementProduct={() => incrementProduct(cartData)}
                      decrementProduct={() => decrementProduct(cartData)}
                      fetching={fetching}
                    />
                    <Button
                      label='REMOVE'
                      className={classes.removeButton}
                      onClick={() => deleteProduct(cartData._id)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Paper className={classes.footer} elevation={10}>
          <Typography variant='caption' gutterBottom>
            Shipping & taxes calculated at checkout
          </Typography>
          <Button
            variant='contained'
            color='primary'
            label='Checkout'
            className={classes.checkoutButton}
            component={Link}
            onClick={() => setIsCartVisible(false)}
            to='/checkout'
          />
        </Paper>
      </div>
    </Drawer>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    fetching: state.cart.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
