import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Button from '@kappa/components/src/atoms/button';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Paper from '@kappa/components/src/atoms/paper';
import Menu from '@kappa/components/src/atoms/menu';

// import Typography from '@kappa/components/src/atoms/typography';
// import Button from '@kappa/components/src/atoms/button';
import TextField from '@kappa/components/src/atoms/textField';
// import DialogActions from '@kappa/components/src/atoms/dialogActions';
// import DialogContent from '@kappa/components/src/atoms/dialogContent';
// import DialogTitle from '@kappa/components/src/atoms/dialogTitle';
// import Checkbox from '@kappa/components/src/atoms/checkbox';
import FormControlLabel from '@kappa/components/src/atoms/formControlLabel';
import FormControl from '@kappa/components/src/atoms/formControl';
import InputLabel from '@kappa/components/src/atoms/inputLabel';
import Select from '@kappa/components/src/atoms/select';
// import MenuItem from '@kappa/components/src/atoms/menuItem';
import FormHelperText from '@kappa/components/src/atoms/formHelperText';
// import Link from '@kappa/components/src/atoms/link';
// import COUNTRIES from '@kappa/components/src/constants/countries';
// import Popup from '../popup';
import Loader from '@kappa/components/src/atoms/loader';
import COUNTRIES from '@kappa/components/src/constants/countries';

import MenuItem from '@kappa/components/src/atoms/menuItem';
import IconButton from '@kappa/components/src/atoms/iconButton';
import ProductCard from '@kappa/components/src/molecules/productCard';

// External
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';

// molecules

// organisms

/* STYLES */
import useStyles from './account.styles';

/* ASSETS */

/* CONSTANTS */
import BASE_URL from '../../../../constants/baseURL';

/* SERVICES */
import ActionCreators from '../../../../actions';

const Account = ({ user, fetching, updateUser }) => {
  const classes = useStyles();

  const [isValid, setIsValid] = useState(false);

  const [values, setValues] = useState({
    email: user ? user.email : '',
    password: '',
    name: user ? user.name : '',
    country: user ? user.country : '',
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
      values &&
      values.country &&
      values.name &&
      values.password &&
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

      console.log(values, 'values');
      updateUser({
        name,
        email,
        password,
        country,
      });
    } else {
      console.log(values.errorMessage, 'error message  hai ');
    }
  };

  if (fetching) <Loader />;

  return (
    <div className={classes.root}>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid container item xs={12} sm={10} md={8} spacing={3}>
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
            inputProps={{
              autoComplete: 'none',
            }}
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
                <MenuItem value={country.label}>{country.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{values.errorMessage.country}</FormHelperText>
          </FormControl>
          <Button
            type='submit'
            label='Update Profile'
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={(e) => handleSubmit(e)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    fetching: state.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
