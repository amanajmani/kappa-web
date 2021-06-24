import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/* COMPONENTS */
// atoms
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Paper from '@kappa/components/src/atoms/paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Loader from '@kappa/components/src/atoms/loader';
import Link from '@material-ui/core/Link';

import Address from '../../components/organisms/address';
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

const Checkout = ({ addOrder, cart, address, user }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderCalculation, setOrderCalculation] = useState({
    subTotal: 0,
    discount: 0,
  });
  const [currentOrderPayment, setCurrentOrderPayment] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    let total = parseFloat(
      orderCalculation.subTotal - orderCalculation.discount + 5
    ).toFixed(2);
    setCurrentOrderPayment(total);
    setSdkReady(true);
  }, [orderCalculation.discount, orderCalculation.subTotal]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const successPaymentHandler = (paymentResult) => {
    if (paymentResult) {
      setPaymentStatus(true);
      if (address && address.length) {
        let shippingAddress = address.filter(
          (elem) => elem.default === true
        )[0];

        addOrder({
          orderItems: cart,
          shippingAddress,
          itemsPrice: orderCalculation.subTotal,
          taxPrice: orderCalculation.discount,
          shippingPrice: 5,
          totalPrice: currentOrderPayment,
          isPaid: true,
          paidAt: paymentResult.create_time,
          paymentMethod: 'paypal',
          paymentResult: {
            status: 'success',
            update_time: paymentResult.create_time,
            email_address: user.email,
          },
        });
      }
    }
  };

  const cashOnDeliveryHandle = () => {
    setPaymentStatus(true);
    if (address && address.length) {
      let shippingAddress = address.filter((elem) => elem.default === true)[0];

      addOrder({
        orderItems: cart,
        shippingAddress,
        itemsPrice: orderCalculation.subTotal,
        taxPrice: orderCalculation.discount,
        shippingPrice: 50,
        totalPrice: currentOrderPayment,
        isPaid: false,
        paymentMethod: 'cash',
        paymentResult: {
          status: 'pending',
          update_time: { type: String },
          email_address: user.email,
        },
      });
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Review setOrderCalculation={setOrderCalculation} />;
      case 1:
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
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <>
                      <PayPalButton
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: 'USD',
                                  value: currentOrderPayment,
                                },
                              },
                            ],
                          });
                        }}
                        onSuccess={successPaymentHandler}
                      />
                      <Button
                        label='Cash On Delivery'
                        onClick={cashOnDeliveryHandle}
                        className={classes.cashOnDelivery}
                      ></Button>
                    </>
                  )}
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
          {activeStep === steps.length ? null : (
            <>
              <div className={`${classes.stepperContent}`}>
                {getStepContent(activeStep)}
                <div className={classes.stepperControls}>
                  {activeStep !== steps.length - 1 ? (
                    <Button
                      label='Back'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                  ) : null}

                  {activeStep !== steps.length - 1 ? (
                    <Button
                      startIcon={<ShoppingCartIcon />}
                      label='Continue'
                      variant='contained'
                      disabled={
                        activeStep === steps.length - 3
                          ? cart && cart.length
                            ? false
                            : true
                          : activeStep === steps.length - 2
                          ? address && address.length
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
                  {activeStep === steps.length - 1 ? (
                    <Link underline='none' component={RouterLink} to={`/`}>
                      <Button
                        variant='contained'
                        color='primary'
                        label='Home'
                        className={classes.homeButton}
                      />
                    </Link>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </Grid>
        <Total orderCalculation={orderCalculation} />
      </Grid>
    </ContentContainer>
  );
};

Checkout.propTypes = {
  addOrder: PropTypes.func,
  user: PropTypes.object,
  cart: PropTypes.array,
  address: PropTypes.array,
};

Checkout.defaultProps = {
  user: {},
  cart: [],
  address: [],
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    address: state.address.address,
    user: state.auth.user,
    cart: state.cart.cart,
    fetching: state.cart.fetching,
    updatedCart: state.cart.updatedCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
