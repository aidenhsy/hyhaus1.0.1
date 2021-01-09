import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const getPhotographers = asyncHandler(async (req, res) => {
  const photographers = await User.find({ isPhotographer: true });
  res.json(photographers);
});

export const getPhotographerDetails = asyncHandler(async (req, res) => {
  const photographer = await User.findById(req.params.id);
  res.json(photographer);
});
