import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0),
  },

  button: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  country: {
    textAlign: 'start',
    width: '100%',
  },
}));
