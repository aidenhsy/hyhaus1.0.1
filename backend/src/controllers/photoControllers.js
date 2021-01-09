import asyncHandler from 'express-async-handler';
import Photo from '../models/Photo.js';

export const getPhotos = asyncHandler(async (req, res) => {
  const photos = await Photo.find().populate('user', '_id name city image');
  res.json(photos);
});

export const countUserPhotos = asyncHandler(async (req, res) => {
  const qty = await Photo.countDocuments({ user: req.user._id });
  res.json(qty);
});

// @desc   Get a photo by ID
// @route  GET /api/photos/:id
// @access PUBLIC
export const getPhotoById = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (photo) {
    res.json(photo);
  } else {
    res.status(404);
    throw new Error('Photo not found');
  }
});

// @desc   Delete a photo
// @route  DELETE /api/photos/:id
// @access PRIVATE
export const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (photo) {
    await photo.remove();
    res.json({ message: 'Photo removed' });
  } else {
    res.status(404);
    throw new Error('Photo not found');
  }
});

// @desc   Create a photo
// @route  POST /api/photos/
// @access PRIVATE/Photographer
export const createPhoto = asyncHandler(async (req, res) => {
  const photo = new Photo({
    user: req.user._id,
    name: 'Sample name',
    image: 'https://iso.500px.com/wp-content/uploads/2015/09/streetcover1.jpeg',
  });

  const createdPhoto = await photo.save();
  res.status(201).json(createdPhoto);
});

// @desc   Update a photo
// @route  PUT /api/photos/:id
// @access PRIVATE/Photographer
export const updatePhoto = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const photo = await Photo.findById(req.params.id);

  if (photo) {
    photo.name = name;
    photo.image = image;

    const updatedProduct = await photo.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Photo not found');
  }
});
