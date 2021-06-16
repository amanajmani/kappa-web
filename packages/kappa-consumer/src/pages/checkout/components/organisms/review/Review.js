import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

/* COMPONENTS */
import Grid from '@kappa/components/src/atoms/grid';
import Loader from '@kappa/components/src/atoms/loader';

// atoms
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
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
  updatedCart,
  setOrderCalculation,
}) => {
  console.log(cart, 'cart in review');
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [countUpdate, setCountUpdate] = useState(false);

  console.log(updatedCart, 'updatedCart');

  useEffect(() => {
    getCart('60b91c696807c4197c691214');
  }, [updatedCart]);

  useEffect(() => {
    getCart('60b91c696807c4197c691214');
  }, []);

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
      setCountUpdate(false);
    }
  }, [cart]);

  const incrementProduct = (id, count) => {
    updateCart({
      user: '60b91c696807c4197c691214',
      itemId: id,
      type: 'inc',
    });
  };

  const decrementProduct = (id, count) => {
    updateCart({
      user: '60b91c696807c4197c691214',
      itemId: id,
      type: 'dec',
    });
  };

  const deleteProduct = (id) => {
    deleteProductFromCart(id);
  };

  return (
    <List width='100%' className={classes.scrollable} subheader={<li />}>
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
        cart.map((item) => (
          <Card key={item._id} className={classes.root}>
            <CardMedia
              className={classes.media}
              image={`${URL}/api/v1/files/${item.product.images[0]}`}
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
              incrementProduct={() => incrementProduct(item._id, item.quantity)}
              decrementProduct={() => decrementProduct(item._id, item.quantity)}
            />
            <Box className={classes.deleteIconContainer}>
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={() => deleteProduct(item._id)}
              />
            </Box>
          </Card>
        ))
      )}
    </List>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    fetching: state.cart.fetching,
    updatedCart: state.cart.updatedCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
