import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const Router = express.Router();

import {
  register,
  login,
  updateUserProfile,
} from '../controllers/userControllers.js';

Router.route('/').post(register);
Router.route('/login').post(login);
Router.route('/profile').put(protect, updateUserProfile);

export default Router;
