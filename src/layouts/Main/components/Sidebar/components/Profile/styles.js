import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, teal } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing(1),
  },
  primary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.secondary.main,
  },
  teal: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
  userData: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: 16,
  },
}));

export default styles;
