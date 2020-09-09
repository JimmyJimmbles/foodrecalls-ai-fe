import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 65,
      height: 'calc(100% - 65px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

export default styles;
