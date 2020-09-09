import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    color: theme.palette.primary.dark,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    fontFamily: 'Impact',
    color: theme.palette.primary.main,
    fontSize: 26,
    textDecoration: 'none',
  },
  logoAlt: {
    color: theme.palette.secondary.main,
  },
}));

export default styles;
