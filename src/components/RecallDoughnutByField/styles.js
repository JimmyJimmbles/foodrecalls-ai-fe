import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  chartContainer: {
    position: 'relative',
  },
  cardHeader: {
    textTransform: 'capitalize',
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  legendContainer: {
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  legendText: {
    marginBottom: 10,
  },
}));

export default styles;
