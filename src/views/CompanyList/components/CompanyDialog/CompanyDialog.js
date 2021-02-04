import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import { useForm } from 'hooks';

const CompanyDialog = ({
  setOpen,
  isOpen,
  uuid,
  name,
  websiteUrl,
  phoneNumber,
  city,
  state,
  employeeRange,
}) => {
  const classes = styles();

  const handleClose = () => {
    setOpen({ isOpen: false });
  };

  const handleSaveCompanyData = () => {};

  const { handleChange, handleSubmit, values } = useForm(
    handleSaveCompanyData,
    {
      name,
      websiteUrl,
      phoneNumber,
      city,
      state,
      employeeRange,
    }
  );

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby={uuid}>
      <DialogTitle id={uuid}>Recall Details</DialogTitle>
      <DialogContent dividers>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item md={6} lg={4} xs={12}>
              <TextField
                fullWidth
                label="Company name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} lg={4} xs={12}>
              <TextField
                fullWidth
                label="Website URL"
                margin="dense"
                name="websiteUrl"
                onChange={handleChange}
                required
                value={values.websiteUrl}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} lg={3} xs={12}>
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} lg={4} xs={12}>
              <TextField
                fullWidth
                label="State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                value={values.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Employee Range"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                value={values.employeeRange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveCompanyData} color="primary">
          Save
        </Button>
        <Button autoFocus onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDialog;
