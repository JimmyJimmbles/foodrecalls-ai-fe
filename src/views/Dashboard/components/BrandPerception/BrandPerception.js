import React from 'react';
import classnames from 'classnames';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoodIcon from '@material-ui/icons/Mood';
import styles from './styles';

const BrandPerception = ({ className }) => {
  const classes = styles();

  const {
    root,
    title,
    avatar,
    icon,
    difference,
    differenceIcon,
    differenceValue,
    caption,
  } = classes;

  return (
    <Card className={classnames(root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              BRAND PERCEPTION
            </Typography>
            <Typography variant="h3">Positive</Typography>
          </Grid>
          <Grid item>
            <Avatar className={avatar}>
              <MoodIcon className={icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={difference}>
          <ArrowUpwardIcon className={differenceIcon} />
          <Typography className={differenceValue} variant="body2">
            +10%
          </Typography>
          <Typography className={caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandPerception;
