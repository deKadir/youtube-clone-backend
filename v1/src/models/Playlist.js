import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    title: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Video',
      },
    ],
    private: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Playlist', Schema);
