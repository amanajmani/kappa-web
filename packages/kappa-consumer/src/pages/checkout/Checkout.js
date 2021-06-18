import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

/* COMPONENTS */
// atoms
import Radio from '@material-ui/core/Radio';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Button from '@kappa/components/src/atoms/button';
import Card from '@kappa/components/src/atoms/card';
import CardMedia from '@kappa/components/src/atoms/cardMedia';
import Typography from '@kappa/components/src/atoms/typography';
import CardContent from '@kappa/components/src/atoms/cardContent';
import Grid from '@kappa/components/src/atoms/grid';
import Paper from '@kappa/components/src/atoms/paper';
import CustomDivider from '@kappa/components/src/atoms/divider';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Address from './components/organisms/address';
import Total from './components/organisms/total';
import Review from './components/organisms/review';

/* STYLES */
import useStyles from './checkout.styles';

/* SERVICES */
import ActionCreators from '../../actions';

/* ASSETS */
// images
import ShoppingCartIcon from '../../assets/images/shoppingCart';

function getSteps() {
  return ['Review Cart', 'Shipping', 'Payment'];
}

const Checkout = ({ addOrder, cart, address }) => {
  let URL = 'http://localhost:5000';
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderCalculation, setOrderCalculation] = useState({
    subTotal: 0,
    discount: 0,
  });
  const [currentOrder, setCurrentOrder] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(false);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${URL}/api/v1/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (true) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult, 'paymentResult');

    if (paymentResult) {
      setPaymentStatus(true);
      if (address && address.length) {
        let shippingAddress = address.filter(
          (elem) => elem.default === true
        )[0];

        addOrder({
          orderItems: cart,
          shippingAddress,
          itemsPrice: 10,
          taxPrice: 12,
          shippingPrice: 45,
          totalPrice: 789,
          isPaid: true,
          paidAt: paymentResult.create_time,
        });
      }
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return <Review setOrderCalculation={setOrderCalculation} />;
      case 0:
        return <Address />;
      case 2:
        return (
          <>
            {!paymentStatus ? (
              <>
                <Typography color='textPrimary' variant='h6'>
                  Select a payment method
                </Typography>

                <Paper className={classes.paymentPaper}>
                  <PayPalButton
                    amount={1000}
                    onSuccess={successPaymentHandler}
                  />
                </Paper>
              </>
            ) : (
              <>
                <Typography className={classes.instructions}>
                  Order Received , Payment Successful.
                </Typography>
              </>
            )}
          </>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <>
      <ContentContainer className={classes.root}>
        <Typography variant='h4' className={classes.title}>
          KAPPA
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container className={classes.container} spacing={2}>
          <Grid className={`${classes.stepperDiv}`} item lg={8} xs={12}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  Order Received , Payment Successful.
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <>
                <div className={`${classes.stepperContent}`}>
                  {getStepContent(activeStep)}
                  <div className={classes.stepperControls}>
                    {activeStep !== steps.length - 1 ? (
                      <Button
                        label='Prev'
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                    ) : (
                      ''
                    )}

                    {activeStep !== steps.length - 1 ? (
                      <Button
                        startIcon={<ShoppingCartIcon />}
                        label='Continue Shipping'
                        variant='contained'
                        disabled={
                          activeStep === steps.length - 2
                            ? cart && cart.length
                              ? false
                              : true
                            : ''
                        }
                        color='dark'
                        className={classes.cartButton}
                        onClick={handleNext}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </>
            )}
          </Grid>
          <Total orderCalculation={orderCalculation} />
        </Grid>
      </ContentContainer>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    address: state.address.address,
    cart: state.cart.cart,
    fetching: state.cart.fetching,
    updatedCart: state.cart.updatedCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
