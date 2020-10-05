import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useCompanyList } from 'hooks';
import { CompaniesTable, CompaniesToolbar } from './components';

const CompanyList = () => {
  const [companies, setCompanies] = useState({});
  const classes = styles();

  const { root, content } = classes;

  const { loading, error, companyData } = useCompanyList({
    limit: 1001,
    offset: 0,
    sortBy: 'createdAt',
    sortDirection: 'ASC',
  });

  useEffect(() => {
    if (!loading && !error && companyData) {
      setCompanies(companyData);
    }
  }, [loading, error, companyData]);

  if (loading || !companies || !companies.getAllCompanies) {
    return (
      <div className={classnames(root)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={root}>
      <CompaniesToolbar />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={content}>
            <CompaniesTable
              companies={companies}
              sortBy="createdAt"
              sortDirection="ASC"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyList;
