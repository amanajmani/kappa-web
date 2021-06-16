import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
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

import Popup from '../popup';

// Styles
import useStyles from './signIn.styles';

import ActionCreators from '../../../../../actions';

const SignIn = ({
  loginUser,
  isOpen,
  setIsOpen,
  handleSignIn,
  handleForgetPass,
  user,
  message,
}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false,
    role: 'admin',
  });

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: name === 'keepMeLoggedIn' ? checked : value,
    }));
  };

  const submitLogin = () => {
    loginUser(loginDetails);
  };

  useEffect(() => {
    if (user.name) {
      setIsOpen(false);
    }
  }, [user]);

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTitle className={classes.title}>
        Your Account for everything Kappa
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography variant='body2' color='error'>
          {message}
        </Typography>

        <TextField
          autoFocus
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          variant='outlined'
          name='email'
          value={loginDetails.email}
          onChange={handleChange}
        />

        <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          variant='outlined'
          name='password'
          value={loginDetails.password}
          onChange={handleChange}
        />
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              color='primary'
              checked={!!loginDetails.keepMeLoggedIn}
              onChange={handleChange}
              name='keepMeLoggedIn'
            />
          }
          label='Keep me signed in'
        />
        <Typography variant='caption' gutterBottom>
          By logging in, you agree to Kappa&apos;s{' '}
          <Link href='/'>Privacy Policy</Link> and{' '}
          <Link href='/'>Terms of Use</Link>{' '}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          label='Sign In'
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={submitLogin}
        />
        <Typography variant='caption' gutterBottom>
          Not a member <Link onClick={handleSignIn}>Join Us</Link>
        </Typography>
        <Typography variant='caption' gutterBottom>
          Reset Password <Link onClick={handleForgetPass}>Forgot Password</Link>
        </Typography>
      </DialogActions>
    </Popup>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    fetching: state.auth.fetching,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
