import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    maxWidth: 200,
    width: '100%',
    maxHeight: 514,
    position: 'sticky',
    overflow: 'hidden scroll',
  },
  headerTitle: {
    paddingTop: 'unset',
  },
  list: {
    color: '#111',
    fontSize: 16,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.6,
      textDecoration: 'unset',
    },
    padding: 'unset !important',
  },
  popupContent: {
    marginTop: theme.spacing(3),
  },
  popupIcon: {
    position: 'fixed',
    right: 10,
    top: 10,
    color: 'black',
  }
}));
