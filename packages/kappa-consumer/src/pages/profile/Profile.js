import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Menu from '@kappa/components/src/atoms/menu';

// External
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';

// molecules

// organisms
import Account from './components/account';
import Order from './components/order';
import Address from '../../components/organisms/address';

/* STYLES */
import useStyles from './profile.styles';

/* ASSETS */

/* CONSTANTS */

/* SERVICES */
import ActionCreators from '../../actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const Profile = ({ profileMenu, setProfileMenu }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setProfileMenu(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        elevation={0}
        value={profileMenu}
        onChange={handleChange}
        aria-label='scrollable force tabs example'
      >
        <Tab label='Profile' icon={<AccountCircleIcon />} {...a11yProps(0)} />
        <Tab label='Address' icon={<HomeIcon />} {...a11yProps(1)} />
        <Tab
          label='Order'
          icon={<LocalShippingOutlinedIcon />}
          {...a11yProps(2)}
        />
      </Tabs>

      <TabPanel value={profileMenu} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={profileMenu} index={1}>
        <div className={classes.root}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid container item xs={12} sm={10} md={8} spacing={3}>
              <Address />
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={profileMenu} index={2}>
        <Order />
      </TabPanel>
    </div>
  );
};

Profile.propTypes = {
  profileMenu: PropTypes.number,
  setProfileMenu: PropTypes.any.isRequired,
};

Profile.defaultProps = {
  profileMenu: 0,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    profileMenu: state.auth.profileMenu,
    fetching: state.auth.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
