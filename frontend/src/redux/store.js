import { configureStore } from '@reduxjs/toolkit';
import { photosSlice } from './photo';
import { userSlice } from './user';
import { photographersSlice } from './photographer';

const reducer = {
  photos: photosSlice.reducer,
  user: userSlice.reducer,
  photographer: photographersSlice.reducer,
};

const store = configureStore({ reducer });

export default store;
