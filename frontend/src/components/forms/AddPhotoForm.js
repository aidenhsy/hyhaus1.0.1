import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';

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

const AddPhotoForm = ({ history }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
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
      <Grid item style={{ maxWidth: '20em' }}>
        <Grid container style={{ paddingBottom: '10em' }}>
          <Grid item style={{ maxWidth: '20em' }}>
            <Typography variant="h4">Add a new photo</Typography>
          </Grid>
          <form onSubmit={submitHandler}>
            <Grid item container direction="column">
              <Grid item style={{ margin: '1em 0', maxWidth: '15em' }}>
                <TextField
                  label="Name"
                  id="name"
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item style={{ maxWidth: '15em' }}>
                <TextField
                  label="Image"
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  fullWidth
                  value={image}
                />
              </Grid>
              <Grid item style={{ marginTop: '2em' }}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btn}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddPhotoForm;
