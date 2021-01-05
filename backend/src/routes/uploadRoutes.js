import express from 'express';
import cloudinary from '../util/cloudinary.js';
import upload from '../util/multer.js';
import Photo from '../models/Photo.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new photo
    let photo = new Photo({
      user: req.user._id,
      name: req.body.name,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save photo
    await photo.save();
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});

export default router;
