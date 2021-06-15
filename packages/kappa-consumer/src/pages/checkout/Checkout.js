import React, { useEffect, useState } from 'react';
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

/* ASSETS */
// images
import ShoppingCartIcon from '../../assets/images/shoppingCart';

function getSteps() {
  return ['Review Cart', 'Shipping', 'Payment'];
}

const Checkout = () => {
  let URL = 'http://localhost:5000';
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderCalculation, setOrderCalculation] = useState({
    subTotal: 0,
    discount: 0,
  });
  const [currentOrder, setCurrentOrder] = useState({});

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    console.log(activeStep, 'activeStep first');
    if (activeStep === 1) {
      console.log(activeStep, 'activeStep');
      axios
        .post(`${URL}/api/v1/order`, {
          user: '60b91c696807c4197c691214',
          orderItems: [
            { product: '60c5ea0fe9bfde323ffda227', quantity: 1 },
            { product: '60c5e5e55ba70c30d65dad0b', quantity: 1 },
            { product: '60c5e5ea5ba70c30d65dad0c', quantity: 1 },
          ],
          shippingAddress: {
            address: 'EWS 616/1550',
            city: 'Kanpur',
            postalCode: '208020',
            country: 'India',
          },
          paymentMethod: 'Paypal',
          taxPrice: 100,
          shippingPrice: 200,
          totalPrice: 400,
        })
        .then((res) => {
          setCurrentOrder(res.data);
        });
    }
  };

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    //  if (!userInfo) {
    //    history.push('/login');
    //  }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${URL}/api/v1/config/paypal`);
      console.log(clientId, 'clientId');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // if (!order || successPay || successDeliver || order._id !== orderId) {
    //   dispatch({ type: ORDER_PAY_RESET });
    //   dispatch({ type: ORDER_DELIVER_RESET });
    //   dispatch(getOrderDetails(orderId));
    // } else if (!order.isPaid) {
    //   if (!window.paypal) {
    //     addPayPalScript();
    //   } else {
    //     setSdkReady(true);
    //   }
    // }

    if (true) {
      console.log('in true');
      if (!window.paypal) {
        console.log('in true paypal');
        addPayPalScript();
      } else {
        console.log('in true sdk readt');
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
            <Typography color='textPrimary' variant='h6'>
              Select a payment method
            </Typography>

            <Paper className={classes.paymentPaper}>
              <PayPalButton amount={1000} onSuccess={successPaymentHandler} />
            </Paper>
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
          {steps.map((label) => (
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
                    <Button
                      label={activeStep === steps.length - 1 ? 'Prev' : 'Prev'}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      startIcon={<ShoppingCartIcon />}
                      label={
                        activeStep === steps.length - 1
                          ? 'Pay Now'
                          : 'Continue Shipping'
                      }
                      variant='contained'
                      color='dark'
                      className={classes.cartButton}
                      onClick={handleNext}
                    />
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

export default Checkout;
