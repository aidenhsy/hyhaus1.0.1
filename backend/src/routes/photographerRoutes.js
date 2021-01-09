import express from 'express';
const Router = express.Router();

import { getPhotographers } from '../controllers/photographerControllers.js';

Router.route('/').get(getPhotographers);

export default Router;
