import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Loader from '@kappa/components/src/atoms/loader';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import BASE_URL from '../../../constants/baseURL';

// Styles
import useStyles from './order.card.styles';

import getTime from '../../../utils/getTime';
import getPrice from '../../../utils/getPrice';
import getItemsCount from '../../../utils/getItemsCount';

const truncate = (input) => (input.length > 30 ? `${input.substring(0, 30)}...` : input);

const DeliveryTimeline = ({ classes, isDelivered, isPaid }) => (
  <Timeline className={classes.timeline}>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          variant="outlined"
          color={isPaid ? 'secondary' : 'primary'}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>Paid</TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot
        variant="outlined"
        color={isDelivered ? 'secondary' : 'primary'}
      />
      <TimelineContent>Delivered</TimelineContent>
    </TimelineItem>
  </Timeline>
);

DeliveryTimeline.propTypes = {
  isDelivered: PropTypes.bool,
  isPaid: PropTypes.bool,
};

DeliveryTimeline.defaultProps = {
  isDelivered: PropTypes.bool,
  isPaid: PropTypes.bool,
};

const OrderItem = ({ data, classes }) => (
  <>
    <div className={classes.scrollable}>
      {data.map((elem) => (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Link
                underline="none"
                component={RouterLink}
                to={`/product/${elem.product._id}`}
              >
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={`${BASE_URL}/api/v1/files/${
                      elem.product.images.length !== 0
                          && elem.product.images[0]
                    }`}
                  />
                </ButtonBase>
              </Link>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Link
                    underline="none"
                    component={RouterLink}
                    to={`/product/${elem.product._id}`}
                  >
                    <Typography gutterBottom variant="subtitle1">
                      {elem.product.title}
                    </Typography>
                  </Link>

                  <Typography nowrap variant="body2" gutterBottom>
                    Description :
                    {' '}
                    {truncate(elem.product.description)}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Quantity :
                    {' '}
                    {elem.quantity}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  $
                  {' '}
                  {getPrice(elem.product.price, elem.product.discount)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  </>
);

OrderItem.defaultProps = {
  data: [],
  classes: {},
};

const Card = ({ classes, data }) => (
  <Paper className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              Order ID : #
              {' '}
              {data._id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Purchased at :
              {' '}
              {getTime(data.createdAt)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Total : $
              {data.totalPrice}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Items :
              {' '}
              {getItemsCount(data.orderItems)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            style={{ display: 'inline-block' }}
            gutterBottom
            variant="subtitle1"
          />
          <Typography variant="body2" gutterBottom>
            Payment Method :
            {' '}
            {data.paymentMethod}
          </Typography>
          <Typography variant="body2" color="textSecondary" />
        </Grid>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <OrderItem data={data.orderItems} classes={classes} />
      </Grid>
      <Grid item xs={12} md={4}>
        <DeliveryTimeline
          isDelivered={data.isDelivered}
          isPaid={data.isPaid}
          classes={classes}
        />
      </Grid>
    </Grid>
  </Paper>
);

Card.defaultProps = {
  data: [],
  classes: {},
};

const OrderCard = ({ data, fetching }) => {
  const classes = useStyles();

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      {data.map((item) => (
        <Card key={item._id} data={item} classes={classes} />
      ))}
    </div>
  );
};

OrderCard.propTypes = {
  fetching: PropTypes.bool,
};

OrderCard.defaultProps = {
  fetching: false,
};

export default OrderCard;
