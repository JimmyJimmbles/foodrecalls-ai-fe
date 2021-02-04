import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import styles from './styles';
import { SearchInput } from 'components';

const CompaniesToolbar = ({ companies, setFilteredCompanies, className }) => {
  const classes = styles();
  const {
    root,
    row,
    spacer,
    importButton,
    exportButton,
    addButton,
    searchInput,
  } = classes;

  const [searchTerm, setSearchTerm] = useState({
    searchInput: '',
  });

  const handleChange = (event) => {
    event.persist();
    setSearchTerm((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (companies.getAllCompanies.records.length > 0) {
      const records = companies.getAllCompanies.records.filter((company) => {
        return company.name
          .toLowerCase()
          .includes(searchTerm.searchInput.toLowerCase());
      });
      console.log('records search', records);

      setFilteredCompanies({ count: records.length, records });
    }
  }, [searchTerm, companies.getAllCompanies.records, setFilteredCompanies]);

  return (
    <div className={classnames(root, className)}>
      <div className={row}>
        <Typography variant="h4">Company Data</Typography>
        <span className={spacer} />
        <Button variant="outlined" color="primary" className={importButton}>
          Import
        </Button>
        <Button className={addButton} color="primary" variant="contained">
          Add Single
        </Button>
      </div>
      <div className={row}>
        <SearchInput
          className={searchInput}
          placeholder="Search Companies"
          name="searchInput"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CompaniesToolbar;
