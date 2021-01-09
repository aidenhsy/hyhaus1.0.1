import React, { useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import { fetchPhotographers } from '../../redux/photographer';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2em',
    marginLeft: '2em',
  },
}));

const AllPhotographers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  const { photographers } = useSelector((state) => state.photographer);

  return (
    <React.Fragment>
      <Grid container spacing={4} className={classes.root}>
        {photographers.map((photographer) => (
          <Grid item>
            <Button
              variant="outlined"
              component={Link}
              to={`/photographers/${photographer._id}`}
            >
              {photographer.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default AllPhotographers;
