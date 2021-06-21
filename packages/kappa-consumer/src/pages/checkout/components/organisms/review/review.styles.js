import { makeStyles } from '@material-ui/core/styles';

const borderRadius = 8;

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    position: 'relative',
    width: '210px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  media: {
    height: 96,
    width: '100%',
  },
  scrollable: {
    'max-height': '500px',
    overflowY: 'scroll',
    marginTop: '14px',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    // width: '100%',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: '-12px',
    right: '-10px',
    background: '#E0E0E0',
    borderRadius: '50%',
    height: '36px',
    width: '36px',
    padding: '4px',
  },
  deleteIcon: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    height: '20px',
    width: '20px',
  },
}));
