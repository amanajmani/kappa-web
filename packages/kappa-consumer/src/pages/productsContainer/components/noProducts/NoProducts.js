import React from 'react';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';

/* STYLES */
import useStyles from './noProducts.styles';
import NoProductIcon from '../../../../assets/images/no-products.png'

const NoProducts = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={NoProductIcon} alt="no-products" />
      <Typography className={classes.label} gutterBottom>
        We couldn't find any matches!
      </Typography>
      <Typography variant="caption" className={classes.label}>
        Please check the spelling or try searching something else
      </Typography>
    </div>
  )
}

export default NoProducts;
