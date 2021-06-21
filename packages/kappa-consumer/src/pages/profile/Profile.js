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
import Button from '@kappa/components/src/atoms/button';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Paper from '@kappa/components/src/atoms/paper';
import Menu from '@kappa/components/src/atoms/menu';

import MenuItem from '@kappa/components/src/atoms/menuItem';
import IconButton from '@kappa/components/src/atoms/iconButton';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Loader from '@kappa/components/src/atoms/loader';

// External
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
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
import BASE_URL from '../../constants/baseURL';

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

const Profile = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        elevation={0}
        value={value}
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

      <TabPanel value={value} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid container item xs={12} sm={10} md={8} spacing={3}>
              <Address />
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Order />
      </TabPanel>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    products: state.productsList.productsList,
    fetching: state.productsList.fetching,
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
