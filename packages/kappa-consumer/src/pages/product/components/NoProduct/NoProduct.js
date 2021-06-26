import React from 'react';

/* COMPONENTS */
import Typography from '@kappa/components/src/atoms/typography';

/* STYLES */
import useStyles from './noProduct.styles';

const NoProduct = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.text}>
        THE PRODUCT YOU ARE LOOKING FOR IS NO LONGER AVAILABLE
      </Typography>
    </div>
  );
};

export default NoProduct;
