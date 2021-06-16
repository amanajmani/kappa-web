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

export function fetchUser(body) {
  return (dispatch) => {
    dispatch({
      type: 'LOG_IN_START',
    });

    return authServices.fetchUser(body).then((data) => {
      console.log(data, ' dta in auth service fetch user');

      if (data.success) {
        dispatch({
          type: 'LOG_IN_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'LOG_IN_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}

export function registerUser(body) {
  return (dispatch) => {
    dispatch({
      type: 'REGISTER_USER_START',
    });

    return authServices.registerUser(body).then((data) => {
      if (data.success) {
        dispatch({
          type: 'REGISTER_USER_SUCCESS',
          payload: data,
        });
      } else {
        console.log(data, 'in else condition');
        dispatch({
          type: 'REGISTER_USER_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}

export function verifyUser(body) {
  return (dispatch) => {
    dispatch({
      type: 'VERIFY_USER_START',
    });

    return authServices.verifyUser(body).then((data) => {
      if (data.success) {
        dispatch({
          type: 'VERIFY_USER_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'VERIFY_USER_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}

export function forgotPassword(body) {
  return (dispatch) => {
    dispatch({
      type: 'FORGOT_PASSWORD_START',
    });

    return authServices.forgotPassword(body).then((data) => {
      if (data.success) {
        dispatch({
          type: 'FORGOT_PASSWORD_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'FORGOT_PASSWORD_FAILED',
          payload: data,
        });
      }
    }, handleError);
  };
}
