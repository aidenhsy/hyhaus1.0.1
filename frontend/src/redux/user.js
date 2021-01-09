import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

export const userSlice = createSlice({
  name: 'userLogin',
  initialState: { loading: 'idle', userInfo: userInfoFromStorage },
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
    userUpdateInfoSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
        state.success = true;
      }
    },
    userNotificationReset(state) {
      state.success = undefined;
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
  userUpdateInfoSuccess,
  userNotificationReset,
  userError,
} = userSlice.actions;

export const login = (email, password) => async (dispatch, getState) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });
    dispatch(userLoginSuccess(data));
    const user = getState().user.userInfo;
    console.log(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  window.location.reload();
};

export const register = (registerUser) => async (dispatch, getState) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('/api/users/', registerUser);
    dispatch(userRegisterSuccess(data));
    const user = getState().user.userInfo;
    console.log(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
    setTimeout(() => {
      dispatch(userNotificationReset());
    }, 5000);
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const updateUserInfo = (updatedUser) => async (dispatch, getState) => {
  dispatch(userLoading());
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
    const { data } = await axios.put(`/api/users/profile`, updatedUser, config);
    console.log(data);
    dispatch(userUpdateInfoSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.toString()));
  }
};
