import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/user';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2em',
  },
  btn: {
    backgroundColor: theme.palette.common.purple,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    borderRadius: 50,
    height: 45,
    width: 245,
  },
}));

const SignInForm = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
      md={5}
    >
      <Grid item style={{ maxWidth: '15em' }}>
        <Grid container style={{ paddingBottom: '10em' }}>
          <Grid item style={{ maxWidth: '15em' }}>
            <Typography variant="h2">Sign In</Typography>
          </Grid>
          <form onSubmit={submitHandler}>
            <Grid item container direction="column">
              <Grid item style={{ margin: '1em 0', maxWidth: '15em' }}>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item style={{ maxWidth: '15em' }}>
                <TextField
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  value={password}
                />
              </Grid>
              <Grid item style={{ marginTop: '2em' }}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btn}
                >
                  Sign in
                </Button>
              </Grid>
              <Grid item style={{ marginTop: '2em', textAlign: 'center' }}>
                <Link to="/signup" style={{ color: 'grey' }}>
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
