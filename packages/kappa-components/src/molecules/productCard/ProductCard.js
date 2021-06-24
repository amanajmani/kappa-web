import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// Components
// atoms
import Typography from '../../atoms/typography';
import Card from '../../atoms/card';
import CardContent from '../../atoms/cardContent';

/* STYLES */
import useStyles from './productCard.styles';

const ProductCard = (props) => {
  const {
    image,
    name,
    price,
    id,
    categoryName,
  } = props;

  const classes = useStyles();

  return (
    <Link underline="none" component={RouterLink} to={`/product/${id}`}>
      <Card elevation={false} className={classes.card}>
        <img src={image} className={classes.image} alt={name} />
        <CardContent className={classes.content}>
          <Typography color="textPrimary" variant="body1">
            {name}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {categoryName}
          </Typography>
          <Typography color="textPrimary" variant="h5">
            ${price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
