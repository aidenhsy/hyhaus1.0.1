import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PhotoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: String,
    image: {
      type: String,
      required: true,
    },
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    time: {
      type: String,
      default: new Date().toDateString().slice(4, 15),
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;
