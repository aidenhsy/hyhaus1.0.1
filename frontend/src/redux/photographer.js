import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const photographersSlice = createSlice({
  name: 'photographers',
  initialState: {
    loading: 'idle',
    photographers: [],
    photographer: {},
  },
  reducers: {
    photographersLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    photographersListSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.photographers = action.payload;
      }
    },
    photographerDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.photographer = action.payload;
      }
    },
    photographersError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
  },
});

export const {
  photographersLoading,
  photographersListSuccess,
  photographerDetailsSuccess,
  photographersError,
} = photographersSlice.actions;

export const fetchPhotographers = () => async (dispatch) => {
  dispatch(photographersLoading());
  try {
    const { data } = await axios.get('/api/photographers');
    dispatch(photographersListSuccess(data));
  } catch (error) {
    dispatch(photographersError(error.toString()));
  }
};

export const fetchPhotographerDetails = (photographerId) => async (
  dispatch
) => {
  dispatch(photographersLoading());
  try {
    const { data } = await axios.get(`/api/photographers/${photographerId}`);
    dispatch(photographerDetailsSuccess(data));
  } catch (error) {
    dispatch(photographersError(error.toString()));
  }
};
