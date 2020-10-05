import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import classnames from 'classnames';
import moment from 'moment';
import styles from './styles';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  IconButton,
  Divider,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Fade,
  Tooltip,
} from '@material-ui/core';
import { useCompanyRecalls } from 'hooks';

const RecallLineGraph = ({ companyName, className }) => {
  const classes = styles();
  const theme = useTheme();

  const {
    root,
    chartContainer,
    cardHeader,
    stats,
    legendContainer,
    legendText,
  } = classes;

  const [graphData, setGraphData] = useState({});
  //   const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState('recallInitiationDate');
  const { loading, error, recallData } = useCompanyRecalls({
    companyName,
    limit: 1001,
    offset: 0,
    sortBy: 'recallInitiationDate',
    sortDirection: 'DESC',
  });

  useEffect(() => {
    if (!loading && !error && recallData) {
      setGraphData(recallData);
    }
  }, [loading, error, recallData]);

  if (loading || !graphData || !graphData.getAllCompanyRecalls) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const {
    getAllCompanyRecalls: { count, records },
  } = graphData;

  console.log('records-jj', records);
  console.log('count-jj', count);

  const recallInitYears = records.map((item) => moment(item[filterBy]).year());

  let recallInitCount = {};
  for (let i = 0; i < recallInitYears.length; i++) {
    const elm = recallInitYears[i];

    if (
      typeof recallInitCount[elm] === 'undefined' ||
      recallInitCount[elm] === null
    ) {
      recallInitCount[elm] = 1;
    } else {
      recallInitCount[elm] += 1;
    }
  }

  console.log('recallInitCount-jj', recallInitCount);
  const dataLabels = Object.keys(recallInitCount);
  const data = Object.keys(recallInitCount).map((key) => recallInitCount[key]);

  const lineData = {
    labels: dataLabels,
    datasets: [
      {
        label: '# of Recalls',
        fill: true,
        lineTension: 0.2,
        backgroundColor: 'rgba(146, 208, 80, 0.3)',
        borderColor: theme.palette.primary.main,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: theme.palette.secondary.dark,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.secondary.dark,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: data,
      },
    ],
  };

  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 40,
      },
    },
  };

  return (
    <Card className={classnames(root, className)}>
      <CardHeader className={cardHeader} title="# of Recalls Per Year" />
      <Divider />
      <CardContent>
        <div className={chartContainer}>
          <Line data={lineData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecallLineGraph;
