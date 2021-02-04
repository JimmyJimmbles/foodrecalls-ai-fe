import React, {Fragment, useState} from 'react';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styles from './styles';
import {
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
  Button,
} from '@material-ui/core';
import {Link} from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
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
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
    sortable: true,
  },
  {
    id: 'websiteUrl',
    numeric: false,
    disablePadding: false,
    label: 'Website',
    sortable: false,
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone #',
    sortable: false,
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
    sortable: false,
  },
];

const CompaniesTable = ({sortBy, sortDirection, className, companies, setCompanyID}) => {
  const classes = styles();
  const [order, setOrder] = useState(sortDirection);
  const [orderBy, setOrderBy] = useState(sortBy);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, page) => setPage(page);

  const handleRowsPerPageChange = event => setRowsPerPage(event.target.value);

  const handleCompanySelect = companyID => {
    console.log({companyID2: companyID});
    setCompanyID(companyID);
  };

  const {count, records} = companies;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  function EnhancedTableHead({order, orderBy, onRequestSort}) {
    const createSortHandler = property => event => {
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
                    .map((company, i) => (
                      <TableRow className={classes.tableRow} hover key={i}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.websiteUrl ? company.websiteUrl : '-'}</TableCell>
                        <TableCell>{company.phoneNumber ? company.phoneNumber : '-'}</TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            aria-label="View Company"
                            onClick={() => handleCompanySelect(company.id)}
                            component={Link}
                            to={`/dashboard/${company.id}`}
                          >
                            View
                          </Button>
                          <Button
                            color="secondary"
                            size="small"
                            variant="outlined"
                            aria-label="Edit Company"
                            // onClick={() => handleCompanySelect(company.id)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{height: 53 * emptyRows}}>
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
    </Card>
  );
};

export default CompaniesTable;
