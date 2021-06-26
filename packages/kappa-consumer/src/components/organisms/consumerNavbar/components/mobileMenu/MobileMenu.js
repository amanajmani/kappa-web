import React from 'react';
import { Link } from 'react-router-dom';

/* RESPONSIVE */
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

/* COMPONENTS */
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import Drawer from '@kappa/components/src/molecules/drawer';
import List from '@kappa/components/src/atoms/list';

/* READERS */

/* COMPONENTS */
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '../../../../../assets/images/person';
import ProfileMenu from '../profileMenu';
import categoriesReaders from '../../../../../readers/categories.readers';

/* STYLES */
import useStyles from './mobileMenu.styles';

const MobileMenu = ({
  categories,
  isMobileMenuVisible,
  setIsMobileMenuVisible,
  user,
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
      anchor="right"
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
          <Typography variant="h5" gutterBottom>
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
              <Button
                onClick={() => setIsSignInOpen(true)}
                startIcon={<PersonIcon color="primary" />}
                label="Sign In"
              />
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
