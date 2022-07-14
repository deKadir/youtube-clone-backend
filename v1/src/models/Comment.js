import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    video: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Video',
    },
    caption: {
      type: String,
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Comment', Schema);
