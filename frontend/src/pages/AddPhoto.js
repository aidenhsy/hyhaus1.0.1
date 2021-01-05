import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, CircularProgress } from '@material-ui/core';
import AddPhotoForm from '../components/forms/AddPhotoForm';
import { useSelector } from 'react-redux';

const AddPhoto = () => {
  const { loading } = useSelector((state) => state.photos);
  return (
    <Container>
      {loading === 'pending' && (
        <CircularProgress
          color="secondary"
          size="10em"
          style={{ marginTop: '10em' }}
        />
      )}
      <Button component={Link} to="/profile" variant="outlined">
        Back
      </Button>
      <AddPhotoForm />
    </Container>
  );
};

export default AddPhoto;
