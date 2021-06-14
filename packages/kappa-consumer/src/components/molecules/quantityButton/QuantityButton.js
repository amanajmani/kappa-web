import React from 'react';

/* COMPONENTS */
// atoms
import IconButton from '@kappa/components/src/atoms/iconButton';
import Typography from '@kappa/components/src/atoms/typography';

/* ASSETS */
// images
import RemoveIcon from '../../../assets/images/remove';
import AddIcon from '../../../assets/images/add';

/* STYLES */
import useStyles from './quantityButton.styles';

const QuantityButton = (props) => {
  const { quantity, setQuantity } = props;

  const addProduct = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const removeProduct = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton onClick={removeProduct} className={classes.button}>
        <RemoveIcon color='primary' fontSize='small' />
      </IconButton>
      <Typography color='primary'>{quantity}</Typography>

      <IconButton onClick={addProduct} className={classes.button}>
        <AddIcon color='primary' fontSize='small' />
      </IconButton>
    </div>
  );
};

export default QuantityButton;
