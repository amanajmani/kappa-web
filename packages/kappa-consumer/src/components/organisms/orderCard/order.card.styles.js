import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '600px',
    overflowX: 'hidden',
    overflowY: 'scroll',
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '16px auto',
    maxWidth: 600,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  timeline: {
    '& .MuiTimelineItem-missingOppositeContent:before': {
      flex: 'none',
    },
  },
  scrollable: {
    height: '180px',
    overflowY: 'scroll',
    border: '1px solid #BDBDBD',
    borderRadius: '4px',
    paddingBottom: theme.spacing(2),
  },
}));
