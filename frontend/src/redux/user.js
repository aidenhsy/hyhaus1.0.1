import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: { loading: 'idle', userInfo: {} },
  reducers: {
    userLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    userLoginSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
      }
    },
    userRegisterSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
      }
    },
    userDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
      }
    },
    userUpdateInfoSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
        state.success = true;
      }
    },
    userError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
  },
});

export const {
  userLoading,
  userLoginSuccess,
  userRegisterSuccess,
  userDetailsSuccess,
  userUpdateInfoSuccess,
  userError,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });
    dispatch(userLoginSuccess(data));
    Cookies.set('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const register = (registerUser) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('/api/users', registerUser);
    dispatch(userRegisterSuccess(data));
    Cookies.set('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const getUserDetails = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    console.log('hit1');
    const token = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get('/api/users/profile', config);
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const updateUserInfo = (updatedUser) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const token = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, updatedUser, config);
    console.log(data);
    dispatch(userUpdateInfoSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.toString()));
  }
};
