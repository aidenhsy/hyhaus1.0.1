import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';
import background from '../assets/jpgpng/cameras.jpg';
import SignInForm from '../components/forms/SignInForm';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '50em',
  },
}));

const SignIn = ({ history }) => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.email) {
      history.push('/');
    }
  });

  return (
    <Grid container direction="row">
      <SignInForm />
      <Hidden smDown>
        <Grid item container className={classes.background} md={7}></Grid>
      </Hidden>
    </Grid>
  );
};

export default SignIn;
