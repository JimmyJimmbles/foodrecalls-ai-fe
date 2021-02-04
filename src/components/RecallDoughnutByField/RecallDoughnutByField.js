import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import classnames from 'classnames';
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
import { FilterList } from '@material-ui/icons';
import styles from './styles';
import { useCompanyRecalls } from 'hooks';

const RecallDoughnutByField = ({ companyName, className }) => {
  const classes = styles();
  const theme = useTheme();

  // Set the graph colors
  const graphColors = [
    theme.palette.error.main,
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.light,
    theme.palette.info.light,
    theme.palette.warning.dark,
  ];

  const {
    root,
    chartContainer,
    cardHeader,
    stats,
    legendContainer,
    legendText,
  } = classes;

  const [graphData, setGraphData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState('classification');

  // Query the company recall data
  const { loading, error, recallData } = useCompanyRecalls({
    companyName,
    limit: 2000,
    offset: 0,
    sortBy: 'classification',
    sortDirection: 'ASC',
  });

  useEffect(() => {
    // Make sure we have valid data.
    if (!loading && !error && recallData) {
      setGraphData(recallData);
    }
  }, [loading, error, recallData]);

  // Return loading spinner until we have data
  if (loading || !graphData || !graphData.getAllCompanyRecalls) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const handleChartFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Filter doughnut data on click
  const handleChartFilterClose = (event) => {
    const { filterValue } = event.currentTarget.dataset;

    // If user clicks away default to classification filter
    if (!filterValue) {
      setFilterBy('classification');
    } else {
      setFilterBy(filterValue);
    }

    setAnchorEl(null);
  };

  // Deconstruct recall data
  const {
    getAllCompanyRecalls: { count, records },
  } = graphData;

  // Create array of the filtered data.
  const filterByArr = records.map((item) => item[filterBy]);

  let filterByObj = {};
  for (let i = 0; i < filterByArr.length; i++) {
    const elm = filterByArr[i];

    // Assign the data numerical data to be used for the graph.
    if (typeof filterByObj[elm] === 'undefined' || filterByObj[elm] === null) {
      filterByObj[elm] = 1;
    } else {
      filterByObj[elm] += 1;
    }
  }

  // Create array of the filtered data based on the count
  const filterByCount = Object.keys(filterByObj).map((res) => filterByObj[res]);
  const dataLabels = Object.keys(filterByObj);

  const graphLegend = Object.keys(filterByObj).map((key, i) => {
    const percentage = (filterByObj[key] / count) * 100;

    return {
      title: key,
      value: percentage.toFixed(2),
      color: graphColors[i],
    };
  });

  // Set up Doughnut Graph data.
  const dataGraph = {
    datasets: [
      {
        data: filterByCount,
        backgroundColor: graphColors,
        borderWidth: 4,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
      },
    ],
    labels: dataLabels,
  };

  const options = {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 20,
      },
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
    cutoutPercentage: 50,
  };

  return (
    <Card className={classnames(root, className)}>
      <CardHeader
        className={cardHeader}
        action={
          <>
            <Tooltip title="Filter Chart">
              <IconButton
                aria-controls="recall-sort-menu"
                aria-haspopup="true"
                aria-label="Filter Pie Chart"
                onClick={handleChartFilterClick}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
            <Menu
              id="recall-sort-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleChartFilterClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={handleChartFilterClose}
                data-filter-value="classification"
              >
                Classification
              </MenuItem>
              <MenuItem
                onClick={handleChartFilterClose}
                data-filter-value="state"
              >
                State
              </MenuItem>
              <MenuItem
                onClick={handleChartFilterClose}
                data-filter-value="status"
              >
                Status
              </MenuItem>
            </Menu>
          </>
        }
        title={`Filter By: ${filterBy}`}
      />
      <Divider />
      <CardContent>
        <Typography align="center" variant="subtitle2" gutterBottom={true}>
          All Company Recalls by {filterBy}
        </Typography>
        <div className={chartContainer}>
          <Doughnut data={dataGraph} options={options} width={250} />
        </div>
        <div className={stats}>
          {graphLegend.map((legend) => (
            <div className={legendContainer} key={legend.title}>
              <Typography className={legendText} variant="h6">
                {legend.title}
              </Typography>
              <Typography style={{ color: legend.color }} variant="h3">
                {legend.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecallDoughnutByField;
