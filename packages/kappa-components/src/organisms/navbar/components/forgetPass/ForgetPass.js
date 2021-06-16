import React, { useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

/* COMPONENTS */
// atoms
import { Typography } from '@material-ui/core';
import Popup from '../popup';
import Button from '../../../../atoms/button';
import TextField from '../../../../atoms/textField';
import DialogActions from '../../../../atoms/dialogActions';
import DialogContent from '../../../../atoms/dialogContent';
import DialogTitle from '../../../../atoms/dialogTitle';
import Checkbox from '../../../../atoms/checkbox';
import FormControlLabel from '../../../../atoms/formControlLabel';
import Link from '../../../../atoms/link';

// Styles
import useStyles from './forgetPass.styles';

export default function ForgetPass(props) {
  const URL = 'http://localhost:5000';
  const { isOpen, setIsOpen, handleSignIn, handleSignUp } = props;
  const [responseMessage, setResponseMessage] = useState('');

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false,
  });

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: name === 'keepMeLoggedIn' ? checked : value,
    }));
  };

  const submitForgotPass = () => {
    console.log(loginDetails, 'loginDetails');

    const { email } = loginDetails;
    axios
      .put(`${URL}/api/v1/auth/reset-password`, { email })

      .then((res) => {
        console.log(res, 'res after forget');
        if (res.data.success) {
          setResponseMessage(res.data.message);
        } else {
          setResponseMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTitle className={classes.title}>Forget Password</DialogTitle>

      <DialogContent className={classes.content}>
        <Typography variant='body2' color='error'>
          {responseMessage}
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

        {/* <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          variant='outlined'
          name='password'
          value={loginDetails.password}
          onChange={handleChange}
        /> */}
        {/* <FormControlLabel
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
        /> */}
        <Typography variant='caption' gutterBottom>
          By logging in, you agree to Kappa&apos;s{' '}
          <Link href='/'>Privacy Policy</Link> and{' '}
          <Link href='/'>Terms of Use</Link>{' '}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          label='Reset Now'
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={submitForgotPass}
        />
        <Typography variant='caption' gutterBottom>
          Not a member <Link onClick={handleSignIn}>Join Us</Link>
        </Typography>
        <Typography variant='caption' gutterBottom>
          Already Register <Link onClick={handleSignUp}>Login In</Link>
        </Typography>
      </DialogActions>
    </Popup>
  );
}
