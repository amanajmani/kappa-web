import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, useHistory } from 'react-router-dom';

/* COMPONENTS */
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ForgetPass from './components/forgetPass';
import CategoriesListMenu from './components/categoriesListMenu';
import Cart from '../cart';
import MobileMenu from './components/mobileMenu';
import SectionDesktop from './components/sectionDesktop';
import SectionMobile from './components/sectionMobile';

/* STYLES */
import logo from '../../../assets/images/logo.png';

/* UTILS */
import isEmpty from '../../../utils/isEmpty.utils';

import ActionCreators from '../../../actions';

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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, [fetchUser]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const routeChange = () => {
    const path = `/${searchText}/page/${1}`;
    history.push(path);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isEmpty(event.target.value)) {
      routeChange();
    }
  };

  const open = mouseOverTab || mouseOverMenu;

  return (
    <>
      <SectionDesktop
        enterTab={enterTab}
        leaveTab={leaveTab}
        logo={logo}
        handleKeyDown={handleKeyDown}
        searchText={searchText}
        handleSearch={handleSearch}
        user={user}
        logoutUser={logoutUser}
        setProfileMenu={setProfileMenu}
        setIsSignInOpen={setIsSignInOpen}
        setIsCartVisible={setIsCartVisible}
      />

      <SectionMobile
        logo={logo}
        mobileSearchVisible={mobileSearchVisible}
        setMobileSearchVisible={setMobileSearchVisible}
        handleKeyDown={handleKeyDown}
        searchText={searchText}
        handleSearch={handleSearch}
        setIsCartVisible={setIsCartVisible}
        setIsMobileMenuVisible={setIsMobileMenuVisible}
        setIsSignInOpen={setIsSignInOpen}
        user={user}
      />

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
  connect(mapStateToProps, mapDispatchToProps)(ConsumerNavbar),
);
