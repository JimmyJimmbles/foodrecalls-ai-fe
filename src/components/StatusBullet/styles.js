import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
  },
  sm: {
    height: theme.spacing(1),
    width: theme.spacing(1),
  },
  md: {
    height: theme.spacing(2),
    width: theme.spacing(2),
  },
  lg: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  neutral: {
    backgroundColor: theme.palette.neutral,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  danger: {
    backgroundColor: theme.palette.error.main,
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
}));

export default styles;
