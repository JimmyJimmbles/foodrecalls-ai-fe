import React from 'react';
import {Grid, CircularProgress, Typography} from '@material-ui/core';
import styles from './styles';
import {BrandPerception, LatestRecallsTable, TotalRecalls} from './components';
import {GET_COMPANY_BY_ID} from 'queries/company';
import {useQuery} from '@apollo/client';
import {RecallDoughnutByField} from 'components';

export const CompanyDashboard = ({match: {params}}) => {
  const classes = styles();
  const {root} = classes;

  const {loading, error, data} = useQuery(GET_COMPANY_BY_ID, {
    variables: {id: params.id},
  });

  if (loading) return <CircularProgress color="secondary" />;

  const company = data?.getCompanyById;

  console.log({company});

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
          <LatestRecallsTable companyID={company?.id} recalls={company?.recalls?.records} />
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
