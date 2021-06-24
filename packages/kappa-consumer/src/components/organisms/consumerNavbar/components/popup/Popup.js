import React from 'react';
import Slide from '@material-ui/core/Slide';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

/* COMPONENTS */
// atoms
import Dialog from '@kappa/components/src/atoms/dialog';

// Styles
import useStyles from './popup.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});  

const Popup = (props) => {
  const {
    children,
    isOpen,
    setIsOpen,
    className,
  } = props;
  const classes = useStyles();

  // responsive
  const theme = useTheme();
  const isXtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Dialog
      {...props}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={clsx(classes.root, className)}
      maxWidth="xs"
      fullScreen={isXtraSmall}
      scroll="body"
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  );
};

export default Popup;
