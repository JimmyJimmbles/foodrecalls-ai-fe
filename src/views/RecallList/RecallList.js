import React from 'react';
import styles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { RecallsToolbar, RecallsTable, RecallLineGraph } from './components';
import { RecallDoughnutByField } from 'components';
import { GET_COMPANY_BY_ID } from 'queries/company';
import { useQuery } from '@apollo/client';

const RecallList = ({ match: { params }, ...props }) => {
  const classes = styles();

  const { root, content } = classes;

  const { loading, error, data } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id: params.id },
  });

  if (loading) {
    return (
      <Grid container>
        <Grid item>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    );
  }

  const company = data?.getCompanyById;

  return (
    <div className={root}>
      <RecallsToolbar companyName={company.name} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={content}>
            <RecallsTable companyName={company.name} />
          </div>
        </Grid>
        <Grid item md={5} xs={12}>
          <RecallDoughnutByField
            companyName={company.name}
            dataField="classification"
            sortBy="classification"
            sortDirection="ASC"
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <RecallLineGraph companyName={company.name} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RecallList;
