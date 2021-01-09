import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { createPhoto } from '../../redux/photo';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2em',
  },
  text: {
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
    marginTop: '2em',
    width: 245,
  },
}));

const AddPhotoForm = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    let formData = new FormData();

    formData.append('image', data.image[0]);
    formData.append('name', name);
    console.log(formData.get('name'));
    console.log(formData.get('image'));
    dispatch(createPhoto(formData));
    // history.push('/profile');
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              label="Name"
              id="name"
              type="text"
              fullWidth
              value={name}
              className={classes.text}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              className={classes.text}
            >
              Upload File
              <input type="file" hidden ref={register} name="image" />
            </Button>

            <Button className={classes.btn} type="submit">
              Upload
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(AddPhotoForm);
