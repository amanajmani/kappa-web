import React from 'react';
import { Link } from 'react-router-dom';

/* RESPONSIVE */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { IconButton } from '@material-ui/core';
// Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons/';

/* COMPONENTS */
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import Paper from '@kappa/components/src/atoms/paper';
import Drawer from '@kappa/components/src/molecules/drawer';
import List from '@kappa/components/src/atoms/list';
import ProfileMenu from '../../components/profileMenu';
import PersonIcon from '../../../../../assets/images/person';

/* READERS */
import productsReader from '../../../../../readers/productsList.readers';

/* COMPONENTS */
import ProductCard from '@kappa/components/src/molecules/productCard';
import Grid from '@kappa/components/src/atoms/grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import categoriesReaders from '../../../../../readers/categories.readers';

/* STYLES */
import useStyles from './mobileMenu.styles';

/* ASSETS */
// images
// import CloseIcon from '../../../assets/images/close';
// import SadIcon from '../../../assets/images/sad';

const MobileMenu = ({
  categories,
  isMobileMenuVisible,
  setIsMobileMenuVisible,
  user,
  setIsCartVisible,
  setIsSignInOpen,
  setProfileMenu,
  logoutUser,
}) => {
  const classes = useStyles();
  // responsive
  // const theme = useTheme();
  // const isXtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Drawer
      isDrawerVisible={isMobileMenuVisible}
      setIsDrawerVisible={setIsMobileMenuVisible}
      anchor={'right'}
      // large={!isXtraSmall}
      // full={isXtraSmall}
    >
      {/* {isXtraSmall && (
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => setIsCartVisible(false)}
        />
      )} */}

      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant='h5' gutterBottom>
            MR NOMAD
          </Typography>

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
                <PersonIcon /> SIGN IN
              </IconButton>
            </>
          )}
        </div>
        <List
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            padding: 20,
          }}
        >
          {categoriesReaders.data(categories).map((category) => (
            <ListItem
              component={Link}
              to={`/${categoriesReaders.id(category)}/page/${1}`}
              className={classes.list}
              onClick={() => setIsMobileMenuVisible(false)}
            >
              <ListItemText
                className={classes.listItem}
                primary={categoriesReaders.categoryName(category)}
              />
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>

        {/* <div
          className={clsx(
            classes.productsList,
            isEmpty(cart) && classes.emptyCart
          )}
        >
          {renderCart()}
        </div> */}
      </div>
    </Drawer>
  );
};

export default MobileMenu;
