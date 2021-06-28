/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Button from '@kappa/components/src/atoms/button';
import TextField from '@kappa/components/src/atoms/textField';
import DialogActions from '@kappa/components/src/atoms/dialogActions';
import DialogContent from '@kappa/components/src/atoms/dialogContent';
import DialogTitle from '@kappa/components/src/atoms/dialogTitle';
import FormControl from '@kappa/components/src/atoms/formControl';
import InputLabel from '@kappa/components/src/atoms/inputLabel';
import Select from '@kappa/components/src/atoms/select';
import MenuItem from '@kappa/components/src/atoms/menuItem';
import FormHelperText from '@kappa/components/src/atoms/formHelperText';
import Link from '@kappa/components/src/atoms/link';
import COUNTRIES from '@kappa/components/src/constants/countries';
import Loader from '@kappa/components/src/atoms/loader';
import Popup from '../popup';
import { useForm, Form } from '../../../../../utils/useForm';

// Styles
import useStyles from './signUp.styles';

import ActionCreators from '../../../../../actions';
import validateEmail from '../../../../../utils/validateEmail';
import CloseIcon from '../../../../../assets/images/close';

const initialFValues = {
  email: '',
  password: '',
  name: '',
  country: '',
  error: false,
};

const SignUp = (props) => {
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

  // responsive
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Name is required.';
    if ('email' in fieldValues) {
      temp.email = validateEmail(fieldValues.email)
        ? ''
        : 'Email is not valid.';
    }
    if ('password' in fieldValues) temp.password = fieldValues.password.length >= 6 ? '' : 'Minimum 6 length required.';
    if ('country' in fieldValues) temp.country = fieldValues.country.length !== 0 ? '' : 'Country is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const {
        name, email, password, country,
      } = values;
      registerUser({
        name,
        email,
        password,
        country,
      });

      resetForm();
    }
  };

  const {
    values, errors, setErrors, handleInputChange, resetForm,
  } = useForm(initialFValues, true, validate);

  useEffect(() => {
    resetForm();
    setUserRegFalse();
  }, [isOpen]);

  return (
    <>
      <Popup isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}>
        {isSmall
      && (
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => setIsOpen(false)}
        />
      )}

        <div style={{ marginTop: isSmall && 35 }}>
          <DialogTitle className={classes.title}>
            {userRegistered
              ? 'Thanks for becoming a Mr Nomad Member.'
              : 'Become a Mr Nomad Member.'}
          </DialogTitle>
          <Form>
            <DialogContent className={classes.content}>
              {userRegistered ? (
                <></>
              ) : (
                <Typography variant="caption" color="textSecondary" gutterBottom>
                  Create you Kappa Member profile and get first access to the very
                  best of Kappa products.
                </Typography>
              )}

              <Typography variant={userRegistered ? 'h6' : 'body2'} color="error">
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
                        label="Name"
                        autoFocus
                        fullWidth
                        name="name"
                        variant="outlined"
                        margin="dense"
                        value={values.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        type="text"
                        required
                      />

                      <TextField
                        required
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={values.email}
                        name="email"
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />

                      <TextField
                        required
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                      />

                      <FormControl
                        required
                        className={classes.country}
                        variant="outlined"
                        margin="dense"
                        error={!!errors.country}
                      >
                        <InputLabel>Country</InputLabel>
                        <Select
                          label="Country"
                          value={values.country}
                          name="country"
                          onChange={handleInputChange}
                        >
                          {COUNTRIES.map((country) => (
                            <MenuItem key={country.label} value={country.label}>
                              {country.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.country}</FormHelperText>
                      </FormControl>
                    </>
                  )}

                  <Typography variant="caption" gutterBottom>
                    By logging in, you agree to Kappa&apos;s
                    {' '}
                    <Link href="/">Privacy Policy</Link>
                    {' '}
                    and
                    {' '}
                    <Link href="/">Terms of Use</Link>
                    {' '}
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions className={classes.actions}>
              {userRegistered ? (
                <></>
              ) : (
                <>
                  <Button
                    type="submit"
                    label="Sign Up"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(e) => handleSubmit(e)}
                  />

                  <Button
                    text="Reset"
                    color="default"
                    onClick={resetForm}
                    label="Reset Form"
                    variant="contained"
                    className={`${classes.button} ${classes.resetBtn}`}
                  />
                </>
              )}
              <Typography variant="caption" gutterBottom>
                Already a member?
                {' '}
                <Link onClick={handleSignUp}>Sign In</Link>
              </Typography>
              <Typography variant="caption" gutterBottom>
                Reset Password
                {' '}
                <Link onClick={handleForgetPass}>Forgot Password</Link>
              </Typography>
            </DialogActions>
          </Form>
        </div>
      </Popup>
    </>
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
