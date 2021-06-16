// actions
import * as cartServices from '../services/cart.services';

const handleError = (error) => console.log(error);

export function getCart(userId) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_CART',
    });

    return cartServices.getCart(userId).then((data) => {
      dispatch({
        type: 'FETCHED_CART',
        payload: data,
      });
    }, handleError);
  };
}

export function addToCart(cartParams) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
    });

    return cartServices.addToCart(cartParams).then((data) => {
      dispatch({
        type: 'ADDED_PRODUCT_TO_CART',
        payload: data,
      });
    }, handleError);
  };
}

export function updateCart(cartParams) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_PRODUCT_IN_CART',
    });

    return cartServices.updateCart(cartParams).then((data) => {
      dispatch({
        type: 'UPDATED_PRODUCT_IN_CART',
        payload: data,
      });
    }, handleError);
  };
}

export function deleteProductFromCart(cartParams) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_PRODUCT_FROM_CART',
    });

    return cartServices.deleteProductFromCart(cartParams).then((data) => {
      dispatch({
        type: 'DELETED_PRODUCT_FROM_CART',
        payload: data,
      });
    }, handleError);
  };
}
