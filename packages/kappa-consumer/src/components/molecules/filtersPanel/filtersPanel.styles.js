import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: 200,
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
}));
