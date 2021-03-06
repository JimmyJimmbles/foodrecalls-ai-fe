import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import {Grid, CircularProgress, Typography} from '@material-ui/core';
import styles from './styles';
import {BrandPerception, LatestRecallsTable, TotalRecalls} from './components';
import {GET_CURRENT_USER} from 'queries/user';
import {useQuery} from '@apollo/client';
import {RecallDoughnutByField} from 'components';

export const Dashboard = () => {
  const classes = styles();
  const {root} = classes;

  const {loading, error, data} = useQuery(GET_CURRENT_USER);

  if (loading) return <CircularProgress color="secondary" />;

  const me = data?.me;
  const company = me?.company;

  console.log({data});

  return (
    <div className={root}>
      <Grid container spacing={4}>
        <Grid item>
          <Typography variant="h4">{company?.name} Dashboard</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalRecalls count={company?.recalls?.count} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <BrandPerception />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xs={12}>
          <LatestRecallsTable recalls={company?.recalls?.records} />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecallDoughnutByField
            companyName={company?.name}
            dataField="classification"
            sortBy="classification"
            sortDirection="ASC"
          />
        </Grid>
      </Grid>
    </div>
  );
};
