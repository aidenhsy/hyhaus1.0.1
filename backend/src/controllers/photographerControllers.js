import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const getPhotographers = asyncHandler(async (req, res) => {
  const photographers = await User.find({ isPhotographer: true });
  res.json(photographers);
});
