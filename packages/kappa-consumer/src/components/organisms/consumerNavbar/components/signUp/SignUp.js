import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Button from '@kappa/components/src/atoms/button';
import TextField from '@kappa/components/src/atoms/textField';
import DialogActions from '@kappa/components/src/atoms/dialogActions';
import DialogContent from '@kappa/components/src/atoms/dialogContent';
import DialogTitle from '@kappa/components/src/atoms/dialogTitle';
import Checkbox from '@kappa/components/src/atoms/checkbox';
import FormControlLabel from '@kappa/components/src/atoms/formControlLabel';
import FormControl from '@kappa/components/src/atoms/formControl';
import InputLabel from '@kappa/components/src/atoms/inputLabel';
import Select from '@kappa/components/src/atoms/select';
import MenuItem from '@kappa/components/src/atoms/menuItem';
import FormHelperText from '@kappa/components/src/atoms/formHelperText';
import Link from '@kappa/components/src/atoms/link';
import COUNTRIES from '@kappa/components/src/constants/countries';
import Popup from '../popup';
import Loader from '@kappa/components/src/atoms/loader';

// Styles
import useStyles from './signUp.styles';

import ActionCreators from '../../../../../actions';

const SignUp = (props) => {
  const URL = 'http://localhost:5000';
  const {
    isOpen,
    setIsOpen,
    handleSignUp,
    handleForgetPass,
    registerUser,
    message,
    fetching,
    userRegistered,
    setUserRegFalse,
  } = props;

  const classes = useStyles();

  const [isValid, setIsValid] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
    error: false,
    errorMessage: {},
  });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (
      Object.values(values.errorMessage).every((elem) => elem === '') &&
      !(values.country.length === 0) &&
      !(values.name.length < 3) &&
      !(values.password.length < 6) &&
      validateEmail(values.email)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues((prev) => ({
      ...prev,
      errorMessage: {
        ...prev.errorMessage,
        email: !validateEmail(values.email)
          ? 'Please enter a valid email address.'
          : '',
        password:
          values.password.length < 6
            ? 'Password should contain atleast 6 characters.'
            : '',
        name:
          values.name.length < 3
            ? 'Full name should contain atleast 3 characters.'
            : '',
        country:
          values.country.length === 0 ? 'Please select your country' : '',
      },
    }));

    const { name, email, password, country } = values;
    if (isValid) {
      console.log(values.errorMessage, 'error message nhi hai ');

      registerUser({
        name,
        email,
        password,
        country,
      });
    } else {
      console.log(values.errorMessage, 'error message  hai ');
    }
  };

  useEffect(() => {
    setValues({
      email: '',
      password: '',
      name: '',
      country: '',
      error: false,
      errorMessage: {},
    });
    setUserRegFalse();
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}>
      <DialogTitle className={classes.title}>
        {userRegistered
          ? 'Thanks for becoming a Mr Nomad Member.'
          : 'Become a Mr Nomad Member.'}
      </DialogTitle>
      <form noValidate autoComplete='off'>
        <DialogContent className={classes.content}>
          {userRegistered ? (
            <></>
          ) : (
            <Typography variant='caption' color='textSecondary' gutterBottom>
              Create you Kappa Member profile and get first access to the very
              best of Kappa products.
            </Typography>
          )}

          <Typography variant={userRegistered ? 'h6' : 'body2'} color='error'>
            {message}
          </Typography>
          {userRegistered ? (
            <></>
          ) : (
            <>
              {fetching ? (
                <Loader padding />
              ) : (
                <>
                  <TextField
                    required
                    margin='dense'
                    id='name'
                    label='Name'
                    fullWidth
                    variant='outlined'
                    value={values.name}
                    onChange={handleChange('name')}
                    helperText={values.errorMessage.name}
                    error={!!values.errorMessage.name}
                  />

                  <TextField
                    required
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email Address'
                    type='email'
                    fullWidth
                    variant='outlined'
                    value={values.email}
                    onChange={handleChange('email')}
                    helperText={values.errorMessage.email}
                    error={!!values.errorMessage.email}
                  />

                  <TextField
                    required
                    margin='dense'
                    id='password'
                    label='Password'
                    type='password'
                    fullWidth
                    variant='outlined'
                    value={values.password}
                    onChange={handleChange('password')}
                    helperText={values.errorMessage.password}
                    error={!!values.errorMessage.password}
                  />

                  <FormControl
                    required
                    className={classes.country}
                    variant='outlined'
                    margin='dense'
                    error={!!values.errorMessage.country}
                    helperText={values.errorMessage.country}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      label='Country'
                      value={values.country}
                      onChange={handleChange('country')}
                    >
                      {COUNTRIES.map((country) => (
                        <MenuItem value={country.label}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {values.errorMessage.country}
                    </FormHelperText>
                  </FormControl>
                </>
              )}

              <Typography variant='caption' gutterBottom>
                By logging in, you agree to Kappa&apos;s{' '}
                <Link href='/'>Privacy Policy</Link> and{' '}
                <Link href='/'>Terms of Use</Link>{' '}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions className={classes.actions}>
          {userRegistered ? (
            <></>
          ) : (
            <Button
              type='submit'
              label='Sign Up'
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={(e) => handleSubmit(e)}
            />
          )}
          <Typography variant='caption' gutterBottom>
            Already a member? <Link onClick={handleSignUp}>Sign In</Link>
          </Typography>
          <Typography variant='caption' gutterBottom>
            Reset Password{' '}
            <Link onClick={handleForgetPass}>Forgot Password</Link>
          </Typography>
        </DialogActions>
      </form>
    </Popup>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    userRegistered: state.auth.userRegistered,
    user: state.auth.user,
    fetching: state.auth.fetching,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
