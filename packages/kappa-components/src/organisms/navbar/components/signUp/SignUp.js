import React, { useState } from 'react';

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
import FormControl from '../../../../atoms/formControl';
import InputLabel from '../../../../atoms/inputLabel';
import Select from '../../../../atoms/select';
import MenuItem from '../../../../atoms/menuItem';
import FormHelperText from '../../../../atoms/formHelperText';

import Link from '../../../../atoms/link';

// Styles
import useStyles from './signUp.styles';

import COUNTRIES from '../../../../constants/countries';

export default function SignUp(props) {
  const { isOpen, setIsOpen, handleSignUp } = props;

  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    error: false,
    errorMessage: {},
  });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

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
        firstName:
          values.firstName.length < 3
            ? 'First name should contain atleast 3 characters.'
            : '',
        country:
          values.country.length === 0 ? 'Please select your country' : '',
      },
    }));

    if (values.errorMessage) {
      console.log(values.errorMessage, 'error message hai ');
    } else {
      console.log(values.errorMessage, 'error message nahi haiii  hai ');
    }

    // axios.post(`${URL}/api/v1/auth/authenticate`, loginDetails).then((res) => {
    //   localStorage.removeItem('user');
    //   localStorage.removeItem('token');
    //   localStorage.setItem('user', JSON.stringify(res.data.user));
    //   localStorage.setItem('token', res.data.token);
    // });
  };

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTitle className={classes.title}>Become a Kappa Member</DialogTitle>
      <form noValidate autoComplete='off'>
        <DialogContent className={classes.content}>
          <Typography variant='caption' color='textSecondary' gutterBottom>
            Create you Kappa Member profile and get first access to the very
            best of Kappa products.
          </Typography>
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

          <TextField
            required
            margin='dense'
            id='firstName'
            label='First Name'
            type='firstName'
            fullWidth
            variant='outlined'
            value={values.firstName}
            onChange={handleChange('firstName')}
            helperText={values.errorMessage.firstName}
            error={!!values.errorMessage.firstName}
          />

          <TextField
            margin='dense'
            id='lastName'
            label='Last Name'
            type='lastName'
            fullWidth
            variant='outlined'
            value={values.lastName}
            onChange={handleChange('lastName')}
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
                <MenuItem value={country.label}>{country.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{values.errorMessage.country}</FormHelperText>
          </FormControl>

          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={checked}
                onChange={handleChecked}
                color='primary'
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
            type='submit'
            label='Sign Up'
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={(e) => handleSubmit(e)}
          />
          <Typography variant='caption' gutterBottom>
            Already a member? <Link onClick={handleSignUp}>Sign In</Link>
          </Typography>
        </DialogActions>
      </form>
    </Popup>
  );
}
