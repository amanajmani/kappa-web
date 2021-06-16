import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IconButton, Tabs, Tab } from '@material-ui/core';
import clsx from 'clsx';

// Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons/';

/* COMPONENTS */
// atoms
import Button from '@kappa/components/src/atoms/button';
import Loader from '@kappa/components/src/atoms/loader';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ForgetPass from './components/forgetPass';

import CategoriesListMenu from './components/categoriesListMenu';
import Cart from '../cart';
import Typography from '@kappa/components/src/atoms/typography';

/* STYLES */
import useStyles from './consumerNavbar.styles';

import ActionCreators from '../../../actions';

const ConsumerNavbar = ({ categories, fetching, user, fetchUser }) => {
  console.log(user, 'user fetchUser');

  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isCartVisible, setIsCartVisible] = React.useState(false);
  const [isForgetPassOpen, setIsForgetPassOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const anchorRef = React.useRef(null);

  const handleSignIn = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    setIsForgetPassOpen(false);
  };

  const handleSignUp = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsForgetPassOpen(false);
  };

  const handleForgetPass = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(false);
    setIsForgetPassOpen(true);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <div className={classes.sectionDesktop}>
        <div className={classes.sectionLeftDesktop}>
          <Tabs
            value={value}
            indicatorColor='primary'
            onChange={handleChange}
            className={classes.tabs}
          >
            <Tab
              label='SHOP'
              className={classes.tab}
              ref={anchorRef}
              onClick={handleToggle}
            />
            {/* <Tab label="BLOG" className={classes.tab} />
                <Tab label="ABOUT" className={classes.tab} />
                <Tab label="FAQ" className={classes.tab} /> */}
          </Tabs>
        </div>
        {!fetching && categories ? (
          <CategoriesListMenu
            setOpen={setOpen}
            open={open}
            anchorRef={anchorRef}
            categories={categories}
          />
        ) : (
          <Loader />
        )}

        <div className={classes.sectionRightDesktop}>
          {user.name ? (
            <Button
              color='primary'
              className={classes.button}
              label={user.name}
            />
          ) : (
            <Button
              color='primary'
              className={classes.button}
              label='Account'
              onClick={() => setIsSignInOpen(true)}
            />
          )}
          <Button color='primary' className={classes.button} label='Search' />
          <Button
            color='primary'
            className={clsx(classes.button, classes.cart)}
            label='Cart'
            onClick={() => setIsCartVisible(true)}
          />
        </div>
      </div>

      <div className={classes.sectionMobile}>
        <div className={classes.sectionLeftMobile}>
          <IconButton className={classes.iconButton}>
            <MenuIcon />
          </IconButton>
        </div>
        <div>
          <IconButton className={classes.iconButton}>
            <SearchIcon />
          </IconButton>

          <IconButton className={classes.iconButton}>
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </div>
      <Cart isCartVisible={isCartVisible} setIsCartVisible={setIsCartVisible} />
      <SignIn
        isOpen={isSignInOpen}
        setIsOpen={setIsSignInOpen}
        handleSignIn={handleSignIn}
        handleForgetPass={handleForgetPass}
      />
      <SignUp
        isOpen={isSignUpOpen}
        setIsOpen={setIsSignUpOpen}
        handleSignUp={handleSignUp}
        handleForgetPass={handleForgetPass}
      />
      <ForgetPass
        isOpen={isForgetPassOpen}
        setIsOpen={setIsForgetPassOpen}
        handleForgetPass={handleForgetPass}
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerNavbar);
