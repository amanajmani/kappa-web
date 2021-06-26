import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { IconButton, Typography } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

// Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons/';

/* COMPONENTS */
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ForgetPass from './components/forgetPass';
import CategoriesListMenu from './components/categoriesListMenu';
import Cart from '../cart';
import ProfileMenu from './components/profileMenu';
import MobileMenu from './components/mobileMenu';

/* STYLES */
import useStyles from './consumerNavbar.styles';
import logo from '../../../assets/images/logo.png';
import PersonIcon from '../../../assets/images/person';

import ActionCreators from '../../../actions';

const renderTabs = (classes, enterTab, leaveTab) => (
  <div className={classes.tabsRoot}>
    <div
      className={classes.tabsContainer}
      onMouseEnter={enterTab}
      onMouseLeave={leaveTab}
    >
      <Typography className={classes.tab}>Shop</Typography>
    </div>
  </div>
);

const timeoutLength = 200;

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
  // const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isCartVisible, setIsCartVisible] = React.useState(false);
  const [isForgetPassOpen, setIsForgetPassOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [mouseOverTab, setMouseOverTab] = React.useState(false);
  const [mouseOverMenu, setMouseOverMenu] = React.useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = React.useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = React.useState(false);

  const enterTab = () => {
    setMouseOverTab(true);
  };

  const leaveTab = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      setMouseOverTab(false);
    }, timeoutLength);
  };

  const enterMenu = () => {
    setMouseOverMenu(true);
  };

  const leaveMenu = () => {
    setTimeout(() => {
      setMouseOverMenu(false);
    }, timeoutLength);
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (user && user.name && token) getOrders();
  }, [user, getOrders]);

  const history = useHistory();

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

  const open = mouseOverTab || mouseOverMenu;

  return (
    <>
      <>
        <div className={classes.sectionDesktop}>
          <div className={classes.sectionLeftDesktop}>
            <Link className={classes.logoContainer} to='/'>
              <img src={logo} className={classes.logo} alt='Mr-Nomad-Logo' />
            </Link>
            {renderTabs(classes, enterTab, leaveTab)}
          </div>

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
            <Link className={classes.logoContainer} to='/'>
              <img src={logo} className={classes.logo} alt='Mr-Nomad-Logo' />
            </Link>
          </div>
          <div>
            {mobileSearchVisible ? (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  autoFocus
                  onBlur={() => setMobileSearchVisible(false)}
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInputMobile,
                  }}
                  type='text'
                  onKeyDown={handleKeyDown}
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
            ) : (
              <>
                <IconButton
                  onClick={() => setMobileSearchVisible(true)}
                  className={classes.iconButton}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={() => setIsCartVisible(true)}
                  className={classes.iconButton}
                >
                  <ShoppingCartIcon />
                </IconButton>

                <IconButton
                  onClick={() => setIsMobileMenuVisible(true)}
                  className={classes.iconButton}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <Cart
          isCartVisible={isCartVisible}
          setIsCartVisible={setIsCartVisible}
        />
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
      <CategoriesListMenu
        categories={categories}
        enterMenu={enterMenu}
        leaveMenu={leaveMenu}
        open={open}
      />
      <MobileMenu
        user={user}
        setProfileMenu={setProfileMenu}
        logoutUser={logoutUser}
        setIsSignInOpen={setIsSignInOpen}
        categories={categories}
        isMobileMenuVisible={isMobileMenuVisible}
        setIsMobileMenuVisible={setIsMobileMenuVisible}
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
    categories: state.categories.categories,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConsumerNavbar)
);
