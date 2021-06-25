import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

import useStyles from './profile.menu.styles';

export default function ProfileMenu({
  data,
  logoutUser,
  setProfileMenu,
  profileMenuNumber,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    history.push('/');
    setAnchorEl(null);
  };

  const handleProfileTab = (tab) => {
    setProfileMenu(tab);
    history.push('/profile');
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{ color: 'white' }}
      >
        {data.name}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleProfileTab(0)}>My Account</MenuItem>
        <MenuItem onClick={() => handleProfileTab(1)}>My Address</MenuItem>
        <MenuItem onClick={() => handleProfileTab(2)}>My Orders</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
