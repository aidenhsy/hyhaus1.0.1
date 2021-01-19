import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Welcome from '../components/landing/Welcome';
import AllPhotos from '../components/displays/AllPhotos';

import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/user';

import Cookies from 'js-cookie';

const Landing = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo.name && Cookies.get('token')) {
      console.log('yes its true');
      dispatch(getUserDetails());
    }
  }, [userInfo, dispatch]);

  return (
    <Grid container direction="column">
      {!userInfo.name && (
        <Grid item>
          <Welcome />
        </Grid>
      )}
      <AllPhotos />
    </Grid>
  );
};

export default Landing;
