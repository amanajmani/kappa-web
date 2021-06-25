import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BASE_URL from '../../../../../constants/baseURL';
import PropTypes from 'prop-types';

/* COMPONENTS */
import Loader from '@kappa/components/src/atoms/loader';

// atoms
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@kappa/components/src/atoms/list';
import Box from '@kappa/components/src/atoms/box';
import DeleteIcon from '@material-ui/icons/Delete';
import SadIcon from '../../../../../assets/images/sad';

import Typography from '@kappa/components/src/atoms/typography';

// molecules
import QuantityButton from '../../../../../components/molecules/quantityButton';

/* STYLES */
import useStyles from './review.styles';

/* SERVICES */
import ActionCreators from '../../../../../actions';

import isEmpty from '../../../../../utils/isEmpty.utils';

const Review = ({
  getCart,
  updateCart,
  deleteProductFromCart,
  cart,
  fetching,
  setOrderCalculation,
  user,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (user && user.name) getCart();
  }, [user, getCart]);

  useEffect(() => {
    let subTotal = 0;
    let discount = 0;
    if (!isEmpty(cart)) {
      cart.forEach((elem) => {
        const subTotalTemp = elem.product.price * elem.quantity;
        const discountTemp = subTotalTemp * (elem.product.discount / 100);
        subTotal += subTotalTemp;
        discount += discountTemp;
      });
      setOrderCalculation({ subTotal, discount });
    }
  }, [cart]);

  const incrementProduct = (id, quantity) => {
    if (quantity < 10) {
      updateCart({
        itemId: id,
        type: 'inc',
      });
    }
  };

  const decrementProduct = (id, quantity) => {
    if (quantity > 1) {
      updateCart({
        itemId: id,
        type: 'dec',
      });
    }
  };

  const deleteProduct = (id) => {
    deleteProductFromCart(id);
  };

  return (
    <>
      {isEmpty(cart) ? (
        <>
          <Typography gutterBottom>
            You haven&apos;t added anything yet
          </Typography>
          <SadIcon fontSize='large' />
        </>
      ) : null}

      <List width='100%' className={classes.scrollable} subheader={<li />}>
        {!isEmpty(cart) &&
          cart.map((item) => (
            <Card key={item._id} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={`${BASE_URL}/api/v1/files/${item.product.images[0]}`}
              />
              <CardContent>
                <Typography gutterBottom variant='body1' display='block'>
                  {item.product.title}
                </Typography>
                <Typography variant='body1' display='block'>
                  Price: <b> ${item.product.price}</b>
                </Typography>
              </CardContent>
              <QuantityButton
                className={{ borderRadius: '2px' }}
                quantity={item.quantity}
                fetching={fetching}
                incrementProduct={() =>
                  incrementProduct(item._id, item.quantity)
                }
                decrementProduct={() =>
                  decrementProduct(item._id, item.quantity)
                }
              />
              <Box className={classes.deleteIconContainer}>
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={() => deleteProduct(item._id)}
                />
              </Box>
            </Card>
          ))}
      </List>
    </>
  );
};

Review.propTypes = {
  cart: PropTypes.array,
  fetching: PropTypes.bool,
};

Review.defaultProps = {
  cart: [],
  fetching: true,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    cart: state.cart.cart,
    fetching: state.cart.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
