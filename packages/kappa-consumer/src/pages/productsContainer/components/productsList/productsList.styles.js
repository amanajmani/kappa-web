import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  headerMenu: {
    position: 'sticky',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 1,
    top: 0,
    paddingBottom: theme.spacing(1),
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textTransform: 'capitalize',
    // transition: 'font 0.3s ease',
    // transform: 'translate(1px, 1px)',
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.only('xs')]: {
      // fontSize: 18,
      paddingLeft: theme.spacing(2),
    },
  },
  fontShrink: {
    transition: 'transform 200ms ease 0s',
    transform: 'scale(0.75)',
    transformOrigin: 'left center',
  },
  fontGrow: {
    transition: 'transform 200ms ease 0s',
    transform: 'scale(1)',
    transformOrigin: 'left center',
  },
  filtersButtonContainer: {
    paddingRight: theme.spacing(6),
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      paddingRight: theme.spacing(2),
    },
  },
  contentContainer: {
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 6),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(0, 2),
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },
  button: {
    borderRadius: 'unset',
    fontWeight: 'bold',
    backgroundColor: 'transparent !important',
    // [theme.breakpoints.only('xs')]: {
    //   flex: 1,
    // },
  },
}));
