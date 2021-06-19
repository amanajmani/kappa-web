import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // '& .MuiTab-root': {
    //   minWidth: 'unset',
    //   marginRight: 20,
    // },
    // marginBottom: 50,
  },
  appBar: {
    background: '#281659',
    padding: theme.spacing(0, 1),
    borderBottom: '4px solid #fff',
  },
  adminAppBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  hidden: {
    display: 'none',
  },
}));
