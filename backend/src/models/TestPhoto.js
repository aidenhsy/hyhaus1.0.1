import mongoose from 'mongoose';

const TestPhotoSchema = new mongoose.Schema({
  name: String,
  date: {
    type: String,
    default: new Date().toDateString().slice(4, 15),
  },
  image: String,
});

const TestPhoto = mongoose.model('TestPhoto', TestPhotoSchema);

export default TestPhoto;
