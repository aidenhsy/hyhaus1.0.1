import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JobListings from '../components/lists/JobListings';

const useStyles = makeStyles((theme) => ({}));

const FindWork = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <JobListings />
    </div>
  );
};

export default FindWork;
