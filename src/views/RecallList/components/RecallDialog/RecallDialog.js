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
  Grid,
} from '@material-ui/core';

const RecallDialog = ({
  setOpen,
  isOpen,
  uuid,
  classification,
  city,
  state,
  productType,
  productQuantity,
  reasonForRecall,
  recallInitiationDate,
  terminationDate,
  voluntaryMandated,
  status,
}) => {
  const classes = styles();

  const handleClose = () => {
    setOpen({ isOpen: false });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby={uuid}>
      <DialogTitle id={uuid}>Recall Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Initiation Date:</Box>
              <DialogContentText>
                {moment(recallInitiationDate).format('MM/DD/YYYY')}
              </DialogContentText>
            </Typography>
          </Grid>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Termination Date:</Box>
              <DialogContentText>
                {terminationDate
                  ? moment(recallInitiationDate).format('MM/DD/YYYY')
                  : '-'}
              </DialogContentText>
            </Typography>
          </Grid>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Classification:</Box>
              <DialogContentText>{classification}</DialogContentText>
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Product Quantity:</Box>
              <DialogContentText>{productQuantity}</DialogContentText>
            </Typography>
          </Grid>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Product Type:</Box>
              <DialogContentText>{productType}</DialogContentText>
            </Typography>
          </Grid>
          <Grid item md={6} lg={4} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Status:</Box>
              <DialogContentText>{status}</DialogContentText>
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Voluntary/Mandated:</Box>
              <DialogContentText>{voluntaryMandated}</DialogContentText>
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Location:</Box>
              <DialogContentText>
                {city}, {state}
              </DialogContentText>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              component="div"
              variant="body1"
              gutterBottom={true}
            >
              <Box fontWeight={500}>Reason For Recall:</Box>
              <DialogContentText>{reasonForRecall}</DialogContentText>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecallDialog;
