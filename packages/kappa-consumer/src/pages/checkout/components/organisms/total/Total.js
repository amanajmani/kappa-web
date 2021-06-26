import React from 'react';

/* COMPONENTS */
import Grid from '@kappa/components/src/atoms/grid';
import Typography from '@kappa/components/src/atoms/typography';

import useStyles from './total.styles';

const Total = ({ orderCalculation }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      className={`${classes.productDetails} ${classes.root}`}
      lg={4}
      xs={12}
      height="100%"
    >
      <Grid container>
        <Grid item xs={12} p={4}>
          <div
            className={`${classes.flex} ${classes.alignCenter} ${classes.py_16}`}
          />
        </Grid>
        <div className={classes.separator} />
        <Grid item xs={12}>
          <div className={`${classes.flex} ${classes.py_16}`}>
            <Typography color="textPrimary" variant="body2">
              Subtotal :
            </Typography>
            <Typography color="textPrimary" variant="body2">
              $
              {parseFloat(orderCalculation.subTotal).toFixed(2)}
            </Typography>
          </div>
          <div className={`${classes.flex} ${classes.py_16}`}>
            <Typography color="textPrimary" variant="body2">
              Discount :
            </Typography>
            <Typography color="textPrimary" variant="body2">
              $
              {parseFloat(orderCalculation.discount).toFixed(2)}
            </Typography>
          </div>
        </Grid>
        <div className={classes.separator} />
        <Grid item xs={12}>
          <div className={`${classes.flex} ${classes.py_16}`}>
            <Typography color="textPrimary" variant="body2">
              Shipping :
            </Typography>
            <Typography color="textPrimary" variant="body2">
              $5
            </Typography>
          </div>
          <div className={`${classes.flex} ${classes.py_16}`}>
            <Typography color="textPrimary" variant="body2">
              Total :
            </Typography>
            <Typography color="textPrimary" variant="body2">
              $
              {parseFloat(
                orderCalculation.subTotal - orderCalculation.discount + 5,
              ).toFixed(2)}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Total;
