import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Welcome from '../components/landing/Welcome';
import common from '../components/common';

import { useSelector } from 'react-redux';

const Landing = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Grid container direction="column">
      {!userInfo.name && (
        <Grid item>
          <Welcome />
        </Grid>
      )}
      {/* <common.PhotosFiltered /> */}
    </Grid>
  );
};

export default Landing;
