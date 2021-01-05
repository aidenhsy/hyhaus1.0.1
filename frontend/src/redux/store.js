import { configureStore } from '@reduxjs/toolkit';
import { photosSlice } from './photo';
import { userSlice } from './user';

const reducer = {
  photos: photosSlice.reducer,
  user: userSlice.reducer,
};

const store = configureStore({ reducer });

export default store;
