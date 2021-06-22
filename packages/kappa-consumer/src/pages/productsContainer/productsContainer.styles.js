import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    // paddingLeft: theme.spacing(6),
    // paddingRight: theme.spacing(6),
  },
  imp: {
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  title: {
    textTransform: 'capitalize',
    transition: 'font 0.3s ease',
    transform: 'translate(1px, 1px)'
  },
  headerMenu: {
    position: 'sticky',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 1,
    top: 0,
    paddingBottom: theme.spacing(1),
  },
  fontShrink: {
    animation: 'fontShrink .2s forwards',
    transition: 'all ease-in',
  },
  '@global': {
    '@keyframes fontShrink': {
        '100%': {
        transform: 'scale(0.6)',
        marginLeft: -50,
      },
    },
  },
  content: {

  },
  contentt: {
    flexGrow: 1,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    // paddingLeft: theme.spacing(8),
    // paddingRight: theme.spacing(8),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(6),
    // [theme.breakpoints.only('xs')]: {
    //   display: 'none',
    // },
  },
  filtersButtonContainer: {
    paddingRight: theme.spacing(6),
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  button: {
    backgroundColor: 'transparent !important',
    // padding: theme.spacing(2, 10),
    borderRadius: 'unset',
    fontWeight: 'bold',
    [theme.breakpoints.only('xs')]: {
      flex: 1,
    },
  },
  menu: {
    '& div': {
      marginTop: theme.spacing(6.8),
    },
  },
  menuItem: {
    padding: theme.spacing(1),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },
}));
