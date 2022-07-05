import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'Channel',
    },
    video: {
      type: mongoose.Types.ObjectId,
      ref: 'Video',
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Watch', Schema);
