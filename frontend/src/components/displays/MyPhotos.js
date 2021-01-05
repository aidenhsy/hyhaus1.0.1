import React, { useEffect } from 'react';

import { fetchPhotos } from '../../redux/photo';
import { useDispatch, useSelector } from 'react-redux';

const MyPhotos = ({ userId, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  const { photos } = useSelector((state) => state.photos);
  const {
    userInfo: { _id },
  } = useSelector((state) => state.user);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        marginTop: '2em',
      }}
    >
      {photos
        .filter((photo) => photo.user._id === _id)
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

export default MyPhotos;
