import React, { useEffect } from 'react';

import { fetchPhotos } from '../../redux/photo';
import { useDispatch, useSelector } from 'react-redux';

const PhotographerPhotos = ({ photographerId, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  const { photos } = useSelector((state) => state.photos);

  console.log(photos);
  return (
    <div
      style={{
        display: 'flex',
        width: '30%',
        padding: '0 4em',
        marginTop: '2em',
        flexWrap: 'wrap',
      }}
    >
      {photos
        .filter((photo) => photo.user._id === photographerId)
        .map((photo) => (
          <img
            key={photo._id}
            src={photo.image}
            style={{ width: '100%' }}
            alt={photo.name}
          />
        ))}
    </div>
  );
};

export default PhotographerPhotos;
