import React, { useState, useEffect } from 'react';
import { Tabs, Tab, AppBar, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import MyPhotos from '../components/displays/MyPhotos';
import MyRequests from '../components/lists/MyRequests';
import MyProjects from '../components/lists/MyProjects';
import UpdateProfile from '../components/forms/UpdateProfile';

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

const Profile = ({ history }) => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);
  const { successCreate, createdPhoto } = useSelector((state) => state.photos);

  const [active, setActive] = useState(0);

  const handleChange = (e, value) => {
    setActive(value);
  };

  useEffect(() => {
    if (successCreate) {
      history.push(`/photos/${createdPhoto._id}/edit`);
    }
  }, [successCreate, history, createdPhoto]);

  return (
    <React.Fragment>
      <div className={classes.headerContainer}>
        <Avatar className={classes.avatar}>
          {userInfo.name.split(' ')[0].charAt(0)}
        </Avatar>
        <div className={classes.infoContainer}>
          <h1>{userInfo.name}</h1>
          <Button
            variant="outlined"
            component={Link}
            className={classes.addBtn}
            to="/addphoto"
          >
            Add Photo
          </Button>
        </div>
      </div>

      <AppBar position="sticky" color="inherit" elevation={0}>
        <Tabs className={classes.tabs} value={active} onChange={handleChange}>
          <Tab label="Posts" className={classes.tab} />
          <Tab label="Requests" className={classes.tab} />
          <Tab label="Projects" className={classes.tab} />
          <Tab label="Settings" className={classes.tab} />
        </Tabs>
      </AppBar>
      <TabPanel value={active} index={0}>
        <MyPhotos userId={userInfo._id} />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <MyRequests />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <MyProjects />
      </TabPanel>
      <TabPanel value={active} index={3}>
        <UpdateProfile />
      </TabPanel>
    </React.Fragment>
  );
};

export default Profile;
