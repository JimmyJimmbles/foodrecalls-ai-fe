import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { useCompanyRecalls } from 'hooks';
import { Grid, CircularProgress } from '@material-ui/core';
import { RecallsToolbar, RecallsTable, RecallLineGraph } from './components';
import { RecallDoughnutByField } from 'views/Dashboard/components';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';

const RecallList = ({ test, className }) => {
  console.log('test', test);
  const classes = styles();

  const { root, content } = classes;

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  const [myData, setMyData] = useState({});

  useEffect(() => {
    if (!loading && !error && data && data.me) {
      setMyData(data);
    }
  }, [loading, error, data]);

  if (loading || !data || !myData || !myData.me) {
    return (
      <Grid container>
        <Grid item>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    );
  }
  const {
    me: {
      company: { name },
    },
  } = myData;

  return (
    <div className={root}>
      <RecallsToolbar />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={content}>
            <RecallsTable companyName={name} />
          </div>
        </Grid>
        <Grid item md={5} xs={12}>
          <RecallDoughnutByField
            companyName={name}
            dataField="classification"
            sortBy="classification"
            sortDirection="ASC"
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <RecallLineGraph companyName={name} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RecallList;
