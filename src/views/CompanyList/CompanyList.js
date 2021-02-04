import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useCompanyList } from 'hooks';
import { CompaniesTable, CompaniesToolbar } from './components';

const CompanyList = ({ setCompanyID }) => {
  const [companies, setCompanies] = useState({});
  const [filteredCompanies, setFilteredCompanies] = useState({
    records: [],
    count: 0,
  });
  const classes = styles();

  const { root, content } = classes;

  const { loading, error, companyData } = useCompanyList({
    limit: 2000,
    offset: 0,
    sortBy: 'name',
    sortDirection: 'ASC',
  });

  useEffect(() => {
    if (!loading && !error && companyData) {
      setCompanies(companyData);
    }
  }, [loading, error, companyData]);

  useEffect(() => {
    setFilteredCompanies(filteredCompanies);
  }, [filteredCompanies]);

  if (
    loading ||
    !companies ||
    !companies.getAllCompanies ||
    !filteredCompanies?.records
  ) {
    return (
      <div className={classnames(root)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={root}>
      <CompaniesToolbar
        companies={companies}
        setFilteredCompanies={setFilteredCompanies}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={content}>
            <CompaniesTable
              setCompanyID={setCompanyID}
              companies={filteredCompanies}
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
