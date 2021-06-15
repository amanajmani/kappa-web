import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, IconButton, Tabs, Tab } from '@material-ui/core';
import clsx from 'clsx';

// Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons/';

/* COMPONENTS */
// atoms
import Button from '../../atoms/button';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

// Styles
import useStyles from './navbar.styles';

export default function Navbar(props) {
  const { isAdmin } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignIn = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  const handleSignUp = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar, isAdmin && classes.adminAppBar)}>
        <div className={classes.sectionDesktop}>
          {!isAdmin && (
            <div className={classes.sectionLeftDesktop}>
              <Tabs
                value={value}
                indicatorColor='primary'
                onChange={handleChange}
                className={classes.tabs}
              >
                <Tab
                  component={Link}
                  to='/category'
                  label='SHOP'
                  className={classes.tab}
                />
                <Tab label='BLOG' className={classes.tab} />
                <Tab label='ABOUT' className={classes.tab} />
                <Tab label='FAQ' className={classes.tab} />
              </Tabs>
            </div>
          )}
          {isAdmin && <div className={classes.adminDivider} />}
          <div className={classes.sectionRightDesktop}>
            <Button
              color='primary'
              className={classes.button}
              label='Account'
              onClick={() => setIsSignInOpen(true)}
            />
            {!isAdmin && (
              <>
                <Button
                  color='primary'
                  className={classes.button}
                  label='Search'
                />
                <Button
                  color='primary'
                  className={clsx(classes.button, classes.cart)}
                  label='Cart (0)'
                />
              </>
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
      </AppBar>

      <SignIn
        isOpen={isSignInOpen}
        setIsOpen={setIsSignInOpen}
        handleSignIn={handleSignIn}
      />
      <SignUp
        isOpen={isSignUpOpen}
        setIsOpen={setIsSignUpOpen}
        handleSignUp={handleSignUp}
      />
    </div>
  );
}
