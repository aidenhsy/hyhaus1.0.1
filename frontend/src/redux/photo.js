import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// @desc list all photos
export const photosSlice = createSlice({
  name: 'photoList',
  initialState: {
    loading: 'idle',
    photos: [],
    photo: {},
    successCreate: false,
  },
  reducers: {
    photosLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    photosListSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.photos = action.payload;
      }
    },
    photoDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.photo = action.payload;
      }
    },
    photoUpdateSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.photo = action.payload;
      }
    },
    photoCreateSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.successCreate = true;
        state.createdPhoto = action.payload;
      }
    },
    photosError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
  },
});

export const {
  photosLoading,
  photosListSuccess,
  photoDetailsSuccess,
  photoUpdateSuccess,
  photoCreateSuccess,
  photosError,
} = photosSlice.actions;

export const fetchPhotos = () => async (dispatch) => {
  dispatch(photosLoading());
  try {
    const { data } = await axios.get('/api/photos');
    dispatch(photosListSuccess(data));
  } catch (error) {
    dispatch(photosError(error.toString()));
  }
};

export const fetchPhotoDetails = (photoID) => async (dispatch) => {
  dispatch(photosLoading());
  try {
    const { data } = await axios.get(`/api/photos/${photoID}`);
    dispatch(photoDetailsSuccess(data));
  } catch (error) {
    dispatch(photosError(error.toString()));
  }
};

export const updatePhoto = (photoID, updatedPhoto) => async (dispatch) => {
  dispatch(photosLoading());
  try {
    const { data } = await axios.put(`/api/photos/${photoID}`, updatedPhoto);
    dispatch(photoUpdateSuccess(data));
  } catch (error) {
    dispatch(photosError(error.toString()));
  }
};

export const createPhoto = () => async (dispatch, getState) => {
  dispatch(photosLoading());
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/photos/`, {}, config);
    dispatch(photoCreateSuccess(data));
  } catch (error) {
    dispatch(photosError(error.toString()));
  }
};
