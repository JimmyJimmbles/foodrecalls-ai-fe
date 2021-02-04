import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styles from './styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  CircularProgress,
} from '@material-ui/core';
import { StatusBullet } from 'components';
import { useCompanyRecalls } from 'hooks';
import RecallDialog from '../RecallDialog';

const statusColors = {
  completed: 'success',
  ongoing: 'info',
  terminated: 'success',
};

// Sort table columns
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'classification',
    numeric: false,
    disablePadding: false,
    label: 'Classification',
    sortable: true,
  },
  {
    id: 'recallInitiationDate',
    numeric: false,
    disablePadding: false,
    label: 'Recall Initiation Date',
    sortable: true,
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: false,
    label: 'Location',
    sortable: true,
  },
  {
    id: 'productQuantity',
    numeric: false,
    disablePadding: false,
    label: 'Product Quantity',
  },
  {
    id: 'voluntaryMandated',
    numeric: false,
    disablePadding: false,
    label: 'Voluntary/Mandated',
    sortable: true,
  },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

const RecallsTable = ({ companyName, className }) => {
  const classes = styles();
  const { root } = classes;
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('recallInitiationDate');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState({ isOpen: false });

  const [recalls, setRecalls] = useState({});

  const { loading, error, recallData } = useCompanyRecalls({
    companyName,
    limit: 1001,
    offset: 0,
    sortBy: 'classification',
    sortDirection: 'ASC',
  });

  useEffect(() => {
    if (!loading && !error && recallData) {
      setRecalls(recallData);
    }
  }, [loading, error, recallData]);

  if (loading || !recalls || !recalls.getAllCompanyRecalls) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const handleRequestSort = (event, property) => {
    event.persist();

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, page) => {
    event.persist();
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleClickOpen = (recallData) => {
    setOpen({ isOpen: true, ...recallData });
  };

  const {
    getAllCompanyRecalls: { count, records },
  } = recalls;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  function EnhancedTableHead({ order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, i) => (
            <Fragment key={i}>
              {headCell.sortable ? (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ) : (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              )}
            </Fragment>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <Card className={classnames(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={count}
              />
              <TableBody>
                {records.length > 0 &&
                  stableSort(records, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((recall, i) => (
                      <TableRow className={classes.tableRow} hover key={i}>
                        <TableCell>{recall.classification}</TableCell>
                        <TableCell>
                          {moment(recall.recallInitiationDate).format(
                            'MM/DD/YYYY'
                          )}
                        </TableCell>
                        <TableCell>
                          {recall.city}, {recall.state}
                        </TableCell>
                        <TableCell>{recall.productQuantity}</TableCell>
                        <TableCell>{recall.voluntaryMandated}</TableCell>
                        <TableCell>
                          <div className={classes.statusContainer}>
                            <StatusBullet
                              className={classes.status}
                              color={statusColors[recall.status.toLowerCase()]}
                              size="sm"
                            />
                            {recall.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            aria-label="View More Recall Data"
                            onClick={() => handleClickOpen(recall)}
                          >
                            View More
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      <RecallDialog {...open} setOpen={setOpen} />
    </Card>
  );
};

export default RecallsTable;
