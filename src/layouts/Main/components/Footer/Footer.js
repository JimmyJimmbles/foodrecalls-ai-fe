import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Footer = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <div {...props} className={classnames(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="https://foodrecalls.ai/" target="_blank">
          FoodRecalls.ai
        </Link>
      </Typography>
      <Typography variant="caption">Created with love.</Typography>
    </div>
  );
};

export default Footer;
