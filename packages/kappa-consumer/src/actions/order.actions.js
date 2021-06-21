// actions
import * as orderServices from '../services/order.services';

const handleError = (error) => console.log(error);

// eslint-disable-next-line import/prefer-default-export
export function getOrders(body) {
  return (dispatch) => {
    dispatch({
      type: 'GET_ORDERS_START',
    });

    return orderServices.getOrders(body).then((data) => {
      if (data && data.data.success) {
        dispatch({
          type: 'GET_ORDERS_SUCCESS',
          payload: data.data,
        });
      } else {
        dispatch({
          type: 'GET_ORDERS_FAILED',
          payload: data.data,
        });
      }
    }, handleError);
  };
}

export function addOrder(body) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_ORDER_START',
    });

    return orderServices.addOrder(body).then((data) => {
      console.log(data, 'data in order add');
      if (data.success) {
        dispatch({
          type: 'ADD_ORDER_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'ADD_ORDER_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}
