// actions
import * as orderServices from '../services/order.services';

const handleError = (error) => console.log(error);

// eslint-disable-next-line import/prefer-default-export
// export function getAddresses(body) {
//   return (dispatch) => {
//     dispatch({
//       type: 'GET_ADDRESS_START',
//     });

//     return addressServices.getAddresses(body).then((data) => {
//       if (data.success) {
//         dispatch({
//           type: 'GET_ADDRESS_SUCCESS',
//           payload: data,
//         });
//       } else {
//         dispatch({
//           type: 'GET_ADDRESS_FAILED',
//           payload: data,
//         });
//       }
//     }, handleError);
//   };
// }

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

// export function updateAddress(body, id) {
//   return (dispatch) => {
//     dispatch({
//       type: 'UPDATE_ADDRESS_START',
//     });

//     return addressServices.updateAddress(body, id).then((data) => {
//       if (data.success) {
//         dispatch({
//           type: 'UPDATE_ADDRESS_SUCCESS',
//           payload: data,
//         });
//       } else {
//         dispatch({
//           type: 'UPDATE_ADDRESS_FAILED',
//           payload: data,
//         });
//       }
//     }, handleError);
//   };
// }

// export function deleteAddress(id) {
//   return (dispatch) => {
//     dispatch({
//       type: 'DELETE_ADDRESS_START',
//     });

//     return addressServices.deleteAddress(id).then((data) => {
//       if (data.success) {
//         dispatch({
//           type: 'DELETE_ADDRESS_SUCCESS',
//           payload: data,
//         });
//       } else {
//         dispatch({
//           type: 'DELETE_ADDRESS_FAILED',
//           payload: data,
//         });
//       }
//     }, handleError);
//   };
// }
