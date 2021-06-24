import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

// Styles
import useStyles from './iconButton.styles';

export default function PrimaryIconButton(props) {
  const { className } = props;
  const classes = useStyles();

  return (
    <IconButton {...props} disableRipple className={clsx(classes.root, className)} />
  );
}
