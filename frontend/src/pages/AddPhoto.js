import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import AddPhotoForm from '../components/forms/AddPhotoForm';

const AddPhoto = () => {
  return (
    <Container>
      <Button component={Link} to="/profile" variant="outlined">
        Back
      </Button>
      <AddPhotoForm />
    </Container>
  );
};

export default AddPhoto;
