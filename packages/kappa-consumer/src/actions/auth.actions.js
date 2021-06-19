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
        data = { ...data, userRegistered: true };
        dispatch({
          type: 'REGISTER_USER_SUCCESS',
          payload: data,
        });
      } else {
        data = { ...data, userRegistered: false };
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
          payload: { ...data, verified: true },
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

export function resetPassword(body) {
  return (dispatch) => {
    dispatch({
      type: 'RESET_PASSWORD_START',
    });

    return authServices.resetPassword(body).then((data) => {
      console.log(
        data,
        'data-----  resetPassword resetPassword resetPassword '
      );
      if (data.success) {
        
        dispatch({
          type: 'RESET_PASSWORD_SUCCESS',
          payload: { ...data, verified : true},
        });
      } else {
        dispatch({
          type: 'RESET_PASSWORD_FAILED',
          payload: { ...data, verified: false },
        });
      }
    }, handleError);
  };
}

export function setIsSignInOpen(body) {
  console.log(body, 'setIsSignInOpen');
  return (dispatch) => {
    dispatch({
      type: 'OPEN_LOGIN_MODAL',
      payload: body,
    });
  };
}

export function clearAuthMessage() {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_AUTH_MESSAGE',
    });
  };
}

export function setUserRegFalse() {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_REGISTER_FALSE',
    });
  };
}
