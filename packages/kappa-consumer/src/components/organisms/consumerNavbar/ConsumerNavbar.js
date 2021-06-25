import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { IconButton, Tabs, Tab } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

// Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons/';

/* COMPONENTS */
// atoms
import Button from '@kappa/components/src/atoms/button';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ForgetPass from './components/forgetPass';

import CategoriesListMenu from './components/categoriesListMenu';
import Cart from '../cart';
import ProfileMenu from './components/profileMenu';

/* STYLES */
import useStyles from './consumerNavbar.styles';
import logo from '../../../assets/images/logo.png';
import PersonIcon from '../../../assets/images/person';

import ActionCreators from '../../../actions';

const ConsumerNavbar = ({
  categories,
  getOrders,
  user,
  fetchUser,
  isSignInOpen,
  setIsSignInOpen,
  clearAuthMessage,
  logoutUser,
  setProfileMenu,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  // const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isCartVisible, setIsCartVisible] = React.useState(false);
  const [isForgetPassOpen, setIsForgetPassOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user && user.name) getOrders();
  }, [user, getOrders]);

  const history = useHistory();

  const anchorRef = React.useRef(null);

  const handleSignIn = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    setIsForgetPassOpen(false);
    clearAuthMessage();
  };

  const handleSignUp = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsForgetPassOpen(false);
    clearAuthMessage();
  };

  const handleForgetPass = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(false);
    setIsForgetPassOpen(true);
    clearAuthMessage();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    clearAuthMessage();
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, [fetchUser]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const routeChange = () => {
    let path = `/${searchText}/page/${1}`;
    history.push(path);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      routeChange();
    }
  };

  return (
    <>
      <div className={classes.sectionDesktop}>
        <div className={classes.sectionLeftDesktop}>
          <Link className={classes.logoContainer} to='/'>
            <img src={logo} className={classes.logo} alt='Mr-Nomad-Logo' />
          </Link>
          <Tabs value={value} onChange={handleChange} className={classes.tabs}>
            <Tab
              label='SHOP'
              className={classes.tab}
              ref={anchorRef}
              onClick={handleToggle}
            />
          </Tabs>
        </div>

        <CategoriesListMenu
          setOpen={setOpen}
          open={open}
          anchorRef={anchorRef}
          categories={categories}
        />
        {/* <div className={classes.searchContainer}>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              type="text" 
              onKeyDown={handleKeyDown}
              value={searchText}
              onChange={handleSearch}
            />
          </div>
      </div> */}
        <div className={classes.sectionRightDesktop}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              type='text'
              onKeyDown={handleKeyDown}
              value={searchText}
              onChange={handleSearch}
            />
          </div>

          {user.name ? (
            <ProfileMenu
              data={user}
              logoutUser={logoutUser}
              setProfileMenu={setProfileMenu}
            />
          ) : (
            <>
              <IconButton
                className={classes.button}
                onClick={() => setIsSignInOpen(true)}
              >
                <PersonIcon />
              </IconButton>
            </>
          )}

          {user.name ? (
            <IconButton
              className={classes.button}
              onClick={() => setIsCartVisible(true)}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.button}
              onClick={() => setIsSignInOpen(true)}
            >
              <ShoppingCartIcon />
            </IconButton>
          )}
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
        setIsOpen={() => {
          setIsSignInOpen();
          clearAuthMessage();
        }}
        handleSignIn={handleSignIn}
        handleForgetPass={handleForgetPass}
      />
      <SignUp
        isOpen={isSignUpOpen}
        setIsOpen={(bool) => {
          setIsSignUpOpen(bool);
          clearAuthMessage();
        }}
        handleSignUp={handleSignUp}
        handleForgetPass={handleForgetPass}
      />
      <ForgetPass
        isOpen={isForgetPassOpen}
        setIsOpen={(bool) => {
          setIsForgetPassOpen(bool);
          clearAuthMessage();
        }}
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
    isSignInOpen: state.auth.isSignInOpen,
    user: state.auth.user,
    message: state.auth.message,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConsumerNavbar)
);
