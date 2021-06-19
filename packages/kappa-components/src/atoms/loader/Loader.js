import React from 'react';

/* COMPONENTS */
import CircularProgress from '../circularProgress';

/* STYLES */
import useStyles from './loader.styles';

const Loader = (props) => {
  const { padding } = props;
  const classes = useStyles();

  return (
    <div {...props} className={classes.root} style={{ padding: padding && 50 }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
