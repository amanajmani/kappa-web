// actions
import * as addressServices from '../services/address.services';

const handleError = (error) => console.log(error);

// eslint-disable-next-line import/prefer-default-export
export function getAddresses(body) {
  return (dispatch) => {
    dispatch({
      type: 'GET_ADDRESS_START',
    });

    return addressServices.getAddresses(body).then((data) => {
      if (data.success) {
        dispatch({
          type: 'GET_ADDRESS_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'GET_ADDRESS_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}

export function addAddress(body) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_ADDRESS_START',
    });

    return addressServices.addAddress(body).then((data) => {
      if (data.success) {
        dispatch({
          type: 'ADD_ADDRESS_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'ADD_ADDRESS_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}
