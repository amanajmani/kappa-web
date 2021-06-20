import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import BASE_URL from '../../constants/baseURL';

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
import Loader from '@kappa/components/src/atoms/loader';

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
    // const addPayPalScript = async () => {
    //   // const { data: clientId } = await axios.get(
    //   //   `${BASE_URL}/api/v1/config/paypal`
    //   // );
    //   const script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = `https://www.paypal.com/sdk/js?client-id=ARl9JFy8Cc-bc49YMZyEFizHNGaDqtQejkCvs1knPHirzwcrvBZMDnLJ5SdQFIi5rs8QXZaXQvYQPdq`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkReady(true);
    //     console.log('append---------1');
    //   };
    //   document.body.appendChild(script);
    // };

    // if (!window.paypal) {
    //   console.log('append---------add');
    //   addPayPalScript();
    // } else {
    setSdkReady(true);
    let totalPrice = orderCalculation.subTotal - orderCalculation.discount;
    let tempTotal = totalPrice + 100 + 5;
    tempTotal = parseFloat(tempTotal).toFixed(2);
    setCurrentOrderPayment(tempTotal);
    // }
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

        let totalPrice = orderCalculation.subTotal - orderCalculation.discount;
        let tempTotal = totalPrice + 100 + 5;
        tempTotal = parseFloat(tempTotal).toFixed(2);
        setCurrentOrderPayment(tempTotal);

        addOrder({
          orderItems: cart,
          shippingAddress,
          itemsPrice: orderCalculation.subTotal,
          taxPrice: orderCalculation.discount,
          shippingPrice: 50,
          totalPrice: tempTotal,
          isPaid: true,
          paidAt: paymentResult.create_time,
        });
      }
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
                    <PayPalButton
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value: 100,
                              },
                              /* shipping: {
                                address: {
                                  address_line_1:
                                    'EWS. 507 Wing A Raheja Residency',
                                  address_line_2: 'Film City Road',
                                  admin_area_1: 'Maharashtra',
                                  admin_area_2: 'Mumbai',
                                  country_code: 'IN',
                                  postal_code: '400097',
                                },
                                name: { full_name: 'Ravi Kumar' },
                              }, */
                            },
                          ],
                        });
                      }}
                      onSuccess={successPaymentHandler}
                    />
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
            {activeStep === steps.length ? null : (
              <>
                <div className={`${classes.stepperContent}`}>
                  {getStepContent(activeStep)}
                  <div className={classes.stepperControls}>
                    <Button
                      label='Back'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>

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
