import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import generateToken from '../util/generateToken.js';

// @desc    Post user registration
// @route   POST /api/users
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, city } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(403);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, city });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      isPhotographer: user.isPhotographer,
      token: generateToken(user._id),
    });
  } else {
    res.status(409);
    throw new Error('Something went wrong');
  }
});

// @desc    Post user registration
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const photoQty = await Photo.countDocuments({ user: user._id });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      isPhotographer: user.isPhotographer,
      photoQty,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send('Invalid email or password');
    throw new Error('Invalid email or password');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.city = req.body.city || user.city;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const photoQty = await Photo.countDocuments({ user: user._id });

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city: updatedUser.city,
      photoQty,
      isPhotographer: updatedUser.isPhotographer,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).send('user not found');
  }
});

// @desc    Update user public profile
// @route   GET /api/users/profile/:id
// @access  Public
export const getUserPublicProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
