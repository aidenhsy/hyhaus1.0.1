import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/user';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1em',
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

const SignUpForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, city }));
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
            <Typography variant="h2">Sign Up</Typography>
          </Grid>
          <form onSubmit={submitHandler}>
            <Grid item container direction="column">
              <Grid item style={{ marginTop: '1em', maxWidth: '15em' }}>
                <TextField
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  value={name}
                />
              </Grid>
              <Grid item style={{ marginTop: '1em', maxWidth: '15em' }}>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '1em', maxWidth: '15em' }}>
                <TextField
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  value={password}
                />
              </Grid>
              <Grid item style={{ marginTop: '1em', maxWidth: '15em' }}>
                <TextField
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  value={city}
                />
              </Grid>
              <Grid item style={{ marginTop: '2em' }}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btn}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item style={{ marginTop: '2em', textAlign: 'center' }}>
                <Link to="/signin" style={{ color: 'grey' }}>
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
