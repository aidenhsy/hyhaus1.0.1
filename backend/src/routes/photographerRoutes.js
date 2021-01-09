import express from 'express';
const Router = express.Router();

import {
  getPhotographers,
  getPhotographerDetails,
} from '../controllers/photographerControllers.js';

Router.route('/').get(getPhotographers);
Router.route('/:id').get(getPhotographerDetails);

export default Router;
