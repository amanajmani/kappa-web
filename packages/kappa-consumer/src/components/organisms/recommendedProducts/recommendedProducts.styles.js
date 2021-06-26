import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {

  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));
