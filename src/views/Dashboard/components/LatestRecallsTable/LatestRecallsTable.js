import React, {useState, useEffect} from 'react';
import styles from './styles';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  TablePagination,
  Tooltip,
  TableSortLabel,
  Grid,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {StatusBullet} from 'components';

import {GET_CURRENT_USER} from 'queries/user';
import {useQuery} from '@apollo/client';

const statusColors = {
  completed: 'success',
  ongoing: 'info',
  terminated: 'success',
};

const LatestRecallsTable = ({className, companyID, recalls}) => {
  const classes = styles();
  const {root} = classes;

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader title="Most Recent Recalls"></CardHeader>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Classification</TableCell>
                  <TableCell>Recall Init Date</TableCell>
                  <TableCell>Product Quantity</TableCell>
                  <TableCell>Voluntary/Mandated</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recalls &&
                  recalls.length > 0 &&
                  recalls.slice(0, 5).map(recall => (
                    <TableRow hover key={recall.uuid}>
                      <TableCell>{recall.classification}</TableCell>
                      <TableCell>
                        {moment(recall.recallInitiationDate).format('MM/DD/YYYY')}
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          component={Link}
          to={`/recalls/${companyID}`}
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default LatestRecallsTable;
