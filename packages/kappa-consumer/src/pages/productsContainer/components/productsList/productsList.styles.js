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
    paddingLeft: theme.spacing(6),
  },
  title: {
    textTransform: 'capitalize',
    transition: 'font 0.3s ease',
    transform: 'translate(1px, 1px)'
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
  filtersButtonContainer: {
    paddingRight: theme.spacing(6),
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  contentContainer: {
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    [theme.breakpoints.only('xs')]: {
      flex: 1,
    },
  },
}));
