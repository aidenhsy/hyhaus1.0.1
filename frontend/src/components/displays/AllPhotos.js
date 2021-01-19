import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  Grid,
  useScrollTrigger,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { fetchPhotos } from '../../redux/photo';
import { useDispatch, useSelector } from 'react-redux';

import PhotoCard from '../common/PhotoCard';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function TabPanel({ children, index, value }) {
  return value === index && <div>{children}</div>;
}

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
  },
  containerRoot: {
    paddingTop: '20px',
    paddingLeft: '10em',
    paddingRight: '10em',
    justify: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
  tab: {
    minWidth: 20,
    marginLeft: '25px',
  },
});

const AllPhotos = () => {
  const classes = useStyles();
  const [active, setActive] = useState(0);

  const handleChange = (e, value) => {
    setActive(value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  const { photos, loading, error } = useSelector((state) => state.photos);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="sticky" color="inherit" elevation={0}>
          <Tabs
            value={active}
            onChange={handleChange}
            classes={{ root: classes.root, scroller: classes.scroller }}
            variant={'scrollable'}
            scrollButtons={'on'}
          >
            <Tab label="All" className={classes.tab} />
            <Tab label="Shanghai" className={classes.tab} />
            <Tab label="Beijing" className={classes.tab} />
            <Tab label="Chengdu" className={classes.tab} />
            <Tab label="Dalian" className={classes.tab} />
          </Tabs>
        </AppBar>
      </ElevationScroll>

      {loading === 'pending' ? (
        <CircularProgress
          color="secondary"
          size="10em"
          style={{ marginTop: '10em', alignSelf: 'center' }}
        />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        ['', 'shanghai', 'beijing', 'chengdu', 'dalian'].map((city, index) => (
          <TabPanel value={active} index={index} key={index}>
            <Grid container className={classes.containerRoot} spacing={2}>
              {photos
                .filter((photo) => photo.user.city.includes(city))
                .map((photo) => (
                  <Grid item key={photo._id} xs={12} sm={6} md={4} xl={3}>
                    <PhotoCard photo={photo} />
                  </Grid>
                ))}
            </Grid>
          </TabPanel>
        ))
      )}
    </React.Fragment>
  );
};

export default AllPhotos;
