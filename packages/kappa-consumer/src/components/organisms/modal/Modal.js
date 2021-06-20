import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Route } from 'react-router-dom';

/* COMPONENTS */
import Loader from '@kappa/components/src/atoms/loader';
// atoms
import { Typography } from '@material-ui/core';
import Button from '@kappa/components/src/atoms/button';
import TextField from '@kappa/components/src/atoms/textField';
import DialogActions from '@kappa/components/src/atoms/dialogActions';
import DialogContent from '@kappa/components/src/atoms/dialogContent';
import DialogTitle from '@kappa/components/src/atoms/dialogTitle';
import Checkbox from '@kappa/components/src/atoms/checkbox';
import FormControlLabel from '@kappa/components/src/atoms/formControlLabel';
import Link from '@kappa/components/src/atoms/link';

import Popup from '../../organisms/consumerNavbar/components/popup';

// Styles
import useStyles from './modal.styles';

import ActionCreators from '../../../actions';

const Modal = ({
  loginUser,
  isOpen,
  setIsOpen,
  handleSignIn,
  handleForgetPass,
  user,
  message,
  verified,
  setIsSignInOpen,
  verification,
  fetching,
  clearAuthMessage,
  resetPassword,
  resetPasswordState,
  setResetPasswordState,
  resetTokenValue,
  verificationCode,
  verifyUser,
}) => {
  const [loginDetails, setLoginDetails] = useState({
    password1: '',
    password2: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: name === 'keepMeLoggedIn' ? checked : value,
    }));
  };

  useEffect(() => {
    if (user.name) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    setLoginDetails({
      password1: '',
      password2: '',
    });

    if (verificationCode) {
      verifyUser(verificationCode);
    }
  }, [isOpen]);

  const handleResetPass = () => {
    if (
      loginDetails.password1 &&
      loginDetails.password1.length >= 6 &&
      loginDetails.password2 &&
      loginDetails.password2.length >= 6 &&
      loginDetails.password1 === loginDetails.password2
    ) {
      resetPassword({
        resetPasswordToken: resetTokenValue,
        password: loginDetails.password1,
      });

      setLoginDetails({
        password1: '',
        password2: '',
      });
      setErrorMessage('');
    } else {
      setErrorMessage(`Password doesn't match`);
    }
  };

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={() => {
        clearAuthMessage();
        setIsOpen(!isOpen);
      }}
    >
      <DialogTitle className={classes.title}>Welcome</DialogTitle>
      <DialogContent className={classes.content}>
        {resetPasswordState ? (
          <Typography variant='body2' color='error'>
            {message || errorMessage}
          </Typography>
        ) : null}

        {verification ? (
          fetching ? (
            <Loader />
          ) : (
            <Typography variant='h6' color='error'>
              {message}
            </Typography>
          )
        ) : fetching ? (
          <Loader />
        ) : verified ? null : (
          <>
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              variant='outlined'
              name='password1'
              value={loginDetails.password1}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              variant='outlined'
              name='password2'
              value={loginDetails.password2}
              onChange={handleChange}
            />
          </>
        )}
      </DialogContent>

      <DialogActions className={classes.actions}>
        {resetPasswordState ? (
          <></>
        ) : verification ? (
          <>
            <Typography variant='body2' gutterBottom>
              <Link
                onClick={() => {
                  clearAuthMessage();
                  setIsSignInOpen(true);
                  setIsOpen(!isOpen);
                }}
              >
                Login Now
              </Link>
            </Typography>
          </>
        ) : null}
        {verified ? (
          <Button
            label='Sign In Now'
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => {
              clearAuthMessage();
              setIsSignInOpen(true);
              setIsOpen(!isOpen);
            }}
          />
        ) : resetPasswordState ? (
          <>
            <Button
              label='Reset Now'
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={handleResetPass}
            />
            <Typography variant='caption' gutterBottom>
              Reset Password{' '}
              <Link
                onClick={() => {
                  clearAuthMessage();
                  setIsSignInOpen(true);
                  setIsOpen(!isOpen);
                }}
              >
                Forgot Password
              </Link>
            </Typography>
          </>
        ) : null}
      </DialogActions>
    </Popup>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    verified: state.auth.verified,
    user: state.auth.user,
    fetching: state.auth.fetching,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
