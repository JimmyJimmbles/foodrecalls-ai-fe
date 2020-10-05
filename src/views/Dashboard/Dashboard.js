import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import classnames from 'classnames';
import styles from './styles';
import {
  BrandPerception,
  LatestRecallsTable,
  RecallDoughnutByField,
  TotalRecalls,
} from './components';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';

const Dashboard = ({ className }) => {
  const classes = styles();

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  const [myData, setMyData] = useState({});

  console.log({ loading, error, data });

  useEffect(() => {
    if (!loading && !error && data && data.me) {
      setMyData(data);
    }
  }, [loading, error, data]);

  const { root } = classes;

  if (loading || !data || !myData || !myData.me) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const {
    me: {
      company: {
        name,
        recalls: { count, records },
      },
    },
  } = myData;

  return (
    <div className={root}>
      <Grid container spacing={4}>
        <Grid item>
          <Typography variant="h4">{name} Dashboard</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalRecalls count={count} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <BrandPerception />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xs={12}>
          <LatestRecallsTable recalls={records} />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecallDoughnutByField
            companyName={name}
            dataField="classification"
            sortBy="classification"
            sortDirection="ASC"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
