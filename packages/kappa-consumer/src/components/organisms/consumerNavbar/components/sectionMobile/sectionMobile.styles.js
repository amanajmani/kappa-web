import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  sectionLeftDesktop: {
    flex: 1,
    display: 'flex',
  },
  logoContainer: {
    display: 'flex',
    marginLeft: theme.spacing(1),
  },
  logo: {
    maxWidth: '40%',
    height: 'auto',
    padding: theme.spacing(2),
    alignSelf: 'center',
  },
  sectionRightDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  sectionRightMobile: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    fontSize: 16,
    color: theme.palette.text.white,
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionLeftMobile: {
    flexGrow: 1,
  },
  iconButton: {
    color: theme.palette.text.white,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadiusSecondary,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    marginRight: theme.spacing(4),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: 18,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '32ch',
      '&:focus': {
        width: '42ch',
      },
    },
  },
  inputInputMobile: {
    fontSize: 12,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '1ch',
      '&:focus': {
        width: '15ch',
      },
    },
  },
  tabsRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: 'center',
    height: '100%',
    display: 'flex',
    '&:hover': {
      borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
  },
  tab: {
    cursor: 'default',
  },
}));
