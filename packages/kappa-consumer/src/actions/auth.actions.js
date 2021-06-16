// actions
import * as authServices from '../services/auth.services';

const handleError = (error) => console.log(error);

// eslint-disable-next-line import/prefer-default-export
export function loginUser(body) {
  return (dispatch) => {
    dispatch({
      type: 'LOG_IN_START',
    });

    return authServices.loginUser(body).then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({
          type: 'LOG_IN_SUCCESS',
          payload: data,
        });
      } else {
        console.log(data, 'in else condition');
        dispatch({
          type: 'LOG_IN_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}
