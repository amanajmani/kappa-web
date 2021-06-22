import React from 'react';
import { Link } from 'react-router-dom';

/* COMPONENTS */
// atoms
import Popper from '@kappa/components/src/atoms/popper';
import Grow from '@kappa/components/src/atoms/grow';
import Paper from '@kappa/components/src/atoms/paper';
import MenuList from '@kappa/components/src/atoms/menuList';
import MenuItem from '@kappa/components/src/atoms/menuItem';
import ClickAwayListener from '@kappa/components/src/atoms/clickAwayListener';
import Loader from '@kappa/components/src/atoms/loader';

import useStyles from './categoriesList.styles';

const CategoriesListMenu = (props) => {
  const classes = useStyles();
  const { setOpen, open, anchorRef, categories, fetching } = props;

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 10, width: '99.5%' }}
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={false}
                id='menu-list-grow'
                onKeyDown={handleListKeyDown}
              >
                {categories.data.map((category) => (
                  <MenuItem
                    component={Link}
                    to={`/${category._id}/page/${1}`}
                    onClick={handleClose}
                    key={category._id}
                    className={classes.list}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default CategoriesListMenu;
