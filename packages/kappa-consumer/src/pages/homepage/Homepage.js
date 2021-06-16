import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from '@kappa/components/src/atoms/typography';

// local api
import carouselData from './constants/carouselData.constants';

// components
import Carousel from './components/organisms/carousel';

import ActionCreators from '../../actions';

const App = ({ match, verifyUser, message }) => {
  console.log(match, 'match in home');

  useEffect(() => {
    const {
      params: { verificationCode },
    } = match;

    if (verificationCode) {
      verifyUser(verificationCode);
      console.log(verificationCode, 'run verifyUser');
    }
  }, []);

  return (
    <div>
      <Typography variant='body2' color='error'>
        {message}
      </Typography>
      <Carousel data={carouselData} />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    fetching: state.auth.fetching,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
