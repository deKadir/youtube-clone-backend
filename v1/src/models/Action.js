import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Like', 'Dislike'],
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    model: {
      type: String,
      enum: ['Comment', 'Reply', 'Video'],
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Action', Schema);
