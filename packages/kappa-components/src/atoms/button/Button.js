import React from 'react';

import clsx from 'clsx';
import {
  Button,
} from '@material-ui/core';

// Styles
import useStyles from './button.styles';

export default function PrimaryButton(props) {
  const { className, label } = props;
  const classes = useStyles();

  return (
    <Button {...props} disableRipple className={clsx(classes.root, className)}>
      {label}
    </Button>
  );
}
