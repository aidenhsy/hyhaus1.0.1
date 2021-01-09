import React, { useEffect, useState } from 'react';

import { Tabs, Tab, AppBar, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PhotographerPhotos from '../components/displays/PhotographerPhotos';

import { fetchPhotographerDetails } from '../redux/photographer';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '150px',
    width: '150px',
    marginLeft: '2em',
    backgroundColor: theme.palette.secondary.main,
    fontSize: '60px',
  },
  headerContainer: {
    height: '150px',
    display: 'flex',
    padding: '2em 2em',
  },
  infoContainer: {
    marginLeft: '4em',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: 'green',
    color: 'white',
    width: '70%',
    borderRadius: 20,
    '&:hover': {
      backgroundColor: '#65A765',
    },
  },

  //below
  tabs: {
    margin: 'auto',
  },
  scroller: {
    flexGrow: '0',
  },
  tab: {
    fontFamily: 'Raleway',
    fontWeight: '700',
    fontSize: '1rem',
    minWidth: 20,
    marginLeft: '25px',
  },
}));

function TabPanel({ children, index, value }) {
  return value === index && <div>{children}</div>;
}

const PhotographerProfile = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotographerDetails(match.params.id));
  }, [dispatch, match]);

  const handleChange = (e, value) => {
    setActive(value);
  };

  const [active, setActive] = useState(0);

  const { photographer, loading } = useSelector((state) => state.photographer);
  return (
    <div>
      {loading === 'pending' ? (
        <h2>loading</h2>
      ) : (
        <React.Fragment>
          <div className={classes.headerContainer}>
            <Avatar className={classes.avatar}></Avatar>
            <div className={classes.infoContainer}>
              <h1>{photographer.name}</h1>
              <Button
                variant="outlined"
                component={Link}
                className={classes.addBtn}
                to="/addphoto"
              >
                Connect
              </Button>
            </div>
          </div>

          <AppBar position="sticky" color="inherit" elevation={0}>
            <Tabs
              className={classes.tabs}
              value={active}
              onChange={handleChange}
            >
              <Tab label="Posts" className={classes.tab} />
              <Tab label="Projects" className={classes.tab} />
              <Tab label="Products" className={classes.tab} />
            </Tabs>
          </AppBar>
          <TabPanel value={active} index={0}>
            <PhotographerPhotos photographerId={photographer._id} />
          </TabPanel>
          <TabPanel value={active} index={1}>
            <h2>Projects</h2>
          </TabPanel>
          <TabPanel value={active} index={2}>
            <h2>Products</h2>
          </TabPanel>
        </React.Fragment>
      )}
    </div>
  );
};

export default PhotographerProfile;
