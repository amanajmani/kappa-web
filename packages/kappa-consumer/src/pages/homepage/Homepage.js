import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from '@kappa/components/src/atoms/typography';

// local api
import carouselData from './constants/carouselData.constants';

// components
import Carousel from './components/organisms/carousel';
import Modal from '../../components/organisms/modal';
import RecommendedProducts from '../../components/organisms/recommendedProducts';
import FooterNotes from './components/atoms/footerNotes';

import ActionCreators from '../../actions';

const App = ({
  location,
  match,
  setIsSignInOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [verification, setVerification] = useState(false);
  const [resetPasswordState, setResetPasswordState] = useState(false);
  const [resetTokenValue, setResetTokenValue] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const { search } = location;
    const searchParams = new URLSearchParams(search);
    const user = searchParams.get('user');
    const resetToken = searchParams.get('resetToken');

    const {
      // eslint-disable-next-line no-shadow
      params: { verificationCode },
    } = match;

    if (verificationCode) {
      setIsOpen(true);
      setVerification(true);
      setVerificationCode(verificationCode);
    }

    if (user && user.toLowerCase() === 'unauthorized') {
      setIsSignInOpen(true);
    }

    if (resetToken) {
      setIsOpen(true);
      setResetPasswordState(true);
      setResetTokenValue(resetToken);
    }
  }, []);

  return (
    <div>
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        verification={verification}
        resetPasswordState={resetPasswordState}
        resetTokenValue={resetTokenValue}
        setResetPasswordState={setResetPasswordState}
        verificationCode={verificationCode}
      />
      <Typography variant="body2" color="error" />
      <Carousel data={carouselData} />

      <RecommendedProducts
        title="Featured Collection"
      />

      <FooterNotes />
    </div>
  );
};

App.defaultProps = {
  location: {},
  match: {},
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
