import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '@kappa/components/src/atoms/loader';

// Styles
import useStyles from './private.route.styles';

/* SERVICES */
import ActionCreators from '../../../actions';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const classes = useStyles();
  let isAuth = localStorage.getItem('user');
  isAuth = JSON.parse(isAuth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && isAuth.name ? (
          <Component {...props} />
        ) : (
          <Redirect to='/?user=unauthorized' />
        )
      }
    />
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
