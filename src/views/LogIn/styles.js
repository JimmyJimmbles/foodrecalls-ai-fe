import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(8),
      marginLeft: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default styles;
