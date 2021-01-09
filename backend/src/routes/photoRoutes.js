import express from 'express';
import { protect, photographer } from '../middleware/authMiddleware.js';
const Router = express.Router();

import {
  getPhotos,
  getPhotoById,
  countUserPhotos,
  deletePhoto,
  createPhoto,
  updatePhoto,
} from '../controllers/photoControllers.js';

Router.route('/').get(getPhotos).post(protect, photographer, createPhoto);
Router.route('/count').get(protect, countUserPhotos);
Router.route('/:id')
  .get(getPhotoById)
  .delete(protect, photographer, deletePhoto)
  .put(updatePhoto);

export default Router;
